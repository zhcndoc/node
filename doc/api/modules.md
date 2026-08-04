# 模块：CommonJS 模块

<!--introduced_in=v0.10.0-->

> 稳定性：2 - 稳定

<!--name=module-->

CommonJS 模块是 Node.js 打包 JavaScript 代码的原始方式。
Node.js 也支持 [ECMAScript 模块][] 标准，以便在浏览器和其他 JavaScript 运行时使用。

在 Node.js 中，每个文件都被视为一个单独的模块。例如，考虑一个名为 `foo.js` 的文件：

```js
const circle = require('./circle.js');
console.log(`半径为 4 的圆的面积是 ${circle.area(4)}`);
```

在第一行，`foo.js` 加载了与 `foo.js` 位于同一目录的模块 `circle.js`。

以下是 `circle.js` 的内容：

```js
const { PI } = Math;

exports.area = (r) => PI * r ** 2;

exports.circumference = (r) => 2 * PI * r;
```

模块 `circle.js` 导出了 `area()` 和 `circumference()` 函数。函数和对象通过在特殊的 `exports` 对象上指定附加属性来添加到模块的根目录。

模块局部的变量将是私有的，因为模块被 Node.js 包装在一个函数中（参见 [模块包装器](#the-module-wrapper)）。
在此示例中，变量 `PI` 对 `circle.js` 是私有的。

`module.exports` 属性可以被赋予一个新值（例如函数或对象）。

在以下代码中，`bar.js` 使用了 `square` 模块，该模块导出一个 Square 类：

```js
const Square = require('./square.js');
const mySquare = new Square(2);
console.log(`mySquare 的面积是 ${mySquare.area()}`);
```

`square` 模块定义在 `square.js` 中：

```js
// 赋值给 exports 不会修改 module，必须使用 module.exports
module.exports = class Square {
  constructor(width) {
    this.width = width;
  }

  area() {
    return this.width ** 2;
  }
};
```

CommonJS 模块系统是在 [`module` 核心模块][] 中实现的。

## 启用

<!-- type=misc -->

Node.js 有两个模块系统：CommonJS 模块和 [ECMAScript 模块][]。

默认情况下，Node.js 会将以下内容视为 CommonJS 模块：

* 扩展名为 `.cjs` 的文件。

* 扩展名为 `.js` 或无扩展名的文件，当最近的父级 `package.json` 文件包含顶层字段 [`"type"`][] 且其值为 `"commonjs"` 时。

* 当最近的父级 `package.json` 文件不包含顶层字段 [`"type"`][] 或任何父文件夹中都没有 `package.json` 时，扩展名为 `.js` 或无扩展名的文件；除非文件包含除非作为 ES 模块评估否则会出错的语法。包作者应该包含 [`"type"`][] 字段，即使包中的所有源都是 CommonJS。明确包的 `type` 将使构建工具和加载器更容易确定包中的文件应如何被解释。

* 扩展名不是 `.mjs`、`.cjs`、`.json`、`.node` 或 `.js` 的文件，当最近的父级 `package.json` 文件包含顶层字段 [`"type"`][] 且其值为 `"module"` 时。

参见 [确定模块系统][] 了解更多详情。

调用 `require()` 始终使用 CommonJS 模块加载器。调用 `import()` 始终使用 ECMAScript 模块加载器。

## 访问主模块

<!-- type=misc -->

当文件直接由 Node.js 运行时，`require.main` 被设置为其 `module`。这意味着可以通过测试 `require.main === module` 来确定文件是否被直接运行。

对于文件 `foo.js`，如果通过 `node foo.js` 运行，这将为 `true`，但如果通过 `require('./foo')` 运行，则为 `false`。

当入口点不是 CommonJS 模块时，`require.main` 为 `undefined`，并且主模块无法访问。

## 包管理器提示

<!-- type=misc -->

Node.js `require()` 函数的语义设计得足够通用，以支持合理的目录结构。像 `dpkg`、`rpm` 和 `npm` 这样的包管理器程序有望能够在无需修改的情况下从 Node.js 模块构建原生包。

以下是建议的可行目录结构：

假设我们想让位于 `/usr/lib/node/<some-package>/<some-version>` 的文件夹持有特定版本包的内容。

包可以相互依赖。为了安装包 `foo`，可能需要安装包 `bar` 的特定版本。`bar` 包本身可能有依赖项，在某些情况下，这些依赖项甚至可能冲突或形成循环依赖。

因为 Node.js 查找它加载的任何模块的 `realpath`（即，它解析符号链接），然后 [在 `node_modules` 文件夹中查找它们的依赖项](#loading-from-node_modules-folders)，
这种情况可以通过以下架构解决：

* `/usr/lib/node/foo/1.2.3/`：`foo` 包的内容，版本 1.2.3。
* `/usr/lib/node/bar/4.3.2/`：`foo` 依赖的 `bar` 包的内容。
* `/usr/lib/node/foo/1.2.3/node_modules/bar`：到 `/usr/lib/node/bar/4.3.2/` 的符号链接。
* `/usr/lib/node/bar/4.3.2/node_modules/*`：到 `bar` 依赖的包的符号链接。

因此，即使遇到循环，或者存在依赖冲突，每个模块都能够获得它可以使用的依赖版本。

当 `foo` 包中的代码执行 `require('bar')` 时，它将获取符号链接到 `/usr/lib/node/foo/1.2.3/node_modules/bar` 的版本。然后，当 `bar` 包中的代码调用 `require('quux')` 时，它将获取符号链接到 `/usr/lib/node/bar/4.3.2/node_modules/quux` 的版本。

此外，为了使模块查找过程更加优化，我们可以将包放在 `/usr/lib/node_modules/<name>/<version>` 中，而不是直接放在 `/usr/lib/node` 中。这样 Node.js 就不会费力去 `/usr/node_modules` 或 `/node_modules` 中查找缺失的依赖项。

为了使模块可用于 Node.js REPL，将 `/usr/lib/node_modules` 文件夹添加到 `$NODE_PATH` 环境变量中可能很有用。由于使用 `node_modules` 文件夹的模块查找都是相对的，并且基于调用 `require()` 的文件的真实路径，包本身可以位于任何地方。

## 使用 `require()` 加载 ECMAScript 模块

<!-- YAML
added:
  - v22.0.0
  - v20.17.0
changes:
  - version:
     - v25.4.0
     - v24.15.0
    pr-url: https://github.com/nodejs/node/pull/60959
    description: 此功能不再是实验性的。
  - version:
    - v23.5.0
    - v22.13.0
    - v20.19.0
    pr-url: https://github.com/nodejs/node/pull/56194
    description: "此功能默认不再发出实验性警告，尽管仍可以通过 --trace-require-module 发出警告。"
  - version:
    - v23.0.0
    - v22.12.0
    - v20.19.0
    pr-url: https://github.com/nodejs/node/pull/55085
    description: "此功能不再隐藏在 `--experimental-require-module` CLI 标志后面。"
  - version:
    - v23.0.0
    - v22.12.0
    pr-url: https://github.com/nodejs/node/pull/54563
    description: "在 `require(esm)` 中支持 `'module.exports'` 互操作导出。"
-->

`.mjs` 扩展名保留给 [ECMAScript 模块][]。
参见 [确定模块系统][] 部分了解更多关于哪些文件被解析为 ECMAScript 模块的信息。

`require()` 仅支持加载满足以下要求的 ECMAScript 模块：

* 模块完全是同步的（不包含顶层 `await`）；并且
* 满足以下条件之一：
  1. 文件具有 `.mjs` 扩展名。
  2. 文件具有 `.js` 扩展名，并且最近的 `package.json` 包含 `"type": "module"`
  3. 文件具有 `.js` 扩展名，最近的 `package.json` 不包含
     `"type": "commonjs"`，并且模块包含 ES 模块语法。

如果加载的 ES 模块满足要求，`require()` 可以加载它并返回 [模块命名空间对象][]。在这种情况下，它类似于动态 `import()`，但是同步运行并直接返回命名空间对象。

使用以下 ES 模块：

```mjs
// distance.mjs
export function distance(a, b) { return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2); }
```

```mjs
// point.mjs
export default class Point {
  constructor(x, y) { this.x = x; this.y = y; }
}
```

CommonJS 模块可以使用 `require()` 加载它们：

```cjs
const distance = require('./distance.mjs');
console.log(distance);
// [模块：null 原型] {
//   distance: [函数：distance]
// }

const point = require('./point.mjs');
console.log(point);
// [模块：null 原型] {
//   default: [类 Point],
//   __esModule: true,
// }
```

为了与将 ES 模块转换为 CommonJS 的现有工具互操作，
这些工具随后可以通过 `require()` 加载真正的 ES 模块，如果返回的命名空间具有 `default` 导出，它将包含一个 `__esModule: true` 属性，以便工具生成的消费代码可以识别真正 ES 模块中的默认导出。如果命名空间已经定义了 `__esModule`，则不会添加此属性。
此属性是实验性的，未来可能会更改。它应仅被将 ES 模块转换为 CommonJS 模块的工具使用，遵循现有的生态系统约定。直接用 CommonJS 编写的代码应避免依赖它。

`require()` 返回的结果是 [模块命名空间对象][]，它将默认导出放在 `.default` 属性中，类似于 `import()` 返回的结果。
要自定义 `require(esm)` 直接返回的内容，ES 模块可以使用字符串名称 `"module.exports"` 导出所需的值。

```mjs
// point.mjs
export default class Point {
  constructor(x, y) { this.x = x; this.y = y; }
}

// `distance` 对此模块的 CommonJS 使用者来说会丢失，除非它作为静态属性添加到 `Point`。
export function distance(a, b) { return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2); }
export { Point as 'module.exports' };
```

<!-- eslint-disable node-core/no-duplicate-requires -->

```cjs
const Point = require('./point.mjs');
console.log(Point); // [类 Point]

// 当使用 'module.exports' 时，命名导出会丢失
const { distance } = require('./point.mjs');
console.log(distance); // undefined
```

请注意，在上面的示例中，当使用 `module.exports` 导出名称时，命名导出
会对 CommonJS 消费者丢失。为了让 CommonJS 消费者继续访问
命名导出，模块可以确保默认导出是一个对象，并将命名导出
作为属性附加到它上面。例如，在上面的示例中，
`distance` 可以作为静态方法附加到默认导出 `Point` 类上。

```mjs
export function distance(a, b) { return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2); }

export default class Point {
  constructor(x, y) { this.x = x; this.y = y; }
  static distance = distance;
}

export { Point as 'module.exports' };
```

<!-- eslint-disable node-core/no-duplicate-requires -->

```cjs
const Point = require('./point.mjs');
console.log(Point); // [类 Point]

const { distance } = require('./point.mjs');
console.log(distance); // [函数：distance]
```

如果被 `require()` 的模块包含顶层 `await`，或者它 `import` 的模块图包含顶层 `await`，
将抛出 [`ERR_REQUIRE_ASYNC_MODULE`][]。在这种情况下，用户应使用 [`import()`][] 加载异步模块。

如果启用了 `--experimental-print-required-tla` 且错误未被捕获，
Node.js 将尝试定位 `require()` 的模块图中的顶层 `await`
并将其位置打印到 stderr。

如果使用 `require()` 加载 ES 模块的支持导致意外的破坏，可以使用 `--no-require-module` 禁用它。
要打印此功能的使用位置，使用 [`--trace-require-module`][]。

可以通过检查 [`process.features.require_module`][] 是否为 `true` 来检测此功能。

## 汇总

<!-- type=misc -->

要获取调用 `require()` 时加载的确切文件名，请使用 `require.resolve()` 函数。

综合以上内容，以下是 `require()` 所执行操作的高级算法伪代码：

```text
require(X) from module at path Y
1. 如果 X 是核心模块，
   a. 返回核心模块
   b. 停止
2. 如果 X 以 '/' 开头
   a. 设置 Y 为文件系统根目录
3. 如果 X 等于 '.'，或 X 以 './'、'/' 或 '../' 开头
   a. LOAD_AS_FILE(Y + X)
   b. LOAD_AS_DIRECTORY(Y + X)
   c. 抛出 "not found"
4. 如果 X 以 '#' 开头
   a. LOAD_PACKAGE_IMPORTS(X, dirname(Y))
5. LOAD_PACKAGE_SELF(X, dirname(Y))
6. 如果存在包映射 PACKAGE_MAP，
   a. 查找拥有 Y 的包的包 ID
        1. 设 PARENT_PACKAGE_ID = FIND_PACKAGE_ID(dirname(Y), PACKAGE_MAP)
   b. LOAD_PACKAGE_MAP(X, PARENT_PACKAGE_ID, PACKAGE_MAP)
7. LOAD_NODE_MODULES(X, dirname(Y))
8. 抛出 "not found"

MAYBE_DETECT_AND_LOAD(X)
1. 如果 X 被解析为 CommonJS 模块，则将 X 作为 CommonJS 模块加载。停止。
2. 否则，如果 X 的源代码可以使用 ESM 解析器中定义的 DETECT_MODULE_SYNTAX 解析为 ECMAScript 模块，
  a. 将 X 作为 ECMAScript 模块加载。停止。
3. 在 1 中尝试将 X 解析为 CommonJS 时抛出的 SyntaxError。停止。

LOAD_AS_FILE(X)
1. 如果 X 是一个文件，按其文件扩展格式加载 X。停止
2. 如果 X.js 是一个文件，
    a. 找到离 X 最近的包作用域 SCOPE。
    b. 如果未找到作用域
      1. MAYBE_DETECT_AND_LOAD(X.js)
    c. 如果 SCOPE/package.json 包含 "type" 字段，
      1. 如果 "type" 字段是 "module"，将 X.js 作为 ECMAScript 模块加载。停止。
      2. 如果 "type" 字段是 "commonjs"，将 X.js 作为 CommonJS 模块加载。停止。
    d. MAYBE_DETECT_AND_LOAD(X.js)
3. 如果 X.json 是一个文件，将 X.json 加载为 JavaScript 对象。停止
4. 如果 X.node 是一个文件，将 X.node 作为二进制插件加载。停止

LOAD_INDEX(X)
1. 如果 X/index.js 是一个文件
    a. 找到离 X 最近的包作用域 SCOPE。
    b. 如果未找到作用域，将 X/index.js 作为 CommonJS 模块加载。停止。
    c. 如果 SCOPE/package.json 包含 "type" 字段，
      1. 如果 "type" 字段是 "module"，将 X/index.js 作为 ECMAScript 模块加载。停止。
      2. 否则，将 X/index.js 作为 CommonJS 模块加载。停止。
2. 如果 X/index.json 是一个文件，将 X/index.json 解析为 JavaScript 对象。停止
3. 如果 X/index.node 是一个文件，将 X/index.node 作为二进制插件加载。停止

LOAD_AS_DIRECTORY(X)
1. 如果 X/package.json 是一个文件，
   a. 解析 X/package.json，并查找 "main" 字段。
   b. 如果 "main" 是假值，跳转到 2。
   c. 设 M = X + (json main 字段)
   d. LOAD_AS_FILE(M)
   e. LOAD_INDEX(M)
   f. LOAD_INDEX(X) 已弃用
   g. 抛出 "not found"
2. LOAD_INDEX(X)

LOAD_NODE_MODULES(X, START)
1. 尝试将 X 解释为 NAME 和 SUBPATH 的组合，其中名称
   可能带有 @scope/ 前缀，子路径以斜杠 (`/`) 开头。
2. 设 DIRS = NODE_MODULES_PATHS(START)
3. 对于 DIRS 中的每个 DIR：
   a. LOAD_PACKAGE_EXPORTS(SUBPATH, DIR/NAME)
   b. LOAD_AS_FILE(DIR/X)
   c. LOAD_AS_DIRECTORY(DIR/X)

NODE_MODULES_PATHS(START)
1. 设 PARTS = path split(START)
2. 设 I = PARTS 的数量 - 1
3. 设 DIRS = []
4. 当 I >= 0 时，
   a. 如果 PARTS[I] = "node_modules"，跳转到 d。
   b. DIR = path join(PARTS[0 .. I] + "node_modules")
   c. DIRS = DIRS + DIR
   d. 设 I = I - 1
5. 返回 DIRS + GLOBAL_FOLDERS

FIND_PACKAGE_ID(PATH, PACKAGE_MAP)
1. 查找条目中 "path" 为 PATH 的父目录的 PACKAGE_ID
2. 如果找到多个条目，抛出 "ambiguous resolution"
3. 如果未找到条目，抛出 "external file"。
4. 返回 PACKAGE_ID

LOAD_PACKAGE_MAP(X, PARENT_PACKAGE_ID, PACKAGE_MAP)
1. 尝试将 X 解释为 NAME 和 SUBPATH 的组合，其中名称
   可能带有 @scope/ 前缀，子路径以斜杠 (`/`) 开头。
2. 查找键为 PARENT_PACKAGE_ID 的包映射条目
3. 在该条目的 "dependencies" 映射中查找 NAME。
4. 如果未找到 NAME，抛出 "not found"。
5. 设 TARGET = PACKAGE_MAP.packages[dependencies[name]]
6. 设 PACKAGE_PATH = TARGET 的解析路径。
7. LOAD_PACKAGE_EXPORTS(SUBPATH, PACKAGE_PATH)
8. LOAD_AS_FILE(PACKAGE_PATH/SUBPATH)
9. LOAD_AS_DIRECTORY(PACKAGE_PATH/SUBPATH)
10. 抛出 "not found"

LOAD_PACKAGE_IMPORTS(X, DIR)
1. 找到离 DIR 最近的包作用域 SCOPE。
2. 如果未找到作用域，返回。
3. 如果 SCOPE/package.json "imports" 为 null 或 undefined，返回。
4. 如果未启用 `--no-require-module`
  a. 设 CONDITIONS = ["node", "require", "module-sync"]
  b. 否则，设 CONDITIONS = ["node", "require"]
5. 设 MATCH = ESM 解析器中定义的 PACKAGE_IMPORTS_RESOLVE(X, pathToFileURL(SCOPE),
  CONDITIONS)。
6. RESOLVE_ESM_MATCH(MATCH)。

LOAD_PACKAGE_EXPORTS(SUBPATH, PACKAGE_DIR)
1. 解析 PACKAGE_DIR/package.json，并查找 "exports" 字段。
2. 如果 "exports" 为 null 或 undefined，则返回。
3. 如果未启用 `--no-require-module`
  a. 设 CONDITIONS = ["node", "require", "module-sync"]
  b. 否则，设 CONDITIONS = ["node", "require"]
4. 设 MATCH = ESM 解析器中定义的 PACKAGE_EXPORTS_RESOLVE(pathToFileURL(PACKAGE_DIR), "." + SUBPATH,
   `package.json` "exports", CONDITIONS)。
5. RESOLVE_ESM_MATCH(MATCH)

LOAD_PACKAGE_SELF(X, DIR)
1. 找到离 DIR 最近的包作用域 SCOPE。
2. 如果未找到作用域，返回。
3. 如果 SCOPE/package.json "exports" 为 null 或 undefined，返回。
4. 如果 SCOPE/package.json "name" 不是 X 的第一段，返回。
5. 设 MATCH = ESM 解析器中定义的 PACKAGE_EXPORTS_RESOLVE(pathToFileURL(SCOPE),
   "." + X.slice("name".length), `package.json` "exports", ["node", "require"])
6. RESOLVE_ESM_MATCH(MATCH)

RESOLVE_ESM_MATCH(MATCH)
1. 设 RESOLVED_PATH = fileURLToPath(MATCH)
2. 如果 RESOLVED_PATH 处的文件存在，按其扩展格式加载 RESOLVED_PATH。停止
3. 抛出 "not found"
```

“ESM 解析器”在 [ESM 文档](esm.md#resolution-and-loading-algorithm) 中有定义。

## 缓存

<!--type=misc-->

模块在首次加载后会被缓存。这意味着（除其他外）每次调用 `require('foo')` 都将获得完全相同的对象返回，前提是它解析到相同的文件。

只要 `require.cache` 未被修改，多次调用 `require('foo')` 不会导致模块代码被执行多次。这是一个重要的特性。有了它，可以返回“部分完成”的对象，从而允许加载传递依赖，即使它们会导致循环。

要让模块多次执行代码，请导出一个函数，并调用该函数。

### 模块缓存注意事项

<!--type=misc-->

模块根据其解析后的文件名进行缓存。由于模块可能根据调用模块的位置（从 `node_modules` 文件夹加载）解析到不同的文件名，因此不能_保证_ `require('foo')` 总是返回完全相同的对象，如果它解析到不同的文件。

此外，在不区分大小写的文件系统或操作系统上，不同的解析文件名可能指向同一个文件，但缓存仍会将它们视为不同的模块，并多次重新加载文件。例如，`require('./foo')` 和 `require('./FOO')` 返回两个不同的对象，无论 `./foo` 和 `./FOO` 是否是同一个文件。

## 内置模块

<!--type=misc-->

<!-- YAML
changes:
  - version:
      - v16.0.0
      - v14.18.0
    pr-url: https://github.com/nodejs/node/pull/37246
    description: "为 `require(...)` 添加了 `node:` 导入支持。"
-->

Node.js 有几个编译到二进制文件中的模块。这些模块在本文档的其他部分有更详细的描述。

内置模块在 Node.js 源代码中定义，位于 `lib/` 文件夹中。

内置模块可以使用 `node:` 前缀来识别，在这种情况下，它会绕过 `require` 缓存。例如，`require('node:http')` 将始终返回内置 HTTP 模块，即使 `require.cache` 中有该名称的条目。

如果某些内置模块的标识符传递给 `require()`，它们总是被优先加载。例如，`require('http')` 将始终返回内置 HTTP 模块，即使存在同名的文件。

所有内置模块的列表可以从 [`module.builtinModules`][] 检索。  
列出的模块都不带 `node:` 前缀，除了那些强制要求此类前缀的模块（如下一节所述）。

### 带有强制 `node:` 前缀的内置模块

当被 `require()` 加载时，某些内置模块必须使用 `node:` 前缀请求。此要求旨在防止新引入的内置模块与已经占用该名称的用户空间包发生冲突。目前需要 `node:` 前缀的内置模块有：

* [`node:ffi`][]
* [`node:sea`][]
* [`node:sqlite`][]
* [`node:test`][]
* [`node:test/reporters`][]

这些模块的列表暴露在 [`module.builtinModules`][] 中，包括前缀。

## 循环

<!--type=misc-->

当存在循环 `require()` 调用时，模块在返回时可能尚未完成执行。

考虑这种情况：

`a.js`：

```js
console.log('a starting');
exports.done = false;
const b = require('./b.js');
console.log('in a, b.done = %j', b.done);
exports.done = true;
console.log('a done');
```

`b.js`：

```js
console.log('b starting');
exports.done = false;
const a = require('./a.js');
console.log('in b, a.done = %j', a.done);
exports.done = true;
console.log('b done');
```

`main.js`：

```js
console.log('main starting');
const a = require('./a.js');
const b = require('./b.js');
console.log('in main, a.done = %j, b.done = %j', a.done, b.done);
```

当 `main.js` 加载 `a.js` 时，`a.js` 转而加载 `b.js`。此时，`b.js` 尝试加载 `a.js`。为了防止无限循环，一个 **未完成的副本** 的 `a.js` 导出对象被返回给 `b.js` 模块。然后 `b.js` 完成加载，其 `exports` 对象被提供给 `a.js` 模块。

当 `main.js` 加载完两个模块时，它们都已完成。
因此，该程序的输出将是：

```console
$ node main.js
main starting
a starting
b starting
in b, a.done = false
b done
in a, b.done = true
a done
in main, a.done = true, b.done = true
```

需要仔细规划，才能让应用程序中的循环模块依赖正常工作。

## 文件模块

<!--type:misc-->

如果未找到确切的文件名，Node.js 将尝试加载带有追加扩展名的所需文件名：`.js`、`.json`，最后是 `.node`。当加载具有不同扩展名的文件（例如 `.cjs`）时，必须将其完整名称传递给 `require()`，包括其文件扩展名（例如 `require('./file.cjs')`）。

`.json` 文件被解析为 JSON 文本文件，`.node` 文件被解释为使用 `process.dlopen()` 加载的编译插件模块。使用任何其他扩展名（或根本没有扩展名）的文件被解析为 JavaScript 文本文件。请参阅 [确定模块系统][] 部分以了解将使用什么解析目标。

以 `'/'` 前缀开头的所需模块是文件的绝对路径。例如，`require('/home/marco/foo.js')` 将加载 `/home/marco/foo.js` 处的文件。

以 `'./'` 前缀开头的所需模块相对于调用 `require()` 的文件。也就是说，`circle.js` 必须与 `foo.js` 在同一目录中，`require('./circle')` 才能找到它。

如果没有前导 `'/'`、`'./'` 或 `'../'` 来指示文件，该模块必须是核心模块或从 `node_modules` 文件夹加载。

如果给定路径不存在，`require()` 将抛出 [`MODULE_NOT_FOUND`][] 错误。

## 文件夹作为模块

<!--type:misc-->

> 稳定性：3 - 遗留：请改用 [子路径导出][] 或 [子路径导入][]。

文件夹可以通过三种方式作为参数传递给 `require()`。

第一种是在文件夹的根目录创建一个 [`package.json`][] 文件，指定一个 `main` 模块。例如 [`package.json`][] 文件可能如下所示：

```json
{ "name" : "some-library",
  "main" : "./lib/some-library.js" }
```

如果这位于 `./some-library` 文件夹中，那么 `require('./some-library')` 将尝试加载 `./some-library/lib/some-library.js`。

如果目录中不存在 [`package.json`][] 文件，或者 [`"main"`][] 条目缺失或无法解析，则 Node.js 将尝试从该目录加载 `index.js` 或 `index.node` 文件。例如，如果上一个示例中没有 [`package.json`][] 文件，那么 `require('./some-library')` 将尝试加载：

* `./some-library/index.js`
* `./some-library/index.node`

如果这些尝试都失败了，那么 Node.js 将报告整个模块缺失，并显示默认错误：

```console
Error: Cannot find module 'some-library'
```

在上述所有三种情况下，`import('./some-library')` 调用将导致 [`ERR_UNSUPPORTED_DIR_IMPORT`][] 错误。使用包 [子路径导出][] 或 [子路径导入][] 可以提供与文件夹作为模块相同的包含组织优势，并且适用于 `require` 和 `import`。

## 从 `node_modules` 文件夹加载

<!--type=misc-->

如果传递给 `require()` 的模块标识符不是 [内置](#built-in-modules) 模块，并且不以 `'/'`、`'../'` 或 `'./'` 开头，那么 Node.js 会从当前模块的目录开始，添加 `/node_modules`，并尝试从该位置加载模块。Node.js 不会将 `node_modules` 附加到已经以 `node_modules` 结尾的路径上。

如果在那里没有找到，它会移动到父目录，依此类推，直到到达文件系统的根目录。

例如，如果位于 `'/home/ry/projects/foo.js'` 的文件调用了 `require('bar.js')`，那么 Node.js 将按以下顺序在以下位置查找：

* `/home/ry/projects/node_modules/bar.js`
* `/home/ry/node_modules/bar.js`
* `/home/node_modules/bar.js`
* `/node_modules/bar.js`

这允许程序本地化它们的依赖项，以便它们不会冲突。

可以通过在模块名后包含路径后缀来要求模块分发的特定文件或子模块。例如 `require('example-module/path/to/file')` 将相对于 `example-module` 的位置解析 `path/to/file`。后缀路径遵循相同的模块解析语义。

## 从全局文件夹加载

<!-- type=misc -->

如果 `NODE_PATH` 环境变量设置为冒号分隔的绝对路径列表，那么如果模块在其他地方没有找到，Node.js 将在这些路径中搜索模块。

在 Windows 上，`NODE_PATH` 由分号（`;`）而不是冒号分隔。

`NODE_PATH` 最初是为了在当前 [模块解析][] 算法定义之前支持从不同路径加载模块而创建的。

`NODE_PATH` 仍然受支持，但现在不那么必要了，因为 Node.js 生态系统已经就定位依赖模块的约定达成了共识。有时依赖 `NODE_PATH` 的部署会在人们不知道必须设置 `NODE_PATH` 时表现出令人惊讶的行为。有时模块的依赖项会发生变化，导致在搜索 `NODE_PATH` 时加载不同的版本（甚至是不同的模块）。

此外，Node.js 将在以下 GLOBAL\_FOLDERS 列表中搜索：

* 1: `$HOME/.node_modules`
* 2: `$HOME/.node_libraries`
* 3: `$PREFIX/lib/node`

其中 `$HOME` 是用户的主目录，`$PREFIX` 是 Node.js 配置的 `node_prefix`。

这些主要是出于历史原因。

强烈建议将依赖项放在本地 `node_modules` 文件夹中。这些将加载得更快、更可靠。

## 模块包装器

<!-- type=misc -->

在模块代码执行之前，Node.js 会用如下所示的函数包装器将其包裹起来：

```js
(function(exports, require, module, __filename, __dirname) {
// 模块代码实际位于此处
});
```

通过这样做，Node.js 实现了几件事：

* 它保持顶层变量（用 `var`、`const` 或 `let` 定义）作用于模块而不是全局对象。
* 它有助于提供一些看起来全局但实际上特定于模块的变量，例如：
  * 实现者可用于从模块导出值的 `module` 和 `exports` 对象。
  * 便利变量 `__filename` 和 `__dirname`，包含模块的绝对文件名和目录路径。

## 模块作用域

### `__dirname`

<!-- YAML
added: v0.1.27
-->

* 类型：{string}

当前模块的目录名称。这与 [`path.dirname()`][] 的 [`__filename`][] 相同。

示例：从 `/Users/mjr` 运行 `node example.js`

```js
console.log(__dirname);
// 打印：/Users/mjr
console.log(path.dirname(__filename));
// 打印：/Users/mjr
```

### `__filename`

<!-- YAML
added: v0.0.1
-->

* 类型：{string}

当前模块的文件名。这是当前模块文件的绝对路径，已解析符号链接。

对于主程序，这不一定与命令行中使用的文件名相同。

有关当前模块的目录名称，请参阅 [`__dirname`][]。

示例：

从 `/Users/mjr` 运行 `node example.js`

```js
console.log(__filename);
// 打印：/Users/mjr/example.js
console.log(__dirname);
// 打印：/Users/mjr
```

给定两个模块：`a` 和 `b`，其中 `b` 是 `a` 的依赖项，并且目录结构为：

* `/Users/mjr/app/a.js`
* `/Users/mjr/app/node_modules/b/b.js`

`b.js` 中对 `__filename` 的引用将返回 `/Users/mjr/app/node_modules/b/b.js`，而 `a.js` 中对 `__filename` 的引用将返回 `/Users/mjr/app/a.js`。

### `exports`

<!-- YAML
added: v0.1.12
-->

* 类型：{Object}

对 `module.exports` 的引用，输入更短。有关何时使用 `exports` 以及何时使用 `module.exports` 的详细信息，请参阅关于 [导出快捷方式][] 的部分。

### `module`

<!-- YAML
added: v0.1.16
-->

* 类型：{module}

对当前模块的引用，请参阅关于 [`module` 对象][] 的部分。特别是，`module.exports` 用于定义模块导出什么以及通过 `require()` 提供什么。

### `require(id)`

<!-- YAML
added: v0.1.13
-->

* `id` {string} 模块名称或路径
* 返回值：{any} 导出的模块内容

用于导入模块、`JSON` 和本地文件。模块可以从 `node_modules` 导入。本地模块和 JSON 文件可以使用相对路径（例如 `./`、`./foo`、`./bar/baz`、`../foo`）导入，这将针对由 [`__dirname`][]（如果定义）或当前工作目录命名的目录进行解析。POSIX 样式的相对路径以与操作系统无关的方式解析，意味着上述示例在 Windows 上的工作方式与在 Unix 系统上相同。

```js
// 导入一个本地模块，路径相对于 `__dirname` 或当前
// 工作目录。（在 Windows 上，这将解析为 .\path\myLocalModule。）
const myLocalModule = require('./path/myLocalModule');

// 导入一个 JSON 文件：
const jsonData = require('./path/filename.json');

// 从 node_modules 或 Node.js 内置模块导入模块：
const crypto = require('node:crypto');
```

#### `require.cache`

<!-- YAML
added: v0.3.0
-->

* 类型：{Object}

模块在被 require 时会被缓存到此对象中。通过从此对象中删除键值，下一个 `require` 将重新加载模块。这不适用于 [原生插件][]，重新加载将导致错误。

添加或替换条目也是可能的。在内置模块之前检查此缓存，如果将匹配内置模块的名称添加到缓存中，只有 `node:` 前缀的 require 调用才会接收内置模块。小心使用！

<!-- eslint-disable node-core/no-duplicate-requires, no-restricted-syntax -->

```js
const assert = require('node:assert');
const realFs = require('node:fs');

const fakeFs = {};
require.cache.fs = { exports: fakeFs };

assert.strictEqual(require('fs'), fakeFs);
assert.strictEqual(require('node:fs'), realFs);
```

#### `require.extensions`

<!-- YAML
added: v0.3.0
deprecated:
  - v0.10.6
-->

> 稳定性：0 - 已弃用

* 类型：{Object}

指示 `require` 如何处理某些文件扩展名。

将扩展名为 `.sjs` 的文件作为 `.js` 处理：

```js
require.extensions['.sjs'] = require.extensions['.js'];
```

**已弃用。** 过去，此列表用于通过按需编译将非 JavaScript 模块加载到 Node.js 中。然而，在实践中，有更好的方法可以做到这一点，例如通过其他 Node.js 程序加载模块，或提前将它们编译为 JavaScript。

避免使用 `require.extensions`。使用可能会导致细微的错误，并且随着每个注册的扩展名，解析扩展名会变得更慢。

#### `require.main`

<!-- YAML
added: v0.1.17
-->

* 类型：{module | undefined}

表示启动 Node.js 进程时加载的入口脚本的 `Module` 对象，如果程序的入口点不是 CommonJS 模块，则为 `undefined`。请参阅 ["访问主模块"](#accessing-the-main-module)。

在 `entry.js` 脚本中：

```js
console.log(require.main);
```

```bash
node entry.js
```

<!-- eslint-skip -->

```js
Module {
  id: '.',
  path: '/absolute/path/to',
  exports: {},
  filename: '/absolute/path/to/entry.js',
  loaded: false,
  children: [],
  paths:
   [ '/absolute/path/to/node_modules',
     '/absolute/path/node_modules',
     '/absolute/node_modules',
     '/node_modules' ] }
```

#### `require.resolve(request[, options])`

<!-- YAML
added: v0.3.0
changes:
  - version: v8.9.0
    pr-url: https://github.com/nodejs/node/pull/16397
    description: "现在支持 `paths` 选项。"
-->

* `request` {string} 要解析的模块路径。
* `options` {Object}
  * `paths` {string\[]} 从中解析模块位置的路径。如果存在，这些路径将代替默认解析路径使用，除了 [全局文件夹][GLOBAL\_FOLDERS] 如 `$HOME/.node_modules`，它们总是被包含。这些路径中的每一个都用作模块解析算法的起点，意味着 `node_modules` 层次结构将从此位置检查。
* 返回值：{string}

使用内部 `require()` 机制查找模块的位置，而不是加载模块，只返回解析后的文件名。

如果找不到模块，将抛出 `MODULE_NOT_FOUND` 错误。

##### `require.resolve.paths(request)`

<!-- YAML
added: v8.9.0
-->

* `request` {string} 正在检索其查找路径的模块路径。
* 返回值：{string\[]|null}

返回一个包含在解析 `request` 期间搜索的路径的数组，如果 `request` 字符串引用核心模块（例如 `http` 或 `fs`），则返回 `null`。

## `module` 对象

<!-- YAML
added: v0.1.16
-->

<!-- name=module -->

* 类型：{对象}

在每个模块中，`module` 自由变量是一个引用，指向表示当前模块的对象。为了方便，`module.exports` 也可以通过 `exports` 模块全局变量访问。`module` 实际上不是一个全局变量，而是每个模块局部的。

### `module.children`

<!-- YAML
added: v0.1.16
-->

* 类型：{模块[]}

此模块首次要求的模块对象。

### `module.exports`

<!-- YAML
added: v0.1.16
-->

* 类型：{对象}

`module.exports` 对象由 `Module` 系统创建。有时这是不可接受的；许多人希望他们的模块是某个类的实例。为此，将所需的导出对象赋值给 `module.exports`。将所需对象赋值给 `exports` 只会重新绑定局部 `exports` 变量，这可能不是想要的结果。

例如，假设我们正在制作一个名为 `a.js` 的模块：

```js
const EventEmitter = require('node:events');

module.exports = new EventEmitter();

// 做一些工作，一段时间后发出
// 模块本身的 'ready' 事件。
setTimeout(() => {
  module.exports.emit('ready');
}, 1000);
```

然后在另一个文件中我们可以这样做：

```js
const a = require('./a');
a.on('ready', () => {
  console.log('module "a" is ready');
});
```

对 `module.exports` 的赋值必须立即完成。不能在任何回调中完成。这样不起作用：

`x.js`：

```js
setTimeout(() => {
  module.exports = { a: 'hello' };
}, 0);
```

`y.js`：

```js
const x = require('./x');
console.log(x.a);
```

#### `exports` 快捷方式

<!-- YAML
added: v0.1.16
-->

`exports` 变量在模块的文件级作用域内可用，并且在模块评估之前被赋值为 `module.exports` 的值。

它允许一个快捷方式，因此 `module.exports.f = ...` 可以更简洁地写为 `exports.f = ...`。但是，请注意，像任何变量一样，如果将新值赋值给 `exports`，它不再绑定到 `module.exports`：

```js
module.exports.hello = true; // 从模块的 require 导出
exports = { hello: false };  // 未导出，仅在模块内可用
```

当 `module.exports` 属性被新对象完全替换时，通常也会重新赋值 `exports`：

<!-- eslint-disable node-core/func-name-matching -->

```js
module.exports = exports = function Constructor() {
  // ... 等等。
};
```

为了说明这种行为，想象这个假设的 `require()` 实现，它与 `require()` 实际所做的非常相似：

```js
function require(/* ... */) {
  const module = { exports: {} };
  ((module, exports) => {
    // 模块代码在这里。在此示例中，定义一个函数。
    function someFunc() {}
    exports = someFunc;
    // 此时，exports 不再是 module.exports 的快捷方式，并且
    // 此模块仍将导出一个空的默认对象。
    module.exports = someFunc;
    // 此时，模块现在将导出 someFunc，而不是
    // 默认对象。
  })(module, module.exports);
  return module.exports;
}
```

### `module.filename`

<!-- YAML
added: v0.1.16
-->

* 类型：{字符串}

模块的完全解析文件名。

### `module.id`

<!-- YAML
added: v0.1.16
-->

* 类型：{字符串}

模块的标识符。通常这是完全解析的文件名。

### `module.isPreloading`

<!-- YAML
added:
  - v15.4.0
  - v14.17.0
-->

* 类型：{布尔值} 如果模块在 Node.js 预加载阶段运行，则为 `true`。

### `module.loaded`

<!-- YAML
added: v0.1.16
-->

* 类型：{布尔值}

模块是否已完成加载，或正在加载过程中。

### `module.parent`

<!-- YAML
added: v0.1.16
deprecated:
  - v14.6.0
  - v12.19.0
-->

> 稳定性：0 - 已弃用：请改用 [`require.main`][] 和
> [`module.children`][]。

* 类型：{模块 | null | undefined}

首次要求此模块的模块，如果当前模块是当前进程的入口点则为 `null`，如果模块是由非 CommonJS 模块的内容加载的（例如：REPL 或 `import`），则为 `undefined`。

### `module.path`

<!-- YAML
added: v11.14.0
-->

* 类型：{字符串}

模块的目录名。这通常与 [`module.id`][] 的 [`path.dirname()`][] 相同。

### `module.paths`

<!-- YAML
added: v0.4.0
-->

* 类型：{字符串\[]}

模块的搜索路径。

### `module.require(id)`

<!-- YAML
added: v0.5.1
-->

* `id` {字符串}
* 返回：{任何} 导出的模块内容

`module.require()` 方法提供了一种加载模块的方式，就像 `require()` 是从原始模块中调用的一样。

为了做到这一点，有必要获取 `module` 对象的引用。由于 `require()` 返回 `module.exports`，并且 `module` 通常只在特定模块的代码内可用，因此必须显式导出才能使用。

## `Module` 对象

本节已移至
[模块：`module` 核心模块](module.md#the-module-object)。

<!-- 锚点，用于确保旧链接能够找到目标 -->

* <a id="modules_module_builtinmodules" href="module.html#modulebuiltinmodules">`module.builtinModules`</a>
* <a id="modules_module_createrequire_filename" href="module.html#modulecreaterequirefilename">`module.createRequire(filename)`</a>
* <a id="modules_module_syncbuiltinesmexports" href="module.html#modulesyncbuiltinesmexports">`module.syncBuiltinESMExports()`</a>

## 源映射 v3 支持

本节已移至
[模块：`module` 核心模块](module.md#source-map-support)。

<!-- 锚点用于确保旧链接可以找到目标 -->

* <a id="modules_module_findsourcemap_path_error" href="module.html#modulefindsourcemappath">`module.findSourceMap(path)`</a>
* <a id="modules_class_module_sourcemap" href="module.html#class-modulesourcemap">类：`module.SourceMap`</a>
  * <a id="modules_new_sourcemap_payload" href="module.html#new-sourcemappayload--linelengths-">`new SourceMap(payload)`</a>
  * <a id="modules_sourcemap_payload" href="module.html#sourcemappayload">`sourceMap.payload`</a>
  * <a id="modules_sourcemap_findentry_linenumber_columnnumber" href="module.html#sourcemapfindentrylineoffset-columnoffset">`sourceMap.findEntry(lineNumber, columnNumber)`</a>

[确定模块系统]: packages.md#determining-module-system
[ECMAScript Modules]: esm.md
[GLOBAL_FOLDERS]: #loading-from-the-global-folders
[`"main"`]: packages.md#main
[`"type"`]: packages.md#type
[`--trace-require-module`]: cli.md#--trace-require-modulemode
[`ERR_REQUIRE_ASYNC_MODULE`]: errors.md#err_require_async_module
[`ERR_UNSUPPORTED_DIR_IMPORT`]: errors.md#err_unsupported_dir_import
[`MODULE_NOT_FOUND`]: errors.md#module_not_found
[`__dirname`]: #__dirname
[`__filename`]: #__filename
[`import()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import
[`module.builtinModules`]: module.md#modulebuiltinmodules
[`module.children`]: #modulechildren
[`module.id`]: #moduleid
[`module` 核心模块]: module.md
[`module` 对象]: #the-module-object
[`node:ffi`]: ffi.md
[`node:sea`]: single-executable-applications.md#single-executable-application-api
[`node:sqlite`]: sqlite.md
[`node:test/reporters`]: test.md#test-reporters
[`node:test`]: test.md
[`package.json`]: packages.md#nodejs-packagejson-field-definitions
[`path.dirname()`]: path.md#pathdirnamepath
[`process.features.require_module`]: process.md#processfeaturesrequire_module
[`require.main`]: #requiremain
[exports 快捷方式]: #exports-shortcut
[module 命名空间对象]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import#module_namespace_object
[模块解析]: #all-together
[原生扩展]: addons.md
[子路径导出]: packages.md#subpath-exports
[子路径导入]: packages.md#subpath-imports。
