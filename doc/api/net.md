# 网络

<!--introduced_in=v0.10.0-->

<!--lint disable maximum-line-length-->

> 稳定性：2 - 稳定

<!-- source_link=lib/net.js -->

`node:net` 模块提供了一个异步网络 API，用于创建基于流的
TCP 或 [IPC][] 服务器（[`net.createServer()`][]）和客户端
（[`net.createConnection()`][]）。

可以使用以下方式访问它：

```mjs
import net from 'node:net';
```

```cjs
const net = require('node:net');
```

## IPC 支持

<!-- YAML
changes:
  - version: v20.8.0
    pr-url: https://github.com/nodejs/node/pull/49667
    description: "支持绑定到抽象 Unix 域套接字路径，如 `\0abstract`。对于 Node.js `< v20.4.0`，我们可以绑定 '\0'。"
-->

`node:net` 模块在 Windows 上支持使用命名管道进行 IPC，在其他
操作系统上支持 Unix 域套接字。

### 识别 IPC 连接的路径

[`net.connect()`][]、[`net.createConnection()`][]、[`server.listen()`][] 和
[`socket.connect()`][] 接受一个 `path` 参数来识别 IPC 端点。

在 Unix 上，本地域也称为 Unix 域。路径是一个
文件系统路径名。当路径名的长度
大于 `sizeof(sockaddr_un.sun_path)` 的长度时，它将抛出错误。典型值在
Linux 上为 107 字节，在 macOS 上为 103 字节。如果 Node.js API 抽象创建
了 Unix 域套接字，它也会取消链接该 Unix 域套接字。例如，[`net.createServer()`][] 可能创建一个 Unix 域套接字，而
[`server.close()`][] 将取消链接它。但是如果用户在这些抽象之外创建 Unix 域
套接字，用户将需要手动移除它。当 Node.js API 创建 Unix 域套接字但程序随后
崩溃时，同样适用。简而言之，Unix 域套接字将在文件系统中可见，并且
将持续存在直到被取消链接。在 Linux 上，你可以通过在路径开头添加
`\0` 来使用 Unix 抽象套接字，例如 `\0abstract`。Unix 抽象套接字的路径
在文件系统中不可见，并且当所有对套接字的开放引用关闭时它将自动消失。

在 Windows 上，本地域是使用命名管道实现的。路径 _必须_
引用 `\\?\pipe\` 或 `\\.\pipe\` 中的条目。允许使用任何字符，
但后者可能会对管道名称进行一些处理，例如解析 `..`
序列。尽管它看起来可能如何，管道命名空间是扁平的。管道将
_不会持久存在_。当对它们的最后一个引用关闭时，它们会被移除。
与 Unix 域套接字不同，当拥有进程退出时，Windows 将关闭并移除管道。

JavaScript 字符串转义要求路径使用额外的反斜杠转义来指定，例如：

```js
net.createServer().listen(
  path.join('\\\\?\\pipe', process.cwd(), 'myctl'));
```

## 类：`net.BlockList`

<!-- YAML
added:
  - v15.0.0
  - v14.18.0
-->

`BlockList` 对象可与某些网络 API 一起使用，以指定规则
阻止对特定 IP 地址、IP 范围或
IP 子网的入站或出站访问。

### `blockList.addAddress(address[, type])`

<!-- YAML
added:
  - v15.0.0
  - v14.18.0
-->

* `address` {string|net.SocketAddress} 一个 IPv4 或 IPv6 地址。
* `type` {string} `'ipv4'` 或 `'ipv6'`。**默认：** `'ipv4'`。

添加一条规则以阻止给定的 IP 地址。

### `blockList.addRange(start, end[, type])`

<!-- YAML
added:
  - v15.0.0
  - v14.18.0
-->

* `start` {string|net.SocketAddress} 范围中的起始 IPv4 或 IPv6 地址。
* `end` {string|net.SocketAddress} 范围中的结束 IPv4 或 IPv6 地址。
* `type` {string} `'ipv4'` 或 `'ipv6'`。**默认：** `'ipv4'`。

添加一条规则以阻止从 `start`（包含）到
`end`（包含）的 IP 地址范围。

### `blockList.addSubnet(net, prefix[, type])`

<!-- YAML
added:
  - v15.0.0
  - v14.18.0
-->

* `net` {string|net.SocketAddress} 网络 IPv4 或 IPv6 地址。
* `prefix` {number} CIDR 前缀位数。对于 IPv4，此
  值必须在 `0` 和 `32` 之间。对于 IPv6，此值必须在
  `0` 和 `128` 之间。
* `type` {string} `'ipv4'` 或 `'ipv6'`。**默认：** `'ipv4'`。

添加一条规则以阻止指定为子网掩码的 IP 地址范围。

### `blockList.check(address[, type])`

<!-- YAML
added:
  - v15.0.0
  - v14.18.0
-->

* `address` {string|net.SocketAddress} 要检查的 IP 地址
* `type` {string} `'ipv4'` 或 `'ipv6'`。**默认：** `'ipv4'`。
* 返回：{boolean}

如果给定的 IP 地址匹配添加到
`BlockList` 的任何规则，则返回 `true`。

```js
const blockList = new net.BlockList();
blockList.addAddress('123.123.123.123');
blockList.addRange('10.0.0.1', '10.0.0.10');
blockList.addSubnet('8592:757c:efae:4e45::', 64, 'ipv6');

console.log(blockList.check('123.123.123.123'));  // 输出：true
console.log(blockList.check('10.0.0.3'));  // 输出：true
console.log(blockList.check('222.111.111.222'));  // 输出：false

// IPv4 地址的 IPv6 表示法有效：
console.log(blockList.check('::ffff:7b7b:7b7b', 'ipv6')); // 输出：true
console.log(blockList.check('::ffff:123.123.123.123', 'ipv6')); // 输出：true
```

### `blockList.rules`

<!-- YAML
added:
  - v15.0.0
  - v14.18.0
-->

* 类型：{string\[]}

要添加到阻止列表中的规则列表。

### `BlockList.isBlockList(value)`

<!-- YAML
added:
  - v23.4.0
  - v22.13.0
-->

* `value` {any} 任何 JS 值
* 如果 `value` 是 `net.BlockList`，则返回 `true`。

### `blockList.fromJSON(value)`

> 稳定性：1.2 - 候选发布

 <!-- YAML
added:
 - v24.5.0
 - v22.19.0
-->

```js
const blockList = new net.BlockList();
const data = [
  'Subnet: IPv4 192.168.1.0/24',
  'Address: IPv4 10.0.0.5',
  'Range: IPv4 192.168.2.1-192.168.2.10',
  'Range: IPv4 10.0.0.1-10.0.0.10',
];
blockList.fromJSON(data);
blockList.fromJSON(JSON.stringify(data));
```

* `value` Blocklist.rules

### `blockList.toJSON()`

> 稳定性：1.2 - 候选发布

 <!-- YAML
added:
 - v24.5.0
 - v22.19.0
-->

* 返回 Blocklist.rules

## 类：`net.SocketAddress`

<!-- YAML
added:
  - v15.14.0
  - v14.18.0
-->

### `new net.SocketAddress([options])`

<!-- YAML
added:
  - v15.14.0
  - v14.18.0
-->

* `options` {Object}
  * `address` {string} 网络地址，可以是 IPv4 或 IPv6 字符串。
    **默认**：如果 `family` 是 `'ipv4'` 则为 `'127.0.0.1'`；如果 `family` 是
    `'ipv6'` 则为 `'::'`。
  * `family` {string} `'ipv4'` 或 `'ipv6'` 之一。
    **默认**：`'ipv4'`。
  * `flowlabel` {number} IPv6 流标签，仅当 `family` 是 `'ipv6'` 时使用。
  * `port` {number} IP 端口。

### `socketaddress.address`

<!-- YAML
added:
  - v15.14.0
  - v14.18.0
-->

* 类型：{string}

### `socketaddress.family`

<!-- YAML
added:
  - v15.14.0
  - v14.18.0-->
<!-- YAML
added:
  - v15.14.0
  - v14.18.0
-->

* 类型：{string} `'ipv4'` 或 `'ipv6'`。

### `socketaddress.flowlabel`

<!-- YAML
added:
  - v15.14.0
  - v14.18.0-->

* 类型：{number}

### `socketaddress.port`

<!-- YAML
added:
  - v15.14.0
  - v14.18.0
-->

* 类型：{number}

### `SocketAddress.parse(input)`

<!-- YAML
added:
  - v23.4.0
  - v22.13.0
-->

* `input` {string} 一个包含 IP 地址和可选端口的输入字符串，
  例如 `123.1.2.3:1234` 或 `[1::1]:1234`。
* 返回值：{net.SocketAddress} 如果解析成功，则返回一个 `SocketAddress`。
  否则返回 `undefined`。

## 类：`net.Server`

<!-- YAML
added: v0.1.90
-->

* 继承：{EventEmitter}

此类用于创建 TCP 或 [IPC][] 服务器。

一个正在监听的 TCP `net.Server` 可以通过将其列入
[`worker_threads`][] 的 `postMessage()` 调用中的 `transferList`，转移到工作线程。
这会将底层监听套接字移到接收线程，在那里它会继续
接受连接。参见 [将 TCP 句柄转移到其他线程][]。

### `new net.Server([options][, connectionListener])`

* `options` {Object} 参见
  [`net.createServer([options][, connectionListener])`][`net.createServer()`]。
* `connectionListener` {Function} 自动设置为
  [`'connection'`][] 事件的监听器。
* 返回：{net.Server}

`net.Server` 是一个 [`EventEmitter`][]，具有以下事件：

### 事件：`'close'`

<!-- YAML
added: v0.5.0
-->

当服务器关闭时触发。如果存在连接，则在所有连接都结束之前不会触发此事件。

### 事件：`'connection'`

<!-- YAML
added: v0.1.90
-->

* 类型：{net.Socket} 连接对象

当建立新连接时触发。`socket` 是
`net.Socket` 的一个实例。

### 事件：`'error'`

<!-- YAML
added: v0.1.90
-->

* 类型：{Error}

当发生错误时触发。不同于 [`net.Socket`][]，[`'close'`][]
事件不会在此事件之后直接触发，除非手动调用
[`server.close()`][]。请参见
[`server.listen()`][] 讨论中的示例。

### 事件：`'listening'`

<!-- YAML
added: v0.1.90
-->

在调用 [`server.listen()`][] 后，服务器完成绑定时触发。

### 事件：`'drop'`

<!-- YAML
added:
  - v18.6.0
  - v16.17.0
-->

当连接数达到 `server.maxConnections` 的阈值时，服务器将丢弃新的连接，并改为触发 `'drop'` 事件。如果它是
TCP 服务器，参数如下；否则参数为 `undefined`。

* `data` {Object} 传递给事件监听器的参数。
  * `localAddress` {string} 本地地址。
  * `localPort` {number} 本地端口。
  * `localFamily` {string} 本地族。
  * `remoteAddress` {string} 远程地址。
  * `remotePort` {number} 远程端口。
  * `remoteFamily` {string} 远程 IP 族。`'IPv4'` 或 `'IPv6'`。

### `server.address()`

<!-- YAML
added: v0.1.90
changes:
  - version: v18.4.0
    pr-url: https://github.com/nodejs/node/pull/43054
    description: "`family` 属性现在返回字符串而不是数字。"
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41431
    description: "`family` 属性现在返回数字而不是字符串。"
-->

* 返回：{Object|string|null}

返回已绑定的 `address`、地址的 `family` 名称，以及服务器的 `port`，如果在 IP 套接字上监听，则由操作系统报告（在获取操作系统分配的地址时很有用）：`{ port: 12346, family: 'IPv4', address: '127.0.0.1' }`。

对于监听管道或 Unix 域套接字的服务器，名称以字符串形式返回。

```js
const server = net.createServer((socket) => {
  socket.end('goodbye\n');
}).on('error', (err) => {
  // 在这里处理错误。
  throw err;
});

// 获取一个任意未使用的端口。
server.listen(() => {
  console.log('opened server on', server.address());
});
```

在 `'listening'` 事件被发出之前或在调用 `server.close()` 之后，`server.address()` 会返回 `null`。

### `server.close([callback])`

<!-- YAML
added: v0.1.90
-->

* `callback` {Function} 在服务器关闭时调用。
* 返回：{net.Server}

停止服务器接受新连接，并保留现有连接。此函数是异步的，当所有连接都结束且服务器发出 [`'close'`][] 事件时，服务器最终会关闭。可选的 `callback` 会在 `'close'` 事件发生后被调用。与该事件不同的是，如果服务器在关闭时并未处于打开状态，它将以一个 `Error` 作为唯一参数被调用。

### `server[Symbol.asyncDispose]()`

<!-- YAML
added:
 - v20.5.0
 - v18.18.0
changes:
 - version: v24.2.0
   pr-url: https://github.com/nodejs/node/pull/58467
   description: 不再是实验性功能。
-->

调用 [`server.close()`][] 并返回一个 promise，该 promise 会在服务器关闭时完成。

### `server.getConnections(callback)`

<!-- YAML
added: v0.9.7
-->

* `callback` {Function}
* 返回：{net.Server}

异步获取服务器上的并发连接数。当套接字被发送到子进程时也能正常工作。

回调应接受两个参数 `err` 和 `count`。

### `server.listen()`

启动一个监听连接的服务器。`net.Server` 可以是 TCP 或 [IPC][] 服务器，具体取决于它监听的内容。

可能的签名：

* [`server.listen(handle[, backlog][, callback])`][`server.listen(handle)`]
* [`server.listen(options[, callback])`][`server.listen(options)`]
* [`server.listen(path[, backlog][, callback])`][`server.listen(path)`]
  适用于 [IPC][] 服务器
* [`server.listen([port[, host[, backlog]]][, callback])`][`server.listen(port)`]
  适用于 TCP 服务器

此函数是异步的。当服务器开始监听时，将发出 [`'listening'`][] 事件。最后一个参数 `callback`
将被添加为 [`'listening'`][] 事件的监听器。

所有 `listen()` 方法都可以接受一个 `backlog` 参数，用于指定待处理连接队列的最大长度。实际长度将由操作系统通过 sysctl 设置决定，例如 Linux 上的 `tcp_max_syn_backlog` 和 `somaxconn`。该参数的默认值为 511（不是 512）。

所有 [`net.Socket`][] 都会被设置为 `SO_REUSEADDR`（详情请参见 [`socket(7)`][]）。

只有在第一次 `server.listen()` 调用期间发生错误，或者已经调用了 `server.close()` 时，才可以再次调用 `server.listen()` 方法。否则会抛出一个 `ERR_SERVER_ALREADY_LISTEN` 错误。

监听时最常见的错误之一是 `EADDRINUSE`。当另一台服务器已经在请求的 `port`/`path`/`handle` 上监听时，就会发生这种情况。处理此问题的一种方法是在一段时间后重试：

```js
server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.error('地址正在使用中，正在重试...');
    setTimeout(() => {
      server.close();
      server.listen(PORT, HOST);
    }, 1000);
  }
});
```

#### `server.listen(handle[, backlog][, callback])`

<!-- YAML
added: v0.5.10
-->

* `handle` {Object}
* `backlog` {number} [`server.listen()`][] 函数的通用参数
* `callback` {Function}
* 返回值：{net.Server}

在已绑定到端口、Unix 域套接字或 Windows 命名管道的给定 `handle` 上启动服务器监听连接。

`handle` 对象可以是服务器、套接字（任何具有底层 `_handle` 成员的对象）、[`BoundSocket`][]，或者带有有效文件描述符的 `fd`
成员的对象。

当 `handle` 是 [`BoundSocket`][] 时，服务器会接管该已绑定的
套接字并开始在其上监听。接管会消耗该已绑定套接字（参见
[所有权转移][`BoundSocket`]）。

在 Windows 上不支持监听文件描述符。

#### `server.listen(options[, callback])`

<!-- YAML
added: v0.11.14
changes:
  - version:
    - v23.1.0
    - v22.12.0
    pr-url: https://github.com/nodejs/node/pull/55408
    description: 支持 `reusePort` 选项。
  - version: v15.6.0
    pr-url: https://github.com/nodejs/node/pull/36623
    description: 新增 AbortSignal 支持。
  - version: v11.4.0
    pr-url: https://github.com/nodejs/node/pull/23798
    description: 支持 `ipv6Only` 选项。
-->

* `options` {Object} 必需。支持以下属性：
  * `backlog` {number} [`server.listen()`][] 函数的通用参数。
  * `exclusive` {boolean} **默认值：** `false`
  * `handle` {net.BoundSocket} 预先绑定的 [`BoundSocket`][]。服务器会接管
    该已绑定套接字并在其上监听，同时忽略 `host`、`port` 和
    `path`。接管会消耗该已绑定套接字（参见
    [所有权转移][`BoundSocket`]）。
  * `host` {string}
  * `ipv6Only` {boolean} 对于 TCP 服务器，将 `ipv6Only` 设为 `true` 将
    禁用双栈支持，也就是说，绑定到主机 `::` 不会让
    `0.0.0.0` 也被绑定。**默认值：** `false`。
  * `reusePort` {boolean} 对于 TCP 服务器，将 `reusePort` 设为 `true` 允许
    同一主机上的多个套接字绑定到同一端口。传入连接由操作系统分配给
    监听套接字。此选项仅在某些平台上可用，例如 Linux 3.9+、DragonFlyBSD 3.6+、FreeBSD 12.0+、
    Solaris 11.4 和 AIX 7.2.5+。在不受支持的平台上，此选项会抛出
    错误。**默认值：** `false`。
  * `path` {string} 如果指定了 `port`，则将被忽略。参见
    [为 IPC 连接标识路径][]。
  * `port` {number}
  * `readableAll` {boolean} 对于 IPC 服务器，使管道对所有用户
    可读。**默认值：** `false`。
  * `signal` {AbortSignal} 可用于关闭正在监听的
    服务器的 AbortSignal。
  * `writableAll` {boolean} 对于 IPC 服务器，使管道对所有用户
    可写。**默认值：** `false`。
* `callback` {Function}
  函数。
* 返回值：{net.Server}

如果指定了 `handle`，服务器会接管该预绑定套接字。否则，如果
指定了 `port`，其行为与
[`server.listen([port[, host[, backlog]]][, callback])`][`server.listen(port)`] 相同。
否则，如果指定了 `path`，其行为与
[`server.listen(path[, backlog][, callback])`][`server.listen(path)`] 相同。
如果都未指定，则会抛出错误。

如果 `exclusive` 为 `false`（默认值），则集群工作进程将使用相同的
底层句柄，从而允许共享连接处理职责。当 `exclusive` 为 `true` 时，句柄不会共享，且尝试共享端口
会导致错误。下面展示了一个在独占端口上监听的示例。

```js
server.listen({
  host: 'localhost',
  port: 80,
  exclusive: true,
});
```

当 `exclusive` 处于 `true` 状态且底层句柄为共享时，
可能会出现多个工作进程使用不同的 backlog 查询同一个句柄的情况。
在这种情况下，将使用传递给主进程的第一个 `backlog`。

以 root 身份启动 IPC 服务器可能会导致无特权用户无法访问服务器路径。
使用 `readableAll` 和 `writableAll` 将使所有用户都可以访问该服务器。

如果启用了 `signal` 选项，在对应的 `AbortController` 上调用 `.abort()` 类似于在服务器上调用 `.close()`：

```js
const controller = new AbortController();
server.listen({
  host: 'localhost',
  port: 80,
  signal: controller.signal,
});
// 稍后，当你想关闭服务器时。
controller.abort();
```

#### `server.listen(path[, backlog][, callback])`

<!-- YAML
added: v0.1.90
-->

* `path` {string} 服务器应监听的路径。参见
  [识别 IPC 连接的路径][]。
* `backlog` {number} [`server.listen()`][] 函数的公共参数。
* `callback` {Function}.
* 返回：{net.Server}

启动一个 [IPC][] 服务器，在给定的 `path` 上监听连接。

#### `server.listen([port[, host[, backlog]]][, callback])`

<!-- YAML
added: v0.1.90
-->

* `port` {number}
* `host` {string}
* `backlog` {number} [`server.listen()`][] 函数的公共参数。
* `callback` {Function}.
* 返回：{net.Server}

启动一个 TCP 服务器，在给定的 `port` 和 `host` 上监听连接。

如果未省略 `port` 或其值为 0，操作系统将分配一个任意的
未使用端口，可在发出 [`'listening'`][] 事件后使用 `server.address().port`
获取该端口。

如果未省略 `host`，服务器将在 [未指定的 IPv6 地址][]（`::`）可用时接受连接，
否则将在 [未指定的 IPv4 地址][]（`0.0.0.0`）上接受连接。

在大多数操作系统中，监听 [未指定的 IPv6 地址][]（`::`）
可能会导致 `net.Server` 也监听 [未指定的 IPv4 地址][]
（`0.0.0.0`）。

### `server.listening`

<!-- YAML
added: v5.7.0
-->

* 类型：{boolean} 指示服务器当前是否正在监听连接。

### `server.maxConnections`

<!-- YAML
added: v0.2.0
changes:
  - version: v21.0.0
    pr-url: https://github.com/nodejs/node/pull/48276
    description: 将 `maxConnections` 设置为 `0` 会丢弃所有传入的
                 连接。此前，它被解释为 `Infinity`。
-->

* 类型：{integer}

当连接数达到 `server.maxConnections` 阈值时：

1. 如果进程未在集群模式下运行，Node.js 将关闭该连接。

2. 如果进程在集群模式下运行，Node.js 默认会将该连接路由到另一个工作进程。若要改为关闭连接，请将 [`server.dropMaxConnection`][] 设置为 `true`。

不建议在套接字已通过 [`child_process.fork()`][] 发送给子进程后再使用此选项。

### `server.dropMaxConnection`

<!-- YAML
added:
  - v23.1.0
  - v22.12.0
-->

* 类型：{boolean}

将此属性设置为 `true`，以便在连接数达到 [`server.maxConnections`][] 阈值后开始关闭连接。此设置仅在集群模式下有效。

### `server.ref()`

<!-- YAML
added: v0.9.1
-->

* 返回：{net.Server}

与 `unref()` 相反，在之前已 `unref` 的服务器上调用 `ref()` 将
_不会_ 让程序在它是唯一剩余服务器时退出（默认行为）。
如果服务器已 `ref`，再次调用 `ref()` 将没有效果。

### `server.unref()`

<!-- YAML
added: v0.9.1
-->

* 返回：{net.Server}

在服务器上调用 `unref()` 将允许程序在它是事件系统中唯一
活动服务器时退出。如果服务器已经 `unref`，再次调用
`unref()` 将没有效果。

## Class: `net.Socket`

<!-- YAML
added: v0.3.4
-->

* Extends: {stream.Duplex}

This class is an abstraction of a TCP socket or a streaming [IPC][] endpoint (using named pipes on Windows, and Unix domain sockets on other systems). It is also an [`EventEmitter`][].

`net.Socket` can be created by users and used directly to interact with a server. For example, it is returned by [`net.createConnection()`][], so users can use it to communicate with a server.

It can also be created by Node.js and passed to users upon receiving a connection. For example, it is passed to listeners of the [`'connection'`][] event emitted on [`net.Server`][] so users can use it to interact with clients.

### 将 TCP 句柄传递到其他线程

一个已连接的 TCP `net.Socket` 可以通过将其列入 [`worker_threads`][] 的 `postMessage()` 调用的 `transferList` 中，移动到另一个线程。传输后，源 socket 会在发送线程上被销毁（后续使用会失败并返回 `ERR_STREAM_DESTROYED`，而不是静默丢弃数据），并且该 socket 会继续在接收线程上工作。这使得可以在一个线程上接受连接，然后将它们分发到一个 worker 线程池中，例如在 worker 线程之上构建类似 `node:cluster` 的模型。

该 socket 必须是一个新近接受或创建的 TCP 连接：它仍然必须绑定到一个存活的句柄，不能处于连接中或已销毁状态，也不能已经开始读取或缓存任何数据。否则 `postMessage()` 会抛出 `ERR_WORKER_HANDLE_NOT_TRANSFERABLE`。仅支持 TCP socket，并且仅限于类 Unix 平台；在 Windows 上，`postMessage()` 会抛出 `ERR_WORKER_HANDLE_TRANSFER_UNSUPPORTED`。

```cjs
const net = require('node:net');
const { Worker } = require('node:worker_threads');

// worker.js 接收 `{ socket }` 消息并处理每个连接。
const worker = new Worker('./worker.js');

const server = net.createServer((socket) => {
  // 将新接受的连接交给 worker 线程。
  worker.postMessage({ socket }, [socket]);
});
server.listen(8000);
```

监听中的 [`net.Server`][] 也可以用相同的方式传递，这会将监听 socket 本身（以及其待处理的 accept 队列）移动到接收线程。

### `new net.Socket([options])`

<!-- YAML
added: v0.3.4
changes:
  - version:
     - v25.6.0
     - v24.15.0
    pr-url: https://github.com/nodejs/node/pull/61503
    description: "添加了 `typeOfService` 选项。"
  - version: v15.14.0
    pr-url: https://github.com/nodejs/node/pull/37735
    description: 添加了 AbortSignal 支持。
  - version: v12.10.0
    pr-url: https://github.com/nodejs/node/pull/25436
    description: "添加了 `onread` 选项。"
-->

* `options` {Object} 可用选项如下：
  * `allowHalfOpen` {boolean} 如果设置为 `false`，则当可读端结束时，套接字将自动结束可写端。详情请参见 [`net.createServer()`][] 和 [`'end'`] 事件。**默认值：** `false`。
  * `blockList` {net.BlockList} `blockList` 可用于禁用对特定 IP 地址、IP 范围或 IP 子网的出站访问。
  * `fd` {number} 如果指定，则使用给定的文件描述符包装现有套接字，否则将创建一个新套接字。
  * `handle` {net.BoundSocket} 如果指定，则包装来自 [`BoundSocket`][] 的已绑定套接字。随后对 [`socket.connect()`][`socket.connect()`] 的调用会将已绑定套接字用作连接的源绑定（遵循已绑定的本地地址和端口）。
    采用会消耗该已绑定套接字（参见 [所有权转移][`BoundSocket`]）。
  * `keepAlive` {boolean} 如果设置为 `true`，则会在连接建立后立即在套接字上启用 keep-alive 功能，类似于 [`socket.setKeepAlive()`][] 中的做法。**默认值：** `false`。
  * `keepAliveInitialDelay` {number} 如果设置为正数，则会设置在空闲套接字上发送第一个 keepalive 探测前的初始延迟。**默认值：** `0`。
  * `noDelay` {boolean} 如果设置为 `true`，则会在套接字建立后立即禁用 Nagle 算法。**默认值：** `false`。
  * `onread` {Object} 如果指定，则传入数据会存储在单个 `buffer` 中，并在数据到达套接字时传递给提供的 `callback`。这将导致流式功能不提供任何数据。
    套接字仍会像往常一样发出 `'error'`、`'end'` 和 `'close'` 等事件。`pause()` 和 `resume()` 等方法也会按预期运行。
    * `buffer` {Buffer|Uint8Array|Function} 用于存储传入数据的可重用内存块，或者返回此类内存块的函数。
    * `callback` {Function} 每当有传入数据块时都会调用此函数。会向其传递两个参数：写入 `buffer` 的字节数，以及对 `buffer` 的引用。从此函数返回 `false` 可隐式 `pause()` 套接字。此函数将在全局上下文中执行。
  * `readable` {boolean} 当传入 `fd` 时，允许在套接字上进行读取，否则忽略。**默认值：** `false`。
  * `signal` {AbortSignal} 可用于销毁套接字的中止信号。
  * `typeOfService` {number} 初始服务类型（TOS）值。
  * `writable` {boolean} 当传入 `fd` 时，允许在套接字上进行写入，否则忽略。**默认值：** `false`。
* 返回：{net.Socket}

创建一个新的 Socket 对象。

新创建的 Socket 可以是 TCP Socket 或流式 [IPC][] 端点，具体取决于它 [`connect()`][`socket.connect()`] 到什么。

### 事件：`'close'`

<!-- YAML
added: v0.1.90
-->

* `hadError` {boolean} 如果 Socket 发生传输错误则为 `true`。

在 Socket 完全关闭后发出。参数 `hadError` 是一个布尔值，表示 Socket 是否因传输错误而关闭。

### 事件：`'connect'`

<!-- YAML
added: v0.1.90
-->

在 Socket 连接成功建立时发出。
详见 [`net.createConnection()`][].

### 事件：`'connectionAttempt'`

<!-- YAML
added:
  - v21.6.0
  - v20.12.0
-->

* `ip` {string} Socket 尝试连接的 IP。
* `port` {number} Socket 尝试连接的端口。
* `family` {number} IP 的族。对于 IPv6 可以是 `6`，对于 IPv4 可以是 `4`。

在新的连接尝试启动时发出。如果在 [`socket.connect(options)`][] 中启用了族自动选择算法，则可能会多次发出此事件。

### 事件：`'connectionAttemptFailed'`

<!-- YAML
added:
  - v21.6.0
  - v20.12.0
-->

* `ip` {string} Socket 尝试连接的 IP。
* `port` {number} Socket 尝试连接的端口。
* `family` {number} IP 的族。对于 IPv6 可以是 `6`，对于 IPv4 可以是 `4`。
* `error` {Error} 与失败相关的错误。

在连接尝试失败时发出。如果在 [`socket.connect(options)`][] 中启用了族自动选择算法，则可能会多次发出此事件。

### 事件：`'connectionAttemptTimeout'`

<!-- YAML
added:
  - v21.6.0
  - v20.12.0
-->

* `ip` {string} Socket 尝试连接的 IP。
* `port` {number} Socket 尝试连接的端口。
* `family` {number} IP 的族。对于 IPv6 可以是 `6`，对于 IPv4 可以是 `4`。

在连接尝试超时时发出。仅当在 [`socket.connect(options)`][] 中启用了族自动选择算法时才会发出此事件（并且可能会多次发出）。

### 事件：`'data'`

<!-- YAML
added: v0.1.90
-->

* 类型：{Buffer|string}

在收到数据时发出。参数 `data` 将是 `Buffer` 或
`String`。数据的编码由 [`socket.setEncoding()`][] 设置。

如果 `Socket` 发出 `'data'` 事件时没有监听器，数据将会丢失。

### 事件：`'drain'`

<!-- YAML
added: v0.1.90
-->

在写入缓冲区变为空时发出。可用于限制上传。

另见：`socket.write()` 的返回值。

### 事件：`'end'`

<!-- YAML
added: v0.1.90
-->

当 Socket 的另一端信号传输结束时发出，从而结束 Socket 的可读端。

默认情况下（`allowHalfOpen` 为 `false`），Socket 将发送一个传输结束包，并在写出其待处理的写入队列后销毁其文件描述符。但是，如果 `allowHalfOpen` 设置为 `true`，则 Socket 不会自动 [`end()`][`socket.end()`] 其可写端，允许用户写入任意数量的数据。用户必须显式调用 [`end()`][`socket.end()`] 来关闭连接（即发送一个 FIN 包回来）。

### 事件：`'error'`

<!-- YAML
added: v0.1.90
-->

* 类型：{Error}

在发生错误时发出。`'close'` 事件将在此事件之后直接调用。

### 事件：`'lookup'`

<!-- YAML
added: v0.11.3
changes:
  - version: v5.10.0
    pr-url: https://github.com/nodejs/node/pull/5598
    description: "现在支持 `host` 参数。"
-->

在解析主机名之后但在连接之前发出。
不适用于 Unix 套接字。

* `err` {Error|null} 错误对象。详见 [`dns.lookup()`][]。
* `address` {string} IP 地址。
* `family` {number|null} 地址类型。详见 [`dns.lookup()`][]。
* `host` {string} 主机名。

### 事件：`'ready'`

<!-- YAML
added: v9.11.0
-->

在 Socket 准备好使用时发出。

在 `'connect'` 之后立即触发。

### 事件：`'timeout'`

<!-- YAML
added: v0.1.90
-->

如果 Socket 因不活动而超时时发出。这仅用于通知 Socket 处于空闲状态。用户必须手动关闭连接。

另见：[`socket.setTimeout()`][]】【。

### `socket.address()`

<!-- YAML
added: v0.1.90
changes:
  - version: v18.4.0
    pr-url: https://github.com/nodejs/node/pull/43054
    description: "`family` 属性现在返回字符串而不是数字。"
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41431
    description: "`family` 属性现在返回数字而不是字符串。"
-->

* 返回：{Object}

返回操作系统报告的 Socket 绑定的 `address`、地址 `family` 名称和 `port`：
`{ port: 12346, family: 'IPv4', address: '127.0.0.1' }`

### `socket.autoSelectFamilyAttemptedAddresses`

<!-- YAML
added:
 - v19.4.0
 - v18.18.0
-->

* 类型：{string\[]}

仅当在 [`socket.connect(options)`][] 中启用了族自动选择算法时，此属性才存在，它是已尝试地址的数组。

每个地址都是 `$IP:$PORT` 形式的字符串。如果连接成功，则最后一个地址是 Socket 当前连接的地址。

### `socket.bufferSize`

<!-- YAML
added: v0.3.8
deprecated:
  - v14.6.0
-->

> 稳定性：0 - 已废弃：改用 [`writable.writableLength`][]。

* 类型：{integer}

此属性显示用于写入的缓冲字符数。缓冲区可能包含编码后长度未知的字符串。因此，这个数字只是缓冲区中字节数的近似值。

`net.Socket` 具有 `socket.write()` 始终有效的属性。这是为了帮助用户快速上手。计算机无法总是跟上写入 Socket 的数据量。网络连接可能只是太慢。Node.js 将在内部队列化写入 Socket 的数据，并在可能时通过线路发送出去。

此内部缓冲的后果是内存可能会增长。遇到大型或不断增长的 `bufferSize` 的用户应尝试使用 [`socket.pause()`][] 和 [`socket.resume()`][] 在其程序中“限制”数据流。

### `socket.bytesRead`

<!-- YAML
added: v0.5.3
-->

* 类型：{整数}

接收的字节数。

### `socket.bytesWritten`

<!-- YAML
added: v0.5.3
-->

* 类型：{integer}

发送的字节数。

### `socket.connect()`

在给定的 Socket 上发起连接。

可能的签名：

* [`socket.connect(options[, connectListener])`][`socket.connect(options)`]
* [`socket.connect(path[, connectListener])`][`socket.connect(path)`]
  用于 [IPC][] 连接。
* [`socket.connect(port[, host][, connectListener])`][`socket.connect(port)`]
  用于 TCP 连接。
* 返回：{net.Socket} Socket 本身。

此函数是异步的。当连接建立时，将发出 [`'connect'`][] 事件。如果连接有问题，将发出 [`'error'`][] 事件而不是 [`'connect'`][] 事件，错误将传递给 [`'error'`][] 监听器。
最后一个参数 `connectListener`，如果提供，将作为 [`'connect'`][] 事件的监听器添加**一次**。

此函数仅应用于在发出 `'close'` 后重新连接 Socket，否则可能导致未定义的行为。

#### `socket.connect(options[, connectListener])`

<!-- YAML
added: v0.1.90
changes:
  - version:
      - v20.0.0
      - v18.18.0
    pr-url: https://github.com/nodejs/node/pull/46790
    description: "autoSelectFamily 选项的默认值现在为 true。`--enable-network-family-autoselection` CLI 标志已重命名为`--network-family-autoselection`。旧名称现在是别名，但不推荐使用。"
  - version: v19.4.0
    pr-url: https://github.com/nodejs/node/pull/45777
    description: "autoSelectFamily 选项的默认值可以在运行时使用 `setDefaultAutoSelectFamily` 更改或通过命令行选项 `--enable-network-family-autoselection` 更改。"
  - version:
      - v19.3.0
      - v18.13.0
    pr-url: https://github.com/nodejs/node/pull/44731
    description: "添加了 `autoSelectFamily` 选项。"
  - version:
    - v17.7.0
    - v16.15.0
    pr-url: https://github.com/nodejs/node/pull/41310
    description: "现在支持 `noDelay`、`keepAlive` 和 `keepAliveInitialDelay` 选项。"
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/6021
    description: "现在所有情况下 `hints` 选项的默认值均为 `0`。以前，在没有 `family` 选项的情况下，它默认为 `dns.ADDRCONFIG | dns.V4MAPPED`。"
  - version: v5.11.0
    pr-url: https://github.com/nodejs/node/pull/6000
    description: "现在支持 `hints` 选项。"
-->

* `options` {Object}
* `connectListener` {Function} [`socket.connect()`][] 方法的通用参数。将作为 [`'connect'`][] 事件的监听器添加一次。
* 返回：{net.Socket} Socket 本身。

在给定的 Socket 上发起连接。通常不需要此方法，Socket 应使用 [`net.createConnection()`][] 创建和打开。仅在实现自定义 Socket 时使用此方法。

对于 TCP 连接，可用的 `options` 包括：

* `autoSelectFamily` {boolean}：如果设置为 `true`，则启用一个族自动检测算法，该算法大致实现了 [RFC 8305][] 的第 5 节。传递给查找的 `all` 选项设置为 `true`，Socket 尝试按顺序连接所有获取的 IPv6 和 IPv4 地址，直到建立连接。首先尝试返回的第一个 AAAA 地址，然后返回的第一个 A 地址，然后返回的第二个 AAAA 地址，依此类推。每个连接尝试（最后一个除外）在超时并尝试下一个地址之前，将获得 `autoSelectFamilyAttemptTimeout` 选项指定的时间量。如果 `family` 选项不是 `0` 或设置了 `localAddress`，则忽略。如果至少有一个连接成功，则不会发出连接错误。如果所有连接尝试都失败，则发出一个包含所有失败尝试的单个 `AggregateError`。**默认值：**
  [`net.getDefaultAutoSelectFamily()`][]。
* `autoSelectFamilyAttemptTimeout` {number}：在使用 `autoSelectFamily` 选项时，在尝试下一个地址之前等待连接尝试完成的毫秒数。如果设置为小于 `10` 的正整数，则将使用值 `10`。**默认值：**
  [`net.getDefaultAutoSelectFamilyAttemptTimeout()`][]。
* `family` {number}：IP 栈版本。必须是 `4`、`6` 或 `0`。值 `0` 表示允许 IPv4 和 IPv6 地址。**默认值：** `0`。
* `hints` {number} 可选的 [`dns.lookup()` 提示][]。
* `host` {string} Socket 应连接的主机。**默认值：** `'localhost'`。
* `localAddress` {string} Socket 应连接的本地地址。
* `localPort` {number} Socket 应连接的本地端口。
* `lookup` {Function} 自定义查找函数。**默认值：** [`dns.lookup()`][]。
* `port` {number} 必需。Socket 应连接的端口。

对于 [IPC][] 连接，可用的 `options` 包括：

* `path` {string} 必需。客户端应连接的路径。
  详见 [识别 IPC 连接的路径][]。如果提供，则忽略上述 TCP 特定选项。

#### `socket.connect(path[, connectListener])`

* `path` {string} 客户端应连接的路径。详见
  [识别 IPC 连接的路径][]。
* `connectListener` {Function} [`socket.connect()`][] 方法的通用参数。将作为 [`'connect'`][] 事件的监听器添加一次。
* 返回：{net.Socket} Socket 本身。

在给定的 Socket 上发起 [IPC][] 连接。

别名于
[`socket.connect(options[, connectListener])`][`socket.connect(options)`]
调用时 `{ path: path }` 作为 `options`。

#### `socket.connect(port[, host][, connectListener])`

<!-- YAML
added: v0.1.90
-->

* `port` {number} 客户端应连接的端口。
* `host` {string} 客户端应连接的主机。
* `connectListener` {Function} [`socket.connect()`][] 方法的通用参数。将作为 [`'connect'`][] 事件的监听器添加一次。
* 返回：{net.Socket} Socket 本身。

在给定的 Socket 上发起 TCP 连接。

别名于
[`socket.connect(options[, connectListener])`][`socket.connect(options)`]
调用时 `{port: port, host: host}` 作为 `options`。

### `socket.connecting`

<!-- YAML
added: v6.1.0
-->

* 类型：{boolean}

如果为 `true`，
[`socket.connect(options[, connectListener])`][`socket.connect(options)`] 已
调用但尚未完成。它将保持 `true` 直到 Socket 连接，然后设置为 `false` 并发出 `'connect'` 事件。注意
[`socket.connect(options[, connectListener])`][`socket.connect(options)`]
回调是 `'connect'` 事件的监听器。

### `socket.destroy([error])`

<!-- YAML
added: v0.1.90
-->

* `error` {Object}
* 返回：{net.Socket}

确保此 Socket 上不再发生 I/O 活动。
销毁流并关闭连接。

详见 [`writable.destroy()`][] 以获取更多详情。

### `socket.destroyed`

* 类型：{boolean} 指示连接是否已销毁。一旦连接被销毁，不能再使用它传输任何数据。

详见 [`writable.destroyed`][] 以获取更多详情。

### `socket.destroySoon()`

<!-- YAML
added: v0.3.4
-->

在所有数据写入后销毁 Socket。如果 `'finish'` 事件已经发出，则立即销毁 Socket。如果 Socket 仍可写，则隐式调用 `socket.end()`。

### `socket.end([data[, encoding]][, callback])`

<!-- YAML
added: v0.1.90
-->

* `data` {string|Buffer|Uint8Array}
* `encoding` {string} 仅当数据为 `string` 时使用。**默认值：** `'utf8'`。
* `callback` {Function} Socket 完成时的可选回调。
* 返回：{net.Socket} Socket 本身。

半关闭 Socket。即，它发送一个 FIN 包。服务器可能仍会发送一些数据。

详见 [`writable.end()`][] 以获取更多详情。

### `socket.localAddress`

<!-- YAML
added: v0.9.6
-->

* 类型：{string}

远程客户端连接的本地 IP 地址的字符串表示。例如，在监听 `'0.0.0.0'` 的服务器中，如果客户端在 `'192.168.1.1'` 上连接，则 `socket.localAddress` 的值将是 `'192.168.1.1'`。

### `socket.localPort`

<!-- YAML
added: v0.9.6
-->

* 类型：{integer}

本地端口的数字表示。例如，`80` 或 `21`。

### `socket.localFamily`

<!-- YAML
added:
  - v18.8.0
  - v16.18.0
-->

* 类型：{string}

本地 IP 族的字符串表示。`'IPv4'` 或 `'IPv6'`。

### `socket.pause()`

* 返回：{net.Socket} Socket 本身。

暂停数据读取。即，[`'data'`][] 事件将不会发出。
可用于限制上传。

### `socket.pending`

<!-- YAML
added:
 - v11.2.0
 - v10.16.0
-->

* 类型：{boolean}

如果 Socket 尚未连接，则为 `true`，要么是因为 `.connect()` 尚未调用，要么是因为它仍在连接过程中（详见 [`socket.connecting`][]）。

### `socket.ref()`

<!-- YAML
added: v0.9.1
-->

* 返回：{net.Socket} Socket 本身。

`unref()` 的反义词，在先前 `unref` 的 Socket 上调用 `ref()` 将 _不_ 允许程序退出，如果它是唯一剩下的 Socket（默认行为）。如果 Socket 已 `ref`，再次调用 `ref` 将无效。

### `socket.remoteAddress`

<!-- YAML
added: v0.5.10
-->

* 类型：{string}

远程 IP 地址的字符串表示。例如，
`'74.125.127.100'` 或 `'2001:4860:a005::68'`。如果 Socket 已销毁（例如，如果客户端断开连接），值可能为 `undefined`。

### `socket.remoteFamily`

<!-- YAML
added: v0.11.14
-->

* 类型：{string}

远程 IP 家族的字符串表示。`'IPv4'` 或 `'IPv6'`。如果 Socket 已销毁（例如，如果客户端断开连接），值可能为 `undefined`。

### `socket.remotePort`

<!-- YAML
added: v0.5.10
-->

* 类型：{integer}

远程端口的数字表示。例如，`80` 或 `21`。如果 Socket 已销毁（例如，如果客户端断开连接），值可能为 `undefined`。

### `socket.resetAndDestroy()`

<!-- YAML
added:
  - v18.3.0
  - v16.17.0
-->

* 返回：{net.Socket}

通过发送 RST 包关闭 TCP 连接并销毁流。
如果此 TCP Socket 处于连接状态，它将在连接后发送 RST 包并销毁此 TCP Socket。
否则，它将使用 `ERR_SOCKET_CLOSED` 错误调用 `socket.destroy`。
如果这不是 TCP Socket（例如，管道），调用此方法将立即抛出 `ERR_INVALID_HANDLE_TYPE` 错误。

### `socket.resume()`

* 返回：{net.Socket} Socket 本身。

在调用 [`socket.pause()`][] 后恢复读取。

### `socket.setEncoding([encoding])`

<!-- YAML
added: v0.1.90
-->

* `encoding` {string}
* 返回：{net.Socket} Socket 本身。

将 Socket 的编码设置为 [可读流][]。详见
[`readable.setEncoding()`][] 以获取更多信息。

### `socket.setKeepAlive()`

启用/禁用 keep-alive 功能，并可选择配置 keepalive 探测时序。返回该 socket 本身。

可能的签名：

* [`socket.setKeepAlive([options])`][`socket.setKeepAlive(options)`]
* [`socket.setKeepAlive([enable][, initialDelay][, interval][, count])`][`socket.setKeepAlive(enable)`]

启用 keep-alive 会设置在空闲 socket 上发送第一条 keepalive 探测之前的初始延迟。

设置 `initialDelay`（以毫秒为单位）可设置最后一个接收到的数据包与第一条 keepalive 探测之间的延迟。为 `0` 设置 `initialDelay` 将保持该值不变，仍使用默认值（或之前的）设置。

设置 `interval`（以毫秒为单位）可设置 keepalive 探测开始后连续探测之间的延迟（`TCP_KEEPINTVL`）。将 `count` 设置为在连接被断开前发送但未得到确认的探测次数（`TCP_KEEPCNT`）。这两个参数仅在启用 keep-alive 时生效。省略 `interval` 或 `count` 时，分别使用 `1000` 毫秒和 `10` 的默认值。与 `initialDelay` 一样，非正的 `interval` 或 `count` 会使相应的系统默认值保持不变。

`initialDelay` 和 `interval` 以毫秒为单位指定，但底层 socket 选项会按整秒配置；在应用之前，这些值会除以 `1000` 并向下取整。

启用 keep-alive 功能将设置以下 socket 选项：

* `SO_KEEPALIVE=1`
* `TCP_KEEPIDLE=initialDelay / 1000`
* `TCP_KEEPCNT=count`
* `TCP_KEEPINTVL=interval / 1000`

在早于 build 1709 的 Windows 版本上，keep-alive 通过 `SIO_KEEPALIVE_VALS` 配置，它没有探测计数字段，因此在这些平台上会忽略 `count`。

#### `socket.setKeepAlive([options])`

<!-- YAML
added: v26.4.0
-->

* `options` {Object}
  * `enable` {boolean} **默认值：** `false`
  * `initialDelay` {number} **默认值：** `0`
  * `interval` {number} **默认值：** `1000`
  * `count` {number} **默认值：** `10`
* 返回值：{net.Socket} 该 socket 本身。

使用选项对象配置 keep-alive。有关每个属性的说明，请参见 [`socket.setKeepAlive()`][]。

```js
socket.setKeepAlive({ enable: true, initialDelay: 1000, interval: 1000, count: 10 });
```

#### `socket.setKeepAlive([enable][, initialDelay][, interval][, count])`

<!-- YAML
added: v0.1.92
changes:
  - version: v26.4.0
    pr-url: https://github.com/nodejs/node/pull/63825
    description: 添加了用于配置 `TCP_KEEPINTVL` 和 `TCP_KEEPCNT` 的 `interval` 和 `count` 参数。
  - version:
    - v13.12.0
    - v12.17.0
    pr-url: https://github.com/nodejs/node/pull/32204
    description: "添加了 `TCP_KEEPCNT` 和 `TCP_KEEPINTVL` Socket 选项的新默认值。"
-->

* `enable` {boolean} **默认值：** `false`
* `initialDelay` {number} **默认值：** `0`
* `interval` {number} **默认值：** `1000`
* `count` {number} **默认值：** `10`
* 返回：{net.Socket} Socket 本身。

使用位置参数配置保持活动。有关每个参数的说明，请参见
[`socket.setKeepAlive()`][].

### `socket.setNoDelay([noDelay])`

<!-- YAML
added: v0.1.90
-->

* `noDelay` {boolean} **默认值：** `true`
* 返回：{net.Socket} Socket 本身。

启用/禁用 Nagle 算法的使用。

创建 TCP 连接时，将启用 Nagle 算法。

Nagle 算法在网络发送之前延迟数据。它试图以延迟为代价优化吞吐量。

为 `noDelay` 传递 `true` 或不传递参数将禁用 Socket 的 Nagle 算法。为 `noDelay` 传递 `false` 将启用 Nagle 算法。

### `socket.setTimeout(timeout[, callback])`

<!-- YAML
added: v0.1.90
changes:
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41678
    description: "现在向 `callback` 参数传递无效的回调会抛出 `ERR_INVALID_ARG_TYPE` 而不是`ERR_INVALID_CALLBACK`。"
-->

* `timeout` {number}
* `callback` {Function}
* 返回：{net.Socket} Socket 本身。

设置 Socket 在 Socket 上不活动 `timeout` 毫秒后超时。默认情况下 `net.Socket` 没有超时。

当触发空闲超时时，Socket 将收到 [`'timeout'`][] 事件，但连接不会被切断。用户必须手动调用 [`socket.end()`][] 或 [`socket.destroy()`][] 来结束连接。

```js
socket.setTimeout(3000);
socket.on('timeout', () => {
  console.log('socket timeout');
  socket.end();
});
```

如果 `timeout` 为 0，则禁用现有的空闲超时。

可选的 `callback` 参数将作为 [`'timeout'`][] 事件的一次性监听器添加。

### `socket.getTypeOfService()`

<!-- YAML
added:
 - v25.6.0
 - v24.15.0
-->

* 返回：{integer} 当前的 TOS 值。

返回此 Socket 的 IPv4 数据包的当前服务类型 (TOS) 字段或 IPv6 数据包的流量类别。

`setTypeOfService()` 可以在 Socket 连接之前调用；值将被缓存并在 Socket 建立连接时应用。
`getTypeOfService()` 甚至在连接之前也会返回当前设置的值。

在某些平台（例如，Linux）上，某些 TOS/ECN 位可能被屏蔽或忽略，并且行为在 IPv4 和 IPv6 或双栈 Socket 之间可能不同。调用者应验证特定于平台的语义。

### `socket.setTypeOfService(tos)`

<!-- YAML
added:
 - v25.6.0
 - v24.15.0
-->

* `tos` {integer} The TOS value to set (0-255).
* Returns: {net.Socket} The Socket itself.

Sets the Type of Service (TOS) field for IPv4 packets or the traffic class for IPv6 packets sent from this Socket. This can be used to prioritize network traffic.

`setTypeOfService()` can be called before the Socket is connected; the value will be cached and applied when the Socket establishes a connection.
`getTypeOfService()` returns the current setting even before connection.

On some platforms, such as Linux, certain TOS/ECN bits may be masked or ignored, and behavior may differ between IPv4 and IPv6 or dual-stack sockets. Callers should verify platform-specific semantics.

### `socket.timeout`

<!-- YAML
added: v10.7.0
-->

* 类型：{number|undefined}

由 [`socket.setTimeout()`][] 设置的 Socket 超时（毫秒）。
如果未设置超时，则为 `undefined`。

### `socket.unref()`

<!-- YAML
added: v0.9.1
-->

* 返回：{net.Socket} Socket 本身。

在 Socket 上调用 `unref()` 将允许程序退出，如果这是事件系统中唯一活动的 Socket。如果 Socket 已经 `unref`，再次调用 `unref()` 将无效。

### `socket.write(data[, encoding][, callback])`

<!-- YAML
added: v0.1.90
-->

* `data` {string|Buffer|Uint8Array}
* `encoding` {string} 仅当数据为 `string` 时使用。**默认值：** `utf8`。
* `callback` {Function}
* 返回：{boolean}

在 Socket 上发送数据。第二个参数指定字符串情况下的编码。默认为 UTF8 编码。

如果整个数据成功刷新到内核缓冲区，则返回 `true`。如果全部或部分数据排队在用户内存中，则返回 `false`。当缓冲区再次空闲时，将发出 [`'drain'`][]。

可选的 `callback` 参数将在数据最终写出时执行，这可能不是立即的。

详见 `Writable` 流 [`write()`][stream_writable_write] 方法以获取更多信息。

### `socket.readyState`

<!-- YAML
added: v0.5.0
-->

* 类型：{string}

此属性表示连接的状态（字符串）。

* 如果流正在连接，`socket.readyState` 为 `opening`。
* 如果流可读且可写，则为 `open`。
* 如果流可读但不可写，则为 `readOnly`。
* 如果流不可读但可写，则为 `writeOnly`。

## 类：`net.BoundSocket`

<!-- YAML
added: v26.4.0
-->

允许同步创建一个预绑定的套接字，之后可以将其传递给 `listen()` 或 `new net.Socket()`。对于 `listen()`，这可实现同步端口预留；而对于 `new net.Socket()`，它允许通过 `bind(2)` 语义来控制本地出站端口/IP。

接管会转移套接字的所有权；之后 `address()` 和 `close()` 会抛出 [`ERR_SOCKET_HANDLE_ADOPTED`][]。从未被接管的句柄必须关闭，以避免泄漏套接字。

```mjs
import net from 'node:net';

const bound = new net.BoundSocket();
const { port } = bound.address();
console.log(`为服务器预留端口 ${port}`);

const server = net.createServer();
server.listen(bound); // 作为服务器接管，或者改为传给 new net.Socket()。
```

### `new net.BoundSocket([options])`

<!-- YAML
added: v26.4.0
-->

* `options` {Object}
  * `host` {string} 要绑定的本地地址。必须是数值型 IP 字面量；不会执行 DNS
    解析。**默认：** `'0.0.0.0'`，或者当 `ipv6Only` 为
    `true` 时为 `'::'`。
  * `port` {number} 本地端口。`0` 请求由操作系统分配的临时端口。
    **默认：** `0`。
  * `ipv6Only` {boolean} 设置 `IPV6_V6ONLY`，禁用双栈支持，因此
    套接字仅绑定 IPv6。仅在绑定 IPv6 时有意义。**默认：**
    `false`。
  * `reusePort` {boolean} 设置 `SO_REUSEPORT`，允许多个套接字绑定
    相同的地址和端口，以便在内核级别进行负载均衡。是否支持取决于
    平台。**默认：** `false`。

### `boundSocket.address()`

<!-- YAML
added: v26.4.0
-->

* 返回：{Object} 一个包含 `address`、`family` 和 `port` 属性的对象，
  如 [`server.address()`][] 返回。

返回已绑定的本地地址。当使用 `port: 0` 绑定时，`port` 是操作系统分配的临时端口。

### `boundSocket.fd()`

<!-- YAML
added: v26.4.0
-->

* 返回：{integer} 底层操作系统文件描述符；在不向套接字暴露文件描述符的平台上（例如 Windows），则为 `-1`。

返回已绑定套接字的文件描述符。其所有权仍归 `BoundSocket` 所有，因此调用方不得关闭该描述符。
该描述符仅在句柄被接管之前可用；之后它属于接管它的 [`net.Server`][] 或 [`net.Socket`][]，并且 `fd()` 会抛出
[`ERR_SOCKET_HANDLE_ADOPTED`][]。

### `boundSocket.close()`

<!-- YAML
added: v26.4.0
-->

释放已绑定的套接字。仅在句柄从未被接管时需要。

### `boundSocket[Symbol.dispose]()``

<!-- YAML
added: v26.4.0
-->

如果句柄尚未被接管或关闭，则关闭它；否则不执行任何操作。

## `net.connect()`

别名于
[`net.createConnection()`][`net.createConnection()`]。

可能的签名：

* [`net.connect(options[, connectListener])`][`net.connect(options)`]
* [`net.connect(path[, connectListener])`][`net.connect(path)`] 用于 [IPC][] 连接。
* [`net.connect(port[, host][, connectListener])`][`net.connect(port, host)`] 用于 TCP 连接。

### `net.connect(options[, connectListener])`

<!-- YAML
added: v0.7.0
-->

* `options` {对象}
* `connectListener` {函数}
* 返回：{net.Socket}

别名于
[`net.createConnection(options[, connectListener])`][`net.createConnection(options)`]。

### `net.connect(path[, connectListener])`

<!-- YAML
added: v0.1.90
-->

* `path` {字符串}
* `connectListener` {函数}
* 返回：{net.Socket}

别名于
[`net.createConnection(path[, connectListener])`][`net.createConnection(path)`]。

### `net.connect(port[, host][, connectListener])`

<!-- YAML
added: v0.1.90
-->

* `port` {数字}
* `host` {字符串}
* `connectListener` {函数}
* 返回：{net.Socket}

别名于
[`net.createConnection(port[, host][, connectListener])`][`net.createConnection(port, host)`]】【。

## `net.createConnection()`

这是一个工厂函数，它创建一个新的 [`net.Socket`][]，
立即使用 [`socket.connect()`][] 发起连接，
然后返回启动连接的 `net.Socket`。

当连接建立时，将在返回的套接字上发出 [`'connect'`][] 事件。
最后一个参数 `connectListener`，如果提供，将作为 [`'connect'`][] 事件的监听器被添加 **一次**。

可能的签名：

* [`net.createConnection(options[, connectListener])`][`net.createConnection(options)`]
* [`net.createConnection(path[, connectListener])`][`net.createConnection(path)`]
  用于 [IPC][] 连接。
* [`net.createConnection(port[, host][, connectListener])`][`net.createConnection(port, host)`]
  用于 TCP 连接。

[`net.connect()`][] 函数是此函数的别名。

### `net.createConnection(options[, connectListener])`

<!-- YAML
added: v0.1.90
-->

* `options` {Object} 必需。将被传递给
  [`new net.Socket([options])`][`new net.Socket(options)`] 调用和
  [`socket.connect(options[, connectListener])`][`socket.connect(options)`]
  方法。
* `connectListener` {Function} [`net.createConnection()`][] 函数的通用参数。如果提供，将作为
  返回的套接字上的 [`'connect'`][] 事件的监听器被添加一次。
* 返回：{net.Socket} 用于启动连接的新创建的套接字。

可用选项参见
[`new net.Socket([options])`][`new net.Socket(options)`]
和 [`socket.connect(options[, connectListener])`][`socket.connect(options)`]。

其他选项：

* `handle` {net.BoundSocket} 预绑定的 [`BoundSocket`][]，用作
  连接的源绑定，并遵循其本地地址和端口。采用后会消耗该绑定套接字（参见[所有权转移][`BoundSocket`]）。
* `timeout` {number} 如果设置，将用于在套接字创建后、
  开始连接之前调用 [`socket.setTimeout(timeout)`][]。

以下是 [`net.createServer()`][] 部分描述的回显服务器的客户端示例：

```mjs
import net from 'node:net';
const client = net.createConnection({ port: 8124 }, () => {
  // `'connect'` 监听器。
  console.log('已连接到服务器！');
  client.write('world!\r\n');
});
client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});
client.on('end', () => {
  console.log('已与服务器断开连接');
});
```

```cjs
const net = require('node:net');
const client = net.createConnection({ port: 8124 }, () => {
  // `'connect'` 监听器。
  console.log('已连接到服务器！');
  client.write('world!\r\n');
});
client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});
client.on('end', () => {
  console.log('已与服务器断开连接');
});
```

要连接到套接字 `/tmp/echo.sock`：

```js
const client = net.createConnection({ path: '/tmp/echo.sock' });
```

以下是使用 `port` 和 `onread` 选项的客户端示例。
在这种情况下，`onread` 选项将仅用于调用
`new net.Socket([options])`，而 `port` 选项将用于
调用 `socket.connect(options[, connectListener])`。

```mjs
import net from 'node:net';
import { Buffer } from 'node:buffer';
net.createConnection({
  port: 8124,
  onread: {
    // 为每次从套接字读取重用 4KiB Buffer。
    buffer: Buffer.alloc(4 * 1024),
    callback: function(nread, buf) {
      // 接收到的数据在 `buf` 中从 0 到 `nread` 可用。
      console.log(buf.toString('utf8', 0, nread));
    },
  },
});
```

```cjs
const net = require('node:net');
net.createConnection({
  port: 8124,
  onread: {
    // 为每次从套接字读取重用 4KiB Buffer。
    buffer: Buffer.alloc(4 * 1024),
    callback: function(nread, buf) {
      // 接收到的数据在 `buf` 中从 0 到 `nread` 可用。
      console.log(buf.toString('utf8', 0, nread));
    },
  },
});
```

### 发起 IPC 连接

<!-- YAML
added: v0.1.90
-->

* `path` {string} 套接字应连接到的路径。将被传递给
  [`socket.connect(path[, connectListener])`][`socket.connect(path)`]。
  参见 [识别 IPC 连接的路径][]。
* `connectListener` {Function} [`net.createConnection()`][] 函数的通用参数，
  发起套接字上的 `'connect'` 事件的“一次性”监听器。将被传递给
  [`socket.connect(path[, connectListener])`][`socket.connect(path)`]。
* 返回：{net.Socket} 用于启动连接的新创建的套接字。

发起一个 [IPC][] 连接。

此函数创建一个所有选项设置为默认值的新 [`net.Socket`][]，
立即使用
[`socket.connect(path[, connectListener])`][`socket.connect(path)`] 发起连接，
然后返回启动连接的 `net.Socket`。

### 发起 TCP 连接

<!-- YAML
added: v0.1.90
-->

* `port` {number} 套接字应连接到的端口。将被传递给
  [`socket.connect(port[, host][, connectListener])`][`socket.connect(port)`]。
* `host` {string} 套接字应连接到的主机。将被传递给
  [`socket.connect(port[, host][, connectListener])`][`socket.connect(port)`]。
  **默认值：** `'localhost'`。
* `connectListener` {Function} [`net.createConnection()`][] 函数的通用参数，
  发起套接字上的 `'connect'` 事件的“一次性”监听器。将被传递给
  [`socket.connect(port[, host][, connectListener])`][`socket.connect(port)`]。
* 返回：{net.Socket} 用于启动连接的新创建的套接字。

发起一个 TCP 连接。

此函数创建一个所有选项设置为默认值的新 [`net.Socket`][]，
立即使用
[`socket.connect(port[, host][, connectListener])`][`socket.connect(port)`] 发起连接，
然后返回启动连接的 `net.Socket`。

## `net.createServer([options][, connectionListener])`

<!-- YAML
added: v0.5.0
changes:
  - version:
    - v20.1.0
    - v18.17.0
    pr-url: https://github.com/nodejs/node/pull/47405
    description: "现在支持 `highWaterMark` 选项。"
  - version:
    - v17.7.0
    - v16.15.0
    pr-url: https://github.com/nodejs/node/pull/41310
    description: "现在支持 `noDelay`、`keepAlive` 和 `keepAliveInitialDelay` 选项。"
-->

* `options` {Object}
  * `allowHalfOpen` {boolean} 如果设置为 `false`，则当可读端结束时，套接字将
    自动结束可写端。**默认值：** `false`。
  * `highWaterMark` {number} 可选地覆盖所有 [`net.Socket`][] 的
    `readableHighWaterMark` 和 `writableHighWaterMark`。
    **默认值：** 参见 [`stream.getDefaultHighWaterMark()`][]。
  * `keepAlive` {boolean} 如果设置为 `true`，则在收到新的传入连接后立即
    在套接字上启用保持活跃功能，类似于 [`socket.setKeepAlive()`][] 中所做的。**默认值：**
    `false`。
  * `keepAliveInitialDelay` {number} 如果设置为正数，则设置在空闲套接字上
    发送第一个保持活跃探测之前的初始延迟。**默认值：** `0`。
  * `noDelay` {boolean} 如果设置为 `true`，则在收到新的传入连接后立即
    禁用 Nagle 算法的使用。**默认值：** `false`。
  * `pauseOnConnect` {boolean} 指示是否应在传入连接上暂停套接字。**默认值：** `false`。
  * `blockList` {net.BlockList} `blockList` 可用于禁用对特定 IP 地址、IP 范围或 IP 子网的入站访问。
    如果服务器位于反向代理、NAT 等后面，则此功能不起作用，因为针对阻止列表检查的地址是代理的地址，
    或由 NAT 指定的地址。

* `connectionListener` {Function} 自动设置为 [`'connection'`][] 事件的监听器。

* 返回：{net.Server}

创建一个新的 TCP 或 [IPC][] 服务器。

如果 `allowHalfOpen` 设置为 `true`，当套接字的另一端信号传输结束时，
服务器将仅在显式调用 [`socket.end()`][] 时才发回传输结束信号。
例如，在 TCP 上下文中，当收到 FIN 包时，仅在显式调用 [`socket.end()`][] 时才发回 FIN 包。
在此之前，连接是半关闭的（不可读但仍可写）。
参见 [`'end'`][] 事件和 [RFC 1122][half-closed]（第 4.2.2.13 节）以获取更多信息。

如果 `pauseOnConnect` 设置为 `true`，则与每个传入连接关联的套接字将被暂停，
并且不会从其句柄读取数据。
这允许在进程之间传递连接，而原始进程不读取任何数据。
要开始从暂停的套接字读取数据，调用 [`socket.resume()`][]。

服务器可以是 TCP 服务器或 [IPC][] 服务器，取决于它 [`listen()`][`server.listen()`] 什么。

这是一个监听端口 8124 连接的 TCP 回显服务器示例：

```mjs
import net from 'node:net';
const server = net.createServer((c) => {
  // `'connection'` 监听器。
  console.log('client connected');
  c.on('end', () => {
    console.log('client disconnected');
  });
  c.write('hello\r\n');
  c.pipe(c);
});
server.on('error', (err) => {
  throw err;
});
server.listen(8124, () => {
  console.log('server bound');
});
```

```cjs
const net = require('node:net');
const server = net.createServer((c) => {
  // `'connection'` 监听器。
  console.log('client connected');
  c.on('end', () => {
    console.log('client disconnected');
  });
  c.write('hello\r\n');
  c.pipe(c);
});
server.on('error', (err) => {
  throw err;
});
server.listen(8124, () => {
  console.log('server bound');
});
```

使用 `telnet` 测试：

```bash
telnet localhost 8124
```

要监听套接字 `/tmp/echo.sock`：

```js
server.listen('/tmp/echo.sock', () => {
  console.log('server bound');
});
```

使用 `nc` 连接到 Unix 域套接字服务器：

```bash
nc -U /tmp/echo.sock
```

## `net.getDefaultAutoSelectFamily()`

<!-- YAML
added: v19.4.0
-->

获取 [`socket.connect(options)`][] 的 `autoSelectFamily` 选项的当前默认值。
初始默认值为 `true`，除非提供了命令行选项 `--no-network-family-autoselection`。

* 返回：{boolean} `autoSelectFamily` 选项的当前默认值。

## `net.setDefaultAutoSelectFamily(value)`

<!-- YAML
added: v19.4.0
-->

设置 [`socket.connect(options)`][] 的 `autoSelectFamily` 选项的默认值。

* `value` {boolean} 新的默认值。
  初始默认值为 `true`，除非提供了命令行选项 `--no-network-family-autoselection`。

## `net.getDefaultAutoSelectFamilyAttemptTimeout()`

<!-- YAML
added:
 - v19.8.0
 - v18.18.0
-->

获取 [`socket.connect(options)`][] 的 `autoSelectFamilyAttemptTimeout` 选项的当前默认值。
初始默认值为 `500` 或通过命令行选项 `--network-family-autoselection-attempt-timeout` 指定的值。

* 返回：{number} `autoSelectFamilyAttemptTimeout` 选项的当前默认值。

## `net.setDefaultAutoSelectFamilyAttemptTimeout(value)`

<!-- YAML
added:
 - v19.8.0
 - v18.18.0
-->

设置 [`socket.connect(options)`][] 的 `autoSelectFamilyAttemptTimeout` 选项的默认值。

* `value` {number} 新的默认值，必须是正数。如果数字小于 `10`，则使用值 `10` 代替。初始默认值为 `250` 或通过命令行选项 `--network-family-autoselection-attempt-timeout` 指定的值。

## `net.isIP(input)`

<!-- YAML
added: v0.3.0
-->

* `input` {string}
* 返回：{integer}

如果 `input` 是 IPv6 地址，则返回 `6`。如果 `input` 是 [点分十进制表示法][] 且没有前导零的 IPv4 地址，则返回 `4`。否则，返回 `0`。

```js
net.isIP('::1'); // 返回 6
net.isIP('127.0.0.1'); // 返回 4
net.isIP('127.000.000.001'); // 返回 0
net.isIP('127.0.0.1/24'); // 返回 0
net.isIP('fhqwhgads'); // 返回 0
```

## `net.isIPv4(input)`

<!-- YAML
added: v0.3.0
-->

* `input` {string}
* 返回：{boolean}

如果 `input` 是 [点分十进制表示法][] 且没有前导零的 IPv4 地址，则返回 `true`。否则，返回 `false`。

```js
net.isIPv4('127.0.0.1'); // 返回 true
net.isIPv4('127.000.000.001'); // 返回 false
net.isIPv4('127.0.0.1/24'); // 返回 false
net.isIPv4('fhqwhgads'); // 返回 false
```

## `net.isIPv6(input)`

<!-- YAML
added: v0.3.0
-->

* `input` {string}
* 返回：{boolean}

如果 `input` 是 IPv6 地址，则返回 `true`。否则，返回 `false`。

```js
net.isIPv6('::1'); // 返回 true
net.isIPv6('fhqwhgads'); // 返回 false
```

[IPC]: #ipc-support
[识别 IPC 连接的路径]: #identifying-paths-for-ipc-connections
[RFC 8305]: https://www.rfc-editor.org/rfc/rfc8305.txt
[Readable Stream]: stream.md#class-streamreadable
[Transferring TCP handles to other threads]: #transferring-tcp-handles-to-other-threads
[`'close'`]: #event-close
[`'connect'`]: #event-connect
[`'connection'`]: #event-connection
[`'data'`]: #event-data
[`'drain'`]: #event-drain
[`'end'`]: #event-end
[`'error'`]: #event-error_1
[`'listening'`]: #event-listening
[`'timeout'`]: #event-timeout
[`BoundSocket`]: #class-netboundsocket
[`ERR_SOCKET_HANDLE_ADOPTED`]: errors.md#err_socket_handle_adopted
[`EventEmitter`]: events.md#class-eventemitter
[`child_process.fork()`]: child_process.md#child_processforkmodulepath-args-options
[`dns.lookup()`]: dns.md#dnslookuphostname-options-callback
[`dns.lookup()` hints]: dns.md#supported-getaddrinfo-flags
[`net.Server`]: #class-netserver
[`net.Socket`]: #class-netsocket
[`net.connect()`]: #netconnect
[`net.connect(options)`]: #netconnectoptions-connectlistener
[`net.connect(path)`]: #netconnectpath-connectlistener
[`net.connect(port, host)`]: #netconnectport-host-connectlistener
[`net.createConnection()`]: #netcreateconnection
[`net.createConnection(options)`]: #netcreateconnectionoptions-connectlistener
[`net.createConnection(path)`]: #netcreateconnectionpath-connectlistener
[`net.createConnection(port, host)`]: #netcreateconnectionport-host-connectlistener
[`net.createServer()`]: #netcreateserveroptions-connectionlistener
[`net.getDefaultAutoSelectFamily()`]: #netgetdefaultautoselectfamily
[`net.getDefaultAutoSelectFamilyAttemptTimeout()`]: #netgetdefaultautoselectfamilyattempttimeout
[`new net.Socket(options)`]: #new-netsocketoptions
[`readable.setEncoding()`]: stream.md#readablesetencodingencoding
[`server.address()`]: #serveraddress
[`server.close()`]: #serverclosecallback
[`server.dropMaxConnection`]: #serverdropmaxconnection
[`server.listen()`]: #serverlisten
[`server.listen(handle)`]: #serverlistenhandle-backlog-callback
[`server.listen(options)`]: #serverlistenoptions-callback
[`server.listen(path)`]: #serverlistenpath-backlog-callback
[`server.listen(port)`]: #serverlistenport-host-backlog-callback
[`server.maxConnections`]: #servermaxconnections
[`socket(7)`]: https://man7.org/linux/man-pages/man7/socket.7.html
[`socket.connect()`]: #socketconnect
[`socket.connect(options)`]: #socketconnectoptions-connectlistener
[`socket.connect(path)`]: #socketconnectpath-connectlistener
[`socket.connect(port)`]: #socketconnectport-host-connectlistener
[`socket.connecting`]: #socketconnecting
[`socket.destroy()`]: #socketdestroyerror
[`socket.end()`]: #socketenddata-encoding-callback
[`socket.pause()`]: #socketpause
[`socket.resume()`]: #socketresume
[`socket.setEncoding()`]: #socketsetencodingencoding
[`socket.setKeepAlive()`]: #socketsetkeepalive
[`socket.setKeepAlive(enable)`]: #socketsetkeepaliveenable-initialdelay-interval-count
[`socket.setKeepAlive(options)`]: #socketsetkeepaliveoptions
[`socket.setTimeout()`]: #socketsettimeouttimeout-callback
[`socket.setTimeout(timeout)`]: #socketsettimeouttimeout-callback
[`stream.getDefaultHighWaterMark()`]: stream.md#streamgetdefaulthighwatermarkobjectmode
[`worker_threads`]: worker_threads.md
[`writable.destroy()`]: stream.md#writabledestroyerror
[`writable.destroyed`]: stream.md#writabledestroyed
[`writable.end()`]: stream.md#writableendchunk-encoding-callback
[`writable.writableLength`]: stream.md#writablewritablelength
[点分十进制表示法]: https://en.wikipedia.org/wiki/Dot-decimal_notation
[半关闭]: https://tools.ietf.org/html/rfc1122
[stream_writable_write]: stream.md#writablewritechunk-encoding-callback
[未指定的 IPv4 地址]: https://en.wikipedia.org/wiki/0.0.0.0
[未指定的 IPv6 地址]: https://en.wikipedia.org/wiki/IPv6_address#Unspecified_address
