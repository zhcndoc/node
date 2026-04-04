# 事件

<!--introduced_in=v0.10.0-->

> 稳定性：2 - 稳定

<!--type=module-->

<!-- source_link=lib/events.js -->

Node.js 核心 API 的大部分都是围绕惯用的异步事件驱动架构构建的，其中某些类型的对象（称为“发射器”）发出命名事件，从而导致调用 `Function` 对象（“监听器”）。

例如：[`net.Server`][] 对象每次有对等方连接时都会发出一个事件；[`fs.ReadStream`][] 在文件打开时发出一个事件；[stream][] 每当有数据可供读取时就会发出一个事件。

所有发出事件的对象都是 `EventEmitter` 类的实例。这些对象暴露了一个 `eventEmitter.on()` 函数，允许将一个或多个函数附加到对象发出的命名事件上。通常，事件名称是驼峰式字符串，但任何有效的 JavaScript 属性键都可以使用。

当 `EventEmitter` 对象发出事件时，所有附加到该特定事件的函数都会 _同步_ 调用。被调用的监听器返回的任何值都会被 _忽略_ 并丢弃。

以下示例展示了一个带有单个监听器的简单 `EventEmitter` 实例。`eventEmitter.on()` 方法用于注册监听器，而 `eventEmitter.emit()` 方法用于触发事件。

```mjs
import { EventEmitter } from 'node:events';

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
myEmitter.emit('event');
```

```cjs
const EventEmitter = require('node:events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
myEmitter.emit('event');
```

## 向监听器传递参数和 `this`

`eventEmitter.emit()` 方法允许将任意一组参数传递给监听器函数。请记住，当调用普通监听器函数时，标准的 `this` 关键字会被有意设置为引用监听器所附加的 `EventEmitter` 实例。

```mjs
import { EventEmitter } from 'node:events';
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
myEmitter.on('event', function(a, b) {
  console.log(a, b, this, this === myEmitter);
  // 打印：
  //   a b MyEmitter {
  //     _events: [Object: null prototype] { event: [Function (anonymous)] },
  //     _eventsCount: 1,
  //     _maxListeners: undefined,
  //     Symbol(shapeMode): false,
  //     Symbol(kCapture): false
  //   } true
});
myEmitter.emit('event', 'a', 'b');
```

```cjs
const EventEmitter = require('node:events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
myEmitter.on('event', function(a, b) {
  console.log(a, b, this, this === myEmitter);
  // 打印：
  //   a b MyEmitter {
  //     _events: [Object: null prototype] { event: [Function (anonymous)] },
  //     _eventsCount: 1,
  //     _maxListeners: undefined,
  //     Symbol(shapeMode): false,
  //     Symbol(kCapture): false
  //   } true
});
myEmitter.emit('event', 'a', 'b');
```

可以使用 ES6 箭头函数作为监听器，但是，这样做时，`this` 关键字将不再引用 `EventEmitter` 实例：

```mjs
import { EventEmitter } from 'node:events';
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
myEmitter.on('event', (a, b) => {
  console.log(a, b, this);
  // 打印：a b undefined
});
myEmitter.emit('event', 'a', 'b');
```

```cjs
const EventEmitter = require('node:events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
myEmitter.on('event', (a, b) => {
  console.log(a, b, this);
  // 打印：a b {}
});
myEmitter.emit('event', 'a', 'b');
```

## 异步与同步

`EventEmitter` 按注册顺序同步调用所有监听器。这确保了事件的正确顺序，并有助于避免竞态条件和逻辑错误。在适当的时候，监听器函数可以使用 `setImmediate()` 或 `process.nextTick()` 方法切换到异步操作模式：

```mjs
import { EventEmitter } from 'node:events';
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
myEmitter.on('event', (a, b) => {
  setImmediate(() => {
    console.log('this happens asynchronously');
  });
});
myEmitter.emit('event', 'a', 'b');
```

```cjs
const EventEmitter = require('node:events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
myEmitter.on('event', (a, b) => {
  setImmediate(() => {
    console.log('this happens asynchronously');
  });
});
myEmitter.emit('event', 'a', 'b');
```

## 仅处理一次事件

当使用 `eventEmitter.on()` 方法注册监听器时，每次发出命名事件时都会调用该监听器。

```mjs
import { EventEmitter } from 'node:events';
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
let m = 0;
myEmitter.on('event', () => {
  console.log(++m);
});
myEmitter.emit('event');
// 打印：1
myEmitter.emit('event');
// 打印：2
```

```cjs
const EventEmitter = require('node:events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
let m = 0;
myEmitter.on('event', () => {
  console.log(++m);
});
myEmitter.emit('event');
// 打印：1
myEmitter.emit('event');
// 打印：2
```

使用 `eventEmitter.once()` 方法，可以注册一个针对特定事件最多调用一次的监听器。一旦事件发出，监听器会被注销，_然后_ 被调用。

```mjs
import { EventEmitter } from 'node:events';
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
let m = 0;
myEmitter.once('event', () => {
  console.log(++m);
});
myEmitter.emit('event');
// 打印：1
myEmitter.emit('event');
// 已忽略
```

```cjs
const EventEmitter = require('node:events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
let m = 0;
myEmitter.once('event', () => {
  console.log(++m);
});
myEmitter.emit('event');
// 打印：1
myEmitter.emit('event');
// 已忽略
```

## 错误事件

当 `EventEmitter` 实例内发生错误时，典型的操作是发出 `'error'` 事件。这些在 Node.js 中被视为特殊情况。

如果 `EventEmitter` _没有_ 为 `'error'` 事件注册至少一个监听器，并且发出了 `'error'` 事件，则会抛出错误，打印堆栈跟踪，并且 Node.js 进程退出。

```mjs
import { EventEmitter } from 'node:events';
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
myEmitter.emit('error', new Error('whoops!'));
// 抛出错误并使 Node.js 崩溃
```

```cjs
const EventEmitter = require('node:events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
myEmitter.emit('error', new Error('whoops!'));
// 抛出错误并使 Node.js 崩溃
```

为了防止 Node.js 进程崩溃，可以使用 [`domain`][] 模块。（但是请注意，`node:domain` 模块已弃用。）

作为最佳实践，应该始终为 `'error'` 事件添加监听器。

```mjs
import { EventEmitter } from 'node:events';
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
myEmitter.on('error', (err) => {
  console.error('whoops! there was an error');
});
myEmitter.emit('error', new Error('whoops!'));
// 打印：whoops! there was an error
```

```cjs
const EventEmitter = require('node:events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
myEmitter.on('error', (err) => {
  console.error('whoops! there was an error');
});
myEmitter.emit('error', new Error('whoops!'));
// 打印：whoops! there was an error
```

可以通过使用符号 `events.errorMonitor` 安装监听器来监控 `'error'` 事件，而不消耗发出的错误。

```mjs
import { EventEmitter, errorMonitor } from 'node:events';

const myEmitter = new EventEmitter();
myEmitter.on(errorMonitor, (err) => {
  MyMonitoringTool.log(err);
});
myEmitter.emit('error', new Error('whoops!'));
// 仍然抛出错误并使 Node.js 崩溃
```

```cjs
const { EventEmitter, errorMonitor } = require('node:events');

const myEmitter = new EventEmitter();
myEmitter.on(errorMonitor, (err) => {
  MyMonitoringTool.log(err);
});
myEmitter.emit('error', new Error('whoops!'));
// 仍然抛出错误并使 Node.js 崩溃
```

## 捕获 Promise 的拒绝

在事件处理程序中使用 `async` 函数是有问题的，因为如果抛出异常，可能会导致未处理的拒绝：

```mjs
import { EventEmitter } from 'node:events';
const ee = new EventEmitter();
ee.on('something', async (value) => {
  throw new Error('kaboom');
});
```

```cjs
const EventEmitter = require('node:events');
const ee = new EventEmitter();
ee.on('something', async (value) => {
  throw new Error('kaboom');
});
```

`EventEmitter` 构造函数中的 `captureRejections` 选项或全局设置会更改此行为，在 `Promise` 上安装 `.then(undefined, handler)` 处理程序。此处理程序将异常异步路由到 [`Symbol.for('nodejs.rejection')`][rejection] 方法（如果存在），或者路由到 [`'error'`][error] 事件处理程序（如果不存在）。

```mjs
import { EventEmitter } from 'node:events';
const ee1 = new EventEmitter({ captureRejections: true });
ee1.on('something', async (value) => {
  throw new Error('kaboom');
});

ee1.on('error', console.log);

const ee2 = new EventEmitter({ captureRejections: true });
ee2.on('something', async (value) => {
  throw new Error('kaboom');
});

ee2[Symbol.for('nodejs.rejection')] = console.log;
```

```cjs
const EventEmitter = require('node:events');
const ee1 = new EventEmitter({ captureRejections: true });
ee1.on('something', async (value) => {
  throw new Error('kaboom');
});

ee1.on('error', console.log);

const ee2 = new EventEmitter({ captureRejections: true });
ee2.on('something', async (value) => {
  throw new Error('kaboom');
});

ee2[Symbol.for('nodejs.rejection')] = console.log;
```

设置 `events.captureRejections = true` 将更改所有新 `EventEmitter` 实例的默认值。

```mjs
import { EventEmitter } from 'node:events';

EventEmitter.captureRejections = true;
const ee1 = new EventEmitter();
ee1.on('something', async (value) => {
  throw new Error('kaboom');
});

ee1.on('error', console.log);
```

```cjs
const events = require('node:events');
events.captureRejections = true;
const ee1 = new events.EventEmitter();
ee1.on('something', async (value) => {
  throw new Error('kaboom');
});

ee1.on('error', console.log);
```

由 `captureRejections` 行为生成的 `'error'` 事件没有 catch 处理程序以避免无限错误循环：建议 **不要将 `async` 函数用作 `'error'` 事件处理程序**。

## 类：`EventEmitter`

<!-- YAML
added: v0.1.26
changes:
  - version:
     - v13.4.0
     - v12.16.0
    pr-url: https://github.com/nodejs/node/pull/27867
    description: Added captureRejections option.
-->

`EventEmitter` 类由 `node:events` 模块定义并暴露：

```mjs
import { EventEmitter } from 'node:events';
```

```cjs
const EventEmitter = require('node:events');
```

所有 `EventEmitter` 实例在添加新监听器时会触发 `'newListener'` 事件，在移除现有监听器时会触发 `'removeListener'` 事件。

它支持以下选项：

* `captureRejections` {boolean} 启用 [自动捕获 Promise 拒绝][capturerejections]。
  **默认值：** `false`。

### 事件：`'newListener'`

<!-- YAML
added: v0.1.26
-->

* `eventName` {string|symbol} 被监听的事件名称
* `listener` {Function} 事件处理函数

`EventEmitter` 实例会在将监听器添加到其内部监听器数组 _之前_ 触发其自身的 `'newListener'` 事件。

注册给 `'newListener'` 事件的监听器会被传入事件名称和正在被添加的监听器的引用。

事件在添加监听器之前触发这一事实有一个微妙但重要的副作用：任何在 `'newListener'` 回调 _内部_ 注册到同一 `name` 的 _额外_ 监听器，都会被插入 _到_ 正在被添加的监听器 _之前_。

```mjs
import { EventEmitter } from 'node:events';
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
// 只执行一次，以免无限循环
myEmitter.once('newListener', (event, listener) => {
  if (event === 'event') {
    // 在前面插入一个新监听器
    myEmitter.on('event', () => {
      console.log('B');
    });
  }
});
myEmitter.on('event', () => {
  console.log('A');
});
myEmitter.emit('event');
// 打印：
//   B
//   A
```

```cjs
const EventEmitter = require('node:events');
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
// 只执行一次，以免无限循环
myEmitter.once('newListener', (event, listener) => {
  if (event === 'event') {
    // 在前面插入一个新监听器
    myEmitter.on('event', () => {
      console.log('B');
    });
  }
});
myEmitter.on('event', () => {
  console.log('A');
});
myEmitter.emit('event');
// 打印：
//   B
//   A
```

### 事件：`'removeListener'`

<!-- YAML
added: v0.9.3
changes:
  - version:
    - v6.1.0
    - v4.7.0
    pr-url: https://github.com/nodejs/node/pull/6394
    description: "For listeners attached using `.once()`, the `listener` argumentnow yields the original listener function."
-->

* `eventName` {string|symbol} 事件名称
* `listener` {Function} 事件处理函数

`'removeListener'` 事件在 `listener` 被移除 _之后_ 触发。

### `emitter.addListener(eventName, listener)`

<!-- YAML
added: v0.1.26
-->

* `eventName` {string|symbol}
* `listener` {Function}

`emitter.on(eventName, listener)` 的别名。

### `emitter.emit(eventName[, ...args])`

<!-- YAML
added: v0.1.26
-->

* `eventName` {string|symbol}
* `...args` {any}
* 返回：{boolean}

按注册顺序同步调用名为 `eventName` 的事件的每个监听器，并将提供的参数传递给每个监听器。

如果事件有监听器则返回 `true`，否则返回 `false`。

```mjs
import { EventEmitter } from 'node:events';
const myEmitter = new EventEmitter();

// 第一个监听器
myEmitter.on('event', function firstListener() {
  console.log('Helloooo! first listener');
});
// 第二个监听器
myEmitter.on('event', function secondListener(arg1, arg2) {
  console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
});
// 第三个监听器
myEmitter.on('event', function thirdListener(...args) {
  const parameters = args.join(', ');
  console.log(`event with parameters ${parameters} in third listener`);
});

console.log(myEmitter.listeners('event'));

myEmitter.emit('event', 1, 2, 3, 4, 5);

// 打印：
// [
//   [Function: firstListener],
//   [Function: secondListener],
//   [Function: thirdListener]
// ]
// Helloooo! first listener
// event with parameters 1, 2 in second listener
// event with parameters 1, 2, 3, 4, 5 in third listener
```

```cjs
const EventEmitter = require('node:events');
const myEmitter = new EventEmitter();

// 第一个监听器
myEmitter.on('event', function firstListener() {
  console.log('Helloooo! first listener');
});
// 第二个监听器
myEmitter.on('event', function secondListener(arg1, arg2) {
  console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
});
// 第三个监听器
myEmitter.on('event', function thirdListener(...args) {
  const parameters = args.join(', ');
  console.log(`event with parameters ${parameters} in third listener`);
});

console.log(myEmitter.listeners('event'));

myEmitter.emit('event', 1, 2, 3, 4, 5);

// 打印：
// [
//   [Function: firstListener],
//   [Function: secondListener],
//   [Function: thirdListener]
// ]
// Helloooo! first listener
// event with parameters 1, 2 in second listener
// event with parameters 1, 2, 3, 4, 5 in third listener
```

### `emitter.eventNames()`

<!-- YAML
added: v6.0.0
-->

* 返回：{string\[]|symbol\[]}

返回一个数组，列出发射器已注册监听器的事件。

```mjs
import { EventEmitter } from 'node:events';

const myEE = new EventEmitter();
myEE.on('foo', () => {});
myEE.on('bar', () => {});

const sym = Symbol('symbol');
myEE.on(sym, () => {});

console.log(myEE.eventNames());
// 打印：[ 'foo', 'bar', Symbol(symbol) ]
```

```cjs
const EventEmitter = require('node:events');

const myEE = new EventEmitter();
myEE.on('foo', () => {});
myEE.on('bar', () => {});

const sym = Symbol('symbol');
myEE.on(sym, () => {});

console.log(myEE.eventNames());
// 打印：[ 'foo', 'bar', Symbol(symbol) ]
```

### `emitter.getMaxListeners()`

<!-- YAML
added: v1.0.0
-->

* 返回：{integer}

返回 `EventEmitter` 当前的最大监听器值，该值由 [`emitter.setMaxListeners(n)`][] 设置，或默认为 [`events.defaultMaxListeners`][]。

### `emitter.listenerCount(eventName[, listener])`

<!-- YAML
added: v3.2.0
changes:
  - version:
    - v19.8.0
    - v18.16.0
    pr-url: https://github.com/nodejs/node/pull/46523
    description: "Added the `listener` argument."
-->

* `eventName` {string|symbol} 被监听的事件名称
* `listener` {Function} 事件处理函数
* 返回：{integer}

返回监听名为 `eventName` 事件的监听器数量。
如果提供了 `listener`，它将返回该监听器在事件监听器列表中被找到的次数。

### `emitter.listeners(eventName)`

<!-- YAML
added: v0.1.26
changes:
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/6881
    description: "For listeners attached using `.once()` this returns theoriginal listeners instead of wrapper functions now."
-->

* `eventName` {string|symbol}
* 返回：{Function\[]}

返回名为 `eventName` 事件的监听器数组的副本。

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
console.log(util.inspect(server.listeners('connection')));
// 打印：[ [Function] ]
```

### `emitter.off(eventName, listener)`

<!-- YAML
added: v10.0.0
-->

* `eventName` {string|symbol}
* `listener` {Function}
* 返回：{EventEmitter}

[`emitter.removeListener()`][] 的别名。

### `emitter.on(eventName, listener)`

<!-- YAML
added: v0.1.101
-->

* `eventName` {string|symbol} 事件名称。
* `listener` {Function} 回调函数
* 返回：{EventEmitter}

将 `listener` 函数添加到名为 `eventName` 事件的监听器数组末尾。不会检查 `listener` 是否已被添加。多次传递相同的 `eventName` 和 `listener` 组合会导致 `listener` 被添加并被调用多次。

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
```

返回 `EventEmitter` 的引用，以便可以链式调用。

默认情况下，事件监听器按添加顺序被调用。可以使用 `emitter.prependListener()` 方法作为替代，将事件监听器添加到监听器数组的开头。

```mjs
import { EventEmitter } from 'node:events';
const myEE = new EventEmitter();
myEE.on('foo', () => console.log('a'));
myEE.prependListener('foo', () => console.log('b'));
myEE.emit('foo');
// 打印：
//   b
//   a
```

```cjs
const EventEmitter = require('node:events');
const myEE = new EventEmitter();
myEE.on('foo', () => console.log('a'));
myEE.prependListener('foo', () => console.log('b'));
myEE.emit('foo');
// 打印：
//   b
//   a
```

### `emitter.once(eventName, listener)`

<!-- YAML
added: v0.3.0
-->

* `eventName` {string|symbol} 事件名称。
* `listener` {Function} 回调函数
* 返回：{EventEmitter}

为名为 `eventName` 的事件添加一个 **一次性** `listener` 函数。下次触发 `eventName` 时，此监听器会被移除然后被调用。

```js
server.once('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

返回 `EventEmitter` 的引用，以便可以链式调用。

默认情况下，事件监听器按添加顺序被调用。可以使用 `emitter.prependOnceListener()` 方法作为替代，将事件监听器添加到监听器数组的开头。

```mjs
import { EventEmitter } from 'node:events';
const myEE = new EventEmitter();
myEE.once('foo', () => console.log('a'));
myEE.prependOnceListener('foo', () => console.log('b'));
myEE.emit('foo');
// 打印：
//   b
//   a
```

```cjs
const EventEmitter = require('node:events');
const myEE = new EventEmitter();
myEE.once('foo', () => console.log('a'));
myEE.prependOnceListener('foo', () => console.log('b'));
myEE.emit('foo');
// 打印：
//   b
//   a
```

### `emitter.prependListener(eventName, listener)`

<!-- YAML
added: v6.0.0
-->

* `eventName` {string|symbol} 事件名称。
* `listener` {Function} 回调函数
* 返回：{EventEmitter}

将 `listener` 函数添加到名为 `eventName` 事件的监听器数组的 _开头_。不会检查 `listener` 是否已被添加。多次传递相同的 `eventName` 和 `listener` 组合会导致 `listener` 被添加并被调用多次。

```js
server.prependListener('connection', (stream) => {
  console.log('someone connected!');
});
```

返回 `EventEmitter` 的引用，以便可以链式调用。

### `emitter.prependOnceListener(eventName, listener)`

<!-- YAML
added: v6.0.0
-->

* `eventName` {string|symbol} 事件名称。
* `listener` {Function} 回调函数
* 返回：{EventEmitter}

为名为 `eventName` 的事件添加一个 **一次性** `listener` 函数到监听器数组的 _开头_。下次触发 `eventName` 时，此监听器会被移除，然后被调用。

```js
server.prependOnceListener('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

返回 `EventEmitter` 的引用，以便可以链式调用。

### `emitter.removeAllListeners([eventName])`

<!-- YAML
added: v0.1.26
-->

* `eventName` {string|symbol}
* 返回：{EventEmitter}

移除所有监听器，或指定 `eventName` 的监听器。

移除代码其他地方添加的监听器是不好的做法，特别是当 `EventEmitter` 实例是由其他组件或模块（例如 sockets 或 file streams）创建时。

返回 `EventEmitter` 的引用，以便可以链式调用。

### `emitter.removeListener(eventName, listener)`

<!-- YAML
added: v0.1.26
-->

* `eventName` {string|symbol}
* `listener` {Function}
* 返回：{EventEmitter}

从名为 `eventName` 事件的监听器数组中移除指定的 `listener`。

```js
const callback = (stream) => {
  console.log('someone connected!');
};
server.on('connection', callback);
// ...
server.removeListener('connection', callback);
```

`removeListener()` 最多将从监听器数组中移除一个监听器实例。如果任何单个监听器被多次添加到指定 `eventName` 的监听器数组中，则必须多次调用 `removeListener()` 来移除每个实例。

一旦事件被触发，所有在触发时附加到它的监听器都会按顺序被调用。这意味着任何在触发 _之后_ 且 _在_ 最后一个监听器完成执行 _之前_ 调用的 `removeListener()` 或 `removeAllListeners()` 都不会将它们从正在进行的 `emit()` 中移除。后续事件表现符合预期。

```mjs
import { EventEmitter } from 'node:events';
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

const callbackA = () => {
  console.log('A');
  myEmitter.removeListener('event', callbackB);
};

const callbackB = () => {
  console.log('B');
};

myEmitter.on('event', callbackA);

myEmitter.on('event', callbackB);

// callbackA 移除了监听器 callbackB，但它仍然会被调用。
// 触发时的内部监听器数组 [callbackA, callbackB]
myEmitter.emit('event');
// 打印：
//   A
//   B

// callbackB 现在被移除了。
// 内部监听器数组 [callbackA]
myEmitter.emit('event');
// 打印：
//   A
```

```cjs
const EventEmitter = require('node:events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

const callbackA = () => {
  console.log('A');
  myEmitter.removeListener('event', callbackB);
};

const callbackB = () => {
  console.log('B');
};

myEmitter.on('event', callbackA);

myEmitter.on('event', callbackB);

// callbackA 移除了监听器 callbackB，但它仍然会被调用。
// 触发时的内部监听器数组 [callbackA, callbackB]
myEmitter.emit('event');
// 打印：
//   A
//   B

// callbackB 现在被移除了。
// 内部监听器数组 [callbackA]
myEmitter.emit('event');
// 打印：
//   A
```

因为监听器是使用内部数组管理的，调用此方法将改变在要被移除的监听器 _之后_ 注册的任何监听器的位置索引。这不会影响监听器被调用的顺序，但这意味着 `emitter.listeners()` 方法返回的任何监听器数组副本都需要重新创建。

当单个函数被多次添加为单个事件的处理程序时（如下例所示），`removeListener()` 将移除最近添加的实例。在示例中，`once('ping')` 监听器被移除：

```mjs
import { EventEmitter } from 'node:events';
const ee = new EventEmitter();

function pong() {
  console.log('pong');
}

ee.on('ping', pong);
ee.once('ping', pong);
ee.removeListener('ping', pong);

ee.emit('ping');
ee.emit('ping');
```

```cjs
const EventEmitter = require('node:events');
const ee = new EventEmitter();

function pong() {
  console.log('pong');
}

ee.on('ping', pong);
ee.once('ping', pong);
ee.removeListener('ping', pong);

ee.emit('ping');
ee.emit('ping');
```

返回 `EventEmitter` 的引用，以便可以链式调用。

### `emitter.setMaxListeners(n)`

<!-- YAML
added: v0.3.5
-->

* `n` {integer}
* 返回：{EventEmitter}

默认情况下，如果为特定事件添加了超过 `10` 个监听器，`EventEmitter` 将打印警告。这是一个有用的默认值，有助于发现内存泄漏。`emitter.setMaxListeners()` 方法允许为此特定 `EventEmitter` 实例修改限制。该值可以设置为 `Infinity`（或 `0`）以表示无限数量的监听器。

返回 `EventEmitter` 的引用，以便可以链式调用。

### `emitter.rawListeners(eventName)`

<!-- YAML
added: v9.4.0
-->

* `eventName` {string|symbol}
* 返回：{Function\[]}

返回名为 `eventName` 事件的监听器数组的副本，包括任何包装器（例如由 `.once()` 创建的）。

```mjs
import { EventEmitter } from 'node:events';
const emitter = new EventEmitter();
emitter.once('log', () => console.log('log once'));

// 返回一个新数组，包含一个函数 `onceWrapper`，它有一个属性
// `listener`，其中包含上面绑定的原始监听器
const listeners = emitter.rawListeners('log');
const logFnWrapper = listeners[0];

// 向控制台记录 "log once" 且不解除 `once` 事件绑定
logFnWrapper.listener();

// 向控制台记录 "log once" 并移除监听器
logFnWrapper();

emitter.on('log', () => console.log('log persistently'));
// 将返回一个新数组，包含一个由上面 `.on()` 绑定的单个函数
const newListeners = emitter.rawListeners('log');

// 记录 "log persistently" 两次
newListeners[0]();
emitter.emit('log');
```

```cjs
const EventEmitter = require('node:events');
const emitter = new EventEmitter();
emitter.once('log', () => console.log('log once'));

// 返回一个新数组，包含一个函数 `onceWrapper`，它有一个属性
// `listener`，其中包含上面绑定的原始监听器
const listeners = emitter.rawListeners('log');
const logFnWrapper = listeners[0];

// 向控制台记录 "log once" 且不解除 `once` 事件绑定
logFnWrapper.listener();

// 向控制台记录 "log once" 并移除监听器
logFnWrapper();

emitter.on('log', () => console.log('log persistently'));
// 将返回一个新数组，包含一个由上面 `.on()` 绑定的单个函数
const newListeners = emitter.rawListeners('log');

// 记录 "log persistently" 两次
newListeners[0]();
emitter.emit('log');
```

### `emitter[Symbol.for('nodejs.rejection')](err, eventName[, ...args])`

<!-- YAML
added:
 - v13.4.0
 - v12.16.0
changes:
  - version:
    - v17.4.0
    - v16.14.0
    pr-url: https://github.com/nodejs/node/pull/41267
    description: No longer experimental.
-->

* `err` {Error}
* `eventName` {string|symbol}
* `...args` {any}

当触发事件时发生 Promise 拒绝且发射器上启用了 [`captureRejections`][capturerejections] 时，会调用 `Symbol.for('nodejs.rejection')` 方法。可以使用 [`events.captureRejectionSymbol`][rejectionsymbol] 代替 `Symbol.for('nodejs.rejection')`。

```mjs
import { EventEmitter, captureRejectionSymbol } from 'node:events';

class MyClass extends EventEmitter {
  constructor() {
    super({ captureRejections: true });
  }

  [captureRejectionSymbol](err, event, ...args) {
    console.log('rejection happened for', event, 'with', err, ...args);
    this.destroy(err);
  }

  destroy(err) {
    // 在此处销毁资源。
  }
}
```

```cjs
const { EventEmitter, captureRejectionSymbol } = require('node:events');

class MyClass extends EventEmitter {
  constructor() {
    super({ captureRejections: true });
  }

  [captureRejectionSymbol](err, event, ...args) {
    console.log('rejection happened for', event, 'with', err, ...args);
    this.destroy(err);
  }

  destroy(err) {
    // 在此处销毁资源。
  }
}
```

## `events.defaultMaxListeners`

<!-- YAML
added: v0.11.2
-->

默认情况下，任何单个事件最多可以注册 `10` 个监听器。可以使用 [`emitter.setMaxListeners(n)`][] 方法为单个 `EventEmitter` 实例更改此限制。要更改 _所有_ `EventEmitter` 实例的默认值，可以使用 `events.defaultMaxListeners` 属性。如果此值不是正数，则会抛出 `RangeError`。

设置 `events.defaultMaxListeners` 时要小心，因为更改会影响 _所有_ `EventEmitter` 实例，包括在进行更改之前创建的实例。但是，调用 [`emitter.setMaxListeners(n)`][] 仍然优先于 `events.defaultMaxListeners`。

这不是硬性限制。`EventEmitter` 实例将允许添加更多监听器，但会向 stderr 输出跟踪警告，指示已检测到“可能的 EventEmitter 内存泄漏”。对于任何单个 `EventEmitter`，可以使用 `emitter.getMaxListeners()` 和 `emitter.setMaxListeners()` 方法来暂时避免此警告：

`defaultMaxListeners` 对 `AbortSignal` 实例无效。虽然仍然可以使用 [`emitter.setMaxListeners(n)`][] 为单个 `AbortSignal` 实例设置警告限制，但默认情况下 `AbortSignal` 实例不会警告。

```mjs
import { EventEmitter } from 'node:events';
const emitter = new EventEmitter();
emitter.setMaxListeners(emitter.getMaxListeners() + 1);
emitter.once('event', () => {
  // 执行操作
  emitter.setMaxListeners(Math.max(emitter.getMaxListeners() - 1, 0));
});
```

```cjs
const EventEmitter = require('node:events');
const emitter = new EventEmitter();
emitter.setMaxListeners(emitter.getMaxListeners() + 1);
emitter.once('event', () => {
  // 执行操作
  emitter.setMaxListeners(Math.max(emitter.getMaxListeners() - 1, 0));
});
```

可以使用 [`--trace-warnings`][] 命令行标志来显示此类警告的堆栈跟踪。

可以使用 [`process.on('warning')`][] 检查发出的警告，它将具有额外的 `emitter`、`type` 和 `count` 属性，分别引用事件发射器实例、事件名称和附加监听器的数量。
其 `name` 属性设置为 `'MaxListenersExceededWarning'`。

## `events.errorMonitor`

<!-- YAML
added:
 - v13.6.0
 - v12.17.0
-->

此符号应用于安装仅用于监控 `'error'` 事件的监听器。使用此符号安装的监听器会在常规 `'error'` 监听器之前被调用。

使用此符号安装监听器不会改变发出 `'error'` 事件后的行为。因此，如果没有安装常规 `'error'` 监听器，进程仍然会崩溃。

## `events.getEventListeners(emitterOrTarget, eventName)`

<!-- YAML
added:
 - v15.2.0
 - v14.17.0
-->

* `emitterOrTarget` {EventEmitter|EventTarget}
* `eventName` {string|symbol}
* 返回：{Function\[]}

返回名为 `eventName` 事件的监听器数组的副本。

对于 `EventEmitter`，这与在发射器上调用 `.listeners` 的行为完全相同。

对于 `EventTarget`，这是获取事件目标的事件监听器的唯一方法。这对于调试和诊断目的很有用。

```mjs
import { getEventListeners, EventEmitter } from 'node:events';

{
  const ee = new EventEmitter();
  const listener = () => console.log('Events are fun');
  ee.on('foo', listener);
  console.log(getEventListeners(ee, 'foo')); // [ [Function: listener] ]
}
{
  const et = new EventTarget();
  const listener = () => console.log('Events are fun');
  et.addEventListener('foo', listener);
  console.log(getEventListeners(et, 'foo')); // [ [Function: listener] ]
}
```

```cjs
const { getEventListeners, EventEmitter } = require('node:events');

{
  const ee = new EventEmitter();
  const listener = () => console.log('Events are fun');
  ee.on('foo', listener);
  console.log(getEventListeners(ee, 'foo')); // [ [Function: listener] ]
}
{
  const et = new EventTarget();
  const listener = () => console.log('Events are fun');
  et.addEventListener('foo', listener);
  console.log(getEventListeners(et, 'foo')); // [ [Function: listener] ]
}
```

## `events.getMaxListeners(emitterOrTarget)`

<!-- YAML
added:
  - v19.9.0
  - v18.17.0
-->

* `emitterOrTarget` {EventEmitter|EventTarget}
* 返回：{number}

返回当前设置的最大监听器数量。

对于 `EventEmitter`，这与在发射器上调用 `.getMaxListeners` 的行为完全相同。

对于 `EventTarget`，这是获取事件目标的最大事件监听器的唯一方法。如果单个 EventTarget 上的事件处理程序数量超过设置的最大值，EventTarget 将打印警告。

```mjs
import { getMaxListeners, setMaxListeners, EventEmitter } from 'node:events';

{
  const ee = new EventEmitter();
  console.log(getMaxListeners(ee)); // 10
  setMaxListeners(11, ee);
  console.log(getMaxListeners(ee)); // 11
}
{
  const et = new EventTarget();
  console.log(getMaxListeners(et)); // 10
  setMaxListeners(11, et);
  console.log(getMaxListeners(et)); // 11
}
```

```cjs
const { getMaxListeners, setMaxListeners, EventEmitter } = require('node:events');

{
  const ee = new EventEmitter();
  console.log(getMaxListeners(ee)); // 10
  setMaxListeners(11, ee);
  console.log(getMaxListeners(ee)); // 11
}
{
  const et = new EventTarget();
  console.log(getMaxListeners(et)); // 10
  setMaxListeners(11, et);
  console.log(getMaxListeners(et)); // 11
}
```

## `events.once(emitter, name[, options])`

<!-- YAML
added:
 - v11.13.0
 - v10.16.0
changes:
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/34912
    description: "The `signal` option is supported now."
-->

* `emitter` {EventEmitter}
* `name` {string|symbol}
* `options` {Object}
  * `signal` {AbortSignal} 可用于取消等待事件。
* 返回：{Promise}

创建一个 `Promise`，当 `EventEmitter` 发出给定事件时该 `Promise` 变为已兑现状态，或者如果 `EventEmitter` 在等待期间发出 `'error'` 则该 `Promise` 变为已拒绝状态。该 `Promise` 将兑现为一个数组，包含发出到给定事件的所有参数。

此方法故意设计为通用方法，适用于 Web 平台 [EventTarget][WHATWG-EventTarget] 接口，该接口没有特殊的 `'error'` 事件语义，也不监听 `'error'` 事件。

```mjs
import { once, EventEmitter } from 'node:events';
import process from 'node:process';

const ee = new EventEmitter();

process.nextTick(() => {
  ee.emit('myevent', 42);
});

const [value] = await once(ee, 'myevent');
console.log(value);

const err = new Error('kaboom');
process.nextTick(() => {
  ee.emit('error', err);
});

try {
  await once(ee, 'myevent');
} catch (err) {
  console.error('发生错误', err);
}
```

```cjs
const { once, EventEmitter } = require('node:events');

async function run() {
  const ee = new EventEmitter();

  process.nextTick(() => {
    ee.emit('myevent', 42);
  });

  const [value] = await once(ee, 'myevent');
  console.log(value);

  const err = new Error('kaboom');
  process.nextTick(() => {
    ee.emit('error', err);
  });

  try {
    await once(ee, 'myevent');
  } catch (err) {
    console.error('发生错误', err);
  }
}

run();
```

`'error'` 事件的特殊处理仅在 `events.once()` 用于等待另一个事件时使用。如果 `events.once()` 用于等待 '`error'` 事件本身，则它被视为任何其他类型的事件，不进行特殊处理：

```mjs
import { EventEmitter, once } from 'node:events';

const ee = new EventEmitter();

once(ee, 'error')
  .then(([err]) => console.log('ok', err.message))
  .catch((err) => console.error('error', err.message));

ee.emit('error', new Error('boom'));

// 输出：ok boom
```

```cjs
const { EventEmitter, once } = require('node:events');

const ee = new EventEmitter();

once(ee, 'error')
  .then(([err]) => console.log('ok', err.message))
  .catch((err) => console.error('error', err.message));

ee.emit('error', new Error('boom'));

// 输出：ok boom
```

可以使用 {AbortSignal} 来取消等待事件：

```mjs
import { EventEmitter, once } from 'node:events';

const ee = new EventEmitter();
const ac = new AbortController();

async function foo(emitter, event, signal) {
  try {
    await once(emitter, event, { signal });
    console.log('事件已发出！');
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('等待事件已被取消！');
    } else {
      console.error('发生了一个错误', error.message);
    }
  }
}

foo(ee, 'foo', ac.signal);
ac.abort(); // 输出：等待事件已被取消！
```

```cjs
const { EventEmitter, once } = require('node:events');

const ee = new EventEmitter();
const ac = new AbortController();

async function foo(emitter, event, signal) {
  try {
    await once(emitter, event, { signal });
    console.log('事件已发出！');
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('等待事件已被取消！');
    } else {
      console.error('发生了一个错误', error.message);
    }
  }
}

foo(ee, 'foo', ac.signal);
ac.abort(); // 输出：等待事件已被取消！
```

### 等待多个事件时的注意事项

在使用 `events.once()` 方法等待多个事件时，了解执行顺序很重要。

传统事件监听器在事件发出时同步调用。这保证了在所有监听器执行完毕之前，执行不会超出已发出的事件。

当等待 `events.once()` 返回的 Promises 时，情况 _并非_ 如此。Promise 任务直到当前执行栈运行完成后才会处理，这意味着在从相关 `await` 语句继续异步执行之前，可能会发出多个事件。

因此，如果使用一系列 `await events.once()` 语句来监听多个事件，事件可能会“丢失”，因为在事件循环的同一阶段可能会发出多个事件。（使用 `process.nextTick()` 发出事件时也是如此，因为 `process.nextTick()` 排队的任务在 Promise 任务之前执行。）

```mjs
import { EventEmitter, once } from 'node:events';
import process from 'node:process';

const myEE = new EventEmitter();

async function listen() {
  await once(myEE, 'foo');
  console.log('foo');

  // 此 Promise 永远不会兑现，因为 'bar' 事件将在
  // 执行下一行之前已经发出。
  await once(myEE, 'bar');
  console.log('bar');
}

process.nextTick(() => {
  myEE.emit('foo');
  myEE.emit('bar');
});

listen().then(() => console.log('完成'));
```

```cjs
const { EventEmitter, once } = require('node:events');

const myEE = new EventEmitter();

async function listen() {
  await once(myEE, 'foo');
  console.log('foo');

  // 此 Promise 永远不会兑现，因为 'bar' 事件将在
  // 执行下一行之前已经发出。
  await once(myEE, 'bar');
  console.log('bar');
}

process.nextTick(() => {
  myEE.emit('foo');
  myEE.emit('bar');
});

listen().then(() => console.log('完成'));
```

要捕获多个事件，请在等待任何 Promise _之前_ 创建所有 Promise。这通常通过使用 `Promise.all()`、`Promise.race()` 或 `Promise.allSettled()` 来简化：

```mjs
import { EventEmitter, once } from 'node:events';
import process from 'node:process';

const myEE = new EventEmitter();

async function listen() {
  await Promise.all([
    once(myEE, 'foo'),
    once(myEE, 'bar'),
  ]);
  console.log('foo', 'bar');
}

process.nextTick(() => {
  myEE.emit('foo');
  myEE.emit('bar');
});

listen().then(() => console.log('完成'));
```

```cjs
const { EventEmitter, once } = require('node:events');

const myEE = new EventEmitter();

async function listen() {
  await Promise.all([
    once(myEE, 'bar'),
    once(myEE, 'foo'),
  ]);
  console.log('foo', 'bar');
}

process.nextTick(() => {
  myEE.emit('foo');
  myEE.emit('bar');
});

listen().then(() => console.log('完成'));
```

## `events.captureRejections`

<!-- YAML
added:
 - v13.4.0
 - v12.16.0
changes:
  - version:
    - v17.4.0
    - v16.14.0
    pr-url: https://github.com/nodejs/node/pull/41267
    description: 不再处于实验阶段。
-->

* 类型：{boolean}

更改所有新 `EventEmitter` 对象上的默认 `captureRejections` 选项。

## `events.captureRejectionSymbol`

<!-- YAML
added:
  - v13.4.0
  - v12.16.0
changes:
  - version:
    - v17.4.0
    - v16.14.0
    pr-url: https://github.com/nodejs/node/pull/41267
    description: 不再处于实验阶段。
-->

* 类型：{symbol} `Symbol.for('nodejs.rejection')`

请参阅如何编写自定义 [拒绝][rejection]。

## `events.listenerCount(emitterOrTarget, eventName)`

<!-- YAML
added: v0.9.12
changes:
  - version:
     - v25.4.0
     - v24.14.0
    pr-url: https://github.com/nodejs/node/pull/60214
    description: 现在接受 EventTarget 参数。
  - version:
     - v25.4.0
     - v24.14.0
    pr-url: https://github.com/nodejs/node/pull/60214
    description: 废弃已撤销。
  - version: v3.2.0
    pr-url: https://github.com/nodejs/node/pull/2349
    description: 仅文档废弃。
-->

* `emitterOrTarget` {EventEmitter|EventTarget}
* `eventName` {string|symbol}
* 返回：{integer}

返回名为 `eventName` 的事件的注册监听器数量。

对于 `EventEmitter`，这与在 emitter 上调用 `.listenerCount` 完全相同。

对于 `EventTarget`，这是获取监听器数量的唯一方法。这对于调试和诊断目的可能很有用。

```mjs
import { EventEmitter, listenerCount } from 'node:events';

{
  const ee = new EventEmitter();
  ee.on('event', () => {});
  ee.on('event', () => {});
  console.log(listenerCount(ee, 'event')); // 2
}
{
  const et = new EventTarget();
  et.addEventListener('event', () => {});
  et.addEventListener('event', () => {});
  console.log(listenerCount(et, 'event')); // 2
}
```

```cjs
const { EventEmitter, listenerCount } = require('node:events');

{
  const ee = new EventEmitter();
  ee.on('event', () => {});
  ee.on('event', () => {});
  console.log(listenerCount(ee, 'event')); // 2
}
{
  const et = new EventTarget();
  et.addEventListener('event', () => {});
  et.addEventListener('event', () => {});
  console.log(listenerCount(et, 'event')); // 2
}
```

## `events.on(emitter, eventName[, options])`

<!-- YAML
added:
 - v13.6.0
 - v12.16.0
changes:
  - version:
    - v22.0.0
    - v20.13.0
    pr-url: https://github.com/nodejs/node/pull/52080
    description: "支持 `highWaterMark` 和 `lowWaterMark` 选项，为了保持一致性。旧选项仍然受支持。"
  - version:
    - v20.0.0
    pr-url: https://github.com/nodejs/node/pull/41276
    description: "现在支持 `close`、`highWatermark` 和 `lowWatermark`选项。"
-->

* `emitter` {EventEmitter}
* `eventName` {string|symbol} 正在监听的事件名称
* `options` {Object}
  * `signal` {AbortSignal} 可用于取消等待事件。
  * `close` {string\[]} 将结束迭代的事件名称。
  * `highWaterMark` {integer} **默认：** `Number.MAX_SAFE_INTEGER`
    高水位标记。每当缓冲的事件大小高于此值时，emitter 将被暂停。仅支持实现了
    `pause()` 和 `resume()` 方法的 emitter。
  * `lowWaterMark` {integer} **默认：** `1`
    低水位标记。每当缓冲的事件大小低于此值时，emitter 将被恢复。仅支持实现了
    `pause()` 和 `resume()` 方法的 emitter。
* 返回：{AsyncIterator}，迭代 `emitter` 发出的 `eventName` 事件

```mjs
import { on, EventEmitter } from 'node:events';
import process from 'node:process';

const ee = new EventEmitter();

// 稍后发出
process.nextTick(() => {
  ee.emit('foo', 'bar');
  ee.emit('foo', 42);
});

for await (const event of on(ee, 'foo')) {
  // 此内部块的执行是同步的，并且它
  // 一次处理一个事件（即使使用 await）。如果需要并发执行，请勿使用
  console.log(event); // 打印 ['bar'] [42]
}
// 此处不可达
```

```cjs
const { on, EventEmitter } = require('node:events');

(async () => {
  const ee = new EventEmitter();

  // 稍后发出
  process.nextTick(() => {
    ee.emit('foo', 'bar');
    ee.emit('foo', 42);
  });

  for await (const event of on(ee, 'foo')) {
    // 此内部块的执行是同步的，并且它
    // 一次处理一个事件（即使使用 await）。如果需要并发执行，请勿使用
    console.log(event); // 打印 ['bar'] [42]
  }
  // 此处不可达
})();
```

返回一个迭代 `eventName` 事件的 `AsyncIterator`。如果 `EventEmitter` 发出 `'error'`，它将抛出错误。它在退出循环时移除所有监听器。每次迭代返回的 `value` 是一个由发出的事件参数组成的数组。

可以使用 {AbortSignal} 来取消等待事件：

```mjs
import { on, EventEmitter } from 'node:events';
import process from 'node:process';

const ac = new AbortController();

(async () => {
  const ee = new EventEmitter();

  // 稍后发出
  process.nextTick(() => {
    ee.emit('foo', 'bar');
    ee.emit('foo', 42);
  });

  for await (const event of on(ee, 'foo', { signal: ac.signal })) {
    // 此内部块的执行是同步的，并且它
    // 一次处理一个事件（即使使用 await）。如果需要并发执行，请勿使用
    console.log(event); // 打印 ['bar'] [42]
  }
  // 此处不可达
})();

process.nextTick(() => ac.abort());
```

```cjs
const { on, EventEmitter } = require('node:events');

const ac = new AbortController();

(async () => {
  const ee = new EventEmitter();

  // 稍后发出
  process.nextTick(() => {
    ee.emit('foo', 'bar');
    ee.emit('foo', 42);
  });

  for await (const event of on(ee, 'foo', { signal: ac.signal })) {
    // 此内部块的执行是同步的，并且它
    // 一次处理一个事件（即使使用 await）。如果需要并发执行，请勿使用
    console.log(event); // 打印 ['bar'] [42]
  }
  // 此处不可达
})();

process.nextTick(() => ac.abort());
```

## `events.setMaxListeners(n[, ...eventTargets])`

<!-- YAML
added: v15.4.0
-->

* `n` {number} 一个非负数。每个 `EventTarget` 事件的最大监听器数量。
* `...eventsTargets` {EventTarget\[]|EventEmitter\[]} 零个或多个 {EventTarget}
  或 {EventEmitter} 实例。如果未指定任何实例，`n` 将被设置为所有新创建的 {EventTarget} 和 {EventEmitter} 对象的默认最大值。

```mjs
import { setMaxListeners, EventEmitter } from 'node:events';

const target = new EventTarget();
const emitter = new EventEmitter();

setMaxListeners(5, target, emitter);
```

```cjs
const {
  setMaxListeners,
  EventEmitter,
} = require('node:events');

const target = new EventTarget();
const emitter = new EventEmitter();

setMaxListeners(5, target, emitter);
```

## `events.addAbortListener(signal, listener)`

<!-- YAML
added:
 - v20.5.0
 - v18.18.0
changes:
 - version:
   - v24.0.0
   - v22.16.0
   pr-url: https://github.com/nodejs/node/pull/57765
   description: 将此功能的稳定性索引从实验性更改为稳定。
-->

* `signal` {AbortSignal}
* `listener` {Function|EventListener}
* 返回：{Disposable} 一个移除 `abort` 监听器的 Disposable。

监听提供的 `signal` 上的 `abort` 事件一次。

监听 abort 信号上的 `abort` 事件是不安全的，并且可能导致资源泄漏，因为拥有该信号的另一个第三方可以调用 [`e.stopImmediatePropagation()`][]。不幸的是 Node.js 无法更改这一点，因为它会违反 Web 标准。此外，原始 API 使得很容易忘记移除监听器。

此 API 允许在 Node.js API 中安全地使用 `AbortSignal`，通过监听事件使得 `stopImmediatePropagation` 不会阻止监听器运行，从而解决这两个问题。

返回一个 disposable，以便更容易取消订阅。

```cjs
const { addAbortListener } = require('node:events');

function example(signal) {
  signal.addEventListener('abort', (e) => e.stopImmediatePropagation());
  // addAbortListener() 返回一个 disposable，因此 `using` 关键字确保
  // 当此作用域退出时自动移除 abort 监听器。
  using _ = addAbortListener(signal, (e) => {
    // 当信号被中止时执行某些操作。
  });
}
```

```mjs
import { addAbortListener } from 'node:events';

function example(signal) {
  signal.addEventListener('abort', (e) => e.stopImmediatePropagation());
  // addAbortListener() 返回一个 disposable，因此 `using` 关键字确保
  // 当此作用域退出时自动移除 abort 监听器。
  using _ = addAbortListener(signal, (e) => {
    // 当信号被中止时执行某些操作。
  });
}
```

## 类：`events.EventEmitterAsyncResource extends EventEmitter`

<!-- YAML
added:
  - v17.4.0
  - v16.14.0
-->

将 `EventEmitter` 与 {AsyncResource} 集成，用于需要手动异步跟踪的 `EventEmitter`。具体来说，由 `events.EventEmitterAsyncResource` 实例发出的所有事件将在其 [异步上下文][] 中运行。

```mjs
import { EventEmitterAsyncResource, EventEmitter } from 'node:events';
import { notStrictEqual, strictEqual } from 'node:assert';
import { executionAsyncId, triggerAsyncId } from 'node:async_hooks';

// 异步跟踪工具会将此识别为 'Q'。
const ee1 = new EventEmitterAsyncResource({ name: 'Q' });

// 'foo' 监听器将在 EventEmitter 的异步上下文中运行。
ee1.on('foo', () => {
  strictEqual(executionAsyncId(), ee1.asyncId);
  strictEqual(triggerAsyncId(), ee1.triggerAsyncId);
});

const ee2 = new EventEmitter();

// 普通 EventEmitter 上的 'foo' 监听器不跟踪异步
// 上下文，但是，在与 emit() 相同的异步上下文中运行。
ee2.on('foo', () => {
  notStrictEqual(executionAsyncId(), ee2.asyncId);
  notStrictEqual(triggerAsyncId(), ee2.triggerAsyncId);
});

Promise.resolve().then(() => {
  ee1.emit('foo');
  ee2.emit('foo');
});
```

```cjs
const { EventEmitterAsyncResource, EventEmitter } = require('node:events');
const { notStrictEqual, strictEqual } = require('node:assert');
const { executionAsyncId, triggerAsyncId } = require('node:async_hooks');

// 异步跟踪工具会将此识别为 'Q'。
const ee1 = new EventEmitterAsyncResource({ name: 'Q' });

// 'foo' 监听器将在 EventEmitter 的异步上下文中运行。
ee1.on('foo', () => {
  strictEqual(executionAsyncId(), ee1.asyncId);
  strictEqual(triggerAsyncId(), ee1.triggerAsyncId);
});

const ee2 = new EventEmitter();

// 普通 EventEmitter 上的 'foo' 监听器不跟踪异步
// 上下文，但是，在与 emit() 相同的异步上下文中运行。
ee2.on('foo', () => {
  notStrictEqual(executionAsyncId(), ee2.asyncId);
  notStrictEqual(triggerAsyncId(), ee2.triggerAsyncId);
});

Promise.resolve().then(() => {
  ee1.emit('foo');
  ee2.emit('foo');
});
```

`EventEmitterAsyncResource` 类具有与 `EventEmitter` 和 `AsyncResource` 本身相同的方法并接受相同的选项。

### `new events.EventEmitterAsyncResource([options])`

* `options` {Object}
  * `captureRejections` {boolean} 它启用
    [自动捕获 Promise 拒绝][capturerejections]。
    **默认：** `false`。
  * `name` {string} 异步事件的类型。**默认：** [`new.target.name`][]。
  * `triggerAsyncId` {number} 创建此
    异步事件的执行上下文的 ID。**默认：** `executionAsyncId()`。
  * `requireManualDestroy` {boolean} 如果设置为 `true`，当对象被垃圾回收时禁用 `emitDestroy`。这通常不需要设置
    （即使手动调用 `emitDestroy`），除非检索到资源的 `asyncId`
    并且敏感 API 的 `emitDestroy` 与其一起调用。
    当设置为 `false` 时，垃圾回收上的 `emitDestroy` 调用
    仅在至少有一个活动的 `destroy` 钩子时才会发生。
    **默认：** `false`。

### `eventemitterasyncresource.asyncId`

* 类型：{number} 分配给资源的唯一 `asyncId`。

### `eventemitterasyncresource.asyncResource`

* 类型：{AsyncResource} 底层的 {AsyncResource}。

返回的 `AsyncResource` 对象有一个额外的 `eventEmitter` 属性，提供对此 `EventEmitterAsyncResource` 的引用。

### `eventemitterasyncresource.emitDestroy()`

调用所有 `destroy` 钩子。这应该只调用一次。如果调用超过一次，将抛出错误。这**必须**手动调用。如果资源留给 GC 收集，则 `destroy` 钩子将永远不会被调用。

### `eventemitterasyncresource.triggerAsyncId`

* 类型：{number} 与传递给
  `AsyncResource` 构造函数的 `triggerAsyncId` 相同。

<a id="event-target-and-event-api"></a>

## `EventTarget` 和 `Event` API

<!-- YAML
added: v14.5.0
changes:
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/37237
    description: 更改了 EventTarget 错误处理。
  - version: v15.4.0
    pr-url: https://github.com/nodejs/node/pull/35949
    description: 不再是实验性的。
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/35496
    description: "`EventTarget` 和 `Event` 类现在可作为全局对象使用。"
-->

`EventTarget` 和 `Event` 对象是 [`EventTarget` Web API][] 的 Node.js 特定实现，由某些 Node.js 核心 API 暴露。

```js
const target = new EventTarget();

target.addEventListener('foo', (event) => {
  console.log('foo event happened!');
});
```

### Node.js `EventTarget` 与 DOM `EventTarget`

Node.js `EventTarget` 与 [`EventTarget` Web API][] 之间有两个主要区别：

1. 虽然 DOM `EventTarget` 实例 _可能_ 是分层的，但在 Node.js 中没有层级和事件传播的概念。也就是说，派发给 `EventTarget` 的事件不会通过可能各自拥有自己的一组事件处理器的嵌套目标对象的层级结构进行传播。
2. 在 Node.js `EventTarget` 中，如果事件监听器是异步函数或返回一个 `Promise`，并且返回的 `Promise` 被拒绝（reject），则该拒绝会被自动捕获并以与同步抛出错误的监听器相同的方式处理（详见 [`EventTarget` 错误处理][]）。

### `NodeEventTarget` 与 `EventEmitter`

`NodeEventTarget` 对象实现了 `EventEmitter` API 的修改子集，使其在某些情况下能够 closely _模拟_ `EventEmitter`。`NodeEventTarget` _不是_ `EventEmitter` 的实例，在大多数情况下不能代替 `EventEmitter` 使用。

1. 与 `EventEmitter` 不同，任何给定的 `listener` 每个事件 `type` 最多只能注册一次。尝试多次注册 `listener` 将被忽略。
2. `NodeEventTarget` 不模拟完整的 `EventEmitter` API。 Specifically the `prependListener()`、`prependOnceListener()`、`rawListeners()` 和 `errorMonitor` API 未被模拟。`'newListener'` 和 `'removeListener'` 事件也不会被触发。
3. `NodeEventTarget` 不对类型为 `'error'` 的事件实现任何特殊的默认行为。
4. `NodeEventTarget` 支持 `EventListener` 对象以及函数作为所有事件类型的处理器。

### 事件监听器

为事件 `type` 注册的事件监听器可以是 JavaScript 函数，也可以是具有 `handleEvent` 属性的对象，其值为函数。

在这两种情况下，处理函数都会被调用，并传入传递给 `eventTarget.dispatchEvent()` 函数的 `event` 参数。

异步函数可用作事件监听器。如果异步处理函数被拒绝（reject），则该拒绝会被捕获并按 [`EventTarget` 错误处理][] 中描述的方式处理。

一个处理函数抛出的错误不会阻止其他处理函数被调用。

处理函数的返回值将被忽略。

处理函数总是按照它们被添加的顺序调用。

处理函数可以变更 `event` 对象。

```js
function handler1(event) {
  console.log(event.type);  // 打印 'foo'
  event.a = 1;
}

async function handler2(event) {
  console.log(event.type);  // 打印 'foo'
  console.log(event.a);  // 打印 1
}

const handler3 = {
  handleEvent(event) {
    console.log(event.type);  // 打印 'foo'
  },
};

const handler4 = {
  async handleEvent(event) {
    console.log(event.type);  // 打印 'foo'
  },
};

const target = new EventTarget();

target.addEventListener('foo', handler1);
target.addEventListener('foo', handler2);
target.addEventListener('foo', handler3);
target.addEventListener('foo', handler4, { once: true });
```

### `EventTarget` 错误处理

当已注册的事件监听器抛出错误（或返回一个被拒绝的 Promise）时，默认情况下该错误被视为 `process.nextTick()` 上的未捕获异常。这意味着默认情况下 `EventTarget` 中的未捕获异常将终止 Node.js 进程。

在事件监听器内抛出错误 _不会_ 阻止其他已注册的处理函数被调用。

`EventTarget` 不像 `EventEmitter` 那样对 `'error'` 类型事件实现任何特殊的默认处理。

目前，错误在到达 `process.on('uncaughtException')` 之前会先转发给 `process.on('error')` 事件。此行为已弃用，并将在未来的版本中更改以使 `EventTarget` 与其他 Node.js API 保持一致。任何依赖 `process.on('error')` 事件的代码都应与新行为保持一致。

### 类：`Event`

<!-- YAML
added: v14.5.0
changes:
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/35496
    description: "`Event` 类现在可通过全局对象使用。"
-->

`Event` 对象是 [`Event` Web API][] 的适配版本。实例由 Node.js 内部创建。

#### `event.bubbles`

<!-- YAML
added: v14.5.0
-->

* 类型：{boolean} 始终返回 `false`。

这在 Node.js 中未使用，仅提供以保持完整性。

#### `event.cancelBubble`

<!-- YAML
added: v14.5.0
-->

> 稳定性：3 - 遗留：请改用 [`event.stopPropagation()`][]。

* 类型：{boolean}

如果设置为 `true`，则为 `event.stopPropagation()` 的别名。这在 Node.js 中未使用，仅提供以保持完整性。

#### `event.cancelable`

<!-- YAML
added: v14.5.0
-->

* 类型：{boolean} 如果使用 `cancelable` 选项创建事件，则为 true。

#### `event.composed`

<!-- YAML
added: v14.5.0
-->

* 类型：{boolean} 始终返回 `false`。

这在 Node.js 中未使用，仅提供以保持完整性。

#### `event.composedPath()`

<!-- YAML
added: v14.5.0
-->

返回一个包含当前 `EventTarget` 作为唯一条目的数组，如果事件未被派发则为空。这在 Node.js 中未使用，仅提供以保持完整性。

#### `event.currentTarget`

<!-- YAML
added: v14.5.0
-->

* 类型：{EventTarget} 派发事件的 `EventTarget`。

`event.target` 的别名。

#### `event.defaultPrevented`

<!-- YAML
added: v14.5.0
-->

* 类型：{boolean}

如果 `cancelable` 为 `true` 且已调用 `event.preventDefault()`，则为 `true`。

#### `event.eventPhase`

<!-- YAML
added: v14.5.0
-->

* 类型：{number} 当事件未被派发时返回 `0`，当正在派发时返回 `2`。

这在 Node.js 中未使用，仅提供以保持完整性。

#### `event.initEvent(type[, bubbles[, cancelable]])`

<!-- YAML
added: v19.5.0
-->

> 稳定性：3 - 遗留：WHATWG 规范认为它已弃用，用户根本不应使用它。

* `type` {string}
* `bubbles` {boolean}
* `cancelable` {boolean}

与事件构造函数冗余，且无法设置 `composed`。这在 Node.js 中未使用，仅提供以保持完整性。

#### `event.isTrusted`

<!-- YAML
added: v14.5.0
-->

* 类型：{boolean}

{AbortSignal} `"abort"` 事件触发时 `isTrusted` 设置为 `true`。在所有其他情况下，值为 `false`。

#### `event.preventDefault()`

<!-- YAML
added: v14.5.0
-->

如果 `cancelable` 为 `true`，则将 `defaultPrevented` 属性设置为 `true`。

#### `event.returnValue`

<!-- YAML
added: v14.5.0
-->

> 稳定性：3 - 遗留：请改用 [`event.defaultPrevented`][]。

* 类型：{boolean} 如果事件未被取消，则为 true。

`event.returnValue` 的值始终与 `event.defaultPrevented` 相反。这在 Node.js 中未使用，仅提供以保持完整性。

#### `event.srcElement`

<!-- YAML
added: v14.5.0
-->

> 稳定性：3 - 遗留：请改用 [`event.target`][]。

* 类型：{EventTarget} 派发事件的 `EventTarget`。

`event.target` 的别名。

#### `event.stopImmediatePropagation()`

<!-- YAML
added: v14.5.0
-->

在当前监听器完成调用后，停止调用事件监听器。

#### `event.stopPropagation()`

<!-- YAML
added: v14.5.0
-->

这在 Node.js 中未使用，仅提供以保持完整性。

#### `event.target`

<!-- YAML
added: v14.5.0
-->

* 类型：{EventTarget} 派发事件的 `EventTarget`。

#### `event.timeStamp`

<!-- YAML
added: v14.5.0
-->

* 类型：{number}

创建 `Event` 对象时的毫秒时间戳。

#### `event.type`

<!-- YAML
added: v14.5.0
-->

* 类型：{string}

事件类型标识符。

### 类：`EventTarget`

<!-- YAML
added: v14.5.0
changes:
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/35496
    description: "`EventTarget` 类现在可通过全局对象使用。"
-->

#### `eventTarget.addEventListener(type, listener[, options])`

<!-- YAML
added: v14.5.0
changes:
  - version: v15.4.0
    pr-url: https://github.com/nodejs/node/pull/36258
    description: "添加对 `signal` 选项的支持。"
-->

* `type` {string}
* `listener` {Function|EventListener}
* `options` {Object}
  * `once` {boolean} 当为 `true` 时，监听器在首次被调用后自动移除。**默认：** `false`。
  * `passive` {boolean} 当为 `true` 时，作为提示表明监听器不会调用 `Event` 对象的 `preventDefault()` 方法。**默认：** `false`。
  * `capture` {boolean} Node.js 不直接使用。添加以保持 API 完整性。**默认：** `false`。
  * `signal` {AbortSignal} 当给定的 AbortSignal 对象的 `abort()` 方法被调用时，监听器将被移除。

为 `type` 事件添加一个新的处理器。任何给定的 `listener` 每个 `type` 和每个 `capture` 选项值只添加一次。

如果 `once` 选项为 `true`，则在下一次派发 `type` 事件后移除 `listener`。

除了根据 `EventTarget` 规范跟踪已注册的事件监听器外，Node.js 不以任何功能方式使用 `capture` 选项。具体来说，`capture` 选项在注册 `listener` 时用作键的一部分。任何单个 `listener` 可以添加一次 `capture = false`，以及一次 `capture = true`。

```js
function handler(event) {}

const target = new EventTarget();
target.addEventListener('foo', handler, { capture: true });  // 第一次
target.addEventListener('foo', handler, { capture: false }); // 第二次

// 移除 handler 的第二个实例
target.removeEventListener('foo', handler);

// 移除 handler 的第一个实例
target.removeEventListener('foo', handler, { capture: true });
```

#### `eventTarget.dispatchEvent(event)`

<!-- YAML
added: v14.5.0
-->

* `event` {Event}
* 返回：{boolean} 如果事件的 `cancelable` 属性值为 false 或其 `preventDefault()` 方法未被调用，则为 `true`，否则为 `false`。

将 `event` 派发给 `event.type` 的处理器列表。

已注册的事件监听器按照它们注册的顺序同步调用。

#### `eventTarget.removeEventListener(type, listener[, options])`

<!-- YAML
added: v14.5.0
-->

* `type` {string}
* `listener` {Function|EventListener}
* `options` {Object}
  * `capture` {boolean}

从事件 `type` 的处理器列表中移除 `listener`。

### 类：`CustomEvent`

<!-- YAML
added:
  - v18.7.0
  - v16.17.0
changes:
  - version: v23.0.0
    pr-url: https://github.com/nodejs/node/pull/52723
    description: 不再是实验性的。
  - version:
    - v22.1.0
    - v20.13.0
    pr-url: https://github.com/nodejs/node/pull/52618
    description: CustomEvent 现在是稳定的。
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44860
    description: "不再位于 `--experimental-global-customevent` CLI 标志之后。"
-->

* 继承：{Event}

`CustomEvent` 对象是 [`CustomEvent` Web API][] 的适配版本。实例由 Node.js 内部创建。

#### `event.detail`

<!-- YAML
added:
  - v18.7.0
  - v16.17.0
changes:
  - version:
    - v22.1.0
    - v20.13.0
    pr-url: https://github.com/nodejs/node/pull/52618
    description: CustomEvent 现在是稳定的。
-->

* 类型：{any} 返回初始化时传递的自定义数据。

只读。

### 类：`NodeEventTarget`

<!-- YAML
added: v14.5.0
-->

* 继承：{EventTarget}

`NodeEventTarget` 是 `EventTarget` 的 Node.js 特定扩展，模拟了 `EventEmitter` API 的子集。

#### `nodeEventTarget.addListener(type, listener)`

<!-- YAML
added: v14.5.0
-->

* `type` {string}

* `listener` {Function|EventListener}

* 返回：{EventTarget} this

`EventTarget` 类的 Node.js 特定扩展，模拟等效的 `EventEmitter` API。`addListener()` 和 `addEventListener()` 之间的唯一区别是 `addListener()` 将返回对 `EventTarget` 的引用。

#### `nodeEventTarget.emit(type, arg)`

<!-- YAML
added: v15.2.0
-->

* `type` {string}
* `arg` {any}
* 返回：{boolean} 如果为 `type` 注册的事件监听器存在，则为 `true`，否则为 `false`。

`EventTarget` 类的 Node.js 特定扩展，将 `arg` 派发给 `type` 的处理器列表。

#### `nodeEventTarget.eventNames()`

<!-- YAML
added: v14.5.0
-->

* 返回：{string\[]}

`EventTarget` 类的 Node.js 特定扩展，返回已注册事件监听器的事件 `type` 名称数组。

#### `nodeEventTarget.listenerCount(type)`

<!-- YAML
added: v14.5.0
-->

* `type` {string}

* 返回：{number}

`EventTarget` 类的 Node.js 特定扩展，返回为 `type` 注册的事件监听器数量。

#### `nodeEventTarget.setMaxListeners(n)`

<!-- YAML
added: v14.5.0
-->

* `n` {number}

`EventTarget` 类的 Node.js 特定扩展，将最大事件监听器数量设置为 `n`。

#### `nodeEventTarget.getMaxListeners()`

<!-- YAML
added: v14.5.0
-->

* 返回：{number}

`EventTarget` 类的 Node.js 特定扩展，返回最大事件监听器数量。

#### `nodeEventTarget.off(type, listener[, options])`

<!-- YAML
added: v14.5.0
-->

* `type` {string}

* `listener` {Function|EventListener}

* `options` {Object}
  * `capture` {boolean}

* 返回：{EventTarget} this

`eventTarget.removeEventListener()` 的 Node.js 特定别名。

#### `nodeEventTarget.on(type, listener)`

<!-- YAML
added: v14.5.0
-->

* `type` {string}

* `listener` {Function|EventListener}

* 返回：{EventTarget} this

`eventTarget.addEventListener()` 的 Node.js 特定别名。

#### `nodeEventTarget.once(type, listener)`

<!-- YAML
added: v14.5.0
-->

* `type` {string}

* `listener` {Function|EventListener}

* 返回：{EventTarget} this

`EventTarget` 类的 Node.js 特定扩展，为给定的事件 `type` 添加一个 `once` 监听器。这等同于调用 `on` 并将 `once` 选项设置为 `true`。

#### `nodeEventTarget.removeAllListeners([type])`

<!-- YAML
added: v14.5.0
-->

* `type` {string}

* 返回：{EventTarget} this

`EventTarget` 类的 Node.js 特定扩展。如果指定了 `type`，则移除 `type` 的所有已注册监听器，否则移除所有已注册监听器。

#### `nodeEventTarget.removeListener(type, listener[, options])`

<!-- YAML
added: v14.5.0
-->

* `type` {string}

* `listener` {Function|EventListener}

* `options` {Object}
  * `capture` {boolean}

* 返回：{EventTarget} this

`EventTarget` 类的 Node.js 特定扩展，移除给定 `type` 的 `listener`。`removeListener()` 和 `removeEventListener()` 之间的唯一区别是 `removeListener()` 将返回对 `EventTarget` 的引用。

[WHATWG-EventTarget]: https://dom.spec.whatwg.org/#interface-eventtarget
[`--trace-warnings`]: cli.md#--trace-warnings
[`CustomEvent` Web API]: https://dom.spec.whatwg.org/#customevent
[`EventTarget` Web API]: https://dom.spec.whatwg.org/#eventtarget
[`EventTarget` error handling]: #eventtarget-error-handling
[`Event` Web API]: https://dom.spec.whatwg.org/#event
[`domain`]: domain.md
[`e.stopImmediatePropagation()`]: #eventstopimmediatepropagation
[`emitter.removeListener()`]: #emitterremovelistenereventname-listener
[`emitter.setMaxListeners(n)`]: #emittersetmaxlistenersn
[`event.defaultPrevented`]: #eventdefaultprevented
[`event.stopPropagation()`]: #eventstoppropagation
[`event.target`]: #eventtarget
[`events.defaultMaxListeners`]: #eventsdefaultmaxlisteners
[`fs.ReadStream`]: fs.md#class-fsreadstream
[`net.Server`]: net.md#class-netserver
[`new.target.name`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new.target
[`process.on('warning')`]: process.md#event-warning
[async context]: async_context.md
[capturerejections]: #capture-rejections-of-promises
[error]: #error-events
[rejection]: #emittersymbolfornodejsrejectionerr-eventname-args
[rejectionsymbol]: #eventscapturerejectionsymbol
[stream]: stream.md
