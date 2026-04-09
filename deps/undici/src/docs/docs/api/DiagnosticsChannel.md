# Diagnostics Channel Support

Stability: Experimental.

Undici 支持 [`diagnostics_channel`](https://nodejs.org/api/diagnostics_channel.html)（目前仅在 Node.js v16+ 上可用）。
这是对 Undici 进行插桩并获取内部信息的推荐方式。

可用的通道如下。

## `undici:request:create`

当创建新的出站请求时发布此消息。

```js
import diagnosticsChannel from 'diagnostics_channel'

diagnosticsChannel.channel('undici:request:create').subscribe(({ request }) => {
  console.log('origin', request.origin)
  console.log('completed', request.completed)
  console.log('method', request.method)
  console.log('path', request.path)
  console.log('headers', request.headers) // 字符串数组，例如：['foo', 'bar']
  request.addHeader('hello', 'world')
  console.log('headers', request.headers) // 例如：['foo', 'bar', 'hello', 'world']
})
```

注意：请求仅松散地与给定套接字完成。

## `undici:request:bodyChunkSent`

当请求正文的块正在发送时发布此消息。

```js
import diagnosticsChannel from 'diagnostics_channel'

diagnosticsChannel.channel('undici:request:bodyChunkSent').subscribe(({ request, chunk }) => {
  // request 与 undici:request:create 中的对象相同
})
```

## `undici:request:bodySent`

在请求正文完全发送后发布此消息。

```js
import diagnosticsChannel from 'diagnostics_channel'

diagnosticsChannel.channel('undici:request:bodySent').subscribe(({ request }) => {
  // request 与 undici:request:create 中的对象相同
})
```

## `undici:request:headers`

在收到响应头后发布此消息。

```js
import diagnosticsChannel from 'diagnostics_channel'

diagnosticsChannel.channel('undici:request:headers').subscribe(({ request, response }) => {
  // request 与 undici:request:create 中的对象相同
  console.log('statusCode', response.statusCode)
  console.log(response.statusText)
  // response.headers 是缓冲区。
  console.log(response.headers.map((x) => x.toString()))
})
```

## `undici:request:bodyChunkReceived`

在接收到响应正文的块后发布此消息。

```js
import diagnosticsChannel from 'diagnostics_channel'

diagnosticsChannel.channel('undici:request:bodyChunkReceived').subscribe(({ request, chunk }) => {
  // request 与 undici:request:create 中的对象相同
})
```

## `undici:request:trailers`

在收到响应正文和尾部信息后发布此消息，即响应已完成。

```js
import diagnosticsChannel from 'diagnostics_channel'

diagnosticsChannel.channel('undici:request:trailers').subscribe(({ request, trailers }) => {
  // request 与 undici:request:create 中的对象相同
  console.log('completed', request.completed)
  // trailers 是缓冲区。
  console.log(trailers.map((x) => x.toString()))
})
```

## `undici:request:error`

如果请求将出错但尚未出错，则发布此消息。

```js
import diagnosticsChannel from 'diagnostics_channel'

diagnosticsChannel.channel('undici:request:error').subscribe(({ request, error }) => {
  // request 与 undici:request:create 中的对象相同
})
```

## `undici:client:sendHeaders`

在第一个请求字节写入套接字之前立即发布此消息。

*注意*：它将发布将以原始格式发送到服务器的确切标头。

```js
import diagnosticsChannel from 'diagnostics_channel'

diagnosticsChannel.channel('undici:client:sendHeaders').subscribe(({ request, headers, socket }) => {
  // request 与 undici:request:create 中的对象相同
  console.log(`完整标头列表 ${headers.split('\r\n')}`);
})
```

## `undici:client:beforeConnect`

在任何请求创建新连接之前发布此消息。
您不能假定此事件与任何特定请求相关。

```js
import diagnosticsChannel from 'diagnostics_channel'

diagnosticsChannel.channel('undici:client:beforeConnect').subscribe(({ connectParams, connector }) => {
  // const { host, hostname, protocol, port, servername, version } = connectParams
  // connector 是创建套接字的函数
})
```

## `undici:client:connected`

在连接建立后发布此消息。

```js
import diagnosticsChannel from 'diagnostics_channel'

diagnosticsChannel.channel('undici:client:connected').subscribe(({ socket, connectParams, connector }) => {
  // const { host, hostname, protocol, port, servername, version } = connectParams
 // connector 是创建套接字的函数
})
```

## `undici:client:connectError`

如果未能成功创建新连接，则发布此消息。

```js
import diagnosticsChannel from 'diagnostics_channel'

diagnosticsChannel.channel('undici:client:connectError').subscribe(({ error, socket, connectParams, connector }) => {
  // const { host, hostname, protocol, port, servername, version } = connectParams
  // connector 是创建套接字的函数
  console.log(`连接失败，错误：${error.message}`)
})
```

## `undici:websocket:open`

在客户端成功连接到服务器后发布此消息。

```js
import diagnosticsChannel from 'diagnostics_channel'

diagnosticsChannel.channel('undici:websocket:open').subscribe(({ 
  address,           // { address: string, family: string, port: number }
  protocol,          // string - 协商的子协议
  extensions,        // string - 协商的扩展
  websocket,         // WebSocket - WebSocket 实例
  handshakeResponse  // object - 升级连接的 HTTP 响应
}) => {
  console.log(address) // 地址、family 和端口
  console.log(protocol) // 协商的子协议
  console.log(extensions) // 协商的扩展
  console.log(websocket) // WebSocket 实例
  
  // 握手响应详情
  console.log(handshakeResponse.status) // HTTP/1.1 为 101，HTTP/2 extended CONNECT 为 200
  console.log(handshakeResponse.statusText) // HTTP/1.1 为 'Switching Protocols'，Node.js 中 HTTP/2 通常为 'OK'
  console.log(handshakeResponse.headers) // 包含响应头的对象
})
```

### 握手响应对象

`handshakeResponse` 对象包含建立 WebSocket 连接的 HTTP 响应：

- `status` (number): HTTP 状态码（HTTP/1.1 升级时为 `101`，HTTP/2 extended CONNECT 时为 `200`）
- `statusText` (string): HTTP 状态消息（HTTP/1.1 为 `'Switching Protocols'`，Node.js 中 HTTP/2 通常为 `'OK'`）
- `headers` (object): 来自服务器的 HTTP 响应头，包括：
  - `sec-websocket-accept` 和其他 WebSocket 相关头
  - `upgrade: 'websocket'`
  - `connection: 'upgrade'`

  `upgrade` 和 `connection` 头仅存在于 HTTP/1.1 握手时。

此信息对于调试和监控 WebSocket 连接特别有用，因为它提供了访问建立 WebSocket 连接的初始 HTTP 握手响应的信息。

## `undici:websocket:close`

在连接关闭后发布此消息。

```js
import diagnosticsChannel from 'diagnostics_channel'

diagnosticsChannel.channel('undici:websocket:close').subscribe(({ websocket, code, reason }) => {
  console.log(websocket) // WebSocket 实例
  console.log(code) // 关闭状态码
  console.log(reason) // 关闭原因
})
```

## `undici:websocket:socket_error`

如果套接字遇到错误，则发布此消息。

```js
import diagnosticsChannel from 'diagnostics_channel'

diagnosticsChannel.channel('undici:websocket:socket_error').subscribe((error) => {
  console.log(error)
})
```

## `undici:websocket:ping`

如果连接未关闭，则在客户端收到 ping 帧后发布此消息。

```js
import diagnosticsChannel from 'diagnostics_channel'

diagnosticsChannel.channel('undici:websocket:ping').subscribe(({ payload, websocket }) => {
  // Buffer 或 undefined，包含帧的可选应用程序数据
  console.log(payload)
  console.log(websocket) // WebSocket 实例
})
```

## `undici:websocket:pong`

在客户端收到 pong 帧后发布此消息。

```js
import diagnosticsChannel from 'diagnostics_channel'

diagnosticsChannel.channel('undici:websocket:pong').subscribe(({ payload, websocket }) => {
  // Buffer 或 undefined，包含帧的可选应用程序数据
  console.log(payload)
  console.log(websocket) // WebSocket 实例
})
```

## `undici:proxy:connected`

在 `ProxyAgent` 建立到代理服务器的连接后发布此消息。

```js
import diagnosticsChannel from 'diagnostics_channel'

diagnosticsChannel.channel('undici:proxy:connected').subscribe(({ socket, connectParams }) => {
  console.log(socket)
  console.log(connectParams)
  // const { origin, port, path, signal, headers, servername } = connectParams
})
```

## `undici:request:pending-requests`

当去重拦截器的待处理请求映射发生变化时发布此消息。这对于监控和调试请求去重行为很有用。

去重拦截器会自动去重对同一资源的并发请求。当多个相同的请求在其中一个已在进行中时发出，只有一个请求会发送到源服务器，所有等待的处理程序都会收到相同的响应。

```js
import diagnosticsChannel from 'diagnostics_channel'

diagnosticsChannel.channel('undici:request:pending-requests').subscribe(({ type, size, key }) => {
  console.log(type)  // 'added' 或 'removed'
  console.log(size)  // 更改后的当前待处理请求数
  console.log(key)   // 此请求的去重键
})
```

### 事件属性

- `type` (`string`): 当注册新的待处理请求时为 `'added'`，当待处理请求完成（成功或出错）时为 `'removed'`。
- `size` (`number`): 更改后的当前待处理请求数。
- `key` (`string`): 请求的去重键，由源、方法、路径和请求头组成。

### 示例：监控请求去重

```js
import diagnosticsChannel from 'diagnostics_channel'

const channel = diagnosticsChannel.channel('undici:request:pending-requests')

channel.subscribe(({ type, size, key }) => {
  if (type === 'added') {
    console.log(`新的待处理请求：${key}（共 ${size} 个待处理）`)
  } else {
    console.log(`请求完成：${key}（剩余 ${size} 个）`)
  }
})
```

这在以下方面可能很有用：
- 验证请求去重是否按预期工作
- 监控并发进行中的请求数量
- 在生产环境中调试去重行为
