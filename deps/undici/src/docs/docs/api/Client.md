# 类: Client

继承自: `undici.Dispatcher`

一个基本的 HTTP/1.1 客户端，基于单个 TCP/TLS 连接实现。默认禁用流水线传输。

请求不保证按调用顺序发送。

## `new Client(url[, options])`

参数:

* **url** `URL | string` - 仅应包含 **协议、主机名和端口**。
* **options** `ClientOptions` (可选)

返回值: `Client`

### 参数: `ClientOptions`

* **bodyTimeout** `number | null` (可选) - 默认值: `300e3` - 请求在多少毫秒后超时，用于监控接收 body 数据的时间间隔。使用 `0` 可完全禁用此功能。默认为 300 秒。请注意，如果您每次向套接字写入数据时都会重置 `timeout`。
* **headersTimeout** `number | null` (可选) - 默认值: `300e3` - 在发送请求前，解析器等待接收完整 HTTP headers 的时间（以毫秒为单位）。默认为 300 秒。
* **keepAliveMaxTimeout** `number | null` (可选) - 默认值: `600e3` - 当服务器通过 *keep-alive* hints 覆盖时，允许的最大 `keepAliveTimeout`（以毫秒为单位）。默认为 10 分钟。
* **keepAliveTimeout** `number | null` (可选) - 默认值: `4e3` - 在没有活跃请求的 socket 上，经过多少毫秒后将会超时。用于监控已连接 socket 上的活动时间间隔。此值可能会被服务器发出的 *keep-alive* hints 覆盖。有关更多详细信息，请参见 [MDN: HTTP - Headers - Keep-Alive directives](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Keep-Alive#directives)。默认为 4 秒。
* **keepAliveTimeoutThreshold** `number | null` (可选) - 默认值: `2e3` - 从服务器 *keep-alive* hints 中减去的时间（以毫秒为单位），用于调整 `keepAliveTimeout`，以应对例如传输延迟等引起的时间精度问题。默认为 2 秒。
* **maxHeaderSize** `number | null` (可选) - 默认值: `--max-http-header-size` 或 `16384` - 请求 headers 的最大长度（以字节为单位）。默认为 Node.js 的 `--max-http-header-size` 或 16KiB。
* **maxResponseSize** `number | null` (可选) - 默认值: `-1` - 响应 body 的最大长度（以字节为单位）。设置为 `-1` 表示禁用。
* **pipelining** `number | null` (可选) - 默认值: `1` - 根据 [RFC7230](https://tools.ietf.org/html/rfc7230#section-6.3.2)，在单个 TCP/TLS 连接上发送的并发请求数量。在启用并发请求之前，请仔细考虑您的工作负载和环境，因为如果错误地使用流水线传输可能会降低性能。流水线传输对网络堆栈设置以及例如长时间运行的请求引起的队头阻塞也很敏感。设置为 `0` 将禁用 keep-alive 连接。
* **connect** `ConnectOptions | Function | null` (可选) - 默认值: `null`。
* **strictContentLength** `Boolean` (可选) - 默认值: `true` - 是否将请求内容长度不匹配视为错误。如果为 true，则当请求 content-length header 与请求 body 的长度不匹配时，会抛出错误。**安全警告:** 禁用此选项可能会使您的应用程序暴露在 HTTP Request Smuggling 攻击之下，其中不匹配的 content-length headers 会导致服务器和代理以不同的方式解释请求边界。这可能导致缓存中毒、凭据劫持以及绕过安全控制。仅在您完全信任请求来源的受控环境中才应禁用此选项。
* **autoSelectFamily**: `boolean` (可选) - 默认值: 取决于本地 Node 版本，在 Node 18.13.0 及以上版本中默认为 `false`。启用一个松散实现 [RFC 8305](https://tools.ietf.org/html/rfc8305#section-5) 第 5 节的 family 自动检测算法。有关更多详细信息，请参见 [此处](https://nodejs.org/api/net.html#socketconnectoptions-connectlistener)。如果当前 Node 版本不支持此选项，则该选项将被忽略。
* **autoSelectFamilyAttemptTimeout**: `number` - 默认值: 取决于本地 Node 版本，在 Node 18.13.0 及以上版本中默认为 `250`。在使用 `autoSelectFamily` 选项时，尝试连接到下一个地址之前等待连接尝试完成的时间（以毫秒为单位）。有关更多详细信息，请参见 [此处](https://nodejs.org/api/net.html#socketconnectoptions-connectlistener)。
* **allowH2**: `boolean` - 默认值: `true`。如果服务器通过 ALPN 协商为其分配了更高的优先级，则启用 H2 支持。
* **useH2c**: `boolean` - 默认值: `false`。强制非 https 连接使用 h2c。
* **maxConcurrentStreams**: `number` - 默认值: `100`。规定单个 H2 session 的最大并发流数。它可以被 SETTINGS remote frame 覆盖。
* **initialWindowSize**: `number` (可选) - 默认值: `262144` (256KB)。设置 HTTP/2 stream-level flow-control window size (SETTINGS_INITIAL_WINDOW_SIZE)。必须是一个大于 0 的正整数。此默认值高于 Node.js core 的默认值 (65535 bytes)，以提高吞吐量，Node 的选择对于当前高带宽网络来说非常保守。有关更多详细信息，请参见 [RFC 7540 Section 6.9.2](https://datatracker.ietf.org/doc/html/rfc7540#section-6.9.2)。
* **connectionWindowSize**: `number` (可选) - 默认值: `524288` (512KB)。使用 `ClientHttp2Session.setLocalWindowSize()` 设置 HTTP/2 connection-level flow-control window size。必须是一个大于 0 的正整数。这为整个连接提供了更好的跨多个流的流量控制。有关更多详细信息，请参见 [Node.js HTTP/2 documentation](https://nodejs.org/api/http2.html#clienthttp2sessionsetlocalwindowsize)。
* **pingInterval**: `number` - 默认值: `60e3`。向服务器发送 PING frames 的时间间隔（以毫秒为单位）。设置为 `0` 将禁用 PING frames。这只适用于 HTTP/2 连接。这将在客户端上发出带有 ping 持续时间（以毫秒为单位）的 `ping` 事件。

> **关于 HTTP/2 的注意事项**
> - 它仅在 TLS 连接下工作。不支持 h2c。
> - 服务器必须支持 HTTP/2 并在 ALPN 协商中选择它作为协议。
>   - 服务器不得比 HTTP/2 对 HTTP/1.1 有更高的优先级。
> - pseudo headers 会自动附加到请求中。如果您尝试设置它们，它们将被覆盖。
>   - `:path` header 会自动设置为请求路径。
>   - `:method` header 会自动设置为请求方法。
>   - `:scheme` header 会自动设置为请求方案。
>   - `:authority` header 会自动设置为请求 `host[:port]`。
> - `PUSH` frames 目前尚未支持。

#### 参数: `ConnectOptions`

每个 Tls option，请参见 [此处](https://nodejs.org/api/tls.html#tls_tls_connect_options_callback)。此外，还可以传递以下选项：

* **socketPath** `string | null` (可选) - 默认值: `null` - IPC endpoint，可以是 Unix domain socket 或 Windows named pipe。
* **maxCachedSessions** `number | null` (可选) - 默认值: `100` - TLS 缓存会话的最大数量。使用 0 可禁用 TLS session caching。默认值: 100。
* **timeout** `number | null` (可选) - 以毫秒为单位，默认值 `10e3`。
* **servername** `string | null` (可选)
* **keepAlive** `boolean | null` (可选) - 默认值: `true` - 启用 TCP keep-alive
* **keepAliveInitialDelay** `number | null` (可选) - 默认值: `60000` - socket 的 TCP keep-alive 间隔（以毫秒为单位）

### 示例 - 基本 Client 实例化

这将实例化 undici Client，但直到有东西排队时才会连接到源。考虑使用 `client.connect` 提前连接到源，或者直接调用 `client.request`。

```js
'use strict'
import { Client } from 'undici'

const client = new Client('http://localhost:3000')
```

### 示例 - 自定义连接器

这将允许您对下一个请求使用的 socket 执行一些额外的检查。

```js
'use strict'
import { Client, buildConnector } from 'undici'

const connector = buildConnector({ rejectUnauthorized: false })
const client = new Client('https://localhost:3000', {
  connect (opts, cb) {
    connector(opts, (err, socket) => {
      if (err) {
        cb(err)
      } else if (/* assertion */) {
        socket.destroy()
        cb(new Error('kaboom'))
      } else {
        cb(null, socket)
      }
    })
  }
})
```

## 实例方法

### `Client.close([callback])`

实现了 [`Dispatcher.close([callback])`](/docs/docs/api/Dispatcher.md#dispatcherclosecallback-promise)。

### `Client.destroy([error, callback])`

实现了 [`Dispatcher.destroy([error, callback])`](/docs/docs/api/Dispatcher.md#dispatcherdestroyerror-callback-promise)。

在 socket 关闭后调用回调函数（如果没有提供回调函数，则返回一个 promise）。

### `Client.connect(options[, callback])`

参见 [`Dispatcher.connect(options[, callback])`](/docs/docs/api/Dispatcher.md#dispatcherconnectoptions-callback)。

### `Client.dispatch(options, handlers)`

实现了 [`Dispatcher.dispatch(options, handlers)`](/docs/docs/api/Dispatcher.md#dispatcherdispatchoptions-handler)。

### `Client.pipeline(options, handler)`

参见 [`Dispatcher.pipeline(options, handler)`](/docs/docs/api/Dispatcher.md#dispatcherpipelineoptions-handler)。

### `Client.request(options[, callback])`

参见 [`Dispatcher.request(options [, callback])`](/docs/docs/api/Dispatcher.md#dispatcherrequestoptions-callback)。

### `Client.stream(options, factory[, callback])`

参见 [`Dispatcher.stream(options, factory[, callback])`](/docs/docs/api/Dispatcher.md#dispatcherstreamoptions-factory-callback)。

### `Client.upgrade(options[, callback])`

参见 [`Dispatcher.upgrade(options[, callback])`](/docs/docs/api/Dispatcher.md#dispatcherupgradeoptions-callback)。

## 实例属性

### `Client.closed`

* `boolean`

在调用 `client.close()` 后为 `true`。

### `Client.destroyed`

* `boolean`

在调用 `client.destroyed()` 后或调用 `client.close()` 并完成客户端关闭后为 `true`。

### `Client.pipelining`

* `number`

获取和设置流水线因子的属性。

## 实例事件

### 事件：`'connect'`

参见 [调度器事件：`'connect'`](/docs/docs/api/Dispatcher.md#event-connect)。

参数：

* **origin** `URL`
* **targets** `Array<Dispatcher>`

当套接字已创建并连接时触发。如果 `client.size > 0`，客户端将连接一次。

#### 示例 - 客户端连接事件

```js
import { createServer } from 'http'
import { Client } from 'undici'
import { once } from 'events'

const server = createServer((request, response) => {
  response.end('Hello, World!')
}).listen()

await once(server, 'listening')

const client = new Client(`http://localhost:${server.address().port}`)

client.on('connect', (origin) => {
  console.log(`Connected to ${origin}`) // should print before the request body statement
})

try {
  const { body } = await client.request({
    path: '/',
    method: 'GET'
  })
  body.setEncoding('utf-8')
  body.on('data', console.log)
  client.close()
  server.close()
} catch (error) {
  console.error(error)
  client.close()
  server.close()
}
```

### 事件：`'disconnect'`

参见 [调度器事件：`'disconnect'`](/docs/docs/api/Dispatcher.md#event-disconnect)。

参数：

* **origin** `URL`
* **targets** `Array<Dispatcher>`
* **error** `Error`

当套接字断开连接时触发。事件的 error 参数是导致套接字断开的错误。如果或一旦 `client.size > 0`，客户端将重新连接。

#### 示例 - 客户端断开连接事件

```js
import { createServer } from 'http'
import { Client } from 'undici'
import { once } from 'events'

const server = createServer((request, response) => {
  response.destroy()
}).listen()

await once(server, 'listening')

const client = new Client(`http://localhost:${server.address().port}`)

client.on('disconnect', (origin) => {
  console.log(`Disconnected from ${origin}`)
})

try {
  await client.request({
    path: '/',
    method: 'GET'
  })
} catch (error) {
  console.error(error.message)
  client.close()
  server.close()
}
```

### 事件：`'drain'`

当管道不再繁忙时触发。

参见 [调度器事件：`'drain'`](/docs/docs/api/Dispatcher.md#event-drain)。

#### 示例 - 客户端 drain 事件

```js
import { createServer } from 'http'
import { Client } from 'undici'
import { once } from 'events'

const server = createServer((request, response) => {
  response.end('Hello, World!')
}).listen()

await once(server, 'listening')

const client = new Client(`http://localhost:${server.address().port}`)

client.on('drain', () => {
  console.log('drain event')
  client.close()
  server.close()
})

const requests = [
  client.request({ path: '/', method: 'GET' }),
  client.request({ path: '/', method: 'GET' }),
  client.request({ path: '/', method: 'GET' })
]

await Promise.all(requests)

console.log('requests completed')
```

### 事件：`'error'`

用于用户错误，例如在 `onResponseError` 处理程序中抛出异常时调用。
