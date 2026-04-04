# VM（执行 JavaScript）

<!--introduced_in=v0.10.0-->

> 稳定性：2 - 稳定

<!--name=vm-->

<!-- source_link=lib/vm.js -->

`node:vm` 模块允许在 V8 虚拟机上下文中编译和运行代码。

<strong class="critical">`node:vm` 模块不是安全机制。不要用它运行不可信代码。</strong>

JavaScript 代码可以立即编译和运行，也可以编译、保存并在以后运行。

一个常见的用例是在不同的 V8 上下文中运行代码。这意味着被调用的代码拥有与调用代码不同的全局对象。

可以通过[_上下文化的_][contextified] 对象来提供上下文。被调用的代码将上下文中的任何属性视为全局变量。被调用代码引起的全局变量的任何更改都会反映在上下文对象中。

```mjs
import { createContext, runInContext } from 'node:vm';

const x = 1;

const context = { x: 2 };
createContext(context); // 将对象上下文化。

const code = 'x += 40; var y = 17;';
// `x` 和 `y` 是上下文中的全局变量。
// 最初，x 的值为 2，因为那是 context.x 的值。
runInContext(code, context);

console.log(context.x); // 42
console.log(context.y); // 17

console.log(x); // 1; y 未定义
```

```cjs
const { createContext, runInContext } = require('node:vm');

const x = 1;

const context = { x: 2 };
createContext(context); // 将对象上下文化。

const code = 'x += 40; var y = 17;';
// `x` 和 `y` 是上下文中的全局变量。
// 最初，x 的值为 2，因为那是 context.x 的值。
runInContext(code, context);

console.log(context.x); // 42
console.log(context.y); // 17

console.log(x); // 1; y 未定义
```

## 类：`vm.Script`

<!-- YAML
added: v0.3.1
-->

`vm.Script` 类的实例包含可以在特定上下文中执行的预编译脚本。

### `new vm.Script(code[, options])`

<!-- YAML
added: v0.3.1
changes:
  - version:
    - v21.7.0
    - v20.12.0
    pr-url: https://github.com/nodejs/node/pull/51244
    description: Added support for
                `vm.constants.USE_MAIN_CONTEXT_DEFAULT_LOADER`.
  - version:
    - v17.0.0
    - v16.12.0
    pr-url: https://github.com/nodejs/node/pull/40249
    description: Added support for import attributes to the
                 `importModuleDynamically` parameter.
  - version: v10.6.0
    pr-url: https://github.com/nodejs/node/pull/20300
    description: The `produceCachedData` is deprecated in favour of
                 `script.createCachedData()`.
  - version: v5.7.0
    pr-url: https://github.com/nodejs/node/pull/4777
    description: The `cachedData` and `produceCachedData` options are
                 supported now.
-->

* `code` {string} 要编译的 JavaScript 代码。
* `options` {Object|string}
  * `filename` {string} 指定此脚本生成的堆栈跟踪中使用的文件名。**默认值：** `'evalmachine.<anonymous>'`。
  * `lineOffset` {number} 指定此脚本生成的堆栈跟踪中显示的行号偏移量。**默认值：** `0`。
  * `columnOffset` {number} 指定此脚本生成的堆栈跟踪中显示的第一行列号偏移量。**默认值：** `0`。
  * `cachedData` {Buffer|TypedArray|DataView} 提供可选的 `Buffer` 或 `TypedArray`，或 `DataView`，其中包含所提供源代码的 V8 代码缓存数据。当提供时，`cachedDataRejected` 值将根据 V8 是否接受数据设置为 `true` 或 `false`。
  * `produceCachedData` {boolean} 当为 `true` 且不存在 `cachedData` 时，V8 将尝试为 `code` 生成代码缓存数据。成功后，将生成一个包含 V8 代码缓存数据的 `Buffer` 并存储在返回的 `vm.Script` 实例的 `cachedData` 属性中。`cachedDataProduced` 值将根据是否成功生成代码缓存数据设置为 `true` 或 `false`。此选项已**弃用**，推荐使用 `script.createCachedData()`。**默认值：** `false`。
  * `importModuleDynamically` {Function|vm.constants.USE\_MAIN\_CONTEXT\_DEFAULT\_LOADER} 用于指定在此脚本评估期间调用 `import()` 时应如何加载模块。此选项是实验性模块 API 的一部分。我们不建议在生产环境中使用它。详细信息请参阅 [编译 API 中对动态 `import()` 的支持][]。

如果 `options` 是字符串，则它指定文件名。

创建新的 `vm.Script` 对象会编译 `code` 但不会运行它。编译后的 `vm.Script` 可以稍后多次运行。`code` 不绑定到任何全局对象；相反，它在每次运行之前绑定，仅针对该次运行。

### `script.cachedDataRejected`

<!-- YAML
added: v5.7.0
-->

* 类型：{boolean|undefined}

当提供 `cachedData` 创建 `vm.Script` 时，此值将根据 V8 是否接受数据设置为 `true` 或 `false`。否则值为 `undefined`。

### `script.createCachedData()`

<!-- YAML
added: v10.6.0
-->

* 返回：{Buffer}

创建一个代码缓存，可与 `Script` 构造函数的 `cachedData` 选项一起使用。返回一个 `Buffer`。此方法可以随时调用任意次数。

`Script` 的代码缓存不包含任何 JavaScript 可观察状态。代码缓存可以安全地与脚本源一起保存，并用于多次构造新的 `Script` 实例。

`Script` 源中的函数可以标记为延迟编译，它们在 `Script` 构造时不会编译。这些函数将在第一次被调用时编译。代码缓存序列化 V8 当前知道的关于 `Script` 的元数据，它可用于加速未来的编译。

```js
const script = new vm.Script(`
function add(a, b) {
  return a + b;
}

const x = add(1, 2);
`);

const cacheWithoutAdd = script.createCachedData();
// 在 `cacheWithoutAdd` 中，函数 `add()` 被标记为在调用时进行完整编译。

script.runInThisContext();

const cacheWithAdd = script.createCachedData();
// `cacheWithAdd` 包含完全编译的函数 `add()`。
```

### `script.runInContext(contextifiedObject[, options])`

<!-- YAML
added: v0.3.1
changes:
  - version: v6.3.0
    pr-url: https://github.com/nodejs/node/pull/6635
    description: The `breakOnSigint` option is supported now.
-->

* `contextifiedObject` {Object} 由 `vm.createContext()` 方法返回的 [上下文化的][] 对象。
* `options` {Object}
  * `displayErrors` {boolean} 当为 `true` 时，如果在编译 `code` 时发生 [`Error`][]，导致错误的代码行将附加到堆栈跟踪中。**默认值：** `true`。
  * `timeout` {integer} 指定在执行 `code` 多少毫秒后终止执行。如果执行被终止，将抛出 [`Error`][]。此值必须是严格正整数。
  * `breakOnSigint` {boolean} 如果为 `true`，接收 `SIGINT` (<kbd>Ctrl</kbd>+<kbd>C</kbd>) 将终止执行并抛出 [`Error`][]。在此期间，通过 `process.on('SIGINT')` 附加的现有事件处理程序将被禁用，但在之后继续工作。**默认值：** `false`。
* 返回：{any} 脚本中执行的最后一条语句的结果。

在给定的 `contextifiedObject` 中运行 `vm.Script` 对象包含的编译代码并返回结果。运行的代码无法访问局部作用域。

以下示例编译了递增全局变量、设置另一个全局变量值的代码，然后多次执行该代码。全局变量包含在 `context` 对象中。

```mjs
import { createContext, Script } from 'node:vm';

const context = {
  animal: 'cat',
  count: 2,
};

const script = new Script('count += 1; name = "kitty";');

createContext(context);
for (let i = 0; i < 10; ++i) {
  script.runInContext(context);
}

console.log(context);
// 打印：{ animal: 'cat', count: 12, name: 'kitty' }
```

```cjs
const { createContext, Script } = require('node:vm');

const context = {
  animal: 'cat',
  count: 2,
};

const script = new Script('count += 1; name = "kitty";');

createContext(context);
for (let i = 0; i < 10; ++i) {
  script.runInContext(context);
}

console.log(context);
// 打印：{ animal: 'cat', count: 12, name: 'kitty' }
```

使用 `timeout` 或 `breakOnSigint` 选项将导致新的事件循环和相应的线程启动，这会产生非零的性能开销。

### `script.runInNewContext([contextObject[, options]])`

<!-- YAML
added: v0.3.1
changes:
  - version:
    - v22.8.0
    - v20.18.0
    pr-url: https://github.com/nodejs/node/pull/54394
    description: The `contextObject` argument now accepts `vm.constants.DONT_CONTEXTIFY`.
  - version: v14.6.0
    pr-url: https://github.com/nodejs/node/pull/34023
    description: The `microtaskMode` option is supported now.
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/19016
    description: The `contextCodeGeneration` option is supported now.
  - version: v6.3.0
    pr-url: https://github.com/nodejs/node/pull/6635
    description: The `breakOnSigint` option is supported now.
-->

* `contextObject` {Object|vm.constants.DONT\_CONTEXTIFY|undefined} [`vm.constants.DONT_CONTEXTIFY`][] 或将被 [上下文化的][] 对象。如果为 `undefined`，将为向后兼容性创建一个空的上下文化对象。
* `options` {Object}
  * `displayErrors` {boolean} 当为 `true` 时，如果在编译 `code` 时发生 [`Error`][]，导致错误的代码行将附加到堆栈跟踪中。**默认值：** `true`。
  * `timeout` {integer} 指定在执行 `code` 多少毫秒后终止执行。如果执行被终止，将抛出 [`Error`][]。此值必须是严格正整数。
  * `breakOnSigint` {boolean} 如果为 `true`，接收 `SIGINT` (<kbd>Ctrl</kbd>+<kbd>C</kbd>) 将终止执行并抛出 [`Error`][]。在此期间，通过 `process.on('SIGINT')` 附加的现有事件处理程序将被禁用，但在之后继续工作。**默认值：** `false`。
  * `contextName` {string} 新创建上下文的易读名称。**默认值：** `'VM Context i'`，其中 `i` 是创建上下文的递增数字索引。
  * `contextOrigin` {string} 对应于新创建上下文的 [源][origin]，用于显示目的。源的格式应像 URL，但仅包含协议、主机和端口（如果需要），就像 [`URL`][] 对象的 [`url.origin`][] 属性的值一样。最值得注意的是，此字符串应省略尾随斜杠，因为它表示路径。**默认值：** `''`。
  * `contextCodeGeneration` {Object}
    * `strings` {boolean} 如果设置为 false，任何调用 `eval` 或函数构造函数（`Function`、`GeneratorFunction` 等）都将抛出 `EvalError`。**默认值：** `true`。
    * `wasm` {boolean} 如果设置为 false，任何尝试编译 WebAssembly 模块的操作都将抛出 `WebAssembly.CompileError`。**默认值：** `true`。
  * `microtaskMode` {string} 如果设置为 `afterEvaluate`，微任务（通过 `Promise` 和 `async function` 调度的任务）将在脚本运行后立即运行。在这种情况下，它们包含在 `timeout` 和 `breakOnSigint` 作用域中。
* 返回：{any} 脚本中执行的最后一条语句的结果。

此方法是 `script.runInContext(vm.createContext(options), options)` 的快捷方式。它同时执行以下几件事：

1. 创建新上下文。
2. 如果 `contextObject` 是对象，则使用新上下文对其进行 [上下文化][contextified]。如果 `contextObject` 是 undefined，则创建新对象并对其进行 [上下文化][contextified]。如果 `contextObject` 是 [`vm.constants.DONT_CONTEXTIFY`][]，则不进行任何 [上下文化][contextified]。
3. 在创建的上下文中运行 `vm.Script` 对象包含的编译代码。代码无法访问调用此方法的作用域。
4. 返回结果。

以下示例编译了设置全局变量的代码，然后在不同上下文中多次执行该代码。全局变量设置在每个独立的 `context` 上并包含在其中。

```mjs
import { constants, Script } from 'node:vm';

const script = new Script('globalVar = "set"');

const contexts = [{}, {}, {}];
contexts.forEach((context) => {
  script.runInNewContext(context);
});

console.log(contexts);
// 打印：[{ globalVar: 'set' }, { globalVar: 'set' }, { globalVar: 'set' }]

// 如果上下文是从上下文化对象创建的，这将抛出错误。
// constants.DONT_CONTEXTIFY 允许创建具有可冻结的普通
// 全局对象的上下文。
const freezeScript = new Script('Object.freeze(globalThis); globalThis;');
const frozenContext = freezeScript.runInNewContext(constants.DONT_CONTEXTIFY);
```

```cjs
const { constants, Script } = require('node:vm');

const script = new Script('globalVar = "set"');

const contexts = [{}, {}, {}];
contexts.forEach((context) => {
  script.runInNewContext(context);
});

console.log(contexts);
// 打印：[{ globalVar: 'set' }, { globalVar: 'set' }, { globalVar: 'set' }]

// 如果上下文是从上下文化对象创建的，这将抛出错误。
// constants.DONT_CONTEXTIFY 允许创建具有可冻结的普通
// 全局对象的上下文。
const freezeScript = new Script('Object.freeze(globalThis); globalThis;');
const frozenContext = freezeScript.runInNewContext(constants.DONT_CONTEXTIFY);
```

### `script.runInThisContext([options])`

<!-- YAML
added: v0.3.1
changes:
  - version: v6.3.0
    pr-url: https://github.com/nodejs/node/pull/6635
    description: The `breakOnSigint` option is supported now.
-->

* `options` {Object}
  * `displayErrors` {boolean} 当为 `true` 时，如果在编译 `code` 时发生 [`Error`][]，导致错误的代码行将附加到堆栈跟踪中。**默认值：** `true`。
  * `timeout` {integer} 指定在执行 `code` 多少毫秒后终止执行。如果执行被终止，将抛出 [`Error`][]。此值必须是严格正整数。
  * `breakOnSigint` {boolean} 如果为 `true`，接收 `SIGINT` (<kbd>Ctrl</kbd>+<kbd>C</kbd>) 将终止执行并抛出 [`Error`][]。在此期间，通过 `process.on('SIGINT')` 附加的现有事件处理程序将被禁用，但在之后继续工作。**默认值：** `false`。
* 返回：{any} 脚本中执行的最后一条语句的结果。

在当前 `global` 对象的上下文中运行 `vm.Script` 包含的编译代码。运行的代码无法访问局部作用域，但_可以_ 访问当前 `global` 对象。

以下示例编译了递增 `global` 变量的代码，然后多次执行该代码：

```mjs
import { Script } from 'node:vm';

global.globalVar = 0;

const script = new Script('globalVar += 1', { filename: 'myfile.vm' });

for (let i = 0; i < 1000; ++i) {
  script.runInThisContext();
}

console.log(globalVar);

// 1000
```

```cjs
const { Script } = require('node:vm');

global.globalVar = 0;

const script = new Script('globalVar += 1', { filename: 'myfile.vm' });

for (let i = 0; i < 1000; ++i) {
  script.runInThisContext();
}

console.log(globalVar);

// 1000
```

### `script.sourceMapURL`

<!-- YAML
added:
  - v19.1.0
  - v18.13.0
-->

* 类型：{string|undefined}

当脚本从包含 source map 魔法注释的源编译时，此属性将设置为 source map 的 URL。

```mjs
import vm from 'node:vm';

const script = new vm.Script(`
function myFunc() {}
//# sourceMappingURL=sourcemap.json
`);

console.log(script.sourceMapURL);
// 打印：sourcemap.json
```

```cjs
const vm = require('node:vm');

const script = new vm.Script(`
function myFunc() {}
//# sourceMappingURL=sourcemap.json
`);

console.log(script.sourceMapURL);
// 打印：sourcemap.json
```

## 类：`vm.Module`

<!-- YAML
added:
 - v13.0.0
 - v12.16.0
-->

> 稳定性：1 - 实验性

此功能仅在启用 `--experimental-vm-modules` 命令行标志时可用。

`vm.Module` 类提供了一个底层接口，用于在 VM 上下文中使用 ECMAScript 模块。它是 `vm.Script` 类的对应类，紧密镜像了 ECMAScript 规范中定义的 [模块记录][]。

然而，与 `vm.Script` 不同的是，每个 `vm.Module` 对象在创建时就绑定到一个上下文。

使用 `vm.Module` 对象需要三个不同的步骤：创建/解析、链接和求值。这三个步骤在下面的示例中说明。

此实现位于 [ECMAScript 模块加载器][] 的更低层级。目前也没有方法与加载器交互，尽管计划支持。

```mjs
import vm from 'node:vm';

const contextifiedObject = vm.createContext({
  secret: 42,
  print: console.log,
});

// 步骤 1
//
// 通过构造一个新的 `vm.SourceTextModule` 对象来创建一个模块。这会
// 解析提供的源代码文本，如果出错则抛出 `SyntaxError`。默认情况下，模块是在顶层上下文中创建的。
// 但在这里，我们指定 `contextifiedObject` 作为此模块所属的上下文。
//
// 在这里，我们尝试从模块 "foo" 获取默认导出，
// 并将其放入本地绑定 "secret" 中。

const rootModule = new vm.SourceTextModule(`
  import s from 'foo';
  s;
  print(s);
`, { context: contextifiedObject });

// 步骤 2
//
// 将此模块的导入依赖“链接”到它。
//
// 通过 `sourceTextModule.moduleRequests` 获取 SourceTextModule 请求的依赖
// 并解析它们。
//
// 即使是没有任何依赖的顶层模块也必须显式链接。然而，
// 传递给 `sourceTextModule.linkRequests(modules)` 的数组
// 可以为空。
//
// 注意：这是一个人为的例子，因为 resolveAndLinkDependencies
// 每次被调用时都会创建一个新的 "foo" 模块。在一个成熟的
// 模块系统中，可能会使用缓存来避免重复的模块。

const moduleMap = new Map([
  ['root', rootModule],
]);

function resolveAndLinkDependencies(module) {
  const requestedModules = module.moduleRequests.map((request) => {
    // 在一个成熟的模块系统中，resolveAndLinkDependencies 会
    // 使用模块缓存键 `[specifier, attributes]` 来解析模块。
    // 在这个例子中，我们只使用说明符作为键。
    const specifier = request.specifier;

    let requestedModule = moduleMap.get(specifier);
    if (requestedModule === undefined) {
      requestedModule = new vm.SourceTextModule(`
        // "secret" 变量指的是我们在创建上下文时添加到
        // "contextifiedObject" 的全局变量。
        export default secret;
      `, { context: module.context });
      moduleMap.set(specifier, requestedModule);
      // 同样解析新模块的依赖。
      resolveAndLinkDependencies(requestedModule);
    }

    return requestedModule;
  });

  module.linkRequests(requestedModules);
}

resolveAndLinkDependencies(rootModule);
rootModule.instantiate();

// 步骤 3
//
// 求值模块。evaluate() 方法返回一个 promise，该 promise 将在
// 模块完成求值后兑现。

// 打印 42。
await rootModule.evaluate();
```

```cjs
const vm = require('node:vm');

const contextifiedObject = vm.createContext({
  secret: 42,
  print: console.log,
});

(async () => {
  // 步骤 1
  //
  // 通过构造一个新的 `vm.SourceTextModule` 对象来创建一个模块。这会
  // 解析提供的源代码文本，如果出错则抛出 `SyntaxError`。默认情况下，模块是在顶层上下文中创建的。
  // 但在这里，我们指定 `contextifiedObject` 作为此模块所属的上下文。
  //
  // 在这里，我们尝试从模块 "foo" 获取默认导出，
  // 并将其放入本地绑定 "secret" 中。

  const rootModule = new vm.SourceTextModule(`
    import s from 'foo';
    s;
    print(s);
  `, { context: contextifiedObject });

  // 步骤 2
  //
  // 将此模块的导入依赖“链接”到它。
  //
  // 通过 `sourceTextModule.moduleRequests` 获取 SourceTextModule 请求的依赖
  // 并解析它们。
  //
  // 即使是没有任何依赖的顶层模块也必须显式链接。然而，
  // 传递给 `sourceTextModule.linkRequests(modules)` 的数组
  // 可以为空。
  //
  // 注意：这是一个人为的例子，因为 resolveAndLinkDependencies
  // 每次被调用时都会创建一个新的 "foo" 模块。在一个成熟的
  // 模块系统中，可能会使用缓存来避免重复的模块。

  const moduleMap = new Map([
    ['root', rootModule],
  ]);

  function resolveAndLinkDependencies(module) {
    const requestedModules = module.moduleRequests.map((request) => {
      // 在一个成熟的模块系统中，resolveAndLinkDependencies 会
      // 使用模块缓存键 `[specifier, attributes]` 来解析模块。
      // 在这个例子中，我们只使用说明符作为键。
      const specifier = request.specifier;

      let requestedModule = moduleMap.get(specifier);
      if (requestedModule === undefined) {
        requestedModule = new vm.SourceTextModule(`
          // "secret" 变量指的是我们在创建上下文时添加到
          // "contextifiedObject" 的全局变量。
          export default secret;
        `, { context: module.context });
        moduleMap.set(specifier, requestedModule);
        // 同样解析新模块的依赖。
        resolveAndLinkDependencies(requestedModule);
      }

      return requestedModule;
    });

    module.linkRequests(requestedModules);
  }

  resolveAndLinkDependencies(rootModule);
  rootModule.instantiate();

  // 步骤 3
  //
  // 求值模块。evaluate() 方法返回一个 promise，该 promise 将在
  // 模块完成求值后兑现。

  // 打印 42。
  await rootModule.evaluate();
})();
```

### `module.error`

* 类型：{any}

如果 `module.status` 是 `'errored'`，此属性包含模块在求值期间抛出的异常。如果状态是其他任何值，
访问此属性将导致抛出异常。

对于没有抛出异常的情况，不能使用值 `undefined`，因为可能与 `throw undefined;` 产生歧义。

对应于 ECMAScript 规范中 [循环模块记录][] 的 `[[EvaluationError]]` 字段。

### `module.evaluate([options])`

* `options` {Object}
  * `timeout` {integer} 指定在终止执行之前求值的毫秒数。如果执行被中断，将抛出 [`Error`][]。此值必须是一个严格正整数。
  * `breakOnSigint` {boolean} 如果为 `true`，接收 `SIGINT`
    (<kbd>Ctrl</kbd>+<kbd>C</kbd>) 将终止执行并抛出
    [`Error`][]。通过 `process.on('SIGINT')` 附加的现有事件处理程序在脚本执行期间被禁用，但在那之后继续工作。**默认值：** `false`。
* 返回：{Promise} 成功时兑现为 `undefined`。

求值模块及其依赖。对应于 ECMAScript 规范中 [循环模块记录][] 的 [Evaluate() 具体方法][] 字段。

如果模块是 `vm.SourceTextModule`，则必须在模块实例化后调用 `evaluate()`；
否则 `evaluate()` 将返回一个被拒绝的 promise。

对于 `vm.SourceTextModule`，`evaluate()` 返回的 promise 可以
同步或异步地兑现：

1. 如果 `vm.SourceTextModule` 本身或其任何依赖中没有顶层 `await`，则 promise 将在
   模块及其所有依赖求值后_同步_兑现。
   1. 如果求值成功，promise 将_同步_解决为 `undefined`。
   2. 如果求值导致异常，promise 将_同步_拒绝，拒绝原因是导致求值失败的异常，
      这与 `module.error` 相同。
2. 如果 `vm.SourceTextModule` 本身或其任何依赖中有顶层 `await`，则 promise 将在
   模块及其所有依赖求值后_异步_兑现。
   1. 如果求值成功，promise 将_异步_解决为 `undefined`。
   2. 如果求值导致异常，promise 将_异步_拒绝，拒绝原因是导致求值失败的异常。

如果模块是 `vm.SyntheticModule`，`evaluate()` 总是返回一个同步兑现的 promise，参见
[合成模块记录的 Evaluate()][] 规范：

1. 如果传递给其构造函数的 `evaluateCallback` 同步抛出异常，`evaluate()` 返回
   一个将同步拒绝该异常的 promise。
2. 如果 `evaluateCallback` 没有抛出异常，`evaluate()` 返回一个将
   同步解决为 `undefined` 的 promise。

`vm.SyntheticModule` 的 `evaluateCallback` 在 `evaluate()` 调用内同步执行，其
返回值被丢弃。这意味着如果 `evaluateCallback` 是一个异步函数，`evaluate()` 返回的 promise 将
不会反映其异步行为，并且来自异步
`evaluateCallback` 的任何拒绝都将丢失。

`evaluate()` 也可以在模块已经求值后再次调用，在这种情况下：

1. 如果初始求值成功结束（`module.status` 是 `'evaluated'`），它将什么都不做
   并返回一个解决为 `undefined` 的 promise。
2. 如果初始求值导致异常（`module.status` 是 `'errored'`），它将重新拒绝
   初始求值导致的异常。

当模块正在求值时（`module.status` 是 `'evaluating'`），不能调用此方法。

### `module.identifier`

* 类型：{string}

当前模块的标识符，如在构造函数中设置的那样。

### `module.link(linker)`

<!-- YAML
changes:
  - version:
    - v21.1.0
    - v20.10.0
    - v18.19.0
    pr-url: https://github.com/nodejs/node/pull/50141
    description: The option `extra.assert` is renamed to `extra.attributes`. The
                 former name is still provided for backward compatibility.
-->

* `linker` {Function}
  * `specifier` {string} 请求模块的说明符：
    ```mjs
    import foo from 'foo';
    //              ^^^^^ 模块说明符
    ```

  * `referencingModule` {vm.Module} 调用 `link()` 的 `Module` 对象。

  * `extra` {Object}
    * `attributes` {Object} 来自属性的数据：
      ```mjs
      import foo from 'foo' with { name: 'value' };
      //                         ^^^^^^^^^^^^^^^^^ 属性
      ```
      根据 ECMA-262，如果存在不支持的属性，预计宿主会触发错误。
    * `assert` {Object} `extra.attributes` 的别名。

  * 返回：{vm.Module|Promise}
* 返回：{Promise}

链接模块依赖。此方法必须在求值之前调用，并且
每个模块只能调用一次。

使用 [`sourceTextModule.linkRequests(modules)`][] 和
[`sourceTextModule.instantiate()`][] 来同步或异步地链接模块。

该函数预计返回一个 `Module` 对象或一个最终
解决为 `Module` 对象的 `Promise`。返回的 `Module` 必须满足以下
两个不变量：

* 它必须属于与父 `Module` 相同的上下文。
* 其 `status` 不能是 `'errored'`。

如果返回的 `Module` 的 `status` 是 `'unlinked'`，此方法将
使用提供的相同 `linker` 函数递归调用返回的 `Module`。

`link()` 返回一个 `Promise`，当所有链接实例解决为有效的 `Module` 时，该 promise 将得到解决，
或者如果链接器函数抛出异常或返回无效的 `Module`，则该 promise 将被拒绝。

链接器函数大致对应于 ECMAScript
规范中实现定义的 [HostResolveImportedModule][] 抽象操作，但有一些关键区别：

* 链接器函数允许是异步的，而
  [HostResolveImportedModule][] 是同步的。

模块链接期间使用的实际 [HostResolveImportedModule][] 实现是返回链接期间链接的模块的那个。因为到
那时所有模块都已经完全链接，所以
[HostResolveImportedModule][] 实现根据规范是完全同步的。

对应于 ECMAScript 规范中 [循环模块记录][] 的 [Link() 具体方法][] 字段。

### `module.namespace`

* 类型：{Object}

模块的命名空间对象。这仅在链接
（`module.link()`）完成后可用。

对应于 ECMAScript 规范中的 [GetModuleNamespace][] 抽象操作。

### `module.status`

* 类型：{string}

模块的当前状态。将是以下之一：

* `'unlinked'`：尚未调用 `module.link()`。

* `'linking'`：已调用 `module.link()`，但链接器函数返回的所有 Promise 尚未
  解决。

* `'linked'`：模块已成功链接，并且其所有
  依赖已链接，但尚未调用 `module.evaluate()`。

* `'evaluating'`：模块正在通过其自身或父模块上的 `module.evaluate()` 进行求值。

* `'evaluated'`：模块已成功求值。

* `'errored'`：模块已求值，但抛出了异常。

除了 `'errored'` 之外，此状态字符串对应于规范的
[循环模块记录][] 的 `[[Status]]` 字段。`'errored'` 对应于
规范中的 `'evaluated'`，但 `[[EvaluationError]]` 设置为
不为 `undefined` 的值。

## 类：`vm.SourceTextModule`

<!-- YAML
added: v9.6.0
-->

> 稳定性：1 - 实验性

此功能仅在启用 `--experimental-vm-modules` 命令行标志时可用。

* 继承自：{vm.Module}

`vm.SourceTextModule` 类提供了 ECMAScript 规范中定义的 [源代码模块记录][]。

### `new vm.SourceTextModule(code[, options])`

<!-- YAML
changes:
  - version:
    - v17.0.0
    - v16.12.0
    pr-url: https://github.com/nodejs/node/pull/40249
    description: 为 importModuleDynamically 参数添加了对导入属性的支持。
-->

* `code` {string} 要解析的 JavaScript 模块代码
* `options`
  * `identifier` {string} 用于堆栈轨迹的字符串。
    **默认值：** `'vm:module(i)'`，其中 `i` 是特定于上下文的递增索引。
  * `cachedData` {Buffer|TypedArray|DataView} 提供一个可选的 `Buffer` 或 `TypedArray` 或 `DataView`，包含 V8 针对所提供源代码的代码缓存数据。`code` 必须与创建此 `cachedData` 的模块相同。
  * `context` {Object} [上下文化的][] 对象，由 `vm.createContext()` 方法返回，用于在此上下文中编译和求值此 `Module`。如果未指定上下文，模块将在当前执行上下文中求值。
  * `lineOffset` {integer} 指定此 `Module` 生成的堆栈轨迹中显示的行号偏移量。**默认值：** `0`。
  * `columnOffset` {integer} 指定此 `Module` 生成的堆栈轨迹中显示的第一行列号偏移量。**默认值：** `0`。
  * `initializeImportMeta` {Function} 在此 `Module` 求值期间调用，以初始化 `import.meta`。
    * `meta` {import.meta}
    * `module` {vm.SourceTextModule}
  * `importModuleDynamically` {Function} 用于指定在此模块求值期间调用 `import()` 时应如何加载模块。此选项是实验性模块 API 的一部分。我们不建议在生产环境中使用它。详细信息请参阅 [编译 API 中对动态 `import()` 的支持][]。

创建一个新的 `SourceTextModule` 实例。

分配给 `import.meta` 对象的属性如果是对象，可能会允许模块访问指定 `context` 之外的信息。使用 `vm.runInContext()` 在特定上下文中创建对象。

```mjs
import vm from 'node:vm';

const contextifiedObject = vm.createContext({ secret: 42 });

const module = new vm.SourceTextModule(
  'Object.getPrototypeOf(import.meta.prop).secret = secret;',
  {
    initializeImportMeta(meta) {
      // 注意：此对象是在顶层上下文中创建的。因此，
      // Object.getPrototypeOf(import.meta.prop) 指向
      // 顶层上下文中的 Object.prototype，而不是
      // 上下文化对象中的那个。
      meta.prop = {};
    },
  });
// 该模块有一个空的 `moduleRequests` 数组。
module.linkRequests([]);
module.instantiate();
await module.evaluate();

// 现在，Object.prototype.secret 将等于 42。
//
// 要解决此问题，请将
//     meta.prop = {};
// 上方代码替换为
//     meta.prop = vm.runInContext('{}', contextifiedObject);
```

```cjs
const vm = require('node:vm');
const contextifiedObject = vm.createContext({ secret: 42 });
(async () => {
  const module = new vm.SourceTextModule(
    'Object.getPrototypeOf(import.meta.prop).secret = secret;',
    {
      initializeImportMeta(meta) {
        // 注意：此对象是在顶层上下文中创建的。因此，
        // Object.getPrototypeOf(import.meta.prop) 指向
        // 顶层上下文中的 Object.prototype，而不是
        // 上下文化对象中的那个。
        meta.prop = {};
      },
    });
  // 该模块有一个空的 `moduleRequests` 数组。
  module.linkRequests([]);
  module.instantiate();
  await module.evaluate();
  // 现在，Object.prototype.secret 将等于 42。
  //
  // 要解决此问题，请将
  //     meta.prop = {};
  // 上方代码替换为
  //     meta.prop = vm.runInContext('{}', contextifiedObject);
})();
```

### `sourceTextModule.createCachedData()`

<!-- YAML
added:
 - v13.7.0
 - v12.17.0
-->

* 返回：{Buffer}

创建一个代码缓存，可与 `SourceTextModule` 构造函数的 `cachedData` 选项一起使用。返回一个 `Buffer`。此方法可以在模块求值之前调用任意次数。

`SourceTextModule` 的代码缓存不包含任何 JavaScript 可观察状态。代码缓存可以安全地与脚本源代码一起保存，并用于多次构造新的 `SourceTextModule` 实例。

`SourceTextModule` 源代码中的函数可以标记为延迟编译，它们在 `SourceTextModule` 构造时不会编译。这些函数将在首次调用时编译。代码缓存序列化 V8 当前了解的关于 `SourceTextModule` 的元数据，可用于加速未来的编译。

```js
// 创建一个初始模块
const module = new vm.SourceTextModule('const a = 1;');

// 从此模块创建缓存数据
const cachedData = module.createCachedData();

// 使用缓存数据创建一个新模块。代码必须相同。
const module2 = new vm.SourceTextModule('const a = 1;', { cachedData });
```

### `sourceTextModule.dependencySpecifiers`

<!-- YAML
changes:
  - version:
    - v24.4.0
    - v22.20.0
    pr-url: https://github.com/nodejs/node/pull/20300
    description: 已弃用，推荐使用 `sourceTextModule.moduleRequests`。
-->

> 稳定性：0 - 已弃用：请改用 [`sourceTextModule.moduleRequests`][]。

* 类型：{string\[]}

此模块所有依赖项的说明符。返回的数组被冻结，不允许对其进行任何更改。

对应于 ECMAScript 规范中 [循环模块记录][] 的 `[[RequestedModules]]` 字段。

### `sourceTextModule.hasAsyncGraph()`

<!-- YAML
added: v24.9.0
-->

* 返回：{boolean}

遍历依赖图，如果其依赖项中的任何模块或此模块本身包含顶层 `await` 表达式，则返回 `true`，否则返回 `false`。

如果图足够大，搜索可能会很慢。

这要求模块首先被实例化。如果模块尚未实例化，将抛出错误。

### `sourceTextModule.hasTopLevelAwait()`

<!-- YAML
added: v24.9.0
-->

* 返回：{boolean}

返回模块本身是否包含任何顶层 `await` 表达式。

这对应于 ECMAScript 规范中 [循环模块记录][] 的 `[[HasTLA]]` 字段。

### `sourceTextModule.instantiate()`

<!-- YAML
added:
 - v24.8.0
 - v22.21.0
-->

* 返回：{undefined}

使用链接的请求模块实例化模块。

这会解析模块的导入绑定，包括重新导出的绑定名称。当存在任何无法解析的绑定时，将同步抛出错误。

如果请求的模块包括循环依赖，则在调用此方法之前，必须在循环中的所有模块上调用 [`sourceTextModule.linkRequests(modules)`][] 方法。

### `sourceTextModule.linkRequests(modules)`

<!-- YAML
added:
 - v24.8.0
 - v22.21.0
-->

* `modules` {vm.Module\[]} 此模块依赖的 `vm.Module` 对象数组。
  数组中模块的顺序是 [`sourceTextModule.moduleRequests`][] 的顺序。
* 返回：{undefined}

链接模块依赖项。此方法必须在求值之前调用，且每个模块只能调用一次。

`modules` 数组中模块实例的顺序应与 [`sourceTextModule.moduleRequests`][] 被解析的顺序相对应。如果两个模块请求具有相同的说明符和导入属性，它们必须解析为同一个模块实例，否则将抛出 `ERR_MODULE_LINK_MISMATCH`。例如，当链接此模块的请求时：

<!-- eslint-disable no-duplicate-imports -->

```mjs
import foo from 'foo';
import source Foo from 'foo';
```

<!-- eslint-enable no-duplicate-imports -->

`modules` 数组必须包含对同一实例的两个引用，因为这两个模块请求是相同的，但处于两个阶段。

如果模块没有依赖项，`modules` 数组可以为空。

用户可以使用 `sourceTextModule.moduleRequests` 实现 ECMAScript 规范中宿主定义的 [HostLoadImportedModule][] 抽象操作，并使用 `sourceTextModule.linkRequests()` 在模块上批量调用规范定义的 [FinishLoadingImportedModule][]。

依赖项的解析是同步还是异步，由 `SourceTextModule` 的创建者决定。

在 `modules` 数组中的每个模块链接后，调用 [`sourceTextModule.instantiate()`][]。

### `sourceTextModule.moduleRequests`

<!-- YAML
added:
  - v24.4.0
  - v22.20.0
-->

* 类型：{ModuleRequest\[]} 此模块的依赖项。

此模块请求的导入依赖项。返回的数组被冻结，不允许对其进行任何更改。

例如，给定源代码文本：

<!-- eslint-disable no-duplicate-imports -->

```mjs
import foo from 'foo';
import fooAlias from 'foo';
import bar from './bar.js';
import withAttrs from '../with-attrs.ts' with { arbitraryAttr: 'attr-val' };
import source Module from 'wasm-mod.wasm';
```

<!-- eslint-enable no-duplicate-imports -->

`sourceTextModule.moduleRequests` 的值将为：

```js
[
  {
    specifier: 'foo',
    attributes: {},
    phase: 'evaluation',
  },
  {
    specifier: 'foo',
    attributes: {},
    phase: 'evaluation',
  },
  {
    specifier: './bar.js',
    attributes: {},
    phase: 'evaluation',
  },
  {
    specifier: '../with-attrs.ts',
    attributes: { arbitraryAttr: 'attr-val' },
    phase: 'evaluation',
  },
  {
    specifier: 'wasm-mod.wasm',
    attributes: {},
    phase: 'source',
  },
];
```

## 类：`vm.SyntheticModule`

<!-- YAML
added:
 - v13.0.0
 - v12.16.0
-->

> 稳定性：1 - 实验性

此功能仅在启用 `--experimental-vm-modules` 命令行标志时可用。

* 继承自：{vm.Module}

`vm.SyntheticModule` 类提供了 WebIDL 规范中定义的 [合成模块记录][]。合成模块的目的是提供一个通用接口，用于将非 JavaScript 源暴露给 ECMAScript 模块图。

```mjs
import { SyntheticModule } from 'node:vm';

const source = '{ "a": 1 }';
const syntheticModule = new SyntheticModule(['default'], function() {
  const obj = JSON.parse(source);
  this.setExport('default', obj);
});

// 在链接中使用 `syntheticModule`
(async () => {
  await syntheticModule.link(() => {});
  await syntheticModule.evaluate();

  console.log('Default export:', syntheticModule.namespace.default);
})();
```

```cjs
const { SyntheticModule } = require('node:vm');

const source = '{ "a": 1 }';
const syntheticModule = new SyntheticModule(['default'], function() {
  const obj = JSON.parse(source);
  this.setExport('default', obj);
});

// 在链接中使用 `syntheticModule`
(async () => {
  await syntheticModule.link(() => {});
  await syntheticModule.evaluate();

  console.log('Default export:', syntheticModule.namespace.default);
})();
```

### `new vm.SyntheticModule(exportNames, evaluateCallback[, options])`

<!-- YAML
added:
 - v13.0.0
 - v12.16.0
-->

* `exportNames` {string\[]} 将从模块导出的名称数组。
* `evaluateCallback` {Function} 当模块被求值时调用。
* `options`
  * `identifier` {string} 用于堆栈轨迹的字符串。
    **默认值：** `'vm:module(i)'`，其中 `i` 是特定于上下文的递增索引。
  * `context` {Object} [上下文化的][] 对象，由 `vm.createContext()` 方法返回，用于在此上下文中编译和求值此 `Module`。

创建一个新的 `SyntheticModule` 实例。

分配给此实例导出的对象可能会允许模块的导入者访问指定 `context` 之外的信息。使用 `vm.runInContext()` 在特定上下文中创建对象。

### `syntheticModule.setExport(name, value)`

<!-- YAML
added:
 - v13.0.0
 - v12.16.0
changes:
  - version:
     - v24.8.0
     - v22.21.0
    pr-url: https://github.com/nodejs/node/pull/59000
    description: 调用此方法前不再需要调用 `syntheticModule.link()`。
-->

* `name` {string} 要设置的导出名称。
* `value` {any} 要设置给导出的值。

此方法使用给定值设置模块导出绑定槽。

```mjs
import vm from 'node:vm';

const m = new vm.SyntheticModule(['x'], () => {
  m.setExport('x', 1);
});

await m.evaluate();

assert.strictEqual(m.namespace.x, 1);
```

```cjs
const vm = require('node:vm');
(async () => {
  const m = new vm.SyntheticModule(['x'], () => {
    m.setExport('x', 1);
  });
  await m.evaluate();
  assert.strictEqual(m.namespace.x, 1);
})();
```

## 类型：`ModuleRequest`

<!-- YAML
added:
  - v24.4.0
  - v22.20.0
-->

* 类型：{Object}
  * `specifier` {string} 请求模块的标识符。
  * `attributes` {Object} 传递给 [ImportDeclaration][] 中的 [WithClause][] 的 `"with"` 值，
    如果未提供值，则为空对象。
  * `phase` {string} 请求模块的阶段（`"source"` 或 `"evaluation"`）。

`ModuleRequest` 表示使用给定导入属性和阶段导入模块的请求。

## `vm.compileFunction(code[, params[, options]])`

<!-- YAML
added: v10.10.0
changes:
  - version:
    - v21.7.0
    - v20.12.0
    pr-url: https://github.com/nodejs/node/pull/51244
    description: Added support for
                `vm.constants.USE_MAIN_CONTEXT_DEFAULT_LOADER`.
  - version:
    - v19.6.0
    - v18.15.0
    pr-url: https://github.com/nodejs/node/pull/46320
    description: The return value now includes `cachedDataRejected`
                 with the same semantics as the `vm.Script` version
                 if the `cachedData` option was passed.
  - version:
    - v17.0.0
    - v16.12.0
    pr-url: https://github.com/nodejs/node/pull/40249
    description: Added support for import attributes to the
                 `importModuleDynamically` parameter.
  - version: v15.9.0
    pr-url: https://github.com/nodejs/node/pull/35431
    description: Added `importModuleDynamically` option again.
  - version: v14.3.0
    pr-url: https://github.com/nodejs/node/pull/33364
    description: Removal of `importModuleDynamically` due to compatibility
                 issues.
  - version:
    - v14.1.0
    - v13.14.0
    pr-url: https://github.com/nodejs/node/pull/32985
    description: The `importModuleDynamically` option is now supported.
-->

* `code` {string} 要编译的函数体。
* `params` {string\[]} 包含函数所有参数的字符串数组。
* `options` {Object}
  * `filename` {string} 指定此脚本生成的堆栈跟踪中使用的文件名。**默认值：** `''`。
  * `lineOffset` {number} 指定此脚本生成的堆栈跟踪中显示的行号偏移量。**默认值：** `0`。
  * `columnOffset` {number} 指定此脚本生成的堆栈跟踪中显示的第一行列号偏移量。**默认值：** `0`。
  * `cachedData` {Buffer|TypedArray|DataView} 提供可选的 `Buffer` 或
    `TypedArray` 或 `DataView`，包含 V8 对提供的源代码的代码缓存数据。
    这必须由先前使用相同 `code` 和 `params` 调用 [`vm.compileFunction()`][] 生成。
  * `produceCachedData` {boolean} 指定是否生成新的缓存数据。**默认值：** `false`。
  * `parsingContext` {Object} 所述函数应在其中编译的 [上下文化][contextified] 对象。
  * `contextExtensions` {Object\[]} 包含要在编译时应用的上下文扩展集合（包装当前作用域的对象）的数组。**默认值：** `[]`。
  * `importModuleDynamically`
    {Function|vm.constants.USE\_MAIN\_CONTEXT\_DEFAULT\_LOADER}
    用于指定在此函数评估期间调用 `import()` 时应如何加载模块。此选项是实验性模块 API 的一部分。
    我们不建议在生产环境中使用它。详细信息请参阅
    [编译 API 中对动态 `import()` 的支持][]。
* 返回：{Function}

将给定代码编译到提供的上下文中（如果未提供上下文，则使用当前上下文），
并将其包装在具有给定 `params` 的函数内返回。

## `vm.constants`

<!-- YAML
added:
  - v21.7.0
  - v20.12.0
-->

* 类型：{Object}

返回一个包含 VM 操作常用常量的对象。

### `vm.constants.USE_MAIN_CONTEXT_DEFAULT_LOADER`

<!-- YAML
added:
  - v21.7.0
  - v20.12.0
-->

> 稳定性：1.1 - 积极开发中

一个常量，可用作 `vm.Script` 和 `vm.compileFunction()` 的 `importModuleDynamically` 选项，
以便 Node.js 使用主上下文的默认 ESM 加载器来加载请求的模块。

详细信息请参阅
[编译 API 中对动态 `import()` 的支持][]。

## `vm.createContext([contextObject[, options]])`

<!-- YAML
added: v0.3.1
changes:
  - version:
    - v22.8.0
    - v20.18.0
    pr-url: https://github.com/nodejs/node/pull/54394
    description: The `contextObject` argument now accepts `vm.constants.DONT_CONTEXTIFY`.
  - version:
    - v21.7.0
    - v20.12.0
    pr-url: https://github.com/nodejs/node/pull/51244
    description: Added support for
                 `vm.constants.USE_MAIN_CONTEXT_DEFAULT_LOADER`.
  - version:
    - v21.2.0
    - v20.11.0
    pr-url: https://github.com/nodejs/node/pull/50360
    description: The `importModuleDynamically` option is supported now.
  - version: v14.6.0
    pr-url: https://github.com/nodejs/node/pull/34023
    description: The `microtaskMode` option is supported now.
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/19398
    description: The first argument can no longer be a function.
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/19016
    description: The `codeGeneration` option is supported now.
-->

* `contextObject` {Object|vm.constants.DONT\_CONTEXTIFY|undefined}
  要么是 [`vm.constants.DONT_CONTEXTIFY`][]，要么是将要 [上下文化][contextified] 的对象。
  如果为 `undefined`，则将创建一个空的上下文化对象以保持向后兼容性。
* `options` {Object}
  * `name` {string} 新创建上下文的人类可读名称。**默认值：** `'VM Context i'`，其中 `i` 是
    所创建上下文的递增数字索引。
  * `origin` {string} 对应于新创建上下文的 [来源][origin]，用于显示目的。来源的格式应像 URL，
    但仅包含方案、主机和端口（如果需要），就像 [`URL`][] 对象的 [`url.origin`][] 属性的值一样。
    最值得注意的是，此字符串应省略尾随斜杠，因为它表示路径。**默认值：** `''`。
  * `codeGeneration` {Object}
    * `strings` {boolean} 如果设置为 false，任何对 `eval` 或函数
      构造函数（`Function`、`GeneratorFunction` 等）的调用都将抛出
      `EvalError`。**默认值：** `true`。
    * `wasm` {boolean} 如果设置为 false，任何编译 WebAssembly
      模块的尝试都将抛出 `WebAssembly.CompileError`。**默认值：** `true`。
  * `microtaskMode` {string} 如果设置为 `afterEvaluate`，微任务（通过 `Promise` 和 `async function` 调度的任务）
    将在脚本通过 [`script.runInContext()`][] 运行后立即运行。
    在这种情况下，它们包含在 `timeout` 和 `breakOnSigint` 作用域中。
  * `importModuleDynamically`
    {Function|vm.constants.USE\_MAIN\_CONTEXT\_DEFAULT\_LOADER}
    用于指定在此上下文中调用 `import()` 且没有引用者脚本或模块时应如何加载模块。此选项是
    实验性模块 API 的一部分。我们不建议在生产环境中使用它。详细信息请参阅
    [编译 API 中对动态 `import()` 的支持][]。
* 返回：{Object} 上下文化对象。

如果给定的 `contextObject` 是一个对象，`vm.createContext()` 方法将 [准备该对象][contextified]
并返回对它的引用，以便它可用于 [`vm.runInContext()`][] 或 [`script.runInContext()`][] 的调用。
在此类脚本内部，全局对象将被 `contextObject` 包装，保留其所有现有属性，
同时还拥有任何标准 [全局对象][] 具有的内置对象和函数。在由 vm 模块运行的脚本之外，
全局变量将保持不变。

```mjs
import { createContext, runInContext } from 'node:vm';

global.globalVar = 3;

const context = { globalVar: 1 };
createContext(context);

runInContext('globalVar *= 2;', context);

console.log(context);
// 打印：{ globalVar: 2 }

console.log(global.globalVar);
// 打印：3
```

```cjs
const { createContext, runInContext } = require('node:vm');

global.globalVar = 3;

const context = { globalVar: 1 };
createContext(context);

runInContext('globalVar *= 2;', context);

console.log(context);
// 打印：{ globalVar: 2 }

console.log(global.globalVar);
// 打印：3
```

如果省略 `contextObject`（或显式传递为 `undefined`），将返回一个新的、
空的 [上下文化][contextified] 对象。

当新创建上下文中的全局对象被 [上下文化][contextified] 时，与普通全局对象相比，它有一些怪癖。
例如，它不能被冻结。要创建没有上下文化怪癖的上下文，请将 [`vm.constants.DONT_CONTEXTIFY`][] 作为 `contextObject`
参数传递。有关详细信息，请参阅 [`vm.constants.DONT_CONTEXTIFY`][] 的文档。

`vm.createContext()` 方法主要用于创建单个上下文，可用于运行多个脚本。
例如，如果模拟 Web 浏览器，该方法可用于创建表示窗口全局对象的单个上下文，
然后在该上下文中一起运行所有 `<script>` 标签。

提供的上下文的 `name` 和 `origin` 通过 Inspector API 可见。

## `vm.isContext(object)`

<!-- YAML
added: v0.11.7
-->

* `object` {Object}
* 返回：{boolean}

如果给定的 `object` 对象已使用 [`vm.createContext()`][] 进行了 [上下文化][contextified]，
或者它是使用 [`vm.constants.DONT_CONTEXTIFY`][] 创建的上下文的全局对象，则返回 `true`。

## `vm.measureMemory([options])`

<!-- YAML
added: v13.10.0
-->

> 稳定性：1 - 实验性

测量 V8 已知且当前 V8 隔离区已知的所有上下文或主上下文使用的内存。

* `options` {Object} 可选。
  * `mode` {string} 要么是 `'summary'` 要么是 `'detailed'`。在 summary 模式下，
    仅返回为主上下文测量的内存。在
    detailed 模式下，将返回为当前 V8 隔离区已知的所有上下文测量的内存。
    **默认值：** `'summary'`
  * `execution` {string} 要么是 `'default'` 要么是 `'eager'`。使用 default
    执行，Promise 将在下一次计划的垃圾回收开始后才解析，这可能需要一段时间（或者如果程序
    在下一次 GC 之前退出，则永远不会）。使用 eager 执行，GC 将立即启动
    以测量内存。**默认值：** `'default'`
* 返回：{Promise} 如果内存测量成功，Promise 将
  解析为一个包含有关内存使用情况信息的对象。
  否则，它将拒绝并抛出 `ERR_CONTEXT_NOT_INITIALIZED` 错误。

返回的 Promise 可能解析的对象格式特定于 V8 引擎，并且可能随 V8 版本的变化而变化。

返回的结果与 `v8.getHeapSpaceStatistics()` 返回的统计信息不同，`vm.measureMemory()` 测量
当前 V8 引擎实例中每个 V8 特定上下文可到达的内存，而 `v8.getHeapSpaceStatistics()` 的结果测量
当前 V8 实例中每个堆空间占用的内存。

```mjs
import { createContext, measureMemory } from 'node:vm';
// 测量主上下文使用的内存。
measureMemory({ mode: 'summary' })
  // 这与 vm.measureMemory() 相同
  .then((result) => {
    // 当前格式为：
    // {
    //   total: { jsMemoryEstimate: 1601828, jsMemoryRange: [1601828, 5275288] },
    //   WebAssembly: { code: 0, metadata: 33962 },
    // }
    console.log(result);
  });

const context = createContext({ a: 1 });
measureMemory({ mode: 'detailed', execution: 'eager' }).then((result) => {
  // 在此处引用上下文，以便它不会被垃圾回收
  // 直到测量完成。
  console.log('Context:', context.a);
  // {
  //   total: { jsMemoryEstimate: 1767100, jsMemoryRange: [1767100, 5440560] },
  //   WebAssembly: { code: 0, metadata: 33962 },
  //   current: { jsMemoryEstimate: 1601828, jsMemoryRange: [1601828, 5275288] },
  //   other: [{ jsMemoryEstimate: 165272, jsMemoryRange: [Array] }],
  // }
  console.log(result);
});
```

```cjs
const { createContext, measureMemory } = require('node:vm');
// 测量主上下文使用的内存。
measureMemory({ mode: 'summary' })
  // 这与 vm.measureMemory() 相同
  .then((result) => {
    // 当前格式为：
    // {
    //   total: { jsMemoryEstimate: 1601828, jsMemoryRange: [1601828, 5275288] },
    //   WebAssembly: { code: 0, metadata: 33962 },
    // }
    console.log(result);
  });

const context = createContext({ a: 1 });
measureMemory({ mode: 'detailed', execution: 'eager' }).then((result) => {
  // 在此处引用上下文，以便它不会被垃圾回收
  // 直到测量完成。
  console.log('Context:', context.a);
  // {
  //   total: { jsMemoryEstimate: 1767100, jsMemoryRange: [1767100, 5440560] },
  //   WebAssembly: { code: 0, metadata: 33962 },
  //   current: { jsMemoryEstimate: 1601828, jsMemoryRange: [1601828, 5275288] },
  //   other: [{ jsMemoryEstimate: 165272, jsMemoryRange: [Array] }],
  // }
  console.log(result);
});
```

## `vm.runInContext(code, contextifiedObject[, options])`

<!-- YAML
added: v0.3.1
changes:
  - version:
    - v21.7.0
    - v20.12.0
    pr-url: https://github.com/nodejs/node/pull/51244
    description: 添加了对
                `vm.constants.USE_MAIN_CONTEXT_DEFAULT_LOADER` 的支持。
  - version:
    - v17.0.0
    - v16.12.0
    pr-url: https://github.com/nodejs/node/pull/40249
    description: 添加了对导入属性到
                 `importModuleDynamically` 参数的支持。
  - version: v6.3.0
    pr-url: https://github.com/nodejs/node/pull/6635
    description: 现在支持 `breakOnSigint` 选项。
-->

* `code` {string} 要编译和运行的 JavaScript 代码。
* `contextifiedObject` {Object} 当编译和运行 `code` 时将用作 `global` 的 [上下文化][contextified] 对象。
* `options` {Object|string}
  * `filename` {string} 指定此脚本生成的堆栈跟踪中使用的文件名。**默认值：** `'evalmachine.<anonymous>'`。
  * `lineOffset` {number} 指定此脚本生成的堆栈跟踪中显示的行号偏移量。**默认值：** `0`。
  * `columnOffset` {number} 指定此脚本生成的堆栈跟踪中显示的首行列号偏移量。**默认值：** `0`。
  * `displayErrors` {boolean} 当为 `true` 时，如果编译 `code` 时发生 [`Error`][]，导致错误的代码行将附加到堆栈跟踪中。**默认值：** `true`。
  * `timeout` {integer} 指定在执行 `code` 多少毫秒后终止执行。如果执行被终止，将抛出 [`Error`][]。此值必须是严格正整数。
  * `breakOnSigint` {boolean} 如果为 `true`，接收 `SIGINT`
    (<kbd>Ctrl</kbd>+<kbd>C</kbd>) 将终止执行并抛出
    [`Error`][]。通过 `process.on('SIGINT')` 附加的现有事件处理程序在脚本执行期间被禁用，但在那之后继续工作。**默认值：** `false`。
  * `cachedData` {Buffer|TypedArray|DataView} 提供可选的 `Buffer` 或
    `TypedArray`，或 `DataView`，包含 V8 针对所提供源代码的代码缓存数据。
  * `importModuleDynamically`
    {Function|vm.constants.USE\_MAIN\_CONTEXT\_DEFAULT\_LOADER}
    用于指定当调用 `import()` 时，在此脚本评估期间应如何加载模块。此选项是实验性模块 API 的一部分。我们不建议在生产环境中使用它。详细信息请参阅
    [编译 API 中对动态 `import()` 的支持][Support of dynamic `import()` in compilation APIs]。

`vm.runInContext()` 方法编译 `code`，在 `contextifiedObject` 的上下文中运行它，然后返回结果。运行的代码无法访问本地作用域。`contextifiedObject` 对象 _必须_ 之前已使用 [`vm.createContext()`][] 方法进行了 [上下文化][contextified]。

如果 `options` 是字符串，则它指定文件名。

以下示例使用单个 [上下文化][contextified] 对象编译和执行不同的脚本：

```mjs
import { createContext, runInContext } from 'node:vm';

const contextObject = { globalVar: 1 };
createContext(contextObject);

for (let i = 0; i < 10; ++i) {
  runInContext('globalVar *= 2;', contextObject);
}
console.log(contextObject);
// 输出：{ globalVar: 1024 }
```

```cjs
const { createContext, runInContext } = require('node:vm');

const contextObject = { globalVar: 1 };
createContext(contextObject);

for (let i = 0; i < 10; ++i) {
  runInContext('globalVar *= 2;', contextObject);
}
console.log(contextObject);
// 输出：{ globalVar: 1024 }
```

## `vm.runInNewContext(code[, contextObject[, options]])`

<!-- YAML
added: v0.3.1
changes:
  - version:
    - v22.8.0
    - v20.18.0
    pr-url: https://github.com/nodejs/node/pull/54394
    description: `contextObject` 参数现在接受 `vm.constants.DONT_CONTEXTIFY`。
  - version:
    - v21.7.0
    - v20.12.0
    pr-url: https://github.com/nodejs/node/pull/51244
    description: 添加了对
                `vm.constants.USE_MAIN_CONTEXT_DEFAULT_LOADER` 的支持。
  - version:
    - v17.0.0
    - v16.12.0
    pr-url: https://github.com/nodejs/node/pull/40249
    description: 添加了对导入属性到
                 `importModuleDynamically` 参数的支持。
  - version: v14.6.0
    pr-url: https://github.com/nodejs/node/pull/34023
    description: 现在支持 `microtaskMode` 选项。
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/19016
    description: 现在支持 `contextCodeGeneration` 选项。
  - version: v6.3.0
    pr-url: https://github.com/nodejs/node/pull/6635
    description: 现在支持 `breakOnSigint` 选项。
-->

* `code` {string} 要编译和运行的 JavaScript 代码。
* `contextObject` {Object|vm.constants.DONT\_CONTEXTIFY|undefined}
  要么是 [`vm.constants.DONT_CONTEXTIFY`][]，要么是将被 [上下文化][contextified] 的对象。
  如果为 `undefined`，将为向后兼容性创建一个空的上下文化对象。
* `options` {Object|string}
  * `filename` {string} 指定此脚本生成的堆栈跟踪中使用的文件名。**默认值：** `'evalmachine.<anonymous>'`。
  * `lineOffset` {number} 指定此脚本生成的堆栈跟踪中显示的行号偏移量。**默认值：** `0`。
  * `columnOffset` {number} 指定此脚本生成的堆栈跟踪中显示的首行列号偏移量。**默认值：** `0`。
  * `displayErrors` {boolean} 当为 `true` 时，如果编译 `code` 时发生 [`Error`][]，导致错误的代码行将附加到堆栈跟踪中。**默认值：** `true`。
  * `timeout` {integer} 指定在执行 `code` 多少毫秒后终止执行。如果执行被终止，将抛出 [`Error`][]。此值必须是严格正整数。
  * `breakOnSigint` {boolean} 如果为 `true`，接收 `SIGINT`
    (<kbd>Ctrl</kbd>+<kbd>C</kbd>) 将终止执行并抛出
    [`Error`][]。通过 `process.on('SIGINT')` 附加的现有事件处理程序在脚本执行期间被禁用，但在那之后继续工作。**默认值：** `false`。
  * `contextName` {string} 新创建上下文的人类可读名称。
    **默认值：** `'VM Context i'`，其中 `i` 是创建上下文的递增数字索引。
  * `contextOrigin` {string} 对应于新创建上下文的 [来源][origin]，用于显示目的。来源的格式应像
    URL，但仅包含协议、主机和端口（如果需要），就像 [`URL`][] 对象的 [`url.origin`][] 属性的值一样。最值得注意的是，
    此字符串应省略尾部斜杠，因为它表示路径。
    **默认值：** `''`。
  * `contextCodeGeneration` {Object}
    * `strings` {boolean} 如果设置为 false，任何调用 `eval` 或函数
      构造函数（`Function`、`GeneratorFunction` 等）都将抛出
      `EvalError`。**默认值：** `true`。
    * `wasm` {boolean} 如果设置为 false，任何尝试编译 WebAssembly
      模块都将抛出 `WebAssembly.CompileError`。**默认值：** `true`。
  * `cachedData` {Buffer|TypedArray|DataView} 提供可选的 `Buffer` 或
    `TypedArray`，或 `DataView`，包含 V8 针对所提供源代码的代码缓存数据。
  * `importModuleDynamically`
    {Function|vm.constants.USE\_MAIN\_CONTEXT\_DEFAULT\_LOADER}
    用于指定当调用 `import()` 时，在此脚本评估期间应如何加载模块。此选项是实验性模块 API 的一部分。我们不建议在生产环境中使用它。详细信息请参阅
    [编译 API 中对动态 `import()` 的支持][Support of dynamic `import()` in compilation APIs]。
  * `microtaskMode` {string} 如果设置为 `afterEvaluate`，微任务（通过 `Promise` 和 `async function` 调度的任务）将在脚本运行后立即运行。在这种情况下，它们包含在 `timeout` 和
    `breakOnSigint` 作用域中。
* 返回：{any} 脚本中执行的最后一条语句的结果。

此方法是
`(new vm.Script(code, options)).runInContext(vm.createContext(options), options)` 的快捷方式。
如果 `options` 是字符串，则它指定文件名。

它同时执行以下几件事：

1. 创建新上下文。
2. 如果 `contextObject` 是对象，则使用新上下文对其进行 [上下文化][contextified]。
   如果 `contextObject` 是 undefined，则创建新对象并对其进行 [上下文化][contextified]。
   如果 `contextObject` 是 [`vm.constants.DONT_CONTEXTIFY`][]，则不对任何内容进行 [上下文化][contextified]。
3. 将代码编译为 `vm.Script`
4. 在创建的上下文中运行编译后的代码。代码无法访问调用此方法的作用域。
5. 返回结果。

以下示例编译并执行递增全局变量并设置新变量的代码。这些全局变量包含在 `contextObject` 中。

```mjs
import { runInNewContext, constants } from 'node:vm';

const contextObject = {
  animal: 'cat',
  count: 2,
};

runInNewContext('count += 1; name = "kitty"', contextObject);
console.log(contextObject);
// 输出：{ animal: 'cat', count: 3, name: 'kitty' }

// 如果上下文是从上下文化对象创建的，这将抛出错误。
// vm.constants.DONT_CONTEXTIFY 允许使用普通全局对象创建上下文，这些对象
// 可以被冻结。
const frozenContext = runInNewContext(
  'Object.freeze(globalThis); globalThis;',
  constants.DONT_CONTEXTIFY,
);
```

```cjs
const { runInNewContext, constants } = require('node:vm');

const contextObject = {
  animal: 'cat',
  count: 2,
};

runInNewContext('count += 1; name = "kitty"', contextObject);
console.log(contextObject);
// 输出：{ animal: 'cat', count: 3, name: 'kitty' }

// 如果上下文是从上下文化对象创建的，这将抛出错误。
// vm.constants.DONT_CONTEXTIFY 允许使用普通全局对象创建上下文，这些对象
// 可以被冻结。
const frozenContext = runInNewContext(
  'Object.freeze(globalThis); globalThis;',
  constants.DONT_CONTEXTIFY,
);
```

## `vm.runInThisContext(code[, options])`

<!-- YAML
added: v0.3.1
changes:
  - version:
    - v21.7.0
    - v20.12.0
    pr-url: https://github.com/nodejs/node/pull/51244
    description: 添加了对
                `vm.constants.USE_MAIN_CONTEXT_DEFAULT_LOADER` 的支持。
  - version:
    - v17.0.0
    - v16.12.0
    pr-url: https://github.com/nodejs/node/pull/40249
    description: 为 `importModuleDynamically` 参数添加了对 import 属性的支持。
  - version: v6.3.0
    pr-url: https://github.com/nodejs/node/pull/6635
    description: 现在支持 `breakOnSigint` 选项。
-->

* `code` {string} 要编译和运行的 JavaScript 代码。
* `options` {Object|string}
  * `filename` {string} 指定由此脚本生成的堆栈跟踪中使用的文件名。**默认值：** `'evalmachine.<anonymous>'`。
  * `lineOffset` {number} 指定由此脚本生成的堆栈跟踪中显示的行号偏移量。**默认值：** `0`。
  * `columnOffset` {number} 指定由此脚本生成的堆栈跟踪中显示的第一行列号偏移量。**默认值：** `0`。
  * `displayErrors` {boolean} 当为 `true` 时，如果编译 `code` 时发生 [`Error`][]，导致错误的代码行将附加到堆栈跟踪中。**默认值：** `true`。
  * `timeout` {integer} 指定在执行终止之前执行 `code` 的毫秒数。如果执行被终止，将抛出 [`Error`][]。此值必须是严格正整数。
  * `breakOnSigint` {boolean} 如果为 `true`，接收 `SIGINT`
    (<kbd>Ctrl</kbd>+<kbd>C</kbd>) 将终止执行并抛出
    [`Error`][]。通过 `process.on('SIGINT')` 附加的现有事件处理程序在脚本执行期间被禁用，但在那之后继续工作。**默认值：** `false`。
  * `cachedData` {Buffer|TypedArray|DataView} 提供一个可选的 `Buffer` 或
    `TypedArray`，或 `DataView`，包含所提供源代码的 V8 代码缓存数据。
  * `importModuleDynamically`
    {Function|vm.constants.USE\_MAIN\_CONTEXT\_DEFAULT\_LOADER}
    用于指定在此脚本评估期间当调用 `import()` 时应如何加载模块。此选项是实验性模块 API 的一部分。我们不建议在生产环境中使用它。详细信息，请参阅
    [编译 API 中对动态 `import()` 的支持][]。
* 返回值：{any} 脚本中执行的最后一条语句的结果。

`vm.runInThisContext()` 编译 `code`，在当前 `global` 的上下文中运行它并返回结果。运行的代码无法访问局部作用域，但可以访问当前 `global` 对象。

如果 `options` 是字符串，则它指定文件名。

以下示例说明了同时使用 `vm.runInThisContext()` 和
JavaScript [`eval()`][] 函数来运行相同的代码：

<!-- eslint-disable prefer-const -->

```mjs
import { runInThisContext } from 'node:vm';
let localVar = 'initial value';

const vmResult = runInThisContext('localVar = "vm";');
console.log(`vmResult: '${vmResult}', localVar: '${localVar}'`);
// 打印：vmResult: 'vm', localVar: 'initial value'

const evalResult = eval('localVar = "eval";');
console.log(`evalResult: '${evalResult}', localVar: '${localVar}'`);
// 打印：evalResult: 'eval', localVar: 'eval'
```

<!-- eslint-disable prefer-const -->

```cjs
const { runInThisContext } = require('node:vm');
let localVar = 'initial value';

const vmResult = runInThisContext('localVar = "vm";');
console.log(`vmResult: '${vmResult}', localVar: '${localVar}'`);
// 打印：vmResult: 'vm', localVar: 'initial value'

const evalResult = eval('localVar = "eval";');
console.log(`evalResult: '${evalResult}', localVar: '${localVar}'`);
// 打印：evalResult: 'eval', localVar: 'eval'
```

因为 `vm.runInThisContext()` 无法访问局部作用域，
所以 `localVar` 不变。相比之下，直接调用 `eval()` _确实_ 可以访问
局部作用域，因此 `localVar` 的值被更改。通过这种方式
`vm.runInThisContext()` 很像 [间接 `eval()` 调用][]，例如
`(0,eval)('code')`。

## 示例：在 VM 内运行 HTTP 服务器

当使用 [`script.runInThisContext()`][] 或
[`vm.runInThisContext()`][] 时，代码在当前 V8 全局
上下文中执行。传递给此 VM 上下文的代码将拥有自己隔离的作用域。

为了使用 `node:http` 模块运行一个简单的 Web 服务器，传递给
上下文的代码必须要么自行调用 `require('node:http')`，要么拥有
对 `node:http` 模块的引用传递给它。例如：

```mjs
import { runInThisContext } from 'node:vm';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const code = `
((require) => {
  const { createServer } = require('node:http');

  createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Hello World\\n');
  }).listen(8124);

  console.log('Server running at http://127.0.0.1:8124/');
})`;

runInThisContext(code)(require);
```

```cjs
const { runInThisContext } = require('node:vm');

const code = `
((require) => {
  const { createServer } = require('node:http');

  createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Hello World\\n');
  }).listen(8124);

  console.log('Server running at http://127.0.0.1:8124/');
})`;

runInThisContext(code)(require);
```

上述情况中的 `require()` 与传入它的上下文共享状态。当执行不受信任的代码时，这可能会引入风险，例如以不希望的方式更改上下文中的对象。

## “上下文化”一个对象意味着什么？

在 Node.js 内执行的所有 JavaScript 都在“上下文”的作用域内运行。
根据 [V8 嵌入者指南][]：

> 在 V8 中，上下文是一个执行环境，允许单独、不相关的
> JavaScript 应用程序在单个 V8 实例中运行。你必须明确
> 指定希望任何 JavaScript 代码运行的上下文。

当调用方法 `vm.createContext()` 并传入一个对象时，`contextObject` 参数
将用于包装新的 V8 上下文实例的全局对象
（如果 `contextObject` 是 `undefined`，则在上下文化之前将从当前上下文
创建一个新对象）。此 V8 上下文为使用 `node:vm`
模块的方法运行的 `code` 提供了一个隔离的全局环境，使其可以在其中操作。
创建 V8 上下文并将其与外部上下文中的 `contextObject`
关联的过程，就是本文档所称的对象的“上下文化”。

上下文化会给上下文中的 `globalThis` 值引入一些怪癖。
例如，它不能被冻结，并且它与外部上下文中的 `contextObject`
引用不相等。

```mjs
import { createContext, runInContext } from 'node:vm';

// 未定义的 `contextObject` 选项会使全局对象被上下文化。
const context = createContext();
console.log(runInContext('globalThis', context) === context);  // false
// 上下文化的全局对象不能被冻结。
try {
  runInContext('Object.freeze(globalThis);', context);
} catch (e) {
  console.log(`${e.constructor.name}: ${e.message}`); // TypeError: Cannot freeze
}
console.log(runInContext('globalThis.foo = 1; foo;', context));  // 1
```

```cjs
const { createContext, runInContext } = require('node:vm');

// 未定义的 `contextObject` 选项会使全局对象被上下文化。
const context = createContext();
console.log(runInContext('globalThis', context) === context);  // false
// 上下文化的全局对象不能被冻结。
try {
  runInContext('Object.freeze(globalThis);', context);
} catch (e) {
  console.log(`${e.constructor.name}: ${e.message}`); // TypeError: Cannot freeze
}
console.log(runInContext('globalThis.foo = 1; foo;', context));  // 1
```

要创建一个具有普通全局对象的上下文，并在外部上下文中访问具有较少怪癖的全局代理，请将 `vm.constants.DONT_CONTEXTIFY` 指定为
`contextObject` 参数。

### `vm.constants.DONT_CONTEXTIFY`

此常量当用作 vm API 中的 `contextObject` 参数时，指示 Node.js 创建一个
上下文，而不以 Node.js 特定的方式用另一个对象包装其全局对象。
因此，新上下文内的 `globalThis` 值的行为将更接近普通对象。

```mjs
import { createContext, runInContext, constants } from 'node:vm';

// 使用 vm.constants.DONT_CONTEXTIFY 来冻结全局对象。
const context = createContext(constants.DONT_CONTEXTIFY);
runInContext('Object.freeze(globalThis);', context);
try {
  runInContext('bar = 1; bar;', context);
} catch (e) {
  console.log(`${e.constructor.name}: ${e.message}`); // ReferenceError: bar is not defined
}
```

```cjs
const { createContext, runInContext, constants } = require('node:vm');

// 使用 vm.constants.DONT_CONTEXTIFY 来冻结全局对象。
const context = createContext(constants.DONT_CONTEXTIFY);
runInContext('Object.freeze(globalThis);', context);
try {
  runInContext('bar = 1; bar;', context);
} catch (e) {
  console.log(`${e.constructor.name}: ${e.message}`); // ReferenceError: bar is not defined
}
```

当 `vm.constants.DONT_CONTEXTIFY` 用作 [`vm.createContext()`][] 的 `contextObject` 参数时，
返回的对象是新创建上下文中全局对象的类似代理的对象，具有较少的 Node.js 特定怪癖。
它与新上下文中的 `globalThis` 值引用相等，
可以从上下文外部修改，并可用于直接访问新上下文中的内置对象。

```mjs
import { createContext, runInContext, constants } from 'node:vm';

const context = createContext(constants.DONT_CONTEXTIFY);

// 返回的对象与新上下文中的 globalThis 引用相等。
console.log(runInContext('globalThis', context) === context);  // true

// 可用于直接访问新上下文中的全局变量。
console.log(context.Array);  // [Function: Array]
runInContext('foo = 1;', context);
console.log(context.foo);  // 1
context.bar = 1;
console.log(runInContext('bar;', context));  // 1

// 可以被冻结，且会影响内部上下文。
Object.freeze(context);
try {
  runInContext('baz = 1; baz;', context);
} catch (e) {
  console.log(`${e.constructor.name}: ${e.message}`); // ReferenceError: baz is not defined
}
```

```cjs
const { createContext, runInContext, constants } = require('node:vm');

const context = createContext(constants.DONT_CONTEXTIFY);

// 返回的对象与新上下文中的 globalThis 引用相等。
console.log(runInContext('globalThis', context) === context);  // true

// 可用于直接访问新上下文中的全局变量。
console.log(context.Array);  // [Function: Array]
runInContext('foo = 1;', context);
console.log(context.foo);  // 1
context.bar = 1;
console.log(runInContext('bar;', context));  // 1

// 可以被冻结，且会影响内部上下文。
Object.freeze(context);
try {
  runInContext('baz = 1; baz;', context);
} catch (e) {
  console.log(`${e.constructor.name}: ${e.message}`); // ReferenceError: baz is not defined
}
```

## 超时与异步任务及 Promise 的交互

`Promise` 和 `async function` 可以调度由 JavaScript
引擎异步运行的任务。默认情况下，这些任务在当前栈上的所有 JavaScript
函数执行完成后运行。
这使得可以绕过 `timeout` 和
`breakOnSigint` 选项的功能。

例如，以下由 `vm.runInNewContext()` 执行的代码设置了 5 毫秒的
超时，调度了一个无限循环在 promise
兑现后运行。调度的循环永远不会被超时中断：

```mjs
import { runInNewContext } from 'node:vm';

function loop() {
  console.log('entering loop');
  while (1) console.log(Date.now());
}

runInNewContext(
  'Promise.resolve().then(() => loop());',
  { loop, console },
  { timeout: 5 },
);
// 这行会在 'entering infinite loop' *之前* 打印 (!)
console.log('done executing');
```

```cjs
const { runInNewContext } = require('node:vm');

function loop() {
  console.log('entering loop');
  while (1) console.log(Date.now());
}

runInNewContext(
  'Promise.resolve().then(() => loop());',
  { loop, console },
  { timeout: 5 },
);
// 这行会在 'entering infinite loop' *之前* 打印 (!)
console.log('done executing');
```

可以通过向创建 `Context` 的代码传递 `microtaskMode: 'afterEvaluate'` 来解决此问题：

```mjs
import { runInNewContext } from 'node:vm';

function loop() {
  while (1) console.log(Date.now());
}

runInNewContext(
  'Promise.resolve().then(() => loop());',
  { loop, console },
  { timeout: 5, microtaskMode: 'afterEvaluate' },
);
```

```cjs
const { runInNewContext } = require('node:vm');

function loop() {
  while (1) console.log(Date.now());
}

runInNewContext(
  'Promise.resolve().then(() => loop());',
  { loop, console },
  { timeout: 5, microtaskMode: 'afterEvaluate' },
);
```

在这种情况下，通过 `promise.then()` 调度的微任务将在从 `vm.runInNewContext()` 返回之前运行，并将被
`timeout` 功能中断。这仅适用于在
`vm.Context` 中运行的代码，因此例如 [`vm.runInThisContext()`][] 不接受此选项。

Promise 回调被输入到它们被创建时所在上下文的微任务队列中。例如，如果在上面的例子中 `() => loop()` 被替换为 `loop`，那么 `loop` 将被推入全局微任务
队列，因为它是来自外层（主）上下文的函数，因此也将
能够绕过超时。

如果异步调度函数如 `process.nextTick()`、
`queueMicrotask()`、`setTimeout()`、`setImmediate()` 等在
`vm.Context` 内部可用，传递给它们的函数将被添加到全局队列，
这些队列由所有上下文共享。因此，传递给这些函数的回调
也无法通过超时控制。

### 当 `microtaskMode` 为 `'afterEvaluate'` 时，注意在 Context 之间共享 Promise

在 `'afterEvaluate'` 模式下，`Context` 拥有自己的微任务队列，与
外层（主）上下文使用的全局微任务队列分开。虽然此
模式对于强制执行 `timeout` 和启用 `breakOnSigint` 与
异步任务是必要的，但它也使得在上下文之间共享 promise 变得具有挑战性。

在下面的例子中，一个 promise 在内层上下文中创建并与
外层上下文共享。当外层上下文 `await` 该 promise 时，外层上下文的执行
流程以令人惊讶的方式被破坏：日志语句
永远不会执行。

```mjs
import { createContext, runInContext } from 'node:vm';

const inner_context = createContext({}, { microtaskMode: 'afterEvaluate' });

// runInContext() 返回一个在内层上下文中创建的 Promise。
const inner_promise = runInContext('Promise.resolve()', inner_context);

// 作为执行 `await` 的一部分，JavaScript 运行时必须在创建 `inner_promise` 的
// 上下文的微任务队列上入队一个任务。
// 一个任务被添加到内层微任务队列中，但**它不会自动运行**：此任务将无限期保持挂起状态。
//
// 由于外层微任务队列为空，外层模块中的执行流程直接穿过，下方的日志语句永远不会执行。
await inner_promise;

console.log('this will NOT be printed');
```

```cjs
const { createContext, runInContext } = require('node:vm');

// runInContext() 返回一个在内层上下文中创建的 Promise。
const inner_context = createContext({}, { microtaskMode: 'afterEvaluate' });

(async () => {
  const inner_promise = runInContext('Promise.resolve()', inner_context);

  // 作为执行 `await` 的一部分，JavaScript 运行时必须在创建 `inner_promise` 的
  // 上下文的微任务队列上入队一个任务。
  // 一个任务被添加到内层微任务队列中，但**它不会自动运行**：此任务将无限期保持挂起状态。
  //
  // 由于外层微任务队列为空，外层模块中的执行流程直接穿过，下方的日志语句永远不会执行。
  await inner_promise;

  console.log('this will NOT be printed');
})();
```

要在具有不同微任务队列的上下文之间成功共享 promise，
必须确保**每当**外层上下文在内层微任务队列上入队任务时，内层微任务队列上的任务都会运行。

给定上下文的微任务队列上的任务会在对该上下文使用的脚本或
模块调用 `runInContext()` 或 `SourceTextModule.evaluate()` 时运行。在我们的例子中，正常的执行流程可以通过在 `await
inner_promise` _之前_ 调度第二次调用 `runInContext()` 来恢复。

```mjs
// 调度 `runInContext()` 以手动排空内层上下文微任务
// 队列；它将在下面的 `await` 语句之后运行。
setImmediate(() => {
  vm.runInContext('', context);
});

await inner_promise;

console.log('OK');
```

**注意：** 严格来说，在此模式下，`node:vm` 偏离了 [入队任务][] 的 ECMAScript 规范字面意思，允许来自不同上下文的异步任务以不同于它们入队的顺序运行。

## 编译 API 中对动态 `import()` 的支持

以下 API 支持 `importModuleDynamically` 选项以启用由 vm 模块编译的代码中的动态
`import()`。

* `new vm.Script`
* `vm.compileFunction()`
* `new vm.SourceTextModule`
* `vm.runInThisContext()`
* `vm.runInContext()`
* `vm.runInNewContext()`
* `vm.createContext()`

此选项仍然是实验性模块 API 的一部分。我们不建议
在生产环境中使用它。

### 当未指定 `importModuleDynamically` 选项或为 undefined 时

如果未指定此选项，或者它为 `undefined`，包含
`import()` 的代码仍然可以由 vm API 编译，但当编译后的代码执行并实际调用 `import()` 时，结果将拒绝并抛出
[`ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING`][]。

### 当 `importModuleDynamically` 为 `vm.constants.USE_MAIN_CONTEXT_DEFAULT_LOADER` 时

此选项目前不支持 `vm.SourceTextModule`。

使用此选项，当在编译后的代码中发起 `import()` 时，Node.js
将使用主上下文的默认 ESM 加载器来加载请求的
模块并将其返回给正在执行的代码。

这使得正在编译的代码可以访问 Node.js 内置模块，如 `fs` 或 `http`。如果代码在不同的上下文中执行，
请注意，从主上下文加载的模块创建的对象
仍然来自主上下文，并且不是新上下文中的内置类的
`instanceof` 实例。

```cjs
const { Script, constants } = require('node:vm');
const script = new Script(
  'import("node:fs").then(({readFile}) => readFile instanceof Function)',
  { importModuleDynamically: constants.USE_MAIN_CONTEXT_DEFAULT_LOADER });

// false: 从主上下文加载的 URL 不是新上下文中 Function 类的实例。
script.runInNewContext().then(console.log);
```

```mjs
import { Script, constants } from 'node:vm';

const script = new Script(
  'import("node:fs").then(({readFile}) => readFile instanceof Function)',
  { importModuleDynamically: constants.USE_MAIN_CONTEXT_DEFAULT_LOADER });

// false: 从主上下文加载的 URL 不是新上下文中 Function 类的实例。
script.runInNewContext().then(console.log);
```

此选项还允许脚本或函数加载用户模块：

```mjs
import { Script, constants } from 'node:vm';
import { resolve } from 'node:path';
import { writeFileSync } from 'node:fs';

// 将 test.js 和 test.txt 写入当前运行脚本所在的目录。
writeFileSync(resolve(import.meta.dirname, 'test.mjs'),
              'export const filename = "./test.json";');
writeFileSync(resolve(import.meta.dirname, 'test.json'),
              '{"hello": "world"}');

// 编译一个脚本，加载 test.mjs 然后加载 test.json，就像脚本放在同一目录一样。
const script = new Script(
  `(async function() {
    const { filename } = await import('./test.mjs');
    return import(filename, { with: { type: 'json' } })
  })();`,
  {
    filename: resolve(import.meta.dirname, 'test-with-default.js'),
    importModuleDynamically: constants.USE_MAIN_CONTEXT_DEFAULT_LOADER,
  });

// { default: { hello: 'world' } }
script.runInThisContext().then(console.log);
```

```cjs
const { Script, constants } = require('node:vm');
const { resolve } = require('node:path');
const { writeFileSync } = require('node:fs');

// 将 test.js 和 test.txt 写入当前运行脚本所在的目录。
writeFileSync(resolve(__dirname, 'test.mjs'),
              'export const filename = "./test.json";');
writeFileSync(resolve(__dirname, 'test.json'),
              '{"hello": "world"}');

// 编译一个脚本，加载 test.mjs 然后加载 test.json，就像脚本放在同一目录一样。
const script = new Script(
  `(async function() {
    const { filename } = await import('./test.mjs');
    return import(filename, { with: { type: 'json' } })
  })();`,
  {
    filename: resolve(__dirname, 'test-with-default.js'),
    importModuleDynamically: constants.USE_MAIN_CONTEXT_DEFAULT_LOADER,
  });

// { default: { hello: 'world' } }
script.runInThisContext().then(console.log);
```

使用主上下文的默认加载器加载用户模块有一些注意事项：

1. 被解析的模块将相对于传递给 `vm.Script` 或 `vm.compileFunction()` 的 `filename` 选项。解析可以使用绝对路径或 URL 字符串的 `filename`。如果 `filename` 是既不是绝对路径也不是 URL 的字符串，或者它是 undefined，
   解析将相对于进程的当前工作目录。在 `vm.createContext()` 的情况下，解析总是
   相对于当前工作目录，因为此选项仅在没有引用者脚本或模块时使用。
2. 对于任何解析为特定路径的 `filename`，一旦进程
   成功从该路径加载特定模块，结果可能会被缓存，
   随后从同一路径加载同一模块将返回相同的内容。如果 `filename` 是 URL 字符串，如果它具有不同的搜索参数，则不会命中缓存。对于不是 URL
   字符串的 `filename`，目前无法绕过缓存行为。

### 当 `importModuleDynamically` 是一个函数时

当 `importModuleDynamically` 是一个函数时，当编译后的代码中调用 `import()` 时它将被调用，以便用户自定义请求的模块应如何编译和求值。目前，Node.js 实例必须
使用 `--experimental-vm-modules` 标志启动才能使此选项工作。如果
未设置该标志，此回调将被忽略。如果求值的代码
实际调用 `import()`，结果将拒绝并抛出
[`ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING_FLAG`][]。

回调 `importModuleDynamically(specifier, referrer, importAttributes)`
具有以下签名：

* `specifier` {string} 传递给 `import()` 的标识符
* `referrer` {vm.Script|Function|vm.SourceTextModule|Object}
  对于 `new vm.Script`、
  `vm.runInThisContext`、`vm.runInContext` 和 `vm.runInNewContext`，引用者是编译后的 `vm.Script`。对于 `vm.compileFunction`，它是编译后的
  `Function`，对于 `new vm.SourceTextModule`，它是编译后的
  `vm.SourceTextModule`，对于 `vm.createContext()`，它是上下文 `Object`。
* `importAttributes` {Object} 传递给 [`optionsExpression`][] 可选参数的 `"with"` 值，如果未提供值则为空对象。
* `phase` {string} 动态导入的阶段（`"source"` 或 `"evaluation"`）。
* 返回：{Module Namespace Object|vm.Module} 建议返回 `vm.Module` 以利用错误跟踪，并避免命名空间包含 `then` 函数导出的问题。

```mjs
// 此脚本必须使用 --experimental-vm-modules 运行。
import { Script, SyntheticModule } from 'node:vm';

const script = new Script('import("foo.json", { with: { type: "json" } })', {
  async importModuleDynamically(specifier, referrer, importAttributes) {
    console.log(specifier);  // 'foo.json'
    console.log(referrer);   // 编译后的脚本
    console.log(importAttributes);  // { type: 'json' }
    const m = new SyntheticModule(['bar'], () => { });
    await m.link(() => { });
    m.setExport('bar', { hello: 'world' });
    return m;
  },
});
const result = await script.runInThisContext();
console.log(result);  //  { bar: { hello: 'world' } }
```

```cjs
// 此脚本必须使用 --experimental-vm-modules 运行。
const { Script, SyntheticModule } = require('node:vm');

(async function main() {
  const script = new Script('import("foo.json", { with: { type: "json" } })', {
    async importModuleDynamically(specifier, referrer, importAttributes) {
      console.log(specifier);  // 'foo.json'
      console.log(referrer);   // 编译后的脚本
      console.log(importAttributes);  // { type: 'json' }
      const m = new SyntheticModule(['bar'], () => { });
      await m.link(() => { });
      m.setExport('bar', { hello: 'world' });
      return m;
    },
  });
  const result = await script.runInThisContext();
  console.log(result);  //  { bar: { hello: 'world' } }
})();
```

[循环模块记录]: https://tc39.es/ecma262/#sec-cyclic-module-records
[ECMAScript 模块加载器]: esm.md#modules-ecmascript-modules
[Evaluate() 具体方法]: https://tc39.es/ecma262/#sec-moduleevaluation
[合成模块记录的 Evaluate()]: https://tc39.es/ecma262/#sec-smr-Evaluate
[FinishLoadingImportedModule]: https://tc39.es/ecma262/#sec-FinishLoadingImportedModule
[GetModuleNamespace]: https://tc39.es/ecma262/#sec-getmodulenamespace
[HostLoadImportedModule]: https://tc39.es/ecma262/#sec-HostLoadImportedModule
[HostResolveImportedModule]: https://tc39.es/ecma262/#sec-hostresolveimportedmodule
[ImportDeclaration]: https://tc39.es/ecma262/#prod-ImportDeclaration
[Link() 具体方法]: https://tc39.es/ecma262/#sec-moduledeclarationlinking
[模块记录]: https://tc39.es/ecma262/#sec-abstract-module-records
[源文本模块记录]: https://tc39.es/ecma262/#sec-source-text-module-records
[编译 API 中对动态 `import()` 的支持]: #support-of-dynamic-import-in-compilation-apis
[合成模块记录]: https://tc39.es/ecma262/#sec-synthetic-module-records
[V8 嵌入者指南]: https://v8.dev/docs/embed#contexts
[WithClause]: https://tc39.es/ecma262/#prod-WithClause
[`ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING_FLAG`]: errors.md#err_vm_dynamic_import_callback_missing_flag
[`ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING`]: errors.md#err_vm_dynamic_import_callback_missing
[`Error`]: errors.md#class-error
[`URL`]: url.md#class-url
[`eval()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval
[`optionsExpression`]: https://tc39.es/proposal-import-attributes/#sec-evaluate-import-call
[`script.runInContext()`]: #scriptrunincontextcontextifiedobject-options
[`script.runInThisContext()`]: #scriptruninthiscontextoptions
[`sourceTextModule.instantiate()`]: #sourcetextmoduleinstantiate
[`sourceTextModule.linkRequests(modules)`]: #sourcetextmodulelinkrequestsmodules
[`sourceTextModule.moduleRequests`]: #sourcetextmodulemodulerequests
[`url.origin`]: url.md#urlorigin
[`vm.compileFunction()`]: #vmcompilefunctioncode-params-options
[`vm.constants.DONT_CONTEXTIFY`]: #vmconstantsdont_contextify
[`vm.createContext()`]: #vmcreatecontextcontextobject-options
[`vm.runInContext()`]: #vmrunincontextcode-contextifiedobject-options
[`vm.runInThisContext()`]: #vmruninthiscontextcode-options
[上下文化的]: #what-does-it-mean-to-contextify-an-object
[入队任务]: https://tc39.es/ecma262/#sec-hostenqueuepromisejob
[全局对象]: https://tc39.es/ecma262/#sec-global-object
[间接 `eval()` 调用]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#direct_and_indirect_eval
[源]: https://developer.mozilla.org/en-US/docs/Glossary/Origin
