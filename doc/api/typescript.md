# 模块：TypeScript

<!-- YAML
changes:
  - version: REPLACEME
    pr-url: https://github.com/nodejs/node/pull/61803
    description: "移除了 `--experimental-transform-types` 标志。"
  - version:
      - v25.2.0
      - v24.12.0
    pr-url: https://github.com/nodejs/node/pull/60600
    description: 类型剥离现已稳定。
  - version:
     - v24.3.0
     - v22.18.0
    pr-url: https://github.com/nodejs/node/pull/58643
    description: 类型剥离不再发出实验性警告。
  - version:
     - v23.6.0
     - v22.18.0
    pr-url: https://github.com/nodejs/node/pull/56350
    description: 默认启用类型剥离。
  - version: v22.7.0
    pr-url: https://github.com/nodejs/node/pull/54283
    description: "添加了 `--experimental-transform-types` 标志。"
-->

<!--introduced_in=v22.6.0-->

> 稳定性：2 - 稳定

## 启用

在 Node.js 中启用运行时 TypeScript 支持有两种方式：

1. 为了获得所有 TypeScript 语法和功能的 [完整支持][]，包括使用任何版本的 TypeScript，请使用第三方包。

2. 为了获得轻量级支持，你可以使用内置的 [类型剥离][] 支持。

## 完整 TypeScript 支持

要使用支持所有 TypeScript 功能（包括 `tsconfig.json`）的 TypeScript，你可以使用第三方包。这些说明使用 [`tsx`][] 作为示例，但还有许多其他类似的库可用。

1. 使用项目所用的任何包管理器将该包安装为开发依赖。例如，使用 `npm`：

   ```bash
   npm install --save-dev tsx
   ```

2. 然后你可以通过以下方式运行 TypeScript 代码：

   ```bash
   npx tsx your-file.ts
   ```

   或者，你也可以通过 `node` 运行：

   ```bash
   node --import=tsx your-file.ts
   ```

## 类型剥离

<!-- YAML
added: v22.6.0
changes:
  - version:
      - v25.2.0
      - v24.12.0
    pr-url: https://github.com/nodejs/node/pull/60600
    description: 类型剥离现已稳定。
-->

默认情况下，Node.js 将执行仅包含可擦除 TypeScript 语法的 TypeScript 文件。
Node.js 会将 TypeScript 语法替换为空白字符，且不执行类型检查。
要禁用此功能，请使用 [`--no-strip-types`][] 标志。

Node.js 忽略 `tsconfig.json` 文件，因此依赖 `tsconfig.json` 内设置的功能，如路径或将较新的 JavaScript 语法转换为较旧的标准，故意不予支持。要获得完整 TypeScript 支持，请参阅 [完整 TypeScript 支持][]。

类型剥离功能旨在轻量级。
通过故意不支持需要生成 JavaScript 代码的语法，并用空白字符替换内联类型，Node.js 可以在不需要源代码映射的情况下运行 TypeScript 代码。

类型剥离兼容大多数版本的 TypeScript，但我们建议使用 5.8 或更新版本，并配合以下 `tsconfig.json` 设置：

```json
{
  "compilerOptions": {
     "noEmit": true, // 可选 - 见下方注释
     "target": "esnext",
     "module": "nodenext",
     "rewriteRelativeImportExtensions": true,
     "erasableSyntaxOnly": true,
     "verbatimModuleSyntax": true
  }
}
```

如果你打算仅执行 `*.ts` 文件（例如构建脚本），请使用 `noEmit` 选项。如果你打算分发 `*.js` 文件，则不需要此标志。

### 确定模块系统

Node.js 在 TypeScript 文件中支持 [CommonJS][] 和 [ES Modules][] 语法。Node.js 不会在不同模块系统之间转换；如果你希望代码作为 ES 模块运行，必须使用 `import` 和 `export` 语法，如果你希望代码作为 CommonJS 运行，必须使用 `require` 和 `module.exports`。

* `.ts` 文件的模块系统确定方式 [与 `.js` 文件相同。][] 要使用 `import` 和 `export` 语法，请将 `"type": "module"` 添加到最近的父级 `package.json` 中。
* `.mts` 文件将始终作为 ES 模块运行，类似于 `.mjs` 文件。
* `.cts` 文件将始终作为 CommonJS 模块运行，类似于 `.cjs` 文件。
* 不支持 `.tsx` 文件。

与 JavaScript 文件一样，`import` 语句和 `import()` 表达式中 [文件扩展名是必需的][]：`import './file.ts'`，而不是 `import './file'`。出于向后兼容性考虑，`require()` 调用中文件扩展名也是必需的：`require('./file.ts')`，而不是 `require('./file')`，类似于 CommonJS 文件中 `require` 调用中 `.cjs` 扩展名是必需的方式。

`tsconfig.json` 选项 `allowImportingTsExtensions` 将允许 TypeScript 编译器 `tsc` 对包含 `.ts` 扩展名的 `import` 说明符的文件进行类型检查。

### TypeScript 特性

由于 Node.js 仅移除内联类型，任何涉及用新 JavaScript 语法_替换_ TypeScript 语法的 TypeScript 功能都会报错。

最需要转换的显著功能包括：

* `Enum` 声明
* 带有运行时代码的 `namespace`
* 参数属性
* 导入别名

不包含运行时代码的 `namespace` 是受支持的。
此示例将正常工作：

```ts
// 此命名空间正在导出一个类型
namespace TypeOnly {
   export type A = string;
}
```

这将导致 [`ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX`][] 错误：

```ts
// 此命名空间正在导出一个值
namespace A {
   export let x = 1
}
```

由于装饰器目前是 [TC39 Stage 3 提案](https://github.com/tc39/proposal-decorators)，它们不会被转换并将导致解析器错误。
Node.js 不提供 polyfill，因此直到 JavaScript 原生支持装饰器之前，都不会支持装饰器。

此外，Node.js 不读取 `tsconfig.json` 文件，也不支持依赖 `tsconfig.json` 内设置的功能，如路径或将较新的 JavaScript 语法转换为较旧的标准。

### 导入类型而不使用 `type` 关键字

由于类型剥离的性质，`type` 关键字对于正确剥离类型导入是必需的。如果没有 `type` 关键字，Node.js 会将导入视为值导入，这将导致运行时错误。tsconfig 选项 [`verbatimModuleSyntax`][] 可用于匹配此行为。

此示例将正常工作：

```ts
import type { Type1, Type2 } from './module.ts';
import { fn, type FnParams } from './fn.ts';
```

这将导致运行时错误：

```ts
import { Type1, Type2 } from './module.ts';
import { fn, FnParams } from './fn.ts';
```

### 非文件形式的输入

可以为 `--eval` 和 STDIN 启用类型剥离。模块系统将由 `--input-type` 确定，与 JavaScript 一样。

REPL、`--check` 和 `inspect` 中不支持 TypeScript 语法。

### 源代码映射

由于内联类型被替换为空白字符，源代码映射对于堆栈跟踪中的正确行号是不必要的；Node.js 不会生成它们。

### 依赖项中的类型剥离

为了不鼓励包作者发布用 TypeScript 编写的包，Node.js 拒绝处理 `node_modules` 路径下文件夹内的 TypeScript 文件。

### 路径别名

[`tsconfig` "paths"][] 不会被转换，因此会产生错误。可用的最接近功能是 [子路径导入][]，限制是它们需要以 `#` 开头。

[CommonJS]: modules.md
[ES Modules]: esm.md
[完整 TypeScript 支持]: #full-typescript-support
[`--no-strip-types`]: cli.md#--no-strip-types
[`ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX`]: errors.md#err_unsupported_typescript_syntax
[`tsconfig` "paths"]: https://www.typescriptlang.org/tsconfig/#paths
[`tsx`]: https://tsx.is/
[`verbatimModuleSyntax`]: https://www.typescriptlang.org/tsconfig/#verbatimModuleSyntax
[文件扩展名是必需的]: esm.md#mandatory-file-extensions
[完整支持]: #full-typescript-support
[子路径导入]: packages.md#subpath-imports
[与 `.js` 文件相同。]: packages.md#determining-module-system
[类型剥离]: #type-stripping
