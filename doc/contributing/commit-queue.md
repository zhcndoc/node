# 提交队列

_tl;dr：你可以通过为拉取请求添加 `commit-queue` 标签来合并它。_

提交队列是项目的一个功能，通过借助 GitHub Actions 自动化合并流程来简化落地过程。借助它，协作者可以通过给 PR 添加 `commit-queue` 标签来合并拉取请求。所有检查都会通过 `@node-core/utils` 运行，如果拉取请求已准备好合并，Action 会将其 rebase 并推送到 `main`。

本文档概述了提交队列的工作方式，以及实现细节、设计选择的原因和当前限制。

## 概览

从高层来看，提交队列的工作流程如下：

1. 协作者会为准备合并的拉取请求添加 `commit-queue` 标签
2. 每五分钟，队列会对每个可合并且带有该标签的拉取请求执行以下操作：
   1. 检查该 PR 是否也有 `request-ci` 标签（如果有，则跳过该 PR，因为它正在等待 CI 运行）
   2. 检查最近一次 Jenkins CI 是否已完成运行（如果没有，则跳过该 PR）
   3. 移除 `commit-queue` 标签
   4. 运行 `git node land <pr> --oneCommitMax`
   5. 如果失败：
      1. 终止 `git node land` 会话
      2. 为 PR 添加 `commit-queue-failed` 标签
      3. 在 PR 上留下包含 `git node land` 输出的评论
      4. 跳过后续步骤，进入队列中的下一个 PR
   6. 如果成功：
      1. 将更改推送到 nodejs/node
      2. 在 PR 上留下 `Landed in ...` 评论
      3. 关闭 PR
      4. 进入队列中的下一个 PR

要让提交队列将拉取请求的所有提交压缩到第一个提交中，请添加 `commit-queue-squash` 标签。
要让提交队列合并包含多个提交的拉取请求，请添加 `commit-queue-rebase` 标签。使用此选项时，请确保所有提交都是自包含的，也就是说，每个提交都应通过所有测试。

## 当前限制

提交队列功能仍处于早期阶段，因此它可能不适用于更复杂的拉取请求。以下是当前已知的提交队列限制：

1. 拉取请求中的所有提交要么必须遵循提交信息规范，要么必须是一个有效的 [`fixup!`](https://git-scm.com/docs/git-commit#Documentation/git-commit.txt---fixupamendrewordltcommitgt)
   提交，并且能够被 [`--autosquash`](https://git-scm.com/docs/git-rebase#Documentation/git-rebase.txt---autosquash)
   选项正确处理
2. 自 PR 最近一次变更之后，必须已经运行过一次 CI 且成功
3. 自 PR 最近一次变更之后，必须有协作者批准该 PR
4. 仅检查 Jenkins CI 和 GitHub Actions（忽略 V8 CI 和 CITGM）
5. PR 必须以 `main` 分支为目标（针对其他分支打开的 PR，例如回移 PR，会被忽略）

## 实现

[Action](../../.github/workflows/commit-queue.yml) 将在计划任务事件上每五分钟运行一次。五分钟是调度器接受的最小值。调度器并不保证每五分钟都会运行一次，两次运行之间可能会更久。

相比使用 pull\_request\_target，使用调度器更可取，原因有两个：

1. 如果两个提交队列 Action 的执行发生重叠，最后完成的那个有很高风险会失败，因为在第一个 Action 推送之后，本地分支会与远程分支不同步。`issue_comment` 事件也有相同的限制。
2. `pull_request_target` 只有在 Action 存在于拉取请求的基础提交上时才会运行，并且它会运行该提交中存在的 Action 版本，这意味着如果不先对已有 PR 进行 rebase，我们就无法将其用于已经打开的 PR。

`@node-core/utils` 配置了一个个人令牌和一个来自
[@nodejs-github-bot](https://github.com/nodejs/github-bot) 的 Jenkins 令牌。
`octokit/graphql-action` 用于获取所有带有 `commit-queue` 标签的拉取请求。输出是一个 JSON 负载，因此使用 `jq` 将其转换为可作为参数传递给
[`commit-queue.sh`](../../tools/actions/commit-queue.sh) 的 PR id 列表。

> 个人令牌只需要公共仓库权限以及读取个人资料的权限，我们可以使用 GITHUB\_TOKEN 执行写操作。Jenkins 令牌用于检查 CI 状态。

`commit-queue.sh` 接收以下位置参数：

1. 仓库所有者
2. 仓库名称
3. Action 的 GITHUB\_TOKEN
4. 从这里开始的每个位置参数都将是一个带有 commit-queue 标签的拉取请求 ID。

脚本会遍历这些拉取请求。`ncu-ci` 用于检查最近一次 CI 是否仍在等待中，并使用 GitHub API 调用来检查 PR 是否正在等待 CI 开始（`request-ci` 标签）。如果 CI 仍在等待，则跳过该 PR。这里不会进行其他 CI 验证，因为如果最近一次 CI 失败，`git node land` 会失败。

脚本会移除 `commit-queue` 标签。然后运行 `git node land`，将 stdout 和 stderr 重定向到文件。如果发生任何错误，就会运行 `git node land --abort`，然后向 PR 添加 `commit-queue-failed` 标签，并附上一条包含 `git node land` 输出的评论。

如果在 `git node land` 期间没有发生错误，脚本将使用 `GITHUB_TOKEN` 将更改推送到 `main`，然后在 PR 中留下一个 `Landed in ...` 评论，随后关闭该 PR。这个迭代过程会持续进行，直到所有 PR 都完成上述步骤。

## 回滚有问题的提交

回滚有问题的提交由协作者手动完成，就像通过 `git node land` 手动落地提交时一样。对于项目来说，提供一种简单的回滚方式是一个很好的功能，但这并不是提交队列正常工作所必需的，因为该 Action 的合并方式与协作者当前的做法相同。如果在开始使用提交队列后，我们发现所需的回滚数量大幅增加，我们可以暂停队列，直到实现 Revert Queue，但在此之前，我们可以先启用提交队列，然后再把 Revert Queue 作为后续工作来推进。
