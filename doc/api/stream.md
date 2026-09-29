# 流

<!--introduced_in=v0.10.0-->

> 稳定性：2 - 稳定

<!-- source_link=lib/stream.js -->

流是 Node.js 中用于处理流式数据的抽象接口。
`node:stream` 模块提供了实现流接口的 API。

Node.js 提供了许多流对象。例如，[对 HTTP 服务器的请求][http-incoming-message] 和 [`process.stdout`][] 都是流实例。

流可以是可读的、可写的，或两者皆是。所有流都是 [`EventEmitter`][] 的实例。

要访问 `node:stream` 模块：

```js
const stream = require('node:stream');
```

`node:stream` 模块对于创建新类型的流实例很有用。通常不需要使用 `node:stream` 模块来消费流。

## 本文档的组织结构

本文档包含两个主要部分和一个备注部分。第一部分解释如何在应用程序中使用现有流。第二部分解释如何创建新类型的流。

## 流的类型

Node.js 内有四种基本流类型：

* [`Writable`][]：可以向其写入数据的流（例如，[`fs.createWriteStream()`][]）。
* [`Readable`][]：可以从中读取数据的流（例如，[`fs.createReadStream()`][]）。
* [`Duplex`][]：既是 `Readable` 又是 `Writable` 的流（例如，[`net.Socket`][]）。
* [`Transform`][]：可以在写入和读取数据时修改或转换数据的 `Duplex` 流（例如，[`zlib.createDeflate()`][]）。

此外，该模块还包括实用函数 [`stream.duplexPair()`][]、[`stream.pipeline()`][]、[`stream.finished()`][]、[`stream.Readable.from()`][] 和 [`stream.addAbortSignal()`][]。

### 流 Promise API

<!-- YAML
added: v15.0.0
-->

`stream/promises` API 提供了一组替代的流异步实用函数，它们返回 `Promise` 对象而不是使用回调。该 API 可通过 `require('node:stream/promises')` 或 `require('node:stream').promises` 访问。

### `stream.pipeline(streams[, options])`

### `stream.pipeline(source[, ...transforms], destination[, options])`

<!-- YAML
added: v15.0.0
changes:
  - version:
      - v19.7.0
      - v18.16.0
    pr-url: https://github.com/nodejs/node/pull/46307
    description: 添加对 Web 流的支持。
  - version:
      - v18.0.0
      - v17.2.0
      - v16.14.0
    pr-url: https://github.com/nodejs/node/pull/40886
    description: "添加 `end` 选项，可以将其设置为 `false` 以防止在源结束时自动关闭目标流。"
-->

* `streams` {Stream\[]|Iterable\[]|AsyncIterable\[]|Function\[]|
  ReadableStream\[]|WritableStream\[]|TransformStream\[]}
* `source` {Stream|Iterable|AsyncIterable|Function|ReadableStream}
  * 返回：{Promise|AsyncIterable}
* `...transforms` {Stream|Function|TransformStream}
  * `source` {AsyncIterable}
  * 返回：{Promise|AsyncIterable}
* `destination` {Stream|Function|WritableStream}
  * `source` {AsyncIterable}
  * 返回：{Promise|AsyncIterable}
* `options` {Object} 管道选项
  * `signal` {AbortSignal}
  * `end` {boolean} 当源流结束时结束目标流。
    转换流总是会结束，即使此值为 `false`。
    **默认值：** `true`。
* 返回：{Promise} 当管道完成时履行。

```cjs
const { pipeline } = require('node:stream/promises');
const fs = require('node:fs');
const zlib = require('node:zlib');

async function run() {
  await pipeline(
    fs.createReadStream('archive.tar'),
    zlib.createGzip(),
    fs.createWriteStream('archive.tar.gz'),
  );
  console.log('管道成功。');
}

run().catch(console.error);
```

```mjs
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';

await pipeline(
  createReadStream('archive.tar'),
  createGzip(),
  createWriteStream('archive.tar.gz'),
);
console.log('管道成功。');
```

要使用 `AbortSignal`，将其作为最后一个参数传递给选项对象。
当信号被中止时，底层管道将被调用 `destroy`，并带有 `AbortError`。

```cjs
const { pipeline } = require('node:stream/promises');
const fs = require('node:fs');
const zlib = require('node:zlib');

async function run() {
  const ac = new AbortController();
  const signal = ac.signal;

  setImmediate(() => ac.abort());
  await pipeline(
    fs.createReadStream('archive.tar'),
    zlib.createGzip(),
    fs.createWriteStream('archive.tar.gz'),
    { signal },
  );
}

run().catch(console.error); // AbortError
```

```mjs
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';

const ac = new AbortController();
const { signal } = ac;
setImmediate(() => ac.abort());
try {
  await pipeline(
    createReadStream('archive.tar'),
    createGzip(),
    createWriteStream('archive.tar.gz'),
    { signal },
  );
} catch (err) {
  console.error(err); // AbortError
}
```

`pipeline` API 也支持异步生成器：

```cjs
const { pipeline } = require('node:stream/promises');
const fs = require('node:fs');

async function run() {
  await pipeline(
    fs.createReadStream('lowercase.txt'),
    async function* (source, { signal }) {
      source.setEncoding('utf8');  // 使用字符串而不是 `Buffer`。
      for await (const chunk of source) {
        yield await processChunk(chunk, { signal });
      }
    },
    fs.createWriteStream('uppercase.txt'),
  );
  console.log('管道成功。');
}

run().catch(console.error);
```

```mjs
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';

await pipeline(
  createReadStream('lowercase.txt'),
  async function* (source, { signal }) {
    source.setEncoding('utf8');  // 使用字符串而不是 `Buffer`。
    for await (const chunk of source) {
      yield await processChunk(chunk, { signal });
    }
  },
  createWriteStream('uppercase.txt'),
);
console.log('管道成功。');
```

记得处理传递给异步生成器的 `signal` 参数。
特别是在异步生成器是管道的源（即第一个参数）的情况下，否则管道将永远不会完成。

```cjs
const { pipeline } = require('node:stream/promises');
const fs = require('node:fs');

async function run() {
  await pipeline(
    async function* ({ signal }) {
      await someLongRunningfn({ signal });
      yield 'asd';
    },
    fs.createWriteStream('uppercase.txt'),
  );
  console.log('管道成功。');
}

run().catch(console.error);
```

```mjs
import { pipeline } from 'node:stream/promises';
import fs from 'node:fs';
await pipeline(
  async function* ({ signal }) {
    await someLongRunningfn({ signal });
    yield 'asd';
  },
  fs.createWriteStream('uppercase.txt'),
);
console.log('管道成功。');
```

`pipeline` API 提供了 [回调版本][stream-pipeline]：

### `stream.finished(stream[, options])`

<!-- YAML
added: v15.0.0
changes:
  - version:
    - v19.5.0
    - v18.14.0
    pr-url: https://github.com/nodejs/node/pull/46205
    description: "添加对 `ReadableStream` 和 `WritableStream` 的支持。"
  - version:
    - v19.1.0
    - v18.13.0
    pr-url: https://github.com/nodejs/node/pull/44862
    description: "添加了 `cleanup` 选项。"
-->

* `stream` {Stream|ReadableStream|WritableStream} 可读和/或可写流/webstream。
* `options` {Object}
  * `error` {boolean|undefined}
  * `readable` {boolean|undefined}
  * `writable` {boolean|undefined}
  * `signal` {AbortSignal|undefined}
  * `cleanup` {boolean|undefined} 如果为 `true`，则在 promise 履行之前移除此函数注册的监听器。**默认值：** `false`。
* 返回：{Promise} 当流不再可读或可写时履行。

```cjs
const { finished } = require('node:stream/promises');
const fs = require('node:fs');

const rs = fs.createReadStream('archive.tar');

async function run() {
  await finished(rs);
  console.log('流已完成读取。');
}

run().catch(console.error);
rs.resume(); // 排空流。
```

```mjs
import { finished } from 'node:stream/promises';
import { createReadStream } from 'node:fs';

const rs = createReadStream('archive.tar');

async function run() {
  await finished(rs);
  console.log('流已完成读取。');
}

run().catch(console.error);
rs.resume(); // 排空流。
```

`finished` API 还提供了 [回调版本][stream-finished]。

`stream.finished()` 在返回的 promise 被履行或拒绝后，会留下悬空的事件监听器（特别是 `'error'`、`'end'`、`'finish'` 和 `'close'`）。
这样做的原因是，意外的 `'error'` 事件（由于不正确的流实现）不会导致意外的崩溃。
如果这是不需要的行为，则应将 `options.cleanup` 设置为 `true`：

```mjs
await finished(rs, { cleanup: true });
```

### 对象模式

由 Node.js API 创建的所有流仅对字符串、{Buffer}、{TypedArray} 和 {DataView} 对象进行操作：

* `Strings` 和 `Buffers` 是与流一起使用的最常见类型。
* `TypedArray` 和 `DataView` 允许你使用 `Int32Array` 或 `Uint8Array` 等类型处理二进制数据。当你将 TypedArray 或 DataView 写入流时，Node.js 会处理原始字节。

然而，流实现有可能与其他类型的 JavaScript 值一起工作（`null` 除外，它在流中有特殊用途）。
此类流被认为是在“对象模式”下操作。

流实例在创建时使用 `objectMode` 选项切换到对象模式。尝试将现有流切换到对象模式是不安全的。

### 缓冲

<!--type=misc-->

[`Writable`][] 和 [`Readable`][] 流都会将数据存储在一个内部缓冲区中。

潜在缓冲的数据量取决于传递给流构造函数的 `highWaterMark` 选项。对于普通流，`highWaterMark` 选项指定 [字节总数][hwm-gotcha]。对于以对象模式操作的流，`highWaterMark` 指定对象总数。对于操作字符串（但不解码）的流，`highWaterMark` 指定 UTF-16 代码单元总数。

当实现调用 [`stream.push(chunk)`][stream-push] 时，数据会在 `Readable` 流中缓冲。如果流的消费者不调用 [`stream.read()`][stream-read]，数据将停留在内部队列中直到被消费。

一旦内部读取缓冲区的总大小达到 `highWaterMark` 指定的阈值，流将暂时停止从底层资源读取数据，直到当前缓冲的数据可以被消费（即，流将停止调用用于填充读取缓冲区的内部 [`readable._read()`][] 方法）。

当反复调用 [`writable.write(chunk)`][stream-write] 方法时，数据会在 `Writable` 流中缓冲。当内部写入缓冲区的总大小低于 `highWaterMark` 设置的阈值时，对 `writable.write()` 的调用将返回 `true`。一旦内部缓冲区的大小达到或超过 `highWaterMark`，将返回 `false`。

`stream` API 的一个关键目标，特别是 [`stream.pipe()`][] 方法，是将数据缓冲限制在可接受的水平，以便不同速度的源和目标不会压倒可用内存。

`highWaterMark` 选项是一个阈值，而不是限制：它规定了流在停止请求更多数据之前缓冲的数据量。它通常不强制执行严格的内存限制。特定的流实现可以选择执行更严格的限制，但这是可选的。

因为 [`Duplex`][] 和 [`Transform`][] 流既是 `Readable` 又是 `Writable`，所以它们各自维护 _两个_ 独立的内部缓冲区用于读取和写入，允许每一侧独立操作，同时保持适当且高效的数据流。例如，[`net.Socket`][] 实例是 [`Duplex`][] 流，其 `Readable` 侧允许消费 _从_ 套接字接收的数据，而其 `Writable` 侧允许写入数据 _到_ 套接字。因为写入套接字的数据速率可能比接收数据的速率快或慢，所以每一侧都应独立操作（和缓冲）。

内部缓冲的机制是内部实现细节，可能随时更改。但是，对于某些高级实现，可以使用 `writable.writableBuffer` 或 `readable.readableBuffer` 检索内部缓冲区。不鼓励使用这些未记录的属性。

## 流消费者的 API

<!--type=misc-->

几乎所有的 Node.js 应用程序，无论多么简单，都会以某种方式使用流。以下是在实现 HTTP 服务器的 Node.js 应用程序中使用流的示例：

```js
const http = require('node:http');

const server = http.createServer((req, res) => {
  // `req` 是一个 http.IncomingMessage，它是一个可读流。
  // `res` 是一个 http.ServerResponse，它是一个可写流。

  let body = '';
  // 将数据获取为 utf8 字符串。
  // 如果未设置编码，将接收到 Buffer 对象。
  req.setEncoding('utf8');

  // 可读流一旦添加了监听器就会发出 'data' 事件。
  req.on('data', (chunk) => {
    body += chunk;
  });

  // 'end' 事件表示整个 body 已接收完毕。
  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      // 向用户写回一些有趣的内容：
      res.write(typeof data);
      res.end();
    } catch (er) {
      //  哎呀！JSON 错误！
      res.statusCode = 400;
      return res.end(`error: ${er.message}`);
    }
  });
});

server.listen(1337);

// $ curl localhost:1337 -d "{}"
// object
// $ curl localhost:1337 -d "\"foo\""
// string
// $ curl localhost:1337 -d "not json"
// error: Unexpected token 'o', "not json" is not valid JSON
```

[可读流][] 流（例如示例中的 [Readable][]）暴露了 [push][] 和 [unshift][] 等方法，用于将数据写入流。

[流][] 流使用 [EventEmitter][] API 在数据可供从流中读取时通知应用程序代码。可以通过多种方式从流中读取可用数据。

[可读流][] 和 [可写流][] 流都以各种方式使用 [EventEmitter][] API 来通信流的当前状态。

[双工流][] 和 [转换流][] 流既是 [可读流][] 也是 [可写流][]。

向流写入数据或从流消费数据的应用程序不需要直接实现流接口，并且通常没有理由调用 _write()。

希望实现新类型流的开发者应参考 [流实现者 API][] 部分。

### 可写流

可写流是对数据写入_目的地_的抽象。

[可写流][] 流的示例包括：

* [HTTP 请求，在客户端][]
* [HTTP 响应，在服务器端][]
* [fs 写入流][]
* [zlib 流][zlib]
* [crypto 流][crypto]
* [TCP 套接字][]
* [子进程 stdin][]
* [文件系统][fs]，[文件描述符][]

其中一些示例实际上是实现了 [stream.Writable][] 接口的 [流][] 流。

所有 [Writable][] 流都实现了 [stream.Writable][] 类定义的接口。

虽然 [Writable][] 流的具体实例可能在各方面有所不同，但所有 [Writable][] 流都遵循与以下示例中说明相同的基本使用模式：

```js
const myStream = getWritableStreamSomehow();
myStream.write('some data');
myStream.write('some more data');
myStream.end('done writing data');
```

#### 类：`stream.Writable`

<!-- YAML
added: v0.9.4
-->

<!--type=class-->

##### 事件：`'close'`

<!-- YAML
added: v0.9.4
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18438
    description: "添加 `emitClose` 选项以指定在销毁时是否发出 `'close'` 事件。"
-->

当流及其任何底层资源（例如文件描述符）已关闭时，会发出 `'close'` 事件。该事件表示将不再发出更多事件，也不会发生进一步的计算。

如果使用 `emitClose` 选项创建 [`Writable`][] 流，它将始终发出 `'close'` 事件。

##### 事件：`'drain'`

<!-- YAML
added: v0.9.4
-->

如果对 [`stream.write(chunk)`][stream-write] 的调用返回 `false`，则当适合恢复向流写入数据时，将发出 `'drain'` 事件。

```js
// 向提供的可写流写入数据一百万次。
// 注意背压。
function writeOneMillionTimes(writer, data, encoding, callback) {
  let i = 1000000;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 0) {
        // 最后一次！
        writer.write(data, encoding, callback);
      } else {
        // 看看我们是应该继续，还是等待。
        // 不要传递回调，因为我们还没完成。
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // 不得不提前停止！
      // 一旦排空，再写入一些。
      writer.once('drain', write);
    }
  }
}
```

##### 事件：`'error'`

<!-- YAML
added: v0.9.4
-->

* 类型：{Error}

如果在写入或通过管道传输数据时发生错误，则会发出 `'error'` 事件。调用监听器回调时会传递单个 `Error` 参数。

除非在创建流时将 [`autoDestroy`][writable-new] 选项设置为 `false`，否则在发出 `'error'` 事件时流会关闭。

在 `'error'` 之后，_应该_ 不再发出除 `'close'` 之外的其他事件（包括 `'error'` 事件）。

##### 事件：`'finish'`

<!-- YAML
added: v0.9.4
-->

在调用 [`stream.end()`][stream-end] 方法且所有数据已刷新到底层系统后，会发出 `'finish'` 事件。

```js
const writer = getWritableStreamSomehow();
for (let i = 0; i < 100; i++) {
  writer.write(`hello, #${i}!\n`);
}
writer.on('finish', () => {
  console.log('所有写入现已完成。');
});
writer.end('This is the end\n');
```

##### 事件：`'pipe'`

<!-- YAML
added: v0.9.4
-->

* `src` {stream.Readable} 管道传输到此可写流的源流

当在可读流上调用 [`stream.pipe()`][] 方法并将此可写流添加到其目的地集合时，会发出 `'pipe'` 事件。

```js
const writer = getWritableStreamSomehow();
const reader = getReadableStreamSomehow();
writer.on('pipe', (src) => {
  console.log('Something is piping into the writer.');
  assert.equal(src, reader);
});
reader.pipe(writer);
```

##### 事件：`'unpipe'`

<!-- YAML
added: v0.9.4
-->

* `src` {stream.Readable} [取消管道][`stream.unpipe()`] 到此可写流的源流

当在 [`Readable`][] 流上调用 [`stream.unpipe()`][] 方法并将此 [`Writable`][] 从其目的地集合中移除时，会发出 `'unpipe'` 事件。

如果此 [`Writable`][] 流在有 [`Readable`][] 流管道传输到它时发出错误，也会发出此事件。

```js
const writer = getWritableStreamSomehow();
const reader = getReadableStreamSomehow();
writer.on('unpipe', (src) => {
  console.log('Something has stopped piping into the writer.');
  assert.equal(src, reader);
});
reader.pipe(writer);
reader.unpipe(writer);
```

##### `writable.cork()`

<!-- YAML
added: v0.11.2
-->

`writable.cork()` 方法强制将所有写入的数据缓冲在内存中。当调用 [`stream.uncork()`][] 或 [`stream.end()`][stream-end] 方法时，缓冲的数据将被刷新。

`writable.cork()` 的主要目的是适应这种情况：多个小块数据连续快速地写入流。`writable.cork()` 不会立即将它们转发到底层目的地，而是缓冲所有块，直到调用 `writable.uncork()`，如果存在，这将把它们全部传递给 `writable._writev()`。这防止了头阻塞情况，即数据在等待第一个小块被处理时被缓冲。但是，如果不实现 `writable._writev()` 而使用 `writable.cork()` 可能会对吞吐量产生不利影响。

另见：[`writable.uncork()`][]，[`writable._writev()`][stream-_writev]。

##### `writable.destroy([error])`

<!-- YAML
added: v8.0.0
changes:
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/29197
    description: 在已销毁的流上作为无操作运行。
-->

* `error` {Error} 可选，一个要与 `'error'` 事件一起发出的错误。
* 返回：{this}

销毁流。可选地发出 `'error'` 事件，并发出 `'close'` 事件（除非 `emitClose` 设置为 `false`）。在此调用之后，可写流已结束，后续调用 `write()` 或 `end()` 将导致 `ERR_STREAM_DESTROYED` 错误。
这是一种破坏性的且立即销毁流的方式。之前的 `write()` 调用可能尚未排空，并可能触发 `ERR_STREAM_DESTROYED` 错误。如果数据应在关闭前刷新，请使用 `end()` 而不是 destroy，或者在销毁流之前等待 `'drain'` 事件。

```cjs
const { Writable } = require('node:stream');

const myStream = new Writable();

const fooErr = new Error('foo error');
myStream.destroy(fooErr);
myStream.on('error', (fooErr) => console.error(fooErr.message)); // foo error
```

```cjs
const { Writable } = require('node:stream');

const myStream = new Writable();

myStream.destroy();
myStream.on('error', function wontHappen() {});
```

```cjs
const { Writable } = require('node:stream');

const myStream = new Writable();
myStream.destroy();

myStream.write('foo', (error) => console.error(error.code));
// ERR_STREAM_DESTROYED
```

一旦调用了 `destroy()`，任何进一步的调用都将是无操作，并且除了来自 `_destroy()` 的错误外，不会再作为 `'error'` 发出其他错误。

实现者不应覆盖此方法，而应实现 [`writable._destroy()`][writable-_destroy]。

##### `writable.closed`

<!-- YAML
added: v18.0.0
-->

* 类型：{boolean}

在发出 `'close'` 事件后为 `true`。

##### `writable.destroyed`

<!-- YAML
added: v8.0.0
-->

* 类型：{boolean}

在调用 [`writable.destroy()`][writable-destroy] 后为 `true`。

```cjs
const { Writable } = require('node:stream');

const myStream = new Writable();

console.log(myStream.destroyed); // false
myStream.destroy();
console.log(myStream.destroyed); // true
```

##### `writable.end([chunk[, encoding]][, callback])`

<!-- YAML
added: v0.9.4
changes:
  - version:
    - v22.0.0
    - v20.13.0
    pr-url: https://github.com/nodejs/node/pull/51866
    description: "`chunk` 参数现在可以是 `TypedArray` 或 `DataView` 实例。"
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/34101
    description: 回调在 'finish' 之前或出错时调用。
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/29747
    description: 如果发出 'finish' 或 'error'，则调用回调。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18780
    description: "此方法现在返回对 `writable` 的引用。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/11608
    description: "`chunk` 参数现在可以是 `Uint8Array` 实例。"
-->

* `chunk` {string|Buffer|TypedArray|DataView|any} 可选的要写入的数据。对于不在对象模式下运行的流，`chunk` 必须是 {string}、{Buffer}、{TypedArray} 或 {DataView}。对于对象模式流，`chunk` 可以是除 `null` 之外的任何 JavaScript 值。
* `encoding` {string} 如果 `chunk` 是字符串，则为编码
* `callback` {Function} 流完成时的回调。
* 返回：{this}

调用 `writable.end()` 方法表示不再有数据写入 [`Writable`][]。可选的 `chunk` 和 `encoding` 参数允许在关闭流之前立即写入最后一个额外的数据块。

在调用 [`stream.end()`][stream-end] 后调用 [`stream.write()`][stream-write] 方法将引发错误。

```js
// 写入 'hello, ' 然后以 'world!' 结束。
const fs = require('node:fs');
const file = fs.createWriteStream('example.txt');
file.write('hello, ');
file.end('world!');
// 现在不允许再写入！
```

##### `writable.setDefaultEncoding(encoding)`

<!-- YAML
added: v0.11.15
changes:
  - version: v6.1.0
    pr-url: https://github.com/nodejs/node/pull/5040
    description: "此方法现在返回对 `writable` 的引用。"
-->

* `encoding` {string} 新的默认编码
* 返回：{this}

`writable.setDefaultEncoding()` 方法为 [`Writable`][] 流设置默认 `encoding`。

##### `writable.uncork()`

<!-- YAML
added: v0.11.2
-->

`writable.uncork()` 方法刷新自调用 [`stream.cork()`][] 以来缓冲的所有数据。

当使用 [`writable.cork()`][] 和 `writable.uncork()` 管理流写入的缓冲时，请使用 `process.nextTick()` 延迟调用 `writable.uncork()`。这样做允许批处理在给定 Node.js 事件循环阶段内发生的所有 `writable.write()` 调用。

```js
stream.cork();
stream.write('some ');
stream.write('data ');
process.nextTick(() => stream.uncork());
```

如果在流上多次调用 [`writable.cork()`][] 方法，则必须调用相同次数的 `writable.uncork()` 来刷新缓冲的数据。

```js
stream.cork();
stream.write('some ');
stream.cork();
stream.write('data ');
process.nextTick(() => {
  stream.uncork();
  // 直到第二次调用 uncork() 数据才会被刷新。
  stream.uncork();
});
```

另见：[`writable.cork()`][]。

##### `writable.writable`

<!-- YAML
added: v11.4.0
-->

* 类型：{boolean}

如果安全调用 [`writable.write()`][stream-write] 则为 `true`，这意味着流未被销毁、出错或结束。

##### `writable.writableAborted`

<!-- YAML
added:
  - v18.0.0
  - v16.17.0
changes:
 - version:
    - v24.0.0
    - v22.17.0
   pr-url: https://github.com/nodejs/node/pull/57513
   description: 将 API 标记为稳定。
-->

* 类型：{boolean}

返回流是否在发出 `'finish'` 之前被销毁或出错。

##### `writable.writableEnded`

<!-- YAML
added: v12.9.0
-->

* 类型：{boolean}

在调用 [`writable.end()`][] 后为 `true`。此属性不指示数据是否已刷新，为此请使用 [`writable.writableFinished`][]。

##### `writable.writableCorked`

<!-- YAML
added:
 - v13.2.0
 - v12.16.0
-->

* 类型：{integer}

需要调用 [`writable.uncork()`][stream-uncork] 的次数才能完全打开流。

##### `writable.errored`

<!-- YAML
added:
  v18.0.0
-->

* 类型：{Error}

如果流已因错误被销毁，则返回错误。

##### `writable.writableFinished`

<!-- YAML
added: v12.6.0
-->

* 类型：{boolean}

在 [`'finish'`][] 事件发出之前立即设置为 `true`。

##### `writable.writableHighWaterMark`

<!-- YAML
added: v9.3.0
-->

* 类型：{number}

返回创建此 `Writable` 时传递的 `highWaterMark` 值。

##### `writable.writableLength`

<!-- YAML
added: v9.4.0
-->

* 类型：{number}

此属性包含队列中准备写入的字节数（或对象数）。该值提供有关 `highWaterMark` 状态的内省数据。

##### `writable.writableNeedDrain`

<!-- YAML
added:
  - v15.2.0
  - v14.17.0
-->

* 类型：{boolean}

如果流的缓冲区已满且流将发出 `'drain'`，则为 `true`。

##### `writable.writableObjectMode`

<!-- YAML
added: v12.3.0
-->

* 类型：{boolean}

给定 `Writable` 流的 `objectMode` 属性的 getter。

##### `writable[Symbol.asyncDispose]()`

<!-- YAML
added:
- v22.4.0
- v20.16.0
changes:
 - version: v24.2.0
   pr-url: https://github.com/nodejs/node/pull/58467
   description: 不再是实验性的。
-->

使用 `AbortError` 调用 [`writable.destroy()`][writable-destroy]，并返回一个在流完成时兑现的 promise。

##### `writable.write(chunk[, encoding][, callback])`

<!-- YAML
added: v0.9.4
changes:
  - version:
    - v22.0.0
    - v20.13.0
    pr-url: https://github.com/nodejs/node/pull/51866
    description: "`chunk` 参数现在可以是 `TypedArray` 或 `DataView` 实例。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/11608
    description: "`chunk` 参数现在可以是 `Uint8Array` 实例。"
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/6170
    description: 现在，即使在对象模式下，将 `null` 作为 `chunk` 参数传递也始终会被视为无效。
-->

* `chunk` {string|Buffer|TypedArray|DataView|any} 要写入的可选数据。对于不在对象模式下运行的流，`chunk` 必须是 {string}、{Buffer}、{TypedArray} 或 {DataView}。对于对象模式流，`chunk` 可以是除 `null` 之外的任何 JavaScript 值。
* `encoding` {string|null} 如果 `chunk` 是字符串，则为编码。**默认值：** `'utf8'`
* `callback` {Function} 此数据块刷新时的回调。
* 返回：{boolean} 如果流希望调用代码等待发出 `'drain'` 事件后再继续写入其他数据，则为 `false`；否则为 `true`。

`writable.write()` 方法向流写入一些数据，并在数据被完全处理后调用提供的 `callback`。如果发生错误，`callback` 将以该错误作为第一个参数被调用。`callback` 会异步调用，并且在发出 `'error'` 之前调用。

如果接纳 `chunk` 后，内部缓冲区小于创建流时配置的 `highWaterMark`，则返回值为 `true`。如果返回 `false`，则应停止进一步尝试向流写入数据，直到发出 [`'drain'`][] 事件。

当流没有排空时，对 `write()` 的调用会缓冲 `chunk`，并返回 `false`。一旦所有当前缓冲的数据块都排空（被操作系统接受以供传递），就会发出 `'drain'` 事件。`write()` 一旦返回 `false`，在发出 `'drain'` 事件之前不要再写入更多数据块。虽然允许对未排空的流调用 `write()`，但 Node.js 会缓冲所有写入的数据块，直到达到最大内存使用量，此时它会无条件中止。即使在中止之前，高内存使用量也会导致垃圾回收器性能变差并使 RSS 升高（即使不再需要这些内存，通常也不会将它们释放回系统）。由于远程对等端不读取数据时，TCP 套接字可能永远不会排空，因此向未排空的套接字写入数据可能会导致可被远程利用的漏洞。

当流没有排空时写入数据，对于 [`Transform`][] 尤其成问题，因为 `Transform` 流默认处于暂停状态，直到它们被管道连接，或添加了 `'data'` 或 `'readable'` 事件处理程序。

如果要写入的数据可以按需生成或获取，建议将逻辑封装到 [`Readable`][] 中并使用 [`stream.pipe()`][]。不过，如果更倾向于调用 `write()`，则可以使用 [`'drain'`][] 事件来遵守背压并避免内存问题：

```js
function write(data, cb) {
  if (!stream.write(data)) {
    stream.once('drain', cb);
  } else {
    process.nextTick(cb);
  }
}

// 等待调用 cb 后再进行其他写入。
write('hello', () => {
  console.log('Write completed, do more writes now.');
});
```

对象模式下的 `Writable` 流将始终忽略 `encoding` 参数。

### 可读流

可读流是数据被消费的 _来源_ 的抽象。

`Readable` 流的示例包括：

* [HTTP 响应（客户端）][http-incoming-message]
* [HTTP 请求（服务器）][http-incoming-message]
* [fs 读取流][]
* [zlib 流][zlib]
* [crypto 流][crypto]
* [TCP 套接字][]
* [子进程的 stdout 和 stderr][]
* [`process.stdin`][]

所有 [`Readable`][] 流都实现了 `stream.Readable` 类定义的接口。

#### 两种读取模式

`Readable` 流实际上以两种模式之一运行：流动模式和暂停模式。这些模式与[对象模式][object-mode]相互独立。无论处于流动模式还是暂停模式，[`Readable`][] 流都可以处于对象模式或非对象模式。

* 在流动模式下，数据会自动从底层系统读取，并通过 [`EventEmitter`][] 接口使用事件尽可能快地提供给应用程序。

* 在暂停模式下，必须显式调用 [`stream.read()`][stream-read] 方法以从流中读取数据块。

所有 [`Readable`][] 流最初都处于暂停模式，但可以通过以下方式之一切换到流动模式：

* 添加 [`'data'`][] 事件处理程序。
* 调用 [`stream.resume()`][stream-resume] 方法。
* 调用 [`stream.pipe()`][] 方法将数据发送到 [`Writable`][]。

`Readable` 可以通过以下方式之一切换回暂停模式：

* 如果没有管道目标，则调用 [`stream.pause()`][stream-pause] 方法。
* 如果存在管道目标，则移除所有管道目标。可以通过调用 [`stream.unpipe()`][] 方法移除多个管道目标。

需要记住的重要概念是，除非提供了消费或忽略数据的机制，否则 `Readable` 不会生成数据。如果消费机制被禁用或移除，`Readable` 将 _尝试_ 停止生成数据。

出于向后兼容的原因，移除 [`'data'`][] 事件处理程序**不会**自动暂停流。此外，如果存在管道连接的目标，那么调用 [`stream.pause()`][stream-pause] 并不能保证流在这些目标排空并请求更多数据后仍会_保持_暂停状态。

如果将 [`Readable`][] 切换到流动模式，却没有可处理数据的消费者，则数据将会丢失。例如，在没有监听器附加到 `'data'` 事件时调用 `readable.resume()` 方法，或者从流中移除 `'data'` 事件处理程序时，就可能发生这种情况。

添加 [`'readable'`][] 事件处理程序会自动使流停止流动，数据必须通过 [`readable.read()`][stream-read] 来消费。如果移除了 [`'readable'`][] 事件处理程序，并且存在 [`'data'`][] 事件处理程序，那么流将再次开始流动。

#### 三种状态

`Readable` 流的“两种模式”是一种简化的抽象，用于描述 `Readable` 流实现中更复杂的内部状态管理。

具体而言，在任意给定时刻，每个 `Readable` 都处于以下三种可能状态之一：

* `readable.readableFlowing === null`
* `readable.readableFlowing === false`
* `readable.readableFlowing === true`

当 `readable.readableFlowing` 为 `null` 时，没有提供消费流数据的机制。因此，流不会生成数据。在此状态下，附加 `'data'` 事件的监听器、调用 `readable.pipe()` 方法或调用 `readable.resume()` 方法，都会将 `readable.readableFlowing` 切换为 `true`，使 `Readable` 在生成数据时开始主动发出事件。

调用 `readable.pause()`、`readable.unpipe()` 或接收到背压会使 `readable.readableFlowing` 设置为 `false`，从而暂时停止事件流动，但_不会_停止数据生成。在此状态下，附加 `'data'` 事件的监听器不会将 `readable.readableFlowing` 切换为 `true`。

```js
const { PassThrough, Writable } = require('node:stream');
const pass = new PassThrough();
const writable = new Writable();

pass.pipe(writable);
pass.unpipe(writable);
// readableFlowing 现在为 false。

pass.on('data', (chunk) => { console.log(chunk.toString()); });
// readableFlowing 仍为 false。
pass.write('ok');  // 不会发出 'data'。
pass.resume();     // 必须调用此方法才能使流发出 'data'。
 // readableFlowing 现在为 true。
```

当 `readable.readableFlowing` 为 `false` 时，数据可能正在流的内部缓冲区中累积。

#### 选择一种 API 风格

`Readable` 流 API 在多个 Node.js 版本中不断演进，并提供了多种消费流数据的方法。一般来说，开发者应选择_一种_数据消费方法，且_绝不要_对单个流使用多种数据消费方法。具体而言，组合使用 `on('data')`、`on('readable')`、`pipe()` 或异步迭代器可能会导致难以直观理解的行为。

#### 类：`stream.Readable`

<!-- YAML
added: v0.9.4
-->

<!--type=class-->

##### 事件：`'close'`

<!-- YAML
added: v0.9.4
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18438
    description: 添加 `emitClose` 选项，以指定销毁时是否发出 `'close'`。
-->

当流及其任何底层资源（例如文件描述符）关闭时，会发出 `'close'` 事件。该事件表示不会再发出任何事件，也不会再进行任何计算。

如果使用 `emitClose` 选项创建 [`Readable`][] 流，则它始终会发出 `'close'` 事件。

##### 事件：`'data'`

<!-- YAML
added: v0.9.4
-->

* `chunk` {Buffer|string|any} 数据块。对于不在对象模式下运行的流，数据块将是字符串或 `Buffer`。对于处于对象模式下的流，数据块可以是除 `null` 之外的任何 JavaScript 值。

每当流将数据块的所有权交给消费者时，就会发出 `'data'` 事件。当通过调用 `readable.pipe()`、`readable.resume()` 或为 `'data'` 事件附加监听器回调，将流切换到流动模式时，都可能发生这种情况。每当调用 `readable.read()` 方法且有数据块可供返回时，也会发出 `'data'` 事件。

为未显式暂停的流附加 `'data'` 事件监听器会将流切换到流动模式。数据一旦可用，就会传递出去。

如果使用 `readable.setEncoding()` 方法为流指定了默认编码，监听器回调接收到的数据块将是字符串；否则数据将以 `Buffer` 形式传递。

```js
const readable = getReadableStreamSomehow();
readable.on('data', (chunk) => {
  console.log(`收到 ${chunk.length} 字节数据。`);
});
```

##### 事件：`'end'`

<!-- YAML
added: v0.9.4
-->

当流中没有更多数据可供消费时，会发出 `'end'` 事件。

除非数据已被完全消耗，否则不会触发 `'end'` 事件。可以通过将流切换到流动模式，或反复调用 [`stream.read()`][stream-read] 直到所有数据都被消耗来实现这一点。

```js
const readable = getReadableStreamSomehow();
readable.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes of data.`);
});
readable.on('end', () => {
  console.log('There will be no more data.');
});
```

##### 事件：`'error'`

<!-- YAML
added: v0.9.4
-->

* 类型：{Error}

`Readable` 实现可能随时触发 `'error'` 事件。通常，当底层流因内部故障而无法生成数据，或流实现尝试推送无效数据块时，可能会发生这种情况。

传递给监听器回调的参数是一个 `Error` 对象。

##### 事件：`'pause'`

<!-- YAML
added: v0.9.4
-->

调用 [`stream.pause()`][stream-pause] 且 `readableFlowing` 不为 `false` 时，会触发 `'pause'` 事件。

##### 事件：`'readable'`

<!-- YAML
added: v0.9.4
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/17979
    description: The `'readable'` is always emitted in the next tick after
                 `.push()` is called.
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18994
    description: Using `'readable'` requires calling `.read()`.
-->

当流中有数据可供读取时，会触发 `'readable'` 事件，最多读取到配置的高水位标记（`state.highWaterMark`）。实际上，它表示缓冲区中有新的流信息。如果缓冲区中有数据，可以调用 [`stream.read()`][stream-read] 来获取这些数据。此外，到达流末尾时也可能触发 `'readable'` 事件。

```js
const readable = getReadableStreamSomehow();
readable.on('readable', function() {
  // There is some data to read now.
  let data;

  while ((data = this.read()) !== null) {
    console.log(data);
  }
});
```

如果已到达流末尾，调用 [`stream.read()`][stream-read] 将返回 `null` 并触发 `'end'` 事件。即使从未有过可读取的数据，也同样如此。例如，在以下示例中，`foo.txt` 是一个空文件：

```js
const fs = require('node:fs');
const rr = fs.createReadStream('foo.txt');
rr.on('readable', () => {
  console.log(`readable: ${rr.read()}`);
});
rr.on('end', () => {
  console.log('end');
});
```

运行此脚本的输出为：

```console
$ node test.js
readable: null
end
```

在某些情况下，为 `'readable'` 事件添加监听器会导致一些数据被读取到内部缓冲区中。

通常，`readable.pipe()` 和 `'data'` 事件机制比 `'readable'` 事件更容易理解。不过，处理 `'readable'` 可能会提高吞吐量。

如果同时使用 `'readable'` 和 [`'data'`][]，则 `'readable'` 在控制流方面优先级更高，即只有调用 [`stream.read()`][stream-read] 时才会触发 `'data'`。`readableFlowing` 属性会变为 `false`。如果移除 `'readable'` 时仍有 `'data'` 监听器，流将开始流动，即无需调用 `.resume()` 也会触发 `'data'` 事件。

##### 事件：`'resume'`

<!-- YAML
added: v0.9.4
-->

调用 [`stream.resume()`][stream-resume] 且 `readableFlowing` 不为 `true` 时，会触发 `'resume'` 事件。

##### `readable.destroy([error])`

<!-- YAML
added: v8.0.0
changes:
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/29197
    description: Work as a no-op on a stream that has already been destroyed.
-->

* `error` {Error} 将作为 `'error'` 事件的负载传递的错误
* 返回：{this}

销毁流。可以选择触发 `'error'` 事件，并触发 `'close'` 事件（除非 `emitClose` 被设为 `false`）。调用此方法后，可读流会释放所有内部资源，后续对 `push()` 的调用将被忽略。

调用 `destroy()` 后，任何后续调用都将不起作用；除 `_destroy()` 之外，不会再有其他错误作为 `'error'` 事件触发。

实现者不应重写此方法，而应实现 [`readable._destroy()`][readable-_destroy]。

##### `readable.closed`

<!-- YAML
added: v18.0.0
-->

* 类型：{boolean}

触发 `'close'` 后为 `true`。

##### `readable.destroyed`

<!-- YAML
added: v8.0.0
-->

* 类型：{boolean}

调用 [`readable.destroy()`][readable-destroy] 后为 `true`。

##### `readable.isPaused()`

<!-- YAML
added: v0.11.14
-->

* 返回：{boolean}

`readable.isPaused()` 方法返回 `Readable` 的当前运行状态。此方法主要由 `readable.pipe()` 方法底层的机制使用。在大多数常见情况下，没有理由直接使用此方法。

```js
const readable = new stream.Readable();

readable.isPaused(); // === false
readable.pause();
readable.isPaused(); // === true
readable.resume();
readable.isPaused(); // === false
```

##### `readable.pause()`

<!-- YAML
added: v0.9.4
-->

* 返回：{this}

`readable.pause()` 方法会使处于流动模式的流停止触发 [`'data'`][] 事件，并切换出流动模式。任何可用的数据都会保留在内部缓冲区中。

```js
const readable = getReadableStreamSomehow();
readable.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes of data.`);
  readable.pause();
  console.log('There will be no additional data for 1 second.');
  setTimeout(() => {
    console.log('Now data will start flowing again.');
    readable.resume();
  }, 1000);
});
```

如果存在 `'readable'` 事件监听器，`readable.pause()` 方法不会产生任何影响。

##### `readable.pipe(destination[, options])`

<!-- YAML
added: v0.9.4
-->

* `destination` {stream.Writable} 写入数据的目标
* `options` {Object} 管道选项
  * `end` {boolean} 读取端结束时结束写入端。**默认值：** `true`。
* 返回：{stream.Writable} _目标_；如果它是 [`Duplex`][] 或 [`Transform`][] 流，则可用于链接管道

`readable.pipe()` 方法会将 [`Writable`][] 流连接到 `readable`，使其自动切换到流动模式，并将所有数据推送到连接的 [`Writable`][]。数据流会自动管理，从而避免速度较快的 `Readable` 流压垮目标 `Writable` 流。

以下示例将 `readable` 中的所有数据写入名为 `file.txt` 的文件：

```js
const fs = require('node:fs');
const readable = getReadableStreamSomehow();
const writable = fs.createWriteStream('file.txt');
// All the data from readable goes into 'file.txt'.
readable.pipe(writable);
```

可以将多个 `Writable` 流连接到同一个 `Readable` 流。

`readable.pipe()` 方法会返回对_目标_流的引用，因此可以建立管道流链：

```js
const fs = require('node:fs');
const zlib = require('node:zlib');
const r = fs.createReadStream('file.txt');
const z = zlib.createGzip();
const w = fs.createWriteStream('file.txt.gz');
r.pipe(z).pipe(w);
```

默认情况下，当源 `Readable` 流触发 [`'end'`][] 时，会在目标 `Writable` 流上调用 [`stream.end()`][stream-end]，使目标流不再可写。若要禁用此默认行为，可以将 `end` 选项设为 `false`，使目标流保持打开状态：

```js
reader.pipe(writer, { end: false });
reader.on('end', () => {
  writer.end('Goodbye\n');
});
```

一个重要的注意事项是，如果 `Readable` 流在处理过程中触发错误，`Writable` 目标流不会自动关闭。如果发生错误，必须_手动_关闭每个流，以防止内存泄漏。

无论指定了什么选项，直到 Node.js 进程退出， [`process.stderr`][] 和 [`process.stdout`][] `Writable` 流都不会关闭。

##### `readable.read([size])`

<!-- YAML
added: v0.9.4
-->

* `size` {number} 可选参数，用于指定要读取的数据量。
* 返回：{string|Buffer|null|any}

`readable.read()` 方法会从内部缓冲区读取数据并返回。如果没有可读取的数据，则返回 `null`。默认情况下，数据以 `Buffer` 对象的形式返回，除非使用 `readable.setEncoding()` 方法指定了编码，或者流处于对象模式。

可选的 `size` 参数指定要读取的字节数。如果没有足够的 `size` 字节可供读取，则返回 `null`；但如果流已结束，则会返回内部缓冲区中剩余的所有数据。

如果未指定 `size` 参数，则会返回内部缓冲区中的所有数据。

`size` 参数必须小于或等于 1 GiB。

`readable.read()` 方法只能用于处于暂停模式的 `Readable` 流。在流动模式下，会自动调用 `readable.read()`，直到内部缓冲区完全排空。

```js
const readable = getReadableStreamSomehow();

// 'readable' may be triggered multiple times as data is buffered in
readable.on('readable', () => {
  let chunk;
  console.log('Stream is readable (new data received in buffer)');
  // Use a loop to make sure we read all currently available data
  while (null !== (chunk = readable.read())) {
    console.log(`Read ${chunk.length} bytes of data...`);
  }
});

// 'end' will be triggered once when there is no more data available
readable.on('end', () => {
  console.log('Reached end of stream.');
});
```

每次调用 `readable.read()` 都会返回一个数据块或 `null`，表示此时没有更多数据可读。这些数据块不会自动拼接。由于单次 `read()` 调用不会返回所有数据，可能需要使用 while 循环持续读取数据块，直到获取全部数据。读取大型文件时，`.read()` 可能会暂时返回 `null`，表示缓冲区中的内容已全部读取，但可能还有更多数据尚未缓冲。在这种情况下，缓冲区中有更多数据时会触发新的 `'readable'` 事件，而 `'end'` 事件表示数据传输结束。

因此，要从 `readable` 读取文件的全部内容，需要在多个 `'readable'` 事件中收集数据块：

```js
const chunks = [];

readable.on('readable', () => {
  let chunk;
  while (null !== (chunk = readable.read())) {
    chunks.push(chunk);
  }
});

readable.on('end', () => {
  const content = chunks.join('');
});
```

对象模式下的 `Readable` 流每次调用 [`readable.read(size)`][stream-read] 时始终只返回一个项目，与 `size` 参数的值无关。

如果 `readable.read()` 方法返回了一个数据块，也会触发 `'data'` 事件。

在触发 [`'end'`][] 事件后调用 [`stream.read([size])`][stream-read] 将返回 `null`。不会引发运行时错误。

##### `readable.readable`

<!-- YAML
added: v11.4.0
-->

* 类型：{boolean}

如果调用 [`readable.read()`][stream-read] 是安全的，则为 `true`；这表示流尚未被销毁，也未触发 `'error'` 或 `'end'`。

##### `readable.readableAborted`

<!-- YAML
added: v16.8.0
changes:
 - version:
    - v24.0.0
    - v22.17.0
   pr-url: https://github.com/nodejs/node/pull/57513
   description: Marking the API stable.
-->

* 类型：{boolean}

返回流在触发 `'end'` 之前是否已被销毁或发生错误。

##### `readable.readableDidRead`

<!-- YAML
added:
  - v16.7.0
  - v14.18.0
changes:
 - version:
    - v24.0.0
    - v22.17.0
   pr-url: https://github.com/nodejs/node/pull/57513
   description: Marking the API stable.
-->

* 类型：{boolean}

返回是否已触发 `'data'`。

##### `readable.readableEncoding`

<!-- YAML
added: v12.7.0
-->

* 类型：{null|string}

给定 `Readable` 流的 `encoding` 属性的 getter。可以使用 [`readable.setEncoding()`][] 方法设置 `encoding` 属性。

##### `readable.readableEnded`

<!-- YAML
added: v12.9.0
-->

* 类型：{boolean}

触发 [`'end'`][] 事件后变为 `true`。

##### `readable.errored`

<!-- YAML
added:
  v18.0.0
-->

* 类型：{Error}

如果流因错误而被销毁，则返回该错误。

##### `readable.readableFlowing`

<!-- YAML
added: v9.4.0
-->

* 类型：{boolean}

此属性反映 `Readable` 流的当前状态，详见[三种状态][]一节。

##### `readable.readableHighWaterMark`

<!-- YAML
added: v9.3.0
-->

* 类型：{number}

返回创建此 `Readable` 时传入的 `highWaterMark` 值。

##### `readable.readableLength`

<!-- YAML
added: v9.4.0
-->

* 类型：{number}

此属性包含队列中已准备好读取的字节数（或对象数）。该值提供有关 `highWaterMark` 状态的检查数据。

##### `readable.readableObjectMode`

<!-- YAML
added: v12.3.0
-->

* 类型：{boolean}

给定 `Readable` 流的 `objectMode` 属性的 getter。

##### `readable.resume()`

<!-- YAML
added: v0.9.4
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18994
    description: The `resume()` has no effect if there is a `'readable'` event
                 listening.
-->

* 返回：{this}

`readable.resume()` 方法会使显式暂停的 `Readable` 流恢复触发 [`'data'`][] 事件，并将流切换到流动模式。

`readable.resume()` 方法可用于完整消耗流中的数据，而不实际处理其中任何数据：

```js
getReadableStreamSomehow()
  .resume()
  .on('end', () => {
    console.log('Reached the end, but did not read anything.');
  });
```

如果存在 `'readable'` 事件监听器，`readable.resume()` 方法不会产生任何影响。

##### `readable.setEncoding(encoding)`

<!-- YAML
added: v0.9.4
-->

* `encoding` {string} 要使用的编码。
* 返回：{this}

`readable.setEncoding()` 方法会为从 `Readable` 流中读取的数据设置字符编码。

默认情况下，不会分配编码，流数据将以 `Buffer` 对象的形式返回。设置编码后，流数据将以指定编码的字符串形式返回，而不是 `Buffer` 对象。例如，调用 `readable.setEncoding('utf8')` 会使输出数据被解释为 UTF-8 数据，并以字符串形式传递。调用 `readable.setEncoding('hex')` 会使数据以十六进制字符串格式编码。

`Readable` 流会正确处理通过流传递的多字节字符；如果直接从流中读取 `Buffer` 对象，这些字符可能无法被正确解码。

```js
const readable = getReadableStreamSomehow();
readable.setEncoding('utf8');
readable.on('data', (chunk) => {
  assert.equal(typeof chunk, 'string');
  console.log('Got %d characters of string data:', chunk.length);
});
```

##### `readable.unpipe([destination])`

<!-- YAML
added: v0.9.4
-->

* `destination` {stream.Writable} 要取消管道连接的可选指定流
* 返回：{this}

`readable.unpipe()` 方法会分离先前通过 [`stream.pipe()`][] 方法连接的 `Writable` 流。

如果未指定 `destination`，则会分离所有管道连接。

如果指定了 `destination`，但未为其建立管道连接，则此方法不执行任何操作。

```js
const fs = require('node:fs');
const readable = getReadableStreamSomehow();
const writable = fs.createWriteStream('file.txt');
// All the data from readable goes into 'file.txt',
// but only for the first second.
readable.pipe(writable);
setTimeout(() => {
  console.log('Stop writing to file.txt.');
  readable.unpipe(writable);
  console.log('Manually close the file stream.');
  writable.end();
}, 1000);
```

##### `readable.unshift(chunk[, encoding])`

<!-- YAML
added: v0.9.11
changes:
  - version:
    - v22.0.0
    - v20.13.0
    pr-url: https://github.com/nodejs/node/pull/51866
    description: The `chunk` argument can now be a `TypedArray` or `DataView` instance.
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/11608
    description: The `chunk` argument can now be a `Uint8Array` instance.
-->

* `chunk` {Buffer|TypedArray|DataView|string|null|any} 要推回读取队列的数据块。对于不处于对象模式的流，`chunk` 必须是 {string}、{Buffer}、{TypedArray}、{DataView} 或 `null`。对于对象模式流，`chunk` 可以是任何 JavaScript 值。
* `encoding` {string} 字符串数据块的编码。必须是有效的 `Buffer` 编码，例如 `'utf8'` 或 `'ascii'`。

将 `chunk` 设为 `null` 表示流结束（EOF），其行为与 `readable.push(null)` 相同；此后不能再写入数据。EOF 信号会放在缓冲区末尾，已缓冲的数据仍会被刷新。

`readable.unshift()` 方法会将数据块推回内部缓冲区。在某些情况下，流正被一段需要“取消消耗”数据的代码读取时，这很有用：代码乐观地从源中读取了一些数据，之后需要将这些数据传递给其他对象。

在触发 [`'end'`][] 事件后调用 `stream.unshift(chunk)` 方法会引发运行时错误。

经常使用 `stream.unshift()` 的开发者应考虑改用 [`Transform`][] 流。更多信息请参阅[流实现者 API][]一节。

```js
// Pull off a header delimited by \n\n.
// Use unshift() if we get too much.
// Call the callback with (error, header, stream).
const { StringDecoder } = require('node:string_decoder');
function parseHeader(stream, callback) {
  stream.on('error', callback);
  stream.on('readable', onReadable);
  const decoder = new StringDecoder('utf8');
  let header = '';
  function onReadable() {
    let chunk;
    while (null !== (chunk = stream.read())) {
      const str = decoder.write(chunk);
      if (str.includes('\n\n')) {
        // Found the header boundary.
        const split = str.split(/\n\n/);
        header += split.shift();
        const remaining = split.join('\n\n');
        const buf = Buffer.from(remaining, 'utf8');
        stream.removeListener('error', callback);
        // Remove the 'readable' listener before unshifting.
        stream.removeListener('readable', onReadable);
        if (buf.length)
          stream.unshift(buf);
        // Now the body of the message can be read from the stream.
        callback(null, header, stream);
        return;
      }
      // Still reading the header.
      header += str;
    }
  }
}
```

与 [`stream.push(chunk)`][stream-push] 不同，`stream.unshift(chunk)` 不会通过重置流的内部读取状态来结束读取过程。如果在读取过程中调用 `readable.unshift()`（例如，在自定义流的 [`stream._read()`][stream-_read] 实现中调用），可能会导致意外结果。调用 `readable.unshift()` 后立即调用 [`stream.push('')`][stream-push] 可以恰当地重置读取状态，不过最好还是避免在读取过程中调用 `readable.unshift()`。

##### `readable.wrap(stream)`

<!-- YAML
added: v0.9.4
-->

* `stream` {Stream} 一种“旧式”可读流
* 返回：{this}

在 Node.js 0.10 之前，流并未实现当前定义的整个 `node:stream` 模块 API。（有关更多信息，请参阅[兼容性][]。）

使用较旧的 Node.js 库时，如果该库会发出 [`'data'`][] 事件，并且其 [`stream.pause()`][stream-pause] 方法仅提供建议性暂停，那么可以使用 `readable.wrap()` 方法创建一个以旧流作为数据源的 [`Readable`][] 流。

很少需要使用 `readable.wrap()`，但提供此方法是为了方便与较旧的 Node.js 应用程序和库交互。

```js
const { OldReader } = require('./old-api-module.js');
const { Readable } = require('node:stream');
const oreader = new OldReader();
const myReader = new Readable().wrap(oreader);

myReader.on('readable', () => {
  myReader.read(); // etc.
});
```

##### `readable[Symbol.asyncIterator]()`

<!-- YAML
added: v10.0.0
changes:
  - version: v11.14.0
    pr-url: https://github.com/nodejs/node/pull/26989
    description: Symbol.asyncIterator support is no longer experimental.
-->

* 返回：{AsyncIterator} 用于完整地消耗流。

```js
const fs = require('node:fs');

async function print(readable) {
  readable.setEncoding('utf8');
  let data = '';
  for await (const chunk of readable) {
    data += chunk;
  }
  console.log(data);
}

print(fs.createReadStream('file')).catch(console.error);
```

如果循环以 `break`、`return` 或 `throw` 终止，流将被销毁。换句话说，迭代流将完整地消耗该流。流将以等于 `highWaterMark` 选项的大小分块读取。在上面的代码示例中，如果文件的数据少于 64 KiB，数据将位于单个块中，因为没有向 [`fs.createReadStream()`][] 提供 `highWaterMark` 选项。

##### `readable[Symbol.for('Stream.toAsyncStreamable')]()`

<!-- YAML
added:
 - v26.1.0
 - v24.20.0
-->

> 稳定性：1 - 实验性

* 返回：{AsyncIterable} 一个 `AsyncIterable<Uint8Array[]>`，用于生成流中的批量数据块。

启用 `--experimental-stream-iter` 标志时，`Readable` 流会实现 [`Stream.toAsyncStreamable`][] 协议，从而支持 [`stream/iter`][] API 高效地消耗流。

此方法提供一个批量异步迭代器，将流的内部缓冲区排空到 `Uint8Array[]` 批次中，从而分摊标准 `Symbol.asyncIterator` 路径中每个数据块的 Promise 开销。对于字节模式流，数据块会直接以 `Buffer` 实例（它是 `Uint8Array` 的子类）的形式生成。对于对象模式或已编码的流，每个数据块在批处理前都会被规范化为 `Uint8Array`。

返回的迭代器会被标记为已验证的源，因此 [`from()`][stream-iter-from] 会直接传递它，而不会进行额外的规范化。

```mjs
import { Readable } from 'node:stream';
import { text, from } from 'node:stream/iter';

const readable = new Readable({
  read() { this.push('hello'); this.push(null); },
});

// Readable is automatically consumed via toAsyncStreamable
console.log(await text(from(readable))); // 'hello'
```

```cjs
const { Readable } = require('node:stream');
const { text, from } = require('node:stream/iter');

async function run() {
  const readable = new Readable({
    read() { this.push('hello'); this.push(null); },
  });

  console.log(await text(from(readable))); // 'hello'
}

run().catch(console.error);
```

如果未启用 `--experimental-stream-iter` 标志，调用此方法会抛出 [`ERR_STREAM_ITER_MISSING_FLAG`][]。

##### `readable[Symbol.asyncDispose]()`

<!-- YAML
added:
 - v20.4.0
 - v18.18.0
changes:
 - version: v24.2.0
   pr-url: https://github.com/nodejs/node/pull/58467
   description: No longer experimental.
-->

使用 `AbortError` 调用 [`readable.destroy()`][readable-destroy]，并返回一个在流结束时兑现的 promise。

##### `readable.compose(stream[, options])`

<!-- YAML
added:
  - v19.1.0
  - v18.13.0
changes:
 - version:
    - v24.0.0
    - v22.17.0
   pr-url: https://github.com/nodejs/node/pull/57513
   description: Marking the API stable.
-->

* `stream` {Writable|Duplex|WritableStream|TransformStream|Function}
* `options` {Object}
  * `signal` {AbortSignal} 如果信号被中止，则允许销毁流。
* 返回：{Duplex} 一个与流 `stream` 组合而成的流。

```mjs
import { Readable } from 'node:stream';

async function* splitToWords(source) {
  for await (const chunk of source) {
    const words = String(chunk).split(' ');

    for (const word of words) {
      yield word;
    }
  }
}

const wordsStream = Readable.from(['text passed through', 'composed stream']).compose(splitToWords);
const words = await wordsStream.toArray();

console.log(words); // prints ['text', 'passed', 'through', 'composed', 'stream']
```

`readable.compose(s)` 等价于 `stream.compose(readable, s)`。

此方法还允许提供一个 {AbortSignal}，当其被中止时，会销毁组合后的流。

有关更多信息，请参阅 [`stream.compose(...streams)`][]。

##### `readable.iterator([options])`

<!-- YAML
added: v16.3.0
changes:
 - version:
    - v24.0.0
    - v22.17.0
   pr-url: https://github.com/nodejs/node/pull/57513
   description: Marking the API stable.
-->

* `options` {Object}
  * `destroyOnReturn` {boolean} 设为 `false` 时，在异步迭代器上调用 `return`，或使用 `break`、`return` 或 `throw` 退出 `for await...of` 迭代，都不会销毁流。**默认值：** `true`。
* 返回：{AsyncIterator} 用于消耗流。

此方法创建的迭代器允许用户选择：当通过 `return`、`break` 或 `throw` 退出 `for await...of` 循环时，取消销毁流；或者在迭代期间流发出错误时，销毁流。

```js
const { Readable } = require('node:stream');

async function printIterator(readable) {
  for await (const chunk of readable.iterator({ destroyOnReturn: false })) {
    console.log(chunk); // 1
    break;
  }

  console.log(readable.destroyed); // false

  for await (const chunk of readable.iterator({ destroyOnReturn: false })) {
    console.log(chunk); // Will print 2 and then 3
  }

  console.log(readable.destroyed); // True, stream was totally consumed
}

async function printSymbolAsyncIterator(readable) {
  for await (const chunk of readable) {
    console.log(chunk); // 1
    break;
  }

  console.log(readable.destroyed); // true
}

async function showBoth() {
  await printIterator(Readable.from([1, 2, 3]));
  await printSymbolAsyncIterator(Readable.from([1, 2, 3]));
}

showBoth();
```

##### `readable.map(fn[, options])`

<!-- YAML
added:
  - v17.4.0
  - v16.14.0
changes:
  - version:
    - v20.7.0
    - v18.19.0
    pr-url: https://github.com/nodejs/node/pull/49249
    description: added `highWaterMark` in options.
-->

> 稳定性：1 - 实验性

* `fn` {Function|AsyncFunction} 一个用于映射流中每个数据块的函数。
  * `data` {any} 来自流的一个数据块。
  * `options` {Object}
    * `signal` {AbortSignal} 如果流被销毁则中止，允许提前中止 `fn` 调用。
* `options` {Object}
  * `concurrency` {number} 在流上同时调用 `fn` 的最大并发次数。**默认值：** `1`。
  * `highWaterMark` {number} 等待用户消耗映射后的数据项时要缓冲的项数。**默认值：** `concurrency * 2 - 1`。
  * `signal` {AbortSignal} 如果信号被中止，则允许销毁流。
* 返回：{Readable} 一个使用函数 `fn` 映射后的流。

此方法允许映射流中的数据。对于流中的每个数据块，都会调用 `fn` 函数。如果 `fn` 函数返回一个 promise，则在将其传递给结果流之前会对该 promise 执行 `await`。

```mjs
import { Readable } from 'node:stream';
import { Resolver } from 'node:dns/promises';

// With a synchronous mapper.
for await (const chunk of Readable.from([1, 2, 3, 4]).map((x) => x * 2)) {
  console.log(chunk); // 2, 4, 6, 8
}
// With an asynchronous mapper, making at most 2 queries at a time.
const resolver = new Resolver();
const dnsResults = Readable.from([
  'nodejs.org',
  'openjsf.org',
  'www.linuxfoundation.org',
]).map((domain) => resolver.resolve4(domain), { concurrency: 2 });
for await (const result of dnsResults) {
  console.log(result); // Logs the DNS result of resolver.resolve4.
}
```

##### `readable.filter(fn[, options])`

<!-- YAML
added:
  - v17.4.0
  - v16.14.0
changes:
  - version:
    - v20.7.0
    - v18.19.0
    pr-url: https://github.com/nodejs/node/pull/49249
    description: added `highWaterMark` in options.
-->

> 稳定性：1 - 实验性

* `fn` {Function|AsyncFunction} 一个用于筛选流中数据块的函数。
  * `data` {any} 来自流的一个数据块。
  * `options` {Object}
    * `signal` {AbortSignal} 如果流被销毁则中止，允许提前中止 `fn` 调用。
* `options` {Object}
  * `concurrency` {number} 在流上同时调用 `fn` 的最大并发次数。**默认值：** `1`。
  * `highWaterMark` {number} 等待用户消耗筛选后的数据项时要缓冲的项数。**默认值：** `concurrency * 2 - 1`。
  * `signal` {AbortSignal} 如果信号被中止，则允许销毁流。
* 返回：{Readable} 一个使用谓词 `fn` 筛选后的流。

此方法允许筛选流。对于流中的每个数据块，都会调用 `fn` 函数；如果它返回真值，则该数据块会被传递到结果流。如果 `fn` 函数返回一个 promise，则会对该 promise 执行 `await`。

```mjs
import { Readable } from 'node:stream';
import { Resolver } from 'node:dns/promises';

// With a synchronous predicate.
for await (const chunk of Readable.from([1, 2, 3, 4]).filter((x) => x > 2)) {
  console.log(chunk); // 3, 4
}
// With an asynchronous predicate, making at most 2 queries at a time.
const resolver = new Resolver();
const dnsResults = Readable.from([
  'nodejs.org',
  'openjsf.org',
  'www.linuxfoundation.org',
]).filter(async (domain) => {
  const { address } = await resolver.resolve4(domain, { ttl: true });
  return address.ttl > 60;
}, { concurrency: 2 });
for await (const result of dnsResults) {
  // Logs domains with more than 60 seconds on the resolved dns record.
  console.log(result);
}
```

##### `readable.forEach(fn[, options])`

<!-- YAML
added:
  - v17.5.0
  - v16.15.0
-->

> 稳定性：1 - 实验性

* `fn` {Function|AsyncFunction} 一个在流的每个数据块上调用的函数。
  * `data` {any} 来自流的一个数据块。
  * `options` {Object}
    * `signal` {AbortSignal} 如果流被销毁则中止，允许提前中止 `fn` 调用。
* `options` {Object}
  * `concurrency` {number} 在流上同时调用 `fn` 的最大并发次数。**默认值：** `1`。
  * `signal` {AbortSignal} 如果信号被中止，则允许销毁流。
* 返回：{Promise} 一个在流结束时兑现的 promise。

此方法允许迭代流。对于流中的每个数据块，都会调用 `fn` 函数。如果 `fn` 函数返回一个 promise，则会对该 promise 执行 `await`。

此方法与 `for await...of` 循环不同，它可以选择并发处理数据块。此外，只有在传入 `signal` 选项并中止相关的 `AbortController` 时，才能停止 `forEach` 迭代；而 `for await...of` 可以通过 `break` 或 `return` 停止。无论哪种情况，流都会被销毁。

此方法与监听 [`'data'`][] 事件不同，它使用底层机制中的 [`readable`][] 事件，并且可以限制并发 `fn` 调用的数量。

```mjs
import { Readable } from 'node:stream';
import { Resolver } from 'node:dns/promises';

// With a synchronous predicate.
for await (const chunk of Readable.from([1, 2, 3, 4]).filter((x) => x > 2)) {
  console.log(chunk); // 3, 4
}
// With an asynchronous predicate, making at most 2 queries at a time.
const resolver = new Resolver();
const dnsResults = Readable.from([
  'nodejs.org',
  'openjsf.org',
  'www.linuxfoundation.org',
]).map(async (domain) => {
  const { address } = await resolver.resolve4(domain, { ttl: true });
  return address;
}, { concurrency: 2 });
await dnsResults.forEach((result) => {
  // Logs result, similar to `for await (const result of dnsResults)`
  console.log(result);
});
console.log('done'); // Stream has finished
```

##### `readable.toArray([options])`

<!-- YAML
added:
  - v17.5.0
  - v16.15.0
-->

> 稳定性：1 - 实验性

* `options` {Object}
  * `signal` {AbortSignal} 如果信号被中止，则允许取消 `toArray` 操作。
* 返回：{Promise} 一个包含流内容的数组的 promise。

此方法便于轻松获取流的内容。

由于此方法会将整个流读入内存，因此会抵消流的优势。它旨在用于互操作和提供便利，而不是作为消耗流的主要方式。

```mjs
import { Readable } from 'node:stream';
import { Resolver } from 'node:dns/promises';

await Readable.from([1, 2, 3, 4]).toArray(); // [1, 2, 3, 4]

const resolver = new Resolver();

// Make dns queries concurrently using .map and collect
// the results into an array using toArray
const dnsResults = await Readable.from([
  'nodejs.org',
  'openjsf.org',
  'www.linuxfoundation.org',
]).map(async (domain) => {
  const { address } = await resolver.resolve4(domain, { ttl: true });
  return address;
}, { concurrency: 2 }).toArray();
```

##### `readable.some(fn[, options])`

<!-- YAML
added:
  - v17.5.0
  - v16.15.0
-->

> 稳定性：1 - 实验性

* `fn` {Function|AsyncFunction} 一个在流的每个数据块上调用的函数。
  * `data` {any} 来自流的一个数据块。
  * `options` {Object}
    * `signal` {AbortSignal} 如果流被销毁则中止，允许提前中止 `fn` 调用。
* `options` {Object}
  * `concurrency` {number} 在流上同时调用 `fn` 的最大并发次数。**默认值：** `1`。
  * `signal` {AbortSignal} 如果信号被中止，则允许销毁流。
* 返回：{Promise} 一个 promise，如果至少有一个数据块对应的 `fn` 返回真值，则该 promise 的值为 `true`。

此方法类似于 `Array.prototype.some`，会对流中的每个数据块调用 `fn`，直到其 await 后的返回值为 `true`（或任何真值）。一旦某个数据块对应的 `fn` 调用的 await 返回值为真值，流就会被销毁，并且 promise 会以 `true` 履行。如果所有数据块对应的 `fn` 调用都没有返回真值，promise 则会以 `false` 履行。

```mjs
import { Readable } from 'node:stream';
import { stat } from 'node:fs/promises';

// 使用同步谓词。
await Readable.from([1, 2, 3, 4]).find((x) => x > 2); // 3
await Readable.from([1, 2, 3, 4]).find((x) => x > 0); // 1
await Readable.from([1, 2, 3, 4]).find((x) => x > 10); // undefined

// 使用异步谓词，最多同时进行 2 个文件检查。
const foundBigFile = await Readable.from([
  'file1',
  'file2',
  'file3',
]).find(async (fileName) => {
  const stats = await stat(fileName);
  return stats.size > 1024 * 1024;
}, { concurrency: 2 });
console.log(foundBigFile); // 如果列表中的任何文件大于 1MB，则为大文件的文件名
console.log('done'); // 流已完成
```

##### `readable.every(fn[, options])`

<!-- YAML
added:
  - v17.5.0
  - v16.15.0
-->

> 稳定性：1 - 实验性

* `fn` {Function|AsyncFunction} 一个在流的每个数据块上调用的函数。
  * `data` {any} 来自流的一个数据块。
  * `options` {Object}
    * `signal` {AbortSignal} 如果流被销毁则中止，允许提前中止 `fn` 调用。
* `options` {Object}
  * `concurrency` {number} 在流上同时调用 `fn` 的最大并发次数。**默认：** `1`。
  * `signal` {AbortSignal} 如果信号被中止，则允许销毁流。
* 返回：{Promise} 一个 promise，如果 `fn` 对所有数据块都返回真值，则该 promise 的值为 `true`。

此方法类似于 `Array.prototype.every`，会对流中的每个数据块调用 `fn`，以检查所有 await 后的返回值是否都是 `fn` 的真值。一旦某个数据块对应的 `fn` 调用的 await 返回值为假值，流就会被销毁，并且 promise 会以 `false` 履行。如果所有数据块对应的 `fn` 调用都返回真值，promise 则会以 `true` 履行。

```mjs
import { Readable } from 'node:stream';
import { stat } from 'node:fs/promises';

// 使用同步谓词。
await Readable.from([1, 2, 3, 4]).every((x) => x > 2); // false
await Readable.from([1, 2, 3, 4]).every((x) => x > 0); // true

// 使用异步谓词，最多同时进行 2 个文件检查。
const allBigFiles = await Readable.from([
  'file1',
  'file2',
  'file3',
]).every(async (fileName) => {
  const stats = await stat(fileName);
  return stats.size > 1024 * 1024;
}, { concurrency: 2 });
// 如果列表中的所有文件都大于 1MiB，则为 `true`
console.log(allBigFiles);
console.log('done'); // 流已完成
```

##### `readable.flatMap(fn[, options])`

<!-- YAML
added:
  - v17.5.0
  - v16.15.0
-->

> 稳定性：1 - 实验性

* `fn` {Function|AsyncGeneratorFunction|AsyncFunction} 一个用于映射流中每个数据块的函数。
  * `data` {any} 来自流的一个数据块。
  * `options` {Object}
    * `signal` {AbortSignal} 如果流被销毁则中止，允许提前中止 `fn` 调用。
* `options` {Object}
  * `concurrency` {number} 在流上同时调用 `fn` 的最大并发次数。**默认：** `1`。
  * `signal` {AbortSignal} 如果信号被中止，则允许销毁流。
* 返回：{Readable} 一个使用函数 `fn` 扁平映射的流。

此方法通过将给定的回调应用于流中的每个数据块，然后扁平化结果，来返回一个新流。

可以从 `fn` 返回一个流、另一个可迭代对象或异步可迭代对象，结果流将被合并（扁平化）到返回的流中。

```mjs
import { Readable } from 'node:stream';
import { createReadStream } from 'node:fs';

// 使用同步映射器。
for await (const chunk of Readable.from([1, 2, 3, 4]).flatMap((x) => [x, x])) {
  console.log(chunk); // 1, 1, 2, 2, 3, 3, 4, 4
}
// 使用异步映射器，合并 4 个文件的内容
const concatResult = Readable.from([
  './1.mjs',
  './2.mjs',
  './3.mjs',
  './4.mjs',
]).flatMap((fileName) => createReadStream(fileName));
for await (const result of concatResult) {
  // 这里将包含所有 4 个文件的内容（所有块）
  console.log(result);
}
```

##### `readable.drop(limit[, options])`

<!-- YAML
added:
  - v17.5.0
  - v16.15.0
-->

> 稳定性：1 - 实验性

* `limit` {number} 要从 readable 中丢弃的块数量。
* `options` {Object}
  * `signal` {AbortSignal} 如果信号被中止，则允许销毁流。
* 返回：{Readable} 一个丢弃了 `limit` 个块的流。

此方法返回一个新流，其中前 `limit` 个块被丢弃。

```mjs
import { Readable } from 'node:stream';

await Readable.from([1, 2, 3, 4]).drop(2).toArray(); // [3, 4]
```

##### `readable.take(limit[, options])`

<!-- YAML
added:
  - v17.5.0
  - v16.15.0
-->

> 稳定性：1 - 实验性

* `limit` {number} 要从 readable 获取的块的数量。
* `options` {Object}
  * `signal` {AbortSignal} 如果信号被中止，允许销毁流。
* 返回：{Readable} 一个获取了 `limit` 个块的流。

此方法返回一个新流，其中包含前 `limit` 个块。

```mjs
import { Readable } from 'node:stream';

await Readable.from([1, 2, 3, 4]).take(2).toArray(); // [1, 2]
```

##### `readable.reduce(fn[, initial[, options]])`

<!-- YAML
added:
  - v17.5.0
  - v16.15.0
-->

> 稳定性：1 - 实验性

* `fn` {Function|AsyncFunction} 一个在流的每个块上调用的归约函数。
  * `previous` {any} 上一次调用 `fn` 得到的值，或者如果指定了 `initial` 值则为该值，否则为流的第一个块。
  * `data` {any} 来自流的一个数据块。
  * `options` {Object}
    * `signal` {AbortSignal} 如果流被销毁则中止，允许提前中止 `fn` 调用。
* `initial` {any} 用于归约的初始值。
* `options` {Object}
  * `signal` {AbortSignal} 如果信号被中止，允许销毁流。
* 返回：{Promise} 一个归约最终值的 promise。

此方法按顺序在流的每个块上调用 `fn`，将上一个元素计算的结果传递给它。它返回一个归约最终值的 promise。

如果没有提供 `initial` 值，则使用流的第一个块作为初始值。如果流为空，则 promise 将被带有 `ERR_INVALID_ARGS` 代码属性的 `TypeError` 拒绝。

```mjs
import { Readable } from 'node:stream';
import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

const directoryPath = './src';
const filesInDir = await readdir(directoryPath);

const folderSize = await Readable.from(filesInDir)
  .reduce(async (totalSize, file) => {
    const { size } = await stat(join(directoryPath, file));
    return totalSize + size;
  }, 0);

console.log(folderSize);
```

reducer 函数逐个元素地迭代流，这意味着没有 `concurrency` 参数或并行性。要并发执行 `reduce`，可以将异步函数提取到 [`readable.map`][] 方法。

```mjs
import { Readable } from 'node:stream';
import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

const directoryPath = './src';
const filesInDir = await readdir(directoryPath);

const folderSize = await Readable.from(filesInDir)
  .map((file) => stat(join(directoryPath, file)), { concurrency: 2 })
  .reduce((totalSize, { size }) => totalSize + size, 0);

console.log(folderSize);
```

### Duplex 和转换流

#### 类：`stream.Duplex`

<!-- YAML
added: v0.9.4
changes:
  - version: v6.8.0
    pr-url: https://github.com/nodejs/node/pull/8834
    description: "Duplex 的实例现在在检查 `instanceof stream.Writable` 时返回 `true`。"
-->

<!--type=class-->

Duplex 流是同时实现 [`Readable`][] 和 [`Writable`][] 接口的流。

`Duplex` 流的示例包括：

* [TCP 套接字][]
* [zlib 流][zlib]
* [crypto 流][crypto]

##### `duplex.allowHalfOpen`

<!-- YAML
added: v0.9.4
-->

* 类型：{boolean}

如果为 `false`，则当 readable 端结束时，流将自动结束 writable 端。最初由 `allowHalfOpen` 构造函数选项设置，默认为 `true`。

可以手动更改此项以更改现有 `Duplex` 流实例的半开行为，但必须在发出 `'end'` 事件之前更改。

#### 类：`stream.Transform`

<!-- YAML
added: v0.9.4
-->

<!--type=class-->

Transform 流是输出以某种方式与输入相关的 [`Duplex`][] 流。像所有 [`Duplex`][] 流一样，`Transform` 流同时实现 [`Readable`][] 和 [`Writable`][] 接口。

`Transform` 流的示例包括：

* [zlib 流][zlib]
* [crypto 流][crypto]

##### `transform.destroy([error])`

<!-- YAML
added: v8.0.0
changes:
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/29197
    description: 在已销毁的流上作为空操作运行。
-->

* `error` {Error}
* 返回：{this}

销毁流，并可选地发出 `'error'` 事件。在此调用之后，transform 流将释放任何内部资源。
实现者不应覆盖此方法，而应实现 [`readable._destroy()`][readable-_destroy]。
`Transform` 的 `_destroy()` 的默认实现也会发出 `'close'`，除非 `emitClose` 设置为 false。

一旦调用了 `destroy()`，任何进一步的调用都将为空操作，并且除了来自 `_destroy()` 的错误外，不会再发出任何 `'error'` 错误。

#### `stream.duplexPair([options])`

<!-- YAML
added:
  - v22.6.0
  - v20.17.0
-->

* `options` {Object} 传递给两个 [`Duplex`][] 构造函数的值，用于设置缓冲等选项。
* 返回：{Array} 两个 [`Duplex`][] 实例。

实用函数 `duplexPair` 返回一个包含两项的 Array，每一项都是连接到另一侧的 `Duplex` 流：

```js
const [ sideA, sideB ] = duplexPair();
```

写入一个流的内容可在另一个流上读取。它提供了类似于网络连接的行为，其中客户端写入的数据可由服务器读取，反之亦然。

Duplex 流是对称的；可以使用其中一个或另一个，行为没有任何区别。

### `stream.finished(stream[, options], callback)`

<!-- YAML
added: v10.0.0
changes:
  - version: v19.5.0
    pr-url: https://github.com/nodejs/node/pull/46205
    description: "增加了对 `ReadableStream` 和 `WritableStream` 的支持。"
  - version: v15.11.0
    pr-url: https://github.com/nodejs/node/pull/37354
    description: "添加了 `signal` 选项。"
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/32158
    description: "`finished(stream, cb)` 将在调用回调之前等待 `'close'` 事件。实现尝试检测旧版流，并且仅将此行为应用于预期会发出 `'close'` 的流。"
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/31545
    description: "在 `Readable` 流上于 `'end'` 之前发出 `'close'` 将导致 `ERR_STREAM_PREMATURE_CLOSE` 错误。"
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/31509
    description: "回调将在调用 `finished(stream, cb)` 之前已经完成的流上被调用。"
-->

* `stream` {Stream|ReadableStream|WritableStream} 一个可读和/或可写流/Web 流。
* `options` {Object}
  * `error` {boolean} 如果设置为 `false`，则调用 `emit('error', err)` 不被视为完成。**默认：** `true`。
  * `readable` {boolean} 当设置为 `false` 时，即使流可能仍然可读，也会在流结束时调用回调。**默认：** `true`。
  * `writable` {boolean} 当设置为 `false` 时，即使流可能仍然可写，也会在流结束时调用回调。**默认：** `true`。
  * `signal` {AbortSignal} 允许中止等待流完成。如果信号被中止，底层流将 _不会_ 被中止。回调将带有 `AbortError` 被调用。此函数添加的所有注册监听器也将被移除。
* `callback` {Function} 一个接受可选错误参数的回调函数。
* 返回：{Function} 一个清理函数，用于移除所有注册的监听器。

一个函数，用于在流不再可读、可写或遇到错误或过早关闭事件时得到通知。

```js
const { finished } = require('node:stream');
const fs = require('node:fs');

const rs = fs.createReadStream('archive.tar');

finished(rs, (err) => {
  if (err) {
    console.error('流失败。', err);
  } else {
    console.log('流已完成读取。');
  }
});

rs.resume(); // 排空流。
```

在错误处理场景中特别有用，其中流被过早销毁（例如中止的 HTTP 请求），并且不会发出 `'end'` 或 `'finish'`。

`finished` API 提供 [promise 版本][stream-finished-promise]。

`stream.finished()` 在 `callback` 被调用后会在流上留下悬空的事件监听器（特别是 `'error'`、`'end'`、`'finish'` 和 `'close'`）。这样做的原因是防止意外的 `'error'` 事件（由于不正确的流实现）导致意外的崩溃。
如果这是不需要的行为，则需要在回调中调用返回的清理函数：

```js
const cleanup = finished(rs, (err) => {
  cleanup();
  // ...
});
```

### `stream.pipeline(source[, ...transforms], destination, callback)`

### `stream.pipeline(streams, callback)`

<!-- YAML
added: v10.0.0
changes:
  - version:
    - v19.7.0
    - v18.16.0
    pr-url: https://github.com/nodejs/node/pull/46307
    description: 增加了对 webstreams 的支持。
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是 `ERR_INVALID_CALLBACK`。"
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/32158
    description: "`pipeline(..., cb)` 将在调用回调之前等待 `'close'` 事件。实现尝试检测旧版流，并且仅将此行为应用于预期会发出 `'close'` 的流。"
  - version: v13.10.0
    pr-url: https://github.com/nodejs/node/pull/31223
    description: 添加了对异步生成器的支持。
-->

* `streams` {Stream\[]|Iterable\[]|AsyncIterable\[]|Function\[]|
  ReadableStream\[]|WritableStream\[]|TransformStream\[]}
* `source` {Stream|Iterable|AsyncIterable|Function|ReadableStream}
  * 返回：{Iterable|AsyncIterable}
* `...transforms` {Stream|Function|TransformStream}
  * `source` {AsyncIterable}
  * 返回：{AsyncIterable}
* `destination` {Stream|Function|WritableStream}
  * `source` {AsyncIterable}
  * 返回：{AsyncIterable|Promise}
* `callback` {Function} 在 pipeline 完全完成时调用。
  * `err` {Error}
  * `val` `destination` 返回的 `Promise` 的解析值。
* 返回：{Stream}

一个模块方法，用于在流和生成器之间进行管道传输，转发错误并正确清理，并在 pipeline 完成时提供回调。

```js
const { pipeline } = require('node:stream');
const fs = require('node:fs');
const zlib = require('node:zlib');

// 使用 pipeline API 轻松地将一系列流管道在一起
// 并在 pipeline 完全完成时得到通知。

// 一个高效 gzip 可能巨大 tar 文件的 pipeline：

pipeline(
  fs.createReadStream('archive.tar'),
  zlib.createGzip(),
  fs.createWriteStream('archive.tar.gz'),
  (err) => {
    if (err) {
      console.error('管道失败。', err);
    } else {
      console.log('管道成功。');
    }
  },
);
```

`pipeline` API 提供 [promise 版本][stream-pipeline-promise]。

`stream.pipeline()` 将在所有流上调用 `stream.destroy(err)`，除了：

* 已发出 `'end'` 或 `'close'` 的 `Readable` 流。
* 已发出 `'finish'` 或 `'close'` 的 `Writable` 流。

`stream.pipeline()` 在 `callback` 被调用后会在流上留下悬空的事件监听器。在失败后重用流的情况下，这可能导致事件监听器泄漏和吞掉的错误。如果最后一个流是 readable，悬空的事件监听器将被移除，以便以后可以消费最后一个流。

`stream.pipeline()` 在引发错误时关闭所有流。
`IncomingRequest` 与 `pipeline` 一起使用可能会导致意外行为，因为它会在没有发送预期响应的情况下销毁 socket。
参见下面的示例：

```js
const fs = require('node:fs');
const http = require('node:http');
const { pipeline } = require('node:stream');

const server = http.createServer((req, res) => {
  const fileStream = fs.createReadStream('./fileNotExist.txt');
  pipeline(fileStream, res, (err) => {
    if (err) {
      console.log(err); // 没有这样的文件
      // 一旦 `pipeline` 已经销毁了 socket，就无法发送此消息
      return res.end('error!!!');
    }
  });
});
```

### `stream.compose(...streams)`

<!-- YAML
added: v16.9.0
changes:
  - version:
     - v26.2.0
     - v24.19.0
    pr-url: https://github.com/nodejs/node/pull/62562
    description: 将 API 标记为稳定。
  - version:
    - v21.1.0
    - v20.10.0
    pr-url: https://github.com/nodejs/node/pull/50187
    description: 添加了对流类的支持。
  - version:
    - v19.8.0
    - v18.16.0
    pr-url: https://github.com/nodejs/node/pull/46675
    description: 增加了对 webstreams 的支持。
-->

* `streams` {Stream\[]|Iterable\[]|AsyncIterable\[]|Function\[]|
  ReadableStream\[]|WritableStream\[]|TransformStream\[]|Duplex\[]|Function}
* 返回：{stream.Duplex}

将两个或多个流组合成一个 `Duplex` 流，该流写入第一个流并从最后一个流读取。每个提供的流都使用 `stream.pipeline` 管道到下一个流。如果任何流出错，则所有流都被销毁，包括外部 `Duplex` 流。

因为 `stream.compose` 返回一个新流，该流又可以（并且应该）被管道到其他流中，所以它支持组合。相比之下，当将流传递给 `stream.pipeline` 时，通常第一个流是 readable 流，最后一个是 writable 流，形成一个闭合电路。

如果传递的是 `Function`，它必须是一个接受 `source` `Iterable` 的工厂方法。

```mjs
import { compose, Transform } from 'node:stream';

const removeSpaces = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, String(chunk).replace(' ', ''));
  },
});

async function* toUpper(source) {
  for await (const chunk of source) {
    yield String(chunk).toUpperCase();
  }
}

let res = '';
for await (const buf of compose(removeSpaces, toUpper).end('hello world')) {
  res += buf;
}

console.log(res); // 打印 'HELLOWORLD'
```

`stream.compose` 可用于将异步可迭代对象、生成器和函数转换为流。

* `AsyncIterable` 转换为可读 `Duplex`。不能 yield `null`。
* `AsyncGeneratorFunction` 转换为可读/可写转换 `Duplex`。
  必须将 source `AsyncIterable` 作为第一个参数。不能 yield `null`。
* `AsyncFunction` 转换为可写 `Duplex`。必须返回 `null` 或 `undefined`。

```mjs
import { compose } from 'node:stream';
import { finished } from 'node:stream/promises';

// 将 AsyncIterable 转换为 readable Duplex。
const s1 = compose(async function*() {
  yield 'Hello';
  yield 'World';
}());

// 将 AsyncGenerator 转换为 transform Duplex。
const s2 = compose(async function*(source) {
  for await (const chunk of source) {
    yield String(chunk).toUpperCase();
  }
});

let res = '';

// 将 AsyncFunction 转换为 writable Duplex。
const s3 = compose(async function(source) {
  for await (const chunk of source) {
    res += chunk;
  }
});

await finished(compose(s1, s2, s3));

console.log(res); // 打印 'HELLOWORLD'
```

为了方便起见，[`readable.compose(stream)`][] 方法在 {Readable} 和 {Duplex} 流上可用作此函数的包装器。

### `stream.isDestroyed(stream)`

<!-- YAML
added:
  - v19.9.0
  - v18.17.0
-->

* `stream` {Readable|Writable|Duplex}
* 返回：{boolean|null} - 仅当 `stream` 不是有效的 `Readable`、`Writable` 或 `Duplex` 时返回 `null`。

返回流是否已被销毁。

### `stream.isErrored(stream)`

<!-- YAML
added:
  - v17.3.0
  - v16.14.0
changes:
  - version:
      - v24.0.0
      - v22.17.0
    pr-url: https://github.com/nodejs/node/pull/57513
    description: 将 API 标记为稳定。
-->

* `stream` {Readable|Writable|Duplex|WritableStream|ReadableStream}
* 返回：{boolean}

返回流是否遇到错误。

### `stream.isReadable(stream)`

<!-- YAML
added:
  - v17.4.0
  - v16.14.0
changes:
  - version:
      - v24.0.0
      - v22.17.0
    pr-url: https://github.com/nodejs/node/pull/57513
    description: 将 API 标记为稳定。
-->

* `stream` {Readable|Duplex|ReadableStream}
* 返回：{boolean|null} - 仅当 `stream` 不是有效的 `Readable`、`Duplex` 或 `ReadableStream` 时返回 `null`。

返回流是否可读。

### `stream.isWritable(stream)`

* `stream` {Writable|Duplex|WritableStream}
* 返回：{boolean|null} - 仅当 `stream` 不是有效的 `Writable`、`Duplex` 或 `WritableStream` 时返回 `null`。

返回流是否可写。

### `stream.Readable.from(iterable[, options])`

<!-- YAML
added:
  - v12.3.0
  - v10.17.0
-->

* `iterable` {Iterable} 实现 `Symbol.asyncIterator` 或 `Symbol.iterator` 可迭代协议的对象。如果传递 null 值，则发出 'error' 事件。
* `options` {Object} 提供给 `new stream.Readable([options])` 的选项。默认情况下，`Readable.from()` 会将 `options.objectMode` 设置为 `true`，除非通过将 `options.objectMode` 设置为 `false` 显式选择退出。
* 返回：{stream.Readable}

一个用于从迭代器创建可读流的实用方法。

```js
const { Readable } = require('node:stream');

async function * generate() {
  yield 'hello';
  yield 'streams';
}

const readable = Readable.from(generate());

readable.on('data', (chunk) => {
  console.log(chunk);
});
```

调用 `Readable.from(string)` 或 `Readable.from(buffer)` 不会为了性能原因而迭代字符串或缓冲区以匹配其他流语义。

如果传递包含 promise 的 `Iterable` 对象作为参数，可能会导致未处理的拒绝。

```js
const { Readable } = require('node:stream');

Readable.from([
  new Promise((resolve) => setTimeout(resolve('1'), 1500)),
  new Promise((_, reject) => setTimeout(reject(new Error('2')), 1000)), // 未处理的拒绝
]);
```

### `stream.Readable.fromWeb(readableStream[, options])`

<!-- YAML
added: v17.0.0
changes:
  - version:
      - v24.0.0
      - v22.17.0
    pr-url: https://github.com/nodejs/node/pull/57513
    description: 标记 API 为稳定。
-->

* `readableStream` {ReadableStream}
* `options` {Object}
  * `encoding` {string}
  * `highWaterMark` {number}
  * `objectMode` {boolean}
  * `signal` {AbortSignal}
* 返回：{stream.Readable}

### `stream.Readable.isDisturbed(stream)`

<!-- YAML
added: v16.8.0
changes:
  - version:
      - v24.0.0
      - v22.17.0
    pr-url: https://github.com/nodejs/node/pull/57513
    description: 标记 API 为稳定。
-->

* `stream` {stream.Readable|ReadableStream}
* 返回：`boolean`

返回流是否已被读取或取消。

### `stream.Readable.toWeb(streamReadable[, options])`

<!-- YAML
added: v17.0.0
changes:
  - version:
     - v25.4.0
     - v24.14.0
    pr-url: https://github.com/nodejs/node/pull/58664
    description: 添加 'type' 选项以指定 'bytes'。
  - version:
      - v24.0.0
      - v22.17.0
    pr-url: https://github.com/nodejs/node/pull/57513
    description: 标记 API 为稳定。
  - version:
    - v18.7.0
    pr-url: https://github.com/nodejs/node/pull/43515
    description: 在 Readable 上包含 strategy 选项。
-->

* `streamReadable` {stream.Readable}
* `options` {Object}
  * `strategy` {Object}
    * `highWaterMark` {number} 对给定的 `stream.Readable` 进行读取时，在应用背压之前，创建的 `ReadableStream` 的最大内部队列大小。如果未提供值，将从给定的 `stream.Readable` 获取。
    * `size` {Function} 一个用于确定给定数据块大小的函数。
      如果未提供值，所有块的大小将为 `1`。
      * `chunk` {any}
      * 返回：{number}
  * `type` {string} 指定创建的 `ReadableStream` 的类型。必须是 `'bytes'` 或 undefined。
* 返回：{ReadableStream}

### `stream.Writable.fromWeb(writableStream[, options])`

<!-- YAML
added: v17.0.0
changes:
  - version:
      - v24.0.0
      - v22.17.0
    pr-url: https://github.com/nodejs/node/pull/57513
    description: 标记 API 为稳定。
-->

* `writableStream` {WritableStream}
* `options` {Object}
  * `decodeStrings` {boolean}
  * `highWaterMark` {number}
  * `objectMode` {boolean}
  * `signal` {AbortSignal}
* 返回：{stream.Writable}

### `stream.Writable.toWeb(streamWritable)`

<!-- YAML
added: v17.0.0
changes:
  - version:
      - v24.0.0
      - v22.17.0
    pr-url: https://github.com/nodejs/node/pull/57513
    description: 标记 API 为稳定。
-->

* `streamWritable` {stream.Writable}
* 返回：{WritableStream}

### `stream.Duplex.from(src)`

<!-- YAML
added: v16.8.0
changes:
  - version:
    - v19.5.0
    - v18.17.0
    pr-url: https://github.com/nodejs/node/pull/46190
    description: "`src` 参数现在可以是 `ReadableStream` 或 `WritableStream`。"
-->

* `src` {Stream|Blob|ArrayBuffer|string|Iterable|AsyncIterable|
  AsyncGeneratorFunction|AsyncFunction|Promise|Object|
  ReadableStream|WritableStream}

一个用于创建双工流的实用方法。

* `Stream` 将 writable 流转换为 writable `Duplex`，readable 流转换为 `Duplex`。
* `Blob` 转换为 readable `Duplex`。
* `string` 转换为 readable `Duplex`。
* `ArrayBuffer` 转换为 readable `Duplex`。
* `AsyncIterable` 转换为 readable `Duplex`。不能 yield `null`。
* `AsyncGeneratorFunction` 转换为 readable/writable transform `Duplex`。必须将 source `AsyncIterable` 作为第一个参数。不能 yield `null`。
* `AsyncFunction` 转换为 writable `Duplex`。必须返回 `null` 或 `undefined`
* `Object ({ writable, readable })` 将 `readable` 和 `writable` 转换为 `Stream`，然后将它们组合成 `Duplex`，其中 `Duplex` 将写入 `writable` 并从 `readable` 读取。
* `Promise` 转换为 readable `Duplex`。值 `null` 被忽略。
* `ReadableStream` 转换为 readable `Duplex`。
* `WritableStream` 转换为 writable `Duplex`。
* 返回：{stream.Duplex}

如果传递包含 promise 的 `Iterable` 对象作为参数，可能会导致未处理的拒绝。

```js
const { Duplex } = require('node:stream');

Duplex.from([
  new Promise((resolve) => setTimeout(resolve('1'), 1500)),
  new Promise((_, reject) => setTimeout(reject(new Error('2')), 1000)), // 未处理的拒绝
]);
```

### `stream.Duplex.fromWeb(pair[, options])`

<!-- YAML
added: v17.0.0
changes:
  - version:
      - v24.0.0
      - v22.17.0
    pr-url: https://github.com/nodejs/node/pull/57513
    description: 标记 API 为稳定。
-->

* `pair` {Object}
  * `readable` {ReadableStream}
  * `writable` {WritableStream}
* `options` {Object}
  * `allowHalfOpen` {boolean}
  * `decodeStrings` {boolean}
  * `encoding` {string}
  * `highWaterMark` {number}
  * `objectMode` {boolean}
  * `signal` {AbortSignal}
* 返回：{stream.Duplex}

```mjs
import { Duplex } from 'node:stream';
import {
  ReadableStream,
  WritableStream,
} from 'node:stream/web';

const readable = new ReadableStream({
  start(controller) {
    controller.enqueue('world');
  },
});

const writable = new WritableStream({
  write(chunk) {
    console.log('writable', chunk);
  },
});

const pair = {
  readable,
  writable,
};
const duplex = Duplex.fromWeb(pair, { encoding: 'utf8', objectMode: true });

duplex.write('hello');

for await (const chunk of duplex) {
  console.log('readable', chunk);
}
```

```cjs
const { Duplex } = require('node:stream');
const {
  ReadableStream,
  WritableStream,
} = require('node:stream/web');

const readable = new ReadableStream({
  start(controller) {
    controller.enqueue('world');
  },
});

const writable = new WritableStream({
  write(chunk) {
    console.log('writable', chunk);
  },
});

const pair = {
  readable,
  writable,
};
const duplex = Duplex.fromWeb(pair, { encoding: 'utf8', objectMode: true });

duplex.write('hello');
duplex.once('readable', () => console.log('readable', duplex.read()));
```

### `stream.Duplex.toWeb(streamDuplex[, options])`

<!-- YAML
added: v17.0.0
changes:
  - version:
     - v25.7.0
     - v24.15.0
    pr-url: https://github.com/nodejs/node/pull/61632
    description: "添加了 'readableType' 选项以指定 ReadableStream 类型。'type' 选项已弃用。"
  - version:
     - v25.4.0
     - v24.14.0
    pr-url: https://github.com/nodejs/node/pull/58664
    description: 添加了 'type' 选项以指定 ReadableStream 类型。
  - version:
      - v24.0.0
      - v22.17.0
    pr-url: https://github.com/nodejs/node/pull/57513
    description: 标记 API 为稳定。
-->

* `streamDuplex` {stream.Duplex}
* `options` {Object}
  * `readableType` {string} 指定创建的可读写对中 `ReadableStream` 一半的类型。必须是 `'bytes'` 或 undefined。
    （`options.type` 是此选项的已弃用别名。）
* 返回：{Object}
  * `readable` {ReadableStream}
  * `writable` {WritableStream}

```mjs
import { Duplex } from 'node:stream';

const duplex = Duplex({
  objectMode: true,
  read() {
    this.push('world');
    this.push(null);
  },
  write(chunk, encoding, callback) {
    console.log('writable', chunk);
    callback();
  },
});

const { readable, writable } = Duplex.toWeb(duplex);
writable.getWriter().write('hello');

const { value } = await readable.getReader().read();
console.log('readable', value);
```

```cjs
const { Duplex } = require('node:stream');

const duplex = Duplex({
  objectMode: true,
  read() {
    this.push('world');
    this.push(null);
  },
  write(chunk, encoding, callback) {
    console.log('writable', chunk);
    callback();
  },
});

const { readable, writable } = Duplex.toWeb(duplex);
writable.getWriter().write('hello');

readable.getReader().read().then((result) => {
  console.log('readable', result.value);
});
```

### `stream.addAbortSignal(signal, stream)`

<!-- YAML
added: v15.4.0
changes:
  - version:
    - v19.7.0
    - v18.16.0
    pr-url: https://github.com/nodejs/node/pull/46273
    description: "增加了对 `ReadableStream` 和 `WritableStream` 的支持。"
-->

* `signal` {AbortSignal} 一个表示可能取消操作的信号
* `stream` {Stream|ReadableStream|WritableStream} 一个要附加信号的流。

将 AbortSignal 附加到可读流或可写流。这使代码能够使用 `AbortController` 控制流的销毁。

> 稳定性：0 - 已弃用。使用 [`stream.addAbortSignal()`][] 销毁长生命周期流资源，仅在文档中标记为已弃用。请参阅 [DEP0209](deprecations.md#dep0209-using-abortsignal-to-dispose-of-resources)。

调用与传入的 `AbortSignal` 对应的 `AbortController` 上的 `abort`，其行为与在流上调用 `.destroy(new AbortError())` 相同；对于 webstreams，则与调用 `controller.error(new AbortError())` 相同。

```js
const fs = require('node:fs');

const controller = new AbortController();
const read = addAbortSignal(
  controller.signal,
  fs.createReadStream(('object.json')),
);
// 稍后，中止操作以关闭流
controller.abort();
```

或者将 `AbortSignal` 与可读流一起用作异步可迭代对象：

```js
const controller = new AbortController();
setTimeout(() => controller.abort(), 10_000); // 设置超时
const stream = addAbortSignal(
  controller.signal,
  fs.createReadStream(('object.json')),
);
(async () => {
  try {
    for await (const chunk of stream) {
      await process(chunk);
    }
  } catch (e) {
    if (e.name === 'AbortError') {
      // 操作已取消
    } else {
      throw e;
    }
  }
})();
```

或者将 `AbortSignal` 与可读流一起使用：

```js
const controller = new AbortController();
const rs = new ReadableStream({
  start(controller) {
    controller.enqueue('hello');
    controller.enqueue('world');
    controller.close();
  },
});

addAbortSignal(controller.signal, rs);

finished(rs, (err) => {
  if (err) {
    if (err.name === 'AbortError') {
      // 操作已取消
    }
  }
});

const reader = rs.getReader();

reader.read().then(({ value, done }) => {
  console.log(value); // hello
  console.log(done); // false
  controller.abort();
});
```

### `stream.getDefaultHighWaterMark(objectMode)`

<!-- YAML
added:
  - v19.9.0
  - v18.17.0
changes:
  - version: v22.0.0
    pr-url: https://github.com/nodejs/node/pull/52037
    description: bump default highWaterMark.
-->

* `objectMode` {boolean}
* 返回：{integer}

返回流使用的默认 highWaterMark。`objectMode` 的默认值为 `16`。对于字节流，非 Windows 平台上的默认值为 `65536`（64 KiB），Windows 上的默认值为 `16384`（16 KiB）。

### `stream.setDefaultHighWaterMark(objectMode, value)`

<!-- YAML
added:
  - v19.9.0
  - v18.17.0
-->

* `objectMode` {boolean}
* `value` {integer} highWaterMark 值

设置流使用的默认 highWaterMark。

## 流实现者 API

<!--type=misc-->

`node:stream` 模块 API 的设计使得可以使用 JavaScript 的原型继承模型轻松实现流。

首先，流开发者会声明一个继承自四种基本流类之一（`stream.Writable`、`stream.Readable`、`stream.Duplex` 或 `stream.Transform`）的新 JavaScript 类，并确保调用相应的父类构造函数：

```js
const { Writable } = require('node:stream');

class MyWritable extends Writable {
  constructor({ highWaterMark, ...options }) {
    super({ highWaterMark });
    // ...
  }
}
```

扩展流时，请注意用户可以且应该提供哪些选项，然后再将这些选项传递给基类构造函数。例如，如果实现对 `autoDestroy` 和 `emitClose` 选项作出了假设，就不要允许用户覆盖这些选项。应明确指定要转发哪些选项，而不是隐式转发所有选项。

随后，新流类必须根据所创建的流类型实现一个或多个特定方法，如下表所示：

| 用例                                         | 类              | 要实现的方法                                                                                                      |
| -------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------ |
| 仅读取                                       | [`Readable`][]  | [`_read()`][stream-_read]                                                                                          |
| 仅写入                                       | [`Writable`][]  | [`_write()`][stream-_write]、[`_writev()`][stream-_writev]、[`_final()`][stream-_final]                            |
| 读取和写入                                   | [`Duplex`][]    | [`_read()`][stream-_read]、[`_write()`][stream-_write]、[`_writev()`][stream-_writev]、[`_final()`][stream-_final] |
| 对写入的数据进行操作，然后读取结果           | [`Transform`][] | [`_transform()`][stream-_transform]、[`_flush()`][stream-_flush]、[`_final()`][stream-_final]                      |

流的实现代码_绝不能_调用供消费者使用的流“公共”方法（如[流消费者 API][]部分所述）。这样做可能会对使用该流的应用程序代码造成不良副作用。

避免覆盖 `write()`、`end()`、`cork()`、`uncork()`、`read()` 和 `destroy()` 等公共方法，也不要通过 `.emit()` 发出 `'error'`、`'data'`、`'end'`、`'finish'` 和 `'close'` 等内部事件。这样做可能会破坏当前和未来的流不变量，导致与其他流、流实用工具以及用户预期之间出现行为和／或兼容性问题。

### 简化构造

<!-- YAML
added: v1.2.0
-->

对于许多简单情况，可以不依赖继承来创建流。具体做法是直接创建 `stream.Writable`、`stream.Readable`、`stream.Duplex` 或 `stream.Transform` 对象的实例，并将适当的方法作为构造函数选项传入。

```js
const { Writable } = require('node:stream');

const myWritable = new Writable({
  construct(callback) {
    // Initialize state and load resources...
  },
  write(chunk, encoding, callback) {
    // ...
  },
  destroy() {
    // Free resources...
  },
});
```

### 实现可写流

扩展 `stream.Writable` 类即可实现 [`Writable`][] 流。

自定义 `Writable` 流_必须_调用 `new stream.Writable([options])` 构造函数，并实现 `writable._write()` 和／或 `writable._writev()` 方法。

#### `new stream.Writable([options])`

<!-- YAML
changes:
  - version: v22.0.0
    pr-url: https://github.com/nodejs/node/pull/52037
    description: bump default highWaterMark.
  - version: v15.5.0
    pr-url: https://github.com/nodejs/node/pull/36431
    description: support passing in an AbortSignal.
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/30623
    description: Change `autoDestroy` option default to `true`.
  - version:
     - v11.2.0
     - v10.16.0
    pr-url: https://github.com/nodejs/node/pull/22795
    description: Add `autoDestroy` option to automatically `destroy()` the
                 stream when it emits `'finish'` or errors.
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18438
    description: Add `emitClose` option to specify if `'close'` is emitted on
                 destroy.
-->

* `options` {Object}
  * `highWaterMark` {number} 当 [`stream.write()`][stream-write] 开始返回 `false` 时的缓冲区级别。**默认值：**参见 [`stream.getDefaultHighWaterMark()`][]。
  * `decodeStrings` {boolean} 是否在将传入 [`stream.write()`][stream-write] 的 `string` 传递给 [`stream._write()`][stream-_write] 之前，将其编码为 `Buffer`（使用 [`stream.write()`][stream-write] 调用中指定的编码）。其他类型的数据不会转换（即 `Buffer` 不会解码为 `string`）。设置为 false 可防止 `string` 被转换。**默认值：**`true`。
  * `defaultEncoding` {string} 未在 [`stream.write()`][stream-write] 中指定编码参数时使用的默认编码。**默认值：**`'utf8'`。
  * `objectMode` {boolean} [`stream.write(anyObj)`][stream-write] 是否为有效操作。设置后，如果流实现支持，则可以写入字符串、{Buffer}、{TypedArray} 或 {DataView} 以外的 JavaScript 值。**默认值：**`false`。
  * `emitClose` {boolean} 流销毁后是否应发出 `'close'`。**默认值：**`true`。
  * `write` {Function} [`stream._write()`][stream-_write] 方法的实现。
  * `writev` {Function} [`stream._writev()`][stream-_writev] 方法的实现。
  * `destroy` {Function} [`stream._destroy()`][writable-_destroy] 方法的实现。
  * `final` {Function} [`stream._final()`][stream-_final] 方法的实现。
  * `construct` {Function} [`stream._construct()`][writable-_construct] 方法的实现。
  * `autoDestroy` {boolean} 此流结束后是否应自动调用自身的 `.destroy()`。**默认值：**`true`。
  * `signal` {AbortSignal} 表示可能取消操作的信号。

<!-- eslint-disable no-useless-constructor -->

```cjs
const { Writable } = require('node:stream');

class MyWritable extends Writable {
  constructor(options) {
    // Calls the stream.Writable() constructor.
    super(options);
    // ...
  }
}
```

<!-- eslint-disable no-useless-constructor -->

```mjs
import { Writable } from 'node:stream';

class MyWritable extends Writable {
  constructor(options) {
    // Calls the stream.Writable() constructor.
    super(options);
    // ...
  }
}
```

或者，使用简化的构造函数方式：

```js
const { Writable } = require('node:stream');

const myWritable = new Writable({
  write(chunk, encoding, callback) {
    // ...
  },
  writev(chunks, callback) {
    // ...
  },
});
```

对与传入的 `AbortSignal` 对应的 `AbortController` 调用 `abort`，其行为将与对可写流调用 `.destroy(new AbortError())` 相同。

```js
const { Writable } = require('node:stream');

const controller = new AbortController();
const myWritable = new Writable({
  write(chunk, encoding, callback) {
    // ...
  },
  writev(chunks, callback) {
    // ...
  },
  signal: controller.signal,
});
// 稍后，中止操作以关闭流
controller.abort();
```

#### `writable._construct(callback)`

<!-- YAML
added: v15.0.0
-->

* `callback` {Function} 当流完成初始化时调用此函数（可选带错误参数）。

`_construct()` 方法不得直接调用。它可以由子类实现，如果是这样，将仅由内部 `Writable` 类方法调用。

这个可选函数将在流构造函数返回后的某个 tick 中调用，延迟任何 `_write()`、`_final()` 和 `_destroy()` 调用，直到调用 `callback`。这对于在流可用之前初始化状态或异步初始化资源很有用。

```js
const { Writable } = require('node:stream');
const fs = require('node:fs');

class WriteStream extends Writable {
  constructor(filename) {
    super();
    this.filename = filename;
    this.fd = null;
  }
  _construct(callback) {
    fs.open(this.filename, 'w', (err, fd) => {
      if (err) {
        callback(err);
      } else {
        this.fd = fd;
        callback();
      }
    });
  }
  _write(chunk, encoding, callback) {
    fs.write(this.fd, chunk, callback);
  }
  _destroy(err, callback) {
    if (this.fd) {
      fs.close(this.fd, (er) => callback(er || err));
    } else {
      callback(err);
    }
  }
}
```

#### 写入器

<!-- YAML
changes:
  - version: v12.11.0
    pr-url: https://github.com/nodejs/node/pull/29639
    description: 当提供 _writev() 时，_write() 是可选的。
-->

* `chunk` {Buffer|string|any} 要写入的 `Buffer`，由传递给 [`stream.write()`][stream-write] 的 `string` 转换而来。如果流的 `decodeStrings` 选项为 `false` 或流在对象模式下运行，则 chunk 不会被转换 & 将是传递给 [`stream.write()`][stream-write] 的任何内容。
* `encoding` {string} 如果 chunk 是字符串，则 `encoding` 是该字符串的字符编码。如果 chunk 是 `Buffer`，或者流在对象模式下运行，`encoding` 可能会被忽略。
* `callback` {Function} 当提供的 chunk 处理完成时调用此函数（可选带错误参数）。

所有 `Writable` 流实现必须提供 [`writable._write()`][stream-_write] 和/或 [`writable._writev()`][stream-_writev] 方法以将数据发送到基础资源。

[`Transform`][] 流提供它们自己的 [`writable._write()`][stream-_write] 实现。

此函数不得由应用程序代码直接调用。它应由子类实现，并仅由内部 `Writable` 类方法调用。

`callback` 函数必须在 `writable._write()` 内部同步调用或异步调用（即不同的 tick），以信号表示写入成功完成或因错误失败。传递给 `callback` 的第一个参数必须是 `Error` 对象（如果调用失败）或 `null`（如果写入成功）。

在调用 `writable._write()` 和调用 `callback` 之间发生的所有 `writable.write()` 调用都将导致写入的数据被缓冲。当调用 `callback` 时，流可能会发出 [`'drain'`][] 事件。如果流实现能够一次处理多个数据块，则应实现 `writable._writev()` 方法。

如果在构造函数选项中将 `decodeStrings` 属性显式设置为 `false`，则 `chunk` 将保持与传递给 `.write()` 相同的对象，并且可能是字符串而不是 `Buffer`。这是为了支持对某些字符串数据编码具有优化处理的实现。在这种情况下，`encoding` 参数将指示字符串的字符编码。否则，`encoding` 参数可以安全地忽略。

`writable._write()` 函数以前缀下划线开头，因为它对于定义它的类是内部的，用户程序绝不应直接调用它。

#### 写入多个数据块

* `chunks` {Object\[]} 要写入的数据。值是一个 {Object} 数组，每个对象代表一个要写入的离散数据块。这些对象的属性是：
  * `chunk` {Buffer|string} 包含要写入数据的 buffer 实例或字符串。如果 `Writable` 创建时 `decodeStrings` 选项设置为 `false` 并且字符串传递给 `write()`，则 `chunk` 将是字符串。
  * `encoding` {string} `chunk` 的字符编码。如果 `chunk` 是 `Buffer`，则 `encoding` 将是 `'buffer'`。
* `callback` {Function} 当提供的 chunks 处理完成时调用的回调函数（可选带错误参数）。

此函数不得由应用程序代码直接调用。它应由子类实现，并仅由内部 `Writable` 类方法调用。

在能够一次处理多个数据块的流实现中，`writable._writev()` 方法可以作为 `writable._write()` 的补充或替代来实现。如果实现了并且存在来自先前写入的缓冲数据，则将调用 `_writev()` 而不是 `_write()`。

`writable._writev()` 方法以前缀下划线开头，因为它对于定义它的类是内部的，用户程序绝不应直接调用它。

#### 销毁时

<!-- YAML
added: v8.0.0
-->

* `err` {Error} 可能的错误。
* `callback` {Function} 接受可选错误参数的回调函数。

`_destroy()` 方法由 [`writable.destroy()`][writable-destroy] 调用。它可以被子类覆盖，但**不得**直接调用。

#### 收尾

<!-- YAML
added: v8.0.0
-->

* `callback` {Function} 当完成写入任何剩余数据时调用此函数（可选带错误参数）。

`_final()` 方法**不得**直接调用。它可以由子类实现，如果是这样，将仅由内部 `Writable` 类方法调用。

这个可选函数将在流关闭之前调用，延迟 `'finish'` 事件直到 `callback` 被调用。这对于在流结束之前关闭资源或写入缓冲数据很有用。

#### 写入时的错误

在处理 [`writable._write()`][]、[`writable._writev()`][] 和 [`writable._final()`][] 方法期间发生的错误必须通过调用回调并将错误作为第一个参数传递来传播。从这些方法内部抛出 `Error` 或手动发出 `'error'` 事件会导致未定义的行为。

如果 `Readable` 流管道连接到 `Writable` 流，当 `Writable` 发出错误时，`Readable` 流将被取消管道连接。

```js
const { Writable } = require('node:stream');

const myWritable = new Writable({
  write(chunk, encoding, callback) {
    if (chunk.toString().indexOf('a') >= 0) {
      callback(new Error('chunk is invalid'));
    } else {
      callback();
    }
  },
});
```

#### 可写流示例

以下说明了一个相当简单（且有点无意义）的自定义 `Writable` 流实现。虽然这个特定的 `Writable` 流实例没有任何真正的特别用处，但该示例说明了自定义 [`Writable`][] 流实例的每个必需元素：

```js
const { Writable } = require('node:stream');

class MyWritable extends Writable {
  _write(chunk, encoding, callback) {
    if (chunk.toString().indexOf('a') >= 0) {
      callback(new Error('chunk is invalid'));
    } else {
      callback();
    }
  }
}
```

#### 在可写流中解码缓冲区

解码缓冲区是一项常见任务，例如在使用以字符串作为输入的转换器时。当使用多字节字符编码（如 UTF-8）时，这并不是一个简单的过程。以下示例展示了如何使用 `StringDecoder` 和 [`Writable`][] 解码多字节字符串。

```js
const { Writable } = require('node:stream');
const { StringDecoder } = require('node:string_decoder');

class StringWritable extends Writable {
  constructor(options) {
    super(options);
    this._decoder = new StringDecoder(options?.defaultEncoding);
    this.data = '';
  }
  _write(chunk, encoding, callback) {
    if (encoding === 'buffer') {
      chunk = this._decoder.write(chunk);
    }
    this.data += chunk;
    callback();
  }
  _final(callback) {
    this.data += this._decoder.end();
    callback();
  }
}

const euro = [[0xE2, 0x82], [0xAC]].map(Buffer.from);
const w = new StringWritable();

w.write('currency: ');
w.write(euro[0]);
w.end(euro[1]);

console.log(w.data); // currency: €
```

### 实现可读流

`stream.Readable` 类被扩展以实现 [`Readable`][] 流。

自定义 `Readable` 流 _必须_ 调用 `new stream.Readable([options])` 构造函数并实现 [`readable._read()`][] 方法。

#### `new stream.Readable([options])`

<!-- YAML
changes:
  - version: v22.0.0
    pr-url: https://github.com/nodejs/node/pull/52037
    description: 提高默认 highWaterMark。
  - version: v15.5.0
    pr-url: https://github.com/nodejs/node/pull/36431
    description: 支持传入 AbortSignal。
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/30623
    description: "将 `autoDestroy` 选项默认值改为 `true`。"
  - version:
     - v11.2.0
     - v10.16.0
    pr-url: https://github.com/nodejs/node/pull/22795
    description: "添加 `autoDestroy` 选项以便在发出 `'end'` 或错误时自动 `destroy()` 流。"
-->

* `options` {Object}
  * `highWaterMark` {number} 在停止从底层资源读取之前，内部缓冲区中最多存储的[字节数][hwm-gotcha]。**默认值：**参见 [`stream.getDefaultHighWaterMark()`][]。
  * `encoding` {string} 如果指定，则缓冲区将使用指定的编码解码为字符串。**默认值：**`null`。
  * `objectMode` {boolean} 此流是否应表现为对象流。这意味着 [`stream.read(n)`][stream-read] 返回单个值，而不是大小为 `n` 的 `Buffer`。**默认值：**`false`。
  * `emitClose` {boolean} 流销毁后是否应发出 `'close'`。**默认值：**`true`。
  * `read` {Function} [`stream._read()`][stream-_read] 方法的实现。
  * `destroy` {Function} [`stream._destroy()`][readable-_destroy] 方法的实现。
  * `construct` {Function} [`stream._construct()`][readable-_construct] 方法的实现。
  * `autoDestroy` {boolean} 流结束后是否应自动对自身调用 `.destroy()`。**默认值：**`true`。
  * `signal` {AbortSignal} 表示可能取消操作的信号。

<!-- eslint-disable no-useless-constructor -->

```js
const { Readable } = require('node:stream');

class MyReadable extends Readable {
  constructor(options) {
    // 调用 stream.Readable(options) 构造函数。
    super(options);
    // ...
  }
}
```

或者，使用简化的构造函数方式：

```js
const { Readable } = require('node:stream');

const myReadable = new Readable({
  read(size) {
    // ...
  },
});
```

对传入的 `AbortSignal` 对应的 `AbortController` 调用 `abort` 的行为将与在创建的可读流上调用 `.destroy(new AbortError())` 相同。

```js
const { Readable } = require('node:stream');
const controller = new AbortController();
const read = new Readable({
  read(size) {
    // ...
  },
  signal: controller.signal,
});
// 稍后，中止操作以关闭流
controller.abort();
```

#### `readable._construct(callback)`

<!-- YAML
added: v15.0.0
-->

* `callback` {Function} 当流完成初始化时调用此函数（可选带错误参数）。

`_construct()` 方法不得直接调用。它可以由子类实现，如果是这样，将仅由内部 `Readable` 类方法调用。

这个可选函数将由流构造函数安排在下一个 tick 中，延迟任何 `_read()` 和 `_destroy()` 调用直到 `callback` 被调用。这对于在流可以使用之前初始化状态或异步初始化资源很有用。

```js
const { Readable } = require('node:stream');
const fs = require('node:fs');

class ReadStream extends Readable {
  constructor(filename) {
    super();
    this.filename = filename;
    this.fd = null;
  }
  _construct(callback) {
    fs.open(this.filename, (err, fd) => {
      if (err) {
        callback(err);
      } else {
        this.fd = fd;
        callback();
      }
    });
  }
  _read(n) {
    const buf = Buffer.alloc(n);
    fs.read(this.fd, buf, 0, n, null, (err, bytesRead) => {
      if (err) {
        this.destroy(err);
      } else {
        this.push(bytesRead > 0 ? buf.slice(0, bytesRead) : null);
      }
    });
  }
  _destroy(err, callback) {
    if (this.fd) {
      fs.close(this.fd, (er) => callback(er || err));
    } else {
      callback(err);
    }
  }
}
```

#### `readable._read(size)`

<!-- YAML
added: v0.9.4
-->

* `size` {number} 异步读取的字节数

此函数不得由应用程序代码直接调用。它应由子类实现，并仅由内部 `Readable` 类方法调用。

所有 `Readable` 流实现必须提供 [`readable._read()`][] 方法的实现以从基础资源获取数据。

当调用 [`readable._read()`][] 时，如果资源中有可用数据，实现应开始使用 [`this.push(dataChunk)`][stream-push] 方法将该数据推入读取队列。一旦流准备好接受更多数据，每次调用 [`this.push(dataChunk)`][stream-push] 后将再次调用 `_read()`。`_read()` 可以继续从资源读取并推送数据，直到 `readable.push()` 返回 `false`。只有当 `_read()` 在停止后再次被调用时，它才应恢复向队列推送额外数据。

一旦 [`readable._read()`][] 方法被调用，它将不会再被调用，直到通过 [`readable.push()`][stream-push] 方法推送更多数据。空数据（如空 buffers 和字符串）不会导致 [`readable._read()`][] 被调用。

`size` 参数是建议性的。对于“读取”是返回数据的单个操作的实现，可以使用 `size` 参数来确定要获取多少数据。其他实现可能会忽略此参数，并在数据可用时简单地提供数据。在调用 [`stream.push(chunk)`][stream-push] 之前，没有必要“等待”直到 `size` 字节可用。

[`readable._read()`][] 方法以前缀下划线开头，因为它对于定义它的类是内部的，用户程序绝不应直接调用它。

#### `readable._destroy(err, callback)`

<!-- YAML
added: v8.0.0
-->

* `err` {Error} 可能的错误。
* `callback` {Function} 接受可选错误参数的回调函数。

`_destroy()` 方法由 [`readable.destroy()`][readable-destroy] 调用。它可以被子类覆盖，但**不得**直接调用。

#### `readable.push(chunk[, encoding])`

<!-- YAML
changes:
  - version:
    - v22.0.0
    - v20.13.0
    pr-url: https://github.com/nodejs/node/pull/51866
    description: "`chunk` 参数现在可以是 `TypedArray` 或 `DataView` 实例。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/11608
    description: "`chunk` 参数现在可以是 `Uint8Array` 实例。"
-->

* `chunk` {Buffer|TypedArray|DataView|string|null|any} 要推入读取队列的数据块。对于不在对象模式下运行的流，`chunk` 必须是 {string}、{Buffer}、{TypedArray} 或 {DataView}。对于对象模式流，`chunk` 可以是任何 JavaScript 值。
* `encoding` {string} 字符串块的编码。必须是有效的 `Buffer` 编码，例如 `'utf8'` 或 `'ascii'`。
* 返回：{boolean} 如果可以继续推送额外的数据块则为 `true`；否则为 `false`。

当 `chunk` 是 {Buffer}、{TypedArray}、{DataView} 或 {string} 时，数据 `chunk` 将被添加到内部队列以供流的用户消费。传递 `chunk` 为 `null` 信号表示流结束（EOF），之后不能再写入更多数据。

当 `Readable` 在暂停模式下运行时，可以使用 `readable.push()` 添加的数据通过调用 [`readable.read()`][stream-read] 方法在 [`'readable'`][] 事件发出时读出。

当 `Readable` 在流动模式下运行时，使用 `readable.push()` 添加的数据将通过发出 `'data'` 事件来交付。

`readable.push()` 方法旨在尽可能灵活。例如，当包装提供某种暂停/恢复机制和数据回调的底层源时，底层源可以由自定义 `Readable` 实例包装：

```js
// `_source` 是一个具有 readStop() 和 readStart() 方法的对象，
// 以及一个在有数据时调用的 `ondata` 成员，
// 和一个在数据结束时调用的 `onend` 成员。

class SourceWrapper extends Readable {
  constructor(options) {
    super(options);

    this._source = getLowLevelSourceObject();

    // 每次有数据时，将其推入内部缓冲区。
    this._source.ondata = (chunk) => {
      // 如果 push() 返回 false，则停止从源读取。
      if (!this.push(chunk))
        this._source.readStop();
    };

    // 当源结束时，推送 EOF 信号 `null` 块。
    this._source.onend = () => {
      this.push(null);
    };
  }
  // 当流想要拉取更多数据时将调用 _read()。
  // 在这种情况下，建议的 size 参数被忽略。
  _read(size) {
    this._source.readStart();
  }
}
```

`readable.push()` 方法用于将内容推入内部缓冲区。它可以由 [`readable._read()`][] 方法驱动。

对于不在对象模式下运行的流，如果 `readable.push()` 的 `chunk` 参数是 `undefined`，它将被视为空字符串或缓冲区。有关更多信息，请参阅 [`readable.push('')`][]。

#### 读取时的错误

在处理 [`readable._read()`][] 期间发生的错误必须通过 [`readable.destroy(err)`][readable-_destroy] 方法传播。从 [`readable._read()`][] 内部抛出 `Error` 或手动发出 `'error'` 事件会导致未定义的行为。

```js
const { Readable } = require('node:stream');

const myReadable = new Readable({
  read(size) {
    const err = checkSomeErrorCondition();
    if (err) {
      this.destroy(err);
    } else {
      // 做一些工作。
    }
  },
});
```

#### 计数流示例

<!--type=example-->

以下是一个基本的 `Readable` 流示例，它按升序发出从 1 到 1,000,000 的数字，然后结束。

```js
const { Readable } = require('node:stream');

class Counter extends Readable {
  constructor(opt) {
    super(opt);
    this._max = 1000000;
    this._index = 1;
  }

  _read() {
    const i = this._index++;
    if (i > this._max)
      this.push(null);
    else {
      const str = String(i);
      const buf = Buffer.from(str, 'ascii');
      this.push(buf);
    }
  }
}
```

### 实现双工流

[`Duplex`][] 流是同时实现 [`Readable`][] 和 [`Writable`][] 的流，例如 TCP socket 连接。

因为 JavaScript 不支持多重继承，所以扩展 `stream.Duplex` 类来实现 [`Duplex`][] 流（而不是扩展 `stream.Readable` _和_ `stream.Writable` 类）。

`stream.Duplex` 类原型继承自 `stream.Readable` 并寄生继承自 `stream.Writable`，但由于在 `stream.Writable` 上覆盖了 [`Symbol.hasInstance`]，`instanceof` 对于两个基类都能正常工作。

自定义 `Duplex` 流 _必须_ 调用 `new stream.Duplex([options])` 构造函数并实现 [`readable._read()`] 和 `writable._write()` 方法 _两者_。

#### `new stream.Duplex(options)`

<!-- YAML
changes:
  - version: v8.4.0
    pr-url: https://github.com/nodejs/node/pull/14636
    description: "现在支持 `readableHighWaterMark` 和 `writableHighWaterMark` 选项。"
-->

* `options` {Object} 传递给 `Writable` 和 `Readable` 构造函数。还有以下字段：
  * `allowHalfOpen` {boolean} 如果设置为 `false`，则当可读侧结束时，流将自动结束可写侧。**默认：** `true`。
  * `readable` {boolean} 设置 `Duplex` 是否应可读。**默认：** `true`。
  * `writable` {boolean} 设置 `Duplex` 是否应可写。**默认：** `true`。
  * `readableObjectMode` {boolean} 为流的可读侧设置 `objectMode`。如果 `objectMode` 为 `true` 则无效。**默认：** `false`。
  * `writableObjectMode` {boolean} 为流的可写侧设置 `objectMode`。如果 `objectMode` 为 `true` 则无效。**默认：** `false`。
  * `readableHighWaterMark` {number} 为流的可读侧设置 `highWaterMark`。如果提供了 `highWaterMark` 则无效。
  * `writableHighWaterMark` {number} 为流的可写侧设置 `highWaterMark`。如果提供了 `highWaterMark` 则无效。

<!-- eslint-disable no-useless-constructor -->

```cjs
const { Duplex } = require('node:stream');

class MyDuplex extends Duplex {
  constructor(options) {
    super(options);
    // ...
  }
}
```

<!-- eslint-disable no-useless-constructor -->

```mjs
import { Duplex } from 'node:stream';

class MyDuplex extends Duplex {
  constructor(options) {
    super(options);
    // ...
  }
}
```

或者，使用简化构造函数方法：

```js
const { Duplex } = require('node:stream');

const myDuplex = new Duplex({
  read(size) {
    // ...
  },
  write(chunk, encoding, callback) {
    // ...
  },
});
```

使用流水线时：

```js
const { Transform, pipeline } = require('node:stream');
const fs = require('node:fs');

pipeline(
  fs.createReadStream('object.json')
    .setEncoding('utf8'),
  new Transform({
    decodeStrings: false, // 接受字符串输入而不是 Buffers
    construct(callback) {
      this.data = '';
      callback();
    },
    transform(chunk, encoding, callback) {
      this.data += chunk;
      callback();
    },
    flush(callback) {
      try {
        // 确保是有效的 json。
        JSON.parse(this.data);
        this.push(this.data);
        callback();
      } catch (err) {
        callback(err);
      }
    },
  }),
  fs.createWriteStream('valid-object.json'),
  (err) => {
    if (err) {
      console.error('failed', err);
    } else {
      console.log('completed');
    }
  },
);
```

#### 双工流示例

以下说明了一个简单的 `Duplex` 流示例，它包装了一个假设的底层源对象，数据可以写入该对象，也可以从中读取数据，尽管使用的 API 与 Node.js 流不兼容。
以下说明了一个简单的 `Duplex` 流示例，它通过 [`Writable`] 接口缓冲传入的写入数据，然后通过 [`Readable`] 接口读回。

```js
const { Duplex } = require('node:stream');
const kSource = Symbol('source');

class MyDuplex extends Duplex {
  constructor(source, options) {
    super(options);
    this[kSource] = source;
  }

  _write(chunk, encoding, callback) {
    // 底层源只处理字符串。
    if (Buffer.isBuffer(chunk))
      chunk = chunk.toString();
    this[kSource].writeSomeData(chunk);
    callback();
  }

  _read(size) {
    this[kSource].fetchSomeData(size, (data, encoding) => {
      this.push(Buffer.from(data, encoding));
    });
  }
}
```

`Duplex` 流最重要的方面是 `Readable` 和 `Writable` 侧尽管共存于单个对象实例中，但彼此独立运行。

#### 对象模式双工流

对于 `Duplex` 流，`objectMode` 可以分别使用 `readableObjectMode` 和 `writableObjectMode` 选项专门为 `Readable` 或 `Writable` 侧设置。

例如，在以下示例中，创建了一个新的 `Transform` 流（它是 [`Duplex`] 流的一种类型），它具有对象模式 `Writable` 侧，接受 JavaScript 数字，这些数字在 `Readable` 侧转换为十六进制字符串。

```js
const { Transform } = require('node:stream');

// 所有 Transform 流也是 Duplex 流。
const myTransform = new Transform({
  writableObjectMode: true,

  transform(chunk, encoding, callback) {
    // 如有必要，将 chunk 强制转换为数字。
    chunk |= 0;

    // 将 chunk 转换为其他内容。
    const data = chunk.toString(16);

    // 将数据推入可读队列。
    callback(null, '0'.repeat(data.length % 2) + data);
  },
});

myTransform.setEncoding('ascii');
myTransform.on('data', (chunk) => console.log(chunk));

myTransform.write(1);
// 打印：01
myTransform.write(10);
// 打印：0a
myTransform.write(100);
// 打印：64
```

### 实现转换流

[`Transform`] 流是一种 [`Duplex`] 流，其输出以某种方式从输入计算得出。示例包括 [zlib] 流或 [crypto] 流，它们压缩、加密或解密数据。

输出不必与输入大小相同、块数相同或同时到达。例如，`Hash` 流将永远只有一个输出块，该块在输入结束时提供。`zlib` 流将产生比其输入小得多或大得多的输出。

`stream.Transform` 类被扩展以实现 [`Transform`] 流。

`stream.Transform` 类原型继承自 `stream.Duplex` 并实现自己的 `writable._write()` 和 [`readable._read()`] 方法版本。自定义 `Transform` 实现 _必须_ 实现 [`transform._transform()`][stream-_transform] 方法并 _可以_ 实现 [`transform._flush()`][stream-_flush] 方法。

在使用 `Transform` 流时必须小心，因为写入流的数据可能导致流的可写侧暂停，如果可读侧的输出未被消费。

#### `new stream.Transform([options])`

* `options` {Object} 传递给 `Writable` 和 `Readable` 构造函数。还有以下字段：
  * `transform` {Function} [`stream._transform()`][stream-_transform] 方法的实现。
  * `flush` {Function} [`stream._flush()`][stream-_flush] 方法的实现。

<!-- eslint-disable no-useless-constructor -->

```cjs
const { Transform } = require('node:stream');

class MyTransform extends Transform {
  constructor(options) {
    super(options);
    // ...
  }
}
```

<!-- eslint-disable no-useless-constructor -->

```mjs
import { Transform } from 'node:stream';

class MyTransform extends Transform {
  constructor(options) {
    super(options);
    // ...
  }
}
```

或者，使用简化构造函数方法：

```js
const { Transform } = require('node:stream');

const myTransform = new Transform({
  transform(chunk, encoding, callback) {
    // ...
  },
});
```

#### 事件：finish

[finish] 事件来自 Transform 类。finish 事件在所有数据输出后发出，这发生在 [._flush][stream-_flush] 中的回调被调用之后。在出错的情况下，不应发出 finish。

#### 事件：end

[end] 事件来自 Transform 类。在调用 [push(null)][stream-end] 且所有块都由 [._transform][stream-_transform] 处理后，发出 end 事件。在出错的情况下，不应发出 end。

#### ._flush()

* _flush {Function} 当剩余数据已刷新时调用的回调函数（可选带错误参数和数据）。

此函数不得由应用程序代码直接调用。它应由子类实现，并仅由内部 _readableState 类方法调用。

在某些情况下，转换操作可能需要在流结束时发出额外的一点数据。例如，zlib 压缩流将存储用于优化压缩输出的内部状态量。然而，当流结束时，需要刷新该额外数据，以便压缩数据完整。

自定义 [Transform] 实现可以实现 _flush 方法。当没有更多写入数据要消费时，但在发出信号表示 [Writable] 流结束的 [finish] 事件之前，将调用此方法。

在 Transform 实现中，_flush 方法可以调用零次或多次，视情况而定。当刷新操作完成时，必须调用 callback 函数。

_flush 方法以前缀下划线开头，因为它对于定义它的类是内部的，用户程序绝不应直接调用它。

#### _transform(chunk, encoding, callback)

* chunk {Buffer|string|any} 要转换的 chunk，由传递给 [write][stream-write] 的参数转换而来。如果流的 decodeStrings 选项为 false 或流在对象模式下运行，则 chunk 不会被转换 & 将是传递给 [write][stream-write] 的任何内容。
* encoding {string} 如果 chunk 是字符串，则这是编码类型。如果 chunk 是 buffer，则这是特殊值 buffer。在这种情况下忽略它。
* callback {Function} 在提供的 chunk 处理完成后调用的回调函数（可选带错误参数和数据）。

此函数不得由应用程序代码直接调用。它应由子类实现，并仅由内部 _write 类方法调用。

所有 Transform 流实现必须提供 _transform 方法以接受输入并产生输出。_transform 实现处理正在写入的字节，计算输出，然后使用 push 方法将该输出传递给可读部分。

_push 方法可以调用零次或多次以从单个输入块生成输出，具体取决于作为块的结果要输出多少。

有可能不会从任何给定的输入数据块生成输出。

仅当当前块完全消耗时才必须调用 callback 函数。传递给 callback 的第一个参数必须是 Error 对象（如果在处理输入时发生错误）或 null（否则）。如果将第二个参数传递给 callback，它将被转发到 _write 方法，但仅当第一个参数为 falsy 时。换句话说，以下等价：

```js
transform.prototype._transform = function(data, encoding, callback) {
  this.push(data);
  callback();
};

transform.prototype._transform = function(data, encoding, callback) {
  callback(null, data);
};
```

`transform._transform()` 方法以前缀下划线开头，因为它对于定义它的类是内部的，用户程序绝不应直接调用它。

`transform._transform()` 绝不会并行调用；流实现了一个队列机制，要接收下一个块，必须调用 `callback`，无论是同步还是异步。

#### 类：`stream.PassThrough`

`stream.PassThrough` 类是 [`Transform`] 流的简单实现，它简单地将输入字节传递到输出。其主要目的是用于示例和测试，但在某些用例中，`stream.PassThrough` 可用作新型流的构建块。

## 补充说明

<!--type=misc-->

### 流与异步生成器和异步迭代器的兼容性

随着 JavaScript 中对异步生成器和迭代器的支持，异步生成器实际上已成为语言层面的一等流构造。

下面提供了一些使用 Node.js 流与异步生成器和异步迭代器的常见互操作案例。

#### 使用异步迭代器消费 readable 流

```js
(async function() {
  for await (const chunk of readable) {
    console.log(chunk);
  }
})();
```

异步迭代器会在流上注册一个永久错误处理程序，以防止任何未处理的销毁后错误。

#### 使用异步生成器创建 readable 流

可以使用 `Readable.from()` 工具方法从异步生成器创建 Node.js 可读流：

```js
const { Readable } = require('node:stream');

const ac = new AbortController();
const signal = ac.signal;

async function * generate() {
  yield 'a';
  await someLongRunningFn({ signal });
  yield 'b';
  yield 'c';
}

const readable = Readable.from(generate());
readable.on('close', () => {
  ac.abort();
});

readable.on('data', (chunk) => {
  console.log(chunk);
});
```

#### 从异步迭代器管道传输到可写流

当从异步迭代器写入可写流时，确保正确处理背压和错误。[`stream.pipeline()`] 抽象化了背压和与背压相关错误的处理：

```js
const fs = require('node:fs');
const { pipeline } = require('node:stream');
const { pipeline: pipelinePromise } = require('node:stream/promises');

const writable = fs.createWriteStream('./file');

const ac = new AbortController();
const signal = ac.signal;

const iterator = createIterator({ signal });

// 回调模式
pipeline(iterator, writable, (err, value) => {
  if (err) {
    console.error(err);
  } else {
    console.log(value, '返回的值');
  }
}).on('close', () => {
  ac.abort();
});

// Promise 模式
pipelinePromise(iterator, writable)
  .then((value) => {
    console.log(value, '返回的值');
  })
  .catch((err) => {
    console.error(err);
    ac.abort();
  });
```

<!--type=misc-->

### 与旧版 Node.js 的兼容性

<!--type=misc-->

在 Node.js 0.10 之前，`Readable` 流接口更简单，但功能也更少且用处更小。

* [`'data'`] 事件会立即开始发射，而不是等待调用 [`stream.read()`][stream-read] 方法。需要执行一定工作量来决定如何处理数据的应用程序需要将读取的数据存储到缓冲区中，以免数据丢失。
* [`stream.pause()`][stream-pause] 方法是建议性的，而不是强制保证的。这意味着即使流处于暂停状态，仍然需要准备好接收 [`'data'`] 事件。

在 Node.js 0.10 中，添加了 [`Readable`] 类。为了与旧版 Node.js 程序向后兼容，当添加 [`'data'`] 事件处理程序或调用 [`stream.resume()`][stream-resume] 方法时，`Readable` 流会切换到“流动模式”。其效果是，即使不使用新的 [`stream.read()`][stream-read] 方法和 [`'readable'`] 事件，也不再需要担心丢失 [`'data'`] 块。

虽然大多数应用程序将继续正常运行，但这在以下条件下引入了一种边缘情况：

* 未添加 [`'data'`] 事件监听器。
* 从未调用 [`stream.resume()`][stream-resume] 方法。
* 流未管道传输到任何可写目标。

例如，考虑以下代码：

```js
// 警告！已损坏！
net.createServer((socket) => {

  // 我们添加了一个 'end' 监听器，但从不消费数据。
  socket.on('end', () => {
    // 永远不会到达这里。
    socket.end('The message was received but was not processed.\n');
  });

}).listen(1337);
```

在 Node.js 0.10 之前，传入的消息数据会被简单地丢弃。然而，在 Node.js 0.10 及更高版本中，socket 将永远保持暂停状态。

这种情况下的解决方法是调用 [`stream.resume()`][stream-resume] 方法来开始数据流：

```js
// 解决方法。
net.createServer((socket) => {
  socket.on('end', () => {
    socket.end('The message was received but was not processed.\n');
  });

  // 开始数据流，将其丢弃。
  socket.resume();
}).listen(1337);
```

除了新的 `Readable` 流切换到流动模式外，还可以使用 [`readable.wrap()`][`stream.wrap()`] 方法将 0.10 之前风格的流包装在 `Readable` 类中。

### `readable.read(0)`

在某些情况下，有必要触发底层 readable 流机制的刷新，而不实际消费任何数据。在这种情况下，可以调用 `readable.read(0)`，它将始终返回 `null`。

如果内部读取缓冲区低于 `highWaterMark`，并且流当前未读取，则调用 `stream.read(0)` 将触发低级 [`stream._read()`][stream-_read] 调用。

虽然大多数应用程序几乎永远不需要这样做，但在 Node.js 中存在这种情况，特别是在 `Readable` 流类内部。

### `readable.push('')`

不建议使用 `readable.push('')`。

将零字节 {string}、{Buffer}、{TypedArray} 或 {DataView} 推送到非 object 模式的流会产生有趣的副作用。因为它 _是_ 对 [`readable.push()`][stream-push] 的调用，该调用将结束读取过程。然而，因为参数是空字符串，所以没有数据添加到 readable 缓冲区，因此用户没有什么可消费的。

### 调用 `readable.setEncoding()` 后 `highWaterMark` 的差异

使用 `readable.setEncoding()` 将改变 `highWaterMark` 在非 object 模式下的行为方式。

通常，当前缓冲区的大小是相对于 `highWaterMark` 按 _字节_ 测量的。但是，在调用 `setEncoding()` 后，比较函数将开始按 _字符_ 测量缓冲区的大小。

这在 `latin1` 或 `ascii` 的常见情况下不是问题。但是，当处理可能包含多字节字符的字符串时，建议注意此行为。

[流使用者 API]: #api-for-stream-consumers
[流实现者 API]: #api-for-stream-implementers
[兼容性]: #compatibility-with-older-nodejs-versions
[客户端 HTTP 请求]: http.md#class-httpclientrequest
[服务器 HTTP 响应]: http.md#class-httpserverresponse
[TCP 套接字]: net.md#class-netsocket
[三种状态]: #three-states
[`'data'`]: #event-data
[`'drain'`]: #event-drain
[`'end'`]: #event-end
[`'finish'`]: #event-finish
[`'readable'`]: #event-readable
[`Duplex`]: #class-streamduplex
[`ERR_STREAM_ITER_MISSING_FLAG`]: errors.md#err_stream_iter_missing_flag
[`EventEmitter`]: events.md#class-eventemitter
[`Readable`]: #class-streamreadable
[`Stream.toAsyncStreamable`]: stream_iter.md#streamtoasyncstreamable
[`Symbol.hasInstance`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/hasInstance
[`Transform`]: #class-streamtransform
[`Writable`]: #class-streamwritable
[`fs.createReadStream()`]: fs.md#fscreatereadstreampath-options
[`fs.createWriteStream()`]: fs.md#fscreatewritestreampath-options
[`net.Socket`]: net.md#class-netsocket
[`process.stderr`]: process.md#processstderr
[`process.stdin`]: process.md#processstdin
[`process.stdout`]: process.md#processstdout
[`readable._read()`]: #readable_readsize
[`readable.compose(stream)`]: #readablecomposestream-options
[`readable.map`]: #readablemapfn-options
[`readable.push('')`]: #readablepush
[`readable.setEncoding()`]: #readablesetencodingencoding
[`stream.Readable.from()`]: #streamreadablefromiterable-options
[`stream.addAbortSignal()`]: #streamaddabortsignalsignal-stream
[`stream.compose(...streams)`]: #streamcomposestreams
[`stream.cork()`]: #writablecork
[`stream.duplexPair()`]: #streamduplexpairoptions
[`stream.finished()`]: #streamfinishedstream-options-callback
[`stream.getDefaultHighWaterMark()`]: #streamgetdefaulthighwatermarkobjectmode
[`stream.pipe()`]: #readablepipedestination-options
[`stream.pipeline()`]: #streampipelinesource-transforms-destination-callback
[`stream.uncork()`]: #writableuncork
[`stream.unpipe()`]: #readableunpipedestination
[`stream.wrap()`]: #readablewrapstream
[`stream/iter`]: stream_iter.md
[`writable._final()`]: #writable_finalcallback
[`writable._write()`]: #writable_writechunk-encoding-callback
[`writable._writev()`]: #writable_writevchunks-callback
[`writable.cork()`]: #writablecork
[`writable.end()`]: #writableendchunk-encoding-callback
[`writable.uncork()`]: #writableuncork
[`writable.writableFinished`]: #writablewritablefinished
[`zlib.createDeflate()`]: zlib.md#zlibcreatedeflateoptions
[子进程 stdin]: child_process.md#subprocessstdin
[子进程 stdout 和 stderr]: child_process.md#subprocessstdout
[crypto]: crypto.md
[fs 读流]: fs.md#class-fsreadstream
[fs 写流]: fs.md#class-fswritestream
[http-incoming-message]: http.md#class-httpincomingmessage
[hwm-gotcha]: #highwatermark-discrepancy-after-calling-readablesetencoding
[object-mode]: #object-mode
[readable-_construct]: #readable_constructcallback
[readable-_destroy]: #readable_destroyerr-callback
[readable-destroy]: #readabledestroyerror
[stream-_final]: #writable_finalcallback
[stream-_flush]: #transform_flushcallback
[stream-_read]: #readable_readsize
[stream-_transform]: #transform_transformchunk-encoding-callback
[stream-_write]: #writable_writechunk-encoding-callback
[stream-_writev]: #writable_writevchunks-callback
[stream-end]: #writableendchunk-encoding-callback
[stream-finished]: #streamfinishedstream-options-callback
[stream-finished-promise]: #streamfinishedstream-options
[stream-iter-from]: stream_iter.md#frominput
[stream-pause]: #readablepause
[stream-pipeline]: #streampipelinesource-transforms-destination-callback
[stream-pipeline-promise]: #streampipelinesource-transforms-destination-options
[stream-push]: #readablepushchunk-encoding
[stream-read]: #readablereadsize
[stream-resume]: #readableresume
[stream-uncork]: #writableuncork
[stream-write]: #writablewritechunk-encoding-callback
[writable-_construct]: #writable_constructcallback
[writable-_destroy]: #writable_destroyerr-callback
[writable-destroy]: #writabledestroyerror
[writable-new]: #new-streamwritableoptions
[zlib]: zlib.md
