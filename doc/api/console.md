# 控制台

<!--introduced_in=v0.10.13-->

> 稳定性：2 - 稳定

<!-- source_link=lib/console.js -->

`node:console` 模块提供一个简单的调试控制台，类似于网页浏览器提供的 JavaScript 控制台机制。

该模块导出两个特定组件：

* 一个 `Console` 类，具有 `console.log()`、`console.error()` 和 `console.warn()` 等方法，可用于写入任何 Node.js 流。
* 一个配置为写入 [`process.stdout`][] 和 [`process.stderr`][] 的全局 `console` 实例。全局 `console` 无需调用 `require('node:console')` 即可使用。

_**警告**_：全局 console 对象的方法既不像它们相似的浏览器 API 那样一致同步，也不像所有其他 Node.js 流那样一致异步。希望依赖 console 函数同步/异步行为的程序应首先确定 console 后备流的性质。这是因为流取决于底层平台和当前进程的标准流配置。有关更多信息，请参阅 [关于进程 I/O 的说明][]。

使用全局 `console` 的示例：

```js
console.log('hello world');
// 打印：hello world，到 stdout
console.log('hello %s', 'world');
// 打印：hello world，到 stdout
console.error(new Error('Whoops, something bad happened'));
// 打印错误消息和堆栈跟踪到 stderr：
//   Error: Whoops, something bad happened
//     at [eval]:5:15
//     at Script.runInThisContext (node:vm:132:18)
//     at Object.runInThisContext (node:vm:309:38)
//     at node:internal/process/execution:77:19
//     at [eval]-wrapper:6:22
//     at evalScript (node:internal/process/execution:76:60)
//     at node:internal/main/eval_string:23:3

const name = 'Will Robinson';
console.warn(`Danger ${name}! Danger!`);
// 打印：Danger Will Robinson! Danger!，到 stderr
```

使用 `Console` 类的示例：

```js
const out = getStreamSomehow();
const err = getStreamSomehow();
const myConsole = new console.Console(out, err);

myConsole.log('hello world');
// 打印：hello world，到 out
myConsole.log('hello %s', 'world');
// 打印：hello world，到 out
myConsole.error(new Error('Whoops, something bad happened'));
// 打印：[Error: Whoops, something bad happened]，到 err

const name = 'Will Robinson';
myConsole.warn(`Danger ${name}! Danger!`);
// 打印：Danger Will Robinson! Danger!，到 err
```

## 类：`Console`

<!-- YAML
changes:
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/9744
    description: 写入底层流时发生的错误现在默认将被忽略。
-->

<!--type=class-->

`Console` 类可用于创建具有可配置输出流的简单日志记录器，可以通过 `require('node:console').Console` 或 `console.Console`（或它们的解构对应项）访问：

```mjs
import { Console } from 'node:console';
```

```cjs
const { Console } = require('node:console');
```

```js
const { Console } = console;
```

### `new Console(stdout[, stderr][, ignoreErrors])`

### `new Console(options)`

<!-- YAML
changes:
  - version: v24.10.0
    pr-url: https://github.com/nodejs/node/pull/60082
    description: `inspectOptions` 选项可以是从流到选项的 `Map`。
  - version:
     - v14.2.0
     - v12.17.0
    pr-url: https://github.com/nodejs/node/pull/32964
    description: 引入了 `groupIndentation` 选项。
  - version: v11.7.0
    pr-url: https://github.com/nodejs/node/pull/24978
    description: 引入了 `inspectOptions` 选项。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/19372
    description: `Console` 构造函数现在支持 `options` 参数，并引入了 `colorMode` 选项。
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/9744
    description: 引入了 `ignoreErrors` 选项。
-->

* `options` {Object}
  * `stdout` {stream.Writable}
  * `stderr` {stream.Writable}
  * `ignoreErrors` {boolean} 写入底层流时忽略错误。**默认值：** `true`。
  * `colorMode` {boolean|string} 为此 `Console` 实例设置颜色支持。设置为 `true` 可在检查值时启用着色。设置为 `false` 可在检查值时禁用着色。设置为 `'auto'` 使颜色支持取决于相应流的 `isTTY` 属性值和 `getColorDepth()` 返回的值。如果同时设置了 `inspectOptions.colors`，则不能使用此选项。**默认值：** `'auto'`。
  * `inspectOptions` {Object|Map} 指定传递给 [`util.inspect()`][] 的选项。可以是一个选项对象，或者如果希望 stdout 和 stderr 使用不同的选项，则可以是一个从流对象到选项的 `Map`。
  * `groupIndentation` {number} 设置组缩进。**默认值：** `2`。

创建一个带有一个或两个可写流实例的新 `Console`。`stdout` 是一个可写流，用于打印日志或信息输出。`stderr` 用于警告或错误输出。如果未提供 `stderr`，则 `stdout` 用于 `stderr`。

```mjs
import { createWriteStream } from 'node:fs';
import { Console } from 'node:console';
// 或者
// const { Console } = console;

const output = createWriteStream('./stdout.log');
const errorOutput = createWriteStream('./stderr.log');
// 自定义简单日志记录器
const logger = new Console({ stdout: output, stderr: errorOutput });
// 像 console 一样使用它
const count = 5;
logger.log('count: %d', count);
// 在 stdout.log 中：count 5
```

```cjs
const fs = require('node:fs');
const { Console } = require('node:console');
// 或者
// const { Console } = console;

const output = fs.createWriteStream('./stdout.log');
const errorOutput = fs.createWriteStream('./stderr.log');
// 自定义简单日志记录器
const logger = new Console({ stdout: output, stderr: errorOutput });
// 像 console 一样使用它
const count = 5;
logger.log('count: %d', count);
// 在 stdout.log 中：count 5
```

全局 `console` 是一个特殊的 `Console`，其输出发送到 [`process.stdout`][] 和 [`process.stderr`][]。它等同于调用：

```js
new Console({ stdout: process.stdout, stderr: process.stderr });
```

### `console.assert(value[, ...message])`

<!-- YAML
added: v0.1.101
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/17706
    description: 实现现在符合规范且不再抛出异常。
-->

* `value` {any} 测试是否为真值的值。
* `...message` {any} 除 `value` 外的所有参数都用作错误消息。

如果 `value` 为 [假值][] 或省略，`console.assert()` 会写入一条消息。它只写入消息，否则不影响执行。输出始终以 `"Assertion failed"` 开头。如果提供，`message` 使用 [`util.format()`][] 进行格式化。

如果 `value` 为 [真值][]，则不发生任何操作。

```js
console.assert(true, 'does nothing');

console.assert(false, 'Whoops %s work', 'didn\'t');
// 断言失败：Whoops didn't work

console.assert();
// 断言失败
```

### `console.clear()`

<!-- YAML
added: v8.3.0
-->

当 `stdout` 是 TTY 时，调用 `console.clear()` 将尝试清除 TTY。当 `stdout` 不是 TTY 时，此方法不执行任何操作。

`console.clear()` 的具体操作可能因操作系统和终端类型而异。对于大多数 Linux 操作系统，`console.clear()` 的操作类似于 `clear` shell 命令。在 Windows 上，`console.clear()` 将仅清除 Node.js 二进制文件在当前终端视口中的输出。

### `console.count([label])`

<!-- YAML
added: v8.3.0
-->

* `label` {string} 计数器的显示标签。**默认值：** `'default'`。

维护一个特定于 `label` 的内部计数器，并向 `stdout` 输出使用给定 `label` 调用 `console.count()` 的次数。

<!-- eslint-skip -->

```js
> console.count()
default: 1
undefined
> console.count('default')
default: 2
undefined
> console.count('abc')
abc: 1
undefined
> console.count('xyz')
xyz: 1
undefined
> console.count('abc')
abc: 2
undefined
> console.count()
default: 3
undefined
>
```

### `console.countReset([label])`

<!-- YAML
added: v8.3.0
-->

* `label` {string} 计数器的显示标签。**默认值：** `'default'`。

重置特定于 `label` 的内部计数器。

<!-- eslint-skip -->

```js
> console.count('abc');
abc: 1
undefined
> console.countReset('abc');
undefined
> console.count('abc');
abc: 1
undefined
>
```

### `console.debug(data[, ...args])`

<!-- YAML
added: v8.0.0
changes:
  - version: v8.10.0
    pr-url: https://github.com/nodejs/node/pull/17033
    description: "`console.debug` 现在是 `console.log` 的别名。"
-->

* `data` {any}
* `...args` {any}

`console.debug()` 函数是 [`console.log()`][] 的别名。

### `console.dir(obj[, options])`

<!-- YAML
added: v0.1.101
-->

* `obj` {any}
* `options` {Object}
  * `showHidden` {boolean} 如果为 `true`，则对象的不可枚举属性和 Symbol 属性也将显示。**默认值：** `false`。
  * `depth` {number} 告诉 [`util.inspect()`][] 在格式化对象时递归多少次。这对于检查大型复杂对象很有用。要使其无限递归，传递 `null`。**默认值：** `2`。
  * `colors` {boolean} 如果为 `true`，则输出将使用 ANSI 颜色代码进行样式化。颜色是可定制的；请参阅 [自定义 `util.inspect()` 颜色][]。**默认值：** `false`。

在 `obj` 上使用 [`util.inspect()`][] 并将结果字符串打印到 `stdout`。此函数绕过在 `obj` 上定义的任何自定义 `inspect()` 函数。

### `console.dirxml(...data)`

<!-- YAML
added: v8.0.0
changes:
  - version: v9.3.0
    pr-url: https://github.com/nodejs/node/pull/17152
    description: "`console.dirxml` 现在为其参数调用 `console.log`。"
-->

* `...data` {any}

此方法调用 `console.log()` 并将接收到的参数传递给它。此方法不产生任何 XML 格式化。

### `console.error([data][, ...args])`

<!-- YAML
added: v0.1.100
-->

* `data` {any}
* `...args` {any}

打印到 `stderr` 并换行。可以传递多个参数，第一个用作主要消息，所有额外参数用作替换值，类似于 printf(3)（所有参数都传递给 [`util.format()`][]）。

```js
const code = 5;
console.error('error #%d', code);
// 打印：error #5，到 stderr
console.error('error', code);
// 打印：error 5，到 stderr
```

如果在第一个字符串中未找到格式化元素（例如 `%d`），则对每个参数调用 [`util.inspect()`][] 并连接结果字符串值。有关更多信息，请参阅 [`util.format()`][]。

### `console.group([...label])`

<!-- YAML
added: v8.5.0
-->

* `...label` {any}

为 `groupIndentation` 长度增加后续行的空格缩进。

如果提供一个或多个 `label`，则首先打印它们，不带额外的缩进。

### `console.groupCollapsed()`

<!-- YAML
  added: v8.5.0
-->

[`console.group()`][] 的别名。

### `console.groupEnd()`

<!-- YAML
added: v8.5.0
-->

为 `groupIndentation` 长度减少后续行的空格缩进。

### `console.info([data][, ...args])`

<!-- YAML
added: v0.1.100
-->

* `data` {any}
* `...args` {any}

`console.info()` 函数是 [`console.log()`][] 的别名。

### `console.log([data][, ...args])`

<!-- YAML
added: v0.1.100
-->

* `data` {any}
* `...args` {any}

打印到 `stdout` 并换行。可以传递多个参数，第一个用作主要消息，所有额外参数用作替换值，类似于 printf(3)（所有参数都传递给 [`util.format()`][]）。

```js
const count = 5;
console.log('count: %d', count);
// 打印：count: 5，到 stdout
console.log('count:', count);
// 打印：count: 5，到 stdout
```

有关更多信息，请参阅 [`util.format()`][]。

### `console.table(tabularData[, properties])`

<!-- YAML
added: v10.0.0
-->

* `tabularData` {any}
* `properties` {string\[]} 用于构建表格的备用属性。

尝试使用 `tabularData` 的属性列（或使用 `properties`）和 `tabularData` 的行构建表格并记录它。如果无法解析为表格，则回退到仅记录参数。

```js
// 这些无法解析为表格数据
console.table(Symbol());
// Symbol()

console.table(undefined);
// undefined

console.table([{ a: 1, b: 'Y' }, { a: 'Z', b: 2 }]);
// ┌─────────┬─────┬─────┐
// │ (index) │ a   │ b   │
// ├─────────┼─────┼─────┤
// │ 0       │ 1   │ 'Y' │
// │ 1       │ 'Z' │ 2   │
// └─────────┴─────┴─────┘

console.table([{ a: 1, b: 'Y' }, { a: 'Z', b: 2 }], ['a']);
// ┌─────────┬─────┐
// │ (index) │ a   │
// ├─────────┼─────┤
// │ 0       │ 1   │
// │ 1       │ 'Z' │
// └─────────┴─────┘
```

### `console.time([label])`

<!-- YAML
added: v0.1.104
-->

* `label` {string} **默认值：** `'default'`

启动一个计时器，可用于计算操作的持续时间。计时器由唯一的 `label` 标识。调用 [`console.timeEnd()`][] 时使用相同的 `label` 以停止计时器并将经过的时间以合适的时间单位输出到 `stdout`。例如，如果经过的时间是 3869ms，`console.timeEnd()` 显示 "3.869s"。

### `console.timeEnd([label])`

<!-- YAML
added: v0.1.104
changes:
  - version: v13.0.0
    pr-url: https://github.com/nodejs/node/pull/29251
    description: 经过的时间以合适的时间单位显示。
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/5901
    description: 此方法不再支持不映射到单个 `console.time()` 调用的多次调用；详见下文。
-->

* `label` {string} **默认值：** `'default'`

停止之前通过调用 [`console.time()`][] 启动的计时器，并将结果打印到 `stdout`：

```js
console.time('bunch-of-stuff');
// 做一堆事情。
console.timeEnd('bunch-of-stuff');
// 打印：bunch-of-stuff: 225.438ms
```

### `console.timeLog([label][, ...data])`

<!-- YAML
added: v10.7.0
-->

* `label` {string} **默认值：** `'default'`
* `...data` {any}

对于之前通过调用 [`console.time()`][] 启动的计时器，打印经过的时间和其他 `data` 参数到 `stdout`：

```js
console.time('process');
const value = expensiveProcess1(); // 返回 42
console.timeLog('process', value);
// 打印 "process: 365.227ms 42"。
doExpensiveProcess2(value);
console.timeEnd('process');
```

### `console.trace([message][, ...args])`

<!-- YAML
added: v0.1.104
-->

* `message` {any}
* `...args` {any}

打印字符串 `'Trace: '` 到 `stderr`，后跟 [`util.format()`][] 格式化的消息和到代码当前位置的堆栈跟踪。

```js
console.trace('Show me');
// 打印：（堆栈跟踪将根据调用 trace 的位置而变化）
//  Trace: Show me
//    at repl:2:9
//    at REPLServer.defaultEval (repl.js:248:27)
//    at bound (domain.js:287:14)
//    at REPLServer.runBound [as eval] (domain.js:300:12)
//    at REPLServer.<anonymous> (repl.js:412:12)
//    at emitOne (events.js:82:20)
//    at REPLServer.emit (events.js:169:7)
//    at REPLServer.Interface._onLine (readline.js:210:10)
//    at REPLServer.Interface._line (readline.js:549:8)
//    at REPLServer.Interface._ttyWrite (readline.js:826:14)
```

### `console.warn([data][, ...args])`

<!-- YAML
added: v0.1.100
-->

* `data` {any}
* `...args` {any}

`console.warn()` 函数是 [`console.error()`][] 的别名。

## 仅 Inspector 使用的方法

以下方法由 V8 引擎在通用 API 中暴露，但除非与 [inspector][]（`--inspect` 标志）结合使用，否则不会显示任何内容。

### `console.profile([label])`

<!-- YAML
added: v8.0.0
-->

* `label` {string}

除非在 inspector 中使用，否则此方法不会显示任何内容。`console.profile()` 方法启动一个带有可选标签的 JavaScript CPU 性能分析，直到调用 [`console.profileEnd()`][] 为止。然后该性能分析会被添加到 inspector 的 **Profile** 面板中。

```js
console.profile('MyLabel');
// 一些代码
console.profileEnd('MyLabel');
// 将性能分析 'MyLabel' 添加到 inspector 的 Profiles 面板。
```

### `console.profileEnd([label])`

<!-- YAML
added: v8.0.0
-->

* `label` {string}

除非在 inspector 中使用，否则此方法不会显示任何内容。如果已启动 JavaScript CPU 性能分析会话，则停止当前会话并将报告打印到 inspector 的 **Profiles** 面板。参见 [`console.profile()`][] 获取示例。

如果调用此方法时未带标签，则最近启动的性能分析将被停止。

### `console.timeStamp([label])`

<!-- YAML
added: v8.0.0
-->

* `label` {string}

除非在 inspector 中使用，否则此方法不会显示任何内容。`console.timeStamp()` 方法将一个带有标签 `'label'` 的事件添加到 inspector 的 **Timeline** 面板中。

[`console.error()`]: #consoleerrordata-args
[`console.group()`]: #consolegrouplabel
[`console.log()`]: #consolelogdata-args
[`console.profile()`]: #consoleprofilelabel
[`console.profileEnd()`]: #consoleprofileendlabel
[`console.time()`]: #consoletimelabel
[`console.timeEnd()`]: #consoletimeendlabel
[`process.stderr`]: process.md#processstderr
[`process.stdout`]: process.md#processstdout
[`util.format()`]: util.md#utilformatformat-args
[`util.inspect()`]: util.md#utilinspectobject-options
[customizing `util.inspect()` colors]: util.md#customizing-utilinspect-colors
[falsy]: https://developer.mozilla.org/en-US/docs/Glossary/Falsy
[inspector]: debugger.md
[note on process I/O]: process.md#a-note-on-process-io
[truthy]: https://developer.mozilla.org/en-US/docs/Glossary/Truthy
