# SQLite

<!--introduced_in=v22.5.0-->

<!-- YAML
added: v22.5.0
changes:
  - version: v25.7.0
    pr-url: https://github.com/nodejs/node/pull/61262
    description: SQLite 现在是发布候选版本。
  - version:
    - v23.4.0
    - v22.13.0
    pr-url: https://github.com/nodejs/node/pull/55890
    description: SQLite 不再位于 `--experimental-sqlite` 之后，但仍为实验性。
-->

> 稳定性：1.2 - 发布候选版本。

<!-- source_link=lib/sqlite.js -->

`node:sqlite` 模块用于方便地操作 SQLite 数据库。
要访问它：

```mjs
import sqlite from 'node:sqlite';
```

```cjs
const sqlite = require('node:sqlite');
```

此模块仅在 `node:` 方案下可用。

以下示例展示了 `node:sqlite` 模块的基本用法，用于打开
一个内存数据库，向数据库写入数据，然后读回数据。

```mjs
import { DatabaseSync } from 'node:sqlite';
const database = new DatabaseSync(':memory:');

// 从字符串执行 SQL 语句。
database.exec(`
  CREATE TABLE data(
    key INTEGER PRIMARY KEY,
    value TEXT
  ) STRICT
`);
// 创建一个预准备语句以将数据插入数据库。
const insert = database.prepare('INSERT INTO data (key, value) VALUES (?, ?)');
// 执行绑定了值的预准备语句。
insert.run(1, 'hello');
insert.run(2, 'world');
// 创建一个预准备语句以从数据库读取数据。
const query = database.prepare('SELECT * FROM data ORDER BY key');
// 执行预准备语句并记录结果集。
console.log(query.all());
// 输出：[ { key: 1, value: 'hello' }, { key: 2, value: 'world' } ]
```

```cjs
'use strict';
const { DatabaseSync } = require('node:sqlite');
const database = new DatabaseSync(':memory:');

// 从字符串执行 SQL 语句。
database.exec(`
  CREATE TABLE data(
    key INTEGER PRIMARY KEY,
    value TEXT
  ) STRICT
`);
// 创建一个预准备语句以将数据插入数据库。
const insert = database.prepare('INSERT INTO data (key, value) VALUES (?, ?)');
// 执行绑定了值的预准备语句。
insert.run(1, 'hello');
insert.run(2, 'world');
// 创建一个预准备语句以从数据库读取数据。
const query = database.prepare('SELECT * FROM data ORDER BY key');
// 执行预准备语句并记录结果集。
console.log(query.all());
// 输出：[ { key: 1, value: 'hello' }, { key: 2, value: 'world' } ]
```

## JavaScript 和 SQLite 之间的类型转换

当 Node.js 写入或读取 SQLite 时，需要在
JavaScript 数据类型和 SQLite 的 [数据类型][] 之间进行转换。因为 JavaScript 支持
比 SQLite 更多的数据类型，所以只支持 JavaScript 类型的子集。
尝试将不支持的数据类型写入 SQLite 将导致
异常。

| 存储类 | JavaScript 到 SQLite | SQLite 到 JavaScript |
| ------------- | -------------------------- | ------------------------------------- |
| `NULL` | {null} | {null} |
| `INTEGER` | {number} 或 {bigint} | {number} 或 {bigint} _（可配置）_ |
| `REAL` | {number} | {number} |
| `TEXT` | {string} | {string} |
| `BLOB` | {TypedArray} 或 {DataView} | {Uint8Array} |

从 SQLite 读取值的 API 有一个配置选项，用于确定
`INTEGER` 值在 JavaScript 中是转换为 `number` 还是 `bigint`，
例如语句的 `readBigInts` 选项和用户定义函数的 `useBigIntArguments`
选项。如果 Node.js 从 SQLite 读取的 `INTEGER` 值超出 JavaScript [安全整数][] 范围，且未启用读取 BigInt 的选项，则将抛出 `ERR_OUT_OF_RANGE` 错误。

## 类：`DatabaseSync`

<!-- YAML
added: v22.5.0
changes:
  - version:
    - v24.0.0
    - v22.16.0
    pr-url: https://github.com/nodejs/node/pull/57752
    description: 添加 `timeout` 选项。
  - version:
    - v23.10.0
    - v22.15.0
    pr-url: https://github.com/nodejs/node/pull/56991
    description: `path` 参数现在支持 Buffer 和 URL 对象。
-->

此类表示到 SQLite 数据库的单个 [连接][]。此类暴露的所有 API
均同步执行。

### `new DatabaseSync(path[, options])`

<!-- YAML
added: v22.5.0
changes:
  - version:
     - v25.5.0
     - v24.14.0
    pr-url: https://github.com/nodejs/node/pull/61266
    description: 默认启用 `defensive`。
  - version:
      - v25.1.0
      - v24.12.0
    pr-url: https://github.com/nodejs/node/pull/60217
    description: 添加 `defensive` 选项。
  - version:
      - v24.4.0
      - v22.18.0
    pr-url: https://github.com/nodejs/node/pull/58697
    description: 添加新的 SQLite 数据库选项。
-->

* `path` {string | Buffer | URL} 数据库的路径。SQLite 数据库可以
  存储在文件中或完全 [在内存中][]。要使用基于文件的数据库，
  路径应为文件路径。要使用内存数据库，路径
  应为特殊名称 `':memory:'`。
* `options` {Object} 数据库连接的配置选项。支持
  以下选项：
  * `open` {boolean} 如果为 `true`，数据库由构造函数打开。当
    此值为 `false` 时，必须通过 `open()` 方法打开数据库。
    **默认：** `true`。
  * `readOnly` {boolean} 如果为 `true`，数据库以只读模式打开。
    如果数据库不存在，打开它将失败。**默认：** `false`。
  * `enableForeignKeyConstraints` {boolean} 如果为 `true`，则启用外键约束。
    推荐使用，但为了与旧数据库模式兼容可以禁用。外键约束的执行可以在
    打开数据库后使用 [`PRAGMA foreign_keys`][] 启用和禁用。**默认：** `true`。
  * `enableDoubleQuotedStringLiterals` {boolean} 如果为 `true`，SQLite 将接受
    [双引号字符串字面量][]。不推荐使用，但为了与旧数据库模式兼容可以
    启用。**默认：** `false`。
  * `allowExtension` {boolean} 如果为 `true`，则启用 `loadExtension` SQL 函数
    和 `loadExtension()` 方法。
    你可以稍后调用 `enableLoadExtension(false)` 来禁用此功能。
    **默认：** `false`。
  * `timeout` {number} [繁忙超时][]（毫秒）。这是
    SQLite 在返回错误之前等待数据库锁释放的最大时间量。**默认：** `0`。
  * `readBigInts` {boolean} 如果为 `true`，整数字段作为 JavaScript `BigInt` 值读取。如果为 `false`，
    整数字段作为 JavaScript 数字读取。**默认：** `false`。
  * `returnArrays` {boolean} 如果为 `true`，查询结果作为数组返回而不是对象。
    **默认：** `false`。
  * `allowBareNamedParameters` {boolean} 如果为 `true`，允许绑定不带前缀
    字符的命名参数（例如，`foo` 而不是 `:foo`）。**默认：** `true`。
  * `allowUnknownNamedParameters` {boolean} 如果为 `true`，绑定时忽略未知的命名参数。
    如果为 `false`，则对未知的命名参数抛出异常。**默认：** `false`。
  * `defensive` {boolean} 如果为 `true`，则启用防御标志。当启用防御标志时，
    允许普通 SQL 故意破坏数据库文件的语言功能将被禁用。
    防御标志也可以使用 `enableDefensive()` 设置。
    **默认：** `true`。
  * `limits` {Object} 各种 SQLite 限制的配置。这些限制
    可用于在处理潜在恶意输入时防止过度消耗资源。详见 SQLite 文档中的 [运行时限制][] 和 [限制常量][]。默认值由
    SQLite 的编译时默认值确定，并可能因 SQLite 的构建方式而异。支持以下属性：
    * `length` {number} 字符串或 BLOB 的最大长度。
    * `sqlLength` {number} SQL 语句的最大长度。
    * `column` {number} 最大列数。
    * `exprDepth` {number} 表达式树的最大深度。
    * `compoundSelect` {number} 复合 SELECT 中的最大项数。
    * `vdbeOp` {number} VDBE 指令的最大数量。
    * `functionArg` {number} 函数参数的最大数量。
    * `attach` {number} 附加数据库的最大数量。
    * `likePatternLength` {number} LIKE 模式的最大长度。
    * `variableNumber` {number} SQL 变量的最大数量。
    * `triggerDepth` {number} 触发器递归的最大深度。

构造一个新的 `DatabaseSync` 实例。

### `database.aggregate(name, options)`

<!-- YAML
added:
 - v24.0.0
 - v22.16.0
-->

向 SQLite 数据库注册一个新的聚合函数。此方法是
[`sqlite3_create_window_function()`][] 的包装器。

* `name` {string} 要创建的 SQLite 函数的名称。
* `options` {Object} 函数配置设置。
  * `deterministic` {boolean} 如果为 `true`，则在创建的函数上设置 [`SQLITE_DETERMINISTIC`][] 标志。**默认：** `false`。
  * `directOnly` {boolean} 如果为 `true`，则在创建的函数上设置 [`SQLITE_DIRECTONLY`][] 标志。**默认：** `false`。
  * `useBigIntArguments` {boolean} 如果为 `true`，`options.step` 和 `options.inverse` 的整数参数
    转换为 `BigInt`。如果为 `false`，整数参数作为
    JavaScript 数字传递。**默认：** `false`。
  * `varargs` {boolean} 如果为 `true`，`options.step` 和 `options.inverse` 可以使用任意数量的
    参数调用（介于零和 [`SQLITE_MAX_FUNCTION_ARG`][] 之间）。如果为 `false`，
    `inverse` 和 `step` 必须使用恰好 `length` 个参数调用。
    **默认：** `false`。
  * `start` {number | string | null | Array | Object | Function} 聚合函数的身份
    值。当聚合函数初始化时使用此值。当传递 {Function} 时，身份值将是其返回值。
  * `step` {Function} 为聚合中的每一行调用的函数。该
    函数接收当前状态和行值。此函数的返回值应为新状态。
  * `result` {Function} 调用以获取聚合结果的函数。该函数接收最终状态并应返回聚合的
    结果。
  * `inverse` {Function} 当提供此函数时，`aggregate` 方法将作为窗口函数工作。
    该函数接收当前状态和丢弃的行值。此函数的返回值应为
    新状态。

当用作窗口函数时，`result` 函数将被调用多次。

```cjs
const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync(':memory:');
db.exec(`
  CREATE TABLE t3(x, y);
  INSERT INTO t3 VALUES ('a', 4),
                        ('b', 5),
                        ('c', 3),
                        ('d', 8),
                        ('e', 1);
`);

db.aggregate('sumint', {
  start: 0,
  step: (acc, value) => acc + value,
});

db.prepare('SELECT sumint(y) as total FROM t3').get(); // { total: 21 }
```

```mjs
import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync(':memory:');
db.exec(`
  CREATE TABLE t3(x, y);
  INSERT INTO t3 VALUES ('a', 4),
                        ('b', 5),
                        ('c', 3),
                        ('d', 8),
                        ('e', 1);
`);

db.aggregate('sumint', {
  start: 0,
  step: (acc, value) => acc + value,
});

db.prepare('SELECT sumint(y) as total FROM t3').get(); // { total: 21 }
```

### `database.close()`

<!-- YAML
added: v22.5.0
-->

关闭数据库连接。如果数据库未
打开，则抛出异常。此方法是 [`sqlite3_close_v2()`][] 的包装器。

### `database.loadExtension(path)`

<!-- YAML
added:
  - v23.5.0
  - v22.13.0
-->

* `path` {string} 要加载的共享库的路径。

将共享库加载到数据库连接中。此方法是
[`sqlite3_load_extension()`][] 的包装器。构造 `DatabaseSync` 实例时需要启用
`allowExtension` 选项。

### `database.enableLoadExtension(allow)`

<!-- YAML
added:
  - v23.5.0
  - v22.13.0
-->

* `allow` {boolean} 是否允许加载扩展。

启用或禁用 `loadExtension` SQL 函数和 `loadExtension()`
方法。当构造时 `allowExtension` 为 `false` 时，出于安全原因无法启用
加载扩展。

### `database.enableDefensive(active)`

<!-- YAML
added:
  - v25.1.0
  - v24.12.0
-->

* `active` {boolean} 是否设置防御标志。

启用或禁用防御标志。当防御标志激活时，
允许普通 SQL 故意破坏数据库文件的语言功能将被禁用。
详见 SQLite 文档中的 [`SQLITE_DBCONFIG_DEFENSIVE`][]。

### `database.location([dbName])`

<!-- YAML
added:
  - v24.0.0
  - v22.16.0
-->

* `dbName` {string} 数据库名称。这可以是 `'main'`（默认主数据库）或任何已通过 [`ATTACH DATABASE`][] 添加的其他数据库。**默认：** `'main'`。
* 返回值：{string | null} 数据库文件的位置。当使用内存数据库时，
  此方法返回 null。

此方法是 [`sqlite3_db_filename()`][] 的包装器。

### `database.exec(sql)`

<!-- YAML
added: v22.5.0
-->

* `sql` {string} 要执行的 SQL 字符串。

此方法允许执行一个或多个 SQL 语句而不返回
任何结果。当执行从文件读取的 SQL 语句时，此方法很有用。此方法是 [`sqlite3_exec()`][] 的包装器。

### `database.function(name[, options], fn)`

<!-- YAML
added:
  - v23.5.0
  - v22.13.0
-->

* `name` {string} 要创建的 SQLite 函数的名称。
* `options` {Object} 函数的可选配置设置。支持
  以下属性：
  * `deterministic` {boolean} 如果为 `true`，则在创建的函数上设置 [`SQLITE_DETERMINISTIC`][] 标志。**默认：** `false`。
  * `directOnly` {boolean} 如果为 `true`，则在创建的函数上设置 [`SQLITE_DIRECTONLY`][] 标志。**默认：** `false`。
  * `useBigIntArguments` {boolean} 如果为 `true`，`function` 的整数参数
    转换为 `BigInt`。如果为 `false`，整数参数作为
    JavaScript 数字传递。**默认：** `false`。
  * `varargs` {boolean} 如果为 `true`，`function` 可以使用任意数量的
    参数调用（介于零和 [`SQLITE_MAX_FUNCTION_ARG`][] 之间）。如果为 `false`，
    `function` 必须使用恰好 `function.length` 个参数调用。
    **默认：** `false`。
* `fn` {Function} 当调用 SQLite 函数时要调用的 JavaScript 函数。
  此函数的返回值应为有效的 SQLite 数据类型：
  详见 [JavaScript 和 SQLite 之间的类型转换][]。如果返回值为 `undefined`，则结果默认为
  `NULL`。

此方法用于创建 SQLite 用户定义函数。此方法是
[`sqlite3_create_function_v2()`][] 的包装器。

### `database.setAuthorizer(callback)`

<!-- YAML
added: v24.10.0
-->

* `callback` {Function|null} 要设置的授权器函数，或 `null` 以
  清除当前授权器。

设置一个授权器回调，每当 SQLite 尝试通过预准备语句
访问数据或修改数据库模式时，将调用该回调。
这可用于实施安全策略、审计访问或限制某些操作。
此方法是 [`sqlite3_set_authorizer()`][] 的包装器。

调用时，回调接收五个参数：

* `actionCode` {number} 正在执行的操作类型（例如，
  `SQLITE_INSERT`、`SQLITE_UPDATE`、`SQLITE_SELECT`）。
* `arg1` {string|null} 第一个参数（取决于上下文，通常是表名）。
* `arg2` {string|null} 第二个参数（取决于上下文，通常是列名）。
* `dbName` {string|null} 数据库名称。
* `triggerOrView` {string|null} 导致访问的触发器或视图的名称。

回调必须返回以下常量之一：

* `SQLITE_OK` - 允许操作。
* `SQLITE_DENY` - 拒绝操作（导致错误）。
* `SQLITE_IGNORE` - 忽略操作（静默跳过）。

```cjs
const { DatabaseSync, constants } = require('node:sqlite');
const db = new DatabaseSync(':memory:');

// 设置一个拒绝所有表创建的授权器
db.setAuthorizer((actionCode) => {
  if (actionCode === constants.SQLITE_CREATE_TABLE) {
    return constants.SQLITE_DENY;
  }
  return constants.SQLITE_OK;
});

// 这将正常工作
db.prepare('SELECT 1').get();

// 由于授权拒绝，这将抛出错误
try {
  db.exec('CREATE TABLE blocked (id INTEGER)');
} catch (err) {
  console.log('Operation blocked:', err.message);
}
```

```mjs
import { DatabaseSync, constants } from 'node:sqlite';
const db = new DatabaseSync(':memory:');

// 设置一个拒绝所有表创建的授权器
db.setAuthorizer((actionCode) => {
  if (actionCode === constants.SQLITE_CREATE_TABLE) {
    return constants.SQLITE_DENY;
  }
  return constants.SQLITE_OK;
});

// 这将正常工作
db.prepare('SELECT 1').get();

// 由于授权拒绝，这将抛出错误
try {
  db.exec('CREATE TABLE blocked (id INTEGER)');
} catch (err) {
  console.log('Operation blocked:', err.message);
}
```

### `database.isOpen`

<!-- YAML
added:
  - v23.11.0
  - v22.15.0
-->

* 类型：{boolean} 数据库当前是否打开。

### `database.isTransaction`

<!-- YAML
added:
  - v24.0.0
  - v22.16.0
-->

* 类型：{boolean} 数据库当前是否在事务中。此方法
  是 [`sqlite3_get_autocommit()`][] 的包装器。

### `database.limits`

<!-- YAML
added: v25.8.0
-->

* 类型：{Object}

一个用于在运行时获取和设置 SQLite 数据库限制的对象。
每个属性对应一个 SQLite 限制，可以读取或写入。

```js
const db = new DatabaseSync(':memory:');

// 读取当前限制
console.log(db.limits.length);

// 设置新限制
db.limits.sqlLength = 100000;

// 将限制重置为其编译时最大值
db.limits.sqlLength = Infinity;
```

可用属性：`length`、`sqlLength`、`column`、`exprDepth`、
`compoundSelect`、`vdbeOp`、`functionArg`、`attach`、`likePatternLength`、
`variableNumber`、`triggerDepth`。

将属性设置为 `Infinity` 会将限制重置为其编译时最大值。

### `database.open()`

<!-- YAML
added: v22.5.0
-->

打开 `DatabaseSync` 构造函数的 `path` 参数中指定的数据库。
此方法仅应在数据库未通过构造函数打开时使用。如果数据库已打开，则抛出异常。

### `database.prepare(sql[, options])`

<!-- YAML
added: v22.5.0
-->

* `sql` {string} 要编译为预准备语句的 SQL 字符串。
* `options` {Object} 预准备语句的可选配置。
  * `readBigInts` {boolean} 如果为 `true`，整数字段作为 `BigInt` 读取。
    **默认：** 继承自数据库选项或 `false`。
  * `returnArrays` {boolean} 如果为 `true`，结果作为数组返回。
    **默认：** 继承自数据库选项或 `false`。
  * `allowBareNamedParameters` {boolean} 如果为 `true`，允许绑定不带前缀字符的命名
    参数。**默认：** 继承自数据库选项或 `true`。
  * `allowUnknownNamedParameters` {boolean} 如果为 `true`，忽略未知的命名参数。
    **默认：** 继承自数据库选项或 `false`。
* 返回值：{StatementSync} 预准备语句。

将 SQL 语句编译为 [预准备语句][]。此方法是
[`sqlite3_prepare_v2()`][] 的包装器。

### `database.createTagStore([maxSize])`

<!-- YAML
added: v24.9.0
-->

* `maxSize` {integer} 要缓存的预准备语句的最大数量。
  **默认：** `1000`。
* 返回值：{SQLTagStore} 一个用于缓存预准备语句的新 SQL 标签存储。

创建一个新的 [`SQLTagStore`][]，它是一个最近最少使用 (LRU) 缓存，
用于存储预准备语句。这允许通过为预准备语句标记唯一标识符来高效地重用它们。

当执行标记的 SQL 字面量时，`SQLTagStore` 检查缓存中是否已存在
相应 SQL 查询字符串的预准备语句。如果存在，则使用缓存的语句。如果不存在，则创建
一个新的预准备语句，执行它，然后存储在缓存中供将来使用。此机制
有助于避免重复解析和准备相同 SQL 语句的开销。

标记语句将模板字面量中的占位符值绑定为
底层预准备语句的参数。例如：

```js
sqlTagStore.get`SELECT ${value}`;
```

等价于：

```js
db.prepare('SELECT ?').get(value);
```

但是，在第一个示例中，标签存储将缓存底层预准备
语句供将来使用。

> **注意：** 标记语句中的 `${value}` 语法将参数 _绑定_ 到
> 预准备语句。这与 _未标记_ 模板字面量中的行为不同，后者执行字符串插值。
>
> ```js
> // 这是一个将参数绑定到标记语句的安全示例。
> sqlTagStore.run`INSERT INTO t1 (id) VALUES (${id})`;
>
> // 这是一个未标记模板字符串的 *不安全* 示例。
> // `id` 作为字符串插值到查询文本中。
> // 这可能导致 SQL 注入和数据损坏。
> db.run(`INSERT INTO t1 (id) VALUES (${id})`);
> ```

如果查询字符串（包括任何绑定占位符的位置）相同，则标签存储将从缓存中匹配语句。

```js
// 以下语句将在缓存中匹配：
sqlTagStore.get`SELECT * FROM t1 WHERE id = ${id} AND active = 1`;
sqlTagStore.get`SELECT * FROM t1 WHERE id = ${12345} AND active = 1`;

// 以下语句将不匹配，因为查询字符串
// 和绑定的占位符不同：
sqlTagStore.get`SELECT * FROM t1 WHERE id = ${id} AND active = 1`;
sqlTagStore.get`SELECT * FROM t1 WHERE id = 12345 AND active = 1`;

// 以下语句将不匹配，因为匹配是区分大小写的：
sqlTagStore.get`SELECT * FROM t1 WHERE id = ${id} AND active = 1`;
sqlTagStore.get`select * from t1 where id = ${id} and active = 1`;
```

在标记语句中绑定参数的唯一方法是使用 `${value}`
语法。不要将参数绑定占位符（`?` 等）添加到 SQL 查询
字符串本身。

```mjs
import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync(':memory:');
const sql = db.createTagStore();

db.exec('CREATE TABLE users (id INT, name TEXT)');

// 使用 'run' 方法插入数据。
// 标记字面量用于标识预准备语句。
sql.run`INSERT INTO users VALUES (1, 'Alice')`;
sql.run`INSERT INTO users VALUES (2, 'Bob')`;

// 使用 'get' 方法检索单行。
const name = 'Alice';
const user = sql.get`SELECT * FROM users WHERE name = ${name}`;
console.log(user); // { id: 1, name: 'Alice' }

// 使用 'all' 方法检索所有行。
const allUsers = sql.all`SELECT * FROM users ORDER BY id`;
console.log(allUsers);
// [
//   { id: 1, name: 'Alice' },
//   { id: 2, name: 'Bob' }
// ]
```

```cjs
const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync(':memory:');
const sql = db.createTagStore();

db.exec('CREATE TABLE users (id INT, name TEXT)');

// 使用 'run' 方法插入数据。
// 标记字面量用于标识预准备语句。
sql.run`INSERT INTO users VALUES (1, 'Alice')`;
sql.run`INSERT INTO users VALUES (2, 'Bob')`;

// 使用 'get' 方法检索单行。
const name = 'Alice';
const user = sql.get`SELECT * FROM users WHERE name = ${name}`;
console.log(user); // { id: 1, name: 'Alice' }

// 使用 'all' 方法检索所有行。
const allUsers = sql.all`SELECT * FROM users ORDER BY id`;
console.log(allUsers);
// [
//   { id: 1, name: 'Alice' },
//   { id: 2, name: 'Bob' }
// ]
```

### `database.createSession([options])`

<!-- YAML
added:
  - v23.3.0
  - v22.12.0
-->

* `options` {Object} 会话的配置选项。
  * `table` {string} 要跟踪更改的特定表。默认情况下，跟踪所有表的更改。
  * `db` {string} 要跟踪的数据库名称。当使用 [`ATTACH DATABASE`][] 添加了多个数据库时，这很有用。**默认**：`'main'`。
* 返回值：{Session} 会话句柄。

创建并将会话附加到数据库。此方法是 [`sqlite3session_create()`][] 和 [`sqlite3session_attach()`][] 的包装器。

### `database.applyChangeset(changeset[, options])`

<!-- YAML
added:
  - v23.3.0
  - v22.12.0
-->

* `changeset` {Uint8Array} 二进制变更集或补丁集。
* `options` {Object} 如何应用更改的配置选项。
  * `filter` {Function} 跳过那些当目标表名提供给此函数时返回真值的更改。
    默认情况下，尝试所有更改。
  * `onConflict` {Function} 一个确定如何处理冲突的函数。该函数接收一个参数，
    该参数可以是以下值之一：

    * `SQLITE_CHANGESET_DATA`：`DELETE` 或 `UPDATE` 更改不包含预期的 "之前" 值。
    * `SQLITE_CHANGESET_NOTFOUND`：不存在与 `DELETE` 或 `UPDATE` 更改的主键匹配的行。
    * `SQLITE_CHANGESET_CONFLICT`：`INSERT` 更改导致主键重复。
    * `SQLITE_CHANGESET_FOREIGN_KEY`：应用更改将导致外键违规。
    * `SQLITE_CHANGESET_CONSTRAINT`：应用更改将导致 `UNIQUE`、`CHECK` 或 `NOT NULL` 约束
      违规。

    该函数应返回以下值之一：

    * `SQLITE_CHANGESET_OMIT`：省略冲突的更改。
    * `SQLITE_CHANGESET_REPLACE`：用冲突的更改替换现有值（仅对
      `SQLITE_CHANGESET_DATA` 或 `SQLITE_CHANGESET_CONFLICT` 冲突有效）。
    * `SQLITE_CHANGESET_ABORT`：冲突时中止并回滚数据库。

    当冲突处理程序中抛出错误或处理程序返回任何其他值时，
    应用变更集将中止并回滚数据库。

    **默认**：返回 `SQLITE_CHANGESET_ABORT` 的函数。
* 返回值：{boolean} 变更集是否成功应用而未被中止。

如果数据库未
打开，则抛出异常。此方法是 [`sqlite3changeset_apply()`][] 的包装器。

```mjs
import { DatabaseSync } from 'node:sqlite';

const sourceDb = new DatabaseSync(':memory:');
const targetDb = new DatabaseSync(':memory:');

sourceDb.exec('CREATE TABLE data(key INTEGER PRIMARY KEY, value TEXT)');
targetDb.exec('CREATE TABLE data(key INTEGER PRIMARY KEY, value TEXT)');

const session = sourceDb.createSession();

const insert = sourceDb.prepare('INSERT INTO data (key, value) VALUES (?, ?)');
insert.run(1, 'hello');
insert.run(2, 'world');

const changeset = session.changeset();
targetDb.applyChangeset(changeset);
// 现在已应用变更集，targetDb 包含与 sourceDb 相同的数据。
```

```cjs
const { DatabaseSync } = require('node:sqlite');

const sourceDb = new DatabaseSync(':memory:');
const targetDb = new DatabaseSync(':memory:');

sourceDb.exec('CREATE TABLE data(key INTEGER PRIMARY KEY, value TEXT)');
targetDb.exec('CREATE TABLE data(key INTEGER PRIMARY KEY, value TEXT)');

const session = sourceDb.createSession();

const insert = sourceDb.prepare('INSERT INTO data (key, value) VALUES (?, ?)');
insert.run(1, 'hello');
insert.run(2, 'world');

const changeset = session.changeset();
targetDb.applyChangeset(changeset);
// 现在已应用变更集，targetDb 包含与 sourceDb 相同的数据。
```

### `database[Symbol.dispose]()`

<!-- YAML
added:
  - v23.11.0
  - v22.15.0
changes:
 - version: v24.2.0
   pr-url: https://github.com/nodejs/node/pull/58467
   description: 不再是实验性的。
-->

关闭数据库连接。如果数据库连接已关闭，
则此操作为空操作。

## 类：`Session`

<!-- YAML
added:
  - v23.3.0
  - v22.12.0
-->

### `session.changeset()`

<!-- YAML
added:
  - v23.3.0
  - v22.12.0
-->

* 返回值：{Uint8Array} 可应用于其他数据库的二进制变更集。

检索自变更集创建以来包含所有变更的变更集。可以被多次调用。
如果数据库或会话未打开，则抛出异常。此方法是对 [`sqlite3session_changeset()`][] 的封装。

### `session.patchset()`

<!-- YAML
added:
  - v23.3.0
  - v22.12.0
-->

* 返回值：{Uint8Array} 可应用于其他数据库的二进制补丁集。

与上述方法类似，但生成更紧凑的补丁集。请参阅 SQLite 文档中的 [变更集和补丁集][]
。如果数据库或会话未打开，则抛出异常。此方法是
对 [`sqlite3session_patchset()`][] 的封装。

### `session.close()`

关闭会话。如果数据库或会话未打开，则抛出异常。此方法是
对 [`sqlite3session_delete()`][] 的封装。

### `session[Symbol.dispose]()`

<!-- YAML
added: v24.9.0
-->

关闭会话。如果会话已关闭，则不执行任何操作。

## 类：`StatementSync`

<!-- YAML
added: v22.5.0
-->

此类表示单个 [预准备语句][]。此类不能
通过其构造函数实例化。相反，实例是通过
`database.prepare()` 方法创建的。此类暴露的所有 API 均执行
同步。

预准备语句是用于创建它的 SQL 的高效二进制表示。预准备语句是可参数化的，
并且可以使用不同的绑定值多次调用。参数还提供针对
[SQL 注入][] 攻击的保护。出于这些原因，在处理用户输入时，预准备语句优于
手工编写的 SQL 字符串。

### `statement.all([namedParameters][, ...anonymousParameters])`

<!-- YAML
added: v22.5.0
changes:
  - version:
    - v23.7.0
    - v22.14.0
    pr-url: https://github.com/nodejs/node/pull/56385
    description: 为 `anonymousParameters` 添加对 `DataView` 和类型化数组对象的支持。
-->

* `namedParameters` {Object} 一个用于绑定命名参数的可选对象。
  此对象的键用于配置映射。
* `...anonymousParameters` {null|number|bigint|string|Buffer|TypedArray|DataView} 零或
  多个绑定到匿名参数的值。
* 返回值：{Array} 对象数组。每个对象对应于执行预准备语句返回的一行
  数据。每个对象的键和值对应于行的列名和值。

此方法执行预准备语句并将所有结果作为对象数组返回。如果预准备语句
不返回任何结果，此方法返回一个空数组。预准备语句 [参数被绑定][] 使用
`namedParameters` 和 `anonymousParameters` 中的值。

### `statement.columns()`

<!-- YAML
added:
  - v23.11.0
  - v22.16.0
-->

* 返回值：{Array} 对象数组。每个对象对应于预准备语句中的一列，
  并包含以下属性：

  * `column` {string|null} 源表中列的未别名化名称，
    如果列是表达式或子查询的结果，则为 `null`。此属性是
    [`sqlite3_column_origin_name()`][] 的结果。
  * `database` {string|null} 源数据库的未别名化名称，或
    如果列是表达式或子查询的结果，则为 `null`。此
    属性是 [`sqlite3_column_database_name()`][] 的结果。
  * `name` {string} 在 `SELECT` 语句的结果集中分配给列的名称。此
    属性是
    [`sqlite3_column_name()`][] 的结果。
  * `table` {string|null} 源表的未别名化名称，如果
    列是表达式或子查询的结果，则为 `null`。此属性是
    [`sqlite3_column_table_name()`][] 的结果。
  * `type` {string|null} 列的声明数据类型，如果
    列是表达式或子查询的结果，则为 `null`。此属性是
    [`sqlite3_column_decltype()`][] 的结果。

此方法用于检索有关预准备语句返回的列的信息。

### `statement.expandedSQL`

<!-- YAML
added: v22.5.0
-->

* 类型：{string} 扩展为包含参数值的源 SQL。

预准备语句的源 SQL 文本，其中参数
占位符已被此预准备语句最近一次执行期间使用的值替换。此属性是
对 [`sqlite3_expanded_sql()`][] 的封装。

### `statement.get([namedParameters][, ...anonymousParameters])`

<!-- YAML
added: v22.5.0
changes:
  - version:
    - v23.7.0
    - v22.14.0
    pr-url: https://github.com/nodejs/node/pull/56385
    description: 为 `anonymousParameters` 添加对 `DataView` 和类型化数组对象的支持。
-->

* `namedParameters` {Object} 一个用于绑定命名参数的可选对象。
  此对象的键用于配置映射。
* `...anonymousParameters` {null|number|bigint|string|Buffer|TypedArray|DataView} 零或
  多个绑定到匿名参数的值。
* 返回值：{Object|undefined} 对应于执行预准备语句返回的第一行的对象。
  对象的键和值对应于行的列名和值。如果数据库
  未返回任何行，则此方法返回 `undefined`。

此方法执行预准备语句并将第一个结果作为对象返回。如果预准备语句
不返回任何结果，此方法返回 `undefined`。预准备语句 [参数被绑定][] 使用
`namedParameters` 和 `anonymousParameters` 中的值。

### `statement.iterate([namedParameters][, ...anonymousParameters])`

<!-- YAML
added:
  - v23.4.0
  - v22.13.0
changes:
  - version:
    - v23.7.0
    - v22.14.0
    pr-url: https://github.com/nodejs/node/pull/56385
    description: 为 `anonymousParameters` 添加对 `DataView` 和类型化数组对象的支持。
-->

* `namedParameters` {Object} 一个用于绑定命名参数的可选对象。
  此对象的键用于配置映射。
* `...anonymousParameters` {null|number|bigint|string|Buffer|TypedArray|DataView} 零或
  多个绑定到匿名参数的值。
* 返回值：{Iterator} 对象的可迭代迭代器。每个对象对应于执行预准备语句返回的一行
  数据。每个对象的键和值对应于行的列名和值。

此方法执行预准备语句并返回对象的迭代器。如果预准备语句
不返回任何结果，此方法返回一个空迭代器。预准备语句 [参数被绑定][] 使用
`namedParameters` 和 `anonymousParameters` 中的值。

### `statement.run([namedParameters][, ...anonymousParameters])`

<!-- YAML
added: v22.5.0
changes:
  - version:
    - v23.7.0
    - v22.14.0
    pr-url: https://github.com/nodejs/node/pull/56385
    description: 为 `anonymousParameters` 添加对 `DataView` 和类型化数组对象的支持。
-->

* `namedParameters` {Object} 一个用于绑定命名参数的可选对象。
  此对象的键用于配置映射。
* `...anonymousParameters` {null|number|bigint|string|Buffer|TypedArray|DataView} 零或
  多个绑定到匿名参数的值。
* 返回值：{Object}
  * `changes` {number|bigint} 最近完成的 `INSERT`、`UPDATE` 或 `DELETE` 语句
    修改、插入或删除的行数。此字段是数字或 `BigInt`，取决于预准备语句
    的配置。此属性是 [`sqlite3_changes64()`][] 的结果。
  * `lastInsertRowid` {number|bigint} 最近插入的 rowid。此
    字段是数字或 `BigInt`，取决于预准备语句的
    配置。此属性是
    [`sqlite3_last_insert_rowid()`][] 的结果。

此方法执行预准备语句并返回一个总结结果变更的对象。预准备语句 [参数被绑定][] 使用
`namedParameters` 和 `anonymousParameters` 中的值。

### `statement.setAllowBareNamedParameters(enabled)`

<!-- YAML
added: v22.5.0
-->

* `enabled` {boolean} 启用或禁用对绑定命名参数
  无前缀字符的支持。

SQLite 参数的名称以前缀字符开头。默认情况下，
`node:sqlite` 要求绑定参数时存在此前缀字符。但是，除了美元
符号字符外，这些前缀字符在对象键中使用时也需要额外引号。

为了提高易用性，此方法也可用于允许裸命名参数，
即在 JavaScript 代码中不需要前缀字符。启用裸命名参数时有几个
注意事项需要注意：

* SQL 中仍然需要前缀字符。
* JavaScript 中仍然允许前缀字符。事实上，前缀名称
  将具有稍好的绑定性能。
* 在同一预准备语句中使用歧义的命名参数，例如 `$k` 和 `@k`，
  将导致异常，因为无法确定如何绑定
  裸名称。

### `statement.setAllowUnknownNamedParameters(enabled)`

<!-- YAML
added:
  - v23.11.0
  - v22.15.0
-->

* `enabled` {boolean} 启用或禁用对未知命名参数的支持。

默认情况下，如果在绑定参数时遇到未知名称，则
抛出异常。此方法允许忽略未知的命名参数。

### `statement.setReturnArrays(enabled)`

<!-- YAML
added:
  - v24.0.0
  - v22.16.0
-->

* `enabled` {boolean} 启用或禁用将查询结果作为数组返回。

启用时，`all()`、`get()` 和 `iterate()` 方法返回的查询结果将作为数组返回，而不是
对象。

### `statement.setReadBigInts(enabled)`

<!-- YAML
added: v22.5.0
-->

* `enabled` {boolean} 启用或禁用读取
  数据库中的 `INTEGER` 字段时使用 `BigInt`。

从数据库读取时，SQLite `INTEGER` 默认映射到 JavaScript
数字。但是，SQLite `INTEGER` 可以存储比
JavaScript 数字能够表示的值更大的值。在这种情况下，此方法可用于
使用 JavaScript `BigInt` 读取 `INTEGER` 数据。此方法对数据库写入操作
没有影响，其中数字和 `BigInt` 始终都受支持。

### `statement.sourceSQL`

<!-- YAML
added: v22.5.0
-->

* 类型：{string} 用于创建此预准备语句的源 SQL。

预准备语句的源 SQL 文本。此属性是
对 [`sqlite3_sql()`][] 的封装。

## 类：`SQLTagStore`

<!-- YAML
added: v24.9.0
-->

此类表示一个用于存储预编译语句的单 LRU（最近最少使用）缓存。

此类的实例是通过 [`database.createTagStore()`][] 方法创建的，而不是使用构造函数。该存储基于提供的 SQL 查询字符串缓存预编译语句。当再次看到相同的查询时，存储会检索缓存的语句并通过参数绑定安全地应用新值，从而防止 SQL 注入等攻击。

缓存有一个默认为 1000 条语句的 `maxSize`，但可以提供自定义大小（例如，`database.createTagStore(100)`）。此类暴露的所有 API 均同步执行。

### `sqlTagStore.all(stringElements[, ...boundParameters])`

<!-- YAML
added: v24.9.0
-->

* `stringElements` {string\[]} 包含 SQL 查询的模板字面量元素。
* `...boundParameters` {null|number|bigint|string|Buffer|TypedArray|DataView} 要绑定到模板字符串中占位符的参数值。
* 返回：{Array} 一个对象数组，表示查询返回的行。

执行给定的 SQL 查询并将所有结果行作为对象数组返回。

此函数旨在用作模板字面量标签，而不是直接调用。

### `sqlTagStore.get(stringElements[, ...boundParameters])`

<!-- YAML
added: v24.9.0
-->

* `stringElements` {string\[]} 包含 SQL 查询的模板字面量元素。
* `...boundParameters` {null|number|bigint|string|Buffer|TypedArray|DataView} 要绑定到模板字符串中占位符的参数值。
* 返回：{Object | undefined} 一个对象，表示查询返回的第一行，如果没有返回行则为 `undefined`。

执行给定的 SQL 查询并将第一行结果作为对象返回。

此函数旨在用作模板字面量标签，而不是直接调用。

### `sqlTagStore.iterate(stringElements[, ...boundParameters])`

<!-- YAML
added: v24.9.0
-->

* `stringElements` {string\[]} 包含 SQL 查询的模板字面量元素。
* `...boundParameters` {null|number|bigint|string|Buffer|TypedArray|DataView} 要绑定到模板字符串中占位符的参数值。
* 返回：{Iterator} 一个迭代器，生成表示查询返回的行的对象。

执行给定的 SQL 查询并返回结果行的迭代器。

此函数旨在用作模板字面量标签，而不是直接调用。

### `sqlTagStore.run(stringElements[, ...boundParameters])`

<!-- YAML
added: v24.9.0
-->

* `stringElements` {string\[]} 包含 SQL 查询的模板字面量元素。
* `...boundParameters` {null|number|bigint|string|Buffer|TypedArray|DataView} 要绑定到模板字符串中占位符的参数值。
* 返回：{Object} 一个包含执行信息的对象，包括 `changes` 和 `lastInsertRowid`。

执行给定的 SQL 查询，预期不返回任何行（例如，INSERT、UPDATE、DELETE）。

此函数旨在用作模板字面量标签，而不是直接调用。

### `sqlTagStore.size`

<!-- YAML
added: v24.9.0
changes:
  - version:
     - v25.5.0
     - v24.13.1
    pr-url: https://github.com/nodejs/node/pull/60246
    description: 从方法更改为 getter。
-->

* 类型：{integer}

一个只读属性，返回缓存中当前预编译语句的数量。

### `sqlTagStore.capacity`

<!-- YAML
added: v24.9.0
-->

* 类型：{integer}

一个只读属性，返回缓存可以容纳的最大预编译语句数量。

### `sqlTagStore.db`

<!-- YAML
added: v24.9.0
-->

* 类型：{DatabaseSync}

一个只读属性，返回与此 `SQLTagStore` 关联的 `DatabaseSync` 对象。

### `sqlTagStore.clear()`

<!-- YAML
added: v24.9.0
-->

重置 LRU 缓存，清除所有存储的预编译语句。

## `sqlite.backup(sourceDb, path[, options])`

<!-- YAML
added:
  - v23.8.0
  - v22.16.0
changes:
  - version: v23.10.0
    pr-url: https://github.com/nodejs/node/pull/56991
    description: `path` 参数现在支持 Buffer 和 URL 对象。
-->

* `sourceDb` {DatabaseSync} 要备份的数据库。源数据库必须处于打开状态。
* `path` {string | Buffer | URL} 创建备份的路径。如果文件已存在，内容将被覆盖。
* `options` {Object} 备份的可选配置。支持以下属性：
  * `source` {string} 源数据库的名称。可以是 `'main'`（默认主数据库）或任何已通过 [`ATTACH DATABASE`][] 添加的其他数据库 **默认值：** `'main'`。
  * `target` {string} 目标数据库的名称。可以是 `'main'`（默认主数据库）或任何已通过 [`ATTACH DATABASE`][] 添加的其他数据库 **默认值：** `'main'`。
  * `rate` {number} 每批备份中传输的页数。 **默认值：** `100`。
  * `progress` {Function} 一个可选的回调函数，将在每个备份步骤后调用。传递给此回调的参数是一个 {Object}，具有 `remainingPages` 和 `totalPages` 属性，描述备份操作的当前进度。
* 返回：{Promise} 一个 Promise，完成时 fulfilled 值为备份的总页数，如果发生错误则 rejected。

此方法进行数据库备份。此方法抽象了 [`sqlite3_backup_init()`][]、[`sqlite3_backup_step()`][] 和 [`sqlite3_backup_finish()`][] 函数。

备份的数据库在备份过程中可以正常使用。来自同一连接（同一 {DatabaseSync} 对象）的变更会立即反映在备份中。但是，来自其他连接的变更会导致备份过程重新启动。

```cjs
const { backup, DatabaseSync } = require('node:sqlite');

(async () => {
  const sourceDb = new DatabaseSync('source.db');
  const totalPagesTransferred = await backup(sourceDb, 'backup.db', {
    rate: 1, // 一次复制一页。
    progress: ({ totalPages, remainingPages }) => {
      console.log('Backup in progress', { totalPages, remainingPages });
    },
  });

  console.log('Backup completed', totalPagesTransferred);
})();
```

```mjs
import { backup, DatabaseSync } from 'node:sqlite';

const sourceDb = new DatabaseSync('source.db');
const totalPagesTransferred = await backup(sourceDb, 'backup.db', {
  rate: 1, // 一次复制一页。
  progress: ({ totalPages, remainingPages }) => {
    console.log('Backup in progress', { totalPages, remainingPages });
  },
});

console.log('Backup completed', totalPagesTransferred);
```

## `sqlite.constants`

<!-- YAML
added:
  - v23.5.0
  - v22.13.0
-->

* 类型：{Object}

一个包含 SQLite 操作常用常量的对象。

### SQLite 常量

以下常量由 `sqlite.constants` 对象导出。

#### 冲突解决常量

以下常量之一可作为传递给 [`database.applyChangeset()`][] 的 `onConflict` 冲突解决处理程序的参数。另请参阅 SQLite 文档中的 [传递给冲突处理程序的常量][]。

<table>
  <tr>
    <th>常量</th>
    <th>描述</th>
  </tr>
  <tr>
    <td><code>SQLITE_CHANGESET_DATA</code></td>
    <td>当处理 DELETE 或 UPDATE 变更时，如果数据库中存在具有所需主键字段的行，但更新修改的一个或多个其他（非主键）字段不包含预期的“之前”值，则使用此常量调用冲突处理程序。</td>
  </tr>
  <tr>
    <td><code>SQLITE_CHANGESET_NOTFOUND</code></td>
    <td>当处理 DELETE 或 UPDATE 变更时，如果数据库中不存在具有所需主键字段的行，则使用此常量调用冲突处理程序。</td>
  </tr>
  <tr>
    <td><code>SQLITE_CHANGESET_CONFLICT</code></td>
    <td>在处理 INSERT 变更时，如果操作会导致主键值重复，则将此常量传递给冲突处理程序。</td>
  </tr>
  <tr>
    <td><code>SQLITE_CHANGESET_CONSTRAINT</code></td>
    <td>如果启用了外键处理，并且应用变更集使数据库处于包含外键违规的状态，则在提交变更集之前恰好一次使用此常量调用冲突处理程序。如果冲突处理程序返回 <code>SQLITE_CHANGESET_OMIT</code>，则提交更改，包括导致外键约束违规的更改。或者，如果它返回 <code>SQLITE_CHANGESET_ABORT</code>，则回滚变更集。</td>
  </tr>
  <tr>
    <td><code>SQLITE_CHANGESET_FOREIGN_KEY</code></td>
    <td>如果在应用变更时发生任何其他约束违规（即 UNIQUE、CHECK 或 NOT NULL 约束），则使用此常量调用冲突处理程序。</td>
  </tr>
</table>

以下常量之一必须从传递给 [`database.applyChangeset()`][] 的 `onConflict` 冲突解决处理程序返回。另请参阅 SQLite 文档中的 [从冲突处理程序返回的常量][]。

<table>
  <tr>
    <th>常量</th>
    <th>描述</th>
  </tr>
  <tr>
    <td><code>SQLITE_CHANGESET_OMIT</code></td>
    <td>省略冲突的更改。</td>
  </tr>
  <tr>
    <td><code>SQLITE_CHANGESET_REPLACE</code></td>
    <td>冲突的更改替换现有值。请注意，仅当冲突类型为 <code>SQLITE_CHANGESET_DATA</code> 或 <code>SQLITE_CHANGESET_CONFLICT</code> 时，才能返回此值。</td>
  </tr>
  <tr>
    <td><code>SQLITE_CHANGESET_ABORT</code></td>
    <td>当更改遇到冲突时中止并回滚数据库。</td>
  </tr>
</table>

#### 授权常量

以下常量与 [`database.setAuthorizer()`][] 方法一起使用。

##### 授权结果代码

以下常量之一必须从传递给 [`database.setAuthorizer()`][] 的授权回调函数返回。

<table>
  <tr>
    <th>常量</th>
    <th>描述</th>
  </tr>
  <tr>
    <td><code>SQLITE_OK</code></td>
    <td>允许操作正常进行。</td>
  </tr>
  <tr>
    <td><code>SQLITE_DENY</code></td>
    <td>拒绝操作并导致返回错误。</td>
  </tr>
  <tr>
    <td><code>SQLITE_IGNORE</code></td>
    <td>忽略操作并继续，就好像从未请求过它一样。</td>
  </tr>
</table>

##### 授权操作代码

以下常量作为第一个参数传递给授权回调函数，以指示正在授权的操作类型。

<table>
  <tr>
    <th>常量</th>
    <th>描述</th>
  </tr>
  <tr>
    <td><code>SQLITE_CREATE_INDEX</code></td>
    <td>创建索引</td>
  </tr>
  <tr>
    <td><code>SQLITE_CREATE_TABLE</code></td>
    <td>创建表</td>
  </tr>
  <tr>
    <td><code>SQLITE_CREATE_TEMP_INDEX</code></td>
    <td>创建临时索引</td>
  </tr>
  <tr>
    <td><code>SQLITE_CREATE_TEMP_TABLE</code></td>
    <td>创建临时表</td>
  </tr>
  <tr>
    <td><code>SQLITE_CREATE_TEMP_TRIGGER</code></td>
    <td>创建临时触发器</td>
  </tr>
  <tr>
    <td><code>SQLITE_CREATE_TEMP_VIEW</code></td>
    <td>创建临时视图</td>
  </tr>
  <tr>
    <td><code>SQLITE_CREATE_TRIGGER</code></td>
    <td>创建触发器</td>
  </tr>
  <tr>
    <td><code>SQLITE_CREATE_VIEW</code></td>
    <td>创建视图</td>
  </tr>
  <tr>
    <td><code>SQLITE_DELETE</code></td>
    <td>从表中删除</td>
  </tr>
  <tr>
    <td><code>SQLITE_DROP_INDEX</code></td>
    <td>删除索引</td>
  </tr>
  <tr>
    <td><code>SQLITE_DROP_TABLE</code></td>
    <td>删除表</td>
  </tr>
  <tr>
    <td><code>SQLITE_DROP_TEMP_INDEX</code></td>
    <td>删除临时索引</td>
  </tr>
  <tr>
    <td><code>SQLITE_DROP_TEMP_TABLE</code></td>
    <td>删除临时表</td>
  </tr>
  <tr>
    <td><code>SQLITE_DROP_TEMP_TRIGGER</code></td>
    <td>删除临时触发器</td>
  </tr>
  <tr>
    <td><code>SQLITE_DROP_TEMP_VIEW</code></td>
    <td>删除临时视图</td>
  </tr>
  <tr>
    <td><code>SQLITE_DROP_TRIGGER</code></td>
    <td>删除触发器</td>
  </tr>
  <tr>
    <td><code>SQLITE_DROP_VIEW</code></td>
    <td>删除视图</td>
  </tr>
  <tr>
    <td><code>SQLITE_INSERT</code></td>
    <td>插入到表中</td>
  </tr>
  <tr>
    <td><code>SQLITE_PRAGMA</code></td>
    <td>执行 PRAGMA 语句</td>
  </tr>
  <tr>
    <td><code>SQLITE_READ</code></td>
    <td>从表中读取</td>
  </tr>
  <tr>
    <td><code>SQLITE_SELECT</code></td>
    <td>执行 SELECT 语句</td>
  </tr>
  <tr>
    <td><code>SQLITE_TRANSACTION</code></td>
    <td>开始、提交或回滚事务</td>
  </tr>
  <tr>
    <td><code>SQLITE_UPDATE</code></td>
    <td>更新表</td>
  </tr>
  <tr>
    <td><code>SQLITE_ATTACH</code></td>
    <td>附加数据库</td>
  </tr>
  <tr>
    <td><code>SQLITE_DETACH</code></td>
    <td>分离数据库</td>
  </tr>
  <tr>
    <td><code>SQLITE_ALTER_TABLE</code></td>
    <td>修改表</td>
  </tr>
  <tr>
    <td><code>SQLITE_REINDEX</code></td>
    <td>重新索引</td>
  </tr>
  <tr>
    <td><code>SQLITE_ANALYZE</code></td>
    <td>分析数据库</td>
  </tr>
  <tr>
    <td><code>SQLITE_CREATE_VTABLE</code></td>
    <td>创建虚拟表</td>
  </tr>
  <tr>
    <td><code>SQLITE_DROP_VTABLE</code></td>
    <td>删除虚拟表</td>
  </tr>
  <tr>
    <td><code>SQLITE_FUNCTION</code></td>
    <td>使用函数</td>
  </tr>
  <tr>
    <td><code>SQLITE_SAVEPOINT</code></td>
    <td>创建、释放或回滚保存点</td>
  </tr>
  <tr>
    <td><code>SQLITE_COPY</code></td>
    <td>复制数据（旧版）</td>
  </tr>
  <tr>
    <td><code>SQLITE_RECURSIVE</code></td>
    <td>递归查询</td>
  </tr>
</table>

[Changesets 和 Patchsets]: https://www.sqlite.org/sessionintro.html#changesets_and_patchsets
[传递给冲突处理程序的常量]: https://www.sqlite.org/session/c_changeset_conflict.html
[从冲突处理程序返回的常量]: https://www.sqlite.org/session/c_changeset_abort.html
[限制常量]: https://www.sqlite.org/c3ref/c_limit_attached.html
[运行时限制]: https://www.sqlite.org/c3ref/limit.html
[SQL 注入]: https://en.wikipedia.org/wiki/SQL_injection
[JavaScript 和 SQLite 之间的类型转换]: #type-conversion-between-javascript-and-sqlite
[`ATTACH DATABASE`]: https://www.sqlite.org/lang_attach.html
[`PRAGMA foreign_keys`]: https://www.sqlite.org/pragma.html#pragma_foreign_keys
[`SQLITE_DBCONFIG_DEFENSIVE`]: https://www.sqlite.org/c3ref/c_dbconfig_defensive.html#sqlitedbconfigdefensive
[`SQLITE_DETERMINISTIC`]: https://www.sqlite.org/c3ref/c_deterministic.html
[`SQLITE_DIRECTONLY`]: https://www.sqlite.org/c3ref/c_deterministic.html
[`SQLITE_MAX_FUNCTION_ARG`]: https://www.sqlite.org/limits.html#max_function_arg
[`SQLTagStore`]: #class-sqltagstore
[`database.applyChangeset()`]: #databaseapplychangesetchangeset-options
[`database.createTagStore()`]: #databasecreatetagstoremaxsize
[`database.setAuthorizer()`]: #databasesetauthorizercallback
[`sqlite3_backup_finish()`]: https://www.sqlite.org/c3ref/backup_finish.html#sqlite3backupfinish
[`sqlite3_backup_init()`]: https://www.sqlite.org/c3ref/backup_finish.html#sqlite3backupinit
[`sqlite3_backup_step()`]: https://www.sqlite.org/c3ref/backup_finish.html#sqlite3backupstep
[`sqlite3_changes64()`]: https://www.sqlite.org/c3ref/changes.html
[`sqlite3_close_v2()`]: https://www.sqlite.org/c3ref/close.html
[`sqlite3_column_database_name()`]: https://www.sqlite.org/c3ref/column_database_name.html
[`sqlite3_column_decltype()`]: https://www.sqlite.org/c3ref/column_decltype.html
[`sqlite3_column_name()`]: https://www.sqlite.org/c3ref/column_name.html
[`sqlite3_column_origin_name()`]: https://www.sqlite.org/c3ref/column_database_name.html
[`sqlite3_column_table_name()`]: https://www.sqlite.org/c3ref/column_database_name.html
[`sqlite3_create_function_v2()`]: https://www.sqlite.org/c3ref/create_function.html
[`sqlite3_create_window_function()`]: https://www.sqlite.org/c3ref/create_function.html
[`sqlite3_db_filename()`]: https://sqlite.org/c3ref/db_filename.html
[`sqlite3_exec()`]: https://www.sqlite.org/c3ref/exec.html
[`sqlite3_expanded_sql()`]: https://www.sqlite.org/c3ref/expanded_sql.html
[`sqlite3_get_autocommit()`]: https://sqlite.org/c3ref/get_autocommit.html
[`sqlite3_last_insert_rowid()`]: https://www.sqlite.org/c3ref/last_insert_rowid.html
[`sqlite3_load_extension()`]: https://www.sqlite.org/c3ref/load_extension.html
[`sqlite3_prepare_v2()`]: https://www.sqlite.org/c3ref/prepare.html
[`sqlite3_set_authorizer()`]: https://sqlite.org/c3ref/set_authorizer.html
[`sqlite3_sql()`]: https://www.sqlite.org/c3ref/expanded_sql.html
[`sqlite3changeset_apply()`]: https://www.sqlite.org/session/sqlite3changeset_apply.html
[`sqlite3session_attach()`]: https://www.sqlite.org/session/sqlite3session_attach.html
[`sqlite3session_changeset()`]: https://www.sqlite.org/session/sqlite3session_changeset.html
[`sqlite3session_create()`]: https://www.sqlite.org/session/sqlite3session_create.html
[`sqlite3session_delete()`]: https://www.sqlite.org/session/sqlite3session_delete.html
[`sqlite3session_patchset()`]: https://www.sqlite.org/session/sqlite3session_patchset.html
[busy timeout]: https://sqlite.org/c3ref/busy_timeout.html
[connection]: https://www.sqlite.org/c3ref/sqlite3.html
[data types]: https://www.sqlite.org/datatype3.html
[double-quoted string literals]: https://www.sqlite.org/quirks.html#dblquote
[in memory]: https://www.sqlite.org/inmemorydb.html
[parameters are bound]: https://www.sqlite.org/c3ref/bind_blob.html
[prepared statement]: https://www.sqlite.org/c3ref/stmt.html
[safe integer]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger
