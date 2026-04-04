# 异步钩子

<!--introduced_in=v8.1.0-->

> 稳定性：1 - 实验性。如果可以，请迁移离开此 API。
> 我们不推荐使用 [`createHook`][]、[`AsyncHook`][] 和
> [`executionAsyncResource`][] API，因为它们存在可用性问题、安全风险
> 和性能影响。异步上下文跟踪用例更适合使用稳定的 [`AsyncLocalStorage`][] API。如果您有
> `createHook`、`AsyncHook` 或 `executionAsyncResource` 的用例超出了
> [`AsyncLocalStorage`][] 解决的上下文跟踪需求或 [诊断通道][] 当前提供的诊断数据，请在
> <https://github.com/nodejs/node/issues> 提交 issue 描述您的用例，以便我们
> 创建更专注于目的的 API。

<!-- source_link=lib/async_hooks.js -->

我们强烈不鼓励使用 `async_hooks` API。
其他可以覆盖其大多数用例的 API 包括：

* [`AsyncLocalStorage`][] 跟踪异步上下文
* [`process.getActiveResourcesInfo()`][] 跟踪活动资源

`node:async_hooks` 模块提供一个 API 来跟踪异步资源。
可以使用以下方式访问它：

```mjs
import async_hooks from 'node:async_hooks';
```

```cjs
const async_hooks = require('node:async_hooks');
```

## 术语

异步资源表示一个具有关联回调的对象。
此回调可能被调用多次，例如 `net.createServer()` 中的 `'connection'`
事件，或者像 `fs.open()` 中只调用一次。
资源也可以在回调被调用之前关闭。`AsyncHook` 不
明确区分这些不同的情况，但会将它们表示为资源这一抽象概念。

如果使用 [`Worker`][]，每个线程都有一个独立的 `async_hooks`
接口，并且每个线程都将使用一组新的异步 ID。

## 概述

以下是公共 API 的简单概述。

```mjs
import async_hooks from 'node:async_hooks';

// 返回当前执行上下文的 ID。
const eid = async_hooks.executionAsyncId();

// 返回负责触发当前执行范围的回调被调用的句柄的 ID。
const tid = async_hooks.triggerAsyncId();

// 创建一个新的 AsyncHook 实例。所有这些回调都是可选的。
const asyncHook =
    async_hooks.createHook({ init, before, after, destroy, promiseResolve });

// 允许调用此 AsyncHook 实例的回调。这不是运行构造函数后的隐式
// 操作，必须显式运行才能开始执行回调。
asyncHook.enable();

// 禁用监听新的异步事件。
asyncHook.disable();

//
// 以下是可以传递给 createHook() 的回调。
//

// init() 在对象构造期间调用。此回调运行时资源可能尚未
// 完成构造。因此，"asyncId" 引用的资源的所有字段可能尚未填充。
function init(asyncId, type, triggerAsyncId, resource) { }

// before() 在资源的回调被调用之前立即调用。对于句柄（例如 TCPWrap），它可以被
// 调用 0-N 次，对于请求（例如 FSReqCallback），它将恰好被调用 1
// 次。
function before(asyncId) { }

// after() 在资源的回调完成后立即调用。
function after(asyncId) { }

// destroy() 在资源销毁时调用。
function destroy(asyncId) { }

// promiseResolve() 仅针对 promise 资源调用，当传递给 Promise 构造函数的
// resolve() 函数被调用时（直接或通过其他解决 promise 的方式）。
function promiseResolve(asyncId) { }
```

```cjs
const async_hooks = require('node:async_hooks');

// 返回当前执行上下文的 ID。
const eid = async_hooks.executionAsyncId();

// 返回负责触发当前执行范围的回调被调用的句柄的 ID。
const tid = async_hooks.triggerAsyncId();

// 创建一个新的 AsyncHook 实例。所有这些回调都是可选的。
const asyncHook =
    async_hooks.createHook({ init, before, after, destroy, promiseResolve });

// 允许调用此 AsyncHook 实例的回调。这不是运行构造函数后的隐式
// 操作，必须显式运行才能开始执行回调。
asyncHook.enable();

// 禁用监听新的异步事件。
asyncHook.disable();

//
// 以下是可以传递给 createHook() 的回调。
//

// init() 在对象构造期间调用。此回调运行时资源可能尚未
// 完成构造。因此，"asyncId" 引用的资源的所有字段可能尚未填充。
function init(asyncId, type, triggerAsyncId, resource) { }

// before() 在资源的回调被调用之前立即调用。对于句柄（例如 TCPWrap），它可以被
// 调用 0-N 次，对于请求（例如 FSReqCallback），它将恰好被调用 1
// 次。
function before(asyncId) { }

// after() 在资源的回调完成后立即调用。
function after(asyncId) { }

// destroy() 在资源销毁时调用。
function destroy(asyncId) { }

// promiseResolve() 仅针对 promise 资源调用，当传递给 Promise 构造函数的
// resolve() 函数被调用时（直接或通过其他解决 promise 的方式）。
function promiseResolve(asyncId) { }
```

## `async_hooks.createHook(options)`

<!-- YAML
added: v8.1.0
-->

* `options` {Object} 要注册的 [钩子回调][]
  * `init` {Function} [`init` 回调][]。
  * `before` {Function} [`before` 回调][]。
  * `after` {Function} [`after` 回调][]。
  * `destroy` {Function} [`destroy` 回调][]。
  * `promiseResolve` {Function} [`promiseResolve` 回调][]。
  * `trackPromises` {boolean} 钩子是否应跟踪 `Promise`。如果设置了
    `promiseResolve`，则不能为 `false`。**默认值**：`true`。
* 返回：{AsyncHook} 用于禁用和启用钩子的实例

注册函数以便在每个异步操作的不同生命周期事件中被调用。

回调 `init()`/`before()`/`after()`/`destroy()` 在资源的生命周期期间为
相应的异步事件调用。

所有回调都是可选的。例如，如果只需要跟踪资源清理，则只需要传递
`destroy` 回调。所有可以传递给 `callbacks` 的函数的具体细节在
[钩子回调][] 部分。

```mjs
import { createHook } from 'node:async_hooks';

const asyncHook = createHook({
  init(asyncId, type, triggerAsyncId, resource) { },
  destroy(asyncId) { },
});
```

```cjs
const async_hooks = require('node:async_hooks');

const asyncHook = async_hooks.createHook({
  init(asyncId, type, triggerAsyncId, resource) { },
  destroy(asyncId) { },
});
```

回调将通过原型链继承：

```js
class MyAsyncCallbacks {
  init(asyncId, type, triggerAsyncId, resource) { }
  destroy(asyncId) {}
}

class MyAddedCallbacks extends MyAsyncCallbacks {
  before(asyncId) { }
  after(asyncId) { }
}

const asyncHook = async_hooks.createHook(new MyAddedCallbacks());
```

因为 promise 是异步资源，其生命周期通过异步钩子机制跟踪，所以 `init()`、`before()`、`after()` 和
`destroy()` 回调_不能_是返回 promise 的异步函数。

### 错误处理

如果任何 `AsyncHook` 回调抛出，应用程序将打印堆栈跟踪
并退出。退出路径遵循未捕获异常的路径，但
所有 `'uncaughtException'` 监听器都被移除，从而强制进程
退出。除非应用程序使用 `--abort-on-uncaught-exception` 运行，否则 `'exit'` 回调仍将被调用，在这种情况下将打印堆栈跟踪并应用程序退出，留下一个核心文件。

此错误处理行为的原因是这些回调在对象生命周期的潜在易变点运行，例如在
类构造和销毁期间。因此，认为有必要快速关闭进程以防止将来意外中止。如果执行全面分析以确保异常可以遵循正常控制流而不会产生意外副作用，这可能会在未来更改。

### 在 `AsyncHook` 回调中打印

因为打印到控制台是一个异步操作，`console.log()`
会导致 `AsyncHook` 回调被调用。在 `AsyncHook` 回调函数内部使用 `console.log()` 或
类似的异步操作将导致无限递归。调试时的一个简单解决方案是使用
同步日志记录操作，例如 `fs.writeFileSync(file, msg, flag)`。
这将打印到文件并且不会递归调用 `AsyncHook`，因为
它是同步的。

```mjs
import { writeFileSync } from 'node:fs';
import { format } from 'node:util';

function debug(...args) {
  // 在 AsyncHook 回调内部调试时使用像这样的函数
  writeFileSync('log.out', `${format(...args)}\n`, { flag: 'a' });
}
```

```cjs
const fs = require('node:fs');
const util = require('node:util');

function debug(...args) {
  // 在 AsyncHook 回调内部调试时使用像这样的函数
  fs.writeFileSync('log.out', `${util.format(...args)}\n`, { flag: 'a' });
}
```

如果日志记录需要异步操作，可以使用
`AsyncHook` 本身提供的信息跟踪是什么导致了异步操作。然后当日志记录本身导致 `AsyncHook` 回调被调用时，应跳过日志记录。
通过这样做，否则无限递归被打破。

## 类：`AsyncHook`

`AsyncHook` 类公开一个接口用于跟踪异步操作的生命周期事件。

### `asyncHook.enable()`

* 返回：{AsyncHook} `asyncHook` 的引用。

启用给定 `AsyncHook` 实例的回调。如果没有提供回调，启用是一个无操作。

`AsyncHook` 实例默认禁用。如果 `AsyncHook` 实例
应在创建后立即启用，可以使用以下模式。

```mjs
import { createHook } from 'node:async_hooks';

const hook = createHook(callbacks).enable();
```

```cjs
const async_hooks = require('node:async_hooks');

const hook = async_hooks.createHook(callbacks).enable();
```

### `asyncHook.disable()`

* 返回：{AsyncHook} `asyncHook` 的引用。

禁用给定 `AsyncHook` 实例的回调，从全局 `AsyncHook` 回调池
中移除以便执行。一旦钩子被禁用，它将不会被再次调用，直到启用。

为了 API 一致性，`disable()` 也返回 `AsyncHook` 实例。

### 钩子回调

异步事件生命周期中的关键事件已分为四个领域：实例化、回调调用之前/之后以及实例销毁时。

#### `init(asyncId, type, triggerAsyncId, resource)`

* `asyncId` {number} 异步资源的唯一 ID。
* `type` {string} 异步资源的类型。
* `triggerAsyncId` {number} 在其执行上下文中创建此异步资源的异步资源的唯一 ID。
* `resource` {Object} 代表异步操作的资源的引用，需要在 _destroy_ 期间释放。

当构造一个有可能发出异步事件的类时调用。这_不_意味着实例必须在调用 `destroy` 之前调用 `before`/`after`，只意味着可能性存在。

可以通过执行类似打开资源然后在资源可以使用之前关闭它的操作来观察此行为。以下代码片段演示了这一点。

```mjs
import { createServer } from 'node:net';

createServer().listen(function() { this.close(); });
// 或
clearTimeout(setTimeout(() => {}, 10));
```

```cjs
require('node:net').createServer().listen(function() { this.close(); });
// 或
clearTimeout(setTimeout(() => {}, 10));
```

每个新资源都被分配一个在当前 Node.js 实例范围内唯一的 ID。

##### `type`

`type` 是一个字符串，用于标识导致调用 `init` 的资源类型。通常，它将对应于资源构造函数的名称。

Node.js 本身创建的资源的 `type` 可以在任何 Node.js 版本中更改。有效值包括 `TLSWRAP`、
`TCPWRAP`、`TCPSERVERWRAP`、`GETADDRINFOREQWRAP`、`FSREQCALLBACK`、
`Microtask` 和 `Timeout`。检查所用 Node.js 版本的源代码以获取完整列表。

此外，[`AsyncResource`][] 的用户可以创建独立于 Node.js 本身的异步资源。

还有 `PROMISE` 资源类型，用于跟踪 `Promise` 实例及其调度的异步工作。仅当 `trackPromises` 选项设置为 `true` 时才跟踪 `Promise`。

用户在使用公共嵌入器 API 时可以定义自己的 `type`。

可能会出现类型名称冲突。鼓励嵌入器使用唯一的前缀，例如 npm 包名称，以防止监听钩子时发生冲突。

##### `triggerAsyncId`

`triggerAsyncId` 是导致（或“触发”）新资源初始化并导致调用 `init` 的资源的 `asyncId`。这与 `async_hooks.executionAsyncId()` 不同，后者仅显示资源创建的时间，而 `triggerAsyncId` 显示资源创建的原因。

以下是 `triggerAsyncId` 的简单演示：

```mjs
import { createHook, executionAsyncId } from 'node:async_hooks';
import { stdout } from 'node:process';
import net from 'node:net';
import fs from 'node:fs';

createHook({
  init(asyncId, type, triggerAsyncId) {
    const eid = executionAsyncId();
    fs.writeSync(
      stdout.fd,
      `${type}(${asyncId}): trigger: ${triggerAsyncId} execution: ${eid}\n`);
  },
}).enable();

net.createServer((conn) => {}).listen(8080);
```

```cjs
const { createHook, executionAsyncId } = require('node:async_hooks');
const { stdout } = require('node:process');
const net = require('node:net');
const fs = require('node:fs');

createHook({
  init(asyncId, type, triggerAsyncId) {
    const eid = executionAsyncId();
    fs.writeSync(
      stdout.fd,
      `${type}(${asyncId}): trigger: ${triggerAsyncId} execution: ${eid}\n`);
  },
}).enable();

net.createServer((conn) => {}).listen(8080);
```

使用 `nc localhost 8080` 访问服务器时的输出：

```console
TCPSERVERWRAP(5): trigger: 1 execution: 1
TCPWRAP(7): trigger: 5 execution: 0
```

`TCPSERVERWRAP` 是接收连接的服务器。

`TCPWRAP` 是来自客户端的新连接。建立新连接时，`TCPWrap` 实例会立即构造。这发生在任何 JavaScript 堆栈之外。（`executionAsyncId()` 为 `0` 意味着它正在从 C++ 执行，上面没有 JavaScript 堆栈。）仅凭这些信息，无法根据什么导致资源创建来链接资源，因此 `triggerAsyncId` 负责传播是什么资源导致了新资源的存在。

##### `resource`

`resource` 是一个对象，表示已初始化的实际异步资源。访问该对象的 API 可能由资源的创建者指定。Node.js 本身创建的资源是内部的，可能随时更改。因此未指定这些 API。

在某些情况下，资源对象会被重用以提高性能，因此将其用作 `WeakMap` 中的键或向其添加属性是不安全的。

##### 异步上下文示例

上下文跟踪用例由稳定的 API [`AsyncLocalStorage`][] 覆盖。
此示例仅说明异步钩子的操作，但 [`AsyncLocalStorage`][] 更适合此用例。

以下是关于 `before` 和 `after` 调用之间对 `init` 调用的附加信息的示例，具体说明 `listen()` 的回调看起来如何。输出格式稍微更详细一些，以便更容易看到调用上下文。

```mjs
import async_hooks from 'node:async_hooks';
import fs from 'node:fs';
import net from 'node:net';
import { stdout } from 'node:process';
const { fd } = stdout;

let indent = 0;
async_hooks.createHook({
  init(asyncId, type, triggerAsyncId) {
    const eid = async_hooks.executionAsyncId();
    const indentStr = ' '.repeat(indent);
    fs.writeSync(
      fd,
      `${indentStr}${type}(${asyncId}):` +
      ` trigger: ${triggerAsyncId} execution: ${eid}\n`);
  },
  before(asyncId) {
    const indentStr = ' '.repeat(indent);
    fs.writeSync(fd, `${indentStr}before:  ${asyncId}\n`);
    indent += 2;
  },
  after(asyncId) {
    indent -= 2;
    const indentStr = ' '.repeat(indent);
    fs.writeSync(fd, `${indentStr}after:  ${asyncId}\n`);
  },
  destroy(asyncId) {
    const indentStr = ' '.repeat(indent);
    fs.writeSync(fd, `${indentStr}destroy:  ${asyncId}\n`);
  },
}).enable();

net.createServer(() => {}).listen(8080, () => {
  // 让我们等待 10ms 再记录服务器启动。
  setTimeout(() => {
    console.log('>>>', async_hooks.executionAsyncId());
  }, 10);
});
```

```cjs
const async_hooks = require('node:async_hooks');
const fs = require('node:fs');
const net = require('node:net');
const { fd } = process.stdout;

let indent = 0;
async_hooks.createHook({
  init(asyncId, type, triggerAsyncId) {
    const eid = async_hooks.executionAsyncId();
    const indentStr = ' '.repeat(indent);
    fs.writeSync(
      fd,
      `${indentStr}${type}(${asyncId}):` +
      ` trigger: ${triggerAsyncId} execution: ${eid}\n`);
  },
  before(asyncId) {
    const indentStr = ' '.repeat(indent);
    fs.writeSync(fd, `${indentStr}before:  ${asyncId}\n`);
    indent += 2;
  },
  after(asyncId) {
    indent -= 2;
    const indentStr = ' '.repeat(indent);
    fs.writeSync(fd, `${indentStr}after:  ${asyncId}\n`);
  },
  destroy(asyncId) {
    const indentStr = ' '.repeat(indent);
    fs.writeSync(fd, `${indentStr}destroy:  ${asyncId}\n`);
  },
}).enable();

net.createServer(() => {}).listen(8080, () => {
  // 让我们等待 10ms 再记录服务器启动。
  setTimeout(() => {
    console.log('>>>', async_hooks.executionAsyncId());
  }, 10);
});
```

仅启动服务器的输出：

```console
TCPSERVERWRAP(5): trigger: 1 execution: 1
TickObject(6): trigger: 5 execution: 1
before:  6
  Timeout(7): trigger: 6 execution: 6
after:   6
destroy: 6
before:  7
>>> 7
  TickObject(8): trigger: 7 execution: 7
after:   7
before:  8
after:   8
```

如示例所示，`executionAsyncId()` 和 `execution` 各自指定当前执行上下文的值；该上下文由 `before` 和 `after` 调用界定。

仅使用 `execution` 来绘制资源分配图结果如下：

```console
  root(1)
     ^
     |
TickObject(6)
     ^
     |
 Timeout(7)
```

`TCPSERVERWRAP` 不是此图的一部分，尽管它是导致调用 `console.log()` 的原因。这是因为绑定到没有主机名的端口是一个_同步_操作，但为了保持完全异步的 API，用户的回调被放置在 `process.nextTick()` 中。这就是为什么 `TickObject` 出现在输出中并且是 `.listen()` 回调的“父级”。

该图仅显示资源创建的时间，而不是原因，所以要跟踪_原因_请使用 `triggerAsyncId`。可以用以下图表示：

```console
 bootstrap(1)
     |
     ˅
TCPSERVERWRAP(5)
     |
     ˅
 TickObject(6)
     |
     ˅
  Timeout(7)
```

#### `before(asyncId)`

* `asyncId` {number}

当启动异步操作（例如 TCP 服务器接收新连接）或完成（例如将数据写入磁盘）时，会调用回调通知用户。`before` 回调就在所述回调执行之前调用。`asyncId` 是分配给即将执行回调的资源的唯一标识符。

`before` 回调将被调用 0 到 N 次。如果异步操作被取消，或者例如 TCP 服务器没有收到连接，`before` 回调通常将被调用 0 次。像 TCP 服务器这样的持久异步资源通常会多次调用 `before` 回调，而其他操作如 `fs.open()` 只会调用一次。

#### `after(asyncId)`

* `asyncId` {number}

在 `before` 中指定的回调完成后立即调用。

如果在回调执行期间发生未捕获的异常，那么 `after` 将在 `'uncaughtException'` 事件发出或 `domain` 的处理程序运行_之后_运行。

#### `destroy(asyncId)`

* `asyncId` {number}

在与 `asyncId` 对应的资源销毁后调用。它也可以通过嵌入器 API `emitDestroy()` 异步调用。

某些资源依赖垃圾回收进行清理，因此如果引用了传递给 `init` 的 `resource` 对象，`destroy` 可能永远不会被调用，导致应用程序内存泄漏。如果资源不依赖垃圾回收，则不会出现此问题。

使用 destroy 钩子会导致额外的开销，因为它通过垃圾回收器启用了对 `Promise` 实例的跟踪。

#### `promiseResolve(asyncId)`

<!-- YAML
added: v8.6.0
-->

* `asyncId` {number}

当传递给 `Promise` 构造函数的 `resolve` 函数被调用时调用（直接或通过其他解决 promise 的方式）。

`resolve()` 不执行任何可观察的同步工作。

此时 `Promise` 不一定已履行或拒绝，如果 `Promise` 是通过假设另一个 `Promise` 的状态来解决的。

```js
new Promise((resolve) => resolve(true)).then((a) => {});
```

调用以下回调：

```text
init for PROMISE with id 5, trigger id: 1
  promise resolve 5      # 对应于 resolve(true)
init for PROMISE with id 6, trigger id: 5  # 由 then() 返回的 Promise
  before 6               # 进入 then() 回调
  promise resolve 6      # then() 回调通过返回解决 promise
  after 6
```

### `async_hooks.executionAsyncResource()`

<!-- YAML
added:
 - v13.9.0
 - v12.17.0
-->

* 返回：{Object} 代表当前执行的资源。
  可用于在资源内存储数据。

`executionAsyncResource()` 返回的资源对象通常是内部的 Node.js 句柄对象，具有未记录的 API。使用该对象上的任何函数或属性可能会导致应用程序崩溃，应避免使用。

在顶层执行上下文中使用 `executionAsyncResource()` 将返回一个空对象，因为没有句柄或请求对象可使用，但拥有一个代表顶层的对象可能会有帮助。

```mjs
import { open } from 'node:fs';
import { executionAsyncId, executionAsyncResource } from 'node:async_hooks';

console.log(executionAsyncId(), executionAsyncResource());  // 1 {}
open(new URL(import.meta.url), 'r', (err, fd) => {
  console.log(executionAsyncId(), executionAsyncResource());  // 7 FSReqWrap
});
```

```cjs
const { open } = require('node:fs');
const { executionAsyncId, executionAsyncResource } = require('node:async_hooks');

console.log(executionAsyncId(), executionAsyncResource());  // 1 {}
open(__filename, 'r', (err, fd) => {
  console.log(executionAsyncId(), executionAsyncResource());  // 7 FSReqWrap
});
```

这可用于实现延续本地存储，而无需使用跟踪 `Map` 来存储元数据：

```mjs
import { createServer } from 'node:http';
import {
  executionAsyncId,
  executionAsyncResource,
  createHook,
} from 'node:async_hooks';
const sym = Symbol('state'); // 私有符号以避免污染

createHook({
  init(asyncId, type, triggerAsyncId, resource) {
    const cr = executionAsyncResource();
    if (cr) {
      resource[sym] = cr[sym];
    }
  },
}).enable();

const server = createServer((req, res) => {
  executionAsyncResource()[sym] = { state: req.url };
  setTimeout(function() {
    res.end(JSON.stringify(executionAsyncResource()[sym]));
  }, 100);
}).listen(3000);
```

```cjs
const { createServer } = require('node:http');
const {
  executionAsyncId,
  executionAsyncResource,
  createHook,
} = require('node:async_hooks');
const sym = Symbol('state'); // 私有符号以避免污染

createHook({
  init(asyncId, type, triggerAsyncId, resource) {
    const cr = executionAsyncResource();
    if (cr) {
      resource[sym] = cr[sym];
    }
  },
}).enable();

const server = createServer((req, res) => {
  executionAsyncResource()[sym] = { state: req.url };
  setTimeout(function() {
    res.end(JSON.stringify(executionAsyncResource()[sym]));
  }, 100);
}).listen(3000);
```

### `async_hooks.executionAsyncId()`

<!-- YAML
added: v8.1.0
changes:
  - version: v8.2.0
    pr-url: https://github.com/nodejs/node/pull/13490
    description: Renamed from `currentId`.
-->

* 返回：{number} 当前执行上下文的 `asyncId`。可用于
  跟踪何时调用某物。

```mjs
import { executionAsyncId } from 'node:async_hooks';
import fs from 'node:fs';

console.log(executionAsyncId());  // 1 - 引导
const path = '.';
fs.open(path, 'r', (err, fd) => {
  console.log(executionAsyncId());  // 6 - open()
});
```

```cjs
const async_hooks = require('node:async_hooks');
const fs = require('node:fs');

console.log(async_hooks.executionAsyncId());  // 1 - 引导
const path = '.';
fs.open(path, 'r', (err, fd) => {
  console.log(async_hooks.executionAsyncId());  // 6 - open()
});
```

从 `executionAsyncId()` 返回的 ID 与执行时机相关，而不是因果关系（由 `triggerAsyncId()` 覆盖）：

```js
const server = net.createServer((conn) => {
  // 返回服务器的 ID，而不是新连接的 ID，因为
  // 回调在服务器的 MakeCallback() 的执行范围内运行。
  async_hooks.executionAsyncId();

}).listen(port, () => {
  // 返回 TickObject (process.nextTick()) 的 ID，因为所有
  // 传递给 .listen() 的回调都包装在 nextTick() 中。
  async_hooks.executionAsyncId();
});
```

默认情况下，Promise 上下文可能无法获得精确的 `executionAsyncIds`。
参见 [promise 执行跟踪][] 部分。

### `async_hooks.triggerAsyncId()`

* 返回：{number} 负责调用当前正在执行的回调的资源的 ID。

```js
const server = net.createServer((conn) => {
  // 导致（或触发）调用此回调的资源是新连接的资源。因此 triggerAsyncId()
  // 的返回值是 "conn" 的 asyncId。
  async_hooks.triggerAsyncId();

}).listen(port, () => {
  // 即使传递给 .listen() 的所有回调都包装在 nextTick() 中
  // 回调本身存在是因为调用了服务器的 .listen()。所以返回值将是服务器的 ID。
  async_hooks.triggerAsyncId();
});
```

默认情况下，Promise 上下文可能无法获得有效的 `triggerAsyncId`。参见
[promise 执行跟踪][] 部分。

### `async_hooks.asyncWrapProviders`

<!-- YAML
added:
  - v17.2.0
  - v16.14.0
-->

* 返回：提供者类型到相应数字 ID 的映射。
  此映射包含 `async_hooks.init()` 事件可能发出的所有事件类型。

此功能抑制了 `process.binding('async_wrap').Providers` 的已弃用用法。
参见：[DEP0111][]

## Promise 执行跟踪

默认情况下，由于 V8 提供的 [promise 内省 API][PromiseHooks] 性质相对昂贵，promise 执行不会被分配 `asyncId`。这意味着默认情况下，使用 promises 或 `async`/`await` 的程序将无法获得正确的 promise 回调上下文的执行和触发 id。

```mjs
import { executionAsyncId, triggerAsyncId } from 'node:async_hooks';

Promise.resolve(1729).then(() => {
  console.log(`eid ${executionAsyncId()} tid ${triggerAsyncId()}`);
});
// 输出：
// eid 1 tid 0
```

```cjs
const { executionAsyncId, triggerAsyncId } = require('node:async_hooks');

Promise.resolve(1729).then(() => {
  console.log(`eid ${executionAsyncId()} tid ${triggerAsyncId()}`);
});
// 输出：
// eid 1 tid 0
```

请注意，`then()` 回调声称是在外部作用域的上下文中执行的，即使涉及了异步跳跃。此外，`triggerAsyncId` 值为 `0`，这意味着我们缺少关于导致（触发）`then()` 回调执行的资源上下文。

通过 `async_hooks.createHook` 安装 async hooks 可以启用 promise 执行跟踪：

```mjs
import { createHook, executionAsyncId, triggerAsyncId } from 'node:async_hooks';
createHook({ init() {} }).enable(); // 强制启用 PromiseHooks。
Promise.resolve(1729).then(() => {
  console.log(`eid ${executionAsyncId()} tid ${triggerAsyncId()}`);
});
// 输出：
// eid 7 tid 6
```

```cjs
const { createHook, executionAsyncId, triggerAsyncId } = require('node:async_hooks');

createHook({ init() {} }).enable(); // 强制启用 PromiseHooks。
Promise.resolve(1729).then(() => {
  console.log(`eid ${executionAsyncId()} tid ${triggerAsyncId()}`);
});
// 输出：
// eid 7 tid 6
```

在此示例中，添加任何实际的钩子函数都启用了 promise 的跟踪。上面的示例中有两个 promise；由 `Promise.resolve()` 创建的 promise 和由 `then()` 调用返回的 promise。在上面的示例中，第一个 promise 获得了 `asyncId` `6`，后者获得了 `asyncId` `7`。在 `then()` 回调执行期间，我们在 `asyncId` 为 `7` 的 promise 上下文中执行。此 promise 由 async resource `6` 触发。

关于 promises 的另一个细微差别是，`before` 和 `after` 回调仅在链式 promises 上运行。这意味着不是由 `then()`/`catch()` 创建的 promises 不会触发其上的 `before` 和 `after` 回调。有关更多详细信息，请参阅 V8 [PromiseHooks][] API 的详细信息。

### 禁用 promise 执行跟踪

跟踪 promise 执行可能会导致显著的性能开销。要选择不跟踪 promise，请将 `trackPromises` 设置为 `false`：

```cjs
const { createHook } = require('node:async_hooks');
const { writeSync } = require('node:fs');
createHook({
  init(asyncId, type, triggerAsyncId, resource) {
    // 当 trackPromises 设置为 false 时，不会调用此 init 钩子。
    writeSync(1, `init hook triggered for ${type}\n`);
  },
  trackPromises: false,  // 不跟踪 promises。
}).enable();
Promise.resolve(1729);
```

```mjs
import { createHook } from 'node:async_hooks';
import { writeSync } from 'node:fs';

createHook({
  init(asyncId, type, triggerAsyncId, resource) {
    // 当 trackPromises 设置为 false 时，不会调用此 init 钩子。
    writeSync(1, `init hook triggered for ${type}\n`);
  },
  trackPromises: false,  // 不跟踪 promises。
}).enable();
Promise.resolve(1729);
```

## JavaScript 嵌入器 API

处理自己异步资源（执行如 I/O、连接池或管理回调队列等任务）的库开发者可以使用 `AsyncResource` JavaScript API，以便调用所有适当的回调。

### 类：`AsyncResource`

此类的文档已移至 [`AsyncResource`][]。

## 类：`AsyncLocalStorage`

此类的文档已移至 [`AsyncLocalStorage`][]。

[DEP0111]: deprecations.md#dep0111-processbinding
[Diagnostics Channel]: diagnostics_channel.md
[Hook Callbacks]: #hook-callbacks
[PromiseHooks]: https://docs.google.com/document/d/1rda3yKGHimKIhg5YeoAmCOtyURgsbTH_qaYR79FELlk/edit
[`AsyncHook`]: #class-asynchook
[`AsyncLocalStorage`]: async_context.md#class-asynclocalstorage
[`AsyncResource`]: async_context.md#class-asyncresource
[`Worker`]: worker_threads.md#class-worker
[`after` callback]: #afterasyncid
[`before` callback]: #beforeasyncid
[`createHook`]: #async_hookscreatehookoptions
[`destroy` callback]: #destroyasyncid
[`executionAsyncResource`]: #async_hooksexecutionasyncresource
[`init` callback]: #initasyncid-type-triggerasyncid-resource
[`process.getActiveResourcesInfo()`]: process.md#processgetactiveresourcesinfo
[`promiseResolve` callback]: #promiseresolveasyncid
[promise execution tracking]: #promise-execution-tracking
