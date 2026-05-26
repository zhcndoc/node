# DTLS

<!-- YAML
added: REPLACEME
-->

<!-- introduced_in=REPLACEME -->

> 稳定性：1 - 实验性

<!-- source_link=lib/dtls.js -->

`node:dtls` 模块提供了在 UDP 之上实现的 Datagram Transport
Layer Security（DTLS）协议。DTLS 为基于数据报的通信提供与 TLS 等价的
安全保障，包括机密性、完整性和身份认证。

要使用此模块，必须在构建时通过 `--experimental-dtls` 配置标志启用，
并在运行时通过 `--experimental-dtls` CLI 标志启用。

```bash
node --experimental-dtls app.mjs
```

```mjs
import { listen, connect } from 'node:dtls';
```

```cjs
const { listen, connect } = require('node:dtls');
```

## 权限模型

使用 [权限模型][] 时，必须传入 `--allow-net` 标志以允许 DTLS 网络操作。
如果没有它，调用 [`dtls.connect()`][] 或 [`dtls.listen()`][] 将抛出
`ERR_ACCESS_DENIED` 错误。

```console
node --permission --allow-fs-read=* --experimental-dtls index.mjs
Error: 对此 API 的访问已受限。请使用 --allow-net 来管理权限。
  code: 'ERR_ACCESS_DENIED',
  permission: 'Net',
}
```

即使没有 `--allow-net`，也允许创建一个 [`DTLSEndpoint`][] 实例而不进行连接或监听，
因为在调用 [`dtls.connect()`][] 或 [`dtls.listen()`][] 之前不会发生网络 I/O。

## DTLS 与 TLS

DTLS 专为 UDP 传输而设计，并在以下几个关键方面与 TLS 不同：

* 不保证流式传输：消息可能乱序到达或丢失。
  DTLS 保留数据报语义。
* 一个套接字，多个对端：单个 UDP 套接字可服务多个 DTLS
  会话。`DTLSEndpoint` 负责管理这种多路复用。
* Cookie 交换：DTLS 服务器使用无状态 cookie 机制
  （HelloVerifyRequest）来防止拒绝服务放大攻击。
* 重传：由于 UDP 不保证送达，DTLS 会在内部处理握手重传。

## `dtls.listen(callback, options)`

<!-- YAML
added: REPLACEME
-->

* `callback` {Function} 服务器接受的每个新的 DTLS 会话都会调用此回调。
  * `session` {DTLSSession} 新会话。
* `options` {Object}
  * `cert` {string|Buffer} PEM 格式的服务器证书。**必需。**
  * `key` {string|Buffer} PEM 格式的服务器私钥。**必需。**
  * `port` {number} 要绑定的端口。**必需。**
  * `host` {string} 要绑定的地址。**默认：** `'0.0.0.0'`。
  * `ca` {string|Buffer|string\[]|Buffer\[]} PEM 格式的 CA 证书。
  * `ciphers` {string} OpenSSL 密码套件列表字符串。
  * `alpn` {string\[]|Buffer} ALPN 协议名称。
  * `srtp` {string} 以冒号分隔的 SRTP 保护配置文件名称
    （例如，`'SRTP_AES128_CM_SHA1_80:SRTP_AEAD_AES_128_GCM'`）。
  * `requestCert` {boolean} 请求客户端证书。**默认：** `false`。
  * `mtu` {number} DTLS 记录的最大传输单元。
    **默认：** `1200`。
* 返回：{DTLSEndpoint}

创建一个绑定到指定地址和端口的 DTLS 服务器。该服务器
使用基于 HMAC 的自动 cookie 交换进行 DoS 防护。

```mjs
import { listen } from 'node:dtls';
import { readFileSync } from 'node:fs';

const endpoint = listen((session) => {
  session.onmessage = (data) => {
    console.log('收到：', data.toString());
    session.send('pong');
  };

  session.onhandshake = (protocol) => {
    console.log('握手完成：', protocol);
  };
}, {
  cert: readFileSync('server-cert.pem'),
  key: readFileSync('server-key.pem'),
  port: 4433,
});

console.log('DTLS server listening on', endpoint.address);
```

## `dtls.connect(host, port[, options])`

<!-- YAML
added: REPLACEME
-->

* `host` {string} 要连接的远程主机。
* `port` {number} 要连接的远程端口。
* `options` {Object}
  * `ca` {string|Buffer|string\[]|Buffer\[]} PEM 格式的 CA 证书。
  * `cert` {string|Buffer} PEM 格式的客户端证书。
  * `key` {string|Buffer} PEM 格式的客户端私钥。
  * `rejectUnauthorized` {boolean} 拒绝无法验证证书的连接。**默认：** `true`。
  * `bindHost` {string} 本地绑定地址。**默认：** `'0.0.0.0'`。
  * `bindPort` {number} 本地绑定端口。**默认：** `0`（临时端口）。
  * `alpn` {string\[]|Buffer} ALPN 协议名称。
  * `srtp` {string} SRTP 保护配置文件名称。
  * `mtu` {number} 最大传输单元。**默认：** `1200`。
* 返回：{DTLSSession}

连接到 DTLS 服务器。返回一个 `DTLSSession`，其 `opened` 属性是一个
`Promise`，在握手完成时解析。

```mjs
import { connect } from 'node:dtls';
import { readFileSync } from 'node:fs';

const session = connect('localhost', 4433, {
  ca: [readFileSync('ca-cert.pem')],
});

await session.opened;
session.send('hello');

session.onmessage = (data) => {
  console.log('收到：', data.toString());
};
```

## 类：`DTLSEndpoint`

<!-- YAML
added: REPLACEME
-->

管理一个 UDP 套接字并对 DTLS 会话进行多路复用。

### `endpoint.address`

* 返回：{Object} `{ address, family, port }`

该端点绑定到的本地地址。

### `endpoint.state`

* 返回：{DTLSEndpointState}

包含以下属性的共享状态对象：

* `bound` {boolean}
* `listening` {boolean}
* `closing` {boolean}
* `destroyed` {boolean}
* `sessionCount` {number}
* `busy` {boolean}

### `endpoint.stats`

<!-- YAML
added: REPLACEME
-->

* 类型：{DTLSEndpoint.Stats}

为此端点收集的统计信息。只读。该统计对象是
实时的，并随着数据流经端点由 C++ 内部更新。

### `endpoint.busy`

* {boolean}

当为 `true` 时，端点会拒绝新的传入连接。可用于实现背压。

### `endpoint.close()`

* 返回：{Promise} 在端点完全关闭时解析。

优雅地关闭端点。在释放 UDP 套接字之前，所有活动会话都会通过
`close_notify` 警报关闭。

### `endpoint.destroy([error])`

立即销毁端点，不发送 `close_notify` 警报。

### `endpoint.closed`

* {Promise} 在端点完全关闭时解析。

### `endpoint[Symbol.asyncDispose]()`

等同于调用 `endpoint.close()`。

## 类：`DTLSEndpoint.Stats`

<!-- YAML
added: REPLACEME
-->

端点收集到的统计信息视图。

### `endpointStats.createdAt`

<!-- YAML
added: REPLACEME
-->

* 类型：{bigint} 指示端点创建时间的时间戳。只读。

### `endpointStats.destroyedAt`

<!-- YAML
added: REPLACEME
-->

* 类型：{bigint} 指示端点销毁时间的时间戳。只读。

### `endpointStats.bytesReceived`

<!-- YAML
added: REPLACEME
-->

* 类型：{bigint} 此端点接收的字节总数。只读。

### `endpointStats.bytesSent`

<!-- YAML
added: REPLACEME
-->

* 类型：{bigint} 此端点发送的字节总数。只读。

### `endpointStats.packetsReceived`

<!-- YAML
added: REPLACEME
-->

* 类型：{bigint} 此端点接收的 UDP 数据包总数。只读。

### `endpointStats.packetsSent`

<!-- YAML
added: REPLACEME
-->

* 类型：{bigint} 此端点发送的 UDP 数据包总数。只读。

### `endpointStats.serverSessions`

<!-- YAML
added: REPLACEME
-->

* 类型：{bigint} 此端点接受的由对端发起的会话总数。只读。

### `endpointStats.clientSessions`

<!-- YAML
added: REPLACEME
-->

* 类型：{bigint} 由此端点发起的会话总数。只读。

### `endpointStats.serverBusyCount`

<!-- YAML
added: REPLACEME
-->

* 类型：{bigint} 因端点被标记为忙碌而被拒绝的传入连接总数。只读。

### `endpointStats.isConnected`

<!-- YAML
added: REPLACEME
-->

* 类型：{boolean}

如果统计对象仍连接到底层端点，则为 `true`。
一旦端点被销毁，统计信息就会变为过时快照。

## 类：`DTLSSession`

<!-- YAML
added: REPLACEME
-->

表示与单个远程对端的 DTLS 关联。

### `session.send(data)`

* `data` {string|Buffer} 要发送的数据。
* 返回：{number} 写入 DTLS 层的字节数。

向对端发送应用数据。数据在通过 UDP 发送之前会由 DTLS 加密。
只能在握手完成后调用（`session.opened` 已解析）。

### `session.close()`

* 返回：{Promise} 在会话关闭时解析。

通过发送 `close_notify` 警报来启动优雅的 DTLS 关闭。

### `session.destroy([error])`

立即销毁会话，不发送 `close_notify`。

### `session.opened`

* {Promise} 在 DTLS 握手完成时解析，并返回 `{ protocol }`。

### `session.closed`

* {Promise} 在会话完全关闭时解析。

### `session.remoteAddress`

* 返回：{Object} `{ address, family, port }`

### `session.protocol`

* 返回：{string} 协商得到的 DTLS 协议版本
  （例如，`'DTLSv1.2'`）。

### `session.cipher`

* 返回：{Object} `{ name, standardName, version }`

### `session.peerCertificate`

* 返回：{string|undefined} 对端的 PEM 格式证书。

### `session.alpnProtocol`

* 返回：{string|undefined} 协商得到的 ALPN 协议。

### `session.srtpProfile`

* 返回：{string|undefined} 协商得到的 SRTP 保护配置文件名称。

### `session.stats`

<!-- YAML
added: REPLACEME
-->

* 类型：{DTLSSession.Stats}

为此会话收集的统计信息。只读。该统计对象是
实时的，并随着数据流经会话而更新。

### `session.exportKeyingMaterial(length, label[, context])`

* `length` {number} 要导出的字节数。
* `label` {string} 导出的密钥材料标签。
* `context` {Buffer} 可选上下文值。
* 返回：{Buffer}

从 DTLS 会话导出密钥材料，如 [RFC 5705][] 所定义。
这通常与 DTLS-SRTP 一起使用，以为媒体流派生加密密钥。

## 类：`DTLSSession.Stats`

<!-- YAML
added: REPLACEME
-->

会话收集到的统计信息视图。

### `sessionStats.createdAt`

<!-- YAML
added: REPLACEME
-->

* 类型：{bigint} 指示会话创建时间的时间戳。只读。

### `sessionStats.destroyedAt`

<!-- YAML
added: REPLACEME
-->

* 类型：{bigint} 指示会话销毁时间的时间戳。只读。

### `sessionStats.closingAt`

<!-- YAML
added: REPLACEME
-->

* 类型：{bigint} 指示调用 `close()` 时间的时间戳。只读。

### `sessionStats.handshakeCompletedAt`

<!-- YAML
added: REPLACEME
-->

* 类型：{bigint} 指示 DTLS 握手完成时间的时间戳。只读。

### `sessionStats.bytesReceived`

<!-- YAML
added: REPLACEME
-->

* 类型：{bigint} 接收到的应用数据字节总数。只读。

### `sessionStats.bytesSent`

<!-- YAML
added: REPLACEME
-->

* 类型：{bigint} 发送的应用数据字节总数。只读。

### `sessionStats.messagesReceived`

<!-- YAML
added: REPLACEME
-->

* 类型：{bigint} 接收到的应用消息总数。只读。

### `sessionStats.messagesSent`

<!-- YAML
added: REPLACEME
-->

* 类型：{bigint} 发送的应用消息总数。只读。

### `sessionStats.retransmitCount`

<!-- YAML
added: REPLACEME
-->

* 类型：{bigint} DTLS 握手重传总次数。只读。

### `sessionStats.isConnected`

<!-- YAML
added: REPLACEME
-->

* 类型：{boolean}

如果统计对象仍连接到底层会话，则为 `true`。
一旦会话被销毁，统计信息就会变为过时快照。

### 回调属性

#### `session.onmessage`

* {Function}
  * `data` {Buffer}

设置后可接收来自对端的应用数据。

#### `session.onerror`

* {Function}
  * `error` {Error}

设置后可接收错误通知。

#### `session.onhandshake`

* {Function}
  * `protocol` {string}

设置后可接收握手完成通知。

#### `session.onkeylog`

* {Function}
  * `line` {string}

设置后可接收 TLS 密钥日志行（用于使用 Wireshark 调试）。

### `session[Symbol.asyncDispose]()`

等同于调用 `session.close()`。

## DTLS-SRTP 示例

DTLS-SRTP 被 WebRTC 用于媒体加密。DTLS 握手会协商 SRTP 保护配置文件并提供密钥材料。

```mjs
import { listen, connect } from 'node:dtls';
import { readFileSync } from 'node:fs';

// 带 SRTP 的服务器
const server = listen((session) => {
  session.onhandshake = () => {
    console.log('SRTP 配置文件:', session.srtpProfile);
    const keys = session.exportKeyingMaterial(
      60,
      'EXTRACTOR-dtls_srtp',
    );
    console.log('SRTP 密钥材料:', keys);
  };
}, {
  cert: readFileSync('server-cert.pem'),
  key: readFileSync('server-key.pem'),
  port: 5004,
  srtp: 'SRTP_AES128_CM_SHA1_80:SRTP_AEAD_AES_128_GCM',
});

// 带 SRTP 的客户端
const session = connect('localhost', 5004, {
  rejectUnauthorized: false,
  srtp: 'SRTP_AEAD_AES_128_GCM:SRTP_AES128_CM_SHA1_80',
});

await session.opened;
console.log('协商的 SRTP:', session.srtpProfile);
const keys = session.exportKeyingMaterial(60, 'EXTRACTOR-dtls_srtp');
```

## MTU 注意事项

由于 libuv 当前不支持路径 MTU 发现，DTLS 模块使用保守的默认 MTU 1200 字节。这个值适用于几乎所有网络路径，但在本地网络中可能并非最优。

可以通过 `mtu` 选项配置 MTU：

```mjs
// 用于你已知路径 MTU 的本地网络
const endpoint = listen(callback, {
  // ...
  mtu: 1400,
});
```

允许的最小 MTU 为 256 字节。最大值为 65535。

[Permission Model]: permissions.md#permission-model
[RFC 5705]: https://www.rfc-editor.org/rfc/rfc5705
[`DTLSEndpoint`]: #class-dtlsendpoint
[`dtls.connect()`]: #dtlsconnecthost-port-options
[`dtls.listen()`]: #dtlslistencallback-options
