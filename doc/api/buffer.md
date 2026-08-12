# Buffer

<!--introduced_in=v0.1.90-->

> 稳定性：2 - 稳定

<!-- source_link=lib/buffer.js -->

`Buffer` 对象用于表示固定长度的字节序列。许多 Node.js API 支持 `Buffer`。

`Buffer` 类是 JavaScript 的 {Uint8Array} 类的子类，并使用涵盖额外用例的方法扩展了它。只要支持 `Buffer` 的地方，Node.js API 也接受普通的 {Uint8Array}。

虽然 `Buffer` 类在全局作用域内可用，但仍建议通过 import 或 require 语句显式引用它。

```mjs
import { Buffer } from 'node:buffer';

// 创建一个长度为 10 的零填充 Buffer。
const buf1 = Buffer.alloc(10);

// 创建一个长度为 10 的 Buffer，
// 填充的字节值均为 1。
const buf2 = Buffer.alloc(10, 1);

// 创建一个长度为 10 的未初始化缓冲区。
// 这比调用 Buffer.alloc() 更快，但返回的
// Buffer 实例可能包含需要使用 fill()、write() 或其他填充 Buffer
// 内容的函数覆盖的旧数据。
const buf3 = Buffer.allocUnsafe(10);

// 创建一个包含字节 [1, 2, 3] 的 Buffer。
const buf4 = Buffer.from([1, 2, 3]);

// 创建一个包含字节 [1, 1, 1, 1] 的 Buffer – 条目
// 均通过 `(value & 255)` 截断，以适应 0–255 范围。
const buf5 = Buffer.from([257, 257.5, -255, '1']);

// 创建一个包含字符串 'tést' 的 UTF-8 编码字节的 Buffer：
// [0x74, 0xc3, 0xa9, 0x73, 0x74] (十六进制表示法)
// [116, 195, 169, 115, 116] (十进制表示法)
const buf6 = Buffer.from('tést');

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf7 = Buffer.from('tést', 'latin1');
```

```cjs
const { Buffer } = require('node:buffer');

// 创建一个长度为 10 的零填充 Buffer。
const buf1 = Buffer.alloc(10);

// 创建一个长度为 10 的 Buffer，
// 填充的字节值均为 1。
const buf2 = Buffer.alloc(10, 1);

// 创建一个长度为 10 的未初始化缓冲区。
// 这比调用 Buffer.alloc() 更快，但返回的
// Buffer 实例可能包含需要使用 fill()、write() 或其他填充 Buffer
// 内容的函数覆盖的旧数据。
const buf3 = Buffer.allocUnsafe(10);

// 创建一个包含字节 [1, 2, 3] 的 Buffer。
const buf4 = Buffer.from([1, 2, 3]);

// 创建一个包含字节 [1, 1, 1, 1] 的 Buffer – 条目
// 均通过 `(value & 255)` 截断，以适应 0–255 范围。
const buf5 = Buffer.from([257, 257.5, -255, '1']);

// 创建一个包含字符串 'tést' 的 UTF-8 编码字节的 Buffer：
// [0x74, 0xc3, 0xa9, 0x73, 0x74] (十六进制表示法)
// [116, 195, 169, 115, 116] (十进制表示法)
const buf6 = Buffer.from('tést');

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf7 = Buffer.from('tést', 'latin1');
```

## Buffer 与字符编码

<!-- YAML
changes:
  - version:
      - v15.7.0
      - v14.18.0
    pr-url: https://github.com/nodejs/node/pull/36952
    description: "引入了 `base64url` 编码。"
  - version: v6.4.0
    pr-url: https://github.com/nodejs/node/pull/7111
    description: "引入了 `latin1` 作为 `binary` 的别名。"
  - version: v5.0.0
    pr-url: https://github.com/nodejs/node/pull/2859
    description: "移除了已弃用的 `raw` 和 `raws` 编码。"
-->

在 `Buffer` 和字符串之间转换时，可以指定字符编码。如果未指定字符编码，将使用 UTF-8 作为默认值。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from('hello world', 'utf8');

console.log(buf.toString('hex'));
// 打印：68656c6c6f20776f726c64
console.log(buf.toString('base64'));
// 打印：aGVsbG8gd29ybGQ=

console.log(Buffer.from('fhqwhgads', 'utf8'));
// 打印：<Buffer 66 68 71 77 68 67 61 64 73>
console.log(Buffer.from('fhqwhgads', 'utf16le'));
// 打印：<Buffer 66 00 68 00 71 00 77 00 68 00 67 00 61 00 64 00 73 00>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from('hello world', 'utf8');

console.log(buf.toString('hex'));
// 打印：68656c6c6f20776f726c64
console.log(buf.toString('base64'));
// 打印：aGVsbG8gd29ybGQ=

console.log(Buffer.from('fhqwhgads', 'utf8'));
// 打印：<Buffer 66 68 71 77 68 67 61 64 73>
console.log(Buffer.from('fhqwhgads', 'utf16le'));
// 打印：<Buffer 66 00 68 00 71 00 77 00 68 00 67 00 61 00 64 00 73 00>
```

Node.js buffer 接受它们接收到的编码字符串的所有大小写变体。例如，UTF-8 可以指定为 `'utf8'`、`'UTF8'` 或 `'uTf8'`。

Node.js 当前支持的字符编码如下：

* `'utf8'`（别名：`'utf-8'`）：多字节编码的 Unicode 字符。许多网页和其他文档格式使用 [UTF-8][]。这是默认字符编码。当将 `Buffer` 解码为不包含有效 UTF-8 数据的字符串时，将使用 Unicode 替换字符 `U+FFFD`  来表示这些错误。

* `'utf16le'`（别名：`'utf-16le'`）：多字节编码的 Unicode 字符。与 `'utf8'` 不同，字符串中的每个字符将使用 2 或 4 字节进行编码。Node.js 仅支持 [UTF-16][] 的 [小端序][endianness] 变体。

* `'latin1'`：Latin-1 代表 [ISO-8859-1][]。此字符编码仅支持 `U+0000` 到 `U+00FF` 的 Unicode 字符。每个字符使用单个字节编码。不适合该范围的字符将被截断并映射到该范围内的字符。

使用上述方法之一将 `Buffer` 转换为字符串称为解码，将字符串转换为 `Buffer` 称为编码。

Node.js 还支持以下二进制到文本的编码。对于二进制到文本的编码，命名约定是相反的：将 `Buffer` 转换为字符串通常称为编码，将字符串转换为 `Buffer` 称为解码。

* `'base64'`：[Base64][] 编码。当从字符串创建 `Buffer` 时，此编码还将正确接受 [RFC 4648, Section 5][] 中指定的"URL 和文件名安全字母表"。base64 编码字符串中包含的空格字符（如空格、制表符和换行符）将被忽略。

* `'base64url'`：[RFC 4648, Section 5][] 中指定的 [base64url][] 编码。当从字符串创建 `Buffer` 时，此编码还将正确接受常规 base64 编码的字符串。当将 `Buffer` 编码为字符串时，此编码将省略填充。

* `'hex'`：将每个字节编码为两个十六进制字符。当解码不完全由偶数个十六进制字符组成的字符串时，可能会发生数据截断。参见下面的示例。

还支持以下遗留字符编码：

* `'ascii'`：仅用于 7 位 [ASCII][] 数据。当将字符串编码为 `Buffer` 时，这等同于使用 `'latin1'`。当将 `Buffer` 解码为字符串时，使用此编码将在作为 `'latin1'` 解码之前额外取消设置每个字节的最高位。通常，没有理由使用此编码，因为 `'utf8'`（或者，如果已知数据始终仅为 ASCII，则 `'latin1'`）在编码或解码仅 ASCII 文本时将是更好的选择。它仅提供用于遗留兼容性。

* `'binary'`：`'latin1'` 的别名。此编码的名称可能具有误导性，因为此处列出的所有编码都在字符串和二进制数据之间转换。对于字符串和 `Buffer` 之间的转换，通常 `'utf8'` 是正确的选择。

* `'ucs2'`、`'ucs-2'`：`'utf16le'` 的别名。UCS-2 曾经指代不支持码点大于 U+FFFF 的字符的 UTF-16 变体。在 Node.js 中，始终支持这些码点。

```mjs
import { Buffer } from 'node:buffer';

Buffer.from('1ag123', 'hex');
// 打印 <Buffer 1a>，当遇到第一个非十六进制值 ('g') 时数据被截断。

Buffer.from('1a7', 'hex');
// 打印 <Buffer 1a>，当数据以单个数字 ('7') 结束时数据被截断。

Buffer.from('1634', 'hex');
// 打印 <Buffer 16 34>，所有数据均已表示。
```

```cjs
const { Buffer } = require('node:buffer');

Buffer.from('1ag123', 'hex');
// 打印 <Buffer 1a>，当遇到第一个非十六进制值 ('g') 时数据被截断。

Buffer.from('1a7', 'hex');
// 打印 <Buffer 1a>，当数据以单个数字 ('7') 结束时数据被截断。

Buffer.from('1634', 'hex');
// 打印 <Buffer 16 34>，所有数据均已表示。
```

现代 Web 浏览器遵循 [WHATWG 编码标准][]，它将 `'latin1'` 和 `'ISO-8859-1'` 都别名为 `'win-1252'`。这意味着虽然在做类似 `http.get()` 的事情时，如果返回的字符集是 WHATWG 规范中列出的其中之一，服务器实际上可能返回了 `'win-1252'` 编码的数据，使用 `'latin1'` 编码可能会错误地解码字符。

## Buffer 与 TypedArray

<!-- YAML
changes:
  - version: v3.0.0
    pr-url: https://github.com/nodejs/node/pull/2002
    description: "Buffer 类现在继承自 `Uint8Array`。"
-->

`Buffer` 实例也是 JavaScript {Uint8Array} 和 {TypedArray} 实例。所有 {TypedArray} 方法和属性在 `Buffer` 上都可用。但是，`Buffer` API 和 {TypedArray} API 之间存在细微的不兼容性。

特别是：

* 虽然 [`TypedArray.prototype.slice()`][] 创建 TypedArray 部分的副本，[`Buffer.prototype.slice()`][`buf.slice()`] 创建现有 `Buffer` 的视图而不复制。这种行为可能令人惊讶，且仅出于遗留兼容性存在。[`TypedArray.prototype.subarray()`][] 可用于在 `Buffer` 和其他 `TypedArray` 上实现 [`Buffer.prototype.slice()`][`buf.slice()`] 的行为，且应优先使用。
* [`buf.toString()`][] 与其 `TypedArray` 等效方法不兼容。
* 许多方法，例如 [`buf.indexOf()`][]，支持额外的参数。

有两种方法可以从 `Buffer` 创建新的 {TypedArray} 实例：

* 将 `Buffer` 传递给 {TypedArray} 构造函数将复制 `Buffer` 的内容，解释为整数数组，而不是目标类型的字节序列。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from([1, 2, 3, 4]);
const uint32array = new Uint32Array(buf);

console.log(uint32array);

// 输出：Uint32Array(4) [ 1, 2, 3, 4 ]
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from([1, 2, 3, 4]);
const uint32array = new Uint32Array(buf);

console.log(uint32array);

// 输出：Uint32Array(4) [ 1, 2, 3, 4 ]
```

* 传递 `Buffer` 底层的 {ArrayBuffer} 将创建一个与 `Buffer` 共享内存的 {TypedArray}。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from('hello', 'utf16le');
const uint16array = new Uint16Array(
  buf.buffer,
  buf.byteOffset,
  buf.length / Uint16Array.BYTES_PER_ELEMENT);

console.log(uint16array);

// 输出：Uint16Array(5) [ 104, 101, 108, 108, 111 ]
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from('hello', 'utf16le');
const uint16array = new Uint16Array(
  buf.buffer,
  buf.byteOffset,
  buf.length / Uint16Array.BYTES_PER_ELEMENT);

console.log(uint16array);

// 输出：Uint16Array(5) [ 104, 101, 108, 108, 111 ]
```

可以通过相同方式使用 `TypedArray` 对象的 `.buffer` 属性创建一个与 {TypedArray} 实例共享相同分配内存的新 `Buffer`。[`Buffer.from()`][`Buffer.from(arrayBuf)`] 在此上下文中行为类似于 `new Uint8Array()`。

```mjs
import { Buffer } from 'node:buffer';

const arr = new Uint16Array(2);

arr[0] = 5000;
arr[1] = 4000;

// 复制 arr 的内容。
const buf1 = Buffer.from(arr);

// 与 arr 共享内存。
const buf2 = Buffer.from(arr.buffer);

console.log(buf1);
// 输出：<Buffer 88 a0>
console.log(buf2);
// 输出：<Buffer 88 13 a0 0f>

arr[1] = 6000;

console.log(buf1);
// 输出：<Buffer 88 a0>
console.log(buf2);
// 输出：<Buffer 88 13 70 17>
```

```cjs
const { Buffer } = require('node:buffer');

const arr = new Uint16Array(2);

arr[0] = 5000;
arr[1] = 4000;

// 复制 arr 的内容。
const buf1 = Buffer.from(arr);

// 与 arr 共享内存。
const buf2 = Buffer.from(arr.buffer);

console.log(buf1);
// 输出：<Buffer 88 a0>
console.log(buf2);
// 输出：<Buffer 88 13 a0 0f>

arr[1] = 6000;

console.log(buf1);
// 输出：<Buffer 88 a0>
console.log(buf2);
// 输出：<Buffer 88 13 70 17>
```

使用 {TypedArray} 的 `.buffer` 创建 `Buffer` 时，可以通过传入 `byteOffset` 和 `length` 参数只使用底层 {ArrayBuffer} 的一部分。

```mjs
import { Buffer } from 'node:buffer';

const arr = new Uint16Array(20);
const buf = Buffer.from(arr.buffer, 0, 16);

console.log(buf.length);
// 输出：16
```

```cjs
const { Buffer } = require('node:buffer');

const arr = new Uint16Array(20);
const buf = Buffer.from(arr.buffer, 0, 16);

console.log(buf.length);
// 输出：16
```

`Buffer.from()` 和 [`TypedArray.from()`][] 具有不同的签名和实现。具体来说，{TypedArray} 变体接受第二个参数，这是一个映射函数，在类型化数组的每个元素上调用：

* [`TypedArray.from(source[, mapFn[, thisArg]])`][`TypedArray.from()`]

但是，`Buffer.from()` 方法不支持使用映射函数：

* [`Buffer.from(array`][]
* [`Buffer.from(buffer)`][]
* [`Buffer.from(arrayBuffer[, byteOffset[, length]])`][`Buffer.from(arrayBuf)`]
* [`Buffer.from(string[, encoding])`][`Buffer.from(string)`]

### Buffer 方法可与 Uint8Array 实例一起调用

Buffer 原型上的所有方法都可以与 `Uint8Array` 实例一起调用。

```js
const { toString, write } = Buffer.prototype;

const uint8array = new Uint8Array(5);

write.call(uint8array, 'hello', 0, 5, 'utf8'); // 5
// <Uint8Array 68 65 6c 6c 6f>

toString.call(uint8array, 'utf8'); // 'hello'
```

## Buffer 和迭代

`Buffer` 实例可以使用 `for..of` 语法进行迭代：

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from([1, 2, 3]);

for (const b of buf) {
  console.log(b);
}
// 输出：
//   1
//   2
//   3
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from([1, 2, 3]);

for (const b of buf) {
  console.log(b);
}
// 输出：
//   1
//   2
//   3
```

此外，[`buf.values()`][]、[`buf.keys()`][] 和
[`buf.entries()`][] 方法可用于创建迭代器。

## 类：`Blob`

<!-- YAML
added:
  - v15.7.0
  - v14.18.0
changes:
  - version:
    - v18.0.0
    - v16.17.0
    pr-url: https://github.com/nodejs/node/pull/41270
    description: 不再是实验性的。
-->

{Blob} 封装了不可变的原始数据，可以安全地在多个工作线程之间共享。

### `new buffer.Blob([sources[, options]])`

<!-- YAML
added:
  - v15.7.0
  - v14.18.0
changes:
  - version: v16.7.0
    pr-url: https://github.com/nodejs/node/pull/39708
    description: "添加了标准的 `endings` 选项以替换行尾，并移除了非标准的 `encoding` 选项。"
-->

* `sources` {string\[]|ArrayBuffer\[]|TypedArray\[]|DataView\[]|Blob\[]} 一个
  字符串、{ArrayBuffer}、{TypedArray}、{DataView} 或 {Blob} 对象的数组，
  或此类对象的任何混合，它们将被存储在 `Blob` 中。
* `options` {Object}
  * `endings` {string} `'transparent'` 或 `'native'` 之一。当设置
    为 `'native'` 时，字符串源部分中的行尾将转换为
    由 `require('node:os').EOL` 指定的平台原生行尾。
  * `type` {string} Blob 内容类型。`type` 的目的是传达
    数据的 MIME 媒体类型，但不执行类型格式的验证。

创建一个新的 `Blob` 对象，包含给定源的连接。

{ArrayBuffer}、{TypedArray}、{DataView} 和 {Buffer} 源被复制到
'Blob' 中，因此可以在创建 'Blob' 后安全地修改它们。

字符串源被编码为 UTF-8 字节序列并复制到 Blob 中。
每个字符串部分中不匹配的代理对将被 Unicode
U+FFFD 替换字符替换。

### `blob.arrayBuffer()`

<!-- YAML
added:
  - v15.7.0
  - v14.18.0
-->

* 返回：{Promise}

返回一个 promise，该 promise 履行时包含 `Blob` 数据副本的 {ArrayBuffer}。

### `blob.bytes()`

<!-- YAML
added:
  - v22.3.0
  - v20.16.0
-->

`blob.bytes()` 方法将 `Blob` 对象的字节作为 `Promise<Uint8Array>` 返回。

```js
const blob = new Blob(['hello']);
blob.bytes().then((bytes) => {
  console.log(bytes); // 输出：Uint8Array(5) [ 104, 101, 108, 108, 111 ]
});
```

### 大小

<!-- YAML
added:
  - v15.7.0
  - v14.18.0
-->

`Blob` 的总大小（以字节为单位）。

### 切片

<!-- YAML
added:
  - v15.7.0
  - v14.18.0
-->

* `start` {number} 起始索引。
* `end` {number} 结束索引。
* `type` {string} 新 `Blob` 的内容类型

创建并返回一个新的 `Blob`，包含此 `Blob` 对象
数据的子集。原始 `Blob` 不会被更改。

### 流

<!-- YAML
added: v16.7.0
-->

* 返回：{ReadableStream}

返回一个新的 `ReadableStream`，允许读取 `Blob` 的内容。

### 文本

<!-- YAML
added:
  - v15.7.0
  - v14.18.0
-->

* 返回：{Promise}

返回一个 promise，该 promise 履行时包含解码为
UTF-8 字符串的 `Blob` 内容。

### 流文本

<!-- YAML
added:
 - v26.5.0
 - v24.19.0
-->

* 返回：{ReadableStream}

返回一个新的 `ReadableStream`，允许将 `Blob` 的内容作为 UTF-8 解码字符串的流来读取。它等同于通过一个设置为 UTF-8 的 [`TextDecoderStream`][] 对 [`blob.stream()`][] 进行管道传输。

### 类型

<!-- YAML
added:
  - v15.7.0
  - v14.18.0
-->

* 类型：{string}

`Blob` 的内容类型。

### `Blob` 对象和 `MessageChannel`

一旦创建了 {Blob} 对象，就可以通过 `MessagePort` 发送到多个
目的地，而无需传输或立即复制数据。`Blob` 包含的数据仅在调用 `arrayBuffer()` 或 `text()`
方法时复制。

```mjs
import { Blob } from 'node:buffer';
import { setTimeout as delay } from 'node:timers/promises';

const blob = new Blob(['hello there']);

const mc1 = new MessageChannel();
const mc2 = new MessageChannel();

mc1.port1.onmessage = async ({ data }) => {
  console.log(await data.arrayBuffer());
  mc1.port1.close();
};

mc2.port1.onmessage = async ({ data }) => {
  await delay(1000);
  console.log(await data.arrayBuffer());
  mc2.port1.close();
};

mc1.port2.postMessage(blob);
mc2.port2.postMessage(blob);

// Blob 在发送后仍然可用。
blob.text().then(console.log);
```

```cjs
const { Blob } = require('node:buffer');
const { setTimeout: delay } = require('node:timers/promises');

const blob = new Blob(['hello there']);

const mc1 = new MessageChannel();
const mc2 = new MessageChannel();

mc1.port1.onmessage = async ({ data }) => {
  console.log(await data.arrayBuffer());
  mc1.port1.close();
};

mc2.port1.onmessage = async ({ data }) => {
  await delay(1000);
  console.log(await data.arrayBuffer());
  mc2.port1.close();
};

mc1.port2.postMessage(blob);
mc2.port2.postMessage(blob);

// Blob 在发送后仍然可用。
blob.text().then(console.log);
```

## 类：`Buffer`

`Buffer` 类是一个用于直接处理二进制数据的全局类型。
它可以通过多种方式构造。

### 静态方法：`Buffer.alloc(size[, fill[, encoding]])`

<!-- YAML
added: v5.10.0
changes:
  - version: v20.0.0
    pr-url: https://github.com/nodejs/node/pull/45796
    description: "对于无效的输入参数，抛出 ERR_INVALID_ARG_TYPE 或 ERR_OUT_OF_RANGE，而不是 ERR_INVALID_ARG_VALUE。"
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/34682
    description: 对于无效的输入参数，抛出 ERR_INVALID_ARG_VALUE，而不是 ERR_INVALID_OPT_VALUE。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18129
    description: 尝试用零长度 buffer 填充非零长度 buffer 会触发抛出的异常。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/17427
    description: "为 `fill` 指定无效的字符串会触发抛出的异常。"
  - version: v8.9.3
    pr-url: https://github.com/nodejs/node/pull/17428
    description: "为 `fill` 指定无效的字符串现在会导致零填充的 buffer。"
-->

* `size` {integer} 新 `Buffer` 所需的长度。
* `fill` {string|Buffer|Uint8Array|integer} 用于预填充新 `Buffer`
  的值。**默认值：** `0`。
* `encoding` {string} 如果 `fill` 是字符串，这是它的编码。
  **默认值：** `'utf8'`。
* 返回：{Buffer}

分配一个 `size` 字节的新 `Buffer`。如果 `fill` 是 `undefined`，
`Buffer` 将被零填充。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.alloc(5);

console.log(buf);
// 输出：<Buffer 00 00 00 00 00>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.alloc(5);

console.log(buf);
// 输出：<Buffer 00 00 00 00 00>
```

如果 `size` 大于
[`buffer.constants.MAX_LENGTH`][] 或小于 0，[`ERR_OUT_OF_RANGE`][]
将被抛出。

如果指定了 `fill`，分配的 `Buffer` 将通过调用
[`buf.fill(fill)`][`buf.fill()`] 进行初始化。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.alloc(5, 'a');

console.log(buf);
// 输出：<Buffer 61 61 61 61 61>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.alloc(5, 'a');

console.log(buf);
// 输出：<Buffer 61 61 61 61 61>
```

如果同时指定了 `fill` 和 `encoding`，分配的 `Buffer` 将通过调用 [`buf.fill(fill, encoding)`][`buf.fill()`] 进行初始化。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.alloc(11, 'aGVsbG8gd29ybGQ=', 'base64');

console.log(buf);
// 输出：<Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.alloc(11, 'aGVsbG8gd29ybGQ=', 'base64');

console.log(buf);
// 输出：<Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>
```

调用 [`Buffer.alloc()`][] 可能比替代方案
[`Buffer.allocUnsafe()`][] 明显更慢，但能确保新创建的 `Buffer` 实例
内容永远不会包含来自先前分配的敏感数据，包括
可能未为 `Buffer` 分配的数据。

如果 `size` 不是数字，将抛出 `TypeError`。

### 静态方法：`Buffer.allocUnsafe(size[, alignment])`

<!-- YAML
added: v5.10.0
changes:
  - version: REPLACEME
    pr-url: https://github.com/nodejs/node/pull/65003
    description: 添加 `alignment` 参数。
  - version: v20.0.0
    pr-url: https://github.com/nodejs/node/pull/45796
    description: "对于无效的输入参数，抛出 ERR_INVALID_ARG_TYPE 或 ERR_OUT_OF_RANGE 而不是ERR_INVALID_ARG_VALUE。"
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/34682
    description: 对于无效的输入参数，抛出 ERR_INVALID_ARG_VALUE 而不是 ERR_INVALID_OPT_VALUE。
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7079
    description: "传递负数 `size` 现在将抛出错误。"
-->

* `size` {integer} 新 `Buffer` 的所需长度。
* `alignment` {integer} 如果给定，新 `Buffer` 的底层内存将从一个为
  `alignment` 的倍数的地址开始。必须是一个不大于 `2 ** 30` 的
  二的幂。请参阅[对齐分配][]。
* 返回：{Buffer}

分配一个 `size` 字节的新 `Buffer`。如果 `size` 大于
[`buffer.constants.MAX_LENGTH`][] 或小于 0，[`ERR_OUT_OF_RANGE`][]
将被抛出。

以此方式创建的 `Buffer` 实例的底层内存_未
初始化_。新创建的 `Buffer` 的内容是未知的，
_可能包含敏感数据_。使用 [`Buffer.alloc()`][] 来用零初始化
`Buffer` 实例。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.allocUnsafe(10);

console.log(buf);
// 输出（内容可能不同）：<Buffer a0 8b 28 3f 01 00 00 00 50 32>

buf.fill(0);

console.log(buf);
// 输出：<Buffer 00 00 00 00 00 00 00 00 00 00>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.allocUnsafe(10);

console.log(buf);
// 输出（内容可能不同）：<Buffer a0 8b 28 3f 01 00 00 00 50 32>

buf.fill(0);

console.log(buf);
// 输出：<Buffer 00 00 00 00 00 00 00 00 00 00>
```

如果 `size` 不是数字，将抛出 `TypeError`。

`Buffer` 模块预分配了一个内部 `Buffer` 实例，
大小为 [`Buffer.poolSize`][]，用作快速分配新
`Buffer` 实例的池，这些实例是使用 [`Buffer.allocUnsafe()`][]、[`Buffer.from(array)`][]、
[`Buffer.from(string)`][] 和 [`Buffer.concat()`][] 创建的，仅当 `size` 小于
`Buffer.poolSize >>> 1`（[`Buffer.poolSize`][] 除以二的下取整）时。

使用这个预分配的内部内存池是
调用 `Buffer.alloc(size, fill)` 与 `Buffer.allocUnsafe(size).fill(fill)` 之间的关键区别。
具体来说，`Buffer.alloc(size, fill)` _永远不会_ 使用内部 `Buffer`
池，而 `Buffer.allocUnsafe(size).fill(fill)` _会_ 使用内部
`Buffer` 池，如果 `size` 小于或等于 [`Buffer.poolSize`][] 的一半。这
区别很微妙，但当应用程序需要
[`Buffer.allocUnsafe()`][] 提供的额外性能时可能很重要。

### 静态方法：`Buffer.allocUnsafeSlow(size[, alignment])`

<!-- YAML
added: v5.12.0
changes:
  - version: REPLACEME
    pr-url: https://github.com/nodejs/node/pull/65003
    description: Added the `alignment` argument.
  - version: v20.0.0
    pr-url: https://github.com/nodejs/node/pull/45796
    description: "对于无效的输入参数，抛出 ERR_INVALID_ARG_TYPE 或 ERR_OUT_OF_RANGE 而不是ERR_INVALID_ARG_VALUE。"
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/34682
    description: 对于无效的输入参数，抛出 ERR_INVALID_ARG_VALUE 而不是 ERR_INVALID_OPT_VALUE。
-->

* `size` {integer} 新 `Buffer` 的所需长度。
* `alignment` {integer} 如果给定，新 `Buffer` 的底层内存将从
  一个地址为 `alignment` 的倍数的位置开始。必须是一个不大于
  `2 ** 30` 的二的幂。参见[对齐分配][Aligned allocations]。
* 返回：{Buffer}

分配一个 `size` 字节的新 `Buffer`。如果 `size` 大于
[`buffer.constants.MAX_LENGTH`][] 或小于 0，[`ERR_OUT_OF_RANGE`][]
将被抛出。如果 `size` 为 0，则创建一个零长度的 `Buffer`。

以此方式创建的 `Buffer` 实例的底层内存_未
初始化_。新创建的 `Buffer` 的内容是未知的，
_可能包含敏感数据_。使用 [`buf.fill(0)`][`buf.fill()`] 来用零初始化
此类 `Buffer` 实例。

使用 [`Buffer.allocUnsafe()`][] 分配新的 `Buffer` 实例时，
小于 `Buffer.poolSize >>> 1` 的分配（默认使用 poolSize 时为 32KiB）会从单个预分配的
`Buffer` 中切片获得。这使应用程序能够避免创建许多单独分配的
`Buffer` 实例所带来的垃圾回收开销。通过消除跟踪和清理大量单独的
`ArrayBuffer` 对象的需要，这种方法同时提升了性能和内存使用效率。

但是，如果开发者可能需要保留池中一小块
内存不确定的时间，使用 `Buffer.allocUnsafeSlow()` 创建未池化的 `Buffer` 实例
然后复制出相关的位可能是合适的。

```mjs
import { Buffer } from 'node:buffer';

// 需要保留一些小块内存。
const store = [];

socket.on('readable', () => {
  let data;
  while (null !== (data = readable.read())) {
    // 为保留的数据分配。
    const sb = Buffer.allocUnsafeSlow(10);

    // 将数据复制到新分配中。
    data.copy(sb, 0, 0, 10);

    store.push(sb);
  }
});
```

```cjs
const { Buffer } = require('node:buffer');

// 需要保留一些小块内存。
const store = [];

socket.on('readable', () => {
  let data;
  while (null !== (data = readable.read())) {
    // 为保留的数据分配。
    const sb = Buffer.allocUnsafeSlow(10);

    // 将数据复制到新分配中。
    data.copy(sb, 0, 0, 10);

    store.push(sb);
  }
});
```

如果 `size` 不是数字，将抛出 `TypeError`。

### 静态方法：`Buffer.byteLength(string[, encoding])`

<!-- YAML
added: v0.1.90
changes:
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/8946
    description: 传递无效的输入现在将抛出错误。
  - version: v5.10.0
    pr-url: https://github.com/nodejs/node/pull/5255
    description: "`string` 参数现在可以是任何 `TypedArray`、`DataView`或 `ArrayBuffer`。"
-->

* `string` {string|Buffer|TypedArray|DataView|ArrayBuffer|SharedArrayBuffer} 一个
  用于计算长度的值。
* `encoding` {string} 如果 `string` 是字符串，这是它的编码。
  **默认值：** `'utf8'`。
* 返回：{integer} `string` 中包含的字节数。

返回使用 `encoding` 编码时字符串的字节长度。
这与 [`String.prototype.length`][] 不同，后者不考虑
用于将字符串转换为字节的编码。

对于 `'base64'`、`'base64url'` 和 `'hex'`，此函数假设输入有效。
对于包含非 base64/hex 编码数据（例如空格）的字符串，
返回值可能大于从字符串创建的 `Buffer` 的长度。

```mjs
import { Buffer } from 'node:buffer';

const str = '\u00bd + \u00bc = \u00be';

console.log(`${str}: ${str.length} characters, ` +
            `${Buffer.byteLength(str, 'utf8')} bytes`);
// 输出：½ + ¼ = ¾: 9 个字符，12 个字节
```

```cjs
const { Buffer } = require('node:buffer');

const str = '\u00bd + \u00bc = \u00be';

console.log(`${str}: ${str.length} characters, ` +
            `${Buffer.byteLength(str, 'utf8')} bytes`);
// 输出：½ + ¼ = ¾: 9 个字符，12 个字节
```

当 `string` 是 {Buffer|DataView|TypedArray|ArrayBuffer|SharedArrayBuffer} 时，
返回 `.byteLength` 报告的字节长度。

### 静态方法：`Buffer.compare(buf1, buf2)`

<!-- YAML
added: v0.11.13
changes:
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/10236
    description: "参数现在可以是 `Uint8Array`。"
-->

* `buf1` {Buffer|Uint8Array}
* `buf2` {Buffer|Uint8Array}
* 返回：{integer} `-1`、`0` 或 `1` 之一，取决于比较结果。详见 [`buf.compare()`][]。

比较 `buf1` 和 `buf2`，通常用于对 `Buffer` 实例数组进行排序。这等同于调用
[`buf1.compare(buf2)`][`buf.compare()`]。

```mjs
import { Buffer } from 'node:buffer';

const buf1 = Buffer.from('1234');
const buf2 = Buffer.from('0123');
const arr = [buf1, buf2];

console.log(arr.sort(Buffer.compare));
// 输出：[ <Buffer 30 31 32 33>, <Buffer 31 32 33 34> ]
// (此结果等于：[buf2, buf1]。)
```

```cjs
const { Buffer } = require('node:buffer');

const buf1 = Buffer.from('1234');
const buf2 = Buffer.from('0123');
const arr = [buf1, buf2];

console.log(arr.sort(Buffer.compare));
// 输出：[ <Buffer 30 31 32 33>, <Buffer 31 32 33 34> ]
// (此结果等于：[buf2, buf1]。)
```

### 静态方法：`Buffer.concat(list[, totalLength])`

<!-- YAML
added: v0.7.11
changes:
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/10236
    description: "`list` 的元素现在可以是 `Uint8Array`。"
-->

* `list` {Buffer\[] | Uint8Array\[]} 要连接的 `Buffer` 或 {Uint8Array}
  实例列表。
* `totalLength` {integer} `list` 中 `Buffer` 实例连接后的总长度。
* 返回：{Buffer}

返回一个新的 `Buffer`，它是连接 `list` 中所有 `Buffer`
实例的结果。

如果列表没有项，或者 `totalLength` 为 0，则返回一个新的零长度
`Buffer`。

如果未提供 `totalLength`，它是通过相加 `list` 中 `Buffer` 实例
的长度计算得出的。

如果提供了 `totalLength`，它必须是无符号整数。如果
`list` 中 `Buffer` 的组合长度超过 `totalLength`，结果将被
截断为 `totalLength`。如果 `list` 中 `Buffer` 的组合长度
小于 `totalLength`，剩余空间将填充零。

```mjs
import { Buffer } from 'node:buffer';

// 从三个 `Buffer` 实例的列表创建单个 `Buffer`。

const buf1 = Buffer.alloc(10);
const buf2 = Buffer.alloc(14);
const buf3 = Buffer.alloc(18);
const totalLength = buf1.length + buf2.length + buf3.length;

console.log(totalLength);
// 输出：42

const bufA = Buffer.concat([buf1, buf2, buf3], totalLength);

console.log(bufA);
// 输出：<Buffer 00 00 00 00 ...>
console.log(bufA.length);
// 输出：42
```

```cjs
const { Buffer } = require('node:buffer');

// 从三个 `Buffer` 实例的列表创建单个 `Buffer`。

const buf1 = Buffer.alloc(10);
const buf2 = Buffer.alloc(14);
const buf3 = Buffer.alloc(18);
const totalLength = buf1.length + buf2.length + buf3.length;

console.log(totalLength);
// 输出：42

const bufA = Buffer.concat([buf1, buf2, buf3], totalLength);

console.log(bufA);
// 输出：<Buffer 00 00 00 00 ...>
console.log(bufA.length);
// 输出：42
```

`Buffer.concat()` 也可能像
[`Buffer.allocUnsafe()`][] 一样使用内部 `Buffer` 池。

### 静态方法：`Buffer.copyBytesFrom(view[, offset[, length]])`

<!-- YAML
added:
 - v19.8.0
 - v18.16.0
-->

* `view` {TypedArray} 要复制的 {TypedArray}。
* `offset` {integer} `view` 内的起始偏移量。**默认值：** `0`。
* `length` {integer} 要从 `view` 复制的元素数量。
  **默认值：** `view.length - offset`。
* 返回：{Buffer}

将 `view` 的底层内存复制到新的 `Buffer` 中。

```js
const u16 = new Uint16Array([0, 0xffff]);
const buf = Buffer.copyBytesFrom(u16, 1, 1);
u16[1] = 0;
console.log(buf.length); // 2
console.log(buf[0]); // 255
console.log(buf[1]); // 255
```

### 静态方法：`Buffer.from(array)`

<!-- YAML
added: v5.10.0
-->

* `array` {integer\[]}
* 返回：{Buffer}

使用范围在 `0` – `255` 的字节 `array` 分配一个新的 `Buffer`。
超出该范围的数组条目将被截断以适应。

```mjs
import { Buffer } from 'node:buffer';

// 创建一个新的 Buffer，包含字符串 'buffer' 的 UTF-8 字节。
const buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
```

```cjs
const { Buffer } = require('node:buffer');

// 创建一个新的 Buffer，包含字符串 'buffer' 的 UTF-8 字节。
const buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
```

如果 `array` 是类 `Array` 对象（即，具有 `number` 类型的 `length` 属性），
除非它是 `Buffer` 或
`Uint8Array`，否则它被视为数组。这意味着所有其他 `TypedArray` 变体都被视为
`Array`。要从 `TypedArray` 支持的字节创建 `Buffer`，使用
[`Buffer.copyBytesFrom()`][]。

如果 `array` 不是 `Array` 或适用于 `Buffer.from()` 变体的其他类型，
将抛出 `TypeError`。

`Buffer.from(array)` 和 [`Buffer.from(string)`][] 也可能像 [`Buffer.allocUnsafe()`][] 一样使用内部
`Buffer` 池。

### 静态方法：`Buffer.from(arrayBuffer[, byteOffset[, length]])`

<!-- YAML
added: v5.10.0
-->

* `arrayBuffer` {ArrayBuffer|SharedArrayBuffer} 一个 {ArrayBuffer}、
  {SharedArrayBuffer}，例如 {TypedArray} 的 `.buffer` 属性。
* `byteOffset` {integer} 要暴露的第一个字节的索引。**默认值：** `0`。
* `length` {integer} 要暴露的字节数。
  **默认值：** `arrayBuffer.byteLength - byteOffset`。
* 返回：{Buffer}

这会创建 {ArrayBuffer} 的视图，而不会复制底层
内存。例如，当传递 {TypedArray} 实例的 `.buffer` 属性的引用时，新创建的 `Buffer` 将与 {TypedArray} 的底层 `ArrayBuffer` 共享相同的
分配内存。

```mjs
import { Buffer } from 'node:buffer';

const arr = new Uint16Array(2);

arr[0] = 5000;
arr[1] = 4000;

// 与 `arr` 共享内存。
const buf = Buffer.from(arr.buffer);

console.log(buf);
// 输出：<Buffer 88 13 a0 0f>

// 更改原始 Uint16Array 也会更改 Buffer。
arr[1] = 6000;

console.log(buf);
// 输出：<Buffer 88 13 70 17>
```

```cjs
const { Buffer } = require('node:buffer');

const arr = new Uint16Array(2);

arr[0] = 5000;
arr[1] = 4000;

// 与 `arr` 共享内存。
const buf = Buffer.from(arr.buffer);

console.log(buf);
// 输出：<Buffer 88 13 a0 0f>

// 更改原始 Uint16Array 也会更改 Buffer。
arr[1] = 6000;

console.log(buf);
// 输出：<Buffer 88 13 70 17>
```

可选的 `byteOffset` 和 `length` 参数指定 `arrayBuffer` 内将由 `Buffer` 共享的内存范围。

```mjs
import { Buffer } from 'node:buffer';

const ab = new ArrayBuffer(10);
const buf = Buffer.from(ab, 0, 2);

console.log(buf.length);
// 输出：2
```

```cjs
const { Buffer } = require('node:buffer');

const ab = new ArrayBuffer(10);
const buf = Buffer.from(ab, 0, 2);

console.log(buf.length);
// 输出：2
```

如果 `arrayBuffer` 不是 {ArrayBuffer} 或
{SharedArrayBuffer} 或适用于 `Buffer.from()`
变体的其他类型，将抛出 `TypeError`。

重要的是要记住，底层的 `ArrayBuffer` 可以覆盖
超出 `TypedArray` 视图边界的内存范围。使用 `TypedArray` 的 `buffer` 属性创建的新
`Buffer` 可能超出 `TypedArray` 的范围：

```mjs
import { Buffer } from 'node:buffer';

const arrA = Uint8Array.from([0x63, 0x64, 0x65, 0x66]); // 4 个元素
const arrB = new Uint8Array(arrA.buffer, 1, 2); // 2 个元素
console.log(arrA.buffer === arrB.buffer); // true

const buf = Buffer.from(arrB.buffer);
console.log(buf);
// 输出：<Buffer 63 64 65 66>
```

```cjs
const { Buffer } = require('node:buffer');

const arrA = Uint8Array.from([0x63, 0x64, 0x65, 0x66]); // 4 个元素
const arrB = new Uint8Array(arrA.buffer, 1, 2); // 2 个元素
console.log(arrA.buffer === arrB.buffer); // true

const buf = Buffer.from(arrB.buffer);
console.log(buf);
// 输出：<Buffer 63 64 65 66>
```

### 静态方法：`Buffer.from(buffer)`

<!-- YAML
added: v5.10.0
-->

* `buffer` {Buffer|Uint8Array} 现有的 `Buffer` 或 {Uint8Array}，从中
  复制数据。
* 返回：{Buffer}

将传入的 `buffer` 数据复制到新的 `Buffer` 实例。

```mjs
import { Buffer } from 'node:buffer';

const buf1 = Buffer.from('buffer');
const buf2 = Buffer.from(buf1);

buf1[0] = 0x61;

console.log(buf1.toString());
// 输出：auffer
console.log(buf2.toString());
// 输出：buffer
```

```cjs
const { Buffer } = require('node:buffer');

const buf1 = Buffer.from('buffer');
const buf2 = Buffer.from(buf1);

buf1[0] = 0x61;

console.log(buf1.toString());
// 输出：auffer
console.log(buf2.toString());
// 输出：buffer
```

如果 `buffer` 不是 `Buffer` 或适用于 `Buffer.from()` 变体的其他类型，
将抛出 `TypeError`。

### 静态方法：`Buffer.from(object[, offsetOrEncoding[, length]])`

<!-- YAML
added: v8.2.0
-->

* `object` {Object} 支持 `Symbol.toPrimitive` 或 `valueOf()` 的对象。
* `offsetOrEncoding` {integer|string} 字节偏移量或编码。
* `length` {integer} 长度。
* 返回：{Buffer}

对于 `valueOf()` 函数返回值不严格等于
`object` 的对象，返回 `Buffer.from(object.valueOf(), offsetOrEncoding, length)`。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from(new String('this is a test'));
// 输出：<Buffer 74 68 69 73 20 69 73 20 61 20 74 65 73 74>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from(new String('this is a test'));
// 输出：<Buffer 74 68 69 73 20 69 73 20 61 20 74 65 73 74>
```

对于支持 `Symbol.toPrimitive` 的对象，返回
`Buffer.from(object[Symbol.toPrimitive]('string'), offsetOrEncoding)`。

```mjs
import { Buffer } from 'node:buffer';

class Foo {
  [Symbol.toPrimitive]() {
    return 'this is a test';
  }
}

const buf = Buffer.from(new Foo(), 'utf8');
// 输出：<Buffer 74 68 69 73 20 69 73 20 61 20 74 65 73 74>
```

```cjs
const { Buffer } = require('node:buffer');

class Foo {
  [Symbol.toPrimitive]() {
    return 'this is a test';
  }
}

const buf = Buffer.from(new Foo(), 'utf8');
// 输出：<Buffer 74 68 69 73 20 69 73 20 61 20 74 65 73 74>
```

如果 `object` 没有提到的方法或
不是适用于 `Buffer.from()` 变体的其他类型，
将抛出 `TypeError`。

### 静态方法：`Buffer.from(string[, encoding])`

<!-- YAML
added: v5.10.0
-->

* `string` {string} 要编码的字符串。
* `encoding` {string} `string` 的编码。**默认值：** `'utf8'`。
* 返回：{Buffer}

创建一个新的包含 `string` 的 `Buffer`。`encoding` 参数标识
将 `string` 转换为字节时使用的字符编码。

```mjs
import { Buffer } from 'node:buffer';

const buf1 = Buffer.from('this is a tést');
const buf2 = Buffer.from('7468697320697320612074c3a97374', 'hex');

console.log(buf1.toString());
// 输出：this is a tést
console.log(buf2.toString());
// 输出：this is a tést
console.log(buf1.toString('latin1'));
// 输出：this is a tÃ©st
```

```cjs
const { Buffer } = require('node:buffer');

const buf1 = Buffer.from('this is a tést');
const buf2 = Buffer.from('7468697320697320612074c3a97374', 'hex');

console.log(buf1.toString());
// 输出：this is a tést
console.log(buf2.toString());
// 输出：this is a tést
console.log(buf1.toString('latin1'));
// 输出：this is a tÃ©st
```

如果 `string` 不是字符串或适用于 `Buffer.from()` 变体的其他类型，
将抛出 `TypeError`。

[`Buffer.from(string)`][] 也可能像
[`Buffer.allocUnsafe()`][] 一样使用内部 `Buffer` 池。

### 静态方法：`Buffer.isBuffer(obj)`

<!-- YAML
added: v0.1.101
-->

* `obj` {Object}
* 返回：{boolean}

如果 `obj` 是 `Buffer`，则返回 `true`，否则返回 `false`。

```mjs
import { Buffer } from 'node:buffer';

Buffer.isBuffer(Buffer.alloc(10)); // 真
Buffer.isBuffer(Buffer.from('foo')); // 真
Buffer.isBuffer('a string'); // 假
Buffer.isBuffer([]); // 假
Buffer.isBuffer(new Uint8Array(1024)); // 假
```

```cjs
const { Buffer } = require('node:buffer');

Buffer.isBuffer(Buffer.alloc(10)); // 真
Buffer.isBuffer(Buffer.from('foo')); // 真
Buffer.isBuffer('a string'); // 真
Buffer.isBuffer([]); // 假
Buffer.isBuffer(new Uint8Array(1024)); // 假
```

### 静态方法：`Buffer.isEncoding(encoding)`

<!-- YAML
added: v0.9.1
-->

* `encoding` {string} 要检查的字符编码名称。
* 返回：{boolean}

如果 `encoding` 是受支持的字符编码名称，则返回 `true`，
否则返回 `false`。

```mjs
import { Buffer } from 'node:buffer';

console.log(Buffer.isEncoding('utf8'));
// 输出：true

console.log(Buffer.isEncoding('hex'));
// 输出：true

console.log(Buffer.isEncoding('utf/8'));
// 输出：false

console.log(Buffer.isEncoding(''));
// 输出：false
```

```cjs
const { Buffer } = require('node:buffer');

console.log(Buffer.isEncoding('utf8'));
// 输出：true

console.log(Buffer.isEncoding('hex'));
// 输出：true

console.log(Buffer.isEncoding('utf/8'));
// 输出：false

console.log(Buffer.isEncoding(''));
// 输出：false
```

### 16 位整数数组

<!-- YAML
added: v0.11.3
changes:
  - version:
    - v26.3.0
    - v24.18.0
    pr-url: https://github.com/nodejs/node/pull/63597
    description: 默认值已从 8192 提高到 65536。
-->

* 类型：{integer} **默认值：** `65536`

这是用于池化的预分配内部 `Buffer` 实例的大小（以字节为单位）。此值可以被修改。

### 索引运算符

* `index` {integer}

索引运算符 `[index]` 可用于获取和设置 `buf` 中位置
`index` 处的字节。值指单个字节，因此合法值
范围在 `0x00` 和 `0xFF`（十六进制）或 `0` 和 `255`（十进制）之间。

此运算符继承自 `Uint8Array`，因此其越界
访问的行为与 `Uint8Array` 相同。换句话说，当 `index` 为负数或大于或等于 `buf.length` 时，`buf[index]` 返回
`undefined`，如果 `index` 为负数或
`>= buf.length`，`buf[index] = value` 不会修改 buffer。

```mjs
import { Buffer } from 'node:buffer';

// 一次一个字节地将 ASCII 字符串复制到 `Buffer` 中。
// （这仅适用于仅 ASCII 的字符串。通常，应该使用
// `Buffer.from()` 来执行此转换。）

const str = 'Node.js';
const buf = Buffer.allocUnsafe(str.length);

for (let i = 0; i < str.length; i++) {
  buf[i] = str.charCodeAt(i);
}

console.log(buf.toString('utf8'));
// 输出：Node.js
```

```cjs
const { Buffer } = require('node:buffer');

// 一次一个字节地将 ASCII 字符串复制到 `Buffer` 中。
// （这仅适用于仅 ASCII 的字符串。通常，应该使用
// `Buffer.from()` 来执行此转换。）

const str = 'Node.js';
const buf = Buffer.allocUnsafe(str.length);

for (let i = 0; i < str.length; i++) {
  buf[i] = str.charCodeAt(i);
}

console.log(buf.toString('utf8'));
// 输出：Node.js
```

### `buf.buffer`

* 类型：{ArrayBuffer} 基于此 `Buffer`
  对象创建的底层 `ArrayBuffer` 对象。

此 `ArrayBuffer` 不保证与原始
`Buffer` 完全对应。详见 `buf.byteOffset` 的说明。

```mjs
import { Buffer } from 'node:buffer';

const arrayBuffer = new ArrayBuffer(16);
const buffer = Buffer.from(arrayBuffer);

console.log(buffer.buffer === arrayBuffer);
// 输出：true
```

```cjs
const { Buffer } = require('node:buffer');

const arrayBuffer = new ArrayBuffer(16);
const buffer = Buffer.from(arrayBuffer);

console.log(buffer.buffer === arrayBuffer);
// 输出：true
```

### `buf.byteOffset`

* 类型：{integer} `Buffer` 底层 `ArrayBuffer` 对象的 `byteOffset`。

当在 `Buffer.from(ArrayBuffer, byteOffset, length)` 中设置 `byteOffset` 时，
或者有时当分配小于 `Buffer.poolSize` 的 `Buffer` 时，
缓冲区不会从底层 `ArrayBuffer` 的零偏移开始。

当直接使用 `buf.buffer` 访问底层 `ArrayBuffer` 时，这
可能会导致问题，因为 `ArrayBuffer` 的其他部分可能与
`Buffer` 对象本身无关。

创建与 `Buffer` 共享内存的 `TypedArray` 对象时的一个常见问题是，在这种情况下需要正确指定 `byteOffset`：

```mjs
import { Buffer } from 'node:buffer';

// 创建一个小于 `Buffer.poolSize` 的 buffer。
const nodeBuffer = Buffer.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

// 当将 Node.js Buffer 转换为 Int8Array 时，使用 byteOffset
// 仅引用 `nodeBuffer.buffer` 中包含
// `nodeBuffer` 内存的部分。
new Int8Array(nodeBuffer.buffer, nodeBuffer.byteOffset, nodeBuffer.length);
```

```cjs
const { Buffer } = require('node:buffer');

// 创建一个小于 `Buffer.poolSize` 的 buffer。
const nodeBuffer = Buffer.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

// 当将 Node.js Buffer 转换为 Int8Array 时，使用 byteOffset
// 仅引用 `nodeBuffer.buffer` 中包含
// `nodeBuffer` 内存的部分。
new Int8Array(nodeBuffer.buffer, nodeBuffer.byteOffset, nodeBuffer.length);
```

### `buf.compare(target[, targetStart[, targetEnd[, sourceStart[, sourceEnd]]]])`

<!-- YAML
added: v0.11.13
changes:
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/10236
    description: "`target` 参数现在可以是 `Uint8Array`。"
  - version: v5.11.0
    pr-url: https://github.com/nodejs/node/pull/5880
    description: 现在支持用于指定偏移量的附加参数。
-->

* `target` {Buffer|Uint8Array} 一个 `Buffer` 或 {Uint8Array}，用于与
  `buf` 比较。
* `targetStart` {integer} `target` 内开始比较的偏移量。**默认值：** `0`。
* `targetEnd` {integer} `target` 内结束比较的偏移量
  （不包含）。**默认值：** `target.length`。
* `sourceStart` {integer} `buf` 内开始比较的偏移量。
  **默认值：** `0`。
* `sourceEnd` {integer} `buf` 内结束比较的偏移量
  （不包含）。**默认值：** [`buf.length`][]。
* 返回：{integer}

比较 `buf` 与 `target` 并返回一个数字，指示 `buf`
在排序顺序中是在 `target` 之前、之后还是相同。
比较基于每个 `Buffer` 中的实际字节序列。

* 如果 `target` 与 `buf` 相同则返回 `0`
* 如果排序时 `target` 应该在 `buf` _之前_ 则返回 `1`。
* 如果排序时 `target` 应该在 `buf` _之后_ 则返回 `-1`。

```mjs
import { Buffer } from 'node:buffer';

const buf1 = Buffer.from('ABC');
const buf2 = Buffer.from('BCD');
const buf3 = Buffer.from('ABCD');

console.log(buf1.compare(buf1));
// 输出：0
console.log(buf1.compare(buf2));
// 输出：-1
console.log(buf1.compare(buf3));
// 输出：-1
console.log(buf2.compare(buf1));
// 输出：1
console.log(buf2.compare(buf3));
// 输出：1
console.log([buf1, buf2, buf3].sort(Buffer.compare));
// 输出：[ <Buffer 41 42 43>, <Buffer 41 42 43 44>, <Buffer 42 43 44> ]
// (此结果等于：[buf1, buf3, buf2]。)
```

```cjs
const { Buffer } = require('node:buffer');

const buf1 = Buffer.from('ABC');
const buf2 = Buffer.from('BCD');
const buf3 = Buffer.from('ABCD');

console.log(buf1.compare(buf1));
// 输出：0
console.log(buf1.compare(buf2));
// 输出：-1
console.log(buf1.compare(buf3));
// 输出：-1
console.log(buf2.compare(buf1));
// 输出：1
console.log(buf2.compare(buf3));
// 输出：1
console.log([buf1, buf2, buf3].sort(Buffer.compare));
// 输出：[ <Buffer 41 42 43>, <Buffer 41 42 43 44>, <Buffer 42 43 44> ]
// (此结果等于：[buf1, buf3, buf2]。)
```

可选的 `targetStart`、`targetEnd`、`sourceStart` 和 `sourceEnd`
参数可用于将比较限制在 `target`
和 `buf` 内的特定范围。

```mjs
import { Buffer } from 'node:buffer';

const buf1 = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8, 9]);
const buf2 = Buffer.from([5, 6, 7, 8, 9, 1, 2, 3, 4]);

console.log(buf1.compare(buf2, 5, 9, 0, 4));
// 输出：0
console.log(buf1.compare(buf2, 0, 6, 4));
// 输出：-1
console.log(buf1.compare(buf2, 5, 6, 5));
// 输出：1
```

```cjs
const { Buffer } = require('node:buffer');

const buf1 = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8, 9]);
const buf2 = Buffer.from([5, 6, 7, 8, 9, 1, 2, 3, 4]);

console.log(buf1.compare(buf2, 5, 9, 0, 4));
// 输出：0
console.log(buf1.compare(buf2, 0, 6, 4));
// 输出：-1
console.log(buf1.compare(buf2, 5, 6, 5));
// 输出：1
```

如果 `targetStart < 0`、`sourceStart < 0`、
`targetEnd > target.byteLength` 或 `sourceEnd > source.byteLength`，
将抛出 [`ERR_OUT_OF_RANGE`][]。

### `buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])`

<!-- YAML
added: v0.1.90
-->

* `target` {Buffer|Uint8Array} 要复制到的 `Buffer` 或 {Uint8Array}。
* `targetStart` {integer} `target` 内开始写入的偏移量。**默认值：** `0`。
* `sourceStart` {integer} `buf` 内开始复制的偏移量。
  **默认值：** `0`。
* `sourceEnd` {integer} `buf` 内停止复制的偏移量（不
  包含）。**默认值：** [`buf.length`][]。
* 返回：{integer} 复制的字节数。

将数据从 `buf` 的一个区域复制到 `target` 中的一个区域，即使 `target`
内存区域与 `buf` 重叠。

[`TypedArray.prototype.set()`][] 执行相同的操作，并且可用于
所有 TypedArrays，包括 Node.js `Buffer`，尽管它采用
不同的函数参数。

```mjs
import { Buffer } from 'node:buffer';

// 创建两个 `Buffer` 实例。
const buf1 = Buffer.allocUnsafe(26);
const buf2 = Buffer.allocUnsafe(26).fill('!');

for (let i = 0; i < 26; i++) {
  // 97 是 'a' 的十进制 ASCII 值。
  buf1[i] = i + 97;
}

// 将 `buf1` 的字节 16 到 19 复制到 `buf2`，从 `buf2` 的字节 8 开始。
buf1.copy(buf2, 8, 16, 20);
// 这等同于：
// buf2.set(buf1.subarray(16, 20), 8);

console.log(buf2.toString('ascii', 0, 25));
// 输出：!!!!!!!!qrst!!!!!!!!!!!!!
```

```cjs
const { Buffer } = require('node:buffer');

// 创建两个 `Buffer` 实例。
const buf1 = Buffer.allocUnsafe(26);
const buf2 = Buffer.allocUnsafe(26).fill('!');

for (let i = 0; i < 26; i++) {
  // 97 是 'a' 的十进制 ASCII 值。
  buf1[i] = i + 97;
}

// 将 `buf1` 的字节 16 到 19 复制到 `buf2`，从 `buf2` 的字节 8 开始。
buf1.copy(buf2, 8, 16, 20);
// 这等同于：
// buf2.set(buf1.subarray(16, 20), 8);

console.log(buf2.toString('ascii', 0, 25));
// 输出：!!!!!!!!qrst!!!!!!!!!!!!!
```

```mjs
import { Buffer } from 'node:buffer';

// 创建一个 `Buffer` 并将数据从一个区域复制到同一
// `Buffer` 内的重叠区域。

const buf = Buffer.allocUnsafe(26);

for (let i = 0; i < 26; i++) {
  // 97 是 'a' 的十进制 ASCII 值。
  buf[i] = i + 97;
}

buf.copy(buf, 0, 4, 10);

console.log(buf.toString());
// 输出：efghijghijklmnopqrstuvwxyz
```

```cjs
const { Buffer } = require('node:buffer');

// 创建一个 `Buffer` 并将数据从一个区域复制到同一
// `Buffer` 内的重叠区域。

const buf = Buffer.allocUnsafe(26);

for (let i = 0; i < 26; i++) {
  // 97 是 'a' 的十进制 ASCII 值。
  buf[i] = i + 97;
}

buf.copy(buf, 0, 4, 10);

console.log(buf.toString());
// 输出：efghijghijklmnopqrstuvwxyz
```

### `buf.entries()`

<!-- YAML
added: v1.1.0
-->

* 返回：{Iterator}

从 `buf` 的内容创建并返回一个 `[index, byte]` 对的 [迭代器][]。

```mjs
import { Buffer } from 'node:buffer';

// 记录 `Buffer` 的全部内容。

const buf = Buffer.from('buffer');

for (const pair of buf.entries()) {
  console.log(pair);
}
// 输出：
//   [0, 98]
//   [1, 117]
//   [2, 102]
//   [3, 102]
//   [4, 101]
//   [5, 114]
```

```cjs
const { Buffer } = require('node:buffer');

// 记录 `Buffer` 的全部内容。

const buf = Buffer.from('buffer');

for (const pair of buf.entries()) {
  console.log(pair);
}
// 输出：
//   [0, 98]
//   [1, 117]
//   [2, 102]
//   [3, 102]
//   [4, 101]
//   [5, 114]
```

### `buf.equals(otherBuffer)`

<!-- YAML
added: v0.11.13
changes:
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/10236
    description: "参数现在可以是 `Uint8Array`。"
-->

* `otherBuffer` {Buffer|Uint8Array} 一个 `Buffer` 或 {Uint8Array}，用于与
  `buf` 比较。
* 返回：{boolean}

如果 `buf` 和 `otherBuffer` 具有完全相同的字节则返回 `true`，
否则返回 `false`。等同于
[`buf.compare(otherBuffer) === 0`][`buf.compare()`]。

```mjs
import { Buffer } from 'node:buffer';

const buf1 = Buffer.from('ABC');
const buf2 = Buffer.from('414243', 'hex');
const buf3 = Buffer.from('ABCD');

console.log(buf1.equals(buf2));
// 输出：true
console.log(buf1.equals(buf3));
// 输出：false
```

```cjs
const { Buffer } = require('node:buffer');

const buf1 = Buffer.from('ABC');
const buf2 = Buffer.from('414243', 'hex');
const buf3 = Buffer.from('ABCD');

console.log(buf1.equals(buf2));
// 输出：true
console.log(buf1.equals(buf3));
// 输出：false
```

### `buf.fill(value[, offset[, end]][, encoding])`

<!-- YAML
added: v0.5.0
changes:
  - version: v11.0.0
    pr-url: https://github.com/nodejs/node/pull/22969
    description: "抛出 `ERR_OUT_OF_RANGE` 而不是 `ERR_INDEX_OUT_OF_RANGE`。"
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18790
    description: "负数 `end` 值抛出 `ERR_INDEX_OUT_OF_RANGE` 错误。"
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18129
    description: 尝试用零长度 buffer 填充非零长度 buffer 会触发抛出的异常。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/17427
    description: "为 `value` 指定无效的字符串会触发抛出的异常。"
  - version: v5.7.0
    pr-url: https://github.com/nodejs/node/pull/4935
    description: "现在支持 `encoding` 参数。"
-->

* `value` {string|Buffer|Uint8Array|integer} 用于填充 `buf` 的值。
  空值（字符串、Uint8Array、Buffer）被强制转换为 `0`。
* `offset` {integer} 开始填充 `buf` 之前要跳过的字节数。
  **默认值：** `0`。
* `end` {integer} 停止填充 `buf` 的位置（不包含）。**默认值：**
  [`buf.length`][]。
* `encoding` {string} 如果 `value` 是字符串，这是它的编码。
  **默认值：** `'utf8'`。
* 返回：{Buffer} 对 `buf` 的引用。

使用指定的 `value` 填充 `buf`。如果未提供 `offset` 和 `end`，
整个 `buf` 将被填充：

```mjs
import { Buffer } from 'node:buffer';

// 用 ASCII 字符 'h' 填充 `Buffer`。

const b = Buffer.allocUnsafe(50).fill('h');

console.log(b.toString());
// 输出：hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh

// 用空字符串填充 buffer
const c = Buffer.allocUnsafe(5).fill('');

console.log(c.fill(''));
// 输出：<Buffer 00 00 00 00 00>
```

```cjs
const { Buffer } = require('node:buffer');

// 用 ASCII 字符 'h' 填充 `Buffer`。

const b = Buffer.allocUnsafe(50).fill('h');

console.log(b.toString());
// 输出：hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh

// 用空字符串填充 buffer
const c = Buffer.allocUnsafe(5).fill('');

console.log(c.fill(''));
// 输出：<Buffer 00 00 00 00 00>
```

如果 `value` 不是字符串、`Buffer` 或
整数，则会被强制转换为 `uint32` 值。如果结果整数大于 `255`（十进制），`buf` 将
使用 `value & 255` 进行填充。

如果 `fill()` 操作的最后一次写入落在多字节字符上，
则只会写入该字符中适合 `buf` 的字节：

```mjs
import { Buffer } from 'node:buffer';

// 用 UTF-8 中占用两个字节的字符填充 `Buffer`。

console.log(Buffer.allocUnsafe(5).fill('\u0222'));
// 输出：<Buffer c8 a2 c8 a2 c8>
```

```cjs
const { Buffer } = require('node:buffer');

// 用 UTF-8 中占用两个字节的字符填充 `Buffer`。

console.log(Buffer.allocUnsafe(5).fill('\u0222'));
// 输出：<Buffer c8 a2 c8 a2 c8>
```

如果 `value` 包含无效字符，它将被截断；如果没有剩余的有效
填充数据，将抛出异常：

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.allocUnsafe(5);

console.log(buf.fill('a'));
// 输出：<Buffer 61 61 61 61 61>
console.log(buf.fill('aazz', 'hex'));
// 输出：<Buffer aa aa aa aa aa>
console.log(buf.fill('zz', 'hex'));
// 抛出异常。
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.allocUnsafe(5);

console.log(buf.fill('a'));
// 输出：<Buffer 61 61 61 61 61>
console.log(buf.fill('aazz', 'hex'));
// 输出：<Buffer aa aa aa aa aa>
console.log(buf.fill('zz', 'hex'));
// 抛出异常。
```

### `buf.includes(value[, start[, end]][, encoding])`

<!-- YAML
added: v5.3.0
changes:
  - version: v26.1.0
    pr-url: https://github.com/nodejs/node/pull/62390
    description: 添加了 `end` 参数。
  - version:
     - v25.5.0
     - v24.13.1
    pr-url: https://github.com/nodejs/node/pull/56578
    description: "支持 Uint8Array 作为 `this` 值。"
-->

* `value` {string|Buffer|Uint8Array|integer} 要搜索的内容。
* `start` {integer} 在 `buf` 中开始搜索的位置。如果为负，则
  偏移量从 `buf` 末尾计算。**默认值：** `0`。
* `end` {integer} 在 `buf` 中停止搜索的位置（不包含）。**默认值：**
  `buf.length`。
* `encoding` {string} 如果 `value` 是字符串，这是它的编码。
  **默认值：** `'utf8'`。
* 返回：{boolean} 如果在 `buf` 中找到 `value` 则为 `true`，否则为 `false`。

等同于 [`buf.indexOf() !== -1`][`buf.indexOf()`]。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from('this is a buffer');

console.log(buf.includes('this'));
// 输出：true
console.log(buf.includes('is'));
// 输出：true
console.log(buf.includes(Buffer.from('a buffer')));
// 输出：true
console.log(buf.includes(97));
// 输出：true (97 是 'a' 的十进制 ASCII 值)
console.log(buf.includes(Buffer.from('a buffer example')));
// 输出：false
console.log(buf.includes(Buffer.from('a buffer example').slice(0, 8)));
// 输出：true
console.log(buf.includes('this', 4));
// 输出：false
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from('this is a buffer');

console.log(buf.includes('this'));
// 输出：true
console.log(buf.includes('is'));
// 输出：true
console.log(buf.includes(Buffer.from('a buffer')));
// 输出：true
console.log(buf.includes(97));
// 输出：true (97 是 'a' 的十进制 ASCII 值)
console.log(buf.includes(Buffer.from('a buffer example')));
// 输出：false
console.log(buf.includes(Buffer.from('a buffer example').slice(0, 8)));
// 输出：true
console.log(buf.includes('this', 4));
// 输出：false
```

### `buf.indexOf(value[, start[, end]][, encoding])`

<!-- YAML
added: v1.5.0
changes:
  - version: v26.1.0
    pr-url: https://github.com/nodejs/node/pull/62390
    description: 添加了 `end` 参数。
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/10236
    description: "`value` 现在可以是 `Uint8Array`。"
  - version:
    - v5.7.0
    - v4.4.0
    pr-url: https://github.com/nodejs/node/pull/4803
    description: "当传递 `encoding` 时，`byteOffset` 参数不再必需。"
-->

* `value` {string|Buffer|Uint8Array|integer} 要搜索的内容。
* `start` {integer} 在 `buf` 中开始搜索的位置。如果为负，则
  偏移量从 `buf` 末尾计算。**默认值：** `0`。
* `end` {integer} 在 `buf` 中停止搜索的位置（不包含）。**默认值：**
  `buf.length`。
* `encoding` {string} 如果 `value` 是字符串，这是用于
  确定要在 `buf` 中搜索的字符串二进制表示形式的编码。
  **默认值：** `'utf8'`。
* 返回：{integer} `value` 在 `buf` 中首次出现的索引，若 `buf` 不包含 `value`，则返回
  `-1`。

如果 `value` 是：

* 字符串，`value` 根据 `encoding` 中的字符编码进行解释。
* `Buffer` 或 {Uint8Array}，`value` 将整体使用。
  要比较部分 `Buffer`，使用 [`buf.subarray`][]。
* 数字，`value` 将被解释为 `0` 和 `255` 之间的无符号 8 位整数
  值。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from('this is a buffer');

console.log(buf.indexOf('this'));
// 输出：0
console.log(buf.indexOf('is'));
// 输出：2
console.log(buf.indexOf(Buffer.from('a buffer')));
// 输出：8
console.log(buf.indexOf(97));
// 输出：8 (97 是 'a' 的十进制 ASCII 值)
console.log(buf.indexOf(Buffer.from('a buffer example')));
// 输出：-1
console.log(buf.indexOf(Buffer.from('a buffer example').slice(0, 8)));
// 输出：8

const utf16Buffer = Buffer.from('\u039a\u0391\u03a3\u03a3\u0395', 'utf16le');

console.log(utf16Buffer.indexOf('\u03a3', 0, 'utf16le'));
// 输出：4
console.log(utf16Buffer.indexOf('\u03a3', -4, 'utf16le'));
// 输出：6
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from('this is a buffer');

console.log(buf.indexOf('this'));
// 输出：0
console.log(buf.indexOf('is'));
// 输出：2
console.log(buf.indexOf(Buffer.from('a buffer')));
// 输出：8
console.log(buf.indexOf(97));
// 输出：8 (97 是 'a' 的十进制 ASCII 值)
console.log(buf.indexOf(Buffer.from('a buffer example')));
// 输出：-1
console.log(buf.indexOf(Buffer.from('a buffer example').slice(0, 8)));
// 输出：8

const utf16Buffer = Buffer.from('\u039a\u0391\u03a3\u03a3\u0395', 'utf16le');

console.log(utf16Buffer.indexOf('\u03a3', 0, 'utf16le'));
// 输出：4
console.log(utf16Buffer.indexOf('\u03a3', -4, 'utf16le'));
// 输出：6
```

如果 `value` 不是字符串、数字或 `Buffer`，此方法将抛出
`TypeError`。如果 `value` 是数字，它将被强制转换为有效的字节值，
即 0 到 255 之间的整数。

如果 `byteOffset` 不是数字，它将被强制转换为数字。如果强制转换的结果
是 `NaN` 或 `0`，则将搜索整个 buffer。此
行为与 [`String.prototype.indexOf()`][] 相匹配。

```mjs
import { Buffer } from 'node:buffer';

const b = Buffer.from('abcdef');

// 传递一个值是数字，但不是有效字节的值。
// 输出：2，等同于搜索 99 或 'c'。
console.log(b.indexOf(99.9));
console.log(b.indexOf(256 + 99));

// 传递一个强制转换为 NaN 或 0 的 byteOffset。
// 输出：1，搜索整个 buffer。
console.log(b.indexOf('b', undefined));
console.log(b.indexOf('b', {}));
console.log(b.indexOf('b', null));
console.log(b.indexOf('b', []));
```

```cjs
const { Buffer } = require('node:buffer');

const b = Buffer.from('abcdef');

// 传递一个数字值，但不是有效的字节。
// 打印：2，相当于搜索 99 或 'c'。
console.log(b.indexOf(99.9));
console.log(b.indexOf(256 + 99));

// 传递一个被强制转换为 NaN 或 0 的 byteOffset。
// 打印：1，搜索整个 buffer。
console.log(b.indexOf('b', undefined));
console.log(b.indexOf('b', {}));
console.log(b.indexOf('b', null));
console.log(b.indexOf('b', []));
```

如果 `value` 是空字符串或空 `Buffer` 且 `byteOffset` 小于 `buf.length`，将返回 `byteOffset`。如果 `value` 为空且 `byteOffset` 至少为 `buf.length`，将返回 `buf.length`。

### `buf.keys()`

<!-- YAML
added: v1.1.0
-->

* 返回值：{Iterator}

创建并返回一个 [iterator][]，其中包含 `buf` 的键（索引）。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from('buffer');

for (const key of buf.keys()) {
  console.log(key);
}
// 打印：
//   0
//   1
//   2
//   3
//   4
//   5
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from('buffer');

for (const key of buf.keys()) {
  console.log(key);
}
// 打印：
//   0
//   1
//   2
//   3
//   4
//   5
```

### `buf.lastIndexOf(value[, start[, end]][, encoding])`

<!-- YAML
added: v6.0.0
changes:
  - version: v26.1.0
    pr-url: https://github.com/nodejs/node/pull/62390
    description: 添加了 `end` 参数。
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/10236
    description: value 现在可以是 Uint8Array。
-->

* `value` {string|Buffer|Uint8Array|integer} 要搜索的内容。
* `start` {integer} 在 `buf` 中开始搜索的位置。如果为负，则
  偏移量从 `buf` 末尾计算。**默认值：**
  `buf.length - 1`。
* `end` {integer} 在 `buf` 中停止搜索的位置（不包含）。**默认值：**
  `buf.length`。
* `encoding` {string} 如果 `value` 是字符串，这是用于
  确定要在 `buf` 中搜索的字符串二进制表示形式的编码。
  **默认值：** `'utf8'`。
* 返回：{integer} `value` 在 `buf` 中最后一次出现的索引，若 `buf` 不包含 `value`，则返回
  `-1`。

与 [`buf.indexOf()`][] 相同，只不过找到的是 `value` 的最后一次出现而不是第一次出现。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from('this buffer is a buffer');

console.log(buf.lastIndexOf('this'));
// 打印：0
console.log(buf.lastIndexOf('buffer'));
// 打印：17
console.log(buf.lastIndexOf(Buffer.from('buffer')));
// 打印：17
console.log(buf.lastIndexOf(97));
// 打印：15（97 是 'a' 的十进制 ASCII 值）
console.log(buf.lastIndexOf(Buffer.from('yolo')));
// 打印：-1
console.log(buf.lastIndexOf('buffer', 5));
// 打印：5
console.log(buf.lastIndexOf('buffer', 4));
// 打印：-1

const utf16Buffer = Buffer.from('\u039a\u0391\u03a3\u03a3\u0395', 'utf16le');

console.log(utf16Buffer.lastIndexOf('\u03a3', undefined, 'utf16le'));
// 打印：6
console.log(utf16Buffer.lastIndexOf('\u03a3', -5, 'utf16le'));
// 打印：4
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from('this buffer is a buffer');

console.log(buf.lastIndexOf('this'));
// 打印：0
console.log(buf.lastIndexOf('buffer'));
// 打印：17
console.log(buf.lastIndexOf(Buffer.from('buffer')));
// 打印：17
console.log(buf.lastIndexOf(97));
// 打印：15（97 是 'a' 的十进制 ASCII 值）
console.log(buf.lastIndexOf(Buffer.from('yolo')));
// 打印：-1
console.log(buf.lastIndexOf('buffer', 5));
// 打印：5
console.log(buf.lastIndexOf('buffer', 4));
// 打印：-1

const utf16Buffer = Buffer.from('\u039a\u0391\u03a3\u03a3\u0395', 'utf16le');

console.log(utf16Buffer.lastIndexOf('\u03a3', undefined, 'utf16le'));
// 打印：6
console.log(utf16Buffer.lastIndexOf('\u03a3', -5, 'utf16le'));
// 打印：4
```

如果 `value` 不是字符串、数字或 `Buffer`，此方法将抛出 `TypeError`。如果 `value` 是数字，它将被强制转换为有效的字节值，即 0 到 255 之间的整数。

如果 `byteOffset` 不是数字，它将被强制转换为数字。任何被强制转换为 `NaN` 的参数（如 `{}` 或 `undefined`）将搜索整个缓冲区。此行为与 [`String.prototype.lastIndexOf()`][] 匹配。

```mjs
import { Buffer } from 'node:buffer';

const b = Buffer.from('abcdef');

// 传递一个数字值，但不是有效的字节。
// 打印：2，相当于搜索 99 或 'c'。
console.log(b.lastIndexOf(99.9));
console.log(b.lastIndexOf(256 + 99));

// 传递一个被强制转换为 NaN 的 byteOffset。
// 打印：1，搜索整个 buffer。
console.log(b.lastIndexOf('b', undefined));
console.log(b.lastIndexOf('b', {}));

// 传递一个被强制转换为 0 的 byteOffset。
// 打印：-1，相当于传递 0。
console.log(b.lastIndexOf('b', null));
console.log(b.lastIndexOf('b', []));
```

```cjs
const { Buffer } = require('node:buffer');

const b = Buffer.from('abcdef');

// 传递一个数字值，但不是有效的字节。
// 打印：2，相当于搜索 99 或 'c'。
console.log(b.lastIndexOf(99.9));
console.log(b.lastIndexOf(256 + 99));

// 传递一个被强制转换为 NaN 的 byteOffset。
// 打印：1，搜索整个 buffer。
console.log(b.lastIndexOf('b', undefined));
console.log(b.lastIndexOf('b', {}));

// 传递一个被强制转换为 0 的 byteOffset。
// 打印：-1，相当于传递 0。
console.log(b.lastIndexOf('b', null));
console.log(b.lastIndexOf('b', []));
```

如果 `value` 是空字符串或空 `Buffer`，将返回 `byteOffset`。

### `buf.length`

<!-- YAML
added: v0.1.90
-->

* 类型：{integer}

返回 `buf` 中的字节数。

```mjs
import { Buffer } from 'node:buffer';

// 创建一个 Buffer 并使用 UTF-8 向其中写入一个较短的字符串。

const buf = Buffer.alloc(1234);

console.log(buf.length);
// 打印：1234

buf.write('some string', 0, 'utf8');

console.log(buf.length);
// 打印：1234
```

```cjs
const { Buffer } = require('node:buffer');

// 创建一个 Buffer 并使用 UTF-8 向其中写入一个较短的字符串。

const buf = Buffer.alloc(1234);

console.log(buf.length);
// 打印：1234

buf.write('some string', 0, 'utf8');

console.log(buf.length);
// 打印：1234
```

### `buf.parent`

<!-- YAML
deprecated: v8.0.0
-->

> 稳定性：0 - 已弃用：请改用 [`buf.buffer`][]。

`buf.parent` 属性是 `buf.buffer` 的已弃用别名。

### `buf.readBigInt64BE([offset])`

<!-- YAML
added:
 - v12.0.0
 - v10.20.0
-->

* `offset` {整数} 开始读取前要跳过的字节数。必须满足：`0 <= offset <= buf.length - 8`。**默认值：** `0`。
* 返回值：{大整数}

从 `buf` 中指定的 `offset` 处读取一个有符号的大端 64 位整数。

从 `Buffer` 读取的整数被解释为二进制补码有符号值。

### `buf.readBigInt64LE([offset])`

<!-- YAML
added:
 - v12.0.0
 - v10.20.0
-->

* `offset` {integer} 开始读取前要跳过的字节数。必须满足：`0 <= offset <= buf.length - 8`。**默认值：** `0`。
* 返回值：{bigint}

从 `buf` 中指定的 `offset` 处读取一个有符号的小端 64 位整数。

从 `Buffer` 读取的整数被解释为二进制补码有符号值。

### `buf.readBigUInt64BE([offset])`

<!-- YAML
added:
 - v12.0.0
 - v10.20.0
changes:
  - version:
    - v14.10.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/34960
    description: 此函数也可通过 buf.readBigUint64BE() 使用。
-->

* `offset` {integer} 开始读取前要跳过的字节数。必须满足：`0 <= offset <= buf.length - 8`。**默认值：** `0`。
* 返回值：{bigint}

从 `buf` 中指定的 `offset` 处读取一个无符号的大端序 64 位整数。

此函数也可以使用 `readBigUint64BE` 别名访问。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from([0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff]);

console.log(buf.readBigUInt64BE(0));
// 输出：4294967295n
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from([0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff]);

console.log(buf.readBigUInt64BE(0));
// 输出：4294967295n
```

### `buf.readBigUInt64LE([offset])`

<!-- YAML
added:
 - v12.0.0
 - v10.20.0
changes:
  - version:
    - v14.10.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/34960
    description: 此函数也可作为 buf.readBigUint64LE() 使用。
-->

* `offset` {整数} 开始读取前要跳过的字节数。必须满足：`0 <= offset <= buf.length - 8`。**默认值：** `0`。
* 返回值：{大整数}

从 `buf` 中指定的 `offset` 处读取一个无符号的小端 64 位整数。

此函数也可通过 `readBigUint64LE` 别名使用。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from([0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff]);

console.log(buf.readBigUInt64LE(0));
// 打印：18446744069414584320n
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from([0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff]);

console.log(buf.readBigUInt64LE(0));
// 打印：18446744069414584320n
```

### Buffer.prototype.readDoubleBE

<!-- YAML
added: v0.11.15
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18395
    description: 移除了 noAssert，并且不再隐式地将 offset 强制转换为 uint32。
-->

* `offset` {integer} 开始读取前要跳过的字节数。必须满足 `0 <= offset <= buf.length - 8`。**默认值：** `0`。
* 返回值：{number}

从 `buf` 中指定的 `offset` 处读取一个 64 位、大端序的双精度值。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8]);

console.log(buf.readDoubleBE(0));
// 输出：8.20788039913184e-304
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8]);

console.log(buf.readDoubleBE(0));
// 输出：8.20788039913184e-304
```

### `buf.readDoubleLE([offset])`

<!-- YAML
added: v0.11.15
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18395
    description: 移除了 noAssert，并且不再将 offset 隐式强制转换为 uint32。
-->

* `offset` {integer} 开始读取前要跳过的字节数。必须满足 `0 <= offset <= buf.length - 8`。**默认值：** `0`。
* 返回值：{number}

从 `buf` 中指定的 `offset` 处读取一个 64 位小端 double 值。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8]);

console.log(buf.readDoubleLE(0));
// 输出：5.447603722011605e-270
console.log(buf.readDoubleLE(1));
// 抛出 ERR_OUT_OF_RANGE。
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8]);

console.log(buf.readDoubleLE(0));
// 输出：5.447603722011605e-270
console.log(buf.readDoubleLE(1));
// 抛出 ERR_OUT_OF_RANGE。
```

### `buf.readFloatBE([offset])`

<!-- YAML
added: v0.11.15
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18395
    description: 移除了 noAssert，并且不再将 offset 隐式强制转换为 uint32。
-->

* `offset` {integer} 开始读取前要跳过的字节数。必须满足 `0 <= offset <= buf.length - 4`。**默认值：** `0`。
* 返回值：{number}

从 `buf` 中指定的 `offset` 处读取一个 32 位大端浮点数。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from([1, 2, 3, 4]);

console.log(buf.readFloatBE(0));
// 打印：2.387939260590663e-38
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from([1, 2, 3, 4]);

console.log(buf.readFloatBE(0));
// 打印：2.387939260590663e-38
```

### `buffer.readFloatLE(offset)`

<!-- YAML
added: v0.11.15
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18395
    description: 移除了 noAssert，并且不再将 offset 隐式强制转换为 uint32。
-->

* `offset` {integer} 开始读取前要跳过的字节数。必须满足 `0 <= offset <= buf.length - 4`。**默认值：** `0`。
* 返回：{number}

从 `buf` 中指定的 `offset` 处读取一个 32 位小端浮点值。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from([1, 2, 3, 4]);

console.log(buf.readFloatLE(0));
// 输出：1.539989614439558e-36
console.log(buf.readFloatLE(1));
// 抛出 ERR_OUT_OF_RANGE。
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from([1, 2, 3, 4]);

console.log(buf.readFloatLE(0));
// 输出：1.539989614439558e-36
console.log(buf.readFloatLE(1));
// 抛出 ERR_OUT_OF_RANGE。
```

### `buf.readInt8([offset])`

<!-- YAML
added: v0.5.0
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18395
    description: 移除了 noAssert，并且不再将 offset 隐式强制转换为 uint32。
-->

* `offset` {integer} 开始读取前要跳过的字节数。必须满足 `0 <= offset <= buf.length - 1`。**默认值：** `0`。
* 返回值：{integer}

从 `buf` 中指定的 `offset` 处读取一个有符号 8 位整数。

从 `Buffer` 读取的整数被解释为二进制补码有符号值。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from([-1, 5]);

console.log(buf.readInt8(0));
// 打印：-1
console.log(buf.readInt8(1));
// 打印：5
console.log(buf.readInt8(2));
// 抛出 ERR_OUT_OF_RANGE。
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from([-1, 5]);

console.log(buf.readInt8(0));
// 打印：-1
console.log(buf.readInt8(1));
// 打印：5
console.log(buf.readInt8(2));
// 抛出 ERR_OUT_OF_RANGE。
```

### `buf.readInt16BE([offset])`

<!-- YAML
added: v0.5.5
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18395
    description: 移除了 noAssert，并且不再将 offset 隐式强制转换为 uint32。
-->

* `offset` {integer} 开始读取前要跳过的字节数。必须满足 `0 <= offset <= buf.length - 2`。**默认值：** `0`。
* 返回：{integer}

从 `buf` 中指定的 `offset` 处读取一个有符号的大端序 16 位整数。

从 `Buffer` 中读取的整数将被解释为二进制补码有符号值。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from([0, 5]);

console.log(buf.readInt16BE(0));
// 输出：5
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from([0, 5]);

console.log(buf.readInt16BE(0));
// 输出：5
```

### `buf.readInt16LE([offset])`

<!-- YAML
added: v0.5.5
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18395
    description: 移除了 noAssert，并且不再将 offset 隐式强制转换为 uint32。
-->

* `offset` {整数} 开始读取前要跳过的字节数。必须满足 `0 <= offset <= buf.length - 2`。**默认值：** `0`。
* 返回值：{整数}

从 `buf` 中指定的 `offset` 处读取一个有符号的小端 16 位整数。

从 `Buffer` 读取的整数被解释为二进制补码有符号值。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from([0, 5]);

console.log(buf.readInt16LE(0));
// 打印：1280
console.log(buf.readInt16LE(1));
// 抛出 ERR_OUT_OF_RANGE。
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from([0, 5]);

console.log(buf.readInt16LE(0));
// 打印：1280
console.log(buf.readInt16LE(1));
// 抛出 ERR_OUT_OF_RANGE。
```

### `buf.readInt32BE([offset])`

<!-- YAML
added: v0.5.5
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18395
    description: 移除了 noAssert，不再隐式地将 offset 强制转换为 uint32。
-->

* `offset` {integer} 开始读取前要跳过的字节数。必须满足 `0 <= offset <= buf.length - 4`。**默认值：** `0`。
* 返回：{integer}

从 `buf` 中指定的 `offset` 处读取一个有符号的大端序 32 位整数。

从 `Buffer` 中读取的整数将被解释为二进制补码有符号值。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from([0, 0, 0, 5]);

console.log(buf.readInt32BE(0));
// 输出：5
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from([0, 0, 0, 5]);

console.log(buf.readInt32BE(0));
// 输出：5
```

### `buf.readInt32LE([offset])`

<!-- YAML
added: v0.5.5
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18395
    description: 移除了 noAssert，并且不再将 offset 隐式强制转换为 uint32。
-->

* `offset` {integer} 开始读取前要跳过的字节数。必须满足 `0 <= offset <= buf.length - 4`。**默认值：** `0`。
* 返回值：{integer}

从 `buf` 中指定的 `offset` 处读取一个有符号的小端 32 位整数。

从 `Buffer` 读取的整数被解释为二进制补码有符号值。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from([0, 0, 0, 5]);

console.log(buf.readInt32LE(0));
// 打印：83886080
console.log(buf.readInt32LE(1));
// 抛出 ERR_OUT_OF_RANGE。
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from([0, 0, 0, 5]);

console.log(buf.readInt32LE(0));
// 打印：83886080
console.log(buf.readInt32LE(1));
// 抛出 ERR_OUT_OF_RANGE。
```

### `buf.readIntBE(offset, byteLength)`

<!-- YAML
added: v0.11.15
changes:
  - version:
    - v25.5.0
    - v24.13.1
    pr-url: https://github.com/nodejs/node/pull/56578
    description: 支持 Uint8Array 作为 this 值。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18395
    description: 移除了 noAssert，并且不再将 offset 和 byteLength 隐式强制转换为 uint32。

-->

* `offset` {整数} 开始读取前要跳过的字节数。必须满足 `0 <= offset <= buf.length - byteLength`。
* `byteLength` {整数} 要读取的字节数。必须满足 `0 < byteLength <= 6`。
* 返回值：{整数}

从 `buf` 中指定的 `offset` 处读取 `byteLength` 个字节，并将结果解释为大端二进制补码有符号值，支持高达 48 位的精度。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from([0x12, 0x34, 0x56, 0x78, 0x90, 0xab]);

console.log(buf.readIntBE(0, 6).toString(16));
// 输出：1234567890ab
console.log(buf.readIntBE(1, 6).toString(16));
// 抛出 ERR_OUT_OF_RANGE。
console.log(buf.readIntBE(1, 0).toString(16));
// 抛出 ERR_OUT_OF_RANGE。
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from([0x12, 0x34, 0x56, 0x78, 0x90, 0xab]);

console.log(buf.readIntBE(0, 6).toString(16));
// 输出：1234567890ab
console.log(buf.readIntBE(1, 6).toString(16));
// 抛出 ERR_OUT_OF_RANGE。
console.log(buf.readIntBE(1, 0).toString(16));
// 抛出 ERR_OUT_OF_RANGE。
```

### `buf.readIntLE(offset, byteLength)`

<!-- YAML
added: v0.11.15
changes:
  - version:
     - v25.5.0
     - v24.13.1
    pr-url: https://github.com/nodejs/node/pull/56578
    description: 支持 Uint8Array 作为 this 值。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18395
    description: 移除了 noAssert，并且不再将 offset 和 byteLength 隐式强制转换为 uint32。

-->

* `offset` {integer} 开始读取前要跳过的字节数。必须满足 `0 <= offset <= buf.length - byteLength`。
* `byteLength` {integer} 要读取的字节数。必须满足 `0 < byteLength <= 6`。
* 返回值：{integer}

从 `buf` 中指定的 `offset` 处读取 `byteLength` 个字节，并将结果解释为小端二进制补码有符号值，支持高达 48 位的精度。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from([0x12, 0x34, 0x56, 0x78, 0x90, 0xab]);

console.log(buf.readIntLE(0, 6).toString(16));
// 输出：-546f87a9cbee
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from([0x12, 0x34, 0x56, 0x78, 0x90, 0xab]);

console.log(buf.readIntLE(0, 6).toString(16));
// 输出：-546f87a9cbee
```

### `buf.readUInt8([offset])`

<!-- YAML
added: v0.5.0
changes:
  - version:
    - v14.9.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/34729
    description: 此函数也可作为 buf.readUint8() 使用。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18395
    description: 移除了 noAssert，并且不再将 offset 隐式强制转换为 uint32。
-->

* `offset` {integer} 开始读取前要跳过的字节数。必须满足 `0 <= offset <= buf.length - 1`。**默认值：** `0`。
* 返回值：{integer}

从 `buf` 中指定的 `offset` 处读取一个无符号 8 位整数。

此函数也可通过 `readUint8` 别名使用。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from([1, -2]);

console.log(buf.readUInt8(0));
// 输出：1
console.log(buf.readUInt8(1));
// 输出：254
console.log(buf.readUInt8(2));
// 抛出 ERR_OUT_OF_RANGE。
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from([1, -2]);

console.log(buf.readUInt8(0));
// 输出：1
console.log(buf.readUInt8(1));
// 输出：254
console.log(buf.readUInt8(2));
// 抛出 ERR_OUT_OF_RANGE。
```

### `buf.readUInt16BE([offset])`

<!-- YAML
added: v0.5.5
changes:
  - version:
    - v14.9.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/34729
    description: 此函数也可作为 buf.readUint16BE() 使用。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18395
    description: 移除了 noAssert，并且不再将 offset 隐式强制转换为 uint32。
-->

* `offset` {integer} 开始读取前要跳过的字节数。必须满足 `0 <= offset <= buf.length - 2`。**默认值：** `0`。
* 返回值：{integer}

从 `buf` 中指定的 `offset` 处读取一个无符号的大端 16 位整数。

此函数也可通过 `readUint16BE` 别名使用。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from([0x12, 0x34, 0x56]);

console.log(buf.readUInt16BE(0).toString(16));
// 输出：1234
console.log(buf.readUInt16BE(1).toString(16));
// 输出：3456
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from([0x12, 0x34, 0x56]);

console.log(buf.readUInt16BE(0).toString(16));
// 输出：1234
console.log(buf.readUInt16BE(1).toString(16));
// 输出：3456
```

### `buf.readUInt16LE([offset])`

<!-- YAML
added: v0.5.5
changes:
  - version:
    - v14.9.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/34729
    description: 此函数也可作为 buf.readUint16LE() 使用。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18395
    description: 移除了 noAssert，并且不再将 offset 隐式强制转换为 uint32。
-->

* `offset` {integer} 开始读取前要跳过的字节数。必须满足 `0 <= offset <= buf.length - 2`。**默认值：** `0`。
* 返回值：{integer}

从 `buf` 中指定的 `offset` 处读取一个无符号的小端 16 位整数。

此函数也可通过 `readUint16LE` 别名使用。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from([0x12, 0x34, 0x56]);

console.log(buf.readUInt16LE(0).toString(16));
// 输出：3412
console.log(buf.readUInt16LE(1).toString(16));
// 输出：5634
console.log(buf.readUInt16LE(2).toString(16));
// 抛出 ERR_OUT_OF_RANGE。
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from([0x12, 0x34, 0x56]);

console.log(buf.readUInt16LE(0).toString(16));
// 输出：3412
console.log(buf.readUInt16LE(1).toString(16));
// 输出：5634
console.log(buf.readUInt16LE(2).toString(16));
// 抛出 ERR_OUT_OF_RANGE。
```

### `buf.readUInt32BE([offset])`

<!-- YAML
added: v0.5.5
changes:
  - version:
    - v14.9.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/34729
    description: 此函数也可作为 buf.readUint32BE() 使用。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18395
    description: 移除了 noAssert，并且不再将 offset 隐式强制转换为 uint32。
-->

* `offset` {integer} 开始读取前要跳过的字节数。必须满足 `0 <= offset <= buf.length - 4`。**默认值：** `0`。
* 返回值：{integer}

从 `buf` 中指定的 `offset` 处读取一个无符号的大端 32 位整数。

此函数也可通过 `readUint32BE` 别名使用。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from([0x12, 0x34, 0x56, 0x78]);

console.log(buf.readUInt32BE(0).toString(16));
// 输出：12345678
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from([0x12, 0x34, 0x56, 0x78]);

console.log(buf.readUInt32BE(0).toString(16));
// 输出：12345678
```

### `buf.readUInt32LE([offset])`

<!-- YAML
added: v0.5.5
changes:
  - version:
    - v14.9.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/34729
    description: 此函数也可作为 buf.readUint32LE() 使用。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18395
    description: 移除了 noAssert，并且不再将 offset 隐式强制转换为 uint32。
-->

* `offset` {integer} 开始读取前要跳过的字节数。必须满足 `0 <= offset <= buf.length - 4`。**默认值：** `0`。
* 返回值：{integer}

从 `buf` 中指定的 `offset` 处读取一个无符号的小端 32 位整数。

此函数也可通过 `readUint32LE` 别名使用。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from([0x12, 0x34, 0x56, 0x78]);

console.log(buf.readUInt32LE(0).toString(16));
// 输出：78563412
console.log(buf.readUInt32LE(1).toString(16));
// 抛出 ERR_OUT_OF_RANGE。
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from([0x12, 0x34, 0x56, 0x78]);

console.log(buf.readUInt32LE(0).toString(16));
// 输出：78563412
console.log(buf.readUInt32LE(1).toString(16));
// 抛出 ERR_OUT_OF_RANGE。
```

### `buf.readUIntBE(offset, byteLength)`

<!-- YAML
added: v0.11.15
changes:
  - version:
     - v25.5.0
     - v24.13.1
    pr-url: https://github.com/nodejs/node/pull/56578
    description: 支持 Uint8Array 作为 this 值。
  - version:
    - v14.9.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/34729
    description: 此函数也可作为 buf.readUintBE() 使用。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18395
    description: 移除了 noAssert，并且不再将 offset 和 byteLength 隐式强制转换为 uint32。
-->

* `offset` {integer} 开始读取前要跳过的字节数。必须满足 `0 <= offset <= buf.length - byteLength`。
* `byteLength` {integer} 要读取的字节数。必须满足 `0 < byteLength <= 6`。
* 返回值：{integer}

从 `buf` 中指定的 `offset` 处读取 `byteLength` 个字节，并将结果解释为无符号大端整数，支持高达 48 位的精度。

此函数也可通过 `readUintBE` 别名使用。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from([0x12, 0x34, 0x56, 0x78, 0x90, 0xab]);

console.log(buf.readUIntBE(0, 6).toString(16));
// 输出：1234567890ab
console.log(buf.readUIntBE(1, 6).toString(16));
// 抛出 ERR_OUT_OF_RANGE。
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from([0x12, 0x34, 0x56, 0x78, 0x90, 0xab]);

console.log(buf.readUIntBE(0, 6).toString(16));
// 输出：1234567890ab
console.log(buf.readUIntBE(1, 6).toString(16));
// 抛出 ERR_OUT_OF_RANGE。
```

### `buf.readUIntLE(offset, byteLength)`

<!-- YAML
added: v0.11.15
changes:
  - version:
     - v25.5.0
     - v24.13.1
    pr-url: https://github.com/nodejs/node/pull/56578
    description: 支持 Uint8Array 作为 this 值。
  - version:
    - v14.9.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/34729
    description: 此函数也可作为 buf.readUintLE() 使用。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18395
    description: 移除了 noAssert，并且不再将 offset 和 byteLength 隐式强制转换为 uint32。
-->

* `offset` {integer} 开始读取前要跳过的字节数。必须满足 `0 <= offset <= buf.length - byteLength`。
* `byteLength` {integer} 要读取的字节数。必须满足 `0 < byteLength <= 6`。
* 返回值：{integer}

从 `buf` 中指定的 `offset` 处读取 `byteLength` 个字节，并将结果解释为无符号小端整数，支持高达 48 位的精度。

此函数也可通过 `readUintLE` 别名使用。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from([0x12, 0x34, 0x56, 0x78, 0x90, 0xab]);

console.log(buf.readUIntLE(0, 6).toString(16));
// 输出：ab9078563412
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from([0x12, 0x34, 0x56, 0x78, 0x90, 0xab]);

console.log(buf.readUIntLE(0, 6).toString(16));
// 输出：ab9078563412
```

### `buf.subarray([start[, end]])`

<!-- YAML
added: v3.0.0
-->

* `start` {integer} 新 `Buffer` 的起始位置。**默认值：** `0`。
* `end` {integer} 新 `Buffer` 的结束位置（不包含）。**默认值：** [`buf.length`][]。
* 返回值：{Buffer}

返回一个新的 `Buffer`，它引用与原始对象相同的内存，但根据 `start` 和 `end` 索引进行偏移和裁剪。

指定大于 [`buf.length`][] 的 `end` 将返回与 `end` 等于 [`buf.length`][] 相同的结果。

此方法继承自 [`TypedArray.prototype.subarray()`][]。

修改新的 `Buffer` 切片将修改原始 `Buffer` 中的内存，因为这两个对象分配的内存是重叠的。

```mjs
import { Buffer } from 'node:buffer';

// 创建一个包含 ASCII 字母表的 Buffer，获取一个切片，并修改原始 Buffer 中的一个字节。

const buf1 = Buffer.allocUnsafe(26);

for (let i = 0; i < 26; i++) {
  // 97 是 'a' 的十进制 ASCII 值。
  buf1[i] = i + 97;
}

const buf2 = buf1.subarray(0, 3);

console.log(buf2.toString('ascii', 0, buf2.length));
// 输出：abc

buf1[0] = 33;

console.log(buf2.toString('ascii', 0, buf2.length));
// 输出：!bc
```

```cjs
const { Buffer } = require('node:buffer');

// 创建一个包含 ASCII 字母表的 Buffer，获取一个切片，并修改原始 Buffer 中的一个字节。

const buf1 = Buffer.allocUnsafe(26);

for (let i = 0; i < 26; i++) {
  // 97 是 'a' 的十进制 ASCII 值。
  buf1[i] = i + 97;
}

const buf2 = buf1.subarray(0, 3);

console.log(buf2.toString('ascii', 0, buf2.length));
// 输出：abc

buf1[0] = 33;

console.log(buf2.toString('ascii', 0, buf2.length));
// 输出：!bc
```

指定负索引会导致切片相对于 `buf` 的末尾而不是开头生成。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from('buffer');

console.log(buf.subarray(-6, -1).toString());
// 输出：buffe
// （相当于 buf.subarray(0, 5)。）

console.log(buf.subarray(-6, -2).toString());
// 输出：buff
// （相当于 buf.subarray(0, 4)。）

console.log(buf.subarray(-5, -2).toString());
// 输出：uff
// （相当于 buf.subarray(1, 4)。）
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from('buffer');

console.log(buf.subarray(-6, -1).toString());
// 输出：buffe
// （相当于 buf.subarray(0, 5)。）

console.log(buf.subarray(-6, -2).toString());
// 输出：buff
// （相当于 buf.subarray(0, 4)。）

console.log(buf.subarray(-5, -2).toString());
// 输出：uff
// （相当于 buf.subarray(1, 4)。）
```

### `buf.slice([start[, end]])`

<!-- YAML
added: v0.3.0
changes:
  - version:
    - v17.5.0
    - v16.15.0
    pr-url: https://github.com/nodejs/node/pull/41596
    description: buf.slice() 方法已被弃用。
  - version:
    - v7.1.0
    - v6.9.2
    pr-url: https://github.com/nodejs/node/pull/9341
    description: 将偏移量强制转换为整数现在可以正确处理 32 位整数范围之外的值。
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/9101
    description: 所有偏移量现在在进行任何计算之前都会被强制转换为整数。
-->

> 稳定性：0 - 已弃用：请改用 [`buf.subarray`][]。

* `start` {integer} 新 `Buffer` 的起始位置。**默认值：** `0`。
* `end` {integer} 新 `Buffer` 的结束位置（不包含）。**默认值：** [`buf.length`][]。
* 返回值：{Buffer}

返回一个新的 `Buffer`，它引用与原始对象相同的内存，但由 `start` 和 `end` 索引进行偏移和裁剪。

此方法与 `Uint8Array.prototype.slice()` 不兼容，后者是 `Buffer` 的超类。要复制切片，请使用 `Uint8Array.prototype.slice()`。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from('buffer');

const copiedBuf = Uint8Array.prototype.slice.call(buf);
copiedBuf[0]++;
console.log(copiedBuf.toString());
// 输出：cuffer

console.log(buf.toString());
// 输出：buffer

// 使用 buf.slice() 时，原始 buffer 会被修改。
const notReallyCopiedBuf = buf.slice();
notReallyCopiedBuf[0]++;
console.log(notReallyCopiedBuf.toString());
// 输出：cuffer
console.log(buf.toString());
// 也输出：cuffer (!)
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from('buffer');

const copiedBuf = Uint8Array.prototype.slice.call(buf);
copiedBuf[0]++;
console.log(copiedBuf.toString());
// 输出：cuffer

console.log(buf.toString());
// 输出：buffer

// 使用 buf.slice() 时，原始 buffer 会被修改。
const notReallyCopiedBuf = buf.slice();
notReallyCopiedBuf[0]++;
console.log(notReallyCopiedBuf.toString());
// 输出：cuffer
console.log(buf.toString());
// 也输出：cuffer (!)
```

### `buf.swap16()`

<!-- YAML
added: v5.10.0
-->

* 返回值：{Buffer} 对 `buf` 的引用。

将 `buf` 解释为无符号 16 位整数数组，并就地交换字节顺序。如果 [`buf.length`][] 不是 2 的倍数，则抛出 [`ERR_INVALID_BUFFER_SIZE`][]。

```mjs
import { Buffer } from 'node:buffer';

const buf1 = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8]);

console.log(buf1);
// 输出：<Buffer 01 02 03 04 05 06 07 08>

buf1.swap16();

console.log(buf1);
// 输出：<Buffer 02 01 04 03 06 05 08 07>

const buf2 = Buffer.from([0x1, 0x2, 0x3]);

buf2.swap16();
// 抛出 ERR_INVALID_BUFFER_SIZE。
```

```cjs
const { Buffer } = require('node:buffer');

const buf1 = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8]);

console.log(buf1);
// 输出：<Buffer 01 02 03 04 05 06 07 08>

buf1.swap16();

console.log(buf1);
// 输出：<Buffer 02 01 04 03 06 05 08 07>

const buf2 = Buffer.from([0x1, 0x2, 0x3]);

buf2.swap16();
// 抛出 ERR_INVALID_BUFFER_SIZE。
```

`buf.swap16()` 的一个方便用途是在 UTF-16 小端和 UTF-16 大端之间执行快速就地转换：

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from('This is little-endian UTF-16', 'utf16le');
buf.swap16(); // 转换为大端 UTF-16 文本。
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from('This is little-endian UTF-16', 'utf16le');
buf.swap16(); // 转换为大端 UTF-16 文本。
```

### `buf.swap32()`

<!-- YAML
added: v5.10.0
-->

* 返回值：{Buffer} 对 `buf` 的引用。

将 `buf` 解释为无符号 32 位整数数组，并就地交换字节顺序。如果 [`buf.length`][] 不是 4 的倍数，则抛出 [`ERR_INVALID_BUFFER_SIZE`][]。

```mjs
import { Buffer } from 'node:buffer';

const buf1 = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8]);

console.log(buf1);
// 输出：<Buffer 01 02 03 04 05 06 07 08>

buf1.swap32();

console.log(buf1);
// 输出：<Buffer 04 03 02 01 08 07 06 05>

const buf2 = Buffer.from([0x1, 0x2, 0x3]);

buf2.swap32();
// 抛出 ERR_INVALID_BUFFER_SIZE。
```

```cjs
const { Buffer } = require('node:buffer');

const buf1 = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8]);

console.log(buf1);
// 输出：<Buffer 01 02 03 04 05 06 07 08>

buf1.swap32();

console.log(buf1);
// 输出：<Buffer 04 03 02 01 08 07 06 05>

const buf2 = Buffer.from([0x1, 0x2, 0x3]);

buf2.swap32();
// 抛出 ERR_INVALID_BUFFER_SIZE。
```

### `buf.swap64()`

<!-- YAML
added: v6.3.0
-->

* 返回值：{Buffer} 对 `buf` 的引用。

将 `buf` 解释为 64 位数字数组，并就地交换字节顺序。如果 [`buf.length`][] 不是 8 的倍数，则抛出 [`ERR_INVALID_BUFFER_SIZE`][]。

```mjs
import { Buffer } from 'node:buffer';

const buf1 = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8]);

console.log(buf1);
// 输出：<Buffer 01 02 03 04 05 06 07 08>

buf1.swap64();

console.log(buf1);
// 输出：<Buffer 08 07 06 05 04 03 02 01>

const buf2 = Buffer.from([0x1, 0x2, 0x3]);

buf2.swap64();
// 抛出 ERR_INVALID_BUFFER_SIZE。
```

```cjs
const { Buffer } = require('node:buffer');

const buf1 = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8]);

console.log(buf1);
// 输出：<Buffer 01 02 03 04 05 06 07 08>

buf1.swap64();

console.log(buf1);
// 输出：<Buffer 08 07 06 05 04 03 02 01>

const buf2 = Buffer.from([0x1, 0x2, 0x3]);

buf2.swap64();
// 抛出 ERR_INVALID_BUFFER_SIZE。
```

### `buf.toJSON()`

<!-- YAML
added: v0.9.2
-->

* 返回值：{Object}

返回 `buf` 的 JSON 表示。[`JSON.stringify()`][] 在字符串化 `Buffer` 实例时会隐式调用此函数。

`Buffer.from()` 接受此方法返回格式的对象。特别是，`Buffer.from(buf.toJSON())` 的作用类似于 `Buffer.from(buf)`。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
const json = JSON.stringify(buf);

console.log(json);
// 输出：{"type":"Buffer","data":[1,2,3,4,5]}

const copy = JSON.parse(json, (key, value) => {
  return value && value.type === 'Buffer' ?
    Buffer.from(value) :
    value;
});

console.log(copy);
// 输出：<Buffer 01 02 03 04 05>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
const json = JSON.stringify(buf);

console.log(json);
// 输出：{"type":"Buffer","data":[1,2,3,4,5]}

const copy = JSON.parse(json, (key, value) => {
  return value && value.type === 'Buffer' ?
    Buffer.from(value) :
    value;
});

console.log(copy);
// 输出：<Buffer 01 02 03 04 05>
```

### `buf.toString([encoding[, start[, end]]])`

<!-- YAML
added: v0.1.90
changes:
  - version:
     - v25.5.0
     - v24.13.1
    pr-url: https://github.com/nodejs/node/pull/56578
    description: 支持 Uint8Array 作为 this 值。
-->

* `encoding` {string} 要使用的字符编码。**默认值：** `'utf8'`。
* `start` {integer} 开始解码的字节偏移量。**默认值：** `0`。
* `end` {integer} 停止解码的字节偏移量（不包含）。**默认值：** [`buf.length`][]。
* 返回值：{string}

根据 `encoding` 中指定的字符编码将 `buf` 解码为字符串。可以传递 `start` 和 `end` 来仅解码 `buf` 的子集。

如果 `encoding` 是 `'utf8'` 且输入中的字节序列不是有效的 UTF-8，则每个无效字节将被替换为替换字符 `U+FFFD`。

字符串实例的最大长度（以 UTF-16 代码单元为单位）可作为 [`buffer.constants.MAX_STRING_LENGTH`][] 获取。

```mjs
import { Buffer } from 'node:buffer';

const buf1 = Buffer.allocUnsafe(26);

for (let i = 0; i < 26; i++) {
  // 97 是 'a' 的十进制 ASCII 值。
  buf1[i] = i + 97;
}

console.log(buf1.toString('utf8'));
// 输出：abcdefghijklmnopqrstuvwxyz
console.log(buf1.toString('utf8', 0, 5));
// 输出：abcde

const buf2 = Buffer.from('tést');

console.log(buf2.toString('hex'));
// 输出：74c3a97374
console.log(buf2.toString('utf8', 0, 3));
// 输出：té
console.log(buf2.toString(undefined, 0, 3));
// 输出：té
```

```cjs
const { Buffer } = require('node:buffer');

const buf1 = Buffer.allocUnsafe(26);

for (let i = 0; i < 26; i++) {
  // 97 是 'a' 的十进制 ASCII 值。
  buf1[i] = i + 97;
}

console.log(buf1.toString('utf8'));
// 输出：abcdefghijklmnopqrstuvwxyz
console.log(buf1.toString('utf8', 0, 5));
// 输出：abcde

const buf2 = Buffer.from('tést');

console.log(buf2.toString('hex'));
// 输出：74c3a97374
console.log(buf2.toString('utf8', 0, 3));
// 输出：té
console.log(buf2.toString(undefined, 0, 3));
// 输出：té
```

### `buf.values()`

<!-- YAML
added: v1.1.0
-->

* 返回值：{Iterator}

创建并返回一个用于 `buf` 值（字节）的 [iterator][]。当 `Buffer` 在 `for..of` 语句中使用时，此函数会自动调用。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.from('buffer');

for (const value of buf.values()) {
  console.log(value);
}
// 打印：
//   98
//   117
//   102
//   102
//   101
//   114

for (const value of buf) {
  console.log(value);
}
// 打印：
//   98
//   117
//   102
//   102
//   101
//   114
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.from('buffer');

for (const value of buf.values()) {
  console.log(value);
}
// 打印：
//   98
//   117
//   102
//   102
//   101
//   114

for (const value of buf) {
  console.log(value);
}
// 打印：
//   98
//   117
//   102
//   102
//   101
//   114
```

### `buf.write(string[, offset[, length]][, encoding])`

<!-- YAML
added: v0.1.90
changes:
  - version:
     - v25.5.0
     - v24.13.1
    pr-url: https://github.com/nodejs/node/pull/56578
    description: 支持 Uint8Array 作为 this 值。
-->

* `string` {string} 要写入 `buf` 的字符串。
* `offset` {integer} 开始写入 `string` 前要跳过的字节数。**默认值：** `0`。
* `length` {integer} 要写入的字节数。**默认值：** `buf.length - offset`。
* `encoding` {string} `string` 的字符编码。**默认值：** `'utf8'`。
* 返回值：{integer} 写入的字节数。

根据 `encoding` 中的字符编码将 `string` 写入 `buf` 的 `offset` 处。`length` 参数是要写入的字节数。如果 `buf` 没有足够的空间容纳整个字符串，则只会写入字符串的一部分。但是，部分编码的字符不会被写入。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.alloc(256);

const len = buf.write('\u00bd + \u00bc = \u00be', 0);

console.log(`${len} bytes: ${buf.toString('utf8', 0, len)}`);
// 打印：12 bytes: ½ + ¼ = ¾

const buffer = Buffer.alloc(10);

const length = buffer.write('abcd', 8);

console.log(`${length} bytes: ${buffer.toString('utf8', 8, 10)}`);
// 打印：2 bytes : ab
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.alloc(256);

const len = buf.write('\u00bd + \u00bc = \u00be', 0);

console.log(`${len} bytes: ${buf.toString('utf8', 0, len)}`);
// 打印：12 bytes: ½ + ¼ = ¾

const buffer = Buffer.alloc(10);

const length = buffer.write('abcd', 8);

console.log(`${length} bytes: ${buffer.toString('utf8', 8, 10)}`);
// 打印：2 bytes : ab
```

### `buffer.writeBigInt64BE()`

<!-- YAML
added:
 - v12.0.0
 - v10.20.0
-->

* `value` {bigint} 要写入 `buffer` 的数值。
* `offset` {integer} 开始写入前要跳过的字节数。必须满足：`0 <= offset <= buffer.length - 8`。**默认值：** `0`。
* 返回值：{integer} `offset` 加上写入的字节数。

将 `value` 以大端格式写入 `buffer` 的指定 `offset` 处。

`value` 会被解释并写入为二进制补码有符号整数。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.allocUnsafe(8);

buf.writeBigInt64BE(0x0102030405060708n, 0);

console.log(buf);
// 打印：<Buffer 01 02 03 04 05 06 07 08>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.allocUnsafe(8);

buf.writeBigInt64BE(0x0102030405060708n, 0);

console.log(buf);
// 打印：<Buffer 01 02 03 04 05 06 07 08>
```

### `bigint` 的写入方法

<!-- YAML
added:
 - v12.0.0
 - v10.20.0
-->

* `value` {bigint} 要写入 `buffer` 的数字。
* `offset` {integer} 开始写入前要跳过的字节数。必须满足：`0 <= offset <= buffer.length - 8`。**默认值：** `0`。
* 返回值：{integer} `offset` 加上写入的字节数。

将 `value` 以小端格式写入 `buffer` 的指定 `offset` 处。

`value` 被解释并写入为二进制补码有符号整数。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.allocUnsafe(8);

buf.writeBigInt64LE(0x0102030405060708n, 0);

console.log(buf);
// 打印：<Buffer 08 07 06 05 04 03 02 01>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.allocUnsafe(8);

buf.writeBigInt64LE(0x0102030405060708n, 0);

console.log(buf);
// 打印：<Buffer 08 07 06 05 04 03 02 01>
```

### `buf.writeBigUInt64BE(value[, offset])`

<!-- YAML
added:
 - v12.0.0
 - v10.20.0
changes:
  - version:
    - v14.10.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/34960
    description: 此函数也可通过 buf.writeBigUint64BE() 使用。
-->

* `value` {bigint} 要写入 `buf` 的数字。
* `offset` {integer} 开始写入前要跳过的字节数。必须满足：`0 <= offset <= buf.length - 8`。**默认值：** `0`。
* 返回值：{integer} `offset` 加上写入的字节数。

以大端字节序格式将 `value` 写入 `buf` 中指定的 `offset` 位置。

此函数也可通过 `writeBigUint64BE` 别名使用。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.allocUnsafe(8);

buf.writeBigUInt64BE(0xdecafafecacefaden, 0);

console.log(buf);
// 输出：<Buffer de ca fa fe ca ce fa de>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.allocUnsafe(8);

buf.writeBigUInt64BE(0xdecafafecacefaden, 0);

console.log(buf);
// 输出：<Buffer de ca fa fe ca ce fa de>
```

### `buf.writeBigUInt64LE(value[, offset])`

<!-- YAML
added:
 - v12.0.0
 - v10.20.0
changes:
  - version:
    - v14.10.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/34960
    description: 此函数也可作为 buf.writeBigUint64LE() 使用。
-->

* `value` {bigint} 要写入 `buf` 的值。
* `offset` {integer} 开始写入前要跳过的字节数。必须满足：`0 <= offset <= buf.length - 8`。**默认值：** `0`。
* 返回值：{integer} `offset` 加上写入的字节数。

将 `value` 以小端格式写入 `buf` 的指定 `offset` 处。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.allocUnsafe(8);

buf.writeBigUInt64LE(0xdecafafecacefaden, 0);

console.log(buf);
// 打印：<Buffer de fa ce ca fe fa ca de>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.allocUnsafe(8);

buf.writeBigUInt64LE(0xdecafafecacefaden, 0);

console.log(buf);
// 打印：<Buffer de fa ce ca fe fa ca de>
```

此函数也可通过 `writeBigUint64LE` 别名使用。

### `buf.writeDoubleBE(value[, offset])`

<!-- YAML
added: v0.11.15
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18395
    description: 移除了 noAssert，并且不再将 offset 隐式强制转换为 uint32。
-->

* `value` {number} 要写入 `buf` 的数字。
* `offset` {integer} 开始写入前要跳过的字节数。必须满足 `0 <= offset <= buf.length - 8`。**默认值：** `0`。
* 返回：{integer} `offset` 加上写入的字节数。

以大端序将 `value` 写入 `buf` 中指定的 `offset` 处。`value` 必须是 JavaScript 数字。当 `value` 不是 JavaScript 数字时，行为未定义。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.allocUnsafe(8);

buf.writeDoubleBE(123.456, 0);

console.log(buf);
// 输出：<Buffer 40 5e dd 2f 1a 9f be 77>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.allocUnsafe(8);

buf.writeDoubleBE(123.456, 0);

console.log(buf);
// 输出：<Buffer 40 5e dd 2f 1a 9f be 77>
```

### `buf.writeDoubleLE(value[, offset])`

<!-- YAML
added: v0.11.15
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18395
    description: 移除了 noAssert，并且不再将 offset 隐式强制转换为 uint32。
-->

* `value` {number} 要写入 `buf` 的数字。
* `offset` {integer} 开始写入前要跳过的字节数。必须满足 `0 <= offset <= buf.length - 8`。**默认值：** `0`。
* 返回值：{integer} `offset` 加上写入的字节数。

将 `value` 以小端格式写入 `buf` 的指定 `offset` 处。`value` 必须是 JavaScript 数字。当 `value` 不是 JavaScript 数字时，行为未定义。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.allocUnsafe(8);

buf.writeDoubleLE(123.456, 0);

console.log(buf);
// 打印：<Buffer 77 be 9f 1a 2f dd 5e 40>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.allocUnsafe(8);

buf.writeDoubleLE(123.456, 0);

console.log(buf);
// 打印：<Buffer 77 be 9f 1a 2f dd 5e 40>
```

### `buf.writeFloatBE(value[, offset])`

<!-- YAML
added: v0.11.15
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18395
    description: 移除了 noAssert，并且不再将 offset 隐式强制转换为 uint32。
-->

* `value` {number} 要写入 `buf` 的数字。
* `offset` {integer} 开始写入前要跳过的字节数。必须满足 `0 <= offset <= buf.length - 4`。**默认值：** `0`。
* 返回值：{integer} `offset` 加上写入的字节数。

将 `value` 以大端格式写入 `buf` 的指定 `offset` 处。当 `value` 不是 JavaScript 数字时，行为未定义。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.allocUnsafe(4);

buf.writeFloatBE(0xcafebabe, 0);

console.log(buf);
// 打印：<Buffer 4f 4a fe bb>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.allocUnsafe(4);

buf.writeFloatBE(0xcafebabe, 0);

console.log(buf);
// 打印：<Buffer 4f 4a fe bb>
```

### `buf.writeFloatLE(value[, offset])`

<!-- YAML
added: v0.11.15
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18395
    description: 已移除 `noAssert`，且不再隐式将 offset 强制转换为 `uint32`。
-->

* `value` {number} 要写入 `buf` 的数字。
* `offset` {integer} 开始写入前要跳过的字节数。必须
  满足 `0 <= offset <= buf.length - 4`。**默认值：** `0`。
* 返回：{integer} `offset` 加上已写入的字节数。

将 `value` 以小端序写入 `buf` 中指定的 `offset` 处。当 `value` 不是 JavaScript 数字时，行为未定义。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.allocUnsafe(4);

buf.writeFloatLE(0xcafebabe, 0);

console.log(buf);
// 输出：<Buffer bb fe 4a 4f>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.allocUnsafe(4);

buf.writeFloatLE(0xcafebabe, 0);

console.log(buf);
// 输出：<Buffer bb fe 4a 4f>
```

### `buf.writeInt8(value[, offset])`

<!-- YAML
added: v0.5.0
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18395
    description: 已移除 `noAssert`，且不再隐式将 offset 强制转换为 `uint32`。
-->

* `value` {integer} 要写入 `buf` 的数字。
* `offset` {integer} 开始写入之前要跳过的字节数。必须
  满足 `0 <= offset <= buf.length - 1`。**默认值：** `0`。
* 返回：{integer} `offset` 加上已写入的字节数。

将 `value` 写入 `buf` 中指定的 `offset` 处。`value` 必须是有效的
有符号 8 位整数。当 `value` 不是有符号 8 位整数时，行为未定义。

`value` 被解释并写入为补码有符号整数。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.allocUnsafe(2);

buf.writeInt8(2, 0);
buf.writeInt8(-2, 1);

console.log(buf);
// 输出：<Buffer 02 fe>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.allocUnsafe(2);

buf.writeInt8(2, 0);
buf.writeInt8(-2, 1);

console.log(buf);
// 输出：<Buffer 02 fe>
```

### `buf.writeInt16BE(value[, offset])`

<!-- YAML
added: v0.5.5
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18395
    description: 已移除 `noAssert`，且不再隐式将 offset 强制转换为 `uint32`。
-->

* `value` {integer} 要写入 `buf` 的数字。
* `offset` {integer} 开始写入之前要跳过的字节数。必须
  满足 `0 <= offset <= buf.length - 2`。**默认值：** `0`。
* 返回：{integer} `offset` 加上已写入的字节数。

将 `value` 以大端序写入 `buf` 中指定的 `offset` 处。`value`
必须是有效的有符号 16 位整数。当 `value` 不是有符号 16 位整数时，
行为未定义。

`value` 被解释并写入为补码有符号整数。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.allocUnsafe(2);

buf.writeInt16BE(0x0102, 0);

console.log(buf);
// 输出：<Buffer 01 02>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.allocUnsafe(2);

buf.writeInt16BE(0x0102, 0);

console.log(buf);
// 输出：<Buffer 01 02>
```

### `buf.writeInt16LE(value[, offset])`

<!-- YAML
added: v0.5.5
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18395
    description: 已移除 `noAssert`，且不再隐式将 offset 强制转换为 `uint32`。
-->

* `value` {integer} 要写入 `buf` 的数字。
* `offset` {integer} 开始写入之前要跳过的字节数。必须
  满足 `0 <= offset <= buf.length - 2`。**默认值：** `0`。
* 返回：{integer} `offset` 加上已写入的字节数。

将 `value` 以小端序写入 `buf` 中指定的 `offset` 处。`value`
必须是有效的有符号 16 位整数。当 `value` 不是有符号 16 位整数时，
行为未定义。

`value` 被解释并写入为补码有符号整数。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.allocUnsafe(2);

buf.writeInt16LE(0x0304, 0);

console.log(buf);
// 输出：<Buffer 04 03>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.allocUnsafe(2);

buf.writeInt16LE(0x0304, 0);

console.log(buf);
// 输出：<Buffer 04 03>
```

### `buf.writeInt32BE(value[, offset])`

<!-- YAML
added: v0.5.5
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18395
    description: 已移除 `noAssert`，且不再隐式将 offset 强制转换为 `uint32`。
-->

* `value` {integer} 要写入 `buf` 的数字。
* `offset` {integer} 开始写入之前要跳过的字节数。必须
  满足 `0 <= offset <= buf.length - 4`。**默认值：** `0`。
* 返回：{integer} `offset` 加上已写入的字节数。

将 `value` 以大端序写入 `buf` 中指定的 `offset` 处。`value`
必须是有效的有符号 32 位整数。当 `value` 不是有符号 32 位整数时，
行为未定义。

`value` 被解释并写入为补码有符号整数。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.allocUnsafe(4);

buf.writeInt32BE(0x01020304, 0);

console.log(buf);
// 输出：<Buffer 01 02 03 04>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.allocUnsafe(4);

buf.writeInt32BE(0x01020304, 0);

console.log(buf);
// 输出：<Buffer 01 02 03 04>
```

### `buf.writeInt32LE(value[, offset])`

<!-- YAML
added: v0.5.5
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18395
    description: 已移除 `noAssert`，且不再隐式将 offset 强制转换为 `uint32`。
-->

* `value` {integer} 要写入 `buf` 的数字。
* `offset` {integer} 开始写入之前要跳过的字节数。必须
  满足 `0 <= offset <= buf.length - 4`。**默认值：** `0`。
* 返回：{integer} `offset` 加上已写入的字节数。

将 `value` 以小端序写入 `buf` 中指定的 `offset` 处。`value`
必须是有效的有符号 32 位整数。当 `value` 不是有符号 32 位整数时，
行为未定义。

`value` 被解释并写入为补码有符号整数。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.allocUnsafe(4);

buf.writeInt32LE(0x05060708, 0);

console.log(buf);
// 输出：<Buffer 08 07 06 05>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.allocUnsafe(4);

buf.writeInt32LE(0x05060708, 0);

console.log(buf);
// 输出：<Buffer 08 07 06 05>
```

### `buf.writeIntBE(value, offset, byteLength)`

<!-- YAML
added: v0.11.15
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18395
    description: 已移除 `noAssert`，且不再隐式将 offset 和 `byteLength` 强制转换为 `uint32`。
-->

* `value` {integer} 要写入 `buf` 的数字。
* `offset` {integer} 开始写入之前要跳过的字节数。必须
  满足 `0 <= offset <= buf.length - byteLength`。
* `byteLength` {integer} 要写入的字节数。必须满足
  `0 < byteLength <= 6`。
* 返回：{integer} `offset` 加上已写入的字节数。

将 `value` 的 `byteLength` 字节以大端序写入 `buf` 中指定的 `offset`
处。支持高达 48 位的精度。当 `value` 不是有符号整数时，
行为未定义。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.allocUnsafe(6);

buf.writeIntBE(0x1234567890ab, 0, 6);

console.log(buf);
// 输出：<Buffer 12 34 56 78 90 ab>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.allocUnsafe(6);

buf.writeIntBE(0x1234567890ab, 0, 6);

console.log(buf);
// 输出：<Buffer 12 34 56 78 90 ab>
```

### `buf.writeIntLE(value, offset, byteLength)`

<!-- YAML
added: v0.11.15
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18395
    description: 已移除 `noAssert`，且不再隐式将 offset 和 `byteLength` 强制转换为 `uint32`。
-->

* `value` {integer} 要写入 `buf` 的数字。
* `offset` {integer} 开始写入之前要跳过的字节数。必须
  满足 `0 <= offset <= buf.length - byteLength`。
* `byteLength` {integer} 要写入的字节数。必须满足
  `0 < byteLength <= 6`。
* 返回：{integer} `offset` 加上已写入的字节数。

将 `value` 的 `byteLength` 字节以小端序写入 `buf` 中指定的 `offset`
处。支持高达 48 位的精度。当 `value` 不是有符号整数时，
行为未定义。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.allocUnsafe(6);

buf.writeIntLE(0x1234567890ab, 0, 6);

console.log(buf);
// 输出：<Buffer ab 90 78 56 34 12>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.allocUnsafe(6);

buf.writeIntLE(0x1234567890ab, 0, 6);

console.log(buf);
// 输出：<Buffer ab 90 78 56 34 12>
```

### `buf.writeUInt8(value[, offset])`

<!-- YAML
added: v0.5.0
changes:
  - version:
    - v14.9.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/34729
    description: 此函数也可通过 `buf.writeUint8()` 使用。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18395
    description: "`noAssert` 已被移除，并且不再将 `offset` 隐式强制转换为 `uint32`。"
-->

* `value` {integer} 要写入 `buf` 的数字。
* `offset` {integer} 开始写入 `buf` 前要跳过的字节数。必须满足
  `0 <= offset <= buf.length - 1`。**默认值：** `0`。
* 返回：{integer} `offset` 加上已写入的字节数。

将 `value` 写入 `buf` 中指定的 `offset` 处。`value` 必须是有效的
无符号 8 位整数。当 `value` 为无符号 8 位整数以外的任何值时，行为是未定义的。

此函数也可通过 `writeUint8` 使用。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.allocUnsafe(4);

buf.writeUInt8(0x3, 0);
buf.writeUInt8(0x4, 1);
buf.writeUInt8(0x23, 2);
buf.writeUInt8(0x42, 3);

console.log(buf);
// 输出：<Buffer 03 04 23 42>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.allocUnsafe(4);

buf.writeUInt8(0x3, 0);
buf.writeUInt8(0x4, 1);
buf.writeUInt8(0x23, 2);
buf.writeUInt8(0x42, 3);

console.log(buf);
// 输出：<Buffer 03 04 23 42>
```

### `buf.writeUInt16BE(value[, offset])`

<!-- YAML
added: v0.5.5
changes:
  - version:
    - v14.9.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/34729
    description: 此函数也可使用 `buf.writeUint16BE()`。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18395
    description: 已移除 `noAssert`，且不再隐式将 offset 强制转换为 `uint32`。
-->

* `value` {integer} 要写入 `buf` 的数字。
* `offset` {integer} 开始写入之前要跳过的字节数。必须
  满足 `0 <= offset <= buf.length - 2`。**默认值：** `0`。
* 返回：{integer} `offset` 加上已写入的字节数。

将 `value` 以大端序写入 `buf` 中指定的 `offset` 处。`value`
必须是有效的无符号 16 位整数。当 `value`
不是无符号 16 位整数时，行为未定义。

此函数也可使用 `writeUint16BE` 别名。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.allocUnsafe(4);

buf.writeUInt16BE(0xdead, 0);
buf.writeUInt16BE(0xbeef, 2);

console.log(buf);
// 输出：<Buffer de ad be ef>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.allocUnsafe(4);

buf.writeUInt16BE(0xdead, 0);
buf.writeUInt16BE(0xbeef, 2);

console.log(buf);
// 输出：<Buffer de ad be ef>
```

### `buf.writeUInt16LE(value[, offset])`

<!-- YAML
added: v0.5.5
changes:
  - version:
    - v14.9.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/34729
    description: 此函数也可使用 `buf.writeUint16LE()`。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18395
    description: 已移除 `noAssert`，且不再隐式将 offset 强制转换为 `uint32`。
-->

* `value` {integer} 要写入 `buf` 的数字。
* `offset` {integer} 开始写入之前要跳过的字节数。必须
  满足 `0 <= offset <= buf.length - 2`。**默认值：** `0`。
* 返回：{integer} `offset` 加上已写入的字节数。

将 `value` 以小端序写入 `buf` 中指定的 `offset` 处。`value`
必须是有效的无符号 16 位整数。当 `value` 不是
无符号 16 位整数时，行为未定义。

此函数也可使用 `writeUint16LE` 别名。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.allocUnsafe(4);

buf.writeUInt16LE(0xdead, 0);
buf.writeUInt16LE(0xbeef, 2);

console.log(buf);
// 输出：<Buffer ad de ef be>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.allocUnsafe(4);

buf.writeUInt16LE(0xdead, 0);
buf.writeUInt16LE(0xbeef, 2);

console.log(buf);
// 输出：<Buffer ad de ef be>
```

### `buf.writeUInt32BE(value[, offset])`

<!-- YAML
added: v0.5.5
changes:
  - version:
    - v14.9.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/34729
    description: 此函数也可使用 `buf.writeUint32BE()`。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18395
    description: 已移除 `noAssert`，且不再隐式将 offset 强制转换为 `uint32`。
-->

* `value` {integer} 要写入 `buf` 的数字。
* `offset` {integer} 开始写入之前要跳过的字节数。必须
  满足 `0 <= offset <= buf.length - 4`。**默认值：** `0`。
* 返回：{integer} `offset` 加上已写入的字节数。

将 `value` 以大端序写入 `buf` 中指定的 `offset` 处。`value`
必须是有效的无符号 32 位整数。当 `value`
不是无符号 32 位整数时，行为未定义。

此函数也可使用 `writeUint32BE` 别名。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.allocUnsafe(4);

buf.writeUInt32BE(0xfeedface, 0);

console.log(buf);
// 输出：<Buffer fe ed fa ce>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.allocUnsafe(4);

buf.writeUInt32BE(0xfeedface, 0);

console.log(buf);
// 输出：<Buffer fe ed fa ce>
```

### `buf.writeUInt32LE(value[, offset])`

<!-- YAML
added: v0.5.5
changes:
  - version:
    - v14.9.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/34729
    description: 此函数也可以用作 `buf.writeUint32LE()`。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18395
    description: "`noAssert` 已被移除，并且 `offset` 不再隐式强制转换为 `uint32`。"
-->

* `value` {integer} 要写入 `buf` 的数字。
* `offset` {integer} 开始写入前要跳过的字节数。必须满足
  `0 <= offset <= buf.length - 4`。**默认值：** `0`。
* 返回：{integer} `offset` 加上写入的字节数。

以小端格式将 `value` 写入 `buf` 中指定的 `offset` 位置。`value`
必须是有效的无符号 32 位整数。当 `value` 不是无符号 32 位整数时，行为未定义。

此函数也可以用作 `writeUint32LE`。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.allocUnsafe(4);

buf.writeUInt32LE(0xfeedface, 0);

console.log(buf);
// 输出：<Buffer ce fa ed fe>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.allocUnsafe(4);

buf.writeUInt32LE(0xfeedface, 0);

console.log(buf);
// 输出：<Buffer ce fa ed fe>
```

### `buf.writeUIntBE(value, offset, byteLength)`

<!-- YAML
added: v0.5.5
changes:
  - version:
    - v14.9.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/34729
    description: 此函数也可使用 `buf.writeUintBE()`。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18395
    description: 已移除 `noAssert`，且不再隐式将 offset 和 `byteLength` 强制转换为 `uint32`。
-->

* `value` {integer} 要写入 `buf` 的数字。
* `offset` {integer} 开始写入之前要跳过的字节数。必须
  满足 `0 <= offset <= buf.length - byteLength`。
* `byteLength` {integer} 要写入的字节数。必须满足
  `0 < byteLength <= 6`。
* 返回：{integer} `offset` 加上已写入的字节数。

将 `value` 的 `byteLength` 字节以大端序写入 `buf` 中指定的 `offset`
处。支持高达 48 位的精度。当 `value` 不是无符号整数时，
行为未定义。

此函数也可使用 `writeUintBE` 别名。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.allocUnsafe(6);

buf.writeUIntBE(0x1234567890ab, 0, 6);

console.log(buf);
// 输出：<Buffer 12 34 56 78 90 ab>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.allocUnsafe(6);

buf.writeUIntBE(0x1234567890ab, 0, 6);

console.log(buf);
// 输出：<Buffer 12 34 56 78 90 ab>
```

### `buf.writeUIntLE(value, offset, byteLength)`

<!-- YAML
added: v0.5.5
changes:
  - version:
    - v14.9.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/34729
    description: 此函数也可使用 `buf.writeUintLE()`。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18395
    description: 已移除 `noAssert`，且不再隐式将 offset 和 `byteLength` 强制转换为 `uint32`。
-->

* `value` {integer} 要写入 `buf` 的数字。
* `offset` {integer} 开始写入之前要跳过的字节数。必须
  满足 `0 <= offset <= buf.length - byteLength`。
* `byteLength` {integer} 要写入的字节数。必须满足
  `0 < byteLength <= 6`。
* 返回：{integer} `offset` 加上已写入的字节数。

将 `value` 的 `byteLength` 字节以小端序写入 `buf` 中指定的 `offset`
处。支持高达 48 位的精度。当 `value` 不是无符号整数时，
行为未定义。

此函数也可使用 `writeUintLE` 别名。

```mjs
import { Buffer } from 'node:buffer';

const buf = Buffer.allocUnsafe(6);

buf.writeUIntLE(0x1234567890ab, 0, 6);

console.log(buf);
// 输出：<Buffer ab 90 78 56 34 12>
```

```cjs
const { Buffer } = require('node:buffer');

const buf = Buffer.allocUnsafe(6);

buf.writeUIntLE(0x1234567890ab, 0, 6);

console.log(buf);
// 输出：<Buffer ab 90 78 56 34 12>
```

### `new Buffer(array)`

<!-- YAML
deprecated: v6.0.0
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/19524
    description: "在 `node_modules` 目录外的代码中运行时，调用此构造函数会发出弃用警告。"
  - version: v7.2.1
    pr-url: https://github.com/nodejs/node/pull/9529
    description: 调用此构造函数不再发出弃用警告。
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/8169
    description: 调用此构造函数现在会发出弃用警告。
-->

> 稳定性：0 - 已弃用：请使用 [`Buffer.from(array)`][] 代替。

* `array` {integer\[]} 要复制的字节数组。

参见 [`Buffer.from(array)`][]。

### `new Buffer(arrayBuffer[, byteOffset[, length]])`

<!-- YAML
added: v3.0.0
deprecated: v6.0.0
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/19524
    description: "在 `node_modules` 目录外的代码中运行时，调用此构造函数会发出弃用警告。"
  - version: v7.2.1
    pr-url: https://github.com/nodejs/node/pull/9529
    description: 调用此构造函数不再发出弃用警告。
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/8169
    description: 调用此构造函数现在会发出弃用警告。
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/4682
    description: "`byteOffset` 和 `length` 参数现在受支持。"
-->

> 稳定性：0 - 已弃用：请使用
> [`Buffer.from(arrayBuffer[, byteOffset[, length]])`][`Buffer.from(arrayBuf)`]
> 代替。

* `arrayBuffer` {ArrayBuffer|SharedArrayBuffer} 一个 {ArrayBuffer}、
  {SharedArrayBuffer} 或 {TypedArray} 的 `.buffer` 属性。
* `byteOffset` {integer} 要暴露的第一个字节的索引。**默认值：** `0`。
* `length` {integer} 要暴露的字节数。
  **默认值：** `arrayBuffer.byteLength - byteOffset`。

参见
[`Buffer.from(arrayBuffer[, byteOffset[, length]])`][`Buffer.from(arrayBuf)`]

### `new Buffer(buffer)`

<!-- YAML
deprecated: v6.0.0
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/19524
    description: "在 `node_modules` 目录外的代码中运行时，调用此构造函数会发出弃用警告。"
  - version: v7.2.1
    pr-url: https://github.com/nodejs/node/pull/9529
    description: 调用此构造函数不再发出弃用警告。
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/8169
    description: 调用此构造函数现在会发出弃用警告。
-->

> 稳定性：0 - 已弃用：请使用 [`Buffer.from(buffer)`][] 代替。

* `buffer` {Buffer|Uint8Array} 现有的 `Buffer` 或 {Uint8Array}，从中
  复制数据。

参见 [`Buffer.from(buffer)`][]。

### `new Buffer(size)`

<!-- YAML
deprecated: v6.0.0
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/19524
    description: "在 `node_modules` 目录外的代码中运行时，调用此构造函数会发出弃用警告。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12141
    description: "`new Buffer(size)` 将默认返回零填充的内存。"
  - version: v7.2.1
    pr-url: https://github.com/nodejs/node/pull/9529
    description: 调用此构造函数不再发出弃用警告。
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/8169
    description: 调用此构造函数现在会发出弃用警告。
-->

> 稳定性：0 - 已弃用：请使用 [`Buffer.alloc()`][] 代替（另见
> [`Buffer.allocUnsafe()`][]）。

* `size` {整数} 新 `Buffer` 所需的长度。

参见 [`Buffer.alloc()`][] 和 [`Buffer.allocUnsafe()`][]。此变体的
构造函数等同于 [`Buffer.alloc()`][]。

### `new Buffer(string[, encoding])`

<!-- YAML
deprecated: v6.0.0
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/19524
    description: "在 `node_modules` 目录外的代码中运行时，调用此构造函数会发出弃用警告。"
  - version: v7.2.1
    pr-url: https://github.com/nodejs/node/pull/9529
    description: 调用此构造函数不再发出弃用警告。
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/8169
    description: 调用此构造函数现在会发出弃用警告。
-->

> 稳定性：0 - 已弃用：
> 请使用 [`Buffer.from(string[, encoding])`][`Buffer.from(string)`] 代替。

* `string` {string} 要编码的字符串。
* `encoding` {string} `string` 的编码。**默认值：** `'utf8'`。

参见 [`Buffer.from(string[, encoding])`][`Buffer.from(string)`]。

## 类：`File`

<!-- YAML
added:
  - v19.2.0
  - v18.13.0
changes:
  - version: v23.0.0
    pr-url: https://github.com/nodejs/node/pull/47613
    description: 使 File 实例可克隆。
  - version: v20.0.0
    pr-url: https://github.com/nodejs/node/pull/47153
    description: 不再是实验性的。
-->

* 继承：{Blob}

{File} 提供有关文件的信息。

### 构造函数

<!-- YAML
added:
  - v19.2.0
  - v18.13.0
-->

* `sources` {string\[]|ArrayBuffer\[]|TypedArray\[]|DataView\[]|Blob\[]|File\[]}
  一个字符串、{ArrayBuffer}、{TypedArray}、{DataView}、{File} 或 {Blob} 对象的数组，或任何此类对象的混合，它们将被存储在 `File` 中。
* `fileName` {string} 文件的名称。
* `options` {Object}
  * `endings` {string} `'transparent'` 或 `'native'` 之一。当设置为
    `'native'` 时，字符串源部分中的行尾将转换为 `require('node:os').EOL` 指定的平台原生行尾。
  * `type` {string} 文件的内容类型。
  * `lastModified` {number} 文件的最后修改日期。
    **默认值：** `Date.now()`。

### 属性

<!-- YAML
added:
  - v19.2.0
  - v18.13.0
-->

* 类型：{string}

`File` 的名称。

### 属性

<!-- YAML
added:
  - v19.2.0
  - v18.13.0
-->

* 类型：{number}

`File` 的最后修改日期。

## `node:buffer` 模块 API

虽然 `Buffer` 对象可作为全局对象使用，但还有额外的 `Buffer` 相关 API 仅可通过使用 `require('node:buffer')` 访问的 `node:buffer` 模块获得。

### `buffer.atob(data)`

<!-- YAML
added:
  - v15.13.0
  - v14.17.0
-->

> 稳定性：3 - 遗留。请改用 `Buffer.from(data, 'base64')`。

* `data` {any} Base64 编码的输入字符串。

将 Base64 编码的数据字符串解码为字节，并使用 Latin-1 (ISO-8859-1) 将这些字节编码为字符串。

`data` 可以是任何可强制转换为字符串的 JavaScript 值。

**此函数仅提供用于与遗留 Web 平台 API 的兼容性，绝不应在新代码中使用，因为它们使用字符串来表示二进制数据，且早于 JavaScript 中类型数组的引入。对于使用 Node.js API 运行的代码，应在 Base64 编码字符串和二进制数据之间进行转换使用 `Buffer.from(str, 'base64')` 和 `buf.toString('base64')`。**

提供自动迁移工具（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/buffer-atob-btoa)）：

```bash
npx codemod@latest @nodejs/buffer-atob-btoa
```

### `buffer.btoa(data)`

<!-- YAML
added:
  - v15.13.0
  - v14.17.0
-->

> 稳定性：3 - 遗留。请改用 `buf.toString('base64')`。

* `data` {any} 一个 ASCII (Latin1) 字符串。

使用 Latin-1 (ISO-8859) 将字符串解码为字节，并使用 Base64 将这些字节编码为字符串。

`data` 可以是任何可强制转换为字符串的 JavaScript 值。

**此函数仅用于与遗留 Web 平台 API 兼容，绝不应在新代码中使用，因为它们使用字符串表示二进制数据，并且早于 JavaScript 中类型数组的引入。对于使用 Node.js API 运行的代码，应在 Base64 编码字符串和二进制数据之间进行转换时使用 `Buffer.from(str, 'base64')` 和 `buf.toString('base64')`。**

提供自动迁移工具（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/buffer-atob-btoa)）：

```bash
npx codemod@latest @nodejs/buffer-atob-btoa
```

### `buffer.isAscii(input)`

<!-- YAML
added:
  - v19.6.0
  - v18.15.0
changes:
  - version: REPLACEME
    pr-url: https://github.com/nodejs/node/pull/64504
    description: Detached `ArrayBuffer`s and views backed by them are treated
                 as empty.
-->

* `input` {Buffer | ArrayBuffer | TypedArray} 要验证的输入。
* 返回值：{boolean}

如果 `input` 仅包含有效的 ASCII 编码数据（包括 `input` 为空的情况），则此函数返回 `true`。

分离的 `ArrayBuffer`，或由其支持的 `TypedArray`，将被视为空。

### `buffer.isUtf8(input)`

<!-- YAML
added:
  - v19.4.0
  - v18.14.0
changes:
  - version: REPLACEME
    pr-url: https://github.com/nodejs/node/pull/64504
    description: Detached `ArrayBuffer`s and views backed by them are treated
                 as empty.
-->

* `input` {Buffer | ArrayBuffer | TypedArray} 要验证的输入。
* 返回值：{boolean}

如果 `input` 仅包含有效的 UTF-8 编码数据（包括 `input` 为空的情况），则此函数返回 `true`。

分离的 `ArrayBuffer`，或由其支持的 `TypedArray`，将被视为空。

### `buffer.INSPECT_MAX_BYTES`

<!-- YAML
added: v0.5.4
-->

* 类型：{integer} **默认值：** `50`

返回调用 `buf.inspect()` 时将返回的最大字节数。用户可以覆盖此值。有关 `buf.inspect()` 行为的更多详细信息，请参阅 [`util.inspect()`][]。

### `buffer.kMaxLength`

<!-- YAML
added: v3.0.0
-->

* 类型：{integer} 单个 `Buffer` 实例允许的最大大小。

[`buffer.constants.MAX_LENGTH`][] 的别名。

### `buffer.kStringMaxLength`

<!-- YAML
added: v3.0.0
-->

* 类型：{integer} 单个 `string` 实例允许的最大长度。

[`buffer.constants.MAX_STRING_LENGTH`][] 的别名。

### `buffer.resolveObjectURL(id)`

<!-- YAML
added: v16.7.0
changes:
 - version:
    - v24.0.0
    - v22.17.0
   pr-url: https://github.com/nodejs/node/pull/57513
   description: 标记 API 为稳定。
-->

* `id` {string} 由之前调用 `URL.createObjectURL()` 返回的 `'blob:nodedata:...` URL 字符串。
* 返回值：{Blob}

解析一个 `'blob:nodedata:...'` URL 为关联的 {Blob} 对象，该对象是使用之前调用 `URL.createObjectURL()` 注册的。

### `buffer.transcode(source, fromEnc, toEnc)`

<!-- YAML
added: v7.1.0
changes:
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/10236
    description: "`source` 参数现在可以是 `Uint8Array`。"
-->

* `source` {Buffer|Uint8Array} 一个 `Buffer` 或 `Uint8Array` 实例。
* `fromEnc` {string} 当前编码。
* `toEnc` {string} 目标编码。
* 返回值：{Buffer}

将给定的 `Buffer` 或 `Uint8Array` 实例从一种字符编码重新编码为另一种。返回一个新的 `Buffer` 实例。

如果 `fromEnc` 或 `toEnc` 指定了无效的字符编码，或者不允许从 `fromEnc` 转换到 `toEnc`，则抛出异常。

`buffer.transcode()` 支持的编码有：`'ascii'`、`'utf8'`、`'utf16le'`、`'ucs2'`、`'latin1'` 和 `'binary'`。

如果给定的字节序列无法在目标编码中充分表示，转码过程将使用替换字符。例如：

```mjs
import { Buffer, transcode } from 'node:buffer';

const newBuf = transcode(Buffer.from('€'), 'utf8', 'ascii');
console.log(newBuf.toString('ascii'));
// 打印：'?'
```

```cjs
const { Buffer, transcode } = require('node:buffer');

const newBuf = transcode(Buffer.from('€'), 'utf8', 'ascii');
console.log(newBuf.toString('ascii'));
// 打印：'?'
```

因为欧元 (`€`) 符号在 US-ASCII 中无法表示，所以在转码后的 `Buffer` 中被替换为 `?`。

### Buffer 常量

<!-- YAML
added: v8.2.0
-->

#### `buffer.constants.MAX_LENGTH`

<!-- YAML
added: v8.2.0
changes:
  - version: v22.0.0
    pr-url: https://github.com/nodejs/node/pull/52465
    description: 在 64 位架构上，值更改为 2<sup>53</sup> - 1，在 32 位架构上为 2<sup>31</sup> - 1。
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/35415
    description: 在 64 位架构上，值更改为 2<sup>32</sup>。
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/32116
    description: 在 64 位架构上，值从 2<sup>31</sup> - 1 更改为 2<sup>32</sup> - 1。
-->

* 类型：{integer} 单个 `Buffer` 实例允许的最大大小。

在 32 位架构上，此值等于 2<sup>31</sup> - 1（约 2 GiB）。

在 64 位架构上，此值等于 [`Number.MAX_SAFE_INTEGER`][]（2<sup>53</sup> - 1，约 8 PiB）。

它在底层反映了 [`v8::Uint8Array::kMaxLength`][]。

此值也可作为 [`buffer.kMaxLength`][] 使用。

#### `buffer.constants.MAX_STRING_LENGTH`

<!-- YAML
added: v8.2.0
-->

* 类型：{integer} 单个 `string` 实例允许的最大长度。

表示 `string` 原始类型可以拥有的最大 `length`，以 UTF-16 代码单元计数。

此值可能取决于所使用的 JS 引擎。

## `Buffer.from()`、`Buffer.alloc()` 和 `Buffer.allocUnsafe()`

在 6.0.0 之前的 Node.js 版本中，`Buffer` 实例是使用 `Buffer` 构造函数创建的，该函数根据提供的参数不同以不同方式分配返回的 `Buffer`：

* 将数字作为第一个参数传递给 `Buffer()`（例如 `new Buffer(10)`）会分配一个指定大小的新 `Buffer` 对象。在 Node.js 8.0.0 之前，为此类 `Buffer` 实例分配的内存_未_初始化，并且_可能包含敏感数据_。此类 `Buffer` 实例_必须_随后通过使用 [`buf.fill(0)`][`buf.fill()`] 或在从 `Buffer` 读取数据之前写入整个 `Buffer` 来进行初始化。虽然此行为是_有意_为了提高性能，但开发经验表明，需要在创建快速但未初始化的 `Buffer` 与创建较慢但更安全的 `Buffer` 之间进行更明确的区分。自 Node.js 8.0.0 以来，`Buffer(num)` 和 `new Buffer(num)` 返回一个内存已初始化的 `Buffer`。
* 将字符串、数组或 `Buffer` 作为第一个参数传递会将传递对象的数据复制到 `Buffer` 中。
* 传递 {ArrayBuffer} 或 {SharedArrayBuffer} 会返回一个与给定数组缓冲区共享分配内存的 `Buffer`。

由于 `new Buffer()` 的行为根据第一个参数的类型而不同，当未执行参数验证或 `Buffer` 初始化时，可能会无意中向应用程序引入安全和可靠性问题。

例如，如果攻击者导致应用程序接收到一个数字而不是预期的字符串，应用程序可能会调用 `new Buffer(100)` 而不是 `new Buffer("100")`，导致它分配一个 100 字节的缓冲区，而不是分配一个内容为 `"100"` 的 3 字节缓冲区。使用 JSON API 调用通常可能发生这种情况。由于 JSON 区分数字和字符串类型，它允许注入数字，而编写天真且未充分验证输入的应用程序可能期望始终接收字符串。在 Node.js 8.0.0 之前，100 字节的缓冲区可能包含任意的预先存在的内存数据，因此可用于向远程攻击者暴露内存秘密。自 Node.js 8.0.0 以来，内存暴露不会发生，因为数据已零填充。然而，其他攻击仍然是可能的，例如导致服务器分配非常大的缓冲区，导致性能下降或因内存耗尽而崩溃。

为了使 `Buffer` 实例的创建更可靠且不易出错，`new Buffer()` 构造函数的各种形式已被 **弃用**，并由单独的 `Buffer.from()`、[`Buffer.alloc()`][] 和 [`Buffer.allocUnsafe()`][] 方法取代。

_开发者应将所有现有使用的 `new Buffer()` 构造函数迁移到这些新 API 之一。_

* [`Buffer.from(array)`][] 返回一个新的 `Buffer`，其中_包含_所提供字节的_副本_。
* [`Buffer.from(arrayBuffer[, byteOffset[, length]])`][`Buffer.from(arrayBuf)`] 返回一个新的 `Buffer`，它与给定的 {ArrayBuffer} _共享相同的分配内存_。
* [`Buffer.from(buffer)`][] 返回一个新的 `Buffer`，其中_包含_给定 `Buffer` 内容的_副本_。
* [`Buffer.from(string[, encoding])`][`Buffer.from(string)`] 返回一个新的 `Buffer`，其中_包含_所提供字符串的_副本_。
* [`Buffer.alloc(size[, fill[, encoding]])`][`Buffer.alloc()`] 返回一个指定大小的新初始化 `Buffer`。此方法比 [`Buffer.allocUnsafe(size)`][`Buffer.allocUnsafe()`] 慢，但保证新创建的 `Buffer` 实例从不包含可能敏感的旧数据。如果 `size` 不是数字，将抛出 `TypeError`。
* [`Buffer.allocUnsafe(size)`][`Buffer.allocUnsafe()`] 和 [`Buffer.allocUnsafeSlow(size)`][`Buffer.allocUnsafeSlow()`] 各自返回一个指定 `size` 的新未初始化 `Buffer`。因为 `Buffer` 未初始化，分配的内存段可能包含可能敏感的旧数据。

如果 `size` 小于或等于 [`Buffer.poolSize`][] 的一半，由 [`Buffer.allocUnsafe()`][]、[`Buffer.from(string)`][]、[`Buffer.concat()`][] 和 [`Buffer.from(array)`][] 返回的 `Buffer` 实例_可能_从共享内部内存池分配。由 [`Buffer.allocUnsafeSlow()`][] 返回的实例_从不_使用共享内部内存池。

### `--zero-fill-buffers` 命令行选项

<!-- YAML
added: v5.10.0
-->

可以使用 `--zero-fill-buffers` 命令行选项启动 Node.js，以使所有新分配的 `Buffer` 实例在创建时默认零填充。如果没有该选项，使用 [`Buffer.allocUnsafe()`][] 和 [`Buffer.allocUnsafeSlow()`][] 创建的缓冲区不会零填充。使用此标志可能会对性能产生可测量的负面影响。仅在需要强制新分配的 `Buffer` 实例不能包含可能敏感的旧数据时使用 `--zero-fill-buffers` 选项。

```console
$ node --zero-fill-buffers
> Buffer.allocUnsafe(5);
<Buffer 00 00 00 00 00>
```

### 是什么让 `Buffer.allocUnsafe()` 和 `Buffer.allocUnsafeSlow()` 变得“不安全”？

当调用 [`Buffer.allocUnsafe()`][] 和 [`Buffer.allocUnsafeSlow()`][] 时，分配的内存段是_未初始化的_（它没有被清零）。虽然此设计使内存分配非常快，但分配的内存段可能包含可能敏感的旧数据。使用由 [`Buffer.allocUnsafe()`][] 创建的 `Buffer` 而不_完全_覆盖内存，可能会在读取 `Buffer` 内存时允许此旧数据泄露。

虽然使用 [`Buffer.allocUnsafe()`][] 有明显的性能优势，但必须格外小心以避免向应用程序引入安全漏洞。

### 对齐分配

某些操作系统接口要求其操作的内存经过对齐，而在某些硬件上，对齐仅仅意味着速度更快。前一种情况最常见的例子是无缓冲（“直接”）文件 I/O。在 Linux 上，这要求缓冲区地址、文件偏移量和传输长度都必须是底层设备逻辑块大小的倍数：

```mjs
import { open } from 'node:fs/promises';
import { constants } from 'node:fs';
import { Buffer } from 'node:buffer';

const blockSize = 4096;

// 要使 O_DIRECT 接受该缓冲区，缓冲区地址必须按块对齐。
const buf = Buffer.allocUnsafeSlow(blockSize, blockSize);

const file = await open('/dev/sda', constants.O_RDONLY | constants.O_DIRECT);
try {
  await file.read(buf, 0, blockSize, 0);
} finally {
  await file.close();
}
```

```cjs
const fs = require('node:fs');
const { Buffer } = require('node:buffer');

const blockSize = 4096;

// 要使 O_DIRECT 接受该缓冲区，缓冲区地址必须按块对齐。
const buf = Buffer.allocUnsafeSlow(blockSize, blockSize);

const flags = fs.constants.O_RDONLY | fs.constants.O_DIRECT;
fs.open('/dev/sda', flags, (err, fd) => {
  if (err) throw err;
  fs.read(fd, buf, 0, blockSize, 0, (err) => {
    fs.close(fd, () => {});
    if (err) throw err;
  });
});
```

即使没有接口强制要求，对齐也可能纯粹为了性能而值得请求。将一个高频使用的 `Buffer` 按缓存行大小（当代大多数 CPU 上为 64 字节）对齐，可以避免它跨越不必要的额外缓存行，使得一个小型结构只需一次缓存未命中即可获取，而不是两次；按页（4096 字节）对齐的分配同样有助于映射或固定内存的接口。这些都是微优化：在采用它们之前应先进行测量，因为额外的字节并非没有代价。

由于无法直接选择 `Buffer` 内存的地址，因此必须分配或跳过额外的字节，以到达对齐的地址。[`Buffer.allocUnsafeSlow()`][] 会额外分配最多 `alignment - 1` 个字节，并将返回的 `Buffer` 放置在其中第一个适当对齐的字节处。[`Buffer.allocUnsafe()`][] 则会将其偏移量填充到共享内部内存池中；该内存池的起始位置始终按 64 字节对齐，只有当 `alignment` 大于该值时才会退回到独立分配。无论哪种方式，[`buf.byteOffset`][] 通常都不是 0，并且 [`buf.buffer`][] 大于 `size`，因此访问 `Buffer` 底层 `ArrayBuffer` 中超出该 `Buffer` 范围的代码必须考虑偏移量；对于池化的 `Buffer` 也是如此。

对齐是返回的 `Buffer` 的属性，并且在其整个生命周期内都会保留，但不会被其他视图继承：[`buf.subarray`][]、[`buf.slice()`][] 和 `structuredClone()` 都可能生成未对齐的 `Buffer`。

将对齐状态保存到启动快照中也无法保留对齐：内存在序列化过程中不会保留其地址，因此在 [`--build-snapshot`][] 生效时分配的 `Buffer` 在反序列化进程中不会保持对齐。如果运行时必须保持对齐，应在 [`v8.startupSnapshot.setDeserializeMainFunction()`][] 回调中或启动之后进行分配。

[ASCII]: https://en.wikipedia.org/wiki/ASCII
[对齐分配]: #aligned-allocations
[Base64]: https://en.wikipedia.org/wiki/Base64
[ISO-8859-1]: https://en.wikipedia.org/wiki/ISO-8859-1
[RFC 4648, Section 5]: https://tools.ietf.org/html/rfc4648#section-5
[UTF-16]: https://en.wikipedia.org/wiki/UTF-16
[UTF-8]: https://en.wikipedia.org/wiki/UTF-8
[WHATWG Encoding Standard]: https://encoding.spec.whatwg.org/
[`--build-snapshot`]: cli.md#--build-snapshot
[`Buffer.alloc()`]: #static-method-bufferallocsize-fill-encoding
[`Buffer.allocUnsafe()`]: #static-method-bufferallocunsafesize-alignment
[`Buffer.allocUnsafeSlow()`]: #static-method-bufferallocunsafeslowsize-alignment
[`Buffer.concat()`]: #static-method-bufferconcatlist-totallength
[`Buffer.copyBytesFrom()`]: #static-method-buffercopybytesfromview-offset-length
[`Buffer.from(array)`]: #static-method-bufferfromarray
[`Buffer.from(arrayBuf)`]: #static-method-bufferfromarraybuffer-byteoffset-length
[`Buffer.from(buffer)`]: #static-method-bufferfrombuffer
[`Buffer.from(string)`]: #static-method-bufferfromstring-encoding
[`Buffer.poolSize`]: #bufferpoolsize
[`ERR_INVALID_BUFFER_SIZE`]: errors.md#err_invalid_buffer_size
[`ERR_OUT_OF_RANGE`]: errors.md#err_out_of_range
[`JSON.stringify()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
[`Number.MAX_SAFE_INTEGER`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
[`String.prototype.indexOf()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
[`String.prototype.lastIndexOf()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf
[`String.prototype.length`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length
[`TextDecoderStream`]: webstreams.md#class-textdecoderstream
[`TypedArray.from()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/from
[`TypedArray.prototype.set()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/set
[`TypedArray.prototype.slice()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/slice
[`TypedArray.prototype.subarray()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/subarray
[`blob.stream()`]: #blobstream
[`buf.buffer`]: #bufbuffer
[`buf.byteOffset`]: #bufbyteoffset
[`buf.compare()`]: #bufcomparetarget-targetstart-targetend-sourcestart-sourceend
[`buf.entries()`]: #bufentries
[`buf.fill()`]: #buffillvalue-offset-end-encoding
[`buf.indexOf()`]: #bufindexofvalue-start-end-encoding
[`buf.keys()`]: #bufkeys
[`buf.length`]: #buflength
[`buf.slice()`]: #bufslicestart-end
[`buf.subarray`]: #bufsubarraystart-end
[`buf.toString()`]: #buftostringencoding-start-end
[`buf.values()`]: #bufvalues
[`buffer.constants.MAX_LENGTH`]: #bufferconstantsmax_length
[`buffer.constants.MAX_STRING_LENGTH`]: #bufferconstantsmax_string_length
[`buffer.kMaxLength`]: #bufferkmaxlength
[`util.inspect()`]: util.md#utilinspectobject-options
[`v8.startupSnapshot.setDeserializeMainFunction()`]: v8.md#v8startupsnapshotsetdeserializemainfunctioncallback-data
[`v8::Uint8Array::kMaxLength`]: https://v8.github.io/api/head/classv8_1_1Uint8Array.html#a7677e3d0c9c92e4d40bef7212f5980c6
[base64url]: https://tools.ietf.org/html/rfc4648#section-5
[endianness]: https://en.wikipedia.org/wiki/Endianness
[iterator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
