# Punycode

<!-- YAML
deprecated: v7.0.0
-->

<!--introduced_in=v0.10.0-->

> 稳定性：0 - 已弃用

<!-- source_link=lib/punycode.js -->

**Node.js 捆绑的 punycode 模块版本已被弃用。**
在未来的 Node.js 主版本中，此模块将被移除。当前依赖 `punycode` 模块的用户应改用用户空间提供的 [Punycode.js][] 模块。对于基于 punycode 的 URL 编码，请参阅 [`url.domainToASCII`][] 或更通用的 [WHATWG URL API][]。

`punycode` 模块是 [Punycode.js][] 模块的捆绑版本。
可以使用以下方式访问：

```js
const punycode = require('node:punycode');
```

[Punycode][] 是一种由 RFC 3492 定义的字符编码方案，主要用于国际化域名。因为 URL 中的主机名仅限于 ASCII 字符，所以包含非 ASCII 字符的域名必须使用 Punycode 方案转换为 ASCII。例如，翻译成英文单词 `'example'` 的日文字符是 `'例'`。国际化域名 `'例.com'`（等同于 `'example.com'`）由 Punycode 表示为 ASCII 字符串 `'xn--fsq.com'`。

`punycode` 模块提供了 Punycode 标准的简单实现。

`punycode` 模块是 Node.js 使用的第三方依赖项，为方便开发者而提供。对该模块的修复或其他修改必须指向 [Punycode.js][] 项目。

## `punycode.decode(string)`

<!-- YAML
added: v0.5.1
-->

* `string` {string}

`punycode.decode()` 方法将仅包含 ASCII 字符的 [Punycode][] 字符串转换为等效的 Unicode 码点字符串。

```js
punycode.decode('maana-pta'); // 'mañana'
punycode.decode('--dqo34k'); // '☃-⌘'
```

## `punycode.encode(string)`

<!-- YAML
added: v0.5.1
-->

* `string` {string}

`punycode.encode()` 方法将 Unicode 码点字符串转换为仅包含 ASCII 字符的 [Punycode][] 字符串。

```js
punycode.encode('mañana'); // 'maana-pta'
punycode.encode('☃-⌘'); // '--dqo34k'
```

## `punycode.toASCII(domain)`

<!-- YAML
added: v0.6.1
-->

* `domain` {string}

`punycode.toASCII()` 方法将表示国际化域名的 Unicode 字符串转换为 [Punycode][]。只有域名的非 ASCII 部分会被转换。在已经仅包含 ASCII 字符的字符串上调用 `punycode.toASCII()` 将不会产生任何效果。

```js
// 编码域名
punycode.toASCII('mañana.com');  // 'xn--maana-pta.com'
punycode.toASCII('☃-⌘.com');   // 'xn----dqo34k.com'
punycode.toASCII('example.com'); // 'example.com'
```

## `punycode.toUnicode(domain)`

<!-- YAML
added: v0.6.1
-->

* `domain` {string}

`punycode.toUnicode()` 方法将表示包含以 [Punycode][] 编码字符的域名的字符串转换为 Unicode。仅转换域名中以 [Punycode][] 编码的部分。

```js
// 解码域名
punycode.toUnicode('xn--maana-pta.com'); // 'mañana.com'
punycode.toUnicode('xn----dqo34k.com');  // '☃-⌘.com'
punycode.toUnicode('example.com');       // 'example.com'
```

## `punycode.ucs2`

<!-- YAML
added: v0.7.0
-->

### `punycode.ucs2.decode(string)`

<!-- YAML
added: v0.7.0
-->

* `string` {string}

`punycode.ucs2.decode()` 方法返回一个数组，包含字符串中每个 Unicode 符号的数字码点值。

```js
punycode.ucs2.decode('abc'); // [0x61, 0x62, 0x63]
// U+1D306 中心四面体的代理对：
punycode.ucs2.decode('\uD834\uDF06'); // [0x1D306]
```

### `punycode.ucs2.encode(codePoints)`

<!-- YAML
added: v0.7.0
-->

* `codePoints` {integer\[]}

`punycode.ucs2.encode()` 方法基于数字码点值数组返回一个字符串。

```js
punycode.ucs2.encode([0x61, 0x62, 0x63]); // 'abc'
punycode.ucs2.encode([0x1D306]); // '\uD834\uDF06'
```

## `punycode.version`

<!-- YAML
added: v0.6.1
-->

* 类型：{string}

返回一个字符串，标识当前的 [Punycode.js][] 版本号。

[Punycode]: https://tools.ietf.org/html/rfc3492
[Punycode.js]: https://github.com/bestiejs/punycode.js
[WHATWG URL API]: url.md#the-whatwg-url-api
[`url.domainToASCII`]: url.md#urldomaintoascii-domain
