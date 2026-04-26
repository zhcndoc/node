# Web 流 API

<!--introduced_in=v16.5.0-->

<!-- YAML
added: v16.5.0
changes:
  - version:
    - v21.0.0
    pr-url: https://github.com/nodejs/node/pull/45684
    description: 不再是实验性功能。
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/42225
    description: 使用此 API 不再发出运行时警告。
-->

> 稳定性：2 - 稳定

[WHATWG 流标准][] 的实现。

## 概述

[WHATWG 流标准][]（或"web 流”）定义了一个用于处理流式数据的 API。它类似于 Node.js [流][] API，但出现得较晚，并已成为许多 JavaScript 环境中流式数据的“标准”API。

主要有三种类型的对象：

* `ReadableStream` - 代表流式数据的来源。
* `WritableStream` - 代表流式数据的目的地。
* `TransformStream` - 代表转换流式数据的算法。

### `ReadableStream` 示例

此示例创建一个简单的 `ReadableStream`，每秒永久推送一次当前的 `performance.now()` 时间戳。使用异步迭代器从流中读取数据。

```mjs
import {
  ReadableStream,
} from 'node:stream/web';

import {
  setInterval as every,
} from 'node:timers/promises';

import {
  performance,
} from 'node:perf_hooks';

const SECOND = 1000;

const stream = new ReadableStream({
  async start(controller) {
    for await (const _ of every(SECOND))
      controller.enqueue(performance.now());
  },
});

for await (const value of stream)
  console.log(value);
```

```cjs
const {
  ReadableStream,
} = require('node:stream/web');

const {
  setInterval: every,
} = require('node:timers/promises');

const {
  performance,
} = require('node:perf_hooks');

const SECOND = 1000;

const stream = new ReadableStream({
  async start(controller) {
    for await (const _ of every(SECOND))
      controller.enqueue(performance.now());
  },
});

(async () => {
  for await (const value of stream)
    console.log(value);
})();
```

### Node.js 流互操作性

Node.js 流可以通过 [`stream.Readable`][]、[`stream.Writable`][] 和 [`stream.Duplex`][] 对象上存在的 `toWeb` 和 `fromWeb` 方法转换为 web 流，反之亦然。

有关更多详细信息，请参阅相关文档：

* [`stream.Readable.toWeb`][]
* [`stream.Readable.fromWeb`][]
* [`stream.Writable.toWeb`][]
* [`stream.Writable.fromWeb`][]
* [`stream.Duplex.toWeb`][]
* [`stream.Duplex.fromWeb`][]

## API

### 类：`ReadableStream`

<!-- YAML
added: v16.5.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/42225
    description: 此类现在暴露于全局对象上。
-->

#### `new ReadableStream([underlyingSource [, strategy]])`

<!-- YAML
added: v16.5.0
-->

<!--lint disable maximum-line-length remark-lint-->

* `underlyingSource` {Object}
  * `start` {Function} 用户定义的函数，在创建 `ReadableStream` 时立即调用。
    * `controller` {ReadableStreamDefaultController|ReadableByteStreamController}
    * 返回：`undefined` 或一个兑现值为 `undefined` 的 promise。
  * `pull` {Function} 用户定义的函数，当 `ReadableStream` 内部队列未满时重复调用。操作可以是同步或异步的。如果是异步的，则在先前返回的 promise 被兑现之前，不会再次调用该函数。
    * `controller` {ReadableStreamDefaultController|ReadableByteStreamController}
    * 返回：一个兑现值为 `undefined` 的 promise。
  * `cancel` {Function} 用户定义的函数，在 `ReadableStream` 被取消时调用。
    * `reason` {any}
    * 返回：一个兑现值为 `undefined` 的 promise。
  * `type` {string} 必须是 `'bytes'` 或 `undefined`。
  * `autoAllocateChunkSize` {number} 仅当 `type` 等于 `'bytes'` 时使用。当设置为非零值时，视图缓冲区会自动分配给 `ReadableByteStreamController.byobRequest`。当未设置时，必须使用流的内部队列通过默认读取器 `ReadableStreamDefaultReader` 传输数据。
* `strategy` {Object}
  * `highWaterMark` {number} 应用背压之前的最大内部队列大小。
  * `size` {Function} 用户定义的函数，用于识别每个数据块的大小。
    * `chunk` {any}
    * 返回：{number}

<!--lint enable maximum-line-length remark-lint-->

#### `readableStream.locked`

<!-- YAML
added: v16.5.0
-->

* 类型：{boolean} 如果此 {ReadableStream} 存在活动读取器，则设置为 `true`。

`readableStream.locked` 属性默认为 `false`，当存在活动读取器消费流的数据时切换为 `true`。

#### `readableStream.cancel([reason])`

<!-- YAML
added: v16.5.0
-->

* `reason` {any}
* 返回：一旦取消完成，则兑现为一个 `undefined` 的 promise。

#### `readableStream.getReader([options])`

<!-- YAML
added: v16.5.0
-->

* `options` {Object}
  * `mode` {string} `'byob'` 或 `undefined`
* 返回：{ReadableStreamDefaultReader|ReadableStreamBYOBReader}

```mjs
import { ReadableStream } from 'node:stream/web';

const stream = new ReadableStream();

const reader = stream.getReader();

console.log(await reader.read());
```

```cjs
const { ReadableStream } = require('node:stream/web');

const stream = new ReadableStream();

const reader = stream.getReader();

reader.read().then(console.log);
```

导致 `readableStream.locked` 为 `true`。

#### `readableStream.pipeThrough(transform[, options])`

<!-- YAML
added: v16.5.0
-->

* `transform` {Object}
  * `readable` {ReadableStream} `ReadableStream`，`transform.writable` 将从此 `ReadableStream` 接收的潜在修改后的数据推送到此流。
  * `writable` {WritableStream} `WritableStream`，此 `ReadableStream` 的数据将写入此流。
* `options` {Object}
  * `preventAbort` {boolean} 当为 `true` 时，此 `ReadableStream` 中的错误不会导致 `transform.writable` 被中止。
  * `preventCancel` {boolean} 当为 `true` 时，目标 `transform.writable` 中的错误不会导致此 `ReadableStream` 被取消。
  * `preventClose` {boolean} 当为 `true` 时，关闭此 `ReadableStream` 不会导致 `transform.writable` 被关闭。
  * `signal` {AbortSignal} 允许使用 {AbortController} 取消数据传输。
* 返回：{ReadableStream} 来自 `transform.readable`。

将此 {ReadableStream} 连接到 `transform` 参数中提供的 {ReadableStream} 和 {WritableStream} 对，使得来自此 {ReadableStream} 的数据被写入 `transform.writable`，可能被转换，然后推送到 `transform.readable`。一旦管道配置完成，将返回 `transform.readable`。

在管道操作活跃时，导致 `readableStream.locked` 为 `true`。

```mjs
import {
  ReadableStream,
  TransformStream,
} from 'node:stream/web';

const stream = new ReadableStream({
  start(controller) {
    controller.enqueue('a');
  },
});

const transform = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(chunk.toUpperCase());
  },
});

const transformedStream = stream.pipeThrough(transform);

for await (const chunk of transformedStream)
  console.log(chunk);
  // 打印：A
```

```cjs
const {
  ReadableStream,
  TransformStream,
} = require('node:stream/web');

const stream = new ReadableStream({
  start(controller) {
    controller.enqueue('a');
  },
});

const transform = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(chunk.toUpperCase());
  },
});

const transformedStream = stream.pipeThrough(transform);

(async () => {
  for await (const chunk of transformedStream)
    console.log(chunk);
    // 打印：A
})();
```

#### `readableStream.pipeTo(destination[, options])`

<!-- YAML
added: v16.5.0
-->

* `destination` {WritableStream} 一个 {WritableStream}，此 `ReadableStream` 的数据将写入此流。
* `options` {Object}
  * `preventAbort` {boolean} 当为 `true` 时，此 `ReadableStream` 中的错误不会导致 `destination` 被中止。
  * `preventCancel` {boolean} 当为 `true` 时，`destination` 中的错误不会导致此 `ReadableStream` 被取消。
  * `preventClose` {boolean} 当为 `true` 时，关闭此 `ReadableStream` 不会导致 `destination` 被关闭。
  * `signal` {AbortSignal} 允许使用 {AbortController} 取消数据传输。
* 返回：一个兑现值为 `undefined` 的 promise

在管道操作活跃时，导致 `readableStream.locked` 为 `true`。

#### `readableStream.tee()`

<!-- YAML
added: v16.5.0
changes:
  - version:
    - v18.10.0
    - v16.18.0
    pr-url: https://github.com/nodejs/node/pull/44505
    description: 支持 tee 可读字节流。
-->

* 返回：{ReadableStream\[]}

返回一对新的 {ReadableStream} 实例，此 `ReadableStream` 的数据将转发到这两个实例。每个实例将接收相同的数据。

导致 `readableStream.locked` 为 `true`。

#### `readableStream.values([options])`

<!-- YAML
added: v16.5.0
-->

* `options` {Object}
  * `preventCancel` {boolean} 当为 `true` 时，防止 {ReadableStream} 在异步迭代器突然终止时被关闭。
    **默认值**：`false`。

创建并返回一个可用于消费此 `ReadableStream` 数据的异步迭代器。

在异步迭代器活跃时，导致 `readableStream.locked` 为 `true`。

```mjs
import { Buffer } from 'node:buffer';

const stream = new ReadableStream(getSomeSource());

for await (const chunk of stream.values({ preventCancel: true }))
  console.log(Buffer.from(chunk).toString());
```

#### 异步迭代

{ReadableStream} 对象支持使用 `for await` 语法的异步迭代器协议。

```mjs
import { Buffer } from 'node:buffer';

const stream = new ReadableStream(getSomeSource());

for await (const chunk of stream)
  console.log(Buffer.from(chunk).toString());
```

异步迭代器将消费 {ReadableStream} 直到其终止。

默认情况下，如果异步迭代器提前退出（通过 `break`、`return` 或 `throw`），{ReadableStream} 将被关闭。为了防止 {ReadableStream} 自动关闭，请使用 `readableStream.values()` 方法获取异步迭代器并将 `preventCancel` 选项设置为 `true`。

{ReadableStream} 不得被锁定（即，它不得有现有的活动读取器）。在异步迭代期间，{ReadableStream} 将被锁定。

#### 使用 `postMessage()` 传输

{ReadableStream} 实例可以使用 {MessagePort} 进行传输。

```js
const stream = new ReadableStream(getReadableSourceSomehow());

const { port1, port2 } = new MessageChannel();

port1.onmessage = ({ data }) => {
  data.getReader().read().then((chunk) => {
    console.log(chunk);
  });
};

port2.postMessage(stream, [stream]);
```

### `ReadableStream.from(iterable)`

<!-- YAML
added: v20.6.0
-->

* `iterable` {Iterable} 实现 `Symbol.asyncIterator` 或 `Symbol.iterator` 可迭代协议的对象。

一个实用方法，从可迭代对象创建一个新的 {ReadableStream}。

```mjs
import { ReadableStream } from 'node:stream/web';

async function* asyncIterableGenerator() {
  yield 'a';
  yield 'b';
  yield 'c';
}

const stream = ReadableStream.from(asyncIterableGenerator());

for await (const chunk of stream)
  console.log(chunk); // 打印：'a', 'b', 'c'
```

```cjs
const { ReadableStream } = require('node:stream/web');

async function* asyncIterableGenerator() {
  yield 'a';
  yield 'b';
  yield 'c';
}

(async () => {
  const stream = ReadableStream.from(asyncIterableGenerator());

  for await (const chunk of stream)
    console.log(chunk); // 打印：'a', 'b', 'c'
})();
```

要将生成的 {ReadableStream} 管道传输到 {WritableStream}，{Iterable} 应产生一系列 {Buffer}、{TypedArray} 或 {DataView} 对象。

```mjs
import { ReadableStream } from 'node:stream/web';
import { Buffer } from 'node:buffer';

async function* asyncIterableGenerator() {
  yield Buffer.from('a');
  yield Buffer.from('b');
  yield Buffer.from('c');
}

const stream = ReadableStream.from(asyncIterableGenerator());

await stream.pipeTo(createWritableStreamSomehow());
```

```cjs
const { ReadableStream } = require('node:stream/web');
const { Buffer } = require('node:buffer');

async function* asyncIterableGenerator() {
  yield Buffer.from('a');
  yield Buffer.from('b');
  yield Buffer.from('c');
}

const stream = ReadableStream.from(asyncIterableGenerator());

(async () => {
  await stream.pipeTo(createWritableStreamSomehow());
})();
```

### 类：`ReadableStreamDefaultReader`

<!-- YAML
added: v16.5.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/42225
    description: 此类现在暴露于全局对象上。
-->

默认情况下，调用 `readableStream.getReader()` 而不带参数将返回 `ReadableStreamDefaultReader` 的实例。默认读取器将流经流的数据块视为不透明值，这允许 {ReadableStream} 与通常任何 JavaScript 值一起工作。

#### `new ReadableStreamDefaultReader(stream)`

<!-- YAML
added: v16.5.0
-->

* `stream` {ReadableStream}

创建一个新的 {ReadableStreamDefaultReader}，锁定到给定的 {ReadableStream}。

#### `readableStreamDefaultReader.cancel([reason])`

<!-- YAML
added: v16.5.0
-->

* `reason` {any}
* 返回：一个兑现值为 `undefined` 的 promise。

取消 {ReadableStream} 并返回一个 promise，当底层流被取消时该 promise 被兑现。

#### `readableStreamDefaultReader.closed`

<!-- YAML
added: v16.5.0
-->

* 类型：{Promise} 当关联的 {ReadableStream} 关闭时兑现为 `undefined`，如果流出错或读取器的锁在流完成关闭之前被释放，则被拒绝。

#### `readableStreamDefaultReader.read()`

<!-- YAML
added: v16.5.0
-->

* 返回：一个兑现为一个对象的 promise：
  * `value` {any}
  * `done` {boolean}

从底层 {ReadableStream} 请求下一个数据块，并返回一个 promise，一旦数据可用，该 promise 将被兑现。

#### `readableStreamDefaultReader.releaseLock()`

<!-- YAML
added: v16.5.0
-->

释放此读取器对底层 {ReadableStream} 的锁。

### 类：`ReadableStreamBYOBReader`

<!-- YAML
added: v16.5.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/42225
    description: 此类现在暴露于全局对象上。
-->

`ReadableStreamBYOBReader` 是面向字节的 {ReadableStream}（即在创建 `ReadableStream` 时将 `underlyingSource.type` 设置为 `'bytes'` 的流）的替代消费者。

`BYOB` 是"bring your own buffer"（自带缓冲区）的缩写。这是一种模式，允许更有效地读取面向字节的数据，避免额外的复制。

```mjs
import {
  open,
} from 'node:fs/promises';

import {
  ReadableStream,
} from 'node:stream/web';

import { Buffer } from 'node:buffer';

class Source {
  type = 'bytes';
  autoAllocateChunkSize = 1024;

  async start(controller) {
    this.file = await open(new URL(import.meta.url));
    this.controller = controller;
  }

  async pull(controller) {
    const view = controller.byobRequest?.view;
    const {
      bytesRead,
    } = await this.file.read({
      buffer: view,
      offset: view.byteOffset,
      length: view.byteLength,
    });

    if (bytesRead === 0) {
      await this.file.close();
      this.controller.close();
    }
    controller.byobRequest.respond(bytesRead);
  }
}

const stream = new ReadableStream(new Source());

async function read(stream) {
  const reader = stream.getReader({ mode: 'byob' });

  const chunks = [];
  let result;
  do {
    result = await reader.read(Buffer.alloc(100));
    if (result.value !== undefined)
      chunks.push(Buffer.from(result.value));
  } while (!result.done);

  return Buffer.concat(chunks);
}

const data = await read(stream);
console.log(Buffer.from(data).toString());
```

#### `new ReadableStreamBYOBReader(stream)`

<!-- YAML
added: v16.5.0
-->

* `stream` {ReadableStream}

创建一个新的 `ReadableStreamBYOBReader`，锁定到给定的 {ReadableStream}。

#### `readableStreamBYOBReader.cancel([reason])`

<!-- YAML
added: v16.5.0
-->

* `reason` {any}
* 返回：一个兑现值为 `undefined` 的 promise。

取消 {ReadableStream} 并返回一个 promise，当底层流被取消时该 promise 被兑现。

#### `readableStreamBYOBReader.closed`

<!-- YAML
added: v16.5.0
-->

* 类型：{Promise} 当关联的 {ReadableStream} 关闭时兑现为 `undefined`，如果流出错或读取器的锁在流完成关闭之前被释放，则被拒绝。

#### `readableStreamBYOBReader.read(view[, options])`

<!-- YAML
added: v16.5.0
changes:
  - version:
    - v21.7.0
    - v20.17.0
    pr-url: https://github.com/nodejs/node/pull/50888
    description: "添加了 `min` 选项。"
-->

* `view` {Buffer|TypedArray|DataView}
* `options` {Object}
  * `min` {number} 设置时，仅当至少有 `min` 个元素可用时，返回的 promise 才会被兑现。
    未设置时，当至少有一个元素可用时，promise 被兑现。
* 返回：一个兑现为一个对象的 promise：
  * `value` {TypedArray|DataView}
  * `done` {boolean}

从底层 {ReadableStream} 请求下一个数据块，并返回一个 promise，一旦数据可用，该 promise 将被兑现。

不要将池化的 {Buffer} 对象实例传递到此方法。
池化的 `Buffer` 对象是使用 `Buffer.allocUnsafe()` 或 `Buffer.from()` 创建的，或者通常由各种 `node:fs` 模块回调返回。这些类型的 `Buffer` 使用共享的底层 {ArrayBuffer} 对象，该对象包含所有池化 `Buffer` 实例的所有数据。当将 `Buffer`、{TypedArray} 或 {DataView} 传递到 `readableStreamBYOBReader.read()` 时，视图的底层 `ArrayBuffer` 被_分离_，使该 `ArrayBuffer` 上可能存在的所有现有视图无效。这可能会给您的应用程序带来灾难性后果。

#### `readableStreamBYOBReader.releaseLock()`

<!-- YAML
added: v16.5.0
-->

释放此读取器对底层 {ReadableStream} 的锁。

### 类：`ReadableStreamDefaultController`

<!-- YAML
added: v16.5.0
-->

每个 {ReadableStream} 都有一个控制器，负责流的队列的内部状态和管理。
`ReadableStreamDefaultController` 是非面向字节的 `ReadableStream` 的默认控制器实现。

#### `readableStreamDefaultController.close()`

<!-- YAML
added: v16.5.0
-->

关闭与此控制器关联的 {ReadableStream}。

#### `readableStreamDefaultController.desiredSize`

<!-- YAML
added: v16.5.0
-->

* 类型：{number}

返回填充 {ReadableStream} 队列所需的剩余数据量。

#### `readableStreamDefaultController.enqueue([chunk])`

<!-- YAML
added: v16.5.0
-->

* `chunk` {any}

将新的数据块附加到 {ReadableStream} 的队列。

#### `readableStreamDefaultController.error([error])`

<!-- YAML
added: v16.5.0
-->

* `error` {any}

发出一个错误信号，导致 {ReadableStream} 出错并关闭。

### 类：`ReadableByteStreamController`

<!-- YAML
added: v16.5.0
changes:
  - version: v18.10.0
    pr-url: https://github.com/nodejs/node/pull/44702
    description: 支持处理来自已释放读取器的 BYOB 拉取请求。
-->

每个 {ReadableStream} 都有一个控制器，负责流的队列的内部状态和管理。
`ReadableByteStreamController` 用于面向字节的 `ReadableStream`。

#### `readableByteStreamController.byobRequest`

<!-- YAML
added: v16.5.0
-->

* 类型：{ReadableStreamBYOBRequest}

#### `readableByteStreamController.close()`

<!-- YAML
added: v16.5.0
-->

关闭与此控制器关联的 {ReadableStream}。

#### `readableByteStreamController.desiredSize`

<!-- YAML
added: v16.5.0
-->

* 类型：{number}

返回填充 {ReadableStream} 队列所需的剩余数据量。

#### `readableByteStreamController.enqueue(chunk)`

<!-- YAML
added: v16.5.0
-->

* `chunk` {Buffer|TypedArray|DataView}

将新的数据块附加到 {ReadableStream} 的队列。

#### `readableByteStreamController.error([error])`

<!-- YAML
added: v16.5.0
-->

* `error` {any}

发出一个错误信号，导致 {ReadableStream} 出错并关闭。

### 类：`ReadableStreamBYOBRequest`

<!-- YAML
added: v16.5.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/42225
    description: 此类现在暴露于全局对象上。
-->

当在面向字节的流中使用 `ReadableByteStreamController`，以及使用 `ReadableStreamBYOBReader` 时，
`readableByteStreamController.byobRequest` 属性提供对 `ReadableStreamBYOBRequest` 实例的访问，
该实例代表当前的读取请求。该对象用于访问为读取请求提供的 `ArrayBuffer`/`TypedArray` 以进行填充，
并提供用于信号数据已提供的方法。

#### `readableStreamBYOBRequest.respond(bytesWritten)`

<!-- YAML
added: v16.5.0
-->

* `bytesWritten` {number}

信号表明已将 `bytesWritten` 数量的字节写入 `readableStreamBYOBRequest.view`。

#### `readableStreamBYOBRequest.respondWithNewView(view)`

<!-- YAML
added: v16.5.0
-->

* `view` {Buffer|TypedArray|DataView}

信号表明请求已 fulfilled，字节已写入新的 `Buffer`、`TypedArray` 或 `DataView`。

#### `readableStreamBYOBRequest.view`

<!-- YAML
added: v16.5.0
-->

* 类型：{Buffer|TypedArray|DataView}

### 类：`WritableStream`

<!-- YAML
added: v16.5.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/42225
    description: 此类现在暴露于全局对象上。
-->

`WritableStream` 是发送流数据的目的地。

```mjs
import {
  WritableStream,
} from 'node:stream/web';

const stream = new WritableStream({
  write(chunk) {
    console.log(chunk);
  },
});

await stream.getWriter().write('Hello World');
```

#### `new WritableStream([underlyingSink[, strategy]])`

<!-- YAML
added: v16.5.0
-->

* `underlyingSink` {Object}
  * `start` {Function} 用户定义的函数，在创建 `WritableStream` 时立即调用。
    * `controller` {WritableStreamDefaultController}
    * 返回：`undefined` 或一个兑现值为 `undefined` 的 promise。
  * `write` {Function} 用户定义的函数，当数据块写入 `WritableStream` 时调用。
    * `chunk` {any}
    * `controller` {WritableStreamDefaultController}
    * 返回：一个兑现值为 `undefined` 的 promise。
  * `close` {Function} 用户定义的函数，在 `WritableStream` 关闭时调用。
    * 返回：一个兑现值为 `undefined` 的 promise。
  * `abort` {Function} 用户定义的函数，用于突然关闭 `WritableStream`。
    * `reason` {any}
    * 返回：一个兑现值为 `undefined` 的 promise。
  * `type` {any} `type` 选项保留供将来使用，_必须_ 为 undefined。
* `strategy` {Object}
  * `highWaterMark` {number} 应用背压之前的最大内部队列大小。
  * `size` {Function} 用户定义的函数，用于识别每个数据块的大小。
    * `chunk` {any}
    * 返回：{number}

#### `writableStream.abort([reason])`

<!-- YAML
added: v16.5.0
-->

* `reason` {any}
* 返回：一个兑现值为 `undefined` 的 promise。

突然终止 `WritableStream`。所有排队的写入将被取消，其关联的 promise 将被拒绝。

#### `writableStream.close()`

<!-- YAML
added: v16.5.0
-->

* 返回：一个兑现值为 `undefined` 的 promise。

当不再期望额外写入时，关闭 `WritableStream`。

#### `writableStream.getWriter()`

<!-- YAML
added: v16.5.0
-->

* 返回：{WritableStreamDefaultWriter}

创建并返回一个新的写入器实例，可用于将数据写入 `WritableStream`。

#### `writableStream.locked`

<!-- YAML
added: v16.5.0
-->

* 类型：{boolean}

`writableStream.locked` 属性默认为 `false`，当有活动写入器附加到此 `WritableStream` 时切换为 `true`。

#### 使用 postMessage() 传输

{WritableStream} 实例可以使用 {MessagePort} 进行传输。

```js
const stream = new WritableStream(getWritableSinkSomehow());

const { port1, port2 } = new MessageChannel();

port1.onmessage = ({ data }) => {
  data.getWriter().write('hello');
};

port2.postMessage(stream, [stream]);
```

### 类：`WritableStreamDefaultWriter`

<!-- YAML
added: v16.5.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/42225
    description: 此类现在暴露于全局对象上。
-->

#### `new WritableStreamDefaultWriter(stream)`

<!-- YAML
added: v16.5.0
-->

* `stream` {WritableStream}

创建一个新的 `WritableStreamDefaultWriter`，锁定到给定的 `WritableStream`。

#### `writableStreamDefaultWriter.abort([reason])`

<!-- YAML
added: v16.5.0
-->

* `reason` {any}
* 返回：一个兑现值为 `undefined` 的 promise。

突然终止 `WritableStream`。所有排队的写入将被取消，其关联的 promise 将被拒绝。

#### `writableStreamDefaultWriter.close()`

<!-- YAML
added: v16.5.0
-->

* 返回：一个兑现值为 `undefined` 的 promise。

当不再期望额外写入时，关闭 `WritableStream`。

#### `writableStreamDefaultWriter.closed`

<!-- YAML
added: v16.5.0
-->

* 类型：{Promise} 当关联的 {WritableStream} 关闭时兑现为 `undefined`，如果流出错或写入器的锁在流完成关闭之前被释放，则被拒绝。

#### `writableStreamDefaultWriter.desiredSize`

<!-- YAML
added: v16.5.0
-->

* 类型：{number}

填充 {WritableStream} 队列所需的数据量。

#### `writableStreamDefaultWriter.ready`

<!-- YAML
added: v16.5.0
-->

* 类型：{Promise} 当写入器准备好使用时兑现为 `undefined`。

#### `writableStreamDefaultWriter.releaseLock()`

<!-- YAML
added: v16.5.0
-->

释放此写入器对底层 {WritableStream} 的锁。

#### `writableStreamDefaultWriter.write([chunk])`

<!-- YAML
added: v16.5.0
-->

* `chunk` {any}
* 返回：一个兑现值为 `undefined` 的 promise。

将新的数据块附加到 {WritableStream} 的队列。

### 类：`WritableStreamDefaultController`

<!-- YAML
added: v16.5.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/42225
    description: 此类现在暴露于全局对象上。
-->

`WritableStreamDefaultController` 管理 {WritableStream} 的内部状态。

#### `writableStreamDefaultController.error([error])`

<!-- YAML
added: v16.5.0
-->

* `error` {any}

由用户代码调用，以信号表明在处理 `WritableStream` 数据时发生了错误。调用时，{WritableStream} 将被中止，当前待处理的写入将被取消。

#### `writableStreamDefaultController.signal`

* 类型：{AbortSignal} 一个 `AbortSignal`，可用于在 {WritableStream} 被中止时取消待处理的写入或关闭操作。

### 类：`TransformStream`

<!-- YAML
added: v16.5.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/42225
    description: 此类现在暴露于全局对象上。
-->

`TransformStream` 由一个 {ReadableStream} 和一个 {WritableStream} 组成，它们连接在一起，使得写入 `WritableStream` 的数据被接收，并可能被转换，然后推送到 `ReadableStream` 的队列。

```mjs
import {
  TransformStream,
} from 'node:stream/web';

const transform = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(chunk.toUpperCase());
  },
});

await Promise.all([
  transform.writable.getWriter().write('A'),
  transform.readable.getReader().read(),
]);
```

#### `new TransformStream([transformer[, writableStrategy[, readableStrategy]]])`

<!-- YAML
added: v16.5.0
changes:
  - version:
    - v21.5.0
    - v20.14.0
    pr-url: https://github.com/nodejs/node/pull/50126
    description: 支持 `cancel` 转换器回调。
-->

* `transformer` {Object}
  * `start` {Function} 用户定义的函数，在创建 `TransformStream` 时立即调用。
    * `controller` {TransformStreamDefaultController}
    * 返回：`undefined` 或一个兑现值为 `undefined` 的 promise
  * `transform` {Function} 用户定义的函数，接收并可能修改写入 `transformStream.writable` 的数据块，然后将其转发到 `transformStream.readable`。
    * `chunk` {any}
    * `controller` {TransformStreamDefaultController}
    * 返回：一个兑现值为 `undefined` 的 promise。
  * `flush` {Function} 用户定义的函数，在 `TransformStream` 的可写侧关闭之前立即调用，信号表明转换过程结束。
    * `controller` {TransformStreamDefaultController}
    * 返回：一个兑现值为 `undefined` 的 promise。
  * `cancel` {Function} 用户定义的函数，当 `TransformStream` 的可读侧被取消或可写侧被中止时调用。
    * `reason` {any}
    * 返回：一个兑现值为 `undefined` 的 promise。
  * `readableType` {any} `readableType` 选项保留供将来使用，_必须_ 为 `undefined`。
  * `writableType` {any} `writableType` 选项保留供将来使用，_必须_ 为 `undefined`。
* `writableStrategy` {Object}
  * `highWaterMark` {number} 应用背压之前的最大内部队列大小。
  * `size` {Function} 用户定义的函数，用于识别每个数据块的大小。
    * `chunk` {any}
    * 返回：{number}
* `readableStrategy` {Object}
  * `highWaterMark` {number} 应用背压之前的最大内部队列大小。
  * `size` {Function} 用户定义的函数，用于识别每个数据块的大小。
    * `chunk` {any}
    * 返回：{number}

#### `transformStream.readable`

<!-- YAML
added: v16.5.0
-->

* 类型：{ReadableStream}

#### `transformStream.writable`

<!-- YAML
added: v16.5.0
-->

* 类型：{WritableStream}

#### 使用 postMessage() 传输

{TransformStream} 实例可以使用 {MessagePort} 进行传输。

```js
const stream = new TransformStream();

const { port1, port2 } = new MessageChannel();

port1.onmessage = ({ data }) => {
  const { writable, readable } = data;
  // ...
};

port2.postMessage(stream, [stream]);
```

### 类：`TransformStreamDefaultController`

<!-- YAML
added: v16.5.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/42225
    description: 此类现在暴露于全局对象上。
-->

`TransformStreamDefaultController` 管理 `TransformStream` 的内部状态。

#### `transformStreamDefaultController.desiredSize`

<!-- YAML
added: v16.5.0
-->

* 类型：{number}

填充可读侧队列所需的数据量。

#### `transformStreamDefaultController.enqueue([chunk])`

<!-- YAML
added: v16.5.0
-->

* `chunk` {any}

将数据块附加到可读侧的队列。

#### `transformStreamDefaultController.error([reason])`

<!-- YAML
added: v16.5.0
-->

* `reason` {any}

向可读侧和可写侧发出信号，表明在处理转换数据时发生了错误，导致两侧突然关闭。

#### `transformStreamDefaultController.terminate()`

<!-- YAML
added: v16.5.0
-->

关闭传输的可读侧，并导致可写侧因错误而突然关闭。

### 类：`ByteLengthQueuingStrategy`

<!-- YAML
added: v16.5.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/42225
    description: 此类现在暴露于全局对象上。
-->

#### `new ByteLengthQueuingStrategy(init)`

<!-- YAML
added: v16.5.0
-->

* `init` {Object}
  * `highWaterMark` {number}

#### `byteLengthQueuingStrategy.highWaterMark`

<!-- YAML
added: v16.5.0
-->

* 类型：{number}

#### `byteLengthQueuingStrategy.size`

<!-- YAML
added: v16.5.0
-->

* 类型：{Function}
  * `chunk` {any}
  * 返回：{number}

### 类：`CountQueuingStrategy`

<!-- YAML
added: v16.5.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/42225
    description: 此类现在暴露于全局对象上。
-->

#### `new CountQueuingStrategy(init)`

<!-- YAML
added: v16.5.0
-->

* `init` {Object}
  * `highWaterMark` {number}

#### `countQueuingStrategy.highWaterMark`

<!-- YAML
added: v16.5.0
-->

* 类型：{number}

#### `countQueuingStrategy.size`

<!-- YAML
added: v16.5.0
-->

* 类型：{Function}
  * `chunk` {any}
  * 返回：{number}

### 类：`TextEncoderStream`

<!-- YAML
added: v16.6.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/42225
    description: 此类现在暴露于全局对象上。
-->

#### `new TextEncoderStream()`

<!-- YAML
added: v16.6.0
-->

创建一个新的 `TextEncoderStream` 实例。

#### `textEncoderStream.encoding`

<!-- YAML
added: v16.6.0
-->

* 类型：{string}

`TextEncoderStream` 实例支持的编码。

#### `textEncoderStream.readable`

<!-- YAML
added: v16.6.0
-->

* 类型：{ReadableStream}

#### `textEncoderStream.writable`

<!-- YAML
added: v16.6.0
-->

* 类型：{WritableStream}

### 类：`TextDecoderStream`

<!-- YAML
added: v16.6.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/42225
    description: 此类现在暴露于全局对象上。
-->

#### `new TextDecoderStream([encoding[, options]])`

<!-- YAML
added: v16.6.0
-->

* `encoding` {string} 标识此 `TextDecoder` 实例支持的 `encoding`。**默认值：** `'utf-8'`。
* `options` {Object}
  * `fatal` {boolean} 如果解码失败是致命的，则为 `true`。
  * `ignoreBOM` {boolean} 当为 `true` 时，`TextDecoderStream` 将在解码结果中包含字节顺序标记。当为 `false` 时，字节顺序标记将从输出中移除。此选项仅在 `encoding` 为 `'utf-8'`、`'utf-16be'` 或 `'utf-16le'` 时使用。**默认值：** `false`。

创建一个新的 `TextDecoderStream` 实例。

#### `textDecoderStream.encoding`

<!-- YAML
added: v16.6.0
-->

* 类型：{string}

`TextDecoderStream` 实例支持的编码。

#### `textDecoderStream.fatal`

<!-- YAML
added: v16.6.0
-->

* 类型：{boolean}

如果解码错误导致抛出 `TypeError`，则值将为 `true`。

#### `textDecoderStream.ignoreBOM`

<!-- YAML
added: v16.6.0
-->

* 类型：{boolean}

如果解码结果将包含字节顺序标记，则值将为 `true`。

#### `textDecoderStream.readable`

<!-- YAML
added: v16.6.0
-->

* 类型：{ReadableStream}

#### `textDecoderStream.writable`

<!-- YAML
added: v16.6.0
-->

* 类型：{WritableStream}

### 类：`CompressionStream`

<!-- YAML
added: v17.0.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/42225
    description: 此类现在暴露于全局对象上。
-->

#### `new CompressionStream(format)`

<!-- YAML
added: v17.0.0
changes:
  - version:
    - v24.7.0
    - v22.20.0
    pr-url: https://github.com/nodejs/node/pull/59464
    description: "format 现在接受 `brotli` 值。"
  - version:
    - v21.2.0
    - v20.12.0
    pr-url: https://github.com/nodejs/node/pull/50097
    description: "format 现在接受 `deflate-raw` 值。"
-->

* `format` {string} `'deflate'`、`'deflate-raw'`、`'gzip'` 或 `'brotli'` 之一。

#### `compressionStream.readable`

<!-- YAML
added: v17.0.0
-->

* 类型：{ReadableStream}

#### `compressionStream.writable`

<!-- YAML
added: v17.0.0
-->

* 类型：{WritableStream}

### 类：`DecompressionStream`

<!-- YAML
added: v17.0.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/42225
    description: 此类现在暴露于全局对象上。
-->

#### `new DecompressionStream(format)`

<!-- YAML
added: v17.0.0
changes:
  - version:
    - v24.7.0
    - v22.20.0
    pr-url: https://github.com/nodejs/node/pull/59464
    description: "format 现在接受 `brotli` 值。"
  - version:
    - v21.2.0
    - v20.12.0
    pr-url: https://github.com/nodejs/node/pull/50097
    description: "format 现在接受 `deflate-raw` 值。"
-->

* `format` {string} `'deflate'`、`'deflate-raw'`、`'gzip'` 或 `'brotli'` 之一。

#### `decompressionStream.readable`

<!-- YAML
added: v17.0.0
-->

* 类型：{ReadableStream}

#### `decompressionStream.writable`

<!-- YAML
added: v17.0.0
-->

* 类型：{WritableStream}

### 实用消费者

<!-- YAML
added: v16.7.0
-->

实用消费者函数提供用于消费流的常见选项。

它们通过以下方式访问：

```mjs
import {
  arrayBuffer,
  blob,
  buffer,
  json,
  text,
} from 'node:stream/consumers';
```

```cjs
const {
  arrayBuffer,
  blob,
  buffer,
  json,
  text,
} = require('node:stream/consumers');
```

#### `streamConsumers.arrayBuffer(stream)`

<!-- YAML
added: v16.7.0
-->

* `stream` {ReadableStream|stream.Readable|AsyncIterator}
* 返回：{Promise} 兑现为一个包含流全部内容的 `ArrayBuffer`。

```mjs
import { arrayBuffer } from 'node:stream/consumers';
import { Readable } from 'node:stream';
import { TextEncoder } from 'node:util';

const encoder = new TextEncoder();
const dataArray = encoder.encode('hello world from consumers!');

const readable = Readable.from(dataArray);
const data = await arrayBuffer(readable);
console.log(`from readable: ${data.byteLength}`);
// 打印：from readable: 76
```

```cjs
const { arrayBuffer } = require('node:stream/consumers');
const { Readable } = require('node:stream');
const { TextEncoder } = require('node:util');

const encoder = new TextEncoder();
const dataArray = encoder.encode('hello world from consumers!');
const readable = Readable.from(dataArray);
arrayBuffer(readable).then((data) => {
  console.log(`from readable: ${data.byteLength}`);
  // 打印：from readable: 76
});
```

#### `streamConsumers.blob(stream)`

<!-- YAML
added: v16.7.0
-->

* `stream` {ReadableStream|stream.Readable|AsyncIterator}
* 返回：{Promise} 兑现为一个包含流全部内容的 {Blob}。

```mjs
import { blob } from 'node:stream/consumers';

const dataBlob = new Blob(['hello world from consumers!']);

const readable = dataBlob.stream();
const data = await blob(readable);
console.log(`from readable: ${data.size}`);
// 打印：from readable: 27
```

```cjs
const { blob } = require('node:stream/consumers');

const dataBlob = new Blob(['hello world from consumers!']);

const readable = dataBlob.stream();
blob(readable).then((data) => {
  console.log(`from readable: ${data.size}`);
  // 打印：from readable: 27
});
```

#### `streamConsumers.buffer(stream)`

<!-- YAML
added: v16.7.0
-->

* `stream` {ReadableStream|stream.Readable|AsyncIterator}
* 返回：{Promise} 兑现为一个包含流全部内容的 {Buffer}。

```mjs
import { buffer } from 'node:stream/consumers';
import { Readable } from 'node:stream';
import { Buffer } from 'node:buffer';

const dataBuffer = Buffer.from('hello world from consumers!');

const readable = Readable.from(dataBuffer);
const data = await buffer(readable);
console.log(`from readable: ${data.length}`);
// 打印：from readable: 27
```

```cjs
const { buffer } = require('node:stream/consumers');
const { Readable } = require('node:stream');
const { Buffer } = require('node:buffer');

const dataBuffer = Buffer.from('hello world from consumers!');

const readable = Readable.from(dataBuffer);
buffer(readable).then((data) => {
  console.log(`from readable: ${data.length}`);
  // 打印：from readable: 27
});
```

#### `streamConsumers.bytes(stream)`

<!-- YAML
added:
 - v25.6.0
 - v24.14.0
-->

* `stream` {ReadableStream|stream.Readable|AsyncIterator}
* 返回：{Promise} 兑现为一个包含流全部内容的 {Uint8Array}。

```mjs
import { bytes } from 'node:stream/consumers';
import { Readable } from 'node:stream';
import { Buffer } from 'node:buffer';

const dataBuffer = Buffer.from('hello world from consumers!');

const readable = Readable.from(dataBuffer);
const data = await bytes(readable);
console.log(`from readable: ${data.length}`);
// 打印：from readable: 27
```

```cjs
const { bytes } = require('node:stream/consumers');
const { Readable } = require('node:stream');
const { Buffer } = require('node:buffer');

const dataBuffer = Buffer.from('hello world from consumers!');

const readable = Readable.from(dataBuffer);
bytes(readable).then((data) => {
  console.log(`from readable: ${data.length}`);
  // 打印：from readable: 27
});
```

#### `streamConsumers.json(stream)`

<!-- YAML
added: v16.7.0
-->

* `stream` {ReadableStream|stream.Readable|AsyncIterator}
* 返回：{Promise} 兑现为流的内容，解析为 UTF-8 编码字符串，然后通过 `JSON.parse()`。

```mjs
import { json } from 'node:stream/consumers';
import { Readable } from 'node:stream';

const items = Array.from(
  {
    length: 100,
  },
  () => ({
    message: 'hello world from consumers!',
  }),
);

const readable = Readable.from(JSON.stringify(items));
const data = await json(readable);
console.log(`from readable: ${data.length}`);
// 打印：from readable: 100
```

```cjs
const { json } = require('node:stream/consumers');
const { Readable } = require('node:stream');

const items = Array.from(
  {
    length: 100,
  },
  () => ({
    message: 'hello world from consumers!',
  }),
);

const readable = Readable.from(JSON.stringify(items));
json(readable).then((data) => {
  console.log(`from readable: ${data.length}`);
  // 打印：from readable: 100
});
```

#### `streamConsumers.text(stream)`

<!-- YAML
added: v16.7.0
-->

* `stream` {ReadableStream|stream.Readable|AsyncIterator}
* 返回：{Promise} 兑现为流的内容，解析为 UTF-8 编码字符串。

```mjs
import { text } from 'node:stream/consumers';
import { Readable } from 'node:stream';

const readable = Readable.from('Hello world from consumers!');
const data = await text(readable);
console.log(`from readable: ${data.length}`);
// 打印：from readable: 27
```

```cjs
const { text } = require('node:stream/consumers');
const { Readable } = require('node:stream');

const readable = Readable.from('Hello world from consumers!');
text(readable).then((data) => {
  console.log(`from readable: ${data.length}`);
  // 打印：from readable: 27
});
```

[流]: stream.md
[WHATWG 流标准]: https://streams.spec.whatwg.org/
[`stream.Duplex.fromWeb`]: stream.md#streamduplexfromwebpair-options
[`stream.Duplex.toWeb`]: stream.md#streamduplextowebstreamduplex-options
[`stream.Duplex`]: stream.md#class-streamduplex
[`stream.Readable.fromWeb`]: stream.md#streamreadablefromwebreadablestream-options
[`stream.Readable.toWeb`]: stream.md#streamreadabletowebstreamreadable-options
[`stream.Readable`]: stream.md#class-streamreadable
[`stream.Writable.fromWeb`]: stream.md#streamwritablefromwebwritablestream-options
[`stream.Writable.toWeb`]: stream.md#streamwritabletowebstreamwritable
[`stream.Writable`]: stream.md#class-streamwritable
