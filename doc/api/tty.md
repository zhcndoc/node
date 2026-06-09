# TTY

<!--introduced_in=v0.10.0-->

> 稳定性：2 - 稳定

<!-- source_link=lib/tty.js -->

`node:tty` 模块提供 `tty.ReadStream` 和 `tty.WriteStream` 类。在大多数情况下，没有必要也不可能直接使用此模块。但是，可以通过以下方式访问它：

```js
const tty = require('node:tty');
```

当 Node.js 检测到它是伴随着文本终端（"TTY"）运行时，[`process.stdin`][] 默认情况下将被初始化为 `tty.ReadStream` 的实例，[`process.stdout`][] 和 [`process.stderr`][] 默认情况下都将是 `tty.WriteStream` 的实例。确定 Node.js 是否在 TTY 上下文中运行的首选方法是检查 `process.stdout.isTTY` 属性的值是否为 `true`：

```console
$ node -p -e "Boolean(process.stdout.isTTY)"
true
$ node -p -e "Boolean(process.stdout.isTTY)" | cat
false
```

在大多数情况下，应用程序几乎没有理由手动创建 `tty.ReadStream` 和 `tty.WriteStream` 类的实例。

## 类：`tty.ReadStream`

<!-- YAML
added: v0.5.8
-->

* 继承：{net.Socket}

代表 TTY 的可读端。在正常情况下，[`process.stdin`][] 将是 Node.js 进程中唯一的 `tty.ReadStream` 实例，没有理由创建额外的实例。

### `readStream.isRaw`

<!-- YAML
added: v0.7.7
-->

如果 TTY 当前配置为作为原始设备运行，则为 `true` 的 `boolean`。

即使终端以原始模式运行，此标志在进程启动时始终为 `false`。它的值会随着后续对 `setRawMode` 的调用而改变。

### `readStream.isTTY`

<!-- YAML
added: v0.5.8
-->

对于 `tty.ReadStream` 实例始终为 `true` 的 `boolean`。

### `readStream.setRawMode(mode)`

<!-- YAML
added: v0.7.7
-->

* `mode` {boolean} 如果为 `true`，配置 `tty.ReadStream` 作为原始设备运行。如果为 `false`，配置 `tty.ReadStream` 以其默认模式运行。`readStream.isRaw` 属性将设置为结果模式。
* 返回：{this} 读取流实例。

允许配置 `tty.ReadStream` 使其作为原始设备运行。

处于原始模式时，输入总是逐字符可用，不包括修饰键。此外，终端对输入字符的所有特殊处理都会被禁用，包括回显输入字符。处于此模式时，<kbd>Ctrl</kbd>+<kbd>C</kbd> 将不再导致 `SIGINT`。此模式不会影响终端输出处理，例如 Unix 终端上的换行翻译。

## 类：`tty.WriteStream`

<!-- YAML
added: v0.5.8
-->

* 继承：{net.Socket}

代表 TTY 的可写端。在正常情况下，[`process.stdout`][] 和 [`process.stderr`][] 将是为 Node.js 进程创建的仅有的 `tty.WriteStream` 实例，没有理由创建额外的实例。

### `new tty.ReadStream(fd[, options])`

<!-- YAML
added: v0.5.8
changes:
  - version: v0.9.4
    description: "支持 `options` 参数。"
-->

* `fd` {number} 与 TTY 关联的文件描述符。
* `options` {Object} 传递给父级 `net.Socket` 的选项，参见 [`net.Socket` 构造函数][] 的 `options`。
* 返回：{tty.ReadStream}

为与 TTY 关联的 `fd` 创建一个 `ReadStream`。

### `new tty.WriteStream(fd)`

<!-- YAML
added: v0.5.8
-->

* `fd` {number} 与 TTY 关联的文件描述符。
* 返回：{tty.WriteStream}

为与 TTY 关联的 `fd` 创建一个 `WriteStream`。

### 事件：`'resize'`

<!-- YAML
added: v0.7.7
-->

每当 `writeStream.columns` 或 `writeStream.rows` 属性发生变化时，都会发出 `'resize'` 事件。调用时不会向监听器回调传递任何参数。

```js
process.stdout.on('resize', () => {
  console.log('screen size has changed!');
  console.log(`${process.stdout.columns}x${process.stdout.rows}`);
});
```

### `writeStream.clearLine(dir[, callback])`

<!-- YAML
added: v0.7.7
changes:
  - version: v12.7.0
    pr-url: https://github.com/nodejs/node/pull/28721
    description: 暴露了流的 write() 回调和返回值。
-->

* `dir` {number}
  * `-1`：光标左侧
  * `1`：光标右侧
  * `0`：整行
* `callback` {Function} 操作完成后调用。
* 返回：{boolean} 如果流希望调用代码在继续写入更多数据之前等待 `'drain'` 事件发出，则为 `false`；否则为 `true`。

`writeStream.clearLine()` 清除该 `WriteStream` 当前行，方向由 `dir` 标识。

### `writeStream.clearScreenDown([callback])`

<!-- YAML
added: v0.7.7
changes:
  - version: v12.7.0
    pr-url: https://github.com/nodejs/node/pull/28721
    description: 暴露了流的 write() 回调和返回值。
-->

* `callback` {Function} 操作完成后调用。
* 返回：{boolean} 如果流希望调用代码在继续写入更多数据之前等待 `'drain'` 事件发出，则为 `false`；否则为 `true`。

`writeStream.clearScreenDown()` 从当前光标向下清除该 `WriteStream`。

### `writeStream.columns`

<!-- YAML
added: v0.7.7
-->

一个 `number`，指定 TTY 当前拥有的列数。每当发出 `'resize'` 事件时，此属性都会更新。

### `writeStream.cursorTo(x[, y][, callback])`

<!-- YAML
added: v0.7.7
changes:
  - version: v12.7.0
    pr-url: https://github.com/nodejs/node/pull/28721
    description: 暴露了流的 write() 回调和返回值。
-->

* `x` {number}
* `y` {number}
* `callback` {Function} 操作完成后调用。
* 返回：{boolean} 如果流希望调用代码在继续写入更多数据之前等待 `'drain'` 事件发出，则为 `false`；否则为 `true`。

`writeStream.cursorTo()` 将此 `WriteStream` 的光标移动到指定位置。

### `writeStream.getColorDepth([env])`

<!-- YAML
added: v9.9.0
-->

* `env` {Object} 包含要检查的环境变量的对象。这使得模拟特定终端的使用成为可能。**默认值：** `process.env`。
* 返回：{number}

返回：

* `1` 代表 2，
* `4` 代表 16，
* `8` 代表 256，
* `24` 代表支持 16,777,216 种颜色。

使用此方法确定终端支持什么颜色。由于终端颜色的性质，可能会出现假阳性或假阴性。这取决于进程信息和环境变量，它们可能会谎报所使用的终端。
可以传入一个 `env` 对象来模拟特定终端的使用。这对于检查特定环境设置的行为很有用。

要强制特定的颜色支持，请使用以下环境设置之一。

* 2 种颜色：`FORCE_COLOR = 0`（禁用颜色）
* 16 种颜色：`FORCE_COLOR = 1`
* 256 种颜色：`FORCE_COLOR = 2`
* 16,777,216 种颜色：`FORCE_COLOR = 3`

也可以使用 `NO_COLOR` 和 `NODE_DISABLE_COLORS` 环境变量来禁用颜色支持。

### `writeStream.getWindowSize()`

<!-- YAML
added: v0.7.7
-->

* 返回：{number\[]}

`writeStream.getWindowSize()` 返回与此 `WriteStream` 对应的 TTY 的大小。数组类型为 `[numColumns, numRows]`，其中 `numColumns` 和 `numRows` 代表相应 TTY 中的列数和行数。

### `writeStream.hasColors([count][, env])`

<!-- YAML
added:
 - v11.13.0
 - v10.16.0
-->

* `count` {integer} 请求的颜色数量（最少 2 种）。**默认值：** 16。
* `env` {Object} 包含要检查的环境变量的对象。这使得模拟特定终端的使用成为可能。**默认值：** `process.env`。
* 返回：{boolean}

如果 `writeStream` 支持至少 `count` 中提供的颜色数量，则返回 `true`。最低支持是 2 种（黑白）。

这与 [`writeStream.getColorDepth()`][] 中描述的假阳性和假阴性相同。

```js
process.stdout.hasColors();
// 如果 `stdout` 支持至少 16 种颜色，则返回 true 或 false。
process.stdout.hasColors(256);
// 如果 `stdout` 支持至少 256 种颜色，则返回 true 或 false。
process.stdout.hasColors({ TMUX: '1' });
// 返回 true。
process.stdout.hasColors(2 ** 24, { TMUX: '1' });
// 返回 false（环境设置假装支持 2 ** 8 种颜色）。
```

### `writeStream.isTTY`

<!-- YAML
added: v0.5.8
-->

始终为 `true` 的 `boolean`。

### `writeStream.moveCursor(dx, dy[, callback])`

<!-- YAML
added: v0.7.7
changes:
  - version: v12.7.0
    pr-url: https://github.com/nodejs/node/pull/28721
    description: 暴露了流的 write() 回调和返回值。
-->

* `dx` {number}
* `dy` {number}
* `callback` {Function} 操作完成后调用。
* 返回：{boolean} 如果流希望调用代码在继续写入更多数据之前等待 `'drain'` 事件发出，则为 `false`；否则为 `true`。

`writeStream.moveCursor()` 将此 `WriteStream` 的光标相对于其当前位置移动。

### `writeStream.rows`

<!-- YAML
added: v0.7.7
-->

一个 `number`，指定 TTY 当前拥有的行数。每当发出 `'resize'` 事件时，此属性都会更新。

## `tty.isatty(fd)`

<!-- YAML
added: v0.5.8
-->

* `fd` {number} 数字文件描述符
* 返回：{boolean}

如果给定的 `fd` 与 TTY 关联，`tty.isatty()` 方法返回 `true`，如果不关联则返回 `false`，包括当 `fd` 不是非负整数时。

[`net.Socket` 构造函数]: net.md#new-netsocketoptions
[`process.stderr`]: process.md#processstderr
[`process.stdin`]: process.md#processstdin
[`process.stdout`]: process.md#processstdout
[`writeStream.getColorDepth()`]: #writestreamgetcolordepthenv
