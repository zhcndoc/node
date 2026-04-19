# 类: Client

继承自: `undici.Dispatcher`

一个基于单个 TCP/TLS 连接实现的基本 HTTP/1.1 客户端。默认禁用流水线传输。

请求不保证按调用顺序发送。

## `new Client(url[, options])`

参数:

* **url** `URL | string` - 仅应包含 **协议、主机名和端口**。
* **options** `ClientOptions` (可选)

返回值: `Client`

### 参数: `ClientOptions`

* **bodyTimeout** `number | null` (optional) - 默认值: `300e3` - 经过该时间后，请求将超时（以毫秒为单位）。监控在接收 body 数据期间的时间。将其设置为 `0` 可完全禁用。默认是 300 秒。请注意：如果你每次都继续向 socket 写入数据，那么 `timeout` 会被重置。
* **headersTimeout** `number | null` (optional) - 默认值: `300e3` - 当不发送请求时，解析器等待接收完整 HTTP 头所允许的时间（以毫秒为单位）。默认是 300 秒。
* **keepAliveMaxTimeout** `number | null` (optional) - 默认值: `600e3` - 允许的 `keepAliveTimeout` 最大值（以毫秒为单位），当服务器通过 *keep-alive* 提示覆盖时生效。默认是 10 分钟。
* **keepAliveTimeout** `number | null` (optional) - 默认值: `4e3` - 当一个 socket 在没有进行活动请求后超时的时间（以毫秒为单位）。监控已连接 socket 上两次活动之间的时间。该值可能会被服务器的 *keep-alive* 提示覆盖。详情请参见 [MDN: HTTP - Headers - Keep-Alive directives](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Keep-Alive#directives)。默认是 4 秒。
* **keepAliveTimeoutThreshold** `number | null` (optional) - 默认值: `2e3` - 在用服务器的 *keep-alive* 提示覆盖 `keepAliveTimeout` 时，会从中减去这么多毫秒，以考虑例如传输延迟导致的计时不准确。默认是 2 秒。
* **maxHeaderSize** `number | null` (optional) - 默认值: `--max-http-header-size` 或 `16384` - 请求头的最大字节长度。默认使用 Node.js 的 --max-http-header-size 或 16KiB。
* **maxResponseSize** `number | null` (optional) - 默认值: `-1` - 响应 body 的最大字节长度。设置为 `-1` 以禁用。
* **webSocket** `WebSocketOptions` (optional) - WebSocket 专用配置选项。
  * **maxPayloadSize** `number` (optional) - 默认值: `134217728` (128 MB) - WebSocket 消息允许的最大载荷大小（以字节为单位）。应用于未压缩消息、压缩帧载荷以及解压后的（permessage-deflate）消息。设置为 `0` 以禁用该限制。
* **pipelining** `number | null` (optional) - 默认值: `1` - 根据 [RFC7230](https://tools.ietf.org/html/rfc7230#section-6.3.2)，在单个 TCP/TLS 连接上发送的并发请求数量。在启用并发请求前，请仔细考虑你的工作负载与环境，因为如果使用不当，流水线传输可能会降低性能。流水线对网络栈设置也很敏感，并且会因例如长时间运行的请求导致队头阻塞（head of line blocking）。设置为 `0` 可禁用保持连接（keep-alive）。
* **connect** `ConnectOptions | Function | null` (optional) - 默认值: `null`。
* **strictContentLength** `Boolean` (optional) - 默认值: `true` - 是否将请求内容长度不匹配视为错误。如果为 `true`，当请求的 content-length 头与请求 body 的长度不一致时，将抛出错误。**安全警告：** 禁用此选项可能会使你的应用暴露于 HTTP 请求走私（HTTP Request Smuggling）攻击：内容长度不匹配会导致服务器和代理对请求边界的解释不同。这可能导致缓存投毒（cache poisoning）、凭据劫持（credential hijacking）以及绕过安全控制。仅在受控环境中禁用此项，并且你完全信任请求来源。
* **autoSelectFamily**: `boolean` (optional) - 默认值：取决于本地 Node 版本；在 Node 18.13.0 及以上为 `false`。启用一种族自动检测算法，松散地实现了 [RFC 8305](https://tools.ietf.org/html/rfc8305#section-5) 的第 5 节。详情见 [此处](https://nodejs.org/api/net.html#socketconnectoptions-connectlistener)。如果当前 Node 版本不支持，则会忽略该选项。
* **autoSelectFamilyAttemptTimeout**: `number` - 默认值：取决于本地 Node 版本；在 Node 18.13.0 及以上为 `250`。在使用 `autoSelectFamily` 选项时，如果连接尝试尚未完成，等待该时间（以毫秒为单位）后再尝试下一个地址。详情见 [此处](https://nodejs.org/api/net.html#socketconnectoptions-connectlistener)。
* **allowH2**: `boolean` - 默认值: `true`。如果服务器通过 ALPN 协商为 H2 分配了更高的优先级，则启用对 H2 的支持。
* **useH2c**: `boolean` - 默认值: `false`。对非 https 连接强制使用 h2c。
* **maxConcurrentStreams**: `number` - 默认值: `100`。决定单个 H2 会话的最大并发流数量。它可以被 SETTINGS 远程帧覆盖。
* **initialWindowSize**: `number` (optional) - 默认值: `262144` (256KB)。设置 HTTP/2 流级别的流量控制窗口大小（SETTINGS_INITIAL_WINDOW_SIZE）。必须是大于 0 的正整数。此默认值高于 Node.js 核心默认值（65535 字节），以提升在当前高带宽网络中的吞吐量；Node 的选择非常保守。详情见 [RFC 7540 第 6.9.2 节](https://datatracker.ietf.org/doc/html/rfc7540#section-6.9.2)。
* **connectionWindowSize**: `number` (optional) - 默认值: `524288` (512KB)。使用 `ClientHttp2Session.setLocalWindowSize()` 设置 HTTP/2 连接级别的流量控制窗口大小。必须是大于 0 的正整数。该设置可在多个流之间为整个连接提供更好的流量控制。详情见 [Node.js HTTP/2 文档](https://nodejs.org/api/http2.html#clienthttp2sessionsetlocalwindowsize)。
* **pingInterval**: `number` - 默认值: `60e3`。向服务器发送 PING 帧的时间间隔（以毫秒为单位）。设置为 `0` 可禁用 PING 帧。仅适用于 HTTP/2 连接。客户端会在发送 PING 的持续时间（以毫秒为单位）作为参数触发 `ping` 事件。

> **关于 HTTP/2 的注意事项**
> - 它仅在 TLS 连接下工作。不支持 h2c。
> - 服务器必须支持 HTTP/2 并在 ALPN 协商中将其选为协议。
>   - 服务器不得比 HTTP/2 对 HTTP/1.1 给予更高的优先级。
> - pseudo headers 会自动附加到请求中。如果你尝试设置它们，它们将被覆盖。
>   - `:path` 头会自动设置为请求路径。
>   - `:method` 头会自动设置为请求方法。
>   - `:scheme` 头会自动设置为请求方案。
>   - `:authority` 头会自动设置为请求的 `host[:port]`。
> - 目前尚不支持 `PUSH` 帧。

#### 参数: `ConnectOptions`

每个 Tls 选项，请参见 [此处](https://nodejs.org/api/tls.html#tls_tls_connect_options_callback)。此外，还可以传递以下选项：

* **socketPath** `string | null` (可选) - 默认值: `null` - IPC 端点，可以是 Unix 域套接字或 Windows 命名管道。
* **maxCachedSessions** `number | null` (可选) - 默认值: `100` - TLS 缓存会话的最大数量。使用 `0` 可禁用 TLS session 缓存。默认值: 100。
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

这将允许你对下一个请求使用的 socket 执行一些额外的检查。

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
  console.log(`Connected to ${origin}`) // 应在请求 body 语句之前输出
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
