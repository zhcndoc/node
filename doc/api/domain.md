# 域

<!-- YAML
deprecated: v1.4.2
changes:
  - version: v8.8.0
    pr-url: https://github.com/nodejs/node/pull/15695
    description: "在 VM 上下文中创建的任何 `Promise` 不再拥有 `.domain` 属性。然而，它们的处理程序仍然在正确的域中执行，并且在主上下文中创建的 `Promise` 仍然拥有 `.domain` 属性。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12489
    description: "`Promise` 的处理程序现在在链中第一个 promise 被创建时的域中调用。"
-->

<!--introduced_in=v0.10.0-->

> 稳定性：0 - 已弃用

<!-- source_link=lib/domain.js -->

**此模块待弃用。** 一旦替代 API 最终确定，此模块将被完全弃用。大多数开发人员**不**应该有理由使用此模块。绝对需要域提供的功能的用户可以暂时依赖它，但应该期望将来必须迁移到不同的解决方案。

域提供了一种将多个不同的 IO 操作作为单个组来处理的方法。如果注册到域的任何事件发射器或回调发出 `'error'` 事件或抛出错误，则域对象将被通知，而不是在 `process.on('uncaughtException')` 处理程序中丢失错误上下文，或导致程序立即以错误代码退出。

## 警告：不要忽略错误！

<!-- type=misc -->

域错误处理程序不能替代在发生错误时关闭进程。

根据 JavaScript 中 [`throw`][] 的工作原理，几乎从来没有办法安全地“从断点处继续”，而不泄露引用或创建某种其他未定义的脆弱状态。

响应抛出错误的最安全方法是关闭进程。当然，在正常的 Web 服务器中，可能有许多打开的连接，因为某人触发了错误而突然关闭这些连接是不合理的。

更好的方法是向触发错误的请求发送错误响应，同时让其他请求在正常时间内完成，并停止在该工作进程中监听新请求。

这样，`domain` 的使用与 cluster 模块携手并进，因为主进程可以在工作进程遇到错误时 fork 一个新的工作进程。对于扩展到多台机器的 Node.js 程序，终止代理或服务注册表可以注意到故障，并相应地做出反应。

例如，这不是一个好主意：

```js
// XXX 警告！坏主意！

const d = require('node:domain').create();
d.on('error', (er) => {
  // 错误不会使进程崩溃，但它做的更糟！
  // 虽然我们防止了进程突然重启，但如果这种情况发生，我们会泄露
  // 大量资源。
  // 这并不比 process.on('uncaughtException') 好！
  console.log(`error, but oh well ${er.message}`);
});
d.run(() => {
  require('node:http').createServer((req, res) => {
    handleRequest(req, res);
  }).listen(PORT);
});
```

通过使用域的上下文，以及将我们的程序分离到多个工作进程的弹性，我们可以更适当地反应，并以更大的安全性处理错误。

```js
// 好多了！

const cluster = require('node:cluster');
const PORT = +process.env.PORT || 1337;

if (cluster.isPrimary) {
  // 更现实的场景会有超过 2 个工作进程，
  // 并且可能不会把主进程和工作进程放在同一个文件中。
  //
  // 也可以把日志记录做得更复杂一点，并且
  // 实现任何需要的自定义逻辑来防止 DoS
  // 攻击和其他不良行为。
  //
  // 参见 cluster 文档中的选项。
  //
  // 重要的是主进程做得很少，
  // 增加我们对意外错误的弹性。

  cluster.fork();
  cluster.fork();

  cluster.on('disconnect', (worker) => {
    console.error('disconnect!');
    cluster.fork();
  });

} else {
  // 工作进程
  //
  // 这里是我们要放 bug 的地方！

  const domain = require('node:domain');

  // 参见 cluster 文档以获取更多关于使用
  // 工作进程来服务请求的详情。它是如何工作的，注意事项等。

  const server = require('node:http').createServer((req, res) => {
    const d = domain.create();
    d.on('error', (er) => {
      console.error(`error ${er.stack}`);

      // 我们处于危险境地！
      // 根据定义，发生了一些意外的事情，
      // 这可能是我们不想要的。
      // 现在什么都可能发生！非常小心！

      try {
        // 确保我们在 30 秒内关闭
        const killtimer = setTimeout(() => {
          process.exit(1);
        }, 30000);
        // 但不要仅仅为此保持进程打开！
        killtimer.unref();

        // 停止接受新请求。
        server.close();

        // 让主进程知道我们挂了。这将触发
        // cluster 主进程中的 'disconnect'，然后它将 fork
        // 一个新的工作进程。
        cluster.worker.disconnect();

        // 尝试向触发问题的请求发送错误
        res.statusCode = 500;
        res.setHeader('content-type', 'text/plain');
        res.end('Oops, there was a problem!\n');
      } catch (er2) {
        // 好吧，此时我们做不了太多。
        console.error(`Error sending 500! ${er2.stack}`);
      }
    });

    // 因为 req 和 res 是在这个域存在之前创建的，
    // 我们需要显式地添加它们。
    // 参见下方隐式与显式绑定的解释。
    d.add(req);
    d.add(res);

    // 现在在域中运行处理函数。
    d.run(() => {
      handleRequest(req, res);
    });
  });
  server.listen(PORT);
}

// 这部分不重要。只是一个路由示例。
// 在这里放复杂的应用逻辑。
function handleRequest(req, res) {
  switch (req.url) {
    case '/error':
      // 我们做一些异步事情，然后...
      setTimeout(() => {
        // 哎呀！
        flerb.bark();
      }, timeout);
      break;
    default:
      res.end('ok');
  }
}
```

## `Error` 对象的补充

<!-- type=misc -->

任何时候 `Error` 对象通过域路由，都会向其添加一些额外字段。

* `error.domain` 第一个处理错误的域。
* `error.domainEmitter` 发出带有错误对象的 `'error'` 事件的事件发射器。
* `error.domainBound` 绑定到域并将错误作为第一个参数传递的回调函数。
* `error.domainThrown` 布尔值，指示错误是抛出的、发出的还是传递给绑定回调函数的。

## 隐式绑定

<!--type=misc-->

如果正在使用域，则所有**新**的 `EventEmitter` 对象（包括 Stream 对象、请求、响应等）将在创建时隐式绑定到活动域。

此外，传递给低级事件循环请求（例如 `fs.open()` 或其他接受回调的方法）的回调将自动绑定到活动域。如果它们抛出，域将捕获错误。

为了防止过度内存使用，`Domain` 对象本身不会隐式添加为活动域的子项。如果是这样，那么防止请求和响应对象被正确垃圾回收就太容易了。

要将 `Domain` 对象作为父 `Domain` 的子项嵌套，必须显式添加它们。

隐式绑定将抛出的错误和 `'error'` 事件路由到 `Domain` 的 `'error'` 事件，但不在 `Domain` 上注册 `EventEmitter`。
隐式绑定仅处理抛出的错误和 `'error'` 事件。

## 显式绑定

<!--type=misc-->

有时，使用的域不应该是用于特定事件发射器的域。或者，事件发射器可能是在一个域的上下文中创建的，但应该绑定到另一个域。

例如，可能有一个域用于 HTTP 服务器，但也许我们想为每个请求使用一个单独的域。

这是可以通过显式绑定实现的。

```js
// 为服务器创建一个顶层域
const domain = require('node:domain');
const http = require('node:http');
const serverDomain = domain.create();

serverDomain.run(() => {
  // 服务器在 serverDomain 的作用域中创建
  http.createServer((req, res) => {
    // Req 和 res 也在 serverDomain 的作用域中创建
    // 然而，我们更喜欢为每个请求拥有一个独立的域。
    // 首先创建它，并将 req 和 res 添加进去。
    const reqd = domain.create();
    reqd.add(req);
    reqd.add(res);
    reqd.on('error', (er) => {
      console.error('Error', er, req.url);
      try {
        res.writeHead(500);
        res.end('Error occurred, sorry.');
      } catch (er2) {
        console.error('Error sending 500', er2, req.url);
      }
    });
  }).listen(1337);
});
```

## `domain.create()`

* 返回：{Domain}

## 类：`Domain`

* 继承：{EventEmitter}

Domain 类封装了将错误和未捕获异常路由到活动 `Domain` 对象的功能。

要处理它捕获的错误，请监听其 `'error'` 事件。

### `domain.members`

* 类型：{Array}

一个已显式添加到域的事件发射器数组。

### `domain.add(emitter)`

<!-- YAML
changes:
  - version: v9.3.0
    pr-url: https://github.com/nodejs/node/pull/16222
    description: 不再接受计时器对象。
-->

* `emitter` {EventEmitter} 要添加到域的发射器

显式地将一个发射器添加到域。如果发射器调用的任何事件处理程序抛出错误，或者发射器发出 `'error'` 事件，它将被路由到域的 `'error'` 事件，就像隐式绑定一样。

如果 `EventEmitter` 已经绑定到一个域，它将从该域移除，并绑定到这个域。

### `domain.bind(callback)`

* `callback` {Function} 回调函数
* 返回：{Function} 绑定后的函数

返回的函数将是提供的回调函数的包装器。当调用返回的函数时，任何抛出的错误将被路由到域的 `'error'` 事件。

```js
const d = domain.create();

function readSomeFile(filename, cb) {
  fs.readFile(filename, 'utf8', d.bind((er, data) => {
    // 如果这抛出，它也会被传递给域。
    return cb(er, data ? JSON.parse(data) : null);
  }));
}

d.on('error', (er) => {
  // 某处发生了错误。如果我们现在抛出它，它将使程序崩溃
  // 并显示正常的行号和栈消息。
});
```

### `domain.enter()`

`enter()` 方法是由 `run()`、`bind()` 和 `intercept()` 方法使用的管道，用于设置活动域。它将 `domain.active` 和 `process.domain` 设置为该域，并隐式地将该域推入由域模块管理的域栈（详见 [`domain.exit()`][] 了解域栈的详情）。调用 `enter()` 标志着绑定到域的异步调用和 I/O 操作链的开始。

调用 `enter()` 仅更改活动域，不更改域本身。`enter()` 和 `exit()` 可以在单个域上调用任意次数。

### `domain.exit()`

`exit()` 方法退出当前域，将其从域栈中弹出。任何时候执行将要切换到不同异步调用链的上下文时，确保退出当前域很重要。调用 `exit()` 标志着绑定到域的异步调用和 I/O 操作链的结束或中断。

如果有多个嵌套域绑定到当前执行上下文，`exit()` 将退出该域内嵌套的任何域。

调用 `exit()` 仅更改活动域，不更改域本身。`enter()` 和 `exit()` 可以在单个域上调用任意次数。

### `domain.intercept(callback)`

* `callback` {Function} 回调函数
* 返回：{Function} 拦截后的函数

此方法几乎与 [`domain.bind(callback)`][] 相同。但是，除了捕获抛出的错误外，它还将拦截作为第一个参数发送给函数的 [`Error`][] 对象。

这样，常见的 `if (err) return callback(err);` 模式可以被单个地方的单个错误处理程序取代。

```js
const d = domain.create();

function readSomeFile(filename, cb) {
  fs.readFile(filename, 'utf8', d.intercept((data) => {
    // 注意，第一个参数永远不会传递给
    // 回调，因为它被假定为 'Error' 参数
    // 因此被域拦截。

    // 如果这抛出，它也会被传递给域
    // 这样错误处理逻辑可以移动到 'error'
    // 域上的事件，而不是在整个程序中重复
    // 程序。
    return cb(null, JSON.parse(data));
  }));
}

d.on('error', (er) => {
  // 某处发生了错误。如果我们现在抛出它，它将使程序崩溃
  // 并显示正常的行号和栈消息。
});
```

### `domain.remove(emitter)`

* `emitter` {EventEmitter} 要从域中移除的发射器

[`domain.add(emitter)`][] 的反操作。从指定的发射器移除域处理。

### `domain.run(fn[, ...args])`

* `fn` {Function}
* `...args` {any}

在域的上下文中运行提供的函数，隐式绑定所有在该上下文中创建的事件发射器、计时器和低级请求。可选地，参数可以传递给函数。

这是使用域的最基本方式。

```js
const domain = require('node:domain');
const fs = require('node:fs');
const d = domain.create();
d.on('error', (er) => {
  console.error('Caught error!', er);
});
d.run(() => {
  process.nextTick(() => {
    setTimeout(() => { // 模拟一些各种异步事情
      fs.open('non-existent file', 'r', (er, fd) => {
        if (er) throw er;
        // 继续...
      });
    }, 100);
  });
});
```

在此示例中，`d.on('error')` 处理程序将被触发，而不是使程序崩溃。

## 域和 Promise

自 Node.js 8.0.0 起，Promise 的处理程序会在调用 `.then()` 或 `.catch()` 本身所在的域内运行：

```js
const d1 = domain.create();
const d2 = domain.create();

let p;
d1.run(() => {
  p = Promise.resolve(42);
});

d2.run(() => {
  p.then((v) => {
    // 在 d2 中运行
  });
});
```

可以使用 [`domain.bind(callback)`][] 将回调绑定到特定的域：

```js
const d1 = domain.create();
const d2 = domain.create();

let p;
d1.run(() => {
  p = Promise.resolve(42);
});

d2.run(() => {
  p.then(p.domain.bind((v) => {
    // 在 d1 中运行
  }));
});
```

域不会干扰 Promise 的错误处理机制。换句话说，对于未处理的 `Promise` 拒绝，不会发出 `'error'` 事件。

[`Error`]: errors.md#class-error
[`domain.add(emitter)`]: #domainaddemitter
[`domain.bind(callback)`]: #domainbindcallback
[`domain.exit()`]: #domainexit
[`throw`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw
