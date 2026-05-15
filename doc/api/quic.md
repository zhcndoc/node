# QUIC

<!-- introduced_in=v23.8.0-->

<!-- YAML
added: v23.8.0
-->

> 稳定性：1.0 - 早期开发

<!-- source_link=lib/quic.js -->

'node:quic' 模块提供了 QUIC 协议的实现。
要访问它，请使用 `--experimental-quic` 选项启动 Node.js，然后：

```mjs
import quic from 'node:quic';
```

```cjs
const quic = require('node:quic');
```

该模块仅在 `node:` 方案下可用。

## 概览

`quic` 模块提供了用于创建 QUIC 客户端和服务器的 API。

### 相关 RFC 和规范

QUIC 和 HTTP/3 协议由一组 RFC 定义，这些 RFC 主要由 IETF QUIC 工作组制定。
强烈建议本模块的用户熟悉这些文档。

**核心 QUIC 传输：**

* [RFC 8999][] — 与版本无关的 QUIC 属性
* [RFC 9000][] — QUIC：基于 UDP 的多路复用安全传输
* [RFC 9001][] — 使用 TLS 保障 QUIC 安全
* [RFC 9002][] — QUIC 丢包检测与拥塞控制

**核心 HTTP/3：**

* [RFC 9114][] — HTTP/3
* [RFC 9204][] — QPACK：HTTP/3 字段压缩

**QUIC 扩展：**

* [RFC 9221][] — QUIC 的不可靠数据报扩展
* [RFC 9287][] — QUIC 位的混淆
* [RFC 9368][] — QUIC 的兼容版本协商
* [RFC 9369][] — QUIC 版本 2
* [RFC 9443][] — QUIC 的多路复用方案更新

**HTTP/3 扩展：**

* [RFC 9218][] — HTTP 可扩展优先级方案
* [RFC 9220][] — 使用 HTTP/3 引导 WebSockets
* [RFC 9297][] — HTTP 数据报与 Capsule 协议
* [RFC 9412][] — HTTP/3 中的 ORIGIN 扩展

**运营与信息性：**

* [RFC 9308][] — QUIC 传输协议的适用性
* [RFC 9312][] — QUIC 传输协议的可管理性

## 架构

`quic` 模块围绕三个核心抽象构建：

* `QuicEndpoint`：表示 QUIC 的本地 UDP 套接字绑定。它用于发送和接收 QUIC 数据包，并且可以在多个会话之间共享。单个 endpoint 可以同时作为客户端和服务器使用。

* `QuicSession`：表示本地 endpoint 与远程对等方之间的 QUIC 连接。会话可通过使用 `quic.connect()` 发起到远程对等方的连接，或者通过 `quic.listen()` 接受来自远程对等方的传入连接来创建。

* `QuicStream`：表示会话中的 QUIC 流。流由本地或远程对等方创建，可以是双向的，也可以是单向的。

与传统基于 TCP 的协议不同，QUIC 的“连接”并不天然绑定到特定的本地端口 / 远程端口对。会话通过 QUIC endpoint 发起，但在其生命周期内可以迁移到不同的本地或远程地址，可以存活于创建它的 endpoint 之外，甚至可以同时关联多个 endpoint。这种灵活性支持连接迁移、多宿主和负载均衡等高级用例。不过，大多数情况下，endpoint 与 session 之间一对一的简单关系已经足够。

### 集成的 TLS 1.3

QUIC 协议将 TLS 1.3 直接集成到协议中，用于连接建立和安全保障。`quic` 模块的 API 通过暴露与 TLS 相关的信息和配置选项体现了这种集成。目前无法在不使用 TLS 的情况下使用 QUIC，也无法使用不同版本的 TLS。

每个 QUIC 会话都始于客户端和服务器执行 TLS 握手，以协商应用协议（通过 ALPN）、验证服务器身份（以及可选地验证客户端）、交换传输参数，并建立用于加密的共享密钥。

### 应用程序

每个 `QuicSession` 都与单一的应用协议相关联，该协议在 TLS 握手期间通过 ALPN 协商。`quic` 模块总体上被设计为与应用无关，但内置支持 HTTP/3 这一特定应用协议。使用 HTTP/3 时，`quic` 模块提供额外的 API 来处理 HTTP/3 特有的功能，如 headers、trailers 和优先级。对于其他应用协议，用户可以在核心 QUIC 传输功能之上实现自己的消息分帧和多路复用。

在发起 TLS 握手时，客户端会在 `ClientHello` 中包含一个支持的 ALPN 协议列表。服务器会从这些协议中选择一个（如果有的话）并将其包含在 `ServerHello` 中。协商出的协议决定 `QuicSession` 和 `QuicStream` API 的行为。例如，当为 HTTP/3 协商了 `h3` 协议时，`QuicSession` 和 `QuicStream` 将支持 HTTP/3 特有的功能。

目前，`quic` 模块仅支持 HTTP/3 作为内置应用协议。所有其他协议都必须由用户在所提供的 JavaScript API 之上自行实现。

### 配置

QUIC API 的设计目标是灵活且高度可配置，以支持广泛的用例。用户可以通过传递给 `quic.connect()` 和 `quic.listen()` 函数的选项，以及在 `QuicEndpoint` 和 `QuicSession` 实例上动态配置，来设置 QUIC 传输、TLS 握手和应用行为的各个方面。该 API 还提供了用于监控和调试的详细统计信息和事件访问能力。

QUIC 传输参数会在 TLS 握手期间交换，用于协商各种传输级设置，例如最大流数量、空闲超时和数据报支持。`quic` 模块允许用户配置其 endpoint 向对等方宣告的传输参数，也允许访问对等方宣告的传输参数。这些参数会与对等方协同，配置 QUIC 连接的能力和限制。

此外，还提供了一组丰富的本地设置，用于配置本地 endpoint 和会话的行为。这些设置包括连接限制、拥塞控制、流优先级等。

### 回调和 Promise

`quic` 模块在异步操作中结合使用回调和 Promise。例如，通过 `quic.connect()` 发起连接会返回一个已建立会话的 Promise，而服务器端的传入会话则通过传递给 `quic.listen()` 的回调来处理。在会话内部，诸如传入流、数据报和会话状态变化等事件都通过 `QuicSession` 实例上的回调处理。Promise 用于具有明确完成点的操作，例如 TLS 握手完成或会话的优雅关闭。

所有回调都以同步方式调用，并且可以同步返回，也可以返回一个 Promise。如果某个回调返回的 Promise 被拒绝，或者抛出错误，而未指定 `onerror` 回调，则对象将以该错误作为原因被销毁。

### 流

流是 QUIC 中承载数据的主要抽象。在会话建立后，流可以由本地 endpoint 或远程对等方发起。

流可以是双向的（数据双向流动）或单向的（数据只向一个方向流动）。`quic` 模块为创建这两种流分别提供了独立的 API：
[`session.createBidirectionalStream()`][] 和
[`session.createUnidirectionalStream()`][]。由远程对等方发起的流会通过 [`session.onstream`][] 回调传递。

向流写入数据有两种方式：

* **正文来源** — 在创建流时传递 `body` 选项（或调用 [`stream.setBody()`][]）。正文可以是字符串、`ArrayBuffer`、`ArrayBufferView`、`Blob`、`FileHandle`、`AsyncIterable`、同步 `Iterable`，或解析为这些类型之一的 `Promise`。`null` 正文会立即关闭可写端。当数据事先可用，或者可以表示为可迭代对象时，这是最简单的方法。
* **写入器** — 访问 [`stream.writer`][] 以增量推送数据。写入器提供同步方法（`writeSync()`、`writevSync()`、`endSync()`），它们会立即返回，也提供异步对应方法（`write()`、`writev()`、`end()`），在受到背压时会等待 drain。`writeSync()` 在写入缓冲区已满时返回 `false`；调用方应在重试前等待 drain。

这两种方式对于同一流而言是互斥的。

读取通过将流作为异步可迭代对象进行迭代来完成。每次迭代都会产出一批 `Uint8Array` 块：

```mjs
for await (const chunks of stream) {
  for (const chunk of chunks) {
    // 处理每个 Uint8Array 块
  }
}
```

每个流只能获取一个异步迭代器。该流也兼容 `node:stream/iter` 工具，例如 `Stream.bytes()`、`Stream.text()` 和 `Stream.pipeTo()`。

### 数据报

除了流之外，QUIC 还支持不可靠数据报（[RFC 9221][]），适用于需要低延迟、尽力而为消息传递的用例。

数据报支持在两个层面启用。在 QUIC 传输层面，双方都必须在握手期间宣告一个非零的 [`maxDatagramFrameSize`][] 传输参数。对于 HTTP/3 会话，双方还必须额外将 [`application.enableDatagrams`][] 设置为 `true`，这会在 HTTP/3 控制流上交换 `SETTINGS_H3_DATAGRAM` 设置。

一个数据报通过单次调用 [`session.sendDatagram()`][] 发送。每个数据报都必须能放入单个 QUIC 数据包中——数据报不能分片。最大负载大小由对等方的 `maxDatagramFrameSize` 和路径 MTU 决定。如果数据报过大，或者对等方不支持数据报，`sendDatagram()` 会返回 `0n`，而不是抛出错误。

不保证送达。数据报可能丢失、重复或乱序到达。[`session.ondatagramstatus`][] 回调会报告每个已发送数据报是 `'acknowledged'`、`'lost'` 还是 `'abandoned'`（从未在线路上发送）。

### 0-RTT 早期数据和会话恢复

QUIC 支持 0-RTT 早期数据，允许之前曾连接到服务器的客户端在第一个数据包中就发送应用数据，而无需等待握手完成。这可以在重新连接时消除完整的一次往返延迟。

先前连接中的两项状态使这成为可能：

* **会话票据**，通过 [`session.onsessionticket`][] 回调接收，可启用 TLS 会话恢复和 0-RTT 加密。在后续连接到同一服务器时，将其作为 [`sessionOptions.sessionTicket`][] 选项传入。
* **地址验证令牌**，通过 [`session.onnewtoken`][] 回调接收，可让客户端跳过服务器的地址验证步骤（避免一次 Retry 往返）。将其作为 [`sessionOptions.token`][] 选项传入。

如果服务器接受会话票据，则在握手完成前发送的任何数据都属于 0-RTT 早期数据。在服务器端，对于承载早期数据的流，`stream.early` 为 `true`。服务器可以拒绝 0-RTT 尝试（例如，如果自票据发出后其配置发生了变化）。发生这种情况时，所有在 0-RTT 阶段打开的流都会被销毁，客户端的 [`session.onearlyrejected`][] 回调会触发。连接会回退到正常的 1-RTT 握手，应用程序可以重新打开流。

早期数据比握手完成后发送的数据更不安全——它可能被攻击者重放。应用程序应当对 0-RTT 数据保持适当谨慎，并避免在早期数据阶段执行非幂等操作。

### 连接生命周期

典型的客户端会话会按以下阶段进行：

1. 使用服务器地址和选项调用 [`quic.connect()`][]。这将返回一个 `QuicSession`。
2. TLS 握手自动运行。握手完成时，`session.opened` 会被解析，并提供协商出的 ALPN、密码套件和证书验证结果。
3. 打开流、发送数据报并交换数据。
4. 调用 [`session.close()`][] 发起优雅关闭。现有流被允许完成，然后会话被销毁。返回的 Promise（也可通过 `session.closed` 访问）会在拆除完成时解析。

在服务器端，使用回调调用 [`quic.listen()`][]。该回调会在 TLS 握手开始后针对每个传入会话触发。传入流通过 [`session.onstream`][] 回调到达。

[`session.destroy()`][] 可用于立即拆除——所有打开的流都会被销毁，会话也会在不等待它们完成的情况下关闭。

`QuicEndpoint` 和 `QuicSession` 支持 `Symbol.asyncDispose`，因此可以与 `await using` 一起使用以实现自动清理。

### 错误处理

`quic` 模块中的错误通过两种互补机制传达：`onerror` 回调和 `closed` Promise。

`QuicSession` 和 `QuicStream` 都暴露了一个可选的 `onerror` 回调。当会话或流因错误而被销毁时——包括其他用户回调抛出的错误——在对象拆除之前会调用 `onerror` 回调并传入该错误。设置 `onerror` 还会将 `closed` Promise 标记为已处理，从而防止未处理拒绝警告。如果未设置 `onerror`，错误将仅通过 `closed` Promise 的拒绝来传递。

[`QuicError`][] 类携带一个显式的数值 QUIC 错误码（[`error.errorCode`][]），以及常规的 `message` 和 `code` 属性。当将 `QuicError` 传递给 [`stream.destroy()`][] 或 [`writer.fail()`][] 时，其 `errorCode` 会用于发送给对等方的 `RESET_STREAM` 或 `STOP_SENDING` 帧。任何其他错误类型都会回退为所协商协议的通用内部错误码。

### Permission model

When using the [Permission Model][], the `--allow-net` flag must be passed to
allow QUIC network operations. Without it, calling [`quic.connect()`][] or
[`quic.listen()`][] will throw an `ERR_ACCESS_DENIED` error.

```console
$ node --permission --allow-fs-read=* --experimental-quic index.mjs
Error: Access to this API has been restricted. Use --allow-net to manage permissions.
  code: 'ERR_ACCESS_DENIED',
  permission: 'Net',
}
```

Creating a [`QuicEndpoint`][] instance without connecting or listening
is permitted even without `--allow-net`, since no network I/O occurs until
[`quic.connect()`][] or [`quic.listen()`][] is called.

## `quic.connect(address[, options])`

<!-- YAML
added: v23.8.0
-->

* `address` {string|net.SocketAddress}
* `options` {quic.SessionOptions}
* 返回：{Promise} 一个关于 {quic.QuicSession} 的 promise

发起一个新的客户端会话。

```mjs
import { connect } from 'node:quic';
import { Buffer } from 'node:buffer';

const enc = new TextEncoder();
const alpn = 'foo';
const client = await connect('123.123.123.123:8888', { alpn });
await client.createUnidirectionalStream({
  body: enc.encode('hello world'),
});
```

默认情况下，每次调用 `connect(...)` 都会创建一个新的本地
`QuicEndpoint` 实例，绑定到一个新的随机本地 IP 端口。要
指定要使用的确切本地地址，或在单个本地端口上复用多个
QUIC 会话，请传递 `endpoint` 选项，
参数为 `QuicEndpoint` 或 `EndpointOptions`。

```mjs
import { QuicEndpoint, connect } from 'node:quic';

const endpoint = new QuicEndpoint({
  address: '127.0.0.1:1234',
});

const client = await connect('123.123.123.123:8888', { endpoint });
```

## `quic.listen(onsession[, options])`

<!-- YAML
added: v23.8.0
-->

* `onsession` {quic.OnSessionCallback}
* `options` {quic.SessionOptions}
* 返回：{Promise} 一个关于 {quic.QuicEndpoint} 的 promise

配置端点以作为服务器监听。当远程对等方发起新会话时，
给定的 `onsession` 回调将与创建的会话一起被调用。

```mjs
import { listen } from 'node:quic';

const endpoint = await listen((session) => {
  // ... 处理会话
});

// 关闭端点允许在调用 close 时打开的任何会话自然完成，同时防止新会话被
// 发起。一旦所有现有会话完成，端点将被销毁。该调用返回一个 promise，在
// 端点销毁后解析。
await endpoint.close();
```

默认情况下，每次调用 `listen(...)` 都会创建一个新的本地
`QuicEndpoint` 实例，绑定到一个新的随机本地 IP 端口。要
指定要使用的确切本地地址，或在单个本地端口上复用多个
QUIC 会话，请传递 `endpoint` 选项，
参数为 `QuicEndpoint` 或 `EndpointOptions`。

任何单个 `QuicEndpoint` 最多只能配置为监听服务器一次。

## `quic.constants`

<!-- YAML
added: REPLACEME
-->

* {Object}

一个包含 QUIC 配置中常用常量的对象。

### `quic.constants.cc`

* {Object}

拥塞控制算法标识符，可与
[`sessionOptions.cc`][] 选项一起使用：

* `quic.constants.cc.RENO` — Reno 拥塞控制。
* `quic.constants.cc.CUBIC` — CUBIC 拥塞控制。
* `quic.constants.cc.BBR` — BBR 拥塞控制。

### `quic.constants.DEFAULT_CIPHERS`

* {string}

当未指定 [`sessionOptions.ciphers`][] 时使用的默认 TLS 1.3 密码套件列表。

### `quic.constants.DEFAULT_GROUPS`

* {string}

当未指定 [`sessionOptions.groups`][] 时使用的默认 TLS 1.3 密钥交换组列表。

## 类：`QuicEndpoint`

`QuicEndpoint` 封装了 QUIC 的本地 UDP 端口绑定。它既可用作客户端，也可用作服务器。

### `new QuicEndpoint([options])`

<!-- YAML
added: v23.8.0
-->

* `options` {quic.EndpointOptions}

### `endpoint.address`

<!-- YAML
added: v23.8.0
-->

* 类型：{net.SocketAddress|undefined}

端点绑定的本地 UDP 套接字地址（如果有）。

如果端点当前未绑定，则值为 `undefined`。只读。

### `endpoint.busy`

<!-- YAML
added: v23.8.0
-->

* 类型：{boolean}

当 `endpoint.busy` 设置为 true 时，端点将暂时拒绝创建新会话。读/写。

```mjs
// 标记端点为忙。将防止新会话。
endpoint.busy = true;

// 标记端点为空闲。将允许新会话。
endpoint.busy = false;
```

当端点负载过重需要暂时拒绝新会话以赶上进度时，`busy` 属性很有用。

### `endpoint.close()`

<!-- YAML
added: v23.8.0
-->

* 返回：{Promise}

优雅地关闭端点。当所有当前打开的会话关闭时，端点将关闭并销毁自身。一旦调用，新会话将被拒绝。

返回一个在端点销毁时履行的 promise。

### `endpoint.closed`

<!-- YAML
added: v23.8.0
-->

* 类型：{Promise}

当端点销毁时履行的 promise。这与 `endpoint.close()` 函数返回的 promise 相同。只读。

### `endpoint.closing`

<!-- YAML
added: v23.8.0
-->

* 类型：{boolean}

如果已调用 `endpoint.close()` 且关闭端点尚未完成，则为 true。只读。

### `endpoint.destroy([error])`

<!-- YAML
added: v23.8.0
-->

* `error` {any}

通过强制所有打开的会话立即关闭来强制关闭端点。

### `endpoint.destroyed`

<!-- YAML
added: v23.8.0
-->

* 类型：{boolean}

如果已调用 `endpoint.destroy()`，则为 true。只读。

### `endpoint.listening`

<!-- YAML
added: REPLACEME
-->

* 类型：{boolean}

如果端点正在主动监听传入连接，则为 true。只读。

### `endpoint.maxConnectionsPerHost`

<!-- YAML
added: REPLACEME
-->

* 类型：{number}

每个远程 IP 地址允许的并发连接最大数量。
`0` 表示无限制（默认值）。可在构造时通过
`maxConnectionsPerHost` 选项设置，并可在任何时候动态更改。
有效范围是 `0` 到 `65535`。

### `endpoint.maxConnectionsTotal`

<!-- YAML
added: REPLACEME
-->

* 类型：{number}

跨所有远程地址允许的并发连接总数最大值。
`0` 表示无限制（默认值）。可在构造时通过
`maxConnectionsTotal` 选项设置，并可在任何时候动态更改。
有效范围是 `0` 到 `65535`。

### `endpoint.setSNIContexts(entries[, options])`

<!-- YAML
added: v26.1.0
-->

* `entries` {object} 将主机名映射到 TLS 身份选项的对象。
  每个条目都必须包含 `keys` 和 `certs`。
* `options` {object}
  * `replace` {boolean} 如果为 `true`，则替换整个 SNI 映射。如果为 `false`
    （默认值），则将条目标记合并到现有映射中。

为此端点替换或更新 SNI TLS 上下文。这允许
在不重启端点的情况下，改变用于特定主机名的 TLS 身份（密钥/证书）。
现有会话不受影响——仅新的会话将使用更新后的上下文。

```mjs
endpoint.setSNIContexts({
  'api.example.com': { keys: [newApiKey], certs: [newApiCert] },
});

// 替换整个 SNI 映射
endpoint.setSNIContexts({
  'api.example.com': { keys: [newApiKey], certs: [newApiCert] },
}, { replace: true });
```

### `endpoint.stats`

<!-- YAML
added: v23.8.0
-->

* 类型：{quic.QuicEndpoint.Stats}

活动端点收集的统计信息。只读。

### `endpoint[Symbol.asyncDispose]()`

<!-- YAML
added: v23.8.0
-->

调用 `endpoint.close()` 并返回一个在端点关闭时履行的 promise。

## 类：`QuicEndpoint.Stats`

<!-- YAML
added: v23.8.0
-->

端点收集统计信息的视图。

### `endpointStats.createdAt`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint} 指示端点创建时刻的时间戳。只读。

### `endpointStats.destroyedAt`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint} 指示端点销毁时刻的时间戳。只读。

### `endpointStats.bytesReceived`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint} 此端点接收的总字节数。只读。

### `endpointStats.bytesSent`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint} 此端点发送的总字节数。只读。

### `endpointStats.packetsReceived`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint} 此端点成功接收的 QUIC 数据包总数。只读。

### `endpointStats.packetsSent`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint} 此端点成功发送的 QUIC 数据包总数。只读。

### `endpointStats.serverSessions`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint} 此端点接收的对等方发起的会话总数。只读。

### `endpointStats.clientSessions`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint} 由此端点发起的会话总数。只读。

### `endpointStats.serverBusyCount`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint} 由于端点被标记为忙而拒绝初始数据包的总次数。只读。

### `endpointStats.retryCount`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint} 此端点上的 QUIC 重试尝试总数。只读。

### `endpointStats.versionNegotiationCount`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint} 由于 QUIC 版本不匹配而被拒绝的会话总数。只读。

### `endpointStats.statelessResetCount`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint} 此端点处理的无状态重置总数。只读。

### `endpointStats.immediateCloseCount`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint} 在握手完成前关闭的会话总数。只读。

## 类：`QuicSession`

<!-- YAML
added: v23.8.0
-->

`QuicSession` 代表 QUIC 连接的本地端。

### `session.close([options])`

<!-- YAML
added: v23.8.0
-->

* `options` {Object}
  * `code` {bigint|number} 要包含在发送给对等方的 `CONNECTION_CLOSE`
    帧中的错误码。**默认：** `0`（无错误）。
  * `type` {string} `'transport'` 或 `'application'` 之一。它决定
    `CONNECTION_CLOSE` 帧中使用的错误码命名空间。当为 `'transport'`
    （默认值）时，帧类型为 `0x1c`，该代码将被解释为 QUIC
    传输错误。当为 `'application'` 时，帧类型为 `0x1d`，该代码
    为应用程序特定。**默认：** `'transport'`。
  * `reason` {string} 可选的人类可读原因字符串，包含在
    `CONNECTION_CLOSE` 帧中。根据 RFC 9000，这仅用于诊断目的，
    不应用于机器可读的错误描述。
* 返回：{Promise}

发起会话的优雅关闭。现有流将被允许完成，但不会打开新流。
一旦所有流都关闭，会话将被销毁。返回的 promise 将在
会话销毁后履行。如果指定了非零 `code`，
则 promise 将根据 `type` 拒绝并抛出
`ERR_QUIC_TRANSPORT_ERROR` 或
`ERR_QUIC_APPLICATION_ERROR`。

### `session.opened`

<!-- YAML
added: REPLACEME
-->

* 类型：{Promise} 一个关于 {Object} 的 promise
  * `local` {net.SocketAddress} 本地套接字地址。
  * `remote` {net.SocketAddress} 远程套接字地址。
  * `servername` {string} 在握手期间协商的 SNI 服务器名称。
  * `protocol` {string} 在握手期间协商的 ALPN 协议。
  * `cipher` {string} 协商后的 TLS 密码套件名称。
  * `cipherVersion` {string} 密码套件的 TLS 协议版本
    （例如，`'TLSv1.3'`）。
  * `validationErrorReason` {string} 如果证书验证失败，则为
    原因字符串。验证成功时为空字符串。
  * `validationErrorCode` {number} 如果证书验证失败，则为
    错误码。验证成功时为 `0`。
  * `earlyDataAttempted` {boolean} 是否尝试了 0-RTT 早期数据。
  * `earlyDataAccepted` {boolean} 服务器是否接受了 0-RTT 早期数据。

当 TLS 握手成功完成时履行的 promise。解析后的值包含
已建立会话的信息，包括协商的协议、密码套件、
证书验证状态以及 0-RTT 早期数据状态。

如果握手失败，或会话在握手
完成前被销毁，则该 promise 将被拒绝。

### `session.closed`

<!-- YAML
added: v23.8.0
-->

* 类型：{Promise}

会话销毁后履行的 promise。

### `session.closing`

<!-- YAML
added: REPLACEME
-->

* 类型：{boolean}

如果已调用 [`session.close()`][] 且会话尚未
被销毁，则为 true。只读。

### `session.destroy([error[, options]])`

<!-- YAML
added: v23.8.0
-->

* `error` {any}
* `options` {Object}
  * `code` {bigint|number} 要包含在发送给对等方的 `CONNECTION_CLOSE`
    帧中的错误码。**默认：** `0`。
  * `type` {string} `'transport'` 或 `'application'` 之一。**默认：**
    `'transport'`。
  * `reason` {string} 可选的人类可读原因字符串，包含在
    `CONNECTION_CLOSE` 帧中。

立即销毁会话。所有流都将被销毁，且
会话将被关闭。如果提供了 `error` 且已设置
[`session.onerror`][]{}, 则在销毁前会调用 `onerror` 回调。
`session.closed` promise 将以该错误拒绝。如果提供了
`options`，发送给对等方的 `CONNECTION_CLOSE` 帧将包含
指定的错误码、类型和原因。

### `session.destroyed`

<!-- YAML
added: v23.8.0
-->

* 类型：{boolean}

如果已调用 `session.destroy()`，则为 true。只读。

### `session.endpoint`

<!-- YAML
added: REPLACEME
-->

* 类型：{quic.QuicEndpoint|null}

创建此会话的端点。如果会话已被销毁，则返回 `null`。只读。

### `session.onerror`

<!-- YAML
added: REPLACEME
-->

* 类型：{Function|undefined}

当会话因错误而被销毁时调用的可选回调。这包括
由抛出或拒绝的用户回调引起的错误（参见
[Callback error handling][]）。该回调接收一个参数：
触发销毁的错误。如果 `onerror` 回调本身抛出
错误，或返回一个被拒绝的 promise，则该错误将作为未捕获
异常暴露。读/写。

也可以通过 [`quic.connect()`][] 或
[`quic.listen()`][] 中的 `onerror` 选项设置。

### `session.onstream`

<!-- YAML
added: v23.8.0
-->

* 类型：{quic.OnStreamCallback}

当远程对等方发起新流时调用的回调。读/写。

### `session.ondatagram`

<!-- YAML
added: v23.8.0
-->

* 类型：{quic.OnDatagramCallback}

当从远程对等发收到新数据报时调用的回调。读/写。

### `session.ondatagramstatus`

<!-- YAML
added: v23.8.0
-->

* 类型：{quic.OnDatagramStatusCallback}

当数据报状态更新时调用的回调。读/写。

### `session.onearlyrejected`

<!-- YAML
added: REPLACEME
-->

* 类型：{Function|undefined}

当服务器拒绝 0-RTT 早期数据时调用的回调。当
此回调触发时，在 0-RTT 阶段打开的所有流都已被销毁。
应用程序应在需要时重新打开流。

此回调仅在客户端侧触发，当服务器拒绝
客户端的 0-RTT 尝试时。连接将回退到 1-RTT 并
正常继续。

### `session.onpathvalidation`

<!-- YAML
added: v23.8.0
-->

* 类型：{quic.OnPathValidationCallback}

当路径验证更新时调用的回调。读/写。

### `session.onsessionticket`

<!-- YAML
added: v23.8.0
-->

* 类型：{quic.OnSessionTicketCallback}

当收到新会话票据时调用的回调。读/写。

### `session.onversionnegotiation`

<!-- YAML
added: v23.8.0
-->

* 类型：{quic.OnVersionNegotiationCallback}

当发起版本协商时调用的回调。读/写。

### `session.onhandshake`

<!-- YAML
added: v23.8.0
-->

* 类型：{quic.OnHandshakeCallback}

当 TLS 握手完成时调用的回调。读/写。

### `session.onnewtoken`

<!-- YAML
added: REPLACEME
-->

* 类型：{quic.OnNewTokenCallback}

当从服务器收到 NEW\_TOKEN 令牌时调用的回调。该令牌可以在未来连接到
同一服务器时作为 `token` 选项传递，以跳过地址验证。读/写。

### `session.onorigin`

<!-- YAML
added: REPLACEME
-->

* 类型：{quic.OnOriginCallback}

当从服务器收到 ORIGIN 帧（RFC 9412）时调用的回调，指示服务器
对哪些源具有权威性。读/写。

### `session.ongoaway`

<!-- YAML
added: REPLACEME
-->

* 类型：{Function}

当对等方发送 HTTP/3 GOAWAY 帧时调用的回调，表示它正在发起
优雅关闭。该回调接收 `(lastStreamId)`，其中 `lastStreamId`
是一个 `{bigint}`：

* 当 `lastStreamId` 为 `-1n` 时，对等方发送了关闭通知（意图
  关闭），但未指定流边界。所有现有流仍可继续处理。
* 当 `lastStreamId` `>= 0n` 时，它是对等方可能已处理的
 最高流 ID。ID 高于此值的流未被处理，
  并且可以在新连接上安全重试。

收到 GOAWAY 后，`session.createBidirectionalStream()` 将
抛出 `ERR_INVALID_STATE`。现有流将继续，直到它们
完成或会话关闭。

此回调仅与 HTTP/3 会话相关。读/写。

### `session.onkeylog`

<!-- YAML
added: REPLACEME
-->

* 类型：{quic.OnKeylogCallback}

当 TLS 密钥材料可用时调用的回调。要求
[`sessionOptions.keylog`][] 为 `true`。每次调用接收一行
[NSS Key Log Format][] 文本（包括尾随换行符）。这对于使用
Wireshark 等工具解密数据包捕获非常有用。读/写。

也可以通过 [`quic.connect()`][] 或
[`quic.listen()`][] 中的 `onkeylog` 选项设置。

### `session.onqlog`

<!-- YAML
added: REPLACEME
-->

* 类型：{quic.OnQlogCallback}

当 qlog 数据可用时调用的回调。要求
[`sessionOptions.qlog`][] 为 `true`。该回调接收一段字符串
形式的 [JSON-SEQ][] 格式 qlog 数据，以及一个布尔值 `fin` 标志。当
`fin` 为 `true` 时，该片段是此会话的最终 qlog 输出，
拼接后的片段构成完整的 qlog 跟踪。

Qlog 数据会在连接生命周期内到达。第一段包含
带有格式元数据的 qlog 标头。后续片段包含跟踪
事件。最后一段（`fin` 设为 `true`）会在
会话销毁期间发出，并完成 JSON-SEQ 输出。

也可以通过 [`quic.connect()`][] 或
[`quic.listen()`][] 中的 `onqlog` 选项设置。

### `session.createBidirectionalStream([options])`

<!-- YAML
added: v23.8.0
-->

* `options` {Object}
  * `body` {string | ArrayBuffer | SharedArrayBuffer | ArrayBufferView |
    Blob | FileHandle | AsyncIterable | Iterable | Promise | null}
    出站主体来源。有关支持的类型，请参见 [`stream.setBody()`][]。
    省略时，流以半关闭状态开始（可写侧打开，没有排队的主体）。
  * `headers` {Object} 要发送的初始请求或响应头。仅在会话
    支持标头时使用（例如 HTTP/3）。如果未指定 `body` 且
    提供了 `headers`，则该流被视为仅标头（终结）。
  * `priority` {string} 流的优先级。可选 `'high'`、`'default'` 或
    `'low'`。**默认：** `'default'`。
  * `incremental` {boolean} 当为 `true` 时，此流的数据可与
    同优先级的其他流数据交错。当为 `false` 时，
    应在同优先级对等流之前完成该流。**默认：** `false`。
  * `highWaterMark` {number} 写入器在 `writeSync()` 返回 `false` 之前可缓冲的最大字节数。
    当缓冲数据超过此限制时，调用方应等待 drain 后再写入更多数据。
    **默认：** `65536`（64 KB）。
  * `onheaders` {Function} 接收到初始响应头时的回调。
    以 `(headers)` 调用。
  * `ontrailers` {Function} 接收到尾随头时的回调。
    以 `(trailers)` 调用。
  * `oninfo` {Function} 接收到信息性（1xx）头时的回调。
    以 `(headers)` 调用。
  * `onwanttrailers` {Function} 需要发送尾随头时的回调。
    不带参数调用；在回调中使用 [`stream.sendTrailers()`][]。
* 返回：{Promise} 一个关于 {quic.QuicStream} 的 promise

打开一个新的双向流。如果未指定 `body` 选项，
出站流将处于半关闭状态。`priority` 和 `incremental`
选项仅在会话支持优先级时使用（例如 HTTP/3）。
`headers`、`onheaders`、`ontrailers`、`oninfo` 和 `onwanttrailers`
选项仅在会话支持标头时使用（例如 HTTP/3）。

### `session.createUnidirectionalStream([options])`

<!-- YAML
added: v23.8.0
-->

* `options` {Object}
  * `body` {string | ArrayBuffer | SharedArrayBuffer | ArrayBufferView |
    Blob | FileHandle | AsyncIterable | Iterable | Promise | null}
    出站主体来源。有关支持的类型，请参见 [`stream.setBody()`][]。省略时，
    流会立即关闭。
  * `headers` {Object} 要发送的初始请求头。
  * `priority` {string} 流的优先级。可选 `'high'`、`'default'` 或
    `'low'`。**默认：** `'default'`。
  * `incremental` {boolean} 当为 `true` 时，此流的数据可与
    同优先级的其他流数据交错。当为 `false` 时，
    应在同优先级对等流之前完成该流。**默认：** `false`。
  * `highWaterMark` {number} 写入器在 `writeSync()` 返回 `false` 之前可缓冲的最大字节数。
    当缓冲数据超过此限制时，调用方应等待 drain 后再写入更多数据。
    **默认：** `65536`（64 KB）。
  * `onheaders` {Function} 接收到初始响应头时的回调。
    以 `(headers)` 调用。
  * `ontrailers` {Function} 接收到尾随头时的回调。
    以 `(trailers)` 调用。
  * `oninfo` {Function} 接收到信息性（1xx）头时的回调。
    以 `(headers)` 调用。
  * `onwanttrailers` {Function} 需要发送尾随头时的回调。
* 返回：{Promise} 一个关于 {quic.QuicStream} 的 promise

打开一个新的单向流。如果未指定 `body` 选项，
出站流将被关闭。`priority` 和 `incremental`
选项仅在会话支持优先级时使用（例如 HTTP/3）。

### `session.path`

<!-- YAML
added: v23.8.0
-->

* 类型：{Object|undefined}
  * `local` {net.SocketAddress}
  * `remote` {net.SocketAddress}

与会话关联的本地和远程套接字地址。只读。

### `session.sendDatagram([datagram, encoding])`

<!-- YAML
added: v23.8.0
-->

* `datagram` {string|ArrayBufferView|Promise}
* `encoding` {string} 如果 `datagram` 是字符串，则使用的编码。
  **默认：** `'utf8'`。
* 返回：{Promise} 一个关于 {bigint} 数据报 ID 的 promise。

向远程对等方发送不可靠数据报，并返回一个关于
数据报 ID 的 promise。

如果 `datagram` 是字符串，将使用指定的 `encoding` 进行编码。

如果 `datagram` 是 `ArrayBufferView`，字节会被复制到
内部缓冲区中；调用方的源缓冲区保持不变，并且可在调用返回后立即
重用或修改。希望确保源在调用后不可被修改的调用方
（例如，将缓冲区交给另一个异步消费者时）可以在传入缓冲区前
自行调用 `ArrayBuffer.prototype.transfer()`。

如果 `datagram` 是 `Promise`，则会在发送前等待其完成。如果在等待期间
会话关闭，则会静默返回 `0n`（数据报本质上是不可靠的）。

如果数据报负载长度为零（编码后为空字符串、分离缓冲区或零长度视图），
则返回 `0n`，且不会发送数据报。

对于 HTTP/3 会话，对等方必须声明 `SETTINGS_H3_DATAGRAM=1`
（通过 `application: { enableDatagrams: true }`）才能发送数据报。
如果对等方的设置为 `0`，`sendDatagram()` 返回 `0n`（根据 RFC 9297
§3，除非对等方表示支持，否则端点不得发送 HTTP 数据报）。

数据报不能被分片——每个数据报必须适合单个 QUIC 数据包。
数据报的最大大小由对等方的 `maxDatagramFrameSize` 传输参数决定
（该参数在握手期间由对等方宣告）。如果对等方将其设为 `0`，
则不支持数据报，并将返回 `0n`。如果数据报超过对等方限制，
它将被静默丢弃并返回 `0n`。本地的
`maxDatagramFrameSize` 传输参数（默认：`1200` 字节）控制
此端点向对等方宣告的自身最大值。

### `session.certificate`

<!-- YAML
added: REPLACEME
-->

* 类型：{Object|undefined}

本地证书，以对象形式提供，包含 `subject`、`issuer`、`valid_from`、`valid_to`、`fingerprint` 等属性。
如果会话已销毁或没有可用证书，则返回 `undefined`。

### `session.peerCertificate`

<!-- YAML
added: REPLACEME
-->

* 类型：{Object|undefined}

对等方证书，以对象形式提供，包含 `subject`、`issuer`、`valid_from`、`valid_to`、`fingerprint` 等属性。
如果会话已销毁或对等方未提供证书，则返回 `undefined`。

### `session.ephemeralKeyInfo`

<!-- YAML
added: REPLACEME
-->

* 类型：{Object|undefined}

会话的临时密钥信息，包含 `type`、`name` 和 `size` 等属性。
仅在客户端会话中可用。对于服务器会话或会话已销毁时返回
`undefined`。

### `session.maxDatagramSize`

<!-- YAML
added: REPLACEME
-->

* 类型：{number}

对等方将接受的最大数据报负载大小（以字节为单位）。
它由对等方的 `maxDatagramFrameSize` 传输参数减去 DATAGRAM 帧开销
（类型字节和变长整数编码）得出。如果对等方不支持数据报或
握手尚未完成，则返回 `0`。大于该值的数据报将不会被发送。

### `session.maxPendingDatagrams`

<!-- YAML
added: REPLACEME
-->

* 类型：{number}
* **默认：** `128`

可排队等待发送的数据报最大数量。调用 `sendDatagram()` 时，数据报会被排队，
并由数据包序列化循环与流数据一起 opportunistically 发送。当队列已满时，
[`sessionOptions.datagramDropPolicy`][] 决定丢弃最旧还是最新的数据报。
被丢弃的数据报会通过 `ondatagramstatus` 回调报告为丢失。

此属性可动态更改，以根据应用活动或内存压力调整队列容量。
有效范围是 `0` 到 `65535`。

### `session.stats`

<!-- YAML
added: v23.8.0
-->

* 类型：{quic.QuicSession.Stats}

返回会话的当前统计信息。只读。

### `session.updateKey()`

<!-- YAML
added: v23.8.0
-->

发起会话的密钥更新。

### `session[Symbol.asyncDispose]()`

<!-- YAML
added: v23.8.0
-->

调用 `session.close()` 并返回一个在会话关闭时履行的 promise。

## 类：`QuicSession.Stats`

<!-- YAML
added: v23.8.0
-->

### `sessionStats.createdAt`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint}

### `sessionStats.closingAt`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint}

### `sessionStats.handshakeCompletedAt`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint}

### `sessionStats.handshakeConfirmedAt`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint}

### `sessionStats.bytesReceived`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint}

### `sessionStats.bytesSent`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint}

### `sessionStats.bidiInStreamCount`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint}

### `sessionStats.bidiOutStreamCount`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint}

### `sessionStats.uniInStreamCount`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint}

### `sessionStats.uniOutStreamCount`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint}

### `sessionStats.maxBytesInFlight`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint}

### `sessionStats.bytesInFlight`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint}

### `sessionStats.blockCount`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint}

### `sessionStats.cwnd`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint}

### `sessionStats.latestRtt`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint}

### `sessionStats.minRtt`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint}

### `sessionStats.rttVar`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint}

### `sessionStats.smoothedRtt`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint}

### `sessionStats.ssthresh`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint}

### `sessionStats.datagramsReceived`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint}

### `sessionStats.datagramsSent`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint}

### `sessionStats.datagramsAcknowledged`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint}

### `sessionStats.datagramsLost`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint}

## 类：`QuicError`

<!-- YAML
added: REPLACEME
-->

> 稳定性：1 - 实验性

`QuicError` 是一个 `Error` 子类，携带显式的数值型 QUIC 错误码。可用它以特定的、由应用协议定义的错误码中止 QUIC 流或会话，而不是让实现选择一个通用的回退错误码。

该类从 `node:quic` 导出：

```mjs
import { QuicError } from 'node:quic';
```

```cjs
const { QuicError } = require('node:quic');
```

当将 `QuicError` 传递给会发出线上的帧的 API
（[`writer.fail()`][]、[`stream.destroy()`][]）时，QUIC 栈会使用
[`error.errorCode`][] 作为结果帧的线上错误码。
当传入任何其他值（例如普通 `Error`）时，实现会回退到协商出的应用协议
“内部错误”码（HTTP/3 使用 `H3_INTERNAL_ERROR`（`0x102`），原生 QUIC 使用
QUIC 传输层的 `INTERNAL_ERROR`（`0x1`））。

Node.js 错误码（`error.code`）默认为
`'ERR_QUIC_STREAM_ABORTED'`。需要更具体代码字符串的调用方可以通过
`options.code` 覆盖它——数值型 QUIC 错误码不受影响。

Node.js 错误码固定为 `'ERR_QUIC_STREAM_ABORTED'`，这样 catch 块无需检查原型链
就能区分 `QuicError` 与其他 Node.js 错误。数值型 QUIC 错误码位于独立的
[`error.errorCode`][] 属性上，以避免与 Node.js 约定中的 `error.code` 字符串冲突。

### `new QuicError(message, options)`

<!-- YAML
added: REPLACEME
-->

* `message` {string} 错误的人类可读描述。
* `options` {Object}
  * `errorCode` {bigint | number} 数值型 QUIC 错误码。数字会被强制转换为 `BigInt`。
    必须是非负的 62 位无符号 varint（`0n <= errorCode <= 2n ** 62n - 1n`）。
  * `code` {string} 分配给 `error.code` 的 Node.js 风格错误码字符串。默认值为
    `'ERR_QUIC_STREAM_ABORTED'`。
  * `type` {string} 取 `'application'`（默认）或 `'transport'` 之一。
    指示该错误码是由协商出的应用协议定义的（例如 HTTP/3 的 RFC 9114），还是由 QUIC
    传输层（RFC 9000）定义的。流重置始终携带应用层错误码，因此默认值为
    `'application'`。

```mjs
import { QuicError } from 'node:quic';

const err = new QuicError('rejecting stream', { errorCode: 0x10cn });
console.log(err.code);       // 'ERR_QUIC_STREAM_ABORTED'
console.log(err.errorCode);  // 268n
console.log(err.type);       // 'application'

const custom = new QuicError('custom failure', {
  errorCode: 0x10cn,
  code: 'ERR_MY_QUIC_FAILURE',
});
console.log(custom.code);    // 'ERR_MY_QUIC_FAILURE'
```

### `error.errorCode`

<!-- YAML
added: REPLACEME
-->

* 类型：{bigint}

此错误携带的数值型 QUIC 错误码。

### `error.type`

<!-- YAML
added: REPLACEME
-->

* 类型：{string}

`'application'` 或 `'transport'` 之一。指示 [`error.errorCode`][] 的命名空间。

## 类：`QuicStream`

<!-- YAML
added: v23.8.0
-->

### `stream.closed`

<!-- YAML
added: v23.8.0
-->

* 类型：{Promise}

当流完全关闭时兑现的 promise。流正常关闭时（包括空闲超时）会 resolve。
当由于 QUIC 错误关闭流时（例如被对端重置、带非零错误码的 CONNECTION_CLOSE），它会以
`ERR_QUIC_APPLICATION_ERROR` 或 `ERR_QUIC_TRANSPORT_ERROR` 拒绝。

### `stream.destroy([error[, options]])`

<!-- YAML
added: v23.8.0
changes:
  - version: REPLACEME
    pr-url: https://github.com/nodejs/node/pull/62876
    description: 添加了接受 `code` 和 `reason` 的 `options` 参数。
-->

* `error` {any}
* `options` {Object}
  * `code` {bigint|number} 要包含在发送给对端的 `RESET_STREAM` 和 `STOP_SENDING` 帧中的应用错误码。
    数字会被强制转换为 `BigInt`。如果省略，则线上错误码从 `error` 派生（见下文）。
  * `reason` {string} 可选的人类可读原因字符串。为了与 [`session.close()`][] 和
    [`session.destroy()`][] 保持对称而接受，但**不会在网络上传输**——`RESET_STREAM`
    和 `STOP_SENDING` 都不携带 reason 字段。用于应用日志记录以及 [`stream.onerror`][]
    回调中的使用。

立即并粗暴地销毁流。如果提供了 `error` 且设置了 [`stream.onerror`][]，则在销毁前会调用
`onerror` 回调。`stream.closed` promise 会以该错误拒绝。

当流带着 `error`（或带显式的 `options.code`）被销毁时，QUIC 栈会向对端通知中止：

* 如果可写侧仍然打开，则发送 `RESET_STREAM` 帧。
* 如果可读侧仍然打开（双向流，或远端发起的单向流），则发送 `STOP_SENDING` 帧。

两个帧都携带相同的线上错误码，其解析优先级如下：

1. `options.code`，当显式提供时。
2. [`error.errorCode`][]，当 `error` 是 [`QuicError`][] 时。
3. 协商出的应用协议的“内部错误”码（HTTP/3 使用 `H3_INTERNAL_ERROR`（`0x102`），
   原生 QUIC 使用 QUIC 传输层的 `INTERNAL_ERROR`（`0x1`））。

干净销毁——即没有 `error` 且没有 `options.code`——不会发送 `RESET_STREAM` 或
`STOP_SENDING`；流现有的关闭机制会处理拆除。

有关可用流中止 API 的概览，请参见[中止一个流][]。

### `stream.destroyed`

<!-- YAML
added: v23.8.0
-->

* 类型：{boolean}

如果已调用 `stream.destroy()` 则为 true。

### 中止一个流

QuicStream 可以通过三种方式中止，每种方式都会产生不同的线上帧副作用：

* [`writer.fail(reason)`][] — 仅中止可写侧。向对端发送 `RESET_STREAM`。
  可读侧不受影响；任何已缓冲可读的数据仍然可用。
* 带 `error` 参数的 [`stream.destroy()`][] — 完全拆除该流。对任何仍然打开的可写侧发送
  `RESET_STREAM`，**并且**对任何仍然打开的可读侧发送 `STOP_SENDING`。
  线上错误码从 `error` 派生（优先级规则见 [`stream.destroy()`][]）。
* 带显式 `options.code` 的 [`stream.destroy()`][] — 与前一种形式相同，但线上错误码由调用方提供，
  且优先于 `error` 中携带的任何错误码。

当 `error` 是 [`QuicError`][] 时，其 [`error.errorCode`][] 会被用作
`writer.fail()` 和 `stream.destroy()` 的线上错误码。否则实现会回退到协商出的应用协议的
“内部错误”码（见 [`QuicError`][]）。

### `stream.early`

<!-- YAML
added: REPLACEME
-->

* Type: {boolean}

如果该流上的任何数据是在 TLS 握手完成前作为 0-RTT（早期数据）接收的，则为 True。
早期数据安全性较低，攻击者可能会重放。应用程序应当以适当谨慎的方式对待早期数据。

此属性仅在服务端有意义。在客户端，它始终为 `false`。

### `stream.direction`

<!-- YAML
added: v23.8.0
-->

* Type: {string|null} 取 `'bidi'`、`'uni'` 或 `null` 之一。

流的方向性；如果流已被销毁或仍处于 pending 状态，则为 `null`。只读。

### `stream.highWaterMark`

<!-- YAML
added: REPLACEME
-->

* 类型：{number}

在 `writeSync()` 返回 `false` 之前，写入器将缓冲的最大字节数。当缓冲数据超过此限制时，
调用方在继续写入前应等待 drain。

该值可随时动态更改。这对于通过 `onstream` 回调接收的流尤其有用，因为默认值（65536）
可能需要根据应用需求进行调整。有效范围为 `0` 到 `4294967295`。

### `stream.id`

<!-- YAML
added: v23.8.0
-->

* Type: {bigint|null}

流 ID；如果流已被销毁或仍处于 pending 状态，则为 `null`。只读。

### `stream.onerror`

<!-- YAML
added: REPLACEME
-->

* Type: {Function|undefined}

当流因错误被销毁时调用的可选回调。这包括由抛出或拒绝的用户回调引起的错误
（参见[回调错误处理][]）。回调接收一个参数：触发销毁的错误。如果 `onerror` 回调自身抛出
或返回一个拒绝的 promise，则该错误会作为未捕获异常暴露。可读/可写。

### `stream.onblocked`

<!-- YAML
added: v23.8.0
-->

* 类型：{quic.OnBlockedCallback}

当流被阻塞时调用的回调。可读/可写。

### `stream.onreset`

<!-- YAML
added: v23.8.0
-->

* 类型：{quic.OnStreamErrorCallback}

当对端通过发送 `RESET_STREAM` 帧中止流的一个方向（对端放弃了其可写侧，因此不会再有数据进入我们的可读侧）
或发送 `STOP_SENDING` 帧（对端要求我们停止在可写侧写入）时要调用的回调。

回调接收一个 Node.js 错误，其 `errorCode`（`bigint`）属性携带来自线上帧的应用错误码。

当此回调触发时，流**不会**自动销毁——由应用程序决定如何响应。常见模式有：忽略（并继续使用双向流中仍然活跃的方向）、
通过 [`writer.fail()`][] 中止另一方向，或通过 [`stream.destroy()`][] 拆除整个流。可读/可写。

### `stream.headers`

<!-- YAML
added: REPLACEME
-->

* 类型：{Object|undefined}

在该流上缓冲接收到的初始头部；如果应用程序不支持头部或尚未接收到头部，则为 `undefined`。
对于服务端流，这包含请求头（例如 `:method`、`:path`、`:scheme`）。对于客户端流，这包含响应头
（例如 `:status`）。

头部名称为小写字符串。多值头部表示为数组。对象具有 `__proto__: null`。

### `stream.onheaders`

<!-- YAML
added: REPLACEME
-->

* 类型：{Function}

当在流上接收到初始头部时要调用的回调。回调接收 `(headers)`，其中 `headers` 是一个对象
（格式与 `stream.headers` 相同）。对于 HTTP/3，这会在服务端传递请求伪头部，在客户端传递响应头。
如果设置在不支持头部的会话上，则抛出 `ERR_INVALID_STATE`。可读/可写。

### `stream.ontrailers`

<!-- YAML
added: REPLACEME
-->

* 类型：{Function}

当收到来自对端的尾部头部时要调用的回调。回调接收 `(trailers)`，其中 `trailers` 是一个对象，
格式与 `stream.headers` 相同。如果设置在不支持头部的会话上，则抛出 `ERR_INVALID_STATE`。可读/可写。

### `stream.oninfo`

<!-- YAML
added: REPLACEME
-->

* 类型：{Function}

当从服务器接收到信息性（1xx）头部时要调用的回调。回调接收 `(headers)`，其中 `headers` 是一个对象，
格式与 `stream.headers` 相同。信息性头部在最终响应之前发送（例如 103 Early Hints）。
如果设置在不支持头部的会话上，则抛出 `ERR_INVALID_STATE`。可读/可写。

### `stream.onwanttrailers`

<!-- YAML
added: REPLACEME
-->

* 类型：{Function}

当应用程序已准备好发送尾部头部时要调用的回调。该回调是同步调用的——用户必须在此回调中调用
[`stream.sendTrailers()`][]。如果设置在不支持头部的会话上，则抛出 `ERR_INVALID_STATE`。可读/可写。

### `stream.pendingTrailers`

<!-- YAML
added: REPLACEME
-->

* 类型：{Object|undefined}

设置在应用程序请求尾部头部时自动发送的尾部头部。这是 [`stream.onwanttrailers`][] 回调的替代方案，
适用于在主体完成之前就已知尾部头部的情况。如果设置在不支持头部的会话上，则抛出
`ERR_INVALID_STATE`。可读/可写。

### `stream.sendHeaders(headers[, options])`

<!-- YAML
added: REPLACEME
-->

* `headers` {Object} 带字符串键以及字符串或字符串数组值的头部对象。伪头部（`:method`、`:path` 等）
  必须出现在普通头部之前。
* `options` {Object}
  * `terminal` {boolean} 如果为 `true`，则在发送头部后关闭流的发送方向（后续不会再有主体）。
    **默认值：** `false`。
* 返回：{boolean}

在流上发送初始头部或响应头。对于客户端流，这会发送请求头。对于服务端流，这会发送响应头。
如果会话不支持头部，则抛出 `ERR_INVALID_STATE`。

### `stream.sendInformationalHeaders(headers)`

<!-- YAML
added: REPLACEME
-->

* `headers` {Object} 头部对象。必须包含 `:status` 且值为 1xx（例如 `{ ':status': '103', 'link': '</style.css>; rel=preload' }`）。
* 返回：{boolean}

发送信息性（1xx）响应头。仅限服务器端。如果会话不支持头部，则抛出 `ERR_INVALID_STATE`。

### `stream.sendTrailers(headers)`

<!-- YAML
added: REPLACEME
-->

* `headers` {Object} 尾部头部对象。尾部中不得包含伪头部。
* 返回：{boolean}

在流上发送尾部头部。必须在 [`stream.onwanttrailers`][] 回调期间同步调用，或者提前通过
[`stream.pendingTrailers`][] 设置。如果会话不支持头部，则抛出 `ERR_INVALID_STATE`。

### `stream.priority`

<!-- YAML
added: REPLACEME
-->

* 类型：{Object|null}
  * `level` {string} 取 `'high'`、`'default'` 或 `'low'` 之一。
  * `incremental` {boolean} 流数据是否应与同优先级级别的其他流交错传输。

流的当前优先级。如果会话不支持优先级（例如非 HTTP/3），或如果流已被销毁，则返回 `null`。
只读。使用 [`stream.setPriority()`][] 更改优先级。

在客户端 HTTP/3 会话中，该值反映通过 [`stream.setPriority()`][] 设置的内容。在服务端 HTTP/3 会话中，
该值反映对端请求的优先级（例如来自 `PRIORITY_UPDATE` 帧）。

### `stream.setPriority([options])`

<!-- YAML
added: REPLACEME
-->

* `options` {Object}
  * `level` {string} 优先级级别。取 `'high'`、`'default'` 或 `'low'` 之一。
    **默认值：** `'default'`。
  * `incremental` {boolean} 为 `true` 时，此流的数据可以与同优先级级别的其他流的数据交错。
    **默认值：** `false`。

设置流的优先级。如果会话不支持优先级（例如非 HTTP/3），则抛出 `ERR_INVALID_STATE`。
如果流已被销毁，则无效。

### `stream[Symbol.asyncIterator]()`

<!-- YAML
added: REPLACEME
-->

* 返回：{AsyncIterableIterator} 产出 {Uint8Array\[]}

该流实现了 `Symbol.asyncIterator`，因此可直接用于 `for await...of` 循环。每次迭代都会产出一批
`Uint8Array` 块。

每个流只能获得一个异步迭代器。第二次调用会抛出 `ERR_INVALID_STATE`。不可读流（仅出站的单向流
或已关闭流）会返回一个立即完成的迭代器。

```mjs
for await (const chunks of stream) {
  for (const chunk of chunks) {
    // 处理每个 Uint8Array 块
  }
}
```

与 stream/iter 工具兼容：

```mjs
import Stream from 'node:stream/iter';
const body = await Stream.bytes(stream);
const text = await Stream.text(stream);
await Stream.pipeTo(stream, someWriter);
```

### `stream.writer`

<!-- YAML
added: REPLACEME
-->

* 类型：{Object}

返回一个 Writer 对象，用于逐步向流推送数据。Writer 实现了带有
try-sync-fallback-to-async 模式的 stream/iter Writer 接口。

仅在创建时或通过 [`stream.setBody()`][] 未提供 `body` 源时可用。不可写流会返回一个已关闭的 Writer。
如果出站已配置，则抛出 `ERR_INVALID_STATE`。

Writer 具有以下方法：

* `writeSync(chunk)` — 同步写入。如果接受则返回 `true`，如果受流量控制则返回 `false`。
  当返回 `false` 时，不会接受数据。
* `write(chunk[, options])` — 带等待排空的异步写入。`options.signal` 在入口处检查，但在写入期间不会持续观察。
* `writevSync(chunks)` — 同步向量写入。要么全部接受，要么全部不接受。
* `writev(chunks[, options])` — 异步向量写入。
* `endSync()` — 同步关闭。返回总字节数或 `-1`。
* `end([options])` — 异步关闭。
* `fail(reason)` — 使流出错（向对端发送 `RESET_STREAM`）。
  当 `reason` 是 [`QuicError`][] 时，其 [`error.errorCode`][] 会被用作
  结果 `RESET_STREAM` 帧上的线上错误码；否则线上错误码会回退到协商出的应用协议的
  “内部错误”码（HTTP/3 使用 `H3_INTERNAL_ERROR`（`0x102`），原生 QUIC 使用
  QUIC 传输层的 `INTERNAL_ERROR`（`0x1`））。
  有关也会通过 `STOP_SENDING` 重置可读侧的全流中止，请参见 [`stream.destroy()`][]。
* `desiredSize` — 可用容量（字节），如果已关闭/出错则为 `null`。

每个 `writeSync()` / `writevSync()` / `write()` / `writev()` 输入块中的字节都会被复制到内部缓冲区，
因此调用方的源缓冲区不会改变，并且可在调用返回后立即复用或修改。希望确保源缓冲区在交出后不能被修改的调用方，
可以在传入缓冲区之前自行调用 `ArrayBuffer.prototype.transfer()`。

### `stream.setBody(body)`

<!-- YAML
added: REPLACEME
-->

* `body` {string | ArrayBuffer | SharedArrayBuffer | ArrayBufferView |
  Blob | FileHandle | AsyncIterable | Iterable | Promise | null}

设置该流的出站主体源。只能调用一次。与 [`stream.writer`][] 互斥。

支持以下主体源类型：

* `null` — 可写侧立即关闭（发送不带数据的 FIN）。
* `string` — 以 UTF-8 编码并作为单个块发送。
* `ArrayBuffer`、`SharedArrayBuffer`、`ArrayBufferView` — 作为单个块发送。
  字节会被复制到内部缓冲区，因此调用方的源缓冲区不会改变，并且可在调用返回后立即复用或修改。
  希望确保源在交出后不能被修改的调用方，可以在传入缓冲区之前自行调用
  `ArrayBuffer.prototype.transfer()`。
* `Blob` — 从 Blob 底层的数据队列发送。
* {FileHandle} — 通过基于文件描述符的数据源异步读取文件内容。`FileHandle` 必须以读方式打开
  （例如通过 [`fs.promises.open(path, 'r')`][]）。一旦作为主体传入，该 `FileHandle` 就会被锁定，
  不能再用作另一个流的主体。流结束时会自动关闭 `FileHandle`。
* `AsyncIterable`、`Iterable` — 逐个将每个产出的块（字符串或 `Uint8Array`）以流式模式增量写入。
* `Promise` — 等待其兑现；将兑现值用作主体（并遵循相同的类型规则）。

如果出站已配置或已访问 writer，则抛出 `ERR_INVALID_STATE`。

### `stream.session`

<!-- YAML
added: v23.8.0
-->

* Type: {quic.QuicSession|null}

创建此流的会话；如果流已被销毁，则为 `null`。只读。

### `stream.stats`

<!-- YAML
added: v23.8.0
-->

* 类型：{quic.QuicStream.Stats}

流的当前统计信息。只读。

## 类：`QuicStream.Stats`

<!-- YAML
added: v23.8.0
-->

### `streamStats.ackedAt`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint}

### `streamStats.bytesReceived`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint}

### `streamStats.bytesSent`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint}

### `streamStats.createdAt`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint}

### `streamStats.destroyedAt`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint}

### `streamStats.finalSize`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint}

### `streamStats.isConnected`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint}

### `streamStats.maxOffset`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint}

### `streamStats.maxOffsetAcknowledged`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint}

### `streamStats.maxOffsetReceived`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint}

### `streamStats.openedAt`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint}

### `streamStats.receivedAt`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint}

## 类型

### 类型：`EndpointOptions`

<!-- YAML
added: v23.8.0
-->

* 类型：{Object}

构建新的 `QuicEndpoint` 实例时传递的端点配置选项。

#### `endpointOptions.address`

<!-- YAML
added: v23.8.0
-->

* 类型：{net.SocketAddress | string} 端点应绑定的本地 UDP 地址和端口。

如果未指定，端点将绑定到随机端口上的 IPv4 `localhost`。

#### `endpointOptions.addressLRUSize`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint|number}

端点会维护一个已验证套接字地址的内部缓存，以提升性能。此选项设置可缓存的最大地址数量。这是一个高级选项，用户通常无需指定。

#### `endpointOptions.disableStatelessReset`

<!-- YAML
added: REPLACEME
-->

* 类型：{boolean}

当为 `true` 时，端点不会针对来自未知连接的数据包发送无状态重置数据包。无状态重置允许对等方在服务器没有该连接状态时，仍能检测到连接已丢失。禁用它们可能在测试中有用，或者在无状态重置由不同层处理时有用。

#### `endpointOptions.idleTimeout`

<!-- YAML
added: REPLACEME
-->

* 类型：{number}
* 默认值：`0`

在所有会话关闭且端点不再监听后，端点保持存活的秒数。值为 `0`（默认）表示仅在通过 `endpoint.close()` 或 `endpoint.destroy()` 显式关闭时才销毁端点。正值会在端点变为空闲时启动空闲计时器；如果在计时器触发前没有创建新会话，端点将自动销毁。这对于连接池很有用，因为端点应短暂保留以便未来的 `connect()` 调用复用。

#### `endpointOptions.ipv6Only`

<!-- YAML
added: v23.8.0
-->

* 类型：{boolean}

当为 `true` 时，表示端点应仅绑定到 IPv6 地址。

#### `endpointOptions.maxConnectionsPerHost`

<!-- YAML
added: v23.8.0
-->

* 类型：{number}
* 默认值：`0`（无限制）

指定每个远程 IP 地址（忽略端口）允许的最大并发会话数。达到限制时，来自同一 IP 的新连接将以 `CONNECTION_REFUSED` 被拒绝。值为 `0` 可禁用该限制。最大值为 `65535`。

该限制也可以在构建后通过 [`endpoint.maxConnectionsPerHost`][] 动态更改。

#### `endpointOptions.maxConnectionsTotal`

<!-- YAML
added: v23.8.0
-->

* 类型：{number}
* 默认值：`0`（无限制）

指定所有远程地址上的最大并发会话总数。达到限制时，新连接将以 `CONNECTION_REFUSED` 被拒绝。值为 `0` 可禁用该限制。最大值为 `65535`。

该限制也可以在构建后通过 [`endpoint.maxConnectionsTotal`][] 动态更改。

#### `endpointOptions.maxRetries`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint|number}

指定每个远程对等点地址允许的最大 QUIC 重试尝试次数。

#### `endpointOptions.maxStatelessResetsPerHost`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint|number}

指定每个远程对等点地址允许的最大无状态重置次数。

#### `endpointOptions.retryTokenExpiration`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint|number}

指定 QUIC 重试令牌被视为有效的时长。

#### `endpointOptions.resetTokenSecret`

<!-- YAML
added: v23.8.0
-->

* 类型：{ArrayBufferView}

指定用于生成 QUIC 重试令牌的 16 字节密钥。

#### `endpointOptions.tokenExpiration`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint|number}

指定 QUIC 令牌被视为有效的时长。

#### `endpointOptions.tokenSecret`

<!-- YAML
added: v23.8.0
-->

* 类型：{ArrayBufferView}

指定用于生成 QUIC 令牌的 16 字节密钥。

#### `endpointOptions.udpReceiveBufferSize`

<!-- YAML
added: v23.8.0
-->

* 类型：{number}

#### `endpointOptions.udpSendBufferSize`

<!-- YAML
added: v23.8.0
-->

* 类型：{number}

#### `endpointOptions.udpTTL`

<!-- YAML
added: v23.8.0
-->

* 类型：{number}

#### `endpointOptions.validateAddress`

<!-- YAML
added: v23.8.0
-->

* 类型：{boolean}

当为 `true` 时，要求端点在建立新连接时使用重试数据包验证对等点地址。

### 类型：`SessionOptions`

<!-- YAML
added: v23.8.0
-->

#### `sessionOptions.alpn`

<!-- YAML
added: v26.1.0
-->

* 类型：{string}（客户端）| {string\[]}（服务器）

ALPN（应用层协议协商）标识符。

对于 **客户端** 会话，这是指定客户端想要使用的协议的单个字符串（例如 `'h3'`）。

对于 **服务器** 会话，这是服务器支持的协议名称列表，按首选项排序（例如 `['h3', 'h3-29']`）。在 TLS 握手期间，服务器会从其列表中选择客户端也支持的第一个协议。

协商的 ALPN 决定了用于会话的应用实现。`'h3'` 和 `'h3-*'` 变体选择 HTTP/3 应用；所有其他值选择默认应用。

默认值：`'h3'`

#### `sessionOptions.application`

<!-- YAML
added: REPLACEME
-->

* 类型：{Object}

HTTP/3 应用特定选项。这些选项仅在协商得到的 ALPN 选择 HTTP/3 应用（`'h3'`）时适用。

* `maxHeaderPairs` {number} 每个头块接受的 header 名值对最大数量。超出此限制的 header 会被静默丢弃。**默认值：** `128`
* `maxHeaderLength` {number} 每个头块中所有 header 名称和值合计的最大字节长度。会使总长度超出此限制的 header 会被静默丢弃。**默认值：** `8192`
* `maxFieldSectionSize` {number} 压缩后的 header 字段段（QPACK）最大大小。`0` 表示无限制。**默认值：** `0`
* `qpackMaxDTableCapacity` {number} QPACK 动态表容量，单位为字节。设置为 `0` 可禁用动态表。**默认值：** `4096`
* `qpackEncoderMaxDTableCapacity` {number} QPACK 编码器最大动态表容量。**默认值：** `4096`
* `qpackBlockedStreams` {number} 因等待 QPACK 动态表更新而可被阻塞的最大流数量。**默认值：** `100`
* `enableConnectProtocol` {boolean} 启用扩展 CONNECT 协议（RFC 9220）。**默认值：** `false`
* `enableDatagrams` {boolean} 启用 HTTP/3 数据报（RFC 9297）。**默认值：** `false`

```mjs
const { listen } = await import('node:quic');

await listen((session) => { /* ... */ }, {
  application: {
    maxHeaderPairs: 64,
    qpackMaxDTableCapacity: 8192,
    enableDatagrams: true,
  },
  // ... 其他会话选项
});
```

#### `sessionOptions.ca`（仅限客户端）

<!-- YAML
added: v23.8.0
-->

* 类型：{ArrayBuffer|ArrayBufferView|ArrayBuffer\[]|ArrayBufferView\[]}

客户端会话使用的 CA 证书。对于服务器会话，CA 证书在 [`sessionOptions.sni`][] 地图中按身份指定。

#### `sessionOptions.cc`

<!-- YAML
added: v23.8.0
-->

* 类型：{string}

指定将要使用的拥塞控制算法。
必须设置为 `'reno'`、`'cubic'` 或 `'bbr'` 之一。

这是一个高级选项，用户通常无需指定。

#### `sessionOptions.certs`（仅限客户端）

<!-- YAML
added: v23.8.0
-->

* 类型：{ArrayBuffer|ArrayBufferView|ArrayBuffer\[]|ArrayBufferView\[]}

客户端会话使用的 TLS 证书。对于服务器会话，证书在 [`sessionOptions.sni`][] 地图中按身份指定。

#### `sessionOptions.ciphers`

<!-- YAML
added: v23.8.0
-->

* 类型：{string}

支持的 TLS 1.3 加密算法列表。

#### `sessionOptions.crl`（仅限客户端）

<!-- YAML
added: v23.8.0
-->

* 类型：{ArrayBuffer|ArrayBufferView|ArrayBuffer\[]|ArrayBufferView\[]}

客户端会话使用的 CRL。对于服务器会话，CRL 在 [`sessionOptions.sni`][] 地图中按身份指定。

#### `sessionOptions.enableEarlyData`

<!-- YAML
added: REPLACEME
-->

* 类型：{boolean} **默认值：** `true`

当为 `true` 时，为此会话启用 TLS 0-RTT 早期数据。早期数据允许客户端在 TLS 握手完成之前发送应用数据，从而在有有效会话票据可用时降低重连延迟。设置为 `false` 可禁用早期数据支持。

#### `sessionOptions.groups`

<!-- YAML
added: v23.8.0
-->

* 类型：{string}

支持的 TLS 1.3 密码组列表。

#### `sessionOptions.keylog`

<!-- YAML
added: v23.8.0
-->

* 类型：{boolean}

当为 `true` 时，为会话启用 TLS 密钥日志记录。密钥材料会以 [NSS Key Log Format][] 的形式传递给 [`session.onkeylog`][] 回调。每次回调调用接收一行密钥材料。输出可与 Wireshark 等工具配合使用，以解密捕获的 QUIC 流量。

#### `sessionOptions.keys`（仅限客户端）

<!-- YAML
added: v23.8.0
changes:
  - version:
     - v25.9.0
     - v24.15.0
    pr-url: https://github.com/nodejs/node/pull/62335
    description: 不再接受 CryptoKey。
-->

* 类型：{KeyObject|KeyObject\[]}

客户端会话使用的 TLS 加密密钥。对于服务器会话，密钥在 [`sessionOptions.sni`][] 地图中按身份指定。

#### `sessionOptions.maxPayloadSize`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint|number}

指定最大 UDP 数据包负载大小。

#### `sessionOptions.maxStreamWindow`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint|number}

指定最大流流控窗口大小。

#### `sessionOptions.maxWindow`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint|number}

指定最大会话流控窗口大小。

#### `sessionOptions.minVersion`

<!-- YAML
added: v23.8.0
-->

* 类型：{number}

允许的最小 QUIC 版本号。这是一个高级选项，用户通常无需指定。

#### `sessionOptions.preferredAddressPolicy`

<!-- YAML
added: v23.8.0
-->

* 类型：{string} `'use'`、`'ignore'` 或 `'default'` 其中之一。

当远程对等点通告首选地址时，此选项指定是使用它还是忽略它。

#### `sessionOptions.qlog`

<!-- YAML
added: v23.8.0
-->

* 类型：{boolean}

当为 `true` 时，为会话启用 [qlog][] 诊断输出。Qlog 数据会以 [JSON-SEQ][] 格式文本块的形式传递给 [`session.onqlog`][] 回调。输出可使用 [qvis][] 等 qlog 可视化工具进行分析。

#### `sessionOptions.sessionTicket`

<!-- YAML
added: v23.8.0
-->

* 类型：{ArrayBufferView} 用于 0RTT 会话恢复的会话令牌。

#### `sessionOptions.datagramDropPolicy`

<!-- YAML
added: REPLACEME
-->

* 类型：{string}
* **默认值：** `'drop-oldest'`

控制当待处理数据报队列（由 [`session.maxPendingDatagrams`][] 决定大小）已满时丢弃哪个数据报。必须是 `'drop-oldest'`（丢弃队列中最旧的数据报以腾出空间）或 `'drop-newest'`（拒绝传入的数据报）之一。被丢弃的数据报会通过 `ondatagramstatus` 回调报告为丢失。

此选项在会话创建后不可变。

#### `sessionOptions.maxDatagramSendAttempts`

* 类型：{number}
* **默认值：** `5`

数据报在被放弃之前，在未发送状态下最多可经历的 `SendPendingData` 循环次数。当由于拥塞控制或数据包大小限制而无法发送数据报时，它会留在队列中，尝试计数器递增。一旦达到限制，该数据报将被丢弃，并通过 `ondatagramstatus` 回调报告为 `'abandoned'`。有效范围：`1` 到 `255`。

#### `sessionOptions.drainingPeriodMultiplier`

<!-- YAML
added: REPLACEME
-->

* 类型：{number}
* **默认值：** `3`

用于计算在从对等方接收到 `CONNECTION_CLOSE` 帧后排空期持续时间的 Probe Timeout（PTO）乘数。RFC 9000 第 10.2 节要求排空期至少持续当前 PTO 的三倍。有效范围为 `3` 到 `255`。低于 `3` 的值会被钳制为 `3`。

#### `sessionOptions.handshakeTimeout`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint|number}

指定 TLS 握手在完成前允许花费的最大毫秒数，超过该时间将超时。

#### `sessionOptions.keepAlive`

<!-- YAML
added: REPLACEME
-->

* 类型：{bigint|number}
* **默认值：** `0`（已禁用）

指定保活超时时间，单位为毫秒。当设置为非零值时，会自动发送 PING 帧，以便在空闲超时触发之前保持连接存活。该值应小于有效的空闲超时（`maxIdleTimeout` 传输参数），这样才有意义。

#### `sessionOptions.servername`（仅限客户端）

<!-- YAML
added: v23.8.0
-->

* 类型：{string}

目标对等服务器名称（SNI）。默认为 `'localhost'`。

#### `sessionOptions.sni`（仅限服务器）

<!-- YAML
added: v26.1.0
-->

* 类型：{Object}

一个将主机名映射到 TLS 身份选项的对象，用于支持服务器名称指示（SNI）。这对于服务器会话是必需的，并且至少必须包含一个条目。特殊键 `'*'` 指定当没有其他主机名匹配时使用的可选默认/回退身份。如果未提供通配符条目，则带有无法识别的服务器名称的连接将以 TLS `unrecognized_name` 警报被拒绝。每个条目可包含：

* `keys` {KeyObject|KeyObject\[]} TLS 私钥。**必需。**
* `certs` {ArrayBuffer|ArrayBufferView|ArrayBuffer\[]|ArrayBufferView\[]}
  TLS 证书。**必需。**
  可选的证书吊销列表。
* `verifyPrivateKey` {boolean} 验证私钥。默认值：`false`。
* `port` {number} 在 ORIGIN 帧（RFC 9412）中为此主机名通告的端口。**默认值：** `443`。仅用于 HTTP/3 会话。
* `authoritative` {boolean} 是否将此主机名包含在 ORIGIN 帧中。**默认值：** `true`。设置为 `false` 可将主机名排除在 ORIGIN 通告之外。通配符（`'*'`）条目无论此设置如何都始终被排除。

```mjs
const endpoint = await listen(callback, {
  sni: {
    '*': { keys: [defaultKey], certs: [defaultCert] },
    'api.example.com': { keys: [apiKey], certs: [apiCert], port: 8443 },
    'www.example.com': { keys: [wwwKey], certs: [wwwCert], ca: [customCA] },
    'internal.example.com': { keys: [intKey], certs: [intCert], authoritative: false },
  },
});
```

共享的 TLS 选项（例如 `ciphers`、`groups`、`keylog` 和 `verifyClient`）在会话选项的顶层指定，并适用于所有身份。每个 SNI 条目仅覆盖每个身份的证书字段。

可以通过在运行时使用 `endpoint.setSNIContexts()` 来替换 SNI 映射，该方法会原子地交换映射以供新会话使用，而现有会话将继续使用其原始身份。

#### `sessionOptions.tlsTrace`

<!-- YAML
added: v23.8.0
-->

* 类型：{boolean}

为 true 以启用 TLS 追踪输出。

#### `sessionOptions.token`（仅限客户端）

<!-- YAML
added: REPLACEME
-->

* 类型：{ArrayBufferView}

一个不透明的地址验证令牌，先前已通过 [`session.onnewtoken`][] 回调从服务器接收。在重新连接时提供有效令牌可让客户端跳过服务器的地址验证，从而降低握手延迟。

#### `sessionOptions.transportParams`

<!-- YAML
added: v23.8.0
-->

* 类型：{quic.TransportParams}

用于会话的 QUIC 传输参数。

#### `sessionOptions.unacknowledgedPacketThreshold`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint|number}

指定会话允许的最大未确认数据包数。

#### `sessionOptions.rejectUnauthorized`

<!-- YAML
added: REPLACEME
-->

* 类型：{boolean} **默认值：** `true`

如果为 `true`，则会根据提供的 CA 列表验证对等证书。如果验证失败则会发出错误；可在握手回调中的 `validationErrorReason` 和 `validationErrorCode` 字段查看该错误。如果为 `false`，则会忽略对等证书验证错误。

#### `sessionOptions.reuseEndpoint`

<!-- YAML
added: REPLACEME
-->

* 类型：{boolean}
* 默认值：`true`

当为 `true`（默认值）时，`connect()` 会尝试复用现有端点，而不是为每个会话创建新端点。这提供了连接池行为——多个会话可以共享一个 UDP 套接字。复用逻辑不会返回监听于与连接目标相同地址上的端点（以防止 CID 路由冲突）。

设置为 `false` 可强制为该会话创建新端点。当需要端点隔离时，这很有用（例如，测试无状态重置行为时，源端口身份很重要）。

#### `sessionOptions.verifyClient`

<!-- YAML
added: v23.8.0
-->

* 类型：{boolean}

为 true 以要求验证 TLS 客户端证书。

#### `sessionOptions.verifyPrivateKey`（仅限客户端）

<!-- YAML
added: v23.8.0
-->

* 类型：{boolean}

为 true 以要求客户端会话的私钥验证。对于服务器会话，此选项在 [`sessionOptions.sni`][] 地图中按身份指定。

#### `sessionOptions.version`

<!-- YAML
added: v23.8.0
-->

* 类型：{number}

要使用的 QUIC 版本号。这是一个高级选项，用户通常无需指定。

### 类型：`TransportParams`

<!-- YAML
added: v23.8.0
-->

#### `transportParams.preferredAddressIpv4`

<!-- YAML
added: v23.8.0
-->

* 类型：{net.SocketAddress} 要通告的首选 IPv4 地址（仅由服务器使用）。

#### `transportParams.preferredAddressIpv6`

<!-- YAML
added: v23.8.0
-->

* 类型：{net.SocketAddress} 要通告的首选 IPv6 地址（仅由服务器使用）

#### `transportParams.initialMaxStreamDataBidiLocal`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint|number}

#### `transportParams.initialMaxStreamDataBidiRemote`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint|number}

#### `transportParams.initialMaxStreamDataUni`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint|number}

#### `transportParams.initialMaxData`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint|number}

#### `transportParams.initialMaxStreamsBidi`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint|number}

#### `transportParams.initialMaxStreamsUni`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint|number}

#### `transportParams.maxIdleTimeout`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint|number}

#### `transportParams.activeConnectionIDLimit`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint|number}

#### `transportParams.ackDelayExponent`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint|number}

#### `transportParams.maxAckDelay`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint|number}

#### `transportParams.maxDatagramFrameSize`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint|number}
* **默认值：** `1200`

此端点愿意接收的 DATAGRAM 帧负载的最大字节数。设置为 `0` 可禁用数据报支持。对等方不会发送大于此值的数据报。实际可 _发送_ 的数据报最大大小由对等方的 `maxDatagramFrameSize` 决定，而不是此端点的值。

## 回调

### 回调错误处理

所有会话和流回调都可以是同步函数或异步函数。如果回调同步抛出错误或返回一个被拒绝的 promise，则该错误会被捕获，并且所属会话或流会因该错误而被销毁：

* 流回调（`onblocked`、`onreset`、`onheaders`、`ontrailers`、
  `oninfo`、`onwanttrailers`）：流会被销毁。
* 会话回调（`onstream`、`ondatagram`、`ondatagramstatus`、
  `onpathvalidation`、`onsessionticket`、`onnewtoken`、
  `onversionnegotiation`、`onorigin`、`ongoaway`、`onhandshake`、
  `onkeylog`、`onqlog`）：会话及其所有流都会被销毁。

在销毁之前，会先调用可选的 [`session.onerror`][] 或
[`stream.onerror`][] 回调（如果已设置），让应用有机会观察或记录该错误。`session.closed` 或 `stream.closed`
promise 将以该错误拒绝。

如果 `onerror` 回调本身抛出错误或返回一个被拒绝的 promise，
则 `onerror` 中的错误会作为未捕获异常抛出。

### 回调：`OnSessionCallback`

<!-- YAML
added: v23.8.0
-->

* `this` {quic.QuicEndpoint}
* `session` {quic.QuicSession}

当远程对等方发起新会话时调用的回调函数。

### 回调：`OnStreamCallback`

<!-- YAML
added: v23.8.0
-->

* `this` {quic.QuicSession}
* `stream` {quic.QuicStream}

### 回调：`OnDatagramCallback`

<!-- YAML
added: v23.8.0
-->

* `this` {quic.QuicSession}
* `datagram` {Uint8Array}
* `early` {boolean}

### 回调：`OnDatagramStatusCallback`

<!-- YAML
added: v23.8.0
-->

* `this` {quic.QuicSession}
* `id` {bigint}
* `status` {string} `'acknowledged'`、`'lost'` 或 `'abandoned'` 之一。
  `'acknowledged'` 表示对端已确认接收。`'lost'` 表示
  数据报已发送但在网络中丢失。`'abandoned'` 表示
  数据报从未在链路上传输（由于队列溢出、
  超过发送尝试限制或帧大小被拒绝而被丢弃）。

### 回调：`OnPathValidationCallback`

<!-- YAML
added: v23.8.0
-->

* `this` {quic.QuicSession}
* `result` {string} `'success'`、`'failure'` 或 `'aborted'` 之一。
* `newLocalAddress` {net.SocketAddress} 已验证路径的本地地址。
* `newRemoteAddress` {net.SocketAddress} 已验证路径的远程地址。
* `oldLocalAddress` {net.SocketAddress | null} 先前
  路径的本地地址；如果这是首次路径验证，则为 `null`（例如，从客户端视角看的首选地址迁移）。
* `oldRemoteAddress` {net.SocketAddress | null} 先前
  路径的远程地址；如果没有则为 `null`。
* `preferredAddress` {boolean} 如果路径验证是由
  客户端侧的首选地址迁移触发，则为 `true`。在服务器端为 `undefined`。

### 回调：`OnSessionTicketCallback`

<!-- YAML
added: v23.8.0
-->

* `this` {quic.QuicSession}
* `ticket` {Object}

### 回调：`OnVersionNegotiationCallback`

<!-- YAML
added: v23.8.0
-->

* `this` {quic.QuicSession}
* `version` {number} 为此会话配置的 QUIC 版本
  （服务器不支持的版本）。
* `requestedVersions` {number\[]} 服务器在版本协商包中宣布的版本。这些是服务器支持的版本。
* `supportedVersions` {number\[]} 本地支持的版本，以
  二元数组 `[minVersion, maxVersion]` 表示。

当服务器用版本协商包响应客户端的 Initial 包，
表明客户端使用的版本不受支持时调用。此回调返回后，
会话总是立即被销毁。

### 回调：`OnHandshakeCallback`

<!-- YAML
added: v23.8.0
-->

* `this` {quic.QuicSession}
* `info` {Object} 与 `session.opened` 解析结果相同的对象。
  * `local` {net.SocketAddress} 本地套接字地址。
  * `remote` {net.SocketAddress} 远程套接字地址。
  * `servername` {string} 在握手期间协商得到的 SNI 服务器名。
  * `protocol` {string} 在握手期间协商得到的 ALPN 协议。
  * `cipher` {string} 协商得到的 TLS 密码套件名称。
  * `cipherVersion` {string} 该密码套件所使用的 TLS 协议版本。
  * `validationErrorReason` {string} 如果证书验证失败，则为原因字符串。验证成功时为空字符串。
  * `validationErrorCode` {number} 如果证书验证失败，则为错误代码。验证成功时为 `0`。
  * `earlyDataAttempted` {boolean} 是否尝试了 0-RTT 早期数据。
  * `earlyDataAccepted` {boolean} 是否接受了 0-RTT 早期数据。

### 回调：`OnNewTokenCallback`

<!-- YAML
added: REPLACEME
-->

* `this` {quic.QuicSession}
* `token` {Buffer} NEW_TOKEN 令牌数据。
* `address` {SocketAddress} 与该令牌关联的远程地址。

### 回调：`OnOriginCallback`

<!-- YAML
added: REPLACEME
-->

* `this` {quic.QuicSession}
* `origins` {string\[]} 服务器具有权威性的 origin 列表。

### 回调：`OnKeylogCallback`

<!-- YAML
added: REPLACEME
-->

* `this` {quic.QuicSession}
* `line` {string} [NSS Key Log Format][] 文本的一行，
  包括末尾的换行符。

当 TLS 密钥材料可用时调用。仅当
[`sessionOptions.keylog`][] 为 `true` 时触发。在
TLS 1.3 握手期间会发出多行，每行包含一个密钥标签、客户端随机数和
密钥值。

### 回调：`OnQlogCallback`

<!-- YAML
added: REPLACEME
-->

* `this` {quic.QuicSession}
* `data` {string} 一段 [JSON-SEQ][] 格式的 [qlog][] 数据。
* `fin` {boolean} 如果这是该会话最后一个 qlog 数据块，则为 `true`。

当 qlog 诊断数据可用时调用。仅当
[`sessionOptions.qlog`][] 为 `true` 时触发。`data` 数据块应按顺序
拼接，以生成完整的 qlog 输出。当 `fin` 为
`true` 时，不会再发出更多数据块，拼接结果是一个完整的 JSON-SEQ 文档。

### 回调：`OnBlockedCallback`

<!-- YAML
added: v23.8.0
-->

* `this` {quic.QuicStream}

### 回调：`OnStreamErrorCallback`

<!-- YAML
added: v23.8.0
-->

* `this` {quic.QuicStream}
* `error` {any}

### 回调：`OnHeadersCallback`

<!-- YAML
added: REPLACEME
-->

* `this` {quic.QuicStream}
* `headers` {Object} 标头对象，键为小写字符串，
  值为字符串或字符串数组。

当接收到初始请求或响应标头时调用。对于 HTTP/3，
这会在服务器端传递请求伪标头，在客户端传递响应标头。

### 回调：`OnTrailersCallback`

<!-- YAML
added: REPLACEME
-->

* `this` {quic.QuicStream}
* `trailers` {Object} 尾随标头对象。

当从对端接收到尾随标头时调用。

### 回调：`OnInfoCallback`

<!-- YAML
added: REPLACEME
-->

* `this` {quic.QuicStream}
* `headers` {Object} 信息性标头对象。

当从服务器接收到信息性（1xx）标头时调用
（例如，103 Early Hints）。

## HTTP/3 支持

<!-- YAML
added: REPLACEME
-->

当协商得到的 ALPN 标识符是 `'h3'`（或 `'h3-*'`
草案变体之一）时，QUIC 会话将运行由
`nghttp3` 支持的 HTTP/3 应用。`'h3'` 是
`quic.connect()` 和 `quic.listen()` 的默认 ALPN，因此除非你显式
选择不同的 ALPN，否则你获得的就是 HTTP/3。

选择 HTTP/3 应用后，会启用一系列流级和
会话级能力，这些能力对非 HTTP/3
应用不可用：

* **标头和尾随标头** — 请求和响应标头块
  （包括诸如 `:method`、`:path`、`:scheme`、
  `:authority` 和 `:status` 之类的伪标头）、尾随标头，以及信息性
  （`1xx`）响应。参见 [`stream.sendHeaders()`][]、
  [`stream.sendTrailers()`][]，以及
  [`stream.sendInformationalHeaders()`][]。
* **流优先级（RFC 9218）** — 每个流的紧急度和
  增量标志。参见 [`stream.priority`][] 和
  [`stream.setPriority()`][]。
* **HTTP/3 数据报（RFC 9297）** — 不可靠的应用层
  数据报。对端必须声明 `SETTINGS_H3_DATAGRAM=1`，这
  可以通过在双方都将 [`application.enableDatagrams`][] 设置为 `true`
  来启用。参见 [`session.sendDatagram()`][] 和
  [`session.ondatagram`][]。
* **ORIGIN 帧（RFC 9412）** — 服务器会自动声明其
  [`sessionOptions.sni`][] 映射中的主机名（`authoritative: true` 的条目）；客户端通过
  [`session.onorigin`][] 接收列表。
* **GOAWAY** — 优雅关闭。服务器会作为
  [`session.close()`][] 的一部分发出 `GOAWAY`；客户端通过
  [`session.ongoaway`][] 观察到它，并停止打开新的双向流。
* **扩展 CONNECT 设置（RFC 9220）** — 可通过
  [`application.enableConnectProtocol`][] 启用
  `SETTINGS_ENABLE_CONNECT_PROTOCOL` 设置。该设置会被交换，
  但应用需要负责处理 `:protocol`
  伪标头及其上层的任何负载分帧。
* **QPACK 调优** — 通过 [`application.qpackMaxDTableCapacity`][]
  等项控制动态表大小和被阻塞流限制。

### 最小 HTTP/3 客户端

```mjs
import { connect } from 'node:quic';
import process from 'node:process';

const session = await connect('example.com:443', {
  // ALPN 默认为 'h3'。
  servername: 'example.com',
});
await session.opened;

const stream = await session.createBidirectionalStream({
  headers: {
    ':method': 'GET',
    ':path': '/',
    ':scheme': 'https',
    ':authority': 'example.com',
  },
  onheaders(headers) {
    console.log('status:', headers[':status']);
  },
});

const decoder = new TextDecoder();
for await (const chunks of stream) {
  for (const chunk of chunks) {
    process.stdout.write(decoder.decode(chunk, { stream: true }));
  }
}

await session.close();
```

有几点需要注意：

* `session.createBidirectionalStream({ headers })` 在未提供 `body` 时会自动
  将 HEADERS 帧标记为终止帧——
  请求即为 `HEADERS` 后跟 `END_STREAM`。
* `onheaders` 回调会在一个对象中接收响应伪标头和
  常规标头，键为小写字符串。
  回调返回后，同一个对象也可通过
  [`stream.headers`][] 访问。
* 读取 `for await (const chunks of stream)` 会消耗响应
  主体。每次迭代都会产出一个 `Uint8Array[]` 分块批次。
* HTTP 语义辅助功能（URL 解析、方法/状态校验、
  重定向、内容协商等）是刻意未
  内置的。除线上帧格式之外的任何 HTTP 层处理都
  由调用方负责。

### 最小 HTTP/3 服务器

```mjs
import { listen } from 'node:quic';

const encoder = new TextEncoder();

const endpoint = await listen((session) => {
  // 每当有新的客户端发起流时，session.onstream 回调都会触发。
}, {
  sni: { '*': { keys: [defaultKey], certs: [defaultCert] } },
  // ALPN 默认为 'h3'。
  onheaders(headers) {
    // `this` 是 QuicStream。伪标头可在
    // 请求标头块中获取（`:method`、`:path`、`:scheme`、
    // `:authority`）。
    if (headers[':path'] === '/health') {
      this.sendHeaders({ ':status': '200', 'content-type': 'text/plain' });
      const w = this.writer;
      w.writeSync(encoder.encode('ok\n'));
      w.endSync();
    } else {
      this.sendHeaders({ ':status': '404' }, { terminal: true });
    }
  },
});

console.log('listening on', endpoint.address);
```

服务器端说明：

* 在 [`listen()`][`quic.listen()`] 级别设置 `onheaders`
  会将其应用于每个传入流（它会在
  `onstream` 触发之前就已接线）。在 `onstream` 中设置它
  对 HTTP/3 来说已经太晚了，因为请求 HEADERS 帧是到达流上的第一件事。
* `this.sendHeaders(headers, { terminal: true })` 会将
  响应 HEADERS 帧标记为终止帧（后面不再跟随主体）。
* 对于带主体的响应，请先发送标头，然后写入
  `this.writer` 并调用 `endSync()`，以发送主体并干净地关闭
  流。

### 未实现内容

* **服务器推送** — `PUSH_PROMISE` 及相关的推送流
  机制尚未实现，也不在近期
  路线图中。服务器推送在实际部署中使用有限，而且大多数
  用例更适合使用 Early Hints（`103`）或由客户端直接
  发起获取。
* **WebTransport / 扩展 CONNECT 辅助功能** — 可以协商
  `SETTINGS_ENABLE_CONNECT_PROTOCOL` 设置，但目前没有对 `:protocol`
  伪标头、WebTransport 数据报去复用或胶囊分帧的
  内置支持。
* **更高层的 HTTP 语义** — 没有内置的
  请求/响应路由器、URL 解析、内容编码
  协商、主体类型强制转换、重定向跟随或
  Cookie 处理。这些都刻意留给建立在 `node:quic` 之上的
  更高层库来实现。

## 性能测量

<!-- YAML
added: REPLACEME
-->

QUIC 会话、流和端点会发出 `[`PerformanceEntry`][]` 对象，
其 `entryType` 设置为 `'quic'`。这些条目仅在
[`PerformanceObserver`][] 正在观察 `'quic'` 条目类型时才会创建，
从而在未使用时确保零开销。

每个条目提供：

* `name` {string} `'QuicEndpoint'`、`'QuicSession'` 或 `'QuicStream'` 之一。
* `entryType` {string} 始终为 `'quic'`。
* `startTime` {number} 对象创建时的高精度时间戳（ms）。
* `duration` {number} 从创建到销毁的生命周期，单位为毫秒。
* `detail` {Object} 条目特定的元数据（见下文）。

### `QuicEndpoint` 条目

* `detail.stats` {QuicEndpointStats} 端点的统计对象
  （在销毁时冻结）。

### `QuicSession` 条目

* `detail.stats` {QuicSessionStats} 会话的统计对象
  （在销毁时冻结）。包括发送/接收字节数、RTT
  测量、拥塞窗口、数据包计数等。
* `detail.handshake` {Object|undefined} 与时序相关的握手元数据，
  如果握手在销毁前未完成，则为 `undefined`。
  * `servername` {string} 协商得到的 SNI 服务器名。
  * `protocol` {string} 协商得到的 ALPN 协议。
  * `earlyDataAttempted` {boolean} 是否尝试了 0-RTT 早期数据。
  * `earlyDataAccepted` {boolean} 是否接受了 0-RTT 早期数据。
* `detail.path` {Object|undefined} 会话的网络路径，
  如果尚未建立则为 `undefined`。
  * `local` {net.SocketAddress}
  * `remote` {net.SocketAddress}

### `QuicStream` 条目

* `detail.stats` {QuicStreamStats} 流的统计对象
  （在销毁时冻结）。包括发送/接收字节数、时间
  时间戳以及偏移跟踪。
* `detail.direction` {string} 为 `'bidi'` 或 `'uni'`。

### 示例

```mjs
import { PerformanceObserver } from 'node:perf_hooks';

const obs = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(`${entry.name}: ${entry.duration.toFixed(1)}ms`);
    if (entry.name === 'QuicSession') {
      const { stats, handshake } = entry.detail;
      console.log(`  protocol: ${handshake?.protocol}`);
      console.log(`  bytes sent: ${stats.bytesSent}`);
      console.log(`  smoothed RTT: ${stats.smoothedRtt}ns`);
    }
  }
});
obs.observe({ entryTypes: ['quic'] });
```

## 诊断通道

### 通道：`quic.endpoint.created`

<!-- YAML
added: v23.8.0
-->

* `endpoint` {quic.QuicEndpoint}
* `config` {quic.EndpointOptions}

在创建新的端点时发布。

### 通道：`quic.endpoint.listen`

<!-- YAML
added: v23.8.0
-->

* `endpoint` {quic.QuicEndpoint}
* `options` {quic.SessionOptions}

在端点开始监听传入连接时发布。

### 通道：`quic.endpoint.connect`

<!-- YAML
added: REPLACEME
-->

* `endpoint` {quic.QuicEndpoint}
* `address` {net.SocketAddress} 目标服务器地址。
* `options` {quic.SessionOptions}

在 [`quic.connect()`][] 即将创建客户端会话时发布。
它会在 ngtcp2 连接建立之前触发，使诊断
订阅者能够观察连接意图。

### 通道：`quic.endpoint.closing`

<!-- YAML
added: v23.8.0
-->

* `endpoint` {quic.QuicEndpoint}
* `hasPendingError` {boolean}

在端点开始正常关闭时发布。

### 通道：`quic.endpoint.closed`

<!-- YAML
added: v23.8.0
-->

* `endpoint` {quic.QuicEndpoint}
* `stats` {quic.QuicEndpoint.Stats} 最终端点统计信息。

在端点完成关闭并被销毁时发布。

### 通道：`quic.endpoint.error`

<!-- YAML
added: v23.8.0
-->

* `endpoint` {quic.QuicEndpoint}
* `error` {any}

在端点遇到会导致其关闭的错误时发布。

### 通道：`quic.endpoint.busy.change`

<!-- YAML
added: v23.8.0
-->

* `endpoint` {quic.QuicEndpoint}
* `busy` {boolean}

在端点的繁忙状态发生变化时发布。

### 通道：`quic.session.created.client`

<!-- YAML
added: v23.8.0
-->

* `endpoint` {quic.QuicEndpoint}
* `session` {quic.QuicSession}
* `address` {net.SocketAddress} 远程服务器地址。
* `options` {quic.SessionOptions}

在创建客户端发起的会话时发布。

### 通道：`quic.session.created.server`

<!-- YAML
added: v23.8.0
-->

* `endpoint` {quic.QuicEndpoint}
* `session` {quic.QuicSession}
* `address` {net.SocketAddress|undefined} 远程对等方地址。

在为传入连接创建服务器端会话时发布。

### 通道：`quic.session.open.stream`

<!-- YAML
added: v23.8.0
-->

* `stream` {quic.QuicStream}
* `session` {quic.QuicSession}
* `direction` {string} 为 `'bidi'` 或 `'uni'`。

在本地发起的流被打开时发布。

### 通道：`quic.session.received.stream`

<!-- YAML
added: v23.8.0
-->

* `stream` {quic.QuicStream}
* `session` {quic.QuicSession}
* `direction` {string} 为 `'bidi'` 或 `'uni'`。

在接收到远程发起的流时发布。

### 通道：`quic.session.send.datagram`

<!-- YAML
added: v23.8.0
-->

* `id` {bigint} 数据报 ID。
* `length` {number} 数据报负载大小，单位为字节。
* `session` {quic.QuicSession}

在数据报被排队等待发送时发布。

### 通道：`quic.session.update.key`

<!-- YAML
added: v23.8.0
-->

* `session` {quic.QuicSession}

在发起 TLS 密钥更新时发布。

### 通道：`quic.session.closing`

<!-- YAML
added: v23.8.0
-->

* `session` {quic.QuicSession}

在会话开始正常关闭时发布（包括从对等方接收到
GOAWAY 帧时）。

### 通道：`quic.session.closed`

<!-- YAML
added: v23.8.0
-->

* `session` {quic.QuicSession}
* `error` {any} 导致关闭的错误；如果是正常关闭则为 `undefined`。
* `stats` {quic.QuicSession.Stats} 最终会话统计信息。

在会话被销毁时发布。`stats` 对象是销毁时刻最终统计
信息的快照。

### 通道：`quic.session.error`

<!-- YAML
added: REPLACEME
-->

* `session` {quic.QuicSession}
* `error` {any} 导致会话被销毁的错误。

在会话因错误而被销毁时发布。它会在
`onerror` 回调之前以及流被拆除之前触发。与
`quic.session.closed`（该通道在正常关闭和错误关闭时都会触发）不同，这个
通道仅在存在错误时触发，因此适合
仅错误告警。

### 通道：`quic.session.receive.datagram`

<!-- YAML
added: v23.8.0
-->

* `length` {number} 数据报负载大小，单位为字节。
* `early` {boolean} 该数据报是否作为 0-RTT 早期数据接收。
* `session` {quic.QuicSession}

在从远程对等方接收到数据报时发布。

### 通道：`quic.session.receive.datagram.status`

<!-- YAML
added: v23.8.0
-->

* `id` {bigint} 数据报 ID。
* `status` {string} 为 `'acknowledged'`、`'lost'` 或 `'abandoned'` 之一。
* `session` {quic.QuicSession}

在已发送数据报的送达状态更新时发布。

### 通道：`quic.session.path.validation`

<!-- YAML
added: v23.8.0
-->

* `result` {string} 为 `'success'`、`'failure'` 或 `'aborted'` 之一。
* `newLocalAddress` {net.SocketAddress}
* `newRemoteAddress` {net.SocketAddress}
* `oldLocalAddress` {net.SocketAddress|null}
* `oldRemoteAddress` {net.SocketAddress|null}
* `preferredAddress` {boolean}
* `session` {quic.QuicSession}

在路径验证尝试完成时发布。

### 通道：`quic.session.new.token`

<!-- YAML
added: REPLACEME
-->

* `token` {Buffer} NEW_TOKEN 令牌数据。
* `address` {net.SocketAddress} 远程服务器地址。
* `session` {quic.QuicSession}

在客户端会话从服务器接收到 NEW_TOKEN 帧时发布。

### 通道：`quic.session.ticket`

<!-- YAML
added: v23.8.0
-->

* `ticket` {Object} 不透明的会话票据。
* `session` {quic.QuicSession}

在接收到新的 TLS 会话票据时发布。

### 通道：`quic.session.version.negotiation`

<!-- YAML
added: v23.8.0
-->

* `version` {number} 为此会话配置的 QUIC 版本。
* `requestedVersions` {number\[]} 服务器通告的版本。
* `supportedVersions` {number\[]} 本地支持的版本。
* `session` {quic.QuicSession}

在客户端从服务器接收到版本协商包时发布。会话总是在之后立即被销毁。

### 通道：`quic.session.receive.origin`

<!-- YAML
added: REPLACEME
-->

* `origins` {string\[]} 服务器具有权威性的来源列表。
* `session` {quic.QuicSession}

在会话从对等方接收到 ORIGIN 帧（RFC 9412）时发布。

### 通道：`quic.session.handshake`

<!-- YAML
added: v23.8.0
-->

* `session` {quic.QuicSession}
* `servername` {string}
* `protocol` {string}
* `cipher` {string}
* `cipherVersion` {string}
* `validationErrorReason` {string}
* `validationErrorCode` {number}
* `earlyDataAttempted` {boolean}
* `earlyDataAccepted` {boolean}

在 TLS 握手完成时发布。

### 通道：`quic.session.goaway`

<!-- YAML
added: REPLACEME
-->

* `session` {quic.QuicSession}
* `lastStreamId` {bigint} 对等方可能已处理的最高流 ID。

在对等方发送 HTTP/3 GOAWAY 帧时发布。ID 高于
`lastStreamId` 的流未被处理，可在新的
连接上重试。`lastStreamId` 为 `-1n` 表示在没有
流边界的情况下发出的关闭通知。

### 通道：`quic.session.early.rejected`

<!-- YAML
added: REPLACEME
-->

* `session` {quic.QuicSession}

在服务器拒绝 0-RTT 早期数据时发布。在 0-RTT 阶段打开的所有流都已被销毁。用于在预期
0-RTT 应该成功时诊断延迟回退。

### 通道：`quic.stream.closed`

<!-- YAML
added: REPLACEME
-->

* `stream` {quic.QuicStream}
* `session` {quic.QuicSession}
* `error` {any} 导致关闭的错误；如果是正常关闭则为 `undefined`。
* `stats` {quic.QuicStream.Stats} 最终流统计信息。

在流被销毁时发布。`stats` 对象是销毁时刻最终统计
信息的快照。

### 通道：`quic.stream.headers`

<!-- YAML
added: REPLACEME
-->

* `stream` {quic.QuicStream}
* `session` {quic.QuicSession}
* `headers` {Object} 初始请求或响应头。

在流上接收到初始头时发布。对于 HTTP/3
服务器端流，这包含请求伪首部（`:method`、
`:path` 等）。对于客户端流，这包含响应头
（`:status` 等）。

### 通道：`quic.stream.trailers`

<!-- YAML
added: REPLACEME
-->

* `stream` {quic.QuicStream}
* `session` {quic.QuicSession}
* `trailers` {Object} 尾部标头。

在流上接收到尾部标头时发布。

### 通道：`quic.stream.info`

<!-- YAML
added: REPLACEME
-->

* `stream` {quic.QuicStream}
* `session` {quic.QuicSession}
* `headers` {Object} 信息性标头。

在流上接收到信息性（1xx）标头时发布
（例如 103 Early Hints）。

### 通道：`quic.stream.reset`

<!-- YAML
added: REPLACEME
-->

* `stream` {quic.QuicStream}
* `session` {quic.QuicSession}
* `error` {any} 与重置相关的 QUIC 错误。

在流从对等方接收到 STOP_SENDING 或 RESET_STREAM 帧
时发布，表示对等方已中止该流。这是
诊断应用层问题（例如已取消的
请求）的关键信号。

### 通道：`quic.stream.blocked`

<!-- YAML
added: REPLACEME
-->

* `stream` {quic.QuicStream}
* `session` {quic.QuicSession}

在流因流控而被阻塞、且在对等方增加流控窗口
之前无法发送数据时发布。用于诊断由流控导致的吞吐量问题。

[中止流]: #aborting-a-stream
[回调错误处理]: #callback-error-handling
[JSON-SEQ]: https://www.rfc-editor.org/rfc/rfc7464
[NSS Key Log Format]: https://udn.realityripple.com/docs/Mozilla/Projects/NSS/Key_Log_Format
[Permission Model]: permissions.md#permission-model
[RFC 8999]: https://www.rfc-editor.org/rfc/rfc8999
[RFC 9000]: https://www.rfc-editor.org/rfc/rfc9000
[RFC 9001]: https://www.rfc-editor.org/rfc/rfc9001
[RFC 9002]: https://www.rfc-editor.org/rfc/rfc9002
[RFC 9114]: https://www.rfc-editor.org/rfc/rfc9114
[RFC 9204]: https://www.rfc-editor.org/rfc/rfc9204
[RFC 9218]: https://www.rfc-editor.org/rfc/rfc9218
[RFC 9220]: https://www.rfc-editor.org/rfc/rfc9220
[RFC 9221]: https://www.rfc-editor.org/rfc/rfc9221
[RFC 9287]: https://www.rfc-editor.org/rfc/rfc9287
[RFC 9297]: https://www.rfc-editor.org/rfc/rfc9297
[RFC 9308]: https://www.rfc-editor.org/rfc/rfc9308
[RFC 9312]: https://www.rfc-editor.org/rfc/rfc9312
[RFC 9368]: https://www.rfc-editor.org/rfc/rfc9368
[RFC 9369]: https://www.rfc-editor.org/rfc/rfc9369
[RFC 9412]: https://www.rfc-editor.org/rfc/rfc9412
[RFC 9443]: https://www.rfc-editor.org/rfc/rfc9443
[`PerformanceEntry`]: perf_hooks.md#class-performanceentry
[`PerformanceObserver`]: perf_hooks.md#class-performanceobserver
[`QuicEndpoint`]: #class-quicendpoint
[`QuicError`]: #class-quicerror
[`application.enableConnectProtocol`]: #sessionoptionsapplication
[`application.enableDatagrams`]: #sessionoptionsapplication
[`application.qpackMaxDTableCapacity`]: #sessionoptionsapplication
[`endpoint.maxConnectionsPerHost`]: #endpointmaxconnectionsperhost
[`endpoint.maxConnectionsTotal`]: #endpointmaxconnectionstotal
[`error.errorCode`]: #errorerrorcode
[`fs.promises.open(path, 'r')`]: fs.md#fspromisesopenpath-flags-mode
[`maxDatagramFrameSize`]: #transportparamsmaxdatagramframesize
[`quic.connect()`]: #quicconnectaddress-options
[`quic.listen()`]: #quiclistenonsession-options
[`session.close()`]: #sessioncloseoptions
[`session.createBidirectionalStream()`]: #sessioncreatebidirectionalstreamoptions
[`session.createUnidirectionalStream()`]: #sessioncreateunidirectionalstreamoptions
[`session.destroy()`]: #sessiondestroyerror-options
[`session.maxPendingDatagrams`]: #sessionmaxpendingdatagrams
[`session.ondatagram`]: #sessionondatagram
[`session.ondatagramstatus`]: #sessionondatagramstatus
[`session.onearlyrejected`]: #sessiononearlyrejected
[`session.onerror`]: #sessiononerror
[`session.ongoaway`]: #sessionongoaway
[`session.onkeylog`]: #sessiononkeylog
[`session.onnewtoken`]: #sessiononnewtoken
[`session.onorigin`]: #sessiononorigin
[`session.onqlog`]: #sessiononqlog
[`session.onsessionticket`]: #sessiononsessionticket
[`session.onstream`]: #sessiononstream
[`session.sendDatagram()`]: #sessionsenddatagramdatagram-encoding
[`sessionOptions.cc`]: #sessionoptionscc
[`sessionOptions.ciphers`]: #sessionoptionsciphers
[`sessionOptions.datagramDropPolicy`]: #sessionoptionsdatagramdroppolicy
[`sessionOptions.groups`]: #sessionoptionsgroups
[`sessionOptions.keylog`]: #sessionoptionskeylog
[`sessionOptions.qlog`]: #sessionoptionsqlog
[`sessionOptions.sessionTicket`]: #sessionoptionssessionticket
[`sessionOptions.sni`]: #sessionoptionssni-server-only
[`sessionOptions.token`]: #sessionoptionstoken-client-only
[`stream.destroy()`]: #streamdestroyerror-options
[`stream.headers`]: #streamheaders
[`stream.onerror`]: #streamonerror
[`stream.onwanttrailers`]: #streamonwanttrailers
[`stream.pendingTrailers`]: #streampendingtrailers
[`stream.priority`]: #streampriority
[`stream.sendHeaders()`]: #streamsendheadersheaders-options
[`stream.sendInformationalHeaders()`]: #streamsendinformationalheadersheaders
[`stream.sendTrailers()`]: #streamsendtrailersheaders
[`stream.setBody()`]: #streamsetbodybody
[`stream.setPriority()`]: #streamsetpriorityoptions
[`stream.writer`]: #streamwriter
[`writer.fail()`]: #streamwriter
[`writer.fail(reason)`]: #streamwriter
[qlog]: https://datatracker.ietf.org/doc/draft-ietf-quic-qlog-main-schema/
[qvis]: https://qvis.quictools.info/
