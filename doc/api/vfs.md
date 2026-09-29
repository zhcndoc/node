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

挂载 VFS 只会重定向已解析路径位于挂载点下的、受支持的 [`node:fs`][] 调用。它不会阻止代码使用其他路径或
其他 Node.js API 访问进程可用的资源。[`RealFSProvider`][] 会将 VFS 路径映射到其配置的根目录下，并拒绝
解析到该根目录之外的路径，但此检查并非安全边界。[`ZipProvider`][] 本身没有可供逃逸的真实文件系统路径；
其条目只存在于存档自身的命名空间中。不要依赖 VFS 来运行不受信任的代码；需要安全边界时，请使用操作系统级
隔离措施，例如单独的用户、容器或平台沙箱。

## 基本用法

```cjs
const vfs = require('node:vfs');

const myVfs = vfs.create();
myVfs.mkdirSync('/dir', { recursive: true });
myVfs.writeFileSync('/dir/hello.txt', 'Hello, VFS!');

console.log(myVfs.readFileSync('/dir/hello.txt', 'utf8')); // '你好，VFS！'
```

`vfs.create()` 默认返回一个由 [`MemoryProvider`][] 支持的
[`VirtualFileSystem`][] 实例。该实例公开同步、基于回调以及基于 Promise 的文件系统方法，
其形状与 [`node:fs`][] API 相对应。所有路径都采用 POSIX 风格并且必须是绝对路径
（以 `/` 开头）。

默认情况下，文件树仅对 VFS 实例私有。若要通过全局 `node:fs` 模块、`require()` 和
`import` 访问该文件树，请调用 [`vfs.mount()`][]；要再次解除挂载，请调用
[`vfs.unmount()`][]（或使用 `using` 声明）。

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

便捷工厂函数，等价于 `new VirtualFileSystem(provider, options)`。

```cjs
const vfs = require('node:vfs');

// 默认内存提供者
const memoryVfs = vfs.create();

// 显式提供者
const realVfs = vfs.create(new vfs.RealFSProvider('/tmp/vfs-root'));
```

## `vfs.registerProvider(entry)`

<!-- YAML
added: v26.10.0
-->

* `entry` {Object}
  * `name` {string} 用于诊断的简短标识符。
  * `canHandle` {Function} 使用已解析路径及其
    [`fs.Stats`][] 调用。如果此提供者应支持该源，则返回 `true`。
  * `create` {Function} 使用已解析路径及其 [`fs.Stats`][] 调用。
    返回支持该源的 {VirtualProvider}。

注册一个提供者，供 [`--vfs-load`][] 为其识别的源选择使用；这样，即使 Node.js 没有内置提供者的文件格式，也仍可挂载。

第一个 `canHandle()` 返回 `true` 的提供者会认领该源。注册的提供者会先于内置提供者被查询，且按注册时间从近到远排列；此外，它们接收的对象既包括目录，也包括文件，因此注册的提供者可以支持、包装或审查任何源。如果没有提供者认领该源，则由内置提供者处理：目录由 [`RealFSProvider`][] 处理，字节内容为 ZIP 存档的文件由 [`ZipProvider`][] 处理。

必须在挂载源之前注册提供者。可从通过 [`--require`][] 或 [`--import`][] 预加载的模块中注册：

```cjs
// provider.js, preloaded with --require
const fs = require('node:fs');
const vfs = require('node:vfs');

const MAGIC = Buffer.from('CUSTOMFMT');

vfs.registerProvider({
  name: 'customfmt',
  canHandle(path, stats) {
    if (!stats.isFile()) return false;
    const head = Buffer.alloc(MAGIC.length);
    const fd = fs.openSync(path, 'r');
    try {
      fs.readSync(fd, head, 0, MAGIC.length, 0);
    } finally {
      fs.closeSync(fd);
    }
    return head.equals(MAGIC);
  },
  create(path) {
    return new MyCustomProvider(path);
  },
});
```

```console
$ node --experimental-vfs --require ./provider.js \
       --vfs-load archive.customfmt
```

## `vfs.vfsBase()`

<!-- YAML
added: REPLACEME
-->

* 返回：{string} [保留的根目录][]的绝对路径。

返回用于容纳所有已挂载虚拟文件系统挂载点的目录，即 `path.join(os.devNull, 'vfs')`。读取该目录可列出已挂载的文件系统；请参阅[保留的根目录][reserved root directory]。

```cjs
const vfs = require('node:vfs');
const fs = require('node:fs');

const myVfs = vfs.create();
const mountPoint = myVfs.mount();

fs.readdirSync(vfs.vfsBase()); // The name of every mount point in it
mountPoint.startsWith(vfs.vfsBase()); // true
```

## 类：`VirtualFileSystem`

<!-- YAML
added: v26.4.0
-->

`VirtualFileSystem` 封装了一个 [`VirtualProvider`][]，并提供类似
`node:fs` 的 API。每个实例都维护自己的文件树。

### `new VirtualFileSystem([provider][, options])`

<!-- YAML
added: v26.4.0
-->

* `provider` {VirtualProvider} 要使用的提供程序。**默认值：**  
  `new MemoryProvider()`。
* `options` {Object}
  * `emitExperimentalWarning` {boolean} 是否发出实验性警告。**默认值：** `true`。

### `vfs.mount()`

<!-- YAML
added: v26.9.0
-->

* 返回：{string} 绝对挂载点。

挂载虚拟文件系统并返回生成的挂载点。
挂载后，可通过 `node:fs` 模块访问 VFS 中的文件，并使用返回的挂载点下的路径通过 `require()` 和 `import` 解析这些文件。

挂载点始终位于一个保留命名空间内，该命名空间不能包含子文件系统条目，因此虚拟路径永远不会与真实路径混淆（或遮蔽真实路径）。可通过 [`vfs.mount()`][] 的返回值或 [`vfs.mountPoint`][] 获取挂载点；读取[保留的根目录][]可列出所有已挂载文件系统的挂载点，其路径由 [`vfs.vfsBase()`][] 返回。挂载点在该目录中的名称是在运行时分配的，因此不应自行构造或硬编码。

```cjs
const vfs = require('node:vfs');
const fs = require('node:fs');

const myVfs = vfs.create();
myVfs.writeFileSync('/data.txt', 'Hello');
const mountPoint = myVfs.mount();
// e.g. '/dev/null/vfs/0'

fs.readFileSync(`${mountPoint}/data.txt`, 'utf8'); // 'Hello'
```

与任何挂载点一样，挂载点不能被删除或重命名，也不能通过将其他内容重命名到其位置来替换：[`fs.rmdir()`][] 和
[`fs.rename()`][] 会因 `EBUSY` 而失败。对挂载点执行递归 [`fs.rm`][] 会先清空文件系统，然后以相同方式失败。

每个 `VirtualFileSystem` 实例同一时间最多只能挂载一次。尝试挂载已挂载的实例会抛出
`ERR_INVALID_STATE`。由于每个实例都挂载在自己的分层命名空间中，因此不同实例的挂载不会重叠。

VFS 支持[显式资源管理][]提案。使用 `using` 声明可在离开作用域时自动解除挂载：

```cjs
const vfs = require('node:vfs');
const fs = require('node:fs');

let mountPoint;
{
  using myVfs = vfs.create();
  myVfs.writeFileSync('/data.txt', 'Hello');
  mountPoint = myVfs.mount();

  fs.readFileSync(`${mountPoint}/data.txt`, 'utf8'); // 'Hello'
} // VFS is automatically unmounted here

fs.existsSync(`${mountPoint}/data.txt`); // false
```

### `vfs.unmount()`

<!-- YAML
added: v26.9.0
-->

解除虚拟文件系统的挂载。解除挂载后，无法再通过 `node:fs`、`require()` 或 `import` 访问虚拟文件。
再次调用 `mount()` 可重新挂载同一实例。

此方法是幂等的：对当前未挂载的 VFS 调用 `unmount()` 不会产生任何效果。

### `vfs.mounted`

<!-- YAML
added: v26.9.0
-->

* {boolean}

VFS 已挂载时为 `true`；否则为 `false`。

### `vfs.mountPoint`

<!-- YAML
added: v26.9.0
-->

* {string | null}

当前挂载点的绝对路径字符串（即最近一次调用 [`vfs.mount()`][] 返回的值）；如果 VFS 未挂载，则为 `null`。

### `vfs.mountPointURL`

<!-- YAML
added: v26.9.0
-->

* {string | null}

当前挂载点的 `file:` URL 字符串（将 [`vfs.mountPoint`][] 路径通过 [`url.pathToFileURL()`][] 转换而来）；如果 VFS 未挂载，则为 `null`。

此属性便于使用基于 URL 的 API（例如动态 `import()`）访问已挂载的文件：

```mjs
import vfs from 'node:vfs';

const myVfs = vfs.create();
myVfs.writeFileSync('/mod.mjs', 'export const value = 42;');
myVfs.mount();

const { value } = await import(`${myVfs.mountPointURL}/mod.mjs`);
console.log(value); // 42

myVfs.unmount();
```

### `vfs.provider`

<!-- YAML
added: v26.4.0
-->

* {VirtualProvider}

支持此 VFS 实例的提供程序。

### `vfs.readonly`

<!-- YAML
added: v26.4.0
-->

* {boolean}

当底层提供程序为只读时为 `true`。

### API

`VirtualFileSystem` 实现以下方法，其签名与相应的 [`node:fs`][] 方法匹配：

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
* `lchownSync(path, uid, gid)`
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
`ftruncate`、`link`、`mkdtemp`、`opendir`。每个方法都接受 Node.js 风格的
回调 `(err, ...result) => {}`。

#### Promise API

`vfs.promises` 提供基于 Promise 的变体：

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

此 Promise 命名空间对应于 `fs.promises`，包含 `readFile`、
`writeFile`、`appendFile`、`stat`、`lstat`、`readdir`、`mkdir`、`rmdir`、
`unlink`、`rename`、`copyFile`、`realpath`、`readlink`、`symlink`、
`access`、`rm`、`truncate`、`link`、`mkdtemp`、`chmod`、`chown`、`lchown`、
`utimes`、`lutimes`、`open`、`lchmod` 和 `watch`。

## 保留的根目录

只要有虚拟文件系统处于挂载状态，就可以通过 [`node:fs`][] 读取用于容纳挂载点的目录。
[`vfs.vfsBase()`][] 返回其路径 `path.join(os.devNull, 'vfs')`。该目录中包含每个已挂载文件系统对应的目录，目录名类似于其 [`vfs.mountPoint`][] 的最后一段。

```cjs
const vfs = require('node:vfs');
const fs = require('node:fs');
const path = require('node:path');

const root = vfs.vfsBase();
const assets = vfs.create();
assets.writeFileSync('/logo.svg', '<svg/>');
const mountPoint = assets.mount();

const name = path.basename(mountPoint);
fs.readdirSync(root); // [ name ]
fs.readdirSync(root, { recursive: true }); // [ name, `${name}/logo.svg` ]
```

根目录本身是只读的。创建、删除或更改其中的条目都会因 `EROFS` 而失败，而条目指向的文件系统仍可照常写入。没有任何文件系统挂载时，根目录不存在。

## 模块加载器集成

挂载 `VirtualFileSystem` 后，挂载点下的路径会参与模块解析和加载。由 [`require()`][] 和
[`require.resolve()`][] 使用的 [CommonJS 解析算法][]，以及由 `import` 和
[`import.meta.resolve()`][] 使用的 [ES 模块解析算法][]均保持不变；
相反，这些算法执行的每项文件系统操作都会根据正在探测的路径进行分派：挂载点下的路径由所属 VFS 提供服务，其他所有路径则由真实文件系统提供服务。因此，VFS 提供的文件会像一等模块一样运行。

由于已挂载路径位于磁盘上无法存在的保留命名空间中，任何给定路径都只会由一个 VFS 或真实文件系统提供服务，不会同时由两者提供服务。两者之间不存在搜索顺序或回退机制：如果挂载点下的路径在 VFS 中不存在，解析会因 `ENOENT` 失败，而不会查询磁盘；已挂载层也永远不会遮蔽真实目录。

在解析过程中，挂载点会被视为文件系统根目录：`package.json` 作用域查找和[从 `node_modules` 文件夹加载][]都会在挂载点处停止。例如，当 `${mountPoint}/foo/bar/main.cjs` 调用 `require('baz')` 时，会依次查找：

* `${mountPoint}/foo/bar/node_modules/baz`
* `${mountPoint}/foo/node_modules/baz`
* `${mountPoint}/node_modules/baz`
* 如果设置了 `$NODE_PATH`，则查找 `$NODE_PATH` 中列出的文件夹
* `$HOME/.node_modules/baz`
* `$HOME/.node_libraries/baz`
* `$PREFIX/lib/node/baz`

最后四项是[全局文件夹][]，属于旧版 CommonJS 行为，不适用于 `import`。绝对说明符可以双向跨越边界：真实文件系统上的模块可以 `require()` 已挂载路径，虚拟模块也可以 `require()` 真实路径。

```cjs
const vfs = require('node:vfs');

const myVfs = vfs.create();
myVfs.mkdirSync('/lib');
myVfs.writeFileSync('/lib/greet.js', 'module.exports = () => "hi";');
myVfs.writeFileSync(
  '/lib/package.json', '{"main": "./greet.js"}');
const mountPoint = myVfs.mount();

const greet = require(`${mountPoint}/lib`);
console.log(greet()); // 'hi'

myVfs.unmount();
```

对于 ECMAScript 模块，将已挂载路径传递给动态 `import()` 时，请使用 `file:` URL。[`vfs.mountPointURL`][] 会以这种形式提供挂载点；这样可以确保 VFS 导入具有跨平台可移植性，尤其是在已挂载路径采用 Windows 路径语法的 Windows 上。

```mjs
import vfs from 'node:vfs';

const myVfs = vfs.create();
myVfs.writeFileSync('/mod.mjs', 'export const value = 42;');
myVfs.mount();

const { value } = await import(`${myVfs.mountPointURL}/mod.mjs`);
console.log(value); // 42

myVfs.unmount();
```

从已挂载 VFS 加载的 CommonJS 模块，会通过以挂载点开头的 VFS 路径来标识。这会体现在模块中的 `__filename` 和 `__dirname` 等信息中，也会体现在涉及 VFS 模块函数的错误堆栈跟踪中。VFS 中的 ES 模块也会通过其 VFS 路径的 `file:` URL 来标识，例如，这会反映在 `import.meta.url` 中。

与从真实文件系统加载的模块一样，从 VFS 加载的模块会在首次加载时缓存。多次使用 `require()` 或 `import()` 加载位于已挂载 VFS 下的绝对路径或 URL 时，模块只会加载一次，后续调用会返回同一实例。

调用 [`vfs.unmount()`][] 会使从挂载点加载的模块失效：重新创建挂载后，再次 `require()` 或 `import` 该路径时，会从新挂载的 VFS 重新读取文件，而不是返回过期模块。从其他 VFS 实例或真实文件系统加载的模块不受影响。

挂载和解除挂载不会停止已经开始执行的模块，也不会使已执行 VFS 模块中已实例化的对象失效。与真实文件系统中的模块一样，调用方有责任避免在虚拟文件系统中的模块正在加载时删除或使其失效。

存储在已挂载 VFS 中的原生插件（`.node` 文件）也可以通过 `require()` 加载。操作系统的动态加载器无法打开虚拟路径，因此会从 VFS 读取插件的字节，并从私有的、会自动清理的临时映像中加载。真实文件系统上的插件不受影响，并会直接加载。

通过 [`ffi.dlopen()`][]（或 [`new ffi.DynamicLibrary()`][]）打开的共享库也采用相同方式：如果库路径位于已挂载 VFS 中，系统会检测到该路径，从 VFS 读取其字节，并从私有的、会自动清理的映像中加载该库，同时 `library.path` 仍报告虚拟路径。真实文件系统上的库则会直接加载。

## 与单可执行应用程序配合使用

作为在 SEA 配置中设置 `"useVfs": true` 构建的[单可执行应用程序][]运行时，打包的资源会自动作为只读虚拟文件系统挂载，注入的主脚本则从挂载根目录执行。无需额外设置。由于挂载点是保留的且在运行时选择，打包代码应通过相对于 `__dirname` 的路径和相对 `require()` 调用访问资源，而不是使用固定路径：

```cjs
// In the SEA main script, __dirname is the root of the mounted assets.
const fs = require('node:fs');
const path = require('node:path');

const config = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'));
const template = fs.readFileSync(
  path.join(__dirname, 'templates/index.html'), 'utf8');
```

支持 ESM 入口点（`"mainFormat": "module"`）：主模块通过 ESM 加载器从挂载内加载，且 `import.meta.dirname` 指向挂载根目录。

`"useVfs"` 不能与 `"useSnapshot"` 或 `"useCodeCache"` 一起使用。如果检测到任一组合，SEA 配置解析器会报错。

与其列出单个 `"assets"`，SEA 配置可以将 `"vfsArchive"` 指向预先构建的 ZIP 存档；此时挂载由嵌入式存档上的 [`ZipProvider`][] 提供支持，每个文件在读取时都会解压缩。详情请参阅[从 ZIP 存档提供资源][]。

有关使用资源创建 SEA 构建的更多信息，请参阅[单可执行应用程序][]文档。

## 类：`VirtualProvider`

<!-- YAML
added: v26.4.0
-->

所有 VFS 提供者的基类。子类实现基本原语（例如 `open`、`stat`、`readdir`、`mkdir`、`rmdir`、`unlink`、`rename` 等），并继承派生方法（例如 `readFile`、`writeFile`、`exists`、`copyFile`、`access` 等）的默认实现。

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
realVfs.writeFileSync('/file.txt', 'hello'); // 写入 /tmp/vfs-root/file.txt
```

### `realFSProvider.rootPath`

<!-- YAML
added: v26.4.0
-->

* {string}

用作根目录的已解析绝对路径。

## 类：`ZipProvider`

<!-- YAML
added: v26.9.0
-->

一个通过 VFS API 暴露 ZIP 存档条目的提供者，存档可以是 [`zlib.ZipBuffer`][]（在内存中）或 [`zlib.ZipFile`][]（在磁盘上）。`provider.readonly` 反映存档自身的 [`zipFile.writable`][] 标志：`ZipBuffer` 始终可写，而 `ZipFile` 仅在使用 `{ writable: true }` 打开时可写。

目录既可以显式识别（条目名称以 `/` 结尾），也可以隐式识别（任何以 `"<dir>/"` 开头的条目名称），两种情况下都会通过 `readdir()` 列出，包括使用 `{ recursive: true }` 时。由于 ZIP 成员无法原地编辑或读取，只能完整写入或完全解压缩，因此以写入模式打开的文件仅会在句柄关闭时提交其内容（作为新的存档条目）。

每个方法都有对应的同步方法（`openSync()`、`statSync()`、`readdirSync()` 等），由 [`zlib.ZipBuffer`][]/[`zlib.ZipFile`][] 提供的同样完整的同步接口支持。与这些方法一样，这里的同步方法会阻塞 Node.js 事件循环和后续 JavaScript 执行，直到操作（包括任何 deflate/inflate 过程）完成。

```cjs
const vfs = require('node:vfs');
const zlib = require('node:zlib');
const { readFileSync } = require('node:fs');

async function main() {
  const zip = new zlib.ZipBuffer(readFileSync('archive.zip'));
  const archiveVfs = vfs.create(new vfs.ZipProvider(zip));

  console.log(await archiveVfs.promises.readdir('/'));
  await archiveVfs.promises.writeFile('/new.txt', 'hello');
}
main();
```

### `new ZipProvider(source)`

<!-- YAML
added: v26.9.0
-->

* `source` {zlib.ZipBuffer|zlib.ZipFile} 已打开的存档。

## 实现细节

### `Stats` 对象

VFS `Stats` 对象是一个真正的 [`fs.Stats`][] 实例（如果请求 `{ bigint: true }`，则为 [`fs.BigIntStats`][] 实例）。其字段使用合成但稳定的值：

* `dev` 为 `4085`（VFS 设备 ID）。
* `ino` 在进程内单调递增。
* `blksize` 为 `4096`。
* `blocks` 为 `Math.ceil(size / 512)`。
* 默认情况下，时间设置为条目创建或最后修改的时刻。

[CommonJS resolution algorithm]: modules.md#all-together
[ES modules resolution algorithm]: esm.md#resolution-algorithm
[Explicit Resource Management]: https://github.com/tc39/proposal-explicit-resource-management
[从 ZIP 存档提供资源]: single-executable-applications.md#serving-the-assets-from-a-zip-archive-with-vfsarchive
[单可执行应用程序]: single-executable-applications.md
[`--import`]: cli.md#--importmodule
[`--require`]: cli.md#-r---require-module
[`--vfs-load`]: cli.md#--vfs-loadsource
[`MemoryProvider`]: #class-memoryprovider
[`RealFSProvider`]: #class-realfsprovider
[`VirtualFileSystem`]: #class-virtualfilesystem
[`VirtualProvider`]: #class-virtualprovider
[`ZipProvider`]: #class-zipprovider
[`ffi.dlopen()`]: ffi.md#ffidlopenpath-definitions
[`fs.BigIntStats`]: fs.md#class-fsstats
[`fs.Stats`]: fs.md#class-fsstats
[`fs.rename()`]: fs.md#fsrenameoldpath-newpath-callback
[`fs.rm()`]: fs.md#fsrmpath-options-callback
[`fs.rmdir()`]: fs.md#fsrmdirpath-options-callback
[`import.meta.resolve()`]: esm.md#importmetaresolvespecifier
[`new ffi.DynamicLibrary()`]: ffi.md#new-dynamiclibrarypath
[`node:fs`]: fs.md
[`require()`]: modules.md#requireid
[`require.resolve()`]: modules.md#requireresolverequest-options
[`url.pathToFileURL()`]: url.md#urlpathtofileurlpath-options
[`vfs.mount()`]: #vfsmount
[`vfs.mountPointURL`]: #vfsmountpointurl
[`vfs.mountPoint`]: #vfsmountpoint
[`vfs.unmount()`]: #vfsunmount
[`vfs.vfsBase()`]: #vfsvfsbase
[`zipFile.writable`]: zlib.md#zipfilewritable
[`zlib.ZipBuffer`]: zlib.md#class-zlibzipbuffer
[`zlib.ZipFile`]: zlib.md#class-zlibzipfile
[loading from `node_modules` folders]: modules.md#loading-from-node_modules-folders
[reserved root directory]: #the-reserved-root-directory
[the global folders]: modules.md#loading-from-the-global-folders
