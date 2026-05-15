# 维护 HTTP

在确保 Node.js 持续成功方面，HTTP 支持是一项关键优先事项，正如项目的
[技术优先级](https://github.com/nodejs/node/blob/HEAD/doc/contributing/technical-priorities.md)中所述。

当前的总体策略基于 2022 年 1 月 27 日举行的关于现代 HTTP 的
[Next-10](https://github.com/nodejs/next-10)
[迷你峰会](https://github.com/nodejs/next-10/blob/main/meetings/summit-jan-2022.md)
中的讨论。

## 总体策略

我们未来 HTTP API 策略的关键要素是：

* API 应当与 HTTP 协议无关（支持 HTTP1、HTTP2 等）。
* API 应当与传输协议无关（TCP、QUIC 等）。
* API 应当提供性能良好的默认行为。
* 客户端/服务器 API 应当保持一致并便于集成。
* 像从客户端 API 通过管道传输到服务器 API 之类的常见需求应该
  很容易实现。
* 对于客户端和服务器，都需要多个 API，每个 API
  针对不同的抽象层级。

不幸的是，我们现有的 HTTP API（
[HTTP](https://nodejs.org/docs/latest/api/http.html),
[HTTPS](https://nodejs.org/docs/latest/api/https.html), 以及
[HTTP2](https://nodejs.org/docs/latest/api/http2.html)）
并不符合我们的总体策略。虽然这些 API
被广泛使用，我们也不打算弃用或移除它们，
但它们并不是当前活跃开发或性能改进的重点。
不过，这些 API 的 bug 修复仍然很重要。

就 HTTP 协议本身而言，基于现有或新 API 的优先级，我们目前的评估是：

* HTTP 2 在协议和 API 层面都处于“维护模式”。
* HTTP 1 是一个稳定的协议，但 API 仍然可以继续创新。
* HTTP 3 是一个重要的协议，我们需要为其添加支持。

当前的策略是构建 2 个新的客户端 API 和 2 个新的服务器 API，
以符合上述总体策略。

虽然传输层 API 很重要（例如 socket 层），但 HTTP API
不应绑定到特定的传输层 API。因此，传输层 API 不在我们的 HTTP 策略/维护
信息的范围内。

### 客户端 API

对于客户端 API，我们希望在需要更多控制时同时提供一个高层 API 和一个低层 API。当前计划如下：

* 高层 API -
  基于 [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
  的 API，构建于 [undici](https://www.npmjs.com/package/undici) 之上。
* 低层 API - [undici](https://www.npmjs.com/package/undici) 暴露的 API 子集。  
  这些 API 的具体形态和集合仍有待确定。当前计划是将 undici 引入 Node.js
  core，但不在 Node.js API 中暴露其 API，这样它最初可以用于支持更高层的
  基于 Fetch 的 API。随着这一方案逐步明确，我们将讨论在 Node.js
  API 表面中暴露哪些 API。

### 服务器 API

对于服务器 API，除了希望它们与为客户端构建的 API 保持一致之外，我们目前还没有明确的路径。

### HTTP、HTTPS

[HTTP](https://nodejs.org/docs/latest/api/http.html)
和 [HTTPS](https://nodejs.org/docs/latest/api/https.html) API 的底层实现
维护在 [llhttp](https://github.com/nodejs/llhttp)
仓库中。更新会按需引入到 Node.js 的
[deps/llhttp](https://github.com/nodejs/node/tree/HEAD/deps/llhttp) 下。

### HTTP2

[HTTP2](https://nodejs.org/docs/latest/api/http2.html)
的底层实现基于 [nghttp2](https://nghttp2.org/)。
更新会按需引入到 Node.js 的
[deps/nghttp2](https://github.com/nodejs/node/tree/HEAD/deps/nghttp2) 下。

底层实现通过 [lib](https://github.com/nodejs/node/tree/HEAD/lib)
目录中的 JavaScript 代码以及
[src](https://github.com/nodejs/node/tree/HEAD/src) 目录中的 C++ 代码在 Node.js API 中提供。
