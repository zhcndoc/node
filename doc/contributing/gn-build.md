# GN 构建

与 GYP 类似，GN 是一个为构建 Chromium 而设计的构建系统。Node.js 的官方构建使用 GYP，但也提供了 GN 构建文件作为一种非官方的替代构建系统。

GN 构建文件只支持 Node.js 构建配置的一个子集。并不要求 Node.js 的所有 pull request 都支持 GN 构建，而且 Node.js 的 CI 目前也不会测试 GN 构建，不过 Node.js 欢迎能够改进 GN 支持或修复其他 pull request 引入的回归问题的 pull request。

目前 GN 构建被用于：

1. Electron：将 Node.js 与 Chromium 一起构建。
2. V8：在 CI 中测试 Node.js 的集成。

## GN 支持文件

Node.js 包含以下 GN 构建文件：

* `node.gni` - 用于配置构建的公开 GN 参数。
* `*/BUILD.gn` - GN 会在这里查找构建规则，在 Node.js 中它只是包含 `unofficial.gni` 文件，以避免意外修改。
* `*/unofficial.gni` - 每个组件的实际构建规则。

## 使用 GN 构建

与 GYP 不同，GN 工具不包含任何用于编译项目的内置规则，这意味着使用 GN 构建的项目必须自己提供构建配置，例如如何调用 C++ 编译器。

像 V8 和 skia 这样的 Chromium 相关项目选择复用 Chromium 的构建配置，而 V8 的 Node.js 集成测试仓库 [`node-ci`][node-ci] 也可以复用于构建 Node.js。

### 1. 安装 `depot_tools`

你需要安装 [`depot_tools`][depot-tools] 工具集，它用于获取 Chromium 及其依赖项。

```bash
git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git
export PATH=/path/to/depot_tools:$PATH
```

你可以通过运行 `which gn` 来确认 `depot_tools` 是否已正确添加到你的 PATH 中，并确认它返回的是 `/path/to/depot_tools/gn`。

**注意：** 在 Windows 上你还需要设置环境变量 `DEPOT_TOOLS_WIN_TOOLCHAIN=0`。为此，打开 `Control Panel` → `System and Security` → `System` → `Advanced system settings` 并添加一个系统变量 `DEPOT_TOOLS_WIN_TOOLCHAIN`，值为 `0`。这会告诉 `depot_tools` 使用你本地安装的 Visual Studio 版本（默认情况下，`depot_tools` 会尝试下载一个仅 Google 员工可访问的 Google 内部版本）。

### 2. 检出 Node.js 源代码

要检出用于构建的最新 Node.js 主分支，请使用 `depot_tools` 中的 `fetch` 工具：

```bash
mkdir node_gn
cd node_gn
fetch node
```

你也可以通过省略 git 历史记录来节省一些时间：

```bash
fetch --no-history node
```

同步完成后，你会得到如下目录结构：

```console
node_gn/
├── .gclient
├── .gclient_entries
├── ...
└── node
    ├── DEPS
    ├── ...
    ├── build/
    ├── node/
    └── tools/
```

`node_gn` 是一个工作区目录，它只包含 `depot_tools` 中 `gclient` 工具的配置和缓存，而仓库实际检出在 `node_gn/node`。

`node_gn/node` 目录并不是 Node.js 的检出结果，它实际上是 [node-ci](https://chromium.googlesource.com/v8/node-ci/)，也就是 V8 用于测试与 Node.js 集成的仓库。Node.js 的源代码检出在 `node_gn/node/node`。

### 3. 构建

GN 只支持使用 [`ninja`](https://ninja-build.org) 进行构建。要使用 GN 构建 Node.js，你首先需要生成 `ninja` 构建文件，然后调用 `ninja` 执行构建。

`node-ci` 仓库提供了一个用于调用 GN 的脚本：

```bash
cd node  # 进入包含 node-ci 检出的 `node_gn/node`
./tools/gn-gen.py out/Release
```

这会将 `ninja` 构建文件写入 `node_gn/node` 下的 `out/Release` 目录。要查看所有可配置选项，请运行 `tools/gn-gen.py --help`。

当 `gn-gen.py` 成功执行后，你就可以运行 `ninja`：

```bash
ninja -C out/Release node
```

构建完成后，编译好的 Node.js 可执行文件可以在 `out/Release/node` 中找到。

## GN 构建的状态

目前 Node.js 的 GN 构建尚未完全可用。GN 构建下仍有一些测试失败，并且某些配置选项可能还存在其他小问题。

目前正在推进一项工作，以便在不使用 `depot_tools` 的情况下让 GN 构建正常工作，该工作跟踪在 [#51689](https://github.com/nodejs/node/issues/51689) 中。

[depot-tools]: https://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html#_setting_up
[node-ci]: https://chromium.googlesource.com/v8/node-ci
