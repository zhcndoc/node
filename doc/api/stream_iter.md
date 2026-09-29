# 可迭代流

<!--introduced_in=v24.20.0-->

> 稳定性：1 - 实验性 – 使用 [`--experimental-stream-iter`][] CLI 标志启用此 API。

<!-- source_link=lib/stream/iter.js -->

`node:stream/iter` 模块提供了一个基于可迭代对象（iterables）构建的流式 API，
而不是基于事件驱动的 `Readable`/`Writable`/`Transform` 类层次结构，
或 Web Streams 的 `ReadableStream`/`WritableStream`/`TransformStream` 接口。

流以 {AsyncIterable}（异步）或 {Iterable}（同步）的形式表示。没有可供扩展的基类——任何
实现了可迭代协议的对象都可以参与其中。转换器是普通函数，或带有 `transform` 方法的对象。

数据以**批次**（每次迭代一个 {Uint8Array\[]}）的形式流动，以分摊异步操作的开销。

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

此 API 中的所有数据都表示为 {Uint8Array} 字节。传递给 `from()`、`push()` 或
`pipeTo()` 时，字符串会自动进行 UTF-8 编码。这消除了编码方面的歧义，并支持在流与
原生代码之间进行零拷贝传输。

### 批处理

每次迭代都会产生一个**批次**——由 {Uint8Array} 块组成的 {Array}
（{Uint8Array\[]}）。批处理将 `await` 和 {Promise} 创建的开销分摊到多个块上。
一次处理一个块的消费者只需迭代内部数组：

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

* **无状态** -- 一个函数 `(chunks, options) => result`，每个批次调用一次。接收
  `Uint8Array[]`（或作为刷新信号的 `null`）和一个 `options` 对象。返回
  {Uint8Array\[]|null|Iterable}。

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

* **推送** -- 数据被显式写入。`push()` 创建一个具有背压的写入器/可读取对象对。写入器将数据推入；可读取对象作为异步可迭代对象被消费。

### 背压

拉取流具有自然的背压——消费者驱动处理速度，因此源读取数据的速度不会超过消费者的处理能力。推送流需要显式背压，因为生产者和消费者彼此独立运行。`push()`、`broadcast()` 和 `share()` 上的 `budget` 与 `backpressure` 选项控制其工作方式。

#### 双缓冲模型

推送流使用由两部分组成的缓冲系统。可以将其想象成一个通过软管（待处理写入）注水的桶（缓冲区），并配有一个在桶装满时关闭的浮阀：

```text
                          budget (e.g., 16384)
                                 |
    Producer                     v
       |                    +---------+
       v                    |         |
  [ write() ] ----+    +--->| buffer  |---> Consumer pulls
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

* **缓冲区（桶）** -- 为消费者准备的数据，容量上限为
  `budget` 字节。当消费者拉取数据时，所有已缓冲数据会一次性排入单个批次。

* **待处理写入（软管）** -- 等待缓冲区空间的写入。消费者排空缓冲区后，待处理写入会被提升到现在为空的缓冲区中，其 Promise 随后完成。

每种策略如何使用这些缓冲区：

| 策略            | 缓冲区限制 | 待处理写入限制 |
| --------------- | ---------- | -------------- |
| `'strict'`      | `budget`   | 1              |
| `'unbounded'`   | `budget`   | 无限制         |
| `'drop-oldest'` | `budget`   | 不适用（从不等待） |
| `'drop-newest'` | `budget`   | 不适用（从不等待） |

#### 严格模式（默认）

严格模式会捕获生产者调用 `write()` 但不等待的“即发即弃”模式，这种模式会导致内存无限增长。它将缓冲区限制为 `budget` 字节，并将待处理写入队列限制为单个条目。

如果你正确地等待每个写入，你一次只能有一个待处理写入（你自己的），所以你永远不会达到待处理写入限制。未等待的写入会在待处理队列中积累，一旦溢出就会抛出错误：

```mjs
import { push, text } from 'node:stream/iter';

const { writer, readable } = push({ budget: 16384 });

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
  const { writer, readable } = push({ budget: 16384 });

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

#### 无界模式

无界模式将缓冲字节数限制在 `budget`，但不限制待处理写入队列。等待的写入会阻塞，直到消费者腾出空间，与严格模式相同。区别在于，未等待的写入会静默地无限排队，而不是抛出错误——如果生产者忘记 `await`，可能导致内存泄漏。

这是现有 Node.js 经典流和 Web Streams 默认使用的模式。当你控制生产者并知道它会正确等待时，或者从这些 API 迁移代码时，可以使用它。

```mjs
import { push, text } from 'node:stream/iter';

const { writer, readable } = push({
  budget: 16384,
  backpressure: 'unbounded',
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
    budget: 16384,
    backpressure: 'unbounded',
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

写入从不等待。当槽位缓冲区满时，最旧的缓冲块会被驱逐，为传入的写入腾出空间。消费者始终看到最新数据。适用于实时馈送、遥测或任何陈旧数据不如当前数据有价值的场景。

```mjs
import { push } from 'node:stream/iter';

// 仅保留最近约 16 KB 的读数
const { writer, readable } = push({
  budget: 16384,
  backpressure: 'drop-oldest',
});
```

```cjs
const { push } = require('node:stream/iter');

// 仅保留最近约 16 KB 的读数
const { writer, readable } = push({
  budget: 16384,
  backpressure: 'drop-oldest',
});
```

#### 丢弃最新

写入从不等待。当槽位缓冲区已满时，传入的写入会被静默丢弃。消费者处理已缓冲的内容，而不会被新数据淹没。适用于速率限制或在压力下卸载负载。

```mjs
import { push } from 'node:stream/iter';

// 接受最多 16 KB 的缓冲数据；丢弃超出部分
const { writer, readable } = push({
  budget: 16384,
  backpressure: 'drop-newest',
});
```

```cjs
const { push } = require('node:stream/iter');

// 接受最多 16 KB 的缓冲数据；丢弃超出部分
const { writer, readable } = push({
  budget: 16384,
  backpressure: 'drop-newest',
});
```

### Writer 接口

writer 是任何符合 Writer 接口的对象。只需要 `write()`；所有其他方法都是可选的。

Writer 参数使用 Web IDL 转换语义。非 `Uint8Array` 块会转换为 `USVString`，然后进行 UTF-8 编码。`writev()` 和
`writevSync()` 接受值可以转换为块的任意可迭代对象。Writer 选项字典将 `null` 视为空字典，并忽略未知成员。

每个异步方法都有一个同步的 `*Sync` 对应方法，专为尝试后回退模式而设计：先尝试快速同步路径，仅当同步调用表明无法完成时，才回退到异步版本：

```mjs
if (!writer.writeSync(chunk)) await writer.write(chunk);
if (!writer.writevSync(chunks)) await writer.writev(chunks);
if (writer.endSync() < 0) await writer.end();
writer.fail(err);  // 始终同步，不需要回退
```

#### `writer.canWrite`

* {boolean|null}

如果槽位缓冲区有实际容量（已缓冲数据低于配置的字节预算），则返回 `true`；如果预算已耗尽，则返回 `false`；如果 writer 已关闭或消费者已断开连接，则返回 `null`。

此属性独立于背压策略报告实际容量。使用
`'drop-oldest'` 或 `'drop-newest'` 时，即使此值为 `false`，写入仍会完成，分别通过驱逐已缓冲数据或丢弃传入数据实现。

这只是提示，并非保证：检查与写入之间状态可能发生变化。应使用 [`ondrain()`][] 等待容量，而不是轮询。

#### 写入全部数据

* `options` {Object}
  * `signal` {AbortSignal} 仅取消此操作。该信号只会取消挂起的 `end()` 调用；不会使 writer 自身失败。
* 返回：{Promise} 完成时返回已写入的总字节数。

表示不会再写入数据。已经在等待缓冲区空间的写入仍会按顺序排在流结束之前，而之后的写入会失败。如果仍有未处理数据，返回的 Promise 会在消费者拉取最终批次之后的 `done: true` 时兑现。如果没有缓冲或待处理数据，writer 会立即关闭。

#### 获取已写入字节数

* 返回：{number} 已写入的总字节数；如果无法同步完成，则为 `-1`。

`writer.end()` 的同步版本。返回值为 `-1` 仅表示操作无法同步完成；不能据此判断关闭是否已开始，或无法完成的原因。使用尝试后回退模式等待完成：

```cjs
const result = writer.endSync();
if (result < 0) {
  writer.end();
}
```

#### `writer.fail([reason])`

* `reason` {any}

将 writer 置于终止错误状态。如果 writer 已关闭或已出错，则不执行任何操作。与 `write()` 和 `end()` 不同，`fail()` 始终同步，因为使 writer 失败是纯粹的状态转换，不需要执行异步工作。原因会原样存储并传递。如果省略，则原因是 `undefined`。

#### `writer[Symbol.asyncDispose]()`

如果 writer 处于打开状态，则调用 `writer.fail()`。如果 writer 在 `end()` 或 `endSync()` 后正在关闭，则等待缓冲数据排空。如果 writer 已关闭或已出错，则立即兑现。

#### `writer.write(chunk[, options])`

* `chunk` {Uint8Array|string}
* `options` {Object}
  * `signal` {AbortSignal} 仅取消此写入操作。该信号只会取消挂起的 `write()` 调用；不会使 writer 自身失败。
* 返回：{Promise} 当缓冲区空间可用时完成，返回 `undefined`。

写入一个块。

#### `writer.writeSync(chunk)`

* `chunk` {Uint8Array|string}
* 返回：{boolean} 如果写入被接受则为 `true`，如果缓冲区已满则为 `false`。

同步写入。不阻塞；如果背压处于活动状态则返回 `false`。

#### `writer.writev(chunks[, options])`

* `chunks` {Iterable}，其值为 {Uint8Array|string}
* `options` {Object}
  * `signal` {AbortSignal} 仅取消此写入操作。该信号只会取消挂起的 `writev()` 调用；不会使 writer 自身失败。
* 返回：{Promise}

将多个块作为单个批次写入。

#### `writer.writevSync(chunks)`

* `chunks` {Iterable}，其值为 {Uint8Array|string}
* 返回：{boolean} 如果写入被接受则为 `true`，如果缓冲区已满则为 `false`。

同步批次写入。

## `stream/iter` 模块

大多数函数既可作为命名导出使用，也可作为 `Stream` 命名空间对象的属性使用。经典流适配器（`fromReadable()`、
`fromWritable()`、`toReadable()`、`toReadableSync()` 和 `toWritable()`）以及静态辅助对象（`Broadcast`、`Share` 和 `SyncShare`）仅作为命名导出提供。

```mjs
// 命名导出
import { from, pull, bytes, Stream } from 'node:stream/iter';

// 命名空间访问
Stream.from('hello');
```

Iterable Streams API 定义的选项字典使用 Web IDL 转换语义。`null` 会被视为空字典，未知成员会被忽略，已知成员会在操作运行前转换为其声明的类型。转换失败时会使用 Node.js 错误代码，例如
`ERR_INVALID_ARG_TYPE`、`ERR_INVALID_ARG_VALUE` 和 `ERR_OUT_OF_RANGE`。

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
added:
 - v25.9.0
 - v24.20.0
-->

* `input` {string|ArrayBuffer|ArrayBufferView|Iterable|AsyncIterable|Object}
  不能是 `null` 或 `undefined`。
* 返回：{AsyncIterable}，其块以 {Uint8Array\[]} 履行。

根据给定输入创建异步字节流。字符串会进行 UTF-8 编码。
`ArrayBuffer` 和 `ArrayBufferView` 值会包装为 `Uint8Array`。`input` 中的数组和可迭代对象会被递归展平并规范化。展平后的值可能会拆分到由实现定义的有界批次中。

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
added:
 - v25.9.0
 - v24.20.0
-->

* `input` {string|ArrayBuffer|ArrayBufferView|Iterable|Object}
  不能是 `null` 或 `undefined`。
* 返回：{Iterable}，其块返回 {Uint8Array\[]}

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
added:
 - v25.9.0
 - v24.20.0
-->

* `source` {AsyncIterable|Iterable} 数据源。
* `...transforms` {Function|Object} 零个或多个要应用的转换。
* `writer` {Object} 具有 `write(chunk)` 方法的目标。
* `options` {Object}
  * `signal` {AbortSignal} 中止管道。除非 `preventFail` 为 `true`，否则中止会导致目标写入器失败。
  * `preventClose` {boolean} 如果为 `true`，则源结束时不调用 `writer.end()`。**默认值：** `false`。
  * `preventFail` {boolean} 如果为 `true`，则发生错误时不调用 `writer.fail()`。**默认值：** `false`。
* 返回：{Promise} 成功时兑现为已写入的总字节数。

将源通过转换管道传输到写入器。如果写入器具有
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
added:
 - v25.9.0
 - v24.20.0
-->

* `source` {Iterable} 同步数据源。
* `...transforms` {Function|Object} 零个或多个同步转换。
* `writer` {Object} 具有 `write(chunk)` 方法的目标。
* `options` {Object}
  * `preventClose` {boolean} **默认值：** `false`。
  * `preventFail` {boolean} **默认值：** `false`。
* 返回：{number} 写入的总字节数。

[`pipeTo()`][] 的同步版本。`source`、所有转换和
`writer` 必须是同步的。不能接受异步可迭代对象或 Promise。

`writer` 必须具有 `*Sync` 方法（`writeSync`、`writevSync`、
`endSync`）和 `fail()` 才能正常工作。

### `pull(source[, ...transforms][, options])`

<!-- YAML
added:
 - v25.9.0
 - v24.20.0
-->

* `source` {AsyncIterable|Iterable} 数据源。
* `...transforms` {Function|Object} 零个或多个要应用的转换。
* `options` {Object}
  * `signal` {AbortSignal} 中止管道。
* 返回：{AsyncIterable}，其数据块以 {Uint8Array\[]} 的形式完成

创建惰性异步管道。源转换和 streamable 协议分派会在调用 `pull()` 时进行，但在消费返回的可迭代对象之前，不会从 `source` 读取数据。若信号已处于中止状态，则在源转换后同步抛出。转换按顺序应用。

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
added:
 - v25.9.0
 - v24.20.0
-->

* `source` {Iterable} 同步数据源。
* `...transforms` {Function|Object} 零个或多个同步转换。
* 返回：{Iterable}，其数据块返回 {Uint8Array\[]}

[`pull()`][] 的同步版本。源转换和 streamable 协议分派会在调用 `pullSync()` 时进行。所有转换都必须是同步的。

## 推送流

### `push([...transforms][, options])`

<!-- YAML
added:
 - v25.9.0
 - v24.20.0
-->

* `...transforms` {Function|Object} 应用于可读侧的可选转换。
* `options` {Object}
  * `budget` {number} 应用背压前允许缓冲的最大字节数。必须 >= 16384。
    **默认值：** `16384`。
  * `backpressure` {string} 背压策略：`'strict'`、`'unbounded'`、
    `'drop-oldest'` 或 `'drop-newest'`。**默认值：** `'strict'`。
  * `signal` {AbortSignal} 中止流。在 `writer.end()` 后缓冲数据排空期间，信号仍保持有效；此时中止会使写入器失败，并拒绝尚未完成的 `end()` Promise。
* 返回：{Object}
  * `writer` {Writable} 写入器侧。
  * `readable` {AsyncIterable}，其数据块兑现为 {Uint8Array\[]}

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
added:
 - v25.9.0
 - v24.20.0
-->

* `options` {Object}
  * `budget` {number} 两个方向的缓冲区大小（以字节为单位）。
    必须 >= 16384。**默认值：** `16384`。
  * `backpressure` {string} 两个方向的策略。
    **默认值：** `'strict'`。
  * `signal` {AbortSignal} 两个通道的取消信号。
  * `a` {Object} A 到 B 方向的专用选项。会覆盖
    共享选项。
    * `budget` {number}
    * `backpressure` {string}
  * `b` {Object} B 到 A 方向的专用选项。会覆盖共享选项。
    * `budget` {number}
    * `backpressure` {string}
* 返回：{Array} 一对双工通道 `[channelA, channelB]`。

创建一对连接的双工通道用于双向通信，
类似于 `socketpair()`。写入一个通道写入器的数据会出现在
另一个通道的可读侧。

每个通道具有：

* `writer` — 一个用于向对端发送数据的 \[写入器接口]\[] 对象。
* `readable` — 一个用于从对端读取数据的 {AsyncIterable}。
* `close()` — 关闭此通道端（幂等）。
* `[Symbol.asyncDispose]()` — 为 `await using` 提供异步处置支持。

```mjs
import { duplex, text } from 'node:stream/iter';

const [client, server] = duplex();

// 服务器回显
const serving = (async () => {
  for await (const chunks of server.readable) {
    await server.writer.writev(chunks);
  }
  await server.writer.end();
})();

await client.writer.write('hello');
await client.writer.end();

console.log(await text(client.readable)); // 'hello'
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
    await server.writer.end();
  })();

  await client.writer.write('hello');
  await client.writer.end();

  console.log(await text(client.readable)); // 'hello'
  await serving;
}

run().catch(console.error);
```

## 消费者

### `array(source[, options])`

<!-- YAML
added:
 - v25.9.0
 - v24.20.0
-->

* `source` {AsyncIterable|Iterable}，其块必须为 {Uint8Array\[]}
* `options` {Object}
  * `signal` {AbortSignal}
  * `limit` {number} 要收集的最大字节数。如果收集到的总字节数超过限制，将抛出 `ERR_OUT_OF_RANGE` 错误
* 返回：{Promise} 完成时返回一个 `Uint8Array` 对象数组。

将所有块收集为 `Uint8Array` 值的数组（不进行连接）。

### `arrayBuffer(source[, options])`

<!-- YAML
added:
 - v25.9.0
 - v24.20.0
-->

* `source` {AsyncIterable|Iterable}，其块必须为 {Uint8Array\[]}
* `options` {Object}
  * `signal` {AbortSignal}
  * `limit` {number} 要收集的最大字节数。如果收集到的总字节数超过限制，将抛出 `ERR_OUT_OF_RANGE` 错误
* 返回：{Promise} 完成时返回一个 `ArrayBuffer` 对象。

将所有字节收集到一个 `ArrayBuffer` 中。

### `arrayBufferSync(source[, options])`

<!-- YAML
added:
 - v25.9.0
 - v24.20.0
-->

* `source` {Iterable}，其块必须为 {Uint8Array\[]}
* `options` {Object}
  * `limit` {number} 要收集的最大字节数。如果收集到的总字节数超过限制，将抛出 `ERR_OUT_OF_RANGE` 错误
* 返回：{ArrayBuffer}

[`arrayBuffer()`][] 的同步版本。

### `arraySync(source[, options])`

<!-- YAML
added:
 - v25.9.0
 - v24.20.0
-->

* `source` {Iterable}，其块必须为 {Uint8Array\[]}
* `options` {Object}
  * `limit` {number} 要收集的最大字节数。如果收集到的总字节数超过限制，将抛出 `ERR_OUT_OF_RANGE` 错误
* 返回：{Uint8Array\[]}

[`array()`][] 的同步版本。

### `bytes(source[, options])`

<!-- YAML
added:
 - v25.9.0
 - v24.20.0
-->

* `source` {AsyncIterable|Iterable}，其块必须为 {Uint8Array\[]}
* `options` {Object}
  * `signal` {AbortSignal}
  * `limit` {number} 要收集的最大字节数。如果收集到的总字节数超过限制，将抛出 `ERR_OUT_OF_RANGE` 错误
* 返回：{Promise} 完成时返回一个 `Uint8Array` 对象。

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
added:
 - v25.9.0
 - v24.20.0
-->

* `source` {Iterable}，其块必须为 {Uint8Array\[]}
* `options` {Object}
  * `limit` {number} 要消耗的最大字节数。如果收集的总字节数超过限制，将抛出 `ERR_OUT_OF_RANGE` 错误
* 返回：{Uint8Array}

[`bytes()`][] 的同步版本。

### `text(source[, options])`

<!-- YAML
added:
 - v25.9.0
 - v24.20.0
-->

* `source` {AsyncIterable|Iterable}，其块必须为 {Uint8Array\[]}
* `options` {Object}
  * `encoding` {string} 文本编码。**默认：** `'utf-8'`。
  * `signal` {AbortSignal}
  * `limit` {number} 要消耗的最大字节数。如果收集的总字节数超过限制，将抛出 `ERR_OUT_OF_RANGE` 错误
* 返回：{Promise} 完成时返回一个 `string`。

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
added:
 - v25.9.0
 - v24.20.0
-->

* `source` {Iterable}，其块必须为 {Uint8Array\[]}
* `options` {Object}
  * `encoding` {string} **默认：** `'utf-8'`。
  * `limit` {number} 要消耗的最大字节数。如果收集的总字节数超过限制，将抛出 `ERR_OUT_OF_RANGE` 错误
* 返回：{string}

[`text()`][] 的同步版本。

## 工具

### `ondrain(drainable)`

<!-- YAML
added:
 - v25.9.0
 - v24.20.0
-->

* `drainable` {Object} 一个实现了 drainable 协议的对象。
* 返回：{Promise|null}

等待 drainable 写入器恢复物理缓冲区容量。如果对象未实现 drainable 协议，则返回 `null`；否则返回一个 Promise，当缓冲数据低于字节预算时，该 Promise 会兑现为 `true`。

对于使用 `'drop-oldest'` 或 `'drop-newest'` 的写入器，即使写入不会阻塞，此方法也会等待物理容量恢复。这样，生产者就可以在写入前等待，以避免数据丢失。

```mjs
import { push, ondrain, text } from 'node:stream/iter';

const { writer, readable } = push({ budget: 16384 });
const chunk = new Uint8Array(8192);  // 8 KB
writer.writeSync(chunk);
writer.writeSync(chunk);  // 总计 16 KB -- 缓冲区已满

// 开始消费，以便缓冲区实际排空
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
  const { writer, readable } = push({ budget: 16384 });
  const chunk = new Uint8Array(8192);  // 8 KB
  writer.writeSync(chunk);
  writer.writeSync(chunk);  // 总计 16 KB -- 缓冲区已满

  // 开始消费，以便缓冲区实际排空
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
added:
 - v25.9.0
 - v24.20.0
-->

* `...sources` {AsyncIterable|Iterable} 其块必须是 {Uint8Array\[]}
* `options` {Object}
  * `signal` {AbortSignal}
* 返回：{AsyncIterable} 其块兑现为 {Uint8Array\[]}

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
added:
 - v25.9.0
 - v24.20.0
-->

* `callback` {Function} `(chunks) => void` 每个批次以及源结束时的 `null` 都会传入此回调。
* 返回：{Function} 无状态转换。

创建一个直通转换，用于观察批次而不修改它们。适用于日志记录、指标或调试。

```mjs
import { from, pull, text, tap } from 'node:stream/iter';

const result = pull(
  from('hello'),
  tap((chunks) => {
    if (chunks !== null) console.log('Batch size:', chunks.length);
  }),
);
console.log(await text(result));
```

```cjs
const { from, pull, text, tap } = require('node:stream/iter');

async function run() {
  const result = pull(
    from('hello'),
    tap((chunks) => {
      if (chunks !== null) console.log('Batch size:', chunks.length);
    }),
  );
  console.log(await text(result));
}

run().catch(console.error);
```

`tap()` 故意不阻止 tapping 回调对块的就地修改；但返回值会被忽略。

### `tapSync(callback)`

<!-- YAML
added:
 - v25.9.0
 - v24.20.0
-->

* `callback` {Function}
* 返回：{Function}

[`tap()`][] 的同步版本。

## 多消费者

### `broadcast([options])`

<!-- YAML
added:
 - v25.9.0
 - v24.20.0
-->

* `options` {Object}
  * `budget` {number} 以字节为单位的缓冲区大小。必须 >= 16384。
    **默认值：** `65536`。
  * `backpressure` {string} `'strict'`、`'unbounded'`、`'drop-oldest'` 或
    `'drop-newest'`。**默认值：** `'strict'`。
  * `signal` {AbortSignal}
* 返回：{Object}
  * `writer` {Writable}
  * `broadcast` {BroadcastChannel}

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

#### `broadcast.cancel([reason])`

* `reason` {any}

取消广播。如果提供了 `reason`，所有消费者都会以该确切原因拒绝。如果省略该参数，消费者会正常完成。

#### `broadcast.consumerCount`

* {number}

活动消费者的数量。

#### `broadcast.push([...transforms][, options])`

* `...transforms` {Function|Object}
* `options` {Object}
  * `signal` {AbortSignal}
* 返回：{AsyncIterable}，其块以 {Uint8Array\[]} 兑现

创建一个新消费者。可选的转换会应用于该消费者所见的数据。

#### `broadcast[Symbol.dispose]()`

`broadcast.cancel()` 的别名。

### `Broadcast.from(input[, options])`

<!-- YAML
added:
 - v25.9.0
 - v24.20.0
-->

* `input` {AsyncIterable|Iterable|BroadcastChannel}
* `options` {Object} 与 `broadcast()` 相同。
* 返回：{BroadcastChannel|Object} `broadcastProtocol` 输入会直接返回其
  {BroadcastChannel}。其他输入会返回 `{ writer, broadcast }`。

从现有源创建一个 {BroadcastChannel}。源会被自动消费，并推送给所有订阅者。

### `share(source[, options])`

<!-- YAML
added:
 - v25.9.0
 - v24.20.0
-->

* `source` {AsyncIterable} 要共享的源。
* `options` {Object}
  * `budget` {number} 以字节为单位的缓冲区大小。必须 >= 16384。
    **默认值：** `65536`。
  * `backpressure` {string} `'strict'`、`'unbounded'`、`'drop-oldest'` 或
    `'drop-newest'`。**默认值：** `'strict'`。
  * `signal` {AbortSignal}
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

### 类：`Share`

#### 静态方法：`Share.from(input[, options])`

<!-- YAML
added:
 - v25.9.0
-->

* `input` {AsyncIterable|Shareable}
* `options` {Object} 与 `share()` 相同。
* 返回：{Share}

从现有源创建一个 {Share}。

#### `share.cancel([reason])`

* `reason` {any}

取消共享。如果提供了 `reason`，所有消费者都会以该确切原因拒绝。如果省略该参数，消费者会正常完成。

#### `share.consumerCount`

* {number}

活动消费者的数量。

#### `share.pull([...transforms][, options])`

* `...transforms` {Function|Object}
* `options` {Object}
  * `signal` {AbortSignal}
* 返回：{AsyncIterable}，其块以 {Uint8Array\[]} 兑现

创建共享源的新消费者。

#### `share[Symbol.dispose]()`

`share.cancel()` 的别名。

### 接口：`Shareable`

#### `sharable[Symbol.for('Stream.shareProtocol')]`

* {Function} 返回一个 {Share} 的函数。

### 接口：`SyncShareable`

#### `sharable[Symbol.for('Stream.shareSyncProtocol')]`

* {Function} 返回一个 {SyncShare} 的函数。

### `shareSync(source[, options])`

<!-- YAML
added:
 - v25.9.0
 - v24.20.0
-->

* `source` {Iterable} 要共享的同步源。
* `options` {Object}
  * `budget` {number} 必须 >= 16384。
    **默认值：** `65536`。
  * `backpressure` {string} `'strict'`、`'drop-oldest'` 或 `'drop-newest'`。
    **默认值：** `'strict'`。
* 返回：{SyncShare}

[`share()`][] 的同步版本。

由于在同步上下文中无法等待，因此不支持 `'unbounded'`，并会抛出 `ERR_INVALID_ARG_VALUE`。使用 `'drop-newest'` 时，当消费者在预算耗尽的情况下到达缓冲区末尾，会从源中丢弃一个条目，然后返回 `{ done: true }`，且不带值；消费者不会被分离，因此在最慢的消费者前进并释放预算后，仍可继续读取。

### 类：`SyncShare`

#### 静态方法：`SyncShare.fromSync(input[, options])`

<!-- YAML
added:
 - v25.9.0
 - v24.20.0
-->

* `input` {Iterable|SyncShareable}
* `options` {Object}
* 返回：{SyncShare}

#### `share.cancel([reason])`

* `reason` {any}

取消共享。如果提供了 `reason`，所有消费者都会抛出该确切原因。如果省略该参数，消费者会正常完成。

#### `share.consumerCount`

* {number}

活动消费者的数量。

#### `share.pull([...transforms])`

* `...transforms` {Function|Object}
* 返回：{Iterable}，其块返回 {Uint8Array\[]}

创建共享源的新消费者。

#### `share[Symbol.dispose]()`

`share.cancel()` 的别名。

## 压缩和解压缩转换

用于 `pull()`、`pullSync()`、
`pipeTo()` 和 `pipeToSync()` 的压缩和解压缩转换可通过
[`node:zlib/iter`][] 模块获得。有关详细信息，请参阅
[`node:zlib/iter` 文档][`node:zlib/iter`]。

## 经典流互操作

这些工具函数在经典
[`stream.Readable`][]/[`stream.Writable`][] 流和 `stream/iter`
API 之间架起了桥梁。

`fromReadable()` 和 `fromWritable()` 都接受鸭子类型对象——它们
不要求输入直接扩展 `stream.Readable` 或 `stream.Writable`。
每个函数的最低契约如下所述。

### `fromReadable(readable)`

<!-- YAML
added:
 - v26.1.0
 - v24.20.0
-->

> 稳定性：1 - 实验性

* `readable` {stream.Readable|Object} 经典 Readable 流，或具有
  `read()`、`pipe()`、`destroy()`、`on()` 和 `removeListener()`
  方法的兼容对象。
* 返回：{AsyncIterable}，其块以 {Uint8Array\[]} 兑现

将经典 Readable 流（或鸭子类型的等效对象）转换为
stream/iter 异步可迭代源，可以传递给 [`from()`][]、
[`pull()`][]、[`text()`][] 等。

如果对象实现了 [`toAsyncStreamable`][] 协议（`stream.Readable` 即如此），
则会使用该协议。否则，该函数会通过鸭子类型检查 `read()`、`pipe()`、`destroy()`、`on()` 和 `removeListener()`
（EventEmitter）方法，并使用批处理异步迭代器包装流。

结果会按实例缓存——使用同一流调用 `fromReadable()` 两次
会返回相同的可迭代对象。

对于 object-mode 或已编码的 Readable 流，块会自动
规范化为 `Uint8Array`。

```mjs
import { Readable } from 'node:stream';
import { fromReadable, text } from 'node:stream/iter';

const readable = new Readable({
  read() { this.push('hello world'); this.push(null); },
});

const result = await text(fromReadable(readable));
console.log(result); // 'hello world'
```

```cjs
const { Readable } = require('node:stream');
const { fromReadable, text } = require('node:stream/iter');

const readable = new Readable({
  read() { this.push('hello world'); this.push(null); },
});

async function run() {
  const result = await text(fromReadable(readable));
  console.log(result); // 'hello world'
}
run();
```

### `fromWritable(writable[, options])`

<!-- YAML
added:
 - v26.1.0
 - v24.20.0
-->

> 稳定性：1 - 实验性

* `writable` {stream.Writable|Object} 经典 Writable 流，或具有
  `write()`、`end()`、`destroy()`、`on()` 和 `removeListener()`
  方法的兼容对象。
* `options` {Object}
  * `backpressure` {string} 背压策略。**默认值：** `'strict'`。
    * `'strict'` —— 缓冲区已满时，一次写入可能需要等待。在该写入被接受或取消之前，后续写入都会被拒绝。
    * `'unbounded'` —— 缓冲区已满时，写入会排队。建议与 [`pipeTo()`][] 一起使用。
    * `'drop-newest'` —— 缓冲区已满时，写入会被静默丢弃。
    * `'drop-oldest'` —— 不支持。会抛出 `ERR_INVALID_ARG_VALUE`。
* 返回：{Object} stream/iter Writer 适配器。

从经典 Writable 流（或
鸭子类型的等效对象）创建 stream/iter Writer 适配器。该适配器可以作为
目的地传递给 [`pipeTo()`][]。

由于经典 Writable 上的所有写入本质上都是异步的，
同步 Writer 方法（`writeSync`、`writevSync`、`endSync`）始终
返回 `false` 或 `-1`，并交由异步路径处理。排队的 `write()` 或
`writev()` 在到达经典 Writable 之前，可以通过其 `options.signal`
取消。

如果 `writer.fail(reason)` 接收到非 Error 类型的原因，经典 Writable 会以
`ERR_FALSY_VALUE_REJECTION` 或 `ERR_OPERATION_FAILED` 错误销毁。
其 `reason` 属性包含原始值，该值仍是 Writer 存储的失败原因。

结果会按实例和背压策略进行缓存——使用相同的流和 `backpressure` 选项两次调用
`fromWritable()` 会返回同一个 Writer。

对于不公开 `writableHighWaterMark`、
`writableLength` 或类似属性的鸭子类型流，
会使用合理的默认值。如果可检测到 Object 模式 writable，则会拒绝它，因为 Writer
接口仅支持字节。

```mjs
import { Writable } from 'node:stream';
import { from, fromWritable, pipeTo } from 'node:stream/iter';

const writable = new Writable({
  write(chunk, encoding, cb) { console.log(chunk.toString()); cb(); },
});

await pipeTo(from('hello world'),
             fromWritable(writable, { backpressure: 'unbounded' }));
```

```cjs
const { Writable } = require('node:stream');
const { from, fromWritable, pipeTo } = require('node:stream/iter');

async function run() {
  const writable = new Writable({
    write(chunk, encoding, cb) { console.log(chunk.toString()); cb(); },
  });

  await pipeTo(from('hello world'),
               fromWritable(writable, { backpressure: 'unbounded' }));
}
run().catch(console.error);
```

### `toReadable(source[, options])`

<!-- YAML
added:
 - v26.1.0
 - v24.20.0
-->

> 稳定性：1 - 实验性

* `source` {AsyncIterable}，其块必须以 {Uint8Array\[]} 形式完成，
  即 [`pull()`][] 或 [`from()`][] 的返回值。
* `options` {Object}
  * `highWaterMark` {number} 在应用背压之前内部缓冲区的大小（以字节为单位）。**默认值：** `65536` (64 KB)。
  * `signal` {AbortSignal} 用于中止 readable 的可选 signal。
* 返回：{stream.Readable}

从 `source` 创建字节模式的 [`stream.Readable`][]（使用
stream/iter API 的原生批处理格式）。生成的每个批次中的 `Uint8Array` 都会作为单独的块推送到 Readable 中。

经典流无法将任意值表示为发出的错误。非 Error 类型的原因会被包装为
`ERR_FALSY_VALUE_REJECTION` 或 `ERR_OPERATION_FAILED` 错误，其
`reason` 属性包含原始值。

```mjs
import { createWriteStream } from 'node:fs';
import { from, pull, toReadable } from 'node:stream/iter';
import { compressGzip } from 'node:zlib/iter';

const source = pull(from('hello world'), compressGzip());
const readable = toReadable(source);

readable.pipe(createWriteStream('output.gz'));
```

```cjs
const { createWriteStream } = require('node:fs');
const { from, pull, toReadable } = require('node:stream/iter');
const { compressGzip } = require('node:zlib/iter');

const source = pull(from('hello world'), compressGzip());
const readable = toReadable(source);

readable.pipe(createWriteStream('output.gz'));
```

### `toReadableSync(source[, options])`

<!-- YAML
added:
 - v26.1.0
 - v24.20.0
-->

> 稳定性：1 - 实验性

* `source` {Iterable}，其块必须返回 {Uint8Array\[]}，例如
  [`pullSync()`][] 或 [`fromSync()`][] 的返回值。
* `options` {Object}
  * `highWaterMark` {number} 在应用背压之前内部缓冲区的大小（以字节为单位）。**默认值：** `65536` (64 KB)。
* 返回：{stream.Readable}

从 `source` 创建字节模式的 [`stream.Readable`][]。
`_read()` 方法会同步从迭代器中提取数据，因此可以立即通过
`readable.read()` 获取数据。

```mjs
import { fromSync, toReadableSync } from 'node:stream/iter';

const source = fromSync('hello world');
const readable = toReadableSync(source);

console.log(readable.read().toString()); // 'hello world'
```

```cjs
const { fromSync, toReadableSync } = require('node:stream/iter');

const source = fromSync('hello world');
const readable = toReadableSync(source);

console.log(readable.read().toString()); // 'hello world'
```

### `toWritable(writer)`

<!-- YAML
added:
 - v26.1.0
 - v24.20.0
-->

> 稳定性：1 - 实验性

* `writer` {Object} 一个 stream/iter Writer。仅需要 `write()` 方法；`end()`、`fail()`、`writeSync()`、`writevSync()`、`endSync()`、
  和 `writev()` 是可选的。
* 返回：{stream.Writable}

创建由 stream/iter Writer 支持的经典 [`stream.Writable`][]。

每次 `_write()` / `_writev()` 调用都会先尝试 Writer 的同步方法
（`writeSync` / `writevSync`），如果同步路径返回 `false`，
则回退到异步方法。类似地，`_final()` 会先尝试 `endSync()`
再尝试 `end()`。当同步路径成功时，回调会通过
`queueMicrotask` 延迟，以保持异步解析约定。

经典流回调无法将任意值表示为错误。非 Error 类型的原因会被包装为
`ERR_FALSY_VALUE_REJECTION` 或 `ERR_OPERATION_FAILED` 错误，然后
传递给回调。该错误的 `reason` 属性包含原始值。

在成功完成之前销毁 Writable 会调用 `writer.fail()`。
如果 `fail()` 不可用，则在 Writer 实现了 `Symbol.dispose` 或
`Symbol.asyncDispose` 时使用相应方法。

Writable 使用经典流的默认 `highWaterMark`。
经典流背压会限制等待传递到底层 Writer 的写入数量，而 Writer 则控制活动的
`_write()` 或 `_writev()` 操作何时完成。

```mjs
import { push, toWritable } from 'node:stream/iter';

const { writer, readable } = push();
const writable = toWritable(writer);

writable.write('hello');
writable.end();
```

```cjs
const { push, toWritable } = require('node:stream/iter');

const { writer, readable } = push();
const writable = toWritable(writer);

writable.write('hello');
writable.end();
```

## 协议符号

这些众所周知的符号允许第三方对象参与流协议，而无需直接从 `node:stream/iter` 导入。

### `Stream.broadcastProtocol`

* 值：`Symbol.for('Stream.broadcastProtocol')`

该值必须是一个函数。当被 `Broadcast.from()` 调用时，它会接收传递给 `Broadcast.from()` 的选项，并且必须返回一个符合 {BroadcastChannel} 接口的对象。实现完全是自定义的——它可以随意管理消费者、缓冲和背压。

```mjs
import {
  broadcast as createBroadcast,
  Broadcast,
  text,
} from 'node:stream/iter';

// 此示例委托给内置的 Broadcast，但自定义
// 实现可以使用任何机制。
class MessageBus {
  #broadcast;
  #writer;

  constructor() {
    const { writer, broadcast } = createBroadcast();
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
const broadcast = Broadcast.from(bus);
const consumer = broadcast.push();
bus.send('hello');
bus.close();
console.log(await text(consumer)); // 'hello'
```

```cjs
const {
  broadcast: createBroadcast,
  Broadcast,
  text,
} = require('node:stream/iter');

// 此示例委托给内置的 Broadcast，但自定义
// 实现可以使用任何机制。
class MessageBus {
  #broadcast;
  #writer;

  constructor() {
    const { writer, broadcast } = createBroadcast();
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
const broadcast = Broadcast.from(bus);
const consumer = broadcast.push();
bus.send('hello');
bus.close();
text(consumer).then(console.log); // 'hello'
```

### `Stream.drainableProtocol`

* 值：`Symbol.for('Stream.drainableProtocol')`

实现该协议即可使写入器与 `ondrain()` 兼容。如果没有背压，该方法应返回 `null`；或者在背压解除时返回一个会以真值完成的 promise。

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

该值必须是一个函数。当被 `Share.from()` 调用时，它会接收传递给 `Share.from()` 的选项，并且必须返回一个符合 {Share} 接口的对象。实现完全是自定义的——它可以随意管理共享源、消费者、缓冲和背压。

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

该值必须是一个函数。当被 `SyncShare.fromSync()` 调用时，它会接收传递给 `SyncShare.fromSync()` 的选项，并且必须返回一个符合 {SyncShare} 接口的对象。实现完全是自定义的——它可以随意管理共享源、消费者和缓冲。

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

### 可流式传输对象

* 值：toWellFormed

该值必须是一个函数，用于将对象转换为可流式传输的值。
当对象传递给 `from()` 时，会调用此方法以生成
实际数据。它可以返回任何解析为字符串、`Uint8Array`、
`AsyncIterable`、`Iterable` 或其他可流式传输对象的值。

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

该值必须是一个函数，用于将对象同步转换为可流式传输的值。当对象传递给 `fromSync()` 时，会调用此方法以生成实际数据。它必须同步返回一个可流式传输的值：字符串、`Uint8Array` 或 `Iterable`。

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

[`--experimental-stream-iter`]: cli.md#--experimental-stream-iter
[`array()`]: #arraysource-options
[`arrayBuffer()`]: #arraybuffersource-options
[`bytes()`]: #bytessource-options
[`from()`]: #frominput
[`fromSync()`]: #fromsyncinput
[`node:zlib/iter`]: zlib.md#iterable-compression
[`ondrain()`]: #ondraindrainable
[`pipeTo()`]: #pipetosource-transforms-writer-options
[`pull()`]: #pullsource-transforms-options
[`pullSync()`]: #pullsyncsource-transforms
[`share()`]: #sharesource-options
[`stream.Readable`]: stream.md#class-streamreadable
[`stream.Writable`]: #class-streamwritable
[`tap()`]: #tapcallback
[`text()`]: #textsource-options
[`toAsyncStreamable`]: #streamtoasyncstreamable
