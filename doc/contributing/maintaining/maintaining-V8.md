# 在 Node.js 中维护 V8

## 背景

V8 遵循 Chromium 的发布计划。Chromium 的支持周期与 Node.js 的支持周期不同。因此，Node.js 需要比上游更长时间地支持多个版本的 V8。由于缺少受 LTS 支持的分支，Node.js 中的 V8 分支缺乏官方维护流程。

本文试图概述当前的维护流程，提出一种用于维护 Node.js LTS 和当前发布版中的 V8 分支的工作流，并讨论 Google 的 Node.js 和 V8 团队可以如何提供帮助。

## V8 发布计划

V8 和 Chromium 遵循一个
[大约 4 周的发布节奏][ChromiumReleaseCalendar]。在任意时间点，都会有多个处于**活跃**状态的 V8 分支，参见
[V8 发布流程](https://v8.dev/docs/release-process)。所有更旧的分支都已被放弃，不再由 V8 团队维护。

### V8 合并流程概览

将 bug 修复向后移植到活跃分支的流程已在 [V8 wiki][V8MergingPatching] 上正式记录。该流程摘要如下：

* V8 只支持活跃分支。不会对比当前 stable/beta/master 更旧的任何分支进行测试。
* 需要向后移植的修复会被标记为 _merge-request-x.x_。任何希望该修复被向后移植的人都可以添加此标记。带有此标记的问题会被 V8 团队定期审查，作为向后移植的候选项。
* 修复在可批准向后移植之前需要一些“熟化时间”。
  这意味着要等待几天，以确保 canary/beta 构建中没有检测到问题。
* 一旦准备就绪，该问题会被标记为 _merge-approved-x.x_，然后可以使用 [wiki 页面][V8MergingPatching] 上的脚本执行实际合并。
* 向已放弃分支发出的合并请求将被拒绝。
* 只接受 bug 修复的向后移植。

## Node.js 支持需求

在任意时间点，Node.js 都需要维护几个不同的 V8 分支，以对应各个 Current、LTS 和 nightly 发布版。
Node.js 中使用的 V8 版本可能早已被上游 V8 放弃。然而，Node.js 仍然需要在许多个月（Current 分支）或数年（LTS 分支）内继续支持这些分支。

## 维护流程

一旦确认 Node.js 中的某个 bug 是由 V8 引起的，第一步就是识别受影响的 Node.js 和 V8 版本。该 bug 可能存在于多个不同位置，而每个位置遵循的流程略有不同。

* 未修复的 bug。该 bug 存在于 V8 master 分支中。
* 已修复，但需要向后移植。该 bug 可能需要移植到一个或多个分支。
  * 向活跃分支向后移植。
  * 向已放弃分支向后移植。
* 由 V8 团队识别出的向后移植。即上游 V8 已识别、但我们在 Node.js 中尚未遇到的 bug。

### 上游未修复的 bug

如果该 bug 可以在 [Node.js `canary` 分支][]、Chromium canary 或 V8 tip-of-tree 上复现，并且测试用例有效，那么应当先在上游修复该 bug。

* 先使用 [此模板][V8TemplateUpstreamBug] 在上游提交 bug。
* 确保包含指向对应 Node.js issue 的链接
  （如果存在）。
* 如果修复足够简单，你也可以自己修复；
  欢迎 [贡献][V8Contributing]。
* V8 的构建流水线会测试你的更改。
* 一旦 bug 被修复，如果它还存在于其他仍然活跃的 V8 分支中，或者存在于 Node.js 关心的分支中，它仍可能需要向后移植。
  请遵循下面的向后移植流程。

### 向活跃分支向后移植

如果该 bug 存在于任何活跃的 V8 分支中，我们可能需要将修复向后移植。当下，除了 master 之外，还有 [两个活跃分支][V8ActiveBranches]
（beta 和 stable）。向后移植修复需要以下步骤：

* 确定该 bug 最初在哪个 V8 版本中被修复。
* 确定是否有任何活跃的 V8 分支仍然包含该 bug：
* 需要一个跟踪 bug 来请求向后移植。
  * 如果尚不存在跟踪该修复的 V8 bug，请使用此 [Node.js 专用模板][V8TemplateMergeRequest] 新建一个 merge request bug。
  * 如果已经存在一个 bug
    * 添加 GitHub issue 的引用。
    * 为任何仍包含该 bug 的活跃分支给该 bug 添加 _merge-request-x.x_ 标签。
* 一旦合并获得批准，就应使用
  [V8 wiki 中记录的合并脚本][V8MergingPatching] 进行合并。执行合并需要对 V8 仓库的提交权限。如果你没有提交权限，可以请 V8 团队中的某个人帮你完成合并。
* 合并请求有可能不会被批准，例如它被视为一个特性，或者对 V8 stable 来说风险过高。
  在这种情况下，我们会在 Node.js 侧临时保留该补丁。请参见“向已放弃分支向后移植”的流程。
* 一旦修复已在上游合并，就可以在更新 V8 分支时获取到它（见下文）。

### 向已放弃分支向后移植

已放弃的 V8 分支在 Node.js 仓库中仍受支持。修复需要在 Node.js 仓库中 cherry-pick，并且 V8-CI 必须测试该更改。

作为如何向后移植更改的示例，考虑这个 bug
[RegExp show inconsistent result with other browsers](https://crbug.com/v8/5199)。
从该 bug 可以看出，它已被 V8 合并到 5.2 和 5.3 中，但没有合并到
V8 5.1（因为它当时已经被放弃）。由于 Node.js `v6.x` 使用的是 V8 5.1，因此该修复需要被向后移植。

#### 使用 `git-node` 向后移植（推荐）

你可以使用 [`git-node`][] 来帮助你向后移植补丁。这会移除一些手工步骤，因此推荐使用。

以下是上面提到的 bug 的步骤：

1. 通过安装 [`@node-core/utils`][] 来安装 `git-node`。
2. 安装 [`git-node-v8`][] 的前置依赖。
3. 找到 issue 中链接的提交哈希（在本例中是 a51f429）。
4. 基于合适的 _vY.x-staging_ 分支检出一个分支（例如：
   基于 _v6.x-staging_ 来修复 V8 5.1 中的问题）。
5. 运行 `git node v8 backport a51f429`。
6. 如果存在冲突，`git-node` 会等待你解决它们：

```console
$ git node v8 backport a51f429
✔ 更新本地 V8 克隆
❯ V8 提交向后移植
  ✔ 获取当前 V8 版本
  ✔ 生成补丁
  ❯ 将补丁应用并提交到 deps/v8
    ❯ 提交 a51f429772d1
      ⠏ 应用补丁
      ◼ 增加 embedder 版本号
      ◼ 提交补丁

? 解决合并冲突并输入 'RESOLVED' ‣
```

解决冲突，暂存这些文件（你可能需要打开另一个终端或使用
图形化 git 客户端），然后回到运行 `git-node` 的终端，输入 `RESOLVED`，并按 <kbd>Enter</kbd>。

7. 在你解决冲突之后（或者如果没有冲突），输出应如下所示：

```console
$ git node v8 backport a51f429
✔ 更新本地 V8 克隆
✔ V8 提交向后移植
```

8. 在 Node.js 仓库中向 v6.x-staging 分支发起 PR。
   使用 Node.js CI 系统启动常规 CI 和 [V8 CI][]。我们只需要向后移植到 v6.x，因为其他 LTS 分支并未受此 bug 影响。

更多文档和额外选项请参见 [`git-node-v8-backport`][]。

#### 手动向后移植

* 对于受该 bug 影响的每个对应 LTS 分支的已放弃 V8 分支：
  * 基于合适的 _vY.x-staging_ 分支检出一个分支（例如：
    基于 _v6.x-staging_ 来修复 V8 5.1 中的问题）。
  * 从 V8 仓库中 cherry-pick 这些提交。
  * 增加 `common.gypi` 中的 `v8_embedder_string` 数值。
  * 在某些情况下，由于 V8 已发生较大变化，补丁可能需要额外的努力才能合并。对于重要问题，我们也许可以依靠 V8 团队帮助重新实现该补丁。
  * 在 `nodejs/node` 上创建一个 cherry-pick pull request，目标为
    _vY.x-staging_ 分支，并通知 `@nodejs/v8` 团队。
  * 除了 [Node.js CI][] 之外，还要运行 Node.js 的 [V8 CI][]。
    该 CI 使用 `Makefile` 中的 `test-v8` 目标，该目标使用
    `tools/make-v8.sh` 在 `deps/v8` 目录中重建 git tree，以运行 V8 测试。[^1]

以下是上面提到的 bug 的步骤：

* 下载并应用 issue 中链接的提交（本例中是 a51f429）：

  ```bash
  curl -L https://github.com/v8/v8/commit/a51f429.patch | git am -3 --directory=deps/v8
  ```

  如果各分支已经严重分叉，这可能无法干净地应用。尝试将合并 cherry-pick 到上游 V8 中完成合并的最旧分支，可能会有所帮助。在本例中，这将是合并到 5.2 的补丁。这样做的希望是它会更接近 V8 5.1，并且更有可能干净地应用。
* 修改提交信息，使其符合我们用于 V8 向后移植的格式，并将作者替换为你自己。`git commit --amend --reset-author`。如有必要，你可以补充额外描述，以说明该修复对 Node.js 的影响。在本例中，原始 issue 的描述已经足够。示例：

```console
deps: 从 V8 上游 cherry-pick a51f429

原始提交信息：
  [regexp] 修复单字节 subject 的不区分大小写匹配。

  该 bug 出现的原因是，在添加大小写等价项之前，我们没有对字符类范围进行规范化。
  在添加大小写等价项时，我们会针对单字节 subject 字符串过早中止，假设这些范围是排序好的。
  但实际上它们并不是。

  R=marja@chromium.org
  BUG=v8:5199

  Review-Url: https://codereview.chromium.org/2159683002
  Cr-Commit-Position: refs/heads/master@{#37833}

Refs: https://github.com/v8/v8/commit/a51f429772d1e796744244128c9feeab4c26a854
PR-URL: https://github.com/nodejs/node/pull/7833
```

* 增加 `common.gypi` 中的 `v8_embedder_string` 数值。
* 在 Node.js 仓库中向 `v6.x-staging` 分支发起 PR。使用 Node.js CI 系统启动常规 CI 和 [V8 CI][]。我们只需要向后移植到 `v6.x`，因为其他 LTS 分支并未受此 bug 影响。

### 由 V8 团队识别出的向后移植

对于通过浏览器或其他渠道发现的 bug，V8 团队会标记那些可能适用于 Node.js 正在使用的已放弃分支的 bug。这是通过 V8 团队的手动标记以及一个自动化流程完成的；该自动化流程会对任何已被向后移植到 stable 分支的修复进行标记（因为它很可能也是进一步向后移植的候选项）。

此类修复会在 V8 issue 跟踪器中被打上以下标签：

* `NodeJS-Backport-Review` ([V8][NodeJS-Backport-Review-V8],
  [Chromium][NodeJS-Backport-Review-Chromium]): 需要审查其是否适用于 Node.js 正在使用的已放弃分支。该列表会由 Google 的 Node.js 团队定期审查，以判断其是否适用于 Node.js。
* `NodeJS-Backport-Approved` ([V8][NodeJS-Backport-Approved-V8],
  [Chromium][NodeJS-Backport-Approved-Chromium]): 标记被认为与 Node.js 相关、并且应当向后移植的 bug。
* `NodeJS-Backport-Done` ([V8][NodeJS-Backport-Done-V8],
  [Chromium][NodeJS-Backport-Done-Chromium]): 表示 Node.js 的向后移植已经完成。
* `NodeJS-Backport-Rejected` ([V8][NodeJS-Backport-Rejected-V8],
  [Chromium][NodeJS-Backport-Rejected-Chromium]): 表示不希望为 Node.js 进行向后移植。

Google 的 node-team 会定期审查这些问题的积压，以推动向后移植流程。也欢迎外部贡献者参与向后移植流程的协作。其中一些 bug 可能是安全问题，对外部协作者不可见。

## 更新 V8

Node.js 在 deps/ 目录中维护了一份捆绑的 V8 副本。此外，Node.js 可能还需要浮动一些上游不存在的补丁。这意味着，在更新这份捆绑的 V8 副本时，可能需要格外小心。

V8 是基于 Node.js 提供的 ICU 版本构建的，
请参见 [maintaining-icu.md](./maintaining-icu.md) 了解特殊注意事项。
具体来说，V8 的更新可能需要同时更新 ICU。

### 小版本更新（补丁级别）

由于 Node.js 中的 V8 版本可能存在浮动补丁，最稳妥的方式是将补丁级别更新作为一个补丁来应用。比如，假设上游 V8 的版本是 5.0.71.47，而 Node.js 的版本是 5.0.71.32。最佳做法是计算 V8 仓库中这两个标签之间的 diff，然后将该补丁应用到 Node.js 中的 V8 副本上。这样可以保留 Node.js 可能正在浮动的补丁/回迁（否则可能会产生合并冲突）。

#### 使用 `git-node` 应用小版本更新（推荐）

1. 通过安装 [`@node-core/utils`][] 来安装 [`git-node`][]。
2. 安装 [`git-node-v8`][] 所需的前置条件。
3. 运行 `git node v8 minor` 来应用小版本更新。

更多文档和额外选项请参见 [`git-node-v8-minor`][]。

#### 手动应用小版本更新

大致流程如下：

```bash
# 假设你的 Node.js fork 已经在 $NODE_DIR 中检出
# 并且你想更新 Node.js 的 main 分支。
# 在
# $NODE_DIR/deps/v8/include/v8-version.h 中找到当前（旧）版本
cd $NODE_DIR
git checkout main
git merge --ff-only origin/main
git checkout -b V8_NEW_VERSION
curl -L https://github.com/v8/v8/compare/${V8_OLD_VERSION}...${V8_NEW_VERSION}.patch | git apply --directory=deps/v8
# 你可能希望修改提交信息，以描述此次更新的性质
```

V8 还维护着形如 _5.4-lkgr_ 的标签，它们指向 5.4 分支中的 _Last Known Good Revision_（已知最后可用修订版），这在上述更新流程中可能会很有用。

### 大版本更新

我们会在 V8 发布进入上游稳定版时，将 Node.js `main` 中的 V8 版本升级；也就是说，每当 Chrome 发布新版本时就会升级。

使用上面的补丁机制来升级大版本会困难得多。更好的策略是：

1. 审核当前的 `main` 分支，查看自上次 V8 大版本更新以来已经浮动的补丁。
2. 将 Node.js 中的 V8 副本替换为最新稳定 V8 分支的新检出版本。必须特别注意递归更新 V8 在编译时依赖的 DEPS（截至本文撰写时，这些仅包括 trace\_event 和 gtest\_prod.h）
3. 将 `common.gypi` 中的 `v8_embedder_string` 变量重置为 "-node.0"。
4. 按需重新浮动（cherry-pick）在 1) 中计算出的列表中的所有补丁。部分补丁可能已经不再需要。

要审计浮动补丁：

```bash
git log --oneline deps/v8
```

要替换 Node.js 中的 V8 副本，请使用 [`git-node`][] 工具。例如，如果你想用 V8 5.1 分支的 branch-head 替换 Node.js 中的 V8 副本：

```bash
cd $NODE_DIR
git node v8 major --branch=5.1-lkgr
```

之后应手动重新浮动所有相关补丁。

## 提案：使用 fork 仓库跟踪上游 V8

Node.js 在 deps/ 中维护一份捆绑的、可能经过修改的 V8 副本，这一事实使上述流程变得有些复杂。一个替代提案是在 `nodejs/v8` 中创建一个 V8 的 fork，用于维护 V8 各分支。这有几个好处：

* 更新 Node.js 中 V8 版本的流程可以自动化，以跟踪 `nodejs/v8` 中各个 V8 分支的最新状态。
* 由于 `v8-version.h` 中的版本号提升会作为此次更新的一部分发生，而不是在每次变更时都发生，因此 cherry-pick 和修复移植会更简单。
* 这会简化 V8-CI，并使其更容易自动化。
* `nodejs/v8` 中 V8 分支的历史会更纯净，也会让拉入 V8 团队参与审阅变得更容易。
* 这会让搭建一个跟踪 Node.js `main` + V8 lkgr 集成构建的自动化构建更简单。

这将需要一些工具来支持：

* 一个脚本，用于使用上游的 V8 更新特定 Node.js 分支中的 V8（取决于该分支是已废弃还是活跃）。
* 当一个新版本的 V8 从 `nodejs/v8` 提升到 `nodejs/node` 时，我们需要一个脚本来提升 V8 版本号。
* 在 Jenkins 中启用 V8-CI 构建，使其从 `nodejs/v8` fork 构建。

[^1]: 在 macOS 上，V8 测试需要完整安装 Xcode，而不只是 Xcode 的“命令行工具”。

[ChromiumReleaseCalendar]: https://www.chromium.org/developers/calendar
[Node.js CI]: https://ci.nodejs.org/job/node-test-pull-request/
[Node.js `canary` branch]: https://github.com/nodejs/node-v8/tree/canary
[NodeJS-Backport-Approved-Chromium]: https://bugs.chromium.org/p/chromium/issues/list?can=1&q=label%3ANodeJS-Backport-Approved
[NodeJS-Backport-Approved-V8]: https://bugs.chromium.org/p/v8/issues/list?can=1&q=label%3ANodeJS-Backport-Approved
[NodeJS-Backport-Done-Chromium]: https://bugs.chromium.org/p/chromium/issues/list?can=1&q=label%3ANodeJS-Backport-Done
[NodeJS-Backport-Done-V8]: https://bugs.chromium.org/p/v8/issues/list?can=1&q=label%3ANodeJS-Backport-Done
[NodeJS-Backport-Rejected-Chromium]: https://bugs.chromium.org/p/chromium/issues/list?can=1&q=label%3ANodeJS-Backport-Rejected
[NodeJS-Backport-Rejected-V8]: https://bugs.chromium.org/p/v8/issues/list?can=1&q=label%3ANodeJS-Backport-Rejected
[NodeJS-Backport-Review-Chromium]: https://bugs.chromium.org/p/chromium/issues/list?can=1&q=label%3ANodeJS-Backport-Review
[NodeJS-Backport-Review-V8]: https://bugs.chromium.org/p/v8/issues/list?can=1&q=label%3ANodeJS-Backport-Review
[V8 CI]: https://ci.nodejs.org/job/node-test-commit-v8-linux/
[V8ActiveBranches]: https://build.chromium.org/p/client.v8.branches/console
[V8Contributing]: https://v8.dev/docs/contribute
[V8MergingPatching]: https://v8.dev/docs/merge-patch
[V8TemplateMergeRequest]: https://bugs.chromium.org/p/v8/issues/entry?template=Node.js%20merge%20request
[V8TemplateUpstreamBug]: https://bugs.chromium.org/p/v8/issues/entry?template=Node.js%20upstream%20bug
[`@node-core/utils`]: https://github.com/nodejs/node-core-utils#Install
[`git-node-v8-backport`]: https://github.com/nodejs/node-core-utils/blob/main/docs/git-node.md#git-node-v8-backport-sha
[`git-node-v8-minor`]: https://github.com/nodejs/node-core-utils/blob/main/docs/git-node.md#git-node-v8-minor
[`git-node-v8`]: https://github.com/nodejs/node-core-utils/blob/HEAD/docs/git-node.md#git-node-v8
[`git-node`]: https://github.com/nodejs/node-core-utils/blob/HEAD/docs/git-node.md#git-node-v8
