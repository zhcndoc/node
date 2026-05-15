# 维护构建文件

本文档说明如何维护代码库中的构建文件。

## 概述

关于如何构建 Node.js 核心，请参见 [构建 Node.js](../../../BUILDING.md)。

在构建 Node.js 时，可以直接运行以下三个主要构建文件：

* `configure`：一个 Python 脚本，用于检测系统能力并运行
  [GYP][]. 它会生成 `config.gypi`，其中包含 GYP 用于
  创建平台相关构建文件的参数。其输出通常是以下格式之一：Makefile、MSbuild、ninja 或 XCode 项目文件（下面提到的主
  Makefile 由人工单独维护）。关于此脚本的详细指南，请参见 [configure][]。
* `vcbuild.bat`：一个 Windows 批处理脚本，用于定位构建工具，提供
  [Makefile][] 中可用目标的一个子集，以及它自己的一些
 目标。关于此脚本的详细指南，请参见
  [vcbuild.bat](#vcbuildbat)。
* `Makefile`：一个可通过 GNU Make 运行的 Makefile。它提供了一组
  用于构建和测试 Node.js 二进制文件、生成发布版本和
  文档，以及与 CI 交互以运行基准测试或测试的目标。关于
  此文件的详细指南，请参见 [Makefile][]。

在 Windows 上，`vcbuild.bat` 会在构建
Node.js 二进制文件之前运行 [configure][]；在其他系统上，必须先手动运行 `configure`，然后再在
`Makefile` 上运行 `make`。

## vcbuild.bat

要查看帮助文本，请运行 `.\vcbuild help`。当你需要
更新 Windows 上的构建和测试流程时，请更新此文件。

## configure

`configure` 脚本识别许多用于特殊构建方案的 CLI 标志。
其中许多没有被 `vcbuild` 快捷方式表示，并且需要通过以下方式之一传递：

* 直接调用 `python configure --XXX --YYY=PPPP`，然后执行 `vcbuild
  noprojgen`
* 在调用 `vcbuild` 之前设置 `set config_flags=--XXX --YYY=PPPP`

要查看帮助文本，请运行 `python configure --help`。当你
需要更新配置流程时，请更新此文件。

## Makefile

要查看帮助文本，请运行 `make help`。此文件不是生成的，而是由人工维护的。
这通常不会在 Windows 上运行，因为那里会使用
[vcbuild.bat](#vcbuildbat) 代替。

### 选项

* `-j <n>`：用于构建二进制文件的线程数。在非 CI
  目标上，无论此选项如何，并行测试都会占用所有可用核心。

[GYP]: https://gyp.gsrc.io/docs/UserDocumentation.md
[Makefile]: #makefile
[configure]: #configure
