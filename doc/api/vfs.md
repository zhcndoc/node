# 虚拟文件系统

<!--introduced_in=v26.4.0-->

<!-- YAML
added: v26.4.0
-->

> 稳定性：1 - 实验性

<!-- source_link=lib/vfs.js -->

`node:vfs` 模块提供了一个具有 `node:fs` 式 API 的虚拟文件系统。
它适用于测试、测试夹具、内嵌资源，以及其他需要自包含文件系统而无需接触实际文件系统的场景。

访问方式：

```mjs
import vfs from 'node:vfs';
```

```cjs
const vfs = require('node:vfs');
```

该模块仅在 `node:` 方案下可用，并且仅当 Node.js 以
`--experimental-vfs` 标志启动时可用。

## 安全

VFS API 不是沙箱、权限系统或访问控制机制。
它不会将不受信任的代码与宿主文件系统或其他 Node.js 能力隔离开来。能够访问 [`VirtualFileSystem`][] 实例、
挂载它、选择其提供程序或向其传递路径的代码，都是受信任的应用程序代码。

挂载 VFS 只会重定向解析后路径位于挂载点下的受支持 [`node:fs`][] 调用。它不会阻止代码使用其他路径或
其他 Node.js API 访问进程可用的资源。
[`RealFSProvider`][] 会将 VFS 路径映射到其配置的根目录下，并拒绝解析到该根目录之外的路径，但这种检查并不是安全边界。不要依赖 VFS 来运行不受信任的代码；当需要安全
边界时，请使用操作系统级隔离，例如独立用户、容器或平台沙箱。

## 基本用法

```cjs
const vfs = require('node:vfs');

const myVfs = vfs.create();
myVfs.mkdirSync('/dir', { recursive: true });
myVfs.writeFileSync('/dir/hello.txt', 'Hello, VFS!');

console.log(myVfs.readFileSync('/dir/hello.txt', 'utf8')); // 'Hello, VFS!'
```

`vfs.create()` 默认返回一个由 [`MemoryProvider`][] 支持的
[`VirtualFileSystem`][] 实例。该实例公开同步、基于回调以及基于 Promise 的文件系统方法，
其形状与 [`node:fs`][] API 相对应。所有路径都采用 POSIX 风格并且必须是绝对路径
（以 `/` 开头）。

## `vfs.create([provider][, options])`

<!-- YAML
added: v26.4.0
-->

* `provider` {VirtualProvider} 要使用的提供者。**默认值：**
  `new MemoryProvider()`。
* `options` {Object}
  * `emitExperimentalWarning` {boolean} 在创建实例时是否发出实验性
    警告。**默认值：** `true`。
* 返回：{VirtualFileSystem}

便捷工厂函数，等价于 `new VirtualFileSystem(provider, options)`】【。

```cjs
const vfs = require('node:vfs');

// 默认内存提供者
const memoryVfs = vfs.create();

// Explicit provider
const realVfs = vfs.create(new vfs.RealFSProvider('/tmp/vfs-root'));
```

## 类：`VirtualFileSystem`

<!-- YAML
added: v26.4.0
-->

`VirtualFileSystem` 封装了一个 [`VirtualProvider`][] 并公开
类似 `node:fs` 的 API。每个实例都维护自己的文件树。

### `new VirtualFileSystem([provider][, options])`

<!-- YAML
added: v26.4.0
-->

* `provider` {VirtualProvider} 要使用的提供者。**默认值：**
  `new MemoryProvider()`。
* `options` {Object}
  * `emitExperimentalWarning` {boolean} 是否发出实验性
    警告。**默认值：** `true`。

### `vfs.provider`

<!-- YAML
added: v26.4.0
-->

* {VirtualProvider}

支持此 VFS 实例的提供者。

### `vfs.readonly`

<!-- YAML
added: v26.4.0
-->

* {boolean}

当底层提供者为只读时为 `true`。

### API

`VirtualFileSystem` 实现了以下方法，其签名与对应的 [`node:fs`][] 方法一致：

#### 同步 API

* `existsSync(path)`
* `statSync(path[, options])`
* `lstatSync(path[, options])`
* `readFileSync(path[, options])`
* `writeFileSync(path, data[, options])`
* `appendFileSync(path, data[, options])`
* `readdirSync(path[, options])`
* `mkdirSync(path[, options])`
* `rmdirSync(path)`
* `unlinkSync(path)`
* `renameSync(oldPath, newPath)`
* `copyFileSync(src, dest[, mode])`
* `realpathSync(path[, options])`
* `readlinkSync(path[, options])`
* `symlinkSync(target, path[, type])`
* `accessSync(path[, mode])`
* `rmSync(path[, options])`
* `truncateSync(path[, len])`
* `ftruncateSync(fd[, len])`
* `linkSync(existingPath, newPath)`
* `chmodSync(path, mode)`
* `chownSync(path, uid, gid)`
* `utimesSync(path, atime, mtime)`
* `lutimesSync(path, atime, mtime)`
* `mkdtempSync(prefix)`
* `opendirSync(path[, options])`
* `openAsBlob(path[, options])`
* 文件描述符操作：`openSync`、`closeSync`、`readSync`、`writeSync`、
  `fstatSync`
* 流：`createReadStream`、`createWriteStream`
* 监视器：`watch`、`watchFile`、`unwatchFile`

#### 回调 API

`readFile`、`writeFile`、`stat`、`lstat`、`readdir`、`realpath`、`readlink`、
`access`、`open`、`close`、`read`、`write`、`rm`、`fstat`、`truncate`、
`ftruncate`、`link`、`mkdtemp`、`opendir`。每个方法都接受一个 Node.js 风格的
回调 `(err, ...result) => {}`。

#### Promise API

`vfs.promises` 提供基于 promise 的变体：

```cjs
const vfs = require('node:vfs');

async function example() {
  const myVfs = vfs.create();
  await myVfs.promises.writeFile('/file.txt', 'hello');
  const data = await myVfs.promises.readFile('/file.txt', 'utf8');
  return data;
}
example();
```

该 promise 命名空间与 `fs.promises` 对应，并包含 `readFile`、
`writeFile`、`appendFile`、`stat`、`lstat`、`readdir`、`mkdir`、`rmdir`、
`unlink`、`rename`、`copyFile`、`realpath`、`readlink`、`symlink`、
`access`、`rm`、`truncate`、`link`、`mkdtemp`、`chmod`、`chown`、`lchown`、
`utimes`、`lutimes`、`open`、`lchmod` 和 `watch`。

## 类：`VirtualProvider`

<!-- YAML
added: v26.4.0
-->

所有 VFS 提供者的基类。子类实现核心
原语（如 `open`、`stat`、`readdir`、`mkdir`、`rmdir`、`unlink`、
`rename` 等），并继承派生方法的默认实现（如 `readFile`、`writeFile`、`exists`、`copyFile`、`access` 等）。

### 能力标志

* `provider.readonly` {boolean} **默认值：** `false`。
* `provider.supportsSymlinks` {boolean} **默认值：** `false`。
* `provider.supportsWatch` {boolean} **默认值：** `false`。

### 创建自定义提供者

```cjs
const { VirtualProvider } = require('node:vfs');

class StaticProvider extends VirtualProvider {
  get readonly() { return true; }

  statSync(path) { /* ... */ }
  openSync(path, flags) { /* ... */ }
  readdirSync(path, options) { /* ... */ }
  // ...
}
```

对于任何尚未被重写的原语，基类都会抛出 `ERR_METHOD_NOT_IMPLEMENTED`，
并会对 `readonly` 提供者拒绝写入并抛出 `EROFS`。

## 类：`MemoryProvider`

<!-- YAML
added: v26.4.0
-->

默认的内存提供者。使用 `Map` 支持的树结构存储文件、目录和符号链接，
支持符号链接（`supportsSymlinks === true`），并支持监视（`supportsWatch === true`）。

### `memoryProvider.setReadOnly()`

<!-- YAML
added: v26.4.0
-->

将提供者锁定为只读模式。之后通过使用此提供者的任何
[`VirtualFileSystem`][] 进行写入都会抛出 `EROFS`。没有办法将该提供者恢复为可写。

```cjs
const vfs = require('node:vfs');

const provider = new vfs.MemoryProvider();
const myVfs = vfs.create(provider);
myVfs.writeFileSync('/seed.txt', 'initial');

provider.setReadOnly();

myVfs.writeFileSync('/x.txt', 'fail'); // 抛出 EROFS
```

## 类：`RealFSProvider`

<!-- YAML
added: v26.4.0
-->

一个包装目录（即实际文件系统上的目录）并通过 VFS API 暴露其内容的提供者。所有 VFS 路径都会相对于根目录进行解析，并验证其始终位于根目录内；解析到根目录外的符号链接会被拒绝。此路径映射不是沙箱或访问控制机制。

### `new RealFSProvider(rootPath)`

<!-- YAML
added: v26.4.0
-->

* `rootPath` {string} 用作根目录的绝对文件系统路径。
  必须是非空字符串。

```cjs
const vfs = require('node:vfs');

const realVfs = vfs.create(new vfs.RealFSProvider('/tmp/vfs-root'));
realVfs.writeFileSync('/file.txt', 'hello'); // writes /tmp/vfs-root/file.txt
```

### `realFSProvider.rootPath`

<!-- YAML
added: v26.4.0
-->

* {string}

用作根目录的已解析绝对路径。

## 实现细节

### `Stats` 对象

VFS 的 `Stats` 对象是真正的 [`fs.Stats`][] 实例（如果请求 `{ bigint: true }`，则为
[`fs.BigIntStats`][] 实例）。其字段使用合成但稳定的值：

* `dev` 为 `4085`（VFS 设备 ID）。
* `ino` 在进程内单调递增。
* `blksize` 为 `4096`。
* `blocks` 为 `Math.ceil(size / 512)`。
* 时间默认设置为条目创建/最后修改的时刻。

[`MemoryProvider`]: #class-memoryprovider
[`RealFSProvider`]: #class-realfsprovider
[`VirtualFileSystem`]: #class-virtualfilesystem
[`VirtualProvider`]: #class-virtualprovider
[`fs.BigIntStats`]: fs.md#class-fsbigintstats
[`fs.Stats`]: fs.md#class-fsstats
[`node:fs`]: fs.md
