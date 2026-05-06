# 诊断通道

<!-- YAML
added:
  - v15.1.0
  - v14.17.0
changes:
  - version:
      - v19.2.0
      - v18.13.0
    pr-url: https://github.com/nodejs/node/pull/45290
    description: diagnostics_channel 现在是稳定的。
-->

<!--introduced_in=v15.1.0-->

> 稳定性：2 - 稳定

<!-- source_link=lib/diagnostics_channel.js -->

`node:diagnostics_channel` 模块提供了一个 API，用于创建命名通道以报告任意消息数据用于诊断目的。

可以使用以下方式访问它：

```mjs
import diagnostics_channel from 'node:diagnostics_channel';
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');
```

希望报告诊断消息的模块作者应该创建一个或多个顶层通道来报告消息。通道也可以在运行时获取，但由于这样做的额外开销，不建议这样做。通道可以为了方便而导出，但只要知道名称，就可以在任何地方获取。

如果你打算让你的模块生成供他人使用的诊断数据，建议你包含所使用的命名通道以及消息数据形状的文档。通道名称通常应包括模块名称，以避免与其他模块的数据冲突。

## 公共 API

### 概述

以下是公共 API 的简单概述。

```mjs
import diagnostics_channel from 'node:diagnostics_channel';

// 获取可重用的通道对象
const channel = diagnostics_channel.channel('my-channel');

function onMessage(message, name) {
  // 接收到的数据
}

// 订阅通道
diagnostics_channel.subscribe('my-channel', onMessage);

// 检查通道是否有活跃订阅者
if (channel.hasSubscribers) {
  // 向通道发布数据
  channel.publish({
    some: 'data',
  });
}

// 取消订阅通道
diagnostics_channel.unsubscribe('my-channel', onMessage);
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');

// 获取可重用的通道对象
const channel = diagnostics_channel.channel('my-channel');

function onMessage(message, name) {
  // 接收到的数据
}

// 订阅通道
diagnostics_channel.subscribe('my-channel', onMessage);

// 检查通道是否有活跃订阅者
if (channel.hasSubscribers) {
  // 向通道发布数据
  channel.publish({
    some: 'data',
  });
}

// 取消订阅通道
diagnostics_channel.unsubscribe('my-channel', onMessage);
```

#### `diagnostics_channel.hasSubscribers(name)`

<!-- YAML
added:
 - v15.1.0
 - v14.17.0
-->

* `name` {string|symbol} 通道名称
* 返回：{boolean} 如果存在活跃订阅者

检查命名通道是否有活跃订阅者。如果你要发送的消息准备开销可能很大，这很有帮助。

此 API 是可选的，但在尝试从对性能非常敏感的代码发布消息时很有帮助。

```mjs
import diagnostics_channel from 'node:diagnostics_channel';

if (diagnostics_channel.hasSubscribers('my-channel')) {
  // 存在订阅者，准备并发布消息
}
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');

if (diagnostics_channel.hasSubscribers('my-channel')) {
  // 存在订阅者，准备并发布消息
}
```

#### `diagnostics_channel.channel(name)`

<!-- YAML
added:
 - v15.1.0
 - v14.17.0
-->

* `name` {string|symbol} 通道名称
* 返回：{Channel} 命名通道对象

这是任何想要发布到命名通道的人的主要入口点。它生成一个通道对象，该对象经过优化，尽可能减少发布时的开销。

```mjs
import diagnostics_channel from 'node:diagnostics_channel';

const channel = diagnostics_channel.channel('my-channel');
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');

const channel = diagnostics_channel.channel('my-channel');
```

#### `diagnostics_channel.subscribe(name, onMessage)`

<!-- YAML
added:
 - v18.7.0
 - v16.17.0
-->

* `name` {string|symbol} 通道名称
* `onMessage` {Function} 接收通道消息的处理函数
  * `message` {any} 消息数据
  * `name` {string|symbol} 通道名称

注册消息处理函数以订阅此通道。每当消息发布到通道时，此消息处理函数将同步运行。消息处理函数中抛出的任何错误都将触发一个 [`'uncaughtException'`][]。

```mjs
import diagnostics_channel from 'node:diagnostics_channel';

diagnostics_channel.subscribe('my-channel', (message, name) => {
  // 接收到的数据
});
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');

diagnostics_channel.subscribe('my-channel', (message, name) => {
  // 接收到的数据
});
```

#### `diagnostics_channel.unsubscribe(name, onMessage)`

<!-- YAML
added:
 - v18.7.0
 - v16.17.0
-->

* `name` {string|symbol} 通道名称
* `onMessage` {Function} 要移除的之前订阅的处理函数
* 返回：{boolean} 如果找到处理函数则为 `true`，否则为 `false`。

移除之前使用 [`diagnostics_channel.subscribe(name, onMessage)`][] 注册到此通道的消息处理函数。

```mjs
import diagnostics_channel from 'node:diagnostics_channel';

function onMessage(message, name) {
  // 接收到的数据
}

diagnostics_channel.subscribe('my-channel', onMessage);

diagnostics_channel.unsubscribe('my-channel', onMessage);
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');

function onMessage(message, name) {
  // 接收到的数据
}

diagnostics_channel.subscribe('my-channel', onMessage);

diagnostics_channel.unsubscribe('my-channel', onMessage);
```

#### `diagnostics_channel.tracingChannel(nameOrChannels)`

<!-- YAML
added:
 - v19.9.0
 - v18.19.0
-->

> 稳定性：1 - 实验性

* `nameOrChannels` {string|TracingChannel} 通道名称或包含所有 [TracingChannel 通道][] 的对象
* 返回：{TracingChannel} 用于追踪的通道集合

为给定的 [TracingChannel 通道][] 创建一个 [`TracingChannel`][] 包装器。如果给定名称，将以 `tracing:${name}:${eventType}` 的形式创建相应的追踪通道，其中 `eventType` 对应于 [TracingChannel 通道][] 的类型。

```mjs
import diagnostics_channel from 'node:diagnostics_channel';

const channelsByName = diagnostics_channel.tracingChannel('my-channel');

// 或...

const channelsByCollection = diagnostics_channel.tracingChannel({
  start: diagnostics_channel.channel('tracing:my-channel:start'),
  end: diagnostics_channel.channel('tracing:my-channel:end'),
  asyncStart: diagnostics_channel.channel('tracing:my-channel:asyncStart'),
  asyncEnd: diagnostics_channel.channel('tracing:my-channel:asyncEnd'),
  error: diagnostics_channel.channel('tracing:my-channel:error'),
});
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');

const channelsByName = diagnostics_channel.tracingChannel('my-channel');

// 或...

const channelsByCollection = diagnostics_channel.tracingChannel({
  start: diagnostics_channel.channel('tracing:my-channel:start'),
  end: diagnostics_channel.channel('tracing:my-channel:end'),
  asyncStart: diagnostics_channel.channel('tracing:my-channel:asyncStart'),
  asyncEnd: diagnostics_channel.channel('tracing:my-channel:asyncEnd'),
  error: diagnostics_channel.channel('tracing:my-channel:error'),
});
```

#### `diagnostics_channel.boundedChannel(nameOrChannels)`

<!-- YAML
added: REPLACEME
-->

> 稳定性：1 - 实验性

* `nameOrChannels` {string|BoundedChannel} 通道名称或包含所有 [BoundedChannel 通道][] 的对象
* 返回：{BoundedChannel} 用于追踪的通道集合

为给定的通道创建一个 [`BoundedChannel`][] 包装器。如果给定名称，将以 `tracing:${name}:${eventType}` 的形式创建相应的通道，其中 `eventType` 为 `start` 或 `end`。

`BoundedChannel` 是 [`TracingChannel`][] 的简化版本，仅追踪同步操作。它只有 `start` 和 `end` 事件，没有 `asyncStart`、`asyncEnd` 或 `error` 事件，使其适合追踪不涉及异步延续或错误处理的操作。

```mjs
import { boundedChannel, channel } from 'node:diagnostics_channel';

const wc = boundedChannel('my-operation');

// 或...

const wc2 = boundedChannel({
  start: channel('tracing:my-operation:start'),
  end: channel('tracing:my-operation:end'),
});
```

```cjs
const { boundedChannel, channel } = require('node:diagnostics_channel');

const wc = boundedChannel('my-operation');

// 或...

const wc2 = boundedChannel({
  start: channel('tracing:my-operation:start'),
  end: channel('tracing:my-operation:end'),
});
```

### 类：`Channel`

<!-- YAML
added:
 - v15.1.0
 - v14.17.0
-->

`Channel` 类代表数据管道中的独立命名通道。它用于跟踪订阅者并在有订阅者时发布消息。它作为单独的对象存在，以避免在发布时进行通道查找，从而实现非常快的发布速度，并允许大量使用而产生极小的开销。通道是使用 [`diagnostics_channel.channel(name)`][] 创建的，不支持直接使用 `new Channel(name)` 构造通道。

#### `channel.hasSubscribers`

<!-- YAML
added:
 - v15.1.0
 - v14.17.0
-->

* 返回：{boolean} 如果存在活跃订阅者

检查此通道是否有活跃订阅者。如果你要发送的消息准备开销可能很大，这很有帮助。

此 API 是可选的，但在尝试从对性能非常敏感的代码发布消息时很有帮助。

```mjs
import diagnostics_channel from 'node:diagnostics_channel';

const channel = diagnostics_channel.channel('my-channel');

if (channel.hasSubscribers) {
  // 存在订阅者，准备并发布消息
}
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');

const channel = diagnostics_channel.channel('my-channel');

if (channel.hasSubscribers) {
  // 存在订阅者，准备并发布消息
}
```

#### `channel.publish(message)`

<!-- YAML
added:
 - v15.1.0
 - v14.17.0
-->

* `message` {any} 要发送给通道订阅者的消息

向通道的任何订阅者发布消息。这将同步触发消息处理函数，因此它们将在同一上下文中执行。

```mjs
import diagnostics_channel from 'node:diagnostics_channel';

const channel = diagnostics_channel.channel('my-channel');

channel.publish({
  some: 'message',
});
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');

const channel = diagnostics_channel.channel('my-channel');

channel.publish({
  some: 'message',
});
```

#### `channel.subscribe(onMessage)`

<!-- YAML
added:
 - v15.1.0
 - v14.17.0
changes:
  - version:
    - v24.8.0
    - v22.20.0
    pr-url: https://github.com/nodejs/node/pull/59758
    description: 弃用已撤销。
  - version:
    - v18.7.0
    - v16.17.0
    pr-url: https://github.com/nodejs/node/pull/44943
    description: 仅文档弃用。
-->

* `onMessage` {Function} 接收通道消息的处理函数
  * `message` {any} 消息数据
  * `name` {string|symbol} 通道名称

注册消息处理函数以订阅此通道。每当消息发布到通道时，此消息处理函数将同步运行。消息处理函数中抛出的任何错误都将触发一个 [`'uncaughtException'`][]。

```mjs
import diagnostics_channel from 'node:diagnostics_channel';

const channel = diagnostics_channel.channel('my-channel');

channel.subscribe((message, name) => {
  // 接收到的数据
});
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');

const channel = diagnostics_channel.channel('my-channel');

channel.subscribe((message, name) => {
  // 接收到的数据
});
```

#### `channel.unsubscribe(onMessage)`

<!-- YAML
added:
 - v15.1.0
 - v14.17.0
changes:
  - version:
    - v24.8.0
    - v22.20.0
    pr-url: https://github.com/nodejs/node/pull/59758
    description: 弃用已撤销。
  - version:
    - v18.7.0
    - v16.17.0
    pr-url: https://github.com/nodejs/node/pull/44943
    description: 仅文档弃用。
  - version:
    - v17.1.0
    - v16.14.0
    - v14.19.0
    pr-url: https://github.com/nodejs/node/pull/40433
    description: 添加了返回值。添加到没有订阅者的通道。
-->

* `onMessage` {Function} 要移除的之前订阅的处理函数
* 返回：{boolean} 如果找到处理函数则为 `true`，否则为 `false`。

移除之前使用 [`channel.subscribe(onMessage)`][] 注册到此通道的消息处理函数。

```mjs
import diagnostics_channel from 'node:diagnostics_channel';

const channel = diagnostics_channel.channel('my-channel');

function onMessage(message, name) {
  // 接收到的数据
}

channel.subscribe(onMessage);

channel.unsubscribe(onMessage);
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');

const channel = diagnostics_channel.channel('my-channel');

function onMessage(message, name) {
  // 接收到的数据
}

channel.subscribe(onMessage);

channel.unsubscribe(onMessage);
```

#### `channel.bindStore(store[, transform])`

<!-- YAML
added:
 - v19.9.0
 - v18.19.0
-->

> 稳定性：1 - 实验性

* `store` {AsyncLocalStorage} 要绑定上下文数据的存储
* `transform` {Function} 在设置存储上下文之前转换上下文数据

当调用 [`channel.runStores(context, ...)`][] 时，给定的上下文数据将应用于绑定到通道的任何存储。如果存储已经绑定，之前的 `transform` 函数将被新的替换。可以省略 `transform` 函数以直接将给定的上下文数据设置为上下文。

```mjs
import diagnostics_channel from 'node:diagnostics_channel';
import { AsyncLocalStorage } from 'node:async_hooks';

const store = new AsyncLocalStorage();

const channel = diagnostics_channel.channel('my-channel');

channel.bindStore(store, (data) => {
  return { data };
});
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');
const { AsyncLocalStorage } = require('node:async_hooks');

const store = new AsyncLocalStorage();

const channel = diagnostics_channel.channel('my-channel');

channel.bindStore(store, (data) => {
  return { data };
});
```

#### `channel.unbindStore(store)`

<!-- YAML
added:
 - v19.9.0
 - v18.19.0
-->

> 稳定性：1 - 实验性

* `store` {AsyncLocalStorage} 要从通道解绑的存储。
* 返回：{boolean} 如果找到存储则为 `true`，否则为 `false`。

移除之前使用 [`channel.bindStore(store)`][] 注册到此通道的消息处理函数。

```mjs
import diagnostics_channel from 'node:diagnostics_channel';
import { AsyncLocalStorage } from 'node:async_hooks';

const store = new AsyncLocalStorage();

const channel = diagnostics_channel.channel('my-channel');

channel.bindStore(store);
channel.unbindStore(store);
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');
const { AsyncLocalStorage } = require('node:async_hooks');

const store = new AsyncLocalStorage();

const channel = diagnostics_channel.channel('my-channel');

channel.bindStore(store);
channel.unbindStore(store);
```

#### `channel.runStores(context, fn[, thisArg[, ...args]])`

<!-- YAML
added:
 - v19.9.0
 - v18.19.0
-->

> 稳定性：1 - 实验性

* `context` {any} 要发送给订阅者并绑定到存储的消息
* `fn` {Function} 要在进入的存储上下文中运行的处理函数
* `thisArg` {any} 用于函数调用的接收者。
* `...args` {any} 传递给函数的可选参数。

将给定数据应用于绑定到通道的任何 AsyncLocalStorage 实例，持续给定函数的 duration，然后在数据应用于存储的范围内发布到通道。

如果给 [`channel.bindStore(store)`][] 提供了 transform 函数，它将在消息数据成为存储的上下文值之前应用于转换消息数据。在需要上下文链接的情况下，先前的存储上下文可在 transform 函数内访问。

应用于存储的上下文应在从给定函数开始执行的任何异步代码中可访问，但在某些情况下可能会发生 [上下文丢失][]。

```mjs
import diagnostics_channel from 'node:diagnostics_channel';
import { AsyncLocalStorage } from 'node:async_hooks';

const store = new AsyncLocalStorage();

const channel = diagnostics_channel.channel('my-channel');

channel.bindStore(store, (message) => {
  const parent = store.getStore();
  return new Span(message, parent);
});
channel.runStores({ some: 'message' }, () => {
  store.getStore(); // Span({ some: 'message' })
});
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');
const { AsyncLocalStorage } = require('node:async_hooks');

const store = new AsyncLocalStorage();

const channel = diagnostics_channel.channel('my-channel');

channel.bindStore(store, (message) => {
  const parent = store.getStore();
  return new Span(message, parent);
});
channel.runStores({ some: 'message' }, () => {
  store.getStore(); // Span({ some: 'message' })
});
```

#### `channel.withStoreScope(data)`

<!-- YAML
added: REPLACEME
-->

> 稳定性：1 - 实验性

* `data` {any} 要绑定到存储的消息
* 返回：{RunStoresScope} 可处置的作用域对象

创建一个可处置的作用域，将给定数据绑定到绑定到通道的任何 AsyncLocalStorage 实例，并发布给订阅者。处置时，作用域自动恢复先前的存储上下文。

此方法启用使用 JavaScript 的显式资源管理（`using` 语法与 `Symbol.dispose`）来管理存储上下文而无需闭包包装。

```mjs
import { channel } from 'node:diagnostics_channel';
import { AsyncLocalStorage } from 'node:async_hooks';

const store = new AsyncLocalStorage();
const ch = channel('my-channel');

ch.bindStore(store, (message) => {
  return { ...message, timestamp: Date.now() };
});

{
  using scope = ch.withStoreScope({ request: 'data' });
  // 存储已进入，数据已发布
  console.log(store.getStore()); // { request: 'data', timestamp: ... }
}
// 存储已在作用域退出时自动恢复
```

```cjs
const { channel } = require('node:diagnostics_channel');
const { AsyncLocalStorage } = require('node:async_hooks');

const store = new AsyncLocalStorage();
const ch = channel('my-channel');

ch.bindStore(store, (message) => {
  return { ...message, timestamp: Date.now() };
});

{
  using scope = ch.withStoreScope({ request: 'data' });
  // 存储已进入，数据已发布
  console.log(store.getStore()); // { request: 'data', timestamp: ... }
}
// 存储已在作用域退出时自动恢复
```

### 类：`RunStoresScope`

<!-- YAML
added: REPLACEME
-->

> 稳定性：1 - 实验性

`RunStoresScope` 类代表由 [`channel.withStoreScope(data)`][] 创建的可处置作用域。它管理存储上下文的生命周期，并确保它们在作用域退出时被正确恢复。

必须与 `using` 语法一起使用作用域以确保正确处置。

### 类：`TracingChannel`

<!-- YAML
added:
 - v19.9.0
 - v18.19.0
-->

> 稳定性：1 - 实验性

`TracingChannel` 类是 [TracingChannel 通道][] 的集合，共同表示单个可追踪的操作。它用于形式化并简化生成用于追踪应用程序流的事件的过程。[`diagnostics_channel.tracingChannel()`][] 用于构造 `TracingChannel`。与 `Channel` 一样，建议在文件顶层创建并重用单个 `TracingChannel`，而不是动态创建它们。

#### `tracingChannel.subscribe(subscribers)`

<!-- YAML
added:
 - v19.9.0
 - v18.19.0
-->

* `subscribers` {Object} [TracingChannel 通道][] 订阅者集合
  * `start` {Function} [`start` 事件][] 订阅者
  * `end` {Function} [`end` 事件][] 订阅者
  * `asyncStart` {Function} [`asyncStart` 事件][] 订阅者
  * `asyncEnd` {Function} [`asyncEnd` 事件][] 订阅者
  * `error` {Function} [`error` 事件][] 订阅者

用于订阅函数集合到相应通道的辅助函数。这与在每个通道上单独调用 [`channel.subscribe(onMessage)`][] 相同。

```mjs
import diagnostics_channel from 'node:diagnostics_channel';

const channels = diagnostics_channel.tracingChannel('my-channel');

channels.subscribe({
  start(message) {
    // 处理 start 消息
  },
  end(message) {
    // 处理 end 消息
  },
  asyncStart(message) {
    // 处理 asyncStart 消息
  },
  asyncEnd(message) {
    // 处理 asyncEnd 消息
  },
  error(message) {
    // 处理 error 消息
  },
});
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');

const channels = diagnostics_channel.tracingChannel('my-channel');

channels.subscribe({
  start(message) {
    // 处理 start 消息
  },
  end(message) {
    // 处理 end 消息
  },
  asyncStart(message) {
    // 处理 asyncStart 消息
  },
  asyncEnd(message) {
    // 处理 asyncEnd 消息
  },
  error(message) {
    // 处理 error 消息
  },
});
```

#### `tracingChannel.unsubscribe(subscribers)`

<!-- YAML
added:
 - v19.9.0
 - v18.19.0
-->

* `subscribers` {Object} [TracingChannel 通道][] 订阅者集合
  * `start` {Function} [`start` 事件][] 订阅者
  * `end` {Function} [`end` 事件][] 订阅者
  * `asyncStart` {Function} [`asyncStart` 事件][] 订阅者
  * `asyncEnd` {Function} [`asyncEnd` 事件][] 订阅者
  * `error` {Function} [`error` 事件][] 订阅者
* 返回：{boolean} 如果所有处理函数都成功取消订阅则为 `true`，否则为 `false`。

用于从相应通道取消订阅函数集合的辅助函数。这与在每个通道上单独调用 [`channel.unsubscribe(onMessage)`][] 相同。

```mjs
import diagnostics_channel from 'node:diagnostics_channel';

const channels = diagnostics_channel.tracingChannel('my-channel');

channels.unsubscribe({
  start(message) {
    // 处理 start 消息
  },
  end(message) {
    // 处理 end 消息
  },
  asyncStart(message) {
    // 处理 asyncStart 消息
  },
  asyncEnd(message) {
    // 处理 asyncEnd 消息
  },
  error(message) {
    // 处理 error 消息
  },
});
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');

const channels = diagnostics_channel.tracingChannel('my-channel');

channels.unsubscribe({
  start(message) {
    // 处理 start 消息
  },
  end(message) {
    // 处理 end 消息
  },
  asyncStart(message) {
    // 处理 asyncStart 消息
  },
  asyncEnd(message) {
    // 处理 asyncEnd 消息
  },
  error(message) {
    // 处理 error 消息
  },
});
```

#### `tracingChannel.traceSync(fn[, context[, thisArg[, ...args]]])`

<!-- YAML
added:
 - v19.9.0
 - v18.19.0
-->

* `fn` {Function} 要围绕其进行追踪的函数
* `context` {Object} 用于关联事件的共享对象
* `thisArg` {any} 用于函数调用的接收者
* `...args` {any} 传递给函数的可选参数
* 返回：{any} 给定函数的返回值

追踪同步函数调用。这将始终在执行周围产生 [`start` 事件][] 和 [`end` 事件][]，如果给定函数抛出错误，可能会产生 [`error` 事件][]。这将在 `start` 通道上使用 [`channel.runStores(context, ...)`][] 运行给定函数，确保所有事件都将任何绑定的存储设置为匹配此追踪上下文。

为确保只形成正确的追踪图，只有在开始追踪之前存在订阅者时才会发布事件。在追踪开始后添加的订阅将不会接收来自该追踪的未来事件，只会看到未来的追踪。

```mjs
import diagnostics_channel from 'node:diagnostics_channel';

const channels = diagnostics_channel.tracingChannel('my-channel');

channels.traceSync(() => {
  // 做点什么
}, {
  some: 'thing',
});
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');

const channels = diagnostics_channel.tracingChannel('my-channel');

channels.traceSync(() => {
  // 做点什么
}, {
  some: 'thing',
});
```

#### `tracingChannel.tracePromise(fn[, context[, thisArg[, ...args]]])`

<!-- YAML
added:
 - v19.9.0
 - v18.19.0
changes:
  - version: v26.0.0
    pr-url: https://github.com/nodejs/node/pull/61766
    description: 自定义 thenable 将不再被包装为原生 Promise。非 thenable 将被返回并带有警告。
-->

* `fn` {Function} 要围绕其进行追踪的函数
* `context` {Object} 用于关联追踪事件的共享对象
* `thisArg` {any} 用于函数调用的接收者
* `...args` {any} 传递给函数的可选参数
* 返回：{any} 给定函数的返回值，或者如果追踪通道有活跃订阅者则为在返回值上调用 `.then(...)` 的结果。如果返回值不是 Promise 或 thenable，则原样返回并发出警告。

追踪返回 {Promise} 或 [thenable 对象][] 的异步函数调用。这将始终在函数执行的同步部分周围产生 [`start` 事件][] 和 [`end` 事件][]，并在返回的 promise 被解决或拒绝时产生 [`asyncStart` 事件][] 和 [`asyncEnd` 事件][]。如果给定函数抛出错误或返回的 promise 被拒绝，也可能产生 [`error` 事件][]。这将在 `start` 通道上使用 [`channel.runStores(context, ...)`][] 运行给定函数，确保所有事件都将任何绑定的存储设置为匹配此追踪上下文。

如果 `fn` 返回的值不是 Promise 或 thenable，则将其返回并带有警告，并且不会产生 `asyncStart` 或 `asyncEnd` 事件。

为确保只形成正确的追踪图，只有在开始追踪之前存在订阅者时才会发布事件。在追踪开始后添加的订阅将不会接收来自该追踪的未来事件，只会看到未来的追踪。

```mjs
import diagnostics_channel from 'node:diagnostics_channel';

const channels = diagnostics_channel.tracingChannel('my-channel');

channels.tracePromise(async () => {
  // 做点什么
}, {
  some: 'thing',
});
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');

const channels = diagnostics_channel.tracingChannel('my-channel');

channels.tracePromise(async () => {
  // 做点什么
}, {
  some: 'thing',
});
```

#### `tracingChannel.traceCallback(fn[, position[, context[, thisArg[, ...args]]]])`

<!-- YAML
added:
 - v19.9.0
 - v18.19.0
-->

* `fn` {Function} 要围绕其进行追踪的使用回调的函数
* `position` {number} 预期回调的从零开始的参数位置（如果传入 `undefined` 则默认为最后一个参数）
* `context` {Object} 用于关联追踪事件的共享对象（如果传入 `undefined` 则默认为 `{}`）
* `thisArg` {any} 用于函数调用的接收者
* `...args` {any} 传递给函数的参数（必须包含回调）
* 返回：{any} 给定函数的返回值

追踪接收回调的函数调用。预期回调遵循错误作为第一个参数的约定。这将始终在函数执行的同步部分周围产生 [`start` 事件][] 和 [`end` 事件][]，并在回调执行周围产生 [`asyncStart` 事件][] 和 [`asyncEnd` 事件][]。如果给定函数抛出或传递给回调的第一个参数被设置，也可能产生 [`error` 事件][]。这将在 `start` 通道上使用 [`channel.runStores(context, ...)`][] 运行给定函数，确保所有事件都将任何绑定的存储设置为匹配此追踪上下文。

为确保只形成正确的追踪图，只有在开始追踪之前存在订阅者时才会发布事件。在追踪开始后添加的订阅将不会接收来自该追踪的未来事件，只会看到未来的追踪。

```mjs
import diagnostics_channel from 'node:diagnostics_channel';

const channels = diagnostics_channel.tracingChannel('my-channel');

channels.traceCallback((arg1, callback) => {
  // 做点什么
  callback(null, 'result');
}, 1, {
  some: 'thing',
}, thisArg, arg1, callback);
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');

const channels = diagnostics_channel.tracingChannel('my-channel');

channels.traceCallback((arg1, callback) => {
  // 做点什么
  callback(null, 'result');
}, 1, {
  some: 'thing',
}, thisArg, arg1, callback);
```

回调也将使用 [`channel.runStores(context, ...)`][] 运行，这在某些情况下启用上下文丢失恢复。

```mjs
import diagnostics_channel from 'node:diagnostics_channel';
import { AsyncLocalStorage } from 'node:async_hooks';

const channels = diagnostics_channel.tracingChannel('my-channel');
const myStore = new AsyncLocalStorage();

// start 通道将初始存储数据设置为某物
// 并将该存储数据值存储在追踪上下文对象上
channels.start.bindStore(myStore, (data) => {
  const span = new Span(data);
  data.span = span;
  return span;
});

// 然后 asyncStart 可以从之前存储的数据中恢复
channels.asyncStart.bindStore(myStore, (data) => {
  return data.span;
});
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');
const { AsyncLocalStorage } = require('node:async_hooks');

const channels = diagnostics_channel.tracingChannel('my-channel');
const myStore = new AsyncLocalStorage();

// start 通道将初始存储数据设置为某物
// 并将该存储数据值存储在追踪上下文对象上
channels.start.bindStore(myStore, (data) => {
  const span = new Span(data);
  data.span = span;
  return span;
});

// 然后 asyncStart 可以从之前存储的数据中恢复
channels.asyncStart.bindStore(myStore, (data) => {
  return data.span;
});
```

#### `tracingChannel.hasSubscribers`

<!-- YAML
added:
 - v22.0.0
 - v20.13.0
-->

* 返回：{boolean} 如果任何独立通道有订阅者则为 `true`，否则为 `false`。

这是 [`TracingChannel`][] 实例上可用的辅助方法，用于检查是否有任何 [TracingChannel 通道][] 有订阅者。如果其中任何一个至少有一个订阅者则返回 `true`，否则返回 `false`。

```mjs
import diagnostics_channel from 'node:diagnostics_channel';

const channels = diagnostics_channel.tracingChannel('my-channel');

if (channels.hasSubscribers) {
  // 做点什么
}
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');

const channels = diagnostics_channel.tracingChannel('my-channel');

if (channels.hasSubscribers) {
  // 做点什么
}
```

### 类：`BoundedChannel`

<!-- YAML
added: REPLACEME
-->

> 稳定性：1 - 实验性

`BoundedChannel` 类是 [`TracingChannel`][] 的简化版本，仅追踪同步操作。它由两个通道（`start` 和 `end`）组成，而不是五个，省略了 `asyncStart`、`asyncEnd` 和 `error` 事件。这使其适合追踪不涉及异步延续或错误处理的操作。

与 `TracingChannel` 一样，建议在文件顶层创建并重用单个 `BoundedChannel`，而不是动态创建它们。

#### `boundedChannel.hasSubscribers`

<!-- YAML
added: REPLACEME
-->

* 返回：{boolean} 如果任何独立通道有订阅者则为 `true`，否则为 `false`。

检查任何 `start` 或 `end` 通道是否有订阅者。

```mjs
import { boundedChannel } from 'node:diagnostics_channel';

const wc = boundedChannel('my-operation');

if (wc.hasSubscribers) {
  // 存在订阅者，执行追踪操作
}
```

```cjs
const { boundedChannel } = require('node:diagnostics_channel');

const wc = boundedChannel('my-operation');

if (wc.hasSubscribers) {
  // 存在订阅者，执行追踪操作
}
```

#### `boundedChannel.subscribe(handlers)`

<!-- YAML
added: REPLACEME
-->

* `handlers` {Object} 通道订阅者集合
  * `start` {Function} start 事件订阅者
  * `end` {Function} end 事件订阅者

订阅有界通道事件。这与在每个通道上单独调用 [`channel.subscribe(onMessage)`][] 等效。

```mjs
import { boundedChannel } from 'node:diagnostics_channel';

const wc = boundedChannel('my-operation');

wc.subscribe({
  start(message) {
    // 处理 start
  },
  end(message) {
    // 处理 end
  },
});
```

```cjs
const { boundedChannel } = require('node:diagnostics_channel');

const wc = boundedChannel('my-operation');

wc.subscribe({
  start(message) {
    // 处理 start
  },
  end(message) {
    // 处理 end
  },
});
```

#### `boundedChannel.unsubscribe(handlers)`

<!-- YAML
added: REPLACEME
-->

* `handlers` {Object} 通道订阅者集合
  * `start` {Function} start 事件订阅者
  * `end` {Function} end 事件订阅者
* 返回：{boolean} 如果所有处理函数都成功取消订阅则为 `true`，否则为 `false`。

取消订阅有界通道事件。这与在每个通道上单独调用 [`channel.unsubscribe(onMessage)`][] 等效。

```mjs
import { boundedChannel } from 'node:diagnostics_channel';

const wc = boundedChannel('my-operation');

const handlers = {
  start(message) {},
  end(message) {},
};

wc.subscribe(handlers);
wc.unsubscribe(handlers);
```

```cjs
const { boundedChannel } = require('node:diagnostics_channel');

const wc = boundedChannel('my-operation');

const handlers = {
  start(message) {},
  end(message) {},
};

wc.subscribe(handlers);
wc.unsubscribe(handlers);
```

#### `boundedChannel.run(context, fn[, thisArg[, ...args]])`

<!-- YAML
added: REPLACEME
-->

* `context` {Object} 用于关联事件的共享对象
* `fn` {Function} 要围绕其进行追踪的函数
* `thisArg` {any} 用于函数调用的接收者
* `...args` {any} 传递给函数的可选参数
* 返回：{any} 给定函数的返回值

追踪同步函数调用。这将在执行周围产生 `start` 事件和 `end` 事件。这将在 `start` 通道上使用 [`channel.runStores(context, ...)`][] 运行给定函数，确保所有事件都将任何绑定的存储设置为匹配此追踪上下文。

```mjs
import { boundedChannel } from 'node:diagnostics_channel';

const wc = boundedChannel('my-operation');

const result = wc.run({ operationId: '123' }, () => {
  // 执行操作
  return 42;
});
```

```cjs
const { boundedChannel } = require('node:diagnostics_channel');

const wc = boundedChannel('my-operation');

const result = wc.run({ operationId: '123' }, () => {
  // 执行操作
  return 42;
});
```

#### `boundedChannel.withScope([context])`

<!-- YAML
added: REPLACEME
-->

* `context` {Object} 用于关联事件的共享对象
* 返回：{BoundedChannelScope} 可处置的作用域对象

创建一个可处置的作用域，用于使用 JavaScript 的显式资源管理（`using` 语法）追踪同步操作。作用域自动发布 `start` 和 `end` 事件，进入绑定的存储，并在处置时处理清理。

```mjs
import { boundedChannel } from 'node:diagnostics_channel';

const wc = boundedChannel('my-operation');

const context = { operationId: '123' };
{
  using scope = wc.withScope(context);
  // 存储已进入，start 事件已发布

  // 执行工作并在上下文上设置结果
  context.result = 42;
}
// End 事件已发布，存储已自动恢复
```

```cjs
const { boundedChannel } = require('node:diagnostics_channel');

const wc = boundedChannel('my-operation');

const context = { operationId: '123' };
{
  using scope = wc.withScope(context);
  // 存储已进入，start 事件已发布

  // 执行工作并在上下文上设置结果
  context.result = 42;
}
// End 事件已发布，存储已自动恢复
```

### 类：`BoundedChannelScope`

<!-- YAML
added: REPLACEME
-->

> 稳定性：1 - 实验性

`BoundedChannelScope` 类代表由 [`boundedChannel.withScope(context)`][] 创建的可处置作用域。它管理追踪操作的生命周期，自动发布事件和管理存储上下文。

必须与 `using` 语法一起使用作用域以确保正确处置。

```mjs
import { boundedChannel } from 'node:diagnostics_channel';

const wc = boundedChannel('my-operation');

const context = {};
{
  using scope = wc.withScope(context);
  // Start 事件已发布，存储已进入
  context.result = performOperation();
  // End 事件在块结束时自动发布
}
```

```cjs
const { boundedChannel } = require('node:diagnostics_channel');

const wc = boundedChannel('my-operation');

const context = {};
{
  using scope = wc.withScope(context);
  // Start 事件已发布，存储已进入
  context.result = performOperation();
  // End 事件在块结束时自动发布
}
```

### BoundedChannel 通道

`BoundedChannel` 由两个诊断通道组成，表示使用 `using` 语法创建的作用域的生命周期：

* `tracing:${name}:start` - 当 `using` 语句执行时发布（作用域创建）
* `tracing:${name}:end` - 当退出块时发布（作用域处置）

当使用 `using` 语法与 [`boundedChannel.withScope([context])`][] 时，`start` 事件在语句执行时立即发布，`end` 事件在块结束时发生处置时自动发布。所有事件共享相同的上下文对象，可以在作用域执行期间用 additional properties 如 `result` 扩展。

### TracingChannel 通道

TracingChannel 是几个 diagnostics_channels 的集合，表示单个可追踪操作的执行生命周期中的特定点。行为分为五个 diagnostics_channels，由 `start`、`end`、`asyncStart`、`asyncEnd` 和 `error` 组成。单个可追踪操作将在所有事件之间共享相同的事件对象，这对于通过 weakmap 管理关联可能很有帮助。

当任务“完成”时，这些事件对象将扩展 `result` 或 `error` 值。对于同步任务，`result` 将是返回值，`error` 将是函数抛出的任何内容。对于基于回调的异步函数，`result` 将是回调的第二个参数，而 `error` 将是 `end` 事件中可见的抛出错误，或 `asyncStart` 或 `asyncEnd` 事件中的第一个回调参数。

为确保只形成正确的追踪图，只有在开始追踪之前存在订阅者时才应发布事件。在追踪开始后添加的订阅不应接收来自该追踪的未来事件，只会看到未来的追踪。

追踪通道应遵循以下命名模式：

* `tracing:module.class.method:start` 或 `tracing:module.function:start`
* `tracing:module.class.method:end` 或 `tracing:module.function:end`
* `tracing:module.class.method:asyncStart` 或 `tracing:module.function:asyncStart`
* `tracing:module.class.method:asyncEnd` 或 `tracing:module.function:asyncEnd`
* `tracing:module.class.method:error` 或 `tracing:module.function:error`

#### `start(event)`

* 名称：`tracing:${name}:start`

`start` 事件表示函数被调用的点。此时事件数据可能包含函数参数或函数执行开始时可用的任何其他内容。

#### `end(event)`

* 名称：`tracing:${name}:end`

`end` 事件表示函数调用返回值的点。对于异步函数，这是当 promise 返回时，而不是函数内部执行 return 语句时。此时，如果追踪的函数是同步的，`result` 字段将设置为函数的返回值。或者，`error` 字段可能存在以表示任何抛出的错误。

建议专门监听 `error` 事件以追踪错误，因为可追踪的操作可能会产生多个错误。例如，失败的异步任务可能在任务的同步部分抛出错误之前就在内部启动了。

#### `asyncStart(event)`

* 名称：`tracing:${name}:asyncStart`

`asyncStart` 事件表示到达可追踪函数的回调或延续。此时回调参数等内容可能可用，或表达操作“结果”的任何其他内容。

对于基于回调的函数，回调的第一个参数将分配给 `error` 字段（如果不是 `undefined` 或 `null`），第二个参数将分配给 `result` 字段。

对于 promises，`resolve` 路径的参数将分配给 `result`，或 `reject` 路径的参数将分配给 `error`。

建议专门监听 `error` 事件以追踪错误，因为可追踪的操作可能会产生多个错误。例如，失败的异步任务可能在任务的同步部分抛出错误之前就在内部启动了。

#### `asyncEnd(event)`

* 名称：`tracing:${name}:asyncEnd`

`asyncEnd` 事件表示异步函数的回调返回。`asyncStart` 事件后事件数据不太可能更改，但查看回调完成的点可能很有用。

#### `error(event)`

* 名称：`tracing:${name}:error`

`error` 事件表示可追踪函数同步或异步产生的任何错误。如果在追踪函数的同步部分抛出错误，错误将分配给事件的 `error` 字段，并且将触发 `error` 事件。如果通过回调或 promise 拒绝异步接收错误，它也将分配给事件的 `error` 字段，并触发 `error` 事件。

单个可追踪函数调用可能多次产生错误，因此在消费此事件时应考虑这一点。例如，如果内部触发了另一个失败的异步任务，然后函数的同步部分抛出错误，将发出两个 `error` 事件，一个用于同步错误，一个用于异步错误。

### 内置通道

#### Console

> 稳定性：1 - 实验性

##### 事件：`'console.log'`

* `args` {any[]}

当调用 `console.log()` 时发出。接收传递给 `console.log()` 的参数数组。

##### 事件：`'console.info'`

* `args` {any[]}

当调用 `console.info()` 时发出。接收传递给 `console.info()` 的参数数组。

##### 事件：`'console.debug'`

* `args` {any[]}

当调用 `console.debug()` 时发出。接收传递给 `console.debug()` 的参数数组。

##### 事件：`'console.warn'`

* `args` {any[]}

当调用 `console.warn()` 时发出。接收传递给 `console.warn()` 的参数数组。

##### 事件：`'console.error'`

* `args` {any[]}

当调用 `console.error()` 时发出。接收传递给 `console.error()` 的参数数组。

#### HTTP

> 稳定性：1 - 实验性

##### 事件：`'http.client.request.created'`

* `request` {http.ClientRequest}

当客户端创建请求对象时发出。
与 `http.client.request.start` 不同，此事件在请求发送之前发出。

##### 事件：`'http.client.request.start'`

* `request` {http.ClientRequest}

当客户端启动请求时发出。

##### 事件：`'http.client.request.error'`

* `request` {http.ClientRequest}
* `error` {Error}

当客户端请求期间发生错误时发出。

##### 事件：`'http.client.response.finish'`

* `request` {http.ClientRequest}
* `response` {http.IncomingMessage}

当客户端接收响应时发出。

##### 事件：`'http.server.request.start'`

* `request` {http.IncomingMessage}
* `response` {http.ServerResponse}
* `socket` {net.Socket}
* `server` {http.Server}

当服务器接收请求时发出。

##### 事件：`'http.server.response.created'`

* `request` {http.IncomingMessage}
* `response` {http.ServerResponse}

当服务器创建响应时发出。
该事件在响应发送之前发出。

##### 事件：`'http.server.response.finish'`

* `request` {http.IncomingMessage}
* `response` {http.ServerResponse}
* `socket` {net.Socket}
* `server` {http.Server}

当服务器发送响应时发出。

#### HTTP/2

> 稳定性：1 - 实验性

##### 事件：`'http2.client.stream.created'`

* `stream` {ClientHttp2Stream}
* `headers` {HTTP/2 Headers Object}

当客户端创建流时发出。

##### 事件：`'http2.client.stream.start'`

* `stream` {ClientHttp2Stream}
* `headers` {HTTP/2 Headers Object}

当客户端启动流时发出。

##### 事件：`'http2.client.stream.error'`

* `stream` {ClientHttp2Stream}
* `error` {Error}

当客户端处理流期间发生错误时发出。

##### 事件：`'http2.client.stream.finish'`

* `stream` {ClientHttp2Stream}
* `headers` {HTTP/2 Headers Object}
* `flags` {number}

当客户端接收流时发出。

##### 事件：`'http2.client.stream.bodyChunkSent'`

* `stream` {ClientHttp2Stream}
* `writev` {boolean}
* `data` {Buffer | string | Buffer[] | Object[]}
  * `chunk` {Buffer|string}
  * `encoding` {string}
* `encoding` {string}

当发送客户端流主体的一块时发出。

##### 事件：`'http2.client.stream.bodySent'`

* `stream` {ClientHttp2Stream}

在客户端流主体完全发送后发出。

##### 事件：`'http2.client.stream.close'`

* `stream` {ClientHttp2Stream}

当客户端关闭流时发出。关闭流时使用的 HTTP/2 错误代码可以使用 `stream.rstCode` 属性检索。

##### 事件：`'http2.server.stream.created'`

* `stream` {ServerHttp2Stream}
* `headers` {HTTP/2 Headers Object}

当服务器创建流时发出。

##### 事件：`'http2.server.stream.start'`

* `stream` {ServerHttp2Stream}
* `headers` {HTTP/2 Headers Object}

当服务器启动流时发出。

##### 事件：`'http2.server.stream.error'`

* `stream` {ServerHttp2Stream}
* `error` {Error}

当服务器处理流期间发生错误时发出。

##### 事件：`'http2.server.stream.finish'`

* `stream` {ServerHttp2Stream}
* `headers` {HTTP/2 Headers Object}
* `flags` {number}

当服务器发送流时发出。

##### 事件：`'http2.server.stream.close'`

* `stream` {ServerHttp2Stream}

当服务器关闭流时发出。关闭流时使用的 HTTP/2 错误代码可以使用 `stream.rstCode` 属性检索。

#### 模块

> 稳定性：1 - 实验性

##### Event: `'tracing:module.require:start'`

* `event` {Object} 包含以下属性
  * `id` 传递给 `require()` 的参数。模块名称。
  * `parentFilename` 尝试 require(id) 的模块名称。

当执行 `require()` 时发出。参见 [`start` 事件][]。

##### Event: `'tracing:module.require:end'`

* `event` {Object} 包含以下属性
  * `id` 传递给 `require()` 的参数。模块名称。
  * `parentFilename` 尝试 require(id) 的模块名称。

当 `require()` 调用返回时发出。参见 [`end` 事件][]。

##### Event: `'tracing:module.require:error'`

* `event` {Object} 包含以下属性
  * `id` 传递给 `require()` 的参数。模块名称。
  * `parentFilename` 尝试 require(id) 的模块名称。
* `error` {Error}

当 `require()` 抛出错误时发出。参见 [`error` 事件][]。

##### Event: `'tracing:module.import:asyncStart'`

* `event` {Object} 包含以下属性
  * `id` 传递给 `import()` 的参数。模块名称。
  * `parentURL` 尝试 import(id) 的模块的 URL 对象。

当调用 `import()` 时发出。参见 [`asyncStart` 事件][]。

##### Event: `'tracing:module.import:asyncEnd'`

* `event` {Object} 包含以下属性
  * `id` 传递给 `import()` 的参数。模块名称。
  * `parentURL` 尝试 import(id) 的模块的 URL 对象。

当 `import()` 完成时发出。参见 [`asyncEnd` 事件][]。

##### Event: `'tracing:module.import:error'`

* `event` {Object} 包含以下属性
  * `id` 传递给 `import()` 的参数。模块名称。
  * `parentURL` 尝试 import(id) 的模块的 URL 对象。
* `error` {Error}

当 `import()` 抛出错误时发出。参见 [`error` 事件][]。

#### NET

> 稳定性：1 - 实验性

##### 事件：`'net.client.socket'`

* `socket` {net.Socket|tls.TLSSocket}

当创建新的 TCP 或管道客户端套接字连接时发出。

##### 事件：`'net.server.socket'`

* `socket` {net.Socket}

当接收新的 TCP 或管道连接时发出。

##### 事件：`'tracing:net.server.listen:asyncStart'`

* `server` {net.Server}
* `options` {Object}

当调用 [`net.Server.listen()`][] 时发出，在端口或管道实际设置之前。

##### 事件：`'tracing:net.server.listen:asyncEnd'`

* `server` {net.Server}

当 [`net.Server.listen()`][] 完成时发出，因此服务器准备好接受连接。

##### 事件：`'tracing:net.server.listen:error'`

* `server` {net.Server}
* `error` {Error}

当 [`net.Server.listen()`][] 返回错误时发出。

#### UDP

> 稳定性：1 - 实验性

##### 事件：`'udp.socket'`

* `socket` {dgram.Socket}

当创建新的 UDP 套接字时发出。

#### 进程

> 稳定性：1 - 实验性

<!-- YAML
added: v16.18.0
-->

##### 事件：`'child_process'`

* `process` {ChildProcess}

当创建新进程时发出。

`tracing:child_process.spawn:start`

* `process` {ChildProcess}
* `options` {Object}

当调用 [`child_process.spawn()`][] 时发出，在实际生成进程之前。

`tracing:child_process.spawn:end`

* `process` {ChildProcess}

当 [`child_process.spawn()`][] 成功完成且进程已创建时发出。

`tracing:child_process.spawn:error`

* `process` {ChildProcess}
* `error` {Error}

当 [`child_process.spawn()`][] 遇到错误时发出。

##### Event: `'process.execve'`

* `execPath` {string}
* `args` {string\[]}
* `env` {string\[]}

当调用 [`process.execve()`][] 时发出。

#### Web 锁

> 稳定性：1 - 实验性

<!-- YAML
added:
 - v26.0.0
 - v25.9.0
 - v24.15.0
-->

每次调用 [`locks.request()`][] 时都会发出这些通道。有关 Web 锁的详细信息，请参阅 [`worker_threads.locks`][]。

##### 事件：`'locks.request.start'`

* `name` {string} 请求的锁资源的名称。
* `mode` {string} 锁模式：`'exclusive'` 或 `'shared'`。

当启动锁请求时发出，在授予锁之前。

##### 事件：`'locks.request.grant'`

* `name` {string} 请求的锁资源的名称。
* `mode` {string} 锁模式：`'exclusive'` 或 `'shared'`。

当成功授予锁且回调即将运行时发出。

##### 事件：`'locks.request.miss'`

* `name` {string} 请求的锁资源的名称。
* `mode` {string} 锁模式：`'exclusive'` 或 `'shared'`。

当 `ifAvailable` 为 `true` 且锁不可立即使用时发出，此时请求回调被调用时传入 `null` 而不是 `Lock` 对象。

##### 事件：`'locks.request.end'`

* `name` {string} 请求的锁资源的名称。
* `mode` {string} 锁模式：`'exclusive'` 或 `'shared'`。
* `steal` {boolean} 请求是否使用 steal 语义。
* `ifAvailable` {boolean} 请求是否使用 ifAvailable 语义。
* `error` {Error|undefined} 回调抛出的错误（如果有）。

当锁请求完成时发出，无论回调成功、抛出错误还是锁被窃取。

#### 工作线程

> 稳定性：1 - 实验性

<!-- YAML
added: v16.18.0
-->

##### 事件：`'worker_threads'`

* `worker` {Worker}

当创建新线程时发出。

[BoundedChannel 通道]: #boundedchannel-channels
[TracingChannel 通道]: #tracingchannel-channels
[`'uncaughtException'`]: process.md#event-uncaughtexception
[`BoundedChannel`]: #class-boundedchannel
[`TracingChannel`]: #class-tracingchannel
[`asyncEnd` 事件]: #asyncendevent
[`asyncStart` 事件]: #asyncstartevent
[`boundedChannel.withScope(context)`]: #boundedchannelwithscopecontext
[`channel.bindStore(store)`]: #channelbindstorestore-transform
[`channel.runStores(context, ...)`]: #channelrunstorescontext-fn-thisarg-args
[`channel.subscribe(onMessage)`]: #channelsubscribeonmessage
[`channel.unsubscribe(onMessage)`]: #channelunsubscribeonmessage
[`channel.withStoreScope(data)`]: #channelwithstorescopedata
[`child_process.spawn()`]: child_process.md#child_processspawncommand-args-options
[`diagnostics_channel.channel(name)`]: #diagnostics_channelchannelname
[`diagnostics_channel.subscribe(name, onMessage)`]: #diagnostics_channelsubscribename-onmessage
[`diagnostics_channel.tracingChannel()`]: #diagnostics_channeltracingchannelnameorchannels
[`end` 事件]: #endevent
[`error` 事件]: #errorevent
[`locks.request()`]: worker_threads.md#locksrequestname-options-callback
[`net.Server.listen()`]: net.md#serverlisten
[`process.execve()`]: process.md#processexecvefile-args-env
[`start` 事件]: #startevent
[`worker_threads.locks`]: worker_threads.md#worker_threadslocks
[上下文丢失]: async_context.md#troubleshooting-context-loss
[thenable 对象]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#thenables
