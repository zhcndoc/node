# DTLS

<!-- YAML
added: v26.9.0
-->

<!-- introduced_in=v26.9.0 -->

> 稳定性：1.1 - 活跃开发中

<!-- source_link=lib/dtls.js -->

`node:dtls` 模块提供了在 UDP 之上实现的数据报传输层安全（DTLS）协议。DTLS 为基于数据报的通信提供与 TLS 等价的安全保障，包括机密性、完整性和身份认证。

要使用此模块，必须在构建时通过 `--experimental-dtls` 配置标志启用，并在运行时通过 `--experimental-dtls` CLI 标志启用。

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
added: v26.9.0
-->

* `callback` {Function} 对服务器接受的每个新 DTLS 会话都会调用此回调。
  * `session` {DTLSSession} 新会话。
* `options` {Object}
  * `cert` {string|Buffer} PEM 格式的服务器证书。**必需。**
  * `key` {string|Buffer} PEM 格式的服务器私钥。**必需。**
  * `secureContext` {DTLSSecureContext} 来自
    [`dtls.createSecureContext()`][] 的上下文，用于替代根据以下凭证选项创建上下文。
    必须使用 `isServer: true` 创建。
    不能与该上下文已有的任何选项组合使用。
  * `sni` {Object|Function} 服务器名称指示。主机名到对应身份的映射，或返回该身份的函数。不能与
    `secureContext` 组合使用；应改为在上下文上设置。参见
    [服务器名称指示][]。
  * `passphrase` {string} 如果 `key` 已加密，用于解密 `key` 的密码短语。
    如果 `key` 未加密，则忽略。与 `key` 和 `cert` 不同，此项必须是
    字符串，与 [`tls.createSecureContext()`][] 保持一致。
  * `port` {number} 要绑定的端口。**必需。**
  * `host` {string} 要绑定的地址。**默认值：** `'0.0.0.0'`。
  * `ca` {string|Buffer|string\[]|Buffer\[]} PEM 格式的 CA 证书。
  * `ciphers` {string} OpenSSL 密码套件列表字符串。
  * `alpn` {string\[]|Buffer} ALPN 协议名称。每个名称必须介于
    1 到 255 个字节之间。`Buffer` 必须已经是 ALPN 线上格式：一个
    长度字节后跟相应数量的字节，并重复此结构。
  * `srtp` {string} 以冒号分隔的 SRTP 保护配置文件名称
    （例如，`'SRTP_AES128_CM_SHA1_80:SRTP_AEAD_AES_128_GCM'`）。
  * `requestCert` {boolean} 请求客户端提供证书。
    **默认值：** `false`。
  * `rejectUnauthorized` {boolean} 仅在与
    `requestCert` 一起使用时有效。为 `true` 时，未提供证书或证书链未指向受信任 CA 的客户端会在握手期间被拒绝，
    并收到 TLS 警报。为 `false` 时，仍会请求并验证证书，但无论结果如何都会完成握手，由应用通过
    [`session.authorized`][] 作出决定。**默认值：** `true`。
  * `mtu` {number} DTLS 数据报的最大字节数。**默认值：**
    `1200`。
  * `handshakeTimeout` {number} 握手在被放弃前允许持续的毫秒数。`0` 表示禁用。**默认值：** `60000`。参见
    [握手超时][]。
  * `ipv6Only` {boolean} 为 `true` 时，IPv6 端点仅服务 IPv6。为 `false` 时，绑定 `'::'` 也会接受 IPv4 对端，这些对端会以映射地址形式到达，例如 `'::ffff:203.0.113.1'`——任何以对端地址为键的内容，包括 `maxSessionsPerHost`，都会看到这种形式。对 IPv4 端点无效。**默认值：** `false`。
  * `reusePort` {boolean} 为 `true` 时，设置 `SO_REUSEPORT`，因此多个进程可以绑定同一个端口，内核会将到达的数据报分散给它们。所有进程都必须设置此项。**默认值：**
    `false`。
  * `udpReceiveBufferSize` {number} 套接字接收缓冲区（`SO_RCVBUF`）的字节数。增大此值可让端点有能力处理默认设置下会被丢弃的突发流量。内核会将其限制在自身的最大值以内。
    **默认值：** 系统默认值。
  * `udpSendBufferSize` {number} 套接字发送缓冲区（`SO_SNDBUF`）的字节数。限制方式同上。**默认值：** 系统默认值。
  * `udpTTL` {number} 发出数据报的 IP 生存时间，范围为 `1` 到
    `255`。**默认值：** 系统默认值。
  * `maxSessions` {number} 端点可容纳的最大并发会话数。设为 `0` 表示不限制。**默认值：** `10000`。
  * `maxSessionsPerHost` {number} 来自任一单个源 IP 地址（忽略端口）的最大并发会话数。设为 `0` 表示不限制。
    **默认值：** `1000`。
  * `sessionIdContext` {string} 用于将可恢复会话限定到此服务器的不透明标识符，最多 32 个字节。**默认值：** 根据
    `process.argv` 生成的值，与 `tls.createServer()` 中的做法相同。
* 返回：{DTLSEndpoint}

创建一个绑定到指定地址和端口的 DTLS 服务器。服务器会使用基于 HMAC 的自动 cookie 交换来防范 DoS。参见
[拒绝服务][]。

绑定失败时会抛出操作系统提供的错误代码，与 `net` 和 `dgram` 一样：地址已被占用时会抛出错误，其 `code` 为
`'EADDRINUSE'`，并设置 `errno` 和 `syscall`。

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

console.log('DTLS 服务器正在监听', endpoint.address);
```

## `dtls.connect(host, port[, options])`

<!-- YAML
added: v26.9.0
-->

* `host` {string} 要连接的远程主机，以 IPv4 或 IPv6 字面量表示。
  不会解析主机名。
* `port` {number} 远程端口。
* `options` {Object}
  * `ca` {string|Buffer|string\[]|Buffer\[]} PEM 格式的 CA 证书。
  * `cert` {string|Buffer} PEM 格式的客户端证书。
  * `key` {string|Buffer} PEM 格式的客户端私钥。
  * `secureContext` {DTLSSecureContext} 来自
    [`dtls.createSecureContext()`][] 的上下文，用于替代根据以下凭证选项创建上下文。
    创建时**不能**使用 `isServer: true`。
    不能与该上下文已有的任何选项组合使用。
  * `psk` {Object|Function} 预共享密钥，格式为 `{ identity, key }`，或返回该对象的函数。参见[预共享密钥][]。
  * `session` {Buffer} 通过先前连接上的 [`session.session`][] 获取的会话，用于恢复会话而非完整握手。参见
    [会话恢复][]。
  * `passphrase` {string} 如果 `key` 已加密，用于解密 `key` 的密码短语。
    如果 `key` 未加密，则忽略。与 `key` 和 `cert` 不同，此项必须是
    字符串，与 [`tls.createSecureContext()`][] 保持一致。
  * `rejectUnauthorized` {boolean} 为 `true` 时，服务器证书必须同时链接到受信任的 CA，并匹配预期身份（`servername`，如果未设置 `servername`，则使用 `host`）；否则会中止握手，并使 `session.opened` 拒绝。为 `false` 时，仍会验证证书，但无论结果如何都会完成握手，由应用通过 [`session.authorized`][] 和
    [`session.authorizationError`][] 作出决定。**默认值：** `true`。
  * `servername` {string} 用于 SNI（服务器名称指示）扩展以及证书验证时检查身份的服务器名称。**默认值：** `host` 参数。设为 `''` 可禁用 SNI。
    对 IP 地址字面量永远不会发送 SNI。
  * `bindHost` {string} 本地绑定地址。**默认值：** 当 `host` 是
    IPv6 字面量时为 `'::'`，否则为 `'0.0.0.0'`。本地套接字必须与对端属于相同的地址族。
  * `bindPort` {number} 本地绑定端口。**默认值：** `0`（临时端口）。
  * `alpn` {string\[]|Buffer} ALPN 协议名称。每个名称必须介于
    1 到 255 个字节之间。`Buffer` 必须已经是 ALPN 线上格式：一个
    长度字节后跟相应数量的字节，并重复此结构。
  * `srtp` {string} SRTP 保护配置文件名称。
  * `mtu` {number} DTLS 数据报的最大字节数。**默认值：**
    `1200`。
  * `handshakeTimeout` {number} 握手在被放弃并使 `session.opened` 拒绝前允许持续的毫秒数。`0` 表示禁用。**默认值：**
    `60000`。参见[握手超时][]。
* 返回：{DTLSSession}

连接到 DTLS 服务器。返回一个 `DTLSSession`，其 `opened` 属性是一个
`Promise`，在握手完成时解析。

```mjs
import { connect } from 'node:dtls';
import { readFileSync } from 'node:fs';

const session = connect('127.0.0.1', 4433, {
  ca: [readFileSync('ca-cert.pem')],
});

await session.opened;
session.send('hello');

session.onmessage = (data) => {
  console.log('收到：', data.toString());
};
```

## `dtls.createSecureContext([options])`

<!-- YAML
added: v26.10.0
-->

* `options` {Object}
  * `alpn` {string\[]} ALPN 协议。
  * `ca` {string|Buffer|Array} PEM 格式的 CA 证书。省略时，使用捆绑的默认证书颁发机构。
  * `cert` {string|Buffer} PEM 格式的证书。
  * `ciphers` {string} OpenSSL 密码套件列表。
  * `ecdhCurve` {string} ECDH 的命名曲线或曲线列表。
  * `isServer` {boolean} 创建用于服务器的上下文。**默认值：** `false`。
  * `key` {string|Buffer} PEM 格式的私钥。
  * `passphrase` {string} 如果 `key` 已加密，用于解密 `key` 的密码短语。
  * `rejectUnauthorized` {boolean} 验证行为，与
    [`dtls.listen()`][] 和 [`dtls.connect()`][] 相同。
  * `requestCert` {boolean} 请求对端提供证书。仅限服务器。
  * `sessionIdContext` {string} 会话 ID 上下文。仅限服务器。
  * `sni` {Object|Function} 服务器名称指示。仅限服务器。参见
    [服务器名称指示][]。
  * `psk` {Object|Function} 预共享密钥。参见[预共享密钥][]。
  * `pskIdentityHint` {string} 要公布的身份提示，用于指示客户端应选择哪个密钥。需要 `psk`。仅限服务器。
  * `srtp` {string} SRTP 配置文件列表。
  * `ticketKeys` {Buffer} 会话票据密钥，用于跨端点和重启恢复会话。仅限服务器。参见[会话恢复][]。
* 返回：{DTLSSecureContext}

标记为“仅限服务器”的选项要求 `isServer: true`。将此类选项传入客户端上下文会抛出 `ERR_INVALID_ARG_VALUE`，而不会忽略该选项或在其无法生效的情况下应用该选项。

创建可复用的安全上下文。将其作为 `secureContext` 传入
[`dtls.listen()`][] 或 [`dtls.connect()`][]，以替代凭证选项。

上下文会保存已解析的证书和密钥；如果提供了 `ca`，还会保存自己的证书存储；总计约为 28 KiB。因此，每个连接都创建一个上下文，消耗的是内存而非时间——创建两千个上下文会耗费约 54 MiB，而共享单个上下文只需 2 MiB。打开许多连接的客户端应只创建一次上下文。

验证时检查的对端身份**不属于**上下文。它会根据 `servername`（或主机）绑定到每个连接，因此同一个上下文可以用于连接不同对端，同时仍能拒绝错误证书。

创建上下文时会固定 `isServer`，因为它会选择底层的 OpenSSL 方法。将服务器上下文传给 [`dtls.connect()`][]，或将客户端上下文传给 [`dtls.listen()`][]，都会抛出错误。

```mjs
import { connect, createSecureContext, listen } from 'node:dtls';
import { readFileSync } from 'node:fs';

const serverContext = createSecureContext({
  cert: readFileSync('server-cert.pem'),
  key: readFileSync('server-key.pem'),
  isServer: true,
});

// One context, several endpoints.
const a = listen(onsession, { secureContext: serverContext, port: 5684 });
const b = listen(onsession, { secureContext: serverContext, port: 5685 });

const clientContext = createSecureContext({
  ca: readFileSync('ca-cert.pem'),
});

// One context, many connections, each verified against its own name.
const s1 = connect('192.0.2.1', 5684, {
  secureContext: clientContext,
  servername: 'a.example.com',
});
const s2 = connect('192.0.2.2', 5684, {
  secureContext: clientContext,
  servername: 'b.example.com',
});
```

## 服务器名称指示

通过为 `listen()` 提供 `sni` 映射或函数，端点可以服务多个身份。映射的每个键都是主机名，每个值可以是使用 `isServer: true` 创建的
[`DTLSSecureContext`][]，也可以是与 [`dtls.createSecureContext()`][] 接受的选项相同的普通对象：

```mjs
import { createSecureContext, listen } from 'node:dtls';
import { readFileSync } from 'node:fs';

const endpoint = listen(onsession, {
  cert: readFileSync('default-cert.pem'),
  key: readFileSync('default-key.pem'),
  port: 5684,
  sni: {
    'api.example.com': {
      cert: readFileSync('api-cert.pem'),
      key: readFileSync('api-key.pem'),
    },
    'www.example.com': createSecureContext({
      cert: readFileSync('www-cert.pem'),
      key: readFileSync('www-key.pem'),
      isServer: true,
    }),
    '*': {
      cert: readFileSync('default-cert.pem'),
      key: readFileSync('default-key.pem'),
    },
  },
});
```

`'*'` 键是回退项，在客户端名称不匹配任何项或客户端完全未发送名称时使用。**如果没有该项，不匹配的名称会因 `unrecognized_name` 警报而被拒绝**，而不会回退到端点自身的 `cert` 和 `key`；提供 `sni` 映射意味着只服务其中列出的名称。[`tls.createServer()`][] 在此处有所不同：其 `SNICallback` 会静默回退到默认身份。

验证会遵循所选身份，因此带有自身 `ca` 的条目只接受由该 CA 签发的客户端证书。`requestCert` 和 `rejectUnauthorized` 不针对单个身份设置：它们属于端点，并适用于端点服务的每个名称。

对于通过选择而非枚举来确定的身份，可以用函数代替映射：

```mjs
listen(onsession, {
  port: 5684,
  cert,
  key,
  sni: (servername) => contexts.get(servername),
});
```

调用时会传入客户端请求的名称；如果客户端未发送 SNI 扩展，则传入 `undefined`。函数返回的内容与映射条目的内容相同：[`dtls.createSecureContext()`][] 的结果，或用于创建上下文的选项。返回空值表示拒绝该名称，处理方式与没有 `'*'` 条目的映射中不匹配的名称完全相同，而不会回退到端点自身的证书。

该函数会在握手期间运行，且必须同步返回，因此不能查询数据库。返回已准备好的上下文很有价值：根据选项创建上下文会在每次握手时重新解析证书。

函数抛出的异常会导致该次握手失败，并像其他握手失败一样报告给会话的错误处理程序。它不会作为未捕获异常传递到进程。

证书和密码套件列表都会遵循所选上下文。预共享密钥则不会。OpenSSL 会在连接创建时安装 PSK 回调，此时尚不知道名称；选择身份不会替换这些回调，因此服务器接受的密钥始终是端点自身的密钥。SNI 身份上提供的 `psk` 永远不会被查询，并且不能只通过 PSK 来服务某个身份。

`sni` 属于安全上下文而非端点，因此可以传给 [`dtls.createSecureContext()`][]，并且不能与已有的 `secureContext` 组合使用。将其应用于已准备好的上下文会为共享该上下文的每个端点重新配置上下文，而服务器服务的身份也是其上下文的一部分。

因无法识别名称而被拒绝的连接仍会到达 `listen()` 回调：客户端地址通过验证后会话即已存在，而此步骤发生在检查名称之前。随后它会像其他握手失败一样失败。

## 拒绝服务

Cookie 交换可以证明对端能够在其声称的地址接收数据，但不会限制该对端随后可以建立多少个会话；而每个会话都会占用一个 TLS 状态机、两个缓冲区和一个计时器。`maxSessions` 限制总数；`maxSessionsPerHost` 则用于防止单个对端占满全部配额。因任一上限而被拒绝的对端会收到静默响应而非警报，因为向尚未完成 cookie 交换的地址回复会造成放大攻击向量；合法客户端会重传，并在有可用空间时获准接入。拒绝次数会计入
[`endpointStats.serverRefusedCount`][]。

为许多位于同一 NAT 后面的客户端提供服务时，部署可能需要提高
`maxSessionsPerHost`。

## 握手超时

未能完成的握手会在 `handshakeTimeout` 毫秒后被放弃，其会话错误为 `DTLS handshake timeout`。

OpenSSL 本身也会放弃握手，但要经过十二次重传，重传间隔按倍数递增且上限为 60 秒——总计约八分钟。在此期间，会话会占用 `maxSessions` 配额中的位置（参见[拒绝服务][]），因此，启动后又被放弃的握手会以启动它们所需的成本占用端点资源。这不需要伪造数据包：对端完成 cookie 交换后只需停止通信即可。

这两个限制会同时生效，先触发的限制会结束握手。重传计划本身不会改变，这是有意为之——若压缩该计划以强制更早失败，会在 DTLS 专为应对的丢包链路上造成无谓的重传。

此超时也适用于恢复会话和 PSK 握手，并会在握手完成后停止生效；它不是空闲超时。

握手可能会停滞，而双方都没有过错，也没有察觉。DTLS 会丢弃无法验证的记录，而不会回复（RFC 6347 第 4.1.2.1 节），因此，不匹配的预共享密钥或没有共同支持项的密码套件列表会导致静默，而非警报。此超时就是用于终止这类握手的。

## 预共享密钥

DTLS 可以使用双方已持有的密钥进行身份认证，而不使用证书（RFC 4279）。这通常是将 DTLS 部署到资源受限设备上的方式，因为这类设备往往根本没有证书。

服务器给出其接受的身份标识；客户端给出自身的身份标识。双方都不需要证书：

```mjs
import { connect, listen } from 'node:dtls';

const endpoint = listen(onsession, {
  port: 5684,
  psk: { 'device-42': deviceKey },
});

const client = connect('192.0.2.1', 5684, {
  psk: { identity: 'device-42', key: deviceKey },
});
```

任一方都可以传入函数，用于查询或派生密钥，而不是使用预先已知的密钥。服务器端函数会收到客户端提供的身份标识，并返回密钥；如果要拒绝该身份标识，则不返回任何内容。客户端函数会收到服务器提供的身份提示（如果服务器发送了），并返回 `{ identity, key }`：

```mjs
listen(onsession, {
  port: 5684,
  psk: (identity) => deriveKey(masterSecret, identity),
});
```

回调会在握手期间运行，并且必须同步返回，因此无法查询数据库。如果两者都已提供，则会先检查映射；只有映射没有匹配结果时才会调用回调——只使用映射的配置在握手期间不会运行 JavaScript。

回调抛出的异常会导致该握手失败，并报告给会话的错误处理程序。它不会作为未捕获异常传递到进程。

### 密码套件

默认密码列表不包含 PSK，因此不提供 `ciphers` 而提供 `psk` 会启用 PSK 套件。提供 `ciphers` 会禁用该行为，并且只使用指定的密码套件。

服务器也会保留证书套件，因为它可能在一个端口上同时为两类客户端提供服务。客户端则不会：配置了预共享密钥且没有 CA 的客户端需要使用该密钥；如果保留证书套件启用状态，服务器就可能选择其中一个，导致客户端在验证自己本不打算依赖的证书时握手失败。

相同强度下，优先使用具有前向保密性的 PSK 密钥交换，而不是普通 PSK。普通 PSK 仅根据共享密钥派生密钥，因此日后任何获得该密钥的人都能解密其先前录制的流量。`RSA-PSK` 不包含在内：它需要证书，且不提供前向保密性。

CoAP 要求使用 `TLS_PSK_WITH_AES_128_CCM_8`（RFC 7252），其 64 位身份验证标签会被安全级别 1 及以上的 OpenSSL 拒绝。Node.js 的默认级别高于该级别，因此必须显式指定此套件并降低安全级别：

```mjs
listen(onsession, { port: 5684, psk, ciphers: 'PSK-AES128-CCM8@SECLEVEL=0' });
```

### 失败模式

密钥错误不会产生错误。身份标识仅用于指定密钥，因此握手会继续进行，双方会派生出不同的密钥；之后，首个身份验证失败的记录会被丢弃，而不会收到响应，因为 DTLS 会丢弃无效记录，而不是回复它们（RFC 6347 第 4.1.2.1 节）。双方都不会收到通知，并会继续重传。

没有共同密码套件的密码列表也会产生相同的行为，这就是上面的 `CCM8` 情况会表现为卡住而不是被拒绝的原因。两种情况都会在 [`handshakeTimeout`][] 后结束，默认超时时间为 60 秒。

服务器不识别的身份标识会被直接拒绝，客户端会看到握手失败。

## 会话恢复

恢复握手会跳过服务器证书，这一点在这里比在 TCP 上更重要：`Certificate` 消息序列会拆分到多个数据报中，丢失其中任何一个都会导致重传超时。在回环接口上测得，完整握手中服务器发送 1850 字节，分为 4 个数据包；恢复握手则发送 280 字节，分为 3 个数据包。

客户端会在会话打开后读取 [`session.session`][]，并将其传递给之后的 [`dtls.connect()`][]：

```mjs
import { connect } from 'node:dtls';

const first = connect('192.0.2.1', 5684, { ca, servername: 'device.example' });
await first.opened;
const ticket = first.session;        // Buffer.
await first.close();

const second = connect('192.0.2.1', 5684, {
  ca,
  servername: 'device.example',
  session: ticket,
});
await second.opened;
console.log(second.reused);          // True.
```

服务器不接受的会话——例如已过期或由其他端点签发的会话——不会导致错误。握手只会完整进行，而 [`session.reused`][] 为 `false`。

恢复握手仍会进行 Cookie 交换，因此会话恢复不能绕过[拒绝服务][]中所述的地址验证。

### 绑定到经过身份验证的主机

会话只能针对其经过身份验证的身份恢复——即 `servername`，如果没有该值，则为主机。将其用于其他任何对象都会抛出异常。

这不是一项便利性检查。恢复握手不会重新发送或重新验证对端证书，而是继承原始会话经过身份验证的身份。因此，将会话重放到其他主机上会跳过验证，却看起来像是成功了。出于同样的原因，未通过 [`session.session`][] 获得的 `session` 会被直接拒绝：没有任何信息记录它属于哪个身份，因此无法进行检查。

### 在 `rejectUnauthorized` 下恢复会话

会话会携带建立会话时的验证结果，因此，使用 `rejectUnauthorized: false` 建立的会话，无法由要求验证对端的连接恢复。握手会失败：

```mjs
import { connect } from 'node:dtls';

// Connected without verifying anything.
const first = connect('192.0.2.1', 5684, { rejectUnauthorized: false });
await first.opened;
console.log(first.authorized);         // False.
const ticket = first.session;
await first.close();

const second = connect('192.0.2.1', 5684, {
  rejectUnauthorized: true,
  session: ticket,
});
await second.opened;                   // Rejects: verification failed.
```

两者使用的是同一主机，因此仅将会话绑定到经过身份验证的身份并不能涵盖这种情况；不同之处在于调用方是否要求验证对端。由于恢复握手本身不会执行验证，因此握手完成后会重新检查记录的结果；如果需要验证，则会拒绝对端从未通过验证的会话。无论哪种情况，[`session.authorized`][] 和 [`session.authorizationError`][] 都会报告恢复会话上记录的结果。

### 票据密钥

用于加密会话票据的密钥会为每个上下文随机生成，因此默认情况下，票据只能用于签发它的端点，并且只在进程重启前有效。为每个端点提供相同的 `ticketKeys`，即可让票据在进程重启或集群中恢复：

```mjs
import { listen } from 'node:dtls';
import { randomBytes } from 'node:crypto';

const ticketKeys = randomBytes(80);    // Share this between processes.
const endpoint = listen(onsession, { cert, key, port: 5684, ticketKeys });
```

长度遵循 OpenSSL 的要求：由密钥名称、HMAC 密钥和 AES 密钥组成。它不同于 [`tls.createServer()`][] 使用的 48 字节格式；`node:tls` 为自身定义了该格式。提供错误的长度会抛出异常并报告预期长度。

票据密钥是长期有效的机密。持有这些密钥的任何人都可以解密票据并恢复其保护的会话，因此应将它们视为密钥材料并定期轮换。

## 类：`DTLSSecureContext`

<!-- YAML
added: v26.10.0
-->

由 [`dtls.createSecureContext`][] 创建的不透明、可重复使用的凭据和 TLS 设置集合。不能直接构造。

### `secureContext.isServer`

* 返回值：{boolean} 如果上下文是为服务器创建的，则为 `true`。

## 类：`DTLSEndpoint`

<!-- YAML
added: v26.9.0
-->

管理一个 UDP 套接字并对 DTLS 会话进行多路复用。

### `endpoint.address`

* 返回：{Object} `{ address, family, port }`

该端点绑定到的本地地址。

### `endpoint.stats`

<!-- YAML
added: v26.9.0
-->

* 类型：{DTLSEndpoint.Stats}

为此端点收集的统计信息。只读。该统计对象是实时的，并随着数据流经端点而更新。

### `endpoint.busy`

* {boolean}

当为 `true` 时，端点会拒绝新的传入连接。可用于实现背压。

### `endpoint.close()`

* 返回：{Promise} 在端点完全关闭时解析。

优雅地关闭端点。在释放 UDP 套接字之前，所有活动会话都会通过 `close_notify` 警报关闭。

### `endpoint.destroy([error])`

立即销毁端点，不发送 `close_notify` 警报。

### `endpoint.destroyed`

* {boolean} 端点销毁后为 True。

### `endpoint.closed`

* {Promise} 在端点完全关闭时解析。

### `endpoint[Symbol.asyncDispose]()`

等同于调用 `endpoint.close()`。

## 类：`DTLSEndpoint.Stats`

<!-- YAML
added: v26.9.0
-->

端点收集到的统计信息视图。

### `endpointStats.createdAt`

<!-- YAML
added: v26.9.0
-->

* 类型：{bigint} 指示端点创建时间的时间戳。只读。

### `endpointStats.destroyedAt`

<!-- YAML
added: v26.9.0
-->

* 类型：{bigint} 指示端点销毁时间的时间戳。只读。

### `endpointStats.bytesReceived`

<!-- YAML
added: v26.9.0
-->

* 类型：{bigint} 此端点接收的字节总数。只读。

### `endpointStats.bytesSent`

<!-- YAML
added: v26.9.0
-->

* 类型：{bigint} 此端点发送的字节总数。只读。

### `endpointStats.packetsReceived`

<!-- YAML
added: v26.9.0
-->

* 类型：{bigint} 此端点接收的 UDP 数据包总数。只读。

### `endpointStats.packetsSent`

<!-- YAML
added: v26.9.0
-->

* 类型：{bigint} 此端点发送的 UDP 数据包总数。只读。

### `endpointStats.serverSessions`

<!-- YAML
added: v26.9.0
-->

* 类型：{bigint} 此端点接受的由对端发起的会话总数。只读。

### `endpointStats.clientSessions`

<!-- YAML
added: v26.9.0
-->

* 类型：{bigint} 由此端点发起的会话总数。只读。

### `endpointStats.serverBusyCount`

<!-- YAML
added: v26.9.0
-->

* 类型：{bigint} 因端点被标记为忙碌而被拒绝的传入连接总数。只读。

### `endpointStats.serverRejectedCount`

<!-- YAML
added: v26.10.0
-->

* 类型：{bigint} 因数据报不可能是 ClientHello 而在尝试握手前被丢弃的数量。只读。

到达监听端点、且不匹配现有会话的数据报，会先按 DTLS ClientHello 记录的格式进行筛查，然后才会为其分配任何状态。该值持续上升表明存在垃圾流量或扫描流量，而不是握手失败的客户端；后者会计入未能完成的会话。

### `endpointStats.serverRefusedCount`

<!-- YAML
added: v26.10.0
-->

* 类型：{bigint} 因端点达到 `maxSessions` 或对端达到 `maxSessionsPerHost`，而被拒绝的其他有效握手尝试数量。只读。

### `endpointStats.isConnected`

<!-- YAML
added: v26.9.0
-->

* 类型：{boolean}

如果统计对象仍连接到底层端点，则为 `true`。
一旦端点被销毁，统计信息就会变为过时快照。

## 类：`DTLSSession`

<!-- YAML
added: v26.9.0
-->

表示与单个远程对端的 DTLS 关联。

### `session.send(data)`

* `data` {string|Buffer|TypedArray|DataView} 要发送的数据。最多 16384 字节。视图只会发送其覆盖的字节，因此会按原样发送偏移视图或子数组，而不是其后方的整个缓冲区。
* 返回值：{number} 写入 DTLS 层的字节数。

向对端发送应用数据。数据在通过 UDP 发送之前会由 DTLS 加密。
只能在握手完成后调用（`session.opened` 已解析）。

DTLS 在每个数据报中通过一条记录承载应用数据，且不会对其进行分片，因此 `data` 必须能放入一条记录中。发送超出限制的数据会抛出 `ERR_OUT_OF_RANGE`。此限制独立于 `mtu` 选项：大于路径 MTU 的记录仍会发送，并由 IP 进行分片。

如果握手尚未完成，或者会话已关闭或销毁，则会抛出 `ERR_INVALID_STATE`。

成功返回表示数据已交给 DTLS 层并写入套接字，而不是表示对端已收到数据。DTLS 运行于 UDP 之上，因此应用数据仍可能在传输途中丢失。

### `session.close()`

* 返回：{Promise} 在会话关闭时解析。

通过发送 `close_notify` 警报来启动优雅的 DTLS 关闭。

### `session.destroy([error])`

立即销毁会话，不发送 `close_notify`。

### `session.destroyed`

* {boolean} 会话销毁后为 True，无论是通过 [`session.destroy()`][]、关闭操作，还是端点关闭导致的销毁。

### `session.endpoint`

* {DTLSEndpoint} 承载此会话的端点。对于来自 [`dtls.listen()`][] 的会话，这是监听端点，与该端点上的其他会话共享；对于来自 [`dtls.connect()`][] 的会话，这是专门用于承载该会话而创建的端点。

### `session.servername`

* {string|undefined} 此会话的服务器名称：客户端在 SNI 扩展中发送的名称，可在连接的任一侧读取。如果未发送名称，则为 `undefined`。参见[服务器名称指示][]。

### `session.opened`

* {Promise} DTLS 握手完成时解析，并返回 `{ protocol }`。

如果握手失败，或者会话在握手完成前关闭或销毁，则会拒绝——在后一种情况下，错误为 `ERR_INVALID_STATE`；如果向 [`session.destroy()`][] 传入了错误，则为该错误。该 Promise 一定会完成，因此等待它不会一直挂起。

### `session.closed`

* {Promise} 在会话完全关闭时完成。如果会话是正常关闭的，则解析；如果会话销毁时带有错误，或其端点被销毁，则以该错误拒绝。该 Promise 一定会完成，因此等待它不会一直挂起。

### `session.remoteAddress`

* 返回：{Object} `{ address, family, port }`

### `session.protocol`

* 返回：{string} 协商得到的 DTLS 协议版本
  （例如，`'DTLSv1.2'`）。

### `session.cipher`

* 返回：{Object} `{ name, standardName, version }`

### `session.peerCertificate`

* 返回值：{string|undefined} 对端的 PEM 格式证书；如果对端未发送证书，则为 `undefined`。

这仅包含叶证书的 PEM 文本，不包含其他内容。要获取颁发者证书链和已解析的字段，请使用 [`session.peerX509Certificate`][]；其 `toString()` 返回相同的 PEM。请使用 [`session.authorized`][] 和 [`session.authorizationError`][] 获取验证结果，而不是自行解析证书。

### `session.peerX509Certificate`

<!-- YAML
added: v26.10.0
-->

* 返回值：{X509Certificate|undefined} 对端的证书；如果对端未发送证书，则为 `undefined`。

对端叶证书对应的 [`X509Certificate`][]。可以通过其 `issuerCertificate` 属性访问颁发者证书链；已解析的字段——`subject`、`issuer`、`validFrom`、`validTo`、`fingerprint256`、`serialNumber` 等——都是该对象的属性。

[`tls.TLSSocket.getPeerCertificate()`][] 返回一个普通字典，其中包含 `valid_from`、`valid_to` 以及通过 `issuerCertificate` 遍历的证书链；而此处返回的是与 [`tls.TLSSocket.getPeerX509Certificate()`][] 相同的 `X509Certificate` 类。调用其 `toLegacyObject()` 可获取字典形式。

对端证书可用后，每次访问都会返回同一个对象。

### `session.session`

<!-- YAML
added: v26.10.0
-->

* 返回值：{Buffer|undefined} 用于之后恢复此连接的不透明会话；对于服务器会话，或握手完成之前，为 `undefined`。

将其作为 `session` 选项传递给之后的 [`dtls.connect()`][]。它绑定到此连接进行身份验证时所针对的主机，在其他位置使用时会被拒绝；参见[会话恢复][]。

服务器会话返回 `undefined`：服务器没有可用于绑定该值的身份，而在多个连接之间携带会话的是客户端。

### `session.reused`

<!-- YAML
added: v26.10.0
-->

* 返回值：{boolean} 如果此连接恢复了之前的会话，而不是执行完整握手，则为 `true`。

与 [`session.authorized`][] 一样，会话关闭后此属性会返回 `false`。

### `session.authorized`

<!-- YAML
added: v26.10.0
-->

* 返回值：{boolean} 如果对端提供的证书链通过了针对已配置证书颁发机构的验证，并且对于客户端而言与请求的身份匹配，则为 `true`。握手完成前为 `false`。

### `session.authorizationError`

<!-- YAML
added: v26.10.0
-->

* 返回值：{string|undefined} 简短的 X509 验证错误代码，例如 `'CERT_HAS_EXPIRED'` 或 `'HOSTNAME_MISMATCH'`；如果对端的证书链通过验证，则为 `undefined`。

完全未提供证书的对端会报告 `'UNABLE_TO_GET_ISSUER_CERT'`，因此可利用此属性区分“没有证书”和“证书验证失败”。

即使 `rejectUnauthorized` 为 `false`，证书链仍会经过验证；只是不会强制执行验证结果。因此，可以通过这两个属性实现自定义授权策略：

```mjs
import { connect } from 'node:dtls';

const session = connect('192.0.2.1', 4433, {
  ca: [caCert],
  servername: 'example.com',
  rejectUnauthorized: false,
});

await session.opened;

if (!session.authorized && session.authorizationError !== 'CERT_HAS_EXPIRED') {
  await session.close();
}
```

### `session.alpnProtocol`

* 返回值：{string|undefined} 协商得到的 ALPN 协议；如果未使用 ALPN，则为 `undefined`。

如果服务器配置了 `alpn`，而客户端仅提供服务器不支持的协议，服务器会发送致命的 `no_application_protocol` 警报，并导致握手失败，符合 [RFC 7301][] 第 3.2 节的要求。如果服务器未配置 `alpn`，则会拒绝该扩展，握手会在没有协商出协议的情况下完成。

### `session.srtpProfile`

* 返回：{string|undefined} 协商得到的 SRTP 保护配置文件名称。

### `session.stats`

<!-- YAML
added: v26.9.0
-->

* 类型：{DTLSSession.Stats}

为此会话收集的统计信息。只读。该统计对象是实时的，并随着数据流经会话而更新。

### `session.exportKeyingMaterial(length, label[, context])`

* `length` {number} 要导出的字节数。必须是介于 `1` 和 `65536` 之间的整数。
* `label` {string} 导出的密钥材料所用的标签。
* `context` {Buffer} 可选的上下文值。
* 返回值：{Buffer}

按照 [RFC 5705][] 的定义，从 DTLS 会话导出密钥材料。
通常与 DTLS-SRTP 一起使用，为媒体流派生加密密钥。

如果 `length` 超出可接受范围，则会抛出 `ERR_OUT_OF_RANGE`。此上限并非 [RFC 5705][] 所规定；设置该上限是为了防止调用方请求任意大的内存分配，而且其值远高于任何已定义的导出器所需长度（DTLS-SRTP 使用 60 字节）。

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

## 类：`DTLSSession.Stats`

<!-- YAML
added: v26.9.0
-->

会话收集到的统计信息视图。

### `sessionStats.createdAt`

<!-- YAML
added: v26.9.0
-->

* 类型：{bigint} 指示会话创建时间的时间戳。只读。

### `sessionStats.destroyedAt`

<!-- YAML
added: v26.9.0
-->

* 类型：{bigint} 指示会话销毁时间的时间戳。只读。

### `sessionStats.closingAt`

<!-- YAML
added: v26.9.0
-->

* 类型：{bigint} 指示调用 `close()` 时间的时间戳。只读。

### `sessionStats.handshakeCompletedAt`

<!-- YAML
added: v26.9.0
-->

* 类型：{bigint} 指示 DTLS 握手完成时间的时间戳。只读。

### `sessionStats.bytesReceived`

<!-- YAML
added: v26.9.0
-->

* Type: {bigint} 已接收的应用程序数据字节总数。只读。

### `sessionStats.bytesSent`

<!-- YAML
added: v26.9.0
-->

* Type: {bigint} 已发送的应用程序数据字节总数。只读。

### `sessionStats.messagesReceived`

<!-- YAML
added: v26.9.0
-->

* Type: {bigint} 已接收的应用程序消息总数。只读。

### `sessionStats.messagesSent`

<!-- YAML
added: v26.9.0
-->

* Type: {bigint} 已发送的应用程序消息总数。只读。

### `sessionStats.retransmitCount`

<!-- YAML
added: v26.9.0
-->

* Type: {bigint} DTLS 握手重传总数。只读。

### `sessionStats.isConnected`

<!-- YAML
added: v26.9.0
-->

* Type: {boolean}

如果 stats 对象仍连接到底层会话，则为 `true`。
会话销毁后，stats 将成为过时的快照。

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

// Client with SRTP
const session = connect('127.0.0.1', 5004, {
  rejectUnauthorized: false,
  srtp: 'SRTP_AEAD_AES_128_GCM:SRTP_AES128_CM_SHA1_80',
});

await session.opened;
console.log('协商的 SRTP:', session.srtpProfile);
const keys = session.exportKeyingMaterial(60, 'EXTRACTOR-dtls_srtp');
```

## MTU 注意事项

由于 libuv 当前不支持路径 MTU 发现，DTLS 模块使用保守的默认 MTU 1200 字节。这个值适用于几乎所有网络路径，但在本地网络中可能并非最优。

这限制的是 UDP 负载，而不是应用程序负载：计入标头和 MAC 后，记录可承载的内容会略少。该值在创建端点时固定，之后无法更改。它不限制 [`session.send()`][]，后者受 DTLS 记录大小限制。

可通过 `mtu` 选项配置 MTU：

```mjs
// 用于你已知路径 MTU 的本地网络
const endpoint = listen(callback, {
  // ...
  mtu: 1400,
});
```

允许的最小 MTU 为 256 字节。最大值为 65535。

[Denial of service]: #denial-of-service
[Handshake timeout]: #handshake-timeout
[Permission Model]: permissions.md#permission-model
[Pre-shared keys]: #pre-shared-keys
[RFC 5705]: https://www.rfc-editor.org/rfc/rfc5705
[RFC 7301]: https://www.rfc-editor.org/rfc/rfc7301
[Server Name Indication]: #server-name-indication
[Session resumption]: #session-resumption
[`DTLSEndpoint`]: #class-dtlsendpoint
[`DTLSSecureContext`]: #class-dtlssecurecontext
[`X509Certificate`]: crypto.md#class-x509certificate
[`dtls.connect()`]: #dtlsconnecthost-port-options
[`dtls.createSecureContext()`]: #dtlscreatesecurecontextoptions
[`dtls.listen()`]: #dtlslistencallback-options
[`endpointStats.serverRefusedCount`]: #endpointstatsserverrefusedcount
[`handshakeTimeout`]: #handshake-timeout
[`session.authorizationError`]: #sessionauthorizationerror
[`session.authorized`]: #sessionauthorized
[`session.destroy()`]: #sessiondestroyerror
[`session.peerX509Certificate`]: #sessionpeerx509certificate
[`session.reused`]: #sessionreused
[`session.send()`]: #sessionsenddata
[`session.session`]: #sessionsession
[`tls.TLSSocket.getPeerCertificate()`]: tls.md#tlssocketgetpeercertificatedetailed
[`tls.TLSSocket.getPeerX509Certificate()`]: tls.md#tlssocketgetpeerx509certificate
[`tls.createSecureContext()`]: tls.md#tlscreatesecurecontextoptions
[`tls.createServer()`]: tls.md#tlscreateserveroptions-secureconnectionlistener
