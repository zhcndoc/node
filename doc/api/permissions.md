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
    description: This feature is no longer experimental.
-->

> 稳定性：2 - 稳定

Node.js 权限模型是一种在执行期间限制访问特定资源的机制。
该 API 位于标志 [`--permission`][] 之后，启用时将限制访问所有可用权限。

可用权限由 [`--permission`][] 标志文档说明。

当使用 `--permission` 启动 Node.js 时，通过 `fs` 模块访问文件系统、访问网络、生成进程、使用 `node:worker_threads`、使用原生插件、使用 WASI 以及启用运行时检查器的能力将受到限制（不会创建 SIGUSR1 的监听器）。

```console
$ node --permission index.js

Error: Access to this API has been restricted
    at node:internal/main/run_main_module:23:47 {
  code: 'ERR_ACCESS_DENIED',
  permission: 'FileSystemRead',
  resource: '/home/user/index.js'
}
```

允许访问生成进程和创建工作线程可以分别使用 [`--allow-child-process`][] 和 [`--allow-worker`][] 来完成。

要允许网络访问，请使用 [`--allow-net`][]，对于在使用权限模型时允许原生插件，请使用 [`--allow-addons`][] 标志。对于 WASI，请使用 [`--allow-wasi`][] 标志。

#### 运行时 API

当通过 [`--permission`][] 标志启用权限模型时，`process` 对象会添加一个新属性 `permission`。
此属性包含一个函数：

##### `permission.has(scope[, reference])`

在运行时检查权限的 API 调用（[`permission.has()`][]）

```js
process.permission.has('fs.write'); // true
process.permission.has('fs.write', '/home/rafaelgss/protected-folder'); // true

process.permission.has('fs.read'); // true
process.permission.has('fs.read', '/home/rafaelgss/protected-folder'); // false
```

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

传递通配符字符 (`*`) 后，所有后续字符将被忽略。例如：`/home/*.js` 的工作方式类似于 `/home/*`。

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
    "allow-addons": false
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
* 权限模型在 Node.js 环境设置完成后初始化。但是，某些标志（如 `--env-file` 或 `--openssl-config`）旨在在环境初始化之前读取文件。因此，此类标志不受权限模型规则的约束。同样适用于可以通过运行时 `v8.setFlagsFromString` 设置的 V8 标志。
* 启用权限模型时，无法在运行时请求 OpenSSL 引擎，这会影响内置的 crypto、https 和 tls 模块。
* 启用权限模型时，无法加载运行时可加载扩展，这会影响 sqlite 模块。
* 通过 `node:fs` 模块使用现有文件描述符会绕过权限模型。

#### 限制和已知问题

* 符号链接将被跟随，即使指向未授予访问权限的路径位置。相对符号链接可能允许访问任意文件和目录。当启用权限模型启动应用程序时，必须确保授予访问权限的路径不包含相对符号链接。

[安全策略]: https://github.com/nodejs/node/blob/main/SECURITY.md
[`--allow-addons`]: cli.md#--allow-addons
[`--allow-child-process`]: cli.md#--allow-child-process
[`--allow-fs-read`]: cli.md#--allow-fs-read
[`--allow-fs-write`]: cli.md#--allow-fs-write
[`--allow-net`]: cli.md#--allow-net
[`--allow-wasi`]: cli.md#--allow-wasi
[`--allow-worker`]: cli.md#--allow-worker
[`--permission`]: cli.md#--permission
[`npx`]: https://docs.npmjs.com/cli/commands/npx
[`permission.has()`]: process.md#processpermissionhasscope-reference
