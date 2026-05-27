# 已弃用的 API

<!--introduced_in=v7.7.0-->

<!-- type:misc -->

Node.js API 可能因以下任何原因被弃用：

* 使用该 API 不安全。
* 有改进的替代 API 可用。
* 预计在未来的主要版本中会对 API 进行破坏性更改。

Node.js 使用四种弃用方式：

* 仅文档
* 应用程序（仅限非 `node_modules` 代码）
* 运行时（所有代码）
* 生命周期结束

仅文档弃用是指仅在 Node.js API 文档中表达的弃用。这些在运行 Node.js 时不会产生副作用。某些仅文档弃用在启动时带有 [`--pending-deprecation`][] 标志（或其替代方案，`NODE_PENDING_DEPRECATION=1` 环境变量）会触发运行时警告，类似于下面的运行时弃用。支持该标志的仅文档弃用在 [已弃用 API 列表](#list-of-deprecated-apis) 中会明确标注。

默认情况下，仅针对非 `node_modules` 代码的应用程序弃用会在首次于非 `node_modules` 加载的代码中使用弃用 API 时生成一个进程警告并打印到 `stderr`。当使用 [`--throw-deprecation`][] 命令行标志时，运行时弃用将导致抛出错误。当使用 [`--pending-deprecation`][] 时，警告也会为从 `node_modules` 加载的代码发出。

所有代码的运行时弃用类似于非 `node_modules` 代码的运行时弃用，不同之处在于它也会为从 `node_modules` 加载的代码发出警告。

当功能正在或即将从 Node.js 中移除时，会使用生命周期结束弃用。

## 撤销弃用

偶尔，API 的弃用可能会被撤销。在这种情况下，本文档将更新与决策相关的信息。但是，弃用标识符不会被修改。

## 已弃用 API 列表

### DEP0001: `http.OutgoingMessage.prototype.flush`

<!-- YAML
changes:
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/31164
    description: 结束生命周期。
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v1.6.0
    pr-url: https://github.com/nodejs/node/pull/1156
    description: 运行时弃用。
-->

Type: End-of-Life

`OutgoingMessage.prototype.flush()` 已被移除。请改用 `OutgoingMessage.prototype.flushHeaders()`。

### DEP0002: `require('_linklist')`

<!-- YAML
changes:
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12113
    description: 结束生命周期。
  - version: v6.12.0
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v5.0.0
    pr-url: https://github.com/nodejs/node/pull/3078
    description: 运行时弃用。
-->

Type: End-of-Life

`_linklist` 模块已弃用。请使用用户空间的替代方案。

### DEP0003: `_writableState.buffer`

<!-- YAML
changes:
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/31165
    description: 结束生命周期。
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v0.11.15
    pr-url: https://github.com/nodejs/node-v0.x-archive/pull/8826
    description: 运行时弃用。
-->

Type: End-of-Life

`_writableState.buffer` 已被移除。请改用 `_writableState.getBuffer()`。

### DEP0004: `CryptoStream.prototype.readyState`

<!-- YAML
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/17882
    description: 结束生命周期。
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v0.4.0
    commit: 9c7f89bf56abd37a796fea621ad2e47dd33d2b82
    description: 仅文档弃用。
-->

Type: End-of-Life

`CryptoStream.prototype.readyState` 属性已被移除。

### DEP0005: `Buffer()` 构造函数

<!-- YAML
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/19524
    description: 运行时弃用。
  - version: v6.12.0
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/4682
    description: 仅文档弃用。
-->

Type: Application (non-`node_modules` code only)

`Buffer()` 函数和 `new Buffer()` 构造函数因 API 可用性问题可能导致意外的安全问题而被弃用。

作为替代，请使用以下构造 `Buffer` 对象的方法之一：

* [`Buffer.alloc(size[, fill[, encoding]])`][alloc]：创建具有_已初始化_内存的 `Buffer`。
* [`Buffer.allocUnsafe(size)`][alloc_unsafe_size]：创建具有_未初始化_内存的 `Buffer`。
* [`Buffer.allocUnsafeSlow(size)`][]：创建具有_未初始化_内存的 `Buffer`。
* [`Buffer.from(array)`][]：创建具有 `array` 副本的 `Buffer`
* [`Buffer.from(arrayBuffer[, byteOffset[, length]])`][from_arraybuffer] - 创建包装给定 `arrayBuffer` 的 `Buffer`。
* [`Buffer.from(buffer)`][]：创建复制 `buffer` 的 `Buffer`。
* [`Buffer.from(string[, encoding])`][from_string_encoding]：创建复制 `string` 的 `Buffer`。

如果没有 `--pending-deprecation`，运行时警告仅发生在不在 `node_modules` 中的代码。这意味着依赖项中的 `Buffer()` 用法不会有弃用警告。使用 `--pending-deprecation` 时，无论 `Buffer()` 用法出现在何处，都会产生运行时警告。

### DEP0006: `child_process` `options.customFds`

<!-- YAML
changes:
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/25279
    description: 结束生命周期。
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v0.11.14
    description: 运行时弃用。
  - version: v0.5.10
    description: 仅文档弃用。
-->

Type: End-of-Life

在 [`child_process`][] 模块的 `spawn()`、`fork()` 和 `exec()` 方法中，`options.customFds` 选项已弃用。应改用 `options.stdio` 选项。

### DEP0007: 将 `cluster` `worker.suicide` 替换为 `worker.exitedAfterDisconnect`

<!-- YAML
changes:
  - version: v9.0.0
    pr-url: https://github.com/nodejs/node/pull/13702
    description: 结束生命周期。
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/3747
    description: 运行时弃用。
  - version: v6.12.0
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/3743
    description: 仅文档弃用。
-->

Type: End-of-Life

在早期版本的 Node.js `cluster` 中，一个名为 `suicide` 的布尔属性被添加到 `Worker` 对象。该属性的目的是指示 `Worker` 实例如何以及为何退出。在 Node.js 6.0.0 中，旧属性被弃用并替换为新的 [`worker.exitedAfterDisconnect`][] 属性。旧属性名称并未精确描述实际语义，且带有不必要的情感色彩。

### DEP0008: `require('node:constants')`

<!-- YAML
changes:
  - version: v6.12.0
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v6.3.0
    pr-url: https://github.com/nodejs/node/pull/6534
    description: 仅文档弃用。
-->

Type: Documentation-only

`node:constants` 模块已弃用。当需要访问与特定 Node.js 内置模块相关的常量时，开发者应参考相关模块暴露的 `constants` 属性。例如，`require('node:fs').constants` 和 `require('node:os').constants`。

### DEP0009: 不带 digest 的 `crypto.pbkdf2`

<!-- YAML
changes:
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/31166
    description: "结束生命周期（针对 `digest === null`）。"
  - version: v11.0.0
    pr-url: https://github.com/nodejs/node/pull/22861
    description: "运行时弃用（针对 `digest === null`）。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/11305
    description: "结束生命周期（针对 `digest === undefined`）。"
  - version: v6.12.0
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/4047
    description: "运行时弃用（针对 `digest === undefined`）。"
-->

Type: End-of-Life

在 Node.js 6.0 中，未指定 digest 使用 [`crypto.pbkdf2()`][] API 已被弃用，因为该方法默认使用不推荐的 `'SHA1'` digest。此前，会打印弃用警告。从 Node.js 8.0.0 开始，使用 `digest` 设置为 `undefined` 调用 `crypto.pbkdf2()` 或 `crypto.pbkdf2Sync()` 将抛出 `TypeError`。

从 Node.js 11.0.0 开始，使用 `digest` 设置为 `null` 调用这些函数将打印弃用警告，以与 `digest` 为 `undefined` 时的行为保持一致。

但现在，传递 `undefined` 或 `null` 都将抛出 `TypeError`。

### DEP0010: `crypto.createCredentials`

<!-- YAML
changes:
  - version: v11.0.0
    pr-url: https://github.com/nodejs/node/pull/21153
    description: 结束生命周期。
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v0.11.13
    pr-url: https://github.com/nodejs/node-v0.x-archive/pull/7265
    description: 运行时弃用。
-->

Type: End-of-Life

`crypto.createCredentials()` API 已被移除。请改用 [`tls.createSecureContext()`][]。

### DEP0011: `crypto.Credentials`

<!-- YAML
changes:
  - version: v11.0.0
    pr-url: https://github.com/nodejs/node/pull/21153
    description: 结束生命周期。
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v0.11.13
    pr-url: https://github.com/nodejs/node-v0.x-archive/pull/7265
    description: 运行时弃用。
-->

Type: End-of-Life

`crypto.Credentials` 类已被移除。请改用 [`tls.SecureContext`][]。

### DEP0012: `Domain.dispose`

<!-- YAML
changes:
  - version: v9.0.0
    pr-url: https://github.com/nodejs/node/pull/15412
    description: 结束生命周期。
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v0.11.7
    pr-url: https://github.com/nodejs/node-v0.x-archive/pull/5021
    description: 运行时弃用。
-->

Type: End-of-Life

`Domain.dispose()` 已被移除。请改为通过设置在域上的错误事件处理程序显式地从失败的 I/O 操作恢复。

### DEP0013: 不带回调的 `fs` 异步函数

<!-- YAML
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18668
    description: 结束生命周期。
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: 运行时弃用。
-->

Type: End-of-Life

从 Node.js 10.0.0 开始，调用不带回调的异步函数会抛出 `TypeError`。参见 <https://github.com/nodejs/node/pull/12562>。

### DEP0014: `fs.read` 遗留 String 接口

<!-- YAML
changes:
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/9683
    description: 结束生命周期。
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/4525
    description: 运行时弃用。
  - version: v0.1.96
    commit: c93e0aaf062081db3ec40ac45b3e2c979d5759d6
    description: 仅文档弃用。
-->

Type: End-of-Life

[`fs.read()`][] 遗留 `String` 接口已弃用。请改用文档中提到的 `Buffer` API。

### DEP0015: `fs.readSync` 遗留 String 接口

<!-- YAML
changes:
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/9683
    description: 结束生命周期。
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/4525
    description: 运行时弃用。
  - version: v0.1.96
    commit: c93e0aaf062081db3ec40ac45b3e2c979d5759d6
    description: 仅文档弃用。
-->

Type: End-of-Life

[`fs.readSync()`][] 遗留 `String` 接口已弃用。请改用文档中提到的 `Buffer` API。

### DEP0016: `GLOBAL`/`root`

<!-- YAML
changes:
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/31167
    description: 结束生命周期。
  - version: v6.12.0
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/1838
    description: 运行时弃用。
-->

Type: End-of-Life

`global` 属性的 `GLOBAL` 和 `root` 别名在 Node.js 6.0.0 中被弃用，此后已被移除。

### DEP0017: `Intl.v8BreakIterator`

<!-- YAML
changes:
  - version: v9.0.0
    pr-url: https://github.com/nodejs/node/pull/15238
    description: 结束生命周期。
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/8908
    description: 运行时弃用。
-->

Type: End-of-Life

`Intl.v8BreakIterator` 是一个非标准扩展，已被移除。参见 [`Intl.Segmenter`](https://github.com/tc39/proposal-intl-segmenter)。

### DEP0018: 未处理的 Promise 拒绝

<!-- YAML
changes:
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/35316
    description: 结束生命周期。
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/8217
    description: 运行时弃用。
-->

Type: End-of-Life

未处理的 Promise 拒绝已弃用。默认情况下，未处理的 Promise 拒绝会以非零退出码终止 Node.js 进程。要更改 Node.js 处理未处理拒绝的方式，请使用 [`--unhandled-rejections`][] 命令行选项。

### DEP0019: `require('.')` 解析到目录外部

<!-- YAML
changes:
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/26973
    description: 移除功能。
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v1.8.1
    pr-url: https://github.com/nodejs/node/pull/1363
    description: 运行时弃用。
-->

Type: End-of-Life

在某些情况下，`require('.')` 可能解析到包目录外部。此行为已被移除。

### DEP0020: `Server.connections`

<!-- YAML
changes:
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/33647
    description: "`Server.connections` 已被移除。"
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v0.9.7
    pr-url: https://github.com/nodejs/node-v0.x-archive/pull/4595
    description: 运行时弃用。
-->

Type: End-of-Life

`Server.connections` 属性在 Node.js 0.9.7 中被弃用，此后已被移除。请改用 [`Server.getConnections()`][] 方法。

### DEP0021: `Server.listenFD`

<!-- YAML
changes:
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/27127
    description: 结束生命周期。
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v0.7.12
    commit: 41421ff9da1288aa241a5e9dcf915b685ade1c23
    description: 运行时弃用。
-->

Type: End-of-Life

`Server.listenFD()` 方法已弃用并被移除。请改用 [`Server.listen({fd: <number>})`][]。

### DEP0022: `os.tmpDir()`

<!-- YAML
changes:
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/31169
    description: 结束生命周期。
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/6739
    description: 运行时弃用。
-->

Type: End-of-Life

`os.tmpDir()` API 在 Node.js 7.0.0 中被弃用，此后已被移除。请改用 [`os.tmpdir()`][]。

自动迁移工具可用（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/tmpdir-to-tmpdir)）：

```bash
npx codemod@latest @nodejs/tmpDir-to-tmpdir
```

### DEP0023: `os.getNetworkInterfaces()`

<!-- YAML
changes:
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/25280
    description: 结束生命周期。
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v0.6.0
    commit: 37bb37d151fb6ee4696730e63ff28bb7a4924f97
    description: 运行时弃用。
-->

Type: End-of-Life

`os.getNetworkInterfaces()` 方法已弃用。请改用 [`os.networkInterfaces()`][] 方法。

### DEP0024: `REPLServer.prototype.convertToContext()`

<!-- YAML
changes:
  - version: v9.0.0
    pr-url: https://github.com/nodejs/node/pull/13434
    description: 结束生命周期。
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7829
    description: 运行时弃用。
-->

Type: End-of-Life

`REPLServer.prototype.convertToContext()` API 已被移除。

### DEP0025: `require('node:sys')`

<!-- YAML
changes:
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v1.0.0
    pr-url: https://github.com/nodejs/node/pull/317
    description: 运行时弃用。
-->

Type: Runtime

`node:sys` 模块已弃用。请改用 [`util`][] 模块。

### DEP0026: `util.print()`

<!-- YAML
changes:
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/25377
    description: 结束生命周期。
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v0.11.3
    commit: 896b2aa7074fc886efd7dd0a397d694763cac7ce
    description: 运行时弃用。
-->

Type: End-of-Life

`util.print()` 已被移除。请改用 [`console.log()`][]。

自动迁移工具可用（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/util-print-to-console-log)）：

```bash
npx codemod@latest @nodejs/util-print-to-console-log
```

### DEP0027: `util.puts()`

<!-- YAML
changes:
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/25377
    description: 结束生命周期。
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v0.11.3
    commit: 896b2aa7074fc886efd7dd0a397d694763cac7ce
    description: 运行时弃用。
-->

Type: End-of-Life

`util.puts()` 已被移除。请改用 [`console.log()`][]。

自动迁移工具可用（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/util-print-to-console-log)）：

```bash
npx codemod@latest @nodejs/util-print-to-console-log
```

### DEP0028: `util.debug()`

<!-- YAML
changes:
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/25377
    description: 结束生命周期。
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v0.11.3
    commit: 896b2aa7074fc886efd7dd0a397d694763cac7ce
    description: 运行时弃用。
-->

Type: End-of-Life

`util.debug()` 已被移除。请改用 [`console.error()`][]。

自动迁移工具可用（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/util-print-to-console-log)）：

```bash
npx codemod@latest @nodejs/util-print-to-console-log
```

### DEP0029: `util.error()`

<!-- YAML
changes:
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/25377
    description: 结束生命周期。
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v0.11.3
    commit: 896b2aa7074fc886efd7dd0a397d694763cac7ce
    description: 运行时弃用。
-->

Type: End-of-Life

`util.error()` 已被移除。请改用 [`console.error()`][]。

自动迁移工具可用（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/util-print-to-console-log)）：

```bash
npx codemod@latest @nodejs/util-print-to-console-log
```

### DEP0030: `SlowBuffer`

<!-- YAML
changes:
  - version: v25.0.0
    pr-url: https://github.com/nodejs/node/pull/58220
    description: 结束生命周期。
  - version: v24.0.0
    pr-url: https://github.com/nodejs/node/pull/55175
    description: 运行时弃用。
  - version: v6.12.0
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/5833
    description: 仅文档弃用。
-->

Type: End-of-Life

`SlowBuffer` 类已被移除。请改用 [`Buffer.allocUnsafeSlow(size)`][]。

自动迁移工具可用（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/slow-buffer-to-buffer-alloc-unsafe-slow)）。

```bash
npx codemod@latest @nodejs/slow-buffer-to-buffer-alloc-unsafe-slow
```

### DEP0031: `ecdh.setPublicKey()`

<!-- YAML
changes:
  - version: v25.0.0
    pr-url: https://github.com/nodejs/node/pull/58620
    description: 运行时弃用。
  - version: v6.12.0
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v5.2.0
    pr-url: https://github.com/nodejs/node/pull/3511
    description: 仅文档弃用。
-->

Type: Runtime

[`ecdh.setPublicKey()`][] 方法现已弃用，因为其在 API 中的包含并无用处。

### DEP0032: `node:domain` 模块

<!-- YAML
changes:
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v1.4.2
    pr-url: https://github.com/nodejs/node/pull/943
    description: 仅文档弃用。
-->

Type: Documentation-only

[`domain`][] 模块已弃用，不应使用。

### DEP0033: `EventEmitter.listenerCount()`

<!-- YAML
changes:
  - version:
     - v25.4.0
     - v24.14.0
    pr-url: https://github.com/nodejs/node/pull/60214
    description: 弃用已撤销。
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v3.2.0
    pr-url: https://github.com/nodejs/node/pull/2349
    description: 仅文档弃用。
-->

Type: Revoked

The [`events.listenerCount(emitter, eventName)`][] API was deprecated, as it
provided identical functionality to [`emitter.listenerCount(eventName)`][]. The
deprecation was revoked because this function has been repurposed to also
accept {EventTarget} arguments.

### DEP0034: `fs.exists(path, callback)`

<!-- YAML
changes:
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v1.0.0
    pr-url: https://github.com/nodejs/node/pull/166
    description: 仅文档弃用。
-->

Type: Documentation-only

[`fs.exists(path, callback)`][] API 已弃用。请改用 [`fs.stat()`][] 或 [`fs.access()`][]。

### DEP0035: `fs.lchmod(path, mode, callback)`

<!-- YAML
changes:
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v0.4.7
    description: 仅文档弃用。
-->

Type: Documentation-only

[`fs.lchmod(path, mode, callback)`][] API 已弃用。

### DEP0036: `fs.lchmodSync(path, mode)`

<!-- YAML
changes:
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v0.4.7
    description: 仅文档弃用。
-->

Type: Documentation-only

[`fs.lchmodSync(path, mode)`][] API 已弃用。

### DEP0037: `fs.lchown(path, uid, gid, callback)`

<!-- YAML
changes:
  - version: v10.6.0
    pr-url: https://github.com/nodejs/node/pull/21498
    description: 弃用已撤销。
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v0.4.7
    description: 仅文档弃用。
-->

Type: Deprecation revoked

[`fs.lchown(path, uid, gid, callback)`][] API 曾被弃用。弃用被撤销，因为必要的支持 API 已添加到 libuv 中。

### DEP0038: `fs.lchownSync(path, uid, gid)`

<!-- YAML
changes:
  - version: v10.6.0
    pr-url: https://github.com/nodejs/node/pull/21498
    description: 弃用已撤销。
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v0.4.7
    description: 仅文档弃用。
-->

Type: Deprecation revoked

[`fs.lchownSync(path, uid, gid)`][] API 曾被弃用。弃用被撤销，因为必要的支持 API 已添加到 libuv 中。

### DEP0039: `require.extensions`

<!-- YAML
changes:
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v0.10.6
    commit: 7bd8a5a2a60b75266f89f9a32877d55294a3881c
    description: 仅文档弃用。
-->

Type: Documentation-only

[`require.extensions`][] 属性已弃用。

### DEP0040: `node:punycode` 模块

<!-- YAML
changes:
  - version:
    - v23.7.0
    - v22.14.0
    pr-url: https://github.com/nodejs/node/pull/56632
    description: 应用程序弃用。
  - version: v21.0.0
    pr-url: https://github.com/nodejs/node/pull/47202
    description: 运行时弃用。
  - version: v16.6.0
    pr-url: https://github.com/nodejs/node/pull/38444
    description: "已添加对 `--pending-deprecation` 的支持。"
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7941
    description: 仅文档弃用。
-->

Type: Application (non-`node_modules` code only)

[`punycode`][] 模块已弃用。请改用用户空间的替代方案。

### DEP0041: `NODE_REPL_HISTORY_FILE` 环境变量

<!-- YAML
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/13876
    description: 结束生命周期。
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v3.0.0
    pr-url: https://github.com/nodejs/node/pull/2224
    description: 仅文档弃用。
-->

Type: End-of-Life

`NODE_REPL_HISTORY_FILE` 环境变量已被移除。请改用 `NODE_REPL_HISTORY`。

### DEP0042: `tls.CryptoStream`

<!-- YAML
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/17882
    description: 结束生命周期。
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v0.11.3
    commit: af80e7bc6e6f33c582eb1f7d37c7f5bbe9f910f7
    description: 仅文档弃用。
-->

Type: End-of-Life

`tls.CryptoStream` 类已被移除。请改用 [`tls.TLSSocket`][]。

### DEP0043: `tls.SecurePair`

<!-- YAML
changes:
  - version: v24.0.0
    pr-url: https://github.com/nodejs/node/pull/57361
    description: 结束生命周期。
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/11349
    description: 运行时弃用。
  - version: v6.12.0
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/6063
    description: 仅文档弃用。
  - version: v0.11.15
    pr-url:
      - https://github.com/nodejs/node-v0.x-archive/pull/8695
      - https://github.com/nodejs/node-v0.x-archive/pull/8700
    description: 弃用已撤销。
  - version: v0.11.3
    commit: af80e7bc6e6f33c582eb1f7d37c7f5bbe9f910f7
    description: 运行时弃用。
-->

Type: End-of-Life

`tls.SecurePair` 类已弃用。请改用 [`tls.TLSSocket`][]。

### DEP0044: `util.isArray()`

<!-- YAML
changes:
  - version: v22.0.0
    pr-url: https://github.com/nodejs/node/pull/50488
    description: 运行时弃用。
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version:
    - v4.0.0
    - v3.3.1
    pr-url: https://github.com/nodejs/node/pull/2447
    description: 仅文档弃用。
-->

Type: Runtime

[`util.isArray()`][] API 已弃用。请改用 `Array.isArray()`。

自动迁移工具可用（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/util-is)）：

```bash
npx codemod@latest @nodejs/util-is
```

### DEP0045: `util.isBoolean()`

<!-- YAML
changes:
  - version: v23.0.0
    pr-url: https://github.com/nodejs/node/pull/52744
    description: 生命周期结束弃用。
  - version: v22.0.0
    pr-url: https://github.com/nodejs/node/pull/50488
    description: 运行时弃用。
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version:
    - v4.0.0
    - v3.3.1
    pr-url: https://github.com/nodejs/node/pull/2447
    description: 仅文档弃用。
-->

Type: End-of-Life

`util.isBoolean()` API 已被移除。请改用 `typeof arg === 'boolean'`。

自动迁移工具可用（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/util-is)）：

```bash
npx codemod@latest @nodejs/util-is
```

### DEP0046: `util.isBuffer()`

<!-- YAML
changes:
  - version: v23.0.0
    pr-url: https://github.com/nodejs/node/pull/52744
    description: 生命周期结束弃用。
  - version: v22.0.0
    pr-url: https://github.com/nodejs/node/pull/50488
    description: 运行时弃用。
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version:
    - v4.0.0
    - v3.3.1
    pr-url: https://github.com/nodejs/node/pull/2447
    description: 仅文档弃用。
-->

Type: End-of-Life

`util.isBuffer()` API 已被移除。请改用 [`Buffer.isBuffer()`][]。

自动迁移工具可用（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/util-is)）：

```bash
npx codemod@latest @nodejs/util-is
```

### DEP0047: `util.isDate()`

<!-- YAML
changes:
  - version: v23.0.0
    pr-url: https://github.com/nodejs/node/pull/52744
    description: 生命周期结束弃用。
  - version: v22.0.0
    pr-url: https://github.com/nodejs/node/pull/50488
    description: 运行时弃用。
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version:
    - v4.0.0
    - v3.3.1
    pr-url: https://github.com/nodejs/node/pull/2447
    description: 仅文档弃用。
-->

Type: End-of-Life

`util.isDate()` API 已被移除。请改用 `arg instanceof Date`。

对于更强的方法，考虑使用：
`Date.prototype.toString.call(arg) === '[object Date]' && !isNaN(arg)`。
这也可用于 `try/catch` 块中以处理无效的日期对象。

自动迁移工具可用（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/util-is)）：

```bash
npx codemod@latest @nodejs/util-is
```

### DEP0048: `util.isError()`

<!-- YAML
changes:
  - version: v23.0.0
    pr-url: https://github.com/nodejs/node/pull/52744
    description: 生命周期结束弃用。
  - version: v22.0.0
    pr-url: https://github.com/nodejs/node/pull/50488
    description: 运行时弃用。
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version:
    - v4.0.0
    - v3.3.1
    pr-url: https://github.com/nodejs/node/pull/2447
    description: 仅文档弃用。
-->

Type: End-of-Life

`util.isError()` API 已被移除。请改用 `Error.isError(arg)`。

自动迁移工具可用（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/util-is)）：

```bash
npx codemod@latest @nodejs/util-is
```

### DEP0049: `util.isFunction()`

<!-- YAML
changes:
  - version: v23.0.0
    pr-url: https://github.com/nodejs/node/pull/52744
    description: 生命周期结束弃用。
  - version: v22.0.0
    pr-url: https://github.com/nodejs/node/pull/50488
    description: 运行时弃用。
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version:
    - v4.0.0
    - v3.3.1
    pr-url: https://github.com/nodejs/node/pull/2447
    description: 仅文档弃用。
-->

Type: End-of-Life

`util.isFunction()` API 已被移除。请改用 `typeof arg === 'function'`。

自动迁移工具可用（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/util-is)）：

```bash
npx codemod@latest @nodejs/util-is
```

### DEP0050: `util.isNull()`

<!-- YAML
changes:
  - version: v23.0.0
    pr-url: https://github.com/nodejs/node/pull/52744
    description: 生命周期结束弃用。
  - version: v22.0.0
    pr-url: https://github.com/nodejs/node/pull/50488
    description: 运行时弃用。
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version:
    - v4.0.0
    - v3.3.1
    pr-url: https://github.com/nodejs/node/pull/2447
    description: 仅文档弃用。
-->

Type: End-of-Life

`util.isNull()` API 已被移除。请改用 `arg === null`。

自动迁移工具可用（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/util-is)）：

```bash
npx codemod@latest @nodejs/util-is
```

### DEP0051: `util.isNullOrUndefined()`

<!-- YAML
changes:
  - version: v23.0.0
    pr-url: https://github.com/nodejs/node/pull/52744
    description: 生命周期结束弃用。
  - version: v22.0.0
    pr-url: https://github.com/nodejs/node/pull/50488
    description: 运行时弃用。
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version:
    - v4.0.0
    - v3.3.1
    pr-url: https://github.com/nodejs/node/pull/2447
    description: 仅文档弃用。
-->

Type: End-of-Life

`util.isNullOrUndefined()` API 已被移除。请改用 `arg === null || arg === undefined`。

自动迁移工具可用（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/util-is)）：

```bash
npx codemod@latest @nodejs/util-is
```

### DEP0052: `util.isNumber()`

<!-- YAML
changes:
  - version: v23.0.0
    pr-url: https://github.com/nodejs/node/pull/52744
    description: 生命周期结束弃用。
  - version: v22.0.0
    pr-url: https://github.com/nodejs/node/pull/50488
    description: 运行时弃用。
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version:
    - v4.0.0
    - v3.3.1
    pr-url: https://github.com/nodejs/node/pull/2447
    description: 仅文档弃用。
-->

Type: End-of-Life

`util.isNumber()` API 已被移除。请改用 `typeof arg === 'number'`。

自动迁移工具可用（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/util-is)）：

```bash
npx codemod@latest @nodejs/util-is
```

### DEP0053: `util.isObject()`

<!-- YAML
changes:
  - version: v23.0.0
    pr-url: https://github.com/nodejs/node/pull/52744
    description: 生命周期结束弃用。
  - version: v22.0.0
    pr-url: https://github.com/nodejs/node/pull/50488
    description: 运行时弃用。
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version:
    - v4.0.0
    - v3.3.1
    pr-url: https://github.com/nodejs/node/pull/2447
    description: 仅文档弃用。
-->

Type: End-of-Life

`util.isObject()` API 已被移除。请改用 `arg && typeof arg === 'object'`。

自动迁移工具可用（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/util-is)）：

```bash
npx codemod@latest @nodejs/util-is
```

### DEP0054: `util.isPrimitive()`

<!-- YAML
changes:
  - version: v23.0.0
    pr-url: https://github.com/nodejs/node/pull/52744
    description: 生命周期结束弃用。
  - version: v22.0.0
    pr-url: https://github.com/nodejs/node/pull/50488
    description: 运行时弃用。
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version:
    - v4.0.0
    - v3.3.1
    pr-url: https://github.com/nodejs/node/pull/2447
    description: 仅文档弃用。
-->

Type: End-of-Life

`util.isPrimitive()` API 已被移除。请改用 `Object(arg) !== arg`。

自动迁移工具可用（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/util-is)）：

```bash
npx codemod@latest @nodejs/util-is
```

### DEP0055: `util.isRegExp()`

<!-- YAML
changes:
  - version: v23.0.0
    pr-url: https://github.com/nodejs/node/pull/52744
    description: 生命周期结束弃用。
  - version: v22.0.0
    pr-url: https://github.com/nodejs/node/pull/50488
    description: 运行时弃用。
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version:
    - v4.0.0
    - v3.3.1
    pr-url: https://github.com/nodejs/node/pull/2447
    description: 仅文档弃用。
-->

Type: End-of-Life

`util.isRegExp()` API 已被移除。请改用 `arg instanceof RegExp`。

自动迁移工具可用（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/util-is)）：

```bash
npx codemod@latest @nodejs/util-is
```

### DEP0056: `util.isString()`

<!-- YAML
changes:
  - version: v23.0.0
    pr-url: https://github.com/nodejs/node/pull/52744
    description: 生命周期结束弃用。
  - version: v22.0.0
    pr-url: https://github.com/nodejs/node/pull/50488
    description: 运行时弃用。
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version:
    - v4.0.0
    - v3.3.1
    pr-url: https://github.com/nodejs/node/pull/2447
    description: 仅文档弃用。
-->

Type: End-of-Life

`util.isString()` API 已被移除。请改用 `typeof arg === 'string'`。

自动迁移工具可用（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/util-is)）：

```bash
npx codemod@latest @nodejs/util-is
```

### DEP0057: `util.isSymbol()`

<!-- YAML
changes:
  - version: v23.0.0
    pr-url: https://github.com/nodejs/node/pull/52744
    description: 生命周期结束弃用。
  - version: v22.0.0
    pr-url: https://github.com/nodejs/node/pull/50488
    description: 运行时弃用。
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version:
    - v4.0.0
    - v3.3.1
    pr-url: https://github.com/nodejs/node/pull/2447
    description: 仅文档弃用。
-->

Type: End-of-Life

`util.isSymbol()` API 已被移除。请改用 `typeof arg === 'symbol'`。

自动迁移工具可用（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/util-is)）：

```bash
npx codemod@latest @nodejs/util-is
```

### DEP0058: `util.isUndefined()`

<!-- YAML
changes:
  - version: v23.0.0
    pr-url: https://github.com/nodejs/node/pull/52744
    description: 生命周期结束弃用。
  - version: v22.0.0
    pr-url: https://github.com/nodejs/node/pull/50488
    description: 运行时弃用。
  - version:
    - v6.12.0
    - v4.8.6
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version:
    - v4.0.0
    - v3.3.1
    pr-url: https://github.com/nodejs/node/pull/2447
    description: 仅文档弃用。
-->

Type: End-of-Life

`util.isUndefined()` API 已被移除。请改用 `arg === undefined`。

自动迁移工具可用（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/util-is)）：

```bash
npx codemod@latest @nodejs/util-is
```

### DEP0059: `util.log()`

<!-- YAML
changes:
  - version: v23.0.0
    pr-url: https://github.com/nodejs/node/pull/52744
    description: 生命周期结束弃用。
  - version: v22.0.0
    pr-url: https://github.com/nodejs/node/pull/50488
    description: 运行时弃用。
  - version: v6.12.0
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/6161
    description: 仅文档弃用。
-->

Type: End-of-Life

`util.log()` API 已被移除，因为它是一个意外暴露给用户空间的未维护的遗留 API。相反，根据您的具体需求考虑以下替代方案：

* **第三方日志库**

* **使用 `console.log(new Date().toLocaleString(), message)`**

通过采用这些替代方案之一，您可以过渡远离 `util.log()` 并选择符合您应用程序特定要求和复杂性的日志策略。

自动迁移工具可用（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/util-log-to-console-log)）：

```bash
npx codemod@latest @nodejs/util-log-to-console-log
```

### DEP0060: `util._extend()`

<!-- YAML
changes:
  - version: v22.0.0
    pr-url: https://github.com/nodejs/node/pull/50488
    description: 运行时弃用。
  - version: v6.12.0
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/4903
    description: 仅文档弃用。
-->

Type: Runtime

[`util._extend()`][] API 已弃用，因为它是一个意外暴露给用户空间的未维护的遗留 API。
请改用 `target = Object.assign(target, source)`。

自动迁移工具可用（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/util-extend-to-object-assign)）：

```bash
npx codemod@latest @nodejs/util-extend-to-object-assign
```

### DEP0061: `fs.SyncWriteStream`

<!-- YAML
changes:
  - version: v11.0.0
    pr-url: https://github.com/nodejs/node/pull/20735
    description: 结束生命周期。
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/10467
    description: 运行时弃用。
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/6749
    description: 仅文档弃用。
-->

Type: End-of-Life

`fs.SyncWriteStream` 类从未打算成为 publicly accessible API，已被移除。没有可用的替代 API。请使用用户空间的替代方案。

### DEP0062: `node --debug`

<!-- YAML
changes:
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/25828
    description: 结束生命周期。
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/10970
    description: 运行时弃用。
-->

Type: End-of-Life

`--debug` 激活遗留的 V8 调试器接口，该接口自 V8 5.8 起已被移除。它已被 Inspector 取代，后者改用 `--inspect` 激活。

### DEP0063: `ServerResponse.prototype.writeHeader()`

<!-- YAML
changes:
  - version: v26.0.0
    pr-url: https://github.com/nodejs/node/pull/60635
    description: 结束生命周期。
  - version: v25.0.0
    pr-url: https://github.com/nodejs/node/pull/59060
    description: 运行时弃用。
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/11355
    description: 仅文档弃用。
-->

Type: End-of-Life

`node:http` 模块 `ServerResponse.prototype.writeHeader()` API 已弃用。请改用 `ServerResponse.prototype.writeHead()`。

`ServerResponse.prototype.writeHeader()` 方法从未被记录为官方支持的 API。

### DEP0064: `tls.createSecurePair()`

<!-- YAML
changes:
  - version: v24.0.0
    pr-url: https://github.com/nodejs/node/pull/57361
    description: 结束生命周期。
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/11349
    description: 运行时弃用。
  - version: v6.12.0
    pr-url: https://github.com/nodejs/node/pull/10116
    description: 已分配弃用代码。
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/6063
    description: 仅文档弃用。
  - version: v0.11.15
    pr-url:
      - https://github.com/nodejs/node-v0.x-archive/pull/8695
      - https://github.com/nodejs/node-v0.x-archive/pull/8700
    description: 弃用已撤销。
  - version: v0.11.3
    commit: af80e7bc6e6f33c582eb1f7d37c7f5bbe9f910f7
    description: 运行时弃用。
-->

Type: End-of-Life

`tls.createSecurePair()` API 在 Node.js 0.11.3 的文档中被弃用。用户应改用 `tls.Socket`。

### DEP0065: `repl.REPL_MODE_MAGIC` 和 `NODE_REPL_MODE=magic`

<!-- YAML
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/19187
    description: 结束生命周期。
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/11599
    description: 仅文档弃用。
-->

Type: End-of-Life

`node:repl` 模块的 `REPL_MODE_MAGIC` 常量（用于 `replMode` 选项）已被移除。自 Node.js 6.0.0 导入 V8 5.0 以来，其行为在功能上与 `REPL_MODE_SLOPPY` 相同。请改用 `REPL_MODE_SLOPPY`。

`NODE_REPL_MODE` 环境变量用于设置交互式 `node` 会话的底层 `replMode`。其值 `magic` 也被移除。请改用 `sloppy`。

### DEP0066: `OutgoingMessage.prototype._headers, OutgoingMessage.prototype._headerNames`

<!-- YAML
changes:
  - version: v24.0.0
    pr-url: https://github.com/nodejs/node/pull/57551
    description: 结束生命周期。
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/24167
    description: 运行时弃用。
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/10941
    description: 仅文档弃用。
-->

Type: End-of-Life

`node:http` 模块 `OutgoingMessage.prototype._headers` 和 `OutgoingMessage.prototype._headerNames` 属性已弃用。使用公共方法之一（例如 `OutgoingMessage.prototype.getHeader()`、`OutgoingMessage.prototype.getHeaders()`、`OutgoingMessage.prototype.getHeaderNames()`、`OutgoingMessage.prototype.getRawHeaderNames()`、`OutgoingMessage.prototype.hasHeader()`、`OutgoingMessage.prototype.removeHeader()`、`OutgoingMessage.prototype.setHeader()`）来处理传出 header。

`OutgoingMessage.prototype._headers` 和 `OutgoingMessage.prototype._headerNames` 属性从未被记录为官方支持的属性。

自动迁移工具可用（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/http-outgoingmessage-headers)）：

```bash
npx codemod@latest @nodejs/http-outgoingmessage-headers
```

### DEP0067: `OutgoingMessage.prototype._renderHeaders`

<!-- YAML
changes:
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/10941
    description: 仅文档弃用。
-->

Type: Documentation-only

`node:http` 模块 `OutgoingMessage.prototype._renderHeaders()` API 已弃用。

`OutgoingMessage.prototype._renderHeaders` 属性从未被记录为官方支持的 API。

### DEP0068: `node debug`

<!-- YAML
changes:
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/33648
    description: "传统的 `node debug` 命令已被移除。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/11441
    description: 运行时弃用。
-->

Type: End-of-Life

`node debug` 对应于传统的 CLI 调试器，它已被基于 V8-inspector 的 CLI 调试器取代，后者可通过 `node inspect` 使用。

### DEP0069: `vm.runInDebugContext(string)`

<!-- YAML
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/13295
    description: 结束生命周期。
  - version: v9.0.0
    pr-url: https://github.com/nodejs/node/pull/12815
    description: 运行时弃用。
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12243
    description: 仅文档弃用。
-->

Type: End-of-Life

DebugContext 已在 V8 中被移除，在 Node.js 10+ 中不可用。

DebugContext 曾是一个实验性 API。

### DEP0070: `async_hooks.currentId()`

<!-- YAML
changes:
  - version: v9.0.0
    pr-url: https://github.com/nodejs/node/pull/14414
    description: 结束生命周期。
  - version: v8.2.0
    pr-url: https://github.com/nodejs/node/pull/13490
    description: 运行时弃用。
-->

Type: End-of-Life

`async_hooks.currentId()` 已重命名为 `async_hooks.executionAsyncId()` 以提高清晰度。

此更改是在 `async_hooks` 作为实验性 API 时进行的。

### DEP0071: `async_hooks.triggerId()`

<!-- YAML
changes:
  - version: v9.0.0
    pr-url: https://github.com/nodejs/node/pull/14414
    description: 结束生命周期。
  - version: v8.2.0
    pr-url: https://github.com/nodejs/node/pull/13490
    description: 运行时弃用。
-->

Type: End-of-Life

`async_hooks.triggerId()` 已重命名为 `async_hooks.triggerAsyncId()` 以提高清晰度。

此更改是在 `async_hooks` 作为实验性 API 时进行的。

### DEP0072: `async_hooks.AsyncResource.triggerId()`

<!-- YAML
changes:
  - version: v9.0.0
    pr-url: https://github.com/nodejs/node/pull/14414
    description: 结束生命周期。
  - version: v8.2.0
    pr-url: https://github.com/nodejs/node/pull/13490
    description: 运行时弃用。
-->

Type: End-of-Life

`async_hooks.AsyncResource.triggerId()` 已重命名为
`async_hooks.AsyncResource.triggerAsyncId()` 以提高清晰度。

此更改是在 `async_hooks` 作为实验性 API 时进行的。

### DEP0073: `net.Server` 的几个内部属性

<!-- YAML
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/17141
    description: 结束生命周期。
  - version: v9.0.0
    pr-url: https://github.com/nodejs/node/pull/14449
    description: 运行时弃用。
-->

Type: End-of-Life

访问 `net.Server` 实例的几个具有不适当名称的内部、未文档化属性已弃用。

由于原始 API 未文档化且通常对非内部代码无用，因此不提供替代 API。

### DEP0074: `REPLServer.bufferedCommand`

<!-- YAML
changes:
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/33286
    description: 结束生命周期。
  - version: v9.0.0
    pr-url: https://github.com/nodejs/node/pull/13687
    description: 运行时弃用。
-->

Type: End-of-Life

`REPLServer.bufferedCommand` 属性已弃用，推荐使用
[`REPLServer.clearBufferedCommand()`][]。

### DEP0075: `REPLServer.parseREPLKeyword()`

<!-- YAML
changes:
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/33286
    description: 结束生命周期。
  - version: v9.0.0
    pr-url: https://github.com/nodejs/node/pull/14223
    description: 运行时弃用。
-->

Type: End-of-Life

`REPLServer.parseREPLKeyword()` 已从用户空间可见性中移除。

### DEP0076: `tls.parseCertString()`

<!-- YAML
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41479
    description: 结束生命周期。
  - version: v9.0.0
    pr-url: https://github.com/nodejs/node/pull/14249
    description: 运行时弃用。
  - version: v8.6.0
    pr-url: https://github.com/nodejs/node/pull/14245
    description: 仅文档弃用。
-->

Type: End-of-Life

`tls.parseCertString()` 是一个简单的解析辅助函数，被错误地公开了。虽然它应该解析证书主题和颁发者字符串，
但它从未正确处理多值相对区分名称（Relative Distinguished Names）。

本文档的早期版本建议使用 `querystring.parse()` 作为 `tls.parseCertString()` 的替代方案。然而，`querystring.parse()` 也
不能正确处理所有证书主题，不应使用。

### DEP0077: `Module._debug()`

<!-- YAML
changes:
  - version: v25.0.0
    pr-url: https://github.com/nodejs/node/pull/58473
    description: 结束生命周期。
  - version: v9.0.0
    pr-url: https://github.com/nodejs/node/pull/13948
    description: 运行时弃用。
-->

Type: End-of-Life

`Module._debug()` 已被移除。

`Module._debug()` 函数从未被文档化为官方支持的 API。

### DEP0078: `REPLServer.turnOffEditorMode()`

<!-- YAML
changes:
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/33286
    description: 结束生命周期。
  - version: v9.0.0
    pr-url: https://github.com/nodejs/node/pull/15136
    description: 运行时弃用。
-->

Type: End-of-Life

`REPLServer.turnOffEditorMode()` 已从用户空间可见性中移除。

### DEP0079: 通过 `.inspect()` 在对象上使用自定义检查函数

<!-- YAML
changes:
  - version: v11.0.0
    pr-url: https://github.com/nodejs/node/pull/20722
    description: 结束生命周期。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/16393
    description: 运行时弃用。
  - version: v8.7.0
    pr-url: https://github.com/nodejs/node/pull/15631
    description: 仅文档弃用。
-->

Type: End-of-Life

在对象上使用名为 `inspect` 的属性来为 [`util.inspect()`][] 指定自定义检查函数已弃用。请改用 [`util.inspect.custom`][]。为了与 6.4.0 版本之前的 Node.js 保持向后兼容，两者都可以指定。

### DEP0080: `path._makeLong()`

<!-- YAML
changes:
  - version: v9.0.0
    pr-url: https://github.com/nodejs/node/pull/14956
    description: 仅文档弃用。
-->

Type: Documentation-only

内部 `path._makeLong()` 并非 intended 供公开使用。然而，
用户空间模块发现它很有用。内部 API 已弃用
并替换为相同的公共 `path.toNamespacedPath()` 方法。

### DEP0081: `fs.truncate()` 使用文件描述符

<!-- YAML
changes:
  - version: v24.0.0
    pr-url: https://github.com/nodejs/node/pull/57567
    description: 结束生命周期。
  - version: v9.0.0
    pr-url: https://github.com/nodejs/node/pull/15990
    description: 运行时弃用。
-->

Type: End-of-Life

`fs.truncate()` `fs.truncateSync()` 与文件描述符一起使用已
弃用。请使用 `fs.ftruncate()` 或 `fs.ftruncateSync()` 来处理
文件描述符。

自动迁移可用（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/fs-truncate-fd-deprecation)）：

```bash
npx codemod@latest @nodejs/fs-truncate-fd-deprecation
```

### DEP0082: `REPLServer.prototype.memory()`

<!-- YAML
changes:
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/33286
    description: 结束生命周期。
  - version: v9.0.0
    pr-url: https://github.com/nodejs/node/pull/16242
    description: 运行时弃用。
-->

Type: End-of-Life

`REPLServer.prototype.memory()` 仅对 `REPLServer` 本身的内部机制是必要的。不要使用此函数。

### DEP0083: 通过将 `ecdhCurve` 设置为 `false` 禁用 ECDH

<!-- YAML
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/19794
    description: 结束生命周期。
  - version: v9.2.0
    pr-url: https://github.com/nodejs/node/pull/16130
    description: 运行时弃用。
-->

Type: End-of-Life

`tls.createSecureContext()` 和 `tls.TLSSocket` 的 `ecdhCurve` 选项可以
设置为 `false` 以仅在服务器上完全禁用 ECDH。此模式已
弃用，以准备迁移到 OpenSSL 1.1.0 并与客户端保持一致，现在不再支持。请改用 `ciphers` 参数。

### DEP0084: 要求绑定的内部依赖项

<!-- YAML
changes:
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/25138
    description: 此功能已被移除。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/16392
    description: 运行时弃用。
-->

Type: End-of-Life

自 Node.js 版本 4.4.0 和 5.2.0 以来，几个仅用于
内部使用的模块被错误地通过 `require()` 暴露给用户代码。这些模块是：

* `v8/tools/codemap`
* `v8/tools/consarray`
* `v8/tools/csvparser`
* `v8/tools/logreader`
* `v8/tools/profile_view`
* `v8/tools/profile`
* `v8/tools/SourceMap`
* `v8/tools/splaytree`
* `v8/tools/tickprocessor-driver`
* `v8/tools/tickprocessor`
* `node-inspect/lib/_inspect`（从 7.6.0 开始）
* `node-inspect/lib/internal/inspect_client`（从 7.6.0 开始）
* `node-inspect/lib/internal/inspect_repl`（从 7.6.0 开始）

`v8/*` 模块没有任何导出，如果不按特定顺序导入，实际上会抛出错误。因此，通过 `require()` 导入它们几乎没有合法的用例。

另一方面，`node-inspect` 可以通过包管理器在本地安装，因为它以相同的名称发布在 npm 注册表上。如果这样做，则无需修改源代码。

### DEP0085: AsyncHooks 敏感 API

<!-- YAML
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/17147
    description: 生命周期结束。
  - version:
    - v9.4.0
    - v8.10.0
    pr-url: https://github.com/nodejs/node/pull/16972
    description: 运行时弃用。
-->

Type: End-of-Life

AsyncHooks 敏感 API 从未被文档化，并且存在各种小问题。
请改用 `AsyncResource` API。参见
<https://github.com/nodejs/node/issues/15572>。

### DEP0086: 移除 `runInAsyncIdScope`

<!-- YAML
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/17147
    description: 生命周期结束。
  - version:
    - v9.4.0
    - v8.10.0
    pr-url: https://github.com/nodejs/node/pull/16972
    description: 运行时弃用。
-->

Type: End-of-Life

`runInAsyncIdScope` 不发出 `'before'` 或 `'after'` 事件，因此可能导致
很多问题。参见 <https://github.com/nodejs/node/issues/14328>。

<!-- md-lint skip-deprecation DEP0087 -->

<!-- md-lint skip-deprecation DEP0088 -->

### DEP0089: `require('node:assert')`

<!-- YAML
changes:
  - version: v12.8.0
    pr-url: https://github.com/nodejs/node/pull/28892
    description: 弃用已撤销。
  - version:
      - v9.9.0
      - v8.13.0
    pr-url: https://github.com/nodejs/node/pull/17002
    description: 仅文档弃用。
-->

Type: Deprecation revoked

直接导入 assert 不被推荐，因为暴露的函数使用
松散相等性检查。弃用已被撤销，因为使用
`node:assert` 模块并不受劝阻，且弃用引起了开发者的困惑。

### DEP0090: 无效的 GCM 身份验证标签长度

<!-- YAML
changes:
  - version: v11.0.0
    pr-url: https://github.com/nodejs/node/pull/17825
    description: 生命周期结束。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18017
    description: 运行时弃用。
-->

Type: End-of-Life

Node.js 曾经支持调用 [`decipher.setAuthTag()`][] 时 OpenSSL 接受的所有 GCM 身份验证标签长度。从 Node.js
v11.0.0 开始，只允许 128、120、112、104、96、64 和 32
位的身份验证标签长度。其他长度的身份验证标签根据
[NIST SP 800-38D][] 是无效的。

### DEP0091: `crypto.DEFAULT_ENCODING`

<!-- YAML
changes:
  - version: v20.0.0
    pr-url: https://github.com/nodejs/node/pull/47182
    description: 生命周期结束。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18333
    description: 运行时弃用。
-->

Type: End-of-Life

`crypto.DEFAULT_ENCODING` 属性仅为了与
0.9.3 版本之前的 Node.js 发布版本兼容而存在，现已移除。

### DEP0092: 顶层 `this` 绑定到 `module.exports`

<!-- YAML
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/16878
    description: 仅文档弃用。
-->

Type: Documentation-only

将属性分配给顶层 `this` 作为
`module.exports` 的替代方案已弃用。开发者应改用 `exports`
或 `module.exports`。

### DEP0093: `crypto.fips` 已弃用并被替换

<!-- YAML
changes:
  - version: v23.0.0
    pr-url: https://github.com/nodejs/node/pull/55019
    description: 运行时弃用。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18335
    description: 仅文档弃用。
-->

Type: Runtime

[`crypto.fips`][] 属性已弃用。请改用 `crypto.setFips()`
和 `crypto.getFips()`。

自动迁移可用（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/crypto-fips-to-getFips)）。

```bash
npx codemod@latest @nodejs/crypto-fips-to-getFips
```

### DEP0094: 使用多个参数调用 `assert.fail()`

<!-- YAML
changes:
  - version: v25.0.0
    pr-url: https://github.com/nodejs/node/pull/58532
    description: 生命周期结束。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18418
    description: 运行时弃用。
-->

Type: End-of-Life

使用多个参数调用 `assert.fail()` 已弃用。请仅使用
一个参数调用 `assert.fail()` 或使用不同的 `node:assert` 模块
方法。

### DEP0095: `timers.enroll()`

<!-- YAML
changes:
  - version: v24.0.0
    pr-url: https://github.com/nodejs/node/pull/56966
    description: 生命周期结束。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18066
    description: 运行时弃用。
-->

Type: End-of-Life

`timers.enroll()` 已被移除。请改用公开文档化的
[`setTimeout()`][] 或 [`setInterval()`][]。

### DEP0096: `timers.unenroll()`

<!-- YAML
changes:
  - version: v24.0.0
    pr-url: https://github.com/nodejs/node/pull/56966
    description: 生命周期结束。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18066
    description: 运行时弃用。
-->

Type: End-of-Life

`timers.unenroll()` 已被移除。请改用公开文档化的
[`clearTimeout()`][] 或 [`clearInterval()`][]。

### DEP0097: 带有 `domain` 属性的 `MakeCallback`

<!-- YAML
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/17417
    description: 运行时弃用。
-->

Type: Runtime

添加 `domain` 属性以携带上下文的 `MakeCallback` 用户，
应开始使用 `MakeCallback` 的 `async_context` 变体或
`CallbackScope`，或高级 `AsyncResource` 类。

### DEP0098: AsyncHooks 嵌入器 `AsyncResource.emitBefore` 和 `AsyncResource.emitAfter` API

<!-- YAML
changes:
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/26530
    description: 生命周期结束。
  - version:
    - v10.0.0
    - v9.6.0
    - v8.12.0
    pr-url: https://github.com/nodejs/node/pull/18632
    description: 运行时弃用。
-->

Type: End-of-Life

AsyncHooks 提供的嵌入 API 暴露了 `.emitBefore()` 和
`.emitAfter()` 方法，这些方法非常容易被错误使用，从而导致
不可恢复的错误。

请改用 [`asyncResource.runInAsyncScope()`][] API，它提供了更安全、
更方便的替代方案。参见
<https://github.com/nodejs/node/pull/18513>。

### DEP0099: 未感知异步上下文的 `node::MakeCallback` C++ API

<!-- YAML
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18632
    description: 编译时弃用。
-->

Type: Compile-time

某些版本的 `node::MakeCallback` API（可供原生插件使用）已
弃用。请使用接受 `async_context` 参数的 API 版本。

### DEP0100: `process.assert()`

<!-- YAML
changes:
  - version: v23.0.0
    pr-url: https://github.com/nodejs/node/pull/55035
    description: 生命周期结束。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18666
    description: 运行时弃用。
  - version: v0.3.7
    description: 仅文档弃用。
-->

Type: End-of-Life

`process.assert()` 已弃用。请改用 [`assert`][] 模块。

这从未是一个文档化的功能。

自动迁移可用（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/process-assert-to-node-assert)）。

```bash
npx codemod@latest @nodejs/process-assert-to-node-assert
```

### DEP0101: `--with-lttng`

<!-- YAML
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18982
    description: 生命周期结束。
-->

Type: End-of-Life

`--with-lttng` 编译时选项已被移除。

### DEP0102: 在 `Buffer#(read|write)` 操作中使用 `noAssert`

<!-- YAML
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18395
    description: 生命周期结束。
-->

Type: End-of-Life

使用 `noAssert` 参数不再有任何功能。无论 `noAssert` 的值如何，所有输入都会
被验证。跳过验证可能导致难以发现的错误和崩溃。

### DEP0103: `process.binding('util').is[...]` 类型检查

<!-- YAML
changes:
  - version: v10.9.0
    pr-url: https://github.com/nodejs/node/pull/22004
    description: 被 [DEP0111](#DEP0111) 取代。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18415
    description: 仅文档弃用。
-->

Type: Documentation-only (supports [`--pending-deprecation`][])

通常应避免使用 `process.binding()`。特别是类型检查
方法可以通过使用 [`util.types`][] 来替换。

此弃用已被 `process.binding()` API 的弃用所取代 ([DEP0111](#DEP0111))。

### DEP0104: `process.env` 字符串强制转换

<!-- YAML
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18990
    description: "支持 `--pending-deprecation` 的仅文档弃用。"
-->

Type: Documentation-only (supports [`--pending-deprecation`][])

当将非字符串属性分配给 [`process.env`][] 时，分配的值会
隐式转换为字符串。如果分配的值不是字符串、布尔值或数字，则此行为已弃用。将来，此类分配可能会
导致抛出错误。请在将其分配给 `process.env` 之前将属性转换为字符串。

### DEP0105: `decipher.finaltol`

<!-- YAML
changes:
  - version: v11.0.0
    pr-url: https://github.com/nodejs/node/pull/19941
    description: 生命周期结束。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/19353
    description: 运行时弃用。
-->

Type: End-of-Life

`decipher.finaltol()` 从未被文档化，它是
[`decipher.final()`][] 的别名。此 API 已被移除，建议使用
[`decipher.final()`][] 代替。

### DEP0106: `crypto.createCipher` 和 `crypto.createDecipher`

<!-- YAML
changes:
  - version: v22.0.0
    pr-url: https://github.com/nodejs/node/pull/50973
    description: 生命周期结束。
  - version: v11.0.0
    pr-url: https://github.com/nodejs/node/pull/22089
    description: 运行时弃用。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/19343
    description: 仅文档弃用。
-->

Type: End-of-Life

`crypto.createCipher()` 和 `crypto.createDecipher()` 已被移除，
因为它们使用弱密钥派生函数（无盐的 MD5）和静态
初始化向量。
建议使用 [`crypto.pbkdf2()`][] 或 [`crypto.scrypt()`][] 与随机盐派生密钥，并使用
[`crypto.createCipheriv()`][] 和 [`crypto.createDecipheriv()`][] 分别获取
[`Cipheriv`][] 和 [`Decipheriv`][] 对象。

### DEP0107: `tls.convertNPNProtocols()`

<!-- YAML
changes:
  - version: v11.0.0
    pr-url: https://github.com/nodejs/node/pull/20736
    description: 生命周期结束。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/19403
    description: 运行时弃用。
-->

Type: End-of-Life

这是一个未文档化的辅助函数，不 intended 供 Node.js
核心之外使用，并且随着 NPN（Next Protocol Negotiation）支持的移除而过时。

### DEP0108: `zlib.bytesRead`

<!-- YAML
changes:
  - version: v23.0.0
    pr-url: https://github.com/nodejs/node/pull/55020
    description: 生命周期结束。
  - version: v11.0.0
    pr-url: https://github.com/nodejs/node/pull/23308
    description: 运行时弃用。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/19414
    description: 仅文档弃用。
-->

Type: End-of-Life

[`zlib.bytesWritten`][] 的已弃用别名。选择这个原始名称是因为
将其值解释为引擎读取的字节数也有意义，但与 Node.js 中
在这些名称下暴露值的其他流不一致。

自动迁移可用（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/zlib-bytesread-to-byteswritten)）。

```bash
npx codemod@latest @nodejs/zlib-bytesread-to-byteswritten
```

### DEP0109: `http`、`https` 和 `tls` 对无效 URL 的支持

<!-- YAML
changes:
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/36853
    description: 生命周期结束。
  - version: v11.0.0
    pr-url: https://github.com/nodejs/node/pull/20270
    description: 运行时弃用。
-->

Type: End-of-Life

一些以前支持（但严格无效）的 URL 被 [`http.request()`][]、[`http.get()`][]、[`https.request()`][]、
[`https.get()`][] 和 [`tls.checkServerIdentity()`][] API 接受，因为这些 URL 被传统的 `url.parse()` API 接受。提到的 API 现在使用 WHATWG
URL 解析器，该解析器需要严格有效的 URL。传递无效 URL 已
弃用，支持将在未来移除。

### DEP0110: `vm.Script` 缓存数据

<!-- YAML
changes:
  - version: v10.6.0
    pr-url: https://github.com/nodejs/node/pull/20300
    description: 仅文档弃用。
-->

Type: Documentation-only

`produceCachedData` 选项已弃用。请改用
[`script.createCachedData()`][]。

### DEP0111: `process.binding()`

<!-- YAML
changes:
  - version: v11.12.0
    pr-url: https://github.com/nodejs/node/pull/26500
    description: "已添加对 `--pending-deprecation` 的支持。"
  - version: v10.9.0
    pr-url: https://github.com/nodejs/node/pull/22004
    description: 仅文档弃用。
-->

Type: Documentation-only (supports [`--pending-deprecation`][])

`process.binding()` 仅供 Node.js 内部代码使用。

虽然 `process.binding()` 通常尚未达到生命周期结束状态，但在启用 [权限模型][] 时不可用。

### DEP0112: `dgram` 私有 API

<!-- YAML
changes:
  - version: v25.0.0
    pr-url: https://github.com/nodejs/node/pull/58474
    description: 生命周期结束。
  - version: v11.0.0
    pr-url: https://github.com/nodejs/node/pull/22011
    description: 运行时弃用。
-->

Type: End-of-Life

`node:dgram` 模块以前包含几个从未 intended
在 Node.js 核心之外访问的 API：`Socket.prototype._handle`、
`Socket.prototype._receiving`、`Socket.prototype._bindState`、
`Socket.prototype._queue`、`Socket.prototype._reuseAddr`、
`Socket.prototype._healthCheck()`、`Socket.prototype._stopReceiving()` 和
`dgram._createSocketHandle()`。这些已被移除。

### DEP0113: `Cipher.setAuthTag()`、`Decipher.getAuthTag()`

<!-- YAML
changes:
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/26249
    description: 生命周期结束。
  - version: v11.0.0
    pr-url: https://github.com/nodejs/node/pull/22126
    description: 运行时弃用。
-->

Type: End-of-Life

`Cipher.setAuthTag()` 和 `Decipher.getAuthTag()` 不再可用。它们
从未被文档化，并且在调用时会抛出错误。

### DEP0114: `crypto._toBuf()`

<!-- YAML
changes:
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/25338
    description: 生命周期结束。
  - version: v11.0.0
    pr-url: https://github.com/nodejs/node/pull/22501
    description: 运行时弃用。
-->

Type: End-of-Life

`crypto._toBuf()` 函数并非 designed 供 Node.js 核心之外的模块使用，已被移除。

<!--lint disable nodejs-yaml-comments -->

### DEP0115: `crypto.prng()`、`crypto.pseudoRandomBytes()`、`crypto.rng()`

<!-- YAML
changes:
  - version: v11.0.0
    pr-url:
      - https://github.com/nodejs/node/pull/22519
      - https://github.com/nodejs/node/pull/23017
    description: "支持 `--pending-deprecation` 的仅文档弃用。"
-->

Type: Documentation-only (supports [`--pending-deprecation`][])

<!--lint enable nodejs-yaml-comments -->

在最近版本的 Node.js 中，[`crypto.randomBytes()`][] 和 `crypto.pseudoRandomBytes()` 之间没有区别。后者已
弃用，连同未文档化的别名 `crypto.prng()` 和
`crypto.rng()` 一起，推荐使用 [`crypto.randomBytes()`][]，并可能在未来的版本中移除。

### DEP0116: 传统 URL API

<!-- YAML
changes:
  - version:
      - v24.0.0
    pr-url: https://github.com/nodejs/node/pull/55017
    description: "DEP0169 也涵盖了 `url.format()` 和 `url.resolve()`。"
  - version:
      - v19.0.0
      - v18.13.0
    pr-url: https://github.com/nodejs/node/pull/44919
    description: "DEP0169 再次弃用了 `url.parse()`。"
  - version:
      - v15.13.0
      - v14.17.0
    pr-url: https://github.com/nodejs/node/pull/37784
    description: 弃用已撤销。状态更改为“Legacy”。
  - version: v11.0.0
    pr-url: https://github.com/nodejs/node/pull/22715
    description: 仅文档弃用。
-->

Type: Deprecation revoked

[传统 URL API][] 已弃用。这包括 [`url.format()`][]、
[`url.parse()`][]、[`url.resolve()`][] 和 [传统 `urlObject`][]。请改用 [WHATWG URL API][]。

自动迁移可用（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/node-url-to-whatwg-url)）。

```bash
npx codemod@latest @nodejs/node-url-to-whatwg-url
```

### DEP0117: 原生 crypto 句柄

<!-- YAML
changes:
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/27011
    description: 生命周期结束。
  - version: v11.0.0
    pr-url: https://github.com/nodejs/node/pull/22747
    description: 运行时弃用。
-->

Type: End-of-Life

早期版本的 Node.js 通过 `Cipher`、`Decipher`、`DiffieHellman`、
`DiffieHellmanGroup`、`ECDH`、`Hash`、`Hmac`、`Sign` 和 `Verify` 类的 `_handle` 属性暴露了内部原生对象的句柄。
`_handle` 属性已被移除，因为不当使用原生
对象可能导致应用程序崩溃。

### DEP0118: `dns.lookup()` 对假值主机名的支持

<!-- YAML
changes:
  - version: v25.0.0
    pr-url: https://github.com/nodejs/node/pull/58619
    description: 生命周期结束。
  - version: v11.0.0
    pr-url: https://github.com/nodejs/node/pull/23173
    description: 运行时弃用。
-->

Type: End-of-Life

早期版本的 Node.js 支持使用假值主机名（如 `dns.lookup(false)`）调用 `dns.lookup()`，这是出于向后兼容性考虑。此支持已被移除。

### DEP0119: `process.binding('uv').errname()` 私有 API

<!-- YAML
changes:
  - version: v11.0.0
    pr-url: https://github.com/nodejs/node/pull/23597
    description: "支持 `--pending-deprecation` 的仅文档弃用。"
-->

Type: Documentation-only (supports [`--pending-deprecation`][])

`process.binding('uv').errname()` 已弃用。请改用
[`util.getSystemErrorName()`][]。

### DEP0120: Windows 性能计数器支持

<!-- YAML
changes:
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/24862
    description: 生命周期结束。
  - version: v11.0.0
    pr-url: https://github.com/nodejs/node/pull/22485
    description: 运行时弃用。
-->

Type: End-of-Life

Windows 性能计数器支持已从 Node.js 中移除。
未文档化的 `COUNTER_NET_SERVER_CONNECTION()`、
`COUNTER_NET_SERVER_CONNECTION_CLOSE()`、`COUNTER_HTTP_SERVER_REQUEST()`、
`COUNTER_HTTP_SERVER_RESPONSE()`、`COUNTER_HTTP_CLIENT_REQUEST()` 和
`COUNTER_HTTP_CLIENT_RESPONSE()` 函数已弃用。

### DEP0121: `net._setSimultaneousAccepts()`

<!-- YAML
changes:
  - version: v24.0.0
    pr-url: https://github.com/nodejs/node/pull/57550
    description: 生命周期结束。
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/23760
    description: 运行时弃用。
-->

Type: End-of-Life

未文档化的 `net._setSimultaneousAccepts()` 函数最初
intended 用于在 Windows 上使用 `node:child_process` 和 `node:cluster` 模块时进行调试和性能调优。该函数通常
无用，正在被移除。参见此处的讨论：
<https://github.com/nodejs/node/issues/18391>

### DEP0122: `tls` `Server.prototype.setOptions()`

<!-- YAML
changes:
  - version: v24.0.0
    pr-url: https://github.com/nodejs/node/pull/57339
    description: 生命周期结束。
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/23820
    description: 运行时弃用。
-->

Type: End-of-Life

请改用 `Server.prototype.setSecureContext()`。

### DEP0123: 将 TLS ServerName 设置为 IP 地址

<!-- YAML
changes:
  - version: v25.0.0
    pr-url: https://github.com/nodejs/node/pull/58533
    description: 生命周期结束。
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/23329
    description: 运行时弃用。
-->

Type: End-of-Life

[RFC 6066][] 不允许将 TLS ServerName 设置为 IP 地址。

### DEP0124: 使用 `REPLServer.rli`

<!-- YAML
changes:
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/33286
    description: 生命周期结束。
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/26260
    description: 运行时弃用。
-->

Type: End-of-Life

此属性是对实例本身的引用。

### DEP0125: `require('node:_stream_wrap')`

<!-- YAML
changes:
  - version: v26.0.0
    pr-url: https://github.com/nodejs/node/pull/60657
    description: 生命周期结束。
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/26245
    description: 运行时弃用。
-->

Type: End-of-Life

`node:_stream_wrap` 模块已弃用。

### DEP0126: `timers.active()`

<!-- YAML
changes:
  - version: v24.0.0
    pr-url: https://github.com/nodejs/node/pull/56966
    description: 生命周期结束。
  - version: v11.14.0
    pr-url: https://github.com/nodejs/node/pull/26760
    description: 运行时弃用。
-->

Type: End-of-Life

以前未文档化的 `timers.active()` 已被移除。
请改用公开文档化的 [`timeout.refresh()`][]。
如果需要重新引用超时，[`timeout.ref()`][] 可以自 Node.js 10 以来使用，且无性能影响。

### DEP0127: `timers._unrefActive()`

<!-- YAML
changes:
  - version: v24.0.0
    pr-url: https://github.com/nodejs/node/pull/56966
    description: 生命周期结束。
  - version: v11.14.0
    pr-url: https://github.com/nodejs/node/pull/26760
    description: 运行时弃用。
-->

Type: End-of-Life

以前未文档化且“私有”的 `timers._unrefActive()` 已被移除。
请改用公开文档化的 [`timeout.refresh()`][]。
如果需要取消引用超时，[`timeout.unref()`][] 可以自 Node.js 10 以来使用，且无性能影响。

### DEP0128: 具有无效 `main` 入口和 `index.js` 文件的模块

<!-- YAML
changes:
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/37204
    description: 运行时弃用。
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/26823
    description: 仅文档。
-->

Type: Runtime

具有无效 `main` 入口（例如 `./does-not-exist.js`）且
在顶层目录中也有 `index.js` 文件的模块将解析
`index.js` 文件。这已弃用，并将在未来的
Node.js 版本中抛出错误。

### DEP0129: `ChildProcess._channel`

<!-- YAML
changes:
  - version: v25.0.0
    pr-url: https://github.com/nodejs/node/pull/58527
    description: 生命周期结束。
  - version: v13.0.0
    pr-url: https://github.com/nodejs/node/pull/27949
    description: 运行时弃用。
  - version: v11.14.0
    pr-url: https://github.com/nodejs/node/pull/26982
    description: 仅文档。
-->

Type: End-of-Life

`spawn()` 和类似函数返回的子进程对象的 `_channel` 属性不 intended 供公开使用。请改用 `ChildProcess.channel`。

### DEP0130: `Module.createRequireFromPath()`

<!-- YAML
changes:
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/37201
    description: 生命周期结束。
  - version: v13.0.0
    pr-url: https://github.com/nodejs/node/pull/27951
    description: 运行时弃用。
  - version: v12.2.0
    pr-url: https://github.com/nodejs/node/pull/27405
    description: 仅文档。
-->

Type: End-of-Life

请改用 [`module.createRequire()`][]。

自动迁移可用（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/create-require-from-path)）：

```bash
npx codemod@latest @nodejs/create-require-from-path
```

### DEP0131: 传统 HTTP 解析器

<!-- YAML
changes:
  - version: v13.0.0
    pr-url: https://github.com/nodejs/node/pull/29589
    description: 此功能已被移除。
  - version: v12.22.0
    pr-url: https://github.com/nodejs/node/pull/37603
    description: 运行时弃用。
  - version: v12.3.0
    pr-url: https://github.com/nodejs/node/pull/27498
    description: 仅文档。
-->

Type: End-of-Life

传统 HTTP 解析器在 12.0.0 版本之前的 Node.js 版本中默认使用，
已弃用并在 v13.0.0 中移除。在 v13.0.0 之前，
可以使用 `--http-parser=legacy` 命令行标志恢复使用传统解析器。

### DEP0132: 带回调的 `worker.terminate()`

<!-- YAML
changes:
  - version: v25.0.0
    pr-url: https://github.com/nodejs/node/pull/58528
    description: 生命周期结束。
  - version: v12.5.0
    pr-url: https://github.com/nodejs/node/pull/28021
    description: 运行时弃用。
-->

Type: End-of-Life

传递回调给 [`worker.terminate()`][] 已弃用。请改用返回的
`Promise`，或监听 worker 的 `'exit'` 事件。

### DEP0133: `http` `connection`

<!-- YAML
changes:
  - version: v12.12.0
    pr-url: https://github.com/nodejs/node/pull/29015
    description: 仅文档弃用。
-->

Type: Documentation-only

首选 [`response.socket`][] 而不是 [`response.connection`][]，
首选 [`request.socket`][] 而不是 [`request.connection`][]。

### DEP0134: `process._tickCallback`

<!-- YAML
changes:
  - version: v12.12.0
    pr-url: https://github.com/nodejs/node/pull/29781
    description: "支持 `--pending-deprecation` 的仅文档弃用。"
-->

Type: Documentation-only (supports [`--pending-deprecation`][])

`process._tickCallback` 属性从未被文档化为
官方支持的 API。

### DEP0135: `WriteStream.open()` 和 `ReadStream.open()` 是内部的

<!-- YAML
changes:
  - version: v25.0.0
    pr-url: https://github.com/nodejs/node/pull/58529
    description: 生命周期结束。
  - version: v13.0.0
    pr-url: https://github.com/nodejs/node/pull/29061
    description: 运行时弃用。
-->

Type: End-of-Life

[`WriteStream.open()`][] 和 [`ReadStream.open()`][] 是未文档化的内部
API，在用户空间中使用没有意义。文件流应始终通过其相应的工厂方法 [`fs.createWriteStream()`][]
和 [`fs.createReadStream()`][] 打开，或在选项中传递文件描述符。

### DEP0136: `http` `finished`

<!-- YAML
changes:
  - version:
     - v13.4.0
     - v12.16.0
    pr-url: https://github.com/nodejs/node/pull/28679
    description: 仅文档弃用。
-->

Type: Documentation-only

[`response.finished`][] 指示是否已调用 [`response.end()`][],
而不是是否已发出 `'finish'` 且底层数据
已刷新。

请相应地改用 [`response.writableFinished`][] 或 [`response.writableEnded`][]
以避免歧义。

为了保持现有行为，`response.finished` 应替换为
`response.writableEnded`。

### DEP0137: 垃圾回收时关闭 fs.FileHandle

<!-- YAML
changes:
  - version: v25.0.0
    pr-url: https://github.com/nodejs/node/pull/58536
    description: 生命周期结束。
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/28396
    description: 运行时弃用。
-->

Type: End-of-Life

允许 [`fs.FileHandle`][] 对象在垃圾回收时关闭曾经是
允许的，但现在会抛出错误。

请确保所有 `fs.FileHandle` 对象在不再需要时使用
`FileHandle.prototype.close()` 显式关闭：

```js
const fsPromises = require('node:fs').promises;
async function openAndClose() {
  let filehandle;
  try {
    filehandle = await fsPromises.open('thefile.txt', 'r');
  } finally {
    if (filehandle !== undefined)
      await filehandle.close();
  }
}
```

### DEP0138: `process.mainModule`

<!-- YAML
changes:
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/32232
    description: 仅文档弃用。
-->

Type: Documentation-only

[`process.mainModule`][] 是仅 CommonJS 的功能，而 `process` 全局
对象与非 CommonJS 环境共享。它在 ECMAScript
模块中的使用不受支持。

它已弃用，推荐使用 [`require.main`][]，因为它服务于相同的
目的，且仅在 CommonJS 环境中可用。

自动迁移可用（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/process-main-module)）：

```bash
npx codemod@latest @nodejs/process-main-module
```

### DEP0139: 无参数的 `process.umask()`

<!-- YAML
changes:
  - version:
    - v14.0.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/32499
    description: 仅文档弃用。
-->

Type: Documentation-only

调用无参数的 `process.umask()` 会导致进程范围的 umask 被
写入两次。这在线程之间引入了竞态条件，并且是一个
潜在的安全漏洞。没有安全、跨平台的替代
API。

### DEP0140: 使用 `request.destroy()` 而不是 `request.abort()`

<!-- YAML
changes:
  - version:
    - v14.1.0
    - v13.14.0
    pr-url: https://github.com/nodejs/node/pull/32807
    description: 仅文档弃用。
-->

Type: Documentation-only

请改用 [`request.destroy()`][] 而不是 [`request.abort()`][]。

### DEP0141: `repl.inputStream` 和 `repl.outputStream`

<!-- YAML
changes:
  - version: v14.3.0
    pr-url: https://github.com/nodejs/node/pull/33294
    description: "支持 `--pending-deprecation` 的仅文档弃用。"
-->

Type: Documentation-only (supports [`--pending-deprecation`][])

`node:repl` 模块导出了输入和输出流两次。请改用 `.input`
而不是 `.inputStream`，改用 `.output` 而不是 `.outputStream`。

### DEP0142: `repl._builtinLibs`

<!-- YAML
changes:
  - version: v14.3.0
    pr-url: https://github.com/nodejs/node/pull/33294
    description: "支持 `--pending-deprecation` 的仅文档弃用。"
-->

Type: Documentation-only (supports [`--pending-deprecation`][])

`node:repl` 模块导出了一个包含内置模块数组的 `_builtinLibs` 属性。它目前不完整，最好依赖
`require('node:module').builtinModules`。

自动迁移可用（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/repl-builtin-modules)）：

```bash
npx codemod@latest @nodejs/repl-builtin-modules
```

### DEP0143: `Transform._transformState`

<!-- YAML
changes:
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/33105
    description: 生命周期结束。
  - version: v14.5.0
    pr-url: https://github.com/nodejs/node/pull/33126
    description: 运行时弃用。
-->

Type: End-of-Life

`Transform._transformState` 将在未来版本中移除，届时由于实现的简化，它将不再需要。

### DEP0144: `module.parent`

<!-- YAML
changes:
  - version:
    - v14.6.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/32217
    description: 仅文档弃用。
-->

Type: Documentation-only (supports [`--pending-deprecation`][])

CommonJS 模块可以使用 `module.parent` 访问第一个 require 它的模块。此功能已弃用，因为它在存在 ECMAScript 模块的情况下不能一致地工作，并且因为它给出了 CommonJS 模块图的不准确表示。

一些模块使用它来检查它们是否是当前进程的入口点。
相反，建议比较 `require.main` 和 `module`：

```js
if (require.main === module) {
  // 仅当当前文件是入口点时才会运行的代码部分。
}
```

当查找 require 当前模块的 CommonJS 模块时，
可以使用 `require.cache` 和 `module.children`：

```js
const moduleParents = Object.values(require.cache)
  .filter((m) => m.children.includes(module));
```

### DEP0145: `socket.bufferSize`

<!-- YAML
changes:
  - version: v14.6.0
    pr-url: https://github.com/nodejs/node/pull/34088
    description: 仅文档弃用。
-->

Type: Documentation-only

[`socket.bufferSize`][] 只是 [`writable.writableLength`][] 的别名。

### DEP0146: `new crypto.Certificate()`

<!-- YAML
changes:
  - version: v14.9.0
    pr-url: https://github.com/nodejs/node/pull/34697
    description: 仅文档弃用。
-->

Type: Documentation-only

[`crypto.Certificate()` 构造函数][] 已弃用。请改用
[`crypto.Certificate()` 的静态方法][]。

### DEP0147: `fs.rmdir(path, { recursive: true })`

<!-- YAML
changes:
  - version: v25.0.0
    pr-url: https://github.com/nodejs/node/pull/58616
    description: 生命周期结束。
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/37302
    description: 运行时弃用。
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/35562
    description: 对允许行为的运行时弃用。
  - version: v14.14.0
    pr-url: https://github.com/nodejs/node/pull/35579
    description: 仅文档弃用。
-->

Type: End-of-Life

`fs.rmdir`、`fs.rmdirSync` 和 `fs.promises.rmdir` 方法曾经
支持 `recursive` 选项。该选项已被移除。

请改用 `fs.rm(path, { recursive: true, force: true })`、
`fs.rmSync(path, { recursive: true, force: true })` 或
`fs.promises.rm(path, { recursive: true, force: true })`。

自动迁移可用（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/rmdir)）：

```bash
npx codemod@latest @nodejs/rmdir
```

### DEP0148: `"exports"` 中的文件夹映射（尾部 `"/"`）

<!-- YAML
changes:
  - version: v17.0.0
    pr-url: https://github.com/nodejs/node/pull/40121
    description: 生命周期结束。
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/37215
    description: 运行时弃用。
  - version: v15.1.0
    pr-url: https://github.com/nodejs/node/pull/35747
    description: 对自引用导入的运行时弃用。
  - version: v14.13.0
    pr-url: https://github.com/nodejs/node/pull/34718
    description: 仅文档弃用。
-->

Type: End-of-Life

不再支持在 [子路径导出][] 或 [子路径导入][] 字段中使用尾部 `"/"` 来定义子路径文件夹映射。
请改用 [子路径模式][]。

### DEP0149: `http.IncomingMessage#connection`

<!-- YAML
changes:
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/33768
    description: 仅文档弃用。
 -->

Type: Documentation-only

首选 [`message.socket`][] 而不是 [`message.connection`][]。

### DEP0150: 更改 `process.config` 的值

<!-- YAML
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/43627
    description: 生命周期结束。
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/36902
    description: 运行时弃用。
-->

Type: End-of-Life

`process.config` 属性提供对 Node.js 编译时设置的访问。
然而，该属性是可变的，因此易受篡改。更改值的能力
将在未来的 Node.js 版本中移除。

### DEP0151: 主索引查找和扩展名搜索

<!-- YAML
changes:
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/37206
    description: 运行时弃用。
  - version:
      - v15.8.0
      - v14.18.0
    pr-url: https://github.com/nodejs/node/pull/36918
    description: "支持 `--pending-deprecation` 的仅文档弃用。"
-->

Type: Runtime

以前，`index.js` 和扩展名搜索查找会应用于
`import 'pkg'` 主入口点解析，即使在解析 ES 模块时也是如此。

通过此弃用，所有 ES 模块主入口点解析都需要
一个带有确切文件扩展名的显式 [`"exports"` 或 `"main"` 入口][]。

### DEP0152: 扩展 PerformanceEntry 属性

<!-- YAML
changes:
  - version: v25.0.0
    pr-url: https://github.com/nodejs/node/pull/58531
    description: 生命周期结束。
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/37136
    description: 运行时弃用。
-->

Type: End-of-Life

`'gc'`、`'http2'` 和 `'http'` {PerformanceEntry} 对象类型曾经有
分配给它们的额外属性，提供额外信息。
这些属性现在可在 `PerformanceEntry` 对象的标准 `detail` 属性内使用。已弃用的访问器已被
移除。

### DEP0153: `dns.lookup` 和 `dnsPromises.lookup` 选项类型强制转换

<!-- YAML
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41431
    description: 生命周期结束。
  - version: v17.0.0
    pr-url: https://github.com/nodejs/node/pull/39793
    description: 运行时弃用。
  - version: v16.8.0
    pr-url: https://github.com/nodejs/node/pull/38906
    description: 仅文档弃用。
-->

Type: End-of-Life

在 [`dns.lookup()`][] 和 [`dnsPromises.lookup()`][] 中对 `family` 选项使用非空值非整数值，对 `hints` 选项使用非空值非数字值，对 `all` 选项使用非空值非布尔值，或对 `verbatim` 选项使用非空值非布尔值，将抛出
`ERR_INVALID_ARG_TYPE` 错误。

### DEP0154: RSA-PSS 生成密钥对选项

<!-- YAML
changes:
  - version: v25.0.0
    pr-url: https://github.com/nodejs/node/pull/58706
    description: 生命周期结束。
  - version: v20.0.0
    pr-url: https://github.com/nodejs/node/pull/45653
    description: 运行时弃用。
  - version: v16.10.0
    pr-url: https://github.com/nodejs/node/pull/39927
    description: 仅文档弃用。
-->

Type: End-of-Life

请使用 `'hashAlgorithm'` 而不是 `'hash'`，使用 `'mgf1HashAlgorithm'` 而不是 `'mgf1Hash'`。

自动迁移可用（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/crypto-rsa-pss-update)）。

```bash
npx codemod@latest @nodejs/crypto-rsa-pss-update
```

### DEP0155: 模式标识符解析中的尾部斜杠

<!-- YAML
changes:
  - version: v17.0.0
    pr-url: https://github.com/nodejs/node/pull/40117
    description: 运行时弃用。
  - version: v16.10.0
    pr-url: https://github.com/nodejs/node/pull/40039
    description: "支持 `--pending-deprecation` 的仅文档弃用。"
-->

Type: Runtime

对于包 `"exports"` 和 `"imports"` 模式解析，以 `"/"` 结尾的标识符（如 `import 'pkg/x/'`）的重映射已弃用。

### DEP0156: `http` 中的 `.aborted` 属性和 `'abort'`、`'aborted'` 事件

<!-- YAML
changes:
  - version:
    - v17.0.0
    - v16.12.0
    pr-url: https://github.com/nodejs/node/pull/36670
    description: 仅文档弃用。
-->

Type: Documentation-only

请改用 {Stream} API，因为 [`http.ClientRequest`][]、
[`http.ServerResponse`][] 和 [`http.IncomingMessage`][] 都是基于流的。
检查 `stream.destroyed` 而不是 `.aborted` 属性，并监听
`'close'` 而不是 `'abort'`、`'aborted'` 事件。

`.aborted` 属性和 `'abort'` 事件仅对检测
`.abort()` 调用有用。对于提前关闭请求，使用 Stream
`.destroy([error])`，然后检查 `.destroyed` 属性和 `'close'` 事件
应具有相同的效果。接收端还应检查
[`http.IncomingMessage`][] 上的 [`readable.readableEnded`][] 值，以获取它是
被中止还是优雅销毁。

### DEP0157: 流中的 Thenable 支持

<!-- YAML
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/40773
    description: 生命周期结束。
  - version:
      - v17.2.0
      - v16.14.0
    pr-url: https://github.com/nodejs/node/pull/40860
    description: 仅文档弃用。
-->

Type: End-of-Life

Node.js 流的一个未文档化功能是在
实现方法中支持 thenables。这现已弃用，请改用回调，并避免
在流实现方法中使用异步函数。

此功能导致用户遇到意外问题，即用户使用回调风格实现函数，但使用了例如异步方法，这将导致错误，因为混合 Promise 和回调语义是无效的。

```js
const w = new Writable({
  async final(callback) {
    await someOp();
    callback();
  },
});
```

### DEP0158: `buffer.slice(start, end)`

<!-- YAML
changes:
  - version:
    - v17.5.0
    - v16.15.0
    pr-url: https://github.com/nodejs/node/pull/41596
    description: 仅文档弃用。
-->

Type: Documentation-only

此方法已被弃用，因为它与 `Uint8Array.prototype.slice()` 不兼容，而后者是 `Buffer` 的超类。

请改用 [`buffer.subarray`][]，它执行相同的操作。

### DEP0159: `ERR_INVALID_CALLBACK`

<!-- YAML
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: 生命周期结束。
-->

Type: End-of-Life

此错误代码已被移除，因为它给用于值类型验证的错误增加了更多的混淆。

### DEP0160: `process.on('multipleResolves', handler)`

<!-- YAML
changes:
  - version: v25.0.0
    pr-url: https://github.com/nodejs/node/pull/58707
    description: 生命周期结束。
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41896
    description: 运行时弃用。
  - version:
    - v17.6.0
    - v16.15.0
    pr-url: https://github.com/nodejs/node/pull/41872
    description: 仅文档弃用。
-->

Type: End-of-Life

此事件已被弃用并移除，因为它不适用于 V8 Promise 组合器，从而降低了其有用性。

### DEP0161: `process._getActiveRequests()` 和 `process._getActiveHandles()`

<!-- YAML
changes:
  - version:
    - v17.6.0
    - v16.15.0
    pr-url: https://github.com/nodejs/node/pull/41587
    description: 仅文档弃用。
-->

Type: Documentation-only

`process._getActiveHandles()` 和 `process._getActiveRequests()` 函数并非 intended 供公开使用，并可能在未来的版本中被移除。

请使用 [`process.getActiveResourcesInfo()`][] 来获取活动资源类型的列表，而不是实际的引用。

### DEP0162: `fs.write()`、`fs.writeFileSync()` 强制转换为字符串

<!-- YAML
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/42796
    description: 生命周期结束。
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/42607
    description: 运行时弃用。
  - version:
    - v17.8.0
    - v16.15.0
    pr-url: https://github.com/nodejs/node/pull/42149
    description: 仅文档弃用。
-->

Type: End-of-Life

在 [`fs.write()`][]、[`fs.writeFile()`][]、[`fs.appendFile()`][]、[`fs.writeFileSync()`][] 和 [`fs.appendFileSync()`][] 中作为第二个参数传递的具有自有 `toString` 属性的对象的隐式强制转换已被弃用。请将它们转换为原始字符串。

### DEP0163: `channel.subscribe(onMessage)`, `channel.unsubscribe(onMessage)`

<!-- YAML
changes:
  - version:
    - v24.8.0
    - v22.20.0
    pr-url: https://github.com/nodejs/node/pull/59758
    description: 弃用已撤销。
  - version:
    - v18.7.0
    - v16.17.0
    pr-url: https://github.com/nodejs/node/pull/42714
    description: 仅文档弃用。
-->

Type: Deprecation revoked

这些方法已被弃用，因为如果用户没有强引用它们，它们的使用可能会使 channel 对象容易被垃圾回收。弃用已被撤销，因为当 channel 有活动订阅者时，channel 对象现在可以抵抗垃圾回收。

### DEP0164: `process.exit(code)`, `process.exitCode` 强制转换为整数

<!-- YAML
changes:
  - version: v20.0.0
    pr-url: https://github.com/nodejs/node/pull/43716
    description: 生命周期结束。
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44711
    description: 运行时弃用。
  - version:
    - v18.10.0
    - v16.18.0
    pr-url: https://github.com/nodejs/node/pull/44714
    description: "`process.exitCode` 整数强制转换的仅文档弃用。"
  - version:
    - v18.7.0
    - v16.17.0
    pr-url: https://github.com/nodejs/node/pull/43738
    description: "`process.exit(code)` 整数强制转换的仅文档弃用。"
-->

Type: End-of-Life

除了 `undefined`、`null`、整数和整数字符串（例如 `'1'`）之外的值，作为 [`process.exit()`][] 中 `code` 参数的值以及分配给 [`process.exitCode`][] 的值已被弃用。

### DEP0165: `--trace-atomics-wait`

<!-- YAML
changes:
  - version: v23.0.0
    pr-url: https://github.com/nodejs/node/pull/52747
    description: 生命周期结束。
  - version: v22.0.0
    pr-url: https://github.com/nodejs/node/pull/51179
    description: 运行时弃用。
  - version:
    - v18.8.0
    - v16.18.0
    pr-url: https://github.com/nodejs/node/pull/44093
    description: 仅文档弃用。
-->

Type: End-of-Life

`--trace-atomics-wait` 标志已被移除，因为它使用了 V8 钩子 `SetAtomicsWaitCallback`，该钩子将在未来的 V8 版本中被移除。

### DEP0166: 导入和导出目标中的双斜杠

<!-- YAML
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44495
    description: 运行时弃用。
  - version: v18.10.0
    pr-url: https://github.com/nodejs/node/pull/44477
    description: "仅文档弃用，支持 `--pending-deprecation`。"
-->

Type: Runtime

包导入和导出目标映射到包含双斜杠（`"/"` 或 `"\\"`）的路径已被弃用，并将在未来的版本中因解析验证错误而失败。此弃用同样适用于以斜杠开头或结尾的模式匹配。

### DEP0167: 弱 `DiffieHellmanGroup` 实例（`modp1`, `modp2`, `modp5`）

<!-- YAML
changes:
  - version:
    - v18.10.0
    - v16.18.0
    pr-url: https://github.com/nodejs/node/pull/44588
    description: 仅文档弃用。
-->

Type: Documentation-only

众所周知的 MODP 组 `modp1`、`modp2` 和 `modp5` 已被弃用，因为它们无法抵御实际攻击。详见 [RFC 8247 第 2.4 节][]。

这些组可能会在未来的 Node.js 版本中被移除。依赖这些组的应用程序应评估使用更强的 MODP 组。

### DEP0168: Node-API 回调中未处理的异常

<!-- YAML
changes:
  - version:
    - v18.3.0
    - v16.17.0
    pr-url: https://github.com/nodejs/node/pull/36510
    description: 运行时弃用。
-->

Type: Runtime

Node-API 回调中未捕获异常的隐式抑制现已弃用。

设置标志 [`--force-node-api-uncaught-exceptions-policy`][] 以强制 Node.js 在 Node-API 回调中未处理异常时发出 [`'uncaughtException'`][] 事件。

### DEP0169: 不安全的 url.parse()

<!-- YAML
changes:
  - version:
      - v24.0.0
    pr-url: https://github.com/nodejs/node/pull/55017
    description: 应用弃用。
  - version:
      - v19.9.0
      - v18.17.0
    pr-url: https://github.com/nodejs/node/pull/47203
    description: "添加了对 `--pending-deprecation` 的支持。"
  - version:
      - v19.0.0
      - v18.13.0
    pr-url: https://github.com/nodejs/node/pull/44919
    description: 仅文档弃用。
-->

Type: Application (non-`node_modules` code only)

[`url.parse()`][] 行为未标准化且容易出错，具有安全隐患。请改用 [WHATWG URL API][]。不会为 `url.parse()` 漏洞发布 CVE。

调用 [`url.format(urlString)`][] 或 [`url.resolve()`][] 会在内部调用 `url.parse()`，因此也受此弃用的约束。

### DEP0170: 使用 `url.parse()` 时端口无效

<!-- YAML
changes:
  - version: v25.0.0
    pr-url: https://github.com/nodejs/node/pull/58617
    description: 生命周期结束。
  - version:
    - v20.0.0
    pr-url: https://github.com/nodejs/node/pull/45526
    description: 运行时弃用。
  - version:
      - v19.2.0
      - v18.13.0
    pr-url: https://github.com/nodejs/node/pull/45576
    description: 仅文档弃用。
-->

Type: End-of-Life

[`url.parse()`][] 过去接受端口不是数字的 URL。此行为可能导致主机名欺骗和意外输入。这些 URL 将抛出错误（[WHATWG URL API][] 也会这样做）。

### DEP0171: `http.IncomingMessage` 标头和尾部的设置器

<!-- YAML
changes:
  - version:
      - v19.3.0
      - v18.13.0
    pr-url: https://github.com/nodejs/node/pull/45697
    description: 仅文档弃用。
-->

Type: Documentation-only

在未来的 Node.js 版本中，[`message.headers`][]、[`message.headersDistinct`][]、[`message.trailers`][] 和 [`message.trailersDistinct`][] 将是只读的。

### DEP0172: `AsyncResource` 绑定函数的 `asyncResource` 属性

<!-- YAML
changes:
  - version: v25.0.0
    pr-url: https://github.com/nodejs/node/pull/58618
    description: 生命周期结束。
  - version: v20.0.0
    pr-url: https://github.com/nodejs/node/pull/46432
    description: 运行时弃用。
-->

Type: End-of-Life

旧版本的 Node.js 会在函数绑定到 `AsyncResource` 时添加 `asyncResource`。现在不再这样做。

### DEP0173: `assert.CallTracker` 类

<!-- YAML
changes:
  - version: v25.0.0
    pr-url: https://github.com/nodejs/node/pull/00000
    description: 生命周期结束。
  - version: v20.1.0
    pr-url: https://github.com/nodejs/node/pull/47740
    description: 运行时弃用。
-->

Type: End-of-Life

`assert.CallTracker` API 已被移除。

### DEP0174: 对返回 `Promise` 的函数调用 `promisify`

<!-- YAML
changes:
  - version: v21.0.0
    pr-url: https://github.com/nodejs/node/pull/49609
    description: 运行时弃用。
  - version: v20.8.0
    pr-url: https://github.com/nodejs/node/pull/49647
    description: 仅文档弃用。
-->

Type: Runtime

对返回 `Promise` 的函数调用 [`util.promisify`][] 将忽略该 Promise 的结果，这可能导致未处理的 Promise 拒绝。

### DEP0175: `util.toUSVString`

<!-- YAML
changes:
  - version: v20.8.0
    pr-url: https://github.com/nodejs/node/pull/49725
    description: 仅文档弃用。
-->

Type: Documentation-only

[`util.toUSVString()`][] API 已弃用。请改用 [`String.prototype.toWellFormed`][]。

### DEP0176: `fs.F_OK`, `fs.R_OK`, `fs.W_OK`, `fs.X_OK`

<!-- YAML
changes:
  - version: v25.0.0
    pr-url: https://github.com/nodejs/node/pull/55862
    description: 生命周期结束。
  - version: v24.0.0
    pr-url: https://github.com/nodejs/node/pull/49686
    description: 运行时弃用。
  - version: v20.8.0
    pr-url: https://github.com/nodejs/node/pull/49683
    description: 仅文档弃用。
-->

Type: End-of-Life

直接暴露在 `node:fs` 上的 `F_OK`、`R_OK`、`W_OK` 和 `X_OK` 获取器已被移除。请改为从 `fs.constants` 或 `fs.promises.constants` 获取它们。

提供自动迁移工具 ([源码](https://github.com/nodejs/userland-migrations/tree/main/recipes/fs-access-mode-constants))：

```bash
npx codemod@latest @nodejs/fs-access-mode-constants
```

### DEP0177: `util.types.isWebAssemblyCompiledModule`

<!-- YAML
changes:
  - version:
    - v21.7.0
    - v20.12.0
    pr-url: https://github.com/nodejs/node/pull/51442
    description: 生命周期结束。
  - version:
    - v21.3.0
    - v20.11.0
    pr-url: https://github.com/nodejs/node/pull/50486
    description: 已分配弃用代码。
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/32116
    description: 仅文档弃用。
-->

Type: End-of-Life

`util.types.isWebAssemblyCompiledModule` API 已被移除。请改用 `value instanceof WebAssembly.Module`。

### DEP0178: `dirent.path`

<!-- YAML
changes:
  - version: v24.0.0
    pr-url: https://github.com/nodejs/node/pull/55548
    description: 生命周期结束。
  - version: v23.0.0
    pr-url: https://github.com/nodejs/node/pull/51050
    description: 运行时弃用。
  - version:
    - v21.5.0
    - v20.12.0
    - v18.20.0
    pr-url: https://github.com/nodejs/node/pull/51020
    description: 仅文档弃用。
-->

Type: End-of-Life

`dirent.path` 属性已被移除，因为其在发布版本之间缺乏一致性。请改用 [`dirent.parentPath`][]。

提供自动迁移工具 ([源码](https://github.com/nodejs/userland-migrations/tree/main/recipes/dirent-path-to-parent-path)）：

```bash
npx codemod@latest @nodejs/dirent-path-to-parent-path
```

### DEP0179: `Hash` 构造函数

<!-- YAML
changes:
  - version: v22.0.0
    pr-url: https://github.com/nodejs/node/pull/51880
    description: 运行时弃用。
  - version:
    - v21.5.0
    - v20.12.0
    pr-url: https://github.com/nodejs/node/pull/51077
    description: 仅文档弃用。
-->

Type: Runtime

直接使用 `Hash()` 或 `new Hash()` 调用 `Hash` 类已被弃用，因为它是内部实现，不 intended 供公开使用。请使用 [`crypto.createHash()`][] 方法来创建 Hash 实例。

### DEP0180: `fs.Stats` 构造函数

<!-- YAML
changes:
  - version: v22.0.0
    pr-url: https://github.com/nodejs/node/pull/52067
    description: 运行时弃用。
  - version: v20.13.0
    pr-url: https://github.com/nodejs/node/pull/51879
    description: 仅文档弃用。
-->

Type: Runtime

直接使用 `Stats()` 或 `new Stats()` 调用 `fs.Stats` 类已被弃用，因为它是内部实现，不 intended 供公开使用。

### DEP0181: `Hmac` 构造函数

<!-- YAML
changes:
  - version: v22.0.0
    pr-url: https://github.com/nodejs/node/pull/52071
    description: 运行时弃用。
  - version: v20.13.0
    pr-url: https://github.com/nodejs/node/pull/51881
    description: 仅文档弃用。
-->

Type: Runtime

直接使用 `Hmac()` 或 `new Hmac()` 调用 `Hmac` 类已被弃用，因为它是内部实现，不 intended 供公开使用。请使用 [`crypto.createHmac()`][] 方法来创建 Hmac 实例。

### DEP0182: 没有显式 `authTagLength` 的短 GCM 认证标签

<!-- YAML
changes:
  - version: v26.0.0
    pr-url: https://github.com/nodejs/node/pull/61084
    description: 生命周期结束。
  - version: v23.0.0
    pr-url: https://github.com/nodejs/node/pull/52552
    description: 运行时弃用。
  - version: v20.13.0
    pr-url: https://github.com/nodejs/node/pull/52345
    description: 仅文档弃用。
-->

Type: End-of-Life

对于 GCM 模式的密码，[`decipher.setAuthTag()`][] 函数过去接受任何有效长度的认证标签（另见 [DEP0090](#DEP0090)）。此例外已被移除，以便更好地符合 [NIST SP 800-38D][] 的建议，打算使用短于默认认证标签长度（即短于 AES-GCM 的 16 字节）的认证标签的应用程序必须显式地将 [`crypto.createDecipheriv()`][] 函数的 `authTagLength` 选项设置为适当的长度。

### DEP0183: 基于 OpenSSL 引擎的 API

<!-- YAML
changes:
  - version:
    - v22.4.0
    - v20.16.0
    pr-url: https://github.com/nodejs/node/pull/53329
    description: 仅文档弃用。
-->

Type: Documentation-only

OpenSSL 3 已弃用对自定义引擎的支持，并建议切换到其新的提供者模型。`https.request()`、[`tls.createSecureContext()`][] 和 [`tls.createServer()`][] 的 `clientCertEngine` 选项；[`tls.createSecureContext()`][] 的 `privateKeyEngine` 和 `privateKeyIdentifier`；以及 [`crypto.setEngine()`][] 都依赖于 OpenSSL 的此功能。

### DEP0184: 实例化 `node:zlib` 类时不使用 `new`

<!-- YAML
changes:
  - version: v24.0.0
    pr-url: https://github.com/nodejs/node/pull/55718
    description: 运行时弃用。
  - version:
    - v22.9.0
    - v20.18.0
    pr-url: https://github.com/nodejs/node/pull/54708
    description: 仅文档弃用。
-->

Type: Runtime

实例化 `node:zlib` 模块导出的类时不使用 `new` 限定符已被弃用。建议改用 `new` 限定符。这适用于所有 Zlib 类，例如 `Deflate`、`DeflateRaw`、`Gunzip`、`Inflate`、`InflateRaw`、`Unzip` 和 `Zlib`。

### DEP0185: 实例化 `node:repl` 类时不使用 `new`

<!-- YAML
changes:
  - version: v25.0.0
    pr-url: https://github.com/nodejs/node/pull/59495
    description: 生命周期结束。
  - version: v24.0.0
    pr-url: https://github.com/nodejs/node/pull/54869
    description: 运行时弃用。
  - version:
    - v22.9.0
    - v20.18.0
    pr-url: https://github.com/nodejs/node/pull/54842
    description: 仅文档弃用。
-->

Type: End-of-Life

实例化 `node:repl` 模块导出的类时不使用 `new` 限定符已被弃用。必须改用 `new` 限定符。这适用于所有 REPL 类，包括 `REPLServer` 和 `Recoverable`。

提供自动迁移工具 ([源码](https://github.com/nodejs/userland-migrations/tree/main/recipes/repl-classes-with-new)）：

```bash
npx codemod@latest @nodejs/repl-classes-with-new
```

<!-- md-lint skip-deprecation DEP0186 -->

### DEP0187: 传递无效参数类型给 `fs.existsSync`

<!-- YAML
changes:
  - version: v24.0.0
    pr-url: https://github.com/nodejs/node/pull/55753
    description: 运行时弃用。
  - version:
    - v23.4.0
    - v22.13.0
    - v20.19.3
    pr-url: https://github.com/nodejs/node/pull/55892
    description: 仅文档。
-->

Type: Runtime

传递不支持的参数类型已被弃用，并且在未来的版本中将抛出错误，而不是返回 `false`。

### DEP0188: `process.features.ipv6` 和 `process.features.uv`

<!-- YAML
changes:
  - version:
    - v23.4.0
    - v22.13.0
    pr-url: https://github.com/nodejs/node/pull/55545
    description: 仅文档弃用。
-->

Type: Documentation-only

这些属性无条件为 `true`。基于这些属性的任何检查都是多余的。

### DEP0189: `process.features.tls_*`

<!-- YAML
changes:
  - version:
    - v23.4.0
    - v22.13.0
    pr-url: https://github.com/nodejs/node/pull/55545
    description: 仅文档弃用。
-->

Type: Documentation-only

`process.features.tls_alpn`、`process.features.tls_ocsp` 和 `process.features.tls_sni` 已弃用，因为它们的值保证与 `process.features.tls` 的值相同。

### DEP0190: 传递 `args` 给 `node:child_process` `execFile`/`spawn` 并使用 `shell` 选项

<!-- YAML
changes:
  - version: v24.0.0
    pr-url: https://github.com/nodejs/node/pull/57199
    description: 运行时弃用。
  - version:
    - v23.11.0
    - v22.15.0
    pr-url: https://github.com/nodejs/node/pull/57389
    description: 仅文档弃用。
-->

Type: Runtime

当将 `args` 数组传递给 [`child_process.execFile`][] 或 [`child_process.spawn`][] 并带有选项 `{ shell: true }` 或 `{ shell: '/path/to/shell' }` 时，值不会被转义，仅以空格分隔，这可能导致 Shell 注入。

### DEP0191: `repl.builtinModules`

<!-- YAML
changes:
  - version:
     - v24.0.0
     - v22.16.0
    pr-url: https://github.com/nodejs/node/pull/57508
    description: "仅文档弃用，支持 `--pending-deprecation`。"
-->

Type: Documentation-only (supports [`--pending-deprecation`][])

`node:repl` 模块导出一个 `builtinModules` 属性，其中包含内置模块数组。这是不完整的，并且匹配已弃用的 `repl._builtinLibs` ([DEP0142][])，最好依赖 `require('node:module').builtinModules`。

提供自动迁移工具 ([源码](https://github.com/nodejs/userland-migrations/tree/main/recipes/repl-builtin-modules))：

```bash
npx codemod@latest @nodejs/repl-builtin-modules
```

### DEP0192: `require('node:_tls_common')` 和 `require('node:_tls_wrap')`

<!-- YAML
changes:
  - version:
      - v24.2.0
      - v22.17.0
      - v20.19.6
    pr-url: https://github.com/nodejs/node/pull/57643
    description: 运行时弃用。
-->

Type: Runtime

`node:_tls_common` 和 `node:_tls_wrap` 模块已弃用，因为它们应被视为内部 nodejs 实现而不是公开 API，请改用 `node:tls`。

### DEP0193: `require('node:_stream_*')`

<!-- YAML
changes:
  - version: v26.0.0
    pr-url: https://github.com/nodejs/node/pull/60657
    description: 生命周期结束。
  - version:
      - v24.2.0
      - v22.17.0
      - v20.19.6
    pr-url: https://github.com/nodejs/node/pull/58337
    description: 运行时弃用。
-->

Type: End-of-Life

`node:_stream_duplex`、`node:_stream_passthrough`、`node:_stream_readable`、`node:_stream_transform`、`node:_stream_wrap` 和 `node:_stream_writable` 模块已弃用，因为它们应被视为内部 nodejs 实现而不是公开 API，请改用 `node:stream`。

### DEP0194: HTTP/2 优先级信令

<!-- YAML
changes:
  - version: v24.2.0
    pr-url: https://github.com/nodejs/node/pull/58293
    description: 生命周期结束。
  - version:
      - v24.2.0
      - v22.17.0
      - v20.19.6
    pr-url: https://github.com/nodejs/node/pull/58313
    description: 仅文档弃用。
-->

Type: End-of-Life

对在 [RFC 9113][] 中弃用的优先级信令的支持已被移除。

### DEP0195: 实例化 `node:http` 类时不使用 `new`

<!-- YAML
changes:
  - version:
      - v24.2.0
      - v22.17.0
    pr-url: https://github.com/nodejs/node/pull/58518
    description: 仅文档弃用。
-->

Type: Documentation-only

实例化 `node:http` 模块导出的类时不使用 `new` 限定符已被弃用。建议改用 `new` 限定符。这适用于所有 http 类，例如 `OutgoingMessage`、`IncomingMessage`、`ServerResponse` 和 `ClientRequest`。

提供自动迁移工具 ([源码](https://github.com/nodejs/userland-migrations/tree/main/recipes/http-classes-with-new))：

```bash
npx codemod@latest @nodejs/http-classes-with-new
```

### DEP0196: 调用 `node:child_process` 函数时 `options.shell` 为空字符串

<!-- YAML
changes:
  - version:
      - v24.2.0
      - v22.17.0
    pr-url: https://github.com/nodejs/node/pull/58564
    description: 仅文档弃用。
-->

Type: Documentation-only

使用 `{ shell: '' }` 调用进程生成函数几乎肯定是有意的，并且可能导致异常行为。

要使 [`child_process.execFile`][] 或 [`child_process.spawn`][] 调用默认 shell，请使用 `{ shell: true }`。如果意图是不调用 shell（默认行为），要么省略 `shell` 选项，要么将其设置为 `false` 或 nullish 值。

要使 [`child_process.exec`][] 调用默认 shell，要么省略 `shell` 选项，要么将其设置为 nullish 值。如果意图是不调用 shell，请改用 [`child_process.execFile`][]。

### DEP0197: `util.types.isNativeError()`

<!-- YAML
changes:
  - version:
    - v24.2.0
    pr-url: https://github.com/nodejs/node/pull/58262
    description: 仅文档弃用。
-->

Type: Documentation-only

[`util.types.isNativeError`][] API 已弃用。请改用 [`Error.isError`][]。

提供自动迁移工具 ([源码](https://github.com/nodejs/userland-migrations/tree/main/recipes/types-is-native-error))：

```bash
npx codemod@latest @nodejs/types-is-native-error
```

### DEP0198: 创建 SHAKE-128 和 SHAKE-256 摘要时没有显式 `options.outputLength`

<!-- YAML
changes:
  - version: v25.0.0
    pr-url: https://github.com/nodejs/node/pull/59008
    description: 运行时弃用。
  - version:
      - v24.4.0
      - v22.18.0
      - v20.19.5
    pr-url: https://github.com/nodejs/node/pull/58942
    description: "仅文档弃用，支持 `--pending-deprecation`。"
-->

Type: Runtime

创建 SHAKE-128 和 SHAKE-256 摘要时没有显式 `options.outputLength` 已被弃用。

### DEP0199: `require('node:_http_*')`

<!-- YAML
changes:
  - version:
     - v24.6.0
     - v22.19.0
    pr-url: https://github.com/nodejs/node/pull/59293
    description: 仅文档弃用。
-->

Type: Documentation-only

`node:_http_agent`、`node:_http_client`、`node:_http_common`、`node:_http_incoming`、`node:_http_outgoing` 和 `node:_http_server` 模块已弃用，因为它们应被视为内部 nodejs 实现而不是公开 API，请改用 `node:http`。

### DEP0200: 垃圾回收时关闭 fs.Dir

<!-- YAML
changes:
  - version: v24.9.0
    pr-url: https://github.com/nodejs/node/pull/59839
    description: 仅文档弃用。
-->

Type: Documentation-only

允许 [`fs.Dir`][] 对象在垃圾回收时关闭已被弃用。在未来，这样做可能会导致抛出错误并终止进程。

请确保所有 `fs.Dir` 对象都使用 `Dir.prototype.close()` 或 `using` 关键字显式关闭：

```mjs
import { opendir } from 'node:fs/promises';

{
  await using dir = await opendir('/async/disposable/directory');
} // 由 dir[Symbol.asyncDispose]() 关闭

{
  using dir = await opendir('/sync/disposable/directory');
} // 由 dir[Symbol.dispose]() 关闭

{
  const dir = await opendir('/unconditionally/iterated/directory');
  for await (const entry of dir) {
    // 处理条目
  } // 由迭代器关闭
}

{
  let dir;
  try {
    dir = await opendir('/legacy/closeable/directory');
  } finally {
    await dir?.close();
  }
}
```

### DEP0201: 传递 `options.type` 给 `Duplex.toWeb()`

<!-- YAML
changes:
  - version: v26.0.0
    pr-url: https://github.com/nodejs/node/pull/62173
    description: 运行时弃用。
  - version:
     - v25.7.0
     - v24.15.0
    pr-url: https://github.com/nodejs/node/pull/61632
    description: 仅文档弃用。
-->

Type: Runtime

传递 `type` 选项给 [`Duplex.toWeb()`][] 已被弃用。要指定构造的可读 - 可写对的可读部分的类型，请改用 `readableType` 选项。

### DEP0202: HTTP/2 服务器的 `Http1IncomingMessage` 和 `Http1ServerResponse` 选项

<!-- YAML
changes:
  - version:
     - v25.7.0
     - v24.15.0
    pr-url: https://github.com/nodejs/node/pull/61713
    description: 仅文档弃用。
-->

Type: Documentation-only

[`http2.createServer()`][] 和 [`http2.createSecureServer()`][] 的 `Http1IncomingMessage` 和 `Http1ServerResponse` 选项已弃用。请改用 `http1Options.IncomingMessage` 和 `http1Options.ServerResponse`。

```cjs
// 已弃用
const server = http2.createSecureServer({
  allowHTTP1: true,
  Http1IncomingMessage: MyIncomingMessage,
  Http1ServerResponse: MyServerResponse,
});
```

```cjs
// 请改用此项
const server = http2.createSecureServer({
  allowHTTP1: true,
  http1Options: {
    IncomingMessage: MyIncomingMessage,
    ServerResponse: MyServerResponse,
  },
});
```

### DEP0203: 传递 `CryptoKey` 给 `node:crypto` API

<!-- YAML
changes:
  - version: v26.0.0
    pr-url: https://github.com/nodejs/node/pull/62453
    description: 运行时弃用。
  - version:
     - v25.9.0
     - v24.15.0
    pr-url: https://github.com/nodejs/node/pull/62321
    description: 仅文档弃用。
-->

Type: Runtime

传递 [`CryptoKey`][] 给 `node:crypto` 函数已被弃用，并将在未来的版本中抛出错误。这包括 [`crypto.createPublicKey()`][]、[`crypto.createPrivateKey()`][]、[`crypto.sign()`][]、[`crypto.verify()`][]、[`crypto.publicEncrypt()`][]、[`crypto.publicDecrypt()`][]、[`crypto.privateEncrypt()`][]、[`crypto.privateDecrypt()`][]、[`Sign.prototype.sign()`][]、[`Verify.prototype.verify()`][]、[`crypto.createHmac()`][]、[`crypto.createCipheriv()`][]、[`crypto.createDecipheriv()`][]、[`crypto.encapsulate()`][] 和 [`crypto.decapsulate()`][]。

### DEP0204: `KeyObject.from()` 与不可提取的 `CryptoKey`

<!-- YAML
changes:
  - version: v26.0.0
    pr-url: https://github.com/nodejs/node/pull/62453
    description: 运行时弃用。
  - version:
     - v25.9.0
     - v24.15.0
    pr-url: https://github.com/nodejs/node/pull/62321
    description: 仅文档弃用。
-->

Type: Runtime

传递不可提取的 [`CryptoKey`][] 给 [`KeyObject.from()`][] 已被弃用，并将在未来的版本中抛出错误。

### DEP0205: `module.register()`

<!-- YAML
changes:
  - version: v26.0.0
    pr-url: https://github.com/nodejs/node/pull/62401
    description: 运行时弃用。
  - version:
     - v25.9.0
     - v24.15.0
    pr-url: https://github.com/nodejs/node/pull/62395
    description: 仅文档弃用。
-->

Type: Runtime

[`module.register()`][] 已弃用。请改用 [`module.registerHooks()`][]。

`module.register()` API 提供离线异步钩子用于自定义 ES 模块；`module.registerHooks()` API 提供类似的同步、线程内钩子，并适用于所有类型的模块。
支持异步钩子已被证明是复杂的，涉及 worker 线程协调，并且存在无法解决的问题。详见 [异步自定义钩子的注意事项][]。请尽快迁移到 `module.registerHooks()`，因为 `module.register()` 将在未来的 Node.js 版本中被移除。

### DEP0206: 在已完成最终化的 `Hmac` 实例上调用 `digest()`

<!-- YAML
changes:
  - version: v26.2.0
    pr-url: https://github.com/nodejs/node/pull/63121
    description: 仅文档弃用。
-->

Type: Documentation-only

多次调用 `hmac.digest()` 会返回一个空缓冲区，而不是抛出错误。此行为与 `hash.digest()` 不一致，并可能导致隐蔽的错误。在已完成最终化的 `Hmac` 实例上调用 `hmac.digest()` 将在未来版本中抛出错误。

[DEP0142]: #dep0142-repl_builtinlibs
[NIST SP 800-38D]: https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38d.pdf
[RFC 6066]: https://tools.ietf.org/html/rfc6066#section-3
[RFC 8247 第 2.4 节]: https://www.rfc-editor.org/rfc/rfc8247#section-2.4
[RFC 9113]: https://datatracker.ietf.org/doc/html/rfc9113#section-5.3.1
[WHATWG URL API]: url.md#the-whatwg-url-api
[`"exports"` 或 `"main"` 入口]: packages.md#main-entry-point-export
[`'uncaughtException'`]: process.md#event-uncaughtexception
[`--force-node-api-uncaught-exceptions-policy`]: cli.md#--force-node-api-uncaught-exceptions-policy
[`--pending-deprecation`]: cli.md#--pending-deprecation
[`--throw-deprecation`]: cli.md#--throw-deprecation
[`--unhandled-rejections`]: cli.md#--unhandled-rejectionsmode
[`Buffer.allocUnsafeSlow(size)`]: buffer.md#static-method-bufferallocunsafeslowsize
[`Buffer.from(array)`]: buffer.md#static-method-bufferfromarray
[`Buffer.from(buffer)`]: buffer.md#static-method-bufferfrombuffer
[`Buffer.isBuffer()`]: buffer.md#static-method-bufferisbufferobj
[`Cipheriv`]: crypto.md#class-cipheriv
[`CryptoKey`]: webcrypto.md#class-cryptokey
[`Decipheriv`]: crypto.md#class-decipheriv
[`Duplex.toWeb()`]: stream.md#streamduplextowebstreamduplex-options
[`Error.isError`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/isError
[`KeyObject.from()`]: crypto.md#static-method-keyobjectfromkey
[`REPLServer.clearBufferedCommand()`]: repl.md#replserverclearbufferedcommand
[`ReadStream.open()`]: fs.md#class-fsreadstream
[`Server.getConnections()`]: net.md#servergetconnectionscallback
[`Server.listen({fd: <number>})`]: net.md#serverlistenhandle-backlog-callback
[`Sign.prototype.sign()`]: crypto.md#signsignprivatekey-outputencoding
[`String.prototype.toWellFormed`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toWellFormed
[`Verify.prototype.verify()`]: crypto.md#verifyverifyobject-signature-signatureencoding
[`WriteStream.open()`]: fs.md#class-fswritestream
[`assert`]: assert.md
[`asyncResource.runInAsyncScope()`]: async_context.md#asyncresourceruninasyncscopefn-thisarg-args
[`buffer.subarray`]: buffer.md#bufsubarraystart-end
[`child_process.execFile`]: child_process.md#child_processexecfilefile-args-options-callback
[`child_process.exec`]: child_process.md#child_processexeccommand-options-callback
[`child_process.spawn`]: child_process.md#child_processspawncommand-args-options
[`child_process`]: child_process.md
[`clearInterval()`]: timers.md#clearintervaltimeout
[`clearTimeout()`]: timers.md#cleartimeouttimeout
[`console.error()`]: console.md#consoleerrordata-args
[`console.log()`]: console.md#consolelogdata-args
[`crypto.Certificate()` 构造函数]: crypto.md#legacy-api
[`crypto.createCipheriv()`]: crypto.md#cryptocreatecipherivalgorithm-key-iv-options
[`crypto.createDecipheriv()`]: crypto.md#cryptocreatedecipherivalgorithm-key-iv-options
[`crypto.createHash()`]: crypto.md#cryptocreatehashalgorithm-options
[`crypto.createHmac()`]: crypto.md#cryptocreatehmacalgorithm-key-options
[`crypto.createPrivateKey()`]: crypto.md#cryptocreateprivatekeykey
[`crypto.createPublicKey()`]: crypto.md#cryptocreatepublickeykey
[`crypto.decapsulate()`]: crypto.md#cryptodecapsulatekey-ciphertext-callback
[`crypto.encapsulate()`]: crypto.md#cryptoencapsulatekey-callback
[`crypto.fips`]: crypto.md#cryptofips
[`crypto.pbkdf2()`]: crypto.md#cryptopbkdf2password-salt-iterations-keylen-digest-callback
[`crypto.privateDecrypt()`]: crypto.md#cryptoprivatedecryptprivatekey-buffer
[`crypto.privateEncrypt()`]: crypto.md#cryptoprivateencryptprivatekey-buffer
[`crypto.publicDecrypt()`]: crypto.md#cryptopublicdecryptkey-buffer
[`crypto.publicEncrypt()`]: crypto.md#cryptopublicencryptkey-buffer
[`crypto.randomBytes()`]: crypto.md#cryptorandombytessize-callback
[`crypto.scrypt()`]: crypto.md#cryptoscryptpassword-salt-keylen-options-callback
[`crypto.setEngine()`]: crypto.md#cryptosetengineengine-flags
[`crypto.sign()`]: crypto.md#cryptosignalgorithm-data-key-callback
[`crypto.verify()`]: crypto.md#cryptoverifyalgorithm-data-key-signature-callback
[`decipher.final()`]: crypto.md#decipherfinaloutputencoding
[`decipher.setAuthTag()`]: crypto.md#deciphersetauthtagbuffer-encoding
[`dirent.parentPath`]: fs.md#direntparentpath
[`dns.lookup()`]: dns.md#dnslookuphostname-options-callback
[`dnsPromises.lookup()`]: dns.md#dnspromiseslookuphostname-options
[`domain`]: domain.md
[`ecdh.setPublicKey()`]: crypto.md#ecdhsetpublickeypublickey-encoding
[`emitter.listenerCount(eventName)`]: events.md#emitterlistenercounteventname-listener
[`events.listenerCount(emitter, eventName)`]: events.md#eventslistenercountemitterortarget-eventname
[`fs.Dir`]: fs.md#class-fsdir
[`fs.FileHandle`]: fs.md#class-filehandle
[`fs.access()`]: fs.md#fsaccesspath-mode-callback
[`fs.appendFile()`]: fs.md#fsappendfilepath-data-options-callback
[`fs.appendFileSync()`]: fs.md#fsappendfilesyncpath-data-options
[`fs.createReadStream()`]: fs.md#fscreatereadstreampath-options
[`fs.createWriteStream()`]: fs.md#fscreatewritestreampath-options
[`fs.exists(path, callback)`]: fs.md#fsexistspath-callback
[`fs.lchmod(path, mode, callback)`]: fs.md#fslchmodpath-mode-callback
[`fs.lchmodSync(path, mode)`]: fs.md#fslchmodsyncpath-mode
[`fs.lchown(path, uid, gid, callback)`]: fs.md#fslchownpath-uid-gid-callback
[`fs.lchownSync(path, uid, gid)`]: fs.md#fslchownsyncpath-uid-gid
[`fs.read()`]: fs.md#fsreadfd-buffer-offset-length-position-callback
[`fs.readSync()`]: fs.md#fsreadsyncfd-buffer-offset-length-position
[`fs.stat()`]: fs.md#fsstatpath-options-callback
[`fs.write()`]: fs.md#fswritefd-buffer-offset-length-position-callback
[`fs.writeFile()`]: fs.md#fswritefilefile-data-options-callback
[`fs.writeFileSync()`]: fs.md#fswritefilesyncfile-data-options
[`http.ClientRequest`]: http.md#class-httpclientrequest
[`http.IncomingMessage`]: http.md#class-httpincomingmessage
[`http.ServerResponse`]: http.md#class-httpserverresponse
[`http.get()`]: http.md#httpgetoptions-callback
[`http.request()`]: http.md#httprequestoptions-callback
[`http2.createSecureServer()`]: http2.md#http2createsecureserveroptions-onrequesthandler
[`http2.createServer()`]: http2.md#http2createserveroptions-onrequesthandler
[`https.get()`]: https.md#httpsgetoptions-callback
[`https.request()`]: https.md#httpsrequestoptions-callback
[`message.connection`]: http.md#messageconnection
[`message.headersDistinct`]: http.md#messageheadersdistinct
[`message.headers`]: http.md#messageheaders
[`message.socket`]: http.md#messagesocket
[`message.trailersDistinct`]: http.md#messagetrailersdistinct
[`message.trailers`]: http.md#messagetrailers
[`module.createRequire()`]: module.md#modulecreaterequirefilename
[`module.register()`]: module.md#moduleregisterspecifier-parenturl-options
[`module.registerHooks()`]: module.md#moduleregisterhooksoptions
[`os.networkInterfaces()`]: os.md#osnetworkinterfaces
[`os.tmpdir()`]: os.md#ostmpdir
[`process.env`]: process.md#processenv
[`process.exit()`]: process.md#processexitcode
[`process.exitCode`]: process.md#processexitcode_1
[`process.getActiveResourcesInfo()`]: process.md#processgetactiveresourcesinfo
[`process.mainModule`]: process.md#processmainmodule
[`punycode`]: punycode.md
[`readable.readableEnded`]: stream.md#readablereadableended
[`request.abort()`]: http.md#requestabort
[`request.connection`]: http.md#requestconnection
[`request.destroy()`]: http.md#requestdestroyerror
[`request.socket`]: http.md#requestsocket
[`require.extensions`]: modules.md#requireextensions
[`require.main`]: modules.md#accessing-the-main-module
[`response.connection`]: http.md#responseconnection
[`response.end()`]: http.md#responseenddata-encoding-callback
[`response.finished`]: http.md#responsefinished
[`response.socket`]: http.md#responsesocket
[`response.writableEnded`]: http.md#responsewritableended
[`response.writableFinished`]: http.md#responsewritablefinished
[`script.createCachedData()`]: vm.md#scriptcreatecacheddata
[`setInterval()`]: timers.md#setintervalcallback-delay-args
[`setTimeout()`]: timers.md#settimeoutcallback-delay-args
[`socket.bufferSize`]: net.md#socketbuffersize
[`timeout.ref()`]: timers.md#timeoutref
[`timeout.refresh()`]: timers.md#timeoutrefresh
[`timeout.unref()`]: timers.md#timeoutunref
[`tls.SecureContext`]: tls.md#tlscreatesecurecontextoptions
[`tls.TLSSocket`]: tls.md#class-tlstlssocket
[`tls.checkServerIdentity()`]: tls.md#tlscheckserveridentityhostname-cert
[`tls.createSecureContext()`]: tls.md#tlscreatesecurecontextoptions
[`tls.createServer()`]: tls.md#tlscreateserveroptions-secureconnectionlistener
[`url.format()`]: url.md#urlformaturlobject
[`url.format(urlString)`]: url.md#urlformaturlstring
[`url.parse()`]: url.md#urlparseurlstring-parsequerystring-slashesdenotehost
[`url.resolve()`]: url.md#urlresolvefrom-to
[`util._extend()`]: util.md#util_extendtarget-source
[`util.getSystemErrorName()`]: util.md#utilgetsystemerrornameerr
[`util.inspect()`]: util.md#utilinspectobject-options
[`util.inspect.custom`]: util.md#utilinspectcustom
[`util.isArray()`]: util.md#utilisarrayobject
[`util.promisify`]: util.md#utilpromisifyoriginal
[`util.toUSVString()`]: util.md#utiltousvstringstring
[`util.types.isNativeError`]: util.md#utiltypesisnativeerrorvalue
[`util.types`]: util.md#utiltypes
[`util`]: util.md
[`worker.exitedAfterDisconnect`]: cluster.md#workerexitedafterdisconnect
[`worker.terminate()`]: worker_threads.md#workerterminate
[`writable.writableLength`]: stream.md#writablewritablelength
[`zlib.bytesWritten`]: zlib.md#zlibbyteswritten
[alloc]: buffer.md#static-method-bufferallocsize-fill-encoding
[alloc_unsafe_size]: buffer.md#static-method-bufferallocunsafesize
[异步自定义钩子的注意事项]: module.md#caveats-of-asynchronous-customization-hooks
[from_arraybuffer]: buffer.md#static-method-bufferfromarraybuffer-byteoffset-length
[from_string_encoding]: buffer.md#static-method-bufferfromstring-encoding
[legacy URL API]: url.md#legacy-url-api
[legacy `urlObject`]: url.md#legacy-urlobject
[permission model]: permissions.md#permission-model
[`crypto.Certificate()` 的静态方法]: crypto.md#class-certificate
[subpath exports]: packages.md#subpath-exports
[subpath imports]: packages.md#subpath-imports
[subpath patterns]: packages.md#subpath-patterns
