# 错误

<!--introduced_in=v4.0.0-->

<!--type=misc-->

在 Node.js 中运行的应用程序通常会遇到以下几类错误：

* 标准 JavaScript 错误，例如 {EvalError}、{SyntaxError}、{RangeError}、{ReferenceError}、{TypeError} 和 {URIError}。
* 标准 `DOMException`。
* 由底层操作系统约束触发的系统错误，例如尝试打开不存在的文件或尝试通过关闭的套接字发送数据。
* `AssertionError` 是一类特殊的错误，当 Node.js 检测到绝不应发生的异常逻辑违规时会触发。这些错误通常由 `node:assert` 模块抛出。
* 应用程序代码触发的用户指定错误。

Node.js 抛出的所有 JavaScript 和系统错误都继承自标准 JavaScript {Error} 类，或是其实例，并保证提供 _至少_ 该类上可用的属性。

Node.js 抛出的错误的 [`error.message`][] 属性可能会在任何版本中更改。请使用 [`error.code`][] 来识别错误。对于 `DOMException`，请使用 [`domException.name`][] 来识别其类型。

## 错误传播和拦截

<!--type=misc-->

Node.js 支持多种机制来传播和处理应用程序运行时发生的错误。这些错误的报告和如何处理完全取决于 `Error` 的类型和所调用的 API 风格。

所有 JavaScript 错误都作为异常处理，使用标准 JavaScript `throw` 机制 _立即_ 生成并抛出错误。这些错误使用 JavaScript 语言提供的 [`try…catch` 结构][try-catch] 来处理。

```js
// 因为 z 未定义而抛出 ReferenceError。
try {
  const m = 1;
  const n = m + z;
} catch (err) {
  // 在此处处理错误。
}
```

任何使用 JavaScript `throw` 机制的行为都会引发一个 _必须_ 被处理的异常，否则 Node.js 进程将立即退出。

除了少数例外，_同步_ API（任何不返回 {Promise} 也不接受 `callback` 函数的阻塞方法，例如 [`fs.readFileSync`][]），将使用 `throw` 来报告错误。

_异步 API_ 中发生的错误可以通过多种方式报告：

* 某些异步方法返回一个 {Promise}，你应该始终考虑到它可能会被拒绝。请参阅 [`--unhandled-rejections`][] 标志以了解进程将如何反应未处理的 promise 拒绝。

  <!-- eslint-disable no-useless-return -->

  ```js
  const fs = require('node:fs/promises');

  (async () => {
    let data;
    try {
      data = await fs.readFile('a file that does not exist');
    } catch (err) {
      console.error('读取文件时出错！', err);
      return;
    }
    // 否则处理数据
  })();
  ```

* 大多数接受 `callback` 函数的异步方法将接受一个作为该函数第一个参数传递的 `Error` 对象。如果第一个参数不是 `null` 且是 `Error` 的实例，则发生了应该处理的错误。

  <!-- eslint-disable no-useless-return -->

  ```js
  const fs = require('node:fs');
  fs.readFile('a file that does not exist', (err, data) => {
    if (err) {
      console.error('读取文件时出错！', err);
      return;
    }
    // 否则处理数据
  });
  ```

* 当在 [`EventEmitter`][] 对象上调用异步方法时，错误可以被路由到该对象的 `'error'` 事件。

  ```js
  const net = require('node:net');
  const connection = net.connect('localhost');

  // 向流添加 'error' 事件处理程序：
  connection.on('error', (err) => {
    // 如果连接被服务器重置，或者根本无法
    // 连接，或者连接遇到任何类型的错误，
    // 错误将被发送到这里。
    console.error(err);
  });

  connection.pipe(process.stdout);
  ```

* Node.js API 中少数通常为异步的方法可能仍然使用 `throw` 机制来抛出必须使用 `try…catch` 处理的异常。没有此类方法的综合列表；请参阅每个方法的文档以确定所需的适当错误处理机制。

`'error'` 事件机制的使用对于 [基于流的][] 和 [基于事件发射器的][] API 最为常见，它们本身代表了一系列随时间进行的异步操作（而不是单个可能成功或失败的操作）。

对于 _所有_ [`EventEmitter`][] 对象，如果没有提供 `'error'` 事件处理程序，错误将被抛出，导致 Node.js 进程报告未捕获异常并崩溃，除非：已为 [`'uncaughtException'`][] 事件注册了处理程序，或使用了已弃用的 [`node:domain`][domains] 模块。

```js
const EventEmitter = require('node:events');
const ee = new EventEmitter();

setImmediate(() => {
  // 这将导致进程崩溃，因为没有添加
  // 'error' 事件处理程序。
  ee.emit('error', new Error('This will crash'));
});
```

以这种方式生成的错误 _不能_ 使用 `try…catch` 拦截，因为它们是在调用代码已经退出 _之后_ 抛出的。

开发者必须参考每个方法的文档以确定这些方法抛出的错误究竟是如何传播的。

## 类：`Error`

<!--type=class-->

一个通用的 JavaScript {Error} 对象，不表示错误发生的任何具体情况。`Error` 对象捕获“堆栈跟踪”，详细说明 `Error` 实例化的代码点，并可能提供错误的文本描述。

Node.js 生成的所有错误，包括所有系统和 JavaScript 错误，要么是 `Error` 类的实例，要么继承自该类。

### `new Error(message[, options])`

* `message` {string}
* `options` {Object}
  * `cause` {any} 导致新创建错误的错误。

创建一个新的 `Error` 对象并将 `error.message` 属性设置为提供的文本消息。如果将对象作为 `message` 传递，则通过调用 `String(message)` 生成文本消息。如果提供了 `cause` 选项，则将其分配给 `error.cause` 属性。`error.stack` 属性将表示调用 `new Error()` 的代码点。堆栈跟踪依赖于 [V8 的堆栈跟踪 API][]。堆栈跟踪仅扩展到 (a) _同步代码执行_ 的开始，或 (b) 属性 `Error.stackTraceLimit` 给出的帧数，以较小者为准。

### `Error.captureStackTrace(targetObject[, constructorOpt])`

* `targetObject` {Object}
* `constructorOpt` {Function}

在 `targetObject` 上创建一个 `.stack` 属性，访问该属性时返回一个字符串，表示调用 `Error.captureStackTrace()` 的代码位置。

```js
const myObject = {};
Error.captureStackTrace(myObject);
myObject.stack;  // 类似于 `new Error().stack`
```

跟踪的第一行将以前缀 `${myObject.name}: ${myObject.message}` 开头。

可选的 `constructorOpt` 参数接受一个函数。如果给定，则生成的堆栈跟踪中将省略 `constructorOpt` 及以上的所有帧，包括 `constructorOpt`。

`constructorOpt` 参数有助于向用户隐藏错误生成的实现细节。例如：

```js
function a() {
  b();
}

function b() {
  c();
}

function c() {
  // 创建一个没有堆栈跟踪的错误，以避免计算堆栈跟踪两次。
  const { stackTraceLimit } = Error;
  Error.stackTraceLimit = 0;
  const error = new Error();
  Error.stackTraceLimit = stackTraceLimit;

  // 捕获函数 b 以上的堆栈跟踪
  Error.captureStackTrace(error, b); // 堆栈跟踪中既不包含函数 c，也不包含 b
  throw error;
}

a();
```

### `Error.stackTraceLimit`

* 类型：{number}

`Error.stackTraceLimit` 属性指定堆栈跟踪收集的堆栈帧数（无论是通过 `new Error().stack` 还是 `Error.captureStackTrace(obj)` 生成）。

默认值为 `10`，但可以设置为任何有效的 JavaScript 数字。更改将影响在值更改 _之后_ 捕获的任何堆栈跟踪。

如果设置为非数字值，或设置为负数，堆栈跟踪将不捕获任何帧。

### `error.cause`

<!-- YAML
added: v16.9.0
-->

* 类型：{any}

如果存在，`error.cause` 属性是 `Error` 的根本原因。它用于捕获错误并抛出具有不同消息或代码的新错误，以便仍然可以访问原始错误。

`error.cause` 属性通常通过调用 `new Error(message, { cause })` 设置。如果未提供 `cause` 选项，则构造函数不会设置它。

此属性允许错误链接。当序列化 `Error` 对象时，如果设置了 [`util.inspect()`][]，则会递归序列化 `error.cause`。

```js
const cause = new Error('The remote HTTP server responded with a 500 status');
const symptom = new Error('The message failed to send', { cause });

console.log(symptom);
// 打印：
//   Error: 消息发送失败
//       at REPL2:1:17
//       at Script.runInThisContext (node:vm:130:12)
//       ... 7 行匹配 cause 堆栈跟踪 ...
//       at [_line] [as _line] (node:internal/readline/interface:886:18) {
//     [cause]: Error: 远程 HTTP 服务器响应了 500 状态
//         at REPL1:1:15
//         at Script.runInThisContext (node:vm:130:12)
//         at REPLServer.defaultEval (node:repl:574:29)
//         at bound (node:domain:426:15)
//         at REPLServer.runBound [as eval] (node:domain:437:12)
//         at REPLServer.onLine (node:repl:902:10)
//         at REPLServer.emit (node:events:549:35)
//         at REPLServer.emit (node:domain:482:12)
//         at [_onLine] [as _onLine] (node:internal/readline/interface:425:12)
//         at [_line] [as _line] (node:internal/readline/interface:886:18)
```

### `error.code`

* 类型：{string}

`error.code` 属性是一个字符串标签，用于识别错误的种类。`error.code` 是识别错误最稳定的方式。它只会在 Node.js 的主要版本之间更改。相比之下，`error.message` 字符串可能会在 Node.js 的任何版本之间更改。有关特定代码的详细信息，请参阅 [Node.js 错误代码][]。

### `error.message`

* 类型：{string}

`error.message` 属性是通过调用 `new Error(message)` 设置的错误的字符串描述。传递给构造函数的 `message` 也会出现在 `Error` 堆栈跟踪的第一行，但是在 `Error` 对象创建后更改此属性 _可能不会_ 更改堆栈跟踪的第一行（例如，当在更改此属性之前读取 `error.stack` 时）。

```js
const err = new Error('The message');
console.error(err.message);
// 打印：The message
```

### `error.stack`

* 类型：{string}

`error.stack` 属性是一个字符串，描述 `Error` 实例化的代码点。

```console
Error: 事情不断发生！
   at /home/gbusey/file.js:525:2
   at Frobnicator.refrobulate (/home/gbusey/business-logic.js:424:21)
   at Actor.<anonymous> (/home/gbusey/actors.js:400:8)
   at increaseSynergy (/home/gbusey/actors.js:701:6)
```

第一行格式为 `<error class name>: <error message>`，后跟一系列堆栈帧（每行以 "at " 开头）。

每个帧描述代码中导致错误生成的调用站点。V8 尝试为每个函数显示一个名称（通过变量名、函数名或对象方法名），但偶尔无法找到合适的名称。如果 V8 无法确定函数的名称，则该帧仅显示位置信息。否则，将显示确定的函数名称，并在括号中附加位置信息。

帧仅为 JavaScript 函数生成。例如，如果执行同步通过一个名为 `cheetahify` 的 C++ 插件函数，该函数本身调用一个 JavaScript 函数，则代表 `cheetahify` 调用的帧将不会出现在堆栈跟踪中：

```js
const cheetahify = require('./native-binding.node');

function makeFaster() {
  // `cheetahify()` *同步* 调用 speedy。
  cheetahify(function speedy() {
    throw new Error('oh no!');
  });
}

makeFaster();
// 将抛出：
//   /home/gbusey/file.js:6
//       throw new Error('oh no!');
//           ^
//   Error: oh no!
//       at speedy (/home/gbusey/file.js:6:11)
//       at makeFaster (/home/gbusey/file.js:5:3)
//       at Object.<anonymous> (/home/gbusey/file.js:10:1)
//       at Module._compile (module.js:456:26)
//       at Object.Module._extensions..js (module.js:474:10)
//       at Module.load (module.js:356:32)
//       at Function.Module._load (module.js:312:12)
//       at Function.Module.runMain (module.js:497:10)
//       at startup (node.js:119:16)
//       at node.js:906:3
```

位置信息将是以下之一：

* `native`，如果帧表示 V8 内部的调用（如 `[].forEach`）。
* `plain-filename.js:line:column`，如果帧表示 Node.js 内部的调用。
* `/absolute/path/to/file.js:line:column`，如果帧表示用户程序中的调用（使用 CommonJS 模块系统），或其依赖项。
* `<transport-protocol>:///url/to/module/file.mjs:line:column`，如果帧表示用户程序中的调用（使用 ES 模块系统），或其依赖项。

堆栈跟踪捕获的帧数受 `Error.stackTraceLimit` 或当前事件循环滴答可用帧数中较小者的限制。

`error.stack` 是隐藏内部属性的 getter/setter，仅存在于内置 `Error` 对象上（那些 [`Error.isError`][] 返回 true 的对象）。如果 `error` 不是内置错误对象，则 `error.stack` getter 将始终返回 `undefined`，setter 将不执行任何操作。如果访问器是使用非内置错误对象的 `this` 值手动调用的，例如 {Proxy}，则可能发生这种情况。

## 类：`AssertionError`

* 继承：{errors.Error}

表示断言失败。详细信息，请参阅
[` 类：assert.AssertionError`][]。

## 类：`RangeError`

* 继承：{errors.Error}

表示提供的参数不在函数的可接受值集或范围内；
无论是数值范围，还是超出给定函数参数的选项集。

```js
require('node:net').connect(-1);
// 抛出 "RangeError: "port" 选项应 >= 0 且 < 65536: -1"
```

Node.js 会 _立即_ 生成并抛出 `RangeError` 实例，作为一种参数验证形式。

## 类：`ReferenceError`

* 继承：{errors.Error}

表示试图访问未定义的变量。此类错误通常表明代码中有拼写错误，
或者程序已损坏。

虽然客户端代码可以生成并传播这些错误，但实际上，只有 V8
会这样做。

```js
doesNotExist;
// 抛出 ReferenceError，doesNotExist 在此程序中不是变量。
```

除非应用程序动态生成并运行代码，
否则 `ReferenceError` 实例表明代码或其依赖项中存在错误。

## 类：`SyntaxError`

* 继承：{errors.Error}

表示程序不是有效的 JavaScript。这些错误只能
作为代码求值的结果生成和传播。代码求值可能
作为 `eval`、`Function`、`require` 或 [vm][] 的结果发生。这些错误
几乎总是表明程序已损坏。

```js
try {
  require('node:vm').runInThisContext('binary ! isNotOk');
} catch (err) {
  // 'err' 将是一个 SyntaxError。
}
```

`SyntaxError` 实例在创建它们的上下文中是不可恢复的——
它们只能被其他上下文捕获。

## 类：`SystemError`

* 继承：{errors.Error}

当 Node.js 运行时环境中发生异常时，会生成系统错误。这些通常发生在应用程序违反
操作系统约束时。例如，如果应用程序
尝试读取不存在的文件，将发生系统错误。

* `address` {string} 如果存在，则为网络连接
  失败的地址
* `code` {string} 字符串错误代码
* `dest` {string} 如果存在，则为报告文件
  系统错误时的文件路径目标
* `errno` {number} 系统提供的错误号
* `info` {Object} 如果存在，则为关于错误条件的额外详细信息
* `message` {string} 系统提供的错误人类可读描述
* `path` {string} 如果存在，则为报告文件系统错误时的文件路径
* `port` {number} 如果存在，则为不可用的网络连接端口
* `syscall` {string} 触发错误的系统调用名称

### `error.address`

* 类型：{string}

如果存在，`error.address` 是一个字符串，描述网络连接
失败的地址。

### `error.code`

* 类型：{string}

`error.code` 属性是一个表示错误代码的字符串。

### `error.dest`

* 类型：{string}

如果存在，`error.dest` 是报告文件
系统错误时的文件路径目标。

### `error.errno`

* 类型：{number}

`error.errno` 属性是一个负数，对应
于 [`libuv 错误处理`][] 中定义的错误代码。

在 Windows 上，系统提供的错误号将由 libuv 规范化。

要获取错误代码的字符串表示形式，请使用
[`util.getSystemErrorName(error.errno)`][]。

### `error.info`

* 类型：{Object}

如果存在，`error.info` 是一个包含有关错误条件详细信息的对象。

### `error.message`

* 类型：{string}

`error.message` 是系统提供的错误人类可读描述。

### `error.path`

* 类型：{string}

如果存在，`error.path` 是一个包含相关无效路径名的字符串。

### `error.port`

* 类型：{number}

如果存在，`error.port` 是不可用的网络连接端口。

### `error.syscall`

* 类型：{string}

`error.syscall` 属性是一个描述失败的 [syscall][] 的字符串。

### 常见系统错误

这是在编写 Node.js
程序时 commonly-encountered 的系统错误列表。有关完整列表，请参阅 [`errno`(3) 手册页][]。

* `EACCES`（权限被拒绝）：试图以文件访问权限
  禁止的方式访问文件。

* `EADDRINUSE`（地址已被使用）：试图将服务器
  （[`net`][]、[`http`][] 或 [`https`][]）绑定到本地地址失败，因为
  本地系统上的另一个服务器已占用该地址。

* `ECONNREFUSED`（连接被拒绝）：无法建立连接，因为
  目标机器主动拒绝了它。这通常是由于试图
  连接到外部主机上未活动的服务。

* `ECONNRESET`（连接被对方重置）：连接被
  对方强制关闭。这通常是由于超时或重启导致远程
  套接字上的连接丢失。通常通过 [`http`][]
  和 [`net`][] 模块遇到。

* `EEXIST`（文件存在）：现有文件是要求目标
  不存在的操作的目标。

* `EISDIR`（是一个目录）：操作期望一个文件，但给定的
  路径名是一个目录。

* `EMFILE`（系统中打开的文件太多）：系统允许的
  [文件描述符][] 最大数量已达到，
  在至少关闭一个之前，无法满足另一个描述符的
  请求。这在同时打开许多文件时会遇到，
  特别是在进程文件描述符限制较低的系统（特别是 macOS）上。要补救低限制，请在运行 Node.js 进程的同一 shell 中运行
  `ulimit -n 2048`。

* `ENOENT`（没有这样的文件或目录）：通常由 [`fs`][] 操作
  抛出，表示指定路径名的组件不存在。给定路径找不到
  任何实体（文件或目录）。

* `ENOTDIR`（不是目录）：给定路径名的组件存在，但
  不是预期的目录。通常由 [`fs.readdir`][] 抛出。

* `ENOTEMPTY`（目录不为空）：具有条目的目录是
  要求空目录的操作的目标，通常是 [`fs.unlink`][]。

* `ENOTFOUND`（DNS 查找失败）：表示
  `EAI_NODATA` 或 `EAI_NONAME` 的 DNS 失败。这不是标准的 POSIX 错误。

* `EPERM`（操作不允许）：试图执行需要
  提升权限的操作。

* `EPIPE`（管道破裂）：在没有进程
  读取数据的情况下写入管道、套接字或 FIFO。通常在 [`net`][] 和
  [`http`][] 层遇到，表明正在
  写入的流的远程端已关闭。

* `ETIMEDOUT`（操作超时）：连接或发送请求失败，因为
  连接方在一段时间后未正确响应。通常
  由 [`http`][] 或 [`net`][] 遇到。通常是 `socket.end()`
  未正确调用的标志。

## 类：`TypeError`

* 继承 {errors.Error}

表示提供的参数不是允许的类型。例如，
将函数传递给期望字符串的参数将是 `TypeError`。

```js
require('node:url').parse(() => { });
// 抛出 TypeError，因为它期望一个字符串。
```

Node.js 会 _立即_ 生成并抛出 `TypeError` 实例，作为一种
参数验证形式。

## 异常与错误

<!--type=misc-->

JavaScript 异常是作为无效操作的结果或作为 `throw` 语句的目标而抛出的值。虽然不要求
这些值是 `Error` 的实例或继承自
`Error` 的类，但由 Node.js 或 JavaScript 运行时抛出的所有异常 _将_ 是
`Error` 的实例。

某些异常在 JavaScript 层是 _不可恢复的_。此类异常
_始终_ 会导致 Node.js 进程崩溃。示例包括 C++ 层中的 `assert()`
检查或 `abort()` 调用。

## OpenSSL 错误

源自 `crypto` 或 `tls` 的错误属于 `Error` 类，除了
标准的 `.code` 和 `.message` 属性外，可能还有一些额外的
OpenSSL 特定属性。

### `error.opensslErrorStack`

一个错误数组，可以提供上下文以了解错误源自 OpenSSL 库中的何处。

### `error.function`

错误源自的 OpenSSL 函数。

### `error.library`

错误源自的 OpenSSL 库。

### `error.reason`

一个人类可读的字符串，描述错误的原因。

<a id="nodejs-error-codes"></a>

## Node.js 错误代码

<a id="ABORT_ERR"></a>

### `ABORT_ERR`

<!-- YAML
added: v15.0.0
-->

当操作被中止时使用（通常使用 `AbortController`）。

_不_ 使用 `AbortSignal` 的 API 通常不会抛出带有此代码的错误。

此代码不使用 Node.js 错误使用的常规 `ERR_*` 约定，
以便与 Web 平台的 `AbortError` 兼容。

<a id="ERR_ACCESS_DENIED"></a>

### `ERR_ACCESS_DENIED`

一种特殊类型的错误，每当 Node.js 试图获取
[权限模型][] 限制的资源访问权限时触发。

<a id="ERR_AMBIGUOUS_ARGUMENT"></a>

### `ERR_AMBIGUOUS_ARGUMENT`

函数参数的使用方式表明函数
签名可能被误解。当 `assert.throws(block, message)` 中的 `message` 参数与 `block` 抛出的错误
消息匹配时，`node:assert` 模块会抛出此错误，因为这种用法表明用户认为
`message` 是预期消息，而不是如果 `block` 未抛出则 `AssertionError`
将显示的消息。

<a id="ERR_ARG_NOT_ITERABLE"></a>

### `ERR_ARG_NOT_ITERABLE`

需要可迭代参数（即适用于 `for...of` 循环的值），但未提供给 Node.js API。

<a id="ERR_ASSERTION"></a>

### `ERR_ASSERTION`

一种特殊类型的错误，每当 Node.js 检测到不应发生的
异常逻辑违规时触发。这些通常由
`node:assert` 模块抛出。

<a id="ERR_ASYNC_CALLBACK"></a>

### `ERR_ASYNC_CALLBACK`

试图注册不是函数的内容作为
`AsyncHooks` 回调。

<a id="ERR_ASYNC_LOADER_REQUEST_NEVER_SETTLED"></a>

### `ERR_ASYNC_LOADER_REQUEST_NEVER_SETTLED`

与模块加载相关的操作由异步加载器
钩子自定义，该钩子在加载器线程退出前从未结算 promise。

<a id="ERR_ASYNC_TYPE"></a>

### `ERR_ASYNC_TYPE`

异步资源的类型无效。如果使用公共嵌入者 API，用户也可以
定义自己的类型。

<a id="ERR_BROTLI_COMPRESSION_FAILED"></a>

### `ERR_BROTLI_COMPRESSION_FAILED`

传递给 Brotli 流的数据未成功压缩。

<a id="ERR_BROTLI_INVALID_PARAM"></a>

### `ERR_BROTLI_INVALID_PARAM`

在构造 Brotli 流期间传递了无效的参数键。

<a id="ERR_BUFFER_CONTEXT_NOT_AVAILABLE"></a>

### `ERR_BUFFER_CONTEXT_NOT_AVAILABLE`

试图在与 Node.js
实例无关的 JS 引擎上下文中，从插件或嵌入者
代码创建 Node.js `Buffer` 实例。传递给 `Buffer` 方法的数据将在
方法返回时被释放。

遇到此错误时，创建 `Buffer`
实例的可能替代方案是创建普通的 `Uint8Array`，它仅在
结果对象的原型上有所不同。`Uint8Array` 通常在所有
使用 `Buffer` 的 Node.js 核心 API 中都被接受；它们在所有上下文中都可用。

<a id="ERR_BUFFER_OUT_OF_BOUNDS"></a>

### `ERR_BUFFER_OUT_OF_BOUNDS`

试图在 `Buffer` 的边界之外进行操作。

<a id="ERR_BUFFER_TOO_LARGE"></a>

### `ERR_BUFFER_TOO_LARGE`

试图创建大于最大允许
大小的 `Buffer`。

<a id="ERR_CANNOT_WATCH_SIGINT"></a>

### `ERR_CANNOT_WATCH_SIGINT`

Node.js 无法监视 `SIGINT` 信号。

<a id="ERR_CHILD_CLOSED_BEFORE_REPLY"></a>

### `ERR_CHILD_CLOSED_BEFORE_REPLY`

子进程在父进程收到回复之前关闭。

<a id="ERR_CHILD_PROCESS_IPC_REQUIRED"></a>

### `ERR_CHILD_PROCESS_IPC_REQUIRED`

当分叉子进程而未指定 IPC 通道时使用。

<a id="ERR_CHILD_PROCESS_STDIO_MAXBUFFER"></a>

### `ERR_CHILD_PROCESS_STDIO_MAXBUFFER`

当主进程试图从子进程的
STDERR/STDOUT 读取数据，且数据长度超过 `maxBuffer` 选项时使用。

<a id="ERR_CLOSED_MESSAGE_PORT"></a>

### `ERR_CLOSED_MESSAGE_PORT`

<!-- YAML
added: v10.5.0
changes:
  - version:
      - v16.2.0
      - v14.17.1
    pr-url: https://github.com/nodejs/node/pull/38510
    description: The error message was reintroduced.
  - version: v11.12.0
    pr-url: https://github.com/nodejs/node/pull/26487
    description: The error message was removed.
-->

试图在关闭
状态下使用 `MessagePort` 实例，通常在调用 `.close()` 之后。

<a id="ERR_CONSOLE_WRITABLE_STREAM"></a>

### `ERR_CONSOLE_WRITABLE_STREAM`

`Console` 实例化时没有 `stdout` 流，或者 `Console` 具有
不可写的 `stdout` 或 `stderr` 流。

<a id="ERR_CONSTRUCT_CALL_INVALID"></a>

### `ERR_CONSTRUCT_CALL_INVALID`

<!-- YAML
added: v12.5.0
-->

调用了不可调用的类构造函数。

<a id="ERR_CONSTRUCT_CALL_REQUIRED"></a>

### `ERR_CONSTRUCT_CALL_REQUIRED`

调用类的构造函数时没有使用 `new`。

<a id="ERR_CONTEXT_NOT_INITIALIZED"></a>

### `ERR_CONTEXT_NOT_INITIALIZED`

传递给 API 的 vm 上下文尚未初始化。这可能发生
在创建上下文期间发生错误（并被捕获）时，例如，当
分配失败或创建上下文时达到最大调用栈
大小。

<a id="ERR_CPU_PROFILE_ALREADY_STARTED"></a>

### `ERR_CPU_PROFILE_ALREADY_STARTED`

<!-- YAML
added:
  - v24.8.0
  - v22.20.0
-->

具有给定名称的 CPU 配置文件已启动。

<a id="ERR_CPU_PROFILE_NOT_STARTED"></a>

### `ERR_CPU_PROFILE_NOT_STARTED`

<!-- YAML
added:
  - v24.8.0
  - v22.20.0
-->

具有给定名称的 CPU 配置文件未启动。

<a id="ERR_CPU_PROFILE_TOO_MANY"></a>

### `ERR_CPU_PROFILE_TOO_MANY`

<!-- YAML
added:
  - v24.8.0
  - v22.20.0
-->

正在收集的 CPU 配置文件太多。

<a id="ERR_CRYPTO_ARGON2_NOT_SUPPORTED"></a>

### `ERR_CRYPTO_ARGON2_NOT_SUPPORTED`

当前使用的 OpenSSL 版本不支持 Argon2。

<a id="ERR_CRYPTO_CUSTOM_ENGINE_NOT_SUPPORTED"></a>

### `ERR_CRYPTO_CUSTOM_ENGINE_NOT_SUPPORTED`

请求了 OpenSSL 引擎（例如，通过 `clientCertEngine` 或
`privateKeyEngine` TLS 选项），但使用的 OpenSSL
版本不支持，可能是由于编译时标志 `OPENSSL_NO_ENGINE`。

<a id="ERR_CRYPTO_ECDH_INVALID_FORMAT"></a>

### `ERR_CRYPTO_ECDH_INVALID_FORMAT`

将无效的 `format` 参数值传递给 `crypto.ECDH()`
类 `getPublicKey()` 方法。

<a id="ERR_CRYPTO_ECDH_INVALID_PUBLIC_KEY"></a>

### `ERR_CRYPTO_ECDH_INVALID_PUBLIC_KEY`

将无效的 `key` 参数值传递给
`crypto.ECDH()` 类 `computeSecret()` 方法。这意味着公钥
位于椭圆曲线之外。

<a id="ERR_CRYPTO_ENGINE_UNKNOWN"></a>

### `ERR_CRYPTO_ENGINE_UNKNOWN`

将无效的加密引擎标识符传递给
[`require('node:crypto').setEngine()`][]。

<a id="ERR_CRYPTO_FIPS_FORCED"></a>

### `ERR_CRYPTO_FIPS_FORCED`

使用了 [`--force-fips`][] 命令行参数，但试图
在 `node:crypto` 模块中启用或禁用 FIPS 模式。

<a id="ERR_CRYPTO_FIPS_UNAVAILABLE"></a>

### `ERR_CRYPTO_FIPS_UNAVAILABLE`

试图启用或禁用 FIPS 模式，但 FIPS 模式不可用。

<a id="ERR_CRYPTO_HASH_FINALIZED"></a>

### `ERR_CRYPTO_HASH_FINALIZED`

[`hash.digest()`][] 被调用了多次。`hash.digest()` 方法
每个 `Hash` 对象实例只能调用一次。

<a id="ERR_CRYPTO_HASH_UPDATE_FAILED"></a>

### `ERR_CRYPTO_HASH_UPDATE_FAILED`

[`hash.update()`][] 因任何原因失败。这应该很少发生，如果有的话。

<a id="ERR_CRYPTO_INCOMPATIBLE_KEY"></a>

### `ERR_CRYPTO_INCOMPATIBLE_KEY`

给定的加密密钥与尝试的操作不兼容。

<a id="ERR_CRYPTO_INCOMPATIBLE_KEY_OPTIONS"></a>

### `ERR_CRYPTO_INCOMPATIBLE_KEY_OPTIONS`

选择的公钥或私钥编码与其他选项不兼容。

<a id="ERR_CRYPTO_INITIALIZATION_FAILED"></a>

### `ERR_CRYPTO_INITIALIZATION_FAILED`

<!-- YAML
added: v15.0.0
-->

加密子系统初始化失败。

<a id="ERR_CRYPTO_INVALID_AUTH_TAG"></a>

### `ERR_CRYPTO_INVALID_AUTH_TAG`

<!-- YAML
added: v15.0.0
-->

提供了无效的身份验证标签。

<a id="ERR_CRYPTO_INVALID_COUNTER"></a>

### `ERR_CRYPTO_INVALID_COUNTER`

<!-- YAML
added: v15.0.0
-->

为计数器模式密码提供了无效的计数器。

<a id="ERR_CRYPTO_INVALID_CURVE"></a>

### `ERR_CRYPTO_INVALID_CURVE`

<!-- YAML
added: v15.0.0
-->

提供了无效的椭圆曲线。

<a id="ERR_CRYPTO_INVALID_DIGEST"></a>

### `ERR_CRYPTO_INVALID_DIGEST`

指定了无效的 [加密摘要算法][]。

<a id="ERR_CRYPTO_INVALID_IV"></a>

### `ERR_CRYPTO_INVALID_IV`

<!-- YAML
added: v15.0.0
-->

提供了无效的初始化向量。

<a id="ERR_CRYPTO_INVALID_JWK"></a>

### `ERR_CRYPTO_INVALID_JWK`

<!-- YAML
added: v15.0.0
-->

提供了无效的 JSON Web Key。

<a id="ERR_CRYPTO_INVALID_KEYLEN"></a>

### `ERR_CRYPTO_INVALID_KEYLEN`

<!-- YAML
added: v15.0.0
-->

提供了无效的密钥长度。

<a id="ERR_CRYPTO_INVALID_KEYPAIR"></a>

### `ERR_CRYPTO_INVALID_KEYPAIR`

<!-- YAML
added: v15.0.0
-->

提供了无效的密钥对。

<a id="ERR_CRYPTO_INVALID_KEYTYPE"></a>

### `ERR_CRYPTO_INVALID_KEYTYPE`

<!-- YAML
added: v15.0.0
-->

提供了无效的密钥类型。

<a id="ERR_CRYPTO_INVALID_KEY_OBJECT_TYPE"></a>

### `ERR_CRYPTO_INVALID_KEY_OBJECT_TYPE`

给定的加密密钥对象的类型对于尝试的操作无效。

<a id="ERR_CRYPTO_INVALID_MESSAGELEN"></a>

### `ERR_CRYPTO_INVALID_MESSAGELEN`

<!-- YAML
added: v15.0.0
-->

提供了无效的消息长度。

<a id="ERR_CRYPTO_INVALID_SCRYPT_PARAMS"></a>

### `ERR_CRYPTO_INVALID_SCRYPT_PARAMS`

<!-- YAML
added: v15.0.0
-->

一个或多个 [`crypto.scrypt()`][] 或 [`crypto.scryptSync()`][] 参数
超出其合法范围。

<a id="ERR_CRYPTO_INVALID_STATE"></a>

### `ERR_CRYPTO_INVALID_STATE`

在处于无效状态的对象上使用了加密方法。例如，
在调用 `cipher.final()` 之前调用 [`cipher.getAuthTag()`][]。

<a id="ERR_CRYPTO_INVALID_TAG_LENGTH"></a>

### `ERR_CRYPTO_INVALID_TAG_LENGTH`

<!-- YAML
added: v15.0.0
-->

提供了无效的身份验证标签长度。

<a id="ERR_CRYPTO_JOB_INIT_FAILED"></a>

### `ERR_CRYPTO_JOB_INIT_FAILED`

<!-- YAML
added: v15.0.0
-->

异步加密操作初始化失败。

<a id="ERR_CRYPTO_JWK_UNSUPPORTED_CURVE"></a>

### `ERR_CRYPTO_JWK_UNSUPPORTED_CURVE`

密钥的椭圆曲线未在
[JSON Web Key 椭圆曲线注册表][] 中注册使用。

<a id="ERR_CRYPTO_JWK_UNSUPPORTED_KEY_TYPE"></a>

### `ERR_CRYPTO_JWK_UNSUPPORTED_KEY_TYPE`

密钥的非对称密钥类型未在
[JSON Web Key 类型注册表][] 中注册使用。

<a id="ERR_CRYPTO_KEM_NOT_SUPPORTED"></a>

### `ERR_CRYPTO_KEM_NOT_SUPPORTED`

<!-- YAML
added: v24.7.0
-->

试图使用 KEM 操作，而 Node.js 编译时未使用
支持 KEM 的 OpenSSL。

<a id="ERR_CRYPTO_OPERATION_FAILED"></a>

### `ERR_CRYPTO_OPERATION_FAILED`

<!-- YAML
added: v15.0.0
-->

加密操作因其他未指定的原因失败。

<a id="ERR_CRYPTO_PBKDF2_ERROR"></a>

### `ERR_CRYPTO_PBKDF2_ERROR`

PBKDF2 算法因未指定的原因失败。OpenSSL 不提供
更多详细信息，因此 Node.js 也不提供。

<a id="ERR_CRYPTO_SCRYPT_NOT_SUPPORTED"></a>

### `ERR_CRYPTO_SCRYPT_NOT_SUPPORTED`

Node.js 编译时未包含 `scrypt` 支持。官方
发布二进制文件不可能出现这种情况，但自定义构建（包括发行版构建）可能发生。

<a id="ERR_CRYPTO_SIGN_KEY_REQUIRED"></a>

### `ERR_CRYPTO_SIGN_KEY_REQUIRED`

未向 [`sign.sign()`][] 方法提供签名 `key`。

<a id="ERR_CRYPTO_TIMING_SAFE_EQUAL_LENGTH"></a>

### `ERR_CRYPTO_TIMING_SAFE_EQUAL_LENGTH`

[`crypto.timingSafeEqual()`][] 被调用时，`Buffer`、`TypedArray` 或
`DataView` 参数的长度不同。

<a id="ERR_CRYPTO_UNKNOWN_CIPHER"></a>

### `ERR_CRYPTO_UNKNOWN_CIPHER`

指定了未知的密码。

<a id="ERR_CRYPTO_UNKNOWN_DH_GROUP"></a>

### `ERR_CRYPTO_UNKNOWN_DH_GROUP`

给出了未知的 Diffie-Hellman 组名称。请参阅
[`crypto.getDiffieHellman()`][] 以获取有效组名称列表。

<a id="ERR_CRYPTO_UNSUPPORTED_OPERATION"></a>

### `ERR_CRYPTO_UNSUPPORTED_OPERATION`

<!-- YAML
added:
  - v15.0.0
  - v14.18.0
-->

试图调用不支持的加密操作。

<a id="ERR_DEBUGGER_ERROR"></a>

### `ERR_DEBUGGER_ERROR`

<!-- YAML
added:
  - v16.4.0
  - v14.17.4
-->

[调试器][] 发生错误。

<a id="ERR_DEBUGGER_STARTUP_ERROR"></a>

### `ERR_DEBUGGER_STARTUP_ERROR`

<!-- YAML
added:
  - v16.4.0
  - v14.17.4
-->

[调试器][] 等待所需的主机/端口可用时超时。

<a id="ERR_DIR_CLOSED"></a>

### `ERR_DIR_CLOSED`

[`fs.Dir`][] 之前已关闭。

<a id="ERR_DIR_CONCURRENT_OPERATION"></a>

### `ERR_DIR_CONCURRENT_OPERATION`

<!-- YAML
added: v14.3.0
-->

试图在具有
正在进行的异步操作的 [`fs.Dir`][] 上进行同步读取或关闭调用。

<a id="ERR_DLOPEN_DISABLED"></a>

### `ERR_DLOPEN_DISABLED`

<!-- YAML
added:
  - v16.10.0
  - v14.19.0
-->

使用 [`--no-addons`][] 禁用了加载原生插件。

<a id="ERR_DLOPEN_FAILED"></a>

### `ERR_DLOPEN_FAILED`

<!-- YAML
added: v15.0.0
-->

调用 `process.dlopen()` 失败。

<a id="ERR_DNS_SET_SERVERS_FAILED"></a>

### `ERR_DNS_SET_SERVERS_FAILED`

`c-ares` 设置 DNS 服务器失败。

<a id="ERR_DOMAIN_CALLBACK_NOT_AVAILABLE"></a>

### `ERR_DOMAIN_CALLBACK_NOT_AVAILABLE`

`node:domain` 模块不可用，因为它无法建立
所需的错误处理钩子，因为
[`process.setUncaughtExceptionCaptureCallback()`][] 已在
较早的时间点被调用。

<a id="ERR_DOMAIN_CANNOT_SET_UNCAUGHT_EXCEPTION_CAPTURE"></a>

### `ERR_DOMAIN_CANNOT_SET_UNCAUGHT_EXCEPTION_CAPTURE`

无法调用 [`process.setUncaughtExceptionCaptureCallback()`][]，
因为 `node:domain` 模块已在较早的时间点被加载。

堆栈跟踪被扩展以包括
`node:domain` 模块被加载的时间点。

<a id="ERR_DUPLICATE_STARTUP_SNAPSHOT_MAIN_FUNCTION"></a>

### `ERR_DUPLICATE_STARTUP_SNAPSHOT_MAIN_FUNCTION`

无法调用 [`v8.startupSnapshot.setDeserializeMainFunction()`][]，
因为它之前已被调用。

<a id="ERR_ENCODING_INVALID_ENCODED_DATA"></a>

### `ERR_ENCODING_INVALID_ENCODED_DATA`

提供给 `TextDecoder()` API 的数据根据提供的
编码无效。

<a id="ERR_ENCODING_NOT_SUPPORTED"></a>

### `ERR_ENCODING_NOT_SUPPORTED`

提供给 `TextDecoder()` API 的编码不是
[WHATWG 支持的编码][] 之一。

<a id="ERR_EVAL_ESM_CANNOT_PRINT"></a>

### `ERR_EVAL_ESM_CANNOT_PRINT`

`--print` 不能与 ESM 输入一起使用。

<a id="ERR_EVENT_RECURSION"></a>

### `ERR_EVENT_RECURSION`

当试图在 `EventTarget` 上递归调度事件时抛出。

<a id="ERR_EXECUTION_ENVIRONMENT_NOT_AVAILABLE"></a>

### `ERR_EXECUTION_ENVIRONMENT_NOT_AVAILABLE`

JS 执行上下文不与 Node.js 环境关联。
当 Node.js 用作嵌入库且某些 JS 引擎钩子
未正确设置时，可能会发生这种情况。

<a id="ERR_FALSY_VALUE_REJECTION"></a>

### `ERR_FALSY_VALUE_REJECTION`

通过 `util.callbackify()` 回调化的 `Promise` 被
假值拒绝。

<a id="ERR_FEATURE_UNAVAILABLE_ON_PLATFORM"></a>

### `ERR_FEATURE_UNAVAILABLE_ON_PLATFORM`

<!-- YAML
added: v14.0.0
-->

当使用当前运行 Node.js 的平台不可用的
功能时使用。

<a id="ERR_FS_CP_DIR_TO_NON_DIR"></a>

### `ERR_FS_CP_DIR_TO_NON_DIR`

<!-- YAML
added: v16.7.0
-->

试图使用 [`fs.cp()`][] 将目录复制到非目录（文件、符号链接
等）。

<a id="ERR_FS_CP_EEXIST"></a>

### `ERR_FS_CP_EEXIST`

<!-- YAML
added: v16.7.0
-->

试图使用 [`fs.cp()`][] 覆盖已存在的文件，
且 `force` 和 `errorOnExist` 设置为 `true`。

<a id="ERR_FS_CP_EINVAL"></a>

### `ERR_FS_CP_EINVAL`

<!-- YAML
added: v16.7.0
-->

当使用 [`fs.cp()`][] 时，`src` 或 `dest` 指向无效路径。

<a id="ERR_FS_CP_FIFO_PIPE"></a>

### `ERR_FS_CP_FIFO_PIPE`

<!-- YAML
added: v16.7.0
-->

试图使用 [`fs.cp()`][] 复制命名管道。

<a id="ERR_FS_CP_NON_DIR_TO_DIR"></a>

### `ERR_FS_CP_NON_DIR_TO_DIR`

<!-- YAML
added: v16.7.0
-->

试图使用 [`fs.cp()`][] 将非目录（文件、符号链接等）复制到目录。

<a id="ERR_FS_CP_SOCKET"></a>

### `ERR_FS_CP_SOCKET`

<!-- YAML
added: v16.7.0
-->

试图使用 [`fs.cp()`][] 复制到套接字。

<a id="ERR_FS_CP_SYMLINK_TO_SUBDIRECTORY"></a>

### `ERR_FS_CP_SYMLINK_TO_SUBDIRECTORY`

<!-- YAML
added: v16.7.0
-->

当使用 [`fs.cp()`][] 时，`dest` 中的符号链接指向
`src` 的子目录。

<a id="ERR_FS_CP_UNKNOWN"></a>

### `ERR_FS_CP_UNKNOWN`

<!-- YAML
added: v16.7.0
-->

试图使用 [`fs.cp()`][] 复制到未知的文件类型。

<a id="ERR_FS_EISDIR"></a>

### `ERR_FS_EISDIR`

路径是一个目录。

<a id="ERR_FS_FILE_TOO_LARGE"></a>

### `ERR_FS_FILE_TOO_LARGE`

试图读取大于 `fs.readFile()` 支持的 2 GiB 限制的文件。这不是 `Buffer` 的限制，而是内部 I/O 约束。
对于处理更大的文件，考虑使用 `fs.createReadStream()` 分块读取
文件。

<a id="ERR_FS_WATCH_QUEUE_OVERFLOW"></a>

### `ERR_FS_WATCH_QUEUE_OVERFLOW`

在 `fs.watch()` 的 `maxQueue` 中指定的大小超过了排队而未处理的文件系统事件数量。

<a id="ERR_HTTP2_ALTSVC_INVALID_ORIGIN"></a>

### `ERR_HTTP2_ALTSVC_INVALID_ORIGIN`

HTTP/2 ALTSVC 帧需要有效的源。

<a id="ERR_HTTP2_ALTSVC_LENGTH"></a>

### `ERR_HTTP2_ALTSVC_LENGTH`

HTTP/2 ALTSVC 帧限制为最大 16,382 有效载荷字节。

<a id="ERR_HTTP2_CONNECT_AUTHORITY"></a>

### `ERR_HTTP2_CONNECT_AUTHORITY`

对于使用 `CONNECT` 方法的 HTTP/2 请求，需要 `:authority` 伪头。

<a id="ERR_HTTP2_CONNECT_PATH"></a>

### `ERR_HTTP2_CONNECT_PATH`

对于使用 `CONNECT` 方法的 HTTP/2 请求，禁止 `:path` 伪头。

<a id="ERR_HTTP2_CONNECT_SCHEME"></a>

### `ERR_HTTP2_CONNECT_SCHEME`

对于使用 `CONNECT` 方法的 HTTP/2 请求，禁止 `:scheme` 伪头。

<a id="ERR_HTTP2_ERROR"></a>

### `ERR_HTTP2_ERROR`

发生了非特定的 HTTP/2 错误。

<a id="ERR_HTTP2_GOAWAY_SESSION"></a>

### `ERR_HTTP2_GOAWAY_SESSION`

在 `Http2Session` 从连接的对方收到
`GOAWAY` 帧后，不得打开新的 HTTP/2 流。

<a id="ERR_HTTP2_HEADERS_AFTER_RESPOND"></a>

### `ERR_HTTP2_HEADERS_AFTER_RESPOND`

在启动 HTTP/2 响应后指定了额外的头。

<a id="ERR_HTTP2_HEADERS_SENT"></a>

### `ERR_HTTP2_HEADERS_SENT`

试图发送多个响应头。

<a id="ERR_HTTP2_HEADER_SINGLE_VALUE"></a>

### `ERR_HTTP2_HEADER_SINGLE_VALUE`

为要求只有一个值的 HTTP/2 头字段提供了多个值。

<a id="ERR_HTTP2_INFO_STATUS_NOT_ALLOWED"></a>

### `ERR_HTTP2_INFO_STATUS_NOT_ALLOWED`

信息性 HTTP 状态码（`1xx`）不得设置为 HTTP/2 响应的响应状态
码。

<a id="ERR_HTTP2_INVALID_CONNECTION_HEADERS"></a>

### `ERR_HTTP2_INVALID_CONNECTION_HEADERS`

禁止在 HTTP/2
请求和响应中使用 HTTP/1 连接特定头。

<a id="ERR_HTTP2_INVALID_HEADER_VALUE"></a>

### `ERR_HTTP2_INVALID_HEADER_VALUE`

指定了无效的 HTTP/2 头值。

<a id="ERR_HTTP2_INVALID_INFO_STATUS"></a>

### `ERR_HTTP2_INVALID_INFO_STATUS`

指定了无效的 HTTP 信息性状态码。信息性
状态码必须是 `100` 到 `199`（含）之间的整数。

<a id="ERR_HTTP2_INVALID_ORIGIN"></a>

### `ERR_HTTP2_INVALID_ORIGIN`

HTTP/2 `ORIGIN` 帧需要有效的源。

<a id="ERR_HTTP2_INVALID_PACKED_SETTINGS_LENGTH"></a>

### `ERR_HTTP2_INVALID_PACKED_SETTINGS_LENGTH`

传递给
`http2.getUnpackedSettings()` API 的输入 `Buffer` 和 `Uint8Array` 实例的长度必须是
六的倍数。

<a id="ERR_HTTP2_INVALID_PSEUDOHEADER"></a>

### `ERR_HTTP2_INVALID_PSEUDOHEADER`

只能使用有效的 HTTP/2 伪头（`:status`、`:path`、`:authority`、`:scheme`
和 `:method`）。

<a id="ERR_HTTP2_INVALID_SESSION"></a>

### `ERR_HTTP2_INVALID_SESSION`

对已销毁的 `Http2Session` 对象执行了操作。

<a id="ERR_HTTP2_INVALID_SETTING_VALUE"></a>

### `ERR_HTTP2_INVALID_SETTING_VALUE`

为 HTTP/2 设置指定了无效值。

<a id="ERR_HTTP2_INVALID_STREAM"></a>

### `ERR_HTTP2_INVALID_STREAM`

对已销毁的流执行了操作。

<a id="ERR_HTTP2_MAX_PENDING_SETTINGS_ACK"></a>

### `ERR_HTTP2_MAX_PENDING_SETTINGS_ACK`

每当向连接的对方发送 HTTP/2 `SETTINGS` 帧时，对方必须
发送确认，表明已接收并应用了新的
`SETTINGS`。默认情况下，任何时候可以发送的未确认 `SETTINGS` 帧有最大数量限制。当达到该限制时使用此错误代码。

<a id="ERR_HTTP2_NESTED_PUSH"></a>

### `ERR_HTTP2_NESTED_PUSH`

试图从推送流内发起新的推送流。
不允许嵌套推送流。

<a id="ERR_HTTP2_NO_MEM"></a>

### `ERR_HTTP2_NO_MEM`

使用 `http2session.setLocalWindowSize(windowSize)` API 时内存不足。

<a id="ERR_HTTP2_NO_SOCKET_MANIPULATION"></a>

### `ERR_HTTP2_NO_SOCKET_MANIPULATION`

试图直接操纵（读取、写入、暂停、恢复等）附加到
`Http2Session` 的套接字。

<a id="ERR_HTTP2_ORIGIN_LENGTH"></a>

### `ERR_HTTP2_ORIGIN_LENGTH`

HTTP/2 `ORIGIN` 帧限制为 16382 字节长度。

<a id="ERR_HTTP2_OUT_OF_STREAMS"></a>

### `ERR_HTTP2_OUT_OF_STREAMS`

在单个 HTTP/2 会话上创建的流数量达到最大
限制。

<a id="ERR_HTTP2_PAYLOAD_FORBIDDEN"></a>

### `ERR_HTTP2_PAYLOAD_FORBIDDEN`

为禁止有效载荷的 HTTP 响应代码指定了消息
有效载荷。

<a id="ERR_HTTP2_PING_CANCEL"></a>

### `ERR_HTTP2_PING_CANCEL`

HTTP/2 ping 被取消。

<a id="ERR_HTTP2_PING_LENGTH"></a>

### `ERR_HTTP2_PING_LENGTH`

HTTP/2 ping 有效载荷长度必须正好为 8 字节。

<a id="ERR_HTTP2_PSEUDOHEADER_NOT_ALLOWED"></a>

### `ERR_HTTP2_PSEUDOHEADER_NOT_ALLOWED`

不当使用了 HTTP/2 伪头。伪头是头
键名，以 `:` 前缀开头。

<a id="ERR_HTTP2_PUSH_DISABLED"></a>

### `ERR_HTTP2_PUSH_DISABLED`

试图创建推送流，但该流已被客户端
禁用。

<a id="ERR_HTTP2_SEND_FILE"></a>

### `ERR_HTTP2_SEND_FILE`

试图使用 `Http2Stream.prototype.responseWithFile()` API
发送目录。

<a id="ERR_HTTP2_SEND_FILE_NOSEEK"></a>

### `ERR_HTTP2_SEND_FILE_NOSEEK`

试图使用 `Http2Stream.prototype.responseWithFile()` API
发送除常规文件以外的内容，但提供了 `offset` 或 `length` 选项。

<a id="ERR_HTTP2_SESSION_ERROR"></a>

### `ERR_HTTP2_SESSION_ERROR`

`Http2Session` 以非零错误代码关闭。

<a id="ERR_HTTP2_SETTINGS_CANCEL"></a>

### `ERR_HTTP2_SETTINGS_CANCEL`

`Http2Session` 设置被取消。

<a id="ERR_HTTP2_SOCKET_BOUND"></a>

### `ERR_HTTP2_SOCKET_BOUND`

试图将 `Http2Session` 对象连接到已绑定到另一个
`Http2Session` 对象的 `net.Socket` 或
`tls.TLSSocket`。

<a id="ERR_HTTP2_SOCKET_UNBOUND"></a>

### `ERR_HTTP2_SOCKET_UNBOUND`

试图使用已关闭的 `Http2Session` 的 `socket` 属性。

<a id="ERR_HTTP2_STATUS_101"></a>

### `ERR_HTTP2_STATUS_101`

禁止在 HTTP/2 中使用 `101` 信息性状态码。

<a id="ERR_HTTP2_STATUS_INVALID"></a>

### `ERR_HTTP2_STATUS_INVALID`

指定了无效的 HTTP 状态码。状态码必须是
`100` 到 `599`（含）之间的整数。

<a id="ERR_HTTP2_STREAM_CANCEL"></a>

### `ERR_HTTP2_STREAM_CANCEL`

`Http2Stream` 在将任何数据传输到连接的
对方之前被销毁。

<a id="ERR_HTTP2_STREAM_ERROR"></a>

### `ERR_HTTP2_STREAM_ERROR`

在 `RST_STREAM` 帧中指定了非零错误代码。

<a id="ERR_HTTP2_STREAM_SELF_DEPENDENCY"></a>

### `ERR_HTTP2_STREAM_SELF_DEPENDENCY`

设置 HTTP/2 流的优先级时，流可以被标记为
父流的依赖项。当试图将流标记为依赖于自身时使用此错误代码。

<a id="ERR_HTTP2_TOO_MANY_CUSTOM_SETTINGS"></a>

### `ERR_HTTP2_TOO_MANY_CUSTOM_SETTINGS`

超过支持的自定义设置数量（10）。

<a id="ERR_HTTP2_TOO_MANY_INVALID_FRAMES"></a>

### `ERR_HTTP2_TOO_MANY_INVALID_FRAMES`

<!-- YAML
added: v15.14.0
-->

超过通过 `maxSessionInvalidFrames` 选项指定的对方发送的可接受无效 HTTP/2 协议帧的限制。

<a id="ERR_HTTP2_TRAILERS_ALREADY_SENT"></a>

### `ERR_HTTP2_TRAILERS_ALREADY_SENT`

尾随头已在 `Http2Stream` 上发送。

<a id="ERR_HTTP2_TRAILERS_NOT_READY"></a>

### `ERR_HTTP2_TRAILERS_NOT_READY`

在 `Http2Stream` 对象上发出 `'wantTrailers'` 事件之前，不能调用
`http2stream.sendTrailers()` 方法。
仅当为 `Http2Stream` 设置 `waitForTrailers` 选项时，才会发出
`'wantTrailers'` 事件。

<a id="ERR_HTTP2_UNSUPPORTED_PROTOCOL"></a>

### `ERR_HTTP2_UNSUPPORTED_PROTOCOL`

`http2.connect()` 传递的 URL 使用 `http:` 或
`https:` 以外的任何协议。

<a id="ERR_HTTP_BODY_NOT_ALLOWED"></a>

### `ERR_HTTP_BODY_NOT_ALLOWED`

当写入不允许内容的 HTTP 响应时抛出错误。

<a id="ERR_HTTP_CONTENT_LENGTH_MISMATCH"></a>

### `ERR_HTTP_CONTENT_LENGTH_MISMATCH`

响应体大小与指定的 content-length 头值不匹配。

<a id="ERR_HTTP_HEADERS_SENT"></a>

### `ERR_HTTP_HEADERS_SENT`

试图在头已发送后添加更多头。

<a id="ERR_HTTP_INVALID_HEADER_VALUE"></a>

### `ERR_HTTP_INVALID_HEADER_VALUE`

指定了无效的 HTTP 头值。

<a id="ERR_HTTP_INVALID_STATUS_CODE"></a>

### `ERR_HTTP_INVALID_STATUS_CODE`

状态码超出常规状态码范围（100-999）。

<a id="ERR_HTTP_REQUEST_TIMEOUT"></a>

### `ERR_HTTP_REQUEST_TIMEOUT`

客户端未在允许的时间内发送整个请求。

<a id="ERR_HTTP_SOCKET_ASSIGNED"></a>

### `ERR_HTTP_SOCKET_ASSIGNED`

给定的 [`ServerResponse`][] 已分配套接字。

<a id="ERR_HTTP_SOCKET_ENCODING"></a>

### `ERR_HTTP_SOCKET_ENCODING`

根据 [RFC 7230 Section 3][] 不允许更改套接字编码。

<a id="ERR_HTTP_TRAILER_INVALID"></a>

### `ERR_HTTP_TRAILER_INVALID`

设置了 `Trailer` 头，但传输编码不支持
该头。

<a id="ERR_ILLEGAL_CONSTRUCTOR"></a>

### `ERR_ILLEGAL_CONSTRUCTOR`

试图使用非公共构造函数构造对象。

<a id="ERR_IMPORT_ATTRIBUTE_MISSING"></a>

### `ERR_IMPORT_ATTRIBUTE_MISSING`

<!-- YAML
added:
  - v21.1.0
-->

缺少导入属性，阻止导入指定模块。

<a id="ERR_IMPORT_ATTRIBUTE_TYPE_INCOMPATIBLE"></a>

### `ERR_IMPORT_ATTRIBUTE_TYPE_INCOMPATIBLE`

<!-- YAML
added:
  - v21.1.0
-->

提供了导入 `type` 属性，但指定模块是
不同类型。

<a id="ERR_IMPORT_ATTRIBUTE_UNSUPPORTED"></a>

### `ERR_IMPORT_ATTRIBUTE_UNSUPPORTED`

<!-- YAML
added:
  - v21.0.0
  - v20.10.0
  - v18.19.0
-->

此版本的 Node.js 不支持导入属性。

<a id="ERR_INCOMPATIBLE_OPTION_PAIR"></a>

### `ERR_INCOMPATIBLE_OPTION_PAIR`

选项对彼此不兼容，不能同时使用。

<a id="ERR_INPUT_TYPE_NOT_ALLOWED"></a>

### `ERR_INPUT_TYPE_NOT_ALLOWED`

使用 `--input-type` 标志试图执行文件。此标志只能
与通过 `--eval`、`--print` 或 `STDIN` 的输入一起使用。

<a id="ERR_INSPECTOR_ALREADY_ACTIVATED"></a>

### `ERR_INSPECTOR_ALREADY_ACTIVATED`

使用 `node:inspector` 模块时，试图在检查器
已开始监听端口时激活它。在不同地址激活之前使用 `inspector.close()`。

<a id="ERR_INSPECTOR_ALREADY_CONNECTED"></a>

### `ERR_INSPECTOR_ALREADY_CONNECTED`

使用 `node:inspector` 模块时，试图在检查器
已连接时连接。

<a id="ERR_INSPECTOR_CLOSED"></a>

### `ERR_INSPECTOR_CLOSED`

使用 `node:inspector` 模块时，试图在会话
已关闭后使用检查器。

<a id="ERR_INSPECTOR_COMMAND"></a>

### `ERR_INSPECTOR_COMMAND`

通过 `node:inspector` 模块发出命令时发生错误。

<a id="ERR_INSPECTOR_NOT_ACTIVE"></a>

### `ERR_INSPECTOR_NOT_ACTIVE`

调用 `inspector.waitForDebugger()` 时 `inspector` 未激活。

<a id="ERR_INSPECTOR_NOT_AVAILABLE"></a>

### `ERR_INSPECTOR_NOT_AVAILABLE`

`node:inspector` 模块不可用。

<a id="ERR_INSPECTOR_NOT_CONNECTED"></a>

### `ERR_INSPECTOR_NOT_CONNECTED`

使用 `node:inspector` 模块时，试图在检查器
连接之前使用它。

<a id="ERR_INSPECTOR_NOT_WORKER"></a>

### `ERR_INSPECTOR_NOT_WORKER`

在主线程上调用了只能从
工作线程使用的 API。

<a id="ERR_INTERNAL_ASSERTION"></a>

### `ERR_INTERNAL_ASSERTION`

Node.js 中存在错误或 Node.js 内部使用不正确。
要修复错误，请在 <https://github.com/nodejs/node/issues> 提出问题。

<a id="ERR_INVALID_ADDRESS"></a>

### `ERR_INVALID_ADDRESS`

Node.js API 不理解提供的地址。

<a id="ERR_INVALID_ADDRESS_FAMILY"></a>

### `ERR_INVALID_ADDRESS_FAMILY`

Node.js API 不理解提供的地址族。

<a id="ERR_INVALID_ARG_TYPE"></a>

### `ERR_INVALID_ARG_TYPE`

将错误类型的参数传递给 Node.js API。

<a id="ERR_INVALID_ARG_VALUE"></a>

### `ERR_INVALID_ARG_VALUE`

为给定参数传递了无效或不支持的值。

<a id="ERR_INVALID_ASYNC_ID"></a>

### `ERR_INVALID_ASYNC_ID`

使用 `AsyncHooks` 传递了无效的 `asyncId` 或 `triggerAsyncId`。id
小于 -1 的情况绝不应发生。

<a id="ERR_INVALID_BUFFER_SIZE"></a>

### `ERR_INVALID_BUFFER_SIZE`

在 `Buffer` 上执行了交换，但其大小与
操作不兼容。

<a id="ERR_INVALID_CHAR"></a>

### `ERR_INVALID_CHAR`

在头中检测到无效字符。

<a id="ERR_INVALID_CURSOR_POS"></a>

### `ERR_INVALID_CURSOR_POS`

给定流上的游标无法在没有指定
列的情况下移动到指定行。

<a id="ERR_INVALID_FD"></a>

### `ERR_INVALID_FD`

文件描述符 ('fd') 无效（例如，它是负值）。

<a id="ERR_INVALID_FD_TYPE"></a>

### `ERR_INVALID_FD_TYPE`

文件描述符 ('fd') 类型无效。

<a id="ERR_INVALID_FILE_URL_HOST"></a>

### `ERR_INVALID_FILE_URL_HOST`

使用 `file:` URL 的 Node.js API（例如 [`fs`][] 模块中的某些函数）遇到具有不兼容主机的文件 URL。这种情况
仅发生在 Unix-like 系统上，其中仅支持 `localhost` 或空
主机。

<a id="ERR_INVALID_FILE_URL_PATH"></a>

### `ERR_INVALID_FILE_URL_PATH`

使用 `file:` URL 的 Node.js API（例如 [`fs`][] 模块中的某些函数）遇到具有不兼容路径的文件 URL。确定路径是否可用的确切
语义取决于平台。

抛出的错误对象包括一个 `input` 属性，其中包含无效 `file:` URL 的 URL 对象。

<a id="ERR_INVALID_HANDLE_TYPE"></a>

### `ERR_INVALID_HANDLE_TYPE`

试图通过 IPC 通信
通道向子进程发送不支持的 "handle"。有关更多信息，请参阅 [`subprocess.send()`][] 和 [`process.send()`][]。

<a id="ERR_INVALID_HTTP_TOKEN"></a>

### `ERR_INVALID_HTTP_TOKEN`

提供了无效的 HTTP 令牌。

<a id="ERR_INVALID_IP_ADDRESS"></a>

### `ERR_INVALID_IP_ADDRESS`

IP 地址无效。

<a id="ERR_INVALID_MIME_SYNTAX"></a>

### `ERR_INVALID_MIME_SYNTAX`

MIME 语法无效。

<a id="ERR_INVALID_MODULE"></a>

### `ERR_INVALID_MODULE`

<!-- YAML
added:
  - v15.0.0
  - v14.18.0
-->

试图加载不存在或以其他方式
无效的模块。

<a id="ERR_INVALID_MODULE_SPECIFIER"></a>

### `ERR_INVALID_MODULE_SPECIFIER`

导入的模块字符串是无效的 URL、包名或包子路径
说明符。

<a id="ERR_INVALID_OBJECT_DEFINE_PROPERTY"></a>

### `ERR_INVALID_OBJECT_DEFINE_PROPERTY`

在对象的属性上设置无效属性时发生错误。

<a id="ERR_INVALID_PACKAGE_CONFIG"></a>

### `ERR_INVALID_PACKAGE_CONFIG`

无效的 [`package.json`][] 文件解析失败。

<a id="ERR_INVALID_PACKAGE_TARGET"></a>

### `ERR_INVALID_PACKAGE_TARGET`

`package.json` [`"exports"`][] 字段包含无效的 target 映射
值，用于尝试的模块解析。

<a id="ERR_INVALID_PROTOCOL"></a>

### `ERR_INVALID_PROTOCOL`

将无效的 `options.protocol` 传递给 `http.request()`。

<a id="ERR_INVALID_REPL_EVAL_CONFIG"></a>

### `ERR_INVALID_REPL_EVAL_CONFIG`

在 [`REPL`][] 配置中同时设置了 `breakEvalOnSigint` 和 `eval` 选项，
这是不支持的。

<a id="ERR_INVALID_REPL_INPUT"></a>

### `ERR_INVALID_REPL_INPUT`

输入不得在 [`REPL`][] 中使用。使用此
错误的条件在 [`REPL`][] 文档中描述。

<a id="ERR_INVALID_RETURN_PROPERTY"></a>

### `ERR_INVALID_RETURN_PROPERTY`

当函数选项在执行时未为其返回对象属性之一提供有效值时抛出。

<a id="ERR_INVALID_RETURN_PROPERTY_VALUE"></a>

### `ERR_INVALID_RETURN_PROPERTY_VALUE`

当函数选项在执行时未为其返回对象属性之一提供预期值
类型时抛出。

<a id="ERR_INVALID_RETURN_VALUE"></a>

### `ERR_INVALID_RETURN_VALUE`

当函数选项在执行时未返回预期值
类型时抛出，例如当函数期望返回 promise 时。

<a id="ERR_INVALID_STATE"></a>

### `ERR_INVALID_STATE`

<!-- YAML
added: v15.0.0
-->

表示由于无效状态无法完成操作。
例如，对象可能已被销毁，或可能正在
执行另一个操作。

<a id="ERR_INVALID_SYNC_FORK_INPUT"></a>

### `ERR_INVALID_SYNC_FORK_INPUT`

将 `Buffer`、`TypedArray`、`DataView` 或 `string` 作为 stdio 输入提供给
异步分叉。有关更多信息，请参阅 [`child_process`][] 模块的文档。

<a id="ERR_INVALID_THIS"></a>

### `ERR_INVALID_THIS`

使用不兼容的 `this` 值调用 Node.js API 函数。

```js
const urlSearchParams = new URLSearchParams('foo=bar&baz=new');

const buf = Buffer.alloc(1);
urlSearchParams.has.call(buf, 'foo');
// 抛出代码为 'ERR_INVALID_THIS' 的 TypeError
```

<a id="ERR_INVALID_TUPLE"></a>

### `ERR_INVALID_TUPLE`

提供给 [WHATWG][WHATWG URL API]
[`URLSearchParams` 构造函数][`new URLSearchParams(iterable)`] 的 `iterable` 中的元素不
表示 `[name, value]` 元组——即，如果元素不可迭代，或
不由正好两个元素组成。

<a id="ERR_INVALID_TYPESCRIPT_SYNTAX"></a>

### `ERR_INVALID_TYPESCRIPT_SYNTAX`

<!-- YAML
added:
 - v23.0.0
 - v22.10.0
changes:
    - version:
      - v23.7.0
      - v22.14.0
      pr-url: https://github.com/nodejs/node/pull/56610
      description: This error is no longer thrown on valid yet unsupported syntax.
-->

提供的 TypeScript 语法无效。

<a id="ERR_INVALID_URI"></a>

### `ERR_INVALID_URI`

传递了无效的 URI。

<a id="ERR_INVALID_URL"></a>

### `ERR_INVALID_URL`

将无效的 URL 传递给 [WHATWG][WHATWG URL API] [`URL`
构造函数][`new URL(input)`] 或遗留的 [`url.parse()`][] 进行解析。
抛出的错误对象通常具有附加属性 `'input'`，其中
包含解析失败的 URL。

<a id="ERR_INVALID_URL_PATTERN"></a>

### `ERR_INVALID_URL_PATTERN`

将无效的 URLPattern 传递给 [WHATWG][WHATWG URL API]
[`URLPattern` 构造函数][`new URLPattern(input)`] 进行解析。

<a id="ERR_INVALID_URL_SCHEME"></a>

### `ERR_INVALID_URL_SCHEME`

试图使用不兼容方案（协议）的 URL 用于
特定目的。它仅用于 [`fs`][] 模块中的 [WHATWG URL API][] 支持（仅接受具有 `'file'` 方案的 URL），但将来也可能用于
其他 Node.js API。

<a id="ERR_IPC_CHANNEL_CLOSED"></a>

### `ERR_IPC_CHANNEL_CLOSED`

试图使用已关闭的 IPC 通信通道。

<a id="ERR_IPC_DISCONNECTED"></a>

### `ERR_IPC_DISCONNECTED`

试图断开已断开的 IPC 通信通道。有关更多信息，请参阅 [`child_process`][] 模块的文档。

<a id="ERR_IPC_ONE_PIPE"></a>

### `ERR_IPC_ONE_PIPE`

试图使用多个 IPC
通信通道创建子 Node.js 进程。有关更多信息，请参阅 [`child_process`][] 模块的文档。

<a id="ERR_IPC_SYNC_FORK"></a>

### `ERR_IPC_SYNC_FORK`

试图与同步分叉的 Node.js 进程打开 IPC 通信通道。有关更多信息，请参阅 [`child_process`][] 模块的文档。

<a id="ERR_IP_BLOCKED"></a>

### `ERR_IP_BLOCKED`

IP 被 `net.BlockList` 阻止。

<a id="ERR_LOADER_CHAIN_INCOMPLETE"></a>

### `ERR_LOADER_CHAIN_INCOMPLETE`

<!-- YAML
added:
  - v18.6.0
  - v16.17.0
-->

ESM 加载器钩子返回时未调用 `next()` 且未显式
信号短路。

<a id="ERR_LOAD_SQLITE_EXTENSION"></a>

### `ERR_LOAD_SQLITE_EXTENSION`

<!-- YAML
added:
  - v23.5.0
  - v22.13.0
-->

加载 SQLite 扩展时发生错误。

<a id="ERR_MEMORY_ALLOCATION_FAILED"></a>

### `ERR_MEMORY_ALLOCATION_FAILED`

试图分配内存（通常在 C++ 层）但
失败。

<a id="ERR_MESSAGE_TARGET_CONTEXT_UNAVAILABLE"></a>

### `ERR_MESSAGE_TARGET_CONTEXT_UNAVAILABLE`

<!-- YAML
added:
  - v14.5.0
  - v12.19.0
-->

发布到 [`MessagePort`][] 的消息无法在目标
[vm][] `Context` 中反序列化。此时并非所有 Node.js 对象都可以成功实例化在任何上下文中，尝试使用 `postMessage()` 传输它们
在这种情况下可能在接收端失败。

<a id="ERR_METHOD_NOT_IMPLEMENTED"></a>

### `ERR_METHOD_NOT_IMPLEMENTED`

需要但未实现方法。

<a id="ERR_MISSING_ARGS"></a>

### `ERR_MISSING_ARGS`

未传递 Node.js API 的必需参数。这仅用于
严格符合 API 规范（某些情况下可能接受
`func(undefined)` 但不接受 `func()`）。在大多数原生 Node.js API 中，
`func(undefined)` 和 `func()` 被视为相同，并且可以使用
[`ERR_INVALID_ARG_TYPE`][] 错误代码。

<a id="ERR_MISSING_OPTION"></a>

### `ERR_MISSING_OPTION`

对于接受选项对象的 API，某些选项可能是必需的。如果缺少必需选项，则抛出此代码。

<a id="ERR_MISSING_PASSPHRASE"></a>

### `ERR_MISSING_PASSPHRASE`

试图读取加密密钥而未指定密码短语。

<a id="ERR_MISSING_PLATFORM_FOR_WORKER"></a>

### `ERR_MISSING_PLATFORM_FOR_WORKER`

此 Node.js 实例使用的 V8 平台不支持创建
Worker。这是由于缺乏对 Worker 的嵌入者支持。特别是，
此错误不会在 Node.js 的标准构建中发生。

<a id="ERR_MODULE_LINK_MISMATCH"></a>

### `ERR_MODULE_LINK_MISMATCH`

无法链接模块，因为其中的相同模块请求未
解析为同一模块。

<a id="ERR_MODULE_NOT_FOUND"></a>

### `ERR_MODULE_NOT_FOUND`

ECMAScript 模块加载器在尝试 `import` 操作或加载程序入口点时无法解析模块文件。

<a id="ERR_MULTIPLE_CALLBACK"></a>

### `ERR_MULTIPLE_CALLBACK`

回调被调用多次。

回调几乎总是只 meant 被调用一次，因为查询
可以满足或拒绝，但不能同时两者。后者
可以通过多次调用回调来实现。

<a id="ERR_NAPI_CONS_FUNCTION"></a>

### `ERR_NAPI_CONS_FUNCTION`

使用 `Node-API` 时，传递的构造函数不是函数。

<a id="ERR_NAPI_INVALID_DATAVIEW_ARGS"></a>

### `ERR_NAPI_INVALID_DATAVIEW_ARGS`

调用 `napi_create_dataview()` 时，给定的 `offset` 超出了 DataView 的范围，或者 `offset + length` 大于给定 `buffer` 的长度。

<a id="ERR_NAPI_INVALID_TYPEDARRAY_ALIGNMENT"></a>

### `ERR_NAPI_INVALID_TYPEDARRAY_ALIGNMENT`

调用 `napi_create_typedarray()` 时，提供的 `offset` 不是元素大小的倍数。

<a id="ERR_NAPI_INVALID_TYPEDARRAY_LENGTH"></a>

### `ERR_NAPI_INVALID_TYPEDARRAY_LENGTH`

调用 `napi_create_typedarray()` 时，`(length * size_of_element) + byte_offset` 大于给定 `buffer` 的长度。

<a id="ERR_NAPI_TSFN_CALL_JS"></a>

### `ERR_NAPI_TSFN_CALL_JS`

调用线程安全函数的 JavaScript 部分时发生错误。

<a id="ERR_NAPI_TSFN_GET_UNDEFINED"></a>

### `ERR_NAPI_TSFN_GET_UNDEFINED`

尝试检索 JavaScript `undefined` 值时发生错误。

<a id="ERR_NON_CONTEXT_AWARE_DISABLED"></a>

### `ERR_NON_CONTEXT_AWARE_DISABLED`

在不允许非上下文感知原生加载项的进程中加载了此类加载项。

<a id="ERR_NOT_BUILDING_SNAPSHOT"></a>

### `ERR_NOT_BUILDING_SNAPSHOT`

尽管 Node.js 没有构建 V8 启动快照，但尝试使用仅在构建 V8 启动快照时才能使用的操作。

<a id="ERR_NOT_IN_SINGLE_EXECUTABLE_APPLICATION"></a>

### `ERR_NOT_IN_SINGLE_EXECUTABLE_APPLICATION`

<!-- YAML
added:
  - v21.7.0
  - v20.12.0
-->

当不在单可执行应用程序中时，无法执行该操作。

<a id="ERR_NOT_SUPPORTED_IN_SNAPSHOT"></a>

### `ERR_NOT_SUPPORTED_IN_SNAPSHOT`

尝试执行在构建启动快照时不支持的操作。

<a id="ERR_NO_CRYPTO"></a>

### `ERR_NO_CRYPTO`

尝试使用加密功能，但 Node.js 编译时未包含 OpenSSL 加密支持。

<a id="ERR_NO_ICU"></a>

### `ERR_NO_ICU`

尝试使用需要 [ICU][] 的功能，但 Node.js 编译时未包含 ICU 支持。

<a id="ERR_NO_TYPESCRIPT"></a>

### `ERR_NO_TYPESCRIPT`

<!-- YAML
added:
  - v23.0.0
  - v22.12.0
-->

尝试使用需要 [原生 TypeScript 支持][] 的功能，但 Node.js 编译时未包含 TypeScript 支持。

<a id="ERR_OPERATION_FAILED"></a>

### `ERR_OPERATION_FAILED`

<!-- YAML
added: v15.0.0
-->

操作失败。这通常用于表示异步操作的一般性失败。

<a id="ERR_OPTIONS_BEFORE_BOOTSTRAPPING"></a>

### `ERR_OPTIONS_BEFORE_BOOTSTRAPPING`

<!-- YAML
added:
 - v23.10.0
 - v22.16.0
-->

尝试在引导完成之前获取选项。

<a id="ERR_OUT_OF_RANGE"></a>

### `ERR_OUT_OF_RANGE`

给定值超出接受范围。

<a id="ERR_PACKAGE_IMPORT_NOT_DEFINED"></a>

### `ERR_PACKAGE_IMPORT_NOT_DEFINED`

`package.json` [`"imports"`][] 字段未定义给定的内部包说明符映射。

<a id="ERR_PACKAGE_PATH_NOT_EXPORTED"></a>

### `ERR_PACKAGE_PATH_NOT_EXPORTED`

`package.json` [`"exports"`][] 字段未导出请求的子路径。由于导出是封装的，除非使用绝对 URL，否则无法通过包解析导入未导出的私有内部模块。

<a id="ERR_PARSE_ARGS_INVALID_OPTION_VALUE"></a>

### `ERR_PARSE_ARGS_INVALID_OPTION_VALUE`

<!-- YAML
added:
  - v18.3.0
  - v16.17.0
-->

当 `strict` 设置为 `true` 时，如果为 {string} 类型的选项提供 {boolean} 值，或者为 {boolean} 类型的选项提供 {string} 值，[`util.parseArgs()`][] 将抛出此错误。

<a id="ERR_PARSE_ARGS_UNEXPECTED_POSITIONAL"></a>

### `ERR_PARSE_ARGS_UNEXPECTED_POSITIONAL`

<!-- YAML
added:
  - v18.3.0
  - v16.17.0
-->

当提供位置参数且 `allowPositionals` 设置为 `false` 时，[`util.parseArgs()`][] 将抛出此错误。

<a id="ERR_PARSE_ARGS_UNKNOWN_OPTION"></a>

### `ERR_PARSE_ARGS_UNKNOWN_OPTION`

<!-- YAML
added:
  - v18.3.0
  - v16.17.0
-->

当 `strict` 设置为 `true` 时，如果参数未在 `options` 中配置，[`util.parseArgs()`][] 将抛出此错误。

<a id="ERR_PERFORMANCE_INVALID_TIMESTAMP"></a>

### `ERR_PERFORMANCE_INVALID_TIMESTAMP`

为性能标记或测量提供了无效的时间戳值。

<a id="ERR_PERFORMANCE_MEASURE_INVALID_OPTIONS"></a>

### `ERR_PERFORMANCE_MEASURE_INVALID_OPTIONS`

为性能测量提供了无效的选项。

<a id="ERR_PROTO_ACCESS"></a>

### `ERR_PROTO_ACCESS`

使用 [`--disable-proto=throw`][] 禁止访问 `Object.prototype.__proto__`。应使用 [`Object.getPrototypeOf`][] 和 [`Object.setPrototypeOf`][] 来获取和设置对象的原型。

<a id="ERR_PROXY_INVALID_CONFIG"></a>

### `ERR_PROXY_INVALID_CONFIG`

由于代理配置无效，代理请求失败。

<a id="ERR_PROXY_TUNNEL"></a>

### `ERR_PROXY_TUNNEL`

当启用 `NODE_USE_ENV_PROXY` 或 `--use-env-proxy` 时，建立代理隧道失败。

<a id="ERR_QUIC_APPLICATION_ERROR"></a>

### `ERR_QUIC_APPLICATION_ERROR`

<!-- YAML
added:
  - v23.4.0
  - v22.13.0
-->

> 稳定性：1 - 实验性

发生 QUIC 应用程序错误。

<a id="ERR_QUIC_CONNECTION_FAILED"></a>

### `ERR_QUIC_CONNECTION_FAILED`

<!-- YAML
added:
 - v23.0.0
 - v22.10.0
-->

> 稳定性：1 - 实验性

建立 QUIC 连接失败。

<a id="ERR_QUIC_ENDPOINT_CLOSED"></a>

### `ERR_QUIC_ENDPOINT_CLOSED`

<!-- YAML
added:
 - v23.0.0
 - v22.10.0
-->

> 稳定性：1 - 实验性

QUIC 端点因错误关闭。

<a id="ERR_QUIC_OPEN_STREAM_FAILED"></a>

### `ERR_QUIC_OPEN_STREAM_FAILED`

<!-- YAML
added:
 - v23.0.0
 - v22.10.0
-->

> 稳定性：1 - 实验性

打开 QUIC 流失败。

<a id="ERR_QUIC_TRANSPORT_ERROR"></a>

### `ERR_QUIC_TRANSPORT_ERROR`

<!-- YAML
added:
  - v23.4.0
  - v22.13.0
-->

> 稳定性：1 - 实验性

发生 QUIC 传输错误。

<a id="ERR_QUIC_VERSION_NEGOTIATION_ERROR"></a>

### `ERR_QUIC_VERSION_NEGOTIATION_ERROR`

<!-- YAML
added:
  - v23.4.0
  - v22.13.0
-->

> 稳定性：1 - 实验性

QUIC 会话失败，因为需要进行版本协商。

<a id="ERR_REQUIRE_ASYNC_MODULE"></a>

### `ERR_REQUIRE_ASYNC_MODULE`

尝试 `require()` [ES 模块][] 时，该模块结果是异步的。即，它包含顶层 await。要查看顶层 await 的位置，请使用 `--experimental-print-required-tla`（这将在查找顶层 await 之前执行模块）。

<a id="ERR_REQUIRE_CYCLE_MODULE"></a>

### `ERR_REQUIRE_CYCLE_MODULE`

尝试 `require()` [ES 模块][] 时，CommonJS 到 ESM 或 ESM 到 CommonJS 的边参与了直接循环。这是不允许的，因为 ES 模块在已经求值时无法再次求值。要避免循环，涉及循环的 `require()` 调用不应发生在 ES 模块（通过 `createRequire()`）或 CommonJS 模块的顶层，而应在内部函数中延迟进行。

<a id="ERR_REQUIRE_ESM"></a>

### `ERR_REQUIRE_ESM`

<!-- YAML
changes:
  - version:
    - v23.0.0
    - v22.12.0
    - v20.19.0
    pr-url: https://github.com/nodejs/node/pull/55085
    description: require() 现在默认支持加载同步 ES 模块。
-->

> 稳定性：0 - 已弃用

尝试 `require()` [ES 模块][]。此错误已弃用，因为 `require()` 现在支持加载同步 ES 模块。当 `require()` 遇到包含顶层 `await` 的 ES 模块时，将改为抛出 [`ERR_REQUIRE_ASYNC_MODULE`][]。

<a id="ERR_SCRIPT_EXECUTION_INTERRUPTED"></a>

### `ERR_SCRIPT_EXECUTION_INTERRUPTED`

脚本执行被 `SIGINT` 中断（例如，按下了 <kbd>Ctrl</kbd>+<kbd>C</kbd>。）

<a id="ERR_SCRIPT_EXECUTION_TIMEOUT"></a>

### `ERR_SCRIPT_EXECUTION_TIMEOUT`

脚本执行超时，可能是由于正在执行的脚本中存在错误。

<a id="ERR_SERVER_ALREADY_LISTEN"></a>

### `ERR_SERVER_ALREADY_LISTEN`

当 `net.Server` 已经在监听时调用了 [`server.listen()`][] 方法。这适用于所有 `net.Server` 实例，包括 HTTP、HTTPS 和 HTTP/2 `Server` 实例。

<a id="ERR_SERVER_NOT_RUNNING"></a>

### `ERR_SERVER_NOT_RUNNING`

当 `net.Server` 未运行时调用了 [`server.close()`][] 方法。这适用于所有 `net.Server` 实例，包括 HTTP、HTTPS 和 HTTP/2 `Server` 实例。

<a id="ERR_SINGLE_EXECUTABLE_APPLICATION_ASSET_NOT_FOUND"></a>

### `ERR_SINGLE_EXECUTABLE_APPLICATION_ASSET_NOT_FOUND`

<!-- YAML
added:
  - v21.7.0
  - v20.12.0
-->

将键传递给单可执行应用程序 API 以标识资产，但找不到匹配项。

<a id="ERR_SOCKET_ALREADY_BOUND"></a>

### `ERR_SOCKET_ALREADY_BOUND`

尝试绑定已绑定的套接字。

<a id="ERR_SOCKET_BAD_BUFFER_SIZE"></a>

### `ERR_SOCKET_BAD_BUFFER_SIZE`

为 [`dgram.createSocket()`][] 中的 `recvBufferSize` 或 `sendBufferSize` 选项传递了无效（负）大小。

<a id="ERR_SOCKET_BAD_PORT"></a>

### `ERR_SOCKET_BAD_PORT`

期望端口 >= 0 且 < 65536 的 API 函数收到了无效值。

<a id="ERR_SOCKET_BAD_TYPE"></a>

### `ERR_SOCKET_BAD_TYPE`

期望套接字类型（`udp4` 或 `udp6`）的 API 函数收到了无效值。

<a id="ERR_SOCKET_BUFFER_SIZE"></a>

### `ERR_SOCKET_BUFFER_SIZE`

使用 [`dgram.createSocket()`][] 时，无法确定接收或发送 `Buffer` 的大小。

<a id="ERR_SOCKET_CLOSED"></a>

### `ERR_SOCKET_CLOSED`

尝试操作已关闭的套接字。

<a id="ERR_SOCKET_CLOSED_BEFORE_CONNECTION"></a>

### `ERR_SOCKET_CLOSED_BEFORE_CONNECTION`

在连接套接字上调用 [`net.Socket.write()`][] 时，套接字在连接建立之前关闭。

<a id="ERR_SOCKET_CONNECTION_TIMEOUT"></a>

### `ERR_SOCKET_CONNECTION_TIMEOUT`

使用家族自动选择算法时，套接字无法在允许的超时时间内连接到 DNS 返回的任何地址。

<a id="ERR_SOCKET_DGRAM_IS_CONNECTED"></a>

### `ERR_SOCKET_DGRAM_IS_CONNECTED`

在已连接的套接字上调用了 [`dgram.connect()`][]。

<a id="ERR_SOCKET_DGRAM_NOT_CONNECTED"></a>

### `ERR_SOCKET_DGRAM_NOT_CONNECTED`

在未连接的套接字上调用了 [`dgram.disconnect()`][] 或 [`dgram.remoteAddress()`][]。

<a id="ERR_SOCKET_DGRAM_NOT_RUNNING"></a>

### `ERR_SOCKET_DGRAM_NOT_RUNNING`

进行了调用，但 UDP 子系统未运行。

<a id="ERR_SOURCE_MAP_CORRUPT"></a>

### `ERR_SOURCE_MAP_CORRUPT`

无法解析源映射，因为它不存在或已损坏。

<a id="ERR_SOURCE_MAP_MISSING_SOURCE"></a>

### `ERR_SOURCE_MAP_MISSING_SOURCE`

未找到从源映射导入的文件。

<a id="ERR_SOURCE_PHASE_NOT_DEFINED"></a>

### `ERR_SOURCE_PHASE_NOT_DEFINED`

<!-- YAML
added: v24.0.0
-->

提供的模块导入未为源阶段导入语法 `import source x from 'x'` 或 `import.source(x)` 提供源阶段导入表示。

<a id="ERR_SQLITE_ERROR"></a>

### `ERR_SQLITE_ERROR`

<!-- YAML
added: v22.5.0
-->

从 [SQLite][] 返回了错误。

<a id="ERR_SRI_PARSE"></a>

### `ERR_SRI_PARSE`

为子资源完整性检查提供了字符串，但无法解析。通过查看 [子资源完整性规范][] 检查完整性属性的格式。

<a id="ERR_STREAM_ALREADY_FINISHED"></a>

### `ERR_STREAM_ALREADY_FINISHED`

调用了流方法，但由于流已完成，无法完成。

<a id="ERR_STREAM_CANNOT_PIPE"></a>

### `ERR_STREAM_CANNOT_PIPE`

尝试在 [`Writable`][] 流上调用 [`stream.pipe()`][]。

<a id="ERR_STREAM_DESTROYED"></a>

### `ERR_STREAM_DESTROYED`

调用了流方法，但由于流已使用 `stream.destroy()` 销毁，无法完成。

<a id="ERR_STREAM_NULL_VALUES"></a>

### `ERR_STREAM_NULL_VALUES`

尝试使用 `null` 块调用 [`stream.write()`][]。

<a id="ERR_STREAM_PREMATURE_CLOSE"></a>

### `ERR_STREAM_PREMATURE_CLOSE`

当流或管道在没有明确错误的情况下非正常结束时，`stream.finished()` 和 `stream.pipeline()` 返回的错误。

<a id="ERR_STREAM_PUSH_AFTER_EOF"></a>

### `ERR_STREAM_PUSH_AFTER_EOF`

尝试在将 `null`(EOF) 推送到流之后调用 [`stream.push()`][]。

<a id="ERR_STREAM_UNABLE_TO_PIPE"></a>

### `ERR_STREAM_UNABLE_TO_PIPE`

尝试在管道中管道传输到已关闭或销毁的流。

<a id="ERR_STREAM_UNSHIFT_AFTER_END_EVENT"></a>

### `ERR_STREAM_UNSHIFT_AFTER_END_EVENT`

尝试在发出 `'end'` 事件后调用 [`stream.unshift()`][]。

<a id="ERR_STREAM_WRAP"></a>

### `ERR_STREAM_WRAP`

如果在 Socket 上设置了字符串解码器或解码器处于 `objectMode`，则防止中止。

```js
const Socket = require('node:net').Socket;
const instance = new Socket();

instance.setEncoding('utf8');
```

<a id="ERR_STREAM_WRITE_AFTER_END"></a>

### `ERR_STREAM_WRITE_AFTER_END`

尝试在调用 `stream.end()` 之后调用 [`stream.write()`][]。

<a id="ERR_STRING_TOO_LONG"></a>

### `ERR_STRING_TOO_LONG`

尝试创建超过最大允许长度的字符串。

<a id="ERR_SYNTHETIC"></a>

### `ERR_SYNTHETIC`

用于捕获诊断报告调用堆栈的人工错误对象。

<a id="ERR_SYSTEM_ERROR"></a>

### `ERR_SYSTEM_ERROR`

Node.js 进程中发生了未指定或非特定的系统错误。错误对象将具有一个 `err.info` 对象属性，包含附加详细信息。

<a id="ERR_TEST_FAILURE"></a>

### `ERR_TEST_FAILURE`

此错误表示测试失败。有关失败的附加信息可通过 `cause` 属性获得。`failureType` 属性指定失败发生时测试正在执行的操作。

<a id="ERR_TLS_ALPN_CALLBACK_INVALID_RESULT"></a>

### `ERR_TLS_ALPN_CALLBACK_INVALID_RESULT`

当 `ALPNCallback` 返回的值不在客户端提供的 ALPN 协议列表中时，会抛出此错误。

<a id="ERR_TLS_ALPN_CALLBACK_WITH_PROTOCOLS"></a>

### `ERR_TLS_ALPN_CALLBACK_WITH_PROTOCOLS`

如果在创建 `TLSServer` 时 TLS 选项同时包含 `ALPNProtocols` 和 `ALPNCallback`，则会抛出此错误。这些选项是互斥的。

<a id="ERR_TLS_CERT_ALTNAME_FORMAT"></a>

### `ERR_TLS_CERT_ALTNAME_FORMAT`

如果用户提供的 `subjectaltname` 属性违反编码规则，`checkServerIdentity` 会抛出此错误。Node.js 本身生成的证书对象始终符合编码规则，永远不会导致此错误。

<a id="ERR_TLS_CERT_ALTNAME_INVALID"></a>

### `ERR_TLS_CERT_ALTNAME_INVALID`

使用 TLS 时，对等方的主机名/IP 与其证书中的任何 `subjectAltNames` 都不匹配。

<a id="ERR_TLS_DH_PARAM_SIZE"></a>

### `ERR_TLS_DH_PARAM_SIZE`

使用 TLS 时，为 Diffie-Hellman (`DH`) 密钥协商协议提供的参数太小。默认情况下，密钥长度必须大于或等于 1024 位以避免漏洞，尽管强烈建议使用 2048 位或更大以获得更强的安全性。

<a id="ERR_TLS_HANDSHAKE_TIMEOUT"></a>

### `ERR_TLS_HANDSHAKE_TIMEOUT`

TLS/SSL 握手超时。在这种情况下，服务器也必须中止连接。

<a id="ERR_TLS_INVALID_CONTEXT"></a>

### `ERR_TLS_INVALID_CONTEXT`

<!-- YAML
added: v13.3.0
-->

上下文必须是 `SecureContext`。

<a id="ERR_TLS_INVALID_PROTOCOL_METHOD"></a>

### `ERR_TLS_INVALID_PROTOCOL_METHOD`

指定的 `secureProtocol` 方法无效。它要么未知，要么因不安全而被禁用。

<a id="ERR_TLS_INVALID_PROTOCOL_VERSION"></a>

### `ERR_TLS_INVALID_PROTOCOL_VERSION`

有效的 TLS 协议版本是 `'TLSv1'`、`'TLSv1.1'` 或 `'TLSv1.2'`。

<a id="ERR_TLS_INVALID_STATE"></a>

### `ERR_TLS_INVALID_STATE`

<!-- YAML
added:
 - v13.10.0
 - v12.17.0
-->

TLS 套接字必须已连接并安全建立。确保在继续之前发出 'secure' 事件。

<a id="ERR_TLS_PROTOCOL_VERSION_CONFLICT"></a>

### `ERR_TLS_PROTOCOL_VERSION_CONFLICT`

尝试设置 TLS 协议 `minVersion` 或 `maxVersion` 与尝试显式设置 `secureProtocol` 冲突。使用一种机制或另一种。

<a id="ERR_TLS_PSK_SET_IDENTITY_HINT_FAILED"></a>

### `ERR_TLS_PSK_SET_IDENTITY_HINT_FAILED`

设置 PSK 身份提示失败。提示可能太长。

<a id="ERR_TLS_RENEGOTIATION_DISABLED"></a>

### `ERR_TLS_RENEGOTIATION_DISABLED`

尝试在禁用了重新协商的套接字实例上重新协商 TLS。

<a id="ERR_TLS_REQUIRED_SERVER_NAME"></a>

### `ERR_TLS_REQUIRED_SERVER_NAME`

使用 TLS 时，调用 `server.addContext()` 方法时未在第一个参数中提供主机名。

<a id="ERR_TLS_SESSION_ATTACK"></a>

### `ERR_TLS_SESSION_ATTACK`

检测到过多的 TLS 重新协商，这是拒绝服务攻击的潜在载体。

<a id="ERR_TLS_SNI_FROM_SERVER"></a>

### `ERR_TLS_SNI_FROM_SERVER`

尝试从 TLS 服务器端套接字发出服务器名称指示，这仅对客户端有效。

<a id="ERR_TRACE_EVENTS_CATEGORY_REQUIRED"></a>

### `ERR_TRACE_EVENTS_CATEGORY_REQUIRED`

`trace_events.createTracing()` 方法需要至少一个跟踪事件类别。

<a id="ERR_TRACE_EVENTS_UNAVAILABLE"></a>

### `ERR_TRACE_EVENTS_UNAVAILABLE`

无法加载 `node:trace_events` 模块，因为 Node.js 是使用 `--without-v8-platform` 标志编译的。

<a id="ERR_TRAILING_JUNK_AFTER_STREAM_END"></a>

### `ERR_TRAILING_JUNK_AFTER_STREAM_END`

在压缩流结束后发现尾随垃圾数据。当在压缩流（例如，在 zlib 或 gzip 解压缩）结束后检测到额外的意外数据时，会抛出此错误。

<a id="ERR_TRANSFORM_ALREADY_TRANSFORMING"></a>

### `ERR_TRANSFORM_ALREADY_TRANSFORMING`

`Transform` 流在仍在转换时完成。

<a id="ERR_TRANSFORM_WITH_LENGTH_0"></a>

### `ERR_TRANSFORM_WITH_LENGTH_0`

`Transform` 完成时写缓冲区中仍有数据。

<a id="ERR_TTY_INIT_FAILED"></a>

### `ERR_TTY_INIT_FAILED`

由于系统错误，TTY 初始化失败。

<a id="ERR_UNAVAILABLE_DURING_EXIT"></a>

### `ERR_UNAVAILABLE_DURING_EXIT`

在 [`process.on('exit')`][] 处理程序中调用了不应在 [`process.on('exit')`][] 处理程序中调用的函数。

<a id="ERR_UNCAUGHT_EXCEPTION_CAPTURE_ALREADY_SET"></a>

### `ERR_UNCAUGHT_EXCEPTION_CAPTURE_ALREADY_SET`

[`process.setUncaughtExceptionCaptureCallback()`][] 被调用了两次，而没有先将回调重置为 `null`。

此错误旨在防止意外覆盖从另一个模块注册的回调。

<a id="ERR_UNESCAPED_CHARACTERS"></a>

### `ERR_UNESCAPED_CHARACTERS`

收到了包含未转义字符的字符串。

<a id="ERR_UNHANDLED_ERROR"></a>

### `ERR_UNHANDLED_ERROR`

发生了未处理的错误（例如，当 [`EventEmitter`][] 发出 `'error'` 事件但未注册 `'error'` 处理程序时）。

<a id="ERR_UNKNOWN_BUILTIN_MODULE"></a>

### `ERR_UNKNOWN_BUILTIN_MODULE`

用于识别特定类型的内部 Node.js 错误，通常不应由用户代码触发。此错误的实例指向 Node.js 二进制文件本身的内部错误。

<a id="ERR_UNKNOWN_CREDENTIAL"></a>

### `ERR_UNKNOWN_CREDENTIAL`

传递了不存在的 Unix 组或用户标识符。

<a id="ERR_UNKNOWN_ENCODING"></a>

### `ERR_UNKNOWN_ENCODING`

向 API 传递了无效或未知的编码选项。

<a id="ERR_UNKNOWN_FILE_EXTENSION"></a>

### `ERR_UNKNOWN_FILE_EXTENSION`

尝试加载具有未知或不支持文件扩展名的模块。

<a id="ERR_UNKNOWN_MODULE_FORMAT"></a>

### `ERR_UNKNOWN_MODULE_FORMAT`

尝试加载具有未知或不支持格式的模块。

<a id="ERR_UNKNOWN_SIGNAL"></a>

### `ERR_UNKNOWN_SIGNAL`

向期望有效信号的 API（例如 [`subprocess.kill()`][]）传递了无效或未知的进程信号。

<a id="ERR_UNSUPPORTED_DIR_IMPORT"></a>

### `ERR_UNSUPPORTED_DIR_IMPORT`

不支持 `import` 目录 URL。相反，在 [`package.json`][] 文件的 [`"exports"`][] 字段中 [使用包名称自引用包][] 并 [定义自定义子路径][]。

```mjs
import './'; // 不支持
import './index.js'; // 支持
import 'package-name'; // 支持
```

<a id="ERR_UNSUPPORTED_ESM_URL_SCHEME"></a>

### `ERR_UNSUPPORTED_ESM_URL_SCHEME`

不支持 `file` 和 `data` 以外的 URL 方案的 `import`。

<a id="ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING"></a>

### `ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING`

<!-- YAML
added: v22.6.0
-->

不支持 `node_modules` 目录后代的文件类型剥离。

<a id="ERR_UNSUPPORTED_RESOLVE_REQUEST"></a>

### `ERR_UNSUPPORTED_RESOLVE_REQUEST`

尝试解析无效的模块引用者。当从 URL 方案不是 `file` 的模块导入或调用 `import.meta.resolve()` 时，可能会发生这种情况：

* 不是内置模块的裸说明符。
* 来自 URL 方案不是 [特殊方案][] 的模块的 [相对 URL][]。

```mjs
try {
  // 尝试从 `data:` URL 模块导入包 'bare-specifier'：
  await import('data:text/javascript,import "bare-specifier"');
} catch (e) {
  console.log(e.code); // ERR_UNSUPPORTED_RESOLVE_REQUEST
}
```

<a id="ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX"></a>

### `ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX`

<!-- YAML
added:
  - v23.7.0
  - v22.14.0
-->

提供的 TypeScript 语法不受支持。当使用需要 [类型剥离][] 转换的 TypeScript 语法时，可能会发生这种情况。

<a id="ERR_USE_AFTER_CLOSE"></a>

### `ERR_USE_AFTER_CLOSE`

尝试使用已关闭的内容。

<a id="ERR_VALID_PERFORMANCE_ENTRY_TYPE"></a>

### `ERR_VALID_PERFORMANCE_ENTRY_TYPE`

使用性能计时 API (`perf_hooks`) 时，未找到有效的性能条目类型。

<a id="ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING"></a>

### `ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING`

未指定动态导入回调。

<a id="ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING_FLAG"></a>

### `ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING_FLAG`

在没有 `--experimental-vm-modules` 的情况下调用了动态导入回调。

<a id="ERR_VM_MODULE_ALREADY_LINKED"></a>

### `ERR_VM_MODULE_ALREADY_LINKED`

尝试链接的模块不符合链接条件，原因如下：

* 它已经链接（`linkingStatus` 为 `'linked'`）
* 它正在链接（`linkingStatus` 为 `'linking'`）
* 此模块链接失败（`linkingStatus` 为 `'errored'`）

<a id="ERR_VM_MODULE_CACHED_DATA_REJECTED"></a>

### `ERR_VM_MODULE_CACHED_DATA_REJECTED`

传递给模块构造函数的 `cachedData` 选项无效。

<a id="ERR_VM_MODULE_CANNOT_CREATE_CACHED_DATA"></a>

### `ERR_VM_MODULE_CANNOT_CREATE_CACHED_DATA`

无法为已评估的模块创建缓存数据。

<a id="ERR_VM_MODULE_DIFFERENT_CONTEXT"></a>

### `ERR_VM_MODULE_DIFFERENT_CONTEXT`

从链接器函数返回的模块来自与父模块不同的上下文。链接的模块必须共享相同的上下文。

<a id="ERR_VM_MODULE_LINK_FAILURE"></a>

### `ERR_VM_MODULE_LINK_FAILURE`

由于失败，模块无法链接。

<a id="ERR_VM_MODULE_NOT_MODULE"></a>

### `ERR_VM_MODULE_NOT_MODULE`

链接承诺的履行值不是 `vm.Module` 对象。

<a id="ERR_VM_MODULE_STATUS"></a>

### `ERR_VM_MODULE_STATUS`

当前模块的状态不允许此操作。错误的具体含义取决于具体函数。

<a id="ERR_WASI_ALREADY_STARTED"></a>

### `ERR_WASI_ALREADY_STARTED`

WASI 实例已经启动。

<a id="ERR_WASI_NOT_STARTED"></a>

### `ERR_WASI_NOT_STARTED`

WASI 实例尚未启动。

<a id="ERR_WEBASSEMBLY_NOT_SUPPORTED"></a>

### `ERR_WEBASSEMBLY_NOT_SUPPORTED`

使用了需要 WebAssembly 的功能，但当前环境中不支持或已禁用 WebAssembly（例如，使用 `--jitless` 运行时）。

<a id="ERR_WEBASSEMBLY_RESPONSE"></a>

### `ERR_WEBASSEMBLY_RESPONSE`

<!-- YAML
added: v18.1.0
-->

传递给 `WebAssembly.compileStreaming` 或 `WebAssembly.instantiateStreaming` 的 `Response` 不是有效的 WebAssembly 响应。

<a id="ERR_WORKER_INIT_FAILED"></a>

### `ERR_WORKER_INIT_FAILED`

`Worker` 初始化失败。

<a id="ERR_WORKER_INVALID_EXEC_ARGV"></a>

### `ERR_WORKER_INVALID_EXEC_ARGV`

传递给 `Worker` 构造函数的 `execArgv` 选项包含无效标志。

<a id="ERR_WORKER_MESSAGING_ERRORED"></a>

### `ERR_WORKER_MESSAGING_ERRORED`

<!-- YAML
added: v22.5.0
-->

> 稳定性：1.1 - 积极开发中

目标线程在处理通过 [`postMessageToThread()`][] 发送的消息时抛出错误。

<a id="ERR_WORKER_MESSAGING_FAILED"></a>

### `ERR_WORKER_MESSAGING_FAILED`

<!-- YAML
added: v22.5.0
-->

> 稳定性：1.1 - 积极开发中

[`postMessageToThread()`][] 中请求的线程无效或没有 `workerMessage` 监听器。

<a id="ERR_WORKER_MESSAGING_SAME_THREAD"></a>

### `ERR_WORKER_MESSAGING_SAME_THREAD`

<!-- YAML
added: v22.5.0
-->

> 稳定性：1.1 - 积极开发中

[`postMessageToThread()`][] 中请求的线程 ID 是当前线程 ID。

<a id="ERR_WORKER_MESSAGING_TIMEOUT"></a>

### `ERR_WORKER_MESSAGING_TIMEOUT`

<!-- YAML
added: v22.5.0
-->

> 稳定性：1.1 - 积极开发中

通过 [`postMessageToThread()`][] 发送消息超时。

<a id="ERR_WORKER_NOT_RUNNING"></a>

### `ERR_WORKER_NOT_RUNNING`

操作失败，因为 `Worker` 实例当前未运行。

<a id="ERR_WORKER_OUT_OF_MEMORY"></a>

### `ERR_WORKER_OUT_OF_MEMORY`

`Worker` 实例因达到内存限制而终止。

<a id="ERR_WORKER_PATH"></a>

### `ERR_WORKER_PATH`

Worker 主脚本的路径既不是绝对路径，也不是以 `./` 或 `../` 开头的相对路径。

<a id="ERR_WORKER_UNSERIALIZABLE_ERROR"></a>

### `ERR_WORKER_UNSERIALIZABLE_ERROR`

所有尝试序列化来自 worker 线程的未捕获异常的操作均失败。

<a id="ERR_WORKER_UNSUPPORTED_OPERATION"></a>

### `ERR_WORKER_UNSUPPORTED_OPERATION`

Worker 线程中不支持请求的功能。

<a id="ERR_ZLIB_INITIALIZATION_FAILED"></a>

### `ERR_ZLIB_INITIALIZATION_FAILED`

由于配置不正确，创建 [`zlib`][] 对象失败。

<a id="ERR_ZSTD_INVALID_PARAM"></a>

### `ERR_ZSTD_INVALID_PARAM`

在构建 Zstd 流期间传递了无效的参数键。

<a id="HPE_CHUNK_EXTENSIONS_OVERFLOW"></a>

### `HPE_CHUNK_EXTENSIONS_OVERFLOW`

<!-- YAML
added:
 - v21.6.2
 - v20.11.1
 - v18.19.1
-->

接收到的块扩展数据过多。为了防止恶意或配置错误的客户端，如果接收到超过 16 KiB 的数据，将发出带有此代码的 `Error`。

<a id="HPE_HEADER_OVERFLOW"></a>

### `HPE_HEADER_OVERFLOW`

<!-- YAML
changes:
  - version:
     - v11.4.0
     - v10.15.0
    commit: 186035243fad247e3955f
    pr-url: https://github.com/nodejs-private/node-private/pull/143
    description: `http_parser` 中的最大头大小设置为 8 KiB。
-->

接收到的 HTTP 头数据过多。为了防止恶意或配置错误的客户端，如果接收到超过 `maxHeaderSize` 的 HTTP 头数据，则 HTTP 解析将中止，不会创建请求或响应对象，并将发出带有此代码的 `Error`。

<a id="HPE_UNEXPECTED_CONTENT_LENGTH"></a>

### `HPE_UNEXPECTED_CONTENT_LENGTH`

服务器同时发送 `Content-Length` 头和 `Transfer-Encoding: chunked`。

`Transfer-Encoding: chunked` 允许服务器为动态生成的内容维护 HTTP 持久连接。在这种情况下，不能使用 `Content-Length` HTTP 头。

使用 `Content-Length` 或 `Transfer-Encoding: chunked`。

<a id="MODULE_NOT_FOUND"></a>

### `MODULE_NOT_FOUND`

<!-- YAML
changes:
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/25690
    description: 添加了 `requireStack` 属性。
-->

CommonJS 模块加载器在尝试 [`require()`][] 操作或加载程序入口点时无法解析模块文件。

## 遗留的 Node.js 错误代码

> 稳定性：0 - 已弃用。这些错误代码要么不一致，要么已被移除。

<a id="ERR_CANNOT_TRANSFER_OBJECT"></a>

### `ERR_CANNOT_TRANSFER_OBJECT`

<!-- YAML
added: v10.5.0
removed: v12.5.0
-->

传递给 `postMessage()` 的值包含一个不支持传输的对象。

<a id="ERR_CPU_USAGE"></a>

### `ERR_CPU_USAGE`

<!-- YAML
removed: v15.0.0
-->

无法处理来自 `process.cpuUsage` 的原生调用。

<a id="ERR_CRYPTO_HASH_DIGEST_NO_UTF16"></a>

### `ERR_CRYPTO_HASH_DIGEST_NO_UTF16`

<!-- YAML
added: v9.0.0
removed: v12.12.0
-->

[`hash.digest()`][] 使用了 UTF-16 编码。虽然 `hash.digest()` 方法允许传入 `encoding` 参数，使方法返回字符串而不是 `Buffer`，但不支持 UTF-16 编码（例如 `ucs` 或 `utf16le`）。

<a id="ERR_CRYPTO_SCRYPT_INVALID_PARAMETER"></a>

### `ERR_CRYPTO_SCRYPT_INVALID_PARAMETER`

<!-- YAML
removed: v23.0.0
-->

传递给 [`crypto.scrypt()`][] 或 [`crypto.scryptSync()`][] 的选项组合不兼容。新版本的 Node.js 使用错误代码 [`ERR_INCOMPATIBLE_OPTION_PAIR`][] 代替，这与其他 API 一致。

<a id="ERR_FS_INVALID_SYMLINK_TYPE"></a>

### `ERR_FS_INVALID_SYMLINK_TYPE`

<!-- YAML
removed: v23.0.0
-->

传递给 [`fs.symlink()`][] 或 [`fs.symlinkSync()`][] 方法的符号链接类型无效。

<a id="ERR_HTTP2_FRAME_ERROR"></a>

### `ERR_HTTP2_FRAME_ERROR`

<!-- YAML
added: v9.0.0
removed: v10.0.0
-->

当在 HTTP/2 会话上发送单个帧发生失败时使用。

<a id="ERR_HTTP2_HEADERS_OBJECT"></a>

### `ERR_HTTP2_HEADERS_OBJECT`

<!-- YAML
added: v9.0.0
removed: v10.0.0
-->

当需要 HTTP/2 头部对象时使用。

<a id="ERR_HTTP2_HEADER_REQUIRED"></a>

### `ERR_HTTP2_HEADER_REQUIRED`

<!-- YAML
added: v9.0.0
removed: v10.0.0
-->

当 HTTP/2 消息中缺少必需的头部时使用。

<a id="ERR_HTTP2_INFO_HEADERS_AFTER_RESPOND"></a>

### `ERR_HTTP2_INFO_HEADERS_AFTER_RESPOND`

<!-- YAML
added: v9.0.0
removed: v10.0.0
-->

HTTP/2 信息性头部必须在调用 `Http2Stream.prototype.respond()` 方法_之前_发送。

<a id="ERR_HTTP2_STREAM_CLOSED"></a>

### `ERR_HTTP2_STREAM_CLOSED`

<!-- YAML
added: v9.0.0
removed: v10.0.0
-->

当对已关闭的 HTTP/2 流执行操作时使用。

<a id="ERR_HTTP_INVALID_CHAR"></a>

### `ERR_HTTP_INVALID_CHAR`

<!-- YAML
added: v9.0.0
removed: v10.0.0
-->

当在 HTTP 响应状态消息（原因短语）中发现无效字符时使用。

<a id="ERR_IMPORT_ASSERTION_TYPE_FAILED"></a>

### `ERR_IMPORT_ASSERTION_TYPE_FAILED`

<!-- YAML
added:
  - v17.1.0
  - v16.14.0
removed: v21.1.0
-->

导入断言失败，阻止了指定模块的导入。

<a id="ERR_IMPORT_ASSERTION_TYPE_MISSING"></a>

### `ERR_IMPORT_ASSERTION_TYPE_MISSING`

<!-- YAML
added:
  - v17.1.0
  - v16.14.0
removed: v21.1.0
-->

缺少导入断言，阻止了指定模块的导入。

<a id="ERR_IMPORT_ASSERTION_TYPE_UNSUPPORTED"></a>

### `ERR_IMPORT_ASSERTION_TYPE_UNSUPPORTED`

<!-- YAML
added:
  - v17.1.0
  - v16.14.0
removed: v21.1.0
-->

此版本的 Node.js 不支持该导入属性。

<a id="ERR_INDEX_OUT_OF_RANGE"></a>

### `ERR_INDEX_OUT_OF_RANGE`

<!-- YAML
  added: v10.0.0
  removed: v11.0.0
-->

给定索引超出接受范围（例如负偏移量）。

<a id="ERR_INVALID_OPT_VALUE"></a>

### `ERR_INVALID_OPT_VALUE`

<!-- YAML
added: v8.0.0
removed: v15.0.0
-->

在选项对象中传入了无效或意外的值。

<a id="ERR_INVALID_OPT_VALUE_ENCODING"></a>

### `ERR_INVALID_OPT_VALUE_ENCODING`

<!-- YAML
added: v9.0.0
removed: v15.0.0
-->

传入了无效或未知的文件编码。

<a id="ERR_INVALID_PERFORMANCE_MARK"></a>

### `ERR_INVALID_PERFORMANCE_MARK`

<!-- YAML
added: v8.5.0
removed: v16.7.0
-->

在使用性能计时 API（`perf_hooks`）时，性能标记无效。

<a id="ERR_INVALID_TRANSFER_OBJECT"></a>

### `ERR_INVALID_TRANSFER_OBJECT`

<!-- YAML
removed: v21.0.0
changes:
  - version: v21.0.0
    pr-url: https://github.com/nodejs/node/pull/47839
    description: 改为抛出 `DOMException`。
-->

无效的传输对象被传递给 `postMessage()`。

<a id="ERR_MANIFEST_ASSERT_INTEGRITY"></a>

### `ERR_MANIFEST_ASSERT_INTEGRITY`

<!-- YAML
removed: v22.2.0
-->

尝试加载资源，但资源与策略清单定义的完整性不匹配。有关更多信息，请参阅策略清单的文档。

<a id="ERR_MANIFEST_DEPENDENCY_MISSING"></a>

### `ERR_MANIFEST_DEPENDENCY_MISSING`

<!-- YAML
removed: v22.2.0
-->

尝试加载资源，但该资源未列为尝试加载它的位置的依赖项。有关更多信息，请参阅策略清单的文档。

<a id="ERR_MANIFEST_INTEGRITY_MISMATCH"></a>

### `ERR_MANIFEST_INTEGRITY_MISMATCH`

<!-- YAML
removed: v22.2.0
-->

尝试加载策略清单，但清单中某个资源有多个条目且彼此不匹配。更新清单条目以匹配来解决此错误。有关更多信息，请参阅策略清单的文档。

<a id="ERR_MANIFEST_INVALID_RESOURCE_FIELD"></a>

### `ERR_MANIFEST_INVALID_RESOURCE_FIELD`

<!-- YAML
removed: v22.2.0
-->

策略清单资源的某个字段值无效。更新清单条目以匹配来解决此错误。有关更多信息，请参阅策略清单的文档。

<a id="ERR_MANIFEST_INVALID_SPECIFIER"></a>

### `ERR_MANIFEST_INVALID_SPECIFIER`

<!-- YAML
removed: v22.2.0
-->

策略清单资源的某个依赖映射值无效。更新清单条目以匹配来解决此错误。有关更多信息，请参阅策略清单的文档。

<a id="ERR_MANIFEST_PARSE_POLICY"></a>

### `ERR_MANIFEST_PARSE_POLICY`

<!-- YAML
removed: v22.2.0
-->

尝试加载策略清单，但无法解析清单。有关更多信息，请参阅策略清单的文档。

<a id="ERR_MANIFEST_TDZ"></a>

### `ERR_MANIFEST_TDZ`

<!-- YAML
removed: v22.2.0
-->

尝试从策略清单读取，但清单初始化尚未发生。这可能是 Node.js 中的缺陷。

<a id="ERR_MANIFEST_UNKNOWN_ONERROR"></a>

### `ERR_MANIFEST_UNKNOWN_ONERROR`

<!-- YAML
removed: v22.2.0
-->

加载了策略清单，但其 "onerror" 行为的值未知。有关更多信息，请参阅策略清单的文档。

<a id="ERR_MISSING_MESSAGE_PORT_IN_TRANSFER_LIST"></a>

### `ERR_MISSING_MESSAGE_PORT_IN_TRANSFER_LIST`

<!-- YAML
removed: v15.0.0
-->

此错误代码在 Node.js 15.0.0 中被 [`ERR_MISSING_TRANSFERABLE_IN_TRANSFER_LIST`][] 取代，因为它不再准确，因为现在还存在其他类型的可传输对象。

<a id="ERR_MISSING_TRANSFERABLE_IN_TRANSFER_LIST"></a>

### `ERR_MISSING_TRANSFERABLE_IN_TRANSFER_LIST`

<!-- YAML
added: v15.0.0
removed: v21.0.0
changes:
  - version: v21.0.0
    pr-url: https://github.com/nodejs/node/pull/47839
    description: 改为抛出 `DOMException`。
-->

需要显式列在 `transferList` 参数中的对象存在于传递给 [`postMessage()`][] 调用的对象中，但未在该调用的 `transferList` 中提供。通常，这是一个 `MessagePort`。

在 v15.0.0 之前的 Node.js 版本中，此处使用的错误代码是 [`ERR_MISSING_MESSAGE_PORT_IN_TRANSFER_LIST`][]。但是，可传输对象类型的集合已扩展，涵盖比 `MessagePort` 更多的类型。

<a id="ERR_NAPI_CONS_PROTOTYPE_OBJECT"></a>

### `ERR_NAPI_CONS_PROTOTYPE_OBJECT`

<!-- YAML
added: v9.0.0
removed: v10.0.0
-->

由 `Node-API` 使用，当 `Constructor.prototype` 不是对象时。

<a id="ERR_NAPI_TSFN_START_IDLE_LOOP"></a>

### `ERR_NAPI_TSFN_START_IDLE_LOOP`

<!-- YAML
added:
  - v10.6.0
  - v8.16.0
removed:
  - v14.2.0
  - v12.17.0
-->

在主线程上，值在空闲循环中从与线程安全函数关联的队列中移除。此错误表明尝试启动循环时发生了错误。

<a id="ERR_NAPI_TSFN_STOP_IDLE_LOOP"></a>

### `ERR_NAPI_TSFN_STOP_IDLE_LOOP`

<!-- YAML
added:
  - v10.6.0
  - v8.16.0
removed:
  - v14.2.0
  - v12.17.0
-->

一旦队列中没有更多项，必须暂停空闲循环。此错误表明空闲循环未能停止。

<a id="ERR_NO_LONGER_SUPPORTED"></a>

### `ERR_NO_LONGER_SUPPORTED`

Node.js API 以不支持的方式被调用，例如 `Buffer.write(string, encoding, offset[, length])`。

<a id="ERR_OUTOFMEMORY"></a>

### `ERR_OUTOFMEMORY`

<!-- YAML
added: v9.0.0
removed: v10.0.0
-->

通常用于标识操作导致内存不足的情况。

<a id="ERR_PARSE_HISTORY_DATA"></a>

### `ERR_PARSE_HISTORY_DATA`

<!-- YAML
added: v9.0.0
removed: v10.0.0
-->

`node:repl` 模块无法解析 REPL 历史文件中的数据。

<a id="ERR_SOCKET_CANNOT_SEND"></a>

### `ERR_SOCKET_CANNOT_SEND`

<!-- YAML
added: v9.0.0
removed: v14.0.0
-->

无法在套接字上发送数据。

<a id="ERR_STDERR_CLOSE"></a>

### `ERR_STDERR_CLOSE`

<!-- YAML
removed: v10.12.0
changes:
  - version: v10.12.0
    pr-url: https://github.com/nodejs/node/pull/23053
    description: `process.stderr.end()` 现在不再抛出错误，而是
                 只关闭流一侧而不关闭底层资源，
                 使得此错误已过时。
-->

尝试关闭 `process.stderr` 流。按照设计，Node.js 不允许用户代码关闭 `stdout` 或 `stderr` 流。

<a id="ERR_STDOUT_CLOSE"></a>

### `ERR_STDOUT_CLOSE`

<!-- YAML
removed: v10.12.0
changes:
  - version: v10.12.0
    pr-url: https://github.com/nodejs/node/pull/23053
    description: `process.stderr.end()` 现在不再抛出错误，而是
                 只关闭流一侧而不关闭底层资源，
                 使得此错误已过时。
-->

尝试关闭 `process.stdout` 流。按照设计，Node.js 不允许用户代码关闭 `stdout` 或 `stderr` 流。

<a id="ERR_STREAM_READ_NOT_IMPLEMENTED"></a>

### `ERR_STREAM_READ_NOT_IMPLEMENTED`

<!-- YAML
added: v9.0.0
removed: v10.0.0
-->

当尝试使用未实现 [`readable._read()`][] 的可读流时使用。

<a id="ERR_TAP_LEXER_ERROR"></a>

### `ERR_TAP_LEXER_ERROR`

表示词法分析器状态失败的错误。

<a id="ERR_TAP_PARSER_ERROR"></a>

### `ERR_TAP_PARSER_ERROR`

表示解析器状态失败的错误。有关导致错误的令牌的其他信息可通过 `cause` 属性获得。

<a id="ERR_TAP_VALIDATION_ERROR"></a>

### `ERR_TAP_VALIDATION_ERROR`

此错误表示 TAP 验证失败。

<a id="ERR_TLS_RENEGOTIATION_FAILED"></a>

### `ERR_TLS_RENEGOTIATION_FAILED`

<!-- YAML
added: v9.0.0
removed: v10.0.0
-->

当 TLS 重新协商请求以非特定方式失败时使用。

<a id="ERR_TRANSFERRING_EXTERNALIZED_SHAREDARRAYBUFFER"></a>

### `ERR_TRANSFERRING_EXTERNALIZED_SHAREDARRAYBUFFER`

<!-- YAML
added: v10.5.0
removed: v14.0.0
-->

在序列化期间遇到一个内存不由 JavaScript 引擎或 Node.js 管理的 `SharedArrayBuffer`。此类 `SharedArrayBuffer` 无法被序列化。

这只有在原生插件以“外部化”模式创建 `SharedArrayBuffer`，或将现有 `SharedArrayBuffer` 放入外部化模式时才会发生。

<a id="ERR_UNKNOWN_STDIN_TYPE"></a>

### `ERR_UNKNOWN_STDIN_TYPE`

<!-- YAML
added: v8.0.0
removed: v11.7.0
-->

尝试启动一个具有未知 `stdin` 文件类型的 Node.js 进程。此错误通常表明 Node.js 本身存在缺陷，尽管用户代码也有可能触发它。

<a id="ERR_UNKNOWN_STREAM_TYPE"></a>

### `ERR_UNKNOWN_STREAM_TYPE`

<!-- YAML
added: v8.0.0
removed: v11.7.0
-->

尝试启动一个具有未知 `stdout` 或 `stderr` 文件类型的 Node.js 进程。此错误通常表明 Node.js 本身存在缺陷，尽管用户代码也有可能触发它。

<a id="ERR_V8BREAKITERATOR"></a>

### `ERR_V8BREAKITERATOR`

使用了 V8 `BreakIterator` API，但未安装完整的 ICU 数据集。

<a id="ERR_VALUE_OUT_OF_RANGE"></a>

### `ERR_VALUE_OUT_OF_RANGE`

<!-- YAML
added: v9.0.0
removed: v10.0.0
-->

当给定值超出接受范围时使用。

<a id="ERR_VM_MODULE_LINKING_ERRORED"></a>

### `ERR_VM_MODULE_LINKING_ERRORED`

<!-- YAML
added: v10.0.0
removed:
  - v18.1.0
  - v16.17.0
-->

链接器函数返回了一个链接失败的模块。

<a id="ERR_VM_MODULE_NOT_LINKED"></a>

### `ERR_VM_MODULE_NOT_LINKED`

模块必须在实例化之前成功链接。

<a id="ERR_WORKER_UNSUPPORTED_EXTENSION"></a>

### `ERR_WORKER_UNSUPPORTED_EXTENSION`

<!-- YAML
added: v11.0.0
removed: v16.9.0
-->

用于工作线程主脚本的路径名具有未知的文件扩展名。

<a id="ERR_ZLIB_BINDING_CLOSED"></a>

### `ERR_ZLIB_BINDING_CLOSED`

<!-- YAML
added: v9.0.0
removed: v10.0.0
-->

当尝试使用已关闭的 `zlib` 对象时使用。

<a id="openssl-error-codes"></a>

## OpenSSL 错误代码

<a id="Time Validity Errors"></a>

### 时间有效性错误

<a id="CERT_NOT_YET_VALID"></a>

#### `CERT_NOT_YET_VALID`

证书尚未生效：notBefore 日期在当前时间之后。

<a id="CERT_HAS_EXPIRED"></a>

#### `CERT_HAS_EXPIRED`

证书已过期：notAfter 日期在当前时间之前。

<a id="CRL_NOT_YET_VALID"></a>

#### `CRL_NOT_YET_VALID`

证书吊销列表 (CRL) 具有未来的签发日期。

<a id="CRL_HAS_EXPIRED"></a>

#### `CRL_HAS_EXPIRED`

证书吊销列表 (CRL) 已过期。

<a id="CERT_REVOKED"></a>

#### `CERT_REVOKED`

证书已被吊销；它位于证书吊销列表 (CRL) 上。

<a id="Trust or Chain Related Errors"></a>

### 信任或链相关错误

<a id="UNABLE_TO_GET_ISSUER_CERT"></a>

#### `UNABLE_TO_GET_ISSUER_CERT`

找不到查找证书的颁发者证书。这通常意味着受信任证书列表不完整。

<a id="UNABLE_TO_GET_ISSUER_CERT_LOCALLY"></a>

#### `UNABLE_TO_GET_ISSUER_CERT_LOCALLY`

证书的颁发者未知。如果颁发者未包含在受信任证书列表中，就会出现这种情况。

<a id="DEPTH_ZERO_SELF_SIGNED_CERT"></a>

#### `DEPTH_ZERO_SELF_SIGNED_CERT`

传入的证书是自签名的，并且在受信任证书列表中找不到相同的证书。

<a id="SELF_SIGNED_CERT_IN_CHAIN"></a>

#### `SELF_SIGNED_CERT_IN_CHAIN`

证书的颁发者未知。如果颁发者未包含在受信任证书列表中，就会出现这种情况。

<a id="CERT_CHAIN_TOO_LONG"></a>

#### `CERT_CHAIN_TOO_LONG`

证书链长度大于最大深度。

<a id="UNABLE_TO_GET_CRL"></a>

#### `UNABLE_TO_GET_CRL`

找不到证书引用的 CRL。

<a id="UNABLE_TO_VERIFY_LEAF_SIGNATURE"></a>

#### `UNABLE_TO_VERIFY_LEAF_SIGNATURE`

无法验证任何签名，因为链只包含一个证书且它不是自签名的。

<a id="CERT_UNTRUSTED"></a>

#### `CERT_UNTRUSTED`

根证书颁发机构 (CA) 未标记为用于指定目的的可信机构。

<a id="Basic Extension Errors"></a>

### 基本扩展错误

<a id="INVALID_CA"></a>

#### `INVALID_CA`

CA 证书无效。要么它不是 CA，要么其扩展与提供的目的不一致。

<a id="PATH_LENGTH_EXCEEDED"></a>

#### `PATH_LENGTH_EXCEEDED`

basicConstraints pathlength 参数已超出。

<a id="Name Related Errors"></a>

### 名称相关错误

<a id="HOSTNAME_MISMATCH"></a>

#### `HOSTNAME_MISMATCH`

证书与提供的名称不匹配。

<a id="Usage and Policy Errors"></a>

### 用法和策略错误

<a id="INVALID_PURPOSE"></a>

#### `INVALID_PURPOSE`

提供的证书不能用于指定目的。

<a id="CERT_REJECTED"></a>

#### `CERT_REJECTED`

根 CA 被标记为拒绝指定目的。

<a id="Formatting Errors"></a>

### 格式错误

<a id="CERT_SIGNATURE_FAILURE"></a>

#### `CERT_SIGNATURE_FAILURE`

证书签名无效。

<a id="CRL_SIGNATURE_FAILURE"></a>

#### `CRL_SIGNATURE_FAILURE`

证书吊销列表 (CRL) 的签名无效。

<a id="ERROR_IN_CERT_NOT_BEFORE_FIELD"></a>

#### `ERROR_IN_CERT_NOT_BEFORE_FIELD`

证书 notBefore 字段包含无效时间。

<a id="ERROR_IN_CERT_NOT_AFTER_FIELD"></a>

#### `ERROR_IN_CERT_NOT_AFTER_FIELD`

证书 notAfter 字段包含无效时间。

<a id="ERROR_IN_CRL_LAST_UPDATE_FIELD"></a>

#### `ERROR_IN_CRL_LAST_UPDATE_FIELD`

CRL lastUpdate 字段包含无效时间。

<a id="ERROR_IN_CRL_NEXT_UPDATE_FIELD"></a>

#### `ERROR_IN_CRL_NEXT_UPDATE_FIELD`

CRL nextUpdate 字段包含无效时间。

<a id="UNABLE_TO_DECRYPT_CERT_SIGNATURE"></a>

#### `UNABLE_TO_DECRYPT_CERT_SIGNATURE`

证书签名无法解密。这意味着无法确定实际签名值，而不是它与预期值不匹配，这仅对 RSA 密钥有意义。

<a id="UNABLE_TO_DECRYPT_CRL_SIGNATURE"></a>

#### `UNABLE_TO_DECRYPT_CRL_SIGNATURE`

证书吊销列表 (CRL) 签名无法解密：这意味着无法确定实际签名值，而不是它与预期值不匹配。

<a id="UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY"></a>

#### `UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY`

无法读取证书 SubjectPublicKeyInfo 中的公钥。

<a id="Other OpenSSL Errors"></a>

### 其他 OpenSSL 错误

<a id="OUT_OF_MEM"></a>

#### `OUT_OF_MEM`

尝试分配内存时发生错误。这绝不应该发生。

[ES 模块]: esm.md
[ICU]: intl.md#internationalization-support
[JSON Web Key 椭圆曲线注册表]: https://www.iana.org/assignments/jose/jose.xhtml#web-key-elliptic-curve
[JSON Web Key 类型注册表]: https://www.iana.org/assignments/jose/jose.xhtml#web-key-types
[原生 TypeScript 支持]: typescript.md#type-stripping
[Node.js 错误代码]: #nodejs-error-codes
[权限模型]: permissions.md#permission-model
[RFC 7230 第 3 节]: https://tools.ietf.org/html/rfc7230#section-3
[SQLite]: sqlite.md
[子资源完整性规范]: https://www.w3.org/TR/SRI/#the-integrity-attribute
[V8 的堆栈跟踪 API]: https://v8.dev/docs/stack-trace-api
[WHATWG 支持的编码]: util.md#whatwg-supported-encodings
[WHATWG URL API]: url.md#the-whatwg-url-api
[`"exports"`]: packages.md#exports
[`"imports"`]: packages.md#imports
[`'uncaughtException'`]: process.md#event-uncaughtexception
[`--disable-proto=throw`]: cli.md#--disable-protomode
[`--force-fips`]: cli.md#--force-fips
[`--no-addons`]: cli.md#--no-addons
[`--unhandled-rejections`]: cli.md#--unhandled-rejectionsmode
[`类：assert.AssertionError`]: assert.md#class-assertassertionerror
[`ERR_INCOMPATIBLE_OPTION_PAIR`]: #err_incompatible_option_pair
[`ERR_INVALID_ARG_TYPE`]: #err_invalid_arg_type
[`ERR_MISSING_MESSAGE_PORT_IN_TRANSFER_LIST`]: #err_missing_message_port_in_transfer_list
[`ERR_MISSING_TRANSFERABLE_IN_TRANSFER_LIST`]: #err_missing_transferable_in_transfer_list
[`ERR_REQUIRE_ASYNC_MODULE`]: #err_require_async_module
[`Error.isError`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/isError
[`EventEmitter`]: events.md#class-eventemitter
[`MessagePort`]: worker_threads.md#class-messageport
[`Object.getPrototypeOf`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf
[`Object.setPrototypeOf`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf
[`REPL`]: repl.md
[`ServerResponse`]: http.md#class-httpserverresponse
[`Writable`]: stream.md#class-streamwritable
[`child_process`]: child_process.md
[`cipher.getAuthTag()`]: crypto.md#ciphergetauthtag
[`crypto.getDiffieHellman()`]: crypto.md#cryptogetdiffiehellmangroupname
[`crypto.scrypt()`]: crypto.md#cryptoscryptpassword-salt-keylen-options-callback
[`crypto.scryptSync()`]: crypto.md#cryptoscryptsyncpassword-salt-keylen-options
[`crypto.timingSafeEqual()`]: crypto.md#cryptotimingsafeequala-b
[`dgram.connect()`]: dgram.md#socketconnectport-address-callback
[`dgram.createSocket()`]: dgram.md#dgramcreatesocketoptions-callback
[`dgram.disconnect()`]: dgram.md#socketdisconnect
[`dgram.remoteAddress()`]: dgram.md#socketremoteaddress
[`domException.name`]: https://developer.mozilla.org/en-US/docs/Web/API/DOMException/name
[`errno`(3) 手册页]: https://man7.org/linux/man-pages/man3/errno.3.html
[`error.code`]: #errorcode
[`error.message`]: #errormessage
[`fs.Dir`]: fs.md#class-fsdir
[`fs.cp()`]: fs.md#fscpsrc-dest-options-callback
[`fs.readFileSync`]: fs.md#fsreadfilesyncpath-options
[`fs.readdir`]: fs.md#fsreaddirpath-options-callback
[`fs.symlink()`]: fs.md#fssymlinktarget-path-type-callback
[`fs.symlinkSync()`]: fs.md#fssymlinksynctarget-path-type
[`fs.unlink`]: fs.md#fsunlinkpath-callback
[`fs`]: fs.md
[`hash.digest()`]: crypto.md#hashdigestencoding
[`hash.update()`]: crypto.md#hashupdatedata-inputencoding
[`http`]: http.md
[`https`]: https.md
[`libuv 错误处理`]: https://docs.libuv.org/en/v1.x/errors.html
[`net.Socket.write()`]: net.md#socketwritedata-encoding-callback
[`net`]: net.md
[`new URL(input)`]: url.md#new-urlinput-base
[`new URLPattern(input)`]: url.md#new-urlpatternstring-baseurl-options
[`new URLSearchParams(iterable)`]: url.md#new-urlsearchparamsiterable
[`package.json`]: packages.md#nodejs-packagejson-field-definitions
[`postMessage()`]: worker_threads.md#portpostmessagevalue-transferlist
[`postMessageToThread()`]: worker_threads.md#worker_threadspostmessagetothreadthreadid-value-transferlist-timeout
[`process.on('exit')`]: process.md#event-exit
[`process.send()`]: process.md#processsendmessage-sendhandle-options-callback
[`process.setUncaughtExceptionCaptureCallback()`]: process.md#processsetuncaughtexceptioncapturecallbackfn
[`readable._read()`]: stream.md#readable_readsize
[`require('node:crypto').setEngine()`]: crypto.md#cryptosetengineengine-flags
[`require()`]: modules.md#requireid
[`server.close()`]: net.md#serverclosecallback
[`server.listen()`]: net.md#serverlisten
[`sign.sign()`]: crypto.md#signsignprivatekey-outputencoding
[`stream.pipe()`]: stream.md#readablepipedestination-options
[`stream.push()`]: stream.md#readablepushchunk-encoding
[`stream.unshift()`]: stream.md#readableunshiftchunk-encoding
[`stream.write()`]: stream.md#writablewritechunk-encoding-callback
[`subprocess.kill()`]: child_process.md#subprocesskillsignal
[`subprocess.send()`]: child_process.md#subprocesssendmessage-sendhandle-options-callback
[`url.parse()`]: url.md#urlparseurlstring-parsequerystring-slashesdenotehost
[`util.getSystemErrorName(error.errno)`]: util.md#utilgetsystemerrornameerr
[`util.inspect()`]: util.md#utilinspectobject-options
[`util.parseArgs()`]: util.md#utilparseargsconfig
[`v8.startupSnapshot.setDeserializeMainFunction()`]: v8.md#v8startupsnapshotsetdeserializemainfunctioncallback-data
[`zlib`]: zlib.md
[`crypto 摘要算法`]: crypto.md#cryptogethashes
[调试器]: debugger.md
[定义自定义子路径]: packages.md#subpath-exports
[域]: domain.md
[基于事件发射器的]: events.md#class-eventemitter
[文件描述符]: https://en.wikipedia.org/wiki/File_descriptor
[相对 URL]: https://url.spec.whatwg.org/#relative-url-string
[使用其名称自引用包]: packages.md#self-referencing-a-package-using-its-name
[特殊协议方案]: https://url.spec.whatwg.org/#special-scheme
[基于流的]: stream.md
[系统调用]: https://man7.org/linux/man-pages/man2/syscalls.2.html
[try-catch]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
[类型剥离]: typescript.md#type-stripping
[vm]: vm.md
