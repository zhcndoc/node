# 查询字符串

<!--introduced_in=v0.1.25-->

> 稳定性：2 - 稳定

<!--name=querystring-->

<!-- source_link=lib/querystring.js -->

`node:querystring` 模块提供了用于解析和格式化 URL 查询字符串的工具。可以使用以下方式访问它：

```js
const querystring = require('node:querystring');
```

`querystring` 的性能优于 {URLSearchParams}，但它不是一个标准化的 API。当性能不是关键因素或需要与浏览器代码兼容时，请使用 {URLSearchParams}。

## `querystring.decode()`

<!-- YAML
added: v0.1.99
-->

`querystring.decode()` 函数是 `querystring.parse()` 的别名。

## `querystring.encode()`

<!-- YAML
added: v0.1.99
-->

`querystring.encode()` 函数是 `querystring.stringify()` 的别名。

## `querystring.escape(str)`

<!-- YAML
added: v0.1.25
-->

* `str` {string}

`querystring.escape()` 方法以针对 URL 查询字符串的特定要求进行了优化的方式，对给定的 `str` 执行 URL 百分号编码。

`querystring.escape()` 方法由 `querystring.stringify()` 使用，通常不建议直接使用。导出它主要是为了允许应用程序代码在必要时通过将 `querystring.escape` 赋值给替代函数来提供替代的百分号编码实现。

## `querystring.parse(str[, sep[, eq[, options]]])`

<!-- YAML
added: v0.1.25
changes:
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/10967
    description: "现在可以正确解析多个空条目（例如 `&=&=`）。"
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/6055
    description: "返回的对象不再继承自 `Object.prototype`。"
  - version:
    - v6.0.0
    - v4.2.4
    pr-url: https://github.com/nodejs/node/pull/3807
    description: "`eq` 参数现在的长度可以超过 `1`。"
-->

* `str` {string} 要解析的 URL 查询字符串
* `sep` {string} 查询字符串中用于分隔键值对的子字符串。**默认值：** `'&'`。
* `eq` {string}。查询字符串中用于分隔键和值的子字符串。**默认值：** `'='`。
* `options` {Object}
  * `decodeURIComponent` {Function} 解码查询字符串中的百分号编码字符时要使用的函数。**默认值：** `querystring.unescape()`。
  * `maxKeys` {number} 指定要解析的最大键数。指定 `0` 以移除键计数限制。**默认值：** `1000`。

`querystring.parse()` 方法将 URL 查询字符串（`str`）解析为键值对的集合。

例如，查询字符串 `'foo=bar&abc=xyz&abc=123'` 被解析为：

```json
{
  "foo": "bar",
  "abc": ["xyz", "123"]
}
```

`querystring.parse()` 方法返回的对象 _不_ 原型继承自 JavaScript `Object`。这意味着典型的 `Object` 方法（如 `obj.toString()`、`obj.hasOwnProperty()` 等）未定义且 _将无法工作_。

默认情况下，查询字符串内的百分号编码字符将被假定为使用 UTF-8 编码。如果使用了替代字符编码，则需要指定替代的 `decodeURIComponent` 选项：

```js
// 假设 gbkDecodeURIComponent 函数已存在...

querystring.parse('w=%D6%D0%CE%C4&foo=bar', null, null,
                  { decodeURIComponent: gbkDecodeURIComponent });
```

## `querystring.stringify(obj[, sep[, eq[, options]]])`

<!-- YAML
added: v0.1.25
-->

* `obj` {Object} 要序列化为 URL 查询字符串的对象
* `sep` {string} 查询字符串中用于分隔键值对的子字符串。**默认值：** `'&'`。
* `eq` {string}。查询字符串中用于分隔键和值的子字符串。**默认值：** `'='`。
* `options`
  * `encodeURIComponent` {Function} 在查询字符串中将 URL 不安全字符转换为百分号编码时要使用的函数。**默认值：** `querystring.escape()`。

`querystring.stringify()` 方法通过遍历对象的“自有属性”，从给定的 `obj` 生成 URL 查询字符串。

它序列化 `obj` 中传入的以下类型的值：{string|number|bigint|boolean|string\[]|number\[]|bigint\[]|boolean\[]}
数值必须是有限的。任何其他输入值将被强制转换为空字符串。

```js
querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' });
// 返回 'foo=bar&baz=qux&baz=quux&corge='

querystring.stringify({ foo: 'bar', baz: 'qux' }, ';', ':');
// 返回 'foo:bar;baz:qux'
```

默认情况下，查询字符串内需要百分号编码的字符将被编码为 UTF-8。如果需要替代编码，则需要指定替代的 `encodeURIComponent` 选项：

```js
// 假设 gbkEncodeURIComponent 函数已存在，

querystring.stringify({ w: '中文', foo: 'bar' }, null, null,
                      { encodeURIComponent: gbkEncodeURIComponent });
```

## `querystring.unescape(str)`

<!-- YAML
added: v0.1.25
-->

* `str` {string}

`querystring.unescape()` 方法对给定的 `str` 执行 URL 百分号编码字符的解码。

`querystring.unescape()` 方法由 `querystring.parse()` 使用，通常不建议直接使用。导出它主要是为了允许应用程序代码在必要时通过将 `querystring.unescape` 赋值给替代函数来提供替代的解码实现。

默认情况下，`querystring.unescape()` 方法将尝试使用 JavaScript 内置的 `decodeURIComponent()` 方法进行解码。如果失败，将使用一个更安全的等效方法，该方法不会在 URL 格式错误时抛出异常。
