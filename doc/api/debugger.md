# 调试器

<!--introduced_in=v0.9.12-->

> 稳定性：2 - 稳定

<!-- type=misc -->

Node.js 包含一个命令行调试工具。Node.js 调试器客户端不是一个功能齐全的调试器，但可以进行简单的单步执行和检查。

要使用它，请使用 `inspect` 参数启动 Node.js，后跟要调试的脚本路径。

```console
$ node inspect myscript.js
< Debugger listening on ws://127.0.0.1:9229/621111f9-ffcb-4e82-b718-48a145fa5db8
< For help, see: https://nodejs.org/learn/getting-started/debugging
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
< For help, see: https://nodejs.org/learn/getting-started/debugging
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

## 探测模式

<!-- YAML
added:
  - v26.1.0
-->

> 稳定性：1 - 实验性

`node inspect` 通过 `--probe` 标志支持一种用于检查应用程序运行时值的非交互式探测模式。探测模式会启动应用程序，设置一个或多个源代码断点，在命中匹配断点时计算一个表达式，并在会话结束时（无论是正常完成还是超时）打印一份最终报告。这使开发者无需修改应用程序代码并在之后清理，就能进行类似 `printf` 的调试，同时也支持供工具使用的结构化输出。

```console
$ node inspect [--json] [--preview] [--timeout=<ms>] [--port=<port>] \
    --probe app.js:10 --expr 'x' \
    [--probe app.js:20 --expr 'y' ...] \
    [--] [<node-option> ...] <script.js> [args...]
```

* `--probe <file>:<line>[:<col>]`：要探测的源位置。行号和列号从 1 开始。
* `--timeout=<ms>`：整个探测会话的全局墙钟时间截止期限。默认值为 `30000`。这可用于探测一个可由外部终止的长时间运行应用程序。
* `--json`：如果使用，将打印结构化 JSON 报告，而不是默认的文本报告。
* `--preview`：如果使用，非原始值将在输出中包含对象类 JSON 探测值的 CDP 属性预览。
* `--port=<port>`：为 `--inspect-brk` 启动路径选择本地 inspector 端口。探测模式默认为 `0`，这会请求一个随机端口。
* `--` 是可选的，除非子进程需要自己的 Node.js 标志。

关于 `--probe` 和 `--expr` 参数还有以下附加规则：

* `--probe <file>:<line>[:<col>]` 和 `--expr <expr>` 必须严格成对出现。每个 `--probe` 后面必须紧跟且仅能跟一个 `--expr`。
* `--timeout`、`--json`、`--preview` 和 `--port` 是整个探测会话的全局探测选项。它们可以出现在每个探测对之前或之间，但不能出现在 `--probe` 与其匹配的 `--expr` 之间。

如果单个探测需要计算多个值，
请在 `--expr` 中计算一个结构化值，例如 `--expr "{ foo, bar }"`
或 `--expr "[foo, bar]"`，并使用 `--preview` 为
输出中的任何对象类值包含属性预览。

探测模式只会将最终探测报告打印到 stdout，并且会静默子进程的 stdout/stderr。如果子进程在探测会话开始后以错误退出，最终报告会记录一个终止性的 `error` 事件，其中包含退出码和捕获到的子进程 stderr。无效参数以及致命的启动或连接失败仍可能向 stderr 打印诊断信息，而不会给出最终探测结果。

考虑以下脚本：

```js
// cli.js
let maxRSS = 0;
for (let i = 0; i < 2; i++) {
  const { rss } = process.memoryUsage();
  maxRSS = Math.max(maxRSS, rss);
}
```

如果未使用 `--json`，输出将以人类可读的文本格式打印：

```console
$ node inspect --probe cli.js:5 --expr 'rss' cli.js
Hit 1 at cli.js:5
  rss = 54935552
Hit 2 at cli.js:5
  rss = 55083008
Completed
```

原始类型结果会直接打印，而对象和数组在可用时会使用 Chrome DevTools Protocol 的预览数据。其他非原始值则回退为 Chrome DevTools Protocol 的 `description` 字符串。表达式失败会记录为 `[error] ...` 行，但不会导致整个会话失败。如果需要更丰富的文本格式，可以将表达式包装在 `JSON.stringify(...)` 或 `util.inspect(...)` 中。

使用 `--json` 时，输出结构如下：

```console
$ node inspect --json --probe cli.js:5 --expr 'rss' cli.js
{"v":1,"probes":[{"expr":"rss","target":["cli.js",5]}],"results":[{"probe":0,"event":"hit","hit":1,"result":{"type":"number","value":55443456,"description":"55443456"}},{"probe":0,"event":"hit","hit":2,"result":{"type":"number","value":55574528,"description":"55574528"}},{"event":"completed"}]}
```

```json
{
  "v": 1, // 探测 JSON 结构版本。
  "probes": [
    {
      "expr": "rss", // 与 --probe 配对的表达式。
      "target": ["cli.js", 5] // [文件, 行] 或 [文件, 行, 列]。
    }
  ],
  "results": [
    {
      "probe": 0, // probes[] 的索引。
      "event": "hit", // 命中事件按观察顺序记录。
      "hit": 1, // 该探测的 1-based 命中次数。
      "result": {
        "type": "number",
        "value": 55443456,
        "description": "55443456"
      }
      // 如果表达式抛出异常，则这里是 "error" 而不是 "result"。
    },
    {
      "probe": 0,
      "event": "hit",
      "hit": 2,
      "result": {
        "type": "number",
        "value": 55574528,
        "description": "55574528"
      }
    },
    {
      "event": "completed"
      // 最后一条记录始终是一个终止事件，例如：
      // 1. { "event": "completed" }
      // 2. { "event": "miss", "pending": [0, 1] }
      // 3. {
      //      "event": "timeout",
      //      "pending": [0],
      //      "error": {
      //       "code": "probe_timeout",
      //       "message": "等待探测超时，已等待 30000ms：app.js:10"
      //      }
      //    }
      // 4. {
      //      "event": "error",
      //      "pending": [0],
      //      "error": {
      //       "code": "probe_target_exit",
      //       "exitCode": 1,
      //       "stderr": "[Error: boom]",
      //       "message": "在命中探测之前目标以代码 1 退出：app.js:10"
      //      }
      //    }
    }
  ]
}
```

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
< For help, see: https://nodejs.org/learn/getting-started/debugging
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
< For help, see: https://nodejs.org/learn/getting-started/debugging
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
For help, see: https://nodejs.org/learn/getting-started/debugging
```

（在上面的示例中，URL 末尾的 UUID dc9010dd-f8b8-4ac5-a510-c1a114ec7d29 是动态生成的，它在不同的调试会话中会有所不同。）

[Chrome DevTools 协议]: https://chromedevtools.github.io/devtools-protocol/
[`debugger`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger
