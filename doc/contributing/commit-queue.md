# 提交队列

_tl;dr：你可以通过为拉取请求添加
`commit-queue` 标签，请求队列合并拉取请求。_

提交队列是一项项目功能，可通过 GitHub Actions 自动化合并流程，从而简化合并操作。借助该功能，协作者可以通过为 PR 添加 `commit-queue` 标签，将拉取请求加入合并队列。选择器会使用 `@node-core/utils` 检查是否满足条件。如果拉取请求仅因可延迟处理的条件（目前为等待时间）而被阻塞，队列会保留该标签，并在稍后重试。其他失败情况则继续沿用现有的合并和失败报告流程。

本文档概述了提交队列的工作方式，以及实现细节、设计选择的原因和当前限制。

## 概览

从高层次来看，提交队列的工作方式如下：

1. 协作者会将 `commit-queue` 标签添加到希望由队列合并的拉取请求中。可以在拉取请求完成等待时间之前添加该标签，也可以在请求的 CI 完成之前添加。所需的批准必须已经到位。提交队列不会自行请求 CI。
2. 在每次计划运行时，队列会从开放的、带有 `commit-queue` 标签且不带有 `blocked` 标签的拉取请求中构建候选列表。工作流使用五分钟一次的 cron，但 GitHub Actions 的计划工作流不保证严格每五分钟运行一次。对于每个候选项，队列将：
   1. 在合并作业中安装并配置 `@node-core/utils`，然后运行仅检查元数据的就绪性检查，而不检出代码仓库
   2. 如果元数据检查以可延迟的就绪状态码退出，表示该 PR 仅因等待时间而被阻塞，则保留 `commit-queue` 标签，并跳过此 PR，直到之后的队列运行
   3. 检查 PR 是否也带有 `request-ci` 标签（如果有，则跳过此 PR，因为它正在等待 CI 运行）
   4. 检查 GitHub 检查是否仍在运行（如果是，则跳过此 PR）
   5. 移除 `commit-queue` 标签并运行 `git node land`
   6. 如果失败：
      1. 将 `commit-queue-failed` 标签添加到 PR
      2. 在 PR 上留下评论，其中包含 `git node land` 的输出
      3. 中止 `git node land` 会话。如果中止成功，则继续处理下一个 PR；否则，以未知状态停止队列
   7. 如果成功：
      1. 将更改推送或合并到 nodejs/node
      2. 在 PR 上留下包含 `Landed in ...` 的评论
      3. 关闭 PR
      4. 处理队列中的下一个 PR

要让提交队列将拉取请求的所有提交压缩到第一个提交中，请添加 `commit-queue-squash` 标签。
要让提交队列合并包含多个提交的拉取请求，请添加 `commit-queue-rebase` 标签。使用此选项时，请确保所有提交都是自包含的，也就是说，每个提交都应通过所有测试。

## 当前限制

提交队列功能仍处于早期阶段，因此它可能不适用于更复杂的拉取请求。以下是当前已知的提交队列限制：

1. 拉取请求中的所有提交都必须符合以下提交消息指南，或者是一个有效的 [`fixup!`](https://git-scm.com/docs/git-commit#Documentation/git-commit.txt---fixupamendrewordltcommitgt) 提交，并且能够被 [`--autosquash`](https://git-scm.com/docs/git-rebase#Documentation/git-rebase.txt---autosquash) 选项正确处理
2. 自拉取请求上次更改以来，必须运行过 CI 且运行成功
3. 自拉取请求上次更改以来，必须有一名协作者批准该拉取请求
4. 只检查 Jenkins CI 和 GitHub Actions（忽略 V8 CI 和 CITGM）
5. 拉取请求必须以 `main` 分支为目标（针对其他分支提交的拉取请求，例如用于回移植的拉取请求，将被忽略）

## 实现

[action](../../.github/workflows/commit-queue.yml) 会在计划事件上运行。
它使用五分钟的 cron，因为这是 GitHub Actions 接受的最小间隔。
计划工作流不保证严格按照该频率运行，运行间隔可能会更长。

该工作流还使用并发组，因此同一时间最多只能有一个提交队列运行处于活动状态。如果某次计划运行开始时，之前的运行仍在进行，GitHub Actions 会针对同一并发组最多保留一个待处理运行。较新的待处理运行会替换较旧的待处理运行。

相比使用 pull\_request\_target，使用调度器更可取，原因有两个：

1. 如果两个提交队列 Action 的执行发生重叠，最后完成的那个有很高风险会失败，因为在第一个 Action 推送之后，本地分支会与远程分支不同步。`issue_comment` 事件也有相同的限制。
2. `pull_request_target` 只有在 Action 存在于拉取请求的基础提交上时才会运行，并且它会运行该提交中存在的 Action 版本，这意味着如果不先对已有 PR 进行 rebase，我们就无法将其用于已经打开的 PR。

工作流首先启动一个小型候选任务，该任务使用 GitHub CLI 获取带有 `commit-queue` 标签的拉取请求。它会先获取队列在接受提前入队请求之前使用的、基于等待时间和快速通道的相同候选范围，然后再获取更广泛的队列并对结果去重。这样可以避免尚未准备好的 PR 挤掉在 GitHub 对查询结果进行分页或限制时、原先查询本会选中的 PR。

如果存在候选 PR，landing 任务会使用个人令牌以及来自 [@nodejs-github-bot](https://github.com/nodejs/github-bot) 的 Jenkins 令牌，一次性安装并配置 `@node-core/utils`。然后，它会在不检出仓库的情况下下载工作流提交中的 README，并针对每个候选项运行 `git node metadata --readme --json`。这使用了与 `git node land` 相同的 `@node-core/utils` PR 就绪检查，但不会克隆、获取或合并 PR。过滤器使用结构化元数据结果及其退出代码，而不是匹配面向用户的输出：

* 退出代码 `0`：PR 已准备就绪，并会传递给
  [`commit-queue.sh`](../../tools/actions/commit-queue.sh)
* 退出代码 `20`-`29`：由于可延后的元数据原因，PR 尚未准备就绪，目前是等待时间原因，因此会保留 `commit-queue` 标签，并在稍后重试
* 退出代码 `40`-`49`：PR 存在严重或混合的元数据就绪失败，并会传递给 [`commit-queue.sh`](../../tools/actions/commit-queue.sh)

`20`-`29` 退出代码范围由 `@node-core/utils` 保留，用于表示可延后的元数据就绪状态；`40`-`49` 则保留用于表示严重的元数据失败状态。未知的过滤器失败会在启动 landing 脚本之前使工作流失败，并保持 PR 标签不变，以便队列在稍后的计划运行中重试。退出代码为 `40`-`49` 的 PR 会继续经过 `commit-queue.sh`。只有在过滤后至少剩余一个 PR 时，工作流才会检出仓库。该脚本仍会在移除队列标签并报告严重失败之前，应用现有的 `request-ci` 和待处理检查延迟规则。

> 个人令牌需要具备访问公共仓库和读取个人资料的权限。它由 `@node-core/utils` 使用，也由 landing 任务用于检出、更新标签和评论、合并以及推送。检查 CI 状态需要 Jenkins 令牌。

`commit-queue.sh` 接收以下位置参数：

1. 仓库所有者
2. 仓库名称
3. 从该位置参数开始的每个位置参数都将是一个设置了 commit-queue 的拉取请求的 ID。

该脚本会遍历这些拉取请求。GitHub CLI 用于检查 PR 是否正在等待 CI 启动（`request-ci` 标签），或是否仍有待处理的 GitHub 检查。如果 CI 处于待处理状态，则跳过该 PR。这里不进行其他 CI 验证，因为如果最后一次 CI 失败，`git node land` 会失败。

该脚本会移除 `commit-queue` 标签，然后运行 `git node land`，并将 stdout 和 stderr 转发到一个文件。如果 PR 仅因等待时间而被阻塞，则应该已经在元数据检查中被过滤掉。如果在元数据过滤与 `git node land` 之间出现严重的就绪失败，landing 任务会向 PR 添加 `commit-queue-failed` 标签，留下包含 `git node land` 输出的评论，然后中止本次 landing 会话。如果中止操作失败，队列会停止，而不是在未知状态下继续运行。

快速通道 PR 会在检出和运行 landing 脚本之前进行元数据检查。如果快速通道请求尚未获得足够的协作者赞成票，队列会保留 `commit-queue` 标签并持续重试，直到快速通道请求获批，或者 PR 根据常规等待时间规则变得可以合并。提交队列不会创建快速通道请求评论；该操作会在添加 `fast-track` 标签时执行。如果缺少该评论，队列会报告失败，而不是继续将 PR 保留在队列中。

如果 `git node land` 期间没有发生错误，脚本会将直接 rebase landing 推送到 `main`，或者对于单提交和 fixup landing 使用 GitHub 的 squash merge API。然后，它会在 PR 中留下 `Landed in ...` 评论。通过 merge API 合并的 PR 会由 GitHub 自动关闭；对于直接推送，脚本会关闭 PR。遍历会持续进行，直到所有 PR 都完成上述步骤。

## 回滚有问题的提交

回滚有问题的提交由协作者手动完成，就像通过 `git node land` 手动落地提交时一样。对于项目来说，提供一种简单的回滚方式是一个很好的功能，但这并不是提交队列正常工作所必需的，因为该 Action 的合并方式与协作者当前的做法相同。如果在开始使用提交队列后，我们发现所需的回滚数量大幅增加，我们可以暂停队列，直到实现 Revert Queue，但在此之前，我们可以先启用提交队列，然后再把 Revert Queue 作为后续工作来推进。
