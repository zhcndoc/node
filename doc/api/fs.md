# 文件系统

<!--introduced_in=v0.10.0-->

> 稳定性：2 - 稳定

<!--name=fs-->

<!-- source_link=lib/fs.js -->

`node:fs` 模块启用了一种基于标准 POSIX 函数建模的文件系统交互方式。

要使用基于 Promise 的 API：

```mjs
import * as fs from 'node:fs/promises';
```

```cjs
const fs = require('node:fs/promises');
```

要使用回调和同步 API：

```mjs
import * as fs from 'node:fs';
```

```cjs
const fs = require('node:fs');
```

所有文件系统操作都有同步、回调和基于 Promise 的形式，并且都可以使用 CommonJS 语法和 ES6 模块 (ESM) 访问。

## Promise 示例

基于 Promise 的操作返回一个 promise，当异步操作完成时该 promise 会被 fulfilled。

```mjs
import { unlink } from 'node:fs/promises';

try {
  await unlink('/tmp/hello');
  console.log('成功删除 /tmp/hello');
} catch (error) {
  console.error('发生了错误：', error.message);
}
```

```cjs
const { unlink } = require('node:fs/promises');

(async function(path) {
  try {
    await unlink(path);
    console.log(`成功删除 ${path}`);
  } catch (error) {
    console.error('发生了错误：', error.message);
  }
})('/tmp/hello');
```

## 回调示例

回调形式将完成回调函数作为其最后一个参数，并异步调用操作。传递给完成回调的参数取决于方法，但第一个参数始终保留给异常。如果操作成功完成，则第一个参数为 `null` 或 `undefined`。

```mjs
import { unlink } from 'node:fs';

unlink('/tmp/hello', (err) => {
  if (err) throw err;
  console.log('成功删除 /tmp/hello');
});
```

```cjs
const { unlink } = require('node:fs');

unlink('/tmp/hello', (err) => {
  if (err) throw err;
  console.log('成功删除 /tmp/hello');
});
```

当需要最大性能（在执行时间和内存分配方面）时，`node:fs` 模块 API 的基于回调的版本优于使用 Promise API。

## 同步示例

同步 API 会阻塞 Node.js 事件循环和进一步的 JavaScript 执行，直到操作完成。异常会立即抛出，可以使用 `try…catch` 处理，也可以允许其向上冒泡。

```mjs
import { unlinkSync } from 'node:fs';

try {
  unlinkSync('/tmp/hello');
  console.log('成功删除 /tmp/hello');
} catch (err) {
  // 处理错误
}
```

```cjs
const { unlinkSync } = require('node:fs');

try {
  unlinkSync('/tmp/hello');
  console.log('成功删除 /tmp/hello');
} catch (err) {
  // 处理错误
}
```

## Promises API

<!-- YAML
added: v10.0.0
changes:
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/31553
    description: "暴露为 `require('fs/promises')`。"
  - version:
    - v11.14.0
    - v10.17.0
    pr-url: https://github.com/nodejs/node/pull/26581
    description: 此 API 不再是实验性的。
  - version: v10.1.0
    pr-url: https://github.com/nodejs/node/pull/20504
    description: "该 API 仅可通过 `require('fs').promises` 访问。"
-->

`fs/promises` API 提供返回 promises 的异步文件系统方法。

Promise API 使用底层的 Node.js 线程池在事件循环线程之外执行文件系统操作。这些操作不同步也不是线程安全的。在对同一文件执行多个并发修改时必须小心，否则可能会发生数据损坏。

### 类：`FileHandle`

<!-- YAML
added: v10.0.0
-->

{FileHandle} 对象是数字文件描述符的对象包装器。

{FileHandle} 对象的实例由 `fsPromises.open()` 方法创建。

所有 {FileHandle} 对象都是 {EventEmitter}。

如果未使用 `filehandle.close()` 方法关闭 {FileHandle}，它将尝试自动关闭文件描述符并发出进程警告，有助于防止内存泄漏。请不要依赖此行为，因为它可能不可靠且文件可能未关闭。相反，始终显式关闭 {FileHandle}。Node.js 可能会在未来更改此行为。

#### 事件：`'close'`

<!-- YAML
added: v15.4.0
-->

当 {FileHandle} 已关闭且不再可用时，会发出 `'close'` 事件。

#### `filehandle.appendFile(data[, options])`

<!-- YAML
added: v10.0.0
changes:
  - version:
    - v21.1.0
    - v20.10.0
    pr-url: https://github.com/nodejs/node/pull/50095
    description: "现在支持 `flush` 选项。"
  - version:
      - v15.14.0
      - v14.18.0
    pr-url: https://github.com/nodejs/node/pull/37490
    description: "`data` 参数支持 `AsyncIterable`、`Iterable` 和 `Stream`。"
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/31030
    description: "`data` 参数不再将不支持的输入强制转换为字符串。"
-->

* `data` {string|Buffer|TypedArray|DataView|AsyncIterable|Iterable|Stream}
* `options` {Object|string}
  * `encoding` {string|null} **默认：** `'utf8'`
  * `signal` {AbortSignal|undefined} 允许中止进行中的 writeFile。**默认：** `undefined`
* 返回：{Promise} 成功时 fulfilled 为 `undefined`。

[`filehandle.writeFile()`][] 的别名。

当操作文件句柄时，模式不能更改为 [`fsPromises.open()`][] 所设置的模式。因此，这等同于 [`filehandle.writeFile()`][]。

#### `filehandle.chmod(mode)`

<!-- YAML
added: v10.0.0
-->

* `mode` {integer} 文件模式位掩码。
* 返回：{Promise} 成功时 fulfilled 为 `undefined`。

修改文件上的权限。参见 chmod(2)。

#### `filehandle.chown(uid, gid)`

<!-- YAML
added: v10.0.0
-->

* `uid` {integer} 文件新所有者的用户 id。
* `gid` {integer} 文件新所属组的组 id。
* 返回：{Promise} 成功时 fulfilled 为 `undefined`。

更改文件的所有权。chown(2) 的包装器。

#### `filehandle.close()`

<!-- YAML
added: v10.0.0
-->

* 返回：{Promise} 成功时 fulfilled 为 `undefined`。

在等待句柄上的任何待处理操作完成后关闭文件句柄。

```mjs
import { open } from 'node:fs/promises';

let filehandle;
try {
  filehandle = await open('thefile.txt', 'r');
} finally {
  await filehandle?.close();
}
```

#### `filehandle.createReadStream([options])`

<!-- YAML
added: v16.11.0
-->

* `options` {Object}
  * `encoding` {string} **默认：** `null`
  * `autoClose` {boolean} **默认：** `true`
  * `emitClose` {boolean} **默认：** `true`
  * `start` {integer}
  * `end` {integer} **默认：** `Infinity`
  * `highWaterMark` {integer} **默认：** `64 * 1024`
  * `signal` {AbortSignal|undefined} **默认：** `undefined`
* 返回：{fs.ReadStream}

`options` 可以包括 `start` 和 `end` 值，以便从文件中读取字节范围而不是整个文件。`start` 和 `end` 都包含在内并从 0 开始计数，允许的值在 \[0, [`Number.MAX_SAFE_INTEGER`][]] 范围内。如果省略 `start` 或为 `undefined`，`filehandle.createReadStream()` 将从当前文件位置顺序读取。`encoding` 可以是 {Buffer} 接受的任何值。

如果 {FileHandle} 指向仅支持阻塞读取的字符设备（例如键盘或声卡），则读取操作直到数据可用才会完成。这可能会阻止进程退出并且流无法自然关闭。

默认情况下，流在被销毁后会发出 `'close'` 事件。将 `emitClose` 选项设置为 `false` 以更改此行为。

```mjs
import { open } from 'node:fs/promises';

const fd = await open('/dev/input/event0');
// 从某个字符设备创建流。
const stream = fd.createReadStream();
setTimeout(() => {
  stream.close(); // 这可能不会关闭流。
  // 人工标记流结束，就好像底层资源本身
  // 指示了文件结束一样，允许流关闭。
  // 这不会取消待处理的读取操作，如果存在这样的
  // 操作，进程可能仍然无法成功退出
  // 直到它完成。
  stream.push(null);
  stream.read(0);
}, 100);
```

如果 `autoClose` 为 false，则即使出现错误也不会关闭文件描述符。应用程序有责任关闭它并确保没有文件描述符泄漏。如果 `autoClose` 设置为 true（默认行为），则在 `'error'` 或 `'end'` 时文件描述符将自动关闭。

读取一个 100 字节长的文件的最后 10 字节的示例：

```mjs
import { open } from 'node:fs/promises';

const fd = await open('sample.txt');
fd.createReadStream({ start: 90, end: 99 });
```

#### `filehandle.createWriteStream([options])`

<!-- YAML
added: v16.11.0
changes:
  - version:
    - v21.0.0
    - v20.10.0
    pr-url: https://github.com/nodejs/node/pull/50093
    description: "现在支持 `flush` 选项。"
-->

* `options` {Object}
  * `encoding` {string} **默认：** `'utf8'`
  * `autoClose` {boolean} **默认：** `true`
  * `emitClose` {boolean} **默认：** `true`
  * `start` {integer}
  * `highWaterMark` {number} **默认：** `16384`
  * `flush` {boolean} 如果为 `true`，则在关闭之前刷新底层文件描述符。**默认：** `false`。
* 返回：{fs.WriteStream}

`options` 还可以包括一个 `start` 选项，以允许在文件开头之后的某个位置写入数据，允许的值在 \[0, [`Number.MAX_SAFE_INTEGER`][]] 范围内。修改文件而不是替换它可能需要将 `flags` `open` 选项设置为 `r+` 而不是默认的 `r`。`encoding` 可以是 {Buffer} 接受的任何值。

如果 `autoClose` 设置为 true（默认行为），则在 `'error'` 或 `'finish'` 时文件描述符将自动关闭。如果 `autoClose` 为 false，则即使出现错误也不会关闭文件描述符。应用程序有责任关闭它并确保没有文件描述符泄漏。

默认情况下，流在被销毁后会发出 `'close'` 事件。将 `emitClose` 选项设置为 `false` 以更改此行为。

#### `filehandle.datasync()`

<!-- YAML
added: v10.0.0
-->

* 返回：{Promise} 成功时 fulfilled 为 `undefined`。

强制所有当前排队的与文件关联的 I/O 操作进入操作系统的同步 I/O 完成状态。有关详细信息，请参阅 POSIX fdatasync(2) 文档。

与 `filehandle.sync` 不同，此方法不刷新修改后的元数据。

#### `filehandle.fd`

<!-- YAML
added: v10.0.0
-->

* 类型：{number} 由 {FileHandle} 对象管理的数字文件描述符。

#### `filehandle.pull([...transforms][, options])`

<!-- YAML
added:
 - v25.9.0
-->

> 稳定性：1 - 实验性

* `...transforms` {Function|Object} 可选的转换，通过 [`stream/iter pull()`][] 应用。
* `options` {Object}
  * `signal` {AbortSignal}
  * `autoClose` {boolean} 当流结束时关闭文件句柄。**默认：** `false`。
  * `start` {number} 开始读取的字节偏移量。指定时，读取使用显式定位（`pread` 语义）。**默认：** 当前文件位置。
  * `limit` {number} 结束迭代器之前要读取的最大字节数。当已交付 `limit` 字节或到达 EOF 时读取停止，以先到者为准。**默认：** 读取直到 EOF。
  * `chunkSize` {number} 为每次读取操作分配的缓冲区大小（字节）。**默认：** `131072` (128 KB)。
* 返回：{AsyncIterable\<Uint8Array\[]>}

使用 [`node:stream/iter`][] pull 模型将文件内容作为异步迭代器返回。读取以 `chunkSize` 字节块（默认 128 KB）执行。如果提供了转换，它们将通过 [`stream/iter pull()`][] 应用。

当迭代器被消费时文件句柄被锁定，当迭代完成、发生错误或消费者中断时解锁。

此函数仅在启用 `--experimental-stream-iter` 标志时可用。

```mjs
import { open } from 'node:fs/promises';
import { text } from 'node:stream/iter';
import { compressGzip } from 'node:zlib/iter';

const fh = await open('input.txt', 'r');

// 读取为文本
console.log(await text(fh.pull({ autoClose: true })));

// 从字节 100 开始读取 1 KB
const fh2 = await open('input.txt', 'r');
console.log(await text(fh2.pull({ start: 100, limit: 1024, autoClose: true })));

// 读取并压缩
const fh3 = await open('input.txt', 'r');
const compressed = fh3.pull(compressGzip(), { autoClose: true });
```

```cjs
const { open } = require('node:fs/promises');
const { text } = require('node:stream/iter');
const { compressGzip } = require('node:zlib/iter');

async function run() {
  const fh = await open('input.txt', 'r');

  // 读取为文本
  console.log(await text(fh.pull({ autoClose: true })));

  // 从字节 100 开始读取 1 KB
  const fh2 = await open('input.txt', 'r');
  console.log(await text(fh2.pull({ start: 100, limit: 1024, autoClose: true })));

  // 读取并压缩
  const fh3 = await open('input.txt', 'r');
  const compressed = fh3.pull(compressGzip(), { autoClose: true });
}

run().catch(console.error);
```

#### `filehandle.pullSync([...transforms][, options])`

<!-- YAML
added:
 - v25.9.0
-->

> 稳定性：1 - 实验性

* `...transforms` {Function|Object} 可选的转换，通过 [`stream/iter pullSync()`][] 应用。
* `options` {Object}
  * `autoClose` {boolean} 当流结束时关闭文件句柄。**默认：** `false`。
  * `start` {number} 开始读取的字节偏移量。指定时，读取使用显式定位。**默认：** 当前文件位置。
  * `limit` {number} 结束迭代器之前要读取的最大字节数。**默认：** 读取直到 EOF。
  * `chunkSize` {number} 为每次读取操作分配的缓冲区大小（字节）。**默认：** `131072` (128 KB)。
* 返回：{Iterable\<Uint8Array\[]>}

[`filehandle.pull()`][] 的同步对应物。返回一个同步迭代器，使用主线程上的同步 I/O 读取文件。读取以 `chunkSize` 字节块（默认 128 KB）执行。

当迭代器被消费时文件句柄被锁定。与异步 `pull()` 不同，此方法不支持 `AbortSignal`，因为所有操作都是同步的。

此函数仅在启用 `--experimental-stream-iter` 标志时可用。

```mjs
import { open } from 'node:fs/promises';
import { textSync, pipeToSync } from 'node:stream/iter';
import { compressGzipSync, decompressGzipSync } from 'node:zlib/iter';

const fh = await open('input.txt', 'r');

// 读取为文本（同步）
console.log(textSync(fh.pullSync({ autoClose: true })));

// 同步压缩管道：file -> gzip -> file
const src = await open('input.txt', 'r');
const dst = await open('output.gz', 'w');
pipeToSync(src.pullSync(compressGzipSync(), { autoClose: true }), dst.writer({ autoClose: true }));
```

```cjs
const { open } = require('node:fs/promises');
const { textSync, pipeToSync } = require('node:stream/iter');
const { compressGzipSync, decompressGzipSync } = require('node:zlib/iter');

async function run() {
  const fh = await open('input.txt', 'r');

  // 读取为文本（同步）
  console.log(textSync(fh.pullSync({ autoClose: true })));

  // 同步压缩管道：file -> gzip -> file
  const src = await open('input.txt', 'r');
  const dst = await open('output.gz', 'w');
  pipeToSync(
    src.pullSync(compressGzipSync(), { autoClose: true }),
    dst.writer({ autoClose: true }),
  );
}

run().catch(console.error);
```

#### `filehandle.read(buffer, offset, length, position)`

<!-- YAML
added: v10.0.0
changes:
  - version: v21.0.0
    pr-url: https://github.com/nodejs/node/pull/42835
    description: "接受 bigint 值作为 `position`。"
-->

* `buffer` {Buffer|TypedArray|DataView} 将填充读取的文件数据的缓冲区。
* `offset` {integer} 开始在缓冲区中填充的位置。**默认：** `0`
* `length` {integer} 要读取的字节数。**默认：** `buffer.byteLength - offset`
* `position` {integer|bigint|null} 开始从文件读取数据的位置。如果为 `null` 或 `-1`，将从当前文件位置读取数据，并且位置将更新。如果 `position` 是非负整数，则当前文件位置将保持不变。**默认：** `null`
* 返回：{Promise} 成功时 fulfilled 为一个包含两个属性的对象：
  * `bytesRead` {integer} 读取的字节数
  * `buffer` {Buffer|TypedArray|DataView} 对传入的 `buffer` 参数的引用。

从文件读取数据并将其存储在给定的缓冲区中。

如果文件未并发修改，则当读取的字节数为零时到达文件末尾。

#### `filehandle.read([options])`

<!-- YAML
added:
 - v13.11.0
 - v12.17.0
changes:
  - version: v21.0.0
    pr-url: https://github.com/nodejs/node/pull/42835
    description: "接受 bigint 值作为 `position`。"
-->

* `options` {Object}
  * `buffer` {Buffer|TypedArray|DataView} 将填充读取的文件数据的缓冲区。**默认：** `Buffer.alloc(16384)`
  * `offset` {integer} 开始在缓冲区中填充的位置。**默认：** `0`
  * `length` {integer} 要读取的字节数。**默认：** `buffer.byteLength - offset`
  * `position` {integer|bigint|null} 开始从文件读取数据的位置。如果为 `null` 或 `-1`，将从当前文件位置读取数据，并且位置将更新。如果 `position` 是非负整数，则当前文件位置将保持不变。**默认：**: `null`
* 返回：{Promise} 成功时 fulfilled 为一个包含两个属性的对象：
  * `bytesRead` {integer} 读取的字节数
  * `buffer` {Buffer|TypedArray|DataView} 对传入的 `buffer` 参数的引用。

从文件读取数据并将其存储在给定的缓冲区中。

如果文件未并发修改，则当读取的字节数为零时到达文件末尾。

#### `filehandle.read(buffer[, options])`

<!-- YAML
added:
  - v18.2.0
  - v16.17.0
changes:
  - version: v21.0.0
    pr-url: https://github.com/nodejs/node/pull/42835
    description: "接受 bigint 值作为 `position`。"
-->

* `buffer` {Buffer|TypedArray|DataView} 将填充读取的文件数据的缓冲区。
* `options` {Object}
  * `offset` {integer} 开始在缓冲区中填充的位置。**默认：** `0`
  * `length` {integer} 要读取的字节数。**默认：** `buffer.byteLength - offset`
  * `position` {integer|bigint|null} 开始从文件读取数据的位置。如果为 `null` 或 `-1`，将从当前文件位置读取数据，并且位置将更新。如果 `position` 是非负整数，则当前文件位置将保持不变。**默认：**: `null`
* 返回：{Promise} 成功时 fulfilled 为一个包含两个属性的对象：
  * `bytesRead` {integer} 读取的字节数
  * `buffer` {Buffer|TypedArray|DataView} 对传入的 `buffer` 参数的引用。

从文件读取数据并将其存储在给定的缓冲区中。

如果文件未并发修改，则当读取的字节数为零时到达文件末尾。

#### `filehandle.readableWebStream([options])`

<!-- YAML
added: v17.0.0
changes:

  - version:
      - v24.0.0
      - v22.17.0
    pr-url: https://github.com/nodejs/node/pull/57513
    description: 标记 API 为稳定。
  - version:
    - v23.8.0
    - v22.15.0
    pr-url: https://github.com/nodejs/node/pull/55461
    description: 移除了创建 'bytes' 流的选项。流现在始终是 'bytes' 流。
  - version:
    - v20.0.0
    - v18.17.0
    pr-url: https://github.com/nodejs/node/pull/46933
    description: 添加了创建 'bytes' 流的选项。
-->

* `options` {Object}
  * `autoClose` {boolean} 当为 true 时，导致 {FileHandle} 在流关闭时关闭。**默认：** `false`
* 返回：{ReadableStream}

返回一个面向字节的 `ReadableStream`，可用于读取文件的内容。

如果多次调用此方法或在 `FileHandle` 关闭或正在关闭后调用，将抛出错误。

```mjs
import {
  open,
} from 'node:fs/promises';

const file = await open('./some/file/to/read');

for await (const chunk of file.readableWebStream())
  console.log(chunk);

await file.close();
```

```cjs
const {
  open,
} = require('node:fs/promises');

(async () => {
  const file = await open('./some/file/to/read');

  for await (const chunk of file.readableWebStream())
    console.log(chunk);

  await file.close();
})();
```

虽然 `ReadableStream` 会将文件读取到完成，但它不会自动关闭 `FileHandle`。除非 `autoClose` 选项设置为 `true`，否则用户代码仍必须调用 `fileHandle.close()` 方法。

#### `filehandle.readFile(options)`

<!-- YAML
added: v10.0.0
-->

* `options` {Object|string}
  * `encoding` {string|null} **默认：** `null`
  * `signal` {AbortSignal} 允许中止进行中的 readFile
* 返回：{Promise} 成功读取时 fulfilled 为文件的内容。如果未指定编码（使用 `options.encoding`），则数据作为 {Buffer} 对象返回。否则，数据将是字符串。

异步读取文件的全部内容。

如果 `options` 是字符串，则它指定 `encoding`。

{FileHandle} 必须支持读取。

如果在文件句柄上进行了一次或多次 `filehandle.read()` 调用，然后进行了 `filehandle.readFile()` 调用，则数据将从当前位置读取到文件末尾。它并不总是从文件开头读取。

#### `filehandle.readLines([options])`

<!-- YAML
added: v18.11.0
-->

* `options` {Object}
  * `encoding` {string} **默认：** `null`
  * `autoClose` {boolean} **默认：** `true`
  * `emitClose` {boolean} **默认：** `true`
  * `start` {integer}
  * `end` {integer} **默认：** `Infinity`
  * `highWaterMark` {integer} **默认：** `64 * 1024`
* 返回：{readline.InterfaceConstructor}

创建 `readline` 接口并通过文件流式传输的便捷方法。有关选项，请参阅 [`filehandle.createReadStream()`][]。

```mjs
import { open } from 'node:fs/promises';

const file = await open('./some/file/to/read');

for await (const line of file.readLines()) {
  console.log(line);
}
```

```cjs
const { open } = require('node:fs/promises');

(async () => {
  const file = await open('./some/file/to/read');

  for await (const line of file.readLines()) {
    console.log(line);
  }
})();
```

#### `filehandle.readv(buffers[, position])`

<!-- YAML
added:
 - v13.13.0
 - v12.17.0
-->

* `buffers` {Buffer\[]|TypedArray\[]|DataView\[]}
* `position` {integer|null} 应从文件开头偏移的位置读取数据。如果 `position` 不是 `number`，则将从当前位置读取数据。**默认：** `null`
* 返回：{Promise} 成功时 fulfilled 为一个包含两个属性的对象：
  * `bytesRead` {integer} 读取的字节数
  * `buffers` {Buffer\[]|TypedArray\[]|DataView\[]} 包含对 `buffers` 输入的引用的属性。

从文件读取并写入 {ArrayBufferView} 数组

#### `filehandle.stat([options])`

<!-- YAML
added: v10.0.0
changes:
  - version: v26.1.0
    pr-url: https://github.com/nodejs/node/pull/57775
    description: 现在接受额外的 `signal` 属性以允许中止操作。
  - version: v10.5.0
    pr-url: https://github.com/nodejs/node/pull/20220
    description: 接受一个额外的 `options` 对象以指定返回的数值是否应为 bigint。
-->

* `options` {Object}
  * `bigint` {boolean} 返回的 {fs.Stats} 对象中的数值是否应为 `bigint`。**默认:** `false`.
  * `signal` {AbortSignal} 用于取消操作的 AbortSignal。**默认:** `undefined`.
* 返回：{Promise} 对文件兑现为一个 {fs.Stats}。

#### `filehandle.sync()`

<!-- YAML
added: v10.0.0
-->

* 返回：{Promise} 成功时 fulfilled 为 `undefined`。

请求将打开的文件描述符的所有数据刷新到存储设备。具体实现取决于操作系统和设备。有关更多详细信息，请参阅 POSIX fsync(2) 文档。

#### `filehandle.truncate(len)`

<!-- YAML
added: v10.0.0
-->

* `len` {integer} **默认：** `0`
* 返回：{Promise} 成功时 fulfilled 为 `undefined`。

截断文件。

如果文件大于 `len` 字节，则文件中只保留前 `len` 字节。

以下示例仅保留文件的前四个字节：

```mjs
import { open } from 'node:fs/promises';

let filehandle = null;
try {
  filehandle = await open('temp.txt', 'r+');
  await filehandle.truncate(4);
} finally {
  await filehandle?.close();
}
```

如果文件以前短于 `len` 字节，则它会扩展，并且扩展部分填充空字节（`'\0'`）：

如果 `len` 为负数，则将使用 `0`。

#### `filehandle.utimes(atime, mtime)`

<!-- YAML
added: v10.0.0
-->

* `atime` {number|string|Date}
* `mtime` {number|string|Date}
* 返回：{Promise}

更改 {FileHandle} 引用的对象的文件系统时间戳，然后在成功时 fulfilled promise 且不带参数。

#### `filehandle.write(buffer, offset[, length[, position]])`

<!-- YAML
added: v10.0.0
changes:
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/31030
    description: "`buffer` 参数不再将不支持的输入强制转换为 buffers。"
-->

* `buffer` {Buffer|TypedArray|DataView}
* `offset` {integer} `buffer` 内开始写入数据的起始位置。
* `length` {integer} 要从 `buffer` 写入的字节数。**默认：** `buffer.byteLength - offset`
* `position` {integer|null} 应从文件开头偏移的位置写入 `buffer` 中的数据。如果 `position` 不是 `number`，则数据将写入当前位置。有关更多详细信息，请参阅 POSIX pwrite(2) 文档。**默认：** `null`
* 返回：{Promise}

将 `buffer` 写入文件。

Promise fulfilled 为一个包含两个属性的对象：

* `bytesWritten` {integer} 写入的字节数
* `buffer` {Buffer|TypedArray|DataView} 对写入的 `buffer` 的引用。

在不等待 promise fulfilled（或 rejected）的情况下在同一文件上多次使用 `filehandle.write()` 是不安全的。对于这种情况，请使用 [`filehandle.createWriteStream()`][]。

在 Linux 上，当文件以追加模式打开时，位置写入不起作用。内核忽略位置参数并始终将数据追加到文件末尾。

#### `filehandle.write(buffer[, options])`

<!-- YAML
added:
  - v18.3.0
  - v16.17.0
-->

* `buffer` {Buffer|TypedArray|DataView}
* `options` {Object}
  * `offset` {integer} **默认：** `0`
  * `length` {integer} **默认：** `buffer.byteLength - offset`
  * `position` {integer|null} **默认：** `null`
* 返回：{Promise}

将 `buffer` 写入文件。

与上面的 `filehandle.write` 函数类似，此版本采用可选的 `options` 对象。如果未指定 `options` 对象，它将默认使用上述值。

#### `filehandle.write(string[, position[, encoding]])`

<!-- YAML
added: v10.0.0
changes:
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/31030
    description: "`string` 参数不再将不支持的输入强制转换为字符串。"
-->

* `string` {string}
* `position` {integer|null} 应从文件开头偏移的位置写入 `string` 中的数据。如果 `position` 不是 `number`，则数据将写入当前位置。有关更多详细信息，请参阅 POSIX pwrite(2) 文档。**默认：** `null`
* `encoding` {string} 预期的字符串编码。**默认：** `'utf8'`
* 返回：{Promise}

将 `string` 写入文件。如果 `string` 不是字符串，则 promise 被 rejected 并带有错误。

Promise fulfilled 为一个包含两个属性的对象：

* `bytesWritten` {integer} 写入的字节数
* `buffer` {string} 对写入的 `string` 的引用。

在不等待 promise fulfilled（或 rejected）的情况下在同一文件上多次使用 `filehandle.write()` 是不安全的。对于这种情况，请使用 [`filehandle.createWriteStream()`][]。

在 Linux 上，当文件以追加模式打开时，位置写入不起作用。内核忽略位置参数并始终将数据追加到文件末尾。

#### `filehandle.writeFile(data, options)`

<!-- YAML
added: v10.0.0
changes:
  - version:
      - v15.14.0
      - v14.18.0
    pr-url: https://github.com/nodejs/node/pull/37490
    description: "`data` 参数支持 `AsyncIterable`、`Iterable` 和 `Stream`。"
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/31030
    description: "`data` 参数不再将不支持的输入强制转换为字符串。"
-->

* `data` {string|Buffer|TypedArray|DataView|AsyncIterable|Iterable|Stream}
* `options` {Object|string}
  * `encoding` {string|null} 当 `data` 是字符串时的预期字符编码。**默认：** `'utf8'`
  * `signal` {AbortSignal|undefined} 允许中止进行中的 writeFile。**默认：** `undefined`
* 返回：{Promise}

异步将数据写入文件，如果文件已存在则替换该文件。`data` 可以是字符串、缓冲区、{AsyncIterable} 或 {Iterable} 对象。成功时 promise fulfilled 且不带参数。

如果 `options` 是字符串，则它指定 `encoding`。

{FileHandle} 必须支持写入。

在不等待 promise fulfilled（或 rejected）的情况下在同一文件上多次使用 `filehandle.writeFile()` 是不安全的。

如果在文件句柄上进行了一次或多次 `filehandle.write()` 调用，然后进行了 `filehandle.writeFile()` 调用，则数据将从当前位置写入到文件末尾。它并不总是从文件开头写入。

#### `filehandle.writev(buffers[, position])`

<!-- YAML
added: v12.9.0
-->

* `buffers` {Buffer\[]|TypedArray\[]|DataView\[]}
* `position` {integer|null} 应从文件开头偏移的位置写入 `buffers` 中的数据。如果 `position` 不是 `number`，则数据将写入当前位置。**默认：** `null`
* 返回：{Promise}

将 {ArrayBufferView} 数组写入文件。

Promise fulfilled 为一个包含两个属性的对象：

* `bytesWritten` {integer} 写入的字节数
* `buffers` {Buffer\[]|TypedArray\[]|DataView\[]} 对 `buffers` 输入的引用。

在不等待 promise fulfilled（或 rejected）的情况下在同一文件上多次调用 `writev()` 是不安全的。

在 Linux 上，当文件以追加模式打开时，位置写入不起作用。内核忽略位置参数并始终将数据追加到文件末尾。

#### `filehandle.writer([options])`

<!-- YAML
added:
 - v25.9.0
-->

> 稳定性：1 - 实验性

* `options` {Object}
  * `autoClose` {boolean} 当 writer 结束或失败时关闭文件句柄。**默认：** `false`。
  * `start` {number} 开始写入的字节偏移量。指定时，写入使用显式定位。**默认：** 当前文件位置。
  * `limit` {number} writer 将接受的最大字节数。超过限制的异步写入（`write()`、`writev()`）将 rejected 并带有 `ERR_OUT_OF_RANGE`。同步写入（`writeSync()`、`writevSync()`）返回 `false`。**默认：** 无限制。
  * `chunkSize` {number} 同步写入操作的最大块大小（字节）。大于此阈值的写入回退到异步 I/O。将此设置为与 reader 的 `chunkSize` 匹配以获得最佳 `pipeTo()` 性能。**默认：** `131072` (128 KB)。
* 返回：{Object}
  * `write(chunk[, options])` {Function} 返回 {Promise\<void>}。接受 `Uint8Array`、`Buffer` 或字符串（UTF-8 编码）。
    * `chunk` {Buffer|TypedArray|DataView|string}
    * `options` {Object}
      * `signal` {AbortSignal} 如果信号已中止，则写入 rejected 并带有 `AbortError` 且不执行 I/O。
  * `writev(chunks[, options])` {Function} 返回 {Promise\<void>}。通过单个 `writev()` 系统调用使用散/聚 I/O。接受混合 `Uint8Array`/字符串数组。
    * `chunks` {Array\<Buffer|TypedArray|DataView|string>}
    * `options` {Object}
      * `signal` {AbortSignal} 如果信号已中止，则写入 rejected 并带有 `AbortError` 且不执行 I/O。
  * `writeSync(chunk)` {Function} 返回 {boolean}。尝试同步写入。如果写入成功则返回 `true`，如果调用者应回退到异步 `write()` 则返回 `false`。当以下情况时返回 `false`：writer 已关闭/出错，异步操作正在进行中，块超过 `chunkSize`，或写入将超过 `limit`。
    * `chunk` {Buffer|TypedArray|DataView|string}
  * `writevSync(chunks)` {Function} 返回 {boolean}。同步批量写入。与 `writeSync()` 相同的回退语义。
    * `chunks` {Array\<Buffer|TypedArray|DataView|string>}
  * `end([options])` {Function} 返回 {Promise\<number>} 总写入字节数。幂等：如果已关闭则返回 `totalBytesWritten`，如果正在关闭则返回待处理的 promise。如果 writer 处于错误状态则 rejected。
    * `options` {Object}
      * `signal` {AbortSignal} 如果信号已中止，`end()` rejected 并带有 `AbortError` 且 writer 保持打开。
  * `endSync()` {Function} 成功时返回 {number|number} 总写入字节数，如果 writer 出错或异步操作正在进行中则返回 `-1`。已关闭时幂等。
  * `fail(reason)` {Function} 将 writer 置于终端错误状态。同步。如果 writer 已关闭或出错，这是无操作。如果 `autoClose` 为 true，则同步关闭文件句柄。

返回由此文件句柄支持的 [`node:stream/iter`][] writer。

writer 支持 `Symbol.asyncDispose` 和 `Symbol.dispose`：

* `await using w = fh.writer()` — 如果 writer 仍然打开（未调用 `end()`），`asyncDispose` 调用 `fail()`。如果 `end()` 待处理，则等待其完成。
* `using w = fh.writer()` — 无条件调用 `fail()`。

`writeSync()` 和 `writevSync()` 方法启用 [`stream/iter pipeTo()`][] 使用的 try-sync 快速路径。当 reader 的块大小与 writer 的 `chunkSize` 匹配时，`pipeTo()` 管道中的所有写入都同步完成，零 promise 开销。

此函数仅在启用 `--experimental-stream-iter` 标志时可用。

```mjs
import { open } from 'node:fs/promises';
import { from, pipeTo } from 'node:stream/iter';
import { compressGzip } from 'node:zlib/iter';

// 异步管道
const fh = await open('output.gz', 'w');
await pipeTo(from('Hello!'), compressGzip(), fh.writer({ autoClose: true }));

// 带限制的同步管道
const src = await open('input.txt', 'r');
const dst = await open('output.txt', 'w');
const w = dst.writer({ limit: 1024 * 1024 }); // 最大 1 MB
await pipeTo(src.pull({ autoClose: true }), w);
await w.end();
await dst.close();
```

```cjs
const { open } = require('node:fs/promises');
const { from, pipeTo } = require('node:stream/iter');
const { compressGzip } = require('node:zlib/iter');

async function run() {
  // 异步管道
  const fh = await open('output.gz', 'w');
  await pipeTo(from('Hello!'), compressGzip(), fh.writer({ autoClose: true }));

  // 带限制的同步管道
  const src = await open('input.txt', 'r');
  const dst = await open('output.txt', 'w');
  const w = dst.writer({ limit: 1024 * 1024 }); // 最大 1 MB
  await pipeTo(src.pull({ autoClose: true }), w);
  await w.end();
  await dst.close();
}

run().catch(console.error);
```

#### `filehandle[Symbol.asyncDispose]()`

<!-- YAML
added:
 - v20.4.0
 - v18.18.0
changes:
 - version: v24.2.0
   pr-url: https://github.com/nodejs/node/pull/58467
   description: 不再是实验性的。
-->

调用 `filehandle.close()` 并返回一个 promise，当文件句柄关闭时该 promise fulfilled。

### `fsPromises.access(path[, mode])`

<!-- YAML
added: v10.0.0
-->

* `path` {string|Buffer|URL}
* `mode` {integer} **默认：** `fs.constants.F_OK`
* 返回：{Promise} 成功时 fulfilled 为 `undefined`。

测试用户对 `path` 指定的文件或目录的权限。`mode` 参数是一个可选整数，指定要执行的 accessibility 检查。`mode` 应为值 `fs.constants.F_OK` 或由任何 `fs.constants.R_OK`、`fs.constants.W_OK` 和 `fs.constants.X_OK` 的按位 OR 组成的掩码（例如 `fs.constants.W_OK | fs.constants.R_OK`）。检查 [文件访问常量][] 以获取 `mode` 的可能值。

如果 accessibility 检查成功，则 promise fulfilled 且不带值。如果任何 accessibility 检查失败，则 promise 被 rejected 并带有 {Error} 对象。以下示例检查当前进程是否可以读取和写入文件 `/etc/passwd`。

```mjs
import { access, constants } from 'node:fs/promises';

try {
  await access('/etc/passwd', constants.R_OK | constants.W_OK);
  console.log('可以访问');
} catch {
  console.error('无法访问');
}
```

在调用 `fsPromises.open()` 之前使用 `fsPromises.access()` 检查文件的 accessibility 是不推荐的。这样做会引入竞争条件，因为其他进程可能会在两次调用之间更改文件的状态。相反，用户代码应直接打开/读取/写入文件并处理如果文件不可访问时引发的错误。

### `fsPromises.appendFile(path, data[, options])`

<!-- YAML
added: v10.0.0
changes:
  - version:
    - v21.1.0
    - v20.10.0
    pr-url: https://github.com/nodejs/node/pull/50095
    description: "现在支持 `flush` 选项。"
-->

* `path` {string|Buffer|URL|FileHandle} 文件名或 {FileHandle}
* `data` {string|Buffer}
* `options` {Object|string}
  * `encoding` {string|null} **默认：** `'utf8'`
  * `mode` {integer} **默认：** `0o666`
  * `flag` {string} 参见 [文件系统 `flags` 的支持][]。**默认：** `'a'`。
  * `flush` {boolean} 如果为 `true`，则在关闭之前刷新底层文件描述符。**默认：** `false`。
* 返回：{Promise} 成功时 fulfilled 为 `undefined`。

异步将数据追加到文件，如果文件尚不存在则创建该文件。`data` 可以是字符串或 {Buffer}。

如果 `options` 是字符串，则它指定 `encoding`。

`mode` 选项仅影响新创建的文件。有关更多详细信息，请参阅 [`fs.open()`][]。

`path` 可以指定为已打开用于追加的 {FileHandle}（使用 `fsPromises.open()`）。

### `fsPromises.chmod(path, mode)`

<!-- YAML
added: v10.0.0
-->

* `path` {string|Buffer|URL}
* `mode` {string|integer}
* 返回：{Promise} 成功时 fulfilled 为 `undefined`。

更改文件的权限。

### `fsPromises.chown(path, uid, gid)`

<!-- YAML
added: v10.0.0
-->

* `path` {string|Buffer|URL}
* `uid` {integer}
* `gid` {integer}
* 返回：{Promise} 成功时 fulfilled 为 `undefined`。

更改文件的所有权。

### `fsPromises.copyFile(src, dest[, mode])`

<!-- YAML
added: v10.0.0
changes:
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/27044
    description: "将 `flags` 参数更改为 `mode` 并实施了更严格的类型验证。"
-->

* `src` {string|Buffer|URL} 要复制的源文件名
* `dest` {string|Buffer|URL} 复制操作的目标文件名
* `mode` {integer} 指定复制行为的可选修饰符。可以创建由两个或更多值的按位 OR 组成的掩码（例如 `fs.constants.COPYFILE_EXCL | fs.constants.COPYFILE_FICLONE`）**默认：** `0`。
  * `fs.constants.COPYFILE_EXCL`：如果 `dest` 已存在，则复制操作将失败。
  * `fs.constants.COPYFILE_FICLONE`：复制操作将尝试创建写时复制 reflink。如果平台不支持写时复制，则使用回退复制机制。
  * `fs.constants.COPYFILE_FICLONE_FORCE`：复制操作将尝试创建写时复制 reflink。如果平台不支持写时复制，则操作将失败。
* 返回：{Promise} 成功时 fulfilled 为 `undefined`。

异步将 `src` 复制到 `dest`。默认情况下，如果 `dest` 已存在则将其覆盖。

不保证复制操作的原子性。如果在打开目标文件进行写入后发生错误，将尝试删除目标文件。

```mjs
import { copyFile, constants } from 'node:fs/promises';

try {
  await copyFile('source.txt', 'destination.txt');
  console.log('source.txt 已复制到 destination.txt');
} catch {
  console.error('无法复制该文件');
}

// 通过使用 COPYFILE_EXCL，如果 destination.txt 存在，操作将失败。
try {
  await copyFile('source.txt', 'destination.txt', constants.COPYFILE_EXCL);
  console.log('source.txt 已复制到 destination.txt');
} catch {
  console.error('无法复制该文件');
}
```

### `fsPromises.cp(src, dest[, options])`

<!-- YAML
added: v16.7.0
changes:
  - version: v22.3.0
    pr-url: https://github.com/nodejs/node/pull/53127
    description: 此 API 不再是实验性的。
  - version:
    - v20.1.0
    - v18.17.0
    pr-url: https://github.com/nodejs/node/pull/47084
    description: "接受一个额外的 `mode` 选项来指定复制行为，作为 `fs.copyFile()` 的 `mode` 参数。"
  - version:
    - v17.6.0
    - v16.15.0
    pr-url: https://github.com/nodejs/node/pull/41819
    description: "接受一个额外的 `verbatimSymlinks` 选项来指定是否对符号链接执行路径解析。"
-->

* `src` {string|URL} 要复制的源路径。
* `dest` {string|URL} 要复制到的目标路径。
* `options` {Object}
  * `dereference` {boolean} 解引用符号链接。**默认：** `false`。
  * `errorOnExist` {boolean} 当 `force` 为 `false` 且目标存在时，抛出错误。**默认：** `false`。
  * `filter` {Function} 用于过滤复制的文件/目录的函数。返回 `true` 以复制该项目，`false` 以忽略它。当忽略目录时，其所有内容也将被跳过。也可以返回一个 `Promise` 解析为 `true` 或 `false` **默认：** `undefined`。
    * `src` {string} 要复制的源路径。
    * `dest` {string} 要复制到的目标路径。
    * 返回：{boolean|Promise} 可强制转换为 `boolean` 的值或 fulfilled 为此类值的 `Promise`。
  * `force` {boolean} 覆盖现有文件或目录。如果将此设置为 false 且目标存在，则复制操作将忽略错误。使用 `errorOnExist` 选项来更改此行为。**默认：** `true`。
  * `mode` {integer} 复制操作的修饰符。**默认：** `0`。参见 [`fsPromises.copyFile()`][] 的 `mode` 标志。
  * `preserveTimestamps` {boolean} 当为 `true` 时，将保留 `src` 的时间戳。**默认：** `false`。
  * `recursive` {boolean} 递归复制目录 **默认：** `false`
  * `verbatimSymlinks` {boolean} 当为 `true` 时，将跳过符号链接的路径解析。**默认：** `false`
* 返回：{Promise} 成功时 fulfilled 为 `undefined`。

异步将整个目录结构从 `src` 复制到 `dest`，包括子目录和文件。

当将目录复制到另一个目录时，不支持 globs，行为类似于 `cp dir1/ dir2/`。

### `fsPromises.glob(pattern[, options])`

<!-- YAML
added: v22.0.0
changes:
  - version: v26.1.0
    pr-url: https://github.com/nodejs/node/pull/62695
    description: 添加对 `followSymlinks` 选项的支持。
  - version:
      - v24.1.0
      - v22.17.0
    pr-url: https://github.com/nodejs/node/pull/58182
    description: "为 `cwd` 选项添加对 `URL` 实例的支持。"
  - version:
      - v24.0.0
      - v22.17.0
    pr-url: https://github.com/nodejs/node/pull/57513
    description: 标记 API 为稳定。
  - version:
    - v23.7.0
    - v22.14.0
    pr-url: https://github.com/nodejs/node/pull/56489
    description: "添加对 `exclude` 选项的支持以接受 glob 模式。"
  - version: v22.2.0
    pr-url: https://github.com/nodejs/node/pull/52837
    description: "添加对 `withFileTypes` 作为选项的支持。"
-->

* `pattern` {string|string\[]}
* `options` {Object}
  * `cwd` {string|URL} 当前工作目录。**默认：** `process.cwd()`
  * `exclude` {Function|string\[]} 用于过滤掉文件/目录的函数，或者
    要排除的 glob 模式列表。如果提供的是函数，则返回
    `true` 表示排除该项目，`false` 表示包含它。**默认：** `undefined`。
    如果提供的是字符串数组，则每个字符串都应为指定要排除路径的 glob 模式。注意：不支持否定模式（例如 `!foo.js`）。
  * `followSymlinks` {boolean} 当为 `true` 时，在展开 `**` 模式时会跟随指向目录的符号链接。**默认：** `false`。
  * `withFileTypes` {boolean} 如果 glob 应将路径作为 Dirent 返回则为 `true`，否则为 `false`。**默认：** `false`。
* 返回：{AsyncIterator} 返回一个 AsyncIterator，产生
  与模式匹配的文件路径。

当启用 `followSymlinks` 时，检测到的符号链接循环不会被递归遍历。

```mjs
import { glob } from 'node:fs/promises';

for await (const entry of glob('**/*.js'))
  console.log(entry);
```

```cjs
const { glob } = require('node:fs/promises');

(async () => {
  for await (const entry of glob('**/*.js'))
    console.log(entry);
})();
```

### `fsPromises.lchmod(path, mode)`

<!-- YAML
deprecated: v10.0.0
-->

> 稳定性：0 - 已弃用

* `path` {string|Buffer|URL}
* `mode` {integer}
* 返回：{Promise} 成功时 fulfilled 为 `undefined`。

更改符号链接上的权限。

此方法仅在 macOS 上实现。

### `fsPromises.lchown(path, uid, gid)`

<!-- YAML
added: v10.0.0
changes:
  - version: v10.6.0
    pr-url: https://github.com/nodejs/node/pull/21498
    description: 此 API 不再弃用。
-->

* `path` {string|Buffer|URL}
* `uid` {integer}
* `gid` {integer}
* 返回：{Promise}  成功时 fulfilled 为 `undefined`。

更改符号链接上的所有权。

### `fsPromises.lutimes(path, atime, mtime)`

<!-- YAML
added:
  - v14.5.0
  - v12.19.0
-->

* `path` {string|Buffer|URL}
* `atime` {number|string|Date}
* `mtime` {number|string|Date}
* 返回：{Promise}  成功时 fulfilled 为 `undefined`。

以与 [`fsPromises.utimes()`][] 相同的方式更改文件的访问和修改时间，不同之处在于如果路径引用符号链接，则链接不会被解引用：相反，符号链接本身的时间戳会被更改。

### `fsPromises.link(existingPath, newPath)`

<!-- YAML
added: v10.0.0
-->

* `existingPath` {string|Buffer|URL}
* `newPath` {string|Buffer|URL}
* 返回：{Promise}  成功时 fulfilled 为 `undefined`。

从 `existingPath` 到 `newPath` 创建新链接。有关更多详细信息，请参阅 POSIX link(2) 文档。

### `fsPromises.lstat(path[, options])`

<!-- YAML
added: v10.0.0
changes:
  - version: v10.5.0
    pr-url: https://github.com/nodejs/node/pull/20220
    description: "接受一个额外的 `options` 对象以指定返回的数值是否应为 bigint。"
-->

* `path` {string|Buffer|URL}
* `options` {Object}
  * `bigint` {boolean} 返回的 {fs.Stats} 对象中的数值是否应为 `bigint`。**默认：** `false`。
* 返回：{Promise}   fulfilled 为给定符号链接 `path` 的 {fs.Stats} 对象。

等同于 [`fsPromises.stat()`][]，除非 `path` 引用符号链接，在这种情况下统计的是链接本身，而不是它引用的文件。有关更多详细信息，请参阅 POSIX lstat(2) 文档。

### `fsPromises.mkdir(path[, options])`

<!-- YAML
added: v10.0.0
-->

* `path` {string|Buffer|URL}
* `options` {Object|integer}
  * `recursive` {boolean} **默认：** `false`
  * `mode` {string|integer} 在 Windows 上不支持。有关更多详细信息，请参阅 [文件模式][]。**默认：** `0o777`。
* 返回：{Promise} 成功时，如果 `recursive` 为 `false` 则 fulfilled 为 `undefined`，如果 `recursive` 为 `true` 则 fulfilled 为创建的第一个目录路径。

异步创建目录。

可选的 `options` 参数可以是指定 `mode`（权限和粘滞位）的整数，也可以是具有 `mode` 属性和指示是否应创建父目录的 `recursive` 属性的对象。当 `path` 是已存在的目录时调用 `fsPromises.mkdir()` 仅在 `recursive` 为 false 时导致 rejection。

```mjs
import { mkdir } from 'node:fs/promises';

try {
  const projectFolder = new URL('./test/project/', import.meta.url);
  const createDir = await mkdir(projectFolder, { recursive: true });

  console.log(`已创建 ${createDir}`);
} catch (err) {
  console.error(err.message);
}
```

```cjs
const { mkdir } = require('node:fs/promises');
const { join } = require('node:path');

async function makeDirectory() {
  const projectFolder = join(__dirname, 'test', 'project');
  const dirCreation = await mkdir(projectFolder, { recursive: true });

  console.log(dirCreation);
  return dirCreation;
}

makeDirectory().catch(console.error);
```

### `fsPromises.mkdtemp(prefix[, options])`

<!-- YAML
added: v10.0.0
changes:
  - version:
    - v20.6.0
    - v18.19.0
    pr-url: https://github.com/nodejs/node/pull/48828
    description: "`prefix` 参数现在接受 buffers 和 URL。"
  - version:
      - v16.5.0
      - v14.18.0
    pr-url: https://github.com/nodejs/node/pull/39028
    description: "`prefix` 参数现在接受空字符串。"
-->

* `prefix` {string|Buffer|URL}
* `options` {string|Object}
  * `encoding` {string} **默认值：** `'utf8'`
* 返回：{Promise} 兑现为一个字符串，包含新创建的临时目录的文件系统路径。

创建一个唯一的临时目录。唯一的目录名是通过在提供的 `prefix` 末尾追加六个随机字符生成的。由于平台不一致性，避免在 `prefix` 中使用尾随的 `X` 字符。某些平台（尤其是 BSD 系列）可能会返回超过六个随机字符，并将 `prefix` 中尾随的 `X` 字符替换为随机字符。

可选的 `options` 参数可以是指定编码的字符串，也可以是具有 `encoding` 属性的对象，用于指定要使用的字符编码。

```mjs
import { mkdtemp } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

try {
  await mkdtemp(join(tmpdir(), 'foo-'));
} catch (err) {
  console.error(err);
}
```

`fsPromises.mkdtemp()` 方法会将六个随机选择的字符直接追加到 `prefix` 字符串。例如，给定目录 `/tmp`，如果打算 _在_ `/tmp` _内_ 创建临时目录，则 `prefix` 必须以尾随的平台特定路径分隔符（`require('node:path').sep`）结尾。

### `fsPromises.mkdtempDisposable(prefix[, options])`

<!-- YAML
added: v24.4.0
-->

* `prefix` {string|Buffer|URL}
* `options` {string|Object}
  * `encoding` {string} **默认值：** `'utf8'`
* 返回：{Promise} 兑现为一个针对异步可处置对象的 Promise：
  * `path` {string} 创建的目录的路径。
  * `remove` {AsyncFunction} 一个用于移除已创建目录的函数。
  * `[Symbol.asyncDispose]` {AsyncFunction} 与 `remove` 相同。

生成的 Promise 持有一个异步可处置对象，其 `path` 属性持有创建的目录路径。当对象被处置时，如果目录仍然存在，目录及其内容将被异步移除。如果无法删除目录，处置将抛出错误。该对象具有一个异步 `remove()` 方法，将执行相同的任务。

此函数和结果对象上的处置函数都是异步的，因此应像 `await using dir = await fsPromises.mkdtempDisposable('prefix')` 那样与 `await` + `await using` 一起使用。

<!-- TODO: 一旦 https://github.com/mdn/content/pull/38027 合并，链接 MDN 关于 disposables 的文档 -->

详细信息，请参阅 [`fsPromises.mkdtemp()`][] 的文档。

可选的 `options` 参数可以是指定编码的字符串，也可以是具有 `encoding` 属性的对象，用于指定要使用的字符编码。

### `fsPromises.open(path, flags[, mode])`

<!-- YAML
added: v10.0.0
changes:
  - version: v11.1.0
    pr-url: https://github.com/nodejs/node/pull/23767
    description: "`flags` 参数现在是可选的，默认值为 `'r'`。"
-->

* `path` {string|Buffer|URL}
* `flags` {string|number} 参见 [文件系统 `flags` 的支持][]。
  **默认值：** `'r'`。
* `mode` {string|integer} 如果文件被创建，设置文件模式（权限和粘滞位）。
  参见 [文件模式][] 了解更多详情。
  **默认值：** `0o666`（可读和可写）
* 返回：{Promise} 兑现为一个 {FileHandle} 对象。

打开一个 {FileHandle}。

请参阅 POSIX open(2) 文档了解更多详情。

某些字符（`< > : " / \ | ? *`）在 Windows 下是保留的，详见 [命名文件、路径和命名空间][]。在 NTFS 下，如果文件名包含冒号，Node.js 将打开一个文件系统流，如 [此 MSDN 页面][MSDN-Using-Streams] 所述。

### `fsPromises.opendir(path[, options])`

<!-- YAML
added: v12.12.0
changes:
  - version:
    - v20.1.0
    - v18.17.0
    pr-url: https://github.com/nodejs/node/pull/41439
    description: "添加了 `recursive` 选项。"
  - version:
     - v13.1.0
     - v12.16.0
    pr-url: https://github.com/nodejs/node/pull/30114
    description: "引入了 `bufferSize` 选项。"
-->

* `path` {string|Buffer|URL}
* `options` {Object}
  * `encoding` {string|null} **默认值：** `'utf8'`
  * `bufferSize` {number} 从目录读取时内部缓冲的目录条目数。
    较高的值会带来更好的性能，但内存使用量也更高。**默认值：** `32`
  * `recursive` {boolean} 解析后的 `Dir` 将是一个 {AsyncIterable}，
    包含所有子文件和目录。**默认值：** `false`
* 返回：{Promise} 兑现为一个 {fs.Dir}。

异步打开一个目录以进行迭代扫描。请参阅 POSIX
opendir(3) 文档了解更多详情。

创建一个 {fs.Dir}，其中包含所有用于从目录读取和清理目录的函数。

`encoding` 选项设置在打开目录和后续读取操作时 `path` 的编码。

使用异步迭代的示例：

```mjs
import { opendir } from 'node:fs/promises';

try {
  const dir = await opendir('./');
  for await (const dirent of dir)
    console.log(dirent.name);
} catch (err) {
  console.error(err);
}
```

使用异步迭代器时，{fs.Dir} 对象将在迭代器退出后自动关闭。

### `fsPromises.readdir(path[, options])`

<!-- YAML
added: v10.0.0
changes:
  - version:
    - v20.1.0
    - v18.17.0
    pr-url: https://github.com/nodejs/node/pull/41439
    description: "添加了 `recursive` 选项。"
  - version: v10.11.0
    pr-url: https://github.com/nodejs/node/pull/22020
    description: "添加了新选项 `withFileTypes`。"
-->

* `path` {string|Buffer|URL}
* `options` {string|Object}
  * `encoding` {string} **默认值：** `'utf8'`
  * `withFileTypes` {boolean} **默认值：** `false`
  * `recursive` {boolean} 如果为 `true`，则递归读取目录内容。
    在递归模式下，它将列出所有文件、子文件和目录。**默认值：** `false`。
* 返回：{Promise} 兑现为一个数组，包含目录中文件的名称，
  不包括 `'.'` 和 `'..'`。

读取目录的内容。

可选的 `options` 参数可以是指定编码的字符串，也可以是具有 `encoding` 属性的对象，用于指定用于文件名的字符编码。如果 `encoding` 设置为 `'buffer'`，返回的文件名将作为 {Buffer} 对象传递。

如果 `options.withFileTypes` 设置为 `true`，返回的数组将包含 {fs.Dirent} 对象。

```mjs
import { readdir } from 'node:fs/promises';

try {
  const files = await readdir(path);
  for (const file of files)
    console.log(file);
} catch (err) {
  console.error(err);
}
```

### `fsPromises.readFile(path[, options])`

<!-- YAML
added: v10.0.0
changes:
  - version:
    - v15.2.0
    - v14.17.0
    pr-url: https://github.com/nodejs/node/pull/35911
    description: options 参数可以包含一个 AbortSignal 以中止正在进行的 readFile 请求。
-->

* `path` {string|Buffer|URL|FileHandle} 文件名或 `FileHandle`
* `options` {Object|string}
  * `encoding` {string|null} **默认值：** `null`
  * `flag` {string} 参见 [文件系统 `flags` 的支持][]。**默认值：** `'r'`。
  * `signal` {AbortSignal} 允许中止正在进行的 readFile
* 返回：{Promise} 兑现为文件的内容。

异步读取文件的全部内容。

如果未指定编码（使用 `options.encoding`），数据将作为 {Buffer} 对象返回。否则，数据将是字符串。

如果 `options` 是字符串，则它指定编码。

当 `path` 是目录时，`fsPromises.readFile()` 的行为特定于平台。在 macOS、Linux 和 Windows 上，Promise 将被拒绝并抛出错误。在 FreeBSD 上，将返回目录内容的表示。

读取位于运行代码同一目录中的 `package.json` 文件的示例：

```mjs
import { readFile } from 'node:fs/promises';
try {
  const filePath = new URL('./package.json', import.meta.url);
  const contents = await readFile(filePath, { encoding: 'utf8' });
  console.log(contents);
} catch (err) {
  console.error(err.message);
}
```

```cjs
const { readFile } = require('node:fs/promises');
const { resolve } = require('node:path');
async function logFile() {
  try {
    const filePath = resolve('./package.json');
    const contents = await readFile(filePath, { encoding: 'utf8' });
    console.log(contents);
  } catch (err) {
    console.error(err.message);
  }
}
logFile();
```

可以使用 {AbortSignal} 中止正在进行的 `readFile`。如果请求被中止，返回的 Promise 将被 `AbortError` 拒绝：

```mjs
import { readFile } from 'node:fs/promises';

try {
  const controller = new AbortController();
  const { signal } = controller;
  const promise = readFile(fileName, { signal });

  // 在 Promise 结算前中止请求。
  controller.abort();

  await promise;
} catch (err) {
  // 当请求被中止时 - err 是一个 AbortError
  console.error(err);
}
```

中止正在进行的请求不会中止单个操作系统请求，而是中止 `fs.readFile` 执行的内部缓冲。

任何指定的 {FileHandle} 必须支持读取。

### `fsPromises.readlink(path[, options])`

<!-- YAML
added: v10.0.0
-->

* `path` {string|Buffer|URL}
* `options` {string|Object}
  * `encoding` {string} **默认值：** `'utf8'`
* 返回：{Promise} 成功时兑现为 `linkString`。

读取 `path` 引用的符号链接的内容。请参阅 POSIX
readlink(2) 文档了解更多详情。成功时 Promise 兑现为 `linkString`。

可选的 `options` 参数可以是指定编码的字符串，也可以是具有 `encoding` 属性的对象，用于指定用于返回的链接路径的字符编码。如果 `encoding` 设置为 `'buffer'`，返回的链接路径将作为 {Buffer} 对象传递。

### `fsPromises.realpath(path[, options])`

<!-- YAML
added: v10.0.0
-->

* `path` {string|Buffer|URL}
* `options` {string|Object}
  * `encoding` {string} **默认值：** `'utf8'`
* 返回：{Promise} 成功时兑现为解析后的路径。

使用与 `fs.realpath.native()` 函数相同的语义确定 `path` 的实际位置。

仅支持可以转换为 UTF8 字符串的路径。

可选的 `options` 参数可以是指定编码的字符串，也可以是具有 `encoding` 属性的对象，用于指定用于路径的字符编码。如果 `encoding` 设置为 `'buffer'`，返回的路径将作为 {Buffer} 对象传递。

在 Linux 上，当 Node.js 链接到 musl libc 时，必须将 procfs 文件系统挂载到 `/proc` 才能使此函数工作。Glibc 没有此限制。

### `fsPromises.rename(oldPath, newPath)`

<!-- YAML
added: v10.0.0
-->

* `oldPath` {string|Buffer|URL}
* `newPath` {string|Buffer|URL}
* 返回：{Promise} 成功时兑现为 `undefined`。

将 `oldPath` 重命名为 `newPath`。

### `fsPromises.rmdir(path[, options])`

<!-- YAML
added: v10.0.0
changes:
  - version: v25.0.0
    pr-url: https://github.com/nodejs/node/pull/58616
    description: "移除了 `recursive` 选项。"
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/37216
    description: "不再允许在为文件的 `path` 上使用 `fsPromises.rmdir(path, { recursive: true })`，在 Windows 上会导致 `ENOENT` 错误，在 POSIX 上会导致 `ENOTDIR` 错误。"
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/37216
    description: "不再允许在不存在的 `path` 上使用 `fsPromises.rmdir(path, { recursive: true })`，会导致 `ENOENT` 错误。"
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/37302
    description: "`recursive` 选项已弃用，使用它会触发弃用警告。"
  - version: v14.14.0
    pr-url: https://github.com/nodejs/node/pull/35579
    description: "`recursive` 选项已弃用，请改用 `fsPromises.rm`。"
  - version:
     - v13.3.0
     - v12.16.0
    pr-url: https://github.com/nodejs/node/pull/30644
    description: "`maxBusyTries` 选项重命名为 `maxRetries`，其默认值为 0。`emfileWait` 选项已被移除，`EMFILE` 错误使用与其他错误相同的重试逻辑。现在支持 `retryDelay` 选项。`ENFILE` 错误现在会重试。"
  - version: v12.10.0
    pr-url: https://github.com/nodejs/node/pull/29168
    description: "现在支持 `recursive`、`maxBusyTries` 和 `emfileWait` 选项。"
-->

* `path` {string|Buffer|URL}
* `options` {Object} 目前未暴露任何选项。曾经有
  `recursive`、`maxBusyTries` 和 `emfileWait` 的选项，但它们已
  弃用并被移除。`options` 参数仍被接受以
  保持向后兼容，但它未被使用。
* 返回：{Promise} 成功时兑现为 `undefined`。

移除由 `path` 标识的目录。

在文件（非目录）上使用 `fsPromises.rmdir()` 会导致
Promise 被拒绝，在 Windows 上抛出 `ENOENT` 错误，
在 POSIX 上抛出 `ENOTDIR` 错误。

要获得类似于 `rm -rf` Unix 命令的行为，请使用
[`fsPromises.rm()`][] 并带有选项 `{ recursive: true, force: true }`。

### `fsPromises.rm(path[, options])`

<!-- YAML
added: v14.14.0
-->

* `path` {string|Buffer|URL}
* `options` {Object}
  * `force` {boolean} 当为 `true` 时，如果 `path` 不存在，异常将被忽略。**默认值：** `false`。
  * `maxRetries` {integer} 如果遇到 `EBUSY`、`EMFILE`、`ENFILE`、`ENOTEMPTY` 或
    `EPERM` 错误，Node.js 将重试操作，每次重试的线性退避等待时间增加 `retryDelay` 毫秒。此选项
    表示重试次数。如果 `recursive`
    选项不为 `true`，则忽略此选项。**默认值：** `0`。
  * `recursive` {boolean} 如果为 `true`，执行递归目录移除。在
    递归模式下，失败时会重试操作。**默认值：** `false`。
  * `retryDelay` {integer} 重试之间等待的时间（毫秒）。如果 `recursive` 选项不为 `true`，
    则忽略此选项。
    **默认值：** `100`。
* 返回：{Promise} 成功时兑现为 `undefined`。

移除文件和目录（基于标准 POSIX `rm` 工具建模）。

### `fsPromises.stat(path[, options])`

<!-- YAML
added: v10.0.0
changes:
  - version: v25.7.0
    pr-url: https://github.com/nodejs/node/pull/61178
    description: "接受 `throwIfNoEntry` 选项以指定如果条目不存在是否应抛出异常。"
  - version: v10.5.0
    pr-url: https://github.com/nodejs/node/pull/20220
    description: "接受一个额外的 `options` 对象以指定返回的数值是否应为 bigint。"
-->

* `path` {string|Buffer|URL}
* `options` {Object}
  * `bigint` {boolean} 返回的
    {fs.Stats} 对象中的数值是否应为 `bigint`。**默认值：** `false`。
  * `throwIfNoEntry` {boolean} 如果不存在文件系统条目，是否抛出异常，
    而不是返回 `undefined`。
    **默认值：** `true`。
* 返回：{Promise} 兑现为给定 `path` 的 {fs.Stats} 对象。

### `fsPromises.statfs(path[, options])`

<!-- YAML
added:
  - v19.6.0
  - v18.15.0
-->

* `path` {string|Buffer|URL}
* `options` {Object}
  * `bigint` {boolean} 返回的
    {fs.StatFs} 对象中的数值是否应为 `bigint`。**默认值：** `false`。
* 返回：{Promise} 兑现为给定 `path` 的 {fs.StatFs} 对象。

### `fsPromises.symlink(target, path[, type])`

<!-- YAML
added: v10.0.0
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/42894
    description: "如果 `type` 参数为 `null` 或被省略，Node.js 将自动检测 `target` 类型并自动选择 `dir` 或 `file`。"

-->

* `target` {string|Buffer|URL}
* `path` {string|Buffer|URL}
* `type` {string|null} **默认值：** `null`
* 返回：{Promise} 成功时兑现为 `undefined`。

创建一个符号链接。

`type` 参数仅在 Windows 平台上使用，可以是 `'dir'`、
`'file'` 或 `'junction'` 之一。如果 `type` 参数为 `null`，Node.js 将
自动检测 `target` 类型并使用 `'file'` 或 `'dir'`。如果 `target` 不存在，
将使用 `'file'`。Windows 联接点要求目标
路径为绝对路径。使用 `'junction'` 时，`target` 参数将
自动规范化为绝对路径。NTFS 卷上的联接点
只能指向目录。

### `fsPromises.truncate(path[, len])`

<!-- YAML
added: v10.0.0
-->

* `path` {string|Buffer|URL}
* `len` {integer} **默认值：** `0`
* 返回：{Promise} 成功时兑现为 `undefined`。

将 `path` 处的内容截断（缩短或扩展长度）为 `len`
字节。

### `fsPromises.unlink(path)`

<!-- YAML
added: v10.0.0
-->

* `path` {string|Buffer|URL}
* 返回：{Promise} 成功时兑现为 `undefined`。

如果 `path` 指的是符号链接，则移除该链接而不影响
该链接所指的文件或目录。如果 `path` 指的是非
符号链接的文件路径，则删除该文件。请参阅 POSIX unlink(2)
文档了解更多详情。

### `fsPromises.utimes(path, atime, mtime)`

<!-- YAML
added: v10.0.0
-->

* `path` {string|Buffer|URL}
* `atime` {number|string|Date}
* `mtime` {number|string|Date}
* 返回：{Promise} 成功时兑现为 `undefined`。

更改由 `path` 引用的对象的文件系统时间戳。

`atime` 和 `mtime` 参数遵循以下规则：

* 值可以是代表 Unix 纪元时间的数字、`Date`，或
  数字字符串如 `'123456789.0'`。
* 如果值无法转换为数字，或是 `NaN`、`Infinity` 或
  `-Infinity`，将抛出 `Error`。

### `fsPromises.watch(filename[, options])`

<!-- YAML
added:
  - v15.9.0
  - v14.18.0
-->

* `filename` {string|Buffer|URL}
* `options` {string|Object}
  * `persistent` {boolean} 指示只要文件被监视，进程是否应继续运行。
    **默认值：** `true`。
  * `recursive` {boolean} 指示是否应监视所有子目录，
    或仅当前目录。这在指定目录时适用，且仅在支持的平台上有用（参见 [注意事项][]）。**默认值：**
    `false`。
  * `encoding` {string} 指定用于传递给监听器的
    文件名的字符编码。**默认值：** `'utf8'`。
  * `signal` {AbortSignal} 一个 {AbortSignal}，用于信号通知监视器
    何时停止。
  * `maxQueue` {number} 指定在返回的 {AsyncIterator} 的迭代之间
    排队的事件数。**默认值：** `2048`。
  * `overflow` {string} 当事件数超过 `maxQueue` 允许的数量时，可以是 `'ignore'` 或 `'throw'`。`'ignore'` 表示溢出事件被丢弃并
    发出警告，而 `'throw'` 表示抛出异常。**默认值：** `'ignore'`。
  * `ignore` {string|RegExp|Function|Array} 要忽略的模式。字符串是
    glob 模式（使用 [`minimatch`][]），RegExp 模式针对
    文件名进行测试，函数接收文件名并返回 `true` 以
    忽略。**默认值：** `undefined`。
* 返回：{AsyncIterator} 对象，具有属性：
  * `eventType` {string} 更改类型
  * `filename` {string|Buffer|null} 更改的文件名。

返回一个异步迭代器，监视 `filename` 上的更改，其中 `filename`
可以是文件或目录。

```js
const { watch } = require('node:fs/promises');

const ac = new AbortController();
const { signal } = ac;
setTimeout(() => ac.abort(), 10000);

(async () => {
  try {
    const watcher = watch(__filename, { signal });
    for await (const event of watcher)
      console.log(event);
  } catch (err) {
    if (err.name === 'AbortError')
      return;
    throw err;
  }
})();
```

在大多数平台上，每当目录中出现或消失文件名时，都会发出 `'rename'`。

`fs.watch()` 的所有 [注意事项][] 也适用于 `fsPromises.watch()`。

### `fsPromises.writeFile(file, data[, options])`

<!-- YAML
added: v10.0.0
changes:
  - version:
    - v21.0.0
    - v20.10.0
    pr-url: https://github.com/nodejs/node/pull/50009
    description: "现在支持 `flush` 选项。"
  - version:
      - v15.14.0
      - v14.18.0
    pr-url: https://github.com/nodejs/node/pull/37490
    description: "`data` 参数支持 `AsyncIterable`、`Iterable` 和 `Stream`。"
  - version:
      - v15.2.0
      - v14.17.0
    pr-url: https://github.com/nodejs/node/pull/35993
    description: options 参数可以包含一个 AbortSignal 以中止正在进行的 writeFile 请求。
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/31030
    description: "`data` 参数不再将不支持的输入强制转换为字符串。"
-->

* `file` {string|Buffer|URL|FileHandle} 文件名或 `FileHandle`
* `data` {string|Buffer|TypedArray|DataView|AsyncIterable|Iterable|Stream}
* `options` {Object|string}
  * `encoding` {string|null} **默认值：** `'utf8'`
  * `mode` {integer} **默认值：** `0o666`
  * `flag` {string} 参见 [文件系统 `flags` 的支持][]。**默认值：** `'w'`。
  * `flush` {boolean} 如果所有数据成功写入文件，且
    `flush` 为 `true`，则使用 `filehandle.sync()` 刷新数据。
    **默认值：** `false`。
  * `signal` {AbortSignal} 允许中止正在进行的 writeFile
* 返回：{Promise} 成功时兑现为 `undefined`。

异步将数据写入文件，如果文件已存在则替换它。
`data` 可以是字符串、缓冲区、{AsyncIterable} 或 {Iterable} 对象。

如果 `data` 是缓冲区，则忽略 `encoding` 选项。

如果 `options` 是字符串，则它指定编码。

`mode` 选项仅影响新创建的文件。参见 [`fs.open()`][]
了解更多详情。

任何指定的 {FileHandle} 必须支持写入。

在不等待 Promise 结算的情况下多次在同一文件上使用 `fsPromises.writeFile()` 是不安全的。

类似于 `fsPromises.readFile` - `fsPromises.writeFile` 是一个便捷
方法，内部执行多次 `write` 调用以写入传递给它的缓冲区。对于性能敏感的代码，考虑使用
[`fs.createWriteStream()`][] 或 [`filehandle.createWriteStream()`][]。

可以使用 {AbortSignal} 取消 `fsPromises.writeFile()`。
取消是“尽力而为”，可能仍会有少量数据
被写入。

```mjs
import { writeFile } from 'node:fs/promises';
import { Buffer } from 'node:buffer';

try {
  const controller = new AbortController();
  const { signal } = controller;
  const data = new Uint8Array(Buffer.from('Hello Node.js'));
  const promise = writeFile('message.txt', data, { signal });

  // 在 Promise 结算前中止请求。
  controller.abort();

  await promise;
} catch (err) {
  // 当请求被中止时 - err 是一个 AbortError
  console.error(err);
}
```

中止正在进行的请求不会中止单个操作系统
请求，而是中止 `fs.writeFile` 执行的内部缓冲。

### `fsPromises.constants`

<!-- YAML
added:
  - v18.4.0
  - v16.17.0
-->

* 类型：{Object}

返回一个包含文件系统操作常用常量的对象。该对象与 `fs.constants` 相同。参见 [FS 常量][]
了解更多详情。

## 回调 API

回调 API 异步执行所有操作，不会阻塞事件循环，然后在完成或出错时调用回调函数。

回调 API 使用底层的 Node.js 线程池在事件循环线程之外执行文件系统操作。这些操作不是同步的，也不是线程安全的。在对同一文件或数据进行多次并发修改时必须小心，否则可能会导致数据损坏。

### `fs.access(path[, mode], callback)`

<!-- YAML
added: v0.11.15
changes:
  - version: v25.0.0
    pr-url: https://github.com/nodejs/node/pull/55862
    description: "直接存在于 `fs` 上的常量 `fs.F_OK`、`fs.R_OK`、`fs.W_OK` 和 `fs.X_OK` 已被移除。"
  - version: v20.8.0
    pr-url: https://github.com/nodejs/node/pull/49683
    description: "直接存在于 `fs` 上的常量 `fs.F_OK`、`fs.R_OK`、`fs.W_OK` 和 `fs.X_OK` 已被弃用。"
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是 `ERR_INVALID_CALLBACK`。"
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`path` 参数可以是使用 `file:` 协议的 WHATWG `URL` 对象。"
  - version: v6.3.0
    pr-url: https://github.com/nodejs/node/pull/6534
    description: "像 `fs.R_OK` 等直接存在于 `fs` 上的常量已作为软弃用移入 `fs.constants`。因此对于 Node.js `< v6.3.0` 使用 `fs` 访问这些常量，或者使用类似 `(fs.constants || fs).R_OK` 的方式以兼容所有版本。"
-->

* `path` {string|Buffer|URL}
* `mode` {integer} **默认：** `fs.constants.F_OK`
* `callback` {Function}
  * `err` {Error}

测试用户对 `path` 指定的文件或目录的权限。`mode` 参数是一个可选的整数，指定要执行的访问检查。`mode` 应该是值 `fs.constants.F_OK` 或由 `fs.constants.R_OK`、`fs.constants.W_OK` 和 `fs.constants.X_OK` 中任意一个按位 OR 组成的掩码（例如 `fs.constants.W_OK | fs.constants.R_OK`）。检查 [文件访问常量][] 以获取 `mode` 的可能值。

最后一个参数 `callback` 是一个回调函数，使用可能的错误参数调用。如果任何访问检查失败，错误参数将是一个 `Error` 对象。以下示例检查 `package.json` 是否存在，以及是否可读或可写。

```mjs
import { access, constants } from 'node:fs';

const file = 'package.json';

// 检查文件是否存在于当前目录中。
access(file, constants.F_OK, (err) => {
  console.log(`${file} ${err ? 'does not exist' : 'exists'}`);
});

// 检查文件是否可读。
access(file, constants.R_OK, (err) => {
  console.log(`${file} ${err ? 'is not readable' : 'is readable'}`);
});

// 检查文件是否可写。
access(file, constants.W_OK, (err) => {
  console.log(`${file} ${err ? 'is not writable' : 'is writable'}`);
});

// 检查文件是否可读且可写。
access(file, constants.R_OK | constants.W_OK, (err) => {
  console.log(`${file} ${err ? 'is not' : 'is'} readable and writable`);
});
```

在调用 `fs.open()`、`fs.readFile()` 或 `fs.writeFile()` 之前，不要使用 `fs.access()` 检查文件的可访问性。这样做会引入竞争条件，因为其他进程可能会在两次调用之间更改文件的状态。相反，用户代码应直接打开/读取/写入文件，并处理文件不可访问时引发的错误。

**写入（不推荐）**

```mjs
import { access, open, close } from 'node:fs';

access('myfile', (err) => {
  if (!err) {
    console.error('myfile already exists');
    return;
  }

  open('myfile', 'wx', (err, fd) => {
    if (err) throw err;

    try {
      writeMyData(fd);
    } finally {
      close(fd, (err) => {
        if (err) throw err;
      });
    }
  });
});
```

**写入（推荐）**

```mjs
import { open, close } from 'node:fs';

open('myfile', 'wx', (err, fd) => {
  if (err) {
    if (err.code === 'EEXIST') {
      console.error('myfile already exists');
      return;
    }

    throw err;
  }

  try {
    writeMyData(fd);
  } finally {
    close(fd, (err) => {
      if (err) throw err;
    });
  }
});
```

**读取（不推荐）**

```mjs
import { access, open, close } from 'node:fs';
access('myfile', (err) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.error('myfile does not exist');
      return;
    }

    throw err;
  }

  open('myfile', 'r', (err, fd) => {
    if (err) throw err;

    try {
      readMyData(fd);
    } finally {
      close(fd, (err) => {
        if (err) throw err;
      });
    }
  });
});
```

**读取（推荐）**

```mjs
import { open, close } from 'node:fs';

open('myfile', 'r', (err, fd) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.error('myfile does not exist');
      return;
    }

    throw err;
  }

  try {
    readMyData(fd);
  } finally {
    close(fd, (err) => {
      if (err) throw err;
    });
  }
});
```

上面的“不推荐”示例先检查可访问性然后使用文件；“推荐”示例更好，因为它们直接使用文件并处理错误（如果有）。

通常，仅在文件不会被直接使用时才检查文件的可访问性，例如当其可访问性是来自另一个进程的信号时。

在 Windows 上，目录上的访问控制策略 (ACL) 可能会限制对文件或目录的访问。然而，`fs.access()` 函数不检查 ACL，因此即使 ACL 限制用户读取或写入，它也可能报告路径是可访问的。

### `fs.appendFile(path, data[, options], callback)`

<!-- YAML
added: v0.6.7
changes:
  - version:
    - v21.1.0
    - v20.10.0
    pr-url: https://github.com/nodejs/node/pull/50095
    description: "现在支持 `flush` 选项。"
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是 `ERR_INVALID_CALLBACK`。"
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/12562
    description: "`callback` 参数不再是可选的。不传递它将在运行时抛出 `TypeError`。"
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: "`callback` 参数不再是可选的。不传递它将发出 id 为 DEP0013 的弃用警告。"
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7831
    description: "传入的 `options` 对象将永远不会被修改。"
  - version: v5.0.0
    pr-url: https://github.com/nodejs/node/pull/3163
    description: "`file` 参数现在可以是文件描述符。"
-->

* `path` {string|Buffer|URL|number} 文件名或文件描述符
* `data` {string|Buffer}
* `options` {Object|string}
  * `encoding` {string|null} **默认：** `'utf8'`
  * `mode` {integer} **默认：** `0o666`
  * `flag` {string} 参见 [文件系统 `flags` 的支持][]。**默认：** `'a'`。
  * `flush` {boolean} 如果为 `true`，则在关闭底层文件描述符之前将其刷新。**默认：** `false`。
* `callback` {Function}
  * `err` {Error}

异步将数据追加到文件，如果文件尚不存在则创建该文件。`data` 可以是字符串或 {Buffer}。

`mode` 选项仅影响新创建的文件。有关更多详细信息，请参阅 [`fs.open()`][]。

```mjs
import { appendFile } from 'node:fs';

appendFile('message.txt', 'data to append', (err) => {
  if (err) throw err;
  console.log('“data to append” 已附加到文件！');
});
```

如果 `options` 是字符串，则它指定编码：

```mjs
import { appendFile } from 'node:fs';

appendFile('message.txt', 'data to append', 'utf8', callback);
```

`path` 可以指定为已打开用于追加的数字文件描述符（使用 `fs.open()` 或 `fs.openSync()`）。文件描述符不会自动关闭。

```mjs
import { open, close, appendFile } from 'node:fs';

function closeFd(fd) {
  close(fd, (err) => {
    if (err) throw err;
  });
}

open('message.txt', 'a', (err, fd) => {
  if (err) throw err;

  try {
    appendFile(fd, 'data to append', 'utf8', (err) => {
      closeFd(fd);
      if (err) throw err;
    });
  } catch (err) {
    closeFd(fd);
    throw err;
  }
});
```

### `fs.chmod(path, mode, callback)`

<!-- YAML
added: v0.1.30
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是 `ERR_INVALID_CALLBACK`。"
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/12562
    description: "`callback` 参数不再是可选的。不传递它将在运行时抛出 `TypeError`。"
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`path` 参数可以是使用 `file:` 协议的 WHATWG `URL` 对象。"
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: "`callback` 参数不再是可选的。不传递它将发出 id 为 DEP0013 的弃用警告。"
-->

* `path` {string|Buffer|URL}
* `mode` {string|integer}
* `callback` {Function}
  * `err` {Error}

异步更改文件的权限。除了可能的异常外，不给完成回调传递任何参数。

有关更多详细信息，请参阅 POSIX chmod(2) 文档。

```mjs
import { chmod } from 'node:fs';

chmod('my_file.txt', 0o775, (err) => {
  if (err) throw err;
  console.log('文件 "my_file.txt" 的权限已更改！');
});
```

#### 文件模式

`fs.chmod()` 和 `fs.chmodSync()` 方法中使用的 `mode` 参数是一个数字位掩码，使用以下常量的逻辑 OR 创建：

| 常量 | 八进制 | 描述 |
| ------ | ------- | ------------------------ |
| `fs.constants.S_IRUSR` | `0o400` | 所有者可读 |
| `fs.constants.S_IWUSR` | `0o200` | 所有者可写 |
| `fs.constants.S_IXUSR` | `0o100` | 所有者可执行/搜索 |
| `fs.constants.S_IRGRP` | `0o40`  | 组可读 |
| `fs.constants.S_IWGRP` | `0o20`  | 组可写 |
| `fs.constants.S_IXGRP` | `0o10`  | 组可执行/搜索 |
| `fs.constants.S_IROTH` | `0o4`   | 其他人可读 |
| `fs.constants.S_IWOTH` | `0o2`   | 其他人可写 |
| `fs.constants.S_IXOTH` | `0o1`   | 其他人可执行/搜索 |

构造 `mode` 的更简单方法是使用三个八进制数字序列（例如 `765`）。最左边的数字（示例中的 `7`）指定文件所有者的权限。中间的数字（示例中的 `6`）指定组的权限。最右边的数字（示例中的 `5`）指定其他人的权限。

| 数字 | 描述 |
| ------ | ------------------------ |
| `7`    | 读、写和执行 |
| `6`    | 读和写 |
| `5`    | 读和执行 |
| `4`    | 只读 |
| `3`    | 写和执行 |
| `2`    | 只写 |
| `1`    | 只执行 |
| `0`    | 无权限 |

例如，八进制值 `0o765` 意味着：

* 所有者可以读、写和执行文件。
* 组可以读和写文件。
* 其他人可以读和执行文件。

当在期望文件模式的场合使用原始数字时，任何大于 `0o777` 的值都可能导致平台特定的行为，这些行为不支持一致地工作。因此，像 `S_ISVTX`、`S_ISGID` 或 `S_ISUID` 这样的常量不在 `fs.constants` 中暴露。

注意事项：在 Windows 上，只能更改写权限，并且未实现组、所有者或其他人之间权限的区别。

### `fs.chown(path, uid, gid, callback)`

<!-- YAML
added: v0.1.97
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是 `ERR_INVALID_CALLBACK`。"
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/12562
    description: "`callback` 参数不再是可选的。不传递它将在运行时抛出 `TypeError`。"
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`path` 参数可以是使用 `file:` 协议的 WHATWG `URL` 对象。"
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: "`callback` 参数不再是可选的。不传递它将发出 id 为 DEP0013 的弃用警告。"
-->

* `path` {string|Buffer|URL}
* `uid` {integer}
* `gid` {integer}
* `callback` {Function}
  * `err` {Error}

异步更改文件的所有者和组。除了可能的异常外，不给完成回调传递任何参数。

有关更多详细信息，请参阅 POSIX chown(2) 文档。

### `fs.close(fd[, callback])`

<!-- YAML
added: v0.0.2
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是 `ERR_INVALID_CALLBACK`。"
  - version:
      - v15.9.0
      - v14.17.0
    pr-url: https://github.com/nodejs/node/pull/37174
    description: 如果未提供回调，现在使用默认回调。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/12562
    description: "`callback` 参数不再是可选的。不传递它将在运行时抛出 `TypeError`。"
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: "`callback` 参数不再是可选的。不传递它将发出 id 为 DEP0013 的弃用警告。"
-->

* `fd` {integer}
* `callback` {Function}
  * `err` {Error}

关闭文件描述符。除了可能的异常外，不给完成回调传递任何参数。

对当前通过任何其他 `fs` 操作使用的任何文件描述符 (`fd`) 调用 `fs.close()` 可能会导致未定义的行为。

有关更多详细信息，请参阅 POSIX close(2) 文档。

### `fs.copyFile(src, dest[, mode], callback)`

<!-- YAML
added: v8.5.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是 `ERR_INVALID_CALLBACK`。"
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/27044
    description: "将 `flags` 参数更改为 `mode` 并实施更严格的类型验证。"
-->

* `src` {string|Buffer|URL} 要复制的源文件名
* `dest` {string|Buffer|URL} 复制操作的目标文件名
* `mode` {integer} 复制操作的修饰符。**默认：** `0`。
* `callback` {Function}
  * `err` {Error}

异步将 `src` 复制到 `dest`。默认情况下，如果 `dest` 已存在，则会被覆盖。除了可能的异常外，不给回调函数传递任何参数。Node.js 不对复制操作的原子性做出任何保证。如果在为目标文件打开写入后发生错误，Node.js 将尝试删除目标。

`mode` 是一个可选整数，指定复制操作的行为。可以创建一个由两个或更多值的按位 OR 组成的掩码（例如 `fs.constants.COPYFILE_EXCL | fs.constants.COPYFILE_FICLONE`）。

* `fs.constants.COPYFILE_EXCL`：如果 `dest` 已存在，则复制操作将失败。
* `fs.constants.COPYFILE_FICLONE`：复制操作将尝试创建写时复制 reflink。如果平台不支持写时复制，则使用回退复制机制。
* `fs.constants.COPYFILE_FICLONE_FORCE`：复制操作将尝试创建写时复制 reflink。如果平台不支持写时复制，则操作将失败。

```mjs
import { copyFile, constants } from 'node:fs';

function callback(err) {
  if (err) throw err;
  console.log('source.txt was copied to destination.txt');
}

// 默认情况下，destination.txt 将被创建或覆盖。
copyFile('source.txt', 'destination.txt', callback);

// 通过使用 COPYFILE_EXCL，如果 destination.txt 存在，操作将失败。
copyFile('source.txt', 'destination.txt', constants.COPYFILE_EXCL, callback);
```

### `fs.cp(src, dest[, options], callback)`

<!-- YAML
added: v16.7.0
changes:
  - version: v22.3.0
    pr-url: https://github.com/nodejs/node/pull/53127
    description: 此 API 不再是实验性的。
  - version:
    - v20.1.0
    - v18.17.0
    pr-url: https://github.com/nodejs/node/pull/47084
    description: "接受额外的 `mode` 选项以指定复制行为，作为 `fs.copyFile()` 的 `mode` 参数。"
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是 `ERR_INVALID_CALLBACK`。"
  - version:
    - v17.6.0
    - v16.15.0
    pr-url: https://github.com/nodejs/node/pull/41819
    description: "接受额外的 `verbatimSymlinks` 选项以指定是否对符号链接执行路径解析。"
-->

* `src` {string|URL} 要复制的源路径。
* `dest` {string|URL} 要复制到的目标路径。
* `options` {Object}
  * `dereference` {boolean} 解引用符号链接。**默认：** `false`。
  * `errorOnExist` {boolean} 当 `force` 为 `false` 且目标存在时，抛出错误。**默认：** `false`。
  * `filter` {Function} 用于过滤复制的文件/目录的函数。返回 `true` 以复制该项目，`false` 以忽略它。忽略目录时，其所有内容也将被跳过。也可以返回一个解析为 `true` 或 `false` 的 `Promise`。**默认：** `undefined`。
    * `src` {string} 要复制的源路径。
    * `dest` {string} 要复制到的目标路径。
    * 返回：{boolean|Promise} 可强制转换为 `boolean` 的值或履行此类值的 `Promise`。
  * `force` {boolean} 覆盖现有文件或目录。如果将此设置为 false 且目标存在，复制操作将忽略错误。使用 `errorOnExist` 选项更改此行为。**默认：** `true`。
  * `mode` {integer} 复制操作的修饰符。**默认：** `0`。参见 [`fs.copyFile()`][] 的 `mode` 标志。
  * `preserveTimestamps` {boolean} 当为 `true` 时，将保留 `src` 的时间戳。**默认：** `false`。
  * `recursive` {boolean} 递归复制目录。**默认：** `false`
  * `verbatimSymlinks` {boolean} 当为 `true` 时，将跳过符号链接的路径解析。**默认：** `false`
* `callback` {Function}
  * `err` {Error}

异步将整个目录结构（包括子目录和文件）从 `src` 复制到 `dest`。

将目录复制到另一个目录时，不支持 glob，行为类似于 `cp dir1/ dir2/`。

### `fs.createReadStream(path[, options])`

<!-- YAML
added: v0.1.31
changes:
  - version: v16.10.0
    pr-url: https://github.com/nodejs/node/pull/40013
    description: "如果提供了 `fd`，`fs` 选项不需要 `open` 方法。"
  - version: v16.10.0
    pr-url: https://github.com/nodejs/node/pull/40013
    description: "如果 `autoClose` 为 `false`，`fs` 选项不需要 `close` 方法。"
  - version: v15.5.0
    pr-url: https://github.com/nodejs/node/pull/36431
    description: "添加对 `AbortSignal` 的支持。"
  - version:
     - v15.4.0
    pr-url: https://github.com/nodejs/node/pull/35922
    description: "`fd` 选项接受 FileHandle 参数。"
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/31408
    description: "将 `emitClose` 默认值更改为 `true`。"
  - version:
     - v13.6.0
     - v12.17.0
    pr-url: https://github.com/nodejs/node/pull/29083
    description: "`fs` 选项允许覆盖使用的 `fs` 实现。"
  - version: v12.10.0
    pr-url: https://github.com/nodejs/node/pull/29212
    description: "启用 `emitClose` 选项。"
  - version: v11.0.0
    pr-url: https://github.com/nodejs/node/pull/19898
    description: "对 `start` 和 `end` 施加新的限制，在无法合理处理输入值的情况下抛出更合适的错误。"
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`path` 参数可以是使用 `file:` 协议的 WHATWG `URL` 对象。"
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7831
    description: "传入的 `options` 对象将永远不会被修改。"
  - version: v2.3.0
    pr-url: https://github.com/nodejs/node/pull/1845
    description: "传入的 `options` 对象现在可以是字符串。"
-->

* `path` {string|Buffer|URL}
* `options` {string|Object}
  * `flags` {string} 参见 [文件系统 `flags` 的支持][]。**默认：** `'r'`。
  * `encoding` {string} **默认：** `null`
  * `fd` {integer|FileHandle} **默认：** `null`
  * `mode` {integer} **默认：** `0o666`
  * `autoClose` {boolean} **默认：** `true`
  * `emitClose` {boolean} **默认：** `true`
  * `start` {integer}
  * `end` {integer} **默认：** `Infinity`
  * `highWaterMark` {integer} **默认：** `64 * 1024`
  * `fs` {Object|null} **默认：** `null`
  * `signal` {AbortSignal|null} **默认：** `null`
* 返回：{fs.ReadStream}

`options` 可以包括 `start` 和 `end` 值，以从文件读取字节范围而不是整个文件。`start` 和 `end` 都包含在内，并从 0 开始计数，允许的值在 \[0, [`Number.MAX_SAFE_INTEGER`][]] 范围内。如果指定了 `fd` 且省略了 `start` 或为 `undefined`，`fs.createReadStream()` 将从当前文件位置顺序读取。`encoding` 可以是 {Buffer} 接受的任何值。

如果指定了 `fd`，`ReadStream` 将忽略 `path` 参数并使用指定的文件描述符。这意味着不会发出 `'open'` 事件。`fd` 应该是阻塞的；非阻塞 `fd` 应传递给 {net.Socket}。

如果 `fd` 指向仅支持阻塞读取的字符设备（例如键盘或声卡），则读取操作直到数据可用时才完成。这可能会阻止进程退出并且流无法自然关闭。

默认情况下，流在被销毁后会发出 `'close'` 事件。将 `emitClose` 选项设置为 `false` 以更改此行为。

通过提供 `fs` 选项，可以覆盖 `open`、`read` 和 `close` 的相应 `fs` 实现。提供 `fs` 选项时，需要覆盖 `read`。如果未提供 `fd`，还需要覆盖 `open`。如果 `autoClose` 为 `true`，还需要覆盖 `close`。

```mjs
import { createReadStream } from 'node:fs';

// 从某个字符设备创建流。
const stream = createReadStream('/dev/input/event0');
setTimeout(() => {
  stream.close(); // 这可能不会关闭流。
  // 人为地标记流结束，就像底层资源本身指示文件结束一样，允许流关闭。
  // 这不会取消待处理的读取操作，如果有这样的操作，进程可能仍然无法成功退出
  // 直到它完成。
  stream.push(null);
  stream.read(0);
}, 100);
```

如果 `autoClose` 为 false，则即使有错误，文件描述符也不会关闭。应用程序有责任关闭它并确保没有文件描述符泄漏。如果 `autoClose` 设置为 true（默认行为），则在 `'error'` 或 `'end'` 时文件描述符将自动关闭。

`mode` 设置文件模式（权限和粘滞位），但仅在创建文件时生效。

读取一个 100 字节长的文件的最后 10 字节的示例：

```mjs
import { createReadStream } from 'node:fs';

createReadStream('sample.txt', { start: 90, end: 99 });
```

如果 `options` 是字符串，则它指定编码。

### `fs.createWriteStream(path[, options])`

<!-- YAML
added: v0.1.31
changes:
  - version:
    - v21.0.0
    - v20.10.0
    pr-url: https://github.com/nodejs/node/pull/50093
    description: "现在支持 `flush` 选项。"
  - version: v16.10.0
    pr-url: https://github.com/nodejs/node/pull/40013
    description: "如果提供了 `fd`，`fs` 选项不需要 `open` 方法。"
  - version: v16.10.0
    pr-url: https://github.com/nodejs/node/pull/40013
    description: "如果 `autoClose` 为 `false`，`fs` 选项不需要 `close` 方法。"
  - version: v15.5.0
    pr-url: https://github.com/nodejs/node/pull/36431
    description: "添加对 `AbortSignal` 的支持。"
  - version:
     - v15.4.0
    pr-url: https://github.com/nodejs/node/pull/35922
    description: "`fd` 选项接受 FileHandle 参数。"
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/31408
    description: "将 `emitClose` 默认值更改为 `true`。"
  - version:
     - v13.6.0
     - v12.17.0
    pr-url: https://github.com/nodejs/node/pull/29083
    description: "`fs` 选项允许覆盖使用的 `fs` 实现。"
  - version: v12.10.0
    pr-url: https://github.com/nodejs/node/pull/29212
    description: "启用 `emitClose` 选项。"
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`path` 参数可以是使用 `file:` 协议的 WHATWG `URL` 对象。"
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7831
    description: "传入的 `options` 对象将永远不会被修改。"
  - version: v5.5.0
    pr-url: https://github.com/nodejs/node/pull/3679
    description: "现在支持 `autoClose` 选项。"
  - version: v2.3.0
    pr-url: https://github.com/nodejs/node/pull/1845
    description: "传入的 `options` 对象现在可以是字符串。"
-->

* `path` {string|Buffer|URL}
* `options` {string|Object}
  * `flags` {string} 参见 [文件系统 `flags` 的支持][]。**默认：** `'w'`。
  * `encoding` {string} **默认：** `'utf8'`
  * `fd` {integer|FileHandle} **默认：** `null`
  * `mode` {integer} **默认：** `0o666`
  * `autoClose` {boolean} **默认：** `true`
  * `emitClose` {boolean} **默认：** `true`
  * `start` {integer}
  * `fs` {Object|null} **默认：** `null`
  * `signal` {AbortSignal|null} **默认：** `null`
  * `highWaterMark` {number} **默认：** `16384`
  * `flush` {boolean} 如果为 `true`，则在关闭底层文件描述符之前将其刷新。**默认：** `false`。
* 返回：{fs.WriteStream}

`options` 还可以包括 `start` 选项，以允许在文件开头之后的某个位置写入数据，允许的值在 \[0, [`Number.MAX_SAFE_INTEGER`][]] 范围内。修改文件而不是替换它可能需要将 `flags` 选项设置为 `r+` 而不是默认的 `w`。`encoding` 可以是 {Buffer} 接受的任何值。

如果 `autoClose` 设置为 true（默认行为），则在 `'error'` 或 `'finish'` 时文件描述符将自动关闭。如果 `autoClose` 为 false，则即使有错误，文件描述符也不会关闭。应用程序有责任关闭它并确保没有文件描述符泄漏。

默认情况下，流在被销毁后会发出 `'close'` 事件。将 `emitClose` 选项设置为 `false` 以更改此行为。

通过提供 `fs` 选项，可以覆盖 `open`、`write`、`writev` 和 `close` 的相应 `fs` 实现。在不使用 `writev()` 的情况下覆盖 `write()` 可能会降低性能，因为某些优化 (`_writev()`) 将被禁用。提供 `fs` 选项时，需要至少覆盖 `write` 和 `writev` 之一。如果未提供 `fd` 选项，还需要覆盖 `open`。如果 `autoClose` 为 `true`，还需要覆盖 `close`。

像 {fs.ReadStream} 一样，如果指定了 `fd`，{fs.WriteStream} 将忽略 `path` 参数并使用指定的文件描述符。这意味着不会发出 `'open'` 事件。`fd` 应该是阻塞的；非阻塞 `fd` 应传递给 {net.Socket}。

如果 `options` 是字符串，则它指定编码。

### `fs.exists(path, callback)`

<!-- YAML
added: v0.0.2
deprecated: v1.0.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是 `ERR_INVALID_CALLBACK`。"
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`path` 参数可以是使用 `file:` 协议的 WHATWG `URL` 对象。"
-->

> 稳定性：0 - 已弃用：改用 [`fs.stat()`][] 或 [`fs.access()`][]。

* `path` {string|Buffer|URL}
* `callback` {Function}
  * `exists` {boolean}

通过检查文件系统测试给定 `path` 处的元素是否存在。然后使用 true 或 false 调用 `callback` 参数：

```mjs
import { exists } from 'node:fs';

exists('/etc/passwd', (e) => {
  console.log(e ? 'it exists' : 'no passwd!');
});
```

**此回调的参数与其他 Node.js 回调不一致。** 通常，Node.js 回调的第一个参数是 `err` 参数， optionally 后跟其他参数。`fs.exists()` 回调只有一个布尔参数。这是推荐使用 `fs.access()` 而不是 `fs.exists()` 的原因之一。

如果 `path` 是符号链接，则会被跟随。因此，如果 `path` 存在但指向不存在的元素，回调将接收值 `false`。

不建议在调用 `fs.open()`、`fs.readFile()` 或 `fs.writeFile()` 之前使用 `fs.exists()` 检查文件是否存在。这样做会引入竞争条件，因为其他进程可能会在两次调用之间更改文件的状态。相反，用户代码应直接打开/读取/写入文件，并处理文件不存在时引发的错误。

**写入（不推荐）**

```mjs
import { exists, open, close } from 'node:fs';

exists('myfile', (e) => {
  if (e) {
    console.error('myfile already exists');
  } else {
    open('myfile', 'wx', (err, fd) => {
      if (err) throw err;

      try {
        writeMyData(fd);
      } finally {
        close(fd, (err) => {
          if (err) throw err;
        });
      }
    });
  }
});
```

**写入（推荐）**

```mjs
import { open, close } from 'node:fs';
open('myfile', 'wx', (err, fd) => {
  if (err) {
    if (err.code === 'EEXIST') {
      console.error('myfile already exists');
      return;
    }

    throw err;
  }

  try {
    writeMyData(fd);
  } finally {
    close(fd, (err) => {
      if (err) throw err;
    });
  }
});
```

**读取（不推荐）**

```mjs
import { open, close, exists } from 'node:fs';

exists('myfile', (e) => {
  if (e) {
    open('myfile', 'r', (err, fd) => {
      if (err) throw err;

      try {
        readMyData(fd);
      } finally {
        close(fd, (err) => {
          if (err) throw err;
        });
      }
    });
  } else {
    console.error('myfile does not exist');
  }
});
```

**读取（推荐）**

```mjs
import { open, close } from 'node:fs';

open('myfile', 'r', (err, fd) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.error('myfile does not exist');
      return;
    }

    throw err;
  }

  try {
    readMyData(fd);
  } finally {
    close(fd, (err) => {
      if (err) throw err;
    });
  }
});
```

上面的“不推荐”示例先检查存在性然后使用文件；“推荐”示例更好，因为它们直接使用文件并处理错误（如果有）。

通常，仅在文件不会被直接使用时才检查文件的存在性，例如当其存在性是来自另一个进程的信号时。

### `fs.fchmod(fd, mode, callback)`

<!-- YAML
added: v0.4.7
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是 `ERR_INVALID_CALLBACK`。"
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/12562
    description: "`callback` 参数不再是可选的。不传递它将在运行时抛出 `TypeError`。"
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: "`callback` 参数不再是可选的。不传递它将发出 id 为 DEP0013 的弃用警告。"
-->

* `fd` {integer}
* `mode` {string|integer}
* `callback` {Function}
  * `err` {Error}

设置文件上的权限。除了可能的异常外，不给完成回调传递任何参数。

有关更多详细信息，请参阅 POSIX fchmod(2) 文档。

### `fs.fchown(fd, uid, gid, callback)`

<!-- YAML
added: v0.4.7
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是 `ERR_INVALID_CALLBACK`。"
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/12562
    description: "`callback` 参数不再是可选的。不传递它将在运行时抛出 `TypeError`。"
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: "`callback` 参数不再是可选的。不传递它将发出 id 为 DEP0013 的弃用警告。"
-->

* `fd` {integer}
* `uid` {integer}
* `gid` {integer}
* `callback` {Function}
  * `err` {Error}

设置文件的所有者。除了可能的异常外，不给完成回调传递任何参数。

有关更多详细信息，请参阅 POSIX fchown(2) 文档。

### `fs.fdatasync(fd, callback)`

<!-- YAML
added: v0.1.96
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是 `ERR_INVALID_CALLBACK`。"
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/12562
    description: "`callback` 参数不再是可选的。不传递它将在运行时抛出 `TypeError`。"
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: "`callback` 参数不再是可选的。不传递它将发出 id 为 DEP0013 的弃用警告。"
-->

* `fd` {integer}
* `callback` {Function}
  * `err` {Error}

强制所有当前与该文件关联的排队 I/O 操作进入操作系统的同步 I/O 完成状态。有关详细信息，请参阅 POSIX fdatasync(2) 文档。除了可能的异常外，不给完成回调传递任何参数。

### `fs.fstat(fd[, options], callback)`

<!-- YAML
added: v0.1.95
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是 `ERR_INVALID_CALLBACK`。"
  - version: v10.5.0
    pr-url: https://github.com/nodejs/node/pull/20220
    description: "接受额外的 `options` 对象以指定返回的数值是否应为 bigint。"
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/12562
    description: "`callback` 参数不再是可选的。不传递它将在运行时抛出 `TypeError`。"
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: "`callback` 参数不再是可选的。不传递它将发出 id 为 DEP0013 的弃用警告。"
-->

* `fd` {integer}
* `options` {Object}
  * `bigint` {boolean} 返回的 {fs.Stats} 对象中的数值是否应为 `bigint`。**默认：** `false`。
* `callback` {Function}
  * `err` {Error}
  * `stats` {fs.Stats}

使用文件描述符的 {fs.Stats} 调用回调。

有关更多详细信息，请参阅 POSIX fstat(2) 文档。

### `fs.fsync(fd, callback)`

<!-- YAML
added: v0.1.96
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是 `ERR_INVALID_CALLBACK`。"
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/12562
    description: "`callback` 参数不再是可选的。不传递它将在运行时抛出 `TypeError`。"
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: "`callback` 参数不再是可选的。不传递它将发出 id 为 DEP0013 的弃用警告。"
-->

* `fd` {integer}
* `callback` {Function}
  * `err` {Error}

请求将打开文件描述符的所有数据刷新到存储设备。具体实现取决于操作系统和设备。有关更多详细信息，请参阅 POSIX fsync(2) 文档。除了可能的异常外，不给完成回调传递任何参数。

### `fs.ftruncate(fd[, len], callback)`

<!-- YAML
added: v0.8.6
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是`ERR_INVALID_CALLBACK`。"
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/12562
    description: "`callback` 参数不再是可选的。不传递它将在运行时抛出 `TypeError`。"
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: "`callback` 参数不再是可选的。不传递它将发出 id 为 DEP0013 的弃用警告。"
-->

* `fd` {integer}
* `len` {integer} **默认：** `0`
* `callback` {Function}
  * `err` {Error}

截断文件描述符。除了可能的异常外，不给完成回调传递任何参数。

有关更多详细信息，请参阅 POSIX ftruncate(2) 文档。

如果文件描述符引用的文件大于 `len` 字节，则文件中只保留前 `len` 字节。

例如，以下程序仅保留文件的前四个字节：

```mjs
import { open, close, ftruncate } from 'node:fs';

function closeFd(fd) {
  close(fd, (err) => {
    if (err) throw err;
  });
}

open('temp.txt', 'r+', (err, fd) => {
  if (err) throw err;

  try {
    ftruncate(fd, 4, (err) => {
      closeFd(fd);
      if (err) throw err;
    });
  } catch (err) {
    closeFd(fd);
    if (err) throw err;
  }
});
```

如果文件以前短于 `len` 字节，则它会扩展，扩展部分填充空字节 (`'\0'`)：

如果 `len` 为负数，则将使用 `0`。

### `fs.futimes(fd, atime, mtime, callback)`

<!-- YAML
added: v0.4.2
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是 `ERR_INVALID_CALLBACK`。"
  - version: v10.0.0
    pr-url: https://githubjs/node/pull/12562
    description: "`callback` 参数不再是可选的。不传递它将在运行时抛出 `TypeError`。"
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: "`callback` 参数不再是可选的。不传递它将发出 id 为 DEP0013 的弃用警告。"
  - version: v4.1.0
    pr-url: https://github.com/nodejs/node/pull/2387
    description: "现在允许数字字符串、`NaN` 和 `Infinity` 作为时间说明符。"
-->

* `fd` {integer}
* `atime` {number|string|Date}
* `mtime` {number|string|Date}
* `callback` {Function}
  * `err` {Error}

更改由提供的文件描述符引用的对象的文件系统时间戳。参见 [`fs.utimes()`][]。

### `fs.glob(pattern[, options], callback)`

<!-- YAML
added: v22.0.0
changes:
  - version: v26.1.0
    pr-url: https://github.com/nodejs/node/pull/62695
    description: 添加对 `followSymlinks` 选项的支持。
  - version:
      - v24.1.0
      - v22.17.0
    pr-url: https://github.com/nodejs/node/pull/58182
    description: "为 `cwd` 选项添加对 `URL` 实例的支持。"
  - version:
      - v24.0.0
      - v22.17.0
    pr-url: https://github.com/nodejs/node/pull/57513
    description: 标记 API 为稳定。
  - version:
    - v23.7.0
    - v22.14.0
    pr-url: https://github.com/nodejs/node/pull/56489
    description: "添加对 `exclude` 选项的支持以接受 glob 模式。"
  - version: v22.2.0
    pr-url: https://github.com/nodejs/node/pull/52837
    description: "添加对 `withFileTypes` 作为选项的支持。"
-->

* `pattern` {string|string\[]}

* `options` {Object}
  * `cwd` {string|URL} 当前工作目录。**默认：** `process.cwd()`
  * `exclude` {Function|string\[]} 用于过滤文件/目录的函数，或
    要排除的 glob 模式列表。如果提供函数，返回
    `true` 以排除该项，`false` 以包含它。**默认：** `undefined`。
  * `followSymlinks` {boolean} 当为 `true` 时，在展开 `**` 模式时会跟随指向目录的符号链接。**默认：** `false`。
  * `withFileTypes` {boolean} 如果 glob 应将路径作为 Dirent 返回则为 `true`，否则为 `false`。**默认：** `false`。

* `callback` {Function}
  * `err` {Error}

* 检索匹配指定模式的文件。

当启用 `followSymlinks` 时，检测到的符号链接循环不会被递归遍历。

```mjs
import { glob } from 'node:fs';

glob('**/*.js', (err, matches) => {
  if (err) throw err;
  console.log(matches);
});
```

```cjs
const { glob } = require('node:fs');

glob('**/*.js', (err, matches) => {
  if (err) throw err;
  console.log(matches);
});
```

### `fs.lchmod(path, mode, callback)`

<!-- YAML
deprecated: v0.4.7
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是`ERR_INVALID_CALLBACK`。"
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/37460
    description: "如果返回多个错误，返回的错误可能是 `AggregateError`。"
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/12562
    description: "`callback` 参数不再是可选的。不传递它将在运行时抛出 `TypeError`。"
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: "`callback` 参数不再是可选的。不传递它将发出 id 为 DEP0013 的弃用警告。"
-->

> 稳定性：0 - 已弃用

* `path` {string|Buffer|URL}
* `mode` {integer}
* `callback` {Function}
  * `err` {Error|AggregateError}

更改符号链接上的权限。除了可能的异常外，不给完成回调传递任何参数。

此方法仅在 macOS 上实现。

有关更多详细信息，请参阅 POSIX lchmod(2) 文档。

### `fs.lchown(path, uid, gid, callback)`

<!-- YAML
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是 `ERR_INVALID_CALLBACK`。"
  - version: v10.6.0
    pr-url: https://github.com/nodejs/node/pull/21498
    description: 此 API 不再弃用。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/12562
    description: "`callback` 参数不再是可选的。不传递它将在运行时抛出 `TypeError`。"
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: "`callback` 参数不再是可选的。不传递它将发出 id 为 DEP0013 的弃用警告。"
  - version: v0.4.7
    description: 仅文档弃用。
-->

* `path` {string|Buffer|URL}
* `uid` {integer}
* `gid` {integer}
* `callback` {Function}
  * `err` {Error}

设置符号链接的所有者。除了可能的异常外，不给完成回调传递任何参数。

有关更多详细信息，请参阅 POSIX lchown(2) 文档。

### `fs.lutimes(path, atime, mtime, callback)`

<!-- YAML
added:
  - v14.5.0
  - v12.19.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是`ERR_INVALID_CALLBACK`。"
-->

* `path` {string|Buffer|URL}
* `atime` {number|string|Date}
* `mtime` {number|string|Date}
* `callback` {Function}
  * `err` {Error}

以与 [`fs.utimes()`][] 相同的方式更改文件的访问和修改时间，不同之处在于如果路径引用符号链接，则链接不会被解引用：相反，符号链接本身的时间戳会被更改。

除了可能的异常外，不给完成回调传递任何参数。

### `fs.link(existingPath, newPath, callback)`

<!-- YAML
added: v0.1.31
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是`ERR_INVALID_CALLBACK`。"
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/12562
    description: "`callback` 参数不再是可选的。不传递它将在运行时抛出 `TypeError`。"
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`existingPath` 和 `newPath` 参数可以是使用 `file:` 协议的 WHATWG `URL` 对象。支持目前仍是 *实验性的*。"
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: "`callback` 参数不再是可选的。不传递它将发出 id 为 DEP0013 的弃用警告。"
-->

* `existingPath` {string|Buffer|URL}
* `newPath` {string|Buffer|URL}
* `callback` {Function}
  * `err` {Error}

创建从 `existingPath` 到 `newPath` 的新链接。有关更多详细信息，请参阅 POSIX link(2) 文档。除了可能的异常外，不给完成回调传递任何参数。

### `fs.lstat(path[, options], callback)`

<!-- YAML
added: v0.1.30
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是`ERR_INVALID_CALLBACK`。"
  - version: v10.5.0
    pr-url: https://github.com/nodejs/node/pull/20220
    description: "接受额外的 `options` 对象以指定返回的数值是否应为 bigint。"
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/12562
    description: "`callback` 参数不再是可选的。不传递它将在运行时抛出 `TypeError`。"
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`path` 参数可以是使用 `file:` 协议的 WHATWG `URL` 对象。"
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: "`callback` 参数不再是可选的。不传递它将发出 id 为 DEP0013 的弃用警告。"
-->

* `path` {string|Buffer|URL}
* `options` {Object}
  * `bigint` {boolean} 返回的 {fs.Stats} 对象中的数值是否应为 `bigint`。**默认：** `false`。
* `callback` {Function}
  * `err` {Error}
  * `stats` {fs.Stats}

检索路径引用的符号链接的 {fs.Stats}。回调获取两个参数 `(err, stats)`，其中 `stats` 是一个 {fs.Stats} 对象。`lstat()` 与 `stat()` 相同，只不过如果 `path` 是符号链接，则统计的是链接本身，而不是它引用的文件。

有关更多详细信息，请参阅 POSIX lstat(2) 文档。

### `fs.mkdir(path[, options], callback)`

<!-- YAML
added: v0.1.8
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是`ERR_INVALID_CALLBACK`。"
  - version:
     - v13.11.0
     - v12.17.0
    pr-url: https://github.com/nodejs/node/pull/31530
    description: "在 `recursive` 模式下，回调现在接收第一个创建的路径作为参数。"
  - version: v10.12.0
    pr-url: https://github.com/nodejs/node/pull/21875
    description: "第二个参数现在可以是一个带有`recursive` 和 `mode` 属性的 `options` 对象。"
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/12562
    description: "`callback` 参数不再是可选的。不传递它将在运行时抛出 `TypeError`。"
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`path` 参数可以是使用 `file:`协议的 WHATWG `URL` 对象。"
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: "`callback` 参数不再是可选的。不传递它将发出带有 id DEP0013 的弃用警告。"
-->

* `path` {string|Buffer|URL}
* `options` {Object|integer}
  * `recursive` {boolean} **默认值：** `false`
  * `mode` {string|integer} 在 Windows 上不支持。参见 [文件模式][]
    了解更多详情。**默认值：** `0o777`。
* `callback` {Function}
  * `err` {Error}
  * `path` {string|undefined} 仅当目录被创建且
    `recursive` 设置为 `true` 时存在。

异步创建一个目录。

回调被给予一个可能的异常，并且如果 `recursive` 为 `true`，则给予
第一个创建的目录路径，`(err[, path])`。
当 `recursive` 为 `true` 时，如果没有创建目录（例如，如果它之前已创建），
`path` 仍然可以是 `undefined`。

可选的 `options` 参数可以是一个指定 `mode`（权限和粘滞位）的整数，
或者是一个带有 `mode` 属性和一个 `recursive` 属性的对象，
指示是否应创建父目录。当 `path` 是一个已存在的目录时调用
`fs.mkdir()` 仅在 `recursive` 为 false 时导致错误。如果 `recursive` 为 false
且目录存在，则发生 `EEXIST` 错误。

```mjs
import { mkdir } from 'node:fs';

// 创建 ./tmp/a/apple，无论 ./tmp 和 ./tmp/a 是否存在。
mkdir('./tmp/a/apple', { recursive: true }, (err) => {
  if (err) throw err;
});
```

在 Windows 上，即使在根目录上使用递归使用 `fs.mkdir()` 也会
导致错误：

```mjs
import { mkdir } from 'node:fs';

mkdir('/', { recursive: true }, (err) => {
  // => [Error: EPERM: 操作不允许，mkdir 'C:\']
});
```

有关更多详细信息，请参阅 POSIX mkdir(2) 文档。

### `fs.mkdtemp(prefix[, options], callback)`

<!-- YAML
added: v5.10.0
changes:
  - version:
    - v20.6.0
    - v18.19.0
    pr-url: https://github.com/nodejs/node/pull/48828
    description: "`prefix` 参数现在接受 buffers 和 URL。"
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是`ERR_INVALID_CALLBACK`。"
  - version:
      - v16.5.0
      - v14.18.0
    pr-url: https://github.com/nodejs/node/pull/39028
    description: "`prefix` 参数现在接受空字符串。"
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/12562
    description: "`callback` 参数不再是可选的。不传递它将在运行时抛出 `TypeError`。"
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: "`callback` 参数不再是可选的。不传递它将发出带有 id DEP0013 的弃用警告。"
  - version: v6.2.1
    pr-url: https://github.com/nodejs/node/pull/6828
    description: "`callback` 参数现在是可选的。"
-->

* `prefix` {string|Buffer|URL}
* `options` {string|Object}
  * `encoding` {string} **默认值：** `'utf8'`
* `callback` {Function}
  * `err` {Error}
  * `directory` {string}

创建一个唯一的临时目录。

生成六个随机字符附加到必需的
`prefix` 后面以创建一个唯一的临时目录。由于平台
不一致，避免在 `prefix` 中使用尾随的 `X` 字符。某些平台，
特别是 BSDs，可以返回超过六个随机字符，并用随机字符替换
`prefix` 中的尾随 `X` 字符。

创建的目录路径作为字符串传递给回调的第二个
参数。

可选的 `options` 参数可以是一个指定编码的字符串，或者是一个
带有 `encoding` 属性的对象，指定要使用的字符编码。

```mjs
import { mkdtemp } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

mkdtemp(join(tmpdir(), 'foo-'), (err, directory) => {
  if (err) throw err;
  console.log(directory);
  // 打印：/tmp/foo-itXde2 或 C:\Users\...\AppData\Local\Temp\foo-itXde2
});
```

`fs.mkdtemp()` 方法会将六个随机选择的字符
直接附加到 `prefix` 字符串。例如，给定一个目录 `/tmp`，如果
意图是创建一个 _在_ `/tmp` _内_ 的临时目录，则 `prefix`
必须以尾随的平台特定路径分隔符
（`require('node:path').sep`）结束。

```mjs
import { tmpdir } from 'node:os';
import { mkdtemp } from 'node:fs';

// 新临时目录的父目录
const tmpDir = tmpdir();

// 此方法 *不正确*：
mkdtemp(tmpDir, (err, directory) => {
  if (err) throw err;
  console.log(directory);
  // 将打印类似 `/tmpabc123` 的内容。
  // 一个新的临时目录被创建在文件系统根目录
  // 而不是 *在* /tmp 目录 *内*。
});

// 此方法 *正确*：
import { sep } from 'node:path';
mkdtemp(`${tmpDir}${sep}`, (err, directory) => {
  if (err) throw err;
  console.log(directory);
  // 将打印类似 `/tmp/abc123` 的内容。
  // 一个新的临时目录被创建在
  // /tmp 目录内。
});
```

### `fs.open(path[, flags[, mode]], callback)`

<!-- YAML
added: v0.0.2
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是`ERR_INVALID_CALLBACK`。"
  - version: v11.1.0
    pr-url: https://github.com/nodejs/node/pull/23767
    description: "`flags` 参数现在是可选的，默认值为 `'r'`。"
  - version: v9.9.0
    pr-url: https://github.com/nodejs/node/pull/18801
    description: "现在支持 `as` 和 `as+` 标志。"
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`path` 参数可以是使用 `file:`协议的 WHATWG `URL` 对象。"
-->

* `path` {string|Buffer|URL}
* `flags` {string|number} 参见 [文件系统 `flags` 的支持][]。
  **默认值：** `'r'`。
* `mode` {string|integer} **默认值：** `0o666`（可读和可写）
* `callback` {Function}
  * `err` {Error}
  * `fd` {integer}

异步文件打开。有关更多详细信息，请参阅 POSIX open(2) 文档。

`mode` 设置文件模式（权限和粘滞位），但仅在文件被
创建时。在 Windows 上，只能操纵写权限；参见
[`fs.chmod()`][]。

回调获取两个参数 `(err, fd)`。

某些字符（`< > : " / \ | ? *`）在 Windows 下被保留，如
[命名文件、路径和命名空间][] 所 documented。在 NTFS 下，如果文件名包含
冒号，Node.js 将打开一个文件系统流，如
[此 MSDN 页面][MSDN-Using-Streams] 所述。

基于 `fs.open()` 的函数也表现出这种行为：
`fs.writeFile()`、`fs.readFile()` 等。

### `fs.openAsBlob(path[, options])`

<!-- YAML
added: v19.8.0
changes:
  - version:
      - v24.0.0
      - v22.17.0
    pr-url: https://github.com/nodejs/node/pull/57513
    description: 标记 API 为稳定。
-->

* `path` {string|Buffer|URL}
* `options` {Object}
  * `type` {string} Blob 的可选 mime 类型。
* 返回：{Promise} 成功时 fulfilled 一个 {Blob}。

返回一个 {Blob}，其数据由给定文件支持。

创建 {Blob} 后不得修改文件。任何修改
都会导致读取 {Blob} 数据失败并抛出 `DOMException` 错误。
在创建 `Blob` 时以及每次读取之前对文件进行同步 stat 操作，
以检测文件数据是否已在磁盘上被修改。

```mjs
import { openAsBlob } from 'node:fs';

const blob = await openAsBlob('the.file.txt');
const ab = await blob.arrayBuffer();
blob.stream();
```

```cjs
const { openAsBlob } = require('node:fs');

(async () => {
  const blob = await openAsBlob('the.file.txt');
  const ab = await blob.arrayBuffer();
  blob.stream();
})();
```

### `fs.opendir(path[, options], callback)`

<!-- YAML
added: v12.12.0
changes:
  - version:
    - v20.1.0
    - v18.17.0
    pr-url: https://github.com/nodejs/node/pull/41439
    description: "添加了 `recursive` 选项。"
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是 `ERR_INVALID_CALLBACK`。"
  - version:
     - v13.1.0
     - v12.16.0
    pr-url: https://github.com/nodejs/node/pull/30114
    description: "引入了 `bufferSize` 选项。"
-->

* `path` {string|Buffer|URL}
* `options` {Object}
  * `encoding` {string|null} **默认值：** `'utf8'`
  * `bufferSize` {number} 从目录读取时内部缓冲的目录条目数。
    较高的值会导致更好的性能但更高的内存 usage。**默认值：** `32`
  * `recursive` {boolean} **默认值：** `false`
* `callback` {Function}
  * `err` {Error}
  * `dir` {fs.Dir}

异步打开一个目录。有关更多详细信息，请参阅 POSIX opendir(3) 文档。

创建一个 {fs.Dir}，其中包含所有用于读取和
清理目录的进一步函数。

`encoding` 选项设置在打开目录和后续读取操作时
`path` 的编码。

### `fs.read(fd, buffer, offset, length, position, callback)`

<!-- YAML
added: v0.0.2
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是 `ERR_INVALID_CALLBACK`。"
  - version: v10.10.0
    pr-url: https://github.com/nodejs/node/pull/22150
    description: "`buffer` 参数现在可以是任何 `TypedArray` 或`DataView`。"
  - version: v7.4.0
    pr-url: https://github.com/nodejs/node/pull/10382
    description: "`buffer` 参数现在可以是 `Uint8Array`。"
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/4518
    description: "`length` 参数现在可以是 `0`。"
-->

* `fd` {integer}
* `buffer` {Buffer|TypedArray|DataView} 数据将被
  写入的缓冲区。
* `offset` {integer} 在 `buffer` 中写入数据的位置。
* `length` {integer} 要读取的字节数。
* `position` {integer|bigint|null} 指定从文件中
  何处开始读取。如果 `position` 为 `null` 或 `-1 `，数据将从当前
  文件位置读取，并且文件位置将被更新。如果 `position` 是
  非负整数，文件位置将保持不变。
* `callback` {Function}
  * `err` {Error}
  * `bytesRead` {integer}
  * `buffer` {Buffer}

从 `fd` 指定的文件读取数据。

回调被给予三个参数，`(err, bytesRead, buffer)`。

如果文件未并发修改，当读取的字节数为零时到达文件末尾。

如果此方法作为其 [`util.promisify()`][] 版本调用，它返回
一个带有 `bytesRead` 和 `buffer` 属性的 `Object` 的 promise。

`fs.read()` 方法从文件描述符 (`fd`) 指定的
文件读取数据。
`length` 参数指示 Node.js
将尝试从内核读取的最大字节数。
但是，实际读取的字节数 (`bytesRead`) 可能低于
指定的 `length`，原因有多种。

例如：

* 如果文件短于指定的 `length`，`bytesRead`
  将设置为实际读取的字节数。
* 如果文件在缓冲区填满之前遇到 EOF (文件末尾)，
  Node.js 将读取所有可用字节直到遇到 EOF，
  并且回调中的 `bytesRead` 参数将指示
  实际读取的字节数，这可能小于指定的 `length`。
* 如果文件在慢速网络 `filesystem` 上
  或在读取期间遇到任何其他问题，
  `bytesRead` 可能低于指定的 `length`。

因此，使用 `fs.read()` 时，重要的是
检查 `bytesRead` 值以
确定实际从文件读取了多少字节。
取决于你的应用程序
逻辑，你可能需要处理 `bytesRead`
低于指定 `length` 的情况，
例如，如果你需要
最小量的字节，则将读取调用包装在循环中。

此行为类似于 POSIX `preadv2` 函数。

### `fs.read(fd[, options], callback)`

<!-- YAML
added:
 - v13.11.0
 - v12.17.0
changes:
  - version:
     - v13.11.0
     - v12.17.0
    pr-url: https://github.com/nodejs/node/pull/31402
    description: "可以传入 Options 对象以使 buffer、offset、length 和 position 可选。"
-->

* `fd` {integer}
* `options` {Object}
  * `buffer` {Buffer|TypedArray|DataView} **默认值：** `Buffer.alloc(16384)`
  * `offset` {integer} **默认值：** `0`
  * `length` {integer} **默认值：** `buffer.byteLength - offset`
  * `position` {integer|bigint|null} **默认值：** `null`
* `callback` {Function}
  * `err` {Error}
  * `bytesRead` {integer}
  * `buffer` {Buffer}

类似于 [`fs.read()`][] 函数，此版本接受一个可选的
`options` 对象。如果未指定 `options` 对象，它将默认使用上述
值。

### `fs.read(fd, buffer[, options], callback)`

<!-- YAML
added:
  - v18.2.0
  - v16.17.0
-->

* `fd` {integer}
* `buffer` {Buffer|TypedArray|DataView} 数据将被
  写入的缓冲区。
* `options` {Object}
  * `offset` {integer} **默认值：** `0`
  * `length` {integer} **默认值：** `buffer.byteLength - offset`
  * `position` {integer|bigint} **默认值：** `null`
* `callback` {Function}
  * `err` {Error}
  * `bytesRead` {integer}
  * `buffer` {Buffer}

类似于 [`fs.read()`][] 函数，此版本接受一个可选的
`options` 对象。如果未指定 `options` 对象，它将默认使用上述
值。

### `fs.readdir(path[, options], callback)`

<!-- YAML
added: v0.1.8
changes:
  - version:
    - v20.1.0
    - v18.17.0
    pr-url: https://github.com/nodejs/node/pull/41439
    description: "添加了 `recursive` 选项。"
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是`ERR_INVALID_CALLBACK`。"
  - version: v10.10.0
    pr-url: https://github.com/nodejs/node/pull/22020
    description: "添加了新选项 `withFileTypes`。"
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/12562
    description: "`callback` 参数不再是可选的。不传递它将在运行时抛出 `TypeError`。"
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`path` 参数可以是使用 `file:`协议的 WHATWG `URL` 对象。"
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: "`callback` 参数不再是可选的。不传递它将发出带有 id DEP0013 的弃用警告。"
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/5616
    description: "添加了 `options` 参数。"
-->

* `path` {string|Buffer|URL}
* `options` {string|Object}
  * `encoding` {string} **默认值：** `'utf8'`
  * `withFileTypes` {boolean} **默认值：** `false`
  * `recursive` {boolean} 如果为 `true`，递归读取目录的内容。
    在递归模式下，它将列出所有文件、子文件和
    目录。**默认值：** `false`。
* `callback` {Function}
  * `err` {Error}
  * `files` {string\[]|Buffer\[]|fs.Dirent\[]}

读取目录的内容。回调获取两个参数 `(err, files)`，
其中 `files` 是目录中文件名的数组，不包括
`'.'` 和 `'..'`。

有关更多详细信息，请参阅 POSIX readdir(3) 文档。

可选的 `options` 参数可以是一个指定编码的字符串，或者是一个
带有 `encoding` 属性的对象，指定要用于
传递给回调的文件名的字符编码。如果 `encoding` 设置为 `'buffer'`，
返回的文件名将作为 {Buffer} 对象传递。

如果 `options.withFileTypes` 设置为 `true`，`files` 数组将包含
{fs.Dirent} 对象。

### `fs.readFile(path[, options], callback)`

<!-- YAML
added: v0.1.29
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是 `ERR_INVALID_CALLBACK`。"
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/37460
    description: "如果返回多个错误，返回的错误可能是 `AggregateError`。"
  - version:
      - v15.2.0
      - v14.17.0
    pr-url: https://github.com/nodejs/node/pull/35911
    description: "options 参数可以包括一个 AbortSignal 以中止正在进行的 readFile 请求。"
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/12562
    description: "`callback` 参数不再是可选的。不传递它将在运行时抛出 `TypeError`。"
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`path` 参数可以是使用 `file:`协议的 WHATWG `URL` 对象。"
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: "`callback` 参数不再是可选的。不传递它将发出带有 id DEP0013 的弃用警告。"
  - version: v5.1.0
    pr-url: https://github.com/nodejs/node/pull/3740
    description: "成功时 `callback` 将始终使用 `null` 作为 `error`参数调用。"
  - version: v5.0.0
    pr-url: https://github.com/nodejs/node/pull/3163
    description: "`path` 参数现在可以是文件描述符。"
-->

* `path` {string|Buffer|URL|integer} 文件名或文件描述符
* `options` {Object|string}
  * `encoding` {string|null} **默认值：** `null`
  * `flag` {string} 参见 [文件系统 `flags` 的支持][]。**默认值：** `'r'`。
  * `signal` {AbortSignal} 允许中止正在进行的 readFile
* `callback` {Function}
  * `err` {Error|AggregateError}
  * `data` {string|Buffer}

异步读取文件的全部内容。

```mjs
import { readFile } from 'node:fs';

readFile('/etc/passwd', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

回调被传递两个参数 `(err, data)`，其中 `data` 是
文件的内容。

如果未指定编码，则返回原始 buffer。

如果 `options` 是字符串，则它指定编码：

```mjs
import { readFile } from 'node:fs';

readFile('/etc/passwd', 'utf8', callback);
```

当路径是目录时，`fs.readFile()` 和
[`fs.readFileSync()`][] 的行为是特定于平台的。在 macOS、Linux 和 Windows 上，
将返回错误。在 FreeBSD 上，将返回目录内容的
表示。

```mjs
import { readFile } from 'node:fs';

// macOS、Linux 和 Windows
readFile('<directory>', (err, data) => {
  // => [Error: EISDIR: 对目录的非法操作，read <directory>]
});

//  FreeBSD
readFile('<directory>', (err, data) => {
  // => null, <data>
});
```

可以使用 `AbortSignal` 中止正在进行的请求。如果
请求被中止，回调将使用 `AbortError` 调用：

```mjs
import { readFile } from 'node:fs';

const controller = new AbortController();
const signal = controller.signal;
readFile(fileInfo[0].name, { signal }, (err, buf) => {
  // ...
});
// 当你想要中止请求时
controller.abort();
```

`fs.readFile()` 函数缓冲整个文件。为了最小化内存成本，
可能时首选通过 `fs.createReadStream()` 流式传输。

中止正在进行的请求不会中止单个操作系统
请求，而是中止 `fs.readFile` 执行的内部缓冲。

#### 文件描述符

1. 任何指定的文件描述符必须支持读取。
2. 如果文件描述符被指定为 `path`，它将不会自动关闭。
3. 读取将从当前位置开始。例如，如果文件
   已经有 `'Hello World'` 并且使用文件描述符读取了六个字节，
   则使用相同文件描述符调用 `fs.readFile()` 将给出
   `'World'`，而不是 `'Hello World'`。

#### 性能考虑

`fs.readFile()` 方法异步地将文件内容一次一个块地读入
内存，允许事件循环在每个块之间转动。
这允许读取操作对可能使用底层 libuv 线程池的其他活动
影响较小，但意味着将文件完整读入内存需要更长的
时间。

额外的读取开销在不同系统上可能差异很大，并取决于
被读取的文件类型。如果文件类型不是普通文件（例如管道）
并且 Node.js 无法确定实际文件大小，则每次读取
操作将加载 64 KiB 的数据。对于普通文件，每次读取将处理
512 KiB 的数据。

对于需要尽可能快地读取文件内容的应用程序，
最好直接使用 `fs.read()` 并由应用程序代码管理
读取文件的全部内容。

Node.js GitHub issue [#25741][] 提供了更多信息和详细
分析关于不同 Node.js 版本中多个文件大小的 `fs.readFile()` 性能。

### `fs.readlink(path[, options], callback)`

<!-- YAML
added: v0.1.31
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是 `ERR_INVALID_CALLBACK`。"
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/12562
    description: "`callback` 参数不再是可选的。不传递它将在运行时抛出 `TypeError`。"
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`path` 参数可以是使用 `file:`协议的 WHATWG `URL` 对象。"
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: "`callback` 参数不再是可选的。不传递它将发出带有 id DEP0013 的弃用警告。"
-->

* `path` {string|Buffer|URL}
* `options` {string|Object}
  * `encoding` {string} **默认值：** `'utf8'`
* `callback` {Function}
  * `err` {Error}
  * `linkString` {string|Buffer}

读取 `path` 引用的符号链接的内容。回调获取
两个参数 `(err, linkString)`。

有关更多详细信息，请参阅 POSIX readlink(2) 文档。

可选的 `options` 参数可以是一个指定编码的字符串，或者是一个
带有 `encoding` 属性的对象，指定要用于
传递给回调的链接路径的字符编码。如果 `encoding` 设置为 `'buffer'`，
返回的链接路径将作为 {Buffer} 对象传递。

### `fs.readv(fd, buffers[, position], callback)`

<!-- YAML
added:
  - v13.13.0
  - v12.17.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是 `ERR_INVALID_CALLBACK`。"
-->

* `fd` {integer}
* `buffers` {ArrayBufferView\[]}
* `position` {integer|null} **默认值：** `null`
* `callback` {Function}
  * `err` {Error}
  * `bytesRead` {integer}
  * `buffers` {ArrayBufferView\[]}

从 `fd` 指定的文件读取，并使用 `readv()` 写入到 `ArrayBufferView` 数组中。

`position` 是从文件开头算起的数据应读取的偏移量。如果 `typeof position !== 'number'`，数据将从当前位置读取。

回调将被赋予三个参数：`err`、`bytesRead` 和 `buffers`。`bytesRead` 是从文件读取的字节数。

如果此方法作为其 [`util.promisify()`][] 版本调用，它返回一个带有 `bytesRead` 和 `buffers` 属性的 `Object` 的 promise。

### `fs.realpath(path[, options], callback)`

<!-- YAML
added: v0.1.31
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是`ERR_INVALID_CALLBACK`。"
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/12562
    description: "`callback` 参数不再是可选的。不传递它将在运行时抛出 `TypeError`。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/13028
    description: 添加了 Pipe/Socket 解析支持。
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`path` 参数可以是使用`file:` 协议的 WHATWG `URL` 对象。"
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: "`callback` 参数不再是可选的。不传递它将发出带有 id DEP0013 的弃用警告。"
  - version: v6.4.0
    pr-url: https://github.com/nodejs/node/pull/7899
    description: "调用 `realpath` 现在再次适用于 Windows 上的各种边缘情况。"
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/3594
    description: "移除了 `cache` 参数。"
-->

* `path` {string|Buffer|URL}
* `options` {string|Object}
  * `encoding` {string} **默认值：** `'utf8'`
* `callback` {Function}
  * `err` {Error}
  * `resolvedPath` {string|Buffer}

通过解析 `.`, `..` 和符号链接异步计算规范路径名。

规范路径名不一定是唯一的。硬链接和绑定挂载可以通过许多路径名公开文件系统实体。

此函数行为类似 realpath(3)，有一些例外：

1. 在不区分大小写的文件系统上不执行大小写转换。

2. 符号链接的最大数量与平台无关，并且通常（远）高于原生 realpath(3) 实现支持的数量。

`callback` 获取两个参数 `(err, resolvedPath)`。可以使用 `process.cwd` 来解析相对路径。

仅支持可以转换为 UTF8 字符串的路径。

可选的 `options` 参数可以是一个指定编码的字符串，或者是一个带有 `encoding` 属性的对象，指定要用于传递给回调的路径的字符编码。如果 `encoding` 设置为 `'buffer'`，返回的路径将作为 {Buffer} 对象传递。

如果 `path` 解析为 socket 或 pipe，函数将返回该对象的系统相关名称。

不存在的路径导致 ENOENT 错误。`error.path` 是绝对文件路径。

### `fs.realpath.native(path[, options], callback)`

<!-- YAML
added: v9.2.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是`ERR_INVALID_CALLBACK`。"
-->

* `path` {string|Buffer|URL}
* `options` {string|Object}
  * `encoding` {string} **默认值：** `'utf8'`
* `callback` {Function}
  * `err` {Error}
  * `resolvedPath` {string|Buffer}

异步 realpath(3)。

`callback` 获取两个参数 `(err, resolvedPath)`。

仅支持可以转换为 UTF8 字符串的路径。

可选的 `options` 参数可以是一个指定编码的字符串，或者是一个带有 `encoding` 属性的对象，指定要用于传递给回调的路径的字符编码。如果 `encoding` 设置为 `'buffer'`，返回的路径将作为 {Buffer} 对象传递。

在 Linux 上，当 Node.js 链接到 musl libc 时，procfs 文件系统必须挂载在 `/proc` 上以便此函数工作。Glibc 没有此限制。

### `fs.rename(oldPath, newPath, callback)`

<!-- YAML
added: v0.0.2
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是`ERR_INVALID_CALLBACK`。"
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/12562
    description: "`callback` 参数不再是可选的。不传递它将在运行时抛出 `TypeError`。"
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`oldPath` 和 `newPath` 参数可以是使用 `file:` 协议的WHATWG `URL` 对象。支持目前仍然是*实验性的*。"
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: "`callback` 参数不再是可选的。不传递它将发出带有 id DEP0013 的弃用警告。"
-->

* `oldPath` {string|Buffer|URL}
* `newPath` {string|Buffer|URL}
* `callback` {Function}
  * `err` {Error}

异步将 `oldPath` 处的文件重命名为提供的 `newPath` 路径名。如果 `newPath` 已存在，它将被覆盖。如果 `newPath` 处有一个目录，则将引发错误。除了可能的异常外，没有参数被给予完成回调。

另请参见：rename(2)。

```mjs
import { rename } from 'node:fs';

rename('oldFile.txt', 'newFile.txt', (err) => {
  if (err) throw err;
  console.log('重命名完成！');
});
```

### `fs.rmdir(path[, options], callback)`

<!-- YAML
added: v0.0.2
changes:
  - version: v25.0.0
    pr-url: https://github.com/nodejs/node/pull/58616
    description: "移除 `recursive` 选项。"
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是`ERR_INVALID_CALLBACK`。"
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/37216
    description: "在是文件的 `path` 上使用 `fs.rmdir(path, { recursive: true })`不再被允许，并在 Windows 上导致 `ENOENT` 错误在 POSIX 上导致 `ENOTDIR` 错误。"
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/37216
    description: "在不存在的 `path` 上使用 `fs.rmdir(path, { recursive: true })`不再被允许，并导致 `ENOENT`错误。"
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/37302
    description: "`recursive` 选项已弃用，使用它会触发弃用警告。"
  - version: v14.14.0
    pr-url: https://github.com/nodejs/node/pull/35579
    description: "`recursive` 选项已弃用，改用 `fs.rm`。"
  - version:
     - v13.3.0
     - v12.16.0
    pr-url: https://github.com/nodejs/node/pull/30644
    description: "`maxBusyTries` 选项重命名为 `maxRetries`，其默认值为 0。`emfileWait` 选项已被移除，并且`EMFILE` 错误使用与其他错误相同的重试逻辑。`retryDelay` 选项现在受支持。`ENFILE` 错误现在被重试。"
  - version: v12.10.0
    pr-url: https://github.com/nodejs/node/pull/29168
    description: "现在支持 `recursive`、`maxBusyTries` 和 `emfileWait` 选项。"
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/12562
    description: "`callback` 参数不再是可选的。不传递它将在运行时抛出 `TypeError`。"
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`path` 参数可以是使用`file:` 协议的 WHATWG `URL` 对象。"
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: "`callback` 参数不再是可选的。不传递它将发出带有 id DEP0013 的弃用警告。"
-->

* `path` {string|Buffer|URL}
* `options` {Object} 目前没有暴露选项。过去有 `recursive`、`maxBusyTries` 和 `emfileWait` 的选项，但它们已弃用并移除。`options` 参数仍被接受以向后兼容，但它未被使用。
* `callback` {Function}
  * `err` {Error}

异步 rmdir(2)。除了可能的异常外，没有参数被给予完成回调。

在文件（不是目录）上使用 `fs.rmdir()` 在 Windows 上导致 `ENOENT` 错误，在 POSIX 上导致 `ENOTDIR` 错误。

要获得类似 `rm -rf` Unix 命令的行为，使用 [`fs.rm()`][] 并带有选项 `{ recursive: true, force: true }`。

### `fs.rm(path[, options], callback)`

<!-- YAML
added: v14.14.0
changes:
  - version:
      - v17.3.0
      - v16.14.0
    pr-url: https://github.com/nodejs/node/pull/41132
    description: "`path` 参数可以是使用 `file:`协议的 WHATWG `URL` 对象。"
-->

* `path` {string|Buffer|URL}
* `options` {Object}
  * `force` {boolean} 当为 `true` 时，如果 `path` 不存在，异常将被忽略。**默认值：** `false`。
  * `maxRetries` {integer} 如果遇到 `EBUSY`、`EMFILE`、`ENFILE`、`ENOTEMPTY` 或 `EPERM` 错误，Node.js 将重试操作，每次尝试线性后退等待 `retryDelay` 毫秒。此选项表示重试次数。如果 `recursive` 选项不为 `true`，则忽略此选项。**默认值：** `0`。
  * `recursive` {boolean} 如果为 `true`，执行递归移除。在递归模式下，操作失败时会重试。**默认值：** `false`。
  * `retryDelay` {integer} 重试之间等待的毫秒数。如果 `recursive` 选项不为 `true`，则忽略此选项。**默认值：** `100`。
* `callback` {Function}
  * `err` {Error}

异步移除文件和目录（基于标准 POSIX `rm` 实用程序建模）。除了可能的异常外，没有参数被给予完成回调。

### `fs.stat(path[, options], callback)`

<!-- YAML
added: v0.0.2
changes:
  - version: v25.7.0
    pr-url: https://github.com/nodejs/node/pull/61178
    description: "接受 `throwIfNoEntry` 选项以指定是否如果条目不存在应抛出异常。"
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是`ERR_INVALID_CALLBACK`。"
  - version: v10.5.0
    pr-url: https://github.com/nodejs/node/pull/20220
    description: "接受额外的 `options` 对象以指定返回的数值是否应为 bigint。"
  - version: v10.0.0
    pr-url: https://githubjs/nodejs/node/pull/12562
    description: "`callback` 参数不再是可选的。不传递它将在运行时抛出 `TypeError`。"
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`path` 参数可以是使用 `file:`协议的 WHATWG `URL` 对象。"
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: "`callback` 参数不再是可选的。不传递它将发出带有 id DEP0013 的弃用警告。"
-->

* `path` {string|Buffer|URL}
* `options` {Object}
  * `bigint` {boolean} 返回的 {fs.Stats} 对象中的数值是否应为 `bigint`。**默认值：** `false`。
  * `throwIfNoEntry` {boolean} 如果没有文件系统条目存在，是否抛出异常，而不是返回 `undefined`。**默认值：** `true`。
* `callback` {Function}
  * `err` {Error}
  * `stats` {fs.Stats}

异步 stat(2)。回调获取两个参数 `(err, stats)`，其中 `stats` 是一个 {fs.Stats} 对象。

在错误的情况下，`err.code` 将是 [常见系统错误][] 之一。

[`fs.stat()`][] 跟随符号链接。使用 [`fs.lstat()`][] 查看链接本身。

不建议在调用 `fs.open()`、`fs.readFile()` 或 `fs.writeFile()` 之前使用 `fs.stat()` 检查文件是否存在。相反，用户代码应直接打开/读取/写入文件并处理如果文件不可用时引发的错误。

要检查文件是否存在而不随后操作它，推荐 [`fs.access()`][]。

例如，给定以下目录结构：

```text
- txtDir
-- file.txt
- app.js
```

下一个程序将检查给定路径的 stats：

```mjs
import { stat } from 'node:fs';

const pathsToCheck = ['./txtDir', './txtDir/file.txt'];

for (let i = 0; i < pathsToCheck.length; i++) {
  stat(pathsToCheck[i], (err, stats) => {
    console.log(stats.isDirectory());
    console.log(stats);
  });
}
```

结果输出将类似于：

```console
true
Stats {
  dev: 16777220,
  mode: 16877,
  nlink: 3,
  uid: 501,
  gid: 20,
  rdev: 0,
  blksize: 4096,
  ino: 14214262,
  size: 96,
  blocks: 0,
  atimeMs: 1561174653071.963,
  mtimeMs: 1561174614583.3518,
  ctimeMs: 1561174626623.5366,
  birthtimeMs: 1561174126937.2893,
  atime: 2019-06-22T03:37:33.072Z,
  mtime: 2019-06-22T03:36:54.583Z,
  ctime: 2019-06-22T03:37:06.624Z,
  birthtime: 2019-06-22T03:28:46.937Z
}
false
Stats {
  dev: 16777220,
  mode: 33188,
  nlink: 1,
  uid: 501,
  gid: 20,
  rdev: 0,
  blksize: 4096,
  ino: 14214074,
  size: 8,
  blocks: 8,
  atimeMs: 1561174616618.8555,
  mtimeMs: 1561174614584,
  ctimeMs: 1561174614583.8145,
  birthtimeMs: 1561174007710.7478,
  atime: 2019-06-22T03:36:56.619Z,
  mtime: 2019-06-22T03:36:54.584Z,
  ctime: 2019-06-22T03:36:54.584Z,
  birthtime: 2019-06-22T03:26:47.711Z
}
```

### `fs.statfs(path[, options], callback)`

<!-- YAML
added:
  - v19.6.0
  - v18.15.0
-->

* `path` {string|Buffer|URL}
* `options` {Object}
  * `bigint` {boolean} 返回的 {fs.StatFs} 对象中的数值是否应为 `bigint`。**默认值：** `false`。
* `callback` {Function}
  * `err` {Error}
  * `stats` {fs.StatFs}

异步 statfs(2)。返回有关包含 `path` 的挂载文件系统的信息。回调获取两个参数 `(err, stats)`，其中 `stats` 是一个 {fs.StatFs} 对象。

在错误的情况下，`err.code` 将是 [常见系统错误][] 之一。

### `fs.symlink(target, path[, type], callback)`

<!-- YAML
added: v0.1.31
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是`ERR_INVALID_CALLBACK`。"
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/23724
    description: "如果 `type` 参数未定义，Node 将自动检测`target` 类型并自动选择 `dir` 或 `file`。"
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`target` 和 `path` 参数可以是使用 `file:` 协议的WHATWG `URL` 对象。支持目前仍然是*实验性的*。"
-->

* `target` {string|Buffer|URL}
* `path` {string|Buffer|URL}
* `type` {string|null} **默认值：** `null`
* `callback` {Function}
  * `err` {Error}

创建称为 `path` 的链接指向 `target`。除了可能的异常外，没有参数被给予完成回调。

有关更多详细信息，请参阅 POSIX symlink(2) 文档。

`type` 参数仅在 Windows 上可用，在其他平台上被忽略。它可以设置为 `'dir'`、`'file'` 或 `'junction'`。如果 `type` 参数是 `null`，Node.js 将自动检测 `target` 类型并使用 `'file'` 或 `'dir'`。如果 `target` 不存在，将使用 `'file'`。Windows 连接点要求目标路径为绝对路径。当使用 `'junction'` 时，`target` 参数将自动规范化为绝对路径。NTFS 卷上的连接点只能指向目录。

相对目标是相对于链接的父目录。

```mjs
import { symlink } from 'node:fs';

symlink('./mew', './mewtwo', callback);
```

上面的示例创建一个符号链接 `mewtwo` 指向同一目录中的 `mew`：

```bash
$ tree .
.
├── mew
└── mewtwo -> ./mew
```

### `fs.truncate(path[, len], callback)`

<!-- YAML
added: v0.8.6
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是`ERR_INVALID_CALLBACK`。"
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/37460
    description: "如果返回多个错误，返回的错误可能是 `AggregateError`。"
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/12562
    description: "`callback` 参数不再是可选的。不传递它将在运行时抛出 `TypeError`。"
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: "`callback` 参数不再是可选的。不传递它将发出带有 id DEP0013 的弃用警告。"
-->

* `path` {string|Buffer|URL}
* `len` {integer} **默认值：** `0`
* `callback` {Function}
  * `err` {Error|AggregateError}

截断文件。除了可能的异常外，没有参数被给予完成回调。文件描述符也可以作为第一个参数传递。在这种情况下，调用 `fs.ftruncate()`。

```mjs
import { truncate } from 'node:fs';
// 假设 'path/file.txt' 是一个普通文件。
truncate('path/file.txt', (err) => {
  if (err) throw err;
  console.log('path/file.txt was truncated');
});
```

```cjs
const { truncate } = require('node:fs');
// 假设 'path/file.txt' 是一个普通文件。
truncate('path/file.txt', (err) => {
  if (err) throw err;
  console.log('path/file.txt was truncated');
});
```

传递文件描述符已弃用，并可能导致在未来抛出错误。

有关更多详细信息，请参阅 POSIX truncate(2) 文档。

### `fs.unlink(path, callback)`

<!-- YAML
added: v0.0.2
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是`ERR_INVALID_CALLBACK`。"
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/12562
    description: "`callback` 参数不再是可选的。不传递它将在运行时抛出 `TypeError`。"
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`path` 参数可以是使用 `file:`协议的 WHATWG `URL` 对象。"
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: "`callback` 参数不再是可选的。不传递它将发出带有 id DEP0013 的弃用警告。"
-->

* `path` {string|Buffer|URL}
* `callback` {Function}
  * `err` {Error}

异步移除文件或符号链接。除了可能的异常外，没有参数被给予完成回调。

```mjs
import { unlink } from 'node:fs';
// 假设 'path/file.txt' 是一个普通文件。
unlink('path/file.txt', (err) => {
  if (err) throw err;
  console.log('path/file.txt was deleted');
});
```

`fs.unlink()` 不适用于目录，无论是否为空。要移除目录，使用 [`fs.rmdir()`][]。

有关更多详细信息，请参阅 POSIX unlink(2) 文档。

### `fs.unwatchFile(filename[, listener])`

<!-- YAML
added: v0.1.31
-->

* `filename` {string|Buffer|URL}
* `listener` {Function} 可选，之前使用 `fs.watchFile()` 附加的监听器

停止监视 `filename` 的更改。如果指定了 `listener`，仅移除该特定监听器。否则，_所有_ 监听器被移除，有效地停止监视 `filename`。

使用未被监视的 filename 调用 `fs.unwatchFile()` 是无操作，不是错误。

使用 [`fs.watch()`][] 比 `fs.watchFile()` 和 `fs.unwatchFile()` 更高效。可能时应使用 `fs.watch()` 代替 `fs.watchFile()` 和 `fs.unwatchFile()`。

### `fs.utimes(path, atime, mtime, callback)`

<!-- YAML
added: v0.4.2
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是`ERR_INVALID_CALLBACK`。"
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/12562
    description: "`callback` 参数不再是可选的。不传递它将在运行时抛出 `TypeError`。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/11919
    description: "`NaN`、`Infinity` 和 `-Infinity` 不再是有效的时间说明符。"
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`path` 参数可以是使用 `file:`协议的 WHATWG `URL` 对象。"
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: "`callback` 参数不再是可选的。不传递它将发出带有 id DEP0013 的弃用警告。"
  - version: v4.1.0
    pr-url: https://github.com/nodejs/node/pull/2387
    description: "数字字符串、`NaN` 和 `Infinity` 现在允许作为时间说明符。"
-->

* `path` {string|Buffer|URL}
* `atime` {number|string|Date}
* `mtime` {number|string|Date}
* `callback` {Function}
  * `err` {Error}

更改 `path` 引用的对象的文件系统时间戳。

`atime` 和 `mtime` 参数遵循以下规则：

* 值可以是表示 Unix 纪元时间（秒）的数字、`Date`，或数字字符串如 `'123456789.0'`。
* 如果值无法转换为数字，或是 `NaN`、`Infinity` 或 `-Infinity`，将抛出 `Error`。

### `fs.watch(filename[, options][, listener])`

<!-- YAML
added: v0.5.10
changes:
  - version: v26.1.0
    pr-url: https://github.com/nodejs/node/pull/61870
    description: 添加了 `throwIfNoEntry` 选项。
  - version: v19.1.0
    pr-url: https://github.com/nodejs/node/pull/45098
    description: 为 Linux、AIX 和 IBMi 添加了递归支持。
  - version:
      - v15.9.0
      - v14.17.0
    pr-url: https://github.com/nodejs/node/pull/37190
    description: 添加了使用 AbortSignal 关闭 watcher 的支持。
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`filename` 参数可以是使用`file:` 协议的 WHATWG `URL` 对象。"
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7831
    description: "传递的 `options` 对象将永远不会被修改。"
-->

* `filename` {string|Buffer|URL}
* `options` {string|Object}
  * `persistent` {boolean} 表示只要文件被监视，进程就应继续运行。**默认值：** `true`。
  * `recursive` {boolean} 表示是否应监视所有子目录，还是仅监视当前目录。这适用于指定目录时，并且仅在受支持的平台上有效（参见 [caveats][]）。**默认值：** `false`。
  * `encoding` {string} 指定传递给监听器的文件名所使用的字符编码。**默认值：** `'utf8'`。
  * `signal` {AbortSignal} 允许使用 AbortSignal 关闭 watcher。
  * `throwIfNoEntry` {boolean} 表示当路径不存在时是否应抛出异常。**默认值：** `true`。
  * `ignore` {string|RegExp|Function|Array} 要忽略的模式。字符串是 glob 模式（使用 [`minimatch`][]），RegExp 模式会针对文件名测试，而函数会接收文件名并返回 `true` 以忽略。**默认值：** `undefined`。
* `listener` {Function|undefined} **默认值：** `undefined`
  * `eventType` {string}
  * `filename` {string|Buffer|null}
* 返回：{fs.FSWatcher}

监视 `filename` 的更改，其中 `filename` 是文件或目录。

第二个参数是可选的。如果 `options` 作为字符串提供，它指定 `encoding`。否则 `options` 应作为对象传递。

监听器回调获取两个参数 `(eventType, filename)`。`eventType` 是 `'rename'` 或 `'change'`，`filename` 是触发事件的文件名。

在大多数平台上，每当文件名出现在目录中或从目录中消失时，都会发出 `'rename'` 事件。

监听器回调附加到由 {fs.FSWatcher} 触发的 `'change'` 事件，但这与 `eventType` 的 `'change'` 值不同。

如果传入了 `signal`，中止对应的 AbortController 将关闭返回的 {fs.FSWatcher}。

#### 注意事项

<!--type=misc-->

`fs.watch` API 跨平台并非 100% 一致，并且在某些情况下不可用。

在 Windows 上，如果被监视的目录被移动或重命名，不会发出任何事件。当被监视的目录被删除时，会报告 `EPERM` 错误。

`fs.watch` API 不提供任何针对文件系统恶意操作的保护。例如，在 Windows 上，它是通过监视目录中的变化而不是特定文件来实现的。这允许替换文件，并且 fs 会报告具有相同文件名的新文件的变化。

##### 可用性

<!--type=misc-->

此功能依赖于底层操作系统提供某种方式来通知文件系统的变化。

* 在 Linux 系统上，这使用 [`inotify(7)`][]。
* 在 BSD 系统上，这使用 [`kqueue(2)`][]。
* 在 macOS 上，这使用 [`kqueue(2)`][] 监视文件，使用 [`FSEvents`][] 监视目录。
* 在 SunOS 系统上（包括 Solaris 和 SmartOS），这使用 [`event ports`][]。
* 在 Windows 系统上，此功能依赖于 [`ReadDirectoryChangesW`][]。
* 在 AIX 系统上，此功能依赖于 [`AHAFS`][]，必须启用它。
* 在 IBM i 系统上，不支持此功能。

如果由于某种原因底层功能不可用，则 `fs.watch()` 将无法运行并可能抛出异常。例如，在网络文件系统（NFS、SMB 等）或使用虚拟化软件（如 Vagrant 或 Docker）时的主机文件系统上，监视文件或目录可能不可靠，在某些情况下甚至不可能。

仍然可以使用 `fs.watchFile()`，它使用 stat 轮询，但这种方法较慢且可靠性较低。

##### Inodes

<!--type=misc-->

在 Linux 和 macOS 系统上，`fs.watch()` 将路径解析为 [inode][] 并监视该 inode。如果被监视的路径被删除并重新创建，它将被分配一个新的 inode。监视器将为删除发出事件，但将继续监视 _原始_ inode。新 inode 的事件将不会发出。这是预期行为。

AIX 文件在文件生命周期内保留相同的 inode。在 AIX 上保存并关闭被监视的文件将导致两个通知（一个用于添加新内容，一个用于截断）。

##### filename 参数

<!--type=misc-->

在回调中提供 `filename` 参数仅在 Linux、macOS、Windows 和 AIX 上受支持。即使在受支持的平台上，`filename` 也不总是保证提供。因此，不要假设回调中总是提供 `filename` 参数，如果它为 `null`，请准备一些回退逻辑。

```mjs
import { watch } from 'node:fs';
watch('somedir', (eventType, filename) => {
  console.log(`event type is: ${eventType}`);
  if (filename) {
    console.log(`filename provided: ${filename}`);
  } else {
    console.log('filename not provided');
  }
});
```

### `fs.watchFile(filename[, options], listener)`

<!-- YAML
added: v0.1.31
changes:
  - version: v10.5.0
    pr-url: https://github.com/nodejs/node/pull/20220
    description: "现在支持 `bigint` 选项。"
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`filename` 参数可以是一个使用`file:` 协议的 WHATWG `URL` 对象。"
-->

* `filename` {string|Buffer|URL}
* `options` {Object}
  * `bigint` {boolean} **默认值：** `false`
  * `persistent` {boolean} **默认值：** `true`
  * `interval` {integer} **默认值：** `5007`
* `listener` {Function}
  * `current` {fs.Stats}
  * `previous` {fs.Stats}
* 返回：{fs.StatWatcher}

监视 `filename` 的变化。每次访问文件时都会调用回调 `listener`。

`options` 参数可以省略。如果提供，它应该是一个对象。该 `options` 对象可能包含一个名为 `persistent` 的布尔值，指示只要文件被监视，进程是否应继续运行。`options` 对象可以指定一个 `interval` 属性，指示目标应该被轮询的频率（以毫秒为单位）。

`listener` 接收两个参数：当前 stat 对象和上一个 stat 对象：

```mjs
import { watchFile } from 'node:fs';

watchFile('message.text', (curr, prev) => {
  console.log(`the current mtime is: ${curr.mtime}`);
  console.log(`the previous mtime was: ${prev.mtime}`);
});
```

这些 stat 对象是 `fs.Stat` 的实例。如果 `bigint` 选项为 `true`，则这些对象中的数值指定为 `BigInt`。

要在文件被修改而不仅仅是被访问时收到通知，需要比较 `curr.mtimeMs` 和 `prev.mtimeMs`。

当 `fs.watchFile` 操作导致 `ENOENT` 错误时，它将调用监听器一次，所有字段为零（对于日期，则为 Unix 纪元）。如果文件稍后创建，监听器将再次被调用，并传入最新的 stat 对象。这是自 v0.10 以来的功能变化。

使用 [`fs.watch()`][] 比 `fs.watchFile` 和 `fs.unwatchFile` 更高效。当可能时，应使用 `fs.watch` 代替 `fs.watchFile` 和 `fs.unwatchFile`。

当被 `fs.watchFile()` 监视的文件消失并重新出现时，第二个回调事件（文件重新出现）中 `previous` 的内容将与第一个回调事件（其消失）中 `previous` 的内容相同。

这种情况发生在：

* 文件被删除，随后恢复
* 文件被重命名，然后再次重命名回其原始名称

### `fs.write(fd, buffer, offset[, length[, position]], callback)`

<!-- YAML
added: v0.0.2
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在抛出 `ERR_INVALID_ARG_TYPE` 而不是`ERR_INVALID_CALLBACK`。"
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/31030
    description: "`buffer` 参数不再将不支持的输入强制转换为字符串。"
  - version: v10.10.0
    pr-url: https://github.com/nodejs/node/pull/22150
    description: "`buffer` 参数现在可以是任何 `TypedArray` 或`DataView`。"
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/12562
    description: "`callback` 参数不再可选。不传递它将在运行时抛出 `TypeError`。"
  - version: v7.4.0
    pr-url: https://github.com/nodejs/node/pull/10382
    description: "`buffer` 参数现在可以是 `Uint8Array`。"
  - version: v7.2.0
    pr-url: https://github.com/nodejs/node/pull/7856
    description: "`offset` 和 `length` 参数现在是可选的。"
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: "`callback` 参数不再可选。不传递它将发出带有 id DEP0013 的弃用警告。"
-->

* `fd` {integer}
* `buffer` {Buffer|TypedArray|DataView}
* `offset` {integer} **默认值：** `0`
* `length` {integer} **默认值：** `buffer.byteLength - offset`
* `position` {integer|null} **默认值：** `null`
* `callback` {Function}
  * `err` {Error}
  * `bytesWritten` {integer}
  * `buffer` {Buffer|TypedArray|DataView}

将 `buffer` 写入由 `fd` 指定的文件。

`offset` 确定要写入的缓冲区部分，`length` 是一个整数，指定要写入的字节数。

`position` 指的是数据应写入的文件开头的偏移量。如果 `typeof position !== 'number'`，数据将写入当前位置。参见 pwrite(2)。

回调将获得三个参数 `(err, bytesWritten, buffer)`，其中 `bytesWritten` 指定从 `buffer` 写入了多少 _字节_。

如果此方法作为其 [`util.promisify()`][] 版本被调用，它返回一个包含 `bytesWritten` 和 `buffer` 属性的 `Object` 的 promise。

在不等待回调的情况下多次在同一文件上使用 `fs.write()` 是不安全的。对于此场景，推荐使用 [`fs.createWriteStream()`][]。

在 Linux 上，当文件以追加模式打开时，位置写入不起作用。内核忽略位置参数，并始终将数据追加到文件末尾。

### `fs.write(fd, buffer[, options], callback)`

<!-- YAML
added:
  - v18.3.0
  - v16.17.0
-->

* `fd` {integer}
* `buffer` {Buffer|TypedArray|DataView}
* `options` {Object}
  * `offset` {integer} **默认值：** `0`
  * `length` {integer} **默认值：** `buffer.byteLength - offset`
  * `position` {integer|null} **默认值：** `null`
* `callback` {Function}
  * `err` {Error}
  * `bytesWritten` {integer}
  * `buffer` {Buffer|TypedArray|DataView}

将 `buffer` 写入由 `fd` 指定的文件。

与上面的 `fs.write` 函数类似，此版本接受一个可选的 `options` 对象。如果未指定 `options` 对象，它将默认使用上述值。

### `fs.write(fd, string[, position[, encoding]], callback)`

<!-- YAML
added: v0.11.5
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/42796
    description: "不再支持向 `string` 参数传递具有自有`toString` 函数的对象。"
  - version: v17.8.0
    pr-url: https://github.com/nodejs/node/pull/42149
    description: "向 `string` 参数传递具有自有`toString` 函数的对象已弃用。"
  - version: v14.12.0
    pr-url: https://github.com/nodejs/node/pull/34993
    description: "`string` 参数将字符串化具有显式`toString` 函数的对象。"
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/31030
    description: "`string` 参数不再将不支持的输入强制转换为字符串。"
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/12562
    description: "`callback` 参数不再可选。不传递它将在运行时抛出 `TypeError`。"
  - version: v7.2.0
    pr-url: https://github.com/nodejs/node/pull/7856
    description: "`position` 参数现在是可选的。"
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: "`callback` 参数不再可选。不传递它将发出带有 id DEP0013 的弃用警告。"
-->

* `fd` {integer}
* `string` {string}
* `position` {integer|null} **默认值：** `null`
* `encoding` {string} **默认值：** `'utf8'`
* `callback` {Function}
  * `err` {Error}
  * `written` {integer}
  * `string` {string}

将 `string` 写入由 `fd` 指定的文件。如果 `string` 不是字符串，将抛出异常。

`position` 指的是数据应写入的文件开头的偏移量。如果 `typeof position !== 'number'`，数据将写入当前位置。参见 pwrite(2)。

`encoding` 是预期的字符串编码。

回调将接收参数 `(err, written, string)`，其中 `written` 指定传入的字符串需要写入多少 _字节_。写入的字节数不一定与写入的字符串字符数相同。参见 [`Buffer.byteLength`][]。

在不等待回调的情况下多次在同一文件上使用 `fs.write()` 是不安全的。对于此场景，推荐使用 [`fs.createWriteStream()`][]。

在 Linux 上，当文件以追加模式打开时，位置写入不起作用。内核忽略位置参数，并始终将数据追加到文件末尾。

在 Windows 上，如果文件描述符连接到控制台（例如 `fd == 1` 或 `stdout`），默认情况下包含非 ASCII 字符的字符串将无法正确渲染，无论使用何种编码。可以通过使用 `chcp 65001` 命令更改活动代码页来配置控制台以正确渲染 UTF-8。有关更多详细信息，请参阅 [chcp][] 文档。

### `fs.writeFile(file, data[, options], callback)`

<!-- YAML
added: v0.1.29
changes:
  - version:
    - v21.0.0
    - v20.10.0
    pr-url: https://github.com/nodejs/node/pull/50009
    description: "现在支持 `flush` 选项。"
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/42796
    description: "不再支持向 `string` 参数传递具有自有`toString` 函数的对象。"
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在抛出 `ERR_INVALID_ARG_TYPE` 而不是`ERR_INVALID_CALLBACK`。"
  - version: v17.8.0
    pr-url: https://github.com/nodejs/node/pull/42149
    description: "向 `string` 参数传递具有自有`toString` 函数的对象已弃用。"
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/37460
    description: "如果返回多个错误，返回的错误可能是`AggregateError`。"
  - version:
      - v15.2.0
      - v14.17.0
    pr-url: https://github.com/nodejs/node/pull/35993
    description: "options 参数可以包括一个 AbortSignal 以中止正在进行的 writeFile 请求。"
  - version: v14.12.0
    pr-url: https://github.com/nodejs/node/pull/34993
    description: "`data` 参数将字符串化具有显式`toString` 函数的对象。"
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/31030
    description: "`data` 参数不再将不支持的输入强制转换为字符串。"
  - version: v10.10.0
    pr-url: https://github.com/nodejs/node/pull/22150
    description: "`data` 参数现在可以是任何 `TypedArray` 或`DataView`。"
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/12562
    description: "`callback` 参数不再可选。不传递它将在运行时抛出 `TypeError`。"
  - version: v7.4.0
    pr-url: https://github.com/nodejs/node/pull/10382
    description: "`data` 参数现在可以是 `Uint8Array`。"
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: "`callback` 参数不再可选。不传递它将发出带有 id DEP0013 的弃用警告。"
  - version: v5.0.0
    pr-url: https://github.com/nodejs/node/pull/3163
    description: "`file` 参数现在可以是文件描述符。"
-->

* `file` {string|Buffer|URL|integer} 文件名或文件描述符
* `data` {string|Buffer|TypedArray|DataView}
* `options` {Object|string}
  * `encoding` {string|null} **默认值：** `'utf8'`
  * `mode` {integer} **默认值：** `0o666`
  * `flag` {string} 参见 [文件系统 `flags` 的支持][]。 **默认值：** `'w'`。
  * `flush` {boolean} 如果所有数据都成功写入文件，并且 `flush` 为 `true`，则使用 `fs.fsync()` 刷新数据。**默认值：** `false`。
  * `signal` {AbortSignal} 允许中止正在进行的 writeFile
* `callback` {Function}
  * `err` {Error|AggregateError}

当 `file` 是文件名时，异步将数据写入文件，如果文件已存在则替换该文件。`data` 可以是字符串或缓冲区。

当 `file` 是文件描述符时，行为类似于直接调用 `fs.write()`（推荐使用）。参见下面关于使用文件描述符的说明。

如果 `data` 是缓冲区，则忽略 `encoding` 选项。

`mode` 选项仅影响新创建的文件。有关更多详细信息，请参阅 [`fs.open()`][]。

```mjs
import { writeFile } from 'node:fs';
import { Buffer } from 'node:buffer';

const data = new Uint8Array(Buffer.from('Hello Node.js'));
writeFile('message.txt', data, (err) => {
  if (err) throw err;
  console.log('文件已保存！');
});
```

如果 `options` 是字符串，则它指定编码：

```mjs
import { writeFile } from 'node:fs';

writeFile('message.txt', 'Hello Node.js', 'utf8', callback);
```

在不等待回调的情况下多次在同一文件上使用 `fs.writeFile()` 是不安全的。对于此场景，推荐使用 [`fs.createWriteStream()`][]。

与 `fs.readFile` 类似 - `fs.writeFile` 是一个便利方法，它在内部执行多次 `write` 调用以写入传递给它的缓冲区。对于性能敏感的代码，考虑使用 [`fs.createWriteStream()`][]。

可以使用 {AbortSignal} 来取消 `fs.writeFile()`。取消是“尽最大努力”，可能仍会有少量数据被写入。

```mjs
import { writeFile } from 'node:fs';
import { Buffer } from 'node:buffer';

const controller = new AbortController();
const { signal } = controller;
const data = new Uint8Array(Buffer.from('Hello Node.js'));
writeFile('message.txt', data, { signal }, (err) => {
  // 当请求被中止时 - 回调会被调用并传入一个 AbortError
});
// 当请求应该被中止时
controller.abort();
```

中止正在进行的请求不会中止单个操作系统请求，而是中止 `fs.writeFile` 执行的内部缓冲。

#### 将 `fs.writeFile()` 与文件描述符一起使用

当 `file` 是文件描述符时，行为几乎与直接调用 `fs.write()` 相同，例如：

```mjs
import { write } from 'node:fs';
import { Buffer } from 'node:buffer';

write(fd, Buffer.from(data, options.encoding), callback);
```

与直接调用 `fs.write()` 的区别在于，在某些不寻常的情况下，`fs.write()` 可能只写入缓冲区的一部分，需要重试以写入剩余数据，而 `fs.writeFile()` 会重试直到数据完全写入（或发生错误）。

这一点的影响是一个常见的混淆来源。在文件描述符的情况下，文件不会被替换！数据不一定写入文件的开头，文件的原始数据可能保留在新写入数据之前和/或之后。

例如，如果连续调用两次 `fs.writeFile()`，第一次写入字符串 `'Hello'`，然后写入字符串 `', World'`，文件将包含 `'Hello, World'`，并且可能包含文件的一些原始数据（取决于原始文件的大小和文件描述符的位置）。如果使用的是文件名而不是描述符，文件将保证只包含 `', World'`。

### `fs.writev(fd, buffers[, position], callback)`

<!-- YAML
added: v12.9.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在抛出 `ERR_INVALID_ARG_TYPE` 而不是`ERR_INVALID_CALLBACK`。"
-->

* `fd` {integer}
* `buffers` {ArrayBufferView\[]}
* `position` {integer|null} **默认值：** `null`
* `callback` {Function}
  * `err` {Error}
  * `bytesWritten` {integer}
  * `buffers` {ArrayBufferView\[]}

使用 `writev()` 将 `ArrayBufferView` 数组写入由 `fd` 指定的文件。

`position` 是数据应写入的文件开头的偏移量。如果 `typeof position !== 'number'`，数据将写入当前位置。

回调将获得三个参数：`err`、`bytesWritten` 和 `buffers`。`bytesWritten` 是从 `buffers` 写入的字节数。

如果此方法被 [`util.promisify()`][]，它返回一个包含 `bytesWritten` 和 `buffers` 属性的 `Object` 的 promise。

在不等待回调的情况下多次在同一文件上使用 `fs.writev()` 是不安全的。对于此场景，使用 [`fs.createWriteStream()`][]。

在 Linux 上，当文件以追加模式打开时，位置写入不起作用。内核忽略位置参数，并始终将数据追加到文件末尾。

## 同步 API

同步 API 同步执行所有操作，阻塞事件循环直到操作完成或失败。

### `fs.accessSync(path[, mode])`

<!-- YAML
added: v0.11.15
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`path` 参数可以是一个使用 `file:` 协议的 WHATWG `URL` 对象。"
-->

* `path` {string|Buffer|URL}
* `mode` {integer} **默认：** `fs.constants.F_OK`

同步测试用户由 `path` 指定的文件或目录的权限。`mode` 参数是一个可选整数，指定要执行的访问检查。`mode` 应该是值 `fs.constants.F_OK` 或由 `fs.constants.R_OK`、`fs.constants.W_OK` 和 `fs.constants.X_OK` 的按位 OR 组成的掩码（例如 `fs.constants.W_OK | fs.constants.R_OK`）。查看 [文件访问常量][] 以获取 `mode` 的可能值。

如果任何访问检查失败，将抛出 `Error`。否则，该方法将返回 `undefined`。

```mjs
import { accessSync, constants } from 'node:fs';

try {
  accessSync('etc/passwd', constants.R_OK | constants.W_OK);
  console.log('可以读/写');
} catch (err) {
  console.error('没有访问权限！');
}
```

### `fs.appendFileSync(path, data[, options])`

<!-- YAML
added: v0.6.7
changes:
  - version:
    - v21.1.0
    - v20.10.0
    pr-url: https://github.com/nodejs/node/pull/50095
    description: "现在支持 `flush` 选项。"
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7831
    description: "传入的 `options` 对象将永远不会被修改。"
  - version: v5.0.0
    pr-url: https://github.com/nodejs/node/pull/3163
    description: "`file` 参数现在可以是文件描述符。"
-->

* `path` {string|Buffer|URL|number} 文件名或文件描述符
* `data` {string|Buffer}
* `options` {Object|string}
  * `encoding` {string|null} **默认：** `'utf8'`
  * `mode` {integer} **默认：** `0o666`
  * `flag` {string} 查看 [文件系统 `flags` 的支持][]。 **默认：** `'a'`。
  * `flush` {boolean} 如果为 `true`，底层文件描述符在关闭之前会被刷新。 **默认：** `false`。

同步地将数据追加到文件，如果文件不存在则创建它。`data` 可以是字符串或 {Buffer}。

`mode` 选项仅影响新创建的文件。查看更多详情 [`fs.open()`][]。

```mjs
import { appendFileSync } from 'node:fs';

try {
  appendFileSync('message.txt', '要追加的数据');
  console.log('“要追加的数据”已追加到文件！');
} catch (err) {
  /* 处理错误 */
}
```

如果 `options` 是字符串，则它指定编码：

```mjs
import { appendFileSync } from 'node:fs';

appendFileSync('message.txt', '要追加的数据', 'utf8');
```

`path` 可以指定为已打开用于追加的数字文件描述符（使用 `fs.open()` 或 `fs.openSync()`）。文件描述符不会自动关闭。

```mjs
import { openSync, closeSync, appendFileSync } from 'node:fs';

let fd;

try {
  fd = openSync('message.txt', 'a');
  appendFileSync(fd, '要追加的数据', 'utf8');
} catch (err) {
  /* 处理错误 */
} finally {
  if (fd !== undefined)
    closeSync(fd);
}
```

### `fs.chmodSync(path, mode)`

<!-- YAML
added: v0.6.7
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`path` 参数可以是一个使用 `file:` 协议的 WHATWG `URL` 对象。"
-->

* `path` {string|Buffer|URL}
* `mode` {string|integer}

详细信息，请参阅此 API 异步版本的文档：[`fs.chmod()`][]。

查看更多详情 POSIX chmod(2) 文档。

### `fs.chownSync(path, uid, gid)`

<!-- YAML
added: v0.1.97
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`path` 参数可以是一个使用 `file:` 协议的 WHATWG `URL` 对象。"
-->

* `path` {string|Buffer|URL}
* `uid` {integer}
* `gid` {integer}

同步更改文件的所有者和组。返回 `undefined`。
这是 [`fs.chown()`][] 的同步版本。

查看更多详情 POSIX chown(2) 文档。

### `fs.closeSync(fd)`

<!-- YAML
added: v0.1.21
-->

* `fd` {integer}

关闭文件描述符。返回 `undefined`。

在任何当前通过任何其他 `fs` 操作使用的文件描述符 (`fd`) 上调用 `fs.closeSync()` 可能导致未定义的行为。

查看更多详情 POSIX close(2) 文档。

### `fs.copyFileSync(src, dest[, mode])`

<!-- YAML
added: v8.5.0
changes:
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/27044
    description: "将 `flags` 参数更改为 `mode` 并实施更严格的类型验证。"
-->

* `src` {string|Buffer|URL} 要复制的源文件名
* `dest` {string|Buffer|URL} 复制操作的目标文件名
* `mode` {integer} 复制操作的修饰符。 **默认：** `0`。

同步地将 `src` 复制到 `dest`。默认情况下，如果 `dest` 已存在，则会被覆盖。返回 `undefined`。Node.js 不保证复制操作的原子性。如果在打开目标文件进行写入后发生错误，Node.js 将尝试移除目标。

`mode` 是一个可选整数，指定复制操作的行为。可以创建一个由两个或更多值的按位 OR 组成的掩码（例如 `fs.constants.COPYFILE_EXCL | fs.constants.COPYFILE_FICLONE`）。

* `fs.constants.COPYFILE_EXCL`：如果 `dest` 已存在，复制操作将失败。
* `fs.constants.COPYFILE_FICLONE`：复制操作将尝试创建写时复制 reflink。如果平台不支持写时复制，则使用回退复制机制。
* `fs.constants.COPYFILE_FICLONE_FORCE`：复制操作将尝试创建写时复制 reflink。如果平台不支持写时复制，则操作将失败。

```mjs
import { copyFileSync, constants } from 'node:fs';

// 默认情况下，destination.txt 将被创建或覆盖。
copyFileSync('source.txt', 'destination.txt');
console.log('source.txt 已复制到 destination.txt');

// 通过使用 COPYFILE_EXCL，如果 destination.txt 存在，操作将失败。
copyFileSync('source.txt', 'destination.txt', constants.COPYFILE_EXCL);
```

### `fs.cpSync(src, dest[, options])`

<!-- YAML
added: v16.7.0
changes:
  - version: v22.3.0
    pr-url: https://github.com/nodejs/node/pull/53127
    description: 此 API 不再是实验性的。
  - version:
    - v20.1.0
    - v18.17.0
    pr-url: https://github.com/nodejs/node/pull/47084
    description: "接受额外的 `mode` 选项以指定复制行为，作为 `fs.copyFile()` 的 `mode` 参数。"
  - version:
    - v17.6.0
    - v16.15.0
    pr-url: https://github.com/nodejs/node/pull/41819
    description: "接受额外的 `verbatimSymlinks` 选项以指定是否对符号链接执行路径解析。"
-->

* `src` {string|URL} 要复制的源路径。
* `dest` {string|URL} 要复制到的目标路径。
* `options` {Object}
  * `dereference` {boolean} 解引用符号链接。 **默认：** `false`。
  * `errorOnExist` {boolean} 当 `force` 为 `false` 且目标存在时，抛出错误。 **默认：** `false`。
  * `filter` {Function} 用于过滤复制的文件/目录的函数。返回 `true` 以复制该项目，`false` 以忽略它。忽略目录时，其所有内容也将被跳过。 **默认：** `undefined`
    * `src` {string} 要复制的源路径。
    * `dest` {string} 要复制到的目标路径。
    * 返回：{boolean} 任何可强制转换为 `boolean` 的非 `Promise` 值。
  * `force` {boolean} 覆盖现有文件或目录。如果将此设置为 false 且目标存在，复制操作将忽略错误。使用 `errorOnExist` 选项更改此行为。 **默认：** `true`。
  * `mode` {integer} 复制操作的修饰符。 **默认：** `0`。 参见 [`fs.copyFileSync()`][] 的 `mode` 标志。
  * `preserveTimestamps` {boolean} 当为 `true` 时，将保留来自 `src` 的时间戳。 **默认：** `false`。
  * `recursive` {boolean} 递归复制目录 **默认：** `false`
  * `verbatimSymlinks` {boolean} 当为 `true` 时，将跳过符号链接的路径解析。 **默认：** `false`

同步地将整个目录结构从 `src` 复制到 `dest`，包括子目录和文件。

将目录复制到另一个目录时，不支持 globs，行为类似于 `cp dir1/ dir2/`。

### `fs.existsSync(path)`

<!-- YAML
added: v0.1.21
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`path` 参数可以是一个使用 `file:` 协议的 WHATWG `URL` 对象。"
-->

* `path` {string|Buffer|URL}
* 返回：{boolean}

如果路径存在则返回 `true`，否则返回 `false`。

详细信息，请参阅此 API 异步版本的文档：[`fs.exists()`][]。

`fs.exists()` 已弃用，但 `fs.existsSync()` 没有。`fs.exists()` 的 `callback` 参数接受的参数与其他 Node.js 回调不一致。`fs.existsSync()` 不使用回调。

```mjs
import { existsSync } from 'node:fs';

if (existsSync('/etc/passwd'))
  console.log('该路径存在。');
```

### `fs.fchmodSync(fd, mode)`

<!-- YAML
added: v0.4.7
-->

* `fd` {integer}
* `mode` {string|integer}

设置文件上的权限。返回 `undefined`。

查看更多详情 POSIX fchmod(2) 文档。

### `fs.fchownSync(fd, uid, gid)`

<!-- YAML
added: v0.4.7
-->

* `fd` {integer}
* `uid` {integer} 文件新所有者的用户 id。
* `gid` {integer} 文件新组的组 id。

设置文件的所有者。返回 `undefined`。

查看更多详情 POSIX fchown(2) 文档。

### `fs.fdatasyncSync(fd)`

<!-- YAML
added: v0.1.96
-->

* `fd` {integer}

强制所有当前与该文件关联的排队 I/O 操作进入操作系统的同步 I/O 完成状态。参考 POSIX fdatasync(2) 文档获取详情。返回 `undefined`。

### `fs.fstatSync(fd[, options])`

<!-- YAML
added: v0.1.95
changes:
  - version: v10.5.0
    pr-url: https://github.com/nodejs/node/pull/20220
    description: "接受额外的 `options` 对象以指定返回的数值是否应为 bigint。"
-->

* `fd` {integer}
* `options` {Object}
  * `bigint` {boolean} 返回的 {fs.Stats} 对象中的数值是否应为 `bigint`。 **默认：** `false`。
* 返回：{fs.Stats}

检索文件描述符的 {fs.Stats}。

查看更多详情 POSIX fstat(2) 文档。

### `fs.fsyncSync(fd)`

<!-- YAML
added: v0.1.96
-->

* `fd` {integer}

请求打开文件描述符的所有数据刷新到存储设备。具体实现取决于操作系统和设备。参考 POSIX fsync(2) 文档获取更多详情。返回 `undefined`。

### `fs.ftruncateSync(fd[, len])`

<!-- YAML
added: v0.8.6
-->

* `fd` {integer}
* `len` {integer} **默认：** `0`

截断文件描述符。返回 `undefined`。

详细信息，请参阅此 API 异步版本的文档：[`fs.ftruncate()`][]。

### `fs.futimesSync(fd, atime, mtime)`

<!-- YAML
added: v0.4.2
changes:
  - version: v4.1.0
    pr-url: https://github.com/nodejs/node/pull/2387
    description: "数字字符串、`NaN` 和 `Infinity` 现在允许作为时间说明符。"
-->

* `fd` {integer}
* `atime` {number|string|Date}
* `mtime` {number|string|Date}

[`fs.futimes()`][] 的同步版本。返回 `undefined`。

### `fs.globSync(pattern[, options])`

<!-- YAML
added: v22.0.0
changes:
  - version: v26.1.0
    pr-url: https://github.com/nodejs/node/pull/62695
    description: 为 `followSymlinks` 选项添加支持。
  - version:
      - v24.1.0
      - v22.17.0
    pr-url: https://github.com/nodejs/node/pull/58182
    description: "为 `cwd` 选项添加对 `URL` 实例的支持。"
  - version:
      - v24.0.0
      - v22.17.0
    pr-url: https://github.com/nodejs/node/pull/57513
    description: 标记 API 为稳定。
  - version:
    - v23.7.0
    - v22.14.0
    pr-url: https://github.com/nodejs/node/pull/56489
    description: "添加对 `exclude` 选项的支持以接受 glob 模式。"
  - version: v22.2.0
    pr-url: https://github.com/nodejs/node/pull/52837
    description: "添加对 `withFileTypes` 作为选项的支持。"
-->

* `pattern` {string|string\[]}
* `options` {Object}
  * `cwd` {string|URL} 当前工作目录。**默认：** `process.cwd()`
  * `exclude` {Function|string\[]} 用于过滤文件/目录的函数，或要排除的 glob 模式列表。如果提供函数，返回 `true` 表示排除该项，返回 `false` 表示包含它。**默认：** `undefined`。
  * `followSymlinks` {boolean} 当为 `true` 时，在展开 `**` 模式时会跟随指向目录的符号链接。**默认：** `false`。
  * `withFileTypes` {boolean} 如果 glob 应返回 Dirent 形式的路径则为 `true`，否则为 `false`。**默认：** `false`。
* 返回：{string\[]} 匹配该模式的文件路径。

启用 `followSymlinks` 后，检测到的符号链接循环不会递归遍历。

```mjs
import { globSync } from 'node:fs';

console.log(globSync('**/*.js'));
```

```cjs
const { globSync } = require('node:fs');

console.log(globSync('**/*.js'));
```

### `fs.lchmodSync(path, mode)`

<!-- YAML
deprecated: v0.4.7
-->

> 稳定性：0 - 已弃用

* `path` {string|Buffer|URL}
* `mode` {integer}

更改符号链接上的权限。返回 `undefined`。

此方法仅在 macOS 上实现。

查看更多详情 POSIX lchmod(2) 文档。

### `fs.lchownSync(path, uid, gid)`

<!-- YAML
changes:
  - version: v10.6.0
    pr-url: https://github.com/nodejs/node/pull/21498
    description: 此 API 不再弃用。
  - version: v0.4.7
    description: 仅文档弃用。
-->

* `path` {string|Buffer|URL}
* `uid` {integer} 文件新所有者的用户 id。
* `gid` {integer} 文件新组的组 id。

设置路径的所有者。返回 `undefined`。

查看更多详情 POSIX lchown(2) 文档。

### `fs.lutimesSync(path, atime, mtime)`

<!-- YAML
added:
  - v14.5.0
  - v12.19.0
-->

* `path` {string|Buffer|URL}
* `atime` {number|string|Date}
* `mtime` {number|string|Date}

更改由 `path` 引用的符号链接的文件系统时间戳。返回 `undefined`，或者当参数不正确或操作失败时抛出异常。这是 [`fs.lutimes()`][] 的同步版本。

### `fs.linkSync(existingPath, newPath)`

<!-- YAML
added: v0.1.31
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`existingPath` 和 `newPath` 参数可以是使用 `file:` 协议的 WHATWG `URL` 对象。支持目前仍然是 *实验性的*。"
-->

* `existingPath` {string|Buffer|URL}
* `newPath` {string|Buffer|URL}

创建从 `existingPath` 到 `newPath` 的新链接。查看更多详情 POSIX link(2) 文档。返回 `undefined`。

### `fs.lstatSync(path[, options])`

<!-- YAML
added: v0.1.30
changes:
  - version:
    - v15.3.0
    - v14.17.0
    pr-url: https://github.com/nodejs/node/pull/33716
    description: "接受 `throwIfNoEntry` 选项以指定如果条目不存在是否应抛出异常。"
  - version: v10.5.0
    pr-url: https://github.com/nodejs/node/pull/20220
    description: "接受额外的 `options` 对象以指定返回的数值是否应为 bigint。"
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`path` 参数可以是一个使用 `file:` 协议的 WHATWG `URL` 对象。"
-->

* `path` {string|Buffer|URL}
* `options` {Object}
  * `bigint` {boolean} 返回的 {fs.Stats} 对象中的数值是否应为 `bigint`。 **默认：** `false`。
  * `throwIfNoEntry` {boolean} 如果没有文件系统条目存在，是否抛出异常，而不是返回 `undefined`。 **默认：** `true`。
* 返回：{fs.Stats}

检索由 `path` 引用的符号链接的 {fs.Stats}。

查看更多详情 POSIX lstat(2) 文档。

### `fs.mkdirSync(path[, options])`

<!-- YAML
added: v0.1.21
changes:
  - version:
     - v13.11.0
     - v12.17.0
    pr-url: https://github.com/nodejs/node/pull/31530
    description: "在 `recursive` 模式下，现在返回第一个创建的路径。"
  - version: v10.12.0
    pr-url: https://github.com/nodejs/node/pull/21875
    description: "第二个参数现在可以是具有 `recursive` 和 `mode` 属性的 `options` 对象。"
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`path` 参数可以是一个使用 `file:` 协议的 WHATWG `URL` 对象。"
-->

* `path` {string|Buffer|URL}
* `options` {Object|integer}
  * `recursive` {boolean} **默认：** `false`
  * `mode` {string|integer} Windows 上不支持。 **默认：** `0o777`。
* 返回：{string|undefined}

同步创建目录。返回 `undefined`，或者如果 `recursive` 为 `true`，则返回第一个创建的目录路径。
这是 [`fs.mkdir()`][] 的同步版本。

查看更多详情 POSIX mkdir(2) 文档。

### `fs.mkdtempSync(prefix[, options])`

<!-- YAML
added: v5.10.0
changes:
  - version:
    - v20.6.0
    - v18.19.0
    pr-url: https://github.com/nodejs/node/pull/48828
    description: "`prefix` 参数现在接受 buffers 和 URL。"
  - version:
      - v16.5.0
      - v14.18.0
    pr-url: https://github.com/nodejs/node/pull/39028
    description: "`prefix` 参数现在接受空字符串。"
-->

* `prefix` {string|Buffer|URL}
* `options` {string|Object}
  * `encoding` {string} **默认：** `'utf8'`
* 返回：{string}

返回创建的目录路径。

详细信息，请参阅此 API 异步版本的文档：[`fs.mkdtemp()`][]。

可选的 `options` 参数可以是指定编码的字符串，或者是具有 `encoding` 属性以指定要使用的字符编码的对象。

### `fs.mkdtempDisposableSync(prefix[, options])`

<!-- YAML
added: v24.4.0
-->

* `prefix` {string|Buffer|URL}
* `options` {string|Object}
  * `encoding` {string} **默认：** `'utf8'`
* 返回：{Object} 一个可处置对象：
  * `path` {string} 已创建目录的路径。
  * `remove` {Function} 一个移除已创建目录的函数。
  * `[Symbol.dispose]` {Function} 与 `remove` 相同。

返回一个可处置对象，其 `path` 属性持有已创建的目录路径。当对象被处置时，如果目录仍然存在，目录及其内容将被移除。如果目录无法删除，处置将抛出错误。该对象有一个 `remove()` 方法将执行相同的任务。

<!-- TODO: 一旦 https://github.com/mdn/content/pull/38027 合并，链接 MDN disposables 文档 -->

详细信息，请参阅 [`fs.mkdtemp()`][] 的文档。

此 API 没有基于回调的版本，因为它设计用于与 `using` 语法一起使用。

可选的 `options` 参数可以是指定编码的字符串，或者是具有 `encoding` 属性以指定要使用的字符编码的对象。

### `fs.opendirSync(path[, options])`

<!-- YAML
added: v12.12.0
changes:
  - version:
    - v20.1.0
    - v18.17.0
    pr-url: https://github.com/nodejs/node/pull/41439
    description: "添加 `recursive` 选项。"
  - version:
     - v13.1.0
     - v12.16.0
    pr-url: https://github.com/nodejs/node/pull/30114
    description: "引入 `bufferSize` 选项。"
-->

* `path` {string|Buffer|URL}
* `options` {Object}
  * `encoding` {string|null} **默认：** `'utf8'`
  * `bufferSize` {number} 从目录读取时内部缓冲的目录条目数。较高的值导致更好的性能但更高的内存使用。 **默认：** `32`
  * `recursive` {boolean} **默认：** `false`
* 返回：{fs.Dir}

同步打开目录。参见 opendir(3)。

创建一个 {fs.Dir}，其中包含所有用于从目录读取和清理目录的进一步函数。

`encoding` 选项设置打开目录和后续读取操作时 `path` 的编码。

### `fs.openSync(path[, flags[, mode]])`

<!-- YAML
added: v0.1.21
changes:
  - version: v11.1.0
    pr-url: https://github.com/nodejs/node/pull/23767
    description: "`flags` 参数现在是可选的，默认为 `'r'`。"
  - version: v9.9.0
    pr-url: https://github.com/nodejs/node/pull/18801
    description: "现在支持 `as` 和 `as+` 标志。"
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`path` 参数可以是一个使用 `file:` 协议的 WHATWG `URL` 对象。"
-->

* `path` {string|Buffer|URL}
* `flags` {string|number} **默认：** `'r'`。 参见 [文件系统 `flags` 的支持][]。
* `mode` {string|integer} **默认：** `0o666`
* 返回：{number}

返回一个代表文件描述符的整数。

详细信息，请参阅此 API 异步版本的文档：[`fs.open()`][]。

### `fs.readdirSync(path[, options])`

<!-- YAML
added: v0.1.21
changes:
  - version:
    - v20.1.0
    - v18.17.0
    pr-url: https://github.com/nodejs/node/pull/41439
    description: "添加 `recursive` 选项。"
  - version: v10.10.0
    pr-url: https://github.com/nodejs/node/pull/22020
    description: "添加新选项 `withFileTypes`。"
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`path` 参数可以是一个使用 `file:` 协议的 WHATWG `URL` 对象。"
-->

* `path` {string|Buffer|URL}
* `options` {string|Object}
  * `encoding` {string} **默认：** `'utf8'`
  * `withFileTypes` {boolean} **默认：** `false`
  * `recursive` {boolean} 如果为 `true`，递归读取目录的内容。在递归模式下，它将列出所有文件、子文件和目录。 **默认：** `false`。
* 返回：{string\[]|Buffer\[]|fs.Dirent\[]}

读取目录的内容。

查看更多详情 POSIX readdir(3) 文档。

可选的 `options` 参数可以是指定编码的字符串，或者是具有 `encoding` 属性以指定用于返回文件名的字符编码的对象。如果 `encoding` 设置为 `'buffer'`，返回的文件名将作为 {Buffer} 对象传递。

如果 `options.withFileTypes` 设置为 `true`，结果将包含 {fs.Dirent} 对象。

### `fs.readFileSync(path[, options])`

<!-- YAML
added: v0.1.8
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`path` 参数可以是一个使用 `file:` 协议的 WHATWG `URL` 对象。"
  - version: v5.0.0
    pr-url: https://github.com/nodejs/node/pull/3163
    description: "`path` 参数现在可以是文件描述符。"
-->

* `path` {string|Buffer|URL|integer} 文件名或文件描述符
* `options` {Object|string}
  * `encoding` {string|null} **默认：** `null`
  * `flag` {string} 参见 [文件系统 `flags` 的支持][]。 **默认：** `'r'`。
* 返回：{string|Buffer}

返回 `path` 的内容。

详细信息，请参阅此 API 异步版本的文档：[`fs.readFile()`][]。

如果指定了 `encoding` 选项，则此函数返回字符串。否则它返回 buffer。

类似于 [`fs.readFile()`][]，当路径是目录时，`fs.readFileSync()` 的行为是特定于平台的。

```mjs
import { readFileSync } from 'node:fs';

// macOS、Linux 和 Windows
readFileSync('<directory>');
// => [Error: EISDIR: illegal operation on a directory, read <directory")]

//  FreeBSD
readFileSync('<directory>'); // => <data>
```

### `fs.readlinkSync(path[, options])`

<!-- YAML
added: v0.1.31
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`path` 参数可以是一个使用 `file:` 协议的 WHATWG `URL` 对象。"
-->

* `path` {string|Buffer|URL}
* `options` {string|Object}
  * `encoding` {string} **默认：** `'utf8'`
* 返回：{string|Buffer}

返回符号链接的字符串值。

查看更多详情 POSIX readlink(2) 文档。

可选的 `options` 参数可以是指定编码的字符串，或者是具有 `encoding` 属性以指定用于返回的链接路径的字符编码的对象。如果 `encoding` 设置为 `'buffer'`，返回的链接路径将作为 {Buffer} 对象传递。

### `fs.readSync(fd, buffer, offset, length[, position])`

<!-- YAML
added: v0.1.21
changes:
  - version: v10.10.0
    pr-url: https://github.com/nodejs/node/pull/22150
    description: "`buffer` 参数现在可以是任何 `TypedArray` 或 `DataView`。"
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/4518
    description: "`length` 参数现在可以是 `0`。"
-->

* `fd` {integer}
* `buffer` {Buffer|TypedArray|DataView}
* `offset` {integer}
* `length` {integer}
* `position` {integer|bigint|null} **默认：** `null`
* 返回：{number} `bytesRead` 的数量。

详细信息，请参阅此 API 异步版本的文档：[`fs.read()`][]。

### `fs.readSync(fd, buffer[, options])`

<!-- YAML
added:
 - v13.13.0
 - v12.17.0
changes:
  - version:
     - v13.13.0
     - v12.17.0
    pr-url: https://github.com/nodejs/node/pull/32460
    description: 可以传入 Options 对象以使 offset、length 和 position 为可选。
-->

* `fd` {integer}
* `buffer` {Buffer|TypedArray|DataView}
* `options` {Object}
  * `offset` {integer} **默认：** `0`
  * `length` {integer} **默认：** `buffer.byteLength - offset`
  * `position` {integer|bigint|null} **默认：** `null`
* 返回：{number} `bytesRead` 的数量。

类似于上面的 `fs.readSync` 函数，此版本接受可选的 `options` 对象。
如果未指定 `options` 对象，它将默认使用上述值。

详细信息，请参阅此 API 异步版本的文档：[`fs.read()`][]。

### `fs.readvSync(fd, buffers[, position])`

<!-- YAML
added:
 - v13.13.0
 - v12.17.0
-->

* `fd` {integer}
* `buffers` {ArrayBufferView\[]}
* `position` {integer|null} **默认：** `null`
* 返回：{number} 读取的字节数。

详细信息，请参阅此 API 异步版本的文档：[`fs.readv()`][]。

### `fs.realpathSync(path[, options])`

<!-- YAML
added: v0.1.31
changes:
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/13028
    description: 添加 Pipe/Socket 解析支持。
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`path` 参数可以是一个使用 `file:` 协议的 WHATWG `URL` 对象。"
  - version: v6.4.0
    pr-url: https://github.com/nodejs/node/pull/7899
    description: "现在再次适用于 Windows 上的各种边缘情况调用 `realpathSync`。"
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/3594
    description: "移除 `cache` 参数。"
-->

* `path` {string|Buffer|URL}
* `options` {string|Object}
  * `encoding` {string} **默认：** `'utf8'`
* 返回：{string|Buffer}

返回解析后的路径名。

详细信息，请参阅此 API 异步版本的文档：[`fs.realpath()`][]。

### `fs.realpathSync.native(path[, options])`

<!-- YAML
added: v9.2.0
-->

* `path` {string|Buffer|URL}
* `options` {string|Object}
  * `encoding` {string} **默认：** `'utf8'`
* 返回：{string|Buffer}

同步 realpath(3)。

仅支持可以转换为 UTF8 字符串的路径。

可选的 `options` 参数可以是指定编码的字符串，或者是具有 `encoding` 属性以指定用于返回路径的字符编码的对象。如果 `encoding` 设置为 `'buffer'`，返回的路径将作为 {Buffer} 对象传递。

在 Linux 上，当 Node.js 链接到 musl libc 时，必须将 procfs 文件系统挂载在 `/proc` 上以便此函数工作。Glibc 没有此限制。

### `fs.renameSync(oldPath, newPath)`

<!-- YAML
added: v0.1.21
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`oldPath` 和 `newPath` 参数可以是使用 `file:` 协议的 WHATWG `URL` 对象。支持目前仍然是 *实验性的*。"
-->

* `oldPath` {string|Buffer|URL}
* `newPath` {string|Buffer|URL}

将文件从 `oldPath` 重命名为 `newPath`。返回 `undefined`。

查看更多详情 POSIX rename(2) 文档。

### `fs.rmdirSync(path[, options])`

<!-- YAML
added: v0.1.21
changes:
  - version: v25.0.0
    pr-url: https://github.com/nodejs/node/pull/58616
    description: "移除 `recursive` 选项。"
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/37216
    description: "不再允许在是文件的 `path` 上使用 `fs.rmdirSync(path, { recursive: true })`，在 Windows 上导致 `ENOENT` 错误，在 POSIX 上导致 `ENOTDIR` 错误。"
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/37216
    description: "不再允许在不存在的 `path` 上使用 `fs.rmdirSync(path, { recursive: true })`，导致 `ENOENT` 错误。"
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/37302
    description: "`recursive` 选项已弃用，使用它会触发弃用警告。"
  - version: v14.14.0
    pr-url: https://github.com/nodejs/node/pull/35579
    description: "`recursive` 选项已弃用，改用 `fs.rmSync`。"
  - version:
     - v13.3.0
     - v12.16.0
    pr-url: https://github.com/nodejs/node/pull/30644
    description: "`maxBusyTries` 选项重命名为 `maxRetries`，其默认值为 0。`emfileWait` 选项已移除，`EMFILE` 错误使用与其他错误相同的重试逻辑。现在支持 `retryDelay` 选项。`ENFILE` 错误现在会重试。"
  - version: v12.10.0
    pr-url: https://github.com/nodejs/node/pull/29168
    description: "现在支持 `recursive`、`maxBusyTries` 和 `emfileWait` 选项。"
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`path` 参数可以是一个使用 `file:` 协议的 WHATWG `URL` 对象。"
-->

* `path` {string|Buffer|URL}
* `options` {Object} 目前未公开任何选项。过去有 `recursive`、`maxBusyTries` 和 `emfileWait` 的选项，但它们已弃用并移除。`options` 参数仍被接受以保持向后兼容，但不使用。

同步 rmdir(2)。返回 `undefined`。

在文件（非目录）上使用 `fs.rmdirSync()` 在 Windows 上导致 `ENOENT` 错误，在 POSIX 上导致 `ENOTDIR` 错误。

要获得类似于 `rm -rf` Unix 命令的行为，使用 [`fs.rmSync()`][] 并带有选项 `{ recursive: true, force: true }`。

### `fs.rmSync(path[, options])`

<!-- YAML
added: v14.14.0
changes:
  - version:
      - v17.3.0
      - v16.14.0
    pr-url: https://github.com/nodejs/node/pull/41132
    description: "`path` 参数可以是一个使用 `file:` 协议的 WHATWG `URL` 对象。"
-->

* `path` {string|Buffer|URL}
* `options` {Object}
  * `force` {boolean} 当为 `true` 时，如果 `path` 不存在，异常将被忽略。 **默认：** `false`。
  * `maxRetries` {integer} 如果遇到 `EBUSY`、`EMFILE`、`ENFILE`、`ENOTEMPTY` 或 `EPERM` 错误，Node.js 将重试操作，每次尝试线性退后等待 `retryDelay` 毫秒。此选项代表重试次数。如果 `recursive` 选项不为 `true`，则忽略此选项。 **默认：** `0`。
  * `recursive` {boolean} 如果为 `true`，执行递归目录移除。在递归模式下，失败时会重试操作。 **默认：** `false`。
  * `retryDelay` {integer} 重试之间等待的毫秒数。如果 `recursive` 选项不为 `true`，则忽略此选项。 **默认：** `100`。

同步移除文件和目录（基于标准 POSIX `rm` 实用程序建模）。返回 `undefined`。

### `fs.statSync(path[, options])`

<!-- YAML
added: v0.1.21
changes:
  - version:
    - v15.3.0
    - v14.17.0
    pr-url: https://github.com/nodejs/node/pull/33716
    description: "接受 `throwIfNoEntry` 选项以指定如果条目不存在是否应抛出异常。"
  - version: v10.5.0
    pr-url: https://github.com/nodejs/node/pull/20220
    description: "接受额外的 `options` 对象以指定返回的数值是否应为 bigint。"
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`path` 参数可以是一个使用 `file:` 协议的 WHATWG `URL` 对象。"
-->

* `path` {string|Buffer|URL}
* `options` {Object}
  * `bigint` {boolean} 返回的 {fs.Stats} 对象中的数值是否应为 `bigint`。 **默认：** `false`。
  * `throwIfNoEntry` {boolean} 如果没有文件系统条目存在，是否抛出异常，而不是返回 `undefined`。 **默认：** `true`。
* 返回：{fs.Stats}

检索路径的 {fs.Stats}。

### `fs.statfsSync(path[, options])`

<!-- YAML
added:
  - v19.6.0
  - v18.15.0
-->

* `path` {string|Buffer|URL}
* `options` {Object}
  * `bigint` {boolean} 返回的 {fs.StatFs} 对象中的数值是否应为 `bigint`。 **默认：** `false`。
* 返回：{fs.StatFs}

同步 statfs(2)。返回包含 `path` 的挂载文件系统的信息。

如果发生错误，`err.code` 将是 [常见系统错误][] 之一。

### `fs.symlinkSync(target, path[, type])`

<!-- YAML
added: v0.1.31
changes:
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/23724
    description: "如果 `type` 参数未定义，Node 将自动检测 `target` 类型并自动选择 `dir` 或 `file`。"
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`target` 和 `path` 参数可以是使用 `file:` 协议的 WHATWG `URL` 对象。支持目前仍然是 *实验性的*。"
-->

* `target` {string|Buffer|URL}
* `path` {string|Buffer|URL}
* `type` {string|null} **默认：** `null`
* 返回：`undefined`。

详细信息，请参阅此 API 异步版本的文档：[`fs.symlink()`][]。

### `fs.truncateSync(path[, len])`

<!-- YAML
added: v0.8.6
-->

* `path` {string|Buffer|URL}
* `len` {integer} **默认：** `0`

截断文件。返回 `undefined`。文件描述符也可以作为第一个参数传递。在这种情况下，调用 `fs.ftruncateSync()`。

传递文件描述符已弃用，并可能导致将来抛出错误。

### `fs.unlinkSync(path)`

<!-- YAML
added: v0.1.21
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`path` 参数可以是一个使用 `file:` 协议的 WHATWG `URL` 对象。"
-->

* `path` {string|Buffer|URL}

同步 unlink(2)。返回 `undefined`。

### `fs.utimesSync(path, atime, mtime)`

<!-- YAML
added: v0.4.2
changes:
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/11919
    description: "`NaN`、`Infinity` 和 `-Infinity` 不再是有效的时间说明符。"
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: "`path` 参数可以是一个使用 `file:` 协议的 WHATWG `URL` 对象。"
  - version: v4.1.0
    pr-url: https://github.com/nodejs/node/pull/2387
    description: "数字字符串、`NaN` 和 `Infinity` 现在允许作为时间说明符。"
-->

* `path` {string|Buffer|URL}
* `atime` {number|string|Date}
* `mtime` {number|string|Date}
* 返回：`undefined`。

详细信息，请参阅此 API 异步版本的文档：[`fs.utimes()`][]。

### `fs.writeFileSync(file, data[, options])`

<!-- YAML
added: v0.1.29
changes:
  - version:
    - v21.0.0
    - v20.10.0
    pr-url: https://github.com/nodejs/node/pull/50009
    description: "现在支持 `flush` 选项。"
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/42796
    description: "不再支持向 `data` 参数传递具有自有 `toString` 函数的对象。"
  - version: v17.8.0
    pr-url: https://github.com/nodejs/node/pull/42149
    description: "向 `data` 参数传递具有自有 `toString` 函数的对象已弃用。"
  - version: v14.12.0
    pr-url: https://github.com/nodejs/node/pull/34993
    description: "`data` 参数将字符串化具有显式 `toString` 函数的对象。"
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/31030
    description: "`data` 参数不再将不支持的输入强制转换为字符串。"
  - version: v10.10.0
    pr-url: https://github.com/nodejs/node/pull/22150
    description: "`data` 参数现在可以是任何 `TypedArray` 或 `DataView`。"
  - version: v7.4.0
    pr-url: https://github.com/nodejs/node/pull/10382
    description: "`data` 参数现在可以是 `Uint8Array`。"
  - version: v5.0.0
    pr-url: https://github.com/nodejs/node/pull/3163
    description: "`file` 参数现在可以是文件描述符。"
-->

* `file` {string|Buffer|URL|integer} 文件名或文件描述符
* `data` {string|Buffer|TypedArray|DataView}
* `options` {Object|string}
  * `encoding` {string|null} **默认：** `'utf8'`
  * `mode` {integer} **默认：** `0o666`
  * `flag` {string} 参见 [文件系统 `flags` 的支持][]。 **默认：** `'w'`。
  * `flush` {boolean} 如果所有数据成功写入文件，且 `flush` 为 `true`，则使用 `fs.fsyncSync()` 刷新数据。
* 返回：`undefined`。

`mode` 选项仅影响新创建的文件。查看更多详情 [`fs.open()`][]。

详细信息，请参阅此 API 异步版本的文档：[`fs.writeFile()`][]。

### `fs.writeSync(fd, buffer, offset[, length[, position]])`

<!-- YAML
added: v0.1.21
changes:
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/31030
    description: "`buffer` 参数不再将不支持的输入强制转换为字符串。"
  - version: v10.10.0
    pr-url: https://github.com/nodejs/node/pull/22150
    description: "`buffer` 参数现在可以是任何 `TypedArray` 或 `DataView`。"
  - version: v7.4.0
    pr-url: https://github.com/nodejs/node/pull/10382
    description: "`buffer` 参数现在可以是 `Uint8Array`。"
  - version: v7.2.0
    pr-url: https://github.com/nodejs/node/pull/7856
    description: "`offset` 和 `length` 参数现在是可选的。"
-->

* `fd` {integer}
* `buffer` {Buffer|TypedArray|DataView}
* `offset` {integer} **默认：** `0`
* `length` {integer} **默认：** `buffer.byteLength - offset`
* `position` {integer|null} **默认：** `null`
* 返回：{number} 写入的字节数。

详细信息，请参阅此 API 异步版本的文档：[`fs.write(fd, buffer...)`][]。

### `fs.writeSync(fd, buffer[, options])`

<!-- YAML
added:
  - v18.3.0
  - v16.17.0
-->

* `fd` {integer}
* `buffer` {Buffer|TypedArray|DataView}
* `options` {Object}
  * `offset` {integer} **默认：** `0`
  * `length` {integer} **默认：** `buffer.byteLength - offset`
  * `position` {integer|null} **默认：** `null`
* 返回：{number} 写入的字节数。

详细信息，请参阅此 API 异步版本的文档：[`fs.write(fd, buffer...)`][]。

### `fs.writeSync(fd, string[, position[, encoding]])`

<!-- YAML
added: v0.11.5
changes:
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/31030
    description: "`string` 参数不再将不支持的输入强制转换为字符串。"
  - version: v7.2.0
    pr-url: https://github.com/nodejs/node/pull/7856
    description: "`position` 参数现在是可选的。"
-->

* `fd` {integer}
* `string` {string}
* `position` {integer|null} **默认：** `null`
* `encoding` {string} **默认：** `'utf8'`
* 返回：{number} 写入的字节数。

详细信息，请参阅此 API 异步版本的文档：[`fs.write(fd, string...)`][]。

### `fs.writevSync(fd, buffers[, position])`

<!-- YAML
added: v12.9.0
-->

* `fd` {integer}
* `buffers` {ArrayBufferView\[]}
* `position` {integer|null} **默认：** `null`
* 返回：{number} 写入的字节数。

详细信息，请参阅此 API 异步版本的文档：[`fs.writev()`][].

## 常用对象

常用对象由所有文件系统 API 变体（promise、callback 和 synchronous）共享。

### 类：`fs.Dir`

<!-- YAML
added: v12.12.0
-->

表示目录流的类。

由 [`fs.opendir()`][]、[`fs.opendirSync()`][] 或
[`fsPromises.opendir()`][] 创建。

```mjs
import { opendir } from 'node:fs/promises';

try {
  const dir = await opendir('./');
  for await (const dirent of dir)
    console.log(dirent.name);
} catch (err) {
  console.error(err);
}
```

使用异步迭代器时，{fs.Dir} 对象将在迭代器退出后自动关闭。

#### `dir.close()`

<!-- YAML
added: v12.12.0
-->

* 返回：{Promise}

异步关闭目录的底层资源句柄。
后续读取将导致错误。

返回一个 Promise，在资源关闭后 fulfilled。

#### `dir.close(callback)`

<!-- YAML
added: v12.12.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 callback 参数传递无效的回调现在会抛出 ERR_INVALID_ARG_TYPE 而不是ERR_INVALID_CALLBACK。"
-->

* `callback` {Function}
  * `err` {Error}

异步关闭目录的底层资源句柄。
后续读取将导致错误。

资源句柄关闭后将调用 `callback`。

#### `dir.closeSync()`

<!-- YAML
added: v12.12.0
-->

同步关闭目录的底层资源句柄。
后续读取将导致错误。

#### `dir.path`

<!-- YAML
added: v12.12.0
-->

* 类型：{string}

此目录的只读路径，如同提供给 [`fs.opendir()`][]、
[`fs.opendirSync()`][] 或 [`fsPromises.opendir()`][] 的那样。

#### `dir.read()`

<!-- YAML
added: v12.12.0
-->

* 返回：{Promise} Fulfilled 值为 {fs.Dirent|null}

通过 readdir(3) 异步读取下一个目录条目作为
{fs.Dirent}。

返回一个 Promise，它将 fulfilled 一个 {fs.Dirent}，如果没有更多目录条目可读，则为 `null`。

此函数返回的目录条目没有特定顺序，由操作系统底层目录机制提供。
迭代目录时添加或删除的条目可能不包含在迭代结果中。

#### `dir.read(callback)`

<!-- YAML
added: v12.12.0
-->

* `callback` {Function}
  * `err` {Error}
  * `dirent` {fs.Dirent|null}

通过 readdir(3) 异步读取下一个目录条目作为
{fs.Dirent}。

读取完成后，将使用 {fs.Dirent} 调用 `callback`，如果没有更多目录条目可读，则为 `null`。

此函数返回的目录条目没有特定顺序，由操作系统底层目录机制提供。
迭代目录时添加或删除的条目可能不包含在迭代结果中。

#### `dir.readSync()`

<!-- YAML
added: v12.12.0
-->

* 返回：{fs.Dirent|null}

同步读取下一个目录条目作为 {fs.Dirent}。有关更多详细信息，请参阅
POSIX readdir(3) 文档。

如果没有更多目录条目可读，将返回 `null`。

此函数返回的目录条目没有特定顺序，由操作系统底层目录机制提供。
迭代目录时添加或删除的条目可能不包含在迭代结果中。

#### `dir[Symbol.asyncIterator]()`

<!-- YAML
added: v12.12.0
-->

* 返回：{AsyncIterator} {fs.Dirent} 的 AsyncIterator

异步迭代目录直到所有条目都被读取。有关更多详细信息，请参阅 POSIX readdir(3) 文档。

异步迭代器返回的条目始终是 {fs.Dirent}。
来自 `dir.read()` 的 `null` 情况在内部处理。

参见 {fs.Dir} 获取示例。

此迭代器返回的目录条目没有特定顺序，由操作系统底层目录机制提供。
迭代目录时添加或删除的条目可能不包含在迭代结果中。

#### `dir[Symbol.asyncDispose]()`

<!-- YAML
added:
 - v24.1.0
 - v22.1.0
changes:
 - version: v24.2.0
   pr-url: https://github.com/nodejs/node/pull/58467
   description: 不再是实验性的。
-->

如果目录句柄是打开的，则调用 `dir.close()`，并返回一个在处置完成时 fulfilled 的 Promise。

#### `dir[Symbol.dispose]()`

<!-- YAML
added:
 - v24.1.0
 - v22.1.0
changes:
 - version: v24.2.0
   pr-url: https://github.com/nodejs/node/pull/58467
   description: 不再是实验性的。
-->

如果目录句柄是打开的，则调用 `dir.closeSync()`，并返回
`undefined`。

### 类：`fs.Dirent`

<!-- YAML
added: v10.10.0
-->

目录条目的表示，可以是目录内的文件或子目录，由从 {fs.Dir} 读取返回。目录条目是文件名和文件类型对的组合。

此外，当调用 [`fs.readdir()`][] 或 [`fs.readdirSync()`][] 并将
`withFileTypes` 选项设置为 `true` 时，结果数组将填充
{fs.Dirent} 对象，而不是字符串或 {Buffer}。

#### `dirent.isBlockDevice()`

<!-- YAML
added: v10.10.0
-->

* 返回：{boolean}

如果 {fs.Dirent} 对象描述块设备，则返回 `true`。

#### `dirent.isCharacterDevice()`

<!-- YAML
added: v10.10.0
-->

* 返回：{boolean}

如果 {fs.Dirent} 对象描述字符设备，则返回 `true`。

#### `dirent.isDirectory()`

<!-- YAML
added: v10.10.0
-->

* 返回：{boolean}

如果 {fs.Dirent} 对象描述文件系统
目录，则返回 `true`。

#### `dirent.isFIFO()`

<!-- YAML
added: v10.10.0
-->

* 返回：{boolean}

如果 {fs.Dirent} 对象描述先进先出
(FIFO) 管道，则返回 `true`。

#### `dirent.isFile()`

<!-- YAML
added: v10.10.0
-->

* 返回：{boolean}

如果 {fs.Dirent} 对象描述常规文件，则返回 `true`。

#### `dirent.isSocket()`

<!-- YAML
added: v10.10.0
-->

* 返回：{boolean}

如果 {fs.Dirent} 对象描述套接字，则返回 `true`。

#### `dirent.isSymbolicLink()`

<!-- YAML
added: v10.10.0
-->

* 返回：{boolean}

如果 {fs.Dirent} 对象描述符号链接，则返回 `true`。

#### `dirent.name`

<!-- YAML
added: v10.10.0
-->

* 类型：{string|Buffer}

此 {fs.Dirent} 对象引用的文件名。此
值的类型由传递给 [`fs.readdir()`][] 或
[`fs.readdirSync()`][] 的 `options.encoding` 决定。

#### `dirent.parentPath`

<!-- YAML
added:
  - v21.4.0
  - v20.12.0
  - v18.20.0
changes:
  - version:
      - v24.0.0
      - v22.17.0
    pr-url: https://github.com/nodejs/node/pull/57513
    description: 标记 API 为稳定。
-->

* 类型：{string}

此 {fs.Dirent} 对象引用的文件的父目录路径。

### 类：`fs.FSWatcher`

<!-- YAML
added: v0.5.8
-->

* 继承 {EventEmitter}

成功调用 [`fs.watch()`][] 方法将返回一个新的 {fs.FSWatcher}
对象。

每当特定的被监视文件被修改时，所有 {fs.FSWatcher} 对象都会发出 `'change'` 事件。

#### 事件：`'change'`

<!-- YAML
added: v0.5.8
-->

* `eventType` {string} 发生的变更事件类型
* `filename` {string|Buffer} 更改的文件名（如果相关/可用）

当被监视的目录或文件中的某些内容发生变化时发出。
参见 [`fs.watch()`][] 获取更多详细信息。

根据操作系统支持情况，可能不提供 `filename` 参数。如果提供了 `filename`，如果
调用 `fs.watch()` 时其 `encoding` 选项设置为 `'buffer'`，它将作为 {Buffer} 提供，否则
`filename` 将是 UTF-8 字符串。

```mjs
import { watch } from 'node:fs';
// 当通过 fs.watch() 监听器处理时的示例
watch('./tmp', { encoding: 'buffer' }, (eventType, filename) => {
  if (filename) {
    console.log(filename);
    // 打印：<Buffer ...>
  }
});
```

#### 事件：`'close'`

<!-- YAML
added: v10.0.0
-->

当监视器停止监视更改时发出。关闭的
{fs.FSWatcher} 对象在事件处理程序中不再可用。

#### 事件：`'error'`

<!-- YAML
added: v0.5.8
-->

* `error` {Error}

当监视文件时发生错误时发出。出错的
{fs.FSWatcher} 对象在事件处理程序中不再可用。

#### `watcher.close()`

<!-- YAML
added: v0.5.8
-->

停止监视给定 {fs.FSWatcher} 上的更改。一旦停止，
{fs.FSWatcher} 对象不再可用。

#### `watcher.ref()`

<!-- YAML
added:
  - v14.3.0
  - v12.20.0
-->

* 返回：{fs.FSWatcher}

调用时，请求 Node.js 事件循环只要
{fs.FSWatcher} 处于活动状态就不要退出。多次调用 `watcher.ref()` 将无效。

默认情况下，所有 {fs.FSWatcher} 对象都是"ref'ed"，因此通常不需要调用 `watcher.ref()`，除非之前调用过 `watcher.unref()`。

#### `watcher.unref()`

<!-- YAML
added:
  - v14.3.0
  - v12.20.0
-->

* 返回：{fs.FSWatcher}

调用时，活动的 {fs.FSWatcher} 对象将不需要 Node.js
事件循环保持活动。如果没有其他活动保持
事件循环运行，进程可能在 {fs.FSWatcher} 对象的
回调被调用之前退出。多次调用 `watcher.unref()` 将无效。

### 类：`fs.StatWatcher`

<!-- YAML
added:
  - v14.3.0
  - v12.20.0
-->

* 继承 {EventEmitter}

成功调用 `fs.watchFile()` 方法将返回一个新的 {fs.StatWatcher}
对象。

#### `watcher.ref()`

<!-- YAML
added:
  - v14.3.0
  - v12.20.0
-->

* 返回：{fs.StatWatcher}

调用时，请求 Node.js 事件循环只要
{fs.StatWatcher} 处于活动状态就不要退出。多次调用 `watcher.ref()` 将无效。

默认情况下，所有 {fs.StatWatcher} 对象都是"ref'ed"，因此通常不需要调用 `watcher.ref()`，除非之前调用过 `watcher.unref()`。

#### `watcher.unref()`

<!-- YAML
added:
  - v14.3.0
  - v12.20.0
-->

* 返回：{fs.StatWatcher}

调用时，活动的 {fs.StatWatcher} 对象将不需要 Node.js
事件循环保持活动。如果没有其他活动保持
事件循环运行，进程可能在 {fs.StatWatcher} 对象的
回调被调用之前退出。多次调用 `watcher.unref()` 将无效。

### 类：`fs.ReadStream`

<!-- YAML
added: v0.1.93
-->

* 继承：{stream.Readable}

{fs.ReadStream} 的实例不能直接构造。它们是使用
[`fs.createReadStream()`][] 函数创建并返回的。

#### 事件：`'close'`

<!-- YAML
added: v0.1.93
-->

当 {fs.ReadStream} 的底层文件描述符已关闭时发出。

#### 事件：`'open'`

<!-- YAML
added: v0.1.93
-->

* `fd` {integer} {fs.ReadStream} 使用的整数文件描述符。

当 {fs.ReadStream} 的文件描述符已打开时发出。

#### 事件：`'ready'`

<!-- YAML
added: v9.11.0
-->

当 {fs.ReadStream} 准备好使用时发出。

在 `'open'` 之后立即触发。

#### `readStream.bytesRead`

<!-- YAML
added: v6.4.0
-->

* 类型：{number}

到目前为止已读取的字节数。

#### `readStream.path`

<!-- YAML
added: v0.1.93
-->

* 类型：{string|Buffer}

流正在读取的文件的路径，如 [`fs.createReadStream()`][] 的第一个
参数中指定。如果 `path` 作为字符串传递，则
`readStream.path` 将是字符串。如果 `path` 作为 {Buffer} 传递，则
`readStream.path` 将是 {Buffer}。如果指定了 `fd`，则
`readStream.path` 将是 `undefined`。

#### `readStream.pending`

<!-- YAML
added:
 - v11.2.0
 - v10.16.0
-->

* 类型：{boolean}

如果底层文件尚未打开，即在发出 `'ready'` 事件之前，此
属性为 `true`。

### 类：`fs.Stats`

<!-- YAML
added: v0.1.21
changes:
  - version:
    - v22.0.0
    - v20.13.0
    pr-url: https://github.com/nodejs/node/pull/51879
    description: 公共构造函数已弃用。
  - version: v8.1.0
    pr-url: https://github.com/nodejs/node/pull/13173
    description: 添加时间为数字。
-->

{fs.Stats} 对象提供有关文件的信息。

从 [`fs.stat()`][]、[`fs.lstat()`][]、[`fs.fstat()`][] 及其
同步对应物返回的对象属于此类型。
如果传递给这些方法的选项中的 `bigint` 为 true，则数值
将为 `bigint` 而不是 `number`，并且对象将包含额外的
纳秒精度属性，后缀为 `Ns`。
不应直接使用 `new` 关键字创建 `Stat` 对象。

```console
Stats {
  dev: 2114,
  ino: 48064969,
  mode: 33188,
  nlink: 1,
  uid: 85,
  gid: 100,
  rdev: 0,
  size: 527,
  blksize: 4096,
  blocks: 8,
  atimeMs: 1318289051000.1,
  mtimeMs: 1318289051000.1,
  ctimeMs: 1318289051000.1,
  birthtimeMs: 1318289051000.1,
  atime: Mon, 10 Oct 2011 23:24:11 GMT,
  mtime: Mon, 10 Oct 2011 23:24:11 GMT,
  ctime: Mon, 10 Oct 2011 23:24:11 GMT,
  birthtime: Mon, 10 Oct 2011 23:24:11 GMT }
```

`bigint` 版本：

```console
BigIntStats {
  dev: 2114n,
  ino: 48064969n,
  mode: 33188n,
  nlink: 1n,
  uid: 85n,
  gid: 100n,
  rdev: 0n,
  size: 527n,
  blksize: 4096n,
  blocks: 8n,
  atimeMs: 1318289051000n,
  mtimeMs: 1318289051000n,
  ctimeMs: 1318289051000n,
  birthtimeMs: 1318289051000n,
  atimeNs: 1318289051000000000n,
  mtimeNs: 1318289051000000000n,
  ctimeNs: 1318289051000000000n,
  birthtimeNs: 1318289051000000000n,
  atime: Mon, 10 Oct 2011 23:24:11 GMT,
  mtime: Mon, 10 Oct 2011 23:24:11 GMT,
  ctime: Mon, 10 Oct 2011 23:24:11 GMT,
  birthtime: Mon, 10 Oct 2011 23:24:11 GMT }
```

#### `stats.isBlockDevice()`

<!-- YAML
added: v0.1.10
-->

* 返回：{boolean}

如果 {fs.Stats} 对象描述块设备，则返回 `true`。

#### `stats.isCharacterDevice()`

<!-- YAML
added: v0.1.10
-->

* 返回：{boolean}

如果 {fs.Stats} 对象描述字符设备，则返回 `true`。

#### `stats.isDirectory()`

<!-- YAML
added: v0.1.10
-->

* 返回：{boolean}

如果 {fs.Stats} 对象描述文件系统
目录，则返回 `true`。

如果 {fs.Stats} 对象是通过在符号链接上调用 [`fs.lstat()`][] 获得的，
该符号链接解析为目录，则此方法将返回 `false`。
这是因为 [`fs.lstat()`][] 返回有关
符号链接本身的信息，而不是它解析到的路径。

#### `stats.isFIFO()`

<!-- YAML
added: v0.1.10
-->

* 返回：{boolean}

如果 {fs.Stats} 对象描述先进先出 (FIFO)
管道，则返回 `true`。

#### `stats.isFile()`

<!-- YAML
added: v0.1.10
-->

* 返回：{boolean}

如果 {fs.Stats} 对象描述常规文件，则返回 `true`。

#### `stats.isSocket()`

<!-- YAML
added: v0.1.10
-->

* 返回：{boolean}

如果 {fs.Stats} 对象描述套接字，则返回 `true`。

#### `stats.isSymbolicLink()`

<!-- YAML
added: v0.1.10
-->

* 返回：{boolean}

如果 {fs.Stats} 对象描述符号链接，则返回 `true`。

此方法仅在使用 [`fs.lstat()`][] 时有效。

#### `stats.dev`

* 类型：{number|bigint}

包含文件的设备的数字标识符。

#### `stats.ino`

* 类型：{number|bigint}

文件特定的文件系统"Inode"编号。

#### `stats.mode`

* 类型：{number|bigint}

描述文件类型和模式的位字段。

#### `stats.nlink`

* 类型：{number|bigint}

文件存在的硬链接数。

#### `stats.uid`

* 类型：{number|bigint}

拥有文件的用户的数字用户标识符 (POSIX)。

#### `stats.gid`

* 类型：{number|bigint}

拥有文件的组的数字组标识符 (POSIX)。

#### `stats.rdev`

* 类型：{number|bigint}

如果文件代表设备，则为数字设备标识符。

#### `stats.size`

* 类型：{number|bigint}

文件的大小（字节）。

如果底层文件系统不支持获取文件大小，
这将为 `0`。

#### `stats.blksize`

* 类型：{number|bigint}

用于 i/o 操作的文件系统块大小。

#### `stats.blocks`

* 类型：{number|bigint}

为此文件分配的块数。

#### `stats.atimeMs`

<!-- YAML
added: v8.1.0
-->

* 类型：{number|bigint}

表示上次访问此文件的时间戳，以自 POSIX 纪元以来的
毫秒数表示。

#### `stats.mtimeMs`

<!-- YAML
added: v8.1.0
-->

* 类型：{number|bigint}

表示上次修改此文件的时间戳，以自 POSIX 纪元以来的
毫秒数表示。

#### `stats.ctimeMs`

<!-- YAML
added: v8.1.0
-->

* 类型：{number|bigint}

表示上次更改文件状态的时间戳，以自 POSIX 纪元以来的
毫秒数表示。

#### `stats.birthtimeMs`

<!-- YAML
added: v8.1.0
-->

* 类型：{number|bigint}

表示此文件创建时间的时间戳，以自 POSIX 纪元以来的
毫秒数表示。

#### `stats.atimeNs`

<!-- YAML
added: v12.10.0
-->

* 类型：{bigint}

仅当将 `bigint: true` 传递给生成
对象的方法时才存在。
表示上次访问此文件的时间戳，以自 POSIX 纪元以来的
纳秒数表示。

#### `stats.mtimeNs`

<!-- YAML
added: v12.10.0
-->

* 类型：{bigint}

仅当将 `bigint: true` 传递给生成
对象的方法时才存在。
表示上次修改此文件的时间戳，以自 POSIX 纪元以来的
纳秒数表示。

#### `stats.ctimeNs`

<!-- YAML
added: v12.10.0
-->

* 类型：{bigint}

仅当将 `bigint: true` 传递给生成
对象的方法时才存在。
表示上次更改文件状态的时间戳，以自 POSIX 纪元以来的
纳秒数表示。

#### `stats.birthtimeNs`

<!-- YAML
added: v12.10.0
-->

* 类型：{bigint}

仅当将 `bigint: true` 传递给生成
对象的方法时才存在。
表示此文件创建时间的时间戳，以自 POSIX 纪元以来的
纳秒数表示。

#### `stats.atime`

<!-- YAML
added: v0.11.13
-->

* 类型：{Date}

表示上次访问此文件的时间戳。

#### `stats.mtime`

<!-- YAML
added: v0.11.13
-->

* 类型：{Date}

表示上次修改此文件的时间戳。

#### `stats.ctime`

<!-- YAML
added: v0.11.13
-->

* 类型：{Date}

表示上次更改文件状态的时间戳。

#### `stats.birthtime`

<!-- YAML
added: v0.11.13
-->

* 类型：{Date}

表示此文件创建时间的时间戳。

#### Stat 时间值

`atimeMs`、`mtimeMs`、`ctimeMs`、`birthtimeMs` 属性是
保存相应时间（毫秒）的数值。它们的
精度特定于平台。当将 `bigint: true` 传递给生成
对象的方法时，属性将是 [bigints][]，
否则它们将是 [numbers][MDN-Number]。

`atimeNs`、`mtimeNs`、`ctimeNs`、`birthtimeNs` 属性是
保存相应时间（纳秒）的 [bigints][]。它们
仅当将 `bigint: true` 传递给生成
对象的方法时才存在。它们的精度特定于平台。

`atime`、`mtime`、`ctime` 和 `birthtime` 是
各种时间的 [`Date`][MDN-Date] 对象替代表示。
`Date` 和数值之间没有关联。分配新的数值，或
修改 `Date` 值，不会反映在相应的替代表示中。

stat 对象中的时间具有以下语义：

* `atime` "访问时间"：上次访问文件数据的时间。由
  mknod(2)、utimes(2) 和 read(2) 系统调用更改。
* `mtime` "修改时间"：上次修改文件数据的时间。
  由 mknod(2)、utimes(2) 和 write(2) 系统调用更改。
* `ctime` "变更时间"：上次更改文件状态的时间
  (inode 数据修改)。由 chmod(2)、chown(2)、
  link(2)、mknod(2)、rename(2)、unlink(2)、utimes(2)、
  read(2) 和 write(2) 系统调用更改。
* `birthtime` "出生时间"：文件创建时间。文件
  创建时设置一次。在不提供 birthtime 的文件系统上，
  此字段可能保存 `ctime` 或
  `1970-01-01T00:00Z`（即 Unix 纪元时间戳 `0`）。在这种情况下，此值可能
  大于 `atime` 或 `mtime`。在 Darwin 和其他 FreeBSD 变体上，
  如果使用 utimes(2) 系统调用将 `atime` 显式设置为早于当前
  `birthtime` 的值，也会设置。

在 Node.js 0.12 之前，`ctime` 在 Windows 系统上保存 `birthtime`。从
0.12 开始，`ctime` 不是"创建时间"，在 Unix 系统上，从来都不是。

### 类：`fs.StatFs`

<!-- YAML
added:
  - v19.6.0
  - v18.15.0
-->

提供有关挂载的文件系统的信息。

从 [`fs.statfs()`][] 及其同步对应物返回的对象属于
此类型。如果传递给这些方法的选项中的 `bigint` 为 `true`，则
数值将为 `bigint` 而不是 `number`。

```console
StatFs {
  type: 1397114950,
  bsize: 4096,
  frsize: 4096,
  blocks: 121938943,
  bfree: 61058895,
  bavail: 61058895,
  files: 999,
  ffree: 1000000
}
```

`bigint` 版本：

```console
StatFs {
  type: 1397114950n,
  bsize: 4096n,
  frsize: 4096n,
  blocks: 121938943n,
  bfree: 61058895n,
  bavail: 61058895n,
  files: 999n,
  ffree: 1000000n
}
```

#### `statfs.bavail`

<!-- YAML
added:
  - v19.6.0
  - v18.15.0
-->

* 类型：{number|bigint}

非特权用户可用的空闲块。

#### `statfs.bfree`

<!-- YAML
added:
  - v19.6.0
  - v18.15.0
-->

* 类型：{number|bigint}

文件系统中的空闲块。

#### `statfs.blocks`

<!-- YAML
added:
  - v19.6.0
  - v18.15.0
-->

* 类型：{number|bigint}

文件系统中的总数据块。

#### `statfs.bsize`

<!-- YAML
added:
  - v19.6.0
  - v18.15.0
-->

* 类型：{number|bigint}

最佳传输块大小。

#### `statfs.frsize`

<!-- YAML
added: v26.1.0
-->

* 类型：{number|bigint}

基本文件系统块大小。

#### `statfs.ffree`

<!-- YAML
added:
  - v19.6.0
  - v18.15.0
-->

* 类型：{number|bigint}

文件系统中的空闲文件节点。

#### `statfs.files`

<!-- YAML
added:
  - v19.6.0
  - v18.15.0
-->

* 类型：{number|bigint}

文件系统中的总文件节点。

#### `statfs.type`

<!-- YAML
added:
  - v19.6.0
  - v18.15.0
-->

* 类型：{number|bigint}

文件系统类型。

### 类：`fs.Utf8Stream`

<!-- YAML
added: v24.6.0
-->

> 稳定性：1 - 实验性

一个优化的 UTF-8 流写入器，允许按需刷新所有内部缓冲。它正确处理 `EAGAIN` 错误，允许
自定义，例如，如果磁盘繁忙则丢弃内容。

#### 事件：`'close'`

当流完全关闭时发出 `'close'` 事件。

#### 事件：`'drain'`

当内部缓冲已充分排空以允许继续写入时发出 `'drain'` 事件。

#### 事件：`'drop'`

当达到最大长度且该数据将不会被写入时发出 `'drop'` 事件。被丢弃的数据作为第一个参数
传递给事件处理程序。

#### 事件：`'error'`

当发生错误时发出 `'error'` 事件。

#### 事件：`'finish'`

当流已结束且所有数据已刷新到底层文件时发出 `'finish'` 事件。

#### 事件：`'ready'`

当流准备好接受写入时发出 `'ready'` 事件。

#### 事件：`'write'`

当写入操作完成时发出 `'write'` 事件。写入的字节数作为第一个参数传递给事件处理程序。

#### `new fs.Utf8Stream([options])`

* `options` {Object}
  * `append`: {boolean} 将写入追加到 dest 文件而不是截断它。
    **默认值**: `true`。
  * `contentMode`: {string} 您可以发送到 write
    函数的数据类型，支持的值是 `'utf8'` 或 `'buffer'`。**默认值**:
    `'utf8'`。
  * `dest`: {string} 要写入的文件的路径（模式由
    append 选项控制）。
  * `fd`: {number} 文件描述符，由 `fs.open()`
    或 `fs.openSync()` 返回的内容。
  * `fs`: {Object} 具有与 `fs` 模块相同 API 的对象，有用
    于模拟、测试或自定义流的行为。
  * `fsync`: {boolean} 每次写入完成时执行 `fs.fsyncSync()`。
  * `maxLength`: {number} 内部缓冲区的最大长度。如果写入
    操作会导致缓冲区超过 `maxLength`，则写入的数据将被丢弃，并发出带有被丢弃数据的 drop 事件
  * `maxWrite`: {number} 可以写入的最大字节数；
    **默认值**: `16384`
  * `minLength`: {number} 刷新前需要填满的内部缓冲区的最小长度。
  * `mkdir`: {boolean} 当为 true 时确保 `dest` 文件的目录存在。
    **默认值**: `false`。
  * `mode`: {number|string} 指定创建文件模式（参见 `fs.open()`）。
  * `periodicFlush`: {number} 每 `periodicFlush` 毫秒调用 flush。
  * `retryEAGAIN` {Function} 当 `write()`、
    `writeSync()` 或 `flushSync()` 遇到 `EAGAIN` 或 `EBUSY` 错误时将调用的函数。
    如果返回值为 `true` 则将重试操作，否则将冒泡错误。`err` 是导致调用此函数的错误，`writeBufferLen` 是已写入缓冲区的长度，
    `remainingBufferLen` 是流未尝试写入的剩余缓冲区的长度。
    * `err` {any} 错误或 `null`。
    * `writeBufferLen` {number}
    * `remainingBufferLen`: {number}
  * `sync`: {boolean} 同步执行写入。

#### `utf8Stream.append`

* {boolean} 流是追加到文件还是截断它。

#### `utf8Stream.contentMode`

* {string} 可以写入流的数据类型。支持
  的值是 `'utf8'` 或 `'buffer'`。**默认值**: `'utf8'`。

#### `utf8Stream.destroy()`

立即关闭流，不刷新内部缓冲区。

#### `utf8Stream.end()`

优雅地关闭流，在关闭前刷新内部缓冲区。

#### `utf8Stream.fd`

* {number} 正在写入的文件描述符。

#### `utf8Stream.file`

* {string} 正在写入的文件。

#### `utf8Stream.flush(callback)`

* `callback` {Function}
  * `err` {Error|null} 如果刷新失败则为错误，否则为 `null`。

如果写入未进行中，则将当前缓冲区写入文件。如果 `minLength` 为零或已经在写入，则不执行任何操作。

#### `utf8Stream.flushSync()`

同步刷新缓冲数据。这是一个昂贵的操作。

#### `utf8Stream.fsync`

* {boolean} 流是否在每次
  写入操作后执行 `fs.fsyncSync()`。

#### `utf8Stream.maxLength`

* {number} 内部缓冲区的最大长度。如果写入
  操作会导致缓冲区超过 `maxLength`，则写入的数据将被丢弃，并发出带有被丢弃数据的 drop 事件。

#### `utf8Stream.minLength`

* {number} 刷新前需要填满的内部缓冲区的最小长度。

#### `utf8Stream.mkdir`

* {boolean} 流是否应确保 `dest` 文件的目录存在。如果为 `true`，如果目录不存在则创建它。**默认值**: `false`。

#### `utf8Stream.mode`

* {number|string} 正在写入的文件的模式。

#### `utf8Stream.periodicFlush`

* {number} 刷新之间的毫秒数。如果设置为 `0`，则不会执行定期刷新。

#### `utf8Stream.reopen(file)`

* `file`: {string|Buffer|URL} 要写入的文件的路径（模式
  由 append 选项控制）。

就地重新打开文件，适用于日志轮转。

#### `utf8Stream.sync`

* {boolean} 流是同步写入还是异步写入。

#### `utf8Stream.write(data)`

* `data` {string|Buffer} 要写入的数据。
* 返回 {boolean}

当创建流时将 `options.contentMode` 设置为 `'utf8'` 时，
`data` 参数必须是字符串。如果 `contentMode` 设置为 `'buffer'`，
则 `data` 参数必须是 {Buffer}。

#### `utf8Stream.writing`

* {boolean} 流是否正在向文件写入数据。

#### `utf8Stream[Symbol.dispose]()`

调用 `utf8Stream.destroy()`。

### 类：`fs.WriteStream`

<!-- YAML
added: v0.1.93
-->

* 继承 {stream.Writable}

{fs.WriteStream} 的实例不能直接构造。它们是使用
[`fs.createWriteStream()`][] 函数创建并返回的。

#### 事件：`'close'`

<!-- YAML
added: v0.1.93
-->

当 {fs.WriteStream} 的底层文件描述符已关闭时发出。

#### 事件：`'open'`

<!-- YAML
added: v0.1.93
-->

* `fd` {integer} {fs.WriteStream} 使用的整数文件描述符。

当 {fs.WriteStream} 的文件已打开时发出。

#### 事件：`'ready'`

<!-- YAML
added: v9.11.0
-->

当 {fs.WriteStream} 准备好使用时发出。

在 `'open'` 之后立即触发。

#### `writeStream.bytesWritten`

<!-- YAML
added: v0.4.7
-->

到目前为止写入的字节数。不包括仍排队等待写入的数据。

#### `writeStream.close([callback])`

<!-- YAML
added: v0.9.4
-->

* `callback` {Function}
  * `err` {Error}

关闭 `writeStream`。可选地接受一个
回调，一旦 `writeStream`
关闭就会执行。

#### `writeStream.path`

<!-- YAML
added: v0.1.93
-->

流正在写入的文件的路径，如 [`fs.createWriteStream()`][] 的第一个
参数中指定。如果 `path` 作为字符串传递，则
`writeStream.path` 将是字符串。如果 `path` 作为 {Buffer} 传递，则
`writeStream.path` 将是 {Buffer}。

#### `writeStream.pending`

<!-- YAML
added: v11.2.0
-->

* 类型：{boolean}

如果底层文件尚未打开，即在发出 `'ready'` 事件之前，此
属性为 `true`。

### `fs.constants`

* 类型：{Object}

返回一个包含文件系统操作常用常量的对象。

#### FS 常量

以下常量由 `fs.constants` 和 `fsPromises.constants` 导出。

并非每个常量在每个操作系统上都可用；
这对于 Windows 尤其重要，其中许多 POSIX 特定
定义不可用。
对于可移植应用程序，建议在使用前检查它们是否存在。

要使用多个常量，请使用按位 OR `|` 运算符。

示例：

```mjs
import { open, constants } from 'node:fs';

const {
  O_RDWR,
  O_CREAT,
  O_EXCL,
} = constants;

open('/path/to/my/file', O_RDWR | O_CREAT | O_EXCL, (err, fd) => {
  // ...
});
```

##### 文件访问常量

以下常量旨在用作传递给
[`fsPromises.access()`][]、[`fs.access()`][] 和 [`fs.accessSync()`][] 的 `mode` 参数。

<table>
  <tr>
    <th>常量</th>
    <th>描述</th>
  </tr>
  <tr>
    <td><code>F_OK</code></td>
    <td>标志，指示文件对调用进程可见。
     这对于确定文件是否存在很有用，但不说明
     <code>rwx</code> 权限。如果未指定模式，则为默认值。</td>
  </tr>
  <tr>
    <td><code>R_OK</code></td>
    <td>标志，指示文件可由调用进程读取。</td>
  </tr>
  <tr>
    <td><code>W_OK</code></td>
    <td>标志，指示文件可由调用
    进程写入。</td>
  </tr>
  <tr>
    <td><code>X_OK</code></td>
    <td>标志，指示文件可由调用
    进程执行。这在 Windows 上没有效果
    （将表现为 <code>fs.constants.F_OK</code>）。</td>
  </tr>
</table>

这些定义在 Windows 上也可用。

##### 文件复制常量

以下常量旨在与 [`fs.copyFile()`][] 一起使用。

<table>
  <tr>
    <th>常量</th>
    <th>描述</th>
  </tr>
  <tr>
    <td><code>COPYFILE_EXCL</code></td>
    <td>如果存在，如果目标路径已存在，则复制操作将失败并报错。</td>
  </tr>
  <tr>
    <td><code>COPYFILE_FICLONE</code></td>
    <td>如果存在，复制操作将尝试创建
    写时复制 reflink。如果底层平台不支持
    写时复制，则使用回退复制机制。</td>
  </tr>
  <tr>
    <td><code>COPYFILE_FICLONE_FORCE</code></td>
    <td>如果存在，复制操作将尝试创建
    写时复制 reflink。如果底层平台不支持
    写时复制，则操作将失败并报错。</td>
  </tr>
</table>

这些定义在 Windows 上也可用。

##### 文件打开常量

以下常量旨在与 `fs.open()` 一起使用。

<table>
  <tr>
    <th>常量</th>
    <th>描述</th>
  </tr>
  <tr>
    <td><code>O_RDONLY</code></td>
    <td>标志，指示以只读方式打开文件。</td>
  </tr>
  <tr>
    <td><code>O_WRONLY</code></td>
    <td>标志，指示以只写方式打开文件。</td>
  </tr>
  <tr>
    <td><code>O_RDWR</code></td>
    <td>标志，指示以读写方式打开文件。</td>
  </tr>
  <tr>
    <td><code>O_CREAT</code></td>
    <td>标志，指示如果文件不存在则创建文件。</td>
  </tr>
  <tr>
    <td><code>O_EXCL</code></td>
    <td>标志，指示如果设置了
    <code>O_CREAT</code> 标志且文件已存在，则打开文件应失败。</td>
  </tr>
  <tr>
    <td><code>O_NOCTTY</code></td>
    <td>标志，指示如果路径标识终端设备，打开路径不应导致该终端成为进程的控制终端（如果进程还没有控制终端）。</td>
  </tr>
  <tr>
    <td><code>O_TRUNC</code></td>
    <td>标志，指示如果文件存在且是常规文件，并且文件成功打开以进行写入访问，则其长度应截断为零。</td>
  </tr>
  <tr>
    <td><code>O_APPEND</code></td>
    <td>标志，指示数据将追加到文件末尾。</td>
  </tr>
  <tr>
    <td><code>O_DIRECTORY</code></td>
    <td>标志，指示如果路径不是目录，则打开应失败。</td>
  </tr>
  <tr>
  <td><code>O_NOATIME</code></td>
    <td>标志，指示对文件系统的读取访问将不再导致与文件关联的 <code>atime</code> 信息更新。此标志仅在 Linux 操作系统上可用。</td>
  </tr>
  <tr>
    <td><code>O_NOFOLLOW</code></td>
    <td>标志，指示如果路径是符号链接，则打开应失败。</td>
  </tr>
  <tr>
    <td><code>O_SYNC</code></td>
    <td>标志，指示文件打开用于同步 I/O，写入操作等待文件完整性。</td>
  </tr>
  <tr>
    <td><code>O_DSYNC</code></td>
    <td>标志，指示文件打开用于同步 I/O，写入操作等待数据完整性。</td>
  </tr>
  <tr>
    <td><code>O_SYMLINK</code></td>
    <td>标志，指示打开符号链接本身而不是它指向的资源。</td>
  </tr>
  <tr>
    <td><code>O_DIRECT</code></td>
    <td>设置时，将尝试最小化文件 I/O 的缓存效果。</td>
  </tr>
  <tr>
    <td><code>O_NONBLOCK</code></td>
    <td>标志，指示在可能时以非阻塞模式打开文件。</td>
  </tr>
  <tr>
    <td><code>UV_FS_O_FILEMAP</code></td>
    <td>设置时，使用内存文件映射来访问文件。此标志
    仅在 Windows 操作系统上可用。在其他操作系统上，
    此标志被忽略。</td>
  </tr>
</table>

在 Windows 上，只有 `O_APPEND`、`O_CREAT`、`O_EXCL`、`O_RDONLY`、`O_RDWR`、
`O_TRUNC`、`O_WRONLY` 和 `UV_FS_O_FILEMAP` 可用。

##### 文件类型常量

以下常量旨在与 {fs.Stats} 对象的
`mode` 属性一起使用，以确定文件类型。

<table>
  <tr>
    <th>常量</th>
    <th>描述</th>
  </tr>
  <tr>
    <td><code>S_IFMT</code></td>
    <td>用于提取文件类型代码的位掩码。</td>
  </tr>
  <tr>
    <td><code>S_IFREG</code></td>
    <td>常规文件的文件类型常量。</td>
  </tr>
  <tr>
    <td><code>S_IFDIR</code></td>
    <td>目录的文件类型常量。</td>
  </tr>
  <tr>
    <td><code>S_IFCHR</code></td>
    <td>面向字符的设备文件的文件类型常量。</td>
  </tr>
  <tr>
    <td><code>S_IFBLK</code></td>
    <td>面向块的设备文件的文件类型常量。</td>
  </tr>
  <tr>
    <td><code>S_IFIFO</code></td>
    <td>FIFO/管道的文件类型常量。</td>
  </tr>
  <tr>
    <td><code>S_IFLNK</code></td>
    <td>符号链接的文件类型常量。</td>
  </tr>
  <tr>
    <td><code>S_IFSOCK</code></td>
    <td>套接字的文件类型常量。</td>
  </tr>
</table>

在 Windows 上，只有 `S_IFCHR`、`S_IFDIR`、`S_IFLNK`、`S_IFMT` 和 `S_IFREG`
可用。

##### 文件模式常量

以下常量旨在与 {fs.Stats} 对象的
`mode` 属性一起使用，以确定文件的访问权限。

<table>
  <tr>
    <th>常量</th>
    <th>描述</th>
  </tr>
  <tr>
    <td><code>S_IRWXU</code></td>
    <td>文件模式，指示所有者可读、可写和可执行。</td>
  </tr>
  <tr>
    <td><code>S_IRUSR</code></td>
    <td>文件模式，指示所有者可读。</td>
  </tr>
  <tr>
    <td><code>S_IWUSR</code></td>
    <td>文件模式，指示所有者可写。</td>
  </tr>
  <tr>
    <td><code>S_IXUSR</code></td>
    <td>文件模式，指示所有者可执行。</td>
  </tr>
  <tr>
    <td><code>S_IRWXG</code></td>
    <td>文件模式，指示组可读、可写和可执行。</td>
  </tr>
  <tr>
    <td><code>S_IRGRP</code></td>
    <td>文件模式，指示组可读。</td>
  </tr>
  <tr>
    <td><code>S_IWGRP</code></td>
    <td>文件模式，指示组可写。</td>
  </tr>
  <tr>
    <td><code>S_IXGRP</code></td>
    <td>文件模式，指示组可执行。</td>
  </tr>
  <tr>
    <td><code>S_IRWXO</code></td>
    <td>文件模式，指示其他人可读、可写和可执行。</td>
  </tr>
  <tr>
    <td><code>S_IROTH</code></td>
    <td>文件模式，指示其他人可读。</td>
  </tr>
  <tr>
    <td><code>S_IWOTH</code></td>
    <td>文件模式，指示其他人可写。</td>
  </tr>
  <tr>
    <td><code>S_IXOTH</code></td>
    <td>文件模式，指示其他人可执行。</td>
  </tr>
</table>

在 Windows 上，只有 `S_IRUSR` 和 `S_IWUSR` 可用。

## 注意事项

### 回调和基于 Promise 的操作的顺序

因为它们由底层线程池异步执行，
所以使用回调或基于 Promise 的方法时没有保证的顺序。

例如，以下内容容易出错，因为 `fs.stat()`
操作可能在 `fs.rename()` 操作之前完成：

```js
const fs = require('node:fs');

fs.rename('/tmp/hello', '/tmp/world', (err) => {
  if (err) throw err;
  console.log('重命名完成');
});
fs.stat('/tmp/world', (err, stats) => {
  if (err) throw err;
  console.log(`统计信息: ${JSON.stringify(stats)}`);
});
```

重要的是通过等待一个操作的结果再调用另一个操作来正确排序操作：

```mjs
import { rename, stat } from 'node:fs/promises';

const oldPath = '/tmp/hello';
const newPath = '/tmp/world';

try {
  await rename(oldPath, newPath);
  const stats = await stat(newPath);
  console.log(`统计信息: ${JSON.stringify(stats)}`);
} catch (error) {
  console.error('发生错误:', error.message);
}
```

```cjs
const { rename, stat } = require('node:fs/promises');

(async function(oldPath, newPath) {
  try {
    await rename(oldPath, newPath);
    const stats = await stat(newPath);
    console.log(`统计信息: ${JSON.stringify(stats)}`);
  } catch (error) {
    console.error('发生错误:', error.message);
  }
})('/tmp/hello', '/tmp/world');
```

或者，当使用回调 API 时，将 `fs.stat()` 调用移入 `fs.rename()` 操作的回调中：

```mjs
import { rename, stat } from 'node:fs';

rename('/tmp/hello', '/tmp/world', (err) => {
  if (err) throw err;
  stat('/tmp/world', (err, stats) => {
    if (err) throw err;
    console.log(`统计信息: ${JSON.stringify(stats)}`);
  });
});
```

```cjs
const { rename, stat } = require('node:fs/promises');

rename('/tmp/hello', '/tmp/world', (err) => {
  if (err) throw err;
  stat('/tmp/world', (err, stats) => {
    if (err) throw err;
    console.log(`统计信息: ${JSON.stringify(stats)}`);
  });
});
```

### 文件路径

大多数 `fs` 操作接受文件路径，这些路径可以指定为
字符串、{Buffer} 或使用 `file:` 协议的 {URL} 对象。

#### 字符串路径

字符串路径被解释为标识绝对或相对文件名的 UTF-8 字符序列。相对路径将相对于
由调用 `process.cwd()` 确定的当前工作目录进行解析。

在 POSIX 上使用绝对路径的示例：

```mjs
import { open } from 'node:fs/promises';

let fd;
try {
  fd = await open('/open/some/file.txt', 'r');
  // 对文件执行某些操作
} finally {
  await fd?.close();
}
```

在 POSIX 上使用相对路径的示例（相对于 `process.cwd()`）：

```mjs
import { open } from 'node:fs/promises';

let fd;
try {
  fd = await open('file.txt', 'r');
  // 对文件执行某些操作
} finally {
  await fd?.close();
}
```

#### 文件 URL 路径

<!-- YAML
added: v7.6.0
-->

对于大多数 `node:fs` 模块函数，`path` 或 `filename` 参数可以
作为使用 `file:` 协议的 {URL} 对象传递。

```mjs
import { readFileSync } from 'node:fs';

readFileSync(new URL('file:///tmp/hello'));
```

`file:` URL 始终是绝对路径。

##### 平台特定注意事项

在 Windows 上，带有主机名的 `file:` {URL} 转换为 UNC 路径，而带有驱动器号的 `file:`
{URL} 转换为本地绝对路径。没有主机名且没有驱动器号的 `file:` {URL}
将导致错误：

```mjs
import { readFileSync } from 'node:fs';
// 在 Windows 上：

// - 带有主机名的 WHATWG 文件 URL 转换为 UNC 路径
// file://hostname/p/a/t/h/file => \\hostname\p\a\t\h\file
readFileSync(new URL('file://hostname/p/a/t/h/file'));

// - 带有驱动器号的 WHATWG 文件 URL 转换为绝对路径
// file:///C:/tmp/hello => C:\tmp\hello
readFileSync(new URL('file:///C:/tmp/hello'));

// - 没有主机名的 WHATWG 文件 URL 必须具有驱动器号
readFileSync(new URL('file:///notdriveletter/p/a/t/h/file'));
readFileSync(new URL('file:///c/p/a/t/h/file'));
// TypeError [ERR_INVALID_FILE_URL_PATH]: 文件 URL 路径必须是绝对的
```

带有驱动器号的 `file:` {URL} 必须使用 `:` 作为分隔符，紧跟在
驱动器字母之后。使用其他分隔符将导致错误。

在所有其他平台上，带有主机名的 `file:` {URL} 不受支持并
将导致错误：

```mjs
import { readFileSync } from 'node:fs';
// 在其他平台上：

// - 不支持带有主机名的 WHATWG 文件 URL
// file://hostname/p/a/t/h/file => 抛出！
readFileSync(new URL('file://hostname/p/a/t/h/file'));
// TypeError [ERR_INVALID_FILE_URL_PATH]: 必须是绝对的

// - WHATWG 文件 URL 转换为绝对路径
// file:///tmp/hello => /tmp/hello
readFileSync(new URL('file:///tmp/hello'));
```

具有编码斜杠字符的 `file:` {URL} 将在所有
平台上导致错误：

```mjs
import { readFileSync } from 'node:fs';

// 在 Windows 上
readFileSync(new URL('file:///C:/p/a/t/h/%2F'));
readFileSync(new URL('file:///C:/p/a/t/h/%2f'));
/* TypeError [ERR_INVALID_FILE_URL_PATH]: 文件 URL 路径不能包含编码的
\ 或 / 字符 */

// 在 POSIX 上
readFileSync(new URL('file:///p/a/t/h/%2F'));
readFileSync(new URL('file:///p/a/t/h/%2f'));
/* TypeError [ERR_INVALID_FILE_URL_PATH]: 文件 URL 路径不能包含编码的
/ 字符 */
```

在 Windows 上，具有编码反斜杠的 `file:` {URL} 将导致错误：

```mjs
import { readFileSync } from 'node:fs';

// 在 Windows 上
readFileSync(new URL('file:///C:/path/%5C'));
readFileSync(new URL('file:///C:/path/%5c'));
/* TypeError [ERR_INVALID_FILE_URL_PATH]: 文件 URL 路径不能包含编码的
\ 或 / 字符 */
```

#### Buffer 路径

使用 {Buffer} 指定的路径主要在某些 POSIX
操作系统上有用，这些系统将文件路径视为不透明字节序列。在此类
系统上，单个文件路径可能包含使用多种字符编码的子序列。与字符串路径一样，{Buffer} 路径可以
是相对的或绝对的：

在 POSIX 上使用绝对路径的示例：

```mjs
import { open } from 'node:fs/promises';
import { Buffer } from 'node:buffer';

let fd;
try {
  fd = await open(Buffer.from('/open/some/file.txt'), 'r');
  // 对文件执行某些操作
} finally {
  await fd?.close();
}
```

#### Windows 上的每驱动器工作目录

在 Windows 上，Node.js 遵循每驱动器工作目录的概念。当
使用不带反斜杠的驱动器路径时可以观察到这种行为。例如 `fs.readdirSync('C:\\')` 可能返回与
`fs.readdirSync('C:')` 不同的结果。更多信息，请参阅
[此 MSDN 页面][MSDN-Rel-Path]。

### 文件描述符

在 POSIX 系统上，对于每个进程，内核维护一个当前
打开文件和资源的表。每个打开的文件被分配一个简单的数字
标识符，称为_文件描述符_。在系统级别，所有文件
系统操作都使用这些文件描述符来标识和跟踪每个特定
文件。Windows 系统使用不同但概念上相似的机制来
跟踪资源。为了简化用户操作，Node.js 抽象了
操作系统之间的差异，并为所有打开的文件分配一个数字文件
描述符。

基于回调的 `fs.open()` 和同步的 `fs.openSync()` 方法打开
文件并分配一个新的文件描述符。一旦分配，文件描述符可
用于从文件读取数据、向文件写入数据或请求有关文件的信息。

操作系统限制任何给定时间可以打开的文件描述符数量，因此在操作
完成时关闭描述符至关重要。未能这样做将导致内存泄漏，最终
导致应用程序崩溃。

```mjs
import { open, close, fstat } from 'node:fs';

function closeFd(fd) {
  close(fd, (err) => {
    if (err) throw err;
  });
}

open('/open/some/file.txt', 'r', (err, fd) => {
  if (err) throw err;
  try {
    fstat(fd, (err, stat) => {
      if (err) {
        closeFd(fd);
        throw err;
      }

      // 使用 stat

      closeFd(fd);
    });
  } catch (err) {
    closeFd(fd);
    throw err;
  }
});
```

基于 Promise 的 API 使用 {FileHandle} 对象代替数字
文件描述符。这些对象由系统更好地管理以确保
资源不被泄漏。但是，仍然要求在操作完成时关闭它们：

```mjs
import { open } from 'node:fs/promises';

let file;
try {
  file = await open('/open/some/file.txt', 'r');
  const stat = await file.stat();
  // 使用 stat
} finally {
  await file.close();
}
```

### 线程池使用

所有基于回调和 Promise 的文件系统 API（`fs.FSWatcher()` 除外）都使用 libuv 的线程池。这可能会对一些应用程序产生令人惊讶且负面的
性能影响。请参阅
[`UV_THREADPOOL_SIZE`][] 文档以获取更多信息。

### 文件系统标志

无论何时 `flag` 选项接受字符串，以下标志都可用。

* `'a'`: 打开文件以追加。
  如果文件不存在则创建。

* `'ax'`: 类似 `'a'`，但如果路径存在则失败。

* `'a+'`: 打开文件以读取和追加。
  如果文件不存在则创建。

* `'ax+'`: 类似 `'a+'`，但如果路径存在则失败。

* `'as'`: 以同步模式打开文件以追加。
  如果文件不存在则创建。

* `'as+'`: 以同步模式打开文件以读取和追加。
  如果文件不存在则创建。

* `'r'`: 打开文件以读取。
  如果文件不存在则发生异常。

* `'rs'`: 以同步模式打开文件以读取。
  如果文件不存在则发生异常。

* `'r+'`: 打开文件以读取和写入。
  如果文件不存在则发生异常。

* `'rs+'`: 以同步模式打开文件以读取和写入。指示
  操作系统绕过本地文件系统缓存。

  这主要用于打开 NFS 挂载上的文件，因为它允许
  跳过可能过时的本地缓存。它对
  I/O 性能有非常实际的影响，因此除非需要，否则不建议使用此标志。

  这不会将 `fs.open()` 或 `fsPromises.open()` 变成同步
  阻塞调用。如果需要同步操作，应使用类似
  `fs.openSync()` 的方法。

* `'w'`: 打开文件以写入。
  文件被创建（如果不存在）或截断（如果存在）。

* `'wx'`: 类似 `'w'`，但如果路径存在则失败。

* `'w+'`: 打开文件以读取和写入。
  文件被创建（如果不存在）或截断（如果存在）。

* `'wx+'`: 类似 `'w+'`，但如果路径存在则失败。

`flag` 也可以是 open(2) 文档中记录的数字；常用常量
可从 `fs.constants` 获取。在 Windows 上，标志在适用的情况下被翻译为其等价标志，例如 `O_WRONLY` 到 `FILE_GENERIC_WRITE`，
或 `O_EXCL|O_CREAT` 到 `CREATE_NEW`，如同 `CreateFileW` 所接受的那样。

独占标志 `'x'`（open(2) 中的 `O_EXCL` 标志）会导致操作在路径已存在时
返回错误。在 POSIX 上，如果路径是符号
链接，使用 `O_EXCL` 即使链接指向不存在的路径也会返回错误。独占标志可能不适用于网络文件系统。

在 Linux 上，当文件以追加模式打开时，定位写入不起作用。
内核忽略位置参数并始终将数据追加到
文件末尾。

修改文件而不是替换它可能需要将 `flag` 选项设置
为 `'r+'` 而不是默认的 `'w'`。

某些标志的行为是特定于平台的。因此，在 macOS 和 Linux 上使用 `'a+'` 标志打开目录
（如下例所示）将返回一个
错误。相比之下，在 Windows 和 FreeBSD 上，将返回文件描述符或 `FileHandle`。

```js
// macOS 和 Linux
fs.open('<directory>', 'a+', (err, fd) => {
  // => [Error: EISDIR: 对目录的非法操作，open <directory>]
});

// Windows 和 FreeBSD
fs.open('<directory>', 'a+', (err, fd) => {
  // => null, <fd>
});
```

在 Windows 上，使用 `'w'` 标志（通过
`fs.open()`、`fs.writeFile()` 或 `fsPromises.open()`）打开现有的隐藏文件将失败并返回
`EPERM`。现有的隐藏文件可以使用 `'r+'` 标志打开以进行写入。

调用 `fs.ftruncate()` 或 `filehandle.truncate()` 可用于重置
文件内容。

[#25741]: https://github.com/nodejs/node/issues/25741
[常见系统错误]: errors.md#common-system-errors
[FS 常量]: #fs-constants
[文件访问常量]: #file-access-constants
[文件模式]: #file-modes
[MDN-Date]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
[MDN-Number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures#number_type
[MSDN-Rel-Path]: https://docs.microsoft.com/en-us/windows/desktop/FileIO/naming-a-file#fully-qualified-vs-relative-paths
[MSDN-Using-Streams]: https://docs.microsoft.com/en-us/windows/desktop/FileIO/using-streams
[命名文件、路径和命名空间]: https://docs.microsoft.com/en-us/windows/desktop/FileIO/naming-a-file
[`AHAFS`]: https://developer.ibm.com/articles/au-aix_event_infrastructure/
[`Buffer.byteLength`]: buffer.md#static-method-bufferbytelengthstring-encoding
[`FSEvents`]: https://developer.apple.com/documentation/coreservices/file_system_events
[`Number.MAX_SAFE_INTEGER`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
[`ReadDirectoryChangesW`]: https://docs.microsoft.com/en-us/windows/desktop/api/winbase/nf-winbase-readdirectorychangesw
[`UV_THREADPOOL_SIZE`]: cli.md#uv_threadpool_sizesize
[`event ports`]: https://illumos.org/man/port_create
[`filehandle.createReadStream()`]: #filehandlecreatereadstreamoptions
[`filehandle.createWriteStream()`]: #filehandlecreatereadstreamoptions
[`filehandle.pull()`]: #filehandlepulltransforms-options
[`filehandle.writeFile()`]: #filehandlewritefiledata-options
[`fs.access()`]: #fsaccesspath-mode-callback
[`fs.accessSync()`]: #fsaccesssyncpath-mode
[`fs.chmod()`]: #fschmodpath-mode-callback
[`fs.chown()`]: #fschownpath-uid-gid-callback
[`fs.copyFile()`]: #fscopyfilesrc-dest-mode-callback
[`fs.copyFileSync()`]: #fscopyfilesyncsrc-dest-mode
[`fs.createReadStream()`]: #fscreatereadstreampath-options
[`fs.createWriteStream()`]: #fscreatewritestreampath-options
[`fs.exists()`]: #fsexistspath-callback
[`fs.fstat()`]: #fsfstatfd-options-callback
[`fs.ftruncate()`]: #fsftruncatefd-len-callback
[`fs.futimes()`]: #fsfutimesfd-atime-mtime-callback
[`fs.lstat()`]: #fslstatpath-options-callback
[`fs.lutimes()`]: #fslutimespath-atime-mtime-callback
[`fs.mkdir()`]: #fsmkdirpath-options-callback
[`fs.mkdtemp()`]: #fsmk dtempprefix-options-callback
[`fs.open()`]: #fsopenpath-flags-mode-callback
[`fs.opendir()`]: #fsopendirpath-options-callback
[`fs.opendirSync()`]: #fsopendirsyncpath-options
[`fs.read()`]: #fsreadfd-buffer-offset-length-position-callback
[`fs.readFile()`]: #fsreadfilepath-options-callback
[`fs.readFileSync()`]: #fsreadfilesyncpath-options
[`fs.readdir()`]: #fsreaddirpath-options-callback
[`fs.readdirSync()`]: #fsreaddirsyncpath-options
[`fs.readv()`]: #fsreadvfd-buffers-position-callback
[`fs.realpath()`]: #fsrealpathpath-options-callback
[`fs.rm()`]: #fsrmpath-options-callback
[`fs.rmSync()`]: #fsrmsyncpath-options
[`fs.rmdir()`]: #fsrmdirpath-options-callback
[`fs.stat()`]: #fsstatpath-options-callback
[`fs.statfs()`]: #fsstatfspath-options-callback
[`fs.symlink()`]: #fssymlinktarget-path-type-callback
[`fs.utimes()`]: #fsutimespath-atime-mtime-callback
[`fs.watch()`]: #fswatchfilename-options-listener
[`fs.write(fd, buffer...)`]: #fswritefd-buffer-offset-length-position-callback
[`fs.write(fd, string...)`]: #fswritefd-string-position-encoding-callback
[`fs.writeFile()`]: #fswritefilefile-data-options-callback
[`fs.writev()`]: #fswritevfd-buffers-position-callback
[`fsPromises.access()`]: #fspromisesaccesspath-mode
[`fsPromises.copyFile()`]: #fspromisescopyfilesrc-dest-mode
[`fsPromises.mkdtemp()`]: #fspromisesmkdtempprefix-options
[`fsPromises.open()`]: #fspromisesopenpath-flags-mode
[`fsPromises.opendir()`]: #fspromisesopendirpath-options
[`fsPromises.rm()`]: #fspromisesrmpath-options
[`fsPromises.stat()`]: #fspromisesstatpath-options
[`fsPromises.utimes()`]: #fspromisesutimespath-atime-mtime
[`inotify(7)`]: https://man7.org/linux/man-pages/man7/inotify.7.html
[`kqueue(2)`]: https://www.freebsd.org/cgi/man.cgi?query=kqueue&sektion=2
[`minimatch`]: https://github.com/isaacs/minimatch
[`node:stream/iter`]: stream_iter.md
[`stream/iter pipeTo()`]: stream_iter.md#pipetosource-transforms-writer
[`stream/iter pull()`]: stream_iter.md#pullsource-transforms-options
[`stream/iter pullSync()`]: stream_iter.md#pullsyncsource-transforms
[`util.promisify()`]: util.md#utilpromisifyoriginal
[bigints]: https://tc39.github.io/proposal-bigint
[注意事项]: #caveats
[chcp]: https://ss64.com/nt/chcp.html
[inode]: https://en.wikipedia.org/wiki/Inode
[文件系统 `标志` 的支持]: #file-system-flags
