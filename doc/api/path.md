# path

<!--introduced_in=v0.10.0-->

> 稳定性：2 - 稳定

<!-- source_link=lib/path.js -->

`node:path` 模块提供了用于处理文件和目录路径的工具。可以通过以下方式访问：

```cjs
const path = require('node:path');
```

```mjs
import path from 'node:path';
```

## Windows 与 POSIX

`node:path` 模块的默认操作取决于运行 Node.js 应用程序的操作系统。具体来说，在 Windows 操作系统上运行时，`node:path` 模块将假设使用的是 Windows 风格的路径。

因此，在 POSIX 和 Windows 上使用 `path.basename()` 可能会产生不同的结果：

在 POSIX 上：

```js
path.basename('C:\\temp\\myfile.html');
// 返回：'C:\\temp\\myfile.html'
```

在 Windows 上：

```js
path.basename('C:\\temp\\myfile.html');
// 返回：'myfile.html'
```

要在任何操作系统上处理 Windows 文件路径时获得一致的结果，请使用 [`path.win32`][]：

在 POSIX 和 Windows 上：

```js
path.win32.basename('C:\\temp\\myfile.html');
// 返回：'myfile.html'
```

要在任何操作系统上处理 POSIX 文件路径时获得一致的结果，请使用 [`path.posix`][]：

在 POSIX 和 Windows 上：

```js
path.posix.basename('/tmp/myfile.html');
// 返回：'myfile.html'
```

在 Windows 上，Node.js 遵循每个驱动器工作目录的概念。在使用不带反斜杠的驱动器路径时可以观察到这种行为。例如，`path.resolve('C:\\')` 返回的结果可能与 `path.resolve('C:')` 不同。更多信息，请参阅 [此 MSDN 页面][MSDN-Rel-Path]。

## `path.basename(path[, suffix])`

<!-- YAML
added: v0.1.25
changes:
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/5348
    description: "Passing a non-string as the `path` argument will throw now."
-->

* `path` {string}
* `suffix` {string} 可选的要移除的后缀
* 返回：{string}

`path.basename()` 方法返回 `path` 的最后一部分，类似于 Unix 的 `basename` 命令。尾部 [目录分隔符][`path.sep`] 会被忽略。

```js
path.basename('/foo/bar/baz/asdf/quux.html');
// 返回：'quux.html'

path.basename('/foo/bar/baz/asdf/quux.html', '.html');
// 返回：'quux'
```

虽然 Windows 通常以不区分大小写的方式处理文件名（包括文件扩展名），但此函数并非如此。例如，`C:\\foo.html` 和 `C:\\foo.HTML` 指向同一个文件，但 `basename` 将扩展名视为区分大小写的字符串：

```js
path.win32.basename('C:\\foo.html', '.html');
// 返回：'foo'

path.win32.basename('C:\\foo.HTML', '.html');
// 返回：'foo.HTML'
```

如果 `path` 不是字符串，或者给出了 `suffix` 但不是字符串，则抛出 [`TypeError`][]。

## `path.delimiter`

<!-- YAML
added: v0.9.3
-->

* 类型：{string}

提供平台特定的路径分隔符：

* Windows 为 `;`
* POSIX 为 `:`

例如，在 POSIX 上：

```js
console.log(process.env.PATH);
// 打印：'/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin'

process.env.PATH.split(path.delimiter);
// 返回：['/usr/bin', '/bin', '/usr/sbin', '/sbin', '/usr/local/bin']
```

在 Windows 上：

```js
console.log(process.env.PATH);
// 打印：'C:\Windows\system32;C:\Windows;C:\Program Files\node\'

process.env.PATH.split(path.delimiter);
// 返回 ['C:\\Windows\\system32', 'C:\\Windows', 'C:\\Program Files\\node\\']
```

## `path.dirname(path)`

<!-- YAML
added: v0.1.16
changes:
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/5348
    description: "Passing a non-string as the `path` argument will throw now."
-->

* `path` {string}
* 返回：{string}

`path.dirname()` 方法返回 `path` 的目录名称，类似于 Unix 的 `dirname` 命令。尾部目录分隔符会被忽略，参见 [`path.sep`][]。

```js
path.dirname('/foo/bar/baz/asdf/quux');
// 返回：'/foo/bar/baz/asdf'
```

如果 `path` 不是字符串，则抛出 [`TypeError`][]。

## `path.extname(path)`

<!-- YAML
added: v0.1.25
changes:
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/5348
    description: "Passing a non-string as the `path` argument will throw now."
-->

* `path` {string}
* 返回：{string}

`path.extname()` 方法返回 `path` 的扩展名，从 `path` 最后一部分中最后一个 `.`（句点）字符出现的位置到字符串末尾。如果 `path` 的最后一部分中没有 `.`，或者除了 `path` 的 basename 的第一个字符外没有 `.` 字符（参见 `path.basename()`），则返回空字符串。

```js
path.extname('index.html');
// 返回：'.html'

path.extname('index.coffee.md');
// 返回：'.md'

path.extname('index.');
// 返回：'.'

path.extname('index');
// 返回：''

path.extname('.index');
// 返回：''

path.extname('.index.md');
// 返回：'.md'
```

如果 `path` 不是字符串，则抛出 [`TypeError`][]。

## `path.format(pathObject)`

<!-- YAML
added: v0.11.15
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44349
    description: "The dot will be added if it is not specified in `ext`."
-->

* `pathObject` {Object} 任何具有以下属性的 JavaScript 对象：
  * `dir` {string}
  * `root` {string}
  * `base` {string}
  * `name` {string}
  * `ext` {string}
* 返回：{string}

`path.format()` 方法从对象返回路径字符串。这是 [`path.parse()`][] 的反向操作。

为 `pathObject` 提供属性时，请记住存在一些组合，其中一个属性优先于另一个属性：

* 如果提供了 `pathObject.dir`，则忽略 `pathObject.root`
* 如果存在 `pathObject.base`，则忽略 `pathObject.ext` 和 `pathObject.name`

例如，在 POSIX 上：

```js
// 如果提供了 `dir`、`root` 和 `base`，
// `${dir}${path.sep}${base}`
// 将返回。`root` 被忽略。
path.format({
  root: '/ignored',
  dir: '/home/user/dir',
  base: 'file.txt',
});
// 返回：'/home/user/dir/file.txt'

// 如果未指定 `dir`，则将使用 `root`。
// 如果只提供 `root` 或 `dir` 等于 `root`，则
// 不会包含平台分隔符。`ext` 将被忽略。
path.format({
  root: '/',
  base: 'file.txt',
  ext: 'ignored',
});
// 返回：'/file.txt'

// 如果未指定 `base`，则将使用 `name` + `ext`。
path.format({
  root: '/',
  name: 'file',
  ext: '.txt',
});
// 返回：'/file.txt'

// 如果 `ext` 中未指定点，则会添加点。
path.format({
  root: '/',
  name: 'file',
  ext: 'txt',
});
// 返回：'/file.txt'
```

在 Windows 上：

```js
path.format({
  dir: 'C:\\path\\dir',
  base: 'file.txt',
});
// 返回：'C:\\path\\dir\\file.txt'
```

## `path.matchesGlob(path, pattern)`

<!-- YAML
added:
  - v22.5.0
  - v20.17.0
changes:
  - version:
    - v24.8.0
    - v22.20.0
    pr-url: https://github.com/nodejs/node/pull/59572
    description: Marking the API stable.
-->

* `path` {string} 要进行 glob 匹配的路径。
* `pattern` {string} 用于检查路径的 glob 模式。
* 返回：{boolean} `path` 是否匹配 `pattern`。

`path.matchesGlob()` 方法确定 `path` 是否匹配 `pattern`。

例如：

```js
path.matchesGlob('/foo/bar', '/foo/*'); // true
path.matchesGlob('/foo/bar*', 'foo/bird'); // false
```

如果 `path` 或 `pattern` 不是字符串，则抛出 [`TypeError`][]。

## `path.isAbsolute(path)`

<!-- YAML
added: v0.11.2
-->

* `path` {string}
* 返回：{boolean}

`path.isAbsolute()` 方法确定字面量 `path` 是否为绝对路径。因此，它对于防止路径遍历不安全。

如果给定的 `path` 是零长度字符串，将返回 `false`。

例如，在 POSIX 上：

```js
path.isAbsolute('/foo/bar');   // true
path.isAbsolute('/baz/..');    // true
path.isAbsolute('/baz/../..'); // true
path.isAbsolute('qux/');       // false
path.isAbsolute('.');          // false
```

在 Windows 上：

```js
path.isAbsolute('//server');    // true
path.isAbsolute('\\\\server');  // true
path.isAbsolute('C:/foo/..');   // true
path.isAbsolute('C:\\foo\\..'); // true
path.isAbsolute('bar\\baz');    // false
path.isAbsolute('bar/baz');     // false
path.isAbsolute('.');           // false
```

如果 `path` 不是字符串，则抛出 [`TypeError`][]。

## `path.join([...paths])`

<!-- YAML
added: v0.1.16
-->

* `...paths` {string} 路径段序列
* 返回：{string}

`path.join()` 方法使用平台特定的分隔符作为分隔符，将所有给定的 `path` 段连接在一起，然后规范化结果路径。

零长度的 `path` 段会被忽略。如果连接后的路径字符串是零长度字符串，则返回 `'.'`，表示当前工作目录。

```js
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// 返回：'/foo/bar/baz/asdf'

path.join('foo', {}, 'bar');
// 抛出 'TypeError: Path must be a string. Received {}'
```

如果任何路径段不是字符串，则抛出 [`TypeError`][]。

## `path.normalize(path)`

<!-- YAML
added: v0.1.23
-->

* `path` {string}
* 返回：{string}

`path.normalize()` 方法规范化给定的 `path`，解析 `'..'` 和 `'.'` 段。

当找到多个连续的路径段分隔字符时（例如 POSIX 上的 `/` 和 Windows 上的 `\` 或 `/`），它们将被替换为单个平台特定的路径段分隔符实例（POSIX 上为 `/`，Windows 上为 `\`）。尾部分隔符会被保留。

如果 `path` 是零长度字符串，则返回 `'.'`，表示当前工作目录。

在 POSIX 上，此函数应用的规范化类型并不严格遵循 POSIX 规范。例如，此函数将把两个前导正斜杠替换为一个斜杠，就像它是常规绝对路径一样，而一些 POSIX 系统对恰好以两个正斜杠开头的路径赋予特殊含义。同样，此函数执行的其他替换（例如移除 `..` 段）可能会改变底层系统解析路径的方式。

例如，在 POSIX 上：

```js
path.normalize('/foo/bar//baz/asdf/quux/..');
// 返回：'/foo/bar/baz/asdf'
```

在 Windows 上：

```js
path.normalize('C:\\temp\\\\foo\\bar\\..\\');
// 返回：'C:\\temp\\foo\\'
```

由于 Windows 识别多个路径分隔符，因此两个分隔符都将被替换为 Windows 首选分隔符 (`\`) 的实例：

```js
path.win32.normalize('C:////temp\\\\/\\/\\/foo/bar');
// 返回：'C:\\temp\\foo\\bar'
```

如果 `path` 不是字符串，则抛出 [`TypeError`][]。

## `path.parse(path)`

<!-- YAML
added: v0.11.15
-->

* `path` {string}
* 返回：{Object}

`path.parse()` 方法返回一个对象，其属性代表 `path` 的重要元素。尾随的目录分隔符将被忽略，参见 [`path.sep`][]。

返回的对象将具有以下属性：

* `dir` {string}
* `root` {string}
* `base` {string}
* `name` {string}
* `ext` {string}

例如，在 POSIX 上：

```js
path.parse('/home/user/dir/file.txt');
// 返回：
// { root: '/',
//   dir: '/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }
```

```text
┌─────────────────────┬────────────┐
│          dir        │    base    │
├──────┬              ├──────┬─────┤
│ root │              │ name │ ext │
"  /    home/user/dir / file  .txt "
└──────┴──────────────┴──────┴─────┘
（"" 行中的所有空格都应被忽略。它们仅用于格式化。）
```

在 Windows 上：

```js
path.parse('C:\\path\\dir\\file.txt');
// 返回：
// { root: 'C:\\',
//   dir: 'C:\\path\\dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }
```

```text
┌─────────────────────┬────────────┐
│          dir        │    base    │
├──────┬              ├──────┬─────┤
│ root │              │ name │ ext │
" C:\      path\dir   \ file  .txt "
└──────┴──────────────┴──────┴─────┘
（"" 行中的所有空格都应被忽略。它们仅用于格式化。）
```

如果 `path` 不是字符串，则抛出 [`TypeError`][]。

## `path.posix`

<!-- YAML
added: v0.11.15
changes:
  - version: v15.3.0
    pr-url: https://github.com/nodejs/node/pull/34962
    description: "作为 `require('path/posix')` 暴露。"
-->

* 类型：{Object}

`path.posix` 属性提供对 `path` 方法的 POSIX 特定实现的访问。

该 API 可通过 `require('node:path').posix` 或 `require('node:path/posix')` 访问。

## `path.relative(from, to)`

<!-- YAML
added: v0.5.0
changes:
  - version: v6.8.0
    pr-url: https://github.com/nodejs/node/pull/8523
    description: 在 Windows 上，UNC 路径的前导斜杠现在包含在返回值中。
-->

* `from` {string}
* `to` {string}
* 返回：{string}

`path.relative()` 方法根据当前工作目录返回从 `from` 到 `to` 的相对路径。如果 `from` 和 `to` 解析为相同的路径（在对每个路径调用 `path.resolve()` 之后），则返回零长度字符串。

如果零长度字符串作为 `from` 或 `to` 传递，则将使用当前工作目录代替零长度字符串。

例如，在 POSIX 上：

```js
path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb');
// 返回：'../../impl/bbb'
```

在 Windows 上：

```js
path.relative('C:\\orandea\\test\\aaa', 'C:\\orandea\\impl\\bbb');
// 返回：'..\\..\\impl\\bbb'
```

如果 `from` 或 `to` 不是字符串，则抛出 [`TypeError`][]。

## `path.resolve([...paths])`

<!-- YAML
added: v0.3.4
-->

* `...paths` {string} 一系列路径或路径段
* 返回：{string}

`path.resolve()` 方法将一系列路径或路径段解析为绝对路径。

给定的路径序列从右到左处理，每个后续的 `path`  prepended 直到构造出绝对路径。
例如，给定路径段序列：`/foo`、`/bar`、`baz`，调用 `path.resolve('/foo', '/bar', 'baz')` 将返回 `/bar/baz`，因为 `'baz'` 不是绝对路径，但 `'/bar' + '/' + 'baz'` 是。

如果在处理完所有给定的 `path` 段后尚未生成绝对路径，则使用当前工作目录。

结果路径会被规范化，除非路径解析为根目录，否则尾随斜杠会被移除。

零长度的 `path` 段会被忽略。

如果没有传递 `path` 段，`path.resolve()` 将返回当前工作目录的绝对路径。

```js
path.resolve('/foo/bar', './baz');
// 返回：'/foo/bar/baz'

path.resolve('/foo/bar', '/tmp/file/');
// 返回：'/tmp/file'

path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
// 如果当前工作目录是 /home/myself/node，
// 这将返回 '/home/myself/node/wwwroot/static_files/gif/image.gif'
```

如果任何参数不是字符串，则抛出 [`TypeError`][]。

## `path.sep`

<!-- YAML
added: v0.7.9
-->

* 类型：{string}

提供平台特定的路径段分隔符：

* 在 Windows 上为 `\`
* 在 POSIX 上为 `/`

例如，在 POSIX 上：

```js
'foo/bar/baz'.split(path.sep);
// 返回：['foo', 'bar', 'baz']
```

在 Windows 上：

```js
'foo\\bar\\baz'.split(path.sep);
// 返回：['foo', 'bar', 'baz']
```

在 Windows 上，正斜杠（`/`）和反斜杠（`\`）都被接受为路径段分隔符；但是，`path` 方法只添加反斜杠（`\`）。

## `path.toNamespacedPath(path)`

<!-- YAML
added: v9.0.0
-->

* `path` {string}
* 返回：{string}

仅在 Windows 系统上，返回给定 `path` 的等效 [命名空间前缀路径][]。如果 `path` 不是字符串，`path` 将未经修改返回。

此方法仅在 Windows 系统上有意义。在 POSIX 系统上，该方法不执行任何操作，始终未经修改返回 `path`。

## `path.win32`

<!-- YAML
added: v0.11.15
changes:
  - version: v15.3.0
    pr-url: https://github.com/nodejs/node/pull/34962
    description: "作为 `require('path/win32')` 暴露。"
-->

* 类型：{Object}

`path.win32` 属性提供对 `path` 方法的 Windows 特定实现的访问。

该 API 可通过 `require('node:path').win32` 或 `require('node:path/win32')` 访问。

[MSDN-Rel-Path]: https://docs.microsoft.com/en-us/windows/desktop/FileIO/naming-a-file#fully-qualified-vs-relative-paths
[`TypeError`]: errors.md#class-typeerror
[`path.parse()`]: #pathparsepath
[`path.posix`]: #pathposix
[`path.sep`]: #pathsep
[`path.win32`]: #pathwin32
[命名空间前缀路径]: https://docs.microsoft.com/en-us/windows/desktop/FileIO/naming-a-file#namespaces
