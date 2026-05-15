# 使用全局符号

ES6 引入了一种新类型：`Symbol`。这种新类型是 _不可变_ 的，且
它经常用于元编程，因为它可以像字符串一样用作
属性键。符号分为两种类型：本地符号和全局符号。
对象中以 Symbol 为键的属性不会包含在
`JSON.stringify()` 的输出中，但 `util.inspect()` 函数默认会
包含它们。

在 <https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Symbol> 了解更多关于符号的信息。

## `Symbol(string)`

通过 `Symbol(string)` 创建的符号仅对调用者函数局部可见。
因此，我们经常用它们来模拟私有字段，例如：

```js
const kField = Symbol('kField');

console.log(kField === Symbol('kField')); // false

class MyObject {
  constructor() {
    this[kField] = 'something';
  }
}

module.exports.MyObject = MyObject;
```

符号并不是完全私有的，因为数据仍然可以被访问：

```js
for (const s of Object.getOwnPropertySymbols(obj)) {
  const desc = s.toString().replace(/Symbol\((.*)\)$/, '$1');
  if (desc === 'kField') {
    console.log(obj[s]); // 'something'
  }
}
```

本地符号会让开发者更难进行 monkey patch/访问
私有字段，因为与前缀为 `_` 的属性相比，它们需要更多工作。对未被设计为
可 monkey patch 的私有 API 进行 monkey patch，会让维护和演进 Node.js 更加困难，因为私有
属性没有文档说明，并且可能在补丁版本中发生变化。
生态系统中一些极其流行的模块会 monkey patch 某些
内部实现，这使得我们无法在不影响大量用户的情况下更新和改进这些
区域。

## `Symbol.for(string)`

使用 `Symbol.for(string)` 创建的符号是全局的，并且在
相同的 V8 Isolate 中唯一。首次调用 `Symbol.for(string)` 时，会将一个符号
存储到全局注册表中，并可在每次调用
`Symbol.for(string)` 时轻松检索。然而，当两个模块
作者出于不同原因使用同一个符号时，这可能会导致问题。

```js
const s = Symbol.for('hello');
console.log(s === Symbol.for('hello')); // true
```

在 Node.js 运行时中，我们会为所有全局符号添加 `nodejs.` 前缀，
例如：`Symbol.for('nodejs.hello')`。

当需要一个面向开发者的接口来允许自定义行为时，应优先使用全局符号，也就是
元编程。
