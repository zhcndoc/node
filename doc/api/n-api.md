# Node-API

<!--introduced_in=v8.0.0-->

<!-- type=misc -->

> 稳定性：2 - 稳定

Node-API（以前称为 N-API）是用于构建原生插件的 API。它独立于底层 JavaScript 运行时（例如 V8），并作为 Node.js 本身的一部分进行维护。此 API 将在 Node.js 的各个版本之间保持应用二进制接口（ABI）稳定。它旨在使插件免受底层 JavaScript 引擎变更的影响，并允许为一个主版本编译的模块在后续主版本的 Node.js 上运行而无需重新编译。[ABI 稳定性][] 指南提供了更深入的说明。

插件的构建/打包方式使用与 [C++ 插件][] 部分中概述的方法/工具相同。唯一的区别是原生代码所使用的 API 集。不使用 V8 或 [Node.js 原生抽象][] API，而是使用 Node-API 中可用的函数。

Node-API 暴露的 API 通常用于创建和操作 JavaScript 值。概念和操作通常对应于 ECMA-262 语言规范中指定的概念。API 具有以下属性：

* 所有 Node-API 调用返回类型为 `napi_status` 的状态码。此状态指示 API 调用成功还是失败。
* API 的返回值通过输出参数传递。
* 所有 JavaScript 值都抽象在名为 `napi_value` 的不透明类型背后。
* 如果出现错误状态码，可以使用 `napi_get_last_error_info` 获取更多信息。更多信息可以在错误处理部分 [错误处理][] 中找到。

## 使用各种编程语言编写插件

Node-API 是一个 C API，可确保跨 Node.js 版本和不同编译器级别的 ABI 稳定性。有了这个稳定性保证，可以在 Node-API 之上用其他编程语言编写插件。有关更多编程语言和引擎支持详情，请参阅 [语言和引擎绑定][]。

[`node-addon-api`][] 是官方 C++ 绑定，提供了一种更高效的方式来编写调用 Node-API 的 C++ 代码。此包装器是一个仅头文件的库，提供可内联的 C++ API。使用 `node-addon-api` 构建的二进制文件将依赖于 Node.js 导出的基于 Node-API C 函数的符号。以下代码片段是 `node-addon-api` 的示例：

```cpp
Object obj = Object::New(env);
obj["foo"] = String::New(env, "bar");
```

上述 `node-addon-api` C++ 代码等同于以下基于 C 的 Node-API 代码：

```cpp
napi_status status;
napi_value object, string;
status = napi_create_object(env, &object);
if (status != napi_ok) {
  napi_throw_error(env, ...);
  return;
}

status = napi_create_string_utf8(env, "bar", NAPI_AUTO_LENGTH, &string);
if (status != napi_ok) {
  napi_throw_error(env, ...);
  return;
}

status = napi_set_named_property(env, object, "foo", string);
if (status != napi_ok) {
  napi_throw_error(env, ...);
  return;
}
```

最终结果是插件只使用导出的 C API。即使插件是用 C++ 编写的，它仍然可以获得 C Node-API 提供的 ABI 稳定性的好处。

当使用 `node-addon-api` 而不是 C API 时，请从 `node-addon-api` 的 API [文档][]开始。

[Node-API 资源](https://nodejs.github.io/node-addon-examples/) 为刚刚开始使用 Node-API 和 `node-addon-api` 的开发者提供了极好的指导和建议。额外的媒体资源可以在 [Node-API 媒体][] 页面上找到。

## ABI 稳定性的影响

虽然 Node-API 提供了 ABI 稳定性保证，但 Node.js 的其他部分没有，插件使用的任何外部库也可能没有。特别是，以下任何 API 都不提供跨主版本的 ABI 稳定性保证：

* 通过以下任一方式可用的 Node.js C++ API

  ```cpp
  #include <node.h>
  #include <node_buffer.h>
  #include <node_version.h>
  #include <node_object_wrap.h>
  ```

* 随 Node.js 包含并通过以下方式可用的 libuv API

  ```cpp
  #include <uv.h>
  ```

* 通过以下方式可用的 V8 API

  ```cpp
  #include <v8.h>
  ```

因此，为了使插件在 Node.js 主版本之间保持 ABI 兼容，它必须仅使用 Node-API，限制自己使用

```c
#include <node_api.h>
```

并通过检查其使用的所有外部库，确保外部库做出类似于 Node-API 的 ABI 稳定性保证。

### ABI 稳定性中的枚举值

Node-API 中定义的所有枚举数据类型都应视为固定大小的 `int32_t` 值。位标志枚举类型应有明确文档说明，它们作为位值与位运算符（如位或 (`|`)）配合使用。除非另有说明，否则枚举类型应被视为可扩展的。

新的枚举值将添加到枚举定义的末尾。枚举值不会被移除或重命名。

对于从 Node-API 函数返回的枚举类型，或作为 Node-API 函数的输出参数提供的枚举类型，该值是一个整数值，插件应处理未知值。允许引入新值而无需版本保护。例如，在 switch 语句中检查 `napi_status` 时，插件应包含一个 default 分支，因为新的状态码可能会在较新版本的 Node.js 中引入。

对于用于输入参数的枚举类型，除非另有说明，否则将未知整数值传递给 Node-API 函数的结果是未定义的。新值的添加带有版本保护，以指示引入它的 Node-API 版本。例如，`napi_get_all_property_names` 可以使用新的 `napi_key_filter` 枚举值进行扩展。

对于同时用于输入参数和输出参数的枚举类型，允许引入新值而无需版本保护。

## 构建

与用 JavaScript 编写的模块不同，使用 Node-API 开发和部署 Node.js 原生插件需要额外的一组工具。除了开发 Node.js 所需的基本工具外，原生插件开发者还需要一个可以将 C 和 C++ 代码编译为二进制文件的工具链。此外，根据原生插件的部署方式，原生插件的_用户_也需要安装 C/C++ 工具链。

对于 Linux 开发者，必要的 C/C++ 工具链包现成可用。[GCC][] 在 Node.js 社区中广泛用于在各种平台上构建和测试。对于许多开发者来说，[LLVM][] 编译器基础设施也是一个不错的选择。

对于 Mac 开发者，[Xcode][] 提供了所有所需的编译器工具。但是，没有必要安装整个 Xcode IDE。以下命令安装必要的工具链：

```bash
xcode-select --install
```

对于 Windows 开发者，[Visual Studio][] 提供了所有所需的编译器工具。但是，没有必要安装整个 Visual Studio IDE。以下命令安装必要的工具链：

```bash
npm install --global windows-build-tools
```

以下部分描述了可用于开发和部署 Node.js 原生插件的额外工具。

### 构建工具

此处列出的两个工具都要求原生插件的_用户_安装 C/C++ 工具链才能成功安装原生插件。

#### node-gyp

[node-gyp][] 是一个基于 Google 的 [GYP][] 工具的 [gyp-next][] 分支的构建系统，并与 npm 捆绑在一起。GYP，因此 node-gyp，需要安装 Python。

历史上，node-gyp 一直是构建原生插件的首选工具。它具有广泛的采用率和文档。但是，一些开发者在 node-gyp 中遇到了限制。

#### CMake.js

[CMake.js][] 是一个基于 [CMake][] 的替代构建系统。

CMake.js 对于已经使用 CMake 的项目或受 node-gyp 限制影响的开发者来说是一个不错的选择。[`build_with_cmake`][] 是一个基于 CMake 的原生插件项目的示例。

### 上传预编译二进制文件

此处列出的三个工具允许原生插件开发者和维护者创建并将二进制文件上传到公共或私有服务器。这些工具通常与 [Travis CI][] 和 [AppVeyor][] 等 CI/CD 构建系统集成，以构建和上传各种平台和架构的二进制文件。然后，这些二进制文件可供不需要安装 C/C++ 工具链的用户下载。

#### node-pre-gyp

[node-pre-gyp][] 是一个基于 node-gyp 的工具，增加了将二进制文件上传到开发者选择的服务器的能力。node-pre-gyp 对上传二进制文件到 Amazon S3 有特别好的支持。

#### prebuild

[prebuild][] 是一个支持使用 node-gyp 或 CMake.js 进行构建的工具。与支持各种服务器的 node-pre-gyp 不同，prebuild 仅将二进制文件上传到 [GitHub 发布][]。prebuild 是使用 CMake.js 的 GitHub 项目的不错的选择。

#### prebuildify

[prebuildify][] 是一个基于 node-gyp 的工具。prebuildify 的优势在于，构建的二进制文件在上传到 npm 时与原生插件捆绑在一起。二进制文件从 npm 下载，并在安装原生插件时立即可供模块用户使用。

## 用法

为了使用 Node-API 函数，包含位于 node 开发树 src 目录中的 [`node_api.h`][] 文件：

```c
#include <node_api.h>
```

这将选用给定 Node.js 版本的默认 `NAPI_VERSION`。为了确保与特定版本 Node-API 的兼容性，可以在包含头文件时显式指定版本：

```c
#define NAPI_VERSION 3
#include <node_api.h>
```

这将 Node-API 接口表面限制为仅在指定（及更早）版本中可用的功能。

部分 Node-API 接口表面是实验性的，需要显式选择加入：

```c
#define NAPI_EXPERIMENTAL
#include <node_api.h>
```

在这种情况下，整个 API 表面，包括任何实验性 API，都将对模块代码可用。

偶尔，会引入影响已发布和稳定 API 的实验性功能。这些功能可以通过选择退出来禁用：

```c
#define NAPI_EXPERIMENTAL
#define NODE_API_EXPERIMENTAL_<FEATURE_NAME>_OPT_OUT
#include <node_api.h>
```

其中 `<FEATURE_NAME>` 是影响实验性和稳定 API 的实验性功能的名称。

## Node-API 版本矩阵

直到版本 9，Node-API 版本都是累加的，并且独立于 Node.js 进行版本控制。这意味着任何版本都是前一个版本的扩展，因为它具有前一个版本的所有 API 并添加了一些内容。每个 Node.js 版本仅支持单个 Node-API 版本。例如 v18.15.0 仅支持 Node-API 版本 8。实现 ABI 稳定性是因为 8 是所有先前版本的严格超集。

从版本 9 开始，虽然 Node-API 版本继续独立进行版本控制，但使用 Node-API 版本 9 运行的插件可能需要代码更新才能与 Node-API 版本 10 一起运行。然而，ABI 稳定性得以保持，因为支持高于 8 的 Node-API 版本的 Node.js 版本将支持 8 到它们支持的最高版本之间的所有版本，并且将默认提供版本 8 的 API，除非插件选择加入更高的 Node-API 版本。这种方法提供了更好地优化现有 Node-API 函数的灵活性，同时保持 ABI 稳定性。现有插件可以继续使用较早版本的 Node-API 运行而无需重新编译。如果插件需要来自较新 Node-API 版本的功能，无论如何都需要更改现有代码并重新编译才能使用这些新功能。

在支持 Node-API 版本 9 及更高版本的 Node.js 版本中，定义 `NAPI_VERSION=X` 并使用现有的插件初始化宏会将请求的 Node-API 版本固化到插件中，该版本将在运行时使用。如果未设置 `NAPI_VERSION`，它将默认为 8。

此表在较旧的版本流中可能不是最新的，最新的信息位于最新的 API 文档中：
[Node-API 版本矩阵](https://nodejs.org/docs/latest/api/n-api.html#node-api-version-matrix)

<!-- 为了无障碍目的，此表需要行标题。这意味着我们无法在 markdown 中完成。因此，使用原始 HTML。 -->

<table>
  <tr>
    <th>Node-API 版本</th>
    <th scope="col">支持于</th>
  </tr>
  <tr>
    <th scope="row">10</th>
    <td>v22.14.0+、23.6.0+ 及所有后续版本</td>
  </tr>
  <tr>
    <th scope="row">9</th>
    <td>v18.17.0+、20.3.0+、21.0.0 及所有后续版本</td>
  </tr>
  <tr>
    <th scope="row">8</th>
    <td>v12.22.0+、v14.17.0+、v15.12.0+、16.0.0 及所有后续版本</td>
  </tr>
  <tr>
    <th scope="row">7</th>
    <td>v10.23.0+、v12.19.0+、v14.12.0+、15.0.0 及所有后续版本</td>
  </tr>
  <tr>
    <th scope="row">6</th>
    <td>v10.20.0+、v12.17.0+、14.0.0 及所有后续版本</td>
  </tr>
  <tr>
    <th scope="row">5</th>
    <td>v10.17.0+、v12.11.0+、13.0.0 及所有后续版本</td>
  </tr>
  <tr>
    <th scope="row">4</th>
    <td>v10.16.0+、v11.8.0+、12.0.0 及所有后续版本</td>
  </tr>
  </tr>
    <tr>
    <th scope="row">3</th>
    <td>v6.14.2*、8.11.2+、v9.11.0+*、10.0.0 及所有后续版本</td>
  </tr>
  <tr>
    <th scope="row">2</th>
    <td>v8.10.0+*、v9.3.0+*、10.0.0 及所有后续版本</td>
  </tr>
  <tr>
    <th scope="row">1</th>
    <td>v8.6.0+**、v9.0.0+*、10.0.0 及所有后续版本</td>
  </tr>
</table>

\* Node-API 处于实验阶段。

\*\* Node.js 8.0.0 将 Node-API 作为实验性功能包含在内。它作为 Node-API 版本 1 发布，但一直演变到 Node.js 8.6.0。在 Node.js 8.6.0 之前的版本中，API 有所不同。我们推荐使用 Node-API 版本 3 或更高版本。

每个为 Node-API 记录的 API 都将有一个名为 `添加于：` 的标题，稳定的 API 将会有额外的标题 `Node-API 版本：`。
当使用的 Node.js 版本支持 `Node-API 版本：` 中显示的 Node-API 版本或更高版本时，API 可直接使用。
当使用的 Node.js 版本不支持列出的 `Node-API 版本：` 或者没有列出 `Node-API 版本：` 时，那么只有在包含 `node_api.h` 或 `js_native_api.h` 之前定义了 `#define NAPI_EXPERIMENTAL`，该 API 才可用。如果一个 API 在晚于 `添加于：` 中显示的版本的 Node.js 版本上似乎不可用，那么这很可能是由于明显缺失的原因。

与从原生代码访问 ECMAScript 功能严格相关的 Node-API 可以分别在 `js_native_api.h` 和 `js_native_api_types.h` 中找到。
这些头文件中定义的 API 包含在 `node_api.h` 和 `node_api_types.h` 中。
头文件这样结构化是为了允许在 Node.js 之外实现 Node-API。
对于那些实现，特定于 Node.js 的 API 可能不适用。

插件的特定于 Node.js 的部分可以与向 JavaScript 环境暴露实际功能的代码分离，以便后者可以与多个 Node-API 实现一起使用。在下面的示例中，`addon.c` 和 `addon.h` 仅引用 `js_native_api.h`。这确保了 `addon.c` 可以重用于针对 Node.js 的 Node-API 实现或 Node.js 之外的任何 Node-API 实现进行编译。

`addon_node.c` 是一个单独的文件，包含插件的特定于 Node.js 的入口点，当插件加载到 Node.js 环境时，它通过调用 `addon.c` 来实例化插件。

```c
// addon.h
#ifndef _ADDON_H_
#define _ADDON_H_
#include <js_native_api.h>
napi_value create_addon(napi_env env);
#endif  // _ADDON_H_
```

```c
// addon.c
#include "addon.h"

#define NODE_API_CALL(env, call)                                  \
  do {                                                            \
    napi_status status = (call);                                  \
    if (status != napi_ok) {                                      \
      const napi_extended_error_info* error_info = NULL;          \
      napi_get_last_error_info((env), &error_info);               \
      const char* err_message = error_info->error_message;        \
      bool is_pending;                                            \
      napi_is_exception_pending((env), &is_pending);              \
      /* 如果异常已经挂起，不要重新抛出它 */  \
      if (!is_pending) {                                          \
        const char* message = (err_message == NULL)               \
            ? "empty error message"                               \
            : err_message;                                        \
        napi_throw_error((env), NULL, message);                   \
      }                                                           \
      return NULL;                                                \
    }                                                             \
  } while(0)

static napi_value
DoSomethingUseful(napi_env env, napi_callback_info info) {
  // 做一些有用的事情。
  return NULL;
}

napi_value create_addon(napi_env env) {
  napi_value result;
  NODE_API_CALL(env, napi_create_object(env, &result));

  napi_value exported_function;
  NODE_API_CALL(env, napi_create_function(env,
                                          "doSomethingUseful",
                                          NAPI_AUTO_LENGTH,
                                          DoSomethingUseful,
                                          NULL,
                                          &exported_function));

  NODE_API_CALL(env, napi_set_named_property(env,
                                             result,
                                             "doSomethingUseful",
                                             exported_function));

  return result;
}
```

```c
// addon_node.c
#include <node_api.h>
#include "addon.h"

NAPI_MODULE_INIT(/* napi_env env, napi_value exports */) {
  // 此函数体预期返回一个 `napi_value`。
  // 变量 `napi_env env` 和 `napi_value exports` 可以在内部使用
  // 在函数体内，因为它们由 `NAPI_MODULE_INIT()` 的定义提供。
  return create_addon(env);
}
```

## 环境生命周期 API

[ECMAScript 语言规范][] 的 [Agent 章节][] 将 "Agent" 的概念定义为运行 JavaScript 代码的独立环境。
进程可以并发或按顺序启动和终止多个这样的 Agent。

Node.js 环境对应于一个 ECMAScript Agent。在主进程中，环境在启动时创建，并且可以在单独的线程上创建附加环境以作为 [工作线程][]。当 Node.js 嵌入到另一个应用程序中时，应用程序的主线程也可以在应用程序进程的生命周期内多次构建和销毁 Node.js 环境，以便应用程序创建的每个 Node.js 环境在其生命周期内又可以创建和销毁附加环境作为工作线程。

从原生插件的角度来看，这意味着它提供的绑定可能会被多次调用，来自多个上下文，甚至来自多个线程并发调用。

原生插件可能需要分配全局状态，以便在 Node.js 环境的生命周期内使用，从而使状态对于插件的每个实例都是唯一的。

为此，Node-API 提供了一种关联数据的方法，使其生命周期与 Node.js 环境的生命周期绑定。

### `napi_set_instance_data`

<!-- YAML
added:
 - v12.8.0
 - v10.20.0
napiVersion: 6
-->

```c
napi_status napi_set_instance_data(node_api_basic_env env,
                                   void* data,
                                   napi_finalize finalize_cb,
                                   void* finalize_hint);
```

* `[in] env`：调用 Node-API 的环境。
* `[in] data`：可供此实例绑定使用的数据项。
* `[in] finalize_cb`：当环境被销毁时要调用的函数。该函数接收 `data` 以便释放它。[`napi_finalize`][] 提供了更多细节。
* `[in] finalize_hint`：在收集期间传递给清理回调的可选提示。

如果 API 成功则返回 `napi_ok`。

此 API 将 `data` 与当前运行的 Node.js 环境关联。`data` 稍后可以使用 `napi_get_instance_data()` 检索。任何与当前运行的 Node.js 环境关联的现有数据（通过之前调用 `napi_set_instance_data()` 设置）将被覆盖。如果之前的调用提供了 `finalize_cb`，它将不会被调用。

### `napi_get_instance_data`

<!-- YAML
added:
 - v12.8.0
 - v10.20.0
napiVersion: 6
-->

```c
napi_status napi_get_instance_data(node_api_basic_env env,
                                   void** data);
```

* `[in] env`：调用 Node-API 的环境。
* `[out] data`：之前通过调用 `napi_set_instance_data()` 与当前运行的 Node.js 环境关联的数据项。

如果 API 成功则返回 `napi_ok`。

此 API 检索之前通过 `napi_set_instance_data()` 与当前运行的 Node.js 环境关联的数据。如果没有设置数据，调用将成功并且 `data` 将设置为 `NULL`。

## 基本 Node-API 数据类型

Node-API 将以下基本数据类型公开为抽象，供各种 API 使用。这些 API 应被视为不透明的，只能通过其他 Node-API 调用进行内省。

### `napi_status`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

表示 Node-API 调用成功或失败的整数状态码。目前支持以下状态码。

```c
typedef enum {
  napi_ok,
  napi_invalid_arg,
  napi_object_expected,
  napi_string_expected,
  napi_name_expected,
  napi_function_expected,
  napi_number_expected,
  napi_boolean_expected,
  napi_array_expected,
  napi_generic_failure,
  napi_pending_exception,
  napi_cancelled,
  napi_escape_called_twice,
  napi_handle_scope_mismatch,
  napi_callback_scope_mismatch,
  napi_queue_full,
  napi_closing,
  napi_bigint_expected,
  napi_date_expected,
  napi_arraybuffer_expected,
  napi_detachable_arraybuffer_expected,
  napi_would_deadlock,  /* 未使用 */
  napi_no_external_buffers_allowed,
  napi_cannot_run_js
} napi_status;
```

如果 API 返回失败状态时需要更多信息，可以通过调用 `napi_get_last_error_info` 获取。

### `napi_extended_error_info`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
typedef struct {
  const char* error_message;
  void* engine_reserved;
  uint32_t engine_error_code;
  napi_status error_code;
} napi_extended_error_info;
```

* `error_message`：包含与 VM 无关的错误描述的 UTF8 编码字符串。
* `engine_reserved`：保留用于特定于 VM 的错误详细信息。目前尚未为任何 VM 实现。
* `engine_error_code`：特定于 VM 的错误代码。目前尚未为任何 VM 实现。
* `error_code`：源自最后一个错误的 Node-API 状态码。

有关更多信息，请参阅 [错误处理][] 部分。

### `napi_env`

`napi_env` 用于表示底层 Node-API 实现可用于持久化特定于 VM 的状态的上下文。此结构在调用原生函数时传递给它们，并且在发出 Node-API 调用时必须传回。具体来说，调用初始原生函数时传入的同一个 `napi_env` 必须传递给任何后续的嵌套 Node-API 调用。不允许为了通用重用而缓存 `napi_env`，也不允许在运行于不同 [`Worker`][] 线程的同一插件实例之间传递 `napi_env`。当原生插件实例卸载时，`napi_env` 变为无效。此事件通过传递给 [`napi_add_env_cleanup_hook`][] 和 [`napi_set_instance_data`][] 的回调进行通知。

### `node_api_basic_env`

> 稳定性：1 - 实验性

`napi_env` 的此变体传递给同步终结器（[`node_api_basic_finalize`][]）。有一部分 Node-API 接受类型为 `node_api_basic_env` 的参数作为它们的第一个参数。这些 API 不访问 JavaScript 引擎的状态，因此可以安全地从同步终结器调用。允许将类型为 `napi_env` 的参数传递给这些 API，但是，不允许将类型为 `node_api_basic_env` 的参数传递给访问 JavaScript 引擎状态的 API。尝试在不进行转换的情况下这样做，在使用导致传递不正确指针类型时发出警告和/或错误的标志编译插件时，将产生编译器警告或错误。从同步终结器调用此类 API 最终将导致应用程序终止。

### `napi_value`

这是一个用于表示 JavaScript 值的不透明指针。

### `napi_threadsafe_function`

<!-- YAML
added: v10.6.0
napiVersion: 4
-->

这是一个不透明指针，表示一个 JavaScript 函数，可以通过 `napi_call_threadsafe_function()` 从多个线程异步调用。

### `napi_threadsafe_function_release_mode`

<!-- YAML
added: v10.6.0
napiVersion: 4
-->

传递给 `napi_release_threadsafe_function()` 的值，用于指示线程安全函数是立即关闭（`napi_tsfn_abort`）还是仅释放（`napi_tsfn_release`），从而可通过 `napi_acquire_threadsafe_function()` 和 `napi_call_threadsafe_function()` 供后续使用。

```c
typedef enum {
  napi_tsfn_release,
  napi_tsfn_abort
} napi_threadsafe_function_release_mode;
```

### `napi_threadsafe_function_call_mode`

<!-- YAML
added: v10.6.0
napiVersion: 4
-->

传递给 `napi_call_threadsafe_function()` 的值，用于指示当与线程安全函数关联的队列已满时，调用是否应该阻塞。

```c
typedef enum {
  napi_tsfn_nonblocking,
  napi_tsfn_blocking
} napi_threadsafe_function_call_mode;
```

### Node-API 内存管理类型

#### `napi_handle_scope`

这是一种抽象，用于控制和修改在特定作用域内创建的对象的生存期。通常，Node-API 值是在句柄作用域的上下文中创建的。当从 JavaScript 调用原生方法时，将存在一个默认句柄作用域。如果用户没有显式创建新的句柄作用域，Node-API 值将在默认句柄作用域中创建。对于原生方法执行之外的任何代码调用（例如，在 libuv 回调调用期间），模块必须在调用任何可能导致创建 JavaScript 值的函数之前创建作用域。

句柄作用域使用 [`napi_open_handle_scope`][] 创建，并使用 [`napi_close_handle_scope`][] 销毁。关闭作用域可以向 GC 指示，在句柄作用域生存期内创建的所有 `napi_value` 不再从当前堆栈帧引用。

有关更多详细信息，请查阅 [对象生命周期管理][]。

#### `napi_escapable_handle_scope`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

可逃逸句柄作用域是一种特殊类型的句柄作用域，用于将在特定句柄作用域内创建的值返回给父作用域。

#### `napi_ref`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

这是用于引用 `napi_value` 的抽象。这允许用户管理 JavaScript 值的生存期，包括显式定义它们的最小生存期。

有关更多详细信息，请查阅 [对象生命周期管理][]。

#### `napi_type_tag`

<!-- YAML
added:
  - v14.8.0
  - v12.19.0
napiVersion: 8
-->

一个存储为两个无符号 64 位整数的 128 位值。它用作 UUID，JavaScript 对象或 [外部对象][] 可以被打上此标签，以确保它们属于某种类型。这比 [`napi_instanceof`][] 更严格，因为如果对象的原型被操纵，后者可能会报告误报。类型标记与 [`napi_wrap`][] 结合使用最有用，因为它确保从包装对象检索的指针可以安全地转换为与之前应用于 JavaScript 对象的类型标记对应的原生类型。

```c
typedef struct {
  uint64_t lower;
  uint64_t upper;
} napi_type_tag;
```

#### `napi_async_cleanup_hook_handle`

<!-- YAML
added:
  - v14.10.0
  - v12.19.0
-->

由 [`napi_add_async_cleanup_hook`][] 返回的不透明值。当异步清理事件链完成时，必须将其传递给 [`napi_remove_async_cleanup_hook`][]。

### Node-API 回调类型

#### `napi_callback_info`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

传递给回调函数的不透明数据类型。它可用于获取有关调用回调的上下文的更多信息。

#### `napi_callback`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

用于用户提供的原生函数的函数指针类型，这些函数将通过 Node-API 暴露给 JavaScript。回调函数应满足以下签名：

```c
typedef napi_value (*napi_callback)(napi_env, napi_callback_info);
```

除非出于 [对象生命周期管理][] 中讨论的原因，否则在 `napi_callback` 内部创建句柄和/或回调作用域是不必要的。

#### `node_api_basic_finalize`

<!-- YAML
added:
  - v21.6.0
  - v20.12.0
  - v18.20.0
-->

> 稳定性：1 - 实验性

用于插件提供的函数的函数指针类型，允许用户在外部拥有的数据准备好清理时收到通知，因为与其关联的对象已被垃圾回收。用户必须提供一个满足以下签名的函数，该函数将在对象回收时被调用。目前，`node_api_basic_finalize` 可用于查明具有外部数据的对象何时被回收。

```c
typedef void (*node_api_basic_finalize)(node_api_basic_env env,
                                      void* finalize_data,
                                      void* finalize_hint);
```

除非出于 [对象生命周期管理][] 中讨论的原因，否则在函数体内创建句柄和/或回调作用域是不必要的。

由于这些函数可能在 JavaScript 引擎处于无法执行 JavaScript 代码的状态时被调用，因此只能调用接受 `node_api_basic_env` 作为第一个参数的 Node-API。[`node_api_post_finalizer`][] 可用于调度需要访问 JavaScript 引擎状态的 Node-API 调用，以便在当前垃圾回收周期完成后运行。

在 [`node_api_create_external_string_latin1`][] 和 [`node_api_create_external_string_utf16`][] 的情况下，`env` 参数可能为 null，因为外部字符串可以在环境关闭的后期被回收。

变更历史：

* 实验性 (`NAPI_EXPERIMENTAL`)：

  只能调用接受 `node_api_basic_env` 作为第一个参数的 Node-API 调用，否则应用程序将终止并显示适当的错误消息。通过定义 `NODE_API_EXPERIMENTAL_BASIC_ENV_OPT_OUT` 可以关闭此功能。

#### `napi_finalize`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

用于插件提供的函数的函数指针类型，允许用户响应垃圾回收事件调度一组对 Node-API 的调用，在垃圾回收周期完成后。这些函数指针可以与 [`node_api_post_finalizer`][] 一起使用。

```c
typedef void (*napi_finalize)(napi_env env,
                              void* finalize_data,
                              void* finalize_hint);
```

变更历史：

* 实验性（定义了 `NAPI_EXPERIMENTAL`）：

  此类型的函数不再可用作终结器，除非与 [`node_api_post_finalizer`][] 一起使用。必须改用 [`node_api_basic_finalize`][]。通过定义 `NODE_API_EXPERIMENTAL_BASIC_ENV_OPT_OUT` 可以关闭此功能。

#### `napi_async_execute_callback`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

与支持异步操作的函数一起使用的函数指针。回调函数必须满足以下签名：

```c
typedef void (*napi_async_execute_callback)(napi_env env, void* data);
```

此函数的实现必须避免进行执行 JavaScript 或与 JavaScript 对象交互的 Node-API 调用。Node-API 调用应在 `napi_async_complete_callback` 中。不要使用 `napi_env` 参数，因为它很可能导致执行 JavaScript。

#### `napi_async_complete_callback`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

与支持异步操作的函数一起使用的函数指针。回调函数必须满足以下签名：

```c
typedef void (*napi_async_complete_callback)(napi_env env,
                                             napi_status status,
                                             void* data);
```

除非出于 [对象生命周期管理][] 中讨论的原因，否则在函数体内创建句柄和/或回调作用域是不必要的。

#### `napi_threadsafe_function_call_js`

<!-- YAML
added: v10.6.0
napiVersion: 4
-->

与异步线程安全函数调用一起使用的函数指针。回调将在主线程上调用。其目的是使用通过队列从其中一个辅助线程到达的数据项来构建调用 JavaScript 所需的参数，通常通过 `napi_call_function`，然后进行 JavaScript 调用。

通过队列从辅助线程到达的数据在 `data` 参数中给出，要调用的 JavaScript 函数在 `js_callback` 参数中给出。

Node-API 在调用此回调之前设置环境，因此足以通过 `napi_call_function` 而不是 `napi_make_callback` 调用 JavaScript 函数。

回调函数必须满足以下签名：

```c
typedef void (*napi_threadsafe_function_call_js)(napi_env env,
                                                 napi_value js_callback,
                                                 void* context,
                                                 void* data);
```

* `[输入] env`：用于 API 调用的环境，如果线程安全函数正在被销毁且可能需要释放 `data`，则为 `NULL`。
* `[输入] js_callback`：要调用的 JavaScript 函数，如果线程安全函数正在被销毁且可能需要释放 `data`，则为 `NULL`。如果创建线程安全函数时没有 `js_callback`，它也可能为 `NULL`。
* `[输入] context`：创建线程安全函数时的可选数据。
* `[输入] data`：由辅助线程创建的数据。回调有责任将此原生数据转换为 JavaScript 值（使用 Node-API 函数），以便在调用 `js_callback` 时作为参数传递。此指针完全由线程和此回调管理。因此，此回调应释放数据。

除非出于 [对象生命周期管理][] 中讨论的原因，否则在函数体内创建句柄和/或回调作用域是不必要的。

#### `napi_cleanup_hook`

<!-- YAML
added:
  - v19.2.0
  - v18.13.0
napiVersion: 3
-->

与 [`napi_add_env_cleanup_hook`][] 一起使用的函数指针。当环境正在被销毁时将调用它。

回调函数必须满足以下签名：

```c
typedef void (*napi_cleanup_hook)(void* data);
```

* `[输入] data`：传递给 [`napi_add_env_cleanup_hook`][] 的数据。

#### `napi_async_cleanup_hook`

<!-- YAML
added:
  - v14.10.0
  - v12.19.0
-->

与 [`napi_add_async_cleanup_hook`][] 一起使用的函数指针。当环境正在被销毁时将调用它。

回调函数必须满足以下签名：

```c
typedef void (*napi_async_cleanup_hook)(napi_async_cleanup_hook_handle handle,
                                        void* data);
```

* `[输入] handle`：异步清理完成后必须传递给 [`napi_remove_async_cleanup_hook`][] 的句柄。
* `[输入] data`：传递给 [`napi_add_async_cleanup_hook`][] 的数据。

函数体应启动异步清理操作，在此操作结束时，必须在调用 [`napi_remove_async_cleanup_hook`][] 时传入 `handle`。

## 错误处理

Node-API 使用返回值和 JavaScript 异常来进行错误处理。
以下部分解释每种情况的方法。

### 返回值

所有 Node-API 函数共享相同的错误处理模式。
所有 API 函数的返回类型都是 `napi_status`。

如果请求成功且未抛出未捕获的 JavaScript 异常，返回值将为 `napi_ok`。如果发生错误并且抛出了异常，将返回该错误的 `napi_status` 值。如果抛出了异常且未发生错误，将返回 `napi_pending_exception`。

如果返回值不是 `napi_ok` 或 `napi_pending_exception`，则必须调用 [`napi_is_exception_pending`][] 来检查是否有待处理异常。
有关更多详细信息，请参阅异常部分。

所有可能的 `napi_status` 值全集定义在 `napi_api_types.h` 中。

`napi_status` 返回值提供了所发生错误的与虚拟机无关的表示。在某些情况下，能够获取更详细的信息是有用的，包括表示错误的字符串以及虚拟机（引擎）特定的信息。

为了检索此信息，提供了 [`napi_get_last_error_info`][]，它返回一个 `napi_extended_error_info` 结构体。
`napi_extended_error_info` 结构体的格式如下：

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
typedef struct napi_extended_error_info {
  const char* error_message;
  void* engine_reserved;
  uint32_t engine_error_code;
  napi_status error_code;
};
```

* `error_message`：所发生错误的文本表示。
* `engine_reserved`：仅供引擎使用的不透明句柄。
* `engine_error_code`：虚拟机特定的错误代码。
* `error_code`：最后一个错误的 Node-API 状态代码。

[`napi_get_last_error_info`][] 返回最后一次 Node-API 调用的信息。

不要依赖任何扩展信息的内容或格式，因为它不受 SemVer 约束，并且可能随时更改。它仅用于日志记录目的。

#### `napi_get_last_error_info`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status
napi_get_last_error_info(node_api_basic_env env,
                         const napi_extended_error_info** result);
```

* `[in] env`：调用 API 所处的环境。
* `[out] result`：包含有关错误的更多信息的 `napi_extended_error_info` 结构体。

如果 API 成功，返回 `napi_ok`。

此 API 检索包含有关最后发生错误的信息的 `napi_extended_error_info` 结构体。

返回的 `napi_extended_error_info` 的内容仅在同一 `env` 上调用 Node-API 函数之前有效。这包括调用 `napi_is_exception_pending`，因此通常有必要复制信息以便以后使用。`error_message` 中返回的指针指向一个静态定义的字符串，因此如果在调用另一个 Node-API 函数之前将其从 `error_message` 字段（将被覆盖）中复制出来，使用该指针是安全的。

不要依赖任何扩展信息的内容或格式，因为它不受 SemVer 约束，并且可能随时更改。它仅用于日志记录目的。

即使存在待处理的 JavaScript 异常，也可以调用此 API。

### 异常

任何 Node-API 函数调用都可能导致待处理的 JavaScript 异常。
任何 API 函数都是如此，即使是那些可能不会导致执行 JavaScript 的函数。

如果函数返回的 `napi_status` 是 `napi_ok`，则没有待处理异常，不需要额外操作。如果返回的 `napi_status` 不是 `napi_ok` 或 `napi_pending_exception`，为了尝试恢复并继续而不是简单地立即返回，必须调用 [`napi_is_exception_pending`][] 以确定是否有待处理异常。

在许多情况下，当调用 Node-API 函数且异常已经待处理时，该函数将立即返回，`napi_status` 为 `napi_pending_exception`。然而，并非所有函数都是如此。Node-API 允许调用子集函数，以便在返回 JavaScript 之前进行一些最小的清理。在这种情况下，`napi_status` 将反映该函数的状态。它不会反映之前的待处理异常。为避免混淆，请在每次函数调用后检查错误状态。

当异常待处理时，可以采用两种方法之一。

第一种方法是进行任何适当的清理，然后返回，以便执行权返回到 JavaScript。作为返回 JavaScript 过渡的一部分，异常将在调用原生方法的 JavaScript 代码点处抛出。当异常待处理时，大多数 Node-API 调用的行为是未指定的，许多将简单地返回 `napi_pending_exception`，因此请尽可能少做操作，然后返回到可以处理异常的 JavaScript。

第二种方法是尝试处理异常。有些情况下，原生代码可以捕获异常，采取适当的操作，然后继续。仅在已知可以安全处理异常的特定情况下推荐这样做。在这些情况下，可以使用 [`napi_get_and_clear_last_exception`][] 来获取并清除异常。成功时，result 将包含最后抛出的 JavaScript `Object` 的句柄。如果在检索异常后确定异常根本无法处理，可以使用 [`napi_throw`][] 将其重新抛出，其中 error 是要抛出的 JavaScript 值。

如果原生代码需要抛出异常或确定 `napi_value` 是否是 JavaScript `Error` 对象的实例，还可以使用以下实用函数：[`napi_throw_error`][]、[`napi_throw_type_error`][]、[`napi_throw_range_error`][]、[`node_api_throw_syntax_error`][] 和 [`napi_is_error`][]。

如果原生代码需要创建 `Error` 对象，还可以使用以下实用函数：[`napi_create_error`][]、[`napi_create_type_error`][]、[`napi_create_range_error`][] 和 [`node_api_create_syntax_error`][]，其中 result 是引用新创建的 JavaScript `Error` 对象的 `napi_value`。

Node.js 项目正在为所有内部生成的错误添加错误代码。目标是让应用程序使用这些错误代码进行所有错误检查。相关的错误消息将保留，但仅用于日志记录和显示，预期消息可以在不适用 SemVer 的情况下更改。为了在 Node-API 中支持此模型，无论是在内部功能还是模块特定功能中（作为一种良好实践），`throw_` 和 `create_` 函数都接受一个可选的 code 参数，该参数是添加到错误对象的代码字符串。如果可选参数为 `NULL`，则不会与错误关联任何代码。如果提供了代码，与错误关联的名称也将更新为：

```text
originalName [code]
```

其中 `originalName` 是与错误关联的原始名称，`code` 是提供的代码。例如，如果代码是 `'ERR_ERROR_1'` 并且正在创建 `TypeError`，则名称将为：

```text
TypeError [ERR_ERROR_1]
```

#### `napi_throw`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
NAPI_EXTERN napi_status napi_throw(napi_env env, napi_value error);
```

* `[in] env`：调用 API 所处的环境。
* `[in] error`：要抛出的 JavaScript 值。

如果 API 成功，返回 `napi_ok`。

此 API 抛出提供的 JavaScript 值。

#### `napi_throw_error`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
NAPI_EXTERN napi_status napi_throw_error(napi_env env,
                                         const char* code,
                                         const char* msg);
```

* `[in] env`：调用 API 所处的环境。
* `[in] code`：要在错误上设置的可选错误代码。
* `[in] msg`：C 字符串，表示与错误关联的文本。

如果 API 成功，返回 `napi_ok`。

此 API 抛出带有提供文本的 JavaScript `Error`。

#### `napi_throw_type_error`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
NAPI_EXTERN napi_status napi_throw_type_error(napi_env env,
                                              const char* code,
                                              const char* msg);
```

* `[in] env`：调用 API 所处的环境。
* `[in] code`：要在错误上设置的可选错误代码。
* `[in] msg`：C 字符串，表示与错误关联的文本。

如果 API 成功，返回 `napi_ok`。

此 API 抛出带有提供文本的 JavaScript `TypeError`。

#### `napi_throw_range_error`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
NAPI_EXTERN napi_status napi_throw_range_error(napi_env env,
                                               const char* code,
                                               const char* msg);
```

* `[in] env`：调用 API 所处的环境。
* `[in] code`：要在错误上设置的可选错误代码。
* `[in] msg`：C 字符串，表示与错误关联的文本。

如果 API 成功，返回 `napi_ok`。

此 API 抛出带有提供文本的 JavaScript `RangeError`。

#### `node_api_throw_syntax_error`

<!-- YAML
added:
  - v17.2.0
  - v16.14.0
napiVersion: 9
-->

```c
NAPI_EXTERN napi_status node_api_throw_syntax_error(napi_env env,
                                                    const char* code,
                                                    const char* msg);
```

* `[in] env`：调用 API 所处的环境。
* `[in] code`：要在错误上设置的可选错误代码。
* `[in] msg`：C 字符串，表示与错误关联的文本。

如果 API 成功，返回 `napi_ok`。

此 API 抛出带有提供文本的 JavaScript `SyntaxError`。

#### `napi_is_error`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
NAPI_EXTERN napi_status napi_is_error(napi_env env,
                                      napi_value value,
                                      bool* result);
```

* `[in] env`：调用 API 所处的环境。
* `[in] value`：要检查的 `napi_value`。
* `[out] result`：布尔值，如果 `napi_value` 表示错误则设置为 true，否则为 false。

如果 API 成功，返回 `napi_ok`。

此 API 查询 `napi_value` 以检查它是否表示错误对象。

#### `napi_create_error`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
NAPI_EXTERN napi_status napi_create_error(napi_env env,
                                          napi_value code,
                                          napi_value msg,
                                          napi_value* result);
```

* `[in] env`：调用 API 所处的环境。
* `[in] code`：可选的 `napi_value`，带有要与错误关联的错误代码字符串。
* `[in] msg`：`napi_value`，引用要用作 `Error` 消息的 JavaScript `string`。
* `[out] result`：`napi_value`，表示创建的错误。

如果 API 成功，返回 `napi_ok`。

此 API 返回带有提供文本的 JavaScript `Error`。

#### `napi_create_type_error`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
NAPI_EXTERN napi_status napi_create_type_error(napi_env env,
                                               napi_value code,
                                               napi_value msg,
                                               napi_value* result);
```

* `[in] env`：调用 API 所处的环境。
* `[in] code`：可选的 `napi_value`，带有要与错误关联的错误代码字符串。
* `[in] msg`：`napi_value`，引用要用作 `Error` 消息的 JavaScript `string`。
* `[out] result`：`napi_value`，表示创建的错误。

如果 API 成功，返回 `napi_ok`。

此 API 返回带有提供文本的 JavaScript `TypeError`。

#### `napi_create_range_error`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
NAPI_EXTERN napi_status napi_create_range_error(napi_env env,
                                                napi_value code,
                                                napi_value msg,
                                                napi_value* result);
```

* `[in] env`：调用 API 所处的环境。
* `[in] code`：可选的 `napi_value`，带有要与错误关联的错误代码字符串。
* `[in] msg`：`napi_value`，引用要用作 `Error` 消息的 JavaScript `string`。
* `[out] result`：`napi_value`，表示创建的错误。

如果 API 成功，返回 `napi_ok`。

此 API 返回带有提供文本的 JavaScript `RangeError`。

#### `node_api_create_syntax_error`

<!-- YAML
added:
  - v17.2.0
  - v16.14.0
napiVersion: 9
-->

```c
NAPI_EXTERN napi_status node_api_create_syntax_error(napi_env env,
                                                     napi_value code,
                                                     napi_value msg,
                                                     napi_value* result);
```

* `[in] env`：调用 API 所处的环境。
* `[in] code`：可选的 `napi_value`，带有要与错误关联的错误代码字符串。
* `[in] msg`：`napi_value`，引用要用作 `Error` 消息的 JavaScript `string`。
* `[out] result`：`napi_value`，表示创建的错误。

如果 API 成功，返回 `napi_ok`。

此 API 返回带有提供文本的 JavaScript `SyntaxError`。

#### `napi_get_and_clear_last_exception`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_get_and_clear_last_exception(napi_env env,
                                              napi_value* result);
```

* `[in] env`：调用 API 所处的环境。
* `[out] result`：如果有待处理异常则为该异常，否则为 `NULL`。

如果 API 成功，返回 `napi_ok`。

即使存在待处理的 JavaScript 异常，也可以调用此 API。

#### `napi_is_exception_pending`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_is_exception_pending(napi_env env, bool* result);
```

* `[in] env`：调用 API 所处的环境。
* `[out] result`：布尔值，如果有待处理异常则设置为 true。

如果 API 成功，返回 `napi_ok`。

即使存在待处理的 JavaScript 异常，也可以调用此 API。

#### `napi_fatal_exception`

<!-- YAML
added: v9.10.0
napiVersion: 3
-->

```c
napi_status napi_fatal_exception(napi_env env, napi_value err);
```

* `[in] env`：调用 API 所处的环境。
* `[in] err`：传递给 `'uncaughtException'` 的错误。

在 JavaScript 中触发 `'uncaughtException'`。如果异步回调抛出异常且无法恢复，则很有用。

### 致命错误

如果原生插件中发生不可恢复的错误，可以抛出致命错误以立即终止进程。

#### `napi_fatal_error`

<!-- YAML
added: v8.2.0
napiVersion: 1
-->

```c
NAPI_NO_RETURN void napi_fatal_error(const char* location,
                                     size_t location_len,
                                     const char* message,
                                     size_t message_len);
```

* `[in] location`：错误发生的可选位置。
* `[in] location_len`：位置的长度（字节），如果是以空字符结尾则为 `NAPI_AUTO_LENGTH`。
* `[in] message`：与错误关联的消息。
* `[in] message_len`：消息的长度（字节），如果是以空字符结尾则为 `NAPI_AUTO_LENGTH`。

函数调用不会返回，进程将被终止。

即使存在待处理的 JavaScript 异常，也可以调用此 API。

## 对象生命周期管理

随着进行 Node-API 调用，底层虚拟机堆中对象的句柄可能会作为 `napi_values` 返回。这些句柄必须保持对象“存活”，直到原生代码不再需要它们，否则对象可能在原生代码使用完毕之前就被回收了。

当对象句柄被返回时，它们会与一个“作用域”关联。默认作用域的生命周期与原生方法调用的生命周期绑定。结果是，默认情况下，句柄保持有效，且与这些句柄关联的对象将在原生方法调用的生命周期内保持存活。

然而，在许多情况下，需要句柄的有效期比原生方法的生命周期更短或更长。接下来的章节描述了可用于更改句柄生命周期（相对于默认值）的 Node-API 函数。

### 使句柄生命周期短于原生方法

通常有必要使句柄的生命周期短于原生方法的生命周期。例如，考虑一个原生方法，它有一个循环遍历大数组中的元素：

```c
for (int i = 0; i < 1000000; i++) {
  napi_value result;
  napi_status status = napi_get_element(env, object, i, &result);
  if (status != napi_ok) {
    break;
  }
  // 对元素执行某些操作
}
```

这将导致创建大量句柄，消耗大量资源。此外，即使原生代码只能使用最新的句柄，所有关联的对象也将保持存活，因为它们都共享同一个作用域。

为了处理这种情况，Node-API 提供了建立新“作用域”的能力，新创建的句柄将与该作用域关联。一旦不再需要这些句柄，可以“关闭”该作用域，与该作用域关联的任何句柄都将失效。可用于打开/关闭作用域的方法是 [`napi_open_handle_scope`][] 和 [`napi_close_handle_scope`][]。

Node-API 仅支持单一嵌套层次结构的作用域。任何时刻只有一个活动作用域，所有新句柄在该作用域活动时都将与其关联。作用域必须按照与打开顺序相反的顺序关闭。此外，在原生方法内创建的所有作用域必须在从该方法返回之前关闭。

以前面的示例为例，添加对 [`napi_open_handle_scope`][] 和 [`napi_close_handle_scope`][] 的调用将确保在整个循环执行过程中最多只有一个句柄有效：

```c
for (int i = 0; i < 1000000; i++) {
  napi_handle_scope scope;
  napi_status status = napi_open_handle_scope(env, &scope);
  if (status != napi_ok) {
    break;
  }
  napi_value result;
  status = napi_get_element(env, object, i, &result);
  if (status != napi_ok) {
    break;
  }
  // 对元素执行某些操作
  status = napi_close_handle_scope(env, scope);
  if (status != napi_ok) {
    break;
  }
}
```

在嵌套作用域时，有时内部作用域中的句柄需要比该作用域的生命周期存活得更久。Node-API 支持“可逃逸作用域”以支持这种情况。可逃逸作用域允许将一个句柄“提升”，以便它“逃逸”当前作用域，句柄的生命周期从当前作用域变为外部作用域的生命周期。

可用于打开/关闭可逃逸作用域的方法是 [`napi_open_escapable_handle_scope`][] 和 [`napi_close_escapable_handle_scope`][]。

提升句柄的请求是通过 [`napi_escape_handle`][] 发出的，该函数只能调用一次。

#### `napi_open_handle_scope`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
NAPI_EXTERN napi_status napi_open_handle_scope(napi_env env,
                                               napi_handle_scope* result);
```

* `[in] env`: API 被调用下的环境。
* `[out] result`: `napi_value` 表示新作用域。

如果 API 成功则返回 `napi_ok`。

此 API 打开一个新作用域。

#### `napi_close_handle_scope`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
NAPI_EXTERN napi_status napi_close_handle_scope(napi_env env,
                                                napi_handle_scope scope);
```

* `[in] env`: API 被调用下的环境。
* `[in] scope`: `napi_value` 表示要关闭的作用域。

如果 API 成功则返回 `napi_ok`。

此 API 关闭传入的作用域。作用域必须按照与创建顺序相反的顺序关闭。

即使存在待处理的 JavaScript 异常，也可以调用此 API。

#### `napi_open_escapable_handle_scope`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
NAPI_EXTERN napi_status
    napi_open_escapable_handle_scope(napi_env env,
                                     napi_handle_scope* result);
```

* `[in] env`：API 被调用下的环境。
* `[out] result`：`napi_value` 表示新作用域。

如果 API 成功则返回 `napi_ok`。

此 API 打开一个新作用域，其中一个对象可以从该作用域提升到外部作用域。

#### `napi_close_escapable_handle_scope`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
NAPI_EXTERN napi_status
    napi_close_escapable_handle_scope(napi_env env,
                                      napi_handle_scope scope);
```

* `[in] env`：API 被调用下的环境。
* `[in] scope`: `napi_value` 表示要关闭的作用域。

如果 API 成功则返回 `napi_ok`。

此 API 关闭传入的作用域。作用域必须按照与创建顺序相反的顺序关闭。

即使存在待处理的 JavaScript 异常，也可以调用此 API。

#### `napi_escape_handle`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_escape_handle(napi_env env,
                               napi_escapable_handle_scope scope,
                               napi_value escapee,
                               napi_value* result);
```

* `[in] env`：API 被调用下的环境。
* `[in] scope`: `napi_value` 表示当前作用域。
* `[in] escapee`: `napi_value` 表示要逃逸的 JavaScript `Object`。
* `[out] result`：`napi_value` 表示外部作用域中逃逸的 `Object` 的句柄。

如果 API 成功则返回 `napi_ok`。

此 API 将 JavaScript 对象的句柄提升，以便它在外部作用域的生命周期内有效。每个作用域只能调用一次。如果调用多次，将返回错误。

即使存在待处理的 JavaScript 异常，也可以调用此 API。

### 对生命周期长于原生方法的值的引用

在某些情况下，插件需要能够创建和引用生命周期长于单次原生方法调用的值。例如，要创建一个构造函数，稍后在创建实例的请求中使用该构造函数，必须能够在许多不同的实例创建请求中引用构造函数对象。使用前面章节中描述的作为 `napi_value` 返回的普通句柄是不可能的。普通句柄的生命周期由作用域管理，所有作用域必须在原生方法结束之前关闭。

Node-API 提供了创建值的持久引用的方法。目前 Node-API 仅允许为有限的值类型创建引用，包括对象、外部对象、函数和符号。

每个引用都有一个关联的计数，值为 0 或更高，这决定了引用是否会使相应的值保持存活。计数为 0 的引用不会阻止值被回收。对象（对象、函数、外部对象）和符号类型的值变为“弱”引用，并且在未被回收时仍可访问。任何大于 0 的计数都将阻止值被回收。

Symbol 值有不同的种类。真正的弱引用行为仅支持通过 `napi_create_symbol` 函数或 JavaScript `Symbol()` 构造函数调用创建的本地符号。通过 `node_api_symbol_for` 函数或 JavaScript `Symbol.for()` 函数调用创建的全局注册符号始终保持强引用，因为垃圾回收器不会回收它们。知名符号（如 `Symbol.iterator`）也是如此。它们也永远不会被垃圾回收器回收。

创建引用时可以带有初始引用计数。然后可以通过 [`napi_reference_ref`][] 和 [`napi_reference_unref`][] 修改计数。如果对象在引用的计数为 0 时被回收，所有后续调用获取与引用关联的对象的 [`napi_get_reference_value`][] 将为返回的 `napi_value` 返回 `NULL`。尝试为对象已被回收的引用调用 [`napi_reference_ref`][] 会导致错误。

引用在不再被插件需要时必须被删除。当引用被删除时，它将不再阻止相应的对象被回收。未能删除持久引用会导致“内存泄漏”，持久引用的原生内存和堆上相应的对象将被永远保留。

可以创建多个持久引用来引用同一个对象，每个引用将根据其单独的计数保持对象存活或不存活。对同一对象的多个持久引用可能导致意外地保持原生内存存活。持久引用的原生结构必须保持存活，直到被引用对象的终结器被执行。如果为同一对象创建了新的持久引用，则该对象的终结器将不会运行，并且早期持久引用指向的原生内存将不会被释放。可以通过在可能时调用 `napi_delete_reference` 以及 `napi_reference_unref` 来避免这种情况。

**变更历史：**

* 版本 10（`NAPI_VERSION` 定义为 `10` 或更高）：

  可以为所有值类型创建引用。新支持的值类型不支持弱引用语义，当引用计数变为 0 时，这些类型的值将被释放，并且无法再从引用访问。

#### `napi_create_reference`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
NAPI_EXTERN napi_status napi_create_reference(napi_env env,
                                              napi_value value,
                                              uint32_t initial_refcount,
                                              napi_ref* result);
```

* `[in] env`: API 被调用下的环境。
* `[in] value`: 要为其创建引用的 `napi_value`。
* `[in] initial_refcount`: 新引用的初始引用计数。
* `[out] result`: `napi_ref` 指向新引用。

如果 API 成功则返回 `napi_ok`。

此 API 为传入的值创建具有指定引用计数的新引用。

#### `napi_delete_reference`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
NAPI_EXTERN napi_status napi_delete_reference(napi_env env, napi_ref ref);
```

* `[in] env`: API 被调用下的环境。
* `[in] ref`: 要删除的 `napi_ref`。

如果 API 成功则返回 `napi_ok`。

此 API 删除传入的引用。

即使存在待处理的 JavaScript 异常，也可以调用此 API。

#### `napi_reference_ref`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
NAPI_EXTERN napi_status napi_reference_ref(napi_env env,
                                           napi_ref ref,
                                           uint32_t* result);
```

* `[in] env`: API 被调用下的环境。
* `[in] ref`: 将增加引用计数的 `napi_ref`。
* `[out] result`: 新的引用计数。

如果 API 成功则返回 `napi_ok`。

此 API 增加传入引用的引用计数并返回结果引用计数。

#### `napi_reference_unref`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
NAPI_EXTERN napi_status napi_reference_unref(napi_env env,
                                             napi_ref ref,
                                             uint32_t* result);
```

* `[in] env`: API 被调用下的环境。
* `[in] ref`: 将减少引用计数的 `napi_ref`。
* `[out] result`: 新的引用计数。

如果 API 成功则返回 `napi_ok`。

此 API 减少传入引用的引用计数并返回结果引用计数。

#### `napi_get_reference_value`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
NAPI_EXTERN napi_status napi_get_reference_value(napi_env env,
                                                 napi_ref ref,
                                                 napi_value* result);
```

* `[in] env`: API 被调用下的环境。
* `[in] ref`: 请求相应值的 `napi_ref`。
* `[out] result`: `napi_ref` 引用的 `napi_value`。

如果 API 成功则返回 `napi_ok`。

如果仍然有效，此 API 返回表示与 `napi_ref` 关联的 JavaScript 值的 `napi_value`。否则，结果将为 `NULL`。

### 在当前 Node.js 环境退出时的清理

虽然 Node.js 进程通常在退出时释放其所有资源，但 Node.js 的嵌入者或未来的 Worker 支持可能需要插件注册清理钩子，这些钩子将在当前 Node.js 环境退出时运行一次。

Node-API 提供了注册和注销此类回调的函数。当运行这些回调时，应释放插件持有的所有资源。

#### `napi_add_env_cleanup_hook`

<!-- YAML
added: v10.2.0
napiVersion: 3
-->

```c
NODE_EXTERN napi_status napi_add_env_cleanup_hook(node_api_basic_env env,
                                                  napi_cleanup_hook fun,
                                                  void* arg);
```

注册 `fun` 作为在当前 Node.js 环境退出时使用 `arg` 参数运行的函数。

可以安全地多次指定具有不同 `arg` 值的函数。在这种情况下，它也将被调用多次。不允许多次提供相同的 `fun` 和 `arg` 值，这将导致进程中止。

钩子将按相反顺序调用，即最近添加的钩子将首先被调用。

可以使用 [`napi_remove_env_cleanup_hook`][] 删除此钩子。通常，这发生在为此钩子添加的资源正在被拆除时。

对于异步清理，可以使用 [`napi_add_async_cleanup_hook`][]。

#### `napi_remove_env_cleanup_hook`

<!-- YAML
added: v10.2.0
napiVersion: 3
-->

```c
NAPI_EXTERN napi_status napi_remove_env_cleanup_hook(node_api_basic_env env,
                                                     void (*fun)(void* arg),
                                                     void* arg);
```

注销 `fun` 作为在当前 Node.js 环境退出时使用 `arg` 参数运行的函数。参数和函数值都需要完全匹配。

该函数必须最初是使用 `napi_add_env_cleanup_hook` 注册的，否则进程将中止。

#### `napi_add_async_cleanup_hook`

<!-- YAML
added:
  - v14.8.0
  - v12.19.0
napiVersion: 8
changes:
  - version:
    - v14.10.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/34819
    description: "Changed signature of the `hook` callback."
-->

```c
NAPI_EXTERN napi_status napi_add_async_cleanup_hook(
    node_api_basic_env env,
    napi_async_cleanup_hook hook,
    void* arg,
    napi_async_cleanup_hook_handle* remove_handle);
```

* `[in] env`：API 被调用下的环境。
* `[in] hook`：在环境销毁时调用的函数指针。
* `[in] arg`：调用 `hook` 时传递的指针。
* `[out] remove_handle`：可选句柄，引用异步清理钩子。

注册 `hook`（类型为 [`napi_async_cleanup_hook`][] 的函数），作为在当前 Node.js 环境退出时使用 `remove_handle` 和 `arg` 参数运行的函数。

与 [`napi_add_env_cleanup_hook`][] 不同，该钩子允许是异步的。

否则，行为通常与 [`napi_add_env_cleanup_hook`][] 匹配。

如果 `remove_handle` 不是 `NULL`，则将在其中存储一个不透明值，该值必须稍后传递给 [`napi_remove_async_cleanup_hook`][]，无论钩子是否已被调用。通常，这发生在为此钩子添加的资源正在被拆除时。

#### `napi_remove_async_cleanup_hook`

<!-- YAML
added:
  - v14.8.0
  - v12.19.0
changes:
  - version:
    - v14.10.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/34819
    description: "Removed `env` parameter."
-->

```c
NAPI_EXTERN napi_status napi_remove_async_cleanup_hook(
    napi_async_cleanup_hook_handle remove_handle);
```

* `[in] remove_handle`: 使用 [`napi_add_async_cleanup_hook`][] 创建的异步清理钩子的句柄。

注销与 `remove_handle` 对应的清理钩子。这将防止钩子被执行，除非它已经开始执行。必须对从 [`napi_add_async_cleanup_hook`][] 获得的任何 `napi_async_cleanup_hook_handle` 值调用此函数。

### 在 Node.js 环境退出时的终结

Node.js 环境可能在尽可能快的任意时间被销毁，此时禁止执行 JavaScript，例如在请求 [`worker.terminate()`][] 时。当环境被销毁时，注册的 JavaScript 对象、线程安全函数和环境实例数据的 `napi_finalize` 回调会立即且独立地被调用。

`napi_finalize` 回调的调用安排在手动注册的清理钩子之后。为了确保在环境关闭期间插件终结的正确顺序，以避免在 `napi_finalize` 回调中释放后使用，插件应使用 `napi_add_env_cleanup_hook` 和 `napi_add_async_cleanup_hook` 注册清理钩子，以正确的顺序手动释放分配的资源。

## 模块注册

Node-API 模块的注册方式与其他模块类似，
但不是使用 `NODE_MODULE` 宏，而是使用
以下内容：

```c
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
```

下一个区别是 `Init` 方法的签名。对于 Node-API
模块，如下所示：

```c
napi_value Init(napi_env env, napi_value exports);
```

`Init` 的返回值被视为模块的 `exports` 对象。
`Init` 方法通过 `exports` 参数被传入一个空对象以提供便利。如果 `Init` 返回 `NULL`，则作为 `exports` 传入的参数将由模块导出。Node-API 模块不能修改 `module` 对象，但
可以将任何内容指定为模块的 `exports` 属性。

要将 `hello` 方法添加为函数，以便它可以作为
addon 提供的方法被调用：

```c
napi_value Init(napi_env env, napi_value exports) {
  napi_status status;
  napi_property_descriptor desc = {
    "hello",
    NULL,
    Method,
    NULL,
    NULL,
    NULL,
    napi_writable | napi_enumerable | napi_configurable,
    NULL
  };
  status = napi_define_properties(env, exports, 1, &desc);
  if (status != napi_ok) return NULL;
  return exports;
}
```

要设置一个函数由 addon 的 `require()` 返回：

```c
napi_value Init(napi_env env, napi_value exports) {
  napi_value method;
  napi_status status;
  status = napi_create_function(env, "exports", NAPI_AUTO_LENGTH, Method, NULL, &method);
  if (status != napi_ok) return NULL;
  return method;
}
```

要定义一个类以便可以创建新实例（通常与
[对象包装][Object wrap] 一起使用）：

```c
// 注意：部分示例，未包含所有引用的代码
napi_value Init(napi_env env, napi_value exports) {
  napi_status status;
  napi_property_descriptor properties[] = {
    { "value", NULL, NULL, GetValue, SetValue, NULL, napi_writable | napi_configurable, NULL },
    DECLARE_NAPI_METHOD("plusOne", PlusOne),
    DECLARE_NAPI_METHOD("multiply", Multiply),
  };

  napi_value cons;
  status =
      napi_define_class(env, "MyObject", New, NULL, 3, properties, &cons);
  if (status != napi_ok) return NULL;

  status = napi_create_reference(env, cons, 1, &constructor);
  if (status != napi_ok) return NULL;

  status = napi_set_named_property(env, exports, "MyObject", cons);
  if (status != napi_ok) return NULL;

  return exports;
}
```

你也可以使用 `NAPI_MODULE_INIT` 宏，它作为
`NAPI_MODULE` 和定义 `Init` 函数的简写：

```c
NAPI_MODULE_INIT(/* napi_env env, napi_value exports */) {
  napi_value answer;
  napi_status result;

  status = napi_create_int64(env, 42, &answer);
  if (status != napi_ok) return NULL;

  status = napi_set_named_property(env, exports, "answer", answer);
  if (status != napi_ok) return NULL;

  return exports;
}
```

参数 `env` 和 `exports` 被提供给
`NAPI_MODULE_INIT` 宏的主体。

所有 Node-API 插件都是上下文感知的，意味着它们可以被加载多次。声明此类模块时有一些设计考虑。
[上下文感知插件][context-aware addons] 的文档提供了更多详细信息。

变量 `env` 和 `exports` 将在宏调用后的函数体内可用。

有关在对象上设置属性的更多详细信息，请参阅
[使用 JavaScript 属性][Working with JavaScript properties] 部分。

有关构建插件模块的一般更多详细信息，请参阅现有
API。

## 使用 JavaScript 值

Node-API 公开了一组 API 来创建所有类型的 JavaScript 值。
其中一些类型记录在 [ECMAScript 语言规范][ECMAScript Language Specification] 的 [语言类型部分][Section language types] 下。

基本上，这些 API 用于执行以下操作之一：

1. 创建一个新的 JavaScript 对象
2. 从原始 C 类型转换为 Node-API 值
3. 从 Node-API 值转换为原始 C 类型
4. 获取全局实例，包括 `undefined` 和 `null`

Node-API 值由类型 `napi_value` 表示。
任何需要 JavaScript 值的 Node-API 调用都接受 `napi_value`。
在某些情况下，API 确实会预先检查 `napi_value` 的类型。
但是，为了更好的性能，调用者最好确保
相关的 `napi_value` 是 API 预期的 JavaScript 类型。

### 枚举类型

#### `napi_key_collection_mode`

<!-- YAML
added:
 - v13.7.0
 - v12.17.0
 - v10.20.0
napiVersion: 6
-->

```c
typedef enum {
  napi_key_include_prototypes,
  napi_key_own_only
} napi_key_collection_mode;
```

描述 `键/属性` 过滤器枚举：

`napi_key_collection_mode` 限制收集属性的范围。

`napi_key_own_only` 将收集的属性限制为仅给定
对象。`napi_key_include_prototypes` 还将包括对象原型链的所有键。

#### `napi_key_filter`

<!-- YAML
added:
 - v13.7.0
 - v12.17.0
 - v10.20.0
napiVersion: 6
-->

```c
typedef enum {
  napi_key_all_properties = 0,
  napi_key_writable = 1,
  napi_key_enumerable = 1 << 1,
  napi_key_configurable = 1 << 2,
  napi_key_skip_strings = 1 << 3,
  napi_key_skip_symbols = 1 << 4
} napi_key_filter;
```

属性过滤器位标志。这与位运算符一起使用以构建复合过滤器。

#### `napi_key_conversion`

<!-- YAML
added:
 - v13.7.0
 - v12.17.0
 - v10.20.0
napiVersion: 6
-->

```c
typedef enum {
  napi_key_keep_numbers,
  napi_key_numbers_to_strings
} napi_key_conversion;
```

`napi_key_numbers_to_strings` 将整数索引转换为
字符串。`napi_key_keep_numbers` 将为整数
索引返回数字。

#### `napi_valuetype`

```c
typedef enum {
  // ES6 类型（对应于 typeof）
  napi_undefined,
  napi_null,
  napi_boolean,
  napi_number,
  napi_string,
  napi_symbol,
  napi_object,
  napi_function,
  napi_external,
  napi_bigint,
} napi_valuetype;
```

描述 `napi_value` 的类型。这通常对应于 ECMAScript 语言规范 [语言类型部分][Section language types] 中描述的类型。
除了该部分中的类型外，`napi_valuetype` 还可以表示
带有外部数据的 `Function` 和 `Object`。

类型为 `napi_external` 的 JavaScript 值在 JavaScript 中显示为普通
对象，以便不能在其上设置任何属性，并且没有原型。

#### `napi_typedarray_type`

<!-- YAML
changes:
  - version:
     - v25.5.0
     - v24.13.1
    pr-url: https://github.com/nodejs/node/pull/58879
    description: "为 Float16Array 支持添加了 `napi_float16_array`。"
-->

```c
typedef enum {
  napi_int8_array,
  napi_uint8_array,
  napi_uint8_clamped_array,
  napi_int16_array,
  napi_uint16_array,
  napi_int32_array,
  napi_uint32_array,
  napi_float32_array,
  napi_float64_array,
  napi_bigint64_array,
  napi_biguint64_array,
  napi_float16_array,
} napi_typedarray_type;
```

这表示 `TypedArray` 的底层二进制标量数据类型。
此枚举的元素对应于 [ECMAScript 语言规范][ECMAScript Language Specification] 的 [TypedArray 对象部分][Section TypedArray objects]。

### 对象创建函数

#### `napi_create_array`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_create_array(napi_env env, napi_value* result)
```

* `[in] env`：调用 Node-API 的环境。
* `[out] result`：表示 JavaScript `Array` 的 `napi_value`。

如果 API 成功则返回 `napi_ok`。

此 API 返回对应于 JavaScript `Array` 类型的 Node-API 值。
JavaScript 数组在 ECMAScript 语言规范的
[数组对象部分][Section Array objects] 中描述。

#### `napi_create_array_with_length`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_create_array_with_length(napi_env env,
                                          size_t length,
                                          napi_value* result)
```

* `[in] env`：调用 API 的环境。
* `[in] length`：`Array` 的初始长度。
* `[out] result`：表示 JavaScript `Array` 的 `napi_value`。

如果 API 成功则返回 `napi_ok`。

此 API 返回对应于 JavaScript `Array` 类型的 Node-API 值。
`Array` 的 length 属性设置为传入的 length 参数。
但是，当创建数组时，底层缓冲区不保证由 VM
预分配。该行为留给底层 VM
实现。如果缓冲区必须是可以通过 C 直接读取和/或写入的连续内存块，请考虑使用
[`napi_create_external_arraybuffer`][]。

JavaScript 数组在 ECMAScript 语言规范的
[数组对象部分][Section Array objects] 中描述。

#### `napi_create_arraybuffer`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_create_arraybuffer(napi_env env,
                                    size_t byte_length,
                                    void** data,
                                    napi_value* result)
```

* `[in] env`：调用 API 的环境。
* `[in] length`：要创建的数组缓冲区的字节长度。
* `[out] data`：指向 `ArrayBuffer` 底层字节缓冲区的指针。
  可以通过传递 `NULL` 选择性地忽略 `data`。
* `[out] result`：表示 JavaScript `ArrayBuffer` 的 `napi_value`。

如果 API 成功则返回 `napi_ok`。

此 API 返回对应于 JavaScript `ArrayBuffer` 的 Node-API 值。
`ArrayBuffer` 用于表示固定长度的二进制数据缓冲区。它们通常
用作 `TypedArray` 对象的后备缓冲区。
分配的 `ArrayBuffer` 将具有一个底层字节缓冲区，其大小由
传入的 `length` 参数确定。
底层缓冲区选择性地返回给调用者，以防调用者
想要直接操作缓冲区。此缓冲区只能
从原生代码直接写入。要从 JavaScript 写入此缓冲区，
需要创建 typed array 或 `DataView` 对象。

JavaScript `ArrayBuffer` 对象在 ECMAScript 语言规范的
[ArrayBuffer 对象部分][Section ArrayBuffer objects] 中描述。

#### `napi_create_buffer`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_create_buffer(napi_env env,
                               size_t size,
                               void** data,
                               napi_value* result)
```

* `[in] env`：调用 API 的环境。
* `[in] size`：底层缓冲区的字节大小。
* `[out] data`：指向底层缓冲区的原始指针。
  可以通过传递 `NULL` 选择性地忽略 `data`。
* `[out] result`：表示 `node::Buffer` 的 `napi_value`。

如果 API 成功则返回 `napi_ok`。

此 API 分配一个 `node::Buffer` 对象。虽然这仍然是一个
完全支持的数据结构，但在大多数情况下使用 `TypedArray` 就足够了。

#### `napi_create_buffer_copy`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_create_buffer_copy(napi_env env,
                                    size_t length,
                                    const void* data,
                                    void** result_data,
                                    napi_value* result)
```

* `[in] env`：调用 API 的环境。
* `[in] size`：输入缓冲区的字节大小（应与新缓冲区的大小
  相同）。
* `[in] data`：指向要复制的底层缓冲区的原始指针。
* `[out] result_data`：指向新 `Buffer` 的底层数据缓冲区的指针。
  可以通过传递 `NULL` 选择性地忽略 `result_data`。
* `[out] result`：表示 `node::Buffer` 的 `napi_value`。

如果 API 成功则返回 `napi_ok`。

此 API 分配一个 `node::Buffer` 对象并使用从
传入缓冲区复制的数据初始化它。虽然这仍然是一个完全支持的数据
结构，但在大多数情况下使用 `TypedArray` 就足够了。

#### `napi_create_date`

<!-- YAML
added:
 - v11.11.0
 - v10.17.0
napiVersion: 5
-->

```c
napi_status napi_create_date(napi_env env,
                             double time,
                             napi_value* result);
```

* `[in] env`：调用 API 的环境。
* `[in] time`：ECMAScript 时间值，单位为自 1970 年 1 月 1 日 UTC 以来的毫秒数。
* `[out] result`：表示 JavaScript `Date` 的 `napi_value`。

如果 API 成功则返回 `napi_ok`。

此 API 不观察闰秒；它们被忽略，因为
ECMAScript 与 POSIX 时间规范保持一致。

此 API 分配一个 JavaScript `Date` 对象。

JavaScript `Date` 对象在 ECMAScript 语言规范的
[Date 对象部分][Section Date objects] 中描述。

#### `napi_create_external`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_create_external(napi_env env,
                                 void* data,
                                 napi_finalize finalize_cb,
                                 void* finalize_hint,
                                 napi_value* result)
```

* `[in] env`：调用 API 的环境。
* `[in] data`：指向外部数据的原始指针。
* `[in] finalize_cb`：当外部值被
  收集时调用的可选回调。[`napi_finalize`][] 提供更多详细信息。
* `[in] finalize_hint`：在收集期间传递给 finalize 回调的可选提示。
* `[out] result`：表示外部值的 `napi_value`。

如果 API 成功则返回 `napi_ok`。

此 API 分配一个附加了外部数据的 JavaScript 值。这
用于通过 JavaScript 代码传递外部数据，以便以后可以使用 [`napi_get_value_external`][] 由原生代码检索。

API 添加了一个 `napi_finalize` 回调，当刚刚创建的 JavaScript
对象被垃圾回收时将调用该回调。

创建的值不是对象，因此不支持附加
属性。它被认为是一个不同的值类型：使用
外部值调用 `napi_typeof()` 会产生 `napi_external`。

#### `napi_create_external_arraybuffer`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status
napi_create_external_arraybuffer(napi_env env,
                                 void* external_data,
                                 size_t byte_length,
                                 napi_finalize finalize_cb,
                                 void* finalize_hint,
                                 napi_value* result)
```

* `[in] env`：调用 API 的环境。
* `[in] external_data`：指向
  `ArrayBuffer` 底层字节缓冲区的指针。
* `[in] byte_length`：底层缓冲区的字节长度。
* `[in] finalize_cb`：当 `ArrayBuffer` 被
  收集时调用的可选回调。[`napi_finalize`][] 提供更多详细信息。
* `[in] finalize_hint`：在收集期间传递给 finalize 回调的可选提示。
* `[out] result`：表示 JavaScript `ArrayBuffer` 的 `napi_value`。

如果 API 成功则返回 `napi_ok`。

**某些非 Node.js 运行时已放弃对外部缓冲区的支持**。
在 Node.js 以外的运行时上，此方法可能返回
`napi_no_external_buffers_allowed` 以指示不支持外部
缓冲区。一个这样的运行时是 Electron，如
此问题 [electron/issues/35801](https://github.com/electron/electron/issues/35801) 中所述。

为了与所有运行时保持最广泛的兼容性，
你可以在包含 node-api 头文件之前在 addon 中定义 `NODE_API_NO_EXTERNAL_BUFFERS_ALLOWED`。这样做将隐藏 2 个
创建外部缓冲区的函数。这将确保如果
你意外使用这些方法之一会发生编译错误。

此 API 返回对应于 JavaScript `ArrayBuffer` 的 Node-API 值。
`ArrayBuffer` 的底层字节缓冲区是外部分配和
管理的。调用者必须确保字节缓冲区保持有效，直到
finalize 回调被调用。

API 添加了一个 `napi_finalize` 回调，当刚刚创建的 JavaScript
对象被垃圾回收时将调用该回调。

JavaScript `ArrayBuffer` 在 ECMAScript 语言规范的
[ArrayBuffer 对象部分][Section ArrayBuffer objects] 中描述。

#### `node_api_create_external_sharedarraybuffer`

<!-- YAML
added: v26.1.0
-->

```c
napi_status
node_api_create_external_sharedarraybuffer(napi_env env,
                                           void* external_data,
                                           size_t byte_length,
                                           node_api_noenv_finalize finalize_cb,
                                           void* finalize_hint,
                                           napi_value* result)
```

* `[in] env`: 在该 API 调用所处的环境。
* `[in] external_data`: 指向 `SharedArrayBuffer` 的
  底层字节缓冲区的指针。
* `[in] byte_length`: 底层缓冲区的字节长度。
* `[in] finalize_cb`: 当 `SharedArrayBuffer` 正在被
  收集时调用的可选回调。该回调在任意线程上调用。
  因为 `SharedArrayBuffer` 可能比其创建时的环境存活更久，
  所以该回调不会接收 `env` 的引用。
* `[in] finalize_hint`: 在收集期间传递给 finalize 回调的可选提示。
* `[out] result`: 表示 JavaScript `SharedArrayBuffer` 的 `napi_value`。

如果 API 成功则返回 `napi_ok`。

使用外部管理的内存创建一个 `SharedArrayBuffer`。

有关运行时兼容性，请参阅 [`napi_create_external_arraybuffer`][] 的条目。

#### `napi_create_external_buffer`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_create_external_buffer(napi_env env,
                                        size_t length,
                                        void* data,
                                        napi_finalize finalize_cb,
                                        void* finalize_hint,
                                        napi_value* result)
```

* `[in] env`：调用 API 的环境。
* `[in] length`：输入缓冲区的字节大小（应与
  新缓冲区的大小相同）。
* `[in] data`：指向要暴露给 JavaScript 的底层缓冲区的原始指针。
* `[in] finalize_cb`：当 `ArrayBuffer` 被
  收集时调用的可选回调。[`napi_finalize`][] 提供更多详细信息。
* `[in] finalize_hint`：在收集期间传递给 finalize 回调的可选提示。
* `[out] result`：表示 `node::Buffer` 的 `napi_value`。

如果 API 成功则返回 `napi_ok`。

**某些非 Node.js 运行时已放弃对外部缓冲区的支持**。
在 Node.js 以外的运行时上，此方法可能返回
`napi_no_external_buffers_allowed` 以指示不支持外部
缓冲区。一个这样的运行时是 Electron，如
此问题 [electron/issues/35801](https://github.com/electron/electron/issues/35801) 中所述。

为了与所有运行时保持最广泛的兼容性，
你可以在包含 node-api 头文件之前在 addon 中定义 `NODE_API_NO_EXTERNAL_BUFFERS_ALLOWED`。这样做将隐藏 2 个
创建外部缓冲区的函数。这将确保如果
你意外使用这些方法之一会发生编译错误。

此 API 分配一个 `node::Buffer` 对象并使用由
传入缓冲区支持的数据初始化它。虽然这仍然是一个完全支持的数据
结构，但在大多数情况下使用 `TypedArray` 就足够了。

API 添加了一个 `napi_finalize` 回调，当刚刚创建的 JavaScript
对象被垃圾回收时将调用该回调。

对于 Node.js >=4，`Buffers` 是 `Uint8Array`s。

#### `napi_create_object`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_create_object(napi_env env, napi_value* result)
```

* `[in] env`：调用 API 的环境。
* `[out] result`：表示 JavaScript `Object` 的 `napi_value`。

如果 API 成功则返回 `napi_ok`。

此 API 分配一个默认的 JavaScript `Object`。
它相当于在 JavaScript 中执行 `new Object()`。

JavaScript `Object` 类型在 ECMAScript 语言规范的 [对象类型部分][Section object type] 中描述。

#### `node_api_create_object_with_properties`

<!-- YAML
added:
  - v25.2.0
  - v24.12.0
-->

> 稳定性：1 - 实验性

```cpp
napi_status node_api_create_object_with_properties(napi_env env,
                                                   napi_value prototype_or_null,
                                                   const napi_value* property_names,
                                                   const napi_value* property_values,
                                                   size_t property_count,
                                                   napi_value* result)
```

* `[in] env`：调用 API 的环境。
* `[in] prototype_or_null`：新对象的原型对象。可以是
  表示要用作原型的 JavaScript 对象的 `napi_value`，表示 JavaScript `null` 的
  `napi_value`，或将被转换为 `null` 的 `nullptr`。
* `[in] property_names`：表示属性名称的 `napi_value` 数组。
* `[in] property_values`：表示属性值的 `napi_value` 数组。
* `[in] property_count`：数组中的属性数量。
* `[out] result`：表示 JavaScript `Object` 的 `napi_value`。

如果 API 成功则返回 `napi_ok`。

此 API 创建具有指定原型和
属性的 JavaScript `Object`。这比调用 `napi_create_object` 后
跟多个 `napi_set_property` 调用更有效，因为它可以原子地创建具有所有
属性的对象，避免潜在的 V8 映射转换。

数组 `property_names` 和 `property_values` 必须具有由
`property_count` 指定的相同长度。属性按它们在数组中出现的顺序添加到对象。

#### `napi_create_symbol`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_create_symbol(napi_env env,
                               napi_value description,
                               napi_value* result)
```

* `[in] env`：调用 API 的环境。
* `[in] description`：可选 `napi_value`，引用要设置为符号描述的 JavaScript
  `string`。
* `[out] result`：表示 JavaScript `symbol` 的 `napi_value`。

如果 API 成功则返回 `napi_ok`。

此 API 从 UTF8 编码的 C 字符串创建 JavaScript `symbol` 值。

JavaScript `symbol` 类型在 ECMAScript 语言规范的 [符号类型部分][Section symbol type] 中描述。

#### `node_api_symbol_for`

<!-- YAML
added:
  - v17.5.0
  - v16.15.0
napiVersion: 9
-->

```c
napi_status node_api_symbol_for(napi_env env,
                                const char* utf8description,
                                size_t length,
                                napi_value* result)
```

* `[in] env`：调用 API 的环境。
* `[in] utf8description`：UTF-8 C 字符串，表示要用作符号
  描述的文本。
* `[in] length`：描述字符串的字节长度，如果它是空终止的则为
  `NAPI_AUTO_LENGTH`。
* `[out] result`：表示 JavaScript `symbol` 的 `napi_value`。

如果 API 成功则返回 `napi_ok`。

此 API 在全局注册表中搜索具有给定
描述的现有符号。如果符号已存在，它将返回，否则将在注册表中创建新
符号。

JavaScript `symbol` 类型在 ECMAScript
语言规范的 [符号类型部分][Section symbol type] 中描述。

#### `napi_create_typedarray`

<!-- YAML
added: v8.0.0
napiVersion: 1
changes:
  - version: REPLACEME
    pr-url: https://github.com/nodejs/node/pull/62710
    description: Added support for `SharedArrayBuffer`.
-->

```c
napi_status napi_create_typedarray(napi_env env,
                                   napi_typedarray_type type,
                                   size_t length,
                                   napi_value arraybuffer,
                                   size_t byte_offset,
                                   napi_value* result)
```

* `[in] env`：调用该 API 所处的环境。
* `[in] type`：`TypedArray` 中元素的标量数据类型。
* `[in] length`：`TypedArray` 中的元素数量。
* `[in] arraybuffer`：`TypedArray` 所依赖的 `ArrayBuffer` 或 `SharedArrayBuffer`。
* `[in] byte_offset`：在 `ArrayBuffer` 或 `SharedArrayBuffer` 中开始投影 `TypedArray` 的字节偏移。
* `[out] result`：表示 JavaScript `TypedArray` 的 `napi_value`。

如果 API 成功则返回 `napi_ok`。

此 API 在现有 `ArrayBuffer` 或 `SharedArrayBuffer` 上创建 JavaScript `TypedArray` 对象。`TypedArray` 对象提供对底层数据缓冲区的类数组视图，其中每个元素都具有相同的底层二进制标量数据类型。

要求 `(length * size_of_element) + byte_offset` 小于或等于传入的 `ArrayBuffer` 或 `SharedArrayBuffer` 的字节大小。否则，将抛出 `RangeError` 异常。

对于大于 1 的元素大小，`byte_offset` 必须是元素大小的倍数。否则，将抛出 `RangeError` 异常。

JavaScript `TypedArray` 对象在 ECMAScript 语言规范的
[TypedArray 对象部分][Section TypedArray objects] 中描述。

#### `node_api_create_buffer_from_arraybuffer`

<!-- YAML
added:
  - v23.0.0
  - v22.12.0
napiVersion: 10
-->

```c
napi_status NAPI_CDECL node_api_create_buffer_from_arraybuffer(napi_env env,
                                                              napi_value arraybuffer,
                                                              size_t byte_offset,
                                                              size_t byte_length,
                                                              napi_value* result)
```

* **`[in] env`**：调用 API 的环境。
* **`[in] arraybuffer`**：将创建缓冲区的 `ArrayBuffer`。
* **`[in] byte_offset`**：`ArrayBuffer` 内的字节偏移，从该处开始创建缓冲区。
* **`[in] byte_length`**：要从 `ArrayBuffer` 创建的缓冲区的字节长度。
* **`[out] result`**：表示创建的 JavaScript `Buffer` 对象的 `napi_value`。

如果 API 成功则返回 `napi_ok`。

此 API 从现有 `ArrayBuffer` 创建 JavaScript `Buffer` 对象。
`Buffer` 对象是 Node.js 特定的类，提供了一种直接在 JavaScript 中处理二进制数据的方法。

字节范围 `[byte_offset, byte_offset + byte_length)`
必须在 `ArrayBuffer` 的边界内。如果 `byte_offset + byte_length`
超过 `ArrayBuffer` 的大小，则抛出 `RangeError` 异常。

#### `napi_create_dataview`

<!-- YAML
added: v8.3.0
napiVersion: 1
changes:
  - version:
     - v25.5.0
     - v24.13.1
    pr-url: https://github.com/nodejs/node/pull/60473
    description: "添加了对 `SharedArrayBuffer` 的支持。"
-->

```c
napi_status napi_create_dataview(napi_env env,
                                 size_t byte_length,
                                 napi_value arraybuffer,
                                 size_t byte_offset,
                                 napi_value* result)
```

* `[in] env`：调用 API 的环境。
* `[in] length`：`DataView` 中的元素数量。
* `[in] arraybuffer`：`DataView` 底层的 `ArrayBuffer` 或 `SharedArrayBuffer`。
* `[in] byte_offset`：`ArrayBuffer` 内的字节偏移，从该处
  开始投影 `DataView`。
* `[out] result`：表示 JavaScript `DataView` 的 `napi_value`。

如果 API 成功则返回 `napi_ok`。

此 API 在现有 `ArrayBuffer`
或 `SharedArrayBuffer` 上创建 JavaScript `DataView` 对象。`DataView` 对象提供对
底层数据缓冲区的类数组视图，但允许 `ArrayBuffer` 或 `SharedArrayBuffer` 中存在不同大小和类型的项。

要求 `byte_length + byte_offset` 小于或等于
传入数组的字节大小。如果不是，则抛出 `RangeError` 异常。

JavaScript `DataView` 对象在 ECMAScript 语言规范的
[DataView 对象部分][Section DataView objects] 中描述。

### 从 C 类型转换为 Node-API 的函数

#### `napi_create_int32`

<!-- YAML
added: v8.4.0
napiVersion: 1
-->

```c
napi_status napi_create_int32(napi_env env, int32_t value, napi_value* result)
```

* `[in] env`：调用 API 的环境。
* `[in] value`：要在 JavaScript 中表示的整数值。
* `[out] result`：表示 JavaScript `number` 的 `napi_value`。

如果 API 成功则返回 `napi_ok`。

此 API 用于从 C `int32_t` 类型转换为 JavaScript
`number` 类型。

JavaScript `number` 类型在 ECMAScript 语言规范的
[数字类型部分][Section number type] 中描述。

#### `napi_create_uint32`

<!-- YAML
added: v8.4.0
napiVersion: 1
-->

```c
napi_status napi_create_uint32(napi_env env, uint32_t value, napi_value* result)
```

* `[in] env`：调用 API 的环境。
* `[in] value`：要在 JavaScript 中表示的无符号整数值。
* `[out] result`：表示 JavaScript `number` 的 `napi_value`。

如果 API 成功则返回 `napi_ok`。

此 API 用于从 C `uint32_t` 类型转换为 JavaScript
`number` 类型。

JavaScript `number` 类型在 ECMAScript 语言规范的
[数字类型部分][Section number type] 中描述。

#### `napi_create_int64`

<!-- YAML
added: v8.4.0
napiVersion: 1
-->

```c
napi_status napi_create_int64(napi_env env, int64_t value, napi_value* result)
```

* `[in] env`：调用 API 的环境。
* `[in] value`：要在 JavaScript 中表示的整数值。
* `[out] result`：表示 JavaScript `number` 的 `napi_value`。

如果 API 成功则返回 `napi_ok`。

此 API 用于从 C `int64_t` 类型转换为 JavaScript
`number` 类型。

JavaScript `number` 类型在 ECMAScript 语言规范的 [数字类型部分][Section number type] 中描述。注意 `int64_t` 的完整范围
不能在 JavaScript 中以全精度表示。超出 [`Number.MIN_SAFE_INTEGER`][] `-(2**53 - 1)` -
[`Number.MAX_SAFE_INTEGER`][] `(2**53 - 1)` 范围的整数值将丢失精度。

#### `napi_create_double`

<!-- YAML
added: v8.4.0
napiVersion: 1
-->

```c
napi_status napi_create_double(napi_env env, double value, napi_value* result)
```

* `[in] env`：调用 API 的环境。
* `[in] value`：要在 JavaScript 中表示的双精度值。
* `[out] result`：表示 JavaScript `number` 的 `napi_value`。

如果 API 成功则返回 `napi_ok`。

此 API 用于从 C `double` 类型转换为 JavaScript
`number` 类型。

JavaScript `number` 类型在 ECMAScript 语言规范的
[数字类型部分][Section number type] 中描述。

#### `napi_create_bigint_int64`

<!-- YAML
added: v10.7.0
napiVersion: 6
-->

```c
napi_status napi_create_bigint_int64(napi_env env,
                                     int64_t value,
                                     napi_value* result);
```

* `[in] env`：调用 API 的环境。
* `[in] value`：要在 JavaScript 中表示的整数值。
* `[out] result`：表示 JavaScript `BigInt` 的 `napi_value`。

如果 API 成功则返回 `napi_ok`。

此 API 将 C `int64_t` 类型转换为 JavaScript `BigInt` 类型。

#### `napi_create_bigint_uint64`

<!-- YAML
added: v10.7.0
napiVersion: 6
-->

```c
napi_status napi_create_bigint_uint64(napi_env env,
                                      uint64_t value,
                                      napi_value* result);
```

* `[in] env`：调用 API 的环境。
* `[in] value`：要在 JavaScript 中表示的无符号整数值。
* `[out] result`：表示 JavaScript `BigInt` 的 `napi_value`。

如果 API 成功则返回 `napi_ok`。

此 API 将 C `uint64_t` 类型转换为 JavaScript `BigInt` 类型。

#### `napi_create_bigint_words`

<!-- YAML
added: v10.7.0
napiVersion: 6
-->

```c
napi_status napi_create_bigint_words(napi_env env,
                                     int sign_bit,
                                     size_t word_count,
                                     const uint64_t* words,
                                     napi_value* result);
```

* `[in] env`：调用 API 的环境。
* `[in] sign_bit`：确定生成的 `BigInt` 是正数还是
  负数。
* `[in] word_count`：`words` 数组的长度。
* `[in] words`：`uint64_t` 小端 64 位字数组。
* `[out] result`：表示 JavaScript `BigInt` 的 `napi_value`。

如果 API 成功则返回 `napi_ok`。

此 API 将无符号 64 位字数组转换为单个 `BigInt`
值。

生成的 `BigInt` 计算为：(–1)<sup>`sign_bit`</sup> (`words[0]`
× (2<sup>64</sup>)<sup>0</sup> + `words[1]` × (2<sup>64</sup>)<sup>1</sup> + …)

#### `napi_create_string_latin1`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_create_string_latin1(napi_env env,
                                      const char* str,
                                      size_t length,
                                      napi_value* result);
```

* `[in] env`：调用 API 的环境。
* `[in] str`：表示 ISO-8859-1 编码字符串的字符缓冲区。
* `[in] length`：字符串的字节长度，如果它是空终止的则为 `NAPI_AUTO_LENGTH`。
* `[out] result`：表示 JavaScript `string` 的 `napi_value`。

如果 API 成功则返回 `napi_ok`。

此 API 从 ISO-8859-1 编码的 C
字符串创建 JavaScript `string` 值。原生字符串被复制。

JavaScript `string` 类型在 ECMAScript 语言规范的
[字符串类型部分][Section string type] 中描述。

#### `node_api_create_external_string_latin1`

<!-- YAML
added:
 - v20.4.0
 - v18.18.0
napiVersion: 10
-->

```c
napi_status
node_api_create_external_string_latin1(napi_env env,
                                       char* str,
                                       size_t length,
                                       napi_finalize finalize_callback,
                                       void* finalize_hint,
                                       napi_value* result,
                                       bool* copied);
```

* `[in] env`：调用 API 的环境。
* `[in] str`：表示 ISO-8859-1 编码字符串的字符缓冲区。
* `[in] length`：字符串的字节长度，如果它是空终止的则为 `NAPI_AUTO_LENGTH`。
* `[in] finalize_callback`：当字符串被
  收集时调用的函数。该函数将使用以下参数调用：
  * `[in] env`：addon 运行的环境。如果字符串作为 worker 或主 Node.js 实例
    终止的一部分被收集，此值
    可能为 null。
  * `[in] data`：这是作为 `void*` 指针的值 `str`。
  * `[in] finalize_hint`：这是传递给
    API 的值 `finalize_hint`。
    [`napi_finalize`][] 提供更多详细信息。
    此参数是可选的。传递 null 值意味着当相应的 JavaScript 字符串被
    收集时不需要通知 addon。
* `[in] finalize_hint`：在收集期间传递给 finalize 回调的可选提示。
* `[out] result`：表示 JavaScript `string` 的 `napi_value`。
* `[out] copied`：字符串是否被复制。如果是，终结器将
  已被调用以销毁 `str`。

如果 API 成功则返回 `napi_ok`。

此 API 从 ISO-8859-1 编码的 C
字符串创建 JavaScript `string` 值。原生字符串可能未被复制，因此必须在 JavaScript 值的整个
生命周期内存在。

JavaScript `string` 类型在 ECMAScript 语言规范的
[字符串类型部分][Section string type] 中描述。

#### `napi_create_string_utf16`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_create_string_utf16(napi_env env,
                                     const char16_t* str,
                                     size_t length,
                                     napi_value* result)
```

* `[in] env`：调用 API 的环境。
* `[in] str`：表示 UTF16-LE 编码字符串的字符缓冲区。
* `[in] length`：字符串的双字节代码单元长度，如果它是空终止的则为
  `NAPI_AUTO_LENGTH`。
* `[out] result`：表示 JavaScript `string` 的 `napi_value`。

如果 API 成功则返回 `napi_ok`。

此 API 从 UTF16-LE 编码的 C 字符串创建 JavaScript `string` 值。
原生字符串被复制。

JavaScript `string` 类型在 ECMAScript 语言规范的
[字符串类型部分][Section string type] 中描述。

#### `node_api_create_external_string_utf16`

<!-- YAML
added:
 - v20.4.0
 - v18.18.0
napiVersion: 10
-->

```c
napi_status
node_api_create_external_string_utf16(napi_env env,
                                      char16_t* str,
                                      size_t length,
                                      napi_finalize finalize_callback,
                                      void* finalize_hint,
                                      napi_value* result,
                                      bool* copied);
```

* `[in] env`：调用 API 的环境。
* `[in] str`：表示 UTF16-LE 编码字符串的字符缓冲区。
* `[in] length`：字符串的双字节代码单元长度，如果它是空终止的则为
  `NAPI_AUTO_LENGTH`。
* `[in] finalize_callback`：当字符串被
  收集时调用的函数。该函数将使用以下参数调用：
  * `[in] env`：addon 运行的环境。如果字符串作为 worker 或主 Node.js 实例
    终止的一部分被收集，此值
    可能为 null。
  * `[in] data`：这是作为 `void*` 指针的值 `str`。
  * `[in] finalize_hint`：这是传递给
    API 的值 `finalize_hint`。
    [`napi_finalize`][] 提供更多详细信息。
    此参数是可选的。传递 null 值意味着当相应的 JavaScript 字符串被
    收集时不需要通知 addon。
* `[in] finalize_hint`：在收集期间传递给 finalize 回调的可选提示。
* `[out] result`：表示 JavaScript `string` 的 `napi_value`。
* `[out] copied`：字符串是否被复制。如果是，终结器将
  已被调用以销毁 `str`。

如果 API 成功则返回 `napi_ok`。

此 API 从 UTF16-LE 编码的 C 字符串创建 JavaScript `string` 值。
原生字符串可能未被复制，因此必须在 JavaScript 值的整个
生命周期内存在。

JavaScript `string` 类型在 ECMAScript 语言规范的
[字符串类型部分][Section string type] 中描述。

#### `napi_create_string_utf8`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_create_string_utf8(napi_env env,
                                    const char* str,
                                    size_t length,
                                    napi_value* result)
```

* `[in] env`：调用 API 的环境。
* `[in] str`：表示 UTF8 编码字符串的字符缓冲区。
* `[in] length`：字符串的字节长度，如果它是空终止的则为 `NAPI_AUTO_LENGTH`。
* `[out] result`：表示 JavaScript `string` 的 `napi_value`。

如果 API 成功则返回 `napi_ok`。

此 API 从 UTF8 编码的 C 字符串创建 JavaScript `string` 值。
原生字符串被复制。

JavaScript `string` 类型在 ECMAScript 语言规范的
[字符串类型部分][Section string type] 中描述。

### 创建优化属性键的函数

包括 V8 在内的许多 JavaScript 引擎使用内部化字符串作为键
来设置和获取属性值。它们通常使用哈希表来创建
和查找此类字符串。虽然每次键创建会增加一些成本，但它通过启用字符串指针比较而不是
整个字符串比较来提高之后的性能。

如果新的 JavaScript 字符串打算用作属性键，那么对于
某些 JavaScript 引擎，使用本节中的函数会更高效。否则，使用 `napi_create_string_utf8` 或
`node_api_create_external_string_utf8` 系列函数，因为使用属性键
创建方法创建/存储字符串可能会有
额外开销。

#### `node_api_create_property_key_latin1`

<!-- YAML
added:
  - v22.9.0
  - v20.18.0
napiVersion: 10
-->

```c
napi_status NAPI_CDECL node_api_create_property_key_latin1(napi_env env,
                                                           const char* str,
                                                           size_t length,
                                                           napi_value* result);
```

* `[in] env`：调用 API 的环境。
* `[in] str`：表示 ISO-8859-1 编码字符串的字符缓冲区。
* `[in] length`：字符串的字节长度，如果它是空终止的则为 `NAPI_AUTO_LENGTH`。
* `[out] result`：表示优化的 JavaScript `string` 的 `napi_value`，
  用作对象的属性键。

如果 API 成功则返回 `napi_ok`。

此 API 从
ISO-8859-1 编码的 C 字符串创建优化的 JavaScript `string` 值，用作对象的属性键。
原生字符串被复制。与 `napi_create_string_latin1` 相比，
随后使用相同 `str` 指针调用此函数可能会受益于
请求的 `napi_value` 创建的加速，具体取决于引擎。

JavaScript `string` 类型在 ECMAScript 语言规范的
[字符串类型部分][Section string type] 中描述。

#### `node_api_create_property_key_utf16`

<!-- YAML
added:
  - v21.7.0
  - v20.12.0
napiVersion: 10
-->

```c
napi_status NAPI_CDECL node_api_create_property_key_utf16(napi_env env,
                                                          const char16_t* str,
                                                          size_t length,
                                                          napi_value* result);
```

* `[in] env`：调用 API 的环境。
* `[in] str`：表示 UTF16-LE 编码字符串的字符缓冲区。
* `[in] length`：字符串的双字节代码单元长度，如果它是空终止的则为
  `NAPI_AUTO_LENGTH`。
* `[out] result`：表示优化的 JavaScript `string` 的 `napi_value`，
  用作对象的属性键。

如果 API 成功则返回 `napi_ok`。

此 API 从
UTF16-LE 编码的 C 字符串创建优化的 JavaScript `string` 值，用作对象的属性键。
原生字符串被复制。

JavaScript `string` 类型在 ECMAScript 语言规范的
[字符串类型部分][Section string type] 中描述。

#### `node_api_create_property_key_utf8`

<!-- YAML
added:
  - v22.9.0
  - v20.18.0
napiVersion: 10
-->

```c
napi_status NAPI_CDECL node_api_create_property_key_utf8(napi_env env,
                                                         const char* str,
                                                         size_t length,
                                                         napi_value* result);
```

* `[in] env`：调用 API 的环境。
* `[in] str`：表示 UTF8 编码字符串的字符缓冲区。
* `[in] length`：字符串的双字节代码单元长度，如果它是空终止的则为
  `NAPI_AUTO_LENGTH`。
* `[out] result`：表示优化的 JavaScript `string` 的 `napi_value`，
  用作对象的属性键。

如果 API 成功则返回 `napi_ok`。

此 API 从
UTF8 编码的 C 字符串创建优化的 JavaScript `string` 值，用作对象的属性键。
原生字符串被复制。

JavaScript `string` 类型在 ECMAScript 语言规范的
[字符串类型部分][Section string type] 中描述。

### 从 Node-API 转换为 C 类型的函数

#### `napi_get_array_length`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_get_array_length(napi_env env,
                                  napi_value value,
                                  uint32_t* result)
```

* `[in] env`：调用 API 的环境。
* `[in] value`：`napi_value` 表示正在查询长度的 JavaScript `Array`。
* `[out] result`：`uint32` 表示数组的长度。

如果 API 成功则返回 `napi_ok`。

此 API 返回数组的长度。

`Array` 长度在 ECMAScript 语言规范的 [数组实例长度部分][Section Array instance length] 中描述。

#### `napi_get_arraybuffer_info`

<!-- YAML
added: v8.0.0
napiVersion: 1
changes:
  - version:
     - v24.9.0
     - v22.21.0
    pr-url: https://github.com/nodejs/node/pull/59071
    description: "Added support for `SharedArrayBuffer`."
-->

```c
napi_status napi_get_arraybuffer_info(napi_env env,
                                      napi_value arraybuffer,
                                      void** data,
                                      size_t* byte_length)
```

* `[in] env`：调用 API 的环境。
* `[in] arraybuffer`：`napi_value` 表示正在查询的 `ArrayBuffer` 或 `SharedArrayBuffer`。
* `[out] data`：`ArrayBuffer` 或 `SharedArrayBuffer` 的底层数据缓冲区
  为 `0`，这可能是 `NULL` 或任何其他指针值。
* `[out] byte_length`：底层数据缓冲区的字节长度。

如果 API 成功则返回 `napi_ok`。

此 API 用于检索 `ArrayBuffer` 或 `SharedArrayBuffer` 的底层数据缓冲区及其长度。

_警告_：使用此 API 时要小心。底层数据
缓冲区的生命周期由 `ArrayBuffer` 或 `SharedArrayBuffer` 管理，即使它被返回后。使用此 API 的一种
可能的安全方法是与
[`napi_create_reference`][] 结合使用，它可以用于保证控制
`ArrayBuffer` 或 `SharedArrayBuffer` 的生命周期。只要没有调用可能
触发 GC 的其他 API，在同一回调内使用返回的数据缓冲区也是安全的。

#### `napi_get_buffer_info`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_get_buffer_info(napi_env env,
                                 napi_value value,
                                 void** data,
                                 size_t* length)
```

* `[in] env`：调用 API 的环境。
* `[in] value`：`napi_value` 表示正在查询的 `node::Buffer` 或 `Uint8Array`。
* `[out] data`：`node::Buffer` 或 `Uint8Array` 的底层数据缓冲区。如果长度为 `0`，这可能是 `NULL` 或任何其他指针值。
* `[out] length`：底层数据缓冲区的字节长度。

如果 API 成功则返回 `napi_ok`。

此方法返回与
[`napi_get_typedarray_info`][] 相同的 `data` 和 `byte_length`。`napi_get_typedarray_info` 也接受
`node::Buffer`（一个 Uint8Array）作为值。

此 API 用于检索 `node::Buffer` 的底层数据缓冲区
及其长度。

_警告_：使用此 API 时要小心，因为如果底层数据缓冲区由 VM 管理，则其
生命周期不保证。

#### `napi_get_prototype`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_get_prototype(napi_env env,
                               napi_value object,
                               napi_value* result)
```

* `[in] env`：调用 API 的环境。
* `[in] object`：`napi_value` 表示要返回其原型的 JavaScript `Object`。这返回相当于 `Object.getPrototypeOf`（这与函数的 `prototype` 属性
  不同）。
* `[out] result`：`napi_value` 表示给定对象的原型。

如果 API 成功则返回 `napi_ok`。

#### `napi_get_typedarray_info`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_get_typedarray_info(napi_env env,
                                     napi_value typedarray,
                                     napi_typedarray_type* type,
                                     size_t* length,
                                     void** data,
                                     napi_value* arraybuffer,
                                     size_t* byte_offset)
```

* `[in] env`: API 调用所在的环境。
* `[in] typedarray`: 表示要查询其属性的 `TypedArray` 的 `napi_value`。
* `[out] type`: `TypedArray` 中元素的标量数据类型。
* `[out] length`: `TypedArray` 中的元素数量。
* `[out] data`: 底层数据缓冲区，已根据 `byte_offset` 值进行调整，以便指向 `TypedArray` 中的第一个元素。如果数组长度为 `0`，则此值可能为 `NULL` 或任何其他指针值。
* `[out] arraybuffer`: `TypedArray` 底层的 `ArrayBuffer` 或 `SharedArrayBuffer`。
* `[out] byte_offset`: 底层原生数组中的字节偏移，第一个元素位于该处。`data` 参数的值已经过调整，因此 data 指向数组中的第一个元素。因此，原生数组的第一个字节位于 `data - byte_offset`。

如果 API 成功则返回 `napi_ok`。

此 API 返回 typed array 的各种属性。

如果不需要该属性，任何输出参数都可以为 `NULL`。

_警告_：使用此 API 时要小心，因为底层数据缓冲区
由 VM 管理。

#### `napi_get_dataview_info`

<!-- YAML
added: v8.3.0
napiVersion: 1
-->

```c
napi_status napi_get_dataview_info(napi_env env,
                                   napi_value dataview,
                                   size_t* byte_length,
                                   void** data,
                                   napi_value* arraybuffer,
                                   size_t* byte_offset)
```

* `[in] env`：调用 API 的环境。
* `[in] dataview`：`napi_value` 表示要查询其属性的 `DataView`。
* `[out] byte_length`：`DataView` 中的字节数。
* `[out] data`：`DataView` 底层的数据缓冲区。
  如果 byte_length 为 `0`，这可能是 `NULL` 或任何其他指针值。
* `[out] arraybuffer`：`DataView` 底层的 `ArrayBuffer`。
* `[out] byte_offset`：数据缓冲区内的字节偏移，从该处
  开始投影 `DataView`。

如果 API 成功则返回 `napi_ok`。

如果不需要该属性，任何输出参数都可以为 `NULL`。

此 API 返回 `DataView` 的各种属性。

#### `napi_get_date_value`

<!-- YAML
added:
 - v11.11.0
 - v10.17.0
napiVersion: 5
-->

```c
napi_status napi_get_date_value(napi_env env,
                                napi_value value,
                                double* result)
```

* `[in] env`：调用 API 的环境。
* `[in] value`：`napi_value` 表示 JavaScript `Date`。
* `[out] result`：时间值作为 `double`，表示为自 1970 年 1 月 1 日 UTC 开始午夜以来的毫秒数。

此 API 不观察闰秒；它们被忽略，因为
ECMAScript 与 POSIX 时间规范保持一致。

如果 API 成功则返回 `napi_ok`。如果传入非日期 `napi_value`，
则返回 `napi_date_expected`。

此 API 返回给定 JavaScript
`Date` 的时间值的 C double 原始值。

#### `napi_get_value_bool`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_get_value_bool(napi_env env, napi_value value, bool* result)
```

* `[in] env`: 调用 API 所处的环境。
* `[in] value`: 代表 JavaScript `Boolean` 的 `napi_value`。
* `[out] result`: 给定 JavaScript `Boolean` 对应的 C 布尔原始值。

如果 API 成功则返回 `napi_ok`。如果传入非布尔 `napi_value`，则返回 `napi_boolean_expected`。

此 API 返回给定 JavaScript `Boolean` 对应的 C 布尔原始值。

#### `napi_get_value_double`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_get_value_double(napi_env env,
                                  napi_value value,
                                  double* result)
```

* `[in] env`: 调用 API 所处的环境。
* `[in] value`: 代表 JavaScript `number` 的 `napi_value`。
* `[out] result`: 给定 JavaScript `number` 对应的 C double 原始值。

如果 API 成功则返回 `napi_ok`。如果传入非数字 `napi_value`，则返回 `napi_number_expected`。

此 API 返回给定 JavaScript `number` 对应的 C double 原始值。

#### `napi_get_value_bigint_int64`

<!-- YAML
added: v10.7.0
napiVersion: 6
-->

```c
napi_status napi_get_value_bigint_int64(napi_env env,
                                        napi_value value,
                                        int64_t* result,
                                        bool* lossless);
```

* `[in] env`: 调用 API 所处的环境。
* `[in] value`: 代表 JavaScript `BigInt` 的 `napi_value`。
* `[out] result`: 给定 JavaScript `BigInt` 对应的 C `int64_t` 原始值。
* `[out] lossless`: 指示 `BigInt` 值是否被无损转换。

如果 API 成功则返回 `napi_ok`。如果传入非 `BigInt`，则返回 `napi_bigint_expected`。

此 API 返回给定 JavaScript `BigInt` 对应的 C `int64_t` 原始值。如果需要，它将截断该值，并将 `lossless` 设置为 `false`。

#### `napi_get_value_bigint_uint64`

<!-- YAML
added: v10.7.0
napiVersion: 6
-->

```c
napi_status napi_get_value_bigint_uint64(napi_env env,
                                        napi_value value,
                                        uint64_t* result,
                                        bool* lossless);
```

* `[in] env`: 调用 API 所处的环境。
* `[in] value`: 代表 JavaScript `BigInt` 的 `napi_value`。
* `[out] result`: 给定 JavaScript `BigInt` 对应的 C `uint64_t` 原始值。
* `[out] lossless`: 指示 `BigInt` 值是否被无损转换。

如果 API 成功则返回 `napi_ok`。如果传入非 `BigInt`，则返回 `napi_bigint_expected`。

此 API 返回给定 JavaScript `BigInt` 对应的 C `uint64_t` 原始值。如果需要，它将截断该值，并将 `lossless` 设置为 `false`。

#### `napi_get_value_bigint_words`

<!-- YAML
added: v10.7.0
napiVersion: 6
-->

```c
napi_status napi_get_value_bigint_words(napi_env env,
                                        napi_value value,
                                        int* sign_bit,
                                        size_t* word_count,
                                        uint64_t* words);
```

* `[in] env`: 调用 API 所处的环境。
* `[in] value`: 代表 JavaScript `BigInt` 的 `napi_value`。
* `[out] sign_bit`: 整数，表示 JavaScript `BigInt` 是正数还是负数。
* `[in/out] word_count`: 必须初始化为 `words` 数组的长度。返回时，它将被设置为存储此 `BigInt` 所需的实际字数。
* `[out] words`: 指向预分配的 64 位字数组的指针。

如果 API 成功则返回 `napi_ok`。

此 API 将单个 `BigInt` 值转换为符号位、64 位小端序数组以及数组中的元素数量。`sign_bit` 和 `words` 都可以设置为 `NULL`，以便仅获取 `word_count`。

#### `napi_get_value_external`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_get_value_external(napi_env env,
                                    napi_value value,
                                    void** result)
```

* `[in] env`：调用 API 所处的环境。
* `[in] value`：代表 JavaScript 外部值的 `napi_value`。
* `[out] result`：指向 JavaScript 外部值所包装的数据的指针。

如果 API 成功则返回 `napi_ok`。如果传入非外部 `napi_value`，则返回 `napi_invalid_arg`。

此 API 检索之前传递给 `napi_create_external()` 的外部数据指针。

#### `napi_get_value_int32`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_get_value_int32(napi_env env,
                                 napi_value value,
                                 int32_t* result)
```

* `[in] env`：调用 API 所处的环境。
* `[in] value`：代表 JavaScript `number` 的 `napi_value`。
* `[out] result`：给定 JavaScript `number` 对应的 C `int32` 原始值。

如果 API 成功则返回 `napi_ok`。如果传入非数字 `napi_value`，则返回 `napi_number_expected`。

此 API 返回给定 JavaScript `number` 对应的 C `int32` 原始值。

如果数字超出 32 位整数的范围，则结果将被截断为等效的低 32 位。如果值 > 2<sup>31</sup> - 1，这可能导致一个大正数变为负数。

非有限数值（`NaN`、`+Infinity` 或 `-Infinity`）会将结果设置为零。

#### `napi_get_value_int64`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_get_value_int64(napi_env env,
                                 napi_value value,
                                 int64_t* result)
```

* `[in] env`：调用 API 所处的环境。
* `[in] value`：代表 JavaScript `number` 的 `napi_value`。
* `[out] result`：给定 JavaScript `number` 对应的 C `int64` 原始值。

如果 API 成功则返回 `napi_ok`。如果传入非数字 `napi_value`，则返回 `napi_number_expected`。

此 API 返回给定 JavaScript `number` 对应的 C `int64` 原始值。

超出 [`Number.MIN_SAFE_INTEGER`][] `-(2**53 - 1)` 到 [`Number.MAX_SAFE_INTEGER`][] `(2**53 - 1)` 范围的 `number` 值将丢失精度。

非有限数值（`NaN`、`+Infinity` 或 `-Infinity`）会将结果设置为零。

#### `napi_get_value_string_latin1`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_get_value_string_latin1(napi_env env,
                                         napi_value value,
                                         char* buf,
                                         size_t bufsize,
                                         size_t* result)
```

* `[in] env`: 调用 API 所处的环境。
* `[in] value`: 代表 JavaScript 字符串的 `napi_value`。
* `[in] buf`: 用于写入 ISO-8859-1 编码字符串的缓冲区。如果传入 `NULL`，则字符串的长度（以字节为单位，不包括空终止符）将返回到 `result` 中。
* `[in] bufsize`: 目标缓冲区的大小。当此值不足时，返回的字符串将被截断并以空字符终止。如果此值为零，则不返回字符串，也不对缓冲区进行任何更改。
* `[out] result`: 复制到缓冲区中的字节数，不包括空终止符。

如果 API 成功则返回 `napi_ok`。如果传入非 `string` `napi_value`，则返回 `napi_string_expected`。

此 API 返回对应于传入值的 ISO-8859-1 编码字符串。

#### `napi_get_value_string_utf8`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_get_value_string_utf8(napi_env env,
                                       napi_value value,
                                       char* buf,
                                       size_t bufsize,
                                       size_t* result)
```

* `[in] env`: 调用 API 所处的环境。
* `[in] value`: 代表 JavaScript 字符串的 `napi_value`。
* `[in] buf`: 用于写入 UTF-8 编码字符串的缓冲区。如果传入 `NULL`，则字符串的长度（以字节为单位，不包括空终止符）将返回到 `result` 中。
* `[in] bufsize`: 目标缓冲区的大小。当此值不足时，返回的字符串将被截断并以空字符终止。如果此值为零，则不返回字符串，也不对缓冲区进行任何更改。
* `[out] result`: 复制到缓冲区中的字节数，不包括空终止符。

如果 API 成功则返回 `napi_ok`。如果传入非 `string` `napi_value`，则返回 `napi_string_expected`。

此 API 返回对应于传入值的 UTF-8 编码字符串。

#### `napi_get_value_string_utf16`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_get_value_string_utf16(napi_env env,
                                        napi_value value,
                                        char16_t* buf,
                                        size_t bufsize,
                                        size_t* result)
```

* `[in] env`: 调用 API 所处的环境。
* `[in] value`: 代表 JavaScript 字符串的 `napi_value`。
* `[in] buf`: 用于写入 UTF-16LE 编码字符串的缓冲区。如果传入 `NULL`，则字符串的长度（以 2 字节代码单元为单位，不包括空终止符）将被返回。
* `[in] bufsize`: 目标缓冲区的大小。当此值不足时，返回的字符串将被截断并以空字符终止。如果此值为零，则不返回字符串，也不对缓冲区进行任何更改。
* `[out] result`: 复制到缓冲区中的 2 字节代码单元的数量，不包括空终止符。

如果 API 成功则返回 `napi_ok`。如果传入非 `string` `napi_value`，则返回 `napi_string_expected`。

此 API 返回对应于传入值的 UTF-16 编码字符串。

#### `napi_get_value_uint32`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_get_value_uint32(napi_env env,
                                  napi_value value,
                                  uint32_t* result)
```

* `[in] env`: 调用 API 所处的环境。
* `[in] value`: 代表 JavaScript `number` 的 `napi_value`。
* `[out] result`: 给定 `napi_value` 作为 `uint32_t` 对应的 C 原始值。

如果 API 成功则返回 `napi_ok`。如果传入非数字 `napi_value`，则返回 `napi_number_expected`。

此 API 返回给定 `napi_value` 作为 `uint32_t` 对应的 C 原始值。

### 获取全局实例的函数

#### `napi_get_boolean`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_get_boolean(napi_env env, bool value, napi_value* result)
```

* `[in] env`: 调用 API 所处的环境。
* `[in] value`: 要检索的布尔值。
* `[out] result`: 代表要检索的 JavaScript `Boolean` 单例对象的 `napi_value`。

如果 API 成功则返回 `napi_ok`。

此 API 用于返回用于表示给定布尔值的 JavaScript 单例对象。

#### `napi_get_global`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_get_global(napi_env env, napi_value* result)
```

* `[in] env`：调用 API 所处的环境。
* `[out] result`：代表 JavaScript `global` 对象的 `napi_value`。

如果 API 成功则返回 `napi_ok`。

此 API 返回 `global` 对象。

#### `napi_get_null`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_get_null(napi_env env, napi_value* result)
```

* `[in] env`：调用 API 所处的环境。
* `[out] result`：代表 JavaScript `null` 对象的 `napi_value`。

如果 API 成功则返回 `napi_ok`。

此 API 返回 `null` 对象。

#### `napi_get_undefined`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_get_undefined(napi_env env, napi_value* result)
```

* `[in] env`：调用 API 所处的环境。
* `[out] result`：代表 JavaScript Undefined 值的 `napi_value`。

如果 API 成功则返回 `napi_ok`。

此 API 返回 Undefined 值。

## 使用 JavaScript 值和抽象操作

Node-API 公开了一组 API，用于对 JavaScript
值执行一些抽象操作。

这些 API 支持执行以下操作之一：

1. 将 JavaScript 值强制转换为特定的 JavaScript 类型（例如 `number` 或
   `string`）。
2. 检查 JavaScript 值的类型。
3. 检查两个 JavaScript 值是否相等。

### `napi_coerce_to_bool`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_coerce_to_bool(napi_env env,
                                napi_value value,
                                napi_value* result)
```

* `[in] env`：调用此 API 所处的环境。
* `[in] value`：要强制转换的 JavaScript 值。
* `[out] result`：`napi_value`，表示强制转换后的 JavaScript `Boolean`。

如果 API 成功，则返回 `napi_ok`。

此 API 实现了 ECMAScript 语言规范
[ToBoolean 章节][] 中定义的抽象操作 `ToBoolean()`。

### `napi_coerce_to_number`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_coerce_to_number(napi_env env,
                                  napi_value value,
                                  napi_value* result)
```

* `[in] env`：调用此 API 所处的环境。
* `[in] value`：要强制转换的 JavaScript 值。
* `[out] result`：`napi_value`，表示强制转换后的 JavaScript `number`。

如果 API 成功，则返回 `napi_ok`。

此 API 实现了 ECMAScript 语言规范
[ToNumber 章节][] 中定义的抽象操作 `ToNumber()`。
如果传入的值是对象，此函数可能会运行 JS 代码。

### `napi_coerce_to_object`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_coerce_to_object(napi_env env,
                                  napi_value value,
                                  napi_value* result)
```

* `[in] env`：调用此 API 所处的环境。
* `[in] value`：要强制转换的 JavaScript 值。
* `[out] result`：`napi_value`，表示强制转换后的 JavaScript `Object`。

如果 API 成功，则返回 `napi_ok`。

此 API 实现了 ECMAScript 语言规范
[ToObject 章节][] 中定义的抽象操作 `ToObject()`。

### `napi_coerce_to_string`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_coerce_to_string(napi_env env,
                                  napi_value value,
                                  napi_value* result)
```

* `[in] env`：调用此 API 所处的环境。
* `[in] value`：要强制转换的 JavaScript 值。
* `[out] result`：`napi_value`，表示强制转换后的 JavaScript `string`。

如果 API 成功，则返回 `napi_ok`。

此 API 实现了 ECMAScript 语言规范
[ToString 章节][] 中定义的抽象操作 `ToString()`。
如果传入的值是对象，此函数可能会运行 JS 代码。

### `napi_typeof`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_typeof(napi_env env, napi_value value, napi_valuetype* result)
```

* `[in] env`：调用此 API 所处的环境。
* `[in] value`：要查询类型的 JavaScript 值。
* `[out] result`：JavaScript 值的类型。

如果 API 成功，则返回 `napi_ok`。

* 如果 `value` 的类型不是已知的 ECMAScript 类型且
  `value` 不是 External 值，则返回 `napi_invalid_arg`。

此 API 表示的行为类似于在对象上调用 `typeof` 运算符，
如 ECMAScript 语言规范
[typeof 运算符章节][] 中所定义。但是，存在一些差异：

1. 它支持检测 External 值。
2. 它将 `null` 检测为单独的类型，而 ECMAScript `typeof` 会将其检测
   为 `object`。

如果 `value` 具有无效的类型，则返回错误。

### `napi_instanceof`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_instanceof(napi_env env,
                            napi_value object,
                            napi_value constructor,
                            bool* result)
```

* `[in] env`：调用此 API 所处的环境。
* `[in] object`：要检查的 JavaScript 值。
* `[in] constructor`：要对照检查的构造函数对象的 JavaScript 函数对象。
* `[out] result`：布尔值，如果 `object instanceof constructor`
  为 true，则设置为 true。

如果 API 成功，则返回 `napi_ok`。

此 API 表示在对象上调用 `instanceof` 运算符，如
ECMAScript 语言规范 [instanceof 运算符章节][] 中所定义。

### `napi_is_array`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_is_array(napi_env env, napi_value value, bool* result)
```

* `[in] env`：调用此 API 所处的环境。
* `[in] value`：要检查的 JavaScript 值。
* `[out] result`：给定对象是否为数组。

如果 API 成功，则返回 `napi_ok`。

此 API 表示在对象上调用 `IsArray` 操作，
如 ECMAScript 语言规范 [IsArray 章节][] 中所定义。

### `napi_is_arraybuffer`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_is_arraybuffer(napi_env env, napi_value value, bool* result)
```

* `[in] env`：调用此 API 所处的环境。
* `[in] value`：要检查的 JavaScript 值。
* `[out] result`：给定对象是否为 `ArrayBuffer`。

如果 API 成功，则返回 `napi_ok`。

此 API 检查传入的 `Object` 是否为数组缓冲区。

### `napi_is_buffer`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_is_buffer(napi_env env, napi_value value, bool* result)
```

* `[in] env`：调用此 API 所处的环境。
* `[in] value`：要检查的 JavaScript 值。
* `[out] result`：给定 `napi_value` 是否表示 `node::Buffer` 或
  `Uint8Array` 对象。

如果 API 成功，则返回 `napi_ok`。

此 API 检查传入的 `Object` 是否为缓冲区或 Uint8Array。
如果调用者需要检查该值是否为 Uint8Array，则应优先使用
[`napi_is_typedarray`][]。

### `napi_is_date`

<!-- YAML
added:
 - v11.11.0
 - v10.17.0
napiVersion: 5
-->

```c
napi_status napi_is_date(napi_env env, napi_value value, bool* result)
```

* `[in] env`：调用此 API 所处的环境。
* `[in] value`：要检查的 JavaScript 值。
* `[out] result`：给定 `napi_value` 是否表示 JavaScript `Date`
  对象。

如果 API 成功，则返回 `napi_ok`。

此 API 检查传入的 `Object` 是否为日期。

### `napi_is_error`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_is_error(napi_env env, napi_value value, bool* result)
```

* `[in] env`：调用此 API 所处的环境。
* `[in] value`：要检查的 JavaScript 值。
* `[out] result`：给定 `napi_value` 是否表示 `Error` 对象。

如果 API 成功，则返回 `napi_ok`。

此 API 检查传入的 `Object` 是否为 `Error`。

### `napi_is_typedarray`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_is_typedarray(napi_env env, napi_value value, bool* result)
```

* `[in] env`：调用此 API 所处的环境。
* `[in] value`：要检查的 JavaScript 值。
* `[out] result`：给定 `napi_value` 是否表示 `TypedArray`。

如果 API 成功，则返回 `napi_ok`。

此 API 检查传入的 `Object` 是否为类型化数组。

### `napi_is_dataview`

<!-- YAML
added: v8.3.0
napiVersion: 1
-->

```c
napi_status napi_is_dataview(napi_env env, napi_value value, bool* result)
```

* `[in] env`：调用此 API 所处的环境。
* `[in] value`：要检查的 JavaScript 值。
* `[out] result`：给定 `napi_value` 是否表示 `DataView`。

如果 API 成功，则返回 `napi_ok`。

此 API 检查传入的 `Object` 是否为 `DataView`。

### `napi_strict_equals`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_strict_equals(napi_env env,
                               napi_value lhs,
                               napi_value rhs,
                               bool* result)
```

* `[in] env`：调用此 API 时所处的环境。
* `[in] lhs`：要检查的 JavaScript 值。
* `[in] rhs`：要对照检查的 JavaScript 值。
* `[out] result`：两个 `napi_value` 对象是否相等。

如果 API 成功，则返回 `napi_ok`。

此 API 表示调用严格相等算法，如
ECMAScript 语言规范 [IsStrctEqual 章节][] 中所定义。

### `napi_detach_arraybuffer`

<!-- YAML
added:
 - v13.0.0
 - v12.16.0
 - v10.22.0
napiVersion: 7
-->

```c
napi_status napi_detach_arraybuffer(napi_env env,
                                    napi_value arraybuffer)
```

* `[in] env`：调用此 API 时所处的环境。
* `[in] arraybuffer`：要分离的 JavaScript `ArrayBuffer`。

如果 API 成功，则返回 `napi_ok`。如果传入的是不可分离的 `ArrayBuffer`，
则返回 `napi_detachable_arraybuffer_expected`。

通常，如果 `ArrayBuffer` 之前已被分离，则它是不可分离的。
引擎可能会对 `ArrayBuffer` 是否可分离施加额外的条件。例如，V8 要求 `ArrayBuffer` 是外部的，
即使用 [`napi_create_external_arraybuffer`][] 创建的。

此 API 表示调用 `ArrayBuffer` 分离操作，如
ECMAScript 语言规范 [detachArrayBuffer 章节][] 中所定义。

### `napi_is_detached_arraybuffer`

<!-- YAML
added:
 - v13.3.0
 - v12.16.0
 - v10.22.0
napiVersion: 7
-->

```c
napi_status napi_is_detached_arraybuffer(napi_env env,
                                         napi_value arraybuffer,
                                         bool* result)
```

* `[in] env`：调用此 API 时所处的环境。
* `[in] arraybuffer`：要检查的 JavaScript `ArrayBuffer`。
* `[out] result`：`arraybuffer` 是否已分离。

如果 API 成功，则返回 `napi_ok`。

如果 `ArrayBuffer` 的内部数据为 `null`，则被视为已分离。

此 API 表示调用 `ArrayBuffer` `IsDetachedBuffer`
操作，如 ECMAScript 语言规范
[isDetachedBuffer 章节][] 中所定义。

### `node_api_is_sharedarraybuffer`

<!-- YAML
added:
 - v24.9.0
 - v22.21.0
-->

> 稳定性：1 - 实验性

```c
napi_status node_api_is_sharedarraybuffer(napi_env env, napi_value value, bool* result)
```

* `[in] env`：调用此 API 时所处的环境。
* `[in] value`：要检查的 JavaScript 值。
* `[out] result`：给定 `napi_value` 是否表示 `SharedArrayBuffer`。

如果 API 成功，则返回 `napi_ok`。

此 API 检查传入的对象是否为 `SharedArrayBuffer`。

### `node_api_create_sharedarraybuffer`

<!-- YAML
added:
 - v24.9.0
 - v22.21.0
-->

> 稳定性：1 - 实验性

```c
napi_status node_api_create_sharedarraybuffer(napi_env env,
                                             size_t byte_length,
                                             void** data,
                                             napi_value* result)
```

* `[in] env`：调用此 API 时所处的环境。
* `[in] byte_length`：要创建的共享数组缓冲区的字节长度。
* `[out] data`：指向 `SharedArrayBuffer` 底层字节缓冲区的指针。
  可以通过传递 `NULL` 来选择性忽略 `data`。
* `[out] result`：表示 JavaScript `SharedArrayBuffer` 的 `napi_value`。

如果 API 成功，则返回 `napi_ok`。

此 API 返回对应于 JavaScript `SharedArrayBuffer` 的 Node-API 值。
`SharedArrayBuffer` 用于表示可在多个
工作线程之间共享的固定长度二进制数据缓冲区。

分配的 `SharedArrayBuffer` 将拥有一个底层字节缓冲区，其大小由
传入的 `byte_length` 参数决定。
底层缓冲区可以选择性地返回给调用者，以防调用者
想要直接操作缓冲区。此缓冲区只能
从原生代码直接写入。要从 JavaScript 写入此缓冲区，
需要创建类型化数组或 `DataView` 对象。

JavaScript `SharedArrayBuffer` 对象在
ECMAScript 语言规范 [SharedArrayBuffer 对象章节][] 中描述。

## 使用 JavaScript 属性

Node-API 暴露了一组 API，用于获取和设置 JavaScript
对象上的属性。

JavaScript 中的属性表示为键和值的元组。
从根本上说，Node-API 中的所有属性键都可以表示为以下
形式之一：

* 命名式：一个简单的 UTF8 编码字符串
* 整数索引：由 `uint32_t` 表示的索引值
* JavaScript 值：它们在 Node-API 中由 `napi_value` 表示。这可以
  是代表 `string`、`number` 或 `symbol` 的 `napi_value`。

Node-API 值由类型 `napi_value` 表示。
任何需要 JavaScript 值的 Node-API 调用都接收一个 `napi_value`。
但是，调用者有责任确保相关的
`napi_value` 是 API 所期望的 JavaScript 类型。

本节中记录的 API 提供了一个简单的接口，用于
获取和设置由 `napi_value` 表示的任意 JavaScript 对象上的属性。

例如，考虑以下 JavaScript 代码片段：

```js
const obj = {};
obj.myProp = 123;
```

使用 Node-API 值可以通过以下片段完成等效操作：

```c
napi_status status = napi_generic_failure;

// const obj = {}
napi_value obj, value;
status = napi_create_object(env, &obj);
if (status != napi_ok) return status;

// 为 123 创建一个 napi_value
status = napi_create_int32(env, 123, &value);
if (status != napi_ok) return status;

// obj.myProp = 123
status = napi_set_named_property(env, obj, "myProp", value);
if (status != napi_ok) return status;
```

索引属性可以用类似的方式设置。考虑以下
JavaScript 片段：

```js
const arr = [];
arr[123] = 'hello';
```

使用 Node-API 值可以通过以下片段完成等效操作：

```c
napi_status status = napi_generic_failure;

// const arr = [];
napi_value arr, value;
status = napi_create_array(env, &arr);
if (status != napi_ok) return status;

// 为 'hello' 创建一个 napi_value
status = napi_create_string_utf8(env, "hello", NAPI_AUTO_LENGTH, &value);
if (status != napi_ok) return status;

// arr[123] = 'hello';
status = napi_set_element(env, arr, 123, value);
if (status != napi_ok) return status;
```

可以使用本节中描述的 API 检索属性。
考虑以下 JavaScript 片段：

```js
const arr = [];
const value = arr[123];
```

以下是 Node-API 对应部分的近似等效代码：

```c
napi_status status = napi_generic_failure;

// const arr = []
napi_value arr, value;
status = napi_create_array(env, &arr);
if (status != napi_ok) return status;

// const value = arr[123]
status = napi_get_element(env, arr, 123, &value);
if (status != napi_ok) return status;
```

最后，出于性能原因，也可以在对象上定义多个属性。考虑以下 JavaScript：

```js
const obj = {};
Object.defineProperties(obj, {
  'foo': { value: 123, writable: true, configurable: true, enumerable: true },
  'bar': { value: 456, writable: true, configurable: true, enumerable: true },
});
```

以下是 Node-API 对应部分的近似等效代码：

```c
napi_status status = napi_status_generic_failure;

// const obj = {};
napi_value obj;
status = napi_create_object(env, &obj);
if (status != napi_ok) return status;

// 为 123 和 456 创建 napi_values
napi_value fooValue, barValue;
status = napi_create_int32(env, 123, &fooValue);
if (status != napi_ok) return status;
status = napi_create_int32(env, 456, &barValue);
if (status != napi_ok) return status;

// 设置属性
napi_property_descriptor descriptors[] = {
  { "foo", NULL, NULL, NULL, NULL, fooValue, napi_writable | napi_configurable, NULL },
  { "bar", NULL, NULL, NULL, NULL, barValue, napi_writable | napi_configurable, NULL }
}
status = napi_define_properties(env,
                                obj,
                                sizeof(descriptors) / sizeof(descriptors[0]),
                                descriptors);
if (status != napi_ok) return status;
```

### 结构体

#### `napi_property_attributes`

<!-- YAML
changes:
 - version: v14.12.0
   pr-url: https://github.com/nodejs/node/pull/35214
   description: "添加了 `napi_default_method` 和 `napi_default_property`。"
-->

```c
typedef enum {
  napi_default = 0,
  napi_writable = 1 << 0,
  napi_enumerable = 1 << 1,
  napi_configurable = 1 << 2,

  // 与 napi_define_class 一起使用，以区分静态属性
  // 与实例属性。被 napi_define_properties 忽略。
  napi_static = 1 << 10,

  // 类方法的默认值。
  napi_default_method = napi_writable | napi_configurable,

  // 对象属性的默认值，类似于 JS 中的 obj[prop]。
  napi_default_jsproperty = napi_writable |
                          napi_enumerable |
                          napi_configurable,
} napi_property_attributes;
```

`napi_property_attributes` 是位标志，用于控制设置在
JavaScript 对象上的属性的行为。除了 `napi_static` 之外，它们
对应于 [ECMAScript 语言规范][] 的 [属性部分][] 中列出的属性。
它们可以是以下一个或多个位标志：

* `napi_default`：未在属性上设置显式属性。默认情况下，属性是只读的、不可枚举且不可配置的。
* `napi_writable`：属性是可写的。
* `napi_enumerable`：属性是可枚举的。
* `napi_configurable`：属性是可配置的，如 [ECMAScript 语言规范][] 的 [属性部分][] 中所定义。
* `napi_static`：属性将被定义为类上的静态属性，而不是实例属性（这是默认值）。这仅由 [`napi_define_class`][] 使用。它被 `napi_define_properties` 忽略。
* `napi_default_method`：类似于 JS 类中的方法，属性是
  可配置和可写的，但不可枚举。
* `napi_default_jsproperty`：类似于通过 JavaScript 中的赋值设置的属性，
  属性是可写、可枚举和可配置的。

#### `napi_property_descriptor`

```c
typedef struct {
  // utf8name 或 name 之一应为 NULL。
  const char* utf8name;
  napi_value name;

  napi_callback method;
  napi_callback getter;
  napi_callback setter;
  napi_value value;

  napi_property_attributes attributes;
  void* data;
} napi_property_descriptor;
```

* `utf8name`：可选字符串，描述属性的键，
  编码为 UTF8。必须为属性提供 `utf8name` 或 `name` 之一。
* `name`：可选 `napi_value`，指向要用作属性键的 JavaScript 字符串或符号。必须为属性提供 `utf8name` 或 `name` 之一。
* `value`：如果属性是数据属性，则在获取访问属性时检索的值。如果传入此项，请将 `getter`、`setter`、`method` 和 `data` 设置为 `NULL`（因为这些成员不会被使用）。
* `getter`：在执行属性的获取访问时调用的函数。如果传入此项，请将 `value` 和 `method` 设置为 `NULL`（因为这些成员不会被使用）。当从 JavaScript 代码访问属性时（或使用 Node-API 调用对属性执行获取操作时），运行时隐式调用给定函数。[`napi_callback`][] 提供了更多细节。
* `setter`：在执行属性的设置访问时调用的函数。如果传入此项，请将 `value` 和 `method` 设置为 `NULL`（因为这些成员不会被使用）。当从 JavaScript 代码设置属性时（或使用 Node-API 调用对属性执行设置操作时），运行时隐式调用给定函数。[`napi_callback`][] 提供了更多细节。
* `method`：设置此项以使属性描述符对象的 `value` 属性成为由 `method` 表示的 JavaScript 函数。如果传入此项，请将 `value`、`getter` 和 `setter` 设置为 `NULL`（因为这些成员不会被使用）。[`napi_callback`][] 提供了更多细节。
* `attributes`：与特定属性关联的属性。参见 [`napi_property_attributes`][]。
* `data`：如果调用此函数，则传入 `method`、`getter` 和 `setter` 的回调数据。

### 函数

#### `napi_get_property_names`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_get_property_names(napi_env env,
                                    napi_value object,
                                    napi_value* result);
```

* `[in] env`：调用 Node-API 的环境。
* `[in] object`：从中检索属性的对象。
* `[out] result`：一个 `napi_value`，表示一个 JavaScript 值数组，
  代表对象的属性名。可以使用 [`napi_get_array_length`][]
  和 [`napi_get_element`][] 迭代 `result`。

如果 API 成功则返回 `napi_ok`。

此 API 将 `object` 的可枚举属性名作为字符串数组返回。键为符号的 `object` 属性将不包括在内。

#### `napi_get_all_property_names`

<!-- YAML
added:
 - v13.7.0
 - v12.17.0
 - v10.20.0
napiVersion: 6
-->

```c
napi_get_all_property_names(napi_env env,
                            napi_value object,
                            napi_key_collection_mode key_mode,
                            napi_key_filter key_filter,
                            napi_key_conversion key_conversion,
                            napi_value* result);
```

* `[in] env`：调用 Node-API 的环境。
* `[in] object`：从中检索属性的对象。
* `[in] key_mode`：是否也检索原型属性。
* `[in] key_filter`：检索哪些属性
  （可枚举/可读/可写）。
* `[in] key_conversion`：是否将数字属性键转换为字符串。
* `[out] result`：一个 `napi_value`，表示一个 JavaScript 值数组，
  代表对象的属性名。可以使用 [`napi_get_array_length`][]
  和 [`napi_get_element`][] 迭代 `result`。

如果 API 成功则返回 `napi_ok`。

此 API 返回一个包含此对象可用属性名的数组。

#### `napi_set_property`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_set_property(napi_env env,
                              napi_value object,
                              napi_value key,
                              napi_value value);
```

* `[in] env`：调用 Node-API 的环境。
* `[in] object`：在其上设置属性的对象。
* `[in] key`：要设置的属性名。
* `[in] value`：属性值。

如果 API 成功则返回 `napi_ok`。

此 API 在传入的 `Object` 上设置一个属性。

#### `napi_get_property`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_get_property(napi_env env,
                              napi_value object,
                              napi_value key,
                              napi_value* result);
```

* `[in] env`：调用 Node-API 的环境。
* `[in] object`：从中检索属性的对象。
* `[in] key`：要检索的属性名。
* `[out] result`：属性的值。

如果 API 成功则返回 `napi_ok`。

此 API 从传入的 `Object` 获取请求的属性。

#### `napi_has_property`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_has_property(napi_env env,
                              napi_value object,
                              napi_value key,
                              bool* result);
```

* `[in] env`：调用 Node-API 的环境。
* `[in] object`：要查询的对象。
* `[in] key`：要检查其存在性的属性名。
* `[out] result`：属性是否存在于对象上。

如果 API 成功则返回 `napi_ok`。

此 API 检查传入的 `Object` 是否具有命名属性。

#### `napi_delete_property`

<!-- YAML
added: v8.2.0
napiVersion: 1
-->

```c
napi_status napi_delete_property(napi_env env,
                                 napi_value object,
                                 napi_value key,
                                 bool* result);
```

* `[in] env`：调用 Node-API 的环境。
* `[in] object`：要查询的对象。
* `[in] key`：要删除的属性名。
* `[out] result`：属性删除是否成功。`result` 可以
  通过传递 `NULL` 选择性地忽略。

如果 API 成功则返回 `napi_ok`。

此 API 尝试从 `object` 删除 `key` 自有属性。

#### `napi_has_own_property`

<!-- YAML
added: v8.2.0
napiVersion: 1
-->

```c
napi_status napi_has_own_property(napi_env env,
                                  napi_value object,
                                  napi_value key,
                                  bool* result);
```

* `[in] env`：调用 Node-API 的环境。
* `[in] object`：要查询的对象。
* `[in] key`：要检查其存在性的自有属性名。
* `[out] result`：自有属性是否存在于对象上。

如果 API 成功则返回 `napi_ok`。

此 API 检查传入的 `Object` 是否具有命名自有属性。`key` 必须
是 `string` 或 `symbol`，否则将抛出错误。Node-API 不会
执行任何数据类型之间的转换。

#### `napi_set_named_property`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_set_named_property(napi_env env,
                                    napi_value object,
                                    const char* utf8Name,
                                    napi_value value);
```

* `[in] env`：调用 Node-API 的环境。
* `[in] object`：在其上设置属性的对象。
* `[in] utf8Name`：要设置的属性名。
* `[in] value`：属性值。

如果 API 成功则返回 `napi_ok`。

此方法等效于使用从作为 `utf8Name` 传入的字符串创建的 `napi_value` 调用 [`napi_set_property`][]。

#### `napi_get_named_property`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_get_named_property(napi_env env,
                                    napi_value object,
                                    const char* utf8Name,
                                    napi_value* result);
```

* `[in] env`：调用 Node-API 的环境。
* `[in] object`：从中检索属性的对象。
* `[in] utf8Name`：要获取的属性名。
* `[out] result`：属性的值。

如果 API 成功则返回 `napi_ok`。

此方法等效于使用从作为 `utf8Name` 传入的字符串创建的 `napi_value` 调用 [`napi_get_property`][]。

#### `napi_has_named_property`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_has_named_property(napi_env env,
                                    napi_value object,
                                    const char* utf8Name,
                                    bool* result);
```

* `[in] env`：调用 Node-API 的环境。
* `[in] object`：要查询的对象。
* `[in] utf8Name`：要检查其存在性的属性名。
* `[out] result`：属性是否存在于对象上。

如果 API 成功则返回 `napi_ok`。

此方法等效于使用从作为 `utf8Name` 传入的字符串创建的 `napi_value` 调用 [`napi_has_property`][]。

#### `napi_set_element`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_set_element(napi_env env,
                             napi_value object,
                             uint32_t index,
                             napi_value value);
```

* `[in] env`：调用 Node-API 的环境。
* `[in] object`：从中设置属性的对象。
* `[in] index`：要设置的属性索引。
* `[in] value`：属性值。

如果 API 成功则返回 `napi_ok`。

此 API 在传入的 `Object` 上设置一个元素。

#### `napi_get_element`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_get_element(napi_env env,
                             napi_value object,
                             uint32_t index,
                             napi_value* result);
```

* `[in] env`：调用 Node-API 的环境。
* `[in] object`：从中检索属性的对象。
* `[in] index`：要获取的属性索引。
* `[out] result`：属性的值。

如果 API 成功则返回 `napi_ok`。

此 API 获取请求索引处的元素。

#### `napi_has_element`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_has_element(napi_env env,
                             napi_value object,
                             uint32_t index,
                             bool* result);
```

* `[in] env`：调用 Node-API 的环境。
* `[in] object`：要查询的对象。
* `[in] index`：要检查其存在性的属性索引。
* `[out] result`：属性是否存在于对象上。

如果 API 成功则返回 `napi_ok`。

此 API 返回传入的 `Object` 是否在请求的索引处具有元素。

#### `napi_delete_element`

<!-- YAML
added: v8.2.0
napiVersion: 1
-->

```c
napi_status napi_delete_element(napi_env env,
                                napi_value object,
                                uint32_t index,
                                bool* result);
```

* `[in] env`：调用 Node-API 的环境。
* `[in] object`：要查询的对象。
* `[in] index`：要删除的属性索引。
* `[out] result`：元素删除是否成功。`result` 可以
  通过传递 `NULL` 选择性地忽略。

如果 API 成功则返回 `napi_ok`。

此 API 尝试从 `object` 删除指定的 `index`。

#### `napi_define_properties`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_define_properties(napi_env env,
                                   napi_value object,
                                   size_t property_count,
                                   const napi_property_descriptor* properties);
```

* `[in] env`：调用 Node-API 的环境。
* `[in] object`：从中检索属性的对象。
* `[in] property_count`：`properties` 数组中的元素数量。
* `[in] properties`：属性描述符数组。

如果 API 成功则返回 `napi_ok`。

此方法允许在给定对象上高效地定义多个属性。属性使用属性描述符定义（参见 [`napi_property_descriptor`][]）。给定这样一个属性描述符数组，此 API 将一次一个地在对象上设置属性，如 `DefineOwnProperty()` 所定义（在 ECMA-262 规范的 [DefineOwnProperty 部分][] 中描述）。

#### `napi_object_freeze`

<!-- YAML
added:
  - v14.14.0
  - v12.20.0
napiVersion: 8
-->

```c
napi_status napi_object_freeze(napi_env env,
                               napi_value object);
```

* `[in] env`：调用 Node-API 的环境。
* `[in] object`：要冻结的对象。

如果 API 成功则返回 `napi_ok`。

此方法冻结给定对象。这防止将新属性添加
到它，防止删除现有属性，防止
更改现有属性的可枚举性、可配置性或可写性，并防止更改现有属性的值。
它还防止对象的原型被更改。这在
ECMA-262 规范的 [第 19.1.2.6 节](https://tc39.es/ecma262/#sec-object.freeze) 中描述。

#### `napi_object_seal`

<!-- YAML
added:
  - v14.14.0
  - v12.20.0
napiVersion: 8
-->

```c
napi_status napi_object_seal(napi_env env,
                             napi_value object);
```

* `[in] env`：调用 Node-API 的环境。
* `[in] object`：要密封的对象。

如果 API 成功则返回 `napi_ok`。

此方法密封给定对象。这防止将新属性添加
到它，并将所有现有属性标记为不可配置。
这在 ECMA-262 规范的 [第 19.1.2.20 节](https://tc39.es/ecma262/#sec-object.seal) 中描述。

#### `node_api_set_prototype`

<!-- YAML
added:
 - v25.4.0
 - v24.13.1
-->

> 稳定性：1 - 实验性

```c
napi_status node_api_set_prototype(napi_env env,
                                   napi_value object,
                                   napi_value value);
```

* `[in] env`：调用 Node-API 的环境。
* `[in] object`：在其上设置原型的对象。
* `[in] value`：原型值。

如果 API 成功则返回 `napi_ok`。

此 API 设置传入的 `Object` 的原型。

## 使用 JavaScript 函数

Node-API 提供了一组 API，允许 JavaScript 代码
回调到原生代码。支持回调到
原生代码的 Node-API 接受由
`napi_callback` 类型表示的回调函数。当 JavaScript 虚拟机回调到
原生代码时，提供的 `napi_callback` 函数将被调用。本节中记录的 API 允许回调函数执行以下操作：

* 获取关于回调被调用时的上下文信息。
* 获取传递给回调的参数。
* 从回调返回一个 `napi_value`。

此外，Node-API 提供了一组函数，允许从原生代码调用
JavaScript 函数。既可以像常规 JavaScript 函数调用那样调用函数，也可以作为构造函数
调用。

任何通过 `napi_property_descriptor` 项的 `data` 字段传递到此 API 的非 `NULL` 数据，都可以与 `object` 关联，并在 `object` 被垃圾回收时通过将 `object` 和数据传递给 [`napi_add_finalizer`][] 来释放。

### `napi_call_function`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
NAPI_EXTERN napi_status napi_call_function(napi_env env,
                                           napi_value recv,
                                           napi_value func,
                                           size_t argc,
                                           const napi_value* argv,
                                           napi_value* result);
```

* `[in] env`：调用 API 所处的环境。
* `[in] recv`：传递给被调用函数的 `this` 值。
* `[in] func`：表示要调用的 JavaScript 函数的 `napi_value`。
* `[in] argc`：`argv` 数组中的元素计数。
* `[in] argv`：`napi_value` 数组，表示作为参数传递给函数的 JavaScript 值。
* `[out] result`：表示返回的 JavaScript 对象的 `napi_value`。

如果 API 成功，则返回 `napi_ok`。

此方法允许从原生插件调用 JavaScript 函数对象。这是从插件的原生代码回调 _到_ JavaScript 的主要机制。对于异步操作后调用到 JavaScript 的特殊情况，请参阅 [`napi_make_callback`][]。

示例用例可能如下所示。考虑以下 JavaScript 代码片段：

```js
function AddTwo(num) {
  return num + 2;
}
global.AddTwo = AddTwo;
```

然后，可以使用以下代码从原生插件调用上述函数：

```c
// 获取全局对象上名为 "AddTwo" 的函数
napi_value global, add_two, arg;
napi_status status = napi_get_global(env, &global);
if (status != napi_ok) return;

status = napi_get_named_property(env, global, "AddTwo", &add_two);
if (status != napi_ok) return;

// const arg = 1337
status = napi_create_int32(env, 1337, &arg);
if (status != napi_ok) return;

napi_value* argv = &arg;
size_t argc = 1;

// AddTwo(arg);
napi_value return_val;
status = napi_call_function(env, global, add_two, argc, argv, &return_val);
if (status != napi_ok) return;

// 将结果转换回原生类型
int32_t result;
status = napi_get_value_int32(env, return_val, &result);
if (status != napi_ok) return;
```

### `napi_create_function`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_create_function(napi_env env,
                                 const char* utf8name,
                                 size_t length,
                                 napi_callback cb,
                                 void* data,
                                 napi_value* result);
```

* `[in] env`：调用 API 所处的环境。
* `[in] utf8Name`：可选的函数名称，编码为 UTF8。这在 JavaScript 中作为新函数对象的 `name` 属性可见。
* `[in] length`：`utf8name` 的长度（以字节为单位），如果它是空终止的，则为 `NAPI_AUTO_LENGTH`。
* `[in] cb`：当此函数对象被调用时应调用的原生函数。[`napi_callback`][] 提供了更多详细信息。
* `[in] data`：用户提供的数据上下文。当稍后调用该函数时，这将传回给函数。
* `[out] result`：`napi_value`，表示新创建函数的 JavaScript 函数对象。

如果 API 成功，则返回 `napi_ok`。

此 API 允许插件作者在原生代码中创建函数对象。这是允许从 JavaScript 调用 _到_ 插件原生代码的主要机制。

在此调用之后，新创建的函数不会自动从脚本中可见。相反，必须在任何对 JavaScript 可见的对象上显式设置属性，以便脚本可以访问该函数。

为了将函数作为插件模块导出的一部分公开，请将新创建的函数设置在 exports
对象上。示例模块可能如下所示：

```c
napi_value SayHello(napi_env env, napi_callback_info info) {
  printf("Hello\n");
  return NULL;
}

napi_value Init(napi_env env, napi_value exports) {
  napi_status status;

  napi_value fn;
  status = napi_create_function(env, NULL, 0, SayHello, NULL, &fn);
  if (status != napi_ok) return NULL;

  status = napi_set_named_property(env, exports, "sayHello", fn);
  if (status != napi_ok) return NULL;

  return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
```

给定上述代码，可以从 JavaScript 如下使用插件：

```js
const myaddon = require('./addon');
myaddon.sayHello();
```

传递给 `require()` 的字符串是 `binding.gyp` 中负责创建 `.node` 文件的目标名称。

任何通过 `data` 参数传递到此 API 的非 `NULL` 数据，都可以与生成的 JavaScript 函数（在 `result` 参数中返回）关联，并在函数被垃圾回收时通过将 JavaScript 函数和数据传递给 [`napi_add_finalizer`][] 来释放。

JavaScript `Function` 在 ECMAScript 语言规范的 [函数对象部分][] 中描述。

### `napi_get_cb_info`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_get_cb_info(napi_env env,
                             napi_callback_info cbinfo,
                             size_t* argc,
                             napi_value* argv,
                             napi_value* thisArg,
                             void** data)
```

* `[in] env`：调用 API 所处的环境。
* `[in] cbinfo`：传递给回调函数的回调信息。
* `[in-out] argc`：指定提供的 `argv` 数组的长度，并接收实际的参数计数。`argc` 可以通过传递 `NULL` 来选择性忽略。
* `[out] argv`：`napi_value` 的 C 数组，参数将被复制到这里。如果参数多于提供的计数，则只复制请求数量的参数。如果提供的参数少于声明的数量，则 `argv` 的其余部分将填充代表 `undefined` 的 `napi_value` 值。`argv` 可以通过传递 `NULL` 来选择性忽略。
* `[out] thisArg`：接收调用的 JavaScript `this` 参数。`thisArg` 可以通过传递 `NULL` 来选择性忽略。
* `[out] data`：接收回调的数据指针。`data` 可以通过传递 `NULL` 来选择性忽略。

如果 API 成功，则返回 `napi_ok`。

此方法在回调函数内使用，用于从给定的回调信息中检索有关调用的详细信息，如参数和 `this` 指针。

### `napi_get_new_target`

<!-- YAML
added: v8.6.0
napiVersion: 1
-->

```c
napi_status napi_get_new_target(napi_env env,
                                napi_callback_info cbinfo,
                                napi_value* result)
```

* `[in] env`：调用 API 所处的环境。
* `[in] cbinfo`：传递给回调函数的回调信息。
* `[out] result`：构造函数调用的 `new.target`。

如果 API 成功，则返回 `napi_ok`。

此 API 返回构造函数调用的 `new.target`。如果当前回调不是构造函数调用，则结果为 `NULL`。

### `napi_new_instance`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_new_instance(napi_env env,
                              napi_value cons,
                              size_t argc,
                              napi_value* argv,
                              napi_value* result)
```

* `[in] env`：调用 API 所处的环境。
* `[in] cons`：`napi_value`，表示要作为构造函数调用的 JavaScript 函数。
* `[in] argc`：`argv` 数组中的元素计数。
* `[in] argv`：JavaScript 值的数组，作为 `napi_value` 表示构造函数的参数。如果 `argc` 为零，则可以通过传入 `NULL` 来省略此参数。
* `[out] result`：`napi_value`，表示返回的 JavaScript 对象，在这种情况下是构造的对象。

此方法用于使用给定的 `napi_value` 实例化一个新的 JavaScript 值，该值表示对象的构造函数。例如，考虑以下代码片段：

```js
function MyObject(param) {
  this.param = param;
}

const arg = 'hello';
const value = new MyObject(arg);
```

可以使用以下代码片段在 Node-API 中近似实现以下内容：

```c
// 获取构造函数 MyObject
napi_value global, constructor, arg, value;
napi_status status = napi_get_global(env, &global);
if (status != napi_ok) return;

status = napi_get_named_property(env, global, "MyObject", &constructor);
if (status != napi_ok) return;

// const arg = "hello"
status = napi_create_string_utf8(env, "hello", NAPI_AUTO_LENGTH, &arg);
if (status != napi_ok) return;

napi_value* argv = &arg;
size_t argc = 1;

// const value = new MyObject(arg)
status = napi_new_instance(env, constructor, argc, argv, &value);
```

如果 API 成功，则返回 `napi_ok`。

## 对象包装

Node-API 提供了一种方法来“包装”C++ 类和实例，以便可以从 JavaScript 调用类构造函数和方法。

1. [`napi_define_class`][] API 定义了一个 JavaScript 类，具有构造函数、静态属性和方法，以及对应于 C++ 类的实例属性和方法。
2. 当 JavaScript 代码调用构造函数时，构造函数回调使用 [`napi_wrap`][] 将新的 C++ 实例包装在 JavaScript 对象中，然后返回包装对象。
3. 当 JavaScript 代码调用类上的方法或属性访问器时，将调用相应的 `napi_callback` C++ 函数。对于实例回调，[`napi_unwrap`][] 获取作为调用目标的 C++ 实例。

对于包装的对象，可能很难区分是在类原型上调用的函数还是在类的实例上调用的函数。解决此问题的常用模式是保存对类构造函数的持久引用，以便稍后进行 `instanceof` 检查。

```c
napi_value MyClass_constructor = NULL;
status = napi_get_reference_value(env, MyClass::es_constructor, &MyClass_constructor);
assert(napi_ok == status);
bool is_instance = false;
status = napi_instanceof(env, es_this, MyClass_constructor, &is_instance);
assert(napi_ok == status);
if (is_instance) {
  // napi_unwrap() ...
} else {
  // 否则...
}
```

引用不再需要时必须释放。

有些情况下，`napi_instanceof()` 不足以确保 JavaScript 对象是特定原生类型的包装器。特别是当包装的 JavaScript 对象通过静态方法而不是作为原型方法的 `this` 值传回插件时，就会出现这种情况。在这种情况下，它们可能会被错误地解包。

```js
const myAddon = require('./build/Release/my_addon.node');

// `openDatabase()` 返回一个包装了原生数据库
// 句柄的 JavaScript 对象。
const dbHandle = myAddon.openDatabase();

// `query()` 返回一个包装了原生查询句柄的 JavaScript 对象。
const queryHandle = myAddon.query(dbHandle, 'Gimme ALL the things!');

// 下面一行有一个意外错误。`myAddon.queryHasRecords()` 的第一个参数应该是
// 数据库句柄 (`dbHandle`)，而不是查询句柄 (`query`)，所以 while 循环的正确条件应该是
//
// myAddon.queryHasRecords(dbHandle, queryHandle)
//
while (myAddon.queryHasRecords(queryHandle, dbHandle)) {
  // 检索记录
}
```

在上面的示例中，`myAddon.queryHasRecords()` 是一个接受两个参数的方法。第一个是数据库句柄，第二个是查询句柄。在内部，它解包第一个参数并将结果指针转换为原生数据库句柄。然后它解包第二个参数并将结果指针转换为查询句柄。如果参数顺序错误，转换将起作用，但是，底层数据库操作很有可能会失败，甚至可能导致无效内存访问。

为了确保从第一个参数检索到的指针确实是指向数据库句柄的指针，同样，从第二个参数检索到的指针确实是指向查询句柄的指针，`queryHasRecords()` 的实现必须执行类型验证。保留数据库句柄实例化所在的 JavaScript 类构造函数和查询句柄实例化所在的构造函数在 `napi_ref` 中会有所帮助，因为随后可以使用 `napi_instanceof()` 来确保传递给 `queryHashRecords()` 的实例确实是正确的类型。

不幸的是，`napi_instanceof()` 不能防止原型操作。例如，数据库句柄实例的原型可以设置为查询句柄实例构造函数的原型。在这种情况下，数据库句柄实例可以显示为查询句柄实例，并且它将通过查询句柄实例的 `napi_instanceof()` 测试，同时仍然包含指向数据库句柄的指针。

为此，Node-API 提供了类型标记功能。

类型标签是插件唯一的 128 位整数。Node-API 提供 `napi_type_tag` 结构用于存储类型标签。当将此值与存储在 `napi_value` 中的 JavaScript 对象或 [外部][] 一起传递给 `napi_type_tag_object()` 时，JavaScript 对象将被“标记”上类型标签。该“标记”在 JavaScript 端是不可见的。当 JavaScript 对象进入原生绑定时，可以使用 `napi_check_object_type_tag()` 配合原始类型标签来确定 JavaScript 对象之前是否被“标记”了该类型标签。这创建了比 `napi_instanceof()` 提供的更高保真度的类型检查功能，因为此类类型标记在原型操作和插件卸载/重新加载后仍然存在。

继续上面的示例，以下插件实现骨架说明了 `napi_type_tag_object()` 和 `napi_check_object_type_tag()` 的使用。

```c
// 此值是数据库句柄的类型标签。命令
//
//   uuidgen | sed -r -e 's/-//g' -e 's/(.{16})(.*)/0x\1, 0x\2/'
//
// 可用于获取用于初始化结构的两个值。
static const napi_type_tag DatabaseHandleTypeTag = {
  0x1edf75a38336451d, 0xa5ed9ce2e4c00c38
};

// 此值是查询句柄的类型标签。
static const napi_type_tag QueryHandleTypeTag = {
  0x9c73317f9fad44a3, 0x93c3920bf3b0ad6a
};

static napi_value
openDatabase(napi_env env, napi_callback_info info) {
  napi_status status;
  napi_value result;

  // 执行底层操作，结果是数据库句柄。
  DatabaseHandle* dbHandle = open_database();

  // 创建一个新的空 JS 对象。
  status = napi_create_object(env, &result);
  if (status != napi_ok) return NULL;

  // 标记对象以指示它持有指向 `DatabaseHandle` 的指针。
  status = napi_type_tag_object(env, result, &DatabaseHandleTypeTag);
  if (status != napi_ok) return NULL;

  // 将指向 `DatabaseHandle` 结构的指针存储在 JS 对象内部。
  status = napi_wrap(env, result, dbHandle, NULL, NULL, NULL);
  if (status != napi_ok) return NULL;

  return result;
}

// 稍后当我们收到一个声称是数据库句柄的 JavaScript 对象时，
// 我们可以使用 `napi_check_object_type_tag()` 来确保它确实是这样的句柄。

static napi_value
query(napi_env env, napi_callback_info info) {
  napi_status status;
  size_t argc = 2;
  napi_value argv[2];
  bool is_db_handle;

  status = napi_get_cb_info(env, info, &argc, argv, NULL, NULL);
  if (status != napi_ok) return NULL;

  // 检查作为第一个参数传入的对象是否具有之前应用的标签。
  status = napi_check_object_type_tag(env,
                                      argv[0],
                                      &DatabaseHandleTypeTag,
                                      &is_db_handle);
  if (status != napi_ok) return NULL;

  // 如果没有，则抛出 `TypeError`。
  if (!is_db_handle) {
    // 抛出 TypeError。
    return NULL;
  }
}
```

### `napi_define_class`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_define_class(napi_env env,
                              const char* utf8name,
                              size_t length,
                              napi_callback constructor,
                              void* data,
                              size_t property_count,
                              const napi_property_descriptor* properties,
                              napi_value* result);
```

* `[in] env`：调用 API 所处的环境。
* `[in] utf8name`：JavaScript 构造函数的名称。为了清晰起见，建议在包装 C++ 类时使用 C++ 类名。
* `[in] length`：`utf8name` 的长度（以字节为单位），如果它是空终止的，则为 `NAPI_AUTO_LENGTH`。
* `[in] constructor`：处理构造类实例的回调函数。当包装 C++ 类时，此方法必须是具有 [`napi_callback`][] 签名的静态成员。不能使用 C++ 类构造函数。[`napi_callback`][] 提供了更多详细信息。
* `[in] data`：可选数据，作为回调信息的 `data` 属性传递给构造函数回调。
* `[in] property_count`：`properties` 数组参数中的项数。
* `[in] properties`：属性描述符数组，描述类上的静态和实例数据属性、访问器和方法。请参阅 `napi_property_descriptor`。
* `[out] result`：`napi_value`，表示类的构造函数函数。

如果 API 成功，则返回 `napi_ok`。

定义一个 JavaScript 类，包括：

* 一个具有类名的 JavaScript 构造函数函数。当包装相应的 C++ 类时，可以通过 `constructor` 传递的回调用于实例化新的 C++ 类实例，然后可以使用 [`napi_wrap`][] 将其放置在正在构造的 JavaScript 对象实例内部。
* 构造函数函数上的属性，其实现可以调用 C++ 类的相应 _静态_ 数据属性、访问器和方法（由具有 `napi_static` 属性的属性描述符定义）。
* 构造函数函数的 `prototype` 对象上的属性。当包装 C++ 类时，在使用 [`napi_unwrap`][] 检索放置在 JavaScript 对象实例内部的 C++ 类实例后，可以从属性描述符中给出的静态函数调用 C++ 类的 _非静态_ 数据属性、访问器和方法，而不带 `napi_static` 属性。

当包装 C++ 类时，通过 `constructor` 传递的 C++ 构造函数回调应该是类上的静态方法，该方法调用实际的类构造函数，然后将新的 C++ 实例包装在 JavaScript 对象中，并返回包装对象。有关详细信息，请参阅 [`napi_wrap`][]。

从 [`napi_define_class`][] 返回的 JavaScript 构造函数函数通常被保存并稍后用于从原生代码构造类的新实例，和/或检查提供的值是否是类的实例。在这种情况下，为了防止函数值被垃圾回收，可以使用 [`napi_create_reference`][] 创建对其的强持久引用，确保引用计数保持 >= 1。

任何通过 `data` 参数或 `napi_property_descriptor` 数组项的 `data` 字段传递到此 API 的非 `NULL` 数据，都可以与生成的 JavaScript 构造函数（在 `result` 参数中返回）关联，并在类被垃圾回收时通过将 JavaScript 函数和数据传递给 [`napi_add_finalizer`][] 来释放。

### `napi_wrap`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_wrap(napi_env env,
                      napi_value js_object,
                      void* native_object,
                      napi_finalize finalize_cb,
                      void* finalize_hint,
                      napi_ref* result);
```

* `[in] env`：调用 API 所处的环境。
* `[in] js_object`：将作为原生对象包装器的 JavaScript 对象。
* `[in] native_object`：将包装在 JavaScript 对象中的原生实例。
* `[in] finalize_cb`：可选的原生回调，可用于在 JavaScript 对象被垃圾回收时释放原生实例。[`napi_finalize`][] 提供了更多详细信息。
* `[in] finalize_hint`：传递给终结回调的可选上下文提示。
* `[out] result`：对被包装对象的可选引用。

如果 API 成功，则返回 `napi_ok`。

将原生实例包装在 JavaScript 对象中。稍后可以使用 `napi_unwrap()` 检索原生实例。

当 JavaScript 代码调用使用 `napi_define_class()` 定义的类的构造函数时，将调用构造函数的 `napi_callback`。在构造原生类的实例后，回调必须然后调用 `napi_wrap()` 将新构造的实例包装在已经是构造函数回调的 `this` 参数的已创建 JavaScript 对象中。（该 `this` 对象是从构造函数函数的 `prototype` 创建的，因此它已经具有所有实例属性和方法的定义。）

通常在包装类实例时，应提供一个终结回调，该回调简单地删除作为 `data` 参数接收到的原生实例。

可选的返回引用最初是弱引用，意味着它的引用计数为 0。通常，在需要实例保持有效的异步操作期间，此引用计数会暂时增加。

_注意_：可选的返回引用（如果获得）应仅响应终结回调调用通过 [`napi_delete_reference`][] 删除。如果在此之前删除，则可能永远不会调用终结回调。因此，在获取引用时也需要终结回调，以便能够正确处置引用。

终结器回调可能会延迟，留下一个窗口，其中对象已被垃圾回收（并且弱引用无效），但终结器尚未被调用。当对 `napi_wrap()` 返回的弱引用使用 `napi_get_reference_value()` 时，您仍然应该处理空结果。

在对象上第二次调用 `napi_wrap()` 将返回错误。要将另一个原生实例与对象关联，请先使用 `napi_remove_wrap()`。

### `napi_unwrap`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_unwrap(napi_env env,
                        napi_value js_object,
                        void** result);
```

* `[in] env`：调用 API 所处的环境。
* `[in] js_object`：与原生实例关联的对象。
* `[out] result`：指向被包装的原生实例的指针。

如果 API 成功，则返回 `napi_ok`。

检索之前使用 `napi_wrap()` 包装在 JavaScript 对象中的原生实例。

当 JavaScript 代码调用类上的方法或属性访问器时，将调用相应的 `napi_callback`。如果回调是针对实例方法或访问器的，则回调的 `this` 参数是包装对象；然后可以通过在包装对象上调用 `napi_unwrap()` 获取作为调用目标的被包装的 C++ 实例。

### `napi_remove_wrap`

<!-- YAML
added: v8.5.0
napiVersion: 1
-->

```c
napi_status napi_remove_wrap(napi_env env,
                             napi_value js_object,
                             void** result);
```

* `[in] env`：调用 API 所处的环境。
* `[in] js_object`：与原生实例关联的对象。
* `[out] result`：指向被包装的原生实例的指针。

如果 API 成功，则返回 `napi_ok`。

检索之前使用 `napi_wrap()` 包装在 JavaScript 对象 `js_object` 中的原生实例，并移除包装。如果终结回调与包装关联，则当 JavaScript 对象变为垃圾回收时，它将不再被调用。

### `napi_type_tag_object`

<!-- YAML
added:
  - v14.8.0
  - v12.19.0
napiVersion: 8
-->

```c
napi_status napi_type_tag_object(napi_env env,
                                 napi_value js_object,
                                 const napi_type_tag* type_tag);
```

* `[in] env`：调用 API 所处的环境。
* `[in] js_object`：要标记的 JavaScript 对象或 [外部][]。
* `[in] type_tag`：用于标记对象的标签。

如果 API 成功，则返回 `napi_ok`。

将 `type_tag` 指针的值与 JavaScript 对象或 [外部][] 关联。然后可以使用 `napi_check_object_type_tag()` 将附加到对象的标签与插件拥有的标签进行比较，以确保对象具有正确的类型。

如果对象已经有关联的类型标签，此 API 将返回 `napi_invalid_arg`。

### `napi_check_object_type_tag`

<!-- YAML
added:
  - v14.8.0
  - v12.19.0
napiVersion: 8
-->

```c
napi_status napi_check_object_type_tag(napi_env env,
                                       napi_value js_object,
                                       const napi_type_tag* type_tag,
                                       bool* result);
```

* `[in] env`：调用 API 所处的环境。
* `[in] js_object`：要检查其类型标签的 JavaScript 对象或 [外部][]。
* `[in] type_tag`：用于与对象上找到的任何标签进行比较的标签。
* `[out] result`：给定的类型标签是否与对象上的类型标签匹配。如果对象上未找到类型标签，也返回 `false`。

如果 API 成功，则返回 `napi_ok`。

将作为 `type_tag` 给出的指针与 `js_object` 上可能找到的任何指针进行比较。如果在 `js_object` 上未找到标签，或者如果找到标签但不匹配 `type_tag`，则 `result` 设置为 `false`。如果找到标签且匹配 `type_tag`，则 `result` 设置为 `true`。

### `napi_add_finalizer`

<!-- YAML
added: v8.0.0
napiVersion: 5
-->

```c
napi_status napi_add_finalizer(napi_env env,
                               napi_value js_object,
                               void* finalize_data,
                               node_api_basic_finalize finalize_cb,
                               void* finalize_hint,
                               napi_ref* result);
```

* `[in] env`：调用 API 所处的环境。
* `[in] js_object`：将附加原生数据的 JavaScript 对象。
* `[in] finalize_data`：传递给 `finalize_cb` 的可选数据。
* `[in] finalize_cb`：当 JavaScript 对象被垃圾回收时将用于释放原生数据的原生回调。[`napi_finalize`][] 提供了更多详细信息。
* `[in] finalize_hint`：传递给终结回调的可选上下文提示。
* `[out] result`：对 JavaScript 对象的可选引用。

如果 API 成功，则返回 `napi_ok`。

添加一个 `napi_finalize` 回调，当 `js_object` 中的 JavaScript 对象被垃圾回收时将调用该回调。

此 API 可以在单个 JavaScript 对象上调用多次。

_注意_：可选的返回引用（如果获得）应仅响应终结回调调用通过 [`napi_delete_reference`][] 删除。如果在此之前删除，则可能永远不会调用终结回调。因此，在获取引用时也需要终结回调，以便能够正确处置引用。

#### `node_api_post_finalizer`

<!-- YAML
added:
  - v21.0.0
  - v20.10.0
  - v18.19.0
-->

> 稳定性：1 - 实验性

```c
napi_status node_api_post_finalizer(node_api_basic_env env,
                                    napi_finalize finalize_cb,
                                    void* finalize_data,
                                    void* finalize_hint);
```

* `[in] env`：调用 API 所处的环境。
* `[in] finalize_cb`：当 JavaScript 对象被垃圾回收时将用于释放原生数据的原生回调。[`napi_finalize`][] 提供了更多详细信息。
* `[in] finalize_data`：传递给 `finalize_cb` 的可选数据。
* `[in] finalize_hint`：传递给终结回调的可选上下文提示。

如果 API 成功，则返回 `napi_ok`。

计划一个 `napi_finalize` 回调在事件循环中异步调用。

通常，终结器在 GC（垃圾回收器）收集对象时调用。此时调用任何可能导致 GC 状态变化的 Node-API 将被禁用并导致 Node.js 崩溃。

`node_api_post_finalizer` 通过允许插件将对此类 Node-API 的调用推迟到 GC 终结之外的时间点，有助于解决此限制。

## 简单异步操作

插件模块通常需要在实现中利用 libuv 的异步辅助函数。这使它们能够将工作调度为异步执行，从而使其方法可以在工作完成之前返回。这有助于它们避免阻塞 Node.js 应用程序的整体执行。

Node-API 为这些支持函数提供了 ABI 稳定的接口，涵盖最常见的异步用例。

Node-API 定义了 `napi_async_work` 结构体，用于管理异步 worker。实例通过 [`napi_create_async_work`][] 和 [`napi_delete_async_work`][] 创建/删除。

`execute` 和 `complete` 回调是函数，分别会在执行器准备好执行以及完成任务时被调用。

`execute` 函数应避免进行任何可能导致执行 JavaScript 或与 JavaScript 对象交互的 Node-API 调用。大多数情况下，任何需要调用 Node-API 的代码都应改为放在 `complete` 回调中。避免在 execute 回调中使用 `napi_env` 参数，因为它可能会执行 JavaScript。

这些函数实现以下接口：

```c
typedef void (*napi_async_execute_callback)(napi_env env,
                                            void* data);
typedef void (*napi_async_complete_callback)(napi_env env,
                                             napi_status status,
                                             void* data);
```

当调用这些方法时，传入的 `data` 参数将是传递给 `napi_create_async_work` 调用的插件提供的 `void*` 数据。

一旦创建，异步 worker 可以使用 [`napi_queue_async_work`][] 函数排队执行：

```c
napi_status napi_queue_async_work(node_api_basic_env env,
                                  napi_async_work work);
```

如果需要在工作开始执行之前取消工作，可以使用 [`napi_cancel_async_work`][]。

调用 [`napi_cancel_async_work`][] 后，`complete` 回调将被调用，状态值为 `napi_cancelled`。即使在取消的情况下，也不应在 `complete` 回调被调用之前删除工作。

### `napi_create_async_work`

<!-- YAML
added: v8.0.0
napiVersion: 1
changes:
  - version: v8.6.0
    pr-url: https://github.com/nodejs/node/pull/14697
    description: "添加了 `async_resource` 和 `async_resource_name` 参数。"
-->

```c
napi_status napi_create_async_work(napi_env env,
                                   napi_value async_resource,
                                   napi_value async_resource_name,
                                   napi_async_execute_callback execute,
                                   napi_async_complete_callback complete,
                                   void* data,
                                   napi_async_work* result);
```

* `[in] env`：调用 API 所处的环境。
* `[in] async_resource`：与异步工作关联的可选对象，将传递给可能的 `async_hooks` [`init` 钩子][]。
* `[in] async_resource_name`：为 `async_hooks` API 公开的诊断信息提供的资源类型标识符。
* `[in] execute`：应被调用以异步执行逻辑的原生函数。给定函数从线程池线程调用，可与主事件循环线程并行执行。
* `[in] complete`：当异步逻辑完成或被取消时将调用的原生函数。给定函数从主事件循环线程调用。[`napi_async_complete_callback`][] 提供了更多细节。
* `[in] data`：用户提供的数据上下文。这将回传给 execute 和 complete 函数。
* `[out] result`：`napi_async_work*`，即新创建的异步工作句柄。

如果 API 成功，返回 `napi_ok`。

此 API 分配一个用于异步执行逻辑的工作对象。一旦不再需要该工作，应使用 [`napi_delete_async_work`][] 释放它。

`async_resource_name` 应为一个以 null 结尾的 UTF-8 编码字符串。

`async_resource_name` 标识符由用户提供，应表示正在执行的异步工作类型。还建议对该标识符应用命名空间，例如包含模块名。有关更多信息，请参阅 [`async_hooks` 文档][async_hooks `type`]。

### `napi_delete_async_work`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_delete_async_work(napi_env env,
                                   napi_async_work work);
```

* `[in] env`：调用 API 所处的环境。
* `[in] work`：调用 `napi_create_async_work` 返回的句柄。

如果 API 成功，返回 `napi_ok`。

此 API 释放先前分配的工作对象。

即使存在挂起的 JavaScript 异常，也可以调用此 API。

### `napi_queue_async_work`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_queue_async_work(node_api_basic_env env,
                                  napi_async_work work);
```

* `[in] env`：调用 API 所处的环境。
* `[in] work`：调用 `napi_create_async_work` 返回的句柄。

如果 API 成功，返回 `napi_ok`。

此 API 请求将先前分配的工作调度执行。一旦成功返回，不得再次使用同一个 `napi_async_work` 项调用此 API，否则结果将未定义。

### `napi_cancel_async_work`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_cancel_async_work(node_api_basic_env env,
                                   napi_async_work work);
```

* `[in] env`：调用 API 所处的环境。
* `[in] work`：调用 `napi_create_async_work` 返回的句柄。

如果 API 成功，返回 `napi_ok`。

此 API 取消尚未开始的排队工作。如果它已经开始执行，则无法取消，并将返回 `napi_generic_failure`。如果成功，`complete` 回调将被调用，状态值为 `napi_cancelled`。即使已成功取消，也不应在 `complete` 回调调用之前删除工作。

即使存在挂起的 JavaScript 异常，也可以调用此 API。

## 自定义异步操作

上述简单异步工作 API 可能不适用于每种场景。当使用任何其他异步机制时，需要以下 API 来确保异步操作被运行时正确跟踪。

### `napi_async_init`

<!-- YAML
added: v8.6.0
napiVersion: 1
changes:
  - version: v25.0.0
    pr-url: https://github.com/nodejs/node/pull/59828
    description: async_resource 对象现在将作为强引用持有。
-->

```c
napi_status napi_async_init(napi_env env,
                            napi_value async_resource,
                            napi_value async_resource_name,
                            napi_async_context* result)
```

* `[in] env`：调用 API 所处的环境。
* `[in] async_resource`：与异步工作关联的对象，将传递给可能的 `async_hooks` [`init` 钩子][]，并且可以通过 [`async_hooks.executionAsyncResource()`][] 访问。
* `[in] async_resource_name`：为 `async_hooks` API 公开的诊断信息提供的资源类型标识符。
* `[out] result`：初始化的异步上下文。

如果 API 成功，返回 `napi_ok`。

为了保留与旧版本的 ABI 兼容性，为 `async_resource` 传递 `NULL` 不会导致错误。但是，不建议这样做，因为这会导致 `async_hooks` [`init` 钩子][] 和 `async_hooks.executionAsyncResource()` 出现不良行为，因为底层的 `async_hooks` 实现现在需要该资源来提供异步回调之间的链接。

此 API 的旧版本在 `napi_async_context` 对象存在期间并未维持对 `async_resource` 的强引用，而是期望调用者持有强引用。这一点已更改，因为无论如何都需要为每次调用 `napi_async_init()` 对应调用 [`napi_async_destroy`][]，以避免内存泄漏。

### `napi_async_destroy`

<!-- YAML
added: v8.6.0
napiVersion: 1
-->

```c
napi_status napi_async_destroy(napi_env env,
                               napi_async_context async_context);
```

* `[in] env`：调用 API 所处的环境。
* `[in] async_context`：要销毁的异步上下文。

如果 API 成功，返回 `napi_ok`。

即使存在挂起的 JavaScript 异常，也可以调用此 API。

### `napi_make_callback`

<!-- YAML
added: v8.0.0
napiVersion: 1
changes:
  - version: v8.6.0
    pr-url: https://github.com/nodejs/node/pull/15189
    description: "添加了 `async_context` 参数。"
-->

```c
NAPI_EXTERN napi_status napi_make_callback(napi_env env,
                                           napi_async_context async_context,
                                           napi_value recv,
                                           napi_value func,
                                           size_t argc,
                                           const napi_value* argv,
                                           napi_value* result);
```

* `[in] env`：调用 API 所处的环境。
* `[in] async_context`：调用回调的异步操作上下文。这通常应是先前从 [`napi_async_init`][] 获得的值。为了保留与旧版本的 ABI 兼容性，为 `async_context` 传递 `NULL` 不会导致错误。但是，这会导致异步钩子操作不正确。潜在问题包括在使用 `AsyncLocalStorage` API 时丢失异步上下文。
* `[in] recv`：传递给被调用函数的 `this` 值。
* `[in] func`：`napi_value`，表示要调用的 JavaScript 函数。
* `[in] argc`：`argv` 数组中的元素计数。
* `[in] argv`：`napi_value` 形式的 JavaScript 值数组，表示函数的参数。如果 `argc` 为零，可以通过传递 `NULL` 省略此参数。
* `[out] result`：`napi_value`，表示返回的 JavaScript 对象。

如果 API 成功，返回 `napi_ok`。

此方法允许从原生插件调用 JavaScript 函数对象。此 API 类似于 `napi_call_function`。但是，它用于在从异步操作返回后（当栈上没有其他脚本时）从原生代码调用回 JavaScript。它是对 `node::MakeCallback` 的一个相当简单的封装。

注意，在 `napi_async_complete_callback` 内部_不_需要使用 `napi_make_callback`；在这种情况下，回调的异步上下文已经设置好了，因此直接调用 `napi_call_function` 就足够且合适。在实现不使用 `napi_create_async_work` 的自定义异步行为时，可能需要使用 `napi_make_callback` 函数。

回调期间由 JavaScript 调度到微任务队列上的任何 `process.nextTick` 或 Promise 都会在返回 C/C++ 之前运行。

### `napi_open_callback_scope`

<!-- YAML
added: v9.6.0
napiVersion: 3
-->

```c
NAPI_EXTERN napi_status napi_open_callback_scope(napi_env env,
                                                 napi_value resource_object,
                                                 napi_async_context context,
                                                 napi_callback_scope* result)
```

* `[in] env`：调用 API 所处的环境。
* `[in] resource_object`：与异步工作关联的对象，将传递给可能的 `async_hooks` [`init` 钩子][]。此参数已弃用，在运行时被忽略。请改用 [`napi_async_init`][] 中的 `async_resource` 参数。
* `[in] context`：调用回调的异步操作上下文。这应是先前从 [`napi_async_init`][] 获得的值。
* `[out] result`：新创建的作用域。

在某些情况下（例如解析 promise），在进行某些 Node-API 调用时，必须拥有与回调关联的作用域等效项。如果栈上没有其他脚本，可以使用 [`napi_open_callback_scope`][] 和 [`napi_close_callback_scope`][] 函数来打开/关闭所需的作用域。

### `napi_close_callback_scope`

<!-- YAML
added: v9.6.0
napiVersion: 3
-->

```c
NAPI_EXTERN napi_status napi_close_callback_scope(napi_env env,
                                                  napi_callback_scope scope)
```

* `[in] env`：调用 API 所处的环境。
* `[in] scope`：要关闭的作用域。

即使存在挂起的 JavaScript 异常，也可以调用此 API。

## 版本管理

### `napi_get_node_version`

<!-- YAML
added: v8.4.0
napiVersion: 1
-->

```c
typedef struct {
  uint32_t major;
  uint32_t minor;
  uint32_t patch;
  const char* release;
} napi_node_version;

napi_status napi_get_node_version(node_api_basic_env env,
                                  const napi_node_version** version);
```

* `[in] env`：调用此 API 所处的环境。
* `[out] version`：指向 Node.js 本身版本信息的指针。

如果 API 成功，则返回 `napi_ok`。

此函数会用当前运行的 Node.js 的主版本、次版本和补丁版本填充 `version` 结构体，并用 [`process.release.name`][`process.release`] 的值填充 `release` 字段。

返回的缓冲区是静态分配的，无需释放。

### `napi_get_version`

<!-- YAML
added: v8.0.0
napiVersion: 1
-->

```c
napi_status napi_get_version(node_api_basic_env env,
                             uint32_t* result);
```

* `[in] env`：调用此 API 所处的环境。
* `[out] result`：支持的最高 Node-API 版本。

如果 API 成功，则返回 `napi_ok`。

此 API 返回 Node.js 运行时支持的最高 Node-API 版本。Node-API 计划是累加式的，因此较新版本的 Node.js 可能支持额外的 API 函数。为了允许插件在支持该函数的 Node.js 版本上运行时使用较新的函数，同时在不支持该函数的 Node.js 版本上运行时提供回退行为：

* 调用 `napi_get_version()` 以确定 API 是否可用。
* 如果可用，使用 `uv_dlsym()` 动态加载函数指针。
* 使用动态加载的指针调用函数。
* 如果函数不可用，提供不使用该函数的替代实现。

## 内存管理

### `napi_adjust_external_memory`

<!-- YAML
added: v8.5.0
napiVersion: 1
-->

```c
NAPI_EXTERN napi_status napi_adjust_external_memory(node_api_basic_env env,
                                                    int64_t change_in_bytes,
                                                    int64_t* result);
```

* `[in] env`：调用此 API 所处的环境。
* `[in] change_in_bytes`：由 JavaScript 对象保持存活的外部分配内存变化量。
* `[out] result`：调整后的值。该值应反映包含给定 `change_in_bytes` 在内的外部内存总量。不应依赖返回值的绝对值。例如，实现可能对所有插件使用单个计数器，或对每个插件使用一个计数器。

如果 API 成功，则返回 `napi_ok`。

此函数向运行时指示由 JavaScript 对象保持存活的外部分配内存量（即指向由原生插件分配并由其自身持有的内存的 JavaScript 对象）。注册外部分配的内存可能会（但不保证）比未注册时更频繁地触发全局垃圾回收。

调用此函数时，应确保插件减少的外部内存不超过其增加的外部内存。

## Promise

Node-API 提供了创建 `Promise` 对象的功能，如 ECMA 规范 [Promise 对象部分][] 所述。它将 promise 实现为一对对象。当通过 `napi_create_promise()` 创建 promise 时，会创建一个 "deferred" 对象并与 `Promise` 一起返回。deferred 对象绑定到创建的 `Promise`，是使用 `napi_resolve_deferred()` 或 `napi_reject_deferred()` 解决或拒绝 `Promise` 的唯一方式。由 `napi_create_promise()` 创建的 deferred 对象将由 `napi_resolve_deferred()` 或 `napi_reject_deferred()` 释放。`Promise` 对象可以返回给 JavaScript，在那里它可以像通常一样使用。

例如，创建一个 promise 并将其传递给异步 worker：

```c
napi_deferred deferred;
napi_value promise;
napi_status status;

// 创建 promise。
status = napi_create_promise(env, &deferred, &promise);
if (status != napi_ok) return NULL;

// 将 deferred 传递给执行异步操作的函数。
do_something_asynchronous(deferred);

// 将 promise 返回给 JS
return promise;
```

上述函数 `do_something_asynchronous()` 将执行其异步操作，然后解决或拒绝 deferred，从而结束 promise 并释放 deferred：

```c
napi_deferred deferred;
napi_value undefined;
napi_status status;

// 创建一个用于结束 deferred 的值。
status = napi_get_undefined(env, &undefined);
if (status != napi_ok) return NULL;

// 根据异步操作是否成功，解决或拒绝与 deferred 关联的 promise。
if (asynchronous_action_succeeded) {
  status = napi_resolve_deferred(env, deferred, undefined);
} else {
  status = napi_reject_deferred(env, deferred, undefined);
}
if (status != napi_ok) return NULL;

// 此时 deferred 已被释放，所以我们应该将其赋值为 NULL。
deferred = NULL;
```

### `napi_create_promise`

<!-- YAML
added: v8.5.0
napiVersion: 1
-->

```c
napi_status napi_create_promise(napi_env env,
                                napi_deferred* deferred,
                                napi_value* promise);
```

* `[in] env`：调用此 API 所处的环境。
* `[out] deferred`：新创建的 deferred 对象，稍后可传递给 `napi_resolve_deferred()` 或 `napi_reject_deferred()` 以分别解决或拒绝关联的 promise。
* `[out] promise`：与 deferred 对象关联的 JavaScript promise。

如果 API 成功，则返回 `napi_ok`。

此 API 创建一个 deferred 对象和一个 JavaScript promise。

### `napi_resolve_deferred`

<!-- YAML
added: v8.5.0
napiVersion: 1
-->

```c
napi_status napi_resolve_deferred(napi_env env,
                                  napi_deferred deferred,
                                  napi_value resolution);
```

* `[in] env`：调用此 API 所处的环境。
* `[in] deferred`：要解决其关联 promise 的 deferred 对象。
* `[in] resolution`：用于解决 promise 的值。

此 API 通过与之关联的 deferred 对象解决 JavaScript promise。因此，它只能用于解决具有相应 deferred 对象的 JavaScript promise。这实际上意味着 promise 必须是使用 `napi_create_promise()` 创建的，并且必须保留该调用返回的 deferred 对象才能传递给此 API。

deferred 对象在成功完成后被释放。

### `napi_reject_deferred`

<!-- YAML
added: v8.5.0
napiVersion: 1
-->

```c
napi_status napi_reject_deferred(napi_env env,
                                 napi_deferred deferred,
                                 napi_value rejection);
```

* `[in] env`：调用此 API 所处的环境。
* `[in] deferred`：要拒绝其关联 promise 的 deferred 对象。
* `[in] rejection`：用于拒绝 promise 的值。

此 API 通过与之关联的 deferred 对象拒绝 JavaScript promise。因此，它只能用于拒绝具有相应 deferred 对象的 JavaScript promise。这实际上意味着 promise 必须是使用 `napi_create_promise()` 创建的，并且必须保留该调用返回的 deferred 对象才能传递给此 API。

deferred 对象在成功完成后被释放。

### `napi_is_promise`

<!-- YAML
added: v8.5.0
napiVersion: 1
-->

```c
napi_status napi_is_promise(napi_env env,
                            napi_value value,
                            bool* is_promise);
```

* `[in] env`：调用此 API 所处的环境。
* `[in] value`：要检查的值
* `[out] is_promise`：标志，指示 `promise` 是否为原生 promise 对象（即由底层引擎创建的 promise 对象）。

## Script Execution

Node-API provides an API for executing strings containing JavaScript using the underlying JavaScript engine.

### `napi_run_script`

<!-- YAML
added: v8.5.0
napiVersion: 1
-->

```c
NAPI_EXTERN napi_status napi_run_script(napi_env env,
                                        napi_value script,
                                        napi_value* result);
```

* `[in] env`：The environment in which the API is called.
* `[in] script`：A JavaScript string containing the script to execute.
* `[out] result`：The value produced after executing the script.

This function executes a JavaScript code string and returns its result, with the following caveats:

* Unlike `eval`, this function does not allow the script to access the current lexical scope, and therefore does not allow access to [module scope][]. This means pseudo-global variables such as `require` will not be available.
* The script can access the [global scope][]. Functions and `var` declarations in the script will be added to the [`global`][] object. Variable declarations using `let` and `const` will be visible globally, but will not be added to the [`global`][] object.
* The value of `this` in the script is [`global`][].

## libuv Event Loop

Node-API provides a function for obtaining the current event loop associated with a specific `napi_env`.

### `napi_get_uv_event_loop`

<!-- YAML
added:
  - v9.3.0
  - v8.10.0
napiVersion: 2
-->

```c
NAPI_EXTERN napi_status napi_get_uv_event_loop(node_api_basic_env env,
                                               struct uv_loop_s** loop);
```

* `[in] env`：The environment in which the API is called.
* `[out] loop`：The current libuv loop instance.

Note: Although libuv only guarantees ABI stability in the major version [ABI stability](https://github.com/libuv/libuv?tab=readme-ov-file#versioning),
using it may result in an addon that does not work across
Node.js major versions.

[Thread-safe functions](#asynchronous-thread-safe-function-calls)
are, for many use cases, an ABI-stable alternative for calling the
JavaScript thread from another thread.

## Asynchronous Thread-Safe Function Calls

JavaScript functions can usually only be called from the main thread of a native addon. If an addon creates additional threads, Node-API functions requiring `napi_env`, `napi_value`, or `napi_ref` must not be called from those threads.

When an addon has additional threads and needs to call a JavaScript function based on work done on those threads, those threads must communicate with the addon's main thread so that the main thread can call the JavaScript function on their behalf. The thread-safe function API provides a simple way to achieve this.

These APIs provide the `napi_threadsafe_function` type and APIs for creating, destroying, and calling objects of that type.
`napi_create_threadsafe_function()` creates a persistent reference to a `napi_value` that holds a JavaScript function that can be called from multiple threads. Calls happen asynchronously. This means that the values used to call the JavaScript callback are queued, and for each value in the queue, the JavaScript function will eventually be called.

When creating a `napi_threadsafe_function`, a `napi_finalize` callback can be provided. This callback will be invoked on the main thread when the thread-safe function is about to be destroyed. It receives the context and finalize data provided during construction, and provides an opportunity to clean up after threads, for example by calling `uv_thread_join()`. **After the finalize callback completes, no thread other than the main loop thread should use the thread-safe function anymore.**

The `context` given during the call to `napi_create_threadsafe_function()` can be retrieved from any thread by calling `napi_get_threadsafe_function_context()`.

### Calling a Thread-Safe Function

`napi_call_threadsafe_function()` can be used to initiate a call into JavaScript. `napi_call_threadsafe_function()` accepts an argument to control whether the API behaves in a blocking manner. If set to `napi_tsfn_nonblocking`, the API behaves as non-blocking and returns `napi_queue_full` if the queue is full, preventing the data from being successfully added to the queue. If set to `napi_tsfn_blocking`, the API blocks until space is available in the queue. If the maximum queue size is 0 when the thread-safe function is created, `napi_call_threadsafe_function()` will never block.

`napi_call_threadsafe_function()` should not be called with `napi_tsfn_blocking` from the JavaScript thread, because it may deadlock the JavaScript thread if the queue is full.

The actual call into JavaScript is controlled by the callback given through the `call_js_cb` parameter. For each value successfully queued by a `napi_call_threadsafe_function()` call, `call_js_cb` is invoked once on the main thread. If no such callback is given, a default callback is used and the resulting JavaScript call will have no arguments. The `call_js_cb` callback receives, in its arguments, the JavaScript function to be called as a `napi_value`, as well as the `void*` context pointer used when creating the `napi_threadsafe_function`, and the next data pointer created by one of the helper threads. The callback can then use APIs such as `napi_call_function()` to call into JavaScript.

This callback may also be invoked, with `env` and `call_js_cb` both set to `NULL`, to indicate that it is no longer possible to call JavaScript, while there may still be items in the queue that need to be freed. This typically occurs when the Node.js process exits while there are still active thread-safe functions.

There is no need to call JavaScript through `napi_make_callback()` because Node-API runs `call_js_cb` in a context appropriate for callbacks.

Zero or more queued items may be processed in each tick of the event loop. Applications should not rely on specific behavior beyond the fact that over time, callback invocation will make progress and events will be invoked.

### Reference Counting of Thread-Safe Functions

While a thread-safe function object exists, threads can be added to or removed from the `napi_threadsafe_function` object. Therefore, in addition to the initial thread count specified at creation time, `napi_acquire_threadsafe_function` can be called to indicate that a new thread will begin using the thread-safe function. Similarly, `napi_release_threadsafe_function` can be called to indicate that an existing thread will stop using the thread-safe function.

The `napi_threadsafe_function` object will be destroyed once every thread using that object has called `napi_release_threadsafe_function()` or has received a `napi_closing` return status in response to a `napi_call_threadsafe_function` call. Before the `napi_threadsafe_function` is destroyed, the queue will be emptied. `napi_release_threadsafe_function()` should be the last API call used in conjunction with a given `napi_threadsafe_function`, because after the call completes, there is no guarantee that the `napi_threadsafe_function` is still allocated. For the same reason, do not use the thread-safe function after receiving a `napi_closing` return value in response to a `napi_call_threadsafe_function` call. Data associated with the `napi_threadsafe_function` can be released in the `napi_finalize` callback passed to `napi_create_threadsafe_function()`. The `initial_thread_count` argument of `napi_create_threadsafe_function` marks the initial number of acquisitions of the thread-safe function, not multiple calls to `napi_acquire_threadsafe_function` at creation time.

Once the number of threads using a `napi_threadsafe_function` reaches zero, it can no longer be started by calling `napi_acquire_threadsafe_function()`. Effectively, all subsequent API calls associated with it, except `napi_release_threadsafe_function()`, will return the error value `napi_closing`.

A thread-safe function can be “aborted” by supplying the `napi_tsfn_abort` value to `napi_release_threadsafe_function()`. This will cause all subsequent APIs associated with that thread-safe function, except `napi_release_threadsafe_function()`, to return `napi_closing`, even if its reference count has not yet reached zero. In particular, `napi_call_threadsafe_function()` will return `napi_closing`, notifying threads that asynchronous calls into the thread-safe function are no longer possible. This can be used as a standard way to terminate threads. **After receiving `napi_closing` from `napi_call_threadsafe_function()`, threads must not use the thread-safe function again, because there is no longer a guarantee that it is allocated.**

### Deciding Whether to Keep the Process Running

Similar to libuv handles, thread-safe functions can be “referenced” and “unreferenced”. A “referenced” thread-safe function causes the event loop that created it to stay active until the thread-safe function is destroyed. Conversely, an “unreferenced” thread-safe function does not prevent the event loop from exiting. The APIs `napi_ref_threadsafe_function` and `napi_unref_threadsafe_function` exist for this purpose.

`napi_unref_threadsafe_function` does not mark the thread-safe function as destructible, and `napi_ref_threadsafe_function` does not prevent it from being destroyed.

### `napi_create_threadsafe_function`

<!-- YAML
added: v10.6.0
napiVersion: 4
changes:
  - version:
     - v12.6.0
     - v10.17.0
    pr-url: https://github.com/nodejs/node/pull/27791
    description: "When using a custom `call_js_cb`, the `func` parameter becomes optional."
-->

```c
NAPI_EXTERN napi_status
napi_create_threadsafe_function(napi_env env,
                                napi_value func,
                                napi_value async_resource,
                                napi_value async_resource_name,
                                size_t max_queue_size,
                                size_t initial_thread_count,
                                void* thread_finalize_data,
                                napi_finalize thread_finalize_cb,
                                void* context,
                                napi_threadsafe_function_call_js call_js_cb,
                                napi_threadsafe_function* result);
```

* `[in] env`：The environment in which the API is called.
* `[in] func`：An optional JavaScript function to be called from another thread. If `NULL` is passed to `call_js_cb`, this must be provided.
* `[in] async_resource`：An optional object associated with the asynchronous work, which will be passed to any possible `async_hooks` [`init` hooks][].
* `[in] async_resource_name`：A JavaScript string used as an identifier for the resource type provided in diagnostic information exposed by the `async_hooks` API.
* `[in] max_queue_size`：The maximum size of the queue. `0` means unbounded.
* `[in] initial_thread_count`：The initial acquisition count, that is, the initial number of threads, including the main thread, that will use this function.
* `[in] thread_finalize_data`：Optional data passed to `thread_finalize_cb`.
* `[in] thread_finalize_cb`：An optional function called when the `napi_threadsafe_function` is destroyed.
* `[in] context`：Optional data attached to the resulting `napi_threadsafe_function`.
* `[in] call_js_cb`：An optional callback that, in response to calls on different threads, invokes the JavaScript function on the main thread. If not provided, the JavaScript function will be called with no arguments, and its `this` value will be `undefined`. [`napi_threadsafe_function_call_js`][] provides more details.
* `[out] result`：The asynchronous thread-safe JavaScript function.

**Change History:**

* Version 10 (`NAPI_VERSION` defined as `10` or higher):

  Uncaught exceptions thrown in `call_js_cb` are handled via the [`'uncaughtException'`][] event rather than being ignored.

### `napi_get_threadsafe_function_context`

<!-- YAML
added: v10.6.0
napiVersion: 4
-->

```c
NAPI_EXTERN napi_status
napi_get_threadsafe_function_context(napi_threadsafe_function func,
                                     void** result);
```

* `[in] func`：The thread-safe function whose context is to be retrieved.
* `[out] result`：The location in which to store the context.

This API can be called from any thread using `func`.

### `napi_call_threadsafe_function`

<!-- YAML
added: v10.6.0
napiVersion: 4
changes:
  - version: v14.5.0
    pr-url: https://github.com/nodejs/node/pull/33453
    description: "Support for `napi_would_deadlock` has been rolled back."
  - version: v14.1.0
    pr-url: https://github.com/nodejs/node/pull/32689
    description: "Returns `napi_would_deadlock` when called with `napi_tsfn_blocking` from the main thread or a worker thread and the queue is full."
-->

```c
NAPI_EXTERN napi_status
napi_call_threadsafe_function(napi_threadsafe_function func,
                              void* data,
                              napi_threadsafe_function_call_mode is_blocking);
```

* `[in] func`：The asynchronous thread-safe JavaScript function to call.
* `[in] data`：Data to send to JavaScript through the callback `call_js_cb` provided during creation of the thread-safe JavaScript function.
* `[in] is_blocking`：A flag whose value can be `napi_tsfn_blocking`, indicating the call should block if the queue is full, or `napi_tsfn_nonblocking`, indicating the call should immediately return status `napi_queue_full` whenever the queue is full.

`napi_call_threadsafe_function()` should not be called with `napi_tsfn_blocking` from the JavaScript thread, because it may deadlock the JavaScript thread if the queue is full.

If `abort` is set to `napi_tsfn_abort` when calling `napi_release_threadsafe_function()` from any thread, this API will return `napi_closing`. Only if the API returns `napi_ok` will the value be added to the queue.

This API can be called from any thread using `func`.

### `napi_acquire_threadsafe_function`

<!-- YAML
added: v10.6.0
napiVersion: 4
-->

```c
NAPI_EXTERN napi_status
napi_acquire_threadsafe_function(napi_threadsafe_function func);
```

* `[in] func`：The asynchronous thread-safe JavaScript function to start using.

A thread should call this API before passing `func` to any other thread-safe function API to indicate that it will use `func`. This prevents `func` from being destroyed when all other threads stop using it.

This API can be called from any thread that will start using `func`.

### `napi_release_threadsafe_function`

<!-- YAML
added: v10.6.0
napiVersion: 4
-->

```c
NAPI_EXTERN napi_status
napi_release_threadsafe_function(napi_threadsafe_function func,
                                 napi_threadsafe_function_release_mode mode);
```

* `[in] func`：The asynchronous thread-safe JavaScript function whose reference count is to be decremented.
* `[in] mode`：A flag whose value can be `napi_tsfn_release`, indicating that the current thread will no longer call the thread-safe function, or `napi_tsfn_abort`, indicating that no threads other than the current thread should call the thread-safe function anymore. If set to `napi_tsfn_abort`, further calls to `napi_call_threadsafe_function()` will return `napi_closing`, and values will no longer be queued.

This API should be called when a thread stops using `func`. Passing `func` to any thread-safe API after calling this API results in undefined behavior, because `func` may already have been destroyed.

This API can be called from any thread that will stop using `func`.

### `napi_ref_threadsafe_function`

<!-- YAML
added: v10.6.0
napiVersion: 4
-->

```c
NAPI_EXTERN napi_status
napi_ref_threadsafe_function(node_api_basic_env env, napi_threadsafe_function func);
```

* `[in] env`：The environment in which the API is called.
* `[in] func`：The thread-safe function to reference.

This API is used to indicate that the event loop running on the main thread should not exit until `func` is destroyed. Similar to [`uv_ref`][], it is idempotent.

`napi_unref_threadsafe_function` does not mark the thread-safe function as destructible, and `napi_ref_threadsafe_function` does not prevent it from being destroyed. `napi_acquire_threadsafe_function` and `napi_release_threadsafe_function` can be used for that purpose.

This API can only be called from the main thread.

### `napi_unref_threadsafe_function`

<!-- YAML
added: v10.6.0
napiVersion: 4
-->

```c
NAPI_EXTERN napi_status
napi_unref_threadsafe_function(node_api_basic_env env, napi_threadsafe_function func);
```

* `[in] env`：The environment in which the API is called.
* `[in] func`：The thread-safe function to unreference.

This API is used to indicate that the event loop running on the main thread may exit before `func` is destroyed. Similar to [`uv_unref`][], it is idempotent.

This API can only be called from the main thread.

## Miscellaneous Utilities

### `node_api_get_module_file_name`

<!-- YAML
added:
  - v15.9.0
  - v14.18.0
  - v12.22.0
napiVersion: 9
-->

```c
NAPI_EXTERN napi_status
node_api_get_module_file_name(node_api_basic_env env, const char** result);

```

* `[in] env`：The environment in which the API is called.
* `[out] result`：A URL containing the absolute path to the location where the addon was loaded from. For files on the local filesystem, it will begin with `file://`. The string is null-terminated and owned by `env`, and therefore must not be modified or freed.

If the addon loading process cannot determine the filename of the addon during loading, `result` may be an empty string.

[ABI 稳定性]: https://nodejs.org/en/docs/guides/abi-stability/
[AppVeyor]: https://www.appveyor.com
[C++ 插件]: addons.md
[CMake]: https://cmake.org
[CMake.js]: https://github.com/cmake-js/cmake-js
[ECMAScript 语言规范]: https://tc39.es/ecma262/
[错误处理]: #error-handling
[GCC]: https://gcc.gnu.org
[GYP]: https://gyp.gsrc.io
[GitHub 发布]: https://help.github.com/en/github/administering-a-repository/about-releases
[LLVM]: https://llvm.org
[Node.js 原生抽象]: https://github.com/nodejs/nan
[Node-API 媒体]: https://github.com/nodejs/abi-stable-node/blob/HEAD/node-api-media.md
[对象生命周期管理]: #object-lifetime-management
[对象包装]: #object-wrap
[Agents 部分]: https://tc39.es/ecma262/#sec-agents
[Array 实例 length 部分]: https://tc39.es/ecma262/#sec-properties-of-array-instances-length
[Array 对象部分]: https://tc39.es/ecma262/#sec-array-objects
[ArrayBuffer 对象部分]: https://tc39.es/ecma262/#sec-arraybuffer-objects
[DataView 对象部分]: https://tc39.es/ecma262/#sec-dataview-objects
[Date 对象部分]: https://tc39.es/ecma262/#sec-date-objects
[DefineOwnProperty 部分]: https://tc39.es/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots-defineownproperty-p-desc
[Function 对象部分]: https://tc39.es/ecma262/#sec-function-objects
[IsArray 部分]: https://tc39.es/ecma262/#sec-isarray
[IsStrctEqual 部分]: https://tc39.es/ecma262/#sec-strict-equality-comparison
[Promise 对象部分]: https://tc39.es/ecma262/#sec-promise-objects
[SharedArrayBuffer 对象部分]: https://tc39.es/ecma262/#sec-sharedarraybuffer-objects
[ToBoolean 部分]: https://tc39.es/ecma262/#sec-toboolean
[ToNumber 部分]: https://tc39.es/ecma262/#sec-tonumber
[ToObject 部分]: https://tc39.es/ecma262/#sec-toobject
[ToString 部分]: https://tc39.es/ecma262/#sec-tostring
[TypedArray 对象部分]: https://tc39.es/ecma262/#sec-typedarray-objects
[detachArrayBuffer 部分]: https://tc39.es/ecma262/#sec-detacharraybuffer
[instanceof 运算符部分]: https://tc39.es/ecma262/#sec-instanceofoperator
[isDetachedBuffer 部分]: https://tc39.es/ecma262/#sec-isdetachedbuffer
[语言类型部分]: https://tc39.es/ecma262/#sec-ecmascript-data-types-and-values
[number 类型部分]: https://tc39.es/ecma262/#sec-ecmascript-language-types-number-type
[object 类型部分]: https://tc39.es/ecma262/#sec-object-type
[属性特性部分]: https://tc39.es/ecma262/#sec-property-attributes
[string 类型部分]: https://tc39.es/ecma262/#sec-ecmascript-language-types-string-type
[symbol 类型部分]: https://tc39.es/ecma262/#sec-ecmascript-language-types-symbol-type
[typeof 运算符部分]: https://tc39.es/ecma262/#sec-typeof-operator
[Travis CI]: https://travis-ci.org
[Visual Studio]: https://visualstudio.microsoft.com
[使用 JavaScript 属性]: #working-with-javascript-properties
[Xcode]: https://developer.apple.com/xcode/
[`'uncaughtException'`]: process.md#event-uncaughtexception
[`Number.MAX_SAFE_INTEGER`]: https://tc39.es/ecma262/#sec-number.max_safe_integer
[`Number.MIN_SAFE_INTEGER`]: https://tc39.es/ecma262/#sec-number.min_safe_integer
[`Worker`]: worker_threads.md#class-worker
[`async_hooks.executionAsyncResource()`]: async_hooks.md#async_hooksexecutionasyncresource
[`build_with_cmake`]: https://github.com/nodejs/node-addon-examples/tree/main/src/8-tooling/build_with_cmake
[`global`]: globals.md#global
[`init` 钩子]: async_hooks.md#initasyncid-type-triggerasyncid-resource
[`napi_add_async_cleanup_hook`]: #napi_add_async_cleanup_hook
[`napi_add_env_cleanup_hook`]: #napi_add_env_cleanup_hook
[`napi_add_finalizer`]: #napi_add_finalizer
[`napi_async_cleanup_hook`]: #napi_async_cleanup_hook
[`napi_async_complete_callback`]: #napi_async_complete_callback
[`napi_async_destroy`]: #napi_async_destroy
[`napi_async_init`]: #napi_async_init
[`napi_callback`]: #napi_callback
[`napi_cancel_async_work`]: #napi_cancel_async_work
[`napi_close_callback_scope`]: #napi_close_callback_scope
[`napi_close_escapable_handle_scope`]: #napi_close_escapable_handle_scope
[`napi_close_handle_scope`]: #napi_close_handle_scope
[`napi_create_async_work`]: #napi_create_async_work
[`napi_create_error`]: #napi_create_error
[`napi_create_external_arraybuffer`]: #napi_create_external_arraybuffer
[`napi_create_range_error`]: #napi_create_range_error
[`napi_create_reference`]: #napi_create_reference
[`napi_create_type_error`]: #napi_create_type_error
[`napi_define_class`]: #napi_define_class
[`napi_delete_async_work`]: #napi_delete_async_work
[`napi_delete_reference`]: #napi_delete_reference
[`napi_escape_handle`]: #napi_escape_handle
[`napi_finalize`]: #napi_finalize
[`napi_get_and_clear_last_exception`]: #napi_get_and_clear_last_exception
[`napi_get_array_length`]: #napi_get_array_length
[`napi_get_element`]: #napi_get_element
[`napi_get_last_error_info`]: #napi_get_last_error_info
[`napi_get_property`]: #napi_get_property
[`napi_get_reference_value`]: #napi_get_reference_value
[`napi_get_typedarray_info`]: #napi_get_typedarray_info
[`napi_get_value_external`]: #napi_get_value_external
[`napi_has_property`]: #napi_has_property
[`napi_instanceof`]: #napi_instanceof
[`napi_is_error`]: #napi_is_error
[`napi_is_exception_pending`]: #napi_is_exception_pending
[`napi_is_typedarray`]: #napi_is_typedarray
[`napi_make_callback`]: #napi_make_callback
[`napi_open_callback_scope`]: #napi_open_callback_scope
[`napi_open_escapable_handle_scope`]: #napi_open_escapable_handle_scope
[`napi_open_handle_scope`]: #napi_open_handle_scope
[`napi_property_attributes`]: #napi_property_attributes
[`napi_property_descriptor`]: #napi_property_descriptor
[`napi_queue_async_work`]: #napi_queue_async_work
[`napi_reference_ref`]: #napi_reference_ref
[`napi_reference_unref`]: #napi_reference_unref
[`napi_remove_async_cleanup_hook`]: #napi_remove_async_cleanup_hook
[`napi_remove_env_cleanup_hook`]: #napi_remove_env_cleanup_hook
[`napi_set_instance_data`]: #napi_set_instance_data
[`napi_set_property`]: #napi_set_property
[`napi_threadsafe_function_call_js`]: #napi_threadsafe_function_call_js
[`napi_throw_error`]: #napi_throw_error
[`napi_throw_range_error`]: #napi_throw_range_error
[`napi_throw_type_error`]: #napi_throw_type_error
[`napi_throw`]: #napi_throw
[`napi_unwrap`]: #napi_unwrap
[`napi_wrap`]: #napi_wrap
[`node-addon-api`]: https://github.com/nodejs/node-addon-api
[`node_api.h`]: https://github.com/nodejs/node/blob/HEAD/src/node_api.h
[`node_api_basic_finalize`]: #node_api_basic_finalize
[`node_api_create_external_string_latin1`]: #node_api_create_external_string_latin1
[`node_api_create_external_string_utf16`]: #node_api_create_external_string_utf16
[`node_api_create_syntax_error`]: #node_api_create_syntax_error
[`node_api_post_finalizer`]: #node_api_post_finalizer
[`node_api_throw_syntax_error`]: #node_api_throw_syntax_error
[`process.release`]: process.md#processrelease
[`uv_ref`]: https://docs.libuv.org/en/v1.x/handle.html#c.uv_ref
[`uv_unref`]: https://docs.libuv.org/en/v1.x/handle.html#c.uv_unref
[`worker.terminate()`]: worker_threads.md#workerterminate
[async_hooks `type`]: async_hooks.md#type
[上下文感知插件]: addons.md#context-aware-addons
[文档]: https://github.com/nodejs/node-addon-api#api-documentation
[外部]: #napi_create_external
[外部]: #napi_create_external
[全局作用域]: globals.md
[gyp-next]: https://github.com/nodejs/gyp-next
[语言和引擎绑定]: https://github.com/nodejs/abi-stable-node/blob/doc/node-api-engine-bindings.md
[模块作用域]: modules.md#the-module-scope
[node-gyp]: https://github.com/nodejs/node-gyp
[node-pre-gyp]: https://github.com/mapbox/node-pre-gyp
[prebuild]: https://github.com/prebuild/prebuild
[prebuildify]: https://github.com/prebuild/prebuildify
[工作线程]: https://nodejs.org/api/worker_threads.html
