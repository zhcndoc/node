# 使用 internal/errors.js 模块

## 什么是 internal/errors.js

`require('internal/errors')` 模块是一个仅供内部使用的模块，可用于生成 `Error`、`TypeError` 和 `RangeError` 实例，这些实例使用静态、永久性的错误代码，以及一个可选的参数化消息。

该模块的目的是允许 Node.js 提供的错误拥有一个永久标识符。如果没有永久标识符，用户代码可能需要检查错误消息来区分不同错误。这样做的一个不幸结果是，对错误消息的更改会导致生态系统中的代码损坏。因此，Node.js 一直将错误消息变更视为破坏性变更。通过为特定错误提供永久标识符，我们减少了用户代码检查错误消息的必要性。

将现有错误切换为使用 `internal/errors` 模块必须被视为一次 `semver-major` 变更。

## 使用 internal/errors.js

`internal/errors` 模块将所有自定义错误作为内置错误的子类导出。添加后，可以在 `codes` 对象中找到某个错误。

例如，一个现有的 `Error`，如：

```js
const err = new TypeError(`Expected string received ${type}`);
```

可以通过先在 `internal/errors.js` 文件中添加一个新的错误键来替换：

```js
E('FOO', 'Expected string received %s', TypeError);
```

然后在代码中替换现有的 `new TypeError`：

```js
const { FOO } = require('internal/errors').codes;
// ...
const err = new FOO(type);
```

## 添加新错误

新的静态错误代码通过修改 `internal/errors.js` 文件，并使用工具方法 `E()` 将新的错误代码追加到末尾来添加。

```js
E('EXAMPLE_KEY1', 'This is the error value', TypeError);
E('EXAMPLE_KEY2', (a, b) => `${a} ${b}`, RangeError);
```

传递给 `E()` 的第一个参数是静态标识符。第二个参数可以是一个带有可选 `util.format()` 风格替换标记（例如 `%s`、`%d`）的字符串，或者是一个返回字符串的函数。传递给 `errors.message()` 函数的可选额外参数（该函数被 `errors.Error`、`errors.TypeError` 和 `errors.RangeError` 类使用）将用于格式化错误消息。第三个参数是新错误将继承的基类。

通过提供额外参数，可以创建多个派生类。其他类将作为主类的属性暴露出来：

<!-- eslint-disable no-unreachable -->

```js
E('EXAMPLE_KEY', 'Error message', TypeError, RangeError);

// In another module
const { EXAMPLE_KEY } = require('internal/errors').codes;
// TypeError
throw new EXAMPLE_KEY();
// RangeError
throw new EXAMPLE_KEY.RangeError();
```

## 记录新错误

每当添加并使用新的静态错误代码时，都应该在 `doc/api/errors.md` 文件中添加相应的错误代码文档。这样用户就能方便地查找各个错误代码的含义。

如果 `make lint` 未能检测到新增到 `errors.md` 中的新错误代码，则必须使用 `make lint-md-clean` 清理 markdown lint 缓存。

## 测试新错误

在添加新错误时，可能还需要为错误消息格式化添加相应的测试。如果错误消息是常量字符串，则无需为错误消息格式化编写测试，因为我们可以信任错误辅助实现。此类错误的一个示例是：

```js
E('ERR_SOCKET_ALREADY_BOUND', 'Socket is already bound');
```

如果错误消息不是常量字符串，则应在 `test/parallel/test-internal-errors.js` 中添加测试，以验证基于创建错误时所用参数的消息格式化。这些测试应验证生成最终消息字符串时参数可用的所有不同方式。一个简单示例如下：

```js
// 测试 ERR_TLS_CERT_ALTNAME_INVALID
assert.strictEqual(
  errors.message('ERR_TLS_CERT_ALTNAME_INVALID', ['altname']),
  'Hostname/IP does not match certificate\'s altnames: altname');
```

此外，还应有测试来验证错误在代码库中使用位置上的行为。如果错误消息是静态的，这些测试应只验证收到了预期的代码，而不应验证消息内容。这样可以减少当错误消息变化时所需的测试修改量。

```js
assert.throws(() => {
  socket.bind();
}, common.expectsError({
  code: 'ERR_SOCKET_ALREADY_BOUND',
  type: Error,
}));
```

避免在错误创建后更改消息格式。如果出于某种原因确实有必要这样做，那么很可能还需要额外的测试来验证这些情况下错误消息的格式化。

## API

### 对象：errors.codes

暴露所有供 Node.js API 使用的内部错误类。

### 方法：errors.message(key, args)

* `key` {string} 静态错误标识符
* `args` {Array} 作为数组传入的零个或多个可选参数
* 返回：{string}

返回给定 `key` 对应的格式化错误消息字符串。
