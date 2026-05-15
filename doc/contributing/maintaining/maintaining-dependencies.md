# 维护依赖项

Node.js 除了其自身代码外，还依赖于其他组件。这些依赖项提供了原生和 JavaScript 代码，并与 `src` 和 `lib` 目录下的代码一起构建，以创建 Node.js 二进制文件。

所有依赖项都位于 `deps` 目录下。
这是所有依赖项的列表：

* [acorn][]
* [ada][]
* [amaro][]
* [base64][]
* [brotli][]
* [c-ares][]
* [merve][]
* [corepack][]
* [googletest][]
* [histogram][]
* [icu-small][]
* [inspector\_protocol][inspector_protocol]
* [libffi][]
* [libuv][]
* [llhttp][]
* [minimatch][]
* [nghttp2][]
* [nghttp3][]
* [ngtcp2][]
* [npm][]
* [openssl][]
* [perfetto][]
* [postject][]
* [simdjson][]
* [sqlite][]
* [undici][]
* [uvwasi][]
* [V8][]
* [zlib][]
* [zstd][]

任何满足以下一个或多个条件的代码都应作为依赖项进行管理：

* 源自上游项目，并在该上游项目中维护。
* 在运行 `make node` 时，不是从“用于修改作品的首选形式”（请参阅 [GNU GPL v2，第 3 条](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)）构建的。一个很好的例子是 C 生成的 WASM 代码（首选形式）。通常，生成仅在部分平台上受支持，需要额外的工具，并在 `make node` 步骤之外预先构建，然后作为 WASM 二进制文件提交到 `deps` 目录下的依赖项目录中。

默认情况下，所有依赖项都捆绑到 Node.js 二进制文件中。但是，当满足以下条件时，应提供 `configure` 选项以在运行时使用外部化版本：

* 依赖项提供原生代码，并且在一种或多种常见的 Node.js 发行版中可用作共享库。
* 依赖项提供 JavaScript，并且在运行 `make node` 时不是从“用于修改作品的首选形式”构建的。

许多发行版出于以下一个或多个原因使用外部化依赖项：

1.  它们有要求，需要从“用于修改作品的首选形式”构建它们所提供的所有内容。这意味着它们需要用自己构建的等效组件替换任何预构建的组件（例如 WASM 二进制文件）。
2.  它们单独管理依赖项，因为该依赖项被 Node.js 以外的更多应用程序使用。链接到共享库允许它们管理对库的更新和 CVE 修复，而不必修补所有单独的应用程序。
3.  它们有一个系统范围的依赖项配置，所有应用程序都应遵守。

## 支持具有原生代码的外部化依赖项

可以通过以下方式为提供共享库的具有原生代码的外部化依赖项添加支持：

* 向 `configure.py` 添加选项。这些选项会添加到 `shared_optgroup` 中，并包括用于：
    * 启用共享库的使用
    * 设置共享库的名称
    * 设置共享库包含文件的目录路径
    * 设置运行时查找共享库的路径
* 在 `configure.py` 中，在现有的 `configure_library()` 调用列表的末尾为该库添加一个 `configure_library()` 调用。如果需要其他库，可以使用 `pkgname` 选项列出多个库。
* 在 `node.gypi` 中，使用 `node_shared_depname` 来保护依赖项的构建，这样它只会在依赖项被捆绑到 Node.js 本身时才构建。例如：

```text
    [ 'node_shared_brotli=="false"', {
      'dependencies': [ 'deps/brotli/brotli.gyp:brotli' ],
    }],
```

## 支持具有 JavaScript 代码的可外部化依赖项

可以通过以下方式为具有 JavaScript 代码的可外部化依赖项添加支持：

* 在 `configure.py` 的 `shareable_builtins` 映射中添加一个条目。路径应对应于通常捆绑到 Node.js 中的 `deps` 目录内的文件。例如 `deps/cjs-module-lexer/lexer.js`。这将为使用该依赖项进行外部化构建添加一个新选项。添加条目后，可以通过运行 `./configure --help` 来查看新选项。

* 在 `src/node_builtins.cc` 中为 `BuiltinLoader` 的构造函数添加一个 `AddExternalizedBuiltin` 调用，使用为依赖项生成的 `NODE_SHARED_BUILTLIN` #define。运行带有新选项的 `./configure` 后，您可以在 `config.gypi` 中找到 #define。您可以剪切并粘贴现有的条目之一，然后更新以匹配依赖项的导入名称和生成的 #define。

* 如果依赖项的版本在 `process.versions` 中报告，请更新 `src/node_metadata.h` 和 `src/node_metadata.cc`，以便在依赖项被外部化时不再报告该版本。不报告版本比错误地报告捆绑到 Node.js 的依赖项版本而不是外部化依赖项的版本要好。使用现有的外部化依赖项（如 Undici）作为更新这些文件的正确示例。确保使用外部化依赖项运行测试，因为测试也需要更新以正确处理此问题。

## 支持不具有 JavaScript 代码的可外部化依赖项

如果依赖项由“用于修改作品的首选形式”中的 JavaScript 组成，则可以将其添加为不可外部化的依赖项。在这种情况下，只需在 `node.gyp` 文件中的 `deps_files` 列表中添加 JavaScript 文件的路径即可。

## 具有 WASM 组件的依赖项的通用方法

依赖项中的 WASM 组件通常在常规的 Node.js `make build` 步骤之外构建。它们还需要不同的工具。

重要的是，用于构建 Node.js 中包含的 WASM 组件的工具及其版本应有充分的文档记录，并在需要时可用于重新构建/更新旧的 Node.js 版本。

为了最大限度地减少用于构建 WASM 组件的工具和版本的不同数量，并记录和确保未来的可用性，该项目构建并维护一个通用的 [wasm-builder](https://github.com/nodejs/wasm-builder) 容器，该容器应用于构建 Node.js 依赖项中的 WASM 组件。

该容器提供了特定构建所用工具版本的持久副本，这些工具版本由 Node.js 项目控制。此外，工具和版本通过容器内 `/home/node/metadata` 目录中的元数据进行记录。

可以通过查看用于创建容器的 [Dockerfile](https://github.com/nodejs/wasm-builder/blob/main/container-build-info/Dockerfile) 的当前版本来找到可用的工具。

如果需要容器中未提供的其他 WASM 工具，应将这些添加项通过 PR 合并到 wasm-builder 容器中。

使用容器的示例包括：

* undici 的 [build/wasm.js](https://github.com/nodejs/undici/blob/main/build/wasm.js)
* amaro 的 [tools/build-wasm.js](https://github.com/nodejs/amaro/blob/main/tools/build-wasm.js)

除了使用容器构建 WASM 组件外，目标还包括使用定期运行的 [dep-updaters](https://github.com/nodejs/node/tree/main/tools/dep_updaters) 来构建与 Node.js 一起分发的 WASM 组件和最终文件，并且它们仅使用 Node.js 仓库中可用的文件来处理依赖项。例如，能够仅使用 [../deps/undici](https://github.com/nodejs/node/tree/main/deps/undici) 中的文件来重新构建我们在 Node.js 中分发的 WASM 和文件。

## 更新依赖项

大多数依赖项由每周运行的 [dependency-update-action][] 自动更新。
但是，可以通过运行 `tools/update-deps` 中的相应脚本手动更新依赖项。
[OpenSSL](https://github.com/openssl/openssl) 有自己的更新操作：[update-openssl-action][]。
[npm-cli-bot](https://github.com/npm/cli/blob/latest/.github/workflows/create-node-pr.yml)
负责 npm 更新，由 npm 团队维护。

仅当更新无法由自动化工具生成时，才应接受手动依赖项更新的 PR，并且应清楚地记录原因，并且 PR 要么经过详细审查，要么来自现有协作者。

通常，只有当依赖项的更新已在上游合并后，才应接受对依赖项的更新。TSC 可以逐案授予例外。这避免了项目长时间维护补丁，并确保工具可以自动生成更新。

## 依赖项列表

### acorn

[acorn](https://github.com/acornjs/acorn) 依赖项是一个 JavaScript 解析器。
[acorn-walk](https://github.com/acornjs/acorn/tree/master/acorn-walk) 是
一个用于 ESTree 格式的抽象语法树遍历器。

### ada

[ada](https://github.com/ada-url/ada) 依赖项是一个
用 C++ 编写的快速且符合规范的 URL 解析器。

### amaro

[amaro](https://www.npmjs.com/package/amaro) 依赖项是 SWC JavaScript/TypeScript 解析器的 WebAssembly 版本的包装器。

### brotli

[brotli](https://github.com/google/brotli) 依赖项用于
同名的通用无损压缩算法。

### c-ares

[c-ares](https://github.com/c-ares/c-ares) 是一个 C 库，
用于异步 DNS 请求。

### merve

[merve](https://github.com/nodejs/node/tree/HEAD/deps/merve)
依赖项在 Node.js ESM 实现中使用，用于检测 CommonJS 模块的命名导出。
有关更多信息，请参阅 [maintaining-merve][]。

### corepack

[corepack](https://github.com/nodejs/corepack) 依赖项是一个
零运行时依赖的 Node.js 脚本，充当 Node.js 项目和开发期间要使用的包管理器之间的桥梁。
实际上，Corepack 允许您使用 Yarn 和 pnpm，而无需安装它们——就像目前使用 npm 一样，npm 默认随 Node.js 一起分发。

### googletest

[googletest](https://github.com/google/googletest) 依赖项是 Google 的
C++ 测试和模拟框架。

### histogram

[histogram](https://github.com/HdrHistogram/HdrHistogram_c) 依赖项是
高动态范围 (HDR) 直方图的 C 移植版。

### icu

[icu](http://site.icu-project.org) 是广泛使用的 C/C++
和 Java 库集，为软件应用程序提供 Unicode 和全球化支持。
有关更多信息，请参阅 [maintaining-icu][]。

### inspector\_protocol

[inspector\_protocol](https://chromium.googlesource.com/deps/inspector_protocol/)
是 Chromium 的代码生成器和检查器协议模板。
有关更多信息，请参阅 [this doc](../../../tools/inspector_protocol/README.md)。

### libffi

[libffi](https://github.com/libffi/libffi) 依赖项是一个可移植的外来
函数接口库，由 `node:ffi` 使用。

### libuv

[libuv](https://github.com/libuv/libuv) 依赖项是一个
多平台支持库，专注于异步 I/O。
它主要为 Node.js 的使用而开发。

### llhttp

[llhttp](https://github.com/nodejs/llhttp) 依赖项是
Node.js 使用的 http 解析器。
有关更多信息，请参阅 [maintaining-http][]。

### minimatch

[minimatch](https://github.com/isaacs/minimatch) 依赖项是一个
最小匹配实用程序。

### nghttp2

[nghttp2](https://github.com/nghttp2/nghttp2) 依赖项是实现
HTTP/2 协议的 C 库。
有关更多信息，请参阅 [maintaining-http][]。

### nghttp3

[nghttp3](https://github.com/ngtcp2/nghttp3) 依赖项是
用 C 编写的 HTTP/3 库。有关更多信息，请参阅 ngtcp2。

### ngtcp2

ngtcp2 和 nghttp3 依赖项提供了 QUIC 和 HTTP/3 的核心功能。

源文件来自：

* ngtcp2: <https://github.com/ngtcp2/ngtcp2>
* nghttp3: <https://github.com/ngtcp2/nghttp3>

在 `ngtcp2` 和 `nghttp3` 的 git 仓库中，活动开发都发生在默认分支（目前在每个仓库中都命名为 `main`）。标记版本并不总是指向默认分支。

我们只使用每个仓库的一部分源文件。

`nghttp3` 库依赖于 `ngtcp2`。两者应始终一起更新。对于 `ngtcp2`，我们只需要 `lib` 和 `crypto` 目录的内容；对于 `nghttp3`，我们只需要 `lib` 目录的内容。

### npm

[npm](https://github.com/npm/cli) 依赖项是
JavaScript 的包管理器。

当发布了 npm 的“next”版本时，应打开新的拉取请求。一旦“next”版本被提升为“latest”，则应根据需要更新 PR。

新的版本能够进入哪些特定的 Node.js 发布流，由发布和 LTS 团队酌情决定。

此过程仅涵盖对 npm 新版本的完整更新。可以通过正常的共识寻求流程来审查和合并挑选的更改。

### openssl

[openssl](https://github.com/quictls/openssl) 依赖项是
OpenSSL 的一个分支，用于启用 QUIC。
[OpenSSL](https://www.openssl.org/) 是一个用于通用加密和安全通信的工具包。

Node.js 目前使用 quictls/openssl 分支，该分支紧密跟踪主要的 openssl/openssl 版本，并添加了支持
QUIC 协议的 API。
有关更多信息，请参阅 [maintaining-openssl][]。

### perfetto

[perfetto](https://github.com/google/perfetto) 依赖项用于
为 Node.js 和 V8 生成性能跟踪。

### postject

[postject](https://github.com/nodejs/postject) 依赖项用于
[Single Executable 战略计划](https://github.com/nodejs/single-executable)。

### simdjson

[simdjson](https://github.com/simdjson/simdjson) 依赖项是一个
用于快速 JSON 解析的 C++ 库。

### sqlite

[sqlite](https://github.com/sqlite/sqlite) 依赖项是
一个嵌入式 SQL 数据库引擎，用 C 编写。

### undici

[undici](https://github.com/nodejs/undici) 依赖项是一个 HTTP/1.1 客户端，
为 Node.js 从头开始编写。
有关更多信息，请参阅 [maintaining-http][]。

### uvwasi

[uvwasi](https://github.com/nodejs/uvwasi) 依赖项实现了
WASI 系统调用 API，以便 WebAssembly 运行时可以轻松实现 WASI 调用。
在底层，uvwasi 在可能的情况下利用 libuv 来实现最大的可移植性。
有关更多信息，请参阅 [maintaining-web-assembly][]。

### V8

[V8](https://chromium.googlesource.com/v8/v8.git/) 是 Google 的开源
高性能 JavaScript 和 WebAssembly 引擎，用 C++ 编写。
有关更多信息，请参阅 [maintaining-V8][]。

### zlib

[zlib](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/third_party/zlib)
依赖项是一个无损数据压缩库，
它来自 Chromium 团队的 zlib 分支，该分支集成了标准 zlib 中尚不可用的性能改进。

### zstd

[zstd](https://github.com/facebook/zstd) 依赖项用于根据
[RFC 8878](https://datatracker.ietf.org/doc/html/rfc8878) 进行压缩。

[acorn]: #acorn
[ada]: #ada
[amaro]: #amaro
[base64]: #base64
[brotli]: #brotli
[c-ares]: #c-ares
[corepack]: #corepack
[dependency-update-action]: ../../../.github/workflows/tools.yml
[googletest]: #googletest
[histogram]: #histogram
[icu-small]: #icu-small
[inspector_protocol]: #inspector_protocol
[libffi]: #libffi
[libuv]: #libuv
[llhttp]: #llhttp
[maintaining-V8]: ./maintaining-V8.md
[maintaining-http]: ./maintaining-http.md
[maintaining-icu]: ./maintaining-icu.md
[maintaining-merve]: ./maintaining-merve.md
[maintaining-openssl]: ./maintaining-openssl.md
[maintaining-web-assembly]: ./maintaining-web-assembly.md
[merve]: #merve
[minimatch]: #minimatch
[nghttp2]: #nghttp2
[nghttp3]: #nghttp3
[ngtcp2]: #ngtcp2
[npm]: #npm
[openssl]: #openssl
[perfetto]: #perfetto
[postject]: #postject
[simdjson]: #simdjson
[sqlite]: #sqlite
[undici]: #undici
[update-openssl-action]: ../../../.github/workflows/update-openssl.yml
[uvwasi]: #uvwasi
[v8]: #v8
[zlib]: #zlib
[zstd]: #zstd
