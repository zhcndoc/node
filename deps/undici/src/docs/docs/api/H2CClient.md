# 类: H2CClient

继承自: `undici.Dispatcher`

一个基本的 H2C 客户端。

**示例**

```js
const { createServer } = require('node:http2')
const { once } = require('node:events')
const { H2CClient } = require('undici')

const server = createServer((req, res) => {
  res.writeHead(200)
  res.end('Hello, world!')
})

server.listen()
once(server, 'listening').then(() => {
  const client = new H2CClient(`http://localhost:${server.address().port}/`)

  const response = await client.request({ path: '/', method: 'GET' })
  console.log(response.statusCode) // 200
  response.body.text.then((text) => {
    console.log(text) // Hello, world!
  })
})
```

## `new H2CClient(url[, options])`

参数:

- **url** `URL | string` - 应仅包含**协议、主机名和端口**。仅支持 `http` 协议。
- **options** `H2CClientOptions` (可选)

返回值: `H2CClient`

### 参数: `H2CClientOptions`

- **bodyTimeout** `number | null` (可选) - 默认值: `300e3` - 请求在多少毫秒后超时，以接收 body 数据的时间为准。使用 `0` 可完全禁用此功能。默认为 300 秒。请注意，如果您每次向 socket 写入数据时都会重置 `timeout`。
- **headersTimeout** `number | null` (可选) - 解析器在发送请求前等待接收完整 HTTP headers 的时间（毫秒）。默认为 300 秒。
- **keepAliveMaxTimeout** `number | null` (可选) - 默认值: `600e3` - 当服务器 _keep-alive_ hints 覆盖时，允许的最大 `keepAliveTimeout`（毫秒）。默认为 10 分钟。
- **keepAliveTimeout** `number | null` (可选) - 默认值: `4e3` - 无活动请求的 socket 在多少毫秒后超时的值。监控连接 socket 上的活动时间。此值可能会被服务器的 _keep-alive_ hints 覆盖。有关更多详细信息，请参阅 [MDN: HTTP - Headers - Keep-Alive directives](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Keep-Alive#directives)。默认为 4 秒。
- **keepAliveTimeoutThreshold** `number | null` (可选) - 默认值: `2e3` - 从服务器 _keep-alive_ hints 中减去的时间（毫秒），用于补偿由例如传输延迟引起的计时不准确。默认为 2 秒。
- **maxHeaderSize** `number | null` (可选) - 默认值: `--max-http-header-size` 或 `16384` - 请求 headers 的最大长度（字节）。默认为 Node.js 的 --max-http-header-size 或 16KiB。
- **maxResponseSize** `number | null` (可选) - 默认值: `-1` - 响应 body 的最大长度（字节）。设置为 `-1` 表示禁用。
- **maxConcurrentStreams**: `number` - 默认值: `100`。规定单个 H2 会话的最大并发流数。可由 SETTINGS remote frame 覆盖。
- **pipelining** `number | null` (可选) - 默认值为 `maxConcurrentStreams` - 根据 [RFC-7540](https://httpwg.org/specs/rfc7540.html#StreamsLayer) Stream 规范，单个 HTTP/2 会话上发送的并发请求数量。远程服务器可随时关闭流。
- **pingInterval**: `number` - 默认值: `60e3`。向服务器发送 PING frames 的时间间隔（毫秒）。设置为 `0` 可禁用 PING frames。仅适用于 HTTP/2 连接。
- **connect** `ConnectOptions | null` (可选) - 默认值: `null`。
- **strictContentLength** `Boolean` (可选) - 默认值: `true` - 是否将请求 content length 不匹配视为错误。如果为 true，当请求 content-length header 与请求 body 的长度不匹配时，会抛出错误。**安全警告:** 禁用此选项可能会使您的应用程序暴露于 HTTP Request Smuggling 攻击之下，其中不匹配的 content-length headers 会导致服务器和代理对请求边界进行不同的解释。这可能导致缓存中毒、凭据劫持以及绕过安全控制。仅在您完全信任请求来源的受控环境中才应禁用此选项。
- **autoSelectFamily**: `boolean` (可选) - 默认值取决于本地 Node 版本，在 Node 18.13.0 及以上版本中默认为 `false`。启用一个松散实现 [RFC 8305](https://tools.ietf.org/html/rfc8305#section-5) 第 5 节的 family 自动检测算法。有关更多详细信息，请参见 [此处](https://nodejs.org/api/net.html#socketconnectoptions-connectlistener)。如果当前 Node 版本不支持，则忽略此选项。
- **autoSelectFamilyAttemptTimeout**: `number` - 默认值取决于本地 Node 版本，在 Node 18.13.0 及以上版本中默认为 `250`。当使用 `autoSelectFamily` 选项时，尝试下一个地址前等待连接尝试完成的时间（毫秒）。有关更多详细信息，请参见 [此处](https://nodejs.org/api/net.html#socketconnectoptions-connectlistener)。

#### 参数: `H2CConnectOptions`

- **socketPath** `string | null` (可选) - 默认值: `null` - IPC 端点，可以是 Unix domain socket 或 Windows named pipe。
- **timeout** `number | null` (可选) - 毫秒为单位，默认值 `10e3`。
- **servername** `string | null` (可选)
- **keepAlive** `boolean | null` (可选) - 默认值: `true` - 启用 TCP keep-alive
- **keepAliveInitialDelay** `number | null` (可选) - 默认值: `60000` - socket 的 TCP keep-alive 间隔（毫秒）

### 示例 - 基本客户端实例化

这将实例化 undici H2CClient，但直到有任务排队时才会连接到源。考虑使用 `client.connect` 提前连接到源，或者直接调用 `client.request`。

```js
"use strict";
import { H2CClient } from "undici";

const client = new H2CClient("http://localhost:3000");
```

## 实例方法

### `H2CClient.close([callback])`

实现 [`Dispatcher.close([callback])`](/docs/docs/api/Dispatcher.md#dispatcherclosecallback-promise)。

### `H2CClient.destroy([error, callback])`

实现 [`Dispatcher.destroy([error, callback])`](/docs/docs/api/Dispatcher.md#dispatcherdestroyerror-callback-promise)。

在 socket 关闭后调用回调（如果没有提供回调，则返回一个 promise）。

### `H2CClient.connect(options[, callback])`

参见 [`Dispatcher.connect(options[, callback])`](/docs/docs/api/Dispatcher.md#dispatcherconnectoptions-callback)。

### `H2CClient.dispatch(options, handlers)`

实现 [`Dispatcher.dispatch(options, handlers)`](/docs/docs/api/Dispatcher.md#dispatcherdispatchoptions-handler)。

### `H2CClient.pipeline(options, handler)`

参见 [`Dispatcher.pipeline(options, handler)`](/docs/docs/api/Dispatcher.md#dispatcherpipelineoptions-handler)。

### `H2CClient.request(options[, callback])`

参见 [`Dispatcher.request(options [, callback])`](/docs/docs/api/Dispatcher.md#dispatcherrequestoptions-callback)。

### `H2CClient.stream(options, factory[, callback])`

参见 [`Dispatcher.stream(options, factory[, callback])`](/docs/docs/api/Dispatcher.md#dispatcherstreamoptions-factory-callback)。

### `H2CClient.upgrade(options[, callback])`

参见 [`Dispatcher.upgrade(options[, callback])`](/docs/docs/api/Dispatcher.md#dispatcherupgradeoptions-callback)。

## 实例属性

### `H2CClient.closed`

- `boolean`

在调用 `H2CClient.close()` 后为 `true`。

### `H2CClient.destroyed`

- `boolean`

在调用 `client.destroyed()` 或 `client.close()` 且客户端关闭完成后为 `true`。

### `H2CClient.pipelining`

- `number`

获取和设置管道因子的属性。

## 实例事件

### 事件: `'connect'`

参见 [Dispatcher 事件: `'connect'`](/docs/docs/api/Dispatcher.md#event-connect)。

参数:

- **origin** `URL`
- **targets** `Array<Dispatcher>`

当 socket 已创建并连接时触发。客户端将在 `client.size > 0` 时连接一次。

#### 示例 - 客户端连接事件

```js
import { createServer } from "node:http2";
import { H2CClient } from "undici";
import { once } from "events";

const server = createServer((request, response) => {
  response.end("Hello, World!");
}).listen();

await once(server, "listening");

const client = new H2CClient(`http://localhost:${server.address().port}`);

client.on("connect", (origin) => {
  console.log(`Connected to ${origin}`); // should print before the request body statement
});

try {
  const { body } = await client.request({
    path: "/",
    method: "GET",
  });
  body.setEncoding("utf-8");
  body.on("data", console.log);
  client.close();
  server.close();
} catch (error) {
  console.error(error);
  client.close();
  server.close();
}
```

### 事件: `'disconnect'`

参见 [Dispatcher 事件: `'disconnect'`](/docs/docs/api/Dispatcher.md#event-disconnect)。

参数:

- **origin** `URL`
- **targets** `Array<Dispatcher>`
- **error** `Error`

当 socket 断开连接时触发。事件的 error 参数是导致 socket 断开的错误。如果 `client.size > 0`，客户端将重新连接。

#### 示例 - 客户端断开连接事件

```js
import { createServer } from "node:http2";
import { H2CClient } from "undici";
import { once } from "events";

const server = createServer((request, response) => {
  response.destroy();
}).listen();

await once(server, "listening");

const client = new H2CClient(`http://localhost:${server.address().port}`);

client.on("disconnect", (origin) => {
  console.log(`Disconnected from ${origin}`);
});

try {
  await client.request({
    path: "/",
    method: "GET",
  });
} catch (error) {
  console.error(error.message);
  client.close();
  server.close();
}
```

### 事件: `'drain'`

当 pipeline 不再繁忙时触发。

参见 [Dispatcher 事件: `'drain'`](/docs/docs/api/Dispatcher.md#event-drain)。

#### 示例 - 客户端 drain 事件

```js
import { createServer } from "node:http2";
import { H2CClient } from "undici";
import { once } from "events";

const server = createServer((request, response) => {
  response.end("Hello, World!");
}).listen();

await once(server, "listening");

const client = new H2CClient(`http://localhost:${server.address().port}`);

client.on("drain", () => {
  console.log("drain event");
  client.close();
  server.close();
});

const requests = [
  client.request({ path: "/", method: "GET" }),
  client.request({ path: "/", method: "GET" }),
  client.request({ path: "/", method: "GET" }),
];

await Promise.all(requests);

console.log("requests completed");
```

### 事件: `'error'`

为用户错误（例如在 `onResponseError` handler 中抛出异常）调用。
