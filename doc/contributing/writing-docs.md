# 如何为 Node.js 项目编写文档

本文档涉及发布到 [nodejs.org/en/docs][] 的 Node.js API 文档，
并作为如何编写和更新此类文档的一般参考。

## 风格指南

有关如何编写或更新 Node.js 文档的风格指南，请参阅 [doc/README][] 文档。

## 构建

你可以使用几个不同的命令在本地构建并查看文档，
最简单的是：

```bash
make docserve
```

此命令会构建文档，启动一个本地服务器，并为你提供一个 URL，
你可以访问该 URL 来查看已构建的文档。

有关更多构建选项，请参阅 [documentation building][building-the-documentation] 文档。

有关构建文档所使用工具的更多详细信息，请参阅
[API Documentation Tooling][] 文档。

## 检查与格式化

为确保你的更改通过 lint 检查，请运行以下命令：

```bash
make lint-md
```

[API Documentation Tooling]: ./api-documentation.md
[building-the-documentation]: ../../BUILDING.md#building-the-documentation
[doc/README]: ../../doc/README.md
[nodejs.org/en/docs]: https://nodejs.org/en/docs/
