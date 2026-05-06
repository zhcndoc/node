# 进程

<!-- introduced_in=v0.10.0 -->

<!-- type=global -->

<!-- source_link=lib/process.js -->

`process` 对象提供了关于当前 Node.js 进程的信息以及对其的控制。

```mjs
import process from 'node:process';
```

```cjs
const process = require('node:process');
```

## 进程事件

`process` 对象是 [`EventEmitter`][] 的一个实例。

### 事件：`'beforeExit'`

<!-- YAML
added: v0.11.12
-->

当 Node.js 清空其事件循环且没有额外的工作要调度时，会发出 `'beforeExit'` 事件。通常，当没有计划的工作时，Node.js 进程将退出，但在 `'beforeExit'` 事件上注册的监听器可以进行异步调用，从而导致 Node.js 进程继续运行。

监听器回调函数被调用时，会传入 [`process.exitCode`][] 的值作为唯一参数。

 `'beforeExit'` 事件_不_会针对导致显式终止的条件发出，例如调用 [`process.exit()`][] 或未捕获的异常。

除非打算调度额外的工作，否则_不应_将 `'beforeExit'` 用作 `'exit'` 事件的替代方案。

```mjs
import process from 'node:process';

process.on('beforeExit', (code) => {
  console.log('进程 beforeExit 事件，代码：', code);
});

process.on('exit', (code) => {
  console.log('进程 exit 事件，代码：', code);
});

console.log('这条消息会先显示。');

// 输出：
// 这条消息会先显示。
// 进程 beforeExit 事件，代码：0
// 进程 exit 事件，代码：0
```

```cjs
const process = require('node:process');

process.on('beforeExit', (code) => {
  console.log('进程 beforeExit 事件，代码：', code);
});

process.on('exit', (code) => {
  console.log('进程 exit 事件，代码：', code);
});

console.log('这条消息会先显示。');

// 输出：
// 这条消息会先显示。
// 进程 beforeExit 事件，代码：0
// 进程 exit 事件，代码：0
```

### 事件：`'disconnect'`

<!-- YAML
added: v0.7.7
-->

如果 Node.js 进程是使用 IPC 通道生成的（请参阅 [子进程][] 和 [集群][] 文档），则当 IPC 通道关闭时，将发出 `'disconnect'` 事件。

### 事件：`'exit'`

<!-- YAML
added: v0.1.7
-->

* `code` {integer}

当 Node.js 进程即将退出时，会发出 `'exit'` 事件，原因是：

* 显式调用了 `process.exit()` 方法；
* Node.js 事件循环不再有任何额外的工作要执行。

此时无法阻止事件循环退出，一旦所有 `'exit'` 监听器运行完毕，Node.js 进程将终止。

监听器回调函数被调用时，会传入退出码，该退出码由 [`process.exitCode`][] 属性指定，或传递给 [`process.exit()`][] 方法的 `exitCode` 参数指定。

```mjs
import process from 'node:process';

process.on('exit', (code) => {
  console.log(`即将以代码 ${code} 退出`);
});
```

```cjs
const process = require('node:process');

process.on('exit', (code) => {
  console.log(`即将以代码 ${code} 退出`);
});
```

监听器函数**必须**只执行**同步**操作。Node.js 进程将在调用 `'exit'` 事件监听器后立即退出，导致事件循环中排队的任何额外工作被放弃。例如，在下例中，超时将永远不会发生：

```mjs
import process from 'node:process';

process.on('exit', (code) => {
  setTimeout(() => {
    console.log('这不会运行');
  }, 0);
});
```

```cjs
const process = require('node:process');

process.on('exit', (code) => {
  setTimeout(() => {
    console.log('这不会运行');
  }, 0);
});
```

### 事件：`'message'`

<!-- YAML
added: v0.5.10
-->

* `message` {Object|boolean|number|string|null} 一个解析后的 JSON 对象或可序列化的原始值。
* `sendHandle` {net.Server|net.Socket} 一个 [`net.Server`][] 或 [`net.Socket`][] 对象，或 undefined。

如果 Node.js 进程是使用 IPC 通道生成的（请参阅 [子进程][] 和 [集群][] 文档），则每当子进程收到父进程使用 [`childprocess.send()`][] 发送的消息时，都会发出 `'message'` 事件。

消息会经过序列化和解析。结果消息可能与最初发送的消息不同。

如果在生成进程时将 `serialization` 选项设置为 `advanced`，则 `message` 参数可以包含 JSON 无法表示的数据。有关更多详细信息，请参阅 [`child_process` 的高级序列化][]。

### 事件：`'rejectionHandled'`

<!-- YAML
added: v1.4.1
-->

* `promise` {Promise} 后期处理的 promise。

每当 `Promise` 被拒绝且错误处理程序（例如使用 [`promise.catch()`][]）在 Node.js 事件循环的一个轮次之后附加到它时，就会发出 `'rejectionHandled'` 事件。

`Promise` 对象之前会在 `'unhandledRejection'` 事件中发出，但在处理过程中获得了拒绝处理程序。

在 `Promise` 链中没有一个顶层概念可以始终处理拒绝。由于本质上是异步的，`Promise` 拒绝可以在未来的某个时间点被处理，这可能比发出 `'unhandledRejection'` 事件所需的事件循环轮次晚得多。

另一种说法是，与同步代码中存在不断增长的未处理异常列表不同，对于 Promise，未处理拒绝的列表可以增长和缩小。

在同步代码中，当未处理异常列表增长时，会发出 `'uncaughtException'` 事件。

在异步代码中，当未处理拒绝列表增长时会发出 `'unhandledRejection'` 事件，而当未处理拒绝列表缩小时，会发出 `'rejectionHandled'` 事件。

```mjs
import process from 'node:process';

const unhandledRejections = new Map();
process.on('unhandledRejection', (reason, promise) => {
  unhandledRejections.set(promise, reason);
});
process.on('rejectionHandled', (promise) => {
  unhandledRejections.delete(promise);
});
```

```cjs
const process = require('node:process');

const unhandledRejections = new Map();
process.on('unhandledRejection', (reason, promise) => {
  unhandledRejections.set(promise, reason);
});
process.on('rejectionHandled', (promise) => {
  unhandledRejections.delete(promise);
});
```

在此示例中，`unhandledRejections` `Map` 将随时间增长和缩小，反映开始未处理然后变为已处理的拒绝。可以将此类错误记录在错误日志中，要么定期记录（这对于长期运行的应用程序可能是最好的），要么在进程退出时记录（这对于脚本可能最方便）。

### 事件：`'workerMessage'`

<!-- YAML
added:
- v22.5.0
- v20.19.0
-->

* `value` {any} 使用 [`postMessageToThread()`][] 传输的值。
* `source` {number} 发送消息的工作线程 ID，如果是主线程则为 `0`。

每当另一方使用 [`postMessageToThread()`][] 发送任何传入消息时，都会发出 `'workerMessage'` 事件。

### 事件：`'uncaughtException'`

<!-- YAML
added: v0.1.18
changes:
  - version:
     - v12.0.0
     - v10.17.0
    pr-url: https://github.com/nodejs/node/pull/26599
    description: "添加了 `origin` 参数。"
-->

* `err` {Error} 未捕获的异常。
* `origin` {string} 指示异常是源自未处理的拒绝还是同步错误。可以是 `'uncaughtException'` 或 `'unhandledRejection'`。当异常发生在基于 `Promise` 的异步上下文中（或者如果 `Promise` 被拒绝）且 [`--unhandled-rejections`][] 标志设置为 `strict` 或 `throw`（这是默认值）且拒绝未被处理时，或者当拒绝发生在命令行入口点的 ES 模块静态加载阶段时，使用后者。

当未捕获的 JavaScript 异常一直冒泡回到事件循环时，会发出 `'uncaughtException'` 事件。默认情况下，Node.js 通过将这些异常的堆栈跟踪打印到 `stderr` 并以代码 1 退出出来处理此类异常，覆盖任何先前设置的 [`process.exitCode`][]。为 `'uncaughtException'` 事件添加处理程序会覆盖此默认行为。或者，在 `'uncaughtException'` 处理程序中更改 [`process.exitCode`][]，这将导致进程以提供的退出代码退出。否则，在此类处理程序存在的情况下，进程将以 0 退出。

```mjs
import process from 'node:process';
import fs from 'node:fs';

process.on('uncaughtException', (err, origin) => {
  fs.writeSync(
    process.stderr.fd,
    `捕获到异常：${err}\n` +
    `异常来源：${origin}\n`,
  );
});

setTimeout(() => {
  console.log('这仍然会运行。');
}, 500);

// 故意引发异常，但不捕获它。
nonexistentFunc();
console.log('这不会运行。');
```

```cjs
const process = require('node:process');
const fs = require('node:fs');

process.on('uncaughtException', (err, origin) => {
  fs.writeSync(
    process.stderr.fd,
    `捕获到异常：${err}\n` +
    `异常来源：${origin}\n`,
  );
});

setTimeout(() => {
  console.log('这仍然会运行。');
}, 500);

// 故意引发异常，但不捕获它。
nonexistentFunc();
console.log('这不会运行。');
```

可以通过安装 `'uncaughtExceptionMonitor'` 监听器来监控 `'uncaughtException'` 事件，而无需覆盖退出进程的默认行为。

#### 警告：正确使用 `'uncaughtException'`

`'uncaughtException'` 是一种用于异常处理的粗略机制，仅应作为最后手段使用。该事件_不_应_用作等同于 `On Error Resume Next`。未处理的异常本质上意味着应用程序处于未定义状态。尝试在不正确恢复异常的情况下恢复应用程序代码可能会导致额外的不可预见和不可预测的问题。

从事件处理程序内部抛出的异常将不会被捕获。相反，进程将以非零退出代码退出，并将打印堆栈跟踪。这是为了避免无限递归。

尝试在未捕获异常后恢复正常操作类似于在升级计算机时拔出电源线。十次中有九次，什么也没发生。但第十次，系统会变得损坏。

正确使用 `'uncaughtException'` 是在关闭进程之前对分配的资源（例如文件描述符、句柄等）执行同步清理。**在 `'uncaughtException'` 之后恢复正常运行是不安全的。**

要以更可靠的方式重启崩溃的应用程序，无论是否发出 `'uncaughtException'`，都应在单独的进程中使用外部监控器来检测应用程序故障并根据需要进行恢复或重启。

### 事件：`'uncaughtExceptionMonitor'`

<!-- YAML
added:
 - v13.7.0
 - v12.17.0
-->

* `err` {Error} 未捕获的异常。
* `origin` {string} 指示异常是源自未处理的拒绝还是同步错误。可以是 `'uncaughtException'` 或 `'unhandledRejection'`。当异常发生在基于 `Promise` 的异步上下文中（或者如果 `Promise` 被拒绝）且 [`--unhandled-rejections`][] 标志设置为 `strict` 或 `throw`（这是默认值）且拒绝未被处理时，或者当拒绝发生在命令行入口点的 ES 模块静态加载阶段时，使用后者。

在发出 `'uncaughtException'` 事件之前或通过 [`process.setUncaughtExceptionCaptureCallback()`][] 安装钩子之前，会发出 `'uncaughtExceptionMonitor'` 事件。

安装 `'uncaughtExceptionMonitor'` 监听器不会改变发出 `'uncaughtException'` 事件后的行为。如果没有安装 `'uncaughtException'` 监听器，进程仍然会崩溃。

```mjs
import process from 'node:process';

process.on('uncaughtExceptionMonitor', (err, origin) => {
  MyMonitoringTool.logSync(err, origin);
});

// 故意引发异常，但不捕获它。
nonexistentFunc();
// 仍然会导致 Node.js 崩溃
```

```cjs
const process = require('node:process');

process.on('uncaughtExceptionMonitor', (err, origin) => {
  MyMonitoringTool.logSync(err, origin);
});

// 故意引发异常，但不捕获它。
nonexistentFunc();
// 仍然会导致 Node.js 崩溃
```

### 事件：`'unhandledRejection'`

<!-- YAML
added: v1.4.1
changes:
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/8217
    description: "不处理 `Promise` 拒绝已弃用。"
  - version: v6.6.0
    pr-url: https://github.com/nodejs/node/pull/8223
    description: "未处理的 `Promise` 拒绝现在将发出进程警告。"
-->

* `reason` {Error|any} 拒绝 promise 的对象（通常是 [`Error`][] 对象）。
* `promise` {Promise} 被拒绝的 promise。

每当 `Promise` 被拒绝且在事件循环的一个轮次内没有错误处理程序附加到该 promise 时，就会发出 `'unhandledRejection'` 事件。当使用 Promise 编程时，异常被封装为“被拒绝的 promise"。可以使用 [`promise.catch()`][] 捕获和处理拒绝，并通过 `Promise` 链传播。`'unhandledRejection'` 事件对于检测和跟踪那些被拒绝但尚未处理拒绝的 promise 很有用。

```mjs
import process from 'node:process';

process.on('unhandledRejection', (reason, promise) => {
  console.log('未处理的拒绝位置：', promise, '原因：', reason);
  // 应用程序特定的日志记录、抛出错误或其他逻辑在此处
});

somePromise.then((res) => {
  return reportToUser(JSON.pasre(res)); // 注意拼写错误（`pasre`）
}); // 没有 `.catch()` 或 `.then()`
```

```cjs
const process = require('node:process');

process.on('unhandledRejection', (reason, promise) => {
  console.log('未处理的拒绝位置：', promise, '原因：', reason);
  // 应用程序特定的日志记录、抛出错误或其他逻辑在此处
});

somePromise.then((res) => {
  return reportToUser(JSON.pasre(res)); // 注意拼写错误（`pasre`）
}); // 没有 `.catch()` 或 `.then()`
```

以下情况也会触发发出 `'unhandledRejection'` 事件：

```mjs
import process from 'node:process';

function SomeResource() {
  // 最初将加载状态设置为被拒绝的 promise
  this.loaded = Promise.reject(new Error('资源尚未加载！'));
}

const resource = new SomeResource();
// resource.loaded 上至少在一个事件循环轮次内没有 .catch 或 .then
```

```cjs
const process = require('node:process');

function SomeResource() {
  // 最初将加载状态设置为被拒绝的 promise
  this.loaded = Promise.reject(new Error('资源尚未加载！'));
}

const resource = new SomeResource();
// resource.loaded 上至少在一个事件循环轮次内没有 .catch 或 .then
```

在此示例情况下，可以将拒绝跟踪为开发者错误，这通常是其他 `'unhandledRejection'` 事件的情况。为了解决此类故障，可以将非操作性的 [`.catch(() => { })`][`promise.catch()`] 处理程序附加到 `resource.loaded`，这将防止发出 `'unhandledRejection'` 事件。

如果发出 `'unhandledRejection'` 事件但未处理，它将作为未捕获异常抛出。这与 `'unhandledRejection'` 事件的其他行为一起，可以通过 [`--unhandled-rejections`][] 标志进行更改。

### 事件：`'warning'`

<!-- YAML
added: v6.0.0
-->

* `warning` {Error} 警告的关键属性是：
  * `name` {string} 警告的名称。**默认值：** `'Warning'`。
  * `message` {string} 系统提供的警告描述。
  * `stack` {string} 指向发出警告的代码位置的堆栈跟踪。

每当 Node.js 发出进程警告时，就会发出 `'warning'` 事件。

进程警告类似于错误，因为它描述了引起用户注意的异常情况。但是，警告不是正常 Node.js 和 JavaScript 错误处理流程的一部分。每当 Node.js 检测到可能导致应用程序性能次优、错误或安全漏洞的不良编码实践时，它都可以发出警告。

```mjs
import process from 'node:process';

process.on('warning', (warning) => {
  console.warn(warning.name);    // 打印警告名称
  console.warn(warning.message); // 打印警告消息
  console.warn(warning.stack);   // 打印堆栈跟踪
});
```

```cjs
const process = require('node:process');

process.on('warning', (warning) => {
  console.warn(warning.name);    // 打印警告名称
  console.warn(warning.message); // 打印警告消息
  console.warn(warning.stack);   // 打印堆栈跟踪
});
```

默认情况下，Node.js 会将进程警告打印到 `stderr`。`--no-warnings` 命令行选项可用于抑制默认控制台输出，但 `'warning'` 事件仍将由 `process` 对象发出。目前，除了弃用警告外，无法抑制特定类型的警告。要抑制弃用警告，请查看 [`--no-deprecation`][] 标志。

以下示例说明了当向事件添加过多监听器时打印到 `stderr` 的警告：

```console
$ node
> events.defaultMaxListeners = 1;
> process.on('foo', () => {});
> process.on('foo', () => {});
> (node:38638) MaxListenersExceededWarning: 可能的 EventEmitter 内存泄漏
检测到。已添加 2 个 foo 监听器。使用 emitter.setMaxListeners() 来增加限制
```

相反，以下示例关闭了默认警告输出并向 `'warning'` 事件添加了自定义处理程序：

```console
$ node --no-warnings
> const p = process.on('warning', (warning) => console.warn('不要那样做！'));
> events.defaultMaxListeners = 1;
> process.on('foo', () => {});
> process.on('foo', () => {});
> 不要那样做！
```

`--trace-warnings` 命令行选项可用于让警告的默认控制台输出包含警告的完整堆栈跟踪。

使用 `--throw-deprecation` 命令行标志启动 Node.js 将导致自定义弃用警告作为异常抛出。

使用 `--trace-deprecation` 命令行标志将导致自定义弃用连同堆栈跟踪一起打印到 `stderr`。

使用 `--no-deprecation` 命令行标志将抑制所有自定义弃用的报告。

`*-deprecation` 命令行标志仅影响使用名称 `'DeprecationWarning'` 的警告。

#### 发出自定义警告

有关发出自定义或应用程序特定警告的信息，请参阅 [`process.emitWarning()`][process_emit_warning] 方法。

#### Node.js 警告名称

对于 Node.js 发出的警告类型（由 `name` 属性标识），没有严格的指南。随时可以添加新类型的警告。一些最常见的警告类型包括：

* `'DeprecationWarning'` - 指示使用了已弃用的 Node.js API 或功能。此类警告必须包括标识 [弃用代码][] 的 `'code'` 属性。
* `'ExperimentalWarning'` - 指示使用了实验性的 Node.js API 或功能。此类功能必须谨慎使用，因为它们可能随时更改，并且不受与支持功能相同的严格语义版本控制和长期支持政策的约束。
* `'MaxListenersExceededWarning'` - 指示在 `EventEmitter` 或 `EventTarget` 上为给定事件注册了过多监听器。这通常是内存泄漏的迹象。
* `'TimeoutOverflowWarning'` - 指示已向 `setTimeout()` 或 `setInterval()` 函数提供了无法适应 32 位有符号整数的数值。
* `'TimeoutNegativeWarning'` - 指示已向 `setTimeout()` 或 `setInterval()` 函数提供了负数。
* `'TimeoutNaNWarning'` - 指示已向 `setTimeout()` 或 `setInterval()` 函数提供了非数字值。
* `'UnsupportedWarning'` - 指示使用了不受支持的选项或功能，该选项或功能将被忽略而不是被视为错误。一个示例是在使用 HTTP/2 兼容 API 时使用 HTTP 响应状态消息。

### 事件：`'worker'`

<!-- YAML
added:
  - v16.2.0
  - v14.18.0
-->

* `worker` {Worker} 创建的 {Worker}。

在新的 {Worker} 线程创建后，会发出 `'worker'` 事件。

### 信号事件

<!--type=event-->

<!--name=SIGINT, SIGHUP, etc.-->

当 Node.js 进程收到信号时，将发出信号事件。请参阅 signal(7) 以获取标准 POSIX 信号名称列表，例如 `'SIGINT'`、`'SIGHUP'` 等。

[`Worker`][] 线程上不可用信号。

信号处理程序将接收信号的名称（`'SIGINT'`、`'SIGTERM'` 等）作为第一个参数。

每个事件的名称将是信号的大写通用名称（例如，`SIGINT` 信号为 `'SIGINT'`）。

```mjs
import process from 'node:process';

// 开始从 stdin 读取，以便进程不会退出。
process.stdin.resume();

process.on('SIGINT', () => {
  console.log('收到 SIGINT。按 Control-D 退出。');
});

// 使用单个函数处理多个信号
function handle(signal) {
  console.log(`收到 ${signal}`);
}

process.on('SIGINT', handle);
process.on('SIGTERM', handle);
```

```cjs
const process = require('node:process');

// 开始从 stdin 读取，以便进程不会退出。
process.stdin.resume();

process.on('SIGINT', () => {
  console.log('收到 SIGINT。按 Control-D 退出。');
});

// 使用单个函数处理多个信号
function handle(signal) {
  console.log(`收到 ${signal}`);
}

process.on('SIGINT', handle);
process.on('SIGTERM', handle);
```

* `'SIGUSR1'` 由 Node.js 保留用于启动 [调试器][]。可以安装监听器，但这样做可能会干扰调试器。
* `'SIGTERM'` 和 `'SIGINT'` 在非 Windows 平台上有默认处理程序，在退出前重置终端模式，退出代码为 `128 + 信号编号`。如果安装了这些信号之一的监听器，其默认行为将被移除（Node.js 将不再退出）。
* `'SIGPIPE'` 默认被忽略。可以安装监听器。
* `'SIGHUP'` 在关闭控制台窗口时在 Windows 上生成，在其他平台上在各种类似条件下生成。请参阅 signal(7)。可以安装监听器，但是 Node.js 将在大约 10 秒后被 Windows 无条件终止。在非 Windows 平台上，`SIGHUP` 的默认行为是终止 Node.js，但一旦安装了监听器，其默认行为将被移除。
* `'SIGTERM'` 在 Windows 上不受支持，可以监听。
* `'SIGINT'` 来自终端在所有平台上都受支持，通常可以使用 <kbd>Ctrl</kbd>+<kbd>C</kbd> 生成（尽管这可能是可配置的）。当启用 [终端原始模式][] 并使用 <kbd>Ctrl</kbd>+<kbd>C</kbd> 时，不会生成它。
* `'SIGBREAK'` 在按下 <kbd>Ctrl</kbd>+<kbd>Break</kbd> 时在 Windows 上发送。在非 Windows 平台上，可以监听，但无法发送或生成它。
* `'SIGWINCH'` 在控制台调整大小时发送。在 Windows 上，这仅在写入控制台时光标移动时发生，或者当在原始模式下使用可读 tty 时发生。
* `'SIGKILL'` 不能安装监听器，它将在所有平台上无条件终止 Node.js。
* `'SIGSTOP'` 不能安装监听器。
* `'SIGBUS'`、`'SIGFPE'`、`'SIGSEGV'` 和 `'SIGILL'`，当不使用 kill(2) 人为引发时，本质上会使进程处于不安全调用 JS 监听器的状态。这样做可能会导致进程停止响应。
* `0` 可以发送以测试进程是否存在，如果进程存在则没有效果，但如果进程不存在将抛出错误。

Windows 不支持信号，因此没有通过信号终止的等效方法，但 Node.js 通过 [`process.kill()`][] 和 [`subprocess.kill()`][] 提供了一些模拟：

* 发送 `SIGINT`、`SIGTERM` 和 `SIGKILL` 将导致目标进程无条件终止，之后，子进程将报告进程被信号终止。
* 发送信号 `0` 可用作测试进程是否存在的一种与平台无关的方式。

## `process.abort()`

<!-- YAML
added: v0.7.0
-->

`process.abort()` 方法会导致 Node.js 进程立即退出并生成核心转储文件。

此功能在 [`Worker`][] 线程中不可用。

## `process.addUncaughtExceptionCaptureCallback(fn)`

<!-- YAML
added:
 - v26.0.0
 - v25.9.0
-->

> 稳定性：1 - 实验性

* `fn` {Function}

`process.addUncaughtExceptionCaptureCallback()` 函数添加一个回调，当发生未捕获异常时将调用该回调，接收异常值作为其第一个参数。

与 [`process.setUncaughtExceptionCaptureCallback()`][] 不同，此函数允许注册多个回调，并且不与 [`domain`][] 模块冲突。回调按注册的反序调用（最近的优先）。如果回调返回 `true`，后续回调和默认的未捕获异常处理将被跳过。

```mjs
import process from 'node:process';

process.addUncaughtExceptionCaptureCallback((err) => {
  console.error('捕获到异常：', err.message);
  return true; // 表示异常已处理
});
```

```cjs
const process = require('node:process');

process.addUncaughtExceptionCaptureCallback((err) => {
  console.error('捕获到异常：', err.message);
  return true; // 表示异常已处理
});
```

## `process.allowedNodeEnvironmentFlags`

<!-- YAML
added: v10.10.0
-->

* 类型：{Set}

`process.allowedNodeEnvironmentFlags` 属性是一个特殊的、只读的 `Set`，包含 [`NODE_OPTIONS`][] 环境变量中允许的标志。

`process.allowedNodeEnvironmentFlags` 扩展了 `Set`，但重写了 `Set.prototype.has` 以识别几种不同的可能标志表示形式。在以下情况下，`process.allowedNodeEnvironmentFlags.has()` 将返回 `true`：

* 标志可以省略前导单 (`-`) 或双 (`--`) 破折号；例如，`--inspect-brk` 对应 `inspect-brk`，或 `-r` 对应 `r`。
* 传递给 V8 的标志（如在 `--v8-options` 中列出的）可以用一个或多个_非前导_破折号替换为下划线，反之亦然；例如，`--perf_basic_prof`、`--perf-basic-prof`、`--perf_basic-prof` 等。
* 标志可能包含一个或多个等号 (`=`) 字符；第一个等号及之后的所有字符将被忽略；例如，`--stack-trace-limit=100`。
* 标志 _必须_ 允许在 [`NODE_OPTIONS`][] 中使用。

当迭代 `process.allowedNodeEnvironmentFlags` 时，标志将仅出现 _一次_；每个标志将以一个或多个破折号开头。传递给 V8 的标志将包含下划线而不是非前导破折号：

```mjs
import { allowedNodeEnvironmentFlags } from 'node:process';

allowedNodeEnvironmentFlags.forEach((flag) => {
  // -r
  // --inspect-brk
  // --abort_on_uncaught_exception
  // ...
});
```

```cjs
const { allowedNodeEnvironmentFlags } = require('node:process');

allowedNodeEnvironmentFlags.forEach((flag) => {
  // -r
  // --inspect-brk
  // --abort_on_uncaught_exception
  // ...
});
```

`process.allowedNodeEnvironmentFlags` 的 `add()`、`clear()` 和 `delete()` 方法什么都不做，并且会静默失败。

如果 Node.js 编译时 _没有_ [`NODE_OPTIONS`][] 支持（显示在 [`process.config`][] 中），`process.allowedNodeEnvironmentFlags` 将包含 _原本_ 允许的内容。

## `process.arch`

<!-- YAML
added: v0.5.0
-->

* 类型：{string}

Node.js 二进制文件编译所在的操作系统 CPU 架构。可能的值为：`'arm'`、`'arm64'`、`'ia32'`、`'loong64'`、`'mips'`、`'mipsel'`、`'ppc64'`、`'riscv64'`、`'s390'`、`'s390x'` 和 `'x64'`。

```mjs
import { arch } from 'node:process';

console.log(`This processor architecture is ${arch}`);
```

```cjs
const { arch } = require('node:process');

console.log(`This processor architecture is ${arch}`);
```

## `process.argv`

<!-- YAML
added: v0.1.27
-->

* 类型：{string\[]}

`process.argv` 属性返回一个数组，包含启动 Node.js 进程时传递的命令行参数。第一个元素将是 [`process.execPath`][]。如果需要访问 `argv[0]` 的原始值，请参阅 `process.argv0`。如果提供了 [程序入口点][]，第二个元素将是其绝对路径。其余元素是额外的命令行参数。

例如，假设 `process-args.js` 的脚本如下：

```mjs
import { argv } from 'node:process';

// 打印 process.argv
argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});
```

```cjs
const { argv } = require('node:process');

// 打印 process.argv
argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});
```

启动 Node.js 进程如下：

```bash
node process-args.js one two=three four
```

将生成输出：

```text
0: /usr/local/bin/node
1: /Users/mjr/work/node/process-args.js
2: one
3: two=three
4: four
```

## `process.argv0`

<!-- YAML
added: v6.4.0
-->

* 类型：{string}

`process.argv0` 属性存储启动时传递的 `argv[0]` 原始值的只读副本。

```console
$ bash -c 'exec -a customArgv0 ./node'
> process.argv[0]
'/Volumes/code/external/node/out/Release/node'
> process.argv0
'customArgv0'
```

## `process.availableMemory()`

<!-- YAML
added:
  - v22.0.0
  - v20.13.0
changes:
  - version:
    - v24.0.0
    - v22.16.0
    pr-url: https://github.com/nodejs/node/pull/57765
    description: 将此功能的稳定性索引从实验性更改为稳定。
-->

* 返回：{number}

获取进程仍可用的空闲内存量（以字节为单位）。

有关更多信息，请参阅 [`uv_get_available_memory`][uv_get_available_memory]。

## `process.channel`

<!-- YAML
added: v7.1.0
changes:
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/30165
    description: 该对象不再意外暴露原生 C++ 绑定。
-->

* 类型：{Object}

如果 Node.js 进程是使用 IPC 通道生成的（请参阅 [子进程][] 文档），则 `process.channel` 属性是对 IPC 通道的引用。如果不存在 IPC 通道，则此属性为 `undefined`。

### `process.channel.ref()`

<!-- YAML
added: v7.1.0
-->

此方法使 IPC 通道保持进程的事件循环运行，如果之前已调用 `.unref()`。

通常，这是通过 `process` 对象上的 `'disconnect'` 和 `'message'` 监听器的数量来管理的。但是，此方法可用于显式请求特定行为。

### `process.channel.unref()`

<!-- YAML
added: v7.1.0
-->

此方法使 IPC 通道不保持进程的事件循环运行，并允许即使通道打开也结束进程。

通常，这是通过 `process` 对象上的 `'disconnect'` 和 `'message'` 监听器的数量来管理的。但是，此方法可用于显式请求特定行为。

## `process.chdir(directory)`

<!-- YAML
added: v0.1.17
-->

* `directory` {string}

`process.chdir()` 方法更改 Node.js 进程的当前工作目录，如果失败则抛出异常（例如，如果指定的 `directory` 不存在）。

```mjs
import { chdir, cwd } from 'node:process';

console.log(`Starting directory: ${cwd()}`);
try {
  chdir('/tmp');
  console.log(`New directory: ${cwd()}`);
} catch (err) {
  console.error(`chdir: ${err}`);
}
```

```cjs
const { chdir, cwd } = require('node:process');

console.log(`Starting directory: ${cwd()}`);
try {
  chdir('/tmp');
  console.log(`New directory: ${cwd()}`);
} catch (err) {
  console.error(`chdir: ${err}`);
}
```

此功能在 [`Worker`][] 线程中不可用。

## `process.config`

<!-- YAML
added: v0.7.7
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/43627
    description: "`process.config` 对象现在已冻结。"
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/36902
    description: 修改 process.config 已被弃用。
-->

* 类型：{Object}

`process.config` 属性返回一个冻结的 `Object`，包含用于编译当前 Node.js 可执行文件的配置选项的 JavaScript 表示。这与运行 `./configure` 脚本时生成的 `config.gypi` 文件相同。

可能输出的示例如下：

<!-- eslint-skip -->

```js
{
  target_defaults:
   { cflags: [],
     default_configuration: 'Release',
     defines: [],
     include_dirs: [],
     libraries: [] },
  variables:
   {
     host_arch: 'x64',
     napi_build_version: 5,
     node_install_npm: 'true',
     node_prefix: '',
     node_shared_cares: 'false',
     node_shared_http_parser: 'false',
     node_shared_libuv: 'false',
     node_shared_zlib: 'false',
     node_use_openssl: 'true',
     node_shared_openssl: 'false',
     target_arch: 'x64',
     v8_use_snapshot: 1
   }
}
```

## `process.connected`

<!-- YAML
added: v0.7.2
-->

* 类型：{boolean}

如果 Node.js 进程是使用 IPC 通道生成的（请参阅 [子进程][] 和 [集群][] 文档），只要 IPC 通道已连接，`process.connected` 属性将返回 `true`，并且在调用 `process.disconnect()` 之后将返回 `false`。

一旦 `process.connected` 为 `false`，就不再可能使用 `process.send()` 通过 IPC 通道发送消息。

## `process.constrainedMemory()`

<!-- YAML
added:
  - v19.6.0
  - v18.15.0
changes:
  - version:
    - v24.0.0
    - v22.16.0
    pr-url: https://github.com/nodejs/node/pull/57765
    description: 将此功能的稳定性索引从实验性更改为稳定。
  - version:
    - v22.0.0
    - v20.13.0
    pr-url: https://github.com/nodejs/node/pull/52039
    description: "与 `uv_get_constrained_memory` 对齐返回值。"
-->

* 返回：{number}

获取进程可用的内存量（以字节为单位），基于操作系统施加的限制。如果没有此类约束，或约束未知，则返回 `0`。

有关更多信息，请参阅 [`uv_get_constrained_memory`][uv_get_constrained_memory]。

## `process.cpuUsage([previousValue])`

<!-- YAML
added: v6.1.0
-->

* `previousValue` {Object} 调用 `process.cpuUsage()` 返回的上一个值
* 返回：{Object}
  * `user` {integer}
  * `system` {integer}

`process.cpuUsage()` 方法返回当前进程的用户态和系统态 CPU 时间使用情况，在一个包含 `user` 和 `system` 属性的对象中，其值为微秒值（百万分之一秒）。这些值分别测量花在用户代码和系统代码上的时间，如果多个 CPU 核心为此进程执行工作，最终值可能会大于实际经过的时间。

上一次调用 `process.cpuUsage()` 的结果可以作为参数传递给该函数，以获得差异读数。

```mjs
import { cpuUsage } from 'node:process';

const startUsage = cpuUsage();
// { user: 38579, system: 6986 }

// 让 CPU 空转 500 毫秒
const now = Date.now();
while (Date.now() - now < 500);

console.log(cpuUsage(startUsage));
// { user: 514883, system: 11226 }
```

```cjs
const { cpuUsage } = require('node:process');

const startUsage = cpuUsage();
// { user: 38579, system: 6986 }

// 让 CPU 空转 500 毫秒
const now = Date.now();
while (Date.now() - now < 500);

console.log(cpuUsage(startUsage));
// { user: 514883, system: 11226 }
```

## `process.cwd()`

<!-- YAML
added: v0.1.8
-->

* 返回：{string}

`process.cwd()` 方法返回 Node.js 进程的当前工作目录。

```mjs
import { cwd } from 'node:process';

console.log(`Current directory: ${cwd()}`);
```

```cjs
const { cwd } = require('node:process');

console.log(`Current directory: ${cwd()}`);
```

## `process.debugPort`

<!-- YAML
added: v0.7.2
-->

* 类型：{number}

启用时 Node.js 调试器使用的端口。

```mjs
import process from 'node:process';

process.debugPort = 5858;
```

```cjs
const process = require('node:process');

process.debugPort = 5858;
```

## `process.disconnect()`

<!-- YAML
added: v0.7.2
-->

如果 Node.js 进程是使用 IPC 通道生成的（参见 [子进程][] 和 [集群][] 文档），`process.disconnect()` 方法将关闭到父进程的 IPC 通道，允许子进程在没有其他连接保持存活时优雅地退出。

调用 `process.disconnect()` 的效果与从父进程调用 [`ChildProcess.disconnect()`][] 相同。

如果 Node.js 进程不是使用 IPC 通道生成的，`process.disconnect()` 将为 `undefined`。

## `process.dlopen(module, filename[, flags])`

<!-- YAML
added: v0.1.16
changes:
  - version: v9.0.0
    pr-url: https://github.com/nodejs/node/pull/12794
    description: "增加了对 `flags` 参数的支持。"
-->

* `module` {Object}
* `filename` {string}
* `flags` {os.constants.dlopen} **默认值：** `os.constants.dlopen.RTLD_LAZY`

`process.dlopen()` 方法允许动态加载共享对象。它主要由 `require()` 用于加载 C++ 插件，不应直接使用，除非特殊情况。换句话说，除非有特定原因（如自定义 dlopen 标志或从 ES 模块加载），否则应优先使用 [`require()`][] 而不是 `process.dlopen()`。

`flags` 参数是一个整数，允许指定 dlopen 行为。详见 [`os.constants.dlopen`][] 文档。

调用 `process.dlopen()` 时的一个重要要求是必须传递 `module` 实例。C++ 插件导出的函数然后通过 `module.exports` 访问。

下面的示例展示了如何加载一个名为 `local.node` 的 C++ 插件，它导出一个 `foo` 函数。通过传递 `RTLD_NOW` 常量，在调用返回之前加载所有符号。在此示例中，假设该常量可用。

```mjs
import { dlopen } from 'node:process';
import { constants } from 'node:os';
import { fileURLToPath } from 'node:url';

const module = { exports: {} };
dlopen(module, fileURLToPath(new URL('local.node', import.meta.url)),
       constants.dlopen.RTLD_NOW);
module.exports.foo();
```

```cjs
const { dlopen } = require('node:process');
const { constants } = require('node:os');
const { join } = require('node:path');

const module = { exports: {} };
dlopen(module, join(__dirname, 'local.node'), constants.dlopen.RTLD_NOW);
module.exports.foo();
```

## `process.emitWarning(warning[, options])`

<!-- YAML
added: v8.0.0
-->

* `warning` {string|Error} 要发出的警告。
* `options` {Object}
  * `type` {string} 当 `warning` 是 `String` 时，`type` 是用于发出的警告_类型_的名称。**默认值：** `'Warning'`。
  * `code` {string} 正在发出的警告实例的唯一标识符。
  * `ctor` {Function} 当 `warning` 是 `String` 时，`ctor` 是一个可选函数，用于限制生成的堆栈跟踪。**默认值：** `process.emitWarning`。
  * `detail` {string} 包含在错误中的附加文本。

`process.emitWarning()` 方法可用于发出自定义或特定于应用程序的进程警告。可以通过向 [`'warning'`][process_warning] 事件添加处理程序来监听这些警告。

```mjs
import { emitWarning } from 'node:process';

// 发出带有代码和附加详情的警告。
emitWarning('Something happened!', {
  code: 'MY_WARNING',
  detail: '这是一些附加信息',
});
// 发出：
// (node:56338) [MY_WARNING] Warning: Something happened!
// 这是一些附加信息
```

```cjs
const { emitWarning } = require('node:process');

// 发出带有代码和附加详情的警告。
emitWarning('Something happened!', {
  code: 'MY_WARNING',
  detail: '这是一些附加信息',
});
// 发出：
// (node:56338) [MY_WARNING] Warning: Something happened!
// 这是一些附加信息
```

在此示例中，`Error` 对象由 `process.emitWarning()` 内部生成并传递给 [`'warning'`][process_warning] 处理程序。

```mjs
import process from 'node:process';

process.on('warning', (warning) => {
  console.warn(warning.name);    // 'Warning'
  console.warn(warning.message); // 'Something happened!'
  console.warn(warning.code);    // 'MY_WARNING'
  console.warn(warning.stack);   // 堆栈跟踪
  console.warn(warning.detail);  // '这是一些附加信息'
});
```

```cjs
const process = require('node:process');

process.on('warning', (warning) => {
  console.warn(warning.name);    // 'Warning'
  console.warn(warning.message); // 'Something happened!'
  console.warn(warning.code);    // 'MY_WARNING'
  console.warn(warning.stack);   // 堆栈跟踪
  console.warn(warning.detail);  // '这是一些附加信息'
});
```

如果 `warning` 作为 `Error` 对象传递，则 `options` 参数将被忽略。

## `process.emitWarning(warning[, type[, code]][, ctor])`

<!-- YAML
added: v6.0.0
-->

* `warning` {string|Error} 要发出的警告。
* `type` {string} 当 `warning` 是 `String` 时，`type` 是用于发出的警告_类型_的名称。**默认值：** `'Warning'`。
* `code` {string} 正在发出的警告实例的唯一标识符。
* `ctor` {Function} 当 `warning` 是 `String` 时，`ctor` 是一个可选函数，用于限制生成的堆栈跟踪。**默认值：** `process.emitWarning`。

`process.emitWarning()` 方法可用于发出自定义或特定于应用程序的进程警告。可以通过向 [`'warning'`][process_warning] 事件添加处理程序来监听这些警告。

```mjs
import { emitWarning } from 'node:process';

// 使用字符串发出警告。
emitWarning('Something happened!');
// 发出：(node: 56338) Warning: Something happened!
```

```cjs
const { emitWarning } = require('node:process');

// 使用字符串发出警告。
emitWarning('Something happened!');
// 发出：(node: 56338) Warning: Something happened!
```

```mjs
import { emitWarning } from 'node:process';

// 使用字符串和类型发出警告。
emitWarning('Something Happened!', 'CustomWarning');
// 发出：(node:56338) CustomWarning: Something Happened!
```

```cjs
const { emitWarning } = require('node:process');

// 使用字符串和类型发出警告。
emitWarning('Something Happened!', 'CustomWarning');
// 发出：(node:56338) CustomWarning: Something Happened!
```

```mjs
import { emitWarning } from 'node:process';

emitWarning('Something happened!', 'CustomWarning', 'WARN001');
// 发出：(node:56338) [WARN001] CustomWarning: Something happened!
```

```cjs
const { emitWarning } = require('node:process');

process.emitWarning('Something happened!', 'CustomWarning', 'WARN001');
// 发出：(node:56338) [WARN001] CustomWarning: Something happened!
```

在前面的每个示例中，`Error` 对象由 `process.emitWarning()` 内部生成并传递给 [`'warning'`][process_warning] 处理程序。

```mjs
import process from 'node:process';

process.on('warning', (warning) => {
  console.warn(warning.name);
  console.warn(warning.message);
  console.warn(warning.code);
  console.warn(warning.stack);
});
```

```cjs
const process = require('node:process');

process.on('warning', (warning) => {
  console.warn(warning.name);
  console.warn(warning.message);
  console.warn(warning.code);
  console.warn(warning.stack);
});
```

如果 `warning` 作为 `Error` 对象传递，它将未经修改地传递给 `'warning'` 事件处理程序（并且可选的 `type`、`code` 和 `ctor` 参数将被忽略）：

```mjs
import { emitWarning } from 'node:process';

// 使用 Error 对象发出警告。
const myWarning = new Error('Something happened!');
// 使用 Error name 属性指定类型名称
myWarning.name = 'CustomWarning';
myWarning.code = 'WARN001';

emitWarning(myWarning);
// 发出：(node:56338) [WARN001] CustomWarning: Something happened!
```

```cjs
const { emitWarning } = require('node:process');

// 使用 Error 对象发出警告。
const myWarning = new Error('Something happened!');
// 使用 Error name 属性指定类型名称
myWarning.name = 'CustomWarning';
myWarning.code = 'WARN001';

emitWarning(myWarning);
// 发出：(node:56338) [WARN001] CustomWarning: Something happened!
```

如果 `warning` 不是字符串或 `Error` 对象，将抛出 `TypeError`。

虽然进程警告使用 `Error` 对象，但进程警告机制**不是**正常错误处理机制的替代品。

如果警告 `type` 是 `'DeprecationWarning'`，则实现以下额外处理：

* 如果使用 `--throw-deprecation` 命令行标志，弃用警告将作为异常抛出，而不是作为事件发出。
* 如果使用 `--no-deprecation` 命令行标志，弃用警告将被抑制。
* 如果使用 `--trace-deprecation` 命令行标志，弃用警告将连同完整的堆栈跟踪一起打印到 `stderr`。

### 避免重复警告

作为最佳实践，每个进程只应发出一次警告。为此，请将 `emitWarning()` 放在布尔值后面。

```mjs
import { emitWarning } from 'node:process';

function emitMyWarning() {
  if (!emitMyWarning.warned) {
    emitMyWarning.warned = true;
    emitWarning('Only warn once!');
  }
}
emitMyWarning();
// 发出：(node:56339) Warning: Only warn once!
emitMyWarning();
// 不发出任何内容
```

```cjs
const { emitWarning } = require('node:process');

function emitMyWarning() {
  if (!emitMyWarning.warned) {
    emitMyWarning.warned = true;
    emitWarning('Only warn once!');
  }
}
emitMyWarning();
// 发出：(node:56339) Warning: Only warn once!
emitMyWarning();
// 不发出任何内容
```

## `process.env`

<!-- YAML
added: v0.1.27
changes:
  - version: v11.14.0
    pr-url: https://github.com/nodejs/node/pull/26544
    description: "工作线程现在将默认使用父线程的 `process.env` 副本，可通过 `Worker` 构造函数的 `env` 选项进行配置。"
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18990
    description: 变量值到字符串的隐式转换已弃用。
-->

* 类型：{Object}

`process.env` 属性返回一个包含用户环境的对象。参见 environ(7)。

该对象的示例如下：

<!-- eslint-skip -->

```js
{
  TERM: 'xterm-256color',
  SHELL: '/usr/local/bin/bash',
  USER: 'maciej',
  PATH: '~/.bin/:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin',
  PWD: '/Users/maciej',
  EDITOR: 'vim',
  SHLVL: '1',
  HOME: '/Users/maciej',
  LOGNAME: 'maciej',
  _: '/usr/local/bin/node'
}
```

可以修改此对象，但此类修改不会反映在 Node.js 进程之外，也不会（除非显式请求）反映到其他 [`Worker`][] 线程。
换句话说，以下示例将无法工作：

```bash
node -e 'process.env.foo = "bar"' && echo $foo
```

而以下示例可以：

```mjs
import { env } from 'node:process';

env.foo = 'bar';
console.log(env.foo);
```

```cjs
const { env } = require('node:process');

env.foo = 'bar';
console.log(env.foo);
```

在 `process.env` 上赋值属性将隐式地将值转换为字符串。**此行为已弃用。** 未来版本的 Node.js 可能在值不是字符串、数字或布尔值时抛出错误。

```mjs
import { env } from 'node:process';

env.test = null;
console.log(env.test);
// => 'null'
env.test = undefined;
console.log(env.test);
// => 'undefined'
```

```cjs
const { env } = require('node:process');

env.test = null;
console.log(env.test);
// => 'null'
env.test = undefined;
console.log(env.test);
// => 'undefined'
```

使用 `delete` 从 `process.env` 删除属性。

```mjs
import { env } from 'node:process';

env.TEST = 1;
delete env.TEST;
console.log(env.TEST);
// => undefined
```

```cjs
const { env } = require('node:process');

env.TEST = 1;
delete env.TEST;
console.log(env.TEST);
// => undefined
```

在 Windows 操作系统上，环境变量不区分大小写。

```mjs
import { env } from 'node:process';

env.TEST = 1;
console.log(env.test);
// => 1
```

```cjs
const { env } = require('node:process');

env.TEST = 1;
console.log(env.test);
// => 1
```

除非在创建 [`Worker`][] 实例时显式指定，否则每个 [`Worker`][] 线程都有自己的一份 `process.env` 副本，基于其父线程的 `process.env`，或 [`Worker`][] 构造函数中指定为 `env` 选项的任何内容。对 `process.env` 的更改在 [`Worker`][] 线程之间不可见，只有主线程可以进行对操作系统或原生附加组件可见的更改。在 Windows 上，[`Worker`][] 实例上的 `process.env` 副本以区分大小写的方式运行，这与主线程不同。

## `process.execArgv`

<!-- YAML
added: v0.7.7
-->

* 类型：{string\[]}

`process.execArgv` 属性返回启动 Node.js 进程时传递的特定于 Node.js 的命令行选项集合。这些选项不会出现在 [`process.argv`][] 属性返回的数组中，也不包括 Node.js 可执行文件、脚本名称或脚本名称之后的任何选项。这些选项对于生成具有与父进程相同执行环境的子进程很有用。

```bash
node --icu-data-dir=./foo --require ./bar.js script.js --version
```

结果为 `process.execArgv`：

```json
["--icu-data-dir=./foo", "--require", "./bar.js"]
```

以及 `process.argv`：

<!-- eslint-disable @stylistic/js/semi -->

```js
['/usr/local/bin/node', 'script.js', '--version']
```

有关此属性的工作线程详细行为，请参阅 [`Worker` 构造函数][]。

## `process.execPath`

<!-- YAML
added: v0.1.100
-->

* 类型：{string}

`process.execPath` 属性返回启动 Node.js 进程的可执行文件的绝对路径名。符号链接（如果有）将被解析。

<!-- eslint-disable @stylistic/js/semi -->

```js
'/usr/local/bin/node'
```

## `process.execve(file[, args[, env]])`

<!-- YAML
added:
  - v23.11.0
  - v22.15.0
changes:
  - version: REPLACEME
    pr-url: https://github.com/nodejs/node/pull/62878
    description: 失败的 `execve(2)` 系统调用现在会抛出异常，而不是中止进程。通过 embedder API 注册的原生 `AtExit` 回调在 `execve(2)` 调用之前不再被调用。
-->

> 稳定性：1 - 实验性

* `file` {string} 要运行的可执行文件的名称或路径。
* `args` {string\[]} 字符串参数列表。任何参数都不能包含空字节（`\u0000`）。
* `env` {Object} 环境键值对。
  任何键或值都不能包含空字节（`\u0000`）。
  **默认：** `process.env`。

用新进程替换当前进程。

这是通过使用 `execve` POSIX 函数实现的，因此当前进程的任何内存或其他资源都不会被保留，标准输入、标准输出和标准错误文件描述符除外。

成功时，系统在进程交换时会丢弃所有其他资源，而不会触发任何退出或关闭事件，不会运行任何 JavaScript 清理处理程序（例如 `process.on('exit')`），也不会调用通过 embedder API 注册的原生 `AtExit` 回调。需要运行清理逻辑的调用方应在调用 `process.execve()` 之前进行。

此函数在成功时不会返回。如果底层的 `execve(2)` 系统调用失败，将抛出一个 `Error`，其 `code` 属性设置为对应的 `errno` 字符串（例如，当 `file` 不存在时为 `'ENOENT'`），并将 `syscall` 设置为 `'execve'`，`path` 设置为 `file`。当 `execve(2)` 失败时，当前进程会继续运行且状态不变，因此调用方可以处理错误并采取其他操作。

此函数在 Windows 或 IBM i 上不可用。

## `process.exit([code])`

<!-- YAML
added: v0.1.13
changes:
  - version: v20.0.0
    pr-url: https://github.com/nodejs/node/pull/43716
    description: 只接受数字类型的代码，或者如果是字符串类型，则表示整数。
-->

* `code` {integer|string|null|undefined} 退出代码。对于字符串类型，仅允许整数字符串（例如，'1'）。**默认：** `0`。

`process.exit()` 方法指示 Node.js 以 `code` 退出状态同步终止进程。如果省略 `code`，exit 使用 'success' 代码 `0` 或 `process.exitCode` 的值（如果已设置）。Node.js 不会终止，直到所有 [`'exit'`][] 事件监听器被调用。

要以 'failure' 代码退出：

```mjs
import { exit } from 'node:process';

exit(1);
```

```cjs
const { exit } = require('node:process');

exit(1);
```

执行 Node.js 的 shell 应该看到退出代码为 `1`。

调用 `process.exit()` 将强制进程尽快退出，即使仍有尚未完全完成的异步操作挂起，包括对 `process.stdout` 和 `process.stderr` 的 I/O 操作。

在大多数情况下，实际上不需要显式调用 `process.exit()`。_如果事件循环中没有额外的工作挂起_，Node.js 进程将自行退出。可以设置 `process.exitCode` 属性来告诉进程在优雅退出时使用哪个退出代码。

例如，以下示例说明了 `process.exit()` 方法的_误用_，可能导致打印到 stdout 的数据被截断和丢失：

```mjs
import { exit } from 'node:process';

// 这是一个*不要*这样做的示例：
if (someConditionNotMet()) {
  printUsageToStdout();
  exit(1);
}
```

```cjs
const { exit } = require('node:process');

// 这是一个*不要*这样做的示例：
if (someConditionNotMet()) {
  printUsageToStdout();
  exit(1);
}
```

这是因为问题的原因是 Node.js 中对 `process.stdout` 的写入有时是_异步的_，并且可能发生在 Node.js 事件循环的多个 tick 上。然而，调用 `process.exit()` 会强制进程退出，_在_那些额外的写入 `stdout` 操作执行之前。

代码_应该_设置 `process.exitCode` 而不是直接调用 `process.exit()`，并通过避免为事件循环调度任何额外工作来允许进程自然退出：

```mjs
import process from 'node:process';

// 如何正确设置退出代码同时让进程优雅退出。
if (someConditionNotMet()) {
  printUsageToStdout();
  process.exitCode = 1;
}
```

```cjs
const process = require('node:process');

// 如何正确设置退出代码同时让进程优雅退出。
if (someConditionNotMet()) {
  printUsageToStdout();
  process.exitCode = 1;
}
```

如果由于错误条件需要终止 Node.js 进程，抛出_未捕获的_错误并允许进程相应终止比调用 `process.exit()` 更安全。

在 [`Worker`][] 线程中，此函数停止当前线程而不是当前进程。

## `process.exitCode`

<!-- YAML
added: v0.11.8
changes:
  - version: v20.0.0
    pr-url: https://github.com/nodejs/node/pull/43716
    description: 只接受数字类型的代码，或者如果是字符串类型，则表示整数。
-->

* 类型：{integer|string|null|undefined} 退出代码。对于字符串类型，仅允许整数字符串（例如，'1'）。**默认：** `undefined`。

当进程优雅退出或通过 [`process.exit()`][] 退出而未指定代码时，该数字将成为进程退出代码。

可以通过为 `process.exitCode` 赋值或向 [`process.exit()`][] 传递参数来更新 `process.exitCode` 的值：

```console
$ node -e 'process.exitCode = 9'; echo $?
9
$ node -e 'process.exit(42)'; echo $?
42
$ node -e 'process.exitCode = 9; process.exit(42)'; echo $?
42
```

当发生不可恢复的错误时（例如遇到未结算的顶层 await），Node.js 也可以隐式设置该值。但是显式操作退出代码始终优先于隐式操作：

```console
$ node --input-type=module -e 'await new Promise(() => {})'; echo $?
13
$ node --input-type=module -e 'process.exitCode = 9; await new Promise(() => {})'; echo $?
9
```

## `process.features.cached_builtins`

<!-- YAML
added: v12.0.0
-->

* 类型：{boolean}

如果当前 Node.js 构建正在缓存内置模块，则为 `true` 的布尔值。

## `process.features.debug`

<!-- YAML
added: v0.5.5
-->

* 类型：{boolean}

如果当前 Node.js 构建是调试构建，则为 `true` 的布尔值。

## `process.features.inspector`

<!-- YAML
added: v11.10.0
-->

* 类型：{boolean}

如果当前 Node.js 构建包含 inspector，则为 `true` 的布尔值。

## `process.features.ipv6`

<!-- YAML
added: v0.5.3
deprecated:
  - v23.4.0
  - v22.13.0
-->

> 稳定性：0 - 已弃用。此属性始终为 true，任何基于它的检查都是多余的。

* 类型：{boolean}

如果当前 Node.js 构建包含对 IPv6 的支持，则为 `true` 的布尔值。

由于所有 Node.js 构建都具有 IPv6 支持，因此此值始终为 `true`。

## `process.features.require_module`

<!-- YAML
added:
 - v23.0.0
 - v22.10.0
 - v20.19.0
-->

* 类型：{boolean}

如果当前 Node.js 构建支持[使用 `require()` 加载 ECMAScript 模块][]，则为 `true` 的布尔值。

## `process.features.tls`

<!-- YAML
added: v0.5.3
-->

* 类型：{boolean}

如果当前 Node.js 构建包含对 TLS 的支持，则为 `true` 的布尔值。

## `process.features.tls_alpn`

<!-- YAML
added: v4.8.0
deprecated:
  - v23.4.0
  - v22.13.0
-->

> 稳定性：0 - 已弃用。请改用 `process.features.tls`。

* 类型：{boolean}

如果当前 Node.js 构建包含对 TLS 中 ALPN 的支持，则为 `true` 的布尔值。

在 Node.js 11.0.0 及更高版本中，OpenSSL 依赖项具有无条件 ALPN 支持。
因此，此值与 `process.features.tls` 的值相同。

## `process.features.tls_ocsp`

<!-- YAML
added: v0.11.13
deprecated:
  - v23.4.0
  - v22.13.0
-->

> 稳定性：0 - 已弃用。请改用 `process.features.tls`。

* 类型：{boolean}

如果当前 Node.js 构建包含对 TLS 中 OCSP 的支持，则为 `true` 的布尔值。

在 Node.js 11.0.0 及更高版本中，OpenSSL 依赖项具有无条件 OCSP 支持。
因此，此值与 `process.features.tls` 的值相同。

## `process.features.tls_sni`

<!-- YAML
added: v0.5.3
deprecated:
  - v23.4.0
  - v22.13.0
-->

> 稳定性：0 - 已弃用。请改用 `process.features.tls`。

* 类型：{boolean}

如果当前 Node.js 构建包含对 TLS 中 SNI 的支持，则为 `true` 的布尔值。

在 Node.js 11.0.0 及更高版本中，OpenSSL 依赖项具有无条件 SNI 支持。
因此，此值与 `process.features.tls` 的值相同。

## `process.features.typescript`

<!-- YAML
added:
 - v23.0.0
 - v22.10.0
changes:
  - version: v26.0.0
    pr-url: https://github.com/nodejs/node/pull/61803
    description: "移除了 `transform` 值。"
  - version:
      - v25.2.0
      - v24.12.0
    pr-url: https://github.com/nodejs/node/pull/60600
    description: 类型剥离现已稳定。
-->

> 稳定性：1.2 - 发布候选

* 类型：{boolean|string}

默认值为 `"strip"`，如果 Node.js 使用 `--no-strip-types` 运行，则为 `false`。

## `process.features.uv`

<!-- YAML
added: v0.5.3
deprecated:
  - v23.4.0
  - v22.13.0
-->

> 稳定性：0 - 已弃用。此属性始终为 true，任何基于它的检查都是多余的。

* 类型：{boolean}

如果当前 Node.js 构建包含对 libuv 的支持，则为 `true` 的布尔值。

由于不可能在没有 libuv 的情况下构建 Node.js，因此此值始终为 `true`。

## `process.finalization.register(ref, callback)`

<!-- YAML
added: v22.5.0
-->

> 稳定性：1.1 - 积极开发中

* `ref` {Object | Function} 正在被跟踪的资源的引用。
* `callback` {Function} 当资源被终结时要调用的回调函数。
  * `ref` {Object | Function} 正在被跟踪的资源的引用。
  * `event` {string} 触发终结的事件。默认为 'exit'。

此函数注册一个回调，当进程发出 `exit` 事件且 `ref` 对象未被垃圾回收时调用该回调。如果对象 `ref` 在 `exit` 事件发出之前被垃圾回收，回调将从终结注册表中移除，并且不会在进程退出时调用。

在回调内部，你可以释放 `ref` 对象分配的资源。
请注意，适用于 `beforeExit` 事件所有限制也适用于 `callback` 函数，这意味着在某些特殊情况下回调可能不会被调用。

此函数的目的是帮助你在进程开始退出时释放资源，但如果对象不再被使用，也允许其被垃圾回收。

例如：你可以注册一个包含缓冲区的对象，你想确保在进程退出时释放该缓冲区，但如果对象在进程退出前被垃圾回收，我们就不再需要释放缓冲区，所以在这种情况下我们只是从终结注册表中移除回调。

```cjs
const { finalization } = require('node:process');

// 请确保传递给 finalization.register() 的函数
// 不会围绕不必要的对象创建闭包。
function onFinalize(obj, event) {
  // 你可以对对象做任何你想做的事
  obj.dispose();
}

function setup() {
  // 此对象可以被安全地垃圾回收，
  // 并且最终的关闭函数不会被调用。
  // 没有泄漏。
  const myDisposableObject = {
    dispose() {
      // 同步释放你的资源
    },
  };

  finalization.register(myDisposableObject, onFinalize);
}

setup();
```

```mjs
import { finalization } from 'node:process';

// 请确保传递给 finalization.register() 的函数
// 不会围绕不必要的对象创建闭包。
function onFinalize(obj, event) {
  // 你可以对对象做任何你想做的事
  obj.dispose();
}

function setup() {
  // 此对象可以被安全地垃圾回收，
  // 并且最终的关闭函数不会被调用。
  // 没有泄漏。
  const myDisposableObject = {
    dispose() {
      // 同步释放你的资源
    },
  };

  finalization.register(myDisposableObject, onFinalize);
}

setup();
```

上述代码依赖于以下假设：

* 避免使用箭头函数
* 建议常规函数位于全局上下文（根）中

常规函数_可能_引用 `obj` 所在的上下文，使得 `obj` 无法被垃圾回收。

箭头函数将持有之前的上下文。例如，考虑：

```js
class Test {
  constructor() {
    finalization.register(this, (ref) => ref.dispose());

    // 即使是像这样的代码也强烈不推荐
    // finalization.register(this, () => this.dispose());
  }
  dispose() {}
}
```

此对象被垃圾回收的可能性非常小（并非不可能），但如果未被回收，当调用 `process.exit` 时将调用 `dispose`。

请小心，避免依赖此功能来处理关键资源，因为不能保证在所有情况下都会调用回调。

## `process.finalization.registerBeforeExit(ref, callback)`

<!-- YAML
added: v22.5.0
-->

> 稳定性：1.1 - 积极开发中

* `ref` {Object | Function} 正在被跟踪的资源的引用。
* `callback` {Function} 当资源被终结时要调用的回调函数。
  * `ref` {Object | Function} 正在被跟踪的资源的引用。
  * `event` {string} 触发终结的事件。默认为 'beforeExit'。

此函数的行为与 `register` 完全相同，只不过如果 `ref` 对象未被垃圾回收，回调将在进程发出 `beforeExit` 事件时调用。

请注意，适用于 `beforeExit` 事件所有限制也适用于 `callback` 函数，这意味着在某些特殊情况下回调可能不会被调用。

## `process.finalization.unregister(ref)`

<!-- YAML
added: v22.5.0
-->

> 稳定性：1.1 - 积极开发中

* `ref` {Object | Function} 之前注册的资源的引用。

此函数从终结注册表中移除对象的注册，因此回调将不再被调用。

```cjs
const { finalization } = require('node:process');

// 请确保传递给 finalization.register() 的函数
// 不会围绕不必要的对象创建闭包。
function onFinalize(obj, event) {
  // 你可以对对象做任何你想做的事
  obj.dispose();
}

function setup() {
  // 此对象可以被安全地垃圾回收，
  // 并且最终的关闭函数不会被调用。
  // 没有泄漏。
  const myDisposableObject = {
    dispose() {
      // 同步释放你的资源
    },
  };

  finalization.register(myDisposableObject, onFinalize);

  // 做一些事情

  myDisposableObject.dispose();
  finalization.unregister(myDisposableObject);
}

setup();
```

```mjs
import { finalization } from 'node:process';

// 请确保传递给 finalization.register() 的函数
// 不会围绕不必要的对象创建闭包。
function onFinalize(obj, event) {
  // 你可以对对象做任何你想做的事
  obj.dispose();
}

function setup() {
  // 此对象可以被安全地垃圾回收，
  // 并且最终的关闭函数不会被调用。
  // 没有泄漏。
  const myDisposableObject = {
    dispose() {
      // 同步释放你的资源
    },
  };

  // 请确保传递给 finalization.register() 的函数
  // 不会围绕不必要的对象创建闭包。
  function onFinalize(obj, event) {
    // 你可以对对象做任何你想做的事
    obj.dispose();
  }

  finalization.register(myDisposableObject, onFinalize);

  // 做一些事情

  myDisposableObject.dispose();
  finalization.unregister(myDisposableObject);
}

setup();
```

## `process.getActiveResourcesInfo()`

<!-- YAML
added:
  - v17.3.0
  - v16.14.0
changes:
  - version:
    - v24.0.0
    - v22.16.0
    pr-url: https://github.com/nodejs/node/pull/57765
    description: 将此功能的稳定性索引从实验性更改为稳定。
-->

* 返回：{string\[]}

`process.getActiveResourcesInfo()` 方法返回一个字符串数组，包含当前保持事件循环存活的活跃资源的类型。

```mjs
import { getActiveResourcesInfo } from 'node:process';
import { setTimeout } from 'node:timers';

console.log('Before:', getActiveResourcesInfo());
setTimeout(() => {}, 1000);
console.log('After:', getActiveResourcesInfo());
// 打印：
//   之前：[ 'CloseReq', 'TTYWrap', 'TTYWrap', 'TTYWrap' ]
//   之后：[ 'CloseReq', 'TTYWrap', 'TTYWrap', 'TTYWrap', 'Timeout' ]
```

```cjs
const { getActiveResourcesInfo } = require('node:process');
const { setTimeout } = require('node:timers');

console.log('Before:', getActiveResourcesInfo());
setTimeout(() => {}, 1000);
console.log('After:', getActiveResourcesInfo());
// 打印：
//   之前：[ 'TTYWrap', 'TTYWrap', 'TTYWrap' ]
//   之后：[ 'TTYWrap', 'TTYWrap', 'TTYWrap', 'Timeout' ]
```

## `process.getBuiltinModule(id)`

<!-- YAML
added:
- v22.3.0
- v20.16.0
-->

* `id` {string} 请求的内建模块的 ID。
* 返回值：{Object|undefined}

`process.getBuiltinModule(id)` 提供了一种在全局可用函数中加载内建模块的方法。需要支持其他环境的 ES 模块可以使用它在 Node.js 中运行时条件加载 Node.js 内建模块，而不必处理 `import` 在非 Node.js 环境中可能抛出的解析错误，或者也不必使用动态 `import()`，因为这要么会将模块变成异步模块，要么会将同步 API 变成异步 API。

```mjs
if (globalThis.process?.getBuiltinModule) {
  // 在 Node.js 中运行，使用 Node.js fs 模块。
  const fs = globalThis.process.getBuiltinModule('fs');
  // 如果需要 `require()` 来加载用户模块，请使用 createRequire()
  const module = globalThis.process.getBuiltinModule('module');
  const require = module.createRequire(import.meta.url);
  const foo = require('foo');
}
```

如果 `id` 指定了当前 Node.js 进程中可用的内建模块，`process.getBuiltinModule(id)` 方法返回相应的内建模块。如果 `id` 不对应任何内建模块，则返回 `undefined`。

`process.getBuiltinModule(id)` 接受 [`module.isBuiltin(id)`][] 识别的内建模块 ID。某些内建模块必须使用 `node:` 前缀加载，请参阅 [必须使用 `node:` 前缀的内建模块][]。`process.getBuiltinModule(id)` 返回的引用始终指向与 `id` 对应的内建模块，即使用户修改了 [`require.cache`][] 使得 `require(id)` 返回其他内容。

## `process.getegid()`

<!-- YAML
added: v2.0.0
-->

`process.getegid()` 方法返回 Node.js 进程的数字有效组 ID。（参见 getegid(2)。）

```mjs
import process from 'node:process';

if (process.getegid) {
  console.log(`当前 gid: ${process.getegid()}`);
}
```

```cjs
const process = require('node:process');

if (process.getegid) {
  console.log(`当前 gid: ${process.getegid()}`);
}
```

此函数仅在 POSIX 平台上可用（即不适用于 Windows 或 Android）。

## `process.geteuid()`

<!-- YAML
added: v2.0.0
-->

* 返回值：{Object}

`process.geteuid()` 方法返回进程的数字有效用户 ID。（参见 geteuid(2)。）

```mjs
import process from 'node:process';

if (process.geteuid) {
  console.log(`当前 uid: ${process.geteuid()}`);
}
```

```cjs
const process = require('node:process');

if (process.geteuid) {
  console.log(`当前 uid: ${process.geteuid()}`);
}
```

此函数仅在 POSIX 平台上可用（即不适用于 Windows 或 Android）。

## `process.getgid()`

<!-- YAML
added: v0.1.31
-->

* 返回值：{Object}

`process.getgid()` 方法返回进程的数字组 ID。（参见 getgid(2)。）

```mjs
import process from 'node:process';

if (process.getgid) {
  console.log(`当前 gid: ${process.getgid()}`);
}
```

```cjs
const process = require('node:process');

if (process.getgid) {
  console.log(`当前 gid: ${process.getgid()}`);
}
```

此函数仅在 POSIX 平台上可用（即不适用于 Windows 或 Android）。

## `process.getgroups()`

<!-- YAML
added: v0.9.4
-->

* 返回值：{integer\[]}

`process.getgroups()` 方法返回一个包含补充组 ID 的数组。POSIX 未指定是否包含有效组 ID，但 Node.js 确保始终包含。

```mjs
import process from 'node:process';

if (process.getgroups) {
  console.log(process.getgroups()); // [ 16, 21, 297 ]
}
```

```cjs
const process = require('node:process');

if (process.getgroups) {
  console.log(process.getgroups()); // [ 16, 21, 297 ]
}
```

此函数仅在 POSIX 平台上可用（即不适用于 Windows 或 Android）。

## `process.getuid()`

<!-- YAML
added: v0.1.28
-->

* 返回值：{integer}

`process.getuid()` 方法返回进程的数字用户 ID。（参见 getuid(2)。）

```mjs
import process from 'node:process';

if (process.getuid) {
  console.log(`当前 uid: ${process.getuid()}`);
}
```

```cjs
const process = require('node:process');

if (process.getuid) {
  console.log(`当前 uid: ${process.getuid()}`);
}
```

此函数在 Windows 上不可用。

## `process.hasUncaughtExceptionCaptureCallback()`

<!-- YAML
added: v9.3.0
-->

* 返回值：{boolean}

指示是否已使用 [`process.setUncaughtExceptionCaptureCallback()`][] 设置了回调。

## `process.hrtime([time])`

<!-- YAML
added: v0.7.6
-->

> 稳定性：3 - 遗留。请改用 [`process.hrtime.bigint()`][]。

* `time` {integer\[]} 之前调用 `process.hrtime()` 的结果
* 返回值：{integer\[]}

这是在 JavaScript 中引入 `bigint` 之前的 [`process.hrtime.bigint()`][] 的遗留版本。

`process.hrtime()` 方法以 `[秒，纳秒]` 元组 `Array` 的形式返回当前高分辨率实时时间，其中 `nanoseconds` 是无法以秒精度表示的实时时间的剩余部分。

`time` 是一个可选参数，必须是之前 `process.hrtime()` 调用的结果，以便与当前时间进行差分。如果传入的参数不是元组 `Array`，将抛出 `TypeError`。传入用户定义的数组而不是之前调用 `process.hrtime()` 的结果将导致未定义的行为。

这些时间是相对于过去的任意时间，与一天中的时间无关，因此不受时钟漂移的影响。主要用途是测量间隔之间的性能：

```mjs
import { hrtime } from 'node:process';

const NS_PER_SEC = 1e9;
const time = hrtime();
// [ 1800216, 25 ]

setTimeout(() => {
  const diff = hrtime(time);
  // [ 1, 552 ]

  console.log(`Benchmark took ${diff[0] * NS_PER_SEC + diff[1]} nanoseconds`);
  // 基准测试耗时 1000000552 纳秒
}, 1000);
```

```cjs
const { hrtime } = require('node:process');

const NS_PER_SEC = 1e9;
const time = hrtime();
// [ 1800216, 25 ]

setTimeout(() => {
  const diff = hrtime(time);
  // [ 1, 552 ]

  console.log(`Benchmark took ${diff[0] * NS_PER_SEC + diff[1]} nanoseconds`);
  // 基准测试耗时 1000000552 纳秒
}, 1000);
```

## `process.hrtime.bigint()`

<!-- YAML
added: v10.7.0
-->

* 返回值：{bigint}

[`process.hrtime()`][] 方法的 `bigint` 版本，以 `bigint` 形式返回纳秒级的当前高分辨率实时时间。

与 [`process.hrtime()`][] 不同，它不支持额外的 `time` 参数，因为可以直接通过两个 `bigint` 相减来计算差值。

```mjs
import { hrtime } from 'node:process';

const start = hrtime.bigint();
// 191051479007711n

setTimeout(() => {
  const end = hrtime.bigint();
  // 191052633396993n

  console.log(`Benchmark took ${end - start} nanoseconds`);
  // 基准测试耗时 1154389282 纳秒
}, 1000);
```

```cjs
const { hrtime } = require('node:process');

const start = hrtime.bigint();
// 191051479007711n

setTimeout(() => {
  const end = hrtime.bigint();
  // 191052633396993n

  console.log(`Benchmark took ${end - start} nanoseconds`);
  // 基准测试耗时 1154389282 纳秒
}, 1000);
```

## `process.initgroups(user, extraGroup)`

<!-- YAML
added: v0.9.4
-->

* `user` {string|number} 用户名或数字标识符。
* `extraGroup` {string|number} 组名或数字标识符。

`process.initgroups()` 方法读取 `/etc/group` 文件并初始化组访问列表，使用该用户所属的所有组。这是一个特权操作，要求 Node.js 进程具有 `root` 访问权限或 `CAP_SETGID` 能力。

放弃特权时请小心：

```mjs
import { getgroups, initgroups, setgid } from 'node:process';

console.log(getgroups());         // [ 0 ]
initgroups('nodeuser', 1000);     // 切换用户
console.log(getgroups());         // [ 27, 30, 46, 1000, 0 ]
setgid(1000);                     // 放弃 root gid
console.log(getgroups());         // [ 27, 30, 46, 1000 ]
```

```cjs
const { getgroups, initgroups, setgid } = require('node:process');

console.log(getgroups());         // [ 0 ]
initgroups('nodeuser', 1000);     // 切换用户
console.log(getgroups());         // [ 27, 30, 46, 1000, 0 ]
setgid(1000);                     // 放弃 root gid
console.log(getgroups());         // [ 27, 30, 46, 1000 ]
```

此函数仅在 POSIX 平台上可用（即不适用于 Windows 或 Android）。
此功能在 [`Worker`][] 线程中不可用。

## `process.kill(pid[, signal])`

<!-- YAML
added: v0.0.6
-->

* `pid` {number} 进程 ID
* `signal` {string|number} 要发送的信号，可以是字符串或数字。**默认值：** `'SIGTERM'`。

`process.kill()` 方法将 `signal` 发送给由 `pid` 标识的进程。

信号名称是字符串，例如 `'SIGINT'` 或 `'SIGHUP'`。有关更多信息，请参阅 [信号事件][] 和 kill(2)。

如果目标 `pid` 不存在，此方法将抛出错误。作为一种特殊情况，信号 `0` 可用于测试进程是否存在。如果使用 `pid` 杀死进程组，Windows 平台将抛出错误。

尽管此函数的名称是 `process.kill()`，但它实际上只是一个信号发送器，就像 `kill` 系统调用一样。发送的信号可能会执行杀死目标进程以外的操作。

```mjs
import process, { kill } from 'node:process';

process.on('SIGHUP', () => {
  console.log('收到 SIGHUP 信号。');
});

setTimeout(() => {
  console.log('正在退出。');
  process.exit(0);
}, 100);

kill(process.pid, 'SIGHUP');
```

```cjs
const process = require('node:process');

process.on('SIGHUP', () => {
  console.log('收到 SIGHUP 信号。');
});

setTimeout(() => {
  console.log('正在退出。');
  process.exit(0);
}, 100);

process.kill(process.pid, 'SIGHUP');
```

当 Node.js 进程收到 `SIGUSR1` 时，Node.js 将启动调试器。请参阅 [信号事件][]。

## `process.loadEnvFile(path)`

<!-- YAML
added:
  - v21.7.0
  - v20.12.0
changes:
  - version:
     - v24.10.0
     - v22.21.0
    pr-url: https://github.com/nodejs/node/pull/59925
    description: 此 API 不再是实验性的。
-->

* `path` {string | URL | Buffer | undefined}。**默认值：** `'./.env'`

将 `.env` 文件加载到 `process.env` 中。在 `.env` 文件中使用 `NODE_OPTIONS` 不会对 Node.js 产生任何影响。

```cjs
const { loadEnvFile } = require('node:process');
loadEnvFile();
```

```mjs
import { loadEnvFile } from 'node:process';
loadEnvFile();
```

## `process.mainModule`

<!-- YAML
added: v0.1.17
deprecated: v14.0.0
-->

> 稳定性：0 - 已弃用：请改用 [`require.main`][]。

* 类型：{Object}

`process.mainModule` 属性提供了一种替代方式来检索 [`require.main`][]。区别在于，如果主模块在运行时发生变化，[`require.main`][] 在发生变化之前要求的模块中可能仍然引用原始主模块。通常，可以安全地假设两者引用的是同一个模块。

与 [`require.main`][] 一样，如果没有入口脚本，`process.mainModule` 将为 `undefined`。

## `process.memoryUsage()`

<!-- YAML
added: v0.1.16
changes:
  - version:
     - v13.9.0
     - v12.17.0
    pr-url: https://github.com/nodejs/node/pull/31550
    description: "向返回的对象添加了 `arrayBuffers`。"
  - version: v7.2.0
    pr-url: https://github.com/nodejs/node/pull/9587
    description: "向返回的对象添加了 `external`。"
-->

* 返回：{Object}
  * `rss` {integer}
  * `heapTotal` {integer}
  * `heapUsed` {integer}
  * `external` {integer}
  * `arrayBuffers` {integer}

返回一个对象，描述以字节为单位测量的 Node.js 进程内存使用情况。

```mjs
import { memoryUsage } from 'node:process';

console.log(memoryUsage());
// 输出：
// {
//  rss: 4935680,
//  heapTotal: 1826816,
//  heapUsed: 650472,
//  external: 49879,
//  arrayBuffers: 9386
// }
```

```cjs
const { memoryUsage } = require('node:process');

console.log(memoryUsage());
// 输出：
// {
//  rss: 4935680,
//  heapTotal: 1826816,
//  heapUsed: 650472,
//  external: 49879,
//  arrayBuffers: 9386
// }
```

* `heapTotal` 和 `heapUsed` 指的是 V8 的内存使用情况。
* `external` 指的是绑定到由 V8 管理的 JavaScript 对象的 C++ 对象的内存使用情况。
* `rss`（Resident Set Size，驻留集大小）是进程在主内存设备中占用的空间量（即总分配内存的子集），包括所有 C++ 和 JavaScript 对象及代码。
* `arrayBuffers` 指的是为 `ArrayBuffer` 和 `SharedArrayBuffer` 分配的内存，包括所有 Node.js [`Buffer`][]。
  这也包含在 `external` 值中。当 Node.js 用作嵌入式库时，此值可能为 `0`，因为在这种情况下可能不会跟踪 `ArrayBuffer` 的分配。

当使用 [`Worker`][] 线程时，`rss` 将是整个进程的有效值，而其他字段将仅指当前线程。

`process.memoryUsage()` 方法遍历每个页面以收集有关内存使用情况的信息，根据程序内存分配的情况，这可能会很慢。

### 关于 process.memoryUsage 的说明

在 Linux 或其他通常使用 glibc 的系统上，由于 glibc `malloc` 实现造成的碎片化，应用程序可能会有持续的 `rss` 增长，尽管 `heapTotal` 稳定。请参阅 [nodejs/node#21973][] 了解如何切换到替代的 `malloc` 实现以解决性能问题。

## `process.memoryUsage.rss()`

<!-- YAML
added:
  - v15.6.0
  - v14.18.0
-->

* 返回：{integer}

`process.memoryUsage.rss()` 方法返回一个整数，表示驻留集大小 (RSS)（以字节为单位）。

驻留集大小是进程在主内存设备中占用的空间量（即总分配内存的子集），包括所有 C++ 和 JavaScript 对象及代码。

这与 `process.memoryUsage()` 提供的 `rss` 属性值相同，但 `process.memoryUsage.rss()` 更快。

```mjs
import { memoryUsage } from 'node:process';

console.log(memoryUsage.rss());
// 35655680
```

```cjs
const { memoryUsage } = require('node:process');

console.log(memoryUsage.rss());
// 35655680
```

## `process.nextTick(callback[, ...args])`

<!-- YAML
added: v0.1.26
changes:
  - version:
    - v22.7.0
    - v20.18.0
    pr-url: https://github.com/nodejs/node/pull/51280
    description: 将稳定性更改为遗留。
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是 `ERR_INVALID_CALLBACK`。"
  - version: v1.8.1
    pr-url: https://github.com/nodejs/node/pull/1077
    description: "现在支持 `callback` 之后的额外参数。"
-->

> 稳定性：3 - 遗留：请改用 [`queueMicrotask()`][]。

* `callback` {Function}
* `...args` {any} 调用 `callback` 时传递的额外参数

`process.nextTick()` 将 `callback` 添加到“下一刻度队列”。此队列在当前 JavaScript 栈上的操作运行完成之后且在事件循环被允许继续之前完全排空。如果递归调用 `process.nextTick()`，可能会创建无限循环。有关更多背景信息，请参阅 [事件循环][] 指南。

```mjs
import { nextTick } from 'node:process';

console.log('start');
nextTick(() => {
  console.log('nextTick callback');
});
console.log('scheduled');
// 输出：
// start
// scheduled
// nextTick callback
```

```cjs
const { nextTick } = require('node:process');

console.log('start');
nextTick(() => {
  console.log('nextTick callback');
});
console.log('scheduled');
// 输出：
// start
// scheduled
// nextTick callback
```

这在开发 API 时很重要，以便让用户有机会在对象构造之后但在发生任何 I/O 之前分配事件处理程序：

```mjs
import { nextTick } from 'node:process';

function MyThing(options) {
  this.setupOptions(options);

  nextTick(() => {
    this.startDoingStuff();
  });
}

const thing = new MyThing();
thing.getReadyForStuff();

// thing.startDoingStuff() 现在被调用，而不是之前。
```

```cjs
const { nextTick } = require('node:process');

function MyThing(options) {
  this.setupOptions(options);

  nextTick(() => {
    this.startDoingStuff();
  });
}

const thing = new MyThing();
thing.getReadyForStuff();

// thing.startDoingStuff() 现在被调用，而不是之前。
```

API 要么是 100% 同步的，要么是 100% 异步的，这一点非常重要。考虑以下示例：

```js
// 警告！不要使用！危险的不安全危害！
function maybeSync(arg, cb) {
  if (arg) {
    cb();
    return;
  }

  fs.stat('file', cb);
}
```

此 API 是危险的，因为在以下情况下：

```js
const maybeTrue = Math.random() > 0.5;

maybeSync(maybeTrue, () => {
  foo();
});

bar();
```

不清楚 `foo()` 或 `bar()` 哪个会先被调用。

以下方法要好得多：

```mjs
import { nextTick } from 'node:process';

function definitelyAsync(arg, cb) {
  if (arg) {
    nextTick(cb);
    return;
  }

  fs.stat('file', cb);
}
```

```cjs
const { nextTick } = require('node:process');

function definitelyAsync(arg, cb) {
  if (arg) {
    nextTick(cb);
    return;
  }

  fs.stat('file', cb);
}
```

### 何时使用 `queueMicrotask()` 与 `process.nextTick()`

[`queueMicrotask()`][] API 是 `process.nextTick()` 的替代方案，它不使用“下一刻度队列”，而是使用与执行已解析承诺的 then、catch 和 finally 处理程序相同的微任务队列来延迟函数的执行。

在 Node.js 中，每次“下一刻度队列”被排空时，微任务队列会紧接着被排空。

因此在 CJS 模块中，`process.nextTick()` 回调总是在 `queueMicrotask()` 回调之前运行。然而，由于 ESM 模块已经作为微任务队列的一部分进行处理，在那里 `queueMicrotask()` 总是在 `process.nextTick()` 之前执行，因为 Node.js 已经处于排空微任务队列的过程中。

```mjs
import { nextTick } from 'node:process';

Promise.resolve().then(() => console.log('resolve'));
queueMicrotask(() => console.log('microtask'));
nextTick(() => console.log('nextTick'));
// 输出：
// resolve
// microtask
// nextTick
```

```cjs
const { nextTick } = require('node:process');

Promise.resolve().then(() => console.log('resolve'));
queueMicrotask(() => console.log('microtask'));
nextTick(() => console.log('nextTick'));
// 输出：
// nextTick
// resolve
// microtask
```

对于_大多数_用户空间用例，`queueMicrotask()` API 提供了一种可移植且可靠的机制来延迟执行，适用于多个 JavaScript 平台环境，应优于 `process.nextTick()`。在简单的场景中，`queueMicrotask()` 可以作为 `process.nextTick()` 的直接替代品。

```js
console.log('start');
queueMicrotask(() => {
  console.log('microtask callback');
});
console.log('scheduled');
// 输出：
// start
// scheduled
// microtask callback
```

这两个 API 之间一个值得注意的区别是，`process.nextTick()` 允许指定额外的值，这些值将在调用延迟函数时作为参数传递。使用 `queueMicrotask()` 实现相同的结果需要使用闭包或绑定函数：

```js
function deferred(a, b) {
  console.log('microtask', a + b);
}

console.log('start');
queueMicrotask(deferred.bind(undefined, 1, 2));
console.log('scheduled');
// 输出：
// start
// scheduled
// microtask 3
```

在下一刻度队列和微任务队列内部引发的错误处理方式上有细微差别。queued 微任务回调内部抛出的错误应尽可能在 queued 回调内部处理。如果没有处理，可以使用 `process.on('uncaughtException')` 事件处理程序来捕获和处理错误。

如有疑问，除非需要 `process.nextTick()` 的特定功能，否则请使用 `queueMicrotask()`。

## `process.noDeprecation`

<!-- YAML
added: v0.8.0
-->

* 类型：{boolean}

`process.noDeprecation` 属性指示当前 Node.js 进程是否设置了 `--no-deprecation` 标志。有关此标志行为的更多信息，请参阅 [`'warning'` 事件][process_warning] 和 [`emitWarning()` 方法][process_emit_warning] 的文档。

## `process.permission`

<!-- YAML
added: v20.0.0
-->

* 类型：{Object}

此 API 可通过 [`--permission`][] 标志使用。

`process.permission` 是一个对象，其方法用于管理当前进程的权限。更多文档可在 [权限模型][] 中找到。

### `process.permission.has(scope[, reference])`

<!-- YAML
added: v20.0.0
-->

* `scope` {string}
* `reference` {string}
* 返回值：{boolean}

验证进程是否能够访问给定的作用域和引用。如果未提供引用，则假定为全局作用域，例如，`process.permission.has('fs.read')` 将检查进程是否拥有所有文件系统读取权限。

引用的含义基于所提供的作用域。例如，当作用域为文件系统时，引用指的是文件和文件夹。

可用的作用域包括：

* `fs` - 所有文件系统
* `fs.read` - 文件系统读取操作
* `fs.write` - 文件系统写入操作
* `child` - 子进程生成操作
* `worker` - Worker 线程生成操作
* `ffi` - 外部函数接口操作

```js
// 检查进程是否有权限读取 README 文件
process.permission.has('fs.read', './README.md');
// 检查进程是否有读取权限操作
process.permission.has('fs.read');
```

## `process.pid`

<!-- YAML
added: v0.1.15
-->

* 类型：{integer}

`process.pid` 属性返回进程的 PID。

```mjs
import { pid } from 'node:process';

console.log(`这个进程的 pid 是 ${pid}`);
```

```cjs
const { pid } = require('node:process');

console.log(`这个进程的 pid 是 ${pid}`);
```

## `process.platform`

<!-- YAML
added: v0.1.16
-->

* 类型：{string}

`process.platform` 属性返回一个字符串，标识编译 Node.js 二进制文件的操作系统平台。

当前可能的值包括：

* `'aix'`
* `'darwin'`
* `'freebsd'`
* `'linux'`
* `'openbsd'`
* `'sunos'`
* `'win32'`

```mjs
import { platform } from 'node:process';

console.log(`这个平台是 ${platform}`);
```

```cjs
const { platform } = require('node:process');

console.log(`这个平台是 ${platform}`);
```

如果 Node.js 构建于 Android 操作系统上，也可能返回值 `'android'`。然而，Node.js 中的 Android 支持 [是实验性的][Android building]。

## `process.ppid`

<!-- YAML
added:
  - v9.2.0
  - v8.10.0
  - v6.13.0
-->

* 类型：{integer}

`process.ppid` 属性返回当前进程父进程的 PID。

```mjs
import { ppid } from 'node:process';

console.log(`父进程的 pid 是 ${ppid}`);
```

```cjs
const { ppid } = require('node:process');

console.log(`父进程的 pid 是 ${ppid}`);
```

## `process.ref(maybeRefable)`

<!-- YAML
added:
  - v23.6.0
  - v22.14.0
-->

> 稳定性：1 - 实验性

* `maybeRefable` {any} 一个可能是“refable”的对象。

如果一个对象实现了 Node.js “Refable 协议”，则它是“refable”的。具体来说，这意味着该对象实现了 `Symbol.for('nodejs.ref')` 和 `Symbol.for('nodejs.unref')` 方法。“Ref'd”对象将使 Node.js 事件循环保持活动状态，而“unref'd”对象则不会。历史上，这是通过直接在对象上使用 `ref()` 和 `unref()` 方法来实现的。然而，此模式正被弃用，转而支持“Refable 协议”，以便更好地支持 Web 平台 API 类型，这些类型的 API 无法被修改以添加 `ref()` 和 `unref()` 方法，但仍需要支持该行为。

## `process.release`

<!-- YAML
added: v3.0.0
changes:
  - version: v4.2.0
    pr-url: https://github.com/nodejs/node/pull/3212
    description: "现在支持 `lts` 属性。"
-->

* 类型：{Object}

`process.release` 属性返回一个 `Object`，包含与当前版本相关的元数据，包括源代码 tarball 和仅头文件 tarball 的 URL。

`process.release` 包含以下属性：

* `name` {string} 一个始终为 `'node'` 的值。
* `sourceUrl` {string} 指向包含当前版本源代码的 _`.tar.gz`_ 文件的绝对 URL。
* `headersUrl`{string} 指向仅包含当前版本源代码头文件的 _`.tar.gz`_ 文件的绝对 URL。此文件比完整源代码文件小得多，可用于编译 Node.js 原生附加组件。
* `libUrl` {string|undefined} 指向与当前版本的架构和版本匹配的 _`node.lib`_ 文件的绝对 URL。此文件用于编译 Node.js 原生附加组件。_此属性仅存在于 Node.js 的 Windows 构建版本上，在所有其他平台上将缺失。_
* `lts` {string|undefined} 标识此版本 [LTS][] 标签的字符串标签。此属性仅存在于 LTS 版本，对于所有其他版本类型（包括 _Current_ 版本）均为 `undefined`。有效值包括 LTS 版本代号（包括不再支持的代号）。
  * `'Fermium'` 对应始于 14.15.0 的 14.x LTS 系列。
  * `'Gallium'` 对应始于 16.13.0 的 16.x LTS 系列。
  * `'Hydrogen'` 对应始于 18.12.0 的 18.x LTS 系列。
    对于其他 LTS 版本代号，请参阅 [Node.js 变更日志存档](https://github.com/nodejs/node/blob/HEAD/doc/changelogs/CHANGELOG_ARCHIVE.md)

<!-- eslint-skip -->

```js
{
  name: 'node',
  lts: 'Hydrogen',
  sourceUrl: 'https://nodejs.org/download/release/v18.12.0/node-v18.12.0.tar.gz',
  headersUrl: 'https://nodejs.org/download/release/v18.12.0/node-v18.12.0-headers.tar.gz',
  libUrl: 'https://nodejs.org/download/release/v18.12.0/win-x64/node.lib'
}
```

在源自非发布版本源代码树的自定义构建中，可能只存在 `name` 属性。不应依赖其他属性存在。

## `process.report`

<!-- YAML
added: v11.8.0
changes:
  - version:
     - v13.12.0
     - v12.17.0
    pr-url: https://github.com/nodejs/node/pull/32242
    description: 此 API 不再是实验性的。
-->

* 类型：{Object}

`process.report` 是一个对象，其方法用于为当前进程生成诊断报告。更多文档可在 [report 文档][] 中找到。

### `process.report.compact`

<!-- YAML
added:
 - v13.12.0
 - v12.17.0
-->

* 类型：{boolean}

以紧凑格式写入报告，单行 JSON，比默认的多行格式（设计用于人类阅读）更易于被日志处理系统消费。

```mjs
import { report } from 'node:process';

console.log(`报告是紧凑格式吗？${report.compact}`);
```

```cjs
const { report } = require('node:process');

console.log(`报告是紧凑格式吗？${report.compact}`);
```

### `process.report.directory`

<!-- YAML
added: v11.12.0
changes:
  - version:
     - v13.12.0
     - v12.17.0
    pr-url: https://github.com/nodejs/node/pull/32242
    description: 此 API 不再是实验性的。
-->

* 类型：{string}

写入报告的目录。默认值为空字符串，表示报告写入 Node.js 进程的当前工作目录。

```mjs
import { report } from 'node:process';

console.log(`报告目录是 ${report.directory}`);
```

```cjs
const { report } = require('node:process');

console.log(`报告目录是 ${report.directory}`);
```

### `process.report.filename`

<!-- YAML
added: v11.12.0
changes:
  - version:
     - v13.12.0
     - v12.17.0
    pr-url: https://github.com/nodejs/node/pull/32242
    description: 此 API 不再是实验性的。
-->

* 类型：{string}

写入报告的文件名。如果设置为空字符串，输出文件名将由时间戳、PID 和序列号组成。默认值为空字符串。

如果 `process.report.filename` 的值设置为 `'stdout'` 或 `'stderr'`，则报告分别写入进程的 stdout 或 stderr。

```mjs
import { report } from 'node:process';

console.log(`报告文件名是 ${report.filename}`);
```

```cjs
const { report } = require('node:process');

console.log(`报告文件名是 ${report.filename}`);
```

### `process.report.getReport([err])`

<!-- YAML
added: v11.8.0
changes:
  - version:
     - v13.12.0
     - v12.17.0
    pr-url: https://github.com/nodejs/node/pull/32242
    description: 此 API 不再是实验性的。
-->

* `err` {Error} 用于报告 JavaScript 堆栈的自定义错误。
* 返回值：{Object}

返回运行进程的诊断报告的 JavaScript 对象表示。报告的 JavaScript 堆栈跟踪取自 `err`（如果存在）。

```mjs
import { report } from 'node:process';
import util from 'node:util';

const data = report.getReport();
console.log(data.header.nodejsVersion);

// 类似于 process.report.writeReport()
import fs from 'node:fs';
fs.writeFileSync('my-report.log', util.inspect(data), 'utf8');
```

```cjs
const { report } = require('node:process');
const util = require('node:util');

const data = report.getReport();
console.log(data.header.nodejsVersion);

// 类似于 process.report.writeReport()
const fs = require('node:fs');
fs.writeFileSync('my-report.log', util.inspect(data), 'utf8');
```

更多文档可在 [report 文档][] 中找到。

### `process.report.reportOnFatalError`

<!-- YAML
added: v11.12.0
changes:
  - version:
     - v15.0.0
     - v14.17.0
    pr-url: https://github.com/nodejs/node/pull/35654
    description: 此 API 不再是实验性的。
-->

* 类型：{boolean}

如果为 `true`，则在发生致命错误（如内存不足错误或失败的 C++ 断言）时生成诊断报告。

```mjs
import { report } from 'node:process';

console.log(`致命错误时生成报告：${report.reportOnFatalError}`);
```

```cjs
const { report } = require('node:process');

console.log(`致命错误时生成报告：${report.reportOnFatalError}`);
```

### `process.report.reportOnSignal`

<!-- YAML
added: v11.12.0
changes:
  - version:
     - v13.12.0
     - v12.17.0
    pr-url: https://github.com/nodejs/node/pull/32242
    description: 此 API 不再是实验性的。
-->

* 类型：{boolean}

如果为 `true`，当进程收到 `process.report.signal` 指定的信号时生成诊断报告。

```mjs
import { report } from 'node:process';

console.log(`收到信号时生成报告：${report.reportOnSignal}`);
```

```cjs
const { report } = require('node:process');

console.log(`收到信号时生成报告：${report.reportOnSignal}`);
```

### `process.report.reportOnUncaughtException`

<!-- YAML
added: v11.12.0
changes:
  - version:
     - v13.12.0
     - v12.17.0
    pr-url: https://github.com/nodejs/node/pull/32242
    description: 此 API 不再是实验性的。
-->

* 类型：{boolean}

如果为 `true`，则在发生未捕获异常时生成诊断报告。

```mjs
import { report } from 'node:process';

console.log(`未捕获异常时生成报告：${report.reportOnUncaughtException}`);
```

```cjs
const { report } = require('node:process');

console.log(`未捕获异常时生成报告：${report.reportOnUncaughtException}`);
```

### `process.report.excludeEnv`

<!-- YAML
added:
  - v23.3.0
  - v22.13.0
-->

* 类型：{boolean}

如果为 `true`，则生成不包含环境变量的诊断报告。

### `process.report.signal`

<!-- YAML
added: v11.12.0
changes:
  - version:
     - v13.12.0
     - v12.17.0
    pr-url: https://github.com/nodejs/node/pull/32242
    description: 此 API 不再是实验性的。
-->

* 类型：{string}

用于触发创建诊断报告的信号。默认为 `'SIGUSR2'`。

```mjs
import { report } from 'node:process';

console.log(`报告信号：${report.signal}`);
```

```cjs
const { report } = require('node:process');

console.log(`报告信号：${report.signal}`);
```

### `process.report.writeReport([filename][, err])`

<!-- YAML
added: v11.8.0
changes:
  - version:
     - v13.12.0
     - v12.17.0
    pr-url: https://github.com/nodejs/node/pull/32242
    description: 此 API 不再是实验性的。
-->

* `filename` {string} 写入报告的文件名。这应该是一个相对路径，将附加到 `process.report.directory` 中指定的目录，或者如果未指定，则附加到 Node.js 进程的当前工作目录。

* `err` {Error} 用于报告 JavaScript 堆栈的自定义错误。

* 返回值：{string} 返回生成的报告的文件名。

将诊断报告写入文件。如果未提供 `filename`，默认文件名包括日期、时间、PID 和序列号。报告的 JavaScript 堆栈跟踪取自 `err`（如果存在）。

如果 `filename` 的值设置为 `'stdout'` 或 `'stderr'`，则报告分别写入进程的 stdout 或 stderr。

```mjs
import { report } from 'node:process';

report.writeReport();
```

```cjs
const { report } = require('node:process');

report.writeReport();
```

更多文档可在 [report 文档][] 中找到。

## `process.resourceUsage()`

<!-- YAML
added: v12.6.0
-->

* 返回：{Object} 当前进程的资源使用情况。所有这些值都来自 `uv_getrusage` 调用，该调用返回一个 [`uv_rusage_t` 结构体][uv_rusage_t]。
  * `userCPUTime` {integer} 映射到 `ru_utime`，以微秒计算。它与 [`process.cpuUsage().user`][process.cpuUsage] 的值相同。
  * `systemCPUTime` {integer} 映射到 `ru_stime`，以微秒计算。它与 [`process.cpuUsage().system`][process.cpuUsage] 的值相同。
  * `maxRSS` {integer} 映射到 `ru_maxrss`，即使用的最大常驻集大小，单位为 Kibibyte（1024 字节）。
  * `sharedMemorySize` {integer} 映射到 `ru_ixrss`，但不受任何平台支持。
  * `unsharedDataSize` {integer} 映射到 `ru_idrss`，但不受任何平台支持。
  * `unsharedStackSize` {integer} 映射到 `ru_isrss`，但不受任何平台支持。
  * `minorPageFault` {integer} 映射到 `ru_minflt`，即进程的次要缺页中断次数，详见[这篇文章了解更多详情][wikipedia_minor_fault]。
  * `majorPageFault` {integer} 映射到 `ru_majflt`，即进程的主要缺页中断次数，详见[这篇文章了解更多详情][wikipedia_major_fault]。此字段在 Windows 上不受支持。
  * `swappedOut` {integer} 映射到 `ru_nswap`，但不受任何平台支持。
  * `fsRead` {integer} 映射到 `ru_inblock`，即文件系统必须执行输入的次数。
  * `fsWrite` {integer} 映射到 `ru_oublock`，即文件系统必须执行输出的次数。
  * `ipcSent` {integer} 映射到 `ru_msgsnd`，但不受任何平台支持。
  * `ipcReceived` {integer} 映射到 `ru_msgrcv`，但不受任何平台支持。
  * `signalsCount` {integer} 映射到 `ru_nsignals`，但不受任何平台支持。
  * `voluntaryContextSwitches` {integer} 映射到 `ru_nvcsw`，即由于进程自愿放弃处理器（通常是为了等待资源可用）在其时间片完成之前导致 CPU 上下文切换的次数。此字段在 Windows 上不受支持。
  * `involuntaryContextSwitches` {integer} 映射到 `ru_nivcsw`，即由于更高优先级的进程变为可运行或因为当前进程超出了其时间片导致 CPU 上下文切换的次数。此字段在 Windows 上不受支持。

```mjs
import { resourceUsage } from 'node:process';

console.log(resourceUsage());
/*
  将输出：
  {
    userCPUTime: 82872,
    systemCPUTime: 4143,
    maxRSS: 33164,
    sharedMemorySize: 0,
    unsharedDataSize: 0,
    unsharedStackSize: 0,
    minorPageFault: 2469,
    majorPageFault: 0,
    swappedOut: 0,
    fsRead: 0,
    fsWrite: 8,
    ipcSent: 0,
    ipcReceived: 0,
    signalsCount: 0,
    voluntaryContextSwitches: 79,
    involuntaryContextSwitches: 1
  }
*/
```

```cjs
const { resourceUsage } = require('node:process');

console.log(resourceUsage());
/*
  将输出：
  {
    userCPUTime: 82872,
    systemCPUTime: 4143,
    maxRSS: 33164,
    sharedMemorySize: 0,
    unsharedDataSize: 0,
    unsharedStackSize: 0,
    minorPageFault: 2469,
    majorPageFault: 0,
    swappedOut: 0,
    fsRead: 0,
    fsWrite: 8,
    ipcSent: 0,
    ipcReceived: 0,
    signalsCount: 0,
    voluntaryContextSwitches: 79,
    involuntaryContextSwitches: 1
  }
*/
```

## `process.send(message[, sendHandle[, options]][, callback])`

<!-- YAML
added: v0.5.9
-->

* `message` {Object}
* `sendHandle` {net.Server|net.Socket}
* `options` {Object} 用于参数化某些类型句柄的发送。`options` 支持以下属性：
  * `keepOpen` {boolean} 当传递 `net.Socket` 实例时可以使用的值。当为 `true` 时，套接字在发送进程中保持打开状态。**默认值：** `false`。
* `callback` {Function}
* 返回：{boolean}

如果 Node.js 是通过 IPC 通道生成的，则 `process.send()` 方法可用于向父进程发送消息。消息将作为 [`'message'`][] 事件在父进程的 [`ChildProcess`][] 对象上被接收。

如果 Node.js 不是通过 IPC 通道生成的，`process.send` 将为 `undefined`。

消息会经过序列化和解析。结果消息可能与最初发送的内容不相同。

## `process.setegid(id)`

<!-- YAML
added: v2.0.0
-->

* `id` {string|number} 组名或 ID

`process.setegid()` 方法设置进程的有效组身份。（参见 setegid(2)。）`id` 可以作为数字 ID 或组名字符串传递。如果指定了组名，此方法在解析关联的数字 ID 时会阻塞。

```mjs
import process from 'node:process';

if (process.getegid && process.setegid) {
  console.log(`当前 gid: ${process.getegid()}`);
  try {
    process.setegid(501);
    console.log(`新的 gid: ${process.getegid()}`);
  } catch (err) {
    console.error(`设置 gid 失败: ${err}`);
  }
}
```

```cjs
const process = require('node:process');

if (process.getegid && process.setegid) {
  console.log(`当前 gid: ${process.getegid()}`);
  try {
    process.setegid(501);
    console.log(`新的 gid: ${process.getegid()}`);
  } catch (err) {
    console.error(`设置 gid 失败: ${err}`);
  }
}
```

此函数仅在 POSIX 平台（即非 Windows 或 Android）上可用。
此功能在 [`Worker`][] 线程中不可用。

## `process.seteuid(id)`

<!-- YAML
added: v2.0.0
-->

* `id` {string|number} 用户名或 ID

`process.seteuid()` 方法设置进程的有效用户身份。（参见 seteuid(2)。）`id` 可以作为数字 ID 或用户名字符串传递。如果指定了用户名，该方法在解析关联的数字 ID 时会阻塞。

```mjs
import process from 'node:process';

if (process.geteuid && process.seteuid) {
  console.log(`当前 uid: ${process.geteuid()}`);
  try {
    process.seteuid(501);
    console.log(`新的 uid: ${process.geteuid()}`);
  } catch (err) {
    console.error(`设置 uid 失败: ${err}`);
  }
}
```

```cjs
const process = require('node:process');

if (process.geteuid && process.seteuid) {
  console.log(`当前 uid: ${process.geteuid()}`);
  try {
    process.seteuid(501);
    console.log(`新的 uid: ${process.geteuid()}`);
  } catch (err) {
    console.error(`设置 uid 失败: ${err}`);
  }
}
```

此函数仅在 POSIX 平台（即非 Windows 或 Android）上可用。
此功能在 [`Worker`][] 线程中不可用。

## `process.setgid(id)`

<!-- YAML
added: v0.1.31
-->

* `id` {string|number} 组名或 ID

`process.setgid()` 方法设置进程的组身份。（参见 setgid(2)。）`id` 可以作为数字 ID 或组名字符串传递。如果指定了组名，此方法在解析关联的数字 ID 时会阻塞。

```mjs
import process from 'node:process';

if (process.getgid && process.setgid) {
  console.log(`Current gid: ${process.getgid()}`);
  try {
    process.setgid(501);
    console.log(`New gid: ${process.getgid()}`);
  } catch (err) {
    console.error(`Failed to set gid: ${err}`);
  }
}
```

```cjs
const process = require('node:process');

if (process.getgid && process.setgid) {
  console.log(`Current gid: ${process.getgid()}`);
  try {
    process.setgid(501);
    console.log(`New gid: ${process.getgid()}`);
  } catch (err) {
    console.error(`Failed to set gid: ${err}`);
  }
}
```

此函数仅在 POSIX 平台（即非 Windows 或 Android）上可用。
此功能在 [`Worker`][] 线程中不可用。

## `process.setgroups(groups)`

<!-- YAML
added: v0.9.4
-->

* `groups` {integer\[]}

`process.setgroups()` 方法设置 Node.js 进程的补充组 ID。这是一个特权操作，要求 Node.js 进程具有 `root` 或 `CAP_SETGID` 能力。

`groups` 数组可以包含数字组 ID、组名或两者。

```mjs
import process from 'node:process';

if (process.getgroups && process.setgroups) {
  try {
    process.setgroups([501]);
    console.log(process.getgroups()); // 新组
  } catch (err) {
    console.error(`Failed to set groups: ${err}`);
  }
}
```

```cjs
const process = require('node:process');

if (process.getgroups && process.setgroups) {
  try {
    process.setgroups([501]);
    console.log(process.getgroups()); // 新组
  } catch (err) {
    console.error(`Failed to set groups: ${err}`);
  }
}
```

此函数仅在 POSIX 平台（即非 Windows 或 Android）上可用。
此功能在 [`Worker`][] 线程中不可用。

## `process.setuid(id)`

<!-- YAML
added: v0.1.28
-->

* `id` {integer | string}

`process.setuid(id)` 方法设置进程的用户身份。（参见 setuid(2)。）`id` 可以作为数字 ID 或用户名字符串传递。如果指定了用户名，该方法在解析关联的数字 ID 时会阻塞。

```mjs
import process from 'node:process';

if (process.getuid && process.setuid) {
  console.log(`Current uid: ${process.getuid()}`);
  try {
    process.setuid(501);
    console.log(`New uid: ${process.getuid()}`);
  } catch (err) {
    console.error(`Failed to set uid: ${err}`);
  }
}
```

```cjs
const process = require('node:process');

if (process.getuid && process.setuid) {
  console.log(`Current uid: ${process.getuid()}`);
  try {
    process.setuid(501);
    console.log(`New uid: ${process.getuid()}`);
  } catch (err) {
    console.error(`Failed to set uid: ${err}`);
  }
}
```

此函数仅在 POSIX 平台（即非 Windows 或 Android）上可用。
此功能在 [`Worker`][] 线程中不可用。

## `process.setSourceMapsEnabled(val)`

<!-- YAML
added:
  - v16.6.0
  - v14.18.0
-->

> 稳定性：1 - 实验性：请改用 [`module.setSourceMapsSupport()`][]。

* `val` {boolean}

此函数启用或禁用堆栈跟踪的 [Source Map][] 支持。

它提供了与使用命令行选项 `--enable-source-maps` 启动 Node.js 进程相同的功能。

只有在启用源映射后加载的 JavaScript 文件中的源映射才会被解析和加载。

这意味着调用 `module.setSourceMapsSupport()` 时带有选项 `{ nodeModules: true, generatedCode: true }`。

## `process.setUncaughtExceptionCaptureCallback(fn)`

<!-- YAML
added: v9.3.0
changes:
  - version:
     - v26.0.0
     - v25.9.0
    pr-url: https://github.com/nodejs/node/pull/61227
    description: "使用 `process.addUncaughtExceptionCaptureCallback()` 来注册多个回调。"
-->

* `fn` {Function|null}

`process.setUncaughtExceptionCaptureCallback()` 函数设置一个函数，当发生未捕获异常时将调用该函数，异常值本身将作为其第一个参数接收。

如果设置了这样的函数，[`'uncaughtException'`][] 事件将不会被发出。如果从命令行传递了 `--abort-on-uncaught-exception` 或通过 [`v8.setFlagsFromString()`][] 设置，进程将不会中止。配置为在异常时采取的操作（例如报告生成）也会受到影响。

要取消设置捕获函数，可以使用 `process.setUncaughtExceptionCaptureCallback(null)`。在已设置另一个捕获函数时使用非 `null` 参数调用此方法将抛出错误。

要注册多个可以共存的回调，请改用 [`process.addUncaughtExceptionCaptureCallback()`][]。

## `process.sourceMapsEnabled`

<!-- YAML
added:
  - v20.7.0
  - v18.19.0
-->

> 稳定性：1 - 实验性：请改用 [`module.getSourceMapsSupport()`][]。

* 类型：{boolean}

`process.sourceMapsEnabled` 属性返回是否启用了堆栈跟踪的 [Source Map][] 支持。

## `process.stderr`

* 类型：{Stream}

`process.stderr` 属性返回一个连接到 `stderr`（文件描述符 `2`）的流。它是一个 [`net.Socket`][]（这是一个 [Duplex][] 流），除非文件描述符 `2` 指向一个文件，在这种情况下它是一个 [Writable][] 流。

`process.stderr` 与其他 Node.js 流在某些重要方面有所不同。有关更多信息，请参阅 [关于进程 I/O 的说明][]。

### `process.stderr.fd`

* 类型：{number}

此属性指向 `process.stderr` 的底层文件描述符的值。该值固定为 `2`。在 [`Worker`][] 线程中，此字段不存在。

## `process.stdin`

* 类型：{Stream}

`process.stdin` 属性返回一个连接到 `stdin`（文件描述符 `0`）的流。它是一个 [`net.Socket`][]（这是一个 [Duplex][] 流），除非文件描述符 `0` 指向一个文件，在这种情况下它是一个 [Readable][] 流。

有关如何从 `stdin` 读取的详情，请参阅 [`readable.read()`][]。

作为 [Duplex][] 流，`process.stdin` 也可用于与早于 v0.10 的 Node.js 编写的脚本兼容的“旧”模式。有关更多信息，请参阅 [流兼容性][]。

在“旧”流模式下，`stdin` 流默认是暂停的，因此必须调用 `process.stdin.resume()` 才能从中读取。还要注意，调用 `process.stdin.resume()` 本身会将流切换到“旧”模式。

### `process.stdin.fd`

* 类型：{number}

此属性指向 `process.stdin` 的底层文件描述符的值。该值固定为 `0`。在 [`Worker`][] 线程中，此字段不存在。

## `process.stdout`

* 类型：{Stream}

`process.stdout` 属性返回一个连接到 `stdout`（文件描述符 `1`）的流。它是一个 [`net.Socket`][]（这是一个 [Duplex][] 流），除非文件描述符 `1` 指向一个文件，在这种情况下它是一个 [Writable][] 流。

例如，要将 `process.stdin` 复制到 `process.stdout`：

```mjs
import { stdin, stdout } from 'node:process';

stdin.pipe(stdout);
```

```cjs
const { stdin, stdout } = require('node:process');

stdin.pipe(stdout);
```

`process.stdout` 与其他 Node.js 流在某些重要方面有所不同。有关更多信息，请参阅 [关于进程 I/O 的说明][]。

### `process.stdout.fd`

* 类型：{number}

此属性指向 `process.stdout` 的底层文件描述符的值。该值固定为 `1`。在 [`Worker`][] 线程中，此字段不存在。

### 关于进程 I/O 的说明

`process.stdout` 和 `process.stderr` 与其他 Node.js 流在某些重要方面有所不同：

1. 它们分别由 [`console.log()`][] 和 [`console.error()`][] 内部使用。
2. 写入可能是同步的，这取决于流连接到的内容以及系统是 Windows 还是 POSIX：
   * 文件：在 Windows 和 POSIX 上为 _同步_
   * TTY（终端）：在 Windows 上为 _异步_，在 POSIX 上为 _同步_
   * 管道（和套接字）：在 Windows 上为 _同步_，在 POSIX 上为 _异步_

这些行为部分是由于历史原因，因为更改它们将造成向后不兼容，但也有一些用户期望这种行为。

同步写入避免了诸如使用 `console.log()` 或 `console.error()` 写入的输出意外交错，或者如果在异步写入完成之前调用了 `process.exit()` 则完全未写入等问题。有关更多信息，请参阅 [`process.exit()`][]。

_**警告**_：同步写入会阻塞事件循环，直到写入完成。在输出到文件的情况下，这几乎是瞬间的，但在高系统负载下、接收端未读取的管道下，或使用慢速终端或文件系统时，事件循环可能会被阻塞得足够频繁和足够长，从而产生严重的负面性能影响。在写入交互式终端会话时，这可能不是问题，但在向进程输出流进行生产环境日志记录时，请特别小心考虑这一点。

要检查流是否连接到 [TTY][] 上下文，请检查 `isTTY` 属性。

例如：

```console
$ node -p "Boolean(process.stdin.isTTY)"
true
$ echo "foo" | node -p "Boolean(process.stdin.isTTY)"
false
$ node -p "Boolean(process.stdout.isTTY)"
true
$ node -p "Boolean(process.stdout.isTTY)" | cat
false
```

有关更多信息，请参阅 [TTY][] 文档。

## `process.throwDeprecation`

<!-- YAML
added: v0.9.12
-->

* 类型：{boolean}

`process.throwDeprecation` 的初始值指示当前 Node.js 进程是否设置了 `--throw-deprecation` 标志。`process.throwDeprecation` 是可变的，因此是否将弃用警告导致错误可以在运行时改变。有关更多信息，请参阅 [`'warning'` 事件][process_warning] 和 [`emitWarning()` 方法][process_emit_warning] 的文档。

```console
$ node --throw-deprecation -p "process.throwDeprecation"
true
$ node -p "process.throwDeprecation"
undefined
$ node
> process.emitWarning('test', 'DeprecationWarning');
undefined
> (node:26598) DeprecationWarning: test
> process.throwDeprecation = true;
true
> process.emitWarning('test', 'DeprecationWarning');
Thrown:
[DeprecationWarning: test] { name: 'DeprecationWarning' }
```

## `process.threadCpuUsage([previousValue])`

<!-- YAML
added:
 - v23.9.0
 - v22.19.0
-->

* `previousValue` {Object} 调用 `process.threadCpuUsage()` 的先前返回值
* 返回：{Object}
  * `user` {integer}
  * `system` {integer}

`process.threadCpuUsage()` 方法返回当前工作线程的用户和系统 CPU 时间使用情况，在一个具有 `user` 和 `system` 属性的对象中，其值为微秒值（百万分之一秒）。

先前调用 `process.threadCpuUsage()` 的结果可以作为参数传递给该函数，以获取差值读数。

## `process.title`

<!-- YAML
added: v0.1.104
-->

* 类型：{string}

`process.title` 属性返回当前进程标题（即返回 `ps` 的当前值）。为 `process.title` 分配新值会修改 `ps` 的当前值。

当分配新值时，不同平台将对标题施加不同的最大长度限制。通常这些限制非常有限。例如，在 Linux 和 macOS 上，`process.title` 限制为二进制名称的大小加上命令行参数的长度，因为设置 `process.title` 会覆盖进程的 `argv` 内存。Node.js 0.8 允许更长的进程标题字符串，方法是也覆盖 `environ` 内存，但这在某些（相当晦涩的）情况下可能不安全且令人困惑。

为 `process.title` 分配值可能不会在进程管理器应用程序（例如 macOS Activity Monitor 或 Windows Services Manager）中产生准确的标签。

## `process.traceDeprecation`

<!-- YAML
added: v0.8.0
-->

* 类型：{boolean}

`process.traceDeprecation` 属性指示当前 Node.js 进程是否设置了 `--trace-deprecation` 标志。有关此标志行为的更多信息，请参阅 [`'warning'` 事件][process_warning] 和 [`emitWarning()` 方法][process_emit_warning] 的文档。

## `process.traceProcessWarnings`

<!-- YAML
added: v6.10.0
-->

* {boolean}

`process.traceProcessWarnings` 属性指示当前 Node.js 进程是否设置了 `--trace-warnings` 标志。此属性允许对警告的跟踪进行编程控制，从而在运行时启用或禁用警告的堆栈跟踪。

```js
// 启用跟踪警告
process.traceProcessWarnings = true;

// 发出带有堆栈跟踪的警告
process.emitWarning('带有堆栈跟踪的警告');

// 禁用跟踪警告
process.traceProcessWarnings = false;
```

## `process.umask()`

<!-- YAML
added: v0.1.19
changes:
  - version:
    - v14.0.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/32499
    description: "调用不带参数的 `process.umask()` 已被弃用。"
-->

> 稳定性：0 - 已废弃。不带参数调用 `process.umask()` 会导致进程范围的 umask 被写入两次。这在线程之间引入了竞态条件，并且是一个潜在的安全漏洞。没有安全、跨平台的替代 API。

`process.umask()` 返回 Node.js 进程的文件模式创建掩码。子进程从父进程继承掩码。

## `process.umask(mask)`

<!-- YAML
added: v0.1.19
-->

* `mask` {string|integer}

`process.umask(mask)` 设置 Node.js 进程的文件模式创建掩码。子进程从父进程继承掩码。返回先前的掩码。

```mjs
import { umask } from 'node:process';

const newmask = 0o022;
const oldmask = umask(newmask);
console.log(
  `Changed umask from ${oldmask.toString(8)} to ${newmask.toString(8)}`,
);
```

```cjs
const { umask } = require('node:process');

const newmask = 0o022;
const oldmask = umask(newmask);
console.log(
  `Changed umask from ${oldmask.toString(8)} to ${newmask.toString(8)}`,
);
```

在 [`Worker`][] 线程中，`process.umask(mask)` 将抛出异常。

## `process.unref(maybeRefable)`

<!-- YAML
added:
  - v23.6.0
  - v22.14.0
-->

> 稳定性：1 - 实验性

* `maybeRefable` {any} 一个可以被 "unref" 的对象。

如果一个对象实现了 Node.js "Refable 协议"，则它是 "unrefable" 的。
具体来说，这意味着该对象实现了 `Symbol.for('nodejs.ref')`
和 `Symbol.for('nodejs.unref')` 方法。"Ref'd" 对象将使 Node.js
事件循环保持活动状态，而 "unref'd" 对象则不会。历史上，这是
通过在对象上直接使用 `ref()` 和 `unref()` 方法来实现的。
然而，这种模式正在被弃用，转而支持 "Refable 协议"，
以便更好地支持 Web 平台 API 类型，这些类型的 API 无法被修改
以添加 `ref()` 和 `unref()` 方法，但仍需要支持该行为。

## `process.uptime()`

<!-- YAML
added: v0.5.0
-->

* 返回值：{number}

`process.uptime()` 方法返回当前 Node.js
进程已运行的秒数。

返回值包括秒的小数部分。使用 `Math.floor()` 获取整
秒数。

## `process.version`

<!-- YAML
added: v0.1.3
-->

* 类型：{string}

`process.version` 属性包含 Node.js 版本字符串。

```mjs
import { version } from 'node:process';

console.log(`Version: ${version}`);
// 版本：v14.8.0
```

```cjs
const { version } = require('node:process');

console.log(`Version: ${version}`);
// 版本：v14.8.0
```

要获取没有前置 _v_ 的版本字符串，请使用
`process.versions.node`。

## `process.versions`

<!-- YAML
added: v0.2.0
changes:
  - version: v9.0.0
    pr-url: https://github.com/nodejs/node/pull/15785
    description: "现在 `v8` 属性包含 Node.js 特定后缀。"
  - version: v4.2.0
    pr-url: https://github.com/nodejs/node/pull/3102
    description: "现在支持 `icu` 属性。"
-->

* 类型：{Object}

`process.versions` 属性返回一个列出
Node.js 及其依赖项版本字符串的对象。`process.versions.modules` 指示当前
的 ABI 版本，每当 C++ API 更改时，该版本就会增加。Node.js 将拒绝
加载针对不同模块 ABI 版本编译的模块。

```mjs
import { versions } from 'node:process';

console.log(versions);
```

```cjs
const { versions } = require('node:process');

console.log(versions);
```

将生成一个类似于以下的对象：

```console
{ node: '26.0.0-pre',
  acorn: '8.15.0',
  ada: '3.4.1',
  amaro: '1.1.5',
  ares: '1.34.6',
  brotli: '1.2.0',
  merve: '1.0.0',
  cldr: '48.0',
  icu: '78.2',
  llhttp: '9.3.0',
  modules: '144',
  napi: '10',
  nbytes: '0.1.1',
  ncrypto: '0.0.1',
  nghttp2: '1.68.0',
  nghttp3: '',
  ngtcp2: '',
  openssl: '3.5.4',
  simdjson: '4.2.4',
  simdutf: '7.3.3',
  sqlite: '3.51.2',
  tz: '2025c',
  undici: '7.18.2',
  unicode: '17.0',
  uv: '1.51.0',
  uvwasi: '0.0.23',
  v8: '14.3.127.18-node.10',
  zlib: '1.3.1-e00f703',
  zstd: '1.5.7' }
```

## 退出码

当没有更多待处理的异步操作时，Node.js 通常会以 `0` 状态码退出。以下状态码用于其他
情况：

* `1` **未捕获的致命异常**：发生了未捕获的异常，
  并且它未被域或 [`'uncaughtException'`][] 事件
  处理程序处理。
* `2`: 未使用（由 Bash 保留用于内置命令误用）
* `3` **内部 JavaScript 解析错误**：Node.js 引导过程中的内部 JavaScript 源代码
  导致了解析错误。这种情况极为罕见，通常只发生在
  Node.js 本身的开发过程中。
* `4` **内部 JavaScript 求值失败**：Node.js 引导过程中的内部 JavaScript
  源代码在求值时未能返回函数值。这种情况极为罕见，通常
  只发生在 Node.js 本身的开发过程中。
* `5` **致命错误**：V8 中发生了致命的不可恢复错误。
  通常会在 stderr 打印一条消息，前缀为 `FATAL
  ERROR`。
* `6` **非函数内部异常处理程序**：发生了
  未捕获的异常，但内部致命异常处理程序
  函数以某种方式被设置为非函数，无法被调用。
* `7` **内部异常处理程序运行时失败**：发生了
  未捕获的异常，并且内部致命异常处理程序
  函数本身在尝试处理它时抛出了错误。这
  可能发生，例如，如果 [`'uncaughtException'`][] 或
  `domain.on('error')` 处理程序抛出了错误。
* `8`: 未使用。在早期版本的 Node.js 中，退出码 8 有时
  表示未捕获的异常。
* `9` **无效参数**：指定了未知选项，
  或者提供了需要值的选项但没有提供值。
* `10` **内部 JavaScript 运行时失败**：Node.js 引导过程中的内部 JavaScript
  源代码在调用引导函数时抛出了错误。这种情况极为罕见，
  通常只发生在 Node.js 本身的开发过程中。
* `12` **无效调试参数**：设置了 `--inspect` 和/或 `--inspect-brk`
  选项，但选择的端口号无效或不可用。
* `13` **未决的顶层 Await**：在顶层代码的函数外部使用了 `await`，但传入的 `Promise` 从未决出。
* `14` **快照失败**：启动 Node.js 以构建 V8 启动
  快照，但由于未满足应用程序状态的某些要求而失败。
* `>128` **信号退出**：如果 Node.js 接收到致命信号，例如
  `SIGKILL` 或 `SIGHUP`，则其退出码将为 `128` 加上
  信号代码的值。这是标准的 POSIX 做法，因为
  退出码被定义为 7 位整数，信号退出设置
  高位，然后包含信号代码的值。
  例如，信号 `SIGABRT` 的值为 `6`，所以预期的退出
  码将是 `128` + `6`，即 `134`。

[`child_process` 的高级序列化]: child_process.md#advanced-serialization
[Android 构建]: https://github.com/nodejs/node/blob/HEAD/BUILDING.md#android
[子进程]: child_process.md
[集群]: cluster.md
[双工流]: stream.md#duplex-and-transform-streams
[事件循环]: https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick#understanding-processnexttick
[LTS]: https://github.com/nodejs/Release
[权限模型]: permissions.md#permission-model
[可读流]: stream.md#readable-streams
[信号事件]: #signal-events
[源代码映射]: https://tc39.es/ecma426/
[流兼容性]: stream.md#compatibility-with-older-nodejs-versions
[TYY]: tty.md#tty
[可写流]: stream.md#writable-streams
[`'exit'`]: #event-exit
[`'message'`]: child_process.md#event-message
[`'uncaughtException'`]: #event-uncaughtexception
[`--no-deprecation`]: cli.md#--no-deprecation
[`--permission`]: cli.md#--permission
[`--unhandled-rejections`]: cli.md#--unhandled-rejectionsmode
[`Buffer`]: buffer.md
[`ChildProcess.disconnect()`]: child_process.md#subprocessdisconnect
[`ChildProcess.send()`]: child_process.md#subprocesssendmessage-sendhandle-options-callback
[`ChildProcess`]: child_process.md#class-childprocess
[`Error`]: errors.md#class-error
[`EventEmitter`]: events.md#class-eventemitter
[`NODE_OPTIONS`]: cli.md#node_optionsoptions
[`Worker`]: worker_threads.md#class-worker
[`Worker` 构造函数]: worker_threads.md#new-workerfilename-options
[`console.error()`]: console.md#consoleerrordata-args
[`console.log()`]: console.md#consolelogdata-args
[`domain`]: domain.md
[`module.getSourceMapsSupport()`]: module.md#modulegetsourcemapssupport
[`module.isBuiltin(id)`]: module.md#moduleisbuiltinmodulename
[`module.setSourceMapsSupport()`]: module.md#modulesetsourcemapssupportenabled-options
[`net.Server`]: net.md#class-netserver
[`net.Socket`]: net.md#class-netsocket
[`os.constants.dlopen`]: os.md#dlopen-constants
[`postMessageToThread()`]: worker_threads.md#worker_threadspostmessagetothreadthreadid-value-transferlist-timeout
[`process.addUncaughtExceptionCaptureCallback()`]: #processadduncaughtexceptioncapturecallbackfn
[`process.argv`]: #processargv
[`process.config`]: #processconfig
[`process.execPath`]: #processexecpath
[`process.exit()`]: #processexitcode
[`process.exitCode`]: #processexitcode_1
[`process.hrtime()`]: #processhrtimetime
[`process.hrtime.bigint()`]: #processhrtimebigint
[`process.kill()`]: #processkillpid-signal
[`process.setUncaughtExceptionCaptureCallback()`]: #processsetuncaughtexceptioncapturecallbackfn
[`promise.catch()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch
[`queueMicrotask()`]: globals.md#queuemicrotaskcallback
[`readable.read()`]: stream.md#readablereadsize
[`require()`]: globals.md#require
[`require.cache`]: modules.md#requirecache
[`require.main`]: modules.md#accessing-the-main-module
[`subprocess.kill()`]: child_process.md#subprocesskillsignal
[`v8.setFlagsFromString()`]: v8.md#v8setflagsfromstringflags
[带有强制 `node:` 前缀的内置模块]: modules.md#built-in-modules-with-mandatory-node-prefix
[调试器]: debugger.md
[弃用代码]: deprecations.md
[使用 `require()` 加载 ECMAScript 模块]: modules.md#loading-ecmascript-modules-using-require
[nodejs/node#21973]: https://github.com/nodejs/node/issues/21973
[关于进程 I/O 的说明]: #a-note-on-process-io
[process.cpuUsage]: #processcpuusagepreviousvalue
[process_emit_warning]: #processemitwarningwarning-type-code-ctor
[process_warning]: #event-warning
[程序入口点]: https://nodejs.org/api/cli.html#program-entry-point
[报告文档]: report.md
[终端原始模式]: tty.md#readstreamsetrawmodemode
[uv_get_available_memory]: https://docs.libuv.org/en/v1.x/misc.html#c.uv_get_available_memory
[uv_get_constrained_memory]: https://docs.libuv.org/en/v1.x/misc.html#c.uv_get_constrained_memory
[uv_rusage_t]: https://docs.libuv.org/en/v1.x/misc.html#c.uv_rusage_t
[wikipedia_major_fault]: https://en.wikipedia.org/wiki/Page_fault#Major
[wikipedia_minor_fault]: https://en.wikipedia.org/wiki/Page_fault#Minor
