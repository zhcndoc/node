# 子进程

<!--introduced_in=v0.10.0-->

> 稳定性：2 - 稳定

<!-- source_link=lib/child_process.js -->

`node:child_process` 模块提供了生成子进程的能力，其方式与 popen(3) 类似但不完全相同。此功能主要由 [`child_process.spawn()`][] 函数提供：

```cjs
const { spawn } = require('node:child_process');
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
```

```mjs
import { spawn } from 'node:child_process';
import { once } from 'node:events';
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

const [code] = await once(ls, 'close');
console.log(`child process exited with code ${code}`);
```

默认情况下，`stdin`、`stdout` 和 `stderr` 的管道会在父 Node.js 进程和生成的子进程之间建立。这些管道的容量有限（且特定于平台）。如果子进程向 stdout 写入的数据超过该限制且输出未被捕获，子进程将阻塞，等待管道缓冲区接受更多数据。这与 shell 中管道的行为相同。如果输出不会被消费，请使用 `{ stdio: 'ignore' }` 选项。

如果 `options` 对象中存在 `env`，则命令查找使用 `options.env.PATH` 环境变量。否则，使用 `process.env.PATH`。如果设置了 `options.env` 但没有 `PATH`，则在 Unix 上查找默认搜索路径 `/usr/bin:/bin`（请参阅操作系统的 execvpe/execvp 手册），在 Windows 上使用当前进程的环境变量 `PATH`。

在 Windows 上，环境变量不区分大小写。Node.js 按字典序对 `env` 键进行排序，并使用第一个不区分大小写匹配的键。只有第一个（按字典序）条目会被传递给子进程。当向 `env` 选项传递具有同一键的多个变体（例如 `PATH` 和 `Path`）的对象时，这可能会导致 Windows 上的问题。

[`child_process.spawn()`][] 方法异步生成子进程，而不阻塞 Node.js 事件循环。[`child_process.spawnSync()`][] 函数以同步方式提供等效功能，会阻塞事件循环直到生成的进程退出或被终止。

为了方便起见，`node:child_process` 模块提供了一些 [`child_process.spawn()`][] 和 [`child_process.spawnSync()`][] 的同步和异步替代方法。这些替代方法均基于 [`child_process.spawn()`][] 或 [`child_process.spawnSync()`][] 实现。

* [`child_process.exec()`][]：生成一个 shell 并在该 shell 中运行命令，完成后将 `stdout` 和 `stderr` 传递给回调函数。
* [`child_process.execFile()`][]：类似于 [`child_process.exec()`][]，不同之处在于它默认直接生成命令而不先生成 shell。
* [`child_process.fork()`][]：生成一个新的 Node.js 进程并调用指定的模块，同时建立 IPC 通信通道，允许在父进程和子进程之间发送消息。
* [`child_process.execSync()`][]：[`child_process.exec()`][] 的同步版本，会阻塞 Node.js 事件循环。
* [`child_process.execFileSync()`][]：[`child_process.execFile()`][] 的同步版本，会阻塞 Node.js 事件循环。

对于某些用例，例如自动化 shell 脚本，[同步对应方法][] 可能更方便。然而，在许多情况下，同步方法可能会因为阻塞事件循环等待生成的进程完成而对性能产生重大影响。

## 异步进程创建

[`child_process.spawn()`][]、[`child_process.fork()`][]、[`child_process.exec()`][] 和 [`child_process.execFile()`][] 方法都遵循其他 Node.js API 典型的惯用异步编程模式。

每个方法都返回一个 [`ChildProcess`][] 实例。这些对象实现了 Node.js [`EventEmitter`][] API，允许父进程注册监听器函数，当子进程生命周期中发生某些事件时调用这些函数。

[`child_process.exec()`][] 和 [`child_process.execFile()`][] 方法还允许指定一个可选的 `callback` 函数，当子进程终止时调用该函数。

### 在 Windows 上生成 `.bat` 和 `.cmd` 文件

[`child_process.exec()`][] 和 [`child_process.execFile()`][] 之间区别的重要性可能因平台而异。在 Unix 类操作系统（Unix、Linux、macOS）上，[`child_process.execFile()`][] 可能更高效，因为它默认不生成 shell。然而，在 Windows 上，`.bat` 和 `.cmd` 文件如果没有终端则无法自行执行，因此不能使用 [`child_process.execFile()`][] 启动。在 Windows 上运行时，可以通过以下方式调用 `.bat` 和 `.cmd` 文件：

* 使用 [`child_process.spawn()`][] 并将 `shell` 选项设置为 `true`（不推荐，参见 [DEP0190][]），或
* 使用 [`child_process.exec()`][]，或
* 生成 `cmd.exe` 并将 `.bat` 或 `.cmd` 文件作为参数传递（这是 [`child_process.exec()`][] 内部所做的）。

在任何情况下，如果脚本文件名包含空格，则需要加引号。

```cjs
const { exec, spawn } = require('node:child_process');

exec('my.bat', (err, stdout, stderr) => { /* ... */ });

// 或者，直接生成 cmd.exe：
const bat = spawn('cmd.exe', ['/c', 'my.bat']);

// 如果脚本文件名包含空格，则需要加引号
exec('"my script.cmd" a b', (err, stdout, stderr) => { /* ... */ });
```

```mjs
import { exec, spawn } from 'node:child_process';

exec('my.bat', (err, stdout, stderr) => { /* ... */ });

// 或者，直接生成 cmd.exe：
const bat = spawn('cmd.exe', ['/c', 'my.bat']);

// 如果脚本文件名包含空格，则需要加引号
exec('"my script.cmd" a b', (err, stdout, stderr) => { /* ... */ });
```

### `child_process.exec(command[, options][, callback])`

<!-- YAML
added: v0.1.90
changes:
  - version:
      - v16.4.0
      - v14.18.0
    pr-url: https://github.com/nodejs/node/pull/38862
    description: "cwd 选项可以是一个使用 file: 协议的 WHATWG URL 对象。"
  - version: v15.4.0
    pr-url: https://github.com/nodejs/node/pull/36308
    description: 添加了 AbortSignal 支持。
  - version: v8.8.0
    pr-url: https://github.com/nodejs/node/pull/15380
    description: 现在支持 windowsHide 选项。
-->

* `command` {string} 要运行的命令，包含空格分隔的参数。
* `options` {Object}
  * `cwd` {string|URL} 子进程的当前工作目录。**默认值：** `process.cwd()`。
  * `env` {Object} 环境键值对。**默认值：** `process.env`。
  * `encoding` {string} **默认值：** `'utf8'`
  * `shell` {string} 用于执行命令的 shell。参见 [Shell 要求][] 和 [默认 Windows shell][]。**默认值：** Unix 上为 `'/bin/sh'`，Windows 上为 `process.env.ComSpec`。
  * `signal` {AbortSignal} 允许使用 AbortSignal 中止子进程。
  * `timeout` {number} **默认值：** `0`
  * `maxBuffer` {number} stdout 或 stderr 上允许的最大数据量（字节）。如果超过，子进程将被终止，任何输出将被截断。参见 [`maxBuffer` 和 Unicode][] 处的注意事项。**默认值：** `1024 * 1024`。
  * `killSignal` {string|integer} **默认值：** `'SIGTERM'`
  * `uid` {number} 设置进程的用户身份（参见 setuid(2)）。
  * `gid` {number} 设置进程的组身份（参见 setgid(2)）。
  * `windowsHide` {boolean} 隐藏 Windows 系统上通常创建的子进程控制台窗口。**默认值：** `false`。
* `callback` {Function} 进程终止时带着输出调用。
  * `error` {Error}
  * `stdout` {string|Buffer}
  * `stderr` {string|Buffer}
* 返回：{ChildProcess}

生成一个 shell，然后在该 shell 中执行 `command`，缓冲任何生成的输出。传递给 exec 函数的 `command` 字符串由 shell 直接处理，特殊字符（因 [shell](https://en.wikipedia.org/wiki/List_of_command-line_interpreters) 而异）需要相应处理：

```cjs
const { exec } = require('node:child_process');

exec('"/path/to/test file/test.sh" arg1 arg2');
// 使用双引号是为了防止路径中的空格被解释为多个参数的分隔符。

exec('echo "The \\$HOME variable is $HOME"');
// $HOME 变量在第一个实例中被转义，但在第二个中没有。
```

```mjs
import { exec } from 'node:child_process';

exec('"/path/to/test file/test.sh" arg1 arg2');
// 使用双引号是为了防止路径中的空格被解释为多个参数的分隔符。

exec('echo "The \\$HOME variable is $HOME"');
// $HOME 变量在第一个实例中被转义，但在第二个中没有。
```

**切勿将未清理的用户输入传递给此函数。任何包含 shell 元字符的输入都可能被用于触发任意命令执行。**

如果提供了 `callback` 函数，它将使用参数 `(error, stdout, stderr)` 调用。成功时，`error` 将为 `null`。出错时，`error` 将是 [`Error`][] 的实例。`error.code` 属性将是进程的退出码。按照惯例，任何非 `0` 的退出码都表示错误。`error.signal` 将是终止进程的信号。

传递给回调的 `stdout` 和 `stderr` 参数将包含子进程的 stdout 和 stderr 输出。默认情况下，Node.js 会将输出解码为 UTF-8 并将字符串传递给回调。`encoding` 选项可用于指定用于解码 stdout 和 stderr 输出的字符编码。如果 `encoding` 为 `'buffer'` 或无法识别的字符编码，则会将 `Buffer` 对象传递给回调。

```cjs
const { exec } = require('node:child_process');
exec('cat *.js missing_file | wc -l', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
```

```mjs
import { exec } from 'node:child_process';
exec('cat *.js missing_file | wc -l', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
```

如果 `timeout` 大于 `0`，则当子进程运行时间超过 `timeout` 毫秒时，父进程将发送由 `killSignal` 属性标识的信号（默认值为 `'SIGTERM'`）。

与 exec(3) POSIX 系统调用不同，`child_process.exec()` 不会替换现有进程，而是使用 shell 来执行命令。

如果此方法以其 [`util.promisify()`][] 版本调用，它返回一个 `Promise`，对应一个具有 `stdout` 和 `stderr` 属性的 `Object`。返回的 `ChildProcess` 实例作为 `child` 属性附加到 `Promise`。如果出错（包括任何导致退出码非 0 的错误），则返回一个被拒绝的 promise，带有回调中给出的相同 `error` 对象，但附加了两个属性 `stdout` 和 `stderr`。

```cjs
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

async function lsExample() {
  const { stdout, stderr } = await exec('ls');
  console.log('stdout:', stdout);
  console.error('stderr:', stderr);
}
lsExample();
```

```mjs
import { promisify } from 'node:util';
import child_process from 'node:child_process';
const exec = promisify(child_process.exec);

async function lsExample() {
  const { stdout, stderr } = await exec('ls');
  console.log('stdout:', stdout);
  console.error('stderr:', stderr);
}
lsExample();
```

如果启用了 `signal` 选项，则在相应的 `AbortController` 上调用 `.abort()` 类似于在子进程上调用 `.kill()`，不同之处在于传递给回调的错误将是 `AbortError`：

```cjs
const { exec } = require('node:child_process');
const controller = new AbortController();
const { signal } = controller;
const child = exec('grep ssh', { signal }, (error) => {
  console.error(error); // 一个 AbortError
});
controller.abort();
```

```mjs
import { exec } from 'node:child_process';
const controller = new AbortController();
const { signal } = controller;
const child = exec('grep ssh', { signal }, (error) => {
  console.error(error); // 一个 AbortError
});
controller.abort();
```

### `child_process.execFile(file[, args][, options][, callback])`

<!-- YAML
added: v0.1.91
changes:
  - version:
      - v23.11.0
      - v22.15.0
    pr-url: https://github.com/nodejs/node/pull/57389
    description: 当 shell 设置为 true 时传递 args 已弃用。
  - version:
      - v16.4.0
      - v14.18.0
    pr-url: https://github.com/nodejs/node/pull/38862
    description: "cwd 选项可以是一个使用 file: 协议的 WHATWG URL 对象。"
  - version:
      - v15.4.0
      - v14.17.0
    pr-url: https://github.com/nodejs/node/pull/36308
    description: 添加了 AbortSignal 支持。
  - version: v8.8.0
    pr-url: https://github.com/nodejs/node/pull/15380
    description: 现在支持 windowsHide 选项。
-->

* `file` {string} 要运行的可执行文件的名称或路径。
* `args` {string\[]} 字符串参数列表。
* `options` {Object}
  * `cwd` {string|URL} 子进程的当前工作目录。
  * `env` {Object} 环境键值对。**默认值：** `process.env`。
  * `encoding` {string} **默认值：** `'utf8'`
  * `timeout` {number} **默认值：** `0`
  * `maxBuffer` {number} stdout 或 stderr 上允许的最大数据量（字节）。如果超过，子进程将被终止，任何输出将被截断。参见 [`maxBuffer` 和 Unicode][] 处的注意事项。**默认值：** `1024 * 1024`。
  * `killSignal` {string|integer} **默认值：** `'SIGTERM'`
  * `uid` {number} 设置进程的用户身份（参见 setuid(2)）。
  * `gid` {number} 设置进程的组身份（参见 setgid(2)）。
  * `windowsHide` {boolean} 隐藏 Windows 系统上通常创建的子进程控制台窗口。**默认值：** `false`。
  * `windowsVerbatimArguments` {boolean} 在 Windows 上不对参数进行引号或转义。在 Unix 上忽略。**默认值：** `false`。
  * `shell` {boolean|string} 如果为 `true`，则在 shell 内部运行 `command`。在 Unix 上使用 `'/bin/sh'`，在 Windows 上使用 `process.env.ComSpec`。可以将不同的 shell 指定为字符串。参见 [Shell 要求][] 和 [默认 Windows shell][]。**默认值：** `false`（无 shell）。
  * `signal` {AbortSignal} 允许使用 AbortSignal 中止子进程。
* `callback` {Function} 进程终止时带着输出调用。
  * `error` {Error}
  * `stdout` {string|Buffer}
  * `stderr` {string|Buffer}
* 返回：{ChildProcess}

`child_process.execFile()` 函数类似于 [`child_process.exec()`][]，不同之处在于它默认不生成 shell。相反，指定的可执行 `file` 直接作为新进程生成，使其比 [`child_process.exec()`][] 稍微更高效。

支持与 [`child_process.exec()`][] 相同的选项。由于未生成 shell，因此不支持 I/O 重定向和文件 globbing 等行为。

```cjs
const { execFile } = require('node:child_process');
const child = execFile('node', ['--version'], (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log(stdout);
});
```

```mjs
import { execFile } from 'node:child_process';
const child = execFile('node', ['--version'], (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log(stdout);
});
```

传递给回调的 `stdout` 和 `stderr` 参数将包含子进程的 stdout 和 stderr 输出。默认情况下，Node.js 会将输出解码为 UTF-8 并将字符串传递给回调。`encoding` 选项可用于指定用于解码 stdout 和 stderr 输出的字符编码。如果 `encoding` 为 `'buffer'` 或无法识别的字符编码，则会将 `Buffer` 对象传递给回调。

如果此方法以其 [`util.promisify()`][] 版本调用，它返回一个 `Promise`，对应一个具有 `stdout` 和 `stderr` 属性的 `Object`。返回的 `ChildProcess` 实例作为 `child` 属性附加到 `Promise`。如果出错（包括任何导致退出码非 0 的错误），则返回一个被拒绝的 promise，带有回调中给出的相同 `error` 对象，但附加了两个属性 `stdout` 和 `stderr`。

```cjs
const util = require('node:util');
const execFile = util.promisify(require('node:child_process').execFile);
async function getVersion() {
  const { stdout } = await execFile('node', ['--version']);
  console.log(stdout);
}
getVersion();
```

```mjs
import { promisify } from 'node:util';
import child_process from 'node:child_process';
const execFile = promisify(child_process.execFile);
async function getVersion() {
  const { stdout } = await execFile('node', ['--version']);
  console.log(stdout);
}
getVersion();
```

**如果启用了 `shell` 选项，切勿将未清理的用户输入传递给此函数。任何包含 shell 元字符的输入都可能被用于触发任意命令执行。**

如果启用了 `signal` 选项，则在相应的 `AbortController` 上调用 `.abort()` 类似于在子进程上调用 `.kill()`，不同之处在于传递给回调的错误将是 `AbortError`：

```cjs
const { execFile } = require('node:child_process');
const controller = new AbortController();
const { signal } = controller;
const child = execFile('node', ['--version'], { signal }, (error) => {
  console.error(error); // 一个 AbortError
});
controller.abort();
```

```mjs
import { execFile } from 'node:child_process';
const controller = new AbortController();
const { signal } = controller;
const child = execFile('node', ['--version'], { signal }, (error) => {
  console.error(error); // 一个 AbortError
});
controller.abort();
```

### `child_process.fork(modulePath[, args][, options])`

<!-- YAML
added: v0.5.0
changes:
  - version:
      - v17.4.0
      - v16.14.0
    pr-url: https://github.com/nodejs/node/pull/41225
    description: "modulePath 参数可以是一个使用 file: 协议的 WHATWG URL 对象。"
  - version:
      - v16.4.0
      - v14.18.0
    pr-url: https://github.com/nodejs/node/pull/38862
    description: "cwd 选项可以是一个使用 file: 协议的 WHATWG URL 对象。"
  - version:
      - v15.13.0
      - v14.18.0
    pr-url: https://github.com/nodejs/node/pull/37256
    description: 添加了 timeout。
  - version:
      - v15.11.0
      - v14.18.0
    pr-url: https://github.com/nodejs/node/pull/37325
    description: 为 AbortSignal 添加了 killSignal。
  - version:
      - v15.6.0
      - v14.17.0
    pr-url: https://github.com/nodejs/node/pull/36603
    description: 添加了 AbortSignal 支持。
  - version:
      - v13.2.0
      - v12.16.0
    pr-url: https://github.com/nodejs/node/pull/30162
    description: 现在支持 serialization 选项。
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/10866
    description: stdio 选项现在可以是字符串。
  - version: v6.4.0
    pr-url: https://github.com/nodejs/node/pull/7811
    description: 现在支持 stdio 选项。
-->

* `modulePath` {string|URL} 要在子进程中运行的模块。
* `args` {string\[]} 字符串参数列表。
* `options` {Object}
  * `cwd` {string|URL} 子进程的当前工作目录。
  * `detached` {boolean} 准备子进程独立于其父进程运行。具体行为取决于平台（参见 [`options.detached`][]）。
  * `env` {Object} 环境键值对。**默认值：** `process.env`。
  * `execPath` {string} 用于创建子进程的可执行文件。
  * `execArgv` {string\[]} 传递给可执行文件的字符串参数列表。**默认值：** `process.execArgv`。
  * `gid` {number} 设置进程的组身份（参见 setgid(2)）。
  * `serialization` {string} 指定用于在进程之间发送消息的序列化类型。可能的值为 `'json'` 和 `'advanced'`。参见 [高级序列化][] 了解更多详情。**默认值：** `'json'`。
  * `signal` {AbortSignal} 允许使用 AbortSignal 关闭子进程。
  * `killSignal` {string|integer} 当生成的进程因超时或中止信号而被杀死时使用的信号值。**默认值：** `'SIGTERM'`。
  * `silent` {boolean} 如果为 `true`，子进程的 stdin、stdout 和 stderr 将被管道传输到父进程，否则它们将从父进程继承，参见 [`child_process.spawn()`][] 的 [`stdio`][] 的 `'pipe'` 和 `'inherit'` 选项了解更多详情。**默认值：** `false`。
  * `stdio` {Array|string} 参见 [`child_process.spawn()`][] 的 [`stdio`][]。提供此选项时，它将覆盖 `silent`。如果使用数组变体，它必须恰好包含一个值为 `'ipc'` 的项，否则将抛出错误。例如 `[0, 1, 2, 'ipc']`。
  * `uid` {number} 设置进程的用户身份（参见 setuid(2)）。
  * `windowsVerbatimArguments` {boolean} 在 Windows 上不对参数进行引号或转义。在 Unix 上忽略。**默认值：** `false`。
  * `timeout` {number} 进程允许运行的最大时间（毫秒）。**默认值：** `undefined`。
* 返回：{ChildProcess}

`child_process.fork()` 方法是 [`child_process.spawn()`][] 的一个特例，专门用于生成新的 Node.js 进程。像 [`child_process.spawn()`][] 一样，返回一个 [`ChildProcess`][] 对象。返回的 [`ChildProcess`][] 将具有一个内置的额外通信通道，允许消息在父进程和子进程之间来回传递。详见 [`subprocess.send()`][]。

请记住，生成的 Node.js 子进程独立于父进程，除了两者之间建立的 IPC 通信通道。每个进程都有自己的内存和自己的 V8 实例。由于需要额外的资源分配，不建议生成大量子 Node.js 进程。

默认情况下，`child_process.fork()` 将使用父进程的 [`process.execPath`][] 生成新的 Node.js 实例。`options` 对象中的 `execPath` 属性允许使用替代执行路径。

使用自定义 `execPath` 启动的 Node.js 进程将使用子进程上环境变量 `NODE_CHANNEL_FD` 标识的文件描述符 (fd) 与父进程通信。

与 fork(2) POSIX 系统调用不同，`child_process.fork()` 不克隆当前进程。

[`child_process.spawn()`][] 中可用的 `shell` 选项不受 `child_process.fork()` 支持，如果设置将被忽略。

如果启用了 `signal` 选项，则在相应的 `AbortController` 上调用 `.abort()` 类似于在子进程上调用 `.kill()`，不同之处在于传递给回调的错误将是 `AbortError`：

```cjs
const { fork } = require('node:child_process');
const process = require('node:process');

if (process.argv[2] === 'child') {
  setTimeout(() => {
    console.log(`Hello from ${process.argv[2]}!`);
  }, 1_000);
} else {
  const controller = new AbortController();
  const { signal } = controller;
  const child = fork(__filename, ['child'], { signal });
  child.on('error', (err) => {
    // 如果控制器中止，此处将被调用，err 为 AbortError
  });
  controller.abort(); // 停止子进程
}
```

```mjs
import { fork } from 'node:child_process';
import process from 'node:process';

if (process.argv[2] === 'child') {
  setTimeout(() => {
    console.log(`Hello from ${process.argv[2]}!`);
  }, 1_000);
} else {
  const controller = new AbortController();
  const { signal } = controller;
  const child = fork(import.meta.url, ['child'], { signal });
  child.on('error', (err) => {
    // 如果控制器中止，此处将被调用，err 为 AbortError
  });
  controller.abort(); // 停止子进程
}
```

### `child_process.spawn(command[, args][, options])`

<!-- YAML
added: v0.1.90
changes:
  - version:
      - v23.11.0
      - v22.15.0
    pr-url: https://github.com/nodejs/node/pull/57389
    description: 当 shell 设置为 true 时传递 args 已弃用。
  - version:
      - v16.4.0
      - v14.18.0
    pr-url: https://github.com/nodejs/node/pull/38862
    description: "cwd 选项可以是一个使用 file: 协议的 WHATWG URL 对象。"
  - version:
      - v15.13.0
      - v14.18.0
    pr-url: https://github.com/nodejs/node/pull/37256
    description: 添加了 timeout。
  - version:
      - v15.11.0
      - v14.18.0
    pr-url: https://github.com/nodejs/node/pull/37325
    description: 为 AbortSignal 添加了 killSignal。
  - version:
      - v15.5.0
      - v14.17.0
    pr-url: https://github.com/nodejs/node/pull/36432
    description: 添加了 AbortSignal 支持。
  - version:
      - v13.2.0
      - v12.16.0
    pr-url: https://github.com/nodejs/node/pull/30162
    description: 现在支持 serialization 选项。
  - version: v8.8.0
    pr-url: https://github.com/nodejs/node/pull/15380
    description: 现在支持 windowsHide 选项。
  - version: v6.4.0
    pr-url: https://github.com/nodejs/node/pull/7696
    description: 现在支持 argv0 选项。
  - version: v5.7.0
    pr-url: https://github.com/nodejs/node/pull/4598
    description: 现在支持 shell 选项。
-->

* `command` {string} 要运行的命令。
* `args` {string\[]} 字符串参数列表。
* `options` {Object}
  * `cwd` {string|URL} 子进程的当前工作目录。
  * `env` {Object} 环境键值对。**默认值：** `process.env`。
  * `argv0` {string} 显式设置发送给子进程的 `argv[0]` 的值。如果未指定，这将设置为 `command`。
  * `stdio` {Array|string} 子进程的 stdio 配置（参见 [`options.stdio`][`stdio`]）。
  * `detached` {boolean} 准备子进程独立于其父进程运行。具体行为取决于平台（参见 [`options.detached`][]）。
  * `uid` {number} 设置进程的用户身份（参见 setuid(2)）。
  * `gid` {number} 设置进程的组身份（参见 setgid(2)）。
  * `serialization` {string} 指定用于在进程之间发送消息的序列化类型。可能的值为 `'json'` 和 `'advanced'`。参见 [高级序列化][] 了解更多详情。**默认值：** `'json'`。
  * `shell` {boolean|string} 如果为 `true`，则在 shell 内部运行 `command`。在 Unix 上使用 `'/bin/sh'`，在 Windows 上使用 `process.env.ComSpec`。可以将不同的 shell 指定为字符串。参见 [Shell 要求][] 和 [默认 Windows shell][]。**默认值：** `false`（无 shell）。
  * `windowsVerbatimArguments` {boolean} 在 Windows 上不对参数进行引号或转义。在 Unix 上忽略。当指定 `shell` 且为 CMD 时，此值自动设置为 `true`。**默认值：** `false`。
  * `windowsHide` {boolean} 隐藏 Windows 系统上通常创建的子进程控制台窗口。**默认值：** `false`。
  * `signal` {AbortSignal} 允许使用 AbortSignal 中止子进程。
  * `timeout` {number} 进程允许运行的最大时间（毫秒）。**默认值：** `undefined`。
  * `killSignal` {string|integer} 当生成的进程因超时或中止信号而被杀死时使用的信号值。**默认值：** `'SIGTERM'`。
* 返回：{ChildProcess}

`child_process.spawn()` 方法使用给定的 `command` 生成一个新进程，命令行参数在 `args` 中。如果省略，`args` 默认为空数组。

**如果启用了 `shell` 选项，切勿将未清理的用户输入传递给此函数。任何包含 shell 元字符的输入都可能被用于触发任意命令执行。**

第三个参数可用于指定附加选项，默认值如下：

```js
const defaults = {
  cwd: undefined,
  env: process.env,
};
```

使用 `cwd` 指定生成进程的工作目录。如果未给出，默认是继承当前工作目录。如果给出但路径不存在，子进程将发出 `ENOENT` 错误并立即退出。当命令不存在时也会发出 `ENOENT`。

使用 `env` 指定新进程可见的环境变量，默认值为 [`process.env`][]。

`env` 中的 `undefined` 值将被忽略。

运行 `ls -lh /usr` 的示例，捕获 `stdout`、`stderr` 和退出码：

```cjs
const { spawn } = require('node:child_process');
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
```

```mjs
import { spawn } from 'node:child_process';
import { once } from 'node:events';
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

const [code] = await once(ls, 'close');
console.log(`child process exited with code ${code}`);
```

示例：运行 `ps ax | grep ssh` 的一种非常详细的方式

```cjs
const { spawn } = require('node:child_process');
const ps = spawn('ps', ['ax']);
const grep = spawn('grep', ['ssh']);

ps.stdout.on('data', (data) => {
  grep.stdin.write(data);
});

ps.stderr.on('data', (data) => {
  console.error(`ps stderr: ${data}`);
});

ps.on('close', (code) => {
  if (code !== 0) {
    console.log(`ps process exited with code ${code}`);
  }
  grep.stdin.end();
});

grep.stdout.on('data', (data) => {
  console.log(data.toString());
});

grep.stderr.on('data', (data) => {
  console.error(`grep stderr: ${data}`);
});

grep.on('close', (code) => {
  if (code !== 0) {
    console.log(`grep process exited with code ${code}`);
  }
});
```

```mjs
import { spawn } from 'node:child_process';
const ps = spawn('ps', ['ax']);
const grep = spawn('grep', ['ssh']);

ps.stdout.on('data', (data) => {
  grep.stdin.write(data);
});

ps.stderr.on('data', (data) => {
  console.error(`ps stderr: ${data}`);
});

ps.on('close', (code) => {
  if (code !== 0) {
    console.log(`ps process exited with code ${code}`);
  }
  grep.stdin.end();
});

grep.stdout.on('data', (data) => {
  console.log(data.toString());
});

grep.stderr.on('data', (data) => {
  console.error(`grep stderr: ${data}`);
});

grep.on('close', (code) => {
  if (code !== 0) {
    console.log(`grep process exited with code ${code}`);
  }
});
```

检查 `spawn` 失败的示例：

```cjs
const { spawn } = require('node:child_process');
const subprocess = spawn('bad_command');

subprocess.on('error', (err) => {
  console.error('Failed to start subprocess.');
});
```

```mjs
import { spawn } from 'node:child_process';
const subprocess = spawn('bad_command');

subprocess.on('error', (err) => {
  console.error('Failed to start subprocess.');
});
```

某些平台（macOS、Linux）将使用 `argv[0]` 的值作为进程标题，而其他平台（Windows、SunOS）将使用 `command`。

Node.js 在启动时用 `process.execPath` 覆盖 `argv[0]`，因此 Node.js 子进程中的 `process.argv[0]` 将与父进程传递给 `spawn` 的 `argv0` 参数不匹配。请改用 `process.argv0` 属性检索它。

如果启用了 `signal` 选项，则在相应的 `AbortController` 上调用 `.abort()` 类似于在子进程上调用 `.kill()`，不同之处在于传递给回调的错误将是 `AbortError`：

```cjs
const { spawn } = require('node:child_process');
const controller = new AbortController();
const { signal } = controller;
const grep = spawn('grep', ['ssh'], { signal });
grep.on('error', (err) => {
  // 如果控制器中止，此处将被调用，err 为 AbortError
});
controller.abort(); // 停止子进程
```

```mjs
import { spawn } from 'node:child_process';
const controller = new AbortController();
const { signal } = controller;
const grep = spawn('grep', ['ssh'], { signal });
grep.on('error', (err) => {
  // 如果控制器中止，此处将被调用，err 为 AbortError
});
controller.abort(); // 停止子进程
```

#### `options.detached`

<!-- YAML
added: v0.7.10
-->

在 Windows 上，将 `options.detached` 设置为 `true` 使得子进程在父进程退出后继续运行成为可能。子进程将拥有自己的控制台窗口。一旦为子进程启用，就无法禁用。

在非 Windows 平台上，如果 `options.detached` 设置为 `true`，子进程将成为新进程组和会话的领导者。无论是否分离，子进程都可以在父进程退出后继续运行。参见 setsid(2) 了解更多信息。

默认情况下，父进程将等待分离的子进程退出。为了防止父进程等待给定的 `subprocess` 退出，请使用 `subprocess.unref()` 方法。这样做将导致父进程的事件循环不在其引用计数中包含子进程，允许父进程独立于子进程退出，除非子进程和父进程之间建立了 IPC 通道。

当使用 `detached` 选项启动长期运行的进程时，除非提供了未连接到父进程的 `stdio` 配置，否则进程在父进程退出后不会在后台保持运行。如果父进程的 `stdio` 被继承，子进程将保持连接到控制终端。

长期运行进程的示例，通过分离并忽略其父进程 `stdio` 文件描述符，以便忽略父进程的终止：

```cjs
const { spawn } = require('node:child_process');
const process = require('node:process');

const subprocess = spawn(process.argv[0], ['child_program.js'], {
  detached: true,
  stdio: 'ignore',
});

subprocess.unref();
```

```mjs
import { spawn } from 'node:child_process';
import process from 'node:process';

const subprocess = spawn(process.argv[0], ['child_program.js'], {
  detached: true,
  stdio: 'ignore',
});

subprocess.unref();
```

或者，可以将子进程的输出重定向到文件：

```cjs
const { openSync } = require('node:fs');
const { spawn } = require('node:child_process');
const out = openSync('./out.log', 'a');
const err = openSync('./out.log', 'a');

const subprocess = spawn('prg', [], {
  detached: true,
  stdio: [ 'ignore', out, err ],
});

subprocess.unref();
```

```mjs
import { openSync } from 'node:fs';
import { spawn } = 'node:child_process';
const out = openSync('./out.log', 'a');
const err = openSync('./out.log', 'a');

const subprocess = spawn('prg', [], {
  detached: true,
  stdio: [ 'ignore', out, err ],
});

subprocess.unref();
```

#### `options.stdio`

<!-- YAML
added: v0.7.10
changes:
  - version:
      - v15.6.0
      - v14.18.0
    pr-url: https://github.com/nodejs/node/pull/29412
    description: 添加了 overlapped stdio 标志。
  - version: v3.3.1
    pr-url: https://github.com/nodejs/node/pull/2727
    description: 值 0 现在被接受为文件描述符。
-->

`options.stdio` 选项用于配置在父进程和子进程之间建立的管道。默认情况下，子进程的 stdin、stdout 和 stderr 被重定向到 [`ChildProcess`][] 对象上相应的 [`subprocess.stdin`][]、[`subprocess.stdout`][] 和 [`subprocess.stderr`][] 流。这等同于将 `options.stdio` 设置为 `['pipe', 'pipe', 'pipe']`。

为了方便起见，`options.stdio` 可以是以下字符串之一：

* `'pipe'`：等同于 `['pipe', 'pipe', 'pipe']`（默认值）
* `'overlapped'`：等同于 `['overlapped', 'overlapped', 'overlapped']`
* `'ignore'`：等同于 `['ignore', 'ignore', 'ignore']`
* `'inherit'`：等同于 `['inherit', 'inherit', 'inherit']` 或 `[0, 1, 2]`

否则，`options.stdio` 的值是一个数组，其中每个索引对应子进程中的一个 fd。fd 0、1 和 2 分别对应 stdin、stdout 和 stderr。可以指定额外的 fd 以在父进程和子进程之间创建额外的管道。值是以下之一：

1. `'pipe'`：在子进程和父进程之间创建管道。管道的父端作为 [`child_process`][] 对象上的属性 [`subprocess.stdio[fd]`][`subprocess.stdio`] 暴露给父进程。为 fd 0、1 和 2 创建的管道也可分别作为 [`subprocess.stdin`][]、[`subprocess.stdout`][] 和 [`subprocess.stderr`][] 使用。这些不是实际的 Unix 管道，因此子进程不能通过其描述符文件使用它们，例如 `/dev/fd/2` 或 `/dev/stdout`。
2. `'overlapped'`：与 `'pipe'` 相同，不同之处在于句柄上设置了 `FILE_FLAG_OVERLAPPED` 标志。这对于子进程 stdio 句柄上的重叠 I/O 是必需的。参见 [文档](https://docs.microsoft.com/en-us/windows/win32/fileio/synchronous-and-asynchronous-i-o) 了解更多详情。在非 Windows 系统上，这与 `'pipe'` 完全相同。
3. `'ipc'`：创建一个 IPC 通道，用于在父进程和子进程之间传递消息/文件描述符。[`ChildProcess`][] 最多可以有一个 IPC stdio 文件描述符。设置此选项将启用 [`subprocess.send()`][] 方法。如果子进程是 Node.js 实例，IPC 通道的存在将启用子进程内的 [`process.send()`][] 和 [`process.disconnect()`][] 方法，以及 [`'disconnect'`][] 和 [`'message'`][] 事件。

   除了 [`process.send()`][] 之外，以任何方式访问 IPC 通道 fd，或将 IPC 通道与非 Node.js 实例的子进程一起使用是不支持的。
4. `'ignore'`：指示 Node.js 忽略子进程中的 fd。虽然 Node.js 总是为其生成的进程打开 fd 0、1 和 2，但将 fd 设置为 `'ignore'` 将导致 Node.js 打开 `/dev/null` 并将其附加到子进程的 fd。
5. `'inherit'`：将相应的 stdio 流从/传递给父进程。在前三个位置，这分别等同于 `process.stdin`、`process.stdout` 和 `process.stderr`。在任何其他位置，等同于 `'ignore'`。
6. {Stream} 对象：与子进程共享引用 tty、文件、socket 或管道的可读或可写流。流的底层文件描述符在子进程中复制到对应于 `stdio` 数组中索引的 fd。流必须具有底层描述符（文件流直到 `'open'` 事件发生后才开始）。
   **注意：** 虽然技术上可以将 `stdin` 作为可写流传递，或将 `stdout`/`stderr` 作为可读流传递，但不推荐这样做。可读和可写流设计有不同的行为，错误地使用它们（例如，在期望可写流的地方传递可读流）可能导致意外结果或错误。不鼓励这种做法，因为它可能导致未定义的行为，或者如果流遇到错误则导致回调丢失。始终确保 `stdin` 用作可读，`stdout`/`stderr` 用作可写，以维持父进程和子进程之间预期的数据流。
7. 正整数：整数值被解释为在父进程中打开的文件描述符。它与子进程共享，类似于 {Stream} 对象的共享方式。在 Windows 上不支持传递 socket。
8. `null`、`undefined`：使用默认值。对于 stdio fd 0、1 和 2（即 stdin、stdout 和 stderr），创建管道。对于 fd 3 及以上，默认值为 `'ignore'`。

```cjs
const { spawn } = require('node:child_process');
const process = require('node:process');

// 子进程将使用父进程的 stdio。
spawn('prg', [], { stdio: 'inherit' });

// 生成只共享 stderr 的子进程。
spawn('prg', [], { stdio: ['pipe', 'pipe', process.stderr] });

// 打开一个额外的 fd=4，以便与呈现 startd 风格界面的程序交互。
spawn('prg', [], { stdio: ['pipe', null, null, null, 'pipe'] });
```

```mjs
import { spawn } from 'node:child_process';
import process from 'node:process';

// 子进程将使用父进程的 stdio。
spawn('prg', [], { stdio: 'inherit' });

// 生成只共享 stderr 的子进程。
spawn('prg', [], { stdio: ['pipe', 'pipe', process.stderr] });

// 打开一个额外的 fd=4，以便与呈现 startd 风格界面的程序交互。
spawn('prg', [], { stdio: ['pipe', null, null, null, 'pipe'] });
```

_值得注意的是，当在父进程和子进程之间建立 IPC 通道，且子进程是 Node.js 实例时，子进程启动时 IPC 通道未被引用（使用 `unref()`），直到子进程为 [`'disconnect'`][] 事件或 [`'message'`][] 事件注册事件处理程序。这允许子进程正常退出，而进程不会被打开的 IPC 通道保持打开状态。_
另参见：[`child_process.exec()`][] 和 [`child_process.fork()`][]。

## 同步进程创建

[`child_process.spawnSync()`][]、[`child_process.execSync()`][] 和
[`child_process.execFileSync()`][] 方法是同步的，会阻塞
Node.js 事件循环，暂停任何附加代码的执行，直到派生的
进程退出。

像这样的阻塞调用主要用于简化通用
脚本任务，以及简化启动时应用程序配置
的加载/处理。

### `child_process.execFileSync(file[, args][, options])`

<!-- YAML
added: v0.11.12
changes:
  - version:
      - v16.4.0
      - v14.18.0
    pr-url: https://github.com/nodejs/node/pull/38862
    description: "`cwd` 选项可以是一个使用`file:` 协议的 WHATWG `URL` 对象。"
  - version: v10.10.0
    pr-url: https://github.com/nodejs/node/pull/22409
    description: "`input` 选项现在可以是任何 `TypedArray` 或`DataView`。"
  - version: v8.8.0
    pr-url: https://github.com/nodejs/node/pull/15380
    description: "现在支持 `windowsHide` 选项。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/10653
    description: "`input` 选项现在可以是 `Uint8Array`。"
  - version:
    - v6.2.1
    - v4.5.0
    pr-url: https://github.com/nodejs/node/pull/6939
    description: "`encoding` 选项现在可以显式设置为 `buffer`。"
-->

* `file` {string} 要运行的可执行文件的名称或路径。
* `args` {string\[]} 字符串参数列表。
* `options` {Object}
  * `cwd` {string|URL} 子进程的当前工作目录。
  * `input` {string|Buffer|TypedArray|DataView} 将作为 stdin 传递给派生进程的值。如果 `stdio[0]` 设置为 `'pipe'`，提供
    此值将覆盖 `stdio[0]`。
  * `stdio` {string|Array} 子进程的 stdio 配置。
    参见 [`child_process.spawn()`][] 的 [`stdio`][]。除非指定了 `stdio`，否则 `stderr` 默认将
    输出到父进程的 stderr。
    **默认值：** `'pipe'`。
  * `env` {Object} 环境键值对。**默认值：** `process.env`。
  * `uid` {number} 设置进程的用户身份（参见 setuid(2)）。
  * `gid` {number} 设置进程的用户组身份（参见 setgid(2)）。
  * `timeout` {number} 进程允许运行的最大时间（毫秒）。**默认值：** `undefined`。
  * `killSignal` {string|integer} 用于杀死派生进程的信号值。**默认值：** `'SIGTERM'`。
  * `maxBuffer` {number} stdout 或 stderr 上允许的最大数据量（字节）。如果超过，子进程将被终止。参见 [`maxBuffer` 和 Unicode][] 处的注意事项。**默认值：** `1024 * 1024`。
  * `encoding` {string} 用于所有 stdio 输入和输出的编码。
    **默认值：** `'buffer'`。
  * `windowsHide` {boolean} 隐藏通常在 Windows 系统上创建的子进程控制台窗口。**默认值：** `false`。
  * `shell` {boolean|string} 如果为 `true`，则在 shell 内部运行 `command`。在 Unix 上使用
    `'/bin/sh'`，在 Windows 上使用 `process.env.ComSpec`。可以将不同的
    shell 指定为字符串。参见 [Shell 要求][] 和
    [默认 Windows shell][]。**默认值：** `false`（无 shell）。
* 返回：{Buffer|string} 命令的 stdout。

`child_process.execFileSync()` 方法通常与
[`child_process.execFile()`][] 相同，例外情况是该方法直到子进程完全关闭才会返回。当遇到超时且
发送了 `killSignal` 时，该方法直到进程完全退出才会返回。

如果子进程拦截并处理 `SIGTERM` 信号且
未退出，父进程仍将等待直到子进程退出。

如果进程超时或具有非零退出码，此方法将抛出一个
[`Error`][]，其中将包含底层
[`child_process.spawnSync()`][] 的完整结果。

**如果启用了 `shell` 选项，请勿将未经清理的用户输入传递给此
函数。任何包含 shell 元字符的输入都可能被用于触发
任意命令执行。**

```cjs
const { execFileSync } = require('node:child_process');

try {
  const stdout = execFileSync('my-script.sh', ['my-arg'], {
    // 捕获子进程的 stdout 和 stderr。覆盖
    // 将子进程 stderr 流式传输到父进程 stderr 的默认行为
    stdio: 'pipe',

    // 为 stdio 管道使用 utf8 编码
    encoding: 'utf8',
  });

  console.log(stdout);
} catch (err) {
  if (err.code) {
    // 派生子进程失败
    console.error(err.code);
  } else {
    // 子进程已派生但退出码非零
    // 错误包含来自子进程的任何 stdout 和 stderr
    const { stdout, stderr } = err;

    console.error({ stdout, stderr });
  }
}
```

```mjs
import { execFileSync } from 'node:child_process';

try {
  const stdout = execFileSync('my-script.sh', ['my-arg'], {
    // 捕获子进程的 stdout 和 stderr。覆盖
    // 将子进程 stderr 流式传输到父进程 stderr 的默认行为
    stdio: 'pipe',

    // 为 stdio 管道使用 utf8 编码
    encoding: 'utf8',
  });

  console.log(stdout);
} catch (err) {
  if (err.code) {
    // 派生子进程失败
    console.error(err.code);
  } else {
    // 子进程已派生但退出码非零
    // 错误包含来自子进程的任何 stdout 和 stderr
    const { stdout, stderr } = err;

    console.error({ stdout, stderr });
  }
}
```

### `child_process.execSync(command[, options])`

<!-- YAML
added: v0.11.12
changes:
  - version:
      - v16.4.0
      - v14.18.0
    pr-url: https://github.com/nodejs/node/pull/38862
    description: "`cwd` 选项可以是一个使用`file:` 协议的 WHATWG `URL` 对象。"
  - version: v10.10.0
    pr-url: https://github.com/nodejs/node/pull/22409
    description: "`input` 选项现在可以是任何 `TypedArray` 或`DataView`。"
  - version: v8.8.0
    pr-url: https://github.com/nodejs/node/pull/15380
    description: "现在支持 `windowsHide` 选项。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/10653
    description: "`input` 选项现在可以是 `Uint8Array`。"
-->

* `command` {string} 要运行的命令。
* `options` {Object}
  * `cwd` {string|URL} 子进程的当前工作目录。
  * `input` {string|Buffer|TypedArray|DataView} 将作为 stdin 传递给派生进程的值。如果 `stdio[0]` 设置为 `'pipe'`，提供
    此值将覆盖 `stdio[0]`。
  * `stdio` {string|Array} 子进程的 stdio 配置。
    参见 [`child_process.spawn()`][] 的 [`stdio`][]。除非指定了 `stdio`，否则 `stderr` 默认将
    输出到父进程的 stderr。
    **默认值：** `'pipe'`。
  * `env` {Object} 环境键值对。**默认值：** `process.env`。
  * `shell` {string} 用于执行命令的 Shell。参见
    [Shell 要求][] 和 [默认 Windows shell][]。**默认值：**
    在 Unix 上为 `'/bin/sh'`，在 Windows 上为 `process.env.ComSpec`。
  * `uid` {number} 设置进程的用户身份。（参见 setuid(2)）。
  * `gid` {number} 设置进程的用户组身份。（参见 setgid(2)）。
  * `timeout` {number} 进程允许运行的最大时间（毫秒）。**默认值：** `undefined`。
  * `killSignal` {string|integer} 用于杀死派生进程的信号值。**默认值：** `'SIGTERM'`。
  * `maxBuffer` {number} stdout 或 stderr 上允许的最大数据量（字节）。如果超过，子进程将被终止且任何输出将被
    截断。参见 [`maxBuffer` 和 Unicode][] 处的注意事项。
    **默认值：** `1024 * 1024`。
  * `encoding` {string} 用于所有 stdio 输入和输出的编码。
    **默认值：** `'buffer'`。
  * `windowsHide` {boolean} 隐藏通常在 Windows 系统上创建的子进程控制台窗口。**默认值：** `false`。
* 返回：{Buffer|string} 命令的 stdout。

`child_process.execSync()` 方法通常与
[`child_process.exec()`][] 相同，例外情况是该方法直到
子进程完全关闭才会返回。当遇到超时且
发送了 `killSignal` 时，该方法直到进程完全退出才会返回。如果子进程拦截并处理 `SIGTERM`
信号且未退出，父进程将等待直到子进程退出。

如果进程超时或具有非零退出码，此方法将抛出。
[`Error`][] 对象将包含来自
[`child_process.spawnSync()`][] 的完整结果。

**切勿将未经清理的用户输入传递给此函数。任何包含 shell
元字符的输入都可能被用于触发任意命令执行。**

### `child_process.spawnSync(command[, args][, options])`

<!-- YAML
added: v0.11.12
changes:
  - version:
      - v16.4.0
      - v14.18.0
    pr-url: https://github.com/nodejs/node/pull/38862
    description: "`cwd` 选项可以是一个使用`file:` 协议的 WHATWG `URL` 对象。"
  - version: v10.10.0
    pr-url: https://github.com/nodejs/node/pull/22409
    description: "`input` 选项现在可以是任何 `TypedArray` 或`DataView`。"
  - version: v8.8.0
    pr-url: https://github.com/nodejs/node/pull/15380
    description: "现在支持 `windowsHide` 选项。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/10653
    description: "`input` 选项现在可以是 `Uint8Array`。"
  - version:
    - v6.2.1
    - v4.5.0
    pr-url: https://github.com/nodejs/node/pull/6939
    description: "`encoding` 选项现在可以显式设置为 `buffer`。"
  - version: v5.7.0
    pr-url: https://github.com/nodejs/node/pull/4598
    description: "现在支持 `shell` 选项。"
-->

* `command` {string} 要运行的命令。
* `args` {string\[]} 字符串参数列表。
* `options` {Object}
  * `cwd` {string|URL} 子进程的当前工作目录。
  * `input` {string|Buffer|TypedArray|DataView} 将作为 stdin 传递给派生进程的值。如果 `stdio[0]` 设置为 `'pipe'`，提供
    此值将覆盖 `stdio[0]`。
  * `argv0` {string} 显式设置发送给子
    进程的 `argv[0]` 的值。如果未指定，这将设置为 `command`。
  * `stdio` {string|Array} 子进程的 stdio 配置。
    参见 [`child_process.spawn()`][] 的 [`stdio`][]。**默认值：** `'pipe'`。
  * `env` {Object} 环境键值对。**默认值：** `process.env`。
  * `uid` {number} 设置进程的用户身份（参见 setuid(2)）。
  * `gid` {number} 设置进程的用户组身份（参见 setgid(2)）。
  * `timeout` {number} 进程允许运行的最大时间（毫秒）。**默认值：** `undefined`。
  * `killSignal` {string|integer} 用于杀死派生进程的信号值。**默认值：** `'SIGTERM'`。
  * `maxBuffer` {number} stdout 或 stderr 上允许的最大数据量（字节）。如果超过，子进程将被终止且任何输出将被
    截断。参见 [`maxBuffer` 和 Unicode][] 处的注意事项。
    **默认值：** `1024 * 1024`。
  * `encoding` {string} 用于所有 stdio 输入和输出的编码。
    **默认值：** `'buffer'`。
  * `shell` {boolean|string} 如果为 `true`，则在 shell 内部运行 `command`。在 Unix 上使用
    `'/bin/sh'`，在 Windows 上使用 `process.env.ComSpec`。可以将不同的
    shell 指定为字符串。参见 [Shell 要求][] 和
    [默认 Windows shell][]。**默认值：** `false`（无 shell）。
  * `windowsVerbatimArguments` {boolean} 在 Windows 上不对参数进行引号或转义。在 Unix 上被忽略。当指定 `shell` 且为 CMD 时，此值自动
    设置为 `true`。**默认值：** `false`。
  * `windowsHide` {boolean} 隐藏通常在 Windows 系统上创建的子进程控制台窗口。**默认值：** `false`。
* 返回：{Object}
  * `pid` {number} 子进程的 Pid。
  * `output` {Array} 来自 stdio 输出的结果数组。
  * `stdout` {Buffer|string} `output[1]` 的内容。
  * `stderr` {Buffer|string} `output[2]` 的内容。
  * `status` {number|null} 子进程的退出码，如果子进程因信号终止则为 `null`。
  * `signal` {string|null} 用于杀死子进程的信号，如果子进程不是因信号终止则为 `null`。
  * `error` {Error} 如果子进程失败或超时，则为错误对象。

`child_process.spawnSync()` 方法通常与
[`child_process.spawn()`][] 相同，例外情况是该函数直到
子进程完全关闭才会返回。当遇到超时且
发送了 `killSignal` 时，该方法直到进程完全退出才会返回。如果进程拦截并处理 `SIGTERM` 信号
且未退出，父进程将等待直到子进程退出。

**如果启用了 `shell` 选项，请勿将未经清理的用户输入传递给此
函数。任何包含 shell 元字符的输入都可能被用于触发
任意命令执行。**

## 类：`ChildProcess`

<!-- YAML
added: v2.2.0
-->

* 继承：{EventEmitter}

`ChildProcess` 的实例代表生成的子进程。

不建议直接创建 `ChildProcess` 的实例。而是使用 [`child_process.spawn()`][]、[`child_process.exec()`][]、[`child_process.execFile()`][] 或 [`child_process.fork()`][] 方法来创建 `ChildProcess` 实例。

### 事件：`'close'`

<!-- YAML
added: v0.7.7
-->

* `code` {number} 如果子进程自行退出，则为退出码，如果子进程因信号而终止，则为 `null`。
* `signal` {string} 子进程终止所需的信号，如果子进程不是因信号而终止，则为 `null`。

当进程结束 _且_ 子进程的 stdio 流关闭后，会发出 `'close'` 事件。这与 [`'exit'`][] 事件不同，因为多个进程可能共享相同的 stdio 流。`'close'` 事件总是在 [`'exit'`][] 已发出之后发出，或者如果子进程生成失败则发出 [`'error'`][]。

如果进程退出，`code` 是进程的最终退出码，否则为 `null`。如果进程因收到信号而终止，`signal` 是信号的字符串名称，否则为 `null`。两者之一将始终为非 `null`。

```cjs
const { spawn } = require('node:child_process');
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process close all stdio with code ${code}`);
});

ls.on('exit', (code) => {
  console.log(`child process exited with code ${code}`);
});
```

```mjs
import { spawn } from 'node:child_process';
import { once } from 'node:events';
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process close all stdio with code ${code}`);
});

ls.on('exit', (code) => {
  console.log(`child process exited with code ${code}`);
});

const [code] = await once(ls, 'close');
console.log(`child process close all stdio with code ${code}`);
```

### 事件：`'disconnect'`

<!-- YAML
added: v0.7.2
-->

在父进程中调用 [`subprocess.disconnect()`][] 方法或在子进程中调用 [`process.disconnect()`][] 后，会发出 `'disconnect'` 事件。断开连接后，不再可能发送或接收消息，且 [`subprocess.connected`][] 属性为 `false`。

### 事件：`'error'`

* `err` {Error} 错误。

每当发生以下情况时，会发出 `'error'` 事件：

* 无法生成进程。
* 无法终止进程。
* 向子进程发送消息失败。
* 子进程通过 `signal` 选项被中止。

错误发生后，`'exit'` 事件可能会也可能不会触发。当同时监听 `'exit'` 和 `'error'` 事件时，防止意外多次调用处理函数。

另请参阅 [`subprocess.kill()`][] 和 [`subprocess.send()`][]。

### 事件：`'exit'`

<!-- YAML
added: v0.1.90
-->

* `code` {number} 如果子进程自行退出，则为退出码，如果子进程因信号而终止，则为 `null`。
* `signal` {string} 子进程终止所需的信号，如果子进程不是因信号而终止，则为 `null`。

子进程结束后会发出 `'exit'` 事件。如果进程退出，`code` 是进程的最终退出码，否则为 `null`。如果进程因收到信号而终止，`signal` 是信号的字符串名称，否则为 `null`。两者之一将始终为非 `null`。

触发 `'exit'` 事件时，子进程 stdio 流可能仍然打开。

Node.js 为 `SIGINT` 和 `SIGTERM` 建立信号处理程序，且 Node.js 进程不会因收到这些信号而立即终止。相反，Node.js 将执行一系列清理操作，然后重新引发已处理的信号。

参见 waitpid(2)。

当 `code` 因信号终止而为 `null` 时，你可以使用 [`util.convertProcessSignalToExitCode()`][] 将信号转换为 POSIX 退出码。

### 事件：`'message'`

<!-- YAML
added: v0.5.9
-->

* `message` {Object} 解析后的 JSON 对象或原始值。
* `sendHandle` {Handle|undefined} `undefined` 或一个 [`net.Socket`][]、[`net.Server`][] 或 [`dgram.Socket`][] 对象。

当子进程使用 [`process.send()`][] 发送消息时，会触发 `'message'` 事件。

消息会经过序列化和解析。结果消息可能与最初发送的消息不同。

如果生成子进程时 `serialization` 选项设置为 `'advanced'`，`message` 参数可以包含 JSON 无法表示的数据。详见 [高级序列化][] 了解更多详情。

### 事件：`'spawn'`

<!-- YAML
added:
  - v15.1.0
  - v14.17.0
-->

一旦子进程成功生成，就会发出 `'spawn'` 事件。如果子进程未成功生成，则不会发出 `'spawn'` 事件，而是发出 `'error'` 事件。

如果发出，`'spawn'` 事件会在所有其他事件之前，以及在通过 `stdout` 或 `stderr` 接收任何数据之前发生。

无论 **内部** 生成的进程是否发生错误，`'spawn'` 事件都会触发。例如，如果 `bash some-command` 成功生成，`'spawn'` 事件将触发，尽管 `bash` 可能无法生成 `some-command`。此注意事项也适用于使用 `{ shell: true }` 时。

### `subprocess.channel`

<!-- YAML
added: v7.1.0
changes:
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/30165
    description: 该对象不再意外暴露原生 C++ 绑定。
-->

* 类型：{Object} 表示到子进程的 IPC 通道的管道。

`subprocess.channel` 属性是对子进程 IPC 通道的引用。如果不存在 IPC 通道，此属性为 `undefined`。

#### `subprocess.channel.ref()`

<!-- YAML
added: v7.1.0
-->

如果之前已调用 `.unref()`，此方法会使 IPC 通道保持父进程的事件循环运行。

#### `subprocess.channel.unref()`

<!-- YAML
added: v7.1.0
-->

此方法使 IPC 通道不保持父进程的事件循环运行，并允许其在通道打开时完成。

### `subprocess.connected`

<!-- YAML
added: v0.7.2
-->

* 类型：{boolean} 调用 `subprocess.disconnect()` 后设置为 `false`。

`subprocess.connected` 属性指示是否仍然可以从子进程发送和接收消息。当 `subprocess.connected` 为 `false` 时，不再可能发送或接收消息。

### `subprocess.disconnect()`

<!-- YAML
added: v0.7.2
-->

关闭父进程和子进程之间的 IPC 通道，允许子进程在没有其他连接保持其存活时正常退出。调用此方法后，父进程和子进程中的 `subprocess.connected` 和 `process.connected` 属性（分别）将设置为 `false`，并且不再可能在进程之间传递消息。

当没有消息正在接收过程中时，将发出 `'disconnect'` 事件。这通常在调用 `subprocess.disconnect()` 后立即触发。

当子进程是 Node.js 实例时（例如使用 [`child_process.fork()`][] 生成），可以在子进程中调用 `process.disconnect()` 方法来关闭 IPC 通道。

### `subprocess.exitCode`

* 类型：{integer}

`subprocess.exitCode` 属性指示子进程的退出码。如果子进程仍在运行，该字段将为 `null`。

当子进程被信号终止时，`subprocess.exitCode` 将为 `null` 并且将设置 [`subprocess.signalCode`][]。要获取相应的 POSIX 退出码，请使用 [`util.convertProcessSignalToExitCode(subprocess.signalCode)`][`util.convertProcessSignalToExitCode()`]。

### `subprocess.kill([signal])`

<!-- YAML
added: v0.1.90
-->

* `signal` {number|string}
* 返回：{boolean}

`subprocess.kill()` 方法向子进程发送信号。如果未给出参数，进程将被发送 `'SIGTERM'` 信号。参见 signal(7) 获取可用信号列表。如果 kill(2) 成功，此函数返回 `true`，否则返回 `false`。

```cjs
const { spawn } = require('node:child_process');
const grep = spawn('grep', ['ssh']);

grep.on('close', (code, signal) => {
  console.log(
    `child process terminated due to receipt of signal ${signal}`);
});

// 向进程发送 SIGHUP。
grep.kill('SIGHUP');
```

```mjs
import { spawn } from 'node:child_process';
const grep = spawn('grep', ['ssh']);

grep.on('close', (code, signal) => {
  console.log(
    `child process terminated due to receipt of signal ${signal}`);
});

// 向进程发送 SIGHUP。
grep.kill('SIGHUP');
```

如果无法传递信号，[`ChildProcess`][] 对象可能会发出 [`'error'`][] 事件。向已退出的子进程发送信号不是错误，但可能会产生不可预见的后果。具体来说，如果进程标识符 (PID) 已重新分配给另一个进程，信号将传递给该进程，这可能会产生意想不到的结果。

虽然函数名为 `kill`，但传递给子进程的信号可能实际上不会终止进程。

参见 kill(2) 参考。

在 Windows 上，由于不存在 POSIX 信号，`signal` 参数将被忽略，但 `'SIGKILL'`、`'SIGTERM'`、`'SIGINT'` 和 `'SIGQUIT'` 除外，并且进程将始终被强制且突然地终止（类似于 `'SIGKILL'`）。详见 [信号事件][] 了解更多详情。

在 Linux 上，尝试终止父进程时，子进程的子进程不会被终止。当在 shell 中运行新进程或使用 `ChildProcess` 的 `shell` 选项时，可能会发生这种情况：

```cjs
const { spawn } = require('node:child_process');

const subprocess = spawn(
  'sh',
  [
    '-c',
    `node -e "setInterval(() => {
      console.log(process.pid, 'is alive')
    }, 500);"`,
  ], {
    stdio: ['inherit', 'inherit', 'inherit'],
  },
);

setTimeout(() => {
  subprocess.kill(); // 不会终止 shell 中的 Node.js 进程。
}, 2000);
```

```mjs
import { spawn } from 'node:child_process';

const subprocess = spawn(
  'sh',
  [
    '-c',
    `node -e "setInterval(() => {
      console.log(process.pid, 'is alive')
    }, 500);"`,
  ], {
    stdio: ['inherit', 'inherit', 'inherit'],
  },
);

setTimeout(() => {
  subprocess.kill(); // 不会终止 shell 中的 Node.js 进程。
}, 2000);
```

### `subprocess[Symbol.dispose]()`

<!-- YAML
added:
 - v20.5.0
 - v18.18.0
changes:
 - version: v24.2.0
   pr-url: https://github.com/nodejs/node/pull/58467
   description: 不再是实验性的。
-->

使用 `'SIGTERM'` 调用 [`subprocess.kill()`][]。

### `subprocess.killed`

<!-- YAML
added: v0.5.10
-->

* 类型：{boolean} 在使用 `subprocess.kill()` 成功向子进程发送信号后设置为 `true`。

`subprocess.killed` 属性指示子进程是否成功收到来自 `subprocess.kill()` 的信号。`killed` 属性不指示子进程已被终止。

### `subprocess.pid`

<!-- YAML
added: v0.1.90
-->

* 类型：{integer|undefined}

返回子进程的进程标识符 (PID)。如果子进程因错误无法生成，则值为 `undefined` 并发出 `error`。

```cjs
const { spawn } = require('node:child_process');
const grep = spawn('grep', ['ssh']);

console.log(`Spawned child pid: ${grep.pid}`);
grep.stdin.end();
```

```mjs
import { spawn } from 'node:child_process';
const grep = spawn('grep', ['ssh']);

console.log(`Spawned child pid: ${grep.pid}`);
grep.stdin.end();
```

### `subprocess.ref()`

<!-- YAML
added: v0.7.10
-->

在调用 `subprocess.unref()` 之后调用 `subprocess.ref()` 将恢复子进程的已移除引用计数，强制父进程在退出之前等待子进程退出。

```cjs
const { spawn } = require('node:child_process');
const process = require('node:process');

const subprocess = spawn(process.argv[0], ['child_program.js'], {
  detached: true,
  stdio: 'ignore',
});

subprocess.unref();
subprocess.ref();
```

```mjs
import { spawn } from 'node:child_process';
import process from 'node:process';

const subprocess = spawn(process.argv[0], ['child_program.js'], {
  detached: true,
  stdio: 'ignore',
});

subprocess.unref();
subprocess.ref();
```

### `subprocess.send(message[, sendHandle[, options]][, callback])`

<!-- YAML
added: v0.5.9
changes:
  - version: v5.8.0
    pr-url: https://github.com/nodejs/node/pull/5283
    description: "现在支持 `options` 参数，特别是 `keepOpen` 选项。"
  - version: v5.0.0
    pr-url: https://github.com/nodejs/node/pull/3516
    description: 此方法现在返回一个用于流控制的布尔值。
  - version: v4.0.0
    pr-url: https://github.com/nodejs/node/pull/2620
    description: "现在支持 `callback` 参数。"
-->

* `message` {Object}
* `sendHandle` {Handle|undefined} `undefined`，或一个 [`net.Socket`][]、[`net.Server`][] 或 [`dgram.Socket`][] 对象。
* `options` {Object} `options` 参数（如果存在）是一个用于参数化发送某些类型句柄的对象。`options` 支持以下属性：
  * `keepOpen` {boolean} 传递 `net.Socket` 实例时可使用的值。当为 `true` 时，套接字在发送进程中保持打开。**默认值：** `false`。
* `callback` {Function}
* 返回：{boolean}

当父进程和子进程之间建立了 IPC 通道时（即使用 [`child_process.fork()`][] 时），可以使用 `subprocess.send()` 方法向子进程发送消息。当子进程是 Node.js 实例时，可以通过 [`'message'`][] 事件接收这些消息。

消息会经过序列化和解析。结果消息可能与最初发送的消息不同。

例如，在父脚本中：

```cjs
const { fork } = require('node:child_process');
const forkedProcess = fork(`${__dirname}/sub.js`);

forkedProcess.on('message', (message) => {
  console.log('PARENT got message:', message);
});

// 导致子进程打印：CHILD got message: { hello: 'world' }
forkedProcess.send({ hello: 'world' });
```

```mjs
import { fork } from 'node:child_process';
const forkedProcess = fork(`${import.meta.dirname}/sub.js`);

forkedProcess.on('message', (message) => {
  console.log('PARENT got message:', message);
});

// 导致子进程打印：CHILD got message: { hello: 'world' }
forkedProcess.send({ hello: 'world' });
```

然后子脚本 `'sub.js'` 可能如下所示：

```js
process.on('message', (message) => {
  console.log('CHILD got message:', message);
});

// 导致父进程打印：PARENT got message: { foo: 'bar', baz: null }
process.send({ foo: 'bar', baz: NaN });
```

子 Node.js 进程将拥有自己的 [`process.send()`][] 方法，允许子进程向父进程发送消息。

发送 `{cmd: 'NODE_foo'}` 消息时有一个特殊情况。`cmd` 属性中包含 `NODE_` 前缀的消息保留用于 Node.js 核心内部使用，不会在子进程的 [`'message'`][] 事件中发出。相反，此类消息使用 `'internalMessage'` 事件发出，并由 Node.js 内部消耗。应用程序应避免使用此类消息或监听 `'internalMessage'` 事件，因为它可能会在不通知的情况下更改。

传递给 `subprocess.send()` 的可选 `sendHandle` 参数用于将 TCP 服务器或套接字对象传递给子进程。子进程将接收该对象作为传递给注册在 [`'message'`][] 事件上的回调函数的第二个参数。套接字中接收和缓冲的任何数据都不会发送给子进程。Windows 上不支持发送 IPC 套接字。

可选的 `callback` 是一个在消息发送后但在子进程可能收到之前调用的函数。该函数使用单个参数调用：成功时为 `null`，失败时为 [`Error`][] 对象。

如果未提供 `callback` 函数且无法发送消息，[`ChildProcess`][] 对象将发出 `'error'` 事件。例如，当子进程已经退出时，可能会发生这种情况。

如果通道已关闭，或者未发送消息的积压超过阈值使得发送更多消息不明智时，`subprocess.send()` 将返回 `false`。否则，该方法返回 `true`。`callback` 函数可用于实现流控制。

#### 示例：发送服务器对象

例如，`sendHandle` 参数可用于将 TCP 服务器对象的句柄传递给子进程，如下例所示：

```cjs
const { fork } = require('node:child_process');
const { createServer } = require('node:net');

const subprocess = fork('subprocess.js');

// 打开服务器对象并发送句柄。
const server = createServer();
server.on('connection', (socket) => {
  socket.end('handled by parent');
});
server.listen(1337, () => {
  subprocess.send('server', server);
});
```

```mjs
import { fork } from 'node:child_process';
import { createServer } from 'node:net';

const subprocess = fork('subprocess.js');

// 打开服务器对象并发送句柄。
const server = createServer();
server.on('connection', (socket) => {
  socket.end('handled by parent');
});
server.listen(1337, () => {
  subprocess.send('server', server);
});
```

然后子进程将接收服务器对象如下：

```js
process.on('message', (m, server) => {
  if (m === 'server') {
    server.on('connection', (socket) => {
      socket.end('handled by child');
    });
  }
});
```

一旦服务器现在在父进程和子进程之间共享，一些连接可以由父进程处理，一些由子进程处理。

虽然上面的示例使用了使用 `node:net` 模块创建的服务器，但 `node:dgram` 模块服务器使用完全相同的工作流，除了监听 `'message'` 事件而不是 `'connection'` 以及使用 `server.bind()` 而不是 `server.listen()`。然而，这仅在 Unix 平台上受支持。

#### 示例：发送套接字对象

类似地，`sendHandle` 参数可用于将套接字的句柄传递给子进程。下面的示例生成两个子进程，分别处理具有“正常”或“特殊”优先级的连接：

```cjs
const { fork } = require('node:child_process');
const { createServer } = require('node:net');

const normal = fork('subprocess.js', ['normal']);
const special = fork('subprocess.js', ['special']);

// 打开服务器并将套接字发送给子进程。使用 pauseOnConnect 防止套接字在发送给子进程之前被读取。
const server = createServer({ pauseOnConnect: true });
server.on('connection', (socket) => {

  // 如果这是特殊优先级...
  if (socket.remoteAddress === '74.125.127.100') {
    special.send('socket', socket);
    return;
  }
  // 这是正常优先级。
  normal.send('socket', socket);
});
server.listen(1337);
```

```mjs
import { fork } from 'node:child_process';
import { createServer } from 'node:net';

const normal = fork('subprocess.js', ['normal']);
const special = fork('subprocess.js', ['special']);

// 打开服务器并将套接字发送给子进程。使用 pauseOnConnect 防止套接字在发送给子进程之前被读取。
const server = createServer({ pauseOnConnect: true });
server.on('connection', (socket) => {

  // 如果这是特殊优先级...
  if (socket.remoteAddress === '74.125.127.100') {
    special.send('socket', socket);
    return;
  }
  // 这是正常优先级。
  normal.send('socket', socket);
});
server.listen(1337);
```

`subprocess.js` 将接收套接字句柄作为传递给事件回调函数的第二个参数：

```js
process.on('message', (m, socket) => {
  if (m === 'socket') {
    if (socket) {
      // 检查客户端套接字是否存在。
      // 套接字可能在发送时间和子进程接收时间之间关闭。
      socket.end(`Request handled with ${process.argv[2]} priority`);
    }
  }
});
```

不要在已传递给子进程的套接字上使用 `.maxConnections`。父进程无法跟踪套接字何时被销毁。

子进程中的任何 `'message'` 处理程序都应验证 `socket` 是否存在，因为在将连接发送到子进程所需的时间内，连接可能已关闭。

### `subprocess.signalCode`

* 类型：{string|null}

`subprocess.signalCode` 属性指示子进程收到的信号（如果有），否则为 `null`。

当子进程被信号终止时，[`subprocess.exitCode`][] 将为 `null`。要获取相应的 POSIX 退出码，请使用 [`util.convertProcessSignalToExitCode(subprocess.signalCode)`][`util.convertProcessSignalToExitCode()`]。

### `subprocess.spawnargs`

* 类型：{Array}

`subprocess.spawnargs` 属性表示子进程启动时的命令行参数完整列表。

### `subprocess.spawnfile`

* 类型：{string}

`subprocess.spawnfile` 属性指示启动的子进程的可执行文件名。

对于 [`child_process.fork()`][]，其值将等于 [`process.execPath`][]。对于 [`child_process.spawn()`][]，其值将是可执行文件的名称。对于 [`child_process.exec()`][]，其值将是启动子进程的 shell 的名称。

### `subprocess.stderr`

<!-- YAML
added: v0.1.90
-->

* 类型：{stream.Readable|null|undefined}

表示子进程 `stderr` 的 `Readable Stream`。

如果生成子进程时 `stdio[2]` 设置为 `'pipe'` 以外的任何值，则此项将为 `null`。

`subprocess.stderr` 是 `subprocess.stdio[2]` 的别名。两个属性将引用相同的值。

如果无法成功生成子进程，`subprocess.stderr` 属性可以是 `null` 或 `undefined`。

### `subprocess.stdin`

<!-- YAML
added: v0.1.90
-->

* 类型：{stream.Writable|null|undefined}

表示子进程 `stdin` 的 `Writable Stream`。

如果子进程等待读取所有输入，则子进程将不会继续，直到此流通过 `end()` 关闭。

如果生成子进程时 `stdio[0]` 设置为 `'pipe'` 以外的任何值，则此项将为 `null`。

`subprocess.stdin` 是 `subprocess.stdio[0]` 的别名。两个属性将引用相同的值。

如果无法成功生成子进程，`subprocess.stdin` 属性可以是 `null` 或 `undefined`。

### `subprocess.stdio`

<!-- YAML
added: v0.7.10
-->

* 类型：{Array}

到子进程的管道稀疏数组，对应于传递给 [`child_process.spawn()`][] 的 [`stdio`][] 选项中已设置为值 `'pipe'` 的位置。`subprocess.stdio[0]`、`subprocess.stdio[1]` 和 `subprocess.stdio[2]` 也可分别作为 `subprocess.stdin`、`subprocess.stdout` 和 `subprocess.stderr` 使用。

在以下示例中，只有子进程的 fd `1` (stdout) 配置为管道，因此只有父进程的 `subprocess.stdio[1]` 是流，数组中的所有其他值均为 `null`。

```cjs
const assert = require('node:assert');
const fs = require('node:fs');
const child_process = require('node:child_process');

const subprocess = child_process.spawn('ls', {
  stdio: [
    0, // 使用父进程的 stdin 作为子进程。
    'pipe', // 将子进程的 stdout 管道连接到父进程。
    fs.openSync('err.out', 'w'), // 将子进程的 stderr 定向到文件。
  ],
});

assert.strictEqual(subprocess.stdio[0], null);
assert.strictEqual(subprocess.stdio[0], subprocess.stdin);

assert(subprocess.stdout);
assert.strictEqual(subprocess.stdio[1], subprocess.stdout);

assert.strictEqual(subprocess.stdio[2], null);
assert.strictEqual(subprocess.stdio[2], subprocess.stderr);
```

```mjs
import assert from 'node:assert';
import fs from 'node:fs';
import child_process from 'node:child_process';

const subprocess = child_process.spawn('ls', {
  stdio: [
    0, // 使用父进程的 stdin 作为子进程。
    'pipe', // 将子进程的 stdout 管道连接到父进程。
    fs.openSync('err.out', 'w'), // 将子进程的 stderr 定向到文件。
  ],
});

assert.strictEqual(subprocess.stdio[0], null);
assert.strictEqual(subprocess.stdio[0], subprocess.stdin);

assert(subprocess.stdout);
assert.strictEqual(subprocess.stdio[1], subprocess.stdout);

assert.strictEqual(subprocess.stdio[2], null);
assert.strictEqual(subprocess.stdio[2], subprocess.stderr);
```

如果无法成功生成子进程，`subprocess.stdio` 属性可以是 `undefined`。

### `subprocess.stdout`

<!-- YAML
added: v0.1.90
-->

* 类型：{stream.Readable|null|undefined}

表示子进程 `stdout` 的 `Readable Stream`。

如果生成子进程时 `stdio[1]` 设置为 `'pipe'` 以外的任何值，则此项将为 `null`。

`subprocess.stdout` 是 `subprocess.stdio[1]` 的别名。两个属性将引用相同的值。

```cjs
const { spawn } = require('node:child_process');

const subprocess = spawn('ls');

subprocess.stdout.on('data', (data) => {
  console.log(`Received chunk ${data}`);
});
```

```mjs
import { spawn } from 'node:child_process';

const subprocess = spawn('ls');

subprocess.stdout.on('data', (data) => {
  console.log(`Received chunk ${data}`);
});
```

如果无法成功生成子进程，`subprocess.stdout` 属性可以是 `null` 或 `undefined`。

### `subprocess.unref()`

<!-- YAML
added: v0.7.10
-->

默认情况下，父进程将等待分离的子进程退出。要防止父进程等待给定 `subprocess` 退出，请使用 `subprocess.unref()` 方法。这样做会导致父进程的事件循环不在其引用计数中包含子进程，允许父进程独立于子进程退出，除非子进程和父进程之间建立了 IPC 通道。

```cjs
const { spawn } = require('node:child_process');
const process = require('node:process');

const subprocess = spawn(process.argv[0], ['child_program.js'], {
  detached: true,
  stdio: 'ignore',
});

subprocess.unref();
```

```mjs
import { spawn } from 'node:child_process';
import process from 'node:process';

const subprocess = spawn(process.argv[0], ['child_program.js'], {
  detached: true,
  stdio: 'ignore',
});

subprocess.unref();
```

## `maxBuffer` 和 Unicode

`maxBuffer` 选项指定了允许在 `stdout` 或 `stderr` 上输出的最大字节数。如果超过此值，子进程将被终止。这会影响包含多字节字符编码（如 UTF-8 或 UTF-16）的输出。例如，`console.log('中文测试')` 将向 `stdout` 发送 13 个 UTF-8 编码字节，尽管只有 4 个字符。

## Shell 要求

Shell 应该理解 `-c` 开关。如果 shell 是 `'cmd.exe'`，它应该理解 `/d /s /c` 开关，并且命令行解析应该兼容。

## 默认 Windows shell

虽然 Microsoft 指定 `%COMSPEC%` 必须在根环境中包含 `'cmd.exe'` 的路径，但子进程并不总是受相同要求的约束。因此，在可以生成 shell 的 `child_process` 函数中，如果 `process.env.ComSpec` 不可用，则使用 `'cmd.exe'` 作为后备。

## 高级序列化

<!-- YAML
added:
 - v13.2.0
 - v12.16.0
-->

子进程支持一种基于 [`node:v8` 模块的序列化 API][v8.serdes] 的 IPC 序列化机制，该机制基于 [HTML 结构化克隆算法][]。这通常更强大，并支持更多内置 JavaScript 对象类型，例如 `BigInt`、`Map` 和 `Set`、`ArrayBuffer` 和 `TypedArray`、`Buffer`、`Error`、`RegExp` 等。

但是，此格式不是 JSON 的完整超集，例如，在此类内置类型的对象上设置的属性将不会通过序列化步骤传递。此外，根据传递数据的结构，性能可能不如 JSON。因此，此功能需要在调用 [`child_process.spawn()`][] 或 [`child_process.fork()`][] 时将 `serialization` 选项设置为 `'advanced'` 来选择加入。

[高级序列化]: #advanced-serialization
[DEP0190]: deprecations.md#DEP0190
[默认 Windows shell]: #default-windows-shell
[HTML 结构化克隆算法]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
[Shell 要求]: #shell-requirements
[信号事件]: process.md#signal-events
[`'disconnect'`]: process.md#event-disconnect
[`'error'`]: #event-error
[`'exit'`]: #event-exit
[`'message'`]: process.md#event-message
[`ChildProcess`]: #class-childprocess
[`Error`]: errors.md#class-error
[`EventEmitter`]: events.md#class-eventemitter
[`child_process.exec()`]: #child_processexeccommand-options-callback
[`child_process.execFile()`]: #child_processexecfilefile-args-options-callback
[`child_process.execFileSync()`]: #child_processexecfilesyncfile-args-options
[`child_process.execSync()`]: #child_processexecsynccommand-options
[`child_process.fork()`]: #child_processforkmodulepath-args-options
[`child_process.spawn()`]: #child_processspawncommand-args-options
[`child_process.spawnSync()`]: #child_processspawnsynccommand-args-options
[`dgram.Socket`]: dgram.md#class-dgramsocket
[`maxBuffer` 和 Unicode]: #maxbuffer-and-unicode
[`net.Server`]: net.md#class-netserver
[`net.Socket`]: net.md#class-netsocket
[`options.detached`]: #optionsdetached
[`process.disconnect()`]: process.md#processdisconnect
[`process.env`]: process.md#processenv
[`process.execPath`]: process.md#processexecpath
[`process.send()`]: process.md#processsendmessage-sendhandle-options-callback
[`stdio`]: #optionsstdio
[`subprocess.connected`]: #subprocessconnected
[`subprocess.disconnect()`]: #subprocessdisconnect
[`subprocess.exitCode`]: #subprocessexitcode
[`subprocess.kill()`]: #subprocesskillsignal
[`subprocess.send()`]: #subprocesssendmessage-sendhandle-options-callback
[`subprocess.signalCode`]: #subprocesssignalcode
[`subprocess.stderr`]: #subprocessstderr
[`subprocess.stdin`]: #subprocessstdin
[`subprocess.stdio`]: #subprocessstdio
[`subprocess.stdout`]: #subprocessstdout
[`util.convertProcessSignalToExitCode()`]: util.md#utilconvertprocesssignaltoexitcodesignalcode
[`util.promisify()`]: util.md#utilpromisifyoriginal
[同步对应方法]: #synchronous-process-creation
[v8.serdes]: v8.md#serialization-api
