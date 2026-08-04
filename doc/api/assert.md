# 断言

<!--introduced_in=v0.1.21-->

> 稳定性：2 - 稳定

<!-- source_link=lib/assert.js -->

`node:assert` 模块提供了一组用于验证不变量的断言函数。

## 严格断言模式

<!-- YAML
added: v9.9.0
changes:
  - version: v15.0.0
    pr-url: https://github.com/nodejs/node/pull/34001
    description: "作为 `require('node:assert/strict')` 暴露。"
  - version:
      - v13.9.0
      - v12.16.2
    pr-url: https://github.com/nodejs/node/pull/31635
    description: 将“严格模式”改为“严格断言模式”，将“遗留模式”改为“遗留断言模式”，以避免与更常见的“严格模式”含义混淆。
  - version: v9.9.0
    pr-url: https://github.com/nodejs/node/pull/17615
    description: 向严格断言模式添加了错误差异。
  - version: v9.9.0
    pr-url: https://github.com/nodejs/node/pull/17002
    description: 向 assert 模块添加了严格断言模式。
-->

在严格断言模式下，非严格方法的行为类似于它们对应的严格方法。例如，[`assert.deepEqual()`][] 的行为将类似于 [`assert.deepStrictEqual()`][]。

在严格断言模式下，对象的错误消息会显示差异。在遗留断言模式下，对象的错误消息会显示对象，通常会被截断。

### message 参数语义

对于接受可选 `message` 参数的断言方法，消息可以通过以下形式之一提供：

* **string**：原样使用。如果 `message` 字符串后提供了额外的参数，它们将被视为 printf 风格的替换（参见 [`util.format()`][]）。
* **Error**：如果 `Error` 实例作为 `message` 提供，则该错误将直接抛出，而不是 `AssertionError`。
* **function**：形式为 `(actual, expected) => string` 的函数。仅在断言失败时调用，应返回用作错误消息的字符串。非字符串返回值将被忽略，并使用默认消息代替。

如果随着 `Error` 或函数作为 `message` 一起传递了额外的参数，调用将被拒绝并抛出 `ERR_AMBIGUOUS_ARGUMENT`。

如果第一项既不是字符串、`Error` 也不是函数，则抛出 `ERR_INVALID_ARG_TYPE`。

要使用严格断言模式：

```mjs
import { strict as assert } from 'node:assert';
```

```cjs
const assert = require('node:assert').strict;
```

```mjs
import assert from 'node:assert/strict';
```

```cjs
const assert = require('node:assert/strict');
```

示例错误差异：

```mjs
import { strict as assert } from 'node:assert';

assert.deepEqual([[[1, 2, 3]], 4, 5], [[[1, 2, '3']], 4, 5]);
// AssertionError: 期望输入严格深度相等：
// + 实际 - 期望 ... 行已跳过
//
//   [
//     [
// ...
//       2,
// +     3
// -     '3'
//     ],
// ...
//     5
//   ]
```

```cjs
const assert = require('node:assert/strict');

assert.deepEqual([[[1, 2, 3]], 4, 5], [[[1, 2, '3']], 4, 5]);
// AssertionError: 期望输入严格深度相等：
// + 实际 - 期望 ... 行已跳过
//
//   [
//     [
// ...
//       2,
// +     3
// -     '3'
//     ],
// ...
//     5
//   ]
```

要停用颜色，请使用 `NO_COLOR` 或 `NODE_DISABLE_COLORS` 环境变量。这也将停用 REPL 中的颜色。有关终端环境中颜色支持的更多信息，请阅读 tty [`getColorDepth()`][] 文档。

## 遗留断言模式

遗留断言模式在以下位置使用 [`==` 运算符][]：

* [`assert.deepEqual()`][]
* [`assert.equal()`][]
* [`assert.notDeepEqual()`][]
* [`assert.notEqual()`][]

要使用遗留断言模式：

```mjs
import assert from 'node:assert';
```

```cjs
const assert = require('node:assert');
```

遗留断言模式可能会有意想不到的结果，尤其是使用 [`assert.deepEqual()`][] 时：

```cjs
// 警告：这在遗留断言模式下不会抛出 AssertionError！
assert.deepEqual(/a/gi, new Date());
```

## 类：`assert.AssertionError`

* 继承：{errors.Error}

表示断言失败。`node:assert` 模块抛出的所有错误都将是 `AssertionError` 类的实例。

### `new assert.AssertionError(options)`

<!-- YAML
added: v0.1.21
-->

* `options` {Object}
  * `message` {string} 如果提供，则错误消息设置为此值。
  * `actual` {any} 错误实例上的 `actual` 属性。
  * `expected` {any} 错误实例上的 `expected` 属性。
  * `operator` {string} 错误实例上的 `operator` 属性。
  * `stackStartFn` {Function} 如果提供，生成的堆栈跟踪将省略此函数之前的帧。
  * `diff` {string} 如果设置为 `'full'`，则在断言错误中显示完整差异。默认为 `'simple'`。
    接受的值：`'simple'`、`'full'`。

{Error} 的子类，表示断言失败。

所有实例都包含内置的 `Error` 属性（`message` 和 `name`）以及：

* `actual` {any} 设置为方法的 `actual` 参数，例如 [`assert.strictEqual()`][]。
* `expected` {any} 设置为方法的 `expected` 值，例如 [`assert.strictEqual()`][]。
* `generatedMessage` {boolean} 指示消息是自动生成 (`true`) 还是不是。
* `code` {string} 值始终为 `ERR_ASSERTION`，以表明错误是断言错误。
* `operator` {string} 设置为传入的运算符值。

```mjs
import assert from 'node:assert';

// 生成一个 AssertionError 以便稍后比较错误消息：
const { message } = new assert.AssertionError({
  actual: 1,
  expected: 2,
  operator: 'strictEqual',
});

// 验证错误输出：
try {
  assert.strictEqual(1, 2);
} catch (err) {
  assert(err instanceof assert.AssertionError);
  assert.strictEqual(err.message, message);
  assert.strictEqual(err.name, 'AssertionError');
  assert.strictEqual(err.actual, 1);
  assert.strictEqual(err.expected, 2);
  assert.strictEqual(err.code, 'ERR_ASSERTION');
  assert.strictEqual(err.operator, 'strictEqual');
  assert.strictEqual(err.generatedMessage, true);
}
```

```cjs
const assert = require('node:assert');

// 生成一个 AssertionError 以便稍后比较错误消息：
const { message } = new assert.AssertionError({
  actual: 1,
  expected: 2,
  operator: 'strictEqual',
});

// 验证错误输出：
try {
  assert.strictEqual(1, 2);
} catch (err) {
  assert(err instanceof assert.AssertionError);
  assert.strictEqual(err.message, message);
  assert.strictEqual(err.name, 'AssertionError');
  assert.strictEqual(err.actual, 1);
  assert.strictEqual(err.expected, 2);
  assert.strictEqual(err.code, 'ERR_ASSERTION');
  assert.strictEqual(err.operator, 'strictEqual');
  assert.strictEqual(err.generatedMessage, true);
}
```

## 类：`assert.Assert`

<!-- YAML
added:
 - v24.6.0
 - v22.19.0
-->

`Assert` 类允许创建具有自定义选项的独立断言实例。

### `new assert.Assert([options])`

<!-- YAML
changes:
  - version: v24.9.0
    pr-url: https://github.com/nodejs/node/pull/59762
    description: "添加了 `skipPrototype` 选项。"
-->

* `options` {Object}
  * `diff` {string} 如果设置为 `'full'`，则在断言错误中显示完整差异。默认为 `'simple'`。
    接受的值：`'simple'`、`'full'`。
  * `strict` {boolean} 如果设置为 `true`，非严格方法的行为类似于它们对应的严格方法。默认为 `true`。
  * `skipPrototype` {boolean} 如果设置为 `true`，则在深度相等检查中跳过原型和构造函数比较。默认为 `false`。

创建一个新的断言实例。`diff` 选项控制断言错误消息中差异的详细程度。

```js
const { Assert } = require('node:assert');
const assertInstance = new Assert({ diff: 'full' });
assertInstance.deepStrictEqual({ a: 1 }, { a: 2 });
// 在错误消息中显示完整差异。
```

**重要**：从 `Assert` 实例解构断言方法时，方法会失去与实例配置选项（如 `diff`、`strict` 和 `skipPrototype` 设置）的连接。解构后的方法将回退到默认行为。

```js
const myAssert = new Assert({ diff: 'full' });

// 这按预期工作 - 使用 'full' 差异
myAssert.strictEqual({ a: 1 }, { b: { c: 1 } });

// 这失去了 'full' 差异设置 - 回退到默认 'simple' 差异
const { strictEqual } = myAssert;
strictEqual({ a: 1 }, { b: { c: 1 } });
```

`skipPrototype` 选项影响所有深度相等方法：

```js
class Foo {
  constructor(a) {
    this.a = a;
  }
}

class Bar {
  constructor(a) {
    this.a = a;
  }
}

const foo = new Foo(1);
const bar = new Bar(1);

// 默认行为 - 由于构造函数不同而失败
const assert1 = new Assert();
assert1.deepStrictEqual(foo, bar); // AssertionError

// 跳过原型比较 - 如果属性相等则通过
const assert2 = new Assert({ skipPrototype: true });
assert2.deepStrictEqual(foo, bar); // 通过
```

解构后，方法会失去对实例 `this` 上下文的访问权限，并恢复为默认断言行为（diff: 'simple'，非严格模式）。要在解构方法时保持自定义选项，请避免解构并直接在实例上调用方法。

## `assert(value[, message])`

<!-- YAML
added: v0.5.9
changes:
  - version: v26.0.0
    pr-url: https://github.com/nodejs/node/pull/58849
    description: "消息现在可以是 `printf` 风格的格式字符串或函数。"
-->

* `value` {any} 检查是否为真值的输入。
* `message` {string|Error|Function}

[`assert.ok()`][] 的别名。

## `assert.deepEqual(actual, expected[, message])`

<!-- YAML
added: v0.1.21
changes:
  - version: v26.0.0
    pr-url: https://github.com/nodejs/node/pull/58849
    description: "消息现在可以是 `printf` 风格的格式字符串或函数。"
  - version: v25.0.0
    pr-url: https://github.com/nodejs/node/pull/59448
    description: 如果 Promise 不是同一实例，则不再视为相等。
  - version: v25.0.0
    pr-url: https://github.com/nodejs/node/pull/57627
    description: 无效日期现在被视为相等。
  - version: v24.0.0
    pr-url: https://github.com/nodejs/node/pull/57622
    description: 当任一方遇到循环引用时，递归现在停止。
  - version:
      - v22.2.0
      - v20.15.0
    pr-url: https://github.com/nodejs/node/pull/51805
    description: 现在也比较 Error cause 和 errors 属性。
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41020
    description: 现在也比较正则表达式的 lastIndex 属性。
  - version:
      - v16.0.0
      - v14.18.0
    pr-url: https://github.com/nodejs/node/pull/38113
    description: 在遗留断言模式下，状态已从弃用改为遗留。
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/30766
    description: 如果两边都是 NaN，则现在将 NaN 视为相同。
  - version: v12.0.0
    pr-url: https://github.com/nodejs/node/pull/25008
    description: 现在正确比较类型标签，并进行了一些次要的比较调整以使检查不那么令人惊讶。
  - version: v9.0.0
    pr-url: https://github.com/nodejs/node/pull/15001
    description: "现在正确比较 `Error` 名称和消息。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12142
    description: "现在也比较 `Set` 和 `Map` 内容。"
  - version:
      - v6.4.0
      - v4.7.1
    pr-url: https://github.com/nodejs/node/pull/8002
    description: 现在正确处理类型化数组切片。
  - version:
      - v6.1.0
      - v4.5.0
    pr-url: https://github.com/nodejs/node/pull/6432
    description: 现在可以将具有循环引用的对象用作输入。
  - version:
      - v5.10.1
      - v4.4.3
    pr-url: https://github.com/nodejs/node/pull/5910
    description: "正确处理非 `Uint8Array` 类型化数组。"
-->

* `actual` {any}
* `expected` {any}
* `message` {string|Error|Function}

**严格断言模式**

[`assert.deepStrictEqual()`][] 的别名。

**遗留断言模式**

> 稳定性：3 - 遗留：请改用 [`assert.deepStrictEqual()`][]。

测试 `actual` 和 `expected` 参数之间的深度相等性。考虑改用 [`assert.deepStrictEqual()`][]。[`assert.deepEqual()`][] 可能会有意想不到的结果。

_深度相等_ 意味着子对象的可枚举“自有”属性也根据以下规则进行递归评估。

### 比较详情

* 原始值使用 [`==` 运算符][] 进行比较，{NaN} 除外。如果两边都是 {NaN}，则视为相同。
* 对象的 [类型标签][Object.prototype.toString()] 应相同。
* 仅考虑 [可枚举的“自有”属性][]。
* 对象构造函数在可用时进行比较。
* {Error} 名称、消息、原因和错误始终进行比较，即使这些不是可枚举属性。
* [对象包装器][] 既作为对象也比较未包装的值。
* `Object` 属性无序比较。
* {Map} 键和 {Set} 项无序比较。
* 当两边不同或任一边遇到循环引用时，递归停止。
* 实现不测试对象的 [`[[Prototype]]`][prototype-spec]。
* {Symbol} 属性不进行比较。
* {WeakMap}、{WeakSet} 和 {Promise} 实例**不**进行结构比较。仅当它们引用同一对象时才相等。任何不同 `WeakMap`、`WeakSet` 或 `Promise` 实例之间的比较都将导致不相等，即使它们包含相同的内容。
* {RegExp} lastIndex、flags 和 source 始终进行比较，即使这些不是可枚举属性。

以下示例不会抛出 [`AssertionError`][]，因为原始值是使用 [`==` 运算符][] 进行比较的。

```mjs
import assert from 'node:assert';
// 警告：这不会抛出 AssertionError！

assert.deepEqual('+00000000', false);
```

```cjs
const assert = require('node:assert');
// 警告：这不会抛出 AssertionError！

assert.deepEqual('+00000000', false);
```

"深度" 相等意味着子对象的可枚举“自有”属性也会被评估：

```mjs
import assert from 'node:assert';

const obj1 = {
  a: {
    b: 1,
  },
};
const obj2 = {
  a: {
    b: 2,
  },
};
const obj3 = {
  a: {
    b: 1,
  },
};
const obj4 = { __proto__: obj1 };

assert.deepEqual(obj1, obj1);
// 通过

// b 的值不同：
assert.deepEqual(obj1, obj2);
// AssertionError: { a: { b: 1 } } 深度相等 { a: { b: 2 } }

assert.deepEqual(obj1, obj3);
// 通过

// 原型被忽略：
assert.deepEqual(obj1, obj4);
// AssertionError: { a: { b: 1 } } 深度相等 {}
```

```cjs
const assert = require('node:assert');

const obj1 = {
  a: {
    b: 1,
  },
};
const obj2 = {
  a: {
    b: 2,
  },
};
const obj3 = {
  a: {
    b: 1,
  },
};
const obj4 = { __proto__: obj1 };

assert.deepEqual(obj1, obj1);
// 通过

// b 的值不同：
assert.deepEqual(obj1, obj2);
// AssertionError: { a: { b: 1 } } 深度相等 { a: { b: 2 } }

assert.deepEqual(obj1, obj3);
// 通过

// 原型被忽略：
assert.deepEqual(obj1, obj4);
// AssertionError: { a: { b: 1 } } 深度相等 {}
```

如果值不相等，则抛出 [`AssertionError`][]，`message` 属性设置为等于 `message` 参数的值。如果 `message` 参数未定义，则分配默认错误消息。如果 `message` 参数是 {Error} 的实例，则将抛出它而不是 [`AssertionError`][]。

## `assert.deepStrictEqual(actual, expected[, message])`

<!-- YAML
added: v1.2.0
changes:
  - version: v25.1.0
    pr-url: https://github.com/nodejs/node/pull/58849
    description: "message 现在可以是 `printf` 风格的格式字符串或函数。"
  - version: v25.0.0
    pr-url: https://github.com/nodejs/node/pull/59448
    description: 如果 Promise 不是同一个实例，则不再视为相等。
  - version: v25.0.0
    pr-url: https://github.com/nodejs/node/pull/57627
    description: 无效日期现在被视为相等。
  - version: v24.0.0
    pr-url: https://github.com/nodejs/node/pull/57622
    description: 当任一侧遇到循环引用时，递归现在会停止。
  - version:
    - v22.2.0
    - v20.15.0
    pr-url: https://github.com/nodejs/node/pull/51805
    description: Error 的 cause 和 errors 属性现在也会被比较。
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41020
    description: 正则表达式的 lastIndex 属性现在也会被比较。
  - version: v9.0.0
    pr-url: https://github.com/nodejs/node/pull/15169
    description: 可枚举的 symbol 属性现在也会被比较。
  - version: v9.0.0
    pr-url: https://github.com/nodejs/node/pull/15036
    description: "`NaN` 现在使用[SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero)进行比较。"
  - version: v8.5.0
    pr-url: https://github.com/nodejs/node/pull/15001
    description: "`Error` 的名称和消息现在会被正确比较。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12142
    description: "`Set` 和 `Map` 的内容也会被比较。"
  - version:
    - v6.4.0
    - v4.7.1
    pr-url: https://github.com/nodejs/node/pull/8002
    description: 类型化数组切片现在会被正确处理。
  - version: v6.1.0
    pr-url: https://github.com/nodejs/node/pull/6432
    description: 带有循环引用的对象现在可以用作输入。
  - version:
    - v5.10.1
    - v4.4.3
    pr-url: https://github.com/nodejs/node/pull/5910
    description: "正确处理非 `Uint8Array` 类型化数组。"
-->

* `actual` {任何}
* `expected` {任何}
* `message` {字符串|Error|Function}

测试 `actual` 和 `expected` 参数之间的深相等性。
“深”相等意味着子对象的可枚举“自有”属性也会通过以下规则递归评估。

### 比较详情

* 基本值使用 [`Object.is()`][] 进行比较。
* 对象的[类型标签][Object.prototype.toString()]应当相同。
* 对象的 [`[[Prototype]]`][prototype-spec] 使用 [`=== 运算符`][] 进行比较。
* 仅考虑[可枚举的“自有”属性][]。
* 如果对象构造函数可用，也会进行比较。
* {Error} 的名称、消息、原因和错误始终会进行比较，即使这些不是可枚举属性。
  `errors` 也会进行比较。
* 可枚举的自有 {Symbol} 属性也会进行比较。
* [对象包装器][]既会作为对象进行比较，也会比较解包后的值。
* `Object` 属性的比较不考虑顺序。
* {Map} 的键和 {Set} 的项目的比较不考虑顺序。
* 当两侧不同时，或任一侧遇到循环引用时，递归会停止。
* {WeakMap}、{WeakSet} 和 {Promise} 实例不会进行结构化比较。只有当它们引用同一个对象时才相等。不同的 {WeakMap}、{WeakSet} 或 {Promise} 实例之间的任何比较都会导致不相等，即使它们包含相同的内容。
* {RegExp} 的 lastIndex、flags 和 source 始终会进行比较，即使这些不是可枚举属性。

```mjs
import assert from 'node:assert/strict';

// 这会失败，因为 1 !== '1'。
assert.deepStrictEqual({ a: 1 }, { a: '1' });
// AssertionError: 期望输入严格深相等：
// + 实际 - 期望
//
//   {
// +   a: 1
// -   a: '1'
//   }

// 以下对象没有自有属性
const date = new Date();
const object = {};
const fakeDate = {};
Object.setPrototypeOf(fakeDate, Date.prototype);

// 不同的 [[Prototype]]：
assert.deepStrictEqual(object, fakeDate);
// AssertionError: 期望输入严格深相等：
// + 实际 - 期望
//
// + {}
// - Date {}

// 不同的类型标签：
assert.deepStrictEqual(date, fakeDate);
// AssertionError: 期望输入严格深相等：
// + 实际 - 期望
//
// + 2018-04-26T00:49:08.604Z
// - Date {}

assert.deepStrictEqual(NaN, NaN);
// 没问题，因为 Object.is(NaN, NaN) 为 true。

// 不同的解包数字：
assert.deepStrictEqual(new Number(1), new Number(2));
// AssertionError: 期望输入严格深相等：
// + 实际 - 期望
//
// + [Number: 1]
// - [Number: 2]

assert.deepStrictEqual(new String('foo'), Object('foo'));
// 没问题，因为对象和字符串解包后是相同的。

assert.deepStrictEqual(-0, -0);
// 没问题

// 不同的零：
assert.deepStrictEqual(0, -0);
// AssertionError: 期望输入严格深相等：
// + 实际 - 期望
//
// + 0
// - -0

const symbol1 = Symbol();
const symbol2 = Symbol();
assert.deepStrictEqual({ [symbol1]: 1 }, { [symbol1]: 1 });
// 没问题，因为两个对象上是同一个 symbol。

assert.deepStrictEqual({ [symbol1]: 1 }, { [symbol2]: 1 });
// AssertionError [ERR_ASSERTION]: 输入相同但引用不相等：
//
// {
//   Symbol(): 1
// }

const weakMap1 = new WeakMap();
const weakMap2 = new WeakMap();
const obj = {};

weakMap1.set(obj, 'value');
weakMap2.set(obj, 'value');

// 比较不同实例会失败，即使内容相同
assert.deepStrictEqual(weakMap1, weakMap2);
// AssertionError: 值具有相同的结构但引用不相等：
//
// WeakMap {
//   <项目未知>
// }

// 比较同一实例与其自身会成功
assert.deepStrictEqual(weakMap1, weakMap1);
// 没问题

const weakSet1 = new WeakSet();
const weakSet2 = new WeakSet();
weakSet1.add(obj);
weakSet2.add(obj);

// 比较不同实例会失败，即使内容相同
assert.deepStrictEqual(weakSet1, weakSet2);
// AssertionError: 值具有相同的结构但引用不相等：
// + 实际 - 期望
//
// WeakSet {
//   <项目未知>
// }

// 比较同一实例与其自身会成功
assert.deepStrictEqual(weakSet1, weakSet1);
// 没问题
```

```cjs
const assert = require('node:assert/strict');

// 这会失败，因为 1 !== '1'。
assert.deepStrictEqual({ a: 1 }, { a: '1' });
// AssertionError: 期望输入严格深相等：
// + 实际 - 期望
//
//   {
// +   a: 1
// -   a: '1'
//   }

// 以下对象没有自有属性
const date = new Date();
const object = {};
const fakeDate = {};
Object.setPrototypeOf(fakeDate, Date.prototype);

// 不同的 [[Prototype]]：
assert.deepStrictEqual(object, fakeDate);
// AssertionError: 期望输入严格深相等：
// + 实际 - 期望
//
// + {}
// - Date {}

// 不同的类型标签：
assert.deepStrictEqual(date, fakeDate);
// AssertionError: 期望输入严格深相等：
// + 实际 - 期望
//
// + 2018-04-26T00:49:08.604Z
// - Date {}

assert.deepStrictEqual(NaN, NaN);
// 没问题，因为 Object.is(NaN, NaN) 为 true。

// 不同的解包数字：
assert.deepStrictEqual(new Number(1), new Number(2));
// AssertionError: 期望输入严格深相等：
// + 实际 - 期望
//
// + [Number: 1]
// - [Number: 2]

assert.deepStrictEqual(new String('foo'), Object('foo'));
// 没问题，因为对象和字符串解包后是相同的。

assert.deepStrictEqual(-0, -0);
// 没问题

// 不同的零：
assert.deepStrictEqual(0, -0);
// AssertionError: 期望输入严格深相等：
// + 实际 - 期望
//
// + 0
// - -0

const symbol1 = Symbol();
const symbol2 = Symbol();
assert.deepStrictEqual({ [symbol1]: 1 }, { [symbol1]: 1 });
// 没问题，因为两个对象上是同一个 symbol。

assert.deepStrictEqual({ [symbol1]: 1 }, { [symbol2]: 1 });
// AssertionError [ERR_ASSERTION]: 输入相同但引用不相等：
//
// {
//   Symbol(): 1
// }

const weakMap1 = new WeakMap();
const weakMap2 = new WeakMap();
const obj = {};

weakMap1.set(obj, 'value');
weakMap2.set(obj, 'value');

// 比较不同实例会失败，即使内容相同
assert.deepStrictEqual(weakMap1, weakMap2);
// AssertionError: 值具有相同的结构但引用不相等：
//
// WeakMap {
//   <项目未知>
// }

// 比较同一实例与其自身会成功
assert.deepStrictEqual(weakMap1, weakMap1);
// 没问题

const weakSet1 = new WeakSet();
const weakSet2 = new WeakSet();
weakSet1.add(obj);
weakSet2.add(obj);

// 比较不同实例会失败，即使内容相同
assert.deepStrictEqual(weakSet1, weakSet2);
// AssertionError: 值具有相同的结构但引用不相等：
// + 实际 - 期望
//
// WeakSet {
//   <项目未知>
// }

// 比较同一实例与其自身会成功
assert.deepStrictEqual(weakSet1, weakSet1);
// 没问题
```

如果值不相等，则会抛出 [`AssertionError`][]，其 `message` 属性设置为 `message` 参数的值。如果 `message` 参数为 undefined，则分配默认错误消息。如果 `message` 参数是 {Error} 的实例，则将抛出它而不是 `AssertionError`。

## `assert.doesNotMatch(string, regexp[, message])`

<!-- YAML
added:
  - v13.6.0
  - v12.16.0
changes:
  - version: v26.0.0
    pr-url: https://github.com/nodejs/node/pull/58849
    description: "message 现在可以是 `printf` 风格的格式字符串或函数。"
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/38111
    description: 此 API 不再是实验性的。
-->

* `string` {字符串}
* `regexp` {RegExp}
* `message` {字符串|Error|Function}

期望 `string` 输入不匹配正则表达式。

```mjs
import assert from 'node:assert/strict';

assert.doesNotMatch('I will fail', /fail/);
// AssertionError [ERR_ASSERTION]: 期望输入不匹配 ...

assert.doesNotMatch(123, /pass/);
// AssertionError [ERR_ASSERTION]: "string" 参数必须是 string 类型。

assert.doesNotMatch('I will pass', /different/);
// 没问题
```

```cjs
const assert = require('node:assert/strict');

assert.doesNotMatch('I will fail', /fail/);
// AssertionError [ERR_ASSERTION]: 期望输入不匹配 ...

assert.doesNotMatch(123, /pass/);
// AssertionError [ERR_ASSERTION]: "string" 参数必须是 string 类型。

assert.doesNotMatch('I will pass', /different/);
// 没问题
```

如果值匹配，或者 `string` 参数是 `string` 以外的其他类型，则会抛出 [`AssertionError`][]，其 `message` 属性设置为 `message` 参数的值。如果 `message` 参数为 undefined，则分配默认错误消息。如果 `message` 参数是 {Error} 的实例，则将抛出它而不是 [`AssertionError`][]。

## `assert.doesNotReject(asyncFn[, error][, message])`

<!-- YAML
added: v10.0.0
-->

* `asyncFn` {Function|Promise}
* `error` {RegExp|Function}
* `message` {string}
* 返回值：{Promise}

等待 `asyncFn` promise，或者如果 `asyncFn` 是一个函数，则立即调用该函数并等待返回的 promise 完成。然后它将检查 promise 是否未被拒绝。

如果 `asyncFn` 是一个函数且它同步抛出一个错误，`assert.doesNotReject()` 将返回一个带有该错误的被拒绝的 `Promise`。如果该函数没有返回 promise，`assert.doesNotReject()` 将返回一个带有 [`ERR_INVALID_RETURN_VALUE`][] 错误的被拒绝的 `Promise`。在这两种情况下，错误处理程序都会被跳过。

使用 `assert.doesNotReject()` 实际上并没有用处，因为捕获拒绝然后再拒绝它几乎没有好处。相反，考虑在不应拒绝的特定代码路径旁边添加注释，并尽可能保持错误消息的表达力。

如果指定，`error` 可以是一个 [`Class`][]、{RegExp} 或验证函数。有关更多详细信息，请参阅 [`assert.throws()`][]。

除了等待完成的异步性质外，其行为与 [`assert.doesNotThrow()`][] 相同。

```mjs
import assert from 'node:assert/strict';

await assert.doesNotReject(
  async () => {
    throw new TypeError('Wrong value');
  },
  SyntaxError,
);
```

```cjs
const assert = require('node:assert/strict');

(async () => {
  await assert.doesNotReject(
    async () => {
      throw new TypeError('Wrong value');
    },
    SyntaxError,
  );
})();
```

```mjs
import assert from 'node:assert/strict';

assert.doesNotReject(Promise.reject(new TypeError('Wrong value')))
  .then(() => {
    // ...
  });
```

```cjs
const assert = require('node:assert/strict');

assert.doesNotReject(Promise.reject(new TypeError('Wrong value')))
  .then(() => {
    // ...
  });
```

## `assert.doesNotThrow(fn[, error][, message])`

<!-- YAML
added: v0.1.21
changes:
  - version:
    - v5.11.0
    - v4.4.5
    pr-url: https://github.com/nodejs/node/pull/2407
    description: "现在支持 `message` 参数。"
  - version: v4.2.0
    pr-url: https://github.com/nodejs/node/pull/3276
    description: "`error` 参数现在可以是箭头函数。"
-->

* `fn` {Function}
* `error` {RegExp|Function}
* `message` {string}

断言函数 `fn` 不会抛出错误。

使用 `assert.doesNotThrow()` 实际上并没有用处，因为捕获错误然后再重新抛出它没有好处。相反，考虑在不应抛出的特定代码路径旁边添加注释，并尽可能保持错误消息的表达力。

当调用 `assert.doesNotThrow()` 时，它将立即调用 `fn` 函数。

如果抛出错误且其类型与 `error` 参数指定的类型相同，则会抛出 [`AssertionError`][]。如果错误类型不同，或者 `error` 参数未定义，则错误会传播回调用者。

如果指定，`error` 可以是一个 [`Class`][]、{RegExp} 或验证函数。有关更多详细信息，请参阅 [`assert.throws()`][]。

例如，以下代码将抛出 {TypeError}，因为断言中没有匹配的错误类型：

```mjs
import assert from 'node:assert/strict';

assert.doesNotThrow(
  () => {
    throw new TypeError('Wrong value');
  },
  SyntaxError,
);
```

```cjs
const assert = require('node:assert/strict');

assert.doesNotThrow(
  () => {
    throw new TypeError('Wrong value');
  },
  SyntaxError,
);
```

但是，以下代码将导致带有消息 'Got unwanted exception...' 的 [`AssertionError`][]：

```mjs
import assert from 'node:assert/strict';

assert.doesNotThrow(
  () => {
    throw new TypeError('Wrong value');
  },
  TypeError,
);
```

```cjs
const assert = require('node:assert/strict');

assert.doesNotThrow(
  () => {
    throw new TypeError('Wrong value');
  },
  TypeError,
);
```

如果抛出 [`AssertionError`][] 且为 `message` 参数提供了值，则 `message` 的值将附加到 [`AssertionError`][] 消息中：

```mjs
import assert from 'node:assert/strict';

assert.doesNotThrow(
  () => {
    throw new TypeError('Wrong value');
  },
  /Wrong value/,
  'Whoops',
);
// 抛出：AssertionError: 收到了不需要的异常：Whoops
```

```cjs
const assert = require('node:assert/strict');

assert.doesNotThrow(
  () => {
    throw new TypeError('Wrong value');
  },
  /Wrong value/,
  'Whoops',
);
// 抛出：AssertionError: 收到了不需要的异常：Whoops
```

## `assert.equal(actual, expected[, message])`

<!-- YAML
added: v0.1.21
changes:
  - version: v26.0.0
    pr-url: https://github.com/nodejs/node/pull/58849
    description: "消息现在可以是 `printf` 风格的格式字符串或函数。"
  - version:
      - v16.0.0
      - v14.18.0
    pr-url: https://github.com/nodejs/node/pull/38113
    description: 在遗留断言模式中，状态已从弃用改为遗留。
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/30766
    description: 如果两边都是 NaN，现在将 NaN 视为相同。
-->

* `actual` {any}
* `expected` {any}
* `message` {string|Error|Function}

**严格断言模式**

[`assert.strictEqual()`][] 的别名。

**遗留断言模式**

> 稳定性：3 - 遗留：请改用 [`assert.strictEqual()`][]。

使用 [`==` 运算符][] 测试 `actual` 和 `expected` 参数之间的浅层强制相等性。`NaN` 会被特殊处理，如果两边都是 `NaN` 则视为相同。

```mjs
import assert from 'node:assert';

assert.equal(1, 1);
// 正常，1 == 1
assert.equal(1, '1');
// 正常，1 == '1'
assert.equal(NaN, NaN);
// 正常

assert.equal(1, 2);
// AssertionError: 1 == 2
assert.equal({ a: { b: 1 } }, { a: { b: 1 } });
// AssertionError: { a: { b: 1 } } == { a: { b: 1 } }
```

```cjs
const assert = require('node:assert');

assert.equal(1, 1);
// 正常，1 == 1
assert.equal(1, '1');
// 正常，1 == '1'
assert.equal(NaN, NaN);
// 正常

assert.equal(1, 2);
// AssertionError: 1 == 2
assert.equal({ a: { b: 1 } }, { a: { b: 1 } });
// AssertionError: { a: { b: 1 } } == { a: { b: 1 } }
```

如果值不相等，则会抛出 [`AssertionError`][]，其 `message` 属性设置为等于 `message` 参数的值。如果 `message` 参数未定义，则分配默认错误消息。如果 `message` 参数是 {Error} 的实例，则将抛出它而不是 `AssertionError`。

## `assert.fail([message])`

<!-- YAML
added: v0.1.21
-->

* `message` {string|Error} **默认值：** `'Failed'`

抛出带有提供的错误消息或默认错误消息的 [`AssertionError`][]。如果 `message` 参数是 {Error} 的实例，则将抛出它而不是 [`AssertionError`][]。

```mjs
import assert from 'node:assert/strict';

assert.fail();
// AssertionError [ERR_ASSERTION]: 失败

assert.fail('boom');
// AssertionError [ERR_ASSERTION]: boom

assert.fail(new TypeError('need array'));
// TypeError: 需要数组
```

```cjs
const assert = require('node:assert/strict');

assert.fail();
// AssertionError [ERR_ASSERTION]: 失败

assert.fail('boom');
// AssertionError [ERR_ASSERTION]: boom

assert.fail(new TypeError('need array'));
// TypeError: 需要数组
```

## `assert.ifError(value)`

<!-- YAML
added: v0.1.97
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18247
    description: "现在不是抛出原始错误，而是将其包装到包含完整堆栈跟踪的 [`AssertionError`][] 中。"
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18247
    description: "值现在只能是 `undefined` 或 `null`。之前所有假值都与 `null` 一样处理且不会抛出。"
-->

* `value` {any}

如果 `value` 不是 `undefined` 或 `null`，则抛出 `value`。这在测试回调中的 `error` 参数时很有用。堆栈跟踪包含传递给 `ifError()` 的错误的所有帧，包括 `ifError()` 本身潜在的新帧。

```mjs
import assert from 'node:assert/strict';

assert.ifError(null);
// 正常
assert.ifError(0);
// AssertionError [ERR_ASSERTION]: ifError 收到了不需要的异常：0
assert.ifError('error');
// AssertionError [ERR_ASSERTION]: ifError 收到了不需要的异常：'error'
assert.ifError(new Error());
// AssertionError [ERR_ASSERTION]: ifError 收到了不需要的异常：Error

// 创建一些随机错误帧。
let err;
(function errorFrame() {
  err = new Error('test error');
})();

(function ifErrorFrame() {
  assert.ifError(err);
})();
// AssertionError [ERR_ASSERTION]: ifError 收到了不需要的异常：test error
//     at ifErrorFrame
//     at errorFrame
```

```cjs
const assert = require('node:assert/strict');

assert.ifError(null);
// 正常
assert.ifError(0);
// AssertionError [ERR_ASSERTION]: ifError 收到了不需要的异常：0
assert.ifError('error');
// AssertionError [ERR_ASSERTION]: ifError 收到了不需要的异常：'error'
assert.ifError(new Error());
// AssertionError [ERR_ASSERTION]: ifError 收到了不需要的异常：Error

// 创建一些随机错误帧。
let err;
(function errorFrame() {
  err = new Error('test error');
})();

(function ifErrorFrame() {
  assert.ifError(err);
})();
// AssertionError [ERR_ASSERTION]: ifError 收到了不需要的异常：test error
//     at ifErrorFrame
//     at errorFrame
```

## `assert.match(string, regexp[, message])`

<!-- YAML
added:
  - v13.6.0
  - v12.16.0
changes:
  - version: v26.0.0
    pr-url: https://github.com/nodejs/node/pull/58849
    description: "消息现在可以是 `printf` 风格的格式字符串或函数。"
  - version: v16.0.0
    pr-url: https://github.com/nodejs/node/pull/38111
    description: 此 API 不再是实验性的。
-->

* `string` {string}
* `regexp` {RegExp}
* `message` {string|Error|Function}

期望 `string` 输入匹配正则表达式。

```mjs
import assert from 'node:assert/strict';

assert.match('I will fail', /pass/);
// AssertionError [ERR_ASSERTION]: 输入未匹配正则 ...

assert.match(123, /pass/);
// AssertionError [ERR_ASSERTION]: "string" 参数必须是 string 类型。

assert.match('I will pass', /pass/);
// 正常
```

```cjs
const assert = require('node:assert/strict');

assert.match('I will fail', /pass/);
// AssertionError [ERR_ASSERTION]: 输入未匹配正则 ...

assert.match(123, /pass/);
// AssertionError [ERR_ASSERTION]: "string" 参数必须是 string 类型。

assert.match('I will pass', /pass/);
// 正常
```

如果值不匹配，或者 `string` 参数的类型不是 `string`，则会抛出 [`AssertionError`][]，其 `message` 属性设置为等于 `message` 参数的值。如果 `message` 参数未定义，则分配默认错误消息。如果 `message` 参数是 {Error} 的实例，则将抛出它而不是 [`AssertionError`][]。

## `assert.notDeepEqual(actual, expected[, message])`

<!-- YAML
added: v0.1.21
changes:
  - version: v26.0.0
    pr-url: https://github.com/nodejs/node/pull/58849
    description: "消息现在可以是 `printf` 风格的格式字符串或函数。"
  - version:
      - v16.0.0
      - v14.18.0
    pr-url: https://github.com/nodejs/node/pull/38113
    description: 在遗留断言模式下，状态已从弃用改为遗留。
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/30766
    description: 如果两边都是 NaN，现在将 NaN 视为相同。
  - version: v9.0.0
    pr-url: https://github.com/nodejs/node/pull/15001
    description: "现在可以正确比较 `Error` 名称和消息。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12142
    description: "现在也会比较 `Set` 和 `Map` 内容。"
  - version:
      - v6.4.0
      - v4.7.1
    pr-url: https://github.com/nodejs/node/pull/8002
    description: 现在可以正确处理类型化数组切片。
  - version:
      - v6.1.0
      - v4.5.0
    pr-url: https://github.com/nodejs/node/pull/6432
    description: 现在可以将具有循环引用的对象用作输入。
  - version:
      - v5.10.1
      - v4.4.3
    pr-url: https://github.com/nodejs/node/pull/5910
    description: "正确处理非 `Uint8Array` 类型化数组。"
-->

* `actual` {any}
* `expected` {any}
* `message` {string|Error|Function}

**严格断言模式**

[`assert.notDeepStrictEqual()`][] 的别名。

**遗留断言模式**

> 稳定性：3 - 遗留：请改用 [`assert.notDeepStrictEqual()`][]。

测试任何深度不相等。[`assert.deepEqual()`][] 的反面。

```mjs
import assert from 'node:assert';

const obj1 = {
  a: {
    b: 1,
  },
};
const obj2 = {
  a: {
    b: 2,
  },
};
const obj3 = {
  a: {
    b: 1,
  },
};
const obj4 = { __proto__: obj1 };

assert.notDeepEqual(obj1, obj1);
// AssertionError: { a: { b: 1 } } notDeepEqual { a: { b: 1 } }

assert.notDeepEqual(obj1, obj2);
// 通过

assert.notDeepEqual(obj1, obj3);
// AssertionError: { a: { b: 1 } } notDeepEqual { a: { b: 1 } }

assert.notDeepEqual(obj1, obj4);
// 通过
```

```cjs
const assert = require('node:assert');

const obj1 = {
  a: {
    b: 1,
  },
};
const obj2 = {
  a: {
    b: 2,
  },
};
const obj3 = {
  a: {
    b: 1,
  },
};
const obj4 = { __proto__: obj1 };

assert.notDeepEqual(obj1, obj1);
// AssertionError: { a: { b: 1 } } notDeepEqual { a: { b: 1 } }

assert.notDeepEqual(obj1, obj2);
// 通过

assert.notDeepEqual(obj1, obj3);
// AssertionError: { a: { b: 1 } } notDeepEqual { a: { b: 1 } }

assert.notDeepEqual(obj1, obj4);
// 通过
```

如果值深度相等，则抛出 [`AssertionError`][]，`message` 属性设置为 `message` 参数的值。如果 `message` 参数为 undefined，则分配默认错误消息。如果 `message` 参数是 {Error} 的实例，则将抛出它而不是 `AssertionError`。

## `assert.notDeepStrictEqual(actual, expected[, message])`

<!-- YAML
added: v1.2.0
changes:
  - version: v26.0.0
    pr-url: https://github.com/nodejs/node/pull/58849
    description: "`message` 现在可以是 `printf` 风格的格式字符串或函数。"
  - version: v9.0.0
    pr-url: https://github.com/nodejs/node/pull/15398
    description: "`-0` 和 `+0` 不再被视为相等。"
  - version: v9.0.0
    pr-url: https://github.com/nodejs/node/pull/15036
    description: "现在使用 [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero) 比较 `NaN`。"
  - version: v9.0.0
    pr-url: https://github.com/nodejs/node/pull/15001
    description: "现在可以正确比较 `Error` 名称和消息。"
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/12142
    description: "现在也会比较 `Set` 和 `Map` 内容。"
  - version:
    - v6.4.0
    - v4.7.1
    pr-url: https://github.com/nodejs/node/pull/8002
    description: 现在可以正确处理类型化数组切片。
  - version: v6.1.0
    pr-url: https://github.com/nodejs/node/pull/6432
    description: 现在可以将具有循环引用的对象用作输入。
  - version:
    - v5.10.1
    - v4.4.3
    pr-url: https://github.com/nodejs/node/pull/5910
    description: "正确处理非 `Uint8Array` 类型化数组。"
-->

* `actual` {any}
* `expected` {any}
* `message` {string|Error|Function}

测试深度严格不相等。[`assert.deepStrictEqual()`][] 的反面。

```mjs
import assert from 'node:assert/strict';

assert.notDeepStrictEqual({ a: 1 }, { a: '1' });
// 通过
```

```cjs
const assert = require('node:assert/strict');

assert.notDeepStrictEqual({ a: 1 }, { a: '1' });
// 通过
```

如果值深度且严格相等，则抛出 [`AssertionError`][]，`message` 属性设置为 `message` 参数的值。如果 `message` 参数为 undefined，则分配默认错误消息。如果 `message` 参数是 {Error} 的实例，则将抛出它而不是 [`AssertionError`][]。

## `assert.notEqual(actual, expected[, message])`

<!-- YAML
added: v0.1.21
changes:
  - version: v26.0.0
    pr-url: https://github.com/nodejs/node/pull/58849
    description: "Message 现在可以是 `printf` 风格的格式字符串或函数。"
  - version:
      - v16.0.0
      - v14.18.0
    pr-url: https://github.com/nodejs/node/pull/38113
    description: 在遗留断言模式下，状态已从弃用改为遗留。
  - version: v14.0.0
    pr-url: https://github.com/nodejs/node/pull/30766
    description: 如果两边都是 NaN，现在将 NaN 视为相同。
-->

* `actual` {any}
* `expected` {any}
* `message` {string|Error|Function}

**严格断言模式**

[`assert.notStrictEqual()`][] 的别名。

**遗留断言模式**

> 稳定性：3 - 遗留：请改用 [`assert.notStrictEqual()`][]。

使用 [`!= 运算符`][] 测试浅层强制不相等。`NaN` 经过特殊处理，如果两边都是 `NaN`，则视为相同。

```mjs
import assert from 'node:assert';

assert.notEqual(1, 2);
// 通过

assert.notEqual(1, 1);
// AssertionError: 1 != 1

assert.notEqual(1, '1');
// AssertionError: 1 != '1'
```

```cjs
const assert = require('node:assert');

assert.notEqual(1, 2);
// 通过

assert.notEqual(1, 1);
// AssertionError: 1 != 1

assert.notEqual(1, '1');
// AssertionError: 1 != '1'
```

如果值相等，则抛出 [`AssertionError`][]，`message` 属性设置为 `message` 参数的值。如果 `message` 参数为 undefined，则分配默认错误消息。如果 `message` 参数是 {Error} 的实例，则将抛出它而不是 `AssertionError`。

## `assert.notStrictEqual(actual, expected[, message])`

<!-- YAML
added: v0.1.21
changes:
  - version: v26.0.0
    pr-url: https://github.com/nodejs/node/pull/58849
    description: "消息现在可以是 `printf` 风格的格式字符串或函数。"
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/17003
    description: "使用的比较已从严格相等改为 `Object.is()`。"
-->

* `actual` {any}
* `expected` {any}
* `message` {string|Error|Function}

测试由 [`Object.is()`][] 确定的 `actual` 和 `expected` 参数之间的严格不相等。

```mjs
import assert from 'node:assert/strict';

assert.notStrictEqual(1, 2);
// 通过

assert.notStrictEqual(1, 1);
// AssertionError [ERR_ASSERTION]: 期望 "actual" 严格不等于：
//
// 1

assert.notStrictEqual(1, '1');
// 通过
```

```cjs
const assert = require('node:assert/strict');

assert.notStrictEqual(1, 2);
// 通过

assert.notStrictEqual(1, 1);
// AssertionError [ERR_ASSERTION]: 期望 "actual" 严格不等于：
//
// 1

assert.notStrictEqual(1, '1');
// 通过
```

如果值严格相等，则抛出 [`AssertionError`][]，`message` 属性设置为 `message` 参数的值。如果 `message` 参数为 undefined，则分配默认错误消息。如果 `message` 参数是 {Error} 的实例，则将抛出它而不是 `AssertionError`。

## `assert.ok(value[, message])`

<!-- YAML
added: v0.1.21
changes:
  - version: v26.0.0
    pr-url: https://github.com/nodejs/node/pull/58849
    description: "消息现在可以是 `printf` 风格的格式字符串或函数。"
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/18319
    description: "`assert.ok()`（无参数）现在将使用预定义的错误消息。"
-->

* `value` {any}
* `message` {string|Error|Function}

测试 `value` 是否为真值。相当于 `assert.equal(!!value, true, message)`。

如果 `value` 不为真值，则抛出 [`AssertionError`][]，`message` 属性设置为 `message` 参数的值。如果 `message` 参数为 `undefined`，则分配默认错误消息。如果 `message` 参数是 {Error} 的实例，则将抛出它而不是 `AssertionError`。
如果根本没有传递任何参数，`message` 将设置为字符串：
``'没有值参数传递给 `assert.ok()`'``。

请注意，在 `repl` 中，错误消息将与文件中抛出的错误消息不同！详见下文。

<!-- eslint-disable no-restricted-syntax -->

```mjs
import assert from 'node:assert/strict';

assert.ok(true);
// 通过
assert.ok(1);
// 通过

assert.ok();
// AssertionError: 没有值参数传递给 `assert.ok()`

assert.ok(false, 'it\'s false');
// AssertionError: it's false

// 在 repl 中：
assert.ok(typeof 123 === 'string');
// AssertionError: false == true

// 在文件中（例如 test.js）：
assert.ok(typeof 123 === 'string');
// AssertionError: 表达式评估为假值：
//
//   assert.ok(typeof 123 === 'string')

assert.ok(false);
// AssertionError: 表达式评估为假值：
//
//   assert.ok(false)

assert.ok(0);
// AssertionError: 表达式评估为假值：
//
//   assert.ok(0)
```

<!-- eslint-disable no-restricted-syntax -->

```cjs
const assert = require('node:assert/strict');

assert.ok(true);
// 通过
assert.ok(1);
// 通过

assert.ok();
// AssertionError: 没有值参数传递给 `assert.ok()`

assert.ok(false, 'it\'s false');
// AssertionError: it's false

// 在 repl 中：
assert.ok(typeof 123 === 'string');
// AssertionError: false == true

// 在文件中（例如 test.js）：
assert.ok(typeof 123 === 'string');
// AssertionError: 表达式评估为假值：
//
//   assert.ok(typeof 123 === 'string')

assert.ok(false);
// AssertionError: 表达式评估为假值：
//
//   assert.ok(false)

assert.ok(0);
// AssertionError: 表达式评估为假值：
//
//   assert.ok(0)
```

```mjs
import assert from 'node:assert/strict';

// 使用 `assert()` 效果相同：
assert(2 + 2 > 5);
// AssertionError: 表达式评估为假值：
//
//   assert(2 + 2 > 5)
```

```cjs
const assert = require('node:assert');

// 使用 `assert()` 效果相同：
assert(2 + 2 > 5);
// AssertionError: 表达式评估为假值：
//
//   assert(2 + 2 > 5)
```

## `assert.rejects(asyncFn[, error][, message])`

<!-- YAML
added: v10.0.0
-->

* `asyncFn` {函数 | Promise}
* `error` {RegExp|函数 | 对象 | Error}
* `message` {字符串}
* 返回值：{Promise}

等待 `asyncFn` promise，或者如果 `asyncFn` 是一个函数，则立即调用该函数并等待返回的 promise 完成。然后它将检查 promise 是否被拒绝。

如果 `asyncFn` 是一个函数且同步抛出错误，`assert.rejects()` 将返回一个带有该错误的被拒绝的 `Promise`。如果该函数没有返回 promise，`assert.rejects()` 将返回一个带有 [`ERR_INVALID_RETURN_VALUE`][] 错误的被拒绝的 `Promise`。在这两种情况下，错误处理程序都会被跳过。

除了等待完成的异步性质外，其行为与 [`assert.throws()`][] 相同。

如果指定，`error` 可以是一个 [`类`][]、{RegExp}、验证函数、一个将测试每个属性的对象，或一个错误实例，其中将测试每个属性，包括不可枚举的 `message` 和 `name` 属性。

如果指定，`message` 将是 [`AssertionError`][] 提供的消息，如果 `asyncFn` 未能拒绝。

```mjs
import assert from 'node:assert/strict';

await assert.rejects(
  async () => {
    throw new TypeError('Wrong value');
  },
  {
    name: 'TypeError',
    message: 'Wrong value',
  },
);
```

```cjs
const assert = require('node:assert/strict');

(async () => {
  await assert.rejects(
    async () => {
      throw new TypeError('Wrong value');
    },
    {
      name: 'TypeError',
      message: 'Wrong value',
    },
  );
})();
```

```mjs
import assert from 'node:assert/strict';

await assert.rejects(
  async () => {
    throw new TypeError('Wrong value');
  },
  (err) => {
    assert.strictEqual(err.name, 'TypeError');
    assert.strictEqual(err.message, 'Wrong value');
    return true;
  },
);
```

```cjs
const assert = require('node:assert/strict');

(async () => {
  await assert.rejects(
    async () => {
      throw new TypeError('Wrong value');
    },
    (err) => {
      assert.strictEqual(err.name, 'TypeError');
      assert.strictEqual(err.message, 'Wrong value');
      return true;
    },
  );
})();
```

```mjs
import assert from 'node:assert/strict';

assert.rejects(
  Promise.reject(new Error('Wrong value')),
  Error,
).then(() => {
  // ...
});
```

```cjs
const assert = require('node:assert/strict');

assert.rejects(
  Promise.reject(new Error('Wrong value')),
  Error,
).then(() => {
  // ...
});
```

`error` 不能是字符串。如果提供字符串作为第二个参数，则 `error` 被视为省略，该字符串将用于 `message`。这可能导致容易忽略的错误。如果考虑使用字符串作为第二个参数，请仔细阅读 [`assert.throws()`][] 中的示例。

## `assert.strictEqual(actual, expected[, message])`

<!-- YAML
added: v0.1.21
changes:
  - version: v26.0.0
    pr-url: https://github.com/nodejs/node/pull/58849
    description: "消息现在可以是 `printf` 风格的格式字符串或函数。"
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/17003
    description: "使用的比较方式从严格相等改为 `Object.is()`。"
-->

* `actual` {任意}
* `expected` {任意}
* `message` {字符串 | 错误 | 函数} 如果用作格式字符串，则为后缀 `printf` 风格参数。
  如果 message 是一个函数，则在比较失败时调用它。该函数接收 `actual` 和 `expected` 参数，并必须返回一个将用作错误消息的字符串。
  `printf` 风格的格式字符串和函数有利于性能，因为在传递参数的情况下。此外，它允许轻松地进行良好的格式化。

测试由 [`Object.is()`][] 确定的 `actual` 和 `expected` 参数之间的严格相等性。

```mjs
import assert from 'node:assert/strict';

assert.strictEqual(1, 2);
// AssertionError [ERR_ASSERTION]: 期望输入严格相等：
//
// 1 !== 2

assert.strictEqual(1, 1);
// 通过

assert.strictEqual('Hello foobar', 'Hello World!');
// AssertionError [ERR_ASSERTION]: 期望输入严格相等：
// + 实际值 - 期望值
//
// + 'Hello foobar'
// - 'Hello World!'
//          ^

const apples = 1;
const oranges = 2;
assert.strictEqual(apples, oranges, `apples ${apples} !== oranges ${oranges}`);
// AssertionError [ERR_ASSERTION]: apples 1 !== oranges 2

assert.strictEqual(apples, oranges, 'apples %s !== oranges %s', apples, oranges);
// AssertionError [ERR_ASSERTION]: apples 1 !== oranges 2

assert.strictEqual(1, '1', new TypeError('Inputs are not identical'));
// TypeError: Inputs are not identical

assert.strictEqual(apples, oranges, (actual, expected) => {
  // 执行‘繁重’计算
  return `I expected ${expected} but I got ${actual}`;
});
// AssertionError [ERR_ASSERTION]: I expected oranges but I got apples
```

```cjs
const assert = require('node:assert/strict');

assert.strictEqual(1, 2);
// AssertionError [ERR_ASSERTION]: 期望输入严格相等：
//
// 1 !== 2

assert.strictEqual(1, 1);
// 通过

assert.strictEqual('Hello foobar', 'Hello World!');
// AssertionError [ERR_ASSERTION]: 期望输入严格相等：
// + 实际值 - 期望值
//
// + 'Hello foobar'
// - 'Hello World!'
//          ^

const apples = 1;
const oranges = 2;
assert.strictEqual(apples, oranges, `apples ${apples} !== oranges ${oranges}`);
// AssertionError [ERR_ASSERTION]: apples 1 !== oranges 2

assert.strictEqual(apples, oranges, 'apples %s !== oranges %s', apples, oranges);
// AssertionError [ERR_ASSERTION]: apples 1 !== oranges 2

assert.strictEqual(1, '1', new TypeError('Inputs are not identical'));
// TypeError: Inputs are not identical

assert.strictEqual(apples, oranges, (actual, expected) => {
  // 执行‘繁重’计算
  return `I expected ${expected} but I got ${actual}`;
});
// AssertionError [ERR_ASSERTION]: I expected oranges but I got apples
```

如果值不严格相等，则抛出 [`AssertionError`][]，`message` 属性设置为等于 `message` 参数的值。如果 `message` 参数为 undefined，则分配默认错误消息。如果 `message` 参数是 {错误} 的实例，则将抛出它而不是 [`AssertionError`][]。

## `assert.throws(fn[, error][, message])`

<!-- YAML
added: v0.1.21
changes:
  - version: v10.2.0
    pr-url: https://github.com/nodejs/node/pull/20485
    description: "`error` 参数现在可以是包含正则表达式的对象。"
  - version: v9.9.0
    pr-url: https://github.com/nodejs/node/pull/17584
    description: "`error` 参数现在也可以是对象。"
  - version: v4.2.0
    pr-url: https://github.com/nodejs/node/pull/3276
    description: "`error` 参数现在可以是箭头函数。"
-->

* `fn` {函数}
* `error` {RegExp|函数 | 对象 | Error}
* `message` {字符串}

期望函数 `fn` 抛出一个错误。

如果指定，`error` 可以是一个 [`类`][]、{RegExp}、验证函数、一个将测试每个属性严格深度相等的验证对象，或一个错误实例，其中将测试每个属性严格深度相等，包括不可枚举的 `message` 和 `name` 属性。当使用对象时，也可以使用正则表达式来验证字符串属性。请参阅下面的示例。

如果指定，如果 `fn` 调用未能抛出或错误验证失败，`message` 将附加到 `AssertionError` 提供的消息中。

自定义验证对象/错误实例：

```mjs
import assert from 'node:assert/strict';

const err = new TypeError('Wrong value');
err.code = 404;
err.foo = 'bar';
err.info = {
  nested: true,
  baz: 'text',
};
err.reg = /abc/i;

assert.throws(
  () => {
    throw err;
  },
  {
    name: 'TypeError',
    message: 'Wrong value',
    info: {
      nested: true,
      baz: 'text',
    },
    // 仅测试验证对象上的属性。
    // 使用嵌套对象需要所有属性都存在。否则
    // 验证将会失败。
  },
);

// 使用正则表达式验证错误属性：
assert.throws(
  () => {
    throw err;
  },
  {
    // `name` 和 `message` 属性是字符串，对其使用正则
    // 表达式将会匹配字符串。如果失败，将
    // 抛出错误。
    name: /^TypeError$/,
    message: /Wrong/,
    foo: 'bar',
    info: {
      nested: true,
      // 无法对嵌套属性使用正则表达式！
      baz: 'text',
    },
    // `reg` 属性包含一个正则表达式，只有当
    // 验证对象包含相同的正则表达式时，才会
    // 通过。
    reg: /abc/i,
  },
);

// 由于 `message` 和 `name` 属性不同而失败：
assert.throws(
  () => {
    const otherErr = new Error('Not found');
    // 将所有可枚举属性从 `err` 复制到 `otherErr`。
    for (const [key, value] of Object.entries(err)) {
      otherErr[key] = value;
    }
    throw otherErr;
  },
  // 当使用错误作为验证对象时，错误的 `message` 和 `name` 属性也会被检查。
  err,
);
```

```cjs
const assert = require('node:assert/strict');

const err = new TypeError('Wrong value');
err.code = 404;
err.foo = 'bar';
err.info = {
  nested: true,
  baz: 'text',
};
err.reg = /abc/i;

assert.throws(
  () => {
    throw err;
  },
  {
    name: 'TypeError',
    message: 'Wrong value',
    info: {
      nested: true,
      baz: 'text',
    },
    // 仅测试验证对象上的属性。
    // 使用嵌套对象需要所有属性都存在。否则
    // 验证将会失败。
  },
);

// 使用正则表达式验证错误属性：
assert.throws(
  () => {
    throw err;
  },
  {
    // `name` 和 `message` 属性是字符串，对其使用正则
    // 表达式将会匹配字符串。如果失败，将
    // 抛出错误。
    name: /^TypeError$/,
    message: /Wrong/,
    foo: 'bar',
    info: {
      nested: true,
      // 无法对嵌套属性使用正则表达式！
      baz: 'text',
    },
    // `reg` 属性包含一个正则表达式，只有当
    // 验证对象包含相同的正则表达式时，才会
    // 通过。
    reg: /abc/i,
  },
);

// 由于 `message` 和 `name` 属性不同而失败：
assert.throws(
  () => {
    const otherErr = new Error('Not found');
    // 将所有可枚举属性从 `err` 复制到 `otherErr`。
    for (const [key, value] of Object.entries(err)) {
      otherErr[key] = value;
    }
    throw otherErr;
  },
  // 当使用错误作为验证对象时，错误的 `message` 和 `name` 属性也会被检查。
  err,
);
```

使用构造函数验证 instanceof：

```mjs
import assert from 'node:assert/strict';

assert.throws(
  () => {
    throw new Error('Wrong value');
  },
  Error,
);
```

```cjs
const assert = require('node:assert/strict');

assert.throws(
  () => {
    throw new Error('Wrong value');
  },
  Error,
);
```

使用 {RegExp} 验证错误消息：

使用正则表达式会在错误对象上运行 `.toString`，并且将因此也包含错误名称。

```mjs
import assert from 'node:assert/strict';

assert.throws(
  () => {
    throw new Error('Wrong value');
  },
  /^Error: Wrong value$/,
);
```

```cjs
const assert = require('node:assert/strict');

assert.throws(
  () => {
    throw new Error('Wrong value');
  },
  /^Error: Wrong value$/,
);
```

自定义错误验证：

函数必须返回 `true` 以表明所有内部验证通过。否则它将因 [`AssertionError`][] 而失败。

```mjs
import assert from 'node:assert/strict';

assert.throws(
  () => {
    throw new Error('Wrong value');
  },
  (err) => {
    assert(err instanceof Error);
    assert(/value/.test(err));
    // 避免从验证函数返回除 `true` 以外的任何内容。
    // 否则，不清楚验证的哪部分失败了。相反，
    // 抛出关于具体验证失败的错误（如此示例所示），并向该错误添加
    // 尽可能多的有用调试信息。
    return true;
  },
  'unexpected error',
);
```

```cjs
const assert = require('node:assert/strict');

assert.throws(
  () => {
    throw new Error('Wrong value');
  },
  (err) => {
    assert(err instanceof Error);
    assert(/value/.test(err));
    // 避免从验证函数返回除 `true` 以外的任何内容。
    // 否则，不清楚验证的哪部分失败了。相反，
    // 抛出关于具体验证失败的错误（如此示例所示），并向该错误添加
    // 尽可能多的有用调试信息。
    return true;
  },
  'unexpected error',
);
```

`error` 不能是字符串。如果提供字符串作为第二个参数，则 `error` 被视为省略，该字符串将用于 `message`。这可能导致容易忽略的错误。使用与抛出的错误消息相同的消息将导致 `ERR_AMBIGUOUS_ARGUMENT` 错误。如果考虑使用字符串作为第二个参数，请仔细阅读下面的示例：

```mjs
import assert from 'node:assert/strict';

function throwingFirst() {
  throw new Error('First');
}

function throwingSecond() {
  throw new Error('Second');
}

function notThrowing() {}

// 第二个参数是字符串，且输入函数抛出了一个 Error。
// 第一种情况不会抛出，因为它不匹配输入函数抛出的错误消息！
assert.throws(throwingFirst, 'Second');
// 在下一个示例中，该消息相对于错误消息没有好处，并且
// 由于不清楚用户是否打算实际匹配
// 错误消息，Node.js 会抛出 `ERR_AMBIGUOUS_ARGUMENT` 错误。
assert.throws(throwingSecond, 'Second');
// TypeError [ERR_AMBIGUOUS_ARGUMENT]

// 仅在函数未抛出时使用字符串（作为消息）：
assert.throws(notThrowing, 'Second');
// AssertionError [ERR_ASSERTION]: 缺少预期的异常：Second

// 如果打算匹配错误消息，请改为这样做：
// 它不会抛出，因为错误消息匹配。
assert.throws(throwingSecond, /Second$/);

// 如果错误消息不匹配，则抛出 AssertionError。
assert.throws(throwingFirst, /Second$/);
// AssertionError [ERR_ASSERTION]
```

```cjs
const assert = require('node:assert/strict');

function throwingFirst() {
  throw new Error('First');
}

function throwingSecond() {
  throw new Error('Second');
}

function notThrowing() {}

// 第二个参数是字符串，且输入函数抛出了一个 Error。
// 第一种情况不会抛出，因为它不匹配输入函数抛出的错误消息！
assert.throws(throwingFirst, 'Second');
// 在下一个示例中，该消息相对于错误消息没有好处，并且
// 由于不清楚用户是否打算实际匹配
// 错误消息，Node.js 会抛出 `ERR_AMBIGUOUS_ARGUMENT` 错误。
assert.throws(throwingSecond, 'Second');
// TypeError [ERR_AMBIGUOUS_ARGUMENT]

// 仅在函数未抛出时使用字符串（作为消息）：
assert.throws(notThrowing, 'Second');
// AssertionError [ERR_ASSERTION]: 缺少预期的异常：Second

// 如果打算匹配错误消息，请改为这样做：
// 它不会抛出，因为错误消息匹配。
assert.throws(throwingSecond, /Second$/);

// 如果错误消息不匹配，则抛出 AssertionError。
assert.throws(throwingFirst, /Second$/);
// AssertionError [ERR_ASSERTION]
```

由于这种表示法容易混淆且易出错，避免使用字符串作为第二个参数。

## `assert.partialDeepStrictEqual(actual, expected[, message])`

<!-- YAML
added:
  - v23.4.0
  - v22.13.0
changes:
  - version: v25.0.0
    pr-url: https://github.com/nodejs/node/pull/59448
    description: 如果 Promise 不是同一个实例，则不再视为相等。
  - version: v25.0.0
    pr-url: https://github.com/nodejs/node/pull/57627
    description: 无效日期现在被视为相等。
  - version:
      - v24.0.0
      - v22.17.0
    pr-url: https://github.com/nodejs/node/pull/57370
    description: partialDeepStrictEqual 现在是稳定的。此前，它是实验性的。
-->

* `actual` {any}
* `expected` {any}
* `message` {string|Error|Function}

测试 `actual` 和 `expected` 参数之间的部分深度相等性。
"深度" 相等意味着子对象的可枚举 "自有" 属性也会根据以下规则进行递归评估。"部分" 相等意味着只比较 `expected` 参数上存在的属性。

此方法总是通过与 [`assert.deepStrictEqual()`][] 相同的测试用例，表现为它的超集。

### 比较详情

* 原始值使用 [`Object.is()`][] 进行比较。
* 对象的 [类型标签][Object.prototype.toString()] 应该相同。
* 对象的 [`[[Prototype]]`][prototype-spec] 不被比较。
* 仅考虑 [可枚举 "自有" 属性][]。
* {Error} 的 name、message、cause 和 errors 总是会被比较，即使这些不是可枚举属性。
  `errors` 也会被比较。
* 可枚举的自有 {Symbol} 属性也会被比较。
* [对象包装器][] 既作为对象也比较解包后的值。
* `Object` 属性无序比较。
* {Map} 键和 {Set} 项无序比较。
* 当双方不同或双方遇到循环引用时，递归停止。
* {WeakMap}、{WeakSet} 和 {Promise} 实例**不**进行结构比较。仅当它们引用同一个对象时才相等。任何不同 `WeakMap`、`WeakSet` 或 `Promise` 实例之间的比较都将导致不相等，即使它们包含相同的内容。
* {RegExp} 的 lastIndex、flags 和 source 总是被比较，即使这些不是可枚举属性。
* 稀疏数组中的空穴被忽略。

```mjs
import assert from 'node:assert';

assert.partialDeepStrictEqual(
  { a: { b: { c: 1 } } },
  { a: { b: { c: 1 } } },
);
// 通过

assert.partialDeepStrictEqual(
  { a: 1, b: 2, c: 3 },
  { b: 2 },
);
// 通过

assert.partialDeepStrictEqual(
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [4, 5, 8],
);
// 通过

assert.partialDeepStrictEqual(
  new Set([{ a: 1 }, { b: 1 }]),
  new Set([{ a: 1 }]),
);
// 通过

assert.partialDeepStrictEqual(
  new Map([['key1', 'value1'], ['key2', 'value2']]),
  new Map([['key2', 'value2']]),
);
// 通过

assert.partialDeepStrictEqual(123n, 123n);
// 通过

assert.partialDeepStrictEqual(
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [5, 4, 8],
);
// AssertionError

assert.partialDeepStrictEqual(
  { a: 1 },
  { a: 1, b: 2 },
);
// AssertionError

assert.partialDeepStrictEqual(
  { a: { b: 2 } },
  { a: { b: '2' } },
);
// AssertionError
```

```cjs
const assert = require('node:assert');

assert.partialDeepStrictEqual(
  { a: { b: { c: 1 } } },
  { a: { b: { c: 1 } } },
);
// 通过

assert.partialDeepStrictEqual(
  { a: 1, b: 2, c: 3 },
  { b: 2 },
);
// 通过

assert.partialDeepStrictEqual(
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [4, 5, 8],
);
// 通过

assert.partialDeepStrictEqual(
  new Set([{ a: 1 }, { b: 1 }]),
  new Set([{ a: 1 }]),
);
// 通过

assert.partialDeepStrictEqual(
  new Map([['key1', 'value1'], ['key2', 'value2']]),
  new Map([['key2', 'value2']]),
);
// 通过

assert.partialDeepStrictEqual(123n, 123n);
// 通过

assert.partialDeepStrictEqual(
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [5, 4, 8],
);
// AssertionError

assert.partialDeepStrictEqual(
  { a: 1 },
  { a: 1, b: 2 },
);
// AssertionError

assert.partialDeepStrictEqual(
  { a: { b: 2 } },
  { a: { b: '2' } },
);
// AssertionError
```

[对象包装器]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures#primitive_values
[Object.prototype.toString()]: https://tc39.github.io/ecma262/#sec-object.prototype.tostring
[`!=` operator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Inequality
[`===` operator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality
[`==` operator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality
[`AssertionError`]: #class-assertassertionerror
[`Class`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
[`ERR_INVALID_RETURN_VALUE`]: errors.md#err_invalid_return_value
[`Object.is()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
[`assert.deepEqual()`]: #assertdeepequalactual-expected-message
[`assert.deepStrictEqual()`]: #assertdeepstrictequalactual-expected-message
[`assert.doesNotThrow()`]: #assertdoesnotthrowfn-error-message
[`assert.equal()`]: #assertequalactual-expected-message
[`assert.notDeepEqual()`]: #assertnotdeepequalactual-expected-message
[`assert.notDeepStrictEqual()`]: #assertnotdeepstrictequalactual-expected-message
[`assert.notEqual()`]: #assertnotequalactual-expected-message
[`assert.notStrictEqual()`]: #assertnotstrictequalactual-expected-message
[`assert.ok()`]: #assertokvalue-message
[`assert.strictEqual()`]: #assertstrictequalactual-expected-message
[`assert.throws()`]: #assertthrowsfn-error-message
[`getColorDepth()`]: tty.md#writestreamgetcolordepthenv
[`util.format()`]: util.md#utilformatformat-args
[可枚举 "自有" 属性]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Enumerability_and_ownership_of_properties
[prototype-spec]: https://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots
