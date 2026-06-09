# 测试运行器

<!--introduced_in=v18.0.0-->

<!-- YAML
added:
  - v18.0.0
  - v16.17.0
changes:
  - version: v20.0.0
    pr-url: https://github.com/nodejs/node/pull/46983
    description: 测试运行器现在是稳定的。
-->

> 稳定性：2 - 稳定

<!-- source_link=lib/test.js -->

`node:test` 模块有助于创建 JavaScript 测试。
要访问它：

```mjs
import test from 'node:test';
```

```cjs
const test = require('node:test');
```

此模块仅在 `node:` 方案下可用。

通过 `test` 模块创建的测试由单个函数组成，该函数通过以下三种方式之一进行处理：

1. 一个同步函数，如果抛出异常则视为失败，否则视为通过。
2. 一个返回 `Promise` 的函数，如果 `Promise` 被拒绝则视为失败，如果 `Promise` 被履行则视为通过。
3. 一个接收回调函数的函数。如果回调接收任何真值作为其第一个参数，则测试视为失败。如果将假值作为第一个参数传递给回调，则测试视为通过。如果测试函数接收回调函数并且还返回 `Promise`，则测试将失败。

以下示例说明了如何使用 `test` 模块编写测试。

```js
test('同步通过测试', (t) => {
  // 此测试通过，因为它没有抛出异常。
  assert.strictEqual(1, 1);
});

test('同步失败测试', (t) => {
  // 此测试失败，因为它抛出了异常。
  assert.strictEqual(1, 2);
});

test('异步通过测试', async (t) => {
  // 此测试通过，因为 async 函数返回的 Promise 已结算且未被拒绝。
  assert.strictEqual(1, 1);
});

test('异步失败测试', async (t) => {
  // 此测试失败，因为 async 函数返回的 Promise 被拒绝。
  assert.strictEqual(1, 2);
});

test('使用 Promise 的失败测试', (t) => {
  // Promise 也可以直接使用。
  return new Promise((resolve, reject) => {
    setImmediate(() => {
      reject(new Error('这将导致测试失败'));
    });
  });
});

test('回调通过测试', (t, done) => {
  // done() 是回调函数。当 setImmediate() 运行时，它调用
  // done() 不带参数。
  setImmediate(done);
});

test('回调失败测试', (t, done) => {
  // 当 setImmediate() 运行时，done() 被传入一个 Error 对象且
  // 测试失败。
  setImmediate(() => {
    done(new Error('回调失败'));
  });
});
```

如果任何测试失败，进程退出代码将设置为 `1`。

## 子测试

测试上下文的 `test()` 方法允许创建子测试。
它允许你以层次结构方式组织测试，
你可以在较大的测试内创建嵌套测试。
此方法的行为与顶级 `test()` 函数完全相同。
以下示例演示了创建一个
带有两个子测试的顶级测试。

```js
test('顶级测试', async (t) => {
  await t.test('子测试 1', (t) => {
    assert.strictEqual(1, 1);
  });

  await t.test('子测试 2', (t) => {
    assert.strictEqual(2, 2);
  });
});
```

> **注意：** `beforeEach` 和 `afterEach` 钩子在
> 每个子测试执行之间触发。

在此示例中，使用 `await` 来确保两个子测试都已完成。
这是必要的，因为测试不会等待其子测试
完成，这与在套件内创建的测试不同。
当父测试完成时任何仍未完成的子测试
将被取消并视为失败。任何子测试失败都会导致父
测试失败。

## 重新运行失败的测试

测试运行器支持将运行状态持久化到文件，允许
测试运行器重新运行失败的测试，而不必重新运行整个测试套件。
使用 [`--test-rerun-failures`][] 命令行选项指定一个文件路径，用于
存储运行状态。如果状态文件不存在，测试运行器将
创建它。
状态文件是一个包含运行尝试数组的 JSON 文件。
每次运行尝试是一个对象，将成功的测试映射到它们通过的尝试。
此映射中识别测试的键是测试文件路径，以及定义测试的行和列。
如果在特定位置定义的测试被运行多次，
例如在函数或循环内，
计数器将附加到键上，以消除测试运行的歧义。
注意，更改测试执行顺序或测试位置可能导致测试运行器
将测试视为在之前的尝试中已通过，
意味着 `--test-rerun-failures` 应在测试以确定顺序运行时使用。

状态文件示例：

```json
[
  {
    "test.js:10:5": { "passed_on_attempt": 0, "name": "test 1" }
  },
  {
    "test.js:10:5": { "passed_on_attempt": 0, "name": "test 1" },
    "test.js:20:5": { "passed_on_attempt": 1, "name": "test 2" }
  }
]
```

在此示例中，有两次运行尝试，`test.js` 中定义了两个测试，
第一个测试在第一次尝试时成功，第二个测试在第二次尝试时成功。

当使用 `--test-rerun-failures` 选项时，测试运行器将只运行尚未通过的测试。

```bash
node --test-rerun-failures /path/to/state/file
```

## `describe()` 和 `it()` 别名

套件和测试也可以使用 `describe()` 和 `it()`
函数编写。[`describe()`][] 是 [`suite()`][] 的别名，[`it()`][] 是
[`test()`][] 的别名。

```js
describe('某事物', () => {
  it('应该工作', () => {
    assert.strictEqual(1, 1);
  });

  it('应该没问题', () => {
    assert.strictEqual(2, 2);
  });

  describe('嵌套事物', () => {
    it('应该工作', () => {
      assert.strictEqual(3, 3);
    });
  });
});
```

`describe()` 和 `it()` 从 `node:test` 模块导入。

```mjs
import { describe, it } from 'node:test';
```

```cjs
const { describe, it } = require('node:test');
```

## 跳过测试

可以通过向测试传递 `skip` 选项，或通过
调用测试上下文的 `skip()` 方法来跳过单个测试，如下
所示示例。

```js
// 使用了 skip 选项，但未提供消息。
test('skip option', { skip: true }, (t) => {
  // 此代码永远不会执行。
});

// 使用了 skip 选项，并提供了消息。
test('skip option with message', { skip: 'this is skipped' }, (t) => {
  // 此代码永远不会执行。
});

test('skip() method', (t) => {
  // 如果测试包含额外逻辑，也请确保在此处返回。
  t.skip();
});

test('skip() method with message', (t) => {
  // 如果测试包含额外逻辑，也请确保在此处返回。
  t.skip('this is skipped');
});
```

## TODO 测试

可以通过向测试传递 `todo`
选项，或通过调用测试上下文的 `todo()` 方法，将单个测试标记为不稳定或未完成，如下
所示示例。这些测试代表待实现的实现或需要修复的
错误。TODO 测试会被执行，但不被视为测试
失败，因此不会影响进程退出代码。如果测试被标记
为 TODO 和跳过，则 TODO 选项将被忽略。

```js
// 使用了 todo 选项，但未提供消息。
test('todo option', { todo: true }, (t) => {
  // 此代码会被执行，但不被视为失败。
  throw new Error('this does not fail the test');
});

// 使用了 todo 选项，并提供了消息。
test('todo option with message', { todo: 'this is a todo test' }, (t) => {
  // 此代码会被执行。
});

test('todo() method', (t) => {
  t.todo();
});

test('todo() method with message', (t) => {
  t.todo('this is a todo test and is not treated as a failure');
  throw new Error('this does not fail the test');
});
```

## 预期测试失败

<!-- YAML
added:
 - v25.5.0
 - v24.14.0
-->

这会翻转特定测试或套件的通过/失败报告：标记的测试
用例必须抛出异常才能通过，而标记的未抛出异常的测试用例
则失败。

在以下每种情况中，`doTheThing()` 未能返回 `true`，但由于
测试被标记为 `expectFailure`，它们会通过。

```js
it.expectFailure('应该做这件事', () => {
  assert.strictEqual(doTheThing(), true);
});

it('应该做这件事', { expectFailure: true }, () => {
  assert.strictEqual(doTheThing(), true);
});

it('应该做这件事', { expectFailure: '功能尚未实现' }, () => {
  assert.strictEqual(doTheThing(), true);
});
```

如果 `expectFailure` 的值是 {RegExp|Function|Object|Error}
则仅当测试抛出匹配的值时才会通过。
请参阅 [`assert.throws`][] 了解如何处理每种值类型。

以下每个测试都失败了，_尽管_ 被标记为 `expectFailure`
因为失败不匹配特定的 **预期** 失败。

```js
it('由于正则表达式不匹配而失败', {
  expectFailure: /expected message/,
}, () => {
  throw new Error('different message');
});

it('由于对象匹配器不匹配而失败', {
  expectFailure: { code: 'ERR_EXPECTED' },
}, () => {
  const err = new Error('boom');
  err.code = 'ERR_ACTUAL';
  throw err;
});
```

要为 `expectFailure` 提供原因和特定错误，请使用 `{ label, match }`。

```js
it('应以特定错误和原因失败', {
  expectFailure: {
    label: '失败原因',
    match: /error message/,
  },
}, () => {
  assert.strictEqual(doTheThing(), true);
});
```

`skip` 和/或 `todo` 与 `expectFailure` 互斥，`skip` 或 `todo`
在同时应用时将“获胜”（`skip` 胜过两者，`todo` 胜过
`expectFailure`）。

这些测试将被跳过（且不运行）：

```js
it.expectFailure('应该做这件事', { skip: true }, () => {
  assert.strictEqual(doTheThing(), true);
});

it.skip('应该做这件事', { expectFailure: true }, () => {
  assert.strictEqual(doTheThing(), true);
});
```

这些测试将被标记为 "todo"（静默错误）：

```js
it.expectFailure('应该做这件事', { todo: true }, () => {
  assert.strictEqual(doTheThing(), true);
});

it.todo('应该做这件事', { expectFailure: true }, () => {
  assert.strictEqual(doTheThing(), true);
});
```

## `only` 测试

如果 Node.js 使用 [`--test-only`][] 命令行选项启动，或者测试隔离被禁用，则可以通过向应该运行的测试传递 `only` 选项来跳过除选定子集之外的所有测试。当设置了带有 `only` 选项的测试时，所有子测试也会运行。
如果套件设置了 `only` 选项，则运行套件内的所有测试，除非它有设置了 `only` 选项的后代，在这种情况下，只运行那些测试。

当在 `test()`/`it()` 中使用 [子测试][] 时，需要标记所有祖先测试带有 `only` 选项，以便仅运行选定的测试子集。

测试上下文的 `runOnly()` 方法可用于在子测试级别实现相同的行为。未执行的测试将从测试运行器输出中省略。

```js
// 假设 Node.js 是使用 --test-only 命令行选项运行的。
// 套件的 'only' 选项已设置，因此运行这些测试。
test('此测试会运行', { only: true }, async (t) => {
  // 在此测试内，默认运行所有子测试。
  await t.test('运行子测试');

  // 可以更新测试上下文以运行带有 'only' 选项的子测试。
  t.runOnly(true);
  await t.test('此子测试现在被跳过');
  await t.test('此子测试会运行', { only: true });

  // 将上下文切换回以执行所有测试。
  t.runOnly(false);
  await t.test('此子测试现在会运行');

  // 显式不运行这些测试。
  await t.test('跳过的子测试 3', { only: false });
  await t.test('跳过的子测试 4', { skip: true });
});

// 未设置 'only' 选项，因此跳过此测试。
test('此测试不会运行', () => {
  // 此代码未运行。
  throw new Error('fail');
});

describe('一个套件', () => {
  // 已设置 'only' 选项，因此运行此测试。
  it('此测试会运行', { only: true }, () => {
    // 此代码已运行。
  });

  it('此测试不会运行', () => {
    // 此代码未运行。
    throw new Error('fail');
  });
});

describe.only('一个套件', () => {
  // 已设置 'only' 选项，因此运行此测试。
  it('此测试会运行', () => {
    // 此代码已运行。
  });

  it('此测试会运行', () => {
    // 此代码已运行。
  });
});
```

## 按名称过滤测试

[`--test-name-pattern`][] 命令行选项可用于仅运行名称与提供模式匹配的测试，而 [`--test-skip-pattern`][] 选项可用于跳过名称与提供模式匹配的测试。测试名称模式被解释为 JavaScript 正则表达式。`--test-name-pattern` 和 `--test-skip-pattern` 选项可以指定多次以运行嵌套测试。对于执行的每个测试，任何相应的测试钩子（如 `beforeEach()`）也会运行。未执行的测试将从测试运行器输出中省略。

给定以下测试文件，使用 `--test-name-pattern="test [1-3]"` 选项启动 Node.js 将导致测试运行器执行 `test 1`、`test 2` 和 `test 3`。如果 `test 1` 不匹配测试名称模式，则其子测试将不会执行，即使它们匹配模式。也可以通过多次传递 `--test-name-pattern` 来执行同一组测试（例如 `--test-name-pattern="test 1"`、`--test-name-pattern="test 2"` 等）。

```js
test('test 1', async (t) => {
  await t.test('test 2');
  await t.test('test 3');
});

test('Test 4', async (t) => {
  await t.test('Test 5');
  await t.test('test 6');
});
```

测试名称模式也可以使用正则表达式字面量指定。这允许使用正则表达式标志。在前面的示例中，使用 `--test-name-pattern="/test [4-5]/i"`（或 `--test-skip-pattern="/test [4-5]/i"`）启动 Node.js 将匹配 `Test 4` 和 `Test 5`，因为模式不区分大小写。

要使用模式匹配单个测试，你可以使用前缀所有祖先测试名称（用空格分隔），以确保它是唯一的。
例如，给定以下测试文件：

```js
describe('test 1', (t) => {
  it('some test');
});

describe('test 2', (t) => {
  it('some test');
});
```

使用 `--test-name-pattern="test 1 some test"` 启动 Node.js 将仅匹配 `test 1` 中的 `some test`。

测试名称模式不会更改测试运行器执行的文件集。

如果同时提供了 `--test-name-pattern` 和 `--test-skip-pattern`，测试必须满足 **两者** 要求才能执行。

## 测试标签

<!-- YAML
added: v26.2.0
-->

> 稳定性：1.0 - 早期开发

标签使用任意字符串标签为测试和套件添加注释。[`--experimental-test-tag-filter`][] CLI 标志（或 [`run()`][] 上的 `testTagFilters`
选项）会选择其标签集合包含每个
提供的过滤值的测试。

标签是将元数据编码到测试名称之外的一种替代方式。它们
适用于诸如子系统、速度等级、易波动性
或环境等横切维度，因为名称模式在这些场景下会比较脆弱。

### 编写带标签的测试

在 `test()`、`it()`、`suite()` 或 `describe()` 任一函数上传入 `tags` 数组。
标签通过并集从套件继承到其子测试——套件中带有 `['db']` 标签的测试如果声明了自己的 `tags: ['integration']`
，则实际上同时拥有这两个标签。

```mjs
import { describe, it } from 'node:test';

describe('database', { tags: ['db'] }, () => {
  it('reads a row');                                            // 标签：['db']
  it('writes a row', { tags: ['integration'] });                // 标签：['db', 'integration']
  it('reconnects after disconnect', { tags: ['flaky'] });       // 标签：['db', 'flaky']
});
```

```cjs
const { describe, it } = require('node:test');

describe('database', { tags: ['db'] }, () => {
  it('reads a row');                                            // 标签：['db']
  it('writes a row', { tags: ['integration'] });                // 标签：['db', 'integration']
  it('reconnects after disconnect', { tags: ['flaky'] });       // 标签：['db', 'flaky']
});
```

标签值必须是非空字符串。标签匹配时不区分大小写；
规范形式为小写。同一 `tags` 数组内的重复项会按小写形式折叠，
并保留首次出现的声明顺序。

钩子（`before`、`after`、`beforeEach`、`afterEach`）不会声明它们自己的
标签。它们作为其所属套件的一部分运行，而该套件承载
套件的标签。

### 按标签过滤

每个 [`--experimental-test-tag-filter`][] 值都是一个字面标签名。一个
测试只有在其标签集合包含该名称时才会运行。该标志可以
多次指定；测试必须匹配 **每个** 过滤条件才能运行。`run()`[] 上的 `testTagFilters`
数组也同样适用。过滤器不区分大小写，并与 [`--test-name-pattern`][]、
[`--test-skip-pattern`][] 和 `.only` 过滤进行 AND 组合。

在任何非空过滤条件下，未加标签的测试都会被排除，因为过滤条件
要求标签存在。

### 从测试内部读取标签

[`TestContext`][] 对象通过 [`context.tags`][] 将测试的标签作为一个冻结数组暴露，
因此测试可以根据自己的元数据进行分支。

### 错误

违反上述验证规则的标签值会在注册位置抛出
`ERR_INVALID_ARG_VALUE`，且发生在任何测试运行之前。
非数组的 `tags` 值会抛出 `ERR_INVALID_ARG_TYPE`。

## 多余的异步活动

一旦测试函数完成执行，结果会尽快报告，同时保持测试的顺序。然而，测试函数可能会产生比测试本身存活时间更长的异步活动。测试运行器处理此类活动，但不会为了适应它而延迟测试结果的报告。

在以下示例中，一个测试完成时仍有两个 `setImmediate()` 操作未完成。第一个 `setImmediate()` 尝试创建一个新的子测试。因为父测试已经完成并输出了结果，新的子测试会立即标记为失败，并在稍后报告给 {TestsStream}。

第二个 `setImmediate()` 创建一个 `uncaughtException` 事件。源自已完成测试的 `uncaughtException` 和 `unhandledRejection` 事件会被 `test` 模块标记为失败，并由 {TestsStream} 在顶层报告为诊断警告。

```js
test('一个创建异步活动的测试', (t) => {
  setImmediate(() => {
    t.test('太晚创建的子测试', (t) => {
      throw new Error('error1');
    });
  });

  setImmediate(() => {
    throw new Error('error2');
  });

  // 测试在此行之后结束。
});
```

## 监视模式

<!-- YAML
added:
  - v19.2.0
  - v18.13.0
-->

> 稳定性：1 - 实验性

Node.js 测试运行器支持通过传递 `--watch` 标志以监视模式运行：

```bash
node --test --watch
```

在监视模式下，测试运行器将监视测试文件及其依赖项的更改。检测到更改时，测试运行器将重新运行受更改影响的测试。
测试运行器将持续运行，直到进程终止。

## 全局设置和清理

<!-- YAML
added: v24.0.0
-->

> 稳定性：1.0 - 早期开发

测试运行器支持指定一个模块，该模块将在所有测试执行之前进行评估，并可用于设置测试的全局状态或夹具。这对于准备多个测试所需的资源或设置共享状态很有用。

该模块可以导出以下任何内容：

* 一个 `globalSetup` 函数，在所有测试开始前运行一次
* 一个 `globalTeardown` 函数，在所有测试完成后运行一次

该模块在使用命令行运行测试时使用 `--test-global-setup` 标志指定。

```cjs
// setup-module.js
async function globalSetup() {
  // 设置共享资源、状态或环境
  console.log('全局设置已执行');
  // 运行服务器、创建文件、准备数据库等。
}

async function globalTeardown() {
  // 清理资源、状态或环境
  console.log('全局清理已执行');
  // 关闭服务器、移除文件、断开数据库连接等。
}

module.exports = { globalSetup, globalTeardown };
```

```mjs
// setup-module.mjs
export async function globalSetup() {
  // 设置共享资源、状态或环境
  console.log('全局设置已执行');
  // 运行服务器、创建文件、准备数据库等。
}

export async function globalTeardown() {
  // 清理资源、状态或环境
  console.log('全局清理已执行');
  // 关闭服务器、移除文件、断开数据库连接等。
}
```

如果全局设置函数抛出错误，将不会运行任何测试，进程将以非零退出码退出。
在这种情况下，全局清理函数不会被调用。

## 从命令行运行测试

可以通过传递 [`--test`][] 标志从命令行调用 Node.js 测试运行器：

```bash
node --test
```

默认情况下，Node.js 将运行所有匹配以下模式的文件：

* `**/*.test.{cjs,mjs,js}`
* `**/*-test.{cjs,mjs,js}`
* `**/*_test.{cjs,mjs,js}`
* `**/test-*.{cjs,mjs,js}`
* `**/test.{cjs,mjs,js}`
* `**/test/**/*.{cjs,mjs,js}`

除非提供 [`--no-strip-types`][]，否则还会匹配以下附加模式：

* `**/*.test.{cts,mts,ts}`
* `**/*-test.{cts,mts,ts}`
* `**/*_test.{cts,mts,ts}`
* `**/test-*.{cts,mts,ts}`
* `**/test.{cts,mts,ts}`
* `**/test/**/*.{cts,mts,ts}`

或者，可以将一个或多个 glob 模式作为 Node.js 命令的最终参数提供，如下所示。
Glob 模式遵循 [`glob(7)`][] 的行为。
在命令行上，glob 模式应包含在双引号中，以防止 shell 扩展，这可以减少跨系统的可移植性问题。

```bash
node --test "**/*.test.js" "**/*.spec.js"
```

### 随机化测试执行顺序

<!-- YAML
added:
 - v26.1.0
 - v24.16.0
-->

> 稳定性：1.0 - 早期开发

测试运行器可以随机化执行顺序以帮助检测依赖顺序的测试。启用时，运行器会随机化发现的文件以及每个文件内排队的测试。使用 `--test-randomize` 启用此模式。

```bash
node --test --test-randomize
```

启用随机化时，测试运行器会将用于运行的种子作为诊断消息打印出来：

```text
Randomized test order seed: 12345
```

使用 `--test-random-seed=<number>` 以确定性地重放相同的随机顺序。提供 `--test-random-seed` 也会启用随机化，因此提供种子时 `--test-randomize` 是可选的：

```bash
node --test --test-random-seed=12345
```

在大多数测试文件中，随机化会自动工作。一个重要的例外是当子测试被逐个等待时。在这种模式下，每个子测试仅在前一个完成后才开始，因此运行器保持声明顺序而不是随机化它。

示例：这是顺序运行的，**未**随机化。

```mjs
import test from 'node:test';

test('math', async (t) => {
  for (const name of ['adds', 'subtracts', 'multiplies']) {
    // 顺序等待每个子测试会保留声明顺序。
    await t.test(name, async () => {});
  }
});
```

```cjs
const test = require('node:test');

test('math', async (t) => {
  for (const name of ['adds', 'subtracts', 'multiplies']) {
    // 顺序等待每个子测试会保留声明顺序。
    await t.test(name, async () => {});
  }
});
```

使用套件风格的 API（如 `describe()`/`it()` 或 `suite()`/`test()`）仍然允许随机化，因为兄弟测试是一起排队的。

示例：这仍然符合随机化条件。

```mjs
import { describe, it } from 'node:test';

describe('math', () => {
  it('adds', () => {});
  it('subtracts', () => {});
  it('multiplies', () => {});
});
```

```cjs
const { describe, it } = require('node:test');

describe('math', () => {
  it('adds', () => {});
  it('subtracts', () => {});
  it('multiplies', () => {});
});
```

`--test-randomize` 和 `--test-random-seed` 不支持与 `--watch` 模式一起使用。

匹配的文件作为测试文件执行。
有关测试文件执行的更多信息，可以在 [测试运行器执行模型][] 部分找到。

### 测试运行器执行模型

当启用进程级测试隔离时，每个匹配的测试文件都在单独的子进程中执行。任何时间运行的子进程的最大数量由 [`--test-concurrency`][] 标志控制。如果子进程以退出码 0 结束，则测试视为通过。否则，测试视为失败。测试文件必须可由 Node.js 执行，但不需要在内部使用 `node:test` 模块。

每个测试文件的执行都好像它是一个常规脚本。也就是说，如果测试文件本身使用 `node:test` 来定义测试，则所有这些测试都将在单个应用程序线程内执行，无论 [`test()`][] 的 `concurrency` 选项值如何。

当禁用进程级测试隔离时，每个匹配的测试文件都导入到测试运行器进程中。加载所有测试文件后，顶层测试以并发数 1 执行。因为所有测试文件都在同一上下文中运行，所以测试可能以启用隔离时不可能的方式相互交互。例如，如果测试依赖于全局状态，则该状态可能被源自另一个文件的测试修改。

#### 子进程选项继承

在进程隔离模式下运行测试时（默认情况），生成的子进程会从父进程继承 Node.js 选项，包括 [配置文件][] 中指定的选项。但是，某些标志会被过滤掉以启用正确的测试运行器功能：

* `--test` - 防止递归测试执行
* `--experimental-test-coverage` - 由测试运行器管理
* `--experimental-test-tag-filter` - 筛选值由父进程验证并重新发送到子进程
* `--watch` - 监视模式由父级处理
* `--experimental-default-config-file` - 配置文件加载由父级处理
* `--test-reporter` - 报告由父进程管理
* `--test-reporter-destination` - 输出目标由父级控制
* `--experimental-config-file` - 配置文件路径由父级管理
* `--test-randomize` - 随机化由父进程管理并传播到子进程
* `--test-random-seed` - 随机化种子由父进程管理并传播到子进程

来自命令行参数、环境变量和配置文件的所有其他 Node.js 选项都由子进程继承。

## 收集代码覆盖率

> 稳定性：1 - 实验性

当 Node.js 使用 [`--experimental-test-coverage`][] 命令行标志启动时，会收集代码覆盖率，并在所有测试完成后报告统计数据。如果使用 [`NODE_V8_COVERAGE`][] 环境变量指定代码覆盖率目录，生成的 V8 覆盖率文件将写入该目录。默认情况下，Node.js 核心模块和 `node_modules/` 目录内的文件不包含在覆盖率报告中。但是，可以通过 [`--test-coverage-include`][] 标志显式包含它们。默认情况下，所有匹配的测试文件都从覆盖率报告中排除。可以通过使用 [`--test-coverage-exclude`][] 标志来覆盖排除项。如果启用了覆盖率，覆盖率报告将通过 `'test:coverage'` 事件发送到任何 [测试报告器][]。

可以使用以下注释语法在一系列行上禁用覆盖率：

```js
/* node:coverage disable */
if (anAlwaysFalseCondition) {
  // 此分支中的代码永远不会被执行，但这些行会被忽略以用于
  // 覆盖率目的。'disable' 注释之后的所有行都会被忽略
  // 直到遇到相应的 'enable' 注释。
  console.log('这段代码永远不会被执行');
}
/* node:coverage enable */
```

也可以禁用指定行数的覆盖率。在指定行数之后，覆盖率将自动重新启用。如果未明确提供行数，则忽略单行。

```js
/* node:coverage ignore next */
if (anAlwaysFalseCondition) { console.log('这段代码永远不会被执行'); }

/* node:coverage ignore next 3 */
if (anAlwaysFalseCondition) {
  console.log('这段代码永远不会被执行');
}
```

### 覆盖率报告器

tap 和 spec 报告器将打印覆盖率统计信息的摘要。还有一个 lcov 报告器，它将生成一个 lcov 文件，可用作深度覆盖率报告。

```bash
node --test --experimental-test-coverage --test-reporter=lcov --test-reporter-destination=lcov.info
```

* 此报告器不报告任何测试结果。
* 理想情况下，此报告器应与另一个报告器一起使用。

## 模拟 (Mocking)

`node:test` 模块支持通过顶层 `mock` 对象在测试期间进行模拟。以下示例创建一个函数的间谍，该函数将两个数字相加。然后使用间谍来断言该函数是否按预期被调用。

```mjs
import assert from 'node:assert';
import { mock, test } from 'node:test';

test('spies on a function', () => {
  const sum = mock.fn((a, b) => {
    return a + b;
  });

  assert.strictEqual(sum.mock.callCount(), 0);
  assert.strictEqual(sum(3, 4), 7);
  assert.strictEqual(sum.mock.callCount(), 1);

  const call = sum.mock.calls[0];
  assert.deepStrictEqual(call.arguments, [3, 4]);
  assert.strictEqual(call.result, 7);
  assert.strictEqual(call.error, undefined);

  // 重置全局跟踪的模拟对象。
  mock.reset();
});
```

```cjs
const assert = require('node:assert');
const { mock, test } = require('node:test');

test('spies on a function', () => {
  const sum = mock.fn((a, b) => {
    return a + b;
  });

  assert.strictEqual(sum.mock.callCount(), 0);
  assert.strictEqual(sum(3, 4), 7);
  assert.strictEqual(sum.mock.callCount(), 1);

  const call = sum.mock.calls[0];
  assert.deepStrictEqual(call.arguments, [3, 4]);
  assert.strictEqual(call.result, 7);
  assert.strictEqual(call.error, undefined);

  // 重置全局跟踪的模拟对象。
  mock.reset();
});
```

相同的模拟功能也暴露在每个测试的 [`TestContext`][] 对象上。以下示例使用 `TestContext` 上暴露的 API 创建对象方法的间谍。通过测试上下文进行模拟的好处是，一旦测试完成，测试运行器将自动恢复所有模拟的功能。

```js
test('spies on an object method', (t) => {
  const number = {
    value: 5,
    add(a) {
      return this.value + a;
    },
  };

  t.mock.method(number, 'add');
  assert.strictEqual(number.add.mock.callCount(), 0);
  assert.strictEqual(number.add(3), 8);
  assert.strictEqual(number.add.mock.callCount(), 1);

  const call = number.add.mock.calls[0];

  assert.deepStrictEqual(call.arguments, [3]);
  assert.strictEqual(call.result, 8);
  assert.strictEqual(call.target, undefined);
  assert.strictEqual(call.this, number);
});
```

### 计时器

模拟计时器是一种常用于软件测试的技术，用于模拟和控制计时器（如 `setInterval` 和 `setTimeout`）的行为，而无需实际等待指定的时间间隔。

请参阅 [`MockTimers`][] 类以获取方法和功能的完整列表。

这使得开发人员能够为依赖时间的功能编写更可靠和
可预测的测试。

下面的示例展示了如何模拟 `setTimeout`。
使用 `.enable({ apis: ['setTimeout'] });`
它将模拟 [node:timers](./timers.md) 和
[node:timers/promises](./timers.md#timers-promises-api) 模块中的 `setTimeout` 函数，
以及来自 Node.js 全局上下文的函数。

**注意：** 此 API 目前不支持解构函数，例如
`import { setTimeout } from 'node:timers'`。

```mjs
import assert from 'node:assert';
import { mock, test } from 'node:test';

test('mocks setTimeout to be executed synchronously without having to actually wait for it', () => {
  const fn = mock.fn();

  // 可选地选择要模拟的内容
  mock.timers.enable({ apis: ['setTimeout'] });
  setTimeout(fn, 9999);
  assert.strictEqual(fn.mock.callCount(), 0);

  // 推进时间
  mock.timers.tick(9999);
  assert.strictEqual(fn.mock.callCount(), 1);

  // 重置全局跟踪的模拟对象。
  mock.timers.reset();

  // 如果调用 reset 模拟实例，它也会重置计时器实例
  mock.reset();
});
```

```cjs
const assert = require('node:assert');
const { mock, test } = require('node:test');

test('mocks setTimeout to be executed synchronously without having to actually wait for it', () => {
  const fn = mock.fn();

  // 可选地选择要模拟的内容
  mock.timers.enable({ apis: ['setTimeout'] });
  setTimeout(fn, 9999);
  assert.strictEqual(fn.mock.callCount(), 0);

  // 推进时间
  mock.timers.tick(9999);
  assert.strictEqual(fn.mock.callCount(), 1);

  // 重置全局跟踪的模拟对象。
  mock.timers.reset();

  // 如果调用 reset 模拟实例，它也会重置计时器实例
  mock.reset();
});
```

相同的模拟功能也暴露在每个测试的 [`TestContext`][] 对象的 mock 属性上。通过测试上下文进行模拟的好处是
一旦测试完成，测试运行器将自动恢复所有模拟的计时器
功能。

```mjs
import assert from 'node:assert';
import { test } from 'node:test';

test('mocks setTimeout to be executed synchronously without having to actually wait for it', (context) => {
  const fn = context.mock.fn();

  // 可选地选择要模拟的内容
  context.mock.timers.enable({ apis: ['setTimeout'] });
  setTimeout(fn, 9999);
  assert.strictEqual(fn.mock.callCount(), 0);

  // 推进时间
  context.mock.timers.tick(9999);
  assert.strictEqual(fn.mock.callCount(), 1);
});
```

```cjs
const assert = require('node:assert');
const { test } = require('node:test');

test('mocks setTimeout to be executed synchronously without having to actually wait for it', (context) => {
  const fn = context.mock.fn();

  // 可选地选择要模拟的内容
  context.mock.timers.enable({ apis: ['setTimeout'] });
  setTimeout(fn, 9999);
  assert.strictEqual(fn.mock.callCount(), 0);

  // 推进时间
  context.mock.timers.tick(9999);
  assert.strictEqual(fn.mock.callCount(), 1);
});
```

### 日期

模拟计时器 API 还允许模拟 `Date` 对象。这对于测试依赖时间的功能或模拟内部日历函数（如 `Date.now()`）是一个有用的功能。

日期实现也是 [`MockTimers`][] 类的一部分。请参阅它以获取方法和功能的完整列表。

**注意：** 日期和计时器在一起模拟时是依赖的。这意味着
如果你同时模拟了 `Date` 和 `setTimeout`，推进时间也会
推进模拟的日期，因为它们模拟的是单个内部时钟。

下面的示例展示了如何模拟 `Date` 对象并获取当前
`Date.now()` 值。

```mjs
import assert from 'node:assert';
import { test } from 'node:test';

test('mocks the Date object', (context) => {
  // 可选地选择要模拟的内容
  context.mock.timers.enable({ apis: ['Date'] });
  // 如果未指定，初始日期将基于 UNIX 纪元的 0
  assert.strictEqual(Date.now(), 0);

  // 推进时间也会推进日期
  context.mock.timers.tick(9999);
  assert.strictEqual(Date.now(), 9999);
});
```

```cjs
const assert = require('node:assert');
const { test } = require('node:test');

test('mocks the Date object', (context) => {
  // 可选地选择要模拟的内容
  context.mock.timers.enable({ apis: ['Date'] });
  // 如果未指定，初始日期将基于 UNIX 纪元的 0
  assert.strictEqual(Date.now(), 0);

  // 推进时间也会推进日期
  context.mock.timers.tick(9999);
  assert.strictEqual(Date.now(), 9999);
});
```

如果没有设置初始纪元，初始日期将基于 Unix 纪元的 0。这是 1970 年 1 月 1 日，00:00:00 UTC。你可以通过向 `.enable()` 方法传递 `now` 属性来设置初始日期。此值将用作模拟 `Date` 对象的初始日期。它可以是正整数，也可以是另一个 Date 对象。

```mjs
import assert from 'node:assert';
import { test } from 'node:test';

test('mocks the Date object with initial time', (context) => {
  // 可选地选择要模拟的内容
  context.mock.timers.enable({ apis: ['Date'], now: 100 });
  assert.strictEqual(Date.now(), 100);

  // 推进时间也会推进日期
  context.mock.timers.tick(200);
  assert.strictEqual(Date.now(), 300);
});
```

```cjs
const assert = require('node:assert');
const { test } = require('node:test');

test('mocks the Date object with initial time', (context) => {
  // 可选地选择要模拟的内容
  context.mock.timers.enable({ apis: ['Date'], now: 100 });
  assert.strictEqual(Date.now(), 100);

  // 推进时间也会推进日期
  context.mock.timers.tick(200);
  assert.strictEqual(Date.now(), 300);
});
```

你可以使用 `.setTime()` 方法手动将模拟的日期移动到另一个
时间。此方法仅接受正整数。

**注意：** 此方法**不会**执行任何在新时间之前过去的模拟计时器。

在下面的示例中，我们为模拟的日期设置了一个新时间。

```mjs
import assert from 'node:assert';
import { test } from 'node:test';

test('sets the time of a date object', (context) => {
  // 可选地选择要模拟的内容
  context.mock.timers.enable({ apis: ['Date'], now: 100 });
  assert.strictEqual(Date.now(), 100);

  // 推进时间也会推进日期
  context.mock.timers.setTime(1000);
  context.mock.timers.tick(200);
  assert.strictEqual(Date.now(), 1200);
});
```

```cjs
const assert = require('node:assert');
const { test } = require('node:test');

test('sets the time of a date object', (context) => {
  // 可选地选择要模拟的内容
  context.mock.timers.enable({ apis: ['Date'], now: 100 });
  assert.strictEqual(Date.now(), 100);

  // 推进时间也会推进日期
  context.mock.timers.setTime(1000);
  context.mock.timers.tick(200);
  assert.strictEqual(Date.now(), 1200);
});
```

当你调用 `setTime()` 时，过去安排的计时器**不会**运行。要执行这些计时器，你可以使用
`.tick()` 方法从新时间向前移动。

```mjs
import assert from 'node:assert';
import { test } from 'node:test';

test('setTime does not execute timers', (context) => {
  // 可选地选择要模拟的内容
  context.mock.timers.enable({ apis: ['setTimeout', 'Date'] });
  const fn = context.mock.fn();
  setTimeout(fn, 1000);

  context.mock.timers.setTime(800);
  // 计时器未执行，因为时间尚未到达
  assert.strictEqual(fn.mock.callCount(), 0);
  assert.strictEqual(Date.now(), 800);

  context.mock.timers.setTime(1200);
  // 计时器仍然未执行
  assert.strictEqual(fn.mock.callCount(), 0);
  // 推进时间以执行计时器
  context.mock.timers.tick(0);
  assert.strictEqual(fn.mock.callCount(), 1);
  assert.strictEqual(Date.now(), 1200);
});
```

```cjs
const assert = require('node:assert');
const { test } = require('node:test');

test('runs timers as setTime passes ticks', (context) => {
  // 可选地选择要模拟的内容
  context.mock.timers.enable({ apis: ['setTimeout', 'Date'] });
  const fn = context.mock.fn();
  setTimeout(fn, 1000);

  context.mock.timers.setTime(800);
  // 计时器未执行，因为时间尚未到达
  assert.strictEqual(fn.mock.callCount(), 0);
  assert.strictEqual(Date.now(), 800);

  context.mock.timers.setTime(1200);
  // 计时器已执行，因为时间现已到达
  assert.strictEqual(fn.mock.callCount(), 1);
  assert.strictEqual(Date.now(), 1200);
});
```

使用 `.runAll()` 将执行当前队列中的所有计时器。这
也会将模拟的日期推进到最后执行的计时器的时间，就像时间已经过去了一样。

```mjs
import assert from 'node:assert';
import { test } from 'node:test';

test('runs timers as setTime passes ticks', (context) => {
  // 可选地选择要模拟的内容
  context.mock.timers.enable({ apis: ['setTimeout', 'Date'] });
  const fn = context.mock.fn();
  setTimeout(fn, 1000);
  setTimeout(fn, 2000);
  setTimeout(fn, 3000);

  context.mock.timers.runAll();
  // 所有计时器已执行，因为时间现已到达
  assert.strictEqual(fn.mock.callCount(), 3);
  assert.strictEqual(Date.now(), 3000);
});
```

```cjs
const assert = require('node:assert');
const { test } = require('node:test');

test('runs timers as setTime passes ticks', (context) => {
  // 可选地选择要模拟的内容
  context.mock.timers.enable({ apis: ['setTimeout', 'Date'] });
  const fn = context.mock.fn();
  setTimeout(fn, 1000);
  setTimeout(fn, 2000);
  setTimeout(fn, 3000);

  context.mock.timers.runAll();
  // 所有计时器已执行，因为时间现已到达
  assert.strictEqual(fn.mock.callCount(), 3);
  assert.strictEqual(Date.now(), 3000);
});
```

## 快照测试

<!-- YAML
added: v22.3.0
changes:
  - version: v23.4.0
    pr-url: https://github.com/nodejs/node/pull/55897
    description: 快照测试不再是实验性功能。
-->

快照测试允许将任意值序列化为字符串值，并与一组已知良好值进行比较。这些已知良好值被称为快照，并存储在快照文件中。快照文件由测试运行器管理，但设计为人类可读以辅助调试。最佳实践是将快照文件与测试文件一起检入版本控制。

快照文件是通过使用 [`--test-update-snapshots`][] 命令行标志启动 Node.js 生成的。每个测试文件都会生成一个单独的快照文件。默认情况下，快照文件与测试文件具有相同的名称，但带有 `.snapshot` 文件扩展名。此行为可以使用 `snapshot.setResolveSnapshotPath()` 函数进行配置。每个快照断言对应于快照文件中的一个导出。

下面显示了一个快照测试示例。第一次执行此测试时，它将失败，因为相应的快照文件不存在。

```js
// test.js
suite('快照测试套件', () => {
  test('快照测试', (t) => {
    t.assert.snapshot({ value1: 1, value2: 2 });
    t.assert.snapshot(5);
  });
});
```

通过使用 `--test-update-snapshots` 运行测试文件来生成快照文件。测试应该通过，并且一个名为 `test.js.snapshot` 的文件将创建在与测试文件相同的目录中。快照文件的内容如下所示。每个快照由测试的全名和一个计数器标识，以区分同一测试中的快照。

```js
exports[`快照测试套件 > 快照测试 1`] = `
{
  "value1": 1,
  "value2": 2
}
`;

exports[`快照测试套件 > 快照测试 2`] = `
5
`;
```

一旦创建了快照文件，再次运行测试而不使用 `--test-update-snapshots` 标志。现在测试应该通过。

## 测试报告器

<!-- YAML
added:
  - v19.6.0
  - v18.15.0
changes:
  - version: v23.0.0
    pr-url: https://github.com/nodejs/node/pull/54548
    description: "非 TTY 标准输出上的默认报告器已从 `tap` 更改为 `spec`，与 TTY 标准输出保持一致。"
  - version:
    - v19.9.0
    - v18.17.0
    pr-url: https://github.com/nodejs/node/pull/47238
    description: "报告器现在暴露在 `node:test/reporters` 上。"
-->

`node:test` 模块支持传递 [`--test-reporter`][] 标志，以便测试运行器使用特定的报告器。

支持以下内置报告器：

* `spec`
  `spec` 报告器以人类可读格式输出测试结果。这是默认报告器。

* `tap`
  `tap` 报告器以 [TAP][] 格式输出测试结果。

* `dot`
  `dot` 报告器以紧凑格式输出测试结果，
  其中每个通过的测试由一个 `.` 表示，
  每个失败的测试由一个 `X` 表示。

* `junit`
  `junit` 报告器以 jUnit XML 格式输出测试结果

* `lcov`
  `lcov` 报告器在与 [`--experimental-test-coverage`][] 标志一起使用时输出测试覆盖率。

这些报告器的确切输出可能会在 Node.js 版本之间发生变化，不应以编程方式依赖。如果需要以编程方式访问测试运行器的输出，请使用由 {TestsStream} 发出的事件。

报告器可通过 `node:test/reporters` 模块获得：

```mjs
import { tap, spec, dot, junit, lcov } from 'node:test/reporters';
```

```cjs
const { tap, spec, dot, junit, lcov } = require('node:test/reporters');
```

### 自定义报告器

[`--test-reporter`][] 可用于指定自定义报告器的路径。
自定义报告器是一个导出值的模块，
该值被 [stream.compose][] 接受。
报告器应转换由 {TestsStream} 发出的事件

使用 {stream.Transform} 的自定义报告器示例：

```mjs
import { Transform } from 'node:stream';

const customReporter = new Transform({
  writableObjectMode: true,
  transform(event, encoding, callback) {
    switch (event.type) {
      case 'test:dequeue':
        callback(null, `test ${event.data.name} dequeued`);
        break;
      case 'test:enqueue':
        callback(null, `test ${event.data.name} enqueued`);
        break;
      case 'test:watch:drained':
        callback(null, 'test watch queue drained');
        break;
      case 'test:watch:restarted':
        callback(null, 'test watch restarted due to file change');
        break;
      case 'test:start':
        callback(null, `test ${event.data.name} started`);
        break;
      case 'test:pass':
        callback(null, `test ${event.data.name} passed`);
        break;
      case 'test:fail':
        callback(null, `test ${event.data.name} failed`);
        break;
      case 'test:plan':
        callback(null, 'test plan');
        break;
      case 'test:diagnostic':
      case 'test:stderr':
      case 'test:stdout':
        callback(null, event.data.message);
        break;
      case 'test:coverage': {
        const { totalLineCount } = event.data.summary.totals;
        callback(null, `总行数：${totalLineCount}\n`);
        break;
      }
    }
  },
});

export default customReporter;
```

```cjs
const { Transform } = require('node:stream');

const customReporter = new Transform({
  writableObjectMode: true,
  transform(event, encoding, callback) {
    switch (event.type) {
      case 'test:dequeue':
        callback(null, `test ${event.data.name} dequeued`);
        break;
      case 'test:enqueue':
        callback(null, `test ${event.data.name} enqueued`);
        break;
      case 'test:watch:drained':
        callback(null, 'test watch queue drained');
        break;
      case 'test:watch:restarted':
        callback(null, 'test watch restarted due to file change');
        break;
      case 'test:start':
        callback(null, `test ${event.data.name} started`);
        break;
      case 'test:pass':
        callback(null, `test ${event.data.name} passed`);
        break;
      case 'test:fail':
        callback(null, `test ${event.data.name} failed`);
        break;
      case 'test:plan':
        callback(null, 'test plan');
        break;
      case 'test:diagnostic':
      case 'test:stderr':
      case 'test:stdout':
        callback(null, event.data.message);
        break;
      case 'test:coverage': {
        const { totalLineCount } = event.data.summary.totals;
        callback(null, `总行数：${totalLineCount}\n`);
        break;
      }
    }
  },
});

module.exports = customReporter;
```

使用生成器函数的自定义报告器示例：

```mjs
export default async function * customReporter(source) {
  for await (const event of source) {
    switch (event.type) {
      case 'test:dequeue':
        yield `test ${event.data.name} dequeued\n`;
        break;
      case 'test:enqueue':
        yield `test ${event.data.name} enqueued\n`;
        break;
      case 'test:watch:drained':
        yield 'test watch queue drained\n';
        break;
      case 'test:watch:restarted':
        yield 'test watch restarted due to file change\n';
        break;
      case 'test:start':
        yield `test ${event.data.name} started\n`;
        break;
      case 'test:pass':
        yield `test ${event.data.name} passed\n`;
        break;
      case 'test:fail':
        yield `test ${event.data.name} failed\n`;
        break;
      case 'test:plan':
        yield 'test plan\n';
        break;
      case 'test:diagnostic':
      case 'test:stderr':
      case 'test:stdout':
        yield `${event.data.message}\n`;
        break;
      case 'test:coverage': {
        const { totalLineCount } = event.data.summary.totals;
        yield `总行数：${totalLineCount}\n`;
        break;
      }
    }
  }
}
```

```cjs
module.exports = async function * customReporter(source) {
  for await (const event of source) {
    switch (event.type) {
      case 'test:dequeue':
        yield `test ${event.data.name} dequeued\n`;
        break;
      case 'test:enqueue':
        yield `test ${event.data.name} enqueued\n`;
        break;
      case 'test:watch:drained':
        yield 'test watch queue drained\n';
        break;
      case 'test:watch:restarted':
        yield 'test watch restarted due to file change\n';
        break;
      case 'test:start':
        yield `test ${event.data.name} started\n`;
        break;
      case 'test:pass':
        yield `test ${event.data.name} passed\n`;
        break;
      case 'test:fail':
        yield `test ${event.data.name} failed\n`;
        break;
      case 'test:plan':
        yield 'test plan\n';
        break;
      case 'test:diagnostic':
      case 'test:stderr':
      case 'test:stdout':
        yield `${event.data.message}\n`;
        break;
      case 'test:coverage': {
        const { totalLineCount } = event.data.summary.totals;
        yield `总行数：${totalLineCount}\n`;
        break;
      }
    }
  }
};
```

提供给 `--test-reporter` 的值应该是一个字符串，类似于 JavaScript 代码中 `import()` 使用的字符串，或者是提供给 [`--import`][] 的值。

### 多个报告器

[`--test-reporter`][] 标志可以指定多次，以多种格式报告测试结果。在这种情况下，
需要使用 [`--test-reporter-destination`][] 为每个报告器指定一个目标。
目标可以是 `stdout`、`stderr` 或文件路径。
报告器和目标根据它们指定的顺序进行配对。

在以下示例中，`spec` 报告器将输出到 `stdout`，
而 `dot` 报告器将输出到 `file.txt`：

```bash
node --test-reporter=spec --test-reporter=dot --test-reporter-destination=stdout --test-reporter-destination=file.txt
```

当指定单个报告器时，除非明确提供了目标，否则目标将默认为 `stdout`。

## `run([options])`

<!-- YAML
added:
  - v18.9.0
  - v16.19.0
changes:
  - version: v26.2.0
    pr-url: https://github.com/nodejs/node/pull/63221
    description: Added the `testTagFilters` option.
  - version:
     - v25.6.0
     - v24.14.0
    pr-url: https://github.com/nodejs/node/pull/61367
    description: "添加 `env` 选项。"
  - version: v24.7.0
    pr-url: https://github.com/nodejs/node/pull/59443
    description: 添加了 rerunFailuresFilePath 选项。
  - version: v23.0.0
    pr-url: https://github.com/nodejs/node/pull/54705
    description: "添加了 `cwd` 选项。"
  - version:
    - v23.0.0
    - v22.10.0
    pr-url: https://github.com/nodejs/node/pull/53937
    description: 添加了覆盖率选项。
  - version: v22.8.0
    pr-url: https://github.com/nodejs/node/pull/53927
    description: "添加了 `isolation` 选项。"
  - version: v22.6.0
    pr-url: https://github.com/nodejs/node/pull/53866
    description: "添加了 `globPatterns` 选项。"
  - version:
    - v22.0.0
    - v20.14.0
    pr-url: https://github.com/nodejs/node/pull/52038
    description: "添加了 `forceExit` 选项。"
  - version:
    - v20.1.0
    - v18.17.0
    pr-url: https://github.com/nodejs/node/pull/47628
    description: 添加 testNamePatterns 选项。
-->

* `options` {Object} 运行测试的配置选项。支持以下属性：
  * `concurrency` {number|boolean} 如果提供的是数字，
    那么将并行运行这么多个测试进程，其中每个进程对应一个测试文件。
    如果为 `true`，则会并行运行 `os.availableParallelism() - 1` 个测试文件。
    如果为 `false`，则一次只运行一个测试文件。
    **默认值：** `false`。
  * `cwd` {string} 指定测试运行器使用的当前工作目录。
    作为解析文件的基路径，行为类似于在该目录下[从命令行运行测试][]。
    **默认值：** `process.cwd()`。
  * `files` {Array} 包含要运行的文件列表的数组。
    **默认值：** 与[从命令行运行测试][]相同。
  * `forceExit` {boolean} 配置测试运行器在所有已知测试执行完毕后退出进程，即使事件循环本来仍会保持活动状态。**默认值：** `false`。
  * `globPatterns` {Array} 包含用于匹配测试文件的 glob 模式列表的数组。此选项不能与 `files` 同时使用。
    **默认值：** 与[从命令行运行测试][]相同。
  * `inspectPort` {number|Function} 设置测试子进程的检查器端口。
    这可以是一个数字，也可以是一个不带参数并返回数字的函数。如果提供的是 nullish 值，则每个进程都会获得自己的端口，从主进程的 `process.debugPort` 递增。若将 `isolation` 选项设置为 `'none'`，因为不会生成子进程，此选项将被忽略。**默认值：** `undefined`。
  * `isolation` {string} 配置测试隔离类型。如果设置为 `'process'`，每个测试文件都将在单独的子进程中运行。如果设置为 `'none'`，所有测试文件都将在当前进程中运行。**默认值：**
    `'process'`。
  * `only` {boolean} 如果为 truthy，则测试上下文只会运行设置了 `only` 选项的测试
  * `setup` {Function} 接受 `TestsStream` 实例的函数，可用于在任何测试运行之前设置监听器。
    **默认值：** `undefined`。
  * `execArgv` {Array} 在生成子进程时传递给 `node` 可执行文件的一组 CLI 标志。`isolation` 为 `'none`' 时此选项无效。
    **默认值：** `[]`
  * `argv` {Array} 在生成子进程时传递给每个测试文件的一组 CLI 标志。`isolation` 为 `'none'` 时此选项无效。
    **默认值：** `[]`。
  * `signal` {AbortSignal} 允许中止正在进行中的测试执行。
  * `testNamePatterns` {string|RegExp|Array} 一个字符串、RegExp 或 RegExp 数组，
    可用于只运行名称与提供模式匹配的测试。
    测试名称模式会被解释为 JavaScript 正则表达式。
    对于执行的每个测试，任何对应的测试钩子（例如
    `beforeEach()`）也会运行。
    **默认值：** `undefined`。
  * `testSkipPatterns` {string|RegExp|Array} 一个字符串、RegExp 或 RegExp 数组，
    可用于排除运行名称与提供模式匹配的测试。
    测试名称模式会被解释为 JavaScript 正则表达式。
    对于执行的每个测试，任何对应的测试钩子（例如
    `beforeEach()`）也会运行。
    **默认值：** `undefined`。
  * `testTagFilters` {string|string\[]} 一个标签名，或一个标签名数组，
    用于按测试声明的标签筛选测试。测试必须包含列出的每个标签才能运行。等同于在命令行上传递 [`--experimental-test-tag-filter`][]。
    参见 [Test tags][]。**默认值：** `undefined`。
  * `timeout` {number} 测试执行在多少毫秒后将失败。
    如果未指定，子测试会从其父级继承此值。
    **默认值：** `Infinity`。
  * `watch` {boolean} 是否以监视模式运行。**默认值：** `false`。
  * `shard` {Object} 在特定分片中运行测试。**默认值：** `undefined`。
    * `index` {number} 是介于 1 和 `<total>` 之间的正整数，
      用于指定要运行的分片索引。此选项为 _必需_。
    * `total` {number} 是一个正整数，用于指定拆分测试文件的分片总数。此选项为 _必需_。
  * `randomize` {boolean} 随机化测试文件和队列中测试的执行顺序。
    此选项不支持 `watch: true`。
    **默认值：** `false`。
  * `randomSeed` {number} 用于随机化执行顺序的种子。如果设置了此
    选项，则运行可以确定性地重放相同的随机顺序，
    并且设置此选项也会启用随机化。该值必须是
    介于 `0` 和 `4294967295` 之间的整数。
    **默认值：** `undefined`。
  * `rerunFailuresFilePath` {string} 一个文件路径，测试运行器会
    在其中存储测试状态，以便下次运行时仅重跑失败的测试。
    更多信息请参见 \[Rerunning failed tests]\[]。
    **默认值：** `undefined`。
  * `coverage` {boolean} 启用 [代码覆盖率][] 收集。
    **默认值：** `false`。
  * `coverageExcludeGlobs` {string|Array} 使用 glob 模式排除代码覆盖率中的特定文件，
    该模式可以匹配绝对路径和相对路径。
    仅当 `coverage` 设置为 `true` 时，此属性才适用。
    如果同时提供了 `coverageExcludeGlobs` 和 `coverageIncludeGlobs`，
    文件必须同时满足**两者**条件才会包含在覆盖率报告中。
    **默认值：** `undefined`。
  * `coverageIncludeGlobs` {string|Array} 使用 glob 模式将特定文件包含在代码覆盖率中，
    该模式可以匹配绝对路径和相对路径。
    仅当 `coverage` 设置为 `true` 时，此属性才适用。
    如果同时提供了 `coverageExcludeGlobs` 和 `coverageIncludeGlobs`，
    文件必须同时满足**两者**条件才会包含在覆盖率报告中。
    **默认值：** `undefined`。
  * `lineCoverage` {number} 要求覆盖行的最低百分比。如果代码
    覆盖率未达到指定阈值，进程将以代码 `1` 退出。
    **默认值：** `0`。
  * `branchCoverage` {number} 要求覆盖分支的最低百分比。如果代码
    覆盖率未达到指定阈值，进程将以代码 `1` 退出。
    **默认值：** `0`。
  * `functionCoverage` {number} 要求覆盖函数的最低百分比。如果代码
    覆盖率未达到指定阈值，进程将以代码 `1` 退出。
    **默认值：** `0`。
  * `env` {Object} 指定要传递给测试进程的环境变量。
    此选项与 `isolation='none'` 不兼容。这些变量将覆盖
    主进程中的变量，不会与 `process.env` 合并。
    **默认值：** `process.env`。
* 返回：{TestsStream}

**注意：** `shard` 用于在机器或进程之间水平并行化测试运行，
适用于跨不同环境的大规模执行。它与 `watch` 模式不兼容，后者旨在通过在文件更改时自动重新运行测试来实现快速代码迭代。

```mjs
import { tap } from 'node:test/reporters';
import { run } from 'node:test';
import process from 'node:process';
import path from 'node:path';

run({ files: [path.resolve('./tests/test.js')] })
 .on('test:fail', () => {
   process.exitCode = 1;
 })
 .compose(tap)
 .pipe(process.stdout);
```

```cjs
const { tap } = require('node:test/reporters');
const { run } = require('node:test');
const path = require('node:path');

run({ files: [path.resolve('./tests/test.js')] })
 .on('test:fail', () => {
   process.exitCode = 1;
 })
 .compose(tap)
 .pipe(process.stdout);
```

## `suite([name][, options][, fn])`

<!-- YAML
added:
  - v22.0.0
  - v20.13.0
-->

* `name` {string} 套件的名称，在报告测试结果时显示。**默认：** `fn` 的 `name` 属性；如果 `fn` 没有名称，则为 `'<anonymous>'`。
* `options` {Object} 套件的可选配置项。
  支持与 `test([name][, options][, fn])` 相同的选项。
* `fn` {Function|AsyncFunction} 声明嵌套测试和套件的套件函数。该函数的第一个参数是一个 [`SuiteContext`][] 对象。**默认：** 无操作函数。
* 返回值：{Promise} 立即以 `undefined` 兑现。

`suite()` 函数从 `node:test` 模块导入。

## `suite.skip([name][, options][, fn])`

<!-- YAML
added:
  - v22.0.0
  - v20.13.0
-->

用于跳过套件的简写。这与 [`suite([name], { skip: true }[, fn])`][suite options] 相同。

## `suite.todo([name][, options][, fn])`

<!-- YAML
added:
  - v22.0.0
  - v20.13.0
-->

用于将套件标记为 `TODO` 的简写。这与 [`suite([name], { todo: true }[, fn])`][suite options] 相同。

## `suite.only([name][, options][, fn])`

<!-- YAML
added:
  - v22.0.0
  - v20.13.0
-->

用于将套件标记为 `only` 的简写。这与 [`suite([name], { only: true }[, fn])`][suite options] 相同。

## `test([name][, options][, fn])`

<!-- YAML
added:
  - v18.0.0
  - v16.17.0
changes:
  - version: v26.2.0
    pr-url: https://github.com/nodejs/node/pull/63221
    description: Added the `tags` option.
  - version:
    - v20.2.0
    - v18.17.0
    pr-url: https://github.com/nodejs/node/pull/47909
    description: "Added `skip`, `todo`, and `only` shorthands."
  - version:
    - v18.8.0
    - v16.18.0
    pr-url: https://github.com/nodejs/node/pull/43554
    description: "Added `signal` option."
  - version:
    - v18.7.0
    - v16.17.0
    pr-url: https://github.com/nodejs/node/pull/43505
    description: "Added `timeout` option."
-->

* `name` {string} 测试的名称，在报告测试结果时显示。**默认：** `fn` 的 `name` 属性；如果 `fn` 没有名称，则为 `'<anonymous>'`。
* `options` {Object} 测试的配置选项。支持以下属性：
  * `concurrency` {number|boolean} 如果提供一个数字，则会有那么多个测试异步运行（它们仍由单线程事件循环管理）。
    如果为 `true`，所有已安排的异步测试都会在该线程内并发运行。如果为 `false`，一次只运行一个测试。
    如果未指定，子测试会从其父级继承此值。
    **默认：** `false`。
  * `expectFailure` {boolean|string|RegExp|Function|Object|Error} 如果为真值，则
    预期测试会失败。如果提供非空字符串，则该字符串会在测试结果中显示为测试预期失败的原因。如果直接提供 {RegExp|Function|Object|Error}
    （而不是封装在 `{ match: … }` 中），则只有在抛出的错误匹配时测试才会通过，行为与
    [`assert.throws`][] 一致。若要同时提供原因和验证，请传入一个包含 `label`（字符串）和 `match`（RegExp、Function、Object 或 Error）的对象。
    **默认：** `false`。
  * `only` {boolean} 如果为真值，并且测试上下文配置为运行 `only` 测试，则会运行此测试。否则，测试会被跳过。
    **默认：** `false`。
  * `signal` {AbortSignal} 允许中止正在进行中的测试。
  * `skip` {boolean|string} 如果为真值，则测试会被跳过。如果提供字符串，则该字符串会在测试结果中显示为跳过测试的原因。**默认：** `false`。
  * `tags` {string\[]} 与测试关联的字符串标签数组。
    与 [`--experimental-test-tag-filter`][] 一起用于筛选要运行的测试。标签会通过并集从套件继承到嵌套测试。参见
    [Test tags][]。**默认：** `[]`。
  * `todo` {boolean|string} 如果为真值，则测试会被标记为 `TODO`。如果提供字符串，则该字符串会在测试结果中显示为测试为何为 `TODO` 的原因。**默认：** `false`。
  * `timeout` {number} 测试在多少毫秒后失败。
    如果未指定，子测试会从其父级继承此值。
    **默认：** `Infinity`。
  * `plan` {number} 预期在测试中运行的断言和子测试数量。
    如果测试中实际运行的断言数量与计划中指定的数量不匹配，测试将失败。
    **默认：** `undefined`。
* `fn` {Function|AsyncFunction} 被测试的函数。该函数的第一个参数
  是一个 [`TestContext`][] 对象。如果测试使用回调，则回调函数作为第二个参数传入。**默认：** 一个无操作函数。
* 返回值：{Promise} 在测试完成后兑现为 `undefined`，
  如果测试在套件内运行，则会立即兑现。

`test()` 函数是从 `test` 模块导入的一个值。每次调用此函数都会向 {TestsStream} 报告一个测试。

传递给 `fn` 参数的 `TestContext` 对象可用于执行与当前测试相关的操作。示例包括跳过测试、添加
额外的诊断信息，或创建子测试。

`test()` 返回一个在测试完成后兑现的 `Promise`。
如果在套件内调用 `test()`，它会立即兑现。
顶层测试的返回值通常可以忽略。
但是，子测试的返回值应当使用，以防止父测试
过早结束并取消子测试，如以下示例所示。

```js
test('顶层测试', async (t) => {
  // 如果删除下一行中的 'await'，则下面子测试中的 setTimeout() 将会导致
  // 它的存活时间超过其父测试。一旦父测试完成，它将取消任何未完成的子测试。
  await t.test('运行时间较长的子测试', async (t) => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 1000);
    });
  });
});
```

`timeout` 选项可用于在测试执行时间超过 `timeout` 毫秒时使其失败。但是，这不是
一种可靠的取消测试机制，因为正在运行的测试可能会阻塞应用程序线程，
从而阻止计划中的取消。

## `test.skip([name][, options][, fn])`

用于跳过测试的简写，
这与 [`test([name], { skip: true }[, fn])`][it options] 相同。

## `test.todo([name][, options][, fn])`

用于将测试标记为 `TODO` 的简写，
这与 [`test([name], { todo: true }[, fn])`][it options] 相同。

## `test.only([name][, options][, fn])`

用于将测试标记为 `only` 的简写，
这与 [`test([name], { only: true }[, fn])`][it options] 相同。

## `describe([name][, options][, fn])`

[`suite()`][] 的别名。

`describe()` 函数从 `node:test` 模块导入。

## `describe.skip([name][, options][, fn])`

用于跳过套件的简写。这与
[`describe([name], { skip: true }[, fn])`][describe options] 相同。

## `describe.todo([name][, options][, fn])`

用于将套件标记为 `TODO` 的简写。这与
[`describe([name], { todo: true }[, fn])`][describe options] 相同。

## `describe.only([name][, options][, fn])`

<!-- YAML
added:
  - v19.8.0
  - v18.15.0
-->

用于将套件标记为 `only` 的简写。这与
[`describe([name], { only: true }[, fn])`][describe options] 相同。

## `it([name][, options][, fn])`

<!-- YAML
added:
  - v18.6.0
  - v16.17.0
changes:
  - version:
    - v19.8.0
    - v18.16.0
    pr-url: https://github.com/nodejs/node/pull/46889
    description: "调用 `it()` 现在等同于调用 `test()`。"
-->

[`test()`][] 的别名。

`it()` 函数从 `node:test` 模块导入。

## `it.skip([name][, options][, fn])`

用于跳过测试的简写，
这与 [`it([name], { skip: true }[, fn])`][it options] 相同。

## `it.todo([name][, options][, fn])`

用于将测试标记为 `TODO` 的简写，
这与 [`it([name], { todo: true }[, fn])`][it options] 相同。

## `it.only([name][, options][, fn])`

<!-- YAML
added:
  - v19.8.0
  - v18.15.0
-->

用于将测试标记为 `only` 的简写，
这与 [`it([name], { only: true }[, fn])`][it options] 相同。

## `before([fn][, options])`

<!-- YAML
added:
  - v18.8.0
  - v16.18.0
-->

* `fn` {Function|AsyncFunction} 钩子函数。
  如果钩子使用回调，
  则回调函数作为第二个参数传入。**默认：** 无操作函数。
* `options` {Object} 钩子的配置项。支持以下属性：
  * `signal` {AbortSignal} 允许中止正在进行中的钩子。
  * `timeout` {number} 钩子在多少毫秒后失败。
    如果未指定，子测试会从其父级继承此值。
    **默认：** `Infinity`。

此函数创建一个在执行套件之前运行的钩子。

```js
describe('tests', async () => {
  before(() => console.log('即将运行一些测试'));
  it('is a subtest', () => {
    // 这里有一些相关断言
  });
});
```

## `after([fn][, options])`

<!-- YAML
added:
 - v18.8.0
 - v16.18.0
-->

* `fn` {Function|AsyncFunction} 钩子函数。
  如果钩子使用回调，
  则回调函数作为第二个参数传入。**默认：** 无操作函数。
* `options` {Object} 钩子的配置项。支持以下属性：
  * `signal` {AbortSignal} 允许中止正在进行中的钩子。
  * `timeout` {number} 钩子在多少毫秒后失败。
    如果未指定，子测试会从其父级继承此值。
    **默认：** `Infinity`。

此函数创建一个在执行套件之后运行的钩子。

```js
describe('tests', async () => {
  after(() => console.log('测试运行结束'));
  it('is a subtest', () => {
    // 这里有一些相关断言
  });
});
```

**注意：** `after` 钩子保证会运行，
即使套件内的测试失败也是如此。

## `beforeEach([fn][, options])`

<!-- YAML
added:
  - v18.8.0
  - v16.18.0
-->

* `fn` {Function|AsyncFunction} 钩子函数。
  如果钩子使用回调，
  则回调函数作为第二个参数传入。**默认：** 无操作函数。
* `options` {Object} 钩子的配置项。支持以下属性：
  * `signal` {AbortSignal} 允许中止正在进行中的钩子。
  * `timeout` {number} 钩子在多少毫秒后失败。
    如果未指定，子测试会从其父级继承此值。
    **默认：** `Infinity`。

此函数创建一个在当前套件中每个测试之前运行的钩子。

```js
describe('tests', async () => {
  beforeEach(() => console.log('即将运行一个测试'));
  it('is a subtest', () => {
    // 这里有一些相关断言
  });
});
```

## `afterEach([fn][, options])`

<!-- YAML
added:
  - v18.8.0
  - v16.18.0
-->

* `fn` {Function|AsyncFunction} 钩子函数。
  如果钩子使用回调，
  则回调函数作为第二个参数传入。**默认值：** 一个空操作函数。
* `options` {Object} 钩子的配置选项。支持以下属性：
  * `signal` {AbortSignal} 允许中止正在进行的钩子。
  * `timeout` {number} 钩子失败前的毫秒数。
    如果未指定，子测试会从其父级继承此值。
    **默认值：** `Infinity`。

此函数创建一个在当前测试套件中每个测试之后运行的钩子。
即使测试失败，`afterEach()` 钩子也会运行。

```js
describe('tests', async () => {
  afterEach(() => console.log('测试运行完成'));
  it('是一个子测试', () => {
    // 相关断言写在这里
  });
});
```

## `assert`

<!-- YAML
added:
  - v23.7.0
  - v22.14.0
-->

一个对象，其方法用于配置当前进程中 `TestContext` 对象可用的断言。默认情况下，`node:assert` 中的方法和快照测试函数可用。

可以通过将通用配置代码放入通过 `--require` 或 `--import` 预加载的模块中，将相同的配置应用于所有文件。

### `assert.register(name, fn)`

<!-- YAML
added:
  - v23.7.0
  - v22.14.0
-->

使用给定的名称和函数定义一个新的断言函数。如果同名断言已存在，则会被替换。

## `snapshot`

<!-- YAML
added: v22.3.0
-->

一个对象，其方法用于配置当前进程中的默认快照设置。可以通过将通用配置代码放入通过 `--require` 或 `--import` 预加载的模块中，将相同的配置应用于所有文件。

### `snapshot.setDefaultSnapshotSerializers(serializers)`

<!-- YAML
added: v22.3.0
-->

* `serializers` {Array} 作为快照测试默认序列化器使用的同步函数数组。

此函数用于自定义测试运行器使用的默认序列化机制。默认情况下，测试运行器通过对提供的值调用 `JSON.stringify(value, null, 2)` 来序列化值。`JSON.stringify()` 在循环结构和支持的数据类型方面确实存在限制。如果需要更强大的序列化机制，应使用此函数。

### `snapshot.setResolveSnapshotPath(fn)`

<!-- YAML
added: v22.3.0
-->

* `fn` {Function} 用于计算快照文件位置的函数。
  此函数接收测试文件的路径作为唯一参数。如果测试未关联文件，例如在 REPL 中，则输入为 undefined。`fn()` 必须返回一个指定快照文件位置的字符串。

此函数用于自定义快照测试所使用的快照文件位置。默认情况下，快照文件的名称与入口文件相同，扩展名为 `.snapshot`。

## Class: `MockFunctionContext`

<!-- YAML
added:
  - v19.1.0
  - v18.13.0
-->

`MockFunctionContext` 类用于检查或操纵通过 [`MockTracker`][] API 创建的 mock 的行为。

### `ctx.calls`

<!-- YAML
added:
  - v19.1.0
  - v18.13.0
-->

* Type: {Array}

一个 getter，返回用于跟踪对 mock 调用的内部数组副本。数组中的每个条目都是一个具有以下属性的对象。

* `arguments` {Array} 传递给 mock 函数的参数数组。
* `error` {any} 如果被 mock 的函数抛出了错误，则此属性包含抛出的值。**默认值：** `undefined`。
* `result` {any} 被 mock 函数返回的值。
* `stack` {Error} 一个 `Error` 对象，其堆栈可用于确定被 mock 函数调用的调用站点。
* `target` {Function|undefined} 如果被 mock 的函数是构造函数，则此字段包含正在构造的类。否则，它将是
  `undefined`。
* `this` {any} 被 mock 函数的 `this` 值。

### `ctx.callCount()`

<!-- YAML
added:
  - v19.1.0
  - v18.13.0
-->

* 返回：{integer} 此 mock 被调用的次数。

此函数返回此 mock 被调用的次数。此函数比检查 `ctx.calls.length` 更高效，因为 `ctx.calls` 是一个会创建内部调用跟踪数组副本的 getter。

### `ctx.mockImplementation(implementation)`

<!-- YAML
added:
  - v19.1.0
  - v18.13.0
-->

* `implementation` {Function|AsyncFunction} 用作 mock 新实现的函数。

此函数用于更改现有 mock 的行为。

以下示例使用 `t.mock.fn()` 创建一个 mock 函数，调用该 mock 函数，然后将 mock 实现更改为另一个函数。

```js
test('更改 mock 行为', (t) => {
  let cnt = 0;

  function addOne() {
    cnt++;
    return cnt;
  }

  function addTwo() {
    cnt += 2;
    return cnt;
  }

  const fn = t.mock.fn(addOne);

  assert.strictEqual(fn(), 1);
  fn.mock.mockImplementation(addTwo);
  assert.strictEqual(fn(), 3);
  assert.strictEqual(fn(), 5);
});
```

### `ctx.mockImplementationOnce(implementation[, onCall])`

<!-- YAML
added:
  - v19.1.0
  - v18.13.0
-->

* `implementation` {Function|AsyncFunction} 用作由 `onCall` 指定的调用编号的 mock 实现的函数。
* `onCall` {integer} 将使用 `implementation` 的调用编号。如果
  指定的调用已经发生，则抛出异常。
  **默认值：** 下一次调用的编号。

此函数用于仅更改现有 mock 单次调用的行为。一旦 `onCall` 指定的调用发生，mock 将恢复为如果未调用 `mockImplementationOnce()` 时本应具有的行为。

以下示例使用 `t.mock.fn()` 创建一个 mock 函数，调用该 mock 函数，将下一次调用的 mock 实现更改为另一个函数，然后恢复其之前的行为。

```js
test('只更改一次 mock 行为', (t) => {
  let cnt = 0;

  function addOne() {
    cnt++;
    return cnt;
  }

  function addTwo() {
    cnt += 2;
    return cnt;
  }

  const fn = t.mock.fn(addOne);

  assert.strictEqual(fn(), 1);
  fn.mock.mockImplementationOnce(addTwo);
  assert.strictEqual(fn(), 3);
  assert.strictEqual(fn(), 4);
});
```

### `ctx.resetCalls()`

<!-- YAML
added:
  - v19.3.0
  - v18.13.0
-->

重置 mock 函数的调用历史。

### `ctx.restore()`

<!-- YAML
added:
  - v19.1.0
  - v18.13.0
-->

将 mock 函数实现重置为其原始行为。调用此函数后仍可继续使用 mock。

## 类：`MockModuleContext`

<!-- YAML
added:
  - v22.3.0
  - v20.18.0
-->

> 稳定性：1.0 - 早期开发阶段

`MockModuleContext` 类用于操纵通过 [`MockTracker`][] API 创建的模块 mock 的行为。

### `ctx.restore()`

<!-- YAML
added:
  - v22.3.0
  - v20.18.0
-->

重置被 mock 的模块实现。

## 类：`MockPropertyContext`

<!-- YAML
added:
  - v24.3.0
  - v22.20.0
-->

`MockPropertyContext` 类用于检查或操纵通过 [`MockTracker`][] API 创建的属性 mock 的行为。

### `ctx.accesses`

* 类型：{Array}

一个 getter，返回用于跟踪被 mock 属性访问（get/set）的内部数组副本。数组中的每一项都是一个具有以下属性的对象：

* `type` {string} `'get'` 或 `'set'`，表示访问类型。
* `value` {any} 读取（对于 `'get'`）或写入（对于 `'set'`）的值。
* `stack` {Error} 一个 `Error` 对象，其堆栈可用于确定被 mock 函数的调用位置。

### `ctx.accessCount()`

* 返回：{integer} 属性被访问的次数（读取或写入）。

此函数返回属性被访问的次数。
此函数比检查 `ctx.accesses.length` 更高效，因为
`ctx.accesses` 是一个 getter，它会创建内部访问跟踪数组的副本。

### `ctx.mockImplementation(value)`

* `value` {any} 要设置为被 mock 属性值的新值。

此函数用于更改被 mock 属性 getter 返回的值。

### `ctx.mockImplementationOnce(value[, onAccess])`

* `value` {any} 用作 `onAccess` 指定调用编号的 mock 实现的值。
* `onAccess` {integer} 将使用 `value` 的调用编号。如果
  指定的调用已经发生，则会抛出异常。
  **默认：** 下一次调用的编号。

此函数用于更改单次现有 mock 的行为。一旦发生 `onAccess` 调用，mock 将恢复为在未调用 `mockImplementationOnce()` 时本应使用的行为。

下面的示例使用 `t.mock.property()` 创建一个 mock 函数，调用该被 mock 属性，将下一次调用的 mock 实现更改为不同的值，然后恢复其先前行为。

```js
test('更改一次 mock 行为', (t) => {
  const obj = { foo: 1 };

  const prop = t.mock.property(obj, 'foo', 5);

  assert.strictEqual(obj.foo, 5);
  prop.mock.mockImplementationOnce(25);
  assert.strictEqual(obj.foo, 25);
  assert.strictEqual(obj.foo, 5);
});
```

#### 注意

为了与其余 mocking API 保持一致，此函数将属性的 get 和 set 都视为访问。如果在相同的访问索引处发生属性 set，那么“once”值会被 set 操作消费，并且被 mock 的属性值将被更改为“once”值。如果你打算仅将“once”值用于 get 操作，这可能会导致意外行为。

### `ctx.resetAccesses()`

重置被 mock 属性的访问历史。

### `ctx.restore()`

将被 mock 属性实现重置为其原始行为。调用此函数后，mock 仍然可以继续使用。

## 类：`MockTracker`

<!-- YAML
added:
  - v19.1.0
  - v18.13.0
-->

`MockTracker` 类用于管理 mock 功能。test runner 模块提供一个顶层的 `mock` 导出，它是一个 `MockTracker` 实例。
每个测试也都有自己的 `MockTracker` 实例，可通过测试上下文的 `mock` 属性访问。

### `mock.fn([original[, implementation]][, options])`

<!-- YAML
added:
  - v19.1.0
  - v18.13.0
-->

* `original` {Function|AsyncFunction} 可选函数，用于在其基础上创建 mock。
  **默认：** 一个空操作函数。
* `implementation` {Function|AsyncFunction} 可选函数，用作 `original` 的 mock 实现。这对于创建在指定次数内按一种方式运行，然后恢复为 `original` 行为的 mock 很有用。**默认：** 由 `original` 指定的函数。
* `options` {Object} mock 函数的可选配置项。支持以下属性：
  * `times` {integer} mock 将使用 `implementation` 行为的次数。一旦 mock 函数被调用 `times` 次，它将自动恢复为 `original` 的行为。该值必须是正整数。**默认：** `Infinity`。
* 返回：{Proxy} 被 mock 的函数。被 mock 的函数包含一个特殊的 `mock` 属性，它是 [`MockFunctionContext`][] 的一个实例，可用于检查和更改被 mock 函数的行为。

此函数用于创建 mock 函数。

下面的示例创建了一个在每次调用时都会递增计数器的 mock 函数。`times` 选项用于修改 mock 行为，使前两次调用每次将计数器增加 2 而不是 1。

```js
test('模拟一个计数函数', (t) => {
  let cnt = 0;

  function addOne() {
    cnt++;
    return cnt;
  }

  function addTwo() {
    cnt += 2;
    return cnt;
  }

  const fn = t.mock.fn(addOne, addTwo, { times: 2 });

  assert.strictEqual(fn(), 2);
  assert.strictEqual(fn(), 4);
  assert.strictEqual(fn(), 5);
  assert.strictEqual(fn(), 6);
});
```

### `mock.getter(object, methodName[, implementation][, options])`

<!-- YAML
added:
  - v19.3.0
  - v18.13.0
-->

此函数是 [`MockTracker.method`][] 的语法糖，其中 `options.getter`
被设为 `true`。

### `mock.method(object, methodName[, implementation][, options])`

<!-- YAML
added:
  - v19.1.0
  - v18.13.0
-->

* `object` {Object} 要对其方法进行 mock 的对象。
* `methodName` {string|symbol} `object` 上要 mock 的方法标识符。
  如果 `object[methodName]` 不是函数，则会抛出错误。
* `implementation` {Function|AsyncFunction} 可选函数，用作
  `object[methodName]` 的 mock 实现。**默认：** `object[methodName]` 指定的原始方法。
* `options` {Object} mock 方法的可选配置项。支持以下属性：
  * `getter` {boolean} 如果为 `true`，`object[methodName]` 将被视为 getter。
    此选项不能与 `setter` 选项同时使用。**默认：** false。
  * `setter` {boolean} 如果为 `true`，`object[methodName]` 将被视为 setter。
    此选项不能与 `getter` 选项同时使用。**默认：** false。
  * `times` {integer} mock 将使用 `implementation` 行为的次数。一旦被 mock 的方法被调用 `times` 次，它将自动恢复为原始行为。该值必须是正整数。**默认：** `Infinity`。
* 返回：{Proxy} 被 mock 的方法。被 mock 的方法包含一个特殊的
  `mock` 属性，它是 [`MockFunctionContext`][] 的一个实例，可用于检查和更改被 mock 方法的行为。

此函数用于在现有对象方法上创建 mock。下面的
示例演示如何在现有对象方法上创建 mock。

```js
test('监听一个对象方法', (t) => {
  const number = {
    value: 5,
    subtract(a) {
      return this.value - a;
    },
  };

  t.mock.method(number, 'subtract');
  assert.strictEqual(number.subtract.mock.callCount(), 0);
  assert.strictEqual(number.subtract(3), 2);
  assert.strictEqual(number.subtract.mock.callCount(), 1);

  const call = number.subtract.mock.calls[0];

  assert.deepStrictEqual(call.arguments, [3]);
  assert.strictEqual(call.result, 2);
  assert.strictEqual(call.error, undefined);
  assert.strictEqual(call.target, undefined);
  assert.strictEqual(call.this, number);
});
```

### `mock.module(specifier[, options])`

<!-- YAML
added:
  - v22.3.0
  - v20.18.0
changes:
  - version:
    - v24.0.0
    - v22.17.0
    pr-url: https://github.com/nodejs/node/pull/58007
    description: 支持 JSON 模块。
-->

> 稳定性：1.0 - 早期开发阶段

* `specifier` {string|URL} 标识要 mock 的模块的字符串。
* `options` {Object} mock 模块的可选配置项。支持以下属性：
  * `cache` {boolean} 如果为 `false`，每次调用 `require()` 或 `import()` 都会生成一个新的 mocked 模块。如果为 `true`，后续调用将返回相同的模块 mock，并且该 mock 模块将被插入 CommonJS 缓存。
    **默认：** false。
  * `exports` {Object} 可选的 mock 导出。如果提供了 `default` 属性，它将被用作 mock 模块的默认导出。其他所有自有可枚举属性都作为具名导出使用。
    **此选项不能与 `defaultExport` 或 `namedExports` 一起使用。**
    * 如果 mock 是 CommonJS 或内置模块，则 `exports.default` 用作 `module.exports` 的值。
    * 如果对 CommonJS 或内置模块的 mock 未提供 `exports.default`，则 `module.exports` 默认为空对象。
    * 如果提供了具名导出且默认导出不是对象，那么当作为 CommonJS 或内置模块使用时，mock 将抛出异常。
  * `defaultExport` {any} 可选值，用作 mock 模块的默认
    导出。如果未提供该值，ESM mock 不包含默认导出。如果 mock 是 CommonJS 或内置模块，则此设置将用作 `module.exports` 的值。如果未提供该值，CJS 和内置
    mock 将使用空对象作为 `module.exports` 的值。
    **此选项不能与 `options.exports` 一起使用。**
    此选项已弃用，并将在未来版本中移除。
    请改用 `options.exports.default`。
  * `namedExports` {Object} 可选对象，其键和值用于
    为 mock 模块创建具名导出。如果 mock 是 CommonJS 或
    内置模块，这些值会被复制到 `module.exports` 上。因此，如果
    mock 是通过具名导出和非对象默认导出创建的，
    当作为 CJS 或内置模块使用时，mock 将抛出异常。
    **此选项不能与 `options.exports` 一起使用。**
    此选项已弃用，并将在未来版本中移除。
    请改用 `options.exports`。
* 返回：{MockModuleContext} 可用于操纵该 mock 的对象。

此函数用于 mock ECMAScript 模块、CommonJS 模块、JSON 模块和
Node.js 内置模块的导出。在 mock 之前对原始模块的任何引用都不会受到影响。要
启用模块 mock，Node.js 必须使用 [`--experimental-test-module-mocks`][] 命令行标志运行。

**注意**：[module customization hooks][] 通过 **同步** API 注册时会影响传递给 `mock.module` 的 `specifier` 的解析。
通过 **异步** API 注册的 customization hooks 当前会被忽略（因为 test runner 的 loader 是同步的，并且 Node 不支持 multi-chain/cross-chain loaders）。

下面的示例演示如何为模块创建 mock。

```js
test('模拟内置模块在两种模块系统中的行为', async (t) => {
  // 为 'node:readline' 创建一个 mock，并带有一个名为 'foo' 的具名导出，
  // 该导出在原始 'node:readline' 模块中不存在。
  const mock = t.mock.module('node:readline', {
    exports: { foo: () => 42 },
  });

  let esmImpl = await import('node:readline');
  let cjsImpl = require('node:readline');

  // cursorTo() 是原始 'node:readline' 模块的一个导出。
  assert.strictEqual(esmImpl.cursorTo, undefined);
  assert.strictEqual(cjsImpl.cursorTo, undefined);
  assert.strictEqual(esmImpl.fn(), 42);
  assert.strictEqual(cjsImpl.fn(), 42);

  mock.restore();

  // mock 已恢复，因此我们会拿回原始内置模块。
  esmImpl = await import('node:readline');
  cjsImpl = require('node:readline');

  assert.strictEqual(typeof esmImpl.cursorTo, 'function');
  assert.strictEqual(typeof cjsImpl.cursorTo, 'function');
  assert.strictEqual(esmImpl.fn, undefined);
  assert.strictEqual(cjsImpl.fn, undefined);
});
```

### `mock.property(object, propertyName[, value])`

<!-- YAML
added:
  - v24.3.0
  - v22.20.0
-->

* `object` {Object} 要对其值进行 mock 的对象。
* `propertyName` {string|symbol} `object` 上要 mock 的属性标识符。
* `value` {any} 可选值，用作 `object[propertyName]` 的 mock 值。
  **默认：** 原始属性值。
* 返回：{Proxy} 被 mock 对象的代理。被 mock 对象包含一个
  特殊的 `mock` 属性，它是 [`MockPropertyContext`][] 的一个实例，并且
  可用于检查和更改被 mock 属性的行为。

在对象上的某个属性值创建 mock。这使你可以跟踪并控制对特定属性的访问，
包括它被读取（getter）或写入（setter）的次数，并在 mock 后恢复原始值。

```js
test('模拟一个属性值', (t) => {
  const obj = { foo: 42 };
  const prop = t.mock.property(obj, 'foo', 100);

  assert.strictEqual(obj.foo, 100);
  assert.strictEqual(prop.mock.accessCount(), 1);
  assert.strictEqual(prop.mock.accesses[0].type, 'get');
  assert.strictEqual(prop.mock.accesses[0].value, 100);

  obj.foo = 200;
  assert.strictEqual(prop.mock.accessCount(), 2);
  assert.strictEqual(prop.mock.accesses[1].type, 'set');
  assert.strictEqual(prop.mock.accesses[1].value, 200);

  prop.mock.restore();
  assert.strictEqual(obj.foo, 42);
});
```

### `mock.reset()`

<!-- YAML
added:
  - v19.1.0
  - v18.13.0
-->

此函数会恢复此前由此 `MockTracker` 创建的所有 mock 的默认行为，并将这些 mock 与
`MockTracker` 实例解除关联。一旦解除关联，这些 mock 仍然可以使用，但
`MockTracker` 实例将无法再重置它们的行为或
以其他方式与它们交互。

每个测试完成后，都会在测试上下文的 `MockTracker` 上调用此函数。如果大量使用全局 `MockTracker`，建议手动调用此函数。

### `mock.restoreAll()`

<!-- YAML
added:
  - v19.1.0
  - v18.13.0
-->

此函数会恢复此前由此 `MockTracker` 创建的所有 mock 的默认行为。与 `mock.reset()` 不同，`mock.restoreAll()` 不会
将这些 mock 与 `MockTracker` 实例解除关联。

### `mock.setter(object, methodName[, implementation][, options])`

<!-- YAML
added:
  - v19.3.0
  - v18.13.0
-->

此函数是 [`MockTracker.method`][] 的语法糖，其中 `options.setter`
被设为 `true`。

## 类：`MockTimers`

<!-- YAML
added:
  - v20.4.0
  - v18.19.0
changes:
  - version: v23.1.0
    pr-url: https://github.com/nodejs/node/pull/55398
    description: Mock timers are now stable.
-->

Mock timers 是软件测试中常用的一种技术，用于模拟和控制定时器（例如 `setInterval` 和 `setTimeout`）的行为，而无需实际等待指定的时间间隔。

MockTimers 也可以模拟 `Date` 对象。

[`MockTracker`][] 提供一个顶层的 `timers` 导出，它是一个 `MockTimers` 实例。

### `timers.enable([enableOptions])`

<!-- YAML
added:
  - v20.4.0
  - v18.19.0
changes:
  - version:
    - v21.2.0
    - v20.11.0
    pr-url: https://github.com/nodejs/node/pull/48638
    description: "Updated parameters to an options object that contains available APIs and a default initial epoch."
-->

为指定的定时器启用定时器模拟。

* `enableOptions` {Object} 可选配置项，用于启用定时器模拟。支持以下属性：
  * `apis` {Array} 一个可选数组，包含要模拟的定时器。
    当前支持的定时器值有 `'setInterval'`、`'setTimeout'`、`'setImmediate'`
    和 `'Date'`。**默认值：** `['setInterval', 'setTimeout', 'setImmediate', 'Date']`。
    如果未提供数组，则默认模拟所有与时间相关的 API（`'setInterval'`、`'clearInterval'`、
    `'setTimeout'`、`'clearTimeout'`、`'setImmediate'`、`'clearImmediate'` 和
    `'Date'`）。
  * `now` {number | Date} 一个可选的数字或 Date 对象，表示用于 `Date.now()` 值的初始时间（以毫秒为单位）。**默认值：** `0`。

**注意：** 当你为某个特定定时器启用模拟时，其关联的清除函数也会被隐式模拟。

**注意：** 模拟 `Date` 会影响 mock timers 的行为，因为它们使用的是同一个内部时钟。

不设置初始时间的使用示例：

```mjs
import { mock } from 'node:test';
mock.timers.enable({ apis: ['setInterval'] });
```

```cjs
const { mock } = require('node:test');
mock.timers.enable({ apis: ['setInterval'] });
```

上面的示例启用了对 `setInterval` 定时器的模拟，并隐式模拟了 `clearInterval` 函数。来自 [node:timers](./timers.md)、
[node:timers/promises](./timers.md#timers-promises-api) 和
`globalThis` 的 `setInterval` 与 `clearInterval` 函数都会被模拟。

设置初始时间的使用示例

```mjs
import { mock } from 'node:test';
mock.timers.enable({ apis: ['Date'], now: 1000 });
```

```cjs
const { mock } = require('node:test');
mock.timers.enable({ apis: ['Date'], now: 1000 });
```

将初始 Date 对象设置为时间的使用示例

```mjs
import { mock } from 'node:test';
mock.timers.enable({ apis: ['Date'], now: new Date() });
```

```cjs
const { mock } = require('node:test');
mock.timers.enable({ apis: ['Date'], now: new Date() });
```

或者，如果你不带参数调用 `mock.timers.enable()`：

所有定时器（`'setInterval'`、`'clearInterval'`、`'setTimeout'`、`'clearTimeout'`、
`'setImmediate'` 和 `'clearImmediate'`）都会被模拟。来自 `node:timers`、`node:timers/promises` 和
`globalThis` 的 `setInterval`、`clearInterval`、`setTimeout`、`clearTimeout`、`setImmediate` 和
`clearImmediate` 函数都会被模拟。全局 `Date` 对象也会被模拟。

### `timers.reset()`

<!-- YAML
added:
  - v20.4.0
  - v18.19.0
-->

此函数会恢复此前由该 `MockTimers` 实例创建的所有 mock 的默认行为，并解除这些 mock 与 `MockTracker` 实例之间的关联。

**注意：** 每个测试完成后，都会在测试上下文的 `MockTracker` 上调用此函数。

```mjs
import { mock } from 'node:test';
mock.timers.reset();
```

```cjs
const { mock } = require('node:test');
mock.timers.reset();
```

### `timers[Symbol.dispose]()`

调用 `timers.reset()`。

### `timers.tick([milliseconds])`

<!-- YAML
added:
  - v20.4.0
  - v18.19.0
-->

推进所有已模拟定时器的时间。

* `milliseconds` {number} 要推进的时间量，单位为毫秒。**默认值：** `1`。

**注意：** 这与 Node.js 中 `setTimeout` 的行为不同，后者只接受正数。在 Node.js 中，带负数的 `setTimeout` 仅出于 Web 兼容性原因而被支持。

下面的示例会模拟一个 `setTimeout` 函数，
并通过使用 `.tick` 推进时间来触发所有待处理的定时器。

```mjs
import assert from 'node:assert';
import { test } from 'node:test';

test('mocks setTimeout to be executed synchronously without having to actually wait for it', (context) => {
  const fn = context.mock.fn();

  context.mock.timers.enable({ apis: ['setTimeout'] });

  setTimeout(fn, 9999);

  assert.strictEqual(fn.mock.callCount(), 0);

  // 推进时间
  context.mock.timers.tick(9999);

  assert.strictEqual(fn.mock.callCount(), 1);
});
```

```cjs
const assert = require('node:assert');
const { test } = require('node:test');

test('mocks setTimeout to be executed synchronously without having to actually wait for it', (context) => {
  const fn = context.mock.fn();
  context.mock.timers.enable({ apis: ['setTimeout'] });

  setTimeout(fn, 9999);
  assert.strictEqual(fn.mock.callCount(), 0);

  // 推进时间
  context.mock.timers.tick(9999);

  assert.strictEqual(fn.mock.callCount(), 1);
});
```

另外，`.tick` 可以多次调用

```mjs
import assert from 'node:assert';
import { test } from 'node:test';

test('mocks setTimeout to be executed synchronously without having to actually wait for it', (context) => {
  const fn = context.mock.fn();
  context.mock.timers.enable({ apis: ['setTimeout'] });
  const nineSecs = 9000;
  setTimeout(fn, nineSecs);

  const threeSeconds = 3000;
  context.mock.timers.tick(threeSeconds);
  context.mock.timers.tick(threeSeconds);
  context.mock.timers.tick(threeSeconds);

  assert.strictEqual(fn.mock.callCount(), 1);
});
```

```cjs
const assert = require('node:assert');
const { test } = require('node:test');

test('mocks setTimeout to be executed synchronously without having to actually wait for it', (context) => {
  const fn = context.mock.fn();
  context.mock.timers.enable({ apis: ['setTimeout'] });
  const nineSecs = 9000;
  setTimeout(fn, nineSecs);

  const threeSeconds = 3000;
  context.mock.timers.tick(threeSeconds);
  context.mock.timers.tick(threeSeconds);
  context.mock.timers.tick(threeSeconds);

  assert.strictEqual(fn.mock.callCount(), 1);
});
```

如果在启用模拟时也将 `Date` 设置为被模拟，那么使用 `.tick` 推进时间时，也会推进之后创建的任何 `Date` 对象的时间。

```mjs
import assert from 'node:assert';
import { test } from 'node:test';

test('mocks setTimeout to be executed synchronously without having to actually wait for it', (context) => {
  const fn = context.mock.fn();

  context.mock.timers.enable({ apis: ['setTimeout', 'Date'] });
  setTimeout(fn, 9999);

  assert.strictEqual(fn.mock.callCount(), 0);
  assert.strictEqual(Date.now(), 0);

  // 推进时间
  context.mock.timers.tick(9999);
  assert.strictEqual(fn.mock.callCount(), 1);
  assert.strictEqual(Date.now(), 9999);
});
```

```cjs
const assert = require('node:assert');
const { test } = require('node:test');

test('mocks setTimeout to be executed synchronously without having to actually wait for it', (context) => {
  const fn = context.mock.fn();
  context.mock.timers.enable({ apis: ['setTimeout', 'Date'] });

  setTimeout(fn, 9999);
  assert.strictEqual(fn.mock.callCount(), 0);
  assert.strictEqual(Date.now(), 0);

  // 推进时间
  context.mock.timers.tick(9999);
  assert.strictEqual(fn.mock.callCount(), 1);
  assert.strictEqual(Date.now(), 9999);
});
```

#### 使用清除函数

如前所述，来自定时器的所有清除函数（`clearTimeout`、`clearInterval` 和
`clearImmediate`）都会被隐式模拟。请看下面使用 `setTimeout` 的示例：

```mjs
import assert from 'node:assert';
import { test } from 'node:test';

test('mocks setTimeout to be executed synchronously without having to actually wait for it', (context) => {
  const fn = context.mock.fn();

  // 可选地选择要模拟的内容
  context.mock.timers.enable({ apis: ['setTimeout'] });
  const id = setTimeout(fn, 9999);

  // 也会被隐式模拟
  clearTimeout(id);
  context.mock.timers.tick(9999);

  // 因为那个 setTimeout 已被清除，所以 mock 函数永远不会被调用
  assert.strictEqual(fn.mock.callCount(), 0);
});
```

```cjs
const assert = require('node:assert');
const { test } = require('node:test');

test('mocks setTimeout to be executed synchronously without having to actually wait for it', (context) => {
  const fn = context.mock.fn();

  // 可选地选择要模拟的内容
  context.mock.timers.enable({ apis: ['setTimeout'] });
  const id = setTimeout(fn, 9999);

  // 也会被隐式模拟
  clearTimeout(id);
  context.mock.timers.tick(9999);

  // 因为那个 setTimeout 已被清除，所以 mock 函数永远不会被调用
  assert.strictEqual(fn.mock.callCount(), 0);
});
```

#### 使用 Node.js 定时器模块

一旦启用了定时器模拟，[node:timers](./timers.md)、
[node:timers/promises](./timers.md#timers-promises-api) 模块，
以及 Node.js 全局上下文中的定时器都会被启用：

**注意：** 该 API 目前不支持类似
`import { setTimeout } from 'node:timers'` 这样的解构导入函数。

```mjs
import assert from 'node:assert';
import { test } from 'node:test';
import nodeTimers from 'node:timers';
import nodeTimersPromises from 'node:timers/promises';

test('mocks setTimeout to be executed synchronously without having to actually wait for it', async (context) => {
  const globalTimeoutObjectSpy = context.mock.fn();
  const nodeTimerSpy = context.mock.fn();
  const nodeTimerPromiseSpy = context.mock.fn();

  // 可选地选择要模拟的内容
  context.mock.timers.enable({ apis: ['setTimeout'] });
  setTimeout(globalTimeoutObjectSpy, 9999);
  nodeTimers.setTimeout(nodeTimerSpy, 9999);

  const promise = nodeTimersPromises.setTimeout(9999).then(nodeTimerPromiseSpy);

  // 推进时间
  context.mock.timers.tick(9999);
  assert.strictEqual(globalTimeoutObjectSpy.mock.callCount(), 1);
  assert.strictEqual(nodeTimerSpy.mock.callCount(), 1);
  await promise;
  assert.strictEqual(nodeTimerPromiseSpy.mock.callCount(), 1);
});
```

```cjs
const assert = require('node:assert');
const { test } = require('node:test');
const nodeTimers = require('node:timers');
const nodeTimersPromises = require('node:timers/promises');

test('mocks setTimeout to be executed synchronously without having to actually wait for it', async (context) => {
  const globalTimeoutObjectSpy = context.mock.fn();
  const nodeTimerSpy = context.mock.fn();
  const nodeTimerPromiseSpy = context.mock.fn();

  // 可选地选择要模拟的内容
  context.mock.timers.enable({ apis: ['setTimeout'] });
  setTimeout(globalTimeoutObjectSpy, 9999);
  nodeTimers.setTimeout(nodeTimerSpy, 9999);

  const promise = nodeTimersPromises.setTimeout(9999).then(nodeTimerPromiseSpy);

  // 推进时间
  context.mock.timers.tick(9999);
  assert.strictEqual(globalTimeoutObjectSpy.mock.callCount(), 1);
  assert.strictEqual(nodeTimerSpy.mock.callCount(), 1);
  await promise;
  assert.strictEqual(nodeTimerPromiseSpy.mock.callCount(), 1);
});
```

在 Node.js 中，[node:timers/promises](./timers.md#timers-promises-api) 中的 `setInterval`
是一个 `AsyncGenerator`，此 API 也支持它：

```mjs
import assert from 'node:assert';
import { test } from 'node:test';
import nodeTimersPromises from 'node:timers/promises';
test('should tick five times testing a real use case', async (context) => {
  context.mock.timers.enable({ apis: ['setInterval'] });

  const expectedIterations = 3;
  const interval = 1000;
  const startedAt = Date.now();
  async function run() {
    const times = [];
    for await (const time of nodeTimersPromises.setInterval(interval, startedAt)) {
      times.push(time);
      if (times.length === expectedIterations) break;
    }
    return times;
  }

  const r = run();
  context.mock.timers.tick(interval);
  context.mock.timers.tick(interval);
  context.mock.timers.tick(interval);

  const timeResults = await r;
  assert.strictEqual(timeResults.length, expectedIterations);
  for (let it = 1; it < expectedIterations; it++) {
    assert.strictEqual(timeResults[it - 1], startedAt + (interval * it));
  }
});
```

```cjs
const assert = require('node:assert');
const { test } = require('node:test');
const nodeTimersPromises = require('node:timers/promises');
test('should tick five times testing a real use case', async (context) => {
  context.mock.timers.enable({ apis: ['setInterval'] });

  const expectedIterations = 3;
  const interval = 1000;
  const startedAt = Date.now();
  async function run() {
    const times = [];
    for await (const time of nodeTimersPromises.setInterval(interval, startedAt)) {
      times.push(time);
      if (times.length === expectedIterations) break;
    }
    return times;
  }

  const r = run();
  context.mock.timers.tick(interval);
  context.mock.timers.tick(interval);
  context.mock.timers.tick(interval);

  const timeResults = await r;
  assert.strictEqual(timeResults.length, expectedIterations);
  for (let it = 1; it < expectedIterations; it++) {
    assert.strictEqual(timeResults[it - 1], startedAt + (interval * it));
  }
});
```

### `timers.runAll()`

<!-- YAML
added:
  - v20.4.0
  - v18.19.0
-->

立即触发所有待处理的 mock 定时器。如果 `Date` 对象也被模拟，它还会将 `Date` 对象推进到最远的定时器时间。

下面的示例会立即触发所有待处理的定时器，
从而使它们无需延迟即可执行。

```mjs
import assert from 'node:assert';
import { test } from 'node:test';

test('runAll functions following the given order', (context) => {
  context.mock.timers.enable({ apis: ['setTimeout', 'Date'] });
  const results = [];
  setTimeout(() => results.push(1), 9999);

  // 请注意，如果两个定时器具有相同的超时时间，
  // 其执行顺序是有保证的
  setTimeout(() => results.push(3), 8888);
  setTimeout(() => results.push(2), 8888);

  assert.deepStrictEqual(results, []);

  context.mock.timers.runAll();
  assert.deepStrictEqual(results, [3, 2, 1]);
  // Date 对象也会被推进到最远的定时器时间
  assert.strictEqual(Date.now(), 9999);
});
```

```cjs
const assert = require('node:assert');
const { test } = require('node:test');

test('runAll functions following the given order', (context) => {
  context.mock.timers.enable({ apis: ['setTimeout', 'Date'] });
  const results = [];
  setTimeout(() => results.push(1), 9999);

  // 请注意，如果两个定时器具有相同的超时时间，
  // 其执行顺序是有保证的
  setTimeout(() => results.push(3), 8888);
  setTimeout(() => results.push(2), 8888);

  assert.deepStrictEqual(results, []);

  context.mock.timers.runAll();
  assert.deepStrictEqual(results, [3, 2, 1]);
  // Date 对象也会被推进到最远的定时器时间
  assert.strictEqual(Date.now(), 9999);
});
```

**注意：** `runAll()` 函数专门用于在定时器模拟上下文中触发定时器。
它对真实系统时钟或模拟环境之外的实际定时器没有任何影响。

### `timers.setTime(milliseconds)`

<!-- YAML
added:
  - v21.2.0
  - v20.11.0
-->

设置当前 Unix 时间戳，它将作为任何被模拟的 `Date` 对象的参考时间。

```mjs
import assert from 'node:assert';
import { test } from 'node:test';

test('runAll functions following the given order', (context) => {
  const now = Date.now();
  const setTime = 1000;
  // Date.now 未被模拟
  assert.deepStrictEqual(Date.now(), now);

  context.mock.timers.enable({ apis: ['Date'] });
  context.mock.timers.setTime(setTime);
  // Date.now 现在是 1000
  assert.strictEqual(Date.now(), setTime);
});
```

```cjs
const assert = require('node:assert');
const { test } = require('node:test');

test('setTime replaces current time', (context) => {
  const now = Date.now();
  const setTime = 1000;
  // Date.now 未被模拟
  assert.deepStrictEqual(Date.now(), now);

  context.mock.timers.enable({ apis: ['Date'] });
  context.mock.timers.setTime(setTime);
  // Date.now 现在是 1000
  assert.strictEqual(Date.now(), setTime);
});
```

#### Date 与定时器协同工作

Date 和定时器对象是相互依赖的。如果你使用 `setTime()` 将当前时间传递给一个被模拟的 `Date` 对象，那么使用 `setTimeout` 和 `setInterval` 设置的定时器将**不会**受到影响。

但是，`tick` 方法**会**推进被模拟的 `Date` 对象。

```mjs
import assert from 'node:assert';
import { test } from 'node:test';

test('runAll functions following the given order', (context) => {
  context.mock.timers.enable({ apis: ['setTimeout', 'Date'] });
  const results = [];
  setTimeout(() => results.push(1), 9999);

  assert.deepStrictEqual(results, []);
  context.mock.timers.setTime(12000);
  assert.deepStrictEqual(results, []);
  // Date 已推进，但定时器并未移动
  assert.strictEqual(Date.now(), 12000);
});
```

```cjs
const assert = require('node:assert');
const { test } = require('node:test');

test('runAll functions following the given order', (context) => {
  context.mock.timers.enable({ apis: ['setTimeout', 'Date'] });
  const results = [];
  setTimeout(() => results.push(1), 9999);

  assert.deepStrictEqual(results, []);
  context.mock.timers.setTime(12000);
  assert.deepStrictEqual(results, []);
  // Date 已推进，但定时器并未移动
  assert.strictEqual(Date.now(), 12000);
});
```

## 类：`TestsStream`

<!-- YAML
added:
  - v18.9.0
  - v16.19.0
changes:
  - version: v26.3.0
    pr-url: https://github.com/nodejs/node/pull/63435
    description: 为携带 `testId` 的测试事件添加了 `parentId`。
  - version:
    - v20.0.0
    - v19.9.0
    - v18.17.0
    pr-url: https://github.com/nodejs/node/pull/47094
    description: "当测试为套件时，为 test:pass 和 test:fail 事件添加了类型。"
-->

* 继承自 {Readable}

成功调用 [`run()`][] 方法将返回一个新的 {TestsStream} 对象，流式传输一系列代表测试执行的事件。
`TestsStream` 将按测试定义的顺序发出事件。

某些事件保证按测试定义的顺序发出，而其他事件则按测试执行的顺序发出。

### 事件：`'test:coverage'`

* `data` {Object}
  * `summary` {Object} 一个包含覆盖率报告的对象。
    * `files` {Array} 一个包含各个文件覆盖率报告的数组。每个报告都是一个具有以下架构的对象：
      * `path` {string} 文件的绝对路径。
      * `totalLineCount` {number} 总行数。
      * `totalBranchCount` {number} 总分支数。
      * `totalFunctionCount` {number} 总函数数。
      * `coveredLineCount` {number} 已覆盖的行数。
      * `coveredBranchCount` {number} 已覆盖的分支数。
      * `coveredFunctionCount` {number} 已覆盖的函数数。
      * `coveredLinePercent` {number} 已覆盖行的百分比。
      * `coveredBranchPercent` {number} 已覆盖分支的百分比。
      * `coveredFunctionPercent` {number} 已覆盖函数的百分比。
      * `functions` {Array} 一个代表函数覆盖率的函数数组。
        * `name` {string} 函数名称。
        * `line` {number} 函数定义所在的行号。
        * `count` {number} 函数被调用的次数。
      * `branches` {Array} 一个代表分支覆盖率的分支数组。
        * `line` {number} 分支定义所在的行号。
        * `count` {number} 分支被采用的次数。
      * `lines` {Array} 一个代表行号及其被覆盖次数的行数组。
        * `line` {number} 行号。
        * `count` {number} 该行被覆盖的次数。
    * `thresholds` {Object} 一个包含每种覆盖率类型是否达到阈值的对象。
      * `function` {number} 函数覆盖率阈值。
      * `branch` {number} 分支覆盖率阈值。
      * `line` {number} 行覆盖率阈值。
    * `totals` {Object} 一个包含所有文件覆盖率摘要的对象。
      * `totalLineCount` {number} 总行数。
      * `totalBranchCount` {number} 总分支数。
      * `totalFunctionCount` {number} 总函数数。
      * `coveredLineCount` {number} 已覆盖的行数。
      * `coveredBranchCount` {number} 已覆盖的分支数。
      * `coveredFunctionCount` {number} 已覆盖的函数数。
      * `coveredLinePercent` {number} 已覆盖行的百分比。
      * `coveredBranchPercent` {number} 已覆盖分支的百分比。
      * `coveredFunctionPercent` {number} 已覆盖函数的百分比。
    * `workingDirectory` {string} 开始代码覆盖率时的工作目录。如果测试更改了 Node.js 进程的工作目录，这对于显示相对路径名很有用。
  * `nesting` {number} 测试的嵌套级别。

当启用代码覆盖率且所有测试完成后发出。

### 事件：`'test:complete'`

* `data` {Object}
  * `column` {number|undefined} 测试定义所在的列号，如果测试是通过 REPL 运行的，则为 `undefined`。
  * `details` {Object} 额外的执行元数据。
    * `passed` {boolean} 测试是否通过。
    * `duration_ms` {number} 测试持续时间，单位为毫秒。
    * `error` {Error|undefined} 对测试抛出的错误进行包装的错误，
      如果测试未通过，则会有此值。
      * `cause` {Error} 测试实际抛出的错误。
    * `type` {string|undefined} 测试的类型，用于表示这是否为套件。
  * `file` {string|undefined} 测试文件的路径，
    如果测试是通过 REPL 运行的，则为 `undefined`。
  * `line` {number|undefined} 测试定义所在的行号，或者
    如果测试是通过 REPL 运行的，则为 `undefined`。
  * `name` {string} 测试名称。
  * `nesting` {number} 测试的嵌套级别。
  * `parentId` {number|undefined} 封闭测试的 `testId`，或者
    对于顶层测试则为 `undefined`。当同一嵌套级别的并发兄弟测试交错执行时，
    让自定义报告器能够跟踪谱系。
  * `tags` {string\[]} 在测试及其祖先套件上声明的、展平并小写化后的标签，
    按声明顺序排列。未标记测试为空。
    参见 [Test tags][]。
  * `testId` {number} 此测试实例的数字标识符，在测试文件的进程内唯一。
    对同一测试实例的所有事件保持一致，从而使自定义报告器能够可靠地进行关联。
  * `testNumber` {number} 测试的序号。
  * `todo` {string|boolean|undefined} 当调用 [`context.todo`][] 时存在
  * `skip` {string|boolean|undefined} 当调用 [`context.skip`][] 时存在

当测试完成执行时发出。
此事件的发出顺序与测试定义的顺序不一致。
对应的声明顺序事件是 `'test:pass'` 和 `'test:fail'`。

### 事件：`'test:dequeue'`

* `data` {Object}
  * `column` {number|undefined} 测试定义所在的列号，如果测试是通过 REPL 运行的，则为 `undefined`。
  * `file` {string|undefined} 测试文件的路径，
    如果测试是通过 REPL 运行的，则为 `undefined`。
  * `line` {number|undefined} 测试定义所在的行号，或者
    如果测试是通过 REPL 运行的，则为 `undefined`。
  * `name` {string} 测试名称。
  * `nesting` {number} 测试的嵌套级别。
  * `parentId` {number|undefined} 封闭测试的 `testId`，或者
    对于顶层测试则为 `undefined`。当同一嵌套级别的并发兄弟测试交错执行时，
    让自定义报告器能够跟踪谱系。
  * `tags` {string\[]} 在测试及其祖先套件上声明的、展平并小写化后的标签，
    按声明顺序排列。未标记测试为空。
    参见 [Test tags][]。
  * `testId` {number} 此测试实例的数字标识符，在测试文件的进程内唯一。
    对同一测试实例的所有事件保持一致，从而使自定义报告器能够可靠地进行关联。
  * `type` {string} 测试类型。可以是 `'suite'` 或 `'test'`。

当测试出队时发出，就在执行之前。
此事件不保证按测试定义的顺序发出。对应的声明顺序事件是 `'test:start'`。

### 事件：`'test:diagnostic'`

* `data` {Object}
  * `column` {number|undefined} 测试定义所在的列号，如果测试是通过 REPL 运行的，则为 `undefined`。
  * `file` {string|undefined} 测试文件的路径，如果测试是通过 REPL 运行的，则为 `undefined`。
  * `line` {number|undefined} 测试定义所在的行号，如果测试是通过 REPL 运行的，则为 `undefined`。
  * `message` {string} 诊断消息。
  * `nesting` {number} 测试的嵌套级别。
  * `level` {string} 诊断消息的严重级别。
    可能的值有：
    * `'info'`：信息性消息。
    * `'warn'`：警告。
    * `'error'`：错误。

当调用 [`context.diagnostic`][] 时发出。
此事件保证按测试定义的顺序发出。

### 事件：`'test:enqueue'`

* `data` {Object}
  * `column` {number|undefined} 测试定义所在的列号，如果测试是通过 REPL 运行的，则为 `undefined`。
  * `file` {string|undefined} 测试文件的路径，
    如果测试是通过 REPL 运行的，则为 `undefined`。
  * `line` {number|undefined} 测试定义所在的行号，或者
    如果测试是通过 REPL 运行的，则为 `undefined`。
  * `name` {string} 测试名称。
  * `nesting` {number} 测试的嵌套级别。
  * `parentId` {number|undefined} 封闭测试的 `testId`，或者
    对于顶层测试则为 `undefined`。当同一嵌套级别的并发兄弟测试交错执行时，
    让自定义报告器能够跟踪谱系。
  * `tags` {string\[]} 在测试及其祖先套件上声明的、展平并小写化后的标签，
    按声明顺序排列。未标记测试为空。
    参见 [Test tags][]。
  * `testId` {number} 此测试实例的数字标识符，在测试文件的进程内唯一。
    对同一测试实例的所有事件保持一致，从而使自定义报告器能够可靠地进行关联。
  * `type` {string} 测试类型。可以是 `'suite'` 或 `'test'`。

当测试入队等待执行时发出。

### 事件：`'test:fail'`

* `data` {Object}
  * `column` {number|undefined} 测试定义所在的列号，如果测试是通过 REPL 运行的，则为 `undefined`。
  * `details` {Object} 额外的执行元数据。
    * `duration_ms` {number} 测试持续时间，单位为毫秒。
    * `error` {Error} 对测试抛出的错误进行包装的错误。
      * `cause` {Error} 测试实际抛出的错误。
    * `type` {string|undefined} 测试的类型，用于表示这是否为套件。
    * `attempt` {number|undefined} 测试运行的尝试次数，
      仅在使用 [`--test-rerun-failures`][] 标志时存在。
  * `file` {string|undefined} 测试文件的路径，
    如果测试是通过 REPL 运行的，则为 `undefined`。
  * `line` {number|undefined} 测试定义所在的行号，或者
    如果测试是通过 REPL 运行的，则为 `undefined`。
  * `name` {string} 测试名称。
  * `nesting` {number} 测试的嵌套级别。
  * `parentId` {number|undefined} 封闭测试的 `testId`，或者
    对于顶层测试则为 `undefined`。当同一嵌套级别的并发兄弟测试交错执行时，
    让自定义报告器能够跟踪谱系。
  * `tags` {string\[]} 在测试及其祖先套件上声明的、展平并小写化后的标签，
    按声明顺序排列。未标记测试为空。
    参见 [Test tags][]。
  * `testId` {number} 此测试实例的数字标识符，在测试文件的进程内唯一。
    对同一测试实例的所有事件保持一致，从而使自定义报告器能够可靠地进行关联。
  * `testNumber` {number} 测试的序号。
  * `todo` {string|boolean|undefined} 当调用 [`context.todo`][] 时存在
  * `skip` {string|boolean|undefined} 当调用 [`context.skip`][] 时存在

当测试失败时发出。
此事件保证按测试定义的顺序发出。
对应的执行顺序事件是 `'test:complete'`。

### 事件：`'test:interrupted'`

<!-- YAML
added:
 - v25.7.0
 - v24.15.0
-->

* `data` {Object}
  * `tests` {Array} 一个包含有关被中断测试信息的对象数组。
    * `column` {number|undefined} 测试定义所在的列号，如果测试是通过 REPL 运行的，则为 `undefined`。
    * `file` {string|undefined} 测试文件的路径，如果测试是通过 REPL 运行的，则为 `undefined`。
    * `line` {number|undefined} 测试定义所在的行号，如果测试是通过 REPL 运行的，则为 `undefined`。
    * `name` {string} 测试名称。
    * `nesting` {number} 测试的嵌套级别。

当测试运行器被 `SIGINT` 信号中断时发出（例如，按下 <kbd>Ctrl</kbd>+<kbd>C</kbd> 时）。该事件包含有关中断时正在运行的测试的信息。

当使用进程隔离（默认）时，测试名称将是文件路径，因为父运行器只知道文件级别的测试。当使用 `--test-isolation=none` 时，将显示实际的测试名称。

### 事件：`'test:pass'`

* `data` {Object}
  * `column` {number|undefined} 测试定义所在的列号，如果测试是通过 REPL 运行的，则为 `undefined`。
  * `details` {Object} 额外的执行元数据。
    * `duration_ms` {number} 测试持续时间，单位为毫秒。
    * `type` {string|undefined} 测试的类型，用于表示这是否为套件。
    * `attempt` {number|undefined} 测试运行的尝试次数，
      仅在使用 [`--test-rerun-failures`][] 标志时存在。
    * `passed_on_attempt` {number|undefined} 测试通过时所处的尝试次数，
      仅在使用 [`--test-rerun-failures`][] 标志时存在。
  * `file` {string|undefined} 测试文件的路径，
    如果测试是通过 REPL 运行的，则为 `undefined`。
  * `line` {number|undefined} 测试定义所在的行号，或者
    如果测试是通过 REPL 运行的，则为 `undefined`。
  * `name` {string} 测试名称。
  * `nesting` {number} 测试的嵌套级别。
  * `parentId` {number|undefined} 封闭测试的 `testId`，或者
    对于顶层测试则为 `undefined`。当同一嵌套级别的并发兄弟测试交错执行时，
    让自定义报告器能够跟踪谱系。
  * `tags` {string\[]} 在测试及其祖先套件上声明的、展平并小写化后的标签，
    按声明顺序排列。未标记测试为空。
    参见 [Test tags][]。
  * `testId` {number} 此测试实例的数字标识符，在测试文件的进程内唯一。
    对同一测试实例的所有事件保持一致，从而使自定义报告器能够可靠地进行关联。
  * `testNumber` {number} 测试的序号。
  * `todo` {string|boolean|undefined} 当调用 [`context.todo`][] 时存在
  * `skip` {string|boolean|undefined} 当调用 [`context.skip`][] 时存在

当测试通过时发出。
此事件保证按测试定义的顺序发出。
对应的执行顺序事件是 `'test:complete'`。

### 事件：`'test:plan'`

* `data` {Object}
  * `column` {number|undefined} 测试定义所在的列号，如果测试是通过 REPL 运行的，则为 `undefined`。
  * `file` {string|undefined} 测试文件的路径，如果测试是通过 REPL 运行的，则为 `undefined`。
  * `line` {number|undefined} 测试定义所在的行号，如果测试是通过 REPL 运行的，则为 `undefined`。
  * `nesting` {number} 测试的嵌套级别。
  * `count` {number} 已运行的子测试数量。

当给定测试的所有子测试完成后发出。
此事件保证按测试定义的顺序发出。

### 事件：`'test:start'`

* `data` {Object}
  * `column` {number|undefined} 测试定义所在的列号，如果测试是通过 REPL 运行的，则为 `undefined`。
  * `file` {string|undefined} 测试文件的路径，
    如果测试是通过 REPL 运行的，则为 `undefined`。
  * `line` {number|undefined} 测试定义所在的行号，或者
    如果测试是通过 REPL 运行的，则为 `undefined`。
  * `name` {string} 测试名称。
  * `nesting` {number} 测试的嵌套级别。
  * `parentId` {number|undefined} 封闭测试的 `testId`，或者
    对于顶层测试则为 `undefined`。当同一嵌套级别的并发兄弟测试交错执行时，
    让自定义报告器能够跟踪谱系。
  * `tags` {string\[]} 在测试及其祖先套件上声明的、展平并小写化后的标签，
    按声明顺序排列。未标记测试为空。
    参见 [Test tags][]。
  * `testId` {number} 此测试实例的数字标识符，在测试文件的进程内唯一。
    对同一测试实例的所有事件保持一致，从而使自定义报告器能够可靠地进行关联。

当测试开始报告自身及其子测试的状态时发出。
此事件保证按测试定义的顺序发出。
对应的执行顺序事件是 `'test:dequeue'`。

### 事件：`'test:stderr'`

* `data` {Object}
  * `file` {string} 测试文件的路径。
  * `message` {string} 写入 `stderr` 的消息。

当运行中的测试写入 `stderr` 时发出。
仅当传递了 `--test` 标志时才会发出此事件。
此事件不保证按测试定义的顺序发出。

### 事件：`'test:stdout'`

* `data` {Object}
  * `file` {string} 测试文件的路径。
  * `message` {string} 写入 `stdout` 的消息。

当运行中的测试写入 `stdout` 时发出。
仅当传递了 `--test` 标志时才会发出此事件。
此事件不保证按测试定义的顺序发出。

### 事件：`'test:summary'`

* `data` {Object}
  * `counts` {Object} 一个包含各种测试结果计数的对象。
    * `cancelled` {number} 已取消测试的总数。
    * `failed` {number} 失败测试的总数。
    * `passed` {number} 通过测试的总数。
    * `skipped` {number} 跳过测试的总数。
    * `suites` {number} 运行的套件总数。
    * `tests` {number} 运行的测试总数，不包括套件。
    * `todo` {number} TODO 测试的总数。
    * `topLevel` {number} 顶层测试和套件的总数。
  * `duration_ms` {number} 测试运行持续时间（毫秒）。
  * `file` {string|undefined} 生成摘要的测试文件路径。如果摘要对应多个文件，则此值为 `undefined`。
  * `success` {boolean} 指示测试运行是否被视为成功。如果发生任何错误条件，例如测试失败或未达到覆盖率阈值，此值将设置为 `false`。

当测试运行完成时发出。此事件包含与完成的测试运行相关的指标，有助于确定测试运行是通过还是失败。如果使用进程级测试隔离，除了最终的累计摘要外，还会为每个测试文件生成一个 `'test:summary'` 事件。

### 事件：`'test:watch:drained'`

当监视模式下没有更多测试排队等待执行时发出。

### 事件：`'test:watch:restarted'`

当监视模式下由于文件更改而重新启动一个或多个测试时发出。

## `getTestContext()`

<!-- YAML
added: v26.1.0
-->

* 返回值：{TestContext|SuiteContext|undefined}

返回与当前正在执行的测试或套件关联的 [`TestContext`][] 或 [`SuiteContext`][] 对象，如果在测试或套件之外调用，则返回 `undefined`。此函数可用于从测试或套件函数内部或其中的任何异步操作中访问上下文信息。

```mjs
import { getTestContext } from 'node:test';

test('示例测试', async () => {
  const ctx = getTestContext();
  console.log(`正在运行测试：${ctx.name}`);
});

describe('示例套件', () => {
  const ctx = getTestContext();
  console.log(`正在运行套件：${ctx.name}`);
});
```

当从测试中调用时，返回 [`TestContext`][]。
当从套件中调用时，返回 [`SuiteContext`][]。

如果在测试或套件之外调用（例如，在模块的顶层或在执行完成后的 setTimeout 回调中），此函数返回 `undefined`。

当从钩子（before、beforeEach、after、afterEach）内部调用时，此函数返回与该钩子关联的测试或套件的上下文。

## 测试埋点与 OpenTelemetry

<!-- YAML
added:
 - v26.1.0
 - v24.16.0
-->

测试运行器通过 Node.js
[`diagnostics_channel`][] 模块发布测试执行事件，使集成与 OpenTelemetry 等可观测性工具成为可能，而无需对测试运行器本身进行更改。

### 跟踪事件

测试运行器发布事件到 `'node.test'` 跟踪通道。订阅者
可以使用 [`TracingChannel`][] API 来绑定上下文或执行自定义跟踪。

#### 通道：`'tracing:node.test:start'`

* `data` {Object}
  * `name` {string} 测试的名称。
  * `nesting` {number} 测试的嵌套级别。
  * `file` {string|undefined} 测试文件的路径，或在 REPL 中运行时为 `undefined`。
  * `type` {string} 测试类型。`'test'` 或 `'suite'`。

当测试或套件开始执行时发出。测试的范围包括其所有 before、beforeEach 和 afterEach 钩子以及测试主体。

#### 通道：`'tracing:node.test:end'`

* `data` {Object}
  * `name` {string} 测试的名称。
  * `nesting` {number} 测试的嵌套级别。
  * `file` {string|undefined} 测试文件的路径，或在 REPL 中运行时为 `undefined`。
  * `type` {string} 测试类型。`'test'` 或 `'suite'`。

当测试或套件完成执行时发出。

#### 通道：`'tracing:node.test:error'`

* `data` {Object}
  * `name` {string} 测试的名称。
  * `nesting` {number} 测试的嵌套级别。
  * `file` {string|undefined} 测试文件的路径，或在 REPL 中运行时为 `undefined`。
  * `type` {string} 测试类型。`'test'` 或 `'suite'`。
  * `error` {Error} 抛出的错误。

当测试或套件抛出错误时发出。

### 使用 `bindStore()` 进行上下文传播

通过将 `AsyncLocalStorage` 实例绑定，测试跟踪通道可用于在测试执行期间传播上下文。这允许上下文在测试函数以及测试中的所有异步操作中自动可用。

```mjs
import dc from 'node:diagnostics_channel';
import { AsyncLocalStorage } from 'node:async_hooks';

const testStorage = new AsyncLocalStorage();
const testChannel = dc.tracingChannel('node.test');

// 将上下文绑定到测试执行 — 返回的值成为存储
testChannel.start.bindStore(testStorage, (data) => {
  return { testName: data.name, startTime: Date.now() };
});

// 可选地处理错误和清理
testChannel.error.subscribe((data) => {
  const store = testStorage.getStore();
  console.log(`测试 "${data.name}" 在 ${Date.now() - store.startTime}ms 后失败`);
});

testChannel.end.subscribe((data) => {
  const store = testStorage.getStore();
  console.log(`测试 "${data.name}" 在 ${Date.now() - store.startTime}ms 内完成`);
});
```

使用 `bindStore()` 时，将自动将提供的上下文传播到测试函数和测试中的所有异步操作，而无需在测试代码中进行任何其他检测。

## 类：`TestContext`

<!-- YAML
added:
  - v18.0.0
  - v16.17.0
changes:
  - version:
    - v20.1.0
    - v18.17.0
    pr-url: https://github.com/nodejs/node/pull/47586
    description: "`before` 函数已添加到 TestContext。"
-->

`TestContext` 的实例会传递给每个测试函数，以便与测试运行器交互。但是，`TestContext` 构造函数并未作为 API 的一部分暴露。

### `context.before([fn][, options])`

<!-- YAML
added:
  - v20.1.0
  - v18.17.0
-->

* `fn` {Function|AsyncFunction} 钩子函数。此函数的第一个参数是 [`TestContext`][] 对象。如果钩子使用回调，则回调函数作为第二个参数传递。**默认值：** 一个空操作函数。
* `options` {Object} 钩子的配置选项。支持以下属性：
  * `signal` {AbortSignal} 允许中止进行中的钩子。
  * `timeout` {number} 钩子将在多少毫秒后失败。如果未指定，子测试将从其父级继承此值。**默认值：** `Infinity`。

此函数用于创建一个钩子，在当前测试的子测试之前运行。

### `context.beforeEach([fn][, options])`

<!-- YAML
added:
  - v18.8.0
  - v16.18.0
-->

* `fn` {Function|AsyncFunction} 钩子函数。此函数的第一个参数是 [`TestContext`][] 对象。如果钩子使用回调，则回调函数作为第二个参数传递。**默认值：** 一个空操作函数。
* `options` {Object} 钩子的配置选项。支持以下属性：
  * `signal` {AbortSignal} 允许中止进行中的钩子。
  * `timeout` {number} 钩子将在多少毫秒后失败。如果未指定，子测试将从其父级继承此值。**默认值：** `Infinity`。

此函数用于创建一个钩子，在当前测试的每个子测试之前运行。

```js
test('顶级测试', async (t) => {
  t.beforeEach((t) => t.diagnostic(`即将运行 ${t.name}`));
  await t.test(
    '这是一个子测试',
    (t) => {
      // 此处进行相关的断言
    },
  );
});
```

### `context.after([fn][, options])`

<!-- YAML
added:
  - v19.3.0
  - v18.13.0
-->

* `fn` {Function|AsyncFunction} 钩子函数。此函数的第一个参数是 [`TestContext`][] 对象。如果钩子使用回调，则回调函数作为第二个参数传递。**默认值：** 一个空操作函数。
* `options` {Object} 钩子的配置选项。支持以下属性：
  * `signal` {AbortSignal} 允许中止进行中的钩子。
  * `timeout` {number} 钩子将在多少毫秒后失败。如果未指定，子测试将从其父级继承此值。**默认值：** `Infinity`。

此函数用于创建一个钩子，在当前测试完成后运行。

```js
test('顶级测试', (t) => {
  t.after((t) => t.diagnostic(`已完成运行 ${t.name}`));
  // 此处进行相关的断言
});
```

### `context.afterEach([fn][, options])`

<!-- YAML
added:
  - v18.8.0
  - v16.18.0
-->

* `fn` {Function|AsyncFunction} 钩子函数。此函数的第一个参数是 [`TestContext`][] 对象。如果钩子使用回调，则回调函数作为第二个参数传递。**默认值：** 一个空操作函数。
* `options` {Object} 钩子的配置选项。支持以下属性：
  * `signal` {AbortSignal} 允许中止进行中的钩子。
  * `timeout` {number} 钩子将在多少毫秒后失败。如果未指定，子测试将从其父级继承此值。**默认值：** `Infinity`。

此函数用于创建一个钩子，在当前测试的每个子测试之后运行。

```js
test('顶级测试', async (t) => {
  t.afterEach((t) => t.diagnostic(`已完成运行 ${t.name}`));
  await t.test(
    '这是一个子测试',
    (t) => {
      // 此处进行相关的断言
    },
  );
});
```

### `context.assert`

<!-- YAML
added:
  - v22.2.0
  - v20.15.0
-->

一个包含绑定到 `context` 的断言方法的对象。`node:assert` 模块中的顶层函数在此处暴露，用于创建测试计划。

```js
test('test', (t) => {
  t.plan(1);
  t.assert.strictEqual(true, true);
});
```

#### `context.assert.fileSnapshot(value, path[, options])`

<!-- YAML
added:
  - v23.7.0
  - v22.14.0
-->

* `value` {any} 要序列化为字符串的值。如果 Node.js 是使用 [`--test-update-snapshots`][] 标志启动的，则序列化的值将写入 `path`。否则，序列化的值将与现有快照文件的内容进行比较。
* `path` {string} 写入序列化 `value` 的文件。
* `options` {Object} 可选配置选项。支持以下属性：
  * `serializers` {Array} 用于将 `value` 序列化为字符串的同步函数数组。`value` 作为唯一参数传递给第一个序列化器函数。每个序列化器的返回值作为输入传递给下一个序列化器。一旦所有序列化器运行完毕，结果值将被强制转换为字符串。**默认值：** 如果未提供序列化器，则使用测试运行器的默认序列化器。

此函数将 `value` 序列化并将其写入由 `path` 指定的文件。

```js
test('使用默认序列化的快照测试', (t) => {
  t.assert.fileSnapshot({ value1: 1, value2: 2 }, './snapshots/snapshot.json');
});
```

此函数与 `context.assert.snapshot()` 的区别如下：

* 快照文件路径由用户显式提供。
* 每个快照文件仅限于单个快照值。
* 测试运行器不执行额外的转义。

这些差异使得快照文件能够更好地支持诸如语法高亮之类的功能。

#### `context.assert.snapshot(value[, options])`

<!-- YAML
added v22.3.0
-->

* `value` {any} 要序列化为字符串的值。如果 Node.js 是使用 [`--test-update-snapshots`][] 标志启动的，则序列化的值将写入快照文件。否则，序列化的值将与现有快照文件中的相应值进行比较。
* `options` {Object} 可选配置选项。支持以下属性：
  * `serializers` {Array} 用于将 `value` 序列化为字符串的同步函数数组。`value` 作为唯一参数传递给第一个序列化器函数。每个序列化器的返回值作为输入传递给下一个序列化器。一旦所有序列化器运行完毕，结果值将被强制转换为字符串。**默认值：** 如果未提供序列化器，则使用测试运行器的默认序列化器。

此函数实现快照测试的断言。

```js
test('使用默认序列化的快照测试', (t) => {
  t.assert.snapshot({ value1: 1, value2: 2 });
});

test('使用自定义序列化的快照测试', (t) => {
  t.assert.snapshot({ value3: 3, value4: 4 }, {
    serializers: [(value) => JSON.stringify(value)],
  });
});
```

### `context.diagnostic(message)`

<!-- YAML
added:
  - v18.0.0
  - v16.17.0
-->

* `message` {string} 要报告的消息。

此函数用于将诊断信息写入输出。任何诊断信息都包含在测试结果的末尾。此函数不返回值。

```js
test('顶级测试', (t) => {
  t.diagnostic('一条诊断消息');
});
```

### `context.filePath`

<!-- YAML
added:
  - v22.6.0
  - v20.16.0
-->

创建当前测试的测试文件的绝对路径。如果测试文件导入生成测试的其他模块，则导入的测试将返回根测试文件的路径。

### `context.fullName`

<!-- YAML
added:
  - v22.3.0
  - v20.16.0
-->

测试及其每个祖先的名称，由 `>` 分隔。

### `context.name`

<!-- YAML
added:
  - v18.8.0
  - v16.18.0
-->

测试的名称。

### `context.passed`

<!-- YAML
added:
  - v21.7.0
  - v20.12.0
-->

* 类型：{boolean} 在测试执行之前为 `false`，例如在 `beforeEach` 钩子中。

指示测试是否成功。

### `context.error`

<!-- YAML
added:
  - v21.7.0
  - v20.12.0
-->

* 类型：{Error|null}

测试/用例的失败原因；已包装并可通过 `context.error.cause` 访问。

### `context.attempt`

<!-- YAML
added: v25.0.0
-->

* 类型：{number}

测试的尝试次数。此值基于零，因此第一次尝试是 `0`，第二次尝试是 `1`，依此类推。此属性与 `--test-rerun-failures` 选项结合使用很有用，可确定测试当前正在运行哪次尝试。

### `context.tags`

<!-- YAML
added: v26.2.0
-->

> 稳定性：1.0 - 早期开发

* 类型：{string\[]}

测试扁平化后的小写标签数组，按声明顺序排列，包括从祖先套件继承的任何标签。若测试没有标签，则为空。参见 [Test tags][]。

### `context.workerId`

<!-- YAML
added:
 - v25.8.0
 - v24.15.0
-->

* 类型：{number|undefined}

运行当前测试文件的工作线程的唯一标识符。此值源自 `NODE_TEST_WORKER_ID` 环境变量。当使用 `--test-isolation=process`（默认值）运行测试时，每个测试文件在单独的子进程中运行，并被分配一个从 1 到 N 的工作线程 ID，其中 N 是并发工作线程的数量。当使用 `--test-isolation=none` 运行时，所有测试在同一进程中运行，工作线程 ID 始终为 1。当不在测试上下文中运行时，此值为 `undefined`。

此属性可用于在并发测试文件之间分割资源（如数据库连接或服务器端口）：

```mjs
import { test } from 'node:test';
import { process } from 'node:process';

test('数据库操作', async (t) => {
  // 可通过 context 获取 Worker ID
  console.log(`正在 worker ${t.workerId} 中运行`);

  // 或通过环境变量（在导入时可用）
  const workerId = process.env.NODE_TEST_WORKER_ID;
  // 使用 workerId 为每个 worker 分配独立的资源
});
```

### `context.plan(count[,options])`

<!-- YAML
added:
  - v22.2.0
  - v20.15.0
changes:
  - version:
    - v23.9.0
    - v22.15.0
    pr-url: https://github.com/nodejs/node/pull/56765
    description: "添加 `options` 参数。"
  - version:
    - v23.4.0
    - v22.13.0
    pr-url: https://github.com/nodejs/node/pull/55895
    description: 此函数不再是实验性功能。
-->

* `count` {number} 预期运行的断言和子测试的数量。
* `options` {Object} 计划的附加选项。
  * `wait` {boolean|number} 计划的等待时间：
    * 如果为 `true`，计划将无限期等待所有断言和子测试运行。
    * 如果为 `false`，计划将在测试函数完成后立即进行检查，而不等待任何挂起的断言或子测试。在此检查之后完成的任何断言或子测试都不会计入计划。
    * 如果为数字，则指定在等待预期断言和子测试匹配时的最大等待时间（毫秒）。如果达到超时，测试将失败。**默认值：** `false`。

此函数用于设置测试内预期运行的断言和子测试的数量。如果运行的断言和子测试数量与预期计数不匹配，测试将失败。

> 注意：为了确保断言被追踪，必须使用 `t.assert` 而不是直接使用 `assert`。

```js
test('顶级测试', (t) => {
  t.plan(2);
  t.assert.ok('some relevant assertion here');
  t.test('subtest', () => {});
});
```

当使用异步代码时，`plan` 函数可用于确保运行正确数量的断言：

```js
test('planning with streams', (t, done) => {
  function* generate() {
    yield 'a';
    yield 'b';
    yield 'c';
  }
  const expected = ['a', 'b', 'c'];
  t.plan(expected.length);
  const stream = Readable.from(generate());
  stream.on('data', (chunk) => {
    t.assert.strictEqual(chunk, expected.shift());
  });

  stream.on('end', () => {
    done();
  });
});
```

当使用 `wait` 选项时，你可以控制测试等待预期断言的时间。例如，设置最大等待时间可确保测试在指定的时间范围内等待异步断言完成：

```js
test('wait 为 2000 的计划会等待异步断言', (t) => {
  t.plan(1, { wait: 2000 }); // 最多等待 2 秒以便断言完成。

  const asyncActivity = () => {
    setTimeout(() => {
      t.assert.ok(true, '异步断言在等待时间内完成');
    }, 1000); // 在 1 秒后完成，在 2 秒的等待时间内。
  };

  asyncActivity(); // 测试将通过，因为断言及时完成。
});
```

注意：如果指定了 `wait` 超时，它仅在测试函数执行完成后才开始倒计时。

### `context.runOnly(shouldRunOnlyTests)`

<!-- YAML
added:
  - v18.0.0
  - v16.17.0
-->

* `shouldRunOnlyTests` {boolean} 是否仅运行 `only` 测试。

如果 `shouldRunOnlyTests` 为真值，则测试上下文将仅运行设置了 `only` 选项的测试。否则，将运行所有测试。如果 Node.js 未使用 [`--test-only`][] 命令行选项启动，则此函数为空操作。

```js
test('顶级测试', (t) => {
  // 测试上下文可设置为运行带有 'only' 选项的子测试。
  t.runOnly(true);
  return Promise.all([
    t.test('此子测试现在将被跳过'),
    t.test('此子测试将运行', { only: true }),
  ]);
});
```

### `context.signal`

<!-- YAML
added:
  - v18.7.0
  - v16.17.0
-->

* 类型：{AbortSignal}

当测试被中止时，可用于中止测试子任务。

```js
test('顶级测试', async (t) => {
  await fetch('some/uri', { signal: t.signal });
});
```

### `context.skip([message])`

<!-- YAML
added:
  - v18.0.0
  - v16.17.0
-->

* `message` {string} 可选的跳过消息。

此函数使测试的输出指示测试被跳过。如果提供了 `message`，则将其包含在输出中。调用 `skip()` 不会终止测试函数的执行。此函数不返回值。

```js
test('顶级测试', (t) => {
  // 如果测试包含额外逻辑，也请确保在此处返回。
  t.skip('此处被跳过');
});
```

### `context.todo([message])`

<!-- YAML
added:
  - v18.0.0
  - v16.17.0
-->

* `message` {string} 可选的 `TODO` 消息。

此函数向测试的输出添加 `TODO` 指令。如果提供了 `message`，则将其包含在输出中。调用 `todo()` 不会终止测试函数的执行。此函数不返回值。

```js
test('顶级测试', (t) => {
  // 此测试被标记为 `TODO`
  t.todo('这是一个待办事项');
});
```

### `context.test([name][, options][, fn])`

<!-- YAML
added:
  - v18.0.0
  - v16.17.0
changes:
  - version: v26.2.0
    pr-url: https://github.com/nodejs/node/pull/63221
    description: 添加了 `tags` 选项。
  - version:
    - v18.8.0
    - v16.18.0
    pr-url: https://github.com/nodejs/node/pull/43554
    description: "添加 `signal` 选项。"
  - version:
    - v18.7.0
    - v16.17.0
    pr-url: https://github.com/nodejs/node/pull/43505
    description: "添加 `timeout` 选项。"
-->

* `name` {string} 子测试的名称，在报告测试结果时显示。**默认值：** `fn` 的 `name` 属性，若 `fn` 没有名称，则为 `'<anonymous>'`。
* `options` {Object} 子测试的配置选项。支持以下属性：
  * `concurrency` {number|boolean|null} 如果提供数字，则会异步运行这么多个测试（它们仍由单线程事件循环管理）。
    如果为 `true`，则会并行运行所有子测试。
    如果为 `false`，则一次只运行一个测试。
    如果未指定，子测试将从其父级继承此值。
    **默认值：** `null`。
  * `only` {boolean} 如果为真值，并且测试上下文配置为运行 `only` 测试，则此测试将运行。否则，测试将被跳过。
    **默认值：** `false`。
  * `signal` {AbortSignal} 允许中止进行中的测试。
  * `skip` {boolean|string} 如果为真值，则测试被跳过。如果提供字符串，则该字符串会作为跳过该测试的原因显示在测试结果中。**默认值：** `false`。
  * `tags` {string\[]} 与子测试关联的字符串标签数组。
    与 [`--experimental-test-tag-filter`][] 一起使用，用于筛选要运行的测试。标签通过并集从父测试或套件继承。参见 [Test tags][]。**默认值：** `[]`。
  * `todo` {boolean|string} 如果为真值，则测试标记为 `TODO`。如果提供字符串，则该字符串会作为测试为何为 `TODO` 的原因显示在测试结果中。**默认值：** `false`。
  * `timeout` {number} 测试在多少毫秒后失败。
    如果未指定，子测试将从其父级继承此值。
    **默认值：** `Infinity`。
  * `plan` {number} 测试中预期运行的断言和子测试数量。
    如果测试中运行的断言数量与计划中指定的数量不匹配，测试将失败。
    **默认值：** `undefined`。
* `fn` {Function|AsyncFunction} 被测试的函数。此函数的第一个参数是一个 [`TestContext`][] 对象。如果测试使用回调，则回调函数作为第二个参数传递。**默认值：** 一个空操作函数。
* 返回值：{Promise} 在测试完成后解析为 `undefined`。

此函数用于在当前测试下创建子测试。此函数的行为与顶层 [`test()`][] 函数相同。

```js
test('顶级测试', async (t) => {
  await t.test(
    '这是一个子测试',
    { only: false, skip: false, concurrency: 1, todo: false, plan: 1 },
    (t) => {
      t.assert.ok('some relevant assertion here');
    },
  );
});
```

### `context.waitFor(condition[, options])`

<!-- YAML
added:
  - v23.7.0
  - v22.14.0
-->

* `condition` {Function|AsyncFunction} 一个断言函数，定期调用该函数，直到它成功完成或定义的轮询超时过去。成功完成定义为不抛出或不拒绝。此函数不接受任何参数，并允许返回任何值。
* `options` {Object} 轮询操作的可选配置对象。支持以下属性：
  * `interval` {number} 在 `condition` 调用 unsuccessful 后重试之前等待的毫秒数。**默认值：** `50`。
  * `timeout` {number} 轮询超时（毫秒）。如果在此时间过去之前 `condition` 尚未成功，则发生错误。**默认值：** `1000`。
* 返回值：{Promise} fulfilled 为 `condition` 返回的值。

此方法轮询 `condition` 函数，直到该函数成功返回或操作超时。

## 类：`SuiteContext`

<!-- YAML
added:
  - v18.7.0
  - v16.17.0
-->

`SuiteContext` 的实例会被传递给每个套件函数，以便与测试运行器交互。但是，`SuiteContext` 构造函数并未作为 API 的一部分公开。

### `context.filePath`

<!-- YAML
added: v22.6.0
-->

创建当前套件的测试文件的绝对路径。如果测试文件导入了生成套件的其他模块，导入的套件将返回根测试文件的路径。

### `context.fullName`

<!-- YAML
added:
  - v22.3.0
  - v20.16.0
-->

套件及其每个祖先的名称，由 `>` 分隔。

### `context.name`

<!-- YAML
added:
  - v18.8.0
  - v16.18.0
-->

套件的名称。

### `context.signal`

<!-- YAML
added:
  - v18.7.0
  - v16.17.0
-->

* 类型：{AbortSignal}

当测试被中止时，可用于中止测试子任务。

### `context.passed`

<!-- YAML
added:
 - v26.1.0
 - v24.16.0
-->

* 类型：{boolean}

指示套件及其所有子测试是否已通过。

### `context.attempt`

<!-- YAML
added:
 - v26.1.0
 - v24.16.0
-->

* 类型：{number}

套件的尝试次数。该值从零开始，因此第一次尝试是 `0`，第二次尝试是 `1`，依此类推。此属性与 `--test-rerun-failures` 选项结合使用很有用，可确定当前运行的尝试次数。

### `context.diagnostic(message)`

<!-- YAML
added:
 - v26.1.0
 - v24.16.0
-->

* `message` {string} 要输出的诊断消息。

输出诊断消息。这通常用于记录关于当前套件或其测试的信息。

```js
test.describe('my suite', (suite) => {
  suite.diagnostic('套件诊断消息');
});
```

[TAP]: https://testanything.org/
[Test tags]: #test-tags
[`--experimental-test-coverage`]: cli.md#--experimental-test-coverage
[`--experimental-test-module-mocks`]: cli.md#--experimental-test-module-mocks
[`--experimental-test-tag-filter`]: cli.md#--experimental-test-tag-filterexpr
[`--import`]: cli.md#--importmodule
[`--no-strip-types`]: cli.md#--no-strip-types
[`--test-concurrency`]: cli.md#--test-concurrency
[`--test-coverage-exclude`]: cli.md#--test-coverage-exclude
[`--test-coverage-include`]: cli.md#--test-coverage-include
[`--test-name-pattern`]: cli.md#--test-name-pattern
[`--test-only`]: cli.md#--test-only
[`--test-reporter-destination`]: cli.md#--test-reporter-destination
[`--test-reporter`]: cli.md#--test-reporter
[`--test-rerun-failures`]: cli.md#--test-rerun-failures
[`--test-skip-pattern`]: cli.md#--test-skip-pattern
[`--test-update-snapshots`]: cli.md#--test-update-snapshots
[`--test`]: cli.md#--test
[`MockFunctionContext`]: #class-mockfunctioncontext
[`MockPropertyContext`]: #class-mockpropertycontext
[`MockTimers`]: #class-mocktimers
[`MockTracker.method`]: #mockmethodobject-methodname-implementation-options
[`MockTracker`]: #class-mocktracker
[`NODE_V8_COVERAGE`]: cli.md#node_v8_coveragedir
[`SuiteContext`]: #class-suitecontext
[`TestContext`]: #class-testcontext
[`TracingChannel`]: diagnostics_channel.md#class-tracingchannel
[`assert.throws`]: assert.md#assertthrowsfn-error-message
[`context.diagnostic`]: #contextdiagnosticmessage
[`context.skip`]: #contextskipmessage
[`context.tags`]: #contexttags
[`context.todo`]: #contexttodomessage
[`describe()`]: #describename-options-fn
[`diagnostics_channel`]: diagnostics_channel.md
[`glob(7)`]: https://man7.org/linux/man-pages/man7/glob.7.html
[`it()`]: #itname-options-fn
[`run()`]: #runoptions
[`suite()`]: #suitename-options-fn
[`test()`]: #testname-options-fn
[代码覆盖率]: #collecting-code-coverage
[配置文件]: cli.md#--experimental-config-filepath---experimental-config-file
[describe 选项]: #describename-options-fn
[it 选项]: #testname-options-fn
[模块自定义钩子]: module.md#customization-hooks
[从命令行运行测试]: #running-tests-from-the-command-line
[stream.compose]: stream.md#streamcomposestreams
[子测试]: #subtests
[suite 选项]: #suitename-options-fn
[测试报告器]: #test-reporters
[测试运行器执行模型]: #test-runner-execution-model
