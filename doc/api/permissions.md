# 权限

<!--introduced_in=v20.0.0-->

权限可用于控制 Node.js 进程可以访问哪些系统资源，或者进程可以使用这些资源执行哪些操作。

* [基于进程的权限](#process-based-permissions) 控制 Node.js 进程对资源的访问。
  资源可以被完全允许或拒绝，或者可以控制与之相关的操作。例如，可以允许文件系统读取而拒绝写入。
  此功能不能防范恶意代码。根据 Node.js [安全策略][]，Node.js 信任任何被要求运行的代码。

权限模型实现了一种“安全带”方法，防止受信任的代码无意中更改文件或访问未明确授予权限的资源。它在存在恶意代码的情况下不提供安全保证。恶意代码可以绕过权限模型并在不受权限模型限制的情况下执行任意代码。

如果您发现潜在的安全漏洞，请参阅我们的 [安全策略][]。

## 基于进程的权限

### 权限模型

<!-- YAML
added: v20.0.0
changes:
  - version:
    - v23.5.0
    - v22.13.0
    pr-url: https://github.com/nodejs/node/pull/56201
    description: 此功能不再是实验性功能。
-->

> 稳定性：2 - 稳定

Node.js 权限模型是一种在执行期间限制访问特定资源的机制。
该 API 位于标志 [`--permission`][] 之后，启用时将限制访问所有可用权限。

可用权限由 [`--permission`][] 标志文档说明。

权限模型有两种运行模式：

* **强制模式**（使用 [`--permission`][] 时的默认模式）：对于进程未获准执行的任何操作，访问都会被拒绝，并抛出 `ERR_ACCESS_DENIED` 错误。
* **审计模式**（使用 [`--permission-audit`][] 时）：会执行权限检查，并通过诊断通道发布违规信息，但**不会**拒绝访问。执行会正常继续。此模式适用于在使用强制模式部署之前，发现应用程序所需的权限。

使用 `--permission` 启动 Node.js 时，
通过 `fs` 模块访问文件系统、访问网络、生成进程、使用 `node:worker_threads`、使用原生插件、使用 WASI、使用 FFI 以及启用运行时检查器的能力都会受到限制（不会创建 SIGUSR1 的监听器）。

```console
$ node --permission index.js

Error: Access to this API has been restricted
    at node:internal/main/run_main_module:23:47 {
  code: 'ERR_ACCESS_DENIED',
  permission: 'FileSystemRead',
  resource: '/home/user/index.js'
}
```

允许访问生成进程并创建工作线程可分别使用 [`--allow-child-process`][] 和 [`--allow-worker`][] 来完成。

要允许网络访问，使用 [`--allow-net`][]；在使用权限模型时允许原生插件，使用 [`--allow-addons`][] 标志。对于 WASI，使用 [`--allow-wasi`][] 标志。对于 FFI，使用 [`--allow-ffi`][] 标志。[`node:ffi`](ffi.md) 模块还需要 `--experimental-ffi` 标志，并且仅在支持 FFI 的构建版本中可用。

要允许使用 OpenSSL STORE 加载器（例如，从传递给 [`crypto.createPrivateKey()`][] 的 {URL} 中加载私钥），请使用 [`--allow-openssl-store`][] 标志。
此标志会向已配置的 OpenSSL STORE 加载器授予广泛权限；这些加载器可能会访问文件、设备、令牌或网络。加载器执行的访问不受 `fs.read`、`fs.write` 或 `net` 权限范围的限制。

#### 运行时 API

通过 [`--permission`][] 或 [`--permission-audit`][] 标志启用权限模型时，
`process` 对象会新增一个 `permission` 属性。此属性包含以下函数：

##### `permission.has(scope[, reference])`

在运行时检查权限的 API 调用（[`permission.has()`][]）

```js
process.permission.has('fs.write'); // true
process.permission.has('fs.write', '/home/rafaelgss/protected-folder'); // true

process.permission.has('fs.read'); // true
process.permission.has('fs.read', '/home/rafaelgss/protected-folder'); // false
```

##### `permission.drop(scope[, reference])`

在运行时撤销权限的 API 调用。此操作是**不可逆**的。

如果不传入 reference，则会撤销整个作用域；如果传入 reference，则只会撤销该特定资源的权限。撤销权限只会影响未来的访问检查。它不会关闭或撤销已经打开的资源的访问权限，例如文件描述符、网络套接字、子进程或工作线程。应用程序负责在不再需要这些资源时关闭或终止它们。

您只能撤销明确授予的精确资源。传递给 `drop()` 的 reference 必须与原始授予内容匹配。如果权限是使用通配符（`*`）授予的，则只能通过不传入 reference 调用 `drop()` 来撤销整个作用域。如果授予的是目录（例如 `--allow-fs-read=/my/folder`），则不能撤销其中的单个文件——必须撤销最初授予的同一个目录。

```js
const fs = require('node:fs');

// 在启动时读取配置，此时我们仍然拥有权限
const config = fs.readFileSync('/etc/myapp/config.json', 'utf8');

// 初始化后撤销对 /etc/myapp 的读取访问
process.permission.drop('fs.read', '/etc/myapp');

// 现在这将抛出 ERR_ACCESS_DENIED
process.permission.has('fs.read', '/etc/myapp/config.json'); // false

// 完全撤销子进程权限
process.permission.drop('child');
```

#### 审计模式

[`--permission-audit`][] 标志会为权限模型启用审计模式。
在审计模式下，会执行权限检查，但**不会**拒绝访问——不会抛出 `ERR_ACCESS_DENIED` 错误。相反，每次权限违规都会通过 `node:diagnostics_channel` 模块发布，使应用程序能够观察并记录在强制模式下会被拒绝的操作。执行会正常继续。

审计模式适用于在使用 [`--permission`][] 部署之前，发现应用程序所需的权限。它还可以与 [`--allow-fs-read`] []、[`--allow-fs-write`][]、[`--allow-net`][]、
[`--allow-child-process`][]、[`--allow-worker`][]、[`--allow-addons`][]、
[`--allow-wasi`][] 和 [`--allow-ffi`][] 标志结合使用，在授予其他权限的同时审计部分权限。

当审计模式下的权限检查失败时，会向与被拒绝作用域相对应的诊断通道发布消息。通道名称如下：

* `node:permission-model:fs` — 文件系统（读取和写入）
* `node:permission-model:net` — 网络
* `node:permission-model:child` — 子进程
* `node:permission-model:worker` — 工作线程
* `node:permission-model:inspector` — 检查器
* `node:permission-model:wasi` — WASI
* `node:permission-model:addon` — 原生插件
* `node:permission-model:ffi` — FFI

每条消息都是一个包含以下属性的对象：

* `permission` {string} 被拒绝的权限作用域名称。
* `resource` {string} 被拒绝访问的资源（例如文件路径或主机）。

```js
const diagnostics_channel = require('node:diagnostics_channel');

diagnostics_channel.channel('node:permission-model:fs').subscribe((msg) => {
  console.log(`Permission denied: ${msg.permission} on ${msg.resource}`);
});

// 使用 --permission-audit 运行时，这会发布诊断通道消息
// 但不会抛出错误
const fs = require('node:fs');
fs.readFileSync('/etc/passwd');
```

如果同时指定 [`--permission`][] 和 [`--permission-audit`][]，
则 [`--permission`][] 优先，权限模型将以强制模式运行。

#### 文件系统权限

权限模型默认情况下通过 `node:fs` 模块限制对文件系统的访问。
它不保证用户无法通过其他方式访问文件系统，例如通过 `node:sqlite` 模块。

要允许访问文件系统，请使用 [`--allow-fs-read`][] 和 [`--allow-fs-write`][] 标志：

```console
$ node --permission --allow-fs-read=* --allow-fs-write=* index.js
Hello world!
```

默认情况下，应用程序的入口点包含在允许的文件系统读取列表中。例如：

```console
$ node --permission index.js
```

* `index.js` 将包含在允许的文件系统读取列表中

```console
$ node -r /path/to/custom-require.js --permission index.js.
```

* `/path/to/custom-require.js` 将包含在允许的文件系统读取列表中。
* `index.js` 将包含在允许的文件系统读取列表中。

这两个标志的有效参数为：

* `*` - 分别允许所有 `FileSystemRead` 或 `FileSystemWrite` 操作。
* 相对于当前工作目录的路径。
* 绝对路径。

示例：

* `--allow-fs-read=*` - 它将允许所有 `FileSystemRead` 操作。
* `--allow-fs-write=*` - 它将允许所有 `FileSystemWrite` 操作。
* `--allow-fs-write=/tmp/` - 它将允许对 `/tmp/` 文件夹的 `FileSystemWrite` 访问。
* `--allow-fs-read=/tmp/ --allow-fs-read=/home/.gitignore` - 它允许对 `/tmp/` 文件夹 **和** `/home/.gitignore` 路径的 `FileSystemRead` 访问。

也支持通配符：

* `--allow-fs-read=/home/test*` 将允许读取访问所有匹配通配符的内容。例如：`/home/test/file1` 或 `/home/test2`

在传递通配符字符 (`*`) 后，所有后续字符将被忽略。例如：`/home/*.js` 的工作方式类似于 `/home/*`。

当权限模型初始化时，如果指定的目录存在，它将自动添加通配符 (\*)。例如，如果 `/home/test/files` 存在，它将被视为 `/home/test/files/*`。但是，如果目录不存在，则不会添加通配符，访问将限制为 `/home/test/files`。如果要允许访问尚不存在的文件夹，请确保显式包含通配符：`/my-path/folder-do-not-exist/*`。

#### 配置文件支持

除了在命令行上传递权限标志外，在使用实验性 [`--experimental-config-file`][] 标志时，也可以在 Node.js 配置文件中声明它们。权限选项必须放在 `permission` 顶层对象内。

示例 `node.config.json`：

```json
{
  "permission": {
    "allow-fs-read": ["./foo"],
    "allow-fs-write": ["./bar"],
    "allow-child-process": true,
    "allow-worker": true,
    "allow-net": true,
    "allow-addons": false,
    "allow-ffi": false,
    "allow-openssl-store": false
  }
}
```

当配置文件中存在 `permission` 命名空间时，Node.js 会自动启用 `--permission` 标志。运行方式：

```console
$ node --experimental-default-config-file app.js
```

#### 与 `npx` 一起使用权限模型

如果您使用 [`npx`][] 执行 Node.js 脚本，可以通过传递 `--node-options` 标志来启用权限模型。例如：

```bash
npx --node-options="--permission" package-name
```

这将为由 [`npx`][] 生成的所有 Node.js 进程设置 `NODE_OPTIONS` 环境变量，而不影响 `npx` 进程本身。

**使用 `npx` 时的 FileSystemRead 错误**

上述命令可能会抛出 `FileSystemRead` 无效访问错误，因为 Node.js 需要文件系统读取访问权限来定位和执行包。要避免这种情况：

1. **使用全局安装的包**
   通过运行以下命令授予对全局 `node_modules` 目录的读取访问权限：

   ```bash
   npx --node-options="--permission --allow-fs-read=$(npm prefix -g)" package-name
   ```

2. **使用 `npx` 缓存**
   如果您是临时安装包或依赖 `npx` 缓存，请授予对 npm 缓存目录的读取访问权限：

   ```bash
   npx --node-options="--permission --allow-fs-read=$(npm config get cache)" package-name
   ```

任何通常传递给 `node` 的参数（例如 `--allow-*` 标志）也可以通过 `--node-options` 标志传递。这种灵活性使得在使用 `npx` 时可以轻松按需配置权限。

#### 权限模型约束

在使用此系统之前，您需要了解一些约束：

* 该模型不会继承到工作线程。
* 使用权限模型时，以下功能将受到限制：
  * 原生模块
  * 网络
  * 子进程
  * 工作线程
  * 检查器协议
  * 文件系统访问
  * WASI
  * FFI
  * OpenSSL STORE 加载器
* 权限模型会在 Node.js 环境设置完成后初始化。
  但是，某些标志（例如 `--env-file` 或 `--openssl-config`）设计为在环境初始化之前读取文件。因此，这些标志不受权限模型规则的约束。通过 `v8.setFlagsFromString` 在运行时设置的 V8 标志也同样不受约束。
* 启用权限模型后，无法在运行时请求 OpenSSL 引擎，这会影响内置的 crypto、https 和 tls 模块。
* 启用权限模型后，无法加载运行时可加载扩展，这会影响 sqlite 模块。
* 通过 `node:fs` 模块使用现有文件描述符会绕过权限模型。

#### `process._debugProcess()` 和跨进程 Inspector 激活

`kInspector` 权限作用域会限制当前进程打开自身 V8 Inspector 的能力。然而，
`process._debugProcess(pid)`——它会向外部进程发送操作系统级信号（在 POSIX 上为 SIGUSR1，在 Windows 上为远程线程）——
不受 `kInspector` 作用域或任何其他权限模型作用域的约束。

在 `--permission` 下运行且没有额外授权的受限进程可以调用 `process._debugProcess(pid)`，
强制另一个 Node.js 进程打开其 V8 Inspector。目标进程不需要在 `--permission` 下运行即可生效——
任何在同一主机上、同一 OS 用户下运行的 Node.js 进程都可以被发出信号。

这与 Node.js 的威胁模型一致：Node.js 信任其运行所在的操作系统环境。跨进程信号传递是操作系统级能力；限制它是操作人员的责任（例如，在 Linux 上使用操作系统级进程隔离、每个进程使用不同的 OS 用户，或使用 seccomp/AppArmor 配置文件）。

依赖 `--permission` 来隔离不受信任代码的开发者应注意：

* 任何没有授权的受限进程都可以调用 `process._debugProcess()`。
* 如果目标 Node.js 进程在同一主机上以同一 OS 用户运行，它可以通过此 API 被强制打开 Inspector。
* 为防止这种情况，请在不同的 OS 用户下运行受限进程和目标进程，或者使用 Node.js 之外的操作系统级隔离机制。

#### 限制与已知问题

* 符号链接将被跟随，即使指向未授予访问权限的路径位置。相对符号链接可能允许访问任意文件和目录。当启用权限模型启动应用程序时，必须确保授予访问权限的路径不包含相对符号链接。

[安全策略]: https://github.com/nodejs/node/blob/main/SECURITY.md
[`--allow-addons`]: cli.md#--allow-addons
[`--allow-child-process`]: cli.md#--allow-child-process
[`--allow-ffi`]: cli.md#--allow-ffi
[`--allow-fs-read`]: cli.md#--allow-fs-read
[`--allow-fs-write`]: cli.md#--allow-fs-write
[`--allow-net`]: cli.md#--allow-net
[`--allow-openssl-store`]: cli.md#--allow-openssl-store
[`--allow-wasi`]: cli.md#--allow-wasi
[`--allow-worker`]: cli.md#--allow-worker
[`--permission-audit`]: cli.md#--permission-audit
[`--permission`]: cli.md#--permission
[`crypto.createPrivateKey()`]: crypto.md#cryptocreateprivatekeykey
[`npx`]: https://docs.npmjs.com/cli/commands/npx
[`permission.has()`]: process.md#processpermissionhasscope-reference
