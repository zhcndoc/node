# HTTPS

<!--introduced_in=v0.10.0-->

> 稳定性：2 - 稳定

<!-- source_link=lib/https.js -->

HTTPS 是基于 TLS/SSL 的 HTTP 协议。在 Node.js 中，这是作为一个单独的模块实现的。

## 确定 crypto 支持是否不可用

Node.js 有可能在不包含 `node:crypto` 模块支持的情况下构建。在这种情况下，尝试从 `https` `import` 或调用 `require('node:https')` 将导致抛出错误。

使用 CommonJS 时，抛出的错误可以使用 try/catch 捕获：

```cjs
let https;
try {
  https = require('node:https');
} catch (err) {
  console.error('https support is disabled!');
}
```

使用词法 ESM `import` 关键字时，只有在尝试加载模块_之前_注册了 `process.on('uncaughtException')` 的处理程序（例如，使用预加载模块），才能捕获错误。

使用 ESM 时，如果代码有可能在尚未启用 crypto 支持的 Node.js 构建上运行，请考虑使用 [`import()`][] 函数而不是词法 `import` 关键字：

```mjs
let https;
try {
  https = await import('node:https');
} catch (err) {
  console.error('https support is disabled!');
}
```

## 类：`https.Agent`

<!-- YAML
added: v0.4.5
changes:
  - version: v5.3.0
    pr-url: https://github.com/nodejs/node/pull/4252
    description: "支持 `0` `maxCachedSessions` 以禁用 TLS 会话缓存。"
  - version: v2.5.0
    pr-url: https://github.com/nodejs/node/pull/2228
    description: "参数 `maxCachedSessions` 添加到 `options` 用于 TLS 会话复用。"
-->

一个用于 HTTPS 的 [`Agent`][] 对象，类似于 [`http.Agent`][]。详见 [`https.request()`][] 获取更多信息。

类似于 `http.Agent`，`createConnection(options[, callback])` 方法可以被重写以自定义 TLS 连接的建立方式。

> 详见 [`agent.createConnection()`][] 了解重写此方法的详细信息，包括使用回调异步创建 socket。

### `new Agent([options])`

<!-- YAML
changes:
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
  - version: v12.5.0
    pr-url: https://github.com/nodejs/node/pull/28209
    description: 如果目标主机是使用 IP 地址指定的，则不自动设置 servername。
-->

* `options` {Object} 要在 agent 上设置的可配置选项集。
  可以拥有与 [`http.Agent(options)`][] 相同的字段，以及
  * `maxCachedSessions` {number} TLS 缓存会话的最大数量。
    使用 `0` 禁用 TLS 会话缓存。**默认值：** `100`。
  * `servername` {string} 要发送到服务器的 [服务器名称指示扩展][sni wiki] 的值。使用
    空字符串 `''` 禁用发送该扩展。
    **默认值：** 目标服务器的主机名，除非目标服务器是使用 IP 地址指定的，在这种情况下默认值是 `''`（无扩展）。

    详见 [`Session Resumption`][] 了解 TLS 会话复用的信息。

指定自定义 `checkServerIdentity` 选项的请求不符合通过 `https.Agent` 复用连接或 TLS 会话的条件，除非在构造 Agent 时指定了 `checkServerIdentity` 选项。

#### 事件：`'keylog'`

<!-- YAML
added:
 - v13.2.0
 - v12.16.0
-->

* `line` {Buffer} ASCII 文本行，采用 NSS `SSLKEYLOGFILE` 格式。
* `tlsSocket` {tls.TLSSocket} 生成该事件的 `tls.TLSSocket` 实例。

当由此 agent 管理的连接生成或接收密钥材料时，会发出 `keylog` 事件（通常在握手完成之前，但不一定）。此密钥材料可以存储用于调试，因为它允许解密捕获的 TLS 流量。每个 socket 可能会发出多次。

一个典型的用例是将接收到的行追加到一个公共文本文件中，该软件（例如 Wireshark）稍后使用该文件来解密流量：

```js
// ...
https.globalAgent.on('keylog', (line, tlsSocket) => {
  fs.appendFileSync('/tmp/ssl-keys.log', line, { mode: 0o600 });
});
```

## 类：`https.Server`

<!-- YAML
added: v0.3.4
-->

* 继承：{tls.Server}

详见 [`http.Server`][] 获取更多信息。

### `server.close([callback])`

<!-- YAML
added: v0.1.90
-->

* `callback` {Function}
* 返回：{https.Server}

详见 `node:http` 模块中的 [`server.close()`][]。

### `server[Symbol.asyncDispose]()`

<!-- YAML
added: v20.4.0
changes:
 - version: v24.2.0
   pr-url: https://github.com/nodejs/node/pull/58467
   description: 不再是实验性的。
-->

调用 [`server.close()`][httpsServerClose] 并返回一个 promise，当服务器关闭时该 promise 会 fulfilled。

### `server.closeAllConnections()`

<!-- YAML
added: v18.2.0
-->

详见 `node:http` 模块中的 [`server.closeAllConnections()`][]。

### `server.closeIdleConnections()`

<!-- YAML
added: v18.2.0
-->

详见 `node:http` 模块中的 [`server.closeIdleConnections()`][]。

### `server.headersTimeout`

<!-- YAML
added: v11.3.0
-->

* 类型：{number} **默认值：** `60000`

详见 `node:http` 模块中的 [`server.headersTimeout`][]。

### `server.listen()`

启动 HTTPS 服务器监听加密连接。
此方法等同于 [`net.Server`][] 中的 [`server.listen()`][]。

### `server.maxHeadersCount`

* 类型：{number} **默认值：** `2000`

详见 `node:http` 模块中的 [`server.maxHeadersCount`][]。

### `server.requestTimeout`

<!-- YAML
added: v14.11.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41263
    description: 默认请求超时从无超时更改为 300 秒（5 分钟）。
-->

* 类型：{number} **默认值：** `300000`

详见 `node:http` 模块中的 [`server.requestTimeout`][]。

### `server.setTimeout([msecs][, callback])`

<!-- YAML
added: v0.11.2
-->

* `msecs` {number} **默认值：** `120000`（2 分钟）
* `callback` {Function}
* 返回：{https.Server}

详见 `node:http` 模块中的 [`server.setTimeout()`][]。

### `server.timeout`

<!-- YAML
added: v0.11.2
changes:
  - version: v13.0.0
    pr-url: https://github.com/nodejs/node/pull/27558
    description: 默认超时从 120 秒更改为 0（无超时）。
-->

* 类型：{number} **默认值：** 0（无超时）

详见 `node:http` 模块中的 [`server.timeout`][]。

### `server.keepAliveTimeout`

<!-- YAML
added: v8.0.0
-->

* 类型：{number} **默认值：** `5000`（5 秒）

详见 `node:http` 模块中的 [`server.keepAliveTimeout`][]。

## `https.createServer([options][, requestListener])`

<!-- YAML
added: v0.3.4
-->

* `options` {Object} 接受来自 [`tls.createServer()`][]、[`tls.createSecureContext()`][] 和 [`http.createServer()`][] 的 `options`。
* `requestListener` {Function} 要添加到 `'request'` 事件的监听器。
* 返回：{https.Server}

```mjs
// curl -k https://localhost:8000/
import { createServer } from 'node:https';
import { readFileSync } from 'node:fs';

const options = {
  key: readFileSync('private-key.pem'),
  cert: readFileSync('certificate.pem'),
};

createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(8000);
```

```cjs
// curl -k https://localhost:8000/
const https = require('node:https');
const fs = require('node:fs');

const options = {
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('certificate.pem'),
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(8000);
```

或

```mjs
import { createServer } from 'node:https';
import { readFileSync } from 'node:fs';

const options = {
  pfx: readFileSync('test_cert.pfx'),
  passphrase: 'sample',
};

createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(8000);
```

```cjs
const https = require('node:https');
const fs = require('node:fs');

const options = {
  pfx: fs.readFileSync('test_cert.pfx'),
  passphrase: 'sample',
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(8000);
```

要为此示例生成证书和密钥，请运行：

```bash
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
  -keyout private-key.pem -out certificate.pem
```

然后，要为此示例生成 `pfx` 证书，请运行：

```bash
openssl pkcs12 -certpbe AES-256-CBC -export -out test_cert.pfx \
  -inkey private-key.pem -in certificate.pem -passout pass:sample
```

## `https.get(options[, callback])`

## `https.get(url[, options][, callback])`

<!-- YAML
added: v0.3.6
changes:
  - version: v10.9.0
    pr-url: https://github.com/nodejs/node/pull/21616
    description: "`url` 参数现在可以与单独的 `options` 对象一起传递。"
  - version: v7.5.0
    pr-url: https://github.com/nodejs/node/pull/10638
    description: "`options` 参数可以是 WHATWG `URL` 对象。"
-->

* `url` {string | URL}
* `options` {Object | string | URL} 接受与 [`https.request()`][] 相同的 `options`，默认方法设置为 GET。
* `callback` {Function}
* 返回：{http.ClientRequest}

类似于 [`http.get()`][]，但用于 HTTPS。

`options` 可以是一个对象、一个字符串或一个 [`URL`][] 对象。如果 `options` 是字符串，它会自动被 [`new URL()`][] 解析。如果它是 [`URL`][] 对象，它将自动转换为普通 `options` 对象。

```mjs
import { get } from 'node:https';
import process from 'node:process';

get('https://encrypted.google.com/', (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });

}).on('error', (e) => {
  console.error(e);
});
```

```cjs
const https = require('node:https');

https.get('https://encrypted.google.com/', (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });

}).on('error', (e) => {
  console.error(e);
});
```

## `https.globalAgent`

<!-- YAML
added: v0.5.9
changes:
  - version:
      - v19.0.0
    pr-url: https://github.com/nodejs/node/pull/43522
    description: agent 现在默认使用 HTTP Keep-Alive 和 5 秒超时。
-->

所有 HTTPS 客户端请求的 [`https.Agent`][] 全局实例。与默认 [`https.Agent`][] 配置的不同之处在于启用了 `keepAlive` 且 `timeout` 为 5 秒。

## `https.request(options[, callback])`

## `https.request(url[, options][, callback])`

<!-- YAML
added: v0.3.6
changes:
  - version: REPLACEME
    pr-url: https://github.com/nodejs/node/pull/63966
    description: "`clientCertEngine` 选项在运行时已弃用。"
  - version:
    - v22.4.0
    - v20.16.0
    pr-url: https://github.com/nodejs/node/pull/53329
    description: "`clientCertEngine` 选项依赖于 OpenSSL 中的自定义引擎支持，该支持在 OpenSSL 3 中已弃用。"
  - version:
      - v16.7.0
      - v14.18.0
    pr-url: https://github.com/nodejs/node/pull/39310
    description: "当使用 `URL` 对象时，解析后的用户名和密码现在将进行正确的 URI 解码。"
  - version:
      - v14.1.0
      - v13.14.0
    pr-url: https://github.com/nodejs/node/pull/32786
    description: "现在接受 `highWaterMark` 选项。"
  - version: v10.9.0
    pr-url: https://github.com/nodejs/node/pull/21616
    description: "现在可以连同单独的 `options` 对象一起传递 `url` 参数。"
  - version: v9.3.0
    pr-url: https://github.com/nodejs/node/pull/14903
    description: "`options` 参数现在可以包含 `clientCertEngine`。"
  - version: v7.5.0
    pr-url: https://github.com/nodejs/node/pull/10638
    description: "`options` 参数可以是 WHATWG `URL` 对象。"
-->

* `url` {string | URL}
* `options` {Object | string | URL} 接受来自 [`http.request()`][] 的所有 `options`，但默认值存在一些差异：
  * `protocol` **默认值：** `'https:'`
  * `port` **默认值：** `443`
  * `agent` **默认值：** `https.globalAgent`
* `callback` {Function}
* 返回：{http.ClientRequest}

向安全 Web 服务器发出请求。

还接受来自 [`tls.connect()`][] 的以下附加 `options`：
`ca`, `cert`, `ciphers`, `clientCertEngine` (已弃用), `crl`, `dhparam`, `ecdhCurve`,
`honorCipherOrder`, `key`, `passphrase`, `pfx`, `rejectUnauthorized`,
`secureOptions`, `secureProtocol`, `servername`, `sessionIdContext`,
`highWaterMark`。

`options` 可以是一个对象、一个字符串或一个 [`URL`][] 对象。如果 `options` 是字符串，它将使用 [`new URL()`][] 自动解析。如果它是 [`URL`][] 对象，它将自动转换为普通 `options` 对象。

`https.request()` 返回 [`http.ClientRequest`][] 类的一个实例。`ClientRequest` 实例是一个可写流。如果需要使用 POST 请求上传文件，则写入 `ClientRequest` 对象。

```mjs
import { request } from 'node:https';
import process from 'node:process';

const options = {
  hostname: 'encrypted.google.com',
  port: 443,
  path: '/',
  method: 'GET',
};

const req = request(options, (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error(e);
});
req.end();
```

```cjs
const https = require('node:https');

const options = {
  hostname: 'encrypted.google.com',
  port: 443,
  path: '/',
  method: 'GET',
};

const req = https.request(options, (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error(e);
});
req.end();
```

使用 [`tls.connect()`][] 中的选项示例：

```js
const options = {
  hostname: 'encrypted.google.com',
  port: 443,
  path: '/',
  method: 'GET',
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('certificate.pem'),
};
options.agent = new https.Agent(options);

const req = https.request(options, (res) => {
  // ...
});
```

或者，通过不使用 [`Agent`][] 来选择不启用连接池。

```js
const options = {
  hostname: 'encrypted.google.com',
  port: 443,
  path: '/',
  method: 'GET',
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('certificate.pem'),
  agent: false,
};

const req = https.request(options, (res) => {
  // ...
});
```

使用 [`URL`][] 作为 `options` 的示例：

```js
const options = new URL('https://abc:xyz@example.com');

const req = https.request(options, (res) => {
  // ...
});
```

证书指纹上的示例固定，或公钥上的示例固定（类似于
`pin-sha256`）：

```mjs
import { checkServerIdentity } from 'node:tls';
import { Agent, request } from 'node:https';
import { createHash } from 'node:crypto';

function sha256(s) {
  return createHash('sha256').update(s).digest('base64');
}
const options = {
  hostname: 'github.com',
  port: 443,
  path: '/',
  method: 'GET',
  checkServerIdentity: function(host, cert) {
    // 确保证书是颁发给我们所连接的主机的
    const err = checkServerIdentity(host, cert);
    if (err) {
      return err;
    }

    // 锁定公钥，类似于 HPKP pin-sha256 锁定
    const pubkey256 = 'SIXvRyDmBJSgatgTQRGbInBaAK+hZOQ18UmrSwnDlK8=';
    if (sha256(cert.pubkey) !== pubkey256) {
      const msg = 'Certificate verification error: ' +
        `The public key of '${cert.subject.CN}' ` +
        'does not match our pinned fingerprint';
      return new Error(msg);
    }

    // 锁定确切的证书，而不是公钥
    const cert256 = 'FD:6E:9B:0E:F3:98:BC:D9:04:C3:B2:EC:16:7A:7B:' +
      '0F:DA:72:01:C9:03:C5:3A:6A:6A:E5:D0:41:43:63:EF:65';
    if (cert.fingerprint256 !== cert256) {
      const msg = 'Certificate verification error: ' +
        `The certificate of '${cert.subject.CN}' ` +
        'does not match our pinned fingerprint';
      return new Error(msg);
    }

    // 此循环仅用于提供信息。
    // 打印链中所有证书的证书和公钥指纹
    //。通常在公共互联网上锁定颁发者的公钥，
    // 而在敏感环境中锁定服务的公钥。
    let lastprint256;
    do {
      console.log('Subject Common Name:', cert.subject.CN);
      console.log('  Certificate SHA256 fingerprint:', cert.fingerprint256);

      const hash = createHash('sha256');
      console.log('  Public key ping-sha256:', sha256(cert.pubkey));

      lastprint256 = cert.fingerprint256;
      cert = cert.issuerCertificate;
    } while (cert.fingerprint256 !== lastprint256);

  },
};

options.agent = new Agent(options);
const req = request(options, (res) => {
  console.log('All OK. Server matched our pinned cert or public key');
  console.log('statusCode:', res.statusCode);

  res.on('data', (d) => {});
});

req.on('error', (e) => {
  console.error(e.message);
});
req.end();
```

```cjs
const tls = require('node:tls');
const https = require('node:https');
const crypto = require('node:crypto');

function sha256(s) {
  return crypto.createHash('sha256').update(s).digest('base64');
}
const options = {
  hostname: 'github.com',
  port: 443,
  path: '/',
  method: 'GET',
  checkServerIdentity: function(host, cert) {
    // 确保证书是颁发给我们所连接的主机的
    const err = tls.checkServerIdentity(host, cert);
    if (err) {
      return err;
    }

    // 锁定公钥，类似于 HPKP pin-sha256 锁定
    const pubkey256 = 'SIXvRyDmBJSgatgTQRGbInBaAK+hZOQ18UmrSwnDlK8=';
    if (sha256(cert.pubkey) !== pubkey256) {
      const msg = 'Certificate verification error: ' +
        `The public key of '${cert.subject.CN}' ` +
        'does not match our pinned fingerprint';
      return new Error(msg);
    }

    // 锁定确切的证书，而不是公钥
    const cert256 = 'FD:6E:9B:0E:F3:98:BC:D9:04:C3:B2:EC:16:7A:7B:' +
      '0F:DA:72:01:C9:03:C5:3A:6A:6A:E5:D0:41:43:63:EF:65';
    if (cert.fingerprint256 !== cert256) {
      const msg = 'Certificate verification error: ' +
        `The certificate of '${cert.subject.CN}' ` +
        'does not match our pinned fingerprint';
      return new Error(msg);
    }

    // 此循环仅用于提供信息。
    // 打印链中所有证书的证书和公钥指纹
    //。通常在公共互联网上锁定颁发者的公钥，
    // 而在敏感环境中锁定服务的公钥。
    do {
      console.log('Subject Common Name:', cert.subject.CN);
      console.log('  Certificate SHA256 fingerprint:', cert.fingerprint256);

      hash = crypto.createHash('sha256');
      console.log('  Public key ping-sha256:', sha256(cert.pubkey));

      lastprint256 = cert.fingerprint256;
      cert = cert.issuerCertificate;
    } while (cert.fingerprint256 !== lastprint256);

  },
};

options.agent = new https.Agent(options);
const req = https.request(options, (res) => {
  console.log('All OK. Server matched our pinned cert or public key');
  console.log('statusCode:', res.statusCode);

  res.on('data', (d) => {});
});

req.on('error', (e) => {
  console.error(e.message);
});
req.end();
```

例如输出：

```text
Subject Common Name: github.com
  Certificate SHA256 fingerprint: FD:6E:9B:0E:F3:98:BC:D9:04:C3:B2:EC:16:7A:7B:0F:DA:72:01:C9:03:C5:3A:6A:6A:E5:D0:41:43:63:EF:65
  Public key ping-sha256: SIXvRyDmBJSgatgTQRGbInBaAK+hZOQ18UmrSwnDlK8=
Subject Common Name: Sectigo ECC Domain Validation Secure Server CA
  Certificate SHA256 fingerprint: 61:E9:73:75:E9:F6:DA:98:2F:F5:C1:9E:2F:94:E6:6C:4E:35:B6:83:7C:E3:B9:14:D2:24:5C:7F:5F:65:82:5F
  Public key ping-sha256: Eep0p/AsSa9lFUH6KT2UY+9s1Z8v7voAPkQ4fGknZ2g=
Subject Common Name: USERTrust ECC Certification Authority
  Certificate SHA256 fingerprint: A6:CF:64:DB:B4:C8:D5:FD:19:CE:48:89:60:68:DB:03:B5:33:A8:D1:33:6C:62:56:A8:7D:00:CB:B3:DE:F3:EA
  Public key ping-sha256: UJM2FOhG9aTNY0Pg4hgqjNzZ/lQBiMGRxPD5Y2/e0bw=
Subject Common Name: AAA Certificate Services
  Certificate SHA256 fingerprint: D7:A7:A0:FB:5D:7E:27:31:D7:71:E9:48:4E:BC:DE:F7:1D:5F:0C:3E:0A:29:48:78:2B:C8:3E:E0:EA:69:9E:F4
  Public key ping-sha256: vRU+17BDT2iGsXvOi76E7TQMcTLXAqj0+jGPdW7L1vM=
All OK. Server matched our pinned cert or public key
statusCode: 200
```

[`Agent`]: #class-httpsagent
[`Session Resumption`]: tls.md#session-resumption
[`URL`]: url.md#the-whatwg-url-api
[`agent.createConnection()`]: http.md#agentcreateconnectionoptions-callback
[`http.Agent(options)`]: http.md#new-agentoptions
[`http.Agent`]: http.md#class-httpagent
[`http.ClientRequest`]: http.md#class-httpclientrequest
[`http.Server`]: http.md#class-httpserver
[`http.createServer()`]: http.md#httpcreateserveroptions-requestlistener
[`http.get()`]: http.md#httpgetoptions-callback
[`http.request()`]: http.md#httprequestoptions-callback
[`https.Agent`]: #class-httpsagent
[`https.request()`]: #httpsrequestoptions-callback
[`import()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import
[`net.Server`]: net.md#class-netserver
[`new URL()`]: url.md#new-urlinput-base
[`server.close()`]: http.md#serverclosecallback
[`server.closeAllConnections()`]: http.md#servercloseallconnections
[`server.closeIdleConnections()`]: http.md#servercloseidleconnections
[`server.headersTimeout`]: http.md#serverheaderstimeout
[`server.keepAliveTimeout`]: http.md#serverkeepalivetimeout
[`server.listen()`]: net.md#serverlisten
[`server.maxHeadersCount`]: http.md#servermaxheaderscount
[`server.requestTimeout`]: http.md#serverrequesttimeout
[`server.setTimeout()`]: http.md#serversettimeoutmsecs-callback
[`server.timeout`]: http.md#servertimeout
[`tls.connect()`]: tls.md#tlsconnectoptions-callback
[`tls.createSecureContext()`]: tls.md#tlscreatesecurecontextoptions
[`tls.createServer()`]: tls.md#tlscreateserveroptions-secureconnectionlistener
[httpsServerClose]: #serverclosecallback
[sni wiki]: https://en.wikipedia.org/wiki/Server_Name_Indication
