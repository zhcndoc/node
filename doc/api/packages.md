# 模块：包

<!--introduced_in=v12.20.0-->

<!-- type=misc -->

<!-- YAML
changes:
  - version:
    - v14.13.0
    - v12.20.0
    pr-url: https://github.com/nodejs/node/pull/34718
    description: 添加对 `"exports"` 模式的支持。
  - version:
    - v14.6.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/34117
    description: 添加包 `"imports"` 字段。
  - version:
    - v13.7.0
    - v12.17.0
    pr-url: https://github.com/nodejs/node/pull/29866
    description: 取消条件导出标记。
  - version:
    - v13.7.0
    - v12.16.0
    pr-url: https://github.com/nodejs/node/pull/31001
    description: "移除 `--experimental-conditional-exports` 选项。在 12.16.0 中，条件导出仍然位于 `--experimental-modules` 之后。"
  - version:
    - v13.6.0
    - v12.16.0
    pr-url: https://github.com/nodejs/node/pull/31002
    description: 取消使用包名自我引用的标记。
  - version: v12.7.0
    pr-url: https://github.com/nodejs/node/pull/28568
    description:
      引入 `"exports"` `package.json` 字段，作为经典 `"main"` 字段的更强大的替代方案。
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/26745
    description:
      通过 `package.json` `"type"` 字段添加对使用 `.js` 文件扩展名的 ES 模块的支持。
-->

## 介绍

包是由 `package.json` 文件描述的文件夹树。包由包含 `package.json` 文件的文件夹及其所有子文件夹组成，直到遇到包含另一个 `package.json` 文件的下一个文件夹，或名为 `node_modules` 的文件夹。

本页为编写 `package.json` 文件的包作者提供指导，以及 Node.js 定义的 [`package.json`][] 字段的参考。

## 确定模块系统

### 介绍

当作为初始输入传递给 `node`，或被 `import` 语句或 `import()` 表达式引用时，Node.js 会将以下内容视为 [ES 模块][]：

* 扩展名为 `.mjs` 的文件。

* 扩展名为 `.js` 的文件，当最近的父级 `package.json` 文件包含值为 `"module"` 的顶层 [`"type"`][] 字段时。

* 作为参数传递给 `--eval` 的字符串，或通过 `STDIN` 管道传输给 `node` 的字符串，带有标志 `--input-type=module`。

* 包含仅能成功解析为 [ES 模块][] 的语法的代码，例如 `import` 或 `export` 语句或 `import.meta`，且没有明确的标记说明应如何解释它。明确标记是 `.mjs` 或 `.cjs` 扩展名、带有 `"module"` 或 `"commonjs"` 值的 `package.json` `"type"` 字段，或 `--input-type` 标志。动态 `import()` 表达式在 CommonJS 或 ES 模块中均受支持，不会强制将文件视为 ES 模块。参见 [语法检测][]。

当作为初始输入传递给 `node`，或被 `import` 语句或 `import()` 表达式引用时，Node.js 会将以下内容视为 [CommonJS][]：

* 扩展名为 `.cjs` 的文件。

* 扩展名为 `.js` 的文件，当最近的父级 `package.json` 文件包含值为 `"commonjs"` 的顶层字段 [`"type"`][] 时。

* 作为参数传递给 `--eval` 或 `--print` 的字符串，或通过 `STDIN` 管道传输给 `node` 的字符串，带有标志 `--input-type=commonjs`。

* 扩展名为 `.js` 的文件，没有父级 `package.json` 文件，或最近的父级 `package.json` 文件缺少 `type` 字段，且代码可以成功作为 CommonJS 评估。换句话说，Node.js 会首先尝试将此类“模糊”文件作为 CommonJS 运行，如果作为 CommonJS 评估失败（因为解析器发现了 ES 模块语法），则会重试将其作为 ES 模块评估。

在“模糊”文件中编写 ES 模块语法会产生性能成本，因此鼓励作者在任何可能的情况下保持明确。特别是，包作者应始终在其 `package.json` 文件中包含 [`"type"`][] 字段，即使包中的所有源都是 CommonJS。明确包的 `type` 将使包具有未来兼容性，以防 Node.js 的默认类型发生变化，同时也将使构建工具和加载器更容易确定包中的文件应如何解释。

### 语法检测

<!-- YAML
added:
  - v21.1.0
  - v20.10.0
changes:
  - version:
    - v22.7.0
    - v20.19.0
    pr-url: https://github.com/nodejs/node/pull/53619
    description: 默认启用语法检测。
-->

> 稳定性：1.2 - 发布候选

Node.js 将检查模糊输入的源代码，以确定其是否包含 ES 模块语法；如果检测到此类语法，输入将被视为 ES 模块。

模糊输入定义为：

* 扩展名为 `.js` 或无扩展名的文件；且没有控制的 `package.json` 文件或缺少 `type` 字段。
* 当未指定 `--input-type` 时的字符串输入（`--eval` 或 `STDIN`）。

ES 模块语法定义为作为 CommonJS 评估时会抛出错误的语法。这包括以下内容：

* `import` 语句（但 _不_ 包括 `import()` 表达式，它在 CommonJS 中有效）。
* `export` 语句。
* `import.meta` 引用。
* 模块顶层的 `await`。
* CommonJS 包装器变量（`require`、`module`、`exports`、`__dirname`、`__filename`）的词法重声明。

### 模块解析和加载

Node.js 有两种类型的模块解析和加载，取决于如何请求模块。

当通过 `require()` 请求模块时（在 CommonJS 模块中默认可用，并且可以在 CommonJS 和 ES 模块中使用 `createRequire()` 动态生成）：

* 解析：
  * 由 `require()` 发起的解析支持 [文件夹作为模块][]。
  * 解析标识符时，如果未找到精确匹配，`require()` 将尝试添加扩展名（`.js`、`.json`，最后是 `.node`），然后尝试解析 [文件夹作为模块][]。
  * 默认情况下不支持将 URL 作为标识符。
* 加载：
  * `.json` 文件被视为 JSON 文本文件。
  * `.node` 文件被解释为使用 `process.dlopen()` 加载的编译后的附加模块。
  * `.ts`、`.mts` 和 `.cts` 文件被视为 [TypeScript][] 文本文件。
  * 具有任何其他扩展名或无扩展名的文件被视为 JavaScript 文本文件。
  * 仅当 [ECMAScript 模块][ES Module] _及其依赖项_ 是同步的（即它们不包含顶层 `await`）时，`require()` 才能用于 [从 CommonJS 模块加载 ECMAScript 模块][]。

当通过静态 `import` 语句（仅在 ES 模块中可用）或 `import()` 表达式（在 CommonJS 和 ES 模块中均可用）请求模块时：

* 解析：
  * `import`/`import()` 的解析不支持文件夹作为模块，必须完全指定目录索引（例如 `'./startup/index.js'`）。
  * 它不执行扩展名搜索。当标识符是相对或绝对文件 URL 时，必须提供文件扩展名。
  * 默认支持 `file://` 和 `data:` URL 作为标识符。
* 加载：
  * `.json` 文件被视为 JSON 文本文件。导入 JSON 模块时，需要导入类型属性（例如 `import json from './data.json' with { type: 'json' }`）。
  * 如果启用了 [`--experimental-addon-modules`][]，`.node` 文件被解释为使用 `process.dlopen()` 加载的编译后的附加模块。
  * `.ts`、`.mts` 和 `.cts` 文件被视为 [TypeScript][] 文本文件。
  * 它仅接受 `.js`、`.mjs` 和 `.cjs` 扩展名用于 JavaScript 文本文件。
  * `.wasm` 文件被视为 [WebAssembly 模块][]。
  * 任何其他文件扩展名将导致 [`ERR_UNKNOWN_FILE_EXTENSION`][] 错误。可以通过 [自定义钩子][] 促进其他文件扩展名。
  * `import`/`import()` 可用于加载 JavaScript [CommonJS 模块][commonjs]。此类模块会通过 [merve][] 传递，以尝试识别命名导出，如果可以通过静态分析确定，则这些导出可用。

无论如何请求模块，都可以使用 [自定义钩子][] 自定义解析和加载过程。

### `package.json` 和文件扩展名

在包内，[`package.json`][] [`"type"`][] 字段定义 Node.js 应如何解释 `.js` 文件。如果 `package.json` 文件没有 `"type"` 字段，`.js` 文件被视为 [CommonJS][]。

`package.json` `"type"` 值为 `"module"` 告诉 Node.js 将该包内的 `.js` 文件解释为使用 [ES 模块][] 语法。

`"type"` 字段不仅适用于初始入口点（`node my-app.js`），还适用于 `import` 语句和 `import()` 表达式引用的文件。

```js
// my-app.js，被视为 ES 模块，因为同一个文件夹中有一个 package.json
// 文件，其中包含 "type": "module"。

import './startup/init.js';
// 作为 ES 模块加载，因为 ./startup 不包含 package.json 文件，
// 因此从上一级继承 "type" 值。

import 'commonjs-package';
// 作为 CommonJS 加载，因为 ./node_modules/commonjs-package/package.json
// 缺少 "type" 字段或包含 "type": "commonjs"。

import './node_modules/commonjs-package/index.js';
// 作为 CommonJS 加载，因为 ./node_modules/commonjs-package/package.json
// 缺少 "type" 字段或包含 "type": "commonjs"。
```

以 `.mjs` 结尾的文件始终作为 [ES 模块][] 加载，无论最近的父级 `package.json` 如何。

以 `.cjs` 结尾的文件始终作为 [CommonJS][] 加载，无论最近的父级 `package.json` 如何。

```js
import './legacy-file.cjs';
// 作为 CommonJS 加载，因为 .cjs 始终作为 CommonJS 加载。

import 'commonjs-package/src/index.mjs';
// 作为 ES 模块加载，因为 .mjs 始终作为 ES 模块加载。
```

`.mjs` 和 `.cjs` 扩展名可用于在同一包内混合类型：

* 在 `"type": "module"` 包内，可以通过将文件命名为 `.cjs` 扩展名指示 Node.js 将特定文件解释为 [CommonJS][]（因为在 `"module"` 包内，`.js` 和 `.mjs` 文件都被视为 ES 模块）。

* 在 `"type": "commonjs"` 包内，可以通过将文件命名为 `.mjs` 扩展名指示 Node.js 将特定文件解释为 [ES 模块][]（因为在 `"commonjs"` 包内，`.js` 和 `.cjs` 文件都被视为 CommonJS）。

### `--input-type` 标志

<!-- YAML
added: v12.0.0
-->

当设置了 `--input-type=module` 标志时，作为参数传递给 `--eval`（或 `-e`）的字符串，或通过 `STDIN` 管道传输给 `node` 的字符串，被视为 [ES 模块][]。

```bash
node --input-type=module --eval "import { sep } from 'node:path'; console.log(sep);"

echo "import { sep } from 'node:path'; console.log(sep);" | node --input-type=module
```

为了完整起见，还有 `--input-type=commonjs`，用于显式地将字符串输入作为 CommonJS 运行。如果未指定 `--input-type`，这是默认行为。

## 包入口点

在包的 `package.json` 文件中，两个字段可以定义包的入口点：[`"main"`][] 和 [`"exports"`][]。这两个字段都适用于 ES 模块和 CommonJS 模块入口点。

[`"main"`][] 字段在所有版本的 Node.js 中都受支持，但其功能有限：它仅定义包的主入口点。

[`"exports"`][] 提供了 [`"main"`][] 的现代替代方案，允许定义多个入口点，支持环境之间的条件入口解析，并**防止除 [`"exports"`][] 中定义的任何其他入口点**。这种封装允许模块作者清楚地定义其包的公共接口。

对于针对当前受支持版本的新包，推荐使用 [`"exports"`][] 字段。对于支持 Node.js 10 及以下版本的包，[`"main"`][] 字段是必需的。如果同时定义了 [`"exports"`][] 和 [`"main"`][]，在受支持的 Node.js 版本中，[`"exports"`][] 字段优先于 [`"main"`][]。

[条件导出][] 可用于 [`"exports"`][] 内，以定义每个环境的不同包入口点，包括包是通过 `require` 还是通过 `import` 引用。有关在单个包中支持 CommonJS 和 ES 模块的更多信息，请参阅 [双重 CommonJS/ES 模块包部分][]。

引入 [`"exports"`][] 字段的现有包将阻止包的使用者使用任何未定义的入口点，包括 [`package.json`][]（例如 `require('your-package/package.json')`）。**这很可能是一个破坏性变更。**

为了使 [`"exports"`][] 的引入不造成破坏，请确保导出以前支持的每个入口点。最好显式指定入口点，以便包的公共 API 定义明确。例如，以前导出 `main`、`lib`、`feature` 和 `package.json` 的项目可以使用以下 `package.exports`：

```json
{
  "name": "my-package",
  "exports": {
    ".": "./lib/index.js",
    "./lib": "./lib/index.js",
    "./lib/index": "./lib/index.js",
    "./lib/index.js": "./lib/index.js",
    "./feature": "./feature/index.js",
    "./feature/index": "./feature/index.js",
    "./feature/index.js": "./feature/index.js",
    "./package.json": "./package.json"
  }
}
```

或者，项目可以选择使用导出模式导出整个文件夹，包括带和不带扩展名的子路径：

```json
{
  "name": "my-package",
  "exports": {
    ".": "./lib/index.js",
    "./lib": "./lib/index.js",
    "./lib/*": "./lib/*.js",
    "./lib/*.js": "./lib/*.js",
    "./feature": "./feature/index.js",
    "./feature/*": "./feature/*.js",
    "./feature/*.js": "./feature/*.js",
    "./package.json": "./package.json"
  }
}
```

通过上述方式为任何次要包版本提供向后兼容性，包的未来主要变更就可以正确地将导出限制为仅暴露的特定功能导出：

```json
{
  "name": "my-package",
  "exports": {
    ".": "./lib/index.js",
    "./feature/*.js": "./feature/*.js",
    "./feature/internal/*": null
  }
}
```

### 主入口点导出

在编写新包时，建议使用 [`"exports"`][] 字段：

```json
{
  "exports": "./index.js"
}
```

当定义了 [`"exports"`][] 字段时，包的所有子路径都被封装，不再可供导入者使用。例如，`require('pkg/subpath.js')` 抛出 [`ERR_PACKAGE_PATH_NOT_EXPORTED`][] 错误。

这种导出封装为工具和处理包的语义化版本升级提供了更可靠的包接口保证。这不是强封装，因为直接要求包的任何绝对子路径（如 `require('/path/to/node_modules/pkg/subpath.js')`）仍将加载 `subpath.js`。

所有当前受支持的 Node.js 版本和现代构建工具都支持 `"exports"` 字段。对于使用较旧版本 Node.js 或相关构建工具的项目，可以通过包含 `"main"` 字段以及指向相同模块的 `"exports"` 来实现兼容性：

```json
{
  "main": "./index.js",
  "exports": "./index.js"
}
```

### 子路径导出

<!-- YAML
added: v12.7.0
-->

使用 [`"exports"`][] 字段时，可以通过将主入口点视为 `"."` 子路径来定义自定义子路径以及主入口点：

```json
{
  "exports": {
    ".": "./index.js",
    "./submodule.js": "./src/submodule.js"
  }
}
```

现在只有 [`"exports"`][] 中定义的子路径可以被使用者导入：

```js
import submodule from 'es-module-package/submodule.js';
// 加载 ./node_modules/es-module-package/src/submodule.js
```

而其他子路径将报错：

```js
import submodule from 'es-module-package/private-module.js';
// 抛出 ERR_PACKAGE_PATH_NOT_EXPORTED
```

#### 子路径中的扩展名

包作者应该在其导出中提供带扩展名（`import 'pkg/subpath.js'`）或不带扩展名（`import 'pkg/subpath'`）的子路径。这确保每个导出的模块只有一个子路径，以便所有依赖项导入相同的统一说明符，保持包的契约对使用者清晰，并简化包子路径补全。

传统上，包倾向于使用无扩展名风格，这具有可读性和掩盖包内文件真实路径的好处。

随着 [导入映射][] 现在为浏览器和其他 JavaScript 运行时中的包解析提供标准，使用无扩展名风格可能导致导入映射定义膨胀。显式文件扩展名可以通过使导入映射能够利用 [包文件夹映射][] 来尽可能映射多个子路径，而不是每个包子路径导出使用单独的映射条目，从而避免此问题。这也反映了在相对和绝对导入说明符中使用 [完整说明符路径][] 的要求。

#### 导出目标的路径规则和验证

在 [`"exports"`][] 字段中将路径定义为目标时，Node.js 强制执行几条规则以确保安全性、可预测性和适当的封装。理解这些规则对于发布包的作者至关重要。

##### 目标必须是相对 URL

[`"exports"`][] 映射中的所有目标路径（与导出键关联的值）必须是相对 `./` 开头的 URL 字符串。

```json
// package.json
{
  "name": "my-package",
  "exports": {
    ".": "./dist/main.js",          // 正确
    "./feature": "./lib/feature.js", // 正确
    // "./origin-relative": "/dist/main.js", // 不正确：必须以 ./ 开头
    // "./absolute": "file:///dev/null", // 不正确：必须以 ./ 开头
    // "./outside": "../common/util.js" // 不正确：必须以 ./ 开头
  }
}
```

此行为的原因包括：

* **安全性：** 防止导出包自身目录之外的任意文件。
* **封装：** 确保所有导出路径都相对于包根目录解析，使包自包含。

##### 无路径遍历或无效段

导出目标不得解析到包根目录之外的位置。此外，路径段如 `.`（单点）、`..`（双点）或 `node_modules`（及其 URL 编码等效项）通常在初始 `./` 之后的 `target` 字符串中和代入目标模式的任何 `subpath` 部分中被禁止。

```json
// package.json
{
  "name": "my-package",
  "exports": {
    // ".": "./dist/../../elsewhere/file.js", // 无效：路径遍历
    // ".": "././dist/main.js",             // 无效：包含 "." 段
    // ".": "./dist/../dist/main.js",       // 无效：包含 ".." 段
    // "./utils/./helper.js": "./utils/helper.js" // 键包含无效段
  }
}
```

### 导出语法糖

<!-- YAML
added: v12.11.0
-->

如果 `"."` 导出是唯一的导出，[`"exports"`][] 字段为此情况提供语法糖，即直接的 [`"exports"`][] 字段值。

```json
{
  "exports": {
    ".": "./index.js"
  }
}
```

可以写成：

```json
{
  "exports": "./index.js"
}
```

### 子路径导入

<!-- YAML
added:
  - v14.6.0
  - v12.19.0
changes:
  - version:
     - v25.4.0
     - v24.14.0
    pr-url: https://github.com/nodejs/node/pull/60864
    description: "Allow subpath imports that start with `#/`."
-->

除了 [`"exports"`][] 字段外，还有一个包 `"imports"` 字段，用于创建仅适用于包内部导入说明符的私有映射。

`"imports"` 字段中的条目必须始终以 `#` 开头，以确保它们与外部包说明符区分开来。

例如，导入字段可用于为内部模块获得条件导出的好处：

```json
// package.json
{
  "imports": {
    "#dep": {
      "node": "dep-node-native",
      "default": "./dep-polyfill.js"
    }
  },
  "dependencies": {
    "dep-node-native": "^1.0.0"
  }
}
```

其中 `import '#dep'` 不会获取外部包 `dep-node-native` 的解析（包括其导出），而是在其他环境中获取相对于包的本地文件 `./dep-polyfill.js`。

与 `"exports"` 字段不同，`"imports"` 字段允许映射到外部包。

导入字段的解析规则 otherwise 类似于导出字段。

### 子路径模式

<!-- YAML
added:
  - v14.13.0
  - v12.20.0
changes:
  - version:
    - v16.10.0
    - v14.19.0
    pr-url: https://github.com/nodejs/node/pull/40041
    description: Support pattern trailers in "imports" field.
  - version:
    - v16.9.0
    - v14.19.0
    pr-url: https://github.com/nodejs/node/pull/39635
    description: Support pattern trailers.
-->

对于只有少量导出或导入的包，我们建议显式列出每个导出子路径条目。但对于具有大量子路径的包，这可能会导致 `package.json` 膨胀和维护问题。

对于这些用例，可以使用子路径导出模式：

```json
// ./node_modules/es-module-package/package.json
{
  "exports": {
    "./features/*.js": "./src/features/*.js"
  },
  "imports": {
    "#internal/*.js": "./src/internal/*.js"
  }
}
```

**`*` 映射暴露嵌套子路径，因为它仅是字符串替换语法。**

右侧的所有 `*` 实例都将替换为此值，包括如果它包含任何 `/` 分隔符。

```js
import featureX from 'es-module-package/features/x.js';
// 加载 ./node_modules/es-module-package/src/features/x.js

import featureY from 'es-module-package/features/y/y.js';
// 加载 ./node_modules/es-module-package/src/features/y/y.js

import internalZ from '#internal/z.js';
// 加载 ./src/internal/z.js
```

这是直接的静态匹配和替换，没有任何针对文件扩展名的特殊处理。在映射的两侧包含 `"*.js"` 将暴露的包导出限制为仅 JS 文件。

导出可静态枚举的属性在导出模式中得以保持，因为包的各个导出可以通过将右侧目标模式视为针对包内文件列表的 `**` glob 来确定。因为 `node_modules` 路径在导出目标中被禁止，所以此扩展仅依赖于包自身的文件。

要从模式中排除私有子文件夹，可以使用 `null` 目标：

```json
// ./node_modules/es-module-package/package.json
{
  "exports": {
    "./features/*.js": "./src/features/*.js",
    "./features/private-internal/*": null
  }
}
```

```js
import featureInternal from 'es-module-package/features/private-internal/m.js';
// 抛出：ERR_PACKAGE_PATH_NOT_EXPORTED

import featureX from 'es-module-package/features/x.js';
// 加载 ./node_modules/es-module-package/src/features/x.js
```

### 条件导出

<!-- YAML
added:
  - v13.2.0
  - v12.16.0
changes:
  - version:
    - v13.7.0
    - v12.16.0
    pr-url: https://github.com/nodejs/node/pull/31001
    description: Unflag conditional exports.
-->

条件导出提供了一种根据某些条件映射到不同路径的方法。它们支持 CommonJS 和 ES 模块导入。

例如，想要为 `require()` 和 `import` 提供不同 ES 模块导出的包可以写成：

```json
// package.json
{
  "exports": {
    "import": "./index-module.js",
    "require": "./index-require.cjs"
  },
  "type": "module"
}
```

Node.js 实现了以下条件，按条件应定义的从最具体到最不具体的顺序列出：

* `"node-addons"` - 类似于 `"node"` 并匹配任何 Node.js 环境。此条件可用于提供使用原生 C++ 插件的入口点，而不是更通用且不依赖原生插件的入口点。此条件可以通过 [`--no-addons` 标志][] 禁用。
* `"node"` - 匹配任何 Node.js 环境。可以是 CommonJS 或 ES 模块文件。_在大多数情况下，明确指出 Node.js 平台是不必要的。_
* `"import"` - 当包通过 `import` 或 `import()` 加载，或通过 ECMAScript 模块加载器的任何顶级导入或解析操作加载时匹配。适用于目标文件的模块格式。_始终与 `"require"` 互斥。_
* `"require"` - 当包通过 `require()` 加载时匹配。引用的文件应该可用 `require()` 加载，尽管条件匹配不管目标文件的模块格式。预期格式包括 CommonJS、JSON、原生插件和 ES 模块。_始终与 `"import"` 互斥。_
* `"module-sync"` - 无论包是通过 `import`、`import()` 还是 `require()` 加载都匹配。格式预期为不包含其模块图中顶级等待的 ES 模块 - 如果包含，当模块被 `require()` 时将抛出 `ERR_REQUIRE_ASYNC_MODULE`。
* `"default"` - 始终匹配的通用回退。可以是 CommonJS 或 ES 模块文件。_此条件应始终放在最后。_

在 [`"exports"`][] 对象内，键顺序很重要。在条件匹配期间，较早的条目具有较高优先级并优先于较后的条目。_一般规则是条件在对象顺序中应从最具体到最不具体_。

使用 `"import"` 和 `"require"` 条件可能会导致一些危害，这在 [双重 CommonJS/ES 模块包部分][] 中有进一步解释。

`"node-addons"` 条件可用于提供使用原生 C++ 插件的入口点。但是，此条件可以通过 [`--no-addons` 标志][] 禁用。使用 `"node-addons"` 时，建议将 `"default"` 视为提供更通用入口点的增强，例如使用 WebAssembly 而不是原生插件。

条件导出也可以扩展到导出子路径，例如：

```json
{
  "exports": {
    ".": "./index.js",
    "./feature.js": {
      "node": "./feature-node.js",
      "default": "./feature.js"
    }
  }
}
```

定义了一个包，其中 `require('pkg/feature.js')` 和 `import 'pkg/feature.js'` 可以在 Node.js 和其他 JS 环境之间提供不同的实现。

使用环境分支时，始终尽可能包含 `"default"` 条件。提供 `"default"` 条件确保任何未知的 JS 环境都能够使用此通用实现，这有助于避免这些 JS 环境不得不假装是现有环境以支持具有条件导出的包。因此，使用 `"node"` 和 `"default"` 条件分支通常优于使用 `"node"` 和 `"browser"` 条件分支。

### 嵌套条件

除了直接映射外，Node.js 还支持嵌套条件对象。

例如，定义一个仅在 Node.js 中而非浏览器中具有双模式入口点的包：

```json
{
  "exports": {
    "node": {
      "import": "./feature-node.mjs",
      "require": "./feature-node.cjs"
    },
    "default": "./feature.mjs"
  }
}
```

条件继续按顺序匹配，就像平面条件一样。如果嵌套条件没有任何映射，它将继续检查父条件的剩余条件。这样，嵌套条件的行为类似于嵌套的 JavaScript `if` 语句。

### 解析用户条件

<!-- YAML
added:
  - v14.9.0
  - v12.19.0
-->

运行 Node.js 时，可以使用 `--conditions` 标志添加自定义用户条件：

```bash
node --conditions=development index.js
```

这将解析包导入和导出中的 `"development"` 条件，同时适当解析现有的 `"node"`、`"node-addons"`、`"default"`、`"import"` 和 `"require"` 条件。

可以使用重复标志设置任意数量的自定义条件。

典型条件应仅包含字母数字字符，必要时使用 ":"、"-" 或 "=" 作为分隔符。其他任何内容可能会在 node 之外遇到兼容性问题。

在 node 中，条件的限制很少，但具体包括：

1. 它们必须包含至少一个字符。
2. 它们不能以 "." 开头，因为它们可能出现在也允许相对路径的地方。
3. 它们不能包含 ","，因为它们可能被某些 CLI 工具解析为逗号分隔列表。
4. 它们不能是整数属性键，如 "10"，因为这可能对 JS 对象的属性键顺序产生意外影响。

### 社区条件定义

除了 [`"import"`](#conditional-exports)、[`"require"`](#conditional-exports)、[`"node"`](#conditional-exports)、[`"module-sync"`](#conditional-exports)、[`"node-addons"`](#conditional-exports) 和 [`"default"`](#conditional-exports) 条件之外，[在 Node.js 核心中实现](#conditional-exports) 的条件字符串默认被忽略。

其他平台可能实现其他条件，并且可以通过 [`--conditions` / `-C` 标志][] 在 Node.js 中启用用户条件。

由于自定义包条件需要清晰的定义以确保正确使用，下面提供了一份常见已知包条件及其严格定义的列表，以协助生态系统协调。

* `"types"` - 可由类型系统用于解析给定导出的类型文件。_此条件应始终首先包含。_
* `"browser"` - 任何 Web 浏览器环境。
* `"development"` - 可用于定义仅开发环境的入口点，例如在开发模式下运行时提供更好的错误消息等额外调试上下文。_必须始终与 `"production"` 互斥。_
* `"production"` - 可用于定义生产环境入口点。_必须始终与 `"development"` 互斥。_

对于其他运行时，特定于平台的条件键定义由 [WinterCG][] 在 [Runtime Keys][] 提案规范中维护。

可以通过向 [本节 Node.js 文档][] 创建拉取请求将此列表中添加新的条件定义。在此列出新条件定义的要求是：

* 定义对于所有实现者来说应该清晰明确。
* 需要条件的用例应该得到清楚的理由说明。
* 应该存在足够的现有实现用法。
* 条件名称不应与另一个条件定义或广泛使用的条件冲突。
* 条件定义的列表应该为生态系统提供否则无法实现的协调好处。例如，对于公司特定或应用程序特定的条件，情况未必如此。
* 条件应该是 Node.js 用户期望出现在 Node.js 核心文档中的。`"types"` 条件是一个很好的例子：它实际上不属于 [Runtime Keys][] 提案，但很适合放在这里的 Node.js 文档中。

上述定义可能会在适当的时候移至专用的条件注册表。

### 使用包名自引用包

<!-- YAML
added:
  - v13.1.0
  - v12.16.0
changes:
  - version:
    - v13.6.0
    - v12.16.0
    pr-url: https://github.com/nodejs/node/pull/31002
    description: Unflag self-referencing a package using its name.
-->

在包内，可以通过包名引用包的 `package.json` [`"exports"`][] 字段中定义的值。例如，假设 `package.json` 是：

```json
// package.json
{
  "name": "a-package",
  "exports": {
    ".": "./index.mjs",
    "./foo.js": "./foo.js"
  }
}
```

那么该包中的任何模块都可以引用包本身中的导出：

```js
// ./a-module.mjs
import { something } from 'a-package'; // 从 ./index.mjs 导入 "something"。
```

仅当 `package.json` 具有 [`"exports"`][] 时才可用自引用，并且将仅允许导入该 [`"exports"`][]（在 `package.json` 中）允许的内容。因此，对于前面的包，下面的代码将生成运行时错误：

```js
// ./another-module.mjs

// 从 ./m.mjs 导入 "another"。失败，因为
// "package.json" "exports" 字段
// 不提供名为 "./m.mjs" 的导出。
import { another } from 'a-package/m.mjs';
```

在使用 `require` 时也可用自引用，无论是在 ES 模块中还是在 CommonJS 中。例如，此代码也将工作：

```cjs
// ./a-module.js
const { something } = require('a-package/foo.js'); // 从 ./foo.js 加载。
```

最后，自引用也适用于作用域包。例如，此代码也将工作：

```json
// package.json
{
  "name": "@my/package",
  "exports": "./index.js"
}
```

```cjs
// ./index.js
module.exports = 42;
```

```cjs
// ./other.js
console.log(require('@my/package'));
```

```console
$ node other.js
42
```

## 双 CommonJS/ES 模块包

详见 [包示例仓库][]。

## Node.js `package.json` 字段定义

本节描述了 Node.js 运行时使用的字段。其他工具（如 [npm](https://docs.npmjs.com/cli/v8/configuring-npm/package-json)）使用
额外的字段，这些字段被 Node.js 忽略且不在本文档中说明。

`package.json` 文件中的以下字段在 Node.js 中使用：

* [`"name"`][] - 在包内使用命名导入时相关。也被包管理器用作包名。
* [`"main"`][] - 加载包时的默认模块，如果未指定 exports，且在引入 exports 之前的 Node.js 版本中。
* [`"type"`][] - 包类型，决定将 `.js` 文件作为 CommonJS 还是 ES 模块加载。
* [`"exports"`][] - 包导出和条件导出。存在时，限制可以从包内加载哪些子模块。
* [`"imports"`][] - 包导入，供包内部的模块使用。

### `"name"`

<!-- YAML
added:
  - v13.1.0
  - v12.16.0
changes:
  - version:
    - v13.6.0
    - v12.16.0
    pr-url: https://github.com/nodejs/node/pull/31002
    description: 移除 --experimental-resolve-self 选项。
-->

* 类型：{string}

```json
{
  "name": "package-name"
}
```

`"name"` 字段定义了你的包名。发布到 _npm_ 注册表需要一个满足
[某些要求](https://docs.npmjs.com/files/package.json#name) 的名称。

`"name"` 字段可以与 [`"exports"`][] 字段一起使用，以使用其名称 [自引用][] 包。

### `"main"`

<!-- YAML
added: v0.4.0
-->

* 类型：{string}

```json
{
  "main": "./index.js"
}
```

`"main"` 字段定义了通过 `node_modules` 查找按名称导入包时的入口点。其值是一个路径。

如果 [`"exports"`][] 字段存在，在按名称导入包时，它优先于
`"main"` 字段。

它还定义了当 [包目录通过 `require()` 加载](modules.md#folders-as-modules) 时使用的脚本。

```cjs
// 这解析为 ./path/to/directory/index.js。
require('./path/to/directory');
```

### `"type"`

<!-- YAML
added: v12.0.0
changes:
  - version:
    - v13.2.0
    - v12.17.0
    pr-url: https://github.com/nodejs/node/pull/29866
    description: 移除 --experimental-modules 标志。
-->

* 类型：{string}

`"type"` 字段定义了 Node.js 为所有将该 `package.json` 文件作为最近父级的
`.js` 文件使用的模块格式。

当最近的父 `package.json` 文件包含值为
`"module"` 的顶层字段 `"type"` 时，以 `.js` 结尾的文件作为 ES 模块加载。

最近的父 `package.json` 定义为在当前文件夹、该文件夹的父级等向上搜索
直到达到 node\_modules 文件夹或卷根时找到的第一个 `package.json`。

```json
// package.json
{
  "type": "module"
}
```

```bash
# 在与前面的 package.json 相同的文件夹中
node my-app.js # 作为 ES 模块运行
```

如果最近的父 `package.json` 缺少 `"type"` 字段，或包含
`"type": "commonjs"`，`.js` 文件被视为 [CommonJS][]。如果到达卷
根且未找到 `package.json`，`.js` 文件被视为
[CommonJS][]。

如果最近的父 `package.json` 包含 `"type": "module"`，`.js` 文件的
`import` 语句被视为 ES 模块。

```js
// my-app.js，与上面示例相同的一部分
import './startup.js'; // 因为 package.json 作为 ES 模块加载
```

无论 `"type"` 字段的值如何，`.mjs` 文件始终被视为
ES 模块，`.cjs` 文件始终被视为 CommonJS。

### `"exports"`

<!-- YAML
added: v12.7.0
changes:
  - version:
    - v14.13.0
    - v12.20.0
    pr-url: https://github.com/nodejs/node/pull/34718
    description: 添加对 `"exports"` 模式的支持。
  - version:
    - v13.7.0
    - v12.17.0
    pr-url: https://github.com/nodejs/node/pull/29866
    description: 移除条件导出标志。
  - version:
    - v13.7.0
    - v12.16.0
    pr-url: https://github.com/nodejs/node/pull/31008
    description: 实现逻辑条件导出排序。
  - version:
    - v13.7.0
    - v12.16.0
    pr-url: https://github.com/nodejs/node/pull/31001
    description: 移除 --experimental-conditional-exports 选项。在 12.16.0 中，条件导出仍在 --experimental-modules 之后。
  - version:
    - v13.2.0
    - v12.16.0
    pr-url: https://github.com/nodejs/node/pull/29978
    description: 实现条件导出。
-->

* 类型：{Object|string|string\[]}

```json
{
  "exports": "./index.js"
}
```

`"exports"` 字段允许定义包的 [入口点][]，当
通过 `node_modules` 查找或 [自引用][] 其自身名称导入时。它在 Node.js 12+ 中作为
[`"main"`][] 的替代方案受支持，可以支持定义 [子路径导出][]
和 [条件导出][]，同时封装内部未导出的模块。

[条件导出][] 也可以在 `"exports"` 内使用，以定义每个环境的不同
包入口点，包括包是通过 `require` 还是通过 `import` 引用。

`"exports"` 中定义的所有路径必须是相对文件 URL，以
`./` 开头。

### `"imports"`

<!-- YAML
added:
 - v14.6.0
 - v12.19.0
-->

* 类型：{Object}

```json
// package.json
{
  "imports": {
    "#dep": {
      "node": "dep-node-native",
      "default": "./dep-polyfill.js"
    }
  },
  "dependencies": {
    "dep-node-native": "^1.0.0"
  }
}
```

imports 字段中的条目必须是以 `#` 开头的字符串。

包导入允许映射到外部包。

此字段为当前包定义 [子路径导入][]。

[CommonJS]: modules.md
[条件导出]: #conditional-exports
[ES 模块]: esm.md
[ES 模块]: esm.md
[本节的 Node.js 文档]: https://github.com/nodejs/node/blob/HEAD/doc/api/packages.md#conditions-definitions
[运行时键]: https://runtime-keys.proposal.wintercg.org/
[语法检测]: #syntax-detection
[TypeScript]: typescript.md
[WebAssembly 模块]: esm.md#wasm-modules
[WinterCG]: https://wintercg.org/
[`"exports"`]: #exports
[`"imports"`]: #imports
[`"main"`]: #main
[`"name"`]: #name
[`"type"`]: #type
[`--conditions` / `-C` 标志]: #resolving-user-conditions
[`--experimental-addon-modules`]: cli.md#--experimental-addon-modules
[`--no-addons` 标志]: cli.md#--no-addons
[`ERR_PACKAGE_PATH_NOT_EXPORTED`]: errors.md#err_package_path_not_exported
[`ERR_UNKNOWN_FILE_EXTENSION`]: errors.md#err_unknown_file_extension
[`package.json`]: #nodejs-packagejson-field-definitions
[自定义钩子]: module.md#customization-hooks
[入口点]: #package-entry-points
[文件夹作为模块]: modules.md#folders-as-modules
[导入映射]: https://github.com/WICG/import-maps
[从 CommonJS 模块加载 ECMAScript 模块]: modules.md#loading-ecmascript-modules-using-require
[merve]: https://github.com/anonrig/merve
[包文件夹映射]: https://github.com/WICG/import-maps#packages-via-trailing-slashes
[自引用]: #self-referencing-a-package-using-its-name
[子路径导出]: #subpath-exports
[子路径导入]: #subpath-imports
[双 CommonJS/ES 模块包部分]: #dual-commonjses-module-packages
[完整标识符路径]: esm.md#mandatory-file-extensions
[包示例仓库]: https://github.com/nodejs/package-examples
