# util 模块

<!--introduced_in=v0.10.0-->

> 稳定性：2 - 稳定

<!-- source_link=lib/util.js -->

`node:util` 模块支持 Node.js 内部 API 的需求。许多工具函数对应用程序和模块开发者也很有用。要访问它：

```mjs
import util from 'node:util';
```

```cjs
const util = require('node:util');
```

## `util.callbackify(original)`

<!-- YAML
added: v8.2.0
-->

* `original` {Function} 一个 `async` 函数
* 返回值：{Function} 一个回调风格的函数

接受一个 `async` 函数（或返回一个 `Promise` 的函数），并返回一个遵循错误优先回调风格的函数，即接受一个 `(err, value) => ...` 回调作为最后一个参数。在回调中，第一个参数将是拒绝原因（如果 `Promise` 解析则为 `null`），第二个参数将是解析值。

```mjs
import { callbackify } from 'node:util';

async function fn() {
  return 'hello world';
}
const callbackFunction = callbackify(fn);

callbackFunction((err, ret) => {
  if (err) throw err;
  console.log(ret);
});
```

```cjs
const { callbackify } = require('node:util');

async function fn() {
  return 'hello world';
}
const callbackFunction = callbackify(fn);

callbackFunction((err, ret) => {
  if (err) throw err;
  console.log(ret);
});
```

将打印：

```text
hello world
```

回调是异步执行的，并且将具有有限的堆栈跟踪。如果回调抛出，进程将发出 [`'uncaughtException'`][] 事件，如果未处理则将退出。

由于 `null` 作为回调的第一个参数具有特殊含义，如果被包装的函数用一个假值作为原因拒绝了一个 `Promise`，则该值会被包装在一个 `Error` 中，原始值存储在一个名为 `reason` 的字段中。

```js
function fn() {
  return Promise.reject(null);
}
const callbackFunction = util.callbackify(fn);

callbackFunction((err, ret) => {
  // 当 Promise 被 `null` 拒绝时，它会被包装成一个 Error 并且
  // 原始值存储在 `reason` 中。
  err && Object.hasOwn(err, 'reason') && err.reason === null;  // true
});
```

## `util.convertProcessSignalToExitCode(signal)`

<!-- YAML
added:
 - v25.4.0
 - v24.14.0
-->

* `signal` {string} 信号名称（例如 `'SIGTERM'`）
* 返回值：{number} 对应于 `signal` 的退出码

`util.convertProcessSignalToExitCode()` 方法将信号名称转换为其对应的 POSIX 退出码。遵循 POSIX 标准，被信号终止的进程的退出码计算为 `128 + 信号编号`。

如果 `signal` 不是有效的信号名称，则将抛出错误。参见 [`signal(7)`][] 获取有效信号列表。

```mjs
import { convertProcessSignalToExitCode } from 'node:util';

console.log(convertProcessSignalToExitCode('SIGTERM')); // 143 (128 + 15)
console.log(convertProcessSignalToExitCode('SIGKILL')); // 137 (128 + 9)
```

```cjs
const { convertProcessSignalToExitCode } = require('node:util');

console.log(convertProcessSignalToExitCode('SIGTERM')); // 143 (128 + 15)
console.log(convertProcessSignalToExitCode('SIGKILL')); // 137 (128 + 9)
```

当处理进程以根据终止进程的信号确定退出码时，这特别有用。

## `util.debuglog(section[, callback])`

<!-- YAML
added: v0.11.3
-->

* `section` {string} 一个字符串，标识为其创建 `debuglog` 函数的应用程序部分。
* `callback` {Function} 一个回调，在日志函数第一次被调用时 invoked，带有一个函数参数，该参数是一个更优化的日志函数。
* 返回值：{Function} 日志函数

`util.debuglog()` 方法用于创建一个函数，该函数根据 `NODE_DEBUG` 环境变量的存在与否，有条件地将调试消息写入 `stderr`。如果 `section` 名称出现在该环境变量的值中，则返回的函数操作类似于 [`console.error()`][]。否则，返回的函数是无操作。

```mjs
import { debuglog } from 'node:util';
const log = debuglog('foo');

log('hello from foo [%d]', 123);
```

```cjs
const { debuglog } = require('node:util');
const log = debuglog('foo');

log('hello from foo [%d]', 123);
```

如果此程序运行时环境中带有 `NODE_DEBUG=foo`，则将输出类似以下内容：

```console
FOO 3245: hello from foo [123]
```

其中 `3245` 是进程 ID。如果未设置该环境变量运行，则不会打印任何内容。

`section` 也支持通配符：

```mjs
import { debuglog } from 'node:util';
const log = debuglog('foo-bar');

log('hi there, it\'s foo-bar [%d]', 2333);
```

```cjs
const { debuglog } = require('node:util');
const log = debuglog('foo-bar');

log('hi there, it\'s foo-bar [%d]', 2333);
```

如果运行时环境中带有 `NODE_DEBUG=foo*`，则将输出类似以下内容：

```console
FOO-BAR 3257: hi there, it's foo-bar [2333]
```

可以在 `NODE_DEBUG` 环境变量中指定多个逗号分隔的 `section` 名称：`NODE_DEBUG=fs,net,tls`。

可选的 `callback` 参数可用于将日志函数替换为不同的函数，该函数没有任何初始化或不必要的包装。

```mjs
import { debuglog } from 'node:util';
let log = debuglog('internals', (debug) => {
  // 替换为一个日志函数，优化掉
  // 测试 section 是否启用的过程
  log = debug;
});
```

```cjs
const { debuglog } = require('node:util');
let log = debuglog('internals', (debug) => {
  // 替换为一个日志函数，优化掉
  // 测试 section 是否启用的过程
  log = debug;
});
```

### `debuglog().enabled`

<!-- YAML
added: v14.9.0
-->

* 类型：{boolean}

`util.debuglog().enabled` getter 用于创建一个测试，该测试可用于基于 `NODE_DEBUG` 环境变量存在的条件判断。如果 `section` 名称出现在该环境变量的值中，则返回的值将为 `true`。否则，返回的值将为 `false`。

```mjs
import { debuglog } from 'node:util';
const enabled = debuglog('foo').enabled;
if (enabled) {
  console.log('hello from foo [%d]', 123);
}
```

```cjs
const { debuglog } = require('node:util');
const enabled = debuglog('foo').enabled;
if (enabled) {
  console.log('hello from foo [%d]', 123);
}
```

如果此程序运行时环境中带有 `NODE_DEBUG=foo`，则将输出类似以下内容：

```console
hello from foo [123]
```

## `util.debug(section)`

<!-- YAML
added: v14.9.0
-->

`util.debuglog` 的别名。用法允许在不暗示日志记录的情况下提高可读性，当仅使用 `util.debuglog().enabled` 时。

## `util.deprecate(fn, msg[, code[, options]])`

<!-- YAML
added: v0.8.0
changes:
  - version:
      - v25.2.0
      - v24.12.0
    pr-url: https://github.com/nodejs/node/pull/59982
    description: "Add options object with modifyPrototype to conditionallymodify the prototype of the deprecated object."
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/16393
    description: Deprecation warnings are only emitted once for each code.
-->

* `fn` {Function} 正在被弃用的函数。
* `msg` {string} 当调用弃用函数时显示的警告消息。
* `code` {string} 弃用代码。参见 [弃用 API 列表][] 获取代码列表。
* `options` {Object}
  * `modifyPrototype` {boolean} 为 false 时，在发出弃用警告时不更改对象的原型。
    **默认值：** `true`。
* 返回值：{Function} 被包装以发出警告的弃用函数。

`util.deprecate()` 方法包装 `fn`（可以是函数或类），使其被标记为已弃用。

```mjs
import { deprecate } from 'node:util';

export const obsoleteFunction = deprecate(() => {
  // 在这里做一些事情。
}, 'obsoleteFunction() is deprecated. Use newShinyFunction() instead.');
```

```cjs
const { deprecate } = require('node:util');

exports.obsoleteFunction = deprecate(() => {
  // 在这里做一些事情。
}, 'obsoleteFunction() is deprecated. Use newShinyFunction() instead.');
```

调用时，`util.deprecate()` 将返回一个函数，该函数将使用 [`'warning'`][] 事件发出 `DeprecationWarning`。警告将在返回的函数第一次被调用时发出并打印到 `stderr`。警告发出后，包装的函数被调用且不再发出警告。

如果在多次调用 `util.deprecate()` 时提供相同的可选 `code`，则该 `code` 的警告将只发出一次。

```mjs
import { deprecate } from 'node:util';

const fn1 = deprecate(
  () => 'a value',
  'deprecation message',
  'DEP0001',
);
const fn2 = deprecate(
  () => 'a  different value',
  'other dep message',
  'DEP0001',
);
fn1(); // 发出带有代码 DEP0001 的弃用警告
fn2(); // 不发出弃用警告，因为它具有相同的代码
```

```cjs
const { deprecate } = require('node:util');

const fn1 = deprecate(
  function() {
    return 'a value';
  },
  'deprecation message',
  'DEP0001',
);
const fn2 = deprecate(
  function() {
    return 'a  different value';
  },
  'other dep message',
  'DEP0001',
);
fn1(); // 发出带有代码 DEP0001 的弃用警告
fn2(); // 不发出弃用警告，因为它具有相同的代码
```

如果使用了 `--no-deprecation` 或 `--no-warnings` 命令行标志，或者如果 `process.noDeprecation` 属性在第一次弃用警告之前被设置为 `true`，则 `util.deprecate()` 方法什么都不做。

如果设置了 `--trace-deprecation` 或 `--trace-warnings` 命令行标志，或者 `process.traceDeprecation` 属性被设置为 `true`，则警告和堆栈跟踪将在弃用函数第一次被调用时打印到 `stderr`。

如果设置了 `--throw-deprecation` 命令行标志，或者 `process.throwDeprecation` 属性被设置为 `true`，那么当调用弃用函数时将抛出异常。

`--throw-deprecation` 命令行标志和 `process.throwDeprecation` 属性优先于 `--trace-deprecation` 和 `process.traceDeprecation`。

## `util.diff(actual, expected)`

<!-- YAML
added:
  - v23.11.0
  - v22.15.0
-->

> 稳定性：1 - 实验性

* `actual` {Array|string} 要比较的第一个值

* `expected` {Array|string} 要比较的第二个值

* 返回：{Array} 差异条目数组。每个条目是一个包含两个元素的数组：
  * `0` {number} 操作代码：`-1` 表示删除，`0` 表示无操作/未更改，`1` 表示插入
  * `1` {string} 与该操作关联的值

* 算法复杂度：O(N\*D)，其中：

* N 是两个序列的总长度 (N = actual.length + expected.length)

* D 是编辑距离（将一个序列转换为另一个序列所需的最少操作数）。

[`util.diff()`][] 比较两个字符串或数组值，并返回一个差异条目数组。
它使用 Myers 差异算法来计算最小差异，这与断言错误消息内部使用的算法相同。

如果值相等，则返回一个空数组。

```js
const { diff } = require('node:util');

// 比较字符串
const actualString = '12345678';
const expectedString = '12!!5!7!';
console.log(diff(actualString, expectedString));
// [
//   [0, '1'],
//   [0, '2'],
//   [1, '3'],
//   [1, '4'],
//   [-1, '!'],
//   [-1, '!'],
//   [0, '5'],
//   [1, '6'],
//   [-1, '!'],
//   [0, '7'],
//   [1, '8'],
//   [-1, '!'],
// ]
// 比较数组
const actualArray = ['1', '2', '3'];
const expectedArray = ['1', '3', '4'];
console.log(diff(actualArray, expectedArray));
// [
//   [0, '1'],
//   [1, '2'],
//   [0, '3'],
//   [-1, '4'],
// ]
// 相等的值返回空数组
console.log(diff('same', 'same'));
// []
```

## `util.format(format[, ...args])`

<!-- YAML
added: v0.5.3
changes:
  - version: v12.11.0
    pr-url: https://github.com/nodejs/node/pull/29606
    description: "现在 `%c` 说明符被忽略。"
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/23162
    description: "现在仅当 `format` 参数实际包含格式说明符时才将其视为格式字符串。"
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/23162
    description: "如果 `format` 参数不是格式字符串，则输出字符串的格式不再依赖于第一个参数的类型。此更改移除了以前当第一个参数不是字符串时输出字符串中存在的引号。"
  - version: v11.4.0
    pr-url: https://github.com/nodejs/node/pull/23708
    description: "`%d`、`%f` 和 `%i` 说明符现在正确支持 Symbol。"
  - version: v11.4.0
    pr-url: https://github.com/nodejs/node/pull/24806
    description: "`%o` 说明符的 `depth` 再次默认深度为 4。"
  - version: v11.0.0
    pr-url: https://github.com/nodejs/node/pull/17907
    description: "`%o` 说明符的 `depth` 选项现在将回退到默认深度。"
  - version: v10.12.0
    pr-url: https://github.com/nodejs/node/pull/22097
    description: "`%d` 和 `%i` 说明符现在支持 BigInt。"
  - version: v8.4.0
    pr-url: https://github.com/nodejs/node/pull/14558
    description: "现在支持 `%o` 和 `%O` 说明符。"
-->

* `format` {string} 一个 `printf` 风格的格式字符串。

`util.format()` 方法使用第一个参数作为 `printf` 风格的格式字符串返回一个格式化字符串，
该字符串可以包含零个或多个格式说明符。每个说明符都被替换为相应参数的转换值。支持的说明符有：

* `%s`: `String` 将用于转换除 `BigInt`、`Object` 和 `-0` 之外的所有值。`BigInt` 值将用 `n` 表示，
  既没有用户定义的 `toString` 函数也没有 `Symbol.toPrimitive` 函数的对象将使用选项 `{ depth: 0, colors: false, compact: 3 }` 通过 `util.inspect()` 进行检查。
* `%d`: `Number` 将用于转换除 `BigInt` 和 `Symbol` 之外的所有值。
* `%i`: `parseInt(value, 10)` 用于除 `BigInt` 和 `Symbol` 之外的所有值。
* `%f`: `parseFloat(value)` 用于除 `Symbol` 之外的所有值。
* `%j`: JSON。如果参数包含循环引用，则替换为字符串 `'[Circular]'`。
* `%o`: `Object`。具有通用 JavaScript 对象格式化的对象的字符串表示。类似于使用选项 `{ showHidden: true, showProxy: true }` 的 `util.inspect()`。
  这将显示完整对象，包括不可枚举属性和代理。
* `%O`: `Object`。具有通用 JavaScript 对象格式化的对象的字符串表示。类似于不带选项的 `util.inspect()`。
  这将显示完整对象，不包括不可枚举属性和代理。
* `%c`: `CSS`。此说明符被忽略，将跳过任何传入的 CSS。
* `%%`: 单个百分号 (`'%'`)。这不消耗参数。
* 返回：{string} 格式化后的字符串

如果说明符没有相应的参数，则不会被替换：

```js
util.format('%s:%s', 'foo');
// 返回：'foo:%s'
```

不属于格式字符串部分的值，如果其类型不是 `string`，则使用 `util.inspect()` 进行格式化。

如果传递给 `util.format()` 方法的参数多于说明符的数量，则额外的参数会连接到返回的字符串，用空格分隔：

```js
util.format('%s:%s', 'foo', 'bar', 'baz');
// 返回：'foo:bar baz'
```

如果第一个参数不包含有效的格式说明符，`util.format()` 返回一个字符串，该字符串是所有参数用空格连接而成的：

```js
util.format(1, 2, 3);
// 返回：'1 2 3'
```

如果只传递一个参数给 `util.format()`，则原样返回，不进行任何格式化：

```js
util.format('%% %s');
// 返回：'%% %s'
```

`util.format()` 是一个旨在作为调试工具的同步方法。
某些输入值可能会产生显著的性能开销，从而阻塞事件循环。请谨慎使用此函数，切勿在热点代码路径中使用。

## `util.formatWithOptions(inspectOptions, format[, ...args])`

<!-- YAML
added: v10.0.0
-->

* `inspectOptions` {Object}
* `format` {string}

此函数与 [`util.format()`][] 相同，不同之处在于它接受一个 `inspectOptions` 参数，
该参数指定传递给 [`util.inspect()`][] 的选项。

```js
util.formatWithOptions({ colors: true }, 'See object %O', { foo: 42 });
// 返回 'See object { foo: 42 }'，其中 `42` 在打印到终端时作为数字着色
```

## `util.getCallSites([frameCount][, options])`

<!-- YAML
added: v22.9.0
changes:
  - version:
    - v23.7.0
    - v22.14.0
    pr-url: https://github.com/nodejs/node/pull/56584
    description: "属性 `column` 已弃用，推荐使用 `columnNumber`。"
  - version:
    - v23.7.0
    - v22.14.0
    pr-url: https://github.com/nodejs/node/pull/56551
    description: "暴露了属性 `CallSite.scriptId`。"
  - version:
    - v23.3.0
    - v22.12.0
    pr-url: https://github.com/nodejs/node/pull/55626
    description: "API 已从 `util.getCallSite` 重命名为 `util.getCallSites()`。"
-->

> 稳定性：1.1 - 积极开发中

* `frameCount` {integer} 可选的要捕获为调用站点对象的帧数。
  **默认值：** `10`。允许范围在 1 到 200 之间。
* `options` {Object} 可选
  * `sourceMap` {boolean} 从源映射重建堆栈跟踪中的原始位置。
    默认情况下通过标志 `--enable-source-maps` 启用。
* 返回：{Object\[]} 调用站点对象数组
  * `functionName` {string} 返回与此调用站点关联的函数名称。
  * `scriptName` {string} 返回包含此调用站点函数脚本的资源名称。
  * `scriptId` {string} 返回脚本的唯一 id，如 Chrome DevTools 协议 [`Runtime.ScriptId`][] 中所述。
  * `lineNumber` {number} 返回 JavaScript 脚本行号（从 1 开始）。
  * `columnNumber` {number} 返回 JavaScript 脚本列号（从 1 开始）。

返回一个包含调用函数堆栈的调用站点对象数组。

与访问 `error.stack` 不同，从此 API 返回的结果不受 `Error.prepareStackTrace` 干扰。

```mjs
import { getCallSites } from 'node:util';

function exampleFunction() {
  const callSites = getCallSites();

  console.log('Call Sites:');
  callSites.forEach((callSite, index) => {
    console.log(`CallSite ${index + 1}:`);
    console.log(`Function Name: ${callSite.functionName}`);
    console.log(`Script Name: ${callSite.scriptName}`);
    console.log(`Line Number: ${callSite.lineNumber}`);
    console.log(`Column Number: ${callSite.columnNumber}`);
  });
  // CallSite 1:
  // Function Name: exampleFunction
  // Script Name: /home/example.js
  // Line Number: 5
  // Column Number: 26

  // CallSite 2:
  // Function Name: anotherFunction
  // Script Name: /home/example.js
  // Line Number: 22
  // Column Number: 3

  // ...
}

// 一个模拟另一个堆栈层的函数
function anotherFunction() {
  exampleFunction();
}

anotherFunction();
```

```cjs
const { getCallSites } = require('node:util');

function exampleFunction() {
  const callSites = getCallSites();

  console.log('Call Sites:');
  callSites.forEach((callSite, index) => {
    console.log(`CallSite ${index + 1}:`);
    console.log(`Function Name: ${callSite.functionName}`);
    console.log(`Script Name: ${callSite.scriptName}`);
    console.log(`Line Number: ${callSite.lineNumber}`);
    console.log(`Column Number: ${callSite.columnNumber}`);
  });
  // CallSite 1:
  // Function Name: exampleFunction
  // Script Name: /home/example.js
  // Line Number: 5
  // Column Number: 26

  // CallSite 2:
  // Function Name: anotherFunction
  // Script Name: /home/example.js
  // Line Number: 22
  // Column Number: 3

  // ...
}

// 一个模拟另一个堆栈层的函数
function anotherFunction() {
  exampleFunction();
}

anotherFunction();
```

可以通过将选项 `sourceMap` 设置为 `true` 来重建原始位置。
如果源映射不可用，则原始位置将与当前位置相同。
当启用 `--enable-source-maps` 标志时，`sourceMap` 默认为 true。

```ts
import { getCallSites } from 'node:util';

interface Foo {
  foo: string;
}

const callSites = getCallSites({ sourceMap: true });

// 使用 sourceMap:
// Function Name: ''
// Script Name: example.js
// Line Number: 7
// Column Number: 26

// 不使用 sourceMap:
// Function Name: ''
// Script Name: example.js
// Line Number: 2
// Column Number: 26
```

```cjs
const { getCallSites } = require('node:util');

const callSites = getCallSites({ sourceMap: true });

// 使用 sourceMap:
// Function Name: ''
// Script Name: example.js
// Line Number: 7
// Column Number: 26

// 不使用 sourceMap:
// Function Name: ''
// Script Name: example.js
// Line Number: 2
// Column Number: 26
```

## `util.getSystemErrorName(err)`

<!-- YAML
added: v9.7.0
-->

* `err` {number}
* 返回值：{string}

返回来自 Node.js API 的数字错误代码的字符串名称。
错误代码和错误名称之间的映射取决于平台。
参见 [常见系统错误][] 以了解常见错误的名称。

```js
fs.access('file/that/does/not/exist', (err) => {
  const name = util.getSystemErrorName(err.errno);
  console.error(name);  // ENOENT
});
```

## `util.getSystemErrorMap()`

<!-- YAML
added:
  - v16.0.0
  - v14.17.0
-->

* 返回值：{Map}

返回 Node.js API 可用的所有系统错误代码的 Map。
错误代码和错误名称之间的映射取决于平台。
参见 [常见系统错误][] 以了解常见错误的名称。

```js
fs.access('file/that/does/not/exist', (err) => {
  const errorMap = util.getSystemErrorMap();
  const name = errorMap.get(err.errno);
  console.error(name);  // ENOENT
});
```

## `util.getSystemErrorMessage(err)`

<!-- YAML
added:
  - v23.1.0
  - v22.12.0
-->

* `err` {number}
* 返回值：{string}

返回来自 Node.js API 的数字错误代码的字符串消息。
错误代码和字符串消息之间的映射取决于平台。

```js
fs.access('file/that/does/not/exist', (err) => {
  const message = util.getSystemErrorMessage(err.errno);
  console.error(message);  // 没有这样的文件或目录
});
```

## `util.setTraceSigInt(enable)`

<!-- YAML
added:
 - v24.6.0
 - v22.19.0
-->

* `enable` {boolean}

启用或禁用在 `SIGINT` 上打印堆栈跟踪。该 API 仅在主线程上可用。

## `util.inherits(constructor, superConstructor)`

<!-- YAML
added: v0.3.0
changes:
  - version: v5.0.0
    pr-url: https://github.com/nodejs/node/pull/3455
    description: "`constructor` 参数现在可以引用 ES6 类。"
-->

> 稳定性：3 - 遗留：请改用 ES2015 类语法和 `extends` 关键字。

* `constructor` {Function}
* `superConstructor` {Function}

不推荐使用 `util.inherits()`。请使用 ES6 `class` 和 `extends` 关键字以获得语言级别的继承支持。另请注意，这两种风格在 [语义上不兼容][]。

将一个 [构造函数][] 的原型方法继承到另一个构造函数中。`constructor` 的原型将被设置为从 `superConstructor` 创建的新对象。

这主要在 `Object.setPrototypeOf(constructor.prototype, superConstructor.prototype)` 之上添加了一些输入验证。作为额外的便利，`superConstructor` 将通过 `constructor.super_` 属性访问。

```js
const util = require('node:util');
const EventEmitter = require('node:events');

function MyStream() {
  EventEmitter.call(this);
}

util.inherits(MyStream, EventEmitter);

MyStream.prototype.write = function(data) {
  this.emit('data', data);
};

const stream = new MyStream();

console.log(stream instanceof EventEmitter); // true
console.log(MyStream.super_ === EventEmitter); // true

stream.on('data', (data) => {
  console.log(`Received data: "${data}"`);
});
stream.write('It works!'); // 接收到的数据："It works!"
```

使用 `class` 和 `extends` 的 ES6 示例：

```mjs
import EventEmitter from 'node:events';

class MyStream extends EventEmitter {
  write(data) {
    this.emit('data', data);
  }
}

const stream = new MyStream();

stream.on('data', (data) => {
  console.log(`Received data: "${data}"`);
});
stream.write('With ES6');
```

```cjs
const EventEmitter = require('node:events');

class MyStream extends EventEmitter {
  write(data) {
    this.emit('data', data);
  }
}

const stream = new MyStream();

stream.on('data', (data) => {
  console.log(`Received data: "${data}"`);
});
stream.write('With ES6');
```

## `util.inspect(object[, options])`

## `util.inspect(object[, showHidden[, depth[, colors]]])`

<!-- YAML
added: v0.3.0
changes:
  - version:
    - v25.0.0
    pr-url: https://github.com/nodejs/node/pull/59710
    description: "`util.inspect.styles.regexp` 样式现在是一个方法，用于为字符串化的正则表达式着色。"
  - version:
    - v17.3.0
    - v16.14.0
    pr-url: https://github.com/nodejs/node/pull/41003
    description: "现在支持 `numericSeparator` 选项。"
  - version: v16.18.0
    pr-url: https://github.com/nodejs/node/pull/43576
    description: "检查 `Set` 和 `Map` 时添加了对 `maxArrayLength` 的支持。"
  - version:
    - v14.6.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/33690
    description: "如果 `object` 来自不同的 `vm.Context`，其上的自定义检查函数将不再接收特定于上下文的参数。"
  - version:
     - v13.13.0
     - v12.17.0
    pr-url: https://github.com/nodejs/node/pull/32392
    description: "现在支持 `maxStringLength` 选项。"
  - version:
     - v13.5.0
     - v12.16.0
    pr-url: https://github.com/nodejs/node/pull/30768
    description: "如果 `showHidden` 为 `true`，则会检查用户定义的原型属性。"
  - version: v13.0.0
    pr-url: https://github.com/nodejs/node/pull/27685
    description: 循环引用现在包含对引用的标记。
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/27109
    description: "`compact` 选项的默认值更改为 `3`，`breakLength` 选项的默认值更改为 `80`。"
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/24971
    description: 内部属性不再出现在自定义检查函数的上下文参数中。
  - version: v11.11.0
    pr-url: https://github.com/nodejs/node/pull/26269
    description: "`compact` 选项接受数字以用于新的输出模式。"
  - version: v11.7.0
    pr-url: https://github.com/nodejs/node/pull/25006
    description: ArrayBuffers 现在也显示它们的二进制内容。
  - version: v11.5.0
    pr-url: https://github.com/nodejs/node/pull/24852
    description: "现在支持 `getters` 选项。"
  - version: v11.4.0
    pr-url: https://github.com/nodejs/node/pull/24326
    description: "`depth` 默认值改回 `2`。"
  - version: v11.0.0
    pr-url: https://github.com/nodejs/node/pull/22846
    description: "`depth` 默认值更改为 `20`。"
  - version: v11.0.0
    pr-url: https://github.com/nodejs/node/pull/22756
    description: 检查输出现在限制为约 128 MiB。超过该大小的数据将不会被完全检查。
  - version: v10.12.0
    pr-url: https://github.com/nodejs/node/pull/22788
    description: "现在支持 `sorted` 选项。"
  - version: v10.6.0
    pr-url: https://github.com/nodejs/node/pull/20725
    description: 现在可以检查链表和类似对象，直到最大调用堆栈大小。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/19259
    description: "`WeakMap` 和 `WeakSet` 条目现在也可以被检查。"
  - version: v9.9.0
    pr-url: https://github.com/nodejs/node/pull/17576
    description: "现在支持 `compact` 选项。"
  - version: v6.6.0
    pr-url: https://github.com/nodejs/node/pull/8174
    description: "自定义检查函数现在可以返回 `this`。"
  - version: v6.3.0
    pr-url: https://github.com/nodejs/node/pull/7499
    description: "现在支持 `breakLength` 选项。"
  - version: v6.1.0
    pr-url: https://github.com/nodejs/node/pull/6334
    description: "现在支持 `maxArrayLength` 选项；特别是，长数组默认会被截断。"
  - version: v6.1.0
    pr-url: https://github.com/nodejs/node/pull/6465
    description: "现在支持 `showProxy` 选项。"
-->

* `object` {any} 任何 JavaScript 原始值或 `Object`。
* `options` {Object}
  * `showHidden` {boolean} 如果为 `true`，`object` 的不可枚举符号和属性将包含在格式化结果中。{WeakMap} 和 {WeakSet} 条目以及用户定义的原型属性（不包括方法属性）也包含在内。**默认值：** `false`。
  * `depth` {number} 指定格式化 `object` 时递归的次数。这对于检查大型对象很有用。要递归到最大调用堆栈大小，请传递 `Infinity` 或 `null`。**默认值：** `2`。
  * `colors` {boolean} 如果为 `true`，输出将使用 ANSI 颜色代码进行样式化。颜色是可自定义的。参见 [自定义 `util.inspect` 颜色][]。**默认值：** `false`。
  * `customInspect` {boolean} 如果为 `false`，则不会调用 `[util.inspect.custom](depth, opts, inspect)` 函数。**默认值：** `true`。
  * `showProxy` {boolean} 如果为 `true`，`Proxy` 检查包括 [`target` 和 `handler`][] 对象。**默认值：** `false`。
  * `maxArrayLength` {integer} 指定格式化时要包含的 `Array`、{TypedArray}、{Map}、{WeakMap} 和 {WeakSet} 元素的最大数量。设置为 `null` 或 `Infinity` 以显示所有元素。设置为 `0` 或负数以不显示任何元素。**默认值：** `100`。
  * `maxStringLength` {integer} 指定格式化时要包含的最大字符数。设置为 `null` 或 `Infinity` 以显示所有元素。设置为 `0` 或负数以不显示任何字符。**默认值：** `10000`。
  * `breakLength` {integer} 输入值跨多行分割的长度。设置为 `Infinity` 将输入格式化为单行（结合 `compact` 设置为 `true` 或任何 >= `1` 的数字）。**默认值：** `80`。
  * `compact` {boolean|integer} 将其设置为 `false` 会导致每个对象键显示在新行上。它将在长于 `breakLength` 的文本中的新行处断开。如果设置为数字，只要所有属性都适合 `breakLength`，最多 `n` 个内部元素将合并在一行上。短数组元素也会分组在一起。更多信息，请参见下面的示例。**默认值：** `3`。
  * `sorted` {boolean|Function} 如果设置为 `true` 或函数，对象的所有属性以及 `Set` 和 `Map` 条目将在结果字符串中排序。如果设置为 `true`，则使用 [默认排序][]。如果设置为函数，则用作 [比较函数][]。
  * `getters` {boolean|string} 如果设置为 `true`，则检查 getter。如果设置为 `'get'`，则仅检查没有相应 setter 的 getter。如果设置为 `'set'`，则仅检查有相应 setter 的 getter。根据 getter 函数，这可能会导致副作用。**默认值：** `false`。
  * `numericSeparator` {boolean} 如果设置为 `true`，则使用下划线分隔所有 bigint 和数字中的每三位数字。**默认值：** `false`。
* 返回值：{string} `object` 的表示。

`util.inspect()` 方法返回 `object` 的字符串表示形式，旨在用于调试。`util.inspect` 的输出可能会随时更改，不应以编程方式依赖。可以传递额外的 `options` 来改变结果。
`util.inspect()` 将使用构造函数的名称和/或 `Symbol.toStringTag` 属性为检查的值制作可识别的标签。

```js
class Foo {
  get [Symbol.toStringTag]() {
    return 'bar';
  }
}

class Bar {}

const baz = Object.create(null, { [Symbol.toStringTag]: { value: 'foo' } });

util.inspect(new Foo()); // 'Foo [bar] {}'
util.inspect(new Bar()); // 'Bar {}'
util.inspect(baz);       // '[foo] {}'
```

循环引用通过使用引用索引指向其锚点：

```mjs
import { inspect } from 'node:util';

const obj = {};
obj.a = [obj];
obj.b = {};
obj.b.inner = obj.b;
obj.b.obj = obj;

console.log(inspect(obj));
// <ref *1> {
//   a: [ [Circular *1] ],
//   b: <ref *2> { inner: [Circular *2], obj: [Circular *1] }
// }
```

```cjs
const { inspect } = require('node:util');

const obj = {};
obj.a = [obj];
obj.b = {};
obj.b.inner = obj.b;
obj.b.obj = obj;

console.log(inspect(obj));
// <ref *1> {
//   a: [ [Circular *1] ],
//   b: <ref *2> { inner: [Circular *2], obj: [Circular *1] }
// }
```

以下示例检查 `util` 对象的所有属性：

```mjs
import util from 'node:util';

console.log(util.inspect(util, { showHidden: true, depth: null }));
```

```cjs
const util = require('node:util');

console.log(util.inspect(util, { showHidden: true, depth: null }));
```

以下示例突出了 `compact` 选项的效果：

```mjs
import { inspect } from 'node:util';

const o = {
  a: [1, 2, [[
    'Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit, sed do ' +
      'eiusmod \ntempor incididunt ut labore et dolore magna aliqua.',
    'test',
    'foo']], 4],
  b: new Map([['za', 1], ['zb', 'test']]),
};
console.log(inspect(o, { compact: true, depth: 5, breakLength: 80 }));

// { a:
//   [ 1,
//     2,
//     [ [ 'Lorem ipsum dolor sit amet,\nconsectetur [...]', // 长行
//           'test',
//           'foo' ] ],
//     4 ],
//   b: Map(2) { 'za' => 1, 'zb' => 'test' } }

// 将 `compact` 设置为 false 或整数会创建更易读的输出。
console.log(inspect(o, { compact: false, depth: 5, breakLength: 80 }));

// {
//   a: [
//     1,
//     2,
//     [
//       [
//         'Lorem ipsum dolor sit amet,\n' +
//           'consectetur adipiscing elit, sed do eiusmod \n' +
//           'tempor incididunt ut labore et dolore magna aliqua.',
//         'test',
//         'foo'
//       ]
//     ],
//     4
//   ],
//   b: Map(2) {
//     'za' => 1,
//     'zb' => 'test'
//   }
// }

// 将 `breakLength` 设置为例如 150 将在单行中打印 "Lorem ipsum" 文本。
```

```cjs
const { inspect } = require('node:util');

const o = {
  a: [1, 2, [[
    'Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit, sed do ' +
      'eiusmod \ntempor incididunt ut labore et dolore magna aliqua.',
    'test',
    'foo']], 4],
  b: new Map([['za', 1], ['zb', 'test']]),
};
console.log(inspect(o, { compact: true, depth: 5, breakLength: 80 }));

// { a:
//   [ 1,
//     2,
//     [ [ 'Lorem ipsum dolor sit amet,\nconsectetur [...]', // 长行
//           'test',
//           'foo' ] ],
//     4 ],
//   b: Map(2) { 'za' => 1, 'zb' => 'test' } }

// 将 `compact` 设置为 false 或整数会创建更易读的输出。
console.log(inspect(o, { compact: false, depth: 5, breakLength: 80 }));

// {
//   a: [
//     1,
//     2,
//     [
//       [
//         'Lorem ipsum dolor sit amet,\n' +
//           'consectetur adipiscing elit, sed do eiusmod \n' +
//           'tempor incididunt ut labore et dolore magna aliqua.',
//         'test',
//         'foo'
//       ]
//     ],
//     4
//   ],
//   b: Map(2) {
//     'za' => 1,
//     'zb' => 'test'
//   }
// }

// 将 `breakLength` 设置为例如 150 将在单行中打印 "Lorem ipsum" 文本。
```

`showHidden` 选项允许检查 {WeakMap} 和 {WeakSet} 条目。如果条目多于 `maxArrayLength`，则不保证显示哪些条目。这意味着检索相同的 {WeakSet} 条目两次可能会导致不同的输出。此外，没有剩余强引用的条目可能会随时被垃圾回收。

```mjs
import { inspect } from 'node:util';

const obj = { a: 1 };
const obj2 = { b: 2 };
const weakSet = new WeakSet([obj, obj2]);

console.log(inspect(weakSet, { showHidden: true }));
// WeakSet { { a: 1 }, { b: 2 } }
```

```cjs
const { inspect } = require('node:util');

const obj = { a: 1 };
const obj2 = { b: 2 };
const weakSet = new WeakSet([obj, obj2]);

console.log(inspect(weakSet, { showHidden: true }));
// WeakSet { { a: 1 }, { b: 2 } }
```

`sorted` 选项确保对象的属性插入顺序不会影响 `util.inspect()` 的结果。

```mjs
import { inspect } from 'node:util';
import assert from 'node:assert';

const o1 = {
  b: [2, 3, 1],
  a: '`a` comes before `b`',
  c: new Set([2, 3, 1]),
};
console.log(inspect(o1, { sorted: true }));
// { a: '`a` comes before `b`', b: [ 2, 3, 1 ], c: Set(3) { 1, 2, 3 } }
console.log(inspect(o1, { sorted: (a, b) => b.localeCompare(a) }));
// { c: Set(3) { 3, 2, 1 }, b: [ 2, 3, 1 ], a: '`a` comes before `b`' }

const o2 = {
  c: new Set([2, 1, 3]),
  a: '`a` comes before `b`',
  b: [2, 3, 1],
};
assert.strict.equal(
  inspect(o1, { sorted: true }),
  inspect(o2, { sorted: true }),
);
```

```cjs
const { inspect } = require('node:util');
const assert = require('node:assert');

const o1 = {
  b: [2, 3, 1],
  a: '`a` comes before `b`',
  c: new Set([2, 3, 1]),
};
console.log(inspect(o1, { sorted: true }));
// { a: '`a` comes before `b`', b: [ 2, 3, 1 ], c: Set(3) { 1, 2, 3 } }
console.log(inspect(o1, { sorted: (a, b) => b.localeCompare(a) }));
// { c: Set(3) { 3, 2, 1 }, b: [ 2, 3, 1 ], a: '`a` comes before `b`' }

const o2 = {
  c: new Set([2, 1, 3]),
  a: '`a` comes before `b`',
  b: [2, 3, 1],
};
assert.strict.equal(
  inspect(o1, { sorted: true }),
  inspect(o2, { sorted: true }),
);
```

`numericSeparator` 选项在所有数字的每三位数字后添加一个下划线。

```mjs
import { inspect } from 'node:util';

const thousand = 1000;
const million = 1000000;
const bigNumber = 123456789n;
const bigDecimal = 1234.12345;

console.log(inspect(thousand, { numericSeparator: true }));
// 1_000
console.log(inspect(million, { numericSeparator: true }));
// 1_000_000
console.log(inspect(bigNumber, { numericSeparator: true }));
// 123_456_789n
console.log(inspect(bigDecimal, { numericSeparator: true }));
// 1_234.123_45
```

```cjs
const { inspect } = require('node:util');

const thousand = 1000;
const million = 1000000;
const bigNumber = 123456789n;
const bigDecimal = 1234.12345;

console.log(inspect(thousand, { numericSeparator: true }));
// 1_000
console.log(inspect(million, { numericSeparator: true }));
// 1_000_000
console.log(inspect(bigNumber, { numericSeparator: true }));
// 123_456_789n
console.log(inspect(bigDecimal, { numericSeparator: true }));
// 1_234.123_45
```

`util.inspect()` 是一种旨在用于调试的同步方法。其最大输出长度约为 128 MiB。导致更长输出的输入将被截断。

### 自定义 `util.inspect` 颜色

<!-- type=misc -->

`util.inspect` 的颜色输出（如果启用）可以通过 `util.inspect.styles` 和 `util.inspect.colors` 属性在全局范围内自定义。

`util.inspect.styles` 是一个将样式名称映射到 `util.inspect.colors` 中的颜色的 map。

默认样式和相关颜色如下：

* `bigint`: `yellow`
* `boolean`: `yellow`
* `date`: `magenta`
* `module`: `underline`
* `name`: (无样式)
* `null`: `bold`
* `number`: `yellow`
* `regexp`: 一种为字符类、组、断言和其他部分着色的方法，以提高可读性。要自定义着色，请更改 `colors` 属性。默认设置为 `['red', 'green', 'yellow', 'cyan', 'magenta']`，可根据需要调整。数组会根据“深度”重复迭代。
* `special`: `cyan` (例如，`Proxies`)
* `string`: `green`
* `symbol`: `green`
* `undefined`: `grey`

颜色样式使用 ANSI 控制代码，可能不受所有终端支持。要验证颜色支持，请使用 [`tty.hasColors()`][]。

预定义的控制代码列在下面（分为“修饰符”、“前景色”和“背景色”）。

#### 复杂自定义着色

可以将方法定义为样式。它接收输入的字符串化值。在着色激活且类型被检查时调用它。

示例：`util.inspect.styles.regexp(value)`

* `value` {string} 输入类型的字符串表示。
* 返回值：{string} `object` 的调整后的表示。

#### 修饰符

修饰符支持因不同终端而异。如果不支持，它们大多会被忽略。

* `reset` - 将所有（颜色）修饰符重置为默认值
* **bold** - 使文本加粗
* _italic_ - 使文本倾斜
* <span style="border-bottom: 1px solid;">underline</span> - 使文本下划线
* ~~strikethrough~~ - 在文本中心画一条水平线（别名：`strikeThrough`, `crossedout`, `crossedOut`）
* `hidden` - 打印文本，但使其不可见（别名：conceal）
* <span style="opacity: 0.5;">dim</span> - 降低颜色强度（别名：`faint`）
* <span style="border-top: 1px solid;">overlined</span> - 使文本上划线
* blink - 以间隔隐藏和显示文本
* <span style="filter: invert(100%);">inverse</span> - 交换前景和背景颜色（别名：`swapcolors`, `swapColors`）
* <span style="border-bottom: 1px double;">doubleunderline</span> - 使文本双下划线（别名：`doubleUnderline`）
* <span style="border: 1px solid;">framed</span> - 在文本周围绘制边框

#### 前景色

* `black`
* `red`
* `green`
* `yellow`
* `blue`
* `magenta`
* `cyan`
* `white`
* `gray` (别名：`grey`, `blackBright`)
* `redBright`
* `greenBright`
* `yellowBright`
* `blueBright`
* `magentaBright`
* `cyanBright`
* `whiteBright`

#### 背景色

* `bgBlack`
* `bgRed`
* `bgGreen`
* `bgYellow`
* `bgBlue`
* `bgMagenta`
* `bgCyan`
* `bgWhite`
* `bgGray` (别名：`bgGrey`, `bgBlackBright`)
* `bgRedBright`
* `bgGreenBright`
* `bgYellowBright`
* `bgBlueBright`
* `bgMagentaBright`
* `bgCyanBright`
* `bgWhiteBright`

### 对象上的自定义检查函数

<!-- type=misc -->

<!-- YAML
added: v0.1.97
changes:
  - version:
      - v17.3.0
      - v16.14.0
    pr-url: https://github.com/nodejs/node/pull/41019
    description: 添加了 inspect 参数以提高互操作性。
-->

对象也可以定义它们自己的 [`[util.inspect.custom](depth, opts, inspect)`][util.inspect.custom] 函数，`util.inspect()` 将在检查对象时调用该函数并使用其结果。

```mjs
import { inspect } from 'node:util';

class Box {
  constructor(value) {
    this.value = value;
  }

  [inspect.custom](depth, options, inspect) {
    if (depth < 0) {
      return options.stylize('[Box]', 'special');
    }

    const newOptions = Object.assign({}, options, {
      depth: options.depth === null ? null : options.depth - 1,
    });

    // 五个空格填充，因为那是 "Box< " 的大小。
    const padding = ' '.repeat(5);
    const inner = inspect(this.value, newOptions)
                  .replace(/\n/g, `\n${padding}`);
    return `${options.stylize('Box', 'special')}< ${inner} >`;
  }
}

const box = new Box(true);

console.log(inspect(box));
// "Box< true >"
```

```cjs
const { inspect } = require('node:util');

class Box {
  constructor(value) {
    this.value = value;
  }

  [inspect.custom](depth, options, inspect) {
    if (depth < 0) {
      return options.stylize('[Box]', 'special');
    }

    const newOptions = Object.assign({}, options, {
      depth: options.depth === null ? null : options.depth - 1,
    });

    // 五个空格填充，因为那是 "Box< " 的大小。
    const padding = ' '.repeat(5);
    const inner = inspect(this.value, newOptions)
                  .replace(/\n/g, `\n${padding}`);
    return `${options.stylize('Box', 'special')}< ${inner} >`;
  }
}

const box = new Box(true);

console.log(inspect(box));
// "Box< true >"
```

自定义 `[util.inspect.custom](depth, opts, inspect)` 函数通常返回字符串，但可以返回任何类型的值，`util.inspect()` 将相应地格式化该值。

```mjs
import { inspect } from 'node:util';

const obj = { foo: 'this will not show up in the inspect() output' };
obj[inspect.custom] = (depth) => {
  return { bar: 'baz' };
};

console.log(inspect(obj));
// "{ bar: 'baz' }"
```

```cjs
const { inspect } = require('node:util');

const obj = { foo: 'this will not show up in the inspect() output' };
obj[inspect.custom] = (depth) => {
  return { bar: 'baz' };
};

console.log(inspect(obj));
// "{ bar: 'baz' }"
```

### `util.inspect.custom`

<!-- YAML
added: v6.6.0
changes:
  - version: v10.12.0
    pr-url: https://github.com/nodejs/node/pull/20857
    description: 现在定义为共享符号。
-->

* 类型：{symbol} 可用于声明自定义检查函数。

除了可以通过 `util.inspect.custom` 访问外，此符号还在 [全局符号注册表][global symbol registry] 中注册，可以在任何环境中作为 `Symbol.for('nodejs.util.inspect.custom')` 访问。

使用此允许以可移植的方式编写代码，以便自定义检查函数在 Node.js 环境中使用而在浏览器中被忽略。`util.inspect()` 函数本身作为第三个参数传递给自定义检查函数，以允许进一步的可移植性。

```js
const customInspectSymbol = Symbol.for('nodejs.util.inspect.custom');

class Password {
  constructor(value) {
    this.value = value;
  }

  toString() {
    return 'xxxxxxxx';
  }

  [customInspectSymbol](depth, inspectOptions, inspect) {
    return `Password <${this.toString()}>`;
  }
}

const password = new Password('r0sebud');
console.log(password);
// 打印 Password <xxxxxxxx>
```

有关更多详细信息，请参阅 [对象上的自定义检查函数][]。

### `util.inspect.defaultOptions`

<!-- YAML
added: v6.4.0
-->

`defaultOptions` 值允许自定义 `util.inspect` 使用的默认选项。这对于像 `console.log` 或 `util.format` 这样隐式调用 `util.inspect` 的函数很有用。它应设置为包含一个或多个有效 [`util.inspect()`][] 选项的对象。也支持直接设置选项属性。

```mjs
import { inspect } from 'node:util';
const arr = Array(156).fill(0);

console.log(arr); // 记录被截断的数组
inspect.defaultOptions.maxArrayLength = null;
console.log(arr); // 记录完整数组
```

```cjs
const { inspect } = require('node:util');
const arr = Array(156).fill(0);

console.log(arr); // 记录被截断的数组
inspect.defaultOptions.maxArrayLength = null;
console.log(arr); // 记录完整数组
```

## `util.isDeepStrictEqual(val1, val2[, options])`

<!-- YAML
added: v9.0.0
changes:
  - version: v24.9.0
    pr-url: https://github.com/nodejs/node/pull/59762
    description: "添加了 `options` 参数以允许跳过原型比较。"
-->

* `val1` {any}
* `val2` {any}
* `skipPrototype` {boolean} 如果为 `true`，则在深度严格相等检查期间跳过原型和构造函数比较。**默认值：** `false`。
* 返回值：{boolean}

如果 `val1` 和 `val2` 之间存在深度严格相等，则返回 `true`。
否则，返回 `false`。

默认情况下，深度严格相等包括对象原型和构造函数的比较。当 `skipPrototype` 为 `true` 时，如果具有不同原型或构造函数的对象的可枚举属性深度严格相等，它们仍可被视为相等。

```js
const util = require('node:util');

class Foo {
  constructor(a) {
    this.a = a;
  }
}

class Bar {
  constructor(a) {
    this.a = a;
  }
}

const foo = new Foo(1);
const bar = new Bar(1);

// 构造函数不同，属性相同
console.log(util.isDeepStrictEqual(foo, bar));
// false

console.log(util.isDeepStrictEqual(foo, bar, true));
// true
```

有关深度严格相等的更多信息，请参阅 [`assert.deepStrictEqual()`][]。

## 类：`util.MIMEType`

<!-- YAML
added:
  - v19.1.0
  - v18.13.0
changes:
 - version:
    - v23.11.0
    - v22.15.0
   pr-url: https://github.com/nodejs/node/pull/57510
   description: 标记 API 为稳定版。
-->

[MIMEType 类](https://bmeck.github.io/node-proposal-mime-api/) 的实现。

按照浏览器惯例，`MIMEType` 对象的所有属性都作为类原型上的 getter 和 setter 实现，而不是作为对象本身的数据属性。

MIME 字符串是包含多个有意义组件的结构化字符串。解析后，将返回一个 `MIMEType` 对象，其中包含每个组件的属性。

### `new MIMEType(input)`

* `input` {string} 要解析的输入 MIME

通过解析 `input` 创建一个新的 `MIMEType` 对象。

```mjs
import { MIMEType } from 'node:util';

const myMIME = new MIMEType('text/plain');
```

```cjs
const { MIMEType } = require('node:util');

const myMIME = new MIMEType('text/plain');
```

如果 `input` 不是有效的 MIME，将抛出 `TypeError`。请注意，将努力将给定值强制转换为字符串。例如：

```mjs
import { MIMEType } from 'node:util';
const myMIME = new MIMEType({ toString: () => 'text/plain' });
console.log(String(myMIME));
// 输出：text/plain
```

```cjs
const { MIMEType } = require('node:util');
const myMIME = new MIMEType({ toString: () => 'text/plain' });
console.log(String(myMIME));
// 输出：text/plain
```

### `mime.type`

* 类型：{string}

获取并设置 MIME 的类型部分。

```mjs
import { MIMEType } from 'node:util';

const myMIME = new MIMEType('text/javascript');
console.log(myMIME.type);
// 输出：text
myMIME.type = 'application';
console.log(myMIME.type);
// 输出：application
console.log(String(myMIME));
// 输出：application/javascript
```

```cjs
const { MIMEType } = require('node:util');

const myMIME = new MIMEType('text/javascript');
console.log(myMIME.type);
// 输出：text
myMIME.type = 'application';
console.log(myMIME.type);
// 输出：application
console.log(String(myMIME));
// 输出：application/javascript
```

### `mime.subtype`

* 类型：{string}

获取并设置 MIME 的子类型部分。

```mjs
import { MIMEType } from 'node:util';

const myMIME = new MIMEType('text/ecmascript');
console.log(myMIME.subtype);
// 输出：ecmascript
myMIME.subtype = 'javascript';
console.log(myMIME.subtype);
// 输出：javascript
console.log(String(myMIME));
// 输出：text/javascript
```

```cjs
const { MIMEType } = require('node:util');

const myMIME = new MIMEType('text/ecmascript');
console.log(myMIME.subtype);
// 输出：ecmascript
myMIME.subtype = 'javascript';
console.log(myMIME.subtype);
// 输出：javascript
console.log(String(myMIME));
// 输出：text/javascript
```

### `mime.essence`

* 类型：{string}

获取 MIME 的本质。此属性为只读。
使用 `mime.type` 或 `mime.subtype` 来更改 MIME。

```mjs
import { MIMEType } from 'node:util';

const myMIME = new MIMEType('text/javascript;key=value');
console.log(myMIME.essence);
// 输出：text/javascript
myMIME.type = 'application';
console.log(myMIME.essence);
// 输出：application/javascript
console.log(String(myMIME));
// 输出：application/javascript;key=value
```

```cjs
const { MIMEType } = require('node:util');

const myMIME = new MIMEType('text/javascript;key=value');
console.log(myMIME.essence);
// 输出：text/javascript
myMIME.type = 'application';
console.log(myMIME.essence);
// 输出：application/javascript
console.log(String(myMIME));
// 输出：application/javascript;key=value
```

### `mime.params`

* 类型：{MIMEParams}

获取表示 MIME 参数的 [`MIMEParams`][] 对象。此属性为只读。有关详细信息，请参阅 [`MIMEParams`][] 文档。

### `mime.toString()`

* 返回值：{string}

`MIMEType` 对象上的 `toString()` 方法返回序列化的 MIME。

由于需要符合标准，此方法不允许用户自定义 MIME 的序列化过程。

### `mime.toJSON()`

* 返回值：{string}

[`mime.toString()`][] 的别名。

当使用 [`JSON.stringify()`][] 序列化 `MIMEType` 对象时，会自动调用此方法。

```mjs
import { MIMEType } from 'node:util';

const myMIMES = [
  new MIMEType('image/png'),
  new MIMEType('image/gif'),
];
console.log(JSON.stringify(myMIMES));
// 输出：["image/png", "image/gif"]
```

```cjs
const { MIMEType } = require('node:util');

const myMIMES = [
  new MIMEType('image/png'),
  new MIMEType('image/gif'),
];
console.log(JSON.stringify(myMIMES));
// 输出：["image/png", "image/gif"]
```

## 类：`util.MIMEParams`

<!-- YAML
added:
  - v19.1.0
  - v18.13.0
-->

`MIMEParams` API 提供对 `MIMEType` 参数的读写访问。

### `new MIMEParams()`

创建一个带有空参数的新 `MIMEParams` 对象

```mjs
import { MIMEParams } from 'node:util';

const myParams = new MIMEParams();
```

```cjs
const { MIMEParams } = require('node:util');

const myParams = new MIMEParams();
```

### `mimeParams.delete(name)`

* `name` {string}

移除所有名称为 `name` 的名称 - 值对。

### `mimeParams.entries()`

* 返回值：{Iterator}

返回一个迭代器，遍历参数中的每个名称 - 值对。迭代器的每个项都是一个 JavaScript `Array`。数组的第一项是 `name`，数组的第二项是 `value`。

### `mimeParams.get(name)`

* `name` {string}
* 返回值：{string | null} 如果不存在给定 `name` 的名称 - 值对，则返回字符串或 `null`。

返回名称为 `name` 的第一个名称 - 值对的值。如果没有这样的对，则返回 `null`。

### `mimeParams.has(name)`

* `name` {string}
* 返回值：{boolean}

如果存在至少一个名称为 `name` 的名称 - 值对，则返回 `true`。

### `mimeParams.keys()`

* 返回值：{Iterator}

返回一个迭代器，遍历每个名称 - 值对的名称。

```mjs
import { MIMEType } from 'node:util';

const { params } = new MIMEType('text/plain;foo=0;bar=1');
for (const name of params.keys()) {
  console.log(name);
}
// 输出：
//   foo
//   bar
```

```cjs
const { MIMEType } = require('node:util');

const { params } = new MIMEType('text/plain;foo=0;bar=1');
for (const name of params.keys()) {
  console.log(name);
}
// 输出：
//   foo
//   bar
```

### `mimeParams.set(name, value)`

* `name` {string}
* `value` {string}

将 `MIMEParams` 对象中与 `name` 关联的值设置为 `value`。如果存在任何名称为 `name` 的现有名称 - 值对，则将第一对的值设置为 `value`。

```mjs
import { MIMEType } from 'node:util';

const { params } = new MIMEType('text/plain;foo=0;bar=1');
params.set('foo', 'def');
params.set('baz', 'xyz');
console.log(params.toString());
// 输出：foo=def;bar=1;baz=xyz
```

```cjs
const { MIMEType } = require('node:util');

const { params } = new MIMEType('text/plain;foo=0;bar=1');
params.set('foo', 'def');
params.set('baz', 'xyz');
console.log(params.toString());
// 输出：foo=def;bar=1;baz=xyz
```

### `mimeParams.values()`

* 返回值：{Iterator}

返回一个迭代器，遍历每个名称 - 值对的值。

### `mimeParams[Symbol.iterator]()`

* 返回值：{Iterator}

[`mimeParams.entries()`][] 的别名。

```mjs
import { MIMEType } from 'node:util';

const { params } = new MIMEType('text/plain;foo=bar;xyz=baz');
for (const [name, value] of params) {
  console.log(name, value);
}
// 输出：
//   foo bar
//   xyz baz
```

```cjs
const { MIMEType } = require('node:util');

const { params } = new MIMEType('text/plain;foo=bar;xyz=baz');
for (const [name, value] of params) {
  console.log(name, value);
}
// 输出：
//   foo bar
//   xyz baz
```

## `util.parseArgs([config])`

<!-- YAML
added:
  - v18.3.0
  - v16.17.0
changes:
  - version:
    - v22.4.0
    - v20.16.0
    pr-url: https://github.com/nodejs/node/pull/53107
    description: "添加支持以在输入 `config` 中允许负选项。"
  - version:
    - v20.0.0
    pr-url: https://github.com/nodejs/node/pull/46718
    description: API 不再是实验性的。
  - version:
    - v18.11.0
    - v16.19.0
    pr-url: https://github.com/nodejs/node/pull/44631
    description: "添加支持以在输入 `config` 中使用默认值。"
  - version:
    - v18.7.0
    - v16.17.0
    pr-url: https://github.com/nodejs/node/pull/43459
    description: "添加支持以使用输入 `config` 中的 `tokens` 和返回的属性返回详细的解析信息。"
-->

* `config` {Object} 用于提供解析参数和配置解析器。`config` 支持以下属性：
  * `args` {string\[]} 参数字符串数组。**默认值：** `process.argv` 移除 `execPath` 和 `filename`。
  * `options` {Object} 用于描述解析器已知的参数。`options` 的键是选项的长名称，值是接受以下属性的 {Object}：
    * `type` {string} 参数类型，必须是 `boolean` 或 `string`。
    * `multiple` {boolean} 此选项是否可以提供多次。如果为 `true`，所有值将收集在一个数组中。如果为 `false`，选项的值以后者为准。**默认值：** `false`。
    * `short` {string} 选项的单字符别名。
    * `default` {string | boolean | string\[] | boolean\[]} 如果选项未出现在要解析的参数中，则分配给该选项的值。该值必须与 `type` 属性指定的类型匹配。如果 `multiple` 为 `true`，则必须是数组。当选项确实出现在要解析的参数中时，不应用默认值，即使提供的值为 falsy。
  * `strict` {boolean} 当遇到未知参数时，或者当传递的参数与 `options` 中配置的 `type` 不匹配时，是否应抛出错误。
    **默认值：** `true`。
  * `allowPositionals` {boolean} 此命令是否接受位置参数。
    **默认值：** 如果 `strict` 为 `true` 则为 `false`，否则为 `true`。
  * `allowNegative` {boolean} 如果为 `true`，允许通过在选项名称前加上 `--no-` 显式地将布尔选项设置为 `false`。
    **默认值：** `false`。
  * `tokens` {boolean} 返回解析后的令牌。这对于扩展内置行为很有用，从添加额外检查到以不同方式重新处理令牌。
    **默认值：** `false`。

* 返回值：{Object} 解析后的命令行参数：
  * `values` {Object} 解析后的选项名称及其 {string} 或 {boolean} 值的映射。
  * `positionals` {string\[]} 位置参数。
  * `tokens` {Object\[] | undefined} 请参阅 [parseArgs tokens](#parseargs-tokens) 部分。仅当 `config` 包含 `tokens: true` 时返回。

提供了比直接与 `process.argv` 交互更高级的命令行参数解析 API。接受预期参数的规范，并返回一个包含解析后的选项和位置参数的结构化对象。

```mjs
import { parseArgs } from 'node:util';
const args = ['-f', '--bar', 'b'];
const options = {
  foo: {
    type: 'boolean',
    short: 'f',
  },
  bar: {
    type: 'string',
  },
};
const {
  values,
  positionals,
} = parseArgs({ args, options });
console.log(values, positionals);
// 输出：[Object: null prototype] { foo: true, bar: 'b' } []
```

```cjs
const { parseArgs } = require('node:util');
const args = ['-f', '--bar', 'b'];
const options = {
  foo: {
    type: 'boolean',
    short: 'f',
  },
  bar: {
    type: 'string',
  },
};
const {
  values,
  positionals,
} = parseArgs({ args, options });
console.log(values, positionals);
// 输出：[Object: null prototype] { foo: true, bar: 'b' } []
```

### `parseArgs` `tokens`

通过在配置中指定 `tokens: true`，可以使用详细的解析信息来添加自定义行为。
返回的令牌具有描述以下内容的属性：

* 所有令牌
  * `kind` {string} 'option'、'positional' 或 'option-terminator' 之一。
  * `index` {number} `args` 中包含令牌的元素的索引。因此令牌的源参数是 `args[token.index]`。
* 选项令牌
  * `name` {string} 选项的长名称。
  * `rawName` {string} 选项在参数中的使用方式，如 `-f` 或 `--foo`。
  * `value` {string | undefined} 在参数中指定的选项值。布尔选项为 undefined。
  * `inlineValue` {boolean | undefined} 选项值是否以内联方式指定，如 `--foo=bar`。
* 位置令牌
  * `value` {string} 参数中位置参数的值（即 `args[index]`）。
* 选项终止符令牌

返回的令牌按输入参数中遇到的顺序排列。在参数中出现多次的选项会为每次使用生成一个令牌。短选项组（如 `-xy`）会扩展为每个选项一个令牌。因此 `-xxx` 生成三个令牌。

例如，要添加对否定选项（如 `--no-color`）的支持（当选项类型为 `boolean` 时，`allowNegative` 支持此功能），可以重新处理返回的令牌以更改为否定选项存储的值。

```mjs
import { parseArgs } from 'node:util';

const options = {
  'color': { type: 'boolean' },
  'no-color': { type: 'boolean' },
  'logfile': { type: 'string' },
  'no-logfile': { type: 'boolean' },
};
const { values, tokens } = parseArgs({ options, tokens: true });

// 重新处理选项令牌并覆盖返回的值。
tokens
  .filter((token) => token.kind === 'option')
  .forEach((token) => {
    if (token.name.startsWith('no-')) {
      // 为 --no-foo 存储 foo:false
      const positiveName = token.name.slice(3);
      values[positiveName] = false;
      delete values[token.name];
    } else {
      // 重新保存值，以便如果同时存在 --foo 和 --no-foo，则最后一个生效。
      values[token.name] = token.value ?? true;
    }
  });

const color = values.color;
const logfile = values.logfile ?? 'default.log';

console.log({ logfile, color });
```

```cjs
const { parseArgs } = require('node:util');

const options = {
  'color': { type: 'boolean' },
  'no-color': { type: 'boolean' },
  'logfile': { type: 'string' },
  'no-logfile': { type: 'boolean' },
};
const { values, tokens } = parseArgs({ options, tokens: true });

// 重新处理选项令牌并覆盖返回的值。
tokens
  .filter((token) => token.kind === 'option')
  .forEach((token) => {
    if (token.name.startsWith('no-')) {
      // 为 --no-foo 存储 foo:false
      const positiveName = token.name.slice(3);
      values[positiveName] = false;
      delete values[token.name];
    } else {
      // 重新保存值，以便如果同时存在 --foo 和 --no-foo，则最后一个生效。
      values[token.name] = token.value ?? true;
    }
  });

const color = values.color;
const logfile = values.logfile ?? 'default.log';

console.log({ logfile, color });
```

示例用法显示否定选项，以及当选项以多种方式使用时，最后一个生效。

```console
$ node negate.js
{ logfile: 'default.log', color: undefined }
$ node negate.js --no-logfile --no-color
{ logfile: false, color: false }
$ node negate.js --logfile=test.log --color
{ logfile: 'test.log', color: true }
$ node negate.js --no-logfile --logfile=test.log --color --no-color
{ logfile: 'test.log', color: false }
```

## `util.parseEnv(content)`

<!-- YAML
added:
  - v21.7.0
  - v20.12.0
changes:
  - version:
     - v24.10.0
     - v22.21.0
    pr-url: https://github.com/nodejs/node/pull/59925
    description: 此 API 不再是实验性的。
-->

* `content` {字符串}

`.env` 文件的原始内容。

* 返回：{对象}

给定一个 `.env` 文件示例：

```cjs
const { parseEnv } = require('node:util');

parseEnv('HELLO=world\nHELLO=oh my\n');
// 返回：{ HELLO: 'oh my' }
```

```mjs
import { parseEnv } from 'node:util';

parseEnv('HELLO=world\nHELLO=oh my\n');
// 返回：{ HELLO: 'oh my' }
```

## `util.promisify(original)`

<!-- YAML
added: v8.0.0
changes:
  - version: v20.8.0
    pr-url: https://github.com/nodejs/node/pull/49647
    description: "在返回 `Promise` 的函数上调用 `promisify` 已被弃用。"
-->

* `original` {函数}
* 返回：{函数}

接受一个遵循常见的错误优先回调风格的函数，即接受一个 `(err, value) => ...` 回调作为最后一个参数，并返回一个返回 Promise 的版本。

```mjs
import { promisify } from 'node:util';
import { stat } from 'node:fs';

const promisifiedStat = promisify(stat);
promisifiedStat('.').then((stats) => {
  // 对 `stats` 做一些事情
}).catch((error) => {
  // 处理错误。
});
```

```cjs
const { promisify } = require('node:util');
const { stat } = require('node:fs');

const promisifiedStat = promisify(stat);
promisifiedStat('.').then((stats) => {
  // 对 `stats` 做一些事情
}).catch((error) => {
  // 处理错误。
});
```

或者，等效地使用 `async function`：

```mjs
import { promisify } from 'node:util';
import { stat } from 'node:fs';

const promisifiedStat = promisify(stat);

async function callStat() {
  const stats = await promisifiedStat('.');
  console.log(`此目录归属于 ${stats.uid}`);
}

callStat();
```

```cjs
const { promisify } = require('node:util');
const { stat } = require('node:fs');

const promisifiedStat = promisify(stat);

async function callStat() {
  const stats = await promisifiedStat('.');
  console.log(`此目录归属于 ${stats.uid}`);
}

callStat();
```

如果存在 `original[util.promisify.custom]` 属性，`promisify` 将返回其值，参见 [自定义 Promise 化函数][]。

`promisify()` 假设在所有情况下 `original` 都是一个将回调作为最终参数的函数。如果 `original` 不是函数，`promisify()` 将抛出错误。如果 `original` 是函数但其最后一个参数不是错误优先回调，它仍然会被传入一个错误优先回调作为其最后一个参数。

除非特殊处理，否则在类方法或其他使用 `this` 的方法上使用 `promisify()` 可能无法按预期工作：

```mjs
import { promisify } from 'node:util';

class Foo {
  constructor() {
    this.a = 42;
  }

  bar(callback) {
    callback(null, this.a);
  }
}

const foo = new Foo();

const naiveBar = promisify(foo.bar);
// TypeError: 无法读取 undefined 的属性 (读取 'a')
// naiveBar().then(a => console.log(a));

naiveBar.call(foo).then((a) => console.log(a)); // '42'

const bindBar = naiveBar.bind(foo);
bindBar().then((a) => console.log(a)); // '42'
```

```cjs
const { promisify } = require('node:util');

class Foo {
  constructor() {
    this.a = 42;
  }

  bar(callback) {
    callback(null, this.a);
  }
}

const foo = new Foo();

const naiveBar = promisify(foo.bar);
// TypeError: 无法读取 undefined 的属性 (读取 'a')
// naiveBar().then(a => console.log(a));

naiveBar.call(foo).then((a) => console.log(a)); // '42'

const bindBar = naiveBar.bind(foo);
bindBar().then((a) => console.log(a)); // '42'
```

### 自定义 Promise 化函数

使用 `util.promisify.custom` 符号可以覆盖 [`util.promisify()`][] 的返回值：

```mjs
import { promisify } from 'node:util';

function doSomething(foo, callback) {
  // ...
}

doSomething[promisify.custom] = (foo) => {
  return getPromiseSomehow();
};

const promisified = promisify(doSomething);
console.log(promisified === doSomething[promisify.custom]);
// 打印 'true'
```

```cjs
const { promisify } = require('node:util');

function doSomething(foo, callback) {
  // ...
}

doSomething[promisify.custom] = (foo) => {
  return getPromiseSomehow();
};

const promisified = promisify(doSomething);
console.log(promisified === doSomething[promisify.custom]);
// 打印 'true'
```

这对于原始函数不符合标准的错误优先回调作为最后一个参数的格式的情况很有用。

例如，对于接受 `(foo, onSuccessCallback, onErrorCallback)` 的函数：

```js
doSomething[util.promisify.custom] = (foo) => {
  return new Promise((resolve, reject) => {
    doSomething(foo, resolve, reject);
  });
};
```

如果定义了 `promisify.custom` 但不是函数，`promisify()` 将抛出错误。

### `util.promisify.custom`

<!-- YAML
added: v8.0.0
changes:
  - version:
      - v13.12.0
      - v12.16.2
    pr-url: https://github.com/nodejs/node/pull/31672
    description: 这现在被定义为一个共享符号。
-->

* 类型：{符号} 可用于声明函数的自定义 Promise 化变体，参见 [自定义 Promise 化函数][]。

除了可以通过 `util.promisify.custom` 访问外，此符号还 [全局注册][全局符号注册表]，并且可以在任何环境中作为 `Symbol.for('nodejs.util.promisify.custom')` 访问。

例如，对于接受 `(foo, onSuccessCallback, onErrorCallback)` 的函数：

```js
const kCustomPromisifiedSymbol = Symbol.for('nodejs.util.promisify.custom');

doSomething[kCustomPromisifiedSymbol] = (foo) => {
  return new Promise((resolve, reject) => {
    doSomething(foo, resolve, reject);
  });
};
```

## `util.stripVTControlCharacters(str)`

<!-- YAML
added: v16.11.0
-->

* `str` {字符串}
* 返回：{字符串}

返回移除了任何 ANSI 转义码的 `str`。

```js
console.log(util.stripVTControlCharacters('\u001B[4mvalue\u001B[0m'));
// 打印 "value"
```

## `util.styleText(format, text[, options])`

<!-- YAML
added:
  - v21.7.0
  - v20.12.0
changes:
  - version: REPLACEME
    pr-url: https://github.com/nodejs/node/pull/61556
    description: Add support for hexadecimal colors.
  - version:
      - v24.2.0
      - v22.17.0
    pr-url: https://github.com/nodejs/node/pull/58437
    description: "添加了 `'none'` 格式作为无操作格式。"
  - version:
    - v23.5.0
    - v22.13.0
    pr-url: https://github.com/nodejs/node/pull/56265
    description: styleText 现在是稳定的。
  - version:
    - v22.8.0
    - v20.18.0
    pr-url: https://github.com/nodejs/node/pull/54389
    description: 尊重 isTTY 和环境变量，例如 NO_COLOR、NODE_DISABLE_COLORS 和 FORCE_COLOR。
-->

* `format` {string | Array} A text format or an Array
  of text formats defined in `util.inspect.colors`, or a hex color in `#RGB`
  or `#RRGGBB` form.
* `text` {string} The text to to be formatted.
* `options` {Object}
  * `validateStream` {boolean} When true, `stream` is checked to see if it can handle colors. **Default:** `true`.
  * `stream` {Stream} A stream that will be validated if it can be colored. **Default:** `process.stdout`.

此函数返回考虑了传入的 `format` 用于在终端中打印的格式化文本。它知道终端的功能，并根据通过 `NO_COLOR`、`NODE_DISABLE_COLORS` 和 `FORCE_COLOR` 环境变量设置的配置行事。

```mjs
import { styleText } from 'node:util';
import { stderr } from 'node:process';

const successMessage = styleText('green', 'Success!');
console.log(successMessage);

const errorMessage = styleText(
  'red',
  'Error! Error!',
  // 验证 process.stderr 是否有 TTY
  { stream: stderr },
);
console.error(errorMessage);
```

```cjs
const { styleText } = require('node:util');
const { stderr } = require('node:process');

const successMessage = styleText('green', 'Success!');
console.log(successMessage);

const errorMessage = styleText(
  'red',
  'Error! Error!',
  // 验证 process.stderr 是否有 TTY
  { stream: stderr },
);
console.error(errorMessage);
```

`util.inspect.colors` 还提供文本格式，如 `italic` 和 `underline`，你可以组合使用：

```cjs
console.log(
  util.styleText(['underline', 'italic'], 'My italic underlined message'),
);
```

当传递格式数组时，格式应用的顺序是从左到右，因此以下样式可能会覆盖前一个样式。

```cjs
console.log(
  util.styleText(['red', 'green'], 'text'), // 绿色
);
```

特殊格式值 `none` 不对文本应用额外样式。

In addition to predefined color names, `util.styleText()` supports hex color
strings using ANSI TrueColor (24-bit) escape sequences. Hex colors can be
specified in either 3-digit (`#RGB`) or 6-digit (`#RRGGBB`) format:

```mjs
import { styleText } from 'node:util';

// 6-digit hex color
console.log(styleText('#ff5733', 'Orange text'));

// 3-digit hex color (shorthand)
console.log(styleText('#f00', 'Red text'));
```

```cjs
const { styleText } = require('node:util');

// 6-digit hex color
console.log(styleText('#ff5733', 'Orange text'));

// 3-digit hex color (shorthand)
console.log(styleText('#f00', 'Red text'));
```

The full list of formats can be found in [modifiers][].

## 类：`util.TextDecoder`

<!-- YAML
added: v8.3.0
changes:
  - version: v11.0.0
    pr-url: https://github.com/nodejs/node/pull/22281
    description: 该类现在在全局对象上可用。
-->

[WHATWG 编码标准][] `TextDecoder` API 的实现。

```js
const decoder = new TextDecoder();
const u8arr = new Uint8Array([72, 101, 108, 108, 111]);
console.log(decoder.decode(u8arr)); // Hello
```

### WHATWG 支持的编码

根据 [WHATWG 编码标准][]，`TextDecoder` API 支持的编码在下表中列出。对于每种编码，可以使用一个或多个别名。

不同的 Node.js 构建配置支持不同的编码集。（参见 [国际化][]）

#### 默认支持的编码（带有完整 ICU 数据）

| 编码               | 别名                                                                                                                                                                                                                             |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'ibm866'`         | `'866'`, `'cp866'`, `'csibm866'`                                                                                                                                                                                                    |
| `'iso-8859-2'`     | `'csisolatin2'`, `'iso-ir-101'`, `'iso8859-2'`, `'iso88592'`, `'iso_8859-2'`, `'iso_8859-2:1987'`, `'l2'`, `'latin2'`                                                                                                               |
| `'iso-8859-3'`     | `'csisolatin3'`, `'iso-ir-109'`, `'iso8859-3'`, `'iso88593'`, `'iso_8859-3'`, `'iso_8859-3:1988'`, `'l3'`, `'latin3'`                                                                                                               |
| `'iso-8859-4'`     | `'csisolatin4'`, `'iso-ir-110'`, `'iso8859-4'`, `'iso88594'`, `'iso_8859-4'`, `'iso_8859-4:1988'`, `'l4'`, `'latin4'`                                                                                                               |
| `'iso-8859-5'`     | `'csisolatincyrillic'`, `'cyrillic'`, `'iso-ir-144'`, `'iso8859-5'`, `'iso88595'`, `'iso_8859-5'`, `'iso_8859-5:1988'`                                                                                                              |
| `'iso-8859-6'`     | `'arabic'`, `'asmo-708'`, `'csiso88596e'`, `'csiso88596i'`, `'csisolatinarabic'`, `'ecma-114'`, `'iso-8859-6-e'`, `'iso-8859-6-i'`, `'iso-ir-127'`, `'iso8859-6'`, `'iso88596'`, `'iso_8859-6'`, `'iso_8859-6:1987'`                |
| `'iso-8859-7'`     | `'csisolatingreek'`, `'ecma-118'`, `'elot_928'`, `'greek'`, `'greek8'`, `'iso-ir-126'`, `'iso8859-7'`, `'iso88597'`, `'iso_8859-7'`, `'iso_8859-7:1987'`, `'sun_eu_greek'`                                                          |
| `'iso-8859-8'`     | `'csiso88598e'`, `'csisolatinhebrew'`, `'hebrew'`, `'iso-8859-8-e'`, `'iso-ir-138'`, `'iso8859-8'`, `'iso88598'`, `'iso_8859-8'`, `'iso_8859-8:1988'`, `'visual'`                                                                   |
| `'iso-8859-8-i'`   | `'csiso88598i'`, `'logical'`                                                                                                                                                                                                        |
| `'iso-8859-10'`    | `'csisolatin6'`, `'iso-ir-157'`, `'iso8859-10'`, `'iso885910'`, `'l6'`, `'latin6'`                                                                                                                                                  |
| `'iso-8859-13'`    | `'iso8859-13'`, `'iso885913'`                                                                                                                                                                                                       |
| `'iso-8859-14'`    | `'iso8859-14'`, `'iso885914'`                                                                                                                                                                                                       |
| `'iso-8859-15'`    | `'csisolatin9'`, `'iso8859-15'`, `'iso885915'`, `'iso_8859-15'`, `'l9'`                                                                                                                                                             |
| `'koi8-r'`         | `'cskoi8r'`, `'koi'`, `'koi8'`, `'koi8_r'`                                                                                                                                                                                          |
| `'koi8-u'`         | `'koi8-ru'`                                                                                                                                                                                                                         |
| `'macintosh'`      | `'csmacintosh'`, `'mac'`, `'x-mac-roman'`                                                                                                                                                                                           |
| `'windows-874'`    | `'dos-874'`, `'iso-8859-11'`, `'iso8859-11'`, `'iso885911'`, `'tis-620'`                                                                                                                                                            |
| `'windows-1250'`   | `'cp1250'`, `'x-cp1250'`                                                                                                                                                                                                            |
| `'windows-1251'`   | `'cp1251'`, `'x-cp1251'`                                                                                                                                                                                                            |
| `'windows-1252'`   | `'ansi_x3.4-1968'`, `'ascii'`, `'cp1252'`, `'cp819'`, `'csisolatin1'`, `'ibm819'`, `'iso-8859-1'`, `'iso-ir-100'`, `'iso8859-1'`, `'iso88591'`, `'iso_8859-1'`, `'iso_8859-1:1987'`, `'l1'`, `'latin1'`, `'us-ascii'`, `'x-cp1252'` |
| `'windows-1253'`   | `'cp1253'`, `'x-cp1253'`                                                                                                                                                                                                            |
| `'windows-1254'`   | `'cp1254'`, `'csisolatin5'`, `'iso-8859-9'`, `'iso-ir-148'`, `'iso8859-9'`, `'iso88599'`, `'iso_8859-9'`, `'iso_8859-9:1989'`, `'l5'`, `'latin5'`, `'x-cp1254'`                                                                     |
| `'windows-1255'`   | `'cp1255'`, `'x-cp1255'`                                                                                                                                                                                                            |
| `'windows-1256'`   | `'cp1256'`, `'x-cp1256'`                                                                                                                                                                                                            |
| `'windows-1257'`   | `'cp1257'`, `'x-cp1257'`                                                                                                                                                                                                            |
| `'windows-1258'`   | `'cp1258'`, `'x-cp1258'`                                                                                                                                                                                                            |
| `'x-mac-cyrillic'` | `'x-mac-ukrainian'`                                                                                                                                                                                                                 |
| `'gbk'`            | `'chinese'`, `'csgb2312'`, `'csiso58gb231280'`, `'gb2312'`, `'gb_2312'`, `'gb_2312-80'`, `'iso-ir-58'`, `'x-gbk'`                                                                                                                   |
| `'gb18030'`        |                                                                                                                                                                                                                                     |
| `'big5'`           | `'big5-hkscs'`, `'cn-big5'`, `'csbig5'`, `'x-x-big5'`                                                                                                                                                                               |
| `'euc-jp'`         | `'cseucpkdfmtjapanese'`, `'x-euc-jp'`                                                                                                                                                                                               |
| `'iso-2022-jp'`    | `'csiso2022jp'`                                                                                                                                                                                                                     |
| `'shift_jis'`      | `'csshiftjis'`, `'ms932'`, `'ms_kanji'`, `'shift-jis'`, `'sjis'`, `'windows-31j'`, `'x-sjis'`                                                                                                                                       |
| `'euc-kr'`         | `'cseuckr'`, `'csksc56011987'`, `'iso-ir-149'`, `'korean'`, `'ks_c_5601-1987'`, `'ks_c_5601-1989'`, `'ksc5601'`, `'ksc_5601'`, `'windows-949'`                                                                                      |

#### 当 Node.js 使用 `small-icu` 选项构建时支持的编码

| 编码         | 别名                          |
| ------------ | ------------------------------- |
| `'utf-8'`    | `'unicode-1-1-utf-8'`, `'utf8'` |
| `'utf-16le'` | `'utf-16'`                      |
| `'utf-16be'` |                                 |

#### 当 ICU 被禁用时支持的编码

| 编码         | 别名                          |
| ------------ | ------------------------------- |
| `'utf-8'`    | `'unicode-1-1-utf-8'`, `'utf8'` |
| `'utf-16le'` | `'utf-16'`                      |

[WHATWG 编码标准][] 中列出的 `'iso-8859-16'` 编码不受支持。

### `new TextDecoder([encoding[, options]])`

* `encoding` {字符串} 标识此 `TextDecoder` 实例支持的 `encoding`。**默认：** `'utf-8'`。
* `options` {对象}
  * `fatal` {布尔值} 如果解码失败是致命的则为 `true`。当 ICU 被禁用时不支持此选项（参见 [国际化][]）。**默认：** `false`。
  * `ignoreBOM` {布尔值} 为 `true` 时，`TextDecoder` 将在解码结果中包含字节顺序标记。为 `false` 时，字节顺序标记将从输出中移除。此选项仅在 `encoding` 为 `'utf-8'`、`'utf-16be'` 或 `'utf-16le'` 时使用。**默认：** `false`。

创建一个新的 `TextDecoder` 实例。`encoding` 可以指定支持的编码之一或别名。

`TextDecoder` 类也可在全局对象上使用。

### `textDecoder.decode([input[, options]])`

* `input` {ArrayBuffer|DataView|TypedArray} 包含编码数据的 `ArrayBuffer`、`DataView` 或 `TypedArray` 实例。
* `options` {对象}
  * `stream` {布尔值} 如果预期有更多数据块则为 `true`。**默认：** `false`。
* 返回：{字符串}

解码 `input` 并返回一个字符串。如果 `options.stream` 为 `true`，出现在 `input` 末尾的任何不完整字节序列将在内部缓冲，并在下次调用 `textDecoder.decode()` 后发出。

如果 `textDecoder.fatal` 为 `true`，发生的解码错误将导致抛出 `TypeError`。

### `textDecoder.encoding`

* 类型：{字符串}

`TextDecoder` 实例支持的编码。

### `textDecoder.fatal`

* 类型：{布尔值}

如果解码错误导致抛出 `TypeError`，则值为 `true`。

### `textDecoder.ignoreBOM`

* 类型：{布尔值}

如果解码结果包含字节顺序标记，则值为 `true`。

## 类：`util.TextEncoder`

<!-- YAML
added: v8.3.0
changes:
  - version: v11.0.0
    pr-url: https://github.com/nodejs/node/pull/22281
    description: 该类现在可用于全局对象。
-->

[WHATWG 编码标准][] `TextEncoder` API 的实现。`TextEncoder` 的所有实例仅支持 UTF-8 编码。

```js
const encoder = new TextEncoder();
const uint8array = encoder.encode('this is some data');
```

`TextEncoder` 类也可用于全局对象。

### `textEncoder.encode([input])`

* `input` {string} 要编码的文本。**默认：** 空字符串。
* 返回：{Uint8Array}

UTF-8 编码 `input` 字符串并返回一个包含编码字节的 `Uint8Array`。

### `textEncoder.encodeInto(src, dest)`

<!-- YAML
added: v12.11.0
-->

* `src` {string} 要编码的文本。
* `dest` {Uint8Array} 用于保存编码结果的数组。
* 返回：{Object}
  * `read` {number} 已读取的 src 的 Unicode 代码单元。
  * `written` {number} 已写入的 dest 的 UTF-8 字节。

将 `src` 字符串 UTF-8 编码到 `dest` Uint8Array 并返回一个对象，其中包含读取的 Unicode 代码单元和写入的 UTF-8 字节。

```js
const encoder = new TextEncoder();
const src = 'this is some data';
const dest = new Uint8Array(10);
const { read, written } = encoder.encodeInto(src, dest);
```

### `textEncoder.encoding`

* 类型：{string}

`TextEncoder` 实例支持的编码。始终设置为 `'utf-8'`。

## `util.toUSVString(string)`

<!-- YAML
added:
  - v16.8.0
  - v14.18.0
-->

* `string` {string}

返回替换了任何代理码点（或等效地，任何未配对的代理代码单元）为 Unicode“替换字符”U+FFFD 后的 `string`。

## `util.transferableAbortController()`

<!-- YAML
added: v18.11.0
changes:
 - version:
    - v23.11.0
    - v22.15.0
   pr-url: https://github.com/nodejs/node/pull/57510
   description: 标记 API 为稳定。
-->

创建并返回一个 {AbortController} 实例，其 {AbortSignal} 被标记为可转移，并可与 `structuredClone()` 或 `postMessage()` 一起使用。

## `util.transferableAbortSignal(signal)`

<!-- YAML
added: v18.11.0
changes:
 - version:
    - v23.11.0
    - v22.15.0
   pr-url: https://github.com/nodejs/node/pull/57510
   description: 标记 API 为稳定。
-->

* `signal` {AbortSignal}
* 返回：{AbortSignal}

将给定的 {AbortSignal} 标记为可转移，以便它可以与 `structuredClone()` 和 `postMessage()` 一起使用。

```js
const signal = transferableAbortSignal(AbortSignal.timeout(100));
const channel = new MessageChannel();
channel.port2.postMessage(signal, [signal]);
```

## `util.aborted(signal, resource)`

<!-- YAML
added:
 - v19.7.0
 - v18.16.0
changes:
 - version:
   - v24.0.0
   - v22.16.0
   pr-url: https://github.com/nodejs/node/pull/57765
   description: 将此功能的稳定性索引从实验性更改为稳定。
-->

* `signal` {AbortSignal}
* `resource` {Object} 任何与可中止操作绑定且被弱引用的非空对象。
  如果 `resource` 在 `signal` 中止之前被垃圾回收，则 promise 保持 pending 状态，允许 Node.js 停止跟踪它。
  这有助于防止长时间运行或不可取消的操作中的内存泄漏。
* 返回：{Promise}

监听提供的 `signal` 上的中止事件，并返回一个在 `signal` 被中止时解析的 promise。
如果提供了 `resource`，它会弱引用操作关联的对象，
因此如果 `resource` 在 `signal` 中止之前被垃圾回收，
则返回的 promise 将保持 pending 状态。
这可以防止长时间运行或不可取消的操作中的内存泄漏。

```cjs
const { aborted } = require('node:util');

// 获取一个带有可中止信号的对象，例如自定义资源或操作。
const dependent = obtainSomethingAbortable();

// 将 `dependent` 作为资源传递，表示 promise 应该只在
// 信号中止时 `dependent` 仍在内存中才解析。
aborted(dependent.signal, dependent).then(() => {

  // 当 `dependent` 被中止时运行此代码。
  console.log('Dependent resource was aborted.');
});

// 模拟触发中止的事件。
dependent.on('event', () => {
  dependent.abort(); // 这将导致 `aborted` promise 解析。
});
```

```mjs
import { aborted } from 'node:util';

// 获取一个带有可中止信号的对象，例如自定义资源或操作。
const dependent = obtainSomethingAbortable();

// 将 `dependent` 作为资源传递，表示 promise 应该只在
// 信号中止时 `dependent` 仍在内存中才解析。
aborted(dependent.signal, dependent).then(() => {

  // 当 `dependent` 被中止时运行此代码。
  console.log('Dependent resource was aborted.');
});

// 模拟触发中止的事件。
dependent.on('event', () => {
  dependent.abort(); // 这将导致 `aborted` promise 解析。
});
```

## `util.types`

<!-- YAML
added: v10.0.0
changes:
  - version: v15.3.0
    pr-url: https://github.com/nodejs/node/pull/34055
    description: "作为 `require('util/types')` 暴露。"
-->

`util.types` 提供针对不同种类内置对象的类型检查。
与 `instanceof` 或 `Object.prototype.toString.call(value)` 不同，这些检查不检查对象可从 JavaScript 访问的属性（如它们的原型），并且通常具有调用 C++ 的开销。

结果通常不对值在 JavaScript 中暴露的属性或行为类型做出任何保证。它们主要用于更喜欢在 JavaScript 中进行类型检查的 addon 开发者。

该 API 可通过 `require('node:util').types` 或 `require('node:util/types')` 访问。

### `util.types.isAnyArrayBuffer(value)`

<!-- YAML
added: v10.0.0
-->

* `value` {any}
* 返回：{boolean}

如果值是内置 {ArrayBuffer} 或 {SharedArrayBuffer} 实例，则返回 `true`。

另见 [`util.types.isArrayBuffer()`][] 和 [`util.types.isSharedArrayBuffer()`][]。

```js
util.types.isAnyArrayBuffer(new ArrayBuffer());  // 返回 true
util.types.isAnyArrayBuffer(new SharedArrayBuffer());  // 返回 true
```

### `util.types.isArrayBufferView(value)`

<!-- YAML
added: v10.0.0
-->

* `value` {any}
* 返回：{boolean}

如果值是 {ArrayBuffer} 视图之一的实例，例如类型化数组对象或 {DataView}，则返回 `true`。等同于 [`ArrayBuffer.isView()`][]。

```js
util.types.isArrayBufferView(new Int8Array());  // true
util.types.isArrayBufferView(Buffer.from('hello world')); // true
util.types.isArrayBufferView(new DataView(new ArrayBuffer(16)));  // true
util.types.isArrayBufferView(new ArrayBuffer());  // false
```

### `util.types.isArgumentsObject(value)`

<!-- YAML
added: v10.0.0
-->

* `value` {any}
* 返回：{boolean}

如果值是 `arguments` 对象，则返回 `true`。

<!-- eslint-disable prefer-rest-params -->

```js
function foo() {
  util.types.isArgumentsObject(arguments);  // 返回 true
}
```

### `util.types.isArrayBuffer(value)`

<!-- YAML
added: v10.0.0
-->

* `value` {any}
* 返回：{boolean}

如果值是内置 {ArrayBuffer} 实例，则返回 `true`。
这_不_包括 {SharedArrayBuffer} 实例。通常，需要同时测试两者；参见 [`util.types.isAnyArrayBuffer()`][]。

```js
util.types.isArrayBuffer(new ArrayBuffer());  // 返回 true
util.types.isArrayBuffer(new SharedArrayBuffer());  // 返回 false
```

### `util.types.isAsyncFunction(value)`

<!-- YAML
added: v10.0.0
-->

* `value` {any}
* 返回：{boolean}

如果值是 [异步函数][]，则返回 `true`。
这仅报告 JavaScript 引擎所见的内容；
特别是，如果使用了转译工具，返回值可能与原始源代码不匹配。

```js
util.types.isAsyncFunction(function foo() {});  // 返回 false
util.types.isAsyncFunction(async function foo() {});  // 返回 true
```

### `util.types.isBigInt64Array(value)`

<!-- YAML
added: v10.0.0
-->

* `value` {any}
* 返回：{boolean}

如果值是 `BigInt64Array` 实例，则返回 `true`。

```js
util.types.isBigInt64Array(new BigInt64Array());   // 返回 true
util.types.isBigInt64Array(new BigUint64Array());  // 返回 false
```

### `util.types.isBigIntObject(value)`

<!-- YAML
added: v10.4.0
-->

* `value` {any}
* 返回：{boolean}

如果值是 BigInt 对象，例如由 `Object(BigInt(123))` 创建，则返回 `true`。

```js
util.types.isBigIntObject(Object(BigInt(123)));   // 返回 true
util.types.isBigIntObject(BigInt(123));   // 返回 false
util.types.isBigIntObject(123);  // 返回 false
```

### `util.types.isBigUint64Array(value)`

<!-- YAML
added: v10.0.0
-->

* `value` {any}
* 返回：{boolean}

如果值是 `BigUint64Array` 实例，则返回 `true`。

```js
util.types.isBigUint64Array(new BigInt64Array());   // 返回 false
util.types.isBigUint64Array(new BigUint64Array());  // 返回 true
```

### `util.types.isBooleanObject(value)`

<!-- YAML
added: v10.0.0
-->

* `value` {any}
* 返回：{boolean}

如果值是布尔对象，例如由 `new Boolean()` 创建，则返回 `true`。

```js
util.types.isBooleanObject(false);  // 返回 false
util.types.isBooleanObject(true);   // 返回 false
util.types.isBooleanObject(new Boolean(false)); // 返回 true
util.types.isBooleanObject(new Boolean(true));  // 返回 true
util.types.isBooleanObject(Boolean(false)); // 返回 false
util.types.isBooleanObject(Boolean(true));  // 返回 false
```

### `util.types.isBoxedPrimitive(value)`

<!-- YAML
added: v10.11.0
-->

* `value` {any}
* 返回：{boolean}

如果值是任何装箱原始对象，例如由 `new Boolean()`、`new String()` 或 `Object(Symbol())` 创建，则返回 `true`。

例如：

```js
util.types.isBoxedPrimitive(false); // 返回 false
util.types.isBoxedPrimitive(new Boolean(false)); // 返回 true
util.types.isBoxedPrimitive(Symbol('foo')); // 返回 false
util.types.isBoxedPrimitive(Object(Symbol('foo'))); // 返回 true
util.types.isBoxedPrimitive(Object(BigInt(5))); // 返回 true
```

### `util.types.isCryptoKey(value)`

<!-- YAML
added: v16.2.0
-->

* `value` {Object}
* 返回：{boolean}

如果 `value` 是 {CryptoKey}，则返回 `true`，否则返回 `false`。

### `util.types.isDataView(value)`

<!-- YAML
added: v10.0.0
-->

* `value` {any}
* 返回：{boolean}

如果值是内置 {DataView} 实例，则返回 `true`。

```js
const ab = new ArrayBuffer(20);
util.types.isDataView(new DataView(ab));  // 返回 true
util.types.isDataView(new Float64Array());  // 返回 false
```

另见 [`ArrayBuffer.isView()`][]。

### `util.types.isDate(value)`

<!-- YAML
added: v10.0.0
-->

* `value` {any}
* 返回：{boolean}

如果值是内置 {Date} 实例，则返回 `true`。

```js
util.types.isDate(new Date());  // 返回 true
```

### `util.types.isExternal(value)`

<!-- YAML
added: v10.0.0
-->

* `value` {any}
* 返回：{boolean}

如果值是原生 `External` 值，则返回 `true`。

原生 `External` 值是一种特殊类型的对象，包含一个用于原生代码访问的原始 C++ 指针 (`void*`)，没有其他属性。此类对象由 Node.js 内部或原生 addon 创建。在 JavaScript 中，它们是带有 `null` 原型的 [冻结][`Object.freeze()`] 对象。

```c
#include <js_native_api.h>
#include <stdlib.h>
napi_value result;
static napi_value MyNapi(napi_env env, napi_callback_info info) {
  int* raw = (int*) malloc(1024);
  napi_status status = napi_create_external(env, (void*) raw, NULL, NULL, &result);
  if (status != napi_ok) {
    napi_throw_error(env, NULL, "napi_create_external failed");
    return NULL;
  }
  return result;
}
...
DECLARE_NAPI_PROPERTY("myNapi", MyNapi)
...
```

```mjs
import native from 'napi_addon.node';
import { types } from 'node:util';

const data = native.myNapi();
types.isExternal(data); // 返回 true
types.isExternal(0); // 返回 false
types.isExternal(new String('foo')); // 返回 false
```

```cjs
const native = require('napi_addon.node');
const { types } = require('node:util');

const data = native.myNapi();
types.isExternal(data); // 返回 true
types.isExternal(0); // 返回 false
types.isExternal(new String('foo')); // 返回 false
```

有关 `napi_create_external` 的更多信息，请参阅 [`napi_create_external()`][]。

### `util.types.isFloat16Array(value)`

<!-- YAML
added:
 - v24.0.0
 - v22.16.0
-->

* `value` {any}
* 返回：{boolean}

如果值是内置 {Float16Array} 实例，则返回 `true`。

```js
util.types.isFloat16Array(new ArrayBuffer());  // 返回 false
util.types.isFloat16Array(new Float16Array());  // 返回 true
util.types.isFloat16Array(new Float32Array());  // 返回 false
```

### `util.types.isFloat32Array(value)`

<!-- YAML
added: v10.0.0
-->

* `value` {any}
* 返回：{boolean}

如果值是内置 {Float32Array} 实例，则返回 `true`。

```js
util.types.isFloat32Array(new ArrayBuffer());  // 返回 false
util.types.isFloat32Array(new Float32Array());  // 返回 true
util.types.isFloat32Array(new Float64Array());  // 返回 false
```

### `util.types.isFloat64Array(value)`

<!-- YAML
added: v10.0.0
-->

* `value` {any}
* 返回：{boolean}

如果值是内置 {Float64Array} 实例，则返回 `true`。

```js
util.types.isFloat64Array(new ArrayBuffer());  // 返回 false
util.types.isFloat64Array(new Uint8Array());  // 返回 false
util.types.isFloat64Array(new Float64Array());  // 返回 true
```

### `util.types.isGeneratorFunction(value)`

<!-- YAML
added: v10.0.0
-->

* `value` {any}
* 返回：{boolean}

如果值是生成器函数，则返回 `true`。
这仅报告 JavaScript 引擎所见的内容；
特别是，如果使用了转译工具，返回值可能与原始源代码不匹配。

```js
util.types.isGeneratorFunction(function foo() {});  // 返回 false
util.types.isGeneratorFunction(function* foo() {});  // 返回 true
```

### `util.types.isGeneratorObject(value)`

<!-- YAML
added: v10.0.0
-->

* `value` {any}
* 返回：{boolean}

如果值是内置生成器函数返回的生成器对象，则返回 `true`。
这仅报告 JavaScript 引擎所见的内容；
特别是，如果使用了转译工具，返回值可能与原始源代码不匹配。

```js
function* foo() {}
const generator = foo();
util.types.isGeneratorObject(generator);  // 返回 true
```

### `util.types.isInt8Array(value)`

<!-- YAML
added: v10.0.0
-->

* `value` {any}
* 返回：{boolean}

如果值是内置 {Int8Array} 实例，则返回 `true`。

```js
util.types.isInt8Array(new ArrayBuffer());  // 返回 false
util.types.isInt8Array(new Int8Array());  // 返回 true
util.types.isInt8Array(new Float64Array());  // 返回 false
```

### `util.types.isInt16Array(value)`

<!-- YAML
added: v10.0.0
-->

* `value` {any}
* 返回：{boolean}

如果值是内置 {Int16Array} 实例，则返回 `true`。

```js
util.types.isInt16Array(new ArrayBuffer());  // 返回 false
util.types.isInt16Array(new Int16Array());  // 返回 true
util.types.isInt16Array(new Float64Array());  // 返回 false
```

### `util.types.isInt32Array(value)`

<!-- YAML
added: v10.0.0
-->

* `value` {any}
* 返回：{boolean}

如果值是内置 {Int32Array} 实例，则返回 `true`。

```js
util.types.isInt32Array(new ArrayBuffer());  // 返回 false
util.types.isInt32Array(new Int32Array());  // 返回 true
util.types.isInt32Array(new Float64Array());  // 返回 false
```

### `util.types.isKeyObject(value)`

<!-- YAML
added: v16.2.0
-->

* `value` {Object}
* 返回：{boolean}

如果 `value` 是 {KeyObject}，则返回 `true`，否则返回 `false`。

### `util.types.isMap(value)`

<!-- YAML
added: v10.0.0
-->

* `value` {any}
* 返回：{boolean}

如果值是内置 {Map} 实例，则返回 `true`。

```js
util.types.isMap(new Map());  // 返回 true
```

### `util.types.isMapIterator(value)`

<!-- YAML
added: v10.0.0
-->

* `value` {any}
* 返回：{boolean}

如果值是为内置 {Map} 实例返回的迭代器，则返回 `true`。

```js
const map = new Map();
util.types.isMapIterator(map.keys());  // 返回 true
util.types.isMapIterator(map.values());  // 返回 true
util.types.isMapIterator(map.entries());  // 返回 true
util.types.isMapIterator(map[Symbol.iterator]());  // 返回 true
```

### `util.types.isModuleNamespaceObject(value)`

<!-- YAML
added: v10.0.0
-->

* `value` {any}
* 返回：{boolean}

如果值是 [模块命名空间对象][] 的实例，则返回 `true`。

```mjs
import * as ns from './a.js';

util.types.isModuleNamespaceObject(ns);  // 返回 true
```

### `util.types.isNativeError(value)`

<!-- YAML
added: v10.0.0
deprecated: v24.2.0
-->

> 稳定性：0 - 已弃用：请改用 [`Error.isError`][]。

**注意：** 截至 Node.js 24，`Error.isError()` 目前比 `util.types.isNativeError()` 慢。
如果性能至关重要，请考虑在你的环境中对两者进行基准测试。

* `value` {any}
* 返回：{boolean}

如果值是由 [内置 `Error` 类型][] 的构造函数返回的，则返回 `true`。

```js
console.log(util.types.isNativeError(new Error()));  // true
console.log(util.types.isNativeError(new TypeError()));  // true
console.log(util.types.isNativeError(new RangeError()));  // true
```

原生错误类型的子类也是原生错误：

```js
class MyError extends Error {}
console.log(util.types.isNativeError(new MyError()));  // true
```

值是原生错误类的 `instanceof` 并不等同于 `isNativeError()` 对该值返回 `true`。`isNativeError()` 对来自不同 [域][] 的错误返回 `true`，而 `instanceof Error` 对这些错误返回 `false`：

```mjs
import { createContext, runInContext } from 'node:vm';
import { types } from 'node:util';

const context = createContext({});
const myError = runInContext('new Error()', context);
console.log(types.isNativeError(myError)); // true
console.log(myError instanceof Error); // false
```

```cjs
const { createContext, runInContext } = require('node:vm');
const { types } = require('node:util');

const context = createContext({});
const myError = runInContext('new Error()', context);
console.log(types.isNativeError(myError)); // true
console.log(myError instanceof Error); // false
```

相反，`isNativeError()` 对所有不是由原生错误构造函数返回的对象返回 `false`。这包括那些是原生错误 `instanceof` 的值：

```js
const myError = { __proto__: Error.prototype };
console.log(util.types.isNativeError(myError)); // false
console.log(myError instanceof Error); // true
```

### `util.types.isNumberObject(value)`

<!-- YAML
added: v10.0.0
-->

* `value` {any}
* 返回：{boolean}

如果值是数字对象，例如由 `new Number()` 创建，则返回 `true`。

```js
util.types.isNumberObject(0);  // 返回 false
util.types.isNumberObject(new Number(0));   // 返回 true
```

### `util.types.isPromise(value)`

<!-- YAML
added: v10.0.0
-->

* `value` {any}
* 返回：{boolean}

如果值是内置 {Promise}，则返回 `true`。

```js
util.types.isPromise(Promise.resolve(42));  // 返回 true
```

### `util.types.isProxy(value)`

<!-- YAML
added: v10.0.0
-->

* `value` {any}
* 返回：{boolean}

如果值是 {Proxy} 实例，则返回 `true`。

```js
const target = {};
const proxy = new Proxy(target, {});
util.types.isProxy(target);  // 返回 false
util.types.isProxy(proxy);  // 返回 true
```

### `util.types.isRegExp(value)`

<!-- YAML
added: v10.0.0
-->

* `value` {any}
* 返回：{boolean}

如果值是正则表达式对象，则返回 `true`。

```js
util.types.isRegExp(/abc/);  // 返回 true
util.types.isRegExp(new RegExp('abc'));  // 返回 true
```

### `util.types.isSet(value)`

<!-- YAML
added: v10.0.0
-->

* `value` {any}
* 返回：{boolean}

如果值是内置 {Set} 实例，则返回 `true`。

```js
util.types.isSet(new Set());  // 返回 true
```

### `util.types.isSetIterator(value)`

<!-- YAML
added: v10.0.0
-->

* `value` {any}
* 返回：{boolean}

如果值是为内置 {Set} 实例返回的迭代器，则返回 `true`。

```js
const set = new Set();
util.types.isSetIterator(set.keys());  // 返回 true
util.types.isSetIterator(set.values());  // 返回 true
util.types.isSetIterator(set.entries());  // 返回 true
util.types.isSetIterator(set[Symbol.iterator]());  // 返回 true
```

### `util.types.isSharedArrayBuffer(value)`

<!-- YAML
added: v10.0.0
-->

* `value` {any}
* 返回：{boolean}

如果值是内置 {SharedArrayBuffer} 实例，则返回 `true`。
这_不_包括 {ArrayBuffer} 实例。通常，需要同时测试两者；参见 [`util.types.isAnyArrayBuffer()`][]。

```js
util.types.isSharedArrayBuffer(new ArrayBuffer());  // 返回 false
util.types.isSharedArrayBuffer(new SharedArrayBuffer());  // 返回 true
```

### `util.types.isStringObject(value)`

<!-- YAML
added: v10.0.0
-->

* `value` {any}
* 返回：{boolean}

如果值是字符串对象，例如由 `new String()` 创建，则返回 `true`。

```js
util.types.isStringObject('foo');  // 返回 false
util.types.isStringObject(new String('foo'));   // 返回 true
```

### `util.types.isSymbolObject(value)`

<!-- YAML
added: v10.0.0
-->

* `value` {any}
* 返回：{boolean}

如果值是符号对象，通过对 `Symbol` 原始值调用 `Object()` 创建，则返回 `true`。

```js
const symbol = Symbol('foo');
util.types.isSymbolObject(symbol);  // 返回 false
util.types.isSymbolObject(Object(symbol));   // 返回 true
```

### `util.types.isTypedArray(value)`

<!-- YAML
added: v10.0.0
-->

* `value` {any}
* 返回：{boolean}

如果值是内置 {TypedArray} 实例，则返回 `true`。

```js
util.types.isTypedArray(new ArrayBuffer());  // 返回 false
util.types.isTypedArray(new Uint8Array());  // 返回 true
util.types.isTypedArray(new Float64Array());  // 返回 true
```

另见 [`ArrayBuffer.isView()`][]。

### `util.types.isUint8Array(value)`

<!-- YAML
added: v10.0.0
-->

* `value` {any}
* 返回：{boolean}

如果值是内置 {Uint8Array} 实例，则返回 `true`。

```js
util.types.isUint8Array(new ArrayBuffer());  // 返回 false
util.types.isUint8Array(new Uint8Array());  // 返回 true
util.types.isUint8Array(new Float64Array());  // 返回 false
```

### `util.types.isUint8ClampedArray(value)`

<!-- YAML
added: v10.0.0
-->

* `value` {any}
* 返回：{boolean}

如果值是内置 {Uint8ClampedArray} 实例，则返回 `true`。

```js
util.types.isUint8ClampedArray(new ArrayBuffer());  // 返回 false
util.types.isUint8ClampedArray(new Uint8ClampedArray());  // 返回 true
util.types.isUint8ClampedArray(new Float64Array());  // 返回 false
```

### `util.types.isUint16Array(value)`

<!-- YAML
added: v10.0.0
-->

* `value` {any}
* 返回：{boolean}

如果值是内置 {Uint16Array} 实例，则返回 `true`。

```js
util.types.isUint16Array(new ArrayBuffer());  // 返回 false
util.types.isUint16Array(new Uint16Array());  // 返回 true
util.types.isUint16Array(new Float64Array());  // 返回 false
```

### `util.types.isUint32Array(value)`

<!-- YAML
added: v10.0.0
-->

* `value` {any}
* 返回：{boolean}

如果值是内置 {Uint32Array} 实例，则返回 `true`。

```js
util.types.isUint32Array(new ArrayBuffer());  // 返回 false
util.types.isUint32Array(new Uint32Array());  // 返回 true
util.types.isUint32Array(new Float64Array());  // 返回 false
```

### `util.types.isWeakMap(value)`

<!-- YAML
added: v10.0.0
-->

* `value` {any}
* 返回：{boolean}

如果值是内置 {WeakMap} 实例，则返回 `true`。

```js
util.types.isWeakMap(new WeakMap());  // 返回 true
```

### `util.types.isWeakSet(value)`

<!-- YAML
added: v10.0.0
-->

* `value` {any}
* 返回：{boolean}

如果值是内置 {WeakSet} 实例，则返回 `true`。

```js
util.types.isWeakSet(new WeakSet());  // 返回 true
```

## 已弃用的 API

以下 API 已弃用，不应再使用。现有的应用程序和模块应更新以寻找替代方案。

### `util._extend(target, source)`

<!-- YAML
added: v0.7.5
deprecated: v6.0.0
-->

> 稳定性：0 - 已弃用：请改用 [`Object.assign()`][]。

* `target` {Object}
* `source` {Object}

`util._extend()` 方法从未打算在内部 Node.js 模块之外使用。但社区还是发现并使用了它。

它已弃用，不应在新代码中使用。JavaScript 通过 [`Object.assign()`][] 提供了非常类似的内置功能。

提供自动迁移工具（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/util-extend-to-object-assign)）：

```bash
npx codemod@latest @nodejs/util-extend-to-object-assign
```

### `util.isArray(object)`

<!-- YAML
added: v0.6.0
deprecated: v4.0.0
-->

> 稳定性：0 - 已弃用：请改用 [`Array.isArray()`][]。

* `object` {any}
* 返回值：{boolean}

[`Array.isArray()`][] 的别名。

如果给定的 `object` 是 `Array`，则返回 `true`。否则，返回 `false`。

```js
const util = require('node:util');

util.isArray([]);
// 返回值：true
util.isArray(new Array());
// 返回值：true
util.isArray({});
// 返回值：false
```

提供自动迁移工具（[来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/util-is)）：

```bash
npx codemod@latest @nodejs/util-is
```

[常见系统错误]: errors.md#common-system-errors
[对象上的自定义检查函数]: #custom-inspection-functions-on-objects
[自定义 Promise 化函数]: #custom-promisified-functions
[自定义 `util.inspect` 颜色]: #customizing-utilinspect-colors
[国际化]: intl.md
[模块命名空间对象]: https://tc39.github.io/ecma262/#sec-module-namespace-exotic-objects
[WHATWG 编码标准]: https://encoding.spec.whatwg.org/
[`'uncaughtException'`]: process.md#event-uncaughtexception
[`'warning'`]: process.md#event-warning
[`Array.isArray()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
[`ArrayBuffer.isView()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/isView
[`Error.isError`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/isError
[`JSON.stringify()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
[`MIMEparams`]: #class-utilmimeparams
[`Object.assign()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
[`Object.freeze()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
[`Runtime.ScriptId`]: https://chromedevtools.github.io/devtools-protocol/1-3/Runtime/#type-ScriptId
[`assert.deepStrictEqual()`]: assert.md#assertdeepstrictequalactual-expected-message
[`console.error()`]: console.md#consoleerrordata-args
[`mime.toString()`]: #mimetostring
[`mimeParams.entries()`]: #mimeparamsentries
[`napi_create_external()`]: n-api.md#napi_create_external
[`signal(7)`]: https://man7.org/linux/man-pages/man7/signal.7.html
[`target` 和 `handler`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy#terminology
[`tty.hasColors()`]: tty.md#writestreamhascolorscount-env
[`util.diff()`]: #utildiffactual-expected
[`util.format()`]: #utilformatformat-args
[`util.inspect()`]: #utilinspectobject-options
[`util.promisify()`]: #utilpromisifyoriginal
[`util.types.isAnyArrayBuffer()`]: #utiltypesisanyarraybuffervalue
[`util.types.isArrayBuffer()`]: #utiltypesisarraybuffervalue
[`util.types.isSharedArrayBuffer()`]: #utiltypesissharedarraybuffervalue
[异步函数]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
[内置 `Error` 类型]: https://tc39.es/ecma262/#sec-error-objects
[比较函数]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#parameters
[构造函数]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor
[默认排序]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
[全局符号注册表]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/for
[已弃用 API 列表]: deprecations.md#list-of-deprecated-apis
[修饰符]: #modifiers
[领域]: https://tc39.es/ecma262/#realm
[语义不兼容]: https://github.com/nodejs/node/issues/4179
[util.inspect.custom]: #utilinspectcustom
