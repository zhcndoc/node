# 问题

* [寻求一般帮助](#asking-for-general-help)
* [讨论非技术性话题](#discussing-non-technical-topics)
* [提交 bug 报告](#submitting-a-bug-report)
* [对 bug 报告进行分流](#triaging-a-bug-report)

## 寻求一般帮助

由于 `nodejs/node` 仓库的活跃度非常高，
有关使用 Node.js 的一般帮助问题或请求应转到 [Node.js help repository][]。

## 讨论非技术性话题

有关非技术性话题（例如知识产权和商标）的讨论
应转到 [Technical Steering Committee (TSC) repository][]。

## 提交 bug 报告

在 `nodejs/node` 问题跟踪器中新建 issue 时，用户
会看到可选的 issue 模板。如果你认为自己发现了 Node.js 中的 bug，
请尽力填写 `Bug Report` 模板。不必担心你无法回答每个细节；
只需尽可能填写你能填写的部分。

我们为了正确评估报告，最重要的两项信息是：
你所看到的行为描述，以及一个我们可以用来在自己环境中重现问题的简单
测试用例。如果我们无法重现该问题，就不可能修复它。

为了排除由用户层代码引入 bug 的可能性，测试用例应尽可能
限制为 _仅_ 使用 Node.js API。如果 bug 只在你使用某个特定的用户层模块时出现，
那么很可能是以下两种情况之一：(a) 该模块有 bug；或者 (b) Node.js 中的某些改动
破坏了该模块。

参见 [如何创建一个最小、完整且可验证的示例](https://stackoverflow.com/help/mcve)。

## 对 bug 报告进行分流

一旦 issue 被打开，围绕它展开讨论是很常见的。
一些贡献者可能会对该问题有不同看法，
包括当前表现是 bug 还是一个特性。这个讨论
是流程的一部分，应保持专注、有帮助且专业。

协助对 issue 进行分流（在 core 和 help 仓库中）的目标是
帮助减少 issue 积压并保持 issue 跟踪器的健康，同时为
新来者提供另一种有意义的参与和贡献方式。

任何对 Node.js 编程以及该项目 GitHub 组织有合理理解，并且
对该项目有少量贡献（在 issues 或 PR 上发表评论）的人，都可以申请并成为分流者。请在本项目的 README.md 上提交一个 PR，其中包括：i) 请求被加入为分流者，ii) 成为分流者的动机，以及 iii) 同意阅读、理解并遵守本项目的 [行为准则](https://github.com/nodejs/admin/blob/HEAD/CODE_OF_CONDUCT.md)。

分流角色使其能够执行最常见的分流活动，例如添加标签以及关闭/重新打开/分配 issues。
有关角色和权限的更多信息，请参见 ["组织拥有的仓库的权限级别"](https://docs.github.com/en/github/setting-up-and-managing-organizations-and-teams/repository-permission-levels-for-an-organization#permission-levels-for-repositories-owned-by-an-organization)。

在对 issues 和 PR 进行分流时：

* 对他人保持耐心和同理心，尤其是首次贡献者。
* 对垃圾信息或恶意挑衅者不要有耐心，不要与其互动，直接关闭 issue，并将用户报告到 moderation 仓库。
* 如果你无法重现某个问题，请留下评论请求更多信息，并添加 `needs more info` 标签。
* 理想情况下，issue 只有在已被修复或得到回答时才应关闭（对于 pull request，则是在已合并后）。过早关闭 issue（或 PR）可能会被举报人/作者视为轻视。
  关闭 issue/PR 时务必尽量说明原因。

[Node.js help repository]: https://github.com/nodejs/help/issues
[Technical Steering Committee (TSC) repository]: https://github.com/nodejs/TSC/issues
