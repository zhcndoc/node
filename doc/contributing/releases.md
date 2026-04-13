# Node.js 发布流程

本文档描述了 Node.js 发布流程的技术细节。
本文档的受众是那些已被 Node.js 技术指导委员会 (TSC) 授权在 <https://nodejs.org/> 上托管官方 Node.js 发布构建的人员，他们负责创建、推广和签名这些构建。

## 目录

* [谁可以发布？](#谁可以发布)
  * [1. Jenkins 发布访问权限](#1-jenkins-发布访问权限)
  * [2. \<nodejs.org> 访问权限](#2-nodejsorg-访问权限)
  * [3. 公开列出的 GPG 密钥](#3-公开列出的-gpg-密钥)
* [如何创建发布](#如何创建发布)
  * [0. 发布前步骤](#0-发布前步骤)
  * [1. 更新暂存分支](#1-更新暂存分支)
  * [2. 为发布创建新分支](#2-为发布创建新分支)
  * [3. 更新 `src/node_version.h`](#3-更新-srcnode_versionh)
  * [4. 更新变更日志](#4-更新变更日志)
  * [5. 创建发布提交](#5-创建发布提交)
  * [6. 在 GitHub 上提议发布](#6-在-github-上提议发布)
  * [7. 确保发布分支稳定](#7-确保发布分支稳定)
    * [7.1 更新发布 _(可选)_](#71-更新发布-可选)
  * [8. 生成 nightly 构建 _(可选)_](#8-生成-nightly-构建-可选)
  * [9. 生成发布构建](#9-生成发布构建)
  * [10. 测试构建](#10-测试构建)
  * [11. 标记和签名发布提交](#11-标记和签名发布提交)
  * [12. 为下一次发布做准备](#12-为下一次发布做准备)
  * [13. 将发布提交 cherry-pick 到 `main`](#13-将发布提交-cherry-pick-到-main)
  * [14. 推送发布标签](#14-推送发布标签)
  * [15. 推广和签名发布构建](#15-推广和签名发布构建)
  * [16. 检查发布](#16-检查发布)
  * [17. 在 GitHub 上创建发布](#17-在-github-上创建发布)
  * [18. 创建博客文章](#18-创建博客文章)
  * [19. 公告](#19-公告)
  * [20. 庆祝](#20-庆祝)
* [LTS 发布](#lts-发布)
* [主版本发布](#主版本发布)

## 谁可以发布？

发布授权由 Node.js TSC 授予。获得授权后，个人必须具备以下条件：

### 1. Jenkins 发布访问权限

在发布流程中有三个相关的 Jenkins 作业需要使用：

**a.** **测试运行：**
**[node-test-pull-request](https://ci.nodejs.org/job/node-test-pull-request/)** 用于进行最终的全面测试运行，以确保当前的 _HEAD_ 稳定。

**b.** **Nightly 构建：** (可选)
**[iojs+release](https://ci-release.nodejs.org/job/iojs+release/)** 可用于为当前的 _HEAD_ 创建 nightly 发布，如果需要公开测试发布。通过此作业触发的构建将直接发布到 <https://nodejs.org/download/nightly/>，并可供公众下载。

**c.** **发布构建：**
**[iojs+release](https://ci-release.nodejs.org/job/iojs+release/)** 将完成构建所有必需发布资产的所有工作。一旦准备就绪，发布文件的推广是一个手动步骤（见下文）。

[Node.js 构建团队](https://github.com/nodejs/build) 能够向 TSC 授权的个人提供此访问权限。

### 2. \<nodejs.org> 访问权限

nodejs.org 上的 _dist_ 用户控制 <https://nodejs.org/download/> 中可用的资产。<https://nodejs.org/dist/> 是 <https://nodejs.org/download/release/> 的别名。

Jenkins 发布构建工作程序以 _staging_ 用户身份将它们的工件上传到 Web 服务器。_dist_ 用户可以访问将这些资产移至公开访问，而 _staging_ 用户则不能。

Nightly 构建由 _dist_ 用户的 cron 任务在服务器上自动推广。

发布构建需要具有作为 _dist_ 用户访问该服务器的 SSH 权限的个人手动推广。[Node.js 构建团队](https://github.com/nodejs/build) 能够向 TSC 授权的个人提供此访问权限。

### 3. 公开列出的 GPG 密钥

每个推广的构建、nightly 和发布都会生成一个 `SHASUMS256.txt` 文件。此外，对于发布，此文件将由负责该发布的个人签名。为了能够验证下载的二进制文件，公众应该能够检查 `SHASUMS256.txt` 文件是否已由被授权创建发布的人签名。

公钥应可从已知的第三方密钥服务器获取。推荐使用 <https://keys.openpgp.org/> 上的 OpenPGP 密钥服务器。使用 [提交](https://keys.openpgp.org/upload) 表单提交新公钥，并确保验证关联的电子邮件。您首先需要导出密钥的 ASCII 编码版本：

```bash
gpg --armor --export email@server.com > ~/nodekey.asc
```

可以通过以下方式获取密钥：

```bash
gpg --keyserver hkps://keys.openpgp.org --recv-keys <FINGERPRINT>
```

您使用的密钥可能是现有密钥的子密钥。

此外，已授权发布的人员的完整 GPG 密钥指纹应列在 Node.js GitHub README.md 文件中。

> 建议在 Node.js 仓库下签名所有提交。
> 在 `node` 文件夹内运行：`git config commit.gpgsign true`。

## 如何创建发布

说明：

* 下面列出的日期 _"YYYY-MM-DD"_ 应为发布日期 **UTC 时间**。使用 `date -u +'%Y-%m-%d'` 来确定。
* 版本字符串下面列出为 _"vx.y.z"_ 或 _"x.y.z"_。替换为发布版本。
* 示例将使用虚构的发布版本 `1.2.3`。
* 准备安全发布时，请遵循详细信息部分中的安全步骤。

### 0. 发布前步骤

在准备 Node.js 发布之前，必须至少提前一个工作日通知构建工作组预计的发布日期。与构建团队协调至关重要，以确保 CI 工作正常、发布文件已发布，并且发布博客文章可在项目网站上找到。

最好通过在 [构建问题跟踪器][] 上打开一个问题来联系构建团队。

准备安全发布时，请至少提前两个工作日联系构建团队。为确保安全补丁能够得到妥善测试，请在 [CI 锁定程序][] 开始前一两天，在 `nodejs-private/node-private` 仓库的 `main` 分支上运行 `node-test-pull-request` 作业。这是为了确认 Jenkins 是否能够正确访问私有仓库。

### 1. 更新暂存分支

在本地检出暂存分支。

```bash
git remote update
git checkout v1.x-staging
git reset --hard upstream/v1.x-staging
```

如果暂存分支相对于 `main` 未更新，请将其中的相关 PR 和提交引入。

遍历带有 `vN.x` 标签的 PR。例如 [带有 `v8.x` 标签的 PR](https://github.com/nodejs/node/pulls?q=is%3Apr+is%3Aopen+sort%3Aupdated-desc+label%3Av8.x) 和 `baking-for-lts` 标签（如果正在准备 LTS 系列的发布）。

对于每个 PR：

* 运行或检查 CI 是否通过。
* 检查批准（您可以自己批准）。
* 检查提交元数据是否未从 `main` 提交更改。
* 如果存在合并冲突，请要求 PR 作者进行 rebase。
  简单的冲突可以在合并时解决。
* 如果存在 `baking-for-lts`，请检查 PR 是否已准备好合并。
  如果已准备好，请删除 `baking-for-lts` 标签。

合并 PR 时，请在每个提交中添加 `Backport-PR-URL:` 行。使用 `Landed in ...` 关闭反向移植 PR。将原始 PR 上的标签从 `backport-requested-vN.x` 更新为 `backported-to-vN.x`。

您可以使用 `--backport` 和 `git node land` 来添加 `Backport-PR-URL` 元数据

```bash
git node land --backport $PR-NUMBER
```

要确定相关的提交，请使用
[`branch-diff`](https://github.com/nodejs/branch-diff)。该工具可在 npm 上找到，应全局安装或使用 `npx` 运行。它依赖于我们的提交元数据，以及诸如 `semver-minor` 和 `semver-major` 之类的 GitHub 标签。一个缺点是，当 `PR-URL` 元数据意外地从提交中省略时，该提交将显示出来，因为它不确定是否是重复项。

要获取可以在 v1.x 上的次要版本发布中合并的提交列表：

```bash
N=1 sh -c 'branch-diff v$N.x-staging upstream/main --exclude-label=semver-major,dont-land-on-v$N.x,backport-requested-v$N.x,backport-blocked-v$N.x,backport-open-v$N.x,backported-to-v$N.x --filter-release --format=simple'
```

如果目标分支是 LTS 系列，您还应排除 `baking-for-lts`：

```bash
N=1 sh -c 'branch-diff v$N.x-staging upstream/main --exclude-label=semver-major,dont-land-on-v$N.x,backport-requested-v$N.x,backport-blocked-v$N.x,backport-open-v$N.x,backported-to-v$N.x,baking-for-lts --filter-release --format=simple'
```

先前已发布的提交和版本号不需要 cherry-pick。

仔细审查提交列表：

* 检查错误（不正确的 `PR-URL`）
* 检查 semver 状态 - 带有 `semver-minor` 或 `semver-major` 标签的提交仅应在适合所制作发布类型时 cherry-pick。
* 如果您认为风险较高且更改应等待一段时间，请添加 `baking-for-lts` 标签。

当您准备好 cherry-pick 提交时，可以使用以下命令进行自动化。

```bash
N=1 sh -c 'branch-diff v$N.x-staging upstream/main --exclude-label=semver-major,dont-land-on-v$N.x,backport-requested-v$N.x,backport-blocked-v$N.x,backport-open-v$N.x,backported-to-v$N.x --filter-release --format=sha --reverse' | xargs git cherry-pick -S
```

如果目标分支是 LTS 系列，您还应排除 `baking-for-lts`：

```bash
N=1 sh -c 'branch-diff v$N.x-staging upstream/main --exclude-label=semver-major,dont-land-on-v$N.x,backport-requested-v$N.x,backport-blocked-v$N.x,backport-open-v$N.x,backported-to-v$N.x,baking-for-lts --filter-release --format=sha --reverse' | xargs git cherry-pick -S
```

<sup>对于补丁发布，请确保将 `semver-minor` 标签添加到 `exclude-label` 中</sup>

在 cherry-pick 提交时，如果存在简单的冲突，您可以解决它们。否则，请在原始 PR 中添加 `backport-requested-vN.x` 标签，并发布一条评论说明它无法干净地合并，需要一个反向移植 PR。您可以将 PR 的所有者指向 "[反向移植到发布分支](https://github.com/nodejs/node/blob/HEAD/doc/contributing/backporting-to-release-lines.md)" 指南。

如果在此步骤中 cherry-pick 了提交，请检查测试是否仍然通过。

```bash
make test
```

然后，推送到暂存分支以保持其最新。

```bash
git push upstream v1.x-staging
```

<details>
<summary>安全发布</summary>

带有私有补丁的安全发布需要在 `nodejs-private` GitHub 组织中准备。

添加 `nodejs-private` 远程：

```bash
git remote add private git@github.com:nodejs-private/node-private.git
```

对于安全发布，我们通常只包含安全补丁。
由于 `vN.x-staging` 分支上可能已存在提交，因此最好检出 `vN.x` 分支并在提案分支中直接构建发布。

```console
$ git checkout vN.x
$ git reset --hard upstream/vN.x
```

要包含的补丁列表应在 `nodejs-private` 的“下一个安全发布”问题中列出。如果不确定，请咨询安全发布负责人。

`git node land` 工具不适用于 `nodejs-private` 组织。要在 Node.js 私有仓库中合并 PR，请使用 `git cherry-pick` 来应用每个提交。您还需要通过修改提交消息来手动应用 PR 元数据（`PR-URL`、`Reviewed-by` 等）。如果已知，请另外在提交元数据中包含 `CVE-ID: CVE-XXXX-XXXXX`。

**注意**：在 CI 锁定之前，请勿在 `nodejs-private` 中的 PR 上运行任何 CI。
您可以在不运行完整 CI 的情况下将 PR 集成到提案中。

</details>

### 2. 为发布创建新分支

> \[!TIP] 一旦暂存分支更新，您就可以使用
> [`create-release-proposal`][] 操作来生成提案。

```bash
gh workflow run "Create Release Proposal" -f release-line=N -f release-date=YYYY-MM-DD
```

如果您更喜欢在本地运行，可以运行
`git node release --prepare`：

```bash
git node release -S --prepare x.y.z
```

来自动化直到步骤 6 的其余步骤，或者您可以按照以下步骤手动执行。

***

创建一个名为 `vx.y.z-proposal` 的新分支，基于相应的暂存分支。

```bash
git checkout -b v1.2.3-proposal upstream/v1.x-staging
```

您也可以运行：

```bash
git node release -S --prepare --security=../vulnerabilities.json --filterLabel vX.x
```

示例：

```bash
git checkout v20.x
git node release -S --prepare --security=../vulnerabilities.json --filterLabel v20.x
```

来自动化直到步骤 6 的其余步骤，或者您可以按照以下步骤手动执行。对于 semver-minor，您可以使用 `--newVersion` 参数显式传递新版本：

```bash
git node release -S --prepare --security=../vulnerabilities.json --filterLabel v20.x --newVersion 20.20.0
```

<details>
<summary>安全发布</summary>

在执行安全发布时，`vN.x.x-proposal` 分支应基于 `vN.x` 创建。

```console
$ git checkout -b v1.2.3-proposal upstream/v1.x
git cherry-pick  ...  # 将 nodejs-private PR 提交直接 cherry-pick 到提案中
```

确保将 CVE 修复标记为 `notable-change` 在 nodejs-private 仓库中。
这将确保它们包含在 CHANGELOG 的“值得注意的更改”部分中。

</details>

### 3. 更新 `src/node_version.h`

使用以下宏设置拟议发布的版本，这些宏已在 `src/node_version.h` 中定义：

```c
#define NODE_MAJOR_VERSION x
#define NODE_MINOR_VERSION y
#define NODE_PATCH_VERSION z
```

将 `NODE_VERSION_IS_RELEASE` 宏值设置为 `1`。这将导致构建生成一个不带尾随预发布标签的版本字符串：

```c
#define NODE_VERSION_IS_RELEASE 1
```

### 4. 更新变更日志

#### 步骤 1：收集格式化的更改列表

收集自上次发布以来的格式化提交列表。使用
[`changelog-maker`](https://github.com/nodejs/changelog-maker) 来完成此操作：

```bash
changelog-maker --group --markdown
```

`changelog-maker` 会计算自上次标记以来的提交数，如果仓库中的上次标记不在当前分支上，您可能需要提供
`--start-ref` 参数：

```bash
changelog-maker --group --markdown --filter-release --start-ref v1.2.2
```

`--filter-release` 将从上一个发布的发布提交中移除。

#### 步骤 2：更新相应的 doc/changelogs/CHANGELOG\_\*.md 文件

每个主要 Node.js 发布系列都有一个单独的 `CHANGELOG_Vx.md` 文件。
这些文件位于 `doc/changelogs/` 目录中。收集格式化的更改列表后，必须将其添加到发布分支中相应变更日志文件的顶部（例如，Node.js v4 的发布将添加到
`/doc/changelogs/CHANGELOG_V4.md`）。

**请勿将变更日志条目添加到根 `CHANGELOG.md` 文件中。**

新条目应采用以下形式：

```markdown
<a id="x.y.x"></a>
## YYYY-MM-DD, Version x.y.z (Release Type), @releaser

### Notable changes

* 在此处列出值得注意的更改
* ...

### Commits

* 在此处包含自上次发布以来的完整提交列表。请勿包含“Working on X.Y.Z+1”提交。
```

发布类型应为 Current、LTS 或 Maintenance，具体取决于所制作发布的类型。

默认情况下，`### Notable changes` 部分应填充发布中带有 `notable-change` 或 `semver-minor` 标签的提交。一些 `semver-minor` 功能可能被发布者确定，或被其他贡献者指示，不适合列为值得注意的。最终决定权在于发布者。

您可以使用 `branch-diff` 来获取带有 `notable-change` 标签的提交列表：

```bash
branch-diff upstream/v1.x v1.2.3-proposal --require-label=notable-change --plaintext
```

确保 `<a>` 标签以及两个标题没有任何缩进。

<details>
<summary>安全发布</summary>

对于安全发布，有必要包含更详细的信息，包括已修复哪些漏洞，以及任何用于恢复到旧行为的回滚标志或变通方法。

您可以参考以下模板作为指南：

```markdown
<a id="x.y.x"></a>
## YYYY-MM-DD, Version x.y.z (Release Type), @releaser

这是一个安全发布。

### Notable changes

* <CVE 标题> (High|Medium|Low)(CVE-XXXX-XXXXX)
* ...

### Commits

* 在此处包含自上次发布以来的完整提交列表。请勿包含“Working on X.Y.Z+1”提交。
```

或者，参考 [之前的安全发布变更日志条目](https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_V17.md#2022-01-10-version-1731-current-bethgriggs) 中的一个，以了解结构和详细程度。

对于每个修复，请根据您的判断决定是否需要副标题来更详细地描述修复。大部分信息应可从“发布后”公告（应在 `nodejs-private` 中提供）中提取。如果 CVE 在多个发布系列中得到修复，请尝试协调其他发布的变更日志内容，以使描述一致。

</details>

在根 `CHANGELOG.md` 文件顶部，有一个索引表，其中包含每个主要 Node.js 发布系列的所有发布。需要将新发布的链接添加到其中。遵循现有示例，并确保将发布添加到列表的 _顶部_。每个发布系列中最新的发布在索引中以 **粗体** 显示。更新索引时，请务必相应地更新显示，删除先前发布的粗体样式。

运行 `make format-md` 以确保 `CHANGELOG_Vx.md` 和 `CHANGELOG.md` 文件格式正确。

#### 步骤 3：更新文档中的任何 REPLACEME 和 DEP00XX 标签

如果此发布包含新 API，则有必要记录它们在此版本中首次添加。相关提交应已包含 `REPLACEME` 标签（请参阅 [编写文档](./api-documentation.md#writing-documentation)）。使用以下命令检查这些标签：

```bash
grep REPLACEME doc/api/*.md
```

并使用以下命令替换此节点版本：

```bash
sed -i "s/REPLACEME/$VERSION/g" doc/api/*.md
```

对于 macOS，需要指定扩展名。

```bash
sed -i "" "s/REPLACEME/$VERSION/g" doc/api/*.md
```

或

```bash
perl -pi -e "s/REPLACEME/$VERSION/g" doc/api/*.md
```

`$VERSION` 应以 `v` 作为前缀。

如果此发布包含任何新的弃用项，则有必要确保它们被分配了正确的静态弃用代码。这些代码列在文档中（请参阅 `doc/api/deprecations.md`）并在源代码中作为 `DEP00XX`。必须为代码分配一个编号（例如 `DEP0012`）。此分配应在 PR 合并时进行，但在运行发布构建时会进行检查。

### 5. 创建发布提交

`CHANGELOG.md`、`doc/changelogs/CHANGELOG_Vx.md`、`src/node_version.h` 和
`REPLACEME` 的更改应为将要标记的发布提交。在 git 中提交这些更改时，请使用以下消息格式：

```text
YYYY-MM-DD, Version x.y.z (Release Type)

Notable changes:

* 将值得注意的更改列表复制到此处，重新格式化为纯文本

PR-URL: TBD
```

<details>
<summary>安全发布</summary>

对于安全发布，请在提交消息开头加上短语
`This is a security release.`，以便
[分发索引器](https://github.com/nodejs/nodejs-dist-indexer) 可以将其识别为安全发布：

```text
YYYY-MM-DD, Version x.y.z (Release Type)

This is a security release.

Notable changes:

* 将值得注意的更改列表复制到此处，重新格式化为纯文本

PR-URL: TBD
```

**注意**：确保将提案分支推送到 nodejs-private 仓库。
否则，您将在安全发布之前泄露提交。

</details>

### 6. 在 GitHub 上提议发布

将发布分支推送到 `nodejs/node`，而不是您自己的 fork。这使得发布分支可以轻松地在发布团队成员之间传递（如果需要）。

创建一个指向正确发布系列的拉取请求。例如，一个
`v5.3.0-proposal` PR 应指向 `v5.x`，而不是 `main`。将 CHANGELOG
修改粘贴到 PR 的正文中，以便协作者可以看到正在更改的内容。这些 PR 应保持打开状态至少 24 小时，并且可以随着新提交的合并而更新。如果粘贴到拉取请求中的 CHANGELOG 太长以至于减慢了 GitHub UI，请考虑将提交粘贴到 `<details>` 标签中或在后续评论中。

如果使用 `<details>` 标签，请使用以下格式：

```markdown
<details>
<summary>Commits</summary>

* 完整的提交列表...
</details>
```

如果您需要有关任何提交的额外信息，此 PR 是一个很好的提及相关贡献者的地方。

打开 PR 后，更新发布提交以包含 `PR-URL` 元数据，并强制推送提案。

<details>
<summary>安全发布</summary>

如果存在私有安全补丁，请记住在 `nodejs-private` GitHub 仓库中推送并打开提案。

</details>

### 7. 确保发布分支稳定

运行 **[`node-test-pull-request`](https://ci.nodejs.org/job/node-test-pull-request/)**
测试以确保构建稳定且 HEAD 提交已准备好发布。

如果发布包含对 `deps/v8` 的更改，还应运行 **[`node-test-commit-v8-linux`](https://ci.nodejs.org/job/node-test-commit-v8-linux/)**
测试。

执行一些烟雾测试。为此目的有一个
**[`citgm-smoker`](https://ci.nodejs.org/job/citgm-smoker/)** CI 作业。使用基础 `vx.x` 分支作为参考运行一次，然后使用提案分支运行，以检查是否可能引入了新的回归到生态系统中。

使用 `ncu-ci` 比较 `vx.x` 运行（10）和提案分支（11）

```bash
npm i -g @node-core/utils
ncu-ci citgm 10 11
```

<details>
<summary>安全发布</summary>

如果存在私有安全补丁，在锁定 CI 之前，请勿在提案上运行任何 CI 作业。安全负责人应与构建工作组协调此事。

</details>

#### 7.1 更新发布 _(可选)_

有时，由于多种原因，发布可能会推迟到第二天：

* CI 不稳定
* CI 完成时间晚

发生这种情况时，需要根据新的目标日期更新 CHANGELOG\_Vx 和提交元数据。

但是，如果自上次 CI 执行以来仅更改了变更日志/提交消息，则无需重新运行 CI、V8 或 CITGM 工作流。
PR 仍然需要一次干净的 GitHub 操作运行，并且原始 CI、V8 和 CITGM 运行应在可见的评论中。

在某些情况下，需要删除或调整提交，请考虑使用以下方法：

1. 更新暂存

```bash
git checkout v1.x-staging
git rebase -i $HASH_PREVIOUS_BAD_COMMIT
# ... 删除或编辑不良提交
git push -f upstream v1.x-staging
```

2. 将提案 rebase 到更新的暂存分支之上

```bash
git checkout v1.2.3-proposal
git checkout -b v1.2.3-proposal-tmp
git checkout v1.2.3-proposal

git reset --hard upstream/v1.x-staging
git cherry-pick v1.2.3-proposal-tmp
```

注意 `tmp` 分支仅用于保存发布提交。

3. 重新运行 `changelog-maker` 并更新 CHANGELOG\_Vx 以包含新的
   Git SHA。如果适用，请记住更新提交消息。

### 8. 生成 nightly 构建 _(可选)_

如果需要生成测试发布以供他人试用安装程序或特定构建，请使用
**[iojs+release](https://ci-release.nodejs.org/job/iojs+release/)** 生成 nightly 构建，并等待其在 <https://nodejs.org/download/nightly/> 中发布。遵循说明并输入正确的提交 SHA 长度、日期字符串，并为“disttype”选择“nightly”。

如果最近对 macOS 或 Windows 安装程序进行了相关工作，则尤其推荐此操作，因为 CI 无法以任何方式对其进行测试。

<details>
<summary>安全发布</summary>

请勿生成发布候选构建。

</details>

### 9. 生成发布构建

使用 **[iojs+release](https://ci-release.nodejs.org/job/iojs+release/)** 生成发布工件。输入要从中构建的提交，并为“disttype”选择“release”。

每个工作程序的工件都会上传到 Jenkins，如果需要进一步测试，则可以使用。特别是，如果对 macOS 或 Windows 安装程序有任何疑虑，请利用此机会进行测试。单击进入各个工作程序以查找工件。

所有发布工作程序都应成功（并且是绿色的，而不是红色的）。不应推广有失败的发布，因为很可能存在需要调查的问题。

在推广之前，您可以根据需要多次重建发布。

如果您在 Windows 上遇到错误并需要重新开始，请注意，除非等待最多 2 分钟让链接器停止（来自之前的作业），否则您将立即失败。即，如果一个构建在开始编译后失败，该工作程序仍将有一个链接器进程运行几分钟，这将阻止 Jenkins 清除工作区以启动新的构建。这没什么大不了的，只是有点麻烦，因为它会导致您重新开始时又一次构建失败！

### 10. 测试构建

Jenkins 会收集构建的工件，允许您下载和安装新构建。确保构建看起来正确。检查版本号，并执行一些基本检查以确认构建一切正常，然后再继续。使用以下列表作为基准：

* `process.version` 符合预期
* `process.release` 符合预期
* `process.versions` 符合预期（例如，`openssl` 或 `llhttp` 版本
  必须在预期的更新版本中）
* npm 版本（检查是否与我们期望的匹配）
* 对构建的二进制文件运行测试套件（可选）
  * 记得在运行测试之前使用 `make build-addons`
  * 删除 `config.gypi` 文件

```bash
./tools/test.py --shell ~/Downloads/node-v18.5.0-linux-x64/bin/node
```

### 11. 标记和签名发布提交

一旦您对生成的构建感到满意，您可以运行 `git node release --promote`：

```bash
git node release --promote https://github.com/nodejs/node/pull/XXXX -S
```

来自动化直到步骤 16 的其余步骤，或者您可以按照以下步骤手动执行。

<details>
<summary>安全发布</summary>

对于安全发布，NCU 应配置为针对公共仓库，而不是托管提案的私有仓库。使用 `--fetch-from` 参数传递要从中获取提案的上游。

推广多个发布时，可以传递多个 URL：

```bash
git node release --promote \
  --fetch-from git@github.com:nodejs-private/node-private.git \
  https://github.com/nodejs-private/node-private/pull/XXXX \
  https://github.com/nodejs-private/node-private/pull/XXXX \
  -S
```

</details>

***

创建新标签：通过等到此阶段才创建标签，如果出现问题或需要其他提交，您可以丢弃拟议的发布。
一旦您创建了标签并将其推送到 GitHub，您 _**不得**_ 删除并重新标记。如果您在标记后犯了错误，您将不得不进行版本升级并重新开始，并将该标签/版本视为已丢失。

标签摘要具有可预测的格式。查看最近的标签以了解：

```bash
git tag -v v6.0.0
```

消息应类似于
`2016-04-26 Node.js v6.0.0 (Current) Release`。

安装 `git-secure-tag` npm 模块：

```bash
npm install -g git-secure-tag
```

> 确保在 git 设置中禁用 `--follow-tags`，方法是：`git config push.followTags false`

如果您的私钥受密码保护，您可能需要运行：

```bash
export GPG_TTY=$(tty)
```

在创建标签之前。

要创建标签，请使用以下命令：

```bash
git secure-tag <vx.y.z> <commit-sha> -sm "YYYY-MM-DD Node.js vx.y.z (<release-type>) Release"
```

<sup>commit-sha 是发布提交。您可以轻松地通过运行 `git rev-parse HEAD` 来获取它</sup>

`release-type` 是“Current”或“LTS”。对于 LTS 发布，您还应包含发布代号。

```text
2019-10-22 Node.js v10.17.0 'Dubnium' (LTS) Release
```

标签 **必须** 使用您在项目 README 中列出的 GPG 密钥进行签名。

**注意**：此时请勿将标签推送到远程。

### 12. 为下一次发布做准备

在发布提案分支上，再次编辑 `src/node_version.h` 并：

* 将 `NODE_PATCH_VERSION` 加一
* 将 `NODE_VERSION_IS_RELEASE` 改回 `0`

使用以下提交消息格式提交此更改：

```text
Working on vx.y.z # 其中 'z' 是递增的补丁号

PR-URL: <您的发布提案 PR 的完整 URL>
```

这会将分支设置为生成带有下一个版本号 _和_ 预发布标签的 nightly 构建。

将您的发布提案分支合并到您正在发布的稳定分支中，然后将相应的暂存分支在其之上进行 rebase。

```bash
git checkout v1.x
git merge --ff-only v1.2.3-proposal
git push upstream v1.x
git checkout v1.x-staging
git rebase v1.x
git push upstream v1.x-staging
```

<details>
<summary>安全发布</summary>

对于安全发布，您还可以提前开始将发布合并到 `nodejs-private`
GitHub 组织中，方法与上述步骤相同：

```bash
git checkout v1.x
git merge --ff-only v1.2.3-proposal
git push private v1.x
git checkout v1.x-staging
git rebase v1.x
git push private v1.x-staging
```

一旦所有发布者都准备就绪，您就可以将每个分支推送到公共仓库。

</details>

### 13. 将发布提交 cherry-pick 到 `main`

```bash
git checkout main
git pull upstream main
git cherry-pick --strategy-option=diff-algorithm=patience v1.x^
```

Git 应该会停止，让您修复冲突。

撤销对 `src/node_version.h` 所做的所有更改：

```bash
git restore --source=upstream/main src/node_version.h
```

<details>
<summary>主版本发布</summary>

在 main 分支上，而不是撤销对 `src/node_version.h` 所做的更改，而是编辑它并：

* 将 `NODE_MAJOR_VERSION` 加一
* 将 `NODE_PATCH_VERSION` 重置为 `0`
* 将 `NODE_VERSION_IS_RELEASE` 改回 `0`

使用以下命令修改当前提交以应用更改：

```bash
git commit --amend
```

</details>

即使没有冲突，也要确保撤销对 `src/node_version.h` 所做的所有更改。`NODE_VERSION_IS_RELEASE` 必须为 `0`。

<sup>编辑 `src/node_version.h`，将 `NODE_VERSION_IS_RELEASE` 改回 `0`，然后 `git commit --amend`</sup>

如果 `doc` 中由于更新的 `REPLACEME`
占位符而出现冲突（当更改先前已合并到其他发布分支时会发生这种情况），请保留两个版本号。如果 YAML 字段不是数组，请将其转换为数组。

[有可能 `cherry-pick` 步骤最终会添加和/或更改不需要的行](https://github.com/nodejs/Release/issues/771)，请在确认/继续 cherry-pick 步骤之前验证 `doc/` 文件夹文件中的更改。

然后完成 cherry-pick 并将提交推送到上游：

```bash
git add src/node_version.h doc
git diff --staged src doc # 阅读输出以验证更改是否按预期显示
git cherry-pick --continue
make lint-md && make lint-cpp
git push upstream main
```

**请勿** 将“Working on vx.y.z”提交 cherry-pick 到 `main`。

<details>
<summary>安全发布</summary>

对于安全发布，您还需要将修复合并到 `main`
分支（如果适用）。通常，您可以 cherry-pick 与 `current` 安全发布中合并的相同提交，该提交应已包含元数据。

首先将补丁推送到 `private/main` 以检查 GitHub 操作是否通过，然后再推送到 `upstream/main` 会很有用：

```bash
git checkout main
git reset --hard upstream/main
git cherry-pick ... # 应用适用于 main 的补丁
git push private main # 先推送到 private main 运行 GitHub 操作
git push upstream main
```

</details>

### 14. 推送发布标签

在推广构建之前，请将标签推送到仓库。如果您尚未推送标签，则构建推广将无法正常工作。
使用以下命令推送标签：

```bash
git push upstream v1.2.3
```

_注意_：请勿在准备完成其余发布步骤之前推送标签。

### 15. 推广和签名发布构建

**签名发布标签的同一个人必须是推广构建的人，因为 `SHASUMS256.txt` 文件需要使用相同的 GPG 密钥进行签名！**

使用 `tools/release.sh` 来推广和签名构建。在此之前，您需要确保已加载正确的 ssh 密钥，否则您将看到以下内容：

如果您的 GPG 密钥受密码保护，您可能需要运行：

```console
$ export GPG_TTY=$(tty)
```

```console
# 检查发布...
Enter passphrase for key '/Users/<user>/.ssh/id_rsa':
dist@direct.nodejs.org's password:
```

可以使用 `ssh-add` 加载密钥：

```bash
# 将 node_id_rsa 替换为您命名的密钥
ssh-add ~/.ssh/node_id_rsa
```

或在运行时使用：

```bash
# 将 node_id_rsa 替换为您命名的密钥
./tools/release.sh -i ~/.ssh/node_id_rsa
```

您还可以通过定义 `NODEJS_RELEASE_HOST` 环境变量来指定要连接的不同 ssh 服务器地址：

```bash
# 将 proxy.xyz 替换为您打算使用的地址
NODEJS_RELEASE_HOST=proxy.xyz ./tools/release.sh
```

如果 `gpg` 无法自动选择密钥，您可以使用 `-a` 选项重试以启用交互式界面：

```bash
./tools/release.sh -a
```

> \[!TIP]
> 有时，由于机器过载或其他外部因素，<https://nodejs.org/dist/index.json>、<https://nodejs.org/dist/index.tab>
> 或 `SHASUMS256.txt` 上的文件可能未正确生成。
> 在这种情况下，您可以重复签名步骤以修复它。例如：`./tools/release.sh -s`。

运行 `tools/release.sh` 时将执行以下操作：

<details>

**a.** 从您的私钥中选择一个 GPG 密钥。它将使用类似于 `gpg --list-secret-keys` 的命令来列出您的密钥。如果您没有任何密钥，它将退出。如果您只有一个密钥，它将使用该密钥。如果您有多个密钥，它将要求您从列表中选择一个。确保使用与签名 git 标签相同的密钥。

**b.** 通过 SSH 登录服务器并检查可推广的发布以及工件列表。它将使用服务器上的 `dist-promotable` 命令来查找这些。系统将询问您是否要继续进行每个可推广的发布。如果需要推广的发布不止一个（不应该有），请确保只推广您负责的发布。

**c.** 通过 SSH 登录服务器并为给定发布运行推广脚本。服务器上的命令将类似于：`dist-promote vx.y.z`。在此步骤之后，发布工件将可供下载，并且将存在 `SHASUMS256.txt` 文件。但是，发布仍未签名。

**d.** 使用 `scp` 将 `SHASUMS256.txt` 下载到您计算机上的临时目录。

**e.** 使用类似于 `gpg --default-key YOURKEY --digest-algo SHA256 --clearsign /path/to/SHASUMS256.txt` 的命令对 `SHASUMS256.txt` 文件进行签名。
GPG 将提示您输入密码。签名文件将命名为 SHASUMS256.txt.asc。

**f.** 使用类似于 `gpg --default-key YOURKEY --digest-algo SHA256 --detach-sign /path/to/SHASUMS256.txt` 的命令输出您的公钥的 ASCII 编码版本。
GPG 将提示您输入密码。签名文件将命名为 SHASUMS256.txt.sig。

**g.** 将 `SHASUMS256.txt` 文件上传回服务器到发布目录。

</details>

**可以通过运行 `./tools/release.sh -s vX.Y.Z` 来仅签名发布。**

### 16. 检查发布

您的发布应可在 `https://nodejs.org/dist/vx.y.z/` 和
<https://nodejs.org/dist/latest/> 访问。检查相应的文件是否已到位。您可能需要检查二进制文件是否正常工作并具有正确的内部版本字符串。检查 API 文档是否可在 <https://nodejs.org/api/> 访问。检查发布目录文件是否在 <https://nodejs.org/dist/index.tab> 和 <https://nodejs.org/dist/index.json> 上正确。

### 17. 在 GitHub 上创建发布

* 转到 [新建发布页面](https://github.com/nodejs/node/releases/new)。
* 选择您之前推送的标签版本。
* 对于发布标题，从变更日志中复制标题。
* 对于描述，复制变更日志条目的其余部分。
* 如果您不发布最新的“Current”，请取消选中
  “Set as the latest release”。
* 点击“Publish release”按钮。

### 18. 创建博客文章

当您推广新构建时，会自动触发一个构建，因此在几分钟内 nodejs.org 将会列出您的新版本作为最新发布，并且会创建一个博客文章草稿 PR。

如果 _未创建_ 草稿 PR，则可以使用 [`scripts:release-post`][] 脚本作为替代：

```bash
# 在 nodejs/nodejs.org 的 apps/site 文件夹中
node --run scripts:release-post x.y.z
```

该脚本将使用推广的构建和变更日志来生成帖子。

* 如果您想说一些重要的话，可以在主标题下方添加一个简短的说明，否则文本应准备好发布。

* 下载文件的链接将不完整，除非您等待 ARMv6 构建。任何缺失的下载旁边都会显示 `*Coming soon*`。您有责任在稍后拥有未完成的构建时手动更新它们。

* `SHASUMS256.txt.asc` 的内容位于帖子底部。更新 tarball 列表时，您需要复制/粘贴此文件的内容以反映这些更改。

* 始终在 [nodejs.org 仓库][] 上使用拉取请求。尊重网站团队，但您不必等待 PR 批准。

* 对 [nodejs.org 仓库][] 的基础分支 `main` 的更改将触发 nodejs.org 的新构建，因此您的更改应在推送几分钟后出现。您可以关注 [部署](https://github.com/nodejs/nodejs.org/deployments) 页面，查看构建何时完成并发布。

### 19. 公告

nodejs.org 网站将自动重建并包含新版本。要在社交媒体上宣布构建，请在官方 Slack 频道中 ping @nodejs-social-team。

Node.js 也可在 Bluesky 上使用，并且可以使用 [nodejs/bluesky](https://github.com/nodejs/bluesky) 仓库重新发布发布公告。

帖子内容可以很简单：

> v5.8.0 的 @nodejs 已发布：<https://nodejs.org/en/blog/release/v5.8.0/>
> …
> 这里有一些关于值得注意的更改的内容

您可以使用以下命令在 nodejs/bluesky 上为发布帖子创建 PR：

```bash
# 创建帖子 PR：
gh workflow run create-pr.yml --repo "https://github.com/nodejs/bluesky" \
  -F prTitle='vx.x.x release announcement' \
  -F richText='Node.js vx.x.x is out. Check the blog post at https://nodejs.org/…. TL;DR is

- New feature
- …'

# 创建转推 PR：
gh workflow run create-pr.yml --repo "https://github.com/nodejs/bluesky" \
  -F prTitle='Retweet vx.x.x release announcement' -F postURL=…
```

<details>
<summary>安全发布</summary>

告知安全发布负责人发布已可用。

</details>

### 20. 庆祝

_以您喜欢的任何形式……_

## LTS 版本

### 将一个发布线标记为 LTS

使用 [`@node-core/utils`](https://github.com/nodejs/node-core-utils) 已自动化了将发布线标记为 LTS 的过程。

首先，检出将要被标记为 LTS 的发布线的暂存分支，例如：

```bash
git checkout v1.x-staging
```

接下来，确保你已安装 **`@node-core/utils`**：

```bash
npm i -g @node-core/utils
```

运行准备 LTS 发布命令：

```bash
git node release --prepare --startLTS
```

<details>
<summary>手动步骤供参考。</summary>

要将一个发布线标记为 LTS，必须对 `src/node_version.h` 进行以下更改：

* `NODE_MINOR_VERSION` 宏必须增加一
* `NODE_PATCH_VERSION` 宏必须设置为 `0`
* `NODE_VERSION_IS_LTS` 宏必须设置为 `1`
* `NODE_VERSION_LTS_CODENAME` 宏必须设置为为 LTS 发布选择的代号。

例如：

```diff
-#define NODE_MINOR_VERSION 12
-#define NODE_PATCH_VERSION 1
+#define NODE_MINOR_VERSION 13
+#define NODE_PATCH_VERSION 0

-#define NODE_VERSION_IS_LTS 0
-#define NODE_VERSION_LTS_CODENAME ""
+#define NODE_VERSION_IS_LTS 1
+#define NODE_VERSION_LTS_CODENAME "Erbium"

-#define NODE_VERSION_IS_RELEASE 0
+#define NODE_VERSION_IS_RELEASE 1
```

这些更改必须作为新的 semver-minor 发布的一部分进行。

更新变更日志以正确反映 **Current** 和 **Long Term Support** 之间的更改也是必要的，同时在其发布线变更日志文件中添加对当前 LTS 代号的引用。

`test/parallel/test-process-release.js` 文件也可能需要更新。

如果你无法运行自动化的 `@node-core/utils` 命令，并且你目前正在手动执行这些步骤，那么最好参考之前的 LTS 提案 PR，并确保涵盖了所有必需的更改。

</details>

### 更新发布标签

必须创建 `lts-watch-vN.x` 问题标签，其颜色应与该发布线的其他现有标签（如 `vN.x`）相同。

如果发布正在从 Active LTS 过渡到 Maintenance，则必须删除 `backport-blocked-vN.x` 标签。

### 将新代号添加到 nodejs-latest-linker

为了确保新的 LTS 发布线有一个可用的下载 URL（例如：<https://nodejs.org/download/release/latest-codename/>），你需要向 <https://github.com/nodejs/nodejs-latest-linker> 提交一个 PR，并在其 `./common.js` 文件中的 `ltsNames` 映射中为新的 LTS 代号添加一个新条目。

请务必联系 Build WG，以验证新 URL 是否作为 LTS 发布推广的一部分可用。

### 更新发布仓库信息

在 <https://github.com/nodejs/Release> 仓库的 `./README.md` 文件中，将新的 LTS 代号添加到发布时间表表格中，并在同一仓库的 `./schedule.json` 文件中添加新的代号。

## 主要版本发布

创建新的 Node.js 主要版本发布的过程与创建次要或补丁版本发布有许多不同之处。

### 时间表

新的 Node.js 主要版本发布每年两次：

* 偶数版本在四月发布。
* 奇数版本在十月发布。

主要版本应定在发布月份的第三个星期二。

主要版本不得推迟到发布月份之后。换句话说，主要版本不得推迟到五月或十一月。

@nodejs/releasers 会提前 3 个月发出发布者招募通知。目前，此通知在 `#nodejs-release-private` Slack 频道中自动化。

下一个主要版本的发布日期应在当前版本发布后立即宣布（例如，13.0.0 的发布日期应在 12.0.0 发布后立即宣布）。

### 发布分支

在大约主要版本发布前两个月，应创建新的 `vN.x` 和 `vN.x-staging` 分支（其中 `N` 表示主要版本），作为 `main` 分支的 fork。直到发布者宣布的截止日期，这些分支都必须与 `main` 保持同步。

在发布日期之前，`vN.x` 和 `vN.x-staging` 分支必须保持同步。

如果在主要版本发布日期前一个月内，默认分支上有一个 `SEMVER-MAJOR` 的拉取请求合并，则不得将其包含在新主要版本的暂存分支中，除非得到 Node.js 发布者团队的共识。此措施旨在确保发布候选（RC）阶段的稳定性，该阶段大约在正式发布前两周开始。通过限制此期间的 `SEMVER-MAJOR` 提交，我们为彻底测试提供了更多时间，并减少了主要破坏性更改的可能性，尤其是在 LTS 版本线中。

### 创建发布标签

必须创建以下问题标签：

* `vN.x`
* `backport-blocked-vN.x`
* `backport-open-vN.x`
* `backport-requested-vN.x`
* `backported-to-vN.x`
* `dont-land-on-vN.x`

标签描述可以从先前发布的现有标签复制。所有新标签的颜色必须相同，但必须与先前发布的标签不同。

### 发布提案

应在发布前 6 周创建草稿发布提案。应创建一个单独的 `vN.x-proposal` 分支，该分支跟踪 `vN.x` 分支。此分支将包含草稿发布提交（带有草稿变更日志）。

在发布提案 PR 中通知 `@nodejs/npm` 团队，告知他们即将发布的版本。`npm` 维护一个[支持的版本](https://github.com/npm/cli/blob/latest/lib/utils/unsupported.js#L3)列表，该列表需要更新以包含新的主要版本。

为了在发布日期之前保持分支同步，可以简单地执行以下操作：

> 请确保检查没有带有 `dont-land-on-vX.x` 标签的 PR。

```bash
git checkout vN.x
git reset --hard upstream/main
git checkout vN.x-staging
git reset --hard upstream/main
git push upstream vN.x
git push upstream vN.x-staging
```

### 更新 `NODE_MODULE_VERSION`

`src/node_version.h` 中的此宏用于指示原生插件的 ABI 版本。它目前在社区中有两个常见用途：

* 确定编译原生插件要针对的 API，例如 [NAN](https://github.com/nodejs/nan) 使用它来形成它包装的大部分内容的兼容层。
* 确定下载原生插件预编译二进制文件的 ABI，例如 [node-pre-gyp](https://github.com/mapbox/node-pre-gyp) 使用此值（通过 `process.versions.modules` 暴露）来帮助确定在安装时下载的适当二进制文件。

一般规则是，当存在_破坏性 ABI_更改以及非平凡的 API 更改时，增加此版本。规则尚未严格定义，因此如有疑问，请咨询具有更丰富知识的人员，例如 NAN 团队的成员。

目前使用的 `NODE_MODULE_VERSION` 值的注册表维护在 <https://github.com/nodejs/node/blob/HEAD/doc/abi_version_registry.json>。在增加 `NODE_MODULE_VERSION` 时，您应该选择一个注册表中未列出的新值。同时在您的提交中包含对注册表的更改，以反映新使用​​的值。确保发布提交删除正在准备的主要版本的 `-pre` 后缀。

根据当前的 TSC 政策，在 ABI 更改时会增加主要版本。如果您发现在主要版本发布之外需要增加 `NODE_MODULE_VERSION`，则应咨询 TSC。提交可能需要被撤销，或者可能需要增加主要版本。

### 测试发布和发布候选

应从大约发布前 6 周的 `vN.x-proposal` 分支生成测试构建。

应从大约发布前 4 周的 `vN.x-proposal` 分支生成发布候选，目标是每周一个发布候选。

始终通过 Canary in the Goldmine 工具运行测试发布和发布候选以进行额外测试。

### Changelogs

生成主要版本变更日志比次要和补丁版本变更日志要复杂一些。

#### 创建变更日志文件

在 `doc/changelogs` 目录中，创建一个新的 `CHANGELOG_V{N}.md` 文件，其中 `{N}` 是发布的主要版本。遵循现有 `CHANGELOG_V*.md` 文件的结构。

所有 `CHANGELOG_V*.md` 文件中的导航标题必须更新，以包含新的 `CHANGELOG_V{N}.md` 文件。

创建文件后，必须更新根 `CHANGELOG.md` 文件以引用新创建的主要版本 `CHANGELOG_V{N}.md`。

#### 生成变更日志

要生成正确的重大版本变更日志，请使用 `branch-diff` 工具比较 `vN.x` 分支与 `vN-1.x` 分支（例如，对于 Node.js 12.0，我们比较 `v12.x` 分支与最新的 `v11.x` 分支）。确保下级分支的本地副本是最新的。

然后必须组织生成的变更日志中的提交：

* 从列表中删除所有发布提交
* 删除所有已撤销的提交及其撤销
* 将所有 SEMVER-MAJOR、SEMVER-MINOR 和 SEMVER-PATCH 提交分开到列表中

```console
$ branch-diff upstream/vN-1.x upstream/vN.x --require-label=semver-major --group --filter-release --markdown # 获取所有 majors
$ branch-diff upstream/vN-1.x upstream/vN.x --require-label=semver-minor --group --filter-release --markdown # 获取所有 minors
$ branch-diff upstream/vN-1.x upstream/vN.x --exclude-label=semver-major,semver-minor --group --filter-release --markdown # 获取所有 patches
```

#### 生成值得注意的更改

对于主要版本发布，所有非严格内部、测试或文档相关的 SEMVER-MAJOR 提交都应列为值得注意的更改。一些 SEMVER-MINOR 提交可以根据具体情况列为值得注意的更改。在此处运用您的判断。

### 更新预期的资产

推广脚本会检查预期的文件是否存在。在 Build 仓库中打开一个 PR，将新发布线（`v{N}.x`，其中 `{N}` 是发布的主要版本）的预期文件列表作为新文件添加到 [expected assets][] 文件夹中。在发布推广之前，需要由 [build-infra team][] 的成员将更改部署到 Web 服务器上。

### Snap

Node.js [Snap][] 包有一个“默认”设置，用于用户未指定发布线（在 Snap 术语中称为“track”）的安装。这应该更新为指向最近激活的 LTS。Node.js Build Infrastructure 团队的成员可以执行此切换。一旦新的 LTS 发布线已发布，就应该在 [Node.js Snap management repository][] 上创建一个问题来请求执行此操作。

## FAQ

由于 `tools/release.sh` 的工作方式，在发布过程中遇到一些错误是很常见的，因为它依赖于网络通信和机器的可用性。本节旨在指导发布者处理潜在的故障。

### 在发布过程中 dist-indexer 出错

```bash
node:events:491
      throw er; // 未处理的 'error' 事件
      ^

Error: read ECONNRESET
    at TLSWrap.onStreamRead (node:internal/stream_base_commons:217:20)
Emitted 'error' event on DestroyableTransform instance at:
    at ClientRequest.<anonymous> (/usr/lib/node_modules/nodejs-dist-indexer/node_modules/hyperquest/index.js:14:19)
    at ClientRequest.emit (node:events:513:28)
    at TLSSocket.socketErrorListener (node:_http_client:494:9)
    at TLSSocket.emit (node:events:513:28)
    at emitErrorNT (node:internal/streams/destroy:157:8)
    at emitErrorCloseNT (node:internal/streams/destroy:122:3)
    at processTicksAndRejections (node:internal/process/task_queues:83:21) {
  errno: -104,
  code: 'ECONNRESET',
  syscall: 'read'
}
```

典型解决方法：重新签名发布。

```bash
./tools/release.sh -s vX.Y.Z
```

[Build issue tracker]: https://github.com/nodejs/build/issues/new
[CI lockdown procedure]: https://github.com/nodejs/build/blob/HEAD/doc/jenkins-guide.md#restricting-access-for-security-releases
[Node.js Snap management repository]: https://github.com/nodejs/snap
[Snap]: https://snapcraft.io/node
[`create-release-proposal`]: https://github.com/nodejs/node/actions/workflows/create-release-proposal.yml
[`scripts:release-post`]: https://github.com/nodejs/nodejs.org/blob/HEAD/apps/site/scripts/release-post/index.mjs
[build-infra team]: https://github.com/orgs/nodejs/teams/build-infra
[expected assets]: https://github.com/nodejs/build/tree/HEAD/ansible/www-standalone/tools/promote/expected_assets
[nodejs.org repository]: https://github.com/nodejs/nodejs.org
