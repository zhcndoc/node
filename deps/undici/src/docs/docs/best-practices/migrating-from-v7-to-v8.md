# 从 Undici 7 迁移到 8

本指南介绍了在将应用程序或库从 Undici v7 升级到 v8 时，最可能遇到的变更。

## 升级前准备

- 确保你的运行时为 Node.js `>= 22.19.0`。
- 如果你有自定义 dispatchers、拦截器或处理器，请在更新之前查看处理器 API 的变更。
- 如果你依赖仅 HTTP/1.1 的行为，计划在配置中显式设置 `allowH2: false`。

## 1. 更新你的 Node.js 版本

Undici v8 需要 Node.js `>= 22.19.0`。

如果你仍在使用 Node.js 20 或更早的 Node.js 22 版本，先升级 Node.js：

```bash
node -v
```

如果该命令输出的版本低于 `v22.19.0`，请在安装 Undici v8 之前先升级 Node.js。

## 2. 将自定义 dispatcher 处理器迁移到 v2 API

Undici v8 在一致地使用更新后的 dispatcher 处理器 API。

如果你实现了自定义 dispatchers、拦截器或围绕 `dispatch()` 的包装器，将旧版回调（如 `onConnect`、`onHeaders` 和 `onComplete`）更新为较新的回调名称。

### 旧版处理器回调 vs. v8 回调

| Undici 7 风格 | Undici 8 风格 |
|---|---|
| `onConnect(abort, context)` | `onRequestStart(controller, context)` |
| `onHeaders(statusCode, rawHeaders, resume, statusText)` | `onResponseStart(controller, statusCode, headers, statusText)` |
| `onData(chunk)` | `onResponseData(controller, chunk)` |
| `onComplete(trailers)` | `onResponseEnd(controller, trailers)` |
| `onError(err)` | `onResponseError(controller, err)` |
| `onUpgrade(statusCode, rawHeaders, socket)` | `onRequestUpgrade(controller, statusCode, headers, socket)` |

### 示例

之前：

```js
client.dispatch(options, {
  onConnect (abort) {
    this.abort = abort
  },
  onHeaders (statusCode, headers, resume) {
    this.resume = resume
    return true
  },
  onData (chunk) {
    chunks.push(chunk)
    return true
  },
  onComplete (trailers) {
    console.log(trailers)
  },
  onError (err) {
    console.error(err)
  }
})
```

之后：

```js
client.dispatch(options, {
  onRequestStart (controller) {
    this.controller = controller
  },
  onResponseStart (controller, statusCode, headers, statusText) {
    console.log(statusCode, statusText, headers)
  },
  onResponseData (controller, chunk) {
    chunks.push(chunk)
  },
  onResponseEnd (controller, trailers) {
    console.log(trailers)
  },
  onResponseError (controller, err) {
    console.error(err)
  }
})
```

### 暂停、恢复和中止现在通过 controller 进行

在 Undici v7 中，旧版处理器可以返回 `false`，或保留对 `abort()` 和 `resume()` 回调的引用。在 Undici v8 中，请改用 controller：

```js
onRequestStart (controller) {
  this.controller = controller
}

onResponseData (controller, chunk) {
  controller.pause()
  setImmediate(() => controller.resume())
}

onResponseError (controller, err) {
  controller.abort(err)
}
```

### 原始 headers 和 trailers 已移动到 controller

如果你需要原始 header 数组，请从 controller 读取：

- `controller.rawHeaders`
- `controller.rawTrailers`

## 3. 更新 `onBodySent()` 处理器

如果你实现了 `onBodySent()`，请注意它的签名已更改。

之前，处理器接收计数器：

```js
onBodySent (chunkSize, totalBytesSent) {}
```

在 Undici v8 中，处理器接收实际的 chunk：

```js
onBodySent (chunk) {}
```

如果你需要通知表示整个 body 已发送完毕，请使用 `onRequestSent()`：

```js
onRequestSent () {
  console.log('request body fully sent')
}
```

## 4. 如果你需要仅 HTTP/1.1，务必显式禁用 HTTP/2

当 TLS 服务器通过 ALPN 协商启用时，Undici v8 会默认启用 HTTP/2。

如果你的应用依赖 HTTP/1.1 特定的行为，请显式设置 `allowH2: false`。

之前：

```js
const client = new Client('https://example.com')
```

之后，为了只保留 HTTP/1.1：

```js
const client = new Client('https://example.com', {
  allowH2: false
})
```

配置 `Agent` 时也同样适用：

```js
const agent = new Agent({
  allowH2: false
})
```

## 5. 使用真正的 `Blob` 和 `File` 实例

Undici v8 不再接受那些仅通过 `Symbol.toStringTag` 等属性来模仿 `Blob` 或 `File` 的“假”Blob-like 值。

如果你正在传递看起来像 `Blob` 的自定义对象，请用真正的 `Blob` 或 `File` 实例替换它们：

```js
const body = new Blob(['hello'])
```

## 6. 避免依赖内部的全局 dispatcher 符号

`setGlobalDispatcher()` 和 `getGlobalDispatcher()` 仍然是公共 API，应继续使用。

在内部，Undici v8 将其 dispatcher 存储在
`Symbol.for('undici.globalDispatcher.2')` 下，并为 legacy consumers（例如 Node.js 内置的 fetch）镜像一个 v1 兼容的包装器。

如果你的代码直接读取或写入了 `Symbol.for('undici.globalDispatcher.1')`，请改为使用公共 API：

```js
import { setGlobalDispatcher, getGlobalDispatcher, Agent } from 'undici'

setGlobalDispatcher(new Agent())
const dispatcher = getGlobalDispatcher()
```

如果你必须向 legacy v1 处理器消费者暴露 dispatcher，请使用 `Dispatcher1Wrapper` 进行包装：

```js
import { Agent, Dispatcher1Wrapper } from 'undici'

const legacyCompatibleDispatcher = new Dispatcher1Wrapper(new Agent())
```

## 7. 验证升级

迁移到 Undici v8 之后，建议在你的测试套件中检查这些路径：

- 使用自定义 `dispatcher` 的请求
- `setGlobalDispatcher()` 的行为
- 任何自定义拦截器或重试处理器
- 使用 `Blob`、`File` 或 `FormData` 的上传
- 依赖仅 HTTP/1.1 行为的集成

## 相关文档

- [Dispatcher](/docs/api/Dispatcher.md)
- [Client](/docs/api/Client.md)
- [全局安装](/docs/api/GlobalInstallation.md)
- [Undici 模块 vs Node.js 内置 fetch](/docs/best-practices/undici-vs-builtin-fetch.md)
