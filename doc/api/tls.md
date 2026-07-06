# TLS (SSL)

<!--introduced_in=v0.10.0-->

> 稳定性：2 - 稳定

<!-- source_link=lib/tls.js -->

`node:tls` 模块提供了基于 OpenSSL 构建的传输层安全 (TLS) 和安全套接字层 (SSL) 协议的实现。可以使用以下方式访问该模块：

```mjs
import tls from 'node:tls';
```

```cjs
const tls = require('node:tls');
```

## 确定是否无法使用 crypto 支持

Node.js 有可能在不包含 `node:crypto` 模块支持的情况下构建。在这种情况下，尝试从 `tls` `import` 或调用 `require('node:tls')` 将导致抛出错误。

使用 CommonJS 时，可以使用 try/catch 捕获抛出的错误：

```cjs
let tls;
try {
  tls = require('node:tls');
} catch (err) {
  console.error('tls support is disabled!');
}
```

使用词法 ESM `import` 关键字时，只有在尝试加载模块之前注册了 `process.on('uncaughtException')` 处理程序（例如使用预加载模块），才能捕获错误。

使用 ESM 时，如果代码可能在未启用 crypto 支持的 Node.js 构建上运行，请考虑使用 [`import()`][] 函数而不是词法 `import` 关键字：

```mjs
let tls;
try {
  tls = await import('node:tls');
} catch (err) {
  console.error('tls support is disabled!');
}
```

## TLS/SSL 概念

TLS/SSL 是一组协议，依赖于公钥基础设施 (PKI) 来实现客户端和服务器之间的安全通信。对于大多数常见情况，每个服务器必须拥有私钥。

私钥可以通过多种方式生成。下面的示例说明了使用 OpenSSL 命令行界面生成 2048 位 RSA 私钥：

```bash
openssl genrsa -out ryans-key.pem 2048
```

使用 TLS/SSL 时，所有服务器（和一些客户端）必须拥有_证书_。证书是对应于私钥的_公钥_，并由证书机构或私钥所有者（此类证书称为“自签名”）进行数字签名。获取证书的第一步是创建_证书签名请求_ (CSR) 文件。

OpenSSL 命令行界面可用于为私钥生成 CSR：

```bash
openssl req -new -sha256 -key ryans-key.pem -out ryans-csr.pem
```

生成 CSR 文件后，可以将其发送给证书机构进行签名，或用于生成自签名证书。

下面的示例说明了使用 OpenSSL 命令行界面创建自签名证书：

```bash
openssl x509 -req -in ryans-csr.pem -signkey ryans-key.pem -out ryans-cert.pem
```

生成证书后，可用于生成 `.pfx` 或 `.p12` 文件：

```bash
openssl pkcs12 -export -in ryans-cert.pem -inkey ryans-key.pem \
      -certfile ca-cert.pem -out ryans.pfx
```

其中：

* `in`：已签名的证书
* `inkey`：关联的私钥
* `certfile`：将所有证书机构 (CA) 证书串联到单个文件中，例如 `cat ca1-cert.pem ca2-cert.pem > ca-cert.pem`

### 完美前向保密

<!-- type=misc -->

术语_[前向保密][]_ 或 _完美前向保密_ 描述了密钥协商（即密钥交换）方法的一个特征。也就是说，服务器和客户端密钥用于协商新的临时密钥，这些密钥专门且仅用于当前的通信会话。实际上，这意味着即使服务器的私钥被泄露，窃听者也只有获得了专门为该会话生成的密钥对才能解密通信。

完美前向保密是通过为每次 TLS/SSL 握手随机生成密钥对来实现的（与对所有会话使用相同密钥相反）。实现此技术的方法称为“临时” (ephemeral)。

目前常用两种方法来实现完美前向保密（注意传统缩写后附加的字符 "E"）：

* [ECDHE][]：椭圆曲线 Diffie-Hellman 密钥协商协议的临时版本。
* [DHE][]：Diffie-Hellman 密钥协商协议的临时版本。

使用 ECDHE 的完美前向保密默认启用。创建 TLS 服务器时，可以使用 `ecdhCurve` 选项来自定义 TLSv1.2 及以下版本支持的 ECDH 曲线列表，以及 TLSv1.3 支持的 TLS 组列表。更多信息请参见 [`tls.createServer()`][]。

DHE 默认禁用，但可以通过将 `dhparam` 选项设置为 `'auto'` 与 ECDHE 一起启用。也支持自定义 DHE 参数，但不推荐使用，而是倾向于自动选择的知名参数。

完美前向保密在 TLSv1.2 之前是可选的。自 TLSv1.3 起，(EC)DHE 始终使用（仅 PSK 连接除外）。

### ALPN 和 SNI

<!-- type=misc -->

ALPN（应用层协议协商扩展）和 SNI（服务器名称指示）是 TLS 握手扩展：

* ALPN：允许一个 TLS 服务器用于多种协议（HTTP、HTTP/2）
* SNI：允许一个 TLS 服务器用于具有不同证书的多个主机名。

### 预共享密钥

<!-- type=misc -->

TLS-PSK 支持可用作正常基于证书的身份验证的替代方案。它使用预共享密钥而不是证书来验证 TLS 连接，提供相互认证。
TLS-PSK 和公钥基础设施不是互斥的。客户端和服务器可以兼容两者，在正常密码协商步骤中选择其中之一。

TLS-PSK 仅在存在手段与每台连接的机器安全共享密钥时才是好的选择，因此它不会取代大多数 TLS 用途的公钥基础设施 (PKI)。
OpenSSL 中的 TLS-PSK 实现近年来出现了许多安全缺陷，主要是因为它仅被少数应用程序使用。
在切换到 PSK 密码套件之前，请考虑所有替代解决方案。
生成 PSK 时，至关重要的是使用 [RFC 4086][] 中讨论的足够熵。从密码或其他低熵源派生共享密钥是不安全的。

PSK 密码套件默认禁用，因此使用 TLS-PSK 需要显式指定带有 `ciphers` 选项的密码套件。可用密码套件列表可以通过 `openssl ciphers -v 'PSK'` 检索。所有 TLS 1.3 密码套件都符合 PSK 资格，可以通过 `openssl ciphers -v -s -tls1_3 -psk` 检索。
在客户端连接上，应该传递自定义 `checkServerIdentity`，因为默认的那个在没有证书的情况下会失败。

根据 [RFC 4279][]，必须支持长度高达 128 字节的 PSK 身份和长度高达 64 字节的 PSK。截至 OpenSSL 1.1.0，最大身份大小为 128 字节，最大 PSK 长度为 256 字节。

由于底层 OpenSSL API 的限制，当前实现不支持异步 PSK 回调。

要使用 TLS-PSK，客户端和服务器必须指定 `pskCallback` 选项，这是一个返回要使用的 PSK 的函数（必须与所选密码的摘要兼容）。

它将首先在客户端被调用：

* `hint` {string} 服务器发送的可选消息，帮助客户端决定在协商期间使用哪个身份。
  如果使用 TLS 1.3，则始终为 `null`。
* 返回：{Object} 形式为 `{ psk: <Buffer|TypedArray|DataView>, identity: <string> }` 或 `null`。

然后在服务器上：

* `socket` {tls.TLSSocket} 服务器 socket 实例，等同于 `this`。
* `identity` {string} 客户端发送的身份参数。
* 返回：{Buffer|TypedArray|DataView} PSK（或 `null`）。

返回值 `null` 会停止协商过程并向另一方发送 `unknown_psk_identity` 警报消息。
如果服务器希望隐藏 PSK 身份未知的事实，回调必须提供一些随机数据作为 `psk`，以便在协商完成之前使连接因 `decrypt_error` 而失败。

### 客户端发起的重新协商攻击缓解

<!-- type=misc -->

TLS 协议允许客户端重新协商 TLS 会话的某些方面。不幸的是，会话重新协商需要不成比例的服务器端资源，使其成为拒绝服务攻击的潜在载体。

为了降低风险，重新协商限制为每十分钟三次。当超过此阈值时，[`tls.TLSSocket`][] 实例上会发出 `'error'` 事件。限制是可配置的：

* `tls.CLIENT_RENEG_LIMIT` {number} 指定重新协商请求的数量。**默认：** `3`。
* `tls.CLIENT_RENEG_WINDOW` {number} 指定重新协商时间窗口（秒）。**默认：** `600`（10 分钟）。

除非完全理解含义和风险，否则不应修改默认重新协商限制。

TLSv1.3 不支持重新协商。

### 会话恢复

建立 TLS 会话可能相对较慢。可以通过保存并稍后重用会话状态来加快此过程。有几种机制可以做到这一点，此处从最旧到最新（且首选）进行讨论。

#### 会话标识符

服务器为新连接生成唯一 ID 并将其发送给客户端。客户端和服务器保存会话状态。重新连接时，客户端发送其保存会话状态的 ID，如果服务器也有该 ID 的状态，则可以同意使用它。否则，服务器将创建新会话。有关更多信息，请参见 [RFC 2246][]，第 23 页和 30 页。

大多数 Web 浏览器在进行 HTTPS 请求时支持使用会话标识符恢复。

对于 Node.js，客户端等待 [`'session'`][] 事件以获取会话数据，并将数据提供给后续 [`tls.connect()`][] 的 `session` 选项以重用会话。服务器必须实现 [`'newSession'`][] 和 [`'resumeSession'`][] 事件的处理程序，以使用会话 ID 作为查找键来保存和恢复会话数据以重用会话。要在负载均衡器或集群 worker 之间复用会话，服务器必须在其会话处理程序中使用共享会话缓存（例如 Redis）。

#### 会话票据

服务器加密整个会话状态并将其作为“票据”发送给客户端。重新连接时，状态在初始连接中发送给服务器。此机制避免了服务器端会话缓存的需要。如果服务器出于任何原因不使用票据（无法解密、太旧等），它将创建新会话并发送新票据。有关更多信息，请参见 [RFC 5077][]。

许多 Web 浏览器在进行 HTTPS 请求时越来越普遍地支持使用会话票据恢复。

对于 Node.js，客户端使用相同的 API 进行会话标识符恢复和会话票据恢复。为了调试，如果 [`tls.TLSSocket.getTLSTicket()`][] 返回值，则会话数据包含票据，否则它包含客户端会话状态。

使用 TLSv1.3 时，请注意服务器可能会发送多个票据，导致多个 `'session'` 事件，有关更多信息，请参见 [`'session'`][]。

单进程服务器无需特定实现即可使用会话票据。要在服务器重启或负载均衡器之间使用会话票据，所有服务器必须具有相同的票据密钥。内部有三个 16 字节密钥，但 tls API 为了方便将它们暴露为单个 48 字节缓冲区。

可以通过在一个服务器实例上调用 [`server.getTicketKeys()`][] 来获取票据密钥然后分发它们，但更合理的是安全生成 48 字节的安全随机数据并使用 [`tls.createServer()`] 的 `ticketKeys` 选项设置它们。密钥应定期再生，并且可以使用 [`server.setTicketKeys()`] 重置服务器的密钥。

会话票据密钥是加密密钥，它们_**必须安全存储**_。使用 TLS 1.2 及以下版本时，如果它们被泄露，所有使用它们加密的票据的会话都可以被解密。它们不应存储在磁盘上，并且应定期再生。

如果客户端宣布支持票据，服务器将发送它们。服务器可以通过在 `secureOptions` 中提供 `require('node:constants').SSL_OP_NO_TICKET` 来禁用票据。

会话标识符和会话票据都会超时，导致服务器创建新会话。超时可以使用 [`tls.createServer()`] 的 `sessionTimeout` 选项进行配置。

对于所有机制，当恢复失败时，服务器将创建新会话。由于恢复会话失败不会导致 TLS/HTTPS 连接失败，因此很容易注意不到不必要的糟糕 TLS 性能。可以使用 OpenSSL CLI 验证服务器是否正在恢复会话。例如，对 `openssl s_client` 使用 `-reconnect` 选项：

```bash
openssl s_client -connect localhost:443 -reconnect
```

阅读调试输出。第一个连接应显示“新建”，例如：

```text
New, TLSv1.2, Cipher is ECDHE-RSA-AES128-GCM-SHA256
```

后续连接应显示“重用”，例如：

```text
Reused, TLSv1.2, Cipher is ECDHE-RSA-AES128-GCM-SHA256
```

## 修改默认 TLS 加密套件

Node.js 构建时包含了一组默认启用和禁用的 TLS 加密套件。此默认加密套件列表可以在构建 Node.js 时进行配置，以允许发行版提供自己的默认列表。

以下命令可用于显示默认加密套件：

```console
node -p crypto.constants.defaultCoreCipherList | tr ':' '\n'
TLS_AES_256_GCM_SHA384
TLS_CHACHA20_POLY1305_SHA256
TLS_AES_128_GCM_SHA256
ECDHE-RSA-AES128-GCM-SHA256
ECDHE-ECDSA-AES128-GCM-SHA256
ECDHE-RSA-AES256-GCM-SHA384
ECDHE-ECDSA-AES256-GCM-SHA384
DHE-RSA-AES128-GCM-SHA256
ECDHE-RSA-AES128-SHA256
DHE-RSA-AES128-SHA256
ECDHE-RSA-AES256-SHA384
DHE-RSA-AES256-SHA384
ECDHE-RSA-AES256-SHA256
DHE-RSA-AES256-SHA256
HIGH
!aNULL
!eNULL
!EXPORT
!DES
!RC4
!MD5
!PSK
!SRP
!CAMELLIA
```

可以使用 [`--tls-cipher-list`][] 命令行开关（直接使用，或通过 [`NODE_OPTIONS`][] 环境变量）完全替换此默认值。例如，以下命令使 `ECDHE-RSA-AES128-GCM-SHA256:!RC4` 成为默认 TLS 加密套件：

```bash
node --tls-cipher-list='ECDHE-RSA-AES128-GCM-SHA256:!RC4' server.js

export NODE_OPTIONS=--tls-cipher-list='ECDHE-RSA-AES128-GCM-SHA256:!RC4'
node server.js
```

要验证，请使用以下命令显示设置的加密套件列表，注意 `defaultCoreCipherList` 和 `defaultCipherList` 之间的区别：

```bash
node --tls-cipher-list='ECDHE-RSA-AES128-GCM-SHA256:!RC4' -p crypto.constants.defaultCipherList | tr ':' '\n'
ECDHE-RSA-AES128-GCM-SHA256
!RC4
```

即 `defaultCoreCipherList` 列表是在编译时设置的，而 `defaultCipherList` 是在运行时设置的。

要在运行时修改默认加密套件，请修改 `tls.DEFAULT_CIPHERS` 变量，这必须在监听任何套接字之前执行，它不会影响已经打开的套接字。例如：

```js
// 移除过时的 CBC 加密套件和基于 RSA 密钥交换的加密套件，因为它们不提供前向保密
tls.DEFAULT_CIPHERS +=
  ':!ECDHE-RSA-AES128-SHA:!ECDHE-RSA-AES128-SHA256:!ECDHE-RSA-AES256-SHA:!ECDHE-RSA-AES256-SHA384' +
  ':!ECDHE-ECDSA-AES128-SHA:!ECDHE-ECDSA-AES128-SHA256:!ECDHE-ECDSA-AES256-SHA:!ECDHE-ECDSA-AES256-SHA384' +
  ':!kRSA';
```

也可以使用 [`tls.createSecureContext()`][] 中的 `ciphers` 选项在每个客户端或服务器基础上替换默认值，该选项也可用于 [`tls.createServer()`][]、[`tls.connect()`][] 以及创建新的 [`tls.TLSSocket`][] 时。

加密套件列表可以包含 TLSv1.3 加密套件名称（以 `'TLS_'` 开头的那些）以及 TLSv1.2 及以下版本的加密套件规范。TLSv1.2 加密套件支持旧版规范格式，有关详细信息，请参阅 OpenSSL [加密套件列表格式][] 文档，但这些规范不适用于 TLSv1.3 加密套件。只能通过在其完整名称包含在加密套件列表中来启用 TLSv1.3 套件。例如，它们不能通过使用旧版 TLSv1.2 `'EECDH'` 或 `'!EECDH'` 规范来启用或禁用。

尽管 TLSv1.3 和 TLSv1.2 加密套件有相对顺序，但 TLSv1.3 协议比 TLSv1.2 安全得多，如果握手表明支持 TLSv1.3，并且启用了任何 TLSv1.3 加密套件，则始终会选择 TLSv1.3 而不是 TLSv1.2。

Node.js 中包含的默认加密套件经过精心选择，以反映当前的安全最佳实践和风险缓解措施。更改默认加密套件可能会对应用程序的安全性产生重大影响。只有在绝对必要时才应使用 `--tls-cipher-list` 开关和 `ciphers` 选项。

默认加密套件首选 GCM 加密套件以符合 [Chrome 的“现代加密”设置][]，并且首选 ECDHE 和 DHE 加密套件以实现完美前向保密，同时提供_一些_向后兼容性。

依赖不安全且已弃用的 RC4 或基于 DES 的加密套件（如 Internet Explorer 6）的旧客户端无法使用默认配置完成握手过程。如果_必须_支持这些客户端，[TLS 建议][] 可能提供兼容的加密套件。有关格式的更多详细信息，请参阅 OpenSSL [加密套件列表格式][] 文档。

只有五个 TLSv1.3 加密套件：

* `'TLS_AES_256_GCM_SHA384'`
* `'TLS_CHACHA20_POLY1305_SHA256'`
* `'TLS_AES_128_GCM_SHA256'`
* `'TLS_AES_128_CCM_SHA256'`
* `'TLS_AES_128_CCM_8_SHA256'`

前三个默认启用。两个基于 `CCM` 的套件受 TLSv1.3 支持，因为它们在受限系统上可能性能更高，但它们默认未启用，因为它们提供的安全性较低。

## OpenSSL 安全级别

OpenSSL 库强制执行安全级别以控制加密操作可接受的最低安全级别。OpenSSL 的安全级别范围从 0 到 5，每个级别都施加更严格的安全要求。默认安全级别是 2，通常适合大多数现代应用程序。但是，某些旧版功能和协议（如 TLSv1）需要较低的安全级别（`SECLEVEL=0`）才能正常运行。有关更详细的信息，请参阅 [OpenSSL 关于安全级别的文档][]。

### 设置安全级别

要在 Node.js 应用程序中调整安全级别，您可以在加密套件字符串中包含 `@SECLEVEL=X`，其中 `X` 是所需的安全级别。例如，要在使用默认 OpenSSL 加密套件列表时将安全级别设置为 0，您可以使用：

```mjs
import { createServer, connect } from 'node:tls';
const port = 443;

createServer({ ciphers: 'DEFAULT@SECLEVEL=0', minVersion: 'TLSv1' }, function(socket) {
  console.log('客户端使用的协议连接：', socket.getProtocol());
  socket.end();
  this.close();
})
.listen(port, () => {
  connect(port, { ciphers: 'DEFAULT@SECLEVEL=0', maxVersion: 'TLSv1' });
});
```

```cjs
const { createServer, connect } = require('node:tls');
const port = 443;

createServer({ ciphers: 'DEFAULT@SECLEVEL=0', minVersion: 'TLSv1' }, function(socket) {
  console.log('客户端使用的协议连接：', socket.getProtocol());
  socket.end();
  this.close();
})
.listen(port, () => {
  connect(port, { ciphers: 'DEFAULT@SECLEVEL=0', maxVersion: 'TLSv1' });
});
```

此方法将安全级别设置为 0，允许使用旧版功能，同时仍利用默认 OpenSSL 加密套件。

### 使用 [`--tls-cipher-list`][]

您也可以使用 `--tls-cipher-list=DEFAULT@SECLEVEL=X` 从命令行设置安全级别和加密套件，如 [修改默认 TLS 加密套件][] 中所述。但是，通常不推荐使用命令行选项来设置加密套件，最好在应用程序代码中为各个上下文配置加密套件，因为这种方法提供更细粒度的控制，并降低全局降低安全级别的风险。

## X509 证书错误代码

多个函数可能因 OpenSSL 报告的证书错误而失败。在这种情况下，函数通过其回调提供一个 {Error}，该回调具有 `code` 属性，该属性可以采用以下值之一：

<!--
values are taken from src/crypto/crypto_common.cc
description are taken from deps/openssl/openssl/crypto/x509/x509_txt.c
-->

* `'UNABLE_TO_GET_ISSUER_CERT'`: 无法获取颁发者证书。
* `'UNABLE_TO_GET_CRL'`: 无法获取证书 CRL。
* `'UNABLE_TO_DECRYPT_CERT_SIGNATURE'`: 无法解密证书的签名。
* `'UNABLE_TO_DECRYPT_CRL_SIGNATURE'`: 无法解密 CRL 的签名。
* `'UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY'`: 无法解码颁发者公钥。
* `'CERT_SIGNATURE_FAILURE'`: 证书签名失败。
* `'CRL_SIGNATURE_FAILURE'`: CRL 签名失败。
* `'CERT_NOT_YET_VALID'`: 证书尚未有效。
* `'CERT_HAS_EXPIRED'`: 证书已过期。
* `'CRL_NOT_YET_VALID'`: CRL 尚未有效。
* `'CRL_HAS_EXPIRED'`: CRL 已过期。
* `'ERROR_IN_CERT_NOT_BEFORE_FIELD'`: 证书的 notBefore 字段格式错误。
* `'ERROR_IN_CERT_NOT_AFTER_FIELD'`: 证书的 notAfter 字段格式错误。
* `'ERROR_IN_CRL_LAST_UPDATE_FIELD'`: CRL 的 lastUpdate 字段格式错误。
* `'ERROR_IN_CRL_NEXT_UPDATE_FIELD'`: CRL 的 nextUpdate 字段格式错误。
* `'OUT_OF_MEM'`: 内存不足。
* `'DEPTH_ZERO_SELF_SIGNED_CERT'`: 自签名证书。
* `'SELF_SIGNED_CERT_IN_CHAIN'`: 证书链中的自签名证书。
* `'UNABLE_TO_GET_ISSUER_CERT_LOCALLY'`: 无法获取本地颁发者证书。
* `'UNABLE_TO_VERIFY_LEAF_SIGNATURE'`: 无法验证第一个证书。
* `'CERT_CHAIN_TOO_LONG'`: 证书链太长。
* `'CERT_REVOKED'`: 证书已吊销。
* `'INVALID_CA'`: 无效的 CA 证书。
* `'PATH_LENGTH_EXCEEDED'`: 超出路径长度约束。
* `'INVALID_PURPOSE'`: 不支持的证书用途。
* `'CERT_UNTRUSTED'`: 证书不受信任。
* `'CERT_REJECTED'`: 证书被拒绝。
* `'HOSTNAME_MISMATCH'`: 主机名不匹配。

当发生诸如 `UNABLE_TO_VERIFY_LEAF_SIGNATURE`、`DEPTH_ZERO_SELF_SIGNED_CERT` 或 `UNABLE_TO_GET_ISSUER_CERT` 之类的证书错误时，Node.js 会附加一个提示，建议如果根 CA 本地安装，尝试使用 `--use-system-ca` 标志运行，以引导开发人员走向安全的解决方案，防止不安全的工作区。

## 类：`tls.Server`

<!-- YAML
added: v0.3.2
-->

* 继承：{net.Server}

接受使用 TLS 或 SSL 的加密连接。

### 事件：`connection`

<!-- YAML
added: v0.3.2
-->

* `socket` {stream.Duplex}

当建立新的 TCP 流时，在 TLS 握手开始之前发出此事件。`socket` 通常是 [`net.Socket`][] 类型的对象，但与 [`net.Server`][] `'connection'` 事件创建的套接字不同，它不会接收事件。通常用户不想访问此事件。

用户也可以显式发出此事件以将连接注入 TLS 服务器。在这种情况下，可以传递任何 [`Duplex`][] 流。

### 事件：`keylog`

<!-- YAML
added:
 - v12.3.0
 - v10.20.0
-->

* `line` {Buffer} ASCII 文本行，采用 NSS `SSLKEYLOGFILE` 格式。
* `tlsSocket` {tls.TLSSocket} 生成该事件的 `tls.TLSSocket` 实例。

当生成或接收到与此服务器的连接的密钥材料时发出 `keylog` 事件（通常在握手完成之前，但不一定）。可以存储此密钥材料以进行调试，因为它允许解密捕获的 TLS 流量。每个套接字可能会发出多次。

一个典型的用例是将接收到的行附加到公共文本文件，该软件（如 Wireshark）稍后使用该文件来解密流量：

```js
const logFile = fs.createWriteStream('/tmp/ssl-keys.log', { flags: 'a' });
// ...
server.on('keylog', (line, tlsSocket) => {
  if (tlsSocket.remoteAddress !== '...')
    return; // 仅记录特定 IP 的密钥
  logFile.write(line);
});
```

### 事件：`'newSession'`

<!-- YAML
added: v0.9.2
changes:
  - version: v0.11.12
    pr-url: https://github.com/nodejs/node-v0.x-archive/pull/7118
    description: "现在支持 `callback` 参数。"
-->

创建新的 TLS 会话时发出 `'newSession'` 事件。这可用于将会话存储在外部存储中。数据应提供给 [`'resumeSession'`][] 回调。

调用监听器回调时传递三个参数：

* `sessionId` {Buffer} TLS 会话标识符
* `sessionData` {Buffer} TLS 会话数据
* `callback` {Function} 一个不带参数的回调函数，必须调用该函数才能通过安全连接发送或接收数据。

监听此事件仅对添加事件监听器后建立的连接有效。

### 事件：`'OCSPRequest'`

<!-- YAML
added: v0.11.13
-->

当客户端发送证书状态请求时发出 `'OCSPRequest'` 事件。调用监听器回调时传递三个参数：

* `certificate` {Buffer} 服务器证书
* `issuer` {Buffer} 颁发者的证书
* `callback` {Function} 必须调用以提供 OCSP 请求结果的回调函数。

可以解析服务器的当前证书以获取 OCSP URL 和证书 ID；获得 OCSP 响应后，然后调用 `callback(null, resp)`，其中 `resp` 是包含 OCSP 响应的 `Buffer` 实例。`certificate` 和 `issuer` 都是主证书和颁发者证书的 `Buffer` DER 表示。这些可用于获取 OCSP 证书 ID 和 OCSP 端点 URL。

或者，可以调用 `callback(null, null)`，表示没有 OCSP 响应。

调用 `callback(err)` 将导致 `socket.destroy(err)` 调用。

OCSP 请求的典型流程如下：

1. 客户端连接到服务器并发送 `'OCSPRequest'`（通过 ClientHello 中的状态信息扩展）。
2. 服务器接收请求并发出 `'OCSPRequest'` 事件，如果已注册则调用监听器。
3. 服务器从 `certificate` 或 `issuer` 提取 OCSP URL 并向 CA 执行 [OCSP 请求][]。
4. 服务器从 CA 接收 `'OCSPResponse'` 并通过 `callback` 参数将其发送回客户端
5. 客户端验证响应并销毁套接字或执行握手。

如果证书是自签名的或颁发者不在根证书列表中，则 `issuer` 可以为 `null`。（建立 TLS 连接时可以通过 `ca` 选项提供颁发者。）

监听此事件仅对添加事件监听器后建立的连接有效。

可以使用像 [asn1.js][] 这样的 npm 模块来解析证书。

### 事件：`'resumeSession'`

<!-- YAML
added: v0.9.2
-->

当客户端请求恢复以前的 TLS 会话时发出 `'resumeSession'` 事件。调用监听器回调时传递两个参数：

* `sessionId` {Buffer} TLS 会话标识符
* `callback` {Function} 当恢复先前会话时调用的回调函数：`callback([err[, sessionData]])`
  * `err` {Error}
  * `sessionData` {Buffer}

事件监听器应使用给定的 `sessionId` 在外部存储中查找由 [`'newSession'`][] 事件处理程序保存的 `sessionData`。如果找到，调用 `callback(null, sessionData)` 以恢复会话。如果未找到，则会话无法恢复。必须调用不带 `sessionData` 的 `callback()`，以便握手可以继续并可以创建新会话。可以调用 `callback(err)` 来终止传入连接并销毁套接字。

监听此事件仅对添加事件监听器后建立的连接有效。

以下说明了恢复 TLS 会话：

```js
const tlsSessionStore = {};
server.on('newSession', (id, data, cb) => {
  tlsSessionStore[id.toString('hex')] = data;
  cb();
});
server.on('resumeSession', (id, cb) => {
  cb(null, tlsSessionStore[id.toString('hex')] || null);
});
```

### 事件：`'secureConnection'`

<!-- YAML
added: v0.3.2
-->

新连接的握手过程成功完成后发出 `'secureConnection'` 事件。调用监听器回调时传递一个参数：

* `tlsSocket` {tls.TLSSocket} 已建立的 TLS 套接字。

`tlsSocket.authorized` 属性是一个 `boolean`，指示客户端是否已由服务器提供的证书授权机构之一验证。如果 `tlsSocket.authorized` 为 `false`，则 `socket.authorizationError` 设置为描述授权失败的原因。根据 TLS 服务器的设置，可能仍会接受未经授权的连接。

`tlsSocket.alpnProtocol` 属性是一个包含所选 ALPN 协议的字符串。当 ALPN 没有所选协议（因为客户端或服务器未发送 ALPN 扩展）时，`tlsSocket.alpnProtocol` 等于 `false`。

`tlsSocket.servername` 属性是一个包含通过 SNI 请求的服务器名称的字符串。

### 事件：`'tlsClientError'`

<!-- YAML
added: v6.0.0
-->

在建立安全连接之前发生错误时发出 `'tlsClientError'` 事件。调用监听器回调时传递两个参数：

* `exception` {Error} 描述错误的 `Error` 对象
* `tlsSocket` {tls.TLSSocket} 产生错误的 `tls.TLSSocket` 实例。

### `server.addContext(hostname, context)`

<!-- YAML
added: v0.5.3
-->

* `hostname` {string} SNI 主机名或通配符（例如 `'*'`）
* `context` {Object|tls.SecureContext} 一个对象，包含来自 [`tls.createSecureContext()`][] `options` 参数的任何可能属性（例如 `key`、`cert`、`ca` 等），或使用 [`tls.createSecureContext()`][] 本身创建的 TLS 上下文对象。

`server.addContext()` 方法添加一个安全上下文，如果客户端请求的 SNI 名称与提供的 `hostname`（或通配符）匹配，则将使用该上下文。

当有多个匹配的上下文时，使用最近添加的一个。

### `server.address()`

<!-- YAML
added: v0.6.0
-->

* 返回：{Object}

返回操作系统报告的服务器绑定地址、地址族名称和端口。有关更多信息，请参阅 [`net.Server.address()`][]。

### `server.close([callback])`

<!-- YAML
added: v0.3.2
-->

* `callback` {Function} 一个监听器回调，将注册为监听服务器实例的 `'close'` 事件。
* 返回：{tls.Server}

`server.close()` 方法停止服务器接受新连接。

此函数异步运行。当服务器没有更多打开的连接时，将发出 `'close'` 事件。

### `server.getTicketKeys()`

<!-- YAML
added: v3.0.0
-->

* 返回：{Buffer} 包含会话票证密钥的 48 字节缓冲区。

返回会话票证密钥。

有关更多信息，请参阅 [会话恢复][]。

### `server.listen()`

启动服务器监听加密连接。
此方法与 [`net.Server`][] 中的 [`server.listen()`][] 相同。

### `server.setSecureContext(options)`

<!-- YAML
added: v11.0.0
-->

* `options` {Object} 一个对象，包含来自 [`tls.createSecureContext()`][] `options` 参数的任何可能属性（例如 `key`、`cert`、`ca` 等）。

`server.setSecureContext()` 方法替换现有服务器的安全上下文。到服务器的现有连接不会中断。

### `server.setTicketKeys(keys)`

<!-- YAML
added: v3.0.0
-->

* `keys` {Buffer|TypedArray|DataView} 包含会话票证密钥的 48 字节缓冲区。

设置会话票证密钥。

票证密钥的更改仅对未来的服务器连接有效。现有或当前待处理的服务器连接将使用以前的密钥。

有关更多信息，请参阅 [会话恢复][].

## 类：`tls.TLSSocket`

<!-- YAML
added: v0.11.4
-->

* 继承自：{net.Socket}

对写入数据执行透明加密，并进行所有所需的 TLS 协商。

`tls.TLSSocket` 的实例实现了双工 [Stream][] 接口。

返回 TLS 连接元数据的方法（例如 [`tls.TLSSocket.getPeerCertificate()`][]）仅在连接打开时返回数据。

### `new tls.TLSSocket(socket[, options])`

<!-- YAML
added: v0.11.4
changes:
  - version: v12.2.0
    pr-url: https://github.com/nodejs/node/pull/27497
    description: "现在支持 `enableTrace` 选项。"
  - version: v5.0.0
    pr-url: https://github.com/nodejs/node/pull/2564
    description: 现在支持 ALPN 选项。
-->

* `socket` {net.Socket|stream.Duplex}
  在服务器端，任何 `Duplex` 流。在客户端，任何 [`net.Socket`][] 实例（对于客户端的通用 `Duplex` 流支持，必须使用 [`tls.connect()`][]）。
* `options` {Object}
  * `enableTrace`: 参见 [`tls.createServer()`][]
  * `isServer`: SSL/TLS 协议是不对称的，TLSSockets 必须知道它们是作为服务器还是客户端行为。如果为 `true`，TLS socket 将实例化为服务器。**默认值：** `false`。
  * `server` {net.Server} 一个 [`net.Server`][] 实例。
  * `requestCert`: 是否通过请求证书来验证远程对等方。客户端总是请求服务器证书。服务器（`isServer` 为 true）可以将 `requestCert` 设置为 true 以请求客户端证书。
  * `rejectUnauthorized`: 参见 [`tls.createServer()`][]
  * `ALPNProtocols`: 参见 [`tls.createServer()`][]
  * `SNICallback`: 参见 [`tls.createServer()`][]
  * `ALPNCallback`: 参见 [`tls.createServer()`][]
  * `session` {Buffer} 包含 TLS 会话的 `Buffer` 实例。
  * `requestOCSP` {boolean} 如果为 `true`，指定 OCSP 状态请求扩展将添加到客户端 hello 中，并且在建立安全通信之前将在 socket 上发出 `'OCSPResponse'` 事件
  * `secureContext`: 使用 [`tls.createSecureContext()`][] 创建的 TLS 上下文对象。如果_未_提供 `secureContext`，则将把整个 `options` 对象传递给 `tls.createSecureContext()` 来创建一个。
  * ...: 如果缺少 `secureContext` 选项，则使用 [`tls.createSecureContext()`][] 选项。否则，它们将被忽略。

从现有的 TCP socket 构造一个新的 `tls.TLSSocket` 对象。

### 事件：`'keylog'`

<!-- YAML
added:
 - v12.3.0
 - v10.20.0
-->

* `line` {Buffer} 一行 ASCII 文本，采用 NSS `SSLKEYLOGFILE` 格式。

当 socket 生成或接收密钥材料时，会在 `tls.TLSSocket` 上发出 `keylog` 事件。此密钥材料可以存储用于调试，因为它允许解密捕获的 TLS 流量。它可能会发出多次，在握手完成之前或之后。

一个典型的用例是将接收到的行追加到一个公共文本文件中，该软件（例如 Wireshark）稍后使用该文件来解密流量：

```js
const logFile = fs.createWriteStream('/tmp/ssl-keys.log', { flags: 'a' });
// ...
tlsSocket.on('keylog', (line) => logFile.write(line));
```

### 事件：ocspResponse

<!-- YAML
added: v0.11.13
-->

如果在创建 tls.TLSSocket 时设置了 requestOCSP 选项并且收到了 OCSP 响应，则会发出 ocspResponse 事件。调用监听器回调时传入单个参数：

* response {Buffer} 服务器的 OCSP 响应

通常，response 是来自服务器 CA 的数字签名对象，其中包含有关服务器证书吊销状态的信息。

### 事件：secureConnect

<!-- YAML
added: v0.11.4
-->

secureConnect 事件在 TLS 握手成功完成并建立安全连接后发出。

此事件在客户端和服务器 {tls.TLSSocket} 实例上发出，包括使用 tls.connect 构造函数创建的 socket。

### 事件：secure

<!-- YAML
added: v0.11.4
-->

secure 事件在新连接的握手过程成功完成后发出。无论服务器的证书是否已授权，都将调用监听器回调。客户端有责任检查 authorized 属性以确定服务器证书是否由指定的 CA 之一签名。如果未授权，则可以通过检查 authorizationError 属性找到错误。如果使用了 ALPN，则可以检查 alpnProtocol 属性以确定协商的协议。

当使用 tls.connect 构造函数创建 {tls.TLSSocket} 时，不会发出 secure 事件。

### 事件：session

<!-- YAML
added: v11.10.0
-->

* session {Buffer}

当新会话或 TLS 票据可用时，会在客户端 socket 上发出 session 事件。这可能发生在握手完成之前或之后，具体取决于协商的 TLS 协议版本。该事件不在服务器上发出，或者如果没有创建新会话，例如当连接恢复时。对于某些 TLS 协议版本，该事件可能会发出多次，在这种情况下，所有会话都可用于恢复。

在客户端，session 可以提供给 [tls.connect][] 的 session 选项以恢复连接。

参见 [会话恢复][] 获取更多信息。

对于 TLSv1.2 及以下版本，一旦握手完成，可以调用 [tlsSocket.getSession][]。对于 TLSv1.3，协议仅允许基于票据的恢复，发送多个票据，并且票据仅在握手完成后发送。因此有必要等待 session 事件来获取可恢复的会话。应用程序应使用 session 事件而不是 secure 以确保它们适用于所有 TLS 版本。仅期望获取或使用一个会话的应用程序应只监听此事件一次：

```js
tlsSocket.once('session', (session) => {
  // 会话可以立即使用或稍后使用。
  tls.connect({
    session: session,
    // 其他连接选项...
  });
});
```

### `tlsSocket.address()`

<!-- YAML
added: v0.11.4
changes:
  - version: v18.4.0
    pr-url: https://github.com/nodejs/node/pull/43054
    description: "`family` 属性现在返回字符串而不是数字。"
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41431
    description: "`family` 属性现在返回数字而不是字符串。"
-->

* 返回：{Object}

返回操作系统报告的底层 socket 的绑定 `address`、地址 `family` 名称和 `port`：`{ port: 12346, family: 'IPv4', address: '127.0.0.1' }`。

### `tlsSocket.authorizationError`

<!-- YAML
added: v0.11.4
-->

返回对等方证书未被验证的原因。此属性仅在 `tlsSocket.authorized === false` 时设置。

### `tlsSocket.authorized`

<!-- YAML
added: v0.11.4
-->

* 类型：{boolean}

如果对等证书由创建 `tls.TLSSocket` 实例时指定的 CA 之一签名，则此属性为 `true`，否则为 `false`。

### `tlsSocket.disableRenegotiation()`

<!-- YAML
added: v8.4.0
-->

禁用此 `TLSSocket` 实例的 TLS 重新协商。一旦调用，尝试重新协商将触发 `TLSSocket` 上的 `'error'` 事件。

### `tlsSocket.enableTrace()`

<!-- YAML
added: v12.2.0
-->

启用后，TLS 数据包跟踪信息将写入 `stderr`。这可用于调试 TLS 连接问题。

输出格式与 `openssl s_client -trace` 或 `openssl s_server -trace` 的输出相同。虽然它是由 OpenSSL 的 `SSL_trace()` 函数生成的，但格式未记录在案，可能会在不通知的情况下更改，不应依赖。

### `tlsSocket.encrypted`

<!-- YAML
added: v0.11.4
-->

始终返回 `true`。这可用于区分 TLS socket 和普通的 `net.Socket` 实例。

### `tlsSocket.exportKeyingMaterial(length, label[, context])`

<!-- YAML
added:
 - v13.10.0
 - v12.17.0
-->

* `length` {number} 从密钥材料中检索的字节数

* `label` {string} 应用程序特定的标签，通常这将是 [IANA 导出器标签注册表](https://www.iana.org/assignments/tls-parameters/tls-parameters.xhtml#exporter-labels) 中的值。

* `context` {Buffer} 可选地提供上下文。

* 返回：{Buffer} 请求的密钥材料字节

密钥材料用于验证以防止网络协议中的不同类型的攻击，例如在 IEEE 802.1X 的规范中。

示例

```js
const keyingMaterial = tlsSocket.exportKeyingMaterial(
  128,
  'client finished');

/*
 keyingMaterial 的示例返回值：
 <Buffer 76 26 af 99 c5 56 8e 42 09 91 ef 9f 93 cb ad 6c 7b 65 f8 53 f1 d8 d9
    12 5a 33 b8 b5 25 df 7b 37 9f e0 e2 4f b8 67 83 a3 2f cd 5d 41 42 4c 91
    74 ef 2c ... 78 更多字节>
*/
```

参见 OpenSSL [`SSL_export_keying_material`][] 文档获取更多信息。

### `tlsSocket.getCertificate()`

<!-- YAML
added: v11.2.0
-->

* 返回：{Object}

返回一个代表本地证书的对象。返回的对象具有对应于证书字段的一些属性。

参见 [`tls.TLSSocket.getPeerCertificate()`][] 获取证书结构示例。

如果没有本地证书，将返回一个空对象。如果 socket 已被销毁，将返回 `null`。

### `tlsSocket.getCipher()`

<!-- YAML
added: v0.11.4
changes:
  - version:
     - v13.4.0
     - v12.16.0
    pr-url: https://github.com/nodejs/node/pull/30637
    description: "将 IETF 加密套件名称作为 `standardName` 返回。"
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/26625
    description: 返回最低加密套件版本，而不是固定字符串
      (`'TLSv1/SSLv3'`)。
-->

* 返回：{Object}
  * `name` {string} 加密套件的 OpenSSL 名称。
  * `standardName` {string} 加密套件的 IETF 名称。
  * `version` {string} 此加密套件支持的最低 TLS 协议版本。对于实际协商的协议，参见 [`tls.TLSSocket.getProtocol()`][]。

返回一个包含有关协商加密套件信息的对象。

例如，带有 AES256-SHA 加密的 TLSv1.2 协议：

```json
{
    "name": "AES256-SHA",
    "standardName": "TLS_RSA_WITH_AES_256_CBC_SHA",
    "version": "SSLv3"
}
```

参见 [SSL\_CIPHER\_get\_name](https://www.openssl.org/docs/man1.1.1/man3/SSL_CIPHER_get_name.html) 获取更多信息。

### `tlsSocket.getEphemeralKeyInfo()`

<!-- YAML
added: v5.0.0
-->

* 返回：{Object}

返回一个描述客户端连接上 [perfect forward
secrecy][] 中临时密钥协商的对象。当密钥协商不是临时时，它会返回一个空对象。由于这仅支持客户端 socket；如果在服务器 socket 上调用，则返回 `null`。支持的类型有 `'DH'`、`'ECDH'` 和 `'TLSGroup'`。对于 `'DH'` 和 `'ECDH'`，该对象描述对端临时密钥参数。对于 `'TLSGroup'`，当没有可用的对端临时密钥对象时，该对象标识用于密钥协商的已协商 TLS 支持组。

`name` 属性仅在类型为 `'ECDH'` 或 `'TLSGroup'` 时可用。类型为 `'TLSGroup'` 时，`size` 属性不可用。对于 `'TLSGroup'`，`name` 是已协商的 TLS 支持组名称。标准化的 TLS 组名称和代码点列在 [IANA TLS Supported Groups registry][] 中。

例如：`{ type: 'ECDH', name: 'prime256v1', size: 256 }`。

### `tlsSocket.getFinished()`

<!-- YAML
added: v9.9.0
-->

* 返回：{Buffer|undefined} 作为 SSL/TLS 握手一部分发送到套接字的最新 `Finished` 消息，如果尚未发送 `Finished` 消息，则返回 `undefined`。

由于 `Finished` 消息是完整握手的信息摘要（TLS 1.0 总共 192 位，SSL 3.0 更多），当 SSL/TLS 提供的认证不需要或不够时，它们可用于外部认证过程。

对应于 OpenSSL 中的 `SSL_get_finished` 例程，并可用于实现 [RFC 5929][] 中的 `tls-unique` 通道绑定。

### `tlsSocket.getPeerCertificate([detailed])`

<!-- YAML
added: v0.11.4
-->

* `detailed` {boolean} 如果为 `true` 则包含完整证书链，否则仅包含对等方的证书。
* 返回：{Object} 一个证书对象。

返回一个代表对等方证书的对象。如果对等方未提供证书，将返回一个空对象。如果 socket 已被销毁，将返回 `null`。

如果请求了完整证书链，每个证书将包含一个 `issuerCertificate` 属性，其中包含一个代表其颁发者证书的对象。

#### 证书对象

<!-- YAML
changes:
  - version:
      - v19.1.0
      - v18.13.0
    pr-url: https://github.com/nodejs/node/pull/44935
    description: 添加 "ca" 属性。
  - version:
      - v17.2.0
      - v16.14.0
    pr-url: https://github.com/nodejs/node/pull/39809
    description: 添加 fingerprint512。
  - version: v11.4.0
    pr-url: https://github.com/nodejs/node/pull/24358
    description: 支持椭圆曲线公钥信息。
-->

证书对象具有对应于证书字段的属性。

* `ca` {boolean} 如果是证书颁发机构 (CA) 则为 `true`，否则为 `false`。
* `raw` {Buffer} DER 编码的 X.509 证书数据。
* `subject` {Object} 证书主体，根据国家 (`C`)、州或省 (`ST`)、 地区 (`L`)、组织 (`O`)、组织单位 (`OU`) 和通用名称 (`CN`) 来描述。通用名称通常是 TLS 证书的 DNS 名称。示例：`{C: 'UK', ST: 'BC', L: 'Metro', O: 'Node Fans', OU: 'Docs', CN: 'example.com'}`。
* `issuer` {Object} 证书颁发者，描述术语与 `subject` 相同。
* `valid_from` {string} 证书有效的起始日期时间。
* `valid_to` {string} 证书有效的截止日期时间。
* `serialNumber` {string} 证书序列号，作为十六进制字符串。示例：`'B9B0D332A1AA5635'`。
* `fingerprint` {string} DER 编码证书的 SHA-1 摘要。它作为 `:` 分隔的十六进制字符串返回。示例：`'2A:7A:C2:DD:...'`。
* `fingerprint256` {string} DER 编码证书的 SHA-256 摘要。它作为 `:` 分隔的十六进制字符串返回。示例：`'2A:7A:C2:DD:...'`。
* `fingerprint512` {string} DER 编码证书的 SHA-512 摘要。它作为 `:` 分隔的十六进制字符串返回。示例：`'2A:7A:C2:DD:...'`。
* `ext_key_usage` {Array} (可选) 扩展密钥用法，一组 OID。
* `subjectaltname` {string} (可选) 包含主体连接名称的字符串，`subject` 名称的替代方案。
* `infoAccess` {Array} (可选) 描述 AuthorityInfoAccess 的数组，与 OCSP 一起使用。
* `issuerCertificate` {Object} (可选) 颁发者证书对象。对于自签名证书，这可能是循环引用。

证书可能包含有关公钥的信息，具体取决于密钥类型。

对于 RSA 密钥，可以定义以下属性：

* `bits` {number} RSA 位大小。示例：`1024`。
* `exponent` {string} RSA 指数，作为十六进制数字表示法的字符串。示例：`'0x010001'`。
* `modulus` {string} RSA 模数，作为十六进制字符串。示例：`'B56CE45CB7...'`。
* `pubkey` {Buffer} 公钥。

对于 EC 密钥，可以定义以下属性：

* `pubkey` {Buffer} 公钥。
* `bits` {number} 密钥大小（位）。示例：`256`。
* `asn1Curve` {string} (可选) 椭圆曲线 OID 的 ASN.1 名称。众所周知的曲线由 OID 标识。虽然不常见，但曲线可能由其数学属性标识，在这种情况下它将没有 OID。示例：`'prime256v1'`。
* `nistCurve` {string} (可选) 椭圆曲线的 NIST 名称，如果有（并非所有众所周知的曲线都被 NIST 分配了名称）。示例：`'P-256'`。

示例证书：

<!-- eslint-skip -->

```js
{ subject:
   { OU: [ 'Domain Control Validated', 'PositiveSSL Wildcard' ],
     CN: '*.nodejs.org' },
  issuer:
   { C: 'GB',
     ST: 'Greater Manchester',
     L: 'Salford',
     O: 'COMODO CA Limited',
     CN: 'COMODO RSA Domain Validation Secure Server CA' },
  subjectaltname: 'DNS:*.nodejs.org, DNS:nodejs.org',
  infoAccess:
   { 'CA Issuers - URI':
      [ 'http://crt.comodoca.com/COMODORSADomainValidationSecureServerCA.crt' ],
     'OCSP - URI': [ 'http://ocsp.comodoca.com' ] },
  modulus: 'B56CE45CB740B09A13F64AC543B712FF9EE8E4C284B542A1708A27E82A8D151CA178153E12E6DDA15BF70FFD96CB8A88618641BDFCCA03527E665B70D779C8A349A6F88FD4EF6557180BD4C98192872BCFE3AF56E863C09DDD8BC1EC58DF9D94F914F0369102B2870BECFA1348A0838C9C49BD1C20124B442477572347047506B1FCD658A80D0C44BCC16BC5C5496CFE6E4A8428EF654CD3D8972BF6E5BFAD59C93006830B5EB1056BBB38B53D1464FA6E02BFDF2FF66CD949486F0775EC43034EC2602AEFBF1703AD221DAA2A88353C3B6A688EFE8387811F645CEED7B3FE46E1F8B9F59FAD028F349B9BC14211D5830994D055EEA3D547911E07A0ADDEB8A82B9188E58720D95CD478EEC9AF1F17BE8141BE80906F1A339445A7EB5B285F68039B0F294598A7D1C0005FC22B5271B0752F58CCDEF8C8FD856FB7AE21C80B8A2CE983AE94046E53EDE4CB89F42502D31B5360771C01C80155918637490550E3F555E2EE75CC8C636DDE3633CFEDD62E91BF0F7688273694EEEBA20C2FC9F14A2A435517BC1D7373922463409AB603295CEB0BB53787A334C9CA3CA8B30005C5A62FC0715083462E00719A8FA3ED0A9828C3871360A73F8B04A4FC1E71302844E9BB9940B77E745C9D91F226D71AFCAD4B113AAF68D92B24DDB4A2136B55A1CD1ADF39605B63CB639038ED0F4C987689866743A68769CC55847E4A06D6E2E3F1',
  exponent: '0x10001',
  pubkey: <Buffer ... >,
  valid_from: 'Aug 14 00:00:00 2017 GMT',
  valid_to: 'Nov 20 23:59:59 2019 GMT',
  fingerprint: '01:02:59:D9:C3:D2:0D:08:F7:82:4E:44:A4:B4:53:C5:E2:3A:87:4D',
  fingerprint256: '69:AE:1A:6A:D4:3D:C6:C1:1B:EA:C6:23:DE:BA:2A:14:62:62:93:5C:7A:EA:06:41:9B:0B:BC:87:CE:48:4E:02',
  fingerprint512: '19:2B:3E:C3:B3:5B:32:E8:AE:BB:78:97:27:E4:BA:6C:39:C9:92:79:4F:31:46:39:E2:70:E5:5F:89:42:17:C9:E8:64:CA:FF:BB:72:56:73:6E:28:8A:92:7E:A3:2A:15:8B:C2:E0:45:CA:C3:BC:EA:40:52:EC:CA:A2:68:CB:32',
  ext_key_usage: [ '1.3.6.1.5.5.7.3.1', '1.3.6.1.5.5.7.3.2' ],
  serialNumber: '66593D57F20CBC573E433381B5FEC280',
  raw: <Buffer ... > }
```

### `tlsSocket.getPeerFinished()`

<!-- YAML
added: v9.9.0
-->

* 返回：{Buffer|undefined} 作为 SSL/TLS 握手的一部分，预期收到或已实际从套接字收到的最新 `Finished` 消息，如果到目前为止没有 `Finished` 消息，则返回 `undefined`。

由于 `Finished` 消息是完整握手的信息摘要（TLS 1.0 总共 192 位，SSL 3.0 更多），当 SSL/TLS 提供的认证不需要或不够时，它们可用于外部认证过程。

对应于 OpenSSL 中的 `SSL_get_peer_finished` 例程，并可用于实现 [RFC 5929][] 中的 `tls-unique` 通道绑定。

### `tlsSocket.getPeerX509Certificate()`

<!-- YAML
added: v15.9.0
-->

* 返回：{X509Certificate}

返回对等证书作为 {X509Certificate} 对象。

如果没有对等证书，或者 socket 已被销毁，将返回 `undefined`。

### `tlsSocket.getProtocol()`

<!-- YAML
added: v5.7.0
-->

* 返回：{string|null}

返回一个包含当前连接协商的 SSL/TLS 协议版本的字符串。对于尚未完成握手过程的连接 socket，将返回值 `'unknown'`。对于服务器 socket 或断开的客户端 socket，将返回值 `null`。

协议版本有：

* `'SSLv3'`
* `'TLSv1'`
* `'TLSv1.1'`
* `'TLSv1.2'`
* `'TLSv1.3'`

参见 OpenSSL [`SSL_get_version`][] 文档获取更多信息。

### `tlsSocket.getSession()`

<!-- YAML
added: v0.11.4
-->

* 类型：{Buffer}

返回 TLS 会话数据，如果没有协商会话则返回 `undefined`。在客户端，数据可以提供给 [`tls.connect()`][] 的 `session` 选项以恢复连接。在服务器上，它可能用于调试。

参见 [会话恢复][] 获取更多信息。

注意：`getSession()` 仅适用于 TLSv1.2 及以下版本。对于 TLSv1.3，应用程序必须使用 [`'session'`][] 事件（它也适用于 TLSv1.2 及以下版本）。

### `tlsSocket.getSharedSigalgs()`

<!-- YAML
added: v12.11.0
-->

* 返回：{Array} 服务器和客户端之间共享的签名算法列表，按偏好递减顺序排列。

参见 [SSL\_get\_shared\_sigalgs](https://www.openssl.org/docs/man1.1.1/man3/SSL_get_shared_sigalgs.html) 获取更多信息。

### `tlsSocket.getTLSTicket()`

<!-- YAML
added: v0.11.4
-->

* 类型：{Buffer}

For clients, returns the TLS session ticket if available, otherwise returns `undefined`. For servers, always returns `undefined`.

It may be used for debugging.

See [session resumption][] for more information.

### `tlsSocket.getX509Certificate()`

<!-- YAML
added: v15.9.0
-->

* 返回：{X509Certificate}

返回本地证书作为 {X509Certificate} 对象。

如果没有本地证书，或者 socket 已被销毁，将返回 `undefined`。

### `tlsSocket.isSessionReused()`

<!-- YAML
added: v0.5.6
-->

* 返回：{boolean} 如果会话被重用则为 `true`，否则为 `false`。

参见 [会话恢复][] 获取更多信息。

### `tlsSocket.localAddress`

<!-- YAML
added: v0.11.4
-->

* 类型：{string}

返回本地 IP 地址的字符串表示。

### `tlsSocket.localPort`

<!-- YAML
added: v0.11.4
-->

* 类型：{integer}

返回本地端口的数字表示。

### `tlsSocket.remoteAddress`

<!-- YAML
added: v0.11.4
-->

* 类型：{string}

返回远程 IP 地址的字符串表示。例如，`'74.125.127.100'` 或 `'2001:4860:a005::68'`。

### `tlsSocket.remoteFamily`

<!-- YAML
added: v0.11.4
-->

* 类型：{string}

返回远程 IP 家族的字符串表示。`'IPv4'` 或 `'IPv6'`。

### `tlsSocket.remotePort`

<!-- YAML
added: v0.11.4
-->

* 类型：{integer}

返回远程端口的数字表示。例如，`443`。

### `tlsSocket.renegotiate(options, callback)`

<!-- YAML
added: v0.11.8
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在抛出 `ERR_INVALID_ARG_TYPE` 而不是`ERR_INVALID_CALLBACK`。"
-->

* `options` {Object}
  * `rejectUnauthorized` {boolean} 如果不为 `false`，则根据提供的 CA 列表验证服务器证书。如果验证失败则发出 `'error'` 事件；`err.code` 包含 OpenSSL 错误代码。**默认值：** `true`。
  * `requestCert`

* `callback` {Function} 如果 `renegotiate()` 返回 `true`，回调会附加到 [`'secure'`][] 事件。如果 `renegotiate()` 返回 `false`，`callback` 将在下一个 tick 中被调用并带有错误，除非 `tlsSocket` 已被销毁，在这种情况下 `callback` 将根本不会被调用。

* 返回：{boolean} 如果启动了重新协商则为 `true`，否则为 `false`。

`tlsSocket.renegotiate()` 方法启动 TLS 重新协商过程。完成后，`callback` 函数将传入单个参数，该参数是 `Error`（如果请求失败）或 `null`。

此方法可用于在建立安全连接后请求对等方的证书。

当作为服务器运行时，socket 将在 `handshakeTimeout` 超时后被销毁并报错。

对于 TLSv1.3，无法启动重新协商，协议不支持。

### `tlsSocket.setKeyCert(context)`

<!-- YAML
added:
  - v22.5.0
  - v20.17.0
-->

* `context` {Object|tls.SecureContext} 一个对象，包含来自 [`tls.createSecureContext()`][] `options` 的至少 `key` 和 `cert` 属性，或使用 [`tls.createSecureContext()`][] 本身创建的 TLS 上下文对象。

`tlsSocket.setKeyCert()` 方法设置用于 socket 的私钥和证书。这主要有用，如果您希望从 TLS 服务器的 `ALPNCallback` 中选择服务器证书。

### `tlsSocket.setMaxSendFragment(size)`

<!-- YAML
added: v0.11.11
-->

* `size` {number} 最大 TLS 分片大小。最大值为 `16384`。**默认值：** `16384`。
* 返回：{boolean}

`tlsSocket.setMaxSendFragment()` 方法设置最大 TLS 分片大小。如果设置限制成功则返回 `true`；否则返回 `false`。

较小的分片大小减少客户端上的缓冲延迟：较大的分片由 TLS 层缓冲，直到收到整个分片并验证其完整性；较大的分片可以跨越多个往返，并且由于数据包丢失或重新排序，它们的处理可能会延迟。然而，较小的分片增加额外的 TLS 帧字节和 CPU 开销，这可能会降低整体服务器吞吐量。

## 证书验证回调

<!-- YAML
added: v0.8.4
changes:
  - version:
      - v17.3.1
      - v16.13.2
      - v14.18.3
      - v12.22.9
    pr-url: https://github.com/nodejs-private/node-private/pull/300
    description: "作为对 CVE-2021-44531 的响应，已禁用对 `uniformResourceIdentifier` 主体备用名称的支持。"
-->

* `hostname` {string} 用于验证证书的主机名或 IP 地址。
* `cert` {Object} 代表对等方证书的 [证书对象][]。
* 返回：{Error|undefined}

验证证书 `cert` 是否颁发给 `hostname`。

返回 {Error} 对象，失败时使用 `reason`、`host` 和 `cert` 填充它。成功时返回 {undefined}。

此函数旨在与可传递给 [`tls.connect()`][] 的 `checkServerIdentity` 选项结合使用，因此它在 [证书对象][] 上运行。出于其他目的，请考虑使用 [`x509.checkHost()`][]。

可以通过提供替代函数作为传递给 `tls.connect()` 的 `options.checkServerIdentity` 选项来覆盖此函数。覆盖函数当然可以调用 `tls.checkServerIdentity()`，以通过额外的验证来增强检查。

仅当证书通过所有其他检查（例如由受信任的 CA (`options.ca`) 颁发）时，才会调用此函数。

早期版本的 Node.js 错误地接受了给定 `hostname` 的证书，如果存在匹配的 `uniformResourceIdentifier` 主体备用名称（见 [CVE-2021-44531][]）。希望接受 `uniformResourceIdentifier` 主体备用名称的应用程序可以使用实现所需行为的自定义 `options.checkServerIdentity` 函数。

## 连接选项

<!-- YAML
added: v0.11.3
changes:
  - version:
      - v15.1.0
      - v14.18.0
    pr-url: https://github.com/nodejs/node/pull/35753
    description: "添加了 `onread` 选项。"
  - version:
      - v14.1.0
      - v13.14.0
    pr-url: https://github.com/nodejs/node/pull/32786
    description: "现在接受 `highWaterMark` 选项。"
  - version:
      - v13.6.0
      - v12.16.0
    pr-url: https://github.com/nodejs/node/pull/23188
    description: "现在支持 `pskCallback` 选项。"
  - version: v12.9.0
    pr-url: https://github.com/nodejs/node/pull/27836
    description: "支持 `allowHalfOpen` 选项。"
  - version: v12.4.0
    pr-url: https://github.com/nodejs/node/pull/27816
    description: "现在支持 `hints` 选项。"
  - version: v12.2.0
    pr-url: https://github.com/nodejs/node/pull/27497
    description: "现在支持 `enableTrace` 选项。"
  - version:
      - v11.8.0
      - v10.16.0
    pr-url: https://github.com/nodejs/node/pull/25517
    description: "现在支持 `timeout` 选项。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12839
    description: "现在支持 `lookup` 选项。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/11984
    description: "`ALPNProtocols` 选项现在可以是 `TypedArray` 或 `DataView`。"
  - version:
      - v5.3.0
      - v4.7.0
    pr-url: https://github.com/nodejs/node/pull/4246
    description: "现在支持 `secureContext` 选项。"
  - version: v5.0.0
    pr-url: https://github.com/nodejs/node/pull/2564
    description: 现在支持 ALPN 选项。
-->

* `options` {Object}
  * `enableTrace`：见 [`tls.createServer()`][]
  * `host` {string} 客户端应连接的主机。**默认:** `'localhost'`。
  * `port` {number} 客户端应连接的端口。
  * `path` {string} 创建到路径的 Unix 套接字连接。如果指定了此选项，`host` 和 `port` 将被忽略。
  * `socket` {stream.Duplex} 在给定的套接字上建立安全连接，而不是创建新套接字。通常，这是 [`net.Socket`][] 的实例，但允许任何 `Duplex` 流。
    如果指定了此选项，`path`、`host` 和 `port` 将被忽略，证书验证除外。通常，传递给 `tls.connect()` 时套接字已经连接，但也可以稍后连接。
    `socket` 的连接/断开/销毁由用户负责；调用 `tls.connect()` 不会导致调用 `net.connect()`。
  * `allowHalfOpen` {boolean} 如果设置为 `false`，则当可读端结束时，套接字将自动结束可写端。如果设置了 `socket` 选项，则此选项无效。详见 [`net.Socket`][] 的 `allowHalfOpen` 选项。**默认:** `false`。
  * `rejectUnauthorized` {boolean} 如果不为 `false`，则将根据提供的 CA 列表验证服务器证书。如果验证失败，将发出 `'error'` 事件；`err.code` 包含 OpenSSL 错误代码。**默认:** `true`。
  * `pskCallback` {Function} 对于 TLS-PSK 协商，见 [预共享密钥][]。
  * `ALPNProtocols` {string\[]|Buffer|TypedArray|DataView} 字符串数组，或包含支持的 ALPN 协议的单个 `Buffer`、`TypedArray` 或 `DataView`。缓冲区应具有格式 `[len][name][len][name]...`，例如 `'\x08http/1.1\x08http/1.0'`，其中 `len` 字节是下一个协议名称的长度。传递数组通常更简单，例如 `['http/1.1', 'http/1.0']`。列表中较早的协议比较后的协议具有更高的优先级。
  * `servername` {string} 用于 SNI (服务器名称指示) TLS 扩展的服务器名称。它是正在连接的主机的名称，必须是主机名，而不是 IP 地址。多宿主服务器可以使用它来选择要向客户端呈现的正确证书，见 [`tls.createServer()`][] 的 `SNICallback` 选项。
  * `checkServerIdentity(servername, cert)` {Function} 当根据证书检查服务器的主机名（或显式设置时提供的 `servername`）时使用的回调函数（代替内置的 `tls.checkServerIdentity()` 函数）。如果验证失败，这应返回一个 {Error}。如果 `servername` 和 `cert` 已验证，该方法应返回 `undefined`。
  * `session` {Buffer} `Buffer` 实例，包含 TLS 会话。
  * `requestOCSP` {boolean} 如果为 `true`，指定 OCSP 状态请求扩展将添加到客户端问候中，并且在建立安全通信之前将在套接字上发出 `'OCSPResponse'` 事件。
  * `minDHSize` {number} 接受 TLS 连接的 DH 参数的最小大小（位）。当服务器提供的 DH 参数大小小于 `minDHSize` 时，TLS 连接将被销毁并抛出错误。**默认:** `1024`。
  * `highWaterMark` {number} 与可读流 `highWaterMark` 参数一致。**默认:** `16 * 1024`。
  * `timeout`: {number} 如果设置且内部创建了套接字，将在套接字创建后但在开始连接之前调用 [`socket.setTimeout(timeout)`][]。
  * `secureContext`: 使用 [`tls.createSecureContext()`][] 创建的 TLS 上下文对象。如果_未_提供 `secureContext`，将通过将整个 `options` 对象传递给 `tls.createSecureContext()` 来创建一个。
  * `onread` {Object} 如果缺少 `socket` 选项，传入数据将存储在单个 `buffer` 中，并在数据到达套接字时传递给提供的 `callback`，否则该选项将被忽略。详见 [`net.Socket`][] 的 `onread` 选项。
  * ...：如果缺少 `secureContext` 选项则使用的 [`tls.createSecureContext()`][] 选项，否则它们将被忽略。
  * ...：任何未列出的 [`socket.connect()`][] 选项。
* `callback` {Function}
* 返回：{tls.TLSSocket}

如果指定了 `callback` 函数，它将作为 [`'secureConnect'`][] 事件的监听器添加。

`tls.connect()` 返回一个 [`tls.TLSSocket`][] 对象。

与 `https` API 不同，`tls.connect()` 默认不启用 SNI（服务器名称指示）扩展，这可能导致某些服务器返回错误的证书或完全拒绝连接。要启用 SNI，除了 `host` 外，还需设置 `servername` 选项。

以下说明了 [`tls.createServer()`][] 中回显服务器示例的客户端：

```mjs
// 假设有一个监听端口 8000 的回显服务器。
import { connect } from 'node:tls';
import { readFileSync } from 'node:fs';
import { stdin } from 'node:process';

const options = {
  // 仅当服务器需要客户端证书认证时才必要。
  key: readFileSync('client-key.pem'),
  cert: readFileSync('client-cert.pem'),

  // 仅当服务器使用自签名证书时才必要。
  ca: [ readFileSync('server-cert.pem') ],

  // 仅当服务器的证书不是用于 "localhost" 时才必要。
  checkServerIdentity: () => { return null; },
};

const socket = connect(8000, options, () => {
  console.log('client connected',
              socket.authorized ? 'authorized' : 'unauthorized');
  stdin.pipe(socket);
  stdin.resume();
});
socket.setEncoding('utf8');
socket.on('data', (data) => {
  console.log(data);
});
socket.on('end', () => {
  console.log('server ends connection');
});
```

```cjs
// 假设有一个监听端口 8000 的回显服务器。
const { connect } = require('node:tls');
const { readFileSync } = require('node:fs');

const options = {
  // 仅当服务器需要客户端证书认证时才必要。
  key: readFileSync('client-key.pem'),
  cert: readFileSync('client-cert.pem'),

  // 仅当服务器使用自签名证书时才必要。
  ca: [ readFileSync('server-cert.pem') ],

  // 仅当服务器的证书不是用于 "localhost" 时才必要。
  checkServerIdentity: () => { return null; },
};

const socket = connect(8000, options, () => {
  console.log('client connected',
              socket.authorized ? 'authorized' : 'unauthorized');
  process.stdin.pipe(socket);
  process.stdin.resume();
});
socket.setEncoding('utf8');
socket.on('data', (data) => {
  console.log(data);
});
socket.on('end', () => {
  console.log('server ends connection');
});
```

要生成此示例的证书和密钥，请运行：

```bash
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
  -keyout client-key.pem -out client-cert.pem
```

然后，要生成此示例的 `server-cert.pem` 证书，请运行：

```bash
openssl pkcs12 -certpbe AES-256-CBC -export -out server-cert.pem \
  -inkey client-key.pem -in client-cert.pem
```

## `tls.connect(path[, options][, callback])`

<!-- YAML
added: v0.11.3
-->

* `path` {string} `options.path` 的默认值。
* `options` {Object} 参见 [`tls.connect()`][]。
* `callback` {Function} 参见 [`tls.connect()`][]。
* 返回：{tls.TLSSocket}

与 [`tls.connect()`][] 相同，只不过 `path` 可以作为参数提供，而不是作为选项。

如果指定了 path 选项，它将优先于 path 参数。

## `tls.connect(port[, host][, options][, callback])`

<!-- YAML
added: v0.11.3
-->

* `port` {number} `options.port` 的默认值。
* `host` {string} `options.host` 的默认值。
* `options` {Object} 参见 [`tls.connect()`][]。
* `callback` {Function} 参见 [`tls.connect()`][]。
* 返回：{tls.TLSSocket}

与 [`tls.connect()`][] 相同，只不过 `port` 和 `host` 可以作为参数提供，而不是作为选项。

如果指定了 port 或 host 选项，它将优先于任何 port 或 host 参数。

## `tls.createSecureContext([options])`

<!-- YAML
added: v0.11.13
changes:
  - version: REPLACEME
    pr-url: https://github.com/nodejs/node/pull/63966
    description: "`clientCertEngine`、`privateKeyEngine` 和 `privateKeyIdentifier` 选项已在运行时弃用。"
  - version: v26.4.0
    pr-url: https://github.com/nodejs/node/pull/62217
    description: 已添加 `certificateCompression` 选项。
  - version:
    - v22.9.0
    - v20.18.0
    pr-url: https://github.com/nodejs/node/pull/54790
    description: "添加了 `allowPartialTrustChain` 选项。"
  - version:
    - v22.4.0
    - v20.16.0
    pr-url: https://github.com/nodejs/node/pull/53329
    description: "`clientCertEngine`、`privateKeyEngine` 和 `privateKeyIdentifier` 选项依赖于 OpenSSL 中的自定义引擎支持，而该支持在 OpenSSL 3 中已废弃。"
  - version:
    - v19.8.0
    - v18.16.0
    pr-url: https://github.com/nodejs/node/pull/46978
    description: "`dhparam` 选项现在可以设置为 `'auto'`，以启用具有适当知名参数的 DHE。"
  - version: v12.12.0
    pr-url: https://github.com/nodejs/node/pull/28973
    description: "添加了 `privateKeyIdentifier` 和 `privateKeyEngine` 选项以从 OpenSSL 引擎获取私钥。"
  - version: v12.11.0
    pr-url: https://github.com/nodejs/node/pull/29598
    description: "添加了 `sigalgs` 选项以覆盖支持的签名算法。"
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/26209
    description: 添加了 TLSv1.3 支持。
  - version: v11.5.0
    pr-url: https://github.com/nodejs/node/pull/24733
    description: "`ca:` 选项现在支持 `BEGIN TRUSTED CERTIFICATE`。"
  - version:
     - v11.4.0
     - v10.16.0
    pr-url: https://github.com/nodejs/node/pull/24405
    description: "`minVersion` 和 `maxVersion` 可用于限制允许的 TLS 协议版本。"
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/19794
    description: "由于 OpenSSL 的变更，`ecdhCurve` 不再能设置为 `false`。"
  - version: v9.3.0
    pr-url: https://github.com/nodejs/node/pull/14903
    description: "`options` 参数现在可以包含 `clientCertEngine`。"
  - version: v9.0.0
    pr-url: https://github.com/nodejs/node/pull/15206
    description: "`ecdhCurve` 选项现在可以是多个由 `':'` 分隔的曲线名称或 `'auto'`。"
  - version: v7.3.0
    pr-url: https://github.com/nodejs/node/pull/10294
    description: "如果 `key` 选项是一个数组，单个条目不再需要 `passphrase` 属性。`Array` 条目现在也可以只是 `string` 或 `Buffer`。"
  - version: v5.2.0
    pr-url: https://github.com/nodejs/node/pull/4099
    description: "`ca` 选项现在可以是包含多个 CA 证书的单个字符串。"
-->

* `options` {Object}
  * `allowPartialTrustChain` {boolean} 将信任 CA 证书列表中的中间（非自签名）证书视为受信任。
  * `ca` {string|string\[]|Buffer|Buffer\[]} 可选地覆盖受信任的 CA 证书。如果未指定，默认受信任的 CA 证书与使用 [`tls.getCACertificates()`][] 的 `default` 类型返回的证书相同。若指定，默认列表将被 `ca` 选项中的证书完全替换（而不是拼接）。如果用户希望添加额外证书而不是完全覆盖默认值，则需要手动拼接。
    该值可以是一个字符串或 `Buffer`，也可以是字符串和/或 `Buffer` 的 `Array`。任何字符串或 `Buffer` 都可以包含多个拼接在一起的 PEM CA。对等方的证书必须能够链到服务器信任的 CA，连接才能被认证。使用无法链到知名 CA 的证书时，必须显式指定该证书的 CA 为受信任，否则连接将无法完成认证。
    如果对等方使用的证书与默认 CA 不匹配或无法链到默认 CA，请使用 `ca` 选项提供一个对等方证书可以匹配或链到的 CA 证书。
    对于自签名证书，证书本身就是它自己的 CA，必须提供。
    对于 PEM 编码的证书，支持的类型有 "TRUSTED CERTIFICATE"、"X509 CERTIFICATE" 和 "CERTIFICATE"。
  * `cert` {string|string\[]|Buffer|Buffer\[]} PEM 格式的证书链。每个私钥应提供一条证书链。每条证书链应由为所提供私有 `key` 准备的 PEM 格式证书开始，随后按顺序跟随 PEM 格式的中间证书（如果有），且不包括根 CA（根 CA 必须对对等方预先已知，见 `ca`）。当提供多条证书链时，它们不必与 `key` 中私钥的顺序一致。如果未提供中间证书，对等方将无法验证证书，握手将失败。
  * `certificateCompression` {string\[]} 按优先顺序排列的受支持证书压缩算法名称数组。支持的值为 `'zlib'`、`'brotli'` 和 `'zstd'`。设置后，将启用 TLS 证书压缩（[RFC 8879][]），在 TLS 握手期间压缩证书，减小握手大小。仅在 TLSv1.3 中有效。
    **默认值:** `[]`（禁用）。
  * `sigalgs` {string} 以冒号分隔的受支持签名算法列表。该列表可以包含摘要算法（`SHA256`、`MD5` 等）、公钥算法（`RSA-PSS`、`ECDSA` 等）、二者组合（例如 `'RSA+SHA384'`）或 TLS v1.3 方案名称（例如 `rsa_pss_pss_sha512`）。
    详情参见 [OpenSSL 手册页](https://www.openssl.org/docs/man1.1.1/man3/SSL_CTX_set1_sigalgs_list.html)。
  * `ciphers` {string} 密码套件规范，用于替换默认值。更多信息请参见 [修改默认 TLS 密码套件][]。可接受的密码套件可通过 [`tls.getCiphers()`][] 获取。为了让 OpenSSL 接受，密码名称必须大写。
  * `clientCertEngine` {string} 可提供客户端证书的 OpenSSL 引擎名称。**已弃用。**
  * `crl` {string|string\[]|Buffer|Buffer\[]} PEM 格式的 CRL（证书吊销列表）。
  * `dhparam` {string|Buffer} `'auto'` 或自定义 Diffie-Hellman 参数，非 ECDHE [前向保密][] 需要它。如果省略或无效，这些参数会被静默丢弃，DHE 密码将不可用。[ECDHE][] 基于的 [前向保密][] 仍然可用。
  * `ecdhCurve` {string} 描述命名曲线、TLS 组，或用于密钥协商的由冒号分隔的命名曲线/TLS 组列表的字符串，例如 `P-521:P-384:P-256`、`X25519` 或 `X25519MLKEM768`。此选项的历史名称指的是 TLSv1.2 及以下版本中的 ECDH 密钥协商。在 TLSv1.3 中，此选项用于配置 TLS 栈提供或接受的 TLS Supported Groups 和 key share 组。设为 `auto` 可自动选择组。使用 [`crypto.getCurves()`][] 获取可用椭圆曲线名称列表。对于 TLS 组名称，请使用 `openssl list -tls-groups` 或查阅 [IANA TLS Supported Groups 注册表][]。
    **默认值:** [`tls.DEFAULT_ECDH_CURVE`][]。
  * `honorCipherOrder` {boolean} 尝试使用服务器的密码套件偏好，而不是客户端的。为 `true` 时，会在 `secureOptions` 中设置 `SSL_OP_CIPHER_SERVER_PREFERENCE`，更多信息见 [OpenSSL Options][]。
  * `key` {string|string\[]|Buffer|Buffer\[]|Object\[]} PEM 格式的私钥。PEM 允许私钥加密。加密的密钥将使用 `options.passphrase` 解密。可以提供多个使用不同算法的密钥，形式可以是未加密密钥字符串或缓冲区数组，也可以是对象数组，格式为 `{pem: <string|buffer>[, passphrase: <string>]}`。对象形式只能出现在数组中。`object.passphrase` 是可选的。如果提供，加密密钥将使用 `object.passphrase` 解密；否则使用 `options.passphrase`。
  * `privateKeyEngine` {string} 用于获取私钥的 OpenSSL 引擎名称。应与 `privateKeyIdentifier` 一起使用。**已弃用。**
  * `privateKeyIdentifier` {string} 由 OpenSSL 引擎管理的私钥标识符。应与 `privateKeyEngine` 一起使用。
    不应与 `key` 一起设置，因为这两个选项以不同方式定义私钥。**已弃用。**
  * `maxVersion` {string} 可选地设置允许的最大 TLS 版本。可选值为 `'TLSv1.3'`、`'TLSv1.2'`、`'TLSv1.1'` 或 `'TLSv1'`。不能与 `secureProtocol` 选项同时指定；二者选其一。
    **默认值:** [`tls.DEFAULT_MAX_VERSION`][]。
  * `minVersion` {string} 可选地设置允许的最小 TLS 版本。可选值为 `'TLSv1.3'`、`'TLSv1.2'`、`'TLSv1.1'` 或 `'TLSv1'`。不能与 `secureProtocol` 选项同时指定；二者选其一。避免设置为低于 TLSv1.2，但在互操作性要求下可能需要。TLSv1.2 之前的版本可能需要降低 [OpenSSL 安全级别][]。
    **默认值:** [`tls.DEFAULT_MIN_VERSION`][]。
  * `passphrase` {string} 用于单个私钥和/或 PFX 的共享密码短语。
  * `pfx` {string|string\[]|Buffer|Buffer\[]|Object\[]} PFX 或 PKCS12 编码的私钥和证书链。`pfx` 是分别提供 `key` 和 `cert` 的替代方案。PFX 通常是加密的，如果是加密的，将使用 `passphrase` 解密它。可以提供多个 PFX，形式可以是未加密 PFX 缓冲区数组，也可以是对象数组，格式为 `{buf: <string|buffer>[, passphrase: <string>]}`。对象形式只能出现在数组中。`object.passphrase` 是可选的。如果提供，加密 PFX 将使用 `object.passphrase` 解密；否则使用 `options.passphrase`。
  * `secureOptions` {number} 可选地影响 OpenSSL 协议行为，通常并非必要。如果要使用，应谨慎！
    该值是来自 [OpenSSL Options][] 的 `SSL_OP_*` 选项的数值位掩码。
  * `secureProtocol` {string} 选择要使用的 TLS 协议版本的旧机制，它不支持独立控制最小和最大版本，也不支持将协议限制为 TLSv1.3。请改用 `minVersion` 和 `maxVersion`。可选值列于 [SSL\_METHODS][SSL_METHODS]，请将函数名作为字符串使用。例如，使用 `'TLSv1_1_method'` 强制使用 TLS 1.1，或使用 `'TLS_method'` 允许直到 TLSv1.3 的任何 TLS 协议版本。不建议使用低于 1.2 的 TLS 版本，但在互操作性要求下可能需要。
    **默认值:** 无，见 `minVersion`。
  * `sessionIdContext` {string} 由服务器使用的透明标识符，用于确保会话状态不会在应用之间共享。客户端不使用。
  * `ticketKeys` {Buffer} 48 字节的加密强伪随机数据。更多信息请参见 [会话恢复][]。
  * `sessionTimeout` {number} 由服务器创建的 TLS 会话在经过多少秒后将不再可恢复。更多信息请参见 [会话恢复][]。**默认值:** `300`。

[`tls.createServer()`][] 将 `honorCipherOrder` 选项的默认值设置为 `true`，其他创建安全上下文的 API 则不设置。

[`tls.createServer()`][] 使用从 `process.argv` 生成的 128 位截断 SHA1 哈希值作为 `sessionIdContext` 选项的默认值，其他创建安全上下文的 API 没有默认值。

`tls.createSecureContext()` 方法创建一个 `SecureContext` 对象。它可用作多个 `tls` API 的参数，例如 [`server.addContext()`][]，但没有公共方法。[`tls.Server`][] 构造函数和 [`tls.createServer()`][] 方法不支持 `secureContext` 选项。

使用证书的密码 _需要_ 密钥。可以使用 `key` 或 `pfx` 来提供它。

如果未给出 `ca` 选项，则 Node.js 将默认使用 [Mozilla 公开信任的 CA 列表][]。

不鼓励使用自定义 DHE 参数，而是使用新的 `dhparam: 'auto'` 选项。当设置为 `'auto'` 时，将自动选择具有足够强度的知名 DHE 参数。否则，如有必要，可以使用 `openssl dhparam` 创建自定义参数。密钥长度必须大于或等于 1024 位，否则将抛出错误。虽然 1024 位是允许的，但为了更强的安全性，请使用 2048 位或更大。

## `tls.createServer([options][, secureConnectionListener])`

<!-- YAML
added: v0.3.2
changes:
  - version: REPLACEME
    pr-url: https://github.com/nodejs/node/pull/63966
    description: "`clientCertEngine` 选项已在运行时弃用。"
  - version:
    - v22.4.0
    - v20.16.0
    pr-url: https://github.com/nodejs/node/pull/53329
    description: "`clientCertEngine` 选项依赖于 OpenSSL 中的自定义引擎支持，该支持在 OpenSSL 3 中已弃用。"
  - version:
    - v20.4.0
    - v18.19.0
    pr-url: https://github.com/nodejs/node/pull/45190
    description: "`options` 参数现在可以包含 `ALPNCallback`。"
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44031
    description: "如果设置了 `ALPNProtocols`，发送不含支持协议的ALPN 扩展的传入连接将被终止，并返回致命的 `no_application_protocol` 警报。"
  - version: v12.3.0
    pr-url: https://github.com/nodejs/node/pull/27665
    description: "`options` 参数现在支持 `net.createServer()` 选项。"
  - version: v9.3.0
    pr-url: https://github.com/nodejs/node/pull/14903
    description: "`options` 参数现在可以包含 `clientCertEngine`。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/11984
    description: "`ALPNProtocols` 选项现在可以是 `TypedArray` 或`DataView`。"
  - version: v5.0.0
    pr-url: https://github.com/nodejs/node/pull/2564
    description: 现在支持 ALPN 选项。
-->

* `options` {Object}
  * `ALPNProtocols` {string\[]|Buffer|TypedArray|DataView} 字符串数组，
    或单个 `Buffer`、`TypedArray` 或 `DataView`，包含支持的
    ALPN 协议。Buffer 的格式应为 `[len][name][len][name]...`，
    例如 `0x05hello0x05world`，其中第一个字节是下一个
    协议名称的长度。传递数组通常更简单，例如
    `['hello', 'world']`。（协议应按其优先级排序。）
  * `ALPNCallback` {Function} 如果设置，当客户端使用 ALPN 扩展打开连接时将调用此函数。
    一个参数将被传递给回调：一个包含 `servername` 和
    `protocols` 字段的对象，分别包含来自
    SNI 扩展的服务器名称（如果有）和 ALPN 协议名称字符串数组。
    回调必须返回 `protocols` 中列出的字符串之一，该字符串将作为选定的
    ALPN 协议返回给客户端，或者返回 `undefined` 以拒绝连接并发出致命警报。
    如果返回的字符串与客户端的 ALPN
    协议之一不匹配，将抛出错误。此选项不能与
    `ALPNProtocols` 选项一起使用，同时设置这两个选项将抛出错误。
  * `clientCertEngine` {string} 可提供客户端证书的 OpenSSL 引擎名称。**已弃用。**
  * `enableTrace` {boolean} 如果为 `true`，将在新连接上调用 [`tls.TLSSocket.enableTrace()`][]。
    可以在安全连接建立后启用跟踪，但必须使用此选项来跟踪安全
    连接设置。**默认：** `false`。
  * `handshakeTimeout` {number} 如果 SSL/TLS 握手
    未在指定的毫秒数内完成，则中止连接。
    每当握手超时时，`tls.Server` 对象上都会发出
    `'tlsClientError'`。**默认：** `120000`（120 秒）。
  * `rejectUnauthorized` {boolean} 如果不为 `false`，服务器将拒绝任何
    未使用提供的 CA 列表授权的任何连接。此
    选项仅在 `requestCert` 为 `true` 时有效。**默认：** `true`。
  * `requestCert` {boolean} 如果为 `true`，服务器将请求来自
    连接的客户端的证书并尝试验证该证书。**默认：**
    `false`。
  * `sessionTimeout` {number} 服务器创建的 TLS 会话
    不再可恢复之前的秒数。有关更多信息，请参阅
    [会话恢复][]。**默认：** `300`。
  * `SNICallback(servername, callback)` {Function} 如果客户端支持 SNI TLS 扩展，将调用此函数。
    调用时将传递两个参数：`servername` 和 `callback`。`callback` 是一个
    错误优先的回调，接受两个可选参数：`error` 和 `ctx`。
    如果提供了 `ctx`，它是一个 `SecureContext` 实例。
    [`tls.createSecureContext()`][] 可用于获取适当的 `SecureContext`。
    如果用假值 `ctx` 参数调用 `callback`，将使用服务器的默认安全
    上下文。如果未提供 `SNICallback`，将使用带有高级 API 的默认
    回调（见下文）。
  * `ticketKeys` {Buffer} 48 字节的加密强伪随机
    数据。有关更多信息，请参阅 [会话恢复][]。
  * `pskCallback` {Function} 对于 TLS-PSK 协商，请参阅 [预共享密钥][]。
  * `pskIdentityHint` {string} 可选提示，发送给客户端以帮助
    在 TLS-PSK 协商期间选择身份。在
    TLS 1.3 中将被忽略。如果设置 pskIdentityHint 失败，将发出
    `'tlsClientError'`，代码为 `'ERR_TLS_PSK_SET_IDENTITY_HINT_FAILED'`。
  * ...: 可以提供任何 [`tls.createSecureContext()`][] 选项。对于
    服务器，通常需要身份选项（`pfx`、`key`/`cert` 或 `pskCallback`）。
  * ...: 可以提供任何 [`net.createServer()`][] 选项。
* `secureConnectionListener` {Function}
* 返回：{tls.Server}

创建一个新的 [`tls.Server`][]。如果提供了 `secureConnectionListener`，它
会自动设置为 [`'secureConnection'`][] 事件的监听器。

`ticketKeys` 选项会在 `node:cluster` 模块
工作线程之间自动共享。

以下说明了一个简单的回显服务器：

```mjs
import { createServer } from 'node:tls';
import { readFileSync } from 'node:fs';

const options = {
  key: readFileSync('server-key.pem'),
  cert: readFileSync('server-cert.pem'),

  // 仅在使用客户端证书认证时才需要此项。
  requestCert: true,

  // 仅当客户端使用自签名证书时才需要此项。
  ca: [ readFileSync('client-cert.pem') ],
};

const server = createServer(options, (socket) => {
  console.log('server connected',
              socket.authorized ? 'authorized' : 'unauthorized');
  socket.write('welcome!\n');
  socket.setEncoding('utf8');
  socket.pipe(socket);
});
server.listen(8000, () => {
  console.log('server bound');
});
```

```cjs
const { createServer } = require('node:tls');
const { readFileSync } = require('node:fs');

const options = {
  key: readFileSync('server-key.pem'),
  cert: readFileSync('server-cert.pem'),

  // 仅在使用客户端证书认证时才需要此项。
  requestCert: true,

  // 仅当客户端使用自签名证书时才需要此项。
  ca: [ readFileSync('client-cert.pem') ],
};

const server = createServer(options, (socket) => {
  console.log('server connected',
              socket.authorized ? 'authorized' : 'unauthorized');
  socket.write('welcome!\n');
  socket.setEncoding('utf8');
  socket.pipe(socket);
});
server.listen(8000, () => {
  console.log('server bound');
});
```

要为生成此示例的证书和密钥，运行：

```bash
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
  -keyout server-key.pem -out server-cert.pem
```

然后，要为此示例生成 `client-cert.pem` 证书，运行：

```bash
openssl pkcs12 -certpbe AES-256-CBC -export -out client-cert.pem \
  -inkey server-key.pem -in server-cert.pem
```

可以使用来自 [`tls.connect()`][] 的示例客户端连接到此服务器来进行测试。

## `tls.setDefaultCACertificates(certs)`

<!-- YAML
added:
 - v24.5.0
 - v22.19.0
-->

* `certs` {string\[]|ArrayBufferView\[]} PEM 格式的 CA 证书数组。

设置 Node.js TLS 客户端使用的默认 CA 证书。如果提供的
证书解析成功，它们将成为 [`tls.getCACertificates()`][] 返回的默认 CA
证书列表，并由后续未指定自己 CA 证书的 TLS 连接使用。
在设置为默认值之前，证书将被去重。

此函数仅影响当前 Node.js 线程。HTTPS 代理缓存的先前
会话不会受此更改影响，因此
应在进行任何不需要的可缓存 TLS 连接之前调用此方法。

要将系统 CA 证书用作默认值：

```cjs
const tls = require('node:tls');
tls.setDefaultCACertificates(tls.getCACertificates('system'));
```

```mjs
import tls from 'node:tls';
tls.setDefaultCACertificates(tls.getCACertificates('system'));
```

此函数会完全替换默认的 CA 证书列表。若要将其他
证书添加到现有默认值中，请获取当前证书并追加它们：

```cjs
const tls = require('node:tls');
const currentCerts = tls.getCACertificates('default');
const additionalCerts = ['-----BEGIN CERTIFICATE-----\n...'];
tls.setDefaultCACertificates([...currentCerts, ...additionalCerts]);
```

```mjs
import tls from 'node:tls';
const currentCerts = tls.getCACertificates('default');
const additionalCerts = ['-----BEGIN CERTIFICATE-----\n...'];
tls.setDefaultCACertificates([...currentCerts, ...additionalCerts]);
```

## `tls.getCACertificates([type])`

<!-- YAML
added:
  - v23.10.0
  - v22.15.0
-->

* `type` {string|undefined} 要返回的 CA 证书类型。有效值
  为 `"default"`、`"system"`、`"bundled"` 和 `"extra"`。
  **默认：** `"default"`。
* 返回：{string\[]} PEM 编码证书数组。如果同一证书在多个来源中重复存储，数组可能包含重复项。

返回一个包含来自各种来源的 CA 证书的数组，具体取决于 `type`：

* `"default"`：返回 Node.js TLS 客户端默认使用的 CA 证书。
  * 当启用 [`--use-bundled-ca`][]（默认）或未启用 [`--use-openssl-ca`][] 时，
    这将包括来自捆绑的 Mozilla CA 存储的 CA 证书。
  * 当启用 [`--use-system-ca`][] 时，这还将包括来自系统
    信任存储的证书。
  * 当使用 [`NODE_EXTRA_CA_CERTS`][] 时，这还将包括从指定
    文件加载的证书。
* `"system"`：返回根据 [`--use-system-ca`][] 设置的规则从系统信任存储加载的 CA 证书。
  当未启用 [`--use-system-ca`][] 时，这可用于获取系统证书。
* `"bundled"`：返回来自捆绑的 Mozilla CA 存储的 CA 证书。这与
  [`tls.rootCertificates`][] 相同。
* `"extra"`：返回从 [`NODE_EXTRA_CA_CERTS`][] 加载的 CA 证书。如果
  未设置 [`NODE_EXTRA_CA_CERTS`][]，则为空数组。

## `tls.getCiphers()`

<!-- YAML
added: v0.10.2
-->

* 返回值：{string\[]}

返回一个数组，包含支持的 TLS 加密套件的名称。出于历史原因，这些名称是小写的，但在 [`tls.createSecureContext()`][] 的 `ciphers` 选项中使用时必须大写。

并非所有支持的加密套件默认都是启用的。请参阅 [修改默认 TLS 加密套件][]。

以 `'tls_'` 开头的加密套件名称用于 TLSv1.3，所有其他名称用于 TLSv1.2 及以下版本。

```js
console.log(tls.getCiphers()); // ['aes128-gcm-sha256', 'aes128-sha', ...]
```

## `tls.getCertificateCompressionAlgorithms()`

<!-- YAML
added: v26.4.0
-->

* 返回：{string\[]}

返回一个数组，其中包含当前 OpenSSL 构建支持的 RFC 8879 证书压缩算法名称，适用于 [`tls.createSecureContext()`][] 的 `certificateCompression` 选项。可能的值包括 `'zlib'`、`'brotli'` 和 `'zstd'`。

当证书压缩不可用时，该数组为空。

```js
console.log(tls.getCertificateCompressionAlgorithms()); // ['zlib', 'brotli', 'zstd']
```

## `tls.rootCertificates`

<!-- YAML
added: v12.3.0
-->

* 类型：{string\[]}

一个不可变的字符串数组，表示当前 Node.js 版本提供的捆绑 Mozilla CA 存储中的根证书（PEM 格式）。

Node.js 提供的捆绑 CA 存储是发布时固定的 Mozilla CA 存储的快照。它在所有支持的平台上都是相同的。

要获取当前 Node.js 实例实际使用的 CA 证书（可能包括从系统存储加载的证书（如果使用了 `--use-system-ca`）或从 `NODE_EXTRA_CA_CERTS` 指示的文件加载的证书），请使用 [`tls.getCACertificates()`][].

## `tls.DEFAULT_ECDH_CURVE`

<!-- YAML
added: v0.11.13
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/16853
    description: "默认值更改为 `'auto'`。"
-->

用于在 TLS 服务器中进行密钥协商的默认命名曲线或 TLS 组列表。默认值为 `'auto'`。有关更多信息，请参阅 [`tls.createSecureContext()`][]。

## `tls.DEFAULT_MAX_VERSION`

<!-- YAML
added: v11.4.0
-->

* 类型：{string} [`tls.createSecureContext()`][] 的 `maxVersion` 选项的默认值。它可以被赋值为任何支持的 TLS 协议版本，`'TLSv1.3'`、`'TLSv1.2'`、`'TLSv1.1'` 或 `'TLSv1'`。
  **默认值：** `'TLSv1.3'`，除非使用 CLI 选项更改。使用 `--tls-max-v1.2` 将默认值设置为 `'TLSv1.2'`。使用 `--tls-max-v1.3` 将默认值设置为 `'TLSv1.3'`。如果提供了多个选项，则使用最高的最大值。

## `tls.DEFAULT_MIN_VERSION`

<!-- YAML
added: v11.4.0
-->

* 类型：{string} [`tls.createSecureContext()`][] 的 `minVersion` 选项的默认值。它可以被赋值为任何支持的 TLS 协议版本，`'TLSv1.3'`、`'TLSv1.2'`、`'TLSv1.1'` 或 `'TLSv1'`。
  TLSv1.2 之前的版本可能需要降低 [OpenSSL 安全级别][]。
  **默认值：** `'TLSv1.2'`，除非使用 CLI 选项更改。使用 `--tls-min-v1.0` 将默认值设置为 `'TLSv1'`。使用 `--tls-min-v1.1` 将默认值设置为 `'TLSv1.1'`。使用 `--tls-min-v1.3` 将默认值设置为 `'TLSv1.3'`。如果提供了多个选项，则使用最低的最低值。

## `tls.DEFAULT_CIPHERS`

<!-- YAML
added: v0.11.3
-->

* 类型：{string} [`tls.createSecureContext()`][] 的 `ciphers` 选项的默认值。它可以被赋值为任何支持的 OpenSSL 加密套件。默认为 `crypto.constants.defaultCoreCipherList` 的内容，除非使用 `--tls-default-ciphers` CLI 选项更改。

[CVE-2021-44531]: https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-44531
[Chrome 的“现代加密”设置]: https://www.chromium.org/Home/chromium-security/education/tls#TOC-Cipher-Suites
[DHE]: https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange
[ECDHE]: https://en.wikipedia.org/wiki/Elliptic_curve_Diffie%E2%80%93Hellman
[IANA TLS Supported Groups registry]: https://www.iana.org/assignments/tls-parameters/tls-parameters.xhtml#tls-parameters-8
[Modifying the default TLS cipher suite]: #modifying-the-default-tls-cipher-suite
[Mozilla's publicly trusted list of CAs]: https://hg.mozilla.org/mozilla-central/raw-file/tip/security/nss/lib/ckfw/builtins/certdata.txt
[OCSP request]: https://en.wikipedia.org/wiki/OCSP_stapling
[OpenSSL Options]: crypto.md#openssl-options
[OpenSSL Security Level]: #openssl-security-level
[OpenSSL documentation on security levels]: https://www.openssl.org/docs/manmaster/man3/SSL_CTX_set_security_level.html#DEFAULT-CALLBACK-BEHAVIOUR
[Pre-shared keys]: #pre-shared-keys
[RFC 2246]: https://www.ietf.org/rfc/rfc2246.txt
[RFC 4086]: https://tools.ietf.org/html/rfc4086
[RFC 4279]: https://tools.ietf.org/html/rfc4279
[RFC 5077]: https://tools.ietf.org/html/rfc5077
[RFC 5929]: https://tools.ietf.org/html/rfc5929
[RFC 8879]: https://tools.ietf.org/html/rfc8879
[SSL_METHODS]: https://www.openssl.org/docs/man1.1.1/man7/ssl.html#Dealing-with-Protocol-Methods
[会话恢复]: #session-resumption
[流]: stream.md#stream
[TLS 建议]: https://wiki.mozilla.org/Security/Server_Side_TLS
[`'newSession'`]: #event-newsession
[`'resumeSession'`]: #event-resumesession
[`'secure'`]: #event-secure
[`'secureConnect'`]: #event-secureconnect
[`'secureConnection'`]: #event-secureconnection
[`'session'`]: #event-session
[`--tls-cipher-list`]: cli.md#--tls-cipher-listlist
[`--use-bundled-ca`]: cli.md#--use-bundled-ca---use-openssl-ca
[`--use-openssl-ca`]: cli.md#--use-bundled-ca---use-openssl-ca
[`--use-system-ca`]: cli.md#--use-system-ca
[`Duplex`]: stream.md#class-streamduplex
[`NODE_EXTRA_CA_CERTS`]: cli.md#node_extra_ca_certsfile
[`NODE_OPTIONS`]: cli.md#node_optionsoptions
[`SSL_export_keying_material`]: https://www.openssl.org/docs/man1.1.1/man3/SSL_export_keying_material.html
[`SSL_get_version`]: https://www.openssl.org/docs/man1.1.1/man3/SSL_get_version.html
[`crypto.getCurves()`]: crypto.md#cryptogetcurves
[`import()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import
[`net.Server.address()`]: net.md#serveraddress
[`net.Server`]: net.md#class-netserver
[`net.Socket`]: net.md#class-netsocket
[`net.createServer()`]: net.md#netcreateserveroptions-connectionlistener
[`server.addContext()`]: #serveraddcontexthostname-context
[`server.getTicketKeys()`]: #servergetticketkeys
[`server.listen()`]: net.md#serverlisten
[`server.setTicketKeys()`]: #serversetticketkeyskeys
[`socket.connect()`]: net.md#socketconnectoptions-connectlistener
[`socket.setTimeout(timeout)`]: net.md#socketsettimeouttimeout-callback
[`tls.DEFAULT_ECDH_CURVE`]: #tlsdefault_ecdh_curve
[`tls.DEFAULT_MAX_VERSION`]: #tlsdefault_max_version
[`tls.DEFAULT_MIN_VERSION`]: #tlsdefault_min_version
[`tls.Server`]: #class-tlsserver
[`tls.TLSSocket.enableTrace()`]: #tlssocketenabletrace
[`tls.TLSSocket.getPeerCertificate()`]: #tlssocketgetpeercertificatedetailed
[`tls.TLSSocket.getProtocol()`]: #tlssocketgetprotocol
[`tls.TLSSocket.getSession()`]: #tlssocketgetsession
[`tls.TLSSocket.getTLSTicket()`]: #tlssocketgettlsticket
[`tls.TLSSocket`]: #class-tlstlssocket
[`tls.connect()`]: #tlsconnectoptions-callback
[`tls.createSecureContext()`]: #tlscreatesecurecontextoptions
[`tls.createServer()`]: #tlscreateserveroptions-secureconnectionlistener
[`tls.getCACertificates()`]: #tlsgetcacertificatestype
[`tls.getCiphers()`]: #tlsgetciphers
[`tls.rootCertificates`]: #tlsrootcertificates
[`x509.checkHost()`]: crypto.md#x509checkhostname-options
[asn1.js]: https://www.npmjs.com/package/asn1.js
[证书对象]: #certificate-object
[加密套件列表格式]: https://www.openssl.org/docs/man1.1.1/man1/ciphers.html#CIPHER-LIST-FORMAT
[前向保密]: https://en.wikipedia.org/wiki/Perfect_forward_secrecy
[完美前向保密]: #perfect-forward-secrecy
