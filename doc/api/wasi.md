# WebAssembly 系统接口 (WASI)

<!--introduced_in=v12.16.0-->

> 稳定性：1 - 实验性

<strong class="critical">`node:wasi` 模块目前不提供某些 WASI 运行时所提供的完整文件系统安全属性。未来可能会，也可能不会，实现对安全文件系统沙箱的完整支持。与此同时，不要依赖它来运行不受信任的代码。</strong>

<!-- source_link=lib/wasi.js -->

WASI API 提供了 [WebAssembly 系统接口][] 规范的实现。WASI 通过一组类 POSIX 函数使 WebAssembly 应用程序能够访问底层操作系统。

```mjs
import { readFile } from 'node:fs/promises';
import { WASI } from 'node:wasi';
import { argv, env } from 'node:process';

const wasi = new WASI({
  version: 'preview1',
  args: argv,
  env,
  preopens: {
    '/local': '/some/real/path/that/wasm/can/access',
  },
});

const wasm = await WebAssembly.compile(
  await readFile(new URL('./demo.wasm', import.meta.url)),
);
const instance = await WebAssembly.instantiate(wasm, wasi.getImportObject());

wasi.start(instance);
```

```cjs
const { readFile } = require('node:fs/promises');
const { WASI } = require('node:wasi');
const { argv, env } = require('node:process');
const { join } = require('node:path');

const wasi = new WASI({
  version: 'preview1',
  args: argv,
  env,
  preopens: {
    '/local': '/some/real/path/that/wasm/can/access',
  },
});

(async () => {
  const wasm = await WebAssembly.compile(
    await readFile(join(__dirname, 'demo.wasm')),
  );
  const instance = await WebAssembly.instantiate(wasm, wasi.getImportObject());

  wasi.start(instance);
})();
```

要运行上面的示例，创建一个名为 `demo.wat` 的新 WebAssembly 文本格式文件：

```text
(module
    ;; 导入所需的 fd_write WASI 函数，它将把给定的 io 向量写入 stdout
    ;; fd_write 的函数签名是：
    ;; (文件描述符，*iovs, iovs_len, nwritten) -> 返回写入的字节数
    (import "wasi_snapshot_preview1" "fd_write" (func $fd_write (param i32 i32 i32 i32) (result i32)))

    (memory 1)
    (export "memory" (memory 0))

    ;; 将 'hello world\n' 写入偏移量为 8 字节的内存
    ;; 注意尾随换行符，文本显示需要它
    (data (i32.const 8) "hello world\n")

    (func $main (export "_start")
        ;; 在线性内存中创建一个新的 io 向量
        (i32.store (i32.const 0) (i32.const 8))  ;; iov.iov_base - 这是指向 'hello world\n' 字符串开头的指针
        (i32.store (i32.const 4) (i32.const 12))  ;; iov.iov_len - 'hello world\n' 字符串的长度

        (call $fd_write
            (i32.const 1) ;; file_descriptor - 1 代表 stdout
            (i32.const 0) ;; *iovs - 指向 iov 数组的指针，存储在内存位置 0
            (i32.const 1) ;; iovs_len - 我们打印存储在 iov 中的 1 个字符串 - 所以是 1。
            (i32.const 20) ;; nwritten - 内存中用于存储写入字节数的位置
        )
        drop ;; 从栈顶丢弃写入的字节数
    )
)
```

使用 [wabt](https://github.com/WebAssembly/wabt) 将 `.wat` 编译为 `.wasm`

```bash
wat2wasm demo.wat
```

## 安全性

<!-- YAML
added:
  - v21.2.0
  - v20.11.0
changes:
  - version:
    - v21.2.0
    - v20.11.0
    pr-url: https://github.com/nodejs/node/pull/50396
    description: Clarify WASI security properties.
-->

WASI 提供了一种基于能力的模型，通过该模型为应用程序提供它们自己的自定义 `env`、`preopens`、`stdin`、`stdout`、`stderr` 和 `exit` 能力。

**当前的 Node.js 威胁模型不提供某些 WASI 运行时中存在的安全沙箱。**

虽然支持能力特性，但它们在 Node.js 中并不构成安全模型。例如，可以使用各种技术逃脱文件系统沙箱。该项目正在探索未来是否可以添加这些安全保证。

## 类：`WASI`

<!-- YAML
added:
 - v13.3.0
 - v12.16.0
-->

`WASI` 类提供了 WASI 系统调用 API 以及用于处理基于 WASI 的应用程序的其他便捷方法。每个 `WASI` 实例代表一个独立的环境。

### `new WASI([options])`

<!-- YAML
added:
 - v13.3.0
 - v12.16.0
changes:
 - version: v20.1.0
   pr-url: https://github.com/nodejs/node/pull/47390
   description: default value of returnOnExit changed to true.
 - version: v20.0.0
   pr-url: https://github.com/nodejs/node/pull/47391
   description: The version option is now required and has no default value.
 - version: v19.8.0
   pr-url: https://github.com/nodejs/node/pull/46469
   description: version field added to options.
-->

* `options` {Object}
  * `args` {Array} 字符串数组，WebAssembly 应用程序将其视为命令行参数。第一个参数是 WASI 命令本身的虚拟路径。**默认值：** `[]`。
  * `env` {Object} 类似于 `process.env` 的对象，WebAssembly 应用程序将其视为其环境。**默认值：** `{}`。
  * `preopens` {Object} 此对象表示 WebAssembly 应用程序的本地目录结构。`preopens` 的字符串键被视为文件系统内的目录。`preopens` 中的对应值是主机上这些目录的真实路径。
  * `returnOnExit` {boolean} 默认情况下，当 WASI 应用程序调用 `__wasi_proc_exit()` 时，`wasi.start()` 将返回指定的退出代码，而不是终止进程。将此选项设置为 `false` 将导致 Node.js 进程以指定的退出代码退出。**默认值：** `true`。
  * `stdin` {integer} WebAssembly 应用程序中用作标准输入的文件描述符。**默认值：** `0`。
  * `stdout` {integer} WebAssembly 应用程序中用作标准输出的文件描述符。**默认值：** `1`。
  * `stderr` {integer} WebAssembly 应用程序中用作标准错误输出的文件描述符。**默认值：** `2`。
  * `version` {string} 请求的 WASI 版本。目前支持的版本只有 `unstable` 和 `preview1`。此选项是必填的。

### `wasi.getImportObject()`

<!-- YAML
added: v19.8.0
-->

返回一个导入对象，如果除了 WASI 提供的导入之外不需要其他 WASM 导入，则可以将其传递给 `WebAssembly.instantiate()`。

如果构造函数传入了版本 `unstable`，它将返回：

```json
{ wasi_unstable: wasi.wasiImport }
```

如果构造函数传入了版本 `preview1` 或未指定版本，它将返回：

```json
{ wasi_snapshot_preview1: wasi.wasiImport }
```

### `wasi.start(instance)`

<!-- YAML
added:
 - v13.3.0
 - v12.16.0
-->

* `instance` {WebAssembly.Instance}

尝试通过调用 `instance` 的 `_start()` 导出，开始将 `instance` 作为 WASI 命令执行。如果 `instance` 不包含 `_start()` 导出，或者如果 `instance` 包含 `_initialize()` 导出，则会抛出异常。

`start()` 要求 `instance` 导出一个名为 `memory` 的 [`WebAssembly.Memory`][]。如果 `instance` 没有 `memory` 导出，则会抛出异常。

如果 `start()` 被调用超过一次，则会抛出异常。

### `wasi.initialize(instance)`

<!-- YAML
added:
 - v14.6.0
 - v12.19.0
-->

* `instance` {WebAssembly.Instance}

尝试通过调用 `instance` 的 `_initialize()` 导出（如果存在）将 `instance` 初始化为 WASI 反应器。如果 `instance` 包含 `_start()` 导出，则会抛出异常。

`initialize()` 要求 `instance` 导出一个名为 `memory` 的 [`WebAssembly.Memory`][]。如果 `instance` 没有 `memory` 导出，则会抛出异常。

如果 `initialize()` 被调用超过一次，则会抛出异常。

### `wasi.finalizeBindings(instance[, options])`

<!-- YAML
added: v24.4.0
-->

* `instance` {WebAssembly.Instance}
* `options` {Object}
  * `memory` {WebAssembly.Memory} **默认值：** `instance.exports.memory`。

在不调用 `initialize()` 或 `start()` 的情况下为 `instance` 设置 WASI 主机绑定。当 WASI 模块在子线程中实例化以在线程间共享内存时，此方法很有用。

`finalizeBindings()` 要求 `instance` 导出一个名为 `memory` 的 [`WebAssembly.Memory`][]，或者用户在 `options.memory` 中指定一个 [`WebAssembly.Memory`][] 对象。如果 `memory` 无效，则会抛出异常。

`start()` 和 `initialize()` 将在内部调用 `finalizeBindings()`。如果 `finalizeBindings()` 被调用超过一次，则会抛出异常。

### `wasi.wasiImport`

<!-- YAML
added:
 - v13.3.0
 - v12.16.0
-->

* 类型：{Object}

`wasiImport` 是一个实现 WASI 系统调用 API 的对象。在实例化 [`WebAssembly.Instance`][] 期间，此对象应作为 `wasi_snapshot_preview1` 导入传递。

[WebAssembly 系统接口]: https://wasi.dev/
[`WebAssembly.Instance`]: https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Instance
[`WebAssembly.Memory`]: https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory
