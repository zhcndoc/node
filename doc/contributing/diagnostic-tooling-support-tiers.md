# 诊断工具支持等级

诊断工具对 Node.js 的使用者很重要。它既用于开发，也用于生产环境，以便调查问题。其中一个工具的失效，对最终用户来说可能和运行时本身的 bug 一样严重。

Node.js 项目已经对这些工具以及支持这些工具的 API 进行了评估。每个工具和 API 都被划分到以下等级之一。

* 等级 1 - 对所有 Current 和 LTS 版 Node.js 来说，必须始终可用（CI 测试通过）。如果该工具/API 的测试套件不是绿色，发布将不会进行。要被纳入此等级，它必须有良好的测试套件，并且该测试套件和一个任务必须存在于 Node.js CI 中，以便能作为发布流程的一部分运行。`main` 上的测试会在可能的情况下每晚运行，以便尽早发现潜在问题。如果下一次主要版本发布将在 1 个月内进行，那么对当前和 LTS 发布分支的任何提交都不应破坏此工具/API。此外：
  * 工具的维护者在出现问题时必须保持响应；
  * 该工具必须被生态系统积极使用；
  * 该工具必须被广泛依赖；
  * 该工具必须有指南或其他文档，位于 Node.js GitHub 组织或网站中；
  * 该工具必须可在所有受支持的平台上运行；
  * 该工具只能使用 Node.js 暴露的 API，而不能使用其依赖项的 API；
  * 该工具必须是开源的。

* 等级 2 - 对所有 LTS 版本来说，必须可用（CI 测试通过）。如果该工具/API 的测试套件不是绿色，LTS 版本将不会发布。要被纳入此等级，它必须有良好的测试套件，并且该测试套件和一个任务必须存在于 Node.js CI 中，以便能作为发布流程的一部分运行。此外：
  * 工具的维护者在出现问题时必须保持响应；
  * 该工具必须被生态系统积极使用；
  * 该工具必须被广泛依赖；
  * 该工具必须有指南或其他文档，位于 Node.js GitHub 组织或网站中；
  * 该工具必须是开源的。

* 等级 3 - 如果可能，其测试套件将至少每晚在 Node.js CI 或 CITGM 中运行，并且会为失败创建 issue。
  不会阻止发布版本。

* 等级 4 - 不会阻止发布版本。

* 未分类 - 工具/API 是新的，或在 Node.js CI 中没有满足更高等级所需的测试。

某个具体工具会被分配到哪个等级，是 Diagnostics WG 和 Release WG 之间的协作决策。所考虑的标准可能包括：

* 该工具是否属于下面列出的关键类别之一。
* 该工具是否被生态系统积极使用。
* 是否有可用的替代方案。
* 如果该工具不可用，对整个生态系统的影响。
* 是否有可可靠集成到我们 CI 中的测试套件。
* 是否有维护者或社区协作者愿意在 CI 失败时帮助解决问题。
* 该工具是否由 Node.js Foundation GitHub 组织维护。

目前属于这些等级的工具/API 类别如下：

* FFDC（F）- 首次故障数据捕获，易于使用的初始诊断信息。
* Tracing（T）- 使用日志提供有关执行流程的信息。
* Memory（M）- 提供有关 Heap 中或原生代码所使用内存的额外信息的工具。
* Profiling（P）- 提供有关 CPU 周期花费位置的额外信息的工具。
* AsyncFlow（A）- 为异步执行流提供更多洞察的工具。

## 将工具添加到此列表

任何在运行 Node.js 时可用于调查问题的工具，都可以添加到列表中。如果有一个新工具应当被添加到列表中，它应首先被加入到“尚未分类”或“等级 4”列表中。一旦它被添加到列表中，要将其“提升”到等级 3 至等级 1，需要满足上述列出的要求，并且还必须根据上述标准获得 Diagnostics WG 和 Release WG 的一致同意。

## 等级

当前分配到各等级的工具如下：

## 等级 1

| 工具类型 | 工具/API 名称         | 在 Node.js CI 中的常规测试 | 与 Node.js 集成 | 目标等级 |
| -------- | --------------------- | ----------------------------- | ----------------------- | ----------- |
| FFDC      | [diagnostic report][] | 是                           | 是                     | 1           |
|           |                       |                               |                         |             |

## 等级 2

| 工具类型 | 工具/API 名称                | 在 Node.js CI 中的常规测试 | 与 Node.js 集成 | 目标等级 |
| -------- | ---------------------------- | ----------------------------- | ----------------------- | ----------- |
| Debugger  | [Chrome DevTools Protocol][] | 是                           | 是                     | 1           |

## 等级 3

| 工具类型 | 工具/API 名称                        | 在 Node.js CI 中的常规测试 | 与 Node.js 集成 | 目标等级 |
| --------- | ------------------------------------ | ----------------------------- | ----------------------- | ----------- |
| Profiling | V8 CPU profiler                      | 部分（V8 Tests）            | 是                     | 1           |
| Profiling | --prof/--prof-process flags          | 是                           | 是                     | 1           |
| Profiling | V8 CodeEventHandler API              | 部分（V8 Tests）            | 是                     | 2           |
| Profiling | V8 --interpreted-frames-native-stack | 是                           | 是                     | 2           |
| Profiling | [Linux perf][]                       | 是                           | 部分                     | 2           |
| Profiling | [node-clinic][]                      | 否                            | 否                      | 3           |
| Debugger  | [Chrome DevTools Frontend][]         | 否                            | 否                      | 3           |

## 等级 4

| 工具类型 | 工具/API 名称 | 在 Node.js CI 中的常规测试 | 与 Node.js 集成 | 目标等级 |
| --------- | ------------- | ----------------------------- | ----------------------- | ----------- |
| Profiling | [0x][]        | 否                            | 否                      | 3           |

## 尚未分类

| 工具类型 | 工具/API 名称                             | 在 Node.js CI 中的常规测试 | 与 Node.js 集成 | 目标等级 |
| --------- | ----------------------------------------- | ----------------------------- | ----------------------- | ----------- |
| Memory    | V8 heap profiler                          | 否                            | 是                     | 1           |
| Memory    | V8 sampling heap profiler                 | 否                            | 是                     | 1           |
| AsyncFlow | [Async Hooks (API)][]                     | ?                             | 是                     | 1           |
| Debugger  | [Command line Debug Client][]             | ?                             | 是                     | 1           |
| Tracing   | [trace\_events (API)][trace_events (API)] | 否                            | 是                     | 1           |
| Tracing   | trace\_gc                                 | 否                            | 是                     | 1           |

[0x]: https://github.com/davidmarkclements/0x
[Async Hooks (API)]: https://nodejs.org/api/async_hooks.html
[Chrome DevTools Frontend]: https://developer.chrome.com/docs/devtools/
[Chrome DevTools Protocol]: https://chromedevtools.github.io/devtools-protocol/
[Command line Debug Client]: https://nodejs.org/api/debugger.html
[Linux perf]: https://perf.wiki.kernel.org/index.php/Main_Page
[diagnostic report]: https://nodejs.org/api/report.html
[node-clinic]: https://github.com/clinicjs/node-clinic/
[trace_events (API)]: https://nodejs.org/api/tracing.html
