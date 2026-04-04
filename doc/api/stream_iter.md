# 可迭代流

<!--introduced_in=v25.9.0-->

> 稳定性：1 - 实验性

<!-- source_link=lib/stream/iter.js -->

`node:stream/iter` 模块提供了一个基于可迭代对象（iterables）构建的流式 API，
而不是基于事件驱动的 `Readable`/`Writable`/`Transform` 类层次结构，
或 Web Streams 的 `ReadableStream`/`WritableStream`/`TransformStream` 接口。

此模块仅在启用 `--experimental-stream-iter` CLI 标志时可用。

流表示为 `AsyncIterable<Uint8Array[]>`（异步）或
`Iterable<Uint8Array[]>`（同步）。没有要扩展的基类 -- 任何
实现可迭代协议的对象都可以参与。转换器是普通函数或具有 `transform` 方法的对象。

数据以**批次**（每次迭代 `Uint8Array[]`）流动，以分摊异步操作的成本。

```mjs
import { from, pull, text } from 'node:stream/iter';
import { compressGzip, decompressGzip } from 'node:zlib/iter';

// 压缩和解压缩字符串
const compressed = pull(from('Hello, world!'), compressGzip());
const result = await text(pull(compressed, decompressGzip()));
console.log(result); // 'Hello, world!'
```

```cjs
const { from, pull, text } = require('node:stream/iter');
const { compressGzip, decompressGzip } = require('node:zlib/iter');

async function run() {
  // 压缩和解压缩字符串
  const compressed = pull(from('Hello, world!'), compressGzip());
  const result = await text(pull(compressed, decompressGzip()));
  console.log(result); // 'Hello, world!'
}

run().catch(console.error);
```

```mjs
import { open } from 'node:fs/promises';
import { text, pipeTo } from 'node:stream/iter';
import { compressGzip, decompressGzip } from 'node:zlib/iter';

// 读取文件，压缩，写入另一个文件
const src = await open('input.txt', 'r');
const dst = await open('output.gz', 'w');
await pipeTo(src.pull(), compressGzip(), dst.writer({ autoClose: true }));
await src.close();

// 读回
const gz = await open('output.gz', 'r');
console.log(await text(gz.pull(decompressGzip(), { autoClose: true })));
```

```cjs
const { open } = require('node:fs/promises');
const { text, pipeTo } = require('node:stream/iter');
const { compressGzip, decompressGzip } = require('node:zlib/iter');

async function run() {
  // 读取文件，压缩，写入另一个文件
  const src = await open('input.txt', 'r');
  const dst = await open('output.gz', 'w');
  await pipeTo(src.pull(), compressGzip(), dst.writer({ autoClose: true }));
  await src.close();

  // 读回
  const gz = await open('output.gz', 'r');
  console.log(await text(gz.pull(decompressGzip(), { autoClose: true })));
}

run().catch(console.error);
```

## 概念

### 字节流

此 API 中的所有数据都表示为 `Uint8Array` 字节。字符串
在传递给 `from()`、`push()` 或 `pipeTo()` 时会自动进行 UTF-8 编码。这消除了编码方面的歧义，并实现了流与原生代码之间的零拷贝传输。

### 批处理

每次迭代产生一个**批次** -- 一个 `Uint8Array` 块数组
（`Uint8Array[]`）。批处理分摊了跨多个块的 `await` 和 Promise 创建成本。一次处理一个块的消费者可以
简单地迭代内部数组：

```mjs
for await (const batch of source) {
  for (const chunk of batch) {
    handle(chunk);
  }
}
```

```cjs
async function run() {
  for await (const batch of source) {
    for (const chunk of batch) {
      handle(chunk);
    }
  }
}
```

### 转换器

转换器有两种形式：

* **无状态** -- 一个函数 `(chunks, options) => result`，每批次调用一次。接收 `Uint8Array[]`（或 `null` 作为刷新信号）和一个 `options` 对象。返回 `Uint8Array[]`、`null` 或块的可迭代对象。

* **有状态** -- 一个对象 `{ transform(source, options) }`，其中 `transform` 是一个生成器（同步或异步），接收整个上游可迭代对象和一个 `options` 对象，并产生输出。此形式用于压缩、加密和任何需要跨批次缓冲的转换。

两种形式都接收一个带有以下属性的 `options` 参数：

* `options.signal` {AbortSignal} 当管道被取消、遇到错误或消费者停止读取时触发的 AbortSignal。转换器可以检查 `signal.aborted` 或监听 `'abort'` 事件以执行早期清理。

刷新信号（`null`）在源结束后发送，使转换器有机会发出尾部数据（例如，压缩尾部数据）。

```js
// 无状态：大写转换
const upper = (chunks) => {
  if (chunks === null) return null; // 刷新
  return chunks.map((c) => new TextEncoder().encode(
    new TextDecoder().decode(c).toUpperCase(),
  ));
};

// 有状态：行分割器
const lines = {
  transform: async function*(source) {
    let partial = '';
    for await (const chunks of source) {
      if (chunks === null) {
        if (partial) yield [new TextEncoder().encode(partial)];
        continue;
      }
      for (const chunk of chunks) {
        const str = partial + new TextDecoder().decode(chunk);
        const parts = str.split('\n');
        partial = parts.pop();
        for (const line of parts) {
          yield [new TextEncoder().encode(`${line}\n`)];
        }
      }
    }
  },
};
```

### 拉取 vs 推送

API 支持两种模型：

* **拉取** -- 数据按需流动。`pull()` 和 `pullSync()` 创建惰性管道，仅当消费者迭代时才从源读取。

* **推送** -- 数据被显式写入。`push()` 创建一个具有背压的 writer/readable 对。writer 将数据推入；readable 作为异步可迭代对象被消费。

### 背压

拉取流具有自然背压 -- 消费者驱动节奏，因此源的读取速度永远不会快于消费者的处理速度。推送流需要显式背压，因为生产者和消费者独立运行。`push()`、`broadcast()` 和 `share()` 上的 `highWaterMark` 和 `backpressure` 选项控制其工作方式。

#### 双缓冲模型

推送流使用两部分缓冲系统。可以将其想象为一个桶（槽位）通过软管（待处理写入）填充，并有一个浮阀在桶满时关闭：

```text
                          highWaterMark (e.g., 3)
                                 |
    Producer                     v
       |                    +---------+
       v                    |         |
  [ write() ] ----+    +--->| slots   |---> Consumer pulls
  [ write() ]     |    |    | (bucket)|     for await (...)
  [ write() ]     v    |    +---------+
              +--------+         ^
              | pending|         |
              | writes |    float valve
              | (hose) |    (backpressure)
              +--------+
                   ^
                   |
          'strict' mode limits this too!
```

* **槽位（桶）** -- 准备好供消费者使用的数据，上限为 `highWaterMark`。当消费者拉取时，它会将所有槽位一次性排空到一个批次中。

* **待处理写入（软管）** -- 等待槽位空间的写入。在消费者排空后，待处理写入被提升到现在空的槽位中，它们的 promise 被解析。

每种策略如何使用这些缓冲区：

| 策略 | 槽位限制 | 待处理写入限制 |
| --------------- | --------------- | -------------------- |
| `'strict'` | `highWaterMark` | `highWaterMark` |
| `'block'` | `highWaterMark` | 无界 |
| `'drop-oldest'` | `highWaterMark` | N/A（从不等待） |
| `'drop-newest'` | `highWaterMark` | N/A（从不等待） |

#### 严格模式（默认）

严格模式捕获“即发即弃”模式，其中生产者调用 `write()` 而不等待，这将导致无限内存增长。它将槽位缓冲区和待处理写入队列都限制为 `highWaterMark`。

如果你正确地等待每个写入，你一次只能有一个待处理写入（你自己的），所以你永远不会达到待处理写入限制。未等待的写入会在待处理队列中积累，一旦溢出就会抛出错误：

```mjs
import { push, text } from 'node:stream/iter';

const { writer, readable } = push({ highWaterMark: 16 });

// 消费者必须并发运行 -- 如果没有它，第一个填满缓冲区的写入将永远阻塞生产者。
const consuming = text(readable);

// 良好：等待写入。当缓冲区满时，生产者等待消费者腾出空间。
for (const item of dataset) {
  await writer.write(item);
}
await writer.end();
console.log(await consuming);
```

```cjs
const { push, text } = require('node:stream/iter');

async function run() {
  const { writer, readable } = push({ highWaterMark: 16 });

  // 消费者必须并发运行 -- 如果没有它，第一个填满缓冲区的写入将永远阻塞生产者。
  const consuming = text(readable);

  // 良好：等待写入。当缓冲区满时，生产者等待消费者腾出空间。
  for (const item of dataset) {
    await writer.write(item);
  }
  await writer.end();
  console.log(await consuming);
}

run().catch(console.error);
```

忘记 `await` 最终会抛出错误：

```js
// 不良：即发即弃。一旦两个缓冲区都填满，严格模式将抛出错误。
for (const item of dataset) {
  writer.write(item); // 未等待 -- 无限排队
}
// --> 抛出 "Backpressure violation: too many pending writes"
```

#### 阻塞模式

阻塞模式将槽位限制为 `highWaterMark`，但对待处理写入队列没有限制。等待的写入会阻塞，直到消费者腾出空间，就像严格模式一样。区别在于，未等待的写入会静默地永远排队，而不是抛出错误 -- 如果生产者忘记 `await`，这可能导致内存泄漏。

这是现有 Node.js 经典流和 Web Streams 默认的模式。当你控制生产者并知道它正确等待时，或者从这些 API 迁移代码时使用它。

```mjs
import { push, text } from 'node:stream/iter';

const { writer, readable } = push({
  highWaterMark: 16,
  backpressure: 'block',
});

const consuming = text(readable);

// 安全 -- 等待写入会阻塞，直到消费者读取。
for (const item of dataset) {
  await writer.write(item);
}
await writer.end();
console.log(await consuming);
```

```cjs
const { push, text } = require('node:stream/iter');

async function run() {
  const { writer, readable } = push({
    highWaterMark: 16,
    backpressure: 'block',
  });

  const consuming = text(readable);

  // 安全 -- 等待写入会阻塞，直到消费者读取。
  for (const item of dataset) {
    await writer.write(item);
  }
  await writer.end();
  console.log(await consuming);
}

run().catch(console.error);
```

#### 丢弃最旧

写入从不等待。当槽位缓冲区满时，最旧的缓冲块被驱逐，为传入的写入腾出空间。消费者总是看到最新的数据。适用于实时馈送、遥测或任何陈旧数据不如当前数据有价值的场景。

```mjs
import { push } from 'node:stream/iter';

// 仅保留最近的 5 次读数
const { writer, readable } = push({
  highWaterMark: 5,
  backpressure: 'drop-oldest',
});
```

```cjs
const { push } = require('node:stream/iter');

// 仅保留最近的 5 次读数
const { writer, readable } = push({
  highWaterMark: 5,
  backpressure: 'drop-oldest',
});
```

#### 丢弃最新

写入从不等待。当槽位缓冲区满时，传入的写入被静默丢弃。消费者处理已缓冲的内容，而不会被新数据淹没。适用于速率限制或在压力下卸载负载。

```mjs
import { push } from 'node:stream/iter';

// 接受最多 10 个缓冲项；丢弃超出该范围的任何内容
const { writer, readable } = push({
  highWaterMark: 10,
  backpressure: 'drop-newest',
});
```

```cjs
const { push } = require('node:stream/iter');

// 接受最多 10 个缓冲项；丢弃超出该范围的任何内容
const { writer, readable } = push({
  highWaterMark: 10,
  backpressure: 'drop-newest',
});
```

### Writer 接口

writer 是任何符合 Writer 接口的对象。只需要 `write()`；所有其他方法都是可选的。

每个异步方法都有一个同步的 `*Sync` 对应方法，设计用于尝试 - 回退模式：首先尝试快速同步路径，仅当同步调用指示无法完成时才回退到异步版本：

```mjs
if (!writer.writeSync(chunk)) await writer.write(chunk);
if (!writer.writevSync(chunks)) await writer.writev(chunks);
if (writer.endSync() < 0) await writer.end();
writer.fail(err);  // 始终同步，不需要回退
```

### `writer.desiredSize`

* {number|null}

达到高水位线之前可用的缓冲槽位数量。如果 writer 已关闭或消费者已断开连接，则返回 `null`。

该值始终为非负数。

### `writer.end([options])`

* `options` {Object}
  * `signal` {AbortSignal} 仅取消此操作。该信号仅取消待处理的 `end()` 调用；它不会使 writer 本身失败。
* 返回：{Promise\<number>} 写入的总字节数。

信号表明不再写入更多数据。

### `writer.endSync()`

* 返回：{number} 写入的总字节数，如果 writer 未打开则为 `-1`。

`writer.end()` 的同步变体。如果 writer 已关闭或出错，则返回 `-1`。可用作尝试 - 回退模式：

```cjs
const result = writer.endSync();
if (result < 0) {
  writer.end();
}
```

### `writer.fail(reason)`

* `reason` {any}

将 writer 置于终止错误状态。如果 writer 已关闭或出错，这是无操作。与 `write()` 和 `end()` 不同，`fail()` 无条件同步，因为使 writer 失败是纯状态转换，无需执行异步工作。

### `writer.write(chunk[, options])`

* `chunk` {Uint8Array|string}
* `options` {Object}
  * `signal` {AbortSignal} 仅取消此写入操作。该信号仅取消待处理的 `write()` 调用；它不会使 writer 本身失败。
* 返回：{Promise\<void>}

写入一个块。当缓冲空间可用时，promise 解析。

### `writer.writeSync(chunk)`

* `chunk` {Uint8Array|string}
* 返回：{boolean} 如果写入被接受则为 `true`，如果缓冲区已满则为 `false`。

同步写入。不阻塞；如果背压处于活动状态则返回 `false`。

### `writer.writev(chunks[, options])`

* `chunks` {Uint8Array\[]|string\[]}
* `options` {Object}
  * `signal` {AbortSignal} 仅取消此写入操作。该信号仅取消待处理的 `writev()` 调用；它不会使 writer 本身失败。
* 返回：{Promise\<void>}

将多个块作为单个批次写入。

### `writer.writevSync(chunks)`

* `chunks` {Uint8Array\[]|string\[]}
* 返回：{boolean} 如果写入被接受则为 `true`，如果缓冲区已满则为 `false`。

同步批次写入。

## `stream/iter` 模块

所有函数既可作为命名导出使用，也可作为 `Stream` 命名空间对象的属性使用：

```mjs
// 命名导出
import { from, pull, bytes, Stream } from 'node:stream/iter';

// 命名空间访问
Stream.from('hello');
```

```cjs
// 命名导出
const { from, pull, bytes, Stream } = require('node:stream/iter');

// 命名空间访问
Stream.from('hello');
```

模块说明符中包含 `node:` 前缀是可选的。

## 源

### `from(input)`

<!-- YAML
added: v25.9.0
-->

* `input` {string|ArrayBuffer|ArrayBufferView|Iterable|AsyncIterable|Object}
  不能为 `null` 或 `undefined`。
* 返回：{AsyncIterable\<Uint8Array\[]>}

从给定输入创建异步字节流。字符串采用 UTF-8 编码。
`ArrayBuffer` 和 `ArrayBufferView` 值被包装为 `Uint8Array`。数组
和可迭代对象会被递归展平并标准化。

实现 `Symbol.for('Stream.toAsyncStreamable')` 或
`Symbol.for('Stream.toStreamable')` 的对象会通过这些协议进行转换。
`toAsyncStreamable` 协议优先于 `toStreamable`，而 `toStreamable` 优先于迭代协议（`Symbol.asyncIterator`、
`Symbol.iterator`）。

```mjs
import { Buffer } from 'node:buffer';
import { from, text } from 'node:stream/iter';

console.log(await text(from('hello')));       // 'hello'
console.log(await text(from(Buffer.from('hello')))); // 'hello'
```

```cjs
const { Buffer } = require('node:buffer');
const { from, text } = require('node:stream/iter');

async function run() {
  console.log(await text(from('hello')));       // 'hello'
  console.log(await text(from(Buffer.from('hello')))); // 'hello'
}

run().catch(console.error);
```

### `fromSync(input)`

<!-- YAML
added: v25.9.0
-->

* `input` {string|ArrayBuffer|ArrayBufferView|Iterable|Object}
  不能为 `null` 或 `undefined`。
* 返回：{Iterable\<Uint8Array\[]>}

[`from()`][] 的同步版本。返回同步可迭代对象。不能接受
异步可迭代对象或 Promise。实现
`Symbol.for('Stream.toStreamable')` 的对象会通过该协议进行转换（优先于 `Symbol.iterator`）。`toAsyncStreamable` 协议会被完全忽略。

```mjs
import { fromSync, textSync } from 'node:stream/iter';

console.log(textSync(fromSync('hello'))); // 'hello'
```

```cjs
const { fromSync, textSync } = require('node:stream/iter');

console.log(textSync(fromSync('hello'))); // 'hello'
```

## 管道

### `pipeTo(source[, ...transforms], writer[, options])`

<!-- YAML
added: v25.9.0
-->

* `source` {AsyncIterable|Iterable} 数据源。
* `...transforms` {Function|Object} 零个或多个要应用的转换。
* `writer` {Object} 具有 `write(chunk)` 方法的目标。
* `options` {Object}
  * `signal` {AbortSignal} 中止管道。
  * `preventClose` {boolean} 如果为 `true`，则在源结束时不调用 `writer.end()`。**默认：** `false`。
  * `preventFail` {boolean} 如果为 `true`，则在出错时不调用 `writer.fail()`。**默认：** `false`。
* 返回：{Promise\<number>} 写入的总字节数。

将源通过转换管道输送到写入器。如果写入器具有
`writev(chunks)` 方法，则整个批次会在单次调用中传递（启用
分散/聚集 I/O）。

如果写入器实现了可选的 `*Sync` 方法（`writeSync`、`writevSync`、
`endSync`），`pipeTo()` 将尝试首先使用同步方法
作为快速路径，仅当同步方法表明它们无法完成时（例如，背压或等待
下一个事件循环刻度）才回退到异步版本。`fail()` 总是同步调用。

```mjs
import { from, pipeTo } from 'node:stream/iter';
import { compressGzip } from 'node:zlib/iter';
import { open } from 'node:fs/promises';

const fh = await open('output.gz', 'w');
const totalBytes = await pipeTo(
  from('Hello, world!'),
  compressGzip(),
  fh.writer({ autoClose: true }),
);
```

```cjs
const { from, pipeTo } = require('node:stream/iter');
const { compressGzip } = require('node:zlib/iter');
const { open } = require('node:fs/promises');

async function run() {
  const fh = await open('output.gz', 'w');
  const totalBytes = await pipeTo(
    from('Hello, world!'),
    compressGzip(),
    fh.writer({ autoClose: true }),
  );
}

run().catch(console.error);
```

### `pipeToSync(source[, ...transforms], writer[, options])`

<!-- YAML
added: v25.9.0
-->

* `source` {Iterable} 同步数据源。
* `...transforms` {Function|Object} 零个或多个同步转换。
* `writer` {Object} 具有 `write(chunk)` 方法的目标。
* `options` {Object}
  * `preventClose` {boolean} **默认：** `false`。
  * `preventFail` {boolean} **默认：** `false`。
* 返回：{number} 写入的总字节数。

[`pipeTo()`][] 的同步版本。`source`、所有转换和
`writer` 必须是同步的。不能接受异步可迭代对象或 Promise。

`writer` 必须具有 `*Sync` 方法（`writeSync`、`writevSync`、
`endSync`）和 `fail()` 才能正常工作。

### `pull(source[, ...transforms][, options])`

<!-- YAML
added: v25.9.0
-->

* `source` {AsyncIterable|Iterable} 数据源。
* `...transforms` {Function|Object} 零个或多个要应用的转换。
* `options` {Object}
  * `signal` {AbortSignal} 中止管道。
* 返回：{AsyncIterable\<Uint8Array\[]>}

创建惰性异步管道。直到返回的可迭代对象被消费之前，不会从 `source` 读取数据。转换按顺序应用。

```mjs
import { from, pull, text } from 'node:stream/iter';

const asciiUpper = (chunks) => {
  if (chunks === null) return null;
  return chunks.map((c) => {
    for (let i = 0; i < c.length; i++) {
      c[i] -= (c[i] >= 97 && c[i] <= 122) * 32;
    }
    return c;
  });
};

const result = pull(from('hello'), asciiUpper);
console.log(await text(result)); // 'HELLO'
```

```cjs
const { from, pull, text } = require('node:stream/iter');

const asciiUpper = (chunks) => {
  if (chunks === null) return null;
  return chunks.map((c) => {
    for (let i = 0; i < c.length; i++) {
      c[i] -= (c[i] >= 97 && c[i] <= 122) * 32;
    }
    return c;
  });
};

async function run() {
  const result = pull(from('hello'), asciiUpper);
  console.log(await text(result)); // 'HELLO'
}

run().catch(console.error);
```

使用 `AbortSignal`：

```mjs
import { pull } from 'node:stream/iter';

const ac = new AbortController();
const result = pull(source, transform, { signal: ac.signal });
ac.abort(); // 管道在下一次迭代时抛出 AbortError
```

```cjs
const { pull } = require('node:stream/iter');

const ac = new AbortController();
const result = pull(source, transform, { signal: ac.signal });
ac.abort(); // 管道在下一次迭代时抛出 AbortError
```

### `pullSync(source[, ...transforms])`

<!-- YAML
added: v25.9.0
-->

* `source` {Iterable} 同步数据源。
* `...transforms` {Function|Object} 零个或多个同步转换。
* 返回：{Iterable\<Uint8Array\[]>}

[`pull()`][] 的同步版本。所有转换必须是同步的。

## 推送流

### `push([...transforms][, options])`

<!-- YAML
added: v25.9.0
-->

* `...transforms` {Function|Object} 应用于可读侧的可选转换。
* `options` {Object}
  * `highWaterMark` {number} 应用背压前的最大缓冲槽数。必须 >= 1；低于 1 的值会被钳制为 1。
    **默认：** `4`。
  * `backpressure` {string} 背压策略：`'strict'`、`'block'`、
    `'drop-oldest'` 或 `'drop-newest'`。**默认：** `'strict'`。
  * `signal` {AbortSignal} 中止流。
* 返回：{Object}
  * `writer` {PushWriter} 写入器侧。
  * `readable` {AsyncIterable\<Uint8Array\[]>} 可读侧。

创建具有背压的推送流。写入器推入数据；
可读侧作为异步可迭代对象被消费。

```mjs
import { push, text } from 'node:stream/iter';

const { writer, readable } = push();

// 生产者和消费者必须并发运行。使用严格背压
// （默认）时，待处理的写入会阻塞直到消费者读取。
const producing = (async () => {
  await writer.write('hello');
  await writer.write(' world');
  await writer.end();
})();

console.log(await text(readable)); // 'hello world'
await producing;
```

```cjs
const { push, text } = require('node:stream/iter');

async function run() {
  const { writer, readable } = push();

  // 生产者和消费者必须并发运行。使用严格背压
  // （默认）时，待处理的写入会阻塞直到消费者读取。
  const producing = (async () => {
    await writer.write('hello');
    await writer.write(' world');
    await writer.end();
  })();

  console.log(await text(readable)); // 'hello world'
  await producing;
}

run().catch(console.error);
```

`push()` 返回的写入器符合 \[Writer 接口]\[]。

## 双工通道

### `duplex([options])`

<!-- YAML
added: v25.9.0
-->

* `options` {Object}
  * `highWaterMark` {number} 两个方向的缓冲区大小。
    **默认：** `4`。
  * `backpressure` {string} 两个方向的策略。
    **默认：** `'strict'`。
  * `signal` {AbortSignal} 两个通道的取消信号。
  * `a` {Object} 特定于 A 到 B 方向的选项。覆盖
    共享选项。
    * `highWaterMark` {number}
    * `backpressure` {string}
  * `b` {Object} 特定于 B 到 A 方向的选项。覆盖
    共享选项。
    * `highWaterMark` {number}
    * `backpressure` {string}
* 返回：{Array} 一对双工通道 `[channelA, channelB]`。

创建一对连接的双工通道用于双向通信，
类似于 `socketpair()`。写入一个通道写入器的数据会出现在
另一个通道的可读侧。

每个通道具有：

* `writer` — 一个 \[Writer 接口]\[] 对象，用于向对端发送数据。
* `readable` — 一个 `AsyncIterable<Uint8Array[]>`，用于从对端读取数据。
* `close()` — 关闭此通道端（幂等）。
* `[Symbol.asyncDispose]()` — 用于 `await using` 的异步处置支持。

```mjs
import { duplex, text } from 'node:stream/iter';

const [client, server] = duplex();

// 服务器回显
const serving = (async () => {
  for await (const chunks of server.readable) {
    await server.writer.writev(chunks);
  }
})();

await client.writer.write('hello');
await client.writer.end();

console.log(await text(server.readable)); // 由回显处理
await serving;
```

```cjs
const { duplex, text } = require('node:stream/iter');

async function run() {
  const [client, server] = duplex();

  // 服务器回显
  const serving = (async () => {
    for await (const chunks of server.readable) {
      await server.writer.writev(chunks);
    }
  })();

  await client.writer.write('hello');
  await client.writer.end();

  console.log(await text(server.readable)); // 由回显处理
  await serving;
}

run().catch(console.error);
```

## 消费者

### `array(source[, options])`

<!-- YAML
added: v25.9.0
-->

* `source` {AsyncIterable\<Uint8Array\[]>|Iterable\<Uint8Array\[]>}
* `options` {Object}
  * `signal` {AbortSignal}
  * `limit` {number} 要消耗的最大字节数。如果收集的总字节数超过限制，将抛出 `ERR_OUT_OF_RANGE` 错误
* 返回：{Promise\<Uint8Array\[]>}

将所有块收集为 `Uint8Array` 值的数组（不进行连接）。

### `arrayBuffer(source[, options])`

<!-- YAML
added: v25.9.0
-->

* `source` {AsyncIterable\<Uint8Array\[]>|Iterable\<Uint8Array\[]>}
* `options` {Object}
  * `signal` {AbortSignal}
  * `limit` {number} 要消耗的最大字节数。如果收集的总字节数超过限制，将抛出 `ERR_OUT_OF_RANGE` 错误
* 返回：{Promise\<ArrayBuffer>}

将所有字节收集到一个 `ArrayBuffer` 中。

### `arrayBufferSync(source[, options])`

<!-- YAML
added: v25.9.0
-->

* `source` {Iterable\<Uint8Array\[]>}
* `options` {Object}
  * `limit` {number} 要消耗的最大字节数。如果收集的总字节数超过限制，将抛出 `ERR_OUT_OF_RANGE` 错误
* 返回：{ArrayBuffer}

[`arrayBuffer()`][] 的同步版本。

### `arraySync(source[, options])`

<!-- YAML
added: v25.9.0
-->

* `source` {Iterable\<Uint8Array\[]>}
* `options` {Object}
  * `limit` {number} 要消耗的最大字节数。如果收集的总字节数超过限制，将抛出 `ERR_OUT_OF_RANGE` 错误
* 返回：{Uint8Array\[]}

[`array()`][] 的同步版本。

### `bytes(source[, options])`

<!-- YAML
added: v25.9.0
-->

* `source` {AsyncIterable\<Uint8Array\[]>|Iterable\<Uint8Array\[]>}
* `options` {Object}
  * `signal` {AbortSignal}
  * `limit` {number} 要消耗的最大字节数。如果收集的总字节数超过限制，将抛出 `ERR_OUT_OF_RANGE` 错误
* 返回：{Promise\<Uint8Array>}

将流中的所有字节收集到单个 `Uint8Array` 中。

```mjs
import { from, bytes } from 'node:stream/iter';

const data = await bytes(from('hello'));
console.log(data); // Uint8Array(5) [ 104, 101, 108, 108, 111 ]
```

```cjs
const { from, bytes } = require('node:stream/iter');

async function run() {
  const data = await bytes(from('hello'));
  console.log(data); // Uint8Array(5) [ 104, 101, 108, 108, 111 ]
}

run().catch(console.error);
```

### `bytesSync(source[, options])`

<!-- YAML
added: v25.9.0
-->

* `source` {Iterable\<Uint8Array\[]>}
* `options` {Object}
  * `limit` {number} 要消耗的最大字节数。如果收集的总字节数超过限制，将抛出 `ERR_OUT_OF_RANGE` 错误
* 返回：{Uint8Array}

[`bytes()`][] 的同步版本。

### `text(source[, options])`

<!-- YAML
added: v25.9.0
-->

* `source` {AsyncIterable\<Uint8Array\[]>|Iterable\<Uint8Array\[]>}
* `options` {Object}
  * `encoding` {string} 文本编码。**默认：** `'utf-8'`。
  * `signal` {AbortSignal}
  * `limit` {number} 要消耗的最大字节数。如果收集的总字节数超过限制，将抛出 `ERR_OUT_OF_RANGE` 错误
* 返回：{Promise\<string>}

收集所有字节并解码为文本。

```mjs
import { from, text } from 'node:stream/iter';

console.log(await text(from('hello'))); // 'hello'
```

```cjs
const { from, text } = require('node:stream/iter');

async function run() {
  console.log(await text(from('hello'))); // 'hello'
}

run().catch(console.error);
```

### `textSync(source[, options])`

<!-- YAML
added: v25.9.0
-->

* `source` {Iterable\<Uint8Array\[]>}
* `options` {Object}
  * `encoding` {string} **默认：** `'utf-8'`。
  * `limit` {number} 要消耗的最大字节数。如果收集的总字节数超过限制，将抛出 `ERR_OUT_OF_RANGE` 错误
* 返回：{string}

[`text()`][] 的同步版本。

## 工具

### `ondrain(drainable)`

<!-- YAML
added: v25.9.0
-->

* `drainable` {Object} 实现可排空协议的对象。
* 返回：{Promise\<boolean>|null}

等待可排空写入器的背压清除。当写入器可以接受更多数据时，返回一个解析为 `true` 的 Promise，如果对象未实现可排空协议，则返回 `null`。

```mjs
import { push, ondrain, text } from 'node:stream/iter';

const { writer, readable } = push({ highWaterMark: 2 });
writer.writeSync('a');
writer.writeSync('b');

// 开始消费以便缓冲区实际上可以排空
const consuming = text(readable);

// 缓冲区已满 -- 等待排空
const canWrite = await ondrain(writer);
if (canWrite) {
  await writer.write('c');
}
await writer.end();
await consuming;
```

```cjs
const { push, ondrain, text } = require('node:stream/iter');

async function run() {
  const { writer, readable } = push({ highWaterMark: 2 });
  writer.writeSync('a');
  writer.writeSync('b');

  // 开始消费以便缓冲区实际上可以排空
  const consuming = text(readable);

  // 缓冲区已满 -- 等待排空
  const canWrite = await ondrain(writer);
  if (canWrite) {
    await writer.write('c');
  }
  await writer.end();
  await consuming;
}

run().catch(console.error);
```

### `merge(...sources[, options])`

<!-- YAML
added: v25.9.0
-->

* `...sources` {AsyncIterable\<Uint8Array\[]>|Iterable\<Uint8Array\[]>} 两个或更多可迭代对象。
* `options` {Object}
  * `signal` {AbortSignal}
* 返回：{AsyncIterable\<Uint8Array\[]>}

通过按时间顺序产生批次来合并多个异步可迭代对象（无论哪个源先产生数据）。所有源都被并发消费。

```mjs
import { from, merge, text } from 'node:stream/iter';

const merged = merge(from('hello '), from('world'));
console.log(await text(merged)); // 顺序取决于时机
```

```cjs
const { from, merge, text } = require('node:stream/iter');

async function run() {
  const merged = merge(from('hello '), from('world'));
  console.log(await text(merged)); // 顺序取决于时机
}

run().catch(console.error);
```

### `tap(callback)`

<!-- YAML
added: v25.9.0
-->

* `callback` {Function} `(chunks) => void` 使用每个批次调用。
* 返回：{Function} 一个无状态转换。

创建一个直通转换，用于观察批次而不修改它们。适用于日志记录、指标或调试。

```mjs
import { from, pull, text, tap } from 'node:stream/iter';

const result = pull(
  from('hello'),
  tap((chunks) => console.log('批次大小：', chunks.length)),
);
console.log(await text(result));
```

```cjs
const { from, pull, text, tap } = require('node:stream/iter');

async function run() {
  const result = pull(
    from('hello'),
    tap((chunks) => console.log('批次大小：', chunks.length)),
  );
  console.log(await text(result));
}

run().catch(console.error);
```

`tap()` 故意不阻止 tapping 回调对块的就地修改；但返回值会被忽略。

### `tapSync(callback)`

<!-- YAML
added: v25.9.0
-->

* `callback` {Function}
* 返回：{Function}

[`tap()`][] 的同步版本。

## 多消费者

### `broadcast([options])`

<!-- YAML
added: v25.9.0
-->

* `options` {Object}
  * `highWaterMark` {number} 缓冲区大小（以槽位计）。必须 >= 1；低于 1 的值会被钳制为 1。**默认：** `16`。
  * `backpressure` {string} `'strict'`、`'block'`、`'drop-oldest'` 或 `'drop-newest'`。**默认：** `'strict'`。
  * `signal` {AbortSignal}
* 返回：{Object}
  * `writer` {BroadcastWriter}
  * `broadcast` {Broadcast}

创建一个推模型多消费者广播通道。单个写入器将数据推送到多个消费者。每个消费者都有一个指向共享缓冲区的独立游标。

```mjs
import { broadcast, text } from 'node:stream/iter';

const { writer, broadcast: bc } = broadcast();

// 在写入前创建消费者
const c1 = bc.push();  // 消费者 1
const c2 = bc.push();  // 消费者 2

// 生产者和消费者必须并发运行。当缓冲区填满时，待处理的写入会阻塞，直到消费者读取。
const producing = (async () => {
  await writer.write('hello');
  await writer.end();
})();

const [r1, r2] = await Promise.all([text(c1), text(c2)]);
console.log(r1); // 'hello'
console.log(r2); // 'hello'
await producing;
```

```cjs
const { broadcast, text } = require('node:stream/iter');

async function run() {
  const { writer, broadcast: bc } = broadcast();

  // 在写入前创建消费者
  const c1 = bc.push();  // 消费者 1
  const c2 = bc.push();  // 消费者 2

  // 生产者和消费者必须并发运行。当缓冲区填满时，待处理的写入会阻塞，直到消费者读取。
  const producing = (async () => {
    await writer.write('hello');
    await writer.end();
  })();

  const [r1, r2] = await Promise.all([text(c1), text(c2)]);
  console.log(r1); // 'hello'
  console.log(r2); // 'hello'
  await producing;
}

run().catch(console.error);
```

#### `broadcast.bufferSize`

* {number}

当前缓冲的块数。

#### `broadcast.cancel([reason])`

* `reason` {Error}

取消广播。所有消费者都会收到一个错误。

#### `broadcast.consumerCount`

* {number}

活动消费者的数量。

#### `broadcast.push([...transforms][, options])`

* `...transforms` {Function|Object}
* `options` {Object}
  * `signal` {AbortSignal}
* 返回：{AsyncIterable\<Uint8Array\[]>}

创建一个新的消费者。每个消费者都会接收从订阅点开始写入广播的所有数据。可选的转换会应用于此消费者的数据视图。

#### `broadcast[Symbol.dispose]()`

`broadcast.cancel()` 的别名。

### `Broadcast.from(input[, options])`

<!-- YAML
added: v25.9.0
-->

* `input` {AsyncIterable|Iterable|Broadcastable}
* `options` {Object} 与 `broadcast()` 相同。
* 返回：{Object} `{ writer, broadcast }`

从现有源创建 {Broadcast}。源会被自动消费并推送到所有订阅者。

### `share(source[, options])`

<!-- YAML
added: v25.9.0
-->

* `source` {AsyncIterable} 要共享的源。
* `options` {Object}
  * `highWaterMark` {number} 缓冲区大小。必须 >= 1；低于 1 的值会被钳制为 1。**默认：** `16`。
  * `backpressure` {string} `'strict'`、`'block'`、`'drop-oldest'` 或 `'drop-newest'`。**默认：** `'strict'`。
* 返回：{Share}

创建一个拉模型多消费者共享流。与 `broadcast()` 不同，源仅在有消费者拉取时才会被读取。多个消费者共享单个缓冲区。

```mjs
import { from, share, text } from 'node:stream/iter';

const shared = share(from('hello'));

const c1 = shared.pull();
const c2 = shared.pull();

// 并发消费以避免小缓冲区死锁。
const [r1, r2] = await Promise.all([text(c1), text(c2)]);
console.log(r1); // 'hello'
console.log(r2); // 'hello'
```

```cjs
const { from, share, text } = require('node:stream/iter');

async function run() {
  const shared = share(from('hello'));

  const c1 = shared.pull();
  const c2 = shared.pull();

  // 并发消费以避免小缓冲区死锁。
  const [r1, r2] = await Promise.all([text(c1), text(c2)]);
  console.log(r1); // 'hello'
  console.log(r2); // 'hello'
}

run().catch(console.error);
```

#### `share.bufferSize`

* {number}

当前缓冲的块数。

#### `share.cancel([reason])`

* `reason` {Error}

取消共享。所有消费者都会收到一个错误。

#### `share.consumerCount`

* {number}

活动消费者的数量。

#### `share.pull([...transforms][, options])`

* `...transforms` {Function|Object}
* `options` {Object}
  * `signal` {AbortSignal}
* 返回：{AsyncIterable\<Uint8Array\[]>}

创建共享源的新消费者。

#### `share[Symbol.dispose]()`

`share.cancel()` 的别名。

### `Share.from(input[, options])`

<!-- YAML
added: v25.9.0
-->

* `input` {AsyncIterable|Shareable}
* `options` {Object} 与 `share()` 相同。
* 返回：{Share}

从现有源创建 {Share}。

### `shareSync(source[, options])`

<!-- YAML
added: v25.9.0
-->

* `source` {Iterable} 要共享的同步源。
* `options` {Object}
  * `highWaterMark` {number} 必须 >= 1；低于 1 的值会被钳制为 1。**默认：** `16`。
  * `backpressure` {string} **默认：** `'strict'`。
* 返回：{SyncShare}

[`share()`][] 的同步版本。

### `SyncShare.fromSync(input[, options])`

<!-- YAML
added: v25.9.0
-->

* `input` {Iterable|SyncShareable}
* `options` {Object}
* 返回：{SyncShare}

## 压缩和解压缩转换

用于 `pull()`、`pullSync()`、`pipeTo()` 和 `pipeToSync()` 的压缩和解压缩转换可通过 [`node:zlib/iter`][] 模块获得。详见 [`node:zlib/iter` 文档][]。

## 协议符号

这些众所周知的符号允许第三方对象参与流协议，而无需直接从 `node:stream/iter` 导入。

### `Stream.broadcastProtocol`

* 值：`Symbol.for('Stream.broadcastProtocol')`

该值必须是一个函数。当被 `Broadcast.from()` 调用时，它接收传递给 `Broadcast.from()` 的选项，并且必须返回一个符合 {Broadcast} 接口的对象。实现完全是自定义的——它可以随意管理消费者、缓冲和背压。

```mjs
import { Broadcast, text } from 'node:stream/iter';

// 此示例委托给内置的 Broadcast，但自定义
// 实现可以使用任何机制。
class MessageBus {
  #broadcast;
  #writer;

  constructor() {
    const { writer, broadcast } = Broadcast();
    this.#writer = writer;
    this.#broadcast = broadcast;
  }

  [Symbol.for('Stream.broadcastProtocol')](options) {
    return this.#broadcast;
  }

  send(data) {
    this.#writer.write(new TextEncoder().encode(data));
  }

  close() {
    this.#writer.end();
  }
}

const bus = new MessageBus();
const { broadcast } = Broadcast.from(bus);
const consumer = broadcast.push();
bus.send('hello');
bus.close();
console.log(await text(consumer)); // 'hello'
```

```cjs
const { Broadcast, text } = require('node:stream/iter');

// 此示例委托给内置的 Broadcast，但自定义
// 实现可以使用任何机制。
class MessageBus {
  #broadcast;
  #writer;

  constructor() {
    const { writer, broadcast } = Broadcast();
    this.#writer = writer;
    this.#broadcast = broadcast;
  }

  [Symbol.for('Stream.broadcastProtocol')](options) {
    return this.#broadcast;
  }

  send(data) {
    this.#writer.write(new TextEncoder().encode(data));
  }

  close() {
    this.#writer.end();
  }
}

const bus = new MessageBus();
const { broadcast } = Broadcast.from(bus);
const consumer = broadcast.push();
bus.send('hello');
bus.close();
text(consumer).then(console.log); // 'hello'
```

### `Stream.drainableProtocol`

* 值：`Symbol.for('Stream.drainableProtocol')`

实现此方法以使写入器与 `ondrain()` 兼容。该方法应返回一个在背压清除时解析的 promise，如果没有背压则返回 `null`。

```mjs
import { ondrain } from 'node:stream/iter';

class CustomWriter {
  #queue = [];
  #drain = null;
  #closed = false;
  [Symbol.for('Stream.drainableProtocol')]() {
    if (this.#closed) return null;
    if (this.#queue.length < 3) return Promise.resolve(true);
    this.#drain ??= Promise.withResolvers();
    return this.#drain.promise;
  }
  write(chunk) {
    this.#queue.push(chunk);
  }
  flush() {
    this.#queue.length = 0;
    this.#drain?.resolve(true);
    this.#drain = null;
  }
  close() {
    this.#closed = true;
  }
}
const writer = new CustomWriter();
const ready = ondrain(writer);
console.log(ready); // Promise { true } -- 无背压
```

```cjs
const { ondrain } = require('node:stream/iter');

class CustomWriter {
  #queue = [];
  #drain = null;
  #closed = false;

  [Symbol.for('Stream.drainableProtocol')]() {
    if (this.#closed) return null;
    if (this.#queue.length < 3) return Promise.resolve(true);
    this.#drain ??= Promise.withResolvers();
    return this.#drain.promise;
  }

  write(chunk) {
    this.#queue.push(chunk);
  }

  flush() {
    this.#queue.length = 0;
    this.#drain?.resolve(true);
    this.#drain = null;
  }

  close() {
    this.#closed = true;
  }
}

const writer = new CustomWriter();
const ready = ondrain(writer);
console.log(ready); // Promise { true } -- 无背压
```

### `Stream.shareProtocol`

* 值：`Symbol.for('Stream.shareProtocol')`

该值必须是一个函数。当被 `Share.from()` 调用时，它接收传递给 `Share.from()` 的选项，并且必须返回一个符合 {Share} 接口的对象。实现完全是自定义的——它可以随意管理共享源、消费者、缓冲和背压。

```mjs
import { share, Share, text } from 'node:stream/iter';

// 此示例委托给内置的 share()，但自定义
// 实现可以使用任何机制。
class DataPool {
  #share;

  constructor(source) {
    this.#share = share(source);
  }

  [Symbol.for('Stream.shareProtocol')](options) {
    return this.#share;
  }
}

const pool = new DataPool(
  (async function* () {
    yield 'hello';
  })(),
);

const shared = Share.from(pool);
const consumer = shared.pull();
console.log(await text(consumer)); // 'hello'
```

```cjs
const { share, Share, text } = require('node:stream/iter');

// 此示例委托给内置的 share()，但自定义
// 实现可以使用任何机制。
class DataPool {
  #share;

  constructor(source) {
    this.#share = share(source);
  }

  [Symbol.for('Stream.shareProtocol')](options) {
    return this.#share;
  }
}

const pool = new DataPool(
  (async function* () {
    yield 'hello';
  })(),
);

const shared = Share.from(pool);
const consumer = shared.pull();
text(consumer).then(console.log); // 'hello'
```

### `Stream.shareSyncProtocol`

* 值：`Symbol.for('Stream.shareSyncProtocol')`

该值必须是一个函数。当被 `SyncShare.fromSync()` 调用时，它接收传递给 `SyncShare.fromSync()` 的选项，并且必须返回一个符合 {SyncShare} 接口的对象。实现完全是自定义的——它可以随意管理共享源、消费者和缓冲。

```mjs
import { shareSync, SyncShare, textSync } from 'node:stream/iter';

// 此示例委托给内置的 shareSync()，但自定义
// 实现可以使用任何机制。
class SyncDataPool {
  #share;

  constructor(source) {
    this.#share = shareSync(source);
  }

  [Symbol.for('Stream.shareSyncProtocol')](options) {
    return this.#share;
  }
}

const encoder = new TextEncoder();
const pool = new SyncDataPool(
  function* () {
    yield [encoder.encode('hello')];
  }(),
);

const shared = SyncShare.fromSync(pool);
const consumer = shared.pull();
console.log(textSync(consumer)); // 'hello'
```

```cjs
const { shareSync, SyncShare, textSync } = require('node:stream/iter');

// 此示例委托给内置的 shareSync()，但自定义
// 实现可以使用任何机制。
class SyncDataPool {
  #share;

  constructor(source) {
    this.#share = shareSync(source);
  }

  [Symbol.for('Stream.shareSyncProtocol')](options) {
    return this.#share;
  }
}

const encoder = new TextEncoder();
const pool = new SyncDataPool(
  function* () {
    yield [encoder.encode('hello')];
  }(),
);

const shared = SyncShare.fromSync(pool);
const consumer = shared.pull();
console.log(textSync(consumer)); // 'hello'
```

### `Stream.toAsyncStreamable`

* 值：`Symbol.for('Stream.toAsyncStreamable')`

该值必须是一个将对象转换为可流式传输值的函数。当该对象在流式管道的任何地方被遇到时（作为传递给 `from()` 的源，或作为从转换返回的值），此方法被调用来产生实际数据。它可以返回（或解析为）任何可流式传输的值：字符串、`Uint8Array`、`AsyncIterable`、`Iterable` 或另一个可流式传输对象。

```mjs
import { from, text } from 'node:stream/iter';

class Greeting {
  #name;

  constructor(name) {
    this.#name = name;
  }

  [Symbol.for('Stream.toAsyncStreamable')]() {
    return `hello ${this.#name}`;
  }
}

const stream = from(new Greeting('world'));
console.log(await text(stream)); // 'hello world'
```

```cjs
const { from, text } = require('node:stream/iter');

class Greeting {
  #name;

  constructor(name) {
    this.#name = name;
  }

  [Symbol.for('Stream.toAsyncStreamable')]() {
    return `hello ${this.#name}`;
  }
}

const stream = from(new Greeting('world'));
text(stream).then(console.log); // 'hello world'
```

### `Stream.toStreamable`

* 值：`Symbol.for('Stream.toStreamable')`

该值必须是一个同步将对象转换为可流式传输值的函数。当该对象在流式管道的任何地方被遇到时（作为传递给 `fromSync()` 的源，或作为从同步转换返回的值），此方法被调用来产生实际数据。它必须同步返回一个可流式传输的值：字符串、`Uint8Array` 或 `Iterable`。

```mjs
import { fromSync, textSync } from 'node:stream/iter';

class Greeting {
  #name;

  constructor(name) {
    this.#name = name;
  }

  [Symbol.for('Stream.toStreamable')]() {
    return `hello ${this.#name}`;
  }
}

const stream = fromSync(new Greeting('world'));
console.log(textSync(stream)); // 'hello world'
```

```cjs
const { fromSync, textSync } = require('node:stream/iter');

class Greeting {
  #name;

  constructor(name) {
    this.#name = name;
  }

  [Symbol.for('Stream.toStreamable')]() {
    return `hello ${this.#name}`;
  }
}

const stream = fromSync(new Greeting('world'));
console.log(textSync(stream)); // 'hello world'
```

[`array()`]: #arraysource-options
[`arrayBuffer()`]: #arraybuffersource-options
[`bytes()`]: #bytessource-options
[`from()`]: #frominput
[`node:zlib/iter`]: zlib_iter.md
[`node:zlib/iter` 文档]: zlib_iter.md
[`pipeTo()`]: #pipetosource-transforms-writer-options
[`pull()`]: #pullsource-transforms-options
[`share()`]: #sharesource-options
[`tap()`]: #tapcallback
[`text()`]: #textsource-options
