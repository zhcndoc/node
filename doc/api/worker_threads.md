# 工作线程

<!--introduced_in=v10.5.0-->

> 稳定性：2 - 稳定

<!-- source_link=lib/worker_threads.js -->

`node:worker_threads` 模块允许使用并行执行 JavaScript 的线程。要访问它：

```mjs
import worker_threads from 'node:worker_threads';
```

```cjs
'use strict';

const worker_threads = require('node:worker_threads');
```

工作器（线程）适用于执行 CPU 密集型的 JavaScript 操作。它们对 I/O 密集型工作帮助不大。Node.js 内置的异步 I/O 操作比工作器更高效。

与 `child_process` 或 `cluster` 不同，`worker_threads` 可以共享内存。它们通过传输 `ArrayBuffer` 实例或共享 `SharedArrayBuffer` 实例来实现这一点。

```mjs
import {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} from 'node:worker_threads';

if (!isMainThread) {
  const { parse } = await import('some-js-parsing-library');
  const script = workerData;
  parentPort.postMessage(parse(script));
}

export default function parseJSAsync(script) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL(import.meta.url), {
      workerData: script,
    });
    worker.on('message', resolve);
    worker.once('error', reject);
    worker.once('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
};
```

```cjs
'use strict';

const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require('node:worker_threads');

if (isMainThread) {
  module.exports = function parseJSAsync(script) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, {
        workerData: script,
      });
      worker.on('message', resolve);
      worker.once('error', reject);
      worker.once('exit', (code) => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      });
    });
  };
} else {
  const { parse } = require('some-js-parsing-library');
  const script = workerData;
  parentPort.postMessage(parse(script));
}
```

上述示例为每个 `parseJSAsync()` 调用生成一个 Worker 线程。实际上，对于此类任务应使用 Worker 池。否则，创建 Worker 的开销可能会超过其收益。

实现 Worker 池时，使用 [`AsyncResource`][] API 通知诊断工具（例如提供异步堆栈跟踪）关于任务与其结果之间的关联。有关示例实现，请参阅 `async_hooks` 文档中的 ["使用 `AsyncResource` 用于 `Worker` 线程池"][async-resource-worker-pool]。

Worker 线程默认继承非进程特定的选项。参阅 [`Worker 构造函数选项`][] 了解如何自定义工作线程选项，特别是 `argv` 和 `execArgv` 选项。

## `worker_threads.getEnvironmentData(key)`

<!-- YAML
added:
  - v15.12.0
  - v14.18.0
changes:
  - version:
    - v17.5.0
    - v16.15.0
    pr-url: https://github.com/nodejs/node/pull/41272
    description: No longer experimental.
-->

* `key` {any} 任何任意的、可克隆的 JavaScript 值，可用作 {Map} 键。
* 返回：{any}

在工作线程内，`worker.getEnvironmentData()` 返回传递给生成线程的 `worker.setEnvironmentData()` 的数据克隆。每个新 `Worker` 都会自动接收环境数据的自己的副本。

```mjs
import {
  Worker,
  isMainThread,
  setEnvironmentData,
  getEnvironmentData,
} from 'node:worker_threads';

if (isMainThread) {
  setEnvironmentData('Hello', 'World!');
  const worker = new Worker(new URL(import.meta.url));
} else {
  console.log(getEnvironmentData('Hello'));  // 打印 'World!'.
}
```

```cjs
'use strict';

const {
  Worker,
  isMainThread,
  setEnvironmentData,
  getEnvironmentData,
} = require('node:worker_threads');

if (isMainThread) {
  setEnvironmentData('Hello', 'World!');
  const worker = new Worker(__filename);
} else {
  console.log(getEnvironmentData('Hello'));  // 打印 'World!'.
}
```

## `worker_threads.isInternalThread`

<!-- YAML
added:
  - v23.7.0
  - v22.14.0
-->

* 类型：{boolean}

如果此代码在内部 [`Worker`][] 线程（例如加载器线程）内运行，则为 `true`。

```bash
node --experimental-loader ./loader.js main.js
```

```mjs
// loader.js
import { isInternalThread } from 'node:worker_threads';
console.log(isInternalThread);  // true
```

```cjs
// loader.js
'use strict';

const { isInternalThread } = require('node:worker_threads');
console.log(isInternalThread);  // true
```

```mjs
// main.js
import { isInternalThread } from 'node:worker_threads';
console.log(isInternalThread);  // false
```

```cjs
// main.js
'use strict';

const { isInternalThread } = require('node:worker_threads');
console.log(isInternalThread);  // false
```

## `worker_threads.isMainThread`

<!-- YAML
added: v10.5.0
-->

* 类型：{boolean}

如果此代码不在 [`Worker`][] 线程内运行，则为 `true`。

```mjs
import { Worker, isMainThread } from 'node:worker_threads';

if (isMainThread) {
  // 这会在 Worker 实例中重新加载当前文件。
  new Worker(new URL(import.meta.url));
} else {
  console.log('Inside Worker!');
  console.log(isMainThread);  // 打印 'false'.
}
```

```cjs
'use strict';

const { Worker, isMainThread } = require('node:worker_threads');

if (isMainThread) {
  // 这会在 Worker 实例中重新加载当前文件。
  new Worker(__filename);
} else {
  console.log('Inside Worker!');
  console.log(isMainThread);  // 打印 'false'.
}
```

## `worker_threads.markAsUntransferable(object)`

<!-- YAML
added:
  - v14.5.0
  - v12.19.0
-->

* `object` {any} 任何任意的 JavaScript 值。

将对象标记为不可传输。如果 `object` 出现在 [`port.postMessage()`][] 调用的传输列表中，则会抛出错误。如果 `object` 是原始值，则此操作无效。

特别是，这对于可以被克隆而不是传输，并且被发送方其他对象使用的对象是有意义的。例如，Node.js 用它来标记用于 [`Buffer` 池][`Buffer.allocUnsafe()`] 的 `ArrayBuffer`。在此类数组缓冲区实例上禁止使用 `ArrayBuffer.prototype.transfer()`。

此操作无法撤销。

```mjs
import { MessageChannel, markAsUntransferable } from 'node:worker_threads';

const pooledBuffer = new ArrayBuffer(8);
const typedArray1 = new Uint8Array(pooledBuffer);
const typedArray2 = new Float64Array(pooledBuffer);

markAsUntransferable(pooledBuffer);

const { port1 } = new MessageChannel();
try {
  // 这将抛出一个错误，因为 pooledBuffer 不可传输。
  port1.postMessage(typedArray1, [ typedArray1.buffer ]);
} catch (error) {
  // error.name === 'DataCloneError'
}

// 以下行打印 typedArray1 的内容 -- 它仍然拥有
// 其内存且未被传输。如果没有
// `markAsUntransferable()`，这将打印一个空的 Uint8Array 并且
// postMessage 调用会成功。
// typedArray2 也完好无损。
console.log(typedArray1);
console.log(typedArray2);
```

```cjs
'use strict';

const { MessageChannel, markAsUntransferable } = require('node:worker_threads');

const pooledBuffer = new ArrayBuffer(8);
const typedArray1 = new Uint8Array(pooledBuffer);
const typedArray2 = new Float64Array(pooledBuffer);

markAsUntransferable(pooledBuffer);

const { port1 } = new MessageChannel();
try {
  // 这将抛出一个错误，因为 pooledBuffer 不可传输。
  port1.postMessage(typedArray1, [ typedArray1.buffer ]);
} catch (error) {
  // error.name === 'DataCloneError'
}

// 以下行打印 typedArray1 的内容 -- 它仍然拥有
// 其内存且未被传输。如果没有
// `markAsUntransferable()`，这将打印一个空的 Uint8Array 并且
// postMessage 调用会成功。
// typedArray2 也完好无损。
console.log(typedArray1);
console.log(typedArray2);
```

浏览器中没有与此 API 等效的功能。

## `worker_threads.isMarkedAsUntransferable(object)`

<!-- YAML
added: v21.0.0
-->

* `object` {any} 任何 JavaScript 值。
* 返回：{boolean}

检查对象是否被 [`markAsUntransferable()`][] 标记为不可传输。

```mjs
import { markAsUntransferable, isMarkedAsUntransferable } from 'node:worker_threads';

const pooledBuffer = new ArrayBuffer(8);
markAsUntransferable(pooledBuffer);

isMarkedAsUntransferable(pooledBuffer);  // 返回 true。
```

```cjs
'use strict';

const { markAsUntransferable, isMarkedAsUntransferable } = require('node:worker_threads');

const pooledBuffer = new ArrayBuffer(8);
markAsUntransferable(pooledBuffer);

isMarkedAsUntransferable(pooledBuffer);  // 返回 true。
```

浏览器中没有与此 API 等效的功能。

## `worker_threads.markAsUncloneable(object)`

<!-- YAML
added:
 - v23.0.0
 - v22.10.0
-->

* `object` {any} 任何任意的 JavaScript 值。

将对象标记为不可克隆。如果 `object` 在 [`port.postMessage()`][] 调用中用作 [`message`](#event-message)，则会抛出错误。如果 `object` 是原始值，则此操作无效。

这对 `ArrayBuffer` 或任何 `Buffer` 类对象没有影响。

此操作无法撤销。

```mjs
import { markAsUncloneable } from 'node:worker_threads';

const anyObject = { foo: 'bar' };
markAsUncloneable(anyObject);
const { port1 } = new MessageChannel();
try {
  // 这将抛出一个错误，因为 anyObject 不可克隆。
  port1.postMessage(anyObject);
} catch (error) {
  // error.name === 'DataCloneError'
}
```

```cjs
'use strict';

const { markAsUncloneable } = require('node:worker_threads');

const anyObject = { foo: 'bar' };
markAsUncloneable(anyObject);
const { port1 } = new MessageChannel();
try {
  // 这将抛出一个错误，因为 anyObject 不可克隆。
  port1.postMessage(anyObject);
} catch (error) {
  // error.name === 'DataCloneError'
}
```

浏览器中没有与此 API 等效的功能。

## `worker_threads.moveMessagePortToContext(port, contextifiedSandbox)`

<!-- YAML
added: v11.13.0
-->

* `port` {MessagePort} 要传输的消息端口。

* `contextifiedSandbox` {Object} 一个 [contextified][] 对象，由 `vm.createContext()` 方法返回。

* 返回：{MessagePort}

将 `MessagePort` 传输到不同的 [`vm`][] 上下文。原始 `port` 对象变为不可用，返回的 `MessagePort` 实例取代其位置。

返回的 `MessagePort` 是目标上下文中的对象，并继承自其全局 `Object` 类。传递给 [`port.onmessage()`][] 监听器的对象也在目标上下文中创建，并继承自其全局 `Object` 类。

但是，创建的 `MessagePort` 不再继承自 {EventTarget}，只能使用 [`port.onmessage()`][] 来接收事件。

## `worker_threads.parentPort`

<!-- YAML
added: v10.5.0
-->

* 类型：{null|MessagePort}

如果此线程是一个 [`Worker`][]，则这是一个 [`MessagePort`][]，
允许与主线程通信。使用 `parentPort.postMessage()` 发送的消息在主线程中
通过 `worker.on('message')` 可用，而使用 `worker.postMessage()` 从主线程
发送的消息在此线程中通过 `parentPort.on('message')` 可用。

```mjs
import { Worker, isMainThread, parentPort } from 'node:worker_threads';

if (isMainThread) {
  const worker = new Worker(new URL(import.meta.url));
  worker.once('message', (message) => {
    console.log(message);  // 打印 'Hello, world!'。
  });
  worker.postMessage('Hello, world!');
} else {
  // 当收到来自主线程的消息时，将其发回：
  parentPort.once('message', (message) => {
    parentPort.postMessage(message);
  });
}
```

```cjs
'use strict';

const { Worker, isMainThread, parentPort } = require('node:worker_threads');

if (isMainThread) {
  const worker = new Worker(__filename);
  worker.once('message', (message) => {
    console.log(message);  // 打印 'Hello, world!'。
  });
  worker.postMessage('Hello, world!');
} else {
  // 当收到来自主线程的消息时，将其发回：
  parentPort.once('message', (message) => {
    parentPort.postMessage(message);
  });
}
```

## `worker_threads.postMessageToThread(threadId, value[, transferList][, timeout])`

<!-- YAML
added:
- v22.5.0
- v20.19.0
-->

> 稳定性：1.1 - 积极开发中

* `threadId` {number} 目标线程 ID。如果线程 ID 无效，将抛出
  [`ERR_WORKER_MESSAGING_FAILED`][] 错误。如果目标线程 ID 是当前线程 ID，
  将抛出 [`ERR_WORKER_MESSAGING_SAME_THREAD`][] 错误。
* `value` {any} 要发送的值。
* `transferList` {Object\[]} 如果 `value` 中传递了一个或多个 `MessagePort` 类似对象，
  则这些项需要 `transferList`，否则将抛出 [`ERR_MISSING_MESSAGE_PORT_IN_TRANSFER_LIST`][]。
  参见 [`port.postMessage()`][] 获取更多信息。
* `timeout` {number} 等待消息传递的时间（毫秒）。
  默认为 `undefined`，表示永远等待。如果操作超时，
  将抛出 [`ERR_WORKER_MESSAGING_TIMEOUT`][] 错误。
* 返回：{Promise} 如果消息被目标线程成功处理，则履行的 promise。

向另一个 worker 发送一个值，由其线程 ID 标识。

如果目标线程没有 `workerMessage` 事件的监听器，则操作将抛出
[`ERR_WORKER_MESSAGING_FAILED`][] 错误。

如果目标线程在处理 `workerMessage` 事件时抛出错误，则操作将抛出
[`ERR_WORKER_MESSAGING_ERRORED`][] 错误。

当目标线程不是当前线程的直接父线程或子线程时，应使用此方法。
如果两个线程是父子关系，请使用 [`require('node:worker_threads').parentPort.postMessage()`][]
和 [`worker.postMessage()`][] 让线程通信。

下面的示例展示了 `postMessageToThread` 的使用：它创建了 10 个嵌套线程，
最后一个将尝试与主线程通信。

```mjs
import process from 'node:process';
import {
  postMessageToThread,
  threadId,
  workerData,
  Worker,
} from 'node:worker_threads';

const channel = new BroadcastChannel('sync');
const level = workerData?.level ?? 0;

if (level < 10) {
  const worker = new Worker(new URL(import.meta.url), {
    workerData: { level: level + 1 },
  });
}

if (level === 0) {
  process.on('workerMessage', (value, source) => {
    console.log(`${source} -> ${threadId}:`, value);
    postMessageToThread(source, { message: 'pong' });
  });
} else if (level === 10) {
  process.on('workerMessage', (value, source) => {
    console.log(`${source} -> ${threadId}:`, value);
    channel.postMessage('done');
    channel.close();
  });

  await postMessageToThread(0, { message: 'ping' });
}

channel.onmessage = channel.close;
```

```cjs
'use strict';

const process = require('node:process');
const {
  postMessageToThread,
  threadId,
  workerData,
  Worker,
} = require('node:worker_threads');

const channel = new BroadcastChannel('sync');
const level = workerData?.level ?? 0;

if (level < 10) {
  const worker = new Worker(__filename, {
    workerData: { level: level + 1 },
  });
}

if (level === 0) {
  process.on('workerMessage', (value, source) => {
    console.log(`${source} -> ${threadId}:`, value);
    postMessageToThread(source, { message: 'pong' });
  });
} else if (level === 10) {
  process.on('workerMessage', (value, source) => {
    console.log(`${source} -> ${threadId}:`, value);
    channel.postMessage('done');
    channel.close();
  });

  postMessageToThread(0, { message: 'ping' });
}

channel.onmessage = channel.close;
```

## `worker_threads.receiveMessageOnPort(port)`

<!-- YAML
added: v12.3.0
changes:
  - version: v15.12.0
    pr-url: https://github.com/nodejs/node/pull/37535
    description: "port 参数现在也可以引用 `BroadcastChannel`。"
-->

* `port` {MessagePort|BroadcastChannel}

* 返回：{Object|undefined}

从给定的 `MessagePort` 接收单条消息。如果没有可用消息，
则返回 `undefined`，否则返回一个包含单个 `message` 属性的对象，
该属性包含消息负载，对应于 `MessagePort` 队列中最旧的消息。

```mjs
import { MessageChannel, receiveMessageOnPort } from 'node:worker_threads';
const { port1, port2 } = new MessageChannel();
port1.postMessage({ hello: 'world' });

console.log(receiveMessageOnPort(port2));
// 打印：{ message: { hello: 'world' } }
console.log(receiveMessageOnPort(port2));
// 打印：undefined
```

```cjs
'use strict';

const { MessageChannel, receiveMessageOnPort } = require('node:worker_threads');
const { port1, port2 } = new MessageChannel();
port1.postMessage({ hello: 'world' });

console.log(receiveMessageOnPort(port2));
// 打印：{ message: { hello: 'world' } }
console.log(receiveMessageOnPort(port2));
// 打印：undefined
```

使用此函数时，不会发出 `'message'` 事件，也不会调用
`onmessage` 监听器。

## `worker_threads.resourceLimits`

<!-- YAML
added:
 - v13.2.0
 - v12.16.0
-->

* 类型：{Object}
  * `maxYoungGenerationSizeMb` {number}
  * `maxOldGenerationSizeMb` {number}
  * `codeRangeSizeMb` {number}
  * `stackSizeMb` {number}

提供此 Worker 线程内 JS 引擎资源约束的集合。
如果将 `resourceLimits` 选项传递给 [`Worker`][] 构造函数，
则与此值匹配。

如果在主线程中使用此选项，其值为一个空对象。

## `worker_threads.SHARE_ENV`

<!-- YAML
added: v11.14.0
-->

* 类型：{symbol}

一个特殊值，可作为 [`Worker`][] 构造函数的 `env` 选项传递，
以指示当前线程和 Worker 线程应共享对同一组环境变量的读写访问权限。

```mjs
import process from 'node:process';
import { Worker, SHARE_ENV } from 'node:worker_threads';
new Worker('process.env.SET_IN_WORKER = "foo"', { eval: true, env: SHARE_ENV })
  .once('exit', () => {
    console.log(process.env.SET_IN_WORKER);  // 打印 'foo'。
  });
```

```cjs
'use strict';

const { Worker, SHARE_ENV } = require('node:worker_threads');
new Worker('process.env.SET_IN_WORKER = "foo"', { eval: true, env: SHARE_ENV })
  .once('exit', () => {
    console.log(process.env.SET_IN_WORKER);  // 打印 'foo'。
  });
```

## `worker_threads.setEnvironmentData(key[, value])`

<!-- YAML
added:
  - v15.12.0
  - v14.18.0
changes:
  - version:
    - v17.5.0
    - v16.15.0
    pr-url: https://github.com/nodejs/node/pull/41272
    description: 不再是实验性的。
-->

* `key` {any} 任何可用作 {Map} 键的任意可克隆 JavaScript 值。
* `value` {any} 任何将被克隆并自动传递给所有新 `Worker` 实例的任意可克隆 JavaScript 值。如果 `value` 传递
  为 `undefined`，则之前为 `key` 设置的任何值将被删除。

`worker.setEnvironmentData()` API 设置当前线程和从当前上下文
生成的所有新 `Worker` 实例中 `worker.getEnvironmentData()` 的内容。

## `worker_threads.threadId`

<!-- YAML
added: v10.5.0
-->

* 类型：{integer}

当前线程的整数标识符。在相应的 worker 对象上
（如果有的话），它可作为 [`worker.threadId`][] 使用。
此值在单个进程内的每个 [`Worker`][] 实例中都是唯一的。

## `worker_threads.threadName`

<!-- YAML
added:
  - v24.6.0
  - v22.20.0
-->

* {string|null}

当前线程的字符串标识符，如果线程未运行则为 null。
在相应的 worker 对象上（如果有的话），它可作为 [`worker.threadName`][] 使用。

## `worker_threads.workerData`

<!-- YAML
added: v10.5.0
-->

任意 JavaScript 值，包含传递给此线程的 `Worker` 构造函数的数据的克隆。

数据的克隆方式如同使用 [`postMessage()`][`port.postMessage()`]，
根据 [HTML 结构化克隆算法][]。

```mjs
import { Worker, isMainThread, workerData } from 'node:worker_threads';

if (isMainThread) {
  const worker = new Worker(new URL(import.meta.url), { workerData: 'Hello, world!' });
} else {
  console.log(workerData);  // 打印 'Hello, world!'。
}
```

```cjs
'use strict';

const { Worker, isMainThread, workerData } = require('node:worker_threads');

if (isMainThread) {
  const worker = new Worker(__filename, { workerData: 'Hello, world!' });
} else {
  console.log(workerData);  // 打印 'Hello, world!'。
}
```

## `worker_threads.locks`

<!-- YAML
added: v24.5.0
-->

> 稳定性：1 - 实验性

* {LockManager}

一个 [`LockManager`][LockManager] 实例，可用于协调访问同一进程内多个线程之间可能共享的资源。该 API 镜像了
[浏览器 `LockManager`][] 的语义。

### 类：`Lock`

<!-- YAML
added: v24.5.0
-->

`Lock` 接口提供有关通过 [`locks.request()`][locks.request()] 授予的锁的信息。

#### `lock.name`

<!-- YAML
added: v24.5.0
-->

* {string}

锁的名称。

#### `lock.mode`

<!-- YAML
added: v24.5.0
-->

* {string}

锁的模式。`shared` 或 `exclusive`。

### 类：`LockManager`

<!-- YAML
added: v24.5.0
-->

`LockManager` 接口提供请求和内省锁的方法。要获取 `LockManager` 实例，请使用

```mjs
import { locks } from 'node:worker_threads';
```

```cjs
'use strict';

const { locks } = require('node:worker_threads');
```

此实现与 [浏览器 `LockManager`][] API 匹配。

#### `locks.request(name[, options], callback)`

<!-- YAML
added: v24.5.0
-->

* `name` {string}
* `options` {Object}
  * `mode` {string} `'exclusive'` 或 `'shared'`。**默认值：** `'exclusive'`。
  * `ifAvailable` {boolean} 如果为 `true`，则仅当锁未被持有时才授予请求。如果无法授予，`callback` 将
    使用 `null` 调用，而不是 `Lock` 实例。**默认值：** `false`。
  * `steal` {boolean} 如果为 `true`，则释放任何具有相同名称的现有锁，并立即授予请求，抢占任何排队的
    请求。**默认值：** `false`。
  * `signal` {AbortSignal} 可用于中止
    待处理（但尚未授予）锁请求的信号。
* `callback` {Function} 一旦锁被授予则调用（如果 `ifAvailable` 为 `true` 且锁不可用，则立即使用
  `null` 调用）。当函数返回时，锁会自动释放，或者——如果函数返回
  一个 promise——当该 promise 解决时。
* 返回：{Promise} 一旦锁被释放则解决。

```mjs
import { locks } from 'node:worker_threads';

await locks.request('my_resource', async (lock) => {
  // 锁已获取。
});
// 锁在此处已释放。
```

```cjs
'use strict';

const { locks } = require('node:worker_threads');

locks.request('my_resource', async (lock) => {
  // 锁已获取。
}).then(() => {
  // 锁在此处已释放。
});
```

#### `locks.query()`

<!-- YAML
added: v24.5.0
-->

* 返回：{Promise}

解决为一个 `LockManagerSnapshot`，描述当前进程当前持有和待处理的锁。

```mjs
import { locks } from 'node:worker_threads';

const snapshot = await locks.query();
for (const lock of snapshot.held) {
  console.log(`held lock: name ${lock.name}, mode ${lock.mode}`);
}
for (const pending of snapshot.pending) {
  console.log(`pending lock: name ${pending.name}, mode ${pending.mode}`);
}
```

```cjs
'use strict';

const { locks } = require('node:worker_threads');

locks.query().then((snapshot) => {
  for (const lock of snapshot.held) {
    console.log(`held lock: name ${lock.name}, mode ${lock.mode}`);
  }
  for (const pending of snapshot.pending) {
    console.log(`pending lock: name ${pending.name}, mode ${pending.mode}`);
  }
});
```

## 类：`BroadcastChannel extends EventTarget`

<!-- YAML
added: v15.4.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41271
    description: 不再是实验性功能。
-->

`BroadcastChannel` 的实例允许与所有绑定到相同通道名称的其他 `BroadcastChannel` 实例进行异步一对多通信。

```mjs
import {
  isMainThread,
  BroadcastChannel,
  Worker,
} from 'node:worker_threads';

const bc = new BroadcastChannel('hello');

if (isMainThread) {
  let c = 0;
  bc.onmessage = (event) => {
    console.log(event.data);
    if (++c === 10) bc.close();
  };
  for (let n = 0; n < 10; n++)
    new Worker(new URL(import.meta.url));
} else {
  bc.postMessage('hello from every worker');
  bc.close();
}
```

```cjs
'use strict';

const {
  isMainThread,
  BroadcastChannel,
  Worker,
} = require('node:worker_threads');

const bc = new BroadcastChannel('hello');

if (isMainThread) {
  let c = 0;
  bc.onmessage = (event) => {
    console.log(event.data);
    if (++c === 10) bc.close();
  };
  for (let n = 0; n < 10; n++)
    new Worker(__filename);
} else {
  bc.postMessage('hello from every worker');
  bc.close();
}
```

### `new BroadcastChannel(name)`

<!-- YAML
added: v15.4.0
-->

* `name` {any} 要连接的通道名称。允许使用任何可以使用 `` `${name}` `` 转换为字符串的 JavaScript 值。

### `broadcastChannel.close()`

<!-- YAML
added: v15.4.0
-->

关闭 `BroadcastChannel` 连接。

### `broadcastChannel.onmessage`

<!-- YAML
added: v15.4.0
-->

* 类型：{Function} 当收到消息时，使用单个 `MessageEvent` 参数调用。

### `broadcastChannel.onmessageerror`

<!-- YAML
added: v15.4.0
-->

* 类型：{Function} 当收到的消息无法被反序列化时调用。

### `broadcastChannel.postMessage(message)`

<!-- YAML
added: v15.4.0
-->

* `message` {any} 任何可克隆的 JavaScript 值。

### `broadcastChannel.ref()`

<!-- YAML
added: v15.4.0
-->

`unref()` 的反义词。对之前 `unref()` 过的 BroadcastChannel 调用 `ref()` 并不会让程序退出，如果它是唯一留下的活动句柄（默认行为）。如果端口已被 `ref()`，再次调用 `ref()` 无效。

### `broadcastChannel.unref()`

<!-- YAML
added: v15.4.0
-->

在 BroadcastChannel 上调用 `unref()` 允许线程退出，如果这是事件系统中唯一活动的句柄。如果 BroadcastChannel 已经 `unref()`，再次调用 `unref()` 无效。

## 类：`MessageChannel`

<!-- YAML
added: v10.5.0
-->

`worker.MessageChannel` 类的实例表示一个异步的双向通信通道。
`MessageChannel` 没有自己的方法。`new MessageChannel()` 生成一个带有 `port1` 和 `port2` 属性的对象，这些属性引用链接的 [`MessagePort`][] 实例。

```mjs
import { MessageChannel } from 'node:worker_threads';

const { port1, port2 } = new MessageChannel();
port1.on('message', (message) => console.log('received', message));
port2.postMessage({ foo: 'bar' });
// 打印：received { foo: 'bar' } 来自 `port1.on('message')` 监听器
```

```cjs
'use strict';

const { MessageChannel } = require('node:worker_threads');

const { port1, port2 } = new MessageChannel();
port1.on('message', (message) => console.log('received', message));
port2.postMessage({ foo: 'bar' });
// 打印：received { foo: 'bar' } 来自 `port1.on('message')` 监听器
```

## 类：`MessagePort`

<!-- YAML
added: v10.5.0
changes:
  - version:
    - v14.7.0
    pr-url: https://github.com/nodejs/node/pull/34057
    description: "此类现在继承自 `EventTarget` 而不是 `EventEmitter`。"
-->

* 继承自：{EventTarget}

`worker.MessagePort` 类的实例表示异步双向通信通道的一端。它可用于在不同的 [`Worker`][] 之间传输结构化数据、内存区域和其他 `MessagePort`。

此实现与 [浏览器 `MessagePort`][] 匹配。

### 事件：`'close'`

<!-- YAML
added: v10.5.0
-->

当通道的任意一侧断开连接时，会发出 `'close'` 事件。

```mjs
import { MessageChannel } from 'node:worker_threads';
const { port1, port2 } = new MessageChannel();

// 打印：
//   foobar
//   closed!
port2.on('message', (message) => console.log(message));
port2.once('close', () => console.log('closed!'));

port1.postMessage('foobar');
port1.close();
```

```cjs
'use strict';

const { MessageChannel } = require('node:worker_threads');
const { port1, port2 } = new MessageChannel();

// 打印：
//   foobar
//   closed!
port2.on('message', (message) => console.log(message));
port2.once('close', () => console.log('closed!'));

port1.postMessage('foobar');
port1.close();
```

### 事件：`'message'`

<!-- YAML
added: v10.5.0
-->

* `value` {any} 传输的值

对于任何传入的消息，都会发出 `'message'` 事件，包含 [`port.postMessage()`][] 的克隆输入。

此事件的监听器接收传递给 `postMessage()` 的 `value` 参数的克隆，没有进一步的参数。

### 事件：`'messageerror'`

<!-- YAML
added:
  - v14.5.0
  - v12.19.0
-->

* `error` {Error} 一个 Error 对象

当反序列化消息失败时，会发出 `'messageerror'` 事件。

目前，当在接收端实例化发布的 JS 对象发生错误时，会发出此事件。这种情况很少见，但可能会发生，例如，当在 `vm.Context` 中接收到某些 Node.js API 对象时（目前在该上下文中 Node.js API 不可用）。

### `port.close()`

<!-- YAML
added: v10.5.0
-->

禁用连接任一侧的进一步消息发送。
当不再通过此 `MessagePort` 进行通信时，可以调用此方法。

[`'close'` 事件][] 会在属于该通道的两个 `MessagePort` 实例上发出。

### `port.postMessage(value[, transferList])`

<!-- YAML
added: v10.5.0
changes:
  - version: v21.0.0
    pr-url: https://github.com/nodejs/node/pull/47604
    description: 当传输列表中存在不可传输的对象时会抛出错误。
  - version:
      - v15.14.0
      - v14.18.0
    pr-url: https://github.com/nodejs/node/pull/37917
    description: 将 'BlockList' 添加到可克隆类型列表中。
  - version:
      - v15.9.0
      - v14.18.0
    pr-url: https://github.com/nodejs/node/pull/37155
    description: 将 'Histogram' 类型添加到可克隆类型列表中。
  - version: v15.6.0
    pr-url: https://github.com/nodejs/node/pull/36804
    description: "将 `X509Certificate` 添加到可克隆类型列表中。"
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/35093
    description: "将 `CryptoKey` 添加到可克隆类型列表中。"
  - version:
    - v14.5.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/33360
    description: "将 `KeyObject` 添加到可克隆类型列表中。"
  - version:
    - v14.5.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/33772
    description: "将 `FileHandle` 添加到可传输类型列表中。"
-->

* `value` {any}
* `transferList` {Object\[]}

将 JavaScript 值发送到此通道的接收端。
`value` 以与 [HTML 结构化克隆算法][] 兼容的方式进行传输。

特别是，与 `JSON` 的显著区别是：

* `value` 可能包含循环引用。
* `value` 可能包含内置 JS 类型的实例，例如 `RegExp`、`BigInt`、`Map`、`Set` 等。
* `value` 可能包含类型化数组，使用 `ArrayBuffer` 和 `SharedArrayBuffer`。
* `value` 可能包含 [`WebAssembly.Module`][] 实例。
* `value` 可能不包含原生（C++ 支持）对象，除了：
  * {CryptoKey}，
  * {FileHandle}，
  * {Histogram}，
  * {KeyObject}，
  * {MessagePort}，
  * {net.BlockList}，
  * {net.SocketAddress}，
  * {X509Certificate}。

```mjs
import { MessageChannel } from 'node:worker_threads';
const { port1, port2 } = new MessageChannel();

port1.on('message', (message) => console.log(message));

const circularData = {};
circularData.foo = circularData;
// 打印：{ foo: [Circular] }
port2.postMessage(circularData);
```

```cjs
'use strict';

const { MessageChannel } = require('node:worker_threads');
const { port1, port2 } = new MessageChannel();

port1.on('message', (message) => console.log(message));

const circularData = {};
circularData.foo = circularData;
// 打印：{ foo: [Circular] }
port2.postMessage(circularData);
```

`transferList` 可以是 {ArrayBuffer}、[`MessagePort`][] 和 [`FileHandle`][] 对象的列表。
传输后，它们在通道的发送端不再可用（即使它们不包含在 `value` 中）。与 [子进程][] 不同，目前不支持传输网络套接字等句柄。

如果 `value` 包含 {SharedArrayBuffer} 实例，则它们可从任一线程访问。它们不能列在 `transferList` 中。

`value` 可能仍然包含不在 `transferList` 中的 `ArrayBuffer` 实例；在这种情况下，底层内存会被复制而不是移动。

```mjs
import { MessageChannel } from 'node:worker_threads';
const { port1, port2 } = new MessageChannel();

port1.on('message', (message) => console.log(message));

const uint8Array = new Uint8Array([ 1, 2, 3, 4 ]);
// 这会发布 `uint8Array` 的副本：
port2.postMessage(uint8Array);
// 这不会复制数据，但会使 `uint8Array` 不可用：
port2.postMessage(uint8Array, [ uint8Array.buffer ]);

// `sharedUint8Array` 的内存可从原始副本和 `.on('message')` 接收的副本中访问：
const sharedUint8Array = new Uint8Array(new SharedArrayBuffer(4));
port2.postMessage(sharedUint8Array);

// 这将新创建的消息端口传输给接收者。
// 例如，这可用于在作为同一父线程子线程的多个 `Worker` 线程之间创建通信通道。
const otherChannel = new MessageChannel();
port2.postMessage({ port: otherChannel.port1 }, [ otherChannel.port1 ]);
```

```cjs
'use strict';

const { MessageChannel } = require('node:worker_threads');
const { port1, port2 } = new MessageChannel();

port1.on('message', (message) => console.log(message));

const uint8Array = new Uint8Array([ 1, 2, 3, 4 ]);
// 这会发布 `uint8Array` 的副本：
port2.postMessage(uint8Array);
// 这不会复制数据，但会使 `uint8Array` 不可用：
port2.postMessage(uint8Array, [ uint8Array.buffer ]);

// `sharedUint8Array` 的内存可从原始副本和 `.on('message')` 接收的副本中访问：
const sharedUint8Array = new Uint8Array(new SharedArrayBuffer(4));
port2.postMessage(sharedUint8Array);

// 这将新创建的消息端口传输给接收者。
// 例如，这可用于在作为同一父线程子线程的多个 `Worker` 线程之间创建通信通道。
const otherChannel = new MessageChannel();
port2.postMessage({ port: otherChannel.port1 }, [ otherChannel.port1 ]);
```

消息对象会立即被克隆，并且可以在发布后修改而不会产生副作用。

有关此 API 背后的序列化和反序列化机制的更多信息，请参阅 [`node:v8` 模块的序列化 API][v8.serdes]。

#### 传输 TypedArrays 和 Buffers 时的注意事项

所有 {TypedArray|Buffer} 实例都是底层 {ArrayBuffer} 的视图。也就是说，实际上是 `ArrayBuffer` 存储原始数据，而 `TypedArray` 和 `Buffer` 对象提供了一种查看和操作数据的方式。为同一个 `ArrayBuffer` 实例创建多个视图是可能且常见的。在使用传输列表传输 `ArrayBuffer` 时必须非常小心，因为这样做会导致共享该 `ArrayBuffer` 的所有 `TypedArray` 和 `Buffer` 实例变得不可用。

```js
const ab = new ArrayBuffer(10);

const u1 = new Uint8Array(ab);
const u2 = new Uint16Array(ab);

console.log(u2.length);  // 打印 5

port.postMessage(u1, [u1.buffer]);

console.log(u2.length);  // 打印 0
```

具体对于 `Buffer` 实例，底层的 `ArrayBuffer` 是可以传输还是克隆完全取决于实例是如何创建的，这通常无法可靠地确定。

可以使用 [`markAsUntransferable()`][] 标记 `ArrayBuffer`，以指示它应该始终被克隆而从不被传输。

根据 `Buffer` 实例的创建方式，它可能拥有也可能不拥有其底层的 `ArrayBuffer`。除非已知 `Buffer` 实例拥有 `ArrayBuffer`，否则不得传输 `ArrayBuffer`。特别是，对于从内部 `Buffer` 池创建的 `Buffer`（例如使用 `Buffer.from()` 或 `Buffer.allocUnsafe()`），无法传输它们，它们总是被克隆，这会发送整个 `Buffer` 池的副本。这种行为可能会带来意外的高内存使用和可能的安全隐患。

有关 `Buffer` 池化的更多详细信息，请参阅 [`Buffer.allocUnsafe()`][]。

使用 `Buffer.alloc()` 或 `Buffer.allocUnsafeSlow()` 创建的 `Buffer` 实例的 `ArrayBuffer` 始终可以传输，但这样做会使这些 `ArrayBuffer` 的所有其他现有视图不可用。

#### 克隆带有原型、类和访问器的对象时的注意事项

因为对象克隆使用 [HTML 结构化克隆算法][]，所以不可枚举的属性、属性访问器和对象原型不会被保留。特别是，{Buffer} 对象在接收端将被读取为普通的 {Uint8Array}，JavaScript 类的实例将被克隆为普通的 JavaScript 对象。

<!-- eslint-disable no-unused-private-class-members -->

```js
const b = Symbol('b');

class Foo {
  #a = 1;
  constructor() {
    this[b] = 2;
    this.c = 3;
  }

  get d() { return 4; }
}

const { port1, port2 } = new MessageChannel();

port1.onmessage = ({ data }) => console.log(data);

port2.postMessage(new Foo());

// 打印：{ c: 3 }
```

此限制扩展到许多内置对象，例如全局 `URL` 对象：

```js
const { port1, port2 } = new MessageChannel();

port1.onmessage = ({ data }) => console.log(data);

port2.postMessage(new URL('https://example.org'));

// 打印：{ }
```

### `port.hasRef()`

<!-- YAML
added:
  - v18.1.0
  - v16.17.0
changes:
 - version:
    - v24.0.0
    - v22.17.0
   pr-url: https://github.com/nodejs/node/pull/57513
   description: 标记 API 为稳定。
-->

* 返回：{boolean}

如果为 true，`MessagePort` 对象将保持 Node.js 事件循环活动。

### `port.ref()`

<!-- YAML
added: v10.5.0
-->

`unref()` 的反义词。对之前 `unref()` 过的端口调用 `ref()` 并不会让程序退出，如果它是唯一留下的活动句柄（默认行为）。如果端口已被 `ref()`，再次调用 `ref()` 无效。

如果使用 `.on('message')` 附加或移除监听器，端口会根据是否存在事件监听器自动 `ref()` 和 `unref()`。

### `port.start()`

<!-- YAML
added: v10.5.0
-->

开始在此 `MessagePort` 上接收消息。当将此端口用作事件发射器时，一旦附加了 `'message'` 监听器，就会自动调用此方法。

此方法存在是为了与 Web `MessagePort` API 保持一致。在 Node.js 中，它仅用于在没有事件监听器时忽略消息。Node.js 在处理 `.onmessage` 方面也有所不同。设置它会自动调用 `.start()`，但取消设置它会让消息排队，直到设置新的处理程序或端口被丢弃。

### `port.unref()`

<!-- YAML
added: v10.5.0
-->

在端口上调用 `unref()` 允许线程退出，如果这是事件系统中唯一的活动句柄。如果端口已经 `unref()`，再次调用 `unref()` 无效。

如果使用 `.on('message')` 附加或移除监听器，端口会根据是否存在事件监听器自动 `ref()` 和 `unref()`。

## 类：`Worker`

<!-- YAML
added: v10.5.0
-->

* 继承：{EventEmitter}

`Worker` 类代表一个独立的 JavaScript 执行线程。
大多数 Node.js API 在其中可用。

Worker 环境内的显著差异包括：

* [`process.stdin`][]、[`process.stdout`][] 和 [`process.stderr`][]
  流可能会被父线程重定向。
* [`require('node:worker_threads').isMainThread`][] 属性设置为 `false`。
* [`require('node:worker_threads').parentPort`][] 消息端口可用。
* [`process.exit()`][] 不会停止整个程序，只会停止单个线程，
  且 [`process.abort()`][] 不可用。
* [`process.chdir()`][] 和设置组或用户 ID 的 `process` 方法
  不可用。
* [`process.env`][] 是父线程环境变量的副本，
  除非另有指定。对一个副本的更改在其他
  线程中不可见，并且对原生插件不可见（除非
  将 [`worker.SHARE_ENV`][] 作为 `env` 选项传递给
  [`Worker`][] 构造函数）。在 Windows 上，与主线程不同，
  环境变量的副本以区分大小写的方式运行。
* [`process.title`][] 不能被修改。
* 信号不会通过 [`process.on('...')`][Signals events] 交付。
* 由于调用了 [`worker.terminate()`][]，执行可能在任何点停止。
* 来自父进程的 IPC 通道不可访问。
* [`trace_events`][] 模块不受支持。
* 原生插件只有在满足
  [某些条件][Addons worker support] 的情况下才能从多个线程加载。

可以在其他 `Worker` 内部创建 `Worker` 实例。

像 [Web Workers][] 和 [`node:cluster` 模块][] 一样，双向通信
可以通过线程间消息传递实现。在内部，`Worker` 拥有一对内置的 [`MessagePort`][]，
它们在 `Worker` 创建时已经相互关联。虽然父端
的 `MessagePort` 对象没有直接暴露，但其功能通过
父线程 `Worker` 对象上的 [`worker.postMessage()`][] 和 [`worker.on('message')`][] 事件
暴露。

要创建自定义消息通道（鼓励使用自定义通道而不是默认
全局通道，因为它有助于关注点分离），用户可以在任一线程上创建
一个 `MessageChannel` 对象，并通过
预先存在的通道（例如全局通道）将该 `MessageChannel` 上的
其中一个 `MessagePort` 传递给另一个线程。

参见 [`port.postMessage()`][] 以获取有关消息如何传递的更多信息，
以及哪些类型的 JavaScript 值可以成功通过
线程屏障传输。

```mjs
import assert from 'node:assert';
import {
  Worker, MessageChannel, MessagePort, isMainThread, parentPort,
} from 'node:worker_threads';
if (isMainThread) {
  const worker = new Worker(new URL(import.meta.url));
  const subChannel = new MessageChannel();
  worker.postMessage({ hereIsYourPort: subChannel.port1 }, [subChannel.port1]);
  subChannel.port2.on('message', (value) => {
    console.log('received:', value);
  });
} else {
  parentPort.once('message', (value) => {
    assert(value.hereIsYourPort instanceof MessagePort);
    value.hereIsYourPort.postMessage('the worker is sending this');
    value.hereIsYourPort.close();
  });
}
```

```cjs
'use strict';

const assert = require('node:assert');
const {
  Worker, MessageChannel, MessagePort, isMainThread, parentPort,
} = require('node:worker_threads');
if (isMainThread) {
  const worker = new Worker(__filename);
  const subChannel = new MessageChannel();
  worker.postMessage({ hereIsYourPort: subChannel.port1 }, [subChannel.port1]);
  subChannel.port2.on('message', (value) => {
    console.log('received:', value);
  });
} else {
  parentPort.once('message', (value) => {
    assert(value.hereIsYourPort instanceof MessagePort);
    value.hereIsYourPort.postMessage('the worker is sending this');
    value.hereIsYourPort.close();
  });
}
```

### `new Worker(filename[, options])`

<!-- YAML
added: v10.5.0
changes:
  - version:
    - v19.8.0
    - v18.16.0
    pr-url: https://github.com/nodejs/node/pull/46832
    description: "添加了对 `name` 选项的支持，允许为工作线程标题添加名称以便调试。"
  - version: v14.9.0
    pr-url: https://github.com/nodejs/node/pull/34584
    description: "`filename` 参数可以是使用 `data:` 协议的 WHATWG `URL` 对象。"
  - version: v14.9.0
    pr-url: https://github.com/nodejs/node/pull/34394
    description: "`trackUnmanagedFds` 选项默认设置为 `true`。"
  - version:
    - v14.6.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/34303
    description: "引入了 `trackUnmanagedFds` 选项。"
  - version:
     - v13.13.0
     - v12.17.0
    pr-url: https://github.com/nodejs/node/pull/32278
    description: "引入了 `transferList` 选项。"
  - version:
     - v13.12.0
     - v12.17.0
    pr-url: https://github.com/nodejs/node/pull/31664
    description: "`filename` 参数可以是使用 `file:` 协议的 WHATWG `URL` 对象。"
  - version:
     - v13.4.0
     - v12.16.0
    pr-url: https://github.com/nodejs/node/pull/30559
    description: "引入了 `argv` 选项。"
  - version:
     - v13.2.0
     - v12.16.0
    pr-url: https://github.com/nodejs/node/pull/26628
    description: "引入了 `resourceLimits` 选项。"
-->

* `filename` {string|URL} Worker 主脚本或模块的路径。必须是
  绝对路径或相对路径（即相对于当前
  工作目录），以 `./` 或 `../` 开头，或者是使用
  `file:` 或 `data:` 协议的 WHATWG `URL`
  对象。
  当使用 [`data:` URL][] 时，数据根据 MIME 类型使用
  [ECMAScript 模块加载器][] 进行解释。
  如果 `options.eval` 为 `true`，则这是一个包含 JavaScript 代码
  的字符串，而不是路径。
* `options` {Object}
  * `argv` {any\[]} 将被字符串化并追加到
    worker 中的 `process.argv` 的参数列表。这与 `workerData`
    非常相似，但这些值在全局 `process.argv` 上可用，就像它们
    作为 CLI 选项传递给脚本一样。
  * `env` {Object} 如果设置，指定 Worker 线程内部
    `process.env` 的初始值。作为一个特殊值，[`worker.SHARE_ENV`][] 可用于
    指定父线程和子线程应共享它们的
    环境变量；在这种情况下，对一个线程的 `process.env`
    对象的更改也会影响另一个线程。**默认：** `process.env`。
  * `eval` {boolean} 如果为 `true` 且第一个参数是 `string`，则将
    构造函数的第一个参数解释为一旦
    worker 上线就执行的脚本。
  * `execArgv` {string\[]} 传递给 worker 的 node CLI 选项列表。
    V8 选项（如 `--max-old-space-size`）和影响
    进程的选项（如 `--title`）不受支持。如果设置，这将作为
    worker 内部的 [`process.execArgv`][] 提供。默认情况下，选项
    从父线程继承。
  * `stdin` {boolean} 如果设置为 `true`，则 `worker.stdin`
    提供一个可写流，其内容在 Worker 内部显示为 `process.stdin`
    。默认情况下，不提供数据。
  * `stdout` {boolean} 如果设置为 `true`，则 `worker.stdout`
    不会自动管道传输到父级的 `process.stdout`。
  * `stderr` {boolean} 如果设置为 `true`，则 `worker.stderr`
    不会自动管道传输到父级的 `process.stderr`。
  * `workerData` {any} 任何被克隆并作为
    [`require('node:worker_threads').workerData`][] 可用的 JavaScript 值。克隆
    如 [HTML 结构化克隆算法][] 中所述，如果对象无法被克隆（例如因为它包含
    `function`），则会抛出错误。
  * `trackUnmanagedFds` {boolean} 如果设置为 `true`，则 Worker
    跟踪通过 [`fs.open()`][] 和
    [`fs.close()`][] 管理的原始文件描述符，并在 Worker 退出时关闭它们，类似于通过
    [`FileHandle`][] API 管理的网络套接字或文件描述符等其他
    资源。此选项会自动被所有
    嵌套 `Worker` 继承。**默认：** `true`。
  * `transferList` {Object\[]} 如果一个或多个 `MessagePort` 类对象
    在 `workerData` 中传递，则这些
    项需要 `transferList`，否则将抛出 [`ERR_MISSING_MESSAGE_PORT_IN_TRANSFER_LIST`][]。
    参见 [`port.postMessage()`][] 以获取更多信息。
  * `resourceLimits` {Object} 新 JS
    引擎实例的一组可选资源限制。达到这些限制会导致 `Worker`
    实例终止。这些限制仅影响 JS 引擎，不影响外部数据，
    包括 `ArrayBuffer`。即使设置了这些限制，如果进程遇到全局内存不足情况，
    仍可能中止。
    * `maxOldGenerationSizeMb` {number} 主堆的最大大小，单位为
      MB。如果设置了命令行参数 [`--max-old-space-size`][]，它将
      覆盖此设置。
    * `maxYoungGenerationSizeMb` {number} 最近创建的对象的堆空间的最大大小。如果设置了命令行参数
      [`--max-semi-space-size`][]，它将覆盖此设置。
    * `codeRangeSizeMb` {number} 用于生成代码的预分配内存范围的大小。
    * `stackSizeMb` {number} 线程的默认最大栈大小。
      小值可能导致 Worker 实例不可用。**默认：** `4`。
  * `name` {string} 一个可选的 `name`，用于替换线程名称
    和工作线程标题，以便调试/识别，
    使最终标题为 `[worker ${id}] ${name}`。
    此参数有一个最大允许大小，取决于操作
    系统。如果提供的名称超过限制，它将被截断。
    * 最大大小：
      * Windows: 32,767 个字符
      * macOS: 64 个字符
      * Linux: 16 个字符
      * NetBSD: 限制为 `PTHREAD_MAX_NAMELEN_NP`
      * FreeBSD 和 OpenBSD: 限制为 `MAXCOMLEN`
        **默认：** `'WorkerThread'`。

### 事件：`'error'`

<!-- YAML
added: v10.5.0
-->

* `err` {any}

如果工作线程抛出未捕获的异常，则会发出 `'error'` 事件。在这种情况下，worker 将被终止。

### 事件：`'exit'`

<!-- YAML
added: v10.5.0
-->

* `exitCode` {integer}

一旦 worker 停止，就会发出 `'exit'` 事件。如果 worker
通过调用 [`process.exit()`][] 退出，`exitCode` 参数是
传递的退出代码。如果 worker 被终止，`exitCode` 参数是
`1`。

这是任何 `Worker` 实例发出的最后一个事件。

### 事件：`'message'`

<!-- YAML
added: v10.5.0
-->

* `value` {any} 传输的值

当工作线程调用了
[`require('node:worker_threads').parentPort.postMessage()`][] 时，会发出 `'message'` 事件。
参见 [`port.on('message')`][] 事件以获取更多详情。

所有从工作线程发送的消息都在
`Worker` 对象上发出 [`'exit'` 事件][] 之前发出。

### 事件：`'messageerror'`

<!-- YAML
added:
  - v14.5.0
  - v12.19.0
-->

* `error` {Error} 一个 Error 对象

当反序列化消息失败时，会发出 `'messageerror'` 事件。

### 事件：`'online'`

<!-- YAML
added: v10.5.0
-->

当工作线程开始执行
JavaScript 代码时，会发出 `'online'` 事件。

### `worker.cpuUsage([prev])`

<!-- YAML
added:
 - v24.6.0
 - v22.19.0
-->

* 返回：{Promise}

此方法返回一个 `Promise`，该 Promise 将解析为与 [`process.threadCpuUsage()`][] 相同的对象，
如果 worker 不再运行，则拒绝并抛出 [`ERR_WORKER_NOT_RUNNING`][] 错误。
此方法允许从实际线程外部观察统计信息。

### `worker.getHeapSnapshot([options])`

<!-- YAML
added:
 - v13.9.0
 - v12.17.0
changes:
  - version: v19.1.0
    pr-url: https://github.com/nodejs/node/pull/44989
    description: 支持配置堆快照的选项。
-->

* `options` {Object}
  * `exposeInternals` {boolean} 如果为 true，则在堆快照中暴露内部信息。
    **默认：** `false`。
  * `exposeNumericValues` {boolean} 如果为 true，则在
    人工字段中暴露数值。**默认：** `false`。
* 返回：{Promise} 一个包含
  V8 堆快照的可读流的 Promise

返回一个可读流，用于获取 Worker 当前状态的 V8 快照。
参见 [`v8.getHeapSnapshot()`][] 以获取更多详情。

如果 Worker 线程不再运行（这可能发生在
[`'exit'` 事件][] 发出之前），返回的 `Promise` 将立即
被 [`ERR_WORKER_NOT_RUNNING`][] 错误拒绝。

### `worker.getHeapStatistics()`

<!-- YAML
added:
- v24.0.0
- v22.16.0
-->

* 返回：{Promise}

此方法返回一个 `Promise`，该 Promise 将解析为与 [`v8.getHeapStatistics()`][] 相同的对象，
如果 worker 不再运行，则拒绝并抛出 [`ERR_WORKER_NOT_RUNNING`][] 错误。
此方法允许从实际线程外部观察统计信息。

### `worker.performance`

<!-- YAML
added:
  - v15.1.0
  - v14.17.0
  - v12.22.0
-->

一个可用于查询 worker
实例性能信息的对象。

#### `performance.eventLoopUtilization([utilization1[, utilization2]])`

<!-- YAML
added:
  - v15.1.0
  - v14.17.0
  - v12.22.0
-->

* `utilization1` {Object} 之前调用
  `eventLoopUtilization()` 的结果。
* `utilization2` {Object} 在 `utilization1` 之前调用
  `eventLoopUtilization()` 的结果。
* 返回：{Object}
  * `idle` {number}
  * `active` {number}
  * `utilization` {number}

与 [`perf_hooks` `eventLoopUtilization()`][] 相同的调用，但返回的是
worker 实例的值。

一个区别是，与主线程不同，worker 内的引导是在
事件循环内完成的。因此，一旦 worker 的脚本开始执行，
事件循环利用率立即可用。

`idle` 时间不增加并不表示 worker 卡在引导过程中。以下示例显示 worker 的整个
生命周期从未积累任何 `idle` 时间，但仍能够处理
消息。

```mjs
import { Worker, isMainThread, parentPort } from 'node:worker_threads';

if (isMainThread) {
  const worker = new Worker(new URL(import.meta.url));
  setInterval(() => {
    worker.postMessage('hi');
    console.log(worker.performance.eventLoopUtilization());
  }, 100).unref();
} else {
  parentPort.on('message', () => console.log('msg')).unref();
  (function r(n) {
    if (--n < 0) return;
    const t = Date.now();
    while (Date.now() - t < 300);
    setImmediate(r, n);
  })(10);
}
```

```cjs
'use strict';

const { Worker, isMainThread, parentPort } = require('node:worker_threads');

if (isMainThread) {
  const worker = new Worker(__filename);
  setInterval(() => {
    worker.postMessage('hi');
    console.log(worker.performance.eventLoopUtilization());
  }, 100).unref();
} else {
  parentPort.on('message', () => console.log('msg')).unref();
  (function r(n) {
    if (--n < 0) return;
    const t = Date.now();
    while (Date.now() - t < 300);
    setImmediate(r, n);
  })(10);
}
```

Worker 的事件循环利用率仅在发出 [`'online'`
事件][] 后可用，如果在此之前调用，或在 [`'exit'`
事件][] 之后调用，则所有属性的值为 `0`。

### `worker.postMessage(value[, transferList])`

<!-- YAML
added: v10.5.0
-->

* `value` {any}
* `transferList` {Object\[]}

发送消息给 worker，该消息通过
[`require('node:worker_threads').parentPort.on('message')`][] 接收。
参见 [`port.postMessage()`][] 以获取更多详情。

### `worker.ref()`

<!-- YAML
added: v10.5.0
-->

`unref()` 的反操作，对之前 `unref()` 过的 worker 调用 `ref()`
_不会_ 让程序退出，如果它是唯一活动的句柄（默认
行为）。如果 worker 是 `ref()` 过的，再次调用 `ref()`
没有效果。

### `worker.resourceLimits`

<!-- YAML
added:
 - v13.2.0
 - v12.16.0
-->

* 类型：{Object}
  * `maxYoungGenerationSizeMb` {number}
  * `maxOldGenerationSizeMb` {number}
  * `codeRangeSizeMb` {number}
  * `stackSizeMb` {number}

提供此 Worker 线程的 JS 引擎资源约束集。
如果将 `resourceLimits` 选项传递给了 [`Worker`][] 构造函数，
则与此值匹配。

如果 worker 已停止，返回值为一个空对象。

### `worker.startCpuProfile()`

<!-- YAML
added: v24.8.0
-->

* 返回：{Promise}

启动 CPU 性能分析，然后返回一个 Promise，该 Promise 兑现为一个错误
或一个 `CPUProfileHandle` 对象。此 API 支持 `await using` 语法。

```cjs
const { Worker } = require('node:worker_threads');

const worker = new Worker(`
  const { parentPort } = require('worker_threads');
  parentPort.on('message', () => {});
  `, { eval: true });

worker.on('online', async () => {
  const handle = await worker.startCpuProfile();
  const profile = await handle.stop();
  console.log(profile);
  worker.terminate();
});
```

`await using` 示例。

```cjs
const { Worker } = require('node:worker_threads');

const w = new Worker(`
  const { parentPort } = require('node:worker_threads');
  parentPort.on('message', () => {});
  `, { eval: true });

w.on('online', async () => {
  // 返回时自动停止性能分析，且性能分析将被丢弃
  await using handle = await w.startCpuProfile();
});
```

### `worker.startHeapProfile()`

<!-- YAML
added:
  - v24.9.0
  - v22.20.0
-->

* 返回：{Promise}

启动堆性能分析，然后返回一个 Promise，该 Promise 兑现为一个错误
或一个 `HeapProfileHandle` 对象。此 API 支持 `await using` 语法。

```cjs
const { Worker } = require('node:worker_threads');

const worker = new Worker(`
  const { parentPort } = require('worker_threads');
  parentPort.on('message', () => {});
  `, { eval: true });

worker.on('online', async () => {
  const handle = await worker.startHeapProfile();
  const profile = await handle.stop();
  console.log(profile);
  worker.terminate();
});
```

`await using` 示例。

```cjs
const { Worker } = require('node:worker_threads');

const w = new Worker(`
  const { parentPort } = require('node:worker_threads');
  parentPort.on('message', () => {});
  `, { eval: true });

w.on('online', async () => {
  // 返回时自动停止性能分析，且性能分析将被丢弃
  await using handle = await w.startHeapProfile();
});
```

### `worker.stderr`

<!-- YAML
added: v10.5.0
-->

* 类型：{stream.Readable}

这是一个可读流，包含在 worker 线程内写入 [`process.stderr`][]
的数据。如果未将 `stderr: true` 传递给
[`Worker`][] 构造函数，则数据会管道传输到父线程的
[`process.stderr`][] 流。

### `worker.stdin`

<!-- YAML
added: v10.5.0
-->

* 类型：{null|stream.Writable}

如果将 `stdin: true` 传递给了 [`Worker`][] 构造函数，这是一个
可写流。写入此流的数据将在
worker 线程中作为 [`process.stdin`][] 可用。

### `worker.stdout`

<!-- YAML
added: v10.5.0
-->

* 类型：{stream.Readable}

这是一个可读流，包含在 worker 线程内写入 [`process.stdout`][]
的数据。如果未将 `stdout: true` 传递给
[`Worker`][] 构造函数，则数据会管道传输到父线程的
[`process.stdout`][] 流。

### `worker.terminate()`

<!-- YAML
added: v10.5.0
changes:
  - version: v12.5.0
    pr-url: https://github.com/nodejs/node/pull/28021
    description: 此函数现在返回一个 Promise。传递回调函数已废弃，且在此版本之前无用，因为 Worker 实际上是同步终止的。终止现在是一个完全异步的操作。
-->

* 返回：{Promise}

尽快停止 worker 线程中的所有 JavaScript 执行。
返回一个 Promise，用于获取退出代码，当
[`'exit'` 事件][] 发出时兑现。

### `worker.threadId`

<!-- YAML
added: v10.5.0
-->

* 类型：{integer}

引用线程的整数标识符。在 worker 线程内部，
它作为 [`require('node:worker_threads').threadId`][] 可用。
此值在单个进程内的每个 `Worker` 实例中是唯一的。

### `worker.threadName`

<!-- YAML
added:
  - v24.6.0
  - v22.20.0
-->

* {string|null}

引用线程的字符串标识符，如果线程未运行则为 null。
在 worker 线程内部，它作为 [`require('node:worker_threads').threadName`][] 可用。

### `worker.unref()`

<!-- YAML
added: v10.5.0
-->

对 worker 调用 `unref()` 允许线程退出，如果这是事件系统中唯一
活动的句柄。如果 worker 已经 `unref()` 过，再次调用
`unref()` 没有效果。

### `worker[Symbol.asyncDispose]()`

<!-- YAML
added:
 - v24.2.0
 - v22.18.0
-->

当处置作用域退出时调用 [`worker.terminate()`][]。

```js
async function example() {
  await using worker = new Worker('for (;;) {}', { eval: true });
  // 当作用域退出时，Worker 会自动终止。
}
```

## 注意事项

### stdio 的同步阻塞

`Worker` 通过 {MessagePort} 利用消息传递来实现与 `stdio` 的交互。这意味着源自 `Worker` 的 `stdio` 输出可能会被接收端阻塞 Node.js 事件循环的同步代码所阻塞。

```mjs
import {
  Worker,
  isMainThread,
} from 'node:worker_threads';

if (isMainThread) {
  new Worker(new URL(import.meta.url));
  for (let n = 0; n < 1e10; n++) {
    // 循环以模拟工作。
  }
} else {
  // 此输出将被主线程中的 for 循环阻塞。
  console.log('foo');
}
```

```cjs
'use strict';

const {
  Worker,
  isMainThread,
} = require('node:worker_threads');

if (isMainThread) {
  new Worker(__filename);
  for (let n = 0; n < 1e10; n++) {
    // 循环以模拟工作。
  }
} else {
  // 此输出将被主线程中的 for 循环阻塞。
  console.log('foo');
}
```

### 从预加载脚本启动工作线程

从预加载脚本（使用 `-r` 命令行标志加载和运行的脚本）启动工作线程时要小心。除非显式设置了 `execArgv` 选项，否则新的 Worker 线程会自动继承正在运行的进程的命令行标志，并将预加载与主线程相同的预加载脚本。如果预加载脚本无条件地启动工作线程，则每个生成的线程都会再生成另一个线程，直到应用程序崩溃。

[插件工作线程支持]: addons.md#worker-support
[ECMAScript 模块加载器]: esm.md#data-imports
[HTML 结构化克隆算法]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
[LockManager]: #class-lockmanager
[信号事件]: process.md#signal-events
[Web Workers]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API
[`'close'` 事件]: #event-close
[`'exit'` 事件]: #event-exit
[`'online'` 事件]: #event-online
[`--max-old-space-size`]: cli.md#--max-old-space-sizesize-in-mib
[`--max-semi-space-size`]: cli.md#--max-semi-space-sizesize-in-mib
[`AsyncResource`]: async_hooks.md#class-asyncresource
[`Buffer.allocUnsafe()`]: buffer.md#static-method-bufferallocunsafesize
[`ERR_MISSING_MESSAGE_PORT_IN_TRANSFER_LIST`]: errors.md#err_missing_message_port_in_transfer_list
[`ERR_WORKER_MESSAGING_ERRORED`]: errors.md#err_worker_messaging_errored
[`ERR_WORKER_MESSAGING_FAILED`]: errors.md#err_worker_messaging_failed
[`ERR_WORKER_MESSAGING_SAME_THREAD`]: errors.md#err_worker_messaging_same_thread
[`ERR_WORKER_MESSAGING_TIMEOUT`]: errors.md#err_worker_messaging_timeout
[`ERR_WORKER_NOT_RUNNING`]: errors.md#err_worker_not_running
[`FileHandle`]: fs.md#class-filehandle
[`MessagePort`]: #class-messageport
[`WebAssembly.Module`]: https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Module
[`Worker 构造函数选项`]: #new-workerfilename-options
[`Worker`]: #class-worker
[`data:` URL]: https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Schemes/data
[`fs.close()`]: fs.md#fsclosefd-callback
[`fs.open()`]: fs.md#fsopenpath-flags-mode-callback
[`markAsUntransferable()`]: #worker_threadsmarkasuntransferableobject
[`node:cluster` 模块]: cluster.md
[`perf_hooks` `eventLoopUtilization()`]: perf_hooks.md#perf_hookseventlooputilizationutilization1-utilization2
[`port.on('message')`]: #event-message
[`port.onmessage()`]: https://developer.mozilla.org/en-US/docs/Web/API/MessagePort/message_event
[`port.postMessage()`]: #portpostmessagevalue-transferlist
[`process.abort()`]: process.md#processabort
[`process.chdir()`]: process.md#processchdirdirectory
[`process.env`]: process.md#processenv
[`process.execArgv`]: process.md#processexecargv
[`process.exit()`]: process.md#processexitcode
[`process.stderr`]: process.md#processstderr
[`process.stdin`]: process.md#processstdin
[`process.stdout`]: process.md#processstdout
[`process.threadCpuUsage()`]: process.md#processthreadcpuusagepreviousvalue
[`process.title`]: process.md#processtitle
[`require('node:worker_threads').isMainThread`]: #worker_threadsismainthread
[`require('node:worker_threads').parentPort.on('message')`]: #event-message
[`require('node:worker_threads').parentPort.postMessage()`]: #workerpostmessagevalue-transferlist
[`require('node:worker_threads').parentPort`]: #worker_threadsparentport
[`require('node:worker_threads').threadId`]: #worker_threadsthreadid
[`require('node:worker_threads').threadName`]: #worker_threadsthreadname
[`require('node:worker_threads').workerData`]: #worker_threadsworkerdata
[`trace_events`]: tracing.md
[`v8.getHeapSnapshot()`]: v8.md#v8getheapsnapshotoptions
[`v8.getHeapStatistics()`]: v8.md#v8getheapstatistics
[`vm`]: vm.md
[`worker.SHARE_ENV`]: #worker_threadsshare_env
[`worker.on('message')`]: #event-message_1
[`worker.postMessage()`]: #workerpostmessagevalue-transferlist
[`worker.terminate()`]: #workerterminate
[`worker.threadId`]: #workerthreadid
[`worker.threadName`]: #workerthreadname
[async-resource-worker-pool]: async_context.md#using-asyncresource-for-a-worker-thread-pool
[浏览器 `LockManager`]: https://developer.mozilla.org/en-US/docs/Web/API/LockManager
[浏览器 `MessagePort`]: https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
[子进程]: child_process.md
[上下文化]: vm.md#what-does-it-mean-to-contextify-an-object
[locks.request()]: #locksrequestname-options-callback
[v8.serdes]: v8.md#serialization-api
