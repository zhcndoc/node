# C++ 插件

<!--introduced_in=v0.10.0-->

<!-- type=misc -->

_插件_ 是动态链接的共享对象，可以通过 [注册函数][]
作为普通的 Node.js 模块加载。
插件提供了 JavaScript 和本地代码之间的外部函数接口。

实现插件有三种选项：

* [Node-API][]（推荐）
* `nan` ([Node.js 的原生抽象][])
* 直接使用公开的 V8、libuv 和 Node.js 接口

本文档的其余部分侧重于后者，需要了解多个组件和 API：

* [V8][]：Node.js 用于提供 JavaScript 实现的 C++ 库。它提供了创建对象、
  调用函数等的机制。V8 的 API 主要在 `v8.h` 头文件中文档化（Node.js 源代码
  树中的 `deps/v8/include/v8.h`），也可 [在线][v8-docs] 获取。

* [`libuv`][]：实现 Node.js 事件循环、其工作
  线程以及平台所有异步行为的 C 库。它还
  作为一个跨平台抽象库，在所有主要操作系统上提供简单、类似 POSIX 的
  访问许多常见系统任务的方式，例如
  与文件系统、套接字、定时器和系统事件交互。libuv
  还为需要超越
  标准事件循环的更复杂的异步插件提供类似 POSIX 线程的线程抽象。插件作者应
  避免通过 I/O 或其他耗时任务阻塞事件循环，方法是通过 libuv 将工作
  卸载到非阻塞系统操作、工作线程，
  或自定义使用 libuv 线程。

* 公共 Node.js 接口：Node.js 本身导出 C++ API，
  插件和嵌入器都可以使用。

* 其他静态链接库（包括 OpenSSL）：这些
  其他库位于 Node.js 源代码树中的 `deps/` 目录中。只有 libuv、OpenSSL、V8 和 zlib 符号是 Node.js 有意
  重新导出的，插件可以在不同程度上使用它们。请参阅
  [链接到 Node.js 包含的库][] 以获取更多信息。

以下所有示例均可 [下载][]，并可
  用作插件的起点。

## 你好世界

这个“Hello world”示例是一个简单的插件，用 C++ 编写，相当于以下 JavaScript 代码：

```js
module.exports.hello = () => 'world';
```

首先，创建文件 `hello.cc`：

```cpp
// hello.cc
#include <node.h>

namespace demo {

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::NewStringType;
using v8::Object;
using v8::String;
using v8::Value;

void Method(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  args.GetReturnValue().Set(String::NewFromUtf8(
      isolate, "world", NewStringType::kNormal).ToLocalChecked());
}

void Initialize(Local<Object> exports) {
  NODE_SET_METHOD(exports, "hello", Method);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize) // 注意：没有分号，这不是一个函数

}  // namespace demo
```

在大多数平台上，以下 `Makefile` 可以帮助我们开始：

<!--lint disable no-tabs remark-lint-->

```bash
NODEJS_DEV_ROOT ?= $(shell dirname "$$(command -v node)")/..
CXXFLAGS = -std=c++23 -I$(NODEJS_DEV_ROOT)/include/node -fPIC -shared -Wl,-undefined,dynamic_lookup

hello.node: hello.cc
	$(CXX) $(CXXFLAGS) -o $@ $<
```

<!--lint enable no-tabs remark-lint-->

然后运行以下命令将编译并运行代码：

```console
$ make
$ node -p 'require("./hello.node").hello()'
world
```

要与 npm 生态系统集成，请参阅 [构建][] 部分。

### 感知上下文的插件

使用 `NODE_MODULE()` 定义的插件不能同时在多个上下文或
多个线程中加载。

有些环境中，Node.js 插件可能需要多次加载到多个上下文中。例如，[Electron][] 运行时在单个进程中运行多个
Node.js 实例。每个实例都有自己的
`require()` 缓存，因此每个实例都需要一个本地插件在通过 `require()` 加载时表现
正确。这意味着插件
必须支持多次初始化。

可以通过使用宏
`NODE_MODULE_INITIALIZER` 构建感知上下文的插件，该宏扩展为 Node.js
加载插件时期望找到的函数名称。因此，插件可以如下例所示进行初始化：

```cpp
using namespace v8;

extern "C" NODE_MODULE_EXPORT void
NODE_MODULE_INITIALIZER(Local<Object> exports,
                        Local<Value> module,
                        Local<Context> context) {
  /* 在此处执行插件初始化步骤。 */
}
```

另一个选项是使用宏 `NODE_MODULE_INIT()`，它也将
构建一个感知上下文的插件。与 `NODE_MODULE()` 不同（后者用于
围绕给定的插件初始化函数构建插件），
`NODE_MODULE_INIT()` 作为此类初始化函数的声明，后跟函数体。

在调用 `NODE_MODULE_INIT()` 之后的函数体内可以使用以下三个变量：

* `Local<Object> exports`，
* `Local<Value> module`，和
* `Local<Context> context`

构建感知上下文的插件需要仔细管理全局静态数据
以确保稳定性和正确性。由于插件可能会多次加载，甚至可能从不同的线程加载，因此插件中存储的任何全局静态数据都必须得到适当保护，并且不能包含任何对
JavaScript 对象的持久引用。原因是 JavaScript
对象仅在一个上下文中有效，如果从错误的上下文或从不同于它们创建的线程访问，很可能会导致崩溃。

可以通过执行以下步骤来构建感知上下文的插件，以避免全局静态数据：

* 定义一个类，该类将保存每个插件实例的数据，并具有一个静态
  成员，形式为
  ```cpp
  static void DeleteInstance(void* data) {
    // 将 `data` 强制转换为类的实例并删除它。
  }
  ```
* 在插件初始化器中堆分配该类的一个实例。这可以
  通过使用 `new` 关键字完成。
* 调用 `node::AddEnvironmentCleanupHook()`，将上面创建的
  实例和指向 `DeleteInstance()` 的指针传递给它。这将确保实例在
  环境销毁时被删除。
* 将类的实例存储在 `v8::External` 中，并
* 通过将 `v8::External` 传递给 `v8::FunctionTemplate::New()` 或 `v8::Function::New()` 来将其传递给所有暴露给 JavaScript 的方法，这两个函数创建
  本地支持的 JavaScript 函数。
  `v8::FunctionTemplate::New()` 或 `v8::Function::New()` 的第三个参数接受
  `v8::External` 并使用
  `v8::FunctionCallbackInfo::Data()` 方法在本地回调中使其可用。

这将确保每个插件实例的数据到达每个可以从 JavaScript 调用的绑定。每个插件实例的数据也必须传递到
插件可能创建的任何异步回调中。

以下示例说明了感知上下文插件的实现：

```cpp
#include <node.h>

using namespace v8;

class AddonData {
 public:
  explicit AddonData(Isolate* isolate):
      call_count(0) {
    // 确保此每个插件实例的数据在环境清理时被删除。
    node::AddEnvironmentCleanupHook(isolate, DeleteInstance, this);
  }

  // 每个插件的数据。
  int call_count;

  static void DeleteInstance(void* data) {
    delete static_cast<AddonData*>(data);
  }
};

static void Method(const v8::FunctionCallbackInfo<v8::Value>& info) {
  // 检索每个插件实例的数据。
  AddonData* data =
      reinterpret_cast<AddonData*>(info.Data().As<External>()->Value());
  data->call_count++;
  info.GetReturnValue().Set((double)data->call_count);
}

// 初始化此插件以感知上下文。
NODE_MODULE_INIT(/* exports, module, context */) {
  Isolate* isolate = Isolate::GetCurrent();

  // 为此插件实例创建一个新的 `AddonData` 实例并
  // 将其生命周期与 Node.js 环境的生命周期绑定。
  AddonData* data = new AddonData(isolate);

  // 将数据包装在 `v8::External` 中，以便我们可以将其传递给我们
  // 暴露的方法。
  Local<External> external = External::New(isolate, data);

  // 将方法 `Method` 暴露给 JavaScript，并通过将 `external` 作为
  // 第三个参数传递给 `FunctionTemplate` 构造函数，确保它接收我们
  // 上面创建的每个插件实例的数据。
  exports->Set(context,
               String::NewFromUtf8(isolate, "method").ToLocalChecked(),
               FunctionTemplate::New(isolate, Method, external)
                  ->GetFunction(context).ToLocalChecked()).FromJust();
}
```

#### Worker 支持

<!-- YAML
changes:
  - version:
    - v14.8.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/34572
    description: 清理钩子现在可以是异步的。
-->

为了能够从多个 Node.js 环境加载，
例如主线程和 Worker 线程，插件需要：

* 是一个 [Node-API][] 插件。
* 如上所述使用 `NODE_MODULE_INIT()` 声明为感知上下文。

为了支持 [`Worker`][] 线程，插件需要清理任何
在此类线程退出时可能已分配的资源。这可以通过
使用 `AddEnvironmentCleanupHook()` 函数来实现：

```cpp
void AddEnvironmentCleanupHook(v8::Isolate* isolate,
                               void (*fun)(void* arg),
                               void* arg);
```

此函数添加一个钩子，该钩子将在给定 Node.js 实例关闭
之前运行。如有必要，可以在运行之前使用
`RemoveEnvironmentCleanupHook()` 删除此类钩子，它具有相同的签名。回调按
后进先出顺序运行。

如有必要，还有一对额外的 `AddEnvironmentCleanupHook()`
和 `RemoveEnvironmentCleanupHook()` 重载，其中清理钩子接受一个
回调函数。这可用于关闭异步资源，
例如插件注册的任何 libuv 句柄。

以下 `addon.cc` 使用 `AddEnvironmentCleanupHook`：

<!-- addon-verify-file worker_support/addon.cc -->

```cpp
// addon.cc
#include <node.h>
#include <assert.h>
#include <stdlib.h>

using node::AddEnvironmentCleanupHook;
using v8::HandleScope;
using v8::Isolate;
using v8::Local;
using v8::Object;

// 注意：在实际应用中，不要依赖静态/全局数据。
static char cookie[] = "yum yum";
static int cleanup_cb1_called = 0;
static int cleanup_cb2_called = 0;

static void cleanup_cb1(void* arg) {
  Isolate* isolate = static_cast<Isolate*>(arg);
  HandleScope scope(isolate);
  Local<Object> obj = Object::New(isolate);
  assert(!obj.IsEmpty());  // 断言 VM 仍然存活
  assert(obj->IsObject());
  cleanup_cb1_called++;
}

static void cleanup_cb2(void* arg) {
  assert(arg == static_cast<void*>(cookie));
  cleanup_cb2_called++;
}

static void sanity_check(void*) {
  assert(cleanup_cb1_called == 1);
  assert(cleanup_cb2_called == 1);
}

// 初始化此插件以感知上下文。
NODE_MODULE_INIT(/* exports, module, context */) {
  Isolate* isolate = Isolate::GetCurrent();

  AddEnvironmentCleanupHook(isolate, sanity_check, nullptr);
  AddEnvironmentCleanupHook(isolate, cleanup_cb2, cookie);
  AddEnvironmentCleanupHook(isolate, cleanup_cb1, isolate);
}
```

通过运行以下命令在 JavaScript 中测试：

<!-- addon-verify-file worker_support/test.js -->

```js
// test.js
require('./build/Release/addon');
```

### 构建

一旦源代码编写完成，必须将其编译为二进制
`addon.node` 文件。为此，在项目的
顶层创建一个名为 `binding.gyp` 的文件，使用类似 JSON 的格式描述模块的构建配置。此文件由 [`node-gyp`][] 使用，这是一个专门
用于编译 Node.js 插件的工具。

```json
{
  "targets": [
    {
      "target_name": "addon",
      "sources": [ "hello.cc" ]
    }
  ]
}
```

`node-gyp` 工具的一个版本随 Node.js 一起捆绑分发，作为 `npm` 的一部分。此版本不直接供
开发人员使用，仅旨在支持使用
`npm install` 命令编译和安装插件的能力。希望直接使用 `node-gyp` 的开发人员可以使用命令
`npm install -g node-gyp` 安装它。请参阅 `node-gyp` [安装说明][] 以
获取更多信息，包括特定于平台的要求。

创建 `binding.gyp` 文件后，使用 `node-gyp configure` 为
当前平台生成适当的项目构建文件。这
将在 `build/` 目录中生成 `Makefile`（在 Unix 平台上）或 `vcxproj` 文件
（在 Windows 上）。

接下来，调用 `node-gyp build` 命令生成编译后的 `addon.node`
文件。这将放入 `build/Release/` 目录中。

使用 `npm install` 安装 Node.js 插件时，npm 使用其自己捆绑的
`node-gyp` 版本执行这组相同的操作，按需为用户的平台生成
插件的编译版本。

构建完成后，可以通过将
[`require()`][] 指向构建的 `addon.node` 模块在 Node.js 中使用二进制插件：

```js
// hello.js
const addon = require('./build/Release/addon');

console.log(addon.hello());
// 打印：'world'
```

因为编译后的插件二进制文件的确切路径可能因编译方式而异（即有时它可能在 `./build/Debug/` 中），插件可以使用 [bindings][] 包来加载编译后的模块。

虽然 `bindings` 包的实现在定位插件模块方面更复杂，但它本质上使用类似于以下的 `try…catch` 模式：

```js
try {
  return require('./build/Release/addon.node');
} catch (err) {
  return require('./build/Debug/addon.node');
}
```

### 链接到 Node.js 包含的库

Node.js 使用静态链接库，如 V8、libuv 和 OpenSSL。所有
插件都需要链接到 V8，并且也可以链接到任何其他依赖项
。通常，这就像包含适当的
`#include <...>` 语句（例如 `#include <v8.h>`）一样简单，`node-gyp` 将自动
找到适当的头文件。但是，需要注意以下几点：

* 当 `node-gyp` 运行时，它将检测 Node.js 的特定发布版本
  并下载完整的源代码 tarball 或仅下载头文件。如果下载了完整
  的源代码，插件将完全访问全套
  Node.js 依赖项。但是，如果仅下载了 Node.js 头文件，
  则只有 Node.js 导出的符号可用。

* `node-gyp` 可以使用 `--nodedir` 标志运行，指向本地 Node.js
  源代码镜像。使用此选项，插件将访问全套
  依赖项。

### 使用 `require()` 加载插件

编译后的插件二进制文件的文件扩展名是 `.node`（与
`.dll` 或 `.so` 相反）。[`require()`][] 函数被编写为查找
具有 `.node` 文件扩展名的文件，并将它们初始化为动态链接
库。

调用 [`require()`][] 时，通常可以省略 `.node` 扩展名，Node.js 仍将找到并初始化插件。然而，有一个注意事项，
即 Node.js 将首先尝试定位和加载恰好共享相同
基本名称的模块或 JavaScript 文件。例如，如果
二进制文件 `addon.node` 所在的同一目录中有一个文件 `addon.js`，
那么 [`require('addon')`][`require()`] 将优先使用 `addon.js` 文件
并加载它。

### 使用 `import` 加载插件

<!-- YAML
added:
  - v23.6.0
  - v22.20.0
-->

> 稳定性：1.0 - 早期开发

你可以使用 [`--experimental-addon-modules`][] 标志来启用支持
静态 `import` 和动态 `import()` 来加载二进制插件。

如果我们重用之前的 Hello World 示例，你可以这样做：

```mjs
// hello.mjs
import myAddon from './hello.node';
// 注意：import {hello} from './hello.node' 不起作用

console.log(myAddon.hello());
```

```console
$ node --experimental-addon-modules hello.mjs
world
```

## Node.js 的原生抽象

本文档中展示的每个示例都直接使用
Node.js 和 V8 API 来实现插件。V8 API 可能会，并且已经
从一个 V8 版本到下一个版本（以及从一个主要 Node.js 版本到
下一个版本）发生了巨大的变化。随着每次更改，插件可能需要
更新和重新编译才能继续运行。Node.js 的发布计划旨在
最小化此类更改的频率和影响，但 Node.js 几乎无法
确保 V8 API 的稳定性。

[Node.js 的原生抽象][]（或 `nan`）提供了一套工具，
建议插件开发者使用这些工具来保持与过去和
未来版本的 V8 和 Node.js 的兼容性。请参阅 `nan` [示例][] 以
了解如何使用它的说明。

## Node-API

> 稳定性：2 - 稳定

请参阅 [使用 Node-API 的 C/C++ 插件][Node-API]。

## 插件示例

以下是一些示例插件，旨在帮助开发者入门。这些
示例使用 V8 API。请参阅在线 [V8 参考][v8-docs]
以获取各种 V8 调用的帮助，并参阅 V8 的 [嵌入者指南][] 以
了解所使用的几个概念的解释，例如句柄、作用域、函数
模板等。

每个示例都使用以下 `binding.gyp` 文件：

```json
{
  "targets": [
    {
      "target_name": "addon",
      "sources": [ "addon.cc" ]
    }
  ]
}
```

如果有多个 `.cc` 文件，只需将额外的
文件名添加到 `sources` 数组中：

```json
"sources": ["addon.cc", "myexample.cc"]
```

一旦 `binding.gyp` 文件准备就绪，可以使用 `node-gyp` 配置和
构建示例插件：

```bash
node-gyp configure build
```

### 函数参数

插件通常会暴露对象和函数，以便在 Node.js 中运行的
JavaScript 访问。当从 JavaScript 调用函数时，
输入参数和返回值必须与 C/C++
代码之间进行映射。

以下示例说明了如何读取从
JavaScript 传递的函数参数以及如何返回结果：

<!-- addon-verify-file function_arguments/addon.cc -->

```cpp
// addon.cc
#include <node.h>

namespace demo {

using v8::Exception;
using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Number;
using v8::Object;
using v8::String;
using v8::Value;

// 这是 "add" 方法的实现
// 输入参数通过
// const FunctionCallbackInfo<Value>& args 结构体传递
void Add(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  // 检查传递的参数数量。
  if (args.Length() < 2) {
    // 抛出一个错误并传回 JavaScript
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate,
                            "Wrong number of arguments").ToLocalChecked()));
    return;
  }

  // 检查参数类型
  if (!args[0]->IsNumber() || !args[1]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate,
                            "Wrong arguments").ToLocalChecked()));
    return;
  }

  // 执行操作
  double value =
      args[0].As<Number>()->Value() + args[1].As<Number>()->Value();
  Local<Number> num = Number::New(isolate, value);

  // 设置返回值（使用传入的
  // FunctionCallbackInfo<Value>&）
  args.GetReturnValue().Set(num);
}

void Init(Local<Object> exports) {
  NODE_SET_METHOD(exports, "add", Add);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Init)

}  // namespace demo
```

编译完成后，可以在 Node.js 中 require 并使用示例插件：

<!-- addon-verify-file function_arguments/test.js -->

```js
// test.js
const addon = require('./build/Release/addon');

console.log('这应该是八：', addon.add(3, 5));
```

### 回调

在插件中，将 JavaScript 函数传递给 C++
函数并从那里执行它们是常见的做法。以下示例说明了如何
调用此类回调：

<!-- addon-verify-file callbacks/addon.cc -->

```cpp
// addon.cc
#include <node.h>

namespace demo {

using v8::Context;
using v8::Function;
using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Null;
using v8::Object;
using v8::String;
using v8::Value;

void RunCallback(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  Local<Context> context = isolate->GetCurrentContext();
  Local<Function> cb = Local<Function>::Cast(args[0]);
  const unsigned argc = 1;
  Local<Value> argv[argc] = {
      String::NewFromUtf8(isolate,
                          "hello world").ToLocalChecked() };
  cb->Call(context, Null(isolate), argc, argv).ToLocalChecked();
}

void Init(Local<Object> exports, Local<Object> module) {
  NODE_SET_METHOD(module, "exports", RunCallback);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Init)

}  // namespace demo
```

此示例使用 `Init()` 的双参数形式，它将完整的
`module` 对象作为第二个参数接收。这允许插件完全
用单个函数覆盖 `exports`，而不是将该函数作为
`exports` 的属性添加。

要测试它，运行以下 JavaScript：

<!-- addon-verify-file callbacks/test.js -->

```js
// test.js
const addon = require('./build/Release/addon');

addon((msg) => {
  console.log(msg);
// 打印：'hello world'
});
```

在此示例中，回调函数是同步调用的。

### 对象工厂

插件可以在 C++ 函数中创建并返回新对象，如下例所示。创建并返回一个对象，该对象具有一个
属性 `msg`，该属性回显传递给 `createObject()` 的字符串：

<!-- addon-verify-file object_factory/addon.cc -->

```cpp
// addon.cc
#include <node.h>

namespace demo {

using v8::Context;
using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;

void CreateObject(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  Local<Context> context = isolate->GetCurrentContext();

  Local<Object> obj = Object::New(isolate);
  obj->Set(context,
           String::NewFromUtf8(isolate,
                               "msg").ToLocalChecked(),
                               args[0]->ToString(context).ToLocalChecked())
           .FromJust();

  args.GetReturnValue().Set(obj);
}

void Init(Local<Object> exports, Local<Object> module) {
  NODE_SET_METHOD(module, "exports", CreateObject);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Init)

}  // namespace demo
```

在 JavaScript 中测试它：

<!-- addon-verify-file object_factory/test.js -->

```js
// test.js
const addon = require('./build/Release/addon');

const obj1 = addon('hello');
const obj2 = addon('world');
console.log(obj1.msg, obj2.msg);
// 打印：'hello world'
```

### 函数工厂

另一种常见的场景是创建用于包装 C++
函数的 JavaScript 函数，并将它们返回给 JavaScript：

<!-- addon-verify-file function_factory/addon.cc -->

```cpp
// addon.cc
#include <node.h>

namespace demo {

using v8::Context;
using v8::Function;
using v8::FunctionCallbackInfo;
using v8::FunctionTemplate;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;

void MyFunction(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  args.GetReturnValue().Set(String::NewFromUtf8(
      isolate, "hello world").ToLocalChecked());
}

void CreateFunction(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  Local<Context> context = isolate->GetCurrentContext();
  Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, MyFunction);
  Local<Function> fn = tpl->GetFunction(context).ToLocalChecked();

  // 省略此项以使其匿名
  fn->SetName(String::NewFromUtf8(
      isolate, "theFunction").ToLocalChecked());

  args.GetReturnValue().Set(fn);
}

void Init(Local<Object> exports, Local<Object> module) {
  NODE_SET_METHOD(module, "exports", CreateFunction);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Init)

}  // namespace demo
```

测试：

<!-- addon-verify-file function_factory/test.js -->

```js
// test.js
const addon = require('./build/Release/addon');

const fn = addon();
console.log(fn());
// 打印：'hello world'
```

### 包装 C++ 对象

也可以包装 C++ 对象/类，以便可以使用
JavaScript `new` 运算符创建新实例：

<!-- addon-verify-file wrapping_c_objects/addon.cc -->

```cpp
// addon.cc
#include <node.h>
#include "myobject.h"

namespace demo {

using v8::Local;
using v8::Object;

void InitAll(Local<Object> exports) {
  MyObject::Init(exports);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, InitAll)

}  // namespace demo
```

然后，在 `myobject.h` 中，包装类继承自一个辅助 `ObjectWrap`
它负责将 C++ 对象的生命周期与暴露的 JS 对象绑定：

<!-- addon-verify-file wrapping_c_objects/myobject.h -->

```cpp
// myobject.h
#ifndef MYOBJECT_H
#define MYOBJECT_H

#include <node.h>
#include "object_wrap.h"

namespace demo {

class MyObject : public ObjectWrap {
 public:
  static void Init(v8::Local<v8::Object> exports);

 private:
  explicit MyObject(double value = 0);
  ~MyObject();

  static void New(const v8::FunctionCallbackInfo<v8::Value>& args);
  static void PlusOne(const v8::FunctionCallbackInfo<v8::Value>& args);

  double value_;
};

}  // namespace demo

#endif
```

其中 `ObjectWrap` 定义为

<!-- addon-verify-file wrapping_c_objects/object_wrap.h factory_of_wrapped_objects/object_wrap.h passing_wrapped_objects_around/object_wrap.h -->

```cpp
// object_wrap.h
#ifndef OBJECTWRAP_H
#define OBJECTWRAP_H

#include <node.h>

namespace demo {

class ObjectWrap {
 public:
  ObjectWrap() : isolate_(v8::Isolate::GetCurrent()) {
    node::AddEnvironmentCleanupHook(isolate_, CleanupHook, this);
  }

  virtual ~ObjectWrap() {
    node::RemoveEnvironmentCleanupHook(isolate_, CleanupHook, this);
  }

  template <class T>
  static T* Unwrap(v8::Local<v8::Object> handle) {
    void* ptr = handle->GetAlignedPointerFromInternalField(
        0, v8::kEmbedderDataTypeTagDefault);
    ObjectWrap* wrap = static_cast<ObjectWrap*>(ptr);
    return static_cast<T*>(wrap);
  }

  v8::Local<v8::Object> object() {
    return handle_.Get(isolate_);
  }

 protected:
  inline void Wrap(v8::Local<v8::Object> handle) {
    handle->SetAlignedPointerInInternalField(
        0, this, v8::kEmbedderDataTypeTagDefault);
    handle_.Reset(isolate_, handle);
  }

  inline void MakeWeak() {
    handle_.SetWeak(this, WeakCallback, v8::WeakCallbackType::kParameter);
  }

 private:
  static void WeakCallback(
      const v8::WeakCallbackInfo<ObjectWrap>& data) {
    delete data.GetParameter();
  }

  static void CleanupHook(void* arg) { delete static_cast<ObjectWrap*>(arg); }

  v8::Global<v8::Object> handle_;
  v8::Isolate* isolate_;
};

}  // namespace demo
#endif
```

在 `myobject.cc` 中，实现要暴露的各种方法。
在下面的代码中，通过将方法 `plusOne()` 添加到
构造函数的原型来将其暴露：

<!-- addon-verify-file wrapping_c_objects/myobject.cc -->

```cpp
// myobject.cc
#include "myobject.h"

namespace demo {

using v8::Context;
using v8::Function;
using v8::FunctionCallbackInfo;
using v8::FunctionTemplate;
using v8::Isolate;
using v8::Local;
using v8::Number;
using v8::Object;
using v8::ObjectTemplate;
using v8::String;
using v8::Value;

MyObject::MyObject(double value) : value_(value) {
}

MyObject::~MyObject() {
}

void MyObject::Init(Local<Object> exports) {
  Isolate* isolate = Isolate::GetCurrent();
  Local<Context> context = isolate->GetCurrentContext();

  Local<ObjectTemplate> addon_data_tpl = ObjectTemplate::New(isolate);
  addon_data_tpl->SetInternalFieldCount(1);  // MyObject::New() 的 1 个字段
  Local<Object> addon_data =
      addon_data_tpl->NewInstance(context).ToLocalChecked();

  // 准备构造函数模板
  Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, New, addon_data);
  tpl->SetClassName(String::NewFromUtf8(isolate, "MyObject").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  // 原型
  NODE_SET_PROTOTYPE_METHOD(tpl, "plusOne", PlusOne);

  Local<Function> constructor = tpl->GetFunction(context).ToLocalChecked();
  addon_data->SetInternalField(0, constructor);
  exports->Set(context, String::NewFromUtf8(
      isolate, "MyObject").ToLocalChecked(),
      constructor).FromJust();
}

void MyObject::New(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  Local<Context> context = isolate->GetCurrentContext();

  if (args.IsConstructCall()) {
    // 作为构造函数调用：`new MyObject(...)`
    double value = args[0]->IsUndefined() ?
        0 : args[0]->NumberValue(context).FromMaybe(0);
    MyObject* obj = new MyObject(value);
    obj->Wrap(args.This());
    obj->MakeWeak();
    args.GetReturnValue().Set(args.This());
  } else {
    // 作为普通函数 `MyObject(...)` 调用，转为构造调用。
    const int argc = 1;
    Local<Value> argv[argc] = { args[0] };
    Local<Function> cons =
        args.Data().As<Object>()->GetInternalField(0)
            .As<Value>().As<Function>();
    Local<Object> result =
        cons->NewInstance(context, argc, argv).ToLocalChecked();
    args.GetReturnValue().Set(result);
  }
}

void MyObject::PlusOne(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  MyObject* obj = ObjectWrap::Unwrap<MyObject>(args.This());
  obj->value_ += 1;

  args.GetReturnValue().Set(Number::New(isolate, obj->value_));
}

}  // namespace demo
```

要构建此示例，必须将 `myobject.cc` 文件添加到
`binding.gyp`：

```json
{
  "targets": [
    {
      "target_name": "addon",
      "sources": [
        "addon.cc",
        "myobject.cc"
      ]
    }
  ]
}
```

<!-- 附加组件验证文件 wrapping_c_objects/test.js -->

```js
// test.js
const addon = require('./build/Release/addon');

const obj = new addon.MyObject(10);
console.log(obj.plusOne());
// 打印：11
console.log(obj.plusOne());
// 打印：12
console.log(obj.plusOne());
// 打印：13
```

包装对象的析构函数将在对象被
垃圾回收时运行。对于析构函数测试，有一些命令行标志
可用于强制垃圾回收。这些标志
由底层的 V8 JavaScript 引擎提供。它们可能会随时
更改或删除。Node.js 或 V8 未记录它们，并且
绝不应在测试之外使用它们。

在进程或工作线程关闭期间，JS 引擎不会调用
析构函数。因此，用户有责任跟踪
这些对象并确保适当销毁以避免资源泄漏。

### 包装对象的工厂

或者，可以使用工厂模式来避免使用
JavaScript `new` 运算符显式创建对象实例：

```js
const obj = addon.createObject();
// 而不是：
// const obj = new addon.Object();
```

首先，在 `addon.cc` 中实现 `createObject()` 方法：

<!-- addon-verify-file factory_of_wrapped_objects/addon.cc -->

```cpp
// addon.cc
#include <node.h>
#include "myobject.h"

namespace demo {

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;

void CreateObject(const FunctionCallbackInfo<Value>& args) {
  MyObject::NewInstance(args);
}

void InitAll(Local<Object> exports, Local<Object> module) {
  MyObject::Init();

  NODE_SET_METHOD(module, "exports", CreateObject);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, InitAll)

}  // namespace demo
```

在 `myobject.h` 中，添加了静态方法 `NewInstance()` 来处理
实例化对象。此方法代替了在
JavaScript 中使用 `new`：

<!-- addon-verify-file factory_of_wrapped_objects/myobject.h -->

```cpp
// myobject.h
#ifndef MYOBJECT_H
#define MYOBJECT_H

#include <node.h>
#include "object_wrap.h"

namespace demo {

class MyObject : public ObjectWrap {
 public:
  static void Init();
  static void NewInstance(const v8::FunctionCallbackInfo<v8::Value>& args);

 private:
  explicit MyObject(double value = 0);
  ~MyObject();

  static void New(const v8::FunctionCallbackInfo<v8::Value>& args);
  static void PlusOne(const v8::FunctionCallbackInfo<v8::Value>& args);
  static v8::Global<v8::Function> constructor;
  double value_;
};

}  // namespace demo

#endif
```

我们的 `ObjectWrap` 辅助函数与前一个示例中的保持一致，
而在 `myobject.cc` 中的实现也类似：

<!-- addon-verify-file factory_of_wrapped_objects/myobject.cc -->

```cpp
// myobject.cc
#include <node.h>
#include "myobject.h"

namespace demo {

using node::AddEnvironmentCleanupHook;
using v8::Context;
using v8::Function;
using v8::FunctionCallbackInfo;
using v8::FunctionTemplate;
using v8::Global;
using v8::Isolate;
using v8::Local;
using v8::Number;
using v8::Object;
using v8::String;
using v8::Value;

// 警告！这不是线程安全的，此插件不能用于工作
// 线程。
Global<Function> MyObject::constructor;

MyObject::MyObject(double value) : value_(value) {
}

MyObject::~MyObject() {
}

void MyObject::Init() {
  Isolate* isolate = Isolate::GetCurrent();
  // 准备构造函数模板
  Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, New);
  tpl->SetClassName(String::NewFromUtf8(isolate, "MyObject").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  // 原型
  NODE_SET_PROTOTYPE_METHOD(tpl, "plusOne", PlusOne);

  Local<Context> context = isolate->GetCurrentContext();
  constructor.Reset(isolate, tpl->GetFunction(context).ToLocalChecked());

  AddEnvironmentCleanupHook(isolate, [](void*) {
    constructor.Reset();
  }, nullptr);
}

void MyObject::New(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  Local<Context> context = isolate->GetCurrentContext();

  if (args.IsConstructCall()) {
    // 作为构造函数调用：`new MyObject(...)`
    double value = args[0]->IsUndefined() ?
        0 : args[0]->NumberValue(context).FromMaybe(0);
    MyObject* obj = new MyObject(value);
    obj->Wrap(args.This());
    obj->MakeWeak();
    args.GetReturnValue().Set(args.This());
  } else {
    // 作为普通函数 `MyObject(...)` 调用，转为构造调用。
    const int argc = 1;
    Local<Value> argv[argc] = { args[0] };
    Local<Function> cons = Local<Function>::New(isolate, constructor);
    Local<Object> instance =
        cons->NewInstance(context, argc, argv).ToLocalChecked();
    args.GetReturnValue().Set(instance);
  }
}

void MyObject::NewInstance(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  const unsigned argc = 1;
  Local<Value> argv[argc] = { args[0] };
  Local<Function> cons = Local<Function>::New(isolate, constructor);
  Local<Context> context = isolate->GetCurrentContext();
  Local<Object> instance =
      cons->NewInstance(context, argc, argv).ToLocalChecked();

  args.GetReturnValue().Set(instance);
}

void MyObject::PlusOne(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  MyObject* obj = ObjectWrap::Unwrap<MyObject>(args.This());
  obj->value_ += 1;

  args.GetReturnValue().Set(Number::New(isolate, obj->value_));
}

}  // namespace demo
```

再次强调，要构建此示例，必须将 `myobject.cc` 文件添加到
`binding.gyp`：

```json
{
  "targets": [
    {
      "target_name": "addon",
      "sources": [
        "addon.cc",
        "myobject.cc"
      ]
    }
  ]
}
```

<!-- 附加组件-验证文件 包装对象工厂/test.js -->

```js
// test.js
const createObject = require('./build/Release/addon');

const obj = createObject(10);
console.log(obj.plusOne());
// 打印：11
console.log(obj.plusOne());
// 打印：12
console.log(obj.plusOne());
// 打印：13

const obj2 = createObject(20);
console.log(obj2.plusOne());
// 打印：21
console.log(obj2.plusOne());
// 打印：22
console.log(obj2.plusOne());
// 打印：23
```

### 传递包装对象

除了包装并返回 C++ 对象之外，还可以通过使用 Node.js 辅助函数 `ObjectWrap::Unwrap` 解包对象，再将这些包装对象传来传去。下面的示例展示了一个函数 `add()`，它可以接受两个 `MyObject` 对象作为输入参数：

<!-- addon-verify-file passing_wrapped_objects_around/addon.cc -->

```cpp
// addon.cc
#include <node.h>
#include <node_object_wrap.h>
#include "myobject.h"

namespace demo {

using v8::Context;
using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Number;
using v8::Object;
using v8::String;
using v8::Value;

void CreateObject(const FunctionCallbackInfo<Value>& args) {
  MyObject::NewInstance(args);
}

void Add(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  Local<Context> context = isolate->GetCurrentContext();

  MyObject* obj1 = ObjectWrap::Unwrap<MyObject>(
      args[0]->ToObject(context).ToLocalChecked());
  MyObject* obj2 = ObjectWrap::Unwrap<MyObject>(
      args[1]->ToObject(context).ToLocalChecked());

  double sum = obj1->value() + obj2->value();
  args.GetReturnValue().Set(Number::New(isolate, sum));
}

void InitAll(Local<Object> exports) {
  MyObject::Init();

  NODE_SET_METHOD(exports, "createObject", CreateObject);
  NODE_SET_METHOD(exports, "add", Add);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, InitAll)

}  // namespace demo
```

在 `myobject.h` 中，添加了一个新的公共方法，以便在解包对象后访问私有值。

<!-- addon-verify-file passing_wrapped_objects_around/myobject.h -->

```cpp
// myobject.h
#ifndef MYOBJECT_H
#define MYOBJECT_H

#include <node.h>
#include "object_wrap.h"

namespace demo {

class MyObject : public ObjectWrap {
 public:
  static void Init();
  static void NewInstance(const v8::FunctionCallbackInfo<v8::Value>& args);
  inline double value() const { return value_; }

 private:
  explicit MyObject(double value = 0);
  ~MyObject();

  static void New(const v8::FunctionCallbackInfo<v8::Value>& args);
  static v8::Global<v8::Function> constructor;
  double value_;
};

}  // namespace demo

#endif
```

我们的 `ObjectWrap` 助手与前面的示例保持一致，
而 `myobject.cc` 中的实现也同样类似：

<!-- addon-verify-file passing_wrapped_objects_around/myobject.cc -->

```cpp
// myobject.cc
#include <node.h>
#include "myobject.h"

namespace demo {

using node::AddEnvironmentCleanupHook;
using v8::Context;
using v8::Function;
using v8::FunctionCallbackInfo;
using v8::FunctionTemplate;
using v8::Global;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;

// 警告！这不是线程安全的，此插件不能用于工作
// 线程。
Global<Function> MyObject::constructor;

MyObject::MyObject(double value) : value_(value) {
}

MyObject::~MyObject() {
}

void MyObject::Init() {
  Isolate* isolate = Isolate::GetCurrent();
  // 准备构造函数模板
  Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, New);
  tpl->SetClassName(String::NewFromUtf8(isolate, "MyObject").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  Local<Context> context = isolate->GetCurrentContext();
  constructor.Reset(isolate, tpl->GetFunction(context).ToLocalChecked());

  AddEnvironmentCleanupHook(isolate, [](void*) {
    constructor.Reset();
  }, nullptr);
}

void MyObject::New(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  Local<Context> context = isolate->GetCurrentContext();

  if (args.IsConstructCall()) {
    // 作为构造函数调用：`new MyObject(...)`
    double value = args[0]->IsUndefined() ?
        0 : args[0]->NumberValue(context).FromMaybe(0);
    MyObject* obj = new MyObject(value);
    obj->Wrap(args.This());
    obj->MakeWeak();
    args.GetReturnValue().Set(args.This());
  } else {
    // 作为普通函数 `MyObject(...)` 调用，转为构造调用。
    const int argc = 1;
    Local<Value> argv[argc] = { args[0] };
    Local<Function> cons = Local<Function>::New(isolate, constructor);
    Local<Object> instance =
        cons->NewInstance(context, argc, argv).ToLocalChecked();
    args.GetReturnValue().Set(instance);
  }
}

void MyObject::NewInstance(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  const unsigned argc = 1;
  Local<Value> argv[argc] = { args[0] };
  Local<Function> cons = Local<Function>::New(isolate, constructor);
  Local<Context> context = isolate->GetCurrentContext();
  Local<Object> instance =
      cons->NewInstance(context, argc, argv).ToLocalChecked();

  args.GetReturnValue().Set(instance);
}

}  // namespace demo
```

<!-- 附加组件-验证-文件 通过_wrapped_objects_around/test.js -->

```js
// test.js
const addon = require('./build/Release/addon');

const obj1 = addon.createObject(10);
const obj2 = addon.createObject(20);
const result = addon.add(obj1, obj2);

console.log(result);
// 打印：30
```

[构建]: #building
[Electron]: https://electronjs.org/
[嵌入者指南]: https://v8.dev/docs/embed
[链接到 Node.js 包含的库]: #linking-to-libraries-included-with-nodejs
[Node.js 的原生抽象]: https://github.com/nodejs/nan
[Node-API]: n-api.md
[V8]: https://v8.dev/
[`--experimental-addon-modules`]: cli.md#--experimental-addon-modules
[`Worker`]: worker_threads.md#class-worker
[`libuv`]: https://github.com/libuv/libuv
[`node-gyp`]: https://github.com/nodejs/node-gyp
[`require()`]: modules.md#requireid
[bindings]: https://github.com/TooTallNate/node-bindings
[下载]: https://github.com/nodejs/node-addon-examples
[示例]: https://github.com/nodejs/nan/tree/HEAD/examples/
[安装说明]: https://github.com/nodejs/node-gyp#installation
[v8-docs]: https://v8docs.nodesource.com/
