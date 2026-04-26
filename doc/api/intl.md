# 国际化支持

<!--introduced_in=v8.2.0-->

<!-- type=misc -->

Node.js 拥有许多功能，使编写国际化程序变得更加容易。其中一些功能包括：

* [ECMAScript 语言规范][ECMA-262] 中的区域设置敏感或 Unicode 感知函数：
  * [`String.prototype.normalize()`][]
  * [`String.prototype.toLowerCase()`][]
  * [`String.prototype.toUpperCase()`][]
* [ECMAScript 国际化 API 规范][ECMA-402]（即 ECMA-402）中描述的所有功能：
  * [`Intl`][] 对象
  * 区域设置敏感的方法，如 [`String.prototype.localeCompare()`][] 和
    [`Date.prototype.toLocaleString()`][]
* [WHATWG URL 解析器][] 的 [国际化域名][] (IDNs) 支持
* [`require('node:buffer').transcode()`][]
* 更准确的 [REPL][] 行编辑
* [`require('node:util').TextDecoder`][]
* [`RegExp` Unicode 属性转义][]

Node.js 和底层的 V8 引擎使用 [International Components for Unicode (ICU)][ICU] 在原生 C/C++ 代码中实现这些功能。Node.js 默认提供完整的 ICU 数据集。但是，由于 ICU 数据文件的大小，在构建或运行 Node.js 时提供了几个选项来自定义 ICU 数据集。

## 构建 Node.js 的选项

为了控制 ICU 在 Node.js 中的使用方式，编译期间有四个 `configure` 选项可用。有关如何编译 Node.js 的更多详细信息记录在 [BUILDING.md][] 中。

* `--with-intl=none`/`--without-intl`
* `--with-intl=system-icu`
* `--with-intl=small-icu`
* `--with-intl=full-icu`（默认）

每个 `configure` 选项可用的 Node.js 和 JavaScript 功能概述：

| 功能                                     | `none`                            | `system-icu`                 | `small-icu`            | `full-icu` |
| ---------------------------------------- | --------------------------------- | ---------------------------- | ---------------------- | ---------- |
| [`String.prototype.normalize()`][]       | 无（函数为空操作）                | 完整                         | 完整                   | 完整       |
| `String.prototype.to*Case()`             | 完整                              | 完整                         | 完整                   | 完整       |
| [`Intl`][]                               | 无（对象不存在）                  | 部分/完整（取决于操作系统）  | 部分（仅英语）         | 完整       |
| [`String.prototype.localeCompare()`][]   | 部分（非区域感知）                | 完整                         | 完整                   | 完整       |
| `String.prototype.toLocale*Case()`       | 部分（非区域感知）                | 完整                         | 完整                   | 完整       |
| [`Number.prototype.toLocaleString()`][]  | 部分（非区域感知）                | 部分/完整（取决于操作系统）  | 部分（仅英语）         | 完整       |
| `Date.prototype.toLocale*String()`       | 部分（非区域感知）                | 部分/完整（取决于操作系统）  | 部分（仅英语）         | 完整       |
| [旧版 URL 解析器][]                      | 部分（无 IDN 支持）               | 完整                         | 完整                   | 完整       |
| [WHATWG URL 解析器][]                    | 部分（无 IDN 支持）               | 完整                         | 完整                   | 完整       |
| [`require('node:buffer').transcode()`][] | 无（函数不存在）                  | 完整                         | 完整                   | 完整       |
| [REPL][]                                 | 部分（行编辑不准确）              | 完整                         | 完整                   | 完整       |
| [`require('node:util').TextDecoder`][]   | 部分（支持基本编码）              | 部分/完整（取决于操作系统）  | 部分（仅 Unicode）     | 完整       |
| [`RegExp` Unicode 属性转义][]            | 无（无效的 `RegExp` 错误）        | 完整                         | 完整                   | 完整       |

"(非区域感知)" 标识表示该函数执行的操作与其非 `Locale` 版本的操作相同（如果存在的话）。例如，在 `none` 模式下，`Date.prototype.toLocaleString()` 的操作与 `Date.prototype.toString()` 的操作相同。

### 禁用所有国际化功能（`none`）

如果选择了此选项，ICU 将被禁用，并且上述大多数国际化功能在生成的 `node` 二进制文件中将**不可用**。

### 使用预安装的 ICU 构建（`system-icu`）

Node.js 可以链接到系统上已安装的 ICU 构建。事实上，大多数 Linux 发行版已经安装了 ICU，此选项将使得重用操作系统中其他组件使用的同一数据集成为可能。

仅需要 ICU 库本身的功能，如 [`String.prototype.normalize()`][] 和 [WHATWG URL 解析器][]，在 `system-icu` 下得到完全支持。需要 ICU 区域数据的功能，如 [`Intl.DateTimeFormat`][]，可能得到完全或部分支持，这取决于系统上安装的 ICU 数据的完整性。

### 嵌入有限的 ICU 数据集（`small-icu`）

此选项使生成的二进制文件静态链接到 ICU 库，并在 `node` 可执行文件中包含 ICU 数据的子集（通常仅包含英语区域设置）。

仅需要 ICU 库本身的功能，如 [`String.prototype.normalize()`][] 和 [WHATWG URL 解析器][]，在 `small-icu` 下得到完全支持。需要 ICU 区域数据的功能，如 [`Intl.DateTimeFormat`][]，通常仅适用于英语区域设置：

```js
const january = new Date(9e8);
const english = new Intl.DateTimeFormat('en', { month: 'long' });
const spanish = new Intl.DateTimeFormat('es', { month: 'long' });

console.log(english.format(january));
// 输出 "January"
console.log(spanish.format(january));
// 在 small-icu 上输出 "M01" 或 "January"，取决于用户的默认区域设置
// 应该输出 "enero"
```

此模式在功能和二进制大小之间提供了平衡。

#### 在运行时提供 ICU 数据

如果使用了 `small-icu` 选项，仍然可以在运行时提供额外的区域数据，以便 JavaScript 方法适用于所有 ICU 区域设置。假设数据文件存储在 `/runtime/directory/with/dat/file`，可以通过以下方式使其对 ICU 可用：

* `--with-icu-default-data-dir` configure 选项：

  ```bash
  ./configure --with-icu-default-data-dir=/runtime/directory/with/dat/file --with-intl=small-icu
  ```

  这仅将默认数据目录路径嵌入到二进制文件中。
  实际的数据文件将在运行时从此目录路径加载。

* [`NODE_ICU_DATA`][] 环境变量：

  ```bash
  env NODE_ICU_DATA=/runtime/directory/with/dat/file node
  ```

* [`--icu-data-dir`][] CLI 参数：

  ```bash
  node --icu-data-dir=/runtime/directory/with/dat/file
  ```

当指定了多个选项时，`--icu-data-dir` CLI 参数具有最高优先级，其次是 `NODE_ICU_DATA` 环境变量，然后是 `--with-icu-default-data-dir` configure 选项。

ICU 能够自动查找并加载各种数据格式，但数据必须适用于 ICU 版本，且文件命名正确。数据文件最常见的名称是 `icudtX[bl].dat`，其中 `X` 表示预期的 ICU 版本，`b` 或 `l` 表示系统的字节序。如果无法从指定目录读取预期的数据文件，Node.js 将加载失败。与当前 Node.js 版本对应的数据文件名称可以通过以下方式计算：

```js
`icudt${process.versions.icu.split('.')[0]}${os.endianness()[0].toLowerCase()}.dat`;
```

查看 ICU 用户指南中的 ["ICU Data"][] 文章，了解其他支持的格式以及有关 ICU 数据的一般详细信息。

[full-icu][] npm 模块可以通过检测运行中的 `node` 可执行文件的 ICU 版本并下载适当的数据文件，从而大大简化 ICU 数据的安装。通过 `npm i full-icu` 安装模块后，数据文件将位于 `./node_modules/full-icu`。然后可以将此路径传递给 `NODE_ICU_DATA` 或 `--icu-data-dir`，如上所示，以启用完整的 `Intl` 支持。

### 嵌入整个 ICU（`full-icu`）

此选项使生成的二进制文件静态链接到 ICU 并包含完整的 ICU 数据集。以此方式创建的二进制文件没有进一步的外部依赖项，并支持所有区域设置，但可能相当大。如果没有传递 `--with-intl` 标志，这是默认行为。官方二进制文件也是以此模式构建的。

## 检测国际化支持

要验证是否启用了 ICU（`system-icu`、`small-icu` 或 `full-icu`），只需检查 `Intl` 的存在性就足够了：

```js
const hasICU = typeof Intl === 'object';
```

或者，检查 `process.versions.icu`（仅在启用 ICU 时定义的属性）也可以：

```js
const hasICU = typeof process.versions.icu === 'string';
```

要检查对非英语区域设置的支持（即 `full-icu` 或 `system-icu`），[`Intl.DateTimeFormat`][] 可以作为一个很好的区分因素：

```js
const hasFullICU = (() => {
  try {
    const january = new Date(9e8);
    const spanish = new Intl.DateTimeFormat('es', { month: 'long' });
    return spanish.format(january) === 'enero';
  } catch (err) {
    return false;
  }
})();
```

对于更详细的 `Intl` 支持测试，以下资源可能会有所帮助：

* [btest402][]：通常用于检查带有 `Intl` 支持的 Node.js 是否构建正确。
* [Test262][]：ECMAScript 的官方一致性测试套件包含一个专门针对 ECMA-402 的部分。

["ICU Data"]: http://userguide.icu-project.org/icudata
[BUILDING.md]: https://github.com/nodejs/node/blob/HEAD/BUILDING.md
[ECMA-262]: https://tc39.github.io/ecma262/
[ECMA-402]: https://tc39.github.io/ecma402/
[ICU]: http://site.icu-project.org/
[旧版 URL 解析器]: url.md#legacy-url-api
[REPL]: repl.md#repl
[Test262]: https://github.com/tc39/test262/tree/HEAD/test/intl402
[WHATWG URL 解析器]: url.md#the-whatwg-url-api
[`--icu-data-dir`]: cli.md#--icu-data-dirfile
[`Date.prototype.toLocaleString()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
[`Intl.DateTimeFormat`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
[`Intl`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
[`NODE_ICU_DATA`]: cli.md#node_icu_datafile
[`Number.prototype.toLocaleString()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
[`RegExp` Unicode 属性转义]: https://github.com/tc39/proposal-regexp-unicode-property-escapes
[`String.prototype.localeCompare()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
[`String.prototype.normalize()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
[`String.prototype.toLowerCase()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase
[`String.prototype.toUpperCase()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase
[`require('node:buffer').transcode()`]: buffer.md#buffertranscodesource-fromenc-toenc
[`require('node:util').TextDecoder`]: util.md#class-utiltextdecoder
[btest402]: https://github.com/srl295/btest402
[full-icu]: https://www.npmjs.com/package/full-icu
[国际化域名]: https://en.wikipedia.org/wiki/Internationalized_domain_name
