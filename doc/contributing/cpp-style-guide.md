# C++ 风格指南

另请参阅 [C++ codebase README](../../src/README.md)，了解 Node.js 代码库中与风格问题无关的 C++ 惯用法。

## 目录

* [指南和参考](#guides-and-references)
* [格式化](#formatting)
  * [用于指针声明的左倾（C++ 风格）星号](#left-leaning-c-style-asterisks-for-pointer-declarations)
  * [C++ 风格注释](#c-style-comments)
  * [块或条件语句体使用 2 个空格缩进](#2-spaces-of-indentation-for-blocks-or-bodies-of-conditionals)
  * [语句续行使用 4 个空格缩进](#4-spaces-of-indentation-for-statement-continuations)
  * [函数参数垂直对齐](#align-function-arguments-vertically)
  * [初始化列表](#initialization-lists)
  * [方法、函数和类使用 PascalCase](#pascalcase-for-methods-functions-and-classes)
  * [局部变量和参数使用 `snake_case`](#snake_case-for-local-variables-and-parameters)
  * [私有类字段使用 `snake_case_`](#snake_case_-for-private-class-fields)
  * [C 风格结构体使用 `snake_case`](#snake_case-for-c-like-structs)
  * [`template` 后加空格](#space-after-template)
* [内存管理](#memory-management)
  * [内存分配](#memory-allocation)
  * [使用 `nullptr` 代替 `NULL` 或 `0`](#use-nullptr-instead-of-null-or-0)
  * [使用显式指针比较](#use-explicit-pointer-comparisons)
  * [所有权和智能指针](#ownership-and-smart-pointers)
  * [避免使用非 const 引用](#avoid-non-const-references)
  * [使用 AliasedBuffer 操作 TypedArray](#use-aliasedbuffers-to-manipulate-typedarrays)
* [其他](#others)
  * [类型转换](#type-casting)
  * [使用 `auto`](#using-auto)
  * [如果已经包含了 `*-inl.h`，则不要再包含 `*.h`](#do-not-include-h-if--inlh-has-already-been-included)
  * [避免在 C++ 方法中抛出 JavaScript 错误](#avoid-throwing-javascript-errors-in-c)
    * [避免在嵌套的 C++ 方法中抛出 JavaScript 错误](#avoid-throwing-javascript-errors-in-nested-c-methods)

## 指南和参考

Node.js 的 C++ 代码库力求在语言特性和惯用法的使用上保持一致，同时对运行时特性的使用也有一些特定指南。

编码指南基于以下指南（优先级从高到低）：

1. 本文档。
2. [Google C++ Style Guide][]。
3. ISO [C++ Core Guidelines][]。

通常情况下，代码应遵循 C++ Core Guidelines，除非被 Google C++ Style Guide 或本文档覆盖。目前，这些指南由审阅者手动检查，目标是通过自动化工具来验证这一点。

## 格式化

不幸的是，C++ linter（基于 [Google's `cpplint`][]）目前不能通过 `make lint-cpp` 显式运行来捕获大量 Node.js C++ 代码库特有的规则。本文档解释了其中最常见的规则：

### 用于指针声明的左倾（C++ 风格）星号

`char* buffer;`，而不是 `char *buffer;`

### C++ 风格注释

单行和多行注释都使用 C++ 风格注释（`//`）。注释也应以大写字母开头，并以句号结尾。

示例：

```cpp
// 一个单行注释。

// 多行注释
// 也应使用 C++
// 风格注释。
```

代码库中可能包含早期遗留的旧式 C 注释（`/* */`），那时这还不是首选风格。在修改附近代码或更改/改进这些注释时，可以顺手将旧注释更新为首选风格。

### 块或条件语句体使用 2 个空格缩进

```cpp
if (foo)
  bar();
```

或者

```cpp
if (foo) {
  bar();
  baz();
}
```

如果语句体只有一行，大括号是可选的。

`namespace` 自身不额外缩进。

### 语句续行使用 4 个空格缩进

```cpp
VeryLongTypeName very_long_result = SomeValueWithAVeryLongName +
    SomeOtherValueWithAVeryLongName;
```

在这些情况下，运算符写在换行符前面。

### 函数参数垂直对齐

```cpp
void FunctionWithAVeryLongName(int parameter_with_a_very_long_name,
                               double other_parameter_with_a_very_long_name,
                               ...);
```

如果这样做不行，则在 `(` 之后换行，并使用 4 个空格缩进：

```cpp
void FunctionWithAReallyReallyReallyLongNameSeriouslyStopIt(
    int okay_there_is_no_space_left_in_the_previous_line,
    ...);
```

### 初始化列表

较长的初始化列表格式如下：

```cpp
HandleWrap::HandleWrap(Environment* env,
                       Local<Object> object,
                       uv_handle_t* handle,
                       AsyncWrap::ProviderType provider)
    : AsyncWrap(env, object, provider),
      state_(kInitialized),
      handle_(handle) {
```

### 方法、函数和类使用 PascalCase

例外是简单的 getter/setter，它们分别命名为 `property_name()` 和 `set_property_name()`。

```cpp
class FooBar {
 public:
  void DoSomething();
  static void DoSomethingButItsStaticInstead();

  void set_foo_flag(int flag_value);
  int foo_flag() const;  // 在可能的情况下始终使用 const 正确性。
};
```

### 局部变量和参数使用 `snake_case`

```cpp
int FunctionThatDoesSomething(const char* important_string) {
  const char* pointer_into_string = important_string;
}
```

### 私有类字段使用 `snake_case_`

```cpp
class Foo {
 private:
  int counter_ = 0;
};
```

### C 风格结构体使用 `snake_case`

对于普通的 C 风格结构体，可以使用 snake\_case。

```cpp
struct foo_bar {
  int name;
};
```

### `template` 后加空格

```cpp
template <typename T>
class FancyContainer {
 ...
};
```

## 内存管理

### 内存分配

* `util.h` 中的 `Malloc()`、`Calloc()` 等在内存不足时会中止
* `UncheckedMalloc()` 等在内存不足（OOM）时返回 `nullptr`

### 使用 `nullptr` 代替 `NULL` 或 `0`

进一步阅读请参见 [C++ Core Guidelines][ES.47]。

### 使用显式指针比较

在测试指针时，使用与 `nullptr` 的显式比较，即用
`if (foo == nullptr)` 代替 `if (foo)`，并用
`foo != nullptr` 代替 `!foo`。

### 所有权和智能指针

* [R.20][]：使用 `std::unique_ptr` 或 `std::shared_ptr` 表示所有权
* [R.21][]：除非需要共享所有权，否则优先使用 `unique_ptr` 而不是 `shared_ptr`

使用 `std::unique_ptr` 使所有权转移显式化。例如：

```cpp
std::unique_ptr<Foo> FooFactory();
void FooConsumer(std::unique_ptr<Foo> ptr);
```

由于 `std::unique_ptr` 只有移动语义，按值传递会把所有权转移给被调用方，并使调用方的实例失效。

不要使用 `std::auto_ptr`，它已被弃用（[参考][cppref_auto_ptr]）。

### 避免使用非 const 引用

使用非 const 引用通常会掩盖哪些值会被赋值修改。可以考虑改用指针，因为指针需要更明确的语法来表明会发生修改。

```cpp
class ExampleClass {
 public:
  explicit ExampleClass(OtherClass* other_ptr) : pointer_to_other_(other_ptr) {}

  void SomeMethod(const std::string& input_param,
                  std::string* in_out_param);  // 用指针而不是引用

  const std::string& get_foo() const { return foo_string_; }
  void set_foo(const std::string& new_value) { foo_string_ = new_value; }

  void ReplaceCharacterInFoo(char from, char to) {
    // 这里使用非 const 引用是可以的，因为方法名已经告诉
    // 用户这会修改 'foo_string_' —— 如果不是这样，
    // 仍然可能更适合使用带索引的 for 循环，或者添加适当的
    // 注释。
    for (char& character : foo_string_) {
      if (character == from)
        character = to;
    }
  }

 private:
  std::string foo_string_;
  // 用指针而不是引用。如果这个对象“拥有”另一个对象，
  // 那么这里应该是 `std::unique_ptr<OtherClass>`；`std::shared_ptr<OtherClass>`
  // 也可能是更好的选择。
  OtherClass* pointer_to_other_;
};
```

### 使用 AliasedBuffer 操作 TypedArray

当处理需要从 C++ 直接修改数据的 typed array 时，尽可能使用 `AliasedBuffer`。
`AliasedBuffer` 的 API 抽象和使用范围记录在
[aliased\_buffer.h][aliased_buffer.h] 中。

```cpp
// 创建一个 AliasedBuffer。
AliasedBuffer<uint32_t, v8::Uint32Array> data;
...

// 通过自然的运算符语义修改数据。
data[0] = 12345;
```

## 其他

### 类型转换

* 如果必须进行转换且该转换是有效的，请使用 `static_cast<T>`。
* 仅在必要时使用 `reinterpret_cast`。
* 避免使用 C 风格转换（`(type)value`）。
* `dynamic_cast` 不起作用，因为 Node.js 构建时未启用 [运行时类型信息][]。

进一步阅读：

* [ES.48][]：避免转换
* [ES.49][]：如果必须使用转换，请使用命名转换

### 使用 `auto`

通常更推荐显式写出类型，而不是使用 `auto`。

可使用 `auto` 来避免那些冗长、显而易见或不重要的类型名。在这样做时，请记住，显式类型通常有助于提高可读性并验证代码正确性。

```cpp
for (const auto& item : some_map) {
  const KeyType& key = item.first;
  const ValType& value = item.second;
  // 这样循环的其余部分就可以直接引用 key 和 value，
  // 读者可以看到相关类型，并且我们避免了
  // 这类迭代中很常见的额外拷贝。
}
```

### 如果已经包含了 `*-inl.h`，则不要再包含 `*.h`

应当这样做：

```cpp
#include "util-inl.h"  // 已经包含了 util.h
```

而不是这样：

```cpp
#include "util.h"
#include "util-inl.h"
```

### 避免在 C++ 中抛出 JavaScript 错误

当需要从 C++ 绑定方法中抛出错误时，尽量将构造错误所需的数据返回给 JavaScript，
然后使用 [`lib/internal/errors.js`][errors] 构造并抛出错误。

通常，应在参数传入 C++ 之前先在 JavaScript 中完成类型检查。然后在 C++ 绑定中，仅使用
`CHECK` 断言来防止无效参数即可。

如果绑定的返回值不能用于表示失败，或不能返回在 JavaScript 中构造错误所需的数据，那么就向绑定传入一个上下文对象，并在 C++ 中把所需数据放进去。例如：

```cpp
void Foo(const FunctionCallbackInfo<Value>& args) {
  Environment* env = Environment::GetCurrent(args);
  // 让 JavaScript 处理实际的类型检查，
  // C++ 中只放置断言
  CHECK_EQ(args.Length(), 2);
  CHECK(args[0]->IsString());
  CHECK(args[1]->IsObject());

  int err = DoSomethingWith(args[0].As<String>());
  if (err) {
    // 将数据放入错误上下文中
    Local<Object> ctx = args[1].As<Object>();
    Local<String> key = FIXED_ONE_BYTE_STRING(env->isolate(), "code");
    ctx->Set(env->context(), key, err).FromJust();
  } else {
    args.GetReturnValue().Set(something_to_return);
  }
}

// 在初始化函数中
env->SetMethod(target, "foo", Foo);
```

```js
exports.foo = function(str) {
  // 优先在 JavaScript 中进行类型检查
  if (typeof str !== 'string') {
    throw new errors.codes.ERR_INVALID_ARG_TYPE('str', 'string');
  }

  const ctx = {};
  const result = binding.foo(str, ctx);
  if (ctx.code !== undefined) {
    throw new errors.codes.ERR_ERROR_NAME(ctx.code);
  }
  return result;
};
```

#### 避免在嵌套的 C++ 方法中抛出 JavaScript 错误

当你需要从 C++ 中抛出 JavaScript 异常时（即
`isolate()->ThrowException()`），应尽可能接近返回给 JavaScript 的位置来做，而不要在嵌套的 C++ 调用中进行。由于这会改变 JavaScript
执行状态，把它放在最接近被消耗的位置可以减少
副作用的可能性。

Node.js 的构建 [未启用 C++ 异常处理][]，因此使用 `throw` 甚至 `try` 和 `catch` 的代码
**都会**出问题。

[C++ Core Guidelines]: https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines
[ES.47]: https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#Res-nullptr
[ES.48]: https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#Res-casts
[ES.49]: https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#Res-casts-named
[Google C++ Style Guide]: https://google.github.io/styleguide/cppguide.html
[Google's `cpplint`]: https://github.com/google/styleguide
[R.20]: https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#Rr-owner
[R.21]: https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#Rr-unique
[Run Time Type Information]: https://en.wikipedia.org/wiki/Run-time_type_information
[aliased_buffer.h]: https://github.com/nodejs/node/blob/HEAD/src/aliased_buffer.h#L12
[cppref_auto_ptr]: https://en.cppreference.com/w/cpp/memory/auto_ptr
[errors]: https://github.com/nodejs/node/blob/HEAD/doc/contributing/using-internal-errors.md
[without C++ exception handling]: https://gcc.gnu.org/onlinedocs/libstdc++/manual/using_exceptions.html#intro.using.exception.no
