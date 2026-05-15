# 显式资源管理（`using`）指南

[显式资源管理](https://github.com/tc39/proposal-explicit-resource-management)
是 JavaScript 语言在 2025 年引入的一项能力。它提供了一种
将对象标记为可释放资源的方式，使得当对象不再处于作用域内时，JavaScript 引擎会自动
调用释放方法。例如：

```js
class MyResource {
  dispose() {
    console.log('资源已释放');
  }

  [Symbol.dispose]() {
    this.dispose();
  }
}

{
  using resource = new MyResource();
  // 当此代码块退出时，`Symbol.dispose` 方法将
  // 由 JavaScript 引擎自动调用。
}
```

本文档概述了在 Node.js 项目中使用显式资源
管理的一些具体指南——特别是关于如何
使对象可释放，以及如何将这些新能力引入现有
API 的指南。

这份指导的一个注意事项是，显式资源管理是一个全新的
语言特性，在编写这些指南时，并没有现成的经验基础可供借鉴。
这里列出的要点基于
当前对该机制如何工作以及预期如何
被使用的理解。因此，随着在 Node.js 和生态系统中对显式资源管理
积累更多经验，这些指南可能会随着时间而变化。
始终建议查看本文档的最新版本，
更重要的是，应根据不断演变的理解、
需求和经验来提出修改建议。

## 一些背景

可以通过实现以下任一或两者的方法来使对象变为可释放：

`Symbol.dispose` 和 `Symbol.asyncDispose`：

```js
class MySyncResource {
  [Symbol.dispose]() {
    // 同步释放逻辑
  }
}

class MyAsyncDisposableResource {
  async [Symbol.asyncDispose]() {
    // 异步释放逻辑
  }
}
```

实现了 `Symbol.dispose` 的对象可以与 `using`
语句一起使用，当对象离开作用域时，该语句会自动调用
`Symbol.dispose` 方法。如果对象实现了 `Symbol.asyncDispose`，则可以
在异步上下文中与 `await using` 语句一起使用。这里值得注意的是，
`await using` 表示释放是异步的，
而不是初始化是异步的。

```mjs
{
  using resource = new MyResource();
  await using asyncResource = new MyResource();
}
```

重要的是，要理解 `using` 的设计使得
用户代码可以直接调用 `Symbol.dispose` 或 `Symbol.asyncDispose`
方法，而不必局限于 `using` 或 `await using` 语句。这些方法
也可以被多次调用，并且可由任何持有对象引用的代码调用。
也就是说，显式资源管理并不意味着对对象的所有权。
它不是某些其他语言中所见的 RAII（Resource Acquisition Is Initialization，
资源获取即初始化）形式，也没有对象独占所有权的概念。
一个可释放对象可以在任何时刻变为已释放。

`Symbol.dispose` 和 `Symbol.asyncDispose` 方法会在
使用 `using` 关键字的作用域成功退出和异常退出时都被调用。
这意味着如果在作用域内抛出异常，释放方法仍然会被调用（类似于
`finally { }` 块的工作方式）。不过，当释放方法被调用时，它们并不知道
具体上下文。这些方法不会收到任何关于可能已
抛出的异常的信息。这意味着，通常最安全的假设是：
释放方法会在对象可能不处于有效
状态，或者存在待处理异常的上下文中被调用。

## 可释放对象指南

因此，基于以上考虑，有必要为释放器（disposer）制定一些指南：

1. 释放器应当是幂等的。多次调用释放方法
   不应造成任何问题，也不应产生额外的副作用。
2. 释放器应当假定自己是在异常上下文中被调用的。
   始终假定很可能存在一个待处理异常，并且如果对象
   在调用释放方法时尚未被显式关闭，那么
   应当像发生了异常一样释放该对象。例如，
   如果对象 API 同时暴露 `close()` 方法和 `abort()` 方法，
   那么当对象尚未关闭时，释放方法应调用 `abort()`。
   如果在成功和异常上下文中释放没有区别，那么就没有必要
   分开设计释放方法。
3. 建议避免在释放器中抛出错误。
   如果释放器在已有另一个待处理异常时抛出异常，
   那么这两个异常都会被包装进一个 `SuppressedError`，
   从而同时掩盖两者。这会使理解
   异常抛出上下文变得困难。
4. 可释放对象应当在 `Symbol.dispose` 和 `Symbol.asyncDispose` 方法之外，
   还暴露命名的释放方法。这样用户代码就可以显式地释放对象，
   而无需使用 `using` 或 `await using` 语句。例如，一个可释放对象可以
   暴露一个 `close()` 方法来释放对象。
   然后，`Symbol.dispose` 和 `Symbol.asyncDispose` 方法应以幂等方式调用
   这些命名的释放方法。
5. 由于最安全的假设是释放方法会在
   异常上下文中被调用，因此通常建议尽可能优先使用
   `Symbol.dispose` 而非 `Symbol.asyncDispose`。异步
   释放可能会延迟异常处理，并且在释放
   进行期间难以推断对象状态。异常上下文中的释放最好是同步
   且立即完成。不过，对于某些类型的对象，异步释放
   是不可避免的。
6. 异步释放器，按定义，在等待其释放任务完成时
   能够让出执行权给其他任务。这意味着，至少，`Symbol.asyncDispose` 方法必须是一个 `async` 函数，并且
   必须 `await` 至少一个异步释放任务。如果这两个
   条件任一未满足，那么这个释放器实际上只是一个伪装的同步释放器，
   它会阻塞执行线程直到返回；这样的释放器应当改为
   使用 `Symbol.dispose` 来定义。
7. 由于释放过程严格有序，存在一种内在的期望：
   单个释放器执行的所有任务在释放器返回时都已完全完成。
   这意味着，例如，“回调风格”的 API 不能在释放器中被调用，
   除非它们已被 promisify 并 awaited。释放器内创建的任何 Promise
   都必须被 await，以确保在释放器返回之前它们已经完成。
8. 尽可能避免在同一个对象中同时使用 `Symbol.dispose` 和 `Symbol.asyncDispose`。
   这会使理解在给定上下文中将调用哪个方法变得困难，并可能导致
   意外行为或微妙的 bug。不过，这并不是一条硬性规则；
   在某些特定情况下同时定义两者是有意义的，例如资源本身已经同时暴露了
   用于关闭该资源的同步和异步方法。

### 可释放对象示例

一个可释放对象可以很简单：

```js
class MyResource {
  #disposed = false;
  dispose() {
    if (this.#disposed) return;
    this.#disposed = true;
    console.log('资源已释放');
  }

  [Symbol.dispose]() {
    this.dispose();
  }
}

{ using myDisposable = new MyResource(); }
```

甚至可以是完全匿名的对象：

```js
function getDisposable() {
  let disposed = false;
  return {
    dispose() {
      if (disposed) return;
      disposed = true;
      console.log('资源已释放');
    },
    [Symbol.dispose]() {
      this.dispose();
    },
  };
}

{ using myDisposable = getDisposable(); }
```

不过，有些可释放对象可能需要区分
成功上下文中的释放和异常上下文中的释放，如下面的
示例所示：

```js
class MyDisposableResource {
  constructor() {
    this.closed = false;
  }

  doSomething() {
    if (maybeShouldThrow()) {
      throw new Error('出了点问题');
    }
  }

  close() {
    // 以平稳方式关闭资源。
    if (this.closed) return;
    this.closed = true;
    console.log('资源已关闭');
  }

  abort(maybeError) {
    // 中止资源，可选择附带异常。多次调用此
    // 方法不应造成任何问题或额外的
    // 副作用。
    if (this.closed) return;
    this.closed = true;
    if (maybeError) {
      console.error('由于错误导致资源中止：', maybeError);
    } else {
      console.log('资源已中止');
    }
  }

  [Symbol.dispose]() {
    // 注意，当这里被调用时，我们无法将任何待处理
    // 异常传递给 abort 方法，因为我们不知道
    // 是否存在待处理异常。
    this.abort();
  }
}
```

使用方式如下：

```js
{
  using resource = new MyDisposableResource();
  // 对资源执行可能抛出错误的操作
  resource.doSomething();
  // 如果没有抛出错误，则显式关闭资源，
  // 以避免在调用 `Symbol.dispose`
  // 方法时资源被中止。
  resource.close();
}
```

在这里，如果 `doSomething()` 方法中抛出了错误，`Symbol.dispose`
方法在代码块退出时仍然会被调用，确保资源
通过 `abort()` 方法被正确释放。如果没有抛出错误，
则会显式调用 `close()` 方法以平稳关闭资源。当
代码块退出时，`Symbol.dispose` 方法仍会被调用，但由于资源
已经关闭，它将不起作用。

为了处理释放期间可能发生的错误，有必要将
释放代码块包裹在 try-catch 中：

```js
try {
  using resource = new MyDisposableResource();
  // 对资源执行可能抛出错误的操作
  resource.doSomething();
  resource.close();
} catch (error) {
  // 错误可能是代码块中实际抛出的错误，
  // 也可能是在释放期间抛出错误且已有待处理异常时
  // 产生的 SuppressedError。
  if (error instanceof SuppressedError) {
    console.error('在释放期间发生错误并掩盖了待处理错误：',
                  error.error, error.suppressed);
  } else {
    console.error('发生错误：', error);
  }
}
```

### Symbol.dispose 和 Symbol.asyncDispose 的返回值

`Symbol.dispose` 方法应返回 `undefined`，并且
`Symbol.asyncDispose` 方法应返回一个解析为
`undefined` 的 `Promise`。

<!-- eslint-skip -->

```js
[Symbol.dispose]() {
  return void this.dispose();
  // 或
  this.dispose();
  // 或
  return;
  // 或
  // 无返回值
}

async [Symbol.asyncDispose]() {
  await this.dispose();
  // 或
  return;
  // 或
  // 无返回值
}
```

### 释放器方法的可调试性

为了改善调试体验，`Symbol.dispose` 和 `Symbol.asyncDispose`
函数不应是命名释放函数的直接别名。它们应当
转而委托给命名释放函数。这样可以确保堆栈跟踪能更清楚地显示
释放器是通过 `using` 被调用的还是被直接调用的。

例如：

<!-- eslint-skip -->

```js
// 可以这样做：
function dispose() { ... }
return {
  dispose,
  [Symbol.dispose]() { this.dispose(); }
};

// 而不是这样：
function dispose() { ... }
return {
  dispose,
  [Symbol.dispose]: dispose
};
```

### 关于可释放对象文档说明的注意事项

在记录可释放对象时，务必要清楚地说明
该对象是可释放的以及应当如何释放。这包括
记录 `Symbol.dispose` 和 `Symbol.asyncDispose` 方法，以及
该对象暴露的任何命名释放方法。

如果可释放对象是匿名的（也就是说，它是一个实现了
`Symbol.dispose` 方法的普通 JavaScript 对象），仍然有必要
说明它是可释放的以及应当如何释放。

在文档中，可以像记录类一样来记录匿名对象，
使用 `Class: ` 前缀，并以记录普通 JavaScript 类的方式
来展示该对象，即使它实际上从未以类的形式被实例化。
这种模式的示例可以在
例如 [Web Crypto API](../api/webcrypto.md) 的文档中看到。

因此，例如，如果有一个 API 返回匿名可释放对象，
你可以这样为其编写文档：

```markdown
### 类：`MyDisposableObject`

#### `myDisposableObject.dispose()`

...

#### `myDisposableObject[Symbol.dispose]()`

...

### `foo.getMyDisposableObject()`

* 返回：{MyDisposableObject}
```

## 关于在现有 API 中引入显式资源管理的指南

在现有 API 中引入使用 `using` 的能力可能会有些棘手。

理解这些问题的最佳方式是看一个真实世界的例子。PR
[58516](https://github.com/nodejs/node/pull/58516) 就是一个很好的案例。这个 PR
试图在 `fs.mkdtemp` API 中引入 `Symbol.dispose` 和 `Symbol.asyncDispose` 能力，
使得可以创建一个临时目录，并在其创建时所在的作用域退出时自动释放。
然而，`fs.mkdtemp` API 的现有实现返回的是一个字符串值，无法将其设为可释放。
此外，现有 API 还有同步、回调和基于 Promise 的变体，这进一步使情况变得复杂。

在最初的提案中，`fs.mkdtemp` API 被修改为返回一个实现了 `Symbol.dispose`
方法的对象，但前提是提供了某个特定选项。这意味着 API 的返回值将变为多态，
会根据调用方式返回不同的类型。这为 API 增加了大量复杂性，也让人难以推理其
返回值。同时，这也使得难以通过编程方式检测所使用的 API 版本是否支持 `using`。
`fs.mkdtemp('...', { disposable: true })` 在旧版 Node.js 中的行为会与新版不同，
而除了检查返回值之外，在运行时没有办法检测这一点。

一些已经返回对象、并且这些对象可以被设为可释放的 API 不存在这类问题。例如，
Node.js 中的 `setImmediate()` API 返回的是一个实现了 `Symbol.dispose` 方法的对象。
这项改动之所以没有引起太多关注，是因为该 API 的返回值本来就是一个对象。

因此，有些 API 可以轻松地变为可释放对象，而不会带来任何问题；另一些则需要
更多的思考和权衡。以下指南可以帮助在现有 API 中引入这些能力时做出决策：

1. 避免多态返回值：如果某个 API 已经返回了一个可以设为可释放的值，并且将其设为
   可释放是合理的，那就这样做。不过，不要让返回值根据传入 API 的选项而变成多态。
2. 引入支持 `using` 的新 API 变体：如果现有 API 无法在不更改返回类型或使其多态的
   情况下被设为可释放，那么可以考虑引入一个新的 API 变体。例如，可以引入
   `fs.mkdtempDisposable`，以返回一个可释放对象，而现有的 `fs.mkdtemp` API 继续返回
   字符串。是的，这意味着需要维护更多 API，但它避免了多态返回值带来的复杂性和困惑。
   如果新增 API 变体并不理想，请记住，更改现有 API 的返回类型很可能会造成破坏性变更。
3. 当现有 API 的签名不容易支持将返回值设为可释放，并且需要引入一个新 API 时，
   值得考虑是否应该弃用现有 API，转而采用新 API。尽管弃用从来都不是一个可以轻率
   做出的决定，因为它可能会对生态系统造成重大影响。

## 使用可释放对象的指南

由于可释放对象可以在任何时候被释放，因此在使用它们时务必要小心。以下是一些
使用可释放对象的指南：

1. 永远不要对你不拥有的可释放对象使用 `using` 或 `await using`。例如，以下代码
   在你不是 `someObject` 的所有者时就有问题：

```js
function foo(someObject) {
  using resource = someObject;
}
```

之所以有问题，是因为 `using` 语句会在块退出时无条件调用 `someObject` 上的
`Symbol.dispose` 方法，但你并不控制 `someObject` 的生命周期。如果 `someObject`
被释放，可能会导致调用 `foo` 函数的其余代码出现意外行为。

2. 当对象在成功场景下释放与在异常场景下释放存在明显区别时，一定要在成功代码路径中
   显式释放对象，包括提前返回的情况。例如：

```js
class MyDisposableResource {
  close() {
    console.log('资源已关闭');
  }

  abort() {
    console.log('资源已中止');
  }

  [Symbol.dispose]() {
    // 这里假设是错误情况...
    this.abort();
  }
}

function foo() {
  using res = new MyDisposableResource();
  if (someCondition) {
    // 提前返回，确保资源被释放
    res.close();
    return;
  }
  // 执行其他操作
  res.close();
}
```

这是因为当调用 disposer 时，它无法知道是否存在待处理的异常，通常最安全的做法是
假设它是在异常状态下被调用的。

许多类型的可释放对象并不区分成功和异常情况，在这种情况下，完全依赖 `using`
也完全没问题（而且更推荐）。`setImmediate()` 返回的可释放对象就是一个很好的例子。
它所做的仅仅是调用 `clearImmediate()`，因此块是否出错并不重要。

3. 记住，disposer 会以栈的形式调用，顺序与创建顺序相反。例如，

```js
class MyDisposable {
  constructor(name) {
    this.name = name;
  }
  [Symbol.dispose]() {
    console.log(`Disposing ${this.name}`);
  }
}

{
  using a = new MyDisposable('A');
  using b = new MyDisposable('B');
  using c = new MyDisposable('C');
  // 当这个块退出时，释放方法将按相反顺序被调用：
  // C、B、A。
}
```

因此，考虑可释放对象之间可能存在的关系非常重要。例如，如果一个可释放对象持有
另一个可释放对象的引用，那么清理顺序可能会很重要。
