# 如何将拉取请求回溯到发布分支

## 暂存分支

每个发布分支都有一个暂存分支，用于准备发布。
分支格式为 `vN.x-staging`，其中 `N` 是主版本号。

对于活跃的暂存分支，请参考 [发布计划][]。

## 识别需要回溯的更改

如果从 `main` 分支的变基（cherry-pick）在暂存分支上无法干净应用，
该拉取请求将被标记为适用于该发布分支（例如 `backport-requested-vN.x`）。
这表示需要手动执行回溯操作。

## 回溯标准

"当前"（Current）发布分支比 LTS 分支更灵活。
LTS 分支在 [发布计划][] 中有详细说明，要求提交的代码在当前（Current）发布分支中成熟至少两周后才能回溯。

## 标记回溯问题和拉取请求

使用以下标签，其中 `N` 在 `vN.x` 中表示主版本号：

| 标签 | 描述 |
| --- | --- |
| backport-blocked-vN.x | 针对 `vN.x-staging` 的 PR 被其他 PR 的待处理回溯所阻塞。 |
| backport-open-vN.x | 表示该 PR 有一个打开的回溯。 |
| backport-requested-vN.x | 等待手动回溯到 `vN.x-staging` 的 PR。 |
| backported-to-vN.x | 已成功回溯到 `vN.x-staging` 的 PR。 |
| baking-for-lts | 等待在当前发布分支成熟后进入 LTS 发布的 PR。 |
| lts-watch-vN.x | 可能被包含在 `vN.x` LTS 发布中的 PR。 |
| vN.x | 影响 `vN.x-staging` 的问题或 PR（或可在 vN.x 上重现）。 |

## 提交回溯拉取请求

对于以下步骤，假设你需要将 PR `123`
回溯到 vN.x 发布分支。所有命令都将使用 `vN.x-staging` 分支作为目标分支。
要向其他发布分支提交回溯拉取请求，只需将 `N` 替换为目标发布分支的版本号。

### 自动化流程

1. 确保已安装 [`@node-core/utils`][]。

2. 执行 [`git node backport`][] 命令：

   ```bash
   # 示例：将 PR 123 回溯到 vN.x-staging
   git node backport 123 --to=N
   ```

3. 继续执行下方手动流程的第 5 步。

### 手动流程

1. 切换到 `vN.x-staging` 分支。

2. 验证本地暂存分支是否与远程同步。

3. 基于 `vN.x-staging` 创建新分支：

   ```bash
   git fetch upstream vN.x-staging:vN.x-staging -f
   git checkout -b backport-123-to-vN.x vN.x-staging
   ```

4. 变基所需提交：

   ```bash
   git cherry-pick <commit hash>
   ```

5. 使用 `git add` 和 `git cherry-pick --continue` 解决冲突。

6. 保持提交消息不变。如果认为需要修改，请在拉取请求中留言。
   不要手动添加 `Backport-PR-URL` 元数据条目。
   此条目会在之后自动添加。

7. 验证 `make -j4 test` 是否通过。

8. 将更改推送到你的 Fork。

9. 打开拉取请求：

   * 目标分支为 `vN.x-staging`。
   * 标题格式：`[vN.x backport] <commit 标题>`（例如 `[v20.x backport] process: improve performance of nextTick`）。
   * 在描述中引用原始 PR。

10. 将原始拉取请求上的 `backport-requested-vN.x` 标签更新为 `backport-open-vN.x`。

11. 如果在审查过程中出现冲突，可使用以下命令变基：

    ```bash
    git pull --rebase upstream vN.x-staging
    ```

合并后，将原始拉取请求上的标签从 `backport-open-vN.x` 更新为 `backported-to-vN.x`。

[发布计划]: https://github.com/nodejs/Release#release-plan
[发布日程]: https://github.com/nodejs/Release#release-schedule
[`@node-core/utils`]: https://github.com/nodejs/node-core-utils
[`git node backport`]: https://github.com/nodejs/node-core-utils/blob/main/docs/git-node.md#git-node-backport
