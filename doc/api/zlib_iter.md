# 可迭代压缩

<!--introduced_in=v25.9.0-->

> 稳定性：1 - 实验性

<!-- source_link=lib/zlib/iter.js -->

`node:zlib/iter` 模块提供压缩和解压缩转换，用于 [`node:stream/iter`][] 可迭代流 API。

仅当启用 `--experimental-stream-iter` CLI 标志时，此模块才可用。

每种算法都有一个异步变体（有状态异步生成器，用于 [`pull()`][] 和 [`pipeTo()`][]）和一个同步变体（有状态同步生成器，用于 `pullSync()` 和 `pipeToSync()`）。

异步转换在 libuv 线程池上运行压缩，使 I/O 与 JavaScript 执行重叠。同步转换直接在主线程上运行压缩。

> 注意：这些转换的默认值针对流吞吐量进行了优化，与 `node:zlib` 中的默认值不同。特别是，gzip/deflate 默认级别为 4（不是 6），memLevel 为 9（不是 8），Brotli 默认质量为 6（不是 11）。这些选择匹配常见的 HTTP 服务器配置，并提供显著更快的压缩速度，而压缩率仅略有降低。所有默认值都可以通过选项覆盖。

```mjs
import { from, pull, bytes, text } from 'node:stream/iter';
import { compressGzip, decompressGzip } from 'node:zlib/iter';

// 异步往返
const compressed = await bytes(pull(from('hello'), compressGzip()));
const original = await text(pull(from(compressed), decompressGzip()));
console.log(original); // 'hello'
```

```cjs
const { from, pull, bytes, text } = require('node:stream/iter');
const { compressGzip, decompressGzip } = require('node:zlib/iter');

async function run() {
  const compressed = await bytes(pull(from('hello'), compressGzip()));
  const original = await text(pull(from(compressed), decompressGzip()));
  console.log(original); // 'hello'
}

run().catch(console.error);
```

```mjs
import { fromSync, pullSync, textSync } from 'node:stream/iter';
import { compressGzipSync, decompressGzipSync } from 'node:zlib/iter';

// 同步往返
const compressed = pullSync(fromSync('hello'), compressGzipSync());
const original = textSync(pullSync(compressed, decompressGzipSync()));
console.log(original); // 'hello'
```

```cjs
const { fromSync, pullSync, textSync } = require('node:stream/iter');
const { compressGzipSync, decompressGzipSync } = require('node:zlib/iter');

const compressed = pullSync(fromSync('hello'), compressGzipSync());
const original = textSync(pullSync(compressed, decompressGzipSync()));
console.log(original); // 'hello'
```

## `compressBrotli([options])`

## `compressBrotliSync([options])`

<!-- YAML
added: v25.9.0
-->

* `options` {Object}
  * `chunkSize` {number} 输出缓冲区大小。**默认：**`65536` (64 KB)。
  * `params` {Object} 键值对象，其中键和值是 `zlib.constants` 条目。最重要的压缩器参数是：
    * `BROTLI_PARAM_MODE` -- `BROTLI_MODE_GENERIC`（默认）、
      `BROTLI_MODE_TEXT` 或 `BROTLI_MODE_FONT`。
    * `BROTLI_PARAM_QUALITY` -- 范围从 `BROTLI_MIN_QUALITY` 到
      `BROTLI_MAX_QUALITY`。**默认：**`6`（不是 `BROTLI_DEFAULT_QUALITY`
      即 11）。质量 6 适用于流式传输；质量 11 旨在用于离线/构建时压缩。
    * `BROTLI_PARAM_SIZE_HINT` -- 预期输入大小。**默认：**`0`
      （未知）。
    * `BROTLI_PARAM_LGWIN` -- 窗口大小 (log2)。**默认：**`20` (1 MB)。
      Brotli 库默认值为 22 (4 MB)；降低的默认值节省了内存，而对流式工作负载的压缩影响不大。
    * `BROTLI_PARAM_LGBLOCK` -- 输入块大小 (log2)。
      完整列表请参阅 zlib 文档中的 [Brotli 压缩器选项][]。
  * `dictionary` {Buffer|TypedArray|DataView}
* 返回：{Object} 一个有状态转换。

创建一个 Brotli 压缩转换。输出与
`zlib.brotliDecompress()` 和 `decompressBrotli()`/`decompressBrotliSync()` 兼容。

## `compressDeflate([options])`

## `compressDeflateSync([options])`

<!-- YAML
added: v25.9.0
-->

* `options` {Object}
  * `chunkSize` {number} 输出缓冲区大小。**默认：**`65536` (64 KB)。
  * `level` {number} 压缩级别 (`0`-`9`)。**默认：**`4`。
  * `windowBits` {number} **默认：**`Z_DEFAULT_WINDOWBITS` (15)。
  * `memLevel` {number} **默认：**`9`。
  * `strategy` {number} **默认：**`Z_DEFAULT_STRATEGY`。
  * `dictionary` {Buffer|TypedArray|DataView}
* 返回：{Object} 一个有状态转换。

创建一个 deflate 压缩转换。输出与
`zlib.inflate()` 和 `decompressDeflate()`/`decompressDeflateSync()` 兼容。

## `compressGzip([options])`

## `compressGzipSync([options])`

<!-- YAML
added: v25.9.0
-->

* `options` {Object}
  * `chunkSize` {number} 输出缓冲区大小。**默认：**`65536` (64 KB)。
  * `level` {number} 压缩级别 (`0`-`9`)。**默认：**`4`。
  * `windowBits` {number} **默认：**`Z_DEFAULT_WINDOWBITS` (15)。
  * `memLevel` {number} **默认：**`9`。
  * `strategy` {number} **默认：**`Z_DEFAULT_STRATEGY`。
  * `dictionary` {Buffer|TypedArray|DataView}
* 返回：{Object} 一个有状态转换。

创建一个 gzip 压缩转换。输出与 `zlib.gunzip()`
和 `decompressGzip()`/`decompressGzipSync()` 兼容。

## `compressZstd([options])`

## `compressZstdSync([options])`

<!-- YAML
added: v25.9.0
-->

* `options` {Object}
  * `chunkSize` {number} 输出缓冲区大小。**默认：**`65536` (64 KB)。
  * `params` {Object} 键值对象，其中键和值是
    `zlib.constants` 条目。最重要的压缩器参数是：
    * `ZSTD_c_compressionLevel` -- **默认：**`ZSTD_CLEVEL_DEFAULT` (3)。
    * `ZSTD_c_checksumFlag` -- 生成校验和。**默认：**`0`。
    * `ZSTD_c_strategy` -- 压缩策略。值包括
      `ZSTD_fast`、`ZSTD_dfast`、`ZSTD_greedy`、`ZSTD_lazy`、
      `ZSTD_lazy2`、`ZSTD_btlazy2`、`ZSTD_btopt`、`ZSTD_btultra`、
      `ZSTD_btultra2`。
      完整列表请参阅 zlib 文档中的 [Zstd 压缩器选项][]。
  * `pledgedSrcSize` {number} 预期未压缩大小（可选提示）。
  * `dictionary` {Buffer|TypedArray|DataView}
* 返回：{Object} 一个有状态转换。

创建一个 Zstandard 压缩转换。输出与
`zlib.zstdDecompress()` 和 `decompressZstd()`/`decompressZstdSync()` 兼容。

## `decompressBrotli([options])`

## `decompressBrotliSync([options])`

<!-- YAML
added: v25.9.0
-->

* `options` {Object}
  * `chunkSize` {number} 输出缓冲区大小。**默认：**`65536` (64 KB)。
  * `params` {Object} 键值对象，其中键和值是
    `zlib.constants` 条目。可用的解压缩器参数：
    * `BROTLI_DECODER_PARAM_DISABLE_RING_BUFFER_REALLOCATION` -- 布尔
      标志，影响内部内存分配。
    * `BROTLI_DECODER_PARAM_LARGE_WINDOW` -- 布尔标志，启用“大
      窗口 Brotli"模式（与 [RFC 7932][] 不兼容）。
      详细信息请参阅 zlib 文档中的 [Brotli 解压缩器选项][]。
  * `dictionary` {Buffer|TypedArray|DataView}
* 返回：{Object} 一个有状态转换。

创建一个 Brotli 解压缩转换。

## `decompressDeflate([options])`

## `decompressDeflateSync([options])`

<!-- YAML
added: v25.9.0
-->

* `options` {Object}
  * `chunkSize` {number} 输出缓冲区大小。**默认：**`65536` (64 KB)。
  * `windowBits` {number} **默认：**`Z_DEFAULT_WINDOWBITS` (15)。
  * `dictionary` {Buffer|TypedArray|DataView}
* 返回：{Object} 一个有状态转换。

创建一个 deflate 解压缩转换。

## `decompressGzip([options])`

## `decompressGzipSync([options])`

<!-- YAML
added: v25.9.0
-->

* `options` {Object}
  * `chunkSize` {number} 输出缓冲区大小。**默认：**`65536` (64 KB)。
  * `windowBits` {number} **默认：**`Z_DEFAULT_WINDOWBITS` (15)。
  * `dictionary` {Buffer|TypedArray|DataView}
* 返回：{Object} 一个有状态转换。

创建一个 gzip 解压缩转换。

## `decompressZstd([options])`

## `decompressZstdSync([options])`

<!-- YAML
added: v25.9.0
-->

* `options` {Object}
  * `chunkSize` {number} 输出缓冲区大小。**默认：**`65536` (64 KB)。
  * `params` {Object} 键值对象，其中键和值是
    `zlib.constants` 条目。可用的解压缩器参数：
    * `ZSTD_d_windowLogMax` -- 解压缩器将分配的最大窗口大小 (log2)。
      限制恶意输入的内存使用。
      详细信息请参阅 zlib 文档中的 [Zstd 解压缩器选项][]。
  * `dictionary` {Buffer|TypedArray|DataView}
* 返回：{Object} 一个有状态转换。

创建一个 Zstandard 解压缩转换。

[Brotli 压缩器选项]: zlib.md#compressor-options
[Brotli 解压缩器选项]: zlib.md#decompressor-options
[RFC 7932]: https://www.rfc-editor.org/rfc/rfc7932
[Zstd 压缩器选项]: zlib.md#compressor-options-1
[Zstd 解压缩器选项]: zlib.md#decompressor-options-1
[`node:stream/iter`]: stream_iter.md
[`pipeTo()`]: stream_iter.md#pipetosource-transforms-writer-options
[`pull()`]: stream_iter.md#pullsource-transforms-options
