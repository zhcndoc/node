# Web Crypto API

<!-- YAML
changes:
  - version:
     - v25.9.0
    pr-url: https://github.com/nodejs/node/pull/62183
    description: 现已支持 TurboSHAKE 和 KangarooTwelve 算法。
  - version: v24.8.0
    pr-url: https://github.com/nodejs/node/pull/59647
    description: 现已支持 KMAC 算法。
  - version: v24.8.0
    pr-url: https://github.com/nodejs/node/pull/59544
    description: 现已支持 Argon2 算法。
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59539
    description: 现已支持 AES-OCB 算法。
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59569
    description: 现已支持 ML-KEM 算法。
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59365
    description: 现已支持 ChaCha20-Poly1305 算法。
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59365
    description: 现已支持 SHA-3 算法。
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59365
    description: 现已支持 SHAKE 算法。
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59365
    description: 现已支持 ML-DSA 算法。
  - version:
    - v23.5.0
    - v22.13.0
    - v20.19.3
    pr-url: https://github.com/nodejs/node/pull/56142
    description: "算法 `Ed25519` 和 `X25519` 现已稳定。"
  - version:
    - v20.0.0
    - v18.17.0
    pr-url: https://github.com/nodejs/node/pull/46067
    description: 参数现在根据 WebIDL 定义进行强制转换和验证，
      与其他 Web Crypto API 实现一样。
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44897
    description: "不再处于实验阶段，但 `Ed25519`、`Ed448`、`X25519` 和 `X448` 算法除外。"
  - version:
    - v18.4.0
    - v16.17.0
    pr-url: https://github.com/nodejs/node/pull/43310
    description: "移除了专有的 `'node.keyObject'` 导入/导出格式。"
  - version:
    - v18.4.0
    - v16.17.0
    pr-url: https://github.com/nodejs/node/pull/43310
    description: "移除了专有的 `'NODE-DSA'`、`'NODE-DH'`、和 `'NODE-SCRYPT'` 算法。"
  - version:
    - v18.4.0
    - v16.17.0
    pr-url: https://github.com/nodejs/node/pull/42507
    description: "添加了 `'Ed25519'`、`'Ed448'`、`'X25519'` 和 `'X448'`算法。"
  - version:
    - v18.4.0
    - v16.17.0
    pr-url: https://github.com/nodejs/node/pull/42507
    description: "移除了专有的 `'NODE-ED25519'` 和 `'NODE-ED448'`算法。"
  - version:
    - v18.4.0
    - v16.17.0
    pr-url: https://github.com/nodejs/node/pull/42507
    description: "从 `'ECDH'` 算法中移除了专有的 `'NODE-X25519'` 和 `'NODE-X448'` 命名曲线。"
-->

<!-- introduced_in=v15.0.0 -->

> 稳定性：2 - 稳定

Node.js 提供了 [Web Crypto API][] 标准的实现。

使用 `globalThis.crypto` 或 `require('node:crypto').webcrypto` 来访问此
模块。

```js
const { subtle } = globalThis.crypto;

(async function() {

  const key = await subtle.generateKey({
    name: 'HMAC',
    hash: 'SHA-256',
    length: 256,
  }, true, ['sign', 'verify']);

  const enc = new TextEncoder();
  const message = enc.encode('我爱纸杯蛋糕');

  const digest = await subtle.sign({
    name: 'HMAC',
  }, key, message);

})();
```

## Web 加密 API 中的现代算法

> 稳定性：1.1 - 积极开发中

Node.js 提供了以下功能的实现，来自
[Web 加密 API 中的现代算法](https://wicg.github.io/webcrypto-modern-algos/)
WICG 提案：

算法：

* `'AES-OCB'`[^openssl30]
* `'Argon2d'`[^openssl32]
* `'Argon2i'`[^openssl32]
* `'Argon2id'`[^openssl32]
* `'ChaCha20-Poly1305'`
* `'cSHAKE128'`
* `'cSHAKE256'`
* `'KMAC128'`[^openssl30]
* `'KMAC256'`[^openssl30]
* `'KT128'`
* `'KT256'`
* `'ML-DSA-44'`[^openssl35]
* `'ML-DSA-65'`[^openssl35]
* `'ML-DSA-87'`[^openssl35]
* `'ML-KEM-512'`[^openssl35]
* `'ML-KEM-768'`[^openssl35]
* `'ML-KEM-1024'`[^openssl35]
* `'SHA3-256'`
* `'SHA3-384'`
* `'SHA3-512'`
* `'TurboSHAKE128'`
* `'TurboSHAKE256'`

密钥格式：

* `'raw-public'`
* `'raw-secret'`
* `'raw-seed'`

方法：

* [`subtle.decapsulateBits()`][]
* [`subtle.decapsulateKey()`][]
* [`subtle.encapsulateBits()`][]
* [`subtle.encapsulateKey()`][]
* [`subtle.getPublicKey()`][]
* [`SubtleCrypto.supports()`][]

## Web 加密 API 中的安全曲线

> 稳定性：1.1 - 积极开发中

Node.js 提供了以下功能的实现，来自
[Web 加密 API 中的安全曲线](https://wicg.github.io/webcrypto-secure-curves/)
WICG 提案：

算法：

* `'Ed448'`
* `'X448'`

## 示例

### 生成密钥

{SubtleCrypto} 类可用于生成对称（秘密）密钥
或非对称密钥对（公钥和私钥）。

#### AES 密钥

```js
const { subtle } = globalThis.crypto;

async function generateAesKey(length = 256) {
  const key = await subtle.generateKey({
    name: 'AES-CBC',
    length,
  }, true, ['encrypt', 'decrypt']);

  return key;
}
```

#### ECDSA 密钥对

```js
const { subtle } = globalThis.crypto;

async function generateEcKey(namedCurve = 'P-521') {
  const {
    publicKey,
    privateKey,
  } = await subtle.generateKey({
    name: 'ECDSA',
    namedCurve,
  }, true, ['sign', 'verify']);

  return { publicKey, privateKey };
}
```

#### Ed25519/X25519 密钥对

```js
const { subtle } = globalThis.crypto;

async function generateEd25519Key() {
  return subtle.generateKey({
    name: 'Ed25519',
  }, true, ['sign', 'verify']);
}

async function generateX25519Key() {
  return subtle.generateKey({
    name: 'X25519',
  }, true, ['deriveKey']);
}
```

#### HMAC 密钥

```js
const { subtle } = globalThis.crypto;

async function generateHmacKey(hash = 'SHA-256') {
  const key = await subtle.generateKey({
    name: 'HMAC',
    hash,
  }, true, ['sign', 'verify']);

  return key;
}
```

#### RSA 密钥对

```js
const { subtle } = globalThis.crypto;
const publicExponent = new Uint8Array([1, 0, 1]);

async function generateRsaKey(modulusLength = 2048, hash = 'SHA-256') {
  const {
    publicKey,
    privateKey,
  } = await subtle.generateKey({
    name: 'RSASSA-PKCS1-v1_5',
    modulusLength,
    publicExponent,
    hash,
  }, true, ['sign', 'verify']);

  return { publicKey, privateKey };
}
```

### 加密和解密

```js
const crypto = globalThis.crypto;

async function aesEncrypt(plaintext) {
  const ec = new TextEncoder();
  const key = await generateAesKey();
  const iv = crypto.getRandomValues(new Uint8Array(16));

  const ciphertext = await crypto.subtle.encrypt({
    name: 'AES-CBC',
    iv,
  }, key, ec.encode(plaintext));

  return {
    key,
    iv,
    ciphertext,
  };
}

async function aesDecrypt(ciphertext, key, iv) {
  const dec = new TextDecoder();
  const plaintext = await crypto.subtle.decrypt({
    name: 'AES-CBC',
    iv,
  }, key, ciphertext);

  return dec.decode(plaintext);
}
```

### 导出和导入密钥

```js
const { subtle } = globalThis.crypto;

async function generateAndExportHmacKey(format = 'jwk', hash = 'SHA-512') {
  const key = await subtle.generateKey({
    name: 'HMAC',
    hash,
  }, true, ['sign', 'verify']);

  return subtle.exportKey(format, key);
}

async function importHmacKey(keyData, format = 'jwk', hash = 'SHA-512') {
  const key = await subtle.importKey(format, keyData, {
    name: 'HMAC',
    hash,
  }, true, ['sign', 'verify']);

  return key;
}
```

### 包装和解包密钥

```js
const { subtle } = globalThis.crypto;

async function generateAndWrapHmacKey(format = 'jwk', hash = 'SHA-512') {
  const [
    key,
    wrappingKey,
  ] = await Promise.all([
    subtle.generateKey({
      name: 'HMAC', hash,
    }, true, ['sign', 'verify']),
    subtle.generateKey({
      name: 'AES-KW',
      length: 256,
    }, true, ['wrapKey', 'unwrapKey']),
  ]);

  const wrappedKey = await subtle.wrapKey(format, key, wrappingKey, 'AES-KW');

  return { wrappedKey, wrappingKey };
}

async function unwrapHmacKey(
  wrappedKey,
  wrappingKey,
  format = 'jwk',
  hash = 'SHA-512') {

  const key = await subtle.unwrapKey(
    format,
    wrappedKey,
    wrappingKey,
    'AES-KW',
    { name: 'HMAC', hash },
    true,
    ['sign', 'verify']);

  return key;
}
```

### 签名和验证

```js
const { subtle } = globalThis.crypto;

async function sign(key, data) {
  const ec = new TextEncoder();
  const signature =
    await subtle.sign('RSASSA-PKCS1-v1_5', key, ec.encode(data));
  return signature;
}

async function verify(key, signature, data) {
  const ec = new TextEncoder();
  const verified =
    await subtle.verify(
      'RSASSA-PKCS1-v1_5',
      key,
      signature,
      ec.encode(data));
  return verified;
}
```

### 派生位和密钥

```js
const { subtle } = globalThis.crypto;

async function pbkdf2(pass, salt, iterations = 1000, length = 256) {
  const ec = new TextEncoder();
  const key = await subtle.importKey(
    'raw',
    ec.encode(pass),
    'PBKDF2',
    false,
    ['deriveBits']);
  const bits = await subtle.deriveBits({
    name: 'PBKDF2',
    hash: 'SHA-512',
    salt: ec.encode(salt),
    iterations,
  }, key, length);
  return bits;
}

async function pbkdf2Key(pass, salt, iterations = 1000, length = 256) {
  const ec = new TextEncoder();
  const keyMaterial = await subtle.importKey(
    'raw',
    ec.encode(pass),
    'PBKDF2',
    false,
    ['deriveKey']);
  const key = await subtle.deriveKey({
    name: 'PBKDF2',
    hash: 'SHA-512',
    salt: ec.encode(salt),
    iterations,
  }, keyMaterial, {
    name: 'AES-GCM',
    length,
  }, true, ['encrypt', 'decrypt']);
  return key;
}
```

### 摘要

```js
const { subtle } = globalThis.crypto;

async function digest(data, algorithm = 'SHA-512') {
  const ec = new TextEncoder();
  const digest = await subtle.digest(algorithm, ec.encode(data));
  return digest;
}
```

### 检查运行时算法支持

[`SubtleCrypto.supports()`][] 允许在 Web Crypto API 中进行功能检测，
可用于检测给定的操作是否支持给定的算法标识符
（包括其参数）。

此示例使用 Argon2 从密码派生密钥（如果可用），
否则使用 PBKDF2；然后使用 AES-OCB（如果可用）或 AES-GCM 用它加密和解密一些文本。

```mjs
const { SubtleCrypto, crypto } = globalThis;

const password = 'correct horse battery staple';
const derivationAlg =
  SubtleCrypto.supports?.('importKey', 'Argon2id') ?
    'Argon2id' :
    'PBKDF2';
const encryptionAlg =
  SubtleCrypto.supports?.('importKey', 'AES-OCB') ?
    'AES-OCB' :
    'AES-GCM';
const passwordKey = await crypto.subtle.importKey(
  derivationAlg === 'Argon2id' ? 'raw-secret' : 'raw',
  new TextEncoder().encode(password),
  derivationAlg,
  false,
  ['deriveKey'],
);
const nonce = crypto.getRandomValues(new Uint8Array(16));
const derivationParams =
  derivationAlg === 'Argon2id' ?
    {
      nonce,
      parallelism: 4,
      memory: 2 ** 21,
      passes: 1,
    } :
    {
      salt: nonce,
      iterations: 100_000,
      hash: 'SHA-256',
    };
const key = await crypto.subtle.deriveKey(
  {
    name: derivationAlg,
    ...derivationParams,
  },
  passwordKey,
  {
    name: encryptionAlg,
    length: 256,
  },
  false,
  ['encrypt', 'decrypt'],
);
const plaintext = 'Hello, world!';
const iv = crypto.getRandomValues(new Uint8Array(12));
const encrypted = await crypto.subtle.encrypt(
  { name: encryptionAlg, iv },
  key,
  new TextEncoder().encode(plaintext),
);
const decrypted = new TextDecoder().decode(await crypto.subtle.decrypt(
  { name: encryptionAlg, iv },
  key,
  encrypted,
));
```

## 算法矩阵

下表详细列出了 Node.js Web
Crypto API 实现所支持的算法，以及每种算法所支持的 API：

### 密钥管理 API

| 算法                            | [`subtle.generateKey()`][] | [`subtle.exportKey()`][] | [`subtle.importKey()`][] | [`subtle.getPublicKey()`][] |
| ------------------------------------ | -------------------------- | ------------------------ | ------------------------ | --------------------------- |
| `'AES-CBC'`                          | ✔                          | ✔                        | ✔                        |                             |
| `'AES-CTR'`                          | ✔                          | ✔                        | ✔                        |                             |
| `'AES-GCM'`                          | ✔                          | ✔                        | ✔                        |                             |
| `'AES-KW'`                           | ✔                          | ✔                        | ✔                        |                             |
| `'AES-OCB'`                          | ✔                          | ✔                        | ✔                        |                             |
| `'Argon2d'`                          |                            |                          | ✔                        |                             |
| `'Argon2i'`                          |                            |                          | ✔                        |                             |
| `'Argon2id'`                         |                            |                          | ✔                        |                             |
| `'ChaCha20-Poly1305'`[^modern-algos] | ✔                          | ✔                        | ✔                        |                             |
| `'ECDH'`                             | ✔                          | ✔                        | ✔                        | ✔                           |
| `'ECDSA'`                            | ✔                          | ✔                        | ✔                        | ✔                           |
| `'Ed25519'`                          | ✔                          | ✔                        | ✔                        | ✔                           |
| `'Ed448'`[^secure-curves]            | ✔                          | ✔                        | ✔                        | ✔                           |
| `'HKDF'`                             |                            |                          | ✔                        |                             |
| `'HMAC'`                             | ✔                          | ✔                        | ✔                        |                             |
| `'KMAC128'`[^modern-algos]           | ✔                          | ✔                        | ✔                        |                             |
| `'KMAC256'`[^modern-algos]           | ✔                          | ✔                        | ✔                        |                             |
| `'ML-DSA-44'`[^modern-algos]         | ✔                          | ✔                        | ✔                        | ✔                           |
| `'ML-DSA-65'`[^modern-algos]         | ✔                          | ✔                        | ✔                        | ✔                           |
| `'ML-DSA-87'`[^modern-algos]         | ✔                          | ✔                        | ✔                        | ✔                           |
| `'ML-KEM-512'`[^modern-algos]        | ✔                          | ✔                        | ✔                        | ✔                           |
| `'ML-KEM-768'`[^modern-algos]        | ✔                          | ✔                        | ✔                        | ✔                           |
| `'ML-KEM-1024'`[^modern-algos]       | ✔                          | ✔                        | ✔                        | ✔                           |
| `'PBKDF2'`                           |                            |                          | ✔                        |                             |
| `'RSA-OAEP'`                         | ✔                          | ✔                        | ✔                        | ✔                           |
| `'RSA-PSS'`                          | ✔                          | ✔                        | ✔                        | ✔                           |
| `'RSASSA-PKCS1-v1_5'`                | ✔                          | ✔                        | ✔                        | ✔                           |
| `'X25519'`                           | ✔                          | ✔                        | ✔                        | ✔                           |
| `'X448'`[^secure-curves]             | ✔                          | ✔                        | ✔                        | ✔                           |

### 加密操作 API

**列图例：**

* **加密**: [`subtle.encrypt()`][] / [`subtle.decrypt()`][]
* **签名和 MAC**: [`subtle.sign()`][] / [`subtle.verify()`][]
* **密钥或位派生**: [`subtle.deriveBits()`][] / [`subtle.deriveKey()`][]
* **密钥包装**: [`subtle.wrapKey()`][] / [`subtle.unwrapKey()`][]
* **密钥封装**: [`subtle.encapsulateBits()`][] / [`subtle.decapsulateBits()`][]
  [`subtle.encapsulateKey()`][] / [`subtle.decapsulateKey()`][]
* **摘要**: [`subtle.digest()`][]

| 算法                            | 加密 | 签名和 MAC | 密钥或位派生 | 密钥包装 | 密钥封装 | 摘要 |
| ------------------------------------ | ---------- | ------------------ | ---------------------- | ------------ | ----------------- | ------ |
| `'AES-CBC'`                          | ✔          |                    |                        | ✔            |                   |        |
| `'AES-CTR'`                          | ✔          |                    |                        | ✔            |                   |        |
| `'AES-GCM'`                          | ✔          |                    |                        | ✔            |                   |        |
| `'AES-KW'`                           |            |                    |                        | ✔            |                   |        |
| `'AES-OCB'`                          | ✔          |                    |                        | ✔            |                   |        |
| `'Argon2d'`                          |            |                    | ✔                      |              |                   |        |
| `'Argon2i'`                          |            |                    | ✔                      |              |                   |        |
| `'Argon2id'`                         |            |                    | ✔                      |              |                   |        |
| `'ChaCha20-Poly1305'`[^modern-algos] | ✔          |                    |                        | ✔            |                   |        |
| `'cSHAKE128'`[^modern-algos]         |            |                    |                        |              |                   | ✔      |
| `'cSHAKE256'`[^modern-algos]         |            |                    |                        |              |                   | ✔      |
| `'ECDH'`                             |            |                    | ✔                      |              |                   |        |
| `'ECDSA'`                            |            | ✔                  |                        |              |                   |        |
| `'Ed25519'`                          |            | ✔                  |                        |              |                   |        |
| `'Ed448'`[^secure-curves]            |            | ✔                  |                        |              |                   |        |
| `'HKDF'`                             |            |                    | ✔                      |              |                   |        |
| `'HMAC'`                            |            | ✔                  |                        |              |                   |        |
| `'KMAC128'`[^modern-algos]           |            | ✔                  |                        |              |                   |        |
| `'KMAC256'`[^modern-algos]           |            | ✔                  |                        |              |                   |        |
| `'KT128'`[^modern-algos]             |            |                    |                        |              |                   | ✔      |
| `'KT256'`[^modern-algos]             |            |                    |                        |              |                   | ✔      |
| `'ML-DSA-44'`[^modern-algos]         |            | ✔                  |                        |              |                   |        |
| `'ML-DSA-65'`[^modern-algos]         |            | ✔                  |                        |              |                   |        |
| `'ML-DSA-87'`[^modern-algos]         |            | ✔                  |                        |              |                   |        |
| `'ML-KEM-512'`[^modern-algos]        |            |                    |                        |              | ✔                 |        |
| `'ML-KEM-768'`[^modern-algos]        |            |                    |                        |              | ✔                 |        |
| `'ML-KEM-1024'`[^modern-algos]       |            |                    |                        |              | ✔                 |        |
| `'PBKDF2'`                           |            |                    | ✔                      |              |                   |        |
| `'RSA-OAEP'`                         | ✔          |                    |                        | ✔            |                   |        |
| `'RSA-PSS'`                          |            | ✔                  |                        |              |                   |        |
| `'RSASSA-PKCS1-v1_5'`                |            | ✔                  |                        |              |                   |        |
| `'SHA-1'`                            |            |                    |                        |              |                   | ✔      |
| `'SHA-256'`                          |            |                    |                        |              |                   | ✔      |
| `'SHA-384'`                          |            |                    |                        |              |                   | ✔      |
| `'SHA-512'`                          |            |                    |                        |              |                   | ✔      |
| `'SHA3-256'`[^modern-algos]          |            |                    |                        |              |                   | ✔      |
| `'SHA3-384'`[^modern-algos]          |            |                    |                        |              |                   | ✔      |
| `'SHA3-512'`[^modern-algos]          |            |                    |                        |              |                   | ✔      |
| `'TurboSHAKE128'`[^modern-algos]     |            |                    |                        |              |                   | ✔      |
| `'TurboSHAKE256'`[^modern-algos]     |            |                    |                        |              |                   | ✔      |
| `'X25519'`                           |            |                    | ✔                      |              |                   |        |
| `'X448'`[^secure-curves]             |            |                    | ✔                      |              |                   |        |

## 类：`Crypto`

<!-- YAML
added: v15.0.0
-->

`globalThis.crypto` 是 `Crypto` 类的一个实例。`Crypto` 是一个单例，提供对其余 crypto API 的访问。

### `crypto.subtle`

<!-- YAML
added: v15.0.0
-->

* 类型：{SubtleCrypto}

提供对 `SubtleCrypto` API 的访问。

### `crypto.getRandomValues(typedArray)`

<!-- YAML
added: v15.0.0
-->

* `typedArray` {Buffer|TypedArray}
* 返回：{Buffer|TypedArray}

生成密码学安全的随机值。给定的 `typedArray` 将被填充随机值，并返回对 `typedArray` 的引用。

给定的 `typedArray` 必须是基于整数的 {TypedArray} 实例，即不接受 `Float32Array` 和 `Float64Array`。

如果给定的 `typedArray` 大于 65,536 字节，将抛出错误。

### `crypto.randomUUID()`

<!-- YAML
added: v16.7.0
-->

* 返回：{string}

生成一个随机的 [RFC 4122][] 版本 4 UUID。UUID 是使用密码学伪随机数生成器生成的。

## 类：`CryptoKey`

<!-- YAML
added: v15.0.0
-->

### `cryptoKey.algorithm`

<!-- YAML
added: v15.0.0
-->

<!--lint disable maximum-line-length remark-lint-->

* 类型：{KeyAlgorithm|RsaHashedKeyAlgorithm|EcKeyAlgorithm|AesKeyAlgorithm|HmacKeyAlgorithm|KmacKeyAlgorithm}

<!--lint enable maximum-line-length remark-lint-->

一个对象，详细说明密钥可用于哪种算法以及额外的算法特定参数。

只读。

### `cryptoKey.extractable`

<!-- YAML
added: v15.0.0
-->

* 类型：{boolean}

当为 `true` 时，{CryptoKey} 可以使用 [`subtle.exportKey()`][] 或 [`subtle.wrapKey()`][] 导出。

只读。

### `cryptoKey.type`

<!-- YAML
added: v15.0.0
-->

* 类型：{string} `'secret'`、`'private'` 或 `'public'` 之一。

一个字符串，标识密钥是对称（`'secret'`）还是非对称（`'private'` 或 `'public'`）密钥。

### `cryptoKey.usages`

<!-- YAML
added: v15.0.0
-->

* 类型：{string\[]}

一个字符串数组，标识密钥可用于哪些操作。

可能的用途包括：

* `'encrypt'` - 启用密钥与 [`subtle.encrypt()`][] 一起使用
* `'decrypt'` - 启用密钥与 [`subtle.decrypt()`][] 一起使用
* `'sign'` - 启用密钥与 [`subtle.sign()`][] 一起使用
* `'verify'` - 启用密钥与 [`subtle.verify()`][] 一起使用
* `'deriveKey'` - 启用密钥与 [`subtle.deriveKey()`][] 一起使用
* `'deriveBits'` - 启用密钥与 [`subtle.deriveBits()`][] 一起使用
* `'encapsulateBits'` - 启用密钥与 [`subtle.encapsulateBits()`][] 一起使用
* `'decapsulateBits'` - 启用密钥与 [`subtle.decapsulateBits()`][] 一起使用
* `'encapsulateKey'` - 启用密钥与 [`subtle.encapsulateKey()`][] 一起使用
* `'decapsulateKey'` - 启用密钥与 [`subtle.decapsulateKey()`][] 一起使用
* `'wrapKey'` - 启用密钥与 [`subtle.wrapKey()`][] 一起使用
* `'unwrapKey'` - 启用密钥与 [`subtle.unwrapKey()`][] 一起使用

有效的密钥用途取决于密钥算法（由 `cryptokey.algorithm.name` 标识）。

**图例：**

* **加密**：[`subtle.encrypt()`][] / [`subtle.decrypt()`][]
* **签名和 MAC**：[`subtle.sign()`][] / [`subtle.verify()`][]
* **密钥或位派生**：[`subtle.deriveBits()`][] / [`subtle.deriveKey()`][]
* **密钥包装**：[`subtle.wrapKey()`][] / [`subtle.unwrapKey()`][]
* **密钥封装**：[`subtle.encapsulateBits()`][] / [`subtle.decapsulateBits()`][] /
  [`subtle.encapsulateKey()`][] / [`subtle.decapsulateKey()`][]

| 支持的密钥算法              | 加密 | 签名和 MAC | 密钥或位派生 | 密钥包装 | 密钥封装 |
| ------------------------------------ | ---------- | ------------------ | ---------------------- | ------------ | ----------------- |
| `'AES-CBC'`                          | ✔          |                    |                        | ✔            |                   |
| `'AES-CTR'`                          | ✔          |                    |                        | ✔            |                   |
| `'AES-GCM'`                          | ✔          |                    |                        | ✔            |                   |
| `'AES-KW'`                           |            |                    |                        | ✔            |                   |
| `'AES-OCB'`                          | ✔          |                    |                        | ✔            |                   |
| `'Argon2d'`                          |            |                    | ✔                      |              |                   |
| `'Argon2i'`                          |            |                    | ✔                      |              |                   |
| `'Argon2id'`                         |            |                    | ✔                      |              |                   |
| `'ChaCha20-Poly1305'`[^modern-algos] | ✔          |                    |                        | ✔            |                   |
| `'ECDH'`                             |            |                    | ✔                      |              |                   |
| `'ECDSA'`                            |            | ✔                  |                        |              |                   |
| `'Ed25519'`                          |            | ✔                  |                        |              |                   |
| `'Ed448'`[^secure-curves]            |            | ✔                  |                        |              |                   |
| `'HKDF'`                             |            |                    | ✔                      |              |                   |
| `'HMAC'`                             |            | ✔                  |                        |              |                   |
| `'KMAC128'`[^modern-algos]           |            | ✔                  |                        |              |                   |
| `'KMAC256'`[^modern-algos]           |            | ✔                  |                        |              |                   |
| `'ML-DSA-44'`[^modern-algos]         |            | ✔                  |                        |              |                   |
| `'ML-DSA-65'`[^modern-algos]         |            | ✔                  |                        |              |                   |
| `'ML-DSA-87'`[^modern-algos]         |            | ✔                  |                        |              |                   |
| `'ML-KEM-512'`[^modern-algos]        |            |                    |                        |              | ✔                 |
| `'ML-KEM-768'`[^modern-algos]        |            |                    |                        |              | ✔                 |
| `'ML-KEM-1024'`[^modern-algos]       |            |                    |                        |              | ✔                 |
| `'PBKDF2'`                           |            |                    | ✔                      |              |                   |
| `'RSA-OAEP'`                         | ✔          |                    |                        | ✔            |                   |
| `'RSA-PSS'`                          |            | ✔                  |                        |              |                   |
| `'RSASSA-PKCS1-v1_5'`                |            | ✔                  |                        |              |                   |
| `'X25519'`                           |            |                    | ✔                      |              |                   |
| `'X448'`[^secure-curves]             |            |                    | ✔                      |              |                   |

## 类：`CryptoKeyPair`

<!-- YAML
added: v15.0.0
-->

`CryptoKeyPair` 是一个简单的字典对象，具有 `publicKey` 和 `privateKey` 属性，表示非对称密钥对。

### `cryptoKeyPair.privateKey`

<!-- YAML
added: v15.0.0
-->

* 类型：{CryptoKey} 一个 `type` 为 `'private'` 的 {CryptoKey}。

### `cryptoKeyPair.publicKey`

<!-- YAML
added: v15.0.0
-->

* 类型：{CryptoKey} 一个 `type` 为 `'public'` 的 {CryptoKey}。

## 类：`SubtleCrypto`

<!-- YAML
added: v15.0.0
-->

### 静态方法：`SubtleCrypto.supports(operation, algorithm[, lengthOrAdditionalAlgorithm])`

<!-- YAML
added: v24.7.0
-->

> 稳定性：1.1 - 积极开发中

<!--lint disable maximum-line-length remark-lint-->

* `operation` {string} "encrypt", "decrypt", "sign", "verify", "digest", "generateKey", "deriveKey", "deriveBits", "importKey", "exportKey", "getPublicKey", "wrapKey", "unwrapKey", "encapsulateBits", "encapsulateKey", "decapsulateBits", 或 "decapsulateKey"
* `algorithm` {string|Algorithm}
* `lengthOrAdditionalAlgorithm` {null|number|string|Algorithm|undefined} 取决于操作，这要么被忽略，要么是操作为 "deriveBits" 时的 length 参数值，要么是操作为 "deriveKey" 时要派生的密钥的算法，要么是操作为 "wrapKey" 时在包装前要导出的密钥的算法，要么是操作为 "unwrapKey" 时在解包后要导入的密钥的算法，要么是操作为 "encapsulateKey" 或 "decapsulateKey" 时在封/解封装密钥后要导入的密钥的算法。**默认值：** 当操作为 "deriveBits" 时为 `null`，否则为 `undefined`。
* 返回：{boolean} 指示实现是否支持给定的操作

<!--lint enable maximum-line-length remark-lint-->

允许在 Web Crypto API 中进行功能检测，
可用于检测给定的算法标识符
（包括其参数）是否支持给定的操作。

参见 [检查运行时算法支持][] 以了解此方法的示例用法。

### `subtle.decapsulateBits(decapsulationAlgorithm, decapsulationKey, ciphertext)`

<!-- YAML
added: v24.7.0
-->

> 稳定性：1.1 - 积极开发中

* `decapsulationAlgorithm` {string|Algorithm}
* `decapsulationKey` {CryptoKey}
* `ciphertext` {ArrayBuffer|TypedArray|DataView|Buffer}
* 返回：{Promise} 成功时兑现为 {ArrayBuffer}。

消息接收者使用他们的非对称私钥解密“封装密钥”（密文），从而恢复一个临时对称密钥（表示为 {ArrayBuffer}），然后用于解密消息。

目前支持的算法包括：

* `'ML-KEM-512'`[^modern-algos]
* `'ML-KEM-768'`[^modern-algos]
* `'ML-KEM-1024'`[^modern-algos]

### `subtle.decapsulateKey(decapsulationAlgorithm, decapsulationKey, ciphertext, sharedKeyAlgorithm, extractable, keyUsages)`

<!-- YAML
added: v24.7.0
-->

> 稳定性：1.1 - 积极开发中

* `decapsulationAlgorithm` {string|Algorithm}
* `decapsulationKey` {CryptoKey}
* `ciphertext` {ArrayBuffer|TypedArray|DataView|Buffer}
* `sharedKeyAlgorithm` {string|Algorithm|HmacImportParams|AesDerivedKeyParams|KmacImportParams}
* `extractable` {boolean}
* `keyUsages` {string\[]} 参见 [密钥用途][]。
* 返回：{Promise} 成功时兑现为 {CryptoKey}。

消息接收者使用他们的非对称私钥解密“封装密钥”（密文），从而恢复一个临时对称密钥（表示为 {CryptoKey}），然后用于解密消息。

目前支持的算法包括：

* `'ML-KEM-512'`[^modern-algos]
* `'ML-KEM-768'`[^modern-algos]
* `'ML-KEM-1024'`[^modern-algos]

### `subtle.decrypt(algorithm, key, data)`

<!-- YAML
added: v15.0.0
changes:
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59539
    description: AES-OCB 算法现已支持。
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59365
    description: ChaCha20-Poly1305 算法现已支持。
-->

* `algorithm` {RsaOaepParams|AesCtrParams|AesCbcParams|AeadParams}
* `key` {CryptoKey}
* `data` {ArrayBuffer|TypedArray|DataView|Buffer}
* 返回：{Promise} 成功时兑现为 {ArrayBuffer}。

使用 `algorithm` 中指定的方法和参数以及 `key` 提供的密钥材料，此方法尝试解密提供的 `data`。如果成功，返回的 Promise 将解决为一个包含明文结果的 {ArrayBuffer}。

目前支持的算法包括：

* `'AES-CBC'`
* `'AES-CTR'`
* `'AES-GCM'`
* `'AES-OCB'`[^modern-algos]
* `'ChaCha20-Poly1305'`[^modern-algos]
* `'RSA-OAEP'`

### `subtle.deriveBits(algorithm, baseKey[, length])`

<!-- YAML
added: v15.0.0
changes:
  - version: v24.8.0
    pr-url: https://github.com/nodejs/node/pull/59544
    description: Argon2 algorithms are now supported.
  - version:
    - v22.5.0
    - v20.17.0
    - v18.20.5
    pr-url: https://github.com/nodejs/node/pull/53601
    description: "The length parameter is now optional for `'ECDH'`, `'X25519'`,and `'X448'`."
  - version:
    - v18.4.0
    - v16.17.0
    pr-url: https://github.com/nodejs/node/pull/42507
    description: "Added `'X25519'`, and `'X448'` algorithms."
-->

<!--lint disable maximum-line-length remark-lint-->

* `algorithm` {EcdhKeyDeriveParams|HkdfParams|Pbkdf2Params|Argon2Params}
* `baseKey` {CryptoKey}
* `length` {number|null} **默认值：** `null`
* 返回：{Promise} 成功时兑现为 {ArrayBuffer}。

<!--lint enable maximum-line-length remark-lint-->

使用 `algorithm` 中指定的方法和参数以及 `baseKey` 提供的密钥材料，此方法尝试生成 `length` 位。

当未提供 `length` 或为 `null` 时，将生成给定算法的最大位数。这对于 `'ECDH'`、`'X25519'` 和 `'X448'`[^secure-curves] 算法是允许的，对于其他算法，`length` 必须是一个数字。

如果成功，返回的 Promise 将解决为一个包含生成数据的 {ArrayBuffer}。

目前支持的算法包括：

* `'Argon2d'`[^modern-algos]
* `'Argon2i'`[^modern-algos]
* `'Argon2id'`[^modern-algos]
* `'ECDH'`
* `'HKDF'`
* `'PBKDF2'`
* `'X25519'`
* `'X448'`[^secure-curves]

### `subtle.deriveKey(algorithm, baseKey, derivedKeyType, extractable, keyUsages)`

<!-- YAML
added: v15.0.0
changes:
  - version: v24.8.0
    pr-url: https://github.com/nodejs/node/pull/59544
    description: Argon2 algorithms are now supported.
  - version:
    - v18.4.0
    - v16.17.0
    pr-url: https://github.com/nodejs/node/pull/42507
    description: "Added `'X25519'`, and `'X448'` algorithms."
-->

<!--lint disable maximum-line-length remark-lint-->

* `algorithm` {EcdhKeyDeriveParams|HkdfParams|Pbkdf2Params|Argon2Params}
* `baseKey` {CryptoKey}
* `derivedKeyType` {string|Algorithm|HmacImportParams|AesDerivedKeyParams|KmacImportParams}
* `extractable` {boolean}
* `keyUsages` {string\[]} 参见 [密钥用途][]。
* 返回：{Promise} 成功时兑现为 {CryptoKey}。

<!--lint enable maximum-line-length remark-lint-->

使用 `algorithm` 中指定的方法和参数，以及 `baseKey` 提供的密钥材料，此方法尝试基于 `derivedKeyType` 中的方法和参数生成一个新的 {CryptoKey}。

调用此方法等同于先调用 [`subtle.deriveBits()`][] 生成原始密钥材料，然后使用 `derivedKeyType`、`extractable` 和 `keyUsages` 参数作为输入，将结果传递给 [`subtle.importKey()`][] 方法。

目前支持的算法包括：

* `'Argon2d'`[^modern-algos]
* `'Argon2i'`[^modern-algos]
* `'Argon2id'`[^modern-algos]
* `'ECDH'`
* `'HKDF'`
* `'PBKDF2'`
* `'X25519'`
* `'X448'`[^secure-curves]

### `subtle.digest(algorithm, data)`

<!-- YAML
added: v15.0.0
changes:
  - version:
     - v25.9.0
    pr-url: https://github.com/nodejs/node/pull/62183
    description: TurboSHAKE 和 KangarooTwelve 算法现已支持。
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59365
    description: SHA-3 算法现已支持。
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59365
    description: SHAKE 算法现已支持。
-->

* `algorithm` {string|Algorithm|CShakeParams|TurboShakeParams|KangarooTwelveParams}
* `data` {ArrayBuffer|TypedArray|DataView|Buffer}
* 返回：{Promise} 成功时兑现为 {ArrayBuffer}。

使用 `algorithm` 标识的方法，此方法尝试生成 `data` 的摘要。如果成功，返回的 Promise 将解决为一个包含计算摘要的 {ArrayBuffer}。

如果 `algorithm` 作为 {string} 提供，它必须是以下之一：

* `'cSHAKE128'`[^modern-algos]
* `'cSHAKE256'`[^modern-algos]
* `'KT128'`[^modern-algos]
* `'KT256'`[^modern-algos]
* `'SHA-1'`
* `'SHA-256'`
* `'SHA-384'`
* `'SHA-512'`
* `'SHA3-256'`[^modern-algos]
* `'SHA3-384'`[^modern-algos]
* `'SHA3-512'`[^modern-algos]
* `'TurboSHAKE128'`[^modern-algos]
* `'TurboSHAKE256'`[^modern-algos]

如果 `algorithm` 作为 {Object} 提供，它必须具有一个 `name` 属性，其值为上述之一。

### `subtle.encapsulateBits(encapsulationAlgorithm, encapsulationKey)`

<!-- YAML
added: v24.7.0
-->

> 稳定性：1.1 - 积极开发中

* `encapsulationAlgorithm` {string|Algorithm}
* `encapsulationKey` {CryptoKey}
* 返回：{Promise} 成功时兑现为 {EncapsulatedBits}。

使用消息接收者的非对称公钥加密临时对称密钥。此加密密钥是表示为 {EncapsulatedBits} 的“封装密钥”。

目前支持的算法包括：

* `'ML-KEM-512'`[^modern-algos]
* `'ML-KEM-768'`[^modern-algos]
* `'ML-KEM-1024'`[^modern-algos]

### `subtle.encapsulateKey(encapsulationAlgorithm, encapsulationKey, sharedKeyAlgorithm, extractable, keyUsages)`

<!-- YAML
added: v24.7.0
-->

> 稳定性：1.1 - 积极开发中

* `encapsulationAlgorithm` {string|Algorithm}
* `encapsulationKey` {CryptoKey}
* `sharedKeyAlgorithm` {string|Algorithm|HmacImportParams|AesDerivedKeyParams|KmacImportParams}
* `extractable` {boolean}
* `keyUsages` {string\[]} 参见 [密钥用途][]。
* 返回：{Promise} 成功时兑现为 {EncapsulatedKey}。

使用消息接收者的非对称公钥加密临时对称密钥。此加密密钥是表示为 {EncapsulatedKey} 的“封装密钥”。

目前支持的算法包括：

* `'ML-KEM-512'`[^modern-algos]
* `'ML-KEM-768'`[^modern-algos]
* `'ML-KEM-1024'`[^modern-algos]

### `subtle.encrypt(algorithm, key, data)`

<!-- YAML
added: v15.0.0
changes:
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59539
    description: AES-OCB 算法现已支持。
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59365
    description: ChaCha20-Poly1305 算法现已支持。
-->

* `algorithm` {RsaOaepParams|AesCtrParams|AesCbcParams|AeadParams}
* `key` {CryptoKey}
* `data` {ArrayBuffer|TypedArray|DataView|Buffer}
* 返回：{Promise} 成功时兑现为 {ArrayBuffer}。

使用 `algorithm` 指定的方法和参数以及 `key` 提供的密钥材料，此方法尝试加密 `data`。如果成功，返回的 Promise 将解决为一个包含加密结果的 {ArrayBuffer}。

目前支持的算法包括：

* `'AES-CBC'`
* `'AES-CTR'`
* `'AES-GCM'`
* `'AES-OCB'`[^modern-algos]
* `'ChaCha20-Poly1305'`[^modern-algos]
* `'RSA-OAEP'`

### `subtle.exportKey(format, key)`

<!-- YAML
added: v15.0.0
changes:
  - version: v26.1.0
    pr-url: https://github.com/nodejs/node/pull/62706
    description: 为 ML-KEM 密钥类型添加了 JWK 格式支持。
  - version: v24.8.0
    pr-url: https://github.com/nodejs/node/pull/59647
    description: KMAC 算法现已支持。
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59569
    description: ML-KEM 算法现已支持。
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59365
    description: ChaCha20-Poly1305 算法现已支持。
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59365
    description: ML-DSA 算法现已支持。
  - version:
    - v18.4.0
    - v16.17.0
    pr-url: https://github.com/nodejs/node/pull/42507
    description: "添加了 `'Ed25519'`、`'Ed448'`、`'X25519'` 和 `'X448'`算法。"
  - version: v15.9.0
    pr-url: https://github.com/nodejs/node/pull/37203
    description: "移除了 `'NODE-DSA'` JWK 导出。"
-->

* `format` {string} 必须是 `'raw'`、`'pkcs8'`、`'spki'`、`'jwk'`、`'raw-secret'`[^modern-algos]、`'raw-public'`[^modern-algos] 或 `'raw-seed'`[^modern-algos] 之一。
* `key` {CryptoKey}
* 返回：{Promise} 成功时兑现为 {ArrayBuffer|Object}。

将给定的密钥导出为指定的格式（如果支持）。

如果 {CryptoKey} 不可导出，返回的 Promise 将被拒绝。

当 `format` 为 `'pkcs8'` 或 `'spki'` 且导出成功时，返回的 Promise 将解决为一个包含导出密钥数据的 {ArrayBuffer}。

当 `format` 为 `'jwk'` 且导出成功时，返回的 Promise 将解决为一个符合 [JSON Web Key][] 规范的 JavaScript 对象。

| 支持的密钥算法              | `'spki'` | `'pkcs8'` | `'jwk'` | `'raw'` | `'raw-secret'` | `'raw-public'` | `'raw-seed'` |
| ------------------------------------ | -------- | --------- | ------- | ------- | -------------- | -------------- | ------------ |
| `'AES-CBC'`                          |          |           | ✔       | ✔       | ✔              |                |              |
| `'AES-CTR'`                          |          |           | ✔       | ✔       | ✔              |                |              |
| `'AES-GCM'`                          |          |           | ✔       | ✔       | ✔              |                |              |
| `'AES-KW'`                           |          |           | ✔       | ✔       | ✔              |                |              |
| `'AES-OCB'`[^modern-algos]           |          |           | ✔       |         | ✔              |                |              |
| `'ChaCha20-Poly1305'`[^modern-algos] |          |           | ✔       |         | ✔              |                |              |
| `'ECDH'`                             | ✔        | ✔         | ✔       | ✔       |                | ✔              |              |
| `'ECDSA'`                            | ✔        | ✔         | ✔       | ✔       |                | ✔              |              |
| `'Ed25519'`                          | ✔        | ✔         | ✔       | ✔       |                | ✔              |              |
| `'Ed448'`[^secure-curves]            | ✔        | ✔         | ✔       | ✔       |                | ✔              |              |
| `'HMAC'`                             |          |           | ✔       | ✔       | ✔              |                |              |
| `'KMAC128'`[^modern-algos]           |          |           | ✔       |         | ✔              |                |              |
| `'KMAC256'`[^modern-algos]           |          |           | ✔       |         | ✔              |                |              |
| `'ML-DSA-44'`[^modern-algos]         | ✔        | ✔         | ✔       |         |                | ✔              | ✔            |
| `'ML-DSA-65'`[^modern-algos]         | ✔        | ✔         | ✔       |         |                | ✔              | ✔            |
| `'ML-DSA-87'`[^modern-algos]         | ✔        | ✔         | ✔       |         |                | ✔              | ✔            |
| `'ML-KEM-512'`[^modern-algos]        | ✔        | ✔         | ✔       |         |                | ✔              | ✔            |
| `'ML-KEM-768'`[^modern-algos]        | ✔        | ✔         | ✔       |         |                | ✔              | ✔            |
| `'ML-KEM-1024'`[^modern-algos]       | ✔        | ✔         | ✔       |         |                | ✔              | ✔            |
| `'RSA-OAEP'`                         | ✔        | ✔         | ✔       |         |                |                |              |
| `'RSA-PSS'`                          | ✔        | ✔         | ✔       |         |                |                |              |
| `'RSASSA-PKCS1-v1_5'`                | ✔        | ✔         | ✔       |         |                |                |              |

### `subtle.getPublicKey(key, keyUsages)`

<!-- YAML
added: v24.7.0
-->

> 稳定性：1.1 - 积极开发中

* `key` {CryptoKey} 一个用于派生相应公钥的私钥。
* `keyUsages` {string\[]} 参见 [密钥用途][]。
* 返回：{Promise} 成功时兑现为 {CryptoKey}。

从给定的私钥派生公钥。

### `subtle.generateKey(algorithm, extractable, keyUsages)`

<!-- YAML
added: v15.0.0
changes:
  - version: v24.8.0
    pr-url: https://github.com/nodejs/node/pull/59647
    description: KMAC 算法现已支持。
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59569
    description: 现已支持 ML-KEM 算法。
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59365
    description: 现已支持 ChaCha20-Poly1305 算法。
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59365
    description: 现已支持 ML-DSA 算法。
-->

<!--lint disable maximum-line-length remark-lint-->

* `algorithm` {string|Algorithm|RsaHashedKeyGenParams|EcKeyGenParams|HmacKeyGenParams|AesKeyGenParams|KmacKeyGenParams}

<!--lint enable maximum-line-length remark-lint-->

* `extractable` {boolean}
* `keyUsages` {string\[]} 参见 [密钥用途][]。
* 返回：{Promise} 成功时兑现为 {CryptoKey|CryptoKeyPair}。

使用 `algorithm` 中提供的参数，此方法尝试生成新的密钥材料。根据使用的算法，生成单个 {CryptoKey} 或 {CryptoKeyPair}。

支持的 {CryptoKeyPair}（公钥和私钥）生成算法包括：

* `'ECDH'`
* `'ECDSA'`
* `'Ed25519'`
* `'Ed448'`[^secure-curves]
* `'ML-DSA-44'`[^modern-algos]
* `'ML-DSA-65'`[^modern-algos]
* `'ML-DSA-87'`[^modern-algos]
* `'ML-KEM-512'`[^modern-algos]
* `'ML-KEM-768'`[^modern-algos]
* `'ML-KEM-1024'`[^modern-algos]
* `'RSA-OAEP'`
* `'RSA-PSS'`
* `'RSASSA-PKCS1-v1_5'`
* `'X25519'`
* `'X448'`[^secure-curves]

支持的 {CryptoKey}（密钥）生成算法包括：

* `'AES-CBC'`
* `'AES-CTR'`
* `'AES-GCM'`
* `'AES-KW'`
* `'AES-OCB'`[^modern-algos]
* `'ChaCha20-Poly1305'`[^modern-algos]
* `'HMAC'`
* `'KMAC128'`[^modern-algos]
* `'KMAC256'`[^modern-algos]

### `subtle.importKey(format, keyData, algorithm, extractable, keyUsages)`

<!-- YAML
added: v15.0.0
changes:
  - version: v26.1.0
    pr-url: https://github.com/nodejs/node/pull/62706
    description: 为 ML-KEM 密钥类型添加了 JWK 格式支持。
  - version:
     - v25.9.0
     - v24.15.0
    pr-url: https://github.com/nodejs/node/pull/62218
    description: 不再支持导入没有 seed 的 ML-DSA 和 ML-KEM PKCS#8 密钥。
  - version: v24.8.0
    pr-url: https://github.com/nodejs/node/pull/59647
    description: KMAC 算法现已支持。
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59569
    description: 现已支持 ML-KEM 算法。
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59365
    description: 现已支持 ChaCha20-Poly1305 算法。
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59365
    description: 现已支持 ML-DSA 算法。
  - version:
    - v18.4.0
    - v16.17.0
    pr-url: https://github.com/nodejs/node/pull/42507
    description: "添加了 `'Ed25519'`、`'Ed448'`、`'X25519'` 和 `'X448'` 算法。"
  - version: v15.9.0
    pr-url: https://github.com/nodejs/node/pull/37203
    description: "移除了 `'NODE-DSA'` JWK 导入。"
-->

* `format` {string} 必须是 `'raw'`、`'pkcs8'`、`'spki'`、`'jwk'`、`'raw-secret'`[^modern-algos]、`'raw-public'`[^modern-algos] 或 `'raw-seed'`[^modern-algos] 之一。
* `keyData` {ArrayBuffer|TypedArray|DataView|Buffer|Object}

<!--lint disable maximum-line-length remark-lint-->

* `algorithm` {string|Algorithm|RsaHashedImportParams|EcKeyImportParams|HmacImportParams|KmacImportParams}

<!--lint enable maximum-line-length remark-lint-->

* `extractable` {boolean}
* `keyUsages` {string\[]} 参见 [密钥用途][]。
* 返回：{Promise} 成功时兑现为 {CryptoKey}。

此方法尝试将提供的 `keyData` 解释为给定的 `format`，以使用提供的 `algorithm`、`extractable` 和 `keyUsages` 参数创建 {CryptoKey} 实例。如果导入成功，返回的 Promise 将解决为密钥材料的 {CryptoKey} 表示。

如果导入 KDF 算法密钥，`extractable` 必须为 `false`。

目前支持的算法包括：

| 支持的密钥算法              | `'spki'` | `'pkcs8'` | `'jwk'` | `'raw'` | `'raw-secret'` | `'raw-public'` | `'raw-seed'` |
| ------------------------------------ | -------- | --------- | ------- | ------- | -------------- | -------------- | ------------ |
| `'AES-CBC'`                          |          |           | ✔       | ✔       | ✔              |                |              |
| `'AES-CTR'`                          |          |           | ✔       | ✔       | ✔              |                |              |
| `'AES-GCM'`                          |          |           | ✔       | ✔       | ✔              |                |              |
| `'AES-KW'`                           |          |           | ✔       | ✔       | ✔              |                |              |
| `'AES-OCB'`[^modern-algos]           |          |           | ✔       |         | ✔              |                |              |
| `'Argon2d'`[^modern-algos]           |          |           |         |         | ✔              |                |              |
| `'Argon2i'`[^modern-algos]           |          |           |         |         | ✔              |                |              |
| `'Argon2id'`[^modern-algos]          |          |           |         |         | ✔              |                |              |
| `'ChaCha20-Poly1305'`[^modern-algos] |          |           | ✔       |         | ✔              |                |              |
| `'ECDH'`                             | ✔        | ✔         | ✔       | ✔       |                | ✔              |              |
| `'ECDSA'`                            | ✔        | ✔         | ✔       | ✔       |                | ✔              |              |
| `'Ed25519'`                          | ✔        | ✔         | ✔       | ✔       |                | ✔              |              |
| `'Ed448'`[^secure-curves]            | ✔        | ✔         | ✔       | ✔       |                | ✔              |              |
| `'HKDF'`                             |          |           |         | ✔       | ✔              |                |              |
| `'HMAC'`                             |          |           | ✔       | ✔       | ✔              |                |              |
| `'KMAC128'`[^modern-algos]           |          |           | ✔       |         | ✔              |                |              |
| `'KMAC256'`[^modern-algos]           |          |           | ✔       |         | ✔              |                |              |
| `'ML-DSA-44'`[^modern-algos]         | ✔        | ✔         | ✔       |         |                | ✔              | ✔            |
| `'ML-DSA-65'`[^modern-algos]         | ✔        | ✔         | ✔       |         |                | ✔              | ✔            |
| `'ML-DSA-87'`[^modern-algos]         | ✔        | ✔         | ✔       |         |                | ✔              | ✔            |
| `'ML-KEM-512'`[^modern-algos]        | ✔        | ✔         | ✔       |         |                | ✔              | ✔            |
| `'ML-KEM-768'`[^modern-algos]        | ✔        | ✔         | ✔       |         |                | ✔              | ✔            |
| `'ML-KEM-1024'`[^modern-algos]       | ✔        | ✔         | ✔       |         |                | ✔              | ✔            |
| `'PBKDF2'`                           |          |           |         | ✔       | ✔              |                |              |
| `'RSA-OAEP'`                         | ✔        | ✔         | ✔       |         |                |                |              |
| `'RSA-PSS'`                          | ✔        | ✔         | ✔       |         |                |                |              |
| `'RSASSA-PKCS1-v1_5'`                | ✔        | ✔         | ✔       |         |                |                |              |
| `'X25519'`                           | ✔        | ✔         | ✔       | ✔       |                | ✔              |              |
| `'X448'`[^secure-curves]             | ✔        | ✔         | ✔       | ✔       |                | ✔              |              |

### `subtle.sign(algorithm, key, data)`

<!-- YAML
added: v15.0.0
changes:
  - version: v24.8.0
    pr-url: https://github.com/nodejs/node/pull/59647
    description: KMAC 算法现已支持。
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59365
    description: 现已支持 ML-DSA 算法。
  - version:
    - v18.4.0
    - v16.17.0
    pr-url: https://github.com/nodejs/node/pull/42507
    description: "添加了 `'Ed25519'` 和 `'Ed448'` 算法。"
-->

<!--lint disable maximum-line-length remark-lint-->

* `algorithm` {string|Algorithm|RsaPssParams|EcdsaParams|ContextParams|KmacParams}
* `key` {CryptoKey}
* `data` {ArrayBuffer|TypedArray|DataView|Buffer}
* 返回：{Promise} 成功时兑现为 {ArrayBuffer}。

<!--lint enable maximum-line-length remark-lint-->

使用 `algorithm` 给出的方法和参数以及 `key` 提供的密钥材料，此方法尝试生成 `data` 的密码学签名。如果成功，返回的 Promise 将解决为一个包含生成签名的 {ArrayBuffer}。

目前支持的算法包括：

* `'ECDSA'`
* `'Ed25519'`
* `'Ed448'`[^secure-curves]
* `'HMAC'`
* `'KMAC128'`[^modern-algos]
* `'KMAC256'`[^modern-algos]
* `'ML-DSA-44'`[^modern-algos]
* `'ML-DSA-65'`[^modern-algos]
* `'ML-DSA-87'`[^modern-algos]
* `'RSA-PSS'`
* `'RSASSA-PKCS1-v1_5'`

### `subtle.unwrapKey(format, wrappedKey, unwrappingKey, unwrapAlgorithm, unwrappedKeyAlgorithm, extractable, keyUsages)`

<!-- YAML
added: v15.0.0
changes:
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59539
    description: 现已支持 AES-OCB 算法。
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59365
    description: 现已支持 ChaCha20-Poly1305 算法。
-->

* `format` {string} 必须是 `'raw'`、`'pkcs8'`、`'spki'`、`'jwk'`、`'raw-secret'`[^modern-algos]、`'raw-public'`[^modern-algos] 或 `'raw-seed'`[^modern-algos] 之一。
* `wrappedKey` {ArrayBuffer|TypedArray|DataView|Buffer}
* `unwrappingKey` {CryptoKey}

<!--lint disable maximum-line-length remark-lint-->

* `unwrapAlgorithm` {string|Algorithm|RsaOaepParams|AesCtrParams|AesCbcParams|AeadParams}
* `unwrappedKeyAlgorithm` {string|Algorithm|RsaHashedImportParams|EcKeyImportParams|HmacImportParams|KmacImportParams}

<!--lint enable maximum-line-length remark-lint-->

* `extractable` {boolean}
* `keyUsages` {string\[]} 参见 [密钥用途][]。
* 返回：{Promise} 成功时兑现为 {CryptoKey}。

在密码学中，“包装密钥”指的是导出然后加密密钥材料。此方法尝试解密一个已包装的密钥并创建一个 {CryptoKey} 实例。它等同于先对加密的密钥数据调用 [`subtle.decrypt()`][]（使用 `wrappedKey`、`unwrapAlgorithm` 和 `unwrappingKey` 作为输入），然后使用 `unwrappedKeyAlgorithm`、`extractable` 和 `keyUsages` 参数作为输入，将结果传递给 [`subtle.importKey()`][] 方法。如果成功，返回的 Promise 将以一个 {CryptoKey} 对象兑现。

目前支持的包装算法包括：

* `'AES-CBC'`
* `'AES-CTR'`
* `'AES-GCM'`
* `'AES-KW'`
* `'AES-OCB'`[^modern-algos]
* `'ChaCha20-Poly1305'`[^modern-algos]
* `'RSA-OAEP'`

支持的解包密钥算法包括：

* `'AES-CBC'`
* `'AES-CTR'`
* `'AES-GCM'`
* `'AES-KW'`
* `'AES-OCB'`[^modern-algos]
* `'ChaCha20-Poly1305'`[^modern-algos]
* `'ECDH'`
* `'ECDSA'`
* `'Ed25519'`
* `'Ed448'`[^secure-curves]
* `'HMAC'`
* `'KMAC128'`[^modern-algos]
* `'KMAC256'`[^modern-algos]
* `'ML-DSA-44'`[^modern-algos]
* `'ML-DSA-65'`[^modern-algos]
* `'ML-DSA-87'`[^modern-algos]
* `'ML-KEM-512'`[^modern-algos]
* `'ML-KEM-768'`[^modern-algos]
* `'ML-KEM-1024'`[^modern-algos]
* `'RSA-OAEP'`
* `'RSA-PSS'`
* `'RSASSA-PKCS1-v1_5'`
* `'X25519'`
* `'X448'`[^secure-curves]

### `subtle.verify(algorithm, key, signature, data)`

<!-- YAML
added: v15.0.0
changes:
  - version: v24.8.0
    pr-url: https://github.com/nodejs/node/pull/59647
    description: KMAC 算法现已支持。
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59365
    description: 现已支持 ML-DSA 算法。
  - version:
    - v18.4.0
    - v16.17.0
    pr-url: https://github.com/nodejs/node/pull/42507
    description: "添加了 `'Ed25519'` 和 `'Ed448'` 算法。"
-->

<!--lint disable maximum-line-length remark-lint-->

* `algorithm` {string|Algorithm|RsaPssParams|EcdsaParams|ContextParams|KmacParams}
* `key` {CryptoKey}
* `signature` {ArrayBuffer|TypedArray|DataView|Buffer}
* `data` {ArrayBuffer|TypedArray|DataView|Buffer}
* 返回：{Promise} 成功时兑现为 {boolean}。

<!--lint enable maximum-line-length remark-lint-->

使用 `algorithm` 中给出的方法和参数以及 `key` 提供的密钥材料，此方法尝试验证 `signature` 是否是 `data` 的有效密码学签名。返回的 Promise 将解决为 `true` 或 `false`。

目前支持的算法包括：

* `'ECDSA'`
* `'Ed25519'`
* `'Ed448'`[^secure-curves]
* `'HMAC'`
* `'KMAC128'`[^modern-algos]
* `'KMAC256'`[^modern-algos]
* `'ML-DSA-44'`[^modern-algos]
* `'ML-DSA-65'`[^modern-algos]
* `'ML-DSA-87'`[^modern-algos]
* `'RSA-PSS'`
* `'RSASSA-PKCS1-v1_5'`

### `subtle.wrapKey(format, key, wrappingKey, wrapAlgorithm)`

<!-- YAML
added: v15.0.0
changes:
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59539
    description: 现已支持 AES-OCB 算法。
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59365
    description: 现已支持 ChaCha20-Poly1305 算法。
-->

<!--lint disable maximum-line-length remark-lint-->

* `format` {string} 必须是 `'raw'`、`'pkcs8'`、`'spki'`、`'jwk'`、`'raw-secret'`[^modern-algos]、`'raw-public'`[^modern-algos] 或 `'raw-seed'`[^modern-algos] 之一。
* `key` {CryptoKey}
* `wrappingKey` {CryptoKey}
* `wrapAlgorithm` {string|Algorithm|RsaOaepParams|AesCtrParams|AesCbcParams|AeadParams}
* 返回：{Promise} 成功时兑现为 {ArrayBuffer}。

<!--lint enable maximum-line-length remark-lint-->

在密码学中，“包装密钥”指的是导出然后加密密钥材料。此方法会将密钥材料导出为 `format` 标识的格式，然后使用 `wrapAlgorithm` 指定的方法和参数以及 `wrappingKey` 提供的密钥材料对其进行加密。它等同于使用 `format` 和 `key` 作为参数调用 [`subtle.exportKey()`][]，然后将结果作为输入传递给 [`subtle.encrypt()`][] 方法，使用 `wrappingKey` 和 `wrapAlgorithm` 作为输入。如果成功，返回的 Promise 将以一个包含加密密钥数据的 {ArrayBuffer} 兑现。

目前支持的包装算法包括：

* `'AES-CBC'`
* `'AES-CTR'`
* `'AES-GCM'`
* `'AES-KW'`
* `'AES-OCB'`[^modern-algos]
* `'ChaCha20-Poly1305'`[^modern-algos]
* `'RSA-OAEP'`

## 算法参数

算法参数对象定义了各种 {SubtleCrypto} 方法所使用的方法和参数。虽然此处描述为“类”，但它们是简单的 JavaScript 字典对象。

### 类：`Algorithm`

<!-- YAML
added: v15.0.0
-->

#### `Algorithm.name`

<!-- YAML
added: v15.0.0
-->

* 类型：{string}

### 类：`AeadParams`

<!-- YAML
added: v15.0.0
-->

#### `aeadParams.additionalData`

<!-- YAML
added: v15.0.0
-->

* 类型：{ArrayBuffer|TypedArray|DataView|Buffer|undefined}

额外的输入，不被加密但包含在数据的认证中。`additionalData` 的使用是可选的。

#### `aeadParams.iv`

<!-- YAML
added: v15.0.0
-->

* 类型：{ArrayBuffer|TypedArray|DataView|Buffer}

对于使用给定密钥的每次加密操作，初始化向量必须是唯一的。

#### `aeadParams.name`

<!-- YAML
added: v15.0.0
-->

* 类型：{string} 必须是 `'AES-GCM'`、`'AES-OCB'` 或 `'ChaCha20-Poly1305'`。

#### `aeadParams.tagLength`

<!-- YAML
added: v15.0.0
-->

* 类型：{number} 生成的认证标签的位数大小。

### 类：`AesDerivedKeyParams`

<!-- YAML
added: v15.0.0
-->

#### `aesDerivedKeyParams.name`

<!-- YAML
added: v15.0.0
-->

* 类型：{string} 必须是 `'AES-CBC'`、`'AES-CTR'`、`'AES-GCM'`、`'AES-OCB'` 或 `'AES-KW'` 之一

#### `aesDerivedKeyParams.length`

<!-- YAML
added: v15.0.0
-->

* 类型：{number}

要派生的 AES 密钥的长度。必须是 `128`、`192` 或 `256`。

### 类：`AesCbcParams`

<!-- YAML
added: v15.0.0
-->

#### `aesCbcParams.iv`

<!-- YAML
added: v15.0.0
-->

* 类型：{ArrayBuffer|TypedArray|DataView|Buffer}

提供初始化向量。其长度必须恰好为 16 字节，并且应该是不可预测且密码学随机的。

#### `aesCbcParams.name`

<!-- YAML
added: v15.0.0
-->

* 类型：{string} 必须是 `'AES-CBC'`。

### 类：`AesCtrParams`

<!-- YAML
added: v15.0.0
-->

#### `aesCtrParams.counter`

<!-- YAML
added: v15.0.0
-->

* 类型：{ArrayBuffer|TypedArray|DataView|Buffer}

计数器块的初始值。其长度必须恰好为 16 字节。

`AES-CTR` 方法使用块的最右边 `length` 位作为计数器，其余位作为 nonce。

#### `aesCtrParams.length`

<!-- YAML
added: v15.0.0
-->

* 类型：{number} `aesCtrParams.counter` 中用作计数器的位数。

#### `aesCtrParams.name`

<!-- YAML
added: v15.0.0
-->

* 类型：{string} 必须是 `'AES-CTR'`。

### 类：`AesKeyAlgorithm`

<!-- YAML
added: v15.0.0
-->

#### `aesKeyAlgorithm.length`

<!-- YAML
added: v15.0.0
-->

* 类型：{number}

AES 密钥的长度（位）。

#### `aesKeyAlgorithm.name`

<!-- YAML
added: v15.0.0
-->

* 类型：{string}

### 类：`AesKeyGenParams`

<!-- YAML
added: v15.0.0
-->

#### `aesKeyGenParams.length`

<!-- YAML
added: v15.0.0
-->

* 类型：{number}

要生成的 AES 密钥的长度。必须是 `128`、`192` 或 `256`。

#### `aesKeyGenParams.name`

<!-- YAML
added: v15.0.0
-->

* 类型：{string} 必须是 `'AES-CBC'`、`'AES-CTR'`、`'AES-GCM'` 或 `'AES-KW'` 之一

### 类：`Argon2Params`

<!-- YAML
added: v24.8.0
-->

#### `argon2Params.associatedData`

<!-- YAML
added: v24.8.0
-->

* 类型：{ArrayBuffer|TypedArray|DataView|Buffer}

表示可选的关联数据。

#### `argon2Params.memory`

<!-- YAML
added: v24.8.0
-->

* 类型：{number}

表示内存大小（kibibytes）。必须至少是并行度的 8 倍。

#### `argon2Params.name`

<!-- YAML
added: v24.8.0
-->

* 类型：{string} 必须是 `'Argon2d'`、`'Argon2i'` 或 `'Argon2id'` 之一。

#### `argon2Params.nonce`

<!-- YAML
added: v24.8.0
-->

* 类型：{ArrayBuffer|TypedArray|DataView|Buffer}

表示 nonce，在密码哈希应用中作为盐。

#### `argon2Params.parallelism`

<!-- YAML
added: v24.8.0
-->

* 类型：{number}

表示并行度。

#### `argon2Params.passes`

<!-- YAML
added: v24.8.0
-->

* 类型：{number}

表示遍数。

#### `argon2Params.secretValue`

<!-- YAML
added: v24.8.0
-->

* 类型：{ArrayBuffer|TypedArray|DataView|Buffer}

表示可选的秘密值。

#### `argon2Params.version`

<!-- YAML
added: v24.8.0
-->

* 类型：{number}

表示 Argon2 版本号。默认且当前唯一定义的版本是 `19` (`0x13`)。

### 类：`ContextParams`

<!-- YAML
added: v24.7.0
-->

#### `contextParams.name`

<!-- YAML
added: v24.7.0
-->

* 类型：{string} 必须是 `'Ed448'`[^secure-curves]、`'ML-DSA-44'`[^modern-algos]、
  `'ML-DSA-65'`[^modern-algos]、或 `'ML-DSA-87'`[^modern-algos]。

#### `contextParams.context`

<!-- YAML
added: v24.7.0
changes:
  - version: v24.8.0
    pr-url: https://github.com/nodejs/node/pull/59570
    description: 现在支持非空上下文。
-->

* 类型：{ArrayBuffer|TypedArray|DataView|Buffer|undefined}

`context` 成员表示要与消息关联的可选上下文数据。

### 类：`CShakeParams`

<!-- YAML
added: v24.7.0
changes:
  - version:
     - v25.9.0
     - v24.15.0
    pr-url: https://github.com/nodejs/node/pull/61875
    description: "将 `cShakeParams.length` 重命名为 `cShakeParams.outputLength`。"
-->

#### `cShakeParams.name`

<!-- YAML
added: v24.7.0
-->

* 类型：{string} 必须是 `'cSHAKE128'`[^modern-algos] 或 `'cSHAKE256'`[^modern-algos]。

#### `cShakeParams.outputLength`

<!-- YAML
added:
 - v25.9.0
 - v24.15.0
-->

* 类型：{number} 表示请求的输出长度（位）。

#### `cShakeParams.functionName`

<!-- YAML
added: v24.7.0
-->

* 类型：{ArrayBuffer|TypedArray|DataView|Buffer|undefined}

`functionName` 成员表示函数名，NIST 使用它来定义基于 cSHAKE 的函数。
Node.js Web Crypto API 实现仅支持零长度的 functionName，这等价于根本不提供 functionName。

#### `cShakeParams.customization`

<!-- YAML
added: v24.7.0
-->

* 类型：{ArrayBuffer|TypedArray|DataView|Buffer|undefined}

`customization` 成员表示自定义字符串。
Node.js Web Crypto API 实现仅支持零长度的 customization，这等价于根本不提供 customization。

### 类：`EcdhKeyDeriveParams`

<!-- YAML
added: v15.0.0
-->

#### `ecdhKeyDeriveParams.name`

<!-- YAML
added: v15.0.0
-->

* 类型：{string} 必须是 `'ECDH'`、`'X25519'` 或 `'X448'`[^secure-curves]。

#### `ecdhKeyDeriveParams.public`

<!-- YAML
added: v15.0.0
-->

* 类型：{CryptoKey}

ECDH 密钥派生通过将一方的私钥和另一方的公钥作为输入进行运作——使用二者生成一个共同的共享密钥。
`ecdhKeyDeriveParams.public` 属性设置为另一方的公钥。

### 类：`EcdsaParams`

<!-- YAML
added: v15.0.0
changes:
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59365
    description: 现在支持 SHA-3 算法。
-->

#### `ecdsaParams.hash`

<!-- YAML
added: v15.0.0
changes:
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59365
    description: 现在支持 SHA-3 算法。
-->

* 类型：{string|Algorithm}

如果表示为 {string}，值必须是以下之一：

* `'SHA-1'`
* `'SHA-256'`
* `'SHA-384'`
* `'SHA-512'`
* `'SHA3-256'`[^modern-algos]
* `'SHA3-384'`[^modern-algos]
* `'SHA3-512'`[^modern-algos]

如果表示为 {Algorithm}，对象的 `name` 属性必须是上述列出的值之一。

#### `ecdsaParams.name`

<!-- YAML
added: v15.0.0
-->

* 类型：{string} 必须是 `'ECDSA'`。

### 类：`EcKeyAlgorithm`

<!-- YAML
added: v15.0.0
-->

#### `ecKeyAlgorithm.name`

<!-- YAML
added: v15.0.0
-->

* 类型：{string}

#### `ecKeyAlgorithm.namedCurve`

<!-- YAML
added: v15.0.0
-->

* 类型：{string}

### 类：`EcKeyGenParams`

<!-- YAML
added: v15.0.0
-->

#### `ecKeyGenParams.name`

<!-- YAML
added: v15.0.0
-->

* 类型：{string} 必须是 `'ECDSA'` 或 `'ECDH'` 之一。

#### `ecKeyGenParams.namedCurve`

<!-- YAML
added: v15.0.0
-->

* 类型：{string} 必须是 `'P-256'`、`'P-384'`、`'P-521'` 之一。

### 类：`EcKeyImportParams`

<!-- YAML
added: v15.0.0
-->

#### `ecKeyImportParams.name`

<!-- YAML
added: v15.0.0
-->

* 类型：{string} 必须是 `'ECDSA'` 或 `'ECDH'` 之一。

#### `ecKeyImportParams.namedCurve`

<!-- YAML
added: v15.0.0
-->

* 类型：{string} 必须是 `'P-256'`、`'P-384'`、`'P-521'` 之一。

### 类：`EncapsulatedBits`

<!-- YAML
added: v24.7.0
-->

用于消息加密的临时对称密钥（表示为 {ArrayBuffer}）以及由此共享密钥加密的密文（可以随消息一起传输给消息接收者）。接收者使用其私钥来确定共享密钥是什么，从而允许他们解密消息。

#### `encapsulatedBits.ciphertext`

<!-- YAML
added: v24.7.0
-->

* 类型：{ArrayBuffer}

#### `encapsulatedBits.sharedKey`

<!-- YAML
added: v24.7.0
-->

* 类型：{ArrayBuffer}

### 类：`EncapsulatedKey`

<!-- YAML
added: v24.7.0
-->

用于消息加密的临时对称密钥（表示为 {CryptoKey}）以及由此共享密钥加密的密文（可以随消息一起传输给消息接收者）。接收者使用其私钥来确定共享密钥是什么，从而允许他们解密消息。

#### `encapsulatedKey.ciphertext`

<!-- YAML
added: v24.7.0
-->

* 类型：{ArrayBuffer}

#### `encapsulatedKey.sharedKey`

<!-- YAML
added: v24.7.0
-->

* 类型：{CryptoKey}

### 类：`HkdfParams`

<!-- YAML
added: v15.0.0
-->

#### `hkdfParams.hash`

<!-- YAML
added: v15.0.0
changes:
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59365
    description: 现在支持 SHA-3 算法。
-->

* 类型：{string|Algorithm}

如果表示为 {string}，值必须是以下之一：

* `'SHA-1'`
* `'SHA-256'`
* `'SHA-384'`
* `'SHA-512'`
* `'SHA3-256'`[^modern-algos]
* `'SHA3-384'`[^modern-algos]
* `'SHA3-512'`[^modern-algos]

如果表示为 {Algorithm}，对象的 `name` 属性必须是上述列出的值之一。

#### `hkdfParams.info`

<!-- YAML
added: v15.0.0
-->

* 类型：{ArrayBuffer|TypedArray|DataView|Buffer}

为 HKDF 算法提供特定于应用程序的上下文输入。
这可以是零长度，但必须提供。

#### `hkdfParams.name`

<!-- YAML
added: v15.0.0
-->

* 类型：{string} 必须是 `'HKDF'`。

#### `hkdfParams.salt`

<!-- YAML
added: v15.0.0
-->

* 类型：{ArrayBuffer|TypedArray|DataView|Buffer}

盐值显著提高了 HKDF 算法的强度。
它应该是随机或伪随机的，并且长度应与摘要函数的输出相同（例如，如果使用 `'SHA-256'` 作为摘要，盐应该是 256 位的随机数据）。

### 类：`HmacImportParams`

<!-- YAML
added: v15.0.0
-->

#### `hmacImportParams.hash`

<!-- YAML
added: v15.0.0
changes:
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59365
    description: 现在支持 SHA-3 算法。
-->

* 类型：{string|Algorithm}

如果表示为 {string}，值必须是以下之一：

* `'SHA-1'`
* `'SHA-256'`
* `'SHA-384'`
* `'SHA-512'`
* `'SHA3-256'`[^modern-algos]
* `'SHA3-384'`[^modern-algos]
* `'SHA3-512'`[^modern-algos]

如果表示为 {Algorithm}，对象的 `name` 属性必须是上述列出的值之一。

#### `hmacImportParams.length`

<!-- YAML
added: v15.0.0
-->

* 类型：{number}

HMAC 密钥的可选位数。这是可选的，在大多数情况下应省略。

#### `hmacImportParams.name`

<!-- YAML
added: v15.0.0
-->

* 类型：{string} 必须是 `'HMAC'`。

### 类：`HmacKeyAlgorithm`

<!-- YAML
added: v15.0.0
-->

#### `hmacKeyAlgorithm.hash`

<!-- YAML
added: v15.0.0
-->

* 类型：{Algorithm}

#### `hmacKeyAlgorithm.length`

<!-- YAML
added: v15.0.0
-->

* 类型：{number}

HMAC 密钥的长度（位）。

#### `hmacKeyAlgorithm.name`

<!-- YAML
added: v15.0.0
-->

* 类型：{string}

### 类：`HmacKeyGenParams`

<!-- YAML
added: v15.0.0
-->

#### `hmacKeyGenParams.hash`

<!-- YAML
added: v15.0.0
changes:
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59365
    description: 现在支持 SHA-3 算法。
-->

* 类型：{string|Algorithm}

如果表示为 {string}，值必须是以下之一：

* `'SHA-1'`
* `'SHA-256'`
* `'SHA-384'`
* `'SHA-512'`
* `'SHA3-256'`[^modern-algos]
* `'SHA3-384'`[^modern-algos]
* `'SHA3-512'`[^modern-algos]

如果表示为 {Algorithm}，对象的 `name` 属性必须是上述列出的值之一。

#### `hmacKeyGenParams.length`

<!-- YAML
added: v15.0.0
-->

* 类型：{number}

要为 HMAC 密钥生成的位数。如果省略，长度将由使用的哈希算法确定。
这是可选的，在大多数情况下应省略。

#### `hmacKeyGenParams.name`

<!-- YAML
added: v15.0.0
-->

* 类型：{string} 必须是 `'HMAC'`。

### 类：`KeyAlgorithm`

<!-- YAML
added: v15.0.0
-->

#### `keyAlgorithm.name`

<!-- YAML
added: v15.0.0
-->

* 类型：{string}

### 类：`KangarooTwelveParams`

<!-- YAML
added:
 - v25.9.0
-->

#### `kangarooTwelveParams.customization`

<!-- YAML
added:
 - v25.9.0
-->

* 类型：{ArrayBuffer|TypedArray|DataView|Buffer|undefined}

KangarooTwelve 的可选自定义字符串。

#### `kangarooTwelveParams.name`

<!-- YAML
added:
 - v25.9.0
-->

* 类型：{string} 必须是 `'KT128'`[^modern-algos] 或 `'KT256'`[^modern-algos]。

#### `kangarooTwelveParams.outputLength`

<!-- YAML
added:
 - v25.9.0
-->

* 类型：{number} 表示请求的输出长度（位）。

### 类：`KmacImportParams`

<!-- YAML
added: v24.8.0
-->

#### `kmacImportParams.length`

<!-- YAML
added: v24.8.0
-->

* 类型：{number}

KMAC 密钥的可选位数。这是可选的，在大多数情况下应省略。

#### `kmacImportParams.name`

<!-- YAML
added: v24.8.0
-->

* 类型：{string} 必须是 `'KMAC128'` 或 `'KMAC256'`。

### 类：`KmacKeyAlgorithm`

<!-- YAML
added: v24.8.0
-->

#### `kmacKeyAlgorithm.length`

<!-- YAML
added: v24.8.0
-->

* 类型：{number}

KMAC 密钥的长度（位）。

#### `kmacKeyAlgorithm.name`

<!-- YAML
added: v24.8.0
-->

* 类型：{string}

### 类：`KmacKeyGenParams`

<!-- YAML
added: v24.8.0
-->

#### `kmacKeyGenParams.length`

<!-- YAML
added: v24.8.0
-->

* 类型：{number}

要为 KMAC 密钥生成的位数。如果省略，长度将由使用的 KMAC 算法确定。
这是可选的，在大多数情况下应省略。

#### `kmacKeyGenParams.name`

<!-- YAML
added: v24.8.0
-->

* 类型：{string} 必须是 `'KMAC128'` 或 `'KMAC256'`。

### 类：`KmacParams`

<!-- YAML
added: v24.8.0
changes:
  - version:
     - v25.9.0
     - v24.15.0
    pr-url: https://github.com/nodejs/node/pull/61875
    description: "将 `kmacParams.length` 重命名为 `kmacParams.outputLength`。"
-->

#### `kmacParams.algorithm`

<!-- YAML
added: v24.8.0
-->

* 类型：{string} 必须是 `'KMAC128'` 或 `'KMAC256'`。

#### `kmacParams.outputLength`

<!-- YAML
added:
 - v25.9.0
 - v24.15.0
-->

* 类型：{number}

输出的长度（字节）。这必须是正整数。

#### `kmacParams.customization`

<!-- YAML
added: v24.8.0
-->

* 类型：{ArrayBuffer|TypedArray|DataView|Buffer|undefined}

`customization` 成员表示可选的自定义字符串。

### 类：`Pbkdf2Params`

<!-- YAML
added: v15.0.0
-->

#### `pbkdf2Params.hash`

<!-- YAML
added: v15.0.0
changes:
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59365
    description: 现在支持 SHA-3 算法。
-->

* 类型：{string|Algorithm}

如果表示为 {string}，值必须是以下之一：

* `'SHA-1'`
* `'SHA-256'`
* `'SHA-384'`
* `'SHA-512'`
* `'SHA3-256'`[^modern-algos]
* `'SHA3-384'`[^modern-algos]
* `'SHA3-512'`[^modern-algos]

如果表示为 {Algorithm}，对象的 `name` 属性必须是上述列出的值之一。

#### `pbkdf2Params.iterations`

<!-- YAML
added: v15.0.0
-->

* 类型：{number}

PBKDF2 算法在派生位时应进行的迭代次数。

#### `pbkdf2Params.name`

<!-- YAML
added: v15.0.0
-->

* 类型：{string} 必须是 `'PBKDF2'`。

#### `pbkdf2Params.salt`

<!-- YAML
added: v15.0.0
-->

* 类型：{ArrayBuffer|TypedArray|DataView|Buffer}

应至少为 16 个随机或伪随机字节。

### 类：`RsaHashedImportParams`

<!-- YAML
added: v15.0.0
-->

#### `rsaHashedImportParams.hash`

<!-- YAML
added: v15.0.0
changes:
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59365
    description: 现在支持 SHA-3 算法。
-->

* 类型：{string|Algorithm}

如果表示为 {string}，值必须是以下之一：

* `'SHA-1'`
* `'SHA-256'`
* `'SHA-384'`
* `'SHA-512'`
* `'SHA3-256'`[^modern-algos]
* `'SHA3-384'`[^modern-algos]
* `'SHA3-512'`[^modern-algos]

如果表示为 {Algorithm}，对象的 `name` 属性必须是上述列出的值之一。

#### `rsaHashedImportParams.name`

<!-- YAML
added: v15.0.0
-->

* 类型：{string} 必须是 `'RSASSA-PKCS1-v1_5'`、`'RSA-PSS'` 或 `'RSA-OAEP'` 之一。

### 类：`RsaHashedKeyAlgorithm`

<!-- YAML
added: v15.0.0
-->

#### `rsaHashedKeyAlgorithm.hash`

<!-- YAML
added: v15.0.0
-->

* 类型：{Algorithm}

#### `rsaHashedKeyAlgorithm.modulusLength`

<!-- YAML
added: v15.0.0
-->

* 类型：{number}

RSA 模数的长度（位）。

#### `rsaHashedKeyAlgorithm.name`

<!-- YAML
added: v15.0.0
-->

* 类型：{string}

#### `rsaHashedKeyAlgorithm.publicExponent`

<!-- YAML
added: v15.0.0
-->

* 类型：{Uint8Array}

RSA 公钥指数。

### 类：`RsaHashedKeyGenParams`

<!-- YAML
added: v15.0.0
-->

#### `rsaHashedKeyGenParams.hash`

<!-- YAML
added: v15.0.0
changes:
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59365
    description: 现在支持 SHA-3 算法。
-->

* 类型：{string|Algorithm}

如果表示为 {string}，值必须是以下之一：

* `'SHA-1'`
* `'SHA-256'`
* `'SHA-384'`
* `'SHA-512'`
* `'SHA3-256'`[^modern-algos]
* `'SHA3-384'`[^modern-algos]
* `'SHA3-512'`[^modern-algos]

如果表示为 {Algorithm}，对象的 `name` 属性必须是上述列出的值之一。

#### `rsaHashedKeyGenParams.modulusLength`

<!-- YAML
added: v15.0.0
-->

* 类型：{number}

RSA 模数的长度（位）。作为最佳实践，这应至少为 `2048`。

#### `rsaHashedKeyGenParams.name`

<!-- YAML
added: v15.0.0
-->

* 类型：{string} 必须是 `'RSASSA-PKCS1-v1_5'`、`'RSA-PSS'` 或 `'RSA-OAEP'` 之一。

#### `rsaHashedKeyGenParams.publicExponent`

<!-- YAML
added: v15.0.0
-->

* 类型：{Uint8Array}

RSA 公钥指数。这必须是一个 {Uint8Array}，包含一个大端无符号整数，该整数必须适合 32 位。{Uint8Array} 可能包含任意数量的前导零位。该值必须是质数。除非有理由使用不同的值，否则使用 `new Uint8Array([1, 0, 1])` (65537) 作为公钥指数。

### 类：`RsaOaepParams`

<!-- YAML
added: v15.0.0
-->

#### `rsaOaepParams.label`

<!-- YAML
added: v15.0.0
-->

* 类型：{ArrayBuffer|TypedArray|DataView|Buffer}

额外的字节集合，不会被加密，但将绑定到生成的密文。

`rsaOaepParams.label` 参数是可选的。

#### `rsaOaepParams.name`

<!-- YAML
added: v15.0.0
-->

* 类型：{string} 必须是 `'RSA-OAEP'`。

### 类：`RsaPssParams`

<!-- YAML
added: v15.0.0
-->

#### `rsaPssParams.name`

<!-- YAML
added: v15.0.0
-->

* 类型：{string} 必须是 `'RSA-PSS'`。

#### `rsaPssParams.saltLength`

<!-- YAML
added: v15.0.0
-->

* 类型：{number}

要使用的随机盐的长度（字节）。

### 类：`TurboShakeParams`

<!-- YAML
added:
 - v25.9.0
-->

#### `turboShakeParams.domainSeparation`

<!-- YAML
added:
 - v25.9.0
-->

* 类型：{number|undefined}

可选的域分离字节 (0x01-0x7f)。默认为 `0x1f`。

#### `turboShakeParams.name`

<!-- YAML
added:
 - v25.9.0
-->

* 类型：{string} 必须是 `'TurboSHAKE128'`[^modern-algos] 或 `'TurboSHAKE256'`[^modern-algos]。

#### `turboShakeParams.outputLength`

<!-- YAML
added:
 - v25.9.0
-->

* 类型：{number} 表示请求的输出长度（位）。

[^secure-curves]: 参见 [Web Cryptography API 中的安全曲线][]

[^modern-algos]: 参见 [Web Cryptography API 中的现代算法][]

[^openssl30]: 需要 OpenSSL >= 3.0

[^openssl32]: 需要 OpenSSL >= 3.2

[^openssl35]: 需要 OpenSSL >= 3.5

[检查运行时算法支持]: #checking-for-runtime-algorithm-support
[JSON Web Key]: https://tools.ietf.org/html/rfc7517
[密钥用法]: #cryptokeyusages
[Web Cryptography API 中的现代算法]: #modern-algorithms-in-the-web-cryptography-api
[RFC 4122]: https://www.rfc-editor.org/rfc/rfc4122.txt
[Web Cryptography API 中的安全曲线]: #secure-curves-in-the-web-cryptography-api
[Web Crypto API]: https://www.w3.org/TR/WebCryptoAPI/
[`SubtleCrypto.supports()`]: #static-method-subtlecryptosupportsoperation-algorithm-lengthoradditionalalgorithm
[`subtle.decapsulateBits()`]: #subtledecapsulatebitsdecapsulationalgorithm-decapsulationkey-ciphertext
[`subtle.decapsulateKey()`]: #subtledecapsulatekeydecapsulationalgorithm-decapsulationkey-ciphertext-sharedkeyalgorithm-extractable-keyusages
[`subtle.decrypt()`]: #subtledecryptalgorithm-key-data
[`subtle.deriveBits()`]: #subtlederivebitsalgorithm-basekey-length
[`subtle.deriveKey()`]: #subtlederivekeyalgorithm-basekey-derivedkeytype-extractable-keyusages
[`subtle.digest()`]: #subtledigestalgorithm-data
[`subtle.encapsulateBits()`]: #subtleencapsulatebitsencapsulationalgorithm-encapsulationkey
[`subtle.encapsulateKey()`]: #subtleencapsulatekeyencapsulationalgorithm-encapsulationkey-sharedkeyalgorithm-extractable-keyusages
[`subtle.encrypt()`]: #subtleencryptalgorithm-key-data
[`subtle.exportKey()`]: #subtleexportkeyformat-key
[`subtle.generateKey()`]: #subtlegeneratekeyalgorithm-extractable-keyusages
[`subtle.getPublicKey()`]: #subtlegetpublickeykey-keyusages
[`subtle.importKey()`]: #subtleimportkeyformat-keydata-algorithm-extractable-keyusages
[`subtle.sign()`]: #subtlesignalgorithm-key-data
[`subtle.unwrapKey()`]: #subtleunwrapkeyformat-wrappedkey-unwrappingkey-unwrapalgorithm-unwrappedkeyalgorithm-extractable-keyusages
[`subtle.verify()`]: #subtleverifyalgorithm-key-signature-data
[`subtle.wrapKey()`]: #subtlewrapkeyformat-key-wrappingkey-wrapalgorithm
