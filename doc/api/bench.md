# 基准测试运行器

<!--introduced_in=v26.9.0-->

<!-- YAML
added: v26.9.0
-->

> 稳定性：1.0 - 早期开发

<!-- source_link=lib/bench.js -->

`node:bench` 模块支持在当前进程中定义并运行 JavaScript 基准测试，也支持在全新的子进程中运行单个基准测试文件。只有在使用 `--experimental-bench` 标志启动 Node.js 时，才能使用此模块；并且只能通过 `node:` 方案导入：

```mjs
import { bench, suite } from 'node:bench';
```

```cjs
const { bench, suite } = require('node:bench');
```

## 基准测试示例

将以下内容保存为 `benchmark.mjs`：

```mjs
import { bench, suite } from 'node:bench';

suite('URL', () => {
  const input = 'https://example.com/a?b=c';

  bench('construct', {
    samples: 30,
    params: { input: 'short' },
  }, (b) => {
    const operations = 10_000;
    let totalLength = 0;

    b.start();
    for (let i = 0; i < operations; i++) {
      totalLength += new URL(input).href.length;
    }
    b.end(operations);

    if (totalLength !== operations * input.length) {
      throw new Error('Unexpected URL result');
    }
  });
});
```

从命令行运行基准测试：

```console
node --experimental-bench --bench benchmark.mjs
```

基准测试按声明顺序串行执行。已声明的基准测试会自动安排运行。在声明所在的同一轮事件循环中调用 `run()`，以使用事件流或配置筛选条件。
如果自动安排的运行失败，且未调用 `run()`，进程退出码将设为 `1`。

## 测量模型

每个预热样本和测量样本都会使用全新的 {BenchContext} 调用一次基准测试函数。该函数必须恰好调用一次 `context.start()` 和 `context.end(operations)`，或者恰好调用一次 `context.record(sample)` 来提供外部测量的样本。`start()` 之前的设置工作和 `end()` 之后的清理工作都不属于测量区域。返回 Promise 的函数会被等待完成。

默认情况下，每次调用样本函数之间都会经过一轮事件循环。嵌入式运行器可以通过 `yieldBetweenSamples` 禁用此行为。运行器会串行执行基准测试，但不会提供进程隔离。进程中的其他工作、JIT 编译、垃圾回收、CPU 频率变化和系统负载都可能影响结果。比较结果时应保留原始样本，并调查嘈杂或偏斜的分布，而不要将置信区间视为通过／失败阈值。

### 测量完整性

统计上稳定一致的结果并不能证明基准测试测量的是预期工作。优化运行时可能会移除结果未被使用的工作，或以比所建模的工作负载更狭窄的方式对其进行专门化。框架和循环开销也可能主导过短的操作。为降低这些风险：

* 让测量工作产生的值在测量区间之外可观察到，例如验证由每个结果推导出的聚合值。仅在未使用的局部计算中传递这些值是不够的。
* 每个样本执行足够多的操作，以摊薄固定的计时器读取开销以及对 `context.start()` 和 `context.end()` 的调用开销。如果循环记账开销相对于单次操作不可忽略，应在每次迭代中批处理多个操作，并报告操作总数。
* 检查原始 `samples`，观察是否存在预热不足或优化层级变化的趋势、与垃圾回收一致的暂停，以及多峰分布。
* 使用形态不同、但执行相同预期工作的独立基准测试，验证出乎意料的结果。

`node:bench` 不会强制特定的优化状态，也不会推断引擎是否消除了工作。这些控制和诊断因运行时而异，并且基于启发式；它们不能替代对基准测试工作负载的验证。

### 动态采样和可变批次

在测量样本期间调用 `context.done()` 会在该样本之后完成基准测试。这样一来，更高层的工具可以将 `samples` 视为最大值，并实现动态采样策略。

每个样本的操作数可以不同。汇总统计数据会将每个样本的 `rate` 视为权重相同的观测值。具体而言，`summary.mean` 是各样本速率的算术平均值。它不是按以下方式计算的汇总吞吐量：

```text
1_000_000_000 * sum(sample.operations) / sum(sample.duration_ns)
```

当样本时长不同时，这两个值可能不同，因为汇总吞吐量会根据每个样本的时长对速率加权。更高层的工具在改变批次大小时，应选择与其分析相匹配的聚合方式。它可以根据原始 `samples` 计算汇总吞吐量；操作数应以 `bigint` 值求和，因为总数可能超过 `Number.MAX_SAFE_INTEGER`，即使每个计数都没有超过。

### 比较基准测试结果

`node:bench` 不会将某个基准测试指定为基线，也不会对不同运行进行通过／失败比较。它会公开原始样本、稳定的基准测试标识、参数和标签，以便将比较策略留给更高层的工具。工具可以使用 `benchId`，在兼容的源码布局之间匹配相同声明和参数；也可以使用标签或自身的元数据来标识基线。

比较工具应保留原始样本速率，并确认执行计划和相关环境详细信息具有可比性。适当的分析方法取决于实验设计和分布。例如，独立样本可以使用 Welch's t 检验或基于秩的检验，而刻意配对的观测值则需要配对分析。工具还应在测试多个基准时考虑效应量、不确定性和校正。`node:perf_hooks` 中通用的 {Histogram} 统计数据可支持此类分析，但运行器不会选择分析方法或显著性阈值。

## 可复用的运行器

模块级声明函数使用共享运行器，并会自动安排其运行。更高层的工具可以创建相互隔离、显式启动的运行器：

```mjs
import { createRunner } from 'node:bench';

const runner = createRunner({ yieldBetweenSamples: false });

runner.bench('example', { samples: 100 }, (b) => {
  const operations = chooseOperationCount();
  b.start();
  runOperations(operations);
  const sample = b.end(operations);

  if (hasEnoughData(sample)) b.done();
});

for await (const record of runner.run()) {
  // Consume structured benchmark records.
}
```

每个运行器都有独立的声明、钩子、筛选和输出。与模块级声明不同，在显式运行器上创建基准测试不会安排其执行。因此，程序包可以先收集声明，再稍后启动它们。调用显式运行器的 `run()` 函数后，就不能再添加声明；再次调用 `run()` 会报错。

## 命令行运行器

`--bench` 标志可运行一个或多个显式指定的基准测试文件或 glob 模式：

```console
node --experimental-bench --bench benchmark.mjs
node --experimental-bench --bench --bench-reporter=json 'benchmarks/**/*.js'
```

文件会排序并串行执行。默认的 `--bench-isolation=process` 模式会在单独的子进程中运行每个文件，并输出一份汇总摘要。结构化事件会传输给父进程，而不会转换为 JSON，从而保留 BigInt 时长、错误和参数值。子进程写入 stdout 和 stderr 的内容会作为诊断记录输出，以免污染报告器的输出。

`--bench-isolation=none` 会将所有文件导入运行器进程。此模式的启动开销较低，但模块、堆和进程状态会在文件间延续，而且用户写入的内容会与报告器共享 stdout 和 stderr。

工作线程隔离不是 CLI 模式。每个新建的 {Worker} 都有独立的 V8 isolate、JavaScript 堆和事件循环，通常比子进程的启动成本更低。复用工作线程会保留其模块和堆状态。工作线程还共享 libuv 的进程级线程池，并且可能共享进程级原生或 addon 状态，因此无法提供与进程隔离相同的边界。

更高层的工具可以通过在工作线程内加载基准测试代码、在那里进行测量、传输结构化样本数据，并将其传递给 [`context.record()`][] 来试用工作线程隔离。如果工作线程同时捕获两个时间戳，报告的 `duration_ns` 可以不包含消息传输时间。工具应明确标识工作线程模块和工作负载。它们不应将任意函数或闭包字符串化后在不同 isolate 之间传递，因为闭包无法在原有词法环境下重建。

传递给 `--bench` 的基准测试文件应声明基准测试，但不得调用 `run()`。CLI 支持 `--bench-name-pattern`、`--bench-samples`、`--bench-warmup`、`--bench-reporter` 和 `--bench-reporter-destination`。详情请参阅[命令行选项文档][]。

通过 `--require` 或 `--import` 传入的预加载模块不应声明基准测试。此类声明不会关联到入口文件，其 `entryFile` 值为 `null`。它们的 `fileRunId` 用于标识其所在的运行器或子进程执行。使用进程隔离时，每个基准测试子进程都会评估一次预加载模块，并运行其中的声明。

## 基准测试报告器

内置报告器可通过仅支持 scheme 的 `node:bench/reporters` 模块使用：

```mjs
import { json, spec } from 'node:bench/reporters';
```

```cjs
const { json, spec } = require('node:bench/reporters');
```

报告器值可以直接传递给 `stream.compose()`：

```mjs
import { bench, run } from 'node:bench';
import { spec } from 'node:bench/reporters';
import process from 'node:process';

bench('example', (b) => {
  b.start();
  doWork();
  b.end(1);
});

run().compose(spec).pipe(process.stdout);
```

`spec` 报告器会缓冲结果，并输出一张简洁的表格，其中包含样本数量、平均速率、平均值的 95% 置信区间、中位数速率和警告。变异系数超过 5% 时会报告为 `noisy`，绝对偏度超过 1 时会报告为 `skewed`。确切的人类可读格式可能会更改。

`json` 报告器会将每条生命周期记录输出为以换行符分隔的 JSON。包括 `duration_ns` 在内的 BigInt 值会编码为十进制字符串。错误会使用其 `name`、`message`、`stack`、`code`、`cause` 和 `errors` 属性表示。按照 JSON 的要求，非有限数值会编码为 `null`。

自定义报告器使用相同的组合约定。它们可以是变换流，也可以是 `stream.compose()` 接受的函数。组合后的可读流可以传递到任意可写目标：

```mjs
import { run } from 'node:bench';
import process from 'node:process';

async function* names(source) {
  for await (const { type, data } of source) {
    if (type === 'bench:complete') {
      yield `${data.name}\n`;
    }
  }
}

run().compose(names).pipe(process.stdout);
```

## `createRunner([options])`

<!-- YAML
added: v26.9.0
-->

* `options` {Object}
  * `yieldBetweenSamples` {boolean} 在样本回调之间安排一轮事件循环。禁用此选项也会阻止基于计时器的中止信号在同步回调之间触发。仍会根据单调时钟截止时间检查基准测试超时。**默认值：** `true`。
* 返回值：{Object} 一个隔离的基准测试运行器，其中绑定了 `after`、`afterEach`、`before`、`beforeEach`、`bench`、`describe`、`run` 和 `suite` 函数。

创建一个显式启动的基准测试运行器。通过一个运行器进行的声明不会与其他运行器或模块级函数进行的声明交互。调用返回的 `run()` 函数以启动运行器并获取其 {BenchmarksStream}。

每个运行器只能启动一次。其 `run()` 函数接受与模块级 [`run()`][] 相同的选项。`run({ yieldBetweenSamples })` 会覆盖传递给 `createRunner()` 的值。

## `bench([name][, options], fn)`

<!-- YAML
added: v26.9.0
-->

* `name` {string} 基准测试名称。**默认值：** `fn` 的 `name` 属性；如果 `fn` 没有名称，则为 `'<anonymous>'`。
* `options` {Object}
  * `diagnosticChannels` {Array} 字符串形式的诊断频道名称；名称会去重，并通过并集继承自包含该基准测试的套件。数组中的 Symbol 值会被静默忽略。**默认值：** `[]`。
  * `only` {boolean} 如果某个基准测试或包含它的套件设置了 `only`，则跳过其层级结构中未设置 `only` 的基准测试。**默认值：** `false`。
  * `params` {Object} 用于标识此基准测试配置的字符串、有限数值或布尔值元数据。构建稳定的基准测试标识时，参数键会排序。**默认值：** 空对象。
  * `samples` {number} 测量回调调用的最大次数。必须是正的 32 位无符号整数。调用 `context.done()` 可以提前结束基准测试。**默认值：** `30`。
  * `signal` {AbortSignal} 允许中止此基准测试。
  * `skip` {boolean|string} 如果为真值，则跳过此基准测试。字符串会作为跳过原因包含在结果中。**默认值：** `false`。
  * `tags` {string\[]} 与基准测试关联的标签。标签会小写化、去重，并通过并集继承自包含该基准测试的套件。**默认值：** `[]`。
  * `timeout` {number} 基准测试失败前等待的毫秒数。**默认值：** `Infinity`。
  * `warmup` {number} 测量样本之前不报告的回调调用次数。必须是 32 位无符号整数。**默认值：** `0`。
* `fn` {Function|AsyncFunction} 基准测试函数。该函数会接收一个 {BenchContext}。
* 返回值：{Promise} 顶层基准测试完成后，以基准测试结果履行；如果在套件中声明，则立即以 `undefined` 履行。

预热调用使用与测量样本相同的回调和计时约定，但其样本会被丢弃。异常、拒绝、超时、中止、缺少计时调用或重复计时调用都会停止当前基准测试。后续基准测试仍会继续运行。

超时或中止后，运行器会短暂等待异步基准测试工作完成，然后再继续。如果工作仍处于等待状态，所有后续已选定要运行的基准测试都会在不运行的情况下失败，以防其测量与该工作重叠。

对于每个预热回调和测量回调，运行器都会订阅配置的诊断频道。每次发布都会排队一个上下文诊断，其 `message` 为 `{ name, message }`，其中包含字符串形式的频道名称和已发布的消息。回调完成或中止后会移除订阅。

超时或中止无法中断同步 JavaScript，也不会强制取消忽略 `context.signal` 的异步工作。

`benchId` 基于声明所在的源文件、层级套件和基准测试名称，以及规范化后的参数。同一源位置的重复运行会得到稳定的标识，但嵌入的源值不会针对不同检出根目录、模块格式、操作系统或路径大小写进行规范化。

执行范围由单独的信息表示。`runId` 用于标识一次逻辑运行，而 `fileRunId` 用于标识该运行中的文件运行器或子进程执行。`entryFile` 字段记录哪个入口文件导入导致了此声明；由预加载模块进行的声明，其值为 `null`。
因此，使用共享声明辅助程序的入口文件可能会在多个 `fileRunId` 下出现相同的 `benchId`。如果在同一文件执行范围内多次声明相同的 `benchId`，则会报告错误，而不会合并样本。

### `bench.skip([name][, options], fn)`

<!-- YAML
added: v26.9.0
-->

`bench(name, { ...options, skip: true }, fn)` 的简写形式。

### `bench.only([name][, options], fn)`

<!-- YAML
added: v26.9.0
-->

`bench(name, { ...options, only: true }, fn)` 的简写形式。

## `suite([name][, options], fn)`

<!-- YAML
added: v26.9.0
-->

* `name` {string} 套件名称。**默认值：** `fn` 的 `name` 属性；如果 `fn` 没有名称，则为 `'<anonymous>'`。
* `options` {Object}
  * `diagnosticChannels` {Array} 字符串形式的诊断频道名称，会继承给嵌套套件和基准测试。数组中的 Symbol 值会被静默忽略。**默认值：** `[]`。
  * `only` {boolean} 选择此套件中的所有嵌套基准测试。**默认值：** `false`。
  * `skip` {boolean|string} 跳过此套件中的所有嵌套基准测试。**默认值：** `false`。
  * `tags` {string\[]} 继承给嵌套套件和基准测试的标签。**默认值：** `[]`。
* `fn` {Function|AsyncFunction} 用于声明嵌套套件、基准测试和钩子的函数。
* 返回值：{Promise} 顶层套件完成时履行；如果在其他套件中声明，则立即以 `undefined` 履行。

套件函数会在收集声明时运行。返回 Promise 的套件函数会在基准测试执行开始前等待完成。

## `describe([name][, options], fn)`

<!-- YAML
added: v26.9.0
-->

`suite()` 的别名。

## `before(fn)`

<!-- YAML
added: v26.9.0
-->

* `fn` {Function|AsyncFunction} 钩子函数。

注册一个钩子，使其在当前套件中的基准测试之前运行一次。

## `after(fn)`

<!-- YAML
added: v26.9.0
-->

* `fn` {Function|AsyncFunction} 钩子函数。

注册一个钩子，使其在当前套件中的基准测试之后运行一次。

## `beforeEach(fn)`

<!-- YAML
added: v26.9.0
-->

* `fn` {Function|AsyncFunction} 钩子函数。它会接收一个包含基准测试 `name`、`params` 和 `signal` 的对象。

注册一个钩子，使其在当前套件中的每个完整逻辑基准测试之前运行一次。它不会在每个样本之前运行。每个样本的设置工作应放在基准测试函数中，并位于 `context.start()` 或 `context.record()` 之前。

## `afterEach(fn)`

<!-- YAML
added: v26.9.0
-->

* `fn` {Function|AsyncFunction} 钩子函数。它会接收一个包含基准测试 `name`、`params` 和 `signal` 的对象。

注册一个钩子，使其在当前套件中的每个完整逻辑基准测试之后运行一次。它不会在每个样本之后运行。每个样本的清理工作应放在基准测试函数中，并位于 `context.end()` 或 `context.record()` 之后。

## `run([options])`

<!-- YAML
added: v26.9.0
-->

* `options` {Object}
  * `namePattern` {string|RegExp} 仅运行完整层级名称与该模式匹配的基准测试。字符串值会被解释为 JavaScript 正则表达式。
  * `samples` {number} 覆盖每个基准测试的测量回调调用最大次数。必须是正的 32 位无符号整数。
  * `signal` {AbortSignal} 允许中止正在进行的基准测试执行。
  * `warmup` {number} 覆盖每个基准测试的不报告预热回调调用次数。必须是 32 位无符号整数。
  * `yieldBetweenSamples` {boolean} 在样本回调之间安排一轮事件循环。**默认值：** `true`；对于显式运行器，则为传递给 `createRunner()` 的值。
* 返回值：{BenchmarksStream}

返回进程内基准测试运行的对象模式事件流。在声明基准测试的同一轮事件循环中调用 `run()`，且必须在自动执行开始前调用。如果不需要返回的流，则可以不调用 `run()`。通过 `createRunner()` 创建的显式运行器不会自动运行，因此可以稍后调用其 `run()` 函数。

```mjs
import { bench, run } from 'node:bench';

bench('example', { samples: 3 }, (b) => {
  b.start();
  doWork();
  b.end(1);
});

for await (const { type, data } of run()) {
  if (type === 'bench:complete' && data.error === undefined) {
    console.log(data.name, data.summary.mean);
  }
}
```

## `runFile(path[, options])`

<!-- YAML
added: v26.9.0
-->

* `path` {string|Buffer|URL} 单个基准测试模块的路径。
* `options` {Object}
  * `env` {Object} 子进程环境。属性值必须是字符串或 `undefined`。此选项会替换父进程环境，而不是扩展它。**默认值：** `process.env` 的快照。
  * `execArgv` {string\[]} 子进程的 Node.js 命令行选项。此选项会替换继承的选项，而不是扩展它。不允许使用基准测试运行器选项、位置参数以及选择其他执行模式的选项。**默认值：** 从当前进程继承的兼容选项。
  * `signal` {AbortSignal} 中止时终止子进程。
* 返回值：{BenchmarksStream}

在全新的子进程中运行恰好一个基准测试模块，并返回其对象模式事件流。调用 `runFile()` 时，相对 `path` 会根据当前工作目录解析。`path` 不会被解释为 glob。除非信号已中止或流在启动前已销毁，否则每次调用都会使用一个新子进程。输入发现、排序、并发、重试和多文件调度仍由调用方负责。

启用 Permission Model 时，调用方必须具有对 `path` 的文件系统读取权限，以及创建子进程的权限。

记录使用高级子进程序列化，保留 `bigint` 和错误等受支持的结构化值。子进程写入 stdout 和 stderr 的内容会成为 `'bench:diagnostic'` 记录。权限失败、模块加载错误、子进程异常退出或取消也会发出错误诊断，并生成终止的 `'bench:summary'`，其 `success` 属性为 `false`；这些执行失败不会导致流报错。如果模块评估在声明基准测试后失败，仍会运行这些声明，然后再生成失败摘要。

`env`、有效继承选项以及显式提供的 `execArgv` 会在调用 `runFile()` 时复制。运行器会移除 `NODE_OPTIONS`，替换与 IPC 相关的环境变量，并设置其私有的子进程上下文、运行标识和文件标识变量，覆盖 `env` 中具有这些名称的属性。通过 `execArgv` 传递子进程 Node.js 选项，而不是通过 `NODE_OPTIONS`。标准的 `child_process` 环境传播仍然适用，包括 `NODE_V8_COVERAGE`、权限模型选项以及必需的 z/OS 变量。在子进程启动前中止 `signal`，会生成 `AbortError` 诊断信息，而不会启动子进程。在执行期间中止会向子进程发送 `SIGTERM`；如果子进程未退出，则升级为 `SIGKILL`。销毁返回的流会遵循相同的终止流程。

## 类：`BenchContext`

每次调用基准测试时都会传入一个 `BenchContext` 实例。每次预热和测量样本都会创建一个新实例。

### `context.index`

<!-- YAML
added: v26.9.0
-->

* {number}

当前 `context.phase` 中的从零开始的调用索引。预热样本和测量样本分别使用独立的索引序列。

### `context.name`

<!-- YAML
added: v26.9.0
-->

* {string}

基准测试名称。

### `context.params`

<!-- YAML
added: v26.9.0
-->

* {Object}

基准测试的规范化参数元数据。

### `context.phase`

<!-- YAML
added: v26.9.0
-->

* {string}

当前样本阶段。对于未报告的预热调用，该值为 `'warmup'`；对于测量调用，该值为 `'measurement'`。

### `context.signal`

<!-- YAML
added: v26.9.0
-->

* {AbortSignal}

当基准测试中止、超时或完成时触发的中止信号。

### `context.start()`

<!-- YAML
added: v26.9.0
-->

使用 `process.hrtime.bigint()` 开始测量区域。多次调用 `start()` 会导致错误。

### `context.end(operations[, options])`

<!-- YAML
added: v26.9.0
-->

* `operations` {number} 已完成操作的数量。必须是正安全整数。
* `options` {Object}
  * `detail` {any} 其他可进行结构化克隆的样本数据。使用 CLI 进程隔离时，还必须受高级子进程序列化支持。
* 返回：{Object} 样本的 `operations`、`duration_ns`、计算得出的 `rate`，以及可选的克隆后 `detail`。

结束测量区域。会在验证 `operations` 之前捕获结束时间戳。在调用 `start()` 之前调用 `end()`、多次调用 `end()` 或记录零时长样本都会导致错误。如果提供了 `detail`，则会在捕获结束时间戳后对其进行克隆，因此克隆耗时不计入测量区域。

### `context.record(sample)`

<!-- YAML
added: v26.9.0
-->

* `sample` {Object}
  * `operations` {number} 已完成操作的数量。必须是正安全整数。
  * `duration_ns` {bigint} 外部测得的正时长，单位为纳秒，且不得大于 `Number.MAX_SAFE_INTEGER`。
  * `detail` {any} 其他可进行结构化克隆的样本数据。使用 CLI 进程隔离时，还必须受高级子进程序列化支持。
* 返回：{Object} 规范化后的样本，包括计算得出的 `rate` 和可选的克隆后 `detail`。

记录由其他时钟或执行环境测得的结果。当更高级别的工具在工作线程中测量工作，并需要将消息传输时间排除在时长之外时，这很有用。在同一次回调中，`record()` 不能与 `start()` 和 `end()` 同时使用，并且必须且只能调用一次。

### `context.diagnostic(message[, options])`

<!-- YAML
added: v26.9.0
-->

* `message` {any} 可进行结构化克隆的诊断值。使用 CLI 进程隔离时，还必须受高级子进程序列化支持。
* `options` {Object}
  * `level` {string} `'info'` 或 `'warning'`。**默认值：**`'info'`。
  * `detail` {any} 其他可进行结构化克隆的诊断数据。使用 CLI 进程隔离时，还必须受高级子进程序列化支持。
* 返回：{undefined}

将与当前基准测试、阶段和样本索引关联的诊断信息加入队列。多条诊断信息会保留调用顺序。在样本回调结束后、该样本的 `'bench:sample'` 事件发出前，会发出这些诊断信息。即使预热样本不会发出，预热诊断信息仍会发出。回调失败前加入队列的诊断信息会在失败的 `'bench:complete'` 事件之前发出，且不会导致基准测试失败。如果回调结束前发生超时或中止，加入队列的诊断信息可能不会发出。

`message` 和 `detail` 会同步克隆。选项也会同步验证。因此，在 `context.start()` 和 `context.end()` 之间调用 `diagnostic()`，会将这部分工作计入测量时长。参数无效，或 `message` 或 `detail` 无法克隆，都会违反样本约定。

### `context.done()`

<!-- YAML
added: v26.9.0
-->

请求在当前测量样本结束后成功完成基准测试。回调仍必须调用 `start()` 和 `end()`，或调用 `record()`。在预热调用期间调用 `done()` 会导致错误。如果未调用 `done()`，则配置的 `samples` 值仍是测量调用次数的上限。

## 类：`BenchmarksStream`

`BenchmarksStream` 是对象模式的 {stream.Readable}。每条生命周期记录既会作为具名事件发出，也会以 `{ type, data }` 的形式在流中提供。

事件按执行顺序发出：

* `'bench:plan'`
* `'bench:start'`
* `'bench:sample'`
* `'bench:complete'`
* `'bench:diagnostic'`
* `'bench:summary'`

具名事件负载、可读记录和基准测试完成值互为独立快照。通过其中一种传递机制收到的值被修改后，不会改变通过其他机制收到的值。与其他 {EventEmitter} 事件一样，同一具名事件的多个监听器会收到相同的事件负载。通过 {SharedArrayBuffer} 引用的内存仍然是共享的，这符合结构化克隆语义。

消费者开始读取后，运行器会遵循流的对象模式高水位标记；当消费者速度低于生产者时，运行器会在记录之间等待。这些等待发生在样本计时结束后，且不会丢弃记录。快照创建和传递等待不会计入基准测试超时。在开始读取之前，记录会累积在标准可读缓冲区中，并计入 `readableLength`。这样可避免未读取的流以及仅使用具名事件的消费者发生死锁，但缓冲区可能会无限增长。不需要可读记录的仅具名事件消费者应调用 `stream.resume()` 来丢弃这些记录。销毁流会停止可读传递，但不会取消基准测试执行，因此基准测试完成承诺仍会完成。自动调度的模块级运行会在内部排空其流。

使用进程隔离时，子进程发送的每条记录只有在父进程接收后才会收到确认。在收到确认之前，子进程不会发送其他记录，从而在报告器速度较慢时限制 IPC 中继的数据量。

每个基准测试范围内的事件都包含 `runId`、`fileRunId`、`entryFile`、`benchId`、`parentId` 和 `namePath`。`runId` 和 `fileRunId` 都是不透明标识，并会在不同运行之间变化。`entryFile` 标识因加载而触发声明的顶层基准测试文件，而 `file` 标识声明本身的源位置。`parentId` 基于所在套件的源文件和分层名称路径。

异步套件声明结束后，进程内运行器会按声明顺序为收集到的每个基准测试发出一个 `'bench:plan'` 事件。该运行器的所有计划都会在其套件钩子或基准测试回调运行前发出。使用进程隔离时，各文件在单独的子进程中运行，因此较晚文件的计划会在较早子进程完成后发出。不使用隔离时，所有文件共享一个运行器，其计划会在任何基准测试执行前发出。计划数据包含[基准测试结果][]中所述的基准测试范围内的标识、位置、标签和参数，以及以下内容：

* `diagnosticChannels` {string\[]} 每次回调期间订阅的继承字符串通道名称。
* `samples` {number} 应用运行级别覆盖后，有效的测量回调调用次数上限。
* `warmup` {number} 应用运行级别覆盖后，有效的未报告预热回调调用次数。
* `timeout` {number|null} 超时时间（以毫秒为单位）；未配置超时时为 `null`。
* `yieldBetweenSamples` {boolean} 是否会在样本回调之间安排一次事件循环轮次。
* `selected` {boolean} 应用 `skip`、`only` 和 `namePattern` 选择条件后，该基准测试是否符合运行条件。重复声明、套件构建、钩子、中止或其他运行时故障仍可能阻止执行。
* `skip` {boolean|string} 当 `selected` 为 `false` 时，表示显式跳过值或选择原因，例如 `'only'` 或 `'name pattern'`。

计划包含运行器已知的执行设置。运行时版本、操作系统、处理器和其他环境元数据有意留给报告器和更高级别的工具收集。

`'bench:complete'` 数据包含一个[基准测试结果][]。失败的结果会额外包含 `error` 属性，并可能包含错误发生前记录的样本。跳过的结果会额外包含 `skip` 属性，且 `samples` 数组为空。`'bench:diagnostic'` 会报告加载、套件和钩子错误，以及公共上下文诊断信息。上下文诊断包含基准测试范围内的标识字段、`phase`、`index`、`message`、`level`、源位置和可选的 `detail`。`'bench:summary'` 包含整体的 `runId`、`fileRunId`、`entryFile`、`success`、`counts`、`duration_ns` 和 `file` 属性。`fileRunId`、`entryFile` 和 `file` 的类型均为 {string|null}；汇总多个文件时，它们的值为 `null`。

## 样本结果

每个测量样本都具有以下属性：

* `operations` {number} 传递给 `context.end()` 或 `context.record()` 的正操作数。
* `duration_ns` {bigint} 以纳秒为单位的测量时长。
* `rate` {number} 每秒操作数。
* `detail` {any} 可选的克隆后样本详细信息。

## 基准测试结果

已完成的基准测试结果包含：

* `runId` {string} 不透明的逻辑运行标识。
* `fileRunId` {string} 不透明的文件运行器或子进程执行标识。
* `entryFile` {string|null} 导致此声明的顶层文件。
* `benchId` {string} 在相同源布局中的稳定声明标识。
* `parentId` {string|null} 稳定的所在套件标识。
* `name` {string} 基准测试名称。
* `namePath` {string\[]} 套件和基准测试名称的分层路径。
* `file` {string} 声明所在的源文件。
* `line` {number} 源代码行号。
* `column` {number} 源代码列号。
* `tags` {string\[]} 继承的规范标签。
* `params` {Object} 规范参数元数据。
* `samples` {Object\[]} 测量调用顺序与之完全一致的测量样本。
* `summary` {Object}
  * `mean` {number} 各样本速率的等权算术平均值，而非基于所有操作数和时长合并计算的吞吐量。
  * `median` {number} 各样本速率的中位数。
  * `min` {number} 各样本速率的最小值。
  * `max` {number} 各样本速率的最大值。
  * `stddev` {number} 各样本速率的总体标准差。
  * `coefficientOfVariation` {number} `stddev / mean`。
  * `confidenceInterval` {Object} 平均速率的 95% Student's t 置信区间，包含 `lower` 和 `upper` 属性。
  * `medianConfidenceInterval` {Object} 中位数速率的 95% 非参数置信区间，包含 `lower` 和 `upper` 属性。
  * `skewness` {number} 缩放后速率直方图的偏度。

[`context.record()`]: #contextrecordsample
[`run()`]: #runoptions
[benchmark result]: #benchmark-result
[command-line options documentation]: cli.md#--bench
