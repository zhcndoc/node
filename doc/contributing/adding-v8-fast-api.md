# 添加 V8 Fast API 回调

Node.js 使用 [V8](https://v8.dev/) 作为其 JavaScript 引擎。嵌入
用 C++ 实现的函数会带来较高的开销，因此 V8 提供了一种 API，用于
实现可直接从 JIT 编译代码中调用的原生 C++ 函数。

Fast API 的早期版本对这些函数施加了很强的约束，例如不允许重新进入 JavaScript 执行，
也不允许在 fast 调用中直接抛出错误。自 V8 12.6 起，这些约束已不再存在；不过，
如果某个函数的执行成本远高于其调用成本，那么它不太可能从“fast”变体中获益，
因此在考虑是否添加 Fast API 回调时仍然需要一些判断。

## 基础

Fast API 回调必须对应同一回调的常规（“slow”）实现。对比这两种约定：

```cpp
// 常规（“slow”）实现
void IsEven(const v8::FunctionCallbackInfo<v8::Value>& args) {
  Environment* env = Environment::GetCurrent(args);
  if (!args[0]->IsInt32()) {
    return THROW_ERR_INVALID_ARG_TYPE(env, "参数必须是整数");
  }

  int32_t n = args[0]->Int32Value(env->context()).FromJust();
  bool result = n % 2 == 0;
  args.GetReturnValue().Set(result);
}

// Fast 实现
bool FastIsEven(v8::Local<v8::Value> receiver,
                const int32_t n) {
  return n % 2 == 0;
}
static v8::CFunction fast_is_even(v8::CFunction::Make(FastIsEven));
```

这两种调用约定的主要区别如下：

* 常规调用通过 `v8::FunctionCallbackInfo` 对象，以 `v8::Value` 对象的形式传递参数。Fast API 调用会尽可能直接将参数作为原生 C++ 类型传递给 C++ 函数。
* 常规调用通过 `v8::ReturnValue` 对象返回值，该对象可通过 `v8::FunctionCallbackInfo` 对象访问。Fast API 调用会直接从 C++ 函数返回其值，作为原生 C++ 类型。
* 常规调用可以传递任意数量、任意类型的参数，这些参数必须在实现内部进行校验。Fast API 回调只会在符合其函数签名时被调用，因此上面的 `FastIsEven` 示例只会以单个 `int32_t` 类型参数被调用。凡是 JavaScript 调用中参数不符合 fast 回调签名的情况，即使函数已被优化，V8 也会将其转到慢路径。
* fast 回调不能直接绑定。必须先用它构建一个 `v8::CFunction` 句柄，然后在绑定函数时与常规回调一起传入。

## 参数和返回类型

Fast API 回调签名中有效的参数类型如下：

* `bool`
* `int32_t`
* `uint32_t`
* `int64_t`
* `uint64_t`
* `float`
* `double`
* `v8::Local<v8::Value>`（类似于 `any`）
* `v8::FastOneByteString&`（类似于 `string`，但 _只_ 允许顺序的一字节字符串，这通常不太有用）

<!--
故意省略：
* `void *`（外部对象指针）
* `v8::Local<v8::Object>`（实际上在 API 中它与
                           v8::Local<v8::Value> 的处理方式相同——换句话说，V8 会在 “object” 句柄中传递 _任何_ JS 值，
                           无论它是不是对象，这实际上是一种不安全的转换，可能导致意外错误）
-->

有效返回类型列表也类似：

* `void`
* `bool`
* `int32_t`
* `uint32_t`
* `int64_t`
* `uint64_t`
* `float`
* `double`

<!-- * `void *` -->

### 在前面添加 `receiver` 参数

V8 总会将“receiver”（JavaScript 函数调用中的 `this` 值）作为第一个参数传入。
随后，JavaScript 函数调用的参数从第二个位置开始传递。

```cpp
// 假设这个函数被绑定为某个对象上的方法，
// 因此在 JavaScript 中会以 `object.hasProperty(foo)` 的形式调用。
bool FastHasProperty(v8::Local<v8::Value> receiver,
                     v8::Local<v8::Value> property,
                     v8::FastApiCallbackOptions& options) {
  v8::Isolate* isolate = options.isolate;

  if (!receiver->IsObject()) {
    // 无效的 `this` 值；在这里抛出某种错误
  }

  bool result;
  if (!receiver.As<v8::Object>()->Has(isolate->GetCurrentContext(),
                                      property).To(&result)) {
    // V8 中有待处理的错误，忽略该值
    return false;
  }

  return result;
}
```

即使你的函数绑定不需要访问 receiver，也仍然必须将其放在函数参数最前面。

```cpp
bool FastIsObject(v8::Local<v8::Value> receiver, // 未使用
                  v8::Local<v8::Value> value) {
  return value->IsObject();
}
```

### 追加一个 `options` 参数（可选）

Fast 回调可以在末尾添加一个可选的函数参数，类型为
`v8::FastApiCallbackOptions&`。如果回调以任何方式与 isolate 交互，则这是必需的：请参见
[栈上分配对象和垃圾回收](#stack-allocated-objects-and-garbage-collection)
和 [处理错误](#handling-errors)。

```cpp
void FastThrowExample(v8::Local<v8::Value> receiver,
                      const int32_t n,
                      v8::FastApiCallbackOptions& options) {
  if (IsEvilNumber(n)) {
    v8::HandleScope handle_scope(options.isolate);
    THROW_ERR_INVALID_ARG_VALUE(options.isolate, "恶灵退散！");
  }
}
```

## 注册 Fast API 回调

对比注册一个常规 API 绑定：

```cpp
void Initialize(Local<Object> target,
                Local<Value> unused,
                Local<Context> context,
                void* priv) {
  Environment* env = Environment::GetCurrent(context);
  SetMethodNoSideEffect(context, target, "isEven", IsEven);
}
```

与注册一个带 fast 回调的 API 绑定：

```cpp
void Initialize(Local<Object> target,
                Local<Value> unused,
                Local<Context> context,
                void* priv) {
  Environment* env = Environment::GetCurrent(context);
  SetFastMethodNoSideEffect(context,
                            target,
                            "isEven",
                            SlowIsEven,
                            &fast_is_even);
}
```

方法绑定函数的 Fast API 对应版本会多接收一个参数，用于指定 fast 回调。

在大多数情况下，只有一个 fast 回调，此额外参数应为由 `CFunction::Make` 调用构造出的 `v8::CFunction` 对象指针。

在极少数情况下，可能会有多个 fast 回调，_例如_ 当函数接受可选参数时。在这种情况下，额外参数应为 `v8::CFunction` 对象数组的引用，该数组用于初始化一个
`v8::MemorySpan<v8::CFunction>`：

```cpp
int32_t FastFuncWithoutArg(v8::Local<v8::Value> receiver) {
  return -1;
}
int32_t FastFuncWithArg(v8::Local<v8::Value> receiver,
                        const v8::FastOneByteString& s) {
  return s.length;
}
static CFunction fast_func_callbacks[] = {CFunction::Make(FastFuncWithoutArg),
                                          CFunction::Make(FastFuncWithArg)};

void Initialize(Local<Object> target,
                Local<Value> unused,
                Local<Context> context,
                void* priv) {
  Environment* env = Environment::GetCurrent(context);
  SetFastMethodNoSideEffect(context,
                            target,
                            "func",
                            SlowFunc,
                            fast_func_callbacks);
}
```

此外，所有方法绑定都应注册到外部引用注册表中。这可以通过同时向 `registry->Register` 传入常规回调指针和 `v8::CFunction` 句柄来完成。

```cpp
void RegisterExternalReferences(ExternalReferenceRegistry* registry) {
  registry->Register(SlowIsEven);
  registry->Register(fast_is_even);
}
```

省略这一步可能会在回调最终进入快照时导致致命异常（无论是内置快照还是用户层快照）。更多信息请参见
[绑定函数文档](../../src/README.md#registering-binding-functions-used-in-bootstrap)。

## 类型检查

如果回调参数是“原始” C++ 类型（例如 `int32_t`），则不需要类型检查，因为 V8 只会在 JavaScript 函数调用中的参数与 fast 回调签名中的对应参数类型匹配时，才调用 fast 回调。

非原始参数（例如 TypedArray）会以 `v8::Local<v8::Value>` 的形式传递给 Fast API 回调。不过，以这种参数类型注册 fast 回调，意味着向 V8 引擎表明它可以使用 _任意值_ 作为该参数来调用 fast 回调。

如果使用 `v8::Local<v8::Value>` 类型的参数，那么在实现中有责任确保在强制转换或以其他方式使用这些参数之前对其进行校验。这可以在 C++ 回调本身内部完成，也可以通过一个 JavaScript 包装函数在调用绑定函数之前执行必要的校验。

## 栈上分配对象和垃圾回收

Fast API 现在允许访问 isolate，并允许在栈上分配 `v8::Local` 句柄。

打算使用此功能的 fast 回调应接受一个最终参数，类型为 `v8::FastApiCallbackOptions&`。V8 会通过 `options.isolate` 传入 isolate 指针。

如果 fast 回调在回调内部创建了任何 `v8::Local` 句柄，那么它必须先初始化一个新的 `v8::HandleScope`，以确保这些句柄正确地受作用域管理并被垃圾回收。

```cpp
bool FastIsIterable(v8::Local<v8::Value> receiver,
                    v8::Local<v8::Value> argument,
                    v8::FastApiCallbackOptions& options) {
  if (!argument->IsObject()) {
    return false;
  }

  // 为了创建任何 Local 句柄，我们首先需要一个 HandleScope
  v8::HandleScope HandleScope(options.isolate);

  v8::Local<v8::Object> object = argument.As<v8::Object>();
  v8::Local<v8::Value> value;
  if (!object->Get(options.isolate->GetCurrentContext(),
                   v8::Symbol::GetIterator(options.isolate)).ToLocal(&value)) {
    return false;
  }
  return value->IsFunction();
}
```

如果 fast 回调调用了其他函数，而这些函数本身会创建 `v8::Local` 句柄，那么同样适用，除非这些函数会创建自己的 `v8::HandleScope`。一般来说，如果 fast 回调在其函数体内与 `v8::Local` 句柄交互，它很可能需要一个 handle scope。

## Fast API 回调的调试跟踪

为了让测试套件跟踪某个函数调用何时使用了 Fast
API 路径，请在你的 fast 回调中添加 `TRACK_V8_FAST_API_CALL` 宏。

```cpp
bool FastIsEven(v8::Local<v8::Value> receiver,
                const int32_t n) {
  TRACK_V8_FAST_API_CALL("util.isEven");
  return n % 2 == 0;
}
```

跟踪键必须是唯一的，并且应采用以下形式：

`<namespace> "." <function> [ "." <subpath> ]`

上面的示例假设 fast 回调绑定到 `util` 模块绑定的 `isEven`
方法。若要跟踪回调内部的特定子路径，请使用带有子路径说明符的键，例如 `"util.isEven.error"`。

这些跟踪事件可以在调试模式下被观察到，并用于测试 fast 路径是否被正确调用。有关详情，请参见
[测试 Fast API 回调](#testing-fast-api-callbacks)。

## 处理错误

现在可以在 fast API 调用中抛出错误了。

任何可能需要向 JavaScript 环境抛出错误的 fast 回调，都应接受一个类型为 `v8::FastApiCallbackOptions&` 的最终 `options` 参数。V8 会通过 `options.isolate` 传入 isolate 指针。

然后回调应以标准方式抛出 JavaScript 错误。它还需要返回一个虚拟值，以满足函数签名要求。

如上所述，在执行任何会创建局部句柄的操作之前，必须先初始化 `v8::HandleScope`。

```cpp
static double FastDivide(v8::Local<v8::Value> receiver,
                         const int32_t a,
                         const int32_t b,
                         v8::FastApiCallbackOptions& options) {
  if (b == 0) {
    TRACK_V8_FAST_API_CALL("math.divide.error");
    v8::HandleScope handle_scope(options.isolate);
    THROW_ERR_INVALID_ARG_VALUE(options.isolate,
                                "不能除以零");
    return 0; // 虚拟值，会被 V8 忽略
  }

  TRACK_V8_FAST_API_CALL("math.divide.ok");
  return a / b;
}
```

## 测试 Fast API 回调

为了在测试中强制 V8 使用 Fast API 路径，请使用 V8 natives 强制优化调用 fast 目标的 JavaScript 函数。如果直接导入绑定，你需要先将调用包裹在一个 JavaScript 函数中。

```js
// Flags: --allow-natives-syntax --expose-internals --no-warnings

const common = require('../common');
const assert = require('node:assert');

const { internalBinding } = require('internal/test/binding');
const { isEven } = internalBinding('...');

function testFastAPICall() {
  assert.strictEqual(isEven(0), true);
}

// 第一个 V8 指令会为优化准备包装函数。
eval('%PrepareFunctionForOptimization(testFastAPICall)');
// 这次调用将使用慢路径。
testFastAPICall();

// 第二个 V8 指令将触发优化。
eval('%OptimizeFunctionOnNextCall(testFastAPICall)');
// 这次调用将使用 fast 路径。
testFastAPICall();
```

在调试构建中，可以使用 `getV8FastApiCallCount` 函数观察
[`TRACK_V8_FAST_API_CALL`](#debug-tracking-of-fast-api-callbacks) 事件，以验证 fast 路径是否被正确调用。所有 fast 回调都应以这种方式进行测试。

```js
function testFastAPICalls() {
  assert.strictEqual(isEven(1), false);
  assert.strictEqual(isEven(2), true);
}

eval('%PrepareFunctionForOptimization(testFastAPICalls)');
testFastAPICalls();
eval('%OptimizeFunctionOnNextCall(testFastAPICalls)');
testFastAPICalls();

if (common.isDebug) {
  const { getV8FastApiCallCount } = internalBinding('debug');
  assert.strictEqual(getV8FastApiCallCount('util.isEven'), 2);
}
```

## 示例

一个在 JavaScript 和 C++ 之间通信的典型函数如下。

* 在 JavaScript 侧：

  ```js
  const { divide } = internalBinding('custom_namespace');
  ```

* 在 C++ 侧：

  ```cpp
  #include "node_debug.h"
  #include "v8-fast-api-calls.h"

  namespace node {
  namespace custom_namespace {

  using v8::FastApiCallbackOptions;
  using v8::FunctionCallbackInfo;
  using v8::HandleScope;
  using v8::Int32;
  using v8::Number;
  using v8::Value;

  static void SlowDivide(const FunctionCallbackInfo<Value>& args) {
    Environment* env = Environment::GetCurrent(args);
    if (!args[0]->IsInt32() || !args[1]->IsInt32()) {
      return THROW_ERR_INVALID_ARG_TYPE(env, "操作数必须是整数");
    }
    auto a = args[0].As<Int32>();
    auto b = args[1].As<Int32>();

    if (b->Value() == 0) {
      return THROW_ERR_INVALID_ARG_VALUE(env, "不能除以零");
    }

    double result = a->Value() / b->Value();
    args.GetReturnValue().Set(Number::New(env->isolate(), result));
  }

  static double FastDivide(v8::Local<v8::Value> receiver,
                           const int32_t a,
                           const int32_t b,
                           FastApiCallbackOptions& options) {
    if (b == 0) {
      TRACK_V8_FAST_API_CALL("custom_namespace.divide.error");
      HandleScope handle_scope(options.isolate);
      THROW_ERR_INVALID_ARG_VALUE(options.isolate, "不能除以零");
      return 0;
    }

    TRACK_V8_FAST_API_CALL("custom_namespace.divide.ok");
    return a / b;
  }

  static CFunction fast_divide(CFunction::Make(FastDivide));

  static void Initialize(Local<Object> target,
                         Local<Value> unused,
                         Local<Context> context,
                         void* priv) {
    SetFastMethodNoSideEffect(context,
                              target,
                              "divide",
                              SlowDivide,
                              &fast_divide);
  }

  void RegisterExternalReferences(ExternalReferenceRegistry* registry) {
    registry->Register(SlowDivide);
    registry->Register(fast_divide);
  }

  } // namespace custom_namespace
  } // namespace node

  NODE_BINDING_CONTEXT_AWARE_INTERNAL(custom_namespace,
                                      node::custom_namespace::Initialize);
  NODE_BINDING_EXTERNAL_REFERENCE(
                        custom_namespace,
                        node::custom_namespace::RegisterExternalReferences);
  ```

* 在单元测试中：

  由于 Fast API 回调使用了 `TRACK_V8_FAST_API_CALL`，我们可以通过编写强制
  V8 优化并检查计数器的测试，来确保 fast 路径被执行并对其进行测试。

在单元测试中，由于 fast API 函数使用了 `TRACK_V8_FAST_API_CALL`，
我们可以通过编写强制 V8 优化并检查计数器的测试，来确保 fast 路径被执行并对其进行测试。

```js
// Flags: --expose-internals --no-warnings --allow-natives-syntax
'use strict';
const common = require('../common');

const { internalBinding } = require('internal/test/binding');
// 我们也可以直接 require 一个在内部使用该绑定的函数。
const { divide } = internalBinding('custom_namespace');

// 将被优化的函数。它必须是用
// JavaScript 编写的函数。由于 `divide` 来自 C++ 侧，我们需要先对其进行包装。
function testFastPath(a, b) {
  return divide(a, b);
}

eval('%PrepareFunctionForOptimization(testFastPath)');
// 这次调用会让 V8 知道该函数期望的参数类型。
assert.strictEqual(testFastPath(6, 3), 2);

eval('%OptimizeFunctionOnNextCall(testFastPath)');
assert.strictEqual(testFastPath(8, 2), 4);
assert.throws(() => testFastPath(1, 0), {
  code: 'ERR_INVALID_STATE',
});

if (common.isDebug) {
  const { getV8FastApiCallCount } = internalBinding('debug');
  assert.strictEqual(getV8FastApiCallCount('custom_namespace.divide.ok'), 1);
  assert.strictEqual(getV8FastApiCallCount('custom_namespace.divide.error'), 1);
}
```
