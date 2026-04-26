# 操作系统

<!--introduced_in=v0.10.0-->

> 稳定性：2 - 稳定

<!-- source_link=lib/os.js -->

`node:os` 模块提供与操作系统相关的实用方法和属性。可以使用以下方式访问：

```mjs
import os from 'node:os';
```

```cjs
const os = require('node:os');
```

## `os.EOL`

<!-- YAML
added: v0.7.8
-->

* 类型：{string}

操作系统特定的行尾标记。

* `\n` 在 POSIX 上
* `\r\n` 在 Windows 上

## `os.availableParallelism()`

<!-- YAML
added:
  - v19.4.0
  - v18.14.0
-->

* 返回值：{integer}

返回程序应使用的默认并行量的估计值。始终返回大于零的值。

此函数是 libuv 的 [`uv_available_parallelism()`][] 的一个小包装。

## `os.arch()`

<!-- YAML
added: v0.5.0
-->

* 返回值：{string}

返回编译 Node.js 二进制文件的操作系统的 CPU 架构。可能的值是 `'arm'`、`'arm64'`、`'ia32'`、`'loong64'`、`'mips'`、`'mipsel'`、`'ppc64'`、`'riscv64'`、`'s390x'` 和 `'x64'`。

返回值等同于 [`process.arch`][]。

## `os.constants`

<!-- YAML
added: v6.3.0
-->

* 类型：{Object}

包含常用的操作系统特定常量，用于错误代码、进程信号等。定义的具体常量在 [操作系统常量](#os-constants) 中描述。

## `os.cpus()`

<!-- YAML
added: v0.3.3
-->

* 返回值：{Object\[]}

返回一个对象数组，包含有关每个逻辑 CPU 核心的信息。如果无法获取 CPU 信息，例如 `/proc` 文件系统不可用，则数组将为空。

每个对象包含的属性包括：

* `model` {string}
* `speed` {number}（单位：MHz）
* `times` {Object}
  * `user` {number} CPU 在用户模式下花费的毫秒数。
  * `nice` {number} CPU 在 nice 模式下花费的毫秒数。
  * `sys` {number} CPU 在系统模式下花费的毫秒数。
  * `idle` {number} CPU 在空闲模式下花费的毫秒数。
  * `irq` {number} CPU 在中断请求模式下花费的毫秒数。

<!-- eslint-disable @stylistic/js/semi -->

```js
[
  {
    model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
    speed: 2926,
    times: {
      user: 252020,
      nice: 0,
      sys: 30340,
      idle: 1070356870,
      irq: 0,
    },
  },
  {
    model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
    speed: 2926,
    times: {
      user: 306960,
      nice: 0,
      sys: 26980,
      idle: 1071569080,
      irq: 0,
    },
  },
  {
    model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
    speed: 2926,
    times: {
      user: 248450,
      nice: 0,
      sys: 21750,
      idle: 1070919370,
      irq: 0,
    },
  },
  {
    model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
    speed: 2926,
    times: {
      user: 256880,
      nice: 0,
      sys: 19430,
      idle: 1070905480,
      irq: 20,
    },
  },
]
```

`nice` 值仅限 POSIX。在 Windows 上，所有处理器的 `nice` 值始终为 0。

`os.cpus().length` 不应被用于计算应用程序可用的并行量。为此请使用 [`os.availableParallelism()`](#osavailableparallelism)。

## `os.devNull`

<!-- YAML
added:
  - v16.3.0
  - v14.18.0
-->

* 类型：{string}

特定平台的空设备文件路径。

* `\\.\nul` 在 Windows 上
* `/dev/null` 在 POSIX 上

## `os.endianness()`

<!-- YAML
added: v0.9.4
-->

* 返回值：{string}

返回一个字符串，标识编译 Node.js 二进制文件的 CPU 的字节序。

可能的值是 `'BE'` 表示大端序，`'LE'` 表示小端序。

## `os.freemem()`

<!-- YAML
added: v0.3.3
-->

* 返回值：{integer}

以整数形式返回空闲系统内存量（字节）。

## `os.getPriority([pid])`

<!-- YAML
added: v10.10.0
-->

* `pid` {integer} 要检索调度优先级的进程 ID。**默认值：** `0`。
* 返回值：{integer}

返回由 `pid` 指定的进程的调度优先级。如果未提供 `pid` 或为 `0`，则返回当前进程的优先级。

## `os.homedir()`

<!-- YAML
added: v2.3.0
-->

* 返回值：{string}

返回当前用户主目录的字符串路径。

在 POSIX 上，如果定义了 `$HOME` 环境变量，则使用它。否则，它使用 [有效 UID][EUID] 查找用户的主目录。

在 Windows 上，如果定义了 `USERPROFILE` 环境变量，则使用它。否则，它使用当前用户的配置文件目录路径。

## `os.hostname()`

<!-- YAML
added: v0.3.3
-->

* 返回值：{string}

以字符串形式返回操作系统的主机名。

## `os.loadavg()`

<!-- YAML
added: v0.3.3
-->

* 返回值：{number\[]}

返回一个包含 1 分钟、5 分钟和 15 分钟平均负载的数组。

平均负载是操作系统计算的系统活动度量，表示为分数。

平均负载是 Unix 特定的概念。在 Windows 上，返回值始终为 `[0, 0, 0]`。

## `os.machine()`

<!-- YAML
added:
  - v18.9.0
  - v16.18.0
-->

* 返回值：{string}

以字符串形式返回机器类型，例如 `arm`、`arm64`、`aarch64`、`mips`、`mips64`、`ppc64`、`ppc64le`、`s390x`、`i386`、`i686`、`x86_64`。

在 POSIX 系统上，机器类型通过调用 [`uname(3)`][] 确定。在 Windows 上，使用 `RtlGetVersion()`，如果不可用，则将使用 `GetVersionExW()`。参见 <https://en.wikipedia.org/wiki/Uname#Examples> 获取更多信息。

## `os.networkInterfaces()`

<!-- YAML
added: v0.6.0
changes:
  - version: v18.4.0
    pr-url: https://github.com/nodejs/node/pull/43054
    description: "The `family` property now returns a string instead of a number."
  - version: v18.0.0
    pr-url: https://github.com/nodejs/node/pull/41431
    description: "The `family` property now returns a number instead of a string."
-->

* 返回值：{Object}

返回一个包含已分配网络地址的网络接口的对象。

返回对象上的每个键标识一个网络接口。关联的值是一个对象数组，每个对象描述一个分配的网络地址。

分配的网络地址对象上可用的属性包括：

* `address` {string} 分配的 IPv4 或 IPv6 地址
* `netmask` {string} IPv4 或 IPv6 子网掩码
* `family` {string} `IPv4` 或 `IPv6`
* `mac` {string} 网络接口的 MAC 地址
* `internal` {boolean} 如果网络接口是环回或类似不可远程访问的接口，则为 `true`；否则为 `false`
* `scopeid` {number} 数字 IPv6 范围 ID（仅当 `family` 为 `IPv6` 时指定）
* `cidr` {string} 分配的 IPv4 或 IPv6 地址，带有 CIDR 表示法的路由前缀。如果 `netmask` 无效，则此属性设置为 `null`。

<!-- eslint-skip -->

```js
{
  lo: [
    {
      address: '127.0.0.1',
      netmask: '255.0.0.0',
      family: 'IPv4',
      mac: '00:00:00:00:00:00',
      internal: true,
      cidr: '127.0.0.1/8'
    },
    {
      address: '::1',
      netmask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
      family: 'IPv6',
      mac: '00:00:00:00:00:00',
      scopeid: 0,
      internal: true,
      cidr: '::1/128'
    }
  ],
  eth0: [
    {
      address: '192.168.1.108',
      netmask: '255.255.255.0',
      family: 'IPv4',
      mac: '01:02:03:0a:0b:0c',
      internal: false,
      cidr: '192.168.1.108/24'
    },
    {
      address: 'fe80::a00:27ff:fe4e:66a1',
      netmask: 'ffff:ffff:ffff:ffff::',
      family: 'IPv6',
      mac: '01:02:03:0a:0b:0c',
      scopeid: 1,
      internal: false,
      cidr: 'fe80::a00:27ff:fe4e:66a1/64'
    }
  ]
}
```

## `os.platform()`

<!-- YAML
added: v0.5.0
-->

* 返回值：{string}

返回一个字符串，标识编译 Node.js 二进制文件的操作系统平台。该值在编译时设置。可能的值是 `'aix'`、`'darwin'`、`'freebsd'`、`'linux'`、`'openbsd'`、`'sunos'` 和 `'win32'`。

返回值等同于 [`process.platform`][]。

如果 Node.js 构建于 Android 操作系统上，也可能返回值 `'android'`。[Android 支持是实验性的][Android building]。

## `os.release()`

<!-- YAML
added: v0.3.3
-->

* 返回值：{string}

以字符串形式返回操作系统版本。

在 POSIX 系统上，操作系统版本通过调用 [`uname(3)`][] 确定。在 Windows 上，使用 `GetVersionExW()`。参见 <https://en.wikipedia.org/wiki/Uname#Examples> 获取更多信息。

## `os.setPriority([pid, ]priority)`

<!-- YAML
added: v10.10.0
-->

* `pid` {integer} 要设置调度优先级的进程 ID。**默认值：** `0`。
* `priority` {integer} 要分配给进程的调度优先级。

尝试设置由 `pid` 指定的进程的调度优先级。如果未提供 `pid` 或为 `0`，则使用当前进程的进程 ID。

`priority` 输入必须是 `-20`（高优先级）到 `19`（低优先级）之间的整数。由于 Unix 优先级级别和 Windows 优先级类之间的差异，`priority` 被映射到 `os.constants.priority` 中的六个优先级常量之一。检索进程优先级级别时，此范围映射可能导致 Windows 上的返回值略有不同。为避免混淆，请将 `priority` 设置为优先级常量之一。

在 Windows 上，将优先级设置为 `PRIORITY_HIGHEST` 需要提升的用户权限。否则，设置的优先级将静默降低为 `PRIORITY_HIGH`。

## `os.tmpdir()`

<!-- YAML
added: v0.9.9
changes:
  - version: v2.0.0
    pr-url: https://github.com/nodejs/node/pull/747
    description: "This function is now cross-platform consistent and no longerreturns a path with a trailing slash on any platform."
-->

* 返回值：{string}

以字符串形式返回操作系统的临时文件默认目录。

在 Windows 上，结果可以被 `TEMP` 和 `TMP` 环境变量覆盖，且 `TEMP` 优先于 `TMP`。如果均未设置，则默认为 `%SystemRoot%\temp` 或 `%windir%\temp`。

在非 Windows 平台上，将检查 `TMPDIR`、`TMP` 和 `TEMP` 环境变量以覆盖此方法的结果，顺序如上所述。如果均未设置，则默认为 `/tmp`。

某些操作系统发行版会默认配置 `TMPDIR`（非 Windows）或 `TEMP` 和 `TMP`（Windows），而无需系统管理员进行额外配置。`os.tmpdir()` 的结果通常反映系统偏好，除非被用户显式覆盖。

## `os.totalmem()`

<!-- YAML
added: v0.3.3
-->

* 返回：{integer}

以整数形式返回系统内存总量（字节）。

## `os.type()`

<!-- YAML
added: v0.3.3
-->

* 返回：{string}

返回 [`uname(3)`][] 提供的操作系统名称。例如，在 Linux 上返回 `'Linux'`，在 macOS 上返回 `'Darwin'`，在 Windows 上返回 `'Windows_NT'`。

有关在各种操作系统上运行 [`uname(3)`][] 输出的更多信息，请参阅 <https://en.wikipedia.org/wiki/Uname#Examples>。

## `os.uptime()`

<!-- YAML
added: v0.3.3
changes:
  - version: v10.0.0
    pr-url: https://github.com/nodejs/node/pull/20129
    description: 此函数的结果在 Windows 上不再包含小数部分。
-->

* 返回：{integer}

返回系统正常运行时间（秒数）。

## `os.userInfo([options])`

<!-- YAML
added: v6.0.0
-->

* `options` {Object}
  * `encoding` {string} 用于解释结果字符串的字符编码。如果 `encoding` 设置为 `'buffer'`，则 `username`、`shell` 和 `homedir` 值将是 `Buffer` 实例。**默认值：** `'utf8'`。
* 返回：{Object}

返回关于当前有效用户的信息。在 POSIX 平台上，这通常是密码文件的一个子集。返回的对象包括 `username`、`uid`、`gid`、`shell` 和 `homedir`。在 Windows 上，`uid` 和 `gid` 字段为 `-1`，`shell` 为 `null`。

`os.userInfo()` 返回的 `homedir` 值由操作系统提供。这与 `os.homedir()` 的结果不同，后者在回退到操作系统响应之前会查询环境变量以获取主目录。

如果用户没有 `username` 或 `homedir`，则抛出 [`SystemError`][]。

## `os.version()`

<!-- YAML
added:
 - v13.11.0
 - v12.17.0
-->

* 返回：{string}

返回标识内核版本的字符串。

在 POSIX 系统上，操作系统版本通过调用 [`uname(3)`][] 确定。在 Windows 上，使用 `RtlGetVersion()`，如果不可用，则将使用 `GetVersionExW()`。有关更多信息，请参阅 <https://en.wikipedia.org/wiki/Uname#Examples>。

## OS 常量

以下常量由 `os.constants` 导出。

并非所有常量在每个操作系统上都可用。

### 信号常量

<!-- YAML
changes:
  - version: v5.11.0
    pr-url: https://github.com/nodejs/node/pull/6093
    description: "添加了对 `SIGINFO` 的支持。"
-->

以下信号常量由 `os.constants.signals` 导出。

<table>
  <tr>
    <th>常量</th>
    <th>描述</th>
  </tr>
  <tr>
    <td><code>SIGHUP</code></td>
    <td>当控制终端关闭或父进程退出时发送。</td>
  </tr>
  <tr>
    <td><code>SIGINT</code></td>
    <td>当用户希望中断进程时发送（<kbd>Ctrl</kbd>+<kbd>C</kbd>）。</td>
  </tr>
  <tr>
    <td><code>SIGQUIT</code></td>
    <td>当用户希望终止进程并执行核心转储时发送。</td>
  </tr>
  <tr>
    <td><code>SIGILL</code></td>
    <td>发送给进程以通知其尝试执行非法、畸形、未知或特权指令。</td>
  </tr>
  <tr>
    <td><code>SIGTRAP</code></td>
    <td>当发生异常时发送给进程。</td>
  </tr>
  <tr>
    <td><code>SIGABRT</code></td>
    <td>发送给进程以请求其中止。</td>
  </tr>
  <tr>
    <td><code>SIGIOT</code></td>
    <td><code>SIGABRT</code> 的同义词</td>
  </tr>
  <tr>
    <td><code>SIGBUS</code></td>
    <td>发送给进程以通知其造成了总线错误。</td>
  </tr>
  <tr>
    <td><code>SIGFPE</code></td>
    <td>发送给进程以通知其执行了非法算术运算。</td>
  </tr>
  <tr>
    <td><code>SIGKILL</code></td>
    <td>发送给进程以立即终止它。</td>
  </tr>
  <tr>
    <td><code>SIGUSR1</code> <code>SIGUSR2</code></td>
    <td>发送给进程以标识用户定义的条件。</td>
  </tr>
  <tr>
    <td><code>SIGSEGV</code></td>
    <td>发送给进程以通知段错误。</td>
  </tr>
  <tr>
    <td><code>SIGPIPE</code></td>
    <td>当进程尝试写入断开的管道时发送。</td>
  </tr>
  <tr>
    <td><code>SIGALRM</code></td>
    <td>当系统计时器 elapsed 时发送给进程。</td>
  </tr>
  <tr>
    <td><code>SIGTERM</code></td>
    <td>发送给进程以请求终止。</td>
  </tr>
  <tr>
    <td><code>SIGCHLD</code></td>
    <td>当子进程终止时发送给进程。</td>
  </tr>
  <tr>
    <td><code>SIGSTKFLT</code></td>
    <td>发送给进程以指示协处理器上的堆栈错误。</td>
  </tr>
  <tr>
    <td><code>SIGCONT</code></td>
    <td>发送给指令操作系统继续暂停的进程。</td>
  </tr>
  <tr>
    <td><code>SIGSTOP</code></td>
    <td>发送给指令操作系统停止进程。</td>
  </tr>
  <tr>
    <td><code>SIGTSTP</code></td>
    <td>发送给进程以请求其停止。</td>
  </tr>
  <tr>
    <td><code>SIGBREAK</code></td>
    <td>当用户希望中断进程时发送。</td>
  </tr>
  <tr>
    <td><code>SIGTTIN</code></td>
    <td>当进程在后台从 TTY 读取时发送。</td>
  </tr>
  <tr>
    <td><code>SIGTTOU</code></td>
    <td>当进程在后台向 TTY 写入时发送。</td>
  </tr>
  <tr>
    <td><code>SIGURG</code></td>
    <td>当套接字有紧急数据要读取时发送给进程。</td>
  </tr>
  <tr>
    <td><code>SIGXCPU</code></td>
    <td>当进程超过其 CPU 使用限制时发送。</td>
  </tr>
  <tr>
    <td><code>SIGXFSZ</code></td>
    <td>当进程增长文件超过最大允许值时发送。</td>
  </tr>
  <tr>
    <td><code>SIGVTALRM</code></td>
    <td>当虚拟计时器 elapsed 时发送给进程。</td>
  </tr>
  <tr>
    <td><code>SIGPROF</code></td>
    <td>当系统计时器 elapsed 时发送给进程。</td>
  </tr>
  <tr>
    <td><code>SIGWINCH</code></td>
    <td>当控制终端改变其大小时发送给进程。</td>
  </tr>
  <tr>
    <td><code>SIGIO</code></td>
    <td>当 I/O 可用时发送给进程。</td>
  </tr>
  <tr>
    <td><code>SIGPOLL</code></td>
    <td><code>SIGIO</code> 的同义词</td>
  </tr>
  <tr>
    <td><code>SIGLOST</code></td>
    <td>当文件锁丢失时发送给进程。</td>
  </tr>
  <tr>
    <td><code>SIGPWR</code></td>
    <td>发送给进程以通知电源故障。</td>
  </tr>
  <tr>
    <td><code>SIGINFO</code></td>
    <td><code>SIGPWR</code> 的同义词</td>
  </tr>
  <tr>
    <td><code>SIGSYS</code></td>
    <td>发送给进程以通知错误参数。</td>
  </tr>
  <tr>
    <td><code>SIGUNUSED</code></td>
    <td><code>SIGSYS</code> 的同义词</td>
  </tr>
</table>

### 错误常量

以下错误常量由 `os.constants.errno` 导出。

#### POSIX 错误常量

<table>
  <tr>
    <th>常量</th>
    <th>描述</th>
  </tr>
  <tr>
    <td><code>E2BIG</code></td>
    <td>表示参数列表比预期的长。</td>
  </tr>
  <tr>
    <td><code>EACCES</code></td>
    <td>表示操作没有足够的权限。</td>
  </tr>
  <tr>
    <td><code>EADDRINUSE</code></td>
    <td>表示网络地址已被使用。</td>
  </tr>
  <tr>
    <td><code>EADDRNOTAVAIL</code></td>
    <td>表示网络地址当前不可用。</td>
  </tr>
  <tr>
    <td><code>EAFNOSUPPORT</code></td>
    <td>表示不支持网络地址族。</td>
  </tr>
  <tr>
    <td><code>EAGAIN</code></td>
    <td>表示没有可用数据，请稍后重试操作。</td>
  </tr>
  <tr>
    <td><code>EALREADY</code></td>
    <td>表示套接字已有 pending 连接。</td>
  </tr>
  <tr>
    <td><code>EBADF</code></td>
    <td>表示文件描述符无效。</td>
  </tr>
  <tr>
    <td><code>EBADMSG</code></td>
    <td>表示无效的数据消息。</td>
  </tr>
  <tr>
    <td><code>EBUSY</code></td>
    <td>表示设备或资源忙。</td>
  </tr>
  <tr>
    <td><code>ECANCELED</code></td>
    <td>表示操作已取消。</td>
  </tr>
  <tr>
    <td><code>ECHILD</code></td>
    <td>表示没有子进程。</td>
  </tr>
  <tr>
    <td><code>ECONNABORTED</code></td>
    <td>表示网络连接已中止。</td>
  </tr>
  <tr>
    <td><code>ECONNREFUSED</code></td>
    <td>表示网络连接被拒绝。</td>
  </tr>
  <tr>
    <td><code>ECONNRESET</code></td>
    <td>表示网络连接已重置。</td>
  </tr>
  <tr>
    <td><code>EDEADLK</code></td>
    <td>表示避免了资源死锁。</td>
  </tr>
  <tr>
    <td><code>EDESTADDRREQ</code></td>
    <td>表示需要目标地址。</td>
  </tr>
  <tr>
    <td><code>EDOM</code></td>
    <td>表示参数超出函数的定义域。</td>
  </tr>
  <tr>
    <td><code>EDQUOT</code></td>
    <td>表示磁盘配额已超出。</td>
  </tr>
  <tr>
    <td><code>EEXIST</code></td>
    <td>表示文件已存在。</td>
  </tr>
  <tr>
    <td><code>EFAULT</code></td>
    <td>表示无效的指针地址。</td>
  </tr>
  <tr>
    <td><code>EFBIG</code></td>
    <td>表示文件太大。</td>
  </tr>
  <tr>
    <td><code>EHOSTUNREACH</code></td>
    <td>表示主机不可达。</td>
  </tr>
  <tr>
    <td><code>EIDRM</code></td>
    <td>表示标识符已被移除。</td>
  </tr>
  <tr>
    <td><code>EILSEQ</code></td>
    <td>表示非法字节序列。</td>
  </tr>
  <tr>
    <td><code>EINPROGRESS</code></td>
    <td>表示操作已在进行中。</td>
  </tr>
  <tr>
    <td><code>EINTR</code></td>
    <td>表示函数调用被中断。</td>
  </tr>
  <tr>
    <td><code>EINVAL</code></td>
    <td>表示提供了无效参数。</td>
  </tr>
  <tr>
    <td><code>EIO</code></td>
    <td>表示未指定的 I/O 错误。</td>
  </tr>
  <tr>
    <td><code>EISCONN</code></td>
    <td>表示套接字已连接。</td>
  </tr>
  <tr>
    <td><code>EISDIR</code></td>
    <td>表示路径是目录。</td>
  </tr>
  <tr>
    <td><code>ELOOP</code></td>
    <td>表示路径中符号链接层级过多。</td>
  </tr>
  <tr>
    <td><code>EMFILE</code></td>
    <td>表示打开的文件太多。</td>
  </tr>
  <tr>
    <td><code>EMLINK</code></td>
    <td>表示文件的硬链接太多。</td>
  </tr>
  <tr>
    <td><code>EMSGSIZE</code></td>
    <td>表示提供的消息太长。</td>
  </tr>
  <tr>
    <td><code>EMULTIHOP</code></td>
    <td>表示尝试了多跳。</td>
  </tr>
  <tr>
    <td><code>ENAMETOOLONG</code></td>
    <td>表示文件名太长。</td>
  </tr>
  <tr>
    <td><code>ENETDOWN</code></td>
    <td>表示网络已 down。</td>
  </tr>
  <tr>
    <td><code>ENETRESET</code></td>
    <td>表示连接被网络中止。</td>
  </tr>
  <tr>
    <td><code>ENETUNREACH</code></td>
    <td>表示网络不可达。</td>
  </tr>
  <tr>
    <td><code>ENFILE</code></td>
    <td>表示系统中打开的文件太多。</td>
  </tr>
  <tr>
    <td><code>ENOBUFS</code></td>
    <td>表示没有可用的缓冲区空间。</td>
  </tr>
  <tr>
    <td><code>ENODATA</code></td>
    <td>表示流头部读取队列上没有可用消息。</td>
  </tr>
  <tr>
    <td><code>ENODEV</code></td>
    <td>表示没有该设备。</td>
  </tr>
  <tr>
    <td><code>ENOENT</code></td>
    <td>表示没有该文件或目录。</td>
  </tr>
  <tr>
    <td><code>ENOEXEC</code></td>
    <td>表示 exec 格式错误。</td>
  </tr>
  <tr>
    <td><code>ENOLCK</code></td>
    <td>表示没有可用的锁。</td>
  </tr>
  <tr>
    <td><code>ENOLINK</code></td>
    <td>表示链接已断开。</td>
  </tr>
  <tr>
    <td><code>ENOMEM</code></td>
    <td>表示空间不足。</td>
  </tr>
  <tr>
    <td><code>ENOMSG</code></td>
    <td>表示没有所需类型的消息。</td>
  </tr>
  <tr>
    <td><code>ENOPROTOOPT</code></td>
    <td>表示给定协议不可用。</td>
  </tr>
  <tr>
    <td><code>ENOSPC</code></td>
    <td>表示设备上没有可用空间。</td>
  </tr>
  <tr>
    <td><code>ENOSR</code></td>
    <td>表示没有可用的流资源。</td>
  </tr>
  <tr>
    <td><code>ENOSTR</code></td>
    <td>表示给定资源不是流。</td>
  </tr>
  <tr>
    <td><code>ENOSYS</code></td>
    <td>表示函数尚未实现。</td>
  </tr>
  <tr>
    <td><code>ENOTCONN</code></td>
    <td>表示套接字未连接。</td>
  </tr>
  <tr>
    <td><code>ENOTDIR</code></td>
    <td>表示路径不是目录。</td>
  </tr>
  <tr>
    <td><code>ENOTEMPTY</code></td>
    <td>表示目录不为空。</td>
  </tr>
  <tr>
    <td><code>ENOTSOCK</code></td>
    <td>表示给定项不是套接字。</td>
  </tr>
  <tr>
    <td><code>ENOTSUP</code></td>
    <td>表示不支持给定操作。</td>
  </tr>
  <tr>
    <td><code>ENOTTY</code></td>
    <td>表示不适当的 I/O 控制操作。</td>
  </tr>
  <tr>
    <td><code>ENXIO</code></td>
    <td>表示没有该设备或地址。</td>
  </tr>
  <tr>
    <td><code>EOPNOTSUPP</code></td>
    <td>表示套接字上不支持操作。尽管在 Linux 上 <code>ENOTSUP</code> 和 <code>EOPNOTSUPP</code> 具有相同的值，但根据 POSIX.1，这些错误值应该是不同的。）</td>
  </tr>
  <tr>
    <td><code>EOVERFLOW</code></td>
    <td>表示值太大，无法存储在给定数据类型中。</td>
  </tr>
  <tr>
    <td><code>EPERM</code></td>
    <td>表示不允许操作。</td>
  </tr>
  <tr>
    <td><code>EPIPE</code></td>
    <td>表示管道破裂。</td>
  </tr>
  <tr>
    <td><code>EPROTO</code></td>
    <td>表示协议错误。</td>
  </tr>
  <tr>
    <td><code>EPROTONOSUPPORT</code></td>
    <td>表示不支持协议。</td>
  </tr>
  <tr>
    <td><code>EPROTOTYPE</code></td>
    <td>表示套接字的协议类型错误。</td>
  </tr>
  <tr>
    <td><code>ERANGE</code></td>
    <td>表示结果太大。</td>
  </tr>
  <tr>
    <td><code>EROFS</code></td>
    <td>表示文件系统为只读。</td>
  </tr>
  <tr>
    <td><code>ESPIPE</code></td>
    <td>表示无效的 seek 操作。</td>
  </tr>
  <tr>
    <td><code>ESRCH</code></td>
    <td>表示没有该进程。</td>
  </tr>
  <tr>
    <td><code>ESTALE</code></td>
    <td>表示文件句柄过时。</td>
  </tr>
  <tr>
    <td><code>ETIME</code></td>
    <td>表示计时器过期。</td>
  </tr>
  <tr>
    <td><code>ETIMEDOUT</code></td>
    <td>表示连接超时。</td>
  </tr>
  <tr>
    <td><code>ETXTBSY</code></td>
    <td>表示文本文件忙。</td>
  </tr>
  <tr>
    <td><code>EWOULDBLOCK</code></td>
    <td>表示操作将阻塞。</td>
  </tr>
  <tr>
    <td><code>EXDEV</code></td>
    <td>表示不适当的链接。</td>
  </tr>
</table>

#### Windows 特定错误常量

以下错误代码特定于 Windows 操作系统。

<table>
  <tr>
    <th>常量</th>
    <th>描述</th>
  </tr>
  <tr>
    <td><code>WSAEINTR</code></td>
    <td>表示函数调用被中断。</td>
  </tr>
  <tr>
    <td><code>WSAEBADF</code></td>
    <td>表示无效的文件句柄。</td>
  </tr>
  <tr>
    <td><code>WSAEACCES</code></td>
    <td>表示权限不足，无法完成操作。</td>
  </tr>
  <tr>
    <td><code>WSAEFAULT</code></td>
    <td>表示无效的指针地址。</td>
  </tr>
  <tr>
    <td><code>WSAEINVAL</code></td>
    <td>表示传递了无效参数。</td>
  </tr>
  <tr>
    <td><code>WSAEMFILE</code></td>
    <td>表示打开的文件太多。</td>
  </tr>
  <tr>
    <td><code>WSAEWOULDBLOCK</code></td>
    <td>表示资源暂时不可用。</td>
  </tr>
  <tr>
    <td><code>WSAEINPROGRESS</code></td>
    <td>表示操作当前正在进行中。</td>
  </tr>
  <tr>
    <td><code>WSAEALREADY</code></td>
    <td>表示操作已在进行中。</td>
  </tr>
  <tr>
    <td><code>WSAENOTSOCK</code></td>
    <td>表示资源不是套接字。</td>
  </tr>
  <tr>
    <td><code>WSAEDESTADDRREQ</code></td>
    <td>表示需要目标地址。</td>
  </tr>
  <tr>
    <td><code>WSAEMSGSIZE</code></td>
    <td>表示消息大小太长。</td>
  </tr>
  <tr>
    <td><code>WSAEPROTOTYPE</code></td>
    <td>表示套接字的协议类型错误。</td>
  </tr>
  <tr>
    <td><code>WSAENOPROTOOPT</code></td>
    <td>表示协议选项错误。</td>
  </tr>
  <tr>
    <td><code>WSAEPROTONOSUPPORT</code></td>
    <td>表示不支持协议。</td>
  </tr>
  <tr>
    <td><code>WSAESOCKTNOSUPPORT</code></td>
    <td>表示不支持套接字类型。</td>
  </tr>
  <tr>
    <td><code>WSAEOPNOTSUPP</code></td>
    <td>表示不支持操作。</td>
  </tr>
  <tr>
    <td><code>WSAEPFNOSUPPORT</code></td>
    <td>表示不支持协议族。</td>
  </tr>
  <tr>
    <td><code>WSAEAFNOSUPPORT</code></td>
    <td>表示不支持地址族。</td>
  </tr>
  <tr>
    <td><code>WSAEADDRINUSE</code></td>
    <td>表示网络地址已被使用。</td>
  </tr>
  <tr>
    <td><code>WSAEADDRNOTAVAIL</code></td>
    <td>表示网络地址不可用。</td>
  </tr>
  <tr>
    <td><code>WSAENETDOWN</code></td>
    <td>表示网络已 down。</td>
  </tr>
  <tr>
    <td><code>WSAENETUNREACH</code></td>
    <td>表示网络不可达。</td>
  </tr>
  <tr>
    <td><code>WSAENETRESET</code></td>
    <td>表示网络连接已重置。</td>
  </tr>
  <tr>
    <td><code>WSAECONNABORTED</code></td>
    <td>表示连接已中止。</td>
  </tr>
  <tr>
    <td><code>WSAECONNRESET</code></td>
    <td>表示连接被对等方重置。</td>
  </tr>
  <tr>
    <td><code>WSAENOBUFS</code></td>
    <td>表示没有可用的缓冲区空间。</td>
  </tr>
  <tr>
    <td><code>WSAEISCONN</code></td>
    <td>表示套接字已连接。</td>
  </tr>
  <tr>
    <td><code>WSAENOTCONN</code></td>
    <td>表示套接字未连接。</td>
  </tr>
  <tr>
    <td><code>WSAESHUTDOWN</code></td>
    <td>表示套接字 shutdown 后无法发送数据。</td>
  </tr>
  <tr>
    <td><code>WSAETOOMANYREFS</code></td>
    <td>表示引用太多。</td>
  </tr>
  <tr>
    <td><code>WSAETIMEDOUT</code></td>
    <td>表示连接超时。</td>
  </tr>
  <tr>
    <td><code>WSAECONNREFUSED</code></td>
    <td>表示连接被拒绝。</td>
  </tr>
  <tr>
    <td><code>WSAELOOP</code></td>
    <td>表示无法转换名称。</td>
  </tr>
  <tr>
    <td><code>WSAENAMETOOLONG</code></td>
    <td>表示名称太长。</td>
  </tr>
  <tr>
    <td><code>WSAEHOSTDOWN</code></td>
    <td>表示网络主机已 down。</td>
  </tr>
  <tr>
    <td><code>WSAEHOSTUNREACH</code></td>
    <td>表示没有到网络主机的路由。</td>
  </tr>
  <tr>
    <td><code>WSAENOTEMPTY</code></td>
    <td>表示目录不为空。</td>
  </tr>
  <tr>
    <td><code>WSAEPROCLIM</code></td>
    <td>表示进程太多。</td>
  </tr>
  <tr>
    <td><code>WSAEUSERS</code></td>
    <td>表示用户配额已超出。</td>
  </tr>
  <tr>
    <td><code>WSAEDQUOT</code></td>
    <td>表示磁盘配额已超出。</td>
  </tr>
  <tr>
    <td><code>WSAESTALE</code></td>
    <td>表示过时的文件句柄引用。</td>
  </tr>
  <tr>
    <td><code>WSAEREMOTE</code></td>
    <td>表示项是远程的。</td>
  </tr>
  <tr>
    <td><code>WSASYSNOTREADY</code></td>
    <td>表示网络子系统未就绪。</td>
  </tr>
  <tr>
    <td><code>WSAVERNOTSUPPORTED</code></td>
    <td>表示 <code>winsock.dll</code> 版本超出范围。</td>
  </tr>
  <tr>
    <td><code>WSANOTINITIALISED</code></td>
    <td>表示尚未执行成功的 WSAStartup。</td>
  </tr>
  <tr>
    <td><code>WSAEDISCON</code></td>
    <td>表示正在执行优雅 shutdown。</td>
  </tr>
  <tr>
    <td><code>WSAENOMORE</code></td>
    <td>表示没有更多结果。</td>
  </tr>
  <tr>
    <td><code>WSAECANCELLED</code></td>
    <td>表示操作已取消。</td>
  </tr>
  <tr>
    <td><code>WSAEINVALIDPROCTABLE</code></td>
    <td>表示过程调用表无效。</td>
  </tr>
  <tr>
    <td><code>WSAEINVALIDPROVIDER</code></td>
    <td>表示无效的服务提供商。</td>
  </tr>
  <tr>
    <td><code>WSAEPROVIDERFAILEDINIT</code></td>
    <td>表示服务提供商初始化失败。</td>
  </tr>
  <tr>
    <td><code>WSASYSCALLFAILURE</code></td>
    <td>表示系统调用失败。</td>
  </tr>
  <tr>
    <td><code>WSASERVICE_NOT_FOUND</code></td>
    <td>表示未找到服务。</td>
  </tr>
  <tr>
    <td><code>WSATYPE_NOT_FOUND</code></td>
    <td>表示未找到类类型。</td>
  </tr>
  <tr>
    <td><code>WSA_E_NO_MORE</code></td>
    <td>表示没有更多结果。</td>
  </tr>
  <tr>
    <td><code>WSA_E_CANCELLED</code></td>
    <td>表示调用已取消。</td>
  </tr>
  <tr>
    <td><code>WSAEREFUSED</code></td>
    <td>表示数据库查询被拒绝。</td>
  </tr>
</table>

### dlopen 常量

如果操作系统可用，以下常量导出在 `os.constants.dlopen` 中。有关详细信息，请参阅 dlopen(3)。

<table>
  <tr>
    <th>常量</th>
    <th>描述</th>
  </tr>
  <tr>
    <td><code>RTLD_LAZY</code></td>
    <td>执行延迟绑定。Node.js 默认设置此标志。</td>
  </tr>
  <tr>
    <td><code>RTLD_NOW</code></td>
    <td>在 dlopen(3) 返回之前解析库中所有未定义的符号。</td>
  </tr>
  <tr>
    <td><code>RTLD_GLOBAL</code></td>
    <td>库定义的符号将可用于随后加载的库的符号解析。</td>
  </tr>
  <tr>
    <td><code>RTLD_LOCAL</code></td>
    <td><code>RTLD_GLOBAL</code> 的反面。如果未指定任何标志，这是默认行为。</td>
  </tr>
  <tr>
    <td><code>RTLD_DEEPBIND</code></td>
    <td>使自包含库优先使用自己的符号，而不是之前加载的库中的符号。</td>
  </tr>
</table>

### 优先级常量

<!-- YAML
added: v10.10.0
-->

以下进程调度常量由 `os.constants.priority` 导出。

<table>
  <tr>
    <th>常量</th>
    <th>描述</th>
  </tr>
  <tr>
    <td><code>PRIORITY_LOW</code></td>
    <td>最低的进程调度优先级。这对应于 Windows 上的 `IDLE_PRIORITY_CLASS`，以及所有其他平台上的 `19` nice 值。</td>
  </tr>
  <tr>
    <td><code>PRIORITY_BELOW_NORMAL</code></td>
    <td>进程调度优先级高于 `PRIORITY_LOW` 且低于 `PRIORITY_NORMAL`。这对应于 Windows 上的 `BELOW_NORMAL_PRIORITY_CLASS`，以及所有其他平台上的 `10` nice 值。</td>
  </tr>
  <tr>
    <td><code>PRIORITY_NORMAL</code></td>
    <td>默认进程调度优先级。这对应于 Windows 上的 `NORMAL_PRIORITY_CLASS`，以及所有其他平台上的 `0` nice 值。</td>
  </tr>
  <tr>
    <td><code>PRIORITY_ABOVE_NORMAL</code></td>
    <td>进程调度优先级高于 `PRIORITY_NORMAL` 且低于 `PRIORITY_HIGH`。这对应于 Windows 上的 `ABOVE_NORMAL_PRIORITY_CLASS`，以及所有其他平台上的 `-7` nice 值。</td>
  </tr>
  <tr>
    <td><code>PRIORITY_HIGH</code></td>
    <td>进程调度优先级高于 `PRIORITY_ABOVE_NORMAL` 且低于 `PRIORITY_HIGHEST`。这对应于 Windows 上的 `HIGH_PRIORITY_CLASS`，以及所有其他平台上的 `-14` nice 值。</td>
  </tr>
  <tr>
    <td><code>PRIORITY_HIGHEST</code></td>
    <td>最高的进程调度优先级。这对应于 Windows 上的 `REALTIME_PRIORITY_CLASS`，以及所有其他平台上的 `-20` nice 值。</td>
  </tr>
</table>

### libuv 常量

<table>
  <tr>
    <th>常量</th>
    <th>描述</th>
  </tr>
  <tr>
    <td><code>UV_UDP_REUSEADDR</code></td>
    <td></td>
  </tr>
</table>

[Android building]: https://github.com/nodejs/node/blob/HEAD/BUILDING.md#android
[EUID]: https://en.wikipedia.org/wiki/User_identifier#Effective_user_ID
[`SystemError`]: errors.md#class-systemerror
[`process.arch`]: process.md#processarch
[`process.platform`]: process.md#processplatform
[`uname(3)`]: https://linux.die.net/man/3/uname
[`uv_available_parallelism()`]: https://docs.libuv.org/en/v1.x/misc.html#c.uv_available_parallelism
