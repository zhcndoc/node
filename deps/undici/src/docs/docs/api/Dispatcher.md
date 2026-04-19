# Dispatcher

扩展自：`events.EventEmitter`

Dispatcher 是用于分发请求的核心 API。

不保证请求会按照调用顺序进行分发。

## 实例方法

### `Dispatcher.close([callback]): Promise`

关闭 dispatcher，并在解析之前优雅地等待排队中的请求完成。

参数：

* **callback** `(error: Error | null, data: null) => void`（可选）

返回值：`void | Promise<null>` - 只有在没有传递 `callback` 参数时才返回 `Promise`

```js
dispatcher.close() // -> Promise
dispatcher.close(() => {}) // -> void
```

#### 示例 - 请求在 Client 关闭前解析

```js
import { createServer } from 'http'
import { Client } from 'undici'
import { once } from 'events'

const server = createServer((request, response) => {
  response.end('undici')
}).listen()

await once(server, 'listening')

const client = new Client(`http://localhost:${server.address().port}`)

try {
  const { body } = await client.request({
      path: '/',
      method: 'GET'
  })
  body.setEncoding('utf8')
  body.on('data', console.log)
} catch (error) {}

await client.close()

console.log('Client closed')
server.close()
```

### `Dispatcher.connect(options[, callback])`

使用 [HTTP CONNECT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/CONNECT) 与请求的资源建立双向通信。

参数：

* **options** `ConnectOptions`
* **callback** `(err: Error | null, data: ConnectData | null) => void`（可选）

返回值：`void | Promise<ConnectData>` - 只有在没有传递 `callback` 参数时才返回 `Promise`

#### 参数：`ConnectOptions`

* **path** `string`
* **headers** `UndiciHeaders`（可选）- 默认值：`null`
* **signal** `AbortSignal | events.EventEmitter | null`（可选）- 默认值：`null`
* **opaque** `unknown`（可选）- 此参数将传递给 `ConnectData`

#### 参数：`ConnectData`

* **statusCode** `number`
* **headers** `Record<string, string | string[] | undefined>`
* **socket** `stream.Duplex`
* **opaque** `unknown`

#### 示例 - 带回显的 Connect 请求

```js
import { createServer } from 'http'
import { Client } from 'undici'
import { once } from 'events'

const server = createServer((request, response) => {
  throw Error('should never get here')
}).listen()

server.on('connect', (req, socket, head) => {
  socket.write('HTTP/1.1 200 Connection established\r\n\r\n')

  let data = head.toString()
  socket.on('data', (buf) => {
    data += buf.toString()
  })

  socket.on('end', () => {
    socket.end(data)
  })
})

await once(server, 'listening')

const client = new Client(`http://localhost:${server.address().port}`)

try {
  const { socket } = await client.connect({
    path: '/'
  })
  const wanted = 'Body'
  let data = ''
  socket.on('data', d => { data += d })
  socket.on('end', () => {
    console.log(`Data received: ${data.toString()} | Data wanted: ${wanted}`)
    client.close()
    server.close()
  })
  socket.write(wanted)
  socket.end()
} catch (error) { }
```

### `Dispatcher.destroy([error, callback]): Promise`

使用给定的错误突然销毁 dispatcher。所有待处理和正在处理的请求都将被异步中止并出错。由于此操作是异步分发的，因此可能仍有一些已分发的请求正在进行中。

两个参数都是可选的；该方法可以以四种不同的方式调用：

参数：

* **error** `Error | null`（可选）
* **callback** `(error: Error | null, data: null) => void`（可选）

返回值：`void | Promise<void>` - 只有在没有传递 `callback` 参数时才返回 `Promise`

```js
dispatcher.destroy() // -> Promise
dispatcher.destroy(new Error()) // -> Promise
dispatcher.destroy(() => {}) // -> void
dispatcher.destroy(new Error(), () => {}) // -> void
```

#### 示例 - 当 Client 被销毁时请求被中止

```js
import { createServer } from 'http'
import { Client } from 'undici'
import { once } from 'events'

const server = createServer((request, response) => {
  response.end()
}).listen()

await once(server, 'listening')

const client = new Client(`http://localhost:${server.address().port}`)

try {
  const request = client.request({
    path: '/',
    method: 'GET'
  })
  client.destroy()
    .then(() => {
      console.log('Client destroyed')
      server.close()
    })
  await request
} catch (error) {
  console.error(error)
}
```

### `Dispatcher.dispatch(options, handler)`

这是底层 API，所有前面的 API 都构建在其之上。
预计该 API 会通过 semver-major 版本演进，并且比前面的高级 API 更不稳定。
它主要面向那些希望在此基础之上实现高级别 API 的库开发者。

参数：

* **options** `DispatchOptions`
* **handler** `DispatchHandler`

返回值：`Boolean` - 如果 dispatcher 正忙且进一步的 dispatch 调用不会产生任何进展，则返回 `false`，直到发出 `'drain'` 事件为止。

#### 参数：`DispatchOptions`

* **origin** `string | URL`
* **path** `string`
* **method** `string`
* **reset** `boolean`（可选）- 默认值：`false` - 如果为 `false`，请求将尝试通过发送 `connection: keep-alive` 标头创建长连接，否则将通过在请求内发送 `connection: close` 立即关闭响应后的连接，并在之后关闭套接字。
* **body** `string | Buffer | Uint8Array | stream.Readable | Iterable | AsyncIterable | null`（可选）- 默认值：`null`
* **headers** `UndiciHeaders`（可选）- 默认值：`null`.
* **query** `Record<string, any> | null`（可选）- 默认值：`null` - 要嵌入请求 URL 的查询字符串参数。注意，查询的键和值都使用 `encodeURIComponent` 编码。如果出于某种原因需要发送未编码的查询参数，请直接将查询参数嵌入到路径中。
* **idempotent** `boolean`（可选）- 默认值：如果 `method` 是 `'HEAD'` 或 `'GET'` 则为 `true` - 请求是否可以安全重试。如果为 `false`，请求将不会发送，直到管道中的所有前面的请求都已完成。
* **blocking** `boolean`（可选）- 默认值：`method !== 'HEAD'` - 响应是否预期会花费很长时间并阻塞管道。当设置为 `true` 时，在收到标头之前将避免同一连接上的进一步流水线传输。
* **upgrade** `string | null`（可选）- 默认值：`null` - 升级请求。应用于指定升级的类型，例如 `'Websocket'`。
* **bodyTimeout** `number | null`（可选）- 请求在超时前的时间（以毫秒为单位），监控接收主体数据之间的时间。使用 `0` 完全禁用。默认为 300 秒。
* **headersTimeout** `number | null`（可选）- 解析器在发送请求前等待接收完整 HTTP 标头的时间（以毫秒为单位）。默认为 300 秒。
* **expectContinue** `boolean`（可选）- 默认值：`false` - 对于 H2，附加 expect: 100-continue 标头，并在收到远程服务器的 100-continue 前暂停请求体

#### 参数：`DispatchHandler`

* **onRequestStart** `(controller: DispatchController, context: object) => void` - 在套接字上分发请求前调用。当管道顶部的请求失败时，可能会多次调用。
* **onRequestUpgrade** `(controller: DispatchController, statusCode: number, headers: Record<string, string | string[]>, socket: Duplex) => void`（可选）- 当请求升级时调用。如果定义了 `DispatchOptions.upgrade` 或 `DispatchOptions.method === 'CONNECT'`，则为必需。
* **onResponseStart** `(controller: DispatchController, statusCode: number, headers: Record<string, string | string []>, statusMessage?: string) => void` - 当状态码和标头已接收时调用。可能会因 1xx 信息性标头而多次调用。不适用于 `upgrade` 请求。任何返回值都被忽略。
* **onResponseData** `(controller: DispatchController, chunk: Buffer) => void` - 当响应负载数据接收时调用。不适用于 `upgrade` 请求。
* **onResponseEnd** `(controller: DispatchController, trailers: Record<string, string | string[]>) => void` - 当响应负载和尾部已接收且请求完成时调用。不适用于 `upgrade` 请求。
* **onResponseError** `(controller: DispatchController, error: Error) => void` - 当发生错误时调用。可能不会抛出。

#### 从旧版处理程序 API 迁移

如果您之前使用的是 `onConnect/onHeaders/onData/onComplete/onError`，请切换到新的回调：

- `onConnect(abort)` → `onRequestStart(controller)` 并调用 `controller.abort(reason)`
- `onHeaders(status, rawHeaders, resume, statusText)` → `onResponseStart(controller, status, headers, statusText)`
- `onData(chunk)` → `onResponseData(controller, chunk)`
- `onComplete(trailers)` → `onResponseEnd(controller, trailers)`
- `onError(err)` → `onResponseError(controller, err)`
- `onUpgrade(status, rawHeaders, socket)` → `onRequestUpgrade(controller, status, headers, socket)`

要访问原始标头数组（用于保留重复项/大小写），请从控制器读取：

- `controller.rawHeaders` 用于响应标头
- `controller.rawTrailers` 用于尾部

暂停/恢复现在使用控制器：

- 调用 `controller.pause()` 和 `controller.resume()` 而不是从处理程序返回 `false`。

#### 兼容性说明

Undici 现在将全局 dispatcher 存储在 `Symbol.for('undici.globalDispatcher.2')` 下。
这避免了与仍依赖旧版 dispatcher 处理程序接口的运行时的冲突（例如 Node.js 内置的 `fetch`）。

`setGlobalDispatcher()` 还会使用 `Dispatcher1Wrapper` 将配置的 dispatcher 镜像到 `Symbol.for('undici.globalDispatcher.1')`，以便 Node 的内置 `fetch` 可以继续使用旧版处理程序契约。

如果您需要将新的 dispatcher/agent 暴露给旧版 v1 处理程序消费者（`onConnect/onHeaders/onData/onComplete/onError/onUpgrade`），请使用 `Dispatcher1Wrapper`：

```js
import { Agent, Dispatcher1Wrapper } from 'undici'

const legacyCompatibleDispatcher = new Dispatcher1Wrapper(new Agent())
```

#### 示例 1 - 分发 GET 请求

```js
import { createServer } from 'http'
import { Client } from 'undici'
import { once } from 'events'

const server = createServer((request, response) => {
  response.end('Hello, World!')
}).listen()

await once(server, 'listening')

const client = new Client(`http://localhost:${server.address().port}`)

const data = []

client.dispatch({
  path: '/',
  method: 'GET',
  headers: {
    'x-foo': 'bar'
  }
}, {
  onRequestStart: () => {
    console.log('Connected!')
  },
  onResponseError: (_controller, error) => {
    console.error(error)
  },
  onResponseStart: (_controller, statusCode, headers) => {
    console.log(`onResponseStart | statusCode: ${statusCode} | headers: ${JSON.stringify(headers)}`)
  },
  onResponseData: (_controller, chunk) => {
    console.log('onResponseData: chunk received')
    data.push(chunk)
  },
  onResponseEnd: (_controller, trailers) => {
    console.log(`onResponseEnd | trailers: ${JSON.stringify(trailers)}`)
    const res = Buffer.concat(data).toString('utf8')
    console.log(`Data: ${res}`)
    client.close()
    server.close()
  }
})
```

#### 示例 2 - 分发升级请求

```js
import { createServer } from 'http'
import { Client } from 'undici'
import { once } from 'events'

const server = createServer((request, response) => {
  response.end()
}).listen()

await once(server, 'listening')

server.on('upgrade', (request, socket, head) => {
  console.log('Node.js Server - upgrade event')
  socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n')
  socket.write('Upgrade: WebSocket\r\n')
  socket.write('Connection: Upgrade\r\n')
  socket.write('\r\n')
  socket.end()
})

const client = new Client(`http://localhost:${server.address().port}`)

client.dispatch({
  path: '/',
  method: 'GET',
  upgrade: 'websocket'
}, {
  onRequestStart: () => {
    console.log('Undici Client - onRequestStart')
  },
  onResponseError: () => {
    console.log('onResponseError') // shouldn't print
  },
  onRequestUpgrade: (_controller, statusCode, headers, socket) => {
    console.log('Undici Client - onRequestUpgrade')
    console.log(`onRequestUpgrade Headers: ${JSON.stringify(headers)}`)
    socket.on('data', buffer => {
      console.log(buffer.toString('utf8'))
    })
    socket.on('end', () => {
      client.close()
      server.close()
    })
    socket.end()
  }
})
```

#### 示例 3 - 分发 POST 请求

```js
import { createServer } from 'http'
import { Client } from 'undici'
import { once } from 'events'

const server = createServer((request, response) => {
  request.on('data', (data) => {
    console.log(`Request Data: ${data.toString('utf8')}`)
    const body = JSON.parse(data)
    body.message = 'World'
    response.end(JSON.stringify(body))
  })
}).listen()

await once(server, 'listening')

const client = new Client(`http://localhost:${server.address().port}`)

const data = []

client.dispatch({
  path: '/',
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  },
  body: JSON.stringify({ message: 'Hello' })
}, {
  onRequestStart: () => {
    console.log('Connected!')
  },
  onResponseError: (_controller, error) => {
    console.error(error)
  },
  onResponseStart: (_controller, statusCode, headers) => {
    console.log(`onResponseStart | statusCode: ${statusCode} | headers: ${JSON.stringify(headers)}`)
  },
  onResponseData: (_controller, chunk) => {
    console.log('onResponseData: chunk received')
    data.push(chunk)
  },
  onResponseEnd: (_controller, trailers) => {
    console.log(`onResponseEnd | trailers: ${JSON.stringify(trailers)}`)
    const res = Buffer.concat(data).toString('utf8')
    console.log(`Response Data: ${res}`)
    client.close()
    server.close()
  }
})
```

### `Dispatcher.pipeline(options, handler)`

便于与 [stream.pipeline](https://nodejs.org/api/stream.html#streampipelinesource-transforms-destination-options) 一起使用。`handler` 参数应返回一个 `Readable`，从中读取结果。通常它应该只返回 `body` 参数，除非需要基于例如 `headers` 或 `statusCode` 执行某种转换。`handler` 应验证响应并保存任何所需的状态。如果有错误，应抛出。该函数返回一个 `Duplex`，写入请求并从响应中读取。

参数：

* **options** `PipelineOptions`
* **handler** `(data: PipelineHandlerData) => stream.Readable`

返回值：`stream.Duplex`

#### 参数：PipelineOptions

扩展自：[`RequestOptions`](/docs/docs/api/Dispatcher.md#parameter-requestoptions)

* **objectMode** `boolean`（可选）- 默认值：`false` - 如果 `handler` 将返回对象流，则设置为 `true`。

#### 参数：PipelineHandlerData

* **statusCode** `number`
* **headers** `Record<string, string | string[] | undefined>`
* **opaque** `unknown`
* **body** `stream.Readable`
* **context** `object`
* **onInfo** `({statusCode: number, headers: Record<string, string | string[]>}) => void | null`（可选）- 默认值：`null` - 收集所有接收到的信息标头（HTTP 100-199）的回调。

#### 示例 1 - Pipeline 回显

```js
import { Readable, Writable, PassThrough, pipeline } from 'stream'
import { createServer } from 'http'
import { Client } from 'undici'
import { once } from 'events'

const server = createServer((request, response) => {
  request.pipe(response)
}).listen()

await once(server, 'listening')

const client = new Client(`http://localhost:${server.address().port}`)

let res = ''

pipeline(
  new Readable({
    read () {
      this.push(Buffer.from('undici'))
      this.push(null)
    }
  }),
  client.pipeline({
    path: '/',
    method: 'GET'
  }, ({ statusCode, headers, body }) => {
    console.log(`response received ${statusCode}`)
    console.log('headers', headers)
    return pipeline(body, new PassThrough(), () => {})
  }),
  new Writable({
    write (chunk, _, callback) {
      res += chunk.toString()
      callback()
    },
    final (callback) {
      console.log(`Response pipelined to writable: ${res}`)
      callback()
    }
  }),
  error => {
    if (error) {
      console.error(error)
    }

    client.close()
    server.close()
  }
)
```

### `Dispatcher.request(options[, callback])`

执行 HTTP 请求。

非幂等请求不会进行流水线传输，以避免间接故障。

幂等请求将在由于管道顶部的请求间接失败时自动重试。这不适用于具有流请求体的幂等请求。

始终必须完全消耗或销毁所有响应体。

参数：

* **options** `RequestOptions`
* **callback** `(error: Error | null, data: ResponseData) => void`（可选）

返回值：`void | Promise<ResponseData>` - 只有在没有传递 `callback` 参数时才返回 `Promise`

#### 参数：`RequestOptions`

扩展自：[`DispatchOptions`](/docs/docs/api/Dispatcher.md#parameter-dispatchoptions)

* **opaque** `unknown`（可选）- 默认值：`null` - 用于将上下文传递给 `ResponseData`。
* **signal** `AbortSignal | events.EventEmitter | null`（可选）- 默认值：`null`
* **onInfo** `({statusCode: number, headers: Record<string, string | string[]>}) => void | null`（可选）- 默认值：`null` - 收集所有接收到的信息标头（HTTP 100-199）的回调。

`RequestOptions.method` 属性不应为值 `'CONNECT'`。

#### 参数：`ResponseData`

* **statusCode** `number`
* **statusText** `string` - 响应的状态消息（例如，"OK"、"Not Found"）。
* **headers** `Record<string, string | string[]>` - 注意，所有标头键都转换为小写，例如 `content-type`。
* **body** `stream.Readable`，也实现了 [Fetch 标准中的 body mixin](https://fetch.spec.whatwg.org/#body-mixin)。
* **trailers** `Record<string, string>` - 此对象最初为空，在 `body` 发出 `'end'` 后将被修改为包含尾部。
* **opaque** `unknown`
* **context** `object`

`body` 包含以下额外的 [body mixin](https://fetch.spec.whatwg.org/#body-mixin) 方法和属性：

* [`.arrayBuffer()`](https://fetch.spec.whatwg.org/#dom-body-arraybuffer)
* [`.blob()`](https://fetch.spec.whatwg.org/#dom-body-blob)
* [`.bytes()`](https://fetch.spec.whatwg.org/#dom-body-bytes)
* [`.json()`](https://fetch.spec.whatwg.org/#dom-body-json)
* [`.text()`](https://fetch.spec.whatwg.org/#dom-body-text)
* `body`
* `bodyUsed`

`body` 不能消费两次。例如，在 `json()` 之后调用 `text()` 会抛出 `TypeError`。

`body` 包含以下额外扩展：

- `dump({ limit: Integer })`，通过读取最多 `limit` 字节来转储响应，而不会杀死连接（可选） - 默认值：131072。

注意，即使为空，`body` 仍将是一个 `Readable`，但尝试使用 `json()` 反序列化它将导致异常。确保有要反序列化的体的推荐方法是检查状态码不是 204，且 `content-type` 标头以 `application/json` 开头。

#### 示例 1 - 基本 GET 请求

```js
import { createServer } from 'http'
import { Client } from 'undici'
import { once } from 'events'

const server = createServer((request, response) => {
  response.end('Hello, World!')
}).listen()

await once(server, 'listening')

const client = new Client(`http://localhost:${server.address().port}`)

try {
  const { body, headers, statusCode, statusText, trailers } = await client.request({
    path: '/',
    method: 'GET'
  })
  console.log(`response received ${statusCode}`)
  console.log('headers', headers)
  body.setEncoding('utf8')
  body.on('data', console.log)
  body.on('error', console.error)
  body.on('end', () => {
    console.log('trailers', trailers)
  })

  client.close()
  server.close()
} catch (error) {
  console.error(error)
}
```

#### 示例 2 - 中止请求

> 运行此示例需要 Node.js v15+

```js
import { createServer } from 'http'
import { Client } from 'undici'
import { once } from 'events'

const server = createServer((request, response) => {
  response.end('Hello, World!')
}).listen()

await once(server, 'listening')

const client = new Client(`http://localhost:${server.address().port}`)
const abortController = new AbortController()

try {
  client.request({
    path: '/',
    method: 'GET',
    signal: abortController.signal
  })
} catch (error) {
  console.error(error) // 应打印 RequestAbortedError
  client.close()
  server.close()
}

abortController.abort()
```

或者，任何发出 `'abort'` 事件的 `EventEmitter` 都可以用作中止控制器：

```js
import { createServer } from 'http'
import { Client } from 'undici'
import EventEmitter, { once } from 'events'

const server = createServer((request, response) => {
  response.end('Hello, World!')
}).listen()

await once(server, 'listening')

const client = new Client(`http://localhost:${server.address().port}`)
const ee = new EventEmitter()

try {
  client.request({
    path: '/',
    method: 'GET',
    signal: ee
  })
} catch (error) {
  console.error(error) // 应打印 RequestAbortedError
  client.close()
  server.close()
}

ee.emit('abort')
```

销毁请求或响应体会产生相同效果。

```js
import { createServer } from 'http'
import { Client } from 'undici'
import { once } from 'events'

const server = createServer((request, response) => {
  response.end('Hello, World!')
}).listen()

await once(server, 'listening')

const client = new Client(`http://localhost:${server.address().port}`)

try {
  const { body } = await client.request({
    path: '/',
    method: 'GET'
  })
  body.destroy()
} catch (error) {
  console.error(error) // 应打印 RequestAbortedError
  client.close()
  server.close()
}
```

#### 示例 3 - 有条件地读取 body

记住，即使在未读取的情况下也要完全消耗 body。

```js
const { body, statusCode } = await client.request({
  path: '/',
  method: 'GET'
})

if (statusCode === 200) {
  return await body.arrayBuffer()
}

await body.dump()

return null
```

### `Dispatcher.stream(options, factory[, callback])`

`Dispatcher.request` 的快速版本。此方法期望第二个参数 `factory` 返回一个 [`stream.Writable`](https://nodejs.org/api/stream.html#stream_class_stream_writable) 流，响应将写入其中。通过避免在使用者预期直接将响应体管道传输到 [`stream.Writable`](https://nodejs.org/api/stream.html#stream_class_stream_writable) 流时创建中间 [`stream.Readable`](https://nodejs.org/api/stream.html#stream_readable_streams) 流来提高性能。

如 [示例 1 - 基本 GET 流请求](/docs/docs/api/Dispatcher.md#example-1-basic-get-stream-request) 所示，建议使用 `option.opaque` 属性来避免为 `factory` 方法创建闭包。此模式与 Node.js Web 框架（如 [Fastify](https://fastify.io)）配合良好。有关更多详细信息，请参阅 [示例 2 - 流到 Fastify 响应](/docs/docs/api/Dispatch.md#example-2-stream-to-fastify-response)。

参数：

* **options** `RequestOptions`
* **factory** `(data: StreamFactoryData) => stream.Writable`
* **callback** `(error: Error | null, data: StreamData) => void`（可选）

返回值：`void | Promise<StreamData>` - 只有在没有传递 `callback` 参数时才返回 `Promise`

#### 参数：`StreamFactoryData`

* **statusCode** `number`
* **headers** `Record<string, string | string[] | undefined>`
* **opaque** `unknown`
* **onInfo** `({statusCode: number, headers: Record<string, string | string[]>}) => void | null`（可选）- 默认值：`null` - 收集所有接收到的信息标头（HTTP 100-199）的回调。

#### 参数：`StreamData`

* **opaque** `unknown`
* **trailers** `Record<string, string>`
* **context** `object`

#### 示例 1 - 基本 GET 流请求

```js
import { createServer } from 'http'
import { Client } from 'undici'
import { once } from 'events'
import { Writable } from 'stream'

const server = createServer((request, response) => {
  response.end('Hello, World!')
}).listen()

await once(server, 'listening')

const client = new Client(`http://localhost:${server.address().port}`)

const bufs = []

try {
  await client.stream({
    path: '/',
    method: 'GET',
    opaque: { bufs }
  }, ({ statusCode, headers, opaque: { bufs } }) => {
    console.log(`response received ${statusCode}`)
    console.log('headers', headers)
    return new Writable({
      write (chunk, encoding, callback) {
        bufs.push(chunk)
        callback()
      }
    })
  })

  console.log(Buffer.concat(bufs).toString('utf-8'))

  client.close()
  server.close()
} catch (error) {
  console.error(error)
}
```

#### 示例 2 - 流到 Fastify 响应

在此示例中，使用 `fastify.inject()` 向 fastify 服务器发出（假定的）请求。此请求然后执行 fastify 路由处理程序，后者使用 `undici.dispatcher.stream()` 向原始 Node.js http 服务器发出后续请求。fastify 响应传递给 `opaque` 选项，以便 undici 可以使用 `response.raw` 访问底层的可写流。此方法演示了如何结合使用 undici 和 fastify 从后端服务器到另一个后端服务器创建尽可能快的请求。

```js
import { createServer } from 'http'
import { Client } from 'undici'
import { once } from 'events'
import fastify from 'fastify'

const nodeServer = createServer((request, response) => {
  response.end('Hello, World! From Node.js HTTP Server')
}).listen()

await once(nodeServer, 'listening')

console.log('Node Server listening')

const nodeServerUndiciClient = new Client(`http://localhost:${nodeServer.address().port}`)

const fastifyServer = fastify()

fastifyServer.route({
  url: '/',
  method: 'GET',
  handler: (request, response) => {
    nodeServerUndiciClient.stream({
      path: '/',
      method: 'GET',
      opaque: response
    }, ({ opaque }) => opaque.raw)
  }
})

await fastifyServer.listen()

console.log('Fastify Server listening')

const fastifyServerUndiciClient = new Client(`http://localhost:${fastifyServer.server.address().port}`)

try {
  const { statusCode, body } = await fastifyServerUndiciClient.request({
    path: '/',
    method: 'GET'
  })

  console.log(`response received ${statusCode}`)
  body.setEncoding('utf8')
  body.on('data', console.log)

  nodeServerUndiciClient.close()
  fastifyServerUndiciClient.close()
  fastifyServer.close()
  nodeServer.close()
} catch (error) { }
```

### `Dispatcher.upgrade(options[, callback])`

升级到不同的协议。有关更多详细信息，请访问 [MDN - HTTP - 协议升级机制](https://developer.mozilla.org/en-US/docs/Web/HTTP/Protocol_upgrade_mechanism)。

参数：

* **options** `UpgradeOptions`

* **callback** `(error: Error | null, data: UpgradeData) => void`（可选）

返回值：`void | Promise<UpgradeData>` - 只有在没有传递 `callback` 参数时才返回 `Promise`

#### 参数：`UpgradeOptions`

* **path** `string`
* **method** `string`（可选）- 默认值：`'GET'`
* **headers** `UndiciHeaders`（可选）- 默认值：`null`
* **protocol** `string`（可选）- 默认值：`'Websocket'` - 逗号分隔的协议字符串，按降序偏好排列。
* **signal** `AbortSignal | EventEmitter | null`（可选）- 默认值：`null`

#### 参数：`UpgradeData`

* **headers** `http.IncomingHeaders`
* **socket** `stream.Duplex`
* **opaque** `unknown`

#### 示例 1 - 基本升级请求

```js
import { createServer } from 'http'
import { Client } from 'undici'
import { once } from 'events'

const server = createServer((request, response) => {
  response.statusCode = 101
  response.setHeader('connection', 'upgrade')
  response.setHeader('upgrade', request.headers.upgrade)
  response.end()
}).listen()

await once(server, 'listening')

const client = new Client(`http://localhost:${server.address().port}`)

try {
  const { headers, socket } = await client.upgrade({
    path: '/',
  })
  socket.on('end', () => {
    console.log(`upgrade: ${headers.upgrade}`) // upgrade: Websocket
    client.close()
    server.close()
  })
  socket.end()
} catch (error) {
  console.error(error)
  client.close()
  server.close()
}
```

### `Dispatcher.compose(interceptors[, interceptor])`

从当前 dispatcher 和给定的拦截器组成一个新的 dispatcher。

> _注意_：
> - 拦截器的顺序很重要。最后一个拦截器将首先被调用。
> - 重要的是要注意，`interceptor` 函数应返回一个遵循 `Dispatcher.dispatch` 签名的函数。
> - 任何 `interceptors` 链的分叉都可能导致意外结果。
>
> **拦截器堆栈可视化：**
> ```
> compose([interceptor1, interceptor2, interceptor3])
>
> 请求流程：
> ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
> │   Request   │───▶│interceptor3 │───▶│interceptor2 │───▶│interceptor1 │───▶│  dispatcher │
> └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘    │   .dispatch │
>                           ▲                   ▲                   ▲         └─────────────┘
>                           │                   │                   │                ▲
>                    (called first)      (called second)     (called last)           │
>                                                                                    │
> ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐          │
> │  Response   │◀───│interceptor3 │◀───│interceptor2 │◀───│interceptor1 │◀─────────┘
> └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
>
> 由于函数组合的原因，拦截器按相反顺序组合。
> ```

参数：

* **interceptors** `Interceptor[interceptor[]]`：作为唯一参数的 `Interceptor` 函数数组，或作为单独参数的多个拦截器。

返回值：`Dispatcher`

#### 参数：`Interceptor`

一个函数，它接受一个 `dispatch` 方法并返回一个类似 `dispatch` 的函数。

#### 示例 1 - 基本 Compose

```js
const { Client, RedirectHandler } = require('undici')

const redirectInterceptor = dispatch => {
    return (opts, handler) => {
      const { maxRedirections } = opts

      if (!maxRedirections) {
        return dispatch(opts, handler)
      }

      const redirectHandler = new RedirectHandler(
        dispatch,
        maxRedirections,
        opts,
        handler
      )
      opts = { ...opts, maxRedirections: 0 } // 停止子 dispatcher 也进行重定向。
      return dispatch(opts, redirectHandler)
    }
}

const client = new Client('http://localhost:3000')
  .compose(redirectInterceptor)

await client.request({ path: '/', method: 'GET' })
```

#### 示例 2 - 链式 Compose

```js
const { Client, RedirectHandler, RetryHandler } = require('undici')

const redirectInterceptor = dispatch => {
    return (opts, handler) => {
      const { maxRedirections } = opts

      if (!maxRedirections) {
        return dispatch(opts, handler)
      }

      const redirectHandler = new RedirectHandler(
        dispatch,
        maxRedirections,
        opts,
        handler
      )
      opts = { ...opts, maxRedirections: 0 }
      return dispatch(opts, redirectHandler)
    }
}

const retryInterceptor = dispatch => {
  return function retryInterceptor (opts, handler) {
    return dispatch(
      opts,
      new RetryHandler(opts, {
        handler,
        dispatch
      })
    )
  }
}

const client = new Client('http://localhost:3000')
  .compose(redirectInterceptor)
  .compose(retryInterceptor)

await client.request({ path: '/', method: 'GET' })
```

#### 预构建的拦截器

##### `redirect`

`redirect` 拦截器允许您自定义 dispatcher 处理重定向的方式。

它接受与 [`RedirectHandler` 构造函数](/docs/docs/api/RedirectHandler.md) 相同的参数。

**示例 - 基本重定向拦截器**

```js
const { Client, interceptors } = require("undici");
const { redirect } = interceptors;

const client = new Client("http://service.example").compose(
  redirect({ maxRedirections: 3, throwOnMaxRedirect: true })
);
client.request({ path: "/" })
```

##### `retry`

`retry` 拦截器允许您自定义 dispatcher 处理重试的方式。

它接受与 [`RetryHandler` 构造函数](/docs/docs/api/RetryHandler.md) 相同的参数。

**示例 - 基本重试拦截器**

```js
const { Client, interceptors } = require("undici");
const { retry } = interceptors;

const client = new Client("http://service.example").compose(
  retry({
    maxRetries: 3,
    minTimeout: 1000,
    maxTimeout: 10000,
    timeoutFactor: 2,
    retryAfter: true,
  })
);
```

##### `dump`

`dump` 拦截器使您能够在给定限制下转储请求的响应体。

**Options**
- `maxSize` - 要转储的响应主体最大大小（以字节为单位）。如果响应主体大小超过此值，则会关闭连接。默认值：`1048576`。

> `Dispatcher#options` 还扩展了选项 `dumpMaxSize`、`abortOnDumped` 和 `waitForTrailers`，可用于在每个请求的基础上配置拦截器。

**示例 - 基本 Dump 拦截器**

```js
const { Client, interceptors } = require("undici");
const { dump } = interceptors;

const client = new Client("http://service.example").compose(
  dump({
    maxSize: 1024,
  })
);

// 或
client.dispatch(
  {
    path: "/",
    method: "GET",
    dumpMaxSize: 1024,
  },
  handler
);
```

##### `dns`

`dns` 拦截器使您能够为给定的持续时间（每源）缓存 DNS 查找。

> 它非常适合您想要缓存 DNS 查找以避免多次解析同一域名的开销的场景

**选项**
- `maxTTL` - DNS 缓存的最大生存时间（以毫秒为单位）。应为正整数。默认值：`10000`。
  - 设置 `0` 以禁用 TTL。
- `maxItems` - 要缓存的最大项目数。应为正整数。默认值：`Infinity`。
- `dualStack` - 是否解析 IPv4 和 IPv6 地址。默认值：`true`。
  - 如果出现连接失败，还将尝试类似 happy-eyeballs 的方法连接到可用的地址。
- `affinity` - 是否使用 IPv4 或 IPv6 地址。默认值：`4`。
  - 可以是 `4` 或 `6`。
  - 仅当 `dualStack` 为 `false` 时才会生效。
- `lookup: (hostname: string, options: LookupOptions, callback: (err: NodeJS.ErrnoException | null, addresses: DNSInterceptorRecord[]) => void) => void` - 自定义查找函数。默认值：`dns.lookup`。
  - 有关更多信息，请参阅 [dns.lookup](https://nodejs.org/api/dns.html#dnslookuphostname-options-callback)。
- `pick: (origin: URL, records: DNSInterceptorRecords, affinity: 4 | 6) => DNSInterceptorRecord` - 自定义选择函数。默认值：`RoundRobin`。
  - 函数应从记录数组中返回单个记录。
  - 默认情况下使用简化的轮询算法。
  - `records` 属性可以被修改以存储平衡算法的状态。
- `storage: DNSStorage` - 已解析 DNS 记录的定制存储

> `Dispatcher#options` 还扩展了选项 `dns.affinity`、`dns.dualStack`、`dns.lookup` 和 `dns.pick`，可用于在每个请求的基础上配置拦截器。


**DNSInterceptorRecord**
它表示一个 DNS 记录。
- `family` -（`number`）地址的 IP 族。可以是 `4` 或 `6`。
- `address` -（`string`）IP 地址。

**DNSInterceptorOriginRecords**
它表示单个源的 DNS IP 地址记录的映射。
- `4.ips` -（`DNSInterceptorRecord[] | null`）IPv4 地址。
- `6.ips` -（`DNSInterceptorRecord[] | null`）IPv6 地址。

**DNSStorage**
它表示已解析 DNS 记录的存储对象。
- `size` -（`number`）存储的当前大小。
- `get` -（`(origin: string) => DNSInterceptorOriginRecords | null`）获取给定源的记录的方法。
- `set` -（`(origin: string, records: DNSInterceptorOriginRecords | null, options: { ttl: number }) => void`）设置给定源的记录的方法。
- `delete` -（`(origin: string) => void`）删除给定源的记录的方法。
- `full` -（`() => boolean`）检查存储是否已满的方法，如果返回 `true`，此拦截器中将跳过 DNS 查找且不存储新记录。

**示例 - 基本 DNS 拦截器**

```js
const { Client, interceptors } = require("undici");
const { dns } = interceptors;

const client = new Agent().compose([
  dns({ ...opts })
])

const response = await client.request({
  origin: `http://localhost:3030`,
  ...requestOpts
})
```

**示例 - DNS 拦截器和 LRU 缓存作为存储**

```js
const { Client, interceptors } = require("undici");
const QuickLRU = require("quick-lru");
const { dns } = interceptors;

const lru = new QuickLRU({ maxSize: 100 });

const lruAdapter = {
  get size() {
    return lru.size;
  },
  get(origin) {
    return lru.get(origin);
  },
  set(origin, records, { ttl }) {
    lru.set(origin, records, { maxAge: ttl });
  },
  delete(origin) {
    lru.delete(origin);
  },
  full() {
    // 对于 LRU 缓存，我们总是可以存储新记录，旧记录会自动被逐出
    return false;
  }
}

const client = new Agent().compose([
  dns({ storage: lruAdapter })
])

const response = await client.request({
  origin: `http://localhost:3030`,
  ...requestOpts
})
```

##### `responseError`

`responseError` 拦截器对状态码错误（>= 400）的响应抛出错误。

**示例**

```js
const { Client, interceptors } = require("undici");
const { responseError } = interceptors;

const client = new Client("http://service.example").compose(
  responseError()
);

// 对于状态码 >= 400 将抛出 ResponseError
await client.request({
  method: "GET",
  path: "/"
});
```

##### `decompress`

⚠️ `decompress` 拦截器是实验性的，可能会发生变化。

`decompress` 拦截器会自动解压缩使用 gzip、deflate、brotli 或 zstd 压缩的响应体。它从解压后的响应中删除 `content-encoding` 和 `content-length` 标头，并支持符合 RFC-9110 的多个编码。

**选项**

- `skipErrorResponses` - 是否跳过错误响应（状态码 >= 400）的解压缩。默认值：`true`。
- `skipStatusCodes` - 要跳过解压缩的状态码数组。默认值：`[204, 304]`。

**示例 - 基本 Decompress 拦截器**

```js
const { Client, interceptors } = require("undici");
const { decompress } = interceptors;

const client = new Client("http://service.example").compose(
  decompress()
);

// 自动解压 gzip/deflate/brotli/zstd 响应
const response = await client.request({
  method: "GET",
  path: "/"
});
```

**示例 - 自定义选项**

```js
const { Client, interceptors } = require("undici");
const { decompress } = interceptors;

const client = new Client("http://service.example").compose(
  decompress({
    skipErrorResponses: false, // 解压 5xx 响应
    skipStatusCodes: [204, 304, 201] // 跳过这些状态码
  })
);
```

**支持的编码**

- `gzip` / `x-gzip` - GZIP 压缩
- `deflate` / `x-compress` - DEFLATE 压缩  
- `br` - Brotli 压缩
- `zstd` - Zstandard 压缩
- 支持多个编码（例如，`gzip, deflate`）根据 RFC-9110

**行为**

- 默认跳过状态码 < 200 或 >= 400 的解压缩（可配置）
- 默认跳过 204 No Content 和 304 Not Modified
- 解压缩时移除 `content-encoding` 和 `content-length` 标头
- 不支持的编码将透传
- 支持编码名称的大小写不敏感
- 支持无需缓冲的流式解压缩

##### `Cache Interceptor`

`cache` 拦截器实现了客户端响应缓存，如 [RFC9111](https://www.rfc-editor.org/rfc/rfc9111.html) 所述。

**选项**

- `store` - 用于存储和检索响应的 [`CacheStore`](/docs/docs/api/CacheStore.md)。默认为 [`MemoryCacheStore`](/docs/docs/api/CacheStore.md#memorycachestore)。
- `methods` - 要缓存响应的 [**安全** HTTP 方法](https://www.rfc-editor.org/rfc/rfc9110#section-9.2.1)。
- `cacheByDefault` - 如果响应没有显式过期且无法计算启发式过期时间，则默认缓存响应的时间。如果不存在此选项，则既没有显式过期也没有启发式可缓存的响应将不会被缓存。默认值：`undefined`。
- `type` - Undici 充当的 [缓存类型](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching#types_of_caches)。可以是 `shared` 或 `private`。默认为 `shared`。`private` 意味着将缓存私有可缓存响应，并可能与应用程序的其他用户共享。

**与 `fetch` 一起使用**

```js
const { Agent, cacheStores, interceptors, setGlobalDispatcher } = require('undici')

const client = new Agent().compose(interceptors.cache({
  store: new cacheStores.MemoryCacheStore({
    maxSize: 100 * 1024 * 1024, // 100MB
    maxCount: 1000,
    maxEntrySize: 5 * 1024 * 1024 // 5MB
  })
}))

setGlobalDispatcher(client)

// 第一次请求将访问网络，并在允许缓存时缓存（取决于响应的缓存头）。
const first = await fetch('https://example.com/data')

// 第二次请求可以根据 RFC9111 的规则从缓存中提供。
const second = await fetch('https://example.com/data')
```

##### `Deduplicate Interceptor`

`deduplicate` 拦截器用于去重并发相同的请求。当多个相同请求发出而其中一个已在进行中时，只有一个请求会发送到源服务器，所有等待的处理程序都会收到相同的响应。这减少了服务器负载并提高了性能。

**选项**

- `methods` - 要去重的 [**安全** HTTP 方法](https://www.rfc-editor.org/rfc/rfc9110#section-9.2.1)。默认为 `['GET']`。
- `skipHeaderNames` - 如果请求中存在这些标头名，将完全跳过去重。对于像 `idempotency-key` 这样的标头很有用，其存在表示唯一处理。标头名匹配不区分大小写。默认为 `[]`。
- `excludeHeaderNames` - 要从去重键中排除的标头名。具有这些标头不同值的请求仍将一起去重。对于像 `x-request-id` 这样随每个请求变化的标头很有用，但不应该影响去重。标头名匹配不区分大小写。默认为 `[]`。
- `maxBufferSize` - 每个暂停的等待去重处理器的最大缓冲字节数。如果等待的处理程序保持暂停并超过此阈值，则会因中止错误而失败，以防止无界内存增长。默认为 `5 * 1024 * 1024`。

**用法**

```js
const { Client, interceptors } = require("undici");
const { deduplicate, cache } = interceptors;

// 仅去重
const client = new Client("http://service.example").compose(
  deduplicate()
);

// 去重并缓存
const clientWithCache = new Client("http://service.example").compose(
  deduplicate(),
  cache()
);
```

请求如果具有以下相同内容则被视为相同：
- 源
- HTTP 方法
- 路径
- 请求标头（排除 `excludeHeaderNames` 中指定的任何标头）

所有去重的请求都会收到完整的响应，包括状态码、标头和正文。

为便于观察，请求去重事件会发布到 `undici:request:pending-requests` [诊断通道](/docs/docs/api/DiagnosticsChannel.md#undicirequestpending-requests)。

## 实例事件

### 事件：`'connect'`

参数：

* **origin** `URL`
* **targets** `Array<Dispatcher>`

### 事件：`'disconnect'`

参数：

* **origin** `URL`
* **targets** `Array<Dispatcher>`
* **error** `Error`

当调度器与源断开连接时触发。

> **注意**：对于 HTTP/2，当调度器收到带有错误消息 `"HTTP/2: "GOAWAY" frame received"` 和代码 `UND_ERR_INFO` 的 [GOAWAY Frame](https://webconcepts.info/concepts/http2-frame-type/0x7) 时，也会触发此事件。
> 由于使用二进制帧的协议特性，请求可能会挂起，因为可以在 `HEADER` 和 `DATA` 帧之间接收到帧。
> 建议处理此事件并关闭调度器以创建新的 HTTP/2 会话。

### 事件：`'connectionError'`

参数：

* **origin** `URL`
* **targets** `Array<Dispatcher>`
* **error** `Error`

当调度器无法连接到源时触发。

### 事件：`'drain'`

参数：

* **origin** `URL`

当调度器不再繁忙时触发。

## 参数：`UndiciHeaders`

* `Record<string, string | string[] | undefined> | string[] | Iterable<[string, string | string[] | undefined]> | null`

在 [`Client.dispatch`](/docs/docs/api/Client.md#clientdispatchoptions-handlers) 中，如 `options.headers 等标头参数可以以三种形式指定：
* 通过 `Record<string, string | string[] | undefined>`（`IncomingHttpHeaders` 类型）指定的对象。
* 字符串数组。标头列表的数组表示必须具有偶数长度，否则将抛出 `InvalidArgumentError`。
* 可迭代的对象，可以包含 `Headers`、`Map` 或返回键值对的自定义迭代器。
键为小写，值不会被修改。

Undici 会在协议级别验证标头发送语法（例如，无效的标头名称或字符串值中的无效控制字符），但不会清理不受信任的应用程序输入。在传递给 Undici 之前，请验证并清理任何用户提供的标头名称和值，以防止标头/正文注入漏洞。

在使用数组标头格式（`string[]`）时，Undici 仅处理索引元素。分配给数组对象的附加属性将被忽略。

如果之前未指定 `host` 标头，响应标头将从 [Client](/docs/docs/api/Client.md#class-client) 实例的 `url` 派生 `host`。

### 示例 1 - 对象

```js
{
  'content-length': '123',
  'content-type': 'text/plain',
  connection: 'keep-alive',
  host: 'mysite.com',
  accept: '*/*'
}
```

### 示例 2 - 数组

```js
[
  'content-length', '123',
  'content-type', 'text/plain',
  'connection', 'keep-alive',
  'host', 'mysite.com',
  'accept', '*/*'
]
```

### 示例 3 - 可迭代对象

```js
new Headers({
  'content-length': '123',
  'content-type': 'text/plain',
  connection: 'keep-alive',
  host: 'mysite.com',
  accept: '*/*'
})
```
或者
```js
new Map([
  ['content-length', '123'],
  ['content-type', 'text/plain'],
  ['connection', 'keep-alive'],
  ['host', 'mysite.com'],
  ['accept', '*/*']
])
```
或者
```js
{
  *[Symbol.iterator] () {
    yield ['content-length', '123']
    yield ['content-type', 'text/plain']
    yield ['connection', 'keep-alive']
    yield ['host', 'mysite.com']
    yield ['accept', '*/*']
  }
}
```
