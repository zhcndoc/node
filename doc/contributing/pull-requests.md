# 拉取请求

* [依赖项](#dependencies)
* [设置本地环境](#setting-up-your-local-environment)
  * [步骤 1：分叉](#step-1-fork)
  * [步骤 2：分支](#step-2-branch)
* [进行更改的流程](#the-process-of-making-changes)
  * [步骤 3：编写代码](#step-3-code)
  * [步骤 4：提交](#step-4-commit)
    * [提交信息指南](#commit-message-guidelines)
  * [步骤 5：变基](#step-5-rebase)
  * [步骤 6：测试](#step-6-test)
  * [步骤 7：推送](#step-7-push)
  * [步骤 8：打开拉取请求](#step-8-opening-the-pull-request)
  * [步骤 9：讨论并更新](#step-9-discuss-and-update)
    * [批准与请求修改的工作流](#approval-and-request-changes-workflow)
  * [步骤 10：合并](#step-10-landing)
* [审查拉取请求](#reviewing-pull-requests)
  * [一次审查一点](#review-a-bit-at-a-time)
  * [注意代码背后的人](#be-aware-of-the-person-behind-the-code)
  * [尊重评论的最短等待时间](#respect-the-minimum-wait-time-for-comments)
  * [被放弃或停滞的拉取请求](#abandoned-or-stalled-pull-requests)
  * [批准一个更改](#approving-a-change)
  * [接受关于 Node.js 中应包含什么的不同意见](#accept-that-there-are-different-opinions-about-what-belongs-in-nodejs)
  * [性能不是一切](#performance-is-not-everything)
  * [持续集成测试](#continuous-integration-testing)
* [备注](#notes)
  * [提交压缩](#commit-squashing)
  * [为你的拉取请求获取批准](#getting-approvals-for-your-pull-request)
  * [等待拉取请求被合并](#waiting-until-the-pull-request-gets-landed)
  * [查看协作者指南](#check-out-the-collaborator-guide)
  * [附录：子系统](#appendix-subsystems)

## 依赖项

Node.js 在 _deps/_ 和 _tools/_ 目录中有若干捆绑依赖项，这些并不属于项目本身。
这些内容在 [维护依赖项][] 文档中有详细说明。
对这些目录中的文件进行更改时，应将补丁发送给各自对应的项目。
不要向 Node.js 发送补丁。我们无法接受这类补丁。

如有疑问，请在 [问题跟踪器](https://github.com/nodejs/node/issues/) 中提交 issue，或联系
[项目协作者](https://github.com/nodejs/node/#current-project-team-members) 之一。

Node.js 在 [OpenJS 基金会 Slack](https://slack-invite.openjsf.org/) 上有许多频道。比较有用的频道有：
[#nodejs](https://openjs-foundation.slack.com/archives/CK9Q4MB53)，用于一般帮助、问题和讨论。
[#nodejs-core](https://openjs-foundation.slack.com/archives/C019Y2T6STH)，用于专门的 Node.js 核心开发。

Node.js 还有一个非官方 IRC 频道：
[#Node.js](https://web.libera.chat/#node.js)。

## 设置本地环境

开始之前，你需要在本地安装 `git`。根据你的操作系统，还需要其他若干依赖项。
这些内容在 [构建指南][] 中有详细说明。

根据你的环境，你可能还想从 [IDE 配置](https://github.com/nodejs/node-code-ide-configs) 中获取特定 IDE 的设置。

当你已经安装了 `git`，并确认拥有所有必要的依赖项后，就可以创建 fork 了。

### 步骤 1：分叉

在 [GitHub 上](https://github.com/nodejs/node) 分叉该项目，并将你的 fork 克隆到本地。

```bash
git clone git@github.com:username/node.git
cd node
git remote add upstream https://github.com/nodejs/node.git
git fetch upstream
```

配置 `git` 以便它知道你是谁：

```bash
git config user.name "J. Random User"
git config user.email "j.random.user@example.com"
```

这里你可以使用任何你喜欢的姓名/邮箱地址。我们只会使用 `git` 根据此配置生成的元数据，
以便在 `AUTHORS` 文件和变更日志中正确归属你的更改。

如果你希望 GitHub 界面将提交链接到你的账户，并在更改合并后授予你 `Contributor` 标签，
请确保这个本地邮箱也已添加到你的 [GitHub 邮箱列表](https://github.com/settings/emails) 中。

### 步骤 2：分支

作为保持开发环境尽可能有序的最佳实践，请创建本地分支在其中进行工作。
这些分支也应该直接从上游默认分支创建。

```bash
git checkout -b my-branch -t upstream/HEAD
```

## 进行更改的流程

### 步骤 3：编写代码

Node.js 中的拉取请求通常涉及对仓库中以下一个或多个位置的更改。

* `src` 目录中的 C/C++ 代码
* `lib` 目录中的 JavaScript 代码
* `doc/api` 中的文档
* `test` 目录中的测试

如果你在修改代码，请务必运行 `make lint`（Windows 上运行 `vcbuild.bat lint`），以确保更改符合 Node.js 代码风格指南。

你编写的任何文档（包括代码注释和 API 文档）都应遵循 [风格指南](../../doc/README.md)。
API 文档中包含的代码示例在运行 `make lint`（Windows 上运行 `vcbuild.bat lint`）时也会被检查。
如果你正在添加或废弃某个 API，请补充或修改相应的 YAML 文档。文档 YAML 中版本号使用 `REPLACEME`：

```markdown
### `request.method`
<!-- YAML
added: REPLACEME
-->

* {string} 请求方法。
```

对于贡献 C++ 代码，你可能会想查看 [C++ 风格指南](cpp-style-guide.md)，以及 [`src/`](../../src/README.md) 的 README，以了解 Node.js C++ 内部实现的概览。

### 步骤 4：提交

最佳实践是在各个独立提交中，尽可能将更改按逻辑分组。
单个拉取请求可包含的提交数量没有限制，许多贡献者会发现将更改拆分到多个提交中更容易审查。

```bash
git add my/changed/files
git commit -s
```

多个提交在合并时通常会被压缩。参见关于 [提交压缩](#commit-squashing) 的说明。

#### 提交信息指南

好的提交信息应该描述改了什么以及为什么改。

1. 第一行应当：

   * 包含简短的更改说明（最好 50 个字符或更少，且不超过 72 个字符）
   * 除专有名词、首字母缩略词，以及指代代码的词（如函数/变量名）外，全部使用小写
   * 以前缀形式写出所修改的 [子系统](#appendix-subsystems) 名称，并以祈使动词开头。查看 `git log --oneline files/you/changed` 的输出，以了解你的更改涉及哪些子系统。

   示例：

   * `net: add localAddress and localPort to Socket`
   * `src: fix typos in async_wrap.h`

2. 第二行保持空行。

3. 其余所有行都按 72 列换行（长 URL 除外）。

4. 如果你的补丁修复了一个未解决的问题，请在拉取请求描述中包含引用。使用 `Fixes:` 前缀和完整的问题 URL。对于其他引用，请使用 `Refs:`。

   当拉取请求合并时，`Fixes:` 和 `Refs:` 尾注会自动添加到提交信息中。如果拉取请求以多个提交合并，描述中的尾注默认会添加到每个提交中。

   示例：

   * `Fixes: https://github.com/nodejs/node/issues/1337`
   * `Refs: https://eslint.org/docs/rules/space-in-parens.html`
   * `Refs: https://github.com/nodejs/node/pull/3615`

5. 如果你的提交引入了破坏性变更（`semver-major`），它应当包含关于该破坏性变更原因、会触发该破坏性变更的场景，以及具体变更内容的说明。

6. 你的提交必须包含带有你的姓名和邮箱地址的 `Signed-off-by` 行，作为你同意 [Developer Certificate of Origin][] 的确认。
   机器人生成的提交不受此要求约束。如果一个提交有多个作者，那么每个作者都应添加 `Signed-off-by` 行；
   并且至少有一行应与提交元数据中的作者信息匹配。此规则不适用于依赖更新（例如 cherry-pick）、发布提交或 backport 提交。

   [`git commit -s`][git commit -s]（使用小写的 `s`）会在提交日志信息末尾添加
   `Signed-off-by` 尾注。

合并后的最终提交信息示例：

```text
subsystem: explain the commit in one line

提交消息正文应包含一个或多个段落，更详细地解释内容。请进行换行，以保持每行不超过 72 个字符。

Fixes: https://github.com/nodejs/node/issues/1337
Refs: https://eslint.org/docs/rules/space-in-parens.html
Signed-off-by: J. Random User <j.random.user@example.com>
```

如果你是首次为 Node.js 贡献，请尽力遵守这些指南，但如果哪里做错了也不用担心。
现有贡献者会帮助你把事情安排妥当，而最终合并该拉取请求的贡献者会确保一切都符合项目指南。

### 步骤 5：变基

作为最佳实践，一旦你提交了更改，最好使用 `git rebase`（而不是 `git merge`）来使你的工作与主仓库同步。

```bash
git fetch upstream HEAD
git rebase FETCH_HEAD
```

这可以确保你的工作分支包含 `nodejs/node` 的最新更改。

### 步骤 6：测试

修复 bug 和新增功能都应始终附带测试。已经提供了一份 [Node.js 测试编写指南][]，以便让这个过程更容易。查看其他测试文件，了解它们应如何组织，也会有帮助。

`nodejs/node` 仓库中的 `test` 目录结构很复杂，通常并不清楚新测试文件应该放在哪里。如有疑问，请将新测试添加到 `test/parallel/` 目录，之后再确定正确位置。

在通过拉取请求提交更改之前，务必运行完整的 Node.js 测试套件。在 Unix / macOS 上运行测试（包括代码 lint）：

```bash
./configure && make -j4 test
```

我们可以使用 [Ninja](https://ninja-build.org/) 来加快构建速度。更多信息请参见
[使用 Ninja 构建 Node.js](building-node-with-ninja.md)。

在 Windows 上：

```powershell
vcbuild test
```

对于某些配置，运行所有测试可能需要很长时间（一个小时或更久）。如需运行测试套件的子集，请参见构建指南中的 [运行测试][] 部分。

### 步骤 7：推送

一旦你确认提交已经准备就绪，测试和 lint 都已通过，就可以开始通过将你的工作分支推送到 GitHub 上的 fork 来打开拉取请求。

```bash
git push origin my-branch
```

### 步骤 8：打开拉取请求

在 GitHub 中打开新的拉取请求时，会显示一个 [拉取请求模板][]。请尽力填写其中的细节，但如果不确定该填什么，也可以跳过部分内容。

如果你的拉取请求变更行数超过 5000 行，请参阅 [大型拉取请求][] 指南以了解额外要求。

拉取请求打开后，通常会在几天内得到审查。

如果你想在还未准备好合并时就为你的拟议更改获取反馈，请在 GitHub 界面中使用 `Convert to draft` 选项。
不要使用 `wip` 标签，因为它可能无法阻止 PR 在你准备好之前被合并。

### 步骤 9：讨论并更新

你很可能会收到针对拉取请求的反馈或修改请求。这是提交过程中的重要部分，所以不要气馁！有些贡献者会立即为拉取请求签字同意，另一些则会给出更详细的评论或反馈。为了评估更改是否正确且必要，这一步是流程中的必要部分。

要对现有拉取请求进行修改，请在本地分支上修改，添加一个包含这些更改的新提交，然后推送到你的 fork。
GitHub 会自动更新该拉取请求。

```bash
git add my/changed/files
git commit -s
git push origin my-branch
```

如果发生 git 冲突，则需要使用 `git rebase` 将你的分支与已合并到上游的其他更改同步：

```bash
git fetch upstream HEAD
git rebase FETCH_HEAD
git push --force-with-lease origin my-branch
```

**重要：** `git push --force-with-lease` 是 `git` 中少数几种会删除历史记录的方式之一。
它还会使审查过程更复杂，因为它不会让审查者快速查看到底改了什么。
在使用它之前，请确保你理解其中的风险。如有疑问，你可以始终在拉取请求中寻求指导。

使用 `git rebase` 管理提交还有许多更高级的机制，但超出了本指南的范围。

如果你在等待某个问题的答复，欢迎在拉取请求中发表评论以提醒审查者。
如果你遇到一些看起来不熟悉的词或缩写，请参考这个 [词汇表](https://github.com/nodejs/node/blob/HEAD/glossary.md)。

#### 批准与请求修改的工作流

所有拉取请求都需要“签字同意”才能合并。
每当贡献者审查拉取请求时，他们可能会发现希望修改或修复的具体细节。
这些内容可能只是修正一个拼写错误，也可能涉及你编写代码的实质性修改。
尽管这类请求本意是有帮助的，但它们有时可能显得很突然或不够友好，尤其是那些没有附带关于应当如何修改的具体建议的请求。

尽量不要气馁。如果你觉得某次审查不公平，可以直接说明，或者联系项目中的其他贡献者寻求他们的意见。
这类评论通常只是审查者花费时间较少的结果，并非恶意。此类问题通常可以通过一点耐心来解决。
话虽如此，也应期待审查者在反馈中尽量提供帮助；对于那种含糊、轻率且无帮助的反馈，通常可以安全地忽略。

### 步骤 10：合并

为了合并，一个拉取请求需要至少两位 Node.js 协作者审查并 [批准][]（如果拉取请求已经打开超过 7 天，则一位协作者的批准即可），并通过一次 [CI（持续集成）测试运行][]。
之后，只要没有其他贡献者提出反对，该拉取请求就可以被合并。
如果你发现你的拉取请求等待时间超过预期，请查看关于 [等待时间的说明](#waiting-until-the-pull-request-gets-landed)。

当协作者合并你的拉取请求时，他们会在拉取请求页面发布一条评论，说明该拉取请求是以哪个提交（或哪些提交）合并的。
此时 GitHub 可能会将拉取请求显示为 `Closed`，但不用担心。
如果你查看你发起拉取请求所针对的分支，你应该能看到一个带有你名字的提交。
恭喜，并感谢你的贡献！

## 审查拉取请求

所有选择对拉取请求进行审查并提供反馈的 Node.js 贡献者，都有责任同时对项目和提交贡献的个人负责。审查和反馈必须有帮助、富有洞见，并且着眼于改进贡献，而不是单纯阻止它。不要指望仅仅因为你说了“不”却不给出解释，就能阻止一个拉取请求继续推进。要愿意改变自己的看法。要愿意与贡献者合作，让拉取请求变得更好。

对贡献者或任何其他审查者表现出轻蔑或不尊重的审查，严重违背了 [行为准则][]。

在审查拉取请求时，首要目标是让代码库变得更好，并让提交请求的人获得成功。即使一个拉取请求最终没有合并，提交者也应该在这次经历中感到自己的努力没有被浪费，也没有被轻视。来自新贡献者的每一个拉取请求，都是社区成长的机会。

### 分阶段审查

不要让新贡献者感到不堪重负。

人们很容易陷入微优化，事事都关注相对性能、完美语法或完全一致的风格。不要被这种诱惑所左右。

先聚焦于变更最重要的方面：

1. 这项变更对 Node.js 来说合理吗？
2. 这项变更是否让 Node.js 变得更好，即使只是渐进式的提升？
3. 是否存在明显的 bug 或需要处理的更大规模问题？
4. 提交信息是否清晰且正确？如果包含破坏性变更，是否足够明确？

当需要修改时，请 _请求_ 修改，不要 _要求_ 修改，并且不要假设提交者已经知道如何添加测试或运行基准测试。

具体的性能优化技术、编码风格和约定会随着时间变化。你给新贡献者留下的第一印象却不会。

提出一些细小修改请求（并非必要的修改）是可以的，但尽量不要让拉取请求卡住。大多数这类细节通常可以由合并该拉取请求的 Node.js 协作者修正，不过它们也可能是让贡献者更多了解项目的机会。

在评论时，最好明确标出这些细节请求，例如：
`细节：将 foo() 改为 bar()。不过这不是阻塞项。`

如果你的评论已经被处理，但在新的提交后没有被自动折叠，或者它们被证明有误，请使用适当的原因将其 [隐藏][hiding-a-comment]，以保持对话流程简洁且相关。

### 注意代码背后的人

请注意，你在反馈中传达请求和审查意见的_方式_，可能会对拉取请求的成功产生重大影响。是的，我们可能会合并某项让 Node.js 变得更好的变更，但这位个人贡献者可能从此再也不想与 Node.js 有任何关系。目标不仅仅是拥有优秀的代码。

### 尊重评论的最短等待时间

对于非平凡变更，我们会尽量遵守一个最低等待时间，以便在这样一个分布式项目中可能有重要意见的人能够回应。

对于非平凡变更，拉取请求必须至少开放 48 小时。有时变更需要更长时间才能审查，或者需要该领域专家进行更专业的审查。拿不准时，不要催促。

通常仅限于小的格式调整或文档修复的琐碎变更，可以在最短 48 小时窗口内合并。

### 被放弃或停滞的拉取请求

如果某个拉取请求看起来已被放弃或停滞，礼貌的做法是先询问贡献者是否打算继续这项工作，然后再询问他们是否介意你接手它（尤其是如果只剩下一些细节修改）。这样做时，最好在提交日志中保留原贡献者的姓名和电子邮件地址，或通过在提交中使用 `Author:` 元数据标签，给予原贡献者应有的署名。

如果一个拉取请求超过六个月没有活动，请为其添加 `stalled` 标签。这会触发一个自动化流程，添加一条评论，说明该拉取请求可能因不活跃而即将被关闭，并在实际关闭之前提醒贡献者。

### 批准变更

任何 Node.js 核心协作者（即在 `nodejs/node` 仓库中拥有提交权限的任何 GitHub 用户）都有权批准其他任何贡献者的工作。协作者不得批准自己的拉取请求。

协作者可以通过 GitHub 的 Approval Workflow（更推荐）或留下 `LGTM`（“Looks Good To Me”）评论来表示他们已经审查并批准了拉取请求中的变更。

在明确使用 GitHub Approval Workflow 的“Changes requested”组件时，请体现同理心。也就是说，不要让反馈显得粗鲁或唐突，并尽可能提供具体的改进建议。如果你不确定某项变更应如何改进，就直接说明。

最重要的是，在留下此类请求后，礼貌地在之后保持可联系，以便检查你的评论是否已被处理。

如果你看到已请求的修改已经完成，你可以清除另一位协作者的 `Changes requested` 审阅。

含糊、轻蔑或缺乏建设性的变更请求，如果在合理时间内没有得到进一步澄清，也可能被忽略。

使用 `Changes requested` 来阻止拉取请求合并。这样做时，请说明你为什么认为该拉取请求不应合并，并解释如果有的话，什么样的替代方案可能是可接受的。

### 接受 Node.js 中关于“什么属于其中”存在不同意见的事实

即使在技术指导委员会成员之间，对此也有不同看法。

一般来说，如果 Node.js 自身需要它（由于历史或功能原因），那么它就属于 Node.js。例如，`url` 解析属于 Node.js，因为它支持 HTTP 协议。

另外，某些功能要么无法以任何合理方式在核心之外实现，要么实现起来代价很高。

贡献者提出他们认为会让 Node.js 更好的新功能，并不罕见。这些功能可能适合添加，也可能不适合，但和所有变更一样，你在表达立场时应保持礼貌。那些让贡献者觉得自己“本该知道更好”或仅仅因为尝试了就被嘲笑的评论，都违背了 [行为准则][]。

### 性能并非一切

Node.js 一直以来都将执行速度作为优化目标。如果某项变更能够证明让 Node.js 的某部分更快，那么它很可能会被接受。声称某个拉取请求会让事情更快，几乎总会被要求提供能展示改进的性能 [基准结果][]。

不过，性能并不是唯一要考虑的因素。Node.js 也会优先考虑不破坏生态系统中的现有代码，以及不会仅仅为了改变而去改变那些正常工作的功能代码。

如果某个拉取请求引入了性能或功能回归，不要只是简单拒绝它，而是花时间与贡献者一起改进该变更。就如何让拉取请求变得可接受提供反馈和建议，不要假设贡献者已经知道该怎么做。请在反馈中明确说明。

### 持续集成测试

所有包含代码变更的拉取请求都必须在 [https://ci.nodejs.org/][] 上通过持续集成（CI）测试。

只有 Node.js 核心协作者和审核者才能启动 CI 测试运行。具体操作细节包含在新的协作者 [入门指南][] 中。通常，协作者或审核者会在拉取请求获得批准时为你启动 CI 测试运行。若没有，你可以请协作者或审核者启动 CI 运行。

CI 访问权限仅对协作者和平台团队成员开放。如果你还不属于这些团队之一，就需要有人将结果转达给你。如果 CI 已经完成但失败了，并且一两天已经过去，那么值得在议题中发表评论，说明你无法看到失败的具体原因，并在拉取请求中礼貌地请求有人向你提供相关信息。

理想情况下，代码变更应在 Node.js 支持的所有平台配置上都通过（即“变绿”）。这意味着所有测试都通过，并且没有 lint 错误。不过，现实中 CI 基础设施本身在某些平台上失败，或者所谓的“flaky”测试失败（“变红”）也并不少见。务必目视检查所有失败（“红色”）测试的结果，以判断失败是否由拉取请求中的变更引起。

对于非平凡变更，我们会尽量遵守一个最低等待时间，以便在这样一个分布式项目中可能有重要意见的人能够回应。

对于非平凡变更，拉取请求必须至少开放 48 小时。

有时变更需要更长时间才能审查，或者需要该领域专家进行更专业的审查。拿不准时，不要催促。

通常仅限于小的格式调整或文档修复的琐碎变更，可以在最短 48 小时窗口内合并。

### 被放弃或停滞的拉取请求

如果某个拉取请求看起来已被放弃或停滞，礼貌的做法是先询问贡献者是否打算继续这项工作，然后再询问他们是否介意你接手它（尤其是如果只剩下一些细节修改）。这样做时，最好在提交日志中保留原贡献者的姓名和电子邮件地址，或通过在提交中使用 `Author:` 元数据标签，给予原贡献者应有的署名。

如果一个拉取请求超过六个月没有活动，请为其添加 `stalled` 标签。这会触发一个自动化流程，添加一条评论，说明该拉取请求可能因不活跃而即将被关闭，并在实际关闭之前提醒贡献者。

### 批准变更

任何 Node.js 核心协作者（即在 `nodejs/node` 仓库中拥有提交权限的任何 GitHub 用户）都有权批准其他任何贡献者的工作。协作者不得批准自己的拉取请求。

协作者可以通过 GitHub 的 Approval Workflow（更推荐）或留下 `LGTM`（“Looks Good To Me”）评论来表示他们已经审查并批准了拉取请求中的变更。

在明确使用 GitHub Approval Workflow 的“Changes requested”组件时，请体现同理心。也就是说，不要让反馈显得粗鲁或唐突，并尽可能提供具体的改进建议。如果你不确定某项变更应如何改进，就直接说明。

最重要的是，在留下此类请求后，礼貌地在之后保持可联系，以便检查你的评论是否已被处理。

如果你看到已请求的修改已经完成，你可以清除另一位协作者的 `Changes requested` 审阅。

含糊、轻蔑或缺乏建设性的变更请求，如果在合理时间内没有得到进一步澄清，也可能被忽略。

使用 `Changes requested` 来阻止拉取请求合并。这样做时，请说明你为什么认为该拉取请求不应合并，并解释如果有的话，什么样的替代方案可能是可接受的。

### 接受 Node.js 中关于“什么属于其中”存在不同意见的事实

即使在技术指导委员会成员之间，对此也有不同看法。

一般来说，如果 Node.js 自身需要它（由于历史或功能原因），那么它就属于 Node.js。例如，`url` 解析属于 Node.js，因为它支持 HTTP 协议。

另外，某些功能要么无法以任何合理方式在核心之外实现，要么实现起来代价很高。

贡献者提出他们认为会让 Node.js 更好的新功能，并不罕见。这些功能可能适合添加，也可能不适合，但和所有变更一样，你在表达立场时应保持礼貌。那些让贡献者觉得自己“本该知道更好”或仅仅因为尝试了就被嘲笑的评论，都违背了 [行为准则][]。

### 性能并非一切

Node.js 一直以来都将执行速度作为优化目标。如果某项变更能够证明让 Node.js 的某部分更快，那么它很可能会被接受。声称某个拉取请求会让事情更快，几乎总会被要求提供能展示改进的性能 [基准结果][]。

不过，性能并不是唯一要考虑的因素。Node.js 也会优先考虑不破坏生态系统中的现有代码，以及不会仅仅为了改变而去改变那些正常工作的功能代码。

如果某个拉取请求引入了性能或功能回归，不要只是简单拒绝它，而是花时间与贡献者一起改进该变更。就如何让拉取请求变得可接受提供反馈和建议，不要假设贡献者已经知道该怎么做。请在反馈中明确说明。

### 持续集成测试

所有包含代码变更的拉取请求都必须在 [https://ci.nodejs.org/][] 上通过持续集成（CI）测试。

只有 Node.js 核心协作者和审核者才能启动 CI 测试运行。具体操作细节包含在新的协作者 [入门指南][] 中。通常，协作者或审核者会在拉取请求获得批准时为你启动 CI 测试运行。若没有，你可以请协作者或审核者启动 CI 运行。

理想情况下，代码变更应在 Node.js 支持的所有平台配置上都通过（即“变绿”）。这意味着所有测试都通过，并且没有 lint 错误。不过，现实中 CI 基础设施本身在某些平台上失败，或者所谓的“flaky”测试失败（“变红”）也并不少见。务必目视检查所有失败（“红色”）测试的结果，以判断失败是否由拉取请求中的变更引起。

## 注释

### 提交压缩

在大多数情况下，不要压缩你在审阅过程中添加到拉取请求中的提交。等到你拉取请求中的提交真正合并时，它们可能会按每个逻辑变更压缩为一个提交。提交信息中会添加元数据（包括指向拉取请求的链接、相关 issue 的链接，以及审阅者的姓名）。不过，你拉取请求的提交历史会在拉取请求页面上保持完整。

对于“一个逻辑变更”的大小，[0b5191f](https://github.com/nodejs/node/commit/0b5191f15d0f311c804d542b67e2e922d98834f8) 可以作为一个很好的例子。它同时涉及实现、文档和测试，但仍然只是一个逻辑变更。每当单个提交合并到 `nodejs/node` 的某个分支时，所有测试都应始终通过。

### 为你的拉取请求获取批准

拉取请求可以通过说 LGTM（即“看起来不错”）或使用 GitHub 的 Approve 按钮来批准。在过程中可以使用 GitHub 的拉取请求审阅功能。更多信息请查看 [官方文档](https://help.github.com/articles/reviewing-changes-in-pull-requests/)。

在你将新更改推送到分支后，即使 GitHub 显示“已批准”，你也需要再次为这些新更改获取批准，因为审阅者之前已经按过按钮了。

### 等待拉取请求合并

拉取请求从提交开始，至少需要保持开放 48 小时，即使它已经被批准并且 CI 通过了。这是为了确保每个人都有机会发表意见。如果变更很琐碎，协作者可以决定不必等待。一个拉取请求也可能需要更长时间才能被合并。所有这些预防措施都很重要，因为 Node.js 被广泛使用，所以不要气馁！

### 查看协作者指南

如果你想了解更多关于代码审阅和落地流程的信息，请参阅 [协作者指南][]。

### 附录：子系统

* `lib/*.js` (`assert`, `buffer`, 等)
* `build`
* `doc`
* `lib / src`
* `test`
* `tools`

你可以在 [nodejs/core-validate-commit][] 仓库中找到受支持子系统的完整列表。
对于任何特定 issue 或拉取请求，可能适用不止一个子系统。

[Building guide]: ../../BUILDING.md
[CI (Continuous Integration) test run]: #continuous-integration-testing
[Code of Conduct]: https://github.com/nodejs/admin/blob/HEAD/CODE_OF_CONDUCT.md
[Developer Certificate of Origin]: ../../CONTRIBUTING.md#developers-certificate-of-origin-11
[Onboarding guide]: ../../onboarding.md
[approved]: #getting-approvals-for-your-pull-request
[benchmark results]: writing-and-running-benchmarks.md
[collaborator guide]: collaborator-guide.md
[git commit -s]: https://git-scm.com/docs/git-commit#Documentation/git-commit.txt--s
[guide for writing tests in Node.js]: writing-tests.md
[hiding-a-comment]: https://help.github.com/articles/managing-disruptive-comments/#hiding-a-comment
[https://ci.nodejs.org/]: https://ci.nodejs.org/
[大型拉取请求]: large-pull-requests.md
[维护依赖项]: ./maintaining/maintaining-dependencies.md
[nodejs/core-validate-commit]: https://github.com/nodejs/core-validate-commit/blob/main/lib/rules/subsystem.js
[拉取请求模板]: https://raw.githubusercontent.com/nodejs/node/HEAD/.github/PULL_REQUEST_TEMPLATE.md
[运行测试]: ../../BUILDING.md#running-tests
