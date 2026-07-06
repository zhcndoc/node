# Node.js 协作指南

## 目录

* [问题与拉取请求](#issues-and-pull-requests)
  * [欢迎首次贡献者](#welcoming-first-time-contributors)
  * [关闭问题与拉取请求](#closing-issues-and-pull-requests)
  * [作者就绪的拉取请求](#author-ready-pull-requests)
  * [处理自己的拉取请求](#handling-own-pull-requests)
  * [安全问题的管理](#managing-security-issues)
* [接受修改](#accepting-modifications)
  * [代码审查](#code-reviews)
  * [寻求共识](#consensus-seeking)
  * [等待批准](#waiting-for-approvals)
  * [测试与 CI](#testing-and-ci)
    * [有用的 Jenkins CI 任务](#useful-jenkins-ci-jobs)
    * [启动一个 Jenkins CI 任务](#starting-a-jenkins-ci-job)
  * [内部 API 与公开 API](#internal-vs-public-api)
  * [破坏性变更](#breaking-changes)
    * [破坏性变更与弃用](#breaking-changes-and-deprecations)
    * [对内部元素的破坏性变更](#breaking-changes-to-internal-elements)
    * [非预期的破坏性变更](#unintended-breaking-changes)
      * [回滚提交](#reverting-commits)
  * [引入新模块](#introducing-new-modules)
  * [对 Node-API 的新增](#additions-to-node-api)
  * [弃用](#deprecations)
  * [牵涉 TSC](#involving-the-tsc)
* [合并拉取请求](#landing-pull-requests)
  * [使用 GitHub 的提交队列标签](#using-the-commit-queue-github-labels)
  * [使用 `git-node`](#using-git-node)
  * [技术 HOWTO](#technical-howto)
  * [故障排查](#troubleshooting)
  * [我犯了错](#i-made-a-mistake)
  * [长期支持](#long-term-support)
    * [LTS 是什么？](#what-is-lts)
    * [LTS 分支如何管理？](#how-are-lts-branches-managed)
    * [我能如何帮助？](#how-can-i-help)
* [在问题跟踪器中需要抄送谁](#who-to-cc-in-the-issue-tracker)

本文件解释协作者如何管理 Node.js 项目。协作者应理解
[新贡献者指南](../../CONTRIBUTING.md) 以及
[项目治理模型](../../GOVERNANCE.md)。

## 问题与拉取请求

请留意这些准则、其他协作者的看法，以及
[TSC][ ] 的指导。如有需要，请通知其他合格方以便就某个问题或拉取
请求提供更多意见。参见 [在问题跟踪器中需要抄送谁](#who-to-cc-in-the-issue-tracker)。

### 欢迎首次贡献者

始终对提交问题和拉取请求的个人保持礼貌。对于首次贡献者（由 GitHub **First-time contributor** 徽章标识），要格外欢迎。

对于首次贡献者，请检查提交作者是否与拉取请求作者相同。这样一来，当他们的拉取请求合并后，GitHub 会将他们标注为 _Contributor_。询问他们是否已按自己的偏好配置其 git
[用户名][git-username] 和 [邮箱][git-email]。

### 关闭问题与拉取请求

协作者可以关闭任何与 Node.js 项目未来无关的
问题或拉取请求。如果不清楚这一点，请保留问题或拉取请求数天以便讨论。如果在不久的讨论后仍没有证据表明该问题或拉取请求与未来相关，则将其关闭。请记住：如有必要，问题与拉取请求始终可以重新打开。

### 作者就绪的拉取请求

当满足以下条件时，一个拉取请求处于 _作者就绪_ 状态：

* CI 正在运行或已完成。
* 至少有一位协作者已批准。
* 没有未处理的审查评论。

在这种情况下，请务必为拉取请求添加 `author ready` 标签。
一旦条件不再满足，请务必立刻移除此标签。

### 处理自己的拉取请求

当你打开一个拉取请求时，请立即 [启动 CI](#testing-and-ci)。随后在新的代码变更或执行 rebase 之后，再启动一次新的 CI。

只要该拉取请求准备好合并，请尽快合并。这能让其他协作者将注意力
放到其他拉取请求上。如果你的拉取请求尚未准备好合并，但已是 [作者就绪](#author-ready-pull-requests)，请添加
`author ready` 标签。如果你希望由自己来合并该拉取请求，请使用“指派给自己”链接进行自我指派。

### 安全问题的管理

使用 [SECURITY.md][] 中概述的流程来报告安全问题。如果用户在公开仓库中打开了安全问题：

* 按 [SECURITY.md][] 的说明，要求用户通过 HackerOne 提交报告。
* 将问题移动到名为 [premature-disclosures](https://github.com/nodejs/premature-disclosures) 的私有仓库中。
* 对于任何相关的拉取请求，在 `premature-disclosures` 仓库中创建关联问题。
  将该拉取请求的补丁副本添加到问题中。并把来自该拉取请求的讨论截图附在问题中。
* [通过 GitHub 创建工单](https://support.github.com/contact)，在以 Node.js (team) 作为账户组织的情况下删除该拉取请求。
* 在公开仓库中以标题 `FYI - pull request
  deleted #YYYY` 打开一个新问题，并向用户包含如下说明：
  > FYI @xxxx 我们已请求 GitHub 在我们私下进行发布工作期间删除你的拉取请求。
* 给 `tsc@iojs.org` 发邮件，并附上 `premature-disclosures` 仓库中对应问题的链接。

## 接受修改

贡献者通过 GitHub 拉取请求来提出对 Node.js 的修改。该范围包括
TSC 成员以及其他协作者提出的修改。在合并到代码库之前，拉取请求必须通过代码审查并完成 CI。

### 代码审查

在拉取请求合并之前，至少需要两位协作者批准该拉取请求。如果该拉取请求已开放超过七天，那么只需一位协作者批准即可。

批准表示该协作者接受对该变更的责任。

批准必须来自非变更作者的协作者。

理想情况下，依赖项的拉取请求应由自动化生成。特别注意那些尚未自动生成的依赖项拉取请求，并遵循
[维护依赖](https://github.com/nodejs/node/blob/main/doc/contributing/maintaining/maintaining-dependencies.md#updating-dependencies) 中的指导。

超过 5000 行变更的拉取请求有额外要求。
请参阅 [大型拉取请求][] 指南。

在某些情况下，可能需要通过 @-mention 召唤某个 GitHub 团队来审查拉取请求。
请参阅 [在问题跟踪器中需要抄送谁](#who-to-cc-in-the-issue-tracker)。

如果你是第一个批准一个尚无 CI 的拉取请求的协作者，请 [先启动一个](#testing-and-ci)。如果在上一次 CI 运行之后，拉取请求创建者推送了新代码，也请启动新的 CI。

### 寻求共识

当拉取请求满足所需的 [批准](#code-reviews)、[CI](#testing-and-ci)、[等待时间](#waiting-for-approvals) 且不存在
[未解决异议](#objections) 时，该拉取请求可以合并。[破坏性变更](#breaking-changes)
除了满足其他要求外，还必须接受 [TSC 审查](#involving-the-tsc)。如果一个拉取请求满足所有要求，但未满足
[等待时间](#waiting-for-approvals)，请添加
[`author ready`](#author-ready-pull-requests) 标签。

#### 异议

协作者可以通过使用 GitHub 的“请求更改”功能对拉取请求提出异议。仅凭不同意评论本身不构成异议；在任何相关问题中提出的不同意评论也不构成异议。对某项变更进行拦截式异议必须在拉取请求中明确提出，该变更需要在拉取请求里被具体提议。任何拉取请求异议都必须包含对该异议的明确理由，并且提出异议的协作者必须在后续讨论中保持回应，以便就拉取请求的方向达成共识。如有可能，请在异议之外提供一组可执行的步骤。

如果其他人认为该异议不清楚，另一位协作者可以要求提出异议的协作者解释其异议，或提供可执行的步骤来解决该异议。如果在协作者请求澄清后，提出异议的协作者在七天内仍无回应，协作者可以驳回该异议。

在存在未解决异议的情况下，拉取请求必须保持打开状态，直到所有异议都得到满足。如果无法达成共识，协作者可以通过 ping `@nodejs/tsc` 并向问题添加 `tsc-agenda` 标签，将问题升级给 TSC。若未达成共识，或 TSC 决定驳回（或不支持）这些异议，则该变更无法继续。如果 TSC 选择驳回任何异议，那么在拉取请求合并前，必须在拉取请求中给出清晰的推理解释，或提供指向公开投票的链接。

所有协作者的异议都被视为同等重要。TSC 成员的异议不会比其他任何协作者的异议获得更高权重。

会犯错。如果拉取请求在存在未解决异议的情况下被合并，请提交修复。简单的问题可以通过一个后续拉取请求来修复，该拉取请求应解决该关注点。更困难的问题可能需要完全回滚。大多数修复都可以快速处理。如果有必要，应选择更稳妥的路径，以确保稳定性并达成共识。

对拉取请求提出异议的协作者，最佳做法是保持参与并在讨论中保持回应，以确保他们的异议能得到妥善处理。

#### 有用资源

* [如何像人类一样进行代码审查（第一部分）](https://mtlynch.io/human-code-reviews-1/)
* [如何像人类一样进行代码审查（第二部分）](https://mtlynch.io/human-code-reviews-2/)
* [代码审查礼仪](https://css-tricks.com/code-review-etiquette/)

### 等待批准

在合并拉取请求之前，需给其他协作者留出 48 小时以提供意见。某些类型的拉取请求可以走快速通道，并在更短延迟后合并。例如：

* 仅影响文档和/或测试套件的聚焦变更：
  * `code-and-learn` 任务往往属于此类。
  * `good-first-issue` 拉取请求也可能适合。
* 修复回归（regressions）的变更：
  * 破坏工作流的回归（红色 CI 或编译失败）。
  * 在发布前后出现的回归，或在发布后不久报告的回归。

要提议对拉取请求进行快速通道，请应用 `fast-track` 标签。随后 GitHub Actions 工作流会发表评论，协作者可以对该评论进行赞成投票（upvote）。

如果有人不同意快速通道请求，请移除该标签。在这种情况下，不要将拉取请求走快速通道。

当有两位协作者批准该快速通道请求时，该拉取请求就可以走快速通道。要合并，该拉取请求本身仍需两位协作者批准，并且 CI 必须通过。

协作者可以请求对他们未创建的拉取请求进行快速通道。在这种情况下，只有请求本身也同样算作一次快速通道批准。无论如何，请对该评论进行赞成投票，以避免任何疑虑。

### 测试与 CI

所有修复都必须包含一个展示缺陷的测试用例。该测试在变更之前应当失败，在变更之后应当通过。

在必要的通过型 CI 运行完成之前，不要合并任何拉取请求。必须要求 GitHub Actions CI 的通过结果（绿色）。如果该拉取请求包含会影响 `node` 二进制的变更，还必须要求通过的（绿色或黄色）[Jenkins CI](https://ci.nodejs.org/)。这是因为 GitHub Actions CI 不覆盖 Node.js 支持的全部运行环境。

<details>
<summary>影响 `node` 二进制的变更</summary>

以下文件夹中的变更（除“仅含注释”的变更外）将保证影响 `node` 二进制：

* `deps/`
* `lib/`
* `src/`
* `test/`
* `tools/code_cache/`
* `tools/gyp/`
* `tools/icu/`
* `tools/inspector-protocol/`
* `tools/msvs/`
* `tools/snapshot/`
* `tools/v8_gypfiles/`

还有一些其他文件会接触到构建链。对以下文件的变更也同样符合“影响 `node` 二进制”的条件：

* `tools/*.py`
* `*.gyp`
* `*.gypi`
* `configure`
* `configure.py`
* `Makefile`
* `vcbuild.bat`

</details>

如果 GitHub Actions CI 失败与该拉取请求中的变更无关，请尝试在“检查”选项卡右侧的“🔄 重新运行所有任务”按钮。

如果 Jenkins CI 失败与该拉取请求中的变更无关，请尝试“恢复构建”。它位于相关 `node-test-pull-request` 任务的左侧导航中。（不要被诱惑去在更低层级的 `node-test-commit` 任务上执行，因为它不会把更新后的结果回报给 PR。）它会保留当前任务中所有绿色结果，但会重新运行其余所有内容。如果自最初失败的 CI 已超过七天，请按“重试”开始一次全新的 CI，因为 Windows 和 ARM 平台的已编译二进制只会保留七天。

如果在最新一次 Jenkins CI 运行之后，新的提交被推送到拉取请求分支，则需要再次进行一次新的 CI 运行。可以通过向拉取请求添加 `request-ci` 标签来开始新的运行。

#### 有用的 Jenkins CI 任务

* [`node-test-pull-request`](https://ci.nodejs.org/job/node-test-pull-request/)
  是用于测试拉取请求的 CI 任务。它会在所有支持的平台上运行 `build-ci` 和 `test-ci` 目标。

* [`citgm-smoker`](https://ci.nodejs.org/job/citgm-smoker/)
  使用 [`CitGM`](https://github.com/nodejs/citgm) 让你能够在大量常见模块上运行
  `npm install && npm test`。这对于检查某项变更是否会导致生态系统出现破坏非常有用。

* [`node-stress-single-test`](https://ci.nodejs.org/job/node-stress-single-test/)
  can run a group of tests over and over on a specific platform. Use it to check
  that the tests are reliable (i.e. not flaky).

* [`node-test-commit-v8-linux`](https://ci.nodejs.org/job/node-test-commit-v8-linux/)
  运行标准 V8 测试。当在 Node.js 中更新 V8 或在 V8 上应用新的补丁时，请运行它。

* [`node-test-commit-custom-suites-freestyle`](https://ci.nodejs.org/job/node-test-commit-custom-suites-freestyle/)
  支持对测试套件和参数进行自定义。它可以执行其他 CI 测试运行中未使用的测试套件（例如 `internet` 或 `pummel` 目录下的测试）。当提供了其他 CI 测试运行中未使用的标志时，它也可以确保测试能通过（例如 `--worker`）。

#### 启动一个 Jenkins CI 任务

在 CI 任务页面中，点击左侧的“使用参数构建”。

你通常只需要在表单中输入以下一个或两个选项：

* `GIT_REMOTE_REF`: 更改 git refspec 的远程部分。
  通过这种方式指定分支时，使用 `refs/heads/BRANCH`（例如 `main` -> `refs/heads/main`）。
  对于拉取请求，它会类似 `refs/pull/PR_NUMBER/head`（例如拉取请求 #42 -> `refs/pull/42/head`）。
* `REBASE_ONTO`: 将其更改为 `origin/main`，以便将该拉取请求 rebase 到 `main` 上。对于那些已经打开一段时间的拉取请求，这尤其重要。

查看左侧“构建历史”下的任务列表，并复制你刚刚启动的那一个任务的链接（它会在最上方；但仍要点进去确认页面上写的是诸如“已开始 5 秒前”（右上角）以及“由用户 ... 启动”。

把该任务的 URL 复制/粘贴到拉取请求的评论中。
[`node-test-pull-request`](https://ci.nodejs.org/job/node-test-pull-request/)
是个例外：GitHub bot 会自动替你发布。

可以通过向拉取请求添加 `request-ci` 标签来启动
[`node-test-pull-request`](https://ci.nodejs.org/job/node-test-pull-request/)
CI 任务。一旦添加该标签，`github-actions bot` 会自动启动
`node-test-pull-request`。如果 `github-actions bot` 无法启动该任务，它会把该标签更新为 `request-ci-failed`。

### 内部 API 与公开 API

官方 Node.js 文档中的所有功能都属于公共
API。任何未被文档化的对象、属性、方法、参数、行为或事件都属于内部内容。对这条规则有例外。Node.js 用户已经依赖于一些未被文档化的行为。协作者会将其中许多未文档化行为当作公开行为来对待。

通过 `process.binding(...)` 暴露的任何未文档化功能都属于内部内容。

`lib/internal/**/*.js` 中的所有未文档化功能都属于内部内容。尽管如此，如果这些内容被 `lib/*.js` 中的代码重新导出，那么它们对外是公开的。

未导出的 `Symbol` 属性和方法属于内部内容。

任何以 `_` 开头的未文档化对象属性或方法都属于内部内容。

任何需要 `NODE_WANT_INTERNALS` 标志的原生 C/C++ API/ABI 都属于内部内容。

有时会对某些功能是内部还是公开存在分歧。在这种情况下，TSC 会作出决定。

对于被认定为公开的未文档化 API，请打开一个拉取请求来对该 API 进行文档化。

### 破坏性变更

至少需要两位 TSC 投票成员批准对
`main` 分支的向后不兼容变更。

破坏性变更的例子包括：

* 移除或重新定义现有 API 的参数。
* 改变返回值。
* 在 options 参数上移除或修改已有属性。
* 添加或移除错误。
* 改变事件的预期触发时序。
* 改变使用特定 API 的副作用。

#### 破坏性变更与弃用

已有稳定的公开 API 若以向后不兼容的方式发生变化，必须进行弃用（deprecation）。本规则的例外包括：

* 添加或移除公共 API 抛出或报告的错误。
* 发出运行时警告。
* 对未包含错误代码的错误更改错误信息。
* 改变公共 API 的时序以及非内部副作用。
* 来自 Node.js 依赖项（例如 V8）的错误变更。
* TSC 授予的一次性例外。

实验性与未文档化的 API 不被认为是稳定的，因此通常会在不经过弃用周期的情况下直接移除。然而，如果这种 API 已在生态系统中获得了某种非平凡的采用，那么它（或其子集）可以经历弃用流程——在这种情况下，对该 API（或至少其已弃用子集）的变更应遵循 [语义化版本](semantic versioning) [] 规则。

更多信息参见 [弃用](#deprecations)。

#### 对内部元素的破坏性变更

对内部元素的破坏性变更可能发生在 semver-patch 或 semver-minor 的提交中。在进行此类变更以及审查时务必格外小心。请努力评估该变更对生态系统可能造成的影响。可使用
[Canary in the Goldmine](https://github.com/nodejs/citgm) 来测试这类变更。
如果某项变更会导致生态系统破坏，那么它应当是 semver-major。考虑在这种情况下提供公共 API。

#### 非预期的破坏性变更

有时，一项意在不破坏的变更最终却变成了破坏性变更。如果这种变更合并到了
`main` 分支，协作者可以对其回滚。作为回滚的替代方案，TSC 可以事后应用 semver-major 标签。

如果该变更已经被反向移植到发布分支行中，请在 TSC 仓库中开立一个问题，讨论接下来如何最好地处理。过去我们经常在发布分支行中回滚变更，并保留该变更在 main 上。是否回滚的决定通常基于：限制对生态系统的影响，以及尽早发现该破坏性变更的速度。

如果进行了回滚，请确保：

* 考虑是否可以添加额外测试，以避免类似的破坏性变更在未来被遗漏。
* 考虑把包添加到 CITGM 是否有助于捕获该破坏性变更。
* 确保在 changelog 中对回滚的情况以及对那些可能已经使用了更新后 API 的用户的影响进行清晰说明。

无论哪种情况，都要确保对最初那项破坏性变更的文档和 changelog 已更新，以反映实际的破坏行为。

##### 回滚提交

使用 `git revert <HASH>` 或 `git revert <FROM>..<TO>` 回滚提交。生成的提交信息不会包含 subsystem，并且可能违反单行长度规则。这没问题。请在追加回滚原因之后附上任何 `Refs` 或 `Fixes` 元数据。像其他任何变更一样，创建一个拉取请求。

### 引入新模块

对引入新核心模块的提交要格外小心处理。

新增模块只能使用 `node:` 前缀来添加。

在为现有 API 添加 Promise 时，请添加 `/promises`（例如 `inspector/promises` 等）。在新增上应用 `semver-major` 标签。

如果新的模块名称在 npm 中可用，尽快在模块注册表中注册一个占位符（placeholder）。在该占位符的 `README` 中链接指向引入该新核心模块的拉取请求。

如果模块名称不可用，且该模块并未被广泛使用，请联系所有者，看看他们是否愿意把该模块转让给该项目。

在可能的情况下，我们会在不加 `node:` 前缀的情况下注册占位符，以避免混淆与“域名/包名截取”（typosquatting）攻击。

对于引入新核心模块的拉取请求：

* 至少预留一周用于审查。
* 只有在至少两位 TSC 投票成员完成签字（sign-off）之后才允许合并。
* 合并时带有 [稳定性指数（Stability Index）][] 为 Experimental（实验性）的标注。该模块必须在 semver-major 发布前保持 Experimental 状态。
* 引入一个 Experimental 功能意味着对该实验负责，并承诺明确的结果：要么将其提升为稳定版，要么在合理及时的期限内将其移除。由于实验性功能可能存在安全问题，作者也应预期帮助评估并修补漏洞。如果该实验性功能已达到主流采用程度，使得在不破坏生态的情况下几乎不可能进行破坏性变更，那么它应当被视为稳定，并在一次弃用周期之后进行提升或移除。

### 在全局作用域引入新 API

将新 API 暴露到全局作用域（无需 `import` 或 `require` 调用即可使用），包括在 `globalThis` 上引入新接口如 `globalThis.navigator`，以及在 `globalThis` 的接口上添加新的属性（如已知符号 well known symbols），都可能破坏特性检测和 Node.js 环境检测。

无条件地将新 API 暴露到全局作用域，并且不提供任何 CLI 标志时，必须始终标注为 `semver-major`。`semver-major` 标签可以通过常规的 TSC 共识流程免除。

建议先使用实验性 CLI 标志 `--experimental-<feature-name>` 来暴露全局作用域 API，而不要标注为 `semver-major`。当新的 API 功能完整后，通过默认启用该功能，并使用 CLI 标志 `--no-experimental-<feature-name>` 提供退出选项。

### 对 Node-API 的新增

Node-API 提供一个 ABI 稳定的 API，保证未来 Node.js 版本仍可用。
对 Node-API 的新增需要特别谨慎与审查。如果某项变更会向
`node_api.h`、`js_native_api.h`、`node_api_types.h` 或 `js_native_api_types.h` 中新增内容，请查阅
[相关指南](https://github.com/nodejs/node/blob/HEAD/doc/contributing/adding-new-napi-api.md)。

### 弃用

Node.js 使用三种 [弃用（Deprecation）][] 级别。对于所有被弃用的 API，API 文档必须明确说明弃用状态。

* 仅文档弃用（仅在文档中标记弃用）
  * 在 API 文档中会出现弃用通知。
  * 不会有任何功能性变更。
  * 默认情况下，在运行时不会为这种弃用发出警告。
  * 可能会在运行时因为 [`--pending-deprecation`][] 标志或
    `NODE_PENDING_DEPRECATION` 环境变量而产生运行时警告。

* 运行时弃用
  * 在第一次使用被弃用的 API 时于运行时发出警告。
  * 如果与 [`--throw-deprecation`][] 标志一起使用，将抛出运行时错误。

* 终止生命周期
  * 该 API 不再遵循语义化版本规则。
  * 包括完全移除这类 API 在内的向后不兼容变更，随时都可能发生。

对所有引入仅文档弃用的拉取请求，应用 `notable-change` 标签。此类弃用不会影响代码执行。因此，它们不属于破坏性变更（`semver-major`）。

运行时弃用与终止生命周期 API（内部或公开）都属于破坏性变更（`semver-major`）。TSC 可以做出例外决定，判断其中某项弃用并非破坏性变更。

当仅需要一个别名（alias）或存根/空操作（stub/no-op）即可满足需求时，尽量避免使用运行时弃用。别名或存根将为终端用户和 Node.js 核心带来更低的维护成本。

所有弃用都会被分配一个唯一且不可变的标识符（identifier）。文档、警告和错误在提及弃用时都要使用该标识符。用于该弃用标识符的文档必须始终保留在 API 文档中。这一点即使该弃用不再被使用也成立（例如由于终止生命周期的弃用 API 被移除）。

<a id="deprecation-cycle"></a>
所谓 _弃用周期（deprecation cycle）_ 是一个主要版本（major release），在该版本期间，某个 API 处于上述三种弃用级别之一。仅文档弃用可以合并到 minor 版本中。它们直到下一个 major 版本才可以升级为运行时弃用。

任何被弃用的 API 在不经过运行时弃用周期之前，都不能升级到终止生命周期（End-of-Life）。并不存在“被弃用的代码必须最终走向 End-of-Life”的硬性规则。仅文档弃用与运行时弃用都可以无限期保留。

请尽快与生态系统沟通即将发生的弃用及相关缓解措施。若可能，请在添加弃用的拉取请求合并到 `main` 之前完成沟通。

对添加或修改 API 的弃用级别的拉取请求，使用 `notable-change` 标签。

### 牵涉 TSC

协作者可以选择将拉取请求或问题升级至 [TSC][]。如果拉取请求或问题满足以下情况，请执行此操作：

* 对代码库有显著影响，或
* 存在争议，或
* 在参与讨论的协作者之间陷入僵局。

如果你希望将一个问题升级至
[TSC][ ]，请用 @-mention 提及 `@nodejs/tsc` 这个 GitHub 团队。
不要使用 GitHub 右侧界面将其分配给 `@nodejs/tsc` 或请求 `@nodejs/tsc` 进行审查。

如果一个拉取请求被标注为 `semver-major`，你可以请求
`@nodejs/tsc` GitHub 团队进行审查。

当需要时，TSC 将作为最终仲裁者。

## 合并到主分支的拉取请求（Landing pull requests）

1. 避免将由他人作为负责人（assignee）的拉取请求合并到主分支。希望合并自己拉取请求的作者会自行指定为负责人。有时，作者会把任务委托给他人。如有疑问，请询问负责人是否可以合并。
2. 永远不要使用 GitHub 的绿色按钮 ["Merge pull request"][]。不使用网页界面按钮的原因：
   * “Create a merge commit（创建合并提交）”方法会添加一个不必要的合并提交。
   * “Squash and merge（压缩并合并）”方法会把元数据（拉取请求 #）加入到提交标题中。如果不止一位作者为该拉取请求做出了贡献，压缩只会保留一位作者。
   * “Rebase and merge（变基并合并）”方法无法向提交添加元数据。
3. 确保 CI 已完成且为绿色。如果 CI 不是绿色，请检查是否存在不可靠的测试和基础设施故障。如果在 [node][unreliable tests] 或
   [build](https://github.com/nodejs/build/issues) 仓库中没有对应的问题，请打开新问题。任何人向该拉取请求推送新代码时，都要运行新的 CI。
4. 检查提交信息是否符合 [commit message guidelines][]。
5. 在合并到主分支之前，将所有必要的 [metadata][git-node-metadata] 添加到提交信息中。如果你不确定如何正确格式化提交信息，请以提交日志作为参考。参见 [此提交][commit-example] 作为示例。

对于来自首次贡献者的拉取请求，要
[欢迎他们](#welcoming-first-time-contributors)。另外，也要确认他们的 git 设置符合他们的偏好。

如果一个拉取请求包含超过一个提交，它可以通过压缩成一个提交来合并，或者通过将所有提交进行变基（rebase）来合并，或两者混合来完成。一般来说，协作者应通过压缩来合并拉取请求。如果一个拉取请求包含不止一个相互独立的子系统提交，协作者可以将其作为多个提交来合并。

所有提交都应当是自包含的（self-contained），也就是说每个提交都必须通过所有测试。这在排查引入了破坏性变更（breaking change）时进行二分定位（bisect）会容易得多。

### 使用 commit queue 的 GitHub 标签

参见 [commit queue 指南][commit-queue.md]。

### 使用 `git-node`

在大多数情况下，使用来自 [`@node-core/utils`][] 的 [`git-node` 命令][git-node] 就足以合并一个拉取请求。如果你在使用此工具时发现问题，请提交一个 issue
到 [issue 跟踪器][node-core-utils-issues]。

快速示例：

```bash
npm install -g @node-core/utils
git node land $PRID
```

要使用 `@node-core/utils`，你需要一个 GitHub 访问令牌（access token）。如果你没有，`@node-core/utils` 会在你第一次使用时为你创建一个。为此，它会要求你输入 GitHub 密码以及双重认证（two-factor authentication）验证码。如果你希望提前自己创建该令牌，请参见
[`@node-core/utils` 指南][node-core-utils-credentials]。

### 技术 HOWTO

在不常见的情况下，需要手动执行与合并拉取请求相关的步骤，而不是依赖 `git-node`。

<details>
<Summary>手动合并步骤</Summary>

清除任何可能已经在进行中的 `am`/`rebase`：

```bash
git am --abort
git rebase --abort
```

切换到正确的目标分支：

```bash
git checkout main
```

更新代码树（假设你的仓库已按
[CONTRIBUTING.md](./pull-requests.md#step-1-fork) 中的说明配置）：

```bash
git fetch upstream
git merge --ff-only upstream/main
```

应用外部补丁：

```bash
curl -L https://github.com/nodejs/node/pull/xxx.patch | git am --whitespace=fix
```

如果即使最近的 CI 运行都成功了，合并仍然失败，请尝试三方合并（3-way merge）：

```bash
git am --abort
curl -L https://github.com/nodejs/node/pull/xxx.patch | git am -3 --whitespace=fix
```

如果三方合并成功，请将结果与原始拉取请求进行对比。在合并之前，在至少一个平台上构建并测试。

如果三方合并失败，那么很可能是在 CI 运行成功之后，有一个冲突的拉取请求已经被合并了。你需要让作者进行变基（rebase）。

检查并重新评审改动：

```bash
git diff upstream/main
```

检查提交数量和提交信息：

```bash
git log upstream/main...main
```

压缩提交并添加元数据：

```bash
git rebase -i upstream/main
```

这会在默认的 shell 编辑器中打开类似这样的界面：

```text
pick 6928fc1 crypto: add feature A
pick 8120c4c add test for feature A
pick 51759dc crypto: feature B
pick 7d6f433 test for feature B

# Rebase f9456a2..7d6f433 onto f9456a2
#
# Commands:
#  p, pick = use commit
#  r, reword = use commit, but edit the commit message
#  e, edit = use commit, but stop for amending
#  s, squash = use commit, but meld into previous commit
#  f, fixup = like "squash", but discard this commit's log message
#  x, exec = run command (the rest of the line) using shell
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
```

把几个 `pick` 替换为 `fixup`，以便把它们压缩到之前的提交中：

```text
pick 6928fc1 crypto: add feature A
fixup 8120c4c add test for feature A
pick 51759dc crypto: feature B
fixup 7d6f433 test for feature B
```

把 `pick` 替换为 `reword` 来修改提交信息：

```text
reword 6928fc1 crypto: add feature A
fixup 8120c4c add test for feature A
reword 51759dc crypto: feature B
fixup 7d6f433 test for feature B
```

保存文件并关闭编辑器。系统提示你为该提交输入新的提交信息时，这是一个修复提交信息的机会。

* 提交信息文本必须符合 [commit message guidelines][]。
* <a name="metadata"></a>修改原始提交信息以包含元数据。（[`git node metadata`][git-node-metadata] 命令可以为你生成所需的元数据）。

  * 必填：`PR-URL:` 一行，引用该拉取请求的完整 GitHub URL。这使得可以很容易地追溯某次提交回到导致该改动的讨论。
  * 可选：`Fixes: X` 行，其中 _X_ 是某个 issue 的完整 GitHub URL。提交信息可以包含不止一行 `Fixes:`。
  * 可选：一行或多行 `Refs:`，引用任何相关背景的 URL。
  * 必填：对每一个审阅了该改动的协作者，都要有一行 `Reviewed-By: Name <email>`。
    * 如果出现问题，这对 @mentions/联系列表很有用。
    * 防止人们错误地假设 GitHub 会永远存在。

自从 CI 成功运行之后，可能已经有其他改动合并到了 `main`。作为预防措施，请重新运行测试（`make -j4 test` 或 `vcbuild test`）。

使用 [core-validate-commit](https://github.com/nodejs/core-validate-commit) 来确认提交信息格式正确。

```bash
git rev-list upstream/main...HEAD | xargs core-validate-commit
```

可选：对于你自己的提交，如果需要，强制推送（force push）你已修订（amended）的提交到拉取请求分支。如果你的分支名是 `bugfix`，那么：
`git push --force-with-lease origin main:bugfix`。不要关闭拉取请求。它会在你向上游推送之后自动关闭。它将显示紫色的“已合并（merged）”状态，而不是红色的“已关闭（closed）”状态。如果你在 GitHub 更新其状态之前就关闭拉取请求，它将显示为一个 0 个提交的拉取请求，并且没有改动文件。操作顺序很重要。
如果你先向上游推送，再推送到你的分支，GitHub 会以红色的“已关闭”状态关闭该 issue。

现在开始推送：

```bash
git push upstream main
```

使用一条 “Landed in `<commit hash>`” 注释来关闭拉取请求。即使你的拉取请求显示为紫色的“已合并”状态，
如果你添加了不止一个提交，也要添加 “Landed in \<commit hash>..\<commit hash>” 这条注释。

</details>

### 故障排查（Troubleshooting）

有时，当你运行 `git push upstream main` 时，可能会看到类似下面的错误信息：

```console
To https://github.com/nodejs/node
 ! [rejected]              main -> main (fetch first)
error: failed to push some refs to 'https://github.com/nodejs/node'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

这意味着在你上一次针对 `upstream/main` 进行变基（rebase）之后，有一个提交已经被合并进去了。要修复这个问题，请从上游拉取并进行变基（pull with rebase），再次运行测试；（如果测试通过）然后再推送：

```bash
git pull upstream main --rebase
make -j4 test
git push upstream main
```

### 我犯了错误

* 通知一位 TSC 投票成员。
* 使用 `git` 时，可以通过强制推送远程代码树来覆盖（`git push -f`）。一般来说这是被禁止的，因为它会造成其他人分叉（fork）中的冲突。对于更简单的疏忽，比如提交信息中的拼写错误，这是可以接受的。你只能在最初推送后的 10 分钟内，强制推送到任意 Node.js 分支。如果其他人也推送到了该分支，或超过了 10 分钟的时间，那么请将该提交视为最终状态。
  * 使用 `--force-with-lease` 来降低覆盖他人改动的风险。

### 长期支持（Long Term Support）

#### 什么是 LTS？

长期支持（Long Term Support，LTS）保证对特定版本的 Node.js 提供 30 个月的支持周期。你可以在
[完整发布计划（full release plan）](https://github.com/nodejs/Release#release-plan) 中找到更多信息。分支进入 LTS 后，发布计划会限制允许在该分支中进行的变更类型。

#### LTS 分支如何被管理？

每个 LTS 发布都有一个对应的分支（v10.x、v8.x 等）。同时也有一个对应的暂存分支（v10.x-staging、v8.x-staging 等）。

合并到 `main` 的提交会在适当时机被 cherry-pick 到每个暂存分支。如果某个变更只适用于 LTS 分支，请针对 _staging_ 分支打开拉取请求。来自 staging 分支的提交只有在准备发布时才会合并到 LTS 分支。它们被合并到 LTS 分支的顺序可能与在暂存分支中的顺序不同。

只有 @nodejs/backporters 的成员应当将提交合并到 LTS 暂存分支上。

#### 我该如何帮助？

当你提交拉取请求时，请说明你的改动是否具有破坏性（breaking）。另外也请说明你认为你的补丁是否适合作为 backporting（回填）候选。有关 backporting 的更多信息，请参见 [backporting guide][]。

与 LTS 相关的标签有几种：

* `lts-watch-` 标签用于考虑将拉取请求合并到暂存分支。例如，`lts-watch-v10.x` 就会用于考虑该改动是否应合并到 `v10.x-staging` 分支。

* `land-on-` 标签用于那些应当合并到未来某个 v\*.x 发布版本的拉取请求。例如，`land-on-v10.x` 表示该改动应当合并到 Node.js 10.x。

任何协作者都可以把这些标签附加到任意拉取请求/issue 上。当提交被合并到暂存分支时，backporter 会移除 `lts-watch-` 标签。同理，当提交进入某个 LTS 发布版本时，releaser 会移除 `land-on-` 标签。

把合适的 `lts-watch-` 标签附加到任何可能影响 LTS 发布的拉取请求上。

## 在问题跟踪器中应该抄送（CC）谁

| 子系统                                   | 维护者                                                                                                               |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `benchmark/*`                           | [@nodejs/benchmarking][]                                                                                              |
| `doc/*`, `*.md`                         | [@nodejs/documentation][]                                                                                             |
| `lib/assert`                            | [@nodejs/assert][]                                                                                                    |
| `lib/async_hooks`                       | [@nodejs/async\_hooks][@nodejs/async_hooks] 用于 bug/评审（+ [@nodejs/diagnostics][] 用于 API）                  |
| `lib/buffer`                            | [@nodejs/buffer][]                                                                                                    |
| `lib/child_process`                    | [@nodejs/child\_process][@nodejs/child_process]                                                                     |
| `lib/cluster`                          | [@nodejs/cluster][]                                                                                                   |
| `lib/{crypto,tls,https}`                | [@nodejs/crypto][]                                                                                                    |
| `lib/dgram`                             | [@nodejs/dgram][]                                                                                                     |
| `lib/domains`                           | [@nodejs/domains][]                                                                                                   |
| `lib/fs`, `src/{fs,file}`               | [@nodejs/fs][]                                                                                                        |
| `lib/{_}http{*}`                        | [@nodejs/http][]                                                                                                      |
| `lib/inspector.js`, `src/inspector_*` | [@nodejs/v8-inspector][]                                                                                                |
| `lib/internal/bootstrap/*`            | [@nodejs/process][]                                                                                                   |
| `lib/internal/url`, `src/node_url`    | [@nodejs/url][]                                                                                                       |
| `lib/net`                               | [@nodejs/streams][]                                                                                                   |
| `lib/repl`                              | [@nodejs/repl][]                                                                                                      |
| `lib/{_}stream{*}`                    | [@nodejs/streams][]                                                                                                   |
| `lib/internal/test_runner`            | [@nodejs/test\_runner][@nodejs/test_runner]                                                                           |
| `lib/timers`                            | [@nodejs/timers][]                                                                                                    |
| `lib/zlib`                              | [@nodejs/zlib][]                                                                                                      |
| `src/async_wrap.*`                    | [@nodejs/async\_hooks][@nodejs/async_hooks]                                                                         |
| `src/node_api.*`                      | [@nodejs/node-api][]                                                                                                  |
| `src/node_crypto.*`, `src/crypto`     | [@nodejs/crypto][]                                                                                                    |
| `src/node_sqlite.*`                   | [@nodejs/sqlite][]                                                                                                    |
| `test/*`                                | [@nodejs/testing][]                                                                                                   |
| `tools/eslint`, `eslint.config.mjs`   | [@nodejs/linting][]                                                                                                   |
| build                                   | [@nodejs/build][]                                                                                                     |
| GYP                                     | [@nodejs/gyp][]                                                                                                       |
| performance                             | [@nodejs/performance][]                                                                                               |
| 平台特定                                 | @nodejs/platform-{[aix][], [arm][], [freebsd][], [macos][], [ppc][], [smartos][], [s390][], [windows][], [windows-arm][]} |
| python 代码                             | [@nodejs/python][]                                                                                                    |
| 升级 http-parser                        | [@nodejs/http][], [@nodejs/http2][]                                                                                  |
| 升级 libuv                               | [@nodejs/libuv][]                                                                                                     |
| 升级 npm                                 | [@nodejs/npm][]                                                                                                       |
| 升级 V8                                  | [@nodejs/V8][], [@nodejs/post-mortem][]                                                                               |
| 在 Node.js 中的嵌入使用或交付            | [@nodejs/delivery-channels][]                                                                                         |

当某些事项需要额外关注、存在争议，或属于 `semver-major` 时：
[@nodejs/tsc][]

如果你无法为某个文件找到应该抄送（CC）的人，`git shortlog -n -s <file>` 可能会有所帮助。

## 标签

### 通用标签

* `confirmed-bug`：你已验证的 bug
* `discuss`：需要更大范围讨论的事项
* `fast-track`：需要更快落地的 PR —— 见
  [等待审批](#waiting-for-approvals)
* `feature request`：任何请求新功能的 issue
* `good first issue`：适合新手修复的 issue
* `meta`：治理、政策、流程等
* `request-ci`：当此标签被添加到 PR 时，CI 将会自动启动。参见 [启动 Jenkins CI 作业](#starting-a-jenkins-ci-job)
* `tsc-agenda`：带有此标签的开放 issue 和 pull request 将被加入技术指导委员会（TSC）会议议程

***

* `author-ready`：当以下条件满足时，PR 处于 _作者已就绪_ 状态：
  * 当前或已完成有一个 CI 运行
  * 至少有一项合作者批准（对于 `semver-major` PR 则需要两项 TSC 批准）
  * 没有未解决的评审评论

请始终为符合条件的 PR 添加 `author ready` 标签。
请在条件不再满足时（例如 CI 运行失败或发布了新的未解决评审评论）务必将其移除。

***

* `semver-{minor,major}`
  * 保守一些——也就是说，如果某个变更存在远程（_chance_）会破坏某些东西的可能，请选择 semver-major
  * 添加 semver 标签时，添加一条注释解释你为什么要添加它
  * minor vs. patch：大致是“是否新增了一个方法 / 是否向文档新增了一个章节”
  * major vs. 其他所有：在该版本上运行最后版本的测试，如果通过，**可能**就是 minor 或 patch

### LTS/版本标签

我们使用标签来标记一个提交（commit）应该落到哪些分支：

* `dont-land-on-v?.x`
  * 不适用于特定发布线（release line）的变更
  * 当回溯（backport）某个变更的工作量超过其带来的收益时也会使用
* `land-on-v?.x`
  * 由发布负责人（releasers）用于标记 PR 已安排纳入某个 LTS 版本
  * 对于干净的 cherry-pick：应用到原始 pull request；否则应用到回溯 pull request
* `backport-requested-v?.x`
  * 用于表示某个 pull request 需要对某个分支进行手动回溯（backport），以便将变更落到该分支
  * 通常由发布负责人（releaser）在以下情况下应用：PR 无法干净地应用，或在应用后会导致测试失败
  * 将被以下之一替换：`dont-land-on-v?.x` 或 `backported-to-v?.x`
* `backported-to-v?.x`
  * 应用于已经合并了回溯 pull request 的 pull requests
* `lts-watch-v?.x`
  * 应用于 release 工作组应考虑在某个 LTS 版本中纳入的 pull requests
  * 不表示会采取任何特定行动，但作为对非合作者的消息传递可能会很有效
* `release-agenda`
  * 需要由 release 工作组讨论的事项
  * （例如 semver-minor 变更需要或应该进入某个 LTS 版本）
* `v?.x`
  * 自动应用到不以 `main` 为目标、而是以 `v?.x-staging` 分支为目标的变更

一旦某条发布线进入维护模式，相应的标签就不再需要继续附加，因为只会包含重要的 bugfix。

### 其他标签

* 操作系统标签
  * `macos`, `windows`, `smartos`, `aix`, `linux` 等
* 架构标签
  * `arm`, `mips`, `s390`, `ppc` 等
  * 没有 `x86{_64}` 标签，因为它是隐含的默认值

["Merge pull request"]: https://help.github.com/articles/merging-a-pull-request/#merging-a-pull-request-on-github
[@nodejs/V8]: https://github.com/orgs/nodejs/teams/V8
[@nodejs/assert]: https://github.com/orgs/nodejs/teams/assert
[@nodejs/async_hooks]: https://github.com/orgs/nodejs/teams/async_hooks
[@nodejs/benchmarking]: https://github.com/orgs/nodejs/teams/benchmarking
[@nodejs/buffer]: https://github.com/orgs/nodejs/teams/buffer
[@nodejs/build]: https://github.com/orgs/nodejs/teams/build
[@nodejs/child_process]: https://github.com/orgs/nodejs/teams/child_process
[@nodejs/cluster]: https://github.com/orgs/nodejs/teams/cluster
[@nodejs/crypto]: https://github.com/orgs/nodejs/teams/crypto
[@nodejs/delivery-channels]: https://github.com/orgs/nodejs/teams/delivery-channels
[@nodejs/dgram]: https://github.com/orgs/nodejs/teams/dgram
[@nodejs/diagnostics]: https://github.com/orgs/nodejs/teams/diagnostics
[@nodejs/documentation]: https://github.com/orgs/nodejs/teams/documentation
[@nodejs/domains]: https://github.com/orgs/nodejs/teams/domains
[@nodejs/fs]: https://github.com/orgs/nodejs/teams/fs
[@nodejs/gyp]: https://github.com/orgs/nodejs/teams/gyp
[@nodejs/http]: https://github.com/orgs/nodejs/teams/http
[@nodejs/http2]: https://github.com/orgs/nodejs/teams/http2
[@nodejs/libuv]: https://github.com/orgs/nodejs/teams/libuv
[@nodejs/linting]: https://github.com/orgs/nodejs/teams/linting
[@nodejs/node-api]: https://github.com/orgs/nodejs/teams/node-api
[@nodejs/npm]: https://github.com/orgs/nodejs/teams/npm
[@nodejs/performance]: https://github.com/orgs/nodejs/teams/performance
[@nodejs/post-mortem]: https://github.com/orgs/nodejs/teams/post-mortem
[@nodejs/process]: https://github.com/orgs/nodejs/teams/process
[@nodejs/python]: https://github.com/orgs/nodejs/teams/python
[@nodejs/repl]: https://github.com/orgs/nodejs/teams/repl
[@nodejs/sqlite]: https://github.com/orgs/nodejs/teams/sqlite
[@nodejs/streams]: https://github.com/orgs/nodejs/teams/streams
[@nodejs/test_runner]: https://github.com/orgs/nodejs/teams/test_runner
[@nodejs/testing]: https://github.com/orgs/nodejs/teams/testing
[@nodejs/timers]: https://github.com/orgs/nodejs/teams/timers
[@nodejs/tsc]: https://github.com/orgs/nodejs/teams/tsc
[@nodejs/url]: https://github.com/orgs/nodejs/teams/url
[@nodejs/v8-inspector]: https://github.com/orgs/nodejs/teams/v8-inspector
[@nodejs/zlib]: https://github.com/orgs/nodejs/teams/zlib
[Deprecation]: https://en.wikipedia.org/wiki/Deprecation
[SECURITY.md]: https://github.com/nodejs/node/blob/HEAD/SECURITY.md
[Stability Index]: ../api/documentation.md#stability-index
[TSC]: https://github.com/nodejs/TSC
[`--pending-deprecation`]: ../api/cli.md#--pending-deprecation
[`--throw-deprecation`]: ../api/cli.md#--throw-deprecation
[`@node-core/utils`]: https://github.com/nodejs/node-core-utils
[aix]: https://github.com/orgs/nodejs/teams/platform-aix
[arm]: https://github.com/orgs/nodejs/teams/platform-arm
[backporting guide]: backporting-to-release-lines.md
[commit message guidelines]: pull-requests.md#commit-message-guidelines
[commit-example]: https://github.com/nodejs/node/commit/b636ba8186
[commit-queue.md]: ./commit-queue.md
[freebsd]: https://github.com/orgs/nodejs/teams/platform-freebsd
[git-email]: https://help.github.com/articles/setting-your-commit-email-address-in-git/
[git-node]: https://github.com/nodejs/node-core-utils/blob/HEAD/docs/git-node.md
[git-node-metadata]: https://github.com/nodejs/node-core-utils/blob/HEAD/docs/git-node.md#git-node-metadata
[git-username]: https://help.github.com/articles/setting-your-username-in-git/
[large pull requests]: large-pull-requests.md
[macos]: https://github.com/orgs/nodejs/teams/platform-macos
[node-core-utils-credentials]: https://github.com/nodejs/node-core-utils#setting-up-credentials
[node-core-utils-issues]: https://github.com/nodejs/node-core-utils/issues
[ppc]: https://github.com/orgs/nodejs/teams/platform-ppc
[s390]: https://github.com/orgs/nodejs/teams/platform-s390
[semantic versioning]: https://semver.org/
[smartos]: https://github.com/orgs/nodejs/teams/platform-smartos
[unreliable tests]: https://github.com/nodejs/node/issues?q=is%3Aopen+is%3Aissue+label%3A%22CI+%2F+flaky+test%22
[windows]: https://github.com/orgs/nodejs/teams/platform-windows
[windows-arm]: https://github.com/orgs/nodejs/teams/platform-windows-arm
