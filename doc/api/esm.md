# 模块：ECMAScript 模块

<!--introduced_in=v8.5.0-->

<!-- type=misc -->

<!-- YAML
added: v8.5.0
changes:
  - version:
    - v23.1.0
    - v22.12.0
    - v20.18.3
    - v18.20.5
    pr-url: https://github.com/nodejs/node/pull/55333
    description: 导入属性不再是实验性的。
  - version: v22.0.0
    pr-url: https://github.com/nodejs/node/pull/52104
    description: 移除对导入断言的支持。
  - version:
    - v21.0.0
    - v20.10.0
    - v18.20.0
    pr-url: https://github.com/nodejs/node/pull/50140
    description: 添加对导入属性的实验性支持。
  - version:
    - v20.0.0
    - v18.19.0
    pr-url: https://github.com/nodejs/node/pull/44710
    description: 模块自定义钩子在主线程外执行。
  - version:
    - v18.6.0
    - v16.17.0
    pr-url: https://github.com/nodejs/node/pull/42623
    description: 添加对链式模块自定义钩子的支持。
  - version:
    - v17.1.0
    - v16.14.0
    pr-url: https://github.com/nodejs/node/pull/40250
    description: 添加对导入断言的实验性支持。
  - version:
    - v17.0.0
    - v16.12.0
    pr-url: https://github.com/nodejs/node/pull/37468
    description:
      整合自定义钩子，移除 `getFormat`、`getSource`、
      `transformSource` 和 `getGlobalPreloadCode` 钩子
      添加 `load` 和 `globalPreload` 钩子
      允许从 `resolve` 或 `load` 钩子返回 `format`。
  - version:
    - v15.3.0
    - v14.17.0
    - v12.22.0
    pr-url: https://github.com/nodejs/node/pull/35781
    description: 稳定模块实现。
  - version:
    - v14.13.0
    - v12.20.0
    pr-url: https://github.com/nodejs/node/pull/35249
    description: 支持检测 CommonJS 命名导出。
  - version: v14.8.0
    pr-url: https://github.com/nodejs/node/pull/34558
    description: 移除顶层 Await 的标志。
  - version:
    - v14.0.0
    - v13.14.0
    - v12.20.0
    pr-url: https://github.com/nodejs/node/pull/31974
    description: 移除实验性模块警告。
  - version:
    - v13.2.0
    - v12.17.0
    pr-url: https://github.com/nodejs/node/pull/29866
    description: 加载 ECMAScript 模块不再需要命令行标志。
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/26745
    description:
      通过 `package.json` `"type"` 字段添加对使用 `.js` 文件扩展名的 ES 模块的支持。
-->

> 稳定性：2 - 稳定

## 介绍

<!--name=esm-->

ECMAScript 模块是 [官方标准格式][]，用于打包 JavaScript
代码以便复用。模块使用各种 [`import`][] 和
[`export`][] 语句定义。

以下 ES 模块示例导出一个函数：

```js
// addTwo.mjs
function addTwo(num) {
  return num + 2;
}

export { addTwo };
```

以下 ES 模块示例从 `addTwo.mjs` 导入该函数：

```js
// app.mjs
import { addTwo } from './addTwo.mjs';

// 输出：6
console.log(addTwo(4));
```

Node.js 完全支持当前指定的 ECMAScript 模块，并提供它们与其原始模块格式
[CommonJS][] 之间的互操作性。

<!-- Anchors to make sure old links find a target -->

<i id="esm_package_json_type_field"></i><i id="esm_package_scope_and_file_extensions"></i><i id="esm_input_type_flag"></i>

## 启用

<!-- type=misc -->

Node.js 有两个模块系统：[CommonJS][] 模块和 ECMAScript 模块。

作者可以通过 `.mjs`
文件扩展名、`package.json` [`"type"`][] 字段（值为 `"module"`），或 [`--input-type`][] 标志（值为 `"module"`）告诉 Node.js 将 JavaScript 解释为 ES 模块。这些是代码 intended 作为 ES 模块运行的明确标记。

相反，作者可以通过 `.cjs` 文件扩展名、`package.json` [`"type"`][] 字段
（值为 `"commonjs"`），或 [`--input-type`][] 标志（值为
`"commonjs"`）明确告诉 Node.js 将 JavaScript 解释为
CommonJS。

当代码缺少任一模块系统的明确标记时，Node.js 将检查
模块的源代码以查找 ES 模块语法。如果找到此类语法，Node.js 将把代码作为 ES 模块运行；否则它将把
模块作为 CommonJS 运行。详见 [确定模块系统][] 以获取更多详细信息。

<!-- Anchors to make sure old links find a target -->

<i id="esm_package_entry_points"></i><i id="esm_main_entry_point_export"></i><i id="esm_subpath_exports"></i><i id="esm_package_exports_fallbacks"></i><i id="esm_exports_sugar"></i><i id="esm_conditional_exports"></i><i id="esm_nested_conditions"></i><i id="esm_self_referencing_a_package_using_its_name"></i><i id="esm_internal_package_imports"></i><i id="esm_dual_commonjs_es_module_packages"></i><i id="esm_dual_package_hazard"></i><i id="esm_writing_dual_packages_while_avoiding_or_minimizing_hazards"></i><i id="esm_approach_1_use_an_es_module_wrapper"></i><i id="esm_approach_2_isolate_state"></i>

## 包

本节已移至 [模块：包](packages.md)。

## `import` 标识符

### 术语

`import` 语句的_标识符_是 `from` 关键字后的字符串，
例如 `import { sep } from 'node:path'` 中的 `'node:path'`。标识符也
用于 `export from` 语句，以及作为 `import()`
表达式的参数。

标识符有三种类型：

* _相对标识符_，如 `'./startup.js'` 或 `'../config.mjs'`。它们指
  相对于导入文件位置的路径。_这些情况总是需要文件扩展名。_

* _裸标识符_，如 `'some-package'` 或 `'some-package/shuffle'`。它们可以
  指包的名称对应的主入口点，或者如
  示例分别所示的以包名为前缀的包内特定功能模块。_仅对于没有 [`"exports"`][] 字段的包，才需要包含文件扩展名。_

* _绝对标识符_，如 `'file:///opt/nodejs/config.js'`。它们指
  直接且明确地指代完整路径。

裸标识符解析由 [Node.js 模块
解析和加载算法][] 处理。
所有其他标识符解析始终仅使用
标准相对 [URL][] 解析语义进行解析。

与 CommonJS 一样，除非包的 [`package.json`][] 包含
[`"exports"`][] 字段，否则可以通过在包名后附加路径来访问包内的
模块文件，在这种情况下，包内的文件只能
通过 [`"exports"`][] 中定义的路径访问。

有关适用于 Node.js 模块解析中裸标识符的这些包解析规则的详细信息，请参阅 [包文档](packages.md)。

### 强制文件扩展名

使用 `import` 关键字解析
相对或绝对标识符时，必须提供文件扩展名。目录索引（例如 `'./startup/index.js'`）
也必须完全指定。

此行为与 `import` 在浏览器环境中的行为相匹配，假设
服务器配置典型。

### URL

ES 模块作为 URL 解析和缓存。这意味着特殊字符
必须进行 [百分号编码][]，例如 `#` 编码为 `%23`，`?` 编码为 `%3F`。

支持 `file:`、`node:` 和 `data:` URL 方案。除非使用
[自定义 HTTPS 加载器][]，否则 Node.js 原生不支持 `'https://example.com/app.js'` 这样的标识符。

#### `file:` URL

如果用于解析模块的 `import` 标识符具有不同的查询或片段，模块将被加载多次。

```js
import './foo.mjs?query=1'; // 加载 ./foo.mjs，查询为 "?query=1"
import './foo.mjs?query=2'; // 加载 ./foo.mjs，查询为 "?query=2"
```

卷根可以通过 `/`、`//` 或 `file:///` 引用。鉴于
[URL][] 和路径解析之间的差异（例如百分号编码
细节），建议在导入路径时使用 [url.pathToFileURL][]。

#### `data:` 导入

<!-- YAML
added: v12.10.0
-->

导入支持以下 MIME 类型的 [`data:` URL][]：

* `text/javascript` 用于 ES 模块
* `application/json` 用于 JSON
* `application/wasm` 用于 Wasm

```js
import 'data:text/javascript,console.log("hello!");';
import _ from 'data:application/json,"world!"' with { type: 'json' };
```

`data:` URL 仅解析内置模块的 [裸标识符][术语] 和 [绝对标识符][术语]。解析
[相对标识符][术语] 不起作用，因为 `data:` 不是
[特殊方案][]。例如，尝试从 `data:text/javascript,import "./foo";` 加载 `./foo`
会解析失败，因为 `data:` URL 没有相对解析的概念。

#### `node:` 导入

<!-- YAML
added:
  - v14.13.1
  - v12.20.0
changes:
  - version:
      - v16.0.0
      - v14.18.0
    pr-url: https://github.com/nodejs/node/pull/37246
    description: "为 `require(...)` 添加 `node:` 导入支持。"
-->

支持 `node:` URL 作为加载 Node.js 内置
模块的替代方式。此 URL 方案允许通过有效的
绝对 URL 字符串引用内置模块。

```js
import fs from 'node:fs/promises';
```

<a id="import-assertions"></a>

## 导入属性

<!-- YAML
added:
  - v17.1.0
  - v16.14.0
changes:
  - version:
    - v21.0.0
    - v20.10.0
    - v18.20.0
    pr-url: https://github.com/nodejs/node/pull/50140
    description: 从导入断言切换到导入属性。
-->

[导入属性][Import Attributes MDN] 是模块导入
语句的内联语法，用于随模块标识符传递更多信息。

```js
import fooData from './foo.json' with { type: 'json' };

const { default: barData } =
  await import('./bar.json', { with: { type: 'json' } });
```

Node.js 仅支持 `type` 属性，它支持以下值：

| 属性 `type` | 适用于 |
| ---------------- | ---------------- |
| `'json'`         | [JSON 模块][] |

导入 JSON 模块时，`type: 'json'` 属性是强制的。

## 内置模块

[内置模块][] 提供其公共 API 的命名导出。
还提供一个默认导出，其值为 CommonJS 导出的值。
默认导出可用于（除其他外）修改命名
导出。内置模块的命名导出仅通过调用
[`module.syncBuiltinESMExports()`][] 更新。

```js
import EventEmitter from 'node:events';
const e = new EventEmitter();
```

```js
import { readFile } from 'node:fs';
readFile('./foo.txt', (err, source) => {
  if (err) {
    console.error(err);
  } else {
    console.log(source);
  }
});
```

```js
import fs, { readFileSync } from 'node:fs';
import { syncBuiltinESMExports } from 'node:module';
import { Buffer } from 'node:buffer';

fs.readFileSync = () => Buffer.from('Hello, ESM');
syncBuiltinESMExports();

fs.readFileSync === readFileSync;
```

> 导入内置模块时，所有命名导出（即模块导出对象的属性）
> 都会被填充，即使它们没有被单独访问。
> 这可能导致内置模块的初始导入比使用
> `require()` 或 `process.getBuiltinModule()` 加载它们稍慢，后者会立即评估模块导出对象，
> 但其某些属性可能仅在首次单独访问时才初始化。

## `import()` 表达式

[动态 `import()`][] 提供了一种异步导入模块的方式。它在
CommonJS 和 ES 模块中均受支持，可用于加载 CommonJS
和 ES 模块。

## `import.meta`

* 类型：{Object}

`import.meta` 元属性是一个 `Object`，包含以下
属性。它仅在 ES 模块中受支持。

### `import.meta.dirname`

<!-- YAML
added:
  - v21.2.0
  - v20.11.0
changes:
  - version:
     - v24.0.0
     - v22.16.0
    pr-url: https://github.com/nodejs/node/pull/58011
    description: 此属性不再是实验性的。
-->

* 类型：{string} 当前模块的目录名。

这与 [`import.meta.filename`][] 的 [`path.dirname()`][] 相同。

> **注意**：仅存在于 `file:` 模块上。

### `import.meta.filename`

<!-- YAML
added:
  - v21.2.0
  - v20.11.0
changes:
  - version:
     - v24.0.0
     - v22.16.0
    pr-url: https://github.com/nodejs/node/pull/58011
    description: 此属性不再是实验性的。
-->

* 类型：{string} 当前模块的完整绝对路径和文件名，
  已解析符号链接。

这与 [`import.meta.url`][] 的 [`url.fileURLToPath()`][] 相同。

> **注意**：仅本地模块支持此属性。不使用
> `file:` 协议的模块将不提供它。

### `import.meta.url`

* 类型：{string} 模块的绝对 `file:` URL。

它的定义与浏览器中完全相同，提供
当前模块文件的 URL。

这使得一些有用的模式成为可能，例如相对文件加载：

```js
import { readFileSync } from 'node:fs';
const buffer = readFileSync(new URL('./data.proto', import.meta.url));
```

### `import.meta.main`

<!-- YAML
added:
  - v24.2.0
  - v22.18.0
-->

> 稳定性：1.0 - 早期开发

* 类型：{boolean} 当当前模块是当前进程的入口点时为 `true`；否则为 `false`。

等同于 CommonJS 中的 `require.main === module`。

类似于 Python 的 `__name__ == "__main__"`。

```js
export function foo() {
  return 'Hello, world';
}

function main() {
  const message = foo();
  console.log(message);
}

if (import.meta.main) main();
// `foo` 可以从另一个模块导入，而不会受到 `main` 可能的副作用影响
```

### `import.meta.resolve(specifier)`

<!-- YAML
added:
  - v13.9.0
  - v12.16.2
changes:
  - version:
    - v20.6.0
    - v18.19.0
    pr-url: https://github.com/nodejs/node/pull/49028
    description: "不再位于 `--experimental-import-meta-resolve` CLI 标志之后，非标准 `parentURL` 参数除外。"
  - version:
    - v20.6.0
    - v18.19.0
    pr-url: https://github.com/nodejs/node/pull/49038
    description: "当针对不映射到本地文件系统上现有文件的 `file:` URL 时，此 API 不再抛出异常。"
  - version:
    - v20.0.0
    - v18.19.0
    pr-url: https://github.com/nodejs/node/pull/44710
    description: 此 API 现在同步返回字符串，而不是 Promise。
  - version:
      - v16.2.0
      - v14.18.0
    pr-url: https://github.com/nodejs/node/pull/38587
    description: "为 `parentURL` 参数添加对 WHATWG `URL` 对象的支持。"
-->

> 稳定性：1.2 - 发布候选

* `specifier` {string} 相对于当前模块要解析的模块标识符。
* 返回值：{string} 标识符将解析到的绝对 URL 字符串。

[`import.meta.resolve`][] 是一个限定于
每个模块的模块相对解析函数，返回 URL 字符串。

```js
const dependencyAsset = import.meta.resolve('component-lib/asset.css');
// file:///app/node_modules/component-lib/asset.css
import.meta.resolve('./dep.js');
// file:///app/dep.js
```

支持 Node.js 模块解析的所有功能。依赖项
解析受包内允许的导出解析约束。

**注意**：

* 这可能导致同步文件系统操作，从而
  像 `require.resolve` 一样影响性能。
* 此功能在自定义加载器中不可用（它会
  造成死锁）。

**非标准 API**：

使用 `--experimental-import-meta-resolve` 标志时，该函数接受
第二个参数：

* `parent` {string|URL} 一个可选的绝对父模块 URL，用于从中解析。
  **默认值：** `import.meta.url`

## 与 CommonJS 的互操作性

### `import` 语句

`import` 语句可以引用 ES 模块或 CommonJS 模块。
`import` 语句仅允许在 ES 模块中使用，但动态 [`import()`][]
表达式在 CommonJS 中受支持，用于加载 ES 模块。

当导入 [CommonJS 模块](#commonjs-namespaces) 时，
`module.exports` 对象作为默认导出提供。命名导出可能
可用，由静态分析提供，以便于更好的生态系统兼容性。

### `require`

CommonJS 模块 `require` 目前仅支持加载同步 ES
模块（即，不使用顶层 `await` 的 ES 模块）。

详见 [使用 `require()` 加载 ECMAScript 模块][]。

### CommonJS 命名空间

<!-- YAML
added: v14.13.0
changes:
  - version: v23.0.0
    pr-url: https://github.com/nodejs/node/pull/53848
    description: "为 CJS 命名空间添加了 `'module.exports'` 导出标记。"
-->

CommonJS 模块由一个 `module.exports` 对象组成，它可以是任何类型。

为了支持这一点，当从 ECMAScript 模块导入 CommonJS 时，会为
CommonJS 模块构建一个命名空间包装器，它始终提供一个
指向 CommonJS `module.exports` 值的 `default` 导出键。

此外，对 CommonJS 模块的源文本执行启发式静态分析，以尽力获取
`module.exports` 上值的静态导出列表，以便在命名空间上提供。这是必要的，因为这些
命名空间必须在评估 CJS 模块之前构建。

这些 CommonJS 命名空间对象还将 `default` 导出作为
`'module.exports'` 命名导出提供，以明确表明它们在
CommonJS 中的表示使用此值，而不是命名空间值。这
反映了 [`require(esm)`][] 互操作性支持中处理 `'module.exports'` 导出名称的语义。

导入 CommonJS 模块时，可以使用 ES
模块默认导入或其对应的语法糖可靠地导入：

<!-- eslint-disable no-duplicate-imports -->

```js
import { default as cjs } from 'cjs';
// 与上面相同
import cjsSugar from 'cjs';

console.log(cjs);
console.log(cjs === cjsSugar);
// 输出：
//   <module.exports>
//   true
```

当使用 `import * as m from 'cjs'` 或动态导入时，可以直接观察到此
模块命名空间奇特对象：

```js
import * as m from 'cjs';
console.log(m);
console.log(m === await import('cjs'));
// 输出：
//   [Module] { default: <module.exports>, 'module.exports': <module.exports> }
//   true
```

为了更好地兼容 JS 生态系统中的现有用法，Node.js
还尝试确定每个导入的
CommonJS 模块的 CommonJS 命名导出，以便使用静态
分析过程将它们作为单独的 ES 模块导出提供。

例如，考虑一个编写如下 的 CommonJS 模块：

```cjs
// cjs.cjs
exports.name = 'exported';
```

上述模块支持 ES 模块中的命名导入：

<!-- eslint-disable no-duplicate-imports -->

```js
import { name } from './cjs.cjs';
console.log(name);
// 输出：'exported'

import cjs from './cjs.cjs';
console.log(cjs);
// 输出：{ name: 'exported' }

import * as m from './cjs.cjs';
console.log(m);
// 输出：
//   [Module] {
//     default: { name: 'exported' },
//     'module.exports': { name: 'exported' },
//     name: 'exported'
//   }
```

从最后一个示例可以看出，当导入模块时，`name` 导出从 `module.exports` 对象复制并直接设置在
ES 模块命名空间上。

对于这些命名导出，不会检测到对 `module.exports` 的实时绑定更新或添加的新导出。

命名导出的检测基于常见的语法模式，但并不总能正确检测到命名导出。在这些情况下，使用上述
默认导入形式可能是更好的选择。

命名导出检测涵盖了许多常见的导出模式、重新导出模式
以及构建工具和转译器的输出。详见 [merve][] 以了解实现的准确
语义。

### ES 模块和 CommonJS 之间的差异

#### 没有 `require`、`exports` 或 `module.exports`

在大多数情况下，ES 模块 `import` 可用于加载 CommonJS 模块。

如果需要，可以使用 [`module.createRequire()`][] 在 ES 模块中构建 `require` 函数。

#### 没有 `__filename` 或 `__dirname`

这些 CommonJS 变量在 ES 模块中不可用。

`__filename` 和 `__dirname` 的用例可以通过
[`import.meta.filename`][] 和 [`import.meta.dirname`][] 复制。

#### 没有加载附加组件

[附加组件][] 目前不支持使用 ES 模块导入。

它们可以改为使用 [`module.createRequire()`][] 或
[`process.dlopen`][] 加载。

#### 没有 `require.main`

要替换 `require.main === module`，可以使用 [`import.meta.main`][] API。

#### 没有 `require.resolve`

相对解析可以通过 `new URL('./local', import.meta.url)` 处理。

对于完整的 `require.resolve` 替换，有
[import.meta.resolve][] API。

或者可以使用 `module.createRequire()`。

#### 没有 `NODE_PATH`

`NODE_PATH` 不是解析 `import` 标识符的一部分。如果需要此行为，请使用符号链接。

#### 没有 `require.extensions`

`require.extensions` 不被 `import` 使用。模块自定义钩子可以提供替代方案。

#### 没有 `require.cache`

`require.cache` 不被 `import` 使用，因为 ES 模块加载器有自己
独立的缓存。

<i id="esm_experimental_json_modules"></i>

## JSON 模块

<!-- YAML
changes:
  - version:
    - v23.1.0
    - v22.12.0
    - v20.18.3
    - v18.20.5
    pr-url: https://github.com/nodejs/node/pull/55333
    description: JSON 模块不再是实验性的。
-->

JSON 文件可以通过 `import` 引用：

```js
import packageConfig from './package.json' with { type: 'json' };
```

`with { type: 'json' }` 语法是强制的；详见 [导入属性][]。

导入的 JSON 仅暴露一个 `default` 导出。不支持命名
导出。在 CommonJS 缓存中创建一个缓存条目以避免重复。
如果 JSON 模块已从相同路径导入，则在 CommonJS 中返回
相同的对象。

<i id="esm_experimental_wasm_modules"></i>

## Wasm 模块

<!-- YAML
changes:
  - version:
     - v24.5.0
     - v22.19.0
    pr-url: https://github.com/nodejs/node/pull/57038
    description: "Wasm 模块不再需要 `--experimental-wasm-modules` 标志。"
-->

支持导入 WebAssembly 模块实例和 WebAssembly 源阶段导入。

这两种集成都符合
[WebAssembly 的 ES 模块集成提案][]。

### Wasm 源阶段导入

> 稳定性：1.2 - 发布候选

<!-- YAML
added: v24.0.0
-->

[源阶段导入][] 提案允许 `import source` 关键字组合直接导入 `WebAssembly.Module` 对象，而不是获取已经实例化及其依赖的模块实例。

这在需要为 Wasm 自定义实例化，同时仍然通过 ES 模块集成解析和加载它时非常有用。

例如，要创建模块的多个实例，或将自定义导入传递给 `library.wasm` 的新实例：

```js
import source libraryModule from './library.wasm';

const instance1 = await WebAssembly.instantiate(libraryModule, importObject1);

const instance2 = await WebAssembly.instantiate(libraryModule, importObject2);
```

除了静态源阶段外，还有一种通过 `import.source` 动态阶段导入语法的动态变体：

```js
const dynamicLibrary = await import.source('./library.wasm');

const instance = await WebAssembly.instantiate(dynamicLibrary, importObject);
```

### JavaScript 字符串内置函数

> 稳定性：1.2 - 发布候选

<!-- YAML
added:
 - v24.5.0
 - v22.19.0
-->

导入 WebAssembly 模块时，
[WebAssembly JS 字符串内置函数提案][] 会通过 ESM 集成自动启用。这允许 WebAssembly 模块直接使用来自 `wasm:js-string` 命名空间的高效编译时字符串内置函数。

例如，以下 Wasm 模块使用 `wasm:js-string` `length` 内置函数导出一个字符串 `getLength` 函数：

```text
(module
  ;; 字符串长度内置函数的编译时导入。
  (import "wasm:js-string" "length" (func $string_length (param externref) (result i32)))

  ;; 定义 getLength，接受一个假定为字符串的 JS 值参数，
  ;; 在其上调用字符串长度并返回结果。
  (func $getLength (param $str externref) (result i32)
    local.get $str
    call $string_length
  )

  ;; 导出 getLength 函数。
  (export "getLength" (func $get_length))
)
```

```js
import { getLength } from './string-len.wasm';
getLength('foo'); // 返回 3。
```

Wasm 内置函数是编译时导入，在模块编译期间链接，而不是在实例化期间。它们的行为不像正常的模块图导入，并且无法通过 `WebAssembly.Module.imports(mod)` 检查或虚拟化，除非使用禁用了字符串内置函数的直接 `WebAssembly.compile` API 重新编译模块。

还可以从 `wasm:js/string-constants` 内置导入 URL 导入字符串常量，允许定义静态 JS 字符串全局变量：

```text
(module
  (import "wasm:js/string-constants" "hello" (global $hello externref))
)
```

在实例化之前以源阶段导入模块也会自动使用编译时内置函数：

```js
import source mod from './string-len.wasm';
const { exports: { getLength } } = await WebAssembly.instantiate(mod, {});
getLength('foo'); // 也返回 3。
```

### Wasm 实例阶段导入

> 稳定性：1.1 - 积极开发中

实例导入允许将任何 `.wasm` 文件作为普通模块导入，进而支持它们的模块导入。

例如，一个包含以下内容的 `index.js`：

```js
import * as M from './library.wasm';
console.log(M);
```

在以下环境下执行：

```bash
node index.mjs
```

将提供 `library.wasm` 实例化的导出接口。

### 保留的 Wasm 命名空间

<!-- YAML
added:
 - v24.5.0
 - v22.19.0
-->

导入 WebAssembly 模块实例时，它们不能使用以保留前缀开头的导入模块名或导入/导出名：

* `wasm-js:` - 在所有模块导入名、模块名和导出名中保留。
* `wasm:` - 在模块导入名和导出名中保留（允许导入模块名以支持未来的内置函数填充）。

使用上述保留名称导入模块将抛出 `WebAssembly.LinkError`。

<i id="esm_experimental_top_level_await"></i>

## 顶层 `await`

<!-- YAML
added: v14.8.0
-->

`await` 关键字可用于 ECMAScript 模块的顶层主体中。

假设有一个 `a.mjs` 包含

```js
export const five = await Promise.resolve(5);
```

还有一个 `b.mjs` 包含

```js
import { five } from './a.mjs';

console.log(five); // 输出 `5`
```

```bash
node b.mjs # 可行
```

如果顶层 `await` 表达式从未解析，`node` 进程将以 `13` [状态码][] 退出。

```js
import { spawn } from 'node:child_process';
import { execPath } from 'node:process';

spawn(execPath, [
  '--input-type=module',
  '--eval',
  // 永不解析的 Promise：
  'await new Promise(() => {})',
]).once('exit', (code) => {
  console.log(code); // 输出 `13`
});
```

<i id="esm_experimental_loaders"></i>

## 加载器

以前的加载器文档现在位于
[模块：自定义钩子][模块自定义钩子]。

## 解析和加载算法

### 特性

默认解析器具有以下属性：

* 使用 ES 模块的基于 FileURL 的解析
* 相对和绝对 URL 解析
* 无默认扩展名
* 无文件夹主文件
* 通过 node\_modules 进行裸标识符包解析查找
* 不会因未知扩展名或协议而失败
* 可以选择向加载阶段提供格式提示

默认加载器具有以下属性

* 支持通过 `node:` URL 加载内置模块
* 支持通过 `data:` URL 加载“内联”模块
* 支持 `file:` 模块加载
* 在任何其他 URL 协议上失败
* 在 `file:` 加载的未知扩展名上失败
  （仅支持 `.cjs`、`.js` 和 `.mjs`）

### 解析算法

加载 ES 模块标识符的算法通过下面的 **ESM_RESOLVE** 方法给出。它返回相对于 parentURL 的模块标识符的解析 URL。

解析算法确定模块加载的完整解析 URL 及其建议的模块格式。解析算法不确定解析的 URL 协议是否可以加载，或文件扩展名是否被允许，相反，这些验证由 Node.js 在加载阶段应用
（例如，如果它被要求加载一个协议不是 `file:`、`data:` 或 `node:` 的 URL。

该算法还尝试根据扩展名确定文件的格式（参见下面的 `ESM_FILE_FORMAT` 算法）。如果它无法识别文件扩展名（例如，如果它不是 `.mjs`、`.cjs` 或 `.json`），则返回 `undefined` 格式，
这将在加载阶段抛出。

确定解析 URL 的模块格式的算法由 **ESM_FILE_FORMAT** 提供，它返回任何文件的唯一模块格式。对于 ECMAScript 模块，返回 _"module"_ 格式，而 _"commonjs"_ 格式用于指示通过传统 CommonJS 加载器加载。其他格式如 _"addon"_ 可以在未来更新中扩展。

在以下算法中，除非另有说明，所有子程序错误都将作为这些顶层例程的错误传播。

_defaultConditions_ 是条件环境名称数组，
`["node", "import"]`。

解析器可以抛出以下错误：

* _无效模块标识符_：模块标识符是无效的 URL、包名或包子路径标识符。
* _无效包配置_：package.json 配置无效或包含无效配置。
* _无效包目标_：包导出或导入为包定义的目标模块是无效的类型或字符串目标。
* _包路径未导出_：包导出未定义或允许给定模块的包中的目标子路径。
* _包导入未定义_：包导入未定义标识符。
* _模块未找到_：请求的包或模块不存在。
* _不支持的目录导入_：解析的路径对应于一个目录，这不是模块导入支持的目标。

### 解析算法规范

**ESM_RESOLVE**(_specifier_, _parentURL_)

> 1. 令 _resolved_ 为 **undefined**。
> 2. 如果 _specifier_ 是有效 URL，则
>    1. 将 _resolved_ 设置为解析和重新序列化 _specifier_ 为 URL 的结果。
> 3. 否则，如果 _specifier_ 始于 _"/"_、_"./"_ 或 _"../"_，则
>    1. 将 _resolved_ 设置为 _specifier_ 相对于 _parentURL_ 的 URL 解析。
> 4. 否则，如果 _specifier_ 始于 _"#"_, 则
>    1. 将 _resolved_ 设置为 **PACKAGE_IMPORTS_RESOLVE**(_specifier_, _parentURL_, _defaultConditions_) 的结果。
> 5. 否则，
>    1. 注意：_specifier_ 现在是一个裸标识符。
>    2. 将 _resolved_ 设置为 **PACKAGE_RESOLVE**(_specifier_, _parentURL_) 的结果。
> 6. 令 _format_ 为 **undefined**。
> 7. 如果 _resolved_ 是 _"file:"_ URL，则
>    1. 如果 _resolved_ 包含任何 _"/"_ 或 _"\\"_ 的百分号编码（分别为 _"%2F"_ 和 _"%5C"_），则
>       1. 抛出 _无效模块标识符_ 错误。
>    2. 如果 _resolved_ 处的文件是一个目录，则
>       1. 抛出 _不支持的目录导入_ 错误。
>    3. 如果 _resolved_ 处的文件不存在，则
>       1. 抛出 _模块未找到_ 错误。
>    4. 将 _resolved_ 设置为 _resolved_ 的真实路径，保持相同的 URL 查询字符串和片段组件。
>    5. 将 _format_ 设置为 **ESM_FILE_FORMAT**(_resolved_) 的结果。
> 8. 否则，
>    1. 将 _format_ 设置为与 URL _resolved_ 关联的内容类型的模块格式。
> 9. 返回 _format_ 和 _resolved_ 到加载阶段

**PACKAGE_RESOLVE**(_packageSpecifier_, _parentURL_)

> 1. 令 _packageName_ 为 **undefined**。
> 2. 如果 _packageSpecifier_ 是空字符串，则
>    1. 抛出 _无效模块标识符_ 错误。
> 3. 如果 _packageSpecifier_ 是 Node.js 内置模块名，则
>    1. 返回字符串 _"node:"_ 拼接 _packageSpecifier_。
> 4. 如果 _packageSpecifier_ 不始于 _"@"_，则
>    1. 将 _packageName_ 设置为 _packageSpecifier_ 的子串，直到第一个 _"/"_ 分隔符或字符串末尾。
> 5. 否则，
>    1. 如果 _packageSpecifier_ 不包含 _"/"_ 分隔符，则
>       1. 抛出 _无效模块标识符_ 错误。
>    2. 将 _packageName_ 设置为 _packageSpecifier_ 的子串，直到第二个 _"/"_ 分隔符或字符串末尾。
> 6. 如果 _packageName_ 始于 _"."_ 或包含 _"\\"_ 或 _"%"_，则
>    1. 抛出 _无效模块标识符_ 错误。
> 7. 令 _packageSubpath_ 为 _"."_ 拼接 _packageSpecifier_ 从 _packageName_ 长度位置开始的子串。
> 8. 令 _selfUrl_ 为 **PACKAGE_SELF_RESOLVE**(_packageName_, _packageSubpath_, _parentURL_) 的结果。
> 9. 如果 _selfUrl_ 不为 **undefined**，返回 _selfUrl_。
> 10. 当 _parentURL_ 不是文件系统根目录时，
>     1. 令 _packageURL_ 为 _"node_modules/"_ 拼接 _packageName_ 相对于 _parentURL_ 的 URL 解析。
>     2. 将 _parentURL_ 设置为 _parentURL_ 的父文件夹 URL。
>     3. 如果 _packageURL_ 处的文件夹不存在，则
>        1. 继续下一个循环迭代。
>     4. 令 _pjson_ 为 **READ_PACKAGE_JSON**(_packageURL_) 的结果。
>     5. 如果 _pjson_ 不为 **null** 且 _pjson_._exports_ 不为 **null** 或 **undefined**，则
>        1. 返回 **PACKAGE_EXPORTS_RESOLVE**(_packageURL_, _packageSubpath_, _pjson.exports_, _defaultConditions_) 的结果。
>     6. 否则，如果 _packageSubpath_ 等于 _"."_，则
>        1. 如果 _pjson.main_ 是字符串，则
>           1. 返回 _packageURL_ 中 _main_ 的 URL 解析。
>     7. 否则，
>        1. 返回 _packageURL_ 中 _packageSubpath_ 的 URL 解析。
> 11. 抛出 _模块未找到_ 错误。

**PACKAGE_SELF_RESOLVE**(_packageName_, _packageSubpath_, _parentURL_)

> 1. 令 _packageURL_ 为 **LOOKUP_PACKAGE_SCOPE**(_parentURL_) 的结果。
> 2. 如果 _packageURL_ 为 **null**，则
>    1. 返回 **undefined**。
> 3. 令 _pjson_ 为 **READ_PACKAGE_JSON**(_packageURL_) 的结果。
> 4. 如果 _pjson_ 为 **null** 或 _pjson_._exports_ 为 **null** 或 **undefined**，则
>    1. 返回 **undefined**。
> 5. 如果 _pjson.name_ 等于 _packageName_，则
>    1. 返回 **PACKAGE_EXPORTS_RESOLVE**(_packageURL_, _packageSubpath_, _pjson.exports_, _defaultConditions_) 的结果。
> 6. 否则，返回 **undefined**。

**PACKAGE_EXPORTS_RESOLVE**(_packageURL_, _subpath_, _exports_, _conditions_)

注意：此函数由 CommonJS 解析算法直接调用。

> 1. 如果 _exports_ 是一个对象，同时包含始于 _"."_ 的键和不始于 _"."_ 的键，抛出 _无效包配置_ 错误。
> 2. 如果 _subpath_ 等于 _"."_，则
>    1. 令 _mainExport_ 为 **undefined**。
>    2. 如果 _exports_ 是字符串或数组，或包含没有始于 _"."_ 的键的对象，则
>       1. 将 _mainExport_ 设置为 _exports_。
>    3. 否则如果 _exports_ 是包含 _"."_ 属性的对象，则
>       1. 将 _mainExport_ 设置为 _exports_\[_"."_]。
>    4. 如果 _mainExport_ 不为 **undefined**，则
>       1. 令 _resolved_ 为 **PACKAGE_TARGET_RESOLVE**(_packageURL_, _mainExport_, **null**, **false**, _conditions_) 的结果。
>       2. 如果 _resolved_ 不为 **null** 或 **undefined**，返回 _resolved_。
> 3. 否则，如果 _exports_ 是对象且 _exports_ 的所有键都始于 _"."_，则
>    1. 断言：_subpath_ 始于 _"./"_。
>    2. 令 _resolved_ 为 **PACKAGE_IMPORTS_EXPORTS_RESOLVE**(_subpath_, _exports_, _packageURL_, **false**, _conditions_) 的结果。
>    3. 如果 _resolved_ 不为 **null** 或 **undefined**，返回 _resolved_。
> 4. 抛出 _包路径未导出_ 错误。

**PACKAGE_IMPORTS_RESOLVE**(_specifier_, _parentURL_, _conditions_)

注意：此函数由 CommonJS 解析算法直接调用。

> 1. 断言：_specifier_ 始于 _"#"_.
> 2. 如果 _specifier_ 完全等于 _"#"_, 则
>    1. 抛出 _无效模块标识符_ 错误。
> 3. 令 _packageURL_ 为 **LOOKUP_PACKAGE_SCOPE**(_parentURL_) 的结果。
> 4. 如果 _packageURL_ 不为 **null**，则
>    1. 令 _pjson_ 为 **READ_PACKAGE_JSON**(_packageURL_) 的结果。
>    2. 如果 _pjson.imports_ 是非空对象，则
>       1. 令 _resolved_ 为 **PACKAGE_IMPORTS_EXPORTS_RESOLVE**(_specifier_, _pjson.imports_, _packageURL_, **true**, _conditions_) 的结果。
>       2. 如果 _resolved_ 不为 **null** 或 **undefined**，返回 _resolved_。
> 5. 抛出 _包导入未定义_ 错误。

**PACKAGE_IMPORTS_EXPORTS_RESOLVE**(_matchKey_, _matchObj_, _packageURL_, _isImports_, _conditions_)

> 1. 如果 _matchKey_ 终于 _"/"_，则
>    1. 抛出 _无效模块标识符_ 错误。
> 2. 如果 _matchKey_ 是 _matchObj_ 的键且不包含 _"\*"_, 则
>    1. 令 _target_ 为 _matchObj_\[_matchKey_] 的值。
>    2. 返回 **PACKAGE_TARGET_RESOLVE**(_packageURL_, _target_, **null**, _isImports_, _conditions_) 的结果。
> 3. 令 _expansionKeys_ 为 _matchObj_ 的键列表，仅包含单个 _"\*"_, 按排序函数 **PATTERN_KEY_COMPARE** 排序，该函数按特异性降序排列。
> 4. 对于 _expansionKeys_ 中的每个键 _expansionKey_，执行
>    1. 令 _patternBase_ 为 _expansionKey_ 的子串，直到但不包括第一个 _"\*"_ 字符。
>    2. 如果 _matchKey_ 始于但不等于 _patternBase_，则
>       1. 令 _patternTrailer_ 为 _expansionKey_ 从第一个 _"\*"_ 字符后的索引开始的子串。
>       2. 如果 _patternTrailer_ 长度为零，或如果 _matchKey_ 终于 _patternTrailer_ 且 _matchKey_ 的长度大于或等于 _expansionKey_ 的长度，则
>          1. 令 _target_ 为 _matchObj_\[_expansionKey_] 的值。
>          2. 令 _patternMatch_ 为 _matchKey_ 的子串，始于 _patternBase_ 长度的索引，直到 _matchKey_ 长度减去 _patternTrailer_ 长度。
>          3. 返回 **PACKAGE_TARGET_RESOLVE**(_packageURL_, _target_, _patternMatch_, _isImports_, _conditions_) 的结果。
> 5. 返回 **null**。

**PATTERN_KEY_COMPARE**(_keyA_, _keyB_)

> 1. 断言：_keyA_ 仅包含单个 _"\*"_.
> 2. 断言：_keyB_ 仅包含单个 _"\*"_.
> 3. 令 _baseLengthA_ 为 _keyA_ 中 _"\*"_ 的索引。
> 4. 令 _baseLengthB_ 为 _keyB_ 中 _"\*"_ 的索引。
> 5. 如果 _baseLengthA_ 大于 _baseLengthB_，返回 -1。
> 6. 如果 _baseLengthB_ 大于 _baseLengthA_，返回 1。
> 7. 如果 _keyA_ 的长度大于 _keyB_ 的长度，返回 -1。
> 8. 如果 _keyB_ 的长度大于 _keyA_ 的长度，返回 1。
> 9. 返回 0。

**PACKAGE_TARGET_RESOLVE**(_packageURL_, _target_, _patternMatch_, _isImports_, _conditions_)

> 1. 如果 _target_ 是字符串，则
>    1. 如果 _target_ 不始于 _"./"_，则
>       1. 如果 _isImports_ 为 **false**，或如果 _target_ 始于 _"../"_ 或 _"/"_，或如果 _target_ 是有效 URL，则
>          1. 抛出 _无效包目标_ 错误。
>       2. 如果 _patternMatch_ 是字符串，则
>          1. 返回 **PACKAGE_RESOLVE**(_target_ 的每个 _"\*"_ 实例被 _patternMatch_ 替换，_packageURL_ + _"/"_)。
>       3. 返回 **PACKAGE_RESOLVE**(_target_, _packageURL_ + _"/"_)。
>    2. 如果 _target_ 按 _"/"_ 或 _"\\"_ 分割后在第一个 _"."_ 段之后包含任何 _""_、_ "."_、_ ".."_ 或 _"node_modules"_ 段，不区分大小写且包括百分号编码变体，抛出 _无效包目标_ 错误。
>    3. 令 _resolvedTarget_ 为 _packageURL_ 和 _target_ 拼接的 URL 解析。
>    4. 断言：_packageURL_ 包含于 _resolvedTarget_。
>    5. 如果 _patternMatch_ 为 **null**，则
>       1. 返回 _resolvedTarget_。
>    6. 如果 _patternMatch_ 按 _"/"_ 或 _"\\"_ 分割后包含任何 _""_、_ "."_、_ ".."_ 或 _"node_modules"_ 段，不区分大小写且包括百分号编码变体，抛出 _无效模块标识符_ 错误。
>    7. 返回 _resolvedTarget_ 的 URL 解析，其中每个 _"\*"_ 实例被 _patternMatch_ 替换。
> 2. 否则，如果 _target_ 是非空对象，则
>    1. 如果 _target_ 包含任何索引属性键，如 ECMA-262 [6.1.7 数组索引][] 中定义，抛出 _无效包配置_ 错误。
>    2. 对于 _target_ 的每个属性 _p_，按对象插入顺序，
>       1. 如果 _p_ 等于 _"default"_ 或 _conditions_ 包含 _p_ 的条目，则
>          1. 令 _targetValue_ 为 _target_ 中 _p_ 属性的值。
>          2. 令 _resolved_ 为 **PACKAGE_TARGET_RESOLVE**(_packageURL_, _targetValue_, _patternMatch_, _isImports_, _conditions_) 的结果。
>          3. 如果 _resolved_ 等于 **undefined**，继续循环。
>          4. 返回 _resolved_。
>    3. 返回 **undefined**。
> 3. 否则，如果 _target_ 是数组，则
>    1. 如果 \_target.length 为零，返回 **null**。
>    2. 对于 _target_ 中的每个项 _targetValue_，执行
>       1. 令 _resolved_ 为 **PACKAGE_TARGET_RESOLVE**(_packageURL_, _targetValue_, _patternMatch_, _isImports_, _conditions_) 的结果，在任何 _无效包目标_ 错误上继续循环。
>       2. 如果 _resolved_ 为 **undefined**，继续循环。
>       3. 返回 _resolved_。
>    3. 返回或抛出最后一个回退解析 **null** 返回或错误。
> 4. 否则，如果 _target_ 为 _null_，返回 **null**。
> 5. 否则抛出 _无效包目标_ 错误。

**ESM_FILE_FORMAT**(_url_)

> 1. 断言：_url_ 对应于现有文件。
> 2. 如果 _url_ 终于 _".mjs"_，则
>    1. 返回 _"module"_。
> 3. 如果 _url_ 终于 _".cjs"_，则
>    1. 返回 _"commonjs"_。
> 4. 如果 _url_ 终于 _".json"_，则
>    1. 返回 _"json"_。
> 5. 如果 _url_ 终于 _".wasm"_，则
>    1. 返回 _"wasm"_。
> 6. 如果 `--experimental-addon-modules` 启用且 _url_ 终于 _".node"_，则
>    1. 返回 _"addon"_。
> 7. 令 _packageURL_ 为 **LOOKUP_PACKAGE_SCOPE**(_url_) 的结果。
> 8. 令 _pjson_ 为 **READ_PACKAGE_JSON**(_packageURL_) 的结果。
> 9. 令 _packageType_ 为 **null**。
> 10. 如果 _pjson?.type_ 为 _"module"_ 或 _"commonjs"_，则
>     1. 将 _packageType_ 设置为 _pjson.type_。
> 11. 如果 _url_ 终于 _".js"_，则
>     1. 如果 _packageType_ 不为 **null**，则
>        1. 返回 _packageType_。
>     2. 如果 **DETECT_MODULE_SYNTAX**(_source_) 的结果为 true，则
>        1. 返回 _"module"_。
>     3. 返回 _"commonjs"_。
> 12. 如果 _url_ 没有任何扩展名，则
>     1. 如果 _packageType_ 为 _"module"_ 且 _url_ 处的文件包含 WebAssembly 模块的 "application/wasm" 内容类型头，则
>        1. 返回 _"wasm"_。
>     2. 如果 _packageType_ 不为 **null**，则
>        1. 返回 _packageType_。
>     3. 如果 **DETECT_MODULE_SYNTAX**(_source_) 的结果为 true，则
>        1. 返回 _"module"_。
>     4. 返回 _"commonjs"_。
> 13. 返回 **undefined**（将在加载阶段抛出）。

**LOOKUP_PACKAGE_SCOPE**(_url_)

> 1. 令 _scopeURL_ 为 _url_。
> 2. 当 _scopeURL_ 不是文件系统根目录时，
>    1. 将 _scopeURL_ 设置为 _scopeURL_ 的父 URL。
>    2. 如果 _scopeURL_ 终于 _"node_modules"_ 路径段，返回 **null**。
>    3. 令 _pjsonURL_ 为 _"package.json"_ 在 _scopeURL_ 内的解析。
>    4. 如果 _pjsonURL_ 处的文件存在，则
>       1. 返回 _scopeURL_。
> 3. 返回 **null**。

**READ_PACKAGE_JSON**(_packageURL_)

> 1. 令 _pjsonURL_ 为 _"package.json"_ 在 _packageURL_ 内的解析。
> 2. 如果 _pjsonURL_ 处的文件不存在，则
>    1. 返回 **null**。
> 3. 如果 _packageURL_ 处的文件无法解析为有效 JSON，则
>    1. 抛出 _无效包配置_ 错误。
> 4. 返回 _pjsonURL_ 处文件的解析 JSON 源。

**DETECT_MODULE_SYNTAX**(_source_)

> 1. 将 _source_ 解析为 ECMAScript 模块。
> 2. 如果解析成功，则
>    1. 如果 _source_ 包含顶层 `await`、静态 `import` 或 `export` 语句，或 `import.meta`，返回 **true**。
>    2. 如果 _source_ 包含任何 CommonJS 包装变量（`require`、`exports`、`module`、`__filename` 或 `__dirname`）的顶层词法声明（`const`、`let` 或 `class`），则返回 **true**。
> 3. 返回 **false**。

### 自定义 ESM 标识符解析算法

[模块自定义钩子][] 提供了一种自定义 ESM 标识符解析算法的机制。一个为 ESM 标识符提供 CommonJS 风格解析的示例是 [commonjs 扩展名解析加载器][]。

<!-- 注意：merve 链接应与 deps 版本保持同步 -->

[6.1.7 数组索引]: https://tc39.es/ecma262/#integer-index
[插件]: addons.md
[内置模块]: modules.md#built-in-modules
[CommonJS]: modules.md
[确定模块系统]: packages.md#determining-module-system
[动态 `import()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import
[WebAssembly 的 ES 模块集成提案]: https://github.com/webassembly/esm-integration
[导入属性]: #import-attributes
[导入属性 MDN]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import/with
[JSON 模块]: #json-modules
[使用 `require()` 加载 ECMAScript 模块]: modules.md#loading-ecmascript-modules-using-require
[模块自定义钩子]: module.md#customization-hooks
[Node.js 模块解析和加载算法]: #resolution-algorithm-specification
[源阶段导入]: https://github.com/tc39/proposal-source-phase-imports
[术语]: #terminology
[URL]: https://url.spec.whatwg.org/
[WebAssembly JS 字符串内置函数提案]: https://github.com/WebAssembly/js-string-builtins
[`"exports"`]: packages.md#exports
[`"type"`]: packages.md#type
[`--input-type`]: cli.md#--input-typetype
[`data:` URL]: https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Schemes/data
[`export`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export
[`import()`]: #import-expressions
[`import.meta.dirname`]: #importmetadirname
[`import.meta.filename`]: #importmetafilename
[`import.meta.main`]: #importmetamain
[`import.meta.resolve`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta/resolve
[`import.meta.url`]: #importmetaurl
[`import`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
[`module.createRequire()`]: module.md#modulecreaterequirefilename
[`module.syncBuiltinESMExports()`]: module.md#modulesyncbuiltinesmexports
[`package.json`]: packages.md#nodejs-packagejson-field-definitions
[`path.dirname()`]: path.md#pathdirnamepath
[`process.dlopen`]: process.md#processdlopenmodule-filename-flags
[`require(esm)`]: modules.md#loading-ecmascript-modules-using-require
[`url.fileURLToPath()`]: url.md#urlfileurltopathurl-options
[commonjs 扩展名解析加载器]: https://github.com/nodejs/loaders-test/tree/main/commonjs-extension-resolution-loader
[自定义 https 加载器]: module.md#import-from-https
[import.meta.resolve]: #importmetaresolvespecifier
[merve]: https://github.com/anonrig/merve/tree/v1.0.0
[百分号编码]: url.md#percent-encoding-in-urls
[特殊方案]: https://url.spec.whatwg.org/#special-scheme
[状态码]: process.md#exit-codes
[官方标准格式]: https://tc39.github.io/ecma262/#sec-modules
[url.pathToFileURL]: url.md#urlpathtofileurlpath-options
