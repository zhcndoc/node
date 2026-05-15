# 使用 Ninja 构建 Node.js

本指南的目的是演示如何使用 [Ninja][] 构建 Node.js，因为这样做可能比使用 `make` 快得多。请参阅 [Ninja 的网站][Ninja] 获取安装说明（仅限 Unix）。

`[Ninja][]` 在 Makefile 中受支持。运行 `./configure --ninja` 来配置项目，使其使用 Ninja 执行常规的 `make` 命令。

当只修改 `lib` 中的 JS 层时，你可以使用：

```bash
./configure --ninja --node-builtin-modules-path "$(pwd)"
```

例如，`make` 会在内部执行 `ninja -C out/Release`，以生成编译后的 release 二进制文件。它还会执行 `ln -fs out/Release/node node`，这样你就可以在项目根目录下执行 `./node`。

运行 `make` 时，如果构建成功，你会看到类似以下的输出：

```console
ninja: 进入目录 `out/Release`
[4/4] LINK node, POSTBUILDS
```

构建过程中最后一行会变化，显示为 `[finished/total]` 构建步骤进度。这是 `make` 不会输出的有用信息，也是使用 Ninja 的优势之一。使用 Ninja 时，构建总是并行执行，默认并行数取决于系统中的 CPU 数量。你可以使用 `-j` 参数覆盖这一行为，它等同于普通 `make` 中的 `-j` 参数：

```bash
make -j4 # 使用此标志时，Ninja 将把并行任务数限制为 4，
         # 不管当前机器上有多少核心。
```

注意：如果你在 macOS 上使用 GNU Make 3.x 版本，`-jn` 标志将不起作用。你可以升级到 `v4.x`（例如使用 [Homebrew](https://formulae.brew.sh/formula/make#default) 这样的包管理器），或者使用 `make JOBS=n`。

## 生成调试构建

要创建调试构建而不是 release 构建：

```bash
./configure --ninja --debug && make
```

## 自定义 `ninja` 路径

在某些系统上（例如 RHEL7 及以下），Ninja 二进制文件可能以不同的名称安装。对于这些系统，请使用 `NINJA` 环境变量：

```bash
./configure --ninja && NINJA="ninja-build" make
```

[Ninja]: https://ninja-build.org/
