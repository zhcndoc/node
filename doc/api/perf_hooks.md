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

### 垃圾回收 ('gc') 详情

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

### HTTP ('http') 详情

当 `performanceEntry.type` 等于 `'http'` 时，`performanceNodeEntry.detail` 属性将是一个包含附加信息的 {Object}。

如果 `performanceEntry.name` 等于 `HttpClient`，`detail` 将包含以下属性：`req`, `res`。`req` 属性将是一个包含 `method`, `url`, `headers` 的 {Object}，`res` 属性将是一个包含 `statusCode`, `statusMessage`, `headers` 的 {Object}。

如果 `performanceEntry.name` 等于 `HttpRequest`，`detail` 将包含以下属性：`req`, `res`。`req` 属性将是一个包含 `method`, `url`, `headers` 的 {Object}，`res` 属性将是一个包含 `statusCode`, `statusMessage`, `headers` 的 {Object}。

这可能会增加额外的内存开销，应仅用于诊断目的，默认情况下不应在生产环境中保持开启。

### HTTP/2 ('http2') 详情

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

### Timerify ('function') 详情

当 `performanceEntry.type` 等于 `'function'` 时，`performanceNodeEntry.detail` 属性将是一个 {Array}，列出计时函数的输入参数。

### Net ('net') 详情

当 `performanceEntry.type` 等于 `'net'` 时，`performanceNodeEntry.detail` 属性将是一个包含附加信息的 {Object}。

如果 `performanceEntry.name` 等于 `connect`，`detail` 将包含以下属性：`host`, `port`。

### DNS ('dns') 详情

当 `performanceEntry.type` 等于 `'dns'` 时，`performanceNodeEntry.detail` 属性将是一个包含附加信息的 {Object}。

如果 `performanceEntry.name` 等于 `lookup`，`detail` 将包含以下属性：`hostname`, `family`, `hints`, `verbatim`, `addresses`。

如果 `performanceEntry.name` 等于 `lookupService`，`detail` 将包含以下属性：`host`, `port`, `hostname`, `service`。

如果 `performanceEntry.name` 等于 `queryxxx` 或 `getHostByAddr`，`detail` 将包含以下属性：`host`, `ttl`, `result`。`result` 的值与 `queryxxx` 或 `getHostByAddr` 的结果相同。

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

* 返回：{Object}
  * `loopCount` {number} 事件循环迭代次数。
  * `events` {number} 事件处理程序已处理的事件数。
  * `eventsWaiting` {number} 调用事件提供者时等待处理的事件数。

这是 `uv_metrics_info` 函数的包装器。
它返回当前的一组事件循环指标。

建议在通过 `setImmediate` 调度执行的函数内部使用此属性，以避免在当前循环迭代期间计划的所有操作完成之前收集指标。

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

因为 `PerformanceObserver` 实例引入了它们自己额外的性能开销，实例不应无限期地订阅通知。用户应在不再需要观察者时尽快断开连接。

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

订阅 {PerformanceObserver} 实例以接收新的 {PerformanceEntry} 实例的通知，这些实例由 `options.entryTypes` 或 `options.type` 标识：

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

返回一个 `PerformanceEntry` 对象列表，按照 `performanceEntry.startTime` 的时间顺序排列，其 `performanceEntry.name` 等于 `name`，并且可选地，其 `performanceEntry.entryType` 等于 `type`。

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

返回一个 `PerformanceEntry` 对象列表，按照 `performanceEntry.startTime` 的时间顺序排列，其 `performanceEntry.entryType` 等于 `type`。

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
  * `lowest` {number|bigint} 最低可分辨值。必须是大于 0 的整数值。**默认值：** `1`。
  * `highest` {number|bigint} 最高可记录值。必须是等于或大于 `lowest` 两倍的整数值。
    **默认值：** `Number.MAX_SAFE_INTEGER`。
  * `figures` {number} 精度位数。必须是 `1` 到 `5` 之间的数字。**默认值：** `3`。
* 返回：{RecordableHistogram}

返回一个 {RecordableHistogram}。

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

`eventLoopUtilization()` 函数返回一个对象，该对象包含事件循环处于空闲和活动状态的累计持续时间，作为高分辨率毫秒计时器。`utilization` 值是计算出的事件循环利用率 (ELU)。

如果主线程上的引导尚未完成，则属性的值为 `0`。由于引导发生在事件循环内，因此 ELU 在 [工作线程][] 上立即可用。

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
  - version:
     - v26.5.0
     - v24.19.0
    pr-url: https://github.com/nodejs/node/pull/62935
    description: 新增了 `samplePerIteration` 选项。
-->

* `options` {Object}
  * `samplePerIteration` {boolean} 当为 `true` 时，样本会在每次
    事件循环迭代时采集一次。**默认值：** `false`。
  * `resolution` {number} 基于间隔采样时，以毫秒为单位的采样频率。
    必须大于零。当前选项为 `samplePerIteration` 时会忽略此选项。**默认值：** `10`。
* 返回：{ELDHistogram}

_此属性是 Node.js 的扩展。它在 Web 浏览器中不可用。_

创建一个直方图对象，用于随时间采样并报告事件循环延迟。
延迟将以纳秒为单位报告。

默认情况下，直方图会通过使用已配置的 `resolution` 的计时器进行更新。
当 `samplePerIteration` 为 `true` 时，样本会使用 `uv_prepare_t` 和 `uv_check_t` 钩子在每次事件循环迭代时采集一次。
在该模式下，直方图不会保持事件循环存活，也不会在应用空闲时强制额外迭代。
这两种采样模式产生的结果差异很大，不应直接比较。

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

### `histogram.exceeds`

<!-- YAML
added: v11.10.0
-->

* 类型：{number}

事件循环延迟超过最大 1 小时事件循环延迟阈值的次数。

### `histogram.exceedsBigInt`

<!-- YAML
added:
  - v17.4.0
  - v16.14.0
-->

* 类型：{bigint}

事件循环延迟超过最大 1 小时事件循环延迟阈值的次数。

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

### `histogram.reset()`

<!-- YAML
added: v11.10.0
-->

重置收集的直方图数据。

### `histogram.stddev`

<!-- YAML
added: v11.10.0
-->

* 类型：{number}

记录的事件循环延迟标准差。

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
-->

* `val` {number|bigint} 要记录到直方图中的量。

### `histogram.recordDelta()`

<!-- YAML
added:
  - v15.9.0
  - v14.18.0
-->

计算自上次调用 `recordDelta()` 以来经过的时间量（纳秒），并将该量记录在直方图中。

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

[异步钩子]: async_hooks.md
[获取响应正文信息]: https://fetch.spec.whatwg.org/#response-body-info
[获取计时信息]: https://fetch.spec.whatwg.org/#fetch-timing-info
[高分辨率时间]: https://www.w3.org/TR/hr-time-2
[性能时间线]: https://w3c.github.io/performance-timeline/
[资源计时]: https://www.w3.org/TR/resource-timing-2/
[用户计时]: https://www.w3.org/TR/user-timing/
[Web 性能 API]: https://w3c.github.io/perf-timing-primer/
[工作线程]: worker_threads.md#worker-threads
[`'exit'`]: process.md#event-exit
[`child_process.spawnSync()`]: child_process.md#child_processspawnsynccommand-args-options
[`perf_hooks.eventLoopUtilization()`]: #perf_hookseventlooputilizationutilization1-utilization2
[`perf_hooks.monitorEventLoopDelay()`]: #perf_hooksmonitoreventloopdelayoptions
[`perf_hooks.timerify()`]: #perf_hookstimerifyfn-options
[`process.hrtime()`]: process.md#processhrtimetime
[`timeOrigin`]: https://w3c.github.io/hr-time/#dom-performance-timeorigin
[`window.performance.toJSON`]: https://developer.mozilla.org/en-US/docs/Web/API/Performance/toJSON
[`window.performance`]: https://developer.mozilla.org/en-US/docs/Web/API/Window/performance
