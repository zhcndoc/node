# 编写测试

Undici 针对生产环境进行了优化，其默认设置会在 HTTP 请求完成后保持套接字开放几秒钟，以消除打开新套接字的开销。这些使 Undici 在生产环境中表现出色的设置，并不适合在自动化测试中使用，因为这会导致执行时间变长。

以下是一些良好的默认值，它们只会将套接字保持开放 10 毫秒：

```js
import { request, setGlobalDispatcher, Agent } from 'undici'

const agent = new Agent({
  keepAliveTimeout: 10, // 毫秒
  keepAliveMaxTimeout: 10 // 毫秒
})

setGlobalDispatcher(agent)
```

## 防止意外断开连接

Undici 的 `Client` 会在套接字错误后自动重新连接。这意味着测试可以在静默地断开连接并重新连接后仍然通过。不幸的是，这可能会掩盖诸如意外的解析器错误或协议违规等 bug。为了捕获这些静默重新连接，请在创建 `Client` 后添加一个断开连接防护：

```js
const { Client } = require('undici')
const { test, after } = require('node:test')
const { tspl } = require('@matteo.collina/tspl')

test('example with disconnect guard', async (t) => {
  t = tspl(t, { plan: 1 })

  const client = new Client('http://localhost:3000')
  after(() => client.close())

  client.on('disconnect', () => {
    if (!client.closed && !client.destroyed) {
      t.fail('unexpected disconnect')
    }
  })

  // ... 测试逻辑 ...
})
```

`client.close()` 和 `client.destroy()` 都会发出 `'disconnect'` 事件，但这些是预期的。防护仅在测试期间发生断开连接时失败（即 `!client.closed && !client.destroyed` 为 true）。

对于断开连接是预期行为的测试，请跳过防护，例如：

- 信号中止 (`signal.emit('abort')`, `ac.abort()`)
- 服务器端销毁 (`res.destroy()`, `req.socket.destroy()`)
- 客户端流中途中断 (`data.body.destroy()`)
- 超时错误 (`HeadersTimeoutError`, `BodyTimeoutError`)
- 成功的升级（套接字从 `Client` 中分离）
- 重试/重新连接测试，其中断开连接触发了重试
- 来自格式错误的响应的 HTTP 解析器错误 (`HTTPParserError`)
