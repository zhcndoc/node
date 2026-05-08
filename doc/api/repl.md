# REPL

<!--introduced_in=v0.10.0-->

> 稳定性：2 - 稳定

<!-- source_link=lib/repl.js -->

`node:repl` 模块提供一个读取 - 求值 - 输出 循环 (REPL) 实现，
既可用作独立程序，也可包含在其他应用程序中。可以通过以下方式访问：

```mjs
import repl from 'node:repl';
```

```cjs
const repl = require('node:repl');
```

## 设计和特性

`node:repl` 模块导出 [`repl.REPLServer`][] 类。运行时，
[`repl.REPLServer`][] 的实例将接受单行用户输入，
根据用户定义的求值函数对其进行求值，然后输出结果。输入和输出可能分别来自 `stdin` 和 `stdout`，或者
可以连接到任何 Node.js [流][]。

[`repl.REPLServer`][] 的实例支持输入自动补全、
补全预览、简单的 Emacs 风格行编辑、多行输入、
类 [ZSH][] 反向 i 搜索、类 [ZSH][] 基于子串的历史搜索、
ANSI 风格输出、保存和恢复当前 REPL 会话状态、错误
恢复以及可自定义的求值函数。不支持
ANSI 风格和 Emacs 风格行编辑的终端会自动回退到有限的功能集。

### 命令和特殊按键

所有 REPL 实例都支持以下特殊命令：

* `.break`：在输入多行表达式的过程中，输入
  `.break` 命令（或按 <kbd>Ctrl</kbd>+<kbd>C</kbd>）以中止
  该表达式的进一步输入或处理。
* `.clear`：将 REPL `context` 重置为空对象并清除任何
  正在输入的多行表达式。
* `.exit`：关闭 I/O 流，导致 REPL 退出。
* `.help`：显示此特殊命令列表。
* `.save`：将当前 REPL 会话保存到文件：
  `> .save ./file/to/save.js`
* `.load`：将文件加载到当前 REPL 会话中。
  `> .load ./file/to/load.js`
* `.editor`：进入编辑器模式（按 <kbd>Ctrl</kbd>+<kbd>D</kbd> 
  完成，按 <kbd>Ctrl</kbd>+<kbd>C</kbd> 取消）。

```console
> .editor
// 进入编辑器模式 (^D 完成，^C 取消)
function welcome(name) {
  return `Hello ${name}!`;
}

welcome('Node.js User');

// ^D
'Hello Node.js User!'
>
```

REPL 中的以下按键组合具有这些特殊效果：

* <kbd>Ctrl</kbd>+<kbd>C</kbd>：按一次时，效果与
  `.break` 命令相同。
  在空行上按两次时，效果与 `.exit`
  命令相同。
* <kbd>Ctrl</kbd>+<kbd>D</kbd>：效果与 `.exit` 命令相同。
* <kbd>Tab</kbd>：在空行上按下时，显示全局和局部
  （作用域）变量。在输入其他内容时按下，显示相关的
  自动补全选项。

有关反向 i 搜索的按键绑定，请参阅 [`reverse-i-search`][]。
有关所有其他按键绑定，请参阅 [TTY 按键绑定][]。

### 默认求值

默认情况下，[`repl.REPLServer`][] 的所有实例都使用一个求值函数
该函数求值 JavaScript 表达式并提供对 Node.js 内置模块的访问。此默认行为可以通过在创建 [`repl.REPLServer`][] 实例时传入替代的
求值函数来覆盖。

#### JavaScript 表达式

默认求值器支持直接求值 JavaScript 表达式：

```console
> 1 + 1
2
> const m = 2
undefined
> m + 1
3
```

除非在块或函数内另有作用域，否则使用 `const`、`let` 或 `var` 关键字
隐式或使用这些关键字声明的变量
都在全局作用域声明。

#### 全局和局部作用域

默认求值器提供对全局作用域中存在的任何变量的访问。可以通过将变量赋值给与每个 `REPLServer` 关联的 `context` 对象，从而显式地将变量暴露给 REPL：

```mjs
import repl from 'node:repl';
const msg = 'message';

repl.start('> ').context.m = msg;
```

```cjs
const repl = require('node:repl');
const msg = 'message';

repl.start('> ').context.m = msg;
```

`context` 对象中的属性在 REPL 内显示为局部变量：

```console
$ node repl_test.js
> m
'message'
```

上下文属性默认不是只读的。要指定只读全局变量，
必须使用 `Object.defineProperty()` 定义上下文属性：

```mjs
import repl from 'node:repl';
const msg = 'message';

const r = repl.start('> ');
Object.defineProperty(r.context, 'm', {
  configurable: false,
  enumerable: true,
  value: msg,
});
```

```cjs
const repl = require('node:repl');
const msg = 'message';

const r = repl.start('> ');
Object.defineProperty(r.context, 'm', {
  configurable: false,
  enumerable: true,
  value: msg,
});
```

#### 访问 Node.js 核心模块

默认求值器在使用时会自动将 Node.js 核心模块加载到
REPL 环境中。例如，除非另外声明为
全局或作用域变量，否则输入 `fs` 将按需求值为
`global.fs = require('node:fs')`。

```console
> fs.createReadStream('./some/file');
```

#### 全局未捕获异常

<!-- YAML
changes:
  - version: v12.3.0
    pr-url: https://github.com/nodejs/node/pull/27151
    description: "一旦 repl 作为独立程序使用，现在会触发 `'uncaughtException'` 事件。"
-->

REPL 使用 [`domain`][] 模块来捕获该
REPL 会话的所有未捕获异常。

在 REPL 中使用 [`domain`][] 模块有以下副作用：

* 未捕获异常仅在独立 REPL 中发出 [`'uncaughtException'`][] 事件。在另一个
  Node.js 程序中的 REPL 内为此事件添加监听器会导致 [`ERR_INVALID_REPL_INPUT`][]。

  ```js
  const r = repl.start();

  r.write('process.on("uncaughtException", () => console.log("Foobar"));\n');
  // 输出流包括：
  //   TypeError [ERR_INVALID_REPL_INPUT]: uncaughtException 的监听器
  //   不能在 REPL 中使用

  r.close();
  ```

* 尝试使用 [`process.setUncaughtExceptionCaptureCallback()`][] 会抛出
  [`ERR_DOMAIN_CANNOT_SET_UNCAUGHT_EXCEPTION_CAPTURE`][] 错误。

#### _(下划线) 变量的赋值

<!-- YAML
changes:
  - version: v9.8.0
    pr-url: https://github.com/nodejs/node/pull/18919
    description: "添加了 `_error` 支持。"
-->

默认情况下，默认求值器会将最近求值的表达式结果赋值给特殊变量 `_` (下划线)。
显式设置 `_` 为某个值将禁用此行为。

```console
> [ 'a', 'b', 'c' ]
[ 'a', 'b', 'c' ]
> _.length
3
> _ += 1
Expression assignment to _ now disabled.
4
> 1 + 1
2
> _
4
```

类似地，`_error` 将引用最后看到的错误（如果有的话）。
显式设置 `_error` 为某个值将禁用此行为。

```console
> throw new Error('foo');
Uncaught Error: foo
> _error.message
'foo'
```

#### `await` 关键字

对 `await` 关键字的支持在顶层启用。

```console
> await Promise.resolve(123)
123
> await Promise.reject(new Error('REPL await'))
Uncaught Error: REPL await
    at REPL2:1:54
> const timeout = util.promisify(setTimeout);
undefined
> const old = Date.now(); await timeout(1000); console.log(Date.now() - old);
1002
undefined
```

在 REPL 中使用 `await` 关键字的一个已知限制是
它会使 `const` 关键字的词法作用域失效。

例如：

```console
> const m = await Promise.resolve(123)
undefined
> m
123
> m = await Promise.resolve(234)
234
// 重新声明常量会报错
> const m = await Promise.resolve(345)
Uncaught SyntaxError: Identifier 'm' has already been declared
```

[`--no-experimental-repl-await`][] 将禁用 REPL 中的顶层 await。

### 反向 i 搜索

<!-- YAML
added:
 - v13.6.0
 - v12.17.0
-->

REPL 支持类似于 [ZSH][] 的双向反向 i 搜索。它由
<kbd>Ctrl</kbd>+<kbd>R</kbd> 触发向后搜索
和 <kbd>Ctrl</kbd>+<kbd>S</kbd> 触发向前搜索。

重复的历史条目将被跳过。

一旦按下任何不对应
反向搜索的键，条目即被接受。可以通过按 <kbd>Esc</kbd>
或 <kbd>Ctrl</kbd>+<kbd>C</kbd> 来取消。

改变方向会立即从当前位置开始向预期
方向搜索下一个条目。

### 自定义求值函数

当创建新的 [`repl.REPLServer`][] 时，可以提供自定义求值函数。例如，这可用于实现完全自定义的 REPL
应用程序。

求值函数接受以下四个参数：

* `code` {string} 要执行的代码（例如 `1 + 1`）。
* `context` {Object} 代码执行的上下文。这可以是 JavaScript `global`
  上下文，也可以是特定于 REPL 实例的上下文，具体取决于 `useGlobal` 选项。
* `replResourceName` {string} 与当前代码
  求值关联的 REPL 资源的标识符。这对于调试目的可能很有用。
* `callback` {Function} 代码求值完成后调用的函数。回调接受两个参数：
  * 如果在求值期间发生错误则提供的错误对象，如果没有发生错误则为 `null`/`undefined`。
  * 代码求值的结果（如果提供了错误则此结果不相关）。

以下示例说明了一个对给定数字求平方的 REPL，如果
提供的输入实际上不是数字，则打印错误：

```mjs
import repl from 'node:repl';

function byThePowerOfTwo(number) {
  return number * number;
}

function myEval(code, context, replResourceName, callback) {
  if (isNaN(code)) {
    callback(new Error(`${code.trim()} is not a number`));
  } else {
    callback(null, byThePowerOfTwo(code));
  }
}

repl.start({ prompt: 'Enter a number: ', eval: myEval });
```

```cjs
const repl = require('node:repl');

function byThePowerOfTwo(number) {
  return number * number;
}

function myEval(code, context, replResourceName, callback) {
  if (isNaN(code)) {
    callback(new Error(`${code.trim()} is not a number`));
  } else {
    callback(null, byThePowerOfTwo(code));
  }
}

repl.start({ prompt: 'Enter a number: ', eval: myEval });
```

#### 可恢复错误

在 REPL 提示符处，按 <kbd>Enter</kbd> 将当前输入行发送到
`eval` 函数。为了支持多行输入，`eval` 函数
可以向提供的回调函数返回 `repl.Recoverable` 的实例：

```js
function myEval(cmd, context, filename, callback) {
  let result;
  try {
    result = vm.runInThisContext(cmd);
  } catch (e) {
    if (isRecoverableError(e)) {
      return callback(new repl.Recoverable(e));
    }
  }
  callback(null, result);
}

function isRecoverableError(error) {
  if (error.name === 'SyntaxError') {
    return /^(Unexpected end of input|Unexpected token)/.test(error.message);
  }
  return false;
}
```

### 自定义 REPL 输出

默认情况下，[`repl.REPLServer`][] 实例在将输出写入提供的 `Writable`
流（默认为 `process.stdout`）之前，使用
[`util.inspect()`][] 方法格式化输出。`showProxy` 检查选项默认设置为
true，`colors` 选项根据
REPL 的 `useColors` 选项设置为 true。

可以在构造时指定 `useColors` 布尔选项，以指示
默认写入器使用 ANSI 风格代码来为
`util.inspect()` 方法的输出着色。

如果 REPL 作为独立程序运行，也可以通过使用
`inspect.replDefaults` 属性从 REPL 内部更改
REPL 的 [检查默认值][`util.inspect()`]，该属性镜像了
[`util.inspect()`][] 中的 `defaultOptions`。

```console
> util.inspect.replDefaults.compact = false;
false
> [1]
[
  1
]
>
```

要完全自定义 [`repl.REPLServer`][] 实例的输出，请在构造时为 `writer` 选项传入新
函数。例如，以下示例简单地将任何输入文本转换为大写：

```mjs
import repl from 'node:repl';

const r = repl.start({ prompt: '> ', eval: myEval, writer: myWriter });

function myEval(cmd, context, filename, callback) {
  callback(null, cmd);
}

function myWriter(output) {
  return output.toUpperCase();
}
```

```cjs
const repl = require('node:repl');

const r = repl.start({ prompt: '> ', eval: myEval, writer: myWriter });

function myEval(cmd, context, filename, callback) {
  callback(null, cmd);
}

function myWriter(output) {
  return output.toUpperCase();
}
```

## 类：`REPLServer`

<!-- YAML
added: v0.1.91
-->

* `options` {Object|string} 参见 [`repl.start()`][]
* 继承：{readline.Interface}

`repl.REPLServer` 的实例是使用 [`repl.start()`][] 方法创建的，或者直接使用 JavaScript `new` 关键字创建。

```mjs
import repl from 'node:repl';

const options = { useColors: true };

const firstInstance = repl.start(options);
const secondInstance = new repl.REPLServer(options);
```

```cjs
const repl = require('node:repl');

const options = { useColors: true };

const firstInstance = repl.start(options);
const secondInstance = new repl.REPLServer(options);
```

### 事件：`'exit'`

<!-- YAML
added: v0.7.7
-->

当通过接收 `.exit` 命令作为输入、用户按两次 <kbd>Ctrl</kbd>+<kbd>C</kbd> 发出 `SIGINT` 信号，或按 <kbd>Ctrl</kbd>+<kbd>D</kbd> 在输入流上发出 `'end'` 信号而退出 REPL 时，会发出 `'exit'` 事件。监听器回调被调用时不带任何参数。

```js
replServer.on('exit', () => {
  console.log('Received "exit" event from repl!');
  process.exit();
});
```

### 事件：`'reset'`

<!-- YAML
added: v0.11.0
-->

当 REPL 的上下文被重置时，会发出 `'reset'` 事件。每当收到 `.clear` 命令作为输入时就会发生这种情况，_除非_ REPL 正在使用默认评估器且 `repl.REPLServer` 实例创建时将 `useGlobal` 选项设置为 `true`。监听器回调将被调用，并仅传入对 `context` 对象的引用作为唯一参数。

这主要用于将 REPL 上下文重新初始化为某些预定义状态：

```mjs
import repl from 'node:repl';

function initializeContext(context) {
  context.m = 'test';
}

const r = repl.start({ prompt: '> ' });
initializeContext(r.context);

r.on('reset', initializeContext);
```

```cjs
const repl = require('node:repl');

function initializeContext(context) {
  context.m = 'test';
}

const r = repl.start({ prompt: '> ' });
initializeContext(r.context);

r.on('reset', initializeContext);
```

当执行此代码时，全局 `'m'` 变量可以被修改，然后使用 `.clear` 命令重置为其初始值：

```console
$ ./node example.js
> m
'test'
> m = 1
1
> m
1
> .clear
Clearing context...
> m
'test'
>
```

### `replServer.defineCommand(keyword, cmd)`

<!-- YAML
added: v0.3.0
-->

* `keyword` {string} 命令关键字（_不带_ 前导 `.` 字符）。
* `cmd` {Object|Function} 当处理命令时要调用的函数。

`replServer.defineCommand()` 方法用于向 REPL 实例添加新的 `.` 前缀命令。此类命令通过输入 `.` 后跟 `keyword` 来调用。`cmd` 是一个 `Function` 或具有以下属性的 `Object`：

* `help` {string} 当输入 `.help` 时显示的帮助文本（可选）。
* `action` {Function} 要执行的函数，可选地接受单个字符串参数。

以下示例显示了添加到 REPL 实例的两个新命令：

```mjs
import repl from 'node:repl';

const replServer = repl.start({ prompt: '> ' });
replServer.defineCommand('sayhello', {
  help: 'Say hello',
  action(name) {
    this.clearBufferedCommand();
    console.log(`Hello, ${name}!`);
    this.displayPrompt();
  },
});
replServer.defineCommand('saybye', function saybye() {
  console.log('Goodbye!');
  this.close();
});
```

```cjs
const repl = require('node:repl');

const replServer = repl.start({ prompt: '> ' });
replServer.defineCommand('sayhello', {
  help: 'Say hello',
  action(name) {
    this.clearBufferedCommand();
    console.log(`Hello, ${name}!`);
    this.displayPrompt();
  },
});
replServer.defineCommand('saybye', function saybye() {
  console.log('Goodbye!');
  this.close();
});
```

然后可以在 REPL 实例中使用新命令：

```console
> .sayhello Node.js User
Hello, Node.js User!
> .saybye
Goodbye!
```

### `replServer.displayPrompt([preserveCursor])`

<!-- YAML
added: v0.1.91
-->

* `preserveCursor` {boolean}

`replServer.displayPrompt()` 方法使 REPL 实例准备好接收用户输入，将配置的 `prompt` 打印到 `output` 中的新行，并恢复 `input` 以接受新输入。

当输入多行内容时，会打印管道符 `'|'` 而不是提示符。

当 `preserveCursor` 为 `true` 时，光标位置不会重置为 `0`。

`replServer.displayPrompt` 方法主要旨在从使用 `replServer.defineCommand()` 方法注册的命令的动作函数内部调用。

### `replServer.clearBufferedCommand()`

<!-- YAML
added: v9.0.0
-->

`replServer.clearBufferedCommand()` 方法清除任何已缓冲但尚未执行的命令。此方法主要旨在从使用 `replServer.defineCommand()` 方法注册的命令的动作函数内部调用。

### `replServer.setupHistory(historyConfig, callback)`

<!-- YAML
added: v11.10.0
changes:
  - version: v24.2.0
    pr-url: https://github.com/nodejs/node/pull/58225
    description: "更新了 `historyConfig` 参数，使其接受包含 `filePath`、`size`、`removeHistoryDuplicates` 和 `onHistoryFileLoaded` 属性的对象。"
-->

* `historyConfig` {Object|string} 历史文件的路径
  如果它是字符串，则是历史文件的路径。
  如果它是对象，它可以具有以下属性：
  * `filePath` {string} 历史文件的路径
  * `size` {number} 保留的最大历史行数。要禁用历史，将此值设置为 `0`。仅当用户将 `terminal` 设置为 `true` 或通过内部 `output` 检查设置为 `true` 时，此选项才有意义，否则历史缓存机制根本不会初始化。**默认值：** `30`。
  * `removeHistoryDuplicates` {boolean} 如果为 `true`，当添加到历史列表的新输入行重复旧行时，这会从列表中删除旧行。**默认值：** `false`。
  * `onHistoryFileLoaded` {Function} 当历史写入准备就绪或发生错误时调用
    * `err` {Error}
    * `repl` {repl.REPLServer}
* `callback` {Function} 当历史写入准备就绪或发生错误时调用
  （如果在 `historyConfig` 中作为 `onHistoryFileLoaded` 提供，则为可选）
  * `err` {Error}
  * `repl` {repl.REPLServer}

为 REPL 实例初始化历史日志文件。当执行 Node.js 二进制文件并使用命令行 REPL 时，默认情况下会初始化历史文件。但是，以编程方式创建 REPL 时并非如此。当以编程方式使用 REPL 实例时，使用此方法初始化历史日志文件。

## `repl.builtinModules`

<!-- YAML
added: v14.5.0
deprecated:
  - v24.0.0
  - v22.16.0
-->

> 稳定性：0 - 已弃用。请改用 [`module.builtinModules`][]。

* 类型：{string\[]}

一些 Node.js 模块名称的列表，例如 `'http'`。

提供了一个自动迁移工具（[源代码](https://github.com/nodejs/userland-migrations/tree/main/recipes/repl-builtin-modules)）：

```bash
npx codemod@latest @nodejs/repl-builtin-modules
```

## `repl.start([options])`

<!-- YAML
added: v0.1.91
changes:
  - version:
     - v25.9.0
    pr-url: https://github.com/nodejs/node/pull/62188
    description: "已添加 `handleError` 参数。"
  - version: v24.1.0
    pr-url: https://github.com/nodejs/node/pull/58003
    description: "在添加多行命令时，增加了添加/编辑/删除多行的可能性。"
  - version: v24.0.0
    pr-url: https://github.com/nodejs/node/pull/57400
    description: "多行指示符现在是 `|`，而不是 `...`。增加了对多行历史记录的支持。现在可以通过访问历史记录并编辑命令来“修复”带有语法错误的多行命令。当从旧版 node 访问多行历史记录时，多行结构不会被保留。"
  - version:
     - v13.4.0
     - v12.17.0
    pr-url: https://github.com/nodejs/node/pull/30811
    description: "现在可以使用 `preview` 选项。"
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/26518
    description: "在所有情况下，`terminal` 选项现在都遵循默认描述，且 `useColors` 会在可用时检查 `hasColors()`。"
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/19187
    description: "移除了 `REPL_MAGIC_MODE` `replMode`。"
  - version: v6.3.0
    pr-url: https://github.com/nodejs/node/pull/6635
    description: "现在支持 `breakEvalOnSigint` 选项。"
  - version: v5.8.0
    pr-url: https://github.com/nodejs/node/pull/5388
    description: "现在 `options` 参数是可选的。"
-->

* `options` {Object|string}
  * `prompt` {string} 要显示的输入提示符。**默认值：** `'> '`（带尾随空格）。
  * `input` {stream.Readable} 将读取 REPL 输入的 `Readable` 流。**默认值：** `process.stdin`。
  * `output` {stream.Writable} 将写入 REPL 输出的 `Writable` 流。**默认值：** `process.stdout`。
  * `terminal` {boolean} 如果为 `true`，指定 `output` 应被视为 TTY 终端。**默认值：** 实例化时检查 `output` 流上的 `isTTY` 属性值。
  * `eval` {Function} 用于评估每一行给定输入内容的函数。**默认值：** JavaScript `eval()` 函数的异步包装器。`eval` 函数可以使用 `repl.Recoverable` 报错，以指示输入不完整并提示输入额外的行。有关更多详细信息，请参阅 [自定义评估函数][] 部分。
  * `useColors` {boolean} 如果为 `true`，指定默认 `writer` 函数应在 REPL 输出中包含 ANSI 颜色样式。如果提供了自定义 `writer` 函数，则此选项无效。**默认值：** 如果 REPL 实例的 `terminal` 值为 `true`，则检查 `output` 流上的颜色支持。
  * `useGlobal` {boolean} 如果为 `true`，指定默认评估函数将使用 JavaScript `global` 作为上下文，而不是为 REPL 实例创建新的单独上下文。node CLI REPL 将此值设置为 `true`。**默认值：** `false`。
  * `ignoreUndefined` {boolean} 如果为 `true`，指定默认写入器如果命令的返回值为 `undefined` 则不会输出该返回值。**默认值：** `false`。
  * `writer` {Function} 在写入 `output` 之前调用该函数以格式化每个命令的输出。**默认值：** [`util.inspect()`][]。
  * `completer` {Function} 用于自定义 Tab 自动完成的可选函数。参见 [`readline.InterfaceCompleter`][] 获取示例。
  * `replMode` {symbol} 一个标志，指定默认评估器是在严格模式还是默认（宽松）模式下执行所有 JavaScript 命令。可接受的值为：
    * `repl.REPL_MODE_SLOPPY` 以宽松模式评估表达式。
    * `repl.REPL_MODE_STRICT` 以严格模式评估表达式。这相当于在每个 repl 语句前加上 `'use strict'`。
  * `breakEvalOnSigint` {boolean} 当收到 `SIGINT` 时停止评估当前代码片段，例如当按下 <kbd>Ctrl</kbd>+<kbd>C</kbd> 时。这不能与自定义 `eval` 函数一起使用。**默认值：** `false`。
  * `preview` {boolean} 定义 repl 是否打印自动完成和输出预览。**默认值：** 使用默认 eval 函数时为 `true`，使用自定义 eval 函数时为 `false`。如果 `terminal` 为假值，则没有预览，`preview` 的值无效。
  * `handleError` {Function} 此函数自定义 REPL 中的错误处理。它接收抛出的异常作为第一个参数，并必须同步返回以下值之一：
    * `'print'` 将错误打印到输出流（默认行为）。
    * `'ignore'` 跳过所有剩余的错误处理。
    * `'unhandled'` 将异常视为完全未处理。在这种情况下，错误将传递给进程范围的异常处理程序，例如 [`'uncaughtException'`][] 事件。
      `'unhandled'` 值在 `REPLServer` 实例已关闭的情况下是否可取，取决于特定的用例。
* 返回：{repl.REPLServer}

`repl.start()` 方法创建并启动 [`repl.RePLServer`][] 实例。

如果 `options` 是字符串，则它指定输入提示符：

```mjs
import repl from 'node:repl';

// 一个 Unix 风格的提示符
repl.start('$ ');
```

```cjs
const repl = require('node:repl');

// 一个 Unix 风格的提示符
repl.start('$ ');
```

## Node.js REPL

Node.js 本身使用 `node:repl` 模块来提供其自身的交互式界面以执行 JavaScript。可以通过在不传递任何参数（或传递 `-i` 参数）的情况下执行 Node.js 二进制文件来使用它：

```console
$ node
> const a = [1, 2, 3];
undefined
> a
[ 1, 2, 3 ]
> a.forEach((v) => {
...   console.log(v);
...   });
1
2
3
```

### 环境变量选项

可以使用以下环境变量自定义 Node.js REPL 的各种行为：

* `NODE_REPL_HISTORY`：当给定有效路径时，持久化的 REPL 历史记录将保存到指定的文件，而不是用户主目录中的 `.node_repl_history`。将此值设置为 `''`（空字符串）将禁用持久化的 REPL 历史记录。值中的空白将被修剪。在 Windows 平台上，具有空值的环境变量是无效的，因此将此变量设置为一个或多个空格以禁用持久化的 REPL 历史记录。
* `NODE_REPL_HISTORY_SIZE`：控制如果历史记录可用，将持久化多少行历史记录。必须是正数。**默认值：** `1000`。
* `NODE_REPL_MODE`：可以是 `'sloppy'` 或 `'strict'`。**默认值：** `'sloppy'`，这将允许运行非严格模式代码。

### 持久化历史记录

默认情况下，Node.js REPL 通过将输入保存到位于用户主目录的 `.node_repl_history` 文件中，在 `node` REPL 会话之间持久化历史记录。可以通过设置环境变量 `NODE_REPL_HISTORY=''` 来禁用此功能。

### 将 Node.js REPL 与高级行编辑器一起使用

对于高级行编辑器，请使用环境变量 `NODE_NO_READLINE=1` 启动 Node.js。这将以规范终端设置启动主 REPL 和调试器 REPL，这将允许与 `rlwrap` 一起使用。

例如，可以将以下内容添加到 `.bashrc` 文件中：

```bash
alias node="env NODE_NO_READLINE=1 rlwrap node"
```

### 在同一进程中启动多个 REPL 实例

可以针对单个正在运行的 Node.js 实例创建并运行多个 REPL 实例，它们共享单个 `global` 对象（通过将 `useGlobal` 选项设置为 `true`），但具有单独的 I/O 接口。

例如，以下代码在 `stdin`、Unix socket 和 TCP socket 上提供单独的 REPL，所有这些都共享相同的 `global` 对象：

```mjs
import net from 'node:net';
import repl from 'node:repl';
import process from 'node:process';
import fs from 'node:fs';

let connections = 0;

repl.start({
  prompt: 'Node.js via stdin> ',
  useGlobal: true,
  input: process.stdin,
  output: process.stdout,
});

const unixSocketPath = '/tmp/node-repl-sock';

// 如果 socket 文件已存在，让我们移除它
fs.rmSync(unixSocketPath, { force: true });

net.createServer((socket) => {
  connections += 1;
  repl.start({
    prompt: 'Node.js via Unix socket> ',
    useGlobal: true,
    input: socket,
    output: socket,
  }).on('exit', () => {
    socket.end();
  });
}).listen(unixSocketPath);

net.createServer((socket) => {
  connections += 1;
  repl.start({
    prompt: 'Node.js via TCP socket> ',
    useGlobal: true,
    input: socket,
    output: socket,
  }).on('exit', () => {
    socket.end();
  });
}).listen(5001);
```

```cjs
const net = require('node:net');
const repl = require('node:repl');
const fs = require('node:fs');

let connections = 0;

repl.start({
  prompt: 'Node.js via stdin> ',
  useGlobal: true,
  input: process.stdin,
  output: process.stdout,
});

const unixSocketPath = '/tmp/node-repl-sock';

// 如果 socket 文件已存在，让我们移除它
fs.rmSync(unixSocketPath, { force: true });

net.createServer((socket) => {
  connections += 1;
  repl.start({
    prompt: 'Node.js via Unix socket> ',
    useGlobal: true,
    input: socket,
    output: socket,
  }).on('exit', () => {
    socket.end();
  });
}).listen(unixSocketPath);

net.createServer((socket) => {
  connections += 1;
  repl.start({
    prompt: 'Node.js via TCP socket> ',
    useGlobal: true,
    input: socket,
    output: socket,
  }).on('exit', () => {
    socket.end();
  });
}).listen(5001);
```

从命令行运行此应用程序将在 stdin 上启动 REPL。其他 REPL 客户端可以通过 Unix socket 或 TCP socket 连接。例如，`telnet` 对于连接 TCP sockets 很有用，而 `socat` 可用于连接 Unix 和 TCP sockets。

通过从基于 Unix socket 的服务器启动 REPL 而不是从 stdin 启动，可以在不重启的情况下连接到长期运行的 Node.js 进程。

### 示例

#### 通过 `net.Server` 和 `net.Socket` 实现功能齐全的“终端”REPL

这是一个如何使用 [`net.Server`][] 和 [`net.Socket`][] 运行“功能齐全”（终端）REPL 的示例。

以下脚本启动一个端口为 `1337` 的 HTTP 服务器，允许客户端建立与其 REPL 实例的 socket 连接。

```mjs
// repl-server.js
import repl from 'node:repl';
import net from 'node:net';

net
  .createServer((socket) => {
    const r = repl.start({
      prompt: `socket ${socket.remoteAddress}:${socket.remotePort}> `,
      input: socket,
      output: socket,
      terminal: true,
      useGlobal: false,
    });
    r.on('exit', () => {
      socket.end();
    });
    r.context.socket = socket;
  })
  .listen(1337);
```

```cjs
// repl-server.js
const repl = require('node:repl');
const net = require('node:net');

net
  .createServer((socket) => {
    const r = repl.start({
      prompt: `socket ${socket.remoteAddress}:${socket.remotePort}> `,
      input: socket,
      output: socket,
      terminal: true,
      useGlobal: false,
    });
    r.on('exit', () => {
      socket.end();
    });
    r.context.socket = socket;
  })
  .listen(1337);
```

而以下代码实现了一个客户端，可以通过端口 `1337` 与上述定义的服务器创建 socket 连接。

```mjs
// repl-client.js
import net from 'node:net';
import process from 'node:process';

const sock = net.connect(1337);

process.stdin.pipe(sock);
sock.pipe(process.stdout);

sock.on('connect', () => {
  process.stdin.resume();
  process.stdin.setRawMode(true);
});

sock.on('close', () => {
  process.stdin.setRawMode(false);
  process.stdin.pause();
  sock.removeListener('close', done);
});

process.stdin.on('end', () => {
  sock.destroy();
  console.log();
});

process.stdin.on('data', (b) => {
  if (b.length === 1 && b[0] === 4) {
    process.stdin.emit('end');
  }
});
```

```cjs
// repl-client.js
const net = require('node:net');

const sock = net.connect(1337);

process.stdin.pipe(sock);
sock.pipe(process.stdout);

sock.on('connect', () => {
  process.stdin.resume();
  process.stdin.setRawMode(true);
});

sock.on('close', () => {
  process.stdin.setRawMode(false);
  process.stdin.pause();
  sock.removeListener('close', done);
});

process.stdin.on('end', () => {
  sock.destroy();
  console.log();
});

process.stdin.on('data', (b) => {
  if (b.length === 1 && b[0] === 4) {
    process.stdin.emit('end');
  }
});
```

要运行此示例，请在机器上打开两个不同的终端，在一个终端中使用 `node repl-server.js` 启动服务器，在另一个终端中使用 `node repl-client.js`。

原始代码来自 <https://gist.github.com/TooTallNate/2209310>。

#### 通过 `curl` 实现 REPL

这是一个如何通过 [`curl()`][] 运行 REPL 实例的示例。

以下脚本启动一个端口为 `8000` 的 HTTP 服务器，可以接受通过 [`curl()`][] 建立的连接。

```mjs
import http from 'node:http';
import repl from 'node:repl';

const server = http.createServer((req, res) => {
  res.setHeader('content-type', 'multipart/octet-stream');

  repl.start({
    prompt: 'curl repl> ',
    input: req,
    output: res,
    terminal: false,
    useColors: true,
    useGlobal: false,
  });
});

server.listen(8000);
```

```cjs
const http = require('node:http');
const repl = require('node:repl');

const server = http.createServer((req, res) => {
  res.setHeader('content-type', 'multipart/octet-stream');

  repl.start({
    prompt: 'curl repl> ',
    input: req,
    output: res,
    terminal: false,
    useColors: true,
    useGlobal: false,
  });
});

server.listen(8000);
```

当上述脚本运行时，您可以使用 [`curl()`][] 连接到服务器，并通过运行 `curl --no-progress-meter -sSNT. localhost:8000` 连接到其 REPL 实例。

**警告** 此示例仅用于教育目的，以演示如何使用不同的 I/O 流启动 Node.js REPL。
**不应** 在生产环境或任何涉及安全问题的上下文中使用，除非采取额外的保护措施。
如果需要在现实世界的应用程序中实现 REPL，请考虑替代方法来减轻这些风险，例如使用安全的输入机制并避免开放的网络接口。

原始代码来自 <https://gist.github.com/TooTallNate/2053342>。

[TTY 键绑定]: readline.md#tty-keybindings
[ZSH]: https://en.wikipedia.org/wiki/Z_shell
[`'uncaughtException'`]: process.md#event-uncaughtexception
[`--no-experimental-repl-await`]: cli.md#--no-experimental-repl-await
[`ERR_DOMAIN_CANNOT_SET_UNCAUGHT_EXCEPTION_CAPTURE`]: errors.md#err_domain_cannot_set_uncaught_exception_capture
[`ERR_INVALID_REPL_INPUT`]: errors.md#err_invalid_repl_input
[`curl()`]: https://curl.haxx.se/docs/manpage.html
[`domain`]: domain.md
[`module.builtinModules`]: module.md#modulebuiltinmodules
[`net.Server`]: net.md#class-netserver
[`net.Socket`]: net.md#class-netsocket
[`process.setUncaughtExceptionCaptureCallback()`]: process.md#processsetuncaughtexceptioncapturecallbackfn
[`readline.InterfaceCompleter`]: readline.md#use-of-the-completer-function
[`repl.ReplServer`]: #class-replserver
[`repl.start()`]: #replstartoptions
[`reverse-i-search`]: #reverse-i-search
[`util.inspect()`]: util.md#utilinspectobject-options
[自定义评估函数]: #custom-evaluation-functions
[stream]: stream.md
