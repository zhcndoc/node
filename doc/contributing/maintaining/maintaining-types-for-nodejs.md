# 维护 Node.js 的类型

虽然 JavaScript 是一种弱类型语言，但也有一些配套工具
比如 [TypeScript][] 和 [Flow][]，它们允许开发者为其 JavaScript 项目的源
代码添加注解。虽然很多人并不会为代码添加注解，
或者根本不使用注解，但仍有相当一部分人会这样做，因此项目
已经同意朝着为 [最终用户提供合适的类型][] 这一目标努力是很重要的。

## 高层方案 - 维护类型

维护 Node.js 类型有多种方式，从将它们与 Node.js 运行时一起发布，
到由外部单独维护都可以。

这些不同的选项已经作为 [next-10][] 工作的一部分进行了讨论，并且
大家一致认为，由外部维护是最佳方案。
这种方案的一些优点包括：

* Node.js 维护者不需要熟悉任何特定的类型
  系统/技术。
* 类型可以在不需要发布 Node.js 版本的情况下更新。

大家达成的共识是，理想的流程如下：

* 在现有的 Node.js markdown 文件中添加/文档化 API。
* Node.js 项目中的自动化流程根据文档创建 API 的机器可读 JSON
  表示。
* 外部类型项目中的自动化流程消费该 JSON，并自动生成一个 PR 来添加该 API。

## 高层方案 - 开发工作流

使用 Node.js 和 TypeScript 的人数量已经足够多，因此
提供良好的开发者体验非常重要。虽然这里特别提到了 TypeScript，
但次要目标是，我们为改进 TypeScript 开发体验所提供的内容，
同样也应适用于其他类型
系统和转译语言。

我们已经同意，该方案将**不**包括将 TypeScript
工具与 Node.js 一起打包，而是改进这些工具在安装/配置后与 Node.js 协同工作的开发者体验。

我们正在努力实现的高层开发者体验已在
[next-10 TypeScript 小型峰会](https://github.com/nodejs/next-10/pull/150)
中记录，具体如下：

1. 当 Node.js 以一个不是 Node.js 可识别文件类型的入口点启动时，例如 `node script.ts`，会打印一条信息性错误
   消息，引导用户访问一个网页，在那里他们可以
   了解如何配置 Node.js 以支持该文件类型。
   * 如果文件是 TypeScript 文件，则会提供一条 TypeScript 特定的消息，并
     引用 Nodejs.org 上关于
     如何配置 TypeScript 的学习链接。
   * 对于其他文件类型，将使用通用消息和共享网页。
2. Node.js 增加从文件加载配置的支持。`NODE_OPTIONS` 支持的大多数（如果不是全部）配置
   都应在该文件中得到支持（该文件可能是位于
   入口点文件附近的 `package.json`）。说明网页会告诉
   用户应在此文件中放入哪些配置，以使 Node.js 支持
   他们的文件类型。
3. 当 Node.js 使用正确的配置运行时，无论是在文件中还是通过
   `NODE_OPTIONS` 或标志，未知文件类型都将按预期执行。

关于当前方案的一些额外细节包括：

* Loader 已经提供了满足上述要求所需的若干组件。
  它们已经提供了实现上述许多要求所需的 Node.js
  选项。
* 将 `package.json` 作为配置位置可能是一个不错的
  选择，因为 Node.js 启动时已经会查找它。
* 所选实现应允许在不同环境/条件下使用不同的配置，例如生产
  与开发，或者不同类型的托管环境，
  如无服务器与传统环境等；Node.js 不会
  对各个独立配置块应如何命名或其
  目的是什么提出任何建议或期望，只要求配置文件能够
  为用户定义的条件提供不同的配置。
* 没有计划为所有 Node.js 用户定义一个默认的 tsconfig.json
* 我们对于提供一个有明确倾向的默认方案尚未达成共识，
  但应在初始步骤完成后继续探索。
* 在围绕此功能进行说明时，重要的是要避免造成混淆，
  以免人们错误地发布 TypeScript 文件（例如 `script.ts`），而不是处理后的文件
  （例如 `script.js`）。

## 机器可读 JSON 文件的生成/消费

当你运行 `make doc` 时，用于
记录 Node.js API 的规范 markdown 文件会在
[doc/api][]
目录中被转换为 `.html` 文件和 `.json` 文件。

作为常规构建/发布流程的一部分，`html` 和
`json` 文件都会发布到 [nodejs.org][]。

执行该转换的生成器位于
[nodejs/doc-kit][]
仓库中。

## Markdown 结构

为了能够生成 JSON 文件，[doc/api][] 目录中的
markdown 文件所需满足的约束
由 [documentation-style-guide][] 定义。

## 计划中的变更（截至 2022 年 1 月 1 日）

虽然 JSON 文件已经在生成并发布，但其结构还不够好，
不足以被类型项目轻松消费。
通常外部团队还需要一些自定义脚本，并在之后进行手动修正。

目前正在进行一项工作，以添加额外的 markdown 约束，
然后更新流程，以便能够生成更好的
JSON 输出。

[Flow]: https://flow.org/
[TypeScript]: https://www.typescriptlang.org/
[doc/api]: https://github.com/nodejs/node/tree/HEAD/doc/api
[documentation-style-guide]: https://github.com/nodejs/node/blob/HEAD/doc/README.md#documentation-style-guide
[next-10]: https://github.com/nodejs/next-10/blob/HEAD/meetings/summit-nov-2021.md#suitable-types-for-end-users
[nodejs.org]: https://nodejs.org/en/docs/
[nodejs/doc-kit]: https://github.com/nodejs/doc-kit
[最终用户提供合适的类型]: https://github.com/nodejs/node/blob/HEAD/doc/contributing/technical-priorities.md#suitable-types-for-end-users
