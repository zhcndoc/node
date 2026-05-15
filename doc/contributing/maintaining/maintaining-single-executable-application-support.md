# 维护单文件可执行应用支持

对 [single executable applications][] 的支持，是 Node.js 成功所确定的关键技术优先事项之一。

## 高层策略

从 [Next-10 discussions][] 来看，项目认为有 2 种重要的支持方式：

### 使用 Node.js 编译为可执行文件

这是 [boxednode][] 采用的方法。

Node.js 项目内部不需要额外代码来支持将打包后的应用与 Node.js 一起编译成一个单文件可执行应用。

### 打包到现有的 Node.js 可执行文件中

这是 [pkg][] 采用的方法。

项目并不打算提供完整解决方案，而是提供 Node.js 可执行文件中所需的关键元素，以便能够与预构建的 Node.js 二进制文件进行打包。这包括：

* 在可执行文件中查找一个保存打包代码的段。
* 在找到该段时运行打包代码。

其余部分留给外部工具/解决方案来完成：

* 将代码打包成单个脚本。
* 生成带有适当选项的命令行。
* 向现有的 Node.js 可执行文件中添加一个段，其中包含命令行和适当的头信息。
* 对生成的可执行文件重新生成或移除签名
* 提供一个虚拟文件系统，并在需要时将其挂接，以支持原生模块或读取文件内容。

不过，项目还维护了一个单独的工具 [postject][]，用于向二进制文件中注入任意只读资源，例如将应用打包进运行时所需的资源。

## 规划

该功能的规划在 [single-executable repository][] 中进行。

## 即将推出的功能

目前仅支持运行单个嵌入的 CommonJS 文件，但以下功能也在我们希望实现的工作列表中：

* 运行嵌入的 ESM 文件。
* 运行包含多个文件的归档。
* 将 [Node.js CLI options][] 嵌入到二进制文件中。
* [XCOFF][] 可执行文件格式。
* 在 Alpine Linux 上运行测试。
* 在 s390x Linux 上运行测试。
* 在 ppc64 Linux 上运行测试。

## 禁用单文件可执行应用支持

要禁用单文件可执行应用支持，请使用 `--disable-single-executable-application` 配置选项构建 Node.js。

## 实现

在启用了单文件可执行应用支持进行构建时，Node.js 进程会使用 [`postject-api.h`][] 检查二进制文件中是否存在 `NODE_SEA_BLOB` 段。如果找到，它会将缓冲区传递给 [`single_executable_application.js`][]，后者会执行嵌入脚本的内容。

[Next-10 discussions]: https://github.com/nodejs/next-10/blob/main/meetings/summit-nov-2021.md#single-executable-applications
[Node.js CLI options]: https://nodejs.org/api/cli.html
[XCOFF]: https://www.ibm.com/docs/en/aix/7.2?topic=formats-xcoff-object-file-format
[`postject-api.h`]: https://github.com/nodejs/node/blob/71951a0e86da9253d7c422fa2520ee9143e557fa/test/fixtures/postject-copy/node_modules/postject/dist/postject-api.h
[`single_executable_application.js`]: https://github.com/nodejs/node/blob/main/lib/internal/main/single_executable_application.js
[boxednode]: https://github.com/mongodb-js/boxednode
[pkg]: https://github.com/vercel/pkg
[postject]: https://github.com/nodejs/postject
[single executable applications]: https://github.com/nodejs/node/blob/main/doc/contributing/technical-priorities.md#single-executable-applications
[single-executable repository]: https://github.com/nodejs/single-executable
