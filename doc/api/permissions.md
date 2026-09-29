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

使用 `--permission` 启动 Node.js 时，通过 `fs` 模块访问文件系统、访问网络、访问环境变量、生成进程、使用 `node:worker_threads`、使用原生插件、使用 WASI、使用 FFI 以及启用运行时检查器的能力都会受到限制（不会创建 SIGUSR1 的监听器）。

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

要授予访问环境变量的权限，请使用 [`--allow-env`][]。

要允许访问网络，请使用 [`--allow-net`][]；在使用权限模型时，要允许使用原生插件，请使用 [`--allow-addons`][] 标志。对于 WASI，请使用 [`--allow-wasi`][] 标志。对于 FFI，请使用 [`--allow-ffi`][] 标志。`node:ffi`（[`node:ffi`](ffi.md)）模块仅在支持 FFI 的构建中可用。

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
const config = fs.readFileSync('/etc/myapp/config.json');

// 初始化后撤销对 /etc/myapp 的读取访问
process.permission.drop('fs.read', '/etc/myapp');

// 现在将返回 false
process.permission.has('fs.read', '/etc/myapp/config.json'); // false

// 完全撤销子进程权限
process.permission.drop('child');
```

#### 审计模式

[`--permission-audit`][] 标志会为权限模型启用审计模式。
在审计模式下，会执行权限检查，但**不会**拒绝访问——不会抛出 `ERR_ACCESS_DENIED` 错误。相反，每次权限违规都会通过 `node:diagnostics_channel` 模块发布，使应用程序能够观察并记录在强制模式下会被拒绝的操作。执行会正常继续。

审计模式有助于在使用 [`--permission`][] 部署之前，发现应用程序所需的权限。它也可以与 [`--allow-fs-read`][]、[`--allow-fs-write`][]、[`--allow-net`][]、[`--allow-env`][]、[`--allow-child-process`][]、[`--allow-worker`][]、[`--allow-addons`][]、[`--allow-wasi`][] 和 [`--allow-ffi`][] 标志组合使用，以审计部分权限，同时授予其他权限。

当审计模式下的权限检查失败时，会向与被拒绝作用域相对应的诊断通道发布消息。通道名称如下：

* `node:permission-model:fs` — 文件系统（读取和写入）
* `node:permission-model:net` — 网络
* `node:permission-model:child` — 子进程
* `node:permission-model:worker` — 工作线程
* `node:permission-model:inspector` — 检查器
* `node:permission-model:wasi` — WASI
* `node:permission-model:addon` — 原生插件
* `node:permission-model:ffi` — FFI
* `node:permission-model:env` — 环境变量

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
$ node -r /path/to/custom-require.js --permission index.js
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

某些 `node:fs` 操作针对已打开的文件描述符而非路径执行，因此无法与 `--allow-fs-read` 或 `--allow-fs-write` 授权关联。启用权限模型时，这些操作会被禁用并抛出 `ERR_ACCESS_DENIED`，无论文件描述符是通过何种方式获取的。这既适用于顶层的 `node:fs` 函数，也适用于对应的 `FileHandle` 方法，目前包括 `fsync`／`fdatasync`、`fchmod` 和 `fchown`（以及它们的同步版本）。

#### 环境变量权限

强制执行权限模型时，进程只能访问 [`--allow-env`][] 授权访问的环境变量。

Node.js 不会逐一检查每次访问，而是在启动时、任何 JavaScript 代码运行之前以及 Node.js 启动任何其他线程之前，从进程环境中移除所有其他变量。被移除的变量不会出现在任何暴露进程环境的地方：`process.env`、诊断报告、调用 `getenv()` 的原生代码、工作线程，以及子进程继承的环境中。

```console
$ node --permission --allow-env=PORT --allow-env=APP_* index.js
```

该标志的有效参数为：

* `*` - 授予对每个环境变量的访问权限。不会移除任何变量。
* 变量名称，例如 `PORT`。
* 后接 `*` 的变量名称前缀，例如 `APP_*`。

某些变量始终会保留：

* Node.js 及其打包的依赖项在启动后读取的变量，例如 `NODE_OPTIONS`、`NODE_EXTRA_CA_CERTS`、`PATH`、`HOME`、`TMPDIR`、`TZ`、`LANG`、`SSL_CERT_FILE`，以及终端颜色检测所读取的变量。其他名称以 `NODE_` 开头的变量（例如 `NODE_AUTH_TOKEN`）不会保留。
* 在传递给 [`--env-file`][] 和 [`--env-file-if-exists`][] 的文件中定义的变量。如果某个变量在此类文件中定义，同时也从父进程继承，并且 `--allow-env` 未授予对它的访问权限，则会移除继承的值并使用文件中的值。

`NODE_ENV` 也不会保留。Node.js 不会读取它，但许多应用程序和库会读取，并将其未设置视为开发环境。请明确授予对它的访问权限：

```console
$ node --permission --allow-env=NODE_ENV index.js
```

代理 URL 通常包含凭据，因此 `HTTP_PROXY`、`HTTPS_PROXY` 和 `NO_PROXY` 变量及其小写形式不会保留。使用 [`--use-env-proxy`][] 时，请明确授予对它们的访问权限。启用 `--use-env-proxy` 且这些变量中的任何一个在启动时被移除时，会发出一条列出这些变量名称的警告。

Node.js 代表应用程序加载的原生代码（例如插件、OpenSSL 提供程序和 STORE 加载器），以及它们随后加载的库，都会看到同一个经过缩减的环境。只会保留 OpenSSL 自身读取的变量，而不会保留它加载的第三方模块读取的变量。例如，由 SoftHSM 支持的 PKCS#11 提供程序需要 `SOFTHSM2_CONF` 来查找其令牌，没有该变量就无法初始化。请明确授予对此类变量的访问权限：

```console
$ node --permission --allow-openssl-store --allow-env=SOFTHSM2_CONF index.js
```

读取启动时被移除的变量会返回 `undefined`、首次读取时发出警告，并向 `node:permission-model:env` 诊断通道发布消息。

运行时设置的变量（例如使用 `process.env.KEY = 'value'` 或 [`process.loadEnvFile()`][] 设置的变量）不受限制，因为它们无法揭示哪些变量已被移除。

使用 [`permission.drop()`][] 移除变量会将其从环境中删除。移除整个 `env` 作用域会删除除 Node.js 自身读取的变量以外的所有变量。这样一来，就可以在初始化期间读取机密，然后将其移除：

```js
const databaseUrl = process.env.DATABASE_URL;
process.permission.drop('env', 'DATABASE_URL');
```

强制执行权限模型的进程生成子进程时，子进程会以 `--allow-env=*` 启动：它继承的环境中只包含父进程有权访问的变量。子进程仍可在 Linux 上读取自己的 `/proc/<pid>/environ`，但不能读取任何其他进程的该文件，详见下文。

在审计模式下，不会移除任何变量。对 `--allow-env` 未授权访问的变量进行访问时，会向 `node:permission-model:env` 诊断通道发布消息。

在 Linux 上，`/proc/<pid>/environ` 会暴露进程启动时的环境。强制执行权限模型时，无论 [`--allow-fs-read`][] 如何设置，读取任何其他进程（包括父进程及其祖先进程）的 `/proc/<pid>/environ` 文件都会被拒绝。只有使用 `--allow-env=*` 才允许读取进程自身的文件。检查前会解析符号链接，因此通过 `/dev/fd/../environ` 等路径间接访问这些文件也会被拒绝。

此外，被移除的变量会在进程的初始环境块中被覆盖，因此其他进程也无法在其 `/proc/<pid>/environ` 中找到这些变量。之后使用 [`permission.drop()`][] 移除的变量也会在该处被覆盖。

这些措施不会改变其他进程的环境。获得 [`--allow-child-process`][] 授权的进程可以通过其他程序读取它们的环境。

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

配置文件（如 [`--env-file`][] 文件中定义的 `NODE_OPTIONS`）可能由正在运行的项目控制，而非由启动 Node.js 的人控制。当命令行或 `NODE_OPTIONS` 环境变量启用权限模型时，这些文件所定义的 `allow-env` 值只能缩小 [`--allow-env`][] 授予的访问范围，而不能扩大：

```console
$ node --permission --allow-env=APP_* --experimental-config-file=node.config.json app.js
```

如果 `node.config.json` 中包含 `"allow-env": ["*"]`，则只会保留以 `APP_` 开头的变量。如果包含 `"allow-env": ["APP_DATABASE_URL", "OTHER"]`，则只会保留 `APP_DATABASE_URL`。

#### 使用 `npx` 时使用权限模型

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

* 权限模型不会继承到工作线程。默认的 `worker_threads.Worker`（未设置 `execArgv` 选项）仍会接收父进程的 CLI 标志，包括传递给父进程的 `--permission` 和 `--allow-*`。显式设置 `execArgv`（包括 `execArgv: []`）会替换继承的标志。此时，除非在 `execArgv` 中再次列出这些标志，否则工作线程不会保留父进程的权限模型授权。这是有意为之的差异，并非绕过。
* 使用权限模型时，以下功能将受到限制：
  * 原生模块
  * 网络
  * 环境变量
  * 子进程
  * 工作线程
  * Inspector 协议
  * 文件系统访问
  * WASI
  * FFI
  * OpenSSL STORE 加载器
* 权限模型会在 Node.js 环境设置完成后初始化。不过，某些标志（例如 `--env-file` 或 `--openssl-config`）会在环境初始化前读取文件。因此，这些标志不受权限模型规则约束。通过 `v8.setFlagsFromString` 在运行时设置的 V8 标志也同样如此。
* Node.js 自身在由操作员标志选定的位置创建、写入或读取的文件，可能不会始终受到权限模型检查，特别是在该标志接受会展开为多个路径的模板或模式时。例如，即使展开后的路径不在 `--allow-fs-write` 的授权范围内，`--trace-event-file-pattern`（`${rotation}`）轮换生成的跟踪文件仍可能被写入。由于位置由操作员选择，此类疏漏被视为常规 bug，而非漏洞。请通过常规问题跟踪器报告。
* 启用权限模型时，无法在运行时请求 OpenSSL 引擎，这会影响内置的 crypto、https 和 tls 模块。
* 启用权限模型时，无法加载运行时可加载扩展，这会影响 sqlite 模块。
* 通过 `node:fs` 模块使用已有的文件描述符会绕过权限模型。

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
[`--allow-env`]: cli.md#--allow-env
[`--allow-ffi`]: cli.md#--allow-ffi
[`--allow-fs-read`]: cli.md#--allow-fs-read
[`--allow-fs-write`]: cli.md#--allow-fs-write
[`--allow-net`]: cli.md#--allow-net
[`--allow-openssl-store`]: cli.md#--allow-openssl-store
[`--allow-wasi`]: cli.md#--allow-wasi
[`--allow-worker`]: cli.md#--allow-worker
[`--env-file-if-exists`]: cli.md#--env-file-if-existsfile
[`--env-file`]: cli.md#--env-filefile
[`--permission-audit`]: cli.md#--permission-audit
[`--permission`]: cli.md#--permission
[`--use-env-proxy`]: cli.md#--use-env-proxy
[`crypto.createPrivateKey()`]: crypto.md#cryptocreateprivatekeykey
[`npx`]: https://docs.npmjs.com/cli/commands/npx
[`permission.drop()`]: process.md#processpermissiondropscope-reference
[`permission.has()`]: process.md#processpermissionhasscope-reference
[`process.loadEnvFile()`]: process.md#processloadenvfilepath
