# Zlib

<!--introduced_in=v0.10.0-->

> 稳定性：2 - 稳定

<!-- source_link=lib/zlib.js -->

`node:zlib` 模块提供了使用 Gzip、Deflate/Inflate、Brotli 和 Zstd 实现的压缩功能。

要访问它：

```mjs
import zlib from 'node:zlib';
```

```cjs
const zlib = require('node:zlib');
```

压缩和解压缩是围绕 Node.js [Streams API][] 构建的。

压缩或解压缩流（例如文件）可以通过将源流通过 `zlib` `Transform` 流管道传输到目标流来实现：

```mjs
import {
  createReadStream,
  createWriteStream,
} from 'node:fs';
import process from 'node:process';
import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream';

const gzip = createGzip();
const source = createReadStream('input.txt');
const destination = createWriteStream('input.txt.gz');

pipeline(source, gzip, destination, (err) => {
  if (err) {
    console.error('发生错误：', err);
    process.exitCode = 1;
  }
});
```

```cjs
const {
  createReadStream,
  createWriteStream,
} = require('node:fs');
const { createGzip } = require('node:zlib');
const { pipeline } = require('node:stream');

const gzip = createGzip();
const source = createReadStream('input.txt');
const destination = createWriteStream('input.txt.gz');

pipeline(source, gzip, destination, (err) => {
  if (err) {
    console.error('发生错误：', err);
    process.exitCode = 1;
  }
});
```

或者，使用 promise `pipeline` API：

```mjs
import {
  createReadStream,
  createWriteStream,
} from 'node:fs';
import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';

async function do_gzip(input, output) {
  const gzip = createGzip();
  const source = createReadStream(input);
  const destination = createWriteStream(output);
  await pipeline(source, gzip, destination);
}

await do_gzip('input.txt', 'input.txt.gz');
```

```cjs
const {
  createReadStream,
  createWriteStream,
} = require('node:fs');
const { createGzip } = require('node:zlib');
const { pipeline } = require('node:stream/promises');

async function do_gzip(input, output) {
  const gzip = createGzip();
  const source = createReadStream(input);
  const destination = createWriteStream(output);
  await pipeline(source, gzip, destination);
}

do_gzip('input.txt', 'input.txt.gz')
  .catch((err) => {
    console.error('发生错误：', err);
    process.exitCode = 1;
  });
```

也可以单步压缩或解压缩数据：

```mjs
import process from 'node:process';
import { Buffer } from 'node:buffer';
import { deflate, unzip } from 'node:zlib';

const input = '.................................';
deflate(input, (err, buffer) => {
  if (err) {
    console.error('发生错误：', err);
    process.exitCode = 1;
  }
  console.log(buffer.toString('base64'));
});

const buffer = Buffer.from('eJzT0yMAAGTvBe8=', 'base64');
unzip(buffer, (err, buffer) => {
  if (err) {
    console.error('发生错误：', err);
    process.exitCode = 1;
  }
  console.log(buffer.toString());
});

// 或者，Promise 化

import { promisify } from 'node:util';
const do_unzip = promisify(unzip);

const unzippedBuffer = await do_unzip(buffer);
console.log(unzippedBuffer.toString());
```

```cjs
const { deflate, unzip } = require('node:zlib');

const input = '.................................';
deflate(input, (err, buffer) => {
  if (err) {
    console.error('发生错误：', err);
    process.exitCode = 1;
  }
  console.log(buffer.toString('base64'));
});

const buffer = Buffer.from('eJzT0yMAAGTvBe8=', 'base64');
unzip(buffer, (err, buffer) => {
  if (err) {
    console.error('发生错误：', err);
    process.exitCode = 1;
  }
  console.log(buffer.toString());
});

// 或者，Promise 化

const { promisify } = require('node:util');
const do_unzip = promisify(unzip);

do_unzip(buffer)
  .then((buf) => console.log(buf.toString()))
  .catch((err) => {
    console.error('发生错误：', err);
    process.exitCode = 1;
  });
```

## 线程池使用和性能注意事项

所有 `zlib` API，除了那些明确同步的 API 外，都使用 Node.js 内部线程池。这可能会导致某些应用程序中出现意想不到的效果和性能限制。

同时创建和使用大量 zlib 对象可能会导致严重的内存碎片化。

```mjs
import zlib from 'node:zlib';
import { Buffer } from 'node:buffer';

const payload = Buffer.from('This is some data');

// 警告：不要这样做！
for (let i = 0; i < 30000; ++i) {
  zlib.deflate(payload, (err, buffer) => {});
}
```

```cjs
const zlib = require('node:zlib');

const payload = Buffer.from('This is some data');

// 警告：不要这样做！
for (let i = 0; i < 30000; ++i) {
  zlib.deflate(payload, (err, buffer) => {});
}
```

在前面的示例中，同时创建了 30,000 个 deflate 实例。由于某些操作系统处理内存分配和释放的方式，这可能会导致严重的内存碎片化。

强烈建议缓存压缩操作的结果以避免重复工作。

## 压缩 HTTP 请求和响应

`node:zlib` 模块可用于实现支持由 [HTTP](https://tools.ietf.org/html/rfc7230#section-4.2) 定义的 `gzip`、`deflate`、`br` 和 `zstd` 内容编码机制。

HTTP [`Accept-Encoding`][] 头用于 HTTP 请求中标识客户端接受的压缩编码。[`Content-Encoding`][] 头用于标识实际应用于消息的压缩编码。

下面给出的示例经过了大幅简化以展示基本概念。使用 `zlib` 编码可能开销很大，结果应该被缓存。请参阅 [内存使用调优][] 以获取有关 `zlib` 使用中速度/内存/压缩权衡的更多信息。

```mjs
// 客户端请求示例
import fs from 'node:fs';
import zlib from 'node:zlib';
import http from 'node:http';
import process from 'node:process';
import { pipeline } from 'node:stream';

const request = http.get({ host: 'example.com',
                           path: '/',
                           port: 80,
                           headers: { 'Accept-Encoding': 'br,gzip,deflate,zstd' } });
request.on('response', (response) => {
  const output = fs.createWriteStream('example.com_index.html');

  const onError = (err) => {
    if (err) {
      console.error('发生错误：', err);
      process.exitCode = 1;
    }
  };

  switch (response.headers['content-encoding']) {
    case 'br':
      pipeline(response, zlib.createBrotliDecompress(), output, onError);
      break;
    // 或者，只需使用 zlib.createUnzip() 来处理以下两种情况：
    case 'gzip':
      pipeline(response, zlib.createGunzip(), output, onError);
      break;
    case 'deflate':
      pipeline(response, zlib.createInflate(), output, onError);
      break;
    case 'zstd':
      pipeline(response, zlib.createZstdDecompress(), output, onError);
      break;
    default:
      pipeline(response, output, onError);
      break;
  }
});
```

```cjs
// 客户端请求示例
const zlib = require('node:zlib');
const http = require('node:http');
const fs = require('node:fs');
const { pipeline } = require('node:stream');

const request = http.get({ host: 'example.com',
                           path: '/',
                           port: 80,
                           headers: { 'Accept-Encoding': 'br,gzip,deflate,zstd' } });
request.on('response', (response) => {
  const output = fs.createWriteStream('example.com_index.html');

  const onError = (err) => {
    if (err) {
      console.error('发生错误：', err);
      process.exitCode = 1;
    }
  };

  switch (response.headers['content-encoding']) {
    case 'br':
      pipeline(response, zlib.createBrotliDecompress(), output, onError);
      break;
    // 或者，只需使用 zlib.createUnzip() 来处理以下两种情况：
    case 'gzip':
      pipeline(response, zlib.createGunzip(), output, onError);
      break;
    case 'deflate':
      pipeline(response, zlib.createInflate(), output, onError);
      break;
    case 'zstd':
      pipeline(response, zlib.createZstdDecompress(), output, onError);
      break;
    default:
      pipeline(response, output, onError);
      break;
  }
});
```

```mjs
// 服务器示例
// 对每个请求运行 gzip 操作开销很大。
// 缓存压缩缓冲区会高效得多。
import zlib from 'node:zlib';
import http from 'node:http';
import fs from 'node:fs';
import { pipeline } from 'node:stream';

http.createServer((request, response) => {
  const raw = fs.createReadStream('index.html');
  // 存储资源的压缩版本和未压缩版本。
  response.setHeader('Vary', 'Accept-Encoding');
  const acceptEncoding = request.headers['accept-encoding'] || '';

  const onError = (err) => {
    if (err) {
      // 如果发生错误，我们无能为力，因为
      // 服务器已经发送了 200 响应代码，并且
      // 已经向客户端发送了一些数据。
      // 我们所能做的最好的事情就是立即终止响应
      // 并记录错误。
      response.end();
      console.error('发生错误：', err);
    }
  };

  // 注意：这不是一个符合规范的 accept-encoding 解析器。
  // 参见 https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.3
  if (/\bdeflate\b/.test(acceptEncoding)) {
    response.writeHead(200, { 'Content-Encoding': 'deflate' });
    pipeline(raw, zlib.createDeflate(), response, onError);
  } else if (/\bgzip\b/.test(acceptEncoding)) {
    response.writeHead(200, { 'Content-Encoding': 'gzip' });
    pipeline(raw, zlib.createGzip(), response, onError);
  } else if (/\bbr\b/.test(acceptEncoding)) {
    response.writeHead(200, { 'Content-Encoding': 'br' });
    pipeline(raw, zlib.createBrotliCompress(), response, onError);
  } else if (/\bzstd\b/.test(acceptEncoding)) {
    response.writeHead(200, { 'Content-Encoding': 'zstd' });
    pipeline(raw, zlib.createZstdCompress(), response, onError);
  } else {
    response.writeHead(200, {});
    pipeline(raw, response, onError);
  }
}).listen(1337);
```

```cjs
// 服务器示例
// 对每个请求运行 gzip 操作开销很大。
// 缓存压缩缓冲区会高效得多。
const zlib = require('node:zlib');
const http = require('node:http');
const fs = require('node:fs');
const { pipeline } = require('node:stream');

http.createServer((request, response) => {
  const raw = fs.createReadStream('index.html');
  // 存储资源的压缩版本和未压缩版本。
  response.setHeader('Vary', 'Accept-Encoding');
  const acceptEncoding = request.headers['accept-encoding'] || '';

  const onError = (err) => {
    if (err) {
      // 如果发生错误，我们无能为力，因为
      // 服务器已经发送了 200 响应代码，并且
      // 已经向客户端发送了一些数据。
      // 我们所能做的最好的事情就是立即终止响应
      // 并记录错误。
      response.end();
      console.error('发生错误：', err);
    }
  };

  // 注意：这不是一个符合规范的 accept-encoding 解析器。
  // 参见 https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.3
  if (/\bdeflate\b/.test(acceptEncoding)) {
    response.writeHead(200, { 'Content-Encoding': 'deflate' });
    pipeline(raw, zlib.createDeflate(), response, onError);
  } else if (/\bgzip\b/.test(acceptEncoding)) {
    response.writeHead(200, { 'Content-Encoding': 'gzip' });
    pipeline(raw, zlib.createGzip(), response, onError);
  } else if (/\bbr\b/.test(acceptEncoding)) {
    response.writeHead(200, { 'Content-Encoding': 'br' });
    pipeline(raw, zlib.createBrotliCompress(), response, onError);
  } else if (/\bzstd\b/.test(acceptEncoding)) {
    response.writeHead(200, { 'Content-Encoding': 'zstd' });
    pipeline(raw, zlib.createZstdCompress(), response, onError);
  } else {
    response.writeHead(200, {});
    pipeline(raw, response, onError);
  }
}).listen(1337);
```

默认情况下，当解压缩截断的数据时，`zlib` 方法将抛出错误。但是，如果已知数据不完整，或者只想检查压缩文件的开头，可以通过更改用于解压缩最后一块输入数据的刷新方法来抑制默认错误处理：

```js
// 这是上面示例中缓冲区的截断版本
const buffer = Buffer.from('eJzT0yMA', 'base64');

zlib.unzip(
  buffer,
  // 对于 Brotli，等效的是 zlib.constants.BROTLI_OPERATION_FLUSH。
  // 对于 Zstd，等效的是 zlib.constants.ZSTD_e_flush。
  { finishFlush: zlib.constants.Z_SYNC_FLUSH },
  (err, buffer) => {
    if (err) {
      console.error('发生错误：', err);
      process.exitCode = 1;
    }
    console.log(buffer.toString());
  });
```

这不会改变其他抛出错误时的行为，例如当输入数据格式无效时。使用此方法时，将无法判断输入是过早结束，还是缺少完整性检查，因此需要手动检查解压结果是否有效。

## 内存使用调优

<!--type=misc-->

### 适用于基于 zlib 的流

出自 `zlib/zconf.h`，已修改为适用于 Node.js：

deflate 的内存需求（单位：字节）：

```js
(1 << (windowBits + 2)) + (1 << (memLevel + 9));
```

即：`windowBits` = 15 时为 128K + `memLevel` = 8 时为 128K
（默认值）加上少量小对象所需的几千字节。

例如，要将默认内存需求从 256K 减少到 128K，
选项应设置为：

```js
const options = { windowBits: 14, memLevel: 7 };
```

但这通常会降低压缩率。

inflate 的内存需求（单位：字节）为 `1 << windowBits`。
即，`windowBits` = 15（默认值）时为 32K，加上少量
小对象所需的几千字节。

此外，还有一个大小为
`chunkSize` 的内部输出板缓冲区，默认为 16K。

`zlib` 压缩的速度受
`level` 设置的影响最大。较高的级别会带来更好的压缩效果，但
完成时间会更长。较低的级别会导致压缩
效果较差，但速度会快得多。

通常，更大的内存使用选项意味着 Node.js 必须
减少对 `zlib` 的调用次数，因为它能够在每次
`write` 操作上处理更多数据。因此，这是另一个影响
速度的因素，代价是内存使用量。

### 对于基于 Brotli 的流

基于 Brotli 的流有与 zlib 选项等效的选项，尽管
这些选项的范围与 zlib 的不同：

* zlib 的 `level` 选项对应 Brotli 的 `BROTLI_PARAM_QUALITY` 选项。
* zlib 的 `windowBits` 选项对应 Brotli 的 `BROTLI_PARAM_LGWIN` 选项。

有关 Brotli 特定选项的更多详细信息，请参阅 [下方][Brotli 参数]。

### 对于基于 Zstd 的流

> 稳定性：1 - 实验性

基于 Zstd 的流有与 zlib 选项等效的选项，尽管
这些选项的范围与 zlib 的不同：

* zlib 的 `level` 选项对应 Zstd 的 `ZSTD_c_compressionLevel` 选项。
* zlib 的 `windowBits` 选项对应 Zstd 的 `ZSTD_c_windowLog` 选项。

有关 Zstd 特定选项的更多详细信息，请参阅 [下方][Zstd 参数]。

## 刷新

在压缩流上调用 [`.flush()`][] 会使 `zlib` 返回尽可能多的
当前可能的输出。这可能会以降低压缩
质量为代价，但当需要数据尽快可用时很有用。

在以下示例中，`flush()` 用于将压缩的部分
HTTP 响应写入客户端：

```mjs
import zlib from 'node:zlib';
import http from 'node:http';
import { pipeline } from 'node:stream';

http.createServer((request, response) => {
  // 为简单起见，省略了 Accept-Encoding 检查。
  response.writeHead(200, { 'content-encoding': 'gzip' });
  const output = zlib.createGzip();
  let i;

  pipeline(output, response, (err) => {
    if (err) {
      // 如果发生错误，我们无能为力，因为
      // 服务器已经发送了 200 响应代码，并且
      // 一些数据已经发送给了客户端。
      // 我们所能做的最好的办法是立即终止响应
      // 并记录错误。
      clearInterval(i);
      response.end();
      console.error('发生错误：', err);
    }
  });

  i = setInterval(() => {
    output.write(`当前时间是 ${Date()}\n`, () => {
      // 数据已传递给 zlib，但压缩算法可能
      // 决定缓冲数据以更有效地压缩。
      // 调用 .flush() 将使数据在客户端
      // 准备好接收时立即可用。
      output.flush();
    });
  }, 1000);
}).listen(1337);
```

```cjs
const zlib = require('node:zlib');
const http = require('node:http');
const { pipeline } = require('node:stream');

http.createServer((request, response) => {
  // 为简单起见，省略了 Accept-Encoding 检查。
  response.writeHead(200, { 'content-encoding': 'gzip' });
  const output = zlib.createGzip();
  let i;

  pipeline(output, response, (err) => {
    if (err) {
      // 如果发生错误，我们无能为力，因为
      // 服务器已经发送了 200 响应代码，并且
      // 一些数据已经发送给了客户端。
      // 我们所能做的最好的办法是立即终止响应
      // 并记录错误。
      clearInterval(i);
      response.end();
      console.error('发生错误：', err);
    }
  });

  i = setInterval(() => {
    output.write(`当前时间是 ${Date()}\n`, () => {
      // 数据已传递给 zlib，但压缩算法可能
      // 决定缓冲数据以更有效地压缩。
      // 调用 .flush() 将使数据在客户端
      // 准备好接收时立即可用。
      output.flush();
    });
  }, 1000);
}).listen(1337);
```

## 常量

<!-- YAML
added: v0.5.8
-->

<!--type=misc-->

### zlib 常量

`zlib.h` 中定义的所有常量也定义在
`require('node:zlib').constants` 上。在正常操作过程中，
没有必要使用这些常量。记录它们是为了
避免它们的存在令人惊讶。本节几乎直接取自
[zlib 文档][]。

以前，常量可以直接从 `require('node:zlib')` 获取，
例如 `zlib.Z_NO_FLUSH`。直接从模块访问常量
目前仍然可能，但已弃用。

允许的刷新值。

* `zlib.constants.Z_NO_FLUSH`
* `zlib.constants.Z_PARTIAL_FLUSH`
* `zlib.constants.Z_SYNC_FLUSH`
* `zlib.constants.Z_FULL_FLUSH`
* `zlib.constants.Z_FINISH`
* `zlib.constants.Z_BLOCK`

压缩/解压函数的返回代码。负
值表示错误，正值用于特殊但正常的
事件。

* `zlib.constants.Z_OK`
* `zlib.constants.Z_STREAM_END`
* `zlib.constants.Z_NEED_DICT`
* `zlib.constants.Z_ERRNO`
* `zlib.constants.Z_STREAM_ERROR`
* `zlib.constants.Z_DATA_ERROR`
* `zlib.constants.Z_MEM_ERROR`
* `zlib.constants.Z_BUF_ERROR`
* `zlib.constants.Z_VERSION_ERROR`

压缩级别。

* `zlib.constants.Z_NO_COMPRESSION`
* `zlib.constants.Z_BEST_SPEED`
* `zlib.constants.Z_BEST_COMPRESSION`
* `zlib.constants.Z_DEFAULT_COMPRESSION`

压缩策略。

* `zlib.constants.Z_FILTERED`
* `zlib.constants.Z_HUFFMAN_ONLY`
* `zlib.constants.Z_RLE`
* `zlib.constants.Z_FIXED`
* `zlib.constants.Z_DEFAULT_STRATEGY`

### Brotli 常量

<!-- YAML
added:
 - v11.7.0
 - v10.16.0
-->

基于 Brotli 的流有几个选项和其他可用常量：

#### 刷新操作

以下值是基于 Brotli 的流的有效刷新操作：

* `zlib.constants.BROTLI_OPERATION_PROCESS`（所有操作的默认值）
* `zlib.constants.BROTLI_OPERATION_FLUSH`（调用 `.flush()` 时的默认值）
* `zlib.constants.BROTLI_OPERATION_FINISH`（最后一个块的默认值）
* `zlib.constants.BROTLI_OPERATION_EMIT_METADATA`
  * 此特定操作在 Node.js 上下文中可能难以使用，
    因为流层使得很难知道哪些数据最终会
    出现在此帧中。此外，目前无法通过
    Node.js API 使用此数据。

#### 压缩器选项

可以在 Brotli 编码器上设置几个选项，影响
压缩效率和速度。键和值都可以作为
`zlib.constants` 对象的属性进行访问。

最重要的选项是：

* `BROTLI_PARAM_MODE`
  * `BROTLI_MODE_GENERIC`（默认）
  * `BROTLI_MODE_TEXT`，针对 UTF-8 文本调整
  * `BROTLI_MODE_FONT`，针对 WOFF 2.0 字体调整
* `BROTLI_PARAM_QUALITY`
  * 范围从 `BROTLI_MIN_QUALITY` 到 `BROTLI_MAX_QUALITY`，
    默认为 `BROTLI_DEFAULT_QUALITY`。
* `BROTLI_PARAM_SIZE_HINT`
  * 表示预期输入大小的整数值；
    未知输入大小默认为 `0`。

可以设置以下标志以高级控制压缩
算法和内存使用调优：

* `BROTLI_PARAM_LGWIN`
  * 范围从 `BROTLI_MIN_WINDOW_BITS` 到 `BROTLI_MAX_WINDOW_BITS`，
    默认为 `BROTLI_DEFAULT_WINDOW`，或者最高
    `BROTLI_LARGE_MAX_WINDOW_BITS`（如果设置了 `BROTLI_PARAM_LARGE_WINDOW` 标志）。
* `BROTLI_PARAM_LGBLOCK`
  * 范围从 `BROTLI_MIN_INPUT_BLOCK_BITS` 到 `BROTLI_MAX_INPUT_BLOCK_BITS`。
* `BROTLI_PARAM_DISABLE_LITERAL_CONTEXT_MODELING`
  * 布尔标志，降低压缩率以换取
    解压速度。
* `BROTLI_PARAM_LARGE_WINDOW`
  * 启用“超大窗口 Brotli”模式的布尔标志（与
    [RFC 7932][] 中标准化的 Brotli 格式不兼容）。
* `BROTLI_PARAM_NPOSTFIX`
  * 范围从 `0` 到 `BROTLI_MAX_NPOSTFIX`。
* `BROTLI_PARAM_NDIRECT`
  * 范围从 `0` 到 `15 << NPOSTFIX`，步长为 `1 << NPOSTFIX`。

#### 解压器选项

这些高级选项可用于控制解压：

* `BROTLI_DECODER_PARAM_DISABLE_RING_BUFFER_REALLOCATION`
  * 影响内部内存分配模式的布尔标志。
* `BROTLI_DECODER_PARAM_LARGE_WINDOW`
  * 启用“超大窗口 Brotli”模式的布尔标志（与
    [RFC 7932][] 中标准化的 Brotli 格式不兼容）。

### Zstd 常量

> 稳定性：1 - 实验性

<!-- YAML
added:
  - v23.8.0
  - v22.15.0
-->

基于 Zstd 的流有几个选项和其他可用常量：

#### 刷新操作

以下值是基于 Zstd 的流的有效刷新操作：

* `zlib.constants.ZSTD_e_continue`（所有操作的默认值）
* `zlib.constants.ZSTD_e_flush`（调用 `.flush()` 时的默认值）
* `zlib.constants.ZSTD_e_end`（最后一个块的默认值）

#### 压缩器选项

可以在 Zstd 编码器上设置几个选项，影响
压缩效率和速度。键和值都可以作为
`zlib.constants` 对象的属性进行访问。

最重要的选项是：

* `ZSTD_c_compressionLevel`
  * 根据预定义的 cLevel 表设置压缩参数。默认
    级别是 ZSTD\_CLEVEL\_DEFAULT==3。
* `ZSTD_c_strategy`
  * 选择压缩策略。
  * 可能的值列在下面的策略选项部分。

#### 策略选项

以下常量可用作 `ZSTD_c_strategy`
参数的值：

* `zlib.constants.ZSTD_fast`
* `zlib.constants.ZSTD_dfast`
* `zlib.constants.ZSTD_greedy`
* `zlib.constants.ZSTD_lazy`
* `zlib.constants.ZSTD_lazy2`
* `zlib.constants.ZSTD_btlazy2`
* `zlib.constants.ZSTD_btopt`
* `zlib.constants.ZSTD_btultra`
* `zlib.constants.ZSTD_btultra2`

示例：

```js
const stream = zlib.createZstdCompress({
  params: {
    [zlib.constants.ZSTD_c_strategy]: zlib.constants.ZSTD_btultra,
  },
});
```

#### 承诺源大小

可以通过 `opts.pledgedSrcSize` 指定未压缩输入的预期总大小，
该值必须是非负安全整数。如果大小在输入结束时不匹配，
压缩将失败，并返回代码 `ZSTD_error_srcSize_wrong`。

#### 解压器选项

这些高级选项可用于控制解压：

* `ZSTD_d_windowLogMax`
  * 选择一个大小限制（2 的幂），超过该限制流 API 将
    拒绝分配内存缓冲区，以保护主机免受
    不合理内存需求的影响。

## 类：`Options`

<!-- YAML
added: v0.11.1
changes:
  - version:
     - v26.5.0
     - v24.19.0
    pr-url: https://github.com/nodejs/node/pull/64023
    description: 添加了 `rejectGarbageAfterEnd` 选项。
  - version:
    - v14.5.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/33516
    description: "现在支持 `maxOutputLength` 选项。"
  - version: v9.4.0
    pr-url: https://github.com/nodejs/node/pull/16042
    description: "`dictionary` 选项可以是 `ArrayBuffer`。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12001
    description: "`dictionary` 选项现在可以是 `Uint8Array`。"
  - version: v5.11.0
    pr-url: https://github.com/nodejs/node/pull/6069
    description: "现在支持 `finishFlush` 选项。"
-->

<!--type=misc-->

每个基于 zlib 的类都接受一个 `options` 对象。不需要任何选项。

某些选项仅在压缩时相关，会被解压缩类忽略。

* `flush` {integer} **默认值:** `zlib.constants.Z_NO_FLUSH`
* `finishFlush` {integer} **默认值:** `zlib.constants.Z_FINISH`
* `chunkSize` {integer} **默认值:** `16 * 1024`
* `windowBits` {integer}
* `level` {integer}（仅压缩时）
* `memLevel` {integer}（仅压缩时）
* `strategy` {integer}（仅压缩时）
* `dictionary` {Buffer|TypedArray|DataView|ArrayBuffer}（仅 deflate/inflate，
  默认为空字典）
* `info` {boolean}（如果为 `true`，则返回一个包含 `buffer` 和 `engine` 的对象。）
* `maxOutputLength` {integer} 使用
  [便捷方法][] 时限制输出大小。**默认值:** [`buffer.kMaxLength`][]
* `rejectGarbageAfterEnd` {boolean} 如果为 `true`，则在压缩流结束后检测到尾随输入时，解压将失败。这
  包括不可读字节，以及在解压 gzip 时，紧随第一个成员之后的其他 gzip 成员。**默认值:** `false`

有关更多信息，请参阅 [`deflateInit2` 和 `inflateInit2`][] 文档。

## 类：`BrotliOptions`

<!-- YAML
added: v11.7.0
changes:
  - version:
     - v26.5.0
     - v24.19.0
    pr-url: https://github.com/nodejs/node/pull/64023
    description: 添加了 `rejectGarbageAfterEnd` 选项。
  - version:
    - v14.5.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/33516
    description: "现在支持 `maxOutputLength` 选项。"
-->

<!--type=misc-->

每个基于 Brotli 的类都接受一个 `options` 对象。所有选项都是可选的。

* `flush` {integer} **默认值：** `zlib.constants.BROTLI_OPERATION_PROCESS`
* `finishFlush` {integer} **默认值：** `zlib.constants.BROTLI_OPERATION_FINISH`
* `chunkSize` {integer} **默认值：** `16 * 1024`
* `params` {Object} 包含已索引 [Brotli 参数][] 的键值对象。
* `maxOutputLength` {integer} 在使用
  [便捷方法][] 时限制输出大小。**默认值：** [`buffer.kMaxLength`][]
* `info` {boolean} 如果为 `true`，则返回一个包含 `buffer` 和 `engine` 的对象。**默认值：** `false`
* `rejectGarbageAfterEnd` {boolean} 如果为 `true`，则当第一个完整压缩流之后输入仍有剩余时，解压会失败。**默认值：** `false`

例如：

```js
const stream = zlib.createBrotliCompress({
  chunkSize: 32 * 1024,
  params: {
    [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
    [zlib.constants.BROTLI_PARAM_QUALITY]: 4,
    [zlib.constants.BROTLI_PARAM_SIZE_HINT]: fs.statSync(inputFile).size,
  },
});
```

## 类：`zlib.BrotliCompress`

<!-- YAML
added:
 - v11.7.0
 - v10.16.0
-->

* 继承自：[`ZlibBase`]()

使用 Brotli 算法压缩数据。

## 类：`zlib.BrotliDecompress`

<!-- YAML
added:
 - v11.7.0
 - v10.16.0
-->

* 继承自：[`ZlibBase`][]

使用 Brotli 算法解压缩数据。

## 类：`zlib.Deflate`

<!-- YAML
added: v0.5.8
-->

* 继承自：[`ZlibBase`][]

使用 deflate 压缩数据。

## 类：`zlib.DeflateRaw`

<!-- YAML
added: v0.5.8
-->

* 继承自：[`ZlibBase`][]

使用 deflate 压缩数据，且不附加 `zlib` 头。

## 类：`zlib.Gunzip`

<!-- YAML
added: v0.5.8
changes:
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/5883
    description: "输入流末尾的尾部垃圾数据现在将导致 `'error'` 事件。"
  - version: v5.9.0
    pr-url: https://github.com/nodejs/node/pull/5120
    description: 现在支持多个连接的 gzip 文件成员。
  - version: v5.0.0
    pr-url: https://github.com/nodejs/node/pull/2595
    description: "截断的输入流现在将导致 `'error'` 事件。"
-->

* 继承自：[`ZlibBase`][]

解压缩 gzip 流。

## 类：`zlib.Gzip`

<!-- YAML
added: v0.5.8
-->

* 继承自：[`ZlibBase`][]

使用 gzip 压缩数据。

## 类：`zlib.Inflate`

<!-- YAML
added: v0.5.8
changes:
  - version: v5.0.0
    pr-url: https://github.com/nodejs/node/pull/2595
    description: "截断的输入流现在将触发 `'error'` 事件。"
-->

* 继承自：[`ZlibBase`][]

解压 deflate 流。

## 类：`zlib.InflateRaw`

<!-- YAML
added: v0.5.8
changes:
  - version: v6.8.0
    pr-url: https://github.com/nodejs/node/pull/8512
    description: "`InflateRaw` 现在支持自定义字典。"
  - version: v5.0.0
    pr-url: https://github.com/nodejs/node/pull/2595
    description: "截断的输入流现在将导致 `'error'` 事件。"
-->

* 继承自：[`ZlibBase`] []

解压缩 raw deflate 流。

## 类：`zlib.Unzip`

<!-- YAML
added: v0.5.8
-->

* 继承自：[`ZlibBase`][]

通过自动检测头来解压缩 Gzip 或 Deflate 压缩流。

## 类：`zlib.ZipBuffer`

<!-- YAML
added: REPLACEME
-->

> 稳定性：1.0 - 早期开发阶段

ZIP 归档 API 处于实验阶段。首次使用其中的任何部分（包括此类）都会发出实验性警告；仅导入 `node:zlib` 不会发出警告。

这是一个位于内存中的、**零拷贝**视图，用于查看已经存放在 `Buffer`、`TypedArray`、`DataView` 或 `ArrayBuffer` 中的 ZIP 归档条目。其条目集合可以编辑——可以添加或删除条目——但是与 [`ZipFile`][] 不同，这些编辑**不会**写入源缓冲区：新添加的条目会作为独立的内存中 [`ZipEntry`][] 保存（传入的缓冲区是固定大小的视图，没有空间追加内容），而删除操作只是将条目从 `ZipBuffer` 的索引中移除。原始字节永远不会被修改。[`zipBuffer.toBuffer()`][] 会将当前的条目集合序列化到一个新的归档中。

`ZipBuffer` 不会复制传入的归档。它会保留对该内存的视图，并直接从中延迟读取每个条目的内容，这使得无论归档大小如何，构造对象的成本都很低。代价是，在 `ZipBuffer` 或从其获取的任何 [`ZipEntry`][] 仍在使用时，**不得修改或重用**该内存——包括作为 `TypedArray`/`DataView` 后备存储的 `ArrayBuffer`：后续读取会观察到变化，并可能失败或返回损坏的数据。如果源数据可能被修改或重用，请传入副本（例如 `Buffer.from(source)`）。

`add()` 和 `toBuffer()` 各自都有对应的 `*Sync` 版本（[`addSync()`][`zipBuffer.addSync()`]、[`toBufferSync()`][`zipBuffer.toBufferSync()`]），会同步执行相同的压缩工作。与同步的 `node:fs` API 一样，这些方法会阻塞 Node.js 事件循环以及进一步的 JavaScript 执行，直到操作完成；仅在适合同步执行的场景中使用它们（例如短期脚本或启动代码），不要在必须保持响应的代码中使用。

```mjs
import { ZipBuffer } from 'node:zlib';
import { readFileSync, writeFileSync } from 'node:fs';
import { Buffer } from 'node:buffer';

const zip = new ZipBuffer(readFileSync('archive.zip'));
for (const [name, entry] of zip) {
  console.log(name, entry.size);
}
await zip.add('hello.txt', Buffer.from('Hello, world!'));
zip.delete('unwanted.txt');
writeFileSync('archive.zip', await zip.toBuffer());
```

```cjs
const { ZipBuffer } = require('node:zlib');
const { readFileSync, writeFileSync } = require('node:fs');

async function main() {
  const zip = new ZipBuffer(readFileSync('archive.zip'));
  for (const [name, entry] of zip) {
    console.log(name, entry.size);
  }
  await zip.add('hello.txt', Buffer.from('Hello, world!'));
  zip.delete('unwanted.txt');
  writeFileSync('archive.zip', await zip.toBuffer());
}
main();
```

### `new zlib.ZipBuffer(buffer)`

<!-- YAML
added: REPLACEME
-->

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer} 完整的 ZIP 归档。

解析归档的中央目录。如果 `buffer` 不是格式正确且受支持的归档，则抛出 [`ERR_ZIP_INVALID_ARCHIVE`][] 或 [`ERR_ZIP_UNSUPPORTED_FEATURE`][] 错误。

`buffer` **不会被复制**：`ZipBuffer` 会保留对它的零拷贝视图（对于 `TypedArray`、`DataView` 或 `ArrayBuffer`，即对其底层 `ArrayBuffer` 的视图），并按需直接从其中读取条目内容。当 `ZipBuffer` 或从其读取的任何条目仍处于活动状态时，不要修改或重用该内存；如果内存可能发生变化，请传入副本。

### `zipBuffer.add(filename, data[, options])`

<!-- YAML
added: REPLACEME
-->

* `filename` {string} 归档中条目的名称。以 `/` 结尾表示目录条目。
* `data` {Buffer|TypedArray|DataView|ArrayBuffer} 条目的完整、未压缩内容。
* `options` {Object} 参见 [`zlib.ZipEntry.create()`][]。
* 返回：{Promise} 兑现后得到所创建的 {ZipEntry}。

等价于 `zipBuffer.addEntry(await zlib.ZipEntry.create(filename, data,
options))`。

### `zipBuffer.addSync(filename, data[, options])`

<!-- YAML
added: REPLACEME
-->

* `filename` {string} 归档中条目的名称。以 `/` 结尾表示目录条目。
* `data` {Buffer|TypedArray|DataView|ArrayBuffer} 条目的完整、未压缩内容。
* `options` {Object} 参见 [`zlib.ZipEntry.createSync()`][]。
* 返回：{ZipEntry} 所创建的条目。

[`zipBuffer.add()`][] 的同步版本。等价于
`zipBuffer.addEntry(zlib.ZipEntry.createSync(filename, data, options))`。

### `zipBuffer.addEntry(entry)`

<!-- YAML
added: REPLACEME
-->

* `entry` {ZipEntry}
* 返回：{ZipEntry} `entry`。

添加一个已经构建的条目，以其自身的 [`zipEntry.name`][] 为键。如果已存在同名条目，则替换该条目。

### `zipBuffer.clear()`

<!-- YAML
added: REPLACEME
-->

移除所有条目。

### `zipBuffer.comment`

<!-- YAML
added: REPLACEME
-->

* 类型：{string}

归档级注释。在未被覆盖的情况下，该注释会在 [`zipBuffer.toBuffer()`][] 调用之间逐字节保留。当字节是有效的 UTF-8 时，会将其解码为 UTF-8；否则解码为 CP437（该字段自身不携带编码标志）。

### `zipBuffer.delete(name)`

<!-- YAML
added: REPLACEME
-->

* `name` {string}
* 返回：{boolean} 如果存在名为 `name` 的条目并已将其移除，则为 `true`。

### `zipBuffer.entries()`

<!-- YAML
added: REPLACEME
-->

* 返回：包含 `[name, entry]` 对的 {Iterator}，其中 `entry` 是 [`ZipEntry`][]。

### `zipBuffer.forEach(callback[, thisArg])`

<!-- YAML
added: REPLACEME
-->

* `callback` {Function}
* `thisArg` {any}

按照归档列出条目的顺序，对每个条目调用一次 `callback`。

### `zipBuffer.get(name)`

<!-- YAML
added: REPLACEME
-->

* `name` {string}
* 返回：{ZipEntry}

如果归档中不存在名为 `name` 的条目，则抛出 [`ERR_ZIP_ENTRY_NOT_FOUND`][]。

### `zipBuffer.has(name)`

<!-- YAML
added: REPLACEME
-->

* `name` {string}
* 返回：{boolean}

### `zipBuffer.keys()`

<!-- YAML
added: REPLACEME
-->

* 返回：包含条目名称的 {Iterator}。

### `zipBuffer.size`

<!-- YAML
added: REPLACEME
-->

* 类型：{number}

归档中的条目数量。

### `zipBuffer.toBuffer([options])`

<!-- YAML
added: REPLACEME
-->

* `options` {string|Object} 归档注释，可简写为
  `{ comment: options }`。
  * `comment` {string} 归档注释。**默认值：** [`zipBuffer.comment`][]。
  * `baseOffset` {number} 将归档记录的每个偏移量移动指定的字节数，使序列化后的归档即使写入最终文件的起始位置以外，也能自我描述——例如，写入已经向同一输出中写入的 `baseOffset` 字节其他内容之后。**默认值：** `0`。
* 返回：{Promise} 兑现后得到包含序列化归档的 {Buffer}。

按照条目被添加或读取的顺序，将当前的条目集合序列化到一个新的归档中，并根据需要自动切换到 Zip64 结构（参见 [`zlib.createZipArchive()`][]）。

### `zipBuffer.toBufferSync([options])`

<!-- YAML
added: REPLACEME
-->

* `options` {string|Object} 参见 [`zipBuffer.toBuffer()`][]。
* 返回：{Buffer} 序列化后的归档。

[`zipBuffer.toBuffer()`][] 的同步版本（参见 [`zlib.createZipArchiveSync()`][]）。

### `zipBuffer.values()`

<!-- YAML
added: REPLACEME
-->

* 返回：包含 [`ZipEntry`][] 的 {Iterator}。

### `zipBuffer.writable`

<!-- YAML
added: REPLACEME
-->

* 类型：{boolean}

始终为 `true`。

## 类：`zlib.ZipEntry`

<!-- YAML
added: REPLACEME
-->

> 稳定性：1.0 - 早期开发阶段

ZIP 归档 API 仍处于实验阶段。首次使用其中的任何部分（包括此类）都会发出实验性警告；仅导入 `node:zlib` 不会发出警告。

ZIP 归档中的单个文件或目录。实例由 [`ZipBuffer`][] 和 [`ZipFile`][] 生成，也可以直接通过 `ZipEntry.create()`/`ZipEntry.createStream()` 创建以进行写入。

`create()` 和 `content()` 各自都有对应的 `*Sync` 版本（流式的 `contentIterator()` 没有）。与同步的 `node:fs` API 一样，这些方法会阻塞
Node.js 事件循环以及后续的 JavaScript 执行，直到操作（包括任何 deflate/inflate 过程）完成；仅应在适合进行同步执行的场景中使用它们（例如短生命周期脚本或启动代码），而不应在必须保持响应的代码中使用。

### 静态方法：`zlib.ZipEntry.create(filename, data[, options])`

<!-- YAML
added: REPLACEME
-->

* `filename` {string} 存档中条目的名称。末尾的 `/` 表示目录条目。
* `data` {Buffer|TypedArray|DataView|ArrayBuffer} 条目的完整未压缩内容。当
  `filename` 指定目录时必须为空。
* `options` {Object}
  * `comment` {string} 条目注释。
  * `mode` {integer} Unix 权限位。**默认值：** `0o644`（目录为
    `0o755`）。
  * `modified` {Date} 条目的修改时间。**默认值：**当前时间。
  * `method` {string} `'deflate'`、`'store'` 或 `'zstd'` 之一。**默认值：**
    `'deflate'`，但目录和空内容始终使用存储方式。
* 返回：{Promise} 兑现时返回一个 {ZipEntry}。

压缩 `data`（除非 `method` 为 `'store'`，或压缩不会减小其大小），并计算其 CRC-32。

当条目最终以未压缩方式存储时（因为 `method` 为 `'store'`，或因为压缩不会减小其大小），条目会保留 `data` 的零拷贝视图，而不是副本，并且其 CRC-32 已经记录。创建条目后不要修改 `data`；如果 `data` 可能发生变化，请传入副本。

ZIP 用于 `modified` 的 MS-DOS 日期/时间字段精度为 2 秒且不包含时区。当 `modified` 不在完整的 2 秒边界上时，还会写入一个 Info-ZIP 扩展时间戳额外字段，记录完整的（UTC）秒数，以便更精确地还原时间（参见 [`zipEntry.modified`][]）。这适用于每一种条目创建路径。

### 静态方法：`zlib.ZipEntry.createStream(filename, source[, options])`

<!-- YAML
added: REPLACEME
-->

* `filename` {string} 存档中的条目名称。不得以 `/` 结尾。
* `source` {AsyncIterable} 以 `Uint8Array` 分块生成条目未压缩的内容。
* `options` {Object}
  * `comment` {string} 条目注释。
  * `mode` {integer} Unix 权限位。**默认值：** `0o644`。
  * `modified` {Date} 条目的修改时间。**默认值：**当前时间。
  * `method` {string} 可以是 `'deflate'`、`'store'` 或 `'zstd'` 之一。**默认值：**
    `'deflate'`。
* 返回：{ZipEntry}

创建一个条目，在其由 [`zlib.createZipArchive()`][] 序列化时动态压缩其内容，
不会将 `source` 缓冲在内存中。只有在序列化完成后，其 `size`、`compressedSize`
和 `crc32` 才可用。没有对应的同步方法：流式条目只有在异步、增量生成的
`source` 中才有意义。

`source` 仅在序列化期间被准确读取一次。在此之前，该条目没有可读取的内容，因此
[`zipEntry.content()`][]、[`zipEntry.contentSync()`][] 和
[`zipEntry.contentIterator()`][] 会抛出 [`ERR_INVALID_STATE`][]。如果通过
[`zipFile.addEntry()`][]（或 `addEntrySync()`）将该条目添加到可写的
[`ZipFile`][] 中进行序列化，则它会**原地转换**为一个文件支持的条目，指向刚刚写入的副本，
因此只要该 [`ZipFile`][] 保持打开状态，它就可以被读取（也可以再次序列化）。
以任何其他方式序列化它（例如直接通过 [`zlib.createZipArchive()`][]）都会使其
耗尽且无法读取。

由于 `source` 可能持有操作系统资源（例如文件读取流），流式条目是可释放的：
如果尚未消费其 `source`，它的 `Symbol.dispose` 和 `Symbol.asyncDispose` 方法会销毁
该 `source`。传递给存档的条目由该存档负责释放（参见
[`zlib.createZipArchive()`][]）；只有在条目创建后却从未交给存档时，才应直接释放它。
对于非流式条目，释放操作不会产生任何效果——尤其是文件支持的条目绝不会关闭其借用的
[`ZipFile`][] 描述符。

### 静态方法：`zlib.ZipEntry.createSymlink(filename, target[, options])`

<!-- YAML
added: REPLACEME
-->

* `filename` {string} 条目在存档中的名称。
* `target` {string} 符号链接的目标路径。
* `options` {Object}
  * `comment` {string} 条目注释。
  * `mode` {integer} Unix 权限位。**默认值：** `0o777`。
  * `modified` {Date} 条目的修改时间。**默认值：** 当前时间。
* 返回：{ZipEntry}

创建一个符号链接条目：该条目为存储条目，其内容为 `target`，且其 Unix
模式类型位将其标记为符号链接，因此读回后 [`zipEntry.isSymlink`][] 为
`true`。支持符号链接条目的解压工具会重新创建该链接；请将 `target` 视为
不受信任的内容（有关路径安全性，请参阅 [`zipEntry.name`][]）。

### 静态方法：`zlib.ZipEntry.createSync(filename, data[, options])`

<!-- YAML
added: REPLACEME
-->

* `filename` {string} 归档中的条目名称。末尾的 `/`
  表示目录条目。
* `data` {Buffer|TypedArray|DataView|ArrayBuffer} 条目的完整、
  未压缩内容。当 `filename` 表示目录时必须为空。
* `options` {Object} 请参阅 [`zlib.ZipEntry.create()`][]。
* 返回：{ZipEntry}

[`zlib.ZipEntry.create()`][] 的同步版本。

### 静态方法：`zlib.ZipEntry.read(buffer)`

<!-- YAML
added: REPLACEME
-->

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer} 一个完整的 ZIP 归档。
* 返回：{ZipEntry} 的 {Iterator}。

直接解析 `buffer` 中的每个条目，而不会将其建立索引到
[`ZipBuffer`][] 中。与 [`ZipBuffer`][] 一样，生成的条目持有的是
`buffer` 的零拷贝视图，而不是其内容的副本，因此同样适用以下规则：当其中
任何条目仍在使用时，请勿修改或重新使用 `buffer`。

### `zipEntry.comment`

<!-- YAML
added: REPLACEME
-->

* 类型：{string}

### `zipEntry.compressed`

<!-- YAML
added: REPLACEME
-->

* 类型：{boolean}

如果条目的内容以压缩形式存储（任何压缩方法，目前为 deflate 或 Zstandard），则为 `true`；如果以未压缩形式存储，则为 `false`。

### `zipEntry.compressedSize`

<!-- YAML
added: REPLACEME
-->

* 类型: {number}

### `zipEntry.content([options])`

<!-- YAML
added: REPLACEME
-->

* `options` {Object}
  * `verify` {boolean} 验证条目的 CRC-32 校验和。**默认值：** `true`。
  * `maxSize` {number} 在分配任何内容之前，拒绝声明超过此未压缩字节数的内容。**默认值：**
    [`zlib.getMaxZipContentSize()`][]。
* 返回值：{Promise} 成功时返回一个包含条目解压缩内容的 {Buffer}。该缓冲区是一个全新副本，与存档或创建条目时所使用的数据不共享任何内存。

如果条目声明的大小超过 `maxSize`，则抛出 [`ERR_ZIP_ENTRY_TOO_LARGE`][] 错误；如果内容未通过 CRC-32 验证或与其声明的大小不匹配，则抛出 [`ERR_ZIP_ENTRY_CORRUPT`][] 错误；对于内容尚不可用的流式条目（[`zlib.ZipEntry.createStream()`][]），则抛出 [`ERR_INVALID_STATE`][] 错误（有关流式条目何时变为可读，请参阅该方法）。

### `zipEntry.contentSync([options])`

<!-- YAML
added: REPLACEME
-->

* `options` {Object} 参见 [`zipEntry.content()`][]。
* 返回：{Buffer} 条目的解压缩内容。

[`zipEntry.content()`][] 的同步版本。

### `zipEntry.contentIterator([options])`

<!-- YAML
added: REPLACEME
-->

* `options` {Object}
  * `verify` {boolean} 验证条目的 CRC-32 校验和。**默认值：** `true`。
  * `maxSize` {number} 在解压任何内容之前，拒绝声明包含超过此数量未压缩字节的内容。**默认值：**无限制。
* 返回：包含条目解压缩内容的 {Buffer} 块的 {AsyncIterator}。

与 [`zipEntry.content()`][] 不同，此方法不会将整个成员缓冲在内存中。对于基于文件的条目（由 [`zipFile.get()`][] 返回的条目），压缩字节会随着迭代器的消耗从磁盘读取，并且不会保留任何内容；该条目仅在其 `ZipFile` 处于打开状态时有效。

由于流式处理是处理任意大型成员时限制内存使用的方式，因此它**不受** [`zlib.getMaxZipContentSize()`][] 限制，这一点不同于 [`zipEntry.content()`][]——该默认值用于防止单次大型分配，而流式处理不会进行此类分配。输出仍会根据声明的未压缩大小按块进行限制；传入 `maxSize` 可设置一个明确的上限。

对于以无压缩方式存储的内存中条目，生成的块是条目所保留内容的零拷贝视图（参见 [`zipEntry.rawContent`][]）；请勿修改它们。

生成的块在迭代器完成之前都是**暂定的**。CRC-32 验证（以及最终的声明大小检查）只有在读取完每个字节后才能执行，因此损坏或截断的条目会在最后一个块之后由迭代器抛出异常来报告，而不是在第一个块之前报告。每个块仍受到限制，因此总大小不会超过声明的大小或 `maxSize`，但如果消费者不得处理未经验证的字节，则应先将它们缓冲起来（或使用 [`zipEntry.content()`][]，该方法会在返回任何内容之前完成验证），而不是在块到达时立即处理。

### `zipEntry.crc32`

<!-- YAML
added: REPLACEME
-->

* 类型：{number}

### `zipEntry.flags`

<!-- YAML
added: REPLACEME
-->

* 类型: {number}

条目的原始通用位标志。

### `zipEntry.isDirectory`

<!-- YAML
added: REPLACEME
-->

* 类型：{boolean}

如果该条目是目录（其名称以 `/` 结尾），则为 `true`。

### `zipEntry.isFile`

<!-- YAML
added: REPLACEME
-->

* 类型：{boolean}

如果该条目是普通文件，则为 `true`——也就是说，既不是目录，也不是
符号链接。

### `zipEntry.isSymlink`

<!-- YAML
added: REPLACEME
-->

* 类型：{boolean}

如果条目是符号链接（其 Unix 模式类型位为
`S_IFLNK`），则为 `true`；其内容是链接目标。对于不是在类 Unix 系统上写入的归档文件，始终为
`false`。提取时，请将符号链接的目标视为不可信内容——有关路径安全性，请参阅
[`zipEntry.name`][]。

### `zipEntry.mode`

<!-- YAML
added: REPLACEME
-->

* 类型：{number}

条目的 Unix 模式权限位，包括 setuid、setgid 和 sticky 位（低 12 位，`0o7777`）；如果归档不是在类 Unix 系统上写入的，则为 `0`。此处不包含文件类型位；请使用
[`zipEntry.isDirectory`][] / [`zipEntry.isSymlink`][] 获取类型。

### `zipEntry.modified`

<!-- YAML
added: 待替换
-->

* 类型：{Date}

条目的最后修改时间。当归档文件在额外字段中携带更高精度的时间戳时——例如 NTFS（`0x000a`）、Info-ZIP 扩展（`0x5455`）或 Info-ZIP Unix（`0x5855`）字段（大多数现代工具都会写入这些字段）——将使用该绝对时间（UTC）；否则使用精度较低的本地时间 MS-DOS 日期/时间字段（精度为 2 秒）。

某些工具仅将高精度时间戳存储在本地文件头中，因此对于基于文件的条目（由 [`zipFile.get()`][] 返回的条目），首次读取此属性时可能会执行一次小型的同步定点磁盘读取，以解析该文件头。如果读取失败，该值将静默回退到中央目录数据。

### `zipEntry.method`

<!-- YAML
added: REPLACEME
-->

* 类型：{number}

条目的原始压缩方法：`0` 表示存储，`8` 表示 deflate，`93`
表示 Zstandard。

### `zipEntry.name`

<!-- YAML
added: REPLACEME
-->

* 类型：{string}

条目的名称，从中央目录中解码而来，并以其为准——如果本地文件头中的名称与之不一致，则会被忽略，因此，头部不匹配（“ZIP 混淆”）的归档无法使 `name` 与实际读取的名称不一致。如果存在有效的 Info-ZIP Unicode 路径扩展字段（`0x7075`），则从该字段中解码字节；否则，当语言编码标志（通用用途位 11）被设置**或字节是有效的 UTF-8** 时，按 UTF-8 解码（许多工具写入 UTF-8 名称时从未设置该标志）；仅当字节不满足上述条件时，才按 CP437——历史默认编码——解码。
参见 [`zipEntry.nameBuffer`][]，了解原始字节。

名称会**原样**返回：绝不会进行规范化；包含 `..`、以 `/` 开头、包含驱动器盘符或反斜杠的名称既不会被改写，也不会被拒绝。`ZipFile`/`ZipBuffer` 永远不会写入磁盘，因此在解压时防范路径遍历（“Zip Slip”）是调用方的责任。

### `zipEntry.nameBuffer`

<!-- YAML
added: REPLACEME
-->

* 类型：{Buffer}

条目的原始名称字节，在进行任何字符解码之前的内容。当归档中的名称采用 UTF-8 或 CP437 以外的编码，且调用方希望自行对其进行解码时，此属性非常有用。

### `zipEntry.rawContent`

<!-- YAML
added: REPLACEME
-->

* 类型：{Buffer|null}

条目在内存中保存时的原始内容（如果适用，仍为压缩状态）；如果没有可供公开的内存缓冲区，则为
`null`——例如，对于使用 [`zlib.ZipEntry.createStream()`][] 创建的条目，或由
[`zipFile.get()`][] 返回的文件支持条目，其字节数据会按需从磁盘读取，而不是保留在内存中。使用
[`zipEntry.content()`][] 或 [`zipEntry.contentIterator()`][] 来读取文件支持条目。

### `zipEntry.size`

<!-- YAML
added: REPLACEME
-->

* 类型：{number}

条目的未压缩大小，以字节为单位。

## 类：`zlib.ZipFile`

<!-- YAML
added: REPLACEME
-->

> 稳定性：1.0 - 早期开发

ZIP 归档 API 仍处于实验阶段。首次使用其中任何部分（包括此类）都会发出实验性警告；仅导入 `node:zlib` 不会发出警告。

提供对磁盘上 ZIP 归档条目的随机访问视图。只有归档的尾部和中央目录会预先读取；成员内容会在需要时从磁盘延迟读取。使用 `{ writable: true }` 打开时可写：[`zipFile.addEntry()`][]/ [`zipFile.add()`][] 会将新成员的数据追加到原中央目录所在的位置，然后立即在其后重写中央目录；[`zipFile.delete()`][] 只会重写中央目录。这两种操作都意味着，一旦方法返回的 `Promise` 完成，文件就已被修改。已删除或替换的成员会作为无效空间保留；[`zipFile.compact()`][] 会生成一个不包含这些空间的流。

这些就地编辑操作**不具备崩溃原子性**。中央目录会在原位置重写，因此如果写入过程中途失败——磁盘空间耗尽、设备断开连接、进程被终止——可能会导致磁盘上的归档包含不完整或缺失的中央目录，即变得无法读取，尽管其之前的成员数据仍然完整。被拒绝的调用会传递底层错误，而 `ZipFile` 对象仍可继续使用（其内存中的视图不会被丢弃，因此调用方可以尝试恢复——例如使用 [`zipFile.compact()`][] 将条目重写到其他位置），但该内存视图可能不再与磁盘上的字节匹配。当故障期间的数据持久性很重要时，请写入副本，或将 `compact()` 写入一个新文件。

每个方法都有对应的 `*Sync` 版本。与同步的 `node:fs` API 一样，这些方法会阻塞 Node.js 事件循环以及后续的 JavaScript 执行，直到操作完成；仅应在适合同步执行的场景中使用它们（例如短生命周期脚本或启动代码），不要在必须保持响应的代码中使用。如果同一 `ZipFile` 上的异步 `add()`、`addEntry()`、`delete()` 或 `close()` 尚未完成，就调用同步方法，该方法会抛出 `ERR_INVALID_STATE`，因为让两者交错执行可能会损坏归档。

```mjs
import { ZipFile } from 'node:zlib';
import { Buffer } from 'node:buffer';

const zip = await ZipFile.open('archive.zip', { writable: true });
try {
  const entry = await zip.get('member.txt');
  console.log((await entry.content()).toString());
  for await (const chunk of await zip.stream('huge.bin')) {
    // 逐个处理每个数据块，而不将整个成员缓冲在内存中。
  }
  await zip.add('new.txt', Buffer.from('hello'));
  await zip.delete('unwanted.txt');
} finally {
  await zip.close();
}
```

```cjs
const { ZipFile } = require('node:zlib');

async function main() {
  const zip = await ZipFile.open('archive.zip', { writable: true });
  try {
    const entry = await zip.get('member.txt');
    console.log((await entry.content()).toString());
    for await (const chunk of await zip.stream('huge.bin')) {
      // 逐个处理每个数据块，而不将整个成员缓冲在内存中。
    }
    await zip.add('new.txt', Buffer.from('hello'));
    await zip.delete('unwanted.txt');
  } finally {
    await zip.close();
  }
}
main();
```

### 静态方法：`zlib.ZipFile.open(filename[, options])`

<!-- YAML
added: REPLACEME
-->

* `filename` {string}
* `options` {Object}
  * `writable` {boolean} 以读写模式（`'r+'`）打开底层文件，从而启用 [`zipFile.addEntry()`][]/ [`zipFile.add()`][]/ [`zipFile.delete()`][]。**默认值：** `false`。
* 返回：{Promise} 使用 {ZipFile} 履行。

如果归档的中央目录过大，无法缓冲到内存中，则抛出 [`ERR_ZIP_ARCHIVE_TOO_LARGE`][] 错误。

### 静态方法：`zlib.ZipFile.openSync(filename[, options])`

<!-- YAML
added: REPLACEME
-->

* `filename` {string}
* `options` {Object} 参见 [`zlib.ZipFile.open()`][]。
* 返回：{ZipFile}

[`zlib.ZipFile.open()`][] 的同步版本。

### `zipFile.add(filename, data[, options])`

<!-- YAML
added: REPLACEME
-->

* `filename` {string} 存档中文件条目的名称。以 `/` 结尾表示目录条目。
* `data` {Buffer|TypedArray|DataView|ArrayBuffer} 文件条目的完整未压缩内容。
* `options` {Object} 请参阅 [`zlib.ZipEntry.create()`][]。
* 返回值：{Promise} 完成时返回所创建的 {ZipEntry}。

等效于 `zipFile.addEntry(await zlib.ZipEntry.create(filename, data,
options))`。

### `zipFile.addEntry(entry)`

<!-- YAML
added: REPLACEME
-->

* `entry` {ZipEntry}
* 返回：{Promise} 以 `entry` 完成。

将 `entry` 写入中央目录当前开始的位置，然后重写中央目录以包含该条目；如果已有同名条目，则将其替换。如果 `ZipFile` 未使用 `{ writable: true }` 打开，则抛出 [`ERR_ZIP_NOT_WRITABLE`][]。

返回的（同一个）`entry` 仍可读：使用 [`zlib.ZipEntry.createStream()`][] 创建的流式条目在序列化后通常会失效，但现在会就地提升为一个基于文件的条目，指向刚刚写入的副本（在此 `ZipFile` 保持打开期间有效）。内存中的条目则保持其自身的缓冲区不变。

### `zipFile.addEntrySync(entry)`

<!-- YAML
added: REPLACEME
-->

* `entry` {ZipEntry}
* 返回：{ZipEntry} `entry`。

[`zipFile.addEntry()`][] 的同步版本。`entry` 不得是待处理的流式条目（使用
[`zlib.ZipEntry.createStream()`][] 创建的条目）——无法以同步方式耗尽其
异步源。

### `zipFile.addSync(filename, data[, options])`

<!-- YAML
added: REPLACEME
-->

* `filename` {string} 条目在存档中的名称。末尾的 `/`
  表示目录条目。
* `data` {Buffer|TypedArray|DataView|ArrayBuffer} 条目的完整、
  未压缩内容。
* `options` {Object} 请参阅 [`zlib.ZipEntry.createSync()`][]。
* 返回值：{ZipEntry} 创建的条目。

[`zipFile.add()`][] 的同步版本。等同于
`zipFile.addEntrySync(zlib.ZipEntry.createSync(filename, data, options))`。

### `zipFile.close()`

<!-- YAML
added: REPLACEME
-->

* 返回：{Promise}

关闭底层文件句柄。

关闭不会使现有对象失效：之前由 [`zipFile.get()`][] 返回的 `ZipEntry` 对象以及 `ZipFile` 自身的方法在关闭后使用时将失败并返回系统级错误（例如 `EBADF`），而不是专用的 Node.js 错误代码。[`zipFile.closeSync()`][] 也是如此。

### `zipFile.closeSync()`

<!-- YAML
added: REPLACEME
-->

[`zipFile.close()`][] 的同步版本。

### `zipFile.comment`

<!-- YAML
added: REPLACEME
-->

* 类型：{string}

归档级注释，在调用 [`zipFile.addEntry()`][]/ [`zipFile.delete()`][] 的过程中逐字节保留。字节在属于有效 UTF-8 时按 UTF-8 解码，否则按 CP437 解码（该字段本身不携带编码标志）。

### `zipFile.compact([comment])`

<!-- YAML
added: REPLACEME
-->

* `comment` {string} 归档注释。**默认值：**[`zipFile.comment`][]。
* 返回：{stream.Readable} 当前处于活动状态的条目流，
  序列化为一个全新的归档，不包含之前调用 [`zipFile.addEntry()`][]/ [`zipFile.delete()`][] 所留下的任何空闲空间。

不会修改已打开的文件；将结果管道传输到一个新文件中：

```mjs
import { createWriteStream } from 'node:fs';
zip.compact().pipe(createWriteStream('compacted.zip'));
```

### `zipFile.compactSync([comment])`

<!-- YAML
added: REPLACEME
-->

* `comment` {string} 压缩包注释。**默认值：**[`zipFile.comment`][]。
* 返回：{Buffer} 当前有效的条目，序列化为一个全新的压缩包，不包含之前调用
  [`zipFile.addEntry()`][]/[`zipFile.delete()`][] 留下的空白空间。

[`zipFile.compact`][] 的同步版本。不会修改打开的文件。

### `zipFile.delete(name)`

<!-- YAML
added: REPLACEME
-->

* `name` {string}
* 返回值：{Promise} 如果存在名为 `name` 的条目并已将其删除，则完成时返回
  `true`，否则返回 `false`。

在不写入任何新内容的情况下重写中央目录——存档不会增大。如果 `ZipFile` 未以
`{ writable: true }` 打开，则抛出 [`ERR_ZIP_NOT_WRITABLE`][]。

### `zipFile.deleteSync(name)`

<!-- YAML
added: REPLACEME
-->

* `name` {string}
* 返回值：{boolean} 如果存在名为 `name` 的条目并已将其删除，则为 `true`，
  否则为 `false`。

[`zipFile.delete()`][] 的同步版本。

### `zipFile.entries()`

<!-- YAML
added: REPLACEME
-->

* 返回：由 `[name, entry]` 对组成的 {Iterator}，其中 `entry` 是一个
  兑现为 [`ZipEntry`][] 的 {Promise}。

### `zipFile.entriesSync()`

<!-- YAML
added: REPLACEME
-->

* 返回：由 `[name, entry]` 对组成的 {Iterator}，其中 `entry` 是已解析的
  [`ZipEntry`][]（不是 `Promise`）。

[`zipFile.entries()`][] 的同步版本。

### `zipFile.forEach(callback[, thisArg])`

<!-- YAML
added: REPLACEME
-->

* `callback` {Function}
* `thisArg` {any}

### `zipFile.forEachSync(callback[, thisArg])`

<!-- YAML
added: REPLACEME
-->

* `callback` {Function}
* `thisArg` {any}

[`zipFile.forEach()`][] 的同步版本：`callback` 将接收已解析的 [`ZipEntry`][]，
而不是 `Promise`。

### `zipFile.get(name)`

<!-- YAML
added: REPLACEME
-->

* `name` {string}
* 返回：{Promise}，成功时返回一个 {ZipEntry}。

返回一个针对 `name` 的延迟加载、由文件支持的 [`ZipEntry`][]。此处不会从磁盘读取任何内容，也不会缓存内容：返回的条目会在每次访问时直接从文件中读取其成员（对于 [`zipEntry.content()`][]，还会对其进行解压），而 `ZipFile` 不会保留任何成员内容。该条目仅在此 `ZipFile` 处于打开状态期间有效。稍后读取其内容时，如果成员过大而无法装入单个缓冲区，可能会抛出 [`ERR_ZIP_ENTRY_TOO_LARGE`][]；请改用 [`zipEntry.contentIterator()`][]（或 [`zipFile.stream()`][]）。如果归档中没有名为 `name` 的条目，则抛出 [`ERR_ZIP_ENTRY_NOT_FOUND`][]。

### `zipFile.getSync(name)`

<!-- YAML
added: REPLACEME
-->

* `name` {string}
* 返回：{ZipEntry}

[`zipFile.get()`][] 的同步版本。与 `get()` 一样，它不会预先读取任何内容，只会构建延迟句柄，因此其自身不会因 I/O 而阻塞——但之后通过返回的条目执行的读取操作（例如 [`zipEntry.contentSync()`][]）会阻塞；请参阅上文关于同步方法的说明。

### `zipFile.has(name)`

<!-- YAML
added: REPLACEME
-->

* `name` {string}
* 返回：{boolean}

### `zipFile.keys()`

<!-- YAML
added: REPLACEME
-->

* 返回：包含条目名称的 {Iterator}。

### `zipFile.size`

<!-- YAML
added: REPLACEME
-->

* 类型: {number}

存档中的条目数量。

### `zipFile.stream(name[, options])`

<!-- YAML
added: REPLACEME
-->

* `name` {string}
* `options` {Object}
  * `verify` {boolean} 验证条目的 CRC-32 校验和。**默认值：** `true`。
  * `maxSize` {number} 拒绝声明包含超过此字节数的未压缩内容。**默认值：** 无限制。
* 返回：{Promise} 兑现为一个包含成员解压缩内容的 {stream.Readable}，不会将整个成员缓冲在内存中。

便捷包装器，解析为 [`zipFile.get()`][]`(name)` 的 [`zipEntry.contentIterator()`][] 上的 `Readable`；压缩字节会在流被读取时从磁盘读取。如果归档中没有名为 `name` 的条目，返回的 promise 将因 [`ERR_ZIP_ENTRY_NOT_FOUND`][] 而拒绝。

### `zipFile.values()`

<!-- YAML
added: REPLACEME
-->

* 返回：由 {Promise} 对象组成的 {Iterator}，每个对象兑现后得到一个
  [`ZipEntry`][]。

### `zipFile.valuesSync()`

<!-- YAML
added: REPLACEME
-->

* 返回：已解析的 [`ZipEntry`][] 值的 {Iterator}（不是 `Promise`）。

[`zipFile.values()`][] 的同步版本。

### `zipFile.writable`

<!-- YAML
added: REPLACEME
-->

* 类型：{boolean}

此 `ZipFile` 是否以 `{ writable: true }` 方式打开。

## 类：`zlib.ZlibBase`

<!-- YAML
added: v0.5.8
changes:
  - version:
     - v11.7.0
     - v10.16.0
    pr-url: https://github.com/nodejs/node/pull/24939
    description: "该类已从 `Zlib` 重命名为 `ZlibBase`。"
-->

* 继承自：[`stream.Transform`][]

不由 `node:zlib` 模块导出。在此处文档化是因为它是压缩器/解压缩器类的基类。

此类继承自 [`stream.Transform`][]，允许 `node:zlib` 对象用于管道和类似的流操作。

### `zlib.bytesWritten`

<!-- YAML
added: v10.0.0
-->

* 类型：{数字}

`zlib.bytesWritten` 属性指定写入引擎的字节数，在这些字节被处理之前（压缩或解压缩，视派生类而定）。

### `zlib.close([callback])`

<!-- YAML
added: v0.9.4
-->

* `callback` {函数}

关闭底层句柄。

### `zlib.flush([kind, ]callback)`

<!-- YAML
added: v0.5.8
-->

* `kind` **默认：** 基于 zlib 的流为 `zlib.constants.Z_FULL_FLUSH`，基于 Brotli 的流为 `zlib.constants.BROTLI_OPERATION_FLUSH`。
* `callback` {函数}

刷新待处理数据。不要随意调用此方法，过早刷新会对压缩算法的有效性产生负面影响。

调用此方法仅刷新内部 `zlib` 状态中的数据，并不在流级别执行任何类型的刷新。相反，它的行为类似于正常调用 `.write()`，即它将在其他待处理写入之后排队，并且仅在从流读取数据时产生输出。

### `zlib.params(level, strategy, callback)`

<!-- YAML
added: v0.11.4
-->

* `level` {整数}
* `strategy` {整数}
* `callback` {函数}

此函数仅适用于基于 zlib 的流，即不适用于 Brotli。

动态更新压缩级别和压缩策略。仅适用于 deflate 算法。

### `zlib.reset()`

<!-- YAML
added: v0.7.0
-->

将压缩器/解压缩器重置为工厂默认值。仅适用于 inflate 和 deflate 算法。

## 类：`ZstdOptions`

> 稳定性：1 - 实验性

<!-- YAML
added:
  - v23.8.0
  - v22.15.0
changes:
  - version: v26.7.0
    pr-url: https://github.com/nodejs/node/pull/64599
    description: "`dictionary` 选项可以是 `TypedArray`、`DataView` 或 `ArrayBuffer`。"
  - version:
     - v26.5.0
     - v24.19.0
    pr-url: https://github.com/nodejs/node/pull/64023
    description: 已添加 `rejectGarbageAfterEnd` 选项。
-->

<!--type=misc-->

每个基于 Zstd 的类都接受一个 `options` 对象。所有选项都是可选的。

* `flush` {integer} **Default:** `zlib.constants.ZSTD_e_continue`
* `finishFlush` {integer} **Default:** `zlib.constants.ZSTD_e_end`
* `chunkSize` {integer} **Default:** `16 * 1024`
* `params` {Object} 包含带索引的 [Zstd parameters][] 的键值对象。
* `maxOutputLength` {integer} 使用[便捷方法][convenience methods][]时限制输出大小。**Default:** [`buffer.kMaxLength`][]
* `info` {boolean} 如果为 `true`，则返回一个包含 `buffer` 和 `engine` 的对象。**Default:** `false`
* `dictionary` {Buffer|TypedArray|DataView|ArrayBuffer} 可选的字典，用于在压缩或解压缩与字典具有共同模式的数据时提高压缩效率。
* `rejectGarbageAfterEnd` {boolean} 如果为 `true`，则当第一个完整的压缩流之后仍有输入时，解压缩会失败。**Default:** `false`

例如：

```js
const stream = zlib.createZstdCompress({
  chunkSize: 32 * 1024,
  params: {
    [zlib.constants.ZSTD_c_compressionLevel]: 10,
    [zlib.constants.ZSTD_c_checksumFlag]: 1,
  },
});
```

## 类：`zlib.ZstdCompress`

> 稳定性：1 - 实验性

<!-- YAML
added:
  - v23.8.0
  - v22.15.0
-->

使用 Zstd 算法压缩数据。

## 类：`zlib.ZstdDecompress`

> 稳定性：1 - 实验性

<!-- YAML
added:
  - v23.8.0
  - v22.15.0
-->

使用 Zstd 算法解压缩数据。

## `zlib.constants`

<!-- YAML
added: v7.0.0
-->

提供一个用于枚举 Zlib 相关常量的对象。

## `zlib.crc32(data[, value])`

<!-- YAML
added:
  - v22.2.0
  - v20.15.0
-->

* `data` {字符串|Buffer|TypedArray|DataView} 当 `data` 是字符串时，它将在用于计算之前被编码为 UTF-8。
* `value` {整数} 可选的起始值。它必须是 32 位无符号整数。**默认：** `0`
* 返回：{整数} 一个包含校验和的 32 位无符号整数。

计算 `data` 的 32 位 [循环冗余校验][] 校验和。如果指定了 `value`，则将其用作校验和的起始值，否则，使用 0 作为起始值。

CRC 算法旨在计算校验和并检测数据传输中的错误。它不适用于加密身份验证。

为了与其他 API 保持一致，如果 `data` 是字符串，它将在用于计算之前使用 UTF-8 进行编码。如果用户仅使用 Node.js 来计算和匹配校验和，这与默认使用 UTF-8 编码的其他 API 配合良好。

一些第三方 JavaScript 库基于 `str.charCodeAt()` 计算字符串的校验和，以便可以在浏览器中运行。如果用户想要匹配在浏览器中用此类库计算的校验和，最好也在 Node.js 中使用相同的库（如果它也在 Node.js 中运行）。如果用户必须使用 `zlib.crc32()` 来匹配此类第三方库生成的校验和：

1. 如果库接受 `Uint8Array` 作为输入，在浏览器中使用 `TextEncoder` 将字符串编码为 UTF-8 的 `Uint8Array`，并在浏览器中基于 UTF-8 编码的字符串计算校验和。
2. 如果库只接受字符串并基于 `str.charCodeAt()` 计算数据，在 Node.js 端，使用 `Buffer.from(str, 'utf16le')` 将字符串转换为缓冲区。

```mjs
import zlib from 'node:zlib';
import { Buffer } from 'node:buffer';

let crc = zlib.crc32('hello');  // 907060870
crc = zlib.crc32('world', crc);  // 4192936109

crc = zlib.crc32(Buffer.from('hello', 'utf16le'));  // 1427272415
crc = zlib.crc32(Buffer.from('world', 'utf16le'), crc);  // 4150509955
```

```cjs
const zlib = require('node:zlib');
const { Buffer } = require('node:buffer');

let crc = zlib.crc32('hello');  // 907060870
crc = zlib.crc32('world', crc);  // 4192936109

crc = zlib.crc32(Buffer.from('hello', 'utf16le'));  // 1427272415
crc = zlib.crc32(Buffer.from('world', 'utf16le'), crc);  // 4150509955
```

## `zlib.createBrotliCompress([options])`

<!-- YAML
added:
 - v11.7.0
 - v10.16.0
-->

* `options` {brotli options}

创建并返回一个新的 [`BrotliCompress`][] 对象。

## `zlib.createBrotliDecompress([options])`

<!-- YAML
added:
 - v11.7.0
 - v10.16.0
-->

* `options` {brotli options}

创建并返回一个新的 [`BrotliDecompress`][] 对象。

## `zlib.createDeflate([options])`

<!-- YAML
added: v0.5.8
-->

* `options` {zlib options}

创建并返回一个新的 [`Deflate`][] 对象。

## `zlib.createDeflateRaw([options])`

<!-- YAML
added: v0.5.8
-->

* `options` {zlib options}

创建并返回一个新的 [`DeflateRaw`][] 对象。

zlib 从 1.2.8 升级到 1.2.11 改变了当 `windowBits` 设置为 8 时原始 deflate 流的行为。如果最初设置为 8，zlib 会自动将 `windowBits` 设置为 9。较新版本的 zlib 将抛出异常，因此 Node.js 恢复了将值 8 升级为 9 的原始行为，因为传递 `windowBits = 9` 给 zlib 实际上会产生一个仅有效使用 8 位窗口的压缩流。

## `zlib.createGunzip([options])`

<!-- YAML
added: v0.5.8
-->

* `options` {zlib options}

创建并返回一个新的 [`Gunzip`][] 对象。

## `zlib.createGzip([options])`

<!-- YAML
added: v0.5.8
-->

* `options` {zlib options}

创建并返回一个新的 [`Gzip`][] 对象。
参见 [示例][zlib.createGzip example]】【。

## `zlib.createInflate([options])`

<!-- YAML
added: v0.5.8
-->

* `options` {zlib options}

创建并返回一个新的 [`Inflate`][] 对象。

## `zlib.createInflateRaw([options])`

<!-- YAML
added: v0.5.8
-->

* `options` {zlib options}

创建并返回一个新的 [`InflateRaw`][] 对象。

## `zlib.createUnzip([options])`

<!-- YAML
added: v0.5.8
-->

* `options` {zlib options}

创建并返回一个新的 [`Unzip`][] 对象。

## `zlib.createZipArchive(entries[, options])`

<!-- YAML
added: REPLACEME
-->

> 稳定性：1.0 - 早期开发

ZIP 归档 API 仍处于实验阶段。首次使用其中的任何部分（包括此函数）
都会发出实验性警告；仅导入 `node:zlib` 不会发出警告。

* `entries` {Iterable|AsyncIterable} [`ZipEntry`][] 的集合。
* `options` {string|Object} 归档注释；这是 `{ comment: options }` 的简写形式。
  * `comment` {string} 归档注释。
  * `baseOffset` {number} 将归档记录的每个本地/中央标头偏移量平移指定的字节数，
    这样即使归档之前写入了其他内容，生成的流也能自描述——例如，在同一文件中已经写入
    `baseOffset` 个字节后将归档追加到文件中，而不是写入文件开头。**默认值：** `0`。
* 返回：{stream.Readable} 序列化归档的字节流。

将 `entries` 序列化为 ZIP 归档；当条目数量、偏移量或大小中的任意一项超过经典
32/16 位 ZIP 字段所能容纳的范围时，自动切换为 Zip64 结构。返回的 `Readable` 同时也是
由其流式传输的相同 {Buffer} 块组成的 `AsyncIterable`。

条目按照迭代顺序写入，并且不会对名称进行去重：如果某个可迭代对象生成了两个同名条目，
则生成的归档会包含这两个条目，而大多数解压工具会保留后出现的条目。
[`ZipBuffer`][] 和 [`ZipFile`][] 的 `add()` 方法则会按名称替换条目。

条目归返回的流所有：归档生成时会逐个消费每个条目，之后不得再使用这些条目。这一点对流式
条目（来自 [`zlib.ZipEntry.createStream()`][]）尤其重要，因为它们持有底层源，例如文件
读取流。如果返回的流在完全消费之前被销毁——例如 [`pipeline()`][] 的目标失败——它会释放
正在序列化的条目以及其后仍在队列中的每个条目，并销毁它们的源，从而避免描述符泄漏。请将
流消费至末尾，或将其销毁（直接销毁、通过失败的 [`pipeline()`][] 销毁，或使用
`await using`），以确保完成清理；既未消费也未销毁的流无法释放任何资源。未交给归档的
[`ZipEntry`][] 可以直接使用 `Symbol.dispose` / `Symbol.asyncDispose` 释放。

如果归档注释以 UTF-8 编码后超过 65,535 字节，则抛出
[`ERR_ZIP_ARCHIVE_TOO_LARGE`][] 错误。

```mjs
import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { Buffer } from 'node:buffer';
import { ZipEntry, createZipArchive } from 'node:zlib';

const entries = [
  await ZipEntry.create('hello.txt', Buffer.from('Hello, world!')),
  await ZipEntry.create('data/', Buffer.alloc(0)),
];
await pipeline(
  createZipArchive(entries, 'created by node:zlib'),
  createWriteStream('archive.zip'),
);
```

```cjs
const { createWriteStream } = require('node:fs');
const { pipeline } = require('node:stream/promises');
const { ZipEntry, createZipArchive } = require('node:zlib');

async function main() {
  const entries = [
    await ZipEntry.create('hello.txt', Buffer.from('Hello, world!')),
    await ZipEntry.create('data/', Buffer.alloc(0)),
  ];
  await pipeline(
    createZipArchive(entries, 'created by node:zlib'),
    createWriteStream('archive.zip'),
  );
}
main();
```

传入 `options.baseOffset` 后，可以在同一文件中的其他内容之后放置归档，并立即使其有效，
而无需依赖读取器的自解压归档检测来补偿该偏移：

```mjs
import { createWriteStream } from 'node:fs';
import { Buffer } from 'node:buffer';
import { ZipEntry, createZipArchive } from 'node:zlib';

const prefix = Buffer.from('#!/bin/sh\nexit 0\n');
const entries = [await ZipEntry.create('hello.txt', Buffer.from('Hello, world!'))];
const out = createWriteStream('self-extracting.zip');
out.write(prefix);
createZipArchive(entries, { baseOffset: prefix.byteLength }).pipe(out);
```

## `zlib.createZipArchiveSync(entries[, options])`

<!-- YAML
added: REPLACEME
-->

> 稳定性：1.0 - 早期开发阶段

ZIP 存档 API 尚处于实验阶段。使用其中的任何部分（包括此函数）都会在首次使用时发出实验性警告；仅导入 `node:zlib` 不会发出警告。

* `entries` [`ZipEntry`][] 的 {Iterable}。
* `options` {string|Object} 参见 [`zlib.createZipArchive()`][]。
* 返回：由构成序列化存档的 {Buffer} 分块组成的 {Iterator}。

[`zlib.createZipArchive()`][] 的同步版本。在生成整个存档（包括所有 deflate 过程）之前，会阻塞 Node.js 事件循环以及后续的 JavaScript 执行；仅应在适合同步执行的场景中使用（例如短生命周期脚本或启动代码），不要在必须保持响应的代码中使用。`entries` 必须是普通的（同步）`Iterable` —— 使用 [`zlib.ZipEntry.createStream()`][] 创建的流式条目在轮到其进行序列化时会抛出异常，因为排空其异步源没有同步等价方式。

与 [`zlib.createZipArchive()`][] 一样，这些条目归返回的迭代器所有，不得重复使用。如果迭代提前停止——包括因流式条目而抛出异常的情况——导致停止的条目以及其后仍在队列中的每个条目都会被释放，从而释放它们持有的任何源。

## `zlib.zipFiles(files[, options])`

<!-- YAML
added: REPLACEME
-->

> 稳定性：1.0 - 早期开发阶段

ZIP 归档 API 尚处于实验阶段。首次使用其中任何部分（包括此函数）时都会发出实验性警告；仅导入 `node:zlib` 不会发出警告。

* `files` {Iterable} 由 `[sourcePath, entryName]` 字符串对组成。任何可迭代对象都可以——数组、`Map`、`Object.entries()` 的结果或生成器均可。
* `options` {string|Object}
  * `followSymlinks` {boolean} 解析符号链接并归档其指向的文件，而不是存储链接本身。**默认值：** `true`。
  * `comment` {string} 归档注释；字符串形式的 `options` 是 `{ comment: options }` 的简写。
  * `baseOffset` {number} 参见 [`zlib.createZipArchive()`][]。
* 返回：由构成序列化归档的 {Buffer} 分块组成的 {stream.Readable}。

从磁盘上的文件构建归档。对于每个 `[sourcePath, entryName]` 对，它会读取 `sourcePath` 并添加一个名为 `entryName` 的条目，同时记录文件的 Unix 模式和修改时间。目录会成为目录条目；普通文件的内容会以流的形式读入（作为 [`zlib.ZipEntry.createStream()`][] 条目），不会缓冲在内存中。目录内容不会递归遍历——请列出每个想要包含的路径。

当 `followSymlinks` 为 `true`（默认值）时，会解析符号链接并将其目标文件归档；当其为 `false` 时，链接本身会作为符号链接条目存储，其内容为目标路径（参见 [`zlib.ZipEntry.createSymlink()`][]）。

```mjs
import { zipFiles } from 'node:zlib';
import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

await pipeline(
  zipFiles([
    ['/data/report.pdf', 'report.pdf'],
    ['/data/notes.txt', 'docs/notes.txt'],
  ]),
  createWriteStream('archive.zip'),
);
```

## `zlib.createZstdCompress([options])`

> 稳定性：1 - 实验性

<!-- YAML
added:
  - v23.8.0
  - v22.15.0
-->

* `options` {zstd options}

创建并返回一个新的 [`ZstdCompress`][] 对象。

## `zlib.createZstdDecompress([options])`

> 稳定性：1 - 实验性

<!-- YAML
added:
  - v23.8.0
  - v22.15.0
-->

* `options` {zstd options}

创建并返回一个新的 [`ZstdDecompress`][] 对象。

## `zlib.getMaxZipContentSize()`

<!-- YAML
added: REPLACEME
-->

> 稳定性：1.0 - 早期开发阶段

ZIP 归档 API 仍处于实验阶段。首次使用其中的任何部分（包括此函数）都会发出实验性警告；仅导入 `node:zlib` 不会发出警告。

* 返回值：{number}

当未提供显式的 `maxSize` 时，[`zipEntry.content()`][] 所应用的当前默认上限，以字节为单位。**默认值：**`268435456`（256 MiB）。

## `zlib.setMaxZipContentSize(size)`

<!-- YAML
added: REPLACEME
-->

> 稳定性：1.0 - 早期开发阶段

ZIP 存档 API 仍处于实验阶段。首次使用其中的任何部分（包括此函数）都会发出实验性警告；仅导入
`node:zlib` 不会发出警告。

* `size` {number}

设置 [`zipEntry.content()`][] 在未提供明确的
`maxSize` 选项时使用的默认上限。这是防范 ZIP 炸弹的保护措施：如果存档的中央目录声明某个成员的大小超过此上限，则会在为其分配内存之前拒绝该存档。流式读取
（[`zipEntry.contentIterator()`][]、[`zipFile.stream()`][]）本身采用有界内存设计，不受此设置影响。

## 便捷方法

<!--type=misc-->

所有这些方法接受一个 {Buffer}、{TypedArray}、{DataView}、{ArrayBuffer} 或字符串作为第一个参数，一个可选的第二个参数用于向 `zlib` 类提供选项，并将使用 `callback(error, result)` 调用提供的回调。

每个方法都有一个 `*Sync` 对应方法，它接受相同的参数，但不带回调。

### `zlib.brotliCompress(buffer[, options], callback)`

<!-- YAML
added:
 - v11.7.0
 - v10.16.0
-->

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {brotli options}
* `callback` {Function}

### `zlib.brotliCompressSync(buffer[, options])`

<!-- YAML
added:
 - v11.7.0
 - v10.16.0
-->

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {brotli options}

使用 [`BrotliCompress`][] 压缩一块数据。

### `zlib.brotliDecompress(buffer[, options], callback)`

<!-- YAML
added:
 - v11.7.0
 - v10.16.0
-->

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {brotli options}
* `callback` {Function}

### `zlib.brotliDecompressSync(buffer[, options])`

<!-- YAML
added:
 - v11.7.0
 - v10.16.0
-->

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {brotli options}

使用 [`BrotliDecompress`][] 解压缩一块数据。

### `zlib.deflate(buffer[, options], callback)`

<!-- YAML
added: v0.6.0
changes:
  - version: v9.4.0
    pr-url: https://github.com/nodejs/node/pull/16042
    description: "`buffer` 参数可以是 `ArrayBuffer`。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12223
    description: "`buffer` 参数可以是任何 `TypedArray` 或 `DataView`。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12001
    description: "`buffer` 参数现在可以是 `Uint8Array`。"
-->

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {zlib options}
* `callback` {Function}

### `zlib.deflateSync(buffer[, options])`

<!-- YAML
added: v0.11.12
changes:
  - version: v9.4.0
    pr-url: https://github.com/nodejs/node/pull/16042
    description: "`buffer` 参数可以是 `ArrayBuffer`。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12223
    description: "`buffer` 参数可以是任何 `TypedArray` 或 `DataView`。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12001
    description: "`buffer` 参数现在可以是 `Uint8Array`。"
-->

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {zlib options}

使用 [`Deflate`][] 压缩一块数据。

### `zlib.deflateRaw(buffer[, options], callback)`

<!-- YAML
added: v0.6.0
changes:
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12223
    description: "`buffer` 参数可以是任何 `TypedArray` 或 `DataView`。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12001
    description: "`buffer` 参数现在可以是 `Uint8Array`。"
-->

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {zlib options}
* `callback` {Function}

### `zlib.deflateRawSync(buffer[, options])`

<!-- YAML
added: v0.11.12
changes:
  - version: v9.4.0
    pr-url: https://github.com/nodejs/node/pull/16042
    description: "`buffer` 参数可以是 `ArrayBuffer`。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12223
    description: "`buffer` 参数可以是任何 `TypedArray` 或 `DataView`。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12001
    description: "`buffer` 参数现在可以是 `Uint8Array`。"
-->

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {zlib options}

使用 [`DeflateRaw`][] 压缩一块数据。

### `zlib.gunzip(buffer[, options], callback)`

<!-- YAML
added: v0.6.0
changes:
  - version: v9.4.0
    pr-url: https://github.com/nodejs/node/pull/16042
    description: "`buffer` 参数可以是 `ArrayBuffer`。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12223
    description: "`buffer` 参数可以是任何 `TypedArray` 或 `DataView`。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12001
    description: "`buffer` 参数现在可以是 `Uint8Array`。"
-->

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {zlib options}
* `callback` {Function}

### `zlib.gunzipSync(buffer[, options])`

<!-- YAML
added: v0.11.12
changes:
  - version: v9.4.0
    pr-url: https://github.com/nodejs/node/pull/16042
    description: "`buffer` 参数可以是 `ArrayBuffer`。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12223
    description: "`buffer` 参数可以是任何 `TypedArray` 或 `DataView`。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12001
    description: "`buffer` 参数现在可以是 `Uint8Array`。"
-->

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {zlib options}

使用 [`Gunzip`][] 解压缩一块数据。

### `zlib.gzip(buffer[, options], callback)`

<!-- YAML
added: v0.6.0
changes:
  - version: v9.4.0
    pr-url: https://github.com/nodejs/node/pull/16042
    description: "`buffer` 参数可以是 `ArrayBuffer`。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12223
    description: "`buffer` 参数可以是任何 `TypedArray` 或 `DataView`。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12001
    description: "`buffer` 参数现在可以是 `Uint8Array`。"
-->

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {zlib options}
* `callback` {Function}

### `zlib.gzipSync(buffer[, options])`

<!-- YAML
added: v0.11.12
changes:
  - version: v9.4.0
    pr-url: https://github.com/nodejs/node/pull/16042
    description: "`buffer` 参数可以是 `ArrayBuffer`。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12223
    description: "`buffer` 参数可以是任何 `TypedArray` 或 `DataView`。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12001
    description: "`buffer` 参数现在可以是 `Uint8Array`。"
-->

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {zlib options}

使用 [`Gzip`][] 压缩一块数据。

### `zlib.inflate(buffer[, options], callback)`

<!-- YAML
added: v0.6.0
changes:
  - version: v9.4.0
    pr-url: https://github.com/nodejs/node/pull/16042
    description: "`buffer` 参数可以是 `ArrayBuffer`。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12223
    description: "`buffer` 参数可以是任何 `TypedArray` 或 `DataView`。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12001
    description: "`buffer` 参数现在可以是 `Uint8Array`。"
-->

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {zlib options}
* `callback` {Function}

### `zlib.inflateSync(buffer[, options])`

<!-- YAML
added: v0.11.12
changes:
  - version: v9.4.0
    pr-url: https://github.com/nodejs/node/pull/16042
    description: "`buffer` 参数可以是 `ArrayBuffer`。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12223
    description: "`buffer` 参数可以是任何 `TypedArray` 或 `DataView`。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12001
    description: "`buffer` 参数现在可以是 `Uint8Array`。"
-->

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {zlib options}

使用 [`Inflate`][] 解压缩一块数据。

### `zlib.inflateRaw(buffer[, options], callback)`

<!-- YAML
added: v0.6.0
changes:
  - version: v9.4.0
    pr-url: https://github.com/nodejs/node/pull/16042
    description: "`buffer` 参数可以是 `ArrayBuffer`。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12223
    description: "`buffer` 参数可以是任何 `TypedArray` 或 `DataView`。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12001
    description: "`buffer` 参数现在可以是 `Uint8Array`。"
-->

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {zlib options}
* `callback` {Function}

### `zlib.inflateRawSync(buffer[, options])`

<!-- YAML
added: v0.11.12
changes:
  - version: v9.4.0
    pr-url: https://github.com/nodejs/node/pull/16042
    description: "`buffer` 参数可以是 `ArrayBuffer`。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12223
    description: "`buffer` 参数可以是任何 `TypedArray` 或 `DataView`。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12001
    description: "`buffer` 参数现在可以是 `Uint8Array`。"
-->

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {zlib options}

使用 [`InflateRaw`][] 解压缩一块数据。

### `zlib.unzip(buffer[, options], callback)`

<!-- YAML
added: v0.6.0
changes:
  - version: v9.4.0
    pr-url: https://github.com/nodejs/node/pull/16042
    description: "`buffer` 参数可以是 `ArrayBuffer`。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12223
    description: "`buffer` 参数可以是任何 `TypedArray` 或 `DataView`。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12001
    description: "`buffer` 参数现在可以是 `Uint8Array`。"
-->

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {zlib options}
* `callback` {Function}

### `zlib.unzipSync(buffer[, options])`

<!-- YAML
added: v0.11.12
changes:
  - version: v9.4.0
    pr-url: https://github.com/nodejs/node/pull/16042
    description: "`buffer` 参数可以是 `ArrayBuffer`。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12223
    description: "`buffer` 参数可以是任何 `TypedArray` 或 `DataView`。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12001
    description: "`buffer` 参数现在可以是 `Uint8Array`。"
-->

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {zlib options}

使用 [`Unzip`][] 解压缩一块数据。

### `zlib.zstdCompress(buffer[, options], callback)`

> 稳定性：1 - 实验性

<!-- YAML
added:
  - v23.8.0
  - v22.15.0
-->

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {zstd options}
* `callback` {Function}

### `zlib.zstdCompressSync(buffer[, options])`

> 稳定性：1 - 实验性

<!-- YAML
added:
  - v23.8.0
  - v22.15.0
-->

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {zstd options}

使用 [`ZstdCompress`][] 压缩一块数据。

### `zlib.zstdDecompress(buffer[, options], callback)`

<!-- YAML
added:
  - v23.8.0
  - v22.15.0
-->

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {zstd options}
* `callback` {Function}

### `zlib.zstdDecompressSync(buffer[, options])`

> 稳定性：1 - 实验性

<!-- YAML
added:
  - v23.8.0
  - v22.15.0
-->

* `buffer` {Buffer|TypedArray|DataView|ArrayBuffer|string}
* `options` {zstd options}

使用 [`ZstdDecompress`][] 解压缩一块数据。

## 可迭代压缩

<!-- YAML
added: v25.9.0
-->

> 稳定性：1 - 实验性

`node:zlib/iter` 模块提供了用于 [`node:stream/iter`][] 可迭代流 API 的压缩和解压转换。

此模块仅在启用 `--experimental-stream-iter` CLI 标志时可用。

每种算法都有异步变体（有状态异步生成器，用于 [`pull()`][] 和 [`pipeTo()`][])以及同步变体（有状态同步生成器，用于 `pullSync()` 和 `pipeToSync()`）。

异步转换会在 libuv 线程池上执行压缩，将 I/O 与 JavaScript 执行重叠。同步转换则直接在主线程上执行压缩。

> 注意：这些转换的默认值针对流式吞吐量进行了调优，与 `node:zlib` 中的默认值不同。特别是，gzip/deflate 默认使用 level 4（而不是 6）和 memLevel 9（而不是 8），Brotli 默认使用 quality 6（而不是 11）。这些选择与常见的 HTTP 服务器配置一致，并且仅以很小的压缩率损失换来显著更快的压缩速度。所有默认值都可以通过选项覆盖。

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

### `compressBrotli([options])`

### `compressBrotliSync([options])`

<!-- YAML
新增：v25.9.0
-->

* `options` {Object}
  * `chunkSize` {number} 输出缓冲区大小。**默认：** `65536`（64 KB）。
  * `params` {Object} 键值对象，其中键和值为 `zlib.constants` 条目。最重要的压缩参数有：
    * `BROTLI_PARAM_MODE` -- `BROTLI_MODE_GENERIC`（默认）、`BROTLI_MODE_TEXT` 或 `BROTLI_MODE_FONT`。
    * `BROTLI_PARAM_QUALITY` -- 范围从 `BROTLI_MIN_QUALITY` 到 `BROTLI_MAX_QUALITY`。**默认：** `6`（不是 `BROTLI_DEFAULT_QUALITY`，后者是 11）。质量 6 适合流式处理；质量 11 适用于离线/构建时压缩。
    * `BROTLI_PARAM_SIZE_HINT` -- 预期输入大小。**默认：** `0`（未知）。
    * `BROTLI_PARAM_LGWIN` -- 窗口大小（log2）。**默认：** `20`（1 MB）。Brotli 库的默认值是 22（4 MB）；降低后的默认值可以在流式工作负载中节省内存，而不会显著影响压缩效果。
    * `BROTLI_PARAM_LGBLOCK` -- 输入块大小（log2）。
      请参阅 zlib 文档中的 [Brotli 压缩器选项][] 了解完整列表。
  * `dictionary` {Buffer|TypedArray|DataView}
* 返回：{Object} 一个有状态转换。

创建一个 Brotli 压缩转换。输出与 `zlib.brotliDecompress()` 以及 `decompressBrotli()`/`decompressBrotliSync()` 兼容。

### `compressDeflate([options])`

### `compressDeflateSync([options])`

<!-- YAML
添加于：v25.9.0
-->

* `options` {Object}
  * `chunkSize` {number} 输出缓冲区大小。**默认：** `65536`（64 KB）。
  * `level` {number} 压缩级别（`0`-`9`）。**默认：** `4`。
  * `windowBits` {number} **默认：** `Z_DEFAULT_WINDOWBITS`（15）。
  * `memLevel` {number} **默认：** `9`。
  * `strategy` {number} **默认：** `Z_DEFAULT_STRATEGY`。
  * `dictionary` {Buffer|TypedArray|DataView}
* 返回：{Object} 一个有状态转换。

创建一个 deflate 压缩转换。输出与 `zlib.inflate()` 以及 `decompressDeflate()`/`decompressDeflateSync()` 兼容。

### `compressGzip([options])`

### `compressGzipSync([options])`

<!-- YAML
added: v25.9.0
-->

* `options` {Object}
  * `chunkSize` {number} 输出缓冲区大小。**默认：** `65536`（64 KB）。
  * `level` {number} 压缩级别（`0`-`9`）。**默认：** `4`。
  * `windowBits` {number} **默认：** `Z_DEFAULT_WINDOWBITS`（15）。
  * `memLevel` {number} **默认：** `9`。
  * `strategy` {number} **默认：** `Z_DEFAULT_STRATEGY`。
  * `dictionary` {Buffer|TypedArray|DataView}
* 返回：{Object} 一个有状态的转换。

创建一个 gzip 压缩转换。输出与 `zlib.gunzip()` 以及 `decompressGzip()`/`decompressGzipSync()` 兼容。

### `compressZstd([options])`

### `compressZstdSync([options])`

<!-- YAML
added: v25.9.0
-->

* `options` {Object}
  * `chunkSize` {number} 输出缓冲区大小。**默认值：** `65536`（64 KB）。
  * `params` {Object} 键值对象，其中键和值均为 `zlib.constants` 条目。最重要的压缩器参数包括：
    * `ZSTD_c_compressionLevel` -- **默认值：** `ZSTD_CLEVEL_DEFAULT`（3）。
    * `ZSTD_c_checksumFlag` -- 生成校验和。**默认值：** `0`。
    * `ZSTD_c_strategy` -- 压缩策略。可选值包括
      `ZSTD_fast`、`ZSTD_dfast`、`ZSTD_greedy`、`ZSTD_lazy`、
      `ZSTD_lazy2`、`ZSTD_btlazy2`、`ZSTD_btopt`、`ZSTD_btultra`、
      `ZSTD_btultra2`。
      完整列表请参阅 zlib 文档中的 [Zstd 压缩器选项][]。
  * `pledgedSrcSize` {number} 预期的未压缩大小，必须是非负安全整数（可选提示）。
  * `dictionary` {Buffer|TypedArray|DataView}
* 返回：{Object} 一个有状态转换。

创建一个 Zstandard 压缩转换。输出与 `zlib.zstdDecompress()` 以及 `decompressZstd()`/`decompressZstdSync()` 兼容。

### `decompressBrotli([options])`

### `decompressBrotliSync([options])`

<!-- YAML
added: v25.9.0
-->

* `options` {Object}
  * `chunkSize` {number} 输出缓冲区大小。**默认：** `65536`（64 KB）。
  * `params` {Object} 键值对象，其中键和值为 `zlib.constants` 条目。可用的解压参数：
    * `BROTLI_DECODER_PARAM_DISABLE_RING_BUFFER_REALLOCATION` -- 影响内部内存分配的布尔标志。
    * `BROTLI_DECODER_PARAM_LARGE_WINDOW` -- 启用“大窗口 Brotli”模式的布尔标志（与 [RFC 7932][] 不兼容）。
      请参阅 zlib 文档中的 [Brotli 解压缩器选项][] 了解详细信息。
  * `dictionary` {Buffer|TypedArray|DataView}
* 返回：{Object} 一个有状态转换。

创建一个 Brotli 解压转换。

### `decompressDeflate([options])`

### `decompressDeflateSync([options])`

<!-- YAML
added: v25.9.0
-->

* `options` {Object}
  * `chunkSize` {number} 输出缓冲区大小。**默认：** `65536`（64 KB）。
  * `windowBits` {number} **默认：** `Z_DEFAULT_WINDOWBITS`（15）。
  * `dictionary` {Buffer|TypedArray|DataView}
* 返回：{Object} 一个有状态的转换流。

创建一个 deflate 解压缩转换流。

### `decompressGzip([options])`

### `decompressGzipSync([options])`

<!-- YAML
added: v25.9.0
-->

* `options` {Object}
  * `chunkSize` {number} 输出缓冲区大小。**默认值：** `65536`（64 KB）。
  * `windowBits` {number} **默认值：** `Z_DEFAULT_WINDOWBITS`（15）。
  * `dictionary` {Buffer|TypedArray|DataView}
* 返回：{Object} 一个有状态的转换。

创建一个 gzip 解压转换。

### `decompressZstd([options])`

### `decompressZstdSync([options])`

<!-- YAML
added: v25.9.0
-->

* `options` {Object}
  * `chunkSize` {number} 输出缓冲区大小。**默认：** `65536`（64 KB）。
  * `params` {Object} 键值对象，其中键和值为 `zlib.constants` 条目。可用的解压参数：
    * `ZSTD_d_windowLogMax` -- 解压器将分配的最大窗口大小（log2）。限制恶意输入导致的内存使用。
      请参阅 zlib 文档中的 [Zstd 解压器选项][] 了解详细信息。
  * `dictionary` {Buffer|TypedArray|DataView}
* 返回：{Object} 一个有状态转换。

创建一个 Zstandard 解压转换。

[Brotli 压缩器选项]: #compressor-options
[Brotli 解压器选项]: #decompressor-options
[Brotli 参数]: #brotli-constants
[循环冗余校验]: https://en.wikipedia.org/wiki/Cyclic_redundancy_check
[内存使用调优]: #memory-usage-tuning
[RFC 7932]: https://www.rfc-editor.org/rfc/rfc7932.html
[Streams API]: stream.md
[Zstd 压缩器选项]: #compressor-options-1
[Zstd 解压器选项]: #decompressor-options-1
[Zstd 参数]: #zstd-constants
[`.flush()`]: #zlibflushkind-callback
[`Accept-Encoding`]: https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.3
[`BrotliCompress`]: #class-zlibbrotlicompress
[`BrotliDecompress`]: #class-zlibbrotlidecompress
[`Content-Encoding`]: https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.11
[`DeflateRaw`]: #class-zlibdeflateraw
[`Deflate`]: #class-zlibdeflate
[`ERR_INVALID_STATE`]: errors.md#err_invalid_state
[`ERR_ZIP_ARCHIVE_TOO_LARGE`]: errors.md#err_zip_archive_too_large
[`ERR_ZIP_ENTRY_CORRUPT`]: errors.md#err_zip_entry_corrupt
[`ERR_ZIP_ENTRY_NOT_FOUND`]: errors.md#err_zip_entry_not_found
[`ERR_ZIP_ENTRY_TOO_LARGE`]: errors.md#err_zip_entry_too_large
[`ERR_ZIP_INVALID_ARCHIVE`]: errors.md#err_zip_invalid_archive
[`ERR_ZIP_NOT_WRITABLE`]: errors.md#err_zip_not_writable
[`ERR_ZIP_UNSUPPORTED_FEATURE`]: errors.md#err_zip_unsupported_feature
[`Gunzip`]: #class-zlibgunzip
[`Gzip`]: #class-zlibgzip
[`InflateRaw`]: #class-zlibinflateraw
[`Inflate`]: #class-zlibinflate
[`Unzip`]: #class-zlibunzip
[`ZipBuffer`]: #class-zlibzipbuffer
[`ZipEntry`]: #class-zlibzipentry
[`ZipFile`]: #class-zlibzipfile
[`ZlibBase`]: #class-zlibzlibbase
[`ZstdCompress`]: #class-zlibzstdcompress
[`ZstdDecompress`]: #class-zlibzstddecompress
[`buffer.kMaxLength`]: buffer.md#bufferkmaxlength
[`deflateInit2` 和 `inflateInit2`]: https://zlib.net/manual.html#Advanced
[`node:stream/iter`]: stream_iter.md
[`pipeTo()`]: stream_iter.md#pipetosource-transforms-writer-options
[`pipeline()`]: stream.md#streampipelinesource-transforms-destination-callback
[`pull()`]: stream_iter.md#pullsource-transforms-options
[`stream.Transform`]: stream.md#class-streamtransform
[`zipBuffer.add()`]: #zipbufferaddfilename-data-options
[`zipBuffer.addSync()`]: #zipbufferaddsyncfilename-data-options
[`zipBuffer.comment`]: #zipbuffercomment
[`zipBuffer.toBuffer()`]: #zipbuffertobufferoptions
[`zipBuffer.toBufferSync()`]: #zipbuffertobuffersyncoptions
[`zipEntry.content()`]: #zipentrycontentoptions
[`zipEntry.contentIterator()`]: #zipentrycontentiteratoroptions
[`zipEntry.contentSync()`]: #zipentrycontentsyncoptions
[`zipEntry.isDirectory`]: #zipentryisdirectory
[`zipEntry.isSymlink`]: #zipentryissymlink
[`zipEntry.modified`]: #zipentrymodified
[`zipEntry.nameBuffer`]: #zipentrynamebuffer
[`zipEntry.name`]: #zipentryname
[`zipEntry.rawContent`]: #zipentryrawcontent
[`zipFile.add()`]: #zipfileaddfilename-data-options
[`zipFile.addEntry()`]: #zipfileaddentryentry
[`zipFile.close()`]: #zipfileclose
[`zipFile.closeSync()`]: #zipfileclosesync
[`zipFile.comment`]: #zipfilecomment
[`zipFile.compact()`]: #zipfilecompactcomment
[`zipFile.delete()`]: #zipfiledeletename
[`zipFile.entries()`]: #zipfileentries
[`zipFile.forEach()`]: #zipfileforeachcallback-thisarg
[`zipFile.get()`]: #zipfilegetname
[`zipFile.stream()`]: #zipfilestreamname-options
[`zipFile.values()`]: #zipfilevalues
[`zlib.ZipEntry.create()`]: #static-method-zlibzipentrycreatefilename-data-options
[`zlib.ZipEntry.createStream()`]: #static-method-zlibzipentrycreatestreamfilename-source-options
[`zlib.ZipEntry.createSymlink()`]: #static-method-zlibzipentrycreatesymlinkfilename-target-options
[`zlib.ZipEntry.createSync()`]: #static-method-zlibzipentrycreatesyncfilename-data-options
[`zlib.ZipFile.open()`]: #static-method-zlibzipfileopenfilename-options
[`zlib.createZipArchive()`]: #zlibcreateziparchiveentries-options
[`zlib.createZipArchiveSync()`]: #zlibcreateziparchivesyncentries-options
[`zlib.getMaxZipContentSize()`]: #zlibgetmaxzipcontentsize
[便捷方法]: #convenience-methods
[zlib 文档]: https://zlib.net/manual.html#Constants
[zlib.createGzip 示例]: #zlib
