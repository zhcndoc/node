# 定时器

<!--introduced_in=v0.10.0-->

> 稳定性：2 - 稳定

<!-- source_link=lib/timers.js -->

`timer` 模块暴露了一个全局 API，用于调度函数在未来的某个时间段被调用。因为定时器函数是全局变量，因此无需调用 `require('node:timers')` 即可使用该 API。

Node.js 中的定时器函数实现了与 Web 浏览器提供的定时器 API 类似的 API，但使用了不同的内部实现，该实现围绕 Node.js [事件循环][] 构建。

## 类：`Immediate`

此对象在内部创建，并从 [`setImmediate()`][] 返回。它可以传递给 [`clearImmediate()`][] 以取消计划的操作。

默认情况下，当调度一个 immediate 时，只要该 immediate 处于活动状态，Node.js 事件循环将继续运行。[`setImmediate()`][] 返回的 `Immediate` 对象导出了 `immediate.ref()` 和 `immediate.unref()` 函数，可用于控制此默认行为。

### `immediate.hasRef()`

<!-- YAML
added: v11.0.0
-->

* 返回：{boolean}

如果为 true，`Immediate` 对象将使 Node.js 事件循环保持活动状态。

### `immediate.ref()`

<!-- YAML
added: v9.7.0
-->

* 返回：{Immediate} `immediate` 的引用

调用时，请求 Node.js 事件循环只要 `Immediate` 处于活动状态就_不_退出。多次调用 `immediate.ref()` 不会产生任何效果。

默认情况下，所有 `Immediate` 对象都是 "ref'ed" 的，因此通常无需调用 `immediate.ref()`，除非之前调用过 `immediate.unref()`。

### `immediate.unref()`

<!-- YAML
added: v9.7.0
-->

* 返回：{Immediate} `immediate` 的引用

调用时，活动的 `Immediate` 对象将不需要 Node.js 事件循环保持活动状态。如果没有其他活动保持事件循环运行，进程可能会在 `Immediate` 对象的回调被调用之前退出。多次调用 `immediate.unref()` 不会产生任何效果。

### `immediate[Symbol.dispose]()`

<!-- YAML
added:
 - v20.5.0
 - v18.18.0
changes:
 - version: v24.2.0
   pr-url: https://github.com/nodejs/node/pull/58467
   description: 不再是实验性功能。
-->

取消 immediate。这类似于调用 `clearImmediate()`。

## 类：`Timeout`

此对象在内部创建，并从 [`setTimeout()`][] 和 [`setInterval()`][] 返回。它可以传递给 [`clearTimeout()`][] 或 [`clearInterval()`][] 以取消计划的操作。

默认情况下，当使用 [`setTimeout()`][] 或 [`setInterval()`][] 调度定时器时，只要定时器处于活动状态，Node.js 事件循环将继续运行。这些函数返回的每个 `Timeout` 对象都导出了 `timeout.ref()` 和 `timeout.unref()` 函数，可用于控制此默认行为。

### `timeout.close()`

<!-- YAML
added: v0.9.1
-->

> 稳定性：3 - 遗留：请改用 [`clearTimeout()`][]。

* 返回：{Timeout} `timeout` 的引用

取消 timeout。

### `timeout.hasRef()`

<!-- YAML
added: v11.0.0
-->

* 返回：{boolean}

如果为 true，`Timeout` 对象将使 Node.js 事件循环保持活动状态。

### `timeout.ref()`

<!-- YAML
added: v0.9.1
-->

* 返回：{Timeout} `timeout` 的引用

调用时，请求 Node.js 事件循环只要 `Timeout` 处于活动状态就_不_退出。多次调用 `timeout.ref()` 不会产生任何效果。

默认情况下，所有 `Timeout` 对象都是 "ref'ed" 的，因此通常无需调用 `timeout.ref()`，除非之前调用过 `timeout.unref()`。

### `timeout.refresh()`

<!-- YAML
added: v10.2.0
-->

* 返回：{Timeout} `timeout` 的引用

将定时器的开始时间设置为当前时间，并重新调度定时器，使其在当前时间调整后的先前指定持续时间调用其回调。这对于刷新定时器而无需分配新的 JavaScript 对象很有用。

在已经调用过回调的定时器上使用此方法将重新激活定时器。

### `timeout.unref()`

<!-- YAML
added: v0.9.1
-->

* 返回：{Timeout} `timeout` 的引用

调用时，活动的 `Timeout` 对象将不需要 Node.js 事件循环保持活动状态。如果没有其他活动保持事件循环运行，进程可能会在 `Timeout` 对象的回调被调用之前退出。多次调用 `timeout.unref()` 不会产生任何效果。

### `timeout[Symbol.toPrimitive]()`

<!-- YAML
added:
  - v14.9.0
  - v12.19.0
-->

* 返回：{integer} 一个可用于引用此 `timeout` 的数字

将 `Timeout` 强制转换为原始值。该原始值可用于清除 `Timeout`。该原始值只能在创建定时器的同一线程中使用。因此，要在 [`worker_threads`][] 之间使用它，必须首先将其传递给正确的线程。这允许与浏览器 `setTimeout()` 和 `setInterval()` 实现增强的兼容性。

### `timeout[Symbol.dispose]()`

<!-- YAML
added:
 - v20.5.0
 - v18.18.0
changes:
 - version: v24.2.0
   pr-url: https://github.com/nodejs/node/pull/58467
   description: 不再是实验性功能。
-->

取消 timeout。

## 调度定时器

Node.js 中的定时器是一个内部构造，它在一定时间后调用给定函数。定时器的函数何时调用取决于用于创建定时器的方法以及 Node.js 事件循环正在做的其他工作。

### `setImmediate(callback[, ...args])`

<!-- YAML
added: v0.9.1
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: 向 `callback` 参数传递无效的回调现在抛出 `ERR_INVALID_ARG_TYPE` 而不是 `ERR_INVALID_CALLBACK`。
-->

* `callback` {Function} 在 Node.js [事件循环][] 的本轮结束时调用的函数
* `...args` {any} 调用 `callback` 时传递的可选参数。
* 返回：{Immediate} 用于 [`clearImmediate()`][]

调度在 I/O 事件回调之后“立即”执行 `callback`。

当多次调用 `setImmediate()` 时，`callback` 函数按创建顺序排队执行。整个回调队列在每次事件循环迭代中处理。如果从正在执行的回调内部排队了一个 immediate 定时器，则该定时器直到下一次事件循环迭代才会触发。

如果 `callback` 不是函数，将抛出 [`TypeError`][]。

此方法有一个用于 promise 的自定义变体，可通过 [`timersPromises.setImmediate()`][] 使用。

### `setInterval(callback[, delay[, ...args]])`

<!-- YAML
added: v0.0.1
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: 向 `callback` 参数传递无效的回调现在抛出 `ERR_INVALID_ARG_TYPE` 而不是 `ERR_INVALID_CALLBACK`。
-->

* `callback` {Function} 定时器到期时调用的函数。
* `delay` {number} 调用 `callback` 之前等待的毫秒数。**默认值：** `1`。
* `...args` {any} 调用 `callback` 时传递的可选参数。
* 返回：{Timeout} 用于 [`clearInterval()`][]

调度每隔 `delay` 毫秒重复执行 `callback`。

当 `delay` 大于 `2147483647` 或小于 `1` 或 `NaN` 时，`delay` 将设置为 `1`。非整数延迟被截断为整数。

如果 `callback` 不是函数，将抛出 [`TypeError`][]。

此方法有一个用于 promise 的自定义变体，可通过 [`timersPromises.setInterval()`][] 使用。

### `setTimeout(callback[, delay[, ...args]])`

<!-- YAML
added: v0.0.1
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: 向 `callback` 参数传递无效的回调现在抛出 `ERR_INVALID_ARG_TYPE` 而不是 `ERR_INVALID_CALLBACK`。
-->

* `callback` {Function} 定时器到期时调用的函数。
* `delay` {number} 调用 `callback` 之前等待的毫秒数。**默认值：** `1`。
* `...args` {any} 调用 `callback` 时传递的可选参数。
* 返回：{Timeout} 用于 [`clearTimeout()`][]

调度在 `delay` 毫秒后执行一次性 `callback`。

`callback` 可能不会恰好在 `delay` 毫秒后被调用。Node.js 不保证回调触发的确切时间，也不保证它们的顺序。回调将在尽可能接近指定时间的情况下被调用。

当 `delay` 大于 `2147483647` 或小于 `1` 或 `NaN` 时，`delay` 将设置为 `1`。非整数延迟被截断为整数。

如果 `callback` 不是函数，将抛出 [`TypeError`][]。

此方法有一个用于 promise 的自定义变体，可通过 [`timersPromises.setTimeout()`][] 使用。

## 取消定时器

[`setImmediate()`][]、[`setInterval()`][] 和 [`setTimeout()`][] 方法各自返回代表计划定时器的对象。这些可用于取消定时器并防止其触发。

对于 [`setImmediate()`][] 和 [`setTimeout()`][] 的 promise 化变体，可使用 [`AbortController`][] 来取消定时器。取消时，返回的 Promise 将被拒绝并带有 `'AbortError'`。

对于 `setImmediate()`：

```mjs
import { setImmediate as setImmediatePromise } from 'node:timers/promises';

const ac = new AbortController();
const signal = ac.signal;

// 我们不 `await` 这个 promise，以便 `ac.abort()` 被并发调用。
setImmediatePromise('foobar', { signal })
  .then(console.log)
  .catch((err) => {
    if (err.name === 'AbortError')
      console.error('The immediate was aborted');
  });

ac.abort();
```

```cjs
const { setImmediate: setImmediatePromise } = require('node:timers/promises');

const ac = new AbortController();
const signal = ac.signal;

setImmediatePromise('foobar', { signal })
  .then(console.log)
  .catch((err) => {
    if (err.name === 'AbortError')
      console.error('The immediate was aborted');
  });

ac.abort();
```

对于 `setTimeout()`：

```mjs
import { setTimeout as setTimeoutPromise } from 'node:timers/promises';

const ac = new AbortController();
const signal = ac.signal;

// 我们不 `await` 这个 promise，以便 `ac.abort()` 被并发调用。
setTimeoutPromise(1000, 'foobar', { signal })
  .then(console.log)
  .catch((err) => {
    if (err.name === 'AbortError')
      console.error('The timeout was aborted');
  });

ac.abort();
```

```cjs
const { setTimeout: setTimeoutPromise } = require('node:timers/promises');

const ac = new AbortController();
const signal = ac.signal;

setTimeoutPromise(1000, 'foobar', { signal })
  .then(console.log)
  .catch((err) => {
    if (err.name === 'AbortError')
      console.error('The timeout was aborted');
  });

ac.abort();
```

### `clearImmediate(immediate)`

<!-- YAML
added: v0.9.1
-->

* `immediate` {Immediate} 由 [`setImmediate()`][] 返回的 `Immediate` 对象。

取消由 [`setImmediate()`][] 创建的 `Immediate` 对象。

### `clearInterval(timeout)`

<!-- YAML
added: v0.0.1
-->

* `timeout` {Timeout|string|number} 由 [`setInterval()`][] 返回的 `Timeout` 对象，或作为字符串或数字的 `Timeout` 对象的 [原始值][]。

取消由 [`setInterval()`][] 创建的 `Timeout` 对象。

### `clearTimeout(timeout)`

<!-- YAML
added: v0.0.1
-->

* `timeout` {Timeout|string|number} 由 [`setTimeout()`][] 返回的 `Timeout` 对象，或作为字符串或数字的 `Timeout` 对象的 [原始值][]。

取消由 [`setTimeout()`][] 创建的 `Timeout` 对象。

## 计时器 Promise API

<!-- YAML
added: v15.0.0
changes:
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/38112
    description: 从实验性功能毕业。
-->

`timers/promises` API 提供了一组返回 `Promise` 对象的替代计时器函数。该 API 可通过
`require('node:timers/promises')` 访问。

```mjs
import {
  setTimeout,
  setImmediate,
  setInterval,
} from 'node:timers/promises';
```

```cjs
const {
  setTimeout,
  setImmediate,
  setInterval,
} = require('node:timers/promises');
```

### `timersPromises.setTimeout([delay[, value[, options]]])`

<!-- YAML
added: v15.0.0
-->

* `delay` {number} 承诺兑现前等待的毫秒数。**默认：**`1`。
* `value` {any} 用于兑现承诺的值。
* `options` {Object}
  * `ref` {boolean} 设置为 `false` 表示计划的 `Timeout`
    不应要求 Node.js 事件循环保持活动。
    **默认：**`true`。
  * `signal` {AbortSignal} 可选的 `AbortSignal`，可用于
    取消计划的 `Timeout`。

```mjs
import {
  setTimeout,
} from 'node:timers/promises';

const res = await setTimeout(100, 'result');

console.log(res);  // 打印 'result'
```

```cjs
const {
  setTimeout,
} = require('node:timers/promises');

setTimeout(100, 'result').then((res) => {
  console.log(res);  // 打印 'result'
});
```

### `timersPromises.setImmediate([value[, options]])`

<!-- YAML
added: v15.0.0
-->

* `value` {any} 用于兑现承诺的值。
* `options` {Object}
  * `ref` {boolean} 设置为 `false` 表示计划的 `Immediate`
    不应要求 Node.js 事件循环保持活动。
    **默认：**`true`。
  * `signal` {AbortSignal} 可选的 `AbortSignal`，可用于
    取消计划的 `Immediate`。

```mjs
import {
  setImmediate,
} from 'node:timers/promises';

const res = await setImmediate('result');

console.log(res);  // 打印 'result'
```

```cjs
const {
  setImmediate,
} = require('node:timers/promises');

setImmediate('result').then((res) => {
  console.log(res);  // 打印 'result'
});
```

### `timersPromises.setInterval([delay[, value[, options]]])`

<!-- YAML
added: v15.9.0
-->

返回一个异步迭代器，以 `delay` 毫秒的间隔生成值。
如果 `ref` 为 `true`，则需要显式或隐式地调用异步迭代器的 `next()` 以保持事件循环活动。

* `delay` {number} 迭代之间等待的毫秒数。
  **默认：**`1`。
* `value` {any} 迭代器返回的值。
* `options` {Object}
  * `ref` {boolean} 设置为 `false` 表示迭代之间计划的 `Timeout`
    不应要求 Node.js 事件循环保持活动。
    **默认：**`true`。
  * `signal` {AbortSignal} 可选的 `AbortSignal`，可用于
    取消操作之间计划的 `Timeout`。

```mjs
import {
  setInterval,
} from 'node:timers/promises';

const interval = 100;
for await (const startTime of setInterval(interval, Date.now())) {
  const now = Date.now();
  console.log(now);
  if ((now - startTime) > 1000)
    break;
}
console.log(Date.now());
```

```cjs
const {
  setInterval,
} = require('node:timers/promises');
const interval = 100;

(async function() {
  for await (const startTime of setInterval(interval, Date.now())) {
    const now = Date.now();
    console.log(now);
    if ((now - startTime) > 1000)
      break;
  }
  console.log(Date.now());
})();
```

### `timersPromises.scheduler.wait(delay[, options])`

<!-- YAML
added:
  - v17.3.0
  - v16.14.0
-->

> 稳定性：1 - 实验性

* `delay` {number} 承诺解析前等待的毫秒数。
* `options` {Object}
  * `ref` {boolean} 设置为 `false` 表示计划的 `Timeout`
    不应要求 Node.js 事件循环保持活动。
    **默认：**`true`。
  * `signal` {AbortSignal} 可选的 `AbortSignal`，可用于
    取消等待。
* 返回：{Promise}

由 [Scheduling APIs][] 草案规范定义的实验性 API，该规范正在作为标准 Web 平台 API 开发。

调用 `timersPromises.scheduler.wait(delay, options)` 等同于
调用 `timersPromises.setTimeout(delay, undefined, options)`。

```mjs
import { scheduler } from 'node:timers/promises';

await scheduler.wait(1000); // 继续之前等待一秒
```

### `timersPromises.scheduler.yield()`

<!-- YAML
added:
  - v17.3.0
  - v16.14.0
-->

> 稳定性：1 - 实验性

* 返回：{Promise}

由 [Scheduling APIs][] 草案规范定义的实验性 API，该规范正在作为标准 Web 平台 API 开发。

调用 `timersPromises.scheduler.yield()` 等同于调用
不带参数的 `timersPromises.setImmediate()`。

[Event Loop]: https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#setimmediate-vs-settimeout
[Scheduling APIs]: https://github.com/WICG/scheduling-apis
[`AbortController`]: globals.md#class-abortcontroller
[`TypeError`]: errors.md#class-typeerror
[`clearImmediate()`]: #clearimmediateimmediate
[`clearInterval()`]: #clearintervaltimeout
[`clearTimeout()`]: #cleartimeouttimeout
[`setImmediate()`]: #setimmediatecallback-args
[`setInterval()`]: #setintervalcallback-delay-args
[`setTimeout()`]: #settimeoutcallback-delay-args
[`timersPromises.setImmediate()`]: #timerspromisessetimmediatevalue-options
[`timersPromises.setInterval()`]: #timerspromisessetintervaldelay-value-options
[`timersPromises.setTimeout()`]: #timerspromisessettimeoutdelay-value-options
[`worker_threads`]: worker_threads.md
[primitive]: #timeoutsymboltoprimitive
