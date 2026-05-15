# Node.js API 文档工具链

Node.js API 文档由一个内部工具链生成，该工具链位于
[nodejs/doc-kit](https://github.com/nodejs/doc-kit)
仓库中。

在本仓库中，它可通过 `tools/doc` 目录访问，并作为 npm 包安装在那里。

构建过程（使用 `make doc` 或 `make doc-only`）会使用此工具链来
解析 [`doc/api/`][] 中的 markdown 文件，并生成以下内容：

1. 位于 `out/doc/api/*.html` 的可读 HTML
2. 位于 `out/doc/api/*.json` 的 JSON 表示

这些产物会针对多个版本的 Node.js 发布到 nodejs.org。举例来说，
最新版本的可读 HTML 会发布到 [nodejs.org/en/doc](https://nodejs.org/en/docs/)，
而最新版本的 json 文档会发布到
[nodejs.org/api/all.json](https://nodejs.org/api/all.json)

这些产物会作为发布构建的一部分生成，方法是在 iojs+release 作业的
release-sources 部分中运行 [doc-upload](https://github.com/nodejs/node/blob/1a83ad6a693f851199608ae957ac5d4f76871485/Makefile#L1218-L1224)
Makefile 目标。
该目标会运行 `doc` 目标来构建文档，然后使用
`scp` 将其复制到 staging/www 服务器上的一个目录中，目录形式为
`/home/staging/nodejs/<type>/<full_version>/docs`，其中 <type> 例如是
release、nightly 等。随后推广步骤（nightly 为自动，release 为手动）
会把文档移动到
`/home/dist/nodejs/docs/\<full\_version>`，由 node.org 从那里提供服务。

**了解该工具链时需要注意的关键点包括：**

1. 可通过执行 `tools/doc/node_modules/.bin/doc-kit` 来调用它（例如：`$ tools/doc/node_modules/.bin/doc-kit generate ...`）
2. 其用法详见 [nodejs/doc-kit README](https://github.com/nodejs/doc-kit/blob/main/README.md)。
3. 该工具链可以一次处理多个文件。
4. 该工具链使用一组依赖项，如依赖项
   部分所述。
5. 该工具链会解析输入文件，并对
   AST（抽象语法树）执行多种转换。
6. 该工具链会生成包含 Markdown 文件元数据和内容的 JSON 输出。
7. 该工具链会生成包含可读且可直接
   查看版本文件的 HTML 输出。

本文档的目的是解释现有的工具链
流程，以便于工具链的维护和演进。它并不是
关于如何编写 Node.js 文档的指南。

## 术语与一些值得了解的内容

* AST 表示 "Abstract Syntax Tree"（抽象语法树），它是一种数据结构，用于表示
  某种数据格式的结构。在我们的场景中，AST 是 Markdown 文件内容的“图”式
  表示。
* MDN 表示 [Mozilla Developer Network](https://developer.mozilla.org/en-US/)
  ，它是一个包含 Web 技术文档的网站。我们把它作为
  文档结构的参考。
* [Stability Index](https://nodejs.org/dist/latest/docs/api/documentation.html#stability-index)
  用于描述某个 Node.js 模块的稳定性。稳定性
  级别包括：
  * 稳定性 0：已弃用。（该模块已弃用）
  * 稳定性 1：实验性。（该模块是实验性的）
  * 稳定性 2：稳定。（该模块是稳定的）
  * 稳定性 3：遗留。（该模块是遗留的）
* 在 Remark YAML 片段中，`<!-- something -->` 会被视为 HTML 节点，
  这是因为 YAML 不是有效的 Markdown 内容。（不符合
  Markdown 规范）
* “New Tooling” 指的是在 `nodejs/nodejs.dev` 中引入的（从零开始编写的）API 构建工具链，
  它可能会取代当前来自
  `nodejs/node` 的工具链

## 基础工具链用法

```bash
# cd tools/doc
npx doc-kit
```

**或者**

```bash
# nodejs/node 根目录
make doc
```

## 编写文档

模块源码文件（`lib/<module>.js`）与其文档文件（`doc/api/<module>.md`）之间应当保持 1:1 的对应关系。

对于新功能，`introduced_in` 和 `added` YAML 属性应设置为 `REPLACEME`。
等到发布时，它们会在之后被替换为正确的版本。

````markdown
# module

<!--introduced_in=v0.10.0-->

> 稳定性：2 - 稳定

A description and examples.

## `module.property`

<!-- YAML
added: v0.10.0
-->

- {type}

A description of the property.

## `module.someFunction(x, y, [z=100])`

<!-- YAML
added: v0.10.0
changes:
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/12345
    description: A description of the change.
-->

- `x` {string} The description of the string.
- `y` {boolean} Should I stay or should I go?
- `z` {number} How many zebras to bring. **默认：** `100`.

A description of the function.

\```cjs
// 使用 CJS 语法的示例。
const { someFunction } = require('module');
someFunction('a', true, 10);
\```

\```mjs
// 使用 MJS 语法的示例。
import { someFunction } from 'module';
someFunction('a', true, 10);
\```

## Event: `blerg`

<!-- YAML
added: REPLACEME
-->

- `anArg` {type} 监听器参数的描述。

模块通常不会在自身上触发事件。`cluster` 是
唯一的例外。

## Class: `SomeClass`

类的描述。

### `SomeClass.classMethod(anArg)`

<!-- YAML
added: v0.10.0
-->

- `anArg` {Object} 只是一个参数。
  - `field` {string} `anArg` 可以有这个字段。
  - `field2` {boolean} 另一个字段。**默认：** `false`。
- Returns: {boolean} 如果它工作正常则为 `true`。

这个方法的人类可读描述。

### `SomeClass.nextSibling()`

<!-- YAML
added: v0.10.0
-->

- Returns: {SomeClass | null} 下一个排在前面的 `SomeClass`。

`SomeClass` 必须在 `https://github.com/nodejs/doc-kit/blob/main/src/constants.mjs` 中注册，才能在 `{type}` 字段中被正确解析。

### `SomeClass.someProperty`

<!-- YAML
added: v0.10.0
-->

- {string}

`someProperty` 的说明。

### Event: `grelb`

<!-- YAML
added: v0.10.0
-->

- `isBlerg` {boolean}

此事件是在 `SomeClass` 的实例上触发的，而不是在模块本身上。

````

[`doc/api/`]: https://github.com/nodejs/node/tree/main/doc/api
