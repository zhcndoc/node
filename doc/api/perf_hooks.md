# 性能测量 API

<!--introduced_in=v8.5.0-->

> 稳定性：2 - 稳定

<!-- source_link=lib/perf_hooks.js -->

此模块提供了 W3C [Web Performance APIs][] 子集的实现，以及用于 Node.js 特定性能测量的其他 API。

Node.js 支持以下 [Web Performance APIs][]：

* [高精度时间][]
* [性能时间线][]
* [用户计时][]
* [资源计时][]

```mjs
import { performance, PerformanceObserver } from 'node:perf_hooks';

const obs = new PerformanceObserver((items) => {
  console.log(items.getEntries()[0].duration);
  performance.clearMarks();
});
obs.observe({ type: 'measure' });
performance.measure('从开始到现在');

performance.mark('A');
doSomeLongRunningProcess(() => {
  performance.measure('A 到现在', 'A');

  performance.mark('B');
  performance.measure('A 到 B', 'A', 'B');
});
```

```cjs
const { PerformanceObserver, performance } = require('node:perf_hooks');

const obs = new PerformanceObserver((items) => {
  console.log(items.getEntries()[0].duration);
});
obs.observe({ type: 'measure' });
performance.measure('从开始到现在');

performance.mark('A');
(async function doSomeLongRunningProcess() {
  await new Promise((r) => setTimeout(r, 5000));
  performance.measure('A 到现在', 'A');

  performance.mark('B');
  performance.measure('A 到 B', 'A', 'B');
})();
```

## `perf_hooks.performance`

<!-- YAML
added: v8.5.0
-->

一个对象，可用于从当前 Node.js 实例收集性能指标。它类似于浏览器中的 [`window.performance`][]。

### `performance.clearMarks([name])`

<!-- YAML
added: v8.5.0
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44483
    description: "此方法必须以 `performance` 对象作为接收者调用。"
-->

* `name` {string}

如果未提供 `name`，则从性能时间线中移除所有 `PerformanceMark` 对象。如果提供了 `name`，则仅移除命名的标记。

### `performance.clearMeasures([name])`

<!-- YAML
added: v16.7.0
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44483
    description: "此方法必须以 `performance` 对象作为接收者调用。"
-->

* `name` {string}

如果未提供 `name`，则从性能时间线中移除所有 `PerformanceMeasure` 对象。如果提供了 `name`，则仅移除命名的测量。

### `performance.clearResourceTimings([name])`

<!-- YAML
added:
  - v18.2.0
  - v16.17.0
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44483
    description: "此方法必须以 `performance` 对象作为接收者调用。"
-->

* `name` {string}

如果未提供 `name`，则从资源时间线中移除所有 `PerformanceResourceTiming` 对象。如果提供了 `name`，则仅移除命名的资源。

### `performance.eventLoopUtilization([utilization1[, utilization2]])`

<!-- YAML
added:
 - v14.10.0
 - v12.19.0
changes:
  - version:
      - v25.2.0
      - v24.12.0
    pr-url: https://github.com/nodejs/node/pull/60370
    description: "添加了 `perf_hooks.eventLoopUtilization` 别名。"
-->

* `utilization1` {Object} 之前调用 `eventLoopUtilization()` 的结果。
* `utilization2` {Object} 在 `utilization1` 之前调用 `eventLoopUtilization()` 的结果。
* 返回：{Object}
  * `idle` {number}
  * `active` {number}
  * `utilization` {number}

这是 [`perf_hooks.eventLoopUtilization()`][] 的别名。

_此属性是 Node.js 的扩展。它在 Web 浏览器中不可用。_

### `performance.getEntries()`

<!-- YAML
added: v16.7.0
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44483
    description: "此方法必须以 `performance` 对象作为接收者调用。"
-->

* 返回：{PerformanceEntry\[]}

返回按 `performanceEntry.startTime` 时间顺序排列的 `PerformanceEntry` 对象列表。如果你只关心特定类型或具有特定名称的性能条目，请参阅 `performance.getEntriesByType()` 和 `performance.getEntriesByName()`。

### `performance.getEntriesByName(name[, type])`

<!-- YAML
added: v16.7.0
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44483
    description: "此方法必须以 `performance` 对象作为接收者调用。"
-->

* `name` {string}
* `type` {string}
* 返回：{PerformanceEntry\[]}

返回按 `performanceEntry.startTime` 时间顺序排列的 `PerformanceEntry` 对象列表，其 `performanceEntry.name` 等于 `name`，并且可选地，其 `performanceEntry.entryType` 等于 `type`。

### `performance.getEntriesByType(type)`

<!-- YAML
added: v16.7.0
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44483
    description: "此方法必须以 `performance` 对象作为接收者调用。"
-->

* `type` {string}
* 返回：{PerformanceEntry\[]}

返回按 `performanceEntry.startTime` 时间顺序排列的 `PerformanceEntry` 对象列表，其 `performanceEntry.entryType` 等于 `type`。

### `performance.mark(name[, options])`

<!-- YAML
added: v8.5.0
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44483
    description: "此方法必须以 `performance` 对象作为接收者调用。name 参数不再可选。"
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/37136
    description: 更新以符合 User Timing Level 3 规范。
-->

* `name` {string}
* `options` {Object}
  * `detail` {any} 包含在标记中的附加可选详情。
  * `startTime` {number} 用作标记时间的可选时间戳。
    **默认值**：`performance.now()`。

在性能时间线中创建一个新的 `PerformanceMark` 条目。`PerformanceMark` 是 `PerformanceEntry` 的子类，其 `performanceEntry.entryType` 始终为 `'mark'`，且 `performanceEntry.duration` 始终为 `0`。性能标记用于标记性能时间线中的特定重要时刻。

创建的 `PerformanceMark` 条目被放入全局性能时间线中，可以通过 `performance.getEntries`、`performance.getEntriesByName` 和 `performance.getEntriesByType` 查询。当执行观察时，应使用 `performance.clearMarks` 手动从全局性能时间线中清除条目。

### `performance.markResourceTiming(timingInfo, requestedUrl, initiatorType, global, cacheMode, bodyInfo, responseStatus[, deliveryType])`

<!-- YAML
added:
  - v18.2.0
  - v16.17.0
changes:
  - version: v22.2.0
    pr-url: https://github.com/nodejs/node/pull/51589
    description: 添加了 bodyInfo、responseStatus 和 deliveryType 参数。
-->

* `timingInfo` {Object} [获取时序信息][]
* `requestedUrl` {string} 资源 URL
* `initiatorType` {string} 发起者名称，例如：'fetch'
* `global` {Object}
* `cacheMode` {string} 缓存模式必须是空字符串 ('') 或 'local'
* `bodyInfo` {Object} [获取响应正文信息][]
* `responseStatus` {number} 响应的状态码
* `deliveryType` {string} 交付类型。**默认值：** `''`。

_此属性是 Node.js 的扩展。它在 Web 浏览器中不可用。_

在资源时间线中创建一个新的 `PerformanceResourceTiming` 条目。`PerformanceResourceTiming` 是 `PerformanceEntry` 的子类，其 `performanceEntry.entryType` 始终为 `'resource'`。性能资源用于标记资源时间线中的时刻。

创建的 `PerformanceMark` 条目被放入全局资源时间线中，可以通过 `performance.getEntries`、`performance.getEntriesByName` 和 `performance.getEntriesByType` 查询。当执行观察时，应使用 `performance.clearResourceTimings` 手动从全局性能时间线中清除条目。

### `performance.measure(name[, startMarkOrOptions[, endMark]])`

<!-- YAML
added: v8.5.0
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44483
    description: "此方法必须以 `performance` 对象作为接收者调用。"
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/37136
    description: 更新以符合 User Timing Level 3 规范。
  - version:
      - v13.13.0
      - v12.16.3
    pr-url: https://github.com/nodejs/node/pull/32651
    description: "使 `startMark` 和 `endMark` 参数可选。"
-->

* `name` {string}
* `startMarkOrOptions` {string|Object} 可选。
  * `detail` {any} 包含在测量中的附加可选详情。
  * `duration` {number} 开始和结束时间之间的持续时间。
  * `end` {number|string} 用作结束时间的时间戳，或标识先前记录的标记的字符串。
  * `start` {number|string} 用作开始时间的时间戳，或标识先前记录的标记的字符串。
* `endMark` {string} 可选。如果 `startMarkOrOptions` 是 {Object}，则必须省略。

在性能时间线中创建一个新的 `PerformanceMeasure` 条目。`PerformanceMeasure` 是 `PerformanceEntry` 的子类，其 `performanceEntry.entryType` 始终为 `'measure'`，且 `performanceEntry.duration` 测量自 `startMark` 和 `endMark` 以来经过的毫秒数。

`startMark` 参数可以标识性能时间线中的任何 _现有_ `PerformanceMark`，或者 _可以_ 标识 `PerformanceNodeTiming` 类提供的任何时间戳属性。如果命名的 `startMark` 不存在，则会抛出错误。

可选的 `endMark` 参数必须标识性能时间线中的任何 _现有_ `PerformanceMark` 或 `PerformanceNodeTiming` 类提供的任何时间戳属性。如果没有传递参数，`endMark` 将为 `performance.now()`，否则如果命名的 `endMark` 不存在，将抛出错误。

创建的 `PerformanceMeasure` 条目被放入全局性能时间线中，可以通过 `performance.getEntries`、`performance.getEntriesByName` 和 `performance.getEntriesByType` 查询。当执行观察时，应使用 `performance.clearMeasures` 手动从全局性能时间线中清除条目。

### `performance.nodeTiming`

<!-- YAML
added: v8.5.0
-->

* 类型：{PerformanceNodeTiming}

_此属性是 Node.js 的扩展。它在 Web 浏览器中不可用。_

`PerformanceNodeTiming` 类的一个实例，为特定的 Node.js 操作里程碑提供性能指标。

### `performance.now()`

<!-- YAML
added: v8.5.0
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44483
    description: "此方法必须以 `performance` 对象作为接收者调用。"
-->

* 返回：{number}

返回当前高分辨率毫秒时间戳，其中 0 代表当前 `node` 进程的开始。

### `performance.setResourceTimingBufferSize(maxSize)`

<!-- YAML
added: v18.8.0
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44483
    description: "此方法必须以 `performance` 对象作为接收者调用。"
-->

将全局性能资源时间线缓冲区大小设置为指定数量的 "resource" 类型性能条目对象。

默认情况下，最大缓冲区大小设置为 250。

### `performance.timeOrigin`

<!-- YAML
added: v8.5.0
-->

* 类型：{number}

[`timeOrigin`][] 指定当前 `node` 进程开始的高分辨率毫秒时间戳，以 Unix 时间测量。

### `performance.timerify(fn[, options])`

<!-- YAML
added: v8.5.0
changes:
  - version:
      - v25.2.0
      - v24.12.0
    pr-url: https://github.com/nodejs/node/pull/60370
    description: "添加了 `perf_hooks.timerify` 别名。"
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/37475
    description: 添加了 histogram 选项。
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/37136
    description: "重新实现以使用纯 JavaScript 以及计时异步函数的能力。"
-->

* `fn` {Function}
* `options` {Object}
  * `histogram` {RecordableHistogram} 使用 `perf_hooks.createHistogram()` 创建的直方图对象，将记录纳秒级的运行时持续时间。

这是 [`perf_hooks.timerify()`][] 的别名。

_此属性是 Node.js 的扩展。它在 Web 浏览器中不可用。_

### `performance.toJSON()`

<!-- YAML
added: v16.1.0
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44483
    description: "此方法必须以 `performance` 对象作为接收者调用。"
-->

一个对象，是 `performance` 对象的 JSON 表示。它类似于浏览器中的 [`window.performance.toJSON`][]。

#### 事件：`'resourcetimingbufferfull'`

<!-- YAML
added: v18.8.0
-->

当全局性能资源时间线缓冲区已满时，会触发 `'resourcetimingbufferfull'` 事件。在事件监听器中使用 `performance.setResourceTimingBufferSize()` 调整资源时间线缓冲区大小，或使用 `performance.clearResourceTimings()` 清除缓冲区，以允许更多条目添加到性能时间线缓冲区中。

## 类：`PerformanceEntry`

<!-- YAML
added: v8.5.0
-->

此类的构造函数不直接向用户暴露。

### `performanceEntry.duration`

<!-- YAML
added: v8.5.0
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44483
    description: "此属性的 getter 必须以 `PerformanceEntry` 对象作为接收者调用。"
-->

* 类型：{number}

该条目经过的总毫秒数。此值并不适用于所有性能条目类型。

### `performanceEntry.entryType`

<!-- YAML
added: v8.5.0
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44483
    description: "此属性的 getter 必须以 `PerformanceEntry` 对象作为接收者调用。"
-->

* 类型：{string}

性能条目的类型。它可能是以下之一：

* `'dns'`（仅 Node.js）
* `'function'`（仅 Node.js）
* `'gc'`（仅 Node.js）
* `'http2'`（仅 Node.js）
* `'http'`（仅 Node.js）
* `'mark'`（Web 上可用）
* `'measure'`（Web 上可用）
* `'net'`（仅 Node.js）
* `'node'`（仅 Node.js）
* `'resource'`（Web 上可用）

### `performanceEntry.name`

<!-- YAML
added: v8.5.0
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44483
    description: "此属性的 getter 必须以 `PerformanceEntry` 对象作为接收者调用。"
-->

* 类型：{string}

性能条目的名称。

### `performanceEntry.startTime`

<!-- YAML
added: v8.5.0
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44483
    description: "此属性的 getter 必须以 `PerformanceEntry` 对象作为接收者调用。"
-->

* 类型：{number}

标记性能条目开始时间的高分辨率毫秒时间戳。

## 类：`PerformanceMark`

<!-- YAML
added:
  - v18.2.0
  - v16.17.0
-->

* 继承：{PerformanceEntry}

暴露通过 `Performance.mark()` 方法创建的标记。

### `performanceMark.detail`

<!-- YAML
added: v16.0.0
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44483
    description: "此属性 getter 必须使用`PerformanceMark` 对象作为接收者来调用。"
-->

* 类型：{any}

使用 `Performance.mark()` 方法创建时指定的附加详情。

## 类：`PerformanceMeasure`

<!-- YAML
added:
  - v18.2.0
  - v16.17.0
-->

* 继承：{PerformanceEntry}

暴露通过 `Performance.measure()` 方法创建的测量。

此类的构造函数不直接暴露给用户。

### `performanceMeasure.detail`

<!-- YAML
added: v16.0.0
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44483
    description: "此属性 getter 必须使用`PerformanceMeasure` 对象作为接收者来调用。"
-->

* 类型：{any}

使用 `Performance.measure()` 方法创建时指定的附加详情。

## 类：`PerformanceNodeEntry`

<!-- YAML
added: v19.0.0
-->

* 继承：{PerformanceEntry}

_此类是 Node.js 的扩展。它在 Web 浏览器中不可用。_

提供详细的 Node.js 计时数据。

此类的构造函数不直接暴露给用户。

### `performanceNodeEntry.detail`

<!-- YAML
added: v16.0.0
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44483
    description: "此属性 getter 必须使用`PerformanceNodeEntry` 对象作为接收者来调用。"
-->

* 类型：{any}

特定于 `entryType` 的附加详情。

### `performanceNodeEntry.flags`

<!-- YAML
added:
 - v13.9.0
 - v12.17.0
changes:
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/37136
    description: 运行时已弃用。现在当 entryType 为 'gc' 时已移至 detail 属性。
-->

> 稳定性：0 - 已弃用：请改用 `performanceNodeEntry.detail`。

* 类型：{number}

当 `performanceEntry.entryType` 等于 `'gc'` 时，`performance.flags` 属性包含有关垃圾回收操作的附加信息。该值可能是以下之一：

* `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_NO`
* `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_CONSTRUCT_RETAINED`
* `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_FORCED`
* `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_SYNCHRONOUS_PHANTOM_PROCESSING`
* `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_ALL_AVAILABLE_GARBAGE`
* `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_ALL_EXTERNAL_MEMORY`
* `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_SCHEDULE_IDLE`

### `performanceNodeEntry.kind`

<!-- YAML
added: v8.5.0
changes:
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/37136
    description: 运行时已弃用。现在当 entryType 为 'gc' 时已移至 detail 属性。
-->

> 稳定性：0 - 已弃用：请改用 `performanceNodeEntry.detail`。

* 类型：{number}

当 `performanceEntry.entryType` 等于 `'gc'` 时，`performance.kind` 属性标识发生的垃圾回收操作类型。该值可能是以下之一：

* `perf_hooks.constants.NODE_PERFORMANCE_GC_MAJOR`
* `perf_hooks.constants.NODE_PERFORMANCE_GC_MINOR`
* `perf_hooks.constants.NODE_PERFORMANCE_GC_MINOR_MARK_SWEEP`
* `perf_hooks.constants.NODE_PERFORMANCE_GC_INCREMENTAL`
* `perf_hooks.constants.NODE_PERFORMANCE_GC_WEAKCB`

### 垃圾回收（'gc'）详情

当 `performanceEntry.type` 等于 `'gc'` 时，`performanceNodeEntry.detail` 属性将是一个包含两个属性的 {Object}：

* `kind` {number} 以下之一：
  * `perf_hooks.constants.NODE_PERFORMANCE_GC_MAJOR`
  * `perf_hooks.constants.NODE_PERFORMANCE_GC_MINOR`
  * `perf_hooks.constants.NODE_PERFORMANCE_GC_MINOR_MARK_SWEEP`
  * `perf_hooks.constants.NODE_PERFORMANCE_GC_INCREMENTAL`
  * `perf_hooks.constants.NODE_PERFORMANCE_GC_WEAKCB`
* `flags` {number} 以下之一：
  * `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_NO`
  * `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_CONSTRUCT_RETAINED`
  * `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_FORCED`
  * `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_SYNCHRONOUS_PHANTOM_PROCESSING`
  * `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_ALL_AVAILABLE_GARBAGE`
  * `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_ALL_EXTERNAL_MEMORY`
  * `perf_hooks.constants.NODE_PERFORMANCE_GC_FLAGS_SCHEDULE_IDLE`

### HTTP（'http'）详情

当 `performanceEntry.type` 等于 `'http'` 时，`performanceNodeEntry.detail` 属性将是一个包含附加信息的 {Object}。

如果 `performanceEntry.name` 等于 `HttpClient`，`detail` 将包含以下属性：`req`、`res`。`req` 属性将是一个包含 `method`、`url`、`headers` 的 {Object}，`res` 属性将是一个包含 `statusCode`、`statusMessage`、`headers` 的 {Object}。

如果 `performanceEntry.name` 等于 `HttpRequest`，`detail` 将包含以下属性：`req`、`res`。`req` 属性将是一个包含 `method`、`url`、`headers` 的 {Object}，`res` 属性将是一个包含 `statusCode`、`statusMessage`、`headers` 的 {Object}。

这可能会增加额外的内存开销，应仅用于诊断目的，默认情况下不应在生产环境中保持开启。

### HTTP/2（'http2'）详情

当 `performanceEntry.type` 等于 `'http2'` 时，`performanceNodeEntry.detail` 属性将是一个包含附加性能信息的 {Object}。

如果 `performanceEntry.name` 等于 `Http2Stream`，`detail` 将包含以下属性：

* `bytesRead` {number} 为此 `Http2Stream` 接收的 `DATA` 帧字节数。
* `bytesWritten` {number} 为此 `Http2Stream` 发送的 `DATA` 帧字节数。
* `id` {number} 关联 `Http2Stream` 的标识符。
* `timeToFirstByte` {number} `PerformanceEntry` `startTime` 与接收第一个 `DATA` 帧之间经过的毫秒数。
* `timeToFirstByteSent` {number} `PerformanceEntry` `startTime` 与发送第一个 `DATA` 帧之间经过的毫秒数。
* `timeToFirstHeader` {number} `PerformanceEntry` `startTime` 与接收第一个头之间经过的毫秒数。

如果 `performanceEntry.name` 等于 `Http2Session`，`detail` 将包含以下属性：

* `bytesRead` {number} 为此 `Http2Session` 接收的字节数。
* `bytesWritten` {number} 为此 `Http2Session` 发送的字节数。
* `framesReceived` {number} `Http2Session` 接收的 HTTP/2 帧数。
* `framesSent` {number} `Http2Session` 发送的 HTTP/2 帧数。
* `maxConcurrentStreams` {number} `Http2Session` 生命周期内同时打开的最大流数。
* `pingRTT` {number} 自发送 `PING` 帧到接收其确认之间经过的毫秒数。仅在 `Http2Session` 上发送了 `PING` 帧时存在。
* `streamAverageDuration` {number} 所有 `Http2Stream` 实例的平均持续时间（毫秒）。
* `streamCount` {number} `Http2Session` 处理的 `Http2Stream` 实例数。
* `type` {string} `'server'` 或 `'client'`，用于标识 `Http2Session` 的类型。

### Timerify（'function'）详情

当 `performanceEntry.type` 等于 `'function'` 时，`performanceNodeEntry.detail` 属性将是一个 {Array}，列出计时函数的输入参数。

### Net（'net'）详情

当 `performanceEntry.type` 等于 `'net'` 时，`performanceNodeEntry.detail` 属性将是一个包含附加信息的 {Object}。

如果 `performanceEntry.name` 等于 `connect`，`detail` 将包含以下属性：`host`、`port`。

### DNS（'dns'）详情

当 `performanceEntry.type` 等于 `'dns'` 时，`performanceNodeEntry.detail` 属性将是一个包含附加信息的 {Object}。

如果 `performanceEntry.name` 等于 `lookup`，`detail` 将包含以下属性：`hostname`、`family`、`hints`、`verbatim`、`addresses`。

如果 `performanceEntry.name` 等于 `lookupService`，`detail` 将包含以下属性：`host`、`port`、`hostname`、`service`。

如果 `performanceEntry.name` 等于 `queryxxx` 或 `getHostByAddr`，`detail` 将包含以下属性：`host`、`ttl`、`result`。`result` 的值与 `queryxxx` 或 `getHostByAddr` 的结果相同。

## 类：`PerformanceNodeTiming`

<!-- YAML
added: v8.5.0
-->

* 继承：{PerformanceEntry}

_此属性是 Node.js 的扩展。它在 Web 浏览器中不可用。_

提供 Node.js 本身的计时详情。此类的构造函数不向用户暴露。

### `performanceNodeTiming.bootstrapComplete`

<!-- YAML
added: v8.5.0
-->

* 类型：{number}

Node.js 进程完成引导的高分辨率毫秒时间戳。如果引导尚未完成，则该属性的值为 -1。

### `performanceNodeTiming.environment`

<!-- YAML
added: v8.5.0
-->

* 类型：{number}

Node.js 环境初始化的高分辨率毫秒时间戳。

### `performanceNodeTiming.idleTime`

<!-- YAML
added:
  - v14.10.0
  - v12.19.0
-->

* 类型：{number}

事件循环在其事件提供者（例如 `epoll_wait`）内处于空闲状态的时间量的高分辨率毫秒时间戳。这不考虑 CPU 使用情况。如果事件循环尚未启动（例如，在主脚本的第一个刻度中），则该属性的值为 0。

### `performanceNodeTiming.loopExit`

<!-- YAML
added: v8.5.0
-->

* 类型：{number}

Node.js 事件循环退出时的高分辨率毫秒时间戳。如果事件循环尚未退出，则该属性的值为 -1。它只能在 [`'exit'`][] 事件的处理程序中具有非 -1 的值。

### `performanceNodeTiming.loopStart`

<!-- YAML
added: v8.5.0
-->

* 类型：{number}

Node.js 事件循环启动时的高分辨率毫秒时间戳。如果事件循环尚未启动（例如，在主脚本的第一个刻度中），则该属性的值为 -1。

### `performanceNodeTiming.nodeStart`

<!-- YAML
added: v8.5.0
-->

* 类型：{number}

Node.js 进程初始化时的高分辨率毫秒时间戳。

### `performanceNodeTiming.uvMetricsInfo`

<!-- YAML
added:
  - v22.8.0
  - v20.18.0
-->

* 类型：{Object}
  * `loopCount` {number} 事件循环迭代次数。
  * `events` {number} 事件处理程序已处理的事件数。
  * `eventsWaiting` {number} 调用事件提供者时等待处理的事件数。

这是 `uv_metrics_info` 函数的包装器。
它返回当前的一组事件循环指标。

这些值在 `Number.MAX_SAFE_INTEGER` 范围内是精确的。使用
[`performanceNodeTiming.uvMetricsInfoBigInt`][] 可获取 libuv 报告的完整 64 位
值。

建议在使用 `setImmediate` 调度执行的函数中使用此属性，以避免在完成当前循环迭代中调度的所有操作之前收集指标。

```cjs
const { performance } = require('node:perf_hooks');

setImmediate(() => {
  console.log(performance.nodeTiming.uvMetricsInfo);
});
```

```mjs
import { performance } from 'node:perf_hooks';

setImmediate(() => {
  console.log(performance.nodeTiming.uvMetricsInfo);
});
```

### `performanceNodeTiming.uvMetricsInfoBigInt`

<!-- YAML
added: REPLACEME
-->

* 类型：{Object}
  * `loopCount` {bigint} 事件循环迭代次数。
  * `events` {bigint} 事件处理程序已处理的事件数。
  * `eventsWaiting` {bigint} 调用事件提供者时等待处理的事件数。

与 [`performanceNodeTiming.uvMetricsInfo`][] 相同，但这些值为 {bigint}，可携带 libuv 报告的完整 64 位范围。

由于 `JSON.stringify()` 无法序列化 {bigint} 值，此属性不可枚举，也不会包含在 `performanceNodeTiming.toJSON()` 的输出中。通过展开其可枚举属性创建的 `performance.nodeTiming` 副本，例如，仍可序列化。

```cjs
const { performance } = require('node:perf_hooks');

setImmediate(() => {
  console.log(performance.nodeTiming.uvMetricsInfoBigInt);
});
```

```mjs
import { performance } from 'node:perf_hooks';

setImmediate(() => {
  console.log(performance.nodeTiming.uvMetricsInfoBigInt);
});
```

### `performanceNodeTiming.v8Start`

<!-- YAML
added: v8.5.0
-->

* 类型：{number}

V8 平台初始化时的高分辨率毫秒时间戳。

## 类：`PerformanceResourceTiming`

<!-- YAML
added:
  - v18.2.0
  - v16.17.0
-->

* 继承：{PerformanceEntry}

提供有关应用程序资源加载的详细网络计时数据。

此类的构造函数不直接暴露给用户。

### `performanceResourceTiming.workerStart`

<!-- YAML
added:
  - v18.2.0
  - v16.17.0
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44483
    description: "此属性获取器必须以 `PerformanceResourceTiming` 对象作为接收者调用。"
-->

* 类型：{number}

调度 `fetch` 请求之前立即的高分辨率毫秒时间戳。如果资源未被工作器拦截，则该属性将始终返回 0。

### `performanceResourceTiming.redirectStart`

<!-- YAML
added:
  - v18.2.0
  - v16.17.0
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44483
    description: "此属性获取器必须以 `PerformanceResourceTiming` 对象作为接收者调用。"
-->

* 类型：{number}

表示发起重定向的 fetch 开始时间的高分辨率毫秒时间戳。

### `performanceResourceTiming.redirectEnd`

<!-- YAML
added:
  - v18.2.0
  - v16.17.0
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44483
    description: "此属性获取器必须以 `PerformanceResourceTiming` 对象作为接收者调用。"
-->

* 类型：{number}

接收到最后一个重定向响应的最后一个字节后立即创建的高分辨率毫秒时间戳。

### `performanceResourceTiming.fetchStart`

<!-- YAML
added:
  - v18.2.0
  - v16.17.0
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44483
    description: "此属性获取器必须以 `PerformanceResourceTiming` 对象作为接收者调用。"
-->

* 类型：{number}

Node.js 开始获取资源之前立即的高分辨率毫秒时间戳。

### `performanceResourceTiming.domainLookupStart`

<!-- YAML
added:
  - v18.2.0
  - v16.17.0
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44483
    description: "此属性获取器必须以 `PerformanceResourceTiming` 对象作为接收者调用。"
-->

* 类型：{number}

Node.js 开始资源的域名查找之前立即的高分辨率毫秒时间戳。

### `performanceResourceTiming.domainLookupEnd`

<!-- YAML
added:
  - v18.2.0
  - v16.17.0
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44483
    description: "此属性获取器必须以 `PerformanceResourceTiming` 对象作为接收者调用。"
-->

* 类型：{number}

表示 Node.js 完成资源的域名查找之后立即的时间的高分辨率毫秒时间戳。

### `performanceResourceTiming.connectStart`

<!-- YAML
added:
  - v18.2.0
  - v16.17.0
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44483
    description: "此属性获取器必须以 `PerformanceResourceTiming` 对象作为接收者调用。"
-->

* 类型：{number}

表示 Node.js 开始建立与服务器的连接以检索资源之前立即的时间的高分辨率毫秒时间戳。

### `performanceResourceTiming.connectEnd`

<!-- YAML
added:
  - v18.2.0
  - v16.17.0
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44483
    description: "此属性获取器必须以 `PerformanceResourceTiming` 对象作为接收者调用。"
-->

* 类型：{number}

表示 Node.js 完成建立与服务器的连接以检索资源之后立即的时间的高分辨率毫秒时间戳。

### `performanceResourceTiming.secureConnectionStart`

<!-- YAML
added:
  - v18.2.0
  - v16.17.0
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44483
    description: "此属性获取器必须以 `PerformanceResourceTiming` 对象作为接收者调用。"
-->

* 类型：{number}

表示 Node.js 开始握手过程以保护当前连接之前立即的时间的高分辨率毫秒时间戳。

### `performanceResourceTiming.requestStart`

<!-- YAML
added:
  - v18.2.0
  - v16.17.0
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44483
    description: "此属性获取器必须以 `PerformanceResourceTiming` 对象作为接收者调用。"
-->

* 类型：{number}

表示 Node.js 接收到来自服务器的响应的第一个字节之前立即的时间的高分辨率毫秒时间戳。

### `performanceResourceTiming.finalResponseHeadersStart`

<!-- YAML
added: v26.9.0
-->

* 类型：{number}

表示 Node.js 接收到最终响应的第一个字节之后立即时间的高分辨率毫秒时间戳，
而非临时响应。

### `performanceResourceTiming.firstInterimResponseStart`

<!-- YAML
added: v26.9.0
-->

* 类型：{number}

表示 Node.js 接收到第一个临时响应（例如
`103 Early Hints` 响应）的第一个字节之后立即时间的高分辨率毫秒时间戳。

### `performanceResourceTiming.responseStart`

<!-- YAML
added:
  - v18.2.0
  - v16.17.0
changes:
  - version: v26.9.0
    pr-url: https://github.com/nodejs/node/pull/65017
    description: This property now returns `firstInterimResponseStart`
                 when it is non-zero.
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44483
    description: This property getter must be called with the
                 `PerformanceResourceTiming` object as the receiver.
-->

* 类型：{number}

表示 Node.js 接收到来自服务器的响应的第一个字节之后立即时间的高分辨率毫秒时间戳。当 `firstInterimResponseStart` 不为零时，该值为 `firstInterimResponseStart`；否则为 `finalResponseHeadersStart`。

### `performanceResourceTiming.responseEnd`

<!-- YAML
added:
  - v18.2.0
  - v16.17.0
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44483
    description: "此属性获取器必须以 `PerformanceResourceTiming` 对象作为接收者调用。"
-->

* 类型：{number}

表示 Node.js 接收到资源的最后一个字节之后立即或传输连接关闭之前立即的时间的高分辨率毫秒时间戳，以先发生者为准。

### `performanceResourceTiming.transferSize`

<!-- YAML
added:
  - v18.2.0
  - v16.17.0
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44483
    description: "此属性获取器必须以 `PerformanceResourceTiming` 对象作为接收者调用。"
-->

* 类型：{number}

一个数字，表示获取的资源的大小（以八位字节为单位）。大小包括响应头字段加上响应负载主体。

### `performanceResourceTiming.encodedBodySize`

<!-- YAML
added:
  - v18.2.0
  - v16.17.0
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44483
    description: "此属性获取器必须以 `PerformanceResourceTiming` 对象作为接收者调用。"
-->

* 类型：{number}

一个数字，表示从 fetch（HTTP 或缓存）接收的负载主体的大小（以八位字节为单位），在移除任何应用的内容编码之前。

### `performanceResourceTiming.decodedBodySize`

<!-- YAML
added:
  - v18.2.0
  - v16.17.0
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44483
    description: "此属性获取器必须以 `PerformanceResourceTiming` 对象作为接收者调用。"
-->

* 类型：{number}

一个数字，表示从 fetch（HTTP 或缓存）接收的消息主体的大小（以八位字节为单位），在移除任何应用的内容编码之后。

### `performanceResourceTiming.renderBlockingStatus`

<!-- YAML
added: v26.9.0
-->

* 类型：{string}

资源的渲染阻塞状态。可以是 `'blocking'` 或 `'non-blocking'`。

### `performanceResourceTiming.contentType`

<!-- YAML
added: v26.9.0
-->

* 类型：{string}

获取的资源内容的最简化 MIME 类型；如果无法确定，则为空字符串。

### `performanceResourceTiming.contentEncoding`

<!-- YAML
added: v26.9.0
-->

* 类型：{string}

获取的资源的内容编码，例如 `'gzip'` 或 `'br'`。

### `performanceResourceTiming.toJSON()`

<!-- YAML
added:
  - v18.2.0
  - v16.17.0
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44483
    description: "此方法必须以 `PerformanceResourceTiming` 对象作为接收者调用。"
-->

返回一个 `object`，它是 `PerformanceResourceTiming` 对象的 JSON 表示。

## 类：`PerformanceObserver`

<!-- YAML
added: v8.5.0
-->

### `PerformanceObserver.supportedEntryTypes`

<!-- YAML
added: v16.0.0
-->

* 类型：{string\[]}

获取支持的类型。

### `new PerformanceObserver(callback)`

<!-- YAML
added: v8.5.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调函数现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是`ERR_INVALID_CALLBACK`。"
-->

* `callback` {Function}
  * `list` {PerformanceObserverEntryList}
  * `observer` {PerformanceObserver}

`PerformanceObserver` 对象在新的 `PerformanceEntry` 实例被添加到性能时间轴时提供通知。

```mjs
import { performance, PerformanceObserver } from 'node:perf_hooks';

const obs = new PerformanceObserver((list, observer) => {
  console.log(list.getEntries());

  performance.clearMarks();
  performance.clearMeasures();
  observer.disconnect();
});
obs.observe({ entryTypes: ['mark'], buffered: true });

performance.mark('test');
```

```cjs
const {
  performance,
  PerformanceObserver,
} = require('node:perf_hooks');

const obs = new PerformanceObserver((list, observer) => {
  console.log(list.getEntries());

  performance.clearMarks();
  performance.clearMeasures();
  observer.disconnect();
});
obs.observe({ entryTypes: ['mark'], buffered: true });

performance.mark('test');
```

因为 `PerformanceObserver` 实例会引入额外的性能开销，因此不应无限期地订阅通知。用户应在不再需要观察者时尽快断开连接。

当 `PerformanceObserver` 收到新的 `PerformanceEntry` 实例通知时，会调用 `callback`。回调接收一个 `PerformanceObserverEntryList` 实例和对 `PerformanceObserver` 的引用。

### `performanceObserver.disconnect()`

<!-- YAML
added: v8.5.0
-->

断开 `PerformanceObserver` 实例与所有通知的连接。

### `performanceObserver.observe(options)`

<!-- YAML
added: v8.5.0
changes:
  - version: v16.7.0
    pr-url: https://github.com/nodejs/node/pull/39297
    description: "更新以符合 Performance Timeline Level 2。`buffered`选项已被加回。"
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/37136
    description: "更新以符合 User Timing Level 3。`buffered`选项已被移除。"
-->

* `options` {Object}
  * `type` {string} 单个 {PerformanceEntry} 类型。如果已指定 `entryTypes`，则不得给定。
  * `entryTypes` {string\[]} 一个字符串数组，标识观察者感兴趣的 {PerformanceEntry} 实例的类型。如果未提供，将抛出错误。
  * `buffered` {boolean} 如果为 true，观察者回调将被调用并传入全局 `PerformanceEntry` 缓冲条目列表。如果为 false，只有时间点之后创建的 `PerformanceEntry` 才会发送给观察者回调。**默认值：** `false`。

订阅 {PerformanceObserver} 实例，以接收由 `options.entryTypes` 或 `options.type` 标识的新 {PerformanceEntry} 实例的通知：

```mjs
import { performance, PerformanceObserver } from 'node:perf_hooks';

const obs = new PerformanceObserver((list, observer) => {
  // 异步调用一次。`list` 包含三个项。
});
obs.observe({ type: 'mark' });

for (let n = 0; n < 3; n++)
  performance.mark(`test${n}`);
```

```cjs
const {
  performance,
  PerformanceObserver,
} = require('node:perf_hooks');

const obs = new PerformanceObserver((list, observer) => {
  // 异步调用一次。`list` 包含三个项。
});
obs.observe({ type: 'mark' });

for (let n = 0; n < 3; n++)
  performance.mark(`test${n}`);
```

### `performanceObserver.takeRecords()`

<!-- YAML
added: v16.0.0
-->

* 返回：{PerformanceEntry\[]} 当前存储在性能观察者中的条目列表，并将其清空。

## 类：`PerformanceObserverEntryList`

<!-- YAML
added: v8.5.0
-->

`PerformanceObserverEntryList` 类用于提供对传递给 `PerformanceObserver` 的 `PerformanceEntry` 实例的访问。
此类的构造函数不对用户暴露。

### `performanceObserverEntryList.getEntries()`

<!-- YAML
added: v8.5.0
-->

* 返回：{PerformanceEntry\[]}

返回一个 `PerformanceEntry` 对象列表，按照 `performanceEntry.startTime` 的时间顺序排列。

```mjs
import { performance, PerformanceObserver } from 'node:perf_hooks';

const obs = new PerformanceObserver((perfObserverList, observer) => {
  console.log(perfObserverList.getEntries());
  /**
   * [
   *   PerformanceEntry {
   *     name: 'test',
   *     entryType: 'mark',
   *     startTime: 81.465639,
   *     duration: 0,
   *     detail: null
   *   },
   *   PerformanceEntry {
   *     name: 'meow',
   *     entryType: 'mark',
   *     startTime: 81.860064,
   *     duration: 0,
   *     detail: null
   *   }
   * ]
   */

  performance.clearMarks();
  performance.clearMeasures();
  observer.disconnect();
});
obs.observe({ type: 'mark' });

performance.mark('test');
performance.mark('meow');
```

```cjs
const {
  performance,
  PerformanceObserver,
} = require('node:perf_hooks');

const obs = new PerformanceObserver((perfObserverList, observer) => {
  console.log(perfObserverList.getEntries());
  /**
   * [
   *   PerformanceEntry {
   *     name: 'test',
   *     entryType: 'mark',
   *     startTime: 81.465639,
   *     duration: 0,
   *     detail: null
   *   },
   *   PerformanceEntry {
   *     name: 'meow',
   *     entryType: 'mark',
   *     startTime: 81.860064,
   *     duration: 0,
   *     detail: null
   *   }
   * ]
   */

  performance.clearMarks();
  performance.clearMeasures();
  observer.disconnect();
});
obs.observe({ type: 'mark' });

performance.mark('test');
performance.mark('meow');
```

### `performanceObserverEntryList.getEntriesByName(name[, type])`

<!-- YAML
added: v8.5.0
-->

* `name` {string}
* `type` {string}
* 返回：{PerformanceEntry\[]}

返回一个 `PerformanceEntry` 对象列表，按照 `performanceEntry.startTime` 的时间顺序排列，其中 `performanceEntry.name` 等于 `name`，并且（可选）`performanceEntry.entryType` 等于 `type`。

```mjs
import { performance, PerformanceObserver } from 'node:perf_hooks';

const obs = new PerformanceObserver((perfObserverList, observer) => {
  console.log(perfObserverList.getEntriesByName('meow'));
  /**
   * [
   *   PerformanceEntry {
   *     name: 'meow',
   *     entryType: 'mark',
   *     startTime: 98.545991,
   *     duration: 0,
   *     detail: null
   *   }
   * ]
   */
  console.log(perfObserverList.getEntriesByName('nope')); // []

  console.log(perfObserverList.getEntriesByName('test', 'mark'));
  /**
   * [
   *   PerformanceEntry {
   *     name: 'test',
   *     entryType: 'mark',
   *     startTime: 63.518931,
   *     duration: 0,
   *     detail: null
   *   }
   * ]
   */
  console.log(perfObserverList.getEntriesByName('test', 'measure')); // []

  performance.clearMarks();
  performance.clearMeasures();
  observer.disconnect();
});
obs.observe({ entryTypes: ['mark', 'measure'] });

performance.mark('test');
performance.mark('meow');
```

```cjs
const {
  performance,
  PerformanceObserver,
} = require('node:perf_hooks');

const obs = new PerformanceObserver((perfObserverList, observer) => {
  console.log(perfObserverList.getEntriesByName('meow'));
  /**
   * [
   *   PerformanceEntry {
   *     name: 'meow',
   *     entryType: 'mark',
   *     startTime: 98.545991,
   *     duration: 0,
   *     detail: null
   *   }
   * ]
   */
  console.log(perfObserverList.getEntriesByName('nope')); // []

  console.log(perfObserverList.getEntriesByName('test', 'mark'));
  /**
   * [
   *   PerformanceEntry {
   *     name: 'test',
   *     entryType: 'mark',
   *     startTime: 63.518931,
   *     duration: 0,
   *     detail: null
   *   }
   * ]
   */
  console.log(perfObserverList.getEntriesByName('test', 'measure')); // []

  performance.clearMarks();
  performance.clearMeasures();
  observer.disconnect();
});
obs.observe({ entryTypes: ['mark', 'measure'] });

performance.mark('test');
performance.mark('meow');
```

### `performanceObserverEntryList.getEntriesByType(type)`

<!-- YAML
added: v8.5.0
-->

* `type` {string}
* 返回：{PerformanceEntry\[]}

返回一个 `PerformanceEntry` 对象列表，按照 `performanceEntry.startTime` 的时间顺序排列，其中 `performanceEntry.entryType` 等于 `type`。

```mjs
import { performance, PerformanceObserver } from 'node:perf_hooks';

const obs = new PerformanceObserver((perfObserverList, observer) => {
  console.log(perfObserverList.getEntriesByType('mark'));
  /**
   * [
   *   PerformanceEntry {
   *     name: 'test',
   *     entryType: 'mark',
   *     startTime: 55.897834,
   *     duration: 0,
   *     detail: null
   *   },
   *   PerformanceEntry {
   *     name: 'meow',
   *     entryType: 'mark',
   *     startTime: 56.350146,
   *     duration: 0,
   *     detail: null
   *   }
   * ]
   */
  performance.clearMarks();
  performance.clearMeasures();
  observer.disconnect();
});
obs.observe({ type: 'mark' });

performance.mark('test');
performance.mark('meow');
```

```cjs
const {
  performance,
  PerformanceObserver,
} = require('node:perf_hooks');

const obs = new PerformanceObserver((perfObserverList, observer) => {
  console.log(perfObserverList.getEntriesByType('mark'));
  /**
   * [
   *   PerformanceEntry {
   *     name: 'test',
   *     entryType: 'mark',
   *     startTime: 55.897834,
   *     duration: 0,
   *     detail: null
   *   },
   *   PerformanceEntry {
   *     name: 'meow',
   *     entryType: 'mark',
   *     startTime: 56.350146,
   *     duration: 0,
   *     detail: null
   *   }
   * ]
   */
  performance.clearMarks();
  performance.clearMeasures();
  observer.disconnect();
});
obs.observe({ type: 'mark' });

performance.mark('test');
performance.mark('meow');
```

## `perf_hooks.createHistogram([options])`

<!-- YAML
added:
  - v15.9.0
  - v14.18.0
-->

* `options` {Object}
  * `lowest` {number|bigint} 最低可识别值。必须是大于 0 的整数值。**默认值：** `1`。
  * `highest` {number|bigint} 最高可记录值。必须是大于或等于 `lowest` 两倍的整数值。**默认值：** `Number.MAX_SAFE_INTEGER`。
  * `figures` {number} 精度位数。必须是介于 `1` 和 `5` 之间的数字。**默认值：** `3`。
  * `halfLife` {number} EWMA 半衰期，以样本数表示。设置为大于 0 的值时，直方图会跟踪指数加权移动平均值和标准差，可通过 `histogram.ewmaMean` 和 `histogram.ewmaStddev` 访问。经过 `halfLife` 次记录后，某个值的影响会衰减至 50%。**默认值：** `0`（禁用）。
  * `threshold` {number} SLO 阈值。与 `halfLife` 一起设置时，直方图会跟踪超过此阈值的值的平滑错误率，可通过 `histogram.ewmaErrorRate` 和 `histogram.burnRate()` 访问。**默认值：** `0`（禁用）。
* 返回：{RecordableHistogram}

返回一个 {RecordableHistogram}。

## `perf_hooks.createSlidingWindowHistogram(options)`

<!-- YAML
added: v26.10.0
-->

* `options` {Object}
  * `chunks` {number} 保留的直方图块数。必须是介于 `1` 和 `1024` 之间的整数。
  * `chunkDuration` {number} 每个块的持续时间，以毫秒为单位。必须是介于 `1` 和 `18_446_744_073_709` 之间的整数。必须且只能指定 `chunkDuration` 和 `recordsPerChunk` 其中之一。
  * `recordsPerChunk` {number} 分配给每个块的 `record()` 调用次数。必须是介于 `1` 和 `Number.MAX_SAFE_INTEGER` 之间的整数。必须且只能指定 `chunkDuration` 和 `recordsPerChunk` 其中之一。
  * `lowest` {number|bigint} 最低可识别值。必须是大于 `0` 的整数值。**默认值：** `1`。
  * `highest` {number|bigint} 最高可记录值。必须是大于或等于 `lowest` 两倍的整数值。**默认值：** `Number.MAX_SAFE_INTEGER`。
  * `figures` {number} 精度位数。必须是介于 `1` 和 `5` 之间的整数。**默认值：** `3`。
* 返回：{SlidingWindowHistogram}

创建一个 {SlidingWindowHistogram}，用于保留最新的 `chunks` 个直方图块。轮换采用惰性方式，不会创建计时器。基于时间的轮换会在调用 `record()` 或 `snapshot()` 时进行评估。基于计数的轮换会在调用 `record()` 时进行评估。

构造时会分配一个直方图块。其他块会按需分配。窗口使用的最大原生内存量取决于 `chunks` 以及直方图选项 `lowest`、`highest` 和 `figures`。

窗口边界的精度以块为单位。对于持续时间为 `D` 的 `N` 个块，记录的值会保留 `(N - 1) * D` 到 `N * D` 毫秒。基于计数的窗口填满后，会保留 `(N - 1) * C + 1` 到 `N * C` 次记录尝试，其中 `C` 为 `recordsPerChunk`。超出 `highest` 的记录尝试也会计入基于计数的轮换。

```js
const { createSlidingWindowHistogram } = require('node:perf_hooks');

const window = createSlidingWindowHistogram({
  chunks: 6,
  chunkDuration: 10_000,
});

window.record(20_000_000);

// 将当前窗口物化为一个独立的 Histogram。
const snapshot = window.snapshot();
console.log(snapshot.percentile(99));
```

## `perf_hooks.importHistogram(data)`

<!-- YAML
added: v26.9.0
changes:
  - version: REPLACEME
    pr-url: https://github.com/nodejs/node/pull/66098
    description: 支持格式版本 2。忽略版本 2 数据中的未知键。
-->

* `data` {Uint8Array} 先前由 [`histogram.export()`][] 生成的 CBOR 编码直方图。
* 返回：{RecordableHistogram}

从 CBOR 编码的 `Uint8Array` 重建直方图。返回的直方图是一个完整的 {RecordableHistogram}，已恢复所有桶数据、配置和 EWMA 状态。可以向其中记录新值。

可以导入由 [`histogram.export()`][] 生成的任意格式版本的数据。详情请参阅[直方图导出格式兼容性][]。

```js
const { createHistogram, importHistogram } = require('node:perf_hooks');

const h = createHistogram();
for (let i = 1; i <= 1000; i++) h.record(i);

// 序列化并重建
const data = h.export();
const h2 = importHistogram(data);

console.log(h2.count);          // 1000
console.log(h2.percentile(99)); // 与 h.percentile(99) 相同
```

## `perf_hooks.eventLoopUtilization([utilization1[, utilization2]])`

<!-- YAML
added:
  - v25.2.0
  - v24.12.0
-->

* `utilization1` {Object} 之前调用 `eventLoopUtilization()` 的结果。
* `utilization2` {Object} 在 `utilization1` 之前调用 `eventLoopUtilization()` 的结果。
* 返回：{Object}
  * `idle` {number}
  * `active` {number}
  * `utilization` {number}

`eventLoopUtilization()` 函数返回一个对象，该对象包含事件循环处于空闲和活动状态的累计持续时间，作为高分辨率毫秒计时器。`utilization` 值是计算出的事件循环利用率（ELU）。

如果主线程上的引导尚未完成，则属性的值为 `0`。由于引导发生在事件循环内，因此 ELU 在[工作线程][]上立即可用。

`utilization1` 和 `utilization2` 都是可选参数。

如果传入了 `utilization1`，则会计算并返回当前调用的 `active` 和 `idle` 时间之间的差值，以及相应的 `utilization` 值（类似于 [`process.hrtime()`][]）。

如果同时传入了 `utilization1` 和 `utilization2`，则会计算这两个参数之间的差值。这是一个便利选项，因为与 [`process.hrtime()`][] 不同，计算 ELU 比单次减法更复杂。

ELU 类似于 CPU 利用率，但它仅测量事件循环统计信息，而不是 CPU 使用情况。它表示事件循环花在事件循环的事件提供者（例如 `epoll_wait`）之外的时间百分比。不考虑其他 CPU 空闲时间。以下是一个大部分空闲的进程如何具有高 ELU 的示例。

```mjs
import { eventLoopUtilization } from 'node:perf_hooks';
import { spawnSync } from 'node:child_process';

setImmediate(() => {
  const elu = eventLoopUtilization();
  spawnSync('sleep', ['5']);
  console.log(eventLoopUtilization(elu).utilization);
});
```

```cjs
const { eventLoopUtilization } = require('node:perf_hooks');
const { spawnSync } = require('node:child_process');

setImmediate(() => {
  const elu = eventLoopUtilization();
  spawnSync('sleep', ['5']);
  console.log(eventLoopUtilization(elu).utilization);
});
```

虽然运行此脚本时 CPU 大部分处于空闲状态，但 `utilization` 的值为 `1`。这是因为对 [`child_process.spawnSync()`][] 的调用阻止了事件循环继续执行。

传入用户定义的对象而不是之前调用 `eventLoopUtilization()` 的结果会导致未定义的行为。返回值不保证反映事件循环的任何正确状态。

## `perf_hooks.monitorEventLoopDelay([options])`

<!-- YAML
added: v11.10.0
changes:
  - version: REPLACEME
    pr-url: https://github.com/nodejs/node/pull/66115
    description: 新增了 `lowest`、`highest` 和 `figures` 选项。
  - version:
     - v26.5.0
     - v24.19.0
    pr-url: https://github.com/nodejs/node/pull/62935
    description: 新增了 `samplePerIteration` 选项。
-->

* `options` {Object}
  * `samplePerIteration` {boolean} 为 `true` 时，每次事件循环迭代都会采集一次样本。**默认值：** `false`。
  * `resolution` {number} 基于间隔采样的采样率，以毫秒为单位。必须大于零。当 `samplePerIteration` 为 `true` 时，此选项会被忽略。**默认值：** `10`。
  * `lowest` {number|bigint} 最低可识别延迟，以纳秒为单位。必须是大于 `0` 的整数值。当 `samplePerIteration` 为 `true` 时，**默认值：** `1`；否则为 `1000`。
  * `highest` {number|bigint} 最高可记录延迟，以纳秒为单位。必须是大于或等于 `lowest` 两倍的整数值。**默认值：** `2n ** 63n - 1n`。
  * `figures` {number} 精度位数。必须是介于 `1` 和 `5` 之间的整数。**默认值：** `3`。
* 返回：{ELDHistogram}

_此属性是 Node.js 的扩展。它在 Web 浏览器中不可用。_

创建一个直方图对象，用于随时间采样并报告事件循环延迟。
延迟将以纳秒为单位报告。

默认情况下，直方图会通过使用已配置的 `resolution` 的计时器进行更新。
当 `samplePerIteration` 为 `true` 时，样本会使用 `uv_prepare_t` 和 `uv_check_t` 钩子在每次事件循环迭代时采集一次。
在该模式下，直方图不会保持事件循环存活，也不会在应用空闲时强制额外迭代。
这两种采样模式产生的结果差异很大，不应直接比较。

`lowest`、`highest` 和 `figures` 选项对直方图的配置方式与 [`perf_hooks.createHistogram()`][] 相同。`lowest` 必须大于 `0`，因为事件循环延迟不可能为零：事件循环存在最小开销，并且测量本身也依赖事件循环运行。大于 `highest` 的延迟不会被记录，而是由 [`histogram.exceeds`][] 计数。对于基于间隔的采样，每个样本都包含 `resolution`，因此 `highest` 应远大于 `resolution * 1e6`。直方图的内存使用量取决于这些选项，而非样本数。

```mjs
import { monitorEventLoopDelay } from 'node:perf_hooks';

const h = monitorEventLoopDelay({ resolution: 20 });
h.enable();
// 做一些事情。
h.disable();
console.log(h.min);
console.log(h.max);
console.log(h.mean);
console.log(h.stddev);
console.log(h.percentiles);
console.log(h.percentile(50));
console.log(h.percentile(99));
```

```cjs
const { monitorEventLoopDelay } = require('node:perf_hooks');
const h = monitorEventLoopDelay({ resolution: 20 });
h.enable();
// 做一些事情。
h.disable();
console.log(h.min);
console.log(h.max);
console.log(h.mean);
console.log(h.stddev);
console.log(h.percentiles);
console.log(h.percentile(50));
console.log(h.percentile(99));
```

## `perf_hooks.timerify(fn[, options])`

<!-- YAML
added:
  - v25.2.0
  - v24.12.0
-->

* `fn` {Function}
* `options` {Object}
  * `histogram` {RecordableHistogram} 使用 `perf_hooks.createHistogram()` 创建的直方图对象，用于记录以纳秒为单位的运行时长。

_此属性是 Node.js 的扩展功能，在 Web 浏览器中不可用。_

将函数包装在一个新函数中，以测量被包装函数的运行时长。必须订阅 `'function'` 条目类型的 `PerformanceObserver` 才能访问计时详情。

```mjs
import { timerify, performance, PerformanceObserver } from 'node:perf_hooks';

function someFunction() {
  console.log('hello world');
}

const wrapped = timerify(someFunction);

const obs = new PerformanceObserver((list) => {
  console.log(list.getEntries()[0].duration);

  performance.clearMarks();
  performance.clearMeasures();
  obs.disconnect();
});
obs.observe({ entryTypes: ['function'] });

// 将创建一个性能时间线条目
wrapped();
```

```cjs
const {
  timerify,
  performance,
  PerformanceObserver,
} = require('node:perf_hooks');

function someFunction() {
  console.log('hello world');
}

const wrapped = timerify(someFunction);

const obs = new PerformanceObserver((list) => {
  console.log(list.getEntries()[0].duration);

  performance.clearMarks();
  performance.clearMeasures();
  obs.disconnect();
});
obs.observe({ entryTypes: ['function'] });

// 将创建一个性能时间线条目
wrapped();
```

如果被包装的函数返回一个 promise，则会向该 promise 附加一个 finally 处理程序，并在调用 finally 处理程序后报告时长。

## 类：`Histogram`

<!-- YAML
added: v11.10.0
-->

### `histogram.burnRate(sloTarget)`

<!-- YAML
added:
 - v26.8.0
 - v24.21.0
-->

* `sloTarget` {number} SLO 目标值，以 0 到 1 之间（不含端点）的分数表示。例如，99.9% 的 SLO 对应 `0.999`。
* 返回：{number}

返回 SLO 消耗速率：`ewmaErrorRate / (1 - sloTarget)`。消耗速率为 1 表示错误预算将在 SLO 时间窗口内恰好耗尽。消耗速率大于 1 表示错误预算的消耗速度超出允许范围。要求创建直方图时同时指定 `halfLife` 和 `threshold` 选项。

```js
const { createHistogram } = require('node:perf_hooks');

// 使用 200ms 的 SLO 阈值和 100 个样本的半衰期跟踪延迟
const h = createHistogram({ halfLife: 100, threshold: 200_000_000 });

// ... 记录延迟值 ...

// 检查相对于 99.9% SLO 的消耗速率
const rate = h.burnRate(0.999);
if (rate > 1) {
  console.log(`SLO burn rate: ${rate.toFixed(2)}x — error budget depleting`);
}
```

### `histogram.count`

<!-- YAML
added:
  - v17.4.0
  - v16.14.0
-->

* 类型：{number}

直方图记录的样本数。

### `histogram.countBigInt`

<!-- YAML
added:
  - v17.4.0
  - v16.14.0
-->

* 类型：{bigint}

直方图记录的样本数。

### `histogram.ccdf(value)`

<!-- YAML
added:
 - v26.8.0
 - v24.21.0
-->

* `value` {number} 要查询的值。
* 返回：{number} 介于 0.0 和 1.0 之间的概率。

返回给定值的互补累积分布函数（CCDF）值，表示记录值超过
`value` 的概率。等价于 `1 - histogram.cdf(value)`。

### `histogram.cdf(value)`

<!-- YAML
added:
 - v26.8.0
 - v24.21.0
-->

* `value` {number} 要查询的值。
* 返回：{number} 介于 0.0 和 1.0 之间的概率。

返回给定值的累积分布函数（CDF）值，表示记录值小于或等于
`value` 的概率。这是 `histogram.percentile()` 的逆操作。

### `histogram.cliffsD(other)`

<!-- YAML
added:
 - v26.8.0
 - v24.21.0
-->

* `other` {Histogram} 用于比较的直方图。
* 返回：{number} 介于 -1.0 和 1.0 之间的值。

计算 [Cliff's delta][]，这是一种非参数效应量度量。返回此直方图中的随机值超过 `other` 中随机值的概率，减去反向概率。值为 1 表示此直方图中的每个值都大于 `other` 中的每个值；-1 表示相反；0 表示两个方向都没有倾向性。

### `histogram.cohensD(other)`

<!-- YAML
added:
 - v26.8.0
 - v24.21.0
-->

* `other` {Histogram} 用于比较的直方图。
* 返回：{number} 效应量。

计算 [Cohen's d][] 效应量，即此直方图与 `other` 的均值之差的标准化结果，使用合并标准差计算。正值表示此直方图的均值较高。按照惯例，|d| < 0.2 表示效应较小，0.5 表示中等，0.8 或更高表示效应较大。两个直方图都必须至少记录 2 个值；否则返回 0。

### `histogram.countAt(value)`

<!-- YAML
added:
 - v26.8.0
 - v24.21.0
-->

* `value` {number} 要查询的值。
* 返回：{number}

返回落在给定值对应值范围内的记录值数量。

### `histogram.diff(other)`

<!-- YAML
added: REPLACEME
-->

* `other` {Histogram} 此直方图的较早快照。
* 返回：{Histogram}

返回一个新的 {Histogram}，其中包含在获取 `other` 之后记录到此直方图中的值。两个直方图都不会被修改。若要在不调用 `reset()` 的情况下获取每个时间间隔内记录的值，可从快照计算每次差值，并将该快照保留为下一个时间间隔的基线：

```js
const { monitorEventLoopDelay } = require('node:perf_hooks');

const histogram = monitorEventLoopDelay();
histogram.enable();
let previous = histogram.snapshot();

setInterval(() => {
  const current = histogram.snapshot();
  // 重置后，使用重置以来记录的所有数据。
  const delta = current.resetCount === previous.resetCount ?
    current.diff(previous) : current;
  console.log(delta.percentile(99));
  previous = current;
}, 10_000);
```

返回的直方图中的 `count`、`exceeds` 和桶计数是两个直方图之间的差值。其 `min` 和 `max` 根据差值对应的桶计算得出，不包含 EWMA 状态，且其 `resetCount` 为 `0`。

此方法会抛出：

* 如果 `other` 的 `lowest`、`highest` 或 `figures` 配置不同，则抛出 `ERR_INVALID_ARG_VALUE`。
* 如果自获取 `other` 后，此直方图中的值已被移除，则抛出 `ERR_INVALID_STATE`；当两个直方图的 `resetCount` 不同时就会出现这种情况。
* 如果 `other` 包含此直方图中不存在的值，则抛出 `ERR_INVALID_ARG_VALUE`，例如两个直方图的传入顺序错误时。

### `histogram.exceeds`

<!-- YAML
added: v11.10.0
-->

* 类型：{number}

因超过直方图可记录的最大值而未被记录的值的数量。

### `histogram.exceedsBigInt`

<!-- YAML
added:
  - v17.4.0
  - v16.14.0
-->

* 类型：{bigint}

因超过直方图可记录的最大值而未被记录的值的数量。

### `histogram.export()`

<!-- YAML
added: v26.9.0
changes:
  - version: REPLACEME
    pr-url: https://github.com/nodejs/node/pull/66098
    description: The output uses format version 2.
-->

* 返回：{Uint8Array}

将直方图序列化为适合传输或持久化存储的 [CBOR][] 编码（RFC 8949）`Uint8Array`。该编码使用增量编码的稀疏桶计数表示，因此输出大小随不同记录值的数量变化，而非随桶总数变化。

输出包含所有直方图配置、桶数据和 EWMA 状态（启用时）。可使用 [`perf_hooks.importHistogram()`][] 将其重建为新的直方图。

CBOR 负载是一个使用整数键的映射：

| 键 | 类型    | 字段                                         |
| --- | ------- | --------------------------------------------- |
| 0   | uint    | 格式版本（当前为 2）                  |
| 1   | uint    | 最低可辨识值                      |
| 2   | uint    | 最高可跟踪值                       |
| 3   | uint    | 有效数字                           |
| 4   | uint    | 总计数                                   |
| 5   | uint    | 最小值                                     |
| 6   | uint    | 最大值                                     |
| 7   | uint    | 归一化索引偏移量                      |
| 8   | float64 | 转换比率                              |
| 9   | uint    | 计数数组长度                           |
| 10  | array   | 增量编码的稀疏计数 `[delta, c, ...]` |
| 11  | map     | EWMA 状态（禁用时省略）            |

任何标准 CBOR 解码器都可以解析输出。

#### 直方图导出格式兼容性

[`perf_hooks.importHistogram()`][] 接受 `histogram.export()` 生成的所有格式版本：

* Node.js v26.9.0 生成了版本 1。对于带有版本 1 键或不带版本键的数据，将按照原始语义导入：不接受上面未列出的键。
* 版本 2 的布局与版本 1 相同。未识别的键会被忽略，因此之后的 Node.js 版本可以向版本 2 数据添加字段而不更改版本，并且数据仍可导入。

任何其他版本的数据都会被拒绝。

如果缺少总计数、最小值或最大值，则会根据桶计数推导得出。若存在总计数，则必须与桶计数相符。

### `histogram.ewmaMean`

<!-- YAML
added: v26.8.0
-->

* 类型：{number}

记录值的指数加权移动平均值。仅当创建直方图时指定的 `halfLife` 选项大于 0 时才有效。禁用 EWMA 或尚未记录任何值时返回 `0`。

### `histogram.ewmaStddev`

<!-- YAML
added:
 - v26.8.0
 - v24.21.0
-->

* 类型：{number}

指数加权移动标准差。仅当创建直方图时指定的 `halfLife` 选项大于 0 时才有效。禁用 EWMA 或尚未记录任何值时返回 `0`。

### `histogram.ewmaErrorRate`

<!-- YAML
added:
 - v26.8.0
 - v24.21.0
-->

* 类型：{number}

记录值超过配置的 `threshold` 的概率的 EWMA 平滑值。仅当创建直方图时同时指定 `halfLife` 和 `threshold` 选项才有效。未启用该功能或尚未记录任何值时返回 `0`。

### `histogram.ksTest(other)`

<!-- YAML
added:
 - v26.8.0
 - v24.21.0
-->

* `other` {Histogram} 要与之比较的直方图。
* 返回：{number} 介于 0.0 和 1.0 之间的 KS D 统计量。

计算此直方图的分布与 `other` 的比较结果的 Kolmogorov-Smirnov
检验统计量。值为 0 表示分布完全相同；接近 1 的值表示分布完全不相交。
通过比较变更前后的直方图，可用于检测性能回归。

### `histogram.kurtosis`

<!-- YAML
added:
 - v26.8.0
 - v24.21.0
-->

* 类型：{number}

记录值的超额峰度。用于衡量分布尾部相对于正态分布的厚重程度。正值
表示尾部较厚（极端离群值更多）；负值表示尾部较轻。

### `histogram.linearBuckets(stepSize)`

<!-- YAML
added:
 - v26.8.0
 - v24.21.0
-->

* `stepSize` {number} 每个线性桶的宽度。
* 返回：{Map} 一个将桶边界值映射到计数的映射。

返回按 `stepSize` 重新划分为等间距区间的直方图数据。
适用于可视化和导出。

### `histogram.logBuckets(firstBucket, base)`

<!-- YAML
added:
 - v26.8.0
 - v24.21.0
-->

* `firstBucket` {number} 第一个桶边界的值。
* `base` {number} 桶宽度增长所使用的对数基数。必须大于 1。
* 返回：{Map} 一个将桶边界值映射到计数的映射。

返回重新划分为对数间距区间的直方图数据，其中每个桶的宽度乘以
`base`。适用于可视化和导出。

### `histogram.mannWhitneyTest(other)`

<!-- YAML
added:
 - v26.8.0
 - v24.21.0
-->

* `other` {Histogram} 用于比较的直方图。
* 返回：{Object}
  * `uStatistic` {number} Mann-Whitney U 统计量。
  * `zScore` {number} z 分数（正态近似）。
  * `pValue` {number} 双尾 p 值。

执行 [Mann-Whitney U 检验][]，比较此直方图是否倾向于产生比 `other` 更大或更小的值。与 `welchTest()` 不同，这是一个非参数检验，不对分布形状作任何假设。计算 p 值时使用带有并列值校正的正态近似。

### `histogram.max`

<!-- YAML
added: v11.10.0
-->

* 类型：{number}

记录的最大事件循环延迟。

### `histogram.maxBigInt`

<!-- YAML
added:
  - v17.4.0
  - v16.14.0
-->

* 类型：{bigint}

记录的最大事件循环延迟。

### `histogram.mean`

<!-- YAML
added: v11.10.0
-->

* 类型：{number}

记录的事件循环延迟平均值。

### `histogram.meanCI([options])`

<!-- YAML
added: v26.9.0
-->

* `options` {Object}
  * `confidence` {number} 区间的置信水平，介于 0 和 1 之间（不含端点）。**默认值：** `0.95`。
* 返回：{Object}
  * `mean` {number} 均值估计值，等同于 `histogram.mean`。
  * `lower` {number} 置信区间的下界。
  * `upper` {number} 置信区间的上界。

使用 Student's t 分布和样本标准误差返回均值的双侧置信区间。置信水平越高，区间越宽。此区间假设样本相互独立且近似正态分布，不过在样本量足够大时，该近似具有稳健性。

结果反映直方图配置的精度，并根据其桶所表示的值计算得出。记录值少于两个时，`lower` 和 `upper` 为 `NaN`。所有记录值都相等时，`lower` 和 `upper` 等于 `mean`。

```js
const { createHistogram } = require('node:perf_hooks');

const h = createHistogram();
for (let i = 1; i <= 100; i++) h.record(i);

const { mean, lower, upper } = h.meanCI();
console.log(`mean=${mean}, 95% CI=[${lower}, ${upper}]`);
```

### `histogram.min`

<!-- YAML
added: v11.10.0
-->

* 类型：{number}

记录的最小事件循环延迟。

### `histogram.minBigInt`

<!-- YAML
added:
  - v17.4.0
  - v16.14.0
-->

* 类型：{bigint}

记录的最小事件循环延迟。

### `histogram.percentile(percentile)`

<!-- YAML
added: v11.10.0
-->

* `percentile` {number} 范围在 (0, 100] 内的百分位值。
* 返回：{number}

返回给定百分位处的值。

### `histogram.percentileBigInt(percentile)`

<!-- YAML
added:
  - v17.4.0
  - v16.14.0
-->

* `percentile` {number} 范围在 (0, 100] 内的百分位值。
* 返回：{bigint}

返回给定百分位处的值。

### `histogram.percentileCI(percentile[, options])`

<!-- YAML
added:
 - v26.8.0
 - v24.21.0
-->

* `percentile` {number} 范围在 (0, 100] 内的百分位值。
* `options` {Object}
  * `confidence` {number} 区间的置信水平，介于 0 和 1 之间（不含端点）。**默认值：** `0.95`。
* 返回：{Object}
  * `value` {number} 点估计值（与 `histogram.percentile()` 相同）。
  * `lower` {number} 置信区间的下界。
  * `upper` {number} 置信区间的上界。

使用精确二项式方法返回给定百分位的置信区间。样本越少，区间越宽，反映出百分位估计的不确定性更大。要求至少记录 2 个值；少于 2 个时，`lower` 和 `upper` 将等于 `value`。

```js
const { createHistogram } = require('node:perf_hooks');

const h = createHistogram();
for (let i = 0; i < 1000; i++) {
  h.record(Math.floor(Math.random() * 100));
}

const ci = h.percentileCI(99);
console.log(ci.value);  // p99 点估计值
console.log(ci.lower);  // 下界（95% 置信水平）
console.log(ci.upper);  // 上界（95% 置信水平）
```

### `histogram.percentiles`

<!-- YAML
added: v11.10.0
-->

* 类型：{Map}

返回一个 `Map` 对象，详细说明累积的百分位分布。

### `histogram.percentilesBigInt`

<!-- YAML
added:
  - v17.4.0
  - v16.14.0
-->

* 类型：{Map}

返回一个 `Map` 对象，详细说明累积的百分位分布。

### `histogram.percentilesAt(percentiles)`

<!-- YAML
added:
 - v26.8.0
 - v24.21.0
-->

* `percentiles` {number\[]} 范围在 (0, 100] 内的百分位值数组。
* 返回：{Map} 一个将百分位值映射到其对应直方图值的映射。

返回指定百分位处的值，在一次高效遍历直方图数据的过程中计算得出。
比多次调用 `histogram.percentile()` 更高效。

### `histogram.qrde([options])`

<!-- YAML
added: v26.10.0
-->

* `options` {Object}
  * `bins` {number} 要返回的等概率密度分箱数。必须介于 1 和 1000 之间。不能与 `probabilities` 同时使用。**默认值：** `100`。
  * `probabilities` {number\[]} 自定义概率边界。数组必须包含 2 到 1001 个严格递增的值，以 `0` 开始并以 `1` 结束。不能与 `bins` 同时使用。
  * `dequantize` {string} 控制是否将重复的桶值确定性地分散到其等价值范围内。可以是 `'none'`、`'hdr'` 或 `'all'`。**默认值：** `'hdr'`。
  * `cache` {boolean} 为 `true` 时，保留展开后的直方图快照，以供后续 `cache: true` 的调用复用。直方图被修改时，快照将失效。**默认值：** `false`。
* 返回：{Promise} 成功时返回一个包含以下内容的 {Object}：
  * `probabilities` {Float64Array} 估计所使用的概率边界。
  * `quantiles` {Float64Array} 概率边界处的分位数。
  * `densities` {Float64Array} 每个分位区间内的密度。
  * `count` {bigint} 直方图快照中的值数量。
  * `bucketCount` {number} 已占用的 HDR 桶数。
  * `corrections` {number} 被限制为前一个分位数的非单调浮点结果数量。
  * `dequantize` {string} 所选的去量化模式。

返回基于 Harrell-Davis 分位数估计器、尊重分位数的密度估计。默认情况下，`bins` 会生成等概率边界。`probabilities` 选项则可用于聚焦 p90、p99、p99.9 和 p99.99 等区域。区间 `i` 的密度包含概率质量 `probabilities[i + 1] - probabilities[i]`。调用此方法时会创建直方图快照。快照展开和估计在 libuv 线程池中计算。对于高度集中的 beta 权重，会使用二阶渐近近似，以避免样本量较大时数值收敛损失。

将 `cache` 设置为 `true`，可避免在针对未更改的直方图请求多个估算值时重复捕获和展开快照。保留的快照占用的内存与已占用的 HDR 桶数量成正比，并会在直方图下一次修改时释放。

QRDE 会临时使用大约一个额外的 HDR 计数数组，以及每个已占用桶 32 字节的内存。设置 `cache: true` 时，展开后的每桶 32 字节快照会继续分配。以下估算使用 `lowest: 1` 和 `highest: Number.MAX_SAFE_INTEGER`，不包括分配器和 JavaScript 对象开销：

| `figures` | Histogram | Maximum expanded snapshot | Peak cache-miss QRDE |
| --------- | --------: | ------------------------: | -------------------: |
| 1         |   6.3 KiB |                    25 KiB |               31 KiB |
| 2         |    47 KiB |                   188 KiB |              235 KiB |
| 3         |   352 KiB |                   1.4 MiB |              1.7 MiB |
| 4         |   5.0 MiB |                    20 MiB |               25 MiB |
| 5         |    37 MiB |                   148 MiB |              185 MiB |

最大快照列假设每个可表示的桶都已占用。较低的 `highest` 值会缩小直方图和临时副本的大小。每个未命中缓存的并发调用都需要自己的临时副本和展开后的快照。

HDR 直方图会将观测值聚合到等价值桶中。`'hdr'` 反量化模式会将宽度大于一个单位的桶中的重复值建模为桶分辨率范围内的连续均匀分布。这可以减少 HDR 量化引入的密度伪影，同时将重复的单位分辨率值保留为点质量。`'all'` 模式也会对重复的单位分辨率值进行反量化。使用 `'none'` 可直接根据桶中点计算分组 Harrell-Davis 估算值。

空直方图会返回请求的 `probabilities`，但 `quantiles` 和 `densities` 数组为空。对于未经反量化且分位数边界相等的区间，其密度为无穷大。

### `histogram.reset()`

<!-- YAML
added: v11.10.0
-->

重置收集到的直方图数据，并递增 `histogram.resetCount`。

### `histogram.resetCount`

<!-- YAML
added: REPLACEME
-->

* 类型：{number}

通过 `reset()` 或对于 {RecordableHistogram} 而言通过 `subtract()` 从此直方图中移除值的次数。快照的 `resetCount` 是其创建时来源直方图的 `resetCount`，因此比较两个快照的 `resetCount` 可以得知它们之间来源直方图是否被重置过。参阅 [`histogram.diff()`][]。

### `histogram.skewness`

<!-- YAML
added:
 - v26.8.0
 - v24.21.0
-->

* 类型：{number}

记录值的偏度。用于衡量分布的不对称性。正值表示右偏分布
（右尾更长，延迟数据中较为常见）；负值表示左偏分布。

### `histogram.snapshot()`

<!-- YAML
added: REPLACEME
-->

* 返回：{Histogram}

返回一个新的、独立的 {Histogram}，其中包含此直方图当前状态的副本：其配置、记录的值、`exceeds` 计数和 EWMA 状态。此方法返回后记录到此直方图中的值，以及之后对 `reset()` 的调用，都不会改变返回的直方图。这为仍在记录数据的直方图（例如已启用的 {ELDHistogram}）提供了稳定的视图。

无法向返回的直方图中记录值。创建快照时会复制每个桶，因此其时间和内存开销取决于直方图的 `lowest`、`highest` 和 `figures` 配置，而非记录值的数量。

```js
const { monitorEventLoopDelay } = require('node:perf_hooks');

const histogram = monitorEventLoopDelay();
histogram.enable();

setTimeout(() => {
  const snapshot = histogram.snapshot();
  console.log(snapshot.percentile(99));
  histogram.disable();
}, 1000);
```

### `histogram.stddev`

<!-- YAML
added: v11.10.0
-->

* 类型：{number}

记录的事件循环延迟标准差。

### `histogram.welchTest(other[, options])`

<!-- YAML
added:
 - v26.8.0
 - v24.21.0
-->

* `other` {Histogram} 用于比较的直方图。
* `options` {Object}
  * `confidence` {number} 区间的置信水平，介于 0 和 1 之间。
    **默认值：** `0.95`。
* 返回：{Object}
  * `tStatistic` {number} Welch t 统计量。
  * `degreesOfFreedom` {number} Welch-Satterthwaite 自由度。
  * `pValue` {number} 双尾 p 值。
  * `confidenceInterval` {Object}
    * `lower` {number} 均值差置信区间的下限。
    * `upper` {number} 上限。

执行 [Welch's t-test][]，比较此直方图与 `other` 的均值。p 值表示在两个分布具有相同均值的零假设下，观察到至少如此极端差异的概率。两个直方图都必须至少有 2 个记录值；否则，结果的 `pValue` 为 1，`tStatistic` 为 0。

## 类：`ELDHistogram extends Histogram`

一种记录事件循环延迟的 `Histogram`，由
[`perf_hooks.monitorEventLoopDelay()`][] 返回。

### `histogram.disable()`

<!-- YAML
added: v11.10.0
-->

* 返回：{boolean}

禁用事件循环延迟采样。如果采样已停止，则返回 `true`；如果它本来就已停止，则返回 `false`。

### `histogram.enable()`

<!-- YAML
added: v11.10.0
-->

* 返回：{boolean}

启用事件循环延迟采样。如果采样已启动，则返回 `true`；如果它本来就已启动，则返回 `false`。

### `histogram[Symbol.dispose]()`

<!-- YAML
added: v24.2.0
-->

在直方图被释放时禁用事件循环延迟采样。

```js
const { monitorEventLoopDelay } = require('node:perf_hooks');
{
  using hist = monitorEventLoopDelay({ resolution: 20 });
  hist.enable();
  // 当退出块时，直方图将被禁用。
}
```

### 克隆一个 `ELDHistogram`

{ELDHistogram} 实例可以通过 {MessagePort} 进行克隆。在接收端，
该直方图会被克隆为一个普通的 {Histogram} 对象，它不实现
`enable()` 和 `disable()` 方法。

## 类：`RecordableHistogram extends Histogram`

<!-- YAML
added:
  - v15.9.0
  - v14.18.0
-->

### `histogram.add(other)`

<!-- YAML
added:
  - v17.4.0
  - v16.14.0
-->

* `other` {RecordableHistogram}

将 `other` 中的值添加到此直方图。

### `histogram.record(val)`

<!-- YAML
added:
  - v15.9.0
  - v14.18.0
changes:
  - version: REPLACEME
    pr-url: https://github.com/nodejs/node/pull/66114
    description: Recording `0` is now supported.
-->

* `val` {number|bigint} 要记录到直方图中的数值。必须是大于或等于 `0` 的整数。

小于直方图 `lowest` 选项的值（包括 `0`）可能无法彼此区分。

### `histogram.recordDelta()`

<!-- YAML
added:
  - v15.9.0
  - v14.18.0
-->

计算自上次调用 `recordDelta()` 以来经过的时间量（以纳秒为单位），并将该时间量记录到直方图中。

### `histogram.recordCorrected(val, expectedInterval)`

<!-- YAML
added:
 - v26.8.0
 - v24.21.0
changes:
  - version: REPLACEME
    pr-url: https://github.com/nodejs/node/pull/66114
    description: Recording `0` is now supported.
-->

* `val` {number|bigint} 要记录的值。必须是大于或等于 `0` 的整数。
* `expectedInterval` {number|bigint} 预期的记录间隔。

使用协调遗漏校正记录一个值。当系统停顿导致无法及时记录时，此方法会在上次记录的值与 `val` 之间，以 `expectedInterval` 为步长补录中间值。这样可以弥补测量间隔，否则这些间隔会导致延迟被低估。

### `histogram.subtract(other)`

<!-- YAML
added:
 - v26.8.0
 - v24.21.0
-->

* `other` {RecordableHistogram}

从此直方图中减去 `other` 的值。两个直方图应具有兼容的配置。减法结果为负的桶计数会被限制为零。递增 `histogram.resetCount`。

## 类：`SlidingWindowHistogram`

<!-- YAML
added: v26.10.0
-->

将值记录到一个按需轮换的直方图分块环中。实例通过 [`perf_hooks.createSlidingWindowHistogram()`][] 创建，不能直接构造。`SlidingWindowHistogram` 不继承 {Histogram}；调用 `snapshot()` 可将当前窗口实例化为 {Histogram}。

`SlidingWindowHistogram` 实例不能通过 {MessagePort} 克隆或传输。

### `slidingWindowHistogram.record(val)`

<!-- YAML
added: v26.10.0
-->

* `val` {number|bigint} 要记录的数值。必须是大于或等于 `0` 的整数。

将 `val` 记录到当前分块。对于基于计数的窗口，每次到达原生直方图的调用都会计入轮换次数，包括超过配置的 `highest` 值的值。

### `slidingWindowHistogram.reset()`

<!-- YAML
added: v26.10.0
-->

使当前窗口中的所有分块失效。已分配的分块会在重复使用时按需重置。

### `slidingWindowHistogram.snapshot()`

<!-- YAML
added: v26.10.0
-->

* 返回：{Histogram}

将当前窗口实例化为一个新的、独立的 {Histogram}。此方法返回后记录或过期的值不会改变返回的直方图。实例化过程会分配一个直方图并合并所有保留的分块。

## Histogram 分析示例

`Histogram` 类提供了适用于性能监控、SLO 执行和回归检测的统计分析方法。

### 分布形状分析

```js
const { createHistogram } = require('node:perf_hooks');

const h = createHistogram();

// Simulate a right-skewed latency distribution
for (let i = 0; i < 1000; i++) {
  h.record(Math.ceil(Math.random() * 100));
}
// Add some outliers
for (let i = 0; i < 10; i++) {
  h.record(500 + Math.ceil(Math.random() * 500));
}

console.log('Skewness:', h.skewness.toFixed(4));  // Positive = right-skewed
console.log('Kurtosis:', h.kurtosis.toFixed(4));  // Positive = heavy tails
```

### 使用 CDF 监控 SLO

```js
const { createHistogram } = require('node:perf_hooks');

const latency = createHistogram();

// Record request latencies (in nanoseconds)...

// "What fraction of requests complete within 100ms?"
const withinSLO = latency.cdf(100_000_000);
console.log(`${(withinSLO * 100).toFixed(1)}% of requests within SLO`);

// "What fraction of requests exceed 500ms?"
const violating = latency.ccdf(500_000_000);
console.log(`${(violating * 100).toFixed(1)}% of requests violating SLO`);
```

### SLO 消耗速率监控

```js
const { createHistogram } = require('node:perf_hooks');

// Track latency with EWMA (half-life 100 samples) and a 200ms SLO threshold
const latency = createHistogram({
  halfLife: 100,
  threshold: 200_000_000,  // 200ms in nanoseconds
});

// Record request latencies...

// Smoothed error rate: probability of exceeding the threshold
console.log(`Error rate: ${(latency.ewmaErrorRate * 100).toFixed(2)}%`);

// Burn rate against a 99.9% SLO
// >1 means the error budget is depleting faster than allowed
const rate = latency.burnRate(0.999);
console.log(`Burn rate: ${rate.toFixed(2)}x`);

// EWMA mean and stddev track the smoothed latency
console.log(`EWMA latency: ${latency.ewmaMean.toFixed(0)}ns`);
console.log(`EWMA stddev:  ${latency.ewmaStddev.toFixed(0)}ns`);
```

### 使用 KS 检验检测回归

```js
const { createHistogram } = require('node:perf_hooks');

const baseline = createHistogram();
const current = createHistogram();

// Record baseline and current latencies...

// D-statistic: 0 = identical, 1 = completely different
const d = baseline.ksTest(current);
if (d > 0.1) {
  console.log(`Possible regression detected (D=${d.toFixed(4)})`);
}
```

### 批量百分位数查询

```js
const { createHistogram } = require('node:perf_hooks');

const h = createHistogram();
// Record values...

// Efficiently query common monitoring percentiles in one pass
const p = h.percentilesAt([50, 75, 90, 95, 99, 99.9]);
console.log('p50:', p.get(50));
console.log('p99:', p.get(99));
```

### 使用 subtract 进行快照差异比较

```js
const { createHistogram } = require('node:perf_hooks');

const total = createHistogram();
const snapshot = createHistogram();

// Record values into total...
// Periodically snapshot for "last interval" analysis:
snapshot.add(total);

// Later, take a new snapshot and diff:
const newSnapshot = createHistogram();
newSnapshot.add(total);
newSnapshot.subtract(snapshot);
// newSnapshot now contains only the values recorded since the last snapshot
console.log('Recent p99:', newSnapshot.percentile(99));
```

### 使用 Welch's t-test 比较基准测试

```js
const { createHistogram } = require('node:perf_hooks');

const baseline = createHistogram();
const candidate = createHistogram();

// Record operation rates from the old and new builds...

const result = baseline.welchTest(candidate);
const improvement = ((candidate.mean - baseline.mean) / baseline.mean * 100);

console.log(`Improvement: ${improvement.toFixed(2)}%`);
console.log(`p-value: ${result.pValue.toFixed(6)}`);
console.log(`95% CI: [${result.confidenceInterval.lower.toFixed(2)}, ` +
            `${result.confidenceInterval.upper.toFixed(2)}]`);

if (result.pValue < 0.05) {
  const d = baseline.cohensD(candidate);
  console.log(`Statistically significant (Cohen's d = ${d.toFixed(4)})`);
}
```

### 使用 Cliff's delta 衡量效应量

```js
const { createHistogram } = require('node:perf_hooks');

const before = createHistogram();
const after = createHistogram();

// Record latencies before and after a change...

const delta = before.cliffsD(after);
// A delta > 0: before tends to produce larger values (improvement)
// A delta < 0: after tends to produce larger values (regression)
console.log(`Cliff's delta: ${delta.toFixed(4)}`);
```

## 示例

### 测量异步操作的持续时间

以下示例使用 [Async Hooks][] 和 Performance API 来测量 Timeout 操作的实际持续时间（包括执行回调所花费的时间）。

```mjs
import { createHook } from 'node:async_hooks';
import { performance, PerformanceObserver } from 'node:perf_hooks';

const set = new Set();
const hook = createHook({
  init(id, type) {
    if (type === 'Timeout') {
      performance.mark(`Timeout-${id}-Init`);
      set.add(id);
    }
  },
  destroy(id) {
    if (set.has(id)) {
      set.delete(id);
      performance.mark(`Timeout-${id}-Destroy`);
      performance.measure(`Timeout-${id}`,
                          `Timeout-${id}-Init`,
                          `Timeout-${id}-Destroy`);
    }
  },
});
hook.enable();

const obs = new PerformanceObserver((list, observer) => {
  console.log(list.getEntries()[0]);
  performance.clearMarks();
  performance.clearMeasures();
  observer.disconnect();
});
obs.observe({ entryTypes: ['measure'], buffered: true });

setTimeout(() => {}, 1000);
```

```cjs
const async_hooks = require('node:async_hooks');
const {
  performance,
  PerformanceObserver,
} = require('node:perf_hooks');

const set = new Set();
const hook = async_hooks.createHook({
  init(id, type) {
    if (type === 'Timeout') {
      performance.mark(`Timeout-${id}-Init`);
      set.add(id);
    }
  },
  destroy(id) {
    if (set.has(id)) {
      set.delete(id);
      performance.mark(`Timeout-${id}-Destroy`);
      performance.measure(`Timeout-${id}`,
                          `Timeout-${id}-Init`,
                          `Timeout-${id}-Destroy`);
    }
  },
});
hook.enable();

const obs = new PerformanceObserver((list, observer) => {
  console.log(list.getEntries()[0]);
  performance.clearMarks();
  performance.clearMeasures();
  observer.disconnect();
});
obs.observe({ entryTypes: ['measure'] });

setTimeout(() => {}, 1000);
```

### 测量加载依赖项所需的时间

以下示例测量加载依赖项的 `require()` 操作的持续时间：

```mjs
import { performance, PerformanceObserver } from 'node:perf_hooks';

// 激活观察器
const obs = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  entries.forEach((entry) => {
    console.log(`import('${entry[0]}')`, entry.duration);
  });
  performance.clearMarks();
  performance.clearMeasures();
  obs.disconnect();
});
obs.observe({ entryTypes: ['function'], buffered: true });

const timedImport = performance.timerify(async (module) => {
  return await import(module);
});

await timedImport('some-module');
```

<!-- eslint-disable no-global-assign -->

```cjs
const {
  performance,
  PerformanceObserver,
} = require('node:perf_hooks');
const mod = require('node:module');

// 猴子补丁 require 函数
mod.Module.prototype.require =
  performance.timerify(mod.Module.prototype.require);
require = performance.timerify(require);

// 激活观察器
const obs = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  entries.forEach((entry) => {
    console.log(`require('${entry[0]}')`, entry.duration);
  });
  performance.clearMarks();
  performance.clearMeasures();
  obs.disconnect();
});
obs.observe({ entryTypes: ['function'] });

require('some-module');
```

### 测量一次 HTTP 往返所需的时间

以下示例用于追踪 HTTP 客户端（`OutgoingMessage`）和 HTTP 请求（`IncomingMessage`）所花费的时间。对于 HTTP 客户端，它指的是从开始请求到接收响应之间的时间间隔；对于 HTTP 请求，它指的是从接收请求到发送响应之间的时间间隔：

```mjs
import { PerformanceObserver } from 'node:perf_hooks';
import { createServer, get } from 'node:http';

const obs = new PerformanceObserver((items) => {
  items.getEntries().forEach((item) => {
    console.log(item);
  });
});

obs.observe({ entryTypes: ['http'] });

const PORT = 8080;

createServer((req, res) => {
  res.end('ok');
}).listen(PORT, () => {
  get(`http://127.0.0.1:${PORT}`);
});
```

```cjs
const { PerformanceObserver } = require('node:perf_hooks');
const http = require('node:http');

const obs = new PerformanceObserver((items) => {
  items.getEntries().forEach((item) => {
    console.log(item);
  });
});

obs.observe({ entryTypes: ['http'] });

const PORT = 8080;

http.createServer((req, res) => {
  res.end('ok');
}).listen(PORT, () => {
  http.get(`http://127.0.0.1:${PORT}`);
});
```

### 测量连接成功时 `net.connect`（仅适用于 TCP）所需的时间

```mjs
import { PerformanceObserver } from 'node:perf_hooks';
import { connect, createServer } from 'node:net';

const obs = new PerformanceObserver((items) => {
  items.getEntries().forEach((item) => {
    console.log(item);
  });
});
obs.observe({ entryTypes: ['net'] });
const PORT = 8080;
createServer((socket) => {
  socket.destroy();
}).listen(PORT, () => {
  connect(PORT);
});
```

```cjs
const { PerformanceObserver } = require('node:perf_hooks');
const net = require('node:net');
const obs = new PerformanceObserver((items) => {
  items.getEntries().forEach((item) => {
    console.log(item);
  });
});
obs.observe({ entryTypes: ['net'] });
const PORT = 8080;
net.createServer((socket) => {
  socket.destroy();
}).listen(PORT, () => {
  net.connect(PORT);
});
```

### 测量请求成功时 DNS 所需的时间

```mjs
import { PerformanceObserver } from 'node:perf_hooks';
import { lookup, promises } from 'node:dns';

const obs = new PerformanceObserver((items) => {
  items.getEntries().forEach((item) => {
    console.log(item);
  });
});
obs.observe({ entryTypes: ['dns'] });
lookup('localhost', () => {});
promises.resolve('localhost');
```

```cjs
const { PerformanceObserver } = require('node:perf_hooks');
const dns = require('node:dns');
const obs = new PerformanceObserver((items) => {
  items.getEntries().forEach((item) => {
    console.log(item);
  });
});
obs.observe({ entryTypes: ['dns'] });
dns.lookup('localhost', () => {});
dns.promises.resolve('localhost');
```

[Async Hooks]: async_hooks.md
[CBOR]: https://www.rfc-editor.org/rfc/rfc8949
[Cliff's delta]: https://en.wikipedia.org/wiki/Effect_size#Cliff's_delta
[Cohen's d]: https://en.wikipedia.org/wiki/Effect_size#Cohen's_d
[Fetch Response Body Info]: https://fetch.spec.whatwg.org/#response-body-info
[Fetch Timing Info]: https://fetch.spec.whatwg.org/#fetch-timing-info
[High Resolution Time]: https://www.w3.org/TR/hr-time-2
[Mann-Whitney U test]: https://en.wikipedia.org/wiki/Mann%E2%80%93Whitney_U_test
[Performance Timeline]: https://w3c.github.io/performance-timeline/
[Resource Timing]: https://www.w3.org/TR/resource-timing-2/
[User Timing]: https://www.w3.org/TR/user-timing/
[Web Performance APIs]: https://w3c.github.io/perf-timing-primer/
[Welch's t-test]: https://en.wikipedia.org/wiki/Welch%27s_t-test
[Worker threads]: worker_threads.md#worker-threads
[`'exit'`]: process.md#event-exit
[`child_process.spawnSync()`]: child_process.md#child_processspawnsynccommand-args-options
[`histogram.diff()`]: #histogramdiffother
[`histogram.exceeds`]: #histogramexceeds
[`histogram.export()`]: #histogramexport
[`perf_hooks.createHistogram()`]: #perf_hookscreatehistogramoptions
[`perf_hooks.createSlidingWindowHistogram()`]: #perf_hookscreateslidingwindowhistogramoptions
[`perf_hooks.eventLoopUtilization()`]: #perf_hookseventlooputilizationutilization1-utilization2
[`perf_hooks.importHistogram()`]: #perf_hooksimporthistogramdata
[`perf_hooks.monitorEventLoopDelay()`]: #perf_hooksmonitoreventloopdelayoptions
[`perf_hooks.timerify()`]: #perf_hookstimerifyfn-options
[`performanceNodeTiming.uvMetricsInfoBigInt`]: #performancenodetiminguvmetricsinfobigint
[`performanceNodeTiming.uvMetricsInfo`]: #performancenodetiminguvmetricsinfo
[`process.hrtime()`]: process.md#processhrtimetime
[`timeOrigin`]: https://w3c.github.io/hr-time/#dom-performance-timeorigin
[`window.performance.toJSON`]: https://developer.mozilla.org/en-US/docs/Web/API/Performance/toJSON
[`window.performance`]: https://developer.mozilla.org/en-US/docs/Web/API/Window/performance
[histogram export format compatibility]: #histogram-export-format-compatibility
