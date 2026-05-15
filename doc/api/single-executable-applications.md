# 单可执行应用程序

<!--introduced_in=v19.7.0-->

<!-- YAML
added:
  - v19.7.0
  - v18.16.0
changes:
  - version: v25.5.0
    pr-url: https://github.com/nodejs/node/pull/61167
    description: "通过 CLI 标志 `--build-sea` 添加了内置的单可执行应用程序生成功能。"
  - version: v20.6.0
    pr-url: https://github.com/nodejs/node/pull/46824
    description: 添加了对 "useSnapshot" 的支持。
  - version: v20.6.0
    pr-url: https://github.com/nodejs/node/pull/48191
    description: 添加了对 "useCodeCache" 的支持。
-->

> 稳定性：1.1 - 积极开发中

<!-- source_link=src/node_sea.cc -->

此功能允许将 Node.js 应用程序方便地分发到未安装 Node.js 的系统。

Node.js 支持创建 [单可执行应用程序][]，方法是允许注入一个由 Node.js 准备的数据块（blob），该数据块可以包含一个捆绑的脚本，进入 `node` 二进制文件。在启动期间，程序检查是否注入了任何内容。如果找到该数据块，它将执行数据块中的脚本。否则，Node.js 照常运行。

单可执行应用程序功能支持使用 [CommonJS][] 或 [ECMAScript 模块][] 模块系统运行单个嵌入脚本。

用户可以使用 `node` 二进制文件本身以及任何可以将资源注入二进制文件的工具，从他们的捆绑脚本创建单可执行应用程序。

1. 创建一个 JavaScript 文件：
   ```bash
   echo 'console.log(`Hello, ${process.argv[2]}!`);' > hello.js
   ```

2. 创建一个配置文件，构建一个可以注入到单可执行应用程序中的数据块（详见
   [生成单可执行准备数据块][]）：

   * 在 Windows 以外的系统上：

   ```bash
   echo '{ "main": "hello.js", "output": "sea" }' > sea-config.json
   ```

   * 在 Windows 上：

   ```bash
   echo '{ "main": "hello.js", "output": "sea.exe" }' > sea-config.json
   ```

   `.exe` 扩展名是必需的。

3. 生成目标可执行文件：
   ```bash
   node --build-sea sea-config.json
   ```

4. 签名二进制文件（仅限 macOS 和 Windows）：

   * 在 macOS 上：

   ```bash
   codesign --sign - hello
   ```

   * 在 Windows 上（可选）：

   需要存在证书才能正常工作。但是，未签名的
   二进制文件仍然可以运行。

   ```powershell
   signtool sign /fd SHA256 hello.exe
   ```

5. 运行二进制文件：

   * 在 Windows 以外的系统上

   ```console
   $ ./hello world
   Hello, world!
   ```

   * 在 Windows 上

   ```console
   $ .\hello.exe world
   Hello, world!
   ```

## 使用 `--build-sea` 生成单可执行应用程序

要直接生成单可执行应用程序，可以使用 `--build-sea` 标志。它接受一个 JSON 格式的配置文件路径。如果传递给它的路径不是绝对路径，Node.js 将使用相对于当前工作目录的路径。

配置文件目前读取以下顶层字段：

```json
{
  "main": "/path/to/bundled/script.js",
  "mainFormat": "commonjs", // 默认值："commonjs"，选项："commonjs", "module"
  "executable": "/path/to/node/binary", // 可选，如果未指定，则使用当前的 Node.js 二进制文件
  "output": "/path/to/write/the/generated/executable",
  "disableExperimentalSEAWarning": true, // 默认值：false
  "useSnapshot": false,  // 默认值：false
  "useCodeCache": true, // 默认值：false
  "execArgv": ["--no-warnings", "--max-old-space-size=4096"], // 可选
  "execArgvExtension": "env", // 默认值："env"，选项："none", "env", "cli"
  "assets": {  // 可选
    "a.dat": "/path/to/a.dat",
    "b.txt": "/path/to/b.txt"
  }
}
```

如果路径不是绝对路径，Node.js 将使用相对于当前工作目录的路径。用于生成数据块的 Node.js 二进制文件的版本必须与将要注入数据块的二进制文件的版本相同。

注意：在生成跨平台 SEA（例如，在 `darwin-arm64` 上为 `linux-x64` 生成 SEA）时，`useCodeCache` 和 `useSnapshot`
必须设置为 false，以避免生成不兼容的可执行文件。
由于代码缓存和快照只能在编译它们的同一平台上加载，因此生成的可执行文件在尝试加载在不同平台上构建的代码缓存或快照时可能会在启动时崩溃。

### 资源

用户可以通过在配置中添加键 - 路径字典作为 `assets` 字段来包含资源。在构建时，Node.js 将从
指定路径读取资源并将它们捆绑到准备数据块中。在生成的
可执行文件中，用户可以使用 [`sea.getAsset()`][] 和
[`sea.getAssetAsBlob()`][] API 检索资源。

```json
{
  "main": "/path/to/bundled/script.js",
  "output": "/path/to/write/the/generated/executable",
  "assets": {
    "a.jpg": "/path/to/a.jpg",
    "b.txt": "/path/to/b.txt"
  }
}
```

单可执行应用程序可以如下访问资源：

```cjs
const { getAsset, getAssetAsBlob, getRawAsset, getAssetKeys } = require('node:sea');
// 获取所有资源键。
const keys = getAssetKeys();
console.log(keys); // ['a.jpg', 'b.txt']
// 返回 ArrayBuffer 中的数据副本。
const image = getAsset('a.jpg');
// 返回从资源解码为 UTF8 的字符串。
const text = getAsset('b.txt', 'utf8');
// 返回包含资源的 Blob。
const blob = getAssetAsBlob('a.jpg');
// 返回包含原始资源且不复制的 ArrayBuffer。
const raw = getRawAsset('a.jpg');
```

有关更多信息，请参阅 [`sea.getAsset()`][]、[`sea.getAssetAsBlob()`][]、
[`sea.getRawAsset()`][] 和 [`sea.getAssetKeys()`][] API 的文档。

### 启动快照支持

`useSnapshot` 字段可用于启用启动快照支持。在这种情况下，`main`
脚本将在最终可执行文件启动时不执行。
相反，它将在构建机器上生成单可执行应用程序准备
数据块时运行。生成的准备数据块将
包括一个快照，捕获由 `main` 脚本初始化的状态。
注入了准备数据块的最终可执行文件将在运行时反序列化
该快照。

当 `useSnapshot` 为 true 时，主脚本必须调用
[`v8.startupSnapshot.setDeserializeMainFunction()`][] API 来配置
最终可执行文件由用户启动时需要运行的代码。

应用程序在单可执行
应用程序中使用快照的典型模式是：

1. 在构建时，在构建机器上，运行主脚本以
   将堆初始化到准备好接受用户输入的状态。脚本
   还应使用
   [`v8.startupSnapshot.setDeserializeMainFunction()`][] 配置主函数。此函数将
   被编译并序列化到快照中，但在构建时不会调用。
2. 在运行时，主函数将在用户机器上的反序列化堆
   上运行，以处理用户输入并生成输出。

启动快照脚本的一般约束也适用于用于为单可执行应用程序构建快照的主
脚本，并且主脚本可以使用 [`v8.startupSnapshot` API][] 来适应
这些约束。请参阅
[Node.js 中关于启动快照支持的文档][]。

### V8 代码缓存支持

当配置中的 `useCodeCache` 设置为 `true` 时，在生成
单可执行准备数据块期间，Node.js 将编译 `main`
脚本以生成 V8 代码缓存。生成的代码缓存将成为
准备数据块的一部分并注入到最终可执行文件中。当单
可执行应用程序启动时，Node.js 将使用代码缓存来加速编译，而不是从头编译 `main` 脚本，然后
执行脚本，这将提高启动性能。

**注意：** 当 `useCodeCache` 为 `true` 时，`import()` 不起作用。

### 执行参数

`execArgv` 字段可用于指定特定于 Node.js 的
参数，这些参数将在单
可执行应用程序启动时自动应用。这允许应用程序开发人员
配置 Node.js 运行时选项，而无需最终用户
了解这些标志。

例如，以下配置：

```json
{
  "main": "/path/to/bundled/script.js",
  "output": "/path/to/write/the/generated/executable",
  "execArgv": ["--no-warnings", "--max-old-space-size=2048"]
}
```

将指示 SEA 使用 `--no-warnings` 和
`--max-old-space-size=2048` 标志启动。在嵌入可执行文件的脚本中，这些标志
可以使用 `process.execArgv` 属性访问：

```js
// 如果可执行文件启动时带有 `sea user-arg1 user-arg2`
console.log(process.execArgv);
// 输出：['--no-warnings', '--max-old-space-size=2048']
console.log(process.argv);
// 输出：['/path/to/sea', 'path/to/sea', 'user-arg1', 'user-arg2']
```

用户提供的参数位于 `process.argv` 数组中，从索引 2 开始，
类似于应用程序使用以下命令启动时的情况：

```console
node --no-warnings --max-old-space-size=2048 /path/to/bundled/script.js user-arg1 user-arg2
```

### 执行参数扩展

`execArgvExtension` 字段控制如何提供超出 `execArgv` 字段中指定的额外执行参数。它接受三个字符串值之一：

* `"none"`：不允许扩展。仅使用 `execArgv` 中指定的参数，
  并且 `NODE_OPTIONS` 环境变量将被忽略。
* `"env"`：_(默认)_ `NODE_OPTIONS` 环境变量可以扩展执行参数。
  这是保持向后兼容性的默认行为。
* `"cli"`：可执行文件可以使用 `--node-options="--flag1 --flag2"` 启动，这些标志
  将被解析为 Node.js 的执行参数，而不是传递给用户脚本。
  这允许使用 `NODE_OPTIONS` 环境变量不支持的参数。

例如，使用 `"execArgvExtension": "cli"`：

```json
{
  "main": "/path/to/bundled/script.js",
  "output": "/path/to/write/the/generated/executable",
  "execArgv": ["--no-warnings"],
  "execArgvExtension": "cli"
}
```

可执行文件可以这样启动：

```console
./my-sea --node-options="--trace-exit" user-arg1 user-arg2
```

这将等同于运行：

```console
node --no-warnings --trace-exit /path/to/bundled/script.js user-arg1 user-arg2
```

## 单可执行应用程序 API

`node:sea` 内置模块允许从嵌入到可执行文件中的 JavaScript 主脚本与单可执行应用程序进行交互。

### `sea.isSea()`

<!-- YAML
added:
  - v21.7.0
  - v20.12.0
-->

* 返回：{boolean} 此脚本是否运行在单可执行应用程序内。

### `sea.getAsset(key[, encoding])`

<!-- YAML
added:
  - v21.7.0
  - v20.12.0
-->

此方法可用于检索配置为在构建时捆绑到单可执行应用程序中的资源。
当找不到匹配的资源时会抛出错误。

* `key` {string} 单可执行应用程序配置中 `assets` 字段指定的字典中资源的键。
* `encoding` {string} 如果指定，资源将被解码为字符串。接受 `TextDecoder` 支持的任何编码。
  如果未指定，则将返回包含资源副本的 `ArrayBuffer`。
* 返回：{string|ArrayBuffer}

### `sea.getAssetAsBlob(key[, options])`

<!-- YAML
added:
  - v21.7.0
  - v20.12.0
-->

类似于 [`sea.getAsset()`][]，但返回 {Blob} 形式的结果。
当找不到匹配的资源时会抛出错误。

* `key` {string} 单可执行应用程序配置中 `assets` 字段指定的字典中资源的键。
* `options` {Object}
  * `type` {string} blob 的可选 mime 类型。
* 返回：{Blob}

### `sea.getRawAsset(key)`

<!-- YAML
added:
  - v21.7.0
  - v20.12.0
-->

此方法可用于检索配置为在构建时捆绑到单可执行应用程序中的资源。
当找不到匹配的资源时会抛出错误。

与 `sea.getAsset()` 或 `sea.getAssetAsBlob()` 不同，此方法不返回副本。相反，它返回捆绑在可执行文件内的原始资源。

目前，用户应避免写入返回的 array buffer。如果注入的部分未标记为可写入或未正确对齐，
写入返回的 array buffer 可能会导致崩溃。

* `key` {string} 单可执行应用程序配置中 `assets` 字段指定的字典中资源的键。
* 返回：{ArrayBuffer}

### `sea.getAssetKeys()`

<!-- YAML
added:
  - v24.8.0
  - v22.20.0
-->

* 返回 {string\[]} 包含嵌入在可执行文件中所有资源键的数组。如果没有嵌入资源，则返回一个空数组。

此方法可用于检索嵌入到单可执行应用程序中的所有资源键的数组。
当不在单可执行应用程序内运行时将抛出错误。

## 在注入的主脚本中

### 注入的主脚本的模块格式

要指定 Node.js 应如何解释注入的主脚本，请使用单可执行应用程序配置中的 `mainFormat` 字段。
接受的值为：

* `"commonjs"`：注入的主脚本被视为 CommonJS 模块。
* `"module"`：注入的主脚本被视为 ECMAScript 模块。

如果未指定 `mainFormat` 字段，则默认为 `"commonjs"`。

目前，`"mainFormat": "module"` 不能与 `"useSnapshot"` 一起使用。

### 注入的主脚本中的模块加载

在注入的主脚本中，模块加载不从文件系统读取。
默认情况下，`require()` 和 `import` 语句都只能加载内置模块。尝试加载只能在文件系统中找到的模块将抛出错误。

用户可以将他们的应用程序捆绑成一个独立的 JavaScript 文件以注入到可执行文件中。这也确保了更确定的依赖图。

要在注入的主脚本中从文件系统加载模块，用户可以创建一个 `require` 函数，使用 `module.createRequire()` 从文件系统加载。例如，在 CommonJS 入口点中：

<!-- eslint-disable no-global-assign -->

```js
const { createRequire } = require('node:module');
require = createRequire(__filename);
```

### 注入的主脚本中的 `require()`

注入的主脚本中的 `require()` 与可用于非注入模块的 [`require()`][] 不同。
目前，除了 [`require.main`][] 之外，它没有任何非注入 [`require()`][] 具有的属性。

### 注入的主脚本中的 `__filename` 和 `module.filename`

注入的主脚本中 `__filename` 和 `module.filename` 的值等于 [`process.execPath`][]。

### 注入的主脚本中的 `__dirname`

注入的主脚本中 `__dirname` 的值等于 [`process.execPath`][] 的目录名。

### 注入的主脚本中的 `import.meta`

当使用 `"mainFormat": "module"` 时，`import.meta` 在注入的主脚本中可用，具有以下属性：

* `import.meta.url`：对应于 [`process.execPath`][] 的 `file:` URL。
* `import.meta.filename`：等于 [`process.execPath`][]。
* `import.meta.dirname`：[`process.execPath`][] 的目录名。
* `import.meta.main`：`true`。

`import.meta.resolve` 目前不受支持。

### 注入的主脚本中的 `import()`

<!-- TODO(joyeecheung): 支持并记录 module.registerHooks -->

当使用 `"mainFormat": "module"` 时，`import()` 可用于动态加载内置模块。尝试使用 `import()` 从文件系统加载模块将抛出错误。

### 在注入的主脚本中使用原生插件

原生插件可以作为资源捆绑到单可执行应用程序中，方法是在用于生成单可执行应用程序准备 blob 的配置文件的 `assets` 字段中指定它们。
然后可以通过将资源写入临时文件并使用 `process.dlopen()` 加载它，在注入的主脚本中加载插件。

```json
{
  "main": "/path/to/bundled/script.js",
  "output": "/path/to/write/the/generated/executable",
  "assets": {
    "myaddon.node": "/path/to/myaddon/build/Release/myaddon.node"
  }
}
```

```js
// script.js
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { getRawAsset } = require('node:sea');
const addonPath = path.join(os.tmpdir(), 'myaddon.node');
fs.writeFileSync(addonPath, new Uint8Array(getRawAsset('myaddon.node')));
const myaddon = { exports: {} };
process.dlopen(myaddon, addonPath);
console.log(myaddon.exports);
fs.rmSync(addonPath);
```

已知注意事项：如果单可执行应用程序是由运行在 Linux arm64 docker 容器上的 postject 生成的，
[生成的 ELF 二进制文件没有正确的哈希表来加载插件][postject-linux-arm64-issue] 并且
会在 `process.dlopen()` 上崩溃。在其他平台上构建单可执行应用程序，或者至少在
非容器的 Linux arm64 环境中构建以解决此问题。

## 注意事项

### 单可执行应用程序创建流程

此处记录的流程可能会发生变化。

#### 1. 生成单可执行准备 blob

要构建单可执行应用程序，Node.js 将首先生成一个包含运行捆绑脚本所需所有信息的 blob。
当使用 `--build-sea` 时，此步骤与注入一起在内部完成。

##### 将准备 blob 转储到磁盘

在引入 `--build-sea` 之前，引入了一个较旧的工作流，将准备 blob 写入磁盘以供外部工具注入。这仍可用于验证目的。

要将准备 blob 转储到磁盘以进行验证，请使用 `--experimental-sea-config`。
这会写入一个文件，该文件可以使用 [postject][] 等工具注入到 Node.js 二进制文件中。

配置与 `--build-sea` 类似，不同之处在于
`output` 字段指定写入生成的 blob 文件的路径，而不是最终的可执行文件。

```json
{
  "main": "/path/to/bundled/script.js",
  // 不是最终的可执行文件，这是写入 blob 的路径。
  "output": "/path/to/write/the/generated/blob.blob"
}
```

#### 2. 将准备 blob 注入到 `node` 二进制文件中

要完成单可执行应用程序的创建，需要将生成的 blob 注入到 `node` 二进制文件的副本中，如下所述。

当使用 `--build-sea` 时，此步骤与 blob 生成一起在内部完成。

* 如果 `node` 二进制文件是 [PE][] 文件，则 blob 应作为名为 `NODE_SEA_BLOB` 的资源注入。
* 如果 `node` 二进制文件是 [Mach-O][] 文件，则 blob 应作为 `NODE_SEA` 段中名为 `NODE_SEA_BLOB` 的部分注入。
* 如果 `node` 二进制文件是 [ELF][] 文件，则 blob 应作为名为 `NODE_SEA_BLOB` 的注记注入。

然后，SEA 构建过程在二进制文件中搜索 `NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2:0` [fuse][] 字符串，并将最后一个字符翻转为 `1` 以指示已注入资源。

##### 手动注入准备 blob

在引入 `--build-sea` 之前，引入了一个较旧的工作流，允许外部工具将生成的 blob 注入到 `node` 二进制文件的副本中。

例如，使用 [postject][]：

1. 创建 `node` 可执行文件的副本，并根据需要命名：

   * 在 Windows 以外的系统上：

   ```bash
   cp $(command -v node) hello
   ```

   * 在 Windows 上：

   ```text
   node -e "require('fs').copyFileSync(process.execPath, 'hello.exe')"
   ```

   `.exe` 扩展名是必需的。

2. 移除二进制文件的签名（仅限 macOS 和 Windows）：

   * 在 macOS 上：

   ```bash
   codesign --remove-signature hello
   ```

   * 在 Windows 上（可选）：

   [signtool][] 可以从安装的 [Windows SDK][] 使用。如果跳过此步骤，请忽略来自 postject 的任何与签名相关的警告。

   ```powershell
   signtool remove /s hello.exe
   ```

3. 通过运行带有以下选项的 `postject` 将 blob 注入到复制的二进制文件中：

   * `hello` / `hello.exe` - 步骤 1 中创建的 `node` 可执行文件副本的名称。
   * `NODE_SEA_BLOB` - 二进制文件中存储 blob 内容的资源/注记/部分的名称。
   * `sea-prep.blob` - 步骤 1 中创建的 blob 的名称。
   * `--sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2` - Node.js 项目用于检测文件是否已被注入的 [fuse][]。
   * `--macho-segment-name NODE_SEA`（仅在 macOS 上需要）- 二进制文件中存储 blob 内容的段的名称。

   综上所述，以下是每个平台所需的命令：

   * 在 Linux 上：
     ```bash
     npx postject hello NODE_SEA_BLOB sea-prep.blob \
         --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2
     ```

   * 在 Windows - PowerShell 上：
     ```powershell
     npx postject hello.exe NODE_SEA_BLOB sea-prep.blob `
         --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2
     ```

   * 在 Windows - 命令提示符上：
     ```text
     npx postject hello.exe NODE_SEA_BLOB sea-prep.blob ^
         --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2
     ```

   * 在 macOS 上：
     ```bash
     npx postject hello NODE_SEA_BLOB sea-prep.blob \
         --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2 \
         --macho-segment-name NODE_SEA
     ```

### 平台支持

单可执行支持仅在以下平台的 CI 上定期测试：

* Windows
* macOS (仅 arm64；x64 目前不受支持，并在测试中被跳过)
* Linux（除 Alpine 外所有 [Node.js 支持的平台][] 发行版，以及除 s390x 外所有 [Node.js 支持的平台][] 架构）

这是由于缺乏更好的工具来生成单可执行文件，以便在其他平台上测试此功能。

欢迎提出其他资源注入工具/工作流的建议。请在 <https://github.com/nodejs/single-executable/discussions> 发起讨论以帮助我们记录它们。

[CommonJS]: modules.md#modules-commonjs-modules
[ECMAScript Modules]: esm.md#modules-ecmascript-modules
[ELF]: https://en.wikipedia.org/wiki/Executable_and_Linkable_Format
[生成单可执行准备 blob]: #1-%E7%94%9F%E6%88%90%E5%8D%95%E5%8F%AF%E6%89%A7%E8%A1%8C%E5%87%86%E5%A4%87blob
[Mach-O]: https://en.wikipedia.org/wiki/Mach-O
[PE]: https://en.wikipedia.org/wiki/Portable_Executable
[Windows SDK]: https://developer.microsoft.com/en-us/windows/downloads/windows-sdk/
[`process.execPath`]: process.md#processexecpath
[`require()`]: modules.md#requireid
[`require.main`]: modules.md#accessing-the-main-module
[`sea.getAsset()`]: #seagetassetkey-encoding
[`sea.getAssetAsBlob()`]: #seagetassetasblobkey-options
[`sea.getAssetKeys()`]: #seagetassetkeys
[`sea.getRawAsset()`]: #seagetrawassetkey
[`v8.startupSnapshot.setDeserializeMainFunction()`]: v8.md#v8startupsnapshotsetdeserializemainfunctioncallback-data
[`v8.startupSnapshot` API]: v8.md#startup-snapshot-api
[有关 Node.js 中启动快照支持的文档]: cli.md#--build-snapshot
[fuse]: https://www.electronjs.org/docs/latest/tutorial/fuses
[postject]: https://github.com/nodejs/postject
[postject-linux-arm64-issue]: https://github.com/nodejs/postject/issues/105
[signtool]: https://learn.microsoft.com/en-us/windows/win32/seccrypto/signtool
[单可执行应用程序]: https://github.com/nodejs/single-executable
[Node.js 支持]: https://github.com/nodejs/node/blob/main/BUILDING.md#platform-list
