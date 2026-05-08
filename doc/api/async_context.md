# 异步上下文跟踪

<!--introduced_in=v16.4.0-->

> 稳定性：2 - 稳定

<!-- source_link=lib/async_hooks.js -->

## 介绍

这些类用于关联状态并在回调和 Promise 链中传播它。
它们允许在整个 Web 请求生命周期或任何其他异步持续时间内存储数据。它类似于其他语言中的线程本地存储。

`AsyncLocalStorage` 和 `AsyncResource` 类是 `node:async_hooks` 模块的一部分：

```mjs
import { AsyncLocalStorage, AsyncResource } from 'node:async_hooks';
```

```cjs
const { AsyncLocalStorage, AsyncResource } = require('node:async_hooks');
```

## 类：`AsyncLocalStorage`

<!-- YAML
added:
 - v13.10.0
 - v12.17.0
changes:
 - version: v16.4.0
   pr-url: https://github.com/nodejs/node/pull/37675
   description: AsyncLocalStorage 现在是稳定的。此前，它是实验性的。
-->

此类创建的存储在整个异步操作中保持一致。

虽然你可以在 `node:async_hooks` 模块之上创建自己的实现，但应首选 `AsyncLocalStorage`，因为它是一个高性能且内存安全的实现，涉及许多难以实现的显著优化。

以下示例使用 `AsyncLocalStorage` 构建一个简单的日志记录器，它为传入的 HTTP 请求分配 ID，并将它们包含在每个请求中记录的消息中。

```mjs
import http from 'node:http';
import { AsyncLocalStorage } from 'node:async_hooks';

const asyncLocalStorage = new AsyncLocalStorage();

function logWithId(msg) {
  const id = asyncLocalStorage.getStore();
  console.log(`${id !== undefined ? id : '-'}:`, msg);
}

let idSeq = 0;
http.createServer((req, res) => {
  asyncLocalStorage.run(idSeq++, () => {
    logWithId('start');
    // 在此处想象任何异步操作链
    setImmediate(() => {
      logWithId('finish');
      res.end();
    });
  });
}).listen(8080);

http.get('http://localhost:8080');
http.get('http://localhost:8080');
// 打印：
//   0: start
//   0: finish
//   1: start
//   1: finish
```

```cjs
const http = require('node:http');
const { AsyncLocalStorage } = require('node:async_hooks');

const asyncLocalStorage = new AsyncLocalStorage();

function logWithId(msg) {
  const id = asyncLocalStorage.getStore();
  console.log(`${id !== undefined ? id : '-'}:`, msg);
}

let idSeq = 0;
http.createServer((req, res) => {
  asyncLocalStorage.run(idSeq++, () => {
    logWithId('start');
    // 在此处想象任何异步操作链
    setImmediate(() => {
      logWithId('finish');
      res.end();
    });
  });
}).listen(8080);

http.get('http://localhost:8080');
http.get('http://localhost:8080');
// 打印：
//   0: start
//   0: finish
//   1: start
//   1: finish
```

`AsyncLocalStorage` 的每个实例都维护一个独立的存储上下文。
多个实例可以同时安全存在，而不会干扰彼此的数据。

### `new AsyncLocalStorage([options])`

<!-- YAML
added:
 - v13.10.0
 - v12.17.0
changes:
 - version: v24.0.0
   pr-url: https://github.com/nodejs/node/pull/57766
   description: 添加 defaultValue 和 name 选项。
 - version:
    - v19.7.0
    - v18.16.0
   pr-url: https://github.com/nodejs/node/pull/46386
   description: 移除实验性的 onPropagate 选项。
 - version:
    - v19.2.0
    - v18.13.0
   pr-url: https://github.com/nodejs/node/pull/45386
   description: 添加 onPropagate 选项。
-->

* `options` {Object}
  * `defaultValue` {any} 当未提供存储时使用的默认值。
  * `name` {string} `AsyncLocalStorage` 值的名称。

创建 `AsyncLocalStorage` 的新实例。存储仅在 `run()` 调用内或 `enterWith()` 调用后提供。

### 静态方法：`AsyncLocalStorage.bind(fn)`

<!-- YAML
added:
 - v19.8.0
 - v18.16.0
changes:
 - version:
    - v23.11.0
    - v22.15.0
   pr-url: https://github.com/nodejs/node/pull/57510
   description: 标记 API 为稳定。
-->

* `fn` {Function} 要绑定到当前执行上下文的函数。
* 返回：{Function} 一个在捕获的执行上下文内调用 `fn` 的新函数。

将给定函数绑定到当前执行上下文。

### 静态方法：`AsyncLocalStorage.snapshot()`

<!-- YAML
added:
 - v19.8.0
 - v18.16.0
changes:
 - version:
    - v23.11.0
    - v22.15.0
   pr-url: https://github.com/nodejs/node/pull/57510
   description: 标记 API 为稳定。
-->

* 返回：{Function} 一个签名为 `(fn: (...args) : R, ...args) : R` 的新函数。

捕获当前执行上下文并返回一个接受函数作为参数的函数。每当返回的函数被调用时，它会在捕获的上下文中调用传递给它的函数。

```js
const asyncLocalStorage = new AsyncLocalStorage();
const runInAsyncScope = asyncLocalStorage.run(123, () => AsyncLocalStorage.snapshot());
const result = asyncLocalStorage.run(321, () => runInAsyncScope(() => asyncLocalStorage.getStore()));
console.log(result);  // 返回 123
```

AsyncLocalStorage.snapshot() 可以替代 AsyncResource 用于简单的异步上下文跟踪目的，例如：

```js
class Foo {
  #runInAsyncScope = AsyncLocalStorage.snapshot();

  get() { return this.#runInAsyncScope(() => asyncLocalStorage.getStore()); }
}

const foo = asyncLocalStorage.run(123, () => new Foo());
console.log(asyncLocalStorage.run(321, () => foo.get())); // 返回 123
```

### `asyncLocalStorage.disable()`

<!-- YAML
added:
 - v13.10.0
 - v12.17.0
-->

> 稳定性：1 - 实验性

禁用 `AsyncLocalStorage` 的实例。所有后续对 `asyncLocalStorage.getStore()` 的调用都将返回 `undefined`，直到再次调用 `asyncLocalStorage.run()` 或 `asyncLocalStorage.enterWith()`。

当调用 `asyncLocalStorage.disable()` 时，链接到该实例的所有当前上下文都将退出。

在 `asyncLocalStorage` 可以被垃圾回收之前，需要调用 `asyncLocalStorage.disable()`。这不适用于 `asyncLocalStorage` 提供的存储，因为这些对象会与相应的异步资源一起被垃圾回收。

当 `asyncLocalStorage` 在当前进程中不再使用时，请使用此方法。

### `asyncLocalStorage.getStore()`

<!-- YAML
added:
 - v13.10.0
 - v12.17.0
-->

* 返回：{any}

返回当前存储。
如果在通过调用 `asyncLocalStorage.run()` 或 `asyncLocalStorage.enterWith()` 初始化的异步上下文之外调用，它将返回 `undefined`。

### `asyncLocalStorage.enterWith(store)`

<!-- YAML
added:
 - v13.11.0
 - v12.17.0
-->

> 稳定性：1 - 实验性

* `store` {any}

转入上下文以完成剩余的当前同步执行，然后将存储持久化到任何后续的异步调用中。

示例：

```js
const store = { id: 1 };
// 用给定的存储对象替换之前的存储
asyncLocalStorage.enterWith(store);
asyncLocalStorage.getStore(); // 返回存储对象
someAsyncOperation(() => {
  asyncLocalStorage.getStore(); // 返回同一个对象
});
```

此转换将持续整个同步执行。
这意味着，例如，如果上下文是在事件处理程序中进入的，则后续的事件处理程序也将在那该上下文中运行，除非专门使用 `AsyncResource` 绑定到另一个上下文。这就是为什么除非有强烈的理由使用后一种方法，否则应首选 `run()` 而不是 `enterWith()`。

```js
const store = { id: 1 };

emitter.on('my-event', () => {
  asyncLocalStorage.enterWith(store);
});
emitter.on('my-event', () => {
  asyncLocalStorage.getStore(); // 返回同一个对象
});

asyncLocalStorage.getStore(); // 返回 undefined
emitter.emit('my-event');
asyncLocalStorage.getStore(); // 返回同一个对象
```

### `asyncLocalStorage.name`

<!-- YAML
added: v24.0.0
-->

* 类型：{string}

`AsyncLocalStorage` 实例的名称（如果提供）。

### `asyncLocalStorage.run(store, callback[, ...args])`

<!-- YAML
added:
 - v13.10.0
 - v12.17.0
-->

* `store` {any}
* `callback` {Function}
* `...args` {any}

在上下文中同步运行函数并返回其返回值。存储不能在回调函数之外访问。
存储可访问在回调内创建的任何异步操作。

可选的 `args` 传递给回调函数。

如果回调函数抛出错误，错误也将由 `run()` 抛出。
堆栈跟踪不受此调用影响，上下文退出。

示例：

```js
const store = { id: 2 };
try {
  asyncLocalStorage.run(store, () => {
    asyncLocalStorage.getStore(); // 返回存储对象
    setTimeout(() => {
      asyncLocalStorage.getStore(); // 返回存储对象
    }, 200);
    throw new Error();
  });
} catch (e) {
  asyncLocalStorage.getStore(); // 返回 undefined
  // 错误将在此处被捕获
}
```

### `asyncLocalStorage.exit(callback[, ...args])`

<!-- YAML
added:
 - v13.10.0
 - v12.17.0
-->

> 稳定性：1 - 实验性

* `callback` {Function}
* `...args` {any}

在上下文之外同步运行函数并返回其返回值。存储不能在回调函数内或在回调内创建的异步操作中访问。在回调函数内完成的任何 `getStore()` 调用将始终返回 `undefined`。

可选的 `args` 传递给回调函数。

如果回调函数抛出错误，错误也将由 `exit()` 抛出。
堆栈跟踪不受此调用影响，上下文重新进入。

示例：

```js
// 在 run 调用内
try {
  asyncLocalStorage.getStore(); // 返回存储对象或值
  asyncLocalStorage.exit(() => {
    asyncLocalStorage.getStore(); // 返回 undefined
    throw new Error();
  });
} catch (e) {
  asyncLocalStorage.getStore(); // 返回同一个对象或值
  // 错误将在此处被捕获
}
```

### `asyncLocalStorage.withScope(store)`

<!-- YAML
added:
 - v25.9.0
-->

> 稳定性：1 - 实验性

* `store` {any}
* 返回：{RunScope}

创建一个一次性作用域，进入给定存储并在作用域处置时自动恢复之前的存储值。此方法旨在与 JavaScript 的显式资源管理（`using` 语法）一起使用。

示例：

```mjs
import { AsyncLocalStorage } from 'node:async_hooks';

const asyncLocalStorage = new AsyncLocalStorage();

{
  using _ = asyncLocalStorage.withScope('my-store');
  console.log(asyncLocalStorage.getStore()); // 打印：my-store
}

console.log(asyncLocalStorage.getStore()); // 打印：undefined
```

```cjs
const { AsyncLocalStorage } = require('node:async_hooks');

const asyncLocalStorage = new AsyncLocalStorage();

{
  using _ = asyncLocalStorage.withScope('my-store');
  console.log(asyncLocalStorage.getStore()); // 打印：my-store
}

console.log(asyncLocalStorage.getStore()); // 打印：undefined
```

`withScope()` 方法对于在同步代码中管理上下文特别有用，你希望确保在退出块时恢复之前的存储值，即使抛出了错误。

```mjs
import { AsyncLocalStorage } from 'node:async_hooks';

const asyncLocalStorage = new AsyncLocalStorage();

try {
  using _ = asyncLocalStorage.withScope('my-store');
  console.log(asyncLocalStorage.getStore()); // 打印：my-store
  throw new Error('test');
} catch (e) {
  // 即使出错后存储也会自动恢复
  console.log(asyncLocalStorage.getStore()); // 打印：undefined
}
```

```cjs
const { AsyncLocalStorage } = require('node:async_hooks');

const asyncLocalStorage = new AsyncLocalStorage();

try {
  using _ = asyncLocalStorage.withScope('my-store');
  console.log(asyncLocalStorage.getStore()); // 打印：my-store
  throw new Error('test');
} catch (e) {
  // 即使出错后存储也会自动恢复
  console.log(asyncLocalStorage.getStore()); // 打印：undefined
}
```

**重要：** 在异步函数中的第一个 `await` 之前使用 `withScope()` 时，请注意作用域更改将影响调用者的上下文。异步函数的同步部分（在第一个 `await` 之前）在调用时立即运行，当它到达第一个 `await` 时，它将 promise 返回给调用者。此时，作用域更改在调用者的上下文中变得可见，并将持续到后续的同步代码中，直到其他内容更改作用域值。对于异步操作，首选使用 `run()`，它可以正确地跨异步边界隔离上下文。

```mjs
import { AsyncLocalStorage } from 'node:async_hooks';

const asyncLocalStorage = new AsyncLocalStorage();

async function example() {
  using _ = asyncLocalStorage.withScope('my-store');
  console.log(asyncLocalStorage.getStore()); // 打印：my-store
  await someAsyncOperation(); // 函数在此处暂停并返回 promise
  console.log(asyncLocalStorage.getStore()); // 打印：my-store
}

// 调用 without await
example(); // 同步部分运行，然后在第一个 await 处暂停
// 在 promise 返回后，作用域 'my-store' 现在在调用者中激活了！
console.log(asyncLocalStorage.getStore()); // 打印：my-store（意外！）
```

### 与 `async/await` 一起使用

如果在异步函数中，只有一个 `await` 调用要在上下文中运行，则应使用以下模式：

```js
async function fn() {
  await asyncLocalStorage.run(new Map(), () => {
    asyncLocalStorage.getStore().set('key', value);
    return foo(); // foo 的返回值将被等待
  });
}
```

在此示例中，存储仅在回调函数和 `foo` 调用的函数中可用。在 `run` 之外，调用 `getStore` 将返回 `undefined`。

### 故障排除：上下文丢失

在大多数情况下，`AsyncLocalStorage` 工作没有问题。在极少数情况下，当前存储在其中一个异步操作中丢失。

如果你的代码是基于回调的，只需使用 [`util.promisify()`][] 对其进行 Promise 化，以便它开始使用原生 Promise。

如果你需要使用基于回调的 API 或你的代码假设了自定义 thenable 实现，请使用 [`AsyncResource`][] 类将异步操作与正确的执行上下文关联。通过在你怀疑负责丢失的调用之后记录 `asyncLocalStorage.getStore()` 的内容来查找负责上下文丢失的函数调用。当代码记录 `undefined` 时，最后调用的回调可能是负责上下文丢失的原因。

## 类：`RunScope`

<!-- YAML
added:
 - v25.9.0
-->

> 稳定性：1 - 实验性

由 [`asyncLocalStorage.withScope()`][] 返回的一次性作用域，处置时会自动恢复之前的存储值。此类实现了 [显式资源管理][] 协议，旨在与 JavaScript 的 `using` 语法配合使用。

当 `using` 块退出时，无论是正常完成还是抛出错误，作用域都会自动恢复之前的存储值。

### `scope.dispose()`

<!-- YAML
added:
 - v25.9.0
-->

显式结束作用域并恢复之前的存储值。此方法是幂等的：多次调用它与调用一次的效果相同。

`[Symbol.dispose]()` 方法委托给 `dispose()`。

如果调用 `withScope()` 时未使用 `using` 关键字，则必须手动调用 `dispose()` 来恢复之前的存储值。忘记调用 `dispose()` 会导致存储值在当前执行上下文的剩余部分持续存在：

```mjs
import { AsyncLocalStorage } from 'node:async_hooks';

const storage = new AsyncLocalStorage();

// 如果不使用 using，必须手动处置作用域
const scope = storage.withScope('my-store');
// 此处 storage.getStore() === 'my-store'

scope.dispose(); // 恢复之前的值
// 此处 storage.getStore() === undefined
```

```cjs
const { AsyncLocalStorage } = require('node:async_hooks');

const storage = new AsyncLocalStorage();

// 如果不使用 using，必须手动处置作用域
const scope = storage.withScope('my-store');
// 此处 storage.getStore() === 'my-store'

scope.dispose(); // 恢复之前的值
// 此处 storage.getStore() === undefined
```

## 类：`AsyncResource`

<!-- YAML
changes:
 - version: v16.4.0
   pr-url: https://github.com/nodejs/node/pull/37675
   description: AsyncResource 现在是稳定的。此前，它是实验性的。
-->

`AsyncResource` 类旨在由嵌入者的异步资源进行扩展。使用此功能，用户可以轻松触发其自有资源的生命周期事件。

当实例化 `AsyncResource` 时，将触发 `init` 钩子。

以下是 `AsyncResource` API 的概述。

```mjs
import { AsyncResource, executionAsyncId } from 'node:async_hooks';

// AsyncResource() 旨在被扩展。实例化一个
// 新的 AsyncResource() 也会触发 init。如果省略 triggerAsyncId，则
// 使用 async_hook.executionAsyncId()。
const asyncResource = new AsyncResource(
  type, { triggerAsyncId: executionAsyncId(), requireManualDestroy: false },
);

// 在资源的执行上下文中运行函数。这将
// * 建立资源的上下文
// * 触发 AsyncHooks before 回调
// * 使用提供的参数调用提供的函数 `fn`
// * 触发 AsyncHooks after 回调
// * 恢复原始执行上下文
asyncResource.runInAsyncScope(fn, thisArg, ...args);

// 调用 AsyncHooks destroy 回调。
asyncResource.emitDestroy();

// 返回分配给 AsyncResource 实例的唯一 ID。
asyncResource.asyncId();

// 返回 AsyncResource 实例的触发 ID。
asyncResource.triggerAsyncId();
```

```cjs
const { AsyncResource, executionAsyncId } = require('node:async_hooks');

// AsyncResource() 旨在被扩展。实例化一个
// 新的 AsyncResource() 也会触发 init。如果省略 triggerAsyncId，则
// 使用 async_hook.executionAsyncId()。
const asyncResource = new AsyncResource(
  type, { triggerAsyncId: executionAsyncId(), requireManualDestroy: false },
);

// 在资源的执行上下文中运行函数。这将
// * 建立资源的上下文
// * 触发 AsyncHooks before 回调
// * 使用提供的参数调用提供的函数 `fn`
// * 触发 AsyncHooks after 回调
// * 恢复原始执行上下文
asyncResource.runInAsyncScope(fn, thisArg, ...args);

// 调用 AsyncHooks destroy 回调。
asyncResource.emitDestroy();

// 返回分配给 AsyncResource 实例的唯一 ID。
asyncResource.asyncId();

// 返回 AsyncResource 实例的触发 ID。
asyncResource.triggerAsyncId();
```

### `new AsyncResource(type[, options])`

* `type` {string} 异步事件的类型。
* `options` {Object}
  * `triggerAsyncId` {number} 创建此异步事件的执行上下文的 ID。**默认值：** `executionAsyncId()`。
  * `requireManualDestroy` {boolean} 如果设置为 `true`，则在对象被垃圾回收时禁用 `emitDestroy`。通常不需要设置此项（即使手动调用 `emitDestroy`），除非检索到资源的 `asyncId` 并使用它调用了敏感 API 的 `emitDestroy`。当设置为 `false` 时，垃圾回收时的 `emitDestroy` 调用仅在至少有一个活动的 `destroy` 钩子时才会发生。**默认值：** `false`。

使用示例：

```js
class DBQuery extends AsyncResource {
  constructor(db) {
    super('DBQuery');
    this.db = db;
  }

  getInfo(query, callback) {
    this.db.get(query, (err, data) => {
      this.runInAsyncScope(callback, null, err, data);
    });
  }

  close() {
    this.db = null;
    this.emitDestroy();
  }
}
```

### 静态方法：`AsyncResource.bind(fn[, type[, thisArg]])`

<!-- YAML
added:
  - v14.8.0
  - v12.19.0
changes:
  - version: v20.0.0
    pr-url: https://github.com/nodejs/node/pull/46432
    description: "添加到绑定函数的 `asyncResource` 属性已弃用，并将在未来版本中移除。"
  - version:
    - v17.8.0
    - v16.15.0
    pr-url: https://github.com/nodejs/node/pull/42177
    description: "更改了当 `thisArg` 为 undefined 时的默认值，以使用调用者的 `this`。"
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/36782
    description: 添加了可选的 thisArg。
-->

* `fn` {Function} 要绑定到当前执行上下文的函数。
* `type` {string} 与底层 `AsyncResource` 关联的可选名称。
* `thisArg` {any}

将给定函数绑定到当前执行上下文。

### `asyncResource.bind(fn[, thisArg])`

<!-- YAML
added:
  - v14.8.0
  - v12.19.0
changes:
  - version: v20.0.0
    pr-url: https://github.com/nodejs/node/pull/46432
    description: "添加到绑定函数的 `asyncResource` 属性已弃用，并将在未来版本中移除。"
  - version:
    - v17.8.0
    - v16.15.0
    pr-url: https://github.com/nodejs/node/pull/42177
    description: "更改了当 `thisArg` 为 undefined 时的默认值，以使用调用者的 `this`。"
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/36782
    description: 添加了可选的 thisArg。
-->

* `fn` {Function} 要绑定到当前 `AsyncResource` 的函数。
* `thisArg` {any}

将给定函数绑定到此 `AsyncResource` 的作用域执行。

### `asyncResource.runInAsyncScope(fn[, thisArg, ...args])`

<!-- YAML
added: v9.6.0
-->

* `fn` {Function} 在此异步资源的执行上下文中调用的函数。
* `thisArg` {any} 用于函数调用的接收者。
* `...args` {any} 传递给函数的可选参数。

在异步资源的执行上下文中使用提供的参数调用提供的函数。这将建立上下文，触发 AsyncHooks before 回调，调用函数，触发 AsyncHooks after 回调，然后恢复原始执行上下文。

### `asyncResource.emitDestroy()`

* 返回：{AsyncResource} 对 `asyncResource` 的引用。

调用所有 `destroy` 钩子。此方法只应调用一次。如果调用多次，将抛出错误。这 **必须** 手动调用。如果资源留给 GC 回收，则永远不会调用 `destroy` 钩子。

### `asyncResource.asyncId()`

* 返回：{number} 分配给资源的唯一 `asyncId`。

### `asyncResource.triggerAsyncId()`

* 返回：{number} 与传递给 `AsyncResource` 构造函数的 `triggerAsyncId` 相同。

<a id="async-resource-worker-pool"></a>

### 将 `AsyncResource` 用于 `Worker` 线程池

以下示例展示了如何使用 `AsyncResource` 类为 [`Worker`][] 池正确提供异步跟踪。其他资源池（如数据库连接池）可以遵循类似的模型。

假设任务是相加两个数字，使用名为 `task_processor.js` 的文件，内容如下：

```mjs
import { parentPort } from 'node:worker_threads';
parentPort.on('message', (task) => {
  parentPort.postMessage(task.a + task.b);
});
```

```cjs
const { parentPort } = require('node:worker_threads');
parentPort.on('message', (task) => {
  parentPort.postMessage(task.a + task.b);
});
```

围绕它的 Worker 池可以使用以下结构：

```mjs
import { AsyncResource } from 'node:async_hooks';
import { EventEmitter } from 'node:events';
import { Worker } from 'node:worker_threads';

const kTaskInfo = Symbol('kTaskInfo');
const kWorkerFreedEvent = Symbol('kWorkerFreedEvent');

class WorkerPoolTaskInfo extends AsyncResource {
  constructor(callback) {
    super('WorkerPoolTaskInfo');
    this.callback = callback;
  }

  done(err, result) {
    this.runInAsyncScope(this.callback, null, err, result);
    this.emitDestroy();  // `TaskInfo` 仅使用一次。
  }
}

export default class WorkerPool extends EventEmitter {
  constructor(numThreads) {
    super();
    this.numThreads = numThreads;
    this.workers = [];
    this.freeWorkers = [];
    this.tasks = [];

    for (let i = 0; i < numThreads; i++)
      this.addNewWorker();

    // 每当发出 kWorkerFreedEvent 时，调度
    // 队列中的下一个待处理任务（如果有）。
    this.on(kWorkerFreedEvent, () => {
      if (this.tasks.length > 0) {
        const { task, callback } = this.tasks.shift();
        this.runTask(task, callback);
      }
    });
  }

  addNewWorker() {
    const worker = new Worker(new URL('task_processor.js', import.meta.url));
    worker.on('message', (result) => {
      // 成功时：调用传递给 `runTask` 的回调，
      // 移除与 Worker 关联的 `TaskInfo`，并将其标记为空闲
      // 。
      worker[kTaskInfo].done(null, result);
      worker[kTaskInfo] = null;
      this.freeWorkers.push(worker);
      this.emit(kWorkerFreedEvent);
    });
    worker.on('error', (err) => {
      // 发生未捕获异常时：调用传递给
      // `runTask` 的回调并传入错误。
      if (worker[kTaskInfo])
        worker[kTaskInfo].done(err, null);
      else
        this.emit('error', err);
      // 从列表中移除 worker 并启动一个新的 Worker 来替换
      // 当前的 worker。
      this.workers.splice(this.workers.indexOf(worker), 1);
      this.addNewWorker();
    });
    this.workers.push(worker);
    this.freeWorkers.push(worker);
    this.emit(kWorkerFreedEvent);
  }

  runTask(task, callback) {
    if (this.freeWorkers.length === 0) {
      // 没有空闲线程，等待直到一个 worker 线程变为空闲。
      this.tasks.push({ task, callback });
      return;
    }

    const worker = this.freeWorkers.pop();
    worker[kTaskInfo] = new WorkerPoolTaskInfo(callback);
    worker.postMessage(task);
  }

  close() {
    for (const worker of this.workers) worker.terminate();
  }
}
```

```cjs
const { AsyncResource } = require('node:async_hooks');
const { EventEmitter } = require('node:events');
const path = require('node:path');
const { Worker } = require('node:worker_threads');

const kTaskInfo = Symbol('kTaskInfo');
const kWorkerFreedEvent = Symbol('kWorkerFreedEvent');

class WorkerPoolTaskInfo extends AsyncResource {
  constructor(callback) {
    super('WorkerPoolTaskInfo');
    this.callback = callback;
  }

  done(err, result) {
    this.runInAsyncScope(this.callback, null, err, result);
    this.emitDestroy();  // `TaskInfo` 仅使用一次。
  }
}

class WorkerPool extends EventEmitter {
  constructor(numThreads) {
    super();
    this.numThreads = numThreads;
    this.workers = [];
    this.freeWorkers = [];
    this.tasks = [];

    for (let i = 0; i < numThreads; i++)
      this.addNewWorker();

    // 每当发出 kWorkerFreedEvent 时，调度
    // 队列中的下一个待处理任务（如果有）。
    this.on(kWorkerFreedEvent, () => {
      if (this.tasks.length > 0) {
        const { task, callback } = this.tasks.shift();
        this.runTask(task, callback);
      }
    });
  }

  addNewWorker() {
    const worker = new Worker(path.resolve(__dirname, 'task_processor.js'));
    worker.on('message', (result) => {
      // 成功时：调用传递给 `runTask` 的回调，
      // 移除与 Worker 关联的 `TaskInfo`，并将其标记为空闲
      // 。
      worker[kTaskInfo].done(null, result);
      worker[kTaskInfo] = null;
      this.freeWorkers.push(worker);
      this.emit(kWorkerFreedEvent);
    });
    worker.on('error', (err) => {
      // 发生未捕获异常时：调用传递给
      // `runTask` 的回调并传入错误。
      if (worker[kTaskInfo])
        worker[kTaskInfo].done(err, null);
      else
        this.emit('error', err);
      // 从列表中移除 worker 并启动一个新的 Worker 来替换
      // 当前的 worker。
      this.workers.splice(this.workers.indexOf(worker), 1);
      this.addNewWorker();
    });
    this.workers.push(worker);
    this.freeWorkers.push(worker);
    this.emit(kWorkerFreedEvent);
  }

  runTask(task, callback) {
    if (this.freeWorkers.length === 0) {
      // 没有空闲线程，等待直到一个 worker 线程变为空闲。
      this.tasks.push({ task, callback });
      return;
    }

    const worker = this.freeWorkers.pop();
    worker[kTaskInfo] = new WorkerPoolTaskInfo(callback);
    worker.postMessage(task);
  }

  close() {
    for (const worker of this.workers) worker.terminate();
  }
}

module.exports = WorkerPool;
```

如果没有 `WorkerPoolTaskInfo` 对象添加的显式跟踪，回调看起来会与单个 `Worker` 对象关联。然而，`Worker` 的创建与任务的创建无关，也不提供关于任务何时调度的信息。

此池的使用方式如下：

```mjs
import WorkerPool from './worker_pool.js';
import os from 'node:os';

const pool = new WorkerPool(os.availableParallelism());

let finished = 0;
for (let i = 0; i < 10; i++) {
  pool.runTask({ a: 42, b: 100 }, (err, result) => {
    console.log(i, err, result);
    if (++finished === 10)
      pool.close();
  });
}
```

```cjs
const WorkerPool = require('./worker_pool.js');
const os = require('node:os');

const pool = new WorkerPool(os.availableParallelism());

let finished = 0;
for (let i = 0; i < 10; i++) {
  pool.runTask({ a: 42, b: 100 }, (err, result) => {
    console.log(i, err, result);
    if (++finished === 10)
      pool.close();
  });
}
```

### 将 `AsyncResource` 与 `EventEmitter` 集成

由 [`EventEmitter`][] 触发的事件监听器可能在与调用 `eventEmitter.on()` 时活跃的执行上下文不同的上下文中运行。

以下示例展示了如何使用 `AsyncResource` 类将事件监听器与正确的执行上下文正确关联。相同的方法可以应用于 [`Stream`][] 或类似的事件驱动类。

```mjs
import { createServer } from 'node:http';
import { AsyncResource, executionAsyncId } from 'node:async_hooks';

const server = createServer((req, res) => {
  req.on('close', AsyncResource.bind(() => {
    // 执行上下文绑定到当前的外部作用域。
  }));
  req.on('close', () => {
    // 执行上下文绑定到导致触发 'close' 的作用域。
  });
  res.end();
}).listen(3000);
```

```cjs
const { createServer } = require('node:http');
const { AsyncResource, executionAsyncId } = require('node:async_hooks');

const server = createServer((req, res) => {
  req.on('close', AsyncResource.bind(() => {
    // 执行上下文绑定到当前的外部作用域。
  }));
  req.on('close', () => {
    // 执行上下文绑定到导致触发 'close' 的作用域。
  });
  res.end();
}).listen(3000);
```

[显式资源管理]: https://github.com/tc39/proposal-explicit-resource-management
[`AsyncResource`]: #class-asyncresource
[`EventEmitter`]: events.md#class-eventemitter
[`Stream`]: stream.md#stream
[`Worker`]: worker_threads.md#class-worker
[`asyncLocalStorage.withScope()`]: #asynclocalstoragewithscopestore
[`util.promisify()`]: util.md#utilpromisifyoriginal
