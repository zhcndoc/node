# 全局对象

<!--introduced_in=v0.10.0-->

<!-- type=misc -->

> 稳定性：2 - 稳定

这些对象在所有模块中均可用。

以下变量可能看起来是全局的，但实际上不是。它们仅存在于 [CommonJS 模块][] 的作用域中：

* [`__dirname`][]
* [`__filename`][]
* [`exports`][]
* [`module`][]
* [`require()`][]

此处列出的对象是 Node.js 特有的。还有 [内置对象][] 是 JavaScript 语言本身的一部分，它们也是全局可访问的。

## `__dirname`

此变量可能看起来是全局的，但实际上不是。参见 [`__dirname`][]。

## `__filename`

此变量可能看起来是全局的，但实际上不是。参见 [`__filename`][]。

## 类：`AbortController`

<!-- YAML
added:
  - v15.0.0
  - v14.17.0
changes:
  - version: v15.4.0
    pr-url: https://github.com/nodejs/node/pull/35949
    description: 不再处于实验阶段。
-->

一个用于在选定的基于 `Promise` 的 API 中信号取消的工具类。该 API 基于 Web API {AbortController}。

```js
const ac = new AbortController();

ac.signal.addEventListener('abort', () => console.log('已中止!'),
                           { once: true });

ac.abort();

console.log(ac.signal.aborted);  // 打印 true
```

### `abortController.abort([reason])`

<!-- YAML
added:
  - v15.0.0
  - v14.17.0
changes:
  - version:
      - v17.2.0
      - v16.14.0
    pr-url: https://github.com/nodejs/node/pull/40807
    description: 新增了可选的 reason 参数。
-->

* `reason` {any} 一个可选的原因，可在 `AbortSignal` 的 `reason` 属性上检索。

触发中止信号，导致 `abortController.signal` 发出 `'abort'` 事件。

### `abortController.signal`

<!-- YAML
added:
  - v15.0.0
  - v14.17.0
-->

* 类型：{AbortSignal}。

## 类：`AbortSignal`

<!-- YAML
added:
  - v15.0.0
  - v14.17.0
-->

* 继承自：{EventTarget}

`AbortSignal` 用于在调用 `abortController.abort()` 方法时通知观察者。

### 静态方法：`AbortSignal.abort([reason])`

<!-- YAML
added:
  - v15.12.0
  - v14.17.0
changes:
  - version:
      - v17.2.0
      - v16.14.0
    pr-url: https://github.com/nodejs/node/pull/40807
    description: 新增了可选的 reason 参数。
-->

* `reason` {any}
* 返回：{AbortSignal}

返回一个新的已中止的 `AbortSignal`。

### 静态方法：`AbortSignal.timeout(delay)`

<!-- YAML
added:
  - v17.3.0
  - v16.14.0
-->

* `delay` {number} 触发 AbortSignal 之前等待的毫秒数。

返回一个新的 `AbortSignal`，它将在 `delay` 毫秒后中止。

### 静态方法：`AbortSignal.any(signals)`

<!-- YAML
added:
  - v20.3.0
  - v18.17.0
-->

* `signals` {AbortSignal\[]} 用于组合成新 `AbortSignal` 的 `AbortSignal`。

返回一个新的 `AbortSignal`，如果任何提供的信号被中止，它也将被中止。其 [`abortSignal.reason`][] 将设置为导致其被中止的任一 `signals`。

### 事件：`'abort'`

<!-- YAML
added:
  - v15.0.0
  - v14.17.0
-->

当调用 `abortController.abort()` 方法时，会发出 `'abort'` 事件。回调被调用时传入单个对象参数，该对象具有单个 `type` 属性，设置为 `'abort'`：

```js
const ac = new AbortController();

// 使用 onabort 属性...
ac.signal.onabort = () => console.log('aborted!');

// 或使用 EventTarget API...
ac.signal.addEventListener('abort', (event) => {
  console.log(event.type);  // 打印 'abort'
}, { once: true });

ac.abort();
```

关联 `AbortSignal` 的 `AbortController` 只会触发一次 `'abort'` 事件。我们建议代码在添加 `'abort'` 事件监听器之前检查 `abortSignal.aborted` 属性是否为 `false`。

附加到 `AbortSignal` 的任何事件监听器都应使用 `{ once: true }` 选项（或者，如果使用 `EventEmitter` API 附加监听器，请使用 `once()` 方法），以确保一旦 `'abort'` 事件被处理，事件监听器即被移除。否则可能导致内存泄漏。

### `abortSignal.aborted`

<!-- YAML
added:
  - v15.0.0
  - v14.17.0
-->

* 类型：{boolean}

在 `AbortController` 被中止后为 true。

### `abortSignal.onabort`

<!-- YAML
added:
  - v15.0.0
  - v14.17.0
-->

* 类型：{Function}

一个可选的回调函数，可由用户代码设置，以便在调用 `abortController.abort()` 函数时收到通知。

### `abortSignal.reason`

<!-- YAML
added:
  - v17.2.0
  - v16.14.0
-->

* 类型：{any}

在触发 `AbortSignal` 时指定的可选原因。

```js
const ac = new AbortController();
ac.abort(new Error('boom!'));
console.log(ac.signal.reason);  // 错误：boom!
```

### `abortSignal.throwIfAborted()`

<!-- YAML
added:
  - v17.3.0
  - v16.17.0
-->

如果 `abortSignal.aborted` 为 `true`，则抛出 `abortSignal.reason`。

## `atob(data)`

<!-- YAML
added: v16.0.0
-->

> 稳定性：3 - 遗留。请改用 `Buffer.from(data, 'base64')`。

[`buffer.atob()`][] 的全局别名。

提供了一个自动迁移工具 ([来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/buffer-atob-btoa))：

```bash
npx codemod@latest @nodejs/buffer-atob-btoa
```

## 类：`Blob`

<!-- YAML
added: v18.0.0
-->

参见 {Blob}。

## 类：`BroadcastChannel`

<!-- YAML
added: v18.0.0
-->

参见 {BroadcastChannel}。

## `btoa(data)`

<!-- YAML
added: v16.0.0
-->

> 稳定性：3 - 遗留。请改用 `buf.toString('base64')`。

[`buffer.btoa()`][] 的全局别名。

提供了一个自动迁移工具 ([来源](https://github.com/nodejs/userland-migrations/tree/main/recipes/buffer-atob-btoa))：

```bash
npx codemod@latest @nodejs/buffer-atob-btoa
```

## 类：`Buffer`

<!-- YAML
added: v0.1.103
-->

* 类型：{Function}

用于处理二进制数据。参见 [buffer 部分][]。

## 类：`ByteLengthQueuingStrategy`

<!-- YAML
added: v18.0.0
changes:
 - version:
    - v23.11.0
    - v22.15.0
   pr-url: https://github.com/nodejs/node/pull/57510
   description: 标记 API 为稳定。
-->

[`ByteLengthQueuingStrategy`][] 的与浏览器兼容的实现。

## `clearImmediate(immediateObject)`

<!-- YAML
added: v0.9.1
-->

[`clearImmediate`][] 在 [计时器][] 部分中描述。

## `clearInterval(intervalObject)`

<!-- YAML
added: v0.0.1
-->

[`clearInterval`][] 在 [计时器][] 部分中描述。

## `clearTimeout(timeoutObject)`

<!-- YAML
added: v0.0.1
-->

[`clearTimeout`][] 在 [计时器][] 部分中描述。

## 类：`CloseEvent`

<!-- YAML
added: v23.0.0
-->

{CloseEvent} 的与浏览器兼容的实现。使用 [`--no-experimental-websocket`][] CLI 标志禁用此 API。

## 类：`CompressionStream`

<!-- YAML
added: v18.0.0
changes:
 - version:
   - v24.7.0
   - v22.20.0
   pr-url: https://github.com/nodejs/node/pull/59464
   description: "format 现在接受 `brotli` 值。"
 - version:
    - v23.11.0
    - v22.15.0
   pr-url: https://github.com/nodejs/node/pull/57510
   description: 标记 API 为稳定。
-->

[`CompressionStream`][] 的与浏览器兼容的实现。

## `console`

<!-- YAML
added: v0.1.100
-->

* 类型：{Object}

用于打印到 stdout 和 stderr。参见 [`console`][] 部分。

## 类：`CountQueuingStrategy`

<!-- YAML
added: v18.0.0
changes:
 - version:
    - v23.11.0
    - v22.15.0
   pr-url: https://github.com/nodejs/node/pull/57510
   description: 标记 API 为稳定。
-->

[`CountQueuingStrategy`][] 的与浏览器兼容的实现。

## 类：`Crypto`

<!-- YAML
added:
  - v17.6.0
  - v16.15.0
changes:
  - version: v23.0.0
    pr-url: https://github.com/nodejs/node/pull/52564
    description: 不再处于实验阶段。
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/42083
    description: "不再受 `--experimental-global-webcrypto` CLI 标志限制。"
-->

{Crypto} 的与浏览器兼容的实现。仅当编译 Node.js 二进制文件时包含对 `node:crypto` 模块的支持，此全局对象才可用。

## `crypto`

<!-- YAML
added:
  - v17.6.0
  - v16.15.0
changes:
  - version: v23.0.0
    pr-url: https://github.com/nodejs/node/pull/52564
    description: 不再处于实验阶段。
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/42083
    description: "不再受 `--experimental-global-webcrypto` CLI 标志限制。"
-->

[Web Crypto API][] 的与浏览器兼容的实现。

## 类：`CryptoKey`

<!-- YAML
added:
  - v17.6.0
  - v16.15.0
changes:
  - version: v23.0.0
    pr-url: https://github.com/nodejs/node/pull/52564
    description: 不再处于实验阶段。
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/42083
    description: "不再受 `--experimental-global-webcrypto` CLI 标志限制。"
-->

{CryptoKey} 的与浏览器兼容的实现。仅当编译 Node.js 二进制文件时包含对 `node:crypto` 模块的支持，此全局对象才可用。

## 类：`CustomEvent`

<!-- YAML
added:
  - v18.7.0
  - v16.17.0
changes:
  - version: v23.0.0
    pr-url: https://github.com/nodejs/node/pull/52723
    description: 不再处于实验阶段。
  - version:
    - v22.1.0
    - v20.13.0
    pr-url: https://github.com/nodejs/node/pull/52618
    description: CustomEvent 现在已稳定。
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/44860
    description: "不再受 `--experimental-global-customevent` CLI 标志限制。"
-->

与浏览器兼容的 {CustomEvent} 实现。

## 类：`DecompressionStream`

<!-- YAML
added: v18.0.0
changes:
  - version:
    - v24.7.0
    - v22.20.0
    pr-url: https://github.com/nodejs/node/pull/59464
    description: "format 现在接受 `brotli` 值。"
  - version:
    - v23.11.0
    - v22.15.0
    pr-url: https://github.com/nodejs/node/pull/57510
    description: 标记 API 为稳定。
-->

[`DecompressionStream`][] 的与浏览器兼容的实现。

## 类：`DOMException`

<!-- YAML
added: v17.0.0
-->

WHATWG {DOMException} 类。

## `ErrorEvent`

<!-- YAML
added: v25.0.0
-->

{ErrorEvent} 的与浏览器兼容的实现。

## 类：`Event`

<!-- YAML
added: v15.0.0
changes:
  - version: v15.4.0
    pr-url: https://github.com/nodejs/node/pull/35949
    description: 不再是实验性的。
-->

与浏览器兼容的 `Event` 类实现。有关更多详细信息，请参阅
[`EventTarget` 和 `Event` API][]。

## 类：`EventSource`

<!-- YAML
added:
  - v22.3.0
  - v20.18.0
-->

> 稳定性：1 - 实验性。使用 [`--experimental-eventsource`][]
> CLI 标志启用此 API。

与浏览器兼容的 {EventSource} 实现。

## 类：`EventTarget`

<!-- YAML
added: v15.0.0
changes:
  - version: v15.4.0
    pr-url: https://github.com/nodejs/node/pull/35949
    description: 不再是实验性的。
-->

与浏览器兼容的 `EventTarget` 类实现。有关更多详细信息，请参阅
[`EventTarget` 和 `Event` API][]。

## `exports`

此变量可能看起来是全局的，但并不是。请参阅 [`exports`][]。

## `fetch`

<!-- YAML
added:
  - v17.5.0
  - v16.15.0
changes:
  - version:
    - v21.0.0
    pr-url: https://github.com/nodejs/node/pull/45684
    description: 不再是实验性的。
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41811
    description: "不再位于 `--experimental-fetch` CLI 标志之后。"
-->

与浏览器兼容的 [`fetch()`][] 函数实现。

```mjs
const res = await fetch('https://nodejs.org/api/documentation.json');
if (res.ok) {
  const data = await res.json();
  console.log(data);
}
```

该实现基于 [undici](https://undici.nodejs.org)，这是一个专为 Node.js 从头编写的 HTTP/1.1 客户端。你可以通过读取 `process.versions.undici` 属性来确定你的 Node.js 进程中捆绑了哪个版本的 `undici`。

### 自定义 dispatcher

你可以在 `fetch` 的选项对象中传入自定义 dispatcher，以使用它来调度请求。
该 dispatcher 必须与 `undici` 的
[`Dispatcher` 类](https://undici.nodejs.org/api/Dispatcher)兼容。

```js
fetch(url, { dispatcher: new MyAgent() });
```

可以通过安装 `undici` 并使用
`setGlobalDispatcher()` 方法来更改 Node.js 中的全局 dispatcher。调用此方法将影响 `undici` 和
Node.js 两者。

```mjs
import { setGlobalDispatcher } from 'undici';
setGlobalDispatcher(new MyAgent());
```

### 相关类

以下全局变量可与 `fetch` 一起使用：

* [`FormData`][]
* [`Headers`][]
* [`Request`][]
* [`Response`][]

## 类：`File`

<!-- YAML
added: v20.0.0
-->

请参阅 {File}。

## 类：`FormData`

<!-- YAML
added:
  - v17.6.0
  - v16.15.0
changes:
  - version:
    - v21.0.0
    pr-url: https://github.com/nodejs/node/pull/45684
    description: 不再是实验性的。
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41811
    description: "不再位于 `--experimental-fetch` CLI 标志之后。"
-->

与浏览器兼容的 {FormData} 实现。

## `global`

<!-- YAML
added: v0.1.27
-->

> 稳定性：3 - 遗留。请改用 [`globalThis`][]。

* 类型：{Object} 全局命名空间对象。

在浏览器中，顶层作用域传统上是全局作用域。这
意味着 `var something` 将定义一个新的全局变量，除了在
ECMAScript 模块内。在 Node.js 中，这是不同的。顶层作用域不是
全局作用域；Node.js 模块内的 `var something` 将局限于该
模块，无论它是 [CommonJS 模块][] 还是
[ECMAScript 模块][]。

## 类：`Headers`

<!-- YAML
added:
  - v17.5.0
  - v16.15.0
changes:
  - version:
    - v21.0.0
    pr-url: https://github.com/nodejs/node/pull/45684
    description: 不再是实验性的。
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41811
    description: "不再位于 `--experimental-fetch` CLI 标志之后。"
-->

与浏览器兼容的 {Headers} 实现。

## `localStorage`

<!-- YAML
added: v22.4.0
changes:
  - version: v26.0.0
    pr-url: https://github.com/nodejs/node/pull/60351
    description: "在不提供`--localstorage-file` 的情况下访问 `localStorage` 全局现在会抛出 `DOMException`，以符合 Web Storage 规范。"
  - version: v25.0.0
    pr-url: https://github.com/nodejs/node/pull/57666
    description: "当启用 webstorage 且未提供`--localstorage-file` 时，访问 `localStorage` 全局现在返回一个空对象。"
  - version: v25.0.0
    pr-url: https://github.com/nodejs/node/pull/57666
    description: "此 API 不再位于 `--experimental-webstorage` 运行时标志之后。"
-->

> 稳定性：1.2 - 发布候选。使用 [`--no-experimental-webstorage`][] 禁用此 API。

与浏览器兼容的 [`localStorage`][] 实现。数据存储在
由 [`--localstorage-file`][] CLI 标志指定的文件中，未加密。
可存储的最大数据量为 10 MB。
不支持在 Web Storage API 之外对此数据进行任何修改。
在服务器上下文中使用时，`localStorage` 数据不是按用户或按请求存储的，它在所有用户和请求之间共享。

## 类：`MessageChannel`

<!-- YAML
added: v15.0.0
-->

`MessageChannel` 类。有关更多详细信息，请参阅 [`MessageChannel`][]】【。

## 类：`MessageEvent`

<!-- YAML
added: v15.0.0
-->

与浏览器兼容的 {MessageEvent} 实现。

## 类：`MessagePort`

<!-- YAML
added: v15.0.0
-->

`MessagePort` 类。有关更多详细信息，请参阅 [`MessagePort`][]。

## `module`

此变量可能看起来是全局的，但并不是。请参阅 [`module`][]。

## 类：`Navigator`

<!-- YAML
added: v21.0.0
-->

> 稳定性：1.1 - 积极开发中。使用
> [`--no-experimental-global-navigator`][] CLI 标志禁用此 API。

[Navigator API][] 的部分实现。

## `navigator`

<!-- YAML
added: v21.0.0
-->

> 稳定性：1.1 - 积极开发中。使用
> [`--no-experimental-global-navigator`][] CLI 标志禁用此 API。

[`window.navigator`][] 的部分实现。

### `navigator.hardwareConcurrency`

<!-- YAML
added: v21.0.0
-->

* 类型：{number}

`navigator.hardwareConcurrency` 只读属性返回当前 Node.js 实例可用的
逻辑处理器数量。

```js
console.log(`This process is running on ${navigator.hardwareConcurrency} logical processors`);
```

### `navigator.language`

<!-- YAML
added: v21.2.0
-->

* 类型：{string}

`navigator.language` 只读属性返回一个字符串，表示
Node.js 实例的首选语言。语言将由
运行时基于操作系统的默认语言使用的 Node.js 的
ICU 库确定。

该值表示 [RFC 5646][] 中定义的语言版本。

在没有 ICU 的构建上，回退值为 `'en-US'`。

```js
console.log(`The preferred language of the Node.js instance has the tag '${navigator.language}'`);
```

### `navigator.languages`

<!-- YAML
added: v21.2.0
-->

* 类型：{string\[]}

`navigator.languages` 只读属性返回一个字符串数组，
表示 Node.js 实例的首选语言。
默认情况下，`navigator.languages` 仅包含
`navigator.language` 的值，该值将由
运行时基于操作系统的默认语言使用的 Node.js 的 ICU 库确定。

在没有 ICU 的构建上，回退值为 `['en-US']`。

```js
console.log(`The preferred languages are '${navigator.languages}'`);
```

### `navigator.locks`

<!-- YAML
added: v24.5.0
-->

> 稳定性：1 - 实验性

`navigator.locks` 只读属性返回一个 [`LockManager`][] 实例，该实例
可用于协调对可能在同一进程内多个
线程之间共享的资源的访问。此全局实现匹配
[浏览器 `LockManager`][] API 的语义。

```mjs
// 请求独占锁
await navigator.locks.request('my_resource', async (lock) => {
  // 锁已获取。
  console.log(`Lock acquired: ${lock.name}`);
  // 函数返回时锁会自动释放
});

// 请求共享锁
await navigator.locks.request('shared_resource', { mode: 'shared' }, async (lock) => {
  // 可以同时持有多个共享锁
  console.log(`Shared lock acquired: ${lock.name}`);
});
```

```cjs
// 请求独占锁
navigator.locks.request('my_resource', async (lock) => {
  // 锁已获取。
  console.log(`Lock acquired: ${lock.name}`);
  // 函数返回时锁会自动释放
}).then(() => {
  console.log('Lock released');
});

// 请求共享锁
navigator.locks.request('shared_resource', { mode: 'shared' }, async (lock) => {
  // 可以同时持有多个共享锁
  console.log(`Shared lock acquired: ${lock.name}`);
}).then(() => {
  console.log('Shared lock released');
});
```

有关详细的 API 文档，请参阅 [`worker_threads.locks`][]。

### `navigator.platform`

<!-- YAML
added: v21.2.0
-->

* 类型：{string}

`navigator.platform` 只读属性返回一个字符串，标识
运行 Node.js 实例的平台。

```js
console.log(`This process is running on ${navigator.platform}`);
```

### `navigator.userAgent`

<!-- YAML
added: v21.1.0
-->

* 类型：{string}

`navigator.userAgent` 只读属性返回用户代理，
由运行时名称和主版本号组成。

```js
console.log(`The user-agent is ${navigator.userAgent}`); // 打印 "Node.js/21"
```

## `performance`

<!-- YAML
added: v16.0.0
-->

[`perf_hooks.performance`][] 对象。

## 类：`PerformanceEntry`

<!-- YAML
added: v19.0.0
-->

`PerformanceEntry` 类。有关更多详细信息，请参阅 [`PerformanceEntry`][]。

## 类：`PerformanceMark`

<!-- YAML
added: v19.0.0
-->

`PerformanceMark` 类。有关更多详细信息，请参阅 [`PerformanceMark`][]。

## 类：`PerformanceMeasure`

<!-- YAML
added: v19.0.0
-->

`PerformanceMeasure` 类。有关更多详细信息，请参阅 [`PerformanceMeasure`][]。

## 类：`PerformanceObserver`

<!-- YAML
added: v19.0.0
-->

`PerformanceObserver` 类。有关更多详细信息，请参阅 [`PerformanceObserver`][]。

## 类：`PerformanceObserverEntryList`

<!-- YAML
added: v19.0.0
-->

`PerformanceObserverEntryList` 类。详见 [`PerformanceObserverEntryList`][] 以获取更多详情。

## 类：`PerformanceResourceTiming`

<!-- YAML
added: v19.0.0
-->

`PerformanceResourceTiming` 类。详见 [`PerformanceResourceTiming`][] 以获取更多详情。

## `process`

<!-- YAML
added: v0.1.7
-->

* 类型：{Object}

`process` 对象。详见 [`process` 对象][] 部分。

## `queueMicrotask(callback)`

<!-- YAML
added: v11.0.0
-->

* `callback` {Function} 用于排队等待执行的函数。

`queueMicrotask()` 方法将一个微任务排队以调用 `callback`。如果 `callback` 抛出异常，将发出 [`process` 对象][] 的 `'uncaughtException'` 事件。

微任务队列由 V8 管理，其使用方式可能与由 Node.js 管理的 [`process.nextTick()`][] 队列类似。在 Node.js 事件循环的每一轮中，`process.nextTick()` 队列总是在微任务队列之前被处理。

```js
// 这里，`queueMicrotask()` 用于确保 'load' 事件总是
// 异步发出，因此保持一致。使用
// `process.nextTick()` 会导致 'load' 事件总是在
// 任何其他 Promise 作业之前发出。

DataHandler.prototype.load = async function load(key) {
  const hit = this._cache.get(key);
  if (hit !== undefined) {
    queueMicrotask(() => {
      this.emit('load', hit);
    });
    return;
  }

  const data = await fetchData(key);
  this._cache.set(key, data);
  this.emit('load', data);
};
```

## 类：`QuotaExceededError`

<!-- YAML
added: v26.0.0
-->

WHATWG {QuotaExceededError} 类。继承自 {DOMException}。

## 类：`ReadableByteStreamController`

<!-- YAML
added: v18.0.0
changes:
 - version:
    - v23.11.0
    - v22.15.0
   pr-url: https://github.com/nodejs/node/pull/57510
   description: 标记 API 为稳定。
-->

与浏览器兼容的 [`ReadableByteStreamController`][] 实现。

## 类：`ReadableStream`

<!-- YAML
added: v18.0.0
changes:
 - version:
    - v23.11.0
    - v22.15.0
   pr-url: https://github.com/nodejs/node/pull/57510
   description: 标记 API 为稳定。
-->

与浏览器兼容的 [`ReadableStream`][] 实现。

## 类：`ReadableStreamBYOBReader`

<!-- YAML
added: v18.0.0
changes:
- version:
  - v23.11.0
  - v22.15.0
  pr-url: https://github.com/nodejs/node/pull/57510
  description: 标记 API 为稳定。
-->

与浏览器兼容的 [`ReadableStreamBYOBReader`][] 实现。

## 类：`ReadableStreamBYOBRequest`

<!-- YAML
added: v18.0.0
changes:
 - version:
    - v23.11.0
    - v22.15.0
   pr-url: https://github.com/nodejs/node/pull/57510
   description: 标记 API 为稳定。
-->

与浏览器兼容的 [`ReadableStreamBYOBRequest`][] 实现。

## 类：`ReadableStreamDefaultController`

<!-- YAML
added: v18.0.0
changes:
 - version:
    - v23.11.0
    - v22.15.0
   pr-url: https://github.com/nodejs/node/pull/57510
   description: 标记 API 为稳定。
-->

与浏览器兼容的 [`ReadableStreamDefaultController`][] 实现。

## 类：`ReadableStreamDefaultReader`

<!-- YAML
added: v18.0.0
changes:
 - version:
    - v23.11.0
    - v22.15.0
   pr-url: https://github.com/nodejs/node/pull/57510
   description: 标记 API 为稳定。
-->

与浏览器兼容的 [`ReadableStreamDefaultReader`][] 实现。

## 类：`Request`

<!-- YAML
added:
  - v17.5.0
  - v16.15.0
changes:
  - version:
    - v21.0.0
    pr-url: https://github.com/nodejs/node/pull/45684
    description: 不再是实验性的。
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41811
    description: "不再位于 `--experimental-fetch` CLI 标志之后。"
-->

与浏览器兼容的 {Request} 实现。

## `require()`

此变量可能看起来是全局的，但并非如此。详见 [`require()`][]。

## 类：`Response`

<!-- YAML
added:
  - v17.5.0
  - v16.15.0
changes:
  - version:
    - v21.0.0
    pr-url: https://github.com/nodejs/node/pull/45684
    description: 不再是实验性的。
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41811
    description: "不再位于 `--experimental-fetch` CLI 标志之后。"
-->

与浏览器兼容的 {Response} 实现。

## `sessionStorage`

<!-- YAML
added: v22.4.0
changes:
  - version: v25.0.0
    pr-url: https://github.com/nodejs/node/pull/57666
    description: "此 API 不再位于 `--experimental-webstorage` 运行时标志之后。"
-->

> 稳定性：1.2 - 发布候选。使用 [`--no-experimental-webstorage`][] 禁用此 API。

与浏览器兼容的 [`sessionStorage`][] 实现。数据存储在内存中，存储配额为 10 MB。`sessionStorage` 数据仅在当前运行的进程内持久存在，且不在 worker 之间共享。

## `setImmediate(callback[, ...args])`

<!-- YAML
added: v0.9.1
-->

[`setImmediate`][] 在 [定时器][] 部分中描述。

## `setInterval(callback, delay[, ...args])`

<!-- YAML
added: v0.0.1
-->

[`setInterval`][] 在 [定时器][] 部分中描述。

## `setTimeout(callback, delay[, ...args])`

<!-- YAML
added: v0.0.1
-->

[`setTimeout`][] 在 [定时器][] 部分中描述。

## 类：`Storage`

<!-- YAML
added: v22.4.0
-->

> 稳定性：1.2 - 发布候选。使用 [`--no-experimental-webstorage`][] 禁用此 API。

与浏览器兼容的 {Storage} 实现。

## `structuredClone(value[, options])`

<!-- YAML
added: v17.0.0
-->

WHATWG 的 [`structuredClone`][] 方法。

## 类：`SubtleCrypto`

<!-- YAML
added:
  - v17.6.0
  - v16.15.0
changes:
  - version: v19.0.0
    pr-url: https://github.com/nodejs/node/pull/42083
    description: "不再位于 `--experimental-global-webcrypto` CLI 标志之后。"
-->

与浏览器兼容的 {SubtleCrypto} 实现。仅当 Node.js 二进制文件编译时包含对 `node:crypto` 模块的支持时，此全局变量才可用。

## 类：`TextDecoder`

<!-- YAML
added: v11.0.0
-->

WHATWG `TextDecoder` 类。详见 [`TextDecoder`][] 部分。

## 类：`TextDecoderStream`

<!-- YAML
added: v18.0.0
changes:
 - version:
    - v23.11.0
    - v22.15.0
   pr-url: https://github.com/nodejs/node/pull/57510
   description: 标记 API 为稳定。
-->

与浏览器兼容的 [`TextDecoderStream`][] 实现。

## 类：`TextEncoder`

<!-- YAML
added: v11.0.0
-->

WHATWG `TextEncoder` 类。详见 [`TextEncoder`][] 部分。

## 类：`TextEncoderStream`

<!-- YAML
added: v18.0.0
changes:
 - version:
    - v23.11.0
    - v22.15.0
   pr-url: https://github.com/nodejs/node/pull/57510
   description: 标记 API 为稳定。
-->

与浏览器兼容的 [`TextEncoderStream`][] 实现。

## 类：`TransformStream`

<!-- YAML
added: v18.0.0
changes:
 - version:
    - v23.11.0
    - v22.15.0
   pr-url: https://github.com/nodejs/node/pull/57510
   description: 标记 API 为稳定。
-->

与浏览器兼容的 [`TransformStream`][] 实现。

## 类：`TransformStreamDefaultController`

<!-- YAML
added: v18.0.0
changes:
 - version:
    - v23.11.0
    - v22.15.0
   pr-url: https://github.com/nodejs/node/pull/57510
   description: 标记 API 为稳定。
-->

与浏览器兼容的 [`TransformStreamDefaultController`][] 实现。

## 类：`URL`

<!-- YAML
added: v10.0.0
-->

WHATWG `URL` 类。详见 [`URL`][] 部分。

## 类：`URLPattern`

<!-- YAML
added: v24.0.0
-->

> 稳定性：1 - 实验性的

WHATWG `URLPattern` 类。详见 [`URLPattern`][] 部分。

## 类：`URLSearchParams`

<!-- YAML
added: v10.0.0
-->

WHATWG `URLSearchParams` 类。详见 [`URLSearchParams`][] 部分。

## 类：`WebAssembly`

<!-- YAML
added: v8.0.0
-->

* 类型：{Object}

作为所有 W3C [WebAssembly][webassembly-org] 相关功能命名空间的对象。用法和兼容性请参阅 [Mozilla 开发者网络][webassembly-mdn]。

## 类：`WebSocket`

<!-- YAML
added:
  - v21.0.0
  - v20.10.0
changes:
  - version: v22.4.0
    pr-url: https://github.com/nodejs/node/pull/53352
    description: 不再是实验性的。
  - version: v22.0.0
    pr-url: https://github.com/nodejs/node/pull/51594
    description: "不再位于 `--experimental-websocket` CLI 标志之后。"
-->

与浏览器兼容的 {WebSocket} 实现。使用 [`--no-experimental-websocket`][] CLI 标志禁用此 API。

## 类：`WritableStream`

<!-- YAML
added: v18.0.0
changes:
 - version:
    - v23.11.0
    - v22.15.0
   pr-url: https://github.com/nodejs/node/pull/57510
   description: 标记 API 为稳定。
-->

与浏览器兼容的 [`WritableStream`][] 实现。

## 类：`WritableStreamDefaultController`

<!-- YAML
added: v18.0.0
changes:
 - version:
    - v23.11.0
    - v22.15.0
   pr-url: https://github.com/nodejs/node/pull/57510
   description: 标记 API 为稳定。
-->

与浏览器兼容的 [`WritableStreamDefaultController`][] 实现。

## 类：`WritableStreamDefaultWriter`

<!-- YAML
added: v18.0.0
changes:
 - version:
    - v23.11.0
    - v22.15.0
   pr-url: https://github.com/nodejs/node/pull/57510
   description: 标记 API 为稳定。
-->

与浏览器兼容的 [`WritableStreamDefaultWriter`][] 实现。

[CommonJS 模块]: modules.md
[CommonJS 模块]: modules.md
[ECMAScript 模块]: esm.md
[Navigator API]: https://html.spec.whatwg.org/multipage/system-state.html#the-navigator-object
[RFC 5646]: https://www.rfc-editor.org/rfc/rfc5646.txt
[Web Crypto API]: webcrypto.md
[`--experimental-eventsource`]: cli.md#--experimental-eventsource
[`--localstorage-file`]: cli.md#--localstorage-filefile
[`--no-experimental-global-navigator`]: cli.md#--no-experimental-global-navigator
[`--no-experimental-websocket`]: cli.md#--no-experimental-websocket
[`--no-experimental-webstorage`]: cli.md#--no-experimental-webstorage
[`ByteLengthQueuingStrategy`]: webstreams.md#class-bytelengthqueuingstrategy
[`CompressionStream`]: webstreams.md#class-compressionstream
[`CountQueuingStrategy`]: webstreams.md#class-countqueuingstrategy
[`DecompressionStream`]: webstreams.md#class-decompressionstream
[`EventTarget` 和 `Event` API]: events.md#eventtarget-and-event-api
[`FormData`]: #class-formdata
[`Headers`]: #class-headers
[`LockManager`]: worker_threads.md#class-lockmanager
[`MessageChannel`]: worker_threads.md#class-messagechannel
[`MessagePort`]: worker_threads.md#class-messageport
[`PerformanceEntry`]: perf_hooks.md#class-performanceentry
[`PerformanceMark`]: perf_hooks.md#class-performancemark
[`PerformanceMeasure`]: perf_hooks.md#class-performancemeasure
[`PerformanceObserverEntryList`]: perf_hooks.md#class-performanceobserverentrylist
[`PerformanceObserver`]: perf_hooks.md#class-performanceobserver
[`PerformanceResourceTiming`]: perf_hooks.md#class-performanceresourcetiming
[`ReadableByteStreamController`]: webstreams.md#class-readablebytestreamcontroller
[`ReadableStreamBYOBReader`]: webstreams.md#class-readablestreambyobreader
[`ReadableStreamBYOBRequest`]: webstreams.md#class-readablestreambyobrequest
[`ReadableStreamDefaultController`]: webstreams.md#class-readablestreamdefaultcontroller
[`ReadableStreamDefaultReader`]: webstreams.md#class-readablestreamdefaultreader
[`ReadableStream`]: webstreams.md#class-readablestream
[`Request`]: #class-request
[`Response`]: #class-response
[`TextDecoderStream`]: webstreams.md#class-textdecoderstream
[`TextDecoder`]: util.md#class-utiltextdecoder
[`TextEncoderStream`]: webstreams.md#class-textencoderstream
[`TextEncoder`]: util.md#class-utiltextencoder
[`TransformStreamDefaultController`]: webstreams.md#class-transformstreamdefaultcontroller
[`TransformStream`]: webstreams.md#class-transformstream
[`URLPattern`]: url.md#class-urlpattern
[`URLSearchParams`]: url.md#class-urlsearchparams
[`URL`]: url.md#class-url
[`WritableStreamDefaultController`]: webstreams.md#class-writablestreamdefaultcontroller
[`WritableStreamDefaultWriter`]: webstreams.md#class-writablestreamdefaultwriter
[`WritableStream`]: webstreams.md#class-writablestream
[`__dirname`]: modules.md#__dirname
[`__filename`]: modules.md#__filename
[`abortSignal.reason`]: #abortsignalreason
[`buffer.atob()`]: buffer.md#bufferatobdata
[`buffer.btoa()`]: buffer.md#bufferbtoadata
[`clearImmediate`]: timers.md#clearimmediateimmediate
[`clearInterval`]: timers.md#clearintervaltimeout
[`clearTimeout`]: timers.md#cleartimeouttimeout
[`console`]: console.md
[`exports`]: modules.md#exports
[`fetch()`]: https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch
[`globalThis`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis
[`localStorage`]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[`module`]: modules.md#module
[`perf_hooks.performance`]: perf_hooks.md#perf_hooksperformance
[`process.nextTick()`]: process.md#processnexttickcallback-args
[`process` 对象]: process.md#process
[`require()`]: modules.md#requireid
[`sessionStorage`]: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
[`setImmediate`]: timers.md#setimmediatecallback-args
[`setInterval`]: timers.md#setintervalcallback-delay-args
[`setTimeout`]: timers.md#settimeoutcallback-delay-args
[`structuredClone`]: https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone
[`window.navigator`]: https://developer.mozilla.org/en-US/docs/Web/API/Window/navigator
[`worker_threads.locks`]: worker_threads.md#worker_threadslocks
[browser `LockManager`]: https://developer.mozilla.org/en-US/docs/Web/API/LockManager
[buffer 部分]: buffer.md
[内置对象]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
[定时器]: timers.md
[webassembly-mdn]: https://developer.mozilla.org/en-US/docs/WebAssembly
[webassembly-org]: https://webassembly.org
