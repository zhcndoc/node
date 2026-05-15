# core 中 primordials 的使用

文件 `lib/internal/per_context/primordials.js` 会对来自 VM 的 JS
内建对象进行子类化并存储，这样 Node.js 内置模块之后就不需要再从
global proxy 中查找这些对象，因为它可能会被用户修改。

对于代码库中的某些区域，性能和代码可读性被认为比抵御原型污染的可靠性更重要：

* `node:http`
* `node:http2`
* `node:tls`
* `node:zlib`

在其他区域的新代码中应优先使用 primordials，但将现有代码替换为 primordials 时应
[谨慎进行](#primordials-with-known-performance-issues)。在审查涉及其“所属”子系统之一的拉取请求时，强烈建议提醒相关团队。

## 访问 primordials

primordials 仅用于内部，不对内部 core 模块之外的代码开放。用户代码不能使用或依赖 primordials。通常可以依赖 ECMAScript 内建对象，并假定其行为符合规范。

如果你想访问 `primordials` 对象以帮助进行 Node.js core 开发或用于试验，可以使用以下 CLI 标志组合将其暴露到全局作用域：

```bash
node --expose-internals -r internal/test/binding
```

## primordials 的内容

### 全局对象的属性

全局对象上的对象和函数都可能被删除或替换。使用 primordials 中的它们可以让代码更可靠：

```js
globalThis.Array === primordials.Array; // true

globalThis.Array = function() {
  return [1, 2, 3];
};
globalThis.Array === primordials.Array; // false

primordials.Array(0); // []
globalThis.Array(0); // [1,2,3]
```

### 原型方法

ECMAScript 提供了一组可用于内建对象的方法，用于与 JavaScript 对象交互。

```js
const array = [1, 2, 3];
array.push(4); // 这里 `push` 指的是 %Array.prototype.push%.
console.log(JSON.stringify(array)); // [1,2,3,4]

// 用户环境中修改了 %Array.prototype%.push。
Array.prototype.push = function push(val) {
  return this.unshift(val);
};

array.push(5); // 现在 `push` 指的是被修改后的方法。
console.log(JSON.stringify(array)); // [5,1,2,3,4]
```

Primordials 会用新函数包装原始原型函数，这些新函数将 `this` 值作为第一个参数：

```js
const {
  ArrayPrototypePush,
} = primordials;

const array = [1, 2, 3];
ArrayPrototypePush(array, 4);
console.log(JSON.stringify(array)); // [1,2,3,4]

Array.prototype.push = function push(val) {
  return this.unshift(val);
};

ArrayPrototypePush(array, 5);
console.log(JSON.stringify(array)); // [1,2,3,4,5]
```

### 安全类

安全类是提供与其对应类相同 API 的类，但其实现旨在避免依赖任何可被用户修改的代码。安全类不应暴露给用户层；在处理用户层可访问的对象时，请使用不安全的等价实现。

### 可变参数函数

有些内建函数接受可变数量的参数（例如：`Math.max`、`%Array.prototype.push%`）。有时将参数列表作为数组提供会很有用。你可以使用带有 `Apply` 后缀的 primordials 函数（例如：`MathMaxApply`、`ArrayPrototypePushApply`）来实现这一点。

## 已知存在性能问题的 primordials

当前 Node.js API 之所以并非完全防篡改，其中一个原因是性能：有时使用 primordials 会导致 V8 性能回退，而在热点代码路径中，这可能会显著降低 Node.js 代码的性能。

* 会修改数组内部状态的方法：
  * `ArrayPrototypePush`
  * `ArrayPrototypePop`
  * `ArrayPrototypeShift`
  * `ArrayPrototypeUnshift`
* 函数原型的方法：
  * `FunctionPrototypeBind`
  * `FunctionPrototypeCall`: 在用于调用 super 构造函数时会导致性能问题。
  * `FunctionPrototype`: 在引用空操作函数时请改用 `() => {}`。
* `SafeArrayIterator`
* `SafeStringIterator`
* `SafePromiseAll`
* `SafePromiseAllSettled`
* `SafePromiseAny`
* `SafePromiseRace`
* `SafePromisePrototypeFinally`: 请改用 `try {} finally {}` 块。
* `ReflectConstruct`: 也会影响 `Reflect.construct`。
  `ReflectConstruct` 会在函数内部创建新的类类型。
  更好的替代方案是创建一个共享类。参见 [nodejs/performance#109](https://github.com/nodejs/performance/issues/109)。

一般来说，在发送或审查会修改热点代码路径的 PR 时，请格外谨慎并运行充分的基准测试。

## 用户可修改方法的隐式使用

### 不安全的数组迭代

JavaScript 中有许多常见实践依赖迭代。在处理 core 中的数组（或 `TypedArray`）时，了解这些实践很有用，因为数组迭代通常会调用若干可由用户修改的方法。本节列出了 ECMAScript 代码中非显式依赖数组迭代的最常见模式，以及如何避免它们。

<details>

<summary>避免在数组上使用 for-of 循环</summary>

```js
for (const item of array) {
  console.log(item);
}
```

这段代码在内部会展开成类似如下的内容：

```js
{
  // 1. 查找 `array` 上的 %Symbol.iterator% 属性（如果由用户提供，则可被用户修改）。
  // 2. 查找 %Array.prototype% 上的 %Symbol.iterator% 属性（可被用户修改）。
  // 3. 调用该函数。
  const iterator = array[Symbol.iterator]();
  // 1. 查找 `iterator` 上的 `next` 属性（不存在）。
  // 2. 查找 %ArrayIteratorPrototype% 上的 `next` 属性（可被用户修改）。
  // 3. 调用该函数。
  let { done, value: item } = iterator.next();
  while (!done) {
    console.log(item);
    // 重复。
    ({ done, value: item } = iterator.next());
  }
}
```

与其使用迭代器，不如使用更传统但仍然非常高效的 `for` 循环：

```js
for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}
```

下面的代码片段展示了用户层代码如何影响内部模块的行为：

```js
// 用户层
Array.prototype[Symbol.iterator] = () => ({
  next: () => ({ done: true }),
});

// Core
let forOfLoopBlockExecuted = false;
let forLoopBlockExecuted = false;
const array = [1, 2, 3];
for (const item of array) {
  forOfLoopBlockExecuted = true;
}
for (let i = 0; i < array.length; i++) {
  forLoopBlockExecuted = true;
}
console.log(forOfLoopBlockExecuted); // false
console.log(forLoopBlockExecuted); // true
```

这只适用于你处理的是真正的数组（或类数组对象）。如果你期望的是一个迭代器，那么 for-of 循环可能是更好的选择。

</details>

<details>

<summary>避免在数组上使用数组解构赋值</summary>

```js
const [first, second] = array;
```

这大致等价于：

```js
// 1. 查找 `array` 上的 %Symbol.iterator% 属性（如果由用户提供，则可被用户修改）。
// 2. 查找 %Array.prototype% 上的 %Symbol.iterator% 属性（可被用户修改）。
// 3. 调用该函数。
const iterator = array[Symbol.iterator]();
// 1. 查找 `iterator` 上的 `next` 属性（不存在）。
// 2. 查找 %ArrayIteratorPrototype% 上的 `next` 属性（可被用户修改）。
// 3. 调用该函数。
const first = iterator.next().value;
// 重复。
const second = iterator.next().value;
```

你可以改用对象解构：

```js
const { 0: first, 1: second } = array;
```

或者

```js
const first = array[0];
const second = array[1];
```

这只适用于你处理的是真正的数组（或类数组对象）。如果你期望的是一个迭代器，那么数组解构是最佳选择。

</details>

<details>

<summary>避免在数组上使用展开运算符</summary>

```js
// 1. 查找 `array` 上的 %Symbol.iterator% 属性（如果由用户提供，则可被用户修改）。
// 2. 查找 %Array.prototype% 上的 %Symbol.iterator% 属性（可被用户修改）。
// 3. 查找 %ArrayIteratorPrototype% 上的 `next` 属性（可被用户修改）。
const arrayCopy = [...array];
func(...array);
```

你可以使用其他 ECMAScript 特性来达到相同结果：

```js
const arrayCopy = ArrayPrototypeSlice(array);
ReflectApply(func, null, array);
```

</details>

<details>

<summary><code>%Array.prototype.concat%</code> 会查找传入参数以及 <code>this</code> 值的
         <code>%Symbol.isConcatSpreadable%</code> 属性</summary>

```js
{
  // 不安全代码示例：
  // 1. 查找 `array` 上的 %Symbol.isConcatSpreadable% 属性
  //    （如果由用户提供，则可被用户修改）。
  // 2. 查找 `%Array.prototype%` 上的 %Symbol.isConcatSpreadable% 属性
  //    （可被用户修改）。
  // 2. 查找 `%Object.prototype%` 上的 %Symbol.isConcatSpreadable% 属性
  //    （可被用户修改）。
  const array = [];
  ArrayPrototypeConcat(array);
}
```

```js
// 用户层
Object.defineProperty(Object.prototype, Symbol.isConcatSpreadable, {
  get() {
    this.push(5);
    return true;
  },
});

// Core
{
  // 使用 ArrayPrototypeConcat 无法得到预期结果：
  const a = [1, 2];
  const b = [3, 4];
  console.log(ArrayPrototypeConcat(a, b)); // [1, 2, 5, 3, 4, 5]
}
{
  // 例如，可以安全地拼接两个数组：
  const a = [1, 2];
  const b = [3, 4];
  // 使用 %Array.prototype.push% 和 `SafeArrayIterator` 以获得预期
  // 结果：
  const concatArray = [];
  ArrayPrototypePush(concatArray, ...new SafeArrayIterator(a),
                     ...new SafeArrayIterator(b));
  console.log(concatArray); // [1, 2, 3, 4]

  // 或者，如果可以修改第一个数组，也可以使用 `ArrayPrototypePushApply`：
  ArrayPrototypePushApply(a, b);
  console.log(a); // [1, 2, 3, 4]
}
```

</details>

<details>

<summary><code>%Object.fromEntries%</code> 会遍历数组</summary>

```js
{
  // 不安全代码示例：
  // 1. 查找 `array` 上的 %Symbol.iterator% 属性（如果由用户提供，则可被用户修改）。
  // 2. 查找 %Array.prototype% 上的 %Symbol.iterator% 属性（可被用户修改）。
  // 3. 查找 %ArrayIteratorPrototype% 上的 `next` 属性（可被用户修改）。
  const obj = ObjectFromEntries(array);
}

{
  // 使用 `SafeArrayIterator` 的安全示例：
  const obj = ObjectFromEntries(new SafeArrayIterator(array));
}

{
  // 不使用 `SafeArrayIterator` 的安全示例：
  const obj = {};
  for (let i = 0; i < array.length; i++) {
    obj[array[i][0]] = array[i][1];
  }
  // 在热点代码路径中，这将是首选方法。
}
```

</details>

<details>

<summary><code>%Promise.all%</code>、
         <code>%Promise.allSettled%</code>、
         <code>%Promise.any%</code> 和
         <code>%Promise.race%</code> 会遍历数组</summary>

```js
// 1. 查找 `array` 上的 %Symbol.iterator% 属性（如果由用户提供，则可被用户修改）。
// 2. 查找 %Array.prototype% 上的 %Symbol.iterator% 属性（可被用户修改）。
// 3. 查找 %ArrayIteratorPrototype% 上的 `next` 属性（可被用户修改）。
// 4. 查找 %Array.Prototype% 上的 `then` 属性（可被用户修改）。
// 5. 查找 %Object.Prototype% 上的 `then` 属性（可被用户修改）。
PromiseAll([]); // 不安全

// 1. 查找 %Array.Prototype% 上的 `then` 属性（可被用户修改）。
// 2. 查找 %Object.Prototype% 上的 `then` 属性（可被用户修改）。
PromiseAll(new SafeArrayIterator([])); // 仍然不安全
SafePromiseAll([]); // 仍然不安全

SafePromiseAllReturnVoid([]); // 安全
SafePromiseAllReturnArrayLike([]); // 安全

const array = [promise];
const set = new SafeSet().add(promise);
// 当在非空可迭代对象上运行这些函数之一时，它还会：
// 1. 查找 `promise` 上的 `then` 属性（如果由用户提供，则可被用户修改）。
// 2. 查找 `%Promise.prototype%` 上的 `then` 属性（可被用户修改）。
// 3. 查找 %Array.Prototype% 上的 `then` 属性（可被用户修改）。
// 4. 查找 %Object.Prototype% 上的 `then` 属性（可被用户修改）。
PromiseAll(new SafeArrayIterator(array)); // 不安全
PromiseAll(set); // 不安全

SafePromiseAllReturnVoid(array); // 安全
SafePromiseAllReturnArrayLike(array); // 安全

// `SafePromise[...]` 和 `Promise[...]` 方法有一些关键区别：

// 1. SafePromiseAll、SafePromiseAllSettled、SafePromiseAny、SafePromiseRace、
//    SafePromiseAllReturnArrayLike、SafePromiseAllReturnVoid 以及
//    SafePromiseAllSettledReturnVoid 支持将 mapperFunction 作为第二个参数。
// SafePromiseAll(ArrayPrototypeMap(array, someFunction));
SafePromiseAll(array, someFunction); // 与上面相同，但更高效。

// 2. SafePromiseAll、SafePromiseAllSettled、SafePromiseAny、SafePromiseRace、
//    SafePromiseAllReturnArrayLike、SafePromiseAllReturnVoid 以及
//    SafePromiseAllSettledReturnVoid 只支持数组和类数组
//    对象，不支持可迭代对象。使用 ArrayFrom 将可迭代对象转换为数组。
// SafePromiseAllReturnVoid(set); // 忽略 set 内容。
SafePromiseAllReturnVoid(ArrayFrom(set)); // 可用

// 3. SafePromiseAllReturnArrayLike 比 SafePromiseAll 更安全，不过如果其返回值被传递给用户，就不应使用它，因为用户可能会因为没有收到真正的数组而感到意外。
// SafePromiseAllReturnArrayLike(array).then((val) => val instanceof Array); // false
SafePromiseAll(array).then((val) => val instanceof Array); // true
```

</details>

<details>

<summary><code>%Map%</code>、<code>%Set%</code>、<code>%WeakMap%</code> 和
         <code>%WeakSet%</code> 构造函数会遍历数组</summary>

```js
// 用户层
Array.prototype[Symbol.iterator] = () => ({
  next: () => ({ done: true }),
});

// Core

// 1. 查找 %Array.prototype% 上的 %Symbol.iterator% 属性（可被用户修改）。
// 2. 查找 %ArrayIteratorPrototype% 上的 `next` 属性（可被用户修改）。
const set = new SafeSet([1, 2, 3]);

console.log(set.size); // 0
```

```js
// 用户层
Array.prototype[Symbol.iterator] = () => ({
  next: () => ({ done: true }),
});

// Core
const set = new SafeSet();
set.add(1).add(2).add(3);
console.log(set.size); // 3
```

</details>

### Promise 对象

<details>

<summary><code>%Promise.prototype.finally%</code> 会查找 Promise 实例的 <code>then</code>
         属性</summary>

```js
// 用户层
Promise.prototype.then = function then(a, b) {
  return Promise.resolve();
};

// Core
let finallyBlockExecuted = false;
PromisePrototypeFinally(somePromiseThatEventuallySettles,
                        () => { finallyBlockExecuted = true; });
process.on('exit', () => console.log(finallyBlockExecuted)); // false
```

```js
// 用户层
Promise.prototype.then = function then(a, b) {
  return Promise.resolve();
};

// Core
let finallyBlockExecuted = false;
(async () => {
  try {
    return await somePromiseThatEventuallySettles;
  } finally {
    finallyBlockExecuted = true;
  }
})();
process.on('exit', () => console.log(finallyBlockExecuted)); // true
```

</details>

<details>

<summary><code>%Promise.all%</code>、
         <code>%Promise.allSettled%</code>、
         <code>%Promise.any%</code> 和
         <code>%Promise.race%</code> 会查找 Promise 实例的 <code>then</code>
         属性</summary>

你可以使用 primordials 中更安全的替代方案，它们与原始方法略有不同：

* 它期望的是数组（或类数组对象），而不是可迭代对象。
* 它会将每个 promise 包装在 `SafePromise` 对象中，并将结果包装在新的
  `Promise` 实例中——这可能带来性能损失。
* 它接受一个 `mapperFunction` 作为第二个参数。
* 因为它不会查找 `then` 属性，所以它可能不是处理用户提供的 promise 的正确工具（这些 promise 可能是 `Promise` 子类的实例）。

```js
// 用户层
Promise.prototype.then = function then(a, b) {
  return Promise.resolve();
};

// Core
let thenBlockExecuted = false;
PromisePrototypeThen(
  PromiseAll(new SafeArrayIterator([PromiseResolve()])),
  () => { thenBlockExecuted = true; },
);
process.on('exit', () => console.log(thenBlockExecuted)); // false
```

```js
// 用户层
Promise.prototype.then = function then(a, b) {
  return Promise.resolve();
};

// Core
let thenBlockExecuted = false;
PromisePrototypeThen(
  SafePromiseAll([PromiseResolve()]),
  () => { thenBlockExecuted = true; },
);
process.on('exit', () => console.log(thenBlockExecuted)); // true
```

一个常见模式是在 Promise 数组上进行 map 以应用一些转换，在这种情况下，传递第二个参数可能比调用 `%Array.prototype.map%` 更高效。

```js
SafePromiseAll(ArrayPrototypeMap(array, someFunction));
SafePromiseAll(array, someFunction); // 与上面相同，但更高效。
```

</details>

### （异步）生成器函数

生成器函数和异步生成器函数返回的生成器与异步生成器依赖于用户可修改的方法；在 core 中应避免使用它们。

<details>

<summary><code>%GeneratorFunction.prototype.prototype%.next</code> 是
         用户可修改的</summary>

```js
// 用户层
Object.getPrototypeOf(function* () {}).prototype.next = function next() {
  return { done: true };
};

// Core
function* someGenerator() {
  yield 1;
  yield 2;
  yield 3;
}
let loopCodeExecuted = false;
for (const nb of someGenerator()) {
  loopCodeExecuted = true;
}
console.log(loopCodeExecuted); // false
```

</details>

<details>

<summary><code>%AsyncGeneratorFunction.prototype.prototype%.next</code> 是
         用户可修改的</summary>

```js
// 用户层
Object.getPrototypeOf(async function* () {}).prototype.next = function next() {
  return new Promise(() => {});
};

// Core
async function* someGenerator() {
  yield 1;
  yield 2;
  yield 3;
}
let finallyBlockExecuted = false;
async () => {
  try {
    for await (const nb of someGenerator()) {
      // 某些代码；
    }
  } finally {
    finallyBlockExecuted = true;
  }
};
process.on('exit', () => console.log(finallyBlockExecuted)); // false
```

</details>

### 文本处理

#### 不安全的字符串方法

| 字符串方法                     | 查找的属性            |
| ----------------------------- | --------------------- |
| `String.prototype.match`      | `Symbol.match`        |
| `String.prototype.matchAll`   | `Symbol.matchAll`     |
| `String.prototype.replace`    | `Symbol.replace`      |
| `String.prototype.replaceAll` | `Symbol.replace`      |
| `String.prototype.search`     | `Symbol.search`       |
| `String.prototype.split`      | `Symbol.split`        |

```js
// 用户层
RegExp.prototype[Symbol.replace] = () => 'foo';
String.prototype[Symbol.replace] = () => 'baz';

// Core
console.log(StringPrototypeReplace('ber', /e/, 'a')); // 'foo'
console.log(StringPrototypeReplace('ber', 'e', 'a')); // 'baz'
console.log(RegExpPrototypeSymbolReplace(/e/, 'ber', 'a')); // 'bar'
```

#### 不安全的字符串迭代

与数组一样，遍历字符串会调用若干可由用户修改的方法。尽可能避免遍历字符串，或者使用 `SafeStringIterator`。

#### 不安全的 `RegExp` 方法

会在原型链上查找 `exec` 属性的函数：

* `RegExp.prototype[Symbol.match]`
* `RegExp.prototype[Symbol.matchAll]`
* `RegExp.prototype[Symbol.replace]`
* `RegExp.prototype[Symbol.search]`
* `RegExp.prototype[Symbol.split]`
* `RegExp.prototype.test`

```js
// 用户层
RegExp.prototype.exec = () => null;

// Core
console.log(RegExpPrototypeTest(/o/, 'foo')); // false
console.log(RegExpPrototypeExec(/o/, 'foo') !== null); // true

console.log(RegExpPrototypeSymbolSearch(/o/, 'foo')); // -1
console.log(SafeStringPrototypeSearch('foo', /o/)); // 1
```

#### 不要信任 `RegExp` 标志

RegExp 标志不是正则实例自身的属性，这意味着标志可以从用户层被重置。

<details>

<summary>会从可变 getter 中查找属性的 <code>RegExp</code> 方法列表</summary>

| `RegExp` 方法                     | 会查找以下与标志相关的属性                                         |
| ----------------------------------- | ------------------------------------------------------------------ |
| `get RegExp.prototype.flags`        | `global`, `ignoreCase`, `multiline`, `dotAll`, `unicode`, `sticky` |
| `RegExp.prototype[Symbol.match]`    | `global`, `unicode`                                                |
| `RegExp.prototype[Symbol.matchAll]` | `flags`                                                            |
| `RegExp.prototype[Symbol.replace]`  | `global`, `unicode`                                                |
| `RegExp.prototype[Symbol.split]`    | `flags`                                                            |
| `RegExp.prototype.toString`         | `flags`                                                            |

</details>

```js
// 用户层
Object.defineProperty(RegExp.prototype, 'global', { value: false });

// Core
console.log(RegExpPrototypeSymbolReplace(/o/g, 'foo', 'a')); // 'fao'
console.log(RegExpPrototypeSymbolReplace(hardenRegExp(/o/g), 'foo', 'a')); // 'faa'
```

### 定义对象自身属性

在定义属性描述符时（为 JavaScript 对象添加或更新自身属性），务必始终使用无原型对象，以避免原型污染。

```js
// 用户层
Object.prototype.get = function get() {};

// Core
try {
  ObjectDefineProperty({}, 'someProperty', { value: 0 });
} catch (err) {
  console.log(err); // TypeError: Invalid property descriptor.
}
```

```js
// 用户层
Object.prototype.get = function get() {};

// Core
ObjectDefineProperty({}, 'someProperty', { __proto__: null, value: 0 });
console.log('no errors'); // no errors.
```

在尝试修改已有属性时也同样适用，例如尝试让只读属性可枚举：

```js
// 用户层
Object.prototype.value = 'Unrelated user-provided data';

// Core
class SomeClass {
  get readOnlyProperty() { return 'genuine data'; }
}
ObjectDefineProperty(SomeClass.prototype, 'readOnlyProperty', { enumerable: true });
console.log(new SomeClass().readOnlyProperty); // Unrelated user-provided data
```

```js
// 用户层
Object.prototype.value = 'Unrelated user-provided data';

// Core
const kEnumerableProperty = { __proto__: null, enumerable: true };
// 在 core 中，使用 const {kEnumerableProperty} = require('internal/util');
class SomeClass {
  get readOnlyProperty() { return 'genuine data'; }
}
ObjectDefineProperty(SomeClass.prototype, 'readOnlyProperty', kEnumerableProperty);
console.log(new SomeClass().readOnlyProperty); // genuine data
```

### 定义 `Proxy` 处理器

在定义 `Proxy` 时，处理器对象如果使用普通对象字面量，可能会面临原型污染风险：

```js
// 用户层
Object.prototype.get = () => 'Unrelated user-provided data';

// Core
const objectToProxy = { someProperty: 'genuine value' };

const proxyWithPlainObjectLiteral = new Proxy(objectToProxy, {
  has() { return false; },
});
console.log(proxyWithPlainObjectLiteral.someProperty); // Unrelated user-provided data

const proxyWithNullPrototypeObject = new Proxy(objectToProxy, {
  __proto__: null,
  has() { return false; },
});
console.log(proxyWithNullPrototypeObject.someProperty); // genuine value
```

### 检查对象是否为某个类的实例

#### 使用 `instanceof` 会查找类的 `%Symbol.hasInstance%` 属性

```js
// 用户层
Object.defineProperty(Array, Symbol.hasInstance, {
  __proto__: null,
  value: () => true,
});
Object.defineProperty(Date, Symbol.hasInstance, {
  __proto__: null,
  value: () => false,
});

// Core
const {
  FunctionPrototypeSymbolHasInstance,
} = primordials;

console.log(new Date() instanceof Array); // true
console.log(new Date() instanceof Date); // false

console.log(FunctionPrototypeSymbolHasInstance(Array, new Date())); // false
console.log(FunctionPrototypeSymbolHasInstance(Date, new Date())); // true
```

即使没有用户修改，在处理来自不同 realm 的值时，`instanceof` 的结果也可能具有误导性：

```js
const vm = require('node:vm');

console.log(vm.runInNewContext('[]') instanceof Array); // false
console.log(vm.runInNewContext('[]') instanceof vm.runInNewContext('Array')); // false
console.log([] instanceof vm.runInNewContext('Array')); // false

console.log(Array.isArray(vm.runInNewContext('[]'))); // true
console.log(vm.runInNewContext('Array').isArray(vm.runInNewContext('[]'))); // true
console.log(vm.runInNewContext('Array').isArray([])); // true
```

一般来说，不推荐使用 `instanceof`（或 `FunctionPrototypeSymbolHasInstance`）进行检查，考虑检查属性或方法是否存在，以获得更可靠的结果。
