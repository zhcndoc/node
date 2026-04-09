# 类：RetryAgent

继承自：`undici.Dispatcher`

一个允许自动重试请求的 `undici.Dispatcher`。
它包装了一个 `undici.RetryHandler`。

## `new RetryAgent(dispatcher, [options])`

参数：

* **dispatcher** `undici.Dispatcher`（必需）- 要包装的调度器
* **options** `RetryHandlerOptions`（可选）- 选项

返回值：`ProxyAgent`

### 参数：`RetryHandlerOptions`

- **throwOnError** `boolean`（可选）- 禁用此功能可防止在最后一次重试时抛出错误，如果您需要从服务器获取错误响应体或拥有自定义错误处理器，这将很有用。默认值：`true`
- **retry** `(err: Error, context: RetryContext, callback: (err?: Error | null) => void) => void`（可选）- 每次重试后调用的函数。如果没有更多重试应执行，则应传递错误。
- **maxRetries** `number`（可选）- 最大重试次数。默认值：`5`
- **maxTimeout** `number`（可选）- 重试前等待的最大毫秒数。默认值：`30000`（30秒）
- **minTimeout** `number`（可选）- 重试前等待的最小毫秒数。默认值：`500`（半秒）
- **timeoutFactor** `number`（可选）- 每次重试尝试时超时时间的乘数。默认值：`2`
- **retryAfter** `boolean`（可选）- 启用在收到 `Retry-After` 标头后的自动重试。默认值：`true`
- **methods** `string[]`（可选）- 要重试的 HTTP 方法数组。默认值：`['GET', 'PUT', 'HEAD', 'OPTIONS', 'DELETE']`
- **statusCodes** `number[]`（可选）- 要重试的 HTTP 状态码数组。默认值：`[429, 500, 502, 503, 504]`
- **errorCodes** `string[]`（可选）- 要重试的错误代码数组。默认值：`['ECONNRESET', 'ECONNREFUSED', 'ENOTFOUND', 'ENETDOWN','ENETUNREACH', 'EHOSTDOWN', 'UND_ERR_SOCKET']`

**`RetryContext`**

- `state`: `RetryState` - 当前重试状态。可以修改。
- `opts`: `Dispatch.DispatchOptions & RetryOptions` - 传递给重试处理器的选项。

示例：

```js
import { Agent, RetryAgent } from 'undici'

const agent = new RetryAgent(new Agent())

const res = await agent.request({
  method: 'GET',
  origin: 'http://example.com',
  path: '/',
})
console.log(res.statusCode)
console.log(await res.body.text())
```
