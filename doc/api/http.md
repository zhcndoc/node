# HTTP

<!--introduced_in=v0.10.0-->

> 稳定性：2 - 稳定

<!-- source_link=lib/http.js -->

此模块包含客户端和服务器，可通过 `require('node:http')` (CommonJS) 或 `import * as http from 'node:http'` (ES 模块) 导入。

Node.js 中的 HTTP 接口旨在支持该协议的许多传统上难以使用的功能。
特别是大型的、可能分块编码的消息。该接口谨慎地从不缓冲整个请求或响应，以便
用户能够流式传输数据。

HTTP 消息头由如下对象表示：

```json
{ "content-length": "123",
  "content-type": "text/plain",
  "connection": "keep-alive",
  "host": "example.com",
  "accept": "*/*" }
```

键为小写。值不会被修改。

为了支持各种可能的 HTTP 应用，Node.js
HTTP API 非常底层。它仅处理流处理和消息
解析。它将消息解析为头和主体，但不
解析实际的头或主体。

详见 [`message.headers`][] 了解如何处理重复头的详情。

接收到的原始头信息保留在 `rawHeaders`
属性中，它是一个 `[key, value, key2, value2, ...]` 数组。例如，
前面的消息头对象可能具有如下 `rawHeaders`
列表：

```json
[ "ConTent-Length", "123456",
  "content-LENGTH", "123",
  "content-type", "text/plain",
  "CONNECTION", "keep-alive",
  "Host", "example.com",
  "accepT", "*/*" ]
```

## 类：`http.Agent`

<!-- YAML
added: v0.3.4
changes:
  - version:
    - v24.7.0
    - v22.20.0
    pr-url: https://github.com/nodejs/node/pull/59315
    description: "添加对 `agentKeepAliveTimeoutBuffer` 的支持。"
  - version:
    - v24.5.0
    - v22.21.0
    pr-url: https://github.com/nodejs/node/pull/58980
    description: "添加对 `proxyEnv` 的支持。"
  - version:
    - v24.5.0
    - v22.21.0
    pr-url: https://github.com/nodejs/node/pull/58980
    description: "添加对 `defaultPort` 和 `protocol` 的支持。"
  - version:
      - v15.6.0
      - v14.17.0
    pr-url: https://github.com/nodejs/node/pull/36685
    description: 将默认调度从 'fifo' 更改为 'lifo'。
  - version:
    - v14.5.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/33617
    description: "向 agent 构造函数添加 `maxTotalSockets` 选项。"
  - version:
      - v14.5.0
      - v12.20.0
    pr-url: https://github.com/nodejs/node/pull/33278
    description: "添加 `scheduling` 选项以指定空闲套接字调度策略。"
-->

* `options` {Object} 要在 agent 上设置的可配置选项集。
  可以包含以下字段：
  * `keepAlive` {boolean} 即使没有
    未完成的请求也保留套接字，以便它们可用于未来的请求而
    无需重新建立 TCP 连接。不要与
    `Connection` 头的 `keep-alive` 值混淆。使用 agent 时始终发送
    `Connection: keep-alive` 头，除非显式指定了 `Connection`
    头，或者当 `keepAlive` 和 `maxSockets`
    选项分别设置为 `false` 和 `Infinity` 时，在这种情况下
    将使用 `Connection: close`。**默认值：** `false`。
  * `keepAliveMsecs` {number} 当使用 `keepAlive` 选项时，指定
    TCP Keep-Alive 数据包的 [初始延迟][]。
    当 `keepAlive` 选项为 `false` 或
    `undefined` 时忽略。**默认值：** `1000`。
  * `agentKeepAliveTimeoutBuffer` {number} 在确定套接字
    过期时间时，从服务器提供的 `keep-alive: timeout=...` 提示中减去的毫秒数。
    此缓冲区有助于确保 agent 在服务器之前稍微关闭套接字，
    减少在即将被服务器关闭的套接字上发送请求的几率。
    **默认值：** `1000`。
  * `maxSockets` {number} 允许每个主机的最大套接字数。
    如果同一主机打开多个并发连接，每个请求
    将使用新套接字，直到达到 `maxSockets` 值。
    如果主机尝试打开超过 `maxSockets` 的连接，
    额外的请求将进入待处理请求队列，并在现有连接终止时
    进入活动连接状态。
    这确保在任何时间点，给定主机最多有 `maxSockets` 个活动连接。
    **默认值：** `Infinity`。
  * `maxTotalSockets` {number} 允许所有主机的最大套接字总数。
    每个请求将使用一个新套接字，
    直到达到最大值。
    **默认值：** `Infinity`。
  * `maxFreeSockets` {number} 每个主机保持在空闲状态的最大套接字数。
    仅当 `keepAlive` 设置为 `true` 时相关。
    **默认值：** `256`。
  * `scheduling` {string} 选择下一个可用套接字时应用的调度策略。
    可以是 `'fifo'` 或 `'lifo'`。
    两种调度策略的主要区别在于 `'lifo'`
    选择最近使用的套接字，而 `'fifo'` 选择
    最久未使用的套接字。
    在每秒请求率较低的情况下，`'lifo'` 调度
    将降低选择可能因不活动而被服务器关闭的套接字的风险。
    在每秒请求率较高的情况下，
    `'fifo'` 调度将最大化打开套接字的数量，
    而 `'lifo'` 调度将使其保持尽可能低。
    **默认值：** `'lifo'`。
  * `timeout` {number} 套接字超时时间（毫秒）。
    这将在创建套接字时设置超时。
  * `proxyEnv` {Object|undefined} 用于代理配置的环境变量。
    详见 [内置代理支持][]。**默认值：** `undefined`
    * `HTTP_PROXY` {string|undefined} HTTP 请求应使用的代理服务器 URL。
      如果为 undefined，HTTP 请求不使用代理。
    * `HTTPS_PROXY` {string|undefined} HTTPS 请求应使用的代理服务器 URL。
      如果为 undefined，HTTPS 请求不使用代理。
    * `NO_PROXY` {string|undefined} 指定不应通过代理路由的端点的模式。
    * `http_proxy` {string|undefined} 与 `HTTP_PROXY` 相同。如果两者都设置，`http_proxy` 优先。
    * `https_proxy` {string|undefined} 与 `HTTPS_PROXY` 相同。如果两者都设置，`https_proxy` 优先。
    * `no_proxy` {string|undefined} 与 `NO_PROXY` 相同。如果两者都设置，`no_proxy` 优先。
  * `defaultPort` {number} 当请求中未指定端口时使用的默认端口。**默认值：** `80`。
  * `protocol` {string} agent 使用的协议。**默认值：** `'http:'`。

[`socket.connect()`][] 中的 `options` 也受支持。

要配置其中任何一项，必须创建自定义 [`http.Agent`][] 实例。

```mjs
import { Agent, request } from 'node:http';
const keepAliveAgent = new Agent({ keepAlive: true });
options.agent = keepAliveAgent;
request(options, onResponseCallback);
```

```cjs
const http = require('node:http');
const keepAliveAgent = new http.Agent({ keepAlive: true });
options.agent = keepAliveAgent;
http.request(options, onResponseCallback);
```

### `new Agent([options])`

<!-- YAML
added: v0.3.4
changes:
  - version:
    - v24.7.0
    - v22.20.0
    pr-url: https://github.com/nodejs/node/pull/59315
    description: "添加对 `agentKeepAliveTimeoutBuffer` 的支持。"
  - version:
    - v24.5.0
    - v22.21.0
    pr-url: https://github.com/nodejs/node/pull/58980
    description: "添加对 `proxyEnv` 的支持。"
  - version:
    - v24.5.0
    - v22.21.0
    pr-url: https://github.com/nodejs/node/pull/58980
    description: "添加对 `defaultPort` 和 `protocol` 的支持。"
  - version:
      - v15.6.0
      - v14.17.0
    pr-url: https://github.com/nodejs/node/pull/36685
    description: 将默认调度从 'fifo' 更改为 'lifo'。
  - version:
    - v14.5.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/33617
    description: "向 agent 构造函数添加 `maxTotalSockets` 选项。"
  - version:
      - v14.5.0
      - v12.20.0
    pr-url: https://github.com/nodejs/node/pull/33278
    description: "添加 `scheduling` 选项以指定空闲套接字调度策略。"
-->

* `options` {Object} 要在 agent 上设置的可配置选项集。
  可以包含以下字段：
  * `keepAlive` {boolean} 即使没有
    未完成的请求也保留套接字，以便它们可用于未来的请求而
    无需重新建立 TCP 连接。不要与
    `Connection` 头的 `keep-alive` 值混淆。使用 agent 时始终发送
    `Connection: keep-alive` 头，除非显式指定了 `Connection`
    头，或者当 `keepAlive` 和 `maxSockets`
    选项分别设置为 `false` 和 `Infinity` 时，在这种情况下
    将使用 `Connection: close`。**默认值：** `false`。
  * `keepAliveMsecs` {number} 当使用 `keepAlive` 选项时，指定
    TCP Keep-Alive 数据包的 [初始延迟][]。
    当 `keepAlive` 选项为 `false` 或
    `undefined` 时忽略。**默认值：** `1000`。
  * `agentKeepAliveTimeoutBuffer` {number} 在确定套接字
    过期时间时，从服务器提供的 `keep-alive: timeout=...` 提示中减去的毫秒数。
    此缓冲区有助于确保 agent 在服务器之前稍微关闭套接字，
    减少在即将被服务器关闭的套接字上发送请求的几率。
    **默认值：** `1000`。
  * `maxSockets` {number} 允许每个主机的最大套接字数。
    如果同一主机打开多个并发连接，每个请求
    将使用新套接字，直到达到 `maxSockets` 值。
    如果主机尝试打开超过 `maxSockets` 的连接，
    额外的请求将进入待处理请求队列，并在现有连接终止时
    进入活动连接状态。
    这确保在任何时间点，给定主机最多有 `maxSockets` 个活动连接。
    **默认值：** `Infinity`。
  * `maxTotalSockets` {number} 允许所有主机的最大套接字总数。
    每个请求将使用一个新套接字，
    直到达到最大值。
    **默认值：** `Infinity`。
  * `maxFreeSockets` {number} 每个主机保持在空闲状态的最大套接字数。
    仅当 `keepAlive` 设置为 `true` 时相关。
    **默认值：** `256`。
  * `scheduling` {string} 选择下一个可用套接字时应用的调度策略。
    可以是 `'fifo'` 或 `'lifo'`。
    两种调度策略的主要区别在于 `'lifo'`
    选择最近使用的套接字，而 `'fifo'` 选择
    最久未使用的套接字。
    在每秒请求率较低的情况下，`'lifo'` 调度
    将降低选择可能因不活动而被服务器关闭的套接字的风险。
    在每秒请求率较高的情况下，
    `'fifo'` 调度将最大化打开套接字的数量，
    而 `'lifo'` 调度将使其保持尽可能低。
    **默认值：** `'lifo'`。
  * `timeout` {number} 套接字超时时间（毫秒）。
    这将在创建套接字时设置超时。
  * `proxyEnv` {Object|undefined} 用于代理配置的环境变量。
    详见 [内置代理支持][]。**默认值：** `undefined`
    * `HTTP_PROXY` {string|undefined} HTTP 请求应使用的代理服务器 URL。
      如果为 undefined，HTTP 请求不使用代理。
    * `HTTPS_PROXY` {string|undefined} HTTPS 请求应使用的代理服务器 URL。
      如果为 undefined，HTTPS 请求不使用代理。
    * `NO_PROXY` {string|undefined} 指定不应通过代理路由的端点的模式。
    * `http_proxy` {string|undefined} 与 `HTTP_PROXY` 相同。如果两者都设置，`http_proxy` 优先。
    * `https_proxy` {string|undefined} 与 `HTTPS_PROXY` 相同。如果两者都设置，`https_proxy` 优先。
    * `no_proxy` {string|undefined} 与 `NO_PROXY` 相同。如果两者都设置，`no_proxy` 优先。
  * `defaultPort` {number} 当请求中未指定端口时使用的默认端口。**默认值：** `80`。
  * `protocol` {string} agent 使用的协议。**默认值：** `'http:'`。

[`socket.connect()`][] 中的 `options` 也受支持。

要配置其中任何一项，必须创建自定义 [`http.Agent`][] 实例。

```mjs
import { Agent, request } from 'node:http';
const keepAliveAgent = new Agent({ keepAlive: true });
options.agent = keepAliveAgent;
request(options, onResponseCallback);
```

```cjs
const http = require('node:http');
const keepAliveAgent = new http.Agent({ keepAlive: true });
options.agent = keepAliveAgent;
http.request(options, onResponseCallback);
```

### `agent.createConnection(options[, callback])`

<!-- YAML
added: v0.11.4
-->

* `options` {Object} 包含连接详情的选项。检查
  [`net.createConnection()`][] 了解选项的格式。对于自定义 agent，
  此对象传递给自定义 `createConnection` 函数。
* `callback` {Function} （可选，主要用于自定义 agent）当套接字
  创建时由自定义 `createConnection` 实现调用的函数，
  特别是对于异步操作。
  * `err` {Error | null} 如果套接字创建失败则为错误对象。
  * `socket` {stream.Duplex} 创建的套接字。
* 返回：{stream.Duplex} 创建的套接字。这是由默认
  实现或自定义同步 `createConnection` 实现返回的。
  如果自定义 `createConnection` 使用 `callback` 进行异步
  操作，此返回值可能不是获取套接字的主要方式。

产生一个用于 HTTP 请求的套接字/流。

默认情况下，此函数的行为与 [`net.createConnection()`][] 完全相同，
同步返回创建的套接字。签名中的可选 `callback` 参数**不**被此默认实现使用。

然而，自定义 agent 可以重写此方法以提供更大的灵活性，
例如，异步创建套接字。当重写 `createConnection` 时：

1. **同步套接字创建**：重写的方法可以直接返回
   套接字/流。
2. **异步套接字创建**：重写的方法可以接受 `callback`
   并将创建的套接字/流传递给它（例如，`callback(null, newSocket)`）。
   如果在套接字创建期间发生错误，应将其作为第一个
   参数传递给 `callback`（例如，`callback(err)`）。

agent 将使用 `options` 和此内部 `callback` 调用提供的 `createConnection` 函数。
agent 提供的 `callback` 的签名为 `(err, stream)`。

### `agent.keepSocketAlive(socket)`

<!-- YAML
added: v8.1.0
-->

* `socket` {stream.Duplex}

当 `socket` 从请求分离并可由
`Agent` 持久化时调用。默认行为是：

```js
socket.setKeepAlive(true, this.keepAliveMsecs);
socket.unref();
return true;
```

此方法可被特定的 `Agent` 子类重写。如果此
方法返回假值，套接字将被销毁而不是持久化
以供下一个请求使用。

`socket` 参数可以是 {net.Socket} 的实例，即
{stream.Duplex} 的子类。

### `agent.reuseSocket(socket, request)`

<!-- YAML
added: v8.1.0
-->

* `socket` {stream.Duplex}
* `request` {http.ClientRequest}

当 `socket` 因 keep-alive 选项而被持久化后附加到 `request` 时调用。
默认行为是：

```js
socket.ref();
```

此方法可被特定的 `Agent` 子类重写。

`socket` 参数可以是 {net.Socket} 的实例，即
{stream.Duplex} 的子类。

### `agent.destroy()`

<!-- YAML
added: v0.11.4
-->

销毁 agent 当前使用的任何套接字。

通常不需要这样做。但是，如果使用启用了
`keepAlive` 的 agent，则最好在不再需要时显式关闭
agent。否则，
套接字可能会在服务器终止它们之前保持打开很长时间。

### `agent.freeSockets`

<!-- YAML
added: v0.11.4
changes:
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/36409
    description: "该属性现在具有 `null` 原型。"
-->

* 类型：{Object}

当 `keepAlive` 启用时，包含 agent 当前等待使用的套接字数组的对象。
请勿修改。

`freeSockets` 列表中的套接字将在 `'timeout'` 时自动销毁并
从数组中移除。

### `agent.getName([options])`

<!-- YAML
added: v0.11.4
changes:
  - version:
    - v17.7.0
    - v16.15.0
    pr-url: https://github.com/nodejs/node/pull/41906
    description: "`options` 参数现在是可选的。"
-->

* `options` {Object} 提供名称生成信息的一组选项
  * `host` {string} 发出请求的服务器的域名或 IP 地址
  * `port` {number} 远程服务器的端口
  * `localAddress` {string} 发出请求时绑定网络连接的本机接口
  * `family` {integer} 如果不等于 `undefined`，则必须为 4 或 6。
* 返回：{string}

获取一组请求选项的唯一名称，以确定连接
是否可以复用。对于 HTTP agent，这将返回
`host:port:localAddress` 或 `host:port:localAddress:family`。对于 HTTPS agent，
名称包括 CA、cert、ciphers 和其他决定套接字可复用性的
HTTPS/TLS 特定选项。

### `agent.maxFreeSockets`

<!-- YAML
added: v0.11.7
-->

* 类型：{number}

默认设置为 256。对于启用了 `keepAlive` 的 agent，这
设置了将保持在空闲状态的最大套接字数。

### `agent.maxSockets`

<!-- YAML
added: v0.3.6
-->

* 类型：{number}

默认设置为 `Infinity`。确定 agent
每个源可以打开多少个并发套接字。源是 [`agent.getName()`][] 的返回值。

### `agent.maxTotalSockets`

<!-- YAML
added:
  - v14.5.0
  - v12.19.0
-->

* 类型：{number}

默认设置为 `Infinity`。确定 agent
可以打开多少个并发套接字。与 `maxSockets` 不同，此参数适用于所有源。

### `agent.requests`

<!-- YAML
added: v0.5.9
changes:
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/36409
    description: "该属性现在具有 `null` 原型。"
-->

* 类型：{Object}

包含尚未分配给
套接字的请求队列的对象。请勿修改。

### `agent.sockets`

<!-- YAML
added: v0.3.6
changes:
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/36409
    description: "该属性现在具有 `null` 原型。"
-->

* 类型：{Object}

包含 agent 当前使用的套接字数组的对象。
请勿修改。

## 类：`http.ClientRequest`

<!-- YAML
added: v0.1.17
-->

* 继承：{http.OutgoingMessage}

此对象在内部创建并从 [`http.request()`][] 返回。它表示一个_进行中_的请求，其头部已入队。头部仍然可以使用 [`setHeader(name, value)`][]、[`getHeader(name)`][]、[`removeHeader(name)`][] API 进行可变操作。实际头部将随第一个数据块一起发送，或在调用 [`request.end()`][] 时发送。

要获取响应，请为请求对象添加 [`'response'`][] 监听器。当收到响应头部时，[`'response'`][] 将从请求对象触发。[`'response'`][] 事件执行时带有一个参数，该参数是 [`http.IncomingMessage`][] 的实例。

在 [`'response'`][] 事件期间，可以向响应对象添加监听器；特别是监听 `'data'` 事件。

如果没有添加 [`'response'`][] 处理程序，则响应将被完全丢弃。但是，如果添加了 [`'response'`][] 事件处理程序，则**必须**消费来自响应对象的数据，要么在有 `'readable'` 事件时调用 `response.read()`，要么添加 `'data'` 处理程序，要么调用 `.resume()` 方法。在数据被消费之前，`'end'` 事件不会触发。此外，在数据被读取之前，它将消耗内存，最终可能导致 '进程内存溢出' 错误。

为了向后兼容，只有在注册了 `'error'` 监听器的情况下，`res` 才会触发 `'error'`。

设置 `Content-Length` 头部以限制响应体大小。如果 [`response.strictContentLength`][] 设置为 `true`，`Content-Length` 头部值不匹配将导致抛出 `Error`，标识为 `code:` [`'ERR_HTTP_CONTENT_LENGTH_MISMATCH'`][]。

`Content-Length` 值应为字节数，而非字符数。使用 [`Buffer.byteLength()`][] 来确定主体的字节长度。

### 事件：`'abort'`

<!-- YAML
added: v1.4.1
deprecated:
  - v17.0.0
  - v16.12.0
-->

> 稳定性：0 - 已废弃。请改为监听 `'close'` 事件。

当请求被客户端中止时触发。此事件仅在第一次调用 `abort()` 时触发。

### 事件：`'close'`

<!-- YAML
added: v0.5.4
-->

表示请求已完成，或其底层连接在响应完成之前被提前终止。

### 事件：`'connect'`

<!-- YAML
added: v0.7.0
-->

* `response` {http.IncomingMessage}
* `socket` {stream.Duplex}
* `head` {Buffer}

每当服务器响应带有 `CONNECT` 方法的请求时触发。如果没有监听此事件，接收 `CONNECT` 方法的客户端的连接将被关闭。

除非用户指定了 {net.Socket} 以外的 socket 类型，否则保证此事件会传递一个 {net.Socket} 类的实例，它是 {stream.Duplex} 的子类。

演示如何监听 `'connect'` 事件的客户端和服务器配对示例：

```mjs
import { createServer, request } from 'node:http';
import { connect } from 'node:net';
import { URL } from 'node:url';

// 创建一个 HTTP 隧道代理
const proxy = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('okay');
});
proxy.on('connect', (req, clientSocket, head) => {
  // 连接到源服务器
  const { port, hostname } = new URL(`http://${req.url}`);
  const serverSocket = connect(port || 80, hostname, () => {
    clientSocket.write('HTTP/1.1 200 Connection Established\r\n' +
                    'Proxy-agent: Node.js-Proxy\r\n' +
                    '\r\n');
    serverSocket.write(head);
    serverSocket.pipe(clientSocket);
    clientSocket.pipe(serverSocket);
  });
});

// 现在代理正在运行
proxy.listen(1337, '127.0.0.1', () => {

  // 向隧道代理发出请求
  const options = {
    port: 1337,
    host: '127.0.0.1',
    method: 'CONNECT',
    path: 'www.google.com:80',
  };

  const req = request(options);
  req.end();

  req.on('connect', (res, socket, head) => {
    console.log('已连接！');

    // 通过 HTTP 隧道发出请求
    socket.write('GET / HTTP/1.1\r\n' +
                 'Host: www.google.com:80\r\n' +
                 'Connection: close\r\n' +
                 '\r\n');
    socket.on('data', (chunk) => {
      console.log(chunk.toString());
    });
    socket.on('end', () => {
      proxy.close();
    });
  });
});
```

```cjs
const http = require('node:http');
const net = require('node:net');
const { URL } = require('node:url');

// 创建一个 HTTP 隧道代理
const proxy = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('okay');
});
proxy.on('connect', (req, clientSocket, head) => {
  // 连接到源服务器
  const { port, hostname } = new URL(`http://${req.url}`);
  const serverSocket = net.connect(port || 80, hostname, () => {
    clientSocket.write('HTTP/1.1 200 Connection Established\r\n' +
                    'Proxy-agent: Node.js-Proxy\r\n' +
                    '\r\n');
    serverSocket.write(head);
    serverSocket.pipe(clientSocket);
    clientSocket.pipe(serverSocket);
  });
});

// 现在代理正在运行
proxy.listen(1337, '127.0.0.1', () => {

  // 向隧道代理发出请求
  const options = {
    port: 1337,
    host: '127.0.0.1',
    method: 'CONNECT',
    path: 'www.google.com:80',
  };

  const req = http.request(options);
  req.end();

  req.on('connect', (res, socket, head) => {
    console.log('已连接！');

    // 通过 HTTP 隧道发出请求
    socket.write('GET / HTTP/1.1\r\n' +
                 'Host: www.google.com:80\r\n' +
                 'Connection: close\r\n' +
                 '\r\n');
    socket.on('data', (chunk) => {
      console.log(chunk.toString());
    });
    socket.on('end', () => {
      proxy.close();
    });
  });
});
```

### 事件：`'continue'`

<!-- YAML
added: v0.3.2
-->

当服务器发送 '100 Continue' HTTP 响应时触发，通常是因为请求包含 'Expect: 100-continue'。这是一个指示客户端发送请求体的指令。

### 事件：`'finish'`

<!-- YAML
added: v0.3.6
-->

当请求已发送时触发。更具体地说，当请求头部和主体的最后一段已移交操作系统以便通过网络传输时，会触发此事件。这并不意味着服务器已经收到了任何内容。

### 事件：`'information'`

<!-- YAML
added: v10.0.0
-->

* `info` {Object}
  * `httpVersion` {string}
  * `httpVersionMajor` {integer}
  * `httpVersionMinor` {integer}
  * `statusCode` {integer}
  * `statusMessage` {string}
  * `headers` {Object}
  * `rawHeaders` {string\[]}

当服务器发送 1xx 中间响应时触发（不包括 101 Upgrade）。此事件的监听器将接收一个对象，其中包含 HTTP 版本、状态码、状态消息、键值头部对象，以及包含原始头部名称及其各自值的数组。

```mjs
import { request } from 'node:http';

const options = {
  host: '127.0.0.1',
  port: 8080,
  path: '/length_request',
};

// 发出请求
const req = request(options);
req.end();

req.on('information', (info) => {
  console.log(`在主响应之前收到信息：${info.statusCode}`);
});
```

```cjs
const http = require('node:http');

const options = {
  host: '127.0.0.1',
  port: 8080,
  path: '/length_request',
};

// 发出请求
const req = http.request(options);
req.end();

req.on('information', (info) => {
  console.log(`在主响应之前收到信息：${info.statusCode}`);
});
```

101 Upgrade 状态不会触发此事件，因为它们打破了传统的 HTTP 请求/响应链，例如 web sockets、原地 TLS 升级或 HTTP 2.0。要接收 101 Upgrade 通知，请改为监听 [`'upgrade'`][] 事件。

### 事件：`'response'`

<!-- YAML
added: v0.1.0
-->

* `response` {http.IncomingMessage}

当收到此请求的响应时触发。此事件仅触发一次。

### 事件：`'socket'`

<!-- YAML
added: v0.5.3
-->

* `socket` {stream.Duplex}

除非用户指定了 {net.Socket} 以外的 socket 类型，否则保证此事件会传递一个 {net.Socket} 类的实例，它是 {stream.Duplex} 的子类。

### 事件：`'timeout'`

<!-- YAML
added: v0.7.8
-->

当底层 socket 因无活动而超时时触发。这仅通知 socket 处于空闲状态。必须手动销毁请求。

另见：[`request.setTimeout()`][]。

### 事件：`'upgrade'`

<!-- YAML
added: v0.1.94
-->

* `response` {http.IncomingMessage}
* `stream` {stream.Duplex}
* `head` {Buffer}

每当服务器响应带有升级的请求时触发。如果没有监听此事件且响应状态码为 101 Switching Protocols，接收升级头部的客户端的连接将被关闭。

除非用户指定了 {net.Socket} 以外的 socket 类型，否则保证此事件会传递一个 {net.Socket} 类的实例，它是 {stream.Duplex} 的子类。

演示如何监听 `'upgrade'` 事件的客户端服务器配对示例。

```mjs
import http from 'node:http';
import process from 'node:process';

// 创建一个 HTTP 服务器
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('okay');
});
server.on('upgrade', (req, stream, head) => {
  stream.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
               'Upgrade: WebSocket\r\n' +
               'Connection: Upgrade\r\n' +
               '\r\n');

  stream.pipe(stream); // 回显
});

// 现在服务器正在运行
server.listen(1337, '127.0.0.1', () => {

  // 发出请求
  const options = {
    port: 1337,
    host: '127.0.0.1',
    headers: {
      'Connection': 'Upgrade',
      'Upgrade': 'websocket',
    },
  };

  const req = http.request(options);
  req.end();

  req.on('upgrade', (res, stream, upgradeHead) => {
    console.log('已升级！');
    stream.end();
    process.exit(0);
  });
});
```

```cjs
const http = require('node:http');

// 创建一个 HTTP 服务器
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('okay');
});
server.on('upgrade', (req, stream, head) => {
  stream.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
               'Upgrade: WebSocket\r\n' +
               'Connection: Upgrade\r\n' +
               '\r\n');

  stream.pipe(stream); // 回显
});

// 现在服务器正在运行
server.listen(1337, '127.0.0.1', () => {

  // 发出请求
  const options = {
    port: 1337,
    host: '127.0.0.1',
    headers: {
      'Connection': 'Upgrade',
      'Upgrade': 'websocket',
    },
  };

  const req = http.request(options);
  req.end();

  req.on('upgrade', (res, stream, upgradeHead) => {
    console.log('已升级！');
    stream.end();
    process.exit(0);
  });
});
```

### `request.abort()`

<!-- YAML
added: v0.3.8
deprecated:
  - v14.1.0
  - v13.14.0
-->

> 稳定性：0 - 已废弃：请改用 [`request.destroy()`][]。

将请求标记为中止。调用此方法将导致响应中的剩余数据被丢弃并且 socket 被销毁。

### `request.aborted`

<!-- YAML
added: v0.11.14
deprecated:
  - v17.0.0
  - v16.12.0
changes:
  - version: v11.0.0
    pr-url: https://github.com/nodejs/node/pull/20230
    description: "`aborted` 属性不再是一个时间戳数字。"
-->

> 稳定性：0 - 已废弃。请改用检查 [`request.destroyed`][]。

* 类型：{boolean}

如果请求已被中止，则 `request.aborted` 属性将为 `true`。

### `request.connection`

<!-- YAML
added: v0.3.0
deprecated: v13.0.0
-->

> 稳定性：0 - 已废弃。请使用 [`request.socket`][]。

* 类型：{stream.Duplex}

参见 [`request.socket`][]。

### `request.cork()`

<!-- YAML
added:
 - v13.2.0
 - v12.16.0
-->

参见 [`writable.cork()`][]。

### `request.end([data[, encoding]][, callback])`

<!-- YAML
added: v0.1.90
changes:
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/33155
    description: "`data` 参数现在可以是 `Uint8Array`。"
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18780
    description: "此方法现在返回对 `ClientRequest` 的引用。"
-->

* `data` {string|Buffer|Uint8Array}
* `encoding` {string}
* `callback` {Function}
* 返回：{this}

完成发送请求。如果主体的任何部分未发送，它将把它们冲刷到流中。如果请求是分块的，这将发送终止符 `'0\r\n\r\n'`。

如果指定了 `data`，则相当于调用 [`request.write(data, encoding)`][] 后跟 [`request.end(callback)`]。

如果指定了 `callback`，它将在请求流完成时被调用。

### `request.destroy([error])`

<!-- YAML
added: v0.3.0
changes:
  - version: v14.5.0
    pr-url: https://github.com/nodejs/node/pull/32789
    description: "为了与其他 Readable 流保持一致，该函数返回 `this`。"
-->

* `error` {Error} 可选，一个随 `'error'` 事件触发的错误。
* 返回：{this}

销毁请求。可选择触发 `'error'` 事件，并触发 `'close'` 事件。调用此方法会导致响应中的剩余数据被丢弃，并在使用了 socket 时销毁 socket；否则在可能的情况下将其返回到相应的 Agent 池。

详见 [`writable.destroy()`][]。

#### `request.destroyed`

<!-- YAML
added:
  - v14.1.0
  - v13.14.0
-->

* 类型：{boolean}

在调用 [`request.destroy()`][] 后为 `true`。

详见 [`writable.destroyed`][]。

### `request.finished`

<!-- YAML
added: v0.0.1
deprecated:
 - v13.4.0
 - v12.16.0
-->

> 稳定性：0 - 已废弃。请使用 [`request.writableEnded`][]。

* 类型：{boolean}

如果调用了 [`request.end()`][]，`request.finished` 属性将为 `true`。如果请求是通过 [`http.get()`][] 发起的，`request.end()` 将被自动调用。

### `request.flushHeaders()`

<!-- YAML
added: v1.6.0
-->

冲刷请求头部。

出于效率原因，Node.js 通常缓冲请求头部，直到调用 `request.end()` 或写入第一块请求数据。然后它尝试将请求头部和数据打包到单个 TCP 数据包中。

这通常是理想的（它节省了一次 TCP 往返），但当第一块数据直到可能更晚的时候才发送时则不然。`request.flushHeaders()` 绕过优化并启动请求。

### `request.getHeader(name)`

<!-- YAML
added: v1.6.0
-->

* `name` {string}
* 返回：{any}

读取请求上的一个头部。名称不区分大小写。返回值的类型取决于提供给 [`request.setHeader()`][] 的参数。

```js
request.setHeader('content-type', 'text/html');
request.setHeader('Content-Length', Buffer.byteLength(body));
request.setHeader('Cookie', ['type=ninja', 'language=javascript']);
const contentType = request.getHeader('Content-Type');
// 'contentType' 是 'text/html'
const contentLength = request.getHeader('Content-Length');
// 'contentLength' 是 number 类型
const cookie = request.getHeader('Cookie');
// 'cookie' 是 string[] 类型
```

### `request.getHeaderNames()`

<!-- YAML
added: v7.7.0
-->

* 返回：{string\[]}

返回一个包含当前传出头部唯一名称的数组。所有头部名称均为小写。

```js
request.setHeader('Foo', 'bar');
request.setHeader('Cookie', ['foo=bar', 'bar=baz']);

const headerNames = request.getHeaderNames();
// headerNames === ['foo', 'cookie']
```

### `request.getHeaders()`

<!-- YAML
added: v7.7.0
-->

* 返回：{Object}

返回当前传出头部的浅拷贝。由于使用了浅拷贝，数组值可能会被变更，而无需额外调用各种头部相关的 http 模块方法。返回对象的键是头部名称，值是相应的头部值。所有头部名称均为小写。

`request.getHeaders()` 方法返回的对象 _不_ 原型继承自 JavaScript `Object`。这意味着典型的 `Object` 方法（如 `obj.toString()`、`obj.hasOwnProperty()` 等）未定义且 _将无法工作_。

```js
request.setHeader('Foo', 'bar');
request.setHeader('Cookie', ['foo=bar', 'bar=baz']);

const headers = request.getHeaders();
// headers === { foo: 'bar', 'cookie': ['foo=bar', 'bar=baz'] }
```

### `request.getRawHeaderNames()`

<!-- YAML
added:
  - v15.13.0
  - v14.17.0
-->

* 返回：{string\[]}

返回一个包含当前传出原始头部唯一名称的数组。头部名称返回时保留其设置的确切大小写形式。

```js
request.setHeader('Foo', 'bar');
request.setHeader('Set-Cookie', ['foo=bar', 'bar=baz']);

const headerNames = request.getRawHeaderNames();
// headerNames === ['Foo', 'Set-Cookie']
```

### `request.hasHeader(name)`

<!-- YAML
added: v7.7.0
-->

* `name` {string}
* 返回：{boolean}

如果由 `name` 标识的头部当前已设置在传出头部中，则返回 `true`。头部名称匹配不区分大小写。

```js
const hasContentType = request.hasHeader('content-type');
```

### `request.maxHeadersCount`

* 类型：{number} **默认：** `2000`

限制最大响应头部数量。如果设置为 0，则不应用限制。

### `request.path`

<!-- YAML
added: v0.4.0
-->

* 类型：{string} 请求路径。

### `request.method`

<!-- YAML
added: v0.1.97
-->

* 类型：{string} 请求方法。

### `request.host`

<!-- YAML
added:
  - v14.5.0
  - v12.19.0
-->

* 类型：{string} 请求主机。

### `request.protocol`

<!-- YAML
added:
  - v14.5.0
  - v12.19.0
-->

* 类型：{string} 请求协议。

### `request.removeHeader(name)`

<!-- YAML
added: v1.6.0
-->

* `name` {string}

移除已在头部对象中定义的头部。

```js
request.removeHeader('Content-Type');
```

### `request.reusedSocket`

<!-- YAML
added:
 - v13.0.0
 - v12.16.0
-->

* 类型：{boolean} 请求是否通过重用的 socket 发送。

当通过启用了 keep-alive 的 agent 发送请求时，底层 socket 可能会被重用。但如果服务器在不当时机关闭连接，客户端可能会遇到 'ECONNRESET' 错误。

```mjs
import http from 'node:http';
const agent = new http.Agent({ keepAlive: true });

// 服务器默认有 5 秒的 keep-alive 超时
http
  .createServer((req, res) => {
    res.write('hello\n');
    res.end();
  })
  .listen(3000);

setInterval(() => {
  // 适配一个 keep-alive agent
  http.get('http://localhost:3000', { agent }, (res) => {
    res.on('data', (data) => {
      // 什么都不做
    });
  });
}, 5000); // 每 5 秒发送一次请求，以便容易触发空闲超时
```

```cjs
const http = require('node:http');
const agent = new http.Agent({ keepAlive: true });

// 服务器默认有 5 秒的 keep-alive 超时
http
  .createServer((req, res) => {
    res.write('hello\n');
    res.end();
  })
  .listen(3000);

setInterval(() => {
  // 适配一个 keep-alive agent
  http.get('http://localhost:3000', { agent }, (res) => {
    res.on('data', (data) => {
      // 什么都不做
    });
  });
}, 5000); // 每 5 秒发送一次请求，以便容易触发空闲超时
```

通过标记请求是否重用了 socket，我们可以基于此进行自动错误重试。

```mjs
import http from 'node:http';
const agent = new http.Agent({ keepAlive: true });

function retriableRequest() {
  const req = http
    .get('http://localhost:3000', { agent }, (res) => {
      // ...
    })
    .on('error', (err) => {
      // 检查是否需要重试
      if (req.reusedSocket && err.code === 'ECONNRESET') {
        retriableRequest();
      }
    });
}

retriableRequest();
```

```cjs
const http = require('node:http');
const agent = new http.Agent({ keepAlive: true });

function retriableRequest() {
  const req = http
    .get('http://localhost:3000', { agent }, (res) => {
      // ...
    })
    .on('error', (err) => {
      // 检查是否需要重试
      if (req.reusedSocket && err.code === 'ECONNRESET') {
        retriableRequest();
      }
    });
}

retriableRequest();
```

### `request.setHeader(name, value)`

<!-- YAML
added: v1.6.0
-->

* `name` {string}
* `value` {any}

为头部对象设置单个头部值。如果此头部已存在于待发送的头部中，其值将被替换。此处使用字符串数组来发送多个具有相同名称的头部。非字符串值将未经修改地存储。因此，[`request.getHeader()`][] 可能返回非字符串值。但是，非字符串值将被转换为字符串以便网络传输。

```js
request.setHeader('Content-Type', 'application/json');
```

或

```js
request.setHeader('Cookie', ['type=ninja', 'language=javascript']);
```

当值为字符串时，如果它包含 `latin1` 编码之外的字符，将抛出异常。

如果需要在值中传递 UTF-8 字符，请使用 [RFC 8187][] 标准对值进行编码。

```js
const filename = 'Rock 🎵.txt';
request.setHeader('Content-Disposition', `attachment; filename*=utf-8''${encodeURIComponent(filename)}`);
```

### `request.setNoDelay([noDelay])`

<!-- YAML
added: v0.5.9
-->

* `noDelay` {boolean}

一旦 socket 被分配给此请求并连接，[`socket.setNoDelay()`][] 将被调用。

### `request.setSocketKeepAlive([enable][, initialDelay])`

<!-- YAML
added: v0.5.9
-->

* `enable` {boolean}
* `initialDelay` {number}

一旦 socket 被分配给此请求并连接，[`socket.setKeepAlive()`][] 将被调用。

### `request.setTimeout(timeout[, callback])`

<!-- YAML
added: v0.5.9
changes:
  - version: v9.0.0
    pr-url: https://github.com/nodejs/node/pull/8895
    description: 仅在 socket 连接时一致地设置 socket 超时。
-->

* `timeout` {number} 请求超时前的毫秒数。
* `callback` {Function} 超时发生时调用的可选函数。等同于绑定到 `'timeout'` 事件。
* 返回：{http.ClientRequest}

一旦 socket 被分配给此请求并连接，[`socket.setTimeout()`][] 将被调用。

### `request.socket`

<!-- YAML
added: v0.3.0
-->

* 类型：{stream.Duplex}

指向底层 socket 的引用。通常用户不希望访问此属性。特别是，由于协议解析器附加到 socket 的方式，socket 不会触发 `'readable'` 事件。

```mjs
import http from 'node:http';
const options = {
  host: 'www.google.com',
};
const req = http.get(options);
req.end();
req.once('response', (res) => {
  const ip = req.socket.localAddress;
  const port = req.socket.localPort;
  console.log(`你的 IP 地址是 ${ip}，源端口是 ${port}。`);
  // 消费响应对象
});
```

```cjs
const http = require('node:http');
const options = {
  host: 'www.google.com',
};
const req = http.get(options);
req.end();
req.once('response', (res) => {
  const ip = req.socket.localAddress;
  const port = req.socket.localPort;
  console.log(`你的 IP 地址是 ${ip}，源端口是 ${port}。`);
  // 消费响应对象
});
```

除非用户指定了 {net.Socket} 以外的 socket 类型，否则保证此属性是 {net.Socket} 类的实例，它是 {stream.Duplex} 的子类。

### `request.uncork()`

<!-- YAML
added:
 - v13.2.0
 - v12.16.0
-->

参见 [`writable.uncork()`][]。

### `request.writableEnded`

<!-- YAML
added: v12.9.0
-->

* 类型：{boolean}

在调用 [`request.end()`][] 后为 `true`。此属性不指示数据是否已冲刷，为此请改用 [`request.writableFinished`][]。

### `request.writableFinished`

<!-- YAML
added: v12.7.0
-->

* 类型：{boolean}

如果在 [`'finish'`][] 事件触发之前，所有数据已冲刷到底层系统，则为 `true`。

### `request.write(chunk[, encoding][, callback])`

<!-- YAML
added: v0.1.29
changes:
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/33155
    description: "`chunk` 参数现在可以是 `Uint8Array`。"
-->

* `chunk` {string|Buffer|Uint8Array}
* `encoding` {string}
* `callback` {Function}
* 返回：{boolean}

发送一块主体数据。此方法可以调用多次。如果未设置 `Content-Length`，数据将自动以 HTTP 分块传输编码进行编码，以便服务器知道数据何时结束。将添加 `Transfer-Encoding: chunked` 头部。必须调用 [`request.end()`][] 来完成发送请求。

`encoding` 参数是可选的，仅当 `chunk` 是字符串时适用。默认为 `'utf8'`。

`callback` 参数是可选的，当这块数据被冲刷时将被调用，但仅当这块数据非空时。

如果整个数据成功冲刷到内核缓冲区，则返回 `true`。如果全部或部分数据入队到用户内存，则返回 `false`。当缓冲区再次空闲时，将触发 `'drain'`。

当 `write` 函数使用空字符串或缓冲区调用时，它什么都不做并等待更多输入。

## Class: `http.Server`

<!-- YAML
added: v0.1.17
-->

* Inherits from: {net.Server}

### Event: `'checkContinue'`

<!-- YAML
added: v0.3.0
-->

* `request` {http.IncomingMessage}
* `response` {http.ServerResponse}

Emitted whenever a request with an HTTP `Expect: 100-continue` is received.
If this event is not listened for, the server will automatically respond with
`100 Continue` as appropriate.

Handling this event involves calling [`response.writeContinue()`][] if the client should continue sending the request body, or generating an appropriate
HTTP response (for example, 400 Bad Request) if the client should not continue sending the request body.

Once this event is emitted and handled, the [`'request'`][] event will
not be emitted.

### Event: `'checkExpectation'`

<!-- YAML
added: v5.5.0
-->

* `request` {http.IncomingMessage}
* `response` {http.ServerResponse}

Emitted whenever a request with an HTTP `Expect` header
whose value is not `100-continue` is received. If this event is not listened for, the server will
automatically respond with `417 Expectation Failed` as appropriate.

Once this event is emitted and handled, the [`'request'`][] event will
not be emitted.

### Event: `'clientError'`

<!-- YAML
added: v0.1.94
changes:
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/25605
    description: The default behavior will now return 431 Request Header Fields Too Large when the HPE_HEADER_OVERFLOW error occurs.
  - version: v9.4.0
    pr-url: https://github.com/nodejs/node/pull/17672
    description: "`rawPacket` is the current buffer that was just parsed. Adding this buffer to the error object in the `'clientError'` event is to allow developers to log the malformed packet."
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/4557
    description: "The default behavior of calling `.destroy()` on the `socket` will no longer happen if there are `'clientError'` listeners attached."
-->

* `exception` {Error}
* `socket` {stream.Duplex}

If a client connection emits an `'error'` event, it will be forwarded here.
The listener of this event is responsible for closing/destroying the underlying
socket. For example, it may be preferable to more gracefully close the socket
with a custom HTTP response instead of abruptly severing the connection. The handler must close or destroy the socket before returning.

Unless the user specifies a socket type other than {net.Socket}, this event is guaranteed to pass an instance of the {net.Socket} class,
which is a subclass of {stream.Duplex}.

The default behavior is to try to close the socket with an HTTP `'400 Bad Request'`,
or an HTTP `'431 Request Header Fields Too Large'` if a [`HPE_HEADER_OVERFLOW`][] error occurs. If the socket is not writable, or if the headers of the currently attached [`http.ServerResponse`][] have been sent, it is immediately destroyed.

`socket` is the [`net.Socket`][] object from which the error originated.

```mjs
import http from 'node:http';

const server = http.createServer((req, res) => {
  res.end();
});
server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(8000);
```

```cjs
const http = require('node:http');

const server = http.createServer((req, res) => {
  res.end();
});
server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(8000);
```

When the `'clientError'` event occurs, there is no `request` or `response`
object, so any HTTP response sent, including response headers and payload,
must be written directly to the `socket` object. Care must be taken to ensure that the response is a properly formatted HTTP response message.

`err` is an instance of `Error` and has two additional fields:

* `bytesParsed`: the bytes of request packet that Node.js may have parsed correctly;
* `rawPacket`: the raw packet of the current request.

In some cases, the client has already received the response and/or the socket
has already been destroyed, such as in the case of the `ECONNRESET` error. Before attempting to send data to the socket,
it is best to first check whether it is still writable.

```js
server.on('clientError', (err, socket) => {
  if (err.code === 'ECONNRESET' || !socket.writable) {
    return;
  }

  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
```

### Event: `'close'`

<!-- YAML
added: v0.1.4
-->

Emitted when the server closes.

### Event: `'connect'`

<!-- YAML
added: v0.7.0
-->

* `request` {http.IncomingMessage} HTTP request arguments, as in
  the [`'request'`][] event
* `socket` {stream.Duplex} The network socket between the server and client
* `head` {Buffer} The first packet of the tunnel stream (may be empty)

Emitted whenever a client requests the HTTP `CONNECT` method. If this event
is not listened for, clients requesting the `CONNECT` method will have their
connections closed.

Unless the user specifies a socket type other than {net.Socket}, this event is guaranteed to pass an instance of the {net.Socket} class,
which is a subclass of {stream.Duplex}.

After this event is emitted, the request's socket will no longer have `'data'`
event listeners, meaning that it will need to be bound in order to handle data
sent to the server.

### Event: `'connection'`

<!-- YAML
added: v0.1.0
-->

* `socket` {stream.Duplex}

This event is emitted when a new TCP stream is established. `socket` is
typically an object of type [`net.Socket`][]. Users are not expected to
access this event directly. In particular, the socket will not emit a `'readable'`
event because of how the protocol parser attaches to the socket. The `socket`
can also be accessed using `request.socket`.

Users can explicitly emit this event to inject connections into the HTTP
server. In that case, any [`Duplex`][] stream may be passed.

If `socket.setTimeout()` is called here, the timeout will be replaced with
`server.keepAliveTimeout` after the socket has served a request, if
`server.keepAliveTimeout` is non-zero.

Unless the user specifies a socket type other than {net.Socket}, this event is guaranteed to pass an instance of the {net.Socket} class,
which is a subclass of {stream.Duplex}.

### Event: `'dropRequest'`

<!-- YAML
added:
  - v18.7.0
  - v16.17.0
-->

* `request` {http.IncomingMessage} HTTP request arguments, as in
  the [`'request'`][] event
* `socket` {stream.Duplex} The network socket between the server and client

When the number of requests on a socket reaches
the `server.maxRequestsPerSocket` threshold, the server will drop the new request,
emit the `'dropRequest'` event instead, and send `503` to the client.

### Event: `'request'`

<!-- YAML
added: v0.1.0
-->

* `request` {http.IncomingMessage}
* `response` {http.ServerResponse}

Emitted each time a request is made. There may be multiple requests per
connection (in the case of HTTP Keep-Alive connections).

### Event: `'upgrade'`

<!-- YAML
added: v0.1.94
changes:
  - version: v26.0.0
    pr-url: https://github.com/nodejs/node/pull/60016
    description: "The request body is no longer exposed in raw (unparsed) form on the socket parameter. Instead, if a body was received, the stream parameter will be a duplex stream that emits the socket contents only after the request body, and the parsed request body data will be emitted from request just like the `'request'` event on a regular server."
  - version:
     - v24.9.0
     - v22.21.0
    pr-url: https://github.com/nodejs/node/pull/59824
    description: "Whether this event is now emitted can be controlled by `shouldUpgradeCallback`, and if there are no event handlers listening, the socket will be destroyed on upgrade."
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/19981
    description: "Receiving an Upgrade header from the client will no longer cause the socket to be destroyed when not listening for this event."
-->

* `request` {http.IncomingMessage} HTTP request arguments, as in
  the [`'request'`][] event
* `stream` {stream.Duplex} The upgraded stream between the server and client
* `head` {Buffer} The first packet of the upgraded stream (may be empty)

Emitted each time a client's HTTP upgrade request is accepted. By default,
all HTTP upgrade requests are ignored (that is, only the regular `'request'``
event is emitted, maintaining the normal HTTP request/response flow), unless you
listen for this event, in which case they are all accepted (that is, the `'upgrade'`
event is emitted, after which communication must proceed directly through the original stream). You can use the
server's `shouldUpgradeCallback` option to control this behavior more precisely.

Listening to this event is optional; clients cannot force a protocol
change.

If `shouldUpgradeCallback` accepts the upgrade but no event handler is registered,
the socket will be destroyed, causing the client to close the connection immediately.

In the rare case that the request contains a body, the body will be
parsed normally and separated from the upgraded stream, and the raw stream data
will begin only after it completes. To ensure that reading from the stream is not blocked while waiting for the request body to be read, any read from the stream will automatically start the request body flowing. If you want to read the
request body, be sure to complete it before starting to read from the upgraded stream (that is, attach a `'data'` listener).

The stream parameter is typically the {net.Socket} instance used by the request, but in some cases (for example, when there is a request body), it may be a duplex
stream. If necessary, you can access the underlying raw connection of the request through [`request.socket`][]; as long as the user has not specified another socket type, that object is guaranteed to be an instance of {net.Socket}.

### `server.close([callback])`

<!-- YAML
added: v0.1.90
changes:
  - version:
      - v19.0.0
    pr-url: https://github.com/nodejs/node/pull/43522
    description: This method closes idle connections before returning.

-->

* `callback` {Function}

Stops the server from accepting new connections and closes all
connections connected to this server that are not sending a request or waiting for
a response.
See [`net.Server.close()`][].

```js
const http = require('node:http');

const server = http.createServer({ keepAliveTimeout: 60000 }, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!',
  }));
});

server.listen(8000);
// Close the server after 10 seconds
setTimeout(() => {
  server.close(() => {
    console.log('Server on port 8000 successfully closed');
  });
}, 10000);
```

### `server.closeAllConnections()`

<!-- YAML
added: v18.2.0
-->

Closes all established HTTP(S) connections connected to this server, including
active connections that are sending a request or waiting for a response. This method _does not_
destroy sockets that have been upgraded to another
protocol, such as WebSocket or HTTP/2.

> This is a way to forcibly close all connections and should be used with caution.
> When used together with `server.close`, it is recommended to call this method _after_ calling `server.close` to avoid race conditions where new connections are created between this call and the `server.close` call.

```js
const http = require('node:http');

const server = http.createServer({ keepAliveTimeout: 60000 }, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!',
  }));
});

server.listen(8000);
// Close the server after 10 seconds
setTimeout(() => {
  server.close(() => {
    console.log('Server on port 8000 successfully closed');
  });
  // Close all connections to ensure the server closes successfully
  server.closeAllConnections();
}, 10000);
```

### `server.closeIdleConnections()`

<!-- YAML
added: v18.2.0
-->

Closes all connections on this server that are not sending a request
or waiting for a response.

> Starting with Node.js 19.0.0, this method no longer needs to be called in combination with `server.close` to reclaim `keep-alive` connections. Using it does not hurt,
> and it can be used to ensure backward compatibility with libraries and applications that need to support versions before 19.0.0.
> When used together with `server.close`, it is recommended to call this method _after_ calling `server.close` to avoid race conditions where new connections are created between this call and the `server.close` call.

```js
const http = require('node:http');

const server = http.createServer({ keepAliveTimeout: 60000 }, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!',
  }));
});

server.listen(8000);
// Close the server after 10 seconds
setTimeout(() => {
  server.close(() => {
    console.log('Server on port 8000 successfully closed');
  });
  // Close idle connections, such as keep-alive connections. Once the remaining active connections end, the server will close
  server.closeIdleConnections();
}, 10000);
```

### `server.headersTimeout`

<!-- YAML
added:
 - v11.3.0
 - v10.14.0
changes:
  - version:
    - v19.4.0
    - v18.14.0
    pr-url: https://github.com/nodejs/node/pull/45778
    description: "The default value is now set to the smaller of [`server.requestTimeout`][] and `60000`."
-->

* Type: {number} **Default:** the smaller of [`server.requestTimeout`][] and `60000`.

Limit the amount of time the parser will wait to receive the complete HTTP
headers.

If the timeout expires, the server responds with a 408 status without forwarding the request to the request listener and then closes the connection.

It must be set to a non-zero value (e.g. 120 seconds) to protect against
potential denial-of-service attacks in case the server is not deployed behind a
reverse proxy.

### `server.listen()`

Start listening for connections on the HTTP server.
This method is identical to [`server.listen()`][] in [`net.Server`][].

### `server.listening`

<!-- YAML
added: v5.7.0
-->

* Type: {boolean} Indicates whether or not the server is listening for connections.

### `server.maxHeadersCount`

<!-- YAML
added: v0.7.0
-->

* Type: {number} **Default:** `2000`

Limits the maximum number of incoming headers. If set to `0`, no limit will be applied.

### `server.requestTimeout`

<!-- YAML
added: v14.11.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41263
    description: The default request timeout changed from no timeout to 300 seconds (5 minutes).
-->

* Type: {number} **Default:** `300000`

Sets the timeout value in milliseconds for receiving the entire request from the client.

If the timeout expires, the server responds with a 408 status without forwarding the request to the request listener and then closes the connection.

It must be set to a non-zero value (e.g. 120 seconds) to protect against
potential denial-of-service attacks in case the server is not deployed behind a
reverse proxy.

### `server.setTimeout([msecs][, callback])`

<!-- YAML
added: v0.9.12
changes:
  - version: v13.0.0
    pr-url: https://github.com/nodejs/node/pull/27558
    description: The default timeout changed from 120 seconds to 0 (no timeout).
-->

* `msecs` {number} **Default:** 0 (no timeout)
* `callback` {Function}
* Returns: {http.Server}

Sets the timeout value for sockets, and emits a `'timeout'` event on the
Server object, passing the socket as an argument, if a timeout occurs.

If there is a `'timeout'` event listener on the Server object, then it will
be called with the timed out socket as an argument.

By default, the server does not time out sockets. However, if a callback is
assigned to the server's `'timeout'` event, then timeouts must be handled
explicitly.

### `server.maxRequestsPerSocket`

<!-- YAML
added: v16.10.0
-->

* Type: {number} The number of requests per socket. **Default:** 0 (no limit)

The maximum number of requests socket can handle before closing keep alive connection.

A value of `0` will disable the limit.

When the limit has been reached it will set the `Connection` header value to `close`, but it will not really close the connection. Subsequent requests sent after the limit is reached will get `503 Service Unavailable` responses.

### `server.timeout`

<!-- YAML
added: v0.9.12
changes:
  - version: v13.0.0
    pr-url: https://github.com/nodejs/node/pull/27558
    description: The default timeout changed from 120 seconds to 0 (no timeout).
-->

* Type: {number} timeout in milliseconds. **Default:** 0 (no timeout)

The number of milliseconds of inactivity before a socket is presumed
to have timed out.

A value of `0` will disable the timeout behavior on incoming connections.

The socket timeout logic is set up on connection, so changing this value
only affects new connections to the server, not any existing connections.

### `server.keepAliveTimeout`

<!-- YAML
added: v8.0.0
changes:
  - version: REPLACEME
    pr-url: https://github.com/nodejs/node/pull/62782
    description: "The default value of `http.Server.keepAliveTimeout` has been changed from 5 seconds to 65 seconds."
-->

* Type: {number} timeout in milliseconds. **Default:** `65000` (65 seconds).

The number of milliseconds of inactivity a server needs to wait for additional incoming data,
after it has finished writing the last response,
before a socket will be destroyed.

This timeout value is used in conjunction with the
[`server.keepAliveTimeoutBuffer`][] option to determine the actual
socket timeout, in the following manner:
socketTimeout = keepAliveTimeout + keepAliveTimeoutBuffer
If the server receives additional data before the keep-alive timeout has fired,
it will reset the regular inactivity timeout, i.e., [`server.timeout`][].

A value of `0` will disable the keep-alive timeout behavior on incoming connections.
A value of `0` makes the HTTP server behave similarly to Node.js versions prior to 8.0.0,
where there was no keep-alive timeout.

The socket timeout logic is set up on connection, so changing this value
only affects new connections to the server, not any existing connections.

### `server.keepAliveTimeoutBuffer`

<!-- YAML
added:
 - v24.6.0
 - v22.19.0
-->

* Type: {number} timeout in milliseconds. **Default:** `1000` (1 second).

An additional buffer time to add to
[`server.keepAliveTimeout`][] to extend the internal
socket timeout.

This buffer helps reduce connection reset (`ECONNRESET`) errors by slightly
increasing the socket timeout relative to the advertised keep-alive timeout.

This option only applies to new incoming connections.

### `server[Symbol.asyncDispose]()`

<!-- YAML
added: v20.4.0
changes:
 - version: v24.2.0
   pr-url: https://github.com/nodejs/node/pull/58467
   description: No longer experimental.
-->

Calls [`server.close()`][] and returns a promise that will be fulfilled
when the server has closed.

## 类：`http.ServerResponse`

<!-- YAML
added: v0.1.17
-->

* 继承：{http.OutgoingMessage}

此对象由 HTTP 服务器内部创建，而非由用户创建。它作为第二个参数传递给 [`'request'`][] 事件。

### 事件：`'close'`

<!-- YAML
added: v0.6.7
-->

表示响应已完成，或其底层连接在响应完成之前被提前终止。

### 事件：`'finish'`

<!-- YAML
added: v0.3.6
-->

当响应已发送时触发。更具体地说，当响应头部和主体的最后一段已移交操作系统以便通过网络传输时，会触发此事件。这并不意味着客户端已经收到任何内容。

### `response.addTrailers(headers)`

<!-- YAML
added: v0.3.0
-->

* `headers` {Object}

此方法将 HTTP 尾部头（消息末尾的头）添加到响应中。

仅当响应使用分块编码时，尾部头 **才会** 被发出；如果不是（例如，如果请求是 HTTP/1.0），它们将被静默丢弃。

HTTP 要求发送 `Trailer` 头才能发出尾部头，其值中包含头部字段列表。例如，

```js
response.writeHead(200, { 'Content-Type': 'text/plain',
                          'Trailer': 'Content-MD5' });
response.write(fileData);
response.addTrailers({ 'Content-MD5': '7895bf4b8828b55ceaf47747b4bca667' });
response.end();
```

尝试设置包含无效字符的头部字段名或值将导致抛出 [`TypeError`][]。

### `response.connection`

<!-- YAML
added: v0.3.0
deprecated: v13.0.0
-->

> 稳定性：0 - 已弃用。使用 [`response.socket`][]。

* 类型：{stream.Duplex}

参见 [`response.socket`][]。

### `response.cork()`

<!-- YAML
added:
 - v13.2.0
 - v12.16.0
-->

参见 [`writable.cork()`][]。

### `response.end([data[, encoding]][, callback])`

<!-- YAML
added: v0.1.90
changes:
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/33155
    description: "`data` 参数现在可以是 `Uint8Array`。"
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18780
    description: "此方法现在返回对 `ServerResponse` 的引用。"
-->

* `data` {string|Buffer|Uint8Array}
* `encoding` {string}
* `callback` {Function}
* 返回：{this}

此方法向服务器发出信号，表明所有响应头部和主体都已发送；服务器应认为此消息已完成。每个响应都必须调用 `response.end()` 方法。

如果指定了 `data`，其效果类似于调用 [`response.write(data, encoding)`][] 后跟 [`response.end(callback)`]。

如果指定了 `callback`，它将在响应流完成时调用。

### `response.finished`

<!-- YAML
added: v0.0.2
deprecated:
 - v13.4.0
 - v12.16.0
-->

> 稳定性：0 - 已弃用。使用 [`response.writableEnded`][]。

* 类型：{boolean}

如果已调用 [`response.end()`][]，则 `response.finished` 属性将为 `true`。

### `response.flushHeaders()`

<!-- YAML
added: v1.6.0
-->

刷新响应头部。另参见：[`request.flushHeaders()`][]。

### `response.getHeader(name)`

<!-- YAML
added: v0.4.0
-->

* `name` {string}
* 返回：{number | string | string\[] | undefined}

读取已排队但尚未发送给客户端的头部。名称不区分大小写。返回值的类型取决于提供给 [`response.setHeader()`][] 的参数。

```js
response.setHeader('Content-Type', 'text/html');
response.setHeader('Content-Length', Buffer.byteLength(body));
response.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
const contentType = response.getHeader('content-type');
// contentType 是 'text/html'
const contentLength = response.getHeader('Content-Length');
// contentLength 是 number 类型
const setCookie = response.getHeader('set-cookie');
// setCookie 是 string[] 类型
```

### `response.getHeaderNames()`

<!-- YAML
added: v7.7.0
-->

* 返回：{string\[]}

返回一个包含当前传出头部唯一名称的数组。所有头部名称均为小写。

```js
response.setHeader('Foo', 'bar');
response.setHeader('Set-Cookie', ['foo=bar', 'bar=baz']);

const headerNames = response.getHeaderNames();
// headerNames === ['foo', 'set-cookie']
```

### `response.getHeaders()`

<!-- YAML
added: v7.7.0
-->

* 返回：{Object}

返回当前传出头部的浅拷贝。由于使用的是浅拷贝，数组值可以在不调用各种头部相关的 http 模块方法的情况下被突变。返回对象的键是头部名称，值是相应的头部值。所有头部名称均为小写。

`response.getHeaders()` 方法返回的对象 _不_ 从 JavaScript `Object` 原型继承。这意味着典型的 `Object` 方法（如 `obj.toString()`、`obj.hasOwnProperty()` 等）未定义且 _无法工作_。

```js
response.setHeader('Foo', 'bar');
response.setHeader('Set-Cookie', ['foo=bar', 'bar=baz']);

const headers = response.getHeaders();
// headers === { foo: 'bar', 'set-cookie': ['foo=bar', 'bar=baz'] }
```

### `response.hasHeader(name)`

<!-- YAML
added: v7.7.0
-->

* `name` {string}
* 返回：{boolean}

如果由 `name` 标识的头部当前设置在传出头部中，则返回 `true`。头部名称匹配不区分大小写。

```js
const hasContentType = response.hasHeader('content-type');
```

### `response.headersSent`

<!-- YAML
added: v0.9.3
-->

* 类型：{boolean}

布尔值（只读）。如果已发送头部则为 true，否则为 false。

### `response.removeHeader(name)`

<!-- YAML
added: v0.4.0
-->

* `name` {string}

移除排队等待隐式发送的头部。

```js
response.removeHeader('Content-Encoding');
```

### `response.req`

<!-- YAML
added: v15.7.0
-->

* 类型：{http.IncomingMessage}

对原始 HTTP `request` 对象的引用。

### `response.sendDate`

<!-- YAML
added: v0.7.5
-->

* 类型：{boolean}

当为 true 时，如果头部中尚未存在 Date 头部，则会自动生成并在响应中发送 Date 头部。默认为 true。

这应仅用于测试；大多数 HTTP 响应都需要 Date 头部（详见 [RFC 9110 Section 6.6.1][]）。

### `response.setHeader(name, value)`

<!-- YAML
added: v0.4.0
-->

* `name` {string}
* `value` {number | string | string\[]}
* 返回：{http.ServerResponse}

返回响应对象。

为隐式头部设置单个头部值。如果此头部已存在于待发送的头部中，其值将被替换。此处使用字符串数组来发送多个具有相同名称的头部。非字符串值将未经修改地存储。因此，[`response.getHeader()`][] 可能返回非字符串值。但是，非字符串值将在网络传输时转换为字符串。返回相同的响应对象给调用者，以启用链式调用。

```js
response.setHeader('Content-Type', 'text/html');
```

或

```js
response.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
```

尝试设置包含无效字符的头部字段名或值将导致抛出 [`TypeError`][]。

当使用 [`response.setHeader()`][] 设置头部时，它们将与传递给 [`response.writeHead()`][] 的任何头部合并，传递给 [`response.writeHead()`][] 的头部具有优先级。

```js
// 返回 content-type = text/plain
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('ok');
});
```

如果调用了 [`response.writeHead()`][] 方法且未调用此方法，它将直接把提供的头部值写入网络通道而不内部缓存，并且对该头部的 [`response.getHeader()`][] 将不会产生预期结果。如果希望逐步填充头部以便将来检索和修改，请使用 [`response.setHeader()`][] 而不是 [`response.writeHead()`][]。

### `response.setTimeout(msecs[, callback])`

<!-- YAML
added: v0.9.12
-->

* `msecs` {number}
* `callback` {Function}
* 返回：{http.ServerResponse}

将 Socket 的超时值设置为 `msecs`。如果提供了 callback，则它作为监听器添加到响应对象的 `'timeout'` 事件上。

如果未将 `'timeout'` 监听器添加到请求、响应或服务器，则套接字在超时时会被销毁。如果处理程序分配给了请求、响应或服务器的 `'timeout'` 事件，则必须显式处理超时的套接字。

### `response.socket`

<!-- YAML
added: v0.3.0
-->

* 类型：{stream.Duplex}

对底层 socket 的引用。通常用户不希望访问此属性。特别是，由于协议解析器附加到 socket 的方式，socket 不会发出 `'readable'` 事件。在 `response.end()` 之后，该属性被置空。

```mjs
import http from 'node:http';
const server = http.createServer((req, res) => {
  const ip = res.socket.remoteAddress;
  const port = res.socket.remotePort;
  res.end(`您的 IP 地址是 ${ip}，源端口是 ${port}。`);
}).listen(3000);
```

```cjs
const http = require('node:http');
const server = http.createServer((req, res) => {
  const ip = res.socket.remoteAddress;
  const port = res.socket.remotePort;
  res.end(`您的 IP 地址是 ${ip}，源端口是 ${port}。`);
}).listen(3000);
```

除非用户指定了 {net.Socket} 以外的 socket 类型，否则此属性保证是 {net.Socket} 类的实例，它是 {stream.Duplex} 的子类。

### `response.statusCode`

<!-- YAML
added: v0.4.0
-->

* 类型：{number} **默认：** `200`

当使用隐式头部（未显式调用 [`response.writeHead()`][]）时，此属性控制在刷新头部时发送给客户端的状态码。

```js
response.statusCode = 404;
```

在响应头部发送给客户端后，此属性指示发出的状态码。

### `response.statusMessage`

<!-- YAML
added: v0.11.8
-->

* 类型：{string}

当使用隐式头部（未显式调用 [`response.writeHead()`][]）时，此属性控制在刷新头部时发送给客户端的状态消息。如果此属性保持为 `undefined`，则将使用该状态码的标准消息。

```js
response.statusMessage = 'Not found';
```

在响应头部发送给客户端后，此属性指示发出的状态消息。

### `response.strictContentLength`

<!-- YAML
added:
  - v18.10.0
  - v16.18.0
-->

* 类型：{boolean} **默认：** `false`

如果设置为 `true`，Node.js 将检查 `Content-Length` 头部值与主体大小（以字节为单位）是否相等。`Content-Length` 头部值不匹配将导致抛出 `Error`，标识为 `code:` [`'ERR_HTTP_CONTENT_LENGTH_MISMATCH'`][]。

### `response.uncork()`

<!-- YAML
added:
 - v13.2.0
 - v12.16.0
-->

参见 [`writable.uncork()`][]。

### `response.writableEnded`

<!-- YAML
added: v12.9.0
-->

* 类型：{boolean}

在调用 [`response.end()`][] 之后为 `true`。此属性不指示数据是否已刷新，为此请使用 [`response.writableFinished`][]。

### `response.writableFinished`

<!-- YAML
added: v12.7.0
-->

* 类型：{boolean}

如果所有数据都已刷新到底层系统，则在 [`'finish'`][] 事件发出之前立即为 `true`。

### `response.write(chunk[, encoding][, callback])`

<!-- YAML
added: v0.1.29
changes:
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/33155
    description: "`chunk` 参数现在可以是 `Uint8Array`。"
-->

* `chunk` {string|Buffer|Uint8Array}
* `encoding` {string} **默认：** `'utf8'`
* `callback` {Function}
* 返回：{boolean}

如果调用了此方法且尚未调用 [`response.writeHead()`][]，它将切换到隐式头部模式并刷新隐式头部。

这发送响应主体的一块。可以多次调用此方法以提供主体的连续部分。

如果在 `createServer` 中将 `rejectNonStandardBodyWrites` 设置为 true，则当请求方法或响应状态不支持内容时，不允许写入主体。如果尝试为 HEAD 请求写入主体或作为 `204` 或 `304` 响应的一部分写入主体，则会抛出代码为 `ERR_HTTP_BODY_NOT_ALLOWED` 的同步 `Error`。

`chunk` 可以是字符串或 buffer。如果 `chunk` 是字符串，则第二个参数指定如何将其编码为字节流。当这块数据被刷新时，将调用 `callback`。

这是原始 HTTP 主体，与可能使用的更高级的多部分主体编码无关。

第一次调用 [`response.write()`][] 时，它将把缓冲的头部信息和第一块主体发送给客户端。第二次调用 [`response.write()`][] 时，Node.js 假设数据将被流式传输，并单独发送新数据。也就是说，响应被缓冲到主体的第一块。

如果整个数据成功刷新到内核缓冲区，则返回 `true`。如果全部或部分数据排队在用户内存中，则返回 `false`。当缓冲区再次空闲时，将发出 `'drain'`。

### `response.writeContinue()`

<!-- YAML
added: v0.3.0
-->

向客户端发送 HTTP/1.1 100 Continue 消息，表示应发送请求主体。参见 `Server` 上的 [`'checkContinue'`][] 事件。

### `response.writeEarlyHints(hints[, callback])`

<!-- YAML
added: v18.11.0
changes:
  - version: v18.11.0
    pr-url: https://github.com/nodejs/node/pull/44820
    description: 允许将 hints 作为对象传递。
-->

* `hints` {Object}
* `callback` {Function}

向客户端发送带有 Link 头部的 HTTP/1.1 103 Early Hints 消息，指示用户代理可以预加载/预连接链接的资源。`hints` 是一个对象，包含要随 early hints 消息发送的头部值。可选的 `callback` 参数将在写入响应消息时调用。

**示例**

```js
const earlyHintsLink = '</styles.css>; rel=preload; as=style';
response.writeEarlyHints({
  'link': earlyHintsLink,
});

const earlyHintsLinks = [
  '</styles.css>; rel=preload; as=style',
  '</scripts.js>; rel=preload; as=script',
];
response.writeEarlyHints({
  'link': earlyHintsLinks,
  'x-trace-id': '用于诊断的 id',
});

const earlyHintsCallback = () => console.log('早期提示消息已发送');
response.writeEarlyHints({
  'link': earlyHintsLinks,
}, earlyHintsCallback);
```

### `response.writeHead(statusCode[, statusMessage][, headers])`

<!-- YAML
added: v0.1.30
changes:
  - version: v14.14.0
    pr-url: https://github.com/nodejs/node/pull/35274
    description: 允许将头部作为数组传递。
  - version:
     - v11.10.0
     - v10.17.0
    pr-url: https://github.com/nodejs/node/pull/25974
    description: "从 `writeHead()` 返回 `this` 以允许与 `end()` 链式调用。"
  - version:
    - v5.11.0
    - v4.4.5
    pr-url: https://github.com/nodejs/node/pull/6291
    description: "如果 `statusCode` 不是 `[100, 999]` 范围内的数字，则抛出 `RangeError`。"
-->

* `statusCode` {number}
* `statusMessage` {string}
* `headers` {Object|Array}
* 返回：{http.ServerResponse}

向请求发送响应头。状态码是 3 位 HTTP 状态码，如 `404`。最后一个参数 `headers` 是响应头。可选地，可以将人类可读的 `statusMessage` 作为第二个参数给出。

`headers` 可以是一个 `Array`，其中键和值在同一列表中。它 _不是_ 元组列表。因此，偶数偏移量是键值，奇数偏移量是关联值。数组格式与 `request.rawHeaders` 相同。

返回对 `ServerResponse` 的引用，以便调用可以链式进行。

```js
const body = 'hello world';
response
  .writeHead(200, {
    'Content-Length': Buffer.byteLength(body),
    'Content-Type': 'text/plain',
  })
  .end(body);
```

此方法在消息上只能调用一次，且必须在调用 [`response.end()`][] 之前调用。

如果在调用此之前调用了 [`response.write()`][] 或 [`response.end()`][]，则将计算隐式/可变头部并调用此函数。

当使用 [`response.setHeader()`][] 设置头部时，它们将与传递给 [`response.writeHead()`][] 的任何头部合并，传递给 [`response.writeHead()`][] 的头部具有优先级。

如果调用了此方法且未调用 [`response.setHeader()`][]，它将直接把提供的头部值写入网络通道而不内部缓存，并且对该头部的 [`response.getHeader()`][] 将不会产生预期结果。如果希望逐步填充头部以便将来检索和修改，请使用 [`response.setHeader()`][]。

```js
// 返回 content-type = text/plain
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('ok');
});
```

`Content-Length` 以字节为单位读取，而不是字符。使用 [`Buffer.byteLength()`][] 确定主体的字节长度。Node.js 将检查 `Content-Length` 与已传输的主体长度是否相等。

尝试设置包含无效字符的头部字段名或值将导致抛出 [`TypeError`][]。

### `response.writeInformation(statusCode[, headers][, callback])`

<!-- YAML
added: v26.2.0
-->

* `statusCode` {number} 一个 HTTP 1xx 信息性状态码，范围在 `100` 到 `199`（含）之间，不包括 `101`（Switching Protocols），该状态仅可通过 [`'upgrade'`][] 事件获取。
* `headers` {Object|Array} 随信息性响应发送的可选头部集合。接受与 [`response.writeHead()`][] 相同的形式。
* `callback` {Function} 可选，在消息写入 socket 后调用一次。

向客户端发送任意的 HTTP/1.1 1xx 信息性响应。这是 [`response.writeContinue()`][]、[`response.writeProcessing()`][] 和 [`response.writeEarlyHints()`][] 的通用等价形式，并且可以在最终响应之前调用多次。在最终响应头部已发送后（通过 [`response.writeHead()`][] 或隐式头部发送），调用此方法将抛出 `ERR_HTTP_HEADERS_SENT`。

客户端通过 `http.ClientRequest` 上的 [`'information'`][information event] 事件接收这些响应。

```js
response.writeInformation(110, { 'X-Progress': '50%' });
```

### `response.writeProcessing()`

<!-- YAML
added: v10.0.0
-->

向客户端发送 HTTP/1.1 102 Processing 消息，表示请求主体应该被发送。

## 类：`http.IncomingMessage`

<!-- YAML
added: v0.1.17
changes:
  - version: v15.5.0
    pr-url: https://github.com/nodejs/node/pull/33035
    description: "传入数据被消费后，`destroyed` 值返回 `true`。"
  - version:
     - v13.1.0
     - v12.16.0
    pr-url: https://github.com/nodejs/node/pull/30135
    description: "`readableHighWaterMark` 值与 socket 的值镜像一致。"
-->

* 继承自：{stream.Readable}

`IncomingMessage` 对象由 [`http.Server`][] 或 [`http.ClientRequest`][] 创建，并分别作为第一个参数传递给 [`'request'`][] 和 [`'response'`][] 事件。它可用于访问响应状态、头部和数据。

与其 `socket` 值（{stream.Duplex} 的子类）不同，`IncomingMessage` 本身继承自 {stream.Readable} 并单独创建，用于解析和发出传入的 HTTP 头部和负载，因为底层 socket 可能在保持活动的情况下被多次重用。

### 事件：`'aborted'`

<!-- YAML
added: v0.3.8
deprecated:
  - v17.0.0
  - v16.12.0
-->

> 稳定性：0 - 已弃用。请改为监听 `'close'` 事件。

当请求被中止时发出。

### 事件：`'close'`

<!-- YAML
added: v0.4.2
changes:
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/33035
    description: "`close` 事件现在在请求完成时发出，而不是在底层 socket 关闭时。"
-->

当请求完成时发出。

### `message.aborted`

<!-- YAML
added: v10.1.0
deprecated:
  - v17.0.0
  - v16.12.0
-->

> 稳定性：0 - 已弃用。请检查 {stream.Readable} 中的 `message.destroyed`。

* 类型：{boolean}

如果请求已被中止，`message.aborted` 属性将为 `true`。

### `message.complete`

<!-- YAML
added: v0.3.0
-->

* 类型：{boolean}

如果完整的 HTTP 消息已被接收并成功解析，`message.complete` 属性将为 `true`。

此属性特别有用，可用于确定在连接终止之前客户端或服务器是否完全传输了消息：

```js
const req = http.request({
  host: '127.0.0.1',
  port: 8080,
  method: 'POST',
}, (res) => {
  res.resume();
  res.on('end', () => {
    if (!res.complete)
      console.error(
        '连接在消息仍在发送时被终止');
  });
});
```

### `message.connection`

<!-- YAML
added: v0.1.90
deprecated: v16.0.0
 -->

> 稳定性：0 - 已弃用。使用 [`message.socket`][]。

[`message.socket`][] 的别名。

### `message.destroy([error])`

<!-- YAML
added: v0.3.0
changes:
  - version:
    - v14.5.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/32789
    description: "该函数返回 `this` 以与其他 Readable 流保持一致。"
-->

* `error` {Error}
* 返回：{this}

在接收 `IncomingMessage` 的 socket 上调用 `destroy()`。如果提供了 `error`，则在 socket 上发出 `'error'` 事件，并将 `error` 作为参数传递给该事件的任何监听器。

### `message.headers`

<!-- YAML
added: v0.1.5
changes:
  - version:
    - v19.5.0
    - v18.14.0
    pr-url: https://github.com/nodejs/node/pull/45982
    description: >-
     `http.request()` 和 `http.createServer()` 函数中的 `joinDuplicateHeaders` 选项确保不会丢弃重复的头部，而是根据 RFC 9110 第 5.3 节使用逗号分隔符将它们组合起来。
  - version: v15.1.0
    pr-url: https://github.com/nodejs/node/pull/35281
    description: >-
      `message.headers` 现在使用原型上的访问器属性惰性计算，不再可枚举。
-->

* 类型：{Object}

请求/响应头部对象。

头部名称和值的键值对。头部名称为小写。

```js
// 打印类似以下内容：
//
// { 'user-agent': 'curl/7.22.0',
//   host: '127.0.0.1:8000',
//   accept: '*/*' }
console.log(request.headers);
```

原始头部中的重复项根据头部名称按以下方式处理：

* `age`、`authorization`、`content-length`、`content-type`、`etag`、`expires`、`from`、`host`、`if-modified-since`、`if-unmodified-since`、`last-modified`、`location`、`max-forwards`、`proxy-authorization`、`referer`、`retry-after`、`server` 或 `user-agent` 的重复项将被丢弃。
  要允许上述列出的头部重复值被连接，请在 [`http.request()`][] 和 [`http.createServer()`][] 中使用 `joinDuplicateHeaders` 选项。有关更多信息，请参阅 RFC 9110 第 5.3 节。
* `set-cookie` 始终是一个数组。重复项会被添加到数组中。
* 对于重复的 `cookie` 头部，值用 `; ` 连接在一起。
* 对于所有其他头部，值用 `, ` 连接在一起。

### `message.headersDistinct`

<!-- YAML
added:
  - v18.3.0
  - v16.17.0
-->

* 类型：{Object}

类似于 [`message.headers`][]，但没有连接逻辑，且值始终是字符串数组，即使对于只接收一次的头部也是如此。

```js
// 打印类似以下内容：
//
// { 'user-agent': ['curl/7.22.0'],
//   host: ['127.0.0.1:8000'],
//   accept: ['*/*'] }
console.log(request.headersDistinct);
```

### `message.httpVersion`

<!-- YAML
added: v0.1.1
-->

* 类型：{string}

如果是服务器请求，则为客户端发送的 HTTP 版本。如果是客户端响应，则为所连接服务器的 HTTP 版本。
可能是 `'1.1'` 或 `'1.0'`。

此外，`message.httpVersionMajor` 是第一个整数，`message.httpVersionMinor` 是第二个整数。

### `message.method`

<!-- YAML
added: v0.1.1
-->

* 类型：{string}

**仅对从 [`http.Server`][] 获得的请求有效。**

请求方法，字符串形式。只读。示例：`'GET'`、`'DELETE'`。

### `message.rawHeaders`

<!-- YAML
added: v0.11.6
-->

* 类型：{string\[]}

原始请求/响应头部列表，完全按照接收到的样子。

键和值在同一个列表中。它 _不是_ 元组列表。因此，偶数偏移量是键值，奇数偏移量是关联值。

头部名称不大写，重复项不合并。

```js
// 打印类似以下内容：
//
// [ 'user-agent',
//   '这是无效的，因为只能有一个',
//   'User-Agent',
//   'curl/7.22.0',
//   'Host',
//   '127.0.0.1:8000',
//   'ACCEPT',
//   '*/*' ]
console.log(request.rawHeaders);
```

### `message.rawTrailers`

<!-- YAML
added: v0.11.6
-->

* 类型：{string\[]}

原始请求/响应尾部键和值，完全按照接收到的样子。仅在 `'end'` 事件处填充。

### `message.setTimeout(msecs[, callback])`

<!-- YAML
added: v0.5.9
-->

* `msecs` {number}
* `callback` {Function}
* 返回：{http.IncomingMessage}

调用 `message.socket.setTimeout(msecs, callback)`。

### `message.signal`

<!-- YAML
added:
 - v26.1.0
 - v24.16.0
-->

* 类型：{AbortSignal}

当底层 socket 关闭或请求被销毁时中止的 {AbortSignal}。该信号在首次访问时惰性创建——对于从未使用此属性的请求，不会分配 {AbortController}。

当客户端在请求中途断开连接时，这对于取消下游异步工作（例如数据库查询或 `fetch` 调用）非常有用。

```mjs
import http from 'node:http';

http.createServer(async (req, res) => {
  try {
    const data = await fetch('https://example.com/api', { signal: req.signal });
    res.end(JSON.stringify(await data.json()));
  } catch (err) {
    if (err.name === 'AbortError') return;
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
}).listen(3000);
```

```cjs
const http = require('node:http');

http.createServer(async (req, res) => {
  try {
    const data = await fetch('https://example.com/api', { signal: req.signal });
    res.end(JSON.stringify(await data.json()));
  } catch (err) {
    if (err.name === 'AbortError') return;
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
}).listen(3000);
```

### `message.socket`

<!-- YAML
added: v0.3.0
-->

* 类型：{stream.Duplex}

与连接关联的 [`net.Socket`][] 对象。

支持 HTTPS 时，使用 [`request.socket.getPeerCertificate()`][] 获取客户端的身份验证详细信息。

除非用户指定了 {net.Socket} 以外的 socket 类型或在内部设为空，否则此属性保证是 {net.Socket} 类（{stream.Duplex} 的子类）的实例。

### `message.statusCode`

<!-- YAML
added: v0.1.1
-->

* 类型：{number}

**仅对从 [`http.ClientRequest`][] 获得的响应有效。**

3 位 HTTP 响应状态码。例如 `404`。

### `message.statusMessage`

<!-- YAML
added: v0.11.10
-->

* 类型：{string}

**仅对从 [`http.ClientRequest`][] 获得的响应有效。**

HTTP 响应状态消息（原因短语）。例如 `OK` 或 `Internal Server Error`。

### `message.trailers`

<!-- YAML
added: v0.3.0
-->

* 类型：{Object}

请求/响应尾部对象。仅在 `'end'` 事件处填充。

### `message.trailersDistinct`

<!-- YAML
added:
  - v18.3.0
  - v16.17.0
-->

* 类型：{Object}

类似于 [`message.trailers`][]，但没有连接逻辑，且值始终是字符串数组，即使对于只接收一次的头部也是如此。
仅在 `'end'` 事件处填充。

### `message.url`

<!-- YAML
added: v0.1.90
-->

* 类型：{string}

**仅对从 [`http.Server`][] 获得的请求有效。**

请求 URL 字符串。这仅包含实际 HTTP 请求中存在的 URL。例如以下请求：

```http
GET /status?name=ryan HTTP/1.1
Accept: text/plain
```

要将 URL 解析为其组成部分：

```js
new URL(`http://${process.env.HOST ?? 'localhost'}${request.url}`);
```

当 `request.url` 为 `'/status?name=ryan'` 且 `process.env.HOST` 为 undefined 时：

```console
$ node
> new URL(`http://${process.env.HOST ?? 'localhost'}${request.url}`);
URL {
  href: 'http://localhost/status?name=ryan',
  origin: 'http://localhost',
  protocol: 'http:',
  username: '',
  password: '',
  host: 'localhost',
  hostname: 'localhost',
  port: '',
  pathname: '/status',
  search: '?name=ryan',
  searchParams: URLSearchParams { 'name' => 'ryan' },
  hash: ''
}
```

确保将 `process.env.HOST` 设置为服务器的主机名，或者考虑完全替换此部分。如果使用 `req.headers.host`，请确保使用适当的验证，因为客户端可能会指定自定义 `Host` 头部。

## 类：`http.OutgoingMessage`

<!-- YAML
added: v0.1.17
-->

* 继承自：{Stream}

此类作为 [`http.ClientRequest`][] 和 [`http.ServerResponse`][] 的父类。从 HTTP 事务参与者的角度来看，它是一个抽象的传出消息。

### 事件：`'drain'`

<!-- YAML
added: v0.3.6
-->

当消息的缓冲区再次空闲时发出。

### 事件：`'finish'`

<!-- YAML
added: v0.1.17
-->

当传输成功完成时发出。

### 事件：`'prefinish'`

<!-- YAML
added: v0.11.6
-->

在调用 `outgoingMessage.end()` 后发出。
发出事件时，所有数据都已处理完毕，但不一定完全刷新。

### `outgoingMessage.addTrailers(headers)`

<!-- YAML
added: v0.3.0
-->

* `headers` {Object}

将 HTTP 尾部（头部但在消息末尾）添加到消息中。

仅当消息采用分块编码时，才会发出尾部。否则，尾部将被静默丢弃。

HTTP 要求发送 `Trailer` 头部以发出尾部，其值中包含头部字段名称列表，例如：

```js
message.writeHead(200, { 'Content-Type': 'text/plain',
                         'Trailer': 'Content-MD5' });
message.write(fileData);
message.addTrailers({ 'Content-MD5': '7895bf4b8828b55ceaf47747b4bca667' });
message.end();
```

尝试设置包含无效字符的头部字段名称或值将导致抛出 `TypeError`。

### `outgoingMessage.appendHeader(name, value)`

<!-- YAML
added:
  - v18.3.0
  - v16.17.0
-->

* `name` {string} 头部名称
* `value` {string|string\[]} 头部值
* 返回：{this}

将单个头部值附加到头部对象。

如果值是数组，则相当于多次调用此方法。

如果该头部之前没有值，则相当于调用 [`outgoingMessage.setHeader(name, value)`][]。

根据创建客户端请求或服务器时 `options.uniqueHeaders` 的值，这将导致头部被发送多次，或者单次发送且值用 `; ` 连接。

### `outgoingMessage.connection`

<!-- YAML
added: v0.3.0
deprecated:
  - v15.12.0
  - v14.17.1
-->

> 稳定性：0 - 已弃用：请改用 [`outgoingMessage.socket`][]。

[`outgoingMessage.socket`][] 的别名。

### `outgoingMessage.cork()`

<!-- YAML
added:
  - v13.2.0
  - v12.16.0
-->

参见 [`writable.cork()`][]。

### `outgoingMessage.destroy([error])`

<!-- YAML
added: v0.3.0
-->

* `error` {Error} 可选，随 `error` 事件发出的错误
* 返回：{this}

销毁消息。一旦 socket 与消息关联并连接，该 socket 也将被销毁。

### `outgoingMessage.end(chunk[, encoding][, callback])`

<!-- YAML
added: v0.1.90
changes:
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/33155
    description: "`chunk` 参数现在可以是 `Uint8Array`。"
  - version: v0.11.6
    description: "添加 `callback` 参数。"
-->

* `chunk` {string|Buffer|Uint8Array}
* `encoding` {string} 可选，**默认**：`utf8`
* `callback` {Function} 可选
* 返回：{this}

完成传出消息。如果有任何主体部分未发送，它将把它们刷新到底层系统。如果消息是分块的，它将发送终止块 `0\r\n\r\n`，并发送尾部（如果有）。

如果指定了 `chunk`，则相当于调用 `outgoingMessage.write(chunk, encoding)`，然后调用 `outgoingMessage.end(callback)`。

如果提供了 `callback`，它将在消息完成时调用（相当于 `'finish'` 事件的监听器）。

### `outgoingMessage.flushHeaders()`

<!-- YAML
added: v1.6.0
-->

刷新消息头部。

出于效率原因，Node.js 通常缓冲消息头部，直到调用 `outgoingMessage.end()` 或写入第一块消息数据。然后它尝试将头部和数据打包到单个 TCP 数据包中。

这通常是希望的（它节省了一次 TCP 往返），但当第一块数据直到可能更晚才发送时则不然。`outgoingMessage.flushHeaders()` 绕过优化并启动消息。

### `outgoingMessage.getHeader(name)``

<!-- YAML
added: v0.4.0
-->

* `name` {string} 头部名称
* 返回：{number | string | string\[] | undefined}

获取给定名称的 HTTP 头部的值。如果未设置该头部，返回值将为 `undefined`。

### `outgoingMessage.getHeaderNames()`

<!-- YAML
added: v7.7.0
-->

* 返回：{string\[]}

返回一个包含当前传出头部唯一名称的数组。所有名称均为小写。

### `outgoingMessage.getHeaders()`

<!-- YAML
added: v7.7.0
-->

* 返回：{Object}

返回当前传出头部的浅拷贝。由于使用的是浅拷贝，数组值可能会被修改，而无需额外调用各种头部相关的 HTTP 模块方法。返回对象的键是头部名称，值是相应的头部值。所有头部名称均为小写。

`outgoingMessage.getHeaders()` 方法返回的对象不从 JavaScript `Object` 原型继承。这意味着典型的 `Object` 方法（如 `obj.toString()`、`obj.hasOwnProperty()` 等）未定义且无法工作。

```js
outgoingMessage.setHeader('Foo', 'bar');
outgoingMessage.setHeader('Set-Cookie', ['foo=bar', 'bar=baz']);

const headers = outgoingMessage.getHeaders();
// headers === { foo: 'bar', 'set-cookie': ['foo=bar', 'bar=baz'] }
```

### `outgoingMessage.hasHeader(name)`

<!-- YAML
added: v7.7.0
-->

* `name` {string}
* 返回：{boolean}

如果由 `name` 标识的头部当前已设置在传出头部中，则返回 `true`。头部名称不区分大小写。

```js
const hasContentType = outgoingMessage.hasHeader('content-type');
```

### `outgoingMessage.headersSent`

<!-- YAML
added: v0.9.3
-->

* 类型：{boolean}

只读。如果已发送头部，则为 `true`，否则为 `false`。

### `outgoingMessage.pipe()`

<!-- YAML
added: v9.0.0
-->

覆盖从遗留 `Stream` 类（`http.OutgoingMessage` 的父类）继承的 `stream.pipe()` 方法。

调用此方法将抛出 `Error`，因为 `outgoingMessage` 是只写流。

### `outgoingMessage.removeHeader(name)`

<!-- YAML
added: v0.4.0
-->

* `name` {string} 头部名称

移除排队等待隐式发送的头部。

```js
outgoingMessage.removeHeader('Content-Encoding');
```

### `outgoingMessage.setHeader(name, value)`

<!-- YAML
added: v0.4.0
-->

* `name` {string} 头部名称
* `value` {number | string | string\[]} 头部值
* 返回：{this}

设置单个头部值。如果该头部已存在于待发送头部中，其值将被替换。使用字符串数组发送多个同名的头部。

### `outgoingMessage.setHeaders(headers)`

<!-- YAML
added:
  - v19.6.0
  - v18.15.0
-->

* `headers` {Headers|Map}
* 返回：{this}

为隐式头部设置多个头部值。
`headers` 必须是 [`Headers`][] 或 `Map` 的实例，
如果头部已存在于待发送头部中，
其值将被替换。

```js
const headers = new Headers({ foo: 'bar' });
outgoingMessage.setHeaders(headers);
```

或

```js
const headers = new Map([['foo', 'bar']]);
outgoingMessage.setHeaders(headers);
```

当使用 [`outgoingMessage.setHeaders()`][] 设置头部时，
它们将与传递给 [`response.writeHead()`][] 的任何头部合并，
传递给 [`response.writeHead()`][] 的头部具有优先级。

```js
// 返回 content-type = text/plain
const server = http.createServer((req, res) => {
  const headers = new Headers({ 'Content-Type': 'text/html' });
  res.setHeaders(headers);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('ok');
});
```

### `outgoingMessage.setTimeout(msecs[, callback])`

<!-- YAML
added: v0.9.12
-->

* `msecs` {number}
* `callback` {Function} 超时发生时调用的可选函数。与绑定到 `timeout` 事件相同。
* 返回：{this}

一旦 socket 与消息关联并连接，
[`socket.setTimeout()`][] 将被调用，`msecs` 作为第一个参数。

### `outgoingMessage.socket`

<!-- YAML
added: v0.3.0
-->

* 类型：{stream.Duplex}

底层 socket 的引用。通常，用户不希望访问此属性。

调用 `outgoingMessage.end()` 后，此属性将被设为空。

### `outgoingMessage.uncork()`

<!-- YAML
added:
  - v13.2.0
  - v12.16.0
-->

参见 [`writable.uncork()`][]

### `outgoingMessage.writableCorked`

<!-- YAML
added:
  - v13.2.0
  - v12.16.0
-->

* 类型：{number}

`outgoingMessage.cork()` 被调用的次数。

### `outgoingMessage.writableEnded`

<!-- YAML
added: v12.9.0
-->

* 类型：{boolean}

如果已调用 `outgoingMessage.end()`，则为 `true`。此属性不指示数据是否已刷新。为此，请改用 `message.writableFinished`。

### `outgoingMessage.writableFinished`

<!-- YAML
added: v12.7.0
-->

* 类型：{boolean}

如果所有数据都已刷新到底层系统，则为 `true`。

### `outgoingMessage.writableHighWaterMark`

<!-- YAML
added: v12.9.0
-->

* 类型：{number}

如果已分配，则为底层 socket 的 `highWaterMark`。否则，为 [`writable.write()`][] 开始返回 false 时的默认缓冲区级别（`16384`）。

### `outgoingMessage.writableLength`

<!-- YAML
added: v12.9.0
-->

* 类型：{number}

缓冲字节的数量。

### `outgoingMessage.writableObjectMode`

<!-- YAML
added: v12.9.0
-->

* 类型：{boolean}

始终为 `false`。

### `outgoingMessage.write(chunk[, encoding][, callback])`

<!-- YAML
added: v0.1.29
changes:
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/33155
    description: "`chunk` 参数现在可以是 `Uint8Array`。"
  - version: v0.11.6
    description: "添加了 `callback` 参数。"
-->

* `chunk` {string|Buffer|Uint8Array}
* `encoding` {string} **默认**：`utf8`
* `callback` {Function}
* 返回：{boolean}

发送一块主体。此方法可以调用多次。

仅当 `chunk` 为字符串时，`encoding` 参数才相关。默认为 `'utf8'`。

`callback` 参数是可选的，当这块数据被刷新时将调用它。

如果整个数据成功刷新到内核缓冲区，则返回 `true`。如果全部或部分数据排队在用户内存中，则返回 `false`。当缓冲区再次空闲时，将发出 `'drain'` 事件。

## `http.METHODS`

<!-- YAML
added: v0.11.8
-->

* 类型：{string[]}

解析器支持的 HTTP 方法列表。

## `http.STATUS_CODES`

<!-- YAML
added: v0.1.22
-->

* 类型：{Object}

所有标准 HTTP 响应状态码及其简短描述的集合。例如，`http.STATUS_CODES[404] === 'Not Found'`。

## `http.createServer([options][, requestListener])`

<!-- YAML
added: v0.1.13
changes:
  - version: v26.3.0
    pr-url: https://github.com/nodejs/node/pull/61597
    description: 现在支持 `httpValidation` 选项。
  - version:
      - v25.1.0
      - v24.12.0
    pr-url: https://github.com/nodejs/node/pull/59778
    description: 添加 optimizeEmptyRequests 选项。
  - version:
     - v24.9.0
     - v22.21.0
    pr-url: https://github.com/nodejs/node/pull/59824
    description: "现在支持 `shouldUpgradeCallback` 选项。"
  - version:
    - v20.1.0
    - v18.17.0
    pr-url: https://github.com/nodejs/node/pull/47405
    description: "现在支持 `highWaterMark` 选项。"
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41263
    description: "现在支持 `requestTimeout`、`headersTimeout`、`keepAliveTimeout` 和`connectionsCheckingInterval` 选项。"
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/42163
    description: "现在支持 `noDelay` 选项。"
  - version:
    - v17.7.0
    - v16.15.0
    pr-url: https://github.com/nodejs/node/pull/41310
    description: "现在支持 `noDelay`、`keepAlive` 和 `keepAliveInitialDelay`选项。"
  - version:
     - v13.8.0
     - v12.15.0
     - v10.19.0
    pr-url: https://github.com/nodejs/node/pull/31448
    description: "现在支持 `insecureHTTPParser` 选项。"
  - version: v13.3.0
    pr-url: https://github.com/nodejs/node/pull/30570
    description: "现在支持 `maxHeaderSize` 选项。"
  - version:
    - v9.6.0
    - v8.12.0
    pr-url: https://github.com/nodejs/node/pull/15752
    description: "现在支持 `options` 参数。"
-->

* `options` {Object}
  * `connectionsCheckingInterval`: 以毫秒为单位设置间隔值，用于
    检查不完整请求的请求超时和头部超时。
    **默认值：** `30000`。
  * `headersTimeout`: 以毫秒为单位设置从客户端接收完整 HTTP 头部的
    超时值。
    更多信息请参见 [`server.headersTimeout`][]。
    **默认值：** `60000`。
  * `highWaterMark` {number} 可选择覆盖所有 `socket` 的
    `readableHighWaterMark` 和 `writableHighWaterMark`。这会影响
    `IncomingMessage` 和 `ServerResponse` 的 `highWaterMark` 属性。
    **默认值：** 参见 [`stream.getDefaultHighWaterMark()`][]。
  * `httpValidation` {string} 控制传入请求的 HTTP 头部值验证严格程度。
    可接受的值有：
    * `'strict'`：最严格的验证；拒绝头部值中任何非 ASCII 或控制字符。
    * `'relaxed'`：允许头部值中有限集合的非 ASCII 字符，
      与 [Fetch 规范](https://fetch.spec.whatwg.org/) 保持一致。
    * `'insecure'`：禁用所有头部值验证（等同于
      `insecureHTTPParser: true`）。
      不能与 `insecureHTTPParser` 一起使用。**默认值：** `'strict'`。
  * `insecureHTTPParser` {boolean} 如果设置为 `true`，将使用启用宽松标志的
    HTTP 解析器。不应使用不安全的解析器。
    更多信息请参见 [`--insecure-http-parser`][]。
    **默认值：** `false`。
  * `IncomingMessage` {http.IncomingMessage} 指定要使用的 `IncomingMessage`
    类。适用于扩展原始的 `IncomingMessage`。
    **默认值：** `IncomingMessage`。
  * `joinDuplicateHeaders` {boolean} 如果设置为 `true`，此选项允许
    在请求中将多个头字段行的值用逗号（`, `）连接起来，而不是丢弃重复项。
    更多信息请参见 [`message.headers`][]。
    **默认值：** `false`。
  * `keepAlive` {boolean} 如果设置为 `true`，它会在收到新的传入连接后立即
    在 socket 上启用 keep-alive 功能，
    类似于 \[`socket.setKeepAlive([enable][, initialDelay])`]\[`socket.setKeepAlive(enable, initialDelay)`] 的做法。
    **默认值：** `false`。
  * `keepAliveInitialDelay` {number} 如果设置为正数，它会设置
    首次 keepalive 探测发送到空闲 socket 之前的初始延迟。
    **默认值：** `0`。
  * `keepAliveTimeout`: 在服务器完成写入最后一个响应后，
    需要等待额外传入数据的无活动毫秒数，
    之后 socket 将被销毁。
    更多信息请参见 [`server.keepAliveTimeout`][]。
    **默认值：** `5000`。
  * `maxHeaderSize` {number} 可选择覆盖
    [`--max-http-header-size`][] 对此服务器接收的请求的值，即
    请求头的最大字节长度。
    **默认值：** 16384（16 KiB）。
  * `noDelay` {boolean} 如果设置为 `true`，它会在收到新的传入连接后立即
    禁用 Nagle 算法的使用。
    **默认值：** `true`。
  * `requestTimeout`: 以毫秒为单位设置从客户端接收完整请求的
    超时值。
    更多信息请参见 [`server.requestTimeout`][]。
    **默认值：** `300000`。
  * `requireHostHeader` {boolean} 如果设置为 `true`，它会强制服务器对任何
    缺少 Host 头的 HTTP/1.1 请求消息返回 400（Bad Request）
    状态码（这是规范要求的）。
    **默认值：** `true`。
  * `ServerResponse` {http.ServerResponse} 指定要使用的 `ServerResponse`
    类。适用于扩展原始的 `ServerResponse`。**默认值：**
    `ServerResponse`。
  * `shouldUpgradeCallback(request)` {Function} 一个回调，接收
    传入请求并返回布尔值，用于控制哪些升级尝试应被接受。被接受的升级将触发 `'upgrade'` 事件
    （如果未注册监听器，其 socket 将被销毁），而被拒绝的升级将像任何非升级请求一样触发
    `'request'` 事件。此选项默认值为
    `() => server.listenerCount('upgrade') > 0`。
  * `uniqueHeaders` {Array} 应只发送一次的响应头列表。
    如果头部值是数组，将使用 `; ` 连接这些项。
  * `rejectNonStandardBodyWrites` {boolean} 如果设置为 `true`，当向没有正文的
    HTTP 响应写入时将抛出错误。
    **默认值：** `false`。
  * `optimizeEmptyRequests` {boolean} 如果设置为 `true`，没有 `Content-Length`
    或 `Transfer-Encoding` 头（表示没有正文）的请求将使用一个
    已结束的正文流进行初始化，因此它们永远不会发出任何流事件
    （例如 `'data'` 或 `'end'`）。可以使用 `req.readableEnded` 来检测这种情况。
    **默认值：** `false`。

* `requestListener` {Function}

* 返回值：{http.Server}

返回 [`http.Server`][] 的新实例。

`requestListener` 是一个自动
添加到 [`'request'`][] 事件的函数。

```mjs
import http from 'node:http';

// 创建一个本地服务器来接收数据
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!',
  }));
});

server.listen(8000);
```

```cjs
const http = require('node:http');

// 创建一个本地服务器来接收数据
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!',
  }));
});

server.listen(8000);
```

```mjs
import http from 'node:http';

// 创建一个本地服务器来接收数据
const server = http.createServer();

// 监听 request 事件
server.on('request', (request, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!',
  }));
});

server.listen(8000);
```

```cjs
const http = require('node:http');

// 创建一个本地服务器来接收数据
const server = http.createServer();

// 监听 request 事件
server.on('request', (request, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!',
  }));
});

server.listen(8000);
```

## `http.get(options[, callback])`

## `http.get(url[, options][, callback])`

<!-- YAML
added: v0.3.6
changes:
  - version: v10.9.0
    pr-url: https://github.com/nodejs/node/pull/21616
    description: "`url` 参数现在可以与单独的`options` 对象一起传递。"
  - version: v7.5.0
    pr-url: https://github.com/nodejs/node/pull/10638
    description: "`options` 参数可以是 WHATWG `URL` 对象。"
-->

* `url` {string | URL}
* `options` {Object} 接受与
  [`http.request()`][] 相同的 `options`，默认方法设置为 GET。
* `callback` {Function}
* 返回值：{http.ClientRequest}

由于大多数请求都是没有正文的 GET 请求，Node.js 提供了这个便捷方法。此方法与
[`http.request()`][] 的唯一区别在于，它默认将方法设置为 GET 并自动调用 `req.end()`。出于 [`http.ClientRequest`][] 部分所述的原因，回调必须注意消耗响应数据。

使用单个参数调用 `callback`，该参数是
[`http.IncomingMessage`][] 的实例。

JSON 获取示例：

```js
http.get('http://localhost:8000/', (res) => {
  const { statusCode } = res;
  const contentType = res.headers['content-type'];

  let error;
  // 任何 2xx 状态码都表示响应成功，但
  // 这里我们只检查 200。
  if (statusCode !== 200) {
    error = new Error('Request Failed.\n' +
                      `Status Code: ${statusCode}`);
  } else if (!/^application\/json/.test(contentType)) {
    error = new Error('Invalid content-type.\n' +
                      `Expected application/json but received ${contentType}`);
  }
  if (error) {
    console.error(error.message);
    // 消耗响应数据以释放内存
    res.resume();
    return;
  }

  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    try {
      const parsedData = JSON.parse(rawData);
      console.log(parsedData);
    } catch (e) {
      console.error(e.message);
    }
  });
}).on('error', (e) => {
  console.error(`Got error: ${e.message}`);
});

// 创建一个本地服务器来接收数据
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!',
  }));
});

server.listen(8000);
```

## `http.globalAgent`

<!-- YAML
added: v0.5.9
changes:
  - version:
      - v19.0.0
    pr-url: https://github.com/nodejs/node/pull/43522
    description: Agent 现在默认使用 HTTP Keep-Alive 和 5 秒超时。
-->

* 类型：{http.Agent}

`Agent` 的全局实例，用作所有 HTTP 客户端请求的默认值。与默认 `Agent` 配置不同的是，它启用了 `keepAlive` 且 `timeout` 为 5 秒。

## `http.maxHeaderSize`

<!-- YAML
added:
 - v11.6.0
 - v10.15.0
-->

* 类型：{number}

只读属性，指定 HTTP 头部的最大允许大小（字节）。默认为 16 KiB。可使用 [`--max-http-header-size`][] CLI 选项进行配置。

可以通过传递 `maxHeaderSize` 选项来覆盖服务器和客户端请求的此设置。

## `http.request(options[, callback])`

## `http.request(url[, options][, callback])`

<!-- YAML
added: v0.3.6
changes:
  - version: v26.3.0
    pr-url: https://github.com/nodejs/node/pull/61597
    description: 现在支持 `httpValidation` 选项。
  - version:
      - v16.7.0
      - v14.18.0
    pr-url: https://github.com/nodejs/node/pull/39310
    description: "当使用 `URL` 对象时，解析后的用户名和密码现在将进行正确的 URI 解码。"
  - version:
      - v15.3.0
      - v14.17.0
    pr-url: https://github.com/nodejs/node/pull/36048
    description: 现在可以使用 AbortSignal 中止请求。
  - version:
     - v13.8.0
     - v12.15.0
     - v10.19.0
    pr-url: https://github.com/nodejs/node/pull/31448
    description: "现在支持 `insecureHTTPParser` 选项。"
  - version: v13.3.0
    pr-url: https://github.com/nodejs/node/pull/30570
    description: "现在支持 `maxHeaderSize` 选项。"
  - version: v10.9.0
    pr-url: https://github.com/nodejs/node/pull/21616
    description: "现在可以连同单独的 `options` 对象一起传递 `url` 参数。"
  - version: v7.5.0
    pr-url: https://github.com/nodejs/node/pull/10638
    description: "`options` 参数可以是 WHATWG `URL` 对象。"
-->

* `url` {string | URL}
* `options` {Object}
  * `agent` {http.Agent | boolean} 控制 [`Agent`][] 的行为。可能的值：
    * `undefined`（默认）：对该主机和端口使用 [`http.globalAgent`][]。
    * `Agent` 对象：显式使用传入的 `Agent`。
    * `false`：将使用带默认值的新 `Agent`。
  * `auth` {string} 基本认证（`'user:password'`），用于计算 Authorization 头部。
  * `createConnection` {Function} 当未使用 `agent` 选项时，用于创建套接字/流供请求使用的函数。这可用于避免仅仅为了覆盖默认的 `createConnection` 函数而创建自定义 `Agent` 类。详情参见 [`agent.createConnection()`][]。任何 [`Duplex`][] 流都是有效的返回值。
  * `defaultPort` {number} 协议的默认端口。**默认：**
    使用 `Agent` 时为 `agent.defaultPort`，否则为 `undefined`。
  * `family` {number} 解析 `host` 或 `hostname` 时要使用的 IP 地址族。有效值为 `4` 或 `6`。未指定时，将同时使用 IPv4 和 IPv6。
  * `headers` {Object|Array} 包含请求头部的对象或字符串数组。数组格式与 [`message.rawHeaders`][] 相同。
  * `hints` {number} 可选的 [`dns.lookup()` hints][]。
  * `host` {string} 发出请求的服务器域名或 IP 地址。**默认：** `'localhost'`。
  * `hostname` {string} `host` 的别名。为支持 [`url.parse()`][]，如果同时指定了 `host` 和 `hostname`，将使用 `hostname`。
  * `httpValidation` {string} 控制传出请求的 HTTP 头部值校验严格程度。可接受的值为：
    * `'strict'`：最严格的校验；拒绝头部值中的任何非 ASCII 或控制字符。
    * `'relaxed'`：允许头部值中有限的一组非 ASCII 字符，与 [Fetch 规范](https://fetch.spec.whatwg.org/) 保持一致。
    * `'insecure'`：禁用所有头部值校验（等同于 `insecureHTTPParser: true`）。
      不能与 `insecureHTTPParser` 一起使用。**默认：** `'strict'`。
  * `insecureHTTPParser` {boolean} 如果设为 `true`，将使用启用了宽松标志的 HTTP 解析器。应避免使用不安全的解析器。更多信息请参见 [`--insecure-http-parser`][]。
    **默认：** `false`
  * `joinDuplicateHeaders` {boolean} 它会将请求中多个头部的字段行值用 `, ` 连接起来，而不是丢弃重复项。更多信息请参见 [`message.headers`][]。
    **默认：** `false`。
  * `localAddress` {string} 用于绑定网络连接的本地接口。
  * `localPort` {number} 本地连接端口。
  * `lookup` {Function} 自定义查找函数。**默认：** [`dns.lookup()`][]。
  * `maxHeaderSize` {number} 可选地覆盖从服务器接收的响应的 [`--max-http-header-size`][]（响应头部的最大长度，以字节计）值。
    **默认：** 16384（16 KiB）。
  * `method` {string} 指定 HTTP 请求方法的字符串。**默认：**
    `'GET'`。
  * `path` {string} 请求路径。如果有查询字符串，也应包含在内。
    例如 `'/index.html?page=12'`。当请求路径包含非法字符时会抛出异常。目前仅拒绝空格，但这在未来可能会改变。**默认：** `'/'`。
  * `port` {number} 远程服务器的端口。**默认：** 如果设置了 `defaultPort`，则使用它，否则为 `80`。
  * `protocol` {string} 要使用的协议。**默认：** `'http:'`。
  * `setDefaultHeaders` {boolean}：指定是否自动添加默认头部，如 `Connection`、`Content-Length`、`Transfer-Encoding` 和 `Host`。如果设为 `false`，则必须手动添加所有必要的头部。默认值为 `true`。
  * `setHost` {boolean}：指定是否自动添加 `Host` 头部。如果提供此项，将覆盖 `setDefaultHeaders`。默认值为 `true`。
  * `signal` {AbortSignal}：可用于中止正在进行的请求的 AbortSignal。
  * `socketPath` {string} Unix 域套接字。若已指定 `host` 或 `port` 之一，则不能使用，因为它们指定的是 TCP 套接字。
  * `timeout` {number}：指定套接字超时时间（毫秒）的数字。这会在套接字连接之前设置超时。
  * `uniqueHeaders` {Array} 只应发送一次的请求头部列表。如果头部值是数组，这些项将使用 `; ` 连接。
* `callback` {Function}
* 返回：{http.ClientRequest}

[`socket.connect()`][] 中的 `options` 也受支持。

Node.js 维护每个服务器的多个连接以发出 HTTP 请求。此函数允许透明地发出请求。

`url` 可以是字符串或 [`URL`][] 对象。如果 `url` 是字符串，它将使用 [`new URL()`][] 自动解析。如果它是 [`URL`][] 对象，它将自动转换为普通的 `options` 对象。

如果同时指定了 `url` 和 `options`，则对象会被合并，`options` 属性优先。

可选的 `callback` 参数将作为 [`'response'`][] 事件的一次性监听器添加。

`http.request()` 返回 [`http.ClientRequest`][] 类的一个实例。`ClientRequest` 实例是一个可写流。如果需要使用 POST 请求上传文件，则写入 `ClientRequest` 对象。

```mjs
import http from 'node:http';
import { Buffer } from 'node:buffer';

const postData = JSON.stringify({
  'msg': 'Hello World!',
});

const options = {
  hostname: 'www.google.com',
  port: 80,
  path: '/upload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
  },
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('响应中没有更多数据。');
  });
});

req.on('error', (e) => {
  console.error(`请求出现问题：${e.message}`);
});

// 向请求主体写入数据
req.write(postData);
req.end();
```

```cjs
const http = require('node:http');

const postData = JSON.stringify({
  'msg': 'Hello World!',
});

const options = {
  hostname: 'www.google.com',
  port: 80,
  path: '/upload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
  },
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('响应中没有更多数据。');
  });
});

req.on('error', (e) => {
  console.error(`请求出现问题：${e.message}`);
});

// 向请求主体写入数据
req.write(postData);
req.end();
```

在示例中调用了 `req.end()`。使用 `http.request()` 时，必须始终调用 `req.end()` 来表示请求结束——即使没有数据写入请求主体。

如果在请求期间遇到任何错误（无论是 DNS 解析、TCP 级别错误还是实际的 HTTP 解析错误），都会在返回的请求对象上发出 `'error'` 事件。与所有 `'error'` 事件一样，如果没有注册监听器，错误将被抛出。

有几个特殊的头部需要注意。

* 发送 'Connection: keep-alive' 将通知 Node.js 与服务器的连接应持续到下一个请求。

* 发送 'Content-Length' 头部将禁用默认的分块编码。

* 发送 'Expect' 头部将立即发送请求头部。通常，发送 'Expect: 100-continue' 时，应设置超时和 `'continue'` 事件的监听器。详见 RFC 2616 第 8.2.3 节。

* 发送 Authorization 头部将覆盖使用 `auth` 选项来计算基本认证。

使用 [`URL`][] 作为 `options` 的示例：

```js
const options = new URL('http://abc:xyz@example.com');

const req = http.request(options, (res) => {
  // ...
});
```

在成功的请求中，将按以下顺序发出以下事件：

* `'socket'`
* `'response'`
  * `'data'` 任意次数，在 `res` 对象上（如果响应主体为空，例如在大多数重定向中，则根本不会发出 `'data'`）
  * `'end'` 在 `res` 对象上
* `'close'`

在连接错误的情况下，将发出以下事件：

* `'socket'`
* `'error'`
* `'close'`

在响应接收之前连接过早关闭的情况下，将按以下顺序发出以下事件：

* `'socket'`
* `'error'` 带有消息 `'Error: socket hang up'` 和代码 `'ECONNRESET'` 的错误
* `'close'`

在响应接收之后连接过早关闭的情况下，将按以下顺序发出以下事件：

* `'socket'`
* `'response'`
  * `'data'` 任意次数，在 `res` 对象上
* （此处连接关闭）
* `'aborted'` 在 `res` 对象上
* `'close'`
* `'error'` 在 `res` 对象上，带有消息 `'Error: aborted'` 和代码 `'ECONNRESET'` 的错误
* `'close'` 在 `res` 对象上

如果在分配套接字之前调用了 `req.destroy()`，将按以下顺序发出以下事件：

* （此处调用了 `req.destroy()`）
* `'error'` 带有消息 `'Error: socket hang up'` 和代码 `'ECONNRESET'` 的错误，或调用 `req.destroy()` 时使用的错误
* `'close'`

如果在连接成功之前调用了 `req.destroy()`，将按以下顺序发出以下事件：

* `'socket'`
* （此处调用了 `req.destroy()`）
* `'error'` 带有消息 `'Error: socket hang up'` 和代码 `'ECONNRESET'` 的错误，或调用 `req.destroy()` 时使用的错误
* `'close'`

如果在接收到响应之后调用了 `req.destroy()`，将按以下顺序发出以下事件：

* `'socket'`
* `'response'`
  * `'data'` 任意次数，在 `res` 对象上
* （此处调用了 `req.destroy()`）
* `'aborted'` 在 `res` 对象上
* `'close'`
* `'error'` 在 `res` 对象上，带有消息 `'Error: aborted'` 和代码 `'ECONNRESET'` 的错误，或调用 `req.destroy()` 时使用的错误
* `'close'` 在 `res` 对象上

如果在分配套接字之前调用了 `req.abort()`，将按以下顺序发出以下事件：

* （此处调用了 `req.abort()`）
* `'abort'`
* `'close'`

如果在连接成功之前调用了 `req.abort()`，将按以下顺序发出以下事件：

* `'socket'`
* （此处调用了 `req.abort()`）
* `'abort'`
* `'error'` 带有消息 `'Error: socket hang up'` 和代码 `'ECONNRESET'` 的错误
* `'close'`

如果在接收到响应之后调用了 `req.abort()`，将按以下顺序发出以下事件：

* `'socket'`
* `'response'`
  * `'data'` 任意次数，在 `res` 对象上
* （此处调用了 `req.abort()`）
* `'abort'`
* `'aborted'` 在 `res` 对象上
* `'error'` 在 `res` 对象上，带有消息 `'Error: aborted'` 和代码 `'ECONNRESET'` 的错误。
* `'close'`
* `'close'` 在 `res` 对象上

设置 `timeout` 选项或使用 `setTimeout()` 函数不会中止请求，除了添加 `'timeout'` 事件外不做任何事。

传递 `AbortSignal` 然后在相应的 `AbortController` 上调用 `abort()` 将与在请求上调用 `.destroy()` 的行为相同。具体来说，将发出 `'error'` 事件，错误消息为 `'AbortError: The operation was aborted'`，代码为 `'ABORT_ERR'`，以及 `cause`（如果提供了的话）。

## `http.validateHeaderName(name[, label])`

<!-- YAML
added: v14.3.0
changes:
  - version:
    - v19.5.0
    - v18.14.0
    pr-url: https://github.com/nodejs/node/pull/46143
    description: "添加了 `label` 参数。"
-->

* `name` {string}
* `label` {string} 错误消息的标签。**默认值：** `'Header name'`。

对提供的 `name` 执行低级验证，这些验证会在调用 `res.setHeader(name, value)` 时进行。

传递非法的 `name` 值将导致抛出 [`TypeError`][]，标识为 `code: 'ERR_INVALID_HTTP_TOKEN'`。

在将头信息传递给 HTTP 请求或响应之前，不必使用此方法。HTTP 模块将自动验证此类头信息。

示例：

```mjs
import { validateHeaderName } from 'node:http';

try {
  validateHeaderName('');
} catch (err) {
  console.error(err instanceof TypeError); // --> true
  console.error(err.code); // --> 'ERR_INVALID_HTTP_TOKEN'
  console.error(err.message); // --> 'Header 名称必须是有效的 HTTP 令牌 [""]'
}
```

```cjs
const { validateHeaderName } = require('node:http');

try {
  validateHeaderName('');
} catch (err) {
  console.error(err instanceof TypeError); // --> true
  console.error(err.code); // --> 'ERR_INVALID_HTTP_TOKEN'
  console.error(err.message); // --> 'Header 名称必须是有效的 HTTP 令牌 [""]'
}
```

## `http.validateHeaderValue(name, value)`

<!-- YAML
added: v14.3.0
-->

* `name` {string}
* `value` {any}

对提供的 `value` 执行低级验证，这些验证会在调用 `res.setHeader(name, value)` 时进行。

传递非法的 `value` 值将导致抛出 [`TypeError`][]。

* Undefined 值错误标识为 `code: 'ERR_HTTP_INVALID_HEADER_VALUE'`。
* 无效值字符错误标识为 `code: 'ERR_INVALID_CHAR'`。

在将头信息传递给 HTTP 请求或响应之前，不必使用此方法。HTTP 模块将自动验证此类头信息。

示例：

```mjs
import { validateHeaderValue } from 'node:http';

try {
  validateHeaderValue('x-my-header', undefined);
} catch (err) {
  console.error(err instanceof TypeError); // --> true
  console.error(err.code === 'ERR_HTTP_INVALID_HEADER_VALUE'); // --> true
  console.error(err.message); // --> '头信息 "x-my-header" 的值 "undefined" 无效'
}

try {
  validateHeaderValue('x-my-header', 'oʊmɪɡə');
} catch (err) {
  console.error(err instanceof TypeError); // --> true
  console.error(err.code === 'ERR_INVALID_CHAR'); // --> true
  console.error(err.message); // --> '头信息内容中的字符无效 ["x-my-header"]'
}
```

```cjs
const { validateHeaderValue } = require('node:http');

try {
  validateHeaderValue('x-my-header', undefined);
} catch (err) {
  console.error(err instanceof TypeError); // --> true
  console.error(err.code === 'ERR_HTTP_INVALID_HEADER_VALUE'); // --> true
  console.error(err.message); // --> '头信息 "x-my-header" 的值 "undefined" 无效'
}

try {
  validateHeaderValue('x-my-header', 'oʊmɪɡə');
} catch (err) {
  console.error(err instanceof TypeError); // --> true
  console.error(err.code === 'ERR_INVALID_CHAR'); // --> true
  console.error(err.message); // --> '头信息内容中的字符无效 ["x-my-header"]'
}
```

## `http.setMaxIdleHTTPParsers(max)`

<!-- YAML
added:
  - v18.8.0
  - v16.18.0
-->

* `max` {number} **默认值：** `1000`。

设置空闲 HTTP 解析器的最大数量。

## `http.setGlobalProxyFromEnv([proxyEnv])`

<!-- YAML
added:
  - v25.4.0
  - v24.14.0
-->

* `proxyEnv` {Object} 包含代理配置的对象。它接受与 [`Agent`][] 接受的 `proxyEnv` 选项相同的选项。**默认值：** `process.env`。
* 返回：{Function} 一个函数，用于将原始 agent 和 dispatcher 设置恢复到此 `http.setGlobalProxyFromEnv()` 被调用之前的状态。

动态重置全局配置，以便在运行时为 `fetch()` 和 `http.request()`/`https.request()` 启用内置代理支持，作为使用 `--use-env-proxy` 标志或 `NODE_USE_ENV_PROXY` 环境变量的替代方案。它也可用于覆盖从环境变量配置的设置。

由于此函数重置全局配置，任何之前配置的 `http.globalAgent`、`https.globalAgent` 或 undici 全局 dispatcher 在此函数被调用后将被覆盖。建议在发出任何请求之前调用它，并避免在任何请求中间调用它。

有关代理 URL 格式和 `NO_PROXY` 语法的详细信息，请参阅 [内置代理支持][]。

## 类：`WebSocket`

<!-- YAML
added:
  - v22.5.0
-->

{WebSocket} 的浏览器兼容实现。

## 内置代理支持

<!-- YAML
added:
 - v24.5.0
 - v22.21.0
-->

> 稳定性：1.1 - 积极开发中

当 Node.js 创建全局 agent 时，如果 `NODE_USE_ENV_PROXY` 环境变量设置为 `1` 或启用了 `--use-env-proxy`，全局 agent 将使用 `proxyEnv: process.env` 构建，从而启用基于环境变量的代理支持。

要动态且全局地启用代理支持，请使用 [`http.setGlobalProxyFromEnv()`][]。

也可以通过在构建 agent 时传递 `proxyEnv` 选项来创建具有代理支持的自定义 agent。如果它们只想从环境变量继承配置，该值可以是 `process.env`，或者是具有特定设置以覆盖环境的对象。

检查 `proxyEnv` 的以下属性以配置代理支持。

* `HTTP_PROXY` 或 `http_proxy`：HTTP 请求的代理服务器 URL。如果两者都设置，`http_proxy` 优先。
* `HTTPS_PROXY` 或 `https_proxy`：HTTPS 请求的代理服务器 URL。如果两者都设置，`https_proxy` 优先。
* `NO_PROXY` 或 `no_proxy`：绕过代理的主机逗号分隔列表。如果两者都设置，`no_proxy` 优先。

如果请求是发往 Unix 域套接字的，代理设置将被忽略。

### 代理 URL 格式

代理 URL 可以使用 HTTP 或 HTTPS 协议：

* HTTP 代理：`http://proxy.example.com:8080`
* HTTPS 代理：`https://proxy.example.com:8080`
* 带身份验证的代理：`http://username:password@proxy.example.com:8080`

### `NO_PROXY` 格式

`NO_PROXY` 环境变量支持多种格式：

* `*` - 绕过所有主机的代理
* `example.com` - 精确主机名匹配
* `.example.com` - 域名后缀匹配（匹配 `sub.example.com`）
* `*.example.com` - 通配符域名匹配
* `192.168.1.100` - 精确 IP 地址匹配
* `192.168.1.1-192.168.1.100` - IP 地址范围
* `example.com:8080` - 带特定端口的主机名

多个条目应由逗号分隔。

### 示例

要启动一个启用了代理支持的 Node.js 进程，用于通过默认全局 agent 发送的所有请求，可以使用 `NODE_USE_ENV_PROXY` 环境变量：

```console
NODE_USE_ENV_PROXY=1 HTTP_PROXY=http://proxy.example.com:8080 NO_PROXY=localhost,127.0.0.1 node client.js
```

或使用 `--use-env-proxy` 标志。

```console
HTTP_PROXY=http://proxy.example.com:8080 NO_PROXY=localhost,127.0.0.1 node --use-env-proxy client.js
```

要使用 `process.env`（`http.setGlobalProxyFromEnv()` 的默认选项）动态且全局地启用代理支持：

```cjs
const http = require('node:http');

// 从 process.env 读取与代理相关的环境变量
const restore = http.setGlobalProxyFromEnv();

// 后续请求将使用环境变量中配置的代理
http.get('http://www.example.com', (res) => {
  // 如果设置了 HTTP_PROXY 或 http_proxy，此请求将通过代理
});

fetch('https://www.example.com', (res) => {
  // 如果设置了 HTTPS_PROXY 或 https_proxy，此请求将通过代理
});

// 要恢复原始的全局 agent 和 dispatcher 设置，请调用返回的函数。
// restore();
```

```mjs
import http from 'node:http';

// 从 process.env 读取与代理相关的环境变量
http.setGlobalProxyFromEnv();

// 后续请求将使用环境变量中配置的代理
http.get('http://www.example.com', (res) => {
  // 如果设置了 HTTP_PROXY 或 http_proxy，此请求将通过代理
});

fetch('https://www.example.com', (res) => {
  // 如果设置了 HTTPS_PROXY 或 https_proxy，此请求将通过代理
});

// 要恢复原始的全局 agent 和 dispatcher 设置，请调用返回的函数。
// restore();
```

要使用自定义设置动态且全局地启用代理支持：

```cjs
const http = require('node:http');

const restore = http.setGlobalProxyFromEnv({
  http_proxy: 'http://proxy.example.com:8080',
  https_proxy: 'https://proxy.example.com:8443',
  no_proxy: 'localhost,127.0.0.1,.internal.example.com',
});

// 后续请求将使用配置的代理
http.get('http://www.example.com', (res) => {
  // 此请求将通过 proxy.example.com:8080 进行代理
});

fetch('https://www.example.com', (res) => {
  // 此请求将通过 proxy.example.com:8443 进行代理
});
```

```mjs
import http from 'node:http';

http.setGlobalProxyFromEnv({
  http_proxy: 'http://proxy.example.com:8080',
  https_proxy: 'https://proxy.example.com:8443',
  no_proxy: 'localhost,127.0.0.1,.internal.example.com',
});

// 后续请求将使用配置的代理
http.get('http://www.example.com', (res) => {
  // 此请求将通过 proxy.example.com:8080 进行代理
});

fetch('https://www.example.com', (res) => {
  // 此请求将通过 proxy.example.com:8443 进行代理
});
```

要创建具有内置代理支持的自定义 agent：

```cjs
const http = require('node:http');

// 创建具有自定义代理支持的自定义 agent。
const agent = new http.Agent({ proxyEnv: { HTTP_PROXY: 'http://proxy.example.com:8080' } });

http.request({
  hostname: 'www.example.com',
  port: 80,
  path: '/',
  agent,
}, (res) => {
  // 此请求将通过 proxy.example.com:8080 使用 HTTP 协议进行代理。
  console.log(`STATUS: ${res.statusCode}`);
});
```

或者，以下方法也有效：

```cjs
const http = require('node:http');
// 使用小写选项名。
const agent1 = new http.Agent({ proxyEnv: { http_proxy: 'http://proxy.example.com:8080' } });
// 使用从环境变量继承的值，如果进程启动时带有
// HTTP_PROXY=http://proxy.example.com:8080 这将使用 process.env.HTTP_PROXY 中指定的代理服务器。
const agent2 = new http.Agent({ proxyEnv: process.env });
```

[内置代理支持]: #built-in-proxy-support
[RFC 8187]: https://www.rfc-editor.org/rfc/rfc8187.txt
[RFC 9110 Section 6.6.1]: https://www.rfc-editor.org/rfc/rfc9110#section-6.6.1
[`'ERR_HTTP_CONTENT_LENGTH_MISMATCH'`]: errors.md#err_http_content_length_mismatch
[`'checkContinue'`]: #event-checkcontinue
[`'finish'`]: #event-finish
[`'request'`]: #event-request
[`'response'`]: #event-response
[`'upgrade'`]: #event-upgrade
[`--insecure-http-parser`]: cli.md#--insecure-http-parser
[`--max-http-header-size`]: cli.md#--max-http-header-sizesize
[`Agent`]: #class-httpagent
[`Buffer.byteLength()`]: buffer.md#static-method-bufferbytelengthstring-encoding
[`Duplex`]: stream.md#class-streamduplex
[`HPE_HEADER_OVERFLOW`]: errors.md#hpe_header_overflow
[`Headers`]: globals.md#class-headers
[`TypeError`]: errors.md#class-typeerror
[`URL`]: url.md#the-whatwg-url-api
[`agent.createConnection()`]: #agentcreateconnectionoptions-callback
[`agent.getName()`]: #agentgetnameoptions
[`destroy()`]: #agentdestroy
[`dns.lookup()`]: dns.md#dnslookuphostname-options-callback
[`dns.lookup()` hints]: dns.md#supported-getaddrinfo-flags
[`getHeader(name)`]: #requestgetheadername
[`http.Agent`]: #class-httpagent
[`http.ClientRequest`]: #class-httpclientrequest
[`http.IncomingMessage`]: #class-httpincomingmessage
[`http.ServerResponse`]: #class-httpserverresponse
[`http.Server`]: #class-httpserver
[`http.createServer()`]: #httpcreateserveroptions-requestlistener
[`http.get()`]: #httpgetoptions-callback
[`http.globalAgent`]: #httpglobalagent
[`http.request()`]: #httprequestoptions-callback
[`http.setGlobalProxyFromEnv()`]: #httpsetglobalproxyfromenvproxyenv
[`message.headers`]: #messageheaders
[`message.rawHeaders`]: #messagerawheaders
[`message.socket`]: #messagesocket
[`message.trailers`]: #messagetrailers
[`net.Server.close()`]: net.md#serverclosecallback
[`net.Server`]: net.md#class-netserver
[`net.Socket`]: net.md#class-netsocket
[`net.createConnection()`]: net.md#netcreateconnectionoptions-connectlistener
[`new URL()`]: url.md#new-urlinput-base
[`outgoingMessage.setHeader(name, value)`]: #outgoingmessagesetheadername-value
[`outgoingMessage.setHeaders()`]: #outgoingmessagesetheadersheaders
[`outgoingMessage.socket`]: #outgoingmessagesocket
[`removeHeader(name)`]: #requestremoveheadername
[`request.destroy()`]: #requestdestroyerror
[`request.destroyed`]: #requestdestroyed
[`request.end()`]: #requestenddata-encoding-callback
[`request.flushHeaders()`]: #requestflushheaders
[`request.getHeader()`]: #requestgetheadername
[`request.setHeader()`]: #requestsetheadername-value
[`request.setTimeout()`]: #requestsettimeouttimeout-callback
[`request.socket.getPeerCertificate()`]: tls.md#tlssocketgetpeercertificatedetailed
[`request.socket`]: #requestsocket
[`request.writableEnded`]: #requestwritableended
[`request.writableFinished`]: #requestwritablefinished
[`request.write(data, encoding)`]: #requestwritechunk-encoding-callback
[`response.end()`]: #responseenddata-encoding-callback
[`response.getHeader()`]: #responsegetheadername
[`response.setHeader()`]: #responsesetheadername-value
[`response.socket`]: #responsesocket
[`response.strictContentLength`]: #responsestrictcontentlength
[`response.writableEnded`]: #responsewritableended
[`response.writableFinished`]: #responsewritablefinished
[`response.write()`]: #responsewritechunk-encoding-callback
[`response.write(data, encoding)`]: #responsewritechunk-encoding-callback
[`response.writeContinue()`]: #responsewritecontinue
[`response.writeEarlyHints()`]: #responsewriteearlyhintshints-callback
[`response.writeHead()`]: #responsewriteheadstatuscode-statusmessage-headers
[`response.writeProcessing()`]: #responsewriteprocessing
[`server.close()`]: #serverclosecallback
[`server.headersTimeout`]: #serverheaderstimeout
[`server.keepAliveTimeoutBuffer`]: #serverkeepalivetimeoutbuffer
[`server.keepAliveTimeout`]: #serverkeepalivetimeout
[`server.listen()`]: net.md#serverlisten
[`server.requestTimeout`]: #serverrequesttimeout
[`server.timeout`]: #servertimeout
[`setHeader(name, value)`]: #requestsetheadername-value
[`socket.connect()`]: net.md#socketconnectoptions-connectlistener
[`socket.setKeepAlive()`]: net.md#socketsetkeepaliveenable-initialdelay
[`socket.setNoDelay()`]: net.md#socketsetnodelaynodelay
[`socket.setTimeout()`]: net.md#socketsettimeouttimeout-callback
[`socket.unref()`]: net.md#socketunref
[`stream.getDefaultHighWaterMark()`]: stream.md#streamgetdefaulthighwatermarkobjectmode
[`url.parse()`]: url.md#urlparseurlstring-parsequerystring-slashesdenotehost
[`writable.cork()`]: stream.md#writablecork
[`writable.destroy()`]: stream.md#writabledestroyerror
[`writable.destroyed`]: stream.md#writabledestroyed
[`writable.uncork()`]: stream.md#writableuncork
[`writable.write()`]: stream.md#writablewritechunk-encoding-callback
[information event]: #event-information
[initial delay]: net.md#socketsetkeepaliveenable-initialdelay
