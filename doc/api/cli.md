# 命令行 API

<!--introduced_in=v5.9.1-->

<!--type=misc-->

Node.js 附带各种命令行选项。这些选项提供了内置的调试功能、多种执行脚本的方式以及其他有用的运行时选项。

若要在终端中将此文档查看为手册页，请运行 `man node`。

## 概要

`node [options] [V8 options] [<program-entry-point> | -e "script" | -] [--] [arguments]`

`node inspect [<program-entry-point> | -e "script" | <host>:<port>] …`

`node --v8-options`

不带参数执行以启动 [REPL][]。

有关 `node inspect` 的更多信息，请参阅 [debugger][] 文档。

## 程序入口点

程序入口点是一个类似说明符的字符串。如果该字符串不是绝对路径，则它会从当前工作目录解析为相对路径。然后，该入口点字符串的解析方式就好像它是从当前工作目录通过 `require()` 请求的一样。如果找不到相应的文件，则会抛出错误。

默认情况下，解析后的路径的加载方式也好像它是通过 `require()` 请求的，除非适用以下条件之一——那么它的加载方式就好像它是通过 `import()` 请求的：

* 程序的启动使用了强制通过 ECMAScript 模块加载器加载入口点的命令行标志，例如 `--import`。
* 文件的扩展名为 `.mjs`、`.mts` 或 `.wasm`。
* 文件没有 `.cjs` 扩展名，并且最近的父级 `package.json` 文件包含值为 `"module"` 的顶层 [`"type"`][] 字段。

有关更多详细信息，请参阅 [module resolution and loading][]。

## 选项

<!-- YAML
changes:
  - version: v10.12.0
    pr-url: https://github.com/nodejs/node/pull/23020
    description: "现在允许使用下划线代替连字符，除了 V8 选项外，也适用于 Node.js 选项。"
-->

> 稳定性：2 - 稳定

所有选项（包括 V8 选项）都允许单词之间使用连字符（`-`）或下划线（`_`）分隔。例如，`--pending-deprecation` 等同于 `--pending_deprecation`。

如果传递了多次接受单个值的选项（例如 `--max-http-header-size`），则使用最后传递的值。命令行选项优先于通过 [`NODE_OPTIONS`][] 环境变量传递的选项。

### `-`

<!-- YAML
added: v8.0.0
-->

stdin 的别名。类似于其他命令行实用程序中对 `-` 的使用，意味着脚本从 stdin 读取，其余选项传递给该脚本。

### `--`

<!-- YAML
added: v6.11.0
-->

表示 node 选项的结束。将其余参数传递给脚本。如果在此之前没有提供脚本文件名或 eval/print 脚本，则下一个参数将用作脚本文件名。

### `--abort-on-uncaught-exception`

<!-- YAML
added: v0.10.8
-->

中止而不是退出会导致生成核心文件，以便使用调试器（如 `lldb`、`gdb` 和 `mdb`）进行事后分析。

如果传递了此标志，仍然可以通过 [`process.setUncaughtExceptionCaptureCallback()`][]（以及通过使用它的 `node:domain` 模块）将行为设置为不中止。

### `--allow-addons`

<!-- YAML
added:
  - v21.6.0
  - v20.12.0
-->

> 稳定性：1.1 - 积极开发中

当使用 [Permission Model][] 时，进程默认将无法使用原生插件。
除非用户在启动 Node.js 时显式传递 `--allow-addons` 标志，否则尝试这样做将抛出 `ERR_DLOPEN_DISABLED`。

示例：

```cjs
// 尝试 require 一个原生插件
require('nodejs-addon-example');
```

```console
$ node --permission --allow-fs-read=* index.js
node:internal/modules/cjs/loader:1319
  return process.dlopen(module, path.toNamespacedPath(filename));
                 ^

Error: Cannot load native addon because loading addons is disabled.
    at Module._extensions..node (node:internal/modules/cjs/loader:1319:18)
    at Module.load (node:internal/modules/cjs/loader:1091:32)
    at Module._load (node:internal/modules/cjs/loader:938:12)
    at Module.require (node:internal/modules/cjs/loader:1115:19)
    at require (node:internal/modules/helpers:130:18)
    at Object.<anonymous> (/home/index.js:1:15)
    at Module._compile (node:internal/modules/cjs/loader:1233:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1287:10)
    at Module.load (node:internal/modules/cjs/loader:1091:32)
    at Module._load (node:internal/modules/cjs/loader:938:12) {
  code: 'ERR_DLOPEN_DISABLED'
}
```

### `--allow-child-process`

<!-- YAML
added: v20.0.0
changes:
  - version:
      - v24.4.0
      - v22.18.0
    pr-url: https://github.com/nodejs/node/pull/58853
    description: "当在启用权限模型的情况下生成进程时。标志通过 NODE_OPTIONS 环境变量继承到子 Node.js 进程。"
-->

> 稳定性：1.1 - 积极开发中

当使用 [Permission Model][] 时，进程默认将无法生成任何子进程。
除非用户在启动 Node.js 时显式传递 `--allow-child-process` 标志，否则尝试这样做将抛出 `ERR_ACCESS_DENIED`。

示例：

```js
const childProcess = require('node:child_process');
// 尝试绕过权限
childProcess.spawn('node', ['-e', 'require("fs").writeFileSync("/new-file", "example")']);
```

```console
$ node --permission --allow-fs-read=* index.js
node:internal/child_process:388
  const err = this._handle.spawn(options);
                           ^
Error: Access to this API has been restricted
    at ChildProcess.spawn (node:internal/child_process:388:28)
    at node:internal/main/run_main_module:17:47 {
  code: 'ERR_ACCESS_DENIED',
  permission: 'ChildProcess'
}
```

`child_process.fork()` API 从父进程继承执行参数。这意味着如果 Node.js 启动时启用了权限模型并设置了 `--allow-child-process` 标志，则使用 `child_process.fork()` 创建的任何子进程都将自动接收所有相关的权限模型标志。

此行为也适用于 `child_process.spawn()`，但在这种情况下，标志是通过 `NODE_OPTIONS` 环境变量传播的，而不是直接通过进程参数。

### `--allow-ffi`

<!-- YAML
added: REPLACEME
-->

> Stability: 1.1 - Active development

当使用 [Permission Model][] 时，进程默认将无法使用 FFI
API。尝试使用 FFI API 将抛出一个 `ERR_ACCESS_DENIED`
异常，除非用户在启动 Node.js 时显式传递 `--allow-ffi` 标志。
[`node:ffi`][] 模块还需要
`--experimental-ffi` 标志，并且仅在具备 FFI 支持的构建中可用。

示例：

```js
const { DynamicLibrary } = require('node:ffi');
const lib = new DynamicLibrary('mylib.so');
```

```console
$ node --permission --experimental-ffi index.js
Error: Access to this API has been restricted. Use --allow-ffi to manage permissions.
    at node:internal/main/run_main_module:17:47 {
  code: 'ERR_ACCESS_DENIED',
  permission: 'FFI'
}
```

### `--allow-fs-read`

<!-- YAML
added: v20.0.0
changes:
  - version:
      - v24.2.0
      - v22.17.0
    pr-url: https://github.com/nodejs/node/pull/58579
    description: 应用程序的入口点被允许隐式读取。
  - version:
    - v23.5.0
    - v22.13.0
    pr-url: https://github.com/nodejs/node/pull/56201
    description: 权限模型和 --allow-fs 标志已稳定。
  - version: v20.7.0
    pr-url: https://github.com/nodejs/node/pull/49047
    description: "不再允许使用逗号 (`,`) 分隔的路径。"
-->

此标志使用 [Permission Model][] 配置文件系统读取权限。

`--allow-fs-read` 标志的有效参数为：

* `*` - 允许所有 `FileSystemRead` 操作。
* 可以使用多个 `--allow-fs-read` 标志允许多个路径。
  例如 `--allow-fs-read=/folder1/ --allow-fs-read=/folder1/`

示例可以在 [File System Permissions][] 文档中找到。

初始化模块和自定义 `--require` 模块具有隐式读取权限。

```console
$ node --permission -r custom-require.js -r custom-require-2.js index.js
```

* `custom-require.js`、`custom-require-2.js` 和 `index.js` 默认将在允许的读取列表中。

```js
process.permission.has('fs.read', 'index.js'); // true
process.permission.has('fs.read', 'custom-require.js'); // true
process.permission.has('fs.read', 'custom-require-2.js'); // true
```

### `--allow-fs-write`

<!-- YAML
added: v20.0.0
changes:
  - version:
    - v23.5.0
    - v22.13.0
    pr-url: https://github.com/nodejs/node/pull/56201
    description: 权限模型和 --allow-fs 标志已稳定。
  - version: v20.7.0
    pr-url: https://github.com/nodejs/node/pull/49047
    description: "不再允许使用逗号 (`,`) 分隔的路径。"
-->

此标志使用 [Permission Model][] 配置文件系统写入权限。

`--allow-fs-write` 标志的有效参数为：

* `*` - 允许所有 `FileSystemWrite` 操作。
* 可以使用多个 `--allow-fs-write` 标志允许多个路径。
  例如 `--allow-fs-write=/folder1/ --allow-fs-write=/folder1/`

不再允许使用逗号 (`,`) 分隔的路径。
当传递带有逗号的单个标志时，将显示警告。

示例可以在 [File System Permissions][] 文档中找到。

### `--allow-inspector`

<!-- YAML
added:
  - v25.0.0
  - v24.12.0
-->

> 稳定性：1.0 - 早期开发

当使用 [Permission Model][] 时，进程将无法通过检查器协议连接。

除非用户在启动 Node.js 时显式传递 `--allow-inspector` 标志，否则尝试这样做将抛出 `ERR_ACCESS_DENIED`。

示例：

```js
const { Session } = require('node:inspector/promises');

const session = new Session();
session.connect();
```

```console
$ node --permission index.js
Error: connect ERR_ACCESS_DENIED Access to this API has been restricted. Use --allow-inspector to manage permissions.
  code: 'ERR_ACCESS_DENIED',
}
```

### `--allow-net`

<!-- YAML
added: v25.0.0
-->

> 稳定性：1.1 - 积极开发中

当使用 [Permission Model][] 时，进程默认将无法访问网络。
除非用户在启动 Node.js 时显式传递 `--allow-net` 标志，否则尝试这样做将抛出 `ERR_ACCESS_DENIED`。

示例：

```js
const http = require('node:http');
// 尝试绕过权限
const req = http.get('http://example.com', () => {});

req.on('error', (err) => {
  console.log('err', err);
});
```

```console
$ node --permission index.js
Error: connect ERR_ACCESS_DENIED Access to this API has been restricted. Use --allow-net to manage permissions.
  code: 'ERR_ACCESS_DENIED',
}
```

### `--allow-wasi`

<!-- YAML
added:
- v22.3.0
- v20.16.0
-->

> 稳定性：1.1 - 积极开发中

当使用 [Permission Model][] 时，进程默认将无法创建任何 WASI 实例。
出于安全原因，除非用户在主 Node.js 进程中显式传递 `--allow-wasi` 标志，否则调用将抛出 `ERR_ACCESS_DENIED`。

示例：

```js
const { WASI } = require('node:wasi');
// 尝试绕过权限
new WASI({
  version: 'preview1',
  // 尝试挂载整个文件系统
  preopens: {
    '/': '/',
  },
});
```

```console
$ node --permission --allow-fs-read=* index.js

Error: Access to this API has been restricted
    at node:internal/main/run_main_module:30:49 {
  code: 'ERR_ACCESS_DENIED',
  permission: 'WASI',
}
```

### `--allow-worker`

<!-- YAML
added: v20.0.0
-->

> 稳定性：1.1 - 积极开发中

当使用 [Permission Model][] 时，进程默认将无法创建任何工作线程。
出于安全原因，除非用户在主 Node.js 进程中显式传递 `--allow-worker` 标志，否则调用将抛出 `ERR_ACCESS_DENIED`。

示例：

```js
const { Worker } = require('node:worker_threads');
// 尝试绕过权限
new Worker(__filename);
```

```console
$ node --permission --allow-fs-read=* index.js

Error: Access to this API has been restricted
    at node:internal/main/run_main_module:17:47 {
  code: 'ERR_ACCESS_DENIED',
  permission: 'WorkerThreads'
}
```

### `--build-sea=config`

<!-- YAML
added:
  - v25.5.0
-->

> 稳定性：1.1 - 积极开发中

从 JSON 配置文件生成 [single executable application][]。参数必须是配置文件的路径。如果路径不是绝对路径，则相对于当前工作目录解析。

有关配置字段、跨平台说明和资源 API，请参阅 [single executable application][] 文档。

### `--build-snapshot`

<!-- YAML
added: v18.8.0
changes:
  - version:
    - v25.4.0
    - v24.13.1
    pr-url: https://github.com/nodejs/node/pull/60954
    description: 快照构建过程不再是实验性的。
-->

在进程退出时生成快照 blob 并将其写入磁盘，以后可以使用 `--snapshot-blob` 加载。

构建快照时，如果未指定 `--snapshot-blob`，则生成的 blob 默认将写入当前工作目录中的 `snapshot.blob`。否则，它将写入 `--snapshot-blob` 指定的路径。

```console
$ echo "globalThis.foo = 'I am from the snapshot'" > snapshot.js

# 运行 snapshot.js 来初始化应用程序并将其状态快照到 snapshot.blob 中。
$ node --snapshot-blob snapshot.blob --build-snapshot snapshot.js

$ echo "console.log(globalThis.foo)" > index.js

# 加载生成的快照并从 index.js 启动应用程序。
$ node --snapshot-blob snapshot.blob index.js
I am from the snapshot
```

[`v8.startupSnapshot` API][] 可用于在快照构建时指定入口点，从而避免在反序列化时需要额外的入口脚本：

```console
$ echo "require('v8').startupSnapshot.setDeserializeMainFunction(() => console.log('I am from the snapshot'))" > snapshot.js
$ node --snapshot-blob snapshot.blob --build-snapshot snapshot.js
$ node --snapshot-blob snapshot.blob
I am from the snapshot
```

有关更多信息，请查看 [`v8.startupSnapshot` API][] 文档。

快照目前仅支持在快照构建过程中加载单个入口点，该入口点可以加载内置模块，但不能加载额外的用户态模块。
用户可以在构建快照之前使用他们选择的捆绑器将应用程序捆绑到单个脚本中。

由于确保所有内置模块的可序列化性很复杂，而且这些模块也在不断增长，因此只有一部分内置模块经过充分测试，可以在快照构建过程中序列化。
Node.js 核心测试套件检查了几个相当复杂的应用程序是否可以快照化。被 [captured by the built-in snapshot of Node.js][] 的内置模块列表被视为受支持。
当快照构建器遇到无法序列化的内置模块时，它可能会导致快照构建过程崩溃。在这种情况下，典型的解决方法是延迟加载该模块直到运行时，使用 [`v8.startupSnapshot.setDeserializeMainFunction()`][] 或 [`v8.startupSnapshot.addDeserializeCallback()`][]。如果需要在快照构建过程中为额外的模块进行序列化，请在 [Node.js issue tracker][] 中提交请求，并将其链接到 [tracking issue for user-land snapshots][]。

### `--build-snapshot-config`

<!-- YAML
added:
  - v21.6.0
  - v20.12.0
changes:
  - version:
    - v25.4.0
    - v24.13.1
    pr-url: https://github.com/nodejs/node/pull/60954
    description: 快照构建过程不再是实验性的。
-->

指定 JSON 配置文件的路径，该文件配置快照创建行为。

目前支持以下选项：

* `builder` {string} 必需。提供在构建快照之前执行的脚本的名称，就好像传递了 [`--build-snapshot`][] 并将 `builder` 作为主脚本名称一样。
* `withoutCodeCache` {boolean} 可选。包含代码缓存会减少编译快照中包含的函数所花费的时间，但代价是快照大小更大，并可能破坏快照的可移植性。

使用此标志时，命令行上提供的其他脚本文件将不会执行，而是被解释为常规命令行参数。

### `-c`, `--check`

<!-- YAML
added:
  - v5.0.0
  - v4.2.0
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/19600
    description: "检查文件时现在支持 `--require` 选项。"
-->

语法检查脚本而不执行。

### `--completion-bash`

<!-- YAML
added: v10.12.0
-->

打印可 source 的 Node.js bash 补全脚本。

```bash
node --completion-bash > node_bash_completion
source node_bash_completion
```

### `-C condition`, `--conditions=condition`

<!-- YAML
added:
  - v14.9.0
  - v12.19.0
changes:
  - version:
    - v22.9.0
    - v20.18.0
    pr-url: https://github.com/nodejs/node/pull/54209
    description: 该标志不再是实验性的。
-->

提供自定义 [conditional exports][] 解析条件。

允许任意数量的自定义字符串条件名称。

默认的 Node.js 条件 `"node"`、`"default"`、`"import"` 和 `"require"` 将始终按定义应用。

例如，要以 "development" 解析运行模块：

```bash
node -C development app.js
```

### `--cpu-prof`

<!-- YAML
added: v12.0.0
changes:
  - version:
    - v22.4.0
    - v20.16.0
    pr-url: https://github.com/nodejs/node/pull/53343
    description: "`--cpu-prof` 标志现已稳定。"
-->

在启动时启动 V8 CPU 性能分析器，并在退出前将 CPU 配置文件写入磁盘。

如果未指定 `--cpu-prof-dir`，则生成的配置文件将放置在当前工作目录中。

如果未指定 `--cpu-prof-name`，则生成的配置文件命名为 `CPU.${yyyymmdd}.${hhmmss}.${pid}.${tid}.${seq}.cpuprofile`。

```console
$ node --cpu-prof index.js
$ ls *.cpuprofile
CPU.20190409.202950.15293.0.0.cpuprofile
```

如果指定了 `--cpu-prof-name`，则提供的值用作文件名的模板。支持以下占位符，并将在运行时替换：

* `${pid}` — 当前进程 ID

```console
$ node --cpu-prof --cpu-prof-name 'CPU.${pid}.cpuprofile' index.js
$ ls *.cpuprofile
CPU.15293.cpuprofile
```

### `--cpu-prof-dir`

<!-- YAML
added: v12.0.0
changes:
  - version:
    - v22.4.0
    - v20.16.0
    pr-url: https://github.com/nodejs/node/pull/53343
    description: "`--cpu-prof` 标志现已稳定。"
-->

指定放置由 `--cpu-prof` 生成的 CPU 配置文件的目录。

默认值由 [`--diagnostic-dir`][] 命令行选项控制。

### `--cpu-prof-interval`

<!-- YAML
added: v12.2.0
changes:
  - version:
    - v22.4.0
    - v20.16.0
    pr-url: https://github.com/nodejs/node/pull/53343
    description: "`--cpu-prof` 标志现已稳定。"
-->

指定由 `--cpu-prof` 生成的 CPU 配置文件的采样间隔（微秒）。默认值为 1000 微秒。

### `--cpu-prof-name`

<!-- YAML
added: v12.0.0
changes:
  - version:
    - v22.4.0
    - v20.16.0
    pr-url: https://github.com/nodejs/node/pull/53343
    description: "`--cpu-prof` 标志现已稳定。"
-->

指定由 `--cpu-prof` 生成的 CPU 配置文件的文件名。

### `--diagnostic-dir=directory`

设置所有诊断输出文件写入的目录。默认为当前工作目录。

影响以下内容的默认输出目录：

* [`--cpu-prof-dir`][]
* [`--heap-prof-dir`][]
* [`--redirect-warnings`][]

### `--disable-proto=mode`

<!-- YAML
added:
 - v13.12.0
 - v12.17.0
-->

禁用 `Object.prototype.__proto__` 属性。如果 `mode` 为 `delete`，则该属性被完全移除。如果 `mode` 为 `throw`，则访问该属性会抛出代码为 `ERR_PROTO_ACCESS` 的异常。

### `--disable-sigusr1`

<!-- YAML
added:
  - v23.7.0
  - v22.14.0
changes:
  - version:
    - v24.8.0
    - v22.20.0
    pr-url: https://github.com/nodejs/node/pull/59707
    description: 该选项不再是实验性的。
-->

禁用通过向进程发送 `SIGUSR1` 信号来启动调试会话的能力。

### `--disable-warning=code-or-type`

<!-- YAML
added:
  - v21.3.0
  - v20.11.0
-->

> 稳定性：1.1 - 积极开发中

按 `code` 或 `type` 禁用特定的进程警告。

从 [`process.emitWarning()`][emit_warning] 发出的警告可能包含 `code` 和 `type`。此选项将不发出具有匹配 `code` 或 `type` 的警告。

[deprecation warnings][] 列表。

Node.js 核心警告类型为：`DeprecationWarning` 和 `ExperimentalWarning`

例如，以下脚本在使用 `node --disable-warning=DEP0025` 执行时将不发出 [DEP0025 `require('node:sys')`][DEP0025 warning]：

```mjs
import sys from 'node:sys';
```

```cjs
const sys = require('node:sys');
```

例如，以下脚本在使用 `node --disable-warning=ExperimentalWarning` 执行时将发出 [DEP0025 `require('node:sys')`][DEP0025 warning]，但不发出任何实验性警告（例如 <=v21 中的 [ExperimentalWarning: `vm.measureMemory` is an experimental feature][]）：

```mjs
import sys from 'node:sys';
import vm from 'node:vm';

vm.measureMemory();
```

```cjs
const sys = require('node:sys');
const vm = require('node:vm');

vm.measureMemory();
```

### `--disable-wasm-trap-handler`

<!-- YAML
added:
- v22.2.0
- v20.15.0
changes:
  - version:
    - v26.0.0
    pr-url: https://github.com/nodejs/node/pull/62132
    description: 当启动时没有足够的虚拟内存可用以分配一个笼时，Node.js 现在会自动禁用陷阱处理程序。
-->

Node.js 在 64 位平台上启用 V8 基于陷阱处理程序的 WebAssembly 边界检查，这通过消除对内联边界检查的需求显著提高了 WebAssembly 性能。此优化需要为每个 WebAssembly 内存实例分配一个大虚拟内存笼（目前 32 位 WebAssembly 内存通常为 8GB，64 位 WebAssembly 内存为 16GB）以捕获越界访问。在大多数 64 位平台上，虚拟内存地址空间通常足够大（约 128TB）以适应典型的 WebAssembly 用法，但如果机器对虚拟内存有手动限制（例如通过 `ulimit -v`），WebAssembly 内存分配更可能因 `WebAssembly.Memory(): could not allocate memory` 而失败。

在启动时，Node.js 自动检查是否有足够的虚拟内存可用以分配至少一个笼，如果没有，则自动禁用陷阱处理程序优化，以便 WebAssembly 仍然可以使用内联边界检查运行（性能较差）。但是，如果应用程序需要创建许多 WebAssembly 内存实例，并且机器仍然配置了相对较高的虚拟内存限制，由于虚拟内存使用量增加，WebAssembly 内存实例的分配仍可能比预期更快地失败。

`--disable-wasm-trap-handler` 完全禁用此优化，以便 WebAssembly 内存实例始终使用内联边界检查，而不是保留大虚拟内存笼。当 Node.js 进程可用的虚拟内存地址空间有限时，这允许创建更多实例。

### `--disallow-code-generation-from-strings`

<!-- YAML
added: v9.8.0
-->

使生成代码的内置语言功能（如 `eval` 和 `new Function`）抛出异常。这不影响 Node.js `node:vm` 模块。

### `--dns-result-order=order`

<!-- YAML
added:
  - v16.4.0
  - v14.18.0
changes:
  - version:
    - v22.1.0
    - v20.13.0
    pr-url: https://github.com/nodejs/node/pull/52492
    description: "现在支持 `ipv6first`。"
  - version: v17.0.0
    pr-url: https://github.com/nodejs/node/pull/39987
    description: "默认值更改为 `verbatim`。"
-->

设置 [`dns.lookup()`][] 和 [`dnsPromises.lookup()`][] 中 `order` 的默认值。值可以是：

* `ipv4first`：将默认 `order` 设置为 `ipv4first`。
* `ipv6first`：将默认 `order` 设置为 `ipv6first`。
* `verbatim`：将默认 `order` 设置为 `verbatim`。

默认值为 `verbatim`，并且 [`dns.setDefaultResultOrder()`][] 的优先级高于 `--dns-result-order`。

### `--enable-fips`

<!-- YAML
added: v6.0.0
-->

在启动时启用符合 FIPS 标准的加密。（需要 Node.js 针对兼容 FIPS 的 OpenSSL 构建。）

### `--enable-source-maps`

<!-- YAML
added: v12.12.0
changes:
  - version:
      - v15.11.0
      - v14.18.0
    pr-url: https://github.com/nodejs/node/pull/37362
    description: 此 API 不再是实验性的。
-->

启用堆栈跟踪的 [Source Map][] 支持。

使用转译器（如 TypeScript）时，应用程序抛出的堆栈跟踪引用的是转译后的代码，而不是原始源位置。`--enable-source-maps` 启用源映射的缓存，并尽最大努力报告相对于原始源文件的堆栈跟踪。

覆盖 `Error.prepareStackTrace` 可能会阻止 `--enable-source-maps` 修改堆栈跟踪。在覆盖函数中调用并返回原始 `Error.prepareStackTrace` 的结果以使用源映射修改堆栈跟踪。

```js
const originalPrepareStackTrace = Error.prepareStackTrace;
Error.prepareStackTrace = (error, trace) => {
  // 修改错误和跟踪并使用原始 Error.prepareStackTrace 格式化堆栈跟踪。
  return originalPrepareStackTrace(error, trace);
};
```

注意，启用源映射可能会在访问 `Error.stack` 时给应用程序带来延迟。如果在应用程序中频繁访问 `Error.stack`，请考虑 `--enable-source-maps` 的性能影响。

### `--entry-url`

<!-- YAML
added:
  - v23.0.0
  - v22.10.0
-->

> 稳定性：1 - 实验性

如果存在，Node.js 将把入口点解释为 URL，而不是路径。

遵循 [ECMAScript module][] 解析规则。

URL 中的任何查询参数或哈希都可以通过 [`import.meta.url`][] 访问。

```bash
node --entry-url 'file:///path/to/file.js?queryparams=work#and-hashes-too'
node --entry-url 'file.ts?query#hash'
node --entry-url 'data:text/javascript,console.log("Hello")'
```

### `--env-file-if-exists=file`

<!-- YAML
added: v22.9.0
changes:
  - version:
     - v24.10.0
     - v22.21.0
    pr-url: https://github.com/nodejs/node/pull/59925
    description: "`--env-file-if-exists` 标志不再是实验性的。"
-->

行为与 [`--env-file`][] 相同，但如果文件不存在则不抛出错误。

### `--env-file=file`

<!-- YAML
added: v20.6.0
changes:
  - version:
     - v24.10.0
     - v22.21.0
    pr-url: https://github.com/nodejs/node/pull/59925
    description: "`--env-file` 标志不再是实验性的。"
  - version:
    - v21.7.0
    - v20.12.0
    pr-url: https://github.com/nodejs/node/pull/51289
    description: 添加对多行值的支持。
-->

从相对于当前目录的文件加载环境变量，使它们可用于 `process.env` 上的应用程序。解析并应用 [environment_variables][] 等配置 Node.js 的环境变量。如果在环境和文件中定义了相同的变量，则环境中的值优先。

您可以传递多个 `--env-file` 参数。后续文件覆盖先前文件中定义的现有变量。

如果文件不存在，则抛出错误。

```bash
node --env-file=.env --env-file=.development.env index.js
```

文件的格式应为每行一个环境变量名称和值的键值对，由 `=` 分隔：

```text
PORT=3000
```

`#` 之后的任何文本都被视为注释：

```text
# 这是一个注释
PORT=3000 # 这也是一个注释
```

值可以以以下引号开始和结束：`` ` ``、`"` 或 `'`。它们从值中省略。

```text
USERNAME="nodejs" # 将导致 `nodejs` 作为值。
```

支持多行值：

```text
MULTI_LINE="THIS IS
A MULTILINE"
# 将导致 `THIS IS\nA MULTILINE` 作为值。
```

键之前的 Export 关键字被忽略：

```text
export USERNAME="nodejs" # 将导致 `nodejs` 作为值。
```

如果您想从可能不存在的文件加载环境变量，您可以改用 [`--env-file-if-exists`][] 标志。

### `-e`, `--eval "script"`

<!-- YAML
added: v0.5.2
changes:
  - version: v22.6.0
    pr-url: https://github.com/nodejs/node/pull/53725
    description: Eval 现在支持实验性的类型剥离。
  - version: v5.11.0
    pr-url: https://github.com/nodejs/node/pull/5348
    description: 内置库现在可用作预定义变量。
-->

将以下参数作为 JavaScript 求值。REPL 中预定义的模块也可用于 `script`。

如果 `script` 以 `-` 开头，请使用 `=` 传递它（例如，`node --print --eval=-42`），以便将其解析为 `--eval` 的值。

在 Windows 上，使用 `cmd.exe` 时单引号将无法正常工作，因为它只识别双 `"` 进行引号。在 Powershell 或 Git bash 中，`'` 和 `"` 均可用。

除非提供 [`--no-strip-types`][] 标志，否则可以运行包含内联类型的代码。

### `--experimental-addon-modules`

<!-- YAML
added:
  - v23.6.0
  - v22.20.0
-->

> 稳定性：1.0 - 早期开发

启用 `.node` 插件的实验性导入支持。

### `--experimental-config-file=path`, `--experimental-config-file`

<!-- YAML
added:
 - v23.10.0
 - v22.16.0
-->

> 稳定性：1.0 - 早期开发

如果存在，Node.js 将在指定路径查找配置文件。
如果未指定路径，Node.js 将在当前工作目录中查找 `node.config.json` 文件。
要指定自定义路径，请使用 `--experimental-config-file=path` 形式。
不支持使用空格分隔的 `--experimental-config-file path` 形式。
别名 `--experimental-default-config-file` 等同于
`--experimental-config-file`，不带参数。
Node.js 将读取配置文件并应用设置。配置文件应为一个 JSON 文件，具有以下结构。`$schema` 中的 `vX.Y.Z`
必须替换为你正在使用的 Node.js 版本。

```json
{
  "$schema": "https://nodejs.org/dist/vX.Y.Z/docs/node-config-schema.json",
  "nodeOptions": {
    "import": [
      "amaro/strip"
    ],
    "watch-path": "src",
    "watch-preserve-output": true
  },
  "test": {
    "test-isolation": "process"
  },
  "watch": {
    "watch-preserve-output": true
  }
}
```

配置文件支持特定于命名空间的选项：

* `nodeOptions` 字段包含 [`NODE_OPTIONS`][] 中允许的 CLI 标志。

* 命名空间字段（如 `test`、`watch` 和 `permission`）包含特定于该子系统的配置。

当配置文件中存在命名空间时，Node.js 会自动启用相应的标志（例如，`--test`、`--watch`、`--permission`）。这允许您配置子系统特定的选项，而无需在命令行上显式传递标志。

例如：

```json
{
  "test": {
    "test-isolation": "process"
  }
}
```

等同于：

```bash
node --test --test-isolation=process
```

要禁用自动标志而仍使用命名空间选项，您可以在命名空间内将标志显式设置为 `false`：

```json
{
  "test": {
    "test": false,
    "test-isolation": "process"
  }
}
```

不支持无操作标志。
并非所有 V8 标志目前都受支持。

可以使用 [official JSON schema](../node-config-schema.json) 验证配置文件，这可能因 Node.js 版本而异。
配置文件中的每个键对应于一个可以作为命令行参数传递的标志。键的值是将传递给标志的值。

例如，上面的配置文件等同于以下命令行参数：

```bash
node --import amaro/strip --watch-path=src --watch-preserve-output --test-isolation=process
```

配置中的优先级如下：

1. NODE\_OPTIONS and command-line options
2. Dotenv NODE\_OPTIONS
3. Configuration file

Values in the configuration file will not override the values in the environment
variables, command-line options, or the `NODE_OPTIONS` env file parsed by the
`--env-file` flag.

键不能在同一或不同命名空间内重复。

如果配置文件包含未知键或不能在命名空间中使用的键，配置解析器将抛出错误。

Node.js 不会清理或验证用户提供的配置，因此**切勿**使用不可信的配置文件。

### `--experimental-default-config-file`

<!-- YAML
added:
 - v23.10.0
 - v22.16.0
-->

> 稳定性：1.0 - 早期开发

此标志是 `--experimental-config-file` 不带参数的别名。
如果存在，Node.js 将在
当前工作目录中查找
`node.config.json` 文件并将其作为
配置文件加载。

### `--experimental-eventsource`

<!-- YAML
added:
  - v22.3.0
  - v20.18.0
-->

在全局范围启用 [EventSource Web API][] 的暴露。

### `--experimental-ffi`

<!-- YAML
added: REPLACEME
-->

> Stability: 1 - Experimental

启用实验性的 [`node:ffi`][] 模块。

此标志仅在具备 FFI 支持的构建中可用。

### `--experimental-import-meta-resolve`

<!-- YAML
added:
  - v13.9.0
  - v12.16.2
changes:
  - version:
    - v20.6.0
    - v18.19.0
    pr-url: https://github.com/nodejs/node/pull/49028
    description: "同步 import.meta.resolve 默认可用，同时保留该标志以启用之前支持的实验性第二个参数。"
-->

启用实验性 `import.meta.resolve()` 父 URL 支持，这允许传递第二个 `parentURL` 参数进行上下文解析。

之前限制了整个 `import.meta.resolve` 功能。

### `--experimental-inspector-network-resource`

<!-- YAML
added:
  - v24.5.0
  - v22.19.0
-->

> 稳定性：1.1 - 积极开发中

启用检查器网络资源的实验性支持。

### `--experimental-loader=module`

<!-- YAML
added: v8.8.0
changes:
  - version:
    - v23.6.1
    - v22.13.1
    - v20.18.2
    pr-url: https://github.com/nodejs-private/node-private/pull/629
    description: "在启用权限模型的情况下使用此功能需要传递 `--allow-worker`。"
  - version: v12.11.1
    pr-url: https://github.com/nodejs/node/pull/29752
    description: "此标志已从 `--loader` 重命名为`--experimental-loader`。"
-->

> 不鼓励使用此标志，它可能会在未来的 Node.js 版本中被移除。
> 请改用 [`--import` 使用 `register()`][preloading asynchronous module customization hooks]。

指定包含导出的 [asynchronous module customization hooks][] 的 `module`。`module` 可以是任何接受为 [`import` specifier][] 的字符串。

如果与 [Permission Model][] 一起使用，此功能需要 `--allow-worker`。

### `--experimental-network-inspection`

<!-- YAML
added:
  - v22.6.0
  - v20.18.0
-->

> 稳定性：1 - 实验性

启用与 Chrome DevTools 进行网络检查的实验性支持。

### `--experimental-print-required-tla`

<!-- YAML
added:
  - v22.0.0
  - v20.17.0
-->

如果被 `require()` 的 ES 模块包含顶层 `await`，此标志允许 Node.js 评估模块，尝试定位顶层 awaits，并打印它们的位置以帮助用户找到它们。

### `--experimental-quic`

<!-- YAML
added: v25.0.0
-->

> 稳定性：1.1 - 积极开发中

启用 QUIC 协议的实验性支持。

### `--experimental-sea-config`

<!-- YAML
added: v20.0.0
-->

> 稳定性：1 - 实验性

使用此标志生成一个 blob，可以将其注入到 Node.js 二进制文件中以生成 [single executable application][]。有关详细信息，请参阅有关 [this configuration][`--experimental-sea-config`] 的文档。

### `--experimental-shadow-realm`

<!-- YAML
added:
  - v19.0.0
  - v18.13.0
-->

使用此标志启用 [ShadowRealm][] 支持。

### `--experimental-storage-inspection`

<!-- YAML
added:
  - v25.5.0
-->

> 稳定性：1.1 - 积极开发中

启用存储检查的实验性支持

### `--experimental-stream-iter`

<!-- YAML
added:
 - v26.0.0
 - v25.9.0
-->

> 稳定性：1 - 实验性

启用实验性 [`node:stream/iter`][] 模块。

### `--experimental-test-coverage`

<!-- YAML
added:
  - v19.7.0
  - v18.15.0
changes:
  - version:
    - v20.1.0
    - v18.17.0
    pr-url: https://github.com/nodejs/node/pull/47686
    description: "此选项可与 `--test` 一起使用。"
-->

与 `node:test` 模块结合使用时，代码覆盖率报告将作为测试运行器输出的一部分生成。如果没有运行测试，则不会生成覆盖率报告。有关更多详细信息，请参阅 [collecting code coverage from tests][] 文档。

### `--experimental-test-module-mocks`

<!-- YAML
added:
  - v22.3.0
  - v20.18.0
changes:
  - version:
    - v23.6.1
    - v22.13.1
    - v20.18.2
    pr-url: https://github.com/nodejs-private/node-private/pull/629
    description: "在启用权限模型的情况下使用此功能需要传递 `--allow-worker`。"
-->

> 稳定性：1.0 - 早期开发

在测试运行器中启用模块 mocking。

如果与 [Permission Model][] 一起使用，此功能需要 `--allow-worker`。

### `--experimental-vm-modules`

<!-- YAML
added: v9.6.0
-->

在 `node:vm` 模块中启用实验性 ES 模块支持。

### `--experimental-wasi-unstable-preview1`

<!-- YAML
added:
  - v13.3.0
  - v12.16.0
changes:
  - version:
    - v20.0.0
    - v18.17.0
    pr-url: https://github.com/nodejs/node/pull/47286
    description: "不再需要此选项，因为 WASI 已默认启用，但仍可以传递。"
  - version: v13.6.0
    pr-url: https://github.com/nodejs/node/pull/30980
    description: "从 `--experimental-wasi-unstable-preview0` 更改为`--experimental-wasi-unstable-preview1`。"
-->

启用实验性 WebAssembly 系统接口 (WASI) 支持。

### `--experimental-worker-inspection`

<!-- YAML
added:
  - v24.1.0
  - v22.17.0
-->

> 稳定性：1.1 - 积极开发中

启用与 Chrome DevTools 进行工作线程检查的实验性支持。

### `--expose-gc`

<!-- YAML
added:
  - v22.3.0
  - v20.18.0
-->

> 稳定性：1 - 实验性。此标志继承自 V8，可能会在上游发生变化。

此标志将暴露 V8 的 gc 扩展。

```js
if (globalThis.gc) {
  globalThis.gc();
}
```

### `--force-context-aware`

<!-- YAML
added: v12.12.0
-->

禁用加载不是 [context-aware][] 的原生插件。

### `--force-fips`

<!-- YAML
added: v6.0.0
-->

在启动时强制符合 FIPS 标准的加密。（无法从脚本代码禁用。）（与 `--enable-fips` 的要求相同。）

### `--force-node-api-uncaught-exceptions-policy`

<!-- YAML
added:
  - v18.3.0
  - v16.17.0
-->

在 Node-API 异步回调上强制 `uncaughtException` 事件。

为了防止现有插件使进程崩溃，默认情况下不启用此标志。将来，此标志将默认启用以强制正确的行为。

### `--frozen-intrinsics`

<!-- YAML
added: v11.12.0
-->

> 稳定性：1 - 实验性

启用实验性冻结的内在对象，如 `Array` 和 `Object`。

仅支持根上下文。不能保证 `globalThis.Array` 确实是默认的内在对象引用。在此标志下代码可能会中断。

为了允许添加 polyfill，[`--require`][] 和 [`--import`][] 都在冻结内在对象之前运行。

### `--heap-prof`

<!-- YAML
added: v12.4.0
changes:
  - version:
    - v22.4.0
    - v20.16.0
    pr-url: https://github.com/nodejs/node/pull/53343
    description: "`--heap-prof` 标志现已稳定。"
-->

在启动时启动 V8 堆性能分析器，并在退出前将堆配置文件写入磁盘。

如果未指定 `--heap-prof-dir`，则生成的配置文件将放置在当前工作目录中。

如果未指定 `--heap-prof-name`，则生成的配置文件命名为 `Heap.${yyyymmdd}.${hhmmss}.${pid}.${tid}.${seq}.heapprofile`。

```console
$ node --heap-prof index.js
$ ls *.heapprofile
Heap.20190409.202950.15293.0.001.heapprofile
```

### `--heap-prof-dir`

<!-- YAML
added: v12.4.0
changes:
  - version:
    - v22.4.0
    - v20.16.0
    pr-url: https://github.com/nodejs/node/pull/53343
    description: "`--heap-prof` 标志现已稳定。"
-->

指定放置由 `--heap-prof` 生成的堆配置文件的目录。

默认值由 [`--diagnostic-dir`][] 命令行选项控制。

### `--heap-prof-interval`

<!-- YAML
added: v12.4.0
changes:
  - version:
    - v22.4.0
    - v20.16.0
    pr-url: https://github.com/nodejs/node/pull/53343
    description: "`--heap-prof` 标志现已稳定。"
-->

指定由 `--heap-prof` 生成的堆配置文件的平均采样间隔（字节）。默认值为 512 \* 1024 字节。

### `--heap-prof-name`

<!-- YAML
added: v12.4.0
changes:
  - version:
    - v22.4.0
    - v20.16.0
    pr-url: https://github.com/nodejs/node/pull/53343
    description: "`--heap-prof` 标志现已稳定。"
-->

指定由 `--heap-prof` 生成的堆配置文件的文件名。

### `--heapsnapshot-near-heap-limit=max_count`

<!-- YAML
added:
  - v15.1.0
  - v14.18.0
changes:
  - version:
    - v25.4.0
    - v24.13.1
    - v22.22.1
    pr-url: https://github.com/nodejs/node/pull/60956
    description: 该标志不再是实验性的。
-->

当 V8 堆使用量接近堆限制时，将 V8 堆快照写入磁盘。`count` 应为非负整数（在这种情况下，Node.js 将向磁盘写入不超过 `max_count` 个快照）。

生成快照时，可能会触发垃圾回收并降低堆使用量。因此，在 Node.js 实例最终耗尽内存之前，可能会向磁盘写入多个快照。可以比较这些堆快照以确定在连续快照拍摄期间分配了哪些对象。不能保证 Node.js 会向磁盘写入 exactly `max_count` 个快照，但当 `max_count` 大于 `0` 时，它会尽最大努力在 Node.js 实例耗尽内存之前生成至少一个最多 `max_count` 个快照。

生成 V8 快照需要时间和内存（V8 堆管理的内存和 V8 堆之外的原生内存）。堆越大，需要的资源越多。Node.js 将调整 V8 堆以适应额外的 V8 堆内存开销，并尽最大努力避免使用进程可用的所有内存。当进程使用的内存超过系统认为适当的量时，根据系统配置，进程可能会被系统突然终止。

```console
$ node --max-old-space-size=100 --heapsnapshot-near-heap-limit=3 index.js
Wrote snapshot to Heap.20200430.100036.49580.0.001.heapsnapshot
Wrote snapshot to Heap.20200430.100037.49580.0.002.heapsnapshot
Wrote snapshot to Heap.20200430.100038.49580.0.003.heapsnapshot

<--- Last few GCs --->

[49580:0x110000000]     4826 ms: Mark-sweep 130.6 (147.8) -> 130.5 (147.8) MB, 27.4 / 0.0 ms  (average mu = 0.126, current mu = 0.034) allocation failure scavenge might not succeed
[49580:0x110000000]     4845 ms: Mark-sweep 130.6 (147.8) -> 130.6 (147.8) MB, 18.8 / 0.0 ms  (average mu = 0.088, current mu = 0.031) allocation failure scavenge might not succeed


<--- JS stacktrace --->

FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
....
```

### `--heapsnapshot-signal=signal`

<!-- YAML
added: v12.0.0
-->

启用信号处理程序，使 Node.js 进程在收到指定信号时写入堆转储。`signal` 必须是有效的信号名称。默认禁用。

```console
$ node --heapsnapshot-signal=SIGUSR2 index.js &
$ ps aux
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
node         1  5.5  6.1 787252 247004 ?       Ssl  16:43   0:02 node --heapsnapshot-signal=SIGUSR2 index.js
$ kill -USR2 1
$ ls
Heap.20190718.133405.15554.0.001.heapsnapshot
```

### `-h`, `--help`

<!-- YAML
added: v0.1.3
-->

打印 node 命令行选项。
此选项的输出不如本文档详细。

### `--icu-data-dir=file`

<!-- YAML
added: v0.11.15
-->

指定 ICU 数据加载路径。（覆盖 `NODE_ICU_DATA`。）

### `--import=module`

<!-- YAML
added:
 - v19.0.0
 - v18.18.0
-->

> 稳定性：1 - 实验性

在启动时预加载指定的模块。如果多次提供该标志，每个模块将按出现的顺序依次执行，从 [`NODE_OPTIONS`][] 中提供的模块开始。

遵循 [ECMAScript module][] 解析规则。
使用 [`--require`][] 加载 [CommonJS module][]。
使用 `--require` 预加载的模块将在使用 `--import` 预加载的模块之前运行。

模块被预加载到主线程以及任何工作线程、fork 的进程或集群进程中。

### `--input-type=type`

<!-- YAML
added: v12.0.0
changes:
  - version:
      - v23.6.0
      - v22.18.0
    pr-url: https://github.com/nodejs/node/pull/56350
    description: "添加对 `-typescript` 值的支持。"
  - version:
    - v22.7.0
    - v20.19.0
    pr-url: https://github.com/nodejs/node/pull/53619
    description: ESM 语法检测默认启用。
-->

这将配置 Node.js 将 `--eval` 或 `STDIN` 输入解释为 CommonJS 或 ES 模块。有效值为 `"commonjs"`、`"module"`、`"module-typescript"` 和 `"commonjs-typescript"`。
`"-typescript"` 值在 `--no-strip-types` 标志下不可用。
默认值为无值，如果传递 `--no-experimental-detect-module` 则为 `"commonjs"`。

如果未提供 `--input-type`，
Node.js 将尝试通过以下步骤检测语法：

1. 将输入作为 CommonJS 运行。
2. 如果步骤 1 失败，将输入作为 ES 模块运行。
3. 如果步骤 2 因 SyntaxError 失败，则剥离类型。
4. 如果步骤 3 因错误代码 [`ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX`][] 或 [`ERR_INVALID_TYPESCRIPT_SYNTAX`][] 失败，则抛出步骤 2 的错误，包括消息中的 TypeScript 错误，否则作为 CommonJS 运行。
5. 如果步骤 4 失败，将输入作为 ES 模块运行。

为了避免多次语法检测传递的延迟，可以使用 `--input-type=type` 标志指定应如何解释 `--eval` 输入。

REPL 不支持此选项。将 `--input-type=module` 与 [`--print`][] 一起使用将抛出错误，因为 `--print` 不支持 ES 模块语法。

### `--insecure-http-parser`

<!-- YAML
added:
 - v13.4.0
 - v12.15.0
 - v10.19.0
-->

在 HTTP 解析器上启用宽容标志。这可能允许与不符合标准的 HTTP 实现互操作。

启用后，解析器将接受以下内容：

* 无效的 HTTP 头值。
* 无效的 HTTP 版本。
* 允许消息同时包含 `Transfer-Encoding` 和 `Content-Length` 头。
* 当存在 `Connection: close` 时，允许消息后有额外数据。
* 提供 `chunked` 后允许额外的传输编码。
* 允许使用 `\n` 作为令牌分隔符，而不是 `\r\n`。
* 允许在块后不提供 `\r\n`。
* 允许在块大小之后和 `\r\n` 之前存在空格。

以上所有都将使您的应用程序暴露于请求走私或投毒攻击。避免使用此选项。

### `--inspect-brk[=[host:]port]`

<!-- YAML
added: v7.6.0
-->

在 `host:port` 激活检查器并在用户脚本开始时中断。默认 `host:port` 为 `127.0.0.1:9229`。如果指定端口 `0`，则将使用随机可用端口。

有关 Node.js 调试器的进一步解释，请参阅 [V8 Inspector integration for Node.js][]。

有关 `host` 参数使用的 [security warning][]，请参阅下文。

### `--inspect-port=[host:]port`

<!-- YAML
added: v7.6.0
-->

设置激活检查器时使用的 `host:port`。当通过发送 `SIGUSR1` 信号激活检查器时很有用。除非传递 [`--disable-sigusr1`][]。

默认主机为 `127.0.0.1`。如果指定端口 `0`，则将使用随机可用端口。

有关 `host` 参数使用的 [security warning][]，请参阅下文。

### `--inspect-publish-uid=stderr,http`

指定检查器 web socket url 暴露的方式。

默认情况下，检查器 websocket url 在 stderr 中可用，并在 `http://host:port/json/list` 上的 `/json/list` 端点下可用。

### `--inspect-wait[=[host:]port]`

<!-- YAML
added:
  - v22.2.0
  - v20.15.0
-->

在 `host:port` 激活检查器并等待调试器附加。默认 `host:port` 为 `127.0.0.1:9229`。如果指定端口 `0`，则将使用随机可用端口。

有关 Node.js 调试器的进一步解释，请参阅 [V8 Inspector integration for Node.js][]。

有关 `host` 参数使用的 [security warning][]，请参阅下文。

### `--inspect[=[host:]port]`

<!-- YAML
added: v6.3.0
-->

在 `host:port` 激活检查器。默认值为 `127.0.0.1:9229`。如果指定端口 `0`，则将使用随机可用端口。

V8 检查器集成允许 Chrome DevTools 和 IDE 等工具调试和配置 Node.js 实例。工具通过 tcp 端口附加到 Node.js 实例，并使用 [Chrome DevTools Protocol][] 进行通信。有关 Node.js 调试器的进一步解释，请参阅 [V8 Inspector integration for Node.js][]。

<!-- Anchor to make sure old links find a target -->

<a id="inspector_security"></a>

#### 警告：将检查器绑定到公共 IP:port 组合是不安全的

将检查器绑定到公共 IP（包括 `0.0.0.0`）并开放端口是不安全的，因为它允许外部主机连接到检查器并执行 [remote code execution][] 攻击。

如果指定主机，请确保：

* 主机无法从公共网络访问。
* 防火墙禁止端口上的 unwanted 连接。

**更具体地说，如果端口（默认为 `9229`）没有防火墙保护，则 `--inspect=0.0.0.0` 是不安全的。**

有关更多信息，请参阅 [debugging security implications][] 部分。

### `-i`, `--interactive`

<!-- YAML
added: v0.7.7
-->

即使 stdin 看起来不是终端，也打开 REPL。

### `--jitless`

<!-- YAML
added: v12.0.0
-->

> 稳定性：1 - 实验性。此标志继承自 V8，可能会在上游发生变化。

禁用 [runtime allocation of executable memory][jitless]。出于安全原因，某些平台可能需要此功能。它还可以减少其他平台上的攻击面，但性能影响可能很大。

### `--localstorage-file=file`

<!-- YAML
added: v22.4.0
-->

> 稳定性：1.2 - 发布候选。

用于存储 `localStorage` 数据的文件。如果该文件不存在，则在首次访问 `localStorage` 时创建它。同一个文件可以在多个 Node.js 进程之间并发共享。

### `--max-http-header-size=size`

<!-- YAML
added:
 - v11.6.0
 - v10.15.0
changes:
  - version: v13.13.0
    pr-url: https://github.com/nodejs/node/pull/32520
    description: 将 HTTP 头的默认最大大小从 8 KiB 更改为 16 KiB。
-->

指定 HTTP 头的最大大小（以字节为单位）。默认为 16 KiB。

### `--max-old-space-size-percentage=percentage`

将 V8 旧内存区（old memory section）的最大内存大小设置为可用系统内存的百分比。
当同时指定此标志和 `--max-old-space-size` 时，此标志优先。

`percentage` 参数必须是大于 0 且不超过 100 的数字，表示分配给 V8 堆的可用系统内存百分比。

**注意：** 此标志利用 `--max-old-space-size`，由于整数溢出问题，它在 32 位平台上可能不可靠。

```bash
# 使用 50% 的可用系统内存
node --max-old-space-size-percentage=50 index.js

# 使用 75% 的可用系统内存
node --max-old-space-size-percentage=75 index.js
```

### `--napi-modules`

<!-- YAML
added: v7.10.0
-->

此选项无操作（no-op）。保留它是为了兼容性。

### `--network-family-autoselection-attempt-timeout`

<!-- YAML
added:
  - v22.1.0
  - v20.13.0
-->

设置网络族自动选择尝试超时的默认值。
更多信息，请参阅 [`net.getDefaultAutoSelectFamilyAttemptTimeout()`][]。

### `--no-addons`

<!-- YAML
added:
  - v16.10.0
  - v14.19.0
-->

禁用 `node-addons` 导出条件以及禁用加载原生插件。当指定 `--no-addons` 时，调用 `process.dlopen` 或 require 原生 C++ 插件将失败并抛出异常。

### `--no-async-context-frame`

<!-- YAML
added: v24.0.0
-->

禁用由 `AsyncContextFrame` 支持的 [`AsyncLocalStorage`][] 的使用，并使用之前依赖 async_hooks 的实现。保留之前的模型是为了与 Electron 兼容以及用于上下文流可能不同的情况。但是，如果发现流程差异，请报告它。

### `--no-deprecation`

<!-- YAML
added: v0.8.0
-->

静默弃用警告。

### `--no-experimental-detect-module`

<!-- YAML
added:
  - v21.1.0
  - v20.10.0
changes:
  - version:
    - v22.7.0
    - v20.19.0
    pr-url: https://github.com/nodejs/node/pull/53619
    description: 默认启用语法检测。
-->

禁用使用 [语法检测][] 来确定模块类型。

### `--no-experimental-global-navigator`

<!-- YAML
added: v21.2.0
-->

> 稳定性：1 - 实验性

禁用在全局作用域上暴露 [Navigator API][]。

### `--no-experimental-repl-await`

<!-- YAML
added: v16.6.0
-->

使用此标志禁用 REPL 中的顶层 await。

### `--no-experimental-require-module`

<!-- YAML
added:
  - v22.0.0
  - v20.17.0
changes:
  - version:
    - v25.4.0
    - v24.15.0
    pr-url: https://github.com/nodejs/node/pull/60959
    description: "该标志已从 `--no-experimental-require-module` 重命名为`--no-require-module`，前者标记为遗留。"
  - version:
    - v23.0.0
    - v22.12.0
    - v20.19.0
    pr-url: https://github.com/nodejs/node/pull/55085
    description: 现在默认为 false。
-->

> 稳定性：3 - 遗留：请改用 [`--no-require-module`][]。

[`--no-require-module`][] 的遗留别名。

### `--no-experimental-sqlite`

<!-- YAML
added: v22.5.0
changes:
  - version:
    - v23.4.0
    - v22.13.0
    pr-url: https://github.com/nodejs/node/pull/55890
    description: SQLite 已取消标志但仍为实验性。
-->

禁用实验性的 [`node:sqlite`][] 模块。

### `--no-experimental-websocket`

<!-- YAML
added: v22.0.0
-->

禁用在全局作用域上暴露 {WebSocket}。

### `--no-experimental-webstorage`

<!-- YAML
added: v22.4.0
changes:
  - version: v25.0.0
    pr-url: https://github.com/nodejs/node/pull/57666
    description: 该功能现在默认启用。
-->

> 稳定性：1.2 - 发布候选。

禁用 [`Web 存储`][] 支持。

### `--no-extra-info-on-fatal-exception`

<!-- YAML
added: v17.0.0
-->

隐藏导致退出的致命异常上的额外信息。

### `--no-force-async-hooks-checks`

<!-- YAML
added: v9.0.0
-->

禁用 `async_hooks` 的运行时检查。当启用 `async_hooks` 时，这些检查仍会动态启用。

### `--no-global-search-paths`

<!-- YAML
added: v16.10.0
-->

不从全局路径（如 `$HOME/.node_modules` 和 `$NODE_PATH`）搜索模块。

### `--no-network-family-autoselection`

<!-- YAML
added: v19.4.0
changes:
  - version: v20.0.0
    pr-url: https://github.com/nodejs/node/pull/46790
    description: "该标志已从 `--no-enable-network-family-autoselection`重命名为 `--no-network-family-autoselection`。旧名称仍可作为别名工作。"
-->

除非连接选项显式启用，否则禁用族自动选择算法。

<a id="--experimental-require-module"></a>

### `--no-require-module`

<!-- YAML
added:
  - v22.0.0
  - v20.17.0
changes:
  - version:
     - v25.4.0
     - v24.15.0
    pr-url: https://github.com/nodejs/node/pull/60959
    description: 此标志不再是实验性的。
  - version:
     - v25.4.0
     - v24.15.0
    pr-url: https://github.com/nodejs/node/pull/60959
    description: "此标志已从 `--no-experimental-require-module`重命名为 `--no-require-module`。"
  - version:
    - v23.0.0
    - v22.12.0
    - v20.19.0
    pr-url: https://github.com/nodejs/node/pull/55085
    description: 现在默认为 false。
-->

禁用在 `require()` 中加载同步 ES 模块图的支持。

请参阅 [使用 `require()` 加载 ECMAScript 模块][]。

### `--no-strip-types`

<!-- YAML
added: v22.6.0
changes:
  - version:
      - v25.2.0
      - v24.12.0
    pr-url: https://github.com/nodejs/node/pull/60600
    description: "类型剥离现已稳定，该标志已从`--no-experimental-strip-types` 重命名为 `--no-strip-types`。"
  - version:
      - v23.6.0
      - v22.18.0
    pr-url: https://github.com/nodejs/node/pull/56350
    description: 默认启用类型剥离。
-->

禁用 TypeScript 文件的类型剥离。
更多信息，请参阅 [TypeScript 类型剥离][] 文档。

### `--no-warnings`

<!-- YAML
added: v6.0.0
-->

静默所有进程警告（包括弃用）。

### `--node-memory-debug`

<!-- YAML
added:
  - v15.0.0
  - v14.18.0
-->

为 Node.js  internals 中的内存泄漏启用额外的调试检查。这
通常仅对调试 Node.js 本身的开发人员有用。

### `--openssl-config=file`

<!-- YAML
added: v6.9.0
-->

启动时加载 OpenSSL 配置文件。除其他用途外，这可以
用于如果 Node.js 是针对
启用 FIPS 的 OpenSSL 构建的，则启用符合 FIPS 标准的加密。

### `--openssl-legacy-provider`

<!-- YAML
added:
  - v17.0.0
  - v16.17.0
-->

启用 OpenSSL 3.0 遗留提供程序。更多信息请参阅
[OSSL_PROVIDER-legacy][OSSL_PROVIDER-legacy]。

### `--openssl-shared-config`

<!-- YAML
added:
  - v18.5.0
  - v16.17.0
  - v14.21.0
-->

启用 OpenSSL 默认配置部分 `openssl_conf` 以便从
OpenSSL 配置文件中读取。默认配置文件名为
`openssl.cnf`，但这可以使用环境变量
`OPENSSL_CONF` 更改，或使用命令行选项 `--openssl-config`。
默认 OpenSSL 配置文件的位置取决于 OpenSSL
如何链接到 Node.js。共享 OpenSSL 配置可能会产生不必要的
影响，建议使用特定于 Node.js 的配置部分，即 `nodejs_conf`，当不使用此选项时它是默认的。

### `--pending-deprecation`

<!-- YAML
added: v8.0.0
-->

发出待决弃用警告。

待决弃用通常与运行时弃用相同，但
显著例外的是它们默认处于_关闭_状态，除非设置了 `--pending-deprecation` 命令行标志或
`NODE_PENDING_DEPRECATION=1` 环境变量，否则不会发出。待决弃用
用于提供一种选择性“早期警告”机制，
开发人员可利用它来检测已弃用的 API 使用情况。

### `--permission`

<!-- YAML
added: v20.0.0
changes:
  - version:
    - v23.5.0
    - v22.13.0
    pr-url: https://github.com/nodejs/node/pull/56201
    description: 权限模型现已稳定。
-->

为当前进程启用权限模型。启用时，
以下权限受到限制：

* File System - manageable through
  [`--allow-fs-read`][], [`--allow-fs-write`][] flags
* Network - manageable through [`--allow-net`][] flag
* Child Process - manageable through [`--allow-child-process`][] flag
* Worker Threads - manageable through [`--allow-worker`][] flag
* WASI - manageable through [`--allow-wasi`][] flag
* Addons - manageable through [`--allow-addons`][] flag
* FFI - manageable through [`--allow-ffi`](#--allow-ffi) flag

### `--permission-audit`

<!-- YAML
added: v25.8.0
-->

仅为权限模型启用审计。启用时，执行权限检查
但不拒绝访问。相反，通过诊断通道为
每个权限违规发出警告。

### `--preserve-symlinks`

<!-- YAML
added: v6.3.0
-->

指示模块加载器在解析和
缓存模块时保留符号链接。

默认情况下，当 Node.js 从符号链接到
不同磁盘位置的路径加载模块时，Node.js 将取消引用链接并使用模块的实际磁盘“真实路径”作为标识符和作为根
路径来定位其他依赖模块。在大多数情况下，此默认行为
是可以接受的。但是，当使用符号链接的对等依赖时，如下例所示，如果 `moduleA` 尝试 require `moduleB` 作为对等依赖，默认行为会导致抛出异常：

```text
{appDir}
 ├── app
 │   ├── index.js
 │   └── node_modules
 │       ├── moduleA -> {appDir}/moduleA
 │       └── moduleB
 │           ├── index.js
 │           └── package.json
 └── moduleA
     ├── index.js
     └── package.json
```

`--preserve-symlinks` 命令行标志指示 Node.js 对模块使用
符号链接路径而不是真实路径，允许找到符号链接的
对等依赖。

但是请注意，使用 `--preserve-symlinks` 可能会产生其他副作用。
具体来说，如果符号链接的_原生_模块从依赖树中的多个位置链接，则可能无法加载（Node.js 会将它们视为两个单独的模块并尝试多次加载模块，导致抛出异常）。

`--preserve-symlinks` 标志不适用于主模块，这允许
`node --preserve-symlinks node_module/.bin/<foo>` 工作。要对主模块应用相同的
行为，还请使用 `--preserve-symlinks-main`。

### `--preserve-symlinks-main`

<!-- YAML
added: v10.2.0
-->

指示模块加载器在解析和
缓存主模块 (`require.main`) 时保留符号链接。

存在此标志是为了让主模块可以选择加入与
`--preserve-symlinks` 给予所有其他导入相同的行为；但是，它们是单独的标志，
为了与旧版 Node.js 版本向后兼容。

`--preserve-symlinks-main` 不隐含 `--preserve-symlinks`；当
不希望在使用相对路径解析之前跟随符号链接时，请除了
`--preserve-symlinks` 外还使用 `--preserve-symlinks-main`。

更多信息请参阅 [`--preserve-symlinks`][]。

### `-p`, `--print "script"`

<!-- YAML
added: v0.6.4
changes:
  - version: v5.11.0
    pr-url: https://github.com/nodejs/node/pull/5348
    description: 内置库现在可用作预定义变量。
-->

与 `-e` 相同，但打印结果。

### `--prof`

<!-- YAML
added: v2.0.0
-->

生成 V8 性能分析器输出。

### `--prof-process`

<!-- YAML
added: v5.2.0
-->

处理使用 V8 选项 `--prof` 生成的 V8 性能分析器输出。

### `--redirect-warnings=file`

<!-- YAML
added: v8.0.0
-->

将进程警告写入给定文件而不是打印到 stderr。如果
文件不存在则创建它，如果存在则追加到它。如果尝试将警告写入文件时发生错误，则
警告将写入 stderr。

`file` 名称可以是绝对路径。如果不是，则写入它的默认目录由
[`--diagnostic-dir`][] 命令行选项控制。

### `--report-compact`

<!-- YAML
added:
 - v13.12.0
 - v12.17.0
-->

以紧凑格式写入报告，单行 JSON，比默认的多行格式（设计用于
人类消费）更容易被日志处理系统消费。

### `--report-dir=directory`, `--report-directory=directory`

<!-- YAML
added: v11.8.0
changes:
  - version:
     - v13.12.0
     - v12.17.0
    pr-url: https://github.com/nodejs/node/pull/32242
    description: 此选项不再是实验性的。
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/27312
    description: "从 `--diagnostic-report-directory` 更改为`--report-directory`。"
-->

生成报告的位置。

### `--report-exclude-env`

<!-- YAML
added:
  - v23.3.0
  - v22.13.0
-->

当传递 `--report-exclude-env` 时，生成的诊断报告将不包含
`environmentVariables` 数据。

### `--report-exclude-network`

<!-- YAML
added:
  - v22.0.0
  - v20.13.0
-->

从诊断报告中排除 `header.networkInterfaces`。默认情况下
未设置此项，并且包含网络接口。

### `--report-filename=filename`

<!-- YAML
added: v11.8.0
changes:
  - version:
     - v13.12.0
     - v12.17.0
    pr-url: https://github.com/nodejs/node/pull/32242
    description: 此选项不再是实验性的。
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/27312
    description: "从 `--diagnostic-report-filename` 更改为`--report-filename`。"
-->

写入报告的文件名。

如果文件名设置为 `'stdout'` 或 `'stderr'`，则报告分别写入
进程的 stdout 或 stderr。

### `--report-on-fatalerror`

<!-- YAML
added: v11.8.0
changes:
  - version:
    - v14.0.0
    - v13.14.0
    - v12.17.0
    pr-url: https://github.com/nodejs/node/pull/32496
    description: 此选项不再是实验性的。
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/27312
    description: "从 `--diagnostic-report-on-fatalerror` 更改为`--report-on-fatalerror`。"
-->

启用在导致应用程序终止的致命错误（Node.js 运行时内的内部错误，如内存不足）上触发报告。有助于检查各种诊断数据元素，如堆、堆栈、事件循环状态、资源消耗等，以推理致命错误。

### `--report-on-signal`

<!-- YAML
added: v11.8.0
changes:
  - version:
     - v13.12.0
     - v12.17.0
    pr-url: https://github.com/nodejs/node/pull/32242
    description: 此选项不再是实验性的。
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/27312
    description: "从 `--diagnostic-report-on-signal` 更改为`--report-on-signal`。"
-->

启用在接收到发送给运行中的 Node.js 进程的指定（或预定义）信号时生成报告。触发报告的信号通过 `--report-signal` 指定。

### `--report-signal=signal`

<!-- YAML
added: v11.8.0
changes:
  - version:
     - v13.12.0
     - v12.17.0
    pr-url: https://github.com/nodejs/node/pull/32242
    description: 此选项不再是实验性的。
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/27312
    description: "从 `--diagnostic-report-signal` 更改为`--report-signal`。"
-->

设置或重置用于生成报告的信号（不支持 Windows）。
默认信号是 `SIGUSR2`。

### `--report-uncaught-exception`

<!-- YAML
added: v11.8.0
changes:
  - version:
      - v18.8.0
      - v16.18.0
    pr-url: https://github.com/nodejs/node/pull/44208
    description: 如果未捕获异常已处理，则不生成报告。
  - version:
    - v13.12.0
    - v12.17.0
    pr-url: https://github.com/nodejs/node/pull/32242
    description: 此选项不再是实验性的。
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/27312
    description: "从 `--diagnostic-report-uncaught-exception` 更改为`--report-uncaught-exception`。"
-->

启用在进程因未捕获异常退出时生成报告。当结合原生堆栈和其他运行时环境数据检查 JavaScript 堆栈时很有用。

### `-r`, `--require module`

<!-- YAML
added: v1.6.0
changes:
  - version:
      - v23.0.0
      - v22.12.0
      - v20.19.0
    pr-url: https://github.com/nodejs/node/pull/51977
    description: 此选项也支持 ECMAScript 模块。
-->

启动时预加载指定模块。

遵循 `require()` 的模块解析
规则。`module` 可以是文件路径，也可以是 node 模块名称。

使用 `--require` 预加载的模块将在使用 `--import` 预加载的模块之前运行。

模块被预加载到主线程以及任何工作线程、
fork 的进程或集群进程中。

### `--run`

<!-- YAML
added: v22.0.0
changes:
  - version: v22.3.0
    pr-url: https://github.com/nodejs/node/pull/53032
    description: 添加了 NODE_RUN_SCRIPT_NAME 环境变量。
  - version: v22.3.0
    pr-url: https://github.com/nodejs/node/pull/53058
    description: 添加了 NODE_RUN_PACKAGE_JSON_PATH 环境变量。
  - version: v22.3.0
    pr-url: https://github.com/nodejs/node/pull/53154
    description: "向上遍历到根目录并找到一个 `package.json` 文件以从中运行命令，并相应地更新`PATH` 环境变量。"
-->

这从 package.json 的 `"scripts"` 对象运行指定命令。
如果未提供 `"command"`，它将列出可用的脚本。

`--run` 将向上遍历到根目录并找到 `package.json`
文件以从中运行命令。

`--run` 将 `./node_modules/.bin`  prepend 到当前目录的每个祖先的
`PATH`，以便从存在多个 `node_modules` 目录的不同文件夹执行二进制文件，如果
`ancestor-folder/node_modules/.bin` 是一个目录。

`--run` 在包含相关 `package.json` 的目录中执行命令。

例如，以下命令将运行当前文件夹中
`package.json` 的 `test` 脚本：

```console
$ node --run test
```

您也可以向命令传递参数。`--` 之后的任何参数将
附加到脚本：

```console
$ node --run test -- --verbose
```

#### intentional limitations

`node --run` 不旨在匹配 `npm run` 或其他包管理器的 `run`
命令的行为。Node.js 实现故意更有限，以便专注于最常见用例的顶级性能。
其他 `run` 实现的一些故意排除的功能是：

* 运行指定脚本之外的 `pre` 或 `post` 脚本。
* 定义特定于包管理器的环境变量。

#### 环境变量

使用 `--run` 运行脚本时设置以下环境变量：

* `NODE_RUN_SCRIPT_NAME`：正在运行的脚本的名称。例如，如果
  `--run` 用于运行 `test`，则此变量的值将为 `test`。
* `NODE_RUN_PACKAGE_JSON_PATH`：正在处理的 `package.json` 的路径。

### `--secure-heap-min=n`

<!-- YAML
added: v15.6.0
-->

当使用 `--secure-heap` 时，`--secure-heap-min` 标志指定
来自安全堆的最小分配。最小值为 `2`。
最大值为 `--secure-heap` 或 `2147483647` 中的较小者。
给定的值必须是 2 的幂。

### `--secure-heap=n`

<!-- YAML
added: v15.6.0
-->

初始化 `n` 字节的 OpenSSL 安全堆。初始化时，
安全堆用于 OpenSSL 内选定类型的分配，
在密钥生成和其他操作期间。例如，这有助于
防止敏感信息因指针溢出
或下溢而泄漏。

安全堆是固定大小的，不能在运行时调整大小，所以，
如果使用，选择足够大的堆以覆盖所有
应用程序用途很重要。

给定的堆大小必须是 2 的幂。任何小于 2 的值
将禁用安全堆。

安全堆默认禁用。

安全堆在 Windows 上不可用。

更多信息请参阅 [`CRYPTO_secure_malloc_init`][]。

### `--snapshot-blob=path`

<!-- YAML
added: v18.8.0
-->

> 稳定性：1 - 实验性

与 `--build-snapshot` 一起使用时，`--snapshot-blob` 指定
生成的快照 blob 写入的路径。如果未指定，则
生成的 blob 写入当前工作目录中的 `snapshot.blob`。

不与 `--build-snapshot` 一起使用时，`--snapshot-blob` 指定
用于恢复应用程序状态的 blob 的路径。

加载快照时，Node.js 检查：

1. 运行中的 Node.js 二进制文件的版本、架构和平台
   与生成快照的二进制文件完全相同。
2. V8 标志和 CPU 功能与生成快照的二进制文件兼容。

如果它们不匹配，Node.js 拒绝加载快照并以
状态码 1 退出。

### `--test`

<!-- YAML
added:
  - v18.1.0
  - v16.17.0
changes:
  - version: v20.0.0
    pr-url: https://github.com/nodejs/node/pull/46983
    description: 测试运行器现已稳定。
  - version:
      - v19.2.0
      - v18.13.0
    pr-url: https://github.com/nodejs/node/pull/45214
    description: 测试运行器现在支持在监视模式下运行。
-->

启动 Node.js 命令行测试运行器。此标志不能与
`--watch-path`、`--check`、`--eval`、`--interactive` 或检查器组合。
有关更多详细信息，请参阅 [从命令行运行测试][] 文档。

### `--test-concurrency`

<!-- YAML
added:
  - v21.0.0
  - v20.10.0
  - v18.19.0
-->

测试运行器 CLI 将并发执行的最大测试文件数。如果 `--test-isolation` 设置为 `'none'`，则忽略此标志并且
并发数为 1。否则，并发数默认为
`os.availableParallelism() - 1`。

### `--test-coverage-branches=threshold`

<!-- YAML
added: v22.8.0
-->

> 稳定性：1 - 实验性

要求最低百分比的覆盖分支。如果代码覆盖率未达到
指定的阈值，进程将以代码 `1` 退出。

### `--test-coverage-exclude`

<!-- YAML
added:
  - v22.5.0
-->

> 稳定性：1 - 实验性

使用 glob 模式从代码覆盖率中排除特定文件，该模式可以匹配
绝对和相对文件路径。

可以多次指定此选项以排除多个 glob 模式。

如果同时提供 `--test-coverage-exclude` 和 `--test-coverage-include`，
文件必须满足**两者**标准才能包含在覆盖率报告中。

默认情况下，所有匹配的测试文件都从覆盖率报告中排除。
指定此选项将覆盖默认行为。

### `--test-coverage-functions=threshold`

<!-- YAML
added: v22.8.0
-->

> 稳定性：1 - 实验性

要求最低百分比的覆盖函数。如果代码覆盖率未达到
指定的阈值，进程将以代码 `1` 退出。

### `--test-coverage-include`

<!-- YAML
added:
  - v22.5.0
-->

> 稳定性：1 - 实验性

使用 glob 模式将特定文件包含在代码覆盖率中，该模式可以匹配
绝对和相对文件路径。

可以多次指定此选项以包含多个 glob 模式。

如果同时提供 `--test-coverage-exclude` 和 `--test-coverage-include`，
文件必须满足**两者**标准才能包含在覆盖率报告中。

### `--test-coverage-lines=threshold`

<!-- YAML
added: v22.8.0
-->

> 稳定性：1 - 实验性

要求最低百分比的覆盖行。如果代码覆盖率未达到
指定的阈值，进程将以代码 `1` 退出。

### `--test-force-exit`

<!-- YAML
added:
  - v22.0.0
  - v20.14.0
-->

配置测试运行器在所有已知测试完成执行后退出进程，即使事件循环否则将保持活动。

### `--test-global-setup=module`

<!-- YAML
added: v24.0.0
-->

> 稳定性：1.0 - 早期开发

指定一个模块，该模块将在所有测试执行之前评估，并
可用于为测试设置全局状态或测试固件。

有关更多详细信息，请参阅 [全局设置和 teardown][] 文档。

### `--test-isolation=mode`

<!-- YAML
added: v22.8.0
changes:
  - version: v23.6.0
    pr-url: https://github.com/nodejs/node/pull/56298
    description: "该标志已从 `--experimental-test-isolation` 重命名为`--test-isolation`。"
-->

配置测试运行器中使用的测试隔离类型。当 `mode` 为
`'process'` 时，每个测试文件在单独的子进程中运行。当 `mode` 为
`'none'` 时，所有测试文件在与测试运行器相同的进程中运行。默认
隔离模式是 `'process'`。如果不存在 `--test` 标志，则忽略此标志。有关更多信息，请参阅 [测试运行器执行模型][] 部分。

### `--test-name-pattern`

<!-- YAML
added: v18.11.0
changes:
  - version: v20.0.0
    pr-url: https://github.com/nodejs/node/pull/46983
    description: 测试运行器现已稳定。
-->

一个正则表达式，配置测试运行器仅执行名称
与提供模式匹配的测试。有关更多详细信息，请参阅
[按名称过滤测试][] 文档。

如果同时提供 `--test-name-pattern` 和 `--test-skip-pattern`，
测试必须满足**两者**要求才能执行。

### `--test-only`

<!-- YAML
added:
  - v18.0.0
  - v16.17.0
changes:
  - version: v20.0.0
    pr-url: https://github.com/nodejs/node/pull/46983
    description: 测试运行器现已稳定。
-->

配置测试运行器仅执行设置了 `only`
选项的顶层测试。当禁用测试隔离时，不需要此标志。

### `--test-random-seed`

<!-- YAML
added: REPLACEME
-->

设置用于随机化测试执行顺序的种子。这适用于测试
文件执行顺序和每个文件内的排队测试。提供此标志
隐式启用随机化，即使没有 `--test-randomize`。

值必须是 `0` 到 `4294967295` 之间的整数。

此标志不能与 `--watch` 或 `--test-rerun-failures` 一起使用。

### `--test-randomize`

<!-- YAML
added: REPLACEME
-->

随机化测试执行顺序。这适用于测试文件执行顺序
和每个文件内的排队测试。这有助于检测依赖
共享状态或执行顺序的测试。

用于随机化的种子打印在测试摘要中，并可以
与 `--test-random-seed` 一起重用。

有关详细行为和示例，请参阅
[随机化测试执行顺序][]。

此标志不能与 `--watch` 或 `--test-rerun-failures` 一起使用。

### `--test-reporter`

<!-- YAML
added:
  - v19.6.0
  - v18.15.0
changes:
  - version: v20.0.0
    pr-url: https://github.com/nodejs/node/pull/46983
    description: 测试运行器现已稳定。
-->

运行测试时使用的测试报告器。有关更多详细信息，请参阅
[测试报告器][] 文档。

### `--test-reporter-destination`

<!-- YAML
added:
  - v19.6.0
  - v18.15.0
changes:
  - version: v20.0.0
    pr-url: https://github.com/nodejs/node/pull/46983
    description: 测试运行器现已稳定。
-->

相应测试报告器的目标。有关更多详细信息，请参阅
[测试报告器][] 文档。

### `--test-rerun-failures`

<!-- YAML
added:
  - v24.7.0
-->

允许测试运行器在运行之间持久化测试套件状态的文件路径。测试运行器将使用此文件来确定哪些测试
已经成功或失败，允许重新运行失败的测试
而不必重新运行整个测试套件。如果此文件不存在，测试运行器将创建它。
有关更多详细信息，请参阅 [测试重新运行][] 文档。

### `--test-shard`

<!-- YAML
added:
  - v20.5.0
  - v18.19.0
-->

以 `<index>/<total>` 格式执行的测试套件分片，其中

* `index` 是正整数，划分部分的索引。
* `total` 是正整数，划分部分的总数。

此命令将所有测试文件划分为 `total` 个相等部分，
并仅运行那些恰好在 `index` 部分中的文件。

例如，要将测试套件分为三部分，请使用此命令：

```bash
node --test --test-shard=1/3
node --test --test-shard=2/3
node --test --test-shard=3/3
```

### `--test-skip-pattern`

<!-- YAML
added:
  - v22.1.0
-->

一个正则表达式，配置测试运行器跳过名称
与提供模式匹配的测试。有关更多详细信息，请参阅
[按名称过滤测试][] 文档。

如果同时提供 `--test-name-pattern` 和 `--test-skip-pattern`，
测试必须满足**两者**要求才能执行。

### `--test-timeout`

<!-- YAML
added:
  - v21.2.0
  - v20.11.0
-->

测试执行将在之后失败的毫秒数。如果未指定，
子测试从其父级继承此值。默认值为 `Infinity`。

### `--test-update-snapshots`

<!-- YAML
added: v22.3.0
changes:
  - version:
    - v23.4.0
    - v22.13.0
    pr-url: https://github.com/nodejs/node/pull/55897
    description: 快照测试不再是实验性的。
-->

重新生成测试运行器用于 [快照测试][] 的快照文件。

### `--throw-deprecation`

<!-- YAML
added: v0.11.14
-->

为弃用抛出错误。

### `--title=title`

<!-- YAML
added: v10.7.0
-->

启动时设置 `process.title`。

### `--tls-cipher-list=list`

<!-- YAML
added: v4.0.0
-->

指定替代默认 TLS 加密套件列表。需要 Node.js 构建
时带有 crypto 支持（默认）。

### `--tls-keylog=file`

<!-- YAML
added:
 - v13.2.0
 - v12.16.0
-->

将 TLS 密钥材料记录到文件。密钥材料采用 NSS `SSLKEYLOGFILE`
格式，可由软件（如 Wireshark）用于解密 TLS
流量。

### `--tls-max-v1.2`

<!-- YAML
added:
 - v12.0.0
 - v10.20.0
-->

将 [`tls.DEFAULT_MAX_VERSION`][] 设置为 'TLSv1.2'。用于禁用对
TLSv1.3 的支持。

### `--tls-max-v1.3`

<!-- YAML
added: v12.0.0
-->

将默认 [`tls.DEFAULT_MAX_VERSION`][] 设置为 'TLSv1.3'。用于启用对
TLSv1.3 的支持。

### `--tls-min-v1.0`

<!-- YAML
added:
 - v12.0.0
 - v10.20.0
-->

将默认 [`tls.DEFAULT_MIN_VERSION`][] 设置为 'TLSv1'。用于与
旧 TLS 客户端或服务器兼容。

### `--tls-min-v1.1`

<!-- YAML
added:
 - v12.0.0
 - v10.20.0
-->

将默认 [`tls.DEFAULT_MIN_VERSION`][] 设置为 'TLSv1.1'。用于与
旧 TLS 客户端或服务器兼容。

### `--tls-min-v1.2`

<!-- YAML
added:
 - v12.2.0
 - v10.20.0
-->

将默认 [`tls.DEFAULT_MIN_VERSION`][] 设置为 'TLSv1.2'。这是 12.x 及更高版本的默认值，但支持此选项是为了与旧版 Node.js
版本兼容。

### `--tls-min-v1.3`

<!-- YAML
added: v12.0.0
-->

将默认 [`tls.DEFAULT_MIN_VERSION`][] 设置为 'TLSv1.3'。用于禁用对
TLSv1.2 的支持，它不如 TLSv1.3 安全。

### `--trace-deprecation`

<!-- YAML
added: v0.8.0
-->

打印弃用的堆栈跟踪。

### `--trace-env`

<!-- YAML
added:
  - v23.4.0
  - v22.13.0
-->

将有关当前 Node.js
实例中对环境变量进行的任何访问的信息打印到 stderr，包括：

* Node.js 内部执行的环境变量读取。
* 形式为 `process.env.KEY = "SOME VALUE"` 的写入。
* 形式为 `process.env.KEY` 的读取。
* 形式为 `Object.defineProperty(process.env, 'KEY', {...})` 的定义。
* 形式为 `Object.hasOwn(process.env, 'KEY')`、
  `process.env.hasOwnProperty('KEY')` 或 `'KEY' in process.env` 的查询。
* 形式为 `delete process.env.KEY` 的删除。
* 形式为 `...process.env` 或 `Object.keys(process.env)` 的枚举。

仅打印被访问的环境变量的名称。不打印值。

要打印访问的堆栈跟踪，请使用 `--trace-env-js-stack` 和/或
`--trace-env-native-stack`。

### `--trace-env-js-stack`

<!-- YAML
added:
  - v23.4.0
  - v22.13.0
-->

除了 `--trace-env` 所做的之外，这还打印访问的 JavaScript 堆栈跟踪。

### `--trace-env-native-stack`

<!-- YAML
added:
  - v23.4.0
  - v22.13.0
-->

除了 `--trace-env` 所做的之外，这还打印访问的原生堆栈跟踪。

### `--trace-event-categories`

<!-- YAML
added: v7.7.0
-->

当使用 `--trace-events-enabled` 启用跟踪事件跟踪时，应跟踪的逗号分隔类别列表。

### `--trace-event-file-pattern`

<!-- YAML
added: v9.8.0
-->

指定跟踪事件数据文件路径的模板字符串，它
支持 `${rotation}` 和 `${pid}`。

### `--trace-events-enabled`

<!-- YAML
added: v7.7.0
-->

启用跟踪事件跟踪信息的收集。

### `--trace-exit`

<!-- YAML
added:
 - v13.5.0
 - v12.16.0
-->

每当环境被主动退出时打印堆栈跟踪，
即调用 `process.exit()`。

### `--trace-require-module=mode`

<!-- YAML
added:
 - v23.5.0
 - v22.13.0
 - v20.19.0
-->

打印有关 [使用 `require()` 加载 ECMAScript 模块][] 使用情况的信息。

当 `mode` 为 `all` 时，打印所有使用情况。当 `mode` 为 `no-node-modules` 时，排除
来自 `node_modules` 文件夹的使用情况。

### `--trace-sigint`

<!-- YAML
added:
 - v13.9.0
 - v12.17.0
-->

在 SIGINT 上打印堆栈跟踪。

### `--trace-sync-io`

<!-- YAML
added: v2.1.0
-->

每当在事件循环的第一轮之后检测到同步 I/O 时打印堆栈跟踪。

### `--trace-tls`

<!-- YAML
added: v12.2.0
-->

将 TLS 数据包跟踪信息打印到 `stderr`。这可用于调试 TLS
连接问题。

### `--trace-uncaught`

<!-- YAML
added: v13.1.0
-->

打印未捕获异常的堆栈跟踪；通常，打印与
创建 `Error` 关联的堆栈跟踪，而这使 Node.js 还
打印与抛出值关联的堆栈跟踪（该值不必
是 `Error` 实例）。

启用此选项可能会对垃圾回收行为产生负面影响。

### `--trace-warnings`

<!-- YAML
added: v6.0.0
-->

打印进程警告（包括弃用）的堆栈跟踪。

### `--track-heap-objects`

<!-- YAML
added: v2.4.0
-->

跟踪堆对象分配以用于堆快照。

### `--unhandled-rejections=mode`

<!-- YAML
added:
  - v12.0.0
  - v10.17.0
changes:
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/33021
    description: "默认模式更改为 `throw`。以前，发出警告。"
-->

使用此标志允许更改发生未处理拒绝时应发生的情况。可以选择以下模式之一：

* `throw`：发出 [`unhandledRejection`][]。如果未设置此钩子，则将未处理的拒绝作为未捕获异常抛出。这是默认值。
* `strict`：将未处理的拒绝作为未捕获异常抛出。如果异常已处理，则发出 [`unhandledRejection`][]。
* `warn`：始终触发警告，无论是否设置了 [`unhandledRejection`][]
  钩子，但不打印弃用警告。
* `warn-with-error-code`：发出 [`unhandledRejection`][]。如果未设置此钩子，则触发警告，并将进程退出代码设置为 1。
* `none`：静默所有警告。

如果在命令行入口点的 ES 模块静态
加载阶段发生拒绝，它将始终将其作为未捕获异常抛出。

### `--use-bundled-ca`, `--use-openssl-ca`

<!-- YAML
added: v6.11.0
-->

使用当前 Node.js 版本提供的捆绑 Mozilla CA 存储
或使用 OpenSSL 的默认 CA 存储。默认存储可在
构建时选择。

Node.js 提供的捆绑 CA 存储是发布时固定的 Mozilla CA 存储
快照。它在所有支持的平台上都是相同的。

使用 OpenSSL 存储允许对外部修改存储。对于大多数
Linux 和 BSD 发行版，此存储由发行版
维护者和系统管理员维护。OpenSSL CA 存储位置取决于
OpenSSL 库的配置，但这可以在运行时使用
环境变量更改。

请参阅 `SSL_CERT_DIR` 和 `SSL_CERT_FILE`。

### `--use-env-proxy`

<!-- YAML
added:
 - v24.5.0
 - v22.21.0
-->

> 稳定性：1.1 - 积极开发

启用时，Node.js 在启动期间解析 `HTTP_PROXY`、`HTTPS_PROXY` 和 `NO_PROXY`
环境变量，并通过
指定代理隧道传输请求。

这等效于设置 [`NODE_USE_ENV_PROXY=1`][] 环境变量。
当两者都设置时，`--use-env-proxy` 优先。

### `--use-largepages=mode`

<!-- YAML
added:
 - v13.6.0
 - v12.17.0
-->

启动时将 Node.js 静态代码重映射到大内存页。如果在
目标系统上支持，这将导致 Node.js 静态代码移动到 2
MiB 页而不是 4 KiB 页。

`mode` 的有效值如下：

* `off`：不会尝试映射。这是默认值。
* `on`：如果 OS 支持，将尝试映射。映射失败将
  被忽略，并且消息将打印到标准错误。
* `silent`：如果 OS 支持，将尝试映射。映射失败将
  被忽略，并且不会报告。

### `--use-system-ca`

<!-- YAML
added: v23.8.0
changes:
  - version: v23.9.0
    pr-url: https://github.com/nodejs/node/pull/57009
    description: 添加了在非 Windows 和非 macOS 上的支持。
-->

Node.js 使用系统存储中存在的受信任 CA 证书，以及
`--use-bundled-ca` 选项和 `NODE_EXTRA_CA_CERTS` 环境变量。
在 Windows 和 macOS 以外的平台上，这从 OpenSSL 信任的目录
和文件加载证书，类似于 `--use-openssl-ca`，不同之处在于
它在首次加载后缓存证书。

在 Windows 和 macOS 上，证书信任策略类似于
[Chromium 的本地受信任证书策略][]，但有一些差异：

在 macOS 上，尊重以下设置：

* 默认和系统钥匙串
  * 信任：
    * 任何“使用此证书时”标志设置为“始终信任”的证书，或
    * 任何“安全套接字层 (SSL)"标志设置为“始终信任”的证书。
  * 证书还必须有效，且"X.509 基本策略”设置为“始终信任”。

在 Windows 上，尊重以下设置：

* 本地计算机（通过 `certlm.msc` 访问）
  * 信任：
    * 受信任的根证书颁发机构
    * 受信任的人员
    * 企业信任 -> 企业 -> 受信任的根证书颁发机构
    * 企业信任 -> 企业 -> 受信任的人员
    * 企业信任 -> 组策略 -> 受信任的根证书颁发机构
    * 企业信任 -> 组策略 -> 受信任的人员
* 当前用户（通过 `certmgr.msc` 访问）
  * 信任：
    * 受信任的根证书颁发机构
    * 企业信任 -> 组策略 -> 受信任的根证书颁发机构

在 Windows 和 macOS 上，Node.js 会在使用受信任
证书之前检查用户的设置是否未禁止它们用于 TLS 服务器身份验证。

Node.js 当前不支持基于系统设置从不信任/吊销来自其他来源的证书。

在其他系统上，Node.js 从默认证书文件
（通常为 `/etc/ssl/cert.pem`）和默认证书目录（通常为
`/etc/ssl/certs`）加载证书，Node.js 链接的 OpenSSL 版本尊重这些证书。
这通常适用于主要 Linux 发行版和其他
类 Unix 系统上的约定。如果覆盖了 OpenSSL 环境变量
（通常为 `SSL_CERT_FILE` 和 `SSL_CERT_DIR`，取决于 Node.js 链接的 OpenSSL 的配置
），则将使用指定路径加载
证书。如果 Node.js 链接的 OpenSSL 版本使用的约定路径
由于某种原因与用户拥有的系统配置不一致，这些环境变量可用作变通方法。

### `--v8-options`

<!-- YAML
added: v0.1.3
-->

打印 V8 命令行选项。

### `--v8-pool-size=num`

<!-- YAML
added: v5.10.0
-->

设置 V8 的线程池大小，这将用于分配后台任务。

如果设置为 `0`，则 Node.js 将根据并行度的估计值选择适当的线程池大小。

并行度是指在给定机器中可以
同时进行的计算数量。通常，它与
CPU 数量相同，但在 VM 或容器等环境中可能不同。

### `-v`, `--version`

<!-- YAML
added: v0.1.3
-->

打印 node 的版本。

### `--watch`

<!-- YAML
added:
  - v18.11.0
  - v16.19.0
changes:
  - version:
    - v22.0.0
    - v20.13.0
    pr-url: https://github.com/nodejs/node/pull/52074
    description: 监视模式现已稳定。
  - version:
      - v19.2.0
      - v18.13.0
    pr-url: https://github.com/nodejs/node/pull/45214
    description: 测试运行器现在支持在监视模式下运行。
-->

以监视模式启动 Node.js。
在监视模式下，被监视文件中的更改会导致 Node.js 进程
重启。
默认情况下，监视模式将监视入口点
和任何 required 或 imported 模块。
使用 `--watch-path` 指定要监视的路径。

此标志不能与
`--check`、`--eval`、`--interactive` 或 REPL 组合。

注意：`--watch` 标志需要文件路径作为参数，并且与
`--run` 或内联脚本输入不兼容，因为 `--run` 优先并忽略监视
模式。如果未提供文件，Node.js 将以状态码 `9` 退出。

```bash
node --watch index.js
```

### `--watch-kill-signal`

<!-- YAML
added:
  - v24.4.0
  - v22.18.0
-->

> 稳定性：1.1 - 积极开发

自定义在监视模式重启时发送给进程的信号。

```bash
node --watch --watch-kill-signal SIGINT test.js
```

### `--watch-path`

<!-- YAML
added:
  - v18.11.0
  - v16.19.0
changes:
  - version:
    - v22.0.0
    - v20.13.0
    pr-url: https://github.com/nodejs/node/pull/52074
    description: 监视模式现已稳定。
-->

以监视模式启动 Node.js 并指定要监视的路径。
在监视模式下，被监视路径中的更改会导致 Node.js 进程
重启。
即使与 `--watch` 组合使用，这也将关闭对 required 或 imported 模块的监视。

此标志不能与
`--check`、`--eval`、`--interactive`、`--test` 或 REPL 组合。

注意：使用 `--watch-path` 隐式启用 `--watch`，这需要文件路径
并且与 `--run` 不兼容，因为 `--run` 优先并忽略监视模式。

```bash
node --watch-path=./src --watch-path=./tests index.js
```

此选项仅在 macOS 和 Windows 上支持。
当在不支持它的平台上使用此选项时，将抛出
`ERR_FEATURE_UNAVAILABLE_ON_PLATFORM` 异常。

### `--watch-preserve-output`

<!-- YAML
added:
  - v19.3.0
  - v18.13.0
-->

禁用当监视模式重启进程时清除控制台。

```bash
node --watch --watch-preserve-output test.js
```

### `--zero-fill-buffers`

<!-- YAML
added: v6.0.0
-->

自动零填充所有新分配的 [`Buffer`][] 实例。

## 环境变量

> 稳定性：2 - 稳定

### `FORCE_COLOR=[1, 2, 3]`

`FORCE_COLOR` 环境变量用于启用 ANSI 彩色输出。该值可以是：

* `1`、`true` 或空字符串 `''` 表示支持 16 色，
* `2` 表示支持 256 色，或
* `3` 表示支持 1600 万色。

当使用 `FORCE_COLOR` 并设置为支持的值时，`NO_COLOR` 和 `NODE_DISABLE_COLORS` 环境变量都会被忽略。

任何其他值将导致彩色输出被禁用。

### `NODE_COMPILE_CACHE=dir`

<!-- YAML
added: v22.1.0
changes:
  - version:
     - v25.4.0
     - v24.15.0
    pr-url: https://github.com/nodejs/node/pull/60971
    description: 此功能不再是实验性的。
-->

为 Node.js 实例启用 [模块编译缓存][]。有关详细信息，请参阅 [模块编译缓存][] 的文档。

### `NODE_COMPILE_CACHE_PORTABLE=1`

当设置为 1 时，只要模块布局相对于缓存目录保持不变，[模块编译缓存][] 就可以在不同的目录位置之间重用。

### `NODE_DEBUG=module[,…]`

<!-- YAML
added: v0.1.32
-->

应打印调试信息的核心模块的 `','` 分隔列表。

### `NODE_DEBUG_NATIVE=module[,…]`

应打印调试信息的核心 C++ 模块的 `','` 分隔列表。

### `NODE_DISABLE_COLORS=1`

<!-- YAML
added: v0.3.0
-->

设置后，REPL 中将不使用颜色。

### `NODE_DISABLE_COMPILE_CACHE=1`

<!-- YAML
added: v22.8.0
-->

> 稳定性：1.1 - 积极开发中

为 Node.js 实例禁用 [模块编译缓存][]。有关详细信息，请参阅 [模块编译缓存][] 的文档。

### `NODE_EXTRA_CA_CERTS=file`

<!-- YAML
added: v7.3.0
-->

设置后，众所周知的“根”CA（如 VeriSign）将扩展 `file` 中的额外证书。该文件应包含一个或多个 PEM 格式的受信任证书。如果文件丢失或格式错误，将发出一次消息（使用 [`process.emitWarning()`][emit_warning]），否则任何错误都将被忽略。

当为 TLS 或 HTTPS 客户端或服务器显式指定 `ca` 选项属性时，既不使用众所周知的证书，也不使用额外证书。

当 `node` 作为 setuid root 运行或设置了 Linux 文件能力时，此环境变量将被忽略。

`NODE_EXTRA_CA_CERTS` 环境变量仅在 Node.js 进程首次启动时读取。在运行时使用 `process.env.NODE_EXTRA_CA_CERTS` 更改值对当前进程无效。

### `NODE_ICU_DATA=file`

<!-- YAML
added: v0.11.15
-->

ICU（`Intl` 对象）数据的数据路径。当编译为支持 small-icu 时，将扩展链接的数据。

### `NODE_NO_WARNINGS=1`

<!-- YAML
added: v6.11.0
-->

当设置为 `1` 时，进程警告将被静音。

### `NODE_OPTIONS=options...`

<!-- YAML
added: v8.0.0
-->

空格分隔的命令行选项列表。`options...` 在命令行选项之前解释，因此命令行选项将覆盖或在 `options...` 中的任何内容之后复合。如果使用了环境中不允许的选项（例如 `-p` 或脚本文件），Node.js 将退出并报错。

如果选项值包含空格，可以使用双引号转义：

```bash
NODE_OPTIONS='--require "./my path/file.js"'
```

作为命令行选项传递的单例标志将覆盖传递给 `NODE_OPTIONS` 的相同标志：

```bash
# 检查器将在端口 5555 上可用
NODE_OPTIONS='--inspect=localhost:4444' node --inspect=localhost:5555
```

可以多次传递的标志将被视为先传递其 `NODE_OPTIONS` 实例，然后再传递其命令行实例：

```bash
NODE_OPTIONS='--require "./a.js"' node --require "./b.js"
# 等同于：
node --require "./a.js" --require "./b.js"
```

允许的 Node.js 选项在以下列表中。如果选项同时支持 --XX 和 --no-XX 变体，则两者都支持，但下面的列表中只包含其中一个。

<!-- node-options-node start -->

* `--allow-addons`
* `--allow-child-process`
* `--allow-ffi`
* `--allow-fs-read`
* `--allow-fs-write`
* `--allow-inspector`
* `--allow-net`
* `--allow-wasi`
* `--allow-worker`
* `--conditions`, `-C`
* `--cpu-prof-dir`
* `--cpu-prof-interval`
* `--cpu-prof-name`
* `--cpu-prof`
* `--diagnostic-dir`
* `--disable-proto`
* `--disable-sigusr1`
* `--disable-warning`
* `--disable-wasm-trap-handler`
* `--dns-result-order`
* `--enable-fips`
* `--enable-network-family-autoselection`
* `--enable-source-maps`
* `--entry-url`
* `--experimental-abortcontroller`
* `--experimental-addon-modules`
* `--experimental-detect-module`
* `--experimental-eventsource`
* `--experimental-ffi`
* `--experimental-import-meta-resolve`
* `--experimental-json-modules`
* `--experimental-loader`
* `--experimental-modules`
* `--experimental-print-required-tla`
* `--experimental-quic`
* `--experimental-require-module`
* `--experimental-shadow-realm`
* `--experimental-specifier-resolution`
* `--experimental-stream-iter`
* `--experimental-test-isolation`
* `--experimental-top-level-await`
* `--experimental-vm-modules`
* `--experimental-wasi-unstable-preview1`
* `--force-context-aware`
* `--force-fips`
* `--force-node-api-uncaught-exceptions-policy`
* `--frozen-intrinsics`
* `--heap-prof-dir`
* `--heap-prof-interval`
* `--heap-prof-name`
* `--heap-prof`
* `--heapsnapshot-near-heap-limit`
* `--heapsnapshot-signal`
* `--http-parser`
* `--icu-data-dir`
* `--import`
* `--input-type`
* `--insecure-http-parser`
* `--inspect-brk`
* `--inspect-port`, `--debug-port`
* `--inspect-publish-uid`
* `--inspect-wait`
* `--inspect`
* `--localstorage-file`
* `--max-http-header-size`
* `--max-old-space-size-percentage`
* `--napi-modules`
* `--network-family-autoselection-attempt-timeout`
* `--no-addons`
* `--no-async-context-frame`
* `--no-deprecation`
* `--no-experimental-global-navigator`
* `--no-experimental-repl-await`
* `--no-experimental-sqlite`
* `--no-experimental-strip-types`
* `--no-experimental-websocket`
* `--no-experimental-webstorage`
* `--no-extra-info-on-fatal-exception`
* `--no-force-async-hooks-checks`
* `--no-global-search-paths`
* `--no-network-family-autoselection`
* `--no-strip-types`
* `--no-warnings`
* `--no-webstorage`
* `--node-memory-debug`
* `--openssl-config`
* `--openssl-legacy-provider`
* `--openssl-shared-config`
* `--pending-deprecation`
* `--permission-audit`
* `--permission`
* `--preserve-symlinks-main`
* `--preserve-symlinks`
* `--prof-process`
* `--redirect-warnings`
* `--report-compact`
* `--report-dir`, `--report-directory`
* `--report-exclude-env`
* `--report-exclude-network`
* `--report-filename`
* `--report-on-fatalerror`
* `--report-on-signal`
* `--report-signal`
* `--report-uncaught-exception`
* `--require-module`
* `--require`, `-r`
* `--secure-heap-min`
* `--secure-heap`
* `--snapshot-blob`
* `--test-coverage-branches`
* `--test-coverage-exclude`
* `--test-coverage-functions`
* `--test-coverage-include`
* `--test-coverage-lines`
* `--test-global-setup`
* `--test-isolation`
* `--test-name-pattern`
* `--test-only`
* `--test-random-seed`
* `--test-randomize`
* `--test-reporter-destination`
* `--test-reporter`
* `--test-rerun-failures`
* `--test-shard`
* `--test-skip-pattern`
* `--throw-deprecation`
* `--title`
* `--tls-cipher-list`
* `--tls-keylog`
* `--tls-max-v1.2`
* `--tls-max-v1.3`
* `--tls-min-v1.0`
* `--tls-min-v1.1`
* `--tls-min-v1.2`
* `--tls-min-v1.3`
* `--trace-deprecation`
* `--trace-env-js-stack`
* `--trace-env-native-stack`
* `--trace-env`
* `--trace-event-categories`
* `--trace-event-file-pattern`
* `--trace-events-enabled`
* `--trace-exit`
* `--trace-require-module`
* `--trace-sigint`
* `--trace-sync-io`
* `--trace-tls`
* `--trace-uncaught`
* `--trace-warnings`
* `--track-heap-objects`
* `--unhandled-rejections`
* `--use-bundled-ca`
* `--use-env-proxy`
* `--use-largepages`
* `--use-openssl-ca`
* `--use-system-ca`
* `--v8-pool-size`
* `--watch-kill-signal`
* `--watch-path`
* `--watch-preserve-output`
* `--watch`
* `--zero-fill-buffers`

<!-- node-options-node end -->

允许的 V8 选项有：

<!-- node-options-v8 start -->

* `--abort-on-uncaught-exception`
* `--disallow-code-generation-from-strings`
* `--enable-etw-stack-walking`
* `--expose-gc`
* `--interpreted-frames-native-stack`
* `--jitless`
* `--max-heap-size`
* `--max-old-space-size`
* `--max-semi-space-size`
* `--perf-basic-prof-only-functions`
* `--perf-basic-prof`
* `--perf-prof-unwinding-info`
* `--perf-prof`
* `--stack-trace-limit`

<!-- node-options-v8 end -->

<!-- node-options-others start -->

`--perf-basic-prof-only-functions`、`--perf-basic-prof`、`--perf-prof-unwinding-info` 和 `--perf-prof` 仅在 Linux 上可用。

`--enable-etw-stack-walking` 仅在 Windows 上可用。

<!-- node-options-others end -->

### `NODE_PATH=path[:…]`

<!-- YAML
added: v0.1.32
-->

前缀添加到模块搜索路径的 `':'` 分隔目录列表。

在 Windows 上，这是一个 `';'` 分隔的列表。

### `NODE_PENDING_DEPRECATION=1`

<!-- YAML
added: v8.0.0
-->

当设置为 `1` 时，发出待弃用警告。

待弃用通常与运行时弃用相同，但显著的区别在于它们默认是_关闭_的，除非设置了 `--pending-deprecation` 命令行标志或 `NODE_PENDING_DEPRECATION=1` 环境变量，否则不会发出。待弃用用于提供一种选择性“早期警告”机制，开发人员可以利用它来检测已弃用的 API 使用情况。

### `NODE_PENDING_PIPE_INSTANCES=instances`

设置管道服务器等待连接时的待处理管道实例句柄数。此设置仅适用于 Windows。

### `NODE_PRESERVE_SYMLINKS=1`

<!-- YAML
added: v7.1.0
-->

当设置为 `1` 时，指示模块加载器在解析和缓存模块时保留符号链接。

### `NODE_REDIRECT_WARNINGS=file`

<!-- YAML
added: v8.0.0
-->

设置后，进程警告将发送到给定文件，而不是打印到 stderr。如果文件不存在，将创建该文件；如果存在，将追加内容。如果尝试将警告写入文件时发生错误，警告将改为写入 stderr。这等同于使用 `--redirect-warnings=file` 命令行标志。

### `NODE_REPL_EXTERNAL_MODULE=file`

<!-- YAML
added:
 - v13.0.0
 - v12.16.0
changes:
  - version:
     - v22.3.0
     - v20.16.0
    pr-url: https://github.com/nodejs/node/pull/52905
    description:
      删除了将此环境变量与 kDisableNodeOptionsEnv 一起用于嵌入器的可能性。
-->

将在内置 REPL 的位置加载的 Node.js 模块的路径。将此值覆盖为空字符串 (`''`) 将使用内置 REPL。

### `NODE_REPL_HISTORY=file`

<!-- YAML
added: v3.0.0
-->

用于存储持久 REPL 历史的文件路径。默认路径是 `~/.node_repl_history`，此变量将覆盖该路径。将值设置为空字符串 (`''` 或 `' '`) 将禁用持久 REPL 历史。

### `NODE_SKIP_PLATFORM_CHECK=value`

<!-- YAML
added: v14.5.0
-->

如果 `value` 等于 `'1'`，则在 Node.js 启动期间跳过对支持平台的检查。Node.js 可能无法正确执行。在不支持的平台上遇到的任何问题都不会被修复。

### `NODE_TEST_CONTEXT=value`

如果 `value` 等于 `'child'`，测试报告器选项将被覆盖，测试输出将以 TAP 格式发送到 stdout。如果提供任何其它值，Node.js 不保证使用的报告器格式或其稳定性。

### `NODE_TLS_REJECT_UNAUTHORIZED=value`

如果 `value` 等于 `'0'`，则禁用 TLS 连接的证书验证。这使得 TLS 以及扩展的 HTTPS 变得不安全。强烈不鼓励使用此环境变量。

### `NODE_USE_ENV_PROXY=1`

<!-- YAML
added:
 - v24.0.0
 - v22.21.0
-->

> 稳定性：1.1 - 积极开发中

启用后，Node.js 将在启动期间解析 `HTTP_PROXY`、`HTTPS_PROXY` 和 `NO_PROXY` 环境变量，并通过指定的代理隧道请求。

也可以使用 [`--use-env-proxy`][] 命令行标志启用此功能。当两者都设置时，`--use-env-proxy` 优先。

### `NODE_USE_SYSTEM_CA=1`

<!-- YAML
added:
 - v24.6.0
 - v22.19.0
-->

Node.js 使用系统存储中存在的受信任 CA 证书，以及 `--use-bundled-ca` 选项和 `NODE_EXTRA_CA_CERTS` 环境变量。

也可以使用 [`--use-system-ca`][] 命令行标志启用此功能。当两者都设置时，`--use-system-ca` 优先。

### `NODE_V8_COVERAGE=dir`

设置后，Node.js 将开始输出 [V8 JavaScript 代码覆盖率][] 和 [Source Map][] 数据到作为参数提供的目录（覆盖信息以 JSON 形式写入带有 `coverage` 前缀的文件）。

`NODE_V8_COVERAGE` 将自动传播到子进程，使得检测调用 `child_process.spawn()` 系列函数的应用程序更容易。`NODE_V8_COVERAGE` 可以设置为空字符串，以防止传播。

#### 覆盖率输出

覆盖率作为 [ScriptCoverage][] 对象数组输出在顶层键 `result` 上：

```json
{
  "result": [
    {
      "scriptId": "67",
      "url": "internal/tty.js",
      "functions": []
    }
  ]
}
```

#### 源代码映射缓存

> 稳定性：1 - 实验性

如果找到，源代码映射数据将附加到 JSON 覆盖率对象的顶层键 `source-map-cache` 上。

`source-map-cache` 是一个对象，其键表示提取源代码映射的文件，其值包括原始源代码映射 URL（在 `url` 键中）、解析后的 Source Map v3 信息（在 `data` 键中）和源文件的行长度（在 `lineLengths` 键中）。

```json
{
  "result": [
    {
      "scriptId": "68",
      "url": "file:///absolute/path/to/source.js",
      "functions": []
    }
  ],
  "source-map-cache": {
    "file:///absolute/path/to/source.js": {
      "url": "./path-to-map.json",
      "data": {
        "version": 3,
        "sources": [
          "file:///absolute/path/to/original.js"
        ],
        "names": [
          "Foo",
          "console",
          "info"
        ],
        "mappings": "MAAMA,IACJC,YAAaC",
        "sourceRoot": "./"
      },
      "lineLengths": [
        13,
        62,
        38,
        27
      ]
    }
  }
}
```

### `NO_COLOR=<any>`

[`NO_COLOR`][] 是 `NODE_DISABLE_COLORS` 的别名。环境变量的值是任意的。

### `OPENSSL_CONF=file`

<!-- YAML
added: v6.11.0
-->

在启动时加载 OpenSSL 配置文件。除其他用途外，如果 Node.js 是使用 `./configure --openssl-fips` 构建的，这可用于启用符合 FIPS 标准的加密。

如果使用了 [`--openssl-config`][] 命令行选项，则忽略环境变量。

### `SSL_CERT_DIR=dir`

<!-- YAML
added: v7.7.0
-->

如果启用了 `--use-openssl-ca`，或者在 macOS 和 Windows 以外的平台上启用了 `--use-system-ca`，这将覆盖并设置 OpenSSL 包含受信任证书的目录。

请注意，除非显式设置子环境，否则任何子进程都将继承此环境变量，如果它们使用 OpenSSL，可能会导致它们信任与 node 相同的 CA。

### `SSL_CERT_FILE=file`

<!-- YAML
added: v7.7.0
-->

如果启用了 `--use-openssl-ca`，或者在 macOS 和 Windows 以外的平台上启用了 `--use-system-ca`，这将覆盖并设置 OpenSSL 包含受信任证书的文件。

请注意，除非显式设置子环境，否则任何子进程都将继承此环境变量，如果它们使用 OpenSSL，可能会导致它们信任与 node 相同的 CA。

### `TZ`

<!-- YAML
added: v0.0.1
changes:
  - version:
     - v16.2.0
    pr-url: https://github.com/nodejs/node/pull/38642
    description:
      使用 process.env.TZ = 更改 TZ 变量也会在 Windows 上更改时区。
  - version:
     - v13.0.0
    pr-url: https://github.com/nodejs/node/pull/20026
    description:
      使用 process.env.TZ = 更改 TZ 变量会在 POSIX 系统上更改时区。
-->

`TZ` 环境变量用于指定时区配置。

虽然 Node.js 不支持 [`TZ` 在其他环境中的处理方式][] 的所有各种方式，但它支持基本的 [时区 ID][]（例如 `'Etc/UTC'`、`'Europe/Paris'` 或 `'America/New_York'`）。它可能支持一些其他缩写或别名，但强烈不鼓励使用且不保证支持。

```console
$ TZ=Europe/Dublin node -pe "new Date().toString()"
Wed May 12 2021 20:30:48 GMT+0100 (Irish Standard Time)
```

### `UV_THREADPOOL_SIZE=size`

将 libuv 线程池中使用的线程数设置为 `size` 个线程。

只要可能，Node.js 就会使用异步系统 API，但在它们不存在的地方，libuv 的线程池用于基于同步系统 API 创建异步 node API。使用线程池的 Node.js API 有：

* 所有 `fs` API，除了文件监视器 API 和那些明确同步的 API
* 异步加密 API，例如 `crypto.pbkdf2()`、`crypto.scrypt()`、`crypto.randomBytes()`、`crypto.randomFill()`、`crypto.generateKeyPair()`
* `dns.lookup()`
* 所有 `zlib` API，除了那些明确同步的 API

因为 libuv 的线程池大小是固定的，这意味着如果出于任何原因这些 API 中的任何一个花费很长时间，其他（看似无关的）在 libuv 线程池中运行的 API 将经历性能下降。为了缓解此问题，一个潜在的解决方案是通过将 `'UV_THREADPOOL_SIZE'` 环境变量设置为大于 `4`（其当前默认值）的值来增加 libuv 线程池的大小。但是，在进程内部使用 `process.env.UV_THREADPOOL_SIZE=size` 设置此值不能保证有效，因为线程池将在用户代码运行之前作为运行时初始化的一部分创建。有关更多信息，请参阅 [libuv 线程池文档][]。

## 有用的 V8 选项

V8 有一套自己的 CLI 选项。任何提供给 `node` 的 V8 CLI 选项都将传递给 V8 处理。V8 的选项_无稳定性保证_。V8 团队本身并不认为它们是其正式 API 的一部分，并保留随时更改它们的权利。同样，它们也不受 Node.js 稳定性保证的覆盖。许多 V8 选项仅与 V8 开发人员有关。尽管如此，仍有一小部分 V8 选项广泛适用于 Node.js，在此文档中：

<!-- v8-options start -->

### `--abort-on-uncaught-exception`

### `--disallow-code-generation-from-strings`

### `--enable-etw-stack-walking`

### `--expose-gc`

### `--harmony-shadow-realm`

### `--heap-snapshot-on-oom`

### `--interpreted-frames-native-stack`

### `--jitless`

### `--max-heap-size`

指定进程的最大堆大小（以兆字节为单位）。

此选项通常用于限制进程可用于其 JavaScript 堆的内存量。

<!-- 锚点以确保旧链接能找到目标 -->

<a id="--max-old-space-sizesize-in-megabytes"></a>

### `--max-old-space-size=SIZE` (单位：MiB)

设置 V8 旧内存部分的最大内存大小。当内存消耗接近限制时，V8 将花费更多时间在垃圾回收上，以努力释放未使用的内存。

在具有 2 GiB 内存的机器上，考虑将其设置为 1536（1.5 GiB），以便为其他用途留出一些内存并避免交换。

```bash
node --max-old-space-size=1536 index.js
```

<!-- 锚点以确保旧链接能找到目标 -->

<a id="--max-semi-space-sizesize-in-megabytes"></a>

### `--max-semi-space-size=SIZE` (单位：MiB)

设置 V8 的 [Scavenge 垃圾收集器][] 的最大 [半空间][] 大小，单位为 MiB（兆二进制字节）。
增加半空间的最大大小可能会提高 Node.js 的吞吐量，但代价是消耗更多内存。

由于 V8 堆的新生代大小是半空间大小的三倍（参见 V8 中的 [`YoungGenerationSizeFromSemiSpaceSize`][]），因此半空间增加 1 MiB 会应用于三个独立的半空间中的每一个，并导致堆大小增加 3 MiB。吞吐量的改进取决于您的工作负载（参见 [#42511][]）。

默认值取决于内存限制。例如，在内存限制为 512 MiB 的 64 位系统上，半空间的最大大小默认为 1 MiB。对于高达 2GiB（含）的内存限制，在 64 位系统上半空间的默认最大大小将小于 16 MiB。

为了获得应用程序的最佳配置，您在运行应用程序基准测试时应尝试不同的 max-semi-space-size 值。

例如在 64 位系统上进行基准测试：

```bash
for MiB in 16 32 64 128; do
    node --max-semi-space-size=$MiB index.js
done
```

### `--perf-basic-prof`

### `--perf-basic-prof-only-functions`

### `--perf-prof`

### `--perf-prof-unwinding-info`

### `--prof`

### `--security-revert`

### `--stack-trace-limit=limit`

错误堆栈跟踪中收集的最大堆栈帧数。
将其设置为 0 可禁用堆栈跟踪收集。默认值为 10。

```bash
node --stack-trace-limit=12 -p -e "Error.stackTraceLimit" # 输出 12
```

<!-- v8-options end -->

[#42511]: https://github.com/nodejs/node/issues/42511
[Chrome DevTools 协议]: https://chromedevtools.github.io/devtools-protocol/
[Chromium 关于本地信任证书的策略]: https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/faq.md#does-the-chrome-certificate-verifier-consider-local-trust-decisions
[CommonJS 模块]: modules.md
[DEP0025 警告]: deprecations.md#dep0025-requirenodesys
[ECMAScript 模块]: esm.md#modules-ecmascript-modules
[EventSource Web API]: https://html.spec.whatwg.org/multipage/server-sent-events.html#server-sent-events
[ExperimentalWarning: `vm.measureMemory` 是一个实验性功能]: vm.md#vmmeasurememoryoptions
[文件系统权限]: permissions.md#file-system-permissions
[使用 require() 加载 ECMAScript 模块]: modules.md#loading-ecmascript-modules-using-require
[模块解析和加载]: packages.md#module-resolution-and-loading
[Navigator API]: globals.md#navigator
[Node.js 问题追踪器]: https://github.com/nodejs/node/issues
[OSSL_PROVIDER-legacy]: https://www.openssl.org/docs/man3.0/man7/OSSL_PROVIDER-legacy.html
[权限模型]: permissions.md#permission-model
[REPL]: repl.md
[ScriptCoverage]: https://chromedevtools.github.io/devtools-protocol/tot/Profiler#type-ScriptCoverage
[ShadowRealm]: https://github.com/tc39/proposal-shadowrealm
[Source Map]: https://tc39.es/ecma426/
[TypeScript 类型剥离]: typescript.md#type-stripping
[Node.js 的 V8 Inspector 集成]: debugger.md#v8-inspector-integration-for-nodejs
[V8 JavaScript 代码覆盖率]: https://v8project.blogspot.com/2017/12/javascript-code-coverage.html
[`"type"`]: packages.md#type
[`--allow-addons`]: #--allow-addons
[`--allow-child-process`]: #--allow-child-process
[`--allow-fs-read`]: #--allow-fs-read
[`--allow-fs-write`]: #--allow-fs-write
[`--allow-net`]: #--allow-net
[`--allow-wasi`]: #--allow-wasi
[`--allow-worker`]: #--allow-worker
[`--build-snapshot`]: #--build-snapshot
[`--cpu-prof-dir`]: #--cpu-prof-dir
[`--diagnostic-dir`]: #--diagnostic-dirdirectory
[`--disable-sigusr1`]: #--disable-sigusr1
[`--env-file-if-exists`]: #--env-file-if-existsfile
[`--env-file`]: #--env-filefile
[`--experimental-sea-config`]: single-executable-applications.md#1-generating-single-executable-preparation-blobs
[`--heap-prof-dir`]: #--heap-prof-dir
[`--import`]: #--importmodule
[`--no-require-module`]: #--no-require-module
[`--no-strip-types`]: #--no-strip-types
[`--openssl-config`]: #--openssl-configfile
[`--preserve-symlinks`]: #--preserve-symlinks
[`--print`]: #-p---print-script
[`--redirect-warnings`]: #--redirect-warningsfile
[`--require`]: #-r---require-module
[`--use-env-proxy`]: #--use-env-proxy
[`--use-system-ca`]: #--use-system-ca
[`AsyncLocalStorage`]: async_context.md#class-asynclocalstorage
[`Buffer`]: buffer.md#class-buffer
[`CRYPTO_secure_malloc_init`]: https://www.openssl.org/docs/man3.0/man3/CRYPTO_secure_malloc_init.html
[`ERR_INVALID_TYPESCRIPT_SYNTAX`]: errors.md#err_invalid_typescript_syntax
[`ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX`]: errors.md#err_unsupported_typescript_syntax
[`NODE_OPTIONS`]: #node_optionsoptions
[`NODE_USE_ENV_PROXY=1`]: #node_use_env_proxy1
[`NO_COLOR`]: https://no-color.org
[`Web Storage`]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
[`YoungGenerationSizeFromSemiSpaceSize`]: https://chromium.googlesource.com/v8/v8.git/+/refs/tags/10.3.129/src/heap/heap.cc#328
[`dns.lookup()`]: dns.md#dnslookuphostname-options-callback
[`dns.setDefaultResultOrder()`]: dns.md#dnssetdefaultresultorderorder
[`dnsPromises.lookup()`]: dns.md#dnspromiseslookuphostname-options
[`import.meta.url`]: esm.md#importmetaurl
[`import` 标识符]: esm.md#import-specifiers
[`net.getDefaultAutoSelectFamilyAttemptTimeout()`]: net.md#netgetdefaultautoselectfamilyattempttimeout
[`node:ffi`]: ffi.md
[`node:sqlite`]: sqlite.md
[`node:stream/iter`]: stream_iter.md
[`process.setUncaughtExceptionCaptureCallback()`]: process.md#processsetuncaughtexceptioncapturecallbackfn
[`tls.DEFAULT_MAX_VERSION`]: tls.md#tlsdefault_max_version
[`tls.DEFAULT_MIN_VERSION`]: tls.md#tlsdefault_min_version
[`unhandledRejection`]: process.md#event-unhandledrejection
[`v8.startupSnapshot.addDeserializeCallback()`]: v8.md#v8startupsnapshotadddeserializecallbackcallback-data
[`v8.startupSnapshot.setDeserializeMainFunction()`]: v8.md#v8startupsnapshotsetdeserializemainfunctioncallback-data
[`v8.startupSnapshot` API]: v8.md#startup-snapshot-api
[异步模块自定义钩子]: module.md#asynchronous-customization-hooks
[由 Node.js 内置快照捕获]: https://github.com/nodejs/node/blob/b19525a33cc84033af4addd0f80acd4dc33ce0cf/test/parallel/test-bootstrap-modules.js#L24
[从测试中收集代码覆盖率]: test.md#collecting-code-coverage
[条件导出]: packages.md#conditional-exports
[上下文感知]: addons.md#context-aware-addons
[调试器]: debugger.md
[调试安全影响]: https://nodejs.org/en/docs/guides/debugging-getting-started/#security-implications
[弃用警告]: deprecations.md#list-of-deprecated-apis
[emit_warning]: process.md#processemitwarningwarning-options
[环境变量]: #environment-variables_1
[按名称过滤测试]: test.md#filtering-tests-by-name
[全局设置和清理]: test.md#global-setup-and-teardown
[jitless]: https://v8.dev/blog/jitless
[libuv 线程池文档]: https://docs.libuv.org/en/latest/threadpool.html
[模块编译缓存]: module.md#module-compile-cache
[预加载异步模块自定义钩子]: module.md#registration-of-asynchronous-customization-hooks
[随机化测试执行顺序]: test.md#randomizing-tests-execution-order
[远程代码执行]: https://www.owasp.org/index.php/Code_Injection
[从命令行运行测试]: test.md#running-tests-from-the-command-line
[Scavenge 垃圾收集器]: https://v8.dev/blog/orinoco-parallel-scavenger
[安全警告]: #warning-binding-inspector-to-a-public-ipport-combination-is-insecure
[半空间]: https://www.memorymanagement.org/glossary/s.html#semi.space
[单可执行应用程序]: single-executable-applications.md
[快照测试]: test.md#snapshot-testing
[语法检测]: packages.md#syntax-detection
[测试报告器]: test.md#test-reporters
[测试重跑]: test.md#rerunning-failed-tests
[测试运行器执行模型]: test.md#test-runner-execution-model
[时区 ID]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[用户态快照的追踪问题]: https://github.com/nodejs/node/issues/44014
[TZ 在其他环境中的处理方式]: https://www.gnu.org/software/libc/manual/html_node/TZ-Variable.html
