# Commit queue

_tl;dr：你可以通过向拉取请求添加
`commit-queue` 标签来请求队列合并它们。_

Commit Queue 是项目的一项功能，通过借助 GitHub Actions 自动化合并流程来简化该流程。借助它，协作者可以通过向 PR 添加 `commit-queue` 标签，将拉取请求加入合并队列。选择器会使用 `@node-core/utils` 检查就绪状态。如果拉取请求仅因可延期的条件而受阻，目前是等待时间，队列会保留该标签，稍后重试。其他失败则继续沿用现有的合并和失败报告流程。

本文档概述了 Commit Queue 的工作方式，以及实现细节、设计选择的原因和当前的限制。

## 概览

从高层次来看，Commit Queue 的工作方式如下：

1. 协作者会为他们希望由队列合并的拉取请求添加 `commit-queue` 标签。该标签可以在拉取请求完成等待时间之前添加。所需的批准必须已经完成，任何必需的 CI 也必须已成功完成。Commit Queue 不会自行请求 CI。
2. 在每次计划运行时，队列会从开放的、带有 `commit-queue` 标签且不带有 `blocked` 标签的拉取请求中构建候选列表。候选项还必须满足以下条件之一：至少在两天前创建，或带有 `fast-track` 标签。其他已标记的拉取请求会保留该标签，直到其达到足够的等待时间或被快速处理。工作流使用五分钟的 cron，但 GitHub Actions 的计划工作流不保证每五分钟准确运行一次。对于每个候选项，队列将：
   1. 在 landing 作业中安装并配置 `@node-core/utils`，然后运行仅检查元数据的就绪性检查，而不检出仓库
   2. 如果元数据检查以可延迟的就绪性代码退出，意味着 PR 仅因等待时间而被阻塞，则保留 `commit-queue` 标签，并跳过此 PR，直到之后的队列运行
   3. 对于已就绪的 PR 以及存在严重或混合就绪性失败的 PR，运行 `git node land`，并在整个尝试过程中保留 `commit-queue` 标签
   4. 如果失败：
      1. 将 `commit-queue` 标签替换为 `commit-queue-failed` 标签
      2. 在 PR 上发表评论，其中包含 `git node land` 的输出
      3. 中止 `git node land` 会话。如果中止成功，则继续处理下一个 PR；否则，以未知状态停止队列
   5. 如果成功：
      1. 将更改推送或合并到 nodejs/node
      2. 在 PR 上发表评论，内容为 `Landed in ...`
      3. 关闭 PR
      4. 移除 `commit-queue` 标签
      5. 转到队列中的下一个 PR

要让 Commit Queue 将拉取请求的所有提交压缩到第一个提交中，请添加 `commit-queue-squash` 标签。
要让 Commit Queue 合并包含多个提交的拉取请求，请添加 `commit-queue-rebase` 标签。使用此选项时，请确保所有提交都是自包含的，也就是说，每个提交都应通过所有测试。

## 当前限制

Commit Queue 功能仍处于早期阶段，因此可能无法处理更复杂的拉取请求。以下是目前已知的 Commit Queue 限制：

1. 拉取请求中的所有提交都必须遵循提交消息规范，或者是一个有效的
   [`fixup!`](https://git-scm.com/docs/git-commit#Documentation/git-commit.txt---fixupamendrewordltcommitgt)
   提交，并且能够由 [`--autosquash`](https://git-scm.com/docs/git-rebase#Documentation/git-rebase.txt---autosquash)
   选项正确处理
2. 自 PR 上次更改后，必须运行 CI 并成功通过
3. 自上次更改后，必须有协作者批准该 PR
4. 仅检查 Jenkins CI 和 GitHub Actions（忽略 V8 CI 和 CITGM）
5. PR 必须以 `main` 分支为目标（针对其他分支提交的 PR，例如回移植 PR，将被忽略）

## 实现

该[action](../../.github/workflows/commit-queue.yml)在计划事件上运行。
它使用五分钟的 cron，因为这是 GitHub Actions 接受的最小间隔。计划工作流不保证严格按照该
频率运行，两次运行之间的间隔可能更长。

该工作流还使用并发组，因此同一时间只能有一个 commit queue 运行处于活动状态。如果计划运行在
之前的运行仍在进行时启动，GitHub Actions 对于同一并发组最多保留一个待处理运行。较新的待处理
运行会替换较旧的待处理运行。

使用调度器优于使用 pull\_request\_target，原因有二：

1. 如果两个 Commit Queue Actions 执行发生重叠，最后完成的那个存在较高风险会失败，因为在第一个
   Action 推送后，本地分支将与远程不同步。`issue_comment` 事件也有同样的限制。
2. `pull_request_target` 只有在 Action 存在于拉取请求的基础提交中时才会运行，并且它会运行该提交
   中存在的 Action 版本，这意味着对于已经打开的 PR，我们无法使用它，除非先对这些 PR 进行
   rebase。

工作流首先启动一个小型候选任务，该任务使用 GitHub CLI 获取带有 `commit-queue` 标签且没有
`blocked` 标签的开放拉取请求。它获取两个候选集合：至少两天前创建的拉取请求，以及带有
`fast-track` 标签的拉取请求。该任务会在将候选项传递给落地任务之前对两个集合去重。不属于
这两个集合的拉取请求会保留标签，但不会在本次运行中处理。

如果存在候选 PR，落地任务会使用个人令牌以及来自
[@nodejs-github-bot](https://github.com/nodejs/github-bot) 的 Jenkins 令牌安装并配置一次
`@node-core/utils`。然后，它无需检出仓库即可下载工作流提交中的 README，并针对每个候选项运行
`git node metadata --readme --json`。这会使用与 `git node land` 相同的
`@node-core/utils` PR 就绪检查，但不会克隆、获取或合并 PR。过滤器使用结构化元数据结果及其
退出代码，而不是匹配面向用户的可读输出：

* 退出代码 `0`：PR 已准备就绪，并会传递给
  [`commit-queue.sh`](../../tools/actions/commit-queue.sh)
* 退出代码 `20`-`29`：由于可延后的元数据原因，PR 尚未准备就绪，目前是等待时间原因，因此会保留 `commit-queue` 标签，并在稍后重试
* 退出代码 `40`-`49`：PR 存在严重或混合的元数据就绪失败，并会传递给 [`commit-queue.sh`](../../tools/actions/commit-queue.sh)

`20`-`29` 的退出代码范围由 `@node-core/utils` 保留，用于表示可延后的元数据就绪状态，
而 `40`-`49` 则保留用于表示严重的元数据失败状态。未知的过滤器失败会在启动落地脚本之前使
工作流失败，并保持 PR 标签不变，以便队列可以在之后的计划运行中重试。退出代码为 `40`-`49`
的 PR 会继续通过 `commit-queue.sh`。只有在过滤后至少剩余一个 PR 时，工作流才会检出仓库。
该脚本不会单独跳过带有 `request-ci` 标签或 GitHub 检查仍处于待处理状态的 PR。相反，
`git node land` 会执行落地检查，而脚本会通过正常的队列失败路径报告任何失败。

> 个人令牌需要拥有访问公共仓库和读取个人资料的权限。它由 `@node-core/utils` 使用，也由落地
> 任务用于检出、更新标签和评论、合并以及推送。检查 CI 状态需要 Jenkins 令牌。

`commit-queue.sh` 接收以下位置参数：

1. 仓库所有者
2. 仓库名称
3. 从此参数开始的每个位置参数都将是一个已设置 commit-queue 的拉取请求 ID。

该脚本遍历这些拉取请求。对于每个 PR，它使用 GitHub CLI 获取标签并选择多提交策略，然后运行
`git node land`，并将标准输出和标准错误转发到一个文件。它不会执行单独的 CI 预检；
`git node land` 会执行当前的就绪检查和 CI 验证。

在 `git node land` 运行期间，该脚本会保留 `commit-queue` 标签。仅因等待时间而被阻塞的 PR
应该已经由元数据检查过滤掉。严重或混合的就绪失败会继续传递，以便 `git node land` 生成失败
输出。如果落地尝试因该原因或任何其他原因失败，任务会将 `commit-queue` 标签替换为
`commit-queue-failed`，添加一条包含输出的评论，然后中止落地会话。如果中止失败，队列会停止，
而不是在未知状态下继续运行。

快速通道 PR 会在检出和运行落地脚本之前进行元数据检查。如果快速通道请求尚未获得足够的协作者
赞成票，队列会保留 `commit-queue` 标签并重试，直到快速通道请求获得批准，或 PR 根据常规等待
时间规则变得可落地。commit queue 不会创建快速通道请求评论；添加 `fast-track` 标签时会处理
该评论。如果缺少该评论，队列会报告失败，而不是让 PR 继续排队。

如果 `git node land` 期间没有发生错误，脚本会将直接 rebase 落地推送到 `main`，或者对于
单提交和修复提交落地，使用 GitHub 的 squash merge API。然后，它会在 PR 中留下
`Landed in ...` 评论。GitHub 会自动关闭通过合并 API 合并的 PR；对于直接推送，脚本会关闭
PR。随后脚本会移除 `commit-queue` 标签。迭代会继续，直到所有 PR 都完成上述步骤。

## 撤销损坏的提交

撤销损坏的提交由协作者手动完成，就像通过 `git node land` 手动落地提交一样。对于该项目而言，一种简便的撤销方式是一项很好的功能，但对于 Commit Queue 的运行而言并非明确要求，因为 Action 会像协作者目前所做的那样落地 PR。如果我们开始使用 Commit Queue 后发现所需的撤销次数大幅增加，我们可以暂停队列，直到实现 Revert Queue，但在此之前，我们可以启用 Commit Queue，然后将 Revert Queue 作为后续工作。
