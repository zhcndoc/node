# Commit queue

_tl;dr：你可以通过向拉取请求添加
`commit-queue` 标签来请求队列合并它们。_

Commit Queue 通过 GitHub
Actions 自动化合并流程，简化了合并操作。拉取请求达到[作者就绪状态][]且当前 CI 检查通过后，协作者可以添加 `commit-queue` 标签，将其加入合并队列。添加标签前不需要再次审批。

队列使用 `@node-core/utils` 检查就绪状态，其中包括从拉取请求创建时开始计算的必要等待时间：

* 至少获得两项审批的拉取请求必须已开放 48 小时。
* 获得一项审批的拉取请求必须已开放七天。
* 正确获得审批的[快速通道拉取请求][]没有最低等待时间。

如果唯一未满足的条件是等待时间，队列会保留 `commit-queue` 标签，并稍后重试。对于已开放至少两天且仍在等待第二项审批的已排队拉取请求，队列还会添加 `lacks-second-approval` 标签。只要其他所有要求仍然满足，再获得一项审批后，拉取请求就可以进入下一次队列运行。队列移除 `commit-queue` 时会自动移除 `lacks-second-approval`；协作者无需手动移除它。

硬性失败会移除 `commit-queue`，添加 `commit-queue-failed`，并发布评论，说明可采取行动的失败原因和重试说明。要解决失败，请移除 `commit-queue-failed`，然后添加 `commit-queue` 以重试。

要让 Commit Queue 将拉取请求的所有提交压缩到第一个提交中，请添加 `commit-queue-squash` 标签。
要让 Commit Queue 合并包含多个提交的拉取请求，请添加 `commit-queue-rebase` 标签。使用此选项时，请确保所有提交都是自包含的，也就是说，每个提交都应通过所有测试。

实现位于 `commit-queue.yml` 和 `commit-queue.sh` 中。

## 当前限制

以下是目前已知的提交队列限制：

1. 拉取请求中的所有提交都必须遵循提交消息规范，或者是有效的 [`fixup!`](https://git-scm.com/docs/git-commit#Documentation/git-commit.txt---fixupamendrewordltcommitgt) 提交，以便 [`--autosquash`](https://git-scm.com/docs/git-rebase#Documentation/git-rebase.txt---autosquash) 选项能够正确处理。
2. 自 PR 上次更改以来，必须运行并通过一次 CI。
3. 自 PR 上次更改以来，必须有一位协作者批准该 PR。
4. 只检查 Jenkins CI 和 GitHub Actions（忽略 V8 CI 和 CITGM）。
5. PR 必须以 `main` 分支为目标（忽略针对其他分支打开的 PR，例如回移植 PR）。

[作者就绪状态]: ./collaborator-guide.md#author-ready-pull-requests
[快速通道拉取请求]: ./collaborator-guide.md#waiting-for-approvals
