# 调试器

<!--introduced_in=v0.9.12-->

> 稳定性：2 - 稳定

<!-- type=misc -->

Node.js 包含一个命令行调试工具。Node.js 调试器客户端不是一个功能齐全的调试器，但可以进行简单的单步执行和检查。

要使用它，请使用 `inspect` 参数启动 Node.js，后跟要调试的脚本路径。

```console
$ node inspect myscript.js
< Debugger listening on ws://127.0.0.1:9229/621111f9-ffcb-4e82-b718-48a145fa5db8
< For help, see: https://nodejs.org/en/docs/inspector
<
connecting to 127.0.0.1:9229 ... ok
< Debugger attached.
<
 ok
Break on start in myscript.js:2
  1 // myscript.js
> 2 global.x = 5;
  3 setTimeout(() => {
  4   debugger;
debug>
```

调试器会自动在第一行可执行代码处中断。若要运行直到第一个断点（由 [`debugger`][] 语句指定），请将 `NODE_INSPECT_RESUME_ON_START` 环境变量设置为 `1`。

```console
$ cat myscript.js
// myscript.js
global.x = 5;
setTimeout(() => {
  debugger;
  console.log('world');
}, 1000);
console.log('hello');
$ NODE_INSPECT_RESUME_ON_START=1 node inspect myscript.js
< Debugger listening on ws://127.0.0.1:9229/f1ed133e-7876-495b-83ae-c32c6fc319c2
< For help, see: https://nodejs.org/en/docs/inspector
<
connecting to 127.0.0.1:9229 ... ok
< Debugger attached.
<
< hello
<
break in myscript.js:4
  2 global.x = 5;
  3 setTimeout(() => {
> 4   debugger;
  5   console.log('world');
  6 }, 1000);
debug> next
break in myscript.js:5
  3 setTimeout(() => {
  4   debugger;
> 5   console.log('world');
  6 }, 1000);
  7 console.log('hello');
debug> repl
Press Ctrl+C to leave debug repl
> x
5
> 2 + 2
4
debug> next
< world
<
break in myscript.js:6
  4   debugger;
  5   console.log('world');
> 6 }, 1000);
  7 console.log('hello');
  8
debug> .exit
$
```

`repl` 命令允许远程评估代码。`next` 命令单步执行到下一行。输入 `help` 查看其他可用命令。

在不输入命令的情况下按 `enter` 键将重复上一条调试器命令。

## 监视器

在调试时可以监视表达式和变量值。在每个断点处，监视列表中的每个表达式将在当前上下文中评估，并立即显示在断点源代码列表之前。

要开始监视表达式，输入 `watch('my_expression')`。命令 `watchers` 将打印活动的监视器。要移除监视器，输入 `unwatch('my_expression')`。

## 命令参考

### 单步执行

* `cont`, `c`: 继续执行
* `next`, `n`: 单步跳过
* `step`, `s`: 单步进入
* `out`, `o`: 单步退出
* `pause`: 暂停运行代码（类似于开发者工具中的暂停按钮）

### 断点

* `setBreakpoint()`, `sb()`: 在当前行设置断点
* `setBreakpoint(line)`, `sb(line)`: 在指定行设置断点
* `setBreakpoint('fn()')`, `sb(...)`: 在函数体的第一条语句上设置断点
* `setBreakpoint('script.js', 1)`, `sb(...)`: 在 `script.js` 的第一行设置断点
* `setBreakpoint('script.js', 1, 'num < 4')`, `sb(...)`: 在 `script.js` 的第一行设置条件断点，仅当 `num < 4` 评估为 `true` 时中断
* `clearBreakpoint('script.js', 1)`, `cb(...)`: 清除 `script.js` 第 1 行的断点

也可以在尚未加载的文件（模块）中设置断点：

```console
$ node inspect main.js
< Debugger listening on ws://127.0.0.1:9229/48a5b28a-550c-471b-b5e1-d13dd7165df9
< For help, see: https://nodejs.org/en/docs/inspector
<
connecting to 127.0.0.1:9229 ... ok
< Debugger attached.
<
Break on start in main.js:1
> 1 const mod = require('./mod.js');
  2 mod.hello();
  3 mod.hello();
debug> setBreakpoint('mod.js', 22)
Warning: script 'mod.js' was not loaded yet.
debug> c
break in mod.js:22
 20 // 软件中的其他交易或使用。
 21
>22 exports.hello = function() {
 23   return 'hello from module';
 24 };
debug>
```

也可以设置一个条件断点，仅当给定表达式评估为 `true` 时才中断：

```console
$ node inspect main.js
< Debugger listening on ws://127.0.0.1:9229/ce24daa8-3816-44d4-b8ab-8273c8a66d35
< For help, see: https://nodejs.org/en/docs/inspector
<
connecting to 127.0.0.1:9229 ... ok
< Debugger attached.
Break on start in main.js:7
  5 }
  6
> 7 addOne(10);
  8 addOne(-1);
  9
debug> setBreakpoint('main.js', 4, 'num < 0')
  1 'use strict';
  2
  3 function addOne(num) {
> 4   return num + 1;
  5 }
  6
  7 addOne(10);
  8 addOne(-1);
  9
debug> cont
break in main.js:4
  2
  3 function addOne(num) {
> 4   return num + 1;
  5 }
  6
debug> exec('num')
-1
debug>
```

### 信息

* `backtrace`, `bt`: 打印当前执行帧的回溯
* `list(5)`: 列出脚本源代码，带有 5 行上下文（前后各 5 行）
* `watch(expr)`: 将表达式添加到监视列表
* `unwatch(expr)`: 从监视列表中移除表达式
* `unwatch(index)`: 从监视列表中移除特定索引处的表达式
* `watchers`: 列出所有监视器及其值（每个断点处自动列出）
* `repl`: 打开调试器的 repl 以在调试脚本的上下文中进行评估
* `exec expr`, `p expr`: 在调试脚本的上下文中执行表达式并打印其值
* `profile`: 启动 CPU 性能分析会话
* `profileEnd`: 停止当前 CPU 性能分析会话
* `profiles`: 列出所有已完成的 CPU 性能分析会话
* `profiles[n].save(filepath = 'node.cpuprofile')`: 将 CPU 性能分析会话保存为 JSON 到磁盘
* `takeHeapSnapshot(filepath = 'node.heapsnapshot')`: 获取堆快照并保存为 JSON 到磁盘

### 执行控制

* `run`: 运行脚本（调试器启动时自动运行）
* `restart`: 重启脚本
* `kill`: 终止脚本

### 其他

* `scripts`: 列出所有已加载的脚本
* `version`: 显示 V8 的版本

## 高级用法

### Node.js 的 V8 inspector 集成

V8 Inspector 集成允许将 Chrome DevTools 附加到 Node.js 实例以进行调试和性能分析。它使用 [Chrome DevTools 协议][]。

启动 Node.js 应用程序时传递 `--inspect` 标志可以启用 V8 Inspector。也可以使用该标志提供自定义端口，例如 `--inspect=9222` 将在端口 9222 上接受 DevTools 连接。

使用 `--inspect` 标志将在调试器连接之前立即执行代码。这意味着代码将在你开始调试之前开始运行，如果你想从一开始就调试，这可能不理想。

在这种情况下，你有两个选择：

1. `--inspect-wait` 标志：此标志将等待调试器附加后再执行代码。这允许你从执行一开始就开始调试。
2. `--inspect-brk` 标志：与 `--inspect` 不同，此标志将在调试器附加后立即在第一行代码处中断。当你想从一开始就逐步调试代码，而在调试之前不执行任何代码时，这很有用。

因此，在决定使用 `--inspect`、`--inspect-wait` 和 `--inspect-brk` 时，请考虑你是希望代码立即开始执行，等待调试器附加后再执行，还是在第一行中断以进行逐步调试。

```console
$ node --inspect index.js
Debugger listening on ws://127.0.0.1:9229/dc9010dd-f8b8-4ac5-a510-c1a114ec7d29
For help, see: https://nodejs.org/en/docs/inspector
```

（在上面的示例中，URL 末尾的 UUID dc9010dd-f8b8-4ac5-a510-c1a114ec7d29 是动态生成的，它在不同的调试会话中会有所不同。）

[Chrome DevTools 协议]: https://chromedevtools.github.io/devtools-protocol/
[`debugger`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger
