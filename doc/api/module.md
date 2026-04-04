# 模块：`node:module` API

<!--introduced_in=v12.20.0-->

<!-- YAML
added: v0.3.7
-->

## `Module` 对象

* 类型：{Object}

在与 `Module` 实例交互时提供通用实用方法，[`module`][] 变量常见于 [CommonJS][] 模块中。通过 `import 'node:module'` 或 `require('node:module')` 访问。

### `module.builtinModules`

<!-- YAML
added:
  - v9.3.0
  - v8.10.0
  - v6.13.0
changes:
  - version: v23.5.0
    pr-url: https://github.com/nodejs/node/pull/56185
    description: 该列表现在也包含仅前缀模块。
-->

* 类型：{string\[]}

Node.js 提供的所有模块名称列表。可用于验证模块是否由第三方维护。

此上下文中的 `module` 与 [模块包装器][] 提供的对象不同。要访问它，需要 `Module` 模块：

```mjs
// module.mjs
// 在 ECMAScript 模块中
import { builtinModules as builtin } from 'node:module';
```

```cjs
// module.cjs
// 在 CommonJS 模块中
const builtin = require('node:module').builtinModules;
```

### `module.createRequire(filename)`

<!-- YAML
added: v12.2.0
-->

* `filename` {string|URL} 用于构造 require 函数的文件名。必须是文件 URL 对象、文件 URL 字符串或绝对路径字符串。
* 返回：{require} Require 函数

```mjs
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

// sibling-module.js 是一个 CommonJS 模块。
const siblingModule = require('./sibling-module');
```

### `module.findPackageJSON(specifier[, base])`

<!-- YAML
added:
  - v23.2.0
  - v22.14.0
-->

> 稳定性：1.1 - 积极开发中

* `specifier` {string|URL} 要检索其 `package.json` 的模块的标识符。当传递_裸标识符_时，返回包根目录处的 `package.json`。当传递_相对标识符_或_绝对标识符_时，返回最近的父级 `package.json`。
* `base` {string|URL} 包含模块的绝对位置（`file:` URL 字符串或文件系统路径）。对于 CJS，使用 `__filename`（不是 `__dirname`！）；对于 ESM，使用 `import.meta.url`。如果 `specifier` 是 `绝对标识符`，则无需传递它。
* 返回：{string|undefined} 如果找到 `package.json` 则返回路径。当 `specifier` 是一个包时，返回包的根 `package.json`；当是相对或未解析时，返回最接近 `specifier` 的 `package.json`。

> **注意**：不要使用此方法来尝试确定模块格式。有许多因素会影响该确定；package.json 的 `type` 字段是_最不_确定的（例如文件扩展名优先于它，而加载器钩子优先于该字段）。

> **注意**：目前这仅利用内置的默认解析器；如果注册了 [`resolve` 自定义钩子][resolve 钩子]，它们不会影响解析。这将来可能会改变。

```text
/path/to/project
  ├ packages/
    ├ bar/
      ├ bar.js
      └ package.json // 名称 = '@foo/bar'
    └ qux/
      ├ node_modules/
        └ some-package/
          └ package.json // 名称 = 'some-package'
      ├ qux.js
      └ package.json // 名称 = '@foo/qux'
  ├ main.js
  └ package.json // 名称 = '@foo'
```

```mjs
// /path/to/project/packages/bar/bar.js
import { findPackageJSON } from 'node:module';

findPackageJSON('..', import.meta.url);
// '/path/to/project/package.json'
// 当传递绝对标识符时结果相同：
findPackageJSON(new URL('../', import.meta.url));
findPackageJSON(import.meta.resolve('../'));

findPackageJSON('some-package', import.meta.url);
// '/path/to/project/packages/bar/node_modules/some-package/package.json'
// 当传递绝对标识符时，如果解析的模块位于具有嵌套 `package.json` 的子文件夹内，可能会得到不同的结果。
findPackageJSON(import.meta.resolve('some-package'));
// '/path/to/project/packages/bar/node_modules/some-package/some-subfolder/package.json'

findPackageJSON('@foo/qux', import.meta.url);
// '/path/to/project/packages/qux/package.json'
```

```cjs
// /path/to/project/packages/bar/bar.js
const { findPackageJSON } = require('node:module');
const { pathToFileURL } = require('node:url');
const path = require('node:path');

findPackageJSON('..', __filename);
// '/path/to/project/package.json'
// 当传递绝对标识符时结果相同：
findPackageJSON(pathToFileURL(path.join(__dirname, '..')));

findPackageJSON('some-package', __filename);
// '/path/to/project/packages/bar/node_modules/some-package/package.json'
// 当传递绝对标识符时，如果解析的模块位于具有嵌套 `package.json` 的子文件夹内，可能会得到不同的结果。
findPackageJSON(pathToFileURL(require.resolve('some-package')));
// '/path/to/project/packages/bar/node_modules/some-package/some-subfolder/package.json'

findPackageJSON('@foo/qux', __filename);
// '/path/to/project/packages/qux/package.json'
```

### `module.isBuiltin(moduleName)`

<!-- YAML
added:
  - v18.6.0
  - v16.17.0
-->

* `moduleName` {string} 模块名称
* 返回：{boolean} 如果模块是内置的则返回 true，否则返回 false

```mjs
import { isBuiltin } from 'node:module';
isBuiltin('node:fs'); // true
isBuiltin('fs'); // true
isBuiltin('wss'); // false
```

### `module.register(specifier[, parentURL][, options])`

<!-- YAML
added:
  - v20.6.0
  - v18.19.0
deprecated: v25.9.0
changes:
  - version: REPLACEME
    pr-url: https://github.com/nodejs/node/pull/62401
    description: 运行时弃用 (DEP0205)。
  - version:
    - v23.6.1
    - v22.13.1
    - v20.18.2
    pr-url: https://github.com/nodejs-private/node-private/pull/629
    description: "在启用权限模型的情况下使用此功能需要传递 `--allow-worker`。"
  - version:
    - v20.8.0
    - v18.19.0
    pr-url: https://github.com/nodejs/node/pull/49655
    description: 添加对 WHATWG URL 实例的支持。
-->

> 稳定性：0 - 已弃用：请改用 [`module.registerHooks()`][]。

* `specifier` {string|URL} 要注册的自定义钩子；这应该是与传递给 `import()` 相同的字符串，除非它是相对的，在这种情况下它相对于 `parentURL` 解析。
* `parentURL` {string|URL} 如果你想相对于基本 URL（例如 `import.meta.url`）解析 `specifier`，可以在此处传递该 URL。**默认值：** `'data:'`
* `options` {Object}
  * `parentURL` {string|URL} 如果你想相对于基本 URL（例如 `import.meta.url`）解析 `specifier`，可以在此处传递该 URL。如果 `parentURL` 作为第二个参数提供，则此属性将被忽略。**默认值：** `'data:'`
  * `data` {any} 任何任意的、可克隆的 JavaScript 值，传递给 [`initialize`][] 钩子。
  * `transferList` {Object\[]} [可传输对象][] 传递给 `initialize` 钩子。

注册导出 [钩子][] 的模块，以自定义 Node.js 模块解析和加载行为。参见 [自定义钩子][]。

如果与 [权限模型][] 一起使用，此功能需要 `--allow-worker`。

### `module.registerHooks(options)`

<!-- YAML
added:
  - v23.5.0
  - v22.15.0
changes:
  - version:
    - v25.4.0
    - v24.13.1
    pr-url: https://github.com/nodejs/node/pull/60960
    description: 同步和线程内钩子现在是发布候选状态。
-->

> 稳定性：1.2 - 发布候选

* `options` {Object}
  * `load` {Function|undefined} 参见 [load 钩子][]。**默认值：** `undefined`。
  * `resolve` {Function|undefined} 参见 [resolve 钩子][]。**默认值：** `undefined`。
* 返回：{Object} 一个具有以下属性的对象：
  * `deregister()` {Function} 移除已注册的钩子，以便不再调用它们。否则，钩子将在运行进程的生命周期内保留。

注册 [钩子][] 以自定义 Node.js 模块解析和加载行为。参见 [自定义钩子][]。返回的对象可用于 [注销同步自定义钩子][同步自定义钩子的注销]。

### `module.stripTypeScriptTypes(code[, options])`

<!-- YAML
added:
  - v23.2.0
  - v22.13.0
changes:
  - version: REPLACEME
    pr-url: https://github.com/nodejs/node/pull/61803
    description: "移除了 `transform` 和 `sourceMap` 选项。"
-->

> 稳定性：1.2 - 发布候选

* `code` {string} 要从中剥离类型注解的代码。
* `options` {Object}
  * `mode` {string} **默认值：** `'strip'`。可能的值有：
    * `'strip'` 仅剥离类型注解，而不执行 TypeScript 功能的转换。
  * `sourceUrl` {string} 指定源代码映射中使用的源 URL。
* 返回：{string} 剥离了类型注解的代码。

`module.stripTypeScriptTypes()` 从 TypeScript 代码中移除类型注解。它可用于在使用 `vm.runInContext()` 或 `vm.compileFunction()` 运行 TypeScript 代码之前剥离类型注解。

默认情况下，如果代码包含需要转换的 TypeScript 功能（例如 `enum`），它将抛出错误。有关更多信息，请参阅 [类型剥离][]。

_警告_：由于 TypeScript 解析器的变化，此函数的输出不应被视为在 Node.js 版本之间稳定。

```mjs
import { stripTypeScriptTypes } from 'node:module';
const code = 'const a: number = 1;';
const strippedCode = stripTypeScriptTypes(code);
console.log(strippedCode);
// 打印：const a         = 1;
```

```cjs
const { stripTypeScriptTypes } = require('node:module');
const code = 'const a: number = 1;';
const strippedCode = stripTypeScriptTypes(code);
console.log(strippedCode);
// 打印：const a         = 1;
```

如果提供了 `sourceUrl`，它将作为注释附加在输出的末尾：

```mjs
import { stripTypeScriptTypes } from 'node:module';
const code = 'const a: number = 1;';
const strippedCode = stripTypeScriptTypes(code, { mode: 'strip', sourceUrl: 'source.ts' });
console.log(strippedCode);
// 打印：const a         = 1\n\n//# sourceURL=source.ts;
```

```cjs
const { stripTypeScriptTypes } = require('node:module');
const code = 'const a: number = 1;';
const strippedCode = stripTypeScriptTypes(code, { mode: 'strip', sourceUrl: 'source.ts' });
console.log(strippedCode);
// 打印：const a         = 1\n\n//# sourceURL=source.ts;
```

### `module.syncBuiltinESMExports()`

<!-- YAML
added: v12.12.0
-->

`module.syncBuiltinESMExports()` 方法更新所有内置 [ES 模块][] 的实时绑定，以匹配 [CommonJS][] 导出的属性。它不会从 [ES 模块][] 中添加或移除导出名称。

```js
const fs = require('node:fs');
const assert = require('node:assert');
const { syncBuiltinESMExports } = require('node:module');

fs.readFile = newAPI;

delete fs.readFileSync;

function newAPI() {
  // ...
}

fs.newAPI = newAPI;

syncBuiltinESMExports();

import('node:fs').then((esmFS) => {
  // 它将现有的 readFile 属性与新值同步
  assert.strictEqual(esmFS.readFile, newAPI);
  // readFileSync 已从所需的 fs 中删除
  assert.strictEqual('readFileSync' in fs, false);
  // syncBuiltinESMExports() 不会从 esmFS 中删除 readFileSync
  assert.strictEqual('readFileSync' in esmFS, true);
  // syncBuiltinESMExports() 不会添加名称
  assert.strictEqual(esmFS.newAPI, undefined);
});
```

## 模块编译缓存

<!-- YAML
added: v22.1.0
changes:
  - version: v22.8.0
    pr-url: https://github.com/nodejs/node/pull/54501
    description: 添加用于运行时访问的初始 JavaScript API。
-->

模块编译缓存可以通过 [`module.enableCompileCache()`][] 方法或 [`NODE_COMPILE_CACHE=dir`][] 环境变量启用。启用后，每当 Node.js 编译 CommonJS、ECMAScript 模块或 TypeScript 模块时，它将使用存储在指定目录中的磁盘上 [V8 代码缓存][] 来加速编译。这可能会减慢模块图的首次加载，但如果模块内容不变，后续加载同一模块图可能会获得显著的速度提升。

要清理磁盘上生成的编译缓存，只需删除缓存目录。下次再次使用同一目录进行编译缓存存储时，缓存目录将被重新创建。为了避免过时的缓存填满磁盘，建议使用 [`os.tmpdir()`][] 下的目录。如果通过调用 [`module.enableCompileCache()`][] 启用编译缓存而未指定 `directory`，Node.js 将使用 [`NODE_COMPILE_CACHE=dir`][] 环境变量（如果已设置），否则默认为 `path.join(os.tmpdir(), 'node-compile-cache')`。要定位正在运行的 Node.js 实例使用的编译缓存目录，请使用 [`module.getCompileCacheDir()`][]。

启用的模块编译缓存可以通过 [`NODE_DISABLE_COMPILE_CACHE=1`][] 环境变量禁用。当编译缓存导致意外或不需要的行为（例如测试覆盖率不够精确）时，这可能很有用。

目前，当启用编译缓存且模块被重新加载时，代码缓存会立即从编译后的代码生成，但只会在 Node.js 实例即将退出时写入磁盘。这可能会发生变化。[`module.flushCompileCache()`][] 方法可用于确保累积的代码缓存被刷新到磁盘，以防应用程序想要生成其他 Node.js 实例并让它们在主进程退出之前很久就共享缓存。

磁盘上的编译缓存布局是实现细节，不应依赖。生成的编译缓存通常仅在同一版本的 Node.js 中可重用，不应假设在不同版本的 Node.js 之间兼容。

### 编译缓存的便携性

默认情况下，当被缓存模块的绝对路径更改时，缓存会失效。为了在项目目录移动后保持缓存工作，请启用便携编译缓存。这允许以前编译的模块在不同的目录位置之间重用，只要相对于缓存目录的布局保持不变。这将尽力而为。如果 Node.js 无法计算模块相对于缓存目录的位置，则该模块将被缓存。

有两种方法可以启用便携模式：

1. 使用 [`module.enableCompileCache()`][] 中的便携选项：

   ```js
   // 非便携缓存（默认）：如果项目被移动，缓存将失效
   module.enableCompileCache({ directory: '/path/to/cache/storage/dir' });

   // 便携缓存：项目移动后缓存仍然有效
   module.enableCompileCache({ directory: '/path/to/cache/storage/dir', portable: true });
   ```

2. 设置环境变量：[`NODE_COMPILE_CACHE_PORTABLE=1`][]

### 编译缓存的局限性

目前，当将编译缓存与 [V8 JavaScript 代码覆盖率][] 一起使用时，V8 收集的覆盖率在从代码缓存反序列化的函数中可能不够精确。建议在运行测试以生成精确覆盖率时关闭此功能。

由一个版本的 Node.js 生成的编译缓存不能被不同版本的 Node.js 重用。如果使用相同的基础目录来持久化缓存，由不同版本的 Node.js 生成的缓存将分别存储，因此它们可以共存。

### `module.constants.compileCacheStatus`

<!-- YAML
added: v22.8.0
changes:
  - version: v25.4.0
    pr-url: https://github.com/nodejs/node/pull/60971
    description: 此功能不再是实验性的。
-->

以下常量作为 [`module.enableCompileCache()`][] 返回的对象中的 `status` 字段返回，以指示启用 [模块编译缓存][] 的尝试结果。

<table>
  <tr>
    <th>常量</th>
    <th>描述</th>
  </tr>
  <tr>
    <td><code>ENABLED</code></td>
    <td>
      Node.js 已成功启用编译缓存。用于存储编译缓存的目录将在返回对象的 <code>directory</code> 字段中返回。
    </td>
  </tr>
  <tr>
    <td><code>ALREADY_ENABLED</code></td>
    <td>
      编译缓存之前已启用， either 通过之前对 <code>module.enableCompileCache()</code> 的调用，或通过 <code>NODE_COMPILE_CACHE=dir</code> 环境变量。用于存储编译缓存的目录将在返回对象的 <code>directory</code> 字段中返回。
    </td>
  </tr>
  <tr>
    <td><code>FAILED</code></td>
    <td>
      Node.js 无法启用编译缓存。这可能是由于缺乏使用指定目录的权限，或各种文件系统错误。失败的详细信息将在返回对象的 <code>message</code> 字段中返回。
    </td>
  </tr>
  <tr>
    <td><code>DISABLED</code></td>
    <td>
      Node.js 无法启用编译缓存，因为已设置环境变量 <code>NODE_DISABLE_COMPILE_CACHE=1</code>。
    </td>
  </tr>
</table>

### `module.enableCompileCache([options])`

<!-- YAML
added: v22.8.0
changes:
  - version: v25.4.0
    pr-url: https://github.com/nodejs/node/pull/60971
    description: 此功能不再是实验性的。
  - version:
      - v25.0.0
      - v24.12.0
    pr-url: https://github.com/nodejs/node/pull/58797
    description: "添加 `portable` 选项以启用便携编译缓存。"
  - version:
      - v25.0.0
      - v24.12.0
    pr-url: https://github.com/nodejs/node/pull/59931
    description: "将未发布的 `path` 选项重命名为 `directory` 以保持一致性。"
-->

* `options` {string|Object} 可选。如果传递字符串，则被视为 `options.directory`。
  * `directory` {string} 可选。存储编译缓存的目录。如果未指定，如果设置了 [`NODE_COMPILE_CACHE=dir`][] 环境变量，则将使用该环境变量指定的目录，否则使用 `path.join(os.tmpdir(), 'node-compile-cache')`。
  * `portable` {boolean} 可选。如果为 `true`，则启用便携编译缓存，以便即使项目目录被移动，缓存也可以重用。这是一个尽力而为的功能。如果未指定，将取决于是否设置了环境变量 [`NODE_COMPILE_CACHE_PORTABLE=1`][]。
* 返回：{Object}
  * `status` {integer} [`module.constants.compileCacheStatus`][] 之一
  * `message` {string|undefined} 如果 Node.js 无法启用编译缓存，则包含错误消息。仅当 `status` 为 `module.constants.compileCacheStatus.FAILED` 时设置。
  * `directory` {string|undefined} 如果启用了编译缓存，则包含存储编译缓存的目录。仅当 `status` 为 `module.constants.compileCacheStatus.ENABLED` 或 `module.constants.compileCacheStatus.ALREADY_ENABLED` 时设置。

在当前 Node.js 实例中启用 [模块编译缓存][]。

对于一般用例，建议调用 `module.enableCompileCache()` 而不指定 `options.directory`，以便在必要时可以通过 `NODE_COMPILE_CACHE` 环境变量覆盖目录。

由于编译缓存应该是一种非关键任务的优化，此方法设计为在无法启用编译缓存时不抛出任何异常。相反，它将返回一个对象，其中包含 `message` 字段中的错误消息以辅助调试。如果成功启用编译缓存，返回对象中的 `directory` 字段包含存储编译缓存的目录路径。返回对象中的 `status` 字段将是 `module.constants.compileCacheStatus` 值之一，以指示启用 [模块编译缓存][] 的尝试结果。

此方法仅影响当前 Node.js 实例。要在子工作线程中启用它，要么也在子工作线程中调用此方法，要么将 `process.env.NODE_COMPILE_CACHE` 值设置为编译缓存目录，以便行为可以继承到子工作线程。目录可以从该方法返回的 `directory` 字段获取，或使用 [`module.getCompileCacheDir()`][] 获取。

### `module.flushCompileCache()`

<!-- YAML
added:
 - v23.0.0
 - v22.10.0
changes:
  - version: v25.4.0
    pr-url: https://github.com/nodejs/node/pull/60971
    description: 此功能不再是实验性的。
-->

将当前 Node.js 实例中已从已加载模块累积的 [模块编译缓存][] 刷新到磁盘。无论所有刷新文件系统操作成功与否，此方法都会在它们结束后返回。如果有任何错误，这将静默失败，因为编译缓存未命中不应干扰应用程序的实际操作。

### `module.getCompileCacheDir()`

<!-- YAML
added: v22.8.0
changes:
  - version: v25.4.0
    pr-url: https://github.com/nodejs/node/pull/60971
    description: 此功能不再是实验性的。
-->

* 返回：{string|undefined} 如果启用了 [模块编译缓存][] 目录，则为路径，否则为 `undefined`。

<i id="module_customization_hooks"></i>

## 自定义钩子

<!-- YAML
added: v8.8.0
changes:
  - version:
    - v25.4.0
    - v24.13.1
    pr-url: https://github.com/nodejs/node/pull/60960
    description: 同步和线程内钩子现在是发布候选。
  - version:
    - v23.5.0
    - v22.15.0
    pr-url: https://github.com/nodejs/node/pull/55698
    description: 添加对同步和线程内钩子的支持。
  - version:
    - v20.6.0
    - v18.19.0
    pr-url: https://github.com/nodejs/node/pull/48842
    description: "添加 `initialize` 钩子以替换 `globalPreload`。"
  - version:
    - v18.6.0
    - v16.17.0
    pr-url: https://github.com/nodejs/node/pull/42623
    description: 添加对链式加载器的支持。
  - version: v16.12.0
    pr-url: https://github.com/nodejs/node/pull/37468
    description: "移除 `getFormat`、`getSource`、`transformSource` 和 `globalPreload`；添加 `load` 钩子和 `getGlobalPreload` 钩子。"
-->

<!-- type=misc -->

Node.js 目前支持两种类型的模块自定义钩子：

1. [`module.registerHooks(options)`][`module.registerHooks()`]：接受同步钩子函数，这些函数直接在加载模块的线程上运行。
2. [`module.register(specifier[, parentURL][, options])`][`register`]：接受导出异步钩子函数的模块的标识符。函数在单独的加载器线程上运行。

异步钩子会产生来自线程间通信的额外开销，并且在模块图中自定义 CommonJS 模块时有 [几个注意事项][异步自定义钩子的注意事项]。在大多数情况下，建议通过 `module.registerHooks()` 使用同步钩子以简化操作。

### 同步自定义钩子

> 稳定性：1.2 - 发布候选

<i id="enabling_module_customization_hooks"></i>

#### 同步自定义钩子的注册

要注册同步自定义钩子，请使用 [`module.registerHooks()`][]，它直接接受内联的 [同步钩子函数][]。

```mjs
// register-hooks.js
import { registerHooks } from 'node:module';
registerHooks({
  resolve(specifier, context, nextResolve) { /* 实现 */ },
  load(url, context, nextLoad) { /* 实现 */ },
});
```

```cjs
// register-hooks.js
const { registerHooks } = require('node:module');
registerHooks({
  resolve(specifier, context, nextResolve) { /* 实现 */ },
  load(url, context, nextLoad) { /* 实现 */ },
});
```

##### 使用标志在应用程序代码运行之前注册钩子

可以通过使用 [`--import`][] 或 [`--require`][] 标志在应用程序代码运行之前注册钩子：

```bash
node --import ./register-hooks.js ./my-app.js
node --require ./register-hooks.js ./my-app.js
```

传递给 `--import` 或 `--require` 的标识符也可以来自包：

```bash
node --import some-package/register ./my-app.js
node --require some-package/register ./my-app.js
```

其中 `some-package` 有一个 [`"exports"`][] 字段，定义 `/register` 导出以映射到调用 `registerHooks()` 的文件，如上方的 `register-hooks.js` 示例。

使用 `--import` 或 `--require` 确保在任何应用程序代码加载之前注册钩子，包括应用程序的入口点，默认情况下也包括任何工作线程。

##### 以编程方式在应用程序代码运行之前注册钩子

或者，可以从入口点调用 `registerHooks()`。

如果入口点需要加载其他模块且加载过程需要自定义，请在注册钩子后使用 `require()` 或动态 `import()` 加载它们。不要在注册钩子的同一模块中使用静态 `import` 语句加载需要自定义的模块，因为静态 `import` 语句在导入器模块中的任何代码运行之前进行评估，包括对 `registerHooks()` 的调用，无论静态 `import` 语句出现在导入器模块中的何处。

```mjs
import { registerHooks } from 'node:module';

registerHooks({ /* 同步钩子的实现 */ });

// 如果使用静态导入加载，加载 my-app.mjs 时不会应用钩子，因为
// 静态导入的模块都在其导入器之前执行，无论静态导入出现在何处。
// import './my-app.mjs';

// 必须动态加载 my-app.mjs 以确保应用钩子。
await import('./my-app.mjs');
```

```cjs
const { registerHooks } = require('node:module');

registerHooks({ /* 同步钩子的实现 */ });

import('./my-app.mjs');
// 或者，如果 my-app.mjs 没有顶层 await 或者它是 CommonJS 模块，
// 也可以使用 require()：
// require('./my-app.mjs');
```

##### 使用 `data:` URL 在应用程序代码运行之前注册钩子

或者，可以将内联 JavaScript 代码嵌入到 `data:` URL 中，以便在应用程序代码运行之前注册钩子。例如，

```bash
node --import 'data:text/javascript,import {registerHooks} from "node:module"; registerHooks(/* 钩子代码 */);' ./my-app.js
```

#### 钩子的约定和链式调用

钩子是链的一部分，即使该链只包含一个自定义（用户提供的）钩子和默认钩子，默认钩子始终存在。

钩子函数嵌套：每个函数必须始终返回一个普通对象，链式调用是通过每个函数调用 `next<hookName>()` 发生的，这是对后续加载器钩子的引用（按 LIFO 顺序）。

可以多次调用 `registerHooks()`：

```mjs
// entrypoint.mjs
import { registerHooks } from 'node:module';

const hook1 = { /* 钩子的实现 */ };
const hook2 = { /* 钩子的实现 */ };
// hook2 在 hook1 之前运行。
registerHooks(hook1);
registerHooks(hook2);
```

```cjs
// entrypoint.cjs
const { registerHooks } = require('node:module');

const hook1 = { /* 钩子的实现 */ };
const hook2 = { /* 钩子的实现 */ };
// hook2 在 hook1 之前运行。
registerHooks(hook1);
registerHooks(hook2);
```

在此示例中，注册的钩子将形成链。这些链按后进先出 (LIFO) 运行。如果 `hook1` 和 `hook2` 都定义了 `resolve` 钩子，它们将被这样调用（注意从右到左，从 `hook2.resolve` 开始，然后是 `hook1.resolve`，然后是 Node.js 默认）：

Node.js 默认 `resolve` ← `hook1.resolve` ← `hook2.resolve`

同样适用于所有其他钩子。

返回缺少必需属性的值的钩子会触发异常。返回时未调用 `next<hookName>()` _且_ 未返回 `shortCircuit: true` 的钩子也会触发异常。这些错误有助于防止链中的意外中断。从钩子返回 `shortCircuit: true` 以表明链有意在你的钩子处结束。

如果在加载其他钩子模块时应应用钩子，则应在注册钩子后加载其他钩子模块。

#### 同步自定义钩子的注销

`registerHooks()` 返回的对象有一个 `deregister()` 方法，可用于从链中移除钩子。一旦调用 `deregister()`，在模块解析或加载期间将不再调用钩子。

目前仅适用于通过 `registerHooks()` 注册的同步钩子，不适用于通过 `module.register()` 注册的异步钩子。

```mjs
import { registerHooks } from 'node:module';

const hooks = registerHooks({
  resolve(specifier, context, nextResolve) {
    console.log('为 调用了 resolve 钩子', specifier);
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    return nextLoad(url, context);
  },
});

// 此时，钩子处于活动状态，将针对任何后续的 import() 或 require() 调用被调用。
await import('./my-module.mjs');

// 稍后，从链中移除钩子。
hooks.deregister();

// 后续加载将不再触发钩子。
await import('./another-module.mjs');
```

```cjs
const { registerHooks } = require('node:module');

const hooks = registerHooks({
  resolve(specifier, context, nextResolve) {
    console.log('为 调用了 resolve 钩子', specifier);
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    return nextLoad(url, context);
  },
});

// 此时，钩子处于活动状态，将针对任何后续的 require() 调用被调用。
require('./my-module.cjs');

// 稍后，从链中移除钩子。
hooks.deregister();

// 后续加载将不再触发钩子。
require('./another-module.cjs');
```

#### `module.registerHooks()` 接受的钩子函数

<!-- YAML
added:
  - v23.5.0
  - v22.15.0
-->

`module.registerHooks()` 方法接受以下同步钩子函数。

```mjs
function resolve(specifier, context, nextResolve) {
  // 接受 `import` 或 `require` 标识符并将其解析为 URL。
}

function load(url, context, nextLoad) {
  // 接受已解析的 URL 并返回要评估的源代码。
}
```

同步钩子在与加载模块相同的线程和相同的 [领域][] 中运行，钩子函数中的代码可以通过全局变量或其他共享状态直接将值传递给被引用的模块。

与异步钩子不同，同步钩子默认不会继承到子工作线程中，但如果使用 [`--import`][] 或 [`--require`][] 预加载的文件注册钩子，子工作线程可以通过 `process.execArgv` 继承预加载脚本。有关详细信息，请参阅 [`Worker` 的文档][]。

#### 同步 `resolve(specifier, context, nextResolve)`

<!-- YAML
changes:
  - version:
    - v23.5.0
    - v22.15.0
    pr-url: https://github.com/nodejs/node/pull/55698
    description: 添加对同步和线程内钩子的支持。
-->

* `specifier` {string}
* `context` {Object}
  * `conditions` {string\[]} 相关 `package.json` 的导出条件
  * `importAttributes` {Object} 一个对象，其键值对表示要导入的模块的属性
  * `parentURL` {string|undefined} 导入此模块的模块，如果这是 Node.js 入口点则为 undefined
* `nextResolve` {Function} 链中的后续 `resolve` 钩子，或在最后一个用户提供的 `resolve` 钩子之后的 Node.js 默认 `resolve` 钩子
  * `specifier` {string}
  * `context` {Object|undefined} 省略时，提供默认值。提供时，默认值与提供的属性合并，优先使用提供的属性。
* 返回：{Object}
  * `format` {string|null|undefined} 给 `load` 钩子的提示（可能会被忽略）。它可以是模块格式（如 `'commonjs'` 或 `'module'`）或任意值如 `'css'` 或 `'yaml'`。
  * `importAttributes` {Object|undefined} 缓存模块时使用的导入属性（可选；如果排除将使用输入）
  * `shortCircuit` {undefined|boolean} 一个信号，表明此钩子打算终止 `resolve` 钩子链。**默认值：** `false`
  * `url` {string} 此输入解析到的绝对 URL

`resolve` 钩子链负责告诉 Node.js 在哪里找到以及如何缓存给定的 `import` 语句或表达式，或 `require` 调用。它可以可选地返回一个格式（如 `'module'`）作为给 `load` 钩子的提示。如果指定了格式，`load` 钩子最终负责提供最终的 `format` 值（它可以自由忽略 `resolve` 提供的提示）；如果 `resolve` 提供了 `format`，则需要自定义 `load` 钩子，即使只是为了将值传递给 Node.js 默认 `load` 钩子。

导入类型属性是将加载的模块保存到内部模块缓存的缓存键的一部分。如果模块应使用与源代码中存在的属性不同的属性进行缓存，则 `resolve` 钩子负责返回 `importAttributes` 对象。

`context` 中的 `conditions` 属性是一个条件数组，将用于匹配此解析请求的 [包导出条件][条件导出]。它们可用于查找其他地方的条件映射或在调用默认解析逻辑时修改列表。

当前的 [包导出条件][条件导出] 始终在传递给钩子的 `context.conditions` 数组中。为了保证在调用 `defaultResolve` 时的_默认 Node.js 模块标识符解析行为_，传递给它的 `context.conditions` 数组_必须_包含最初传递给 `resolve` 钩子的 `context.conditions` 数组的_所有_元素。

```mjs
import { registerHooks } from 'node:module';

function resolve(specifier, context, nextResolve) {
  // 调用 `defaultResolve` 时，参数可以被修改。例如，
  // 更改标识符或添加适用的导出条件。
  if (specifier.includes('foo')) {
    specifier = specifier.replace('foo', 'bar');
    return nextResolve(specifier, {
      ...context,
      conditions: [...context.conditions, 'another-condition'],
    });
  }

  // 钩子也可以跳过默认解析并提供自定义 URL。
  if (specifier === 'special-module') {
    return {
      url: 'file:///path/to/special-module.mjs',
      format: 'module',
      shortCircuit: true,  // 如果未调用 nextResolve()，这是必需的。
    };
  }

  // 如果不需要自定义，则 defer 到链中的下一个钩子，如果这是最后一个用户指定的加载器，则将是
  // Node.js 默认 resolve。
  return nextResolve(specifier);
}

registerHooks({ resolve });
```

#### 同步 `load(url, context, nextLoad)`

<!-- YAML
changes:
  - version:
    - v23.5.0
    - v22.15.0
    pr-url: https://github.com/nodejs/node/pull/55698
    description: 添加对同步和线程内版本的支持。
-->

* `url` {string} `resolve` 链返回的 URL
* `context` {Object}
  * `conditions` {string\[]} 相关 `package.json` 的导出条件
  * `format` {string|null|undefined} `resolve` 钩子链可选提供的格式。这可以是任何字符串值作为输入；输入值不需要符合下面描述的可接受返回值列表。
  * `importAttributes` {Object}
* `nextLoad` {Function} 链中的后续 `load` 钩子，或在最后一个用户提供的 `load` 钩子之后的 Node.js 默认 `load` 钩子
  * `url` {string}
  * `context` {Object|undefined} 省略时，提供默认值。提供时，默认值与提供的属性合并，优先使用提供的属性。在默认 `nextLoad` 中，如果 `url` 指向的模块没有明确的模块类型信息，则 `context.format` 是必需的。
    <!-- TODO(joyeecheung): 使其至少可选地非必需，允许在格式未知时进行 JS 风格/TS 风格模块检测 -->
* 返回：{Object}
  * `format` {string} [下方][可接受的最终格式] 列出的可接受模块格式之一。
  * `shortCircuit` {undefined|boolean} 一个信号，表明此钩子打算终止 `load` 钩子链。**默认值：** `false`
  * `source` {string|ArrayBuffer|TypedArray} 供 Node.js 评估的源

`load` 钩子提供了一种定义自定义方法来检索已解析 URL 的源代码的方式。这将允许加载器 potentially 避免从磁盘读取文件。它还可用于将 unrecognized 格式映射到支持的格式，例如 `yaml` 到 `module`。

```mjs
import { registerHooks } from 'node:module';
import { Buffer } from 'node:buffer';

function load(url, context, nextLoad) {
  // 钩子可以跳过默认加载并提供自定义源代码。
  if (url === 'special-module') {
    return {
      source: 'export const special = 42;',
      format: 'module',
      shortCircuit: true,  // 如果未调用 nextLoad()，这是必需的。
    };
  }

  // 可以修改由下一步（可能是默认）加载的源代码，
  // 例如，在模块的源代码中将 'foo' 替换为 'bar'。
  const result = nextLoad(url, context);
  const source = typeof result.source === 'string' ?
    result.source : Buffer.from(result.source).toString('utf8');
  return {
    source: source.replace(/foo/g, 'bar'),
    ...result,
  };
}

registerHooks({ resolve });
```

在更高级的场景中，这也可用于将不支持的源转换为支持的源（参见下面的 [示例](#examples)）。

##### `load` 返回的可接受的最终格式

`format` 的最终值必须是以下之一：

| `format`                | 描述                                           | `load` 返回的 `source` 的可接受类型   |
| ----------------------- | ----------------------------------------------------- | -------------------------------------------------- |
| `'addon'`               | 加载 Node.js 插件                                  | {null}                                             |
| `'builtin'`             | 加载 Node.js 内置模块                         | {null}                                             |
| `'commonjs-typescript'` | 加载带有 TypeScript 语法的 Node.js CommonJS 模块 | {string\|ArrayBuffer\|TypedArray\|null\|undefined} |
| `'commonjs'`            | 加载 Node.js CommonJS 模块                        | {string\|ArrayBuffer\|TypedArray\|null\|undefined} |
| `'json'`                | 加载 JSON 文件                                      | {string\|ArrayBuffer\|TypedArray}                  |
| `'module-typescript'`   | 加载带有 TypeScript 语法的 ES 模块              | {string\|ArrayBuffer\|TypedArray}                  |
| `'module'`              | 加载 ES 模块                                     | {string\|ArrayBuffer\|TypedArray}                  |
| `'wasm'`                | 加载 WebAssembly 模块                             | {ArrayBuffer\|TypedArray}                          |

对于格式 `'builtin'`，`source` 的值被忽略，因为目前无法替换 Node.js 内置（核心）模块的值。

> 这些类型都对应于 ECMAScript 中定义的类。

* 特定的 {ArrayBuffer} 对象是 {SharedArrayBuffer}。
* 特定的 {TypedArray} 对象是 {Uint8Array}。

如果基于文本的格式（即 `'json'`，`'module'`）的源值不是字符串，则使用 [`util.TextDecoder`][] 将其转换为字符串。

### 异步自定义钩子

> 稳定性：1.1 - 积极开发中

#### 异步自定义钩子的注意事项

异步自定义钩子有许多注意事项，尚不确定其问题是否可以解决。鼓励用户使用 `module.registerHooks()` 通过同步自定义钩子来避免这些注意事项。

* 异步钩子在单独的线程上运行，因此钩子函数不能直接改变被自定义模块的全局状态。通常使用消息通道和原子操作在两者之间传递数据或影响控制流。参见 [与异步模块自定义钩子通信](#与异步模块自定义钩子通信)。
* 异步钩子不影响模块图中的所有 `require()` 调用。
  * 使用 `module.createRequire()` 创建的自定义 `require` 函数不受影响。
  * 如果异步 `load` 钩子不覆盖经过它的 CommonJS 模块的 `source`，则那些 CommonJS 模块通过内置 `require()` 加载的子模块也不会受到异步钩子的影响。
* 自定义 CommonJS 模块时，异步钩子需要处理几个注意事项。有关详细信息，请参阅 [异步 `resolve` 钩子][] 和 [异步 `load` 钩子][]。
* 当 CommonJS 模块内的 `require()` 调用被异步钩子自定义时，Node.js 可能需要多次加载 CommonJS 模块的源代码以保持与现有 CommonJS 猴子补丁的兼容性。如果模块代码在加载之间发生变化，这可能导致意外行为。
  * 作为副作用，如果同时注册了异步钩子和同步钩子，并且异步钩子选择自定义 CommonJS 模块，则对于该 CommonJS 模块中的 `require()` 调用，同步钩子可能会被调用多次。

#### 异步自定义钩子的注册

异步自定义钩子使用 [`module.register()`][`register`] 注册，它接受导出 [异步钩子函数][] 的另一个模块的路径或 URL。

类似于 `registerHooks()`，`register()` 可以在 `--import` 或 `--require` 预加载的模块中调用，或在入口点内直接调用。

```mjs
// 使用 module.register() 在专用线程中注册异步钩子。
import { register } from 'node:module';
register('./hooks.mjs', import.meta.url);

// 如果 my-app.mjs 在此处作为 `import './my-app.mjs'` 静态加载，由于 ESM
// 依赖项在导入它们的模块之前评估，
// 它在上面的钩子注册_之前_加载，不会受到影响。
// 为确保应用钩子，必须使用动态 import() 在注册钩子后加载 ESM。
import('./my-app.mjs');
```

```cjs
const { register } = require('node:module');
const { pathToFileURL } = require('node:url');
// 使用 module.register() 在专用线程中注册异步钩子。
register('./hooks.mjs', pathToFileURL(__filename));

import('./my-app.mjs');
```

在 `hooks.mjs` 中：

```mjs
// hooks.mjs
export async function resolve(specifier, context, nextResolve) {
  /* 实现 */
}
export async function load(url, context, nextLoad) {
  /* 实现 */
}
```

与同步钩子不同，异步钩子不会为调用 `register()` 的文件中加载的这些模块运行：

<!-- eslint-disable no-restricted-globals -->

```mjs
// register-hooks.js
import { register, createRequire } from 'node:module';
register('./hooks.mjs', import.meta.url);

// 异步钩子不影响通过 module.createRequire() 创建的自定义 require()
// 函数加载的模块。
const userRequire = createRequire(__filename);
userRequire('./my-app-2.cjs');  // 钩子不会影响这个
```

<!-- eslint-enable no-restricted-globals -->

```cjs
// register-hooks.js
const { register, createRequire } = require('node:module');
const { pathToFileURL } = require('node:url');
register('./hooks.mjs', pathToFileURL(__filename));

// 异步钩子不影响通过调用 `register()` 的模块中的内置 require()
// 加载的模块
require('./my-app-2.cjs');  // 钩子不会影响这个
// .. 或通过 module.createRequire() 创建的自定义 require() 函数。
const userRequire = createRequire(__filename);
userRequire('./my-app-3.cjs');  // 钩子不会影响这个
```

异步钩子也可以使用 `data:` URL 和 `--import` 标志注册：

```bash
node --import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("my-instrumentation", pathToFileURL("./"));' ./my-app.js
```

#### 异步自定义钩子的链式调用

`register()` 的链式调用与 `registerHooks()` 类似。如果混合了同步和异步钩子，同步钩子总是在异步钩子开始运行之前运行，也就是说，在运行的最后一个同步钩子中，其下一个钩子包括异步钩子的调用。

```mjs
// entrypoint.mjs
import { register } from 'node:module';

register('./foo.mjs', import.meta.url);
register('./bar.mjs', import.meta.url);
await import('./my-app.mjs');
```

```cjs
// entrypoint.cjs
const { register } = require('node:module');
const { pathToFileURL } = require('node:url');

const parentURL = pathToFileURL(__filename);
register('./foo.mjs', parentURL);
register('./bar.mjs', parentURL);
import('./my-app.mjs');
```

如果 `foo.mjs` 和 `bar.mjs` 定义了 `resolve` 钩子，它们将被这样调用（注意从右到左，从 `./bar.mjs` 开始，然后是 `./foo.mjs`，然后是 Node.js 默认）：

Node.js 默认 ← `./foo.mjs` ← `./bar.mjs`

使用异步钩子时，注册的钩子也会影响后续的 `register` 调用，这负责加载钩子模块。在上面的示例中，`bar.mjs` 将通过 `foo.mjs` 注册的钩子解析和加载（因为 `foo` 的钩子已经添加到链中）。这允许做一些事情，比如用非 JavaScript 语言编写钩子，只要早期注册的钩子转译为 JavaScript。

`register()` 方法不能从运行导出异步钩子的钩子模块或其依赖项的线程中调用。

#### 与异步模块自定义钩子的通信

异步钩子在专用线程上运行，与运行应用程序代码的主线程分开。这意味着改变全局变量不会影响其他线程，必须使用消息通道在线程之间通信。

`register` 方法可用于将数据传递给 [`initialize`][] 钩子。传递给钩子的数据可能包括可传输对象，如端口。

```mjs
import { register } from 'node:module';
import { MessageChannel } from 'node:worker_threads';

// 此示例演示如何使用消息通道与钩子通信，通过将 `port2` 发送给钩子。
const { port1, port2 } = new MessageChannel();

port1.on('message', (msg) => {
  console.log(msg);
});
port1.unref();

register('./my-hooks.mjs', {
  parentURL: import.meta.url,
  data: { number: 1, port: port2 },
  transferList: [port2],
});
```

```cjs
const { register } = require('node:module');
const { pathToFileURL } = require('node:url');
const { MessageChannel } = require('node:worker_threads');

// 此示例展示如何使用消息通道与钩子通信，通过将 `port2` 发送给钩子。
const { port1, port2 } = new MessageChannel();

port1.on('message', (msg) => {
  console.log(msg);
});
port1.unref();

register('./my-hooks.mjs', {
  parentURL: pathToFileURL(__filename),
  data: { number: 1, port: port2 },
  transferList: [port2],
});
```

#### `module.register()` 接受的异步钩子

<!-- YAML
added: v8.8.0
changes:
  - version:
    - v20.6.0
    - v18.19.0
    pr-url: https://github.com/nodejs/node/pull/48842
    description: "添加 `initialize` 钩子以替换 `globalPreload`。"
  - version:
    - v18.6.0
    - v16.17.0
    pr-url: https://github.com/nodejs/node/pull/42623
    description: 添加对链式加载器的支持。
  - version: v16.12.0
    pr-url: https://github.com/nodejs/node/pull/37468
    description: "移除 `getFormat`、`getSource`、`transformSource` 和 `globalPreload`；添加 `load` 钩子和 `getGlobalPreload` 钩子。"
-->

[`register`][] 方法可用于注册导出的一组钩子的模块。钩子是 Node.js 调用的函数，用于自定义模块解析和加载过程。导出的函数必须具有特定的名称和签名，并且必须作为命名导出导出。

```mjs
export async function initialize({ number, port }) {
  // 接收来自 `register` 的数据。
}

export async function resolve(specifier, context, nextResolve) {
  // 接受 `import` 或 `require` 标识符并将其解析为 URL。
}

export async function load(url, context, nextLoad) {
  // 接受已解析的 URL 并返回要评估的源代码。
}
```

异步钩子在单独的线程中运行，与运行应用程序代码的主线程隔离。这意味着它是一个不同的 [领域][]。钩子线程可能随时被主线程终止，因此不要依赖异步操作（如 `console.log`）完成。它们默认继承到子工作线程中。

#### `initialize()`

<!-- YAML
added:
  - v20.6.0
  - v18.19.0
-->

* `data` {any} 来自 `register(loader, import.meta.url, { data })` 的数据。

`initialize` 钩子仅由 [`register`][] 接受。`registerHooks()` 不支持也不需要它，因为同步钩子的初始化可以直接在调用 `registerHooks()` 之前运行。

`initialize` 钩子提供了一种定义自定义函数的方法，该函数在钩子模块初始化时在钩子线程中运行。初始化发生在通过 [`register`][] 注册钩子模块时。

此钩子可以接收来自 [`register`][] 调用的数据，包括端口和其他可传输对象。`initialize` 的返回值可以是 {Promise}，在这种情况下，在主应用程序线程执行恢复之前将等待它。

模块自定义代码：

```mjs
// path-to-my-hooks.js

export async function initialize({ number, port }) {
  port.postMessage(`increment: ${number + 1}`);
}
```

调用者代码：

```mjs
import assert from 'node:assert';
import { register } from 'node:module';
import { MessageChannel } from 'node:worker_threads';

// 此示例展示如何使用消息通道在主（应用程序）线程和在钩子线程上运行的钩子之间通信，通过将 `port2` 发送给 `initialize` 钩子。
const { port1, port2 } = new MessageChannel();

port1.on('message', (msg) => {
  assert.strictEqual(msg, 'increment: 2');
});
port1.unref();

register('./path-to-my-hooks.js', {
  parentURL: import.meta.url,
  data: { number: 1, port: port2 },
  transferList: [port2],
});
```

```cjs
const assert = require('node:assert');
const { register } = require('node:module');
const { pathToFileURL } = require('node:url');
const { MessageChannel } = require('node:worker_threads');

// 此示例展示如何使用消息通道在主（应用程序）线程和在钩子线程上运行的钩子之间通信，通过将 `port2` 发送给 `initialize` 钩子。
const { port1, port2 } = new MessageChannel();

port1.on('message', (msg) => {
  assert.strictEqual(msg, 'increment: 2');
});
port1.unref();

register('./path-to-my-hooks.js', {
  parentURL: pathToFileURL(__filename),
  data: { number: 1, port: port2 },
  transferList: [port2],
});
```

#### 异步 `resolve(specifier, context, nextResolve)`

<!-- YAML
changes:
  - version:
    - v21.0.0
    - v20.10.0
    - v18.19.0
    pr-url: https://github.com/nodejs/node/pull/50140
    description: "属性 `context.importAssertions` 被替换为 `context.importAttributes`。使用旧名称仍然受支持，但会发出实验性警告。"
  - version:
    - v18.6.0
    - v16.17.0
    pr-url: https://github.com/nodejs/node/pull/42623
    description: "添加对链式 resolve 钩子的支持。每个钩子必须 either 调用 `nextResolve()` 或在其返回中包含设置为 `true` 的 `shortCircuit` 属性。"
  - version:
    - v17.1.0
    - v16.14.0
    pr-url: https://github.com/nodejs/node/pull/40250
    description: 添加对导入断言的支持。
-->

* `specifier` {string}
* `context` {Object}
  * `conditions` {string\[]} 相关 `package.json` 的导出条件
  * `importAttributes` {Object} 一个对象，其键值对表示要导入的模块的属性
  * `parentURL` {string|undefined} 导入此模块的模块，如果这是 Node.js 入口点则为 undefined
* `nextResolve` {Function} 链中的后续 `resolve` 钩子，或在最后一个用户提供的 `resolve` 钩子之后的 Node.js 默认 `resolve` 钩子
  * `specifier` {string}
  * `context` {Object|undefined} 省略时，提供默认值。提供时，默认值与提供的属性合并，优先使用提供的属性。
* 返回：{Object|Promise} 异步版本接受包含以下属性的对象，或解析为此类对象的 `Promise`。
  * `format` {string|null|undefined} 给 `load` 钩子的提示（可能会被忽略）。它可以是模块格式（如 `'commonjs'` 或 `'module'`）或任意值如 `'css'` 或 `'yaml'`。
  * `importAttributes` {Object|undefined} 缓存模块时使用的导入属性（可选；如果排除将使用输入）
  * `shortCircuit` {undefined|boolean} 一个信号，表明此钩子打算终止 `resolve` 钩子链。**默认值：** `false`
  * `url` {string} 此输入解析到的绝对 URL

异步版本的工作方式与同步版本类似，只是 `nextResolve` 函数返回一个 `Promise`，并且 `resolve` 钩子本身可以返回一个 `Promise`。

> **警告** 在异步版本的情况下，尽管支持返回 promises 和异步函数，但对 `resolve` 的调用仍可能阻塞主线程，从而影响性能。

> **警告** 在被异步钩子自定义的 CommonJS 模块内的 `require()` 调用所调用的 `resolve` 钩子不会接收传递给 `require()` 的原始标识符。相反，它接收一个已经使用默认 CommonJS 解析完全解析的 URL。

> **警告** 在被异步自定义钩子自定义的 CommonJS 模块中，`require.resolve()` 和 `require()` 将使用 `"import"` 导出条件而不是 `"require"`，这可能在加载双包时导致意外行为。

```mjs
export async function resolve(specifier, context, nextResolve) {
  // 调用 `defaultResolve` 时，参数可以被修改。例如，
  // 更改标识符或添加条件。
  if (specifier.includes('foo')) {
    specifier = specifier.replace('foo', 'bar');
    return nextResolve(specifier, {
      ...context,
      conditions: [...context.conditions, 'another-condition'],
    });
  }

  // 钩子也可以跳过默认解析并提供自定义 URL。
  if (specifier === 'special-module') {
    return {
      url: 'file:///path/to/special-module.mjs',
      format: 'module',
      shortCircuit: true,  // 如果未调用 nextResolve()，这是必需的。
    };
  }

  // 如果不需要自定义，则 defer 到链中的下一个钩子，如果这是最后一个用户指定的加载器，则将是
  // Node.js 默认 resolve。
  return nextResolve(specifier);
}
```

#### 异步 `load(url, context, nextLoad)`

<!-- YAML
changes:
  - version: v22.6.0
    pr-url: https://github.com/nodejs/node/pull/56350
    description: "添加对格式 `commonjs-typescript` 和 `module-typescript` 的 `source` 支持。"
  - version: v20.6.0
    pr-url: https://github.com/nodejs/node/pull/47999
    description: "添加对格式 `commonjs` 的 `source` 支持。"
  - version:
    - v18.6.0
    - v16.17.0
    pr-url: https://github.com/nodejs/node/pull/42623
    description: "添加对链式 load 钩子的支持。每个钩子必须 either 调用 `nextLoad()` 或在其返回中包含设置为 `true` 的 `shortCircuit` 属性。"
-->

* `url` {string} `resolve` 链返回的 URL
* `context` {Object}
  * `conditions` {string\[]} 相关 `package.json` 的导出条件
  * `format` {string|null|undefined} `resolve` 钩子链可选提供的格式。这可以是任何字符串值作为输入；输入值不需要符合下面描述的可接受返回值列表。
  * `importAttributes` {Object}
* `nextLoad` {Function} 链中的后续 `load` 钩子，或在最后一个用户提供的 `load` 钩子之后的 Node.js 默认 `load` 钩子
  * `url` {string}
  * `context` {Object|undefined} 省略时，提供默认值。提供时，默认值与提供的属性合并，优先使用提供的属性。在默认 `nextLoad` 中，如果 `url` 指向的模块没有明确的模块类型信息，则 `context.format` 是必需的。
    <!-- TODO(joyeecheung): 使其至少可选地非必需，允许在格式未知时进行 JS 风格/TS 风格模块检测 -->
* 返回：{Promise} 异步版本接受包含以下属性的对象，或解析为此类对象的 `Promise`。
  * `format` {string}
  * `shortCircuit` {undefined|boolean} 一个信号，表明此钩子打算终止 `load` 钩子链。**默认值：** `false`
  * `source` {string|ArrayBuffer|TypedArray} 供 Node.js 评估的源

> **警告**：异步 `load` 钩子和 CommonJS 模块的命名空间导出不兼容。尝试一起使用它们将导致导入返回一个空对象。这可能会在未来得到解决。这不适用于同步 `load` 钩子，在这种情况下，导出可以照常使用。

异步版本的工作方式与同步版本类似，尽管在使用异步 `load` 钩子时，省略 vs 提供 `'commonjs'` 的 `source` 具有非常不同的效果：

* 当提供 `source` 时，此模块的所有 `require` 调用将由带有注册的 `resolve` 和 `load` 钩子的 ESM 加载器处理；此模块的所有 `require.resolve` 调用将由带有注册的 `resolve` 钩子的 ESM 加载器处理；只有一部分 CommonJS API 可用（例如，没有 `require.extensions`，没有 `require.cache`，没有 `require.resolve.paths`），并且 CommonJS 模块加载器上的猴子补丁将不适用。
* 如果 `source` 为 undefined 或 `null`，它将由 CommonJS 模块加载器处理，`require`/`require.resolve` 调用将不会经过注册的钩子。这种针对 nullish `source` 的行为是暂时的 — 在未来，nullish `source` 将不受支持。

这些注意事项不适用于同步 `load` 钩子，在这种情况下，自定义 CommonJS 模块可用完整的 CommonJS API 集，并且 `require`/`require.resolve` 始终通过注册的钩子。

Node.js 内部异步 `load` 实现，它是 `load` 链中最后一个钩子的 `next` 值，当 `format` 为 `'commonjs'` 时为向后兼容返回 `null` 作为 `source`。这是一个将选择使用非默认行为的示例钩子：

```mjs
import { readFile } from 'node:fs/promises';

// module.register() 接受的异步版本。module.registerHooks() 接受的同步版本不需要此修复。
export async function load(url, context, nextLoad) {
  const result = await nextLoad(url, context);
  if (result.format === 'commonjs') {
    result.source ??= await readFile(new URL(result.responseURL ?? url));
  }
  return result;
}
```

这也不适用于同步 `load` 钩子，在这种情况下，返回的 `source` 包含由下一个钩子加载的源代码，无论模块格式如何。

### 示例

各种模块自定义钩子可以一起使用，以完成 Node.js 代码加载和评估行为的广泛自定义。

#### 从 HTTPS 导入

下面的钩子注册钩子以启用对此类标识符的基本支持。虽然这似乎是对 Node.js 核心功能的重大改进，但实际使用这些钩子存在 substantial 缺点：性能比从磁盘加载文件慢得多，没有缓存，也没有安全性。

```mjs
// https-hooks.mjs
import { get } from 'node:https';

export function load(url, context, nextLoad) {
  // 对于要通过网络加载的 JavaScript，我们需要获取并
  // 返回它。
  if (url.startsWith('https://')) {
    return new Promise((resolve, reject) => {
      get(url, (res) => {
        let data = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => resolve({
          // 本示例假设所有网络提供的 JavaScript 都是 ES 模块
          // 代码。
          format: 'module',
          shortCircuit: true,
          source: data,
        }));
      }).on('error', (err) => reject(err));
    });
  }

  // 让 Node.js 处理所有其他 URL。
  return nextLoad(url);
}
```

```mjs
// main.mjs
import { VERSION } from 'https://coffeescript.org/browser-compiler-modern/coffeescript.js';

console.log(VERSION);
```

使用前面的钩子模块，运行
`node --import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register(pathToFileURL("./https-hooks.mjs"));' ./main.mjs`
会根据 `main.mjs` 中 URL 处的模块打印 CoffeeScript 的当前版本。

<!-- TODO(joyeecheung): 添加一个关于如何基于
workers 和 Atomics.wait() 实现 fetchSync 的示例 - 或者所有这些示例对于 API
文档来说已经太多了，应该放到仓库中？ -->

#### 转译

Node.js 无法理解的格式的来源可以使用 [`load` 钩子][load 钩子] 转换为 JavaScript。

这比在运行 Node.js 之前转译源文件的性能要低；
转译器钩子应仅用于开发和测试目的。

##### 异步版本

```mjs
// coffeescript-hooks.mjs
import { readFile } from 'node:fs/promises';
import { findPackageJSON } from 'node:module';
import coffeescript from 'coffeescript';

const extensionsRegex = /\.(coffee|litcoffee|coffee\.md)$/;

export async function load(url, context, nextLoad) {
  if (extensionsRegex.test(url)) {
    // CoffeeScript 文件可以是 CommonJS 或 ES 模块。使用自定义格式
    // 告诉 Node.js 不要检测其模块类型。
    const { source: rawSource } = await nextLoad(url, { ...context, format: 'coffee' });
    // 此钩子将 CoffeeScript 源代码转换为 JavaScript 源代码
    // 针对所有导入的 CoffeeScript 文件。
    const transformedSource = coffeescript.compile(rawSource.toString(), url);

    // 为了确定 Node.js 如何解释转译结果，
    // 在文件系统中向上搜索最近的父级 package.json 文件
    // 并读取其 "type" 字段。
    return {
      format: await getPackageType(url),
      shortCircuit: true,
      source: transformedSource,
    };
  }

  // 让 Node.js 处理所有其他 URL。
  return nextLoad(url, context);
}

async function getPackageType(url) {
  // `url` 仅在第一次迭代时是文件路径，当从 load() 钩子传递
  // 解析后的 url 时
  // 来自 load() 的实际文件路径将包含文件扩展名，因为它是
  // 规范所要求的
  // 这个简单的真值检查 `url` 是否包含文件扩展名将
  // 适用于大多数项目，但不涵盖某些边缘情况（例如
  // 无扩展名的文件或以后跟空格结尾的 url）
  const pJson = findPackageJSON(url);

  return readFile(pJson, 'utf8')
    .then(JSON.parse)
    .then((json) => json?.type)
    .catch(() => undefined);
}
```

##### 同步版本

```mjs
// coffeescript-sync-hooks.mjs
import { readFileSync } from 'node:fs';
import { registerHooks, findPackageJSON } from 'node:module';
import coffeescript from 'coffeescript';

const extensionsRegex = /\.(coffee|litcoffee|coffee\.md)$/;

function load(url, context, nextLoad) {
  if (extensionsRegex.test(url)) {
    const { source: rawSource } = nextLoad(url, { ...context, format: 'coffee' });
    const transformedSource = coffeescript.compile(rawSource.toString(), url);

    return {
      format: getPackageType(url),
      shortCircuit: true,
      source: transformedSource,
    };
  }

  return nextLoad(url, context);
}

function getPackageType(url) {
  const pJson = findPackageJSON(url);
  if (!pJson) {
    return undefined;
  }
  try {
    const file = readFileSync(pJson, 'utf-8');
    return JSON.parse(file)?.type;
  } catch {
    return undefined;
  }
}

registerHooks({ load });
```

#### 运行钩子

```coffee
# main.coffee
import { scream } from './scream.coffee'
console.log scream 'hello, world'

import { version } from 'node:process'
console.log "Brought to you by Node.js version #{version}"
```

```coffee
# scream.coffee
export scream = (str) -> str.toUpperCase()
```

为了运行示例，添加一个包含 CoffeeScript 文件模块类型的 `package.json` 文件。

```json
{
  "type": "module"
}
```

这仅用于运行示例。在现实世界的加载器中，`getPackageType()` 必须能够返回一个 Node.js 已知的 `format`，即使 `package.json` 中没有显式类型，否则 `nextLoad` 调用将抛出 `ERR_UNKNOWN_FILE_EXTENSION`（如果为 undefined）或 `ERR_UNKNOWN_MODULE_FORMAT`（如果它不是 [load 钩子][] 文档中列出的已知格式）。

使用前面的钩子模块，运行
`node --import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register(pathToFileURL("./coffeescript-hooks.mjs"));' ./main.coffee`
或 `node --import ./coffeescript-sync-hooks.mjs ./main.coffee`
会导致 `main.coffee` 在其源代码从磁盘加载后但在 Node.js 执行之前转换为 JavaScript；任何通过已加载文件的 `import` 语句引用的 `.coffee`、`.litcoffee` 或 `.coffee.md` 文件也是如此。

#### 导入映射

前两个示例定义了 `load` 钩子。这是一个 `resolve` 钩子的示例。此钩子模块读取一个 `import-map.json` 文件，该文件定义了要将哪些说明符覆盖为其他 URL（这是“导入映射”规范的一小部分的一个非常简化的实现）。

##### 异步版本

```mjs
// import-map-hooks.js
import fs from 'node:fs/promises';

const { imports } = JSON.parse(await fs.readFile('import-map.json'));

export async function resolve(specifier, context, nextResolve) {
  if (Object.hasOwn(imports, specifier)) {
    return nextResolve(imports[specifier], context);
  }

  return nextResolve(specifier, context);
}
```

##### 同步版本

```mjs
// import-map-sync-hooks.js
import fs from 'node:fs/promises';
import module from 'node:module';

const { imports } = JSON.parse(fs.readFileSync('import-map.json', 'utf-8'));

function resolve(specifier, context, nextResolve) {
  if (Object.hasOwn(imports, specifier)) {
    return nextResolve(imports[specifier], context);
  }

  return nextResolve(specifier, context);
}

module.registerHooks({ resolve });
```

##### 使用钩子

使用这些文件：

```mjs
// main.js
import 'a-module';
```

```json
// import-map.json
{
  "imports": {
    "a-module": "./some-module.js"
  }
}
```

```mjs
// some-module.js
console.log('some module!');
```

运行 `node --import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register(pathToFileURL("./import-map-hooks.js"));' main.js`
或 `node --import ./import-map-sync-hooks.js main.js`
应该打印 `some module!`。

## 源代码映射支持

<!-- YAML
added:
 - v13.7.0
 - v12.17.0
-->

> 稳定性：1 - 实验性

Node.js 支持 TC39 ECMA-426 [源代码映射][] 格式（它被称为源代码映射修订版 3 格式）。

本节中的 API 是与源代码映射缓存交互的辅助工具。当启用源代码映射解析并且在模块的脚注中找到 [源代码映射包含指令][] 时，将填充此缓存。

要启用源代码映射解析，必须使用标志 [`--enable-source-maps`][] 运行 Node.js，或者通过设置 [`NODE_V8_COVERAGE=dir`][] 启用代码覆盖率，或者通过 [`module.setSourceMapsSupport()`][] 以编程方式启用。

```mjs
// module.mjs
// 在 ECMAScript 模块中
import { findSourceMap, SourceMap } from 'node:module';
```

```cjs
// module.cjs
// 在 CommonJS 模块中
const { findSourceMap, SourceMap } = require('node:module');
```

### `module.getSourceMapsSupport()`

<!-- YAML
added:
  - v23.7.0
  - v22.14.0
-->

* 返回：{Object}
  * `enabled` {boolean} 是否启用了源代码映射支持
  * `nodeModules` {boolean} 是否对 `node_modules` 中的文件启用了支持。
  * `generatedCode` {boolean} 是否对来自 `eval` 或 `new Function` 的生成代码启用了支持。

此方法返回是否启用了用于堆栈跟踪的 [源代码映射 v3][源代码映射] 支持。

<!-- Anchors to make sure old links find a target -->

<a id="module_module_findsourcemap_path_error"></a>

### `module.findSourceMap(path)`

<!-- YAML
added:
 - v13.7.0
 - v12.17.0
-->

* `path` {string}
* 返回：{module.SourceMap|undefined} 如果找到源代码映射则返回 `module.SourceMap`，否则返回 `undefined`。

`path` 是应获取相应源代码映射的文件的路径。

### `module.setSourceMapsSupport(enabled[, options])`

<!-- YAML
added:
  - v23.7.0
  - v22.14.0
-->

* `enabled` {boolean} 启用源代码映射支持。
* `options` {Object} 可选
  * `nodeModules` {boolean} 是否启用对 `node_modules` 中文件的支持。**默认值：** `false`。
  * `generatedCode` {boolean} 是否启用对来自 `eval` 或 `new Function` 的生成代码的支持。**默认值：** `false`。

此函数启用或禁用用于堆栈跟踪的 [源代码映射 v3][源代码映射] 支持。

它提供与使用命令行选项 `--enable-source-maps` 启动 Node.js 进程相同的功能，并提供额外选项来更改对 `node_modules` 中文件或生成代码的支持。

只有在启用源代码映射后加载的 JavaScript 文件中的源代码映射才会被解析和加载。最好使用命令行选项 `--enable-source-maps` 以避免丢失在此 API 调用之前加载的模块的源代码映射。

### Class: `module.SourceMap`

<!-- YAML
added:
 - v13.7.0
 - v12.17.0
-->

#### `new SourceMap(payload[, { lineLengths }])`

<!-- YAML
changes:
  - version: v20.5.0
    pr-url: https://github.com/nodejs/node/pull/48461
    description: "添加对 `lineLengths` 的支持。"
-->

* `payload` {Object}
* `lineLengths` {number\[]}

创建一个新的 `sourceMap` 实例。

`payload` 是一个键与 [源代码映射格式][] 匹配的对象：

* `file` {string}
* `version` {number}
* `sources` {string\[]}
* `sourcesContent` {string\[]}
* `names` {string\[]}
* `mappings` {string}
* `sourceRoot` {string}

`lineLengths` 是生成代码中每行长度的可选数组。

#### `sourceMap.payload`

* 返回：{Object}

用于构造 [`SourceMap`][] 实例的有效负载的 getter。

#### `sourceMap.findEntry(lineOffset, columnOffset)`

* `lineOffset` {number} 生成源中从零开始的行号偏移量
* `columnOffset` {number} 生成源中从零开始的列号偏移量
* 返回：{Object}

给定生成源文件中的行偏移量和列偏移量，如果找到则返回表示原始文件中 SourceMap 范围的对象，否则返回空对象。

返回的对象包含以下键：

* `generatedLine` {number} 生成源中范围起始的行偏移量
* `generatedColumn` {number} 生成源中范围起始的列偏移量
* `originalSource` {string} 原始源的文件名，如 SourceMap 中报告
* `originalLine` {number} 原始源中范围起始的行偏移量
* `originalColumn` {number} 原始源中范围起始的列偏移量
* `name` {string}

返回值表示 SourceMap 中出现的原始范围，基于从零开始的偏移量，_不是_ 错误消息和 CallSite 对象中出现的从 1 开始的行号和列号。

要从错误堆栈和 CallSite 对象报告的行号和列号获取相应的从 1 开始的行号和列号，请使用 `sourceMap.findOrigin(lineNumber, columnNumber)`

#### `sourceMap.findOrigin(lineNumber, columnNumber)`

<!-- YAML
added:
  - v20.4.0
  - v18.18.0
-->

* `lineNumber` {number} 生成源中调用站的从 1 开始的行号
* `columnNumber` {number} 生成源中调用站的从 1 开始的列号
* 返回：{Object}

给定生成源中调用站的从 1 开始的 `lineNumber` 和 `columnNumber`，查找原始源中相应的调用站位置。

如果在任何源代码映射中未找到提供的 `lineNumber` 和 `columnNumber`，则返回空对象。否则，返回的对象包含以下键：

* `name` {string|undefined} 源代码映射中范围的名称（如果提供）
* `fileName` {string} 原始源的文件名，如 SourceMap 中报告
* `lineNumber` {number} 原始源中相应调用站的从 1 开始的行号
* `columnNumber` {number} 原始源中相应调用站的从 1 开始的列号

[CommonJS]: modules.md
[条件导出]: packages.md#conditional-exports
[自定义钩子]: #customization-hooks
[ES 模块]: esm.md
[权限模型]: permissions.md#permission-model
[源代码映射]: https://tc39.es/ecma426/
[源代码映射格式]: https://tc39.es/ecma426/#sec-source-map-format
[V8 JavaScript 代码覆盖率]: https://v8project.blogspot.com/2017/12/javascript-code-coverage.html
[V8 代码缓存]: https://v8.dev/blog/code-caching-for-devs
[`"exports"`]: packages.md#exports
[`--enable-source-maps`]: cli.md#--enable-source-maps
[`--import`]: cli.md#--importmodule
[`--require`]: cli.md#-r---require-module
[`NODE_COMPILE_CACHE=dir`]: cli.md#node_compile_cachedir
[`NODE_COMPILE_CACHE_PORTABLE=1`]: cli.md#node_compile_cache_portable1
[`NODE_DISABLE_COMPILE_CACHE=1`]: cli.md#node_disable_compile_cache1
[`NODE_V8_COVERAGE=dir`]: cli.md#node_v8_coveragedir
[`SourceMap`]: #class-modulesourcemap
[`initialize`]: #initialize
[`module.constants.compileCacheStatus`]: #moduleconstantscompilecachestatus
[`module.enableCompileCache()`]: #moduleenablecompilecacheoptions
[`module.flushCompileCache()`]: #moduleflushcompilecache
[`module.getCompileCacheDir()`]: #modulegetcompilecachedir
[`module.registerHooks()`]: #moduleregisterhooksoptions
[`module.setSourceMapsSupport()`]: #modulesetsourcemapssupportenabled-options
[`module`]: #the-module-object
[`os.tmpdir()`]: os.md#ostmpdir
[`register`]: #moduleregisterspecifier-parenturl-options
[`util.TextDecoder`]: util.md#class-utiltextdecoder
[接受的最终格式]: #accepted-final-formats-returned-by-load
[异步 `load` 钩子]: #asynchronous-loadurl-context-nextload
[异步 `resolve` 钩子]: #asynchronous-resolvespecifier-context-nextresolve
[异步钩子函数]: #asynchronous-hooks-accepted-by-moduleregister
[异步自定义钩子的注意事项]: #caveats-of-asynchronous-customization-hooks
[同步自定义钩子的注销]: #deregistration-of-synchronous-customization-hooks
[钩子]: #customization-hooks
[load 钩子]: #synchronous-loadurl-context-nextload
[模块编译缓存]: #module-compile-cache
[模块包装器]: modules.md#the-module-wrapper
[realm]: https://tc39.es/ecma262/#realm
[resolve 钩子]: #synchronous-resolvespecifier-context-nextresolve
[源代码映射包含指令]: https://tc39.es/ecma426/#sec-linking-generated-code
[同步钩子函数]: #hook-functions-accepted-by-moduleregisterhooks
[`Worker` 的文档]: worker_threads.md#new-workerfilename-options
[可传输对象]: worker_threads.md#portpostmessagevalue-transferlist
[类型剥离]: typescript.md#type-stripping
