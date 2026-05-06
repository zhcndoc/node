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

## `quic.listen(onsession,[options])`

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

* 类型：{boolean}

如果端点正在主动监听传入连接，则为 true。只读。

### `endpoint.setSNIContexts(entries[, options])`

<!-- YAML
added: REPLACEME
-->

* `entries` {object} 一个将主机名映射到 TLS 身份选项的对象。
  每个条目必须包含 `keys` 和 `certs`。
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

为活动会话收集的统计信息。只读。

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

### `session.close()`

<!-- YAML
added: v23.8.0
-->

* 返回：{Promise}

发起会话的优雅关闭。现有流将被允许完成，但不会打开新流。一旦所有流关闭，会话将被销毁。返回的 promise 将在会话销毁后履行。

### `session.closed`

<!-- YAML
added: v23.8.0
-->

* 类型：{Promise}

会话销毁后履行的 promise。

### `session.destroy([error])`

<!-- YAML
added: v23.8.0
-->

* `error` {any}

立即销毁会话。所有流将被销毁，会话将关闭。

### `session.destroyed`

<!-- YAML
added: v23.8.0
-->

* 类型：{boolean}

如果已调用 `session.destroy()`，则为 true。只读。

### `session.endpoint`

<!-- YAML
added: v23.8.0
-->

* 类型：{quic.QuicEndpoint}

创建此会话的端点。只读。

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

### `session.createBidirectionalStream([options])`

<!-- YAML
added: v23.8.0
-->

* `options` {Object}
  * `body` {ArrayBuffer | ArrayBufferView | Blob}
  * `sendOrder` {number}
* 返回：{Promise} 关于 {quic.QuicStream} 的 promise

打开一个新的双向流。如果未指定 `body` 选项，出站流将半关闭。

### `session.createUnidirectionalStream([options])`

<!-- YAML
added: v23.8.0
-->

* `options` {Object}
  * `body` {ArrayBuffer | ArrayBufferView | Blob}
  * `sendOrder` {number}
* 返回：{Promise} 关于 {quic.QuicStream} 的 promise

打开一个新的单向流。如果未指定 `body` 选项，出站流将关闭。

### `session.path`

<!-- YAML
added: v23.8.0
-->

* 类型：{Object|undefined}
  * `local` {net.SocketAddress}
  * `remote` {net.SocketAddress}

与会话关联的本地和远程套接字地址。只读。

### `session.sendDatagram(datagram)`

<!-- YAML
added: v23.8.0
-->

* `datagram` {string|ArrayBufferView}
* 返回：{bigint}

向远程对等方发送不可靠的数据报，返回数据报 ID。
如果数据报负载指定为 `ArrayBufferView`，则该视图的所有权将转移到底层流。

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

### `sessionStats.maxBytesInFlights`

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

## 类：`QuicStream`

<!-- YAML
added: v23.8.0
-->

### `stream.closed`

<!-- YAML
added: v23.8.0
-->

* 类型：{Promise}

当流完全关闭时兑现的 Promise。

### `stream.destroy([error])`

<!-- YAML
added: v23.8.0
-->

* `error` {any}

立即且突然地销毁流。

### `stream.destroyed`

<!-- YAML
added: v23.8.0
-->

* 类型：{boolean}

如果已调用 `stream.destroy()` 则为 true。

### `stream.direction`

<!-- YAML
added: v23.8.0
-->

* 类型：{string} `'bidi'` 或 `'uni'` 其中之一。

流的方向性。只读。

### `stream.id`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint}

流 ID。只读。

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

当流被重置时调用的回调。可读/可写。

### `stream.readable`

<!-- YAML
added: v23.8.0
-->

* 类型：{ReadableStream}

### `stream.session`

<!-- YAML
added: v23.8.0
-->

* 类型：{quic.QuicSession}

创建此流的会话。只读。

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

端点维护一个已验证 socket 地址的内部缓存作为性能优化。此选项设置缓存地址的最大数量。这是一个高级选项，用户通常无需指定。

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

* 类型：{bigint|number}

指定每个远程对等点地址允许的最大并发会话数。

#### `endpointOptions.maxConnectionsTotal`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint|number}

指定并发会话的最大总数。

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
added: REPLACEME
-->

* 类型：{string} (客户端) | {string\[]} (服务器)

ALPN（应用层协议协商）标识符。

对于 **客户端** 会话，这是指定客户端想要使用的协议的单个字符串（例如 `'h3'`）。

对于 **服务器** 会话，这是服务器支持的协议名称列表，按首选项排序（例如 `['h3', 'h3-29']`）。在 TLS 握手期间，服务器会从其列表中选择客户端也支持的第一个协议。

协商的 ALPN 决定了用于会话的应用实现。`'h3'` 和 `'h3-*'` 变体选择 HTTP/3 应用；所有其他值选择默认应用。

默认值：`'h3'`

#### `sessionOptions.ca` (仅限客户端)

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

指定将使用的拥塞控制算法。必须设置为 `'reno'`、`'cubic'` 或 `'bbr'` 其中之一。

这是一个高级选项，用户通常无需指定。

#### `sessionOptions.certs` (仅限客户端)

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

#### `sessionOptions.crl` (仅限客户端)

<!-- YAML
added: v23.8.0
-->

* 类型：{ArrayBuffer|ArrayBufferView|ArrayBuffer\[]|ArrayBufferView\[]}

客户端会话使用的 CRL。对于服务器会话，CRL 在 [`sessionOptions.sni`][] 地图中按身份指定。

#### `sessionOptions.groups`

<!-- YAML
added: v23.8.0
-->

* 类型：{string}

支持的 TLS 1.3 加密组列表。

#### `sessionOptions.keylog`

<!-- YAML
added: v23.8.0
-->

* 类型：{boolean}

为 true 以启用 TLS 密钥日志输出。

#### `sessionOptions.keys` (仅限客户端)

<!-- YAML
added: v23.8.0
changes:
  - version:
     - v26.0.0
     - v25.9.0
     - v24.15.0
    pr-url: https://github.com/nodejs/node/pull/62335
    description: CryptoKey 不再被接受。
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

如果应启用 qlog 输出则为 true。

#### `sessionOptions.sessionTicket`

<!-- YAML
added: v23.8.0
-->

* 类型：{ArrayBufferView} 用于 0RTT 会话恢复的会话令牌。

#### `sessionOptions.handshakeTimeout`

<!-- YAML
added: v23.8.0
-->

* 类型：{bigint|number}

指定 TLS 握手在完成前允许花费的最大毫秒数，超过该时间将超时。

#### `sessionOptions.servername` (仅限客户端)

<!-- YAML
added: v23.8.0
-->

* 类型：{string}

目标对等服务器名称 (SNI)。默认为 `'localhost'`。

#### `sessionOptions.sni` (仅限服务器)

<!-- YAML
added: REPLACEME
-->

* 类型：{Object}

一个将主机名映射到 TLS 身份选项的对象，用于服务器名称指示 (SNI) 支持。服务器会话需要此选项。特殊键 `'*'` 指定在没有其他主机名匹配时使用的默认/回退身份。每个条目可以包含：

* `keys` {KeyObject|KeyObject\[]} TLS 私钥。**必需。**
* `certs` {ArrayBuffer|ArrayBufferView|ArrayBuffer\[]|ArrayBufferView\[]}
  TLS 证书。**必需。**
* `ca` {ArrayBuffer|ArrayBufferView|ArrayBuffer\[]|ArrayBufferView\[]}
  可选的 CA 证书覆盖。
* `crl` {ArrayBuffer|ArrayBufferView|ArrayBuffer\[]|ArrayBufferView\[]}
  可选的证书吊销列表。
* `verifyPrivateKey` {boolean} 验证私钥。默认值：`false`。

```mjs
const endpoint = await listen(callback, {
  sni: {
    '*': { keys: [defaultKey], certs: [defaultCert] },
    'api.example.com': { keys: [apiKey], certs: [apiCert] },
    'www.example.com': { keys: [wwwKey], certs: [wwwCert], ca: [customCA] },
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

#### `sessionOptions.verifyClient`

<!-- YAML
added: v23.8.0
-->

* 类型：{boolean}

为 true 以要求验证 TLS 客户端证书。

#### `sessionOptions.verifyPrivateKey` (仅限客户端)

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

* 类型：{net.SocketAddress} 要通告的首选 IPv4 地址。

#### `transportParams.preferredAddressIpv6`

<!-- YAML
added: v23.8.0
-->

* 类型：{net.SocketAddress} 要通告的首选 IPv6 地址。

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

## 回调

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
* `status` {string} 为 `'lost'` 或 `'acknowledged'` 其中之一。

### 回调：`OnPathValidationCallback`

<!-- YAML
added: v23.8.0
-->

* `this` {quic.QuicSession}
* `result` {string} 为 `'success'`、`'failure'` 或 `'aborted'` 其中之一。
* `newLocalAddress` {net.SocketAddress}
* `newRemoteAddress` {net.SocketAddress}
* `oldLocalAddress` {net.SocketAddress}
* `oldRemoteAddress` {net.SocketAddress}
* `preferredAddress` {boolean}

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
* `version` {number}
* `requestedVersions` {number\[]}
* `supportedVersions` {number\[]}

### 回调：`OnHandshakeCallback`

<!-- YAML
added: v23.8.0
-->

* `this` {quic.QuicSession}
* `sni` {string}
* `alpn` {string}
* `cipher` {string}
* `cipherVersion` {string}
* `validationErrorReason` {string}
* `validationErrorCode` {number}
* `earlyDataAccepted` {boolean}

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

## 诊断通道

### 通道：`quic.endpoint.created`

<!-- YAML
added: v23.8.0
-->

* `endpoint` {quic.QuicEndpoint}
* `config` {quic.EndpointOptions}

### 通道：`quic.endpoint.listen`

<!-- YAML
added: v23.8.0
-->

* `endpoint` {quic.QuicEndpoint}
* `optoins` {quic.SessionOptions}

### 通道：`quic.endpoint.closing`

<!-- YAML
added: v23.8.0
-->

* `endpoint` {quic.QuicEndpoint}
* `hasPendingError` {boolean}

### 通道：`quic.endpoint.closed`

<!-- YAML
added: v23.8.0
-->

* `endpoint` {quic.QuicEndpoint}

### 通道：`quic.endpoint.error`

<!-- YAML
added: v23.8.0
-->

* `endpoint` {quic.QuicEndpoint}
* `error` {any}

### 通道：`quic.endpoint.busy.change`

<!-- YAML
added: v23.8.0
-->

* `endpoint` {quic.QuicEndpoint}
* `busy` {boolean}

### 通道：`quic.session.created.client`

<!-- YAML
added: v23.8.0
-->

### 通道：`quic.session.created.server`

<!-- YAML
added: v23.8.0
-->

### 通道：`quic.session.open.stream`

<!-- YAML
added: v23.8.0
-->

### 通道：`quic.session.received.stream`

<!-- YAML
added: v23.8.0
-->

### 通道：`quic.session.send.datagram`

<!-- YAML
added: v23.8.0
-->

### 通道：`quic.session.update.key`

<!-- YAML
added: v23.8.0
-->

### 通道：`quic.session.closing`

<!-- YAML
added: v23.8.0
-->

### 通道：`quic.session.closed`

<!-- YAML
added: v23.8.0
-->

### 通道：`quic.session.receive.datagram`

<!-- YAML
added: v23.8.0
-->

### 通道：`quic.session.receive.datagram.status`

<!-- YAML
added: v23.8.0
-->

### 通道：`quic.session.path.validation`

<!-- YAML
added: v23.8.0
-->

### 通道：`quic.session.ticket`

<!-- YAML
added: v23.8.0
-->

### 通道：`quic.session.version.negotiation`

<!-- YAML
added: v23.8.0
-->

### 通道：`quic.session.handshake`

<!-- YAML
added: v23.8.0
-->

[`sessionOptions.sni`]: #sessionoptionssni-仅服务器
