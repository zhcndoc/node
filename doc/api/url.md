# URL

<!--introduced_in=v0.10.0-->

> 稳定性：2 - 稳定

<!-- source_link=lib/url.js -->

`node:url` 模块提供用于 URL 解析和处理的工具。可以使用以下方式访问它：

```mjs
import url from 'node:url';
```

```cjs
const url = require('node:url');
```

## URL 字符串和 URL 对象

URL 字符串是一个包含多个有意义组件的结构化字符串。
解析后，将返回一个 URL 对象，其中包含这些组件各自的属性。

`node:url` 模块提供了两个用于处理 URL 的 API：一个是 Node.js 特有的旧版 API，另一个是实现与 Web 浏览器相同的 [WHATWG URL 标准][] 的新版 API。

下面提供了 WHATWG API 和旧版 API 之间的比较。在 URL
`'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash'` 上方，显示了旧版 `url.parse()` 返回的对象的属性。在其下方是 WHATWG `URL` 对象的属性。

WHATWG URL 的 `origin` 属性包括 `protocol` 和 `host`，但不包括
`username` 或 `password`。

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                              href                                              │
├──────────┬──┬─────────────────────┬────────────────────────┬───────────────────────────┬───────┤
│ protocol │  │        auth         │          host          │           path            │ hash  │
│          │  │                     ├─────────────────┬──────┼──────────┬────────────────┤       │
│          │  │                     │    hostname     │ port │ pathname │     search     │       │
│          │  │                     │                 │      │          ├─┬──────────────┤       │
│          │  │                     │                 │      │          │ │    query     │       │
"  https:   //    user   :   pass   @ sub.example.com : 8080   /p/a/t/h  ?  query=string   #hash "
│          │  │          │          │    hostname     │ port │          │                │       │
│          │  │          │          ├─────────────────┴──────┤          │                │       │
│ protocol │  │ username │ password │          host          │          │                │       │
├──────────┴──┼──────────┴──────────┼────────────────────────┤          │                │       │
│   origin    │                     │         origin         │ pathname │     search     │ hash  │
├─────────────┴─────────────────────┴────────────────────────┴──────────┴────────────────┴───────┤
│                                              href                                              │
└────────────────────────────────────────────────────────────────────────────────────────────────┘
（"" 行中的所有空格都应忽略。它们仅用于格式化。）
```

使用 WHATWG API 解析 URL 字符串：

```js
const myURL =
  new URL('https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash');
```

使用旧版 API 解析 URL 字符串：

```mjs
import url from 'node:url';
const myURL =
  url.parse('https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash');
```

```cjs
const url = require('node:url');
const myURL =
  url.parse('https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash');
```

### 从组件部分构造 URL 并获取构造后的字符串

可以使用属性设置器或模板字符串从组件部分构造 WHATWG URL：

```js
const myURL = new URL('https://example.org');
myURL.pathname = '/a/b/c';
myURL.search = '?d=e';
myURL.hash = '#fgh';
```

```js
const pathname = '/a/b/c';
const search = '?d=e';
const hash = '#fgh';
const myURL = new URL(`https://example.org${pathname}${search}${hash}`);
```

要获取构造后的 URL 字符串，请使用 `href` 属性访问器：

```js
console.log(myURL.href);
```

## WHATWG URL API

### 类：`URL`

<!-- YAML
added:
  - v7.0.0
  - v6.13.0
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18281
    description: 该类现在可在全局对象上使用。
-->

浏览器兼容的 `URL` 类，遵循 WHATWG URL
标准实现。[解析后的 URL 示例][] 可在标准本身中找到。
`URL` 类也可在全局对象上使用。

根据浏览器约定，`URL` 对象的所有属性
都实现为类原型上的 getter 和 setter，而不是对象本身上的
数据属性。因此，与 [旧版 `urlObject`][] 不同，
对 `URL` 对象的任何属性使用 `delete` 关键字（例如 `delete
myURL.protocol`、`delete myURL.pathname` 等）不会产生任何效果，但仍会
返回 `true`。

#### `new URL(input[, base])`

<!-- YAML
changes:
  - version:
    - v20.0.0
    - v18.17.0
    pr-url: https://github.com/nodejs/node/pull/47339
    description: 已移除对 ICU 的要求。
-->

* `input` {string} 要解析的绝对或相对输入 URL。如果 `input`
  是相对的，则 `base` 是必需的。如果 `input` 是绝对的，则忽略 `base`。如果 `input` 不是字符串，则首先 [转换为字符串][]。
* `base` {string} 如果 `input` 不是
  绝对的，则用于解析的基 URL。如果 `base` 不是字符串，则首先 [转换为字符串][]。

通过相对于 `base` 解析 `input` 创建一个新的 `URL` 对象。如果
`base` 作为字符串传递，它将被解析为等同于 `new URL(base)`。

```js
const myURL = new URL('/foo', 'https://example.org/');
// https://example.org/foo
```

URL 构造函数可作为全局对象上的属性访问。
它也可以从内置的 url 模块导入：

```mjs
import { URL } from 'node:url';
console.log(URL === globalThis.URL); // 打印 'true'。
```

```cjs
console.log(URL === require('node:url').URL); // 打印 'true'。
```

如果 `input` 或 `base` 不是有效的 URL，将抛出
`TypeError`。请注意，将尽力把给定值强制转换为字符串。例如：

```js
const myURL = new URL({ toString: () => 'https://example.org/' });
// https://example.org/
```

出现在 `input` 主机名中的 Unicode 字符将
自动使用 [Punycode][] 算法转换为 ASCII。

```js
const myURL = new URL('https://測試');
// https://xn--g6w251d/
```

在事先不知道 `input` 是否为绝对 URL
且提供了 `base` 的情况下，建议验证
`URL` 对象的 `origin` 是否符合预期。

```js
let myURL = new URL('http://Example.com/', 'https://example.org/');
// http://example.com/

myURL = new URL('https://Example.com/', 'https://example.org/');
// https://example.com/

myURL = new URL('foo://Example.com/', 'https://example.org/');
// foo://Example.com/

myURL = new URL('http:Example.com/', 'https://example.org/');
// http://example.com/

myURL = new URL('https:Example.com/', 'https://example.org/');
// https://example.org/Example.com/

myURL = new URL('foo:Example.com/', 'https://example.org/');
// foo:Example.com/
```

#### `url.hash`

* 类型：{string}

获取和设置 URL 的片段部分。

```js
const myURL = new URL('https://example.org/foo#bar');
console.log(myURL.hash);
// 打印 #bar

myURL.hash = 'baz';
console.log(myURL.href);
// 打印 https://example.org/foo#baz
```

分配给 `hash` 属性的值中包含的无效 URL 字符
将进行 [百分号编码][]。选择哪些字符进行
百分号编码可能与 [`url.parse()`][] 和
[`url.format()`][] 方法产生的结果略有不同。

#### `url.host`

* 类型：{string}

获取和设置 URL 的主机部分。

```js
const myURL = new URL('https://example.org:81/foo');
console.log(myURL.host);
// 打印 example.org:81

myURL.host = 'example.com:82';
console.log(myURL.href);
// 打印 https://example.com:82/foo
```

分配给 `host` 属性的无效主机值将被忽略。

#### `url.hostname`

* 类型：{string}

获取和设置 URL 的主机名部分。`url.host` 和
`url.hostname` 之间的主要区别在于 `url.hostname` _不_ 包括
端口。

```js
const myURL = new URL('https://example.org:81/foo');
console.log(myURL.hostname);
// 打印 example.org

// 设置主机名不会改变端口
myURL.hostname = 'example.com';
console.log(myURL.href);
// 打印 https://example.com:81/foo

// 使用 myURL.host 更改主机名和端口
myURL.host = 'example.org:82';
console.log(myURL.href);
// 打印 https://example.org:82/foo
```

分配给 `hostname` 属性的无效主机名值将被忽略。

#### `url.href`

* 类型：{string}

获取和设置序列化的 URL。

```js
const myURL = new URL('https://example.org/foo');
console.log(myURL.href);
// 打印 https://example.org/foo

myURL.href = 'https://example.com/bar';
console.log(myURL.href);
// 打印 https://example.com/bar
```

获取 `href` 属性的值等同于调用
[`url.toString()`][]。

将此属性的值设置为新值等同于使用 [`new URL(value)`][`new URL()`] 创建一个新的
`URL` 对象。`URL`
对象的每个属性都将被修改。

如果分配给 `href` 属性的值不是有效的 URL，将抛出 `TypeError`。

#### `url.origin`

<!-- YAML
changes:
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/33325
    description: “gopher” 方案不再是特殊方案，`url.origin` 现在会为其返回 `'null'`。
-->

* 类型：{string}

获取 URL 源的只读序列化表示。

```js
const myURL = new URL('https://example.org/foo/bar?baz');
console.log(myURL.origin);
// 打印 https://example.org
```

```js
const idnURL = new URL('https://測試');
console.log(idnURL.origin);
// 打印 https://xn--g6w251d

console.log(idnURL.hostname);
// 打印 xn--g6w251d
```

#### `url.password`

* 类型：{string}

获取和设置 URL 的密码部分。

```js
const myURL = new URL('https://abc:xyz@example.com');
console.log(myURL.password);
// 打印 xyz

myURL.password = '123';
console.log(myURL.href);
// 打印 https://abc:123@example.com/
```

分配给 `password` 属性的值中包含的无效 URL 字符
将进行 [百分号编码][]。选择哪些字符进行
百分号编码可能与 [`url.parse()`][] 和
[`url.format()`][] 方法产生的结果略有不同。

#### `url.pathname`

* 类型：{string}

获取和设置 URL 的路径部分。

```js
const myURL = new URL('https://example.org/abc/xyz?123');
console.log(myURL.pathname);
// 打印 /abc/xyz

myURL.pathname = '/abcdef';
console.log(myURL.href);
// 打印 https://example.org/abcdef?123
```

分配给 `pathname`
属性的值中包含的无效 URL 字符将进行 [百分号编码][]。选择哪些字符
进行百分号编码可能与 [`url.parse()`][] 和
[`url.format()`][] 方法产生的结果略有不同。

#### `url.port`

<!-- YAML
changes:
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/33325
    description: “gopher” 方案不再是特殊方案。
-->

* 类型：{string}

获取和设置 URL 的端口部分。

端口值可以是数字，也可以是包含 `0`
到 `65535`（含）范围内数字的字符串。将值设置为给定 `protocol` 的
`URL` 对象的默认端口将导致 `port` 值变为
空字符串 (`''`)。

端口值可以是空字符串，在这种情况下端口取决于
协议/方案：

| 协议 | 端口 |
| -------- | ---- |
| "ftp"    | 21   |
| "file"   |      |
| "http"   | 80   |
| "https"  | 443  |
| "ws"     | 80   |
| "wss"    | 443  |

给端口赋值时，值将首先使用 `.toString()` 转换为
字符串。

如果该字符串无效但以数字开头，则将前导数字分配给
`port`。
如果数字超出上述表示的范围，则将其忽略。

```js
const myURL = new URL('https://example.org:8888');
console.log(myURL.port);
// 打印 8888

// 默认端口自动转换为空字符串
// (HTTPS 协议的默认端口是 443)
myURL.port = '443';
console.log(myURL.port);
// 打印空字符串
console.log(myURL.href);
// 打印 https://example.org/

myURL.port = 1234;
console.log(myURL.port);
// 打印 1234
console.log(myURL.href);
// 打印 https://example.org:1234/

// 完全无效的端口字符串将被忽略
myURL.port = 'abcd';
console.log(myURL.port);
// 打印 1234

// 前导数字被视为端口号
myURL.port = '5678abcd';
console.log(myURL.port);
// 打印 5678

// 非整数将被截断
myURL.port = 1234.5678;
console.log(myURL.port);
// 打印 1234

// 超出范围且未用科学记数法表示的数字
// 将被忽略。
myURL.port = 1e10; // 10000000000，将如下所述进行范围检查
console.log(myURL.port);
// 打印 1234
```

包含小数点的数字，
例如浮点数或科学记数法中的数字，
不是此规则的例外。
小数点前的前导数字将设置为 URL 的端口，
前提是它们有效：

```js
myURL.port = 4.567e21;
console.log(myURL.port);
// 打印 4（因为它是字符串 '4.567e21' 中的前导数字）
```

#### `url.protocol`

* 类型：{string}

获取和设置 URL 的协议部分。

```js
const myURL = new URL('https://example.org');
console.log(myURL.protocol);
// 打印 https:

myURL.protocol = 'ftp';
console.log(myURL.href);
// 打印 ftp://example.org/
```

分配给 `protocol` 属性的无效 URL 协议值将被忽略。

##### 特殊方案

<!-- YAML
changes:
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/33325
    description: “gopher” 方案不再是特殊方案。
-->

[WHATWG URL 标准][] 认为少数 URL 协议方案在解析和序列化方面是_特殊_的。当使用这些特殊协议之一解析 URL 时，`url.protocol` 属性
可以更改为另一个特殊协议，但不能更改为
非特殊协议，反之亦然。

例如，从 `http` 更改为 `https` 是有效的：

```js
const u = new URL('http://example.org');
u.protocol = 'https';
console.log(u.href);
// https://example.org/
```

但是，从 `http` 更改为假设的 `fish` 协议无效，
因为新协议不是特殊的。

```js
const u = new URL('http://example.org');
u.protocol = 'fish';
console.log(u.href);
// http://example.org/
```

同样，也不允许从非特殊协议更改为特殊协议：

```js
const u = new URL('fish://example.org');
u.protocol = 'http';
console.log(u.href);
// fish://example.org
```

根据 WHATWG URL 标准，特殊协议方案是 `ftp`、
`file`、`http`、`https`、`ws` 和 `wss`。

#### `url.search`

* 类型：{string}

获取和设置 URL 的序列化查询部分。

```js
const myURL = new URL('https://example.org/abc?123');
console.log(myURL.search);
// 打印 ?123

myURL.search = 'abc=xyz';
console.log(myURL.href);
// 打印 https://example.org/abc?abc=xyz
```

分配给 `search`
属性的值中出现的任何无效 URL 字符都将进行 [百分号编码][]。选择哪些
字符进行百分号编码可能与 [`url.parse()`][]
和 [`url.format()`][] 方法产生的结果略有不同。

#### `url.searchParams`

* 类型：{URLSearchParams}

获取表示 URL 查询参数的 [`URLSearchParams`][] 对象。此属性是只读的，但它提供的 `URLSearchParams` 对象
可用于突变 URL 实例；要替换 URL 的整个查询
参数，请使用 [`url.search`][] 设置器。详见
[`URLSearchParams`][] 文档。

使用 `.searchParams` 修改 `URL` 时要小心，因为
根据 WHATWG 规范，`URLSearchParams` 对象使用
不同的规则来确定哪些字符进行百分号编码。例
如，`URL` 对象不会对 ASCII 波浪号 (`~`)
字符进行百分号编码，而 `URLSearchParams` 将始终对其进行编码：

```js
const myURL = new URL('https://example.org/abc?foo=~bar');

console.log(myURL.search);  // 打印 ?foo=~bar

// 通过 searchParams 修改 URL...
myURL.searchParams.sort();

console.log(myURL.search);  // 打印 ?foo=%7Ebar
```

#### `url.username`

* 类型：{string}

获取和设置 URL 的用户名部分。

```js
const myURL = new URL('https://abc:xyz@example.com');
console.log(myURL.username);
// 打印 abc

myURL.username = '123';
console.log(myURL.href);
// 打印 https://123:xyz@example.com/
```

分配给 `username`
属性的值中出现的任何无效 URL 字符都将进行 [百分号编码][]。选择哪些
字符进行百分号编码可能与 [`url.parse()`][]
和 [`url.format()`][] 方法产生的结果略有不同。

#### `url.toString()`

* 返回：{string}

`URL` 对象上的 `toString()` 方法返回序列化的 URL。返回
的值等同于 [`url.href`][] 和 [`url.toJSON()`][] 的值。

#### `url.toJSON()`

<!-- YAML
added:
  - v7.7.0
  - v6.13.0
-->

* 返回：{string}

`URL` 对象上的 `toJSON()` 方法返回序列化的 URL。返回
的值等同于 [`url.href`][] 和
[`url.toString()`][] 的值。

当 `URL` 对象使用 [`JSON.stringify()`][] 序列化时，
此方法会自动调用。

```js
const myURLs = [
  new URL('https://www.example.com'),
  new URL('https://test.example.org'),
];
console.log(JSON.stringify(myURLs));
// 打印 ["https://www.example.com/","https://test.example.org/"]
```

#### `URL.createObjectURL(blob)`

<!-- YAML
added: v16.7.0
changes:
 - version:
    - v24.0.0
    - v22.17.0
   pr-url: https://github.com/nodejs/node/pull/57513
   description: 将该 API 标记为稳定。
-->

* `blob` {Blob}
* 返回：{string}

创建一个表示给定 {Blob} 对象的 `'blob:nodedata:...'` URL 字符串，
可用于稍后检索 `Blob`。

```js
const {
  Blob,
  resolveObjectURL,
} = require('node:buffer');

const blob = new Blob(['hello']);
const id = URL.createObjectURL(blob);

// 稍后...

const otherBlob = resolveObjectURL(id);
console.log(otherBlob.size);
```

注册的 {Blob} 存储的数据将保留在内存中，直到
调用 `URL.revokeObjectURL()` 将其移除。

`Blob` 对象在当前线程内注册。如果使用 Worker
线程，在一个 Worker 内注册的 `Blob` 对象将不可用于
其他 worker 或主线程。

#### `URL.revokeObjectURL(id)`

<!-- YAML
added: v16.7.0
changes:
 - version:
    - v24.0.0
    - v22.17.0
   pr-url: https://github.com/nodejs/node/pull/57513
   description: 将该 API 标记为稳定。
-->

* `id` {string} 先前调用
  `URL.createObjectURL()` 返回的 `'blob:nodedata:...` URL 字符串。

移除由给定 ID 标识的存储的 {Blob}。尝试撤销未注册的
ID 将静默失败。

#### `URL.canParse(input[, base])`

<!-- YAML
added:
  - v19.9.0
  - v18.17.0
-->

* `input` {string} 要解析的绝对或相对输入 URL。如果 `input`
  是相对的，则 `base` 是必需的。如果 `input` 是绝对的，则忽略 `base`。如果 `input` 不是字符串，则首先 [转换为字符串][]。
* `base` {string} 如果 `input` 不是
  绝对的，则用于解析的基 URL。如果 `base` 不是字符串，则首先 [转换为字符串][]。
* 返回：{boolean}

检查相对于 `base` 的 `input` 是否可以解析为 `URL`。

```js
const isValid = URL.canParse('/foo', 'https://example.org/'); // true

const isNotValid = URL.canParse('/foo'); // false
```

#### `URL.parse(input[, base])`

<!-- YAML
added: v22.1.0
-->

* `input` {string} 要解析的绝对或相对输入 URL。如果 `input`
  是相对的，则 `base` 是必需的。如果 `input` 是绝对的，则忽略 `base`。如果 `input` 不是字符串，则首先 [转换为字符串][]。
* `base` {string} 如果 `input` 不是
  绝对的，则用于解析的基 URL。如果 `base` 不是字符串，则首先 [转换为字符串][]。
* 返回：{URL|null}

将字符串解析为 URL。如果提供了 `base`，它将用作解析非绝对 `input` URL 的基
URL。如果参数无法解析为有效的 URL，则返回 `null`。

### 类：`URLPattern`

<!-- YAML
added: v23.8.0
-->

> 稳定性：1 - 实验性

`URLPattern` API 提供一个接口，用于根据模式匹配 URL 或 URL 的部分。

```js
const myPattern = new URLPattern('https://nodejs.org/docs/latest/api/*.html');
console.log(myPattern.exec('https://nodejs.org/docs/latest/api/dns.html'));
// 打印：
// {
//  "hash": { "groups": {  "0": "" },  "input": "" },
//  "hostname": { "groups": {}, "input": "nodejs.org" },
//  "inputs": [
//    "https://nodejs.org/docs/latest/api/dns.html"
//  ],
//  "password": { "groups": {  "0": "" }, "input": "" },
//  "pathname": { "groups": {  "0": "dns" }, "input": "/docs/latest/api/dns.html" },
//  "port": { "groups": {}, "input": "" },
//  "protocol": { "groups": {}, "input": "https" },
//  "search": { "groups": {  "0": "" }, "input": "" },
//  "username": { "groups": {  "0": "" }, "input": "" }
// }

console.log(myPattern.test('https://nodejs.org/docs/latest/api/dns.html'));
// 打印：true
```

#### `new URLPattern()`

实例化一个新的空 `URLPattern` 对象。

#### `new URLPattern(string[, baseURL][, options])`

* `string` {string} 一个 URL 字符串
* `baseURL` {string | undefined} 一个基 URL 字符串
* `options` {Object} 选项

将 `string` 解析为 URL，并使用它实例化一个新的
`URLPattern` 对象。

如果未指定 `baseURL`，则默认为 `undefined`。

选项可以具有 `ignoreCase` 布尔属性，如果设置为 true，则启用
不区分大小写的匹配。

构造函数可以抛出 `TypeError` 以指示解析失败。

#### `new URLPattern(obj[, baseURL][, options])`

* `obj` {Object} 一个输入模式
* `baseURL` {string | undefined} 一个基 URL 字符串
* `options` {Object} 选项

将 `Object` 解析为输入模式，并使用它实例化一个新的
`URLPattern` 对象。对象成员可以是 `protocol`、`username`、
`password`、`hostname`、`port`、`pathname`、`search`、`hash` 或 `baseURL` 中的任何一项。

如果未指定 `baseURL`，则默认为 `undefined`。

选项可以具有 `ignoreCase` 布尔属性，如果设置为 true，则启用
不区分大小写的匹配。

构造函数可以抛出 `TypeError` 以指示解析失败。

#### `urlPattern.exec(input[, baseURL])`

* `input` {string | Object} 一个 URL 或 URL 部分
* `baseURL` {string | undefined} 一个基 URL 字符串

输入可以是字符串或提供各个 URL 部分的对象。对象
成员可以是 `protocol`、`username`、`password`、`hostname`、
`port`、`pathname`、`search`、`hash` 或 `baseURL` 中的任何一项。

如果未指定 `baseURL`，则默认为 `undefined`。

返回一个对象，其中包含一个 `inputs` 键，该键包含传递给函数的参数数组，以及 URL 组件的键，其中包含匹配的
输入和匹配的组。

```js
const myPattern = new URLPattern('https://nodejs.org/docs/latest/api/*.html');
console.log(myPattern.exec('https://nodejs.org/docs/latest/api/dns.html'));
// 打印：
// {
//  "hash": { "groups": {  "0": "" },  "input": "" },
//  "hostname": { "groups": {}, "input": "nodejs.org" },
//  "inputs": [
//    "https://nodejs.org/docs/latest/api/dns.html"
//  ],
//  "password": { "groups": {  "0": "" }, "input": "" },
//  "pathname": { "groups": {  "0": "dns" }, "input": "/docs/latest/api/dns.html" },
//  "port": { "groups": {}, "input": "" },
//  "protocol": { "groups": {}, "input": "https" },
//  "search": { "groups": {  "0": "" }, "input": "" },
//  "username": { "groups": {  "0": "" }, "input": "" }
// }
```

#### `urlPattern.test(input[, baseURL])`

* `input` {string | Object} 一个 URL 或 URL 部分
* `baseURL` {string | undefined} 一个基 URL 字符串
* 返回值 {boolean}

输入可以是字符串或提供各个 URL 部分的对象。对象
成员可以是 `protocol`、`username`、`password`、`hostname`、
`port`、`pathname`、`search`、`hash` 或 `baseURL` 中的任何一项。

如果未指定 `baseURL`，则默认为 `undefined`。

返回一个布尔值，指示输入是否匹配当前模式。

```js
const myPattern = new URLPattern('https://nodejs.org/docs/latest/api/*.html');
console.log(myPattern.test('https://nodejs.org/docs/latest/api/dns.html'));
// 打印：true
```

### 类：`URLSearchParams`

<!-- YAML
added:
  - v7.5.0
  - v6.13.0
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18281
    description: 该类现在可在全局对象上使用。
-->

`URLSearchParams` API 提供对 `URL` 查询的读写访问。`URLSearchParams` 类也可以独立使用，具有以下
四种构造函数之一。
`URLSearchParams` 类也可在全局对象上使用。

WHATWG `URLSearchParams` 接口和 [`querystring`][] 模块具有
相似的目的，但 [`querystring`][] 模块的目的更
通用，因为它允许自定义分隔符字符（`&` 和 `=`）。
另一方面，此 API 专为 URL 查询字符串设计。

```js
const myURL = new URL('https://example.org/?abc=123');
console.log(myURL.searchParams.get('abc'));
// 打印 123

myURL.searchParams.append('abc', 'xyz');
console.log(myURL.href);
// 打印 https://example.org/?abc=123&abc=xyz

myURL.searchParams.delete('abc');
myURL.searchParams.set('a', 'b');
console.log(myURL.href);
// 打印 https://example.org/?a=b

const newSearchParams = new URLSearchParams(myURL.searchParams);
// 上面等同于
// const newSearchParams = new URLSearchParams(myURL.search);

newSearchParams.append('a', 'c');
console.log(myURL.href);
// 打印 https://example.org/?a=b
console.log(newSearchParams.toString());
// 打印 a=b&a=c

// newSearchParams.toString() 被隐式调用
myURL.search = newSearchParams;
console.log(myURL.href);
// 打印 https://example.org/?a=b&a=c
newSearchParams.delete('a');
console.log(myURL.href);
// 打印 https://example.org/?a=b&a=c
```

#### `new URLSearchParams()`

实例化一个新的空 `URLSearchParams` 对象。

#### `new URLSearchParams(string)`

* `string` {string} 一个查询字符串

将 `string` 解析为查询字符串，并使用它实例化一个新的
`URLSearchParams` 对象。如果存在前导 `'?'`，则将其忽略。

```js
let params;

params = new URLSearchParams('user=abc&query=xyz');
console.log(params.get('user'));
// 打印 'abc'
console.log(params.toString());
// 打印 'user=abc&query=xyz'

params = new URLSearchParams('?user=abc&query=xyz');
console.log(params.toString());
// 打印 'user=abc&query=xyz'
```

#### `new URLSearchParams(obj)`

<!-- YAML
added:
  - v7.10.0
  - v6.13.0
-->

* `obj` {Object} 一个表示键值对集合的对象

使用查询哈希映射实例化一个新的 `URLSearchParams` 对象。`obj` 的每个属性的键和
值始终被强制转换为字符串。

与 [`querystring`][] 模块不同，不允许使用数组值形式的重复键。数组使用 [`array.toString()`][] 进行字符串化，该函数简单地
用逗号连接所有数组元素。

```js
const params = new URLSearchParams({
  user: 'abc',
  query: ['first', 'second'],
});
console.log(params.getAll('query'));
// 打印 [ 'first,second' ]
console.log(params.toString());
// 打印 'user=abc&query=first%2Csecond'
```

#### `new URLSearchParams(iterable)`

<!-- YAML
added:
  - v7.10.0
  - v6.13.0
-->

* `iterable` {Iterable} 一个元素为键值对的可迭代对象

以类似于 {Map} 构造函数的方法使用可迭代映射实例化一个新的 `URLSearchParams` 对象。`iterable` 可以是 `Array` 或任何
可迭代对象。这意味着 `iterable` 可以是另一个 `URLSearchParams`，在
这种情况下，构造函数将简单地创建提供的
`URLSearchParams` 的克隆。`iterable` 的元素是键值对，并且
它们本身可以是任何可迭代对象。

允许重复键。

```js
let params;

// 使用数组
params = new URLSearchParams([
  ['user', 'abc'],
  ['query', 'first'],
  ['query', 'second'],
]);
console.log(params.toString());
// 打印 'user=abc&query=first&query=second'

// 使用 Map 对象
const map = new Map();
map.set('user', 'abc');
map.set('query', 'xyz');
params = new URLSearchParams(map);
console.log(params.toString());
// 打印 'user=abc&query=xyz'

// 使用生成器函数
function* getQueryPairs() {
  yield ['user', 'abc'];
  yield ['query', 'first'];
  yield ['query', 'second'];
}
params = new URLSearchParams(getQueryPairs());
console.log(params.toString());
// 打印 'user=abc&query=first&query=second'

// 每个键值对必须正好有两个元素
new URLSearchParams([
  ['user', 'abc', 'error'],
]);
// 抛出 TypeError [ERR_INVALID_TUPLE]:
//        每个查询对必须是可迭代的 [name, value] 元组
```

#### `urlSearchParams.append(name, value)`

* `name` {string}
* `value` {string}

将新的名称 - 值对附加到查询字符串。

#### `urlSearchParams.delete(name[, value])`

<!-- YAML
changes:
  - version:
      - v20.2.0
      - v18.18.0
    pr-url: https://github.com/nodejs/node/pull/47885
    description: "增加对可选 `value` 参数的支持。"
-->

* `name` {string}
* `value` {string}

如果提供了 `value`，则移除所有名称为 `name` 且值为 `value` 的名称 - 值对。

如果未提供 `value`，则移除所有名称为 `name` 的名称 - 值对。

#### `urlSearchParams.entries()`

* 返回：{Iterator}

返回一个 ES6 `Iterator`，遍历查询中的每个名称 - 值对。迭代器的每个项都是一个 JavaScript `Array`。`Array` 的第一项是
`name`，`Array` 的第二项是 `value`。

[`urlSearchParams[Symbol.iterator]()`][`urlSearchParamsSymbol.iterator()`] 的别名。

#### `urlSearchParams.forEach(fn[, thisArg])`

<!-- YAML
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `fn` 参数传入无效回调现在会抛出 `ERR_INVALID_ARG_TYPE`，而不是 `ERR_INVALID_CALLBACK`。"
-->

* `fn` {Function} 为查询中的每个名称 - 值对调用
* `thisArg` {Object} 当调用 `fn` 时用作 `this` 值

遍历查询中的每个名称 - 值对并调用给定函数。

```js
const myURL = new URL('https://example.org/?a=b&c=d');
myURL.searchParams.forEach((value, name, searchParams) => {
  console.log(name, value, myURL.searchParams === searchParams);
});
// 打印：
//   a b true
//   c d true
```

#### `urlSearchParams.get(name)`

* `name` {string}
* 返回：{string | null} 一个字符串，如果没有具有给定 `name` 的名称 - 值对，则为 `null`。

返回名称为 `name` 的第一个名称 - 值对的值。如果没有
这样的对，则返回 `null`。

#### `urlSearchParams.getAll(name)`

* `name` {string}
* 返回：{string\[]}

返回名称为 `name` 的所有名称 - 值对的值。如果没有
这样的对，则返回一个空数组。

#### `urlSearchParams.has(name[, value])`

<!-- YAML
changes:
  - version:
      - v20.2.0
      - v18.18.0
    pr-url: https://github.com/nodejs/node/pull/47885
    description: "增加对可选 `value` 参数的支持。"
-->

* `name` {string}
* `value` {string}
* 返回：{boolean}

检查 `URLSearchParams` 对象是否包含基于
`name` 和可选 `value` 参数的键值对。

如果提供了 `value`，当存在具有相同
`name` 和 `value` 的名称 - 值对时，返回 `true`。

如果未提供 `value`，如果存在至少一个名称为 `name` 的名称 - 值
对，则返回 `true`。

#### `urlSearchParams.keys()`

* 返回：{Iterator}

返回一个 ES6 `Iterator`，遍历每个名称 - 值对的名称。

```js
const params = new URLSearchParams('foo=bar&foo=baz');
for (const name of params.keys()) {
  console.log(name);
}
// 打印：
//   foo
//   foo
```

#### `urlSearchParams.set(name, value)`

* `name` {string}
* `value` {string}

将 `URLSearchParams` 对象中与 `name` 关联的值设置为
`value`。如果存在任何名称为 `name` 的现有名称 - 值对，
则将第一个这样的对的值设置为 `value` 并移除所有其他对。如果不存在，
则将名称 - 值对附加到查询字符串。

```js
const params = new URLSearchParams();
params.append('foo', 'bar');
params.append('foo', 'baz');
params.append('abc', 'def');
console.log(params.toString());
// 打印 foo=bar&foo=baz&abc=def

params.set('foo', 'def');
params.set('xyz', 'opq');
console.log(params.toString());
// 打印 foo=def&abc=def&xyz=opq
```

#### `urlSearchParams.size`

<!-- YAML
added:
 - v19.8.0
 - v18.16.0
-->

参数条目的总数。

#### `urlSearchParams.sort()`

<!-- YAML
added:
  - v7.7.0
  - v6.13.0
-->

就地按其名称对所有现有名称 - 值对进行排序。排序使用
[稳定排序算法][] 完成，因此具有相同名称的名称 - 值对
之间的相对顺序保持不变。

此方法特别可用于增加缓存命中率。

```js
const params = new URLSearchParams('query[]=abc&type=search&query[]=123');
params.sort();
console.log(params.toString());
// 打印 query%5B%5D=abc&query%5B%5D=123&type=search
```

#### `urlSearchParams.toString()`

* 返回：{string}

返回序列化为字符串的搜索参数，必要时对字符
进行百分号编码。

#### `urlSearchParams.values()`

* 返回：{Iterator}

返回一个 ES6 `Iterator`，遍历每个名称 - 值对的值。

#### `urlSearchParams[Symbol.iterator]()`

* 返回：{Iterator}

返回一个 ES6 `Iterator`，遍历查询字符串中的每个名称 - 值对。迭代器的每个项都是一个 JavaScript `Array`。`Array` 的第一项是
`name`，`Array` 的第二项是 `value`。

[`urlSearchParams.entries()`][] 的别名。

```js
const params = new URLSearchParams('foo=bar&xyz=baz');
for (const [name, value] of params) {
  console.log(name, value);
}
// 打印：
//   foo bar
//   xyz baz
```

### `url.domainToASCII(domain)`

<!-- YAML
added:
  - v7.4.0
  - v6.13.0
changes:
  - version:
    - v20.0.0
    - v18.17.0
    pr-url: https://github.com/nodejs/node/pull/47339
    description: 已移除对 ICU 的要求。
-->

* `domain` {string}
* 返回：{string}

返回 `domain` 的 [Punycode][] ASCII 序列化。如果 `domain` 是
无效的域，则返回空字符串。

它执行与 [`url.domainToUnicode()`][] 相反的操作。

```mjs
import url from 'node:url';

console.log(url.domainToASCII('español.com'));
// 打印 xn--espaol-zwa.com
console.log(url.domainToASCII('中文.com'));
// 打印 xn--fiq228c.com
console.log(url.domainToASCII('xn--iñvalid.com'));
// 打印空字符串
```

```cjs
const url = require('node:url');

console.log(url.domainToASCII('español.com'));
// 打印 xn--espaol-zwa.com
console.log(url.domainToASCII('中文.com'));
// 打印 xn--fiq228c.com
console.log(url.domainToASCII('xn--iñvalid.com'));
// 打印空字符串
```

### `url.domainToUnicode(domain)`

<!-- YAML
added:
  - v7.4.0
  - v6.13.0
changes:
  - version:
    - v20.0.0
    - v18.17.0
    pr-url: https://github.com/nodejs/node/pull/47339
    description: 已移除 ICU 要求。
-->

* `domain` {string}
* 返回：{string}

返回 `domain` 的 Unicode 序列化。如果 `domain` 是无效的
域，则返回空字符串。

它执行与 [`url.domainToASCII()`][] 相反的操作。

```mjs
import url from 'node:url';

console.log(url.domainToUnicode('xn--espaol-zwa.com'));
// 打印 español.com
console.log(url.domainToUnicode('xn--fiq228c.com'));
// 打印 中文.com
console.log(url.domainToUnicode('xn--iñvalid.com'));
// 打印空字符串
```

```cjs
const url = require('node:url');

console.log(url.domainToUnicode('xn--espaol-zwa.com'));
// 打印 español.com
console.log(url.domainToUnicode('xn--fiq228c.com'));
// 打印 中文.com
console.log(url.domainToUnicode('xn--iñvalid.com'));
// 打印空字符串
```

### `url.fileURLToPath(url[, options])`

<!-- YAML
added: v10.12.0
changes:
  - version:
    - v22.1.0
    - v20.13.0
    pr-url: https://github.com/nodejs/node/pull/52509
    description: "`options` 参数现在可用于确定如何解析 `path` 参数。"
-->

* `url` {URL | string} 要转换为路径的文件 URL 字符串或 URL 对象。
* `options` {Object}
  * `windows` {boolean|undefined} 如果 `path` 应该
    作为 Windows 文件路径返回，则为 `true`，如果是 POSIX，则为 `false`，
    如果是系统默认值，则为 `undefined`。
    **默认值：** `undefined`。
* 返回：{string} 完全解析的特定于平台的 Node.js 文件路径。

此函数确保正确解码百分号编码的字符，并
确保跨平台有效的绝对路径字符串。

**安全注意事项：**

此函数解码百分号编码的字符，包括编码的点段
（`%2e` 作为 `.` 和 `%2e%2e` 作为 `..`），然后规范化结果路径。
这意味着编码的目录遍历序列（例如 `%2e%2e`）被
解码并作为实际路径遍历处理，即使编码的斜杠
（`%2F`、`%5C`）被正确拒绝。

**应用程序不得仅依赖 `fileURLToPath()` 来防止目录
遍历攻击。** 在使用返回的路径值进行文件系统操作之前，
始终对返回的路径值执行显式路径验证和安全检查，
以确保它保持在预期边界内。

```mjs
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);

new URL('file:///C:/path/').pathname;      // 不正确：/C:/path/
fileURLToPath('file:///C:/path/');         // 正确：C:\path\ (Windows)

new URL('file://nas/foo.txt').pathname;    // 不正确：/foo.txt
fileURLToPath('file://nas/foo.txt');       // 正确：\\nas\foo.txt (Windows)

new URL('file:///你好.txt').pathname;      // 不正确：/%E4%BD%A0%E5%A5%BD.txt
fileURLToPath('file:///你好.txt');         // 正确：/你好.txt (POSIX)

new URL('file:///hello world').pathname;   // 不正确：/hello%20world
fileURLToPath('file:///hello world');      // 正确：/hello world (POSIX)
```

```cjs
const { fileURLToPath } = require('node:url');
new URL('file:///C:/path/').pathname;      // 不正确：/C:/path/
fileURLToPath('file:///C:/path/');         // 正确：C:\path\ (Windows)

new URL('file://nas/foo.txt').pathname;    // 不正确：/foo.txt
fileURLToPath('file://nas/foo.txt');       // 正确：\\nas\foo.txt (Windows)

new URL('file:///你好.txt').pathname;      // 不正确：/%E4%BD%A0%E5%A5%BD.txt
fileURLToPath('file:///你好.txt');         // 正确：/你好.txt (POSIX)

new URL('file:///hello world').pathname;   // 不正确：/hello%20world
fileURLToPath('file:///hello world');      // 正确：/hello world (POSIX)
```

### `url.fileURLToPathBuffer(url[, options])`

<!--
added:
 - v24.3.0
 - v22.18.0
-->

* `url` {URL | string} 要转换为路径的文件 URL 字符串或 URL 对象。
* `options` {Object}
  * `windows` {boolean|undefined} 如果 `path` 应该
    作为 Windows 文件路径返回，则为 `true`，如果是 POSIX 则为 `false`，
    如果是系统默认值则为 `undefined`。
    **默认值：** `undefined`。
* 返回：{Buffer} 完全解析的特定于平台的 Node.js 文件路径
  作为 {Buffer}。

类似于 `url.fileURLToPath(...)`，不同之处在于它返回路径的
`Buffer` 而不是字符串表示。当输入 URL 包含
不是有效 UTF-8 / Unicode 序列的百分号编码段时，此转换
很有用。

**安全注意事项：**

此函数具有与 [`url.fileURLToPath()`][] 相同的安全注意事项。
它解码百分号编码的字符，包括编码的点段
（`%2e` 作为 `.` 和 `%2e%2e` 作为 `..`），并规范化路径。**应用程序
不得仅依赖此函数来防止目录遍历攻击。**
在使用返回的 buffer 值进行文件系统操作之前，
始终对返回的 buffer 值执行显式路径验证。

### `url.format(URL[, options])`

<!-- YAML
added: v7.6.0
-->

* `URL` {URL} 一个 [WHATWG URL][] 对象
* `options` {Object}
  * `auth` {boolean} 如果序列化的 URL 字符串应包含
    用户名和密码，则为 `true`，否则为 `false`。**默认值：** `true`。
  * `fragment` {boolean} 如果序列化的 URL 字符串应包含
    片段，则为 `true`，否则为 `false`。**默认值：** `true`。
  * `search` {boolean} 如果序列化的 URL 字符串应包含
    搜索查询，则为 `true`，否则为 `false`。**默认值：** `true`。
  * `unicode` {boolean} 如果 URL 字符串主机
    组件中出现的 Unicode 字符应直接编码而不是
    进行 Punycode 编码，则为 `true`。**默认值：** `false`。
* 返回：{string}

返回 [WHATWG URL][] 对象的 URL `String` 表示的可自定义序列化。

URL 对象具有 `toString()` 方法和 `href` 属性，它们返回
URL 的字符串序列化。然而，这些在任何方面都不可自定义。
`url.format(URL[, options])` 方法允许对输出进行基本自定义。

```mjs
import url from 'node:url';
const myURL = new URL('https://a:b@測試？abc#foo');

console.log(myURL.href);
// 打印 https://a:b@xn--g6w251d/?abc#foo

console.log(myURL.toString());
// 打印 https://a:b@xn--g6w251d/?abc#foo

console.log(url.format(myURL, { fragment: false, unicode: true, auth: false }));
// 打印 'https://測試/?abc'
```

```cjs
const url = require('node:url');
const myURL = new URL('https://a:b@測試？abc#foo');

console.log(myURL.href);
// 打印 https://a:b@xn--g6w251d/?abc#foo

console.log(myURL.toString());
// 打印 https://a:b@xn--g6w251d/?abc#foo

console.log(url.format(myURL, { fragment: false, unicode: true, auth: false }));
// 打印 'https://測試/?abc'
```

### `url.pathToFileURL(path[, options])`

<!-- YAML
added: v10.12.0
changes:
  - version:
    - v22.1.0
    - v20.13.0
    pr-url: https://github.com/nodejs/node/pull/52509
    description: "`options` 参数现在可用于确定如何返回 `path` 值。"
-->

* `path` {string} 要转换为文件 URL 的路径。
* `options` {Object}
  * `windows` {boolean|undefined} 如果 `path` 应该
    被视为 Windows 文件路径，则为 `true`，如果是 POSIX 则为 `false`，
    如果是系统默认值则为 `undefined`。
    **默认值：** `undefined`。
* 返回：{URL} 文件 URL 对象。

此函数确保 `path` 被绝对解析，并且在转换为文件 URL 时
正确编码 URL 控制字符。

```mjs
import { pathToFileURL } from 'node:url';

new URL('/foo#1', 'file:');           // 不正确：file:///foo#1
pathToFileURL('/foo#1');              // 正确：file:///foo%231 (POSIX)

new URL('/some/path%.c', 'file:');    // 不正确：file:///some/path%.c
pathToFileURL('/some/path%.c');       // 正确：file:///some/path%25.c (POSIX)
```

```cjs
const { pathToFileURL } = require('node:url');
new URL(__filename);                  // 不正确：抛出 (POSIX)
new URL(__filename);                  // 不正确：C:\... (Windows)
pathToFileURL(__filename);            // 正确：file:///... (POSIX)
pathToFileURL(__filename);            // 正确：file:///C:/... (Windows)

new URL('/foo#1', 'file:');           // 不正确：file:///foo#1
pathToFileURL('/foo#1');              // 正确：file:///foo%231 (POSIX)

new URL('/some/path%.c', 'file:');    // 不正确：file:///some/path%.c
pathToFileURL('/some/path%.c');       // 正确：file:///some/path%25.c (POSIX)
```

### `url.urlToHttpOptions(url)`

<!-- YAML
added:
  - v15.7.0
  - v14.18.0
changes:
  - version:
    - v19.9.0
    - v18.17.0
    pr-url: https://github.com/nodejs/node/pull/46989
    description: "返回的对象还将包含 `url` 参数的所有自有可枚举属性。"
-->

* `url` {URL} 要转换为选项对象的 [WHATWG URL][] 对象。
* 返回：{Object} 选项对象
  * `protocol` {string} 要使用的协议。
  * `hostname` {string} 发出请求的服务器的域名或 IP 地址。
  * `hash` {string} URL 的片段部分。
  * `search` {string} URL 的序列化查询部分。
  * `pathname` {string} URL 的路径部分。
  * `path` {string} 请求路径。如果有的话，应包括查询字符串。
    例如 `'/index.html?page=12'`。当请求路径
    包含非法字符时会抛出异常。目前，只拒绝空格，但这
    将来可能会改变。
  * `href` {string} 序列化的 URL。
  * `port` {number} 远程服务器的端口。
  * `auth` {string} 基本认证，即 `'user:password'`，用于计算
    Authorization 头。

此实用函数将 URL 对象转换为 [`http.request()`][] 和 [`https.request()`][] API 预期的普通选项对象。

```mjs
import { urlToHttpOptions } from 'node:url';
const myURL = new URL('https://a:b@測試？abc#foo');

console.log(urlToHttpOptions(myURL));
/*
{
  protocol: 'https:',
  hostname: 'xn--g6w251d',
  hash: '#foo',
  search: '?abc',
  pathname: '/',
  path: '/?abc',
  href: 'https://a:b@xn--g6w251d/?abc#foo',
  auth: 'a:b'
}
*/
```

```cjs
const { urlToHttpOptions } = require('node:url');
const myURL = new URL('https://a:b@測試？abc#foo');

console.log(urlToHttpOptions(myURL));
/*
{
  protocol: 'https:',
  hostname: 'xn--g6w251d',
  hash: '#foo',
  search: '?abc',
  pathname: '/',
  path: '/?abc',
  href: 'https://a:b@xn--g6w251d/?abc#foo',
  auth: 'a:b'
}
*/
```

## 旧版 URL API

<!-- YAML
changes:
  - version:
      - v15.13.0
      - v14.17.0
    pr-url: https://github.com/nodejs/node/pull/37784
    description: 弃用已撤销。状态更改为“旧版”。
  - version: v11.0.0
    pr-url: https://github.com/nodejs/node/pull/22715
    description: 此 API 已弃用。
-->

> 稳定性：3 - 旧版：请改用 WHATWG URL API。

### 旧版 `urlObject`

<!-- YAML
changes:
  - version:
      - v15.13.0
      - v14.17.0
    pr-url: https://github.com/nodejs/node/pull/37784
    description: 弃用已撤销。状态更改为“旧版”。
  - version: v11.0.0
    pr-url: https://github.com/nodejs/node/pull/22715
    description: 旧版 URL API 已弃用。请改用 WHATWG URL API。
-->

旧版 `urlObject`（`require('node:url').Url` 或 `import { Url } from 'node:url'`）由 `url.parse()` 函数创建并返回。

#### `urlObject.auth`

`auth` 属性是 URL 的用户名和密码部分，也称为 _用户信息_。此字符串子集跟随 `protocol` 和双斜杠（如果存在）之后，并在 `host` 组件之前，由 `@` 分隔。该字符串要么是用户名，要么是由 `:` 分隔的用户名和密码。

例如：`'user:pass'`。

#### `urlObject.hash`

`hash` 属性是 URL 的片段标识符部分，包括前导 `#` 字符。

例如：`'#hash'`。

#### `urlObject.host`

`host` 属性是 URL 的完整小写主机部分，包括指定的 `port`（如果存在）。

例如：`'sub.example.com:8080'`。

#### `urlObject.hostname`

`hostname` 属性是 `host` 组件的小写主机名部分，_不包含_ `port`。

例如：`'sub.example.com'`。

#### `urlObject.href`

`href` 属性是完整的 URL 字符串，解析时 `protocol` 和 `host` 组件已转换为小写。

例如：`'http://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash'`。

#### `urlObject.path`

`path` 属性是 `pathname` 和 `search` 组件的连接。

例如：`'/p/a/t/h?query=string'`。

不对 `path` 进行解码。

#### `urlObject.pathname`

`pathname` 属性由 URL 的整个路径部分组成。这是跟随 `host`（包括 `port`）之后且在 `query` 或 `hash` 组件开始之前的所有内容，由 ASCII 问号（`?`）或哈希（`#`）字符分隔。

例如：`'/p/a/t/h'`。

不对路径字符串进行解码。

#### `urlObject.port`

`port` 属性是 `host` 组件的数字端口部分。

例如：`'8080'`。

#### `urlObject.protocol`

`protocol` 属性标识 URL 的小写协议方案。

例如：`'http:'`。

#### `urlObject.query`

`query` 属性要么是不带前导 ASCII 问号（`?`）的查询字符串，要么是由 [`querystring`][] 模块的 `parse()` 方法返回的对象。`query` 属性是字符串还是对象取决于传递给 `url.parse()` 的 `parseQueryString` 参数。

例如：`'query=string'` 或 `{'query': 'string'}`。

如果作为字符串返回，则不对查询字符串进行解码。如果作为对象返回，则键和值都会被解码。

#### `urlObject.search`

`search` 属性由 URL 的整个“查询字符串”部分组成，包括前导 ASCII 问号（`?`）字符。

例如：`'?query=string'`。

不对查询字符串进行解码。

#### `urlObject.slashes`

如果 `protocol` 中的冒号后面需要两个 ASCII 正斜杠字符（`/`），则 `slashes` 属性是一个值为 `true` 的布尔值。

### `url.format(urlObject)`

<!-- YAML
added: v0.1.25
changes:
  - version: v17.0.0
    pr-url: https://github.com/nodejs/node/pull/38631
    description: "现在当主机名的 Punycode 转换引入可能导致 URL 被不同地重新解析的更改时，会抛出 `ERR_INVALID_URL` 异常。"
  - version:
      - v15.13.0
      - v14.17.0
    pr-url: https://github.com/nodejs/node/pull/37784
    description: 弃用已撤销。状态更改为“旧版”。
  - version: v11.0.0
    pr-url: https://github.com/nodejs/node/pull/22715
    description: 旧版 URL API 已弃用。请改用 WHATWG URL API。
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7234
    description: "带有 `file:` 方案的 URL 现在将始终使用正确数量的斜杠，无论 `slashes` 选项如何。不带协议且 `slashes` 选项为假值的情况现在也始终受到尊重。"
-->

* `urlObject` {Object} URL 对象（由 `url.parse()` 返回或以其他方式构造）。
* 返回值：{string}

`url.format()` 方法返回源自 `urlObject` 的格式化 URL 字符串。

```js
const url = require('node:url');
url.format({
  protocol: 'https',
  hostname: 'example.com',
  pathname: '/some/path',
  query: {
    page: 1,
    format: 'json',
  },
});

// => 'https://example.com/some/path?page=1&format=json'
```

如果 `urlObject` 不是对象或字符串，`url.format()` 将抛出 [`TypeError`][]。

格式化过程操作如下：

* 创建一个新的空字符串 `result`。
* 如果 `urlObject.protocol` 是字符串，则按原样附加到 `result`。
* 否则，如果 `urlObject.protocol` 不是 `undefined` 且不是字符串，则抛出 [`Error`][]。
* 对于所有_不以_ ASCII 冒号（`:`）字符结尾的 `urlObject.protocol` 字符串值，字面字符串 `:` 将附加到 `result`。
* 如果以下任一条件为真，则字面字符串 `//` 将附加到 `result`：
  * `urlObject.slashes` 属性为 true；
  * `urlObject.protocol` 以 `http`、`https`、`ftp`、`gopher` 或 `file` 开头；
* 如果 `urlObject.auth` 属性的值为真值，并且 `urlObject.host` 或 `urlObject.hostname` 都不是 `undefined`，则 `urlObject.auth` 的值将被强制转换为字符串并附加到 `result`，后跟字面字符串 `@`。
* 如果 `urlObject.host` 属性为 `undefined`，则：
  * 如果 `urlObject.hostname` 是字符串，则附加到 `result`。
  * 否则，如果 `urlObject.hostname` 不是 `undefined` 且不是字符串，则抛出 [`Error`][]。
  * 如果 `urlObject.port` 属性值为真值，且 `urlObject.hostname` 不是 `undefined`：
    * 字面字符串 `:` 附加到 `result`，并且
    * `urlObject.port` 的值被强制转换为字符串并附加到 `result`。
* 否则，如果 `urlObject.host` 属性值为真值，则 `urlObject.host` 的值被强制转换为字符串并附加到 `result`。
* 如果 `urlObject.pathname` 属性是一个非空字符串：
  * 如果 `urlObject.pathname` _不以_ ASCII 正斜杠（`/`）开头，则字面字符串 `'/'` 附加到 `result`。
  * `urlObject.pathname` 的值附加到 `result`。
* 否则，如果 `urlObject.pathname` 不是 `undefined` 且不是字符串，则抛出 [`Error`][]。
* 如果 `urlObject.search` 属性为 `undefined` 且 `urlObject.query` 属性是 `Object`，则字面字符串 `?` 附加到 `result`，后跟调用 [`querystring`][] 模块的 `stringify()` 方法的输出，传递 `urlObject.query` 的值。
* 否则，如果 `urlObject.search` 是字符串：
  * 如果 `urlObject.search` 的值_不以_ ASCII 问号（`?`）字符开头，则字面字符串 `?` 附加到 `result`。
  * `urlObject.search` 的值附加到 `result`。
* 否则，如果 `urlObject.search` 不是 `undefined` 且不是字符串，则抛出 [`Error`][]。
* 如果 `urlObject.hash` 属性是字符串：
  * 如果 `urlObject.hash` 的值_不以_ ASCII 哈希（`#`）字符开头，则字面字符串 `#` 附加到 `result`。
  * `urlObject.hash` 的值附加到 `result`。
* 否则，如果 `urlObject.hash` 属性不是 `undefined` 且不是字符串，则抛出 [`Error`][]。
* 返回 `result`。

自动迁移可用（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/node-url-to-whatwg-url)）。

```bash
npx codemod@latest @nodejs/node-url-to-whatwg-url
```

### `url.format(urlString)`

<!-- YAML
added: v0.1.25
changes:
  - version:
      - v24.0.0
    pr-url: https://github.com/nodejs/node/pull/55017
    description: 应用弃用。
-->

> 稳定性：0 - 已弃用：请改用 WHATWG URL API。

* `urlString` {string} 将传递给 `url.parse()` 并进行格式化的字符串。
* 返回值：{string}

`url.format(urlString)` 是 `url.format(url.parse(urlString))` 的简写。

因为它在内部调用了已弃用的 [`url.parse()`][]，所以向 `url.format()` 传递字符串参数本身也是已弃用的。

可以通过构造一个新的 URL 对象并调用 [`url.toString()`][] 来使用 WHATWG URL API 执行 URL 字符串的规范化。

```mjs
import { URL } from 'node:url';

const unformatted = 'http://[fe80:0:0:0:0:0:0:1]:/a/b?a=b#abc';
const formatted = new URL(unformatted).toString();

console.log(formatted); // 打印：http://[fe80::1]/a/b?a=b#abc
```

```cjs
const { URL } = require('node:url');

const unformatted = 'http://[fe80:0:0:0:0:0:0:1]:/a/b?a=b#abc';
const formatted = new URL(unformatted).toString();

console.log(formatted); // 打印：http://[fe80::1]/a/b?a=b#abc
```

### `url.parse(urlString[, parseQueryString[, slashesDenoteHost]])`

<!-- YAML
added: v0.1.25
changes:
  - version:
      - v24.0.0
    pr-url: https://github.com/nodejs/node/pull/55017
    description: 应用弃用。
  - version:
      - v19.9.0
      - v18.17.0
    pr-url: https://github.com/nodejs/node/pull/47203
    description: "添加了对 `--pending-deprecation` 的支持。"
  - version:
      - v19.0.0
      - v18.13.0
    pr-url: https://github.com/nodejs/node/pull/44919
    description: 仅文档弃用。
  - version:
      - v15.13.0
      - v14.17.0
    pr-url: https://github.com/nodejs/node/pull/37784
    description: 弃用已撤销。状态更改为“旧版”。
  - version: v11.14.0
    pr-url: https://github.com/nodejs/node/pull/26941
    description: "当没有路径且协议方案为 `ws:` 或 `wss:` 时，返回的 URL 对象上的 `pathname` 属性现在为 `/`。"
  - version: v11.0.0
    pr-url: https://github.com/nodejs/node/pull/22715
    description: 旧版 URL API 已弃用。请改用 WHATWG URL API。
  - version: v9.0.0
    pr-url: https://github.com/nodejs/node/pull/13606
    description: "当不存在查询字符串时，返回的 URL 对象上的 `search` 属性现在为 `null`。"
-->

> 稳定性：0 - 已弃用：请改用 WHATWG URL API。

* `urlString` {string} 要解析的 URL 字符串。
* `parseQueryString` {boolean} 如果为 `true`，`query` 属性将始终设置为由 [`querystring`][] 模块的 `parse()` 方法返回的对象。如果为 `false`，返回的 URL 对象上的 `query` 属性将是未解析、未解码的字符串。**默认值：** `false`。
* `slashesDenoteHost` {boolean} 如果为 `true`，字面字符串 `//` 之后的第一个令牌且在前一个 `/` 之前将被解释为 `host`。例如，给定 `//foo/bar`，结果将是 `{host: 'foo', pathname: '/bar'}` 而不是 `{pathname: '//foo/bar'}`。**默认值：** `false`。

`url.parse()` 方法接受 URL 字符串，解析它，并返回 URL 对象。

如果 `urlString` 不是字符串，则抛出 `TypeError`。

如果 `auth` 属性存在但无法解码，则抛出 `URIError`。

`url.parse()` 使用一种宽松、非标准的算法来解析 URL 字符串。它容易出现安全问题，例如 [主机名欺骗][] 以及用户名和密码的处理不正确。不要与不可信的输入一起使用。不会为 `url.parse()` 漏洞发布 CVE。请改用 [WHATWG URL][] API，例如：

```js
function getURL(req) {
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'example.com';
  return new URL(`${proto}://${host}${req.url || '/'}`);
}
```

上面的示例假设格式正确的头是从反向代理转发到你的 Node.js 服务器的。如果你没有使用反向代理，你应该使用下面的示例：

```js
function getURL(req) {
  return new URL(`https://example.com${req.url || '/'}`);
}
```

自动迁移可用（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/node-url-to-whatwg-url)）。

```bash
npx codemod@latest @nodejs/node-url-to-whatwg-url
```

### `url.resolve(from, to)`

<!-- YAML
added: v0.1.25
changes:
  - version:
      - v24.0.0
    pr-url: https://github.com/nodejs/node/pull/55017
    description: 通过 DEP0169 再次弃用。
  - version:
      - v15.13.0
      - v14.17.0
    pr-url: https://github.com/nodejs/node/pull/37784
    description: 弃用已撤销。状态更改为“旧版”。
  - version: v11.0.0
    pr-url: https://github.com/nodejs/node/pull/22715
    description: 旧版 URL API 已弃用。请改用 WHATWG URL API。
  - version: v6.6.0
    pr-url: https://github.com/nodejs/node/pull/8215
    description: "当 `from` 和 `to` 引用同一主机时，`auth` 字段现在保持完整。"
  - version:
    - v6.5.0
    - v4.6.2
    pr-url: https://github.com/nodejs/node/pull/8214
    description: "`port` 字段现在已正确复制。"
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/1480
    description: "当 `to` 参数包含主机名时，`auth` 字段现在被清除。"
-->

> 稳定性：0 - 已弃用：请改用 WHATWG URL API。

* `from` {string} 如果 `to` 是相对 URL，则使用的基础 URL。
* `to` {string} 要解析的目标 URL。

`url.resolve()` 方法以类似于 Web 浏览器解析锚标签的方式，相对于基础 URL 解析目标 URL。

```js
const url = require('node:url');
url.resolve('/one/two/three', 'four');         // '/one/two/four'
url.resolve('http://example.com/', '/one');    // 'http://example.com/one'
url.resolve('http://example.com/one', '/two'); // 'http://example.com/two'
```

因为它在内部调用了已弃用的 [`url.parse()`][]，所以 `url.resolve()` 本身也是已弃用的。

要使用 WHATWG URL API 实现相同的结果：

```js
function resolve(from, to) {
  const resolvedUrl = new URL(to, new URL(from, 'resolve://'));
  if (resolvedUrl.protocol === 'resolve:') {
    // `from` 是一个相对 URL。
    const { pathname, search, hash } = resolvedUrl;
    return pathname + search + hash;
  }
  return resolvedUrl.toString();
}

resolve('/one/two/three', 'four');         // '/one/two/four'
resolve('http://example.com/', '/one');    // 'http://example.com/one'
resolve('http://example.com/one', '/two'); // 'http://example.com/two'
```

<a id="whatwg-percent-encoding"></a>

## URL 中的百分号编码

URL 只允许包含特定范围的字符。任何超出该范围的字符都必须进行编码。如何编码这些字符以及编码哪些字符完全取决于字符在 URL 结构中的位置。

### 遗留 API

在遗留 API 中，空格（`' '`）和以下字符将在 URL 对象的属性中自动被转义：

```text
< > " ` \r \n \t { } | \ ^ '
```

例如，ASCII 空格字符（`' '`）被编码为 `%20`。ASCII 正斜杠（`/`）字符被编码为 `%2F`。

### WHATWG API

[WHATWG URL 标准][] 在选择编码字符方面比遗留 API 使用了更具选择性和更细粒度的方法。

WHATWG 算法定义了四个“百分号编码集”，用于描述必须进行百分号编码的字符范围：

* _C0 控制百分号编码集_ 包括范围在 U+0000 到 U+001F（含）之间的代码点以及所有大于 U+007E（\~）的代码点。

* _片段百分号编码集_ 包括 _C0 控制百分号编码集_ 以及代码点 U+0020 SPACE、U+0022 (")、U+003C (<)、U+003E (>) 和 U+0060 (\`)。

* _路径百分号编码集_ 包括 _C0 控制百分号编码集_ 以及代码点 U+0020 SPACE、U+0022 (")、U+0023 (#)、U+003C (<)、U+003E (>)、U+003F (?)、U+0060 (\`)、U+007B (\`{\`) 和 U+007D (\`}\`)。

* _用户信息编码集_ 包括 _路径百分号编码集_ 以及代码点 U+002F (/)、U+003A (:)、U+003B (;)、U+003D (=)、U+0040 (@)、U+005B (\[) 到 U+005E(^) 以及 U+007C (|)。

_用户信息百分号编码集_ 仅用于编码 URL 内的用户名和密码。_路径百分号编码集_ 用于大多数 URL 的路径。_片段百分号编码集_ 用于 URL 片段。_C0 控制百分号编码集_ 用于主机和路径在某些特定条件下，以及所有其他情况。

当非 ASCII 字符出现在主机名中时，主机名使用 [Punycode][] 算法进行编码。但请注意，主机名 _可能_ 包含 _既_ Punycode 编码 _又_ 百分号编码的字符：

```js
const myURL = new URL('https://%CF%80.example.com/foo');
console.log(myURL.href);
// 输出 https://xn--1xa.example.com/foo
console.log(myURL.origin);
// 输出 https://xn--1xa.example.com
```

[Punycode]: https://tools.ietf.org/html/rfc5891#section-4.4
[WHATWG URL]: #the-whatwg-url-api
[WHATWG URL 标准]: https://url.spec.whatwg.org/
[`Error`]: errors.md#class-error
[`JSON.stringify()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
[`TypeError`]: errors.md#class-typeerror
[`URLSearchParams`]: #class-urlsearchparams
[`array.toString()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString
[`http.request()`]: http.md#httprequestoptions-callback
[`https.request()`]: https.md#httpsrequestoptions-callback
[`new URL()`]: #new-urlinput-base
[`querystring`]: querystring.md
[`url.domainToASCII()`]: #urldomaintoasciidomain
[`url.domainToUnicode()`]: #urldomaintounicodedomain
[`url.fileURLToPath()`]: #urlfileurltopathurl-options
[`url.format()`]: #urlformaturlobject
[`url.href`]: #urlhref
[`url.parse()`]: #urlparseurlstring-parsequerystring-slashesdenotehost
[`url.search`]: #urlsearch
[`url.toJSON()`]: #urltojson
[`url.toString()`]: #urltostring
[`urlSearchParams.entries()`]: #urlsearchparamsentries
[`urlSearchParamsSymbol.iterator()`]: #urlsearchparamssymboliterator
[转换为字符串]: https://tc39.es/ecma262/#sec-tostring
[已解析 URL 的示例]: https://url.spec.whatwg.org/#example-url-parsing
[主机名欺骗]: https://hackerone.com/reports/678487
[遗留 `urlObject`]: #legacy-urlobject
[百分号编码]: #percent-encoding-in-urls
[稳定排序算法]: https://en.wikipedia.org/wiki/Sorting_algorithm#Stability
