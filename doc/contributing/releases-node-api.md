# Node.js Node-API 版本发布流程

本文档描述了 Node.js Node-API 版本发布流程的技术细节。

## 目录

* [如何创建一次发布](#how-to-create-a-release)
  * [0. 预发布步骤](#0-pre-release-steps)
  * [1. 更新主分支](#1-update-the-main-branch)
  * [2. 为发布创建一个新分支](#2-create-a-new-branch-for-the-release)
  * [3. 更新 `NODE_API_SUPPORTED_VERSION_MAX`](#3-update-node_api_supported_version_max)
  * [4. 定义 `addon_context_register_func`](#4-define-addon_context_register_func)
  * [5. 更新版本保护](#5-update-version-guards)
  * [6. 更新版本矩阵文档](#6-update-version-matrix-document)
  * [7. 创建发布提交](#7-create-release-commit)
  * [8. 在 GitHub 上提议发布](#8-propose-release-on-github)
  * [9. 确保发布分支稳定](#9-ensure-that-the-release-branch-is-stable)
  * [10. 合并发布](#10-land-the-release)
  * [11. 回移植发布](#11-backport-the-release)

## 如何创建一次发布

说明：

* 版本字符串在下文中以 _"vx"_ 或 _"x"_ 的形式列出。请替换为
  发布版本。
* 示例将使用整数发布版本 `10`。

### 0. 预发布步骤

在准备 Node.js Node-API 版本发布之前，必须至少提前一个工作日通知
Node-API 工作组预期的发布。

联系 Node-API 工作组的最佳方式是在
[abi-stable-node issue tracker][] 上创建一个 issue。

### 1. 更新主分支

在本地检出暂存分支。

```bash
git remote update
git checkout main
git reset --hard upstream/main
```

如果暂存分支相对于 `main` 不是最新的，请将相应的 PR 和提交合并进去。

### 2. 为发布创建一个新分支

从主分支创建一个名为 `node-api-x-proposal` 的新分支。

```bash
git checkout -b node-api-10-proposal upstream/main
```

### 3. 更新 `NODE_API_SUPPORTED_VERSION_MAX`

使用以下宏设置拟议发布的版本，这些宏已在 `src/node_version.h` 中定义：

```c
#define NODE_API_SUPPORTED_VERSION_MAX x
```

> 注意：不要更新 `src/js_native_api.h` 中定义的 `NAPI_VERSION`。它
> 是 Node-API 的固定常量基线版本。

### 4. 定义 `addon_context_register_func`

对于每个新的 Node-API 版本，都必须在
`src/node_api.cc` 中的 `get_node_api_context_register_func` 添加一个 `else if` 分支，并且该函数中
`static_assert` 语句使用的数字字面量必须更新为新的 Node-API 版本。

### 5. 更新版本保护

#### 步骤 1. 更新 define 版本保护

如果此发布包含首次在该版本中发布的新 Node-API，那么相关提交应已在
新 Node-API 的声明上包含 `NAPI_EXPERIMENTAL`
define 保护。使用以下命令检查这些保护：

```bash
grep                           \
  -nHE                         \
  'N(ODE_)?API_EXPERIMENTAL'   \
  src/js_native_api{_types,}.h \
  src/node_api{_types,}.h
```

并将 define 版本保护更新为发布版本：

```diff
- #ifdef NAPI_EXPERIMENTAL
+ #if NAPI_VERSION >= 11

  NAPI_EXTERN napi_status NAPI_CDECL
  node_api_function(napi_env env);

- #endif  // NAPI_EXPERIMENTAL
+ #endif  // NAPI_VERSION >= 11
```

移除任何形如 `NODE_API_EXPERIMENTAL_HAS_<FEATURE>` 的功能标志。

移除任何额外的 `NODE_API_EXPERIMENTAL_*` 保护以及
`NAPI_EXPERIMENTAL`。

另外，将 `test/js-native-api/test_general/test.js` 中 `napi_get_version` 测试的 Node-API 版本值
更新为发布版本 `x`：

```diff
  // Test version management functions
- assert.strictEqual(test_general.testGetVersion(), 9);
+ assert.strictEqual(test_general.testGetVersion(), 10);
```

#### 步骤 2. 更新运行时版本保护

如果此发布包含运行时行为版本保护，则相关提交应已包含该变更的
`NAPI_VERSION_EXPERIMENTAL` 保护。使用以下命令检查这些保护：

```bash
grep -nH NAPI_VERSION_EXPERIMENTAL src/js_native_api_v8* src/node_api.cc
```

并将此保护版本替换为发布版本 `x`。

#### 步骤 3. 更新测试版本保护

如果此发布包含用于新 Node-API 的插件测试，则相关提交应已为测试包含
`NAPI_EXPERIMENTAL` 定义。使用以下命令检查这些定义：

```bash
grep                                    \
  -nHE                                  \
  'N(ODE_)?API_EXPERIMENTAL'            \
  test/node-api/*/{*.{h,c},binding.gyp} \
  test/js-native-api/*/{*.{h,c},binding.gyp}
```

并将 `NAPI_EXPERIMENTAL` 替换为发布版本
`NAPI_VERSION x`；

```diff
- #define NAPI_EXPERIMENTAL
+ #define NAPI_VERSION 10
```

移除任何 `NODE_API_EXPERIMENTAL_*` 标志。

#### 步骤 4. 更新文档

如果此发布包含首次在该版本中发布且需要记录的新 Node-API，那么相关提交应已记录了新的 Node-API。

对于在步骤 1 中更新了 define 保护的所有 Node-API 函数和类型，
在 `doc/api/n-api.md` 中，为在该版本中发布的 Node-API 类型
和函数添加 `napiVersion: x` 元数据，并移除实验性稳定性横幅：

```diff
  #### node_api_function
  <!-- YAML
  added:
    - v1.2.3
+ napiVersion: 11
  -->

- > Stability: 1 - Experimental
```

#### 步骤 5. 更新变更历史

如果此发布包含首次在该版本中发布且需要记录的新 Node-API 运行时版本保护，
相关提交应已在 "Change History" 部分记录了新的行为。

对于在步骤 2 中更新的所有运行时版本保护，使用以下命令检查这些定义：

```bash
grep -nH NAPI_EXPERIMENTAL doc/api/n-api.md
```

在 `doc/api/n-api.md` 中，将 `experimental` 变更历史条目更新为
已发布版本 `x`：

```diff
  Change History:

- * experimental (`NAPI_EXPERIMENTAL` is defined):
+ * version 10:
```

### 6. 更新版本矩阵文档

在 [version matrix][] 中为
新版本添加一行：

```text
<tr>
  <th scope="row">10</th>
  <td>vREPLACEME+ and all later versions</td>
</tr>
```

在这种情况下，使用 `REPLACEME` 作为待发布 Node.js 版本的占位符。
它会在 Node.js 版本发布中更新。

### 7. 创建发布提交

将这些内容提交到 git 时，请使用以下提交信息格式：

```text
node-api: define version x
```

### 8. 在 GitHub 上提议发布

创建一个以 `main` 分支为目标的 pull request。这些 PR 应至少保持打开
24 小时，并且可以在新的提交落地时更新。

如果你需要关于任何提交的更多信息，这个 PR 是一个很好的地方来
@-提及相关贡献者。

为该 PR 添加 `notable-change` 标签，并 @-提及 GitHub 团队
@nodejs/node-api 和 @nodejs/node-api-implementer。

### 9. 确保发布分支稳定

运行一次 **[`node-test-pull-request`](https://ci.nodejs.org/job/node-test-pull-request/)**
测试，以确保构建稳定并且 HEAD 提交已准备好发布。

### 10. 合并发布

请参见 [Collaborator Guide - Landing a PR][] 中记录的步骤来合并该
PR。

### 11. 回移植发布

考虑按照 [backporting guide][] 中记录的步骤将发布回移植到所有 LTS 版本。

此外，如有必要，更新回移植版本的 [version matrix][]。

[Collaborator Guide - Landing a PR]: ./collaborator-guide.md#landing-pull-requests
[abi-stable-node issue tracker]: https://github.com/nodejs/abi-stable-node/issues
[backporting guide]: backporting-to-release-lines.md
[version matrix]: ../api/n-api.md#node-api-version-matrix
