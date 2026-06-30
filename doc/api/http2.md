# HTTP/2

<!-- YAML
added: v8.4.0
changes:
  - version:
      - v15.3.0
      - v14.17.0
    pr-url: https://github.com/nodejs/node/pull/36070
    description: 可以使用 AbortSignal 中止请求。
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/34664
    description: "现在可以发送/接收带有 host 头（带或不带:authority）的请求。"
  - version: v10.10.0
    pr-url: https://github.com/nodejs/node/pull/22466
    description: HTTP/2 现在是稳定的。此前，它是实验性的。
-->

<!--introduced_in=v8.4.0-->

> 稳定性：2 - 稳定

<!-- source_link=lib/http2.js -->

`node:http2` 模块提供了 [HTTP/2][] 协议的实现。
可以通过以下方式访问：

```js
const http2 = require('node:http2');
```

## 确定是否无法使用 crypto 支持

Node.js 可能在构建时未包含对 `node:crypto` 模块的支持。在这种情况下，尝试从 `node:http2` `import` 或调用 `require('node:http2')` 将导致抛出错误。

使用 CommonJS 时，可以使用 try/catch 捕获抛出的错误：

```cjs
let http2;
try {
  http2 = require('node:http2');
} catch (err) {
  console.error('http2 support is disabled!');
}
```

使用词法 ESM `import` 关键字时，只有在尝试加载模块之前（例如，使用预加载模块）注册了 `process.on('uncaughtException')` 的处理程序，才能捕获错误。

使用 ESM 时，如果代码可能在未启用 crypto 支持的 Node.js 构建上运行，请考虑使用 [`import()`][] 函数而不是词法 `import` 关键字：

```mjs
let http2;
try {
  http2 = await import('node:http2');
} catch (err) {
  console.error('http2 support is disabled!');
}
```

## 核心 API

核心 API 提供了一个专门围绕 HTTP/2 协议功能支持设计的底层接口。它特别不是为与现有的 [HTTP/1][] 模块 API 兼容而设计的。但是，[兼容性 API][] 是按这种思路设计的。

`http2` 核心 API 在客户端和服务器之间比 `http` API 更加对称。例如，大多数事件，如 `'error'`、`'connect'` 和 `'stream'`，既可以由客户端代码发出，也可以由服务器端代码发出。

### 服务器端示例

以下说明了使用核心 API 的简单 HTTP/2 服务器。由于没有已知支持 [未加密 HTTP/2][HTTP/2 Unencrypted] 的浏览器，因此在与浏览器客户端通信时必须使用 [`http2.createSecureServer()`][].

```mjs
import { createSecureServer } from 'node:http2';
import { readFileSync } from 'node:fs';

const server = createSecureServer({
  key: readFileSync('localhost-privkey.pem'),
  cert: readFileSync('localhost-cert.pem'),
});

server.on('error', (err) => console.error(err));

server.on('stream', (stream, headers) => {
  // stream 是一个 Duplex
  stream.respond({
    'content-type': 'text/html; charset=utf-8',
    ':status': 200,
  });
  stream.end('<h1>Hello World</h1>');
});

server.listen(8443);
```

```cjs
const http2 = require('node:http2');
const fs = require('node:fs');

const server = http2.createSecureServer({
  key: fs.readFileSync('localhost-privkey.pem'),
  cert: fs.readFileSync('localhost-cert.pem'),
});
server.on('error', (err) => console.error(err));

server.on('stream', (stream, headers) => {
  // stream 是一个 Duplex
  stream.respond({
    'content-type': 'text/html; charset=utf-8',
    ':status': 200,
  });
  stream.end('<h1>Hello World</h1>');
});

server.listen(8443);
```

要为此示例生成证书和密钥，请运行：

```bash
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
  -keyout localhost-privkey.pem -out localhost-cert.pem
```

### 客户端示例

以下说明了 HTTP/2 客户端：

```mjs
import { connect } from 'node:http2';
import { readFileSync } from 'node:fs';

const client = connect('https://localhost:8443', {
  ca: readFileSync('localhost-cert.pem'),
});
client.on('error', (err) => console.error(err));

const req = client.request({ ':path': '/' });

req.on('response', (headers, flags) => {
  for (const name in headers) {
    console.log(`${name}: ${headers[name]}`);
  }
});

req.setEncoding('utf8');
let data = '';
req.on('data', (chunk) => { data += chunk; });
req.on('end', () => {
  console.log(`\n${data}`);
  client.close();
});
req.end();
```

```cjs
const http2 = require('node:http2');
const fs = require('node:fs');

const client = http2.connect('https://localhost:8443', {
  ca: fs.readFileSync('localhost-cert.pem'),
});
client.on('error', (err) => console.error(err));

const req = client.request({ ':path': '/' });

req.on('response', (headers, flags) => {
  for (const name in headers) {
    console.log(`${name}: ${headers[name]}`);
  }
});

req.setEncoding('utf8');
let data = '';
req.on('data', (chunk) => { data += chunk; });
req.on('end', () => {
  console.log(`\n${data}`);
  client.close();
});
req.end();
```

### 类：`Http2Session`

<!-- YAML
added: v8.4.0
-->

* 继承：{EventEmitter}

`http2.Http2Session` 类的实例表示 HTTP/2 客户端和服务器之间的活动通信会话。此类的实例 _不是_ 旨在由用户代码直接构造。

每个 `Http2Session` 实例将根据其是作为服务器还是客户端运行而表现出略微不同的行为。`http2session.type` 属性可用于确定 `Http2Session` 运行的模式。在服务器端，用户代码很少有机会直接使用 `Http2Session` 对象，大多数操作通常通过与 `Http2Server` 或 `Http2Stream` 对象的交互进行。

用户代码不会直接创建 `Http2Session` 实例。服务器端 `Http2Session` 实例由 `Http2Server` 实例在收到新的 HTTP/2 连接时创建。客户端 `Http2Session` 实例使用 `http2.connect()` 方法创建。

#### `Http2Session` 和套接字

每个 `Http2Session` 实例在创建时都恰好关联一个 [`net.Socket`][] 或 [`tls.TLSSocket`][]。当 `Socket` 或 `Http2Session` 被销毁时，两者都将被销毁。

由于 HTTP/2 协议施加的特定序列化和处理要求，不建议用户代码从绑定到 `Http2Session` 的 `Socket` 实例读取数据或向其写入数据。这样做可能会使 HTTP/2 会话进入不确定状态，导致会话和套接字无法使用。

一旦 `Socket` 绑定到 `Http2Session`，用户代码应仅依赖 `Http2Session` 的 API。

#### 事件：`'close'`

<!-- YAML
added: v8.4.0
-->

一旦 `Http2Session` 被销毁，就会发出 `'close'` 事件。其监听器不接受任何参数。

#### 事件：`'connect'`

<!-- YAML
added: v8.4.0
-->

* `session` {Http2Session}
* `socket` {net.Socket}

一旦 `Http2Session` 成功连接到远程对等方并且可以开始通信，就会发出 `'connect'` 事件。

用户代码通常不会直接监听此事件。

#### 事件：`'error'`

<!-- YAML
added: v8.4.0
-->

* `error` {Error}

当处理 `Http2Session` 期间发生错误时，会发出 `'error'` 事件。

#### 事件：`'frameError'`

<!-- YAML
added: v8.4.0
-->

* `type` {integer} 帧类型。
* `code` {integer} 错误代码。
* `id` {integer} 流 id（如果帧不与流关联，则为 `0`）。

当尝试在会话上发送帧时发生错误，会发出 `'frameError'` 事件。如果无法发送的帧与特定的 `Http2Stream` 关联，则会尝试在 `Http2Stream` 上发出 `'frameError'` 事件。

如果 `'frameError'` 事件与流关联，则流将在 `'frameError'` 事件之后立即关闭并销毁。如果事件不与流关联，则 `Http2Session` 将在 `'frameError'` 事件之后立即关闭。

#### 事件：`'goaway'`

<!-- YAML
added: v8.4.0
-->

* `errorCode` {number} `GOAWAY` 帧中指定的 HTTP/2 错误代码。
* `lastStreamID` {number} 远程对等方成功处理的最后一个流的 ID（如果未指定 ID，则为 `0`）。
* `opaqueData` {Buffer} 如果 `GOAWAY` 帧中包含额外的不透明数据，则将传递包含该数据的 `Buffer` 实例。

当收到 `GOAWAY` 帧时，会发出 `'goaway'` 事件。

当发出 `'goaway'` 事件时，`Http2Session` 实例将自动关闭。

#### 事件：`'localSettings'`

<!-- YAML
added: v8.4.0
-->

* `settings` {HTTP/2 设置对象} 收到的 `SETTINGS` 帧的副本。

当收到确认 `SETTINGS` 帧时，会发出 `'localSettings'` 事件。

当使用 `http2session.settings()` 提交新设置时，修改后的设置直到发出 `'localSettings'` 事件后才生效。

```js
session.settings({ enablePush: false });

session.on('localSettings', (settings) => {
  /* 使用新设置 */
});
```

#### 事件：`'ping'`

<!-- YAML
added: v10.12.0
-->

* `payload` {Buffer} `PING` 帧 8 字节负载

每当从连接的对等方收到 `PING` 帧时，就会发出 `'ping'` 事件。

#### 事件：`'remoteSettings'`

<!-- YAML
added: v8.4.0
-->

* `settings` {HTTP/2 设置对象} 收到的 `SETTINGS` 帧的副本。

当从连接的对等方收到新的 `SETTINGS` 帧时，会发出 `'remoteSettings'` 事件。

```js
session.on('remoteSettings', (settings) => {
  /* 使用新设置 */
});
```

#### 事件：`'stream'`

<!-- YAML
added: v8.4.0
-->

* `stream` {Http2Stream} 流的引用
* `headers` {HTTP/2 头对象} 描述头的对象
* `flags` {number} 关联的数字标志
* `rawHeaders` {HTTP/2 原始头} 包含原始头的数组

当创建新的 `Http2Stream` 时，会发出 `'stream'` 事件。

```js
session.on('stream', (stream, headers, flags) => {
  const method = headers[':method'];
  const path = headers[':path'];
  // ...
  stream.respond({
    ':status': 200,
    'content-type': 'text/plain; charset=utf-8',
  });
  stream.write('hello ');
  stream.end('world');
});
```

在服务器端，用户代码通常不会直接监听此事件，而是会为 `http2.createServer()` 和 `http2.createSecureServer()` 分别返回的 `net.Server` 或 `tls.Server` 实例发出的 `'stream'` 事件注册处理程序，如下例所示：

```mjs
import { createServer } from 'node:http2';

// 创建一个未加密的 HTTP/2 服务器
const server = createServer();

server.on('stream', (stream, headers) => {
  stream.respond({
    'content-type': 'text/html; charset=utf-8',
    ':status': 200,
  });
  stream.on('error', (error) => console.error(error));
  stream.end('<h1>Hello World</h1>');
});

server.listen(8000);
```

```cjs
const http2 = require('node:http2');

// 创建一个未加密的 HTTP/2 服务器
const server = http2.createServer();

server.on('stream', (stream, headers) => {
  stream.respond({
    'content-type': 'text/html; charset=utf-8',
    ':status': 200,
  });
  stream.on('error', (error) => console.error(error));
  stream.end('<h1>Hello World</h1>');
});

server.listen(8000);
```

即使 HTTP/2 流和网络套接字不是 1:1 对应，网络错误也会销毁每个单独的流，并且必须在流级别处理，如上所示。

#### 事件：`'timeout'`

<!-- YAML
added: v8.4.0
-->

在使用 `http2session.setTimeout()` 方法为此 `Http2Session` 设置超时周期后，如果在配置的毫秒数后 `Http2Session` 上没有活动，则会发出 `'timeout'` 事件。其监听器不接受任何参数。

```js
session.setTimeout(2000);
session.on('timeout', () => { /* .. */ });
```

#### `http2session.alpnProtocol`

<!-- YAML
added: v9.4.0
-->

* 类型：{string|undefined}

如果 `Http2Session` 尚未连接到套接字，值将为 `undefined`；如果 `Http2Session` 未连接到 `TLSSocket`，则为 `h2c`；否则将返回已连接的 `TLSSocket` 自身的 `alpnProtocol` 属性值。

#### `http2session.close([callback])`

<!-- YAML
added: v9.4.0
-->

* `callback` {Function}

优雅地关闭 `Http2Session`，允许任何现有流自行完成，并防止创建新的 `Http2Stream` 实例。一旦关闭，如果没有打开的 `Http2Stream` 实例，_可能_ 会调用 `http2session.destroy()`。

如果指定，`callback` 函数将注册为 `'close'` 事件的处理程序。

#### `http2session.closed`

<!-- YAML
added: v9.4.0
-->

* 类型：{boolean}

如果此 `Http2Session` 实例已关闭，则为 `true`，否则为 `false`。

#### `http2session.connecting`

<!-- YAML
added: v10.0.0
-->

* 类型：{boolean}

如果此 `Http2Session` 实例仍在连接中，则为 `true`，将在发出 `connect` 事件和/或调用 `http2.connect` 回调之前设置为 `false`。

#### `http2session.destroy([error][, code])`

<!-- YAML
added: v8.4.0
-->

* `error` {Error} 如果 `Http2Session` 因错误而被销毁，则为 `Error` 对象。
* `code` {number} 在最终 `GOAWAY` 帧中发送的 HTTP/2 错误代码。如果未指定，且 `error` 不为 undefined，则默认为 `INTERNAL_ERROR`，否则默认为 `NO_ERROR`。

立即终止 `Http2Session` 和关联的 `net.Socket` 或 `tls.TLSSocket`。

一旦销毁，`Http2Session` 将发出 `'close'` 事件。如果 `error` 不为 undefined，则会在 `'close'` 事件之前立即发出 `'error'` 事件。

如果有任何与 `Http2Session` 关联的剩余打开的 `Http2Streams`，它们也将被销毁。

#### `http2session.destroyed`

<!-- YAML
added: v8.4.0
-->

* 类型：{boolean}

如果此 `Http2Session` 实例已被销毁且不再可使用，则为 `true`，否则为 `false`。

#### `http2session.encrypted`

<!-- YAML
added: v9.4.0
-->

* 类型：{boolean|undefined}

如果 `Http2Session` 会话套接字尚未连接，则值为 `undefined`；如果 `Http2Session` 与 `TLSSocket` 连接，则为 `true`；如果 `Http2Session` 连接到任何其他类型的套接字或流，则为 `false`。

#### `http2session.goaway([code[, lastStreamID[, opaqueData]]])`

<!-- YAML
added: v9.4.0
-->

* `code` {number} HTTP/2 错误代码
* `lastStreamID` {number} 最后处理的 `Http2Stream` 的数字 ID
* `opaqueData` {Buffer|TypedArray|DataView} 包含要在 `GOAWAY` 帧中携带的额外数据的 `TypedArray` 或 `DataView` 实例。

向连接的对等方传输 `GOAWAY` 帧，_without_ 关闭 `Http2Session`。

#### `http2session.localSettings`

<!-- YAML
added: v8.4.0
-->

* 类型：{HTTP/2 设置对象}

一个无原型的对象，描述此 `Http2Session` 的当前本地设置。本地设置是 _this_ `Http2Session` 实例本地的。

#### `http2session.originSet`

<!-- YAML
added: v9.4.0
-->

* 类型：{string\[]|undefined}

如果 `Http2Session` 连接到 `TLSSocket`，`originSet` 属性将返回一个 `Array`，包含 `Http2Session` 可被视为权威的源。

`originSet` 属性仅在使用安全 TLS 连接时可用。

#### `http2session.pendingSettingsAck`

<!-- YAML
added: v8.4.0
-->

* 类型：{boolean}

指示 `Http2Session` 当前是否正在等待发送的 `SETTINGS` 帧的确认。在调用 `http2session.settings()` 方法后将为 `true`。一旦所有发送的 `SETTINGS` 帧都被确认，将为 `false`。

#### `http2session.ping([payload, ]callback)`

<!-- YAML
added: v10.12.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 callback 参数传递无效的回调现在抛出 ERR_INVALID_ARG_TYPE 而不是ERR_INVALID_CALLBACK。"
-->

* `payload` {Buffer|TypedArray|DataView} 可选的 ping 负载。
* `callback` {Function}
* 返回：{boolean}

向连接的 HTTP/2 对等方发送 `PING` 帧。必须提供 `callback` 函数。如果发送了 `PING`，该方法将返回 `true`，否则返回 `false`。

未完成的（未确认的）ping 的最大数量由 `maxOutstandingPings` 配置选项确定。默认最大值为 10。

如果提供，`payload` 必须是包含 8 字节数据的 `Buffer`、`TypedArray` 或 `DataView`，这些数据将随 `PING` 传输并在 ping 确认时返回。

回调将被调用三个参数：一个错误参数，如果 `PING` 成功确认则为 `null`，一个 `duration` 参数，报告从发送 ping 到收到确认经过的毫秒数，以及一个包含 8 字节 `PING` 负载的 `Buffer`。

```js
session.ping(Buffer.from('abcdefgh'), (err, duration, payload) => {
  if (!err) {
    console.log(`Ping acknowledged in ${duration} milliseconds`);
    console.log(`With payload '${payload.toString()}'`);
  }
});
```

如果未指定 `payload` 参数，默认负载将是标记 `PING` 持续时间开始的 64 位时间戳（小端序）。

#### `http2session.ref()`

<!-- YAML
added: v9.4.0
-->

在此 `Http2Session` 实例的底层 [`net.Socket`][] 上调用 [`ref()`][`net.Socket.prototype.ref()`]。

#### `http2session.remoteSettings`

<!-- YAML
added: v8.4.0
-->

* 类型：{HTTP/2 设置对象}

一个无原型的对象，描述此 `Http2Session` 的当前远程设置。远程设置由 _connected_ HTTP/2 对等方设置。

#### `http2session.setLocalWindowSize(windowSize)`

<!-- YAML
added:
  - v15.3.0
  - v14.18.0
-->

* `windowSize` {number}

设置本地端点的窗口大小。
`windowSize` 是要设置的总窗口大小，而不是增量。

```mjs
import { createServer } from 'node:http2';

const server = createServer();
const expectedWindowSize = 2 ** 20;
server.on('session', (session) => {

  // 设置本地窗口大小为 2 ** 20
  session.setLocalWindowSize(expectedWindowSize);
});
```

```cjs
const http2 = require('node:http2');

const server = http2.createServer();
const expectedWindowSize = 2 ** 20;
server.on('session', (session) => {

  // 设置本地窗口大小为 2 ** 20
  session.setLocalWindowSize(expectedWindowSize);
});
```

对于 http2 客户端，正确的事件是 `'connect'` 或 `'remoteSettings'`。

#### `http2session.setTimeout(msecs, callback)`

<!-- YAML
added: v8.4.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 callback 参数传递无效的回调现在抛出 ERR_INVALID_ARG_TYPE 而不是ERR_INVALID_CALLBACK。"
-->

* `msecs` {number}
* `callback` {Function}

用于设置一个回调函数，当 `Http2Session` 在 `msecs` 毫秒后没有活动时调用该函数。给定的 `callback` 注册为 `'timeout'` 事件的监听器。

#### `http2session.socket`

<!-- YAML
added: v8.4.0
-->

* 类型：{net.Socket|tls.TLSSocket}

返回一个 `Proxy` 对象，充当 `net.Socket`（或 `tls.TLSSocket`），但将可用方法限制为与 HTTP/2 一起使用安全的方法。

`destroy`、`emit`、`end`、`pause`、`read`、`resume` 和 `write` 将抛出代码为 `ERR_HTTP2_NO_SOCKET_MANIPULATION` 的错误。有关更多信息，请参阅 [`Http2Session` 和套接字][]。

`setTimeout` 方法将在此 `Http2Session` 上调用。

所有其他交互将直接路由到套接字。

#### `http2session.state`

<!-- YAML
added: v8.4.0
-->

提供有关 `Http2Session` 当前状态的各种信息。

* 类型：{Object}
  * `effectiveLocalWindowSize` {number} `Http2Session` 的当前本地（接收）流控制窗口大小。
  * `effectiveRecvDataLength` {number} 自上次流控制 `WINDOW_UPDATE` 以来当前已接收的字节数。
  * `nextStreamID` {number} 下次由此 `Http2Session` 创建新 `Http2Stream` 时要使用的数字标识符。
  * `localWindowSize` {number} 远程对等方可以在不接收 `WINDOW_UPDATE` 的情况下发送的字节数。
  * `lastProcStreamID` {number} 最近收到 `HEADERS` 或 `DATA` 帧的 `Http2Stream` 的数字 id。
  * `remoteWindowSize` {number} 此 `Http2Session` 可以在不接收 `WINDOW_UPDATE` 的情况下发送的字节数。
  * `outboundQueueSize` {number} 当前在此 `Http2Session` 的出站队列中的帧数。
  * `deflateDynamicTableSize` {number} 出站头压缩状态表的当前大小（字节）。
  * `inflateDynamicTableSize` {number} 入站头压缩状态表的当前大小（字节）。

一个描述此 `Http2Session` 当前状态的对象。

#### `http2session.settings([settings][, callback])`

<!-- YAML
added: v8.4.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 callback 参数传递无效的回调现在抛出 ERR_INVALID_ARG_TYPE 而不是ERR_INVALID_CALLBACK。"
-->

* `settings` {HTTP/2 设置对象}
* `callback` {Function} 会话连接后或如果会话已连接则立即调用的回调。
  * `err` {Error|null}
  * `settings` {HTTP/2 设置对象} 更新的 `settings` 对象。
  * `duration` {integer}

更新此 `Http2Session` 的当前本地设置，并向连接的 HTTP/2 对等方发送新的 `SETTINGS` 帧。

一旦调用，当会话等待远程对等方确认新设置时，`http2session.pendingSettingsAck` 属性将为 `true`。

新设置直到收到 `SETTINGS` 确认并发出 `'localSettings'` 事件后才生效。在确认仍在 pending 时，可以发送多个 `SETTINGS` 帧。

#### `http2session.type`

<!-- YAML
added: v8.4.0
-->

* 类型：{number}

如果此 `Http2Session` 实例是服务器，则 `http2session.type` 将等于 `http2.constants.NGHTTP2_SESSION_SERVER`，如果实例是客户端，则为 `http2.constants.NGHTTP2_SESSION_CLIENT`。

#### `http2session.unref()`

<!-- YAML
added: v9.4.0
-->

在此 `Http2Session` 实例的底层 [`net.Socket`][] 上调用 [`unref()`][`net.Socket.prototype.unref()`]。

### 类：`ServerHttp2Session`

<!-- YAML
added: v8.4.0
-->

* 继承：{Http2Session}

#### `serverhttp2session.altsvc(alt, originOrStream)`

<!-- YAML
added: v9.4.0
-->

* `alt` {string} 由 [RFC 7838][] 定义的替代服务配置的描述。
* `originOrStream` {number|string|URL|Object} 指定源的 URL 字符串（或具有 `origin` 属性的 `Object`）或由 `http2stream.id` 属性给出的活动 `Http2Stream` 的数字标识符。

向连接的客户端提交 `ALTSVC` 帧（由 [RFC 7838][] 定义）。

```mjs
import { createServer } from 'node:http2';

const server = createServer();
server.on('session', (session) => {
  // 为源 https://example.org:80 设置 altsvc
  session.altsvc('h2=":8000"', 'https://example.org:80');
});

server.on('stream', (stream) => {
  // 为特定流设置 altsvc
  stream.session.altsvc('h2=":8000"', stream.id);
});
```

```cjs
const http2 = require('node:http2');

const server = http2.createServer();
server.on('session', (session) => {
  // 为源 https://example.org:80 设置 altsvc
  session.altsvc('h2=":8000"', 'https://example.org:80');
});

server.on('stream', (stream) => {
  // 为特定流设置 altsvc
  stream.session.altsvc('h2=":8000"', stream.id);
});
```

发送带有特定流 ID 的 `ALTSVC` 帧表示替代服务与给定 `Http2Stream` 的源关联。

`alt` 和源字符串 _必须_ 仅包含 ASCII 字节，并严格解释为 ASCII 字节序列。特殊值 `'clear'` 可用于清除先前为给定域设置的任何替代服务。

当为 `originOrStream` 参数传递字符串时，它将被解析为 URL 并派生源。例如，HTTP URL `'https://example.org/foo/bar'` 的源是 ASCII 字符串 `'https://example.org'`。如果给定字符串无法解析为 URL 或无法派生有效源，将抛出错误。

`URL` 对象或任何具有 `origin` 属性的对象都可以作为 `originOrStream` 传递，在这种情况下，将使用 `origin` 属性的值。`origin` 属性的值 _必须_ 是正确序列化的 ASCII 源。

#### 指定替代服务

`alt` 参数的格式由 [RFC 7838][] 严格定义为 ASCII 字符串，包含与特定主机和端口关联的“替代”协议的逗号分隔列表。

例如，值 `'h2="example.org:81"'` 表示 HTTP/2 协议在主机 `'example.org'` 的 TCP/IP 端口 81 上可用。主机和端口 _必须_ 包含在引号（`"`）字符内。

可以指定多个替代方案，例如：`'h2="example.org:81", h2=":82"'`。

协议标识符（示例中的 `'h2'`）可以是任何有效的 [ALPN 协议 ID][]。

Node.js 实现不验证这些值的语法，并按用户提供的或从对等方接收的原样传递。

#### `serverhttp2session.origin(...origins)`

<!-- YAML
added: v10.12.0
-->

* `origins` { string | URL | Object } 一个或多个作为单独参数传递的 URL 字符串。

向连接的客户端提交 `ORIGIN` 帧（由 [RFC 8336][] 定义），以宣传服务器能够提供权威响应的源集。

```mjs
import { createSecureServer } from 'node:http2';
const options = getSecureOptionsSomehow();
const server = createSecureServer(options);
server.on('stream', (stream) => {
  stream.respond();
  stream.end('ok');
});
server.on('session', (session) => {
  session.origin('https://example.com', 'https://example.org');
});
```

```cjs
const http2 = require('node:http2');
const options = getSecureOptionsSomehow();
const server = http2.createSecureServer(options);
server.on('stream', (stream) => {
  stream.respond();
  stream.end('ok');
});
server.on('session', (session) => {
  session.origin('https://example.com', 'https://example.org');
});
```

当字符串作为 `origin` 传递时，它将被解析为 URL 并派生源。例如，HTTP URL `'https://example.org/foo/bar'` 的源是 ASCII 字符串 `'https://example.org'`。如果给定字符串无法解析为 URL 或无法派生有效源，将抛出错误。

`URL` 对象或任何具有 `origin` 属性的对象都可以作为 `origin` 传递，在这种情况下，将使用 `origin` 属性的值。`origin` 属性的值 _must_ 是正确序列化的 ASCII 源。

或者，在使用 `http2.createSecureServer()` 方法创建新的 HTTP/2 服务器时，可以使用 `origins` 选项：

```mjs
import { createSecureServer } from 'node:http2';
const options = getSecureOptionsSomehow();
options.origins = ['https://example.com', 'https://example.org'];
const server = createSecureServer(options);
server.on('stream', (stream) => {
  stream.respond();
  stream.end('ok');
});
```

```cjs
const http2 = require('node:http2');
const options = getSecureOptionsSomehow();
options.origins = ['https://example.com', 'https://example.org'];
const server = http2.createSecureServer(options);
server.on('stream', (stream) => {
  stream.respond();
  stream.end('ok');
});
```

### 类：`ClientHttp2Session`

<!-- YAML
added: v8.4.0
-->

* 继承：{Http2Session}

#### 事件：`'altsvc'`

<!-- YAML
added: v9.4.0
-->

* `alt` {string}
* `origin` {string}
* `streamId` {number}

每当客户端收到 `ALTSVC` 帧时，就会发出 `'altsvc'` 事件。事件发出时带有 `ALTSVC` 值、源和流 ID。如果 `ALTSVC` 帧中未提供 `origin`，`origin` 将为空字符串。

```mjs
import { connect } from 'node:http2';
const client = connect('https://example.org');

client.on('altsvc', (alt, origin, streamId) => {
  console.log(alt);
  console.log(origin);
  console.log(streamId);
});
```

```cjs
const http2 = require('node:http2');
const client = http2.connect('https://example.org');

client.on('altsvc', (alt, origin, streamId) => {
  console.log(alt);
  console.log(origin);
  console.log(streamId);
});
```

#### 事件：`'origin'`

<!-- YAML
added: v10.12.0
-->

* `origins` {string\[]}

每当客户端收到 `ORIGIN` 帧时，就会发出 `'origin'` 事件。事件发出时带有 `origin` 字符串数组。`http2session.originSet` 将更新为包括收到的源。

```mjs
import { connect } from 'node:http2';
const client = connect('https://example.org');

client.on('origin', (origins) => {
  for (let n = 0; n < origins.length; n++)
    console.log(origins[n]);
});
```

```cjs
const http2 = require('node:http2');
const client = http2.connect('https://example.org');

client.on('origin', (origins) => {
  for (let n = 0; n < origins.length; n++)
    console.log(origins[n]);
});
```

`'origin'` 事件仅在使用安全 TLS 连接时发出。

#### `clienthttp2session.request(headers[, options])`

<!-- YAML
added: v8.4.0
changes:
  - version:
     - v24.2.0
     - v22.23.0
    pr-url: https://github.com/nodejs/node/pull/58293
    description: weight 选项现在被忽略，设置它将触发运行时警告。
  - version:
      - v24.2.0
      - v22.17.0
      - v20.19.6
    pr-url: __TRANSD_LOCK_3__
    description: 遵循 RFC 9113 中优先级信令的弃用，weight 选项已弃用。
  - version:
      - v24.0.0
      - v22.17.0
    pr-url: https://github.com/nodejs/node/pull/57917
    description: 允许以原始数组格式传递头。
-->

* `headers` {HTTP/2 头对象|HTTP/2 原始头}

* `options` {Object}
  * `endStream` {boolean} 如果 `Http2Stream` _可写_ 端应最初关闭，则为 `true`，例如发送不应期望负载主体的 `GET` 请求时。
  * `exclusive` {boolean} 当为 `true` 且 `parent` 标识父流时，创建的流成为父流的唯一直接依赖项，所有其他现有依赖项成为新创建流的依赖项。**默认：** `false`。
  * `parent` {number} 指定新创建的流所依赖的流的数字标识符。
  * `waitForTrailers` {boolean} 当为 `true` 时，`Http2Stream` 将在发送最终 `DATA` 帧后发出 `'wantTrailers'` 事件。
  * `signal` {AbortSignal} 可用于中止正在进行的请求的 AbortSignal。

* 返回：{ClientHttp2Stream}

仅对于 HTTP/2 客户端 `Http2Session` 实例，`http2session.request()` 创建并返回一个 `Http2Stream` 实例，可用于向连接的服务器发送 HTTP/2 请求。

当首次创建 `ClientHttp2Session` 时，套接字可能尚未连接。如果在此期间调用 `clienthttp2session.request()`，实际请求将推迟到套接字准备就绪为止。

如果会话在请求创建之前变得不可用，返回的流将异步发出 `ERR_HTTP2_GOAWAY_SESSION` 或
`ERR_HTTP2_INVALID_SESSION`。

此方法仅在 `http2session.type` 等于 `http2.constants.NGHTTP2_SESSION_CLIENT` 时可用。

```mjs
import { connect, constants } from 'node:http2';
const clientSession = connect('https://localhost:1234');
const {
  HTTP2_HEADER_PATH,
  HTTP2_HEADER_STATUS,
} = constants;

const req = clientSession.request({ [HTTP2_HEADER_PATH]: '/' });
req.on('response', (headers) => {
  console.log(headers[HTTP2_HEADER_STATUS]);
  req.on('data', (chunk) => { /* .. */ });
  req.on('end', () => { /* .. */ });
});
```

```cjs
const http2 = require('node:http2');
const clientSession = http2.connect('https://localhost:1234');
const {
  HTTP2_HEADER_PATH,
  HTTP2_HEADER_STATUS,
} = http2.constants;

const req = clientSession.request({ [HTTP2_HEADER_PATH]: '/' });
req.on('response', (headers) => {
  console.log(headers[HTTP2_HEADER_STATUS]);
  req.on('data', (chunk) => { /* .. */ });
  req.on('end', () => { /* .. */ });
});
```

当设置 `options.waitForTrailers` 选项时，`'wantTrailers'` 事件在排队要发送的最后一块负载数据后立即发出。然后可以调用 `http2stream.sendTrailers()` 方法向对等方发送尾随头。

当设置 `options.waitForTrailers` 时，`Http2Stream` 在传输最终 `DATA` 帧时不会自动关闭。用户代码必须调用 `http2stream.sendTrailers()` 或 `http2stream.close()` 来关闭 `Http2Stream`。

当 `options.signal` 设置为 `AbortSignal` 然后在相应的 `AbortController` 上调用 `abort` 时，请求将发出带有 `AbortError` 错误的 `'error'` 事件。

`:method` 和 `:path` 伪头未在 `headers` 中指定，它们分别默认为：

* `:method` = `'GET'`
* `:path` = `/`

### 类：`Http2Stream`

<!-- YAML
added: v8.4.0
-->

* 继承：{stream.Duplex}

`Http2Stream` 类的每个实例表示 `Http2Session` 实例上的双向 HTTP/2 通信流。任何单个 `Http2Session` 在其生命周期内最多可以有 2<sup>31</sup>-1 个 `Http2Stream` 实例。

用户代码不会直接构造 `Http2Stream` 实例。相反，这些实例是通过 `Http2Session` 实例创建、管理并提供给用户代码的。在服务器上，`Http2Stream` 实例是响应传入的 HTTP 请求（并通过 `'stream'` 事件交给用户代码）创建的，或者响应调用 `http2stream.pushStream()` 方法创建的。在客户端，当调用 `http2session.request()` 方法时，或响应传入的 `'push'` 事件时，创建并返回 `Http2Stream` 实例。

`Http2Stream` 类是 [`ServerHttp2Stream`][] 和 [`ClientHttp2Stream`][] 类的基础，每个类分别由服务器端或客户端专门使用。

所有 `Http2Stream` 实例都是 [`Duplex`][] 流。`Duplex` 的 `Writable` 端用于向连接的对等方发送数据，而 `Readable` 端用于接收连接的对等方发送的数据。

`Http2Stream` 的默认文本字符编码为 UTF-8。当使用 `Http2Stream` 发送文本时，使用 `'content-type'` 头设置字符编码。

```js
stream.respond({
  'content-type': 'text/html; charset=utf-8',
  ':status': 200,
});
```

#### `Http2Stream` 生命周期

##### 创建

在服务器端，[`ServerHttp2Stream`][] 的实例在以下情况下创建：

* 收到带有以前未使用的流 ID 的新 HTTP/2 `HEADERS` 帧；
* 调用 `http2stream.pushStream()` 方法。

在客户端，当调用 `http2session.request()` 方法时，创建 [`ClientHttp2Stream`][] 的实例。

在客户端，如果父 `Http2Session` 尚未完全建立，`http2session.request()` 返回的 `Http2Stream` 实例可能无法立即使用。在这种情况下，在 `Http2Stream` 上调用的操作将被缓冲，直到发出 `'ready'` 事件。用户代码应该很少（如果有）需要直接处理 `'ready'` 事件。`Http2Stream` 的就绪状态可以通过检查 `http2stream.id` 的值来确定。如果值为 `undefined`，则流尚未准备好使用。

##### 销毁

当发生以下情况之一时，所有 [`Http2Stream`][] 实例都会被销毁：

* 双方发送 `END_STREAM`（一次干净交换）。
* 对端发送 `RST_STREAM` 帧。
* 本地调用 `http2stream.close()`、`http2stream.destroy()` 或 `http2session.destroy()`。

对于干净交换和干净取消，销毁会延迟到所有待处理的 `'end'` 和 `'finish'` 事件触发之后。销毁时，如果尚未发送，会尝试向已连接的对端发送 `RST_STREAM` 帧。

销毁时总会发出 `'close'`。如果各自的一半在销毁前已完成，则会触发 `'end'` 和 `'finish'`。当销毁携带错误时会触发 `'error'`——要么通过 `http2stream.destroy(err)`，要么在对端在发送 `END_STREAM` 之前重置了流。

在 `Http2Stream` 被销毁后，`http2stream.destroyed` 属性将为 `true`，`http2stream.rstCode` 属性将指定 `RST_STREAM` 错误代码。`Http2Stream` 实例一旦销毁就不再可用。

#### 事件：`'aborted'`

<!-- YAML
added: v8.4.0
changes:
  - version: REPLACEME
    pr-url: https://github.com/nodejs/node/pull/63249
    description: Documentation-only deprecation.
-->

> 稳定性：0 - 已弃用。请改用 `'close'` 和 `'error'`，再加上
> `stream.destroyed`。

当 `Http2Stream` 在可写侧通过 `.end()` 结束之前关闭时，会发出此事件（或通过 `respond({ endStream: true })` 自动结束）。监听器不接收任何参数。

#### 事件：`'close'`

<!-- YAML
added: v8.4.0
-->

当 `Http2Stream` 被销毁时，会发出 `'close'` 事件。一旦发出此事件，`Http2Stream` 实例就不再可用。

关闭流时使用的 HTTP/2 错误代码可以通过 `http2stream.rstCode` 属性获取。

#### 事件：`'error'`

<!-- YAML
added: v8.4.0
changes:
  - version: REPLACEME
    pr-url: https://github.com/nodejs/node/pull/63249
    description: >-
      也会在对端发起的重置在 `END_STREAM` 之前到达时发出（对于干净代码使用
      `ERR_HTTP2_STREAM_ABORTED`，否则使用 `ERR_HTTP2_STREAM_ERROR`）。本地发起且没有显式错误的重置
      仍保持静默。
-->

* `error` {Error}

当处理 `Http2Stream` 时发生错误，会发出此事件。这包括在可读侧尚未完全传递时到达的对端发起重置：干净的重置代码（`NGHTTP2_NO_ERROR` 或
`NGHTTP2_CANCEL`）会表现为 [`ERR_HTTP2_STREAM_ABORTED`][]，其他任何代码则表现为 [`ERR_HTTP2_STREAM_ERROR`][]。

#### 事件：`'frameError'`

<!-- YAML
added: v8.4.0
-->

* `type` {integer} 帧类型。
* `code` {integer} 错误代码。
* `id` {integer} 流 id（如果帧不与流关联，则为 `0`）。

当尝试发送帧时发生错误，会发出 `'frameError'` 事件。调用时，处理函数将接收一个标识帧类型的整数参数，和一个标识错误代码的整数参数。`Http2Stream` 实例将在 `'frameError'` 事件发出后立即销毁。

#### 事件：`'ready'`

<!-- YAML
added: v8.4.0
-->

当 `Http2Stream` 已打开，已分配 `id`，并且可以使用时，会发出 `'ready'` 事件。监听器不接受任何参数。

#### 事件：`'timeout'`

<!-- YAML
added: v8.4.0
-->

当使用 `http2stream.setTimeout()` 设置的毫秒数内此 `Http2Stream` 未收到活动时，会发出 `'timeout'` 事件。其监听器不接受任何参数。

#### 事件：`'trailers'`

<!-- YAML
added: v8.4.0
-->

* `headers` {HTTP/2 Headers Object} 一个描述这些标头的对象
* `flags` {number} 相关的数值标志
* `rawHeaders` {HTTP/2 Raw Headers}

当收到与尾随头字段相关联的一组标头时，会发出 `'trailers'` 事件。监听器回调会接收 [HTTP/2 Headers Object][]、与标头关联的标志，以及原始格式的标头（参见 [HTTP/2 Raw Headers][]）。

如果在收到尾随头之前调用 `http2stream.end()`，且未读取或监听传入数据，则可能不会发出此事件。

```js
stream.on('trailers', (headers, flags) => {
  console.log(headers);
});
```

#### 事件：`'wantTrailers'`

<!-- YAML
added: v10.0.0
-->

当 `Http2Stream` 已排队要在帧上发送的最终 `DATA` 帧并且 `Http2Stream` 准备好发送尾随头时，会发出 `'wantTrailers'` 事件。发起请求或响应时，必须设置 `waitForTrailers` 选项才能发出此事件。

#### `http2stream.aborted`

<!-- YAML
added: v8.4.0
-->

* 类型：{boolean}

如果 `true` 在可写侧仍然打开时已关闭。设置后，会发出 `'aborted'` 事件。

#### `http2stream.bufferSize`

<!-- YAML
added:
 - v11.2.0
 - v10.16.0
-->

* 类型：{number}

此属性显示当前缓冲区中待写入的字符数。有关详细信息，请参阅 [`net.Socket.bufferSize`][]。

#### `http2stream.close(code[, callback])`

<!-- YAML
added: v8.4.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 callback 参数传递无效的回调现在抛出 ERR_INVALID_ARG_TYPE 而不是ERR_INVALID_CALLBACK。"
-->

* `code` {number} 标识错误代码的无符号 32 位整数。**默认：** `http2.constants.NGHTTP2_NO_ERROR` (`0x00`)。
* `callback` {Function} 注册为监听 `'close'` 事件的可选函数。

通过向连接的 HTTP/2 对等方发送 `RST_STREAM` 帧来关闭 `Http2Stream` 实例。

#### `http2stream.closed`

<!-- YAML
added: v9.4.0
-->

* 类型：{boolean}

如果 `Http2Stream` 实例已关闭，则设置为 `true`。

#### `http2stream.destroyed`

<!-- YAML
added: v8.4.0
-->

* 类型：{boolean}

如果 `Http2Stream` 实例已被销毁且不再可用，则设置为 `true`。

#### `http2stream.endAfterHeaders`

<!-- YAML
added: v10.11.0
-->

* 类型：{boolean}

如果在收到的请求或响应 HEADERS 帧中设置了 `END_STREAM` 标志，则设置为 `true`，表示不应接收额外数据，并且 `Http2Stream` 的可读端将关闭。

#### `http2stream.id`

<!-- YAML
added: v8.4.0
-->

* 类型：{number|undefined}

此 `Http2Stream` 实例的数字流标识符。如果尚未分配流标识符，则设置为 `undefined`。

#### `http2stream.pending`

<!-- YAML
added: v9.4.0
-->

* 类型：{boolean}

如果 `Http2Stream` 实例尚未分配数字流标识符，则设置为 `true`。

#### `http2stream.priority(options)`

<!-- YAML
added: v8.4.0
deprecated:
 - v24.2.0
 - v22.17.0
 - v20.19.6
changes:
  - version:
     - v24.2.0
     - v22.23.0
    pr-url: https://github.com/nodejs/node/pull/58293
    description: 此方法不再设置流的优先级。使用它现在会触发运行时警告。
-->

> 稳定性：0 - 已弃用：[RFC 9113][] 中已弃用对优先级信令的支持，Node.js 中不再支持。

空方法，仅用于保持一些向后兼容性。

#### `http2stream.rstCode`

<!-- YAML
added: v8.4.0
-->

* 类型：{number}

设置为在从连接的对等方收到 `RST_STREAM` 帧、调用 `http2stream.close()` 或 `http2stream.destroy()` 后销毁 `Http2Stream` 时报告的 `RST_STREAM` [错误代码][]。如果 `Http2Stream` 尚未关闭，则为 `undefined`。

#### `http2stream.sentHeaders`

<!-- YAML
added: v9.5.0
-->

* 类型：{HTTP/2 头对象}

包含为此 `Http2Stream` 发送的出站头的对象。

#### `http2stream.sentInfoHeaders`

<!-- YAML
added: v9.5.0
-->

* 类型：{HTTP/2 头对象\[]}

包含为此 `Http2Stream` 发送的出站信息（额外）头的对象数组。

#### `http2stream.sentTrailers`

<!-- YAML
added: v9.5.0
-->

* 类型：{HTTP/2 头对象}

包含为此 `HttpStream` 发送的出站尾随头的对象。

#### `http2stream.session`

<!-- YAML
added: v8.4.0
-->

* 类型：{Http2Session}

对拥有此 `Http2Stream` 的 `Http2Session` 实例的引用。`Http2Stream` 实例销毁后，值将为 `undefined`。

#### `http2stream.setTimeout(msecs, callback)`

<!-- YAML
added: v8.4.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 callback 参数传递无效的回调现在抛出 ERR_INVALID_ARG_TYPE 而不是ERR_INVALID_CALLBACK。"
-->

* `msecs` {number}
* `callback` {Function}

```mjs
import { connect, constants } from 'node:http2';
const client = connect('http://example.org:8000');
const { NGHTTP2_CANCEL } = constants;
const req = client.request({ ':path': '/' });

// 如果 5 秒后没有活动则取消流
req.setTimeout(5000, () => req.close(NGHTTP2_CANCEL));
```

```cjs
const http2 = require('node:http2');
const client = http2.connect('http://example.org:8000');
const { NGHTTP2_CANCEL } = http2.constants;
const req = client.request({ ':path': '/' });

// 如果 5 秒后没有活动则取消流
req.setTimeout(5000, () => req.close(NGHTTP2_CANCEL));
```

#### `http2stream.state`

<!-- YAML
added: v8.4.0
changes:
  - version:
     - v24.2.0
     - v22.23.0
    pr-url: https://github.com/nodejs/node/pull/58293
    description: state.weight 属性现在始终设置为 16，sumDependencyWeight 始终设置为 0。
  - version:
      - v24.2.0
      - v22.17.0
      - v20.19.6
    pr-url: https://github.com/nodejs/node/pull/58313
    description: 遵循 RFC 9113 中优先级信令的弃用，weight 和 sumDependencyWeight 选项已弃用。
-->

提供有关 `Http2Stream` 当前状态的各种信息。

* 类型：{Object}
  * `localWindowSize` {number} 连接的对等方可以为此 `Http2Stream` 发送的字节数，而无需接收 `WINDOW_UPDATE`。
  * `state` {number} 由 `nghttp2` 确定的 `Http2Stream` 的底层当前状态的标志。
  * `localClose` {number} 如果此 `Http2Stream` 已在本地关闭，则为 `1`。
  * `remoteClose` {number} 如果此 `Http2Stream` 已在远程关闭，则为 `1`。
  * `sumDependencyWeight` {number} 遗留属性，始终设置为 `0`。
  * `weight` {number} 遗留属性，始终设置为 `16`。

此 `Http2Stream` 的当前状态。

#### `http2stream.sendTrailers(headers)`

<!-- YAML
added: v10.0.0
-->

* `headers` {HTTP/2 头对象}

向连接的 HTTP/2 对等方发送尾随头帧。此方法将导致 `Http2Stream` 立即关闭，并且必须仅在发出 `'wantTrailers'` 事件后调用。发送请求或发送响应时，必须设置 `options.waitForTrailers` 选项，以便在最终 `DATA` 帧后保持 `Http2Stream` 打开，以便可以发送尾随头。

```mjs
import { createServer } from 'node:http2';
const server = createServer();
server.on('stream', (stream) => {
  stream.respond(undefined, { waitForTrailers: true });
  stream.on('wantTrailers', () => {
    stream.sendTrailers({ xyz: 'abc' });
  });
  stream.end('Hello World');
});
```

```cjs
const http2 = require('node:http2');
const server = http2.createServer();
server.on('stream', (stream) => {
  stream.respond(undefined, { waitForTrailers: true });
  stream.on('wantTrailers', () => {
    stream.sendTrailers({ xyz: 'abc' });
  });
  stream.end('Hello World');
});
```

HTTP/1 规范禁止尾随头包含 HTTP/2 伪头字段（例如 `':method'`、`':path'` 等）。

### 类：`ClientHttp2Stream`

<!-- YAML
added: v8.4.0
-->

* 继承 {Http2Stream}

`ClientHttp2Stream` 类是 `Http2Stream` 的扩展，仅在 HTTP/2 客户端上使用。客户端上的 `Http2Stream` 实例提供仅在客户端上相关的事件，如 `'response'` 和 `'push'`。

#### 事件：`'continue'`

<!-- YAML
added: v8.5.0
-->

当服务器发送 `100 Continue` 状态时发出，通常是因为请求包含 `Expect: 100-continue`。这是客户端应发送请求主体的指令。

#### 事件：`'headers'`

<!-- YAML
added: v8.4.0
-->

* `headers` {HTTP/2 头对象}
* `flags` {number}
* `rawHeaders` {HTTP/2 原始头}

当收到流的额外头块时，会发出 `'headers'` 事件，例如收到 `1xx` 信息头块时。监听器回调被传递 [HTTP/2 头对象][]、与头关联的标志以及原始格式的头（请参阅 [HTTP/2 原始头][]）。

```js
stream.on('headers', (headers, flags) => {
  console.log(headers);
});
```

#### 事件：`'push'`

<!-- YAML
added: v8.4.0
-->

* `headers` {HTTP/2 头对象}
* `flags` {number}
* `rawHeaders` {HTTP/2 原始头部}

当收到 Server Push 流的响应头时，会触发 `'push'` 事件。监听器回调会接收 [HTTP/2 Headers Object][]、与这些头部相关联的标志，以及原始格式的头部（请参见 [HTTP/2 Raw Headers][]）。

```js
stream.on('push', (headers, flags) => {
  console.log(headers);
});
```

#### 事件：`'response'`

<!-- YAML
added: v8.4.0
changes:
  - version: REPLACEME
    pr-url: https://github.com/nodejs/node/pull/63249
    description: >-
      如果在响应头到达时未附加 `'response'` 监听器，则响应体现在会被静默丢弃——这与 `lib/http` 客户端行为一致。
-->

* `headers` {HTTP/2 头对象}
* `flags` {number}
* `rawHeaders` {HTTP/2 原始头}

当从连接的 HTTP/2 服务器收到此流的响应 `HEADERS` 帧时，会发出 `'response'` 事件。监听器被调用三个参数：一个包含收到的 [HTTP/2 头对象][] 的 `Object`、与头关联的标志以及原始格式的头（请参阅 [HTTP/2 原始头][]）。

```mjs
import { connect } from 'node:http2';
const client = connect('https://localhost');
const req = client.request({ ':path': '/' });
req.on('response', (headers, flags) => {
  console.log(headers[':status']);
});
```

如果在响应到达时没有附加 `'response'` 监听器，响应体将会被完全丢弃（流会在不发出提示的情况下继续恢复）。但是，如果添加了 `'response'` 监听器，则必须消费来自响应对象的数据——可以在每次发生 `'readable'` 事件时调用 `response.read()`，也可以添加 `'data'` 处理器，或者调用 `.resume()` 方法。在数据被消费之前，`'end'` 事件不会触发。另外，在数据被读取之前，它会占用内存，最终可能导致“进程内存不足”错误。

```cjs
const http2 = require('node:http2');
const client = http2.connect('https://localhost');
const req = client.request({ ':path': '/' });
req.on('response', (headers, flags) => {
  console.log(headers[':status']);
});
```

### 类：`ServerHttp2Stream`

<!-- YAML
added: v8.4.0
-->

* 继承：{Http2Stream}

`ServerHttp2Stream` 类是 [`Http2Stream`][] 的扩展，
仅用于 HTTP/2 服务器。服务器上的 `Http2Stream` 实例
提供额外的方法，例如 `http2stream.pushStream()` 和
`http2stream.respond()`，这些方法仅与服务器相关。

#### `http2stream.additionalHeaders(headers)`

<!-- YAML
added: v8.4.0
-->

* `headers` {HTTP/2 头对象}

向连接的 HTTP/2 对等方发送一个额外的信息性 `HEADERS` 帧。

#### `http2stream.headersSent`

<!-- YAML
added: v8.4.0
-->

* 类型：{boolean}

如果头已发送则为 true，否则为 false（只读）。

#### `http2stream.pushAllowed`

<!-- YAML
added: v8.4.0
-->

* 类型：{boolean}

只读属性，映射到远程客户端最近一个 `SETTINGS` 帧的 `SETTINGS_ENABLE_PUSH` 标志。
如果远程对等方接受推送流，则为 `true`，否则为 `false`。
同一 `Http2Session` 中的每个 `Http2Stream` 的设置都相同。

#### `http2stream.pushStream(headers[, options], callback)`

<!-- YAML
added: v8.4.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 callback 参数传递无效的回调现在会抛出 ERR_INVALID_ARG_TYPE 而不是ERR_INVALID_CALLBACK。"
-->

* `headers` {HTTP/2 头对象}
* `options` {Object}
  * `exclusive` {boolean} 当为 `true` 且 `parent` 标识父流时，
    创建的流将成为父流的唯一直接依赖项，
    所有其他现有依赖项将成为新创建流的依赖项。
    **默认值：** `false`。
  * `parent` {number} 指定新创建流所依赖的流的数字标识符。
* `callback` {Function} 一旦推送流被发起即调用的回调。
  * `err` {Error}
  * `pushStream` {ServerHttp2Stream} 返回的 `pushStream` 对象。
  * `headers` {HTTP/2 头对象} `pushStream` 发起时使用的头对象。

发起一个推送流。回调被调用时，为推送流创建的新 `Http2Stream`
实例作为第二个参数传递，或者将 `Error` 作为第一个参数传递。

```mjs
import { createServer } from 'node:http2';
const server = createServer();
server.on('stream', (stream) => {
  stream.respond({ ':status': 200 });
  stream.pushStream({ ':path': '/' }, (err, pushStream, headers) => {
    if (err) throw err;
    pushStream.respond({ ':status': 200 });
    pushStream.end('some pushed data');
  });
  stream.end('some data');
});
```

```cjs
const http2 = require('node:http2');
const server = http2.createServer();
server.on('stream', (stream) => {
  stream.respond({ ':status': 200 });
  stream.pushStream({ ':path': '/' }, (err, pushStream, headers) => {
    if (err) throw err;
    pushStream.respond({ ':status': 200 });
    pushStream.end('some pushed data');
  });
  stream.end('some data');
});
```

在 `HEADERS` 帧中不允许设置推送流的权重。
将 `weight` 值传递给 `http2stream.priority` 并将 `silent` 选项设置为
`true`，以启用并发流之间的服务器端带宽平衡。

不允许在推送流内部调用 `http2stream.pushStream()`，
否则会抛出错误。

#### `http2stream.respond([headers[, options]])`

<!-- YAML
added: v8.4.0
changes:
  - version:
    - v24.7.0
    - v22.20.0
    pr-url: https://github.com/nodejs/node/pull/59455
    description: 允许以原始数组格式传递头。
  - version:
    - v14.5.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/33160
    description: 允许显式设置日期头。
-->

* `headers` {HTTP/2 头对象|HTTP/2 原始头}
* `options` {Object}
  * `endStream` {boolean} 设置为 `true` 以指示响应将不包含
    负载数据。
  * `waitForTrailers` {boolean} 当为 `true` 时，`Http2Stream` 将在发送最后一个
    `DATA` 帧后发出 `'wantTrailers'` 事件。

```mjs
import { createServer } from 'node:http2';
const server = createServer();
server.on('stream', (stream) => {
  stream.respond({ ':status': 200 });
  stream.end('some data');
});
```

```cjs
const http2 = require('node:http2');
const server = http2.createServer();
server.on('stream', (stream) => {
  stream.respond({ ':status': 200 });
  stream.end('some data');
});
```

发起响应。当设置了 `options.waitForTrailers` 选项时，在将要发送的最后一个负载数据块入队后，会立即触发 `'wantTrailers'` 事件。随后可以使用 `http2stream.sendTrailers()` 方法向对端发送尾随标头字段。

当设置了 `options.waitForTrailers` 时，`Http2Stream` 不会在传输最终 `DATA` 帧时自动关闭。用户代码必须调用 `http2stream.sendTrailers()` 或 `http2stream.close()` 来关闭 `Http2Stream`。

```mjs
import { createServer } from 'node:http2';
const server = createServer();
server.on('stream', (stream) => {
  stream.respond({ ':status': 200 }, { waitForTrailers: true });
  stream.on('wantTrailers', () => {
    stream.sendTrailers({ ABC: 'some value to send' });
  });
  stream.end('some data');
});
```

```cjs
const http2 = require('node:http2');
const server = http2.createServer();
server.on('stream', (stream) => {
  stream.respond({ ':status': 200 }, { waitForTrailers: true });
  stream.on('wantTrailers', () => {
    stream.sendTrailers({ ABC: 'some value to send' });
  });
  stream.end('some data');
});
```

#### `http2stream.respondWithFD(fd[, headers[, options]])`

<!-- YAML
added: v8.4.0
changes:
  - version:
    - v14.5.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/33160
    description: fd 选项现在可以是 FileHandle。
  - version: v12.12.0
    pr-url: https://github.com/nodejs/node/pull/29876
    description: 现在支持任何可读的文件描述符，不一定是常规文件。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18936
    description: "现在支持任何可读的文件描述符，不一定是常规文件。"
-->

* `fd` {number|FileHandle} 一个可读的文件描述符。
* `headers` {HTTP/2 头对象}
* `options` {Object}
  * `statCheck` {Function}
  * `waitForTrailers` {boolean} 当为 `true` 时，`Http2Stream` 将在发送最后一个
    `DATA` 帧后发出 `'wantTrailers'` 事件。
  * `offset` {number} 开始读取的偏移位置。
  * `length` {number} 要从 fd 发送的数据量。

发起一个响应，其数据从给定的文件描述符中读取。不对给定的文件描述符执行
验证。如果尝试使用文件描述符读取数据时发生错误，`Http2Stream` 将
使用标准的 `INTERNAL_ERROR` 代码通过 `RST_STREAM` 帧关闭。

使用时，`Http2Stream` 对象的 `Duplex` 接口将自动关闭。

```mjs
import { createServer } from 'node:http2';
import { openSync, fstatSync, closeSync } from 'node:fs';

const server = createServer();
server.on('stream', (stream) => {
  const fd = openSync('/some/file', 'r');

  const stat = fstatSync(fd);
  const headers = {
    'content-length': stat.size,
    'last-modified': stat.mtime.toUTCString(),
    'content-type': 'text/plain; charset=utf-8',
  };
  stream.respondWithFD(fd, headers);
  stream.on('close', () => closeSync(fd));
});
```

```cjs
const http2 = require('node:http2');
const fs = require('node:fs');

const server = http2.createServer();
server.on('stream', (stream) => {
  const fd = fs.openSync('/some/file', 'r');

  const stat = fs.fstatSync(fd);
  const headers = {
    'content-length': stat.size,
    'last-modified': stat.mtime.toUTCString(),
    'content-type': 'text/plain; charset=utf-8',
  };
  stream.respondWithFD(fd, headers);
  stream.on('close', () => fs.closeSync(fd));
});
```

可以指定可选的 `options.statCheck` 函数，让用户代码有机会
根据给定 fd 的 `fs.Stat` 详细信息设置额外的内容头。如果提供了
`statCheck` 函数，`http2stream.respondWithFD()` 方法将执行
`fs.fstat()` 调用来收集提供的文件描述符的详细信息。

`offset` 和 `length` 选项可用于将响应限制为特定的范围子集。
例如，这可用于支持 HTTP Range 请求。

流关闭时不会关闭文件描述符或 `FileHandle`，
因此一旦不再需要，就需要手动关闭它。
不支持并发地对多个流使用相同的文件描述符，
这可能会导致数据丢失。支持在流完成后重用文件描述符。

当设置了 `options.waitForTrailers` 选项时，`'wantTrailers'` 事件
会在将要发送的最后一个负载数据块排队后立即触发。随后可以使用
`http2stream.sendTrailers()` 方法向对端发送尾部头字段。

当设置了 `options.waitForTrailers` 时，`Http2Stream` 不会在传输最终
`DATA` 帧时自动关闭。用户代码_必须_调用
`http2stream.sendTrailers()` 或 `http2stream.close()` 来关闭
`Http2Stream`。

```mjs
import { createServer } from 'node:http2';
import { openSync, fstatSync, closeSync } from 'node:fs';

const server = createServer();
server.on('stream', (stream) => {
  const fd = openSync('/some/file', 'r');

  const stat = fstatSync(fd);
  const headers = {
    'content-length': stat.size,
    'last-modified': stat.mtime.toUTCString(),
    'content-type': 'text/plain; charset=utf-8',
  };
  stream.respondWithFD(fd, headers, { waitForTrailers: true });
  stream.on('wantTrailers', () => {
    stream.sendTrailers({ ABC: 'some value to send' });
  });

  stream.on('close', () => closeSync(fd));
});
```

```cjs
const http2 = require('node:http2');
const fs = require('node:fs');

const server = http2.createServer();
server.on('stream', (stream) => {
  const fd = fs.openSync('/some/file', 'r');

  const stat = fs.fstatSync(fd);
  const headers = {
    'content-length': stat.size,
    'last-modified': stat.mtime.toUTCString(),
    'content-type': 'text/plain; charset=utf-8',
  };
  stream.respondWithFD(fd, headers, { waitForTrailers: true });
  stream.on('wantTrailers', () => {
    stream.sendTrailers({ ABC: 'some value to send' });
  });

  stream.on('close', () => fs.closeSync(fd));
});
```

#### `http2stream.respondWithFile(path[, headers[, options]])`

<!-- YAML
added: v8.4.0
changes:
  - version:
    - v14.5.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/33160
    description: 允许显式设置日期头。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18936
    description: "现在支持任何可读的文件，不一定是常规文件。"
-->

* `path` {string|Buffer|URL}
* `headers` {HTTP/2 头对象}
* `options` {Object}
  * `statCheck` {Function}
  * `onError` {Function} 在发送前发生错误时调用的回调函数。
  * `waitForTrailers` {boolean} 当为 `true` 时，`Http2Stream` 将在发送最后一个
    `DATA` 帧后发出 `'wantTrailers'` 事件。
  * `offset` {number} 开始读取的偏移位置。
  * `length` {number} 要从 fd 发送的数据量。

发送常规文件作为响应。`path` 必须指定一个常规文件，
否则将在 `Http2Stream` 对象上发出 `'error'` 事件。

使用时，`Http2Stream` 对象的 `Duplex` 接口将自动关闭。

可以指定可选的 `options.statCheck` 函数，让用户代码有机会
根据给定文件的 `fs.Stat` 详细信息设置额外的内容头：

如果尝试读取文件数据时发生错误，`Http2Stream` 将
使用标准的 `INTERNAL_ERROR` 代码通过 `RST_STREAM` 帧关闭。
如果定义了 `onError` 回调，则将调用它。否则
流将被销毁。

使用文件路径的示例：

```mjs
import { createServer } from 'node:http2';
const server = createServer();
server.on('stream', (stream) => {
  function statCheck(stat, headers) {
    headers['last-modified'] = stat.mtime.toUTCString();
  }

  function onError(err) {
    // 如果流已被另一方销毁，stream.respond() 可能会抛出异常。
    try {
      if (err.code === 'ENOENT') {
        stream.respond({ ':status': 404 });
      } else {
        stream.respond({ ':status': 500 });
      }
    } catch (err) {
      // 执行实际的错误处理。
      console.error(err);
    }
    stream.end();
  }

  stream.respondWithFile('/some/file',
                         { 'content-type': 'text/plain; charset=utf-8' },
                         { statCheck, onError });
});
```

```cjs
const http2 = require('node:http2');
const server = http2.createServer();
server.on('stream', (stream) => {
  function statCheck(stat, headers) {
    headers['last-modified'] = stat.mtime.toUTCString();
  }

  function onError(err) {
    // 如果流已被另一方销毁，stream.respond() 可能会抛出异常。
    try {
      if (err.code === 'ENOENT') {
        stream.respond({ ':status': 404 });
      } else {
        stream.respond({ ':status': 500 });
      }
    } catch (err) {
      // 执行实际的错误处理。
      console.error(err);
    }
    stream.end();
  }

  stream.respondWithFile('/some/file',
                         { 'content-type': 'text/plain; charset=utf-8' },
                         { statCheck, onError });
});
```

`options.statCheck` 函数也可用于通过返回 `false` 来取消发送操作。
例如，条件请求可以检查 stat 结果以确定文件是否已被修改，从而返回适当的
`304` 响应：

```mjs
import { createServer } from 'node:http2';
const server = createServer();
server.on('stream', (stream) => {
  function statCheck(stat, headers) {
    // 在此处检查 stat...
    stream.respond({ ':status': 304 });
    return false; // 取消发送操作
  }
  stream.respondWithFile('/some/file',
                         { 'content-type': 'text/plain; charset=utf-8' },
                         { statCheck });
});
```

```cjs
const http2 = require('node:http2');
const server = http2.createServer();
server.on('stream', (stream) => {
  function statCheck(stat, headers) {
    // 在此处检查 stat...
    stream.respond({ ':status': 304 });
    return false; // 取消发送操作
  }
  stream.respondWithFile('/some/file',
                         { 'content-type': 'text/plain; charset=utf-8' },
                         { statCheck });
});
```

`content-length` 头字段将自动设置。

`offset` 和 `length` 选项可用于将响应限制为特定的范围子集。
例如，这可用于支持 HTTP Range 请求。

`options.onError` 函数也可用于处理在开始交付文件之前可能发生的
所有错误。默认行为是销毁流。

当设置了 `options.waitForTrailers` 选项时，`'wantTrailers'` 事件
将在将最后一个有效负载数据块排队发送后立即触发。`http2stream.sendTrailers()`
方法随后可用于向对端发送尾随
头字段。

当设置了 `options.waitForTrailers` 时，`Http2Stream` 不会在传输最终
`DATA` 帧时自动关闭。用户代码必须调用
`http2stream.sendTrailers()` 或 `http2stream.close()` 来关闭
`Http2Stream`。

```mjs
import { createServer } from 'node:http2';
const server = createServer();
server.on('stream', (stream) => {
  stream.respondWithFile('/some/file',
                         { 'content-type': 'text/plain; charset=utf-8' },
                         { waitForTrailers: true });
  stream.on('wantTrailers', () => {
    stream.sendTrailers({ ABC: 'some value to send' });
  });
});
```

```cjs
const http2 = require('node:http2');
const server = http2.createServer();
server.on('stream', (stream) => {
  stream.respondWithFile('/some/file',
                         { 'content-type': 'text/plain; charset=utf-8' },
                         { waitForTrailers: true });
  stream.on('wantTrailers', () => {
    stream.sendTrailers({ ABC: 'some value to send' });
  });
});
```

### 类：`Http2Server`

<!-- YAML
added: v8.4.0
-->

* 继承：{net.Server}

`Http2Server` 的实例是使用 `http2.createServer()`
函数创建的。`Http2Server` 类不是由
`node:http2` 模块直接导出的。

#### 事件：`'checkContinue'`

<!-- YAML
added: v8.5.0
-->

* `request` {http2.Http2ServerRequest}
* `response` {http2.Http2ServerResponse}

如果注册了 [`'request'`][] 监听器或 [`http2.createServer()`][]
提供了回调函数，则每次收到带有 HTTP `Expect: 100-continue` 的请求时都会发出
`'checkContinue'` 事件。如果未监听此事件，服务器将自动响应状态
`100 Continue`（视情况而定）。

处理此事件涉及调用 [`response.writeContinue()`][]（如果客户端
应继续发送请求体），或生成适当的
HTTP 响应（例如 400 Bad Request）（如果客户端不应继续发送
请求体）。

当发出并处理此事件时，[`'request'`][] 事件将
不会发出。

#### 事件：`'connection'`

<!-- YAML
added: v8.4.0
-->

* `socket` {stream.Duplex}

当建立新的 TCP 流时发出此事件。`socket` 通常是 [`net.Socket`][] 类型的对象。
通常用户不希望访问此事件。

用户也可以显式发出此事件以将连接注入
HTTP 服务器。在这种情况下，可以传递任何 [`Duplex`][] 流。

#### 事件：`'request'`

<!-- YAML
added: v8.4.0
-->

* `request` {http2.Http2ServerRequest}
* `response` {http2.Http2ServerResponse}

每次有请求时发出。每个会话可能有多个请求。
请参阅 [兼容 API][]。

#### 事件：`'session'`

<!-- YAML
added: v8.4.0
-->

* `session` {ServerHttp2Session}

当 `Http2Server` 创建新的 `Http2Session` 时发出 `'session'` 事件。

#### 事件：`'sessionError'`

<!-- YAML
added: v8.4.0
-->

* `error` {Error}
* `session` {ServerHttp2Session}

当与 `Http2Server` 关联的 `Http2Session` 对象发出 `'error'` 事件时，
发出 `'sessionError'` 事件。

#### 事件：`'stream'`

<!-- YAML
added: v8.4.0
-->

* `stream` {Http2Stream} 流的引用
* `headers` {HTTP/2 头对象} 描述头的对象
* `flags` {number} 关联的数字标志
* `rawHeaders` {HTTP/2 原始头} 包含原始头的数组

当与服务器关联的 `Http2Session` 发出 `'stream'` 事件时，
发出 `'stream'` 事件。

另请参阅 [`Http2Session` 的 `'stream'` 事件][].

```mjs
import { createServer, constants } from 'node:http2';
const {
  HTTP2_HEADER_METHOD,
  HTTP2_HEADER_PATH,
  HTTP2_HEADER_STATUS,
  HTTP2_HEADER_CONTENT_TYPE,
} = constants;

const server = createServer();
server.on('stream', (stream, headers, flags) => {
  const method = headers[HTTP2_HEADER_METHOD];
  const path = headers[HTTP2_HEADER_PATH];
  // ...
  stream.respond({
    [HTTP2_HEADER_STATUS]: 200,
    [HTTP2_HEADER_CONTENT_TYPE]: 'text/plain; charset=utf-8',
  });
  stream.write('hello ');
  stream.end('world');
});
```

```cjs
const http2 = require('node:http2');
const {
  HTTP2_HEADER_METHOD,
  HTTP2_HEADER_PATH,
  HTTP2_HEADER_STATUS,
  HTTP2_HEADER_CONTENT_TYPE,
} = http2.constants;

const server = http2.createServer();
server.on('stream', (stream, headers, flags) => {
  const method = headers[HTTP2_HEADER_METHOD];
  const path = headers[HTTP2_HEADER_PATH];
  // ...
  stream.respond({
    [HTTP2_HEADER_STATUS]: 200,
    [HTTP2_HEADER_CONTENT_TYPE]: 'text/plain; charset=utf-8',
  });
  stream.write('hello ');
  stream.end('world');
});
```

#### 事件：`'timeout'`

<!-- YAML
added: v8.4.0
changes:
  - version: v13.0.0
    pr-url: https://github.com/nodejs/node/pull/27558
    description: 默认超时从 120 秒更改为 0（无超时）。
-->

当服务器在 `http2server.setTimeout()` 设置的给定毫秒数内没有活动时，
发出 `'timeout'` 事件。
**默认值：** 0（无超时）

#### `server.close([callback])`

<!-- YAML
added: v8.4.0
-->

* `callback` {Function}

停止服务器建立新会话。由于 HTTP/2
会话的持久性，这并不能防止创建新的请求流。要优雅地关闭服务器，
请在所有活动会话上调用 [`http2session.close()`][]。

如果提供了 `callback`，则直到所有活动会话都已关闭才会调用它，
尽管服务器已经停止允许新会话。有关更多详细信息，请参阅
[`net.Server.close()`][]。

#### `server[Symbol.asyncDispose]()`

<!-- YAML
added: v20.4.0
changes:
 - version: v24.2.0
   pr-url: https://github.com/nodejs/node/pull/58467
   description: 不再是实验性的。
-->

调用 [`server.close()`][] 并返回一个 promise，当服务器
已关闭时该 promise 会兑现。

#### `server.setTimeout([msecs][, callback])`

<!-- YAML
added: v8.4.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 callback 参数传递无效的回调现在会抛出 ERR_INVALID_ARG_TYPE 而不是ERR_INVALID_CALLBACK。"
  - version: v13.0.0
    pr-url: https://github.com/nodejs/node/pull/27558
    description: 默认超时从 120 秒更改为 0（无超时）。
-->

* `msecs` {number} **默认值：** 0（无超时）
* `callback` {Function}
* 返回：{Http2Server}

用于设置 http2 服务器请求的超时值，
并设置一个回调函数，当 `Http2Server` 在 `msecs` 毫秒后没有活动时
调用该函数。

给定的回调注册为 `'timeout'` 事件的监听器。

如果 `callback` 不是函数，将抛出新的 `ERR_INVALID_ARG_TYPE`
错误。

#### `server.timeout`

<!-- YAML
added: v8.4.0
changes:
  - version: v13.0.0
    pr-url: https://github.com/nodejs/node/pull/27558
    description: 默认超时从 120 秒更改为 0（无超时）。
-->

* 类型：{number} 超时（毫秒）。**默认值：** 0（无超时）

在假定套接字超时之前的不活动毫秒数。

值为 `0` 将禁用传入连接的超时行为。

套接字超时逻辑是在连接时设置的，因此更改此
值仅影响服务器的新连接，不影响任何现有连接。

#### `server.updateSettings([settings])`

<!-- YAML
added:
  - v15.1.0
  - v14.17.0
-->

* `settings` {HTTP/2 设置对象}

用于使用提供的设置更新服务器。

对于无效的 `settings` 值抛出 `ERR_HTTP2_INVALID_SETTING_VALUE`。

对于无效的 `settings` 参数抛出 `ERR_INVALID_ARG_TYPE`。

### 类：`Http2SecureServer`

<!-- YAML
added: v8.4.0
-->

* 继承：{tls.Server}

`Http2SecureServer` 的实例是使用
`http2.createSecureServer()` 函数创建的。`Http2SecureServer` 类不是
由 `node:http2` 模块直接导出的。

#### 事件：`'checkContinue'`

<!-- YAML
added: v8.5.0
-->

* `request` {http2.Http2ServerRequest}
* `response` {http2.Http2ServerResponse}

如果注册了 [`'request'`][] 监听器或 [`http2.createSecureServer()`][]
提供了回调函数，则每次收到带有 HTTP `Expect: 100-continue` 的请求时都会发出
`'checkContinue'` 事件。如果未监听此事件，服务器将自动响应状态
`100 Continue`（视情况而定）。

处理此事件涉及调用 [`response.writeContinue()`][]（如果客户端
应继续发送请求体），或生成适当的
HTTP 响应（例如 400 Bad Request）（如果客户端不应继续发送
请求体）。

当发出并处理此事件时，[`'request'`][] 事件将
不会发出。

#### 事件：`'connection'`

<!-- YAML
added: v8.4.0
-->

* `socket` {stream.Duplex}

当建立新的 TCP 流时发出此事件，在 TLS
握手开始之前。`socket` 通常是 [`net.Socket`][] 类型的对象。
通常用户不希望访问此事件。

用户也可以显式发出此事件以将连接注入
HTTP 服务器。在这种情况下，可以传递任何 [`Duplex`][] 流。

#### 事件：`'request'`

<!-- YAML
added: v8.4.0
-->

* `request` {http2.Http2ServerRequest}
* `response` {http2.Http2ServerResponse}

每次有请求时发出。每个会话可能有多个请求。
请参阅 [兼容 API][]。

#### 事件：`'session'`

<!-- YAML
added: v8.4.0
-->

* `session` {ServerHttp2Session}

当 `Http2SecureServer` 创建新的 `Http2Session` 时发出 `'session'` 事件。

#### 事件：`'sessionError'`

<!-- YAML
added: v8.4.0
-->

* `error` {Error}
* `session` {ServerHttp2Session}

当与 `Http2SecureServer` 关联的 `Http2Session` 对象发出 `'error'` 事件时，
发出 `'sessionError'` 事件。

#### 事件：`'stream'`

<!-- YAML
added: v8.4.0
-->

* `stream` {Http2Stream} 流的引用
* `headers` {HTTP/2 头对象} 描述头的对象
* `flags` {number} 关联的数字标志
* `rawHeaders` {HTTP/2 原始头} 包含原始头的数组

当与服务器关联的 `Http2Session` 发出 `'stream'` 事件时，
发出 `'stream'` 事件。

另请参阅 [`Http2Session` 的 `'stream'` 事件][].

```mjs
import { createSecureServer, constants } from 'node:http2';
const {
  HTTP2_HEADER_METHOD,
  HTTP2_HEADER_PATH,
  HTTP2_HEADER_STATUS,
  HTTP2_HEADER_CONTENT_TYPE,
} = constants;

const options = getOptionsSomehow();

const server = createSecureServer(options);
server.on('stream', (stream, headers, flags) => {
  const method = headers[HTTP2_HEADER_METHOD];
  const path = headers[HTTP2_HEADER_PATH];
  // ...
  stream.respond({
    [HTTP2_HEADER_STATUS]: 200,
    [HTTP2_HEADER_CONTENT_TYPE]: 'text/plain; charset=utf-8',
  });
  stream.write('hello ');
  stream.end('world');
});
```

```cjs
const http2 = require('node:http2');
const {
  HTTP2_HEADER_METHOD,
  HTTP2_HEADER_PATH,
  HTTP2_HEADER_STATUS,
  HTTP2_HEADER_CONTENT_TYPE,
} = http2.constants;

const options = getOptionsSomehow();

const server = http2.createSecureServer(options);
server.on('stream', (stream, headers, flags) => {
  const method = headers[HTTP2_HEADER_METHOD];
  const path = headers[HTTP2_HEADER_PATH];
  // ...
  stream.respond({
    [HTTP2_HEADER_STATUS]: 200,
    [HTTP2_HEADER_CONTENT_TYPE]: 'text/plain; charset=utf-8',
  });
  stream.write('hello ');
  stream.end('world');
});
```

#### 事件：`'timeout'`

<!-- YAML
added: v8.4.0
-->

当服务器在 `http2secureServer.setTimeout()` 设置的给定毫秒数内没有活动时，
发出 `'timeout'` 事件。
**默认值：** 2 分钟。

#### 事件：`'unknownProtocol'`

<!-- YAML
added: v8.4.0
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44031
    description: 仅当客户端在 TLS 握手期间未传输 ALPN 扩展时才会发出此事件。
-->

* `socket` {stream.Duplex}

当连接的客户端未能协商允许的协议（即 HTTP/2 或 HTTP/1.1）时，
发出 `'unknownProtocol'` 事件。事件处理程序
接收套接字进行处理。如果未为此事件注册监听器，
则连接终止。可以使用传递给 [`http2.createSecureServer()`][] 的
`'unknownProtocolTimeout'` 选项指定超时。

在早期版本的 Node.js 中，如果 `allowHTTP1` 为
`false` 且在 TLS 握手期间客户端未发送 ALPN
扩展或发送的 ALPN 扩展不包含 HTTP/2 (`h2`)，则会发出此事件。
较新版本的 Node.js 仅当 `allowHTTP1` 为 `false` 且客户端
未发送 ALPN 扩展时才发出此事件。如果客户端发送的 ALPN 扩展
不包含 HTTP/2（如果 `allowHTTP1` 为 `true` 则也不包含 HTTP/1.1），
TLS 握手将失败，并且不会建立安全连接。

请参阅 [兼容 API][]。

#### `server.close([callback])`

<!-- YAML
added: v8.4.0
-->

* `callback` {Function}

停止服务器建立新会话。由于 HTTP/2
会话的持久性，这并不能防止创建新的请求流。要优雅地关闭服务器，
请在所有活动会话上调用 [`http2session.close()`][]。

如果提供了 `callback`，则直到所有活动会话都已关闭才会调用它，
尽管服务器已经停止允许新会话。有关更多详细信息，请参阅
[`tls.Server.close()`][]。

#### `server.setTimeout([msecs][, callback])`

<!-- YAML
added: v8.4.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 callback 参数传递无效的回调现在会抛出 ERR_INVALID_ARG_TYPE 而不是ERR_INVALID_CALLBACK。"
-->

* `msecs` {number} **默认值：** `120000`（2 分钟）
* `callback` {Function}
* 返回：{Http2SecureServer}

用于设置 http2 安全服务器请求的超时值，
并设置一个回调函数，当 `Http2SecureServer` 在 `msecs` 毫秒后没有活动时
调用该函数。

给定的回调注册为 `'timeout'` 事件的监听器。

如果 `callback` 不是函数，将抛出新的 `ERR_INVALID_ARG_TYPE`
错误。

#### `server.timeout`

<!-- YAML
added: v8.4.0
changes:
  - version: v13.0.0
    pr-url: https://github.com/nodejs/node/pull/27558
    description: 默认超时从 120 秒更改为 0（无超时）。
-->

* 类型：{number} 超时（毫秒）。**默认值：** 0（无超时）

在假定套接字超时之前的不活动毫秒数。

值为 `0` 将禁用传入连接的超时行为。

套接字超时逻辑是在连接时设置的，因此更改此
值仅影响服务器的新连接，不影响任何现有连接。

#### `server.updateSettings([settings])`

<!-- YAML
added:
  - v15.1.0
  - v14.17.0
-->

* `settings` {HTTP/2 设置对象}

用于使用提供的设置更新服务器。

对于无效的 `settings` 值抛出 `ERR_HTTP2_INVALID_SETTING_VALUE`。

对于无效的 `settings` 参数抛出 `ERR_INVALID_ARG_TYPE`。

### `http2.createServer([options][, onRequestHandler])`

<!-- YAML
added: v8.4.0
changes:
  - version:
     - v25.7.0
     - v24.15.0
    pr-url: https://github.com/nodejs/node/pull/59917
    description: 添加了 `strictSingleValueFields` 选项。
  - version:
     - v25.7.0
     - v24.15.0
    pr-url: https://github.com/nodejs/node/pull/61713
    description: 添加了 http1Options 选项。Http1IncomingMessage和 Http1ServerResponse 选项现已弃用。
  - version:
      - v23.0.0
      - v22.10.0
    pr-url: https://github.com/nodejs/node/pull/54875
    description: 添加了 streamResetBurst 和 streamResetRate。
  - version:
      - v15.10.0
      - v14.16.0
      - v12.21.0
      - v10.24.0
    pr-url: https://github.com/nodejs-private/node-private/pull/246
    description: 添加了 unknownProtocolTimeout 选项，默认值为 10000。
  - version:
     - v14.4.0
     - v12.18.0
     - v10.21.0
    commit: 3948830ce6408be620b09a70bf66158623022af0
    pr-url: https://github.com/nodejs-private/node-private/pull/204
    description: 添加了 maxSettings 选项，默认值为 32。
  - version:
     - v13.3.0
     - v12.16.0
    pr-url: https://github.com/nodejs/node/pull/30534
    description: 添加了 maxSessionRejectedStreams 选项，默认值为 100。
  - version:
     - v13.3.0
     - v12.16.0
    pr-url: https://github.com/nodejs/node/pull/30534
    description: 添加了 maxSessionInvalidFrames 选项，默认值为 1000。
  - version: v13.0.0
    pr-url: https://github.com/nodejs/node/pull/29144
    description: "PADDING_STRATEGY_CALLBACK 已等同于提供PADDING_STRATEGY_ALIGNED，并且 selectPadding已被移除。"
  - version: v12.4.0
    pr-url: https://github.com/nodejs/node/pull/27782
    description: "options 参数现在支持 net.createServer()选项。"
  - version: v9.6.0
    pr-url: https://github.com/nodejs/node/pull/15752
    description: "添加了 Http1IncomingMessage 和 Http1ServerResponse选项。"
  - version: v8.9.3
    pr-url: https://github.com/nodejs/node/pull/17105
    description: "添加了 maxOutstandingPings 选项，默认限制为10。"
  - version: v8.9.3
    pr-url: https://github.com/nodejs/node/pull/16676
    description: "添加了 maxHeaderListPairs 选项，默认限制为128 个头对。"
-->

* `options` {Object}
  * `maxDeflateDynamicTableSize` {number} 设置用于压缩头字段的最大动态表大小。**默认值：**`4Kib`。
  * `maxSettings` {number} 设置每个 `SETTINGS` 帧的最大设置条目数。允许的最小值为 `1`。**默认值：**`32`。
  * `maxSessionMemory`{number} 设置 `Http2Session` 允许使用的最大内存。该值以兆字节数量表示，例如 `1` 等于 1 兆字节。允许的最小值为 `1`。这是一个基于信用额度的限制，现有的 `Http2Stream`s 可能会导致超过此限制，但当超过此限制时，新的 `Http2Stream` 实例将被拒绝。当前的 `Http2Stream` 会话、头部压缩表当前占用的内存、由打开的流保留的头块、当前排队等待发送的数据，以及未确认的 `PING` 和 `SETTINGS` 帧，都会计入当前限制。**默认值：**`10`。
  * `maxHeaderListPairs` {number} 设置最大头部条目数。这与 `node:http` 模块中的 [`server.maxHeadersCount`][] 或 [`request.maxHeadersCount`][] 类似。最小值为 `4`。**默认值：**`128`。
  * `maxOutstandingPings` {number} 设置允许未完成、未确认的 ping 的最大数量。**默认值：**`10`。
  * `maxSendHeaderBlockLength` {number} 设置序列化后压缩头块的最大允许大小。尝试发送超过此限制的头部将导致发出一个 `'frameError'` 事件，并且流将被关闭并销毁。
    虽然这会将整个头块的最大允许大小设为上限，但 `nghttp2`（内部 http2 库）对每个解压后的键/值对都有 `65536` 的限制。
  * `paddingStrategy` {number} 用于确定 `HEADERS` 和 `DATA` 帧所使用填充量的策略。**默认值：**
    `http2.constants.PADDING_STRATEGY_NONE`。取值可以是以下之一：
    * `http2.constants.PADDING_STRATEGY_NONE`: 不应用填充。
    * `http2.constants.PADDING_STRATEGY_MAX`: 应用由内部实现确定的最大填充量。
    * `http2.constants.PADDING_STRATEGY_ALIGNED`: 尝试应用足够的填充，以确保包括 9 字节
      帧头在内的总帧长度是 8 的倍数。对于每个帧，可允许的最大填充字节数由当前流控状态和设置决定。如果此最大值小于为确保对齐所需的计算值，则使用最大值，并且总帧长度不一定会对齐到 8 字节。
  * `peerMaxConcurrentStreams` {number} 设置远程对等方的最大并发
    流数量，就像已收到一个 `SETTINGS` 帧一样。如果远程对等方为
    `maxConcurrentStreams` 设置了自己的值，则该值将被覆盖。**默认值：**`100`。
  * `maxSessionInvalidFrames` {integer} 设置在会话关闭前可容忍的无效
    帧最大数量。**默认值：**`1000`。
  * `maxSessionRejectedStreams` {integer} 设置在会话关闭前可容忍的因创建时
    被拒绝的流最大数量。每次拒绝都会关联一个 `NGHTTP2_ENHANCE_YOUR_CALM`
    错误，该错误应告知对端不要再打开任何流，因此继续打开流被视为对端行为异常的迹象。**默认值：**`100`。
  * `settings` {HTTP/2 Settings Object} 连接建立时发送给远程对等方的初始设置。
  * `streamResetBurst` {number} 和 `streamResetRate` {number} 设置传入流重置（RST\_STREAM 帧）的速率限制。两个设置都必须同时设置才会生效，默认值分别为 1000 和 33。
  * `remoteCustomSettings` {Array} 该整数值数组决定设置类型，这些类型会包含在接收到的 remoteSettings 的 `CustomSettings` 属性中。有关允许的设置类型，请参阅 `Http2Settings` 对象的 `CustomSettings` 属性。
  * `Http1IncomingMessage` {http.IncomingMessage} 指定用于 HTTP/1 回退的 `IncomingMessage` 类。用于扩展原始的 `http.IncomingMessage` 很有用。**默认值：**`http.IncomingMessage`。
    **已弃用。**请改用 `http1Options.IncomingMessage`。参见
    [DEP0202][]。
  * `Http1ServerResponse` {http.ServerResponse} 指定用于 HTTP/1 回退的 `ServerResponse` 类。用于扩展原始的
    `http.ServerResponse` 很有用。**默认值：**`http.ServerResponse`。
    **已弃用。**请改用 `http1Options.ServerResponse`。参见
    [DEP0202][]。
  * `http1Options` {Object} 用于在 `allowHTTP1` 为 `true` 时配置 HTTP/1
    回退的选项对象。这些选项会传递给
    underlying HTTP/1 服务器。有关可用选项，请参见 [`http.createServer()`][]。除此之外，还支持以下选项：
    * `IncomingMessage` {http.IncomingMessage} 指定用于 HTTP/1 回退的
      `IncomingMessage` 类。
      **默认值：** `http.IncomingMessage`。
    * `ServerResponse` {http.ServerResponse} 指定用于 HTTP/1 回退的 `ServerResponse`
      类。
      **默认值：** `http.ServerResponse`。
    * `keepAliveTimeout` {number} 服务器在最后一个响应写入完成后，
      在销毁套接字之前，等待后续传入数据的空闲时间（毫秒）。
      **默认值：** `5000`。
  * `Http2ServerRequest` {http2.Http2ServerRequest} 指定要使用的
    `Http2ServerRequest` 类。
    适用于扩展原始的 `Http2ServerRequest`。
    **默认值：** `Http2ServerRequest`。
  * `Http2ServerResponse` {http2.Http2ServerResponse} 指定要使用的
    `Http2ServerResponse` 类。
    适用于扩展原始的 `Http2ServerResponse`。
    **默认值：** `Http2ServerResponse`。
  * `unknownProtocolTimeout` {number} 指定当触发 [`'unknownProtocol'`][] 时服务器应等待的超时时间（毫秒）。如果
    到时套接字尚未被销毁，服务器将销毁它。
    **默认值：** `10000`。
  * `strictFieldWhitespaceValidation` {boolean} 如果为 `true`，则会为 HTTP/2 标头字段名称和值启用严格的前导
    和尾随空白验证，遵循 [RFC-9113](https://www.rfc-editor.org/rfc/rfc9113.html#section-8.2.1) 的规定。
    **默认值：** `true`。
  * `strictSingleValueFields` {boolean} 如果为 `true`，则对定义为仅允许单个值的标头和尾随标头使用严格验证，
    这样当提供多个值时会抛出错误。
    **默认值：** `true`。
  * `...options` {Object} 可提供任意 [`net.createServer()`][] 选项。
* `onRequestHandler` {Function} 参见 [兼容性 API][]
* 返回：{Http2Server}

返回一个 `net.Server` 实例，该实例创建和管理 `Http2Session`
实例。

由于没有已知支持
[未加密 HTTP/2][HTTP/2 未加密] 的浏览器，因此在与
浏览器客户端通信时必须使用 [`http2.createSecureServer()`][]。

```mjs
import { createServer } from 'node:http2';

// 创建一个未加密的 HTTP/2 服务器。
// 由于没有已知支持未加密 HTTP/2 的浏览器，
// 因此在与浏览器客户端通信时必须使用 `createSecureServer()`。
const server = createServer();

server.on('stream', (stream, headers) => {
  stream.respond({
    'content-type': 'text/html; charset=utf-8',
    ':status': 200,
  });
  stream.end('<h1>Hello World</h1>');
});

server.listen(8000);
```

```cjs
const http2 = require('node:http2');

// 创建一个未加密的 HTTP/2 服务器。
// 由于没有已知支持未加密 HTTP/2 的浏览器，
// 因此在与浏览器客户端通信时必须使用 `http2.createSecureServer()`。
const server = http2.createServer();

server.on('stream', (stream, headers) => {
  stream.respond({
    'content-type': 'text/html; charset=utf-8',
    ':status': 200,
  });
  stream.end('<h1>Hello World</h1>');
});

server.listen(8000);
```

### `http2.createSecureServer(options[, onRequestHandler])`

<!-- YAML
added: v8.4.0
changes:
  - version:
     - v25.7.0
     - v24.15.0
    pr-url: https://github.com/nodejs/node/pull/59917
    description: 添加了 `strictSingleValueFields` 选项。
  - version:
     - v25.7.0
     - v24.15.0
    pr-url: https://github.com/nodejs/node/pull/61713
    description: 添加了 http1Options 选项。
  - version:
      - v15.10.0
      - v14.16.0
      - v12.21.0
      - v10.24.0
    pr-url: https://github.com/nodejs-private/node-private/pull/246
    description: 添加了 unknownProtocolTimeout 选项，默认值为 10000。
  - version:
     - v14.4.0
     - v12.18.0
     - v10.21.0
    commit: 3948830ce6408be620b09a70bf66158623022af0
    pr-url: https://github.com/nodejs-private/node-private/pull/204
    description: 添加了 maxSettings 选项，默认值为 32。
  - version:
     - v13.3.0
     - v12.16.0
    pr-url: https://github.com/nodejs/node/pull/30534
    description: 添加了 maxSessionRejectedStreams 选项，默认值为 100。
  - version:
     - v13.3.0
     - v12.16.0
    pr-url: https://github.com/nodejs/node/pull/30534
    description: 添加了 maxSessionInvalidFrames 选项，默认值为 1000。
  - version: v13.0.0
    pr-url: https://github.com/nodejs/node/pull/29144
    description: "PADDING_STRATEGY_CALLBACK 已等同于提供PADDING_STRATEGY_ALIGNED，并且 selectPadding已被移除。"
  - version: v10.12.0
    pr-url: https://github.com/nodejs/node/pull/22956
    description: "添加了 origins 选项，以便在 Http2Session 启动时自动发送 ORIGIN帧。"
  - version: v8.9.3
    pr-url: https://github.com/nodejs/node/pull/17105
    description: "添加了 maxOutstandingPings 选项，默认限制为10。"
  - version: v8.9.3
    pr-url: https://github.com/nodejs/node/pull/16676
    description: "添加了 maxHeaderListPairs 选项，默认限制为128 个头对。"
-->

* `options` {Object}
  * `allowHTTP1` {boolean} 当设置为 `true` 时，不支持
    HTTP/2 的传入客户端连接将降级为 HTTP/1.x。
    请参见 [`'unknownProtocol'`][] 事件。另请参见 [ALPN 协商][]。
    **默认值：** `false`。
  * `maxDeflateDynamicTableSize` {number} 设置用于压缩头字段的最大动态表大小。
    **默认值：** `4Kib`。
  * `maxSettings` {number} 设置每个 `SETTINGS` 帧的最大设置条目数。
    允许的最小值为 `1`。**默认值：** `32`。
  * `maxSessionMemory`{number} 设置 `Http2Session` 允许使用的最大内存。
    该值以兆字节数表示，例如，`1` 等于 1 兆字节。
    允许的最小值为 `1`。这是一个基于信用额度的限制，现有的 `Http2Stream`s 可能会导致
    超出此限制，但在超出限制期间将拒绝新的 `Http2Stream` 实例。
    当前的 `Http2Stream` 会话数、头部压缩表的当前内存使用量、由打开的流保留的头部块、
    当前排队待发送的数据，以及未确认的 `PING` 和 `SETTINGS` 帧都会计入
    当前限制。**默认值：** `10`。
  * `maxHeaderListPairs` {number} 设置头部条目的最大数量。
    这与 `node:http` 模块中的 [`server.maxHeadersCount`][] 或
    [`request.maxHeadersCount`][] 类似。允许的最小值
    为 `4`。**默认值：** `128`。
  * `maxOutstandingPings` {number} 设置允许未完成、未确认的 ping 的最大数量。**默认值：** `10`。
  * `maxSendHeaderBlockLength` {number} 设置已序列化、压缩后的头部块的最大允许大小。尝试发送
    超出此限制的头部将导致触发 `'frameError'` 事件，并且该流将被关闭并销毁。
  * `paddingStrategy` {number} 用于确定 `HEADERS` 和 `DATA` 帧所使用填充量的策略。**默认值：**
    `http2.constants.PADDING_STRATEGY_NONE`。可选值可以是：
    * `http2.constants.PADDING_STRATEGY_NONE`: 不应用填充。
    * `http2.constants.PADDING_STRATEGY_MAX`: 应用由内部实现确定的最大填充量。
    * `http2.constants.PADDING_STRATEGY_ALIGNED`: 尝试应用足够的
      填充，以确保包括 9 字节头部在内的总帧长度为 8 的倍数。对于每个帧，都有一个允许的最大填充字节数，
      该值由当前流控制状态和设置决定。如果此最大值小于为确保对齐所需的计算量，则使用最大值，
      且总帧长度不一定会与 8 字节对齐。
  * `peerMaxConcurrentStreams` {number} 设置远程对端的最大并发
    流数量，就好像已接收到一个 `SETTINGS` 帧一样。如果远程对端为
    `maxConcurrentStreams` 设置了自己的值，则该值会被覆盖。**默认值：** `100`。
  * `maxSessionInvalidFrames` {integer} 设置在会话关闭前可容忍的无效
    帧最大数量。**默认值：** `1000`。
  * `maxSessionRejectedStreams` {integer} 设置在会话关闭前可容忍的、创建时被拒绝的流最大数量。
    每次拒绝都会关联一个 `NGHTTP2_ENHANCE_YOUR_CALM`
    错误，该错误应告知对端不要再打开任何流，因此继续打开流会被视为对端行为异常的迹象。
    **默认值：** `100`。
  * `settings` {HTTP/2 Settings Object} 连接建立时发送给远程对端的初始设置。
  * `streamResetBurst` {number} 和 `streamResetRate` {number} 设置传入流重置（RST_STREAM 帧）的速率
    限制。必须同时设置这两个选项才会生效，默认值分别为 1000 和 33。
  * `remoteCustomSettings` {Array} 该整数值数组决定包含在接收到的 remoteSettings 的
    `customSettings` 属性中的设置类型。有关允许的设置类型，请参阅
    `Http2Settings` 对象的 `customSettings` 属性。
  * `...options` {Object} 可以提供任何 [`tls.createServer()`][] 选项。
    对于服务器，通常需要身份选项（`pfx` 或 `key`/`cert`）。
  * `origins` {string\[]} 一个原点字符串数组，会在创建新的服务器 `Http2Session` 之后立即随一个 `ORIGIN`
    帧发送。
  * `unknownProtocolTimeout` {number} 指定服务器在触发 [`'unknownProtocol'`][] 事件时应等待的超时时间（毫秒）。如果
    到那时 socket 仍未被销毁，服务器将销毁它。
    **默认值：** `10000`。
  * `strictFieldWhitespaceValidation` {boolean} 如果为 `true`，则会启用严格的前导
    and 针对 HTTP/2 标头字段名称和值的尾随空白验证
    根据 [RFC-9113](https://www.rfc-editor.org/rfc/rfc9113.html#section-8.2.1)。
    **默认值：** `true`。
  * `strictSingleValueFields` {boolean} 如果 `true`，则对被定义为仅有单个值的标头和尾部字段使用严格验证，
    这样一来，如果提供了多个值，就会抛出错误。
    **默认值：** `true`。
  * `http1Options` {Object} 用于在 `allowHTTP1` 为 `true` 时配置 HTTP/1
    回退的选项对象。这些选项会传递给底层的 HTTP/1 服务器。可用选项请参见 [`http.createServer()`][]。
    其中支持以下选项：
    * `IncomingMessage` {http.IncomingMessage} 指定用于 HTTP/1 回退的
      `IncomingMessage` 类。
      **默认值：** `http.IncomingMessage`。
    * `ServerResponse` {http.ServerResponse} 指定用于 HTTP/1 回退的 `ServerResponse`
      类。
      **默认值：** `http.ServerResponse`。
    * `keepAliveTimeout` {number} 在服务器完成写入最后一个响应之后，
      需要等待额外传入数据的空闲毫秒数；超过该时间后，将销毁套接字。
      **默认值：** `5000`。
* `onRequestHandler` {Function} 参见 [兼容性 API][]
* 返回值：{Http2SecureServer}

返回一个 `tls.Server` 实例，该实例创建和管理 `Http2Session`
实例。

```mjs
import { createSecureServer } from 'node:http2';
import { readFileSync } from 'node:fs';

const options = {
  key: readFileSync('server-key.pem'),
  cert: readFileSync('server-cert.pem'),
};

// 创建一个安全的 HTTP/2 服务器
const server = createSecureServer(options);

server.on('stream', (stream, headers) => {
  stream.respond({
    'content-type': 'text/html; charset=utf-8',
    ':status': 200,
  });
  stream.end('<h1>Hello World</h1>');
});

server.listen(8443);
```

```cjs
const http2 = require('node:http2');
const fs = require('node:fs');

const options = {
  key: fs.readFileSync('server-key.pem'),
  cert: fs.readFileSync('server-cert.pem'),
};

// 创建一个安全的 HTTP/2 服务器
const server = http2.createSecureServer(options);

server.on('stream', (stream, headers) => {
  stream.respond({
    'content-type': 'text/html; charset=utf-8',
    ':status': 200,
  });
  stream.end('<h1>Hello World</h1>');
});

server.listen(8443);
```

### `http2.connect(authority[, options][, listener])`

<!-- YAML
added: v8.4.0
changes:
  - version:
      - v15.10.0
      - v14.16.0
      - v12.21.0
      - v10.24.0
    pr-url: https://github.com/nodejs-private/node-private/pull/246
    description: "添加了 `unknownProtocolTimeout` 选项，默认值为 10000。"
  - version:
     - v14.4.0
     - v12.18.0
     - v10.21.0
    commit: 3948830ce6408be620b09a70bf66158623022af0
    pr-url: https://github.com/nodejs-private/node-private/pull/204
    description: "添加了 `maxSettings` 选项，默认值为 32。"
  - version: v13.0.0
    pr-url: https://github.com/nodejs/node/pull/29144
    description: "`PADDING_STRATEGY_CALLBACK` 已等同于提供`PADDING_STRATEGY_ALIGNED`，并且 `selectPadding`已被移除。"
  - version: v8.9.3
    pr-url: https://github.com/nodejs/node/pull/17105
    description: "添加了 `maxOutstandingPings` 选项，默认限制为10。"
  - version: v8.9.3
    pr-url: https://github.com/nodejs/node/pull/16676
    description: "添加了 `maxHeaderListPairs` 选项，默认限制为128 个头部对。"
-->

* `authority` {string|URL} 要连接的远程 HTTP/2 服务器。这必须
  是带有 `http://` 或 `https://`
  前缀、主机名和 IP 端口（如果使用非默认端口）的最小有效 URL 形式。用户信息
  （用户 ID 和密码）、路径、查询字符串和 URL 中的片段详情将被忽略。
* `options` {Object}
  * `maxDeflateDynamicTableSize` {number} 设置用于压缩头字段的最大动态表大小。**默认值：** `4Kib`。
  * `maxSettings` {number} 设置每个 `SETTINGS` 帧中的最大设置项数量。允许的最小值是 `1`。**默认值：** `32`。
  * `maxSessionMemory`{number} 设置 `Http2Session` 允许使用的最大内存。该值以兆字节数表示，
    例如 `1` 等于 1 兆字节。允许的最小值是 `1`。
    这是一个基于额度的限制，现有的 `Http2Stream`s 可能会导致此
    限制被超过，但在超过该限制时，新的 `Http2Stream` 实例将被拒绝。
    当前 `Http2Stream` 会话数量、头部压缩表当前使用的内存、由打开的流保留的头部块、
    当前排队等待发送的数据，以及未确认的 `PING` 和 `SETTINGS` 帧都会计入
    当前限制。**默认值：** `10`。
  * `maxHeaderListPairs` {number} 设置头部项的最大数量。
    这类似于 `server.maxHeadersCount`[] 或
    `request.maxHeadersCount`[] 模块中的 `node:http`。允许的最小值
    是 `1`。**默认值：** `128`。
  * `maxOriginSetSize` {number} 设置服务器可以通过 ORIGIN 帧发送的唯一来源的最大数量。**默认值：** `128`。
  * `maxOutstandingPings` {number} 设置未完成、未确认的 ping 的最大数量。**默认值：** `10`。
  * `maxReservedRemoteStreams` {number} 设置客户端在任何给定时间可接受的保留推送流的最大数量。一旦当前已保留的推送流数量超过
    达到此限制，服务器发送的新推送流将被自动拒绝。允许的最小值
    是 0。允许的最大值是 2<sup>32</sup>-1。负值会将
    此选项设置为允许的最大值。**默认值：** `200`。
  * `maxSendHeaderBlockLength` {number} 设置序列化后的压缩头部块的最大允许大小。尝试发送超过此限制的头部将导致触发一个 `'frameError'` 事件，并且流将被关闭并销毁。
  * `paddingStrategy` {number} 用于确定 `HEADERS` 和 `DATA` 帧所使用填充量的策略。**默认值：**
    `http2.constants.PADDING_STRATEGY_NONE`。取值可以是以下之一：
    * `http2.constants.PADDING_STRATEGY_NONE`: 不应用填充。
    * `http2.constants.PADDING_STRATEGY_MAX`: 应用由内部实现确定的最大填充量。
    * `http2.constants.PADDING_STRATEGY_ALIGNED`: 尝试应用足够的
      填充，以确保包括 9 字节帧头在内的总帧长度是 8 的倍数。对于每个帧，可允许的最大填充字节数由当前流控制
      状态和设置决定。如果该最大值小于确保对齐所需的计算量，则使用最大值，并且总帧长度不一定会对齐到 8 字节。
  * `peerMaxConcurrentStreams` {number} 为远程对等端设置最大并发
    流数量，就像已收到一个 `SETTINGS` 帧一样。如果远程对等端为
    `maxConcurrentStreams` 设置了自己的值，则将覆盖此设置。**默认值：** `100`。
  * `protocol` {string} 如果未在 `authority` 中设置，则用于连接的协议。取值可以是 `'http:'` 或 `'https:'`。**默认值：**
    `'https:'`
  * `settings` {HTTP/2 Settings Object} 连接时发送给远程对等端的初始设置。
  * `remoteCustomSettings` {Array} 整数值数组确定设置类型，这些类型包含在接收到的
    remoteSettings 的 `CustomSettings` 属性中。请参阅 `Http2Settings` 对象的 `CustomSettings` 属性以获取更多关于允许的设置类型的信息。
  * `createConnection` {Function} 一个可选的回调，接收传递给 `connect` 的 `URL`
    实例和 `options` 对象，并返回任何将用作此会话连接的 [`Duplex`][] 流。
  * `...options` {Object} 可以提供任何 [`net.connect()`][] 或 [`tls.connect()`][] 选项
    。
  * `unknownProtocolTimeout` {number} 指定当发出 [`'unknownProtocol'`][] 事件时服务器应等待的超时时间（毫秒）。如果
    到时 socket 尚未被销毁，服务器将销毁它。
    **默认值：** `10000`。
  * `strictFieldWhitespaceValidation` {boolean} 如果为 `true`，则根据 [RFC-9113](https://www.rfc-editor.org/rfc/rfc9113.html#section-8.2.1) 开启对 HTTP/2 头部字段名称和值的严格前导
    和尾随空格验证。
    **默认值：** `true`。
* `listener` {Function} 将被注册为 [`'connect'`][] 事件的一次性监听器。
* 返回：{ClientHttp2Session}

返回一个 `ClientHttp2Session` 实例。

```mjs
import { connect } from 'node:http2';
const client = connect('https://localhost:1234');

/* 使用客户端 */

client.close();
```

```cjs
const http2 = require('node:http2');
const client = http2.connect('https://localhost:1234');

/* 使用客户端 */

client.close();
```

### HTTP/2

<!-- YAML
added: v8.4.0
-->

#### HTTP/2 和 HTTP/3 的错误码

| Value  | Name                | Constant                                      |
| ------ | ------------------- | --------------------------------------------- |
| `0x00` | 无错误            | `http2.constants.NGHTTP2_NO_ERROR`            |
| `0x01` | 协议错误      | `http2.constants.NGHTTP2_PROTOCOL_ERROR`      |
| `0x02` | 内部错误      | `http2.constants.NGHTTP2_INTERNAL_ERROR`      |
| `0x03` | 流控制错误  | `http2.constants.NGHTTP2_FLOW_CONTROL_ERROR`  |
| `0x04` | 设置超时    | `http2.constants.NGHTTP2_SETTINGS_TIMEOUT`    |
| `0x05` | 流已关闭       | `http2.constants.NGHTTP2_STREAM_CLOSED`       |
| `0x06` | 帧大小错误    | `http2.constants.NGHTTP2_FRAME_SIZE_ERROR`    |
| `0x07` | 拒绝流      | `http2.constants.NGHTTP2_REFUSED_STREAM`      |
| `0x08` | 取消              | `http2.constants.NGHTTP2_CANCEL`              |
| `0x09` | 压缩错误   | `http2.constants.NGHTTP2_COMPRESSION_ERROR`   |
| `0x0a` | 连接错误       | `http2.constants.NGHTTP2_CONNECT_ERROR`       |
| `0x0b` | 增强你的冷静   | `http2.constants.NGHTTP2_ENHANCE_YOUR_CALM`   |
| `0x0c` | 安全性不足 | `http2.constants.NGHTTP2_INADEQUATE_SECURITY` |
| `0x0d` | 需要 HTTP/1.1   | `http2.constants.NGHTTP2_HTTP_1_1_REQUIRED`   |

当服务器在由 `http2server.setTimeout()` 设置的给定毫秒数内没有活动时，将发出 `'timeout'` 事件。

### 默认设置

<!-- YAML
added: v8.4.0
-->

* 返回：{HTTP/2 Settings Object}

返回一个包含 `Http2Session` 实例默认设置的对象。此方法每次调用时都会返回一个新的对象实例，因此返回的实例可以安全地修改以供使用。

### 序列化设置

<!-- YAML
added: v8.4.0
-->

* `settings` {HTTP/2 Settings Object}
* 返回：{Buffer}

返回一个 `Buffer` 实例，其中包含 [HTTP/2][] 规范中指定的给定 HTTP/2 设置的序列化表示。这旨在与 `HTTP2-Settings` 头部字段一起使用。

```mjs
import { getPackedSettings } from 'node:http2';

const packed = getPackedSettings({ enablePush: false });

console.log(packed.toString('base64'));
// 输出：AAIAAAAA
```

```cjs
const http2 = require('node:http2');

const packed = http2.getPackedSettings({ enablePush: false });

console.log(packed.toString('base64'));
// 输出：AAIAAAAA
```

### `http2.getUnpackedSettings(buf)`

<!-- YAML
added: v8.4.0
-->

* `buf` {Buffer|TypedArray} 打包的设置。
* 返回：{HTTP/2 Settings Object}

返回一个 [HTTP/2 设置对象][]，其中包含从给定的 `Buffer` 反序列化的设置，该 `Buffer` 由 `http2.getPackedSettings()` 生成。

### `http2.performServerHandshake(socket[, options])`

<!-- YAML
added:
  - v21.7.0
  - v20.12.0
-->

* `socket` {stream.Duplex}
* `options` {Object} 可以提供任何 [`http2.createServer()`][] 选项。
* 返回：{ServerHttp2Session}

从现有的 socket 创建一个 HTTP/2 服务器会话。

### `http2.sensitiveHeaders`

<!-- YAML
added:
  - v15.0.0
  - v14.18.0
-->

* 类型：{symbol}

此符号可以设置为 HTTP/2 头部对象上的属性，其值为数组，以便提供被视为敏感的头部列表。
请参阅 [敏感头部][] 以获取更多详情。

### 头部对象

头部表示为 JavaScript 对象上的自有属性。属性键将被序列化为小写。属性值应为字符串（如果不是，它们将被强制转换为字符串）或字符串 `Array`（以便每个头部字段发送多个值）。

```js
const headers = {
  ':status': '200',
  'content-type': 'text-plain',
  'ABC': ['has', 'more', 'than', 'one', 'value'],
};

stream.respond(headers);
```

传递给回调函数的头部对象将具有 `null` 原型。这意味着正常的 JavaScript 对象方法，如
`Object.prototype.toString()` 和 `Object.prototype.hasOwnProperty()` 将
不起作用。

对于传入的头部：

* `:status` 头部被转换为 `number`。
* `:status`、`:method`、`:authority`、`:scheme`、`:path`、
  `:protocol`、`age`、`authorization`、`access-control-allow-credentials`、
  `access-control-max-age`、`access-control-request-method`、`content-encoding`、
  `content-language`、`content-length`、`content-location`、`content-md5`、
  `content-range`、`content-type`、`date`、`dnt`、`etag`、`expires`、`from`、
  `host`、`if-match`、`if-modified-since`、`if-none-match`、`if-range`、
  `if-unmodified-since`、`last-modified`、`location`、`max-forwards`、
  `proxy-authorization`、`range`、`referer`、`retry-after`、`tk`、
  `upgrade-insecure-requests`、`user-agent` 或 `x-content-type-options` 的重复项被
  丢弃。
* `set-cookie` 始终是一个数组。重复项被添加到数组中。
* 对于重复的 `cookie` 头部，值用 '; ' 连接在一起。
* 对于所有其他头部，值用 ', ' 连接在一起。

```mjs
import { createServer } from 'node:http2';
const server = createServer();
server.on('stream', (stream, headers) => {
  console.log(headers[':path']);
  console.log(headers.ABC);
});
```

```cjs
const http2 = require('node:http2');
const server = http2.createServer();
server.on('stream', (stream, headers) => {
  console.log(headers[':path']);
  console.log(headers.ABC);
});
```

#### 原始头部

在某些 API 中，除了对象格式外，头部还可以作为原始扁平数组传递或访问，保留排序和重复键的详细信息，以匹配原始传输格式。

在这种格式中，键和值位于同一个列表中。它 _不是_ 元组列表。因此，偶数偏移量是键，奇数偏移量是对应的值。重复的头部不会合并，因此每个键值对都会单独出现。

这对于代理等情况很有用，在这些情况下，现有头部应完全按照接收到的方式转发，或者当头部已经以原始格式可用时，可作为一种性能优化。

```js
const rawHeaders = [
  ':status',
  '404',
  'content-type',
  'text/plain',
];

stream.respond(rawHeaders);
```

#### 敏感头部

HTTP2 头部可以被标记为敏感，这意味着 HTTP/2
头部压缩算法永远不会索引它们。这对于熵低且可能被认为对攻击者有价值的头部值是有意义的，例如 `Cookie` 或 `Authorization`。要实现这一点，请将头部名称作为数组添加到 `[http2.sensitiveHeaders]` 属性：

```js
const headers = {
  ':status': '200',
  'content-type': 'text-plain',
  'cookie': 'some-cookie',
  'other-sensitive-header': 'very secret data',
  [http2.sensitiveHeaders]: ['cookie', 'other-sensitive-header'],
};

stream.respond(headers);
```

对于某些头部，例如 `Authorization` 和短 `Cookie` 头部，
此标志会自动设置。

此属性也为接收到的头部设置。它将包含所有标记为敏感的头部名称，包括自动标记的头部。

对于原始头部，这仍应设置为数组上的属性，例如
`rawHeadersArray[http2.sensitiveHeaders] = ['cookie']`，而不是作为数组本身内的单独键值对。

### 设置对象

<!-- YAML
added: v8.4.0
changes:
  - version: v12.12.0
    pr-url: https://github.com/nodejs/node/pull/29833
    description: "`maxConcurrentStreams` 设置更加严格。"
  - version: v8.9.3
    pr-url: https://github.com/nodejs/node/pull/16676
    description: "`maxHeaderListSize` 设置现在被严格执行。"
-->

`http2.getDefaultSettings()`、`http2.getPackedSettings()`、
`http2.createServer()`、`http2.createSecureServer()`、
`http2session.settings()`、`http2session.localSettings` 和
`http2session.remoteSettings` API 要么返回要么接收一个定义 `Http2Session` 对象配置设置的对象作为输入。
这些对象是包含以下属性的普通 JavaScript 对象。

* `headerTableSize` {number} 指定用于头部压缩的最大字节数。允许的最小值为 0。允许的最大值
  为 2<sup>32</sup>-1。**默认值：** `4096`。
* `enablePush` {boolean} 如果允许在 `Http2Session` 实例上使用 HTTP/2 推送流，则指定为 `true`。**默认值：** `true`。
* `initialWindowSize` {number} 指定流级流控制的 _发送方_ 初始窗口大小（字节）。允许的最小值为 0。
  允许的最大值为 2<sup>32</sup>-1。**默认值：** `65535`。
* `maxFrameSize` {number} 指定最大帧负载的大小（字节）。允许的最小值为 16,384。允许的最大值为
  2<sup>24</sup>-1。**默认值：** `16384`。
* `maxConcurrentStreams` {number} 指定 `Http2Session` 上允许的最大并发
  流数。没有默认值，这意味着至少在理论上，`Http2Session` 中在任何给定时间可以有 2<sup>32</sup>-1 个流同时打开。最小值
  为 0。允许的最大值为 2<sup>32</sup>-1。**默认值：**
  `4294967295`。
* `maxHeaderListSize` {number} 指定将接受的头部列表的最大大小（未压缩字节）。允许的最小值为 0。
  允许的最大值为 2<sup>32</sup>-1。**默认值：** `65535`。
* `maxHeaderSize` {number} `maxHeaderListSize` 的别名。
* `enableConnectProtocol`{boolean} 如果启用 [RFC 8441][] 定义的“扩展连接
  协议”，则指定为 `true`。此设置仅
  在由服务器发送时才有意义。一旦为给定的 `Http2Session` 启用了 `enableConnectProtocol` 设置，就不能禁用它。
  **默认值：** `false`。
* `customSettings` {Object} 指定额外的设置，但尚未在 node 和底层库中实现。对象的键定义设置类型的数值（由 \[RFC 7540] 建立的"HTTP/2 SETTINGS"注册表中定义），值则是设置的实际数值。
  设置类型必须是 1 到 2^16-1 范围内的整数。
  它不应该是 node 已经处理的设置类型，即目前
  它应该大于 6，尽管这不是错误。
  值必须是 0 到 2^32-1 范围内的无符号整数。
  目前，最多支持 10 个自定义设置。
  仅支持发送 SETTINGS，或接收服务器或客户端
  对象的 `remoteCustomSettings` 选项中指定的设置值。不要将设置 id 的 `customSettings` 机制与本地处理的设置接口混合，以防设置在未来的 node 版本中变为本地支持。

设置对象上的所有其他属性都被忽略。

### 错误处理

使用 `node:http2` 模块时可能会出现几种类型的错误条件：

当传递不正确的参数、选项或设置值时，会发生验证错误。这些总是通过同步 `throw` 报告。

当在不正确的时间尝试操作时（例如，在流关闭后尝试在流上发送数据），会发生状态错误。这些将通过同步 `throw` 或 `Http2Stream`、`Http2Session` 或 HTTP/2 服务器对象上的 `'error'` 事件报告，具体取决于错误发生的位置和时间。

当 HTTP/2 会话意外失败时，会发生内部错误。这些将通过 `Http2Session` 或 HTTP/2 服务器对象上的 `'error'` 事件报告。

当违反各种 HTTP/2 协议约束时，会发生协议错误。这些将通过同步 `throw` 或 `Http2Stream`、`Http2Session` 或 HTTP/2 服务器对象上的 `'error'` 事件报告，具体取决于错误发生的位置和时间。

### 头部名称和值中的无效字符处理

HTTP/2 实现对 HTTP 头部名称和值中无效字符的处理比 HTTP/1 实现更严格。

头部字段名称是 _不区分大小写_ 的，并且严格作为小写字符串在线上传输。Node.js 提供的 API 允许将头部名称设置为混合大小写字符串（例如 `Content-Type`），但在传输时会将它们转换为小写（例如 `content-type`）。

头部字段名称 _必须仅_ 包含以下 ASCII 字符中的一个或多个：`a`-`z`、`A`-`Z`、`0`-`9`、`!`、`#`、`$`、`%`、`&`、`'`、`*`、`+`、
`-`、`.`、`^`、`_`、`` ` ``（反引号）、`|` 和 `~`。

在 HTTP 头部字段名称中使用无效字符将导致流被关闭并报告协议错误。

头部字段值的处理更为宽松，但 _不应_ 包含换行或回车字符，并且 _应_ 限制为 US-ASCII 字符，符合 HTTP 规范的要求。

### 客户端上的推送流

要在客户端接收推送流，请在 `ClientHttp2Session` 上设置 `'stream'` 事件的监听器：

```mjs
import { connect } from 'node:http2';

const client = connect('http://localhost');

client.on('stream', (pushedStream, requestHeaders) => {
  pushedStream.on('push', (responseHeaders) => {
    // 处理响应头部
  });
  pushedStream.on('data', (chunk) => { /* 处理推送的数据 */ });
});

const req = client.request({ ':path': '/' });
```

```cjs
const http2 = require('node:http2');

const client = http2.connect('http://localhost');

client.on('stream', (pushedStream, requestHeaders) => {
  pushedStream.on('push', (responseHeaders) => {
    // 处理响应头部
  });
  pushedStream.on('data', (chunk) => { /* 处理推送的数据 */ });
});

const req = client.request({ ':path': '/' });
```

### 支持 `CONNECT` 方法

`CONNECT` 方法用于允许 HTTP/2 服务器用作 TCP/IP 连接的代理。

一个简单的 TCP 服务器：

```mjs
import { createServer } from 'node:net';

const server = createServer((socket) => {
  let name = '';
  socket.setEncoding('utf8');
  socket.on('data', (chunk) => name += chunk);
  socket.on('end', () => socket.end(`hello ${name}`));
});

server.listen(8000);
```

```cjs
const net = require('node:net');

const server = net.createServer((socket) => {
  let name = '';
  socket.setEncoding('utf8');
  socket.on('data', (chunk) => name += chunk);
  socket.on('end', () => socket.end(`hello ${name}`));
});

server.listen(8000);
```

一个 HTTP/2 CONNECT 代理：

```mjs
import { createServer, constants } from 'node:http2';
const { NGHTTP2_REFUSED_STREAM, NGHTTP2_CONNECT_ERROR } = constants;
import { connect } from 'node:net';

const proxy = createServer();
proxy.on('stream', (stream, headers) => {
  if (headers[':method'] !== 'CONNECT') {
    // 仅接受 CONNECT 请求
    stream.close(NGHTTP2_REFUSED_STREAM);
    return;
  }
  const auth = new URL(`tcp://${headers[':authority']}`);
  // 验证主机名和端口是否是此代理应该连接的内容是一个非常好的主意。
  const socket = connect(auth.port, auth.hostname, () => {
    stream.respond();
    socket.pipe(stream);
    stream.pipe(socket);
  });
  socket.on('error', (error) => {
    stream.close(NGHTTP2_CONNECT_ERROR);
  });
});

proxy.listen(8001);
```

```cjs
const http2 = require('node:http2');
const { NGHTTP2_REFUSED_STREAM } = http2.constants;
const net = require('node:net');

const proxy = http2.createServer();
proxy.on('stream', (stream, headers) => {
  if (headers[':method'] !== 'CONNECT') {
    // 仅接受 CONNECT 请求
    stream.close(NGHTTP2_REFUSED_STREAM);
    return;
  }
  const auth = new URL(`tcp://${headers[':authority']}`);
  // 验证主机名和端口是否是此代理应该连接的内容是一个非常好的主意。
  const socket = net.connect(auth.port, auth.hostname, () => {
    stream.respond();
    socket.pipe(stream);
    stream.pipe(socket);
  });
  socket.on('error', (error) => {
    stream.close(http2.constants.NGHTTP2_CONNECT_ERROR);
  });
});

proxy.listen(8001);
```

一个 HTTP/2 CONNECT 客户端：

```mjs
import { connect, constants } from 'node:http2';

const client = connect('http://localhost:8001');

// 对于 CONNECT 请求，不得指定 ':path' 和 ':scheme' 头部，否则将抛出错误。
const req = client.request({
  ':method': 'CONNECT',
  ':authority': 'localhost:8000',
});

req.on('response', (headers) => {
  console.log(headers[constants.HTTP2_HEADER_STATUS]);
});
let data = '';
req.setEncoding('utf8');
req.on('data', (chunk) => data += chunk);
req.on('end', () => {
  console.log(`服务器说：${data}`);
  client.close();
});
req.end('Jane');
```

```cjs
const http2 = require('node:http2');

const client = http2.connect('http://localhost:8001');

// 对于 CONNECT 请求，不得指定 ':path' 和 ':scheme' 头部，否则将抛出错误。
const req = client.request({
  ':method': 'CONNECT',
  ':authority': 'localhost:8000',
});

req.on('response', (headers) => {
  console.log(headers[http2.constants.HTTP2_HEADER_STATUS]);
});
let data = '';
req.setEncoding('utf8');
req.on('data', (chunk) => data += chunk);
req.on('end', () => {
  console.log(`服务器说：${data}`);
  client.close();
});
req.end('Jane');
```

### 扩展的 `CONNECT` 协议

[RFC 8441][] 定义了一个 HTTP/2 的“扩展 CONNECT 协议”扩展，可用于引导使用 `CONNECT` 方法将 `Http2Stream` 用作其他通信协议（如 WebSockets）的隧道。

HTTP/2 服务器通过使用 `enableConnectProtocol` 设置来启用扩展 CONNECT 协议的使用：

```mjs
import { createServer } from 'node:http2';
const settings = { enableConnectProtocol: true };
const server = createServer({ settings });
```

```cjs
const http2 = require('node:http2');
const settings = { enableConnectProtocol: true };
const server = http2.createServer({ settings });
```

一旦客户端从服务器接收到表明可以使用扩展 CONNECT 的 `SETTINGS` 帧，它就可以发送使用 `':protocol'` HTTP/2 伪头部的 `CONNECT` 请求：

```mjs
import { connect } from 'node:http2';
const client = connect('http://localhost:8080');
client.on('remoteSettings', (settings) => {
  if (settings.enableConnectProtocol) {
    const req = client.request({ ':method': 'CONNECT', ':protocol': 'foo' });
    // ...
  }
});
```

```cjs
const http2 = require('node:http2');
const client = http2.connect('http://localhost:8080');
client.on('remoteSettings', (settings) => {
  if (settings.enableConnectProtocol) {
    const req = client.request({ ':method': 'CONNECT', ':protocol': 'foo' });
    // ...
  }
});
```

## 兼容性 API

兼容性 API 的目标是在使用 HTTP/2 时提供与 HTTP/1 类似的开发者体验，使得开发同时支持 [HTTP/1][] 和 HTTP/2 的应用程序成为可能。此 API 仅针对 [HTTP/1][] 的 **公共 API**。然而，许多模块使用内部方法或状态，这些 _不受支持_，因为它们是完全不同的实现。

以下示例使用兼容性 API 创建了一个 HTTP/2 服务器：

```mjs
import { createServer } from 'node:http2';
const server = createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('ok');
});
```

```cjs
const http2 = require('node:http2');
const server = http2.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('ok');
});
```

要创建混合的 [HTTPS][] 和 HTTP/2 服务器，请参阅 [ALPN 协商][] 部分。
不支持从非 TLS HTTP/1 服务器升级。

HTTP/2 兼容性 API 由 [`Http2ServerRequest`][] 和 [`Http2ServerResponse`][] 组成。它们旨在与 HTTP/1 保持 API 兼容，但它们并不隐藏协议之间的差异。例如，HTTP 代码的状态消息将被忽略。

### ALPN 协商

ALPN 协商允许在同一个 socket 上支持 [HTTPS][] 和 HTTP/2。`req` 和 `res` 对象可以是 HTTP/1 或 HTTP/2，应用程序 **必须** 将自身限制在 [HTTP/1][] 的公共 API 内，并检测是否可以使用 HTTP/2 的高级功能。

以下示例创建了一个支持两种协议的服务器：

```mjs
import { createSecureServer } from 'node:http2';
import { readFileSync } from 'node:fs';

const cert = readFileSync('./cert.pem');
const key = readFileSync('./key.pem');

const server = createSecureServer(
  { cert, key, allowHTTP1: true },
  onRequest,
).listen(8000);

function onRequest(req, res) {
  // Detects if it is an HTTPS request or HTTP/2
  const { socket: { alpnProtocol } } = req.httpVersion === '2.0' ?
    req.stream.session : req;
  res.writeHead(200, { 'content-type': 'application/json' });
  res.end(JSON.stringify({
    alpnProtocol,
    httpVersion: req.httpVersion,
  }));
}
```

```cjs
const { createSecureServer } = require('node:http2');
const { readFileSync } = require('node:fs');

const cert = readFileSync('./cert.pem');
const key = readFileSync('./key.pem');

const server = createSecureServer(
  { cert, key, allowHTTP1: true },
  onRequest,
).listen(4443);

function onRequest(req, res) {
  // Detects if it is an HTTPS request or HTTP/2
  const { socket: { alpnProtocol } } = req.httpVersion === '2.0' ?
    req.stream.session : req;
  res.writeHead(200, { 'content-type': 'application/json' });
  res.end(JSON.stringify({
    alpnProtocol,
    httpVersion: req.httpVersion,
  }));
}
```

`'request'` 事件在 [HTTPS][] 和 HTTP/2 上的工作方式相同。

### 类：`http2.Http2ServerRequest`

<!-- YAML
added: v8.4.0
-->

* 继承：{stream.Readable}

`Http2ServerRequest` 对象由 [`http2.Server`][] 或 [`http2.SecureServer`][] 创建，并作为第一个参数传递给 [`'request'`][] 事件。它可用于访问请求状态、头和数据。

#### 事件：`'aborted'`

<!-- YAML
added: v8.4.0
-->

当底层可写端仍处于打开状态时，如果 `Http2ServerRequest` 实例被关闭，就会触发 `'aborted'` 事件。

#### 事件：`'close'`

<!-- YAML
added: v8.4.0
-->

表示底层的 [`Http2Stream`][] 已关闭。
就像 `'end'` 一样，此事件每个响应只发生一次。

#### `request.aborted`

<!-- YAML
added: v10.1.0
-->

* 类型：{boolean}

如果请求已中止，`request.aborted` 属性将为 `true`。

#### `request.authority`

<!-- YAML
added: v8.4.0
-->

* 类型：{string}

请求权威伪头字段。因为 HTTP/2 允许请求设置 `:authority` 或 `host`，所以如果存在，此值源自 `req.headers[':authority']`。否则，它源自 `req.headers['host']`。

#### `request.complete`

<!-- YAML
added: v12.10.0
-->

* 类型：{boolean}

如果请求已完成、中止或销毁，`request.complete` 属性将为 `true`。

#### `request.connection`

<!-- YAML
added: v8.4.0
deprecated: v13.0.0
-->

> 稳定性：0 - 已弃用。使用 [`request.socket`][]。

* 类型：{net.Socket|tls.TLSSocket}

参见 [`request.socket`][]。

#### `request.destroy([error])`

<!-- YAML
added: v8.4.0
-->

* `error` {Error}

在接收 [`Http2ServerRequest`][] 的 [`Http2Stream`][] 上调用 `destroy()`。如果提供了 `error`，则会发出 `'error'` 事件，并将 `error` 作为参数传递给该事件的任何监听器。

如果流已被销毁，则不执行任何操作。

#### `request.headers`

<!-- YAML
added: v8.4.0
-->

* 类型：{Object}

请求/响应头对象。

头名称和值的键值对。头名称为小写。

```js
// 打印类似以下内容：
//
// { 'user-agent': 'curl/7.22.0',
//   host: '127.0.0.1:8000',
//   accept: '*/*' }
console.log(request.headers);
```

参见 [HTTP/2 头对象][]。

在 HTTP/2 中，请求路径、主机名、协议和方法表示为以 `:` 字符为前缀的特殊头（例如 `':path'`）。这些特殊头将包含在 `request.headers` 对象中。必须注意不要无意中修改这些特殊头，否则可能会发生错误。例如，从请求中移除所有头会导致错误发生：

```js
removeAllHeaders(request.headers);
assert(request.url);   // 失败，因为 :path 头已被移除
```

#### `request.httpVersion`

<!-- YAML
added: v8.4.0
-->

* 类型：{string}

如果是服务器请求，则为客户端发送的 HTTP 版本。如果是客户端响应，则为所连接服务器的 HTTP 版本。返回 `'2.0'`。

此外，`message.httpVersionMajor` 是第一个整数，`message.httpVersionMinor` 是第二个整数。

#### `request.method`

<!-- YAML
added: v8.4.0
-->

* 类型：{string}

请求方法，字符串形式。只读。示例：`'GET'`、`'DELETE'`。

#### `request.rawHeaders`

<!-- YAML
added: v8.4.0
-->

* 类型：{HTTP/2 原始头}

原始请求/响应头列表，完全按照接收到的样子。

```js
// 打印类似以下内容：
//
// [ 'user-agent',
//   '这是无效的，因为只能有一个',
//   'User-Agent',
//   'curl/7.22.0',
//   'Host',
//   '127.0.0.1:8000',
//   'ACCEPT',
//   '*/*' ]
console.log(request.rawHeaders);
```

#### `request.rawTrailers`

<!-- YAML
added: v8.4.0
-->

* 类型：{string\[]}

原始请求/响应尾部字段键和值，完全按照接收到的样子。仅在 `'end'` 事件处填充。

#### `request.scheme`

<!-- YAML
added: v8.4.0
-->

* 类型：{string}

请求方案伪头字段，指示目标 URL 的方案部分。

#### `request.setTimeout(msecs, callback)`

<!-- YAML
added: v8.4.0
-->

* `msecs` {number}
* `callback` {Function}
* 返回：{http2.Http2ServerRequest}

将 [`Http2Stream`][] 的超时值设置为 `msecs`。如果提供了回调，则将其作为监听器添加到响应对象的 `'timeout'` 事件上。

如果没有向请求、响应或服务器添加 `'timeout'` 监听器，则 [`Http2Stream`][] 在超时时会被销毁。如果为请求、响应或服务器的 `'timeout'` 事件分配了处理程序，则必须显式处理超时的 socket。

#### `request.socket`

<!-- YAML
added: v8.4.0
-->

* 类型：{net.Socket|tls.TLSSocket}

返回一个 `Proxy` 对象，其行为像 `net.Socket`（或 `tls.TLSSocket`），但根据 HTTP/2 逻辑应用 getter、setter 和方法。

`destroyed`、`readable` 和 `writable` 属性将从 `request.stream` 检索并设置。

`destroy`、`emit`、`end`、`on` 和 `once` 方法将在 `request.stream` 上调用。

`setTimeout` 方法将在 `request.stream.session` 上调用。

`pause`、`read`、`resume` 和 `write` 将抛出代码为 `ERR_HTTP2_NO_SOCKET_MANIPULATION` 的错误。有关更多信息，请参阅 [`Http2Session` 和 Sockets][]。

所有其他交互将直接路由到 socket。使用 TLS 支持时，使用 [`request.socket.getPeerCertificate()`][] 获取客户端的身份验证详细信息。

#### `request.stream`

<!-- YAML
added: v8.4.0
-->

* 类型：{Http2Stream}

支持请求的 [`Http2Stream`][] 对象。

#### `request.trailers`

<!-- YAML
added: v8.4.0
-->

* 类型：{Object}

请求/响应 trailers 对象。仅在 `'end'` 事件处填充。

#### `request.url`

<!-- YAML
added: v8.4.0
-->

* 类型：{string}

请求 URL 字符串。这仅包含实际 HTTP 请求中存在的 URL。如果请求是：

```http
GET /status?name=ryan HTTP/1.1
Accept: text/plain
```

那么 `request.url` 将是：

```json
"/status?name=ryan"
```

要将 URL 解析为其部分，可以使用 `new URL()`：

```console
$ node
> new URL('/status?name=ryan', 'http://example.com')
URL {
  href: 'http://example.com/status?name=ryan',
  origin: 'http://example.com',
  protocol: 'http:',
  username: '',
  password: '',
  host: 'example.com',
  hostname: 'example.com',
  port: '',
  pathname: '/status',
  search: '?name=ryan',
  searchParams: URLSearchParams { 'name' => 'ryan' },
  hash: ''
}
```

### 类：`http2.Http2ServerResponse`

<!-- YAML
added: v8.4.0
-->

* 继承：{Stream}

此对象由 HTTP 服务器内部创建，而非由用户创建。它作为第二个参数传递给 [`'request'`][] 事件。

#### 事件：`'close'`

<!-- YAML
added: v8.4.0
-->

表示底层的 [`Http2Stream`][] 在调用 [`response.end()`][] 或能够刷新之前被终止。

#### 事件：`'finish'`

<!-- YAML
added: v8.4.0
-->

当响应已发送时发出。更具体地说，当响应头和主体的最后一段被交给 HTTP/2 多路复用以便通过网络传输时，会发出此事件。这并不意味着客户端已经收到任何内容。

在此事件之后，响应对象上将不再发出更多事件。

#### `response.addTrailers(headers)`

<!-- YAML
added: v8.4.0
-->

* `headers` {Object}

此方法将 HTTP 尾部头（消息末尾的头）添加到响应中。

尝试设置包含无效字符的头字段名称或值将导致抛出 [`TypeError`][]。

#### `response.appendHeader(name, value)`

<!-- YAML
added:
  - v21.7.0
  - v20.12.0
-->

* `name` {string}
* `value` {string|string\[]}

将单个头值附加到头对象。

如果值是数组，则相当于多次调用此方法。

如果该头之前没有值，则相当于调用 [`response.setHeader()`][]。

尝试设置包含无效字符的头字段名称或值将导致抛出 [`TypeError`][]。

```js
// 返回包含 "set-cookie: a" 和 "set-cookie: b" 的头
const server = http2.createServer((req, res) => {
  res.setHeader('set-cookie', 'a');
  res.appendHeader('set-cookie', 'b');
  res.writeHead(200);
  res.end('ok');
});
```

#### `response.connection`

<!-- YAML
added: v8.4.0
deprecated: v13.0.0
-->

> 稳定性：0 - 已弃用。使用 [`response.socket`][]。

* 类型：{net.Socket|tls.TLSSocket}

参见 [`response.socket`][]。

#### `response.createPushResponse(headers, callback)`

<!-- YAML
added: v8.4.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "传递给 `callback` 参数的无效回调现在会抛出 `ERR_INVALID_ARG_TYPE`，而不是 `ERR_INVALID_CALLBACK`。"
-->

* `headers` {HTTP/2 头对象} 描述头的对象
* `callback` {Function} 一旦 `http2stream.pushStream()` 完成，或者当尝试创建推送的 `Http2Stream` 失败或被拒绝，或者在调用 `http2stream.pushStream()` 方法之前 `Http2ServerRequest` 的状态已关闭时调用
  * `err` {Error}
  * `res` {http2.Http2ServerResponse} 新创建的 Http2ServerResponse 对象

使用给定的头调用 [`http2stream.pushStream()`][]，如果成功，则将给定的 [`Http2Stream`][] 包装在新创建的 `Http2ServerResponse` 上作为回调参数。当 `Http2ServerRequest` 关闭时，回调将带有错误 `ERR_HTTP2_INVALID_STREAM` 被调用。

#### `response.end([data[, encoding]][, callback])`

<!-- YAML
added: v8.4.0
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18780
    description: "此方法现在返回对 `ServerResponse` 的引用。"
-->

* `data` {string|Buffer|Uint8Array}
* `encoding` {string}
* `callback` {Function}
* 返回：{this}

此方法向服务器发出信号，表明所有响应头和主体都已发送；服务器应认为此消息已完成。
方法 `response.end()` 必须在每个响应上调用。

如果指定了 `data`，则相当于调用 [`response.write(data, encoding)`][] 后跟 `response.end(callback)`。

如果指定了 `callback`，则当响应流完成时将调用它。

#### `response.finished`

<!-- YAML
added: v8.4.0
deprecated:
 - v13.4.0
 - v12.16.0
-->

> 稳定性：0 - 已弃用。使用 [`response.writableEnded`][]。

* 类型：{boolean}

指示响应是否完成的布尔值。开始为 `false`。在 [`response.end()`][] 执行后，值将为 `true`。

#### `response.getHeader(name)`

<!-- YAML
added: v8.4.0
-->

* `name` {string}
* 返回：{string}

读取已排队但尚未发送给客户端的头。名称不区分大小写。

```js
const contentType = response.getHeader('content-type');
```

#### `response.getHeaderNames()`

<!-- YAML
added: v8.4.0
-->

* 返回：{string\[]}

返回一个包含当前传出头唯一名称的数组。所有头名称均为小写。

```js
response.setHeader('Foo', 'bar');
response.setHeader('Set-Cookie', ['foo=bar', 'bar=baz']);

const headerNames = response.getHeaderNames();
// headerNames === ['foo', 'set-cookie']
```

#### `response.getHeaders()`

<!-- YAML
added: v8.4.0
-->

* 返回：{Object}

返回当前传出头的浅拷贝。由于使用的是浅拷贝，因此可以修改数组值而无需额外调用各种与头相关的 http 模块方法。返回对象的键是头名称，值是相应的头值。所有头名称均为小写。

`response.getHeaders()` 方法返回的对象 _不_ 从 JavaScript `Object` 原型继承。这意味着典型的 `Object` 方法（如 `obj.toString()`、`obj.hasOwnProperty()` 等）未定义且 _将无法工作_。

```js
response.setHeader('Foo', 'bar');
response.setHeader('Set-Cookie', ['foo=bar', 'bar=baz']);

const headers = response.getHeaders();
// headers === { foo: 'bar', 'set-cookie': ['foo=bar', 'bar=baz'] }
```

#### `response.hasHeader(name)`

<!-- YAML
added: v8.4.0
-->

* `name` {string}
* 返回：{boolean}

如果由 `name` 标识的头当前设置在传出头中，则返回 `true`。头名称匹配不区分大小写。

```js
const hasContentType = response.hasHeader('content-type');
```

#### `response.headersSent`

<!-- YAML
added: v8.4.0
-->

* 类型：{boolean}

如果已发送头则为真，否则为假（只读）。

#### `response.removeHeader(name)`

<!-- YAML
added: v8.4.0
-->

* `name` {string}

移除已排队用于隐式发送的头。

```js
response.removeHeader('Content-Encoding');
```

#### `response.req`

<!-- YAML
added: v15.7.0
-->

* 类型：{http2.Http2ServerRequest}

对原始 HTTP2 `request` 对象的引用。

#### `response.sendDate`

<!-- YAML
added: v8.4.0
-->

* 类型：{boolean}

当为 true 时，如果头中尚不存在，则 Date 头将自动生成并发送在响应中。默认为 true。

这应仅用于测试禁用；HTTP 要求响应中包含 Date 头。

#### `response.setHeader(name, value)`

<!-- YAML
added: v8.4.0
-->

* `name` {string}
* `value` {string|string\[]}

为隐式头设置单个头值。如果此头已存在于待发送头中，其值将被替换。此处使用字符串数组来发送多个具有相同名称的头。

```js
response.setHeader('Content-Type', 'text/html; charset=utf-8');
```

或

```js
response.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
```

尝试设置包含无效字符的头字段名称或值将导致抛出 [`TypeError`][]。

当使用 [`response.setHeader()`][] 设置了头时，它们将与传递给 [`response.writeHead()`][] 的任何头合并，传递给 [`response.writeHead()`][] 的头具有优先级。

```js
// 返回 content-type = text/plain
const server = http2.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('ok');
});
```

#### `response.setTimeout(msecs[, callback])`

<!-- YAML
added: v8.4.0
-->

* `msecs` {number}
* `callback` {Function}
* 返回：{http2.Http2ServerResponse}

将 [`Http2Stream`][] 的超时值设置为 `msecs`。如果提供了回调，则将其作为监听器添加到响应对象的 `'timeout'` 事件上。

如果没有向请求、响应或服务器添加 `'timeout'` 监听器，则 [`Http2Stream`][] 在超时时会被销毁。如果为请求、响应或服务器的 `'timeout'` 事件分配了处理程序，则必须显式处理超时的 socket。

#### `response.socket`

<!-- YAML
added: v8.4.0
-->

* 类型：{net.Socket|tls.TLSSocket}

返回一个 `Proxy` 对象，其行为像 `net.Socket`（或 `tls.TLSSocket`），但根据 HTTP/2 逻辑应用 getter、setter 和方法。

`destroyed`、`readable` 和 `writable` 属性将从 `response.stream` 检索并设置。

`destroy`、`emit`、`end`、`on` 和 `once` 方法将在 `response.stream` 上调用。

`setTimeout` 方法将在 `response.stream.session` 上调用。

`pause`、`read`、`resume` 和 `write` 将抛出代码为 `ERR_HTTP2_NO_SOCKET_MANIPULATION` 的错误。有关更多信息，请参阅 [`Http2Session` 和 Sockets][]。

所有其他交互将直接路由到 socket。

```mjs
import { createServer } from 'node:http2';
const server = createServer((req, res) => {
  const ip = req.socket.remoteAddress;
  const port = req.socket.remotePort;
  res.end(`Your IP address is ${ip} and your source port is ${port}.`);
}).listen(3000);
```

```cjs
const http2 = require('node:http2');
const server = http2.createServer((req, res) => {
  const ip = req.socket.remoteAddress;
  const port = req.socket.remotePort;
  res.end(`Your IP address is ${ip} and your source port is ${port}.`);
}).listen(3000);
```

#### `response.statusCode`

<!-- YAML
added: v8.4.0
-->

* 类型：{number}

当使用隐式头（未显式调用 [`response.writeHead()`][]）时，此属性控制在头刷新时将发送给客户端的状态码。

```js
response.statusCode = 404;
```

响应头发送给客户端后，此属性指示发出的状态码。

#### `response.statusMessage`

<!-- YAML
added: v8.4.0
-->

* 类型：{string}

HTTP/2 不支持状态消息（RFC 7540 8.1.2.4）。它返回一个空字符串。

#### `response.stream`

<!-- YAML
added: v8.4.0
-->

* 类型：{Http2Stream}

支持响应的 [`Http2Stream`][] 对象。

#### `response.writableEnded`

<!-- YAML
added: v12.9.0
-->

* 类型：{boolean}

在调用 [`response.end()`][] 后为 `true`。此属性不指示数据是否已刷新，为此请使用 [`writable.writableFinished`][]。

#### `response.write(chunk[, encoding][, callback])`

<!-- YAML
added: v8.4.0
-->

* `chunk` {string|Buffer|Uint8Array}
* `encoding` {string}
* `callback` {Function}
* 返回：{boolean}

如果调用了此方法且未调用 [`response.writeHead()`][]，它将切换到隐式头模式并刷新隐式头。

这发送响应主体的一块。可以多次调用此方法来提供主体的连续部分。

在 `node:http` 模块中，当请求是 HEAD 请求时，响应主体被省略。同样，`204` 和 `304` 响应 _不得_ 包含消息主体。

`chunk` 可以是字符串或缓冲区。如果 `chunk` 是字符串，则第二个参数指定如何将其编码为字节流。默认情况下 `encoding` 为 `'utf8'`。当这块数据被刷新时，将调用 `callback`。

这是原始 HTTP 主体，与可能使用的更高级的多部分主体编码无关。

第一次调用 [`response.write()`][] 时，它将缓冲的头信息和第一块主体发送给客户端。第二次调用 [`response.write()`][] 时，Node.js 假设数据将被流式传输，并单独发送新数据。也就是说，响应被缓冲到主体的第一块。

如果整个数据成功刷新到内核缓冲区，则返回 `true`。如果全部或部分数据排队在用户内存中，则返回 `false`。当缓冲区再次空闲时，将发出 `'drain'`。

#### `response.writeContinue()`

<!-- YAML
added: v8.4.0
-->

向客户端发送状态 `100 Continue`，指示应发送请求主体。请参阅 `Http2Server` 和 `Http2SecureServer` 上的 [`'checkContinue'`][] 事件。

#### `response.writeEarlyHints(hints)`

<!-- YAML
added: v18.11.0
-->

* `hints` {Object}

向客户端发送状态 `103 Early Hints` 及 Link 头，指示用户代理可以预加载/预连接链接的资源。`hints` 是一个对象，包含要随早期提示消息发送的头的值。

**示例**

```js
const earlyHintsLink = '</styles.css>; rel=preload; as=style';
response.writeEarlyHints({
  'link': earlyHintsLink,
});

const earlyHintsLinks = [
  '</styles.css>; rel=preload; as=style',
  '</scripts.js>; rel=preload; as=script',
];
response.writeEarlyHints({
  'link': earlyHintsLinks,
});
```

#### `response.writeInformation(statusCode[, headers])`

<!-- YAML
added:
  - v26.2.0
  - v24.18.0
-->

* `statusCode` {number} 一个 HTTP 1xx 信息性状态码，范围为 `100`
  到 `199`（含）之间，不包括 `101`（切换协议），该状态码
  在 HTTP/2 中不允许使用。
* `headers` {Object} 一个可选的响应头对象，用于与
  信息性响应一起发送。

发送一个任意的 HTTP 1xx 信息性响应；在 HTTP/2 中等同于一个
`HEADERS` 帧，其 `:status` 伪头字段为 1xx 状态码。可在
最终响应之前多次调用。最终响应头
发送后，此方法将不执行任何操作并返回 `false`。

这是 [`response.writeContinue()`][] 和
[`response.writeEarlyHints()`][] 的通用等价形式。

```js
response.writeInformation(110, { 'X-Progress': '50%' });
```

#### `response.writeHead(statusCode[, statusMessage][, headers])`

<!-- YAML
added: v8.4.0
changes:
  - version:
     - v11.10.0
     - v10.17.0
    pr-url: https://github.com/nodejs/node/pull/25974
    description: "从 `writeHead()` 返回 `this`，以便与 `end()` 进行链式调用。"
-->

* `statusCode` {number}
* `statusMessage` {string}
* `headers` {HTTP/2 头对象|HTTP/2 原始头}
* 返回：{http2.Http2ServerResponse}

向请求发送响应头。状态码是 3 位 HTTP 状态码，如 `404`。最后一个参数 `headers` 是响应头。

返回对 `Http2ServerResponse` 的引用，以便调用可以链式进行。

为了与 [HTTP/1][] 兼容，可以将人类可读的 `statusMessage` 作为第二个参数传递。但是，因为 `statusMessage` 在 HTTP/2 中没有意义，所以该参数将无效，并且会发出进程警告。

```js
const body = 'hello world';
response.writeHead(200, {
  'Content-Length': Buffer.byteLength(body),
  'Content-Type': 'text/plain; charset=utf-8',
});
```

`Content-Length` 以字节为单位给出，而不是字符。`Buffer.byteLength()` API 可用于确定给定编码中的字节数。在传出消息上，Node.js 不检查 `Content-Length` 与正在传输的主体长度是否相等。但是，在接收消息时，当 `Content-Length` 与实际负载大小不匹配时，Node.js 将自动拒绝消息。

在调用 [`response.end()`][] 之前，此方法在消息上最多只能调用一次。

如果在调用此之前调用了 [`response.write()`][] 或 [`response.end()`][]，则将计算隐式/可变头并调用此函数。

当使用 [`response.setHeader()`][] 设置了头时，它们将与传递给 [`response.writeHead()`][] 的任何头合并，传递给 [`response.writeHead()`][] 的头具有优先级。

```js
// 返回 content-type = text/plain
const server = http2.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('ok');
});
```

尝试设置包含无效字符的头字段名称或值将导致抛出 [`TypeError`][]。

## 收集 HTTP/2 性能指标

[Performance Observer][] API 可用于收集每个 `Http2Session` 和 `Http2Stream` 实例的基本性能指标。

```mjs
import { PerformanceObserver } from 'node:perf_hooks';

const obs = new PerformanceObserver((items) => {
  const entry = items.getEntries()[0];
  console.log(entry.entryType);  // 输出 'http2'
  if (entry.name === 'Http2Session') {
    // 条目包含有关 Http2Session 的统计信息
  } else if (entry.name === 'Http2Stream') {
    // 条目包含有关 Http2Stream 的统计信息
  }
});
obs.observe({ entryTypes: ['http2'] });
```

```cjs
const { PerformanceObserver } = require('node:perf_hooks');

const obs = new PerformanceObserver((items) => {
  const entry = items.getEntries()[0];
  console.log(entry.entryType);  // 输出 'http2'
  if (entry.name === 'Http2Session') {
    // 条目包含有关 Http2Session 的统计信息
  } else if (entry.name === 'Http2Stream') {
    // 条目包含有关 Http2Stream 的统计信息
  }
});
obs.observe({ entryTypes: ['http2'] });
```

`PerformanceEntry` 的 `entryType` 属性将等于 `'http2'`。

`PerformanceEntry` 的 `name` 属性将等于 `'Http2Stream'` 或 `'Http2Session'`。

如果 `name` 等于 `Http2Stream`，则 `PerformanceEntry` 将包含以下附加属性：

* `bytesRead` {number} 为此 `Http2Stream` 接收到的 `DATA` 帧字节数。
* `bytesWritten` {number} 为此 `Http2Stream` 发送的 `DATA` 帧字节数。
* `id` {number} 关联 `Http2Stream` 的标识符
* `timeToFirstByte` {number} `PerformanceEntry` `startTime` 与接收到第一个 `DATA` 帧之间经过的毫秒数。
* `timeToFirstByteSent` {number} `PerformanceEntry` `startTime` 与发送第一个 `DATA` 帧之间经过的毫秒数。
* `timeToFirstHeader` {number} `PerformanceEntry` `startTime` 与接收到第一个头部之间经过的毫秒数。

如果 `name` 等于 `Http2Session`，则 `PerformanceEntry` 将包含以下附加属性：

* `bytesRead` {number} 为此 `Http2Session` 接收到的字节数。
* `bytesWritten` {number} 为此 `Http2Session` 发送的字节数。
* `framesReceived` {number} `Http2Session` 接收到的 HTTP/2 帧数。
* `framesSent` {number} `Http2Session` 发送的 HTTP/2 帧数。
* `maxConcurrentStreams` {number} `Http2Session` 生命周期内并发打开的最大流数。
* `pingRTT` {number} 自发送 `PING` 帧到接收到其确认之间经过的毫秒数。仅当在 `Http2Session` 上发送了 `PING` 帧时才存在。
* `streamAverageDuration` {number} 所有 `Http2Stream` 实例的平均持续时间（毫秒）。
* `streamCount` {number} `Http2Session` 处理的 `Http2Stream` 实例数。
* `type` {string} `'server'` 或 `'client'`，用于标识 `Http2Session` 的类型。

## 关于 `:authority` 和 `host` 的说明

HTTP/2 要求请求具有 `:authority` 伪头部或 `host` 头部。直接构建 HTTP/2 请求时首选 `:authority`，而从 HTTP/1 转换时（例如在代理中）首选 `host`。

如果不存在 `:authority`，兼容性 API 将回退到 `host`。有关更多信息，请参见 [`request.authority`][]。但是，如果不使用兼容性 API（或直接使用 `req.headers`），则需要自己实现任何回退行为。

[ALPN 协议 ID]: https://www.iana.org/assignments/tls-extensiontype-values/tls-extensiontype-values.xhtml#alpn-protocol-ids
[ALPN 协商]: #alpn-negotiation
[兼容性 API]: #compatibility-api
[DEP0202]: deprecations.md#dep0202-http1incomingmessage-and-http1serverresponse-options-of-http2-servers
[HTTP/1]: http.md
[HTTP/2]: https://tools.ietf.org/html/rfc7540
[HTTP/2 头部对象]: #headers-object
[HTTP/2 原始头部]: #raw-headers
[HTTP/2 设置对象]: #settings-object
[HTTP/2 未加密]: https://http2.github.io/faq/#does-http2-require-encryption
[HTTPS]: https.md
[Performance Observer]: perf_hooks.md
[RFC 7838]: https://tools.ietf.org/html/rfc7838
[RFC 8336]: https://tools.ietf.org/html/rfc8336
[RFC 8441]: https://tools.ietf.org/html/rfc8441
[RFC 9113]: https://datatracker.ietf.org/doc/html/rfc9113#section-5.3.1
[敏感头部]: #sensitive-headers
[`'checkContinue'`]: #event-checkcontinue
[`'connect'`]: #event-connect
[`'request'`]: #event-request
[`'unknownProtocol'`]: #event-unknownprotocol
[`ClientHttp2Stream`]: #class-clienthttp2stream
[`Duplex`]: stream.md#class-streamduplex
[`ERR_HTTP2_STREAM_ABORTED`]: errors.md#err_http2_stream_aborted
[`ERR_HTTP2_STREAM_ERROR`]: errors.md#err_http2_stream_error
[`Http2ServerRequest`]: #class-http2http2serverrequest
[`Http2ServerResponse`]: #class-http2http2serverresponse
[`Http2Session` 和 Socket]: #http2session-and-sockets
[`Http2Session` 的 `'stream'` 事件]: #event-stream
[`Http2Stream`]: #class-http2stream
[`ServerHttp2Stream`]: #class-serverhttp2stream
[`TypeError`]: errors.md#class-typeerror
[`http.createServer()`]: http.md#httpcreateserveroptions-requestlistener
[`http2.SecureServer`]: #class-http2secureserver
[`http2.Server`]: #class-http2server
[`http2.createSecureServer()`]: #http2createsecureserveroptions-onrequesthandler
[`http2.createServer()`]: #http2createserveroptions-onrequesthandler
[`http2session.close()`]: #http2sessionclosecallback
[`http2stream.pushStream()`]: #http2streampushstreamheaders-options-callback
[`import()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import
[`net.Server.close()`]: net.md#serverclosecallback
[`net.Socket.bufferSize`]: net.md#socketbuffersize
[`net.Socket.prototype.ref()`]: net.md#socketref
[`net.Socket.prototype.unref()`]: net.md#socketunref
[`net.Socket`]: net.md#class-netsocket
[`net.connect()`]: net.md#netconnect
[`net.createServer()`]: net.md#netcreateserveroptions-connectionlistener
[`request.authority`]: #requestauthority
[`request.maxHeadersCount`]: http.md#requestmaxheaderscount
[`request.socket.getPeerCertificate()`]: tls.md#tlssocketgetpeercertificatedetailed
[`request.socket`]: #requestsocket
[`response.end()`]: #responseenddata-encoding-callback
[`response.setHeader()`]: #responsesetheadername-value
[`response.socket`]: #responsesocket
[`response.writableEnded`]: #responsewritableended
[`response.write()`]: #responsewritechunk-encoding-callback
[`response.write(data, encoding)`]: http.md#responsewritechunk-encoding-callback
[`response.writeContinue()`]: #responsewritecontinue
[`response.writeEarlyHints()`]: #responsewriteearlyhintshints
[`response.writeHead()`]: #responsewriteheadstatuscode-statusmessage-headers
[`server.close()`]: #serverclosecallback
[`server.maxHeadersCount`]: http.md#servermaxheaderscount
[`tls.Server.close()`]: tls.md#serverclosecallback
[`tls.TLSSocket`]: tls.md#class-tlstlssocket
[`tls.connect()`]: tls.md#tlsconnectoptions-callback
[`tls.createServer()`]: tls.md#tlscreateserveroptions-secureconnectionlistener
[`writable.writableFinished`]: stream.md#writablewritablefinished
[错误代码]: #error-codes-for-rst_stream-and-goaway
