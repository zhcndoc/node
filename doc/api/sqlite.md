# SQLite

<!--introduced_in=v22.5.0-->

<!-- YAML
added: v22.5.0
changes:
  - version: v25.7.0
    pr-url: https://github.com/nodejs/node/pull/61262
    description: SQLite is now a release candidate.
  - version:
    - v23.4.0
    - v22.13.0
    pr-url: https://github.com/nodejs/node/pull/55890
    description: "SQLite is no longer behind `--experimental-sqlite` but remains experimental."
-->

> Stability: 1.2 - Release Candidate.

<!-- source_link=lib/sqlite.js -->

The `node:sqlite` module provides convenient access to SQLite databases.
To access it:

```mjs
import sqlite from 'node:sqlite';
```

```cjs
const sqlite = require('node:sqlite');
```

This module is only available under the `node:` scheme.

The following example demonstrates basic usage of the `node:sqlite` module
to open an in-memory database, write data to it, and then read it back.

```mjs
import { DatabaseSync } from 'node:sqlite';
const database = new DatabaseSync(':memory:');

// Execute SQL statements from a string.
database.exec(`
  CREATE TABLE data(
    key INTEGER PRIMARY KEY,
    value TEXT
  ) STRICT
`);
// Create a prepared statement to insert data into the database.
const insert = database.prepare('INSERT INTO data (key, value) VALUES (?, ?)');
// Execute the prepared statement with bound values.
insert.run(1, 'hello');
insert.run(2, 'world');
// Create a prepared statement to read data from the database.
const query = database.prepare('SELECT * FROM data ORDER BY key');
// Execute the prepared statement and log the result set.
console.log(query.all());
// Output: [ { key: 1, value: 'hello' }, { key: 2, value: 'world' } ]
```

```cjs
'use strict';
const { DatabaseSync } = require('node:sqlite');
const database = new DatabaseSync(':memory:');

// Execute SQL statements from a string.
database.exec(`
  CREATE TABLE data(
    key INTEGER PRIMARY KEY,
    value TEXT
  ) STRICT
`);
// Create a prepared statement to insert data into the database.
const insert = database.prepare('INSERT INTO data (key, value) VALUES (?, ?)');
// Execute the prepared statement with bound values.
insert.run(1, 'hello');
insert.run(2, 'world');
// Create a prepared statement to read data from the database.
const query = database.prepare('SELECT * FROM data ORDER BY key');
// Execute the prepared statement and log the result set.
console.log(query.all());
// Output: [ { key: 1, value: 'hello' }, { key: 2, value: 'world' } ]
```

## JavaScript and SQLite Type Conversions

When Node.js writes to or reads from SQLite, there is a conversion
between JavaScript data types and SQLite's [data types][]. Because JavaScript
supports more data types than SQLite, only a subset of JavaScript types are
supported. Attempting to write an unsupported data type to SQLite will result
in an exception.

| Storage Class | JavaScript to SQLite | SQLite to JavaScript |
| ------------- | -------------------------- | ------------------------------------- |
| `NULL` | {null} | {null} |
| `INTEGER` | {number} or {bigint} | {number} or {bigint} _(configurable)_ |
| `REAL` | {number} | {number} |
| `TEXT` | {string} | {string} |
| `BLOB` | {TypedArray} or {DataView} | {Uint8Array} |

APIs for reading values from SQLite have a configuration option that
determines whether `INTEGER` values are converted to `number` or `bigint` in
JavaScript, such as the `readBigInts` option for statements and the
`useBigIntArguments` option for user-defined functions. If Node.js reads an
`INTEGER` value from SQLite that is outside the JavaScript [safe integer][]
range and an option to read BigInts is not enabled, an `ERR_OUT_OF_RANGE`
error will be thrown.

## Class: `DatabaseSync`

<!-- YAML
added: v22.5.0
changes:
  - version:
    - v24.0.0
    - v22.16.0
    pr-url: https://github.com/nodejs/node/pull/57752
    description: "Added `timeout` option."
  - version:
    - v23.10.0
    - v22.15.0
    pr-url: https://github.com/nodejs/node/pull/56991
    description: "`path` parameter now supports Buffer and URL objects."
-->

This class represents a single [connection][] to an SQLite database. All APIs
exposed by this class execute synchronously.

### `new DatabaseSync(path[, options])`

<!-- YAML
added: v22.5.0
changes:
  - version:
     - v25.5.0
     - v24.14.0
    pr-url: https://github.com/nodejs/node/pull/61266
    description: "`defensive` enabled by default."
  - version:
      - v25.1.0
      - v24.12.0
    pr-url: https://github.com/nodejs/node/pull/60217
    description: "Added `defensive` option."
  - version:
      - v24.4.0
      - v22.18.0
    pr-url: https://github.com/nodejs/node/pull/58697
    description: Added new SQLite database options.
-->

* `path` {string | Buffer | URL} The path to the database. SQLite databases can
  be stored in files or entirely [in memory][]. To use a file-based database,
  `path` should be a file path. To use an in-memory database, `path`
  should be the special name `':memory:'`.
* `options` {Object} Configuration options for the database connection. The
  following options are supported:
  * `open` {boolean} If `true`, the database is opened by the constructor. When
    this is `false`, the database must be opened via the `open()` method.
    **Default:** `true`.
  * `readOnly` {boolean} If `true`, the database is opened in read-only mode.
    If the database does not exist, opening it will fail. **Default:** `false`.
  * `enableForeignKeyConstraints` {boolean} If `true`, foreign key constraints are enabled.
    This is recommended, but can be disabled for compatibility with older database schemas.
    Enforcement of foreign key constraints can be enabled and disabled after opening the database
    using [`PRAGMA foreign_keys`][]. **Default:** `true`.
  * `enableDoubleQuotedStringLiterals` {boolean} If `true`, SQLite will accept
    [double-quoted string literals][]. This is not recommended, but can be enabled for compatibility with older database schemas. **Default:** `false`.
  * `allowExtension` {boolean} If `true`, the `loadExtension` SQL function
    and the `loadExtension()` method are enabled.
    You can later call `enableLoadExtension(false)` to disable this feature.
    **Default:** `false`.
  * `timeout` {number} The [busy timeout][] in milliseconds. This is the
    maximum amount of time SQLite will wait for a database lock to be released
    before returning an error. **Default:** `0`.
  * `readBigInts` {boolean} If `true`, integer fields are read as JavaScript `BigInt` values. If `false`,
    integer fields are read as JavaScript numbers. **Default:** `false`.
  * `returnArrays` {boolean} If `true`, query results are returned as arrays instead of objects.
    **Default:** `false`.
  * `allowBareNamedParameters` {boolean} If `true`, named parameters without a prefix character
    (e.g. `foo` instead of `:foo`) are allowed to be bound. **Default:** `true`.
  * `allowUnknownNamedParameters` {boolean} If `true`, unknown named parameters are ignored when binding.
    If `false`, an exception is thrown for unknown named parameters. **Default:** `false`.
  * `defensive` {boolean} If `true`, the defensive flag is enabled. When the defensive flag is enabled,
    language features that allow ordinary SQL to intentionally corrupt database files are disabled.
    The defensive flag can also be set using `enableDefensive()`.
    **Default:** `true`.
  * `limits` {Object} Configuration for various SQLite limits. These limits
    can be used to prevent excessive resource consumption when processing potentially malicious input. See the SQLite documentation on [Runtime Limits][] and [Limit constants][] for more information. The following properties are supported:
    * `length` {number} Maximum length of strings or BLOBs.
    * `sqlLength` {number} Maximum length of SQL statements.
    * `column` {number} Maximum number of columns.
    * `exprDepth` {number} Maximum depth of expression trees.
    * `compoundSelect` {number} Maximum number of items in a compound SELECT.
    * `vdbeOp` {number} Maximum number of VDBE instructions.
    * `functionArg` {number} Maximum number of arguments to functions.
    * `attach` {number} Maximum number of attached databases.
    * `likePatternLength` {number} Maximum length of LIKE patterns.
    * `variableNumber` {number} Maximum number of SQL variables.
    * `triggerDepth` {number} Maximum depth of trigger recursion.

Constructs a new `DatabaseSync` instance.

### `database.aggregate(name, options)`

<!-- YAML
added:
 - v24.0.0
 - v22.16.0
-->

Registers a new aggregate function with the SQLite database. This method is a
wrapper around [`sqlite3_create_window_function()`][].

* `name` {string} The name of the SQLite function to create.
* `options` {Object} Function configuration settings.
  * `deterministic` {boolean} If `true`, the [`SQLITE_DETERMINISTIC`][] flag is set on the created function. **Default:** `false`.
  * `directOnly` {boolean} If `true`, the [`SQLITE_DIRECTONLY`][] flag is set on the created function. **Default:** `false`.
  * `useBigIntArguments` {boolean} If `true`, integer arguments to `options.step` and `options.inverse`
    are converted to `BigInt`. If `false`, integer arguments are passed as
    JavaScript numbers. **Default:** `false`.
  * `varargs` {boolean} If `true`, `options.step` and `options.inverse` can be called with any number of
    arguments (between zero and [`SQLITE_MAX_FUNCTION_ARG`][]). If `false`,
    `inverse` and `step` must be called with exactly `length` arguments.
    **Default:** `false`.
  * `start` {number | string | null | Array | Object | Function} The identity
    value for the aggregate function. This value is used when the aggregate
    function is initialized. When a {Function} is passed, the identity value will be its return value.
  * `step` {Function} The function called for each row in the aggregation. The
    function receives the current state and the row values. The return value of this function should be the new state.
  * `result` {Function} The function called to obtain the aggregate result. The function receives the final state and should return the aggregate's result.
  * `inverse` {Function} When this function is provided, the `aggregate` method will work as a window function.
    The function receives the current state and the row values to be discarded. The return value of this function should be the
    new state.

When used as a window function, the `result` function will be called multiple times.

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

Closes the database connection. If the database is not
open, an exception is thrown. This method is a wrapper around [`sqlite3_close_v2()`][].

### `database.loadExtension(path)`

<!-- YAML
added:
  - v23.5.0
  - v22.13.0
-->

* `path` {string} The path to the shared library to load.

Loads a shared library into the database connection. This method is a
wrapper around [`sqlite3_load_extension()`][]. The `allowExtension` option must be enabled when constructing the `DatabaseSync` instance.

### `database.enableLoadExtension(allow)`

<!-- YAML
added:
  - v23.5.0
  - v22.13.0
-->

* `allow` {boolean} Whether to allow loading extensions.

Enables or disables the `loadExtension` SQL function and the `loadExtension()`
method. Loading extensions cannot be enabled if `allowExtension` was `false`
when constructed, for security reasons.

### `database.enableDefensive(active)`

<!-- YAML
added:
  - v25.1.0
  - v24.12.0
-->

* `active` {boolean} Whether to set the defensive flag.

Enables or disables the defensive flag. When the defensive flag is active,
language features that allow ordinary SQL to intentionally corrupt database files are disabled.
See [`SQLITE_DBCONFIG_DEFENSIVE`][] in the SQLite documentation for more information.

### `database.location([dbName])`

<!-- YAML
added:
  - v24.0.0
  - v22.16.0
-->

* `dbName` {string} The name of the database. This can be `'main'` (the default primary database) or any other database that has been added with [`ATTACH DATABASE`][]. **Default:** `'main'`.
* Returns: {string | null} The location of the database file. When using an in-memory database,
  this method returns null.

This method is a wrapper around [`sqlite3_db_filename()`][].

### `database.exec(sql)`

<!-- YAML
added: v22.5.0
-->

* `sql` {string} The SQL string to execute.

This method allows executing one or more SQL statements without returning any
results. This method is useful when executing SQL statements read from a file.
This method is a wrapper around [`sqlite3_exec()`][].

### `database.function(name[, options], fn)`

<!-- YAML
added:
  - v23.5.0
  - v22.13.0
-->

* `name` {string} The name of the SQLite function to create.
* `options` {Object} Optional configuration settings for the function. The
  following properties are supported:
  * `deterministic` {boolean} If `true`, the [`SQLITE_DETERMINISTIC`][] flag is set on the created function. **Default:** `false`.
  * `directOnly` {boolean} If `true`, the [`SQLITE_DIRECTONLY`][] flag is set on the created function. **Default:** `false`.
  * `useBigIntArguments` {boolean} If `true`, integer arguments to `function`
    are converted to `BigInt`. If `false`, integer arguments are passed as
    JavaScript numbers. **Default:** `false`.
  * `varargs` {boolean} If `true`, `function` can be called with any number of
    arguments (between zero and [`SQLITE_MAX_FUNCTION_ARG`][]). If `false`,
    `function` must be called with exactly `function.length` arguments.
    **Default:** `false`.
* `fn` {Function} The JavaScript function to call when the SQLite function is invoked.
  The return value of this function should be a valid SQLite data type:
  See [JavaScript and SQLite Type Conversions][]. If the return value is `undefined`, the result defaults to `NULL`.

This method is used to create SQLite user-defined functions. This method is a
wrapper around [`sqlite3_create_function_v2()`][].

### `database.setAuthorizer(callback)`

<!-- YAML
added: v24.10.0
-->

* `callback` {Function|null} The authorizer function to set, or `null` to
  clear the current authorizer.

Sets an authorizer callback that is invoked whenever SQLite attempts to access
data or modify the database schema via a prepared statement.
This can be used to enforce security policies, audit access, or restrict certain
operations. This method is a wrapper around [`sqlite3_set_authorizer()`][].

When invoked, the callback receives five arguments:

* `actionCode` {number} The type of operation being performed (e.g.,
  `SQLITE_INSERT`, `SQLITE_UPDATE`, `SQLITE_SELECT`).
* `arg1` {string|null} The first argument (depends on context, usually the table name).
* `arg2` {string|null} The second argument (depends on context, usually the column name).
* `dbName` {string|null} The database name.
* `triggerOrView` {string|null} The name of the trigger or view causing the access.

The callback must return one of the following constants:

* `SQLITE_OK` - Allow the operation.
* `SQLITE_DENY` - Deny the operation (results in an error).
* `SQLITE_IGNORE` - Ignore the operation (silently skip).

```cjs
const { DatabaseSync, constants } = require('node:sqlite');
const db = new DatabaseSync(':memory:');

// Set an authorizer that denies all table creations
db.setAuthorizer((actionCode) => {
  if (actionCode === constants.SQLITE_CREATE_TABLE) {
    return constants.SQLITE_DENY;
  }
  return constants.SQLITE_OK;
});

// This will work fine
db.prepare('SELECT 1').get();

// This will throw an error due to the authorization denial
try {
  db.exec('CREATE TABLE blocked (id INTEGER)');
} catch (err) {
  console.log('Operation blocked:', err.message);
}
```

```mjs
import { DatabaseSync, constants } from 'node:sqlite';
const db = new DatabaseSync(':memory:');

// Set an authorizer that denies all table creations
db.setAuthorizer((actionCode) => {
  if (actionCode === constants.SQLITE_CREATE_TABLE) {
    return constants.SQLITE_DENY;
  }
  return constants.SQLITE_OK;
});

// This will work fine
db.prepare('SELECT 1').get();

// This will throw an error due to the authorization denial
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

* Type: {boolean} Whether the database is currently open.

### `database.isTransaction`

<!-- YAML
added:
  - v24.0.0
  - v22.16.0
-->

* Type: {boolean} Whether the database is currently in a transaction. This method
  is a wrapper around [`sqlite3_get_autocommit()`][].

### `database.limits`

<!-- YAML
added: v25.8.0
-->

* Type: {Object}

An object for getting and setting SQLite database limits at runtime.
Each property corresponds to an SQLite limit and can be read or written to.

```js
const db = new DatabaseSync(':memory:');

// Read current limits
console.log(db.limits.length);

// Set new limits
db.limits.sqlLength = 100000;

// Reset limits to their compile-time maximums
db.limits.sqlLength = Infinity;
```

Available properties: `length`, `sqlLength`, `column`, `exprDepth`,
`compoundSelect`, `vdbeOp`, `functionArg`, `attach`, `likePatternLength`,
`variableNumber`, `triggerDepth`.

Setting a property to `Infinity` resets the limit to its compile-time maximum.

### `database.open()`

<!-- YAML
added: v22.5.0
-->

Opens the database specified in the `path` parameter of the `DatabaseSync`
constructor. This method should only be used when the database was not opened
by the constructor. If the database is already open, an exception is thrown.

### `database.serialize([dbName])`

<!-- YAML
added: REPLACEME
-->

* `dbName` {string} The name of the database to serialize. This can be `'main'`
  (the default primary database) or any other database that has been added with
  [`ATTACH DATABASE`][]. **Default:** `'main'`.
* Returns: {Uint8Array} A binary representation of the database.

Serializes the database into a binary representation, returned as a
`Uint8Array`. This is useful for saving, cloning, or transferring an in-memory
database. This method is a wrapper around [`sqlite3_serialize()`][].

```mjs
import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync(':memory:');
db.exec('CREATE TABLE t(key INTEGER PRIMARY KEY, value TEXT)');
db.exec("INSERT INTO t VALUES (1, 'hello')");
const buffer = db.serialize();
console.log(buffer.length); // Prints the byte length of the database
```

```cjs
const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync(':memory:');
db.exec('CREATE TABLE t(key INTEGER PRIMARY KEY, value TEXT)');
db.exec("INSERT INTO t VALUES (1, 'hello')");
const buffer = db.serialize();
console.log(buffer.length); // Prints the byte length of the database
```

### `database.deserialize(buffer[, options])`

<!-- YAML
added: REPLACEME
-->

* `buffer` {Uint8Array} A binary representation of a database, such as the
  output of [`database.serialize()`][].
* `options` {Object} Optional configuration for the deserialization.
  * `dbName` {string} The name of the database to deserialize into.
    **Default:** `'main'`.

Loads a serialized database into this connection, replacing the current
database. The deserialized database is writable. Existing prepared statements
are finalized before deserialization is attempted, even if the operation
subsequently fails. This method is a wrapper around
[`sqlite3_deserialize()`][].

```mjs
import { DatabaseSync } from 'node:sqlite';

const original = new DatabaseSync(':memory:');
original.exec('CREATE TABLE t(key INTEGER PRIMARY KEY, value TEXT)');
original.exec("INSERT INTO t VALUES (1, 'hello')");
const buffer = original.serialize();
original.close();

const clone = new DatabaseSync(':memory:');
clone.deserialize(buffer);
console.log(clone.prepare('SELECT value FROM t').get());
// Prints: { value: 'hello' }
```

```cjs
const { DatabaseSync } = require('node:sqlite');

const original = new DatabaseSync(':memory:');
original.exec('CREATE TABLE t(key INTEGER PRIMARY KEY, value TEXT)');
original.exec("INSERT INTO t VALUES (1, 'hello')");
const buffer = original.serialize();
original.close();

const clone = new DatabaseSync(':memory:');
clone.deserialize(buffer);
console.log(clone.prepare('SELECT value FROM t').get());
// Prints: { value: 'hello' }
```

### `database.prepare(sql[, options])`

<!-- YAML
added: v22.5.0
-->

* `sql` {string} The SQL string to compile into a prepared statement.
* `options` {Object} Optional configuration for the prepared statement.
  * `readBigInts` {boolean} If `true`, integer fields are read as `BigInt`.
    **Default:** Inherited from database options or `false`.
  * `returnArrays` {boolean} If `true`, results are returned as arrays.
    **Default:** Inherited from database options or `false`.
  * `allowBareNamedParameters` {boolean} If `true`, named parameters without a prefix character are allowed to be bound.
    **Default:** Inherited from database options or `true`.
  * `allowUnknownNamedParameters` {boolean} If `true`, unknown named parameters are ignored.
    **Default:** Inherited from database options or `false`.
* Returns: {StatementSync} The prepared statement.

Compiles an SQL statement into a [prepared statement][]. This method is a
wrapper around [`sqlite3_prepare_v2()`][].

### `database.createTagStore([maxSize])`

<!-- YAML
added: v24.9.0
-->

* `maxSize` {integer} The maximum number of prepared statements to cache.
  **Default:** `1000`.
* Returns: {SQLTagStore} A new SQL tag store for caching prepared statements.

Creates a new [`SQLTagStore`][], which is a least-recently-used (LRU) cache
for prepared statements. This allows for efficient reuse of prepared statements
by tagging them with unique identifiers.

When a tagged SQL literal is executed, the `SQLTagStore` checks if a prepared
statement for the corresponding SQL query string already exists in the cache.
If it exists, the cached statement is used. If not, a new prepared statement
is created, executed, and then stored in the cache for future use. This mechanism
helps avoid the overhead of repeatedly parsing and preparing the same SQL
statements.

Tagged statements bind placeholder values from template literals as parameters
to the underlying prepared statement. For example:

```js
sqlTagStore.get`SELECT ${value}`;
```

is equivalent to:

```js
db.prepare('SELECT ?').get(value);
```

However, in the first example, the tag store will cache the underlying prepared
statement for future use.

> **Note:** The `${value}` syntax in tagged statements _binds_ parameters to the
> prepared statement. This is different from the behavior in _untagged_ template
> literals, which perform string interpolation.
>
> ```js
> // This is a safe example of binding parameters to a tagged statement.
> sqlTagStore.run`INSERT INTO t1 (id) VALUES (${id})`;
>
> // This is an *unsafe* example of an untagged template string.
> // `id` is interpolated into the query text as a string.
> // This can lead to SQL injection and data corruption.
> db.run(`INSERT INTO t1 (id) VALUES (${id})`);
> ```

The tag store will match statements from the cache if the query string is the
same (including the positions of any bound placeholders).

```js
// The following statements will match in the cache:
sqlTagStore.get`SELECT * FROM t1 WHERE id = ${id} AND active = 1`;
sqlTagStore.get`SELECT * FROM t1 WHERE id = ${12345} AND active = 1`;

// The following statements will not match because the query string
// and the bound placeholders are different:
sqlTagStore.get`SELECT * FROM t1 WHERE id = ${id} AND active = 1`;
sqlTagStore.get`SELECT * FROM t1 WHERE id = 12345 AND active = 1`;

// The following statements will not match because matching is case-sensitive:
sqlTagStore.get`SELECT * FROM t1 WHERE id = ${id} AND active = 1`;
sqlTagStore.get`select * from t1 where id = ${id} and active = 1`;
```

The only way to bind parameters in a tagged statement is by using the `${value}`
syntax. Do not add parameter binding placeholders (e.g. `?`) to the SQL query
string itself.

```mjs
import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync(':memory:');
const sql = db.createTagStore();

db.exec('CREATE TABLE users (id INT, name TEXT)');

// Insert data using the 'run' method.
// Tagged literals are used to identify prepared statements.
sql.run`INSERT INTO users VALUES (1, 'Alice')`;
sql.run`INSERT INTO users VALUES (2, 'Bob')`;

// Retrieve a single row using the 'get' method.
const name = 'Alice';
const user = sql.get`SELECT * FROM users WHERE name = ${name}`;
console.log(user); // { id: 1, name: 'Alice' }

// Retrieve all rows using the 'all' method.
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

// Insert data using the 'run' method.
// Tagged literals are used to identify prepared statements.
sql.run`INSERT INTO users VALUES (1, 'Alice')`;
sql.run`INSERT INTO users VALUES (2, 'Bob')`;

// Retrieve a single row using the 'get' method.
const name = 'Alice';
const user = sql.get`SELECT * FROM users WHERE name = ${name}`;
console.log(user); // { id: 1, name: 'Alice' }

// Retrieve all rows using the 'all' method.
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

* `options` {Object} Configuration options for the session.
  * `table` {string} A specific table to track changes for. By default, changes
    for all tables are tracked.
  * `db` {string} The name of the database to track. This is useful when multiple
    databases have been added with [`ATTACH DATABASE`][]. **Default:** `'main'`.
* Returns: {Session} A session handle.

Creates and attaches a session to the database. This method is a wrapper around
[`sqlite3session_create()`][] and [`sqlite3session_attach()`][].

### `database.applyChangeset(changeset[, options])`

<!-- YAML
added:
  - v23.3.0
  - v22.12.0
-->

* `changeset` {Uint8Array} A binary changeset or patchset.
* `options` {Object} Configuration options for how to apply the changes.
  * `filter` {Function} A function that skips changes for which it returns true when provided with the target table name.
    By default, all changes are attempted.
  * `onConflict` {Function} A function that determines how to handle conflicts. The function receives one argument,
    which can be one of the following values:

    * `SQLITE_CHANGESET_DATA` : A `DELETE` or `UPDATE` change does not contain the expected "before" value.
    * `SQLITE_CHANGESET_NOTFOUND` : No row matching the primary key of a `DELETE` or `UPDATE` change exists.
    * `SQLITE_CHANGESET_CONFLICT` : An `INSERT` change results in a primary key duplication.
    * `SQLITE_CHANGESET_FOREIGN_KEY` : Applying the change would violate a foreign key.
    * `SQLITE_CHANGESET_CONSTRAINT` : Applying the change would violate a `UNIQUE`, `CHECK`, or `NOT NULL` constraint.

    The function should return one of the following values:

    * `SQLITE_CHANGESET_OMIT` : Omit the conflicting change.
    * `SQLITE_CHANGESET_REPLACE` : Replace the existing value with the conflicting change (only applicable for
      `SQLITE_CHANGESET_DATA` or `SQLITE_CHANGESET_CONFLICT` conflicts).
    * `SQLITE_CHANGESET_ABORT` : Abort and roll back the database upon conflict.

    Applying the changeset will abort and roll back the database when an error is thrown in the conflict handler or the handler returns any other value.

    **Default**: A function that returns `SQLITE_CHANGESET_ABORT`.
* Returns: {boolean} Whether the changeset was applied successfully without aborting.

If the database is not
open, an exception is thrown. This method is a wrapper around [`sqlite3changeset_apply()`][].

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
// The changeset has now been applied, and targetDb contains the same data as sourceDb.
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
// The changeset has now been applied, and targetDb contains the same data as sourceDb.
```

### `database[Symbol.dispose]()`

<!-- YAML
added:
  - v23.11.0
  - v22.15.0
changes:
 - version: v24.2.0
   pr-url: https://github.com/nodejs/node/pull/58467
   description: No longer experimental.
-->

Closes the database connection. If the database connection is already closed,
this operation is a no-op.

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
    description: "为 `anonymousParameters` 添加对 `DataView` 和类型化数组对象的支持。"
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
    description: "为 `anonymousParameters` 添加对 `DataView` 和类型化数组对象的支持。"
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
    description: "为 `anonymousParameters` 添加对 `DataView` 和类型化数组对象的支持。"
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
    description: "为 `anonymousParameters` 添加对 `DataView` 和类型化数组对象的支持。"
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
    description: "`path` 参数现在支持 Buffer 和 URL 对象。"
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
[`database.serialize()`]: #databaseserializedbname
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
[`sqlite3_deserialize()`]: https://sqlite.org/c3ref/deserialize.html
[`sqlite3_exec()`]: https://www.sqlite.org/c3ref/exec.html
[`sqlite3_expanded_sql()`]: https://www.sqlite.org/c3ref/expanded_sql.html
[`sqlite3_get_autocommit()`]: https://sqlite.org/c3ref/get_autocommit.html
[`sqlite3_last_insert_rowid()`]: https://www.sqlite.org/c3ref/last_insert_rowid.html
[`sqlite3_load_extension()`]: https://www.sqlite.org/c3ref/load_extension.html
[`sqlite3_prepare_v2()`]: https://www.sqlite.org/c3ref/prepare.html
[`sqlite3_serialize()`]: https://sqlite.org/c3ref/serialize.html
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
