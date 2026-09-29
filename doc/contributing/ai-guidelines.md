# AI 使用政策和指南

* [Node.js AI 使用政策](#nodejs-ai-use-policy)
* [实用指南](#practical-guidelines)
  * [在披露中注明 AI 工具](#naming-ai-tools-in-disclosures)
  * [在代码贡献中使用 AI](#when-ai-is-used-in-code-contributions)
  * [在沟通中使用 AI](#when-ai-is-used-in-communications)

本文档与 [OpenJS Foundation AI Coding Assistants Policy][] 保持一致。

## Node.js AI 使用政策

在 Node.js 项目中，决策始终应基于人的判断，而不是机器自动化，无论自动化是否由 AI 驱动。贡献者必须对自己在 Node.js 项目中的行为承担全部责任。

Node.js 项目不禁止在贡献中使用 AI 工具，但如果贡献是由 AI 生成的，贡献者应披露此类工具的使用情况，以及贡献者如何亲自验证生成的输出。提交到 Node.js 代码库的更改仍必须满足项目的 [Developer's Certificate of Origin][] 和许可要求。

选择提交由 AI 生成的更改的贡献者，必须能够在审查过程中解释其贡献的价值主张和实现方式。披露 AI 的使用情况并不能免除这项责任。对于贡献者未亲自理解、测试和验证的 AI 生成代码，相关拉取请求会浪费协作者的时间，并且可能在未经进一步审查的情况下被关闭。反复提交此类更改、表现出对项目或其流程缺乏了解，或对自动化辅助的使用情况不诚实的贡献者，可能会被禁止继续贡献。

除非项目事先明确批准，否则不得使用自动化工具创建拉取请求。如需申请批准，可以在 [nodejs/admin](https://github.com/nodejs/admin/issues) 中提出问题；或者，如果可以通过 GitHub 工作流实现自动化，则提交一个用于添加该工作流的拉取请求，并按照通常的拉取请求审查流程寻求共识。

禁止使用 AI 自动修复标记为“good first issue”的问题。这些问题旨在帮助新的人类贡献者，而非 AI，了解代码库和贡献流程。

## 实用指南

### 在披露中注明 AI 工具

请注意，在作为代码库一部分的提交消息中提及营利性商标或商业品牌，可能会被滥用于营利性营销。如果披露内容涉及营利性商标或商业品牌，建议对品牌信息进行匿名处理（例如，使用 `a frontier reasoning model`、`a closed-source coding agent`，而不是 `<brand>`），或者只在 PR 描述中提及营利性品牌／商标，而不在提交消息中提及；除非不提及特定品牌／商标就无法理解该消息。这些建议仅适用于营利性工具／模型，不适用于非营利工具／模型。

### 在代码贡献中使用 AI

* 贡献者应将 AI 工具生成的分析视为假设，而非事实，并在做出任何决定之前，根据实际源代码验证输出。
* 即使在 AI 工具的帮助下组织提交，提交仍必须遵循[提交消息指南][]和[提交合并指南](./pull-requests.md#commit-squashing)。
* 未经人工验证，不应删除或修改现有测试。在 AI 的帮助下添加新测试时，贡献者应亲自确认这些新测试确有必要，并且测试的是预期行为，而不是仅仅反映实现碰巧表现出的行为。
* 如果注释由 AI 生成，贡献者应亲自确认注释准确无误。注释不应复述代码的作用，而应提供代码本身未明显体现的额外背景信息，例如相关选择背后的历史或动机。
* 在审查过程中，贡献者必须根据自己的判断回应反馈，不得使用 AI 工具自动生成回复。预期贡献者会以这种方式反复修改，直到工作合并或明确关闭。如果无法亲自遵循审查流程，应关闭 PR，以便其他人接手。

### 在沟通中使用 AI

在 Node.js 项目中，如果贡献者选择使用 AI 辅助沟通，应尊重其他贡献者阅读并回复其沟通内容所花费的时间，并避免因自己使用 AI 而增加他人的认知负担。

* **请勿在拉取请求、问题或项目沟通渠道中粘贴完全由 AI 生成的消息。**此类沟通内容可能会根据 [Node.js moderation policy][] 被删除。
* 在讨论中提出基于 AI 输出的主张时，贡献者应亲自验证该主张。讨论中应提供指向实际代码、文档或规范的链接，而不是 AI 对它们的总结，作为事实依据。
* 如果语法检查和拼写检查工具有助于提升清晰度和简洁度，则可以使用。

[Developer's Certificate of Origin]: ../../CONTRIBUTING.md#developers-certificate-of-origin-11
[OpenJS Foundation AI Coding Assistants Policy]: https://ai-coding-assistants-policy.openjsf.org/
[提交消息指南]: ./pull-requests.md#commit-message-guidelines
[Node.js moderation policy]: https://github.com/nodejs/admin/blob/main/Moderation-Policy.md
