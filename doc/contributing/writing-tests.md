# 如何为 Node.js 项目编写测试

## 什么是测试？

Node.js 核心中的大多数测试都是 JavaScript 程序，它们会执行 Node.js 提供的某项功能，并检查其行为是否符合预期。测试在成功时应以代码 `0` 退出。测试在以下情况下会失败：

* 它通过将 `process.exitCode` 设置为非零值而退出。
  * 这通常是通过让某个断言抛出未捕获的 Error 来完成的。
  * 偶尔，使用 `process.exit(code)` 也可能是合适的。
* 它从不退出。在这种情况下，测试运行器会因为达到最大时间限制而终止测试。

在以下情况添加测试：

* 添加新功能。
* 修复回归和 bug。
* 扩展测试覆盖率。

## 测试目录结构

有关现有测试及其位置的概览，请参见 [目录结构概览][]。

## 如何编写一个好的测试

好的测试应以一种在失败时便于调试的风格编写。

原则上，新增测试时应放在一个新文件中。除非有充分的理由，否则不要将新的测试用例追加到已有文件中。类似于我们在 issue 跟踪器中要求的复现用例，好的测试应尽可能保持最小化和隔离，以便于调试。

好的测试还应附带注释，说明它试图测试什么；这样当它失败时，其他贡献者可以结合完整意图上下文进行修复，并且在上下文发生变化时也能更有把握地修改它。

## 测试结构

让我们分析一下 Node.js 测试套件中的这个基础测试：

```js
const common = require('../common');                                   // 2
const fixtures = require('../common/fixtures');                        // 3

// 这个测试确保 http-parser 可以处理 UTF-8 字符          // 5
// 在 http 头部中。                                                 // 6

const assert = require('node:assert');                                 // 8
const http = require('node:http');                                     // 9

const server = http.createServer(common.mustCall((req, res) => {       // 11
  res.end('ok');                                                       // 12
}));                                                                   // 13
server.listen(0, () => {                                               // 14
  http.get({                                                           // 15
    port: server.address().port,                                       // 16
    headers: { 'Test': 'Düsseldorf' },                                 // 17
  }, common.mustCall((res) => {                                        // 18
    assert.strictEqual(res.statusCode, 200);                           // 19
    server.close();                                                    // 20
  }));                                                                 // 21
});                                                                    // 22
// ...                                                                 // 23
```

### **第 1-3 行**

```js
const common = require('../common');
const fixtures = require('../common/fixtures');
```

第一行启用严格模式。所有测试都应使用严格模式，除非测试的性质要求不使用严格模式运行。

第二行加载 `common` 模块。[`common` 模块][] 是一个辅助模块，为测试提供有用的工具。一些通用功能已被提取到子模块中，这些子模块会像这里的 fixtures 模块一样单独引入。

即使一个测试没有使用 `common` 导出的任何函数或其他属性，测试也应在任何其他模块之前包含 `common` 模块。这是因为 `common` 模块包含一些代码：如果测试将变量泄漏到全局空间中，它会导致测试失败。在测试未使用 `common` 导出的任何函数或其他属性的情况下，应直接引入它而不赋值给标识符：

```js
require('../common');
```

### **第 5-6 行**

```js
// 这个测试确保 http-parser 可以处理 UTF-8 字符
// 在 http 头部中。
```

测试应以注释开头，包含它所设计用来测试内容的简要描述。

### **第 8-9 行**

```js
const assert = require('node:assert');
const http = require('node:http');
```

该测试检查 `node:http` 模块中的功能。

大多数测试使用 `node:assert` 模块来确认测试期望。

require 语句按 [ASCII][] 顺序排序（数字、大写字母、`_`、小写字母）。

### **第 11-22 行**

```js
const server = http.createServer(common.mustCall((req, res) => {
  res.end('ok');
}));
server.listen(0, () => {
  http.get({
    port: server.address().port,
    headers: { 'Test': 'Düsseldorf' },
  }, common.mustCall((res) => {
    assert.strictEqual(res.statusCode, 200);
    server.close();
  }));
});
```

这是测试的主体。这个测试很简单，它只是测试一个 HTTP 服务器是否接受传入请求头中的 `non-ASCII` 字符。值得注意的几点：

* 如果测试不依赖于特定端口号，那么总是使用 0 而不是任意值，因为这允许测试安全地并行运行，操作系统会分配一个随机端口。如果测试需要特定端口，例如测试检查分配特定端口是否按预期工作，那么可以指定特定端口号。
* 使用 `common.mustCall` 来检查某些回调/监听器是否被调用。
* HTTP 服务器会在所有检查完成后关闭。这样，测试就可以正常退出。请记住，要使测试成功，它必须以状态码 0 退出。

## 一般建议

### 定时器

除非测试明确就是在测试定时器，否则应避免使用定时器。原因有很多，主要是它们容易导致不稳定。关于更全面的解释，请看 [这里](https://github.com/nodejs/testing/issues/27)。

如果测试确实需要定时器，可以考虑使用 `common.platformTimeout()` 方法。它允许根据平台设置特定的超时时间：

```js
const timer = setTimeout(fail, common.platformTimeout(4000));
```

这会在大多数平台上创建一个 4 秒超时，但在较慢的平台上会更长。

### _common_ API

尽可能多地使用 `common` 模块中的辅助工具。有关这些辅助工具的完整细节，请参阅 [common 文件文档](https://github.com/nodejs/node/tree/HEAD/test/common)。

#### common.mustCall

一个有趣的情况是 `common.mustCall`。使用 `common.mustCall` 可以避免使用额外变量以及相应的断言。让我们用测试套件中的一个真实测试来解释这一点。

```js
require('../common');
const assert = require('node:assert');
const http = require('node:http');

let request = 0;
let listening = 0;
let response = 0;
process.on('exit', () => {
  assert.equal(request, 1, 'http server "request" callback was not called');
  assert.equal(listening, 1, 'http server "listening" callback was not called');
  assert.equal(response, 1, 'http request "response" callback was not called');
});

const server = http.createServer((req, res) => {
  request++;
  res.end();
}).listen(0, () => {
  listening++;
  const options = {
    agent: null,
    port: server.address().port,
  };
  http.get(options, (res) => {
    response++;
    res.resume();
    server.close();
  });
});
```

这个测试可以通过使用 `common.mustCall` 大大简化，如下所示：

```js
const common = require('../common');
const http = require('node:http');

const server = http.createServer(common.mustCall((req, res) => {
  res.end();
})).listen(0, common.mustCall(() => {
  const options = {
    agent: null,
    port: server.address().port,
  };
  http.get(options, common.mustCall((res) => {
    res.resume();
    server.close();
  }));
}));
```

**注意：** 许多函数会在回调的第一个参数中传入 `err` 值。对于这些函数，不应直接传入 `common.mustCall()`，因为 `common.mustCall()` 会忽略错误。应改用 `common.mustSucceed()`。

#### 倒计时模块

common [倒计时模块](https://github.com/nodejs/node/tree/HEAD/test/common#countdown-module) 为需要在完成指定数量的任务后执行某个特定操作的测试提供了一种简单的倒计数机制（例如，在特定数量的请求后关闭 HTTP 服务器）。

```js
const Countdown = require('../common/countdown');

const countdown = new Countdown(2, () => {
  console.log('.');
});

countdown.dec();
countdown.dec(); // 倒计数回调现在将被调用。
```

#### 测试 Promise

编写涉及 Promise 的测试时，通常最好将 `onFulfilled` 处理器包裹起来，否则如果 promise 从未 resolve，测试可能会成功结束（处于 pending 状态的 promise 不会保持事件循环存活）。在 `unhandledRejection` 事件的情况下，Node.js 会自动崩溃——因此测试会失败。

```js
const common = require('../common');
const assert = require('node:assert');
const fs = require('node:fs').promises;

// 将 `onFulfilled` 处理器包裹在 `common.mustCall()` 中。
fs.readFile('test-file').then(
  common.mustCall(
    (content) => assert.strictEqual(content.toString(), 'test2'),
  ));
```

### 标志

某些测试需要在启动 Node.js 时设置特定的命令行标志。为此，请在测试前言部分添加一个 `// Flags:` 注释，后面跟上这些标志。例如，如果测试需要允许引入某些 `internal/*` 模块，可以添加 `--expose-internals` 标志。一个需要 `internal/freelist` 的测试可以这样开始：

```js
// Flags: --expose-internals

require('../common');
const assert = require('node:assert');
const freelist = require('node:internal/freelist');
```

在特定场景下，获取 `primordials` 或 `internalBinding()` 可能会很有用。你可以通过以下方式做到这一点：

```bash
node --expose-internals -r internal/test/binding lib/fs.js
```

只有在你通过命令行标志预加载 `node:internal/test/binding` 时，这才可用。

### 断言

编写断言时，优先使用严格版本：

* `assert.strictEqual()` 优于 `assert.equal()`
* `assert.deepStrictEqual()` 优于 `assert.deepEqual()`

使用 `assert.throws()` 时，如果可能，请提供完整的错误消息：

```js
assert.throws(
  () => {
    throw new Error('错误的值');
  },
  /^Error: Wrong value$/, // 而不是像 /Wrong value/ 这样的写法
);
```

对于内部错误，优先只检查 `code` 属性：

```js
assert.throws(
  () => {
    throw new ERR_FS_FILE_TOO_LARGE(`${sizeKiB} Kb`);
  },
  { code: 'ERR_FS_FILE_TOO_LARGE' },
  // 不要包含 message: /^File size ([0-9]+ Kb) is greater than 2 GiB$/
);
```

### 控制台输出

测试写入 stdout 或 stderr 的输出，例如使用 `console.log()` 或 `console.error()`，在编写测试以及后续维护时调试测试都可能很有用。除非测试失败，否则测试运行器（`./tools/test.py`）会抑制这些输出，但使用 `node` 直接运行测试时总会显示这些输出。对于失败的测试，测试运行器会在测试报告中将输出与失败的测试断言一并包含。

某些输出可以通过提供上下文来帮助调试测试失败。例如，在排查 CI 中超时的测试时。如果没有日志语句，我们就不知道测试卡在哪一步。

曾有测试在没有 `console.log()` 时会失败，而添加后又通过，因此使用时应谨慎，尤其是在 I/O 和流式 API 的测试中。

过度使用控制台输出并不被鼓励，因为它会淹没显示内容，包括 Jenkins 控制台和测试报告显示。对于循环或其他在失败情况下可能多次重复输出的上下文，应尤其谨慎。

在某些测试中，可能不清楚 `console.log()` 语句是否是测试本身的一部分（消息测试、检查子进程输出的测试等），还是仅作为调试辅助。如果存在任何混淆的可能，请使用注释来明确其目的。

### ES.Next 特性

出于性能考虑，我们在 `lib` 目录中的 JavaScript 代码里只使用 ES.Next 特性的一个选定子集。然而，在编写测试时，为了便于回移植，建议使用那些可以在 [所有受维护分支][] 中直接使用而无需标志的 ES.Next 特性。[node.green][] 列出了各个版本中可用的特性，例如：

* 使用 `let` 和 `const` 代替 `var`
* 使用模板字面量代替字符串拼接
* 在适当时使用箭头函数

## 测试文件命名

测试文件使用 kebab 命名法。名称的第一个部分是
`test`。第二个部分是被测试的模块或子系统。第三个部分通常是
被测试的方法或事件名称。名称的后续部分会添加更多
关于正在测试内容的信息。

例如，针对 `process` 对象上的 `beforeExit` 事件的测试可能会命名为
`test-process-before-exit.js`。如果测试专门检查箭头
函数是否能与 `beforeExit` 事件正常配合，那么它可能会命名为
`test-process-before-exit-arrow-functions.js`。

## 导入的测试

### Web 平台测试

有关更多信息，请参见 [`test/wpt`](../../test/wpt/README.md)。

## C++ 单元测试

可以使用 [Google Test][] 测试 C++ 代码。Node.js 中的大多数功能都可以
使用本文档前面描述的方法进行测试。但在某些情况下，这些方法可能
还不够，例如为 Node.js 编写只会在 Node.js 被嵌入时才会调用的代码。

### 添加新测试

单元测试应放置在 `test/cctest` 中，并以 `test` 为前缀命名，后跟
被测试单元的名称。例如，下面的代码
应放置在 `test/cctest/test_env.cc` 中：

```cpp
#include "gtest/gtest.h"
#include "node_test_fixture.h"
#include "env.h"
#include "node.h"
#include "v8.h"

static bool called_cb = false;
static void at_exit_callback(void* arg);

class EnvTest : public NodeTestFixture { };

TEST_F(EnvTest, RunAtExit) {
  v8::HandleScope handle_scope(isolate_);
  v8::Local<v8::Context> context = v8::Context::New(isolate_);
  node::IsolateData* isolateData = node::CreateIsolateData(isolate_, uv_default_loop());
  Argv argv{"node", "-e", ";"};
  auto env = node::CreateEnvironment(isolateData, context, 1, *argv, 2, *argv);
  node::AtExit(env, at_exit_callback);
  node::RunAtExit(env);
  EXPECT_TRUE(called_cb);
}

static void at_exit_callback(void* arg) {
  called_cb = true;
}
```

接下来，将测试添加到 node.gyp 中 `cctest` 目标的 `sources` 里：

```console
'sources': [
  'test/cctest/test_env.cc',
  ...
],
```

在 cctest 目标中应包含的唯一源文件是
实际的测试或辅助源文件。可能需要包含由 `node` 目标编译的特定
目标文件，这可以通过将它们添加到 cctest 目标中的 `libraries` 部分来实现。

可以通过运行 `cctest` 目标来执行该测试：

```bash
make cctest
```

可以应用过滤器来运行单个/多个测试用例：

```bash
make cctest GTEST_FILTER=EnvironmentTest.AtExitWithArgument
```

`cctest` 也可以直接运行，这在调试时会很有用：

```bash
out/Release/cctest --gtest_filter=EnvironmentTest.AtExit\*
```

### Node.js 测试夹具

有一个名为 `node_test_fixture.h` 的 [测试夹具][]，单元测试可以
包含它。该夹具负责设置 Node.js 环境，
并在测试完成后将其拆除。

它还包含一个辅助工具，用于创建要传递给 Node.js 的参数。是否需要它
取决于被测试的内容。

### 测试覆盖率

要生成测试覆盖率报告，请参见
[构建指南中的测试覆盖率部分][]。

Node.js `main` 分支的夜间覆盖率报告可在
<https://coverage.nodejs.org/> 获取。

## 运行测试

有关如何运行测试的详细信息，请参见[构建指南](../../BUILDING.md#running-tests)。

[ASCII]: https://man7.org/linux/man-pages/man7/ascii.7.html
[Google Test]: https://github.com/google/googletest
[构建指南中的测试覆盖率部分]: https://github.com/nodejs/node/blob/HEAD/BUILDING.md#running-coverage
[`common` 模块]: https://github.com/nodejs/node/blob/HEAD/test/common/README.md
[所有受维护分支]: https://github.com/nodejs/lts
[目录结构概览]: https://github.com/nodejs/node/blob/HEAD/test/README.md#test-directories
[node.green]: https://node.green/
[测试夹具]: https://github.com/google/googletest/blob/HEAD/docs/primer.md#test-fixtures-using-the-same-data-configuration-for-multiple-tests-same-data-multiple-tests
