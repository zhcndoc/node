# 维护共享库支持

Node.js 非官方地支持一种构建选项，即将 Node.js 构建为
共享库。该共享库称为 libnode，并会根据平台添加适当的后缀
（例如，Windows 上为 libnode.dll）。
共享库提供了一种将 Node.js 嵌入到其他
应用程序中的方式，并允许多个应用程序共享同一份
Node.js 副本，而不必将完整的 Node.js 体积
打包进每个应用程序。对于需要多个 Node.js
实例的负载，这可以显著节省占用空间。

本文档概述了这种方法，以及在维护共享库支持时
需要注意的事项。

目前，共享库支持仅在以下平台上经过测试：

* Linux
* macOS
* Windows
* AIX

## 使用共享库选项进行构建

在非 Windows 平台上，通过在 configure 步骤中添加 `--shared`，
Node.js 会以共享库选项进行构建。在 Windows
平台上，通过在 vcbuild 命令行中添加
`dll`，Node.js 会以共享库选项进行构建。

构建完成后，会有两个关键组件：

* 可执行文件 - node
* 库 - libnode

node 可执行文件是围绕 libnode 的一个轻量包装器，它
会被生成出来，以便我们可以针对共享库运行标准的 Node.js 测试套件。

可执行文件和库会根据其构建所在的平台具有相应的扩展名。
例如，Windows 上的 node.exe，以及其他平台上的 node，
都属于可执行文件。

libnode 可能还会有额外的命名组成部分，例如
在 macOS 构建中为 `libnode.105.dylib`。对于非 Windows 平台，
这些额外的命名组成部分包括 `NODE_MODULE_VERSION` 以及
该平台上共享库所使用的适当后缀。

当某个应用程序链接到该共享
库时，应用程序开发者需要添加相应选项，
以便应用程序能够找到该共享库；或者
设置 LIBPATH（AIX）、LD\_LIBRARY\_PATH（Linux/Unix）等，
以便在运行时能够找到它。

对于 node 包装器，在 Linux 和 macOS 上它被构建为
可以在以下位置之一找到共享库：

* 与 node 可执行文件位于同一目录
* ../lib，前提是可执行文件
  安装在 `bin` 目录中，并且该目录与一个 `lib` 目录
  处于同一级别，而共享库安装在该 `lib` 目录中。这也是
  使用共享库选项构建的默认包会将
  可执行文件和库放置的位置。

对于 Windows 上的 node 包装器，它被构建时假定
可执行文件和共享库都会位于
同一目录中，这也是该平台上的常见做法。

对于 AIX 上的 node 包装器，它会在构建时
将共享库路径硬编码进去，因为这是唯一的选项。

## 导出

在 Windows 上，可能会从原生
addon 或其他 Node.js 可执行文件链接的函数需要使用
NODE\_EXTERN\_PRIVATE 或 NODE\_EXTERN，否则它们将
不会被共享库导出。对于
其他 Node.js 可执行文件使用的函数
（例如：`mksnapshot`），如果缺少 NODE\_EXTERN 或
NODE\_EXTERN\_PRIVATE，将导致构建失败。
除非目的是将该函数添加到
公共的 embedder API 中，否则这些情况下应使用 NODE\_EXTERN\_PRIVATE。

## 原生 addons

对于常规的 Node.js 构建，运行原生 addons 依赖于由 node 可执行文件导出的符号。
因此，任何
预构建二进制文件都期望符号由可执行文件导出，
而不是由共享库本身导出。

node 可执行文件和共享库会被构建并链接，
以确保所需符号由 node
可执行文件导出。这在某些平台上需要额外工作，
而构建 node 可执行文件的过程就是一个很好的示例，
展示了如何实现这一点。使用共享
库并希望支持原生 addons 的应用程序应采用
类似的技术。

## 测试

目前，PR 的常规 CI 运行中没有测试。存在一些
可用于测试共享库支持的 CI 任务，
其中一些会作为每日测试的一部分运行。这些包括：

* [node-test-commit-linux-as-shared-lib](https://ci.nodejs.org/view/Node.js%20Daily/job/node-test-commit-linux-as-shared-lib/)
* <https://ci.nodejs.org/view/All/job/node-test-commit-osx-as-shared-lib/>
* [node-test-commit-aix-shared-lib](https://ci.nodejs.org/view/Node.js%20Daily/job/node-test-commit-aix-shared-lib/)

TODO：为 windows 添加一个任务

对于修改/影响共享库支持的代码，应运行这些 CI 任务，并验证
测试套件中没有回归。
