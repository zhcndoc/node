# 全局安装

Undici 提供了一个 `install()` 函数，用于将所有的 WHATWG fetch 类添加到 `globalThis` 中，使它们无需导入即可全局使用。

## `install()`

在 `globalThis` 上全局安装所有 WHATWG fetch 类。

**示例：**

```js
import { install } from 'undici'

// 全局安装所有 WHATWG fetch 类  
install()

// 现在可以无需导入即可全局使用 fetch 类
const response = await fetch('https://api.example.com/data')
const data = await response.json()

// 所有类都可在全局范围内使用：
const headers = new Headers([['content-type', 'application/json']])
const request = new Request('https://example.com')
const formData = new FormData()
const ws = new WebSocket('wss://example.com')
const eventSource = new EventSource('https://example.com/events')
```

## 已安装的类

`install()` 函数会将以下类添加到 `globalThis` 中：

| 类 | 描述 |
|-------|-------------|
| `fetch` | 用于发起 HTTP 请求的 fetch 函数 |
| `Headers` | HTTP 头部管理 |
| `Response` | HTTP 响应表示 |
| `Request` | HTTP 请求表示 |
| `FormData` | 表单数据处理 |
| `WebSocket` | WebSocket 客户端 |
| `CloseEvent` | WebSocket 关闭事件 |
| `ErrorEvent` | WebSocket 错误事件 |
| `MessageEvent` | WebSocket 消息事件 |
| `EventSource` | 服务器推送事件客户端 |

## 与 `fetch` 一起使用 `FormData`

如果发送 `FormData` 主体，请使用匹配的 `fetch` 和 `FormData` 实现。

以下两种模式是安全的：

```js
// Node.js 内置的全局对象
const body = new FormData()
await fetch('https://example.com', {
  method: 'POST',
  body
})
```

```js
// 从 undici 包安装的全局对象
import { install } from 'undici'

install()

const body = new FormData()
await fetch('https://example.com', {
  method: 'POST',
  body
})
```

在调用 `install()` 后，`fetch`、`Headers`、`Response`、`Request` 和 `FormData` 都来自已安装的 `undici` 包，因此它们作为一组匹配的实现正常工作。

如果您不想安装全局对象，请改为从 `undici` 导入：

```js
import { fetch, FormData } from 'undici'

const body = new FormData()
await fetch('https://example.com', {
  method: 'POST',
  body
})
```

避免混合使用全局 `FormData` 与 `undici.fetch()`，或 `undici.FormData` 与内置全局 `fetch()`。保持它们配对可以避免在不同 Node.js 和 undici 版本之间出现令人惊讶的多部分行为。

## 使用场景

全局安装适用于：

- **没有原生 fetch 支持的 polyfill 环境**
- **确保不同 Node.js 版本之间的行为一致性**
- **第三方库兼容性**，当第三方库期望全局 fetch 时
- **迁移场景**，您想替换内置实现
- **测试环境**，您需要可预测的 fetch 行为

## 示例：polyfilling 环境

```js
import { install } from 'undici'

// 检查 fetch 是否可用，如不可用则安装
if (typeof globalThis.fetch === 'undefined') {
  install()
  console.log('Undici fetch 已全局安装')
}

// 现在可以保证 fetch 是可用的
const response = await fetch('https://api.example.com')
```

## 示例：测试环境

```js
import { install } from 'undici'

// 在测试设置中，确保一致的 fetch 行为
install()

// 现在所有测试都使用 undici 的实现
test('fetch API 测试', async () => {
  const response = await fetch('https://example.com')
  expect(response).toBeInstanceOf(Response)
})
```

## 注意事项

- `install()` 函数会覆盖任何现有的全局实现
- 安装的类是 undici 的实现，而不是 Node.js 内置实现
- 这提供了对 undici 最新功能和性能改进的访问
- 全局安装会在进程生命周期内持续存在