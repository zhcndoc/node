# 安全发布流程

安全发布流程涵盖规划/实施一次安全发布所需的步骤。本文档会复制到下一次安全发布的描述中，并用于跟踪发布进度。它包含 _**类似这样 的文本**_，这些内容会在发布过程中被替换为所描述的信息。

## 安全发布负责人

对于每一次安全发布，都会有一位安全负责人负责协调本流程中列出的步骤。安全负责人通过在 TSC 仓库中创建 issue 进行提名，并通过常规的 TSC 共识流程获得批准。一旦获批，他们将获得执行本流程中所列步骤所需的全部资源访问权限，具体见 [安全负责人入职/离职流程](security-steward-on-off-boarding.md)。

当前的安全负责人记录在 Node.js 主仓库的 [README.md](https://github.com/nodejs/node#security-release-stewards) 中。

| 公司                     | 人员            | 发布日期       |
| ------------------------ | --------------- | ------------ |
| NearForm                | Matteo          | 2021-Oct-12  |
| Datadog                 | Bryan           | 2022-Jan-10  |
| RH and IBM              | Joe             | 2022-Mar-18  |
| NearForm                | Matteo / Rafael | 2022-Jul-07  |
| Datadog                 | Vladimir        | 2022-Sep-23  |
| NodeSource              | Juan            | 2022-Nov-04  |
| RH and IBM              | Michael         | 2023-Feb-16  |
| NearForm                | Rafael          | 2023-Jun-20  |
| NearForm                | Rafael          | 2023-Aug-09  |
| NearForm                | Rafael          | 2023-Oct-13  |
| NodeSource              | Rafael          | 2024-Feb-14  |
| NodeSource              | Rafael          | 2024-Apr-03  |
| NodeSource              | Rafael          | 2024-Apr-10  |
| NodeSource              | Rafael          | 2024-Jul-08  |
| NodeSource              | Rafael          | 2025-Jan-21  |
| NodeSource              | Rafael          | 2025-May-14  |
| NodeSource              | Rafael          | 2025-Jul-15  |
| HeroDevs and NodeSource | Marco / Rafael  | 2026-Jan-13  |
| NodeSource              | Rafael          | 2026-Mar-24  |
| Platformatic            | Antoine         | 2026-Jun-18  |
| Datadog                 | Bryan           |              |
| IBM                     | Joe             |              |
| Platformatic            | Matteo          |              |
| NodeSource              | Juan            |              |

## 规划

* [ ] 1\. **生成下一次安全发布 PR**
  * 在 [security-release][] 仓库中运行 `git node security --start`。
  * 该命令会在 `security-release/next-security-release` 文件夹中生成一个新的 `vulnerabilities.json` 文件，其中包含已选定要发布的 HackerOne 报告。
  * 它还会创建用于管理安全发布的 pull request。

* [ ] 2\. **审查报告：**
  * 可以使用以下命令添加或移除报告：
    * 在 HackerOne 中使用 "summary" 功能。示例 [2038134](https://hackerone.com/reports/2038134)
    * `git node security --add-report=report_id`
    * `git node security --remove-report=report_id`
  * 请务必在发布日期之前提醒 Node.js TSC 团队审查这些 PR。
    * 如果已妥善沟通，添加对报告主题有专业知识的个人也是可行的选择，需同时告知 nodejs/security 和 TSC。

* [ ] 3\. **分配严重程度并撰写团队摘要：**
  * [ ] 为选入 `vulnerabilities.json` 的报告分配严重程度，并在 HackerOne 上撰写团队摘要。
  * 运行 `git node security --sync` 以更新 `vulnerabilities.json` 中的严重程度和摘要。

* [ ] 4\. **申请 CVE：**
  * 使用 `git node security --request-cve` 为这些报告申请 CVE。
  * 在申请 CVE 之前，请确保 CI 处于绿色状态。
  * 通过 [此 issue](https://github.com/nodejs/security-wg/issues/1419) 检查是否需要为自上次安全发布以来变为 EOL 的任何版本签发 CVE。

* [ ] 5\. **选择或更新发布日期：**
  * 就计划中的发布日期达成一致。
  * [ ] 使用 `git node security --update-date=YYYY/MM/DD` 来选择或更新发布日期。
  * 这样在需要时可以灵活推迟发布。

* [ ] 6\. **招募发布志愿者：**
  * 为即将到来的安全发布在受影响的发布分支上招募志愿者。
  * 确保将 nodejs-private（vN.x）分支与 nodejs/node 同步。
  * **重要：** 确保所有 backport 提交都在提交信息中包含 `PR-URL` 元数据。这是安全发布自动化所必需的。

* [ ] 7\. **准备发布前和发布后博客文章：**
  * [ ] 使用 `git node security --pre-release` 创建发布前博客文章。
  * [ ] 使用 `git node security --post-release` 创建发布后博客文章。

## 公告（计划发布日期前一周）

* [ ] 1\. **发布前博客文章：**
  * 在 `nodejs/nodejs.org` 仓库中发布发布前博客文章。

* [ ] 2\. **发送发布前公告：**
  * 通知社区即将到来的安全发布：

    * [ ] `git node security --notify-pre-release`
      除下面列表中注明的项外，这将自动创建通知所需的 issue 和邮件。
    * [docker-node](https://github.com/nodejs/docker-node/issues)
    * [build-wg](https://github.com/nodejs/build/issues)
    * [ ] （尚未自动化 - 请手动执行）[Google Groups](https://groups.google.com/g/nodejs-sec)
      * 邮件：notify <oss-security@lists.openwall.com>
    * [ ] （尚未自动化 - 请手动执行）在 OpenJS Slack 的 nodejs-social 频道发帖，请求转发该博客文章。

    ```text
    安全发布预告：

    我们将在 Day Month Date, Year 当天或其后不久发布 <add versions> 发行线的新版本，以解决：

    * # 个高严重性问题
    * # 个中等严重性问题

    https://nodejs.org/en/blog/vulnerability/month-year-security-releases/
    ```

    我们特别要求，除发布者和参与该安全发布工作的安全负责人之外的协作者，在 Node.js 的推文发出之前不要发推或公开宣传该发布。我们经常看到在发布尚未完成前就发出的推文，这可能会让等待发布的人感到困惑，并削弱发布者为交付该发布所付出的努力。

如果该安全发布只包含 OpenSSL 更新，请考虑在发布前公告中添加以下内容：

```text
由于此次安全发布只会包含 OpenSSL 的更新，如果你使用的 Node.js 版本属于某个使用系统安装 OpenSSL 的发行版，这个 Node.js 安全更新可能不适用于你；相反，你可能需要更新系统中的 OpenSSL 库。请查看安全公告以获取更多信息。
```

## 发布日

* [ ] 1\. **锁定 CI：**
  * 锁定 CI 以防止公众访问 CI 机器，联系 `@nodejs/jenkins-admins` 的成员。

* [ ] 2\. **发布：**
  * 确认所有发布提案（test-V8、CITGM 等）的 CI 都是绿色的。
  * 按照 [发布流程](https://github.com/nodejs/node/blob/main/doc/contributing/releases.md) 执行。

* [ ] 3\. **解锁 CI：**
  * 解锁 CI 以允许公众访问 CI 机器，联系 `@nodejs/jenkins-admins` 的成员。

* [ ] 4\. **发布发布后博客文章：**
  * 在 `nodejs/nodejs.org` 仓库中发布发布后博客文章。

* [ ] 5\. **通知社区：**
  * 通知社区安全发布已经完成：
    * [ ] Slack：`#nodejs-social`
    * [ ] [docker-node](https://github.com/nodejs/docker-node/issues)
    * [ ] [build-wg](https://github.com/nodejs/build/issues)
    * [ ] 邮件：通知 [Google Groups](https://groups.google.com/g/nodejs-sec)
      * 转发到 <oss-security@lists.openwall.com>

## 发布后

* [ ] 1\. **清理：**
  * [ ] `git node security --cleanup`。此命令将：
  * 更新 next-security-release 文件夹
  * 关闭所有标记为 `Security Release` 的 PR 和 backport。
  * 关闭 HackerOne 报告：
    * 关闭已解决（Resolved）
    * 请求披露（Request Disclosure）
    * 请求发布 H1 CVE 请求
    * 如果报告者不接受披露，请遵循此流程：
      删除引用文本框中的原始报告引用，并插入你希望附加到该 CVE 的公开 URL。
      然后取消勾选 HackerOne 页面底部的 Public Disclosure 复选框。
      ![HackerOne CVE 表单截图](https://github.com/nodejs/node/assets/26234614/e22e4f33-7948-4dd2-952e-2f9166f5568d)
  * 将漏洞的机器可读 JSON 描述提交 PR 到 [core](https://github.com/nodejs/security-wg/tree/HEAD/vuln/core)
    漏洞数据库。
  * [ ] 在 [Security Release Stewards](https://github.com/nodejs/node/blob/HEAD/doc/contributing/security-release-process.md#security-release-stewards) 中将自己添加为负责人

## 添加安全回退选项

为修复重要的安全漏洞，现有 LTS 版本线中允许引入破坏性变更。当进行了破坏性变更时，提供一个可恢复原始行为的命令行选项非常重要。

现有的 Node.js 代码库支持命令行选项 `--security-revert`，并且已经有样板代码便于为特定 CVE 添加该功能。

要为某个 CVE 添加回退选项，例如 `CVE-2024-1234`，只需将这一行添加到
[`node_revert.h`](https://github.com/nodejs/node/blob/main/src/node_revert.h)

```c
  XX(CVE_2024_1234, "CVE-2024-1234", "Description of cve")
```

这将允许轻松检查是否已请求回退。

在 JavaScript 代码中可以这样检查：

```js
if (process.REVERT_CVE_2024_1234);
```

在 C/C++ 代码中可以这样检查：

```c
IsReverted(SECURITY_REVERT_CVE_2024_1234)
```

从命令行，用户可以使用如下 `--security-revert` 选项请求回退：

```console
node --security-revert=CVE-2024-1234
```

如果有多个安全回退，则可以使用多个 --security-revert 实例。例如：

```console
node --security-revert=CVE-2024-1234 --security-revert=CVE-2024-XXXX
```

## 出现问题时

### 修复不完整

当某个 CVE 被报告为已在安全版本中修复，但后来发现该修复并不完整时，应使用一个新的 CVE 来覆盖后续修复。这是最佳实践，也可以避免产生混淆——例如，用户可能会认为他们通过升级 Node.js 版本已经修补了原始 CVE，而之后我们又更改了该 CVE 的 `fixed in` 值。

### 更新 CVE

更正 CVE 信息的步骤如下：

* 前往程序中的 “CVE IDs” 部分
  部分（<https://hackerone.com/nodejs/cve_requests>）
* 点击 “Request a CVE ID” 按钮
* 输入需要更新的 CVE ID
* 在表单中包含所有需要更新的详细信息
* 提交请求

[security-release]: https://github.com/nodejs-private/security-release
