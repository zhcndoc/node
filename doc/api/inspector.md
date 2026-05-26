# 检查器

<!--introduced_in=v8.0.0-->

> 稳定性：2 - 稳定

<!-- source_link=lib/inspector.js -->

`node:inspector` 模块提供了一个与 V8 检查器交互的 API。

可以通过以下方式访问：

```mjs
import * as inspector from 'node:inspector/promises';
```

```cjs
const inspector = require('node:inspector/promises');
```

或

```mjs
import * as inspector from 'node:inspector';
```

```cjs
const inspector = require('node:inspector');
```

## Promise 接口

<!-- YAML
added: v19.0.0
-->

> 稳定性：1 - 实验性

### 类：`inspector.Session`

* 继承：{EventEmitter}

`inspector.Session` 用于向 V8 检查器后端发送消息并接收消息响应和通知。

#### `new inspector.Session()`

<!-- YAML
added: v8.0.0
-->

创建 `inspector.Session` 类的新实例。检查器会话需要通过 [`session.connect()`][] 连接后，才能将消息发送到检查器后端。

使用 `Session` 时，除非我们手动执行了 `Runtime.DiscardConsoleEntries` 命令，否则 console API 输出的对象不会被释放。

#### 事件：`'inspectorNotification'`

<!-- YAML
added: v8.0.0
-->

* 类型：{Object} 通知消息对象

当收到来自 V8 检查器的任何通知时触发。

```js
session.on('inspectorNotification', (message) => console.log(message.method));
// Debugger.paused
// Debugger.resumed
```

> **注意** 不建议在同线程会话中使用断点，请参阅 [断点支持][]。

也可以只订阅具有特定方法的通知：

#### 事件：`<inspector-protocol-method>`

<!-- YAML
added: v8.0.0
-->

* 类型：{Object} 通知消息对象

当收到方法字段设置为 `<inspector-protocol-method>` 值的检查器通知时触发。

以下代码片段在 [`'Debugger.paused'`][] 事件上安装了一个监听器，并在程序执行暂停时（例如通过断点）打印程序暂停的原因：

```js
session.on('Debugger.paused', ({ params }) => {
  console.log(params.hitBreakpoints);
});
// [ '/the/file/that/has/the/breakpoint.js:11:0' ]
```

> **注意** 不建议在同线程会话中使用断点，请参阅 [断点支持][]。

#### `session.connect()`

<!-- YAML
added: v8.0.0
-->

将会话连接到检查器后端。

#### `session.connectToMainThread()`

<!-- YAML
added: v12.11.0
-->

将会话连接到主线程检查器后端。如果未在工作线程上调用此 API，将抛出异常。

#### `session.disconnect()`

<!-- YAML
added: v8.0.0
-->

立即关闭会话。所有待处理的消息回调都将带有错误被调用。需要再次调用 [`session.connect()`][] 才能发送消息。重新连接的会话将丢失所有检查器状态，例如启用的代理或配置的断点。

#### `session.post(method[, params])`

<!-- YAML
added: v19.0.0
-->

* `method` {string}
* `params` {Object}
* 返回：{Promise}

向检查器后端发送消息。

```mjs
import { Session } from 'node:inspector/promises';
try {
  const session = new Session();
  session.connect();
  const result = await session.post('Runtime.evaluate', { expression: '2 + 2' });
  console.log(result);
} catch (error) {
  console.error(error);
}
// 输出：{ result: { type: 'number', value: 4, description: '4' } }
```

最新版本的 V8 检查器协议发布在 [Chrome DevTools 协议查看器][] 上。

Node.js 检查器支持 V8 声明的所有 Chrome DevTools 协议域。Chrome DevTools 协议域提供了一个接口，用于与用于检查应用程序状态和监听运行时事件的运行时代理之一进行交互。

#### 示例用法

除了调试器之外，还可以通过 DevTools 协议使用各种 V8 性能分析器。

##### CPU 性能分析器

这是一个展示如何使用 [CPU 性能分析器][] 的示例：

```mjs
import { Session } from 'node:inspector/promises';
import fs from 'node:fs';
const session = new Session();
session.connect();

await session.post('Profiler.enable');
await session.post('Profiler.start');
// 在此处调用待测量的业务逻辑...

// 一段时间后...
const { profile } = await session.post('Profiler.stop');

// 将性能分析文件写入磁盘、上传等。
fs.writeFileSync('./profile.cpuprofile', JSON.stringify(profile));
```

##### 堆性能分析器

这是一个展示如何使用 [堆性能分析器][] 的示例：

```mjs
import { Session } from 'node:inspector/promises';
import fs from 'node:fs';
const session = new Session();

const fd = fs.openSync('profile.heapsnapshot', 'w');

session.connect();

session.on('HeapProfiler.addHeapSnapshotChunk', (m) => {
  fs.writeSync(fd, m.params.chunk);
});

const result = await session.post('HeapProfiler.takeHeapSnapshot', null);
console.log('HeapProfiler.takeHeapSnapshot done:', result);
session.disconnect();
fs.closeSync(fd);
```

## 回调接口

### 类：`inspector.Session`

* 继承：{EventEmitter}

`inspector.Session` 用于向 V8 检查器后端发送消息并接收消息响应和通知。

#### `new inspector.Session()`

<!-- YAML
added: v8.0.0
-->

创建 `inspector.Session` 类的新实例。检查器会话需要通过 [`session.connect()`][] 连接后，才能将消息发送到检查器后端。

使用 `Session` 时，除非我们手动执行了 `Runtime.DiscardConsoleEntries` 命令，否则 console API 输出的对象不会被释放。

#### 事件：`'inspectorNotification'`

<!-- YAML
added: v8.0.0
-->

* 类型：{Object} 通知消息对象

当收到来自 V8 检查器的任何通知时触发。

```js
session.on('inspectorNotification', (message) => console.log(message.method));
// Debugger.paused
// Debugger.resumed
```

> **注意** 不建议在同线程会话中使用断点，请参阅 [断点支持][]。

也可以只订阅具有特定方法的通知：

#### 事件：`<inspector-protocol-method>`;

<!-- YAML
added: v8.0.0
-->

* 类型：{Object} 通知消息对象

当收到方法字段设置为 `<inspector-protocol-method>` 值的检查器通知时触发。

以下代码片段在 [`'Debugger.paused'`][] 事件上安装了一个监听器，并在程序执行暂停时（例如通过断点）打印程序暂停的原因：

```js
session.on('Debugger.paused', ({ params }) => {
  console.log(params.hitBreakpoints);
});
// [ '/the/file/that/has/the/breakpoint.js:11:0' ]
```

> **注意** 不建议在同线程会话中使用断点，请参阅 [断点支持][]。

#### `session.connect()`

<!-- YAML
added: v8.0.0
-->

将会话连接到检查器后端。

#### `session.connectToMainThread()`

<!-- YAML
added: v12.11.0
-->

将会话连接到主线程检查器后端。如果未在工作线程上调用此 API，将抛出异常。

#### `session.disconnect()`

<!-- YAML
added: v8.0.0
-->

立即关闭会话。所有待处理的消息回调都将带有错误被调用。需要再次调用 [`session.connect()`][] 才能发送消息。重新连接的会话将丢失所有检查器状态，例如启用的代理或配置的断点。

#### `session.post(method[, params][, callback])`

<!-- YAML
added: v8.0.0
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "向 `callback` 参数传递无效的回调现在会抛出 `ERR_INVALID_ARG_TYPE` 而不是 `ERR_INVALID_CALLBACK`。"
-->

* `method` {string}
* `params` {Object}
* `callback` {Function}

向检查器后端发送消息。收到响应时将通知 `callback`。`callback` 是一个接受两个可选参数的函数：错误和特定于消息的结果。

```js
session.post('Runtime.evaluate', { expression: '2 + 2' },
             (error, { result }) => console.log(result));
// 输出：{ type: 'number', value: 4, description: '4' }
```

最新版本的 V8 检查器协议发布在 [Chrome DevTools 协议查看器][] 上。

Node.js 检查器支持 V8 声明的所有 Chrome DevTools 协议域。Chrome DevTools 协议域提供了一个接口，用于与用于检查应用程序状态和监听运行时事件的运行时代理之一进行交互。

向 V8 发送 `HeapProfiler.takeHeapSnapshot` 或 `HeapProfiler.stopTrackingHeapObjects` 命令时，不能将 `reportProgress` 设置为 `true`。

#### 示例用法

除了调试器之外，还可以通过 DevTools 协议使用各种 V8 性能分析器。

##### CPU 性能分析器

这是一个展示如何使用 [CPU 性能分析器][] 的示例：

```js
const inspector = require('node:inspector');
const fs = require('node:fs');
const session = new inspector.Session();
session.connect();

session.post('Profiler.enable', () => {
  session.post('Profiler.start', () => {
    // 在此处调用待测量的业务逻辑...

    // 一段时间后...
    session.post('Profiler.stop', (err, { profile }) => {
      // 将性能分析文件写入磁盘、上传等。
      if (!err) {
        fs.writeFileSync('./profile.cpuprofile', JSON.stringify(profile));
      }
    });
  });
});
```

##### 堆性能分析器

这是一个展示如何使用 [堆性能分析器][] 的示例：

```js
const inspector = require('node:inspector');
const fs = require('node:fs');
const session = new inspector.Session();

const fd = fs.openSync('profile.heapsnapshot', 'w');

session.connect();

session.on('HeapProfiler.addHeapSnapshotChunk', (m) => {
  fs.writeSync(fd, m.params.chunk);
});

session.post('HeapProfiler.takeHeapSnapshot', null, (err, r) => {
  console.log('HeapProfiler.takeHeapSnapshot done:', err, r);
  session.disconnect();
  fs.closeSync(fd);
});
```

## 常用对象

### `inspector.close()`

<!-- YAML
added: v9.0.0
changes:
  - version: v18.10.0
    pr-url: https://github.com/nodejs/node/pull/44489
    description: 该 API 在工作线程中暴露。
-->

尝试关闭所有剩余的连接，阻塞事件循环直到所有连接关闭。一旦所有连接关闭，停用检查器。

### `inspector.console`

* 类型：{Object} 一个用于向远程检查器控制台发送消息的对象。

```js
require('node:inspector').console.log('a message');
```

检查器控制台与 Node.js console 没有 API 一致性。

### `inspector.open([port[, host[, wait]]])`

<!-- YAML
changes:
  - version: v20.6.0
    pr-url: https://github.com/nodejs/node/pull/48765
    description: "inspector.open() 现在返回一个 `Disposable` 对象。"
-->

* `port` {number} 用于监听检查器连接的端口。可选。
  **默认值：** 命令行中指定的值。
* `host` {string} 用于监听检查器连接的主机。可选。
  **默认值：** 命令行中指定的值。
* `wait` {boolean} 阻塞直到客户端连接。可选。
  **默认值：** `false`。
* 返回：{Disposable} 一个调用 [`inspector.close()`][] 的 Disposable。

在主机和端口上激活检查器。相当于 `node --inspect=[[host:]port]`，但可以在 Node 启动后以编程方式完成。

如果 wait 为 `true`，将阻塞直到客户端连接到检查端口并将控制权传递给调试器客户端。

请参阅关于 `host` 参数用法的 [安全警告][]。

### `inspector.url()`

* 返回：{string|undefined}

返回活动检查器的 URL，如果没有则返回 `undefined`。

```console
$ node --inspect -p 'inspector.url()'
Debugger listening on ws://127.0.0.1:9229/166e272e-7a30-4d09-97ce-f1c012b43c34
如需帮助，请参阅：https://nodejs.org/learn/getting-started/debugging
ws://127.0.0.1:9229/166e272e-7a30-4d09-97ce-f1c012b43c34

$ node --inspect=localhost:3000 -p 'inspector.url()'
Debugger listening on ws://localhost:3000/51cf8d0e-3c36-4c59-8efd-54519839e56a
如需帮助，请参阅：https://nodejs.org/learn/getting-started/debugging
ws://localhost:3000/51cf8d0e-3c36-4c59-8efd-54519839e56a

$ node -p 'inspector.url()'
undefined
```

### `inspector.waitForDebugger()`

<!-- YAML
added: v12.7.0
-->

阻塞直到客户端（现有或稍后连接的）发送了 `Runtime.runIfWaitingForDebugger` 命令。

如果没有活动的检查器，将抛出异常。

## 与 DevTools 集成

> 稳定性：1.1 - 积极开发中

`node:inspector` 模块提供了一个 API，用于与支持 Chrome DevTools 协议的开发者工具集成。
连接到运行中 Node.js 实例的 DevTools 前端可以捕获实例发出的协议事件并相应地显示它们以促进调试。
以下方法将协议事件广播到所有连接的前端。
传递给方法的 `params` 可以是可选的，具体取决于协议。

```js
// 将触发 Network.requestWillBeSent 事件。
inspector.Network.requestWillBeSent({
  requestId: 'request-id-1',
  timestamp: Date.now() / 1000,
  wallTime: Date.now(),
  request: {
    url: 'https://nodejs.org/en',
    method: 'GET',
  },
});
```

### `inspector.Network.dataReceived([params])`

<!-- YAML
added:
 - v24.2.0
 - v22.17.0
-->

* `params` {Object}

此功能仅在启用 `--experimental-network-inspection` 标志时可用。

将 `Network.dataReceived` 事件广播到连接的前端，如果尚未针对给定请求调用 `Network.streamResourceContent` 命令，则缓冲数据。

同时启用 `Network.getResponseBody` 命令以检索响应数据。

### `inspector.Network.dataSent([params])`

<!-- YAML
added:
  - v24.3.0
  - v22.18.0
-->

* `params` {Object}

此功能仅在启用 `--experimental-network-inspection` 标志时可用。

启用 `Network.getRequestPostData` 命令以检索请求数据。

### `inspector.Network.requestWillBeSent([params])`

<!-- YAML
added:
 - v22.6.0
 - v20.18.0
-->

* `params` {Object}

此功能仅在启用 `--experimental-network-inspection` 标志时可用。

将 `Network.requestWillBeSent` 事件广播到连接的前端。此事件表明应用程序即将发送 HTTP 请求。

### `inspector.Network.responseReceived([params])`

<!-- YAML
added:
 - v22.6.0
 - v20.18.0
-->

* `params` {Object}

此功能仅在启用 `--experimental-network-inspection` 标志时可用。

将 `Network.responseReceived` 事件广播到连接的前端。此事件表明 HTTP 响应可用。

### `inspector.Network.loadingFinished([params])`

<!-- YAML
added:
 - v22.6.0
 - v20.18.0
-->

* `params` {Object}

此功能仅在启用 `--experimental-network-inspection` 标志时可用。

将 `Network.loadingFinished` 事件广播到连接的前端。此事件表明 HTTP 请求已完成加载。

### `inspector.Network.loadingFailed([params])`

<!-- YAML
added:
 - v22.7.0
 - v20.18.0
-->

* `params` {Object}

此功能仅在启用 `--experimental-network-inspection` 标志时可用。

将 `Network.loadingFailed` 事件广播到连接的前端。此事件表明 HTTP 请求加载失败。

### `inspector.Network.webSocketCreated([params])`

<!-- YAML
added:
  - v24.7.0
-->

* `params` {Object}

此功能仅在启用 `--experimental-network-inspection` 标志时可用。

将 `Network.webSocketCreated` 事件广播到连接的前端。此事件表明 WebSocket 连接已发起。

### `inspector.Network.webSocketHandshakeResponseReceived([params])`

<!-- YAML
added:
  - v24.7.0
-->

* `params` {Object}

此功能仅在启用 `--experimental-network-inspection` 标志时可用。

将 `Network.webSocketHandshakeResponseReceived` 事件广播到连接的前端。
此事件表明 WebSocket 握手响应已接收。

### `inspector.Network.webSocketClosed([params])`

<!-- YAML
added:
  - v24.7.0
-->

* `params` {Object}

此功能仅在启用 `--experimental-network-inspection` 标志时可用。

将 `Network.webSocketClosed` 事件广播到连接的前端。
此事件表明 WebSocket 连接已关闭。

### `inspector.NetworkResources.put`

<!-- YAML
added:
  - v24.5.0
  - v22.19.0
-->

> 稳定性：1.1 - 积极开发中

此功能仅在启用 `--experimental-inspector-network-resource` 标志时可用。

inspector.NetworkResources.put 方法用于为通过 Chrome DevTools 协议 (CDP) 发出的 loadNetworkResource 请求提供响应。
这通常在指定源映射的 URL 时触发，并且 DevTools 前端（如 Chrome）请求资源以检索源映射。

此方法允许开发者预定义资源内容以响应此类 CDP 请求。

```js
const inspector = require('node:inspector');
// 通过预先调用 put 注册资源，当
// 前端发出 loadNetworkResource 请求时可以解析源映射。
async function setNetworkResources() {
  const mapUrl = 'http://localhost:3000/dist/app.js.map';
  const tsUrl = 'http://localhost:3000/src/app.ts';
  const distAppJsMap = await fetch(mapUrl).then((res) => res.text());
  const srcAppTs = await fetch(tsUrl).then((res) => res.text());
  inspector.NetworkResources.put(mapUrl, distAppJsMap);
  inspector.NetworkResources.put(tsUrl, srcAppTs);
};
setNetworkResources().then(() => {
  require('./dist/app');
});
```

更多详情，请参阅官方 CDP 文档：[Network.loadNetworkResource](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-loadNetworkResource)

### `inspector.DOMStorage.domStorageItemAdded`

<!-- YAML
added:
  - v25.5.0
  - v24.16.0
-->

* `params` {Object}
  * `storageId` {Object}
    * `securityOrigin` {string}
    * `storageKey` {string}
    * `isLocalStorage` {boolean}
  * `key` {string}
  * `newValue` {string}

此功能仅在启用
`--experimental-storage-inspection` 标志时可用。

将 `DOMStorage.domStorageItemAdded` 事件广播到连接的前端。
此事件表明一个新项已添加到存储中。

### `inspector.DOMStorage.domStorageItemRemoved`

<!-- YAML
added:
  - v25.5.0
  - v24.16.0
-->

* `params` {Object}
  * `storageId` {Object}
    * `securityOrigin` {string}
    * `storageKey` {string}
    * `isLocalStorage` {boolean}
  * `key` {string}

此功能仅在启用
`--experimental-storage-inspection` 标志时可用。

将 `DOMStorage.domStorageItemRemoved` 事件广播到连接的前端。
此事件表明一个项已从存储中移除。

### `inspector.DOMStorage.domStorageItemUpdated`

<!-- YAML
added:
  - v25.5.0
  - v24.16.0
-->

* `params` {Object}
  * `storageId` {Object}
    * `securityOrigin` {string}
    * `storageKey` {string}
    * `isLocalStorage` {boolean}
  * `key` {string}
  * `oldValue` {string}
  * `newValue` {string}

此功能仅在启用
`--experimental-storage-inspection` 标志时可用。

将 `DOMStorage.domStorageItemUpdated` 事件广播到连接的前端。
此事件表明一个存储项已更新。

### `inspector.DOMStorage.domStorageItemsCleared`

<!-- YAML
added:
  - v25.5.0
  - v24.16.0
-->

* `params` {Object}
  * `storageId` {Object}
    * `securityOrigin` {string}
    * `storageKey` {string}
    * `isLocalStorage` {boolean}

此功能仅在启用
`--experimental-storage-inspection` 标志时可用。

将 `DOMStorage.domStorageItemsCleared` 事件广播到连接
的前端。此事件表明所有项已从存储中清除。

### `inspector.DOMStorage.registerStorage`

<!-- YAML
added:
  - v25.5.0
  - v24.16.0
-->

* `params` {Object}
  * `isLocalStorage` {boolean}
  * `storageMap` {Object}

此功能仅在启用
`--experimental-storage-inspection` 标志时可用。

## 断点支持

Chrome DevTools Protocol 的 [`Debugger` 域][] 允许一个
`inspector.Session` 附加到程序并设置断点以逐步执行
代码。

然而，应避免使用通过 [`session.connect()`][] 连接的同线程 `inspector.Session` 设置断点，因为被附加并暂停的程序正是调试器本身。相反，请尝试通过 [`session.connectToMainThread()`][] 连接到主线程，并在 worker 线程中设置断点，或者通过 WebSocket 连接与 [调试器][] 程序建立连接。

[CPU 性能分析器]: https://chromedevtools.github.io/devtools-protocol/v8/Profiler
[Chrome DevTools Protocol 查看器]: https://chromedevtools.github.io/devtools-protocol/v8/
[调试器]: debugger.md
[堆性能分析器]: https://chromedevtools.github.io/devtools-protocol/v8/HeapProfiler
[`'Debugger.paused'`]: https://chromedevtools.github.io/devtools-protocol/v8/Debugger#event-paused
[`Debugger` 域]: https://chromedevtools.github.io/devtools-protocol/v8/Debugger
[`inspector.close()`]: #inspectorclose
[`session.connect()`]: #sessionconnect
[`session.connectToMainThread()`]: #sessionconnecttomainthread
[安全警告]: cli.md#warning-binding-inspector-to-a-public-ipport-combination-is-insecure
[断点支持]: #support-of-breakpoints
