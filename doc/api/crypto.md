# 加密

<!--introduced_in=v0.3.6-->

> 稳定性：2 - 稳定

<!-- source_link=lib/crypto.js -->

`node:crypto` 模块提供加密功能，包括一组 OpenSSL 的哈希、HMAC、加密、解密、签名和验证函数的包装器。

```mjs
const { createHmac } = await import('node:crypto');

const secret = 'abcdefg';
const hash = createHmac('sha256', secret)
               .update('I love cupcakes')
               .digest('hex');
console.log(hash);
// 输出：
//   c0fa1bc00531bd78ef38c628449c5102aeabd49b5dc3a2a516ea6ea959d6658e
```

```cjs
const { createHmac } = require('node:crypto');

const secret = 'abcdefg';
const hash = createHmac('sha256', secret)
               .update('I love cupcakes')
               .digest('hex');
console.log(hash);
// 输出：
//   c0fa1bc00531bd78ef38c628449c5102aeabd49b5dc3a2a516ea6ea959d6658e
```

## 确定是否不支持加密

Node.js 有可能在不包含 `node:crypto` 模块支持的情况下构建。在这种情况下，尝试从 `crypto` `import` 或调用 `require('node:crypto')` 将导致抛出错误。

使用 CommonJS 时，可以使用 try/catch 捕获抛出的错误：

<!--eslint-disable no-global-assign -->

```cjs
let crypto;
try {
  crypto = require('node:crypto');
} catch (err) {
  console.error('加密支持已禁用！');
}
```

当使用词法 ESM `import` 关键字时，只有在加载模块之前注册了 `process.on('uncaughtException')` 的处理程序，才能捕获该错误（例如，使用预加载模块）。

使用 ESM 时，如果代码可能在未启用加密支持的 Node.js 构建上运行，请考虑使用 [`import()`][] 函数而不是词法 `import` 关键字：

```mjs
let crypto;
try {
  crypto = await import('node:crypto');
} catch (err) {
  console.error('加密支持已禁用！');
}
```

## 非对称密钥类型

下表列出了 [`KeyObject`][] API 识别的非对称密钥类型以及每种密钥类型支持的导出/导入格式。

| 密钥类型                           | 描述               | OID                     | `'pem'` | `'der'` | `'jwk'` | `'raw-public'` | `'raw-private'` | `'raw-seed'` |
| ---------------------------------- | ------------------ | ----------------------- | ------- | ------- | ------- | -------------- | --------------- | ------------ |
| `'dh'`                             | Diffie-Hellman     | 1.2.840.113549.1.3.1    | ✔       | ✔       |         |                |                 |              |
| `'dsa'`                            | DSA                | 1.2.840.10040.4.1       | ✔       | ✔       |         |                |                 |              |
| `'ec'`                             | 椭圆曲线           | 1.2.840.10045.2.1       | ✔       | ✔       | ✔       | ✔              | ✔               |              |
| `'ed25519'`                        | Ed25519            | 1.3.101.112             | ✔       | ✔       | ✔       | ✔              | ✔               |              |
| `'ed448'`                          | Ed448              | 1.3.101.113             | ✔       | ✔       | ✔       | ✔              | ✔               |              |
| `'ml-dsa-44'`[^openssl35]          | ML-DSA-44          | 2.16.840.1.101.3.4.3.17 | ✔       | ✔       | ✔       | ✔              |                 | ✔            |
| `'ml-dsa-65'`[^openssl35]          | ML-DSA-65          | 2.16.840.1.101.3.4.3.18 | ✔       | ✔       | ✔       | ✔              |                 | ✔            |
| `'ml-dsa-87'`[^openssl35]          | ML-DSA-87          | 2.16.840.1.101.3.4.3.19 | ✔       | ✔       | ✔       | ✔              |                 | ✔            |
| `'ml-kem-512'`[^openssl35]         | ML-KEM-512         | 2.16.840.1.101.3.4.4.1  | ✔       | ✔       | ✔       | ✔              |                 | ✔            |
| `'ml-kem-768'`[^openssl35]         | ML-KEM-768         | 2.16.840.1.101.3.4.4.2  | ✔       | ✔       | ✔       | ✔              |                 | ✔            |
| `'ml-kem-1024'`[^openssl35]        | ML-KEM-1024        | 2.16.840.1.101.3.4.4.3  | ✔       | ✔       | ✔       | ✔              |                 | ✔            |
| `'rsa-pss'`                        | RSA PSS            | 1.2.840.113549.1.1.10   | ✔       | ✔       |         |                |                 |              |
| `'rsa'`                            | RSA                | 1.2.840.113549.1.1.1    | ✔       | ✔       | ✔       |                |                 |              |
| `'slh-dsa-sha2-128f'`[^openssl35]  | SLH-DSA-SHA2-128f  | 2.16.840.1.101.3.4.3.21 | ✔       | ✔       | ✔       | ✔              | ✔               |              |
| `'slh-dsa-sha2-128s'`[^openssl35]  | SLH-DSA-SHA2-128s  | 2.16.840.1.101.3.4.3.20 | ✔       | ✔       | ✔       | ✔              | ✔               |              |
| `'slh-dsa-sha2-192f'`[^openssl35]  | SLH-DSA-SHA2-192f  | 2.16.840.1.101.3.4.3.23 | ✔       | ✔       | ✔       | ✔              | ✔               |              |
| `'slh-dsa-sha2-192s'`[^openssl35]  | SLH-DSA-SHA2-192s  | 2.16.840.1.101.3.4.3.22 | ✔       | ✔       | ✔       | ✔              | ✔               |              |
| `'slh-dsa-sha2-256f'`[^openssl35]  | SLH-DSA-SHA2-256f  | 2.16.840.1.101.3.4.3.25 | ✔       | ✔       | ✔       | ✔              | ✔               |              |
| `'slh-dsa-sha2-256s'`[^openssl35]  | SLH-DSA-SHA2-256s  | 2.16.840.1.101.3.4.3.24 | ✔       | ✔       | ✔       | ✔              | ✔               |              |
| `'slh-dsa-shake-128f'`[^openssl35] | SLH-DSA-SHAKE-128f | 2.16.840.1.101.3.4.3.27 | ✔       | ✔       | ✔       | ✔              | ✔               |              |
| `'slh-dsa-shake-128s'`[^openssl35] | SLH-DSA-SHAKE-128s | 2.16.840.1.101.3.4.3.26 | ✔       | ✔       | ✔       | ✔              | ✔               |              |
| `'slh-dsa-shake-192f'`[^openssl35] | SLH-DSA-SHAKE-192f | 2.16.840.1.101.3.4.3.29 | ✔       | ✔       | ✔       | ✔              | ✔               |              |
| `'slh-dsa-shake-192s'`[^openssl35] | SLH-DSA-SHAKE-192s | 2.16.840.1.101.3.4.3.28 | ✔       | ✔       | ✔       | ✔              | ✔               |              |
| `'slh-dsa-shake-256f'`[^openssl35] | SLH-DSA-SHAKE-256f | 2.16.840.1.101.3.4.3.31 | ✔       | ✔       | ✔       | ✔              | ✔               |              |
| `'slh-dsa-shake-256s'`[^openssl35] | SLH-DSA-SHAKE-256s | 2.16.840.1.101.3.4.3.30 | ✔       | ✔       | ✔       | ✔              | ✔               |              |
| `'x25519'`                         | X25519             | 1.3.101.110             | ✔       | ✔       | ✔       | ✔              | ✔               |              |
| `'x448'`                           | X448               | 1.3.101.111             | ✔       | ✔       | ✔       | ✔              | ✔               |              |

### 密钥格式

非对称密钥可以用几种格式表示。**推荐的方法是将密钥材料导入 [`KeyObject`][] 一次，并在所有后续操作中重用它**，因为这避免了重复解析并提供最佳性能。

当 [`KeyObject`][] 不切实际时——例如，当密钥材料出现在协议消息中且仅使用一次时——大多数加密函数也接受 PEM 字符串或直接指定格式和密钥材料的对象。有关每种格式接受的完整选项，请参阅 [`crypto.createPublicKey()`][]、[`crypto.createPrivateKey()`][] 和 [`keyObject.export()`][]。

#### KeyObject

[`KeyObject`][] 是解析后的密钥的内存表示。它由 [`crypto.createPublicKey()`][]、[`crypto.createPrivateKey()`][]、[`crypto.createSecretKey()`][] 或密钥生成函数（如 [`crypto.generateKeyPair()`][]）创建。使用给定 [`KeyObject`][] 进行的第一个加密操作可能比后续操作慢，因为 OpenSSL 会在首次使用时延迟初始化内部缓存。

#### PEM 和 DER

PEM 和 DER 是基于 ASN.1 结构的非对称密钥的传统编码格式。

* **PEM** 是一种文本编码，它将 Base64 编码的 DER 数据包装在页眉和页脚行之间（例如 `-----BEGIN PUBLIC KEY-----`）。PEM 字符串可以直接传递给大多数加密操作。
* **DER** 是相同 ASN.1 结构的二进制编码。提供 DER 输入时，必须明确指定 `type`（通常为 `'spki'` 或 `'pkcs8'`）。

#### JSON Web Key (JWK)

JSON Web Key (JWK) 是 [RFC 7517][] 中定义的基于 JSON 的密钥表示。JWK 将每个密钥组件编码为 JSON 对象内的单个 Base64url 编码值。对于 RSA 密钥，JWK 避免了 ASN.1 解析开销，是最快的序列化导入格式。

#### 原始密钥格式

> 稳定性：1.1 - 积极开发中

`'raw-public'`、`'raw-private'` 和 `'raw-seed'` 密钥格式允许导入和导出原始密钥材料而无需任何编码包装器。有关使用详情，请参阅 [`keyObject.export()`][]、[`crypto.createPublicKey()`][] 和 [`crypto.createPrivateKey()`][]。

`'raw-public'` 通常是导入公钥的最快方式。`'raw-private'` 和 `'raw-seed'` 并不总是比其他格式快，因为它们仅包含私钥标量或种子——导入它们需要派生公钥组件（例如，椭圆曲线点乘法或种子扩展），这可能很昂贵。其他格式包括私钥和公钥组件，避免了该计算。

### 选择密钥格式

**始终优先使用 [`KeyObject`][]** - 从你拥有的任何格式创建一个并重用它。下面的指南仅适用于在选择序列化格式时，无论是导入到 [`KeyObject`][] 还是在 [`KeyObject`][] 不切实际时内联传递密钥材料。

#### 导入密钥

当创建 [`KeyObject`][] 以供重复使用时，导入成本只支付一次，因此选择更快的格式可以减少启动延迟。

导入成本分为两部分：**解析开销**（解码序列化包装器）和**密钥计算**（重建完整密钥所需的任何数学工作，例如从私钥标量派生公钥或扩展种子）。哪部分占主导地位取决于密钥类型。例如：

* 公钥 - `'raw-public'` 是最快的序列化格式，因为原始格式跳过了所有 ASN.1 和 Base64 解码。
* EC 私钥 - `'raw-private'` 比 PEM 或 DER 快，因为它避免了 ASN.1 解析。但是，对于较大的曲线（例如 P-384、P-521），从私钥标量派生公钥点所需的计算变得昂贵，减少了优势。
* RSA 密钥 - `'jwk'` 是最快的序列化格式。JWK 将 RSA 密钥组件表示为单个 Base64url 编码的整数，完全避免了 ASN.1 解析的开销。

#### 操作中的内联密钥材料

当无法重用 [`KeyObject`][] 时（例如，密钥作为原始字节出现在协议消息中且仅使用一次），大多数加密函数也接受 PEM 字符串或直接指定格式和密钥材料的对象。在这种情况下，总成本是密钥导入和加密计算本身的总和。

对于加密计算占主导地位的操作——例如使用 RSA 签名或使用 P-384 或 P-521 进行 ECDH 密钥协商——序列化格式对整体吞吐量的影响可以忽略不计，因此选择最方便的格式。对于轻量级操作，如 Ed25519 签名或验证，导入成本占总成本的较大比例，因此更快的格式（如 `'raw-public'` 或 `'raw-private'`）可以显著提高吞吐量。

即使相同的密钥材料只使用几次，将其导入到 [`KeyObject`][] 也比重复传递原始或 PEM 表示更值得。

### 示例

示例：在签名和验证操作中重用 [`KeyObject`][]：

```mjs
import { promisify } from 'node:util';
const { generateKeyPair, sign, verify } = await import('node:crypto');

const { publicKey, privateKey } = await promisify(generateKeyPair)('ed25519');

// KeyObject 将解析后的密钥保存在内存中，可以复用
// 跨多个操作而无需重新解析。
const data = new TextEncoder().encode('message to sign');
const signature = sign(null, data, privateKey);
verify(null, data, publicKey, signature);
```

示例：将各种格式的密钥导入到 [`KeyObject`][] 中：

```mjs
import { promisify } from 'node:util';
const {
  createPrivateKey, createPublicKey, generateKeyPair,
} = await import('node:crypto');

const generated = await promisify(generateKeyPair)('ed25519');

// PEM
const privatePem = generated.privateKey.export({ format: 'pem', type: 'pkcs8' });
const publicPem = generated.publicKey.export({ format: 'pem', type: 'spki' });
createPrivateKey(privatePem);
createPublicKey(publicPem);

// DER - 需要明确指定类型
const privateDer = generated.privateKey.export({ format: 'der', type: 'pkcs8' });
const publicDer = generated.publicKey.export({ format: 'der', type: 'spki' });
createPrivateKey({ key: privateDer, format: 'der', type: 'pkcs8' });
createPublicKey({ key: publicDer, format: 'der', type: 'spki' });

// JWK
const privateJwk = generated.privateKey.export({ format: 'jwk' });
const publicJwk = generated.publicKey.export({ format: 'jwk' });
createPrivateKey({ key: privateJwk, format: 'jwk' });
createPublicKey({ key: publicJwk, format: 'jwk' });

// 原始格式
const rawPriv = generated.privateKey.export({ format: 'raw-private' });
const rawPub = generated.publicKey.export({ format: 'raw-public' });
createPrivateKey({ key: rawPriv, format: 'raw-private', asymmetricKeyType: 'ed25519' });
createPublicKey({ key: rawPub, format: 'raw-public', asymmetricKeyType: 'ed25519' });
```

示例：直接将密钥材料传递给 [`crypto.sign()`][] 和 [`crypto.verify()`][] 而无需先创建 [`KeyObject`][]：

```mjs
import { promisify } from 'node:util';
const { generateKeyPair, sign, verify } = await import('node:crypto');

const generated = await promisify(generateKeyPair)('ed25519');

const data = new TextEncoder().encode('message to sign');

// PEM 字符串
const privatePem = generated.privateKey.export({ format: 'pem', type: 'pkcs8' });
const publicPem = generated.publicKey.export({ format: 'pem', type: 'spki' });
const sig1 = sign(null, data, privatePem);
verify(null, data, publicPem, sig1);

// JWK 对象
const privateJwk = generated.privateKey.export({ format: 'jwk' });
const publicJwk = generated.publicKey.export({ format: 'jwk' });
const sig2 = sign(null, data, { key: privateJwk, format: 'jwk' });
verify(null, data, { key: publicJwk, format: 'jwk' }, sig2);

// 原始密钥字节
const rawPriv = generated.privateKey.export({ format: 'raw-private' });
const rawPub = generated.publicKey.export({ format: 'raw-public' });
const sig3 = sign(null, data, {
  key: rawPriv, format: 'raw-private', asymmetricKeyType: 'ed25519',
});
verify(null, data, {
  key: rawPub, format: 'raw-public', asymmetricKeyType: 'ed25519',
}, sig3);
```

示例：对于 EC 密钥，导入原始密钥时需要 `namedCurve` 选项：

```mjs
import { promisify } from 'node:util';
const {
  createPrivateKey, createPublicKey, generateKeyPair, sign, verify,
} = await import('node:crypto');

const generated = await promisify(generateKeyPair)('ec', {
  namedCurve: 'P-256',
});

// 导出原始 EC 公钥（默认未压缩）。
const rawPublicKey = generated.publicKey.export({ format: 'raw-public' });

// 以下等效。
const rawPublicKeyUncompressed = generated.publicKey.export({
  format: 'raw-public',
  type: 'uncompressed',
});

// 导出压缩点格式。
const rawPublicKeyCompressed = generated.publicKey.export({
  format: 'raw-public',
  type: 'compressed',
});

// 导出原始 EC 私钥。
const rawPrivateKey = generated.privateKey.export({ format: 'raw-private' });

// 导入原始 EC 密钥。
// 接受压缩和未压缩的点格式。
const publicKey = createPublicKey({
  key: rawPublicKey,
  format: 'raw-public',
  asymmetricKeyType: 'ec',
  namedCurve: 'P-256',
});
const privateKey = createPrivateKey({
  key: rawPrivateKey,
  format: 'raw-private',
  asymmetricKeyType: 'ec',
  namedCurve: 'P-256',
});

const data = new TextEncoder().encode('message to sign');
const signature = sign('sha256', data, privateKey);
verify('sha256', data, publicKey, signature);
```

示例：导出原始种子并导入它们：

```mjs
import { promisify } from 'node:util';
const {
  createPrivateKey, decapsulate, encapsulate, generateKeyPair,
} = await import('node:crypto');

const generated = await promisify(generateKeyPair)('ml-kem-768');

// 导出原始种子（ML-KEM 为 64 字节）。
const seed = generated.privateKey.export({ format: 'raw-seed' });

// 导入原始种子。
const privateKey = createPrivateKey({
  key: seed,
  format: 'raw-seed',
  asymmetricKeyType: 'ml-kem-768',
});

const { ciphertext } = encapsulate(generated.publicKey);
decapsulate(privateKey, ciphertext);
```

## 类：`Certificate`

<!-- YAML
added: v0.11.8
-->

SPKAC 是一种证书签名请求机制，最初由 Netscape 实现，并作为 HTML5 的 `keygen` 元素的一部分被正式规范。

`<keygen>` 自 [HTML 5.2][] 起已弃用，新项目不应再使用此元素。

`node:crypto` 模块提供了 `Certificate` 类用于处理 SPKAC 数据。最常见的用法是处理 HTML5 `<keygen>` 元素生成的输出。Node.js 在内部使用 [OpenSSL 的 SPKAC 实现][]。

### 静态方法：`Certificate.exportChallenge(spkac[, encoding])`

<!-- YAML
added: v9.0.0
changes:
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/35093
    description: spkac 参数可以是 ArrayBuffer。限制 spkac 参数的大小最大为 2**31 - 1 字节。
-->

* `spkac` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `encoding` {string} `spkac` 字符串的 [编码][]。
* 返回：{Buffer} `spkac` 数据结构的挑战组件，其中包括公钥和挑战。

```mjs
const { Certificate } = await import('node:crypto');
const spkac = getSpkacSomehow();
const challenge = Certificate.exportChallenge(spkac);
console.log(challenge.toString('utf8'));
// 打印：挑战作为 UTF8 字符串
```

```cjs
const { Certificate } = require('node:crypto');
const spkac = getSpkacSomehow();
const challenge = Certificate.exportChallenge(spkac);
console.log(challenge.toString('utf8'));
// 打印：挑战作为 UTF8 字符串
```

### 静态方法：`Certificate.exportPublicKey(spkac[, encoding])`

<!-- YAML
added: v9.0.0
changes:
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/35093
    description: spkac 参数可以是 ArrayBuffer。限制 spkac 参数的大小最大为 2**31 - 1 字节。
-->

* `spkac` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `encoding` {string} `spkac` 字符串的 [编码][]。
* 返回：{Buffer} `spkac` 数据结构的公钥组件，其中包括公钥和挑战。

```mjs
const { Certificate } = await import('node:crypto');
const spkac = getSpkacSomehow();
const publicKey = Certificate.exportPublicKey(spkac);
console.log(publicKey);
// 打印：公钥为 <Buffer ...>
```

```cjs
const { Certificate } = require('node:crypto');
const spkac = getSpkacSomehow();
const publicKey = Certificate.exportPublicKey(spkac);
console.log(publicKey);
// 打印：公钥为 <Buffer ...>
```

### 静态方法：`Certificate.verifySpkac(spkac[, encoding])`

<!-- YAML
added: v9.0.0
changes:
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/35093
    description: spkac 参数可以是 ArrayBuffer。添加了 encoding。限制 spkac 参数的大小最大为 2**31 - 1 字节。
-->

* `spkac` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `encoding` {string} `spkac` 字符串的 [编码][]。
* 返回：{boolean} 如果给定的 `spkac` 数据结构有效则为 `true`，否则为 `false`。

```mjs
import { Buffer } from 'node:buffer';
const { Certificate } = await import('node:crypto');

const spkac = getSpkacSomehow();
console.log(Certificate.verifySpkac(Buffer.from(spkac)));
// 打印：true 或 false
```

```cjs
const { Buffer } = require('node:buffer');
const { Certificate } = require('node:crypto');

const spkac = getSpkacSomehow();
console.log(Certificate.verifySpkac(Buffer.from(spkac)));
// 打印：true 或 false
```

### 遗留 API

> 稳定性：0 - 已弃用

作为遗留接口，可以如下面的示例所示创建 `crypto.Certificate` 类的新实例。

#### `new crypto.Certificate()`

`Certificate` 类的实例可以使用 `new` 关键字创建，或者通过调用 `crypto.Certificate()` 作为函数来创建：

```mjs
const { Certificate } = await import('node:crypto');

const cert1 = new Certificate();
const cert2 = Certificate();
```

```cjs
const { Certificate } = require('node:crypto');

const cert1 = new Certificate();
const cert2 = Certificate();
```

#### `certificate.exportChallenge(spkac[, encoding])`

<!-- YAML
added: v0.11.8
-->

* `spkac` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `encoding` {string} `spkac` 字符串的 [编码][]。
* 返回：{Buffer} `spkac` 数据结构的挑战组件，其中包括公钥和挑战。

```mjs
const { Certificate } = await import('node:crypto');
const cert = Certificate();
const spkac = getSpkacSomehow();
const challenge = cert.exportChallenge(spkac);
console.log(challenge.toString('utf8'));
// 打印：挑战作为 UTF8 字符串
```

```cjs
const { Certificate } = require('node:crypto');
const cert = Certificate();
const spkac = getSpkacSomehow();
const challenge = cert.exportChallenge(spkac);
console.log(challenge.toString('utf8'));
// 打印：挑战作为 UTF8 字符串
```

#### `certificate.exportPublicKey(spkac[, encoding])`

<!-- YAML
added: v0.11.8
-->

* `spkac` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `encoding` {string} `spkac` 字符串的 [编码][]。
* 返回：{Buffer} `spkac` 数据结构的公钥组件，其中包括公钥和挑战。

```mjs
const { Certificate } = await import('node:crypto');
const cert = Certificate();
const spkac = getSpkacSomehow();
const publicKey = cert.exportPublicKey(spkac);
console.log(publicKey);
// 打印：公钥为 <Buffer ...>
```

```cjs
const { Certificate } = require('node:crypto');
const cert = Certificate();
const spkac = getSpkacSomehow();
const publicKey = cert.exportPublicKey(spkac);
console.log(publicKey);
// 打印：公钥为 <Buffer ...>
```

#### `certificate.verifySpkac(spkac[, encoding])`

<!-- YAML
added: v0.11.8
-->

* `spkac` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `encoding` {string} `spkac` 字符串的 [编码][]。
* 返回：{boolean} 如果给定的 `spkac` 数据结构有效则为 `true`，否则为 `false`。

```mjs
import { Buffer } from 'node:buffer';
const { Certificate } = await import('node:crypto');

const cert = Certificate();
const spkac = getSpkacSomehow();
console.log(cert.verifySpkac(Buffer.from(spkac)));
// 打印：true 或 false
```

```cjs
const { Buffer } = require('node:buffer');
const { Certificate } = require('node:crypto');

const cert = Certificate();
const spkac = getSpkacSomehow();
console.log(cert.verifySpkac(Buffer.from(spkac)));
// 打印：true 或 false
```

## 类：`Cipheriv`

<!-- YAML
added: v0.1.94
-->

* 继承：{stream.Transform}

`Cipheriv` 类的实例用于加密数据。该类可以通过以下两种方式使用：

* 作为一个既可读又可写的 [stream][]，将明文未加密数据写入以在可读侧产生加密数据，或
* 使用 [`cipher.update()`][] 和 [`cipher.final()`][] 方法来生成加密数据。

[`crypto.createCipheriv()`][] 方法用于创建 `Cipheriv` 实例。不应直接使用 `new` 关键字创建 `Cipheriv` 对象。

示例：将 `Cipheriv` 对象用作流：

```mjs
const {
  scrypt,
  randomFill,
  createCipheriv,
} = await import('node:crypto');

const algorithm = 'aes-192-cbc';
const password = '用于生成密钥的密码';

// 首先，我们将生成密钥。密钥长度取决于算法。
// 在这种情况下，对于 aes192，它是 24 字节（192 位）。
scrypt(password, 'salt', 24, (err, key) => {
  if (err) throw err;
  // 然后，我们将生成一个随机初始化向量
  randomFill(new Uint8Array(16), (err, iv) => {
    if (err) throw err;

    // 一旦我们有了密钥和 iv，我们就可以创建并使用密码...
    const cipher = createCipheriv(algorithm, key, iv);

    let encrypted = '';
    cipher.setEncoding('hex');

    cipher.on('data', (chunk) => encrypted += chunk);
    cipher.on('end', () => console.log(encrypted));

    cipher.write('some clear text data');
    cipher.end();
  });
});
```

```cjs
const {
  scrypt,
  randomFill,
  createCipheriv,
} = require('node:crypto');

const algorithm = 'aes-192-cbc';
const password = '用于生成密钥的密码';

// 首先，我们将生成密钥。密钥长度取决于算法。
// 在这种情况下，对于 aes192，它是 24 字节（192 位）。
scrypt(password, 'salt', 24, (err, key) => {
  if (err) throw err;
  // 然后，我们将生成一个随机初始化向量
  randomFill(new Uint8Array(16), (err, iv) => {
    if (err) throw err;

    // 一旦我们有了密钥和 iv，我们就可以创建并使用密码...
    const cipher = createCipheriv(algorithm, key, iv);

    let encrypted = '';
    cipher.setEncoding('hex');

    cipher.on('data', (chunk) => encrypted += chunk);
    cipher.on('end', () => console.log(encrypted));

    cipher.write('some clear text data');
    cipher.end();
  });
});
```

示例：使用 `Cipheriv` 和管道流：

```mjs
import {
  createReadStream,
  createWriteStream,
} from 'node:fs';

import {
  pipeline,
} from 'node:stream';

const {
  scrypt,
  randomFill,
  createCipheriv,
} = await import('node:crypto');

const algorithm = 'aes-192-cbc';
const password = '用于生成密钥的密码';

// 首先，我们将生成密钥。密钥长度取决于算法。
// 在这种情况下，对于 aes192，它是 24 字节（192 位）。
scrypt(password, 'salt', 24, (err, key) => {
  if (err) throw err;
  // 然后，我们将生成一个随机初始化向量
  randomFill(new Uint8Array(16), (err, iv) => {
    if (err) throw err;

    const cipher = createCipheriv(algorithm, key, iv);

    const input = createReadStream('test.js');
    const output = createWriteStream('test.enc');

    pipeline(input, cipher, output, (err) => {
      if (err) throw err;
    });
  });
});
```

```cjs
const {
  createReadStream,
  createWriteStream,
} = require('node:fs');

const {
  pipeline,
} = require('node:stream');

const {
  scrypt,
  randomFill,
  createCipheriv,
} = require('node:crypto');

const algorithm = 'aes-192-cbc';
const password = '用于生成密钥的密码';

// 首先，我们将生成密钥。密钥长度取决于算法。
// 在这种情况下，对于 aes192，它是 24 字节（192 位）。
scrypt(password, 'salt', 24, (err, key) => {
  if (err) throw err;
  // 然后，我们将生成一个随机初始化向量
  randomFill(new Uint8Array(16), (err, iv) => {
    if (err) throw err;

    const cipher = createCipheriv(algorithm, key, iv);

    const input = createReadStream('test.js');
    const output = createWriteStream('test.enc');

    pipeline(input, cipher, output, (err) => {
      if (err) throw err;
    });
  });
});
```

示例：使用 [`cipher.update()`][] 和 [`cipher.final()`][] 方法：

```mjs
const {
  scrypt,
  randomFill,
  createCipheriv,
} = await import('node:crypto');

const algorithm = 'aes-192-cbc';
const password = '用于生成密钥的密码';

// 首先，我们将生成密钥。密钥长度取决于算法。
// 在这种情况下，对于 aes192，它是 24 字节（192 位）。
scrypt(password, 'salt', 24, (err, key) => {
  if (err) throw err;
  // 然后，我们将生成一个随机初始化向量
  randomFill(new Uint8Array(16), (err, iv) => {
    if (err) throw err;

    const cipher = createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update('some clear text data', 'utf8', 'hex');
    encrypted += cipher.final('hex');
    console.log(encrypted);
  });
});
```

```cjs
const {
  scrypt,
  randomFill,
  createCipheriv,
} = require('node:crypto');

const algorithm = 'aes-192-cbc';
const password = '用于生成密钥的密码';

// 首先，我们将生成密钥。密钥长度取决于算法。
// 在这种情况下，对于 aes192，它是 24 字节（192 位）。
scrypt(password, 'salt', 24, (err, key) => {
  if (err) throw err;
  // 然后，我们将生成一个随机初始化向量
  randomFill(new Uint8Array(16), (err, iv) => {
    if (err) throw err;

    const cipher = createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update('some clear text data', 'utf8', 'hex');
    encrypted += cipher.final('hex');
    console.log(encrypted);
  });
});
```

### `cipher.final([outputEncoding])`

<!-- YAML
added: v0.1.94
-->

* `outputEncoding` {string} 返回值的 [编码][]。
* 返回：{Buffer | string} 任何剩余的加密内容。
  如果指定了 `outputEncoding`，则返回字符串。
  如果未提供 `outputEncoding`，则返回 [`Buffer`][]。

一旦调用了 `cipher.final()` 方法，`Cipheriv` 对象就不再可用于加密数据。尝试多次调用 `cipher.final()` 将导致抛出错误。

### `cipher.getAuthTag()`

<!-- YAML
added: v1.0.0
-->

* 返回：{Buffer} 当使用认证加密模式时（目前支持 `GCM`、`CCM`、`OCB` 和 `chacha20-poly1305`），
  `cipher.getAuthTag()` 方法返回一个 [`Buffer`][]，其中包含从给定数据计算出的_认证标签_。

`cipher.getAuthTag()` 方法应仅在使用 [`cipher.final()`][] 方法完成加密后调用。

如果在 `cipher` 实例创建期间设置了 `authTagLength` 选项，
此函数将正好返回 `authTagLength` 字节。

### `cipher.setAAD(buffer[, options])`

<!-- YAML
added: v1.0.0
-->

* `buffer` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `options` {Object} [`stream.transform` 选项][]
  * `plaintextLength` {number}
  * `encoding` {string} 当 `buffer` 是字符串时使用的字符串编码。
* 返回：{Cipheriv} 相同的 `Cipheriv` 实例用于方法链。

当使用认证加密模式时（目前支持 `GCM`、`CCM`、`OCB` 和 `chacha20-poly1305`），
`cipher.setAAD()` 方法设置用于_附加认证数据_ (AAD) 输入参数的值。

`plaintextLength` 选项对于 `GCM` 和 `OCB` 是可选的。当使用 `CCM` 时，
必须指定 `plaintextLength` 选项，并且其值必须与明文长度（字节）匹配。参见 [CCM 模式][]。

必须在 [`cipher.update()`][] 之前调用 `cipher.setAAD()` 方法。

### `cipher.setAutoPadding([autoPadding])`

<!-- YAML
added: v0.7.1
-->

* `autoPadding` {boolean} **默认：** `true`
* 返回：{Cipheriv} 相同的 `Cipheriv` 实例用于方法链。

当使用块加密算法时，`Cipheriv` 类将自动向输入数据添加填充以达到适当的块大小。要禁用默认填充，请调用 `cipher.setAutoPadding(false)`。

当 `autoPadding` 为 `false` 时，整个输入数据的长度必须是密码块大小的倍数，否则 [`cipher.final()`][] 将抛出错误。禁用自动填充对于非标准填充很有用，例如使用 `0x0` 而不是 PKCS 填充。

必须在 [`cipher.final()`][] 之前调用 `cipher.setAutoPadding()` 方法。

### `cipher.update(data[, inputEncoding][, outputEncoding])`

<!-- YAML
added: v0.1.94
changes:
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/5522
    description: "默认 `inputEncoding` 从 `binary` 改为 `utf8`。"
-->

* `data` {string|Buffer|TypedArray|DataView}
* `inputEncoding` {string} 数据的 [编码][]。
* `outputEncoding` {string} 返回值的 [编码][]。
* 返回：{Buffer | string}

使用 `data` 更新密码。如果给出了 `inputEncoding` 参数，
则 `data` 参数是使用指定编码的字符串。如果未给出 `inputEncoding`
参数，`data` 必须是 [`Buffer`][]、`TypedArray` 或 `DataView`。如果 `data` 是 [`Buffer`][]、`TypedArray` 或 `DataView`，则
忽略 `inputEncoding`。

`outputEncoding` 指定加密数据的输出格式。如果指定了 `outputEncoding`，
则返回使用指定编码的字符串。如果未提供 `outputEncoding`，则返回 [`Buffer`][]。

可以多次调用 `cipher.update()` 方法并传入新数据，直到调用 [`cipher.final()`][]。在 [`cipher.final()`][] 之后调用 `cipher.update()` 将导致抛出错误。

## 类：`Decipheriv`

<!-- YAML
added: v0.1.94
-->

* 继承：{stream.Transform}

`Decipheriv` 类的实例用于解密数据。该类可以通过以下两种方式使用：

* 作为一个既可读又可写的 [流][]，将纯加密数据写入以在可读侧产生未加密数据，或
* 使用 [`decipher.update()`][] 和 [`decipher.final()`][] 方法来产生未加密数据。

[`crypto.createDecipheriv()`][] 方法用于创建 `Decipheriv` 实例。不应直接使用 `new` 关键字创建 `Decipheriv` 对象。

示例：将 `Decipheriv` 对象用作流：

```mjs
import { Buffer } from 'node:buffer';
const {
  scryptSync,
  createDecipheriv,
} = await import('node:crypto');

const algorithm = 'aes-192-cbc';
const password = '用于生成密钥的密码';
// 密钥长度取决于算法。在这种情况下，对于 aes192，它是
// 24 字节（192 位）。
// 请改用异步的 `crypto.scrypt()`。
const key = scryptSync(password, 'salt', 24);
// IV 通常与密文一起传递。
const iv = Buffer.alloc(16, 0); // 初始化向量。

const decipher = createDecipheriv(algorithm, key, iv);

let decrypted = '';
decipher.on('readable', () => {
  let chunk;
  while (null !== (chunk = decipher.read())) {
    decrypted += chunk.toString('utf8');
  }
});
decipher.on('end', () => {
  console.log(decrypted);
  // 输出：一些明文数据
});

// 使用相同的算法、密钥和 iv 进行加密。
const encrypted =
  'e5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa';
decipher.write(encrypted, 'hex');
decipher.end();
```

```cjs
const {
  scryptSync,
  createDecipheriv,
} = require('node:crypto');
const { Buffer } = require('node:buffer');

const algorithm = 'aes-192-cbc';
const password = '用于生成密钥的密码';
// 密钥长度取决于算法。在这种情况下，对于 aes192，它是
// 24 字节（192 位）。
// 请改用异步的 `crypto.scrypt()`。
const key = scryptSync(password, 'salt', 24);
// IV 通常与密文一起传递。
const iv = Buffer.alloc(16, 0); // 初始化向量。

const decipher = createDecipheriv(algorithm, key, iv);

let decrypted = '';
decipher.on('readable', () => {
  let chunk;
  while (null !== (chunk = decipher.read())) {
    decrypted += chunk.toString('utf8');
  }
});
decipher.on('end', () => {
  console.log(decrypted);
  // 输出：一些明文数据
});

// 使用相同的算法、密钥和 iv 进行加密。
const encrypted =
  'e5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa';
decipher.write(encrypted, 'hex');
decipher.end();
```

示例：将 `Decipheriv` 对象用作流：

```mjs
import { Buffer } from 'node:buffer';
const {
  scryptSync,
  createDecipheriv,
} = await import('node:crypto');

const algorithm = 'aes-192-cbc';
const password = '用于生成密钥的密码';
// 密钥长度取决于算法。在这种情况下，对于 aes192，它是
// 24 字节（192 位）。
// 请改用异步的 `crypto.scrypt()`。
const key = scryptSync(password, 'salt', 24);
// IV 通常与密文一起传递。
const iv = Buffer.alloc(16, 0); // 初始化向量。

const decipher = createDecipheriv(algorithm, key, iv);

let decrypted = '';
decipher.on('readable', () => {
  let chunk;
  while (null !== (chunk = decipher.read())) {
    decrypted += chunk.toString('utf8');
  }
});
decipher.on('end', () => {
  console.log(decrypted);
  // 输出：一些明文数据
});

// 使用相同的算法、密钥和 iv 进行加密。
const encrypted =
  'e5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa';
decipher.write(encrypted, 'hex');
decipher.end();
```

```cjs
const {
  scryptSync,
  createDecipheriv,
} = require('node:crypto');
const { Buffer } = require('node:buffer');

const algorithm = 'aes-192-cbc';
const password = '用于生成密钥的密码';
// 密钥长度取决于算法。在这种情况下，对于 aes192，它是
// 24 字节（192 位）。
// 请改用异步的 `crypto.scrypt()`。
const key = scryptSync(password, 'salt', 24);
// IV 通常与密文一起传递。
const iv = Buffer.alloc(16, 0); // 初始化向量。

const decipher = createDecipheriv(algorithm, key, iv);

let decrypted = '';
decipher.on('readable', () => {
  let chunk;
  while (null !== (chunk = decipher.read())) {
    decrypted += chunk.toString('utf8');
  }
});
decipher.on('end', () => {
  console.log(decrypted);
  // 输出：一些明文数据
});

// 使用相同的算法、密钥和 iv 进行加密。
const encrypted =
  'e5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa';
decipher.write(encrypted, 'hex');
decipher.end();
```

示例：使用 `Decipheriv` 和管道流：

```mjs
import {
  createReadStream,
  createWriteStream,
} from 'node:fs';
import { Buffer } from 'node:buffer';
const {
  scryptSync,
  createDecipheriv,
} = await import('node:crypto');

const algorithm = 'aes-192-cbc';
const password = '用于生成密钥的密码';
// 请改用异步的 `crypto.scrypt()`。
const key = scryptSync(password, 'salt', 24);
// IV 通常与密文一起传递。
const iv = Buffer.alloc(16, 0); // 初始化向量。

const decipher = createDecipheriv(algorithm, key, iv);

const input = createReadStream('test.enc');
const output = createWriteStream('test.js');

input.pipe(decipher).pipe(output);
```

```cjs
const {
  createReadStream,
  createWriteStream,
} = require('node:fs');
const {
  scryptSync,
  createDecipheriv,
} = require('node:crypto');
const { Buffer } = require('node:buffer');

const algorithm = 'aes-192-cbc';
const password = '用于生成密钥的密码';
// 请改用异步的 `crypto.scrypt()`。
const key = scryptSync(password, 'salt', 24);
// IV 通常与密文一起传递。
const iv = Buffer.alloc(16, 0); // 初始化向量。

const decipher = createDecipheriv(algorithm, key, iv);

const input = createReadStream('test.enc');
const output = createWriteStream('test.js');

input.pipe(decipher).pipe(output);
```

示例：使用 [`decipher.update()`][] 和 [`decipher.final()`][] 方法：

```mjs
import { Buffer } from 'node:buffer';
const {
  scryptSync,
  createDecipheriv,
} = await import('node:crypto');

const algorithm = 'aes-192-cbc';
const password = '用于生成密钥的密码';
// 请改用异步的 `crypto.scrypt()`。
const key = scryptSync(password, 'salt', 24);
// IV 通常与密文一起传递。
const iv = Buffer.alloc(16, 0); // 初始化向量。

const decipher = createDecipheriv(algorithm, key, iv);

// 使用相同的算法、密钥和 iv 进行加密。
const encrypted =
  'e5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa';
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');
console.log(decrypted);
// 输出：一些明文数据
```

```cjs
const {
  scryptSync,
  createDecipheriv,
} = require('node:crypto');
const { Buffer } = require('node:buffer');

const algorithm = 'aes-192-cbc';
const password = '用于生成密钥的密码';
// 请改用异步的 `crypto.scrypt()`。
const key = scryptSync(password, 'salt', 24);
// IV 通常与密文一起传递。
const iv = Buffer.alloc(16, 0); // 初始化向量。

const decipher = createDecipheriv(algorithm, key, iv);

// 使用相同的算法、密钥和 iv 进行加密。
const encrypted =
  'e5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa';
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');
console.log(decrypted);
// 输出：一些明文数据
```

### `decipher.final([outputEncoding])`

<!-- YAML
added: v0.1.94
-->

* `outputEncoding` {string} 返回值的 [编码][]。
* 返回：{Buffer | string} 任何剩余的可解密内容。
  如果指定了 `outputEncoding`，则返回字符串。如果未提供 `outputEncoding`，则返回 [`Buffer`][]。

一旦调用了 `decipher.final()` 方法，`Decipheriv` 对象就不再可用于解密数据。尝试多次调用 `decipher.final()` 将导致抛出错误。

### `decipher.setAAD(buffer[, options])`

<!-- YAML
added: v1.0.0
changes:
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/35093
    description: buffer 参数可以是字符串或 ArrayBuffer，并且限制为不超过 2 ** 31 - 1 字节。
  - version: v7.2.0
    pr-url: https://github.com/nodejs/node/pull/9398
    description: "此方法现在返回对 `decipher` 的引用。"
-->

* `buffer` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `options` {Object} [`stream.transform` 选项][]
  * `plaintextLength` {number}
  * `encoding` {string} 当 `buffer` 为字符串时使用的字符串编码。
* 返回：{Decipheriv} 该方法链式调用时返回相同的 `Decipheriv` 实例。

当使用认证加密模式（目前支持 `GCM`、`CCM`、`OCB` 和 `chacha20-poly1305`）时，`decipher.setAAD()` 方法设置用于 _额外认证数据_ (AAD) 输入参数的值。

对于 `GCM`，`options` 参数是可选的。当使用 `CCM` 时，必须指定 `plaintextLength` 选项，并且其值必须与密文的字节长度匹配。参见 [CCM 模式][]。

必须在 [`decipher.update()`][] 之前调用 `decipher.setAAD()` 方法。

当传递字符串作为 `buffer` 时，请考虑 [将字符串用作加密 API 输入时的注意事项][]。

### `decipher.setAuthTag(buffer[, encoding])`

<!-- YAML
added: v1.0.0
changes:
  - version: v26.0.0
    pr-url: https://github.com/nodejs/node/pull/61084
    description: "创建 `decipher` 时未指定 `authTagLength` 选项而使用 128 位以外的 GCM 标签长度不再被允许。"
  - version:
    - v22.0.0
    - v20.13.0
    pr-url: https://github.com/nodejs/node/pull/52345
    description: "创建 `decipher` 时未指定 `authTagLength` 选项而使用 128 位以外的 GCM 标签长度已弃用。"
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/35093
    description: buffer 参数可以是字符串或 ArrayBuffer，并且限制为不超过 2 ** 31 - 1 字节。
  - version: v11.0.0
    pr-url: https://github.com/nodejs/node/pull/17825
    description: 如果 GCM 标签长度无效，此方法现在将抛出错误。
  - version: v7.2.0
    pr-url: https://github.com/nodejs/node/pull/9398
    description: "此方法现在返回对 `decipher` 的引用。"
-->

* `buffer` {string|Buffer|ArrayBuffer|TypedArray|DataView}
* `encoding` {string} 当 `buffer` 为字符串时使用的字符串编码。
* 返回：{Decipheriv} 该方法链式调用时返回相同的 `Decipheriv` 实例。

当使用认证加密模式（目前支持 `GCM`、`CCM`、`OCB` 和 `chacha20-poly1305`）时，`decipher.setAuthTag()` 方法用于传入接收到的 _认证标签_。如果未提供标签，或者密文已被篡改，[`decipher.final()`][] 将抛出错误，表明由于认证失败应丢弃密文。如果标签长度根据 [NIST SP 800-38D][] 无效，或者与 `authTagLength` 选项的值不匹配，`decipher.setAuthTag()` 将抛出错误。

对于 `CCM` 模式，必须在 [`decipher.update()`][] 之前调用 `decipher.setAuthTag()` 方法；对于 `GCM` 和 `OCB` 模式以及 `chacha20-poly1305`，必须在 [`decipher.final()`][] 之前调用。
`decipher.setAuthTag()` 只能调用一次。

当传递字符串作为认证标签时，请考虑 [将字符串用作加密 API 输入时的注意事项][]。

### `decipher.setAutoPadding([autoPadding])`

<!-- YAML
added: v0.7.1
-->

* `autoPadding` {boolean} **默认值：** `true`
* 返回：{Decipheriv} 该方法链式调用时返回相同的 `Decipheriv` 实例。

当数据在没有标准块填充的情况下被加密时，调用 `decipher.setAutoPadding(false)` 将禁用自动填充，以防止 [`decipher.final()`][] 检查并移除填充。

只有在输入数据的长度是密码块大小的倍数时，关闭自动填充才有效。

必须在 [`decipher.final()`][] 之前调用 `decipher.setAutoPadding()` 方法。

### `decipher.update(data[, inputEncoding][, outputEncoding])`

<!-- YAML
added: v0.1.94
changes:
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/5522
    description: "默认 `inputEncoding` 从 `binary` 更改为 `utf8`。"
-->

* `data` {string|Buffer|TypedArray|DataView}
* `inputEncoding` {string} `data` 字符串的 [编码][]。
* `outputEncoding` {string} 返回值的 [编码][]。
* 返回：{Buffer | string}

使用 `data` 更新 decipher。如果给出了 `inputEncoding` 参数，则 `data` 参数是使用指定编码的字符串。如果未给出 `inputEncoding` 参数，`data` 必须是 [`Buffer`][]。如果 `data` 是 [`Buffer`][]，则忽略 `inputEncoding`。

`outputEncoding` 指定加密数据的输出格式。如果指定了 `outputEncoding`，则返回使用指定编码的字符串。如果未提供 `outputEncoding`，则返回 [`Buffer`][]。

可以多次使用新数据调用 `decipher.update()` 方法，直到调用 [`decipher.final()`][]。在 [`decipher.final()`][] 之后调用 `decipher.update()` 将导致抛出错误。

即使底层密码实现了认证，此时从此函数返回的明文的真实性和完整性也可能不确定。对于认证加密算法，真实性通常仅在应用程序调用 [`decipher.final()`][] 时确立。

## 类：`DiffieHellman`

<!-- YAML
added: v0.5.0
-->

`DiffieHellman` 类是用于创建 Diffie-Hellman 密钥交换的工具。

`DiffieHellman` 类的实例可以使用 [`crypto.createDiffieHellman()`][] 函数创建。

```mjs
import assert from 'node:assert';

const {
  createDiffieHellman,
} = await import('node:crypto');

// 生成 Alice 的密钥...
const alice = createDiffieHellman(2048);
const aliceKey = alice.generateKeys();

// 生成 Bob 的密钥...
const bob = createDiffieHellman(alice.getPrime(), alice.getGenerator());
const bobKey = bob.generateKeys();

// 交换并生成秘密...
const aliceSecret = alice.computeSecret(bobKey);
const bobSecret = bob.computeSecret(aliceKey);

// 正常
assert.strictEqual(aliceSecret.toString('hex'), bobSecret.toString('hex'));
```

```cjs
const assert = require('node:assert');

const {
  createDiffieHellman,
} = require('node:crypto');

// 生成 Alice 的密钥...
const alice = createDiffieHellman(2048);
const aliceKey = alice.generateKeys();

// 生成 Bob 的密钥...
const bob = createDiffieHellman(alice.getPrime(), alice.getGenerator());
const bobKey = bob.generateKeys();

// 交换并生成秘密...
const aliceSecret = alice.computeSecret(bobKey);
const bobSecret = bob.computeSecret(aliceKey);

// 正常
assert.strictEqual(aliceSecret.toString('hex'), bobSecret.toString('hex'));
```

### `diffieHellman.computeSecret(otherPublicKey[, inputEncoding][, outputEncoding])`

<!-- YAML
added: v0.5.0
-->

* `otherPublicKey` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `inputEncoding` {string} `otherPublicKey` 字符串的 [编码][]。
* `outputEncoding` {string} 返回值的 [编码][]。
* 返回：{Buffer | string}

使用 `otherPublicKey` 作为另一方的公钥计算共享秘密，并返回计算出的共享秘密。提供的密钥使用指定的 `inputEncoding` 进行解释，秘密使用指定的 `outputEncoding` 进行编码。
如果未提供 `inputEncoding`，则 `otherPublicKey` 应为 [`Buffer`][]、`TypedArray` 或 `DataView`。

如果给出了 `outputEncoding`，则返回字符串；否则返回 [`Buffer`][]。

### `diffieHellman.generateKeys([encoding])`

<!-- YAML
added: v0.5.0
-->

* `encoding` {string} 返回值的 [编码][]。
* 返回：{Buffer | string}

生成私钥和公钥 Diffie-Hellman 密钥值（除非它们已经生成或计算过），并以指定的 `encoding` 返回公钥。此密钥应传输给另一方。
如果提供了 `encoding`，则返回字符串；否则返回 [`Buffer`][]。

This function is a thin wrapper around [`DH_generate_key()`][]. In particular,
once a private key has been generated or set, calling this function only
recomputes the public key from the existing private key. Since the public key is
determined by the private key, the result will be the same unless the private key
has been changed via [`diffieHellman.setPrivateKey()`][].

### `diffieHellman.getGenerator([encoding])`

<!-- YAML
added: v0.5.0
-->

* `encoding` {string} 返回值的 [编码][]。
* 返回：{Buffer | string}

返回指定 `encoding` 的 Diffie-Hellman 生成元。
如果提供了 `encoding`，则返回字符串；否则返回 [`Buffer`][]。

### `diffieHellman.getPrime([encoding])`

<!-- YAML
added: v0.5.0
-->

* `encoding` {string} 返回值的 [编码][]。
* 返回：{Buffer | string}

返回指定 `encoding` 的 Diffie-Hellman 素数。
如果提供了 `encoding`，则返回字符串；否则返回 [`Buffer`][]。

### `diffieHellman.getPrivateKey([encoding])`

<!-- YAML
added: v0.5.0
-->

* `encoding` {string} 返回值的 [编码][]。
* 返回：{Buffer | string}

返回指定 `encoding` 的 Diffie-Hellman 私钥。
如果提供了 `encoding`，则返回字符串；否则返回 [`Buffer`][]。

### `diffieHellman.getPublicKey([encoding])`

<!-- YAML
added: v0.5.0
-->

* `encoding` {string} 返回值的 [编码][]。
* 返回：{Buffer | string}

返回指定 `encoding` 的 Diffie-Hellman 公钥。
如果提供了 `encoding`，则返回字符串；否则返回 [`Buffer`][]。

### `diffieHellman.setPrivateKey(privateKey[, encoding])`

<!-- YAML
added: v0.5.0
-->

* `privateKey` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `encoding` {string} `privateKey` 字符串的 [编码][]。

设置 Diffie-Hellman 私钥。如果提供了 `encoding` 参数，`privateKey` 应为字符串。如果未提供 `encoding`，`privateKey` 应为 [`Buffer`][]、`TypedArray` 或 `DataView`。

此函数不会自动计算关联的公钥。可以使用 [`diffieHellman.setPublicKey()`][] 或 [`diffieHellman.generateKeys()`][] 手动提供公钥或自动派生它。

### `diffieHellman.setPublicKey(publicKey[, encoding])`

<!-- YAML
added: v0.5.0
-->

* `publicKey` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `encoding` {string} `publicKey` 字符串的 [编码][]。

设置 Diffie-Hellman 公钥。如果提供了 `encoding` 参数，`publicKey` 应为字符串。如果未提供 `encoding`，`publicKey` 应为 [`Buffer`][]、`TypedArray` 或 `DataView`。

### `diffieHellman.verifyError`

<!-- YAML
added: v0.11.12
-->

位字段，包含在 `DiffieHellman` 对象初始化期间执行的检查所产生的任何警告和/或错误。

此属性的有效值如下（在 `node:constants` 模块中定义）：

* `DH_CHECK_P_NOT_SAFE_PRIME`
* `DH_CHECK_P_NOT_PRIME`
* `DH_UNABLE_TO_CHECK_GENERATOR`
* `DH_NOT_SUITABLE_GENERATOR`

## 类：`DiffieHellmanGroup`

<!-- YAML
added: v0.7.5
-->

`DiffieHellmanGroup` 类将众所周知的 modp 组作为其参数。
它的工作方式与 `DiffieHellman` 相同，只不过它不允许在创建后更改其密钥。换句话说，它不实现 `setPublicKey()` 或 `setPrivateKey()` 方法。

```mjs
const { createDiffieHellmanGroup } = await import('node:crypto');
const dh = createDiffieHellmanGroup('modp16');
```

```cjs
const { createDiffieHellmanGroup } = require('node:crypto');
const dh = createDiffieHellmanGroup('modp16');
```

支持以下组：

* `'modp14'` (2048 位，[RFC 3526][] 第 3 节)
* `'modp15'` (3072 位，[RFC 3526][] 第 4 节)
* `'modp16'` (4096 位，[RFC 3526][] 第 5 节)
* `'modp17'` (6144 位，[RFC 3526][] 第 6 节)
* `'modp18'` (8192 位，[RFC 3526][] 第 7 节)

以下组仍然受支持但已弃用（参见 [注意事项][]）：

* `'modp1'` (768 位，[RFC 2409][] 第 6.1 节) <span class="deprecated-inline"></span>
* `'modp2'` (1024 位，[RFC 2409][] 第 6.2 节) <span class="deprecated-inline"></span>
* `'modp5'` (1536 位，[RFC 3526][] 第 2 节) <span class="deprecated-inline"></span>

这些已弃用的组可能会在未来的 Node.js 版本中被移除。

## 类：`ECDH`

<!-- YAML
added: v0.11.14
-->

`ECDH` 类是用于创建椭圆曲线 Diffie-Hellman (ECDH) 密钥交换的工具。

`ECDH` 类的实例可以使用 [`crypto.createECDH()`][] 函数创建。

```mjs
import assert from 'node:assert';

const {
  createECDH,
} = await import('node:crypto');

// 生成 Alice 的密钥...
const alice = createECDH('secp521r1');
const aliceKey = alice.generateKeys();

// 生成 Bob 的密钥...
const bob = createECDH('secp521r1');
const bobKey = bob.generateKeys();

// 交换并生成秘密...
const aliceSecret = alice.computeSecret(bobKey);
const bobSecret = bob.computeSecret(aliceKey);

assert.strictEqual(aliceSecret.toString('hex'), bobSecret.toString('hex'));
// 正常
```

```cjs
const assert = require('node:assert');

const {
  createECDH,
} = require('node:crypto');

// 生成 Alice 的密钥...
const alice = createECDH('secp521r1');
const aliceKey = alice.generateKeys();

// 生成 Bob 的密钥...
const bob = createECDH('secp521r1');
const bobKey = bob.generateKeys();

// 交换并生成秘密...
const aliceSecret = alice.computeSecret(bobKey);
const bobSecret = bob.computeSecret(aliceKey);

assert.strictEqual(aliceSecret.toString('hex'), bobSecret.toString('hex'));
// 正常
```

### 静态方法：`ECDH.convertKey(key, curve[, inputEncoding[, outputEncoding[, format]]])`

<!-- YAML
added: v10.0.0
-->

* `key` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `curve` {string}
* `inputEncoding` {string} `key` 字符串的 [编码][]。
* `outputEncoding` {string} 返回值的 [编码][]。
* `format` {string} **默认：** `'uncompressed'`
* 返回：{Buffer | string}

将由 `key` 和 `curve` 指定的 EC Diffie-Hellman 公钥转换为由 `format` 指定的格式。`format` 参数指定点编码，可以是 `'compressed'`、`'uncompressed'` 或 `'hybrid'`。提供的密钥使用指定的 `inputEncoding` 进行解释，返回的密钥使用指定的 `outputEncoding` 进行编码。

使用 [`crypto.getCurves()`][] 获取可用曲线名称列表。
在最近的 OpenSSL 版本中，`openssl ecparam -list_curves` 也将显示每个可用椭圆曲线的名称和描述。

如果未指定 `format`，点将以 `'uncompressed'` 格式返回。

如果未提供 `inputEncoding`，`key` 应为 [`Buffer`][]、`TypedArray` 或 `DataView`。

示例（解压缩密钥）：

```mjs
const {
  createECDH,
  ECDH,
} = await import('node:crypto');

const ecdh = createECDH('secp256k1');
ecdh.generateKeys();

const compressedKey = ecdh.getPublicKey('hex', 'compressed');

const uncompressedKey = ECDH.convertKey(compressedKey,
                                        'secp256k1',
                                        'hex',
                                        'hex',
                                        'uncompressed');

// 转换后的密钥和未压缩的公钥应该相同
console.log(uncompressedKey === ecdh.getPublicKey('hex'));
```

```cjs
const {
  createECDH,
  ECDH,
} = require('node:crypto');

const ecdh = createECDH('secp256k1');
ecdh.generateKeys();

const compressedKey = ecdh.getPublicKey('hex', 'compressed');

const uncompressedKey = ECDH.convertKey(compressedKey,
                                        'secp256k1',
                                        'hex',
                                        'hex',
                                        'uncompressed');

// 转换后的密钥和未压缩的公钥应该相同
console.log(uncompressedKey === ecdh.getPublicKey('hex'));
```

### `ecdh.computeSecret(otherPublicKey[, inputEncoding][, outputEncoding])`

<!-- YAML
added: v0.11.14
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/16849
    description: 更改错误格式以更好地支持无效公钥错误。
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/5522
    description: "默认 `inputEncoding` 从 `binary` 更改为 `utf8`。"
-->

* `otherPublicKey` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `inputEncoding` {string} `otherPublicKey` 字符串的 [编码][]。
* `outputEncoding` {string} 返回值的 [编码][]。
* 返回：{Buffer | string}

使用 `otherPublicKey` 作为另一方的公钥计算共享秘密，并返回计算出的共享秘密。提供的密钥使用指定的 `inputEncoding` 进行解释，返回的秘密使用指定的 `outputEncoding` 进行编码。
如果未提供 `inputEncoding`，则 `otherPublicKey` 应为 [`Buffer`][]、`TypedArray` 或 `DataView`。

如果给出了 `outputEncoding`，则返回字符串；否则返回 [`Buffer`][]。

当 `otherPublicKey` 位于椭圆曲线之外时，`ecdh.computeSecret` 将抛出 `ERR_CRYPTO_ECDH_INVALID_PUBLIC_KEY` 错误。由于 `otherPublicKey` 通常是通过不安全网络从远程用户提供的，因此请务必相应地处理此异常。

### `ecdh.generateKeys([encoding[, format]])`

<!-- YAML
added: v0.11.14
-->

* `encoding` {string} 返回值的 [编码][]。
* `format` {string} **默认：** `'uncompressed'`
* 返回：{Buffer | string}

生成私钥和公钥 EC Diffie-Hellman 密钥值，并以指定的 `format` 和 `encoding` 返回公钥。此密钥应传输给另一方。

`format` 参数指定点编码，可以是 `'compressed'` 或 `'uncompressed'`。如果未指定 `format`，点将以 `'uncompressed'` 格式返回。

如果提供了 `encoding`，则返回字符串；否则返回 [`Buffer`][]。

### `ecdh.getPrivateKey([encoding])`

<!-- YAML
added: v0.11.14
-->

* `encoding` {string} 返回值的 [编码][]。
* 返回：{Buffer | string} 指定 `encoding` 的 EC Diffie-Hellman。

如果指定了 `encoding`，则返回字符串；否则返回 [`Buffer`][]。

### `ecdh.getPublicKey([encoding][, format])`

<!-- YAML
added: v0.11.14
-->

* `encoding` {string} 返回值的 [编码][]。
* `format` {string} **默认：** `'uncompressed'`
* 返回：{Buffer | string} 指定 `encoding` 和 `format` 的 EC Diffie-Hellman 公钥。

`format` 参数指定点编码，可以是 `'compressed'` 或 `'uncompressed'`。如果未指定 `format`，点将以 `'uncompressed'` 格式返回。

如果指定了 `encoding`，则返回字符串；否则返回 [`Buffer`][]。

### `ecdh.setPrivateKey(privateKey[, encoding])`

<!-- YAML
added: v0.11.14
-->

* `privateKey` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `encoding` {string} `privateKey` 字符串的 [编码][]。

设置 EC Diffie-Hellman 私钥。
如果提供了 `encoding`，`privateKey` 应为字符串；否则 `privateKey` 应为 [`Buffer`][]、`TypedArray` 或 `DataView`。

如果 `privateKey` 对于创建 `ECDH` 对象时指定的曲线无效，则会抛出错误。设置私钥后，关联的公点（密钥）也会生成并设置在 `ECDH` 对象中。

### `ecdh.setPublicKey(publicKey[, encoding])`

<!-- YAML
added: v0.11.14
deprecated: v5.2.0
-->

> 稳定性：0 - 已弃用

* `publicKey` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `encoding` {string} `publicKey` 字符串的 [编码][]。

设置 EC Diffie-Hellman 公钥。
如果提供了 `encoding`，`publicKey` 应为字符串；否则应为 [`Buffer`][]、`TypedArray` 或 `DataView`。

通常没有理由调用此方法，因为 `ECDH` 只需要私钥和另一方的公钥来计算共享秘密。通常会调用 [`ecdh.generateKeys()`][] 或 [`ecdh.setPrivateKey()`][]。[`ecdh.setPrivateKey()`][] 方法尝试生成与正在设置的私钥关联的公点/密钥。

示例（获取共享秘密）：

```mjs
const {
  createECDH,
  createHash,
} = await import('node:crypto');

const alice = createECDH('secp256k1');
const bob = createECDH('secp256k1');

// 这是一种指定 Alice 之前的私钥之一的快捷方式。
// 在实际应用程序中使用如此可预测的私钥是不明智的。
alice.setPrivateKey(
  createHash('sha256').update('alice', 'utf8').digest(),
);

// Bob 使用新生成的加密强度高的
// 伪随机密钥对
bob.generateKeys();

const aliceSecret = alice.computeSecret(bob.getPublicKey(), null, 'hex');
const bobSecret = bob.computeSecret(alice.getPublicKey(), null, 'hex');

// aliceSecret 和 bobSecret 应该是相同的共享秘密值
console.log(aliceSecret === bobSecret);
```

```cjs
const {
  createECDH,
  createHash,
} = require('node:crypto');

const alice = createECDH('secp256k1');
const bob = createECDH('secp256k1');

// 这是一种指定 Alice 之前的私钥之一的快捷方式。
// 在实际应用程序中使用如此可预测的私钥是不明智的。
alice.setPrivateKey(
  createHash('sha256').update('alice', 'utf8').digest(),
);

// Bob 使用新生成的加密强度高的
// 伪随机密钥对
bob.generateKeys();

const aliceSecret = alice.computeSecret(bob.getPublicKey(), null, 'hex');
const bobSecret = bob.computeSecret(alice.getPublicKey(), null, 'hex');

// aliceSecret 和 bobSecret 应该是相同的共享秘密值
console.log(aliceSecret === bobSecret);
```

## 类：`Hash`

<!-- YAML
added: v0.1.92
-->

* 继承：{stream.Transform}

`Hash` 类是一个用于创建数据哈希摘要的工具。它可以通过以下两种方式使用：

* 作为一个既可读又可写的 [流][]，数据被写入以在可读侧产生计算出的哈希摘要，或
* 使用 [`hash.update()`][] 和 [`hash.digest()`][] 方法来产生计算出的哈希。

[`crypto.createHash()`][] 方法用于创建 `Hash` 实例。`Hash` 对象不应直接使用 `new` 关键字创建。

示例：将 `Hash` 对象用作流：

```mjs
const {
  createHash,
} = await import('node:crypto');

const hash = createHash('sha256');

hash.on('readable', () => {
  // 哈希流只会产生一个元素。
  const data = hash.read();
  if (data) {
    console.log(data.toString('hex'));
    // 输出：
    //   6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50
  }
});

hash.write('some data to hash');
hash.end();
```

```cjs
const {
  createHash,
} = require('node:crypto');

const hash = createHash('sha256');

hash.on('readable', () => {
  // 哈希流只会产生一个元素。
  const data = hash.read();
  if (data) {
    console.log(data.toString('hex'));
    // 输出：
    //   6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50
  }
});

hash.write('some data to hash');
hash.end();
```

示例：使用 `Hash` 和管道流：

```mjs
import { createReadStream } from 'node:fs';
import { stdout } from 'node:process';
const { createHash } = await import('node:crypto');

const hash = createHash('sha256');

const input = createReadStream('test.js');
input.pipe(hash).setEncoding('hex').pipe(stdout);
```

```cjs
const { createReadStream } = require('node:fs');
const { createHash } = require('node:crypto');
const { stdout } = require('node:process');

const hash = createHash('sha256');

const input = createReadStream('test.js');
input.pipe(hash).setEncoding('hex').pipe(stdout);
```

示例：使用 [`hash.update()`][] 和 [`hash.digest()`][] 方法：

```mjs
const {
  createHash,
} = await import('node:crypto');

const hash = createHash('sha256');

hash.update('some data to hash');
console.log(hash.digest('hex'));
// 输出：
//   6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50
```

```cjs
const {
  createHash,
} = require('node:crypto');

const hash = createHash('sha256');

hash.update('some data to hash');
console.log(hash.digest('hex'));
// 输出：
//   6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50
```

### `hash.copy([options])`

<!-- YAML
added: v13.1.0
-->

* `options` {Object} [`stream.transform` 选项][]
* 返回：{Hash}

创建一个新的 `Hash` 对象，其中包含当前 `Hash` 对象内部状态的深拷贝。

可选的 `options` 参数控制流行为。对于 XOF 哈希函数（如 `'shake256'`），`outputLength` 选项可用于指定所需的输出长度（单位字节）。

如果在调用 [`hash.digest()`][] 方法后尝试复制 `Hash` 对象，将抛出错误。

```mjs
// 计算滚动哈希。
const {
  createHash,
} = await import('node:crypto');

const hash = createHash('sha256');

hash.update('one');
console.log(hash.copy().digest('hex'));

hash.update('two');
console.log(hash.copy().digest('hex'));

hash.update('three');
console.log(hash.copy().digest('hex'));

// 等等。
```

```cjs
// 计算滚动哈希。
const {
  createHash,
} = require('node:crypto');

const hash = createHash('sha256');

hash.update('one');
console.log(hash.copy().digest('hex'));

hash.update('two');
console.log(hash.copy().digest('hex'));

hash.update('three');
console.log(hash.copy().digest('hex'));

// 等等。
```

### `hash.digest([encoding])`

<!-- YAML
added: v0.1.92
-->

* `encoding` {string} 返回值的 [编码][]。
* 返回：{Buffer | string}

计算传递给哈希的所有数据的摘要（使用 [`hash.update()`][] 方法）。
如果提供了 `encoding`，则返回字符串；否则返回 [`Buffer`][]。

调用 `hash.digest()` 方法后，`Hash` 对象不能再被使用。多次调用将导致抛出错误。

### `hash.update(data[, inputEncoding])`

<!-- YAML
added: v0.1.92
changes:
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/5522
    description: "默认 `inputEncoding` 从 `binary` 更改为 `utf8`。"
-->

* `data` {string|Buffer|TypedArray|DataView}
* `inputEncoding` {string} `data` 字符串的 [编码][]。

使用给定的 `data` 更新哈希内容，其编码由 `inputEncoding` 给出。
如果未提供 `encoding`，且 `data` 是字符串，则强制使用 `'utf8'` 编码。如果 `data` 是 [`Buffer`][]、`TypedArray` 或 `DataView`，则忽略 `inputEncoding`。

随着数据流式传输，可以多次调用此方法并传入新数据。

## 类：`Hmac`

<!-- YAML
added: v0.1.94
-->

* 继承自：{stream.Transform}

`Hmac` 类是一个用于创建加密 HMAC 摘要的工具。它可以通过以下两种方式使用：

* 作为一个既可读又可写的 [流][]，数据被写入以在可读侧产生计算出的 HMAC 摘要，或
* 使用 [`hmac.update()`][] 和 [`hmac.digest()`][] 方法来产生计算出的 HMAC 摘要。

[`crypto.createHmac()`][] 方法用于创建 `Hmac` 实例。`Hmac` 对象不应直接使用 `new` 关键字创建。

示例：将 `Hmac` 对象用作流：

```mjs
const {
  createHmac,
} = await import('node:crypto');

const hmac = createHmac('sha256', 'a secret');

hmac.on('readable', () => {
  // 哈希流只会产生一个元素。
  const data = hmac.read();
  if (data) {
    console.log(data.toString('hex'));
    // 输出：
    //   7fd04df92f636fd450bc841c9418e5825c17f33ad9c87c518115a45971f7f77e
  }
});

hmac.write('some data to hash');
hmac.end();
```

```cjs
const {
  createHmac,
} = require('node:crypto');

const hmac = createHmac('sha256', 'a secret');

hmac.on('readable', () => {
  // 哈希流只会产生一个元素。
  const data = hmac.read();
  if (data) {
    console.log(data.toString('hex'));
    // 输出：
    //   7fd04df92f636fd450bc841c9418e5825c17f33ad9c87c518115a45971f7f77e
  }
});

hmac.write('some data to hash');
hmac.end();
```

示例：使用 `Hmac` 和管道流：

```mjs
import { createReadStream } from 'node:fs';
import { stdout } from 'node:process';
const {
  createHmac,
} = await import('node:crypto');

const hmac = createHmac('sha256', 'a secret');

const input = createReadStream('test.js');
input.pipe(hmac).pipe(stdout);
```

```cjs
const {
  createReadStream,
} = require('node:fs');
const {
  createHmac,
} = require('node:crypto');
const { stdout } = require('node:process');

const hmac = createHmac('sha256', 'a secret');

const input = createReadStream('test.js');
input.pipe(hmac).pipe(stdout);
```

示例：使用 [`hmac.update()`][] 和 [`hmac.digest()`][] 方法：

```mjs
const {
  createHmac,
} = await import('node:crypto');

const hmac = createHmac('sha256', 'a secret');

hmac.update('some data to hash');
console.log(hmac.digest('hex'));
// 输出：
//   7fd04df92f636fd450bc841c9418e5825c17f33ad9c87c518115a45971f7f77e
```

```cjs
const {
  createHmac,
} = require('node:crypto');

const hmac = createHmac('sha256', 'a secret');

hmac.update('some data to hash');
console.log(hmac.digest('hex'));
// 输出：
//   7fd04df92f636fd450bc841c9418e5825c17f33ad9c87c518115a45971f7f77e
```

### `hmac.digest([encoding])`

<!-- YAML
added: v0.1.94
-->

* `encoding` {string} 返回值的 [编码][]。
* 返回：{Buffer | string}

计算使用 [`hmac.update()`][] 传递的所有数据的 HMAC 摘要。
如果提供了 `encoding`，则返回字符串；否则返回 [`Buffer`][]。

调用 `hmac.digest()` 后，`Hmac` 对象不能再被使用。多次调用 `hmac.digest()` 将导致抛出错误。

### `hmac.update(data[, inputEncoding])`

<!-- YAML
added: v0.1.94
changes:
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/5522
    description: "默认 `inputEncoding` 从 `binary` 改为 `utf8`。"
-->

* `data` {string|Buffer|TypedArray|DataView}
* `inputEncoding` {string} `data` 字符串的 [编码][]。

使用给定的 `data` 更新 `Hmac` 内容，其编码由 `inputEncoding` 给出。
如果未提供 `encoding`，且 `data` 是字符串，则强制使用 `'utf8'` 编码。如果 `data` 是 [`Buffer`][]、`TypedArray` 或 `DataView`，则忽略 `inputEncoding`。

随着数据流式传输，可以多次调用此方法并传入新数据。

## 类：`KeyObject`

<!-- YAML
added: v11.6.0
changes:
  - version: v24.6.0
    pr-url: https://github.com/nodejs/node/pull/59259
    description: 添加对 ML-DSA 密钥的支持。
  - version:
    - v14.5.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/33360
    description: "此类的实例现在可以使用 `postMessage` 传递给 worker 线程。"
  - version: v11.13.0
    pr-url: https://github.com/nodejs/node/pull/26438
    description: 此类现在已导出。
-->

Node.js 使用 `KeyObject` 类来表示对称或非对称密钥，并且每种密钥公开不同的函数。
[`crypto.createSecretKey()`][]、[`crypto.createPublicKey()`][] 和 [`crypto.createPrivateKey()`][] 方法用于创建 `KeyObject` 实例。`KeyObject` 对象不应直接使用 `new` 关键字创建。

由于安全功能的改进，大多数应用程序应考虑使用新的 `KeyObject` API，而不是将密钥作为字符串或 `Buffer` 传递。

`KeyObject` 实例可以通过 [`postMessage()`][] 传递给其他线程。接收者获得一个克隆的 `KeyObject`，并且 `KeyObject` 不需要列在 `transferList` 参数中。

### 静态方法：`KeyObject.from(key)`

<!-- YAML
added: v15.0.0
changes:
  - version: v26.0.0
    pr-url: https://github.com/nodejs/node/pull/62453
    description: "将不可提取的 CryptoKey 作为 `key` 传递已弃用。"
-->

* `key` {CryptoKey}
* 返回：{KeyObject}

返回 {CryptoKey} 底层的 {KeyObject}。返回的 {KeyObject} 不保留原始 {CryptoKey} 上 Web Crypto API 施加的任何限制，例如允许的密钥用法、算法或哈希算法绑定，以及可提取性标志。特别是，返回的 {KeyObject} 的底层密钥材料总是可以导出的。

```mjs
const { KeyObject } = await import('node:crypto');
const { subtle } = globalThis.crypto;

const key = await subtle.generateKey({
  name: 'HMAC',
  hash: 'SHA-256',
  length: 256,
}, true, ['sign', 'verify']);

const keyObject = KeyObject.from(key);
console.log(keyObject.symmetricKeySize);
// 输出：32（对称密钥大小，单位字节）
```

```cjs
const { KeyObject } = require('node:crypto');
const { subtle } = globalThis.crypto;

(async function() {
  const key = await subtle.generateKey({
    name: 'HMAC',
    hash: 'SHA-256',
    length: 256,
  }, true, ['sign', 'verify']);

  const keyObject = KeyObject.from(key);
  console.log(keyObject.symmetricKeySize);
  // 输出：32（对称密钥大小，单位字节）
})();
```

### `keyObject.asymmetricKeyDetails`

<!-- YAML
added: v15.7.0
changes:
  - version: v16.9.0
    pr-url: https://github.com/nodejs/node/pull/39851
    description: "公开 RSA-PSS 密钥的 `RSASSA-PSS-params` 序列参数。"
-->

* 类型：{Object}
  * `modulusLength` {number} 密钥大小，单位比特（RSA, DSA）。
  * `publicExponent` {bigint} 公钥指数（RSA）。
  * `hashAlgorithm` {string} 消息摘要名称（RSA-PSS）。
  * `mgf1HashAlgorithm` {string} MGF1 使用的消息摘要名称（RSA-PSS）。
  * `saltLength` {number} 最小盐长度，单位字节（RSA-PSS）。
  * `divisorLength` {number} `q` 的大小，单位比特（DSA）。
  * `namedCurve` {string} 曲线名称（EC）。

此属性仅存在于非对称密钥上。根据密钥类型，此对象包含有关密钥的信息。通过此属性获得的任何信息都不能用于唯一标识密钥或危害密钥的安全性。

对于 RSA-PSS 密钥，如果密钥材料包含 `RSASSA-PSS-params` 序列，则将设置 `hashAlgorithm`、`mgf1HashAlgorithm` 和 `saltLength` 属性。

其他密钥详细信息可能会通过其他属性通过此 API 公开。

### `keyObject.asymmetricKeyType`

<!-- YAML
added: v11.6.0
changes:
  - version: v24.8.0
    pr-url: https://github.com/nodejs/node/pull/59537
    description: 添加对 SLH-DSA 密钥的支持。
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59461
    description: 添加对 ML-KEM 密钥的支持。
  - version: v24.6.0
    pr-url: https://github.com/nodejs/node/pull/59259
    description: 添加对 ML-DSA 密钥的支持。
  - version:
     - v13.9.0
     - v12.17.0
    pr-url: https://github.com/nodejs/node/pull/31178
    description: "添加了对 `'dh'` 的支持。"
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/26960
    description: "添加了对 `'rsa-pss'` 的支持。"
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/26786
    description: "此属性现在对于无法识别类型的 KeyObject 实例返回 `undefined`，而不是中止。"
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/26774
    description: "添加了对 `'x25519'` 和 `'x448'` 的支持。"
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/26319
    description: "添加了对 `'ed25519'` 和 `'ed448'` 的支持。"
-->

* 类型：{string}

对于非对称密钥，此属性表示密钥的类型。请参阅支持的 [非对称密钥类型][]。

对于无法识别的 `KeyObject` 类型和对称密钥，此属性为 `undefined`。

### `keyObject.equals(otherKeyObject)`

<!-- YAML
added:
  - v17.7.0
  - v16.15.0
-->

* `otherKeyObject` {KeyObject} 用于与 `keyObject` 比较的 `KeyObject`。
* 返回：{boolean}

根据密钥是否具有完全相同的类型、值和参数返回 `true` 或 `false`。此方法不是 [恒定时间](https://en.wikipedia.org/wiki/Timing_attack)。

### `keyObject.export([options])`

<!-- YAML
added: v11.6.0
changes:
  - version: v26.1.0
    pr-url: https://github.com/nodejs/node/pull/62706
    description: 为 ML-KEM 和 SLH-DSA 密钥类型添加了 JWK 格式支持。
  - version: v26.0.0
    pr-url: https://github.com/nodejs/node/pull/62178
    description: 现在在可用种子时，ML-KEM 和 ML-DSA 私钥的 `'pkcs8'` 导出默认使用仅种子格式。
  - version: v24.15.0
    pr-url: https://github.com/nodejs/node/pull/62240
    description: 添加对 `'raw-public'`、`'raw-private'` 和 `'raw-seed'` 格式的支持。
  - version: v15.9.0
    pr-url: https://github.com/nodejs/node/pull/37081
    description: "添加了对 `'jwk'` 格式的支持。"
-->

* `options` {Object}
* 返回：{string | Buffer | Object}

对于对称密钥，可以使用以下编码选项：

* `format` {string} 必须是 `'buffer'`（默认）或 `'jwk'`。

对于公钥，可以使用以下编码选项：

* `format` {string} 必须是 `'pem'`、`'der'`、`'jwk'` 或 `'raw-public'`。请参阅 [非对称密钥类型][] 了解格式支持。
* `type` {string} 当 `format` 为 `'pem'` 或 `'der'` 时，必须是 `'pkcs1'`（仅 RSA）或 `'spki'`。对于使用 `'raw-public'` 格式的 EC 密钥，可以是 `'uncompressed'`（默认）或 `'compressed'`。当 `format` 为 `'jwk'` 时忽略。

对于私钥，可以使用以下编码选项：

* `format` {string} 必须是 `'pem'`、`'der'`、`'jwk'`、`'raw-private'` 或 `'raw-seed'`。请参阅 [非对称密钥类型][] 了解格式支持。
* `type` {string} 当 `format` 为 `'pem'` 或 `'der'` 时，必须是 `'pkcs1'`（仅 RSA）、`'pkcs8'` 或 `'sec1'`（仅 EC）。当 `format` 为 `'jwk'`、`'raw-private'` 或 `'raw-seed'` 时忽略。
* `cipher` {string} 如果指定，私钥将使用给定的 `cipher` 和 `passphrase` 通过 PKCS#5 v2.0 基于密码的加密进行加密。当 `format` 为 `'jwk'`、`'raw-private'` 或 `'raw-seed'` 时忽略。
* `passphrase` {string | Buffer} 用于加密的密码短语。指定 `cipher` 时必需。

结果类型取决于所选的编码格式，当为 PEM 时结果是字符串，当为 DER 时将是包含 DER 编码数据的 buffer，当为 [JWK][] 时将是对象。原始格式返回包含原始密钥材料的 {Buffer}。

可以通过指定 `cipher` 和 `passphrase` 来加密私钥。
PKCS#8 `type` 支持任何密钥算法的 PEM 和 DER `format` 加密。
PKCS#1 和 SEC1 仅在使用 PEM `format` 时可以加密。
为了最大兼容性，对加密私钥使用 PKCS#8。
由于 PKCS#8 定义了自己的加密机制，加密 PKCS#8 密钥时不支持 PEM 级加密。
请参阅 [RFC 5208][] 了解 PKCS#8 加密，[RFC 1421][] 了解 PKCS#1 和 SEC1 加密。

### `keyObject.symmetricKeySize`

<!-- YAML
added: v11.6.0
-->

* 类型：{number}

对于密钥，此属性表示密钥的大小（单位字节）。此属性对于非对称密钥为 `undefined`。

### `keyObject.toCryptoKey(algorithm, extractable, keyUsages)`

<!-- YAML
added:
 - v23.0.0
 - v22.10.0
-->

<!--lint disable maximum-line-length remark-lint-->

* `algorithm` {string|Algorithm|RsaHashedImportParams|EcKeyImportParams|HmacImportParams}

<!--lint enable maximum-line-length remark-lint-->

* `extractable` {boolean}
* `keyUsages` {string\[]} 请参阅 [密钥用法][]。
* 返回：{CryptoKey}

将 `KeyObject` 实例转换为 `CryptoKey`。

### `keyObject.type`

<!-- YAML
added: v11.6.0
-->

* 类型：{string}

根据此 `KeyObject` 的类型，此属性对于密钥（对称）为 `'secret'`，对于公钥（非对称）为 `'public'`，或对于私钥（非对称）为 `'private'`。

## 类：`Sign`

<!-- YAML
added: v0.1.92
-->

* 继承自：{stream.Writable}

`Sign` 类是一个用于生成签名的工具。它可以通过以下两种方式使用：

* 作为可写 [流][]，将待签名的数据写入其中，并使用 [`sign.sign()`][] 方法生成并返回签名，或者
* 使用 [`sign.update()`][] 和 [`sign.sign()`][] 方法来生成签名。

[`crypto.createSign()`][] 方法用于创建 `Sign` 实例。参数是要使用的哈希函数字符串名称。不应直接使用 `new` 关键字创建 `Sign` 对象。

示例：将 `Sign` 和 [`Verify`][] 对象作为流使用：

```mjs
const {
  generateKeyPairSync,
  createSign,
  createVerify,
} = await import('node:crypto');

const { privateKey, publicKey } = generateKeyPairSync('ec', {
  namedCurve: 'sect239k1',
});

const sign = createSign('SHA256');
sign.write('some data to sign');
sign.end();
const signature = sign.sign(privateKey, 'hex');

const verify = createVerify('SHA256');
verify.write('some data to sign');
verify.end();
console.log(verify.verify(publicKey, signature, 'hex'));
// 输出：true
```

```cjs
const {
  generateKeyPairSync,
  createSign,
  createVerify,
} = require('node:crypto');

const { privateKey, publicKey } = generateKeyPairSync('ec', {
  namedCurve: 'sect239k1',
});

const sign = createSign('SHA256');
sign.write('some data to sign');
sign.end();
const signature = sign.sign(privateKey, 'hex');

const verify = createVerify('SHA256');
verify.write('some data to sign');
verify.end();
console.log(verify.verify(publicKey, signature, 'hex'));
// 输出：true
```

示例：使用 [`sign.update()`][] 和 [`verify.update()`][] 方法：

```mjs
const {
  generateKeyPairSync,
  createSign,
  createVerify,
} = await import('node:crypto');

const { privateKey, publicKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

const sign = createSign('SHA256');
sign.update('some data to sign');
sign.end();
const signature = sign.sign(privateKey);

const verify = createVerify('SHA256');
verify.update('some data to sign');
verify.end();
console.log(verify.verify(publicKey, signature));
// 输出：true
```

```cjs
const {
  generateKeyPairSync,
  createSign,
  createVerify,
} = require('node:crypto');

const { privateKey, publicKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

const sign = createSign('SHA256');
sign.update('some data to sign');
sign.end();
const signature = sign.sign(privateKey);

const verify = createVerify('SHA256');
verify.update('some data to sign');
verify.end();
console.log(verify.verify(publicKey, signature));
// 输出：true
```

### `sign.sign(privateKey[, outputEncoding])`

<!-- YAML
added: v0.1.92
changes:
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/35093
    description: privateKey 也可以是 ArrayBuffer 和 CryptoKey。
  - version:
     - v13.2.0
     - v12.16.0
    pr-url: https://github.com/nodejs/node/pull/29292
    description: 此函数现在支持 IEEE-P1363 DSA 和 ECDSA 签名。
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/26960
    description: 此函数现在支持 RSA-PSS 密钥。
  - version: v11.6.0
    pr-url: https://github.com/nodejs/node/pull/24234
    description: 此函数现在支持密钥对象。
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/11705
    description: 添加了对 RSASSA-PSS 和额外选项的支持。
-->

<!--lint disable maximum-line-length remark-lint-->

* `privateKey` {Object|string|ArrayBuffer|Buffer|TypedArray|DataView|KeyObject|CryptoKey}
  * `dsaEncoding` {string}
  * `padding` {integer}
  * `saltLength` {integer}
* `outputEncoding` {string} 返回值的 [编码][]。
* 返回：{Buffer | string}

<!--lint enable maximum-line-length remark-lint-->

计算通过 [`sign.update()`][] 或 [`sign.write()`][stream-writable-write] 传入的所有数据的签名。

如果 `privateKey` 不是 [`KeyObject`][]，此函数的行为如同 `privateKey` 已被传递给 [`crypto.createPrivateKey()`][]。如果它是一个对象，则可以传递以下额外属性：

* `dsaEncoding` {string} 对于 DSA 和 ECDSA，此选项指定生成签名的格式。它可以是以下之一：
  * `'der'`（默认）：DER 编码的 ASN.1 签名结构编码 `(r, s)`。
  * `'ieee-p1363'`：IEEE-P1363 提议的签名格式 `r || s`。
* `padding` {integer} RSA 的可选填充值，以下之一：

  * `crypto.constants.RSA_PKCS1_PADDING`（默认）
  * `crypto.constants.RSA_PKCS1_PSS_PADDING`

  `RSA_PKCS1_PSS_PADDING` 将使用 MGF1 与 [RFC 4055][] 第 3.1 节中指定的用于签名消息的相同哈希函数，除非已按照 [RFC 4055][] 第 3.3 节的规定将 MGF1 哈希函数指定为密钥的一部分。
* `saltLength` {integer} 当填充为 `RSA_PKCS1_PSS_PADDING` 时的盐长度。特殊值 `crypto.constants.RSA_PSS_SALTLEN_DIGEST` 将盐长度设置为摘要大小，`crypto.constants.RSA_PSS_SALTLEN_MAX_SIGN`（默认）将其设置为最大允许值。

如果提供了 `outputEncoding`，则返回字符串；否则返回 [`Buffer`][]。

调用 `sign.sign()` 方法后，`Sign` 对象不能再被使用。多次调用 `sign.sign()` 将导致抛出错误。

### `sign.update(data[, inputEncoding])`

<!-- YAML
added: v0.1.92
changes:
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/5522
    description: "默认 `inputEncoding` 从 `binary` 更改为 `utf8`。"
-->

* `data` {string|Buffer|TypedArray|DataView}
* `inputEncoding` {string} `data` 字符串的 [编码][]。

使用给定的 `data` 更新 `Sign` 内容，其编码在 `inputEncoding` 中给出。
如果未提供 `encoding`，且 `data` 是字符串，则强制使用 `'utf8'` 编码。如果 `data` 是 [`Buffer`][]、`TypedArray` 或 `DataView`，则忽略 `inputEncoding`。

随着数据流式传输，可以多次调用此方法并传入新数据。

## 类：`Verify`

<!-- YAML
added: v0.1.92
-->

* 继承自：{stream.Writable}

`Verify` 类是一个用于验证签名的工具。它可以通过以下两种方式使用：

* 作为可写 [流][]，其中写入的数据用于针对提供的签名进行验证，或者
* 使用 [`verify.update()`][] 和 [`verify.verify()`][] 方法来验证签名。

[`crypto.createVerify()`][] 方法用于创建 `Verify` 实例。不应直接使用 `new` 关键字创建 `Verify` 对象。

示例请参阅 [`Sign`][]。

### `verify.update(data[, inputEncoding])`

<!-- YAML
added: v0.1.92
changes:
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/5522
    description: "默认 `inputEncoding` 从 `binary` 更改为 `utf8`。"
-->

* `data` {string|Buffer|TypedArray|DataView}
* `inputEncoding` {string} `data` 字符串的 [编码][]。

使用给定的 `data` 更新 `Verify` 内容，其编码在 `inputEncoding` 中给出。
如果未提供 `inputEncoding`，且 `data` 是字符串，则强制使用 `'utf8'` 编码。如果 `data` 是 [`Buffer`][]、`TypedArray` 或 `DataView`，则忽略 `inputEncoding`。

随着数据流式传输，可以多次调用此方法并传入新数据。

### `verify.verify(key, signature[, signatureEncoding])`

<!-- YAML
added: v0.1.92
changes:
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/35093
    description: key 也可以是 ArrayBuffer 和 CryptoKey。
  - version:
     - v13.2.0
     - v12.16.0
    pr-url: https://github.com/nodejs/node/pull/29292
    description: 此函数现在支持 IEEE-P1363 DSA 和 ECDSA 签名。
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/26960
    description: 此函数现在支持 RSA-PSS 密钥。
  - version: v11.7.0
    pr-url: https://github.com/nodejs/node/pull/25217
    description: 密钥现在可以是私钥。
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/11705
    description: 添加了对 RSASSA-PSS 和额外选项的支持。
-->

<!--lint disable maximum-line-length remark-lint-->

* `key` {Object|string|ArrayBuffer|Buffer|TypedArray|DataView|KeyObject|CryptoKey}
  * `dsaEncoding` {string}
  * `padding` {integer}
  * `saltLength` {integer}
* `signature` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `signatureEncoding` {string} `signature` 字符串的 [编码][]。
* 返回：{boolean} 根据数据和公钥的签名有效性返回 `true` 或 `false`。

<!--lint enable maximum-line-length remark-lint-->

使用给定的 `key` 和 `signature` 来验证所提供的数据。

如果 `key` 不是 [`KeyObject`][]，此函数的行为如同
`key` 已被传递给 [`crypto.createPublicKey()`][ ]。如果它是一个
对象，则可以传递以下额外属性：

* `dsaEncoding` {string} 对于 DSA 和 ECDSA，此选项指定签名的格式。它可以是以下之一：
  * `'der'`（默认）：DER 编码的 ASN.1 签名结构编码 `(r, s)`。
  * `'ieee-p1363'`：IEEE-P1363 提议的签名格式 `r || s`。
* `padding` {integer} RSA 的可选填充值，以下之一：

  * `crypto.constants.RSA_PKCS1_PADDING`（默认）
  * `crypto.constants.RSA_PKCS1_PSS_PADDING`

  `RSA_PKCS1_PSS_PADDING` 将使用 MGF1 与 [RFC 4055][] 第 3.1 节中指定的用于验证消息的相同哈希函数，除非已按照 [RFC 4055][] 第 3.3 节的规定将 MGF1 哈希函数指定为密钥的一部分。
* `saltLength` {integer} 当填充为 `RSA_PKCS1_PSS_PADDING` 时的盐长度。特殊值 `crypto.constants.RSA_PSS_SALTLEN_DIGEST` 将盐长度设置为摘要大小，`crypto.constants.RSA_PSS_SALTLEN_AUTO`（默认）使其自动确定。

`signature` 参数是之前在 `signatureEncoding` 中计算出的数据签名。
如果指定了 `signatureEncoding`，则 `signature` 预期为字符串；否则 `signature` 预期为 [`Buffer`][]、`TypedArray` 或 `DataView`。

调用 `verify.verify()` 后，`verify` 对象不能再被使用。多次调用 `verify.verify()` 将导致抛出错误。

因为公钥可以从私钥派生，所以可以传递私钥而不是公钥。

## 类：`X509Certificate`

<!-- YAML
added: v15.6.0
-->

封装一个 X509 证书并提供对其信息的只读访问。

```mjs
const { X509Certificate } = await import('node:crypto');

const x509 = new X509Certificate('{... pem encoded cert ...}');

console.log(x509.subject);
```

```cjs
const { X509Certificate } = require('node:crypto');

const x509 = new X509Certificate('{... pem encoded cert ...}');

console.log(x509.subject);
```

### `new X509Certificate(buffer)`

<!-- YAML
added: v15.6.0
-->

* `buffer` {string|TypedArray|Buffer|DataView} 一个 PEM 或 DER 编码的
  X509 证书。

### `x509.ca`

<!-- YAML
added: v15.6.0
-->

* 类型：{boolean} 如果这是一个证书颁发机构 (CA) 证书，则为 `true`。

### `x509.checkEmail(email[, options])`

<!-- YAML
added: v15.6.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41600
    description: "subject 选项现在默认为 `'default'`。"
  - version:
      - v17.5.0
      - v16.14.1
    pr-url: https://github.com/nodejs/node/pull/41599
    description: "wildcards、partialWildcards、multiLabelWildcards 和 singleLabelSubdomains 选项已被移除，因为它们没有效果。"
  - version:
    - v17.5.0
    - v16.15.0
    pr-url: https://github.com/nodejs/node/pull/41569
    description: "subject 选项现在可以设置为 `'default'`。"
-->

* `email` {string}
* `options` {Object}
  * `subject` {string} `'default'`、`'always'` 或 `'never'`。
    **默认值：** `'default'`。
* 返回：{string|undefined} 如果证书匹配则返回 `email`，如果不匹配则返回 `undefined`。

检查证书是否与给定的电子邮件地址匹配。

如果 `'subject'` 选项为 undefined 或设置为 `'default'`，则仅当主题备用名称扩展不存在或不包含任何电子邮件地址时，才考虑证书主题。

如果 `'subject'` 选项设置为 `'always'`，并且如果主题备用名称扩展不存在或不包含匹配的电子邮件地址，则考虑证书主题。

如果 `'subject'` 选项设置为 `'never'`，则从不考虑证书主题，即使证书不包含主题备用名称。

### `x509.checkHost(name[, options])`

<!-- YAML
added: v15.6.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41600
    description: "subject 选项现在默认为 `'default'`。"
  - version:
    - v17.5.0
    - v16.15.0
    pr-url: https://github.com/nodejs/node/pull/41569
    description: "subject 选项现在可以设置为 `'default'`。"
-->

* `name` {string}
* `options` {Object}
  * `subject` {string} `'default'`、`'always'` 或 `'never'`。
    **默认值：** `'default'`。
  * `wildcards` {boolean} **默认值：** `true`。
  * `partialWildcards` {boolean} **默认值：** `true`。
  * `multiLabelWildcards` {boolean} **默认值：** `false`。
  * `singleLabelSubdomains` {boolean} **默认值：** `false`。
* 返回：{string|undefined} 返回与 `name` 匹配的主题名称，如果没有主题名称与 `name` 匹配则返回 `undefined`。

检查证书是否与给定的主机名匹配。

如果证书与给定的主机名匹配，则返回匹配的主题名称。返回的名称可能是完全匹配（例如，`foo.example.com`），也可能包含通配符（例如，`*.example.com`）。因为主机名比较不区分大小写，所以返回的主题名称在大写上也可能与给定的 `name` 不同。

如果 `'subject'` 选项为 undefined 或设置为 `'default'`，则仅当主题备用名称扩展不存在或不包含任何 DNS 名称时，才考虑证书主题。此行为与 [RFC 2818][]（"HTTP Over TLS"）一致。

如果 `'subject'` 选项设置为 `'always'`，并且如果主题备用名称扩展不存在或不包含匹配的 DNS 名称，则考虑证书主题。

如果 `'subject'` 选项设置为 `'never'`，则从不考虑证书主题，即使证书不包含主题备用名称。

### `x509.checkIP(ip)`

<!-- YAML
added: v15.6.0
changes:
  - version:
      - v17.5.0
      - v16.14.1
    pr-url: https://github.com/nodejs/node/pull/41571
    description: "options 参数已被移除，因为它没有效果。"
-->

* `ip` {string}
* 返回：{string|undefined} 如果证书匹配则返回 `ip`，如果不匹配则返回 `undefined`。

检查证书是否与给定的 IP 地址（IPv4 或 IPv6）匹配。

仅考虑 [RFC 5280][] `iPAddress` 主题备用名称，并且它们必须与给定的 `ip` 地址完全匹配。其他主题备用名称以及证书的主题字段将被忽略。

### `x509.checkIssued(otherCert)`

<!-- YAML
added: v15.6.0
-->

* `otherCert` {X509Certificate}
* 返回：{boolean}

通过比较证书元数据，检查此证书是否可能由给定的 `otherCert` 颁发。

这对于修剪可能已使用更基本的过滤例程（即仅基于主题和颁发者名称）选择的潜在颁发者证书列表很有用。

最后，要验证此证书的签名是由对应于 `otherCert` 公钥的私钥生成的，请使用 [`x509.verify(publicKey)`][]，并将 `otherCert` 的公钥表示为 [`KeyObject`][]，如下所示

```js
if (!x509.verify(otherCert.publicKey)) {
  throw new Error('otherCert did not issue x509');
}
```

### `x509.checkPrivateKey(privateKey)`

<!-- YAML
added: v15.6.0
-->

* `privateKey` {KeyObject} 一个私钥。
* 返回：{boolean}

检查此证书的公钥是否与给定的私钥一致。

### `x509.fingerprint`

<!-- YAML
added: v15.6.0
-->

* 类型：{string}

此证书的 SHA-1 指纹。

因为 SHA-1 在密码学上已被破解，且其安全性显著低于常用于签署证书的算法，请考虑改用 [`x509.fingerprint256`][]。

### `x509.fingerprint256`

<!-- YAML
added: v15.6.0
-->

* 类型：{string}

此证书的 SHA-256 指纹。

### `x509.fingerprint512`

<!-- YAML
added:
  - v17.2.0
  - v16.14.0
-->

* 类型：{string}

此证书的 SHA-512 指纹。

因为计算 SHA-256 指纹通常更快，且其大小仅为 SHA-512 指纹的一半，所以 [`x509.fingerprint256`][] 可能是更好的选择。虽然 SHA-512 通常提供更高级别的安全性，但 SHA-256 的安全性与常用于签署证书的大多数算法匹配。

### `x509.infoAccess`

<!-- YAML
added: v15.6.0
changes:
  - version:
      - v17.3.1
      - v16.13.2
    pr-url: https://github.com/nodejs-private/node-private/pull/300
    description: "作为对 CVE-2021-44532 的响应，此字符串的部分内容可能被编码为 JSON 字符串字面量。"
-->

* 类型：{string}

证书授权信息访问扩展的文本表示。

这是一个由换行符分隔的访问描述列表。每行以访问方法和访问位置的种类开头，后跟冒号和与访问位置关联的值。

在表示访问方法和访问位置种类的前缀之后，每行的其余部分可能会用引号括起来，以表明该值是 JSON 字符串字面量。为了向后兼容，Node.js 仅在此属性内必要时使用 JSON 字符串字面量以避免歧义。第三方代码应准备好处理这两种可能的条目格式。

### `x509.issuer`

<!-- YAML
added: v15.6.0
-->

* 类型：{string}

此证书中包含的颁发者标识。

### `x509.issuerCertificate`

<!-- YAML
added: v15.9.0
-->

* 类型：{X509Certificate}

颁发者证书，如果颁发者证书不可用则为 `undefined`。

### `x509.keyUsage`

<!-- YAML
added: v15.6.0
-->

* 类型：{string\[]}

一个数组，详细说明此证书的密钥扩展用法。

### `x509.publicKey`

<!-- YAML
added: v15.6.0
-->

* 类型：{KeyObject}

此证书的公钥 {KeyObject}。

### `x509.raw`

<!-- YAML
added: v15.6.0
-->

* 类型：{Buffer}

一个包含此证书 DER 编码的 `Buffer`。

### `x509.serialNumber`

<!-- YAML
added: v15.6.0
-->

* 类型：{string}

此证书的序列号。

序列号由证书颁发机构分配，并不能唯一标识证书。请考虑改用 [`x509.fingerprint256`][] 作为唯一标识符。

### `x509.subject`

<!-- YAML
added: v15.6.0
-->

* 类型：{string}

此证书的完整主题。

### `x509.subjectAltName`

<!-- YAML
added: v15.6.0
changes:
  - version:
      - v17.3.1
      - v16.13.2
    pr-url: https://github.com/nodejs-private/node-private/pull/300
    description: "作为对 CVE-2021-44532 的响应，此字符串的部分内容可能被编码为 JSON 字符串字面量。"
-->

* 类型：{string}

为此证书指定的主题备用名称。

这是一个逗号分隔的主题备用名称列表。每个条目都以一个标识主题备用名称种类的字符串开头，后跟冒号和与该条目关联的值。

早期版本的 Node.js 错误地假设在此属性处以双字符序列 `', '` 分割是安全的（参见 [CVE-2021-44532][]）。然而，恶意和合法证书都可能包含在表示为字符串时包括此序列的主题备用名称。

在表示条目类型的前缀之后，每个条目的其余部分可能会用引号括起来，以表明该值是 JSON 字符串字面量。为了向后兼容，Node.js 仅在此属性内必要时使用 JSON 字符串字面量以避免歧义。第三方代码应准备好处理这两种可能的条目格式。

### `x509.toJSON()`

<!-- YAML
added: v15.6.0
-->

* 类型：{string}

X509 证书没有标准的 JSON 编码。`toJSON()` 方法返回一个包含 PEM 编码证书的字符串。

### `x509.toLegacyObject()`

<!-- YAML
added: v15.6.0
-->

* 类型：{Object}

使用遗留的 [证书对象][] 编码返回有关此证书的信息。

### `x509.toString()`

<!-- YAML
added: v15.6.0
-->

* 类型：{string}

返回 PEM 编码的证书。

### `x509.validFrom`

<!-- YAML
added: v15.6.0
-->

* 类型：{string}

此证书有效的起始日期/时间。

### `x509.validFromDate`

<!-- YAML
added:
 - v23.0.0
 - v22.10.0
-->

* 类型：{Date}

此证书有效的起始日期/时间，封装在 `Date` 对象中。

### `x509.validTo`

<!-- YAML
added: v15.6.0
-->

* 类型：{string}

此证书有效的截止日期/时间。

### `x509.validToDate`

<!-- YAML
added:
 - v23.0.0
 - v22.10.0
-->

* 类型：{Date}

此证书有效的截止日期/时间，封装在 `Date` 对象中。

### `x509.signatureAlgorithm`

<!-- YAML
added: v24.9.0
-->

* 类型：{string|undefined}

用于签署证书的算法，如果 OpenSSL 不知道签名算法则为 `undefined`。

### `x509.signatureAlgorithmOid`

<!-- YAML
added: v24.9.0
-->

* 类型：{string}

用于签署证书的算法的 OID。

### `x509.verify(publicKey)`

<!-- YAML
added: v15.6.0
-->

* `publicKey` {KeyObject} 一个公钥。
* 返回：{boolean}

验证此证书是否由给定的公钥签署。不对证书执行任何其他验证检查。

## `node:crypto` 模块的方法和属性

### `crypto.argon2(algorithm, parameters, callback)`

<!-- YAML
added: v24.7.0
-->

> 稳定性：1.2 - 发布候选版本

* `algorithm` {string} Argon2 的变体，`"argon2d"`、`"argon2i"` 或 `"argon2id"` 之一。
* `parameters` {Object}
  * `message` {string|ArrayBuffer|Buffer|TypedArray|DataView} 必需，这是 Argon2 密码哈希应用中的密码。
  * `nonce` {string|ArrayBuffer|Buffer|TypedArray|DataView} 必需，长度必须至少为 8 字节。这是 Argon2 密码哈希应用中的盐值。
  * `parallelism` {number} 必需，并行度决定可运行多少条计算链（lane）。必须至少为 `1`，且至多为 `2**24-1`。
  * `tagLength` {number} 必需，要生成的密钥长度。必须至少为 `4`，且至多为 `2**32-1`。
  * `memory` {number} 必需，以 1KiB 块为单位的内存成本。必须至少为 `8 * parallelism`，且至多为 `2**32-1`。实际块数会向下取整到最接近的 `4 * parallelism` 的倍数。
  * `passes` {number} 必需，遍数（迭代次数）。必须至少为 `1`，且至多为 `2**32-1`。
  * `secret` {string|ArrayBuffer|Buffer|TypedArray|DataView|undefined} 可选，随机附加输入，类似于盐值，但**不应**与派生密钥一起存储。在密码哈希应用中这称为 pepper。如果使用，其长度不得超过 `2**32-1` 字节。
  * `associatedData` {string|ArrayBuffer|Buffer|TypedArray|DataView|undefined} 可选，要添加到哈希中的附加数据，功能上等同于盐值或 secret，但用于非随机数据。如果使用，其长度不得超过 `2**32-1` 字节。
* `callback` {Function}
  * `err` {Error}
  * `derivedKey` {Buffer}

提供异步 [Argon2][] 实现。Argon2 是一种基于密码的密钥派生函数，旨在在计算和内存方面都很昂贵，以使暴力破解攻击无利可图。

`nonce` 应尽可能唯一。建议 nonce 是随机的且至少 16 字节长。详见 [NIST SP 800-132][]。

当为 `message`、`nonce`、`secret` 或 `associatedData` 传递字符串时，请考虑 [使用字符串作为加密 API 输入时的注意事项][]。

`callback` 函数带有两个参数：`err` 和 `derivedKey`。如果密钥派生失败，`err` 是一个异常对象，否则 `err` 为 `null`。`derivedKey` 作为 [`Buffer`][] 传递给回调。

当任何输入参数指定无效的值或类型时，将抛出异常。

```mjs
const { argon2, randomBytes } = await import('node:crypto');

const parameters = {
  message: 'password',
  nonce: randomBytes(16),
  parallelism: 4,
  tagLength: 64,
  memory: 65536,
  passes: 3,
};

argon2('argon2id', parameters, (err, derivedKey) => {
  if (err) throw err;
  console.log(derivedKey.toString('hex'));  // 'af91dad...9520f15'
});
```

```cjs
const { argon2, randomBytes } = require('node:crypto');

const parameters = {
  message: 'password',
  nonce: randomBytes(16),
  parallelism: 4,
  tagLength: 64,
  memory: 65536,
  passes: 3,
};

argon2('argon2id', parameters, (err, derivedKey) => {
  if (err) throw err;
  console.log(derivedKey.toString('hex'));  // 'af91dad...9520f15'
});
```

### `crypto.argon2Sync(algorithm, parameters)`

<!-- YAML
added: v24.7.0
-->

> 稳定性：1.2 - 发布候选版本

* `algorithm` {string} Argon2 的变体，`"argon2d"`、`"argon2i"` 或 `"argon2id"` 之一。
* `parameters` {Object}
  * `message` {string|ArrayBuffer|Buffer|TypedArray|DataView} 必需，这是 Argon2 密码哈希应用中的密码。
  * `nonce` {string|ArrayBuffer|Buffer|TypedArray|DataView} 必需，长度必须至少为 8 字节。这是 Argon2 密码哈希应用中的盐值。
  * `parallelism` {number} 必需，并行度决定可运行多少条计算链（lane）。必须至少为 1，且至多为 `2**24-1`。
  * `tagLength` {number} 必需，要生成的密钥长度。必须至少为 `4`，且至多为 `2**32-1`。
  * `memory` {number} 必需，以 1KiB 块为单位的内存成本。必须至少为 `8 * parallelism`，且至多为 `2**32-1`。实际块数会向下取整到最接近的 `4 * parallelism` 的倍数。
  * `passes` {number} 必需，遍数（迭代次数）。必须至少为 `1`，且至多为 `2**32-1`。
  * `secret` {string|ArrayBuffer|Buffer|TypedArray|DataView|undefined} 可选，随机附加输入，类似于盐值，但**不应**与派生密钥一起存储。在密码哈希应用中这称为 pepper。如果使用，其长度不得超过 `2**32-1` 字节。
  * `associatedData` {string|ArrayBuffer|Buffer|TypedArray|DataView|undefined} 可选，要添加到哈希中的附加数据，功能上等同于盐值或 secret，但用于非随机数据。如果使用，其长度不得超过 `2**32-1` 字节。
* 返回：{Buffer}

提供同步 [Argon2][] 实现。Argon2 是一种基于密码的密钥派生函数，旨在在计算和内存方面都很昂贵，以使暴力破解攻击无利可图。

`nonce` 应尽可能唯一。建议 nonce 是随机的且至少 16 字节长。详见 [NIST SP 800-132][]。

当为 `message`、`nonce`、`secret` 或 `associatedData` 传递字符串时，请考虑 [使用字符串作为加密 API 输入时的注意事项][]。

当密钥派生失败时抛出异常，否则派生密钥作为 [`Buffer`][] 返回。

当任何输入参数指定无效的值或类型时，将抛出异常。

```mjs
const { argon2Sync, randomBytes } = await import('node:crypto');

const parameters = {
  message: 'password',
  nonce: randomBytes(16),
  parallelism: 4,
  tagLength: 64,
  memory: 65536,
  passes: 3,
};

const derivedKey = argon2Sync('argon2id', parameters);
console.log(derivedKey.toString('hex'));  // 'af91dad...9520f15'
```

```cjs
const { argon2Sync, randomBytes } = require('node:crypto');

const parameters = {
  message: 'password',
  nonce: randomBytes(16),
  parallelism: 4,
  tagLength: 64,
  memory: 65536,
  passes: 3,
};

const derivedKey = argon2Sync('argon2id', parameters);
console.log(derivedKey.toString('hex'));  // 'af91dad...9520f15'
```

### `crypto.checkPrime(candidate[, options], callback)`

<!-- YAML
added: v15.8.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在抛出 `ERR_INVALID_ARG_TYPE` 而不是 `ERR_INVALID_CALLBACK`。"
-->

* `candidate` {ArrayBuffer|SharedArrayBuffer|TypedArray|Buffer|DataView|bigint}
  一个可能的素数，编码为任意长度的大端字节序列。
* `options` {Object}
  * `checks` {number} 要执行的 Miller-Rabin 概率素性迭代次数。当值为 `0`（零）时，使用的检查次数产生的随机输入假阳性率最多为 2<sup>-64</sup>。选择检查次数时必须小心。有关更多详细信息，请参阅 OpenSSL 文档中的 [`BN_is_prime_ex`][] 函数 `nchecks` 选项。**默认：** `0`
* `callback` {Function}
  * `err` {Error} 如果检查期间发生错误，则设置为 {Error} 对象。
  * `result` {boolean} 如果候选者是素数且错误概率小于 `0.25 ** options.checks`，则为 `true`。

检查 `candidate` 的素性。

### `crypto.checkPrimeSync(candidate[, options])`

<!-- YAML
added: v15.8.0
-->

* `candidate` {ArrayBuffer|SharedArrayBuffer|TypedArray|Buffer|DataView|bigint}
  一个可能的素数，编码为任意长度的大端字节序列。
* `options` {Object}
  * `checks` {number} 要执行的 Miller-Rabin 概率素性迭代次数。当值为 `0`（零）时，使用的检查次数产生的随机输入假阳性率最多为 2<sup>-64</sup>。选择检查次数时必须小心。有关更多详细信息，请参阅 OpenSSL 文档中的 [`BN_is_prime_ex`][] 函数 `nchecks` 选项。**默认：** `0`
* 返回：{boolean} 如果候选者是素数且错误概率小于 `0.25 ** options.checks`，则为 `true`。

检查 `candidate` 的素性。

### `crypto.constants`

<!-- YAML
added: v6.3.0
-->

* 类型：{Object}

一个包含常用于加密和安全相关操作的常量的对象。当前定义的具体常量在 [加密常量][] 中描述。

### `crypto.createCipheriv(algorithm, key, iv[, options])`

<!-- YAML
added: v0.1.94
changes:
  - version: v26.0.0
    pr-url: https://github.com/nodejs/node/pull/62453
    description: "传递 CryptoKey 作为 `key` 已弃用。"
  - version:
    - v17.9.0
    - v16.17.0
    pr-url: https://github.com/nodejs/node/pull/42427
    description: "使用 `chacha20-poly1305` 密码时，`authTagLength` 选项现在是可选的，默认为 16 字节。"
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/35093
    description: password 和 iv 参数可以是 ArrayBuffer，并且每个都限制为最大 2 ** 31 - 1 字节。
  - version: v11.6.0
    pr-url: https://github.com/nodejs/node/pull/24234
    description: "`key` 参数现在可以是 `KeyObject`。"
  - version:
     - v11.2.0
     - v10.17.0
    pr-url: https://github.com/nodejs/node/pull/24081
    description: "现在支持密码 `chacha20-poly1305`（ChaCha20-Poly1305 的 IETF 变体）。"
  - version: v10.10.0
    pr-url: https://github.com/nodejs/node/pull/21447
    description: 现在支持 OCB 模式下的密码。
  - version: v10.2.0
    pr-url: https://github.com/nodejs/node/pull/20235
    description: "`authTagLength` 选项现在可用于在 GCM 模式下生成更短的认证标签，默认为 16 字节。"
  - version: v9.9.0
    pr-url: https://github.com/nodejs/node/pull/18644
    description: "对于不需要初始化向量的密码，`iv` 参数现在可以是 `null`。"
-->

* `algorithm` {string}
* `key` {string|ArrayBuffer|Buffer|TypedArray|DataView|KeyObject|CryptoKey}
* `iv` {string|ArrayBuffer|Buffer|TypedArray|DataView|null}
* `options` {Object} [`stream.transform` 选项][]
* 返回：{Cipheriv}

创建并返回一个 `Cipheriv` 对象，带有给定的 `algorithm`、`key` 和初始化向量 (`iv`)。

`options` 参数控制流行为，除了使用 CCM 或 OCB 模式（例如 `'aes-128-ccm'`）的密码外，它是可选的。在这种情况下，`authTagLength` 选项是必需的，并指定认证标签的长度（以字节为单位），参见 [CCM 模式][]。在 GCM 模式下，`authTagLength` 选项不是必需的，但可用于设置 `getAuthTag()` 返回的认证标签的长度，默认为 16 字节。对于 `chacha20-poly1305`，`authTagLength` 选项默认为 16 字节。

`algorithm` 依赖于 OpenSSL，示例有 `'aes192'` 等。在最近的 OpenSSL 版本上，`openssl list -cipher-algorithms` 将显示可用的密码算法。

`key` 是 `algorithm` 使用的原始密钥，`iv` 是 [初始化向量][]。两个参数必须是 `'utf8'` 编码的字符串、[Buffers][`Buffer`]、`TypedArray` 或 `DataView`。`key` 也可以是类型为 `secret` 的 [`KeyObject`][]。如果密码不需要初始化向量，`iv` 可以是 `null`。

当为 `key` 或 `iv` 传递字符串时，请考虑 [使用字符串作为加密 API 输入时的注意事项][]。

初始化向量应该是不可预测且唯一的；理想情况下，它们应该是加密随机的。它们不必是秘密的：IV 通常只是未加密地添加到密文消息中。听起来可能矛盾的是，某物必须不可预测且唯一，但不必是秘密的；请记住，攻击者必须无法提前预测给定 IV 将是什么。

### `crypto.createDecipheriv(algorithm, key, iv[, options])`

<!-- YAML
added: v0.1.94
changes:
  - version: v26.0.0
    pr-url: https://github.com/nodejs/node/pull/62453
    description: "传递 CryptoKey 作为 `key` 已弃用。"
  - version:
    - v17.9.0
    - v16.17.0
    pr-url: https://github.com/nodejs/node/pull/42427
    description: "使用 `chacha20-poly1305` 密码时，`authTagLength` 选项现在是可选的，默认为 16 字节。"
  - version: v11.6.0
    pr-url: https://github.com/nodejs/node/pull/24234
    description: "`key` 参数现在可以是 `KeyObject`。"
  - version:
     - v11.2.0
     - v10.17.0
    pr-url: https://github.com/nodejs/node/pull/24081
    description: "现在支持密码 `chacha20-poly1305`（ChaCha20-Poly1305 的 IETF 变体）。"
  - version: v10.10.0
    pr-url: https://github.com/nodejs/node/pull/21447
    description: 现在支持 OCB 模式下的密码。
  - version: v10.2.0
    pr-url: https://github.com/nodejs/node/pull/20039
    description: "`authTagLength` 选项现在可用于限制接受的 GCM 认证标签长度。"
  - version: v9.9.0
    pr-url: https://github.com/nodejs/node/pull/18644
    description: "对于不需要初始化向量的密码，`iv` 参数现在可以是 `null`。"
-->

* `algorithm` {string}
* `key` {string|ArrayBuffer|Buffer|TypedArray|DataView|KeyObject|CryptoKey}
* `iv` {string|ArrayBuffer|Buffer|TypedArray|DataView|null}
* `options` {Object} [`stream.transform` 选项][]
* 返回：{Decipheriv}

创建并返回一个 `Decipheriv` 对象，使用给定的 `algorithm`、`key` 和初始化向量 (`iv`)。

`options` 参数控制流行为，除了使用 CCM 或 OCB 模式（例如 `'aes-128-ccm'`）的密码外，它是可选的。在这种情况下，`authTagLength` 选项是必需的，并指定认证标签的长度（以字节为单位），参见 [CCM 模式][]。对于 AES-GCM 和 `chacha20-poly1305`，`authTagLength` 选项默认为 16 字节，如果使用不同长度则必须设置为不同的值。

`algorithm` 依赖于 OpenSSL，示例有 `'aes192'` 等。在最近的 OpenSSL 版本上，`openssl list -cipher-algorithms` 将显示可用的密码算法。

`key` 是 `algorithm` 使用的原始密钥，`iv` 是 [初始化向量][]。两个参数必须是 `'utf8'` 编码的字符串、[Buffers][`Buffer`]、`TypedArray` 或 `DataView`。`key` 也可以是类型为 `secret` 的 [`KeyObject`][]。如果密码不需要初始化向量，`iv` 可以是 `null`。

当为 `key` 或 `iv` 传递字符串时，请考虑 [使用字符串作为加密 API 输入时的注意事项][]。

初始化向量应该是不可预测且唯一的；理想情况下，它们应该是加密随机的。它们不必是秘密的：IV 通常只是未加密地添加到密文消息中。听起来可能矛盾的是，某物必须不可预测且唯一，但不必是秘密的；请记住，攻击者必须无法提前预测给定 IV 将是什么。

### `crypto.createDiffieHellman(prime[, primeEncoding][, generator][, generatorEncoding])`

<!-- YAML
added: v0.11.12
changes:
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12223
    description: "`prime` 参数现在可以是任何 `TypedArray` 或 `DataView`。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/11983
    description: "`prime` 参数现在可以是 `Uint8Array`。"
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/5522
    description: "编码参数的默认值从 `binary` 改为 `utf8`。"
-->

* `prime` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `primeEncoding` {string} `prime` 字符串的 [编码][]。
* `generator` {number|string|ArrayBuffer|Buffer|TypedArray|DataView}
  **默认：** `2`
* `generatorEncoding` {string} `generator` 字符串的 [编码][]。
* 返回：{DiffieHellman}

使用提供的 `prime` 和可选的特定 `generator` 创建 `DiffieHellman` 密钥交换对象。

`generator` 参数可以是数字、字符串或 [`Buffer`][]。如果未指定 `generator`，则使用值 `2`。

如果指定了 `primeEncoding`，则 `prime` 预期为字符串；否则预期为 [`Buffer`][]、`TypedArray` 或 `DataView`。

如果指定了 `generatorEncoding`，则 `generator` 预期为字符串；否则预期为数字、[`Buffer`][]、`TypedArray` 或 `DataView`。

### `crypto.createDiffieHellman(primeLength[, generator])`

<!-- YAML
added: v0.5.0
-->

* `primeLength` {number}
* `generator` {number} **默认：** `2`
* 返回：{DiffieHellman}

创建 `DiffieHellman` 密钥交换对象，并使用可选的特定数字 `generator` 生成 `primeLength` 位的素数。如果未指定 `generator`，则使用值 `2`。

### `crypto.createDiffieHellmanGroup(name)`

<!-- YAML
added: v0.9.3
-->

* `name` {string}
* 返回：{DiffieHellmanGroup}

[`crypto.getDiffieHellman()`][] 的别名

### `crypto.createECDH(curveName)`

<!-- YAML
added: v0.11.14
-->

* `curveName` {string}
* 返回：{ECDH}

使用由 `curveName` 字符串指定的预定义曲线创建椭圆曲线 Diffie-Hellman (`ECDH`) 密钥交换对象。使用 [`crypto.getCurves()`][] 获取可用曲线名称列表。在最近的 OpenSSL 版本上，`openssl ecparam -list_curves` 也将显示每个可用椭圆曲线的名称和描述。

### `crypto.createHash(algorithm[, options])`

<!-- YAML
added: v0.1.92
changes:
  - version: v12.8.0
    pr-url: https://github.com/nodejs/node/pull/28805
    description: "为 XOF 哈希函数添加了 `outputLength` 选项。"
-->

* `algorithm` {string}
* `options` {Object} [`stream.transform` 选项][]
* 返回：{Hash}

创建并返回一个 `Hash` 对象，可用于使用给定的 `algorithm` 生成哈希摘要。可选 `options` 参数控制流行为。对于 XOF 哈希函数（如 `'shake256'`），`outputLength` 选项可用于指定所需的输出长度（以字节为单位）。

`algorithm` 取决于平台上 OpenSSL 版本支持的可用算法。示例有 `'sha256'`、`'sha512'` 等。在最近的 OpenSSL 版本上，`openssl list -digest-algorithms` 将显示可用的摘要算法。

示例：生成文件的 sha256 总和

```mjs
import {
  createReadStream,
} from 'node:fs';
import { argv } from 'node:process';
const {
  createHash,
} = await import('node:crypto');

const filename = argv[2];

const hash = createHash('sha256');

const input = createReadStream(filename);
input.on('readable', () => {
  // 哈希流只会产生一个元素。
  const data = input.read();
  if (data)
    hash.update(data);
  else {
    console.log(`${hash.digest('hex')} ${filename}`);
  }
});
```

```cjs
const {
  createReadStream,
} = require('node:fs');
const {
  createHash,
} = require('node:crypto');
const { argv } = require('node:process');

const filename = argv[2];

const hash = createHash('sha256');

const input = createReadStream(filename);
input.on('readable', () => {
  // 哈希流只会产生一个元素。
  const data = input.read();
  if (data)
    hash.update(data);
  else {
    console.log(`${hash.digest('hex')} ${filename}`);
  }
});
```

### `crypto.createHmac(algorithm, key[, options])`

<!-- YAML
added: v0.1.94
changes:
  - version: v26.0.0
    pr-url: https://github.com/nodejs/node/pull/62453
    description: "传递 CryptoKey 作为 `key` 已弃用。"
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/35093
    description: key 也可以是 ArrayBuffer 或 CryptoKey。添加了 encoding 选项。key 不能包含超过 2 ** 32 - 1 字节。
  - version: v11.6.0
    pr-url: https://github.com/nodejs/node/pull/24234
    description: "`key` 参数现在可以是 `KeyObject`。"
-->

* `algorithm` {string}
* `key` {string|ArrayBuffer|Buffer|TypedArray|DataView|KeyObject|CryptoKey}
* `options` {Object} [`stream.transform` 选项][]
  * `encoding` {string} 当 `key` 是字符串时使用的字符串编码。
* 返回：{Hmac}

创建并返回一个 `Hmac` 对象，使用给定的 `algorithm` 和 `key`。可选 `options` 参数控制流行为。

`algorithm` 取决于平台上 OpenSSL 版本支持的可用算法。示例有 `'sha256'`、`'sha512'` 等。在最近的 OpenSSL 版本上，`openssl list -digest-algorithms` 将显示可用的摘要算法。

`key` 是用于生成加密 HMAC 哈希的 HMAC 密钥。如果它是 [`KeyObject`][]，其类型必须是 `secret`。如果它是字符串，请考虑 [使用字符串作为加密 API 输入时的注意事项][]。如果它是从加密安全的熵源获得的，例如 [`crypto.randomBytes()`][] 或 [`crypto.generateKey()`][]，其长度不应超过 `algorithm` 的块大小（例如，SHA-256 为 512 位）。

示例：生成文件的 sha256 HMAC

```mjs
import {
  createReadStream,
} from 'node:fs';
import { argv } from 'node:process';
const {
  createHmac,
} = await import('node:crypto');

const filename = argv[2];

const hmac = createHmac('sha256', 'a secret');

const input = createReadStream(filename);
input.on('readable', () => {
  // 哈希流只会产生一个元素。
  const data = input.read();
  if (data)
    hmac.update(data);
  else {
    console.log(`${hmac.digest('hex')} ${filename}`);
  }
});
```

```cjs
const {
  createReadStream,
} = require('node:fs');
const {
  createHmac,
} = require('node:crypto');
const { argv } = require('node:process');

const filename = argv[2];

const hmac = createHmac('sha256', 'a secret');

const input = createReadStream(filename);
input.on('readable', () => {
  // 哈希流只会产生一个元素。
  const data = input.read();
  if (data)
    hmac.update(data);
  else {
    console.log(`${hmac.digest('hex')} ${filename}`);
  }
});
```

### `crypto.createPrivateKey(key)`

<!-- YAML
added: v11.6.0
changes:
  - version: v26.1.0
    pr-url: https://github.com/nodejs/node/pull/62706
    description: Added JWK format support for ML-KEM and SLH-DSA
                 key types.
  - version: v26.0.0
    pr-url: https://github.com/nodejs/node/pull/62453
    description: 将 CryptoKey 作为 `key` 传递已弃用。
  - version: v24.15.0
    pr-url: https://github.com/nodejs/node/pull/62240
    description: "添加了对 `'raw-private'` 和 `'raw-seed'` 格式的支持。"
  - version: v24.6.0
    pr-url: https://github.com/nodejs/node/pull/59259
    description: 添加对 ML-DSA 密钥的支持。
  - version: v15.12.0
    pr-url: https://github.com/nodejs/node/pull/37254
    description: key 也可以是 JWK 对象。
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/35093
    description: key 也可以是 ArrayBuffer。添加了 encoding 选项。key 不能包含超过 2 ** 32 - 1 字节。
-->

<!--lint disable maximum-line-length remark-lint-->

* `key` {Object|string|ArrayBuffer|Buffer|TypedArray|DataView}
  * `key` {string|ArrayBuffer|Buffer|TypedArray|DataView|Object} 密钥材料，PEM、DER、JWK 或 raw 格式。
  * `format` {string} 必须是 `'pem'`、`'der'`、`'jwk'`、`'raw-private'` 或 `'raw-seed'`。**默认：** `'pem'`。
  * `type` {string} 必须是 `'pkcs1'`、`'pkcs8'` 或 `'sec1'`。仅当 `format` 为 `'der'` 时需要此选项，否则忽略。
  * `passphrase` {string | Buffer} 用于解密的密码短语。
  * `encoding` {string} 当 `key` 是字符串时使用的字符串编码。
  * `asymmetricKeyType` {string} 当 `format` 为 `'raw-private'` 或 `'raw-seed'` 时需要，否则忽略。
    必须是 [支持的密钥类型][非对称密钥类型]。
  * `namedCurve` {string} 要使用的曲线名称。当 `asymmetricKeyType` 为 `'ec'` 时需要，否则忽略。
* 返回：{KeyObject}

<!--lint enable maximum-line-length remark-lint-->

创建并返回一个包含私钥的新密钥对象。如果 `key` 是字符串或 `Buffer`，`format` 假定为 `'pem'`；否则，`key` 必须是具有上述属性的对象。

如果私钥已加密，则必须指定 `passphrase`。密码短语的长度限制为 1024 字节。

### `crypto.createPublicKey(key)`

<!-- YAML
added: v11.6.0
changes:
  - version: v26.1.0
    pr-url: https://github.com/nodejs/node/pull/62706
    description: Added JWK format support for ML-KEM and SLH-DSA
                 key types.
  - version: v26.0.0
    pr-url: https://github.com/nodejs/node/pull/62453
    description: 将 CryptoKey 作为 `key` 传递已弃用。
  - version: v24.15.0
    pr-url: https://github.com/nodejs/node/pull/62240
    description: "添加了对 `'raw-public'` 格式的支持。"
  - version: v24.6.0
    pr-url: https://github.com/nodejs/node/pull/59259
    description: 添加对 ML-DSA 密钥的支持。
  - version: v15.12.0
    pr-url: https://github.com/nodejs/node/pull/37254
    description: key 也可以是 JWK 对象。
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/35093
    description: key 也可以是 ArrayBuffer。添加了 encoding 选项。key 不能包含超过 2 ** 32 - 1 字节。
  - version: v11.13.0
    pr-url: https://github.com/nodejs/node/pull/26278
    description: "`key` 参数现在可以是类型为 `private` 的 `KeyObject`。"
  - version: v11.7.0
    pr-url: https://github.com/nodejs/node/pull/25217
    description: "`key` 参数现在可以是私钥。"
-->

<!--lint disable maximum-line-length remark-lint-->

* `key` {Object|string|ArrayBuffer|Buffer|TypedArray|DataView}
  * `key` {string|ArrayBuffer|Buffer|TypedArray|DataView|Object} 密钥材料，PEM、DER、JWK 或 raw 格式。
  * `format` {string} 必须是 `'pem'`、`'der'`、`'jwk'` 或 `'raw-public'`。**默认：** `'pem'`。
  * `type` {string} 必须是 `'pkcs1'` 或 `'spki'`。仅当 `format` 为 `'der'` 时需要此选项，否则忽略。
  * `encoding` {string} 当 `key` 是字符串时使用的字符串编码。
  * `asymmetricKeyType` {string} 当 `format` 为 `'raw-public'` 时需要，否则忽略。
    必须是 [支持的密钥类型][非对称密钥类型]。
  * `namedCurve` {string} 要使用的曲线名称。当 `asymmetricKeyType` 为 `'ec'` 时需要，否则忽略。
* 返回：{KeyObject}

<!--lint enable maximum-line-length remark-lint-->

创建并返回一个包含公钥的新密钥对象。如果 `key` 是字符串或 `Buffer`，`format` 假定为 `'pem'`；如果 `key` 是类型为 `'private'` 的 `KeyObject`，则公钥是从给定的私钥派生的；否则，`key` 必须是具有上述属性的对象。

如果格式是 `'pem'`，`'key'` 也可以是 X.509 证书。

因为公钥可以从私钥派生，所以可以传递私钥而不是公钥。在这种情况下，此函数的行为就像调用了 [`crypto.createPrivateKey()`][]，除了返回的 `KeyObject` 的类型将是 `'public'` 并且无法从返回的 `KeyObject` 中提取私钥。类似地，如果给定类型为 `'private'` 的 `KeyObject`，将返回类型为 `'public'` 的新 `KeyObject`，并且无法从返回的对象中提取私钥。

### `crypto.createSecretKey(key[, encoding])`

<!-- YAML
added: v11.6.0
changes:
  - version:
    - v18.8.0
    - v16.18.0
    pr-url: https://github.com/nodejs/node/pull/44201
    description: key 现在可以是零长度。
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/35093
    description: key 也可以是 ArrayBuffer 或字符串。添加了 encoding 参数。key 不能包含超过 2 ** 32 - 1 字节。
-->

* `key` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `encoding` {string} 当 `key` 是字符串时的字符串编码。
* 返回：{KeyObject}

创建并返回一个包含用于对称加密或 `Hmac` 的密钥的新密钥对象。

### `crypto.createSign(algorithm[, options])`

<!-- YAML
added: v0.1.92
-->

* `algorithm` {string}
* `options` {Object} [`stream.Writable` 选项][]
* 返回：{Sign}

创建并返回一个 `Sign` 对象，使用给定的 `algorithm`。使用 [`crypto.getHashes()`][] 获取可用摘要算法的名称。可选 `options` 参数控制 `stream.Writable` 行为。

在某些情况下，可以使用签名算法的名称（如 `'RSA-SHA256'`）而不是摘要算法来创建 `Sign` 实例。这将使用相应的摘要算法。这不适用于所有签名算法，例如 `'ecdsa-with-SHA256'`，因此最好始终使用摘要算法名称。

### `crypto.createVerify(algorithm[, options])`

<!-- YAML
added: v0.1.92
-->

* `algorithm` {string}
* `options` {Object} [`stream.Writable` 选项][]
* 返回：{Verify}

创建并返回一个 `Verify` 对象，使用给定的算法。使用 [`crypto.getHashes()`][] 获取可用签名算法名称的数组。可选 `options` 参数控制 `stream.Writable` 行为。

在某些情况下，可以使用签名算法的名称（如 `'RSA-SHA256'`）而不是摘要算法来创建 `Verify` 实例。这将使用相应的摘要算法。这不适用于所有签名算法，例如 `'ecdsa-with-SHA256'`，因此最好始终使用摘要算法名称。

### `crypto.decapsulate(key, ciphertext[, callback])`

<!-- YAML
added: v24.7.0
-->

> 稳定性：1.2 - 发布候选版本

* `key` {Object|string|ArrayBuffer|Buffer|TypedArray|DataView|KeyObject} 私钥
* `ciphertext` {ArrayBuffer|Buffer|TypedArray|DataView}
* `callback` {Function}
  * `err` {Error}
  * `sharedKey` {Buffer}
* 返回：{Buffer} 如果未提供 `callback` 函数。

<!--lint enable maximum-line-length remark-lint-->

使用私钥和 KEM 算法进行密钥解封装。

支持的密钥类型及其 KEM 算法有：

* `'rsa'`[^openssl30] RSA 秘密值封装
* `'ec'`[^openssl32] DHKEM(P-256, HKDF-SHA256), DHKEM(P-384, HKDF-SHA256), DHKEM(P-521, HKDF-SHA256)
* `'x25519'`[^openssl32] DHKEM(X25519, HKDF-SHA256)
* `'x448'`[^openssl32] DHKEM(X448, HKDF-SHA512)
* `'ml-kem-512'`[^openssl35] ML-KEM
* `'ml-kem-768'`[^openssl35] ML-KEM
* `'ml-kem-1024'`[^openssl35] ML-KEM

如果 `key` 不是 [`KeyObject`][]，此函数的行为就像 `key` 已传递给 [`crypto.createPrivateKey()`][]。

如果提供了 `callback` 函数，此函数使用 libuv 的线程池。

### `crypto.diffieHellman(options[, callback])`

<!-- YAML
added:
 - v13.9.0
 - v12.17.0
changes:
  - version: v26.1.0
    pr-url: https://github.com/nodejs/node/pull/62527
    description: 除了 KeyObject 实例外，还接受密钥数据。
  - version: v23.11.0
    pr-url: https://github.com/nodejs/node/pull/57274
    description: 添加了可选的 callback 参数。
-->

* `options` {Object}
  * `privateKey` {Object|string|ArrayBuffer|Buffer|TypedArray|DataView|KeyObject}
  * `publicKey` {Object|string|ArrayBuffer|Buffer|TypedArray|DataView|KeyObject}
* `callback` {Function}
  * `err` {Error}
  * `secret` {Buffer}
* 返回：{Buffer} 如果未提供 `callback` 函数。

基于 `privateKey` 和 `publicKey` 计算 Diffie-Hellman 共享秘密。
两个密钥必须表示相同的非对称密钥类型，并且必须支持 DH 或 ECDH 操作。

如果 `options.privateKey` 不是 [`KeyObject`][]，此函数的行为就像
`options.privateKey` 已传递给 [`crypto.createPrivateKey()`][]。

如果 `options.publicKey` 不是 [`KeyObject`][]，此函数的行为就像
`options.publicKey` 已传递给 [`crypto.createPublicKey()`][]。

如果提供了 `callback` 函数，此函数使用 libuv 的线程池。

### `crypto.encapsulate(key[, callback])`

<!-- YAML
added: v24.7.0
-->

> 稳定性：1.2 - 发布候选版本

* `key` {Object|string|ArrayBuffer|Buffer|TypedArray|DataView|KeyObject} 公钥
* `callback` {Function}
  * `err` {Error}
  * `result` {Object}
    * `sharedKey` {Buffer}
    * `ciphertext` {Buffer}
* 返回：{Object} 如果未提供 `callback` 函数。
  * `sharedKey` {Buffer}
  * `ciphertext` {Buffer}

<!--lint enable maximum-line-length remark-lint-->

使用公钥和 KEM 算法进行密钥封装。

支持的密钥类型及其 KEM 算法有：

* `'rsa'`[^openssl30] RSA 秘密值封装
* `'ec'`[^openssl32] DHKEM(P-256, HKDF-SHA256), DHKEM(P-384, HKDF-SHA256), DHKEM(P-521, HKDF-SHA256)
* `'x25519'`[^openssl32] DHKEM(X25519, HKDF-SHA256)
* `'x448'`[^openssl32] DHKEM(X448, HKDF-SHA512)
* `'ml-kem-512'`[^openssl35] ML-KEM
* `'ml-kem-768'`[^openssl35] ML-KEM
* `'ml-kem-1024'`[^openssl35] ML-KEM

如果 `key` 不是 [`KeyObject`][]，此函数的行为就像 `key` 已传递给 [`crypto.createPublicKey()`][]。

如果提供了 `callback` 函数，此函数使用 libuv 的线程池。

### `crypto.fips`

<!-- YAML
added: v6.0.0
deprecated: v10.0.0
-->

> 稳定性：0 - 已弃用

用于检查和控制当前是否正在使用符合 FIPS 的加密提供程序的属性。设置为 true 需要 Node.js 的 FIPS 构建。

此属性已弃用。请改用 `crypto.setFips()` 和 `crypto.getFips()`。

### `crypto.generateKey(type, options, callback)`

<!-- YAML
added: v15.0.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在抛出 `ERR_INVALID_ARG_TYPE` 而不是 `ERR_INVALID_CALLBACK`。"
-->

* `type` {string} 生成的密钥的预期用途。当前接受的值为 `'hmac'` 和 `'aes'`。
* `options` {Object}
  * `length` {number} 要生成的密钥的位长度。这必须是大于 0 的值。
    * 如果 `type` 是 `'hmac'`，最小值为 8，最大长度为 2<sup>31</sup>-1。如果值不是 8 的倍数，生成的密钥将被截断为 `Math.floor(length / 8)`。
    * 如果 `type` 是 `'aes'`，长度必须是 `128`、`192` 或 `256` 之一。
* `callback` {Function}
  * `err` {Error}
  * `key` {KeyObject}

异步生成给定 `length` 的新随机密钥。`type` 将决定对 `length` 执行哪些验证。

```mjs
const {
  generateKey,
} = await import('node:crypto');

generateKey('hmac', { length: 512 }, (err, key) => {
  if (err) throw err;
  console.log(key.export().toString('hex'));  // 46e..........620
});
```

```cjs
const {
  generateKey,
} = require('node:crypto');

generateKey('hmac', { length: 512 }, (err, key) => {
  if (err) throw err;
  console.log(key.export().toString('hex'));  // 46e..........620
});
```

生成的 HMAC 密钥的大小不应超过底层哈希函数的块大小。有关更多信息，请参见 [`crypto.createHmac()`][]。

### `crypto.generateKeyPair(type, options, callback)`

<!-- YAML
added: v10.12.0
changes:
  - version: v24.8.0
    pr-url: https://github.com/nodejs/node/pull/59537
    description: 添加对 SLH-DSA 密钥对的支持。
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59461
    description: 添加对 ML-KEM 密钥对的支持。
  - version: v24.6.0
    pr-url: https://github.com/nodejs/node/pull/59259
    description: 添加对 ML-DSA 密钥对的支持。
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在抛出 `ERR_INVALID_ARG_TYPE` 而不是 `ERR_INVALID_CALLBACK`。"
  - version: v16.10.0
    pr-url: https://github.com/nodejs/node/pull/39927
    description: "添加为 RSA-PSS 密钥对定义 `RSASSA-PSS-params` 序列参数的能力。"
  - version:
     - v13.9.0
     - v12.17.0
    pr-url: https://github.com/nodejs/node/pull/31178
    description: 添加对 Diffie-Hellman 的支持。
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/26960
    description: 添加对 RSA-PSS 密钥对的支持。
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/26774
    description: 添加生成 X25519 和 X448 密钥对的能力。
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/26554
    description: 添加生成 Ed25519 和 Ed448 密钥对的能力。
  - version: v11.6.0
    pr-url: https://github.com/nodejs/node/pull/24234
    description: "如果未指定编码，`generateKeyPair` 和 `generateKeyPairSync` 函数现在生成密钥对象。"
-->

* `type` {string} 要生成的非对称密钥类型。参见支持的 [非对称密钥类型][]。
* `options` {Object}
  * `modulusLength` {number} 密钥大小（位）(RSA, DSA)。
  * `publicExponent` {number} 公钥指数 (RSA)。**默认：** `0x10001`。
  * `hashAlgorithm` {string} 消息摘要名称 (RSA-PSS)。
  * `mgf1HashAlgorithm` {string} MGF1 使用的消息摘要名称 (RSA-PSS)。
  * `saltLength` {number} 最小盐长度（字节）(RSA-PSS)。
  * `divisorLength` {number} `q` 的大小（位）(DSA)。
  * `namedCurve` {string} 要使用的曲线名称 (EC)。
  * `prime` {Buffer} 素数参数 (DH)。
  * `primeLength` {number} 素数长度（位）(DH)。
  * `generator` {number} 自定义生成器 (DH)。**默认：** `2`。
  * `groupName` {string} Diffie-Hellman 组名称 (DH)。参见 [`crypto.getDiffieHellman()`][]。
  * `paramEncoding` {string} 必须是 `'named'` 或 `'explicit'` (EC)。**默认：** `'named'`。
  * `publicKeyEncoding` {Object} 参见 [`keyObject.export()`][]。
  * `privateKeyEncoding` {Object} 参见 [`keyObject.export()`][]。
* `callback` {Function}
  * `err` {Error}
  * `publicKey` {string | Buffer | KeyObject}
  * `privateKey` {string | Buffer | KeyObject}

生成给定 `type` 的新非对称密钥对。参见支持的 [非对称密钥类型][]。

如果指定了 `publicKeyEncoding` 或 `privateKeyEncoding`，此函数的行为就像在其结果上调用了 [`keyObject.export()`][]。否则，密钥的相应部分作为 [`KeyObject`][] 返回。

建议将公钥编码为 `'spki'`，私钥编码为 `'pkcs8'` 并加密以进行长期存储：

```mjs
const {
  generateKeyPair,
} = await import('node:crypto');

generateKeyPair('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: 'top secret',
  },
}, (err, publicKey, privateKey) => {
  // 处理错误并使用生成的密钥对。
});
```

```cjs
const {
  generateKeyPair,
} = require('node:crypto');

generateKeyPair('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: 'top secret',
  },
}, (err, publicKey, privateKey) => {
  // 处理错误并使用生成的密钥对。
});
```

完成后，`callback` 将被调用，`err` 设置为 `undefined`，`publicKey` / `privateKey` 代表生成的密钥对。

如果此方法作为其 [`util.promisify()`][] 版本调用，它返回一个 `Promise`，对象包含 `publicKey` 和 `privateKey` 属性。

### `crypto.generateKeyPairSync(type, options)`

<!-- YAML
added: v10.12.0
changes:
  - version: v24.8.0
    pr-url: https://github.com/nodejs/node/pull/59537
    description: 添加对 SLH-DSA 密钥对的支持。
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59461
    description: 添加对 ML-KEM 密钥对的支持。
  - version: v24.6.0
    pr-url: https://github.com/nodejs/node/pull/59259
    description: 添加对 ML-DSA 密钥对的支持。
  - version: v16.10.0
    pr-url: https://github.com/nodejs/node/pull/39927
    description: "添加为 RSA-PSS 密钥对定义 `RSASSA-PSS-params` 序列参数的能力。"
  - version:
     - v13.9.0
     - v12.17.0
    pr-url: https://github.com/nodejs/node/pull/31178
    description: 添加对 Diffie-Hellman 的支持。
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/26960
    description: 添加对 RSA-PSS 密钥对的支持。
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/26774
    description: 添加生成 X25519 和 X448 密钥对的能力。
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/26554
    description: 添加生成 Ed25519 和 Ed448 密钥对的能力。
  - version: v11.6.0
    pr-url: https://github.com/nodejs/node/pull/24234
    description: "如果未指定编码，`generateKeyPair` 和 `generateKeyPairSync` 函数现在生成密钥对象。"
-->

* `type` {string} 要生成的非对称密钥类型。参见支持的 [非对称密钥类型][]。
* `options` {Object}
  * `modulusLength` {number} 密钥大小（位）(RSA, DSA)。
  * `publicExponent` {number} 公钥指数 (RSA)。**默认：** `0x10001`。
  * `hashAlgorithm` {string} 消息摘要名称 (RSA-PSS)。
  * `mgf1HashAlgorithm` {string} MGF1 使用的消息摘要名称 (RSA-PSS)。
  * `saltLength` {number} 最小盐长度（字节）(RSA-PSS)。
  * `divisorLength` {number} `q` 的大小（位）(DSA)。
  * `namedCurve` {string} 要使用的曲线名称 (EC)。
  * `prime` {Buffer} 素数参数 (DH)。
  * `primeLength` {number} 素数长度（位）(DH)。
  * `generator` {number} 自定义生成器 (DH)。**默认：** `2`。
  * `groupName` {string} Diffie-Hellman 组名称 (DH)。参见 [`crypto.getDiffieHellman()`][]。
  * `paramEncoding` {string} 必须是 `'named'` 或 `'explicit'` (EC)。**默认：** `'named'`。
  * `publicKeyEncoding` {Object} 参见 [`keyObject.export()`][]。
  * `privateKeyEncoding` {Object} 参见 [`keyObject.export()`][]。
* 返回：{Object}
  * `publicKey` {string | Buffer | KeyObject}
  * `privateKey` {string | Buffer | KeyObject}

生成给定 `type` 的新非对称密钥对。参见支持的 [非对称密钥类型][]。

如果指定了 `publicKeyEncoding` 或 `privateKeyEncoding`，此函数的行为就像在其结果上调用了 [`keyObject.export()`][]。否则，密钥的相应部分作为 [`KeyObject`][] 返回。

编码公钥时，建议使用 `'spki'`。编码私钥时，建议使用 `'pkcs8'` 并带有强密码短语，并保持密码短语机密。

```mjs
const {
  generateKeyPairSync,
} = await import('node:crypto');

const {
  publicKey,
  privateKey,
} = generateKeyPairSync('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: 'top secret',
  },
});
```

```cjs
const {
  generateKeyPairSync,
} = require('node:crypto');

const {
  publicKey,
  privateKey,
} = generateKeyPairSync('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: 'top secret',
  },
});
```

返回值 `{ publicKey, privateKey }` 代表生成的密钥对。选择 PEM 编码时，相应的密钥将是字符串，否则它将是包含编码为 DER 的数据的 buffer。

### `crypto.generateKeySync(type, options)`

<!-- YAML
added: v15.0.0
-->

* `type` {string} 生成的密钥的预期用途。当前接受的值为 `'hmac'` 和 `'aes'`。
* `options` {Object}
  * `length` {number} 要生成的密钥的位长度。
    * 如果 `type` 是 `'hmac'`，最小值为 8，最大长度为 2<sup>31</sup>-1。如果值不是 8 的倍数，生成的密钥将被截断为 `Math.floor(length / 8)`。
    * 如果 `type` 是 `'aes'`，长度必须是 `128`、`192` 或 `256` 之一。
* 返回：{KeyObject}

同步生成给定 `length` 的新随机密钥。`type` 将决定对 `length` 执行哪些验证。

```mjs
const {
  generateKeySync,
} = await import('node:crypto');

const key = generateKeySync('hmac', { length: 512 });
console.log(key.export().toString('hex'));  // e89..........41e
```

```cjs
const {
  generateKeySync,
} = require('node:crypto');

const key = generateKeySync('hmac', { length: 512 });
console.log(key.export().toString('hex'));  // e89..........41e
```

生成的 HMAC 密钥的大小不应超过底层哈希函数的块大小。有关更多信息，请参见 [`crypto.createHmac()`][]。

### `crypto.generatePrime(size[, options], callback)`

<!-- YAML
added: v15.8.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在抛出 `ERR_INVALID_ARG_TYPE` 而不是 `ERR_INVALID_CALLBACK`。"
-->

* `size` {number} 要生成的素数的大小（位）。
* `options` {Object}
  * `add` {ArrayBuffer|SharedArrayBuffer|TypedArray|Buffer|DataView|bigint}
  * `rem` {ArrayBuffer|SharedArrayBuffer|TypedArray|Buffer|DataView|bigint}
  * `safe` {boolean} **默认：** `false`。
  * `bigint` {boolean} 当为 `true` 时，生成的素数作为 `bigint` 返回。
* `callback` {Function}
  * `err` {Error}
  * `prime` {ArrayBuffer|bigint}

生成 `size` 位的伪随机素数。

如果 `options.safe` 为 `true`，素数将是安全素数——即，`(prime - 1) / 2` 也将是素数。

`options.add` 和 `options.rem` 参数可用于强制执行额外要求，例如，对于 Diffie-Hellman：

* 如果 `options.add` 和 `options.rem` 都设置，素数将满足条件 `prime % add = rem`。
* 如果仅设置 `options.add` 且 `options.safe` 不为 `true`，素数将满足条件 `prime % add = 1`。
* 如果仅设置 `options.add` 且 `options.safe` 设置为 `true`，素数将改为满足条件 `prime % add = 3`。这是必要的，因为对于 `options.add > 2`，`prime % add = 1` 将与 `options.safe` 强制的条件相矛盾。
* 如果未给出 `options.add`，则忽略 `options.rem`。

如果 `options.add` 和 `options.rem` 作为 `ArrayBuffer`、`SharedArrayBuffer`、`TypedArray`、`Buffer` 或 `DataView` 给出，则必须编码为大端序列。

默认情况下，素数编码为 {ArrayBuffer} 中的大端字节序列。如果 `bigint` 选项为 `true`，则提供 {bigint}。

素数的 `size` 将直接影响生成素数所需的时间。大小越大，所需时间越长。因为我们使用 OpenSSL 的 `BN_generate_prime_ex` 函数，它只提供最小控制我们中断生成过程的能力，所以不建议生成过大的素数，因为这样做可能会使进程无响应。

### `crypto.generatePrimeSync(size[, options])`

<!-- YAML
added: v15.8.0
-->

* `size` {number} 要生成的素数的大小（位）。
* `options` {Object}
  * `add` {ArrayBuffer|SharedArrayBuffer|TypedArray|Buffer|DataView|bigint}
  * `rem` {ArrayBuffer|SharedArrayBuffer|TypedArray|Buffer|DataView|bigint}
  * `safe` {boolean} **默认：** `false`。
  * `bigint` {boolean} 当为 `true` 时，生成的素数作为 `bigint` 返回。
* 返回：{ArrayBuffer|bigint}

生成 `size` 位的伪随机素数。

如果 `options.safe` 为 `true`，素数将是安全素数——即，`(prime - 1) / 2` 也将是素数。

`options.add` 和 `options.rem` 参数可用于强制执行额外要求，例如，对于 Diffie-Hellman：

* 如果 `options.add` 和 `options.rem` 都设置，素数将满足条件 `prime % add = rem`。
* 如果仅设置 `options.add` 且 `options.safe` 不为 `true`，素数将满足条件 `prime % add = 1`。
* 如果仅设置 `options.add` 且 `options.safe` 设置为 `true`，素数将改为满足条件 `prime % add = 3`。这是必要的，因为对于 `options.add > 2`，`prime % add = 1` 将与 `options.safe` 强制的条件相矛盾。
* 如果未给出 `options.add`，则忽略 `options.rem`。

如果 `options.add` 和 `options.rem` 作为 `ArrayBuffer`、`SharedArrayBuffer`、`TypedArray`、`Buffer` 或 `DataView` 给出，则必须编码为大端序列。

默认情况下，素数编码为 {ArrayBuffer} 中的大端字节序列。如果 `bigint` 选项为 `true`，则提供 {bigint}。

素数的 `size` 将直接影响生成素数所需的时间。大小越大，所需时间越长。因为我们使用 OpenSSL 的 `BN_generate_prime_ex` 函数，它只提供最小控制我们中断生成过程的能力，所以不建议生成过大的素数，因为这样做可能会使进程无响应。

### `crypto.getCipherInfo(nameOrNid[, options])`

<!-- YAML
added: v15.0.0
-->

* `nameOrNid` {string|number} 要查询的密码的名称或 nid。
* `options` {Object}
  * `keyLength` {number} 测试密钥长度。
  * `ivLength` {number} 测试 IV 长度。
* 返回：{Object}
  * `name` {string} 密码的名称
  * `nid` {number} 密码的 nid
  * `blockSize` {number} 密码的块大小（字节）。当 `mode` 为 `'stream'` 时，此属性被省略。
  * `ivLength` {number} 预期或默认的初始化向量长度（字节）。如果密码不使用初始化向量，则省略此属性。
  * `keyLength` {number} 预期或默认的密钥长度（字节）。
  * `mode` {string} 密码模式。`'cbc'`、`'ccm'`、`'cfb'`、`'ctr'`、`'ecb'`、`'gcm'`、`'ocb'`、`'ofb'`、`'stream'`、`'wrap'`、`'xts'` 之一。

返回有关给定密码的信息。

某些密码接受可变长度的密钥和初始化向量。默认情况下，`crypto.getCipherInfo()` 方法将返回这些密码的默认值。要测试给定的密钥长度或 iv 长度对于给定密码是否可接受，请使用 `keyLength` 和 `ivLength` 选项。如果给定的值不可接受，将返回 `undefined`。

### `crypto.getCiphers()`

<!-- YAML
added: v0.9.3
-->

* Returns: {string\[]} 包含支持的密码算法名称的数组。

```mjs
const {
  getCiphers,
} = await import('node:crypto');

console.log(getCiphers()); // ['aes-128-cbc', 'aes-128-ccm', ...]
```

```cjs
const {
  getCiphers,
} = require('node:crypto');

console.log(getCiphers()); // ['aes-128-cbc', 'aes-128-ccm', ...]
```

### `crypto.getCurves()`

<!-- YAML
added: v2.3.0
-->

* Returns: {string\[]} 包含支持的椭圆曲线名称的数组。

```mjs
const {
  getCurves,
} = await import('node:crypto');

console.log(getCurves()); // ['Oakley-EC2N-3', 'Oakley-EC2N-4', ...]
```

```cjs
const {
  getCurves,
} = require('node:crypto');

console.log(getCurves()); // ['Oakley-EC2N-3', 'Oakley-EC2N-4', ...]
```

### `crypto.getDiffieHellman(groupName)`

<!-- YAML
added: v0.7.5
-->

* `groupName` {string}
* Returns: {DiffieHellmanGroup}

创建一个预定义的 `DiffieHellmanGroup` 密钥交换对象。支持的组列在 [`DiffieHellmanGroup`][] 文档中。

返回的对象模仿由 [`crypto.createDiffieHellman()`][] 创建的对象的接口，但不允许更改密钥（例如使用 [`diffieHellman.setPublicKey()`][]）。使用此方法的优势在于，各方不必事先生成或交换组模数，从而节省了处理器和通信时间。

示例（获取共享秘密）：

```mjs
const {
  getDiffieHellman,
} = await import('node:crypto');
const alice = getDiffieHellman('modp14');
const bob = getDiffieHellman('modp14');

alice.generateKeys();
bob.generateKeys();

const aliceSecret = alice.computeSecret(bob.getPublicKey(), null, 'hex');
const bobSecret = bob.computeSecret(alice.getPublicKey(), null, 'hex');

/* aliceSecret 和 bobSecret 应该相同 */
console.log(aliceSecret === bobSecret);
```

```cjs
const {
  getDiffieHellman,
} = require('node:crypto');

const alice = getDiffieHellman('modp14');
const bob = getDiffieHellman('modp14');

alice.generateKeys();
bob.generateKeys();

const aliceSecret = alice.computeSecret(bob.getPublicKey(), null, 'hex');
const bobSecret = bob.computeSecret(alice.getPublicKey(), null, 'hex');

/* aliceSecret 和 bobSecret 应该相同 */
console.log(aliceSecret === bobSecret);
```

### `crypto.getFips()`

<!-- YAML
added: v10.0.0
-->

* Returns: {number} 当且仅当当前正在使用符合 FIPS 的加密提供程序时为 `1`，否则为 `0`。未来的 semver-major 版本可能会将此 API 的返回类型更改为 {boolean}。

### `crypto.getHashes()`

<!-- YAML
added: v0.9.3
-->

* Returns: {string\[]} 支持的哈希算法名称数组，例如 `'RSA-SHA256'`。哈希算法也称为“摘要”算法。

```mjs
const {
  getHashes,
} = await import('node:crypto');

console.log(getHashes()); // ['DSA', 'DSA-SHA', 'DSA-SHA1', ...]
```

```cjs
const {
  getHashes,
} = require('node:crypto');

console.log(getHashes()); // ['DSA', 'DSA-SHA', 'DSA-SHA1', ...]
```

### `crypto.getRandomValues(typedArray)`

<!-- YAML
added: v17.4.0
-->

* `typedArray` {Buffer|TypedArray|DataView|ArrayBuffer}
* Returns: {Buffer|TypedArray|DataView|ArrayBuffer} 返回 `typedArray`。

[`crypto.webcrypto.getRandomValues()`][] 的便捷别名。此实现不符合 Web Crypto 规范，要编写 Web 兼容代码，请改用 [`crypto.webcrypto.getRandomValues()`][]。

### `crypto.hash(algorithm, data[, options])`

<!-- YAML
added:
 - v21.7.0
 - v20.12.0
changes:
  - version:
     - v25.5.0
     - v24.13.1
    pr-url: https://github.com/nodejs/node/pull/60994
    description: 此 API 不再处于实验阶段。
  - version: v24.4.0
    pr-url: https://github.com/nodejs/node/pull/58121
    description: "为 XOF 哈希函数添加了 `outputLength` 选项。"
-->

* `algorithm` {string|undefined}
* `data` {string|Buffer|TypedArray|DataView} 当 `data` 是字符串时，它将在被哈希之前编码为 UTF-8。如果希望字符串输入使用不同的输入编码，用户可以使用 `TextEncoder` 或 `Buffer.from()` 将字符串编码为 `TypedArray`，并将编码后的 `TypedArray` 传递到此 API 中。
* `options` {Object|string}
  * `outputEncoding` {string} 用于编码返回摘要的 [Encoding][encoding]。**默认：** `'hex'`。
  * `outputLength` {number} 对于 'shake256' 等 XOF 哈希函数，outputLength 选项可用于指定所需的输出长度（字节）。
* Returns: {string|Buffer}

用于创建数据一次性哈希摘要的实用程序。当哈希少量现成数据（<= 5MB）时，它可能比基于对象的 `crypto.createHash()` 更快。如果数据可能很大或是流式的，仍建议使用 `crypto.createHash()`。

`algorithm` 取决于平台上 OpenSSL 版本支持的可用算法。例如 `'sha256'`、`'sha512'` 等。在最新版本的 OpenSSL 上，`openssl list -digest-algorithms` 将显示可用的摘要算法。

如果 `options` 是字符串，则它指定 `outputEncoding`。

示例：

```cjs
const crypto = require('node:crypto');
const { Buffer } = require('node:buffer');

// 对字符串进行哈希处理并将结果作为十六进制编码字符串返回。
const string = 'Node.js';
// 10b3493287f831e81a438811a1ffba01f8cec4b7
console.log(crypto.hash('sha1', string));

// 将 base64 编码的字符串编码为 Buffer，对其进行哈希处理并将
// 结果作为 buffer 返回。
const base64 = 'Tm9kZS5qcw==';
// <Buffer 10 b3 49 32 87 f8 31 e8 1a 43 88 11 a1 ff ba 01 f8 ce c4 b7>
console.log(crypto.hash('sha1', Buffer.from(base64, 'base64'), 'buffer'));
```

```mjs
import crypto from 'node:crypto';
import { Buffer } from 'node:buffer';

// 对字符串进行哈希处理并将结果作为十六进制编码字符串返回。
const string = 'Node.js';
// 10b3493287f831e81a438811a1ffba01f8cec4b7
console.log(crypto.hash('sha1', string));

// 将 base64 编码的字符串编码为 Buffer，对其进行哈希处理，并将
// 结果作为 buffer 返回。
const base64 = 'Tm9kZS5qcw==';
// <Buffer 10 b3 49 32 87 f8 31 e8 1a 43 88 11 a1 ff ba 01 f8 ce c4 b7>
console.log(crypto.hash('sha1', Buffer.from(base64, 'base64'), 'buffer'));
```

### `crypto.hkdf(digest, ikm, salt, info, keylen, callback)`

<!-- YAML
added: v15.0.0
changes:
  - version:
    - v18.8.0
    - v16.18.0
    pr-url: https://github.com/nodejs/node/pull/44201
    description: 输入密钥材料现在可以是零长度。
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是 `ERR_INVALID_CALLBACK`。"
-->

* `digest` {string} 要使用的摘要算法。
* `ikm` {string|ArrayBuffer|Buffer|TypedArray|DataView|KeyObject} 输入密钥材料。必须提供但可以是零长度。
* `salt` {string|ArrayBuffer|Buffer|TypedArray|DataView} 盐值。必须提供但可以是零长度。
* `info` {string|ArrayBuffer|Buffer|TypedArray|DataView} 附加信息值。必须提供但可以是零长度，且不能超过 1024 字节。
* `keylen` {number} 要生成的密钥长度。必须大于 0。最大允许值是所选摘要函数产生的字节数的 `255` 倍（例如 `sha512` 生成 64 字节哈希，使最大 HKDF 输出为 16320 字节）。
* `callback` {Function}
  * `err` {Error}
  * `derivedKey` {ArrayBuffer}

HKDF 是 RFC 5869 中定义的一种简单密钥派生函数。给定的 `ikm`、`salt` 和 `info` 与 `digest` 一起用于派生 `keylen` 字节的密钥。

提供的 `callback` 函数使用两个参数调用：`err` 和 `derivedKey`。如果派生密钥时发生错误，`err` 将被设置；否则 `err` 将为 `null`。成功生成的 `derivedKey` 将作为 {ArrayBuffer} 传递给回调。如果任何输入参数指定了无效的值或类型，将抛出错误。

```mjs
import { Buffer } from 'node:buffer';
const {
  hkdf,
} = await import('node:crypto');

hkdf('sha512', 'key', 'salt', 'info', 64, (err, derivedKey) => {
  if (err) throw err;
  console.log(Buffer.from(derivedKey).toString('hex'));  // '24156e2...5391653'
});
```

```cjs
const {
  hkdf,
} = require('node:crypto');
const { Buffer } = require('node:buffer');

hkdf('sha512', 'key', 'salt', 'info', 64, (err, derivedKey) => {
  if (err) throw err;
  console.log(Buffer.from(derivedKey).toString('hex'));  // '24156e2...5391653'
});
```

### `crypto.hkdfSync(digest, ikm, salt, info, keylen)`

<!-- YAML
added: v15.0.0
changes:
  - version:
    - v18.8.0
    - v16.18.0
    pr-url: https://github.com/nodejs/node/pull/44201
    description: 输入密钥材料现在可以是零长度。
-->

* `digest` {string} 要使用的摘要算法。
* `ikm` {string|ArrayBuffer|Buffer|TypedArray|DataView|KeyObject} 输入密钥材料。必须提供但可以是零长度。
* `salt` {string|ArrayBuffer|Buffer|TypedArray|DataView} 盐值。必须提供但可以是零长度。
* `info` {string|ArrayBuffer|Buffer|TypedArray|DataView} 附加信息值。必须提供但可以是零长度，且不能超过 1024 字节。
* `keylen` {number} 要生成的密钥长度。必须大于 0。最大允许值是所选摘要函数产生的字节数的 `255` 倍（例如 `sha512` 生成 64 字节哈希，使最大 HKDF 输出为 16320 字节）。
* 返回：{ArrayBuffer}

提供 RFC 5869 中定义的同步 HKDF 密钥派生函数。给定的 `ikm`、`salt` 和 `info` 与 `digest` 一起用于派生 `keylen` 字节的密钥。

成功生成的 `derivedKey` 将作为 {ArrayBuffer} 返回。

如果任何输入参数指定了无效的值或类型，或者无法生成派生密钥，将抛出错误。

```mjs
import { Buffer } from 'node:buffer';
const {
  hkdfSync,
} = await import('node:crypto');

const derivedKey = hkdfSync('sha512', 'key', 'salt', 'info', 64);
console.log(Buffer.from(derivedKey).toString('hex'));  // '24156e2...5391653'
```

```cjs
const {
  hkdfSync,
} = require('node:crypto');
const { Buffer } = require('node:buffer');

const derivedKey = hkdfSync('sha512', 'key', 'salt', 'info', 64);
console.log(Buffer.from(derivedKey).toString('hex'));  // '24156e2...5391653'
```

### `crypto.pbkdf2(password, salt, iterations, keylen, digest, callback)`

<!-- YAML
added: v0.5.5
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是 `ERR_INVALID_CALLBACK`。"
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/35093
    description: password 和 salt 参数也可以是 ArrayBuffer 实例。
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/30578
    description: "`iterations` 参数现在限制为正值。早期版本将其他值视为一。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/11305
    description: "`digest` 参数现在总是必需的。"
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/4047
    description: "调用此函数而不传递 `digest` 参数现已弃用，并将发出警告。"
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/5522
    description: "如果 `password` 是字符串，其默认编码已从 `binary` 更改为 `utf8`。"
-->

* `password` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `salt` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `iterations` {number}
* `keylen` {number}
* `digest` {string}
* `callback` {Function}
  * `err` {Error}
  * `derivedKey` {Buffer}

提供异步基于密码的密钥派生函数 2 (PBKDF2) 实现。应用由 `digest` 指定的选定 HMAC 摘要算法，从 `password`、`salt` 和 `iterations` 派生请求字节长度 (`keylen`) 的密钥。

提供的 `callback` 函数使用两个参数调用：`err` 和 `derivedKey`。如果派生密钥时发生错误，`err` 将被设置；否则 `err` 将为 `null`。默认情况下，成功生成的 `derivedKey` 将作为 [`Buffer`][] 传递给回调。如果任何输入参数指定了无效的值或类型，将抛出错误。

`iterations` 参数必须是一个设置得尽可能高的数字。迭代次数越高，派生密钥就越安全，但完成所需的时间就越长。

`salt` 应尽可能唯一。建议 salt 是随机的且至少 16 字节长。详见 [NIST SP 800-132][]。

当为 `password` 或 `salt` 传递字符串时，请考虑 [将字符串用作加密 API 输入时的注意事项][]。

```mjs
const {
  pbkdf2,
} = await import('node:crypto');

pbkdf2('secret', 'salt', 100000, 64, 'sha512', (err, derivedKey) => {
  if (err) throw err;
  console.log(derivedKey.toString('hex'));  // '3745e48...08d59ae'
});
```

```cjs
const {
  pbkdf2,
} = require('node:crypto');

pbkdf2('secret', 'salt', 100000, 64, 'sha512', (err, derivedKey) => {
  if (err) throw err;
  console.log(derivedKey.toString('hex'));  // '3745e48...08d59ae'
});
```

可以使用 [`crypto.getHashes()`][] 检索支持的摘要函数数组。

此 API 使用 libuv 的线程池，这可能会对某些应用程序产生令人惊讶的负面性能影响；有关更多信息，请参阅 [`UV_THREADPOOL_SIZE`][] 文档。

### `crypto.pbkdf2Sync(password, salt, iterations, keylen, digest)`

<!-- YAML
added: v0.9.3
changes:
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/30578
    description: "`iterations` 参数现在限制为正值。早期版本将其他值视为一。"
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/4047
    description: "调用此函数而不传递 `digest` 参数现已弃用，并将发出警告。"
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/5522
    description: "如果 `password` 是字符串，其默认编码已从 `binary` 更改为 `utf8`。"
-->

* `password` {string|Buffer|TypedArray|DataView}
* `salt` {string|Buffer|TypedArray|DataView}
* `iterations` {number}
* `keylen` {number}
* `digest` {string}
* 返回：{Buffer}

提供同步基于密码的密钥派生函数 2 (PBKDF2) 实现。应用由 `digest` 指定的选定 HMAC 摘要算法，从 `password`、`salt` 和 `iterations` 派生请求字节长度 (`keylen`) 的密钥。

如果发生错误，将抛出 `Error`，否则派生密钥将作为 [`Buffer`][] 返回。

`iterations` 参数必须是一个设置得尽可能高的数字。迭代次数越高，派生密钥就越安全，但完成所需的时间就越长。

`salt` 应尽可能唯一。建议 salt 是随机的且至少 16 字节长。详见 [NIST SP 800-132][]。

当为 `password` 或 `salt` 传递字符串时，请考虑 [将字符串用作加密 API 输入时的注意事项][]。

```mjs
const {
  pbkdf2Sync,
} = await import('node:crypto');

const key = pbkdf2Sync('secret', 'salt', 100000, 64, 'sha512');
console.log(key.toString('hex'));  // '3745e48...08d59ae'
```

```cjs
const {
  pbkdf2Sync,
} = require('node:crypto');

const key = pbkdf2Sync('secret', 'salt', 100000, 64, 'sha512');
console.log(key.toString('hex'));  // '3745e48...08d59ae'
```

可以使用 [`crypto.getHashes()`][] 检索支持的摘要函数数组。

### `crypto.privateDecrypt(privateKey, buffer)`

<!-- YAML
added: v0.11.14
changes:
  - version:
      - v21.6.2
      - v20.11.1
      - v18.19.1
    pr-url: https://github.com/nodejs-private/node-private/pull/515
    description: "除非 OpenSSL 构建支持隐式拒绝，否则 `RSA_PKCS1_PADDING` 填充已被禁用。"
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/35093
    description: 添加了 string、ArrayBuffer 和 CryptoKey 作为允许的密钥类型。oaepLabel 可以是 ArrayBuffer。buffer 可以是 string 或 ArrayBuffer。所有接受 buffer 的类型限制为最大 2 ** 31 - 1 字节。
  - version: v12.11.0
    pr-url: https://github.com/nodejs/node/pull/29489
    description: "添加了 `oaepLabel` 选项。"
  - version: v12.9.0
    pr-url: https://github.com/nodejs/node/pull/28335
    description: "添加了 `oaepHash` 选项。"
  - version: v11.6.0
    pr-url: https://github.com/nodejs/node/pull/24234
    description: 此函数现在支持密钥对象。
-->

<!--lint disable maximum-line-length remark-lint-->

* `privateKey` {Object|string|ArrayBuffer|Buffer|TypedArray|DataView|KeyObject|CryptoKey}
  * `oaepHash` {string} 用于 OAEP 填充和 MGF1 的哈希函数。**默认：** `'sha1'`
  * `oaepLabel` {string|ArrayBuffer|Buffer|TypedArray|DataView} 用于 OAEP 填充的标签。如果未指定，则不使用标签。
  * `padding` {crypto.constants} `crypto.constants` 中定义的可选填充值，可以是：`crypto.constants.RSA_NO_PADDING`、`crypto.constants.RSA_PKCS1_PADDING` 或 `crypto.constants.RSA_PKCS1_OAEP_PADDING`。
* `buffer` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* 返回：{Buffer} 包含解密内容的新 `Buffer`。

<!--lint enable maximum-line-length remark-lint-->

使用 `privateKey` 解密 `buffer`。`buffer` 之前是使用相应的公钥加密的，例如使用 [`crypto.publicEncrypt()`][]。

如果 `privateKey` 不是 [`KeyObject`][]，此函数的行为就好像 `privateKey` 已传递给 [`crypto.createPrivateKey()`][]。如果它是一个对象，则可以传递 `padding` 属性。否则，此函数使用 `RSA_PKCS1_OAEP_PADDING`。

在 [`crypto.privateDecrypt()`][] 中使用 `crypto.constants.RSA_PKCS1_PADDING` 需要 OpenSSL 支持隐式拒绝 (`rsa_pkcs1_implicit_rejection`)。如果 Node.js 使用的 OpenSSL 版本不支持此功能，尝试使用 `RSA_PKCS1_PADDING` 将会失败。

### `crypto.privateEncrypt(privateKey, buffer)`

<!-- YAML
added: v1.1.0
changes:
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/35093
    description: 添加了 string、ArrayBuffer 和 CryptoKey 作为允许的密钥类型。passphrase 可以是 ArrayBuffer。buffer 可以是 string 或 ArrayBuffer。所有接受 buffer 的类型限制为最大 2 ** 31 - 1 字节。
  - version: v11.6.0
    pr-url: https://github.com/nodejs/node/pull/24234
    description: 此函数现在支持密钥对象。
-->

<!--lint disable maximum-line-length remark-lint-->

* `privateKey` {Object|string|ArrayBuffer|Buffer|TypedArray|DataView|KeyObject|CryptoKey}
  * `key` {string|ArrayBuffer|Buffer|TypedArray|DataView|KeyObject|CryptoKey} PEM 编码的私钥。
  * `passphrase` {string|ArrayBuffer|Buffer|TypedArray|DataView} 私钥的可选密码短语。
  * `padding` {crypto.constants} `crypto.constants` 中定义的可选填充值，可以是：`crypto.constants.RSA_NO_PADDING` 或 `crypto.constants.RSA_PKCS1_PADDING`。
  * `encoding` {string} 当 `buffer`、`key` 或 `passphrase` 是字符串时使用的字符串编码。
* `buffer` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* 返回：{Buffer} 包含加密内容的新 `Buffer`。

<!--lint enable maximum-line-length remark-lint-->

使用 `privateKey` 加密 `buffer`。返回的数据可以使用相应的公钥解密，例如使用 [`crypto.publicDecrypt()`][]。

如果 `privateKey` 不是 [`KeyObject`][]，此函数的行为就好像 `privateKey` 已传递给 [`crypto.createPrivateKey()`][]。如果它是一个对象，则可以传递 `padding` 属性。否则，此函数使用 `RSA_PKCS1_PADDING`。

### `crypto.publicDecrypt(key, buffer)`

<!-- YAML
added: v1.1.0
changes:
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/35093
    description: 添加了 string、ArrayBuffer 和 CryptoKey 作为允许的密钥类型。passphrase 可以是 ArrayBuffer。buffer 可以是 string 或 ArrayBuffer。所有接受 buffer 的类型限制为最大 2 ** 31 - 1 字节。
  - version: v11.6.0
    pr-url: https://github.com/nodejs/node/pull/24234
    description: 此函数现在支持密钥对象。
-->

<!--lint disable maximum-line-length remark-lint-->

* `key` {Object|string|ArrayBuffer|Buffer|TypedArray|DataView|KeyObject|CryptoKey}
  * `passphrase` {string|ArrayBuffer|Buffer|TypedArray|DataView} 私钥的可选密码短语。
  * `padding` {crypto.constants} `crypto.constants` 中定义的可选填充值，可以是：`crypto.constants.RSA_NO_PADDING` 或 `crypto.constants.RSA_PKCS1_PADDING`。
  * `encoding` {string} 当 `buffer`、`key` 或 `passphrase` 是字符串时使用的字符串编码。
* `buffer` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* 返回：{Buffer} 包含解密内容的新 `Buffer`。

<!--lint enable maximum-line-length remark-lint-->

使用 `key` 解密 `buffer`。`buffer` 之前是使用相应的私钥加密的，例如使用 [`crypto.privateEncrypt()`][]。

如果 `key` 不是 [`KeyObject`][]，此函数的行为就好像 `key` 已传递给 [`crypto.createPublicKey()`][]。如果它是一个对象，则可以传递 `padding` 属性。否则，此函数使用 `RSA_PKCS1_PADDING`。

因为 RSA 公钥可以从私钥派生，所以可以传递私钥而不是公钥。

### `crypto.publicEncrypt(key, buffer)`

<!-- YAML
added: v0.11.14
changes:
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/35093
    description: 添加了 string、ArrayBuffer 和 CryptoKey 作为允许的密钥类型。oaepLabel 和 passphrase 可以是 ArrayBuffer。buffer 可以是 string 或 ArrayBuffer。所有接受 buffer 的类型限制为最大 2 ** 31 - 1 字节。
  - version: v12.11.0
    pr-url: https://github.com/nodejs/node/pull/29489
    description: "添加了 `oaepLabel` 选项。"
  - version: v12.9.0
    pr-url: https://github.com/nodejs/node/pull/28335
    description: "添加了 `oaepHash` 选项。"
  - version: v11.6.0
    pr-url: https://github.com/nodejs/node/pull/24234
    description: 此函数现在支持密钥对象。
-->

<!--lint disable maximum-line-length remark-lint-->

* `key` {Object|string|ArrayBuffer|Buffer|TypedArray|DataView|KeyObject|CryptoKey}
  * `key` {string|ArrayBuffer|Buffer|TypedArray|DataView|KeyObject|CryptoKey} PEM 编码的公钥或私钥，{KeyObject} 或 {CryptoKey}。
  * `oaepHash` {string} 用于 OAEP 填充和 MGF1 的哈希函数。**默认：** `'sha1'`
  * `oaepLabel` {string|ArrayBuffer|Buffer|TypedArray|DataView} 用于 OAEP 填充的标签。如果未指定，则不使用标签。
  * `passphrase` {string|ArrayBuffer|Buffer|TypedArray|DataView} 私钥的可选密码短语。
  * `padding` {crypto.constants} `crypto.constants` 中定义的可选填充值，可以是：`crypto.constants.RSA_NO_PADDING`、`crypto.constants.RSA_PKCS1_PADDING` 或 `crypto.constants.RSA_PKCS1_OAEP_PADDING`。
  * `encoding` {string} 当 `buffer`、`key`、`oaepLabel` 或 `passphrase` 是字符串时使用的字符串编码。
* `buffer` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* 返回：{Buffer} 包含加密内容的新 `Buffer`。

<!--lint enable maximum-line-length remark-lint-->

使用 `key` 加密 `buffer` 的内容并返回一个包含加密内容的新 [`Buffer`][]。返回的数据可以使用相应的私钥解密，例如使用 [`crypto.privateDecrypt()`][]。

如果 `key` 不是 [`KeyObject`][]，此函数的行为就好像 `key` 已传递给 [`crypto.createPublicKey()`][]。如果它是一个对象，则可以传递 `padding` 属性。否则，此函数使用 `RSA_PKCS1_OAEP_PADDING`。

因为 RSA 公钥可以从私钥派生，所以可以传递私钥而不是公钥。

### `crypto.randomBytes(size[, callback])`

<!-- YAML
added: v0.5.8
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是 `ERR_INVALID_CALLBACK`。"
  - version: v9.0.0
    pr-url: https://github.com/nodejs/node/pull/16454
    description: "将 `null` 作为 `callback` 参数传递现在会抛出 `ERR_INVALID_CALLBACK`。"
-->

* `size` {number} 要生成的字节数。`size` 不得大于 `2**31 - 1`。
* `callback` {Function}
  * `err` {Error}
  * `buf` {Buffer}
* Returns: {Buffer} 如果未提供 `callback` 函数。

生成加密强的伪随机数据。`size` 参数是一个数字，指示要生成的字节数。

如果提供了 `callback` 函数，则字节是异步生成的，并且 `callback` 函数使用两个参数调用：`err` 和 `buf`。如果发生错误，`err` 将是一个 `Error` 对象；否则它为 `null`。`buf` 参数是一个包含生成字节的 [`Buffer`][]。

```mjs
// 异步
const {
  randomBytes,
} = await import('node:crypto');

randomBytes(256, (err, buf) => {
  if (err) throw err;
  console.log(`${buf.length} 字节的随机数据：${buf.toString('hex')}`);
});
```

```cjs
// 异步
const {
  randomBytes,
} = require('node:crypto');

randomBytes(256, (err, buf) => {
  if (err) throw err;
  console.log(`${buf.length} 字节的随机数据：${buf.toString('hex')}`);
});
```

如果未提供 `callback` 函数，则随机字节是同步生成的并作为 [`Buffer`][] 返回。如果生成字节出现问题，将抛出错误。

```mjs
// 同步
const {
  randomBytes,
} = await import('node:crypto');

const buf = randomBytes(256);
console.log(
  `${buf.length} 字节的随机数据：${buf.toString('hex')}`);
```

```cjs
// 同步
const {
  randomBytes,
} = require('node:crypto');

const buf = randomBytes(256);
console.log(
  `${buf.length} 字节的随机数据：${buf.toString('hex')}`);
```

`crypto.randomBytes()` 方法直到有足够可用的熵才会完成。这通常永远不会超过几毫秒。唯一可能生成随机字节阻塞较长时间的情况是在刚启动后，此时整个系统的熵仍然较低。

此 API 使用 libuv 的线程池，这可能会对某些应用程序产生令人惊讶的负面性能影响；有关更多信息，请参阅 [`UV_THREADPOOL_SIZE`][] 文档。

`crypto.randomBytes()` 的异步版本在单个线程池请求中执行。为了最小化线程池任务长度变化，在作为满足客户端请求的一部分时，请分区大型 `randomBytes` 请求。

### `crypto.randomFill(buffer[, offset][, size], callback)`

<!-- YAML
added:
  - v7.10.0
  - v6.13.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是 `ERR_INVALID_CALLBACK`。"
  - version: v9.0.0
    pr-url: https://github.com/nodejs/node/pull/15231
    description: "`buffer` 参数可以是任何 `TypedArray` 或 `DataView`。"
-->

* `buffer` {ArrayBuffer|Buffer|TypedArray|DataView} 必须提供。提供的 `buffer` 的大小不得大于 `2**31 - 1`。
* `offset` {number} **默认：** `0`
* `size` {number} **默认：** `buffer.length - offset`。`size` 不得大于 `2**31 - 1`。
* `callback` {Function} `function(err, buf) {}`。

此函数类似于 [`crypto.randomBytes()`][]，但要求第一个参数是要填充的 [`Buffer`][]。它还要求传入一个回调。

如果未提供 `callback` 函数，将抛出错误。

```mjs
import { Buffer } from 'node:buffer';
const { randomFill } = await import('node:crypto');

const buf = Buffer.alloc(10);
randomFill(buf, (err, buf) => {
  if (err) throw err;
  console.log(buf.toString('hex'));
});

randomFill(buf, 5, (err, buf) => {
  if (err) throw err;
  console.log(buf.toString('hex'));
});

// 上面等同于以下：
randomFill(buf, 5, 5, (err, buf) => {
  if (err) throw err;
  console.log(buf.toString('hex'));
});
```

```cjs
const { randomFill } = require('node:crypto');
const { Buffer } = require('node:buffer');

const buf = Buffer.alloc(10);
randomFill(buf, (err, buf) => {
  if (err) throw err;
  console.log(buf.toString('hex'));
});

randomFill(buf, 5, (err, buf) => {
  if (err) throw err;
  console.log(buf.toString('hex'));
});

// 上面等同于以下：
randomFill(buf, 5, 5, (err, buf) => {
  if (err) throw err;
  console.log(buf.toString('hex'));
});
```

任何 `ArrayBuffer`、`TypedArray` 或 `DataView` 实例都可以作为 `buffer` 传递。

虽然这包括 `Float32Array` 和 `Float64Array` 实例，但此函数不应用于生成随机浮点数。结果可能包含 `+Infinity`、`-Infinity` 和 `NaN`，即使数组仅包含有限数字，它们也不是从均匀随机分布中提取的，并且没有有意义的下限或上限。

```mjs
import { Buffer } from 'node:buffer';
const { randomFill } = await import('node:crypto');

const a = new Uint32Array(10);
randomFill(a, (err, buf) => {
  if (err) throw err;
  console.log(Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength)
    .toString('hex'));
});

const b = new DataView(new ArrayBuffer(10));
randomFill(b, (err, buf) => {
  if (err) throw err;
  console.log(Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength)
    .toString('hex'));
});

const c = new ArrayBuffer(10);
randomFill(c, (err, buf) => {
  if (err) throw err;
  console.log(Buffer.from(buf).toString('hex'));
});
```

```cjs
const { randomFill } = require('node:crypto');
const { Buffer } = require('node:buffer');

const a = new Uint32Array(10);
randomFill(a, (err, buf) => {
  if (err) throw err;
  console.log(Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength)
    .toString('hex'));
});

const b = new DataView(new ArrayBuffer(10));
randomFill(b, (err, buf) => {
  if (err) throw err;
  console.log(Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength)
    .toString('hex'));
});

const c = new ArrayBuffer(10);
randomFill(c, (err, buf) => {
  if (err) throw err;
  console.log(Buffer.from(buf).toString('hex'));
});
```

此 API 使用 libuv 的线程池，这可能会对某些应用程序产生令人惊讶的负面性能影响；有关更多信息，请参阅 [`UV_THREADPOOL_SIZE`][] 文档。

`crypto.randomFill()` 的异步版本在单个线程池请求中执行。为了最小化线程池任务长度变化，在作为满足客户端请求的一部分时，请分区大型 `randomFill` 请求。

### `crypto.randomFillSync(buffer[, offset][, size])`

<!-- YAML
added:
  - v7.10.0
  - v6.13.0
changes:
  - version: v9.0.0
    pr-url: https://github.com/nodejs/node/pull/15231
    description: "`buffer` 参数可以是任何 `TypedArray` 或 `DataView`。"
-->

* `buffer` {ArrayBuffer|Buffer|TypedArray|DataView} 必须提供。提供的 `buffer` 的大小不得大于 `2**31 - 1`。
* `offset` {number} **默认：** `0`
* `size` {number} **默认：** `buffer.length - offset`。`size` 不得大于 `2**31 - 1`。
* 返回：{ArrayBuffer|Buffer|TypedArray|DataView} 作为 `buffer` 参数传递的对象。

[`crypto.randomFill()`][] 的同步版本。

```mjs
import { Buffer } from 'node:buffer';
const { randomFillSync } = await import('node:crypto');

const buf = Buffer.alloc(10);
console.log(randomFillSync(buf).toString('hex'));

randomFillSync(buf, 5);
console.log(buf.toString('hex'));

// 上面等同于以下：
randomFillSync(buf, 5, 5);
console.log(buf.toString('hex'));
```

```cjs
const { randomFillSync } = require('node:crypto');
const { Buffer } = require('node:buffer');

const buf = Buffer.alloc(10);
console.log(randomFillSync(buf).toString('hex'));

randomFillSync(buf, 5);
console.log(buf.toString('hex'));

// 上面等同于以下：
randomFillSync(buf, 5, 5);
console.log(buf.toString('hex'));
```

任何 `ArrayBuffer`、`TypedArray` 或 `DataView` 实例都可以作为 `buffer` 传递。

```mjs
import { Buffer } from 'node:buffer';
const { randomFillSync } = await import('node:crypto');

const a = new Uint32Array(10);
console.log(Buffer.from(randomFillSync(a).buffer,
                        a.byteOffset, a.byteLength).toString('hex'));

const b = new DataView(new ArrayBuffer(10));
console.log(Buffer.from(randomFillSync(b).buffer,
                        b.byteOffset, b.byteLength).toString('hex'));

const c = new ArrayBuffer(10);
console.log(Buffer.from(randomFillSync(c)).toString('hex'));
```

```cjs
const { randomFillSync } = require('node:crypto');
const { Buffer } = require('node:buffer');

const a = new Uint32Array(10);
console.log(Buffer.from(randomFillSync(a).buffer,
                        a.byteOffset, a.byteLength).toString('hex'));

const b = new DataView(new ArrayBuffer(10));
console.log(Buffer.from(randomFillSync(b).buffer,
                        b.byteOffset, b.byteLength).toString('hex'));

const c = new ArrayBuffer(10);
console.log(Buffer.from(randomFillSync(c)).toString('hex'));
```

### `crypto.randomInt([min, ]max[, callback])`

<!-- YAML
added:
  - v14.10.0
  - v12.19.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是 `ERR_INVALID_CALLBACK`。"
-->

* `min` {integer} 随机范围的起始值（包含）。**默认：** `0`。
* `max` {integer} 随机范围的结束值（不包含）。
* `callback` {Function} `function(err, n) {}`。

返回一个随机整数 `n`，使得 `min <= n < max`。此实现避免了 [模偏差][]。

范围 (`max - min`) 必须小于 2<sup>48</sup>。`min` 和 `max` 必须是 [安全整数][]。

如果未提供 `callback` 函数，则随机整数会同步生成。

```mjs
// 异步
const {
  randomInt,
} = await import('node:crypto');

randomInt(3, (err, n) => {
  if (err) throw err;
  console.log(`从 (0, 1, 2) 中选择的随机数：${n}`);
});
```

```cjs
// 异步
const {
  randomInt,
} = require('node:crypto');

randomInt(3, (err, n) => {
  if (err) throw err;
  console.log(`从 (0, 1, 2) 中选择的随机数：${n}`);
});
```

```mjs
// 同步
const {
  randomInt,
} = await import('node:crypto');

const n = randomInt(3);
console.log(`从 (0, 1, 2) 中选择的随机数：${n}`);
```

```cjs
// 同步
const {
  randomInt,
} = require('node:crypto');

const n = randomInt(3);
console.log(`从 (0, 1, 2) 中选择的随机数：${n}`);
```

```mjs
// 带 `min` 参数
const {
  randomInt,
} = await import('node:crypto');

const n = randomInt(1, 7);
console.log(`掷出的骰子点数：${n}`);
```

```cjs
// 带 `min` 参数
const {
  randomInt,
} = require('node:crypto');

const n = randomInt(1, 7);
console.log(`掷出的骰子点数：${n}`);
```

### `crypto.randomUUID([options])`

<!-- YAML
added:
  - v15.6.0
  - v14.17.0
-->

* `options` {Object}
  * `disableEntropyCache` {boolean} 默认情况下，为了提高性能，Node.js 会生成并缓存足够的随机数据，以生成最多 128 个随机 UUID。要生成不使用缓存的 UUID，请将 `disableEntropyCache` 设置为 `true`。**默认：** `false`。
* Returns: {string}

生成一个随机 [RFC 4122][] 版本 4 UUID。UUID 使用加密伪随机数生成器生成。

### `crypto.randomUUIDv7([options])`

<!-- YAML
added: v26.1.0
-->

* `options` {Object}
  * `disableEntropyCache` {boolean} 默认情况下，为了提高性能，Node.js 会生成并缓存足够的随机数据，以生成最多 128 个随机 UUID。要生成不使用缓存的 UUID，请将 `disableEntropyCache` 设置为 `true`。**默认：** `false`。
* Returns: {string}

生成一个随机的 [RFC 9562] 版本 7 UUID。该 UUID 在最高 48 位包含一个以毫秒为精度的 Unix 时间戳，随后在其余字段中包含加密安全的随机比特，因此适合作为带有基于时间排序能力的数据库键。嵌入的时间戳依赖于非单调时钟，并不保证严格递增。

### `crypto.scrypt(password, salt, keylen[, options], callback)`

<!-- YAML
added: v10.5.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是 `ERR_INVALID_CALLBACK`。"
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/35093
    description: password 和 salt 参数也可以是 ArrayBuffer 实例。
  - version:
     - v12.8.0
     - v10.17.0
    pr-url: https://github.com/nodejs/node/pull/28799
    description: "`maxmem` 值现在可以是任何安全整数。"
  - version: v10.9.0
    pr-url: https://github.com/nodejs/node/pull/21525
    description: "添加了 `cost`、`blockSize` 和 `parallelization` 选项名称。"
-->

* `password` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `salt` {string|ArrayBuffer|Buffer|TypedArray|DataView}
* `keylen` {number}
* `options` {Object}
  * `cost` {number} CPU/内存成本参数。必须是大于 1 的 2 的幂。**默认：** `16384`。
  * `blockSize` {number} 块大小参数。**默认：** `8`。
  * `parallelization` {number} 并行化参数。**默认：** `1`。
  * `N` {number} `cost` 的别名。只能指定其中之一。
  * `r` {number} `blockSize` 的别名。只能指定其中之一。
  * `p` {number} `parallelization` 的别名。只能指定其中之一。
  * `maxmem` {number} 内存上限。当（大约）`128 * N * r > maxmem` 时为错误。**默认：** `32 * 1024 * 1024`。
* `callback` {Function}
  * `err` {Error}
  * `derivedKey` {Buffer}

提供异步 [scrypt][] 实现。Scrypt 是一种基于密码的密钥派生函数，旨在在计算和内存方面都很昂贵，从而使暴力破解攻击无利可图。

`salt` 应尽可能唯一。建议 salt 是随机的且至少 16 字节长。详见 [NIST SP 800-132][]。

当为 `password` 或 `salt` 传递字符串时，请考虑 [将字符串用作加密 API 输入时的注意事项][]。

`callback` 函数使用两个参数调用：`err` 和 `derivedKey`。`err` 是密钥派生失败时的异常对象，否则 `err` 为 `null`。`derivedKey` 作为 [`Buffer`][] 传递给回调。

当任何输入参数指定无效的值或类型时，将抛出异常。

```mjs
const {
  scrypt,
} = await import('node:crypto');

// 使用工厂默认值。
scrypt('password', 'salt', 64, (err, derivedKey) => {
  if (err) throw err;
  console.log(derivedKey.toString('hex'));  // '3745e48...08d59ae'
});
// 使用自定义 N 参数。必须是 2 的幂。
scrypt('password', 'salt', 64, { N: 1024 }, (err, derivedKey) => {
  if (err) throw err;
  console.log(derivedKey.toString('hex'));  // '3745e48...aa39b34'
});
```

```cjs
const {
  scrypt,
} = require('node:crypto');

// 使用工厂默认值。
scrypt('password', 'salt', 64, (err, derivedKey) => {
  if (err) throw err;
  console.log(derivedKey.toString('hex'));  // '3745e48...08d59ae'
});
// 使用自定义 N 参数。必须是 2 的幂。
scrypt('password', 'salt', 64, { N: 1024 }, (err, derivedKey) => {
  if (err) throw err;
  console.log(derivedKey.toString('hex'));  // '3745e48...aa39b34'
});
```

### `crypto.scryptSync(password, salt, keylen[, options])`

<!-- YAML
added: v10.5.0
changes:
  - version:
     - v12.8.0
     - v10.17.0
    pr-url: https://github.com/nodejs/node/pull/28799
    description: "`maxmem` 值现在可以是任何安全整数。"
  - version: v10.9.0
    pr-url: https://github.com/nodejs/node/pull/21525
    description: "添加了 `cost`、`blockSize` 和 `parallelization` 选项名称。"
-->

* `password` {string|Buffer|TypedArray|DataView}
* `salt` {string|Buffer|TypedArray|DataView}
* `keylen` {number}
* `options` {Object}
  * `cost` {number} CPU/内存成本参数。必须是大于 1 的 2 的幂。**默认：** `16384`。
  * `blockSize` {number} 块大小参数。**默认：** `8`。
  * `parallelization` {number} 并行化参数。**默认：** `1`。
  * `N` {number} `cost` 的别名。只能指定其中之一。
  * `r` {number} `blockSize` 的别名。只能指定其中之一。
  * `p` {number} `parallelization` 的别名。只能指定其中之一。
  * `maxmem` {number} 内存上限。当（大约）`128 * N * r > maxmem` 时为错误。**默认：** `32 * 1024 * 1024`。
* Returns: {Buffer}

提供同步 [scrypt][] 实现。Scrypt 是一种基于密码的密钥派生函数，旨在在计算和内存方面都很昂贵，从而使暴力破解攻击无利可图。

`salt` 应尽可能唯一。建议 salt 是随机的且至少 16 字节长。详见 [NIST SP 800-132][]。

当为 `password` 或 `salt` 传递字符串时，请考虑 [将字符串用作加密 API 输入时的注意事项][]。

当密钥派生失败时抛出异常，否则派生密钥作为 [`Buffer`][] 返回。

当任何输入参数指定无效的值或类型时，将抛出异常。

```mjs
const {
  scryptSync,
} = await import('node:crypto');
// 使用工厂默认值。

const key1 = scryptSync('password', 'salt', 64);
console.log(key1.toString('hex'));  // '3745e48...08d59ae'
// 使用自定义 N 参数。必须是 2 的幂。
const key2 = scryptSync('password', 'salt', 64, { N: 1024 });
console.log(key2.toString('hex'));  // '3745e48...aa39b34'
```

```cjs
const {
  scryptSync,
} = require('node:crypto');
// 使用工厂默认值。

const key1 = scryptSync('password', 'salt', 64);
console.log(key1.toString('hex'));  // '3745e48...08d59ae'
// 使用自定义 N 参数。必须是 2 的幂。
const key2 = scryptSync('password', 'salt', 64, { N: 1024 });
console.log(key2.toString('hex'));  // '3745e48...aa39b34'
```

### `crypto.secureHeapUsed()`

<!-- YAML
added: v15.6.0
-->

* Returns: {Object}
  * `total` {number} 使用 `--secure-heap=n` 命令行标志指定的已分配安全堆总大小。
  * `min` {number} 使用 `--secure-heap-min` 命令行标志指定的安全堆最小分配。
  * `used` {number} 当前从安全堆分配的总字节数。
  * `utilization` {number} 计算得到的 `used` 与 `total` 分配字节数的比率。

### `crypto.setEngine(engine[, flags])`

<!-- YAML
added: v0.11.11
changes:
  - version:
    - v22.4.0
    - v20.16.0
    pr-url: https://github.com/nodejs/node/pull/53329
    description: OpenSSL 3 中的自定义引擎支持已弃用。
-->

* `engine` {string}
* `flags` {crypto.constants} **默认：** `crypto.constants.ENGINE_METHOD_ALL`

加载并设置 `engine` 以用于部分或全部 OpenSSL 函数（由标志选择）。从 OpenSSL 3 开始，对 OpenSSL 中自定义引擎的支持已弃用。

`engine` 可以是 id 或引擎共享库的路径。

可选的 `flags` 参数默认使用 `ENGINE_METHOD_ALL`。`flags` 是一个位字段，采用以下标志之一或组合（定义在 `crypto.constants` 中）：

* `crypto.constants.ENGINE_METHOD_RSA`
* `crypto.constants.ENGINE_METHOD_DSA`
* `crypto.constants.ENGINE_METHOD_DH`
* `crypto.constants.ENGINE_METHOD_RAND`
* `crypto.constants.ENGINE_METHOD_EC`
* `crypto.constants.ENGINE_METHOD_CIPHERS`
* `crypto.constants.ENGINE_METHOD_DIGESTS`
* `crypto.constants.ENGINE_METHOD_PKEY_METHS`
* `crypto.constants.ENGINE_METHOD_PKEY_ASN1_METHS`
* `crypto.constants.ENGINE_METHOD_ALL`
* `crypto.constants.ENGINE_METHOD_NONE`

### `crypto.setFips(bool)`

<!-- YAML
added: v10.0.0
-->

* `bool` {boolean} `true` 以启用 FIPS 模式。

在启用 FIPS 的 Node.js 构建中启用符合 FIPS 的加密提供程序。如果 FIPS 模式不可用，则抛出错误。

### `crypto.sign(algorithm, data, key[, callback])`

<!-- YAML
added: v12.0.0
changes:
  - version: v26.0.0
    pr-url: https://github.com/nodejs/node/pull/62474
    description: 添加对 Ed25519 上下文参数的支持。
  - version: v24.8.0
    pr-url: https://github.com/nodejs/node/pull/59570
    description: 添加对 ML-DSA、Ed448 和 SLH-DSA 上下文参数的支持。
  - version: v24.8.0
    pr-url: https://github.com/nodejs/node/pull/59537
    description: 添加对 SLH-DSA 签名的支持。
  - version: v24.6.0
    pr-url: https://github.com/nodejs/node/pull/59259
    description: 添加对 ML-DSA 签名的支持。
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是 `ERR_INVALID_CALLBACK`。"
  - version: v15.12.0
    pr-url: https://github.com/nodejs/node/pull/37500
    description: 添加了可选的 callback 参数。
  - version:
     - v13.2.0
     - v12.16.0
    pr-url: https://github.com/nodejs/node/pull/29292
    description: 此函数现在支持 IEEE-P1363 DSA 和 ECDSA 签名。
-->

<!--lint disable maximum-line-length remark-lint-->

* `algorithm` {string | null | undefined}
* `data` {ArrayBuffer|Buffer|TypedArray|DataView}
* `key` {Object|string|ArrayBuffer|Buffer|TypedArray|DataView|KeyObject|CryptoKey}
* `callback` {Function}
  * `err` {Error}
  * `signature` {Buffer}
* Returns: {Buffer} 如果未提供 `callback` 函数。

<!--lint enable maximum-line-length remark-lint-->

使用给定的私钥和算法计算并返回 `data` 的签名。如果 `algorithm` 是 `null` 或 `undefined`，则算法取决于密钥类型。

对于 Ed25519、Ed448 和 ML-DSA，`algorithm` 必须是 `null` 或 `undefined`。

如果 `key` 不是 [`KeyObject`][]，此函数的行为就好像 `key` 已传递给 [`crypto.createPrivateKey()`][]。如果它是一个对象，则可以传递以下附加属性：

* `dsaEncoding` {string} 对于 DSA 和 ECDSA，此选项指定生成签名的格式。它可以是以下之一：
  * `'der'`（默认）：DER 编码的 ASN.1 签名结构编码 `(r, s)`。
  * `'ieee-p1363'`：IEEE-P1363 中提出的签名格式 `r || s`。
* `padding` {integer} RSA 的可选填充值，以下之一：

  * `crypto.constants.RSA_PKCS1_PADDING`（默认）
  * `crypto.constants.RSA_PKCS1_PSS_PADDING`

  `RSA_PKCS1_PSS_PADDING` 将使用 MGF1 与 [RFC 4055][] 第 3.1 节中指定的用于签名消息的相同哈希函数。
* `saltLength` {integer} 当填充为 `RSA_PKCS1_PSS_PADDING` 时的盐长度。特殊值 `crypto.constants.RSA_PSS_SALTLEN_DIGEST` 将盐长度设置为摘要大小，`crypto.constants.RSA_PSS_SALTLEN_MAX_SIGN`（默认）将其设置为最大允许值。
* `context` {ArrayBuffer|Buffer|TypedArray|DataView} 对于 Ed25519[^openssl32]（使用 [RFC 8032][] 中的 Ed25519ctx）、Ed448、ML-DSA 和 SLH-DSA，此选项指定可选上下文，以区分使用相同密钥为不同目的生成的签名。

如果提供了 `callback` 函数，此函数使用 libuv 的线程池。

### `crypto.subtle`

<!-- YAML
added: v17.4.0
-->

* Type: {SubtleCrypto}

[`crypto.webcrypto.subtle`][] 的便捷别名。

### `crypto.timingSafeEqual(a, b)`

<!-- YAML
added: v6.6.0
changes:
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/35093
    description: a 和 b 参数也可以是 ArrayBuffer。
-->

* `a` {ArrayBuffer|Buffer|TypedArray|DataView}
* `b` {ArrayBuffer|Buffer|TypedArray|DataView}
* Returns: {boolean}

此函数使用恒定时间算法比较给定
`ArrayBuffer`、`TypedArray` 或 `DataView` 实例所表示的底层字节。

此函数不会泄露可被攻击者用来猜测其中一个值的时间信息。这适用于
比较 HMAC 摘要或秘密值，例如身份验证 cookie 或
[能力 URL](https://www.w3.org/capability-urls/)。

`a` 和 `b` 必须都是 `Buffer`、`TypedArray` 或 `DataView`，并且它们
必须具有相同的字节长度。如果 `a` 和 `b` 具有
不同的字节长度，则会抛出错误。

如果 `a` 和 `b` 中至少有一个是每个条目超过一个字节的 `TypedArray`，
例如 `Uint16Array`，则结果将使用平台
字节序计算。

<strong class="critical">当两个输入都是 `Float32Array` 或
`Float64Array` 时，由于浮点数的 IEEE 754
编码，此函数可能会返回意外的结果。特别是，`x === y` 和
`Object.is(x, y)` 都不意味着两个浮点数
`x` 和 `y` 的字节表示相等。</strong>

使用 `crypto.timingSafeEqual` 并不能保证_周围_的代码
是时间安全的。应注意确保周围代码不会
引入时间漏洞。

### `crypto.verify(algorithm, data, key, signature[, callback])`

<!-- YAML
added: v12.0.0
changes:
  - version: v26.0.0
    pr-url: https://github.com/nodejs/node/pull/62474
    description: 添加对 Ed25519 上下文参数的支持。
  - version: v24.8.0
    pr-url: https://github.com/nodejs/node/pull/59570
    description: 添加对 ML-DSA、Ed448 和 SLH-DSA 上下文参数的支持。
  - version: v24.8.0
    pr-url: https://github.com/nodejs/node/pull/59537
    description: 添加对 SLH-DSA 签名验证的支持。
  - version: v24.6.0
    pr-url: https://github.com/nodejs/node/pull/59259
    description: 添加对 ML-DSA 签名验证的支持。
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是`ERR_INVALID_CALLBACK`。"
  - version: v15.12.0
    pr-url: https://github.com/nodejs/node/pull/37500
    description: 添加了可选的 callback 参数。
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/35093
    description: data、key 和 signature 参数也可以是 ArrayBuffer。
  - version:
     - v13.2.0
     - v12.16.0
    pr-url: https://github.com/nodejs/node/pull/29292
    description: 此函数现在支持 IEEE-P1363 DSA 和 ECDSA 签名。
-->

<!--lint disable maximum-line-length remark-lint-->

* `algorithm` {string|null|undefined}
* `data` {ArrayBuffer| Buffer|TypedArray|DataView}
* `key` {Object|string|ArrayBuffer|Buffer|TypedArray|DataView|KeyObject|CryptoKey}
* `signature` {ArrayBuffer|Buffer|TypedArray|DataView}
* `callback` {Function}
  * `err` {Error}
  * `result` {boolean}
* 返回：{boolean} 如果未提供
  `callback` 函数，则根据数据和公钥的签名有效性返回 `true` 或
  `false`。

<!--lint enable maximum-line-length remark-lint-->

使用给定的密钥和算法验证 `data` 的给定签名。如果
`algorithm` 是 `null` 或 `undefined`，则算法取决于
密钥类型。

对于 Ed25519、Ed448 和
ML-DSA，`algorithm` 必须为 `null` 或 `undefined`。

如果 `key` 不是 [`KeyObject`][]，此函数的行为如同 `key` 已
传递给 [`crypto.createPublicKey()`][]。如果它是一个对象，则可以传递
以下附加属性：

* `dsaEncoding` {string} 对于 DSA 和 ECDSA，此选项指定
  签名的格式。它可以是以下之一：
  * `'der'`（默认）：DER 编码的 ASN.1 签名结构编码 `(r, s)`。
  * `'ieee-p1363'`：IEEE-P1363 中提出的签名格式 `r || s`。
* `padding` {integer} RSA 的可选填充值，以下之一：

  * `crypto.constants.RSA_PKCS1_PADDING`（默认）
  * `crypto.constants.RSA_PKCS1_PSS_PADDING`

  `RSA_PKCS1_PSS_PADDING` 将使用 MGF1 与 [RFC 4055][] 第 3.1 节中指定的
  用于签名消息的相同哈希函数。
* `saltLength` {integer} 当填充为
  `RSA_PKCS1_PSS_PADDING` 时的盐长度。特殊值
  `crypto.constants.RSA_PSS_SALTLEN_DIGEST` 将盐长度设置为摘要
  大小，`crypto.constants.RSA_PSS_SALTLEN_MAX_SIGN`（默认）将其设置为
  最大允许值。
* `context` {ArrayBuffer|Buffer|TypedArray|DataView} 对于 Ed25519[^openssl32]
  （使用 [RFC 8032][] 中的 Ed25519ctx）、Ed448、ML-DSA 和 SLH-DSA，
  此选项指定可选的上下文，以区分使用相同密钥
  为不同目的生成的签名。

`signature` 参数是之前为 `data` 计算出的签名。

因为公钥可以从私钥派生，所以可以将私钥或公钥传递给 `key`。

如果提供了 `callback` 函数，此函数使用 libuv 的线程池。

### `crypto.webcrypto`

<!-- YAML
added: v15.0.0
-->

类型：{Crypto} Web Crypto API 标准的实现。

详见 [Web Crypto API 文档][].

## 注意事项

### 使用字符串作为加密 API 的输入

出于历史原因，Node.js 提供的许多加密 API 接受
字符串作为输入，而底层加密算法处理的是字节
序列。这些实例包括明文、密文、对称密钥、
初始化向量、密码短语、盐、身份验证标签、
和附加认证数据。

将字符串传递给加密 API 时，请考虑以下因素。

* 并非所有字节序列都是有效的 UTF-8 字符串。因此，当长度为 `n` 的字节
  序列源自字符串时，其熵通常低于随机或伪随机 `n` 字节序列的熵。
  例如，没有 UTF-8 字符串会产生字节序列 `c0 af`。秘密
  密钥几乎应仅是随机或伪随机字节序列。
* 同样，当将随机或伪随机字节序列转换为 UTF-8
  字符串时，不代表有效码点的子序列可能会被
  Unicode 替换字符（`U+FFFD`）替换。因此，生成的 Unicode 字符串的字节表示
  可能不等于创建该字符串的字节序列。

  ```js
  const original = [0xc0, 0xaf];
  const bytesAsString = Buffer.from(original).toString('utf8');
  const stringAsBytes = Buffer.from(bytesAsString, 'utf8');
  console.log(stringAsBytes);
  // 打印 '<Buffer ef bf bd ef bf bd>'。
  ```

  密码、哈希函数、签名算法和密钥
  派生函数的输出是伪随机字节序列，不应
  用作 Unicode 字符串。
* 当字符串来自用户输入时，某些 Unicode 字符可以
  以多种等效方式表示，从而导致不同的字节
  序列。例如，当将用户密码短语传递给密钥派生
  函数（如 PBKDF2 或 scrypt）时，密钥派生函数
  的结果取决于字符串是使用组合字符还是分解字符。Node.js
  不规范字符表示。开发者应考虑在将用户输入传递给
  加密 API 之前对其使用 [`String.prototype.normalize()`][]。

### 遗留流 API（Node.js 0.10 之前）

Crypto 模块是在统一流 API 的概念之前以及在使用
[`Buffer`][] 对象处理二进制数据之前添加到 Node.js 的。因此，许多 `crypto` 类具有
通常在实现 [流][stream] API 的其他 Node.js 类上找不到的方法
（例如 `update()`、`final()` 或 `digest()`）。此外，许多方法默认接受
并返回 `'latin1'` 编码的字符串，而不是 `Buffer`。此
默认设置在 Node.js 0.9.3 中更改为默认使用 [`Buffer`][] 对象。

### 对弱算法或受损算法的支持

`node:crypto` 模块仍然支持一些已经
受损且不推荐使用的算法。API 还允许
使用密钥大小较小且太弱而不安全使用的
密码和哈希。

用户应根据其安全要求全权负责选择加密
算法和密钥大小。

基于 [NIST SP 800-131A][] 的建议：

* MD5 和 SHA-1 在需要抗碰撞性
  的地方（例如数字签名）不再可接受。
* 与 RSA、DSA 和 DH 算法一起使用的密钥推荐
  至少为 2048 位，ECDSA 和 ECDH 的曲线密钥至少
  为 224 位，以便安全使用数年。
* `modp1`、`modp2` 和 `modp5` 的 DH 组的密钥大小
  小于 2048 位，不推荐使用。

参见参考文档以获取其他建议和详情。

一些已知弱点且在实践中几乎无关紧要的算法
仅通过 [遗留提供程序][] 可用，该提供程序默认
未启用。

### CCM 模式

CCM 是支持的 [AEAD 算法][] 之一。使用此
模式的应用程序在使用密码 API 时必须遵守某些限制：

* 必须在创建密码时通过
  设置 `authTagLength` 选项指定身份验证标签长度，并且必须是 4、6、8、10、12、14 或
  16 字节之一。
* 初始化向量（nonce）`N` 的长度必须在 7 到 13
  字节之间（`7 ≤ N ≤ 13`）。
* 明文长度限制为 `2 ** (8 * (15 - N))` 字节。
* 解密时，必须在
  调用 `update()` 之前通过 `setAuthTag()` 设置身份验证标签。
  否则，解密将失败，并且 `final()` 将抛出错误，以
  符合 [RFC 3610][] 第 2.6 节。
* 在 CCM
  模式下使用流方法（如 `write(data)`、`end(data)` 或 `pipe()`）可能会失败，因为 CCM 无法处理每个实例超过一个数据块。
* 传递附加认证数据 (AAD) 时，实际
  消息的字节长度必须通过 `plaintextLength`
  选项传递给 `setAAD()`。
  许多加密库将身份验证标签包含在密文中，
  这意味着它们产生的密文长度为
  `plaintextLength + authTagLength`。Node.js 不包含身份验证
  标签，因此密文长度始终为 `plaintextLength`。
  如果不使用 AAD，则不需要这样做。
* 由于 CCM 一次性处理整个消息，`update()` 必须恰好调用
  一次。
* 即使调用 `update()` 足以加密/解密消息，
  应用程序_必须_调用 `final()` 来计算或验证
  身份验证标签。

```mjs
import { Buffer } from 'node:buffer';
const {
  createCipheriv,
  createDecipheriv,
  randomBytes,
} = await import('node:crypto');

const key = 'keykeykeykeykeykeykeykey';
const nonce = randomBytes(12);

const aad = Buffer.from('0123456789', 'hex');

const cipher = createCipheriv('aes-192-ccm', key, nonce, {
  authTagLength: 16,
});
const plaintext = 'Hello world';
cipher.setAAD(aad, {
  plaintextLength: Buffer.byteLength(plaintext),
});
const ciphertext = cipher.update(plaintext, 'utf8');
cipher.final();
const tag = cipher.getAuthTag();

// 现在传输 { ciphertext, nonce, tag }。

const decipher = createDecipheriv('aes-192-ccm', key, nonce, {
  authTagLength: 16,
});
decipher.setAuthTag(tag);
decipher.setAAD(aad, {
  plaintextLength: ciphertext.length,
});
const receivedPlaintext = decipher.update(ciphertext, null, 'utf8');

try {
  decipher.final();
} catch (err) {
  throw new Error('Authentication failed!', { cause: err });
}

console.log(receivedPlaintext);
```

```cjs
const { Buffer } = require('node:buffer');
const {
  createCipheriv,
  createDecipheriv,
  randomBytes,
} = require('node:crypto');

const key = 'keykeykeykeykeykeykeykey';
const nonce = randomBytes(12);

const aad = Buffer.from('0123456789', 'hex');

const cipher = createCipheriv('aes-192-ccm', key, nonce, {
  authTagLength: 16,
});
const plaintext = 'Hello world';
cipher.setAAD(aad, {
  plaintextLength: Buffer.byteLength(plaintext),
});
const ciphertext = cipher.update(plaintext, 'utf8');
cipher.final();
const tag = cipher.getAuthTag();

// 现在传输 { ciphertext, nonce, tag }。

const decipher = createDecipheriv('aes-192-ccm', key, nonce, {
  authTagLength: 16,
});
decipher.setAuthTag(tag);
decipher.setAAD(aad, {
  plaintextLength: ciphertext.length,
});
const receivedPlaintext = decipher.update(ciphertext, null, 'utf8');

try {
  decipher.final();
} catch (err) {
  throw new Error('Authentication failed!', { cause: err });
}

console.log(receivedPlaintext);
```

### FIPS 模式

使用 OpenSSL 3 时，Node.js 支持与适当的
OpenSSL 3 提供程序一起使用 FIPS 140-2，例如 [OpenSSL 3 的 FIPS 提供程序][]，可以通过遵循 [OpenSSL 的 FIPS README 文件][] 中的说明进行安装。

对于 Node.js 中的 FIPS 支持，您需要：

* 正确安装的 OpenSSL 3 FIPS 提供程序。
* OpenSSL 3 [FIPS 模块配置文件][]。
* 引用 FIPS 模块
  配置文件的 OpenSSL 3 配置文件。

Node.js 需要配置一个指向 FIPS 提供程序的 OpenSSL 配置文件。示例配置文件如下所示：

```text
nodejs_conf = nodejs_init

.include /<absolute path>/fipsmodule.cnf

[nodejs_init]
providers = provider_sect

[provider_sect]
default = default_sect
# fips 部分名称应与
# 包含的 fipsmodule.cnf 中的部分名称匹配。
fips = fips_sect

[default_sect]
activate = 1
```

其中 `fipsmodule.cnf` 是从
FIPS 提供程序安装步骤生成的 FIPS 模块配置文件：

```bash
openssl fipsinstall
```

将 `OPENSSL_CONF` 环境变量设置为指向
您的配置文件，并将 `OPENSSL_MODULES` 设置为 FIPS
提供程序动态库的位置。例如

```bash
export OPENSSL_CONF=/<path to configuration file>/nodejs.cnf
export OPENSSL_MODULES=/<path to openssl lib>/ossl-modules
```

然后可以通过以下方式在 Node.js 中启用 FIPS 模式：

* 使用 `--enable-fips` 或 `--force-fips` 命令行标志启动 Node.js。
* 以编程方式调用 `crypto.setFips(true)`。

或者，可以通过 OpenSSL 配置
文件在 Node.js 中启用 FIPS 模式。例如

```text
nodejs_conf = nodejs_init

.include /<absolute path>/fipsmodule.cnf

[nodejs_init]
providers = provider_sect
alg_section = algorithm_sect

[provider_sect]
default = default_sect
# fips 部分名称应与
# 包含的 fipsmodule.cnf 中的部分名称匹配。
fips = fips_sect

[default_sect]
activate = 1

[algorithm_sect]
default_properties = fips=yes
```

## 加密常量

以下由 `crypto.constants` 导出的常量适用于 `node:crypto`、`node:tls` 和 `node:https` 模块的各种用途，通常特定于 OpenSSL。

### OpenSSL 选项

详见 [SSL OP 标志列表][]。

<table>
  <tr>
    <th>常量</th>
    <th>描述</th>
  </tr>
  <tr>
    <td><code>SSL_OP_ALL</code></td>
    <td>在 OpenSSL 中应用多个错误变通方法。详见
    <a href="https://www.openssl.org/docs/man3.0/man3/SSL_CTX_set_options.html">https://www.openssl.org/docs/man3.0/man3/SSL_CTX_set_options.html</a>
    以获取详情。</td>
  </tr>
  <tr>
    <td><code>SSL_OP_ALLOW_NO_DHE_KEX</code></td>
    <td>指示 OpenSSL 允许用于 TLS v1.3 的非基于 [EC]DHE 的密钥交换模式</td>
  </tr>
  <tr>
    <td><code>SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION</code></td>
    <td>允许 OpenSSL 与未修补的客户端或服务器之间进行旧版不安全重新协商。详见
    <a href="https://www.openssl.org/docs/man3.0/man3/SSL_CTX_set_options.html">https://www.openssl.org/docs/man3.0/man3/SSL_CTX_set_options.html</a>。</td>
  </tr>
  <tr>
    <td><code>SSL_OP_CIPHER_SERVER_PREFERENCE</code></td>
    <td>尝试在选择密码时使用服务器的偏好而不是客户端的偏好。行为取决于协议版本。详见
    <a href="https://www.openssl.org/docs/man3.0/man3/SSL_CTX_set_options.html">https://www.openssl.org/docs/man3.0/man3/SSL_CTX_set_options.html</a>。</td>
  </tr>
  <tr>
    <td><code>SSL_OP_CISCO_ANYCONNECT</code></td>
    <td>指示 OpenSSL 使用 Cisco 的 DTLS_BAD_VER 版本标识符。</td>
  </tr>
  <tr>
    <td><code>SSL_OP_COOKIE_EXCHANGE</code></td>
    <td>指示 OpenSSL 开启 cookie 交换。</td>
  </tr>
  <tr>
    <td><code>SSL_OP_CRYPTOPRO_TLSEXT_BUG</code></td>
    <td>指示 OpenSSL 添加来自早期版本 cryptopro 草案的 server-hello 扩展。</td>
  </tr>
  <tr>
    <td><code>SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS</code></td>
    <td>指示 OpenSSL 禁用 OpenSSL 0.9.6d 中添加的 SSL 3.0/TLS 1.0 漏洞变通方法。</td>
  </tr>
  <tr>
    <td><code>SSL_OP_LEGACY_SERVER_CONNECT</code></td>
    <td>允许初始连接到不支持 RI 的服务器。</td>
  </tr>
  <tr>
    <td><code>SSL_OP_NO_COMPRESSION</code></td>
    <td>指示 OpenSSL 禁用对 SSL/TLS 压缩的支持。</td>
  </tr>
  <tr>
    <td><code>SSL_OP_NO_ENCRYPT_THEN_MAC</code></td>
    <td>指示 OpenSSL 禁用先加密后认证（encrypt-then-MAC）。</td>
  </tr>
  <tr>
    <td><code>SSL_OP_NO_QUERY_MTU</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>SSL_OP_NO_RENEGOTIATION</code></td>
    <td>指示 OpenSSL 禁用重新协商。</td>
  </tr>
  <tr>
    <td><code>SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION</code></td>
    <td>指示 OpenSSL 在执行重新协商时始终启动新会话。</td>
  </tr>
  <tr>
    <td><code>SSL_OP_NO_SSLv2</code></td>
    <td>指示 OpenSSL 关闭 SSL v2</td>
  </tr>
  <tr>
    <td><code>SSL_OP_NO_SSLv3</code></td>
    <td>指示 OpenSSL 关闭 SSL v3</td>
  </tr>
  <tr>
    <td><code>SSL_OP_NO_TICKET</code></td>
    <td>指示 OpenSSL 禁用使用 RFC4507bis 票据。</td>
  </tr>
  <tr>
    <td><code>SSL_OP_NO_TLSv1</code></td>
    <td>指示 OpenSSL 关闭 TLS v1</td>
  </tr>
  <tr>
    <td><code>SSL_OP_NO_TLSv1_1</code></td>
    <td>指示 OpenSSL 关闭 TLS v1.1</td>
  </tr>
  <tr>
    <td><code>SSL_OP_NO_TLSv1_2</code></td>
    <td>指示 OpenSSL 关闭 TLS v1.2</td>
  </tr>
  <tr>
    <td><code>SSL_OP_NO_TLSv1_3</code></td>
    <td>指示 OpenSSL 关闭 TLS v1.3</td>
  </tr>
  <tr>
    <td><code>SSL_OP_PRIORITIZE_CHACHA</code></td>
    <td>指示 OpenSSL 服务器在客户端优先使用 ChaCha20-Poly1305 时也优先使用。
    如果未启用
    <code>SSL_OP_CIPHER_SERVER_PREFERENCE</code>，
    此选项无效。</td>
  </tr>
  <tr>
    <td><code>SSL_OP_TLS_ROLLBACK_BUG</code></td>
    <td>指示 OpenSSL 禁用版本回滚攻击检测。</td>
  </tr>
</table>

### OpenSSL 引擎常量

<table>
  <tr>
    <th>常量</th>
    <th>描述</th>
  </tr>
  <tr>
    <td><code>ENGINE_METHOD_RSA</code></td>
    <td>限制引擎用法为 RSA</td>
  </tr>
  <tr>
    <td><code>ENGINE_METHOD_DSA</code></td>
    <td>限制引擎用法为 DSA</td>
  </tr>
  <tr>
    <td><code>ENGINE_METHOD_DH</code></td>
    <td>限制引擎用法为 DH</td>
  </tr>
  <tr>
    <td><code>ENGINE_METHOD_RAND</code></td>
    <td>限制引擎用法为 RAND</td>
  </tr>
  <tr>
    <td><code>ENGINE_METHOD_EC</code></td>
    <td>限制引擎用法为 EC</td>
  </tr>
  <tr>
    <td><code>ENGINE_METHOD_CIPHERS</code></td>
    <td>限制引擎用法为 CIPHERS</td>
  </tr>
  <tr>
    <td><code>ENGINE_METHOD_DIGESTS</code></td>
    <td>限制引擎用法为 DIGESTS</td>
  </tr>
  <tr>
    <td><code>ENGINE_METHOD_PKEY_METHS</code></td>
    <td>限制引擎用法为 PKEY_METHS</td>
  </tr>
  <tr>
    <td><code>ENGINE_METHOD_PKEY_ASN1_METHS</code></td>
    <td>限制引擎用法为 PKEY_ASN1_METHS</td>
  </tr>
  <tr>
    <td><code>ENGINE_METHOD_ALL</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>ENGINE_METHOD_NONE</code></td>
    <td></td>
  </tr>
</table>

### 其他 OpenSSL 常量

<table>
  <tr>
    <th>常量</th>
    <th>描述</th>
  </tr>
  <tr>
    <td><code>DH_CHECK_P_NOT_SAFE_PRIME</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>DH_CHECK_P_NOT_PRIME</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>DH_UNABLE_TO_CHECK_GENERATOR</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>DH_NOT_SUITABLE_GENERATOR</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>RSA_PKCS1_PADDING</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>RSA_SSLV23_PADDING</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>RSA_NO_PADDING</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>RSA_PKCS1_OAEP_PADDING</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>RSA_X931_PADDING</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>RSA_PKCS1_PSS_PADDING</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>RSA_PSS_SALTLEN_DIGEST</code></td>
    <td>在签名或验证时将 <code>RSA_PKCS1_PSS_PADDING</code> 的盐长度设置为
        摘要大小。</td>
  </tr>
  <tr>
    <td><code>RSA_PSS_SALTLEN_MAX_SIGN</code></td>
    <td>在签名数据时将 <code>RSA_PKCS1_PSS_PADDING</code> 的盐长度设置为
        最大允许值。</td>
  </tr>
  <tr>
    <td><code>RSA_PSS_SALTLEN_AUTO</code></td>
    <td>导致在验证签名时自动确定 <code>RSA_PKCS1_PSS_PADDING</code> 的
        盐长度。</td>
  </tr>
  <tr>
    <td><code>POINT_CONVERSION_COMPRESSED</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>POINT_CONVERSION_UNCOMPRESSED</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>POINT_CONVERSION_HYBRID</code></td>
    <td></td>
  </tr>
</table>

### Node.js 加密常量

<table>
  <tr>
    <th>常量</th>
    <th>描述</th>
  </tr>
  <tr>
    <td><code>defaultCoreCipherList</code></td>
    <td>指定 Node.js 使用的内置默认密码列表。</td>
  </tr>
  <tr>
    <td><code>defaultCipherList</code></td>
    <td>指定当前 Node.js 进程使用的活动默认密码列表。</td>
  </tr>
</table>

[^openssl30]: 需要 OpenSSL >= 3.0

[^openssl32]: 需要 OpenSSL >= 3.2

[^openssl35]: 需要 OpenSSL >= 3.5

[AEAD 算法]: https://en.wikipedia.org/wiki/Authenticated_encryption
[CCM 模式]: #ccm-mode
[CVE-2021-44532]: https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-44532
[注意事项]: #support-for-weak-or-compromised-algorithms
[加密常量]: #crypto-constants
[FIPS 模块配置文件]: https://www.openssl.org/docs/man3.0/man5/fips_config.html
[来自 OpenSSL 3 的 FIPS 提供程序]: https://www.openssl.org/docs/man3.0/man7/crypto.html#FIPS-provider
[HTML 5.2]: https://www.w3.org/TR/html52/changes.html#features-removed
[JWK]: https://tools.ietf.org/html/rfc7517
[密钥用法]: webcrypto.md#cryptokeyusages
[NIST SP 800-131A]: https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-131Ar2.pdf
[NIST SP 800-132]: https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-132.pdf
[NIST SP 800-38D]: https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38d.pdf
[OpenSSL 的 FIPS README 文件]: https://github.com/openssl/openssl/blob/openssl-3.0/README-FIPS.md
[OpenSSL 的 SPKAC 实现]: https://www.openssl.org/docs/man3.0/man1/openssl-spkac.html
[RFC 1421]: https://www.rfc-editor.org/rfc/rfc1421.txt
[RFC 2409]: https://www.rfc-editor.org/rfc/rfc2409.txt
[RFC 2818]: https://www.rfc-editor.org/rfc/rfc2818.txt
[RFC 3526]: https://www.rfc-editor.org/rfc/rfc3526.txt
[RFC 3610]: https://www.rfc-editor.org/rfc/rfc3610.txt
[RFC 4055]: https://www.rfc-editor.org/rfc/rfc4055.txt
[RFC 4122]: https://www.rfc-editor.org/rfc/rfc4122.txt
[RFC 5208]: https://www.rfc-editor.org/rfc/rfc5208.txt
[RFC 5280]: https://www.rfc-editor.org/rfc/rfc5280.txt
[RFC 7517]: https://www.rfc-editor.org/rfc/rfc7517.txt
[RFC 8032]: https://www.rfc-editor.org/rfc/rfc8032.txt
[RFC 9562]: https://www.rfc-editor.org/rfc/rfc9562.txt
[Web Crypto API documentation]: webcrypto.md
[`BN_is_prime_ex`]: https://www.openssl.org/docs/man1.1.1/man3/BN_is_prime_ex.html
[`Buffer`]: buffer.md
[`DH_generate_key()`]: https://www.openssl.org/docs/man3.0/man3/DH_generate_key.html
[`DiffieHellmanGroup`]: #class-diffiehellmangroup
[`KeyObject`]: #class-keyobject
[`Sign`]: #class-sign
[`String.prototype.normalize()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
[`UV_THREADPOOL_SIZE`]: cli.md#uv_threadpool_sizesize
[`Verify`]: #class-verify
[`cipher.final()`]: #cipherfinaloutputencoding
[`cipher.update()`]: #cipherupdatedata-inputencoding-outputencoding
[`crypto.createCipheriv()`]: #cryptocreatecipherivalgorithm-key-iv-options
[`crypto.createDecipheriv()`]: #cryptocreatedecipherivalgorithm-key-iv-options
[`crypto.createDiffieHellman()`]: #cryptocreatediffiehellmanprime-primeencoding-generator-generatorencoding
[`crypto.createECDH()`]: #cryptocreateecdhcurvename
[`crypto.createHash()`]: #cryptocreatehashalgorithm-options
[`crypto.createHmac()`]: #cryptocreatehmacalgorithm-key-options
[`crypto.createPrivateKey()`]: #cryptocreateprivatekeykey
[`crypto.createPublicKey()`]: #cryptocreatepublickeykey
[`crypto.createSecretKey()`]: #cryptocreatesecretkeykey-encoding
[`crypto.createSign()`]: #cryptocreatesignalgorithm-options
[`crypto.createVerify()`]: #cryptocreateverifyalgorithm-options
[`crypto.generateKey()`]: #cryptogeneratekeytype-options-callback
[`crypto.generateKeyPair()`]: #cryptogeneratekeypairtype-options-callback
[`crypto.getCurves()`]: #cryptogetcurves
[`crypto.getDiffieHellman()`]: #cryptogetdiffiehellmangroupname
[`crypto.getHashes()`]: #cryptogethashes
[`crypto.privateDecrypt()`]: #cryptoprivatedecryptprivatekey-buffer
[`crypto.privateEncrypt()`]: #cryptoprivateencryptprivatekey-buffer
[`crypto.publicDecrypt()`]: #cryptopublicdecryptkey-buffer
[`crypto.publicEncrypt()`]: #cryptopublicencryptkey-buffer
[`crypto.randomBytes()`]: #cryptorandombytessize-callback
[`crypto.randomFill()`]: #cryptorandomfillbuffer-offset-size-callback
[`crypto.sign()`]: #cryptosignalgorithm-data-key-callback
[`crypto.verify()`]: #cryptoverifyalgorithm-data-key-signature-callback
[`crypto.webcrypto.getRandomValues()`]: webcrypto.md#cryptogetrandomvaluestypedarray
[`crypto.webcrypto.subtle`]: webcrypto.md#class-subtlecrypto
[`decipher.final()`]: #decipherfinaloutputencoding
[`decipher.update()`]: #decipherupdatedata-inputencoding-outputencoding
[`diffieHellman.generateKeys()`]: #diffiehellmangeneratekeysencoding
[`diffieHellman.setPrivateKey()`]: #diffiehellmansetprivatekeyprivatekey-encoding
[`diffieHellman.setPublicKey()`]: #diffiehellmansetpublickeypublickey-encoding
[`ecdh.generateKeys()`]: #ecdhgeneratekeysencoding-format
[`ecdh.setPrivateKey()`]: #ecdhsetprivatekeyprivatekey-encoding
[`hash.digest()`]: #hashdigestencoding
[`hash.update()`]: #hashupdatedata-inputencoding
[`hmac.digest()`]: #hmacdigestencoding
[`hmac.update()`]: #hmacupdatedata-inputencoding
[`import()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import
[`keyObject.export()`]: #keyobjectexportoptions
[`postMessage()`]: worker_threads.md#portpostmessagevalue-transferlist
[`sign.sign()`]: #signsignprivatekey-outputencoding
[`sign.update()`]: #signupdatedata-inputencoding
[`stream.Writable` options]: stream.md#new-streamwritableoptions
[`stream.transform` options]: stream.md#new-streamtransformoptions
[`util.promisify()`]: util.md#utilpromisifyoriginal
[`verify.update()`]: #verifyupdatedata-inputencoding
[`verify.verify()`]: #verifyverifykey-signature-signatureencoding
[`x509.fingerprint256`]: #x509fingerprint256
[`x509.verify(publicKey)`]: #x509verifypublickey
[argon2]: https://www.rfc-editor.org/rfc/rfc9106.html
[非对称密钥类型]: #asymmetric-key-types
[使用字符串作为加密 API 输入时的注意事项]: #using-strings-as-inputs-to-cryptographic-apis
[证书对象]: tls.md#certificate-object
[编码]: buffer.md#buffers-and-character-encodings
[初始化向量]: https://en.wikipedia.org/wiki/Initialization_vector
[旧版提供程序]: cli.md#--openssl-legacy-provider
[SSL OP 标志列表]: https://wiki.openssl.org/index.php/List_of_SSL_OP_Flags#Table_of_Options
[模偏差]: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#Modulo_bias
[安全整数]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger
[scrypt]: https://en.wikipedia.org/wiki/Scrypt
[流]: stream.md
[stream-writable-write]: stream.md#writablewritechunk-encoding-callback
