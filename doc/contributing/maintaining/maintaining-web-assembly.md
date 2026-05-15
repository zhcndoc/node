# 维护 WebAssembly

对 [WebAssembly](https://webassembly.org/) 的支持已被确定为 [未来 Node.js 成功的顶级技术优先事项](https://github.com/nodejs/node/blob/main/doc/contributing/technical-priorities.md#webassembly) 之一。

本文档概述了我们支持 WebAssembly 的高层策略，并介绍了我们当前的实现，作为贡献者的起点。

## 高层方法

我们的 WebAssembly 策略的关键要素包括：

* 最新的核心 WebAssembly 支持
* 支持高级 API
* 让加载 WebAssembly 变得尽可能容易
* 确保核心 Node.js API 与 WebAssembly 兼容，并且可以以高效的方式从 WebAssembly 中调用

### 最新的核心 WebAssembly 支持

Node.js 通过 V8 获得其核心 WebAssembly 支持。我们不需要做任何特定事情来支持这一点，我们所要做的就是尽可能保持 V8 版本的最新。

### 关键 API 支持

作为一个运行时，Node.js 除了核心 WebAssembly 支持之外，还必须实现若干 API，才能成为运行 WebAssembly 的良好选择。项目目前已将以下附加 API 识别为重要：

* WebAssembly 系统接口（WASI）。这使 WebAssembly 能够与外部世界交互。Node.js 目前已有一个实现（更多细节见下文）。
* [WebAssembly Web API](https://www.w3.org/TR/wasm-web-api-1/)。Node.js 目前已实现流式模块编译和实例化。随着该规范及其他规范的发展，持续跟进它们将很重要。
* [WebAssembly 组件模型](https://github.com/WebAssembly/component-model/)。该 API 仍处于定义阶段，但项目应持续关注其发展，以便简化原生代码集成。

### 尽可能轻松地加载 WASM

我们在这方面最重要的工作，要么是查找并引用资源，要么是提供关于以下内容的资源：

* 在 Node.js 之外编译你的 WebAssembly 代码，并将其集成到 npm 工作流中。
* 在你的 Node.js 应用程序中加载并运行 WebAssembly 代码。

支持并跟踪 ESM 方面持续进行的工作，以便通过 ESM 加载 WebAssembly，这一点也很重要。

### 确保核心 Node.js API 与 WebAssembly 兼容

Node.js 作为运行时的良好适用场景将包括同时包含 JavaScript 以及编译为 WebAssembly 的代码。重要的是，Node.js API 能够以高效的方式从 WebAssembly 中调用，而无需额外的缓冲区拷贝。我们需要：

* 审查 API，并识别那些可以经常从 WebAssembly 调用的 API。
* 在适当情况下，对已识别的 API 进行补充，使其能够传入预先存在的缓冲区，以避免拷贝。

## 当前实现和资源

### WebAssembly 系统接口（WASI）

Node.js 的 WASI 实现由 Node.js GitHub 组织中的 [uvwasi](https://github.com/nodejs/uvwasi) 仓库维护。根据需要，会将更新后的副本以 vendored 形式纳入 Node.js 的依赖中，位于 [deps/uvwasi](https://github.com/nodejs/node/tree/main/deps/uvwasi)。

除了来自 uvwasi 的代码之外，Node.js 还包含绑定和 API，使 WebAssembly 能够在 Node.js 中借助 WASI 支持运行。该 API 的文档位于 [WebAssembly 系统接口（WASI）](https://nodejs.org/api/wasi.html)。

这些绑定和公共 API 的实现位于：

* [src/node\_wasi.h](https://github.com/nodejs/node/blob/main/src/node_wasi.h)
* [src/node\_wasi.cc](https://github.com/nodejs/node/blob/main/src/node_wasi.cc)
* [lib/wasi.js](https://github.com/nodejs/node/blob/main/lib/wasi.js)
