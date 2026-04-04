# C++ 嵌入器 API

<!--introduced_in=v12.19.0-->

Node.js 提供了许多 C++ API，可用于从其他 C++ 软件在 Node.js 环境中执行 JavaScript。

这些 API 的文档可以在 Node.js 源代码树中的 [src/node.h][] 找到。除了 Node.js 暴露的 API 外，一些必需的概念由 V8 嵌入器 API 提供。

因为将 Node.js 用作嵌入库与编写由 Node.js 执行的代码不同，所以破坏性变更不遵循典型的 Node.js [弃用策略][]，并且可能在每个语义化主版本发布时发生，而无需事先警告。

## 嵌入应用程序示例

以下章节将概述如何使用这些 API 从头创建一个应用程序，该应用程序将执行相当于 `node -e <code>` 的操作，即获取一段 JavaScript 并在特定于 Node.js 的环境中运行它。

完整代码可以在 [Node.js 源代码树中找到][embedtest.cc]。

### 设置每进程状态

Node.js 运行需要一些每进程状态管理：

* 解析 Node.js [命令行选项][] 的参数，
* V8 每进程要求，例如 `v8::Platform` 实例。

以下示例展示了如何设置这些。一些类名分别来自 `node` 和 `v8` C++ 命名空间。

```cpp
int main(int argc, char** argv) {
  argv = uv_setup_args(argc, argv);
  std::vector<std::string> args(argv, argv + argc);
  // 解析 Node.js CLI 选项，并打印任何尝试解析它们时发生的错误。
  std::unique_ptr<node::InitializationResult> result =
      node::InitializeOncePerProcess(args, {
        node::ProcessInitializationFlags::kNoInitializeV8,
        node::ProcessInitializationFlags::kNoInitializeNodeV8Platform
      });

  for (const std::string& error : result->errors())
    fprintf(stderr, "%s: %s\n", args[0].c_str(), error.c_str());
  if (result->early_return() != 0) {
    return result->exit_code();
  }

  // 创建一个 v8::Platform 实例。`MultiIsolatePlatform::Create()` 是一种
  // 创建一个 Node.js 在创建 Worker 线程时可以使用的 v8::Platform 实例的方法。当不存在 `MultiIsolatePlatform` 实例时，
  // Worker 线程将被禁用。
  std::unique_ptr<MultiIsolatePlatform> platform =
      MultiIsolatePlatform::Create(4);
  V8::InitializePlatform(platform.get());
  V8::Initialize();

  // 参见下方了解此函数的内容。
  int ret = RunNodeInstance(
      platform.get(), result->args(), result->exec_args());

  V8::Dispose();
  V8::DisposePlatform();

  node::TearDownOncePerProcess();
  return ret;
}
```

### 设置每实例状态

<!-- YAML
changes:
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/35597
    description:
      添加了 `CommonEnvironmentSetup` 和 `SpinEventLoop` 工具。
-->

Node.js 有一个"Node.js 实例”的概念，通常被称为 `node::Environment`。每个 `node::Environment` 关联着：

* 恰好一个 `v8::Isolate`，即一个 JS 引擎实例，
* 恰好一个 `uv_loop_t`，即一个事件循环，
* 若干个 `v8::Context`，但恰好一个主 `v8::Context`，以及
* 一个 `node::IsolateData` 实例，其中包含可由多个 `node::Environment` 共享的信息。嵌入器应确保 `node::IsolateData` 仅在共享相同 `v8::Isolate` 的 `node::Environment` 之间共享，Node.js 不执行此检查。

为了设置 `v8::Isolate`，需要提供一个 `v8::ArrayBuffer::Allocator`。一个可能的选择是默认的 Node.js 分配器，可以通过 `node::ArrayBufferAllocator::Create()` 创建。使用 Node.js 分配器可以在插件使用 Node.js C++ `Buffer` API 时允许轻微的性能优化，并且是跟踪 [`process.memoryUsage()`][] 中 `ArrayBuffer` 内存所必需的。

此外，每个用于 Node.js 实例的 `v8::Isolate` 都需要向 `MultiIsolatePlatform` 实例注册和注销（如果正在使用），以便平台知道为该 `v8::Isolate` 调度的任务使用哪个事件循环。

`node::NewIsolate()` 辅助函数创建一个 `v8::Isolate`，使用一些特定于 Node.js 的钩子（例如 Node.js 错误处理程序）对其进行设置，并自动将其注册到平台。

```cpp
int RunNodeInstance(MultiIsolatePlatform* platform,
                    const std::vector<std::string>& args,
                    const std::vector<std::string>& exec_args) {
  int exit_code = 0;

  // 设置一个 libuv 事件循环，v8::Isolate 和 Node.js Environment。
  std::vector<std::string> errors;
  std::unique_ptr<CommonEnvironmentSetup> setup =
      CommonEnvironmentSetup::Create(platform, &errors, args, exec_args);
  if (!setup) {
    for (const std::string& err : errors)
      fprintf(stderr, "%s: %s\n", args[0].c_str(), err.c_str());
    return 1;
  }

  Isolate* isolate = setup->isolate();
  Environment* env = setup->env();

  {
    Locker locker(isolate);
    Isolate::Scope isolate_scope(isolate);
    HandleScope handle_scope(isolate);
    // 在调用 node::CreateEnvironment() 和
    // node::LoadEnvironment() 时需要进入 v8::Context。
    Context::Scope context_scope(setup->context());

    // 设置 Node.js 实例以执行，并在其中运行代码。
    // 还有一个变体接受一个回调并向其提供
    // `require` 和 `process` 对象，以便它可以手动编译
    // 并按需运行脚本。
    // 此脚本内的 `require` 函数*不*访问文件
    // 系统，并且只能加载内置 Node.js 模块。
    // 正在使用 `module.createRequire()` 创建一个能够从
    // 磁盘加载文件的对象，并使用标准的 CommonJS 文件加载器
    // 而不是内部专用的 `require` 函数。
    MaybeLocal<Value> loadenv_ret = node::LoadEnvironment(
        env,
        "const publicRequire ="
        "  require('node:module').createRequire(process.cwd() + '/');"
        "globalThis.require = publicRequire;"
        "require('node:vm').runInThisContext(process.argv[1]);");

    if (loadenv_ret.IsEmpty())  // 发生了 JS 异常。
      return 1;

    exit_code = node::SpinEventLoop(env).FromMaybe(1);

    // node::Stop() 可用于显式停止事件循环并阻止
    // 进一步运行 JavaScript。它可以从任何线程调用，
    // 如果从另一个线程调用，其行为将类似于 worker.terminate()。
    node::Stop(env);
  }

  return exit_code;
}
```

[命令行选项]: cli.md
[`process.memoryUsage()`]: process.md#processmemoryusage
[弃用策略]: deprecations.md
[embedtest.cc]: https://github.com/nodejs/node/blob/HEAD/test/embedding/embedtest.cc
[src/node.h]: https://github.com/nodejs/node/blob/HEAD/src/node.h
