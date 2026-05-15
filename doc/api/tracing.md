# 跟踪事件

<!--introduced_in=v7.7.0-->

> 稳定性：1 - 实验性

<!-- source_link=lib/trace_events.js -->

`node:trace_events` 模块提供了一种机制，用于集中化由 V8、Node.js 核心和用户空间代码生成的跟踪信息。

可以通过 `--trace-event-categories` 命令行标志或使用 `node:trace_events` 模块来启用跟踪。`--trace-event-categories` 标志接受一个逗号分隔的类别名称列表。

可用的类别有：

* `node`：一个空占位符。
* `node.async_hooks`：启用捕获详细的 [`async_hooks`][] 跟踪数据。[`async_hooks`][] 事件具有唯一的 `asyncId` 和一个特殊的 `triggerId` `triggerAsyncId` 属性。
* `node.bootstrap`：启用捕获 Node.js 引导里程碑。
* `node.console`：启用捕获 `console.time()` 和 `console.count()` 输出。
* `node.threadpoolwork.sync`：启用捕获线程池同步操作的跟踪数据，例如 `blob`、`zlib`、`crypto` 和 `node_api`。
* `node.threadpoolwork.async`：启用捕获线程池异步操作的跟踪数据，例如 `blob`、`zlib`、`crypto` 和 `node_api`。
* `node.dns.native`：启用捕获 DNS 查询的跟踪数据。
* `node.net.native`：启用捕获网络的跟踪数据。
* `node.environment`：启用捕获 Node.js 环境里程碑。
* `node.fs.sync`：启用捕获文件系统同步方法的跟踪数据。
* `node.fs_dir.sync`：启用捕获文件系统同步目录方法的跟踪数据。
* `node.fs.async`：启用捕获文件系统异步方法的跟踪数据。
* `node.fs_dir.async`：启用捕获文件系统异步目录方法的跟踪数据。
* `node.perf`：启用捕获 [Performance API][] 测量。
  * `node.perf.usertiming`：仅启用捕获性能 API 用户计时测量和标记。
  * `node.perf.timerify`：仅启用捕获性能 API timerify 测量。
* `node.promises.rejections`：启用捕获跟踪数据，跟踪未处理的 Promise 拒绝和拒绝后处理的数量。
* `node.vm.script`：启用捕获 `node:vm` 模块的 `runInNewContext()`、`runInContext()` 和 `runInThisContext()` 方法的跟踪数据。
* `v8`：[V8][] 事件与 GC、编译和执行相关。
* `node.http`：启用捕获 http 请求/响应的跟踪数据。
* `node.module_timer`：启用捕获 CJS 模块加载的跟踪数据。

默认情况下，`node`、`node.async_hooks` 和 `v8` 类别已启用。

```bash
node --trace-event-categories v8,node,node.async_hooks server.js
```

早期版本的 Node.js 需要使用 `--trace-events-enabled` 标志来启用跟踪事件。此要求已移除。但是，`--trace-events-enabled` 标志 _可能_ 仍可使用，并将默认启用 `node`、`node.async_hooks` 和 `v8` 跟踪事件类别。

```bash
node --trace-events-enabled

# 等同于

node --trace-event-categories v8,node,node.async_hooks
```

或者，可以使用 `node:trace_events` 模块启用跟踪事件：

```mjs
import { createTracing } from 'node:trace_events';
const tracing = createTracing({ categories: ['node.perf'] });
tracing.enable();  // 启用 'node.perf' 类别的跟踪事件捕获

// 执行工作

tracing.disable();  // 禁用 'node.perf' 类别的跟踪事件捕获
```

```cjs
const { createTracing } = require('node:trace_events');
const tracing = createTracing({ categories: ['node.perf'] });
tracing.enable();  // 启用 'node.perf' 类别的跟踪事件捕获

// 执行工作

tracing.disable();  // 禁用 'node.perf' 类别的跟踪事件捕获
```

运行启用了跟踪的 Node.js 将生成日志文件，可以在 Chrome 的 [`chrome://tracing`](https://www.chromium.org/developers/how-tos/trace-event-profiling-tool) 标签页中打开。

日志文件默认名为 `node_trace.${rotation}.log`，其中 `${rotation}` 是一个递增的日志轮换 id。文件路径模式可以使用 `--trace-event-file-pattern` 指定，它接受一个支持 `${rotation}` 和 `${pid}` 的模板字符串：

```bash
node --trace-event-categories v8 --trace-event-file-pattern '${pid}-${rotation}.log' server.js
```

为了保证日志文件在信号事件（如 `SIGINT`、`SIGTERM` 或 `SIGBREAK`）后正确生成，请确保代码中有适当的处理程序，例如：

```js
process.on('SIGINT', function onSigint() {
  console.info('收到 SIGINT。');
  process.exit(130);  // 或者取决于操作系统和信号的适用退出代码
});
```

跟踪系统使用与 `process.hrtime()` 相同的时间源。但是跟踪事件时间戳以微秒表示，而 `process.hrtime()` 返回纳秒。

此模块的功能在 [`Worker`][] 线程中不可用。

## `node:trace_events` 模块

<!-- YAML
added: v10.0.0
-->

### `Tracing` 对象

<!-- YAML
added: v10.0.0
-->

`Tracing` 对象用于启用或禁用一组类别的跟踪。实例是使用 `trace_events.createTracing()` 方法创建的。

创建时，`Tracing` 对象处于禁用状态。调用 `tracing.enable()` 方法会将类别添加到启用的跟踪事件类别集合中。调用 `tracing.disable()` 将从启用的跟踪事件类别集合中移除类别。

#### `tracing.categories`

<!-- YAML
added: v10.0.0
-->

* 类型：{string}

此 `Tracing` 对象涵盖的跟踪事件类别的逗号分隔列表。

#### `tracing.disable()`

<!-- YAML
added: v10.0.0
-->

禁用此 `Tracing` 对象。

只有未被其他启用的 `Tracing` 对象覆盖且未由 `--trace-event-categories` 标志指定的跟踪事件类别才会被禁用。

```mjs
import { createTracing, getEnabledCategories } from 'node:trace_events';
const t1 = createTracing({ categories: ['node', 'v8'] });
const t2 = createTracing({ categories: ['node.perf', 'node'] });
t1.enable();
t2.enable();

// 打印 'node,node.perf,v8'
console.log(getEnabledCategories());

t2.disable(); // 将仅禁用 'node.perf' 类别的发出

// 打印 'node,v8'
console.log(getEnabledCategories());
```

```cjs
const { createTracing, getEnabledCategories } = require('node:trace_events');
const t1 = createTracing({ categories: ['node', 'v8'] });
const t2 = createTracing({ categories: ['node.perf', 'node'] });
t1.enable();
t2.enable();

// 打印 'node,node.perf,v8'
console.log(getEnabledCategories());

t2.disable(); // 将仅禁用 'node.perf' 类别的发出

// 打印 'node,v8'
console.log(getEnabledCategories());
```

#### `tracing.enable()`

<!-- YAML
added: v10.0.0
-->

为此 `Tracing` 对象涵盖的一组类别启用此 `Tracing` 对象。

#### `tracing.enabled`

<!-- YAML
added: v10.0.0
-->

* 类型：{boolean} 仅当 `Tracing` 对象已启用时为 `true`。

### `trace_events.createTracing(options)`

<!-- YAML
added: v10.0.0
-->

* `options` {Object}
  * `categories` {string\[]} 跟踪类别名称数组。数组中的值在可能的情况下会被强制转换为字符串。如果值无法被强制转换，将抛出错误。
* 返回：{Tracing}。

为给定的一组 `categories` 创建并返回一个 `Tracing` 对象。

```mjs
import { createTracing } from 'node:trace_events';
const categories = ['node.perf', 'node.async_hooks'];
const tracing = createTracing({ categories });
tracing.enable();
// 执行操作
tracing.disable();
```

```cjs
const { createTracing } = require('node:trace_events');
const categories = ['node.perf', 'node.async_hooks'];
const tracing = createTracing({ categories });
tracing.enable();
// 执行操作
tracing.disable();
```

### `trace_events.getEnabledCategories()`

<!-- YAML
added: v10.0.0
-->

* 返回：{string}

返回当前所有启用的跟踪事件类别的逗号分隔列表。当前启用的跟踪事件类别集合由所有当前启用的 `Tracing` 对象和任何使用 `--trace-event-categories` 标志启用的类别的 _并集_ 确定。

给定下面的文件 `test.js`，命令 `node --trace-event-categories node.perf test.js` 将向控制台打印 `'node.async_hooks,node.perf'`。

```mjs
import { createTracing, getEnabledCategories } from 'node:trace_events';
const t1 = createTracing({ categories: ['node.async_hooks'] });
const t2 = createTracing({ categories: ['node.perf'] });
const t3 = createTracing({ categories: ['v8'] });

t1.enable();
t2.enable();

console.log(getEnabledCategories());
```

```cjs
const { createTracing, getEnabledCategories } = require('node:trace_events');
const t1 = createTracing({ categories: ['node.async_hooks'] });
const t2 = createTracing({ categories: ['node.perf'] });
const t3 = createTracing({ categories: ['v8'] });

t1.enable();
t2.enable();

console.log(getEnabledCategories());
```

## 示例

### 通过 inspector 收集跟踪事件数据

```mjs
import { Session } from 'node:inspector';
const session = new Session();
session.connect();

function post(message, data) {
  return new Promise((resolve, reject) => {
    session.post(message, data, (err, result) => {
      if (err)
        reject(new Error(JSON.stringify(err)));
      else
        resolve(result);
    });
  });
}

async function collect() {
  const data = [];
  session.on('NodeTracing.dataCollected', (chunk) => data.push(chunk));
  session.on('NodeTracing.tracingComplete', () => {
    // 完成
  });
  const traceConfig = { includedCategories: ['v8'] };
  await post('NodeTracing.start', { traceConfig });
  // 执行某些操作
  setTimeout(() => {
    post('NodeTracing.stop').then(() => {
      session.disconnect();
      console.log(data);
    });
  }, 1000);
}

collect();
```

```cjs
const { Session } = require('node:inspector');
const session = new Session();
session.connect();

function post(message, data) {
  return new Promise((resolve, reject) => {
    session.post(message, data, (err, result) => {
      if (err)
        reject(new Error(JSON.stringify(err)));
      else
        resolve(result);
    });
  });
}

async function collect() {
  const data = [];
  session.on('NodeTracing.dataCollected', (chunk) => data.push(chunk));
  session.on('NodeTracing.tracingComplete', () => {
    // 完成
  });
  const traceConfig = { includedCategories: ['v8'] };
  await post('NodeTracing.start', { traceConfig });
  // 执行某些操作
  setTimeout(() => {
    post('NodeTracing.stop').then(() => {
      session.disconnect();
      console.log(data);
    });
  }, 1000);
}

collect();
```

[Performance API]: perf_hooks.md
[V8]: v8.md
[`Worker`]: worker_threads.md#class-worker
[`async_hooks`]: async_hooks.md
