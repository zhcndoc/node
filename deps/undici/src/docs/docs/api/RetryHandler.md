# 类：RetryHandler

继承自：`undici.DispatcherHandlers`

一个实现请求重试逻辑的处理程序类。

## `new RetryHandler(dispatchOptions, retryHandlers, [retryOptions])`

参数：

- **options** `Dispatch.DispatchOptions & RetryOptions`（必需）——它是 `Dispatcher.DispatchOptions` 和 `RetryOptions` 的交集。
- **retryHandlers** `RetryHandlers`（必需）——包含每次重试时要使用的 `dispatch` 函数，以及用于处理 `dispatch` 生命周期的 `handler`。

返回值：`retryHandler`

### 参数：`Dispatch.DispatchOptions & RetryOptions`

继承自：[`Dispatch.DispatchOptions`](/docs/docs/api/Dispatcher.md#parameter-dispatchoptions)。

#### `RetryOptions`

- **throwOnError** `boolean`（可选）——禁用此选项可防止在最后一次重试时抛出错误，如果您需要从服务器获取错误响应体或拥有自定义错误处理器，这将非常有用。
- **retry** `(err: Error, context: RetryContext, callback: (err?: Error | null) => void) => number | null`（可选）——每次重试后调用的函数。如果没有更多重试应执行，则应传递错误。
- **maxRetries** `number`（可选）——最大重试次数。默认值：`5`
- **maxTimeout** `number`（可选）——重试前等待的最大毫秒数。默认值：`30000`（30秒）
- **minTimeout** `number`（可选）——重试前等待的最小毫秒数。默认值：`500`（半秒）
- **timeoutFactor** `number`（可选）——每次重试尝试的超时时间乘数。默认值：`2`
- **retryAfter** `boolean`（可选）——启用后，当收到 `Retry-After` 标头时将自动重试。默认值：`true`
- **methods** `string[]`（可选）——要重试的 HTTP 方法数组。默认值：`['GET', 'PUT', 'HEAD', 'OPTIONS', 'DELETE']`
- **statusCodes** `number[]`（可选）——要重试的 HTTP 状态码数组。默认值：`[429, 500, 502, 503, 504]`
- **errorCodes** `string[]`（可选）——要重试的错误代码数组。默认值：`['ECONNRESET', 'ECONNREFUSED', 'ENOTFOUND', 'ENETDOWN','ENETUNREACH', 'EHOSTDOWN', 'UND_ERR_SOCKET']`

**`RetryContext`**

- `state`: `RetryState` - 当前重试状态。可以修改。
- `opts`: `Dispatch.DispatchOptions & RetryOptions` - 传递给重试处理器的选项。

**`RetryState`**

它表示给定请求的重试状态。

- `counter`: `number` - 当前重试次数。

### 参数 `RetryHandlers`

- **dispatch** `(options: Dispatch.DispatchOptions, handlers: Dispatch.DispatchHandler) => Promise<Dispatch.DispatchResponse>`（必需）——每次重试时要调用的调度函数。
- **handler** 继承自 [`Dispatch.DispatchHandler`](/docs/docs/api/Dispatcher.md#dispatcherdispatchoptions-handler)（必需）——请求成功或重试耗尽后要调用的处理函数。

>__注意__：`RetryHandler` 不会对状态化主体（例如流、AsyncIterable）进行重试，因为这些主体一旦被消费就会处于无法重新利用的状态。对于这些情况，`RetryHandler` 将识别主体为状态化的，并且不会重试请求，而是通过错误 `UND_ERR_REQ_RETRY` 拒绝。

示例：

```js
const client = new Client(`http://localhost:${server.address().port}`);
const chunks = [];
const handler = new RetryHandler(
  {
    ...dispatchOptions,
    retryOptions: {
      // 自定义重试函数
      retry: function (err, state, callback) {
        counter++;

        if (err.code && err.code === "UND_ERR_DESTROYED") {
          callback(err);
          return;
        }

        if (err.statusCode === 206) {
          callback(err);
          return;
        }

        setTimeout(() => callback(null), 1000);
      },
    },
  },
  {
    dispatch: (...args) => {
      return client.dispatch(...args);
    },
    handler: {
      onRequestStart() {},
      onBodySent(chunk) {},
      onResponseStart(_controller, status, headers) {
        // 处理标头
      },
      onResponseData(_controller, chunk) {
        chunks.push(chunk);
      },
      onResponseEnd() {},
      onResponseError(_controller, err) {
        // 正确处理错误
      },
    },
  }
);
```

#### 示例 - 使用默认值的 Basic RetryHandler

```js
const client = new Client(`http://localhost:${server.address().port}`);
const handler = new RetryHandler(dispatchOptions, {
  dispatch: client.dispatch.bind(client),
  handler: {
    onRequestStart() {},
    onBodySent(chunk) {},
    onResponseStart(_controller, status, headers) {},
    onResponseData(_controller, chunk) {},
    onResponseEnd() {},
    onResponseError(_controller, err) {},
  },
});
```
