# UDP/数据报套接字

<!--introduced_in=v0.10.0-->

> 稳定性：2 - 稳定

<!-- name=dgram -->

<!-- source_link=lib/dgram.js -->

`node:dgram` 模块提供了 UDP 数据报套接字的实现。

```mjs
import dgram from 'node:dgram';

const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.error(`服务器错误：\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`服务器收到：${msg} 来自 ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
  const address = server.address();
  console.log(`服务器正在监听 ${address.address}:${address.port}`);
});

server.bind(41234);
// 输出：服务器正在监听 0.0.0.0:41234
```

```cjs
const dgram = require('node:dgram');
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.error(`服务器错误：\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`服务器收到：${msg} 来自 ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
  const address = server.address();
  console.log(`服务器正在监听 ${address.address}:${address.port}`);
});

server.bind(41234);
// 输出：服务器正在监听 0.0.0.0:41234
```

## 类：`dgram.Socket`

<!-- YAML
added: v0.1.99
-->

* 继承：{EventEmitter}

封装了数据报功能。

`dgram.Socket` 的新实例使用 [`dgram.createSocket()`][] 创建。
不应使用 `new` 关键字来创建 `dgram.Socket` 实例。

### 事件：`'close'`

<!-- YAML
added: v0.1.99
-->

当套接字被 [`close()`][] 关闭后，会发出 `'close'` 事件。
一旦触发，此套接字上将不再发出新的 `'message'` 事件。

### 事件：`'connect'`

<!-- YAML
added: v12.0.0
-->

当套接字因成功调用 [`connect()`][] 而关联到远程地址后，会发出 `'connect'` 事件。

### 事件：`'error'`

<!-- YAML
added: v0.1.99
-->

* `exception` {Error}

每当发生任何错误时，都会发出 `'error'` 事件。事件处理函数会被传入一个 `Error` 对象。

### 事件：`'listening'`

<!-- YAML
added: v0.1.99
-->

一旦 `dgram.Socket` 可寻址并能接收数据，就会发出 `'listening'` 事件。
这可以通过显式调用 `socket.bind()` 发生，或者在使用 `socket.send()` 首次发送数据时隐式发生。
在 `dgram.Socket` 监听之前，底层系统资源不存在，诸如 `socket.address()` 和 `socket.setTTL()` 之类的调用将失败。

### 事件：`'message'`

<!-- YAML
added: v0.1.99
changes:
  - version: v18.4.0
    pr-url: https://github.com/nodejs/node/pull/43054
    description: family 属性现在返回字符串而不是数字。
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41431
    description: family 属性现在返回数字而不是字符串。
-->

当套接字上有新的数据报可用时，会发出 `'message'` 事件。
事件处理函数会被传入两个参数：`msg` 和 `rinfo`。

* `msg` {Buffer} 消息。
* `rinfo` {Object} 远程地址信息。
  * `address` {string} 发送者地址。
  * `family` {string} 地址族（`'IPv4'` 或 `'IPv6'`）。
  * `port` {number} 发送者端口。
  * `size` {number} 消息大小。

如果传入数据包的源地址是 IPv6 链路本地地址，则接口名称会被添加到 `address` 中。
例如，在 `en0` 接口上接收到的数据包的地址字段可能设置为 `'fe80::2618:1234:ab11:3b9c%en0'`，其中 `'%en0'` 是作为区域 ID 后缀的接口名称。

### `socket.addMembership(multicastAddress[, multicastInterface])`

<!-- YAML
added: v0.6.9
-->

* `multicastAddress` {string}
* `multicastInterface` {string}

告知内核使用 `IP_ADD_MEMBERSHIP` 套接字选项加入位于给定 `multicastAddress` 和 `multicastInterface` 的多播组。
如果未指定 `multicastInterface` 参数，操作系统将选择一个接口，并将成员资格添加到该接口。
要将成员资格添加到每个可用接口，请多次调用 `addMembership`，每个接口调用一次。

当在未绑定的套接字上调用时，此方法将隐式绑定到随机端口，并监听所有接口。

当在多个 `cluster` 工作进程之间共享 UDP 套接字时，`socket.addMembership()` 函数只能调用一次，否则将发生 `EADDRINUSE` 错误：

```mjs
import cluster from 'node:cluster';
import dgram from 'node:dgram';

if (cluster.isPrimary) {
  cluster.fork(); // 正常工作。
  cluster.fork(); // 失败，抛出 EADDRINUSE。
} else {
  const s = dgram.createSocket('udp4');
  s.bind(1234, () => {
    s.addMembership('224.0.0.114');
  });
}
```

```cjs
const cluster = require('node:cluster');
const dgram = require('node:dgram');

if (cluster.isPrimary) {
  cluster.fork(); // 正常工作。
  cluster.fork(); // 失败，抛出 EADDRINUSE。
} else {
  const s = dgram.createSocket('udp4');
  s.bind(1234, () => {
    s.addMembership('224.0.0.114');
  });
}
```

### `socket.addSourceSpecificMembership(sourceAddress, groupAddress[, multicastInterface])`

<!-- YAML
added:
 - v13.1.0
 - v12.16.0
-->

* `sourceAddress` {string}
* `groupAddress` {string}
* `multicastInterface` {string}

使用 `multicastInterface` 和 `IP_ADD_SOURCE_MEMBERSHIP` 套接字选项，告知内核加入给定 `sourceAddress` 和 `groupAddress` 上的特定源多播通道。  
如果未指定 `multicastInterface` 参数，操作系统将选择一个接口，并将成员关系添加到该接口。  
要将成员关系添加到每个可用接口，请多次调用 `socket.addSourceSpecificMembership()`，每个接口调用一次。

在未绑定的套接字上调用时，此方法会隐式绑定到一个随机端口，并监听所有接口。

### `socket.address()`

<!-- YAML
added: v0.1.99
-->

* 返回：{Object}

返回一个包含套接字地址信息的对象。
对于 UDP 套接字，此对象将包含 `address`、`family` 和 `port` 属性。

如果在未绑定的套接字上调用此方法，将抛出 `EBADF`。

### `socket.bind([port][, address][, callback])`

<!-- YAML
added: v0.1.99
changes:
  - version: v0.9.1
    commit: 332fea5ac1816e498030109c4211bca24a7fa667
    description: 该方法已更改为异步执行模型。旧代码需要更改为向方法调用传递回调函数。
-->

* `port` {integer}
* `address` {string}
* `callback` {Function} 无参数。绑定完成时调用。

对于 UDP 套接字，使 `dgram.Socket` 在指定的 `port` 和可选的 `address` 上监听数据报消息。
如果未指定 `port` 或为 `0`，操作系统将尝试绑定到随机端口。
如果未指定 `address`，操作系统将尝试监听所有地址。
绑定完成后，会发出 `'listening'` 事件并调用可选的 `callback` 函数。

同时指定 `'listening'` 事件监听器并向 `socket.bind()` 方法传递 `callback` 并无害处，但用处不大。

绑定的数据报套接字会保持 Node.js 进程运行以接收数据报消息。

如果绑定失败，则会生成一个 `'error'` 事件。在极少数情况下（例如，尝试使用已关闭的套接字进行绑定），可能会抛出一个 [`Error`][]。

监听端口 41234 的 UDP 服务器示例：

```mjs
import dgram from 'node:dgram';

const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.error(`服务器错误：\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`服务器收到：${msg} 来自 ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
  const address = server.address();
  console.log(`服务器监听 ${address.address}:${address.port}`);
});

server.bind(41234);
// 输出：服务器监听 0.0.0.0:41234
```

```cjs
const dgram = require('node:dgram');
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.error(`服务器错误：\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`服务器收到：${msg} 来自 ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
  const address = server.address();
  console.log(`服务器监听 ${address.address}:${address.port}`);
});

server.bind(41234);
// 输出：服务器监听 0.0.0.0:41234
```

### `socket.bind(options[, callback])`

<!-- YAML
added: v0.11.14
-->

* `options` {Object} 必需。支持以下属性：
  * `port` {integer}
  * `address` {string}
  * `exclusive` {boolean}
  * `fd` {integer}
* `callback` {Function}

对于 UDP 套接字，使 `dgram.Socket` 在作为第一个参数传入的 `options` 对象的属性中指定的 `port` 和可选 `address` 上监听数据报消息。
如果未指定 `port` 或为 `0`，操作系统将尝试绑定到随机端口。
如果未指定 `address`，操作系统将尝试监听所有地址。
绑定完成后，会发出 `'listening'` 事件并调用可选的 `callback` 函数。

`options` 对象可能包含一个 `fd` 属性。
当设置大于 `0` 的 `fd` 时，它将包装具有给定文件描述符的现有套接字。
在这种情况下，`port` 和 `address` 属性将被忽略。

同时指定 `'listening'` 事件监听器并向 `socket.bind()` 方法传递 `callback` 并无害处，但用处不大。

`options` 对象可能包含一个额外的 `exclusive` 属性，该属性在与 [`cluster`][] 模块一起使用 `dgram.Socket` 对象时使用。
当 `exclusive` 设置为 `false`（默认值）时，集群工作进程将使用相同的底层套接字句柄，允许共享连接处理任务。
然而，当 `exclusive` 为 `true` 时，句柄不共享，尝试共享端口会导致错误。
创建 `dgram.Socket` 时将 `reusePort` 选项设置为 `true` 会导致调用 `socket.bind()` 时 `exclusive` 始终为 `true`。

绑定的数据报套接字会保持 Node.js 进程运行以接收数据报消息。

如果绑定失败，则会生成一个 `'error'` 事件。在极少数情况下（例如，尝试使用已关闭的套接字进行绑定），可能会抛出一个 [`Error`][]。

下面展示了一个监听独占端口的套接字示例。

```js
socket.bind({
  address: 'localhost',
  port: 8000,
  exclusive: true,
});
```

### `socket.bindSync([options])`

<!-- YAML
added:
 - v26.4.0
 - v24.19.0
-->

* `options` {Object}
  * `port` {integer} 如果省略或为 `0`，操作系统将分配一个
    任意的未使用端口。**默认值：**`0`。
  * `address` {string} 要绑定的数值型 IP 地址。与
    [`socket.bind()`][] 不同，不会执行 DNS 解析，因此不接受主机名。如果省略，操作系统会绑定到所有地址
    （`'0.0.0.0'` 用于 `udp4` 套接字，`'::'` 用于 `udp6`）。
* 返回值：{Object} 由 [`socket.address()`][] 返回的已绑定地址。

[`socket.bind()`][] 的同步对应方法。`bind(2)` 是一个本地的、
非阻塞系统调用，因此绑定会内联执行，并立即返回解析后的
地址，包括当 `port` 为 `0` 时操作系统分配的
临时端口：

```js
const dgram = require('node:dgram');

const socket = dgram.createSocket('udp4');
const address = socket.bindSync({ address: '0.0.0.0', port: 0 });
console.log(address); // 例如 { address: '0.0.0.0', family: 'IPv4', port: 53124 }
```

绑定失败（例如 `EADDRINUSE`）会同步抛出，而不是作为 `'error'` 事件发出。`bindSync()` 返回后，[`socket.address()`][] 会立即同步有效，而 `'listening'` 事件会在下一个 tick 发出。

`address` 必须是数值型 IP 字面量；`bindSync()` 从不执行 DNS 解析（异步名称解析才是绑定过程中真正会阻塞的部分）。传入的数据报会继续通过 [`'message'`][] 事件异步传递。`bindSync()` 始终绑定套接字自身的句柄，并且不参与 [`cluster`][] 句柄共享。

### `socket.close([callback])`

<!-- YAML
added: v0.1.99
-->

* `callback` {Function} 当套接字已关闭时调用。

关闭底层套接字并停止监听其上的数据。
如果提供了回调，它将被添加为 [`'close'`][] 事件的监听器。

### `socket[Symbol.asyncDispose]()`**

<!-- YAML
added:
 - v20.5.0
 - v18.18.0
changes:
 - version: v24.2.0
   pr-url: https://github.com/nodejs/node/pull/58467
   description: 不再是实验性的。
-->

调用 [`socket.close()`][] 并返回一个 promise，当套接字关闭时该 promise 会被兑现。

### `socket.connect(port[, address][, callback])`

<!-- YAML
added: v12.0.0
-->

* `port` {integer}
* `address` {string}
* `callback` {Function} 当连接完成或出错时调用。

将 `dgram.Socket` 关联到远程地址和端口。
由此句柄发送的每条消息都会自动发送到该目的地。
此外，套接字将只接收来自该远程对等方的消息。
尝试在已连接的套接字上调用 `connect()` 将导致 [`ERR_SOCKET_DGRAM_IS_CONNECTED`][] 异常。
如果未提供 `address`，默认将使用 `'127.0.0.1'`（对于 `udp4` 套接字）或 `'::1'`（对于 `udp6` 套接字）。
连接完成后，会发出 `'connect'` 事件并调用可选的 `callback` 函数。
如果失败，将调用 `callback`，并发出 `'error'` 事件。

### `socket.connectSync(port[, address])`

<!-- YAML
added:
 - v26.4.0
 - v24.19.0
-->

* `port` {integer}
* `address` {string} 要连接到的数字形式 IP 地址。与 [`socket.connect()`][] 不同，这里不会执行 DNS 解析，因此不接受主机名。如果省略，则使用 `'127.0.0.1'`（对于 `udp4` 套接字）或 `'::1'`（对于 `udp6` 套接字）。

[`socket.connect()`][] 的同步对应方法。对于 UDP 套接字，`connect(2)` 只会记录默认对等地址，并且是一个本地的、非阻塞的系统调用，因此关联会在当前行内完成。调用本身引发的任何错误（例如地址族不匹配时的 `EAFNOSUPPORT`）都会同步抛出，而不是通过 `'error'` 事件报告。因为 `connect(2)` 不会探测可达性，所以像 `ECONNREFUSED` 这样的错误仍会像 [`socket.connect()`][] 一样，在之后的发送或接收操作中异步显现：

```js
const dgram = require('node:dgram');

const socket = dgram.createSocket('udp4');
socket.connectSync(41234, '127.0.0.1');
console.log(socket.remoteAddress()); // { address: '127.0.0.1', family: 'IPv4', port: 41234 }
```

如果套接字仍未绑定，则会先同步绑定。调用 `connectSync()` 后，[`socket.remoteAddress()`][] 会同步变为有效状态，而 `'connect'` 事件会在下一轮事件循环中触发。尝试在已连接的套接字上调用 `connectSync()` 会抛出 [`ERR_SOCKET_DGRAM_IS_CONNECTED`][] 异常，而在异步 [`socket.bind()`][] 仍在进行时调用它则会抛出 [`ERR_SOCKET_ALREADY_BOUND`][] 异常。

`address` 必须是数字形式的 IP 字面量；`connectSync()` 从不执行 DNS 解析（异步名称解析是连接过程中唯一真正会阻塞的部分）。

### `socket.disconnect()`

<!-- YAML
added: v12.0.0
-->

用于将已连接的 `dgram.Socket` 与其远程地址解除关联的同步函数。
尝试对未绑定或已断开连接的 socket 调用 `disconnect()` 将导致 [`ERR_SOCKET_DGRAM_NOT_CONNECTED`][] 异常。

### `socket.dropMembership(multicastAddress[, multicastInterface])`

<!-- YAML
added: v0.6.9
-->

* `multicastAddress` {string}
* `multicastInterface` {string}

指示内核使用 `IP_DROP_MEMBERSHIP` 套接字选项离开 `multicastAddress` 处的多播组。
当套接字关闭或进程终止时，内核会自动调用此方法，因此大多数应用程序永远没有理由调用此方法。

如果未指定 `multicastInterface`，操作系统将尝试在所有有效接口上删除成员资格。

### `socket.dropSourceSpecificMembership(sourceAddress, groupAddress[, multicastInterface])`

<!-- YAML
added:
 - v13.1.0
 - v12.16.0
-->

* `sourceAddress` {string}
* `groupAddress` {string}
* `multicastInterface` {string}

指示内核使用 `IP_DROP_SOURCE_MEMBERSHIP` 套接字选项离开给定 `sourceAddress` 和 `groupAddress` 处的源特定多播通道。  
当套接字关闭或进程终止时，内核会自动调用此方法，因此大多数应用程序永远没有理由调用此方法。

如果未指定 `multicastInterface`，操作系统将尝试在所有有效接口上删除成员资格。

### `socket.getRecvBufferSize()`

<!-- YAML
added: v8.7.0
-->

* 返回：{number} `SO_RCVBUF` 套接字接收缓冲区大小（字节）。

如果在未绑定的套接字上调用此方法，将抛出 [`ERR_SOCKET_BUFFER_SIZE`][]。

### `socket.getSendBufferSize()`

<!-- YAML
added: v8.7.0
-->

* 返回：{number} `SO_SNDBUF` 套接字发送缓冲区大小（字节）。

如果在未绑定的套接字上调用此方法，将抛出 [`ERR_SOCKET_BUFFER_SIZE`][].

### `socket.getSendQueueSize()`

<!-- YAML
added:
  - v18.8.0
  - v16.19.0
-->

* 返回：{number} 排队等待发送的字节数。

### `socket.getSendQueueCount()`

<!-- YAML
added:
  - v18.8.0
  - v16.19.0
-->

* 返回：{number} 当前队列中等待处理的发送请求数。

### `socket.ref()`

<!-- YAML
added: v0.9.1
-->

* 返回：{dgram.Socket}

默认情况下，绑定套接字会导致只要套接字打开，它就会阻止 Node.js 进程退出。
可以使用 `socket.unref()` 方法将套接字从保持 Node.js 进程活动的引用计数中排除。
`socket.ref()` 方法将套接字添加回引用计数并恢复默认行为。

多次调用 `socket.ref()` 不会产生其他影响。

`socket.ref()` 方法返回对套接字的引用，因此调用可以链式进行。

### `socket.remoteAddress()`

<!-- YAML
added: v12.0.0
-->

* 返回：{Object}

返回一个包含远程端点的 `address`、`family` 和 `port` 的对象。  
如果套接字未连接，此方法将抛出 [`ERR_SOCKET_DGRAM_NOT_CONNECTED`][] 异常。

### `socket.send(msg[, offset, length][, port][, address][, callback])`

<!-- YAML
added: v0.1.99
changes:
  - version: v17.0.0
    pr-url: https://github.com/nodejs/node/pull/39190
    description: "address 参数现在只接受 `string`、`null` 或 `undefined`。"
  - version:
    - v14.5.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/22413
    description: "msg 参数现在可以是任何 `TypedArray` 或 `DataView`。"
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/26871
    description: 增加了在已连接套接字上发送数据的支持。
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/11985
    description: "msg 参数现在可以是 `Uint8Array`。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/10473
    description: address 参数现在始终是可选的。
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/5929
    description: "成功时，`callback` 现在将使用 `null` 而不是 `0` 的 `error` 参数调用。"
  - version: v5.7.0
    pr-url: https://github.com/nodejs/node/pull/4374
    description: "msg 参数现在可以是数组。此外，`offset` 和 `length` 参数现在是可选的。"
-->

* `msg` {Buffer|TypedArray|DataView|string|Array} 要发送的消息。
* `offset` {integer} 缓冲区中消息开始的偏移量。
* `length` {integer} 消息中的字节数。
* `port` {integer} 目标端口。
* `address` {string} 目标主机名或 IP 地址。
* `callback` {Function} 当消息已发送时调用。

在套接字上广播数据报。
对于无连接套接字，必须指定目标 `port` 和 `address`。
另一方面，已连接的套接字将使用其关联的远程端点，因此不得设置 `port` 和 `address` 参数。

`msg` 参数包含要发送的消息。
根据其类型，可能适用不同的行为。
如果 `msg` 是 `Buffer`、任何 `TypedArray` 或 `DataView`，则 `offset` 和 `length` 分别指定 `Buffer` 内消息开始的偏移量和消息中的字节数。
如果 `msg` 是字符串，则它会自动转换为具有 `'utf8'` 编码的 `Buffer`。
对于包含多字节字符的消息，`offset` 和 `length` 将相对于 [字节长度][] 而不是字符位置进行计算。
如果 `msg` 是数组，则不得指定 `offset` 和 `length`。

`address` 参数是一个字符串。
如果 `address` 的值是主机名，将使用 DNS 来解析主机的地址。
如果未提供 `address` 或其他值为空值，默认将使用 `'127.0.0.1'`（对于 `udp4` 套接字）或 `'::1'`（对于 `udp6` 套接字）。

如果套接字之前未通过调用 `bind` 进行绑定，则套接字被分配一个随机端口号并绑定到“所有接口”地址（`udp4` 套接字为 `'0.0.0.0'`，`udp6` 套接字为 `'::0'`）。

可以指定一个可选的 `callback` 函数，作为报告 DNS 错误或确定何时可以安全地重用 `buf` 对象的一种方式。
DNS 查找会将发送时间延迟至少一个 Node.js 事件循环周期。

确定数据报已发送的唯一方法是使用 `callback`。
如果发生错误并给出了 `callback`，则错误将作为第一个参数传递给 `callback`。
如果未给出 `callback`，则错误会作为 `'error'` 事件在 `socket` 对象上发出。

偏移量和长度是可选的，但如果使用了其中任何一个，则两者都必须设置。
仅当第一个参数是 `Buffer`、`TypedArray` 或 `DataView` 时才支持它们。

如果在未绑定的套接字上调用此方法，将抛出 [`ERR_SOCKET_BAD_PORT`][]。

向 `localhost` 上的端口发送 UDP 数据包的示例；

```mjs
import dgram from 'node:dgram';
import { Buffer } from 'node:buffer';

const message = Buffer.from('Some bytes');
const client = dgram.createSocket('udp4');
client.send(message, 41234, 'localhost', (err) => {
  client.close();
});
```

```cjs
const dgram = require('node:dgram');
const { Buffer } = require('node:buffer');

const message = Buffer.from('Some bytes');
const client = dgram.createSocket('udp4');
client.send(message, 41234, 'localhost', (err) => {
  client.close();
});
```

向 `127.0.0.1` 上的端口发送由多个缓冲区组成的 UDP 数据包的示例；

```mjs
import dgram from 'node:dgram';
import { Buffer } from 'node:buffer';

const buf1 = Buffer.from('Some ');
const buf2 = Buffer.from('bytes');
const client = dgram.createSocket('udp4');
client.send([buf1, buf2], 41234, (err) => {
  client.close();
});
```

```cjs
const dgram = require('node:dgram');
const { Buffer } = require('node:buffer');

const buf1 = Buffer.from('Some ');
const buf2 = Buffer.from('bytes');
const client = dgram.createSocket('udp4');
client.send([buf1, buf2], 41234, (err) => {
  client.close();
});
```

发送多个缓冲区可能更快，也可能更慢，具体取决于应用程序和操作系统。
请运行基准测试，以确定每种情况下的最佳策略。
不过一般来说，发送多个缓冲区会更快。

使用连接到 `localhost` 上端口的套接字发送 UDP 数据包的示例：

```mjs
import dgram from 'node:dgram';
import { Buffer } from 'node:buffer';

const message = Buffer.from('Some bytes');
const client = dgram.createSocket('udp4');
client.connect(41234, 'localhost', (err) => {
  client.send(message, (err) => {
    client.close();
  });
});
```

```cjs
const dgram = require('node:dgram');
const { Buffer } = require('node:buffer');

const message = Buffer.from('Some bytes');
const client = dgram.createSocket('udp4');
client.connect(41234, 'localhost', (err) => {
  client.send(message, (err) => {
    client.close();
  });
});
```

#### 关于 UDP 数据报大小的说明

IPv4/v6 数据报的最大大小取决于 `MTU`（最大传输单元）和 `Payload Length` 字段大小。

* `Payload Length` 字段宽 16 位，这意味着正常负载不能超过 64K 八位字节，包括互联网头部和数据（65,507 字节 = 65,535 − 8 字节 UDP 头部 − 20 字节 IP 头部）；这对于环回接口通常是正确的，但如此长的数据报消息对于大多数主机和网络来说是不切实际的。

* `MTU` 是给定链路层技术可以支持的数据报消息的最大大小。
  对于任何链路，IPv4 强制要求最小 `MTU` 为 68 八位字节，而 IPv4 的推荐 `MTU` 为 576（通常推荐作为拨号类型应用程序的 `MTU`），无论它们是完整到达还是分片到达。

  对于 IPv6，最小 `MTU` 为 1280 八位字节。
  但是，强制性的最小分片重组缓冲区大小为 1500 八位字节。
  68 八位字节的值非常小，因为大多数当前的链路层技术（如以太网）的最小 `MTU` 为 1500。

不可能预先知道数据包可能经过的每个链路的 MTU。
发送大于接收者 `MTU` 的数据报将不起作用，因为数据包将被静默丢弃，而不会通知源数据未到达其预期接收者。

### `socket.setBroadcast(flag)`

<!-- YAML
added: v0.6.9
-->

* `flag` {boolean}

设置或清除 `SO_BROADCAST` 套接字选项。
当设置为 `true` 时，UDP 数据包可以发送到本地接口的广播地址。

如果在未绑定的套接字上调用此方法，将抛出 `EBADF`。

### `socket.setMulticastInterface(multicastInterface)`

<!-- YAML
added: v8.6.0
-->

* `multicastInterface` {string}

_本节中对范围的所有引用均指 [IPv6 区域索引][]，其由 [RFC 4007][] 定义。在字符串形式中，带有范围索引的 IP 写为 `'IP%scope'`，其中范围是接口名称或接口编号。_

将套接字的默认传出多播接口设置为所选接口或返回系统接口选择。
`multicastInterface` 必须是来自套接字族的 IP 的有效字符串表示。

对于 IPv4 套接字，这应该是为所需物理接口配置的 IP。
所有在套接字上发送到多播的数据包都将在此调用最近一次成功使用所确定的接口上发送。

对于 IPv6 套接字，`multicastInterface` 应包含一个范围以指示接口，如下例所示。
在 IPv6 中，单个 `send` 调用也可以在地址中使用显式范围，因此只有发送到未指定显式范围的多播地址的数据包才会受此调用最近一次成功使用的影响。

如果在未绑定的套接字上调用此方法，将抛出 `EBADF`。

#### 示例：IPv6 传出多播接口

在大多数系统上，其中范围格式使用接口名称：

```js
const socket = dgram.createSocket('udp6');

socket.bind(1234, () => {
  socket.setMulticastInterface('::%eth1');
});
```

在 Windows 上，其中范围格式使用接口编号：

```js
const socket = dgram.createSocket('udp6');

socket.bind(1234, () => {
  socket.setMulticastInterface('::%2');
});
```

#### 示例：IPv4 传出多播接口

所有系统都使用所需物理接口上的主机 IP：

```js
const socket = dgram.createSocket('udp4');

socket.bind(1234, () => {
  socket.setMulticastInterface('10.0.0.2');
});
```

#### 调用结果

对尚未准备好发送或不再打开的套接字的调用可能会抛出 _未运行_ [`Error`][]。

如果 `multicastInterface` 无法解析为 IP，则会抛出 _EINVAL_ [`System Error`][]。

在 IPv4 上，如果 `multicastInterface` 是有效地址但不匹配任何接口，或者如果地址不匹配族，则抛出 [`System Error`][]，例如 `EADDRNOTAVAIL` 或 `EPROTONOSUP`。

在 IPv6 上，大多数指定或省略范围的错误将导致套接字继续使用（或返回到）系统的默认接口选择。

套接字地址族的 ANY 地址（IPv4 `'0.0.0.0'` 或 IPv6 `'::'`）可用于将套接字默认传出接口的控制权返回给系统，用于未来的多播数据包。

### `socket.setMulticastLoopback(flag)`

<!-- YAML
added: v0.3.8
-->

* `flag` {boolean}

设置或清除 `IP_MULTICAST_LOOP` 套接字选项。
当设置为 `true` 时，多播数据包也将在本地接口上接收。

如果在未绑定的套接字上调用此方法，将抛出 `EBADF`。

### `socket.setMulticastTTL(ttl)`

<!-- YAML
added: v0.3.8
-->

* `ttl` {整数}

设置 `IP_MULTICAST_TTL` 套接字选项。
尽管 TTL 通常代表“生存时间”（time to live），但在此上下文中，它指定了数据包允许经过的 IP 跳数，尤其适用于多播流量。
每个转发数据包的路由器或网关都会将 TTL 减 1。
如果路由器将 TTL 减至 0，则不会转发该数据包。

`ttl` 参数的取值范围可以是 0 到 255。
大多数系统上的默认值为 `1`。

如果在未绑定的套接字上调用此方法，则会抛出 `EBADF` 错误。

### `socket.setRecvBufferSize(size)`

<!-- YAML
added: v8.7.0
-->

* `size` {integer}

设置 `SO_RCVBUF` 套接字选项。  
设置最大套接字接收缓冲区（字节）。

如果在未绑定的套接字上调用此方法，将抛出 [`ERR_SOCKET_BUFFER_SIZE`][].

### `socket.setSendBufferSize(size)`

<!-- YAML
added: v8.7.0
-->

* `size` {integer}

设置 `SO_SNDBUF` 套接字选项。  
设置最大套接字发送缓冲区（字节）。

如果在未绑定的套接字上调用此方法，将抛出 [`ERR_SOCKET_BUFFER_SIZE`][].

### `socket.setTTL(ttl)`

<!-- YAML
added: v0.1.101
-->

* `ttl` {整数}

设置 `IP_TTL` 套接字选项。  
虽然 TTL 通常代表“生存时间”（time to live），但在此上下文中，它表示数据包允许经过的 IP 跳数。  
每个转发数据包的路由器或网关都会将 TTL 减 1。  
如果路由器将 TTL 减至 0，则不会转发该数据包。  
更改 TTL 值通常用于网络探测或多播。

`ttl` 参数的取值范围可以是 1 到 255。  
大多数系统上的默认值为 64。

在未绑定的套接字上调用此方法将抛出 `EBADF`。

### `socket.unref()`

<!-- YAML
added: v0.9.1
-->

* 返回：{dgram.Socket}

默认情况下，绑定套接字会导致只要套接字打开，它就会阻止 Node.js 进程退出。
可以使用 `socket.unref()` 方法将套接字从保持 Node.js 进程活动的引用计数中排除，允许进程即使套接字仍在监听也能退出。

多次调用 `socket.unref()` 不会产生额外效果。

`socket.unref()` 方法返回对套接字的引用，因此调用可以链式进行。

## `node:dgram` 模块函数

### `dgram.createSocket(options[, callback])`

<!-- YAML
added: v0.11.13
changes:
  - version:
    - v23.1.0
    - v22.12.0
    pr-url: https://github.com/nodejs/node/pull/55403
    description: "支持 `reusePort` 选项。"
  - version: v15.8.0
    pr-url: https://github.com/nodejs/node/pull/37026
    description: 添加了 AbortSignal 支持。
  - version: v11.4.0
    pr-url: https://github.com/nodejs/node/pull/23798
    description: "支持 `ipv6Only` 选项。"
  - version: v8.7.0
    pr-url: https://github.com/nodejs/node/pull/13623
    description: "现在支持 `recvBufferSize` 和 `sendBufferSize` 选项。"
  - version: v8.6.0
    pr-url: https://github.com/nodejs/node/pull/14560
    description: "支持 `lookup` 选项。"
-->

* `options` {Object} 可用选项如下：
  * `type` {string} 套接字的族。必须是 `'udp4'` 或 `'udp6'`。
    必填。
  * `reuseAddr` {boolean} 当为 `true` 时，[`socket.bind()`][] 将重用该
    地址，即使另一个进程已经在其上绑定了一个套接字，但
    只有一个套接字可以接收数据。
    **默认：** `false`。
  * `reusePort` {boolean} 当为 `true` 时，[`socket.bind()`][] 将重用该
    端口，即使另一个进程已经在其上绑定了一个套接字。传入
    数据报会分发到监听套接字。该选项仅在某些平台上可用，例如 Linux 3.9+、DragonFlyBSD 3.6+、FreeBSD 12.0+、
    Solaris 11.4 和 AIX 7.2.5+。在不支持的平台上，此选项在套接字绑定时会抛出
    错误。
    **默认：** `false`。
  * `ipv6Only` {boolean} 将 `ipv6Only` 设为 `true` 会
    禁用双栈支持，也就是说，绑定到 `::` 不会使
    `0.0.0.0` 也被绑定。**默认：** `false`。
  * `recvBufferSize` {number} 设置 `SO_RCVBUF` 套接字值。
  * `sendBufferSize` {number} 设置 `SO_SNDBUF` 套接字值。
  * `lookup` {Function} 自定义查找函数。**默认：** [`dns.lookup()`][]。
    当使用默认值时，套接字族的字面 IP 地址
    会直接解析为其自身，而不会调用 [`dns.lookup()`][]。
  * `signal` {AbortSignal} 可用于关闭套接字的 AbortSignal。
  * `receiveBlockList` {net.BlockList} `receiveBlockList` 可用于丢弃
    来自特定 IP 地址、IP 范围或 IP 子网的入站数据报。这在服务器位于反向代理、NAT 等之后时
    不起作用，因为与阻止列表进行比对的地址是代理的地址，或者是
    由 NAT 指定的地址。
  * `sendBlockList` {net.BlockList} `sendBlockList` 可用于禁用
    到特定 IP 地址、IP 范围或 IP 子网的出站
    访问。
* `callback` {Function} 作为 `'message'` 事件的监听器附加。可选。
* 返回：{dgram.Socket}

创建一个 `dgram.Socket` 对象。一旦套接字被创建，调用 [`socket.bind()`][] 将指示套接字开始监听数据报消息。当 `address` 和 `port` 未传递给 [`socket.bind()`][] 时，该方法会将套接字绑定到随机端口的“所有接口”地址（它对 `udp4` 和 `udp6` 套接字都能正确处理）。绑定的地址和端口可以使用 [`socket.address().address`][] 和 [`socket.address().port`][] 检索。

如果启用了 `signal` 选项，在相应的 `AbortController` 上调用 `.abort()` 类似于在套接字上调用 `.close()`：

```js
const controller = new AbortController();
const { signal } = controller;
const server = dgram.createSocket({ type: 'udp4', signal });
server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});
// 稍后，当你想要关闭服务器时。
controller.abort();
```

### `dgram.createSocket(type[, callback])`

<!-- YAML
added: v0.1.99
-->

* `type` {string} 要么是 `'udp4'` 要么是 `'udp6'`。
* `callback` {Function} 作为 `'message'` 事件的监听器附加。
* 返回：{dgram.Socket}

创建指定 `type` 的 `dgram.Socket` 对象。

一旦套接字被创建，调用 [`socket.bind()`][] 将指示套接字开始监听数据报消息。当 `address` 和 `port` 未传递给 [`socket.bind()`][] 时，该方法会将套接字绑定到随机端口的“所有接口”地址（它对 `udp4` 和 `udp6` 套接字都能正确处理）。绑定的地址和端口可以使用 [`socket.address().address`][] 和 [`socket.address().port`][] 检索。

[IPv6 Zone Indexes]: https://en.wikipedia.org/wiki/IPv6_address#Scoped_literal_IPv6_addresses
[RFC 4007]: https://tools.ietf.org/html/rfc4007
[`'close'`]: #event-close
[`'message'`]: #event-message
[`ERR_SOCKET_ALREADY_BOUND`]: errors.md#err_socket_already_bound
[`ERR_SOCKET_BAD_PORT`]: errors.md#err_socket_bad_port
[`ERR_SOCKET_BUFFER_SIZE`]: errors.md#err_socket_buffer_size
[`ERR_SOCKET_DGRAM_IS_CONNECTED`]: errors.md#err_socket_dgram_is_connected
[`ERR_SOCKET_DGRAM_NOT_CONNECTED`]: errors.md#err_socket_dgram_not_connected
[`Error`]: errors.md#class-error
[`System Error`]: errors.md#class-systemerror
[`close()`]: #socketclosecallback
[`cluster`]: cluster.md
[`connect()`]: #socketconnectport-address-callback
[`dgram.createSocket()`]: #dgramcreatesocketoptions-callback
[`dns.lookup()`]: dns.md#dnslookuphostname-options-callback
[`socket.address().address`]: #socketaddress
[`socket.address().port`]: #socketaddress
[`socket.address()`]: #socketaddress
[`socket.bind()`]: #socketbindport-address-callback
[`socket.close()`]: #socketclosecallback
[`socket.connect()`]: #socketconnectport-address-callback
[`socket.remoteAddress()`]: #socketremoteaddress
[byte length]: buffer.md#static-method-bufferbytelengthstring-encoding
