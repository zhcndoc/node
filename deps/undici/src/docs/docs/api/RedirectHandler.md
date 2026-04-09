# 类: RedirectHandler

一个用于处理 HTTP 请求重定向逻辑的类。

## `new RedirectHandler(dispatch, maxRedirections, opts, handler)`

参数:

- **dispatch** `function` - 每次重试后要调用的调度函数。
- **maxRedirections** `number` - 允许的最大重定向次数。
- **opts** `object` - 处理重定向的选项。
- **handler** `object` - 包含请求生命周期不同阶段处理器的对象。

返回值: `RedirectHandler`

### 参数

- **dispatch** `(options: Dispatch.DispatchOptions, handlers: Dispatch.DispatchHandler) => Promise<Dispatch.DispatchResponse>` (必需) - 每次重定向后要调用的调度函数。
- **maxRedirections** `number` (必需) - 允许的最大重定向次数。
- **opts** `object` (必需) - 处理重定向的选项。
- **handler** `object` (必需) - 请求生命周期不同阶段的处理器。

### 属性

- **location** `string` - 当前重定向位置。
- **abort** `function` - 中止函数。
- **opts** `object` - 处理重定向的选项。
- **maxRedirections** `number` - 允许的最大重定向次数。
- **handler** `object` - 请求生命周期不同阶段的处理器。
- **history** `Array` - 表示重定向过程中 URL 历史的数组。

### 方法

#### `onRequestStart(controller, context)`

请求开始时调用。

参数:

- **controller** `DispatchController` - 请求控制器。
- **context** `object` - 调度上下文。

#### `onRequestUpgrade(controller, statusCode, headers, socket)`

当请求升级时调用。

参数:

- **controller** `DispatchController` - 请求控制器。
- **statusCode** `number` - HTTP 状态码。
- **headers** `object` - 响应中接收到的头部。
- **socket** `object` - 套接字对象。

#### `onResponseError(controller, error)`

发生错误时调用。

参数:

- **controller** `DispatchController` - 请求控制器。
- **error** `Error` - 发生的错误。

#### `onResponseStart(controller, statusCode, headers, statusText)`

接收到头部时调用。

参数:

- **controller** `DispatchController` - 请求控制器。
- **statusCode** `number` - HTTP 状态码。
- **headers** `object` - 响应中接收到的头部。
- **statusText** `string` - 状态文本。

#### `onResponseData(controller, chunk)`

接收到数据时调用。

参数:

- **controller** `DispatchController` - 请求控制器。
- **chunk** `Buffer` - 接收到的数据块。

#### `onResponseEnd(controller, trailers)`

请求完成时调用。

参数:

- **controller** `DispatchController` - 请求控制器。
- **trailers** `object` - 接收到的尾部信息。

#### `onBodySent(chunk)`

请求体发送时调用。

参数:

- **chunk** `Buffer` - 已发送的请求体块。
