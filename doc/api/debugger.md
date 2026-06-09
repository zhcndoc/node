# 调试器

<!--introduced_in=v0.9.12-->

> 稳定性：2 - 稳定

<!-- type=misc -->

Node.js 包含一个命令行调试工具。Node.js 调试器客户端不是一个功能齐全的调试器，但可以进行简单的单步执行和检查。

调试器支持两种操作模式：[交互模式][] 和 [非交互式探测模式][]。

## 交互模式

```console
$ node inspect [--port=<port>] [<node-option> ...] [<script> [<script-args>] | <host>:<port> | -p <pid>]
```

要使用它，请使用 `inspect` 参数启动 Node.js，然后跟上要调试的脚本路径。

```console
$ node inspect myscript.js
< Debugger listening on ws://127.0.0.1:9229/621111f9-ffcb-4e82-b718-48a145fa5db8
< 如需帮助，请参见：https://nodejs.org/learn/getting-started/debugging
<
connecting to 127.0.0.1:9229 ... ok
< Debugger attached.
<
 ok
在 myscript.js:2 处于启动时中断
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
< 如需帮助，请参见：https://nodejs.org/learn/getting-started/debugging
<
connecting to 127.0.0.1:9229 ... ok
< Debugger attached.
<
< hello
<
在 myscript.js:4 处断开
  2 global.x = 5;
  3 setTimeout(() => {
> 4   debugger;
  5   console.log('world');
  6 }, 1000);
debug> next
在 myscript.js:5 处断开
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
在 myscript.js:6 处断开
  4   debugger;
  5   console.log('world');
> 6 }, 1000);
  7 console.log('hello');
  8
debug> .exit
$
```

`repl` 命令允许远程求值代码。`next` 命令单步执行到下一行。输入 `help` 查看其他可用命令。

在不输入命令的情况下按 `enter` 键将重复上一条调试器命令。

### 观察器

在调试时可以观察表达式和变量值。每次断点触发时，观察器列表中的每个表达式都会在当前上下文中求值，并在断点源码列表之前立即显示。

要开始观察一个表达式，请输入 `watch('my_expression')`。`watchers` 命令会打印当前有效的观察器。要移除某个观察器，请输入 `unwatch('my_expression')`。

## 命令参考

### 单步执行

* `cont`, `c`: 继续执行
* `next`, `n`: 单步到下一行
* `step`, `s`: 单步进入
* `out`, `o`: 单步跳出
* `pause`: 暂停正在运行的代码（类似于开发者工具中的暂停按钮）

#### 断点

* `setBreakpoint()`, `sb()`: 在当前行设置断点
* `setBreakpoint(line)`, `sb(line)`: 在指定行设置断点
* `setBreakpoint('fn()')`, `sb(...)`: 在函数体的第一条语句处设置断点
* `setBreakpoint('script.js', 1)`, `sb(...)`: 在 `script.js` 第一行设置断点
* `setBreakpoint('script.js', 1, 'num < 4')`, `sb(...)`: 在 `script.js` 第一行设置条件断点，仅当 `num < 4` 求值为 `true` 时才会中断
* `clearBreakpoint('script.js', 1)`, `cb(...)`: 清除 `script.js` 第 1 行的断点

也可以在尚未加载的文件（模块）中设置断点：

```console
$ node inspect main.js
< Debugger listening on ws://127.0.0.1:9229/48a5b28a-550c-471b-b5e1-d13dd7165df9
< 如需帮助，请参见：https://nodejs.org/learn/getting-started/debugging
<
connecting to 127.0.0.1:9229 ... ok
< Debugger attached.
<
在 main.js:1 处于启动时中断
> 1 const mod = require('./mod.js');
  2 mod.hello();
  3 mod.hello();
debug> setBreakpoint('mod.js', 22)
Warning: script 'mod.js' was not loaded yet.
debug> c
在 mod.js:22 处断开
 20 // USE OR OTHER DEALINGS IN THE SOFTWARE.
 21
>22 exports.hello = function() {
 23   return 'hello from module';
 24 };
debug>
```

也可以设置一个条件断点，仅在给定表达式求值为 `true` 时才会中断：

```console
$ node inspect main.js
< Debugger listening on ws://127.0.0.1:9229/ce24daa8-3816-44d4-b8ab-8273c8a66d35
< 如需帮助，请参见：https://nodejs.org/learn/getting-started/debugging
<
connecting to 127.0.0.1:9229 ... ok
< Debugger attached.
在 main.js:7 处于启动时中断
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
在 main.js:4 处断开
  2
  3 function addOne(num) {
> 4   return num + 1;
  5 }
  6
debug> exec('num')
-1
debug>
```

#### 信息

* `backtrace`, `bt`: 打印当前执行帧的回溯
* `list(5)`: 以 5 行上下文列出脚本源代码（前后各 5 行）
* `watch(expr)`: 将表达式添加到观察列表
* `unwatch(expr)`: 从观察列表中移除表达式
* `unwatch(index)`: 从观察列表中移除指定索引处的表达式
* `watchers`: 列出所有观察器及其值（每次断点都会自动列出）
* `repl`: 打开调试器的 repl，在调试脚本上下文中求值
* `exec expr`, `p expr`: 在调试脚本上下文中执行表达式并打印其值
* `profile`: 开始 CPU 性能分析会话
* `profileEnd`: 停止当前 CPU 性能分析会话
* `profiles`: 列出所有已完成的 CPU 性能分析会话
* `profiles[n].save(filepath = 'node.cpuprofile')`: 将 CPU 性能分析会话保存为 JSON 到磁盘
* `takeHeapSnapshot(filepath = 'node.heapsnapshot')`: 采集堆快照并保存为 JSON 到磁盘

#### 执行控制

* `run`: 运行脚本（调试器启动时会自动运行）
* `restart`: 重启脚本
* `kill`: 终止脚本

#### 其他

* `scripts`: 列出所有已加载的脚本
* `version`: 显示 V8 的版本

## 探测模式

<!-- YAML
added:
  - v26.1.0
  - v24.16.0
changes:
  - version: v26.3.0
    pr-url: https://github.com/nodejs/node/pull/63437
    description: 添加 inspector 端会话中途失败时的终端 `error` 事件 `probe_failure`，以及用于提供每次命中和终端错误额外上下文的 `error.details`。
  - version: v26.2.0
    pr-url: https://github.com/nodejs/node/pull/63286
    description: JSON 报告 schema 升级到 v2。Probe `target` 现在是 `{ suffix, line, column? }`，而不是数组。每个 "hit" 事件都携带一个 `location` 字段，报告实际求值位置。当探测未指定列时，它会绑定到该行第一个可执行列，而不是默认绑定到 1。
-->

> 稳定性：1 - 实验性

`node inspect` 通过 `--probe` 标志支持一种非交互式探测模式，用于检查应用中的运行时值。

目前，探测模式仅支持从命令行指定的入口脚本启动一个新进程。

探测模式会设置一个或多个源码断点；每当执行到断点时，就会求值指定表达式，并在会话结束时（正常完成、出错或超时）打印一份所有已求值表达式的最终报告。这样开发者就可以进行类似 printf 的调试，而无需修改应用代码并在事后清理。它还支持结构化 JSON 输出，便于工具使用。

```console
$ node inspect --probe <file>:<line>[:<col>] --expr <expr>
              [--probe <file>:<line>[:<col>] --expr <expr> ...]
              [--json] [--preview] [--timeout=<ms>] [--port=<port>]
              [--] [<node-option> ...] <script> [<script-args> ...]
```

* `--probe <file>:<line>[:<col>]`: 探测的源位置。当执行到该位置时，会对提供的表达式求值并打印到输出中。`<file>` 会与要探测脚本的 URL 后缀进行匹配。
  `<line>` 和 `<col>` 编号从 1 开始。若省略 `<col>`，探测会绑定到该行第一个可执行列。
* `--expr <expr>`: 每当执行到前一个 `--probe` 指定的位置时要计算的 JavaScript 表达式。
  必须紧跟其所属的 `--probe`。
* `--timeout=<ms>`: 整个探测会话的全局墙钟截止时间。
  默认值为 `30000`。这可用于探测一个可被外部终止的长时间运行应用。
* `--json`: 如使用，则输出结构化 JSON 报告，而不是默认的文本报告。
* `--preview`: 如使用，则非原始值会为对象样式的 JSON 探测值包含 CDP 属性预览。
* `--port=<port>`: 选择探测会话监听的本地 inspector 端口。默认值为 `0`，表示请求一个随机端口。
* `--` 可选，除非子进程需要自己的 Node.js 标志。

关于 `--probe` 和 `--expr` 参数还有以下附加规则：

* `--probe <file>:<line>[:<col>]` 和 `--expr <expr>` 是严格配对的。每个 `--probe` 后面必须立即跟一个且仅一个 `--expr`。
* `--timeout`、`--json`、`--preview` 和 `--port` 是整个探测会话的全局探测选项。它们可以出现在探测对之前或之间，但不能出现在 `--probe` 和其匹配的 `--expr` 之间。
* 如果需要将额外的 Node.js 执行参数传递给子脚本，必须使用 `--` 将探测选项与子脚本的 Node.js 选项分隔开。

示例：

```console
$ node inspect --probe app.js:10 --expr "user"
               --probe src/utils.js:5:15 --expr "config.options"
               --json --preview -- --no-warnings app.js --arg-for-app=foo
```

### 探测输出格式

当探测会话结束时，探测进程会打印一份包含所有探测命中与结果的最终报告。

考虑以下脚本：

```js
// cli.js
let maxRSS = 0;
for (let i = 0; i < 2; i++) {
  const { rss } = process.memoryUsage();
  maxRSS = Math.max(maxRSS, rss);
}
```

不使用 `--json` 时，默认输出为人类可读的文本格式：

```console
$ node inspect --probe cli.js:5 --expr 'rss' cli.js
Hit 1 at file:///path/to/cli.js:5:3
  rss = 54935552
Hit 2 at file:///path/to/cli.js:5:3
  rss = 55083008
Completed
```

传递给 `--probe` 的原始 `<file>:<line>[:<col>]` 可能会被解析到不同的位置，以确保它可中断，或者它可能匹配多个已加载脚本，因此实际求值位置有助于消歧。

原始结果会直接打印，而对象和数组在可用时会使用 Chrome DevTools Protocol 的预览数据。其他非原始值则回退到 Chrome DevTools Protocol 的 `description` 字符串。
表达式失败会记录为 `[error] ...` 行，不会使整个会话失败。如需更丰富的文本格式，可将表达式包裹在 `JSON.stringify(...)` 或 `util.inspect(...)` 中。

使用 `--json` 时，输出结构如下：

```console
$ node inspect --json --probe cli.js:5 --expr 'rss' cli.js
{"v":2,"probes":[{"expr":"rss","target":{"suffix":"cli.js","line":5}}],"results":[{"probe":0,"event":"hit","hit":1,"location":{"url":"file:///path/to/cli.js","line":5,"column":3},"result":{"type":"number","value":55443456,"description":"55443456"}},{"probe":0,"event":"hit","hit":2,"location":{"url":"file:///path/to/cli.js","line":5,"column":3},"result":{"type":"number","value":55574528,"description":"55574528"}},{"event":"completed"}]}
```

```json
{
  "v": 2, // Probe JSON schema version.
  "probes": [
    {
      "expr": "rss", // 与 --probe 配对的表达式。
      "target": {
        // 用户的探测规格。`suffix` 是传递给 --probe 的原始 <file>，并作为
        // 以路径分隔符锚定的后缀与每个已加载脚本的 URL 进行匹配。只有当
        // 用户提供了 `:col` 时才会出现 `column`。实际求值位置可能与目标不同，
        // 并会在每个命中的 `location` 字段中报告。
        "suffix": "cli.js",
        "line": 5
      }
    }
  ],
  "results": [
    {
      "probe": 0, // probes[] 的索引。
      "event": "hit", // 命中事件按观察顺序记录。
      "hit": 1, // 该探测的命中计数，从 1 开始。
      "location": {
        // 执行暂停以求值该探测表达式的实际位置。
        // 这可能由于可暂停性调整或多重匹配而与探测目标不同。
        "url": "file:///path/to/cli.js",
        "line": 5,
        "column": 3
      },
      "result": {
        "type": "number",
        "value": 55443456,
        "description": "55443456"
      }
      // 如果探测表达式抛出、失败或从未完成，该条目会带有 `error` 字段，
      // 而不是 `result`，其形状为 `{ message: string, details?: object }`。
      // `message` 和 `details` 的内容仅供参考，可能会在不同版本之间变化。
    },
    {
      "probe": 0,
      "event": "hit",
      "hit": 2,
      "location": { "url": "file:///path/to/cli.js", "line": 5, "column": 3 },
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
      //       "stderr": "Error: boom",
      //       "message": "Target exited with code 1 before probes: app.js:10"
      //      }
      //    }
      // 5. {
      //      "event": "error",
      //      "pending": [1],
      //      "error": {
      //       "code": "probe_failure",
      //       "probe": 0,
      //       "stderr": "...",
      //       "message": "Target process exited during probe evaluation before probes: app.js:12. If the failure repeats, review the probe expression.",
      //       "details": { "lastCdpMethod": "Debugger.evaluateOnCallFrame" }
      //      }
      //    }
    }
  ]
}
```

### 输出和退出码

探测模式只会将最终探测报告打印到 stdout，并且会屏蔽子进程的 stdout/stderr。探测会话结束时，探测进程通常会以退出码 `0` 退出，并将最终报告打印到 stdout。如果子进程在探测会话结束前以非零代码退出，或者探测会话因其他原因无法完成，则最终报告会记录一个终止 `error` 事件。

当 `error.code` 为 `'probe_failure'` 或 `'probe_timeout'` 时，探测进程会以非零代码退出，表示记录到的命中可能不完整。在这种情况下，`error.message` 会包含恢复提示；并且当 `error.probe` 存在时，它是报告中 `probes` 数组的索引，会尽力标识可能的罪魁祸首探测，以帮助调试。

无效参数以及致命的启动或连接失败，可能会导致探测进程以非零退出码退出，并向 stderr 打印错误消息，而不会输出最终探测报告。

### 在同一执行点探测多个表达式

当多个 `--probe`/`--expr` 对共享同一个 `--probe` 时，这些表达式会在同一次暂停中按其在命令行中出现的顺序求值。

```js
// app.js
const x = { x: 42 };       // 第 2 行
const y = { y: 35 };       // 第 3 行
const z = { ...x, ...y };  // 第 4 行
```

```console
$ node inspect --probe app.js:4 --expr 'x' --probe app.js:4 --expr 'y' -- app.js
```

打印

```text
在 file:///path/to/app.js:4:1 命中 1 次
  x = {x: 42}
在 file:///path/to/app.js:4:1 命中 1 次
  y = {y: 35}
Completed
```

```console
$ node inspect --probe app.js:4 --expr 'x' --probe app.js:4 --expr 'y' --json --preview -- app.js
```

打印

```json
{"v":2,"probes":[{"expr":"x","target":{"suffix":"app.js","line":4}},{"expr":"y","target":{"suffix":"app.js","line":4}}],"results":[{"probe":0,"event":"hit","hit":1,"location":{"url":"file:///path/to/app.js","line":4,"column":1},"result":{"type":"object","description":"Object","preview":{"type":"object","description":"Object","overflow":false,"properties":[{"name":"x","type":"number","value":"42"}]}}},{"probe":1,"event":"hit","hit":1,"location":{"url":"file:///path/to/app.js","line":4,"column":1},"result":{"type":"object","description":"Object","preview":{"type":"object","description":"Object","overflow":false,"properties":[{"name":"y","type":"number","value":"35"}]}}},{"event":"completed"}]}
```

### 选择探测位置

当执行到探测位置时，表达式会在该位置的词法作用域中求值。避免在 `let` 或 `const` 声明处对其声明位置进行探测，因为这会在变量的暂时性死区（TDZ）中访问该变量，从而导致 `ReferenceError`。

```js
// app.js
const x = 42;        // 第 2 行
console.log(x);      // 第 3 行
```

```console
$ node inspect --probe app.js:1 --expr 'x' app.js
Hit 1 at file:///path/to/app.js:1:1
  [error] x = ReferenceError: Cannot access 'x' from debugger
  ...
Completed
```

应改为在变量已经初始化的位置进行探测：

```console
$ node inspect --probe app.js:3 --expr 'x' app.js
Hit 1 at file:///path/to/app.js:3:1
  x = 42
Completed
```

`<file>` 参数会作为每个已加载脚本 URL 的路径后缀进行匹配，并以路径分隔符为锚点。只传入基名会匹配所有具有该基名的已加载脚本，类似于原生调试器通常匹配断点的方式；而传入部分路径则会缩小匹配范围。给定：

```text
project/
  - src/utils.js
  - lib/utils.js
```

`--probe utils.js:10` 会同时绑定到这两个文件，并对每个匹配产生一次命中。
每次命中都会携带自己的 `location` 字段，指明表达式实际执行的位置，因此使用者可以准确地将结果归属到两个文件之一。若要在绑定时消除歧义，请指定一个更完整、只匹配目标文件的路径：

```console
$ node inspect --probe src/utils.js:10 --expr 'x' main.js   # 仅匹配 src/utils.js
```

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
[interactive mode]: #interactive-mode
[non-interactive probe mode]: #probe-mode
