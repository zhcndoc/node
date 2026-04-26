# 集群

<!--introduced_in=v0.10.0-->

> 稳定性：2 - 稳定

<!-- source_link=lib/cluster.js -->

Node.js 进程集群可用于运行多个 Node.js 实例，这些实例可以在其应用程序线程之间分配负载。当不需要进程隔离时，请改用 [`worker_threads`][] 模块，它允许在单个 Node.js 实例内运行多个应用程序线程。

cluster 模块允许轻松创建所有共享服务器端口的子进程。

```mjs
import cluster from 'node:cluster';
import http from 'node:http';
import { availableParallelism } from 'node:os';
import process from 'node:process';

const numCPUs = availableParallelism();

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // 派生工作进程。
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // 工作进程可以共享任何 TCP 连接
  // 在这种情况下，它是一个 HTTP 服务器
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}
```

```cjs
const cluster = require('node:cluster');
const http = require('node:http');
const numCPUs = require('node:os').availableParallelism();
const process = require('node:process');

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // 派生工作进程。
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // 工作进程可以共享任何 TCP 连接
  // 在这种情况下，它是一个 HTTP 服务器
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}
```

运行 Node.js 现在将在工作进程之间共享端口 8000：

```console
$ node server.js
Primary 3596 is running
Worker 4324 started
Worker 4520 started
Worker 6056 started
Worker 5644 started
```

在 Windows 上，尚无法在工作进程中设置命名管道服务器。

## 工作原理

<!--type=misc-->

工作进程是使用 [`child_process.fork()`][] 方法生成的，以便它们可以通过 IPC 与父进程通信并来回传递服务器句柄。

cluster 模块支持两种分发传入连接的方法。

第一种（除 Windows 外所有平台上的默认方法）是轮询方式，主进程监听端口，接受新连接并以轮询方式将它们分配给工作进程，内置了一些智能机制以避免工作进程过载。

第二种方法是主进程创建监听套接字并将其发送给感兴趣的工作进程。然后工作进程直接接受传入连接。

第二种方法理论上应该提供最佳性能。然而在实践中，由于操作系统调度器的变化，分布往往非常不平衡。观察到有些负载情况下，总共八个进程中，超过 70% 的连接最终只进入了两个进程。

因为 `server.listen()` 将大部分工作移交给主进程，所以在普通 Node.js 进程和集群工作进程之间，行为有三种情况不同：

1. `server.listen({fd: 7})` 因为消息传递给主进程，**父进程中**的文件描述符 7 将被监听，句柄传递给工作进程，而不是监听工作进程认为数字 7 文件描述符引用的内容。
2. `server.listen(handle)` 显式监听句柄会导致工作进程使用提供的句柄，而不是与主进程通信。
3. `server.listen(0)` 通常，这将导致服务器监听随机端口。然而，在集群中，每个工作进程每次执行 `listen(0)` 时都会收到相同的“随机”端口。本质上，端口第一次是随机的，但之后是可预测的。要监听唯一端口，请基于集群工作进程 ID 生成端口号。

Node.js 不提供路由逻辑。因此，重要的是设计应用程序，使其不过度依赖内存中的数据对象来处理会话和登录等事务。

因为工作进程都是独立的进程，所以可以根据程序的需要杀死或重新生成它们，而不影响其他工作进程。只要还有一些工作进程存活，服务器将继续接受连接。如果没有工作进程存活，现有连接将被丢弃，新连接将被拒绝。然而，Node.js 不会自动管理工作进程的数量。应用程序有责任根据其自身需求管理工作进程池。

虽然 `node:cluster` 模块的主要用例是网络，但它也可用于其他需要工作进程的用例。

## 类：`Worker`

<!-- YAML
added: v0.7.0
-->

* 继承：{EventEmitter}

Worker 对象包含有关工作进程的所有公共信息和方法。在主进程中，可以使用 `cluster.workers` 获取。在工作进程中，可以使用 `cluster.worker` 获取。

### 事件：`'disconnect'`

<!-- YAML
added: v0.7.7
-->

类似于 `cluster.on('disconnect')` 事件，但特定于该工作进程。

```js
cluster.fork().on('disconnect', () => {
  // 工作进程已断开连接
});
```

### 事件：`'error'`

<!-- YAML
added: v0.7.3
-->

此事件与 [`child_process.fork()`][] 提供的事件相同。

在工作进程内，也可以使用 `process.on('error')`。

### 事件：`'exit'`

<!-- YAML
added: v0.11.2
-->

* `code` {number} 退出码，如果是正常退出。
* `signal` {string} 导致进程被杀死的信号名称（例如 `'SIGHUP'`）。

类似于 `cluster.on('exit')` 事件，但特定于该工作进程。

```mjs
import cluster from 'node:cluster';

if (cluster.isPrimary) {
  const worker = cluster.fork();
  worker.on('exit', (code, signal) => {
    if (signal) {
      console.log(`worker was killed by signal: ${signal}`);
    } else if (code !== 0) {
      console.log(`worker exited with error code: ${code}`);
    } else {
      console.log('worker success!');
    }
  });
}
```

```cjs
const cluster = require('node:cluster');

if (cluster.isPrimary) {
  const worker = cluster.fork();
  worker.on('exit', (code, signal) => {
    if (signal) {
      console.log(`worker was killed by signal: ${signal}`);
    } else if (code !== 0) {
      console.log(`worker exited with error code: ${code}`);
    } else {
      console.log('worker success!');
    }
  });
}
```

### 事件：`'listening'`

<!-- YAML
added: v0.7.0
-->

* `address` {Object}

类似于 `cluster.on('listening')` 事件，但特定于该工作进程。

```mjs
cluster.fork().on('listening', (address) => {
  // 工作进程正在监听
});
```

```cjs
cluster.fork().on('listening', (address) => {
  // 工作进程正在监听
});
```

它不会在工作进程中发出。

### 事件：`'message'`

<!-- YAML
added: v0.7.0
-->

* `message` {Object}
* `handle` {undefined|Object}

类似于 `cluster` 的 `'message'` 事件，但特定于该工作进程。

在工作进程内，也可以使用 `process.on('message')`。

参见 [`process` 事件：`'message'`][]。

这是一个使用消息系统的示例。它在主进程中保持计数，统计工作进程接收到的 HTTP 请求数量：

```mjs
import cluster from 'node:cluster';
import http from 'node:http';
import { availableParallelism } from 'node:os';
import process from 'node:process';

if (cluster.isPrimary) {

  // 跟踪 http 请求
  let numReqs = 0;
  setInterval(() => {
    console.log(`numReqs = ${numReqs}`);
  }, 1000);

  // 计数请求
  function messageHandler(msg) {
    if (msg.cmd && msg.cmd === 'notifyRequest') {
      numReqs += 1;
    }
  }

  // 启动工作进程并监听包含 notifyRequest 的消息
  const numCPUs = availableParallelism();
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  for (const id in cluster.workers) {
    cluster.workers[id].on('message', messageHandler);
  }

} else {

  // 工作进程有一个 http 服务器。
  http.Server((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');

    // 通知主进程关于请求
    process.send({ cmd: 'notifyRequest' });
  }).listen(8000);
}
```

```cjs
const cluster = require('node:cluster');
const http = require('node:http');
const numCPUs = require('node:os').availableParallelism();
const process = require('node:process');

if (cluster.isPrimary) {

  // 跟踪 http 请求
  let numReqs = 0;
  setInterval(() => {
    console.log(`numReqs = ${numReqs}`);
  }, 1000);

  // 计数请求
  function messageHandler(msg) {
    if (msg.cmd && msg.cmd === 'notifyRequest') {
      numReqs += 1;
    }
  }

  // 启动工作进程并监听包含 notifyRequest 的消息
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  for (const id in cluster.workers) {
    cluster.workers[id].on('message', messageHandler);
  }

} else {

  // 工作进程有一个 http 服务器。
  http.Server((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');

    // 通知主进程关于请求
    process.send({ cmd: 'notifyRequest' });
  }).listen(8000);
}
```

### 事件：`'online'`

<!-- YAML
added: v0.7.0
-->

类似于 `cluster.on('online')` 事件，但特定于该工作进程。

```js
cluster.fork().on('online', () => {
  // 工作进程在线
});
```

它不会在工作进程中发出。

### `worker.disconnect()`

<!-- YAML
added: v0.7.7
changes:
  - version: v7.3.0
    pr-url: https://github.com/nodejs/node/pull/10019
    description: "This method now returns a reference to `worker`."
-->

* 返回：{cluster.Worker} 对 `worker` 的引用。

在工作进程中，此函数将关闭所有服务器，等待这些服务器上的 `'close'` 事件，然后断开 IPC 通道。

在主进程中，向工作进程发送内部消息，导致其调用自身的 `.disconnect()`。

导致 `.exitedAfterDisconnect` 被设置。

服务器关闭后，它将不再接受新连接，但任何其他监听的工作进程可能会接受连接。现有连接将允许照常关闭。当不再存在连接时，参见 [`server.close()`][]，通往工作进程的 IPC 通道将关闭，允许其正常退出。

上述内容仅适用于服务器连接，客户端连接不会由工作进程自动关闭，断开连接也不会等待它们关闭后再退出。

在工作进程中，`process.disconnect` 存在，但它不是这个函数；它是 [`disconnect()`][]。

因为长期存在的服务器连接可能会阻止工作进程断开连接，所以发送消息可能很有用，以便采取特定于应用程序的操作来关闭它们。实现超时也可能很有用，如果在一段时间后未发出 `'disconnect'` 事件，则杀死工作进程。

```js
if (cluster.isPrimary) {
  const worker = cluster.fork();
  let timeout;

  worker.on('listening', (address) => {
    worker.send('shutdown');
    worker.disconnect();
    timeout = setTimeout(() => {
      worker.kill();
    }, 2000);
  });

  worker.on('disconnect', () => {
    clearTimeout(timeout);
  });

} else if (cluster.isWorker) {
  const net = require('node:net');
  const server = net.createServer((socket) => {
    // 连接永不结束
  });

  server.listen(8000);

  process.on('message', (msg) => {
    if (msg === 'shutdown') {
      // 启动到服务器的任何连接的正常关闭
    }
  });
}
```

### `worker.exitedAfterDisconnect`

<!-- YAML
added: v6.0.0
-->

* 类型：{boolean}

如果工作进程因 `.disconnect()` 而退出，则此属性为 `true`。如果工作进程以其他方式退出，则为 `false`。如果工作进程尚未退出，则为 `undefined`。

布尔值 [`worker.exitedAfterDisconnect`][] 允许区分自愿和意外退出，主进程可以根据此值选择不重新生成工作进程。

```js
cluster.on('exit', (worker, code, signal) => {
  if (worker.exitedAfterDisconnect === true) {
    console.log('Oh, it was just voluntary – no need to worry');
  }
});

// 杀死工作进程
worker.kill();
```

### `worker.id`

<!-- YAML
added: v0.8.0
-->

* 类型：{integer}

每个新工作进程都被赋予一个唯一的 id，此 id 存储在 `id` 中。

当工作进程存活时，这是在 `cluster.workers` 中索引它的键。

### `worker.isConnected()`

<!-- YAML
added: v0.11.14
-->

如果工作进程通过其 IPC 通道连接到其主进程，则此函数返回 `true`，否则返回 `false`。工作进程创建后连接到其主进程。在发出 `'disconnect'` 事件后断开连接。

### `worker.isDead()`

<!-- YAML
added: v0.11.14
-->

如果工作进程的进程已终止（因为退出或被信号通知），则此函数返回 `true`。否则，它返回 `false`。

```mjs
import cluster from 'node:cluster';
import http from 'node:http';
import { availableParallelism } from 'node:os';
import process from 'node:process';

const numCPUs = availableParallelism();

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // 派生工作进程。
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('fork', (worker) => {
    console.log('worker is dead:', worker.isDead());
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log('worker is dead:', worker.isDead());
  });
} else {
  // 工作进程可以共享任何 TCP 连接。在这种情况下，它是一个 HTTP 服务器。
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`Current process\n ${process.pid}`);
    process.kill(process.pid);
  }).listen(8000);
}
```

```cjs
const cluster = require('node:cluster');
const http = require('node:http');
const numCPUs = require('node:os').availableParallelism();
const process = require('node:process');

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // 派生工作进程。
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('fork', (worker) => {
    console.log('worker is dead:', worker.isDead());
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log('worker is dead:', worker.isDead());
  });
} else {
  // 工作进程可以共享任何 TCP 连接。在这种情况下，它是一个 HTTP 服务器。
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`Current process\n ${process.pid}`);
    process.kill(process.pid);
  }).listen(8000);
}
```

### `worker.kill([signal])`

<!-- YAML
added: v0.9.12
-->

* `signal` {string} 要发送给工作进程的信号名称。**默认值：** `'SIGTERM'`

此函数将杀死工作进程。在主进程中，它通过断开 `worker.process` 来实现，一旦断开，就用 `signal` 杀死。在工作进程中，它通过用 `signal` 杀死进程来实现。

`kill()` 函数杀死工作进程而不等待正常断开连接，它的行为与 `worker.process.kill()` 相同。

此方法别名为 `worker.destroy()` 以向后兼容。

在工作进程中，`process.kill()` 存在，但它不是这个函数；它是 [`kill()`][]。

### `worker.process`

<!-- YAML
added: v0.7.0
-->

* 类型：{ChildProcess}

所有工作进程都是使用 [`child_process.fork()`][] 创建的，此函数返回的对象存储为 `.process`。在工作进程中，存储全局 `process`。

参见：[Child Process 模块][]。

如果 `'disconnect'` 事件发生在 `process` 上且 `.exitedAfterDisconnect` 不为 `true`，工作进程将调用 `process.exit(0)`。这防止了意外断开连接。

### `worker.send(message[, sendHandle[, options]][, callback])`

<!-- YAML
added: v0.7.0
changes:
  - version: v4.0.0
    pr-url: https://github.com/nodejs/node/pull/2620
    description: "The `callback` parameter is supported now."
-->

* `message` {Object}
* `sendHandle` {Handle}
* `options` {Object} 如果存在 `options` 参数，它是一个用于参数化发送某些类型句柄的对象。`options` 支持以下属性：
  * `keepOpen` {boolean} 传递 `net.Socket` 实例时可使用的值。当为 `true` 时，套接字在发送进程中保持打开。**默认值：** `false`。
* `callback` {Function}
* 返回：{boolean}

向工作进程或主进程发送消息，可选带句柄。

在主进程中，这将消息发送给特定工作进程。它与 [`ChildProcess.send()`][] 相同。

在工作进程中，这将消息发送给主进程。它与 `process.send()` 相同。

此示例将回显来自主进程的所有消息：

```js
if (cluster.isPrimary) {
  const worker = cluster.fork();
  worker.send('hi there');

} else if (cluster.isWorker) {
  process.on('message', (msg) => {
    process.send(msg);
  });
}
```

## 事件：`'disconnect'`

<!-- YAML
added: v0.7.9
-->

* `worker` {cluster.Worker}

在工作进程 IPC 通道断开后触发。当工作进程正常退出、被杀死或被手动断开连接（例如使用 `worker.disconnect()`）时，可能会发生这种情况。

`'disconnect'` 和 `'exit'` 事件之间可能会有延迟。这些事件可用于检测进程是否卡在清理中或是否存在长连接。

```js
cluster.on('disconnect', (worker) => {
  console.log(`The worker #${worker.id} has disconnected`);
});
```

## 事件：`'exit'`

<!-- YAML
added: v0.7.9
-->

* `worker` {cluster.Worker}
* `code` {number} 退出码，如果正常退出。
* `signal` {string} 导致进程被终止的信号名称（例如 `'SIGHUP'`）。

当任何工作进程死亡时，集群模块将触发 `'exit'` 事件。

这可用于通过再次调用 [`.fork()`][] 来重启工作进程。

```js
cluster.on('exit', (worker, code, signal) => {
  console.log('worker %d died (%s). restarting...',
              worker.process.pid, signal || code);
  cluster.fork();
});
```

参见 [`child_process` 事件：`'exit'`][]。

## 事件：`'fork'`

<!-- YAML
added: v0.7.0
-->

* `worker` {cluster.Worker}

当 fork 一个新工作进程时，集群模块将触发 `'fork'` 事件。
这可用于记录工作进程活动，并创建自定义超时。

```js
const timeouts = [];
function errorMsg() {
  console.error('Something must be wrong with the connection ...');
}

cluster.on('fork', (worker) => {
  timeouts[worker.id] = setTimeout(errorMsg, 2000);
});
cluster.on('listening', (worker, address) => {
  clearTimeout(timeouts[worker.id]);
});
cluster.on('exit', (worker, code, signal) => {
  clearTimeout(timeouts[worker.id]);
  errorMsg();
});
```

## 事件：`'listening'`

<!-- YAML
added: v0.7.0
-->

* `worker` {cluster.Worker}
* `address` {Object}

在工作进程调用 `listen()` 后，当服务器上触发 `'listening'` 事件时，主进程中的 `cluster` 上也会触发 `'listening'` 事件。

事件处理程序执行时带有两个参数，`worker` 包含工作进程对象，`address` 对象包含以下连接属性：`address`、`port` 和 `addressType`。如果工作进程监听多个地址，这非常有用。

```js
cluster.on('listening', (worker, address) => {
  console.log(
    `A worker is now connected to ${address.address}:${address.port}`);
});
```

`addressType` 是以下之一：

* `4` (TCPv4)
* `6` (TCPv6)
* `-1` (Unix domain socket)
* `'udp4'` 或 `'udp6'` (UDPv4 或 UDPv6)

## 事件：`'message'`

<!-- YAML
added: v2.5.0
changes:
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/5361
    description: "现在传递 `worker` 参数；详见下文。"
-->

* `worker` {cluster.Worker}
* `message` {Object}
* `handle` {undefined|Object}

当集群主进程收到来自任何工作进程的消息时触发。

参见 [`child_process` 事件：`'message'`][]。

## 事件：`'online'`

<!-- YAML
added: v0.7.0
-->

* `worker` {cluster.Worker}

在 fork 一个新工作进程后，工作进程应响应一个 online 消息。
当主进程收到 online 消息时，它将触发此事件。
`'fork'` 和 `'online'` 之间的区别在于，当主进程 fork 一个工作进程时触发 fork，而当工作进程运行时触发 `'online'`。

```js
cluster.on('online', (worker) => {
  console.log('Yay, the worker responded after it was forked');
});
```

## 事件：`'setup'`

<!-- YAML
added: v0.7.1
-->

* `settings` {Object}

每次调用 [`.setupPrimary()`][] 时触发。

`settings` 对象是调用 [`.setupPrimary()`][] 时的 `cluster.settings` 对象，仅供参考，因为可以在单个 tick 中多次调用 [`.setupPrimary()`][]。

如果准确性很重要，请使用 `cluster.settings`。

## `cluster.disconnect([callback])`

<!-- YAML
added: v0.7.7
-->

* `callback` {Function} 当所有工作进程断开连接且句柄关闭时调用。

在 `cluster.workers` 中的每个工作进程上调用 `.disconnect()`。

当它们断开连接时，所有内部句柄都将关闭，如果没有其他事件等待，允许主进程正常死亡。

该方法接受一个可选的回调参数，将在完成时调用。

这只能从主进程调用。

## `cluster.fork([env])`

<!-- YAML
added: v0.6.0
-->

* `env` {Object} 要添加到工作进程环境的键/值对。
* 返回：{cluster.Worker}

生成一个新的工作进程。

这只能从主进程调用。

## `cluster.isMaster`

<!-- YAML
added: v0.8.1
deprecated: v16.0.0
-->

> 稳定性：0 - 已弃用

[`cluster.isPrimary`][] 的已弃用别名。

## `cluster.isPrimary`

<!-- YAML
added: v16.0.0
-->

* 类型：{boolean}

如果进程是主进程则为 true。这由 `process.env.NODE_UNIQUE_ID` 决定。如果 `process.env.NODE_UNIQUE_ID` 为 undefined，则 `isPrimary` 为 `true`。

## `cluster.isWorker`

<!-- YAML
added: v0.6.0
-->

* 类型：{boolean}

如果进程不是主进程则为 true（它是 `cluster.isPrimary` 的否定）。

## `cluster.schedulingPolicy`

<!-- YAML
added: v0.11.2
-->

调度策略，`cluster.SCHED_RR` 表示轮询，`cluster.SCHED_NONE` 表示留给操作系统。这是一个全局设置，一旦生成第一个工作进程或调用 [`.setupPrimary()`][]（以先者为准），实际上就会被冻结。

`SCHED_RR` 是除 Windows 外所有操作系统的默认值。
一旦 libuv 能够有效地分发 IOCP 句柄而不会造成巨大的性能损失，Windows 将改为 `SCHED_RR`。

`cluster.schedulingPolicy` 也可以通过 `NODE_CLUSTER_SCHED_POLICY` 环境变量设置。有效值为 `'rr'` 和 `'none'`。

## `cluster.settings`

<!-- YAML
added: v0.7.1
changes:
  - version:
     - v13.2.0
     - v12.16.0
    pr-url: https://github.com/nodejs/node/pull/30162
    description: "现在支持 `serialization` 选项。"
  - version: v9.5.0
    pr-url: https://github.com/nodejs/node/pull/18399
    description: "现在支持 `cwd` 选项。"
  - version: v9.4.0
    pr-url: https://github.com/nodejs/node/pull/17412
    description: "现在支持 `windowsHide` 选项。"
  - version: v8.2.0
    pr-url: https://github.com/nodejs/node/pull/14140
    description: "现在支持 `inspectPort` 选项。"
  - version: v6.4.0
    pr-url: https://github.com/nodejs/node/pull/7838
    description: "现在支持 `stdio` 选项。"
-->

* 类型：{Object}
  * `execArgv` {string\[]} 传递给 Node.js 可执行文件的字符串参数列表。**默认值：** `process.execArgv`。
  * `exec` {string} 工作进程文件的路径。**默认值：** `process.argv[1]`。
  * `args` {string\[]} 传递给工作进程的字符串参数。**默认值：** `process.argv.slice(2)`。
  * `cwd` {string} 工作进程的当前工作目录。**默认值：** `undefined`（继承自父进程）。
  * `serialization` {string} 指定用于进程间发送消息的序列化类型。可能的值为 `'json'` 和 `'advanced'`。详见 [`child_process` 的高级序列化][]。**默认值：** `false`。
  * `silent` {boolean} 是否将输出发送到父进程的 stdio。**默认值：** `false`。
  * `stdio` {Array} 配置 fork 进程的 stdio。因为集群模块依赖 IPC 来功能，此配置必须包含一个 `'ipc'` 条目。提供此选项时，它将覆盖 `silent`。参见 [`child_process.spawn()`][] 的 [`stdio`][]。
  * `uid` {number} 设置进程的用户身份。（参见 setuid(2)。）
  * `gid` {number} 设置进程的组身份。（参见 setgid(2)。）
  * `inspectPort` {number|Function} 设置工作进程的 inspector 端口。
    这可以是一个数字，或者一个不接受参数并返回数字的函数。默认情况下，每个工作进程都有自己的端口，从主进程的 `process.debugPort` 递增。
  * `windowsHide` {boolean} 隐藏通常在 Windows 系统上创建的 fork 进程控制台窗口。**默认值：** `false`。

调用 [`.setupPrimary()`][]（或 [`.fork()`][]）后，此设置对象将包含设置，包括默认值。

此对象不打算被更改或手动设置。

## `cluster.setupMaster([settings])`

<!-- YAML
added: v0.7.1
deprecated: v16.0.0
changes:
  - version: v6.4.0
    pr-url: https://github.com/nodejs/node/pull/7838
    description: "现在支持 `stdio` 选项。"
-->

> 稳定性：0 - 已弃用

[`.setupPrimary()`][] 的已弃用别名。

## `cluster.setupPrimary([settings])`

<!-- YAML
added: v16.0.0
-->

* `settings` {Object} 参见 [`cluster.settings`][]。

`setupPrimary` 用于更改默认的 'fork' 行为。一旦调用，设置将存在于 `cluster.settings` 中。

任何设置更改仅影响未来对 [`.fork()`][] 的调用，并对已经运行的工作进程无效。

无法通过 `.setupPrimary()` 设置的唯一工作进程属性是传递给 [`.fork()`][] 的 `env`。

上述默认值仅适用于第一次调用；后续调用的默认值是调用 `cluster.setupPrimary()` 时的当前值。

```mjs
import cluster from 'node:cluster';

cluster.setupPrimary({
  exec: 'worker.js',
  args: ['--use', 'https'],
  silent: true,
});
cluster.fork(); // https 工作进程
cluster.setupPrimary({
  exec: 'worker.js',
  args: ['--use', 'http'],
});
cluster.fork(); // http 工作进程
```

```cjs
const cluster = require('node:cluster');

cluster.setupPrimary({
  exec: 'worker.js',
  args: ['--use', 'https'],
  silent: true,
});
cluster.fork(); // https 工作进程
cluster.setupPrimary({
  exec: 'worker.js',
  args: ['--use', 'http'],
});
cluster.fork(); // http 工作进程
```

这只能从主进程调用。

## `cluster.worker`

<!-- YAML
added: v0.7.0
-->

* 类型：{Object}

当前工作进程对象的引用。在主进程中不可用。

```mjs
import cluster from 'node:cluster';

if (cluster.isPrimary) {
  console.log('I am primary');
  cluster.fork();
  cluster.fork();
} else if (cluster.isWorker) {
  console.log(`I am worker #${cluster.worker.id}`);
}
```

```cjs
const cluster = require('node:cluster');

if (cluster.isPrimary) {
  console.log('I am primary');
  cluster.fork();
  cluster.fork();
} else if (cluster.isWorker) {
  console.log(`I am worker #${cluster.worker.id}`);
}
```

## `cluster.workers`

<!-- YAML
added: v0.7.0
-->

* 类型：{Object}

一个存储活动 worker 对象的哈希表，以 `id` 字段为键。这使得遍历所有 worker 变得很容易。它仅在主进程中可用。

worker 在断开连接_并_退出后从 `cluster.workers` 中移除。这两个事件的顺序无法预先确定。但是，可以保证从 `cluster.workers` 列表中移除发生在最后一个 `'disconnect'` 或 `'exit'` 事件触发之前。

```mjs
import cluster from 'node:cluster';

for (const worker of Object.values(cluster.workers)) {
  worker.send('big announcement to all workers');
}
```

```cjs
const cluster = require('node:cluster');

for (const worker of Object.values(cluster.workers)) {
  worker.send('big announcement to all workers');
}
```

[`child_process` 的高级序列化]: child_process.md#advanced-serialization
[Child Process 模块]: child_process.md#child_processforkmodulepath-args-options
[`.fork()`]: #clusterforkenv
[`.setupPrimary()`]: #clustersetupprimarysettings
[`ChildProcess.send()`]: child_process.md#subprocesssendmessage-sendhandle-options-callback
[`child_process.fork()`]: child_process.md#child_processforkmodulepath-args-options
[`child_process.spawn()`]: child_process.md#child_processspawncommand-args-options
[`child_process` 事件：`'exit'`]: child_process.md#event-exit
[`child_process` 事件：`'message'`]: child_process.md#event-message
[`cluster.isPrimary`]: #clusterisprimary
[`cluster.settings`]: #clustersettings
[`disconnect()`]: child_process.md#subprocessdisconnect
[`kill()`]: process.md#processkillpid-signal
[`process` 事件：`'message'`]: process.md#event-message
[`server.close()`]: net.md#event-close
[`stdio`]: child_process.md#optionsstdio
[`worker.exitedAfterDisconnect`]: #workerexitedafterdisconnect
[`worker_threads`]: worker_threads.md
