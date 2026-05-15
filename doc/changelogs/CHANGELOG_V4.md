# Node.js 4 变更日志

<!--lint disable maximum-line-length no-literal-urls prohibited-strings-->

<table>
<tr>
<th>LTS 'Argon'</th>
<th>稳定版</th>
</tr>
<tr>
<td valign="top">
<a href="#4.9.1">4.9.1</a><br/>
<a href="#4.9.0">4.9.0</a><br/>
<a href="#4.8.7">4.8.7</a><br/>
<a href="#4.8.6">4.8.6</a><br/>
<a href="#4.8.5">4.8.5</a><br/>
<a href="#4.8.4">4.8.4</a><br/>
<a href="#4.8.3">4.8.3</a><br/>
<a href="#4.8.2">4.8.2</a><br/>
<a href="#4.8.1">4.8.1</a><br/>
<a href="#4.8.0">4.8.0</a><br/>
<a href="#4.7.3">4.7.3</a><br/>
<a href="#4.7.2">4.7.2</a><br/>
<a href="#4.7.1">4.7.1</a><br/>
<a href="#4.7.0">4.7.0</a><br/>
<a href="#4.6.2">4.6.2</a><br/>
<a href="#4.6.1">4.6.1</a><br/>
<a href="#4.6.0">4.6.0</a><br/>
<a href="#4.5.0">4.5.0</a><br/>
<a href="#4.4.7">4.4.7</a><br/>
<a href="#4.4.6">4.4.6</a><br/>
<a href="#4.4.5">4.4.5</a><br/>
<a href="#4.4.4">4.4.4</a><br/>
<a href="#4.4.3">4.4.3</a><br/>
<a href="#4.4.2">4.4.2</a><br/>
<a href="#4.4.1">4.4.1</a><br/>
<a href="#4.4.0">4.4.0</a><br/>
<a href="#4.3.2">4.3.2</a><br/>
<a href="#4.3.1">4.3.1</a><br/>
<a href="#4.3.0">4.3.0</a><br/>
<a href="#4.2.6">4.2.6</a><br/>
<a href="#4.2.5">4.2.5</a><br/>
<a href="#4.2.4">4.2.4</a><br/>
<a href="#4.2.3">4.2.3</a><br/>
<a href="#4.2.2">4.2.2</a><br/>
<a href="#4.2.1">4.2.1</a><br/>
<a href="#4.2.0">4.2.0</a><br/>
</td>
<td valign="top">
<a href="#4.1.2">4.1.2</a><br/>
<a href="#4.1.1">4.1.1</a><br/>
<a href="#4.1.0">4.1.0</a><br/>
<a href="#4.0.0">4.0.0</a><br/>
</td>
</tr>
</table>

* 其他版本
  * [26.x](CHANGELOG_V26.md)
  * [25.x](CHANGELOG_V25.md)
  * [24.x](CHANGELOG_V24.md)
  * [23.x](CHANGELOG_V23.md)
  * [22.x](CHANGELOG_V22.md)
  * [21.x](CHANGELOG_V21.md)
  * [20.x](CHANGELOG_V20.md)
  * [19.x](CHANGELOG_V19.md)
  * [18.x](CHANGELOG_V18.md)
  * [17.x](CHANGELOG_V17.md)
  * [16.x](CHANGELOG_V16.md)
  * [15.x](CHANGELOG_V15.md)
  * [14.x](CHANGELOG_V14.md)
  * [13.x](CHANGELOG_V13.md)
  * [12.x](CHANGELOG_V12.md)
  * [11.x](CHANGELOG_V11.md)
  * [10.x](CHANGELOG_V10.md)
  * [9.x](CHANGELOG_V9.md)
  * [8.x](CHANGELOG_V8.md)
  * [7.x](CHANGELOG_V7.md)
  * [6.x](CHANGELOG_V6.md)
  * [5.x](CHANGELOG_V5.md)
  * [0.12.x](CHANGELOG_V012.md)
  * [0.10.x](CHANGELOG_V010.md)
  * [io.js](CHANGELOG_IOJS.md)
  * [归档](CHANGELOG_ARCHIVE.md)

_注意_: Node.js v4 受
[Node.js 长期支持计划](https://github.com/nodejs/LTS) 覆盖，
并将一直积极支持到 2017 年 4 月，并维护到 2018 年 4 月。

<a id="4.9.1"></a>

## 2018-03-29，版本 4.9.1 'Argon'（维护版），@MylesBorins

### 重要变更

没有额外的提交。

由于升级到 GCC 4.9.X 编译器的暂存不正确，PPC little endian 的最新版本使用 GCC 4.9.X 而不是 GCC 4.8.X 构建。这导致了基于 PPCLE 环境中的 ABI 破坏。我们已经在基础设施中修复了这个问题，并发布此版本以确保托管的二进制文件符合我们的平台支持约定。

<a id="4.9.0"></a>

## 2018-03-28，版本 4.9.0 'Argon'（维护版），@MylesBorins

这是一个安全发布版本。所有 Node.js 用户都应查阅位于 <https://nodejs.org/en/blog/vulnerability/march-2018-security-releases/> 的安全发布摘要，以了解已修补漏洞的详细信息。

此版本包含以下 CVE 的修复：

* CVE-2018-7158
* CVE-2018-7159

### 重要变更

* **升级到 OpenSSL 1.0.2o**：不包含任何已知会影响 Node.js 的安全修复。
* **修复 `'path'` 模块正则表达式拒绝服务漏洞（CVE-2018-7158）**：用于解析 POSIX 和 Windows 路径的正则表达式，如果攻击者能够让一个特制的路径字符串通过受影响的 `'path'` 模块函数之一传入，可能会被用于造成拒绝服务。
* **拒绝 HTTP `Content-Length` 头值中的空格（CVE-2018-7159）**：Node.js HTTP 解析器允许 `Content-Length` 头值中包含空格。现在，这类值会像非数字值一样导致连接被拒绝。
* **更新根证书**：Node.js 二进制文件中新增了 5 个根证书，移除了 30 个。

### 提交

* \[[`497ff3cd4f`](https://github.com/nodejs/node/commit/497ff3cd4f)] - **crypto**: 更新根证书 (Ben Noordhuis) [#19322](https://github.com/nodejs/node/pull/19322)
* \[[`514709e41f`](https://github.com/nodejs/node/commit/514709e41f)] - **deps**: 为 openssl s_client 添加 -no_rand_screen (Shigeki Ohtsu) [nodejs/io.js#1836](https://github.com/nodejs/io.js/pull/1836)
* \[[`5108108606`](https://github.com/nodejs/node/commit/5108108606)] - **deps**: 修复 x86_win32 中 openssl 的 asm 构建错误 (Shigeki Ohtsu) [iojs/io.js#1389](https://github.com/iojs/io.js/pull/1389)
* \[[`d67d0a63d9`](https://github.com/nodejs/node/commit/d67d0a63d9)] - **deps**: 修复 ia32 win32 上的 openssl 汇编错误 (Fedor Indutny) [iojs/io.js#1389](https://github.com/iojs/io.js/pull/1389)
* \[[`6af057ecc8`](https://github.com/nodejs/node/commit/6af057ecc8)] - **deps**: 将所有 openssl 头文件复制到 include 目录 (Shigeki Ohtsu) [#19638](https://github.com/nodejs/node/pull/19638)
* \[[`b50cd3359d`](https://github.com/nodejs/node/commit/b50cd3359d)] - **deps**: 将 openssl 源码升级到 1.0.2o (Shigeki Ohtsu) [#19638](https://github.com/nodejs/node/pull/19638)
* \[[`da6e24c8d6`](https://github.com/nodejs/node/commit/da6e24c8d6)] - **deps**: 拒绝 Content-Length 中的内部空白 (Ben Noordhuis) [nodejs-private/http-parser-private#1](https://github.com/nodejs-private/http-parser-private/pull/1)
* \[[`7ebc9981e0`](https://github.com/nodejs/node/commit/7ebc9981e0)] - **deps**: 将 http-parser 升级到 v2.8.0 (Ben Noordhuis) [nodejs-private/http-parser-private#1](https://github.com/nodejs-private/http-parser-private/pull/1)
* \[[`6fd2cc93a6`](https://github.com/nodejs/node/commit/6fd2cc93a6)] - **openssl**: 修复 win32 上应用程序对按键的要求 (Shigeki Ohtsu) [iojs/io.js#1389](https://github.com/iojs/io.js/pull/1389)
* \[[`bf00665af6`](https://github.com/nodejs/node/commit/bf00665af6)] - **path**: 收敛 Windows 中的正则表达式 (Myles Borins)
* \[[`4196fcf23e`](https://github.com/nodejs/node/commit/4196fcf23e)] - **path**: 收敛 POSIX 中的正则表达式 (Myles Borins)
* \[[`625986b699`](https://github.com/nodejs/node/commit/625986b699)] - **src**: 去除 CNNIC+StartCom 证书白名单 (Ben Noordhuis) [#19322](https://github.com/nodejs/node/pull/19322)
* \[[`ebc46448a4`](https://github.com/nodejs/node/commit/ebc46448a4)] - **tools**: 更新 certdata.txt (Ben Noordhuis) [#19322](https://github.com/nodejs/node/pull/19322)

<a id="4.8.7"></a>

## 2017-12-08，版本 4.8.7 'Argon'（维护版），@MylesBorins

这是一个安全发布版本。所有 Node.js 用户都应查阅位于 <https://nodejs.org/en/blog/vulnerability/december-2017-security-releases/> 的安全发布摘要，以了解已修补漏洞的详细信息。

此版本包含以下 CVE 的修复：

* CVE-2017-15896
* CVE-2017-3738（来自 openssl 项目）

### 重要变更

* **deps**：
  * openssl 已更新到 1.0.2n (Shigeki Ohtsu) [#17526](https://github.com/nodejs/node/pull/17526)

### 提交

* \[[`4f8fae3493`](https://github.com/nodejs/node/commit/4f8fae3493)] - **deps**: 更新 openssl asm 和 asm_obsolete 文件 (Shigeki Ohtsu) [#17526](https://github.com/nodejs/node/pull/17526)
* \[[`eacd090e7b`](https://github.com/nodejs/node/commit/eacd090e7b)] - **deps**: 为 openssl s_client 添加 -no_rand_screen (Shigeki Ohtsu) [nodejs/io.js#1836](https://github.com/nodejs/io.js/pull/1836)
* \[[`3e6b0b0d13`](https://github.com/nodejs/node/commit/3e6b0b0d13)] - **deps**: 修复 x86_win32 中 openssl 的 asm 构建错误 (Shigeki Ohtsu) [iojs/io.js#1389](https://github.com/iojs/io.js/pull/1389)
* \[[`b0ed4c52af`](https://github.com/nodejs/node/commit/b0ed4c52af)] - **deps**: 修复 ia32 win32 上的 openssl 汇编错误 (Fedor Indutny) [iojs/io.js#1389](https://github.com/iojs/io.js/pull/1389)
* \[[`dd6a2dff1e`](https://github.com/nodejs/node/commit/dd6a2dff1e)] - **deps**: 将所有 openssl 头文件复制到 include 目录 (Shigeki Ohtsu) [#17526](https://github.com/nodejs/node/pull/17526)
* \[[`b3afedfbe9`](https://github.com/nodejs/node/commit/b3afedfbe9)] - **deps**: 将 openssl 源码升级到 1.0.2n (Shigeki Ohtsu) [#17526](https://github.com/nodejs/node/pull/17526)
* \[[`f7eb162d0d`](https://github.com/nodejs/node/commit/f7eb162d0d)] - **openssl**: 修复 win32 上应用程序对按键的要求 (Shigeki Ohtsu) [iojs/io.js#1389](https://github.com/iojs/io.js/pull/1389)

<a id="4.8.6"></a>

## 2017-11-07，版本 4.8.6 'Argon'（维护版），@MylesBorins

此维护版发布包含 47 个提交。其中 26 个提交是依赖更新，8 个与构建/工具相关，4 个与文档相关，2 个与测试相关。

此版本包含对 openssl 的安全更新，该更新已被认定为 Node.js 项目中的低严重性问题。

### 重要变更

* **crypto**：
  * 更新根证书 (Ben Noordhuis) [#13279](https://github.com/nodejs/node/pull/13279)
  * 更新根证书 (Ben Noordhuis) [#12402](https://github.com/nodejs/node/pull/12402)
* **deps**：
  * 为更现代版本的 INTL 添加支持 (Bruno Pagani) [#13040](https://github.com/nodejs/node/pull/13040)
  * 将 openssl 源码升级到 1.0.2m (Shigeki Ohtsu) [#16691](https://github.com/nodejs/node/pull/16691)
  * 将 openssl 源码升级到 1.0.2l (Daniel Bevenius) [#13233](https://github.com/nodejs/node/pull/13233)

### 提交

* \[[`e064ae62e4`](https://github.com/nodejs/node/commit/e064ae62e4)] - **build**: 修复 make test-v8 (Ben Noordhuis) [#15562](https://github.com/nodejs/node/pull/15562)
* \[[`a7f7a87a1b`](https://github.com/nodejs/node/commit/a7f7a87a1b)] - **build**: 在 test-v8 末尾运行 test-hash-seed (Michaël Zasso) [#14219](https://github.com/nodejs/node/pull/14219)
* \[[`05e8b1b7d9`](https://github.com/nodejs/node/commit/05e8b1b7d9)] - **build**: 在 macOS 上对 tarball 二进制文件进行代码签名 (Evan Lucas) [#14179](https://github.com/nodejs/node/pull/14179)
* \[[`e2b6fdf93e`](https://github.com/nodejs/node/commit/e2b6fdf93e)] - **build**: 避免上传 /docs/api 和 /docs/doc/api (Rod Vagg) [#12957](https://github.com/nodejs/node/pull/12957)
* \[[`59d35c0775`](https://github.com/nodejs/node/commit/59d35c0775)] - **build,tools**: 不强制使用代码签名前缀 (Evan Lucas) [#14179](https://github.com/nodejs/node/pull/14179)
* \[[`210fa72e9e`](https://github.com/nodejs/node/commit/210fa72e9e)] - **crypto**: 更新根证书 (Ben Noordhuis) [#13279](https://github.com/nodejs/node/pull/13279)
* \[[`752b46a259`](https://github.com/nodejs/node/commit/752b46a259)] - **crypto**: 更新根证书 (Ben Noordhuis) [#12402](https://github.com/nodejs/node/pull/12402)
* \[[`3640ba4acb`](https://github.com/nodejs/node/commit/3640ba4acb)] - **crypto**: 在 ECDH::BufferToPoint 后清除错误堆栈 (Ryan Kelly) [#13275](https://github.com/nodejs/node/pull/13275)
* \[[`545235fc4b`](https://github.com/nodejs/node/commit/545235fc4b)] - **deps**: 添加缺失的 #include "unicode/normlzr.h" (Bruno Pagani) [#13040](https://github.com/nodejs/node/pull/13040)
* \[[`ea09a1c3e6`](https://github.com/nodejs/node/commit/ea09a1c3e6)] - **deps**: 更新 openssl asm 和 asm_obsolete 文件 (Shigeki Ohtsu) [#16691](https://github.com/nodejs/node/pull/16691)
* \[[`68661a95b5`](https://github.com/nodejs/node/commit/68661a95b5)] - **deps**: 为 openssl s_client 添加 -no_rand_screen (Shigeki Ohtsu) [nodejs/io.js#1836](https://github.com/nodejs/io.js/pull/1836)
* \[[`bdcb2525fb`](https://github.com/nodejs/node/commit/bdcb2525fb)] - **deps**: 修复 x86_win32 中 openssl 的 asm 构建错误 (Shigeki Ohtsu) [iojs/io.js#1389](https://github.com/iojs/io.js/pull/1389)
* \[[`3f93ffee89`](https://github.com/nodejs/node/commit/3f93ffee89)] - **deps**: 修复 ia32 win32 上的 openssl 汇编错误 (Fedor Indutny) [iojs/io.js#1389](https://github.com/iojs/io.js/pull/1389)
* \[[`16fbd9da0d`](https://github.com/nodejs/node/commit/16fbd9da0d)] - **deps**: 将所有 openssl 头文件复制到 include 目录 (Shigeki Ohtsu) [#16691](https://github.com/nodejs/node/pull/16691)
* \[[`55e15ec820`](https://github.com/nodejs/node/commit/55e15ec820)] - **deps**: 将 openssl 源码升级到 1.0.2m (Shigeki Ohtsu) [#16691](https://github.com/nodejs/node/pull/16691)
* \[[`9c3e246ffe`](https://github.com/nodejs/node/commit/9c3e246ffe)] - **deps**: 从 V8 上游回移 4e18190 (jshin) [#15562](https://github.com/nodejs/node/pull/15562)
* \[[`43d1ac3a62`](https://github.com/nodejs/node/commit/43d1ac3a62)] - **deps**: 从 V8 上游回移 bff3074 (Myles Borins) [#15562](https://github.com/nodejs/node/pull/15562)
* \[[`b259fd3bd5`](https://github.com/nodejs/node/commit/b259fd3bd5)] - **deps**: 从 V8 上游挑选 d7f813b4 (akos.palfi) [#15562](https://github.com/nodejs/node/pull/15562)
* \[[`85800c4ba4`](https://github.com/nodejs/node/commit/85800c4ba4)] - **deps**: 从上游 V8 回移 e28183b5 (karl) [#15562](https://github.com/nodejs/node/pull/15562)
* \[[`06eb181916`](https://github.com/nodejs/node/commit/06eb181916)] - **deps**: 更新 openssl asm 和 asm_obsolete 文件 (Daniel Bevenius) [#13233](https://github.com/nodejs/node/pull/13233)
* \[[`c0fe1fccc3`](https://github.com/nodejs/node/commit/c0fe1fccc3)] - **deps**: 更新 openssl 配置文件 (Daniel Bevenius) [#13233](https://github.com/nodejs/node/pull/13233)
* \[[`523eb60424`](https://github.com/nodejs/node/commit/523eb60424)] - **deps**: 为 openssl s_client 添加 -no_rand_screen (Shigeki Ohtsu) [nodejs/io.js#1836](https://github.com/nodejs/io.js/pull/1836)
* \[[`0aacd5a8cd`](https://github.com/nodejs/node/commit/0aacd5a8cd)] - **deps**: 修复 x86_win32 中 openssl 的 asm 构建错误 (Shigeki Ohtsu) [iojs/io.js#1389](https://github.com/iojs/io.js/pull/1389)
* \[[`80c48c0720`](https://github.com/nodejs/node/commit/80c48c0720)] - **deps**: 修复 ia32 win32 上的 openssl 汇编错误 (Fedor Indutny) [iojs/io.js#1389](https://github.com/iojs/io.js/pull/1389)
* \[[`bbd92b4676`](https://github.com/nodejs/node/commit/bbd92b4676)] - **deps**: 将所有 openssl 头文件复制到 include 目录 (Daniel Bevenius) [#13233](https://github.com/nodejs/node/pull/13233)
* \[[`8507f0fb5d`](https://github.com/nodejs/node/commit/8507f0fb5d)] - **deps**: 将 openssl 源码升级到 1.0.2l (Daniel Bevenius) [#13233](https://github.com/nodejs/node/pull/13233)
* \[[`9bfada8f0c`](https://github.com/nodejs/node/commit/9bfada8f0c)] - **deps**: 添加比较 OpenSSL 变更的示例 (Daniel Bevenius) [#13234](https://github.com/nodejs/node/pull/13234)
* \[[`71f9cdf241`](https://github.com/nodejs/node/commit/71f9cdf241)] - **deps**: 从 V8 上游挑选 09db540,686558d (Jesse Rosenberger) [#14829](https://github.com/nodejs/node/pull/14829)
* \[[`751f1ac08e`](https://github.com/nodejs/node/commit/751f1ac08e)] - _**Revert**_ "**deps**: 从上游 V8 回移 e093a04, 09db540" (Jesse Rosenberger) [#14829](https://github.com/nodejs/node/pull/14829)
* \[[`ed6298c7de`](https://github.com/nodejs/node/commit/ed6298c7de)] - **deps**: 从 c-ares 上游挑选 18ea996 (Anna Henningsen) [#13883](https://github.com/nodejs/node/pull/13883)
* \[[`639180adfa`](https://github.com/nodejs/node/commit/639180adfa)] - **deps**: 更新 openssl asm 和 asm_obsolete 文件 (Shigeki Ohtsu) [#12913](https://github.com/nodejs/node/pull/12913)
* \[[`9ba73e1797`](https://github.com/nodejs/node/commit/9ba73e1797)] - **deps**: 从上游 OpenSSL 挑选 4ae5993 (Shigeki Ohtsu) [#12913](https://github.com/nodejs/node/pull/12913)
* \[[`f8e282e51c`](https://github.com/nodejs/node/commit/f8e282e51c)] - **doc**: 修复 zlib.md 中的拼写错误 (Luigi Pinca) [#16480](https://github.com/nodejs/node/pull/16480)
* \[[`532a2941cb`](https://github.com/nodejs/node/commit/532a2941cb)] - **doc**: 在 UPGRADING.md 中添加缺失的 make 命令 (Daniel Bevenius) [#13233](https://github.com/nodejs/node/pull/13233)
* \[[`1db33296cb`](https://github.com/nodejs/node/commit/1db33296cb)] - **doc**: 为 subprocess.killed 属性添加条目 (Rich Trott) [#14578](https://github.com/nodejs/node/pull/14578)
* \[[`0fa09dfd77`](https://github.com/nodejs/node/commit/0fa09dfd77)] - **doc**: 将 `child` 改为 `subprocess` (Rich Trott) [#14578](https://github.com/nodejs/node/pull/14578)
* \[[`43bbfafaef`](https://github.com/nodejs/node/commit/43bbfafaef)] - **docs**: 修复 crypto.md 中的损坏链接 (Zuzana Svetlikova) [#15182](https://github.com/nodejs/node/pull/15182)
* \[[`1bde7f5cef`](https://github.com/nodejs/node/commit/1bde7f5cef)] - **openssl**: 修复 win32 上应用程序对按键的要求 (Shigeki Ohtsu) [iojs/io.js#1389](https://github.com/iojs/io.js/pull/1389)
* \[[`e69f47b686`](https://github.com/nodejs/node/commit/e69f47b686)] - **openssl**: 修复 win32 上应用程序对按键的要求 (Shigeki Ohtsu) [iojs/io.js#1389](https://github.com/iojs/io.js/pull/1389)
* \[[`cb92f93cd5`](https://github.com/nodejs/node/commit/cb92f93cd5)] - **test**: 从 addons 中移除内部头文件 (Gibson Fahnestock) [#7947](https://github.com/nodejs/node/pull/7947)
* \[[`5d9164c315`](https://github.com/nodejs/node/commit/5d9164c315)] - **test**: 将 test-cluster-debug-port 移到 sequential (Oleksandr Kushchak) [#16292](https://github.com/nodejs/node/pull/16292)
* \[[`07c912e849`](https://github.com/nodejs/node/commit/07c912e849)] - **tools**: 更新 certdata.txt (Ben Noordhuis) [#13279](https://github.com/nodejs/node/pull/13279)
* \[[`c40bffcb88`](https://github.com/nodejs/node/commit/c40bffcb88)] - **tools**: 更新 certdata.txt (Ben Noordhuis) [#12402](https://github.com/nodejs/node/pull/12402)
* \[[`161162713f`](https://github.com/nodejs/node/commit/161162713f)] - **tools**: 明确包含 key-id (Myles Borins) [#13309](https://github.com/nodejs/node/pull/13309)
* \[[`0c820c092b`](https://github.com/nodejs/node/commit/0c820c092b)] - **v8**: 修复递归方法中的栈溢出 (Ben Noordhuis) [#12460](https://github.com/nodejs/node/pull/12460)
* \[[`a1f992975f`](https://github.com/nodejs/node/commit/a1f992975f)] - **zlib**: 修复初始化失败时的崩溃 (Anna Henningsen) [#14666](https://github.com/nodejs/node/pull/14666)
* \[[`31bf595b94`](https://github.com/nodejs/node/commit/31bf595b94)] - **zlib**: 修复 Node 崩溃于无效选项 (Alexey Orlenko) [#13098](https://github.com/nodejs/node/pull/13098)

<a id="4.8.5"></a>

## 2017-10-24，版本 4.8.5 'Argon'（维护版），@MylesBorins

这是一个安全更新。所有 Node.js 用户都应查阅位于 <https://nodejs.org/en/blog/vulnerability/oct-2017-dos/> 的安全发布摘要，以了解已修补漏洞的详细信息。

### 重要变更

* **zlib**:
  * CVE-2017-14919 - 在 zlib v1.2.9 中，做出了一项变更：当使用 windowBits 设置为 8 来初始化原始 deflate 流时，会抛出错误。在某些版本中，这会导致 Node 崩溃且无法恢复；而在另一些版本中，则会抛出异常。Node.js 现在会优雅地将 windowBits 设为 9，以复现旧版行为并避免 DOS 向量。 [nodejs-private/node-private#95](https://github.com/nodejs-private/node-private/pull/95)

### 提交

* \[[`f5defa2a7c`](https://github.com/nodejs/node/commit/733578bb2e)] - **zlib**: 优雅地将 windowBits 从 8 设为 9 (Myles Borins) [nodejs-private/node-private#95](https://github.com/nodejs-private/node-private/pull/95)

<a id="4.8.4"></a>

## 2017-07-11，版本 4.8.4 'Argon'（维护版），@MylesBorins

这是一个安全更新。所有 Node.js 用户都应查阅位于 <https://nodejs.org/en/blog/vulnerability/july-2017-security-releases/> 的安全发布摘要，以了解已修补漏洞的详细信息。

### 重要变更

* **build**:
  * 禁用 V8 快照 - 目前嵌入快照中的 hashseed 对于二进制文件的所有运行都是相同的。这会使 node 暴露于碰撞攻击，从而可能导致拒绝服务。我们已临时禁用快照，直到找到更稳健的解决方案（Ali Ijaz Sheikh）
* **deps**:
  * CVE-2017-1000381 - c-ares 函数 ares\_parse\_naptr\_reply() 用于解析 NAPTR 响应，如果传入的 DNS 响应数据包以特定方式构造，可能会触发读取给定输入缓冲区之外的内存。此补丁在处理记录之前会检查 NAPTR 记录所需元素是否有足够的数据（2 个 int16，字符串长度共 3 字节）。（David Drysdale）

### 提交

* \[[`9d51bdc9d4`](https://github.com/nodejs/node/commit/9d51bdc9d4)] - **build**: 禁用 V8 快照 (Ali Ijaz Sheikh) [nodejs/node-private#84](https://github.com/nodejs/node-private/pull/84)
* \[[`80fe2662e4`](https://github.com/nodejs/node/commit/80fe2662e4)] - **deps**: 从 cares 上游 cherry-pick 9478908a49 (David Drysdale) [nodejs/node-private#88](https://github.com/nodejs/node-private/pull/88)
* \[[`d6969a717f`](https://github.com/nodejs/node/commit/d6969a717f)] - **http**: 使用 Buffer.from 以避免调用 Buffer(num) (Сковорода Никита Андреевич) [nodejs/node-private#83](https://github.com/nodejs/node-private/pull/83)
* \[[`58a8f150e5`](https://github.com/nodejs/node/commit/58a8f150e5)] - **test**: 验证 hash seed 的唯一性 (Ali Ijaz Sheikh) [nodejs/node-private#84](https://github.com/nodejs/node-private/pull/84)

<a id="4.8.3"></a>

## 2017-05-02，版本 4.8.3 'Argon'（维护版），@MylesBorins

### 重要变更

* **module**:
  * [模块加载的全局回退](https://nodejs.org/dist/latest-v4.x/docs/api/modules.html#modules_loading_from_the_global_folders) 到 Node 可执行文件目录现在在 Windows 上可以正常工作。（Richard Lau） [#9283](https://github.com/nodejs/node/pull/9283)
* **src**:
  * 修复了极少见边界情况下的 base64 解码（Nikolai Vavilov） [#11995](https://github.com/nodejs/node/pull/11995)
* **tls**:
  * 修复使用 TLS 时罕见的段错误
    * （Trevor Norris） [#11947](https://github.com/nodejs/node/pull/11947)
    * （Ben Noordhuis） [#11898](https://github.com/nodejs/node/pull/11898)
    * （jBarz） [#11776](https://github.com/nodejs/node/pull/11776)

### 提交

* \[[`44260806a6`](https://github.com/nodejs/node/commit/44260806a6)] - 部分回退 "tls: 跟踪已关闭的流"（Trevor Norris） [#11947](https://github.com/nodejs/node/pull/11947)
* \[[`ab3fdf531f`](https://github.com/nodejs/node/commit/ab3fdf531f)] - **deps**: 从 V8 上游 cherry-pick ca0f9573 (Ali Ijaz Sheikh) [#11940](https://github.com/nodejs/node/pull/11940)
* \[[`07b92a3c0b`](https://github.com/nodejs/node/commit/07b92a3c0b)] - **doc**: 为 v4.x 添加受支持平台列表 (Michael Dawson) [#12091](https://github.com/nodejs/node/pull/12091)
* \[[`ba91c41478`](https://github.com/nodejs/node/commit/ba91c41478)] - **module**: 修复在 Windows 上从全局文件夹加载 (Richard Lau) [#9283](https://github.com/nodejs/node/pull/9283)
* \[[`b5b78b12b8`](https://github.com/nodejs/node/commit/b5b78b12b8)] - **src**: 在 node.cc 中添加 fcntl.h 包含 (Bartosz Sosnowski) [#12540](https://github.com/nodejs/node/pull/12540)
* \[[`eb393f9ae1`](https://github.com/nodejs/node/commit/eb393f9ae1)] - **src**: 修复 base64 解码 (Nikolai Vavilov) [#11995](https://github.com/nodejs/node/pull/11995)
* \[[`8ed18a1429`](https://github.com/nodejs/node/commit/8ed18a1429)] - **src**: 确保 Windows 上的 fd 0-2 有效 (Bartosz Sosnowski) [#11863](https://github.com/nodejs/node/pull/11863)
* \[[`ff1d61c11b`](https://github.com/nodejs/node/commit/ff1d61c11b)] - **stream\_base,tls\_wrap**: 在析构时通知 (Trevor Norris) [#11947](https://github.com/nodejs/node/pull/11947)
* \[[`6040efd7dc`](https://github.com/nodejs/node/commit/6040efd7dc)] - **test**: 修复不稳定的 test-tls-wrap-timeout (Rich Trott) [#7857](https://github.com/nodejs/node/pull/7857)
* \[[`7a1920dc84`](https://github.com/nodejs/node/commit/7a1920dc84)] - **test**: 为 tls-socket-close 添加 hasCrypto 检查 (Daniel Bevenius) [#11911](https://github.com/nodejs/node/pull/11911)
* \[[`1dc6b38dcf`](https://github.com/nodejs/node/commit/1dc6b38dcf)] - **test**: 添加从全局文件夹加载的测试 (Richard Lau) [#9283](https://github.com/nodejs/node/pull/9283)
* \[[`54f5258582`](https://github.com/nodejs/node/commit/54f5258582)] - **tls**: 修复在部分读取后销毁时的段错误 (Ben Noordhuis) [#11898](https://github.com/nodejs/node/pull/11898)
* \[[`99749dccfe`](https://github.com/nodejs/node/commit/99749dccfe)] - **tls**: 跟踪已关闭的流 (jBarz) [#11776](https://github.com/nodejs/node/pull/11776)
* \[[`6d3aaa72a8`](https://github.com/nodejs/node/commit/6d3aaa72a8)] - **tls**: TLSSocket 在握手失败时会发出 'error' (Mariusz 'koder' Chwalba) [#8805](https://github.com/nodejs/node/pull/8805)

<a id="4.8.2"></a>

## 2017-04-04，版本 4.8.2 'Argon'（维护版），@MylesBorins

这是一个维护更新，用于修复在 4.8.1 中引入的内存泄漏。

它还包含将 zlib 升级到 1.2.11，以修复在 zlib 1.2.8 中存在的[一些低严重性 CVE](http://seclists.org/oss-sec/2016/q4/602)。

### 重要变更

* **crypto**:
  * 修复证书被撤销时的内存泄漏（Tom Atkinson） [#12089](https://github.com/nodejs/node/pull/12089)
* **deps**:
  * 将 zlib 升级到 1.2.11（Sam Roberts） [#10980](https://github.com/nodejs/node/pull/10980)

### 提交

* \[[`9d7fba4de2`](https://github.com/nodejs/node/commit/9d7fba4de2)] - **crypto**: 修复证书被撤销时的内存泄漏（Tom Atkinson） [#12089](https://github.com/nodejs/node/pull/12089)
* \[[`253980ff38`](https://github.com/nodejs/node/commit/253980ff38)] - **deps**: 修复 CLEAR\_HASH 宏，使其可作为单条语句使用（Sam Roberts） [#11616](https://github.com/nodejs/node/pull/11616)
* \[[`2e52a2699b`](https://github.com/nodejs/node/commit/2e52a2699b)] - **deps**: 将 zlib 升级到 1.2.11（Sam Roberts） [#10980](https://github.com/nodejs/node/pull/10980)

<a id="4.8.1"></a>

## 2017-03-21，版本 4.8.1 'Argon'（LTS），@MylesBorins

这个 LTS 版本包含 147 个提交。其中包括 55 个与测试相关的提交，
41 个与文档相关的提交，11 个与构建 / 工具相关的提交，
以及 1 个依赖更新提交。

### 重要变更

* **buffer**: `.toJSON()` 的性能现在平均提升高达 2859%。(Brian White) [#10895](https://github.com/nodejs/node/pull/10895)
* **IPC**: 在支持 Unix Domain Sockets 的平台上，已为进程 IPC 启用批量写入。(Alexey Orlenko) [#10677](https://github.com/nodejs/node/pull/10677)
  * 对某些工作负载，性能提升可能高达 40%。
* **http**:
  * 在使用 `http.request()` 时，控制字符现在始终会被拒绝。(Ben Noordhuis) [#8923](https://github.com/nodejs/node/pull/8923)
* **node**: 堆统计现在支持大于 4GB 的值。(Ben Noordhuis) [#10186](https://github.com/nodejs/node/pull/10186)

### 提交

* \[[`77f23ec5af`](https://github.com/nodejs/node/commit/77f23ec5af)] - **assert**: 解锁 assert API (Rich Trott) [#11304](https://github.com/nodejs/node/pull/11304)
* \[[`090037a41a`](https://github.com/nodejs/node/commit/090037a41a)] - **assert**: 移除不需要的条件 (Rich Trott) [#11314](https://github.com/nodejs/node/pull/11314)
* \[[`75af859af7`](https://github.com/nodejs/node/commit/75af859af7)] - **assert**: 进行小幅重构 (Rich Trott) [#11511](https://github.com/nodejs/node/pull/11511)
* \[[`994f562858`](https://github.com/nodejs/node/commit/994f562858)] - **assert**: 更新注释 (Kai Cataldo) [#10579](https://github.com/nodejs/node/pull/10579)
* \[[`14e57c1102`](https://github.com/nodejs/node/commit/14e57c1102)] - **benchmark**: 添加更全面的 timers 基准测试 (Jeremiah Senkpiel) [#10925](https://github.com/nodejs/node/pull/10925)
* \[[`850f85d96e`](https://github.com/nodejs/node/commit/850f85d96e)] - **benchmark**: 为对象属性添加基准测试 (Michaël Zasso) [#10949](https://github.com/nodejs/node/pull/10949)
* \[[`626875f2e4`](https://github.com/nodejs/node/commit/626875f2e4)] - **benchmark**: 不对自动生成的模块执行 lint (Brian White) [#10756](https://github.com/nodejs/node/pull/10756)
* \[[`9da6ebd73f`](https://github.com/nodejs/node/commit/9da6ebd73f)] - **benchmark**: 添加 dgram bind(+/- params) 基准测试 (Vse Mozhet Byt) [#11313](https://github.com/nodejs/node/pull/11313)
* \[[`a597c11ba4`](https://github.com/nodejs/node/commit/a597c11ba4)] - **benchmark**: 提高 net 基准测试的可读性 (Brian White) [#10446](https://github.com/nodejs/node/pull/10446)
* \[[`22c25dee92`](https://github.com/nodejs/node/commit/22c25dee92)] - **buffer**: 改进 toJSON() 性能 (Brian White) [#10895](https://github.com/nodejs/node/pull/10895)
* \[[`af3c21197d`](https://github.com/nodejs/node/commit/af3c21197d)] - **build**: 将源文件移出 headers 区域 (Daniel Bevenius) [#10850](https://github.com/nodejs/node/pull/10850)
* \[[`4bb61553f0`](https://github.com/nodejs/node/commit/4bb61553f0)] - **build**: 禁用 C4267 转换编译器警告 (Ben Noordhuis) [#11205](https://github.com/nodejs/node/pull/11205)
* \[[`6a45ac0ea9`](https://github.com/nodejs/node/commit/6a45ac0ea9)] - **build**: 修复 addon 构建输出中的换行 (Brian White) [#11466](https://github.com/nodejs/node/pull/11466)
* \[[`bfc553d55d`](https://github.com/nodejs/node/commit/bfc553d55d)] - **build**: 如果存在残留进程则在 CI 上失败 (Rich Trott) [#11269](https://github.com/nodejs/node/pull/11269)
* \[[`094bfe66aa`](https://github.com/nodejs/node/commit/094bfe66aa)] - **build**: 修复 node\_g 目标 (Daniel Bevenius) [#10153](https://github.com/nodejs/node/pull/10153)
* \[[`87db4f7225`](https://github.com/nodejs/node/commit/87db4f7225)] - **build**: 不重新生成 node 符号链接 (sxa555) [#9827](https://github.com/nodejs/node/pull/9827)
* \[[`e0dc0ceb37`](https://github.com/nodejs/node/commit/e0dc0ceb37)] - **build**: 不要在 --shared 下合并信号处理程序 (Stewart X Addison) [#10539](https://github.com/nodejs/node/pull/10539)
* \[[`4676eec382`](https://github.com/nodejs/node/commit/4676eec382)] - **child\_process**: 移除空的 if 条件 (cjihrig) [#11427](https://github.com/nodejs/node/pull/11427)
* \[[`2b867d2ae5`](https://github.com/nodejs/node/commit/2b867d2ae5)] - **child\_process**: 重构 internal/child\_process.js (Arseniy Maximov) [#11366](https://github.com/nodejs/node/pull/11366)
* \[[`c9a92ff494`](https://github.com/nodejs/node/commit/c9a92ff494)] - **crypto**: 返回 HMAC\_Update 的返回值 (Travis Meisenheimer) [#10891](https://github.com/nodejs/node/pull/10891)
* \[[`9c53e402d7`](https://github.com/nodejs/node/commit/9c53e402d7)] - **crypto**: freelist\_max\_len 已在 OpenSSL 1.1.0 中移除 (Adam Langley) [#10859](https://github.com/nodejs/node/pull/10859)
* \[[`c6f6b029a1`](https://github.com/nodejs/node/commit/c6f6b029a1)] - **crypto**: 添加由 StartCom/WoSign 签发的证书检查 (Shigeki Ohtsu) [#9469](https://github.com/nodejs/node/pull/9469)
* \[[`c56719f47a`](https://github.com/nodejs/node/commit/c56719f47a)] - **crypto**: 从 CNNIC 白名单中移除已过期证书 (Shigeki Ohtsu) [#9469](https://github.com/nodejs/node/pull/9469)
* \[[`b48f6ffc63`](https://github.com/nodejs/node/commit/b48f6ffc63)] - **crypto**: 使用 CHECK\_NE 替代 ABORT 或 abort (Sam Roberts) [#10413](https://github.com/nodejs/node/pull/10413)
* \[[`35a660ee70`](https://github.com/nodejs/node/commit/35a660ee70)] - **crypto**: 修复 root\_cert\_store 的处理。(Adam Langley) [#9409](https://github.com/nodejs/node/pull/9409)
* \[[`3516f35b77`](https://github.com/nodejs/node/commit/3516f35b77)] - **deps**: 从上游 V8 回移植 7c3748a (Cristian Cavalli) [#10873](https://github.com/nodejs/node/pull/10873)
* \[[`f9e121ead8`](https://github.com/nodejs/node/commit/f9e121ead8)] - **dgram**: 修复对 arguments 的可能去优化使用 (Vse Mozhet Byt)
* \[[`fc2bb2c8ef`](https://github.com/nodejs/node/commit/fc2bb2c8ef)] - **doc**: 将 Chris Dickinson 从 active releasers 中移除 (Ben Noordhuis) [#11011](https://github.com/nodejs/node/pull/11011)
* \[[`725a89606b`](https://github.com/nodejs/node/commit/725a89606b)] - **doc**: 移除 readme 中重复的 properties 项 (Javis Sullivan) [#10741](https://github.com/nodejs/node/pull/10741)
* \[[`db03294c41`](https://github.com/nodejs/node/commit/db03294c41)] - **doc**: 修复 http.md 中的拼写错误 (Peter Mescalchin) [#10975](https://github.com/nodejs/node/pull/10975)
* \[[`15188900b8`](https://github.com/nodejs/node/commit/15188900b8)] - **doc**: 为 dgram 添加需要抄送的人列表 (cjihrig) [#11035](https://github.com/nodejs/node/pull/11035)
* \[[`a0742902bd`](https://github.com/nodejs/node/commit/a0742902bd)] - **doc**: 更正并完善 dgram 的 Socket.bind 文档 (Alex Jordan) [#11025](https://github.com/nodejs/node/pull/11025)
* \[[`f464dd837f`](https://github.com/nodejs/node/commit/f464dd837f)] - **doc**: 为清晰起见编辑 CONTRIBUTING.md (Rich Trott) [#11045](https://github.com/nodejs/node/pull/11045)
* \[[`07dfed8f45`](https://github.com/nodejs/node/commit/07dfed8f45)] - **doc**: 修复 dns.md 中令人困惑的示例 (Vse Mozhet Byt) [#11022](https://github.com/nodejs/node/pull/11022)
* \[[`d55d760086`](https://github.com/nodejs/node/commit/d55d760086)] - **doc**: 添加人称代词选项 (Rich Trott) [#11089](https://github.com/nodejs/node/pull/11089)
* \[[`b86843a463`](https://github.com/nodejs/node/commit/b86843a463)] - **doc**: 澄清未更新 doc/api/cli.md 时的提示信息 (Stewart X Addison) [#10872](https://github.com/nodejs/node/pull/10872)
* \[[`c2d70908e6`](https://github.com/nodejs/node/commit/c2d70908e6)] - **doc**: 为清晰和风格起见编辑稳定性文本 (Rich Trott) [#11112](https://github.com/nodejs/node/pull/11112)
* \[[`115448ec94`](https://github.com/nodejs/node/commit/115448ec94)] - **doc**: 移除关于 assert 的断言说明 (Rich Trott) [#11113](https://github.com/nodejs/node/pull/11113)
* \[[`e90317d739`](https://github.com/nodejs/node/commit/e90317d739)] - **doc**: 修复 http.md 中的 "initial delay" 链接 (Timo Tijhof) [#11108](https://github.com/nodejs/node/pull/11108)
* \[[`788d736ab6`](https://github.com/nodejs/node/commit/788d736ab6)] - **doc**: 修正 COLLABORATOR_GUIDE.md 中的排版问题 (Anna Henningsen) [#11163](https://github.com/nodejs/node/pull/11163)
* \[[`2016aa4e07`](https://github.com/nodejs/node/commit/2016aa4e07)] - **doc**: 添加 not-an-aardvark 作为 ESLint 联系人 (Rich Trott) [#11169](https://github.com/nodejs/node/pull/11169)
* \[[`2b6ee39264`](https://github.com/nodejs/node/commit/2b6ee39264)] - **doc**: 改进测试指南 (Joyee Cheung) [#11150](https://github.com/nodejs/node/pull/11150)
* \[[`aae768c599`](https://github.com/nodejs/node/commit/aae768c599)] - **doc**: 从 assert 文档中移除多余段落 (Rich Trott) [#11174](https://github.com/nodejs/node/pull/11174)
* \[[`ca4b2f6154`](https://github.com/nodejs/node/commit/ca4b2f6154)] - **doc**: 修复 dgram 文档中的拼写错误 (Rich Trott) [#11186](https://github.com/nodejs/node/pull/11186)
* \[[`bb1e97c31a`](https://github.com/nodejs/node/commit/bb1e97c31a)] - **doc**: 添加并修复 System Error 属性 (Daiki Arai) [#10986](https://github.com/nodejs/node/pull/10986)
* \[[`e1e02efac5`](https://github.com/nodejs/node/commit/e1e02efac5)] - **doc**: 澄清 Buffer.byteLength 的行为 (Nikolai Vavilov) [#11238](https://github.com/nodejs/node/pull/11238)
* \[[`30d9202f54`](https://github.com/nodejs/node/commit/30d9202f54)] - **doc**: 提高文档标题的一致性 (Vse Mozhet Byt) [#11230](https://github.com/nodejs/node/pull/11230)
* \[[`10afa8befc`](https://github.com/nodejs/node/commit/10afa8befc)] - **doc**: 从 release 部分移除 "and io.js" (Ben Noordhuis) [#11054](https://github.com/nodejs/node/pull/11054)
* \[[`6f1db35e27`](https://github.com/nodejs/node/commit/6f1db35e27)] - **doc**: 更新邮箱并添加人称代词 (JungMinu) [#11318](https://github.com/nodejs/node/pull/11318)
* \[[`61ac3346ba`](https://github.com/nodejs/node/commit/61ac3346ba)] - **doc**: 更新 domain.md 中的代码示例 (Vse Mozhet Byt) [#11110](https://github.com/nodejs/node/pull/11110)
* \[[`0c9ea4fe8b`](https://github.com/nodejs/node/commit/0c9ea4fe8b)] - **doc**: dns 示例暗示字符串参数是数组 (Sam Roberts) [#11350](https://github.com/nodejs/node/pull/11350)
* \[[`485ec6c180`](https://github.com/nodejs/node/commit/485ec6c180)] - **doc**: 将 STYLE-GUIDE 改为 STYLE_GUIDE (Dean Coakley) [#11460](https://github.com/nodejs/node/pull/11460)
* \[[`41bf266b0a`](https://github.com/nodejs/node/commit/41bf266b0a)] - **doc**: 添加 STYLE_GUIDE（从 nodejs/docs 移入）(Gibson Fahnestock) [#11321](https://github.com/nodejs/node/pull/11321)
* \[[`6abfcd560b`](https://github.com/nodejs/node/commit/6abfcd560b)] - **doc**: 为 net.Server 的 error 事件添加注释 (QianJin2013) [#11136](https://github.com/nodejs/node/pull/11136)
* \[[`f4bc12dd11`](https://github.com/nodejs/node/commit/f4bc12dd11)] - **doc**: 注明 message 事件监听器引用 IPC 通道 (Diego Rodríguez Baquero) [#11494](https://github.com/nodejs/node/pull/11494)
* \[[`09c9105a79`](https://github.com/nodejs/node/commit/09c9105a79)] - **doc**: assert 方法的参数类型 (Amelia Clarke) [#11548](https://github.com/nodejs/node/pull/11548)
* \[[`d622b67302`](https://github.com/nodejs/node/commit/d622b67302)] - **doc**: 文档化 clientRequest.aborted (Zach Bjornson) [#11544](https://github.com/nodejs/node/pull/11544)
* \[[`d0dbf12884`](https://github.com/nodejs/node/commit/d0dbf12884)] - **doc**: 将 TheAlphaNerd 更新为 MylesBorins (Myles Borins) [#10586](https://github.com/nodejs/node/pull/10586)
* \[[`05273c5a4e`](https://github.com/nodejs/node/commit/05273c5a4e)] - **doc**: 更新 AUTHORS 列表以修正姓名 (Noah Rose Ledesma) [#10945](https://github.com/nodejs/node/pull/10945)
* \[[`79f700c891`](https://github.com/nodejs/node/commit/79f700c891)] - **doc**: 将 TimothyGu 添加到 collaborators (Timothy Gu) [#10954](https://github.com/nodejs/node/pull/10954)
* \[[`e656a4244a`](https://github.com/nodejs/node/commit/e656a4244a)] - **doc**: 将 edsadr 添加到 collaborators (Adrian Estrada) [#10883](https://github.com/nodejs/node/pull/10883)
* \[[`6d0e1621e5`](https://github.com/nodejs/node/commit/6d0e1621e5)] - **doc**: 澄清 fs.write() 中的变量 (Jessica Quynh Tran) [#9792](https://github.com/nodejs/node/pull/9792)
* \[[`7287dddd69`](https://github.com/nodejs/node/commit/7287dddd69)] - **doc**: 为 zlib 便捷方法添加链接 (Anna Henningsen) [#10829](https://github.com/nodejs/node/pull/10829)
* \[[`b10842ac77`](https://github.com/nodejs/node/commit/b10842ac77)] - **doc**: 在测试中排序 require 语句 (Sam Roberts) [#10616](https://github.com/nodejs/node/pull/10616)
* \[[`8f0e31b2d9`](https://github.com/nodejs/node/commit/8f0e31b2d9)] - **doc**: 在指南中添加测试命名信息 (Rich Trott) [#10584](https://github.com/nodejs/node/pull/10584)
* \[[`56b779db93`](https://github.com/nodejs/node/commit/56b779db93)] - **doc**: 在 V8 指南中将 "s/git apply/git am -3" (Myles Borins) [#10665](https://github.com/nodejs/node/pull/10665)
* \[[`3be7a7adb5`](https://github.com/nodejs/node/commit/3be7a7adb5)] - **doc**: 更新当前版本的 LTS 信息 (Evan Lucas) [#10720](https://github.com/nodejs/node/pull/10720)
* \[[`530adfdb2a`](https://github.com/nodejs/node/commit/530adfdb2a)] - **doc**: 改进 rinfo 对象文档 (Matt Crummey) [#10050](https://github.com/nodejs/node/pull/10050)
* \[[`48b5097ea8`](https://github.com/nodejs/node/commit/48b5097ea8)] - **http**: 让 request.abort() 销毁 socket (Luigi Pinca) [#10818](https://github.com/nodejs/node/pull/10818)
* \[[`15231aa6e5`](https://github.com/nodejs/node/commit/15231aa6e5)] - **http**: 拒绝 http.request() 中的控制字符 (Ben Noordhuis) [#8923](https://github.com/nodejs/node/pull/8923)
* \[[`fc2cd63998`](https://github.com/nodejs/node/commit/fc2cd63998)] - **lib,src**: 在堆统计中支持大于 4GB 的值 (Ben Noordhuis) [#10186](https://github.com/nodejs/node/pull/10186)
* \[[`533d2bf0a9`](https://github.com/nodejs/node/commit/533d2bf0a9)] - **meta**: 添加明确的弃用与 semver-major 政策 (James M Snell) [#7964](https://github.com/nodejs/node/pull/7964)
* \[[`923309adef`](https://github.com/nodejs/node/commit/923309adef)] - **meta**: 将 Chris Dickinson 从 CTC 中移除 (Chris Dickinson) [#11267](https://github.com/nodejs/node/pull/11267)
* \[[`342c3e2bb4`](https://github.com/nodejs/node/commit/342c3e2bb4)] - **meta**: 添加 Italo A. Casas 的 PGP 指纹 (Italo A. Casas) [#11202](https://github.com/nodejs/node/pull/11202)
* \[[`434b00be8a`](https://github.com/nodejs/node/commit/434b00be8a)] - **meta**: 取消 http 工作组的 charter (James M Snell) [#10604](https://github.com/nodejs/node/pull/10604)
* \[[`a7df345921`](https://github.com/nodejs/node/commit/a7df345921)] - **net**: 优先使用 === 而不是 == (Arseniy Maximov) [#11513](https://github.com/nodejs/node/pull/11513)
* \[[`396688f075`](https://github.com/nodejs/node/commit/396688f075)] - **readline**: 重构 construct Interface (Jackson Tian) [#4740](https://github.com/nodejs/node/pull/4740)
* \[[`a40f8429e6`](https://github.com/nodejs/node/commit/a40f8429e6)] - **readline**: 将 6 处比较改为严格比较 (Umair Ishaq) [#11078](https://github.com/nodejs/node/pull/11078)
* \[[`90d8e118fb`](https://github.com/nodejs/node/commit/90d8e118fb)] - **src**: 在 node_os.cc 中添加一个缺失的空格 (Alexey Orlenko) [#10931](https://github.com/nodejs/node/pull/10931)
* \[[`279cb09cc3`](https://github.com/nodejs/node/commit/279cb09cc3)] - **src**: 在 Unix 上为 pipe 句柄启用 writev (Alexey Orlenko) [#10677](https://github.com/nodejs/node/pull/10677)
* \[[`a557d6ce1d`](https://github.com/nodejs/node/commit/a557d6ce1d)] - **src**: 修复 internal http 实现中的 unconsume stream 问题 (Roee Kasher) [#11015](https://github.com/nodejs/node/pull/11015)
* \[[`c4e1af712e`](https://github.com/nodejs/node/commit/c4e1af712e)] - **src**: 移除未使用的 typedef (Ben Noordhuis) [#11322](https://github.com/nodejs/node/pull/11322)
* \[[`da2adb7133`](https://github.com/nodejs/node/commit/da2adb7133)] - **src**: 更新 http-parser 链接 (Daniel Bevenius) [#11477](https://github.com/nodejs/node/pull/11477)
* \[[`2f48001574`](https://github.com/nodejs/node/commit/2f48001574)] - **src**: 使用 ABORT() 宏代替 abort() (Evan Lucas) [#9613](https://github.com/nodejs/node/pull/9613)
* \[[`a9eb093ce3`](https://github.com/nodejs/node/commit/a9eb093ce3)] - **src**: 修复 34febfbf4 引入的内存泄漏 (Ben Noordhuis) [#9604](https://github.com/nodejs/node/pull/9604)
* \[[`f854d8c789`](https://github.com/nodejs/node/commit/f854d8c789)] - **test**: 提高 setMulticastLoopback() 覆盖率 (cjihrig) [#11277](https://github.com/nodejs/node/pull/11277)
* \[[`1df09f9d37`](https://github.com/nodejs/node/commit/1df09f9d37)] - **test**: 为 #10223 添加 known_issues 测试 (AnnaMag) [#11024](https://github.com/nodejs/node/pull/11024)
* \[[`be34b629de`](https://github.com/nodejs/node/commit/be34b629de)] - **test**: 提高 stream 的 duplex 覆盖率 (abouthiroppy) [#10963](https://github.com/nodejs/node/pull/10963)
* \[[`dc24127e5c`](https://github.com/nodejs/node/commit/dc24127e5c)] - **test**: 允许 spawnSync() 测试使用较慢的主机 (Rich Trott) [#10998](https://github.com/nodejs/node/pull/10998)
* \[[`2f4b6bda97`](https://github.com/nodejs/node/commit/2f4b6bda97)] - **test**: 扩展 fs.js 的测试覆盖率 (Vinícius do Carmo) [#10947](https://github.com/nodejs/node/pull/10947)
* \[[`3f6a2dbc2f`](https://github.com/nodejs/node/commit/3f6a2dbc2f)] - **test**: 改进 test-timers (Rich Trott) [#10960](https://github.com/nodejs/node/pull/10960)
* \[[`6ca9901d8b`](https://github.com/nodejs/node/commit/6ca9901d8b)] - **test**: 添加 process.assert 的测试 (abouthiroppy) [#10911](https://github.com/nodejs/node/pull/10911)
* \[[`d8af5a7431`](https://github.com/nodejs/node/commit/d8af5a7431)] - **test**: 改进 test-crypto-verify 中的代码 (Adrian Estrada) [#10845](https://github.com/nodejs/node/pull/10845)
* \[[`4d1f7b1df8`](https://github.com/nodejs/node/commit/4d1f7b1df8)] - **test**: 添加 dgram.Socket.prototype.bind 的测试 (abouthiroppy) [#10894](https://github.com/nodejs/node/pull/10894)
* \[[`6c1d82c68a`](https://github.com/nodejs/node/commit/6c1d82c68a)] - **test**: 改进 dgram 的覆盖率 (abouthiroppy) [#10783](https://github.com/nodejs/node/pull/10783)
* \[[`017afd48fd`](https://github.com/nodejs/node/commit/017afd48fd)] - **test**: 改进 test-console-instance 中的代码 (Adrian Estrada) [#10813](https://github.com/nodejs/node/pull/10813)
* \[[`1b1ba741c3`](https://github.com/nodejs/node/commit/1b1ba741c3)] - **test**: 改进 test-domain-multi 中的代码 (Adrian Estrada) [#10798](https://github.com/nodejs/node/pull/10798)
* \[[`ee27917a65`](https://github.com/nodejs/node/commit/ee27917a65)] - **test**: 改进 test-stream2-large-read-stall (stefan judis) [#10725](https://github.com/nodejs/node/pull/10725)
* \[[`9ac2316595`](https://github.com/nodejs/node/commit/9ac2316595)] - **test**: 改进 test-http-host-headers 中的代码 (Adrian Estrada) [#10830](https://github.com/nodejs/node/pull/10830)
* \[[`a9278a063f`](https://github.com/nodejs/node/commit/a9278a063f)] - **test**: 重构 cluster-preload.js (abouthiroppy) [#10701](https://github.com/nodejs/node/pull/10701)
* \[[`db60d92e15`](https://github.com/nodejs/node/commit/db60d92e15)] - **test**: 测试 hmac 绑定的健壮性 (Sam Roberts) [#10923](https://github.com/nodejs/node/pull/10923)
* \[[`a1a850f066`](https://github.com/nodejs/node/commit/a1a850f066)] - **test**: 不连接到 ::（改用 localhost）(Gibson Fahnestock)
* \[[`b3a8e95af3`](https://github.com/nodejs/node/commit/b3a8e95af3)] - **test**: 改进 test-assert (richnologies) [#10916](https://github.com/nodejs/node/pull/10916)
* \[[`56970efe51`](https://github.com/nodejs/node/commit/56970efe51)] - **test**: 提高 punycode 的 decode 覆盖率 (abouthiroppy) [#10940](https://github.com/nodejs/node/pull/10940)
* \[[`df69c2148a`](https://github.com/nodejs/node/commit/df69c2148a)] - **test**: 检查 fd 0,1,2 是否被使用，而不是访问模式 (John Barboza) [#10339](https://github.com/nodejs/node/pull/10339)
* \[[`7bceb4fb48`](https://github.com/nodejs/node/commit/7bceb4fb48)] - **test**: 为 assert.throws 添加消息验证 (Travis Meisenheimer) [#10890](https://github.com/nodejs/node/pull/10890)
* \[[`1c223ecc70`](https://github.com/nodejs/node/commit/1c223ecc70)] - **test**: 添加 http-common 的测试 (abouthiroppy) [#10832](https://github.com/nodejs/node/pull/10832)
* \[[`89e9da6b6d`](https://github.com/nodejs/node/commit/89e9da6b6d)] - **test**: _readableStream.awaitDrain 的测试 (Mark) [#8914](https://github.com/nodejs/node/pull/8914)
* \[[`53b0f413cd`](https://github.com/nodejs/node/commit/53b0f413cd)] - **test**: 改进 test-process-cpuUsage 中的代码 (Adrian Estrada) [#10714](https://github.com/nodejs/node/pull/10714)
* \[[`b3d1700d1f`](https://github.com/nodejs/node/commit/b3d1700d1f)] - **test**: 改进 pummel/test-exec 中的测试 (Chase Starr) [#10757](https://github.com/nodejs/node/pull/10757)
* \[[`6e7dfb1f45`](https://github.com/nodejs/node/commit/6e7dfb1f45)] - **test**: 修复 tools/test.py 中的 temp-dir 选项 (Gibson Fahnestock) [#10723](https://github.com/nodejs/node/pull/10723)
* \[[`9abde3ac6e`](https://github.com/nodejs/node/commit/9abde3ac6e)] - **test**: 在 common.js 中对 NODE_TEST_DIR 使用 realpath (Gibson Fahnestock) [#10723](https://github.com/nodejs/node/pull/10723)
* \[[`f86c64a13a`](https://github.com/nodejs/node/commit/f86c64a13a)] - **test**: 重构 test-keep-alive.js 的代码 (sivaprasanna) [#10684](https://github.com/nodejs/node/pull/10684)
* \[[`4d51db87dc`](https://github.com/nodejs/node/commit/4d51db87dc)] - **test**: 重构 test-doctool-html.js (abouthiroppy) [#10696](https://github.com/nodejs/node/pull/10696)
* \[[`ab65429e44`](https://github.com/nodejs/node/commit/ab65429e44)] - **test**: 重构 test-watch-file.js (sivaprasanna) [#10679](https://github.com/nodejs/node/pull/10679)
* \[[`4453c0c1dc`](https://github.com/nodejs/node/commit/4453c0c1dc)] - **test**: 重构 test-child-process-spawn-loop.js 中的代码 (sivaprasanna) [#10605](https://github.com/nodejs/node/pull/10605)
* \[[`42b86ea968`](https://github.com/nodejs/node/commit/42b86ea968)] - **test**: 改进 test-http-chunked-304 (Adrian Estrada) [#10462](https://github.com/nodejs/node/pull/10462)
* \[[`1ae95e64ee`](https://github.com/nodejs/node/commit/1ae95e64ee)] - **test**: 改进 test-fs-readfile-zero-byte-liar (Adrian Estrada) [#10570](https://github.com/nodejs/node/pull/10570)
* \[[`3f3c78d785`](https://github.com/nodejs/node/commit/3f3c78d785)] - **test**: 重构 test-fs-utimes (Junshu Okamoto) [#9290](https://github.com/nodejs/node/pull/9290)
* \[[`50a868b3f7`](https://github.com/nodejs/node/commit/50a868b3f7)] - **test**: 在 sigwinch 测试中要求 handler 运行 (Rich Trott) [#11068](https://github.com/nodejs/node/pull/11068)
* \[[`c1f45ec2d0`](https://github.com/nodejs/node/commit/c1f45ec2d0)] - **test**: 为 test-assert 中的 throws 添加第 2 个参数 (Marlena Compton) [#11061](https://github.com/nodejs/node/pull/11061)
* \[[`f24aa7e071`](https://github.com/nodejs/node/commit/f24aa7e071)] - **test**: 改进 test-npm-install 中的错误信息 (Gonen Dukas) [#11027](https://github.com/nodejs/node/pull/11027)
* \[[`1db89d4009`](https://github.com/nodejs/node/commit/1db89d4009)] - **test**: 改进 removeListeners 函数的覆盖率 (matsuda-koushi) [#11140](https://github.com/nodejs/node/pull/11140)
* \[[`c532c16e53`](https://github.com/nodejs/node/commit/c532c16e53)] - **test**: 提高 dgram 测试的特异性 (Rich Trott) [#11187](https://github.com/nodejs/node/pull/11187)
* \[[`cb81ae8eea`](https://github.com/nodejs/node/commit/cb81ae8eea)] - **test**: 添加 vm 模块边界情况 (Franziska Hinkelmann) [#11265](https://github.com/nodejs/node/pull/11265)
* \[[`8629c956c3`](https://github.com/nodejs/node/commit/8629c956c3)] - **test**: 提高 punycode 测试覆盖率 (Sebastian Van Sande) [#11144](https://github.com/nodejs/node/pull/11144)
* \[[`caf1ba15f9`](https://github.com/nodejs/node/commit/caf1ba15f9)] - **test**: 为 dgram _createSocketHandle() 添加覆盖率 (cjihrig) [#11291](https://github.com/nodejs/node/pull/11291)
* \[[`d729e52ef3`](https://github.com/nodejs/node/commit/d729e52ef3)] - **test**: 改进 crypto 覆盖率 (Akito Ito) [#11280](https://github.com/nodejs/node/pull/11280)
* \[[`d1a8588cab`](https://github.com/nodejs/node/commit/d1a8588cab)] - **test**: 改进 net-connect-local-error 中的信息 (Rich Trott) [#11393](https://github.com/nodejs/node/pull/11393)
* \[[`f2fb4143b4`](https://github.com/nodejs/node/commit/f2fb4143b4)] - **test**: 重构 test-dgram-membership (Rich Trott) [#11388](https://github.com/nodejs/node/pull/11388)
* \[[`bf4703d66f`](https://github.com/nodejs/node/commit/bf4703d66f)] - **test**: 移除未使用的参数并修复比较 (Alexander) [#11396](https://github.com/nodejs/node/pull/11396)
* \[[`28471c23ff`](https://github.com/nodejs/node/commit/28471c23ff)] - **test**: 重构 test-http-response-splitting (Arseniy Maximov) [#11429](https://github.com/nodejs/node/pull/11429)
* \[[`cd3e17e248`](https://github.com/nodejs/node/commit/cd3e17e248)] - **test**: 提高 test-crypto.dh 的覆盖率 (Eric Christie) [#11253](https://github.com/nodejs/node/pull/11253)
* \[[`fa681ea55a`](https://github.com/nodejs/node/commit/fa681ea55a)] - **test**: 为 test-module-loading 添加正则检查 (Tarang Hirani) [#11413](https://github.com/nodejs/node/pull/11413)
* \[[`f0eee61a93`](https://github.com/nodejs/node/commit/f0eee61a93)] - **test**: 在 test-zlib-write-after-close 中检查 throw (Jason Wilson) [#11482](https://github.com/nodejs/node/pull/11482)
* \[[`f0c7c7fad4`](https://github.com/nodejs/node/commit/f0c7c7fad4)] - **test**: 修复不稳定的 test-vm-timeout-rethrow (Kunal Pathak) [#11530](https://github.com/nodejs/node/pull/11530)
* \[[`53f2848dc8`](https://github.com/nodejs/node/commit/53f2848dc8)] - **test**: 优先使用断言而不是 console 日志 (Rich Trott) [#11547](https://github.com/nodejs/node/pull/11547)
* \[[`0109321fd8`](https://github.com/nodejs/node/commit/0109321fd8)] - **test**: 重构 test-https-truncate (Rich Trott) [#10225](https://github.com/nodejs/node/pull/10225)
* \[[`536733697c`](https://github.com/nodejs/node/commit/536733697c)] - **test**: 简化 test-http-client-unescaped-path (Rod Vagg) [#9649](https://github.com/nodejs/node/pull/9649)
* \[[`4ce9bfb4e7`](https://github.com/nodejs/node/commit/4ce9bfb4e7)] - **test**: 排除与 #11541 相关的 pseudo-tty 测试 (Gireesh Punathil) [#11602](https://github.com/nodejs/node/pull/11602)
* \[[`53dd1a8539`](https://github.com/nodejs/node/commit/53dd1a8539)] - **tls**: 当请求 OCSP 时，在 STARTTLS 上不要崩溃 (Fedor Indutny) [#10706](https://github.com/nodejs/node/pull/10706)
* \[[`e607ff52fa`](https://github.com/nodejs/node/commit/e607ff52fa)] - **tools**: 将 eslintrc 重命名为未弃用的格式 (Sakthipriyan Vairamani) [#7699](https://github.com/nodejs/node/pull/7699)
* \[[`6648b729b7`](https://github.com/nodejs/node/commit/6648b729b7)] - **tools**: 添加 compile_commands.json gyp 生成器 (Ben Noordhuis) [#7986](https://github.com/nodejs/node/pull/7986)
* \[[`8f49962f47`](https://github.com/nodejs/node/commit/8f49962f47)] - **tools**: 在 configure 中建议使用 python2 命令 (Roman Reiss) [#11375](https://github.com/nodejs/node/pull/11375)
* \[[`4b83a83c06`](https://github.com/nodejs/node/commit/4b83a83c06)] - **tools,doc**: 添加 Google Analytics 跟踪。（Phillip Johnsen） [#6601](https://github.com/nodejs/node/pull/6601)
* \[[`ef63af6006`](https://github.com/nodejs/node/commit/ef63af6006)] - **tty**: 避免 TTYWrap::GetWindowSize() 中的越界警告 (Dmitry Tsvettsikh) [#11454](https://github.com/nodejs/node/pull/11454)
* \[[`2c84601062`](https://github.com/nodejs/node/commit/2c84601062)] - **util**: 如果尚不需要就不要初始化 Debug (Bryan English) [#8452](https://github.com/nodejs/node/pull/8452)

<a id="4.8.0"></a>

## 2017-02-21，版本 4.8.0 'Argon'（LTS），@MylesBorins

这个 LTS 版本包含 118 次提交。其中 73 次与文档相关，19 次与测试相关，6 次与构建 / 工具相关，另有 5 次提交是依赖更新。

### 重要变更

* **child\_process**：为 spawn() 添加 shell 选项（cjihrig） [#4598](https://github.com/nodejs/node/pull/4598)
* **deps**：
  * **v8**：公开关于堆空间的统计信息（Ben Ripkens） [#4463](https://github.com/nodejs/node/pull/4463)
* **crypto**：
  * 添加 ALPN 支持（Shigeki Ohtsu） [#2564](https://github.com/nodejs/node/pull/2564)
  * 允许向知名 CA 添加额外证书（Sam Roberts） [#9139](https://github.com/nodejs/node/pull/9139)
* **fs**：添加 fs.mkdtemp() 函数。（Florian MARGAINE） [#5333](https://github.com/nodejs/node/pull/5333)
* **process**：
  * 向 `process` 添加 `externalMemory`（Fedor Indutny） [#9587](https://github.com/nodejs/node/pull/9587)
  * 添加 process.cpuUsage()（Patrick Mueller） [#10796](https://github.com/nodejs/node/pull/10796)

### 提交

* \[[`78010aa0cd`](https://github.com/nodejs/node/commit/78010aa0cd)] - **build**：将 /opt/freeware/... 添加到 AIX 库路径（Stewart X Addison） [#10128](https://github.com/nodejs/node/pull/10128)
* \[[`0bb77f24fa`](https://github.com/nodejs/node/commit/0bb77f24fa)] - **build**：添加（非）交叉编译的 configure 标志（Jesús Leganés-Combarro 'piranna） [#10287](https://github.com/nodejs/node/pull/10287)
* \[[`58245225ef`](https://github.com/nodejs/node/commit/58245225ef)] - **(SEMVER-MINOR)** **child\_process**：为 spawn() 添加 shell 选项（cjihrig） [#4598](https://github.com/nodejs/node/pull/4598)
* \[[`1595328b44`](https://github.com/nodejs/node/commit/1595328b44)] - **(SEMVER-MINOR)** **crypto**：允许向知名 CA 添加额外证书（Sam Roberts） [#9139](https://github.com/nodejs/node/pull/9139)
* \[[`bf882fba35`](https://github.com/nodejs/node/commit/bf882fba35)] - **crypto**：使用引用计数管理 cert\_store（Adam Majer） [#9409](https://github.com/nodejs/node/pull/9409)
* \[[`4cf7dcff99`](https://github.com/nodejs/node/commit/4cf7dcff99)] - **crypto**：移除 alpn/npn 中不必要的变量（Shigeki Ohtsu） [#10831](https://github.com/nodejs/node/pull/10831)
* \[[`d8b902f787`](https://github.com/nodejs/node/commit/d8b902f787)] - **debugger**：在 `this.run()` 之后调用 `this.resume()`（Lance Ball） [#10099](https://github.com/nodejs/node/pull/10099)
* \[[`4e07bd45d6`](https://github.com/nodejs/node/commit/4e07bd45d6)] - **deps**：更新 V8 的补丁版本（Myles Borins） [#10668](https://github.com/nodejs/node/pull/10668)
* \[[`a234d445c4`](https://github.com/nodejs/node/commit/a234d445c4)] - **deps**：从 V8 上游回移植 a715957（Myles Borins） [#10668](https://github.com/nodejs/node/pull/10668)
* \[[`ce66c8e424`](https://github.com/nodejs/node/commit/ce66c8e424)] - **deps**：从 V8 上游回移植 7a88ff3（Myles Borins） [#10668](https://github.com/nodejs/node/pull/10668)
* \[[`8bd3d83e01`](https://github.com/nodejs/node/commit/8bd3d83e01)] - **deps**：从 V8 上游回移植 d800a65（Myles Borins） [#10668](https://github.com/nodejs/node/pull/10668)
* \[[`81e9a3bfcb`](https://github.com/nodejs/node/commit/81e9a3bfcb)] - **deps**：V8：修复符号的调试回溯（Ali Ijaz Sheikh） [#10732](https://github.com/nodejs/node/pull/10732)
* \[[`d8961bdb3b`](https://github.com/nodejs/node/commit/d8961bdb3b)] - **doc**：修正用于 Windows 测试的 vcbuild 选项（Jonathan Boarman） [#10686](https://github.com/nodejs/node/pull/10686)
* \[[`d3c5bc1c63`](https://github.com/nodejs/node/commit/d3c5bc1c63)] - **doc**：更新 BUILDING.md（rainabba） [#8704](https://github.com/nodejs/node/pull/8704)
* \[[`d61c181085`](https://github.com/nodejs/node/commit/d61c181085)] - **doc**：统一 dirname 和 filename 的描述（Sam Roberts） [#10527](https://github.com/nodejs/node/pull/10527)
* \[[`8eeccd82d2`](https://github.com/nodejs/node/commit/8eeccd82d2)] - **doc**：killSignal 选项接受整数值（Sakthipriyan Vairamani (thefourtheye)） [#10424](https://github.com/nodejs/node/pull/10424)
* \[[`7db7e47d7b`](https://github.com/nodejs/node/commit/7db7e47d7b)] - **doc**：在 dns lookup 中将逻辑或改为按位或（Sakthipriyan Vairamani (thefourtheye)） [#11037](https://github.com/nodejs/node/pull/11037)
* \[[`28b707ba42`](https://github.com/nodejs/node/commit/28b707ba42)] - **doc**：将弃用说明中的换行替换为空格（Sakthipriyan Vairamani (thefourtheye)） [#11074](https://github.com/nodejs/node/pull/11074)
* \[[`79d49866f2`](https://github.com/nodejs/node/commit/79d49866f2)] - **doc**：更新 CONTRIBUTING.MD，添加指向 V8 指南的链接（sarahmeyer） [#10070](https://github.com/nodejs/node/pull/10070)
* \[[`acbe4d3516`](https://github.com/nodejs/node/commit/acbe4d3516)] - **doc**：将 joyeecheung 添加为协作者（Joyee Cheung） [#10603](https://github.com/nodejs/node/pull/10603)
* \[[`c7378c4d5f`](https://github.com/nodejs/node/commit/c7378c4d5f)] - **doc**：警告 child\_process 中未验证输入的风险（Matthew Garrett） [#10466](https://github.com/nodejs/node/pull/10466)
* \[[`08e924e45c`](https://github.com/nodejs/node/commit/08e924e45c)] - **doc**：要求双因素身份验证（Rich Trott） [#10529](https://github.com/nodejs/node/pull/10529)
* \[[`d260fb2e7e`](https://github.com/nodejs/node/commit/d260fb2e7e)] - **doc**：在 V8 指南中使用 "Node.js"（Rich Trott） [#10438](https://github.com/nodejs/node/pull/10438)
* \[[`4f168a4a31`](https://github.com/nodejs/node/commit/4f168a4a31)] - **doc**：require() 首先尝试核心模块而非原生模块（Vicente Jimenez Aguilar） [#10324](https://github.com/nodejs/node/pull/10324)
* \[[`5777c79c52`](https://github.com/nodejs/node/commit/5777c79c52)] - **doc**：澄清 review 和 landing 流程（Joyee Cheung） [#10202](https://github.com/nodejs/node/pull/10202)
* \[[`d3a7fb8a9e`](https://github.com/nodejs/node/commit/d3a7fb8a9e)] - **doc**：将“Start a Working Group”重定向到 TSC 仓库（William Kapke） [#9655](https://github.com/nodejs/node/pull/9655)
* \[[`0e51cbb827`](https://github.com/nodejs/node/commit/0e51cbb827)] - **doc**：添加 Working Group 解散文本（William Kapke） [#9656](https://github.com/nodejs/node/pull/9656)
* \[[`919e0cb8f2`](https://github.com/nodejs/node/commit/919e0cb8f2)] - **doc**：改进 console.md 中的示例效率（Vse Mozhet Byt） [#10451](https://github.com/nodejs/node/pull/10451)
* \[[`70ea38f2ee`](https://github.com/nodejs/node/commit/70ea38f2ee)] - **doc**：将 console.md 中的 var 改为 const / let（Vse Mozhet Byt） [#10451](https://github.com/nodejs/node/pull/10451)
* \[[`dda777bf9e`](https://github.com/nodejs/node/commit/dda777bf9e)] - **doc**：统一 “Returns:” 的第二部分（Myles Borins） [#10391](https://github.com/nodejs/node/pull/10391)
* \[[`3b252a69a0`](https://github.com/nodejs/node/commit/3b252a69a0)] - **doc**：澄清 BUILDING 中关于 macosx-firewall 的建议（Chase Starr） [#10311](https://github.com/nodejs/node/pull/10311)
* \[[`c4df02c815`](https://github.com/nodejs/node/commit/c4df02c815)] - **doc**：将 Michaël Zasso 添加到 CTC（Michaël Zasso）
* \[[`2269d7db0f`](https://github.com/nodejs/node/commit/2269d7db0f)] - **(SEMVER-MINOR)** **fs**：添加 fs.mkdtemp() 函数。（Florian MARGAINE） [#5333](https://github.com/nodejs/node/pull/5333)
* \[[`2eda3c7c75`](https://github.com/nodejs/node/commit/2eda3c7c75)] - **lib,test**：使用一致的运算符换行风格（Michaël Zasso） [#10178](https://github.com/nodejs/node/pull/10178)
* \[[`7505b86d2f`](https://github.com/nodejs/node/commit/7505b86d2f)] - **os**：修复 aix 上的 os.release() 并添加测试（jBarz） [#10245](https://github.com/nodejs/node/pull/10245)
* \[[`7a9c8d8f10`](https://github.com/nodejs/node/commit/7a9c8d8f10)] - **(SEMVER-MINOR)** **process**：添加 process.cpuUsage() - 实现、文档、测试（Patrick Mueller） [#10796](https://github.com/nodejs/node/pull/10796)
* \[[`23a573f7cb`](https://github.com/nodejs/node/commit/23a573f7cb)] - **(SEMVER-MINOR)** **process**：添加 `process.memoryUsage.external`（Fedor Indutny） [#9587](https://github.com/nodejs/node/pull/9587)
* \[[`be6203715a`](https://github.com/nodejs/node/commit/be6203715a)] - **src**：说明 NODE\_MODULE\_VERSION 的用途（Sam Roberts） [#10414](https://github.com/nodejs/node/pull/10414)
* \[[`3f29cbb5bc`](https://github.com/nodejs/node/commit/3f29cbb5bc)] - **src**：修复 32 位 node 的字符串格式错误（Alex Newman） [#10082](https://github.com/nodejs/node/pull/10082)
* \[[`271f5783fe`](https://github.com/nodejs/node/commit/271f5783fe)] - **stream, test**：测试 \_readableState.emittedReadable（Joyee Cheung） [#10249](https://github.com/nodejs/node/pull/10249)
* \[[`c279cbe6a9`](https://github.com/nodejs/node/commit/c279cbe6a9)] - **test**：修复 test.py 命令行选项处理（Julien Gilli） [#11153](https://github.com/nodejs/node/pull/11153)
* \[[`0f5d82e583`](https://github.com/nodejs/node/commit/0f5d82e583)] - **test**：向 test.py 添加 --abort-on-timeout 选项（Julien Gilli） [#11086](https://github.com/nodejs/node/pull/11086)
* \[[`735119c6fb`](https://github.com/nodejs/node/commit/735119c6fb)] - **test**：清理 stream 测试（Italo A. Casas） [#8668](https://github.com/nodejs/node/pull/8668)
* \[[`f9f8e4ee3e`](https://github.com/nodejs/node/commit/f9f8e4ee3e)] - **test**：重构 test-preload（Rich Trott） [#9803](https://github.com/nodejs/node/pull/9803)
* \[[`e7c4dfb83b`](https://github.com/nodejs/node/commit/e7c4dfb83b)] - **test**：目录中 require() 时，无效的 package.json 会导致错误（Sam Shull） [#10044](https://github.com/nodejs/node/pull/10044)
* \[[`22226fa900`](https://github.com/nodejs/node/commit/22226fa900)] - **test**：重构 test-pipe-head（Travis Bretton） [#10036](https://github.com/nodejs/node/pull/10036)
* \[[`11115c0d85`](https://github.com/nodejs/node/commit/11115c0d85)] - **test**：为 assert.throws() 添加第二个参数（Ken Russo） [#9987](https://github.com/nodejs/node/pull/9987)
* \[[`96ca40bdd8`](https://github.com/nodejs/node/commit/96ca40bdd8)] - **test**：重构 test-tls-0-dns-altname（Richard Karmazin） [#9948](https://github.com/nodejs/node/pull/9948)
* \[[`98496b6d3e`](https://github.com/nodejs/node/commit/98496b6d3e)] - **test**：重构 test-sync-fileread（Jason Wohlgemuth） [#9941](https://github.com/nodejs/node/pull/9941)
* \[[`324c82b1c9`](https://github.com/nodejs/node/commit/324c82b1c9)] - **test**：几乎在所有地方使用 common.fixturesDir（Bryan English） [#6997](https://github.com/nodejs/node/pull/6997)
* \[[`ce91bb21ba`](https://github.com/nodejs/node/commit/ce91bb21ba)] - **test**：重构 test-repl-mode.js（Cesar Hernandez） [#10061](https://github.com/nodejs/node/pull/10061)
* \[[`61cbc202a1`](https://github.com/nodejs/node/commit/61cbc202a1)] - **test**：重构 test-net-dns-custom-lookup（Kent.Fan） [#10071](https://github.com/nodejs/node/pull/10071)
* \[[`812c6361ff`](https://github.com/nodejs/node/commit/812c6361ff)] - **test**：重构 test-tls-server-verify（Hutson Betts） [#10076](https://github.com/nodejs/node/pull/10076)
* \[[`19907c27a6`](https://github.com/nodejs/node/commit/19907c27a6)] - **test**：对简单流程跟踪使用 mustCall()（cjihrig） [#7753](https://github.com/nodejs/node/pull/7753)
* \[[`42da81e6cc`](https://github.com/nodejs/node/commit/42da81e6cc)] - **test**：为 pseudo-tty 测试同时设置 stdin（Anna Henningsen） [#10149](https://github.com/nodejs/node/pull/10149)
* \[[`53404dbc1f`](https://github.com/nodejs/node/commit/53404dbc1f)] - **test**：添加 stdin-setrawmode.out 文件（Jonathan Darling） [#10149](https://github.com/nodejs/node/pull/10149)
* \[[`1fac431307`](https://github.com/nodejs/node/commit/1fac431307)] - **test**：为 clearBuffer 状态机添加测试（Safia Abdalla） [#9922](https://github.com/nodejs/node/pull/9922)
* \[[`37a362275e`](https://github.com/nodejs/node/commit/37a362275e)] - **test**：更新 test-cluster-shared-handle-bind-error（cjihrig） [#10547](https://github.com/nodejs/node/pull/10547)
* \[[`f5e54f5d5f`](https://github.com/nodejs/node/commit/f5e54f5d5f)] - **test**：避免将 this 赋值给变量（cjihrig） [#10548](https://github.com/nodejs/node/pull/10548)
* \[[`28a5ce10af`](https://github.com/nodejs/node/commit/28a5ce10af)] - **test**：改进 test-http-allow-req-after-204-res（Adrian Estrada） [#10503](https://github.com/nodejs/node/pull/10503)
* \[[`52edebc8f3`](https://github.com/nodejs/node/commit/52edebc8f3)] - **test**：改进 test-fs-empty-readStream.js（Adrian Estrada） [#10479](https://github.com/nodejs/node/pull/10479)
* \[[`b74bc517a6`](https://github.com/nodejs/node/commit/b74bc517a6)] - **test**：在 test-http-server 中使用 strictEqual（Fabrice Tatieze） [#10478](https://github.com/nodejs/node/pull/10478)
* \[[`a9cd1d1267`](https://github.com/nodejs/node/commit/a9cd1d1267)] - **test**：重构 test-stream2-unpipe-drain（Chris Story） [#10033](https://github.com/nodejs/node/pull/10033)
* \[[`7020e9fd8b`](https://github.com/nodejs/node/commit/7020e9fd8b)] - **test**：添加 stdio.js 对 SIGWINCH 处理的测试（Sarah Meyer） [#10063](https://github.com/nodejs/node/pull/10063)
* \[[`56b193a9c2`](https://github.com/nodejs/node/commit/56b193a9c2)] - **test**：改进 test-vm-preserves-property 中的代码（Adrian Estrada） [#10428](https://github.com/nodejs/node/pull/10428)
* \[[`8a26ba142f`](https://github.com/nodejs/node/commit/8a26ba142f)] - **test**：修复不稳定的 test-https-timeout（Rich Trott） [#10404](https://github.com/nodejs/node/pull/10404)
* \[[`eeb2d7885a`](https://github.com/nodejs/node/commit/eeb2d7885a)] - **test**：改进 test-cluster-worker-constructor.js（Adrian Estrada） [#10396](https://github.com/nodejs/node/pull/10396)
* \[[`fd195b47d6`](https://github.com/nodejs/node/commit/fd195b47d6)] - **test**：stream readable resumeScheduled 状态（Italo A. Casas） [#10299](https://github.com/nodejs/node/pull/10299)
* \[[`135a7c9e19`](https://github.com/nodejs/node/commit/135a7c9e19)] - **test**：stream readable needReadable 状态（Joyee Cheung） [#10241](https://github.com/nodejs/node/pull/10241)
* \[[`f412b1fcfd`](https://github.com/nodejs/node/commit/f412b1fcfd)] - **test**：清理 domain-no-error-handler 测试（weyj4） [#10291](https://github.com/nodejs/node/pull/10291)
* \[[`14c28ebcf1`](https://github.com/nodejs/node/commit/14c28ebcf1)] - **test**：更新 test-domain-uncaught-exception.js（Andy Chen） [#10193](https://github.com/nodejs/node/pull/10193)
* \[[`928291c652`](https://github.com/nodejs/node/commit/928291c652)] - **test**：重构 test-domain.js（Siddhartha Sahai） [#10207](https://github.com/nodejs/node/pull/10207)
* \[[`13c6cec433`](https://github.com/nodejs/node/commit/13c6cec433)] - **test**：在缺少输出文件时失败（Anna Henningsen） [#10150](https://github.com/nodejs/node/pull/10150)
* \[[`544920f77b`](https://github.com/nodejs/node/commit/544920f77b)] - **test**：stream readableState readingMore 状态（Gregory） [#9868](https://github.com/nodejs/node/pull/9868)
* \[[`2f8bc9a7bc`](https://github.com/nodejs/node/commit/2f8bc9a7bc)] - **test**：将 ASSERT 改为 assert/（cjihrig） [#10544](https://github.com/nodejs/node/pull/10544)
* \[[`380a5d5e12`](https://github.com/nodejs/node/commit/380a5d5e12)] - **test**：修复不稳定的 test-http-client-timeout-with-data（Rich Trott） [#10431](https://github.com/nodejs/node/pull/10431)
* \[[`14e07c96e1`](https://github.com/nodejs/node/commit/14e07c96e1)] - **test**：重构 test-stdin-from-file（Rob Adelmann） [#10331](https://github.com/nodejs/node/pull/10331)
* \[[`424c86139d`](https://github.com/nodejs/node/commit/424c86139d)] - **test**：重构 test-fs-chmod 中的代码（Adrian Estrada） [#10440](https://github.com/nodejs/node/pull/10440)
* \[[`31aa877003`](https://github.com/nodejs/node/commit/31aa877003)] - **test**：改进 test-pipe.js 中的代码（Adrian Estrada） [#10452](https://github.com/nodejs/node/pull/10452)
* \[[`4bbd50ee07`](https://github.com/nodejs/node/commit/4bbd50ee07)] - **test**：改进 test-fs-readfile-error 中的代码（Adrian Estrada） [#10367](https://github.com/nodejs/node/pull/10367)
* \[[`9840f505f0`](https://github.com/nodejs/node/commit/9840f505f0)] - **test**：改进 test-vm-symbols 中的代码（Adrian Estrada） [#10429](https://github.com/nodejs/node/pull/10429)
* \[[`4efdbafeb3`](https://github.com/nodejs/node/commit/4efdbafeb3)] - **test**：重构 test-child-process-ipc（malen） [#9990](https://github.com/nodejs/node/pull/9990)
* \[[`dbfec29663`](https://github.com/nodejs/node/commit/dbfec29663)] - **test**：修复并改进 debug-break-on-uncaught（Sakthipriyan Vairamani (thefourtheye)） [#10370](https://github.com/nodejs/node/pull/10370)
* \[[`80f4a37023`](https://github.com/nodejs/node/commit/80f4a37023)] - **test**：重构 test-pipe-file-to-http（Josh Mays） [#10054](https://github.com/nodejs/node/pull/10054)
* \[[`a983400ac2`](https://github.com/nodejs/node/commit/a983400ac2)] - **test**：重构 test-tls-interleave（Brian Chirgwin） [#10017](https://github.com/nodejs/node/pull/10017)
* \[[`6db76da2c8`](https://github.com/nodejs/node/commit/6db76da2c8)] - **test**：重构 test-cluster-send-handle-twice.js（Amar Zavery） [#10049](https://github.com/nodejs/node/pull/10049)
* \[[`19b314e40a`](https://github.com/nodejs/node/commit/19b314e40a)] - **test**：更新 test-tls-check-server-identity.js（Kevin Cox） [#9986](https://github.com/nodejs/node/pull/9986)
* \[[`ab3e4c6a9b`](https://github.com/nodejs/node/commit/ab3e4c6a9b)] - **test**：改进 test-cluster-net-listen.js（Rico Cai） [#9953](https://github.com/nodejs/node/pull/9953)
* \[[`fb9a0ad6c0`](https://github.com/nodejs/node/commit/fb9a0ad6c0)] - **test**：重构 test-child-process-stdin（Segu Riluvan） [#10420](https://github.com/nodejs/node/pull/10420)
* \[[`122917df5a`](https://github.com/nodejs/node/commit/122917df5a)] - **test**：更改 var 声明，添加 mustCall 检查（Daniel Sims） [#9962](https://github.com/nodejs/node/pull/9962)
* \[[`d5e911c51e`](https://github.com/nodejs/node/commit/d5e911c51e)] - **test**：重构 test-cluster-worker-constructor（Christopher Rokita） [#9956](https://github.com/nodejs/node/pull/9956)
* \[[`7d61bbf647`](https://github.com/nodejs/node/commit/7d61bbf647)] - **test**：重构 test-stdin-script-child（Emanuel Buholzer） [#10321](https://github.com/nodejs/node/pull/10321)
* \[[`76bb3cbff9`](https://github.com/nodejs/node/commit/76bb3cbff9)] - **test**：重构 test-stream2-writable（Rich Trott） [#10353](https://github.com/nodejs/node/pull/10353)
* \[[`b87ee26b96`](https://github.com/nodejs/node/commit/b87ee26b96)] - **test**：将 assert.strict 改为 assert.strictEqual()（Ashita Nagesh） [#9988](https://github.com/nodejs/node/pull/9988)
* \[[`4514fd78f4`](https://github.com/nodejs/node/commit/4514fd78f4)] - **test**：重构 test-http-keep-alive 中的代码（Adrian Estrada） [#10350](https://github.com/nodejs/node/pull/10350)
* \[[`f301df405a`](https://github.com/nodejs/node/commit/f301df405a)] - **test**：在 test-cwd-enoent-repl.js 中使用 strictEqual（Neeraj Sharma） [#9952](https://github.com/nodejs/node/pull/9952)
* \[[`3b67001c99`](https://github.com/nodejs/node/commit/3b67001c99)] - **test**：重构 test-net-reconnect-error（Duy Le） [#9903](https://github.com/nodejs/node/pull/9903)
* \[[`34861efff6`](https://github.com/nodejs/node/commit/34861efff6)] - **test**：添加 test-require-invalid-package（Duy Le） [#9903](https://github.com/nodejs/node/pull/9903)
* \[[`90a79b3967`](https://github.com/nodejs/node/commit/90a79b3967)] - **test**：重构 test-timers-this（Rich Trott） [#10315](https://github.com/nodejs/node/pull/10315)
* \[[`5335b0a0d1`](https://github.com/nodejs/node/commit/5335b0a0d1)] - **test**：重构 test-tls-ecdh-disable（Aaron Williams） [#9989](https://github.com/nodejs/node/pull/9989)
* \[[`0f8a323546`](https://github.com/nodejs/node/commit/0f8a323546)] - **test**：清理 test-stdout-close-catch.js（Travis Bretton） [#10006](https://github.com/nodejs/node/pull/10006)
* \[[`fc67a955e2`](https://github.com/nodejs/node/commit/fc67a955e2)] - **test**：使用 const/let 和 common.mustCall（Outsider） [#9959](https://github.com/nodejs/node/pull/9959)
* \[[`2f44d7f367`](https://github.com/nodejs/node/commit/2f44d7f367)] - **test**：重构 test-crypto-random（Rich Trott） [#10232](https://github.com/nodejs/node/pull/10232)
* \[[`730c3b29e8`](https://github.com/nodejs/node/commit/730c3b29e8)] - **test**：重构 test-fs-fsync（Rob Adelmann） [#10176](https://github.com/nodejs/node/pull/10176)
* \[[`9c9d422433`](https://github.com/nodejs/node/commit/9c9d422433)] - **test**：重构 test-http-after-connect.js（larissayvette） [#10229](https://github.com/nodejs/node/pull/10229)
* \[[`827bbe7985`](https://github.com/nodejs/node/commit/827bbe7985)] - **test**：重构 assert.equal，更新语法为 ES6（Prieto, Marcos）
* \[[`121b68a283`](https://github.com/nodejs/node/commit/121b68a283)] - **test**：重构 http pipelined socket 测试（Rich Trott） [#10189](https://github.com/nodejs/node/pull/10189)
* \[[`7ca31e38fb`](https://github.com/nodejs/node/commit/7ca31e38fb)] - **test**：修复 openssl1.0.2h 的 alpn 测试（Shigeki Ohtsu） [#6550](https://github.com/nodejs/node/pull/6550)
* \[[`278d718a93`](https://github.com/nodejs/node/commit/278d718a93)] - **test**：重构 test-handle-wrap-close-abort（Rich Trott） [#10188](https://github.com/nodejs/node/pull/10188)
* \[[`f12bab65b8`](https://github.com/nodejs/node/commit/f12bab65b8)] - **test**：stream readableListening 内部状态（Italo A. Casas） [#9864](https://github.com/nodejs/node/pull/9864)
* \[[`210290dfba`](https://github.com/nodejs/node/commit/210290dfba)] - **test**：检查无效 signal 时的错误（Matt Phillips） [#10026](https://github.com/nodejs/node/pull/10026)
* \[[`4f5f0e4975`](https://github.com/nodejs/node/commit/4f5f0e4975)] - **test**：重构 test-net-keepalive.js（Kyle Corsi） [#9995](https://github.com/nodejs/node/pull/9995)
* \[[`cfa2b87b5d`](https://github.com/nodejs/node/commit/cfa2b87b5d)] - **test,lib,benchmark**：匹配函数名（Rich Trott） [#9113](https://github.com/nodejs/node/pull/9113)
* \[[`a67ada7d32`](https://github.com/nodejs/node/commit/a67ada7d32)] - **tls**：在使用 Buffer 对象前先复制它（Sakthipriyan Vairamani） [#8055](https://github.com/nodejs/node/pull/8055)
* \[[`e750f142ce`](https://github.com/nodejs/node/commit/e750f142ce)] - **(SEMVER-MINOR)** **tls, crypto**：添加 ALPN 支持（Shigeki Ohtsu） [#2564](https://github.com/nodejs/node/pull/2564)
* \[[`ef547f3325`](https://github.com/nodejs/node/commit/ef547f3325)] - **(SEMVER-MINOR)** **tls,crypto**：将 NPN 协议数据移到隐藏值（Shigeki Ohtsu） [#2564](https://github.com/nodejs/node/pull/2564)
* \[[`31434a1202`](https://github.com/nodejs/node/commit/31434a1202)] - **tools**：强制使用一致的运算符换行风格（Michaël Zasso） [#10178](https://github.com/nodejs/node/pull/10178)
* \[[`9f13b5f7d5`](https://github.com/nodejs/node/commit/9f13b5f7d5)] - **tools**：禁止在 assert.throws 中使用模板字面量（Michaël Zasso） [#10301](https://github.com/nodejs/node/pull/10301)
* \[[`c801de9814`](https://github.com/nodejs/node/commit/c801de9814)] - **tools**：为 assert.throws 参数添加 ESLint 规则（Michaël Zasso） [#10089](https://github.com/nodejs/node/pull/10089)
* \[[`b5e18f207f`](https://github.com/nodejs/node/commit/b5e18f207f)] - **tools**：添加 macosx-firwall 脚本以避免弹窗（Daniel Bevenius） [#10114](https://github.com/nodejs/node/pull/10114)
* \[[`30d60cf81c`](https://github.com/nodejs/node/commit/30d60cf81c)] - **(SEMVER-MINOR)** **v8,src**：公开关于堆空间的统计信息（Ben Ripkens） [#4463](https://github.com/nodejs/node/pull/4463)
* \[[`9556ef3241`](https://github.com/nodejs/node/commit/9556ef3241)] - **vm**：在我们中止时添加错误消息（Franziska Hinkelmann） [#8634](https://github.com/nodejs/node/pull/8634)
* \[[`fa11f4b1fc`](https://github.com/nodejs/node/commit/fa11f4b1fc)] - **win,msi**：为本地化字符串添加所需的 UIRef（Bill Ticehurst） [#8884](https://github.com/nodejs/node/pull/8884)

<a id="4.7.3"></a>

## 2017-01-31，版本 4.7.3 'Argon'（LTS），@MylesBorins

这是 'Argon' 发布线的一个安全更新，用于将 OpenSSL 升级到 1.0.2k 版本

尽管 OpenSSL 团队已将其最高严重性评级定为“中等”，Node.js
crypto 团队（Ben Noordhuis、Shigeki Ohtsu 和 Fedor Indutny）认为其对 Node
用户的影响为“低”。关于这一判断的详细信息可以在
[Nodejs.org 网站上](https://nodejs.org/en/blog/vulnerability/openssl-january-2017/)找到。

### 重要变更

* **deps**: 将 openssl 源码升级到 1.0.2k（Shigeki Ohtsu） [#11021](https://github.com/nodejs/node/pull/11021)

### 提交

* \[[`8029f64135`](https://github.com/nodejs/node/commit/8029f64135)] - **deps**: 更新 openssl asm 和 asm\_obsolete 文件（Shigeki Ohtsu） [#11021](https://github.com/nodejs/node/pull/11021)
* \[[`0081659a41`](https://github.com/nodejs/node/commit/0081659a41)] - **deps**: 为 openssl s\_client 添加 -no\_rand\_screen（Shigeki Ohtsu） [nodejs/io.js#1836](https://github.com/nodejs/io.js/pull/1836)
* \[[`e55c3f4e21`](https://github.com/nodejs/node/commit/e55c3f4e21)] - **deps**: 修复 x86\_win32 中 openssl 的 asm 构建错误（Shigeki Ohtsu） [iojs/io.js#1389](https://github.com/iojs/io.js/pull/1389)
* \[[`24640f9278`](https://github.com/nodejs/node/commit/24640f9278)] - **deps**: 修复 ia32 win32 上的 openssl 汇编错误（Fedor Indutny） [iojs/io.js#1389](https://github.com/iojs/io.js/pull/1389)
* \[[`6c7bdf58e0`](https://github.com/nodejs/node/commit/6c7bdf58e0)] - **deps**: 将所有 openssl 头文件复制到 include 目录（Shigeki Ohtsu） [#11021](https://github.com/nodejs/node/pull/11021)
* \[[`c80844769c`](https://github.com/nodejs/node/commit/c80844769c)] - **deps**: 将 openssl 源码升级到 1.0.2k（Shigeki Ohtsu） [#11021](https://github.com/nodejs/node/pull/11021)
* \[[`e3915a415b`](https://github.com/nodejs/node/commit/e3915a415b)] - **openssl**: 修复 win32 上应用程序中的按键要求（Shigeki Ohtsu） [iojs/io.js#1389](https://github.com/iojs/io.js/pull/1389)

<a id="4.7.2"></a>

## 2017-01-05，版本 4.7.2 'Argon'（LTS），@MylesBorins

这是一个特殊版本，包含 0 个提交。在发布后为 v4.7.1 推广到更多
平台时，发布服务器上的 tarball 被
覆盖，现在拥有不同的 shasum。为了消除发布
相关的任何歧义，我们决定发布一个不包含任何更改的 semver 补丁版本。

### 重要变更

N/A

### 提交

N/A

<a id="4.7.1"></a>

## 2017-01-03，版本 4.7.1 'Argon'（LTS），@MylesBorins

这个 LTS 版本包含 180 个提交。其中包括 117 个与测试相关的提交，
34 个与文档相关的提交，15 个与构建 / 工具相关的提交，以及 1 个
依赖更新提交。

### 重要变更

* **build**: AIX 构建现已支持共享库（Stewart Addison） [#9675](https://github.com/nodejs/node/pull/9675)
* **repl**: 传递给 repl 的选项将不再覆盖默认值（cjihrig） [#7826](https://github.com/nodejs/node/pull/7826)
* **timers**: 重新取消已取消的定时器将不再抛出错误（Jeremiah Senkpiel） [#9685](https://github.com/nodejs/node/pull/9685)

### 提交

* \[[`c5f82b8421`](https://github.com/nodejs/node/commit/c5f82b8421)] - **assert**: 修复等价 typed arrays 上的 deepEqual/deepStrictEqual（Feross Aboukhadijeh） [#8002](https://github.com/nodejs/node/pull/8002)
* \[[`60883de30f`](https://github.com/nodejs/node/commit/60883de30f)] - **async\_wrap**: 在 uv\_idle\_t 中调用 destroy() 回调（Trevor Norris）
* \[[`28dbc460c6`](https://github.com/nodejs/node/commit/28dbc460c6)] - **async\_wrap**: 将 Initialize 设为静态类成员（Trevor Norris）
* \[[`bb05cd13db`](https://github.com/nodejs/node/commit/bb05cd13db)] - **async\_wrap**: 将构造函数/析构函数移到 .cc（Trevor Norris）
* \[[`b1075f6193`](https://github.com/nodejs/node/commit/b1075f6193)] - **benchmark**: 拆分 timers 基准测试并进行重构（Rich Trott） [#9497](https://github.com/nodejs/node/pull/9497)
* \[[`7b4268b889`](https://github.com/nodejs/node/commit/7b4268b889)] - **benchmark,lib,test,tools**: 移除不需要的 . 转义（Rich Trott） [#9449](https://github.com/nodejs/node/pull/9449)
* \[[`54f2ce8ea0`](https://github.com/nodejs/node/commit/54f2ce8ea0)] - **build**: 优先使用 --shared-X-Y 而不是 pkg-config（Rod Vagg） [#9368](https://github.com/nodejs/node/pull/9368)
* \[[`61d377ddcd`](https://github.com/nodejs/node/commit/61d377ddcd)] - **build**: 使 configure 文件可被 python3 解析（kalrover） [#9657](https://github.com/nodejs/node/pull/9657)
* \[[`38e0f95d24`](https://github.com/nodejs/node/commit/38e0f95d24)] - **build**: 为 node-gyp 添加 MAKEFLAGS="-j1"（Daniel Bevenius） [#9450](https://github.com/nodejs/node/pull/9450)
* \[[`d1b6407395`](https://github.com/nodejs/node/commit/d1b6407395)] - **build**: 让 node-gyp 输出静默（Sakthipriyan Vairamani (thefourtheye)) [#8990](https://github.com/nodejs/node/pull/8990)
* \[[`ae2eff2997`](https://github.com/nodejs/node/commit/ae2eff2997)] - **build**: 让注释从行首开始（Sakthipriyan Vairamani (thefourtheye)) [#9375](https://github.com/nodejs/node/pull/9375)
* \[[`6f1f955b33`](https://github.com/nodejs/node/commit/6f1f955b33)] - **build**: 在 AIX 上默认使用 ppc64（Gibson Fahnestock） [#9645](https://github.com/nodejs/node/pull/9645)
* \[[`f8d4577762`](https://github.com/nodejs/node/commit/f8d4577762)] - **build**: 添加用于生成覆盖率报告的编译选项（Wayne Andrews） [#9463](https://github.com/nodejs/node/pull/9463)
* \[[`f2b00985f0`](https://github.com/nodejs/node/commit/f2b00985f0)] - **build**: 为 AIX 构建添加共享库支持（Stewart Addison） [#9675](https://github.com/nodejs/node/pull/9675)
* \[[`e2c5f41ddf`](https://github.com/nodejs/node/commit/e2c5f41ddf)] - **crypto**: 使用 SSL\_get\_servername.（Adam Langley） [#9347](https://github.com/nodejs/node/pull/9347)
* \[[`724910a991`](https://github.com/nodejs/node/commit/724910a991)] - **debugger**: 重构 \_debugger.js（Rich Trott） [#9860](https://github.com/nodejs/node/pull/9860)
* \[[`52f14931a2`](https://github.com/nodejs/node/commit/52f14931a2)] - **deps**: 回移植 GYP 修复以修复 AIX 共享后缀（Stewart Addison） [#9675](https://github.com/nodejs/node/pull/9675)
* \[[`c77ba8ce14`](https://github.com/nodejs/node/commit/c77ba8ce14)] - **doc**: 统一 'Returns:' 格式（Roman Reiss） [#9554](https://github.com/nodejs/node/pull/9554)
* \[[`aecb2cac37`](https://github.com/nodejs/node/commit/aecb2cac37)] - **doc**: 在 README 中补充缺失的 -（Italo A. Casas） [#10170](https://github.com/nodejs/node/pull/10170)
* \[[`52c022992e`](https://github.com/nodejs/node/commit/52c022992e)] - **doc**: 删除 README 中多余的空格（Italo A. Casas） [#10168](https://github.com/nodejs/node/pull/10168)
* \[[`e8c57bbe77`](https://github.com/nodejs/node/commit/e8c57bbe77)] - **doc**: 为 async\_wrap 添加人员到 cc（Anna Henningsen） [#9471](https://github.com/nodejs/node/pull/9471)
* \[[`b5eae4463c`](https://github.com/nodejs/node/commit/b5eae4463c)] - **doc**: 在 tls.md 中添加 `net.Server` 链接（Devon Rifkin） [#10109](https://github.com/nodejs/node/pull/10109)
* \[[`ad841a29d1`](https://github.com/nodejs/node/commit/ad841a29d1)] - **doc**: 澄清 fs.createReadStream 选项（Wes Tyler） [#10078](https://github.com/nodejs/node/pull/10078)
* \[[`338014ef24`](https://github.com/nodejs/node/commit/338014ef24)] - **doc**: 将 writing\_tests.md 重命名为 writing-tests.md（Safia Abdalla） [#9867](https://github.com/nodejs/node/pull/9867)
* \[[`b06b2343bc`](https://github.com/nodejs/node/commit/b06b2343bc)] - **doc**: 将 api/child\_process.md 中的 it’s 改为 its（Devon Rifkin） [#10090](https://github.com/nodejs/node/pull/10090)
* \[[`4885573080`](https://github.com/nodejs/node/commit/4885573080)] - **doc**: 更新 README 中的 Collaborators 列表（Rich Trott） [#9846](https://github.com/nodejs/node/pull/9846)
* \[[`3105becb2c`](https://github.com/nodejs/node/commit/3105becb2c)] - **doc**: 删除 debugger 文档中的轻微矛盾（Rich Trott） [#9832](https://github.com/nodejs/node/pull/9832)
* \[[`a858e98921`](https://github.com/nodejs/node/commit/a858e98921)] - **doc**: 澄清入门模块材料（Rich Trott） [#9816](https://github.com/nodejs/node/pull/9816)
* \[[`18c38819fe`](https://github.com/nodejs/node/commit/18c38819fe)] - **doc**: 改进模块 `exports` 的描述（Sam Roberts） [#9622](https://github.com/nodejs/node/pull/9622)
* \[[`9e68b8d329`](https://github.com/nodejs/node/commit/9e68b8d329)] - **doc**: 修复 crypto Verify 从 Sign 复制粘贴造成的问题（子丶言） [#9796](https://github.com/nodejs/node/pull/9796)
* \[[`fd1a48c9c9`](https://github.com/nodejs/node/commit/fd1a48c9c9)] - **doc**: 对 event-loop-timers-and-nexttick.md 的小修正（Dan Koster） [#9126](https://github.com/nodejs/node/pull/9126)
* \[[`107735a6e1`](https://github.com/nodejs/node/commit/107735a6e1)] - **doc**: 更改 https.request() 示例中的调用顺序。（atrioom） [#9614](https://github.com/nodejs/node/pull/9614)
* \[[`eb5972fe9b`](https://github.com/nodejs/node/commit/eb5972fe9b)] - **doc**: 修复 crypto 中的 "decipher.setAAD()" 拼写错误（子丶言） [#9782](https://github.com/nodejs/node/pull/9782)
* \[[`dc4c348ea3`](https://github.com/nodejs/node/commit/dc4c348ea3)] - **doc**: 修复 assert 代码示例中的拼写错误（Vse Mozhet Byt） [#9704](https://github.com/nodejs/node/pull/9704)
* \[[`16e97ab6c6`](https://github.com/nodejs/node/commit/16e97ab6c6)] - **doc**: 修复 BUILDING.md 中的拼写错误（monkick） [#9569](https://github.com/nodejs/node/pull/9569)
* \[[`4f2e25441e`](https://github.com/nodejs/node/commit/4f2e25441e)] - **doc**: 移除 manpage 参考中的反引号转义（Anna Henningsen） [#9632](https://github.com/nodejs/node/pull/9632)
* \[[`c0d44dfcc7`](https://github.com/nodejs/node/commit/c0d44dfcc7)] - **doc**: 移除 privateEncrypt 中无效的填充（JungMinu） [#9611](https://github.com/nodejs/node/pull/9611)
* \[[`0f523583c3`](https://github.com/nodejs/node/commit/0f523583c3)] - **doc**: 将 Sam Roberts 从发布团队中移除（Sam Roberts） [#9862](https://github.com/nodejs/node/pull/9862)
* \[[`4eeac8eb8c`](https://github.com/nodejs/node/commit/4eeac8eb8c)] - **doc**: 添加 V8 维护指南（Ali Ijaz Sheikh） [#9777](https://github.com/nodejs/node/pull/9777)
* \[[`34405ddb83`](https://github.com/nodejs/node/commit/34405ddb83)] - **doc**: 将 TSC 和 CTC 会议纪要移出 core 仓库（James M Snell） [#9503](https://github.com/nodejs/node/pull/9503)
* \[[`198463a0ff`](https://github.com/nodejs/node/commit/198463a0ff)] - **doc**: 修复 assert.md 中的一个拼写错误（Vse Mozhet Byt） [#9598](https://github.com/nodejs/node/pull/9598)
* \[[`aca0ede0d3`](https://github.com/nodejs/node/commit/aca0ede0d3)] - **doc**: 修复拼写错误 e.g., => e.g.（Daijiro Yamada） [#9563](https://github.com/nodejs/node/pull/9563)
* \[[`c7997939f2`](https://github.com/nodejs/node/commit/c7997939f2)] - **doc**: 修复 cluster 文档中的拼写问题，（eg. -> e.g.）（YutamaKotaro） [#9568](https://github.com/nodejs/node/pull/9568)
* \[[`229fa6921f`](https://github.com/nodejs/node/commit/229fa6921f)] - **doc**: 将 doc/http.md 中的 e.g., 改为 e.g.（ikasumi\_wt） [#9564](https://github.com/nodejs/node/pull/9564)
* \[[`3ad7430f12`](https://github.com/nodejs/node/commit/3ad7430f12)] - **doc**: 修复模块伪代码中的索引顺序（kohta ito） [#9562](https://github.com/nodejs/node/pull/9562)
* \[[`06732babd3`](https://github.com/nodejs/node/commit/06732babd3)] - **doc**: 移除 Roadmap 工作组（William Kapke） [#9545](https://github.com/nodejs/node/pull/9545)
* \[[`6775163a94`](https://github.com/nodejs/node/commit/6775163a94)] - **doc**: 修复代码示例中的轻微样式问题（Daniel Bevenius） [#9482](https://github.com/nodejs/node/pull/9482)
* \[[`aa25c74fe6`](https://github.com/nodejs/node/commit/aa25c74fe6)] - **doc**: 对 wg 文档进行语法和结构修订（Ryan Lewis） [#9495](https://github.com/nodejs/node/pull/9495)
* \[[`1e06ed7e9d`](https://github.com/nodejs/node/commit/1e06ed7e9d)] - **doc**: 澄清 writing\_tests 中的退出码部分（Jeremiah Senkpiel） [#9502](https://github.com/nodejs/node/pull/9502)
* \[[`3f39a39657`](https://github.com/nodejs/node/commit/3f39a39657)] - **doc**: 修正 https.request 文档中的不准确之处（Andreas Lind） [#9453](https://github.com/nodejs/node/pull/9453)
* \[[`8380154e22`](https://github.com/nodejs/node/commit/8380154e22)] - **doc**: 在 README 中添加 npm 链接（Oscar Morrison） [#7894](https://github.com/nodejs/node/pull/7894)
* \[[`65e134ff12`](https://github.com/nodejs/node/commit/65e134ff12)] - **meta**: 在 .gitignore 中白名单化 dotfiles（Claudio Rodriguez） [#8016](https://github.com/nodejs/node/pull/8016)
* \[[`698bf2e829`](https://github.com/nodejs/node/commit/698bf2e829)] - **repl**: 不要覆盖所有内部 repl 默认值（cjihrig） [#7826](https://github.com/nodejs/node/pull/7826)
* \[[`3d45b35f73`](https://github.com/nodejs/node/commit/3d45b35f73)] - **repl**: 重构 lib/repl.js（Rich Trott） [#9374](https://github.com/nodejs/node/pull/9374)
* \[[`f5b952b221`](https://github.com/nodejs/node/commit/f5b952b221)] - **test**: 重构并修复 test-dns（Michaël Zasso） [#9811](https://github.com/nodejs/node/pull/9811)
* \[[`8b733dca05`](https://github.com/nodejs/node/commit/8b733dca05)] - **test**: 重构 test-crypto-binary-default（Michaël Zasso） [#9810](https://github.com/nodejs/node/pull/9810)
* \[[`45af7857d7`](https://github.com/nodejs/node/commit/45af7857d7)] - **test**: 重构并修复 test-crypto（Michaël Zasso） [#9807](https://github.com/nodejs/node/pull/9807)
* \[[`e0c8aafad8`](https://github.com/nodejs/node/commit/e0c8aafad8)] - **test**: 修复 test-buffer-slow（Michaël Zasso） [#9809](https://github.com/nodejs/node/pull/9809)
* \[[`e72dfce2c8`](https://github.com/nodejs/node/commit/e72dfce2c8)] - **test**: 为测试添加验证正则表达式参数（Avery, Frank） [#9918](https://github.com/nodejs/node/pull/9918)
* \[[`a779e7ffec`](https://github.com/nodejs/node/commit/a779e7ffec)] - **test**: 清理 repl-reset-event 文件（Kailean Courtney） [#9931](https://github.com/nodejs/node/pull/9931)
* \[[`4022579b6e`](https://github.com/nodejs/node/commit/4022579b6e)] - **test**: 改进 domain-top-level-error-handler-throw（CodeVana） [#9950](https://github.com/nodejs/node/pull/9950)
* \[[`d3edaa3dc3`](https://github.com/nodejs/node/commit/d3edaa3dc3)] - **test**: 在 test-require-dot 中用 const 替换 var（Amar Zavery） [#9916](https://github.com/nodejs/node/pull/9916)
* \[[`8694811ef0`](https://github.com/nodejs/node/commit/8694811ef0)] - **test**: 重构 test-net-pingpong（Michaël Zasso） [#9812](https://github.com/nodejs/node/pull/9812)
* \[[`e849dd0ff3`](https://github.com/nodejs/node/commit/e849dd0ff3)] - **test**: 在 test-tls-writewrap-leak 中使用 strictEqual（Aaron Petcoff） [#9666](https://github.com/nodejs/node/pull/9666)
* \[[`0662429268`](https://github.com/nodejs/node/commit/0662429268)] - **test**: 修复 test-tls-connect-address-family（mkamakura） [#9573](https://github.com/nodejs/node/pull/9573)
* \[[`420e7f17d9`](https://github.com/nodejs/node/commit/420e7f17d9)] - **test**: 修复 test-http-status-reason-invalid-chars（Yosuke Saito） [#9572](https://github.com/nodejs/node/pull/9572)
* \[[`13cace140f`](https://github.com/nodejs/node/commit/13cace140f)] - **test**: 修复 helper-debugger-repl.js（Rich Trott） [#9486](https://github.com/nodejs/node/pull/9486)
* \[[`aebbc965f9`](https://github.com/nodejs/node/commit/aebbc965f9)] - **test**: 重构大型事件发射器测试（cjihrig） [#6446](https://github.com/nodejs/node/pull/6446)
* \[[`b5012f3de2`](https://github.com/nodejs/node/commit/b5012f3de2)] - **test**: 在 common 中添加 expectWarning（Michaël Zasso） [#8662](https://github.com/nodejs/node/pull/8662)
* \[[`b98813d97c`](https://github.com/nodejs/node/commit/b98813d97c)] - **test**: 重构 test-fs-non-number-arguments-throw（Michaël Zasso） [#9844](https://github.com/nodejs/node/pull/9844)
* \[[`80a752708a`](https://github.com/nodejs/node/commit/80a752708a)] - **test**: 重构 test-dgram-exclusive-implicit-bind（Cesar Hernandez） [#10066](https://github.com/nodejs/node/pull/10066)
* \[[`9b974b4d54`](https://github.com/nodejs/node/commit/9b974b4d54)] - **test**: 使用 `assert.strictEqual`（anoff） [#9975](https://github.com/nodejs/node/pull/9975)
* \[[`bc125bd729`](https://github.com/nodejs/node/commit/bc125bd729)] - **test**: 将 assert.equal 改为 assert.strictEqual（Aileen） [#9946](https://github.com/nodejs/node/pull/9946)
* \[[`5049a10278`](https://github.com/nodejs/node/commit/5049a10278)] - **test**: 将 assert.equal 改为 assert.strictEqual（vazina robertson） [#10015](https://github.com/nodejs/node/pull/10015)
* \[[`b5c60edeed`](https://github.com/nodejs/node/commit/b5c60edeed)] - **test**: 将 assert.Equal 重命名为 assert.strictEqual（Jared Young）
* \[[`f44e828a36`](https://github.com/nodejs/node/commit/f44e828a36)] - **test**: 改进 test-tls-client-verify（Paul Graham） [#10051](https://github.com/nodejs/node/pull/10051)
* \[[`a1e3967f69`](https://github.com/nodejs/node/commit/a1e3967f69)] - **test**: 重构 test-https-agent-session-reuse（Diego Paez） [#10105](https://github.com/nodejs/node/pull/10105)
* \[[`9e46af6412`](https://github.com/nodejs/node/commit/9e46af6412)] - **test**: 重构 test-beforeexit-event（Rob Adelmann） [#10121](https://github.com/nodejs/node/pull/10121)
* \[[`adcd6ea66f`](https://github.com/nodejs/node/commit/adcd6ea66f)] - **test**: 重构 test-domain-from-timer（Daniel Sims） [#9889](https://github.com/nodejs/node/pull/9889)
* \[[`1377ea87eb`](https://github.com/nodejs/node/commit/1377ea87eb)] - **test**: 重构 test-domain-exit-dispose-again（Ethan Arrowood） [#10003](https://github.com/nodejs/node/pull/10003)
* \[[`8a9af6843d`](https://github.com/nodejs/node/commit/8a9af6843d)] - **test**: 在 test-os-homedir-no-envvar 中使用 const 和 strictEqual（CodeVana） [#9899](https://github.com/nodejs/node/pull/9899)
* \[[`ee038c0e71`](https://github.com/nodejs/node/commit/ee038c0e71)] - **test**: 重构 test-dgram-bind-default-address（Michael-Bryant Choa） [#9947](https://github.com/nodejs/node/pull/9947)
* \[[`a090899e93`](https://github.com/nodejs/node/commit/a090899e93)] - **test**: assert.throws() 应包含一个 RegExp（Chris Bystrek） [#9976](https://github.com/nodejs/node/pull/9976)
* \[[`542b40f410`](https://github.com/nodejs/node/commit/542b40f410)] - **test**: 重构 test-event-emitter-method-names（Rodrigo Palma） [#10027](https://github.com/nodejs/node/pull/10027)
* \[[`a2023a9d97`](https://github.com/nodejs/node/commit/a2023a9d97)] - **test**: 重构 tls-ticket-cluster（Yojan Shrestha） [#10023](https://github.com/nodejs/node/pull/10023)
* \[[`a64f40680f`](https://github.com/nodejs/node/commit/a64f40680f)] - **test**: 重构 test-domain-exit-dispose（Chris Henney） [#9938](https://github.com/nodejs/node/pull/9938)
* \[[`a896d4ed36`](https://github.com/nodejs/node/commit/a896d4ed36)] - **test**: 重构 test-stdin-from-file.js（amrios） [#10012](https://github.com/nodejs/node/pull/10012)
* \[[`ce14c1e51f`](https://github.com/nodejs/node/commit/ce14c1e51f)] - **test**: 重构 test-require-extensions-main（Daryl Thayil） [#9912](https://github.com/nodejs/node/pull/9912)
* \[[`b9c45026f7`](https://github.com/nodejs/node/commit/b9c45026f7)] - **test**: 清理 tls junk 测试（Danny Guo） [#9940](https://github.com/nodejs/node/pull/9940)
* \[[`e3712334a3`](https://github.com/nodejs/node/commit/e3712334a3)] - **test**: 更新 test-stdout-to-file（scalkpdev） [#9939](https://github.com/nodejs/node/pull/9939)
* \[[`63f571e69c`](https://github.com/nodejs/node/commit/63f571e69c)] - **test**: 将 assert.Equal 改为 asset.strictEqual（Paul Chin） [#9973](https://github.com/nodejs/node/pull/9973)
* \[[`c3a3480606`](https://github.com/nodejs/node/commit/c3a3480606)] - **test**: 重构 test-domain-multi（Wes Tyler） [#9963](https://github.com/nodejs/node/pull/9963)
* \[[`ad27555ff8`](https://github.com/nodejs/node/commit/ad27555ff8)] - **test**: 在 test-cli-eval 中使用 assert.strictEqual（Nigel Kibodeaux） [#9919](https://github.com/nodejs/node/pull/9919)
* \[[`cffd51e815`](https://github.com/nodejs/node/commit/cffd51e815)] - **test**: 重构 test-tls-connect-simple（Russell Sherman） [#9934](https://github.com/nodejs/node/pull/9934)
* \[[`1424c25f3e`](https://github.com/nodejs/node/commit/1424c25f3e)] - **test**: 重构 test-signal-unregister（mark hughes） [#9920](https://github.com/nodejs/node/pull/9920)
* \[[`920737180f`](https://github.com/nodejs/node/commit/920737180f)] - **test**: 重构 test-require-resolve（blugavere） [#10120](https://github.com/nodejs/node/pull/10120)
* \[[`71ab88cc80`](https://github.com/nodejs/node/commit/71ab88cc80)] - **test**: 重构 test-fs-read-stream-resume（Matt Webb） [#9927](https://github.com/nodejs/node/pull/9927)
* \[[`6a485da87c`](https://github.com/nodejs/node/commit/6a485da87c)] - **test**: 用 strictEqual 替换 equal（Tracy Hinds） [#10011](https://github.com/nodejs/node/pull/10011)
* \[[`b5d87569e1`](https://github.com/nodejs/node/commit/b5d87569e1)] - **test**: 使用 strictEqual 代替 equal（Uttam Pawar） [#9921](https://github.com/nodejs/node/pull/9921)
* \[[`c94c2fde8a`](https://github.com/nodejs/node/commit/c94c2fde8a)] - **test**: 使用 const 和 strictEqual（Fabrice Tatieze） [#9926](https://github.com/nodejs/node/pull/9926)
* \[[`16164b5b44`](https://github.com/nodejs/node/commit/16164b5b44)] - **test**: test-file-write-stream3.js 重构（Richard Karmazin） [#10035](https://github.com/nodejs/node/pull/10035)
* \[[`7391983729`](https://github.com/nodejs/node/commit/7391983729)] - **test**: 实现 ES6 约定（Erez Weiss） [#9669](https://github.com/nodejs/node/pull/9669)
* \[[`50ce3f91d7`](https://github.com/nodejs/node/commit/50ce3f91d7)] - **test**: 将 assert.equal() 更新为 assert.strictEqual()（Peter Diaz） [#10024](https://github.com/nodejs/node/pull/10024)
* \[[`3f9d75c481`](https://github.com/nodejs/node/commit/3f9d75c481)] - **test**: 使用 const 或 let 以及 assert.strictEqual（Christopher Rokita） [#10001](https://github.com/nodejs/node/pull/10001)
* \[[`98afba5676`](https://github.com/nodejs/node/commit/98afba5676)] - **test**: 在 domain-http 中使用 strictEqual()（cdnadmin） [#9996](https://github.com/nodejs/node/pull/9996)
* \[[`07680b65fe`](https://github.com/nodejs/node/commit/07680b65fe)] - **test**: 重构 test-cluster-worker-events（fmizzell） [#9994](https://github.com/nodejs/node/pull/9994)
* \[[`a3db54416f`](https://github.com/nodejs/node/commit/a3db54416f)] - **test**: 更新 repl 测试（makenova） [#9991](https://github.com/nodejs/node/pull/9991)
* \[[`db3cdd2449`](https://github.com/nodejs/node/commit/db3cdd2449)] - **test**: 为 test-buffer-indexof.js 添加 strictEqual（Eric Gonzalez） [#9955](https://github.com/nodejs/node/pull/9955)
* \[[`f670b05603`](https://github.com/nodejs/node/commit/f670b05603)] - **test**: test-beforeexit-event.js 中使用 strictEqual（CodeTheInternet） [#10004](https://github.com/nodejs/node/pull/10004)
* \[[`70b4d7d3a2`](https://github.com/nodejs/node/commit/70b4d7d3a2)] - **test**: 重构 test-child-process-double-pipe（Dan Villa） [#9930](https://github.com/nodejs/node/pull/9930)
* \[[`1e53cf4764`](https://github.com/nodejs/node/commit/1e53cf4764)] - **test**: 更新 test-stream-pipe-unpipe-stream（Raja Panidepu） [#10100](https://github.com/nodejs/node/pull/10100)
* \[[`57d48ac3f4`](https://github.com/nodejs/node/commit/57d48ac3f4)] - **test**: 重构 test-crypto-ecb（michael6） [#10029](https://github.com/nodejs/node/pull/10029)
* \[[`89feb8dc4d`](https://github.com/nodejs/node/commit/89feb8dc4d)] - **test**: 重构 test-require-exceptions（Oscar Martinez） [#9882](https://github.com/nodejs/node/pull/9882)
* \[[`59f259c487`](https://github.com/nodejs/node/commit/59f259c487)] - **test**: 重构 test-crypto-certificate（Josh Mays） [#9911](https://github.com/nodejs/node/pull/9911)
* \[[`815715d850`](https://github.com/nodejs/node/commit/815715d850)] - **test**: 重构 test-domain（Johnny Reading） [#9890](https://github.com/nodejs/node/pull/9890)
* \[[`08cc269338`](https://github.com/nodejs/node/commit/08cc269338)] - **test**: 重构 test-cli-syntax（Exlipse7） [#10057](https://github.com/nodejs/node/pull/10057)
* \[[`91d27ce4db`](https://github.com/nodejs/node/commit/91d27ce4db)] - **test**: 重构 test-child-process-constructor（k3kathy） [#10060](https://github.com/nodejs/node/pull/10060)
* \[[`ae9e2a21c1`](https://github.com/nodejs/node/commit/ae9e2a21c1)] - **test**: 将 net 中的 var 改为 const，并将 assert.equal 改为 assert.strictEqual（Sean Villars） [#9907](https://github.com/nodejs/node/pull/9907)
* \[[`30c9474286`](https://github.com/nodejs/node/commit/30c9474286)] - **test**: 将 test-net-better-error-messages-listen-path.js 中的 vars 改为 const（anoff） [#9905](https://github.com/nodejs/node/pull/9905)
* \[[`bcbf50d9ba`](https://github.com/nodejs/node/commit/bcbf50d9ba)] - **test**: 重构 test-http-dns-error（Outsider） [#10062](https://github.com/nodejs/node/pull/10062)
* \[[`00f08640ce`](https://github.com/nodejs/node/commit/00f08640ce)] - **test**: assert.equal -> assert.strictEqual（davidmarkclements） [#10065](https://github.com/nodejs/node/pull/10065)
* \[[`d9cca393e9`](https://github.com/nodejs/node/commit/d9cca393e9)] - **test**: assert.equal -> assert.strictEqual（davidmarkclements） [#10067](https://github.com/nodejs/node/pull/10067)
* \[[`6c64f6c445`](https://github.com/nodejs/node/commit/6c64f6c445)] - **test**: 改进 crypto padding 测试（Julian Duque） [#9906](https://github.com/nodejs/node/pull/9906)
* \[[`37d734ae36`](https://github.com/nodejs/node/commit/37d734ae36)] - **test**: 美化 test-net-better-error-messages-listen（Hitesh Kanwathirtha） [#10087](https://github.com/nodejs/node/pull/10087)
* \[[`f126b44a3a`](https://github.com/nodejs/node/commit/f126b44a3a)] - **test**: 在 test-tls-key-mismatch.js 中将 var 改为 const（bjdelro） [#9897](https://github.com/nodejs/node/pull/9897)
* \[[`7538dd5c93`](https://github.com/nodejs/node/commit/7538dd5c93)] - **test**: 在 cwd-enoent 中使用 strictEqual（JDHarmon） [#10077](https://github.com/nodejs/node/pull/10077)
* \[[`39816a43af`](https://github.com/nodejs/node/commit/39816a43af)] - **test**: 重构 test-fs-read-stream-inherit.js（Jonathan Darling） [#9894](https://github.com/nodejs/node/pull/9894)
* \[[`7615a0f2cd`](https://github.com/nodejs/node/commit/7615a0f2cd)] - **test**: 重构 test-child-process-stdio-inherit（Wes Tyler） [#9893](https://github.com/nodejs/node/pull/9893)
* \[[`2a9ab8ea2a`](https://github.com/nodejs/node/commit/2a9ab8ea2a)] - **test**: 为 require 和严格相等检查将 var 改为 const（Harish Tejwani） [#9892](https://github.com/nodejs/node/pull/9892)
* \[[`5cd7e7aaf1`](https://github.com/nodejs/node/commit/5cd7e7aaf1)] - **test**: 更新为 const 并在断言中使用正则（Daniel Flores） [#9891](https://github.com/nodejs/node/pull/9891)
* \[[`1a73cc5357`](https://github.com/nodejs/node/commit/1a73cc5357)] - **test**: 交换 var->const/let 和 equal->strictEqual（Peter Masucci） [#9888](https://github.com/nodejs/node/pull/9888)
* \[[`552169e950`](https://github.com/nodejs/node/commit/552169e950)] - **test**: 在 crypto 中用 strictEqual 替换 equal（Julian Duque） [#9886](https://github.com/nodejs/node/pull/9886)
* \[[`49900e78b0`](https://github.com/nodejs/node/commit/49900e78b0)] - **test**: 用 strictEqual 替换 equal（Julian Duque） [#9879](https://github.com/nodejs/node/pull/9879)
* \[[`998db3a003`](https://github.com/nodejs/node/commit/998db3a003)] - **test**: 重构 test-tls-timeout-server-2（Devon Rifkin） [#9876](https://github.com/nodejs/node/pull/9876)
* \[[`aaab51047f`](https://github.com/nodejs/node/commit/aaab51047f)] - **test**: 将 assert.equal 改为 assert.strictEqual（Daniel Pittman） [#9902](https://github.com/nodejs/node/pull/9902)
* \[[`a4488c3cbd`](https://github.com/nodejs/node/commit/a4488c3cbd)] - **test**: 重构 test-vm-syntax-error-stderr.js（Jay Brownlee） [#9900](https://github.com/nodejs/node/pull/9900)
* \[[`cff80a5c0e`](https://github.com/nodejs/node/commit/cff80a5c0e)] - **test**: 重构 test-tls-destroy-whilst-write（Chris Bystrek） [#10064](https://github.com/nodejs/node/pull/10064)
* \[[`8257671bdc`](https://github.com/nodejs/node/commit/8257671bdc)] - **test**: 重构 test-https-truncate（davidmarkclements） [#10074](https://github.com/nodejs/node/pull/10074)
* \[[`457af874b5`](https://github.com/nodejs/node/commit/457af874b5)] - **test**: 在 test-cli-eval-event.js 中使用 strictEqual（Richard Karmazin） [#9964](https://github.com/nodejs/node/pull/9964)
* \[[`2890f0d904`](https://github.com/nodejs/node/commit/2890f0d904)] - **test**: 重构 test-tls-friendly-error-message.js（Adrian Estrada） [#9967](https://github.com/nodejs/node/pull/9967)
* \[[`c37ae4a1b6`](https://github.com/nodejs/node/commit/c37ae4a1b6)] - **test**: 重构 test-vm-static-this.js（David Bradford） [#9887](https://github.com/nodejs/node/pull/9887)
* \[[`9473fc6c2f`](https://github.com/nodejs/node/commit/9473fc6c2f)] - **test**: 重构 test-crypto-cipheriv-decipheriv（Aileen） [#10018](https://github.com/nodejs/node/pull/10018)
* \[[`6ecc4ffb1c`](https://github.com/nodejs/node/commit/6ecc4ffb1c)] - **test**: 重构 crypto cipher/decipher iv 测试（Julian Duque） [#9943](https://github.com/nodejs/node/pull/9943)
* \[[`a486f6bad4`](https://github.com/nodejs/node/commit/a486f6bad4)] - **test**: 重构 test-cluster-setup-master-argv（Oscar Martinez） [#9960](https://github.com/nodejs/node/pull/9960)
* \[[`384c954698`](https://github.com/nodejs/node/commit/384c954698)] - **test**: 重构 test-cluster-setup-master-argv（Christine Hong） [#9993](https://github.com/nodejs/node/pull/9993)
* \[[`76645e8781`](https://github.com/nodejs/node/commit/76645e8781)] - **test**: 在 test-crypto-ecb 中使用 assert.strictEqual（Daniel Pittman） [#9980](https://github.com/nodejs/node/pull/9980)
* \[[`9103c3d3fe`](https://github.com/nodejs/node/commit/9103c3d3fe)] - **test**: 在 cluster 测试中更新为 const iin（Greg Valdez） [#10007](https://github.com/nodejs/node/pull/10007)
* \[[`27c9171586`](https://github.com/nodejs/node/commit/27c9171586)] - **test**: cluster 测试使用 assert.strictEqual()（Bidur Adhikari） [#10042](https://github.com/nodejs/node/pull/10042)
* \[[`2453d64aa7`](https://github.com/nodejs/node/commit/2453d64aa7)] - **test**: var -> let/const，.equal -> .strictEqual（shiya） [#9913](https://github.com/nodejs/node/pull/9913)
* \[[`1467c964a4`](https://github.com/nodejs/node/commit/1467c964a4)] - **test**: 提高 timers 的覆盖率（lrlna） [#10068](https://github.com/nodejs/node/pull/10068)
* \[[`e47195cf78`](https://github.com/nodejs/node/commit/e47195cf78)] - **test**: 将 equal 改为 strictEqual（Kevin Zurawel） [#9872](https://github.com/nodejs/node/pull/9872)
* \[[`33da22aba1`](https://github.com/nodejs/node/commit/33da22aba1)] - **test**: 添加 toASCII 和 toUnicode punycode 测试（Claudio Rodriguez） [#9741](https://github.com/nodejs/node/pull/9741)
* \[[`4c5d24b632`](https://github.com/nodejs/node/commit/4c5d24b632)] - **test**: 优化 test-http-status-reason-invalid-chars（Rich Trott） [#9802](https://github.com/nodejs/node/pull/9802)
* \[[`81d49aaeb2`](https://github.com/nodejs/node/commit/81d49aaeb2)] - **test**: 为 AIX 排除 no\_interleaved\_stdio 测试（Michael Dawson） [#9772](https://github.com/nodejs/node/pull/9772)
* \[[`b59cf582e4`](https://github.com/nodejs/node/commit/b59cf582e4)] - **test**: 重构 test-async-wrap-\*（Rich Trott） [#9663](https://github.com/nodejs/node/pull/9663)
* \[[`57cc5cb277`](https://github.com/nodejs/node/commit/57cc5cb277)] - **test**: 在 stream2 测试中使用 setImmediate()（masashi.g） [#9583](https://github.com/nodejs/node/pull/9583)
* \[[`8345ffb0a0`](https://github.com/nodejs/node/commit/8345ffb0a0)] - **test**: 添加 PassThrough 的测试用例（Yoshiya Hinosawa） [#9581](https://github.com/nodejs/node/pull/9581)
* \[[`beb147a08b`](https://github.com/nodejs/node/commit/beb147a08b)] - **test**: 检查 `process.execPath` 是否为 realpath（Anna Henningsen） [#9229](https://github.com/nodejs/node/pull/9229)
* \[[`cef5b1fa14`](https://github.com/nodejs/node/commit/cef5b1fa14)] - **test**: 为损坏的子进程 stdio 添加测试（cjihrig） [#9528](https://github.com/nodejs/node/pull/9528)
* \[[`29ab76b791`](https://github.com/nodejs/node/commit/29ab76b791)] - **test**: 确保在 exit 时不调度 nextTick（Jeremiah Senkpiel） [#9555](https://github.com/nodejs/node/pull/9555)
* \[[`b87fe250d2`](https://github.com/nodejs/node/commit/b87fe250d2)] - **test**: 从 setTimeout 改为 setImmediate（MURAKAMI Masahiko） [#9578](https://github.com/nodejs/node/pull/9578)
* \[[`eca12d4316`](https://github.com/nodejs/node/commit/eca12d4316)] - **test**: 改进 test-stream2-objects.js（Yoshiya Hinosawa） [#9565](https://github.com/nodejs/node/pull/9565)
* \[[`4e36a14c15`](https://github.com/nodejs/node/commit/4e36a14c15)] - **test**: 重构 test-next-tick-error-spin（Rich Trott） [#9537](https://github.com/nodejs/node/pull/9537)
* \[[`b2b2bc2293`](https://github.com/nodejs/node/commit/b2b2bc2293)] - **test**: 将依赖定时器的测试移至顺序执行（Rich Trott） [#9487](https://github.com/nodejs/node/pull/9487)
* \[[`1436fd70f5`](https://github.com/nodejs/node/commit/1436fd70f5)] - **test**: 将 assert.equal 转换为 assert.strictEqual（Jonathan Darling） [#9925](https://github.com/nodejs/node/pull/9925)
* \[[`c9ed49da6e`](https://github.com/nodejs/node/commit/c9ed49da6e)] - **test**: 对 test/cctest 中的文件运行 cpplint（Ben Noordhuis） [#9787](https://github.com/nodejs/node/pull/9787)
* \[[`10d4f470f8`](https://github.com/nodejs/node/commit/10d4f470f8)] - **test**: 使 addons 测试可在 debug 构建下通过（Daniel Bevenius） [#8836](https://github.com/nodejs/node/pull/8836)
* \[[`550393dc78`](https://github.com/nodejs/node/commit/550393dc78)] - **test**: 添加 new\.target 插件回归测试（Ben Noordhuis） [#9689](https://github.com/nodejs/node/pull/9689)
* \[[`76245b2156`](https://github.com/nodejs/node/commit/76245b2156)] - **test**: 重构大型事件发射器测试（cjihrig） [#6446](https://github.com/nodejs/node/pull/6446)
* \[[`02e8187751`](https://github.com/nodejs/node/commit/02e8187751)] - **test**: 允许 globals 被列入白名单（cjihrig） [#7826](https://github.com/nodejs/node/pull/7826)
* \[[`c0c5608bfc`](https://github.com/nodejs/node/commit/c0c5608bfc)] - **test,assert**: 为 typed arrays 添加 deepEqual/deepStrictEqual 测试（Feross Aboukhadijeh） [#8002](https://github.com/nodejs/node/pull/8002)
* \[[`759e8fdd18`](https://github.com/nodejs/node/commit/759e8fdd18)] - **timers**: 如果 _repeat 有问题则从 intervals 中退出（Jeremiah Senkpiel） [#10365](https://github.com/nodejs/node/pull/10365)
* \[[`553d95da15`](https://github.com/nodejs/node/commit/553d95da15)] - **timers**: 为已取消定时器使用一致的检查（Jeremiah Senkpiel） [#9685](https://github.com/nodejs/node/pull/9685)
* \[[`5c6d908dd7`](https://github.com/nodejs/node/commit/5c6d908dd7)] - **tools**: 在 .editorconfig 中启用末尾换行（Roman Reiss） [#9410](https://github.com/nodejs/node/pull/9410)
* \[[`06e8120928`](https://github.com/nodejs/node/commit/06e8120928)] - **tools**: 移除 generate.js 中不需要的转义（Rich Trott） [#9781](https://github.com/nodejs/node/pull/9781)
* \[[`fd6b305421`](https://github.com/nodejs/node/commit/fd6b305421)] - **tools**: 为 manpage 引用使用更好的正则表达式（Anna Henningsen） [#9632](https://github.com/nodejs/node/pull/9632)
* \[[`9b36469a3c`](https://github.com/nodejs/node/commit/9b36469a3c)] - **tools**: 改进 Makefile 中的 docopen 目标（Sakthipriyan Vairamani (thefourtheye)) [#9436](https://github.com/nodejs/node/pull/9436)
* \[[`e3dc05d01b`](https://github.com/nodejs/node/commit/e3dc05d01b)] - **tools**: 让 run-valgrind.py 更有用（Ben Noordhuis） [#9520](https://github.com/nodejs/node/pull/9520)
* \[[`7b1b11a11c`](https://github.com/nodejs/node/commit/7b1b11a11c)] - **tools**: 修复 run-valgrind.py 脚本（Ben Noordhuis） [#9520](https://github.com/nodejs/node/pull/9520)
* \[[`011ee0ba8b`](https://github.com/nodejs/node/commit/011ee0ba8b)] - **tools**: 将 run-valgrind.py 复制到 tools/（Ben Noordhuis） [#9520](https://github.com/nodejs/node/pull/9520)

<a id="4.7.0"></a>

## 2016-12-06，版本 4.7.0 'Argon'（LTS），@thealphanerd

此 LTS 版本包含 108 个提交。其中包括 30 个与文档相关、28 个与测试相关、16 个与构建 / 工具相关，以及 4 个对依赖项的更新提交。

### 显著变更

SEMVER-MINOR 变更包括：

* **build**：在 Windows 上导出 openssl 符号，使得可以构建链接到内置 openssl 版本的 addons（Alex Hultman）[#7576](https://github.com/nodejs/node/pull/7576)
* **debugger**：使 debugger server 中的监听地址可配置（Ben Noordhuis）[#3316](https://github.com/nodejs/node/pull/3316)
* **dgram**：将发送队列泛化以处理 close，从而修复在 listening 事件处理器中关闭 dgram socket 时可能抛出的异常。（Matteo Collina）[#7066](https://github.com/nodejs/node/pull/7066)
* **http**：引入 451 状态码 “Unavailable For Legal Reasons”（因法律原因不可用）（Max Barinov）[#4377](https://github.com/nodejs/node/pull/4377)
* **tls**：为 `tls.connect` 引入 `secureContext`，这对缓存客户端证书、密钥和 CA 证书很有用。（Fedor Indutny）[#4246](https://github.com/nodejs/node/pull/4246)

显著的 SEMVER-PATCH 变更包括：

* **build**：
  * 为嵌入者引入 configure --shared 选项（sxa555）[#6994](https://github.com/nodejs/node/pull/6994)
* **gtest**：测试报告器现在将 tap 注释输出为 yamlish（Johan Bergström）[#9262](https://github.com/nodejs/node/pull/9262)
* **src**：当 c-ares 初始化失败时，node 不再中止（Ben Noordhuis）[#8710](https://github.com/nodejs/node/pull/8710)
* **tls**：修复在握手期间向 TLSWrap 实例写入数据时的内存泄漏（Fedor Indutny）[#9586](https://github.com/nodejs/node/pull/9586)

### 提交

* \[[`ed31f9cc30`](https://github.com/nodejs/node/commit/ed31f9cc30)] - **benchmark**：为 ES Map 添加微基准测试（Rod Vagg）[#7581](https://github.com/nodejs/node/pull/7581)
* \[[`c5181eda4b`](https://github.com/nodejs/node/commit/c5181eda4b)] - **build**：减少 doc target 带来的噪音（Daniel Bevenius）[#9457](https://github.com/nodejs/node/pull/9457)
* \[[`59d821debe`](https://github.com/nodejs/node/commit/59d821debe)] - **build**：在 openbsd 上使用 wxneeded（Aaron Bieber）[#9232](https://github.com/nodejs/node/pull/9232)
* \[[`7c73105606`](https://github.com/nodejs/node/commit/7c73105606)] - **build**：将 cctests 作为 test-ci target 的一部分运行（Ben Noordhuis）[#8034](https://github.com/nodejs/node/pull/8034)
* \[[`3919edb47e`](https://github.com/nodejs/node/commit/3919edb47e)] - **build**：不要用 -fno-rtti 构建 icu（Ben Noordhuis）[#8886](https://github.com/nodejs/node/pull/8886)
* \[[`e97723b18c`](https://github.com/nodejs/node/commit/e97723b18c)] - **build**：抽象出共享库后缀（Stewart Addison）[#9385](https://github.com/nodejs/node/pull/9385)
* \[[`0138b4db7c`](https://github.com/nodejs/node/commit/0138b4db7c)] - **build**：支持 windows sharedlib（Stewart Addison）[#9385](https://github.com/nodejs/node/pull/9385)
* \[[`f21c2b9d3b`](https://github.com/nodejs/node/commit/f21c2b9d3b)] - **build**：configure --shared（sxa555）[#6994](https://github.com/nodejs/node/pull/6994)
* \[[`bb2fdf58f7`](https://github.com/nodejs/node/commit/bb2fdf58f7)] - **build**：挑选 V8 变更以支持 windows DLL（Stefan Budeanu）[#8084](https://github.com/nodejs/node/pull/8084)
* \[[`84849f186f`](https://github.com/nodejs/node/commit/84849f186f)] - **(SEMVER-MINOR)** **build**：在 Windows 上导出更多 openssl 符号（Alex Hultman）[#7576](https://github.com/nodejs/node/pull/7576)
* \[[`3cefd65e90`](https://github.com/nodejs/node/commit/3cefd65e90)] - **build**：在 windows 上导出 openssl 符号（Ben Noordhuis）[#6274](https://github.com/nodejs/node/pull/6274)
* \[[`4de7a6e291`](https://github.com/nodejs/node/commit/4de7a6e291)] - **build**：修复 config.gypi target（Daniel Bevenius）[#9053](https://github.com/nodejs/node/pull/9053)
* \[[`9389572cbc`](https://github.com/nodejs/node/commit/9389572cbc)] - **crypto**：修复 iv 大小检查中的错误逻辑（Ben Noordhuis）[#9032](https://github.com/nodejs/node/pull/9032)
* \[[`748e424163`](https://github.com/nodejs/node/commit/748e424163)] - **(SEMVER-MINOR)** **debugger**：使监听地址可配置（Ben Noordhuis）[#3316](https://github.com/nodejs/node/pull/3316)
* \[[`c1effb1255`](https://github.com/nodejs/node/commit/c1effb1255)] - **deps**：修复使用 libc++ 3.8.0 的构建（Johan Bergström）[#9763](https://github.com/nodejs/node/pull/9763)
* \[[`eb34f687d5`](https://github.com/nodejs/node/commit/eb34f687d5)] - **deps**：回滚默认 gtest reporter 的变更（Brian White）[#8948](https://github.com/nodejs/node/pull/8948)
* \[[`4c47446133`](https://github.com/nodejs/node/commit/4c47446133)] - **deps**：使 gtest 输出 tap（Ben Noordhuis）[#8034](https://github.com/nodejs/node/pull/8034)
* \[[`91fce10aee`](https://github.com/nodejs/node/commit/91fce10aee)] - **deps**：回移植 c-ares/c-ares 中的 OpenBSD 修复（Aaron Bieber）[#9232](https://github.com/nodejs/node/pull/9232)
* \[[`4571c84c67`](https://github.com/nodejs/node/commit/4571c84c67)] - **(SEMVER-MINOR)** **dgram**：将发送队列泛化以处理 close（Matteo Collina）[#7066](https://github.com/nodejs/node/pull/7066)
* \[[`d3c25c19ef`](https://github.com/nodejs/node/commit/d3c25c19ef)] - **doc**：更新 CTC 的记录会议流程（Rich Trott）[#9425](https://github.com/nodejs/node/pull/9425)
* \[[`861b689c01`](https://github.com/nodejs/node/commit/861b689c01)] - **doc**：更新 GOVERNANCE.md 以使用 “meeting chair”（Rich Trott）[#9432](https://github.com/nodejs/node/pull/9432)
* \[[`5e820ae746`](https://github.com/nodejs/node/commit/5e820ae746)] - **doc**：更新 Diagnostics WG 信息（Josh Gavant）[#9329](https://github.com/nodejs/node/pull/9329)
* \[[`e08173a2f1`](https://github.com/nodejs/node/commit/e08173a2f1)] - **doc**：修复过期的 ninja 链接（Yangyang Liu）[#9278](https://github.com/nodejs/node/pull/9278)
* \[[`462c640a51`](https://github.com/nodejs/node/commit/462c640a51)] - **doc**：修复 README 中电子邮件地址的拼写错误（Rich Trott）[#8941](https://github.com/nodejs/node/pull/8941)
* \[[`fc77cbb5b1`](https://github.com/nodejs/node/commit/fc77cbb5b1)] - **doc**：使 node(1) 更符合传统（Alex Jordan）[#8902](https://github.com/nodejs/node/pull/8902)
* \[[`66e26cd253`](https://github.com/nodejs/node/commit/66e26cd253)] - **doc**：child_process.execSync .stdio 默认值为 pipe（Kenneth Skovhus）[#9701](https://github.com/nodejs/node/pull/9701)
* \[[`524ebfb5dd`](https://github.com/nodejs/node/commit/524ebfb5dd)] - **doc**：child_process .stdio 接受 String 类型（Kenneth Skovhus）[#9701](https://github.com/nodejs/node/pull/9701)
* \[[`475fe96852`](https://github.com/nodejs/node/commit/475fe96852)] - **doc**：简化 process.memoryUsage() 示例代码（Thomas Watson Steen）[#9560](https://github.com/nodejs/node/pull/9560)
* \[[`c48c318806`](https://github.com/nodejs/node/commit/c48c318806)] - **doc**：在 debugger.md 中将 ./node 改为 node（AnnaMag）[#8943](https://github.com/nodejs/node/pull/8943)
* \[[`00a178257c`](https://github.com/nodejs/node/commit/00a178257c)] - **doc**：更新 CONTRIBUTING.md 以说明如何编辑 PR（Gibson Fahnestock）[#9259](https://github.com/nodejs/node/pull/9259)
* \[[`2b2dde855a`](https://github.com/nodejs/node/commit/2b2dde855a)] - **doc**：将 italoacasas 添加到协作者中（Italo A. Casas）[#9677](https://github.com/nodejs/node/pull/9677)
* \[[`0f41058e41`](https://github.com/nodejs/node/commit/0f41058e41)] - **doc**：澄清文件与模块之间的关系（marzelin）[#9026](https://github.com/nodejs/node/pull/9026)
* \[[`d1d207bd75`](https://github.com/nodejs/node/commit/d1d207bd75)] - **doc**：将 Sakthipriyan 加入 CTC（Rod Vagg）[#9427](https://github.com/nodejs/node/pull/9427)
* \[[`9dad98bdf1`](https://github.com/nodejs/node/commit/9dad98bdf1)] - **doc**：添加 2016-10-26 CTC 会议纪要（Rich Trott）[#9348](https://github.com/nodejs/node/pull/9348)
* \[[`824009296a`](https://github.com/nodejs/node/commit/824009296a)] - **doc**：添加 2016-10-05 CTC 会议纪要（Josh Gavant）[#9326](https://github.com/nodejs/node/pull/9326)
* \[[`1a701f1723`](https://github.com/nodejs/node/commit/1a701f1723)] - **doc**：添加 2016-09-28 CTC 会议纪要（Josh Gavant）[#9325](https://github.com/nodejs/node/pull/9325)
* \[[`e9c6aff113`](https://github.com/nodejs/node/commit/e9c6aff113)] - **doc**：添加 2016-10-19 CTC 会议纪要（Josh Gavant）[#9193](https://github.com/nodejs/node/pull/9193)
* \[[`c1e5e663a9`](https://github.com/nodejs/node/commit/c1e5e663a9)] - **doc**：改进 API 文档的标题样式（Jeremiah Senkpiel）[#8811](https://github.com/nodejs/node/pull/8811)
* \[[`279e30c3ee`](https://github.com/nodejs/node/commit/279e30c3ee)] - **doc**：添加 2016-10-12 的 CTC 会议纪要（Michael Dawson）[#9070](https://github.com/nodejs/node/pull/9070)
* \[[`3b839d1855`](https://github.com/nodejs/node/commit/3b839d1855)] - **doc**：移除治理文档中令人困惑的引用（Rich Trott）[#9073](https://github.com/nodejs/node/pull/9073)
* \[[`e564cb6af4`](https://github.com/nodejs/node/commit/e564cb6af4)] - **doc**：添加 ctc-review 标签信息（Rich Trott）[#9072](https://github.com/nodejs/node/pull/9072)
* \[[`68ccc7a512`](https://github.com/nodejs/node/commit/68ccc7a512)] - **doc**：更新 crypto.md 中关于列出哈希算法的引用（scott stern）[#9043](https://github.com/nodejs/node/pull/9043)
* \[[`132425a058`](https://github.com/nodejs/node/commit/132425a058)] - **doc**：说明 errno 是数字而不是字符串（John Vilk）[#9007](https://github.com/nodejs/node/pull/9007)
* \[[`695ee1e77b`](https://github.com/nodejs/node/commit/695ee1e77b)] - **doc**：在目录中突出显示已弃用 API（Ilya Frolov）[#7189](https://github.com/nodejs/node/pull/7189)
* \[[`4f8bf1bcf8`](https://github.com/nodejs/node/commit/4f8bf1bcf8)] - **doc**：解释为何在 PR 中添加 Reviewed-By（jessicaquynh）[#9044](https://github.com/nodejs/node/pull/9044)
* \[[`af645a0553`](https://github.com/nodejs/node/commit/af645a0553)] - **doc**：解释为何不使用 GitHub 合并按钮（jessicaquynh）[#9044](https://github.com/nodejs/node/pull/9044)
* \[[`f472c09e90`](https://github.com/nodejs/node/commit/f472c09e90)] - **doc**：参考 signal(7) 以查看信号列表（Emanuele DelBono）[#9323](https://github.com/nodejs/node/pull/9323)
* \[[`88079817c2`](https://github.com/nodejs/node/commit/88079817c2)] - **doc**：修复 http.md 中的拼写错误（anu0012）[#9144](https://github.com/nodejs/node/pull/9144)
* \[[`9f0ef5a4f2`](https://github.com/nodejs/node/commit/9f0ef5a4f2)] - **doc**：修复 v4.6.2 更新日志的标题类型（Myles Borins）[#9515](https://github.com/nodejs/node/pull/9515)
* \[[`f6f0b387ea`](https://github.com/nodejs/node/commit/f6f0b387ea)] - **events**：传递由 once 添加的原始监听器（DavidCai）[#6394](https://github.com/nodejs/node/pull/6394)
* \[[`02e6c84de2`](https://github.com/nodejs/node/commit/02e6c84de2)] - **gitignore**：忽略所有 tap 文件（Johan Bergström）[#9262](https://github.com/nodejs/node/pull/9262)
* \[[`a7ae8876f9`](https://github.com/nodejs/node/commit/a7ae8876f9)] - **governance**：扩大 CTC issue tracker 的使用范围（Rich Trott）[#8945](https://github.com/nodejs/node/pull/8945)
* \[[`36abbbe736`](https://github.com/nodejs/node/commit/36abbbe736)] - **gtest**：将 tap 注释输出为 yamlish（Johan Bergström）[#9262](https://github.com/nodejs/node/pull/9262)
* \[[`50a4471aff`](https://github.com/nodejs/node/commit/50a4471aff)] - **http**：修复连接升级检查（Brian White）[#8238](https://github.com/nodejs/node/pull/8238)
* \[[`c94482b167`](https://github.com/nodejs/node/commit/c94482b167)] - **(SEMVER-MINOR)** **http**：451 状态码 “Unavailable For Legal Reasons”（因法律原因不可用）（Max Barinov）[#4377](https://github.com/nodejs/node/pull/4377)
* \[[`12da2581a8`](https://github.com/nodejs/node/commit/12da2581a8)] - **https**：修复 https.request() 的内存泄漏（Ilkka Myller）[#8647](https://github.com/nodejs/node/pull/8647)
* \[[`3b448a7f12`](https://github.com/nodejs/node/commit/3b448a7f12)] - **lib**：在 linkedlist 中将 var 改为 const（Adri Van Houdt）[#8609](https://github.com/nodejs/node/pull/8609)
* \[[`a3a184d40a`](https://github.com/nodejs/node/commit/a3a184d40a)] - **lib**：修复 v8-polyfill 中的 TypeError（Wyatt Preul）[#8863](https://github.com/nodejs/node/pull/8863)
* \[[`423846053b`](https://github.com/nodejs/node/commit/423846053b)] - **lib**：从 for 循环中移除 let（Myles Borins）[#8873](https://github.com/nodejs/node/pull/8873)
* \[[`9a192a9683`](https://github.com/nodejs/node/commit/9a192a9683)] - **net**：修复 EOF 处理中的歧义（Fedor Indutny）[#9066](https://github.com/nodejs/node/pull/9066)
* \[[`62e83b363e`](https://github.com/nodejs/node/commit/62e83b363e)] - **src**：Malloc/Calloc 大小为 0 时返回非空指针（Rich Trott）[#8572](https://github.com/nodejs/node/pull/8572)
* \[[`51e09d00c4`](https://github.com/nodejs/node/commit/51e09d00c4)] - **src**：规范化 malloc、realloc（Michael Dawson）[#7564](https://github.com/nodejs/node/pull/7564)
* \[[`3b5cedebd1`](https://github.com/nodejs/node/commit/3b5cedebd1)] - **src**：将 ares_task 结构重命名为 node_ares_task（Daniel Bevenius）[#7345](https://github.com/nodejs/node/pull/7345)
* \[[`e5d2a95d68`](https://github.com/nodejs/node/commit/e5d2a95d68)] - **src**：移除过时的 TODO 注释（Daniel Bevenius）[#9000](https://github.com/nodejs/node/pull/9000)
* \[[`b4353e9017`](https://github.com/nodejs/node/commit/b4353e9017)] - **src**：修复 #endif 注释中的拼写错误（Juan Andres Andrango）[#8989](https://github.com/nodejs/node/pull/8989)
* \[[`f0192ec195`](https://github.com/nodejs/node/commit/f0192ec195)] - **src**：当 c-ares 初始化失败时不要中止（Ben Noordhuis）[#8710](https://github.com/nodejs/node/pull/8710)
* \[[`f669a08b76`](https://github.com/nodejs/node/commit/f669a08b76)] - **src**：修复将 rval 拼写为 value 的错误（Miguel Angel Asencio Hurtado）[#9023](https://github.com/nodejs/node/pull/9023)
* \[[`9b9762ccec`](https://github.com/nodejs/node/commit/9b9762ccec)] - **streams**：修复 `unpipe()` 中的回归问题（Anna Henningsen）[#9171](https://github.com/nodejs/node/pull/9171)
* \[[`cc36a63205`](https://github.com/nodejs/node/commit/cc36a63205)] - **test**：移除 test-debug-signal-cluster 中的 watchdog（Rich Trott）[#9476](https://github.com/nodejs/node/pull/9476)
* \[[`9144d373ba`](https://github.com/nodejs/node/commit/9144d373ba)] - **test**：清理 test-dgram-error-message-address（Michael Macherey）[#8938](https://github.com/nodejs/node/pull/8938)
* \[[`96bdfae041`](https://github.com/nodejs/node/commit/96bdfae041)] - **test**：改进 test-debugger-util-regression（Santiago Gimeno）[#9490](https://github.com/nodejs/node/pull/9490)
* \[[`2c758861c0`](https://github.com/nodejs/node/commit/2c758861c0)] - **test**：将依赖计时器的测试移至 sequential（Rich Trott）[#9431](https://github.com/nodejs/node/pull/9431)
* \[[`d9955fbb17`](https://github.com/nodejs/node/commit/d9955fbb17)] - **test**：为 HTTP 客户端的 “aborted” 事件添加测试（Kyle E. Mitchell）[#7376](https://github.com/nodejs/node/pull/7376)
* \[[`b0476c5590`](https://github.com/nodejs/node/commit/b0476c5590)] - **test**：修复 OS X 上不稳定的 test-fs-watch-recursive（Rich Trott）[#9303](https://github.com/nodejs/node/pull/9303)
* \[[`bcd156f4ab`](https://github.com/nodejs/node/commit/bcd156f4ab)] - **test**：重构 test-async-wrap-check-providers（Gerges Beshay）[#9297](https://github.com/nodejs/node/pull/9297)
* \[[`9d5e7f5c85`](https://github.com/nodejs/node/commit/9d5e7f5c85)] - **test**：在模块加载器测试中使用严格断言（Ben Noordhuis）[#9263](https://github.com/nodejs/node/pull/9263)
* \[[`6d742b3fdd`](https://github.com/nodejs/node/commit/6d742b3fdd)] - **test**：移除 test-http-set-timeout 中的 err timer（BethGriggs）[#9264](https://github.com/nodejs/node/pull/9264)
* \[[`51b251d8eb`](https://github.com/nodejs/node/commit/51b251d8eb)] - **test**：为 spawnSync() 的 killSignal 增加覆盖（cjihrig）[#8960](https://github.com/nodejs/node/pull/8960)
* \[[`fafffd4f99`](https://github.com/nodejs/node/commit/fafffd4f99)] - **test**：修复 test-child-process-fork-regr-gh-2847（Santiago Gimeno）[#8954](https://github.com/nodejs/node/pull/8954)
* \[[`a2621a25e5`](https://github.com/nodejs/node/commit/a2621a25e5)] - **test**：移除 pummel/test-tls-securepair-client 中的 FIXME（Alfred Cepeda）[#8757](https://github.com/nodejs/node/pull/8757)
* \[[`747013bc39`](https://github.com/nodejs/node/commit/747013bc39)] - **test**：输出 tap13 而不是 almost-tap（Johan Bergström）[#9262](https://github.com/nodejs/node/pull/9262)
* \[[`790406661d`](https://github.com/nodejs/node/commit/790406661d)] - **test**：重构 test-net-server-max-connections（Rich Trott）[#8931](https://github.com/nodejs/node/pull/8931)
* \[[`347547a97e`](https://github.com/nodejs/node/commit/347547a97e)] - **test**：扩展对 url.js 的测试覆盖率（Junshu Okamoto）[#8859](https://github.com/nodejs/node/pull/8859)
* \[[`cec5e36df7`](https://github.com/nodejs/node/commit/cec5e36df7)] - **test**：修复 test-cluster-worker-init.js 的不稳定性（Ilkka Myller）[#8703](https://github.com/nodejs/node/pull/8703)
* \[[`b3fccc2536`](https://github.com/nodejs/node/commit/b3fccc2536)] - **test**：启用西里尔字母 punycode 测试用例（Ben Noordhuis）[#8695](https://github.com/nodejs/node/pull/8695)
* \[[`03f703177f`](https://github.com/nodejs/node/commit/03f703177f)] - **test**：移除对 `net.Socket.resume()` 的调用（Alfred Cepeda）[#8679](https://github.com/nodejs/node/pull/8679)
* \[[`527db40932`](https://github.com/nodejs/node/commit/527db40932)] - **test**：为 execFileSync() 错误增加覆盖（cjihrig）[#9211](https://github.com/nodejs/node/pull/9211)
* \[[`40ef23969d`](https://github.com/nodejs/node/commit/40ef23969d)] - **test**：writable stream 的 needDrain 状态（Italo A. Casas）[#8799](https://github.com/nodejs/node/pull/8799)
* \[[`ba4a3ede56`](https://github.com/nodejs/node/commit/ba4a3ede56)] - **test**：writable stream 的 ending 状态（Italo A. Casas）[#8707](https://github.com/nodejs/node/pull/8707)
* \[[`80a26c7540`](https://github.com/nodejs/node/commit/80a26c7540)] - **test**：writable stream 的 finished 状态（Italo A. Casas）[#8791](https://github.com/nodejs/node/pull/8791)
* \[[`a64af39c83`](https://github.com/nodejs/node/commit/a64af39c83)] - **test**：移除重复要求的模块（Rich Trott）[#9169](https://github.com/nodejs/node/pull/9169)
* \[[`a038fcc307`](https://github.com/nodejs/node/commit/a038fcc307)] - **test**：为 instanceof 添加回归测试（Franziska Hinkelmann）[#9178](https://github.com/nodejs/node/pull/9178)
* \[[`bd99b2d4e4`](https://github.com/nodejs/node/commit/bd99b2d4e4)] - **test**：检查错误构造函数是否为 assert.AssertionError（larissayvette）[#9119](https://github.com/nodejs/node/pull/9119)
* \[[`4a6bd8683f`](https://github.com/nodejs/node/commit/4a6bd8683f)] - **test**：修复不稳定的 test-child-process-fork-dgram（Rich Trott）[#9098](https://github.com/nodejs/node/pull/9098)
* \[[`d9c33646e6`](https://github.com/nodejs/node/commit/d9c33646e6)] - **test**：为 `unpipe()` 添加回归测试（Niels Nielsen）[#9171](https://github.com/nodejs/node/pull/9171)
* \[[`f9b24f42ba`](https://github.com/nodejs/node/commit/f9b24f42ba)] - **test**：在 test-npm-install 中使用 npm sandbox（João Reis）[#9079](https://github.com/nodejs/node/pull/9079)
* \[[`54c38eb22e`](https://github.com/nodejs/node/commit/54c38eb22e)] - **tickprocessor**：在 mac 上手动应用 c++filt（Fedor Indutny）[#8480](https://github.com/nodejs/node/pull/8480)
* \[[`bf25994308`](https://github.com/nodejs/node/commit/bf25994308)] - **tls**：修复 WriteWrap+TLSWrap 组合的泄漏（Fedor Indutny）[#9586](https://github.com/nodejs/node/pull/9586)
* \[[`9049c1f6b6`](https://github.com/nodejs/node/commit/9049c1f6b6)] - **(SEMVER-MINOR)** **tls**：为 `tls.connect` 引入 `secureContext`（Fedor Indutny）[#4246](https://github.com/nodejs/node/pull/4246)
* \[[`b1bd1c42c0`](https://github.com/nodejs/node/commit/b1bd1c42c0)] - **tools**：允许 test.py 使用测试的完整路径（Francis Gulotta）[#9694](https://github.com/nodejs/node/pull/9694)
* \[[`533ce48b6a`](https://github.com/nodejs/node/commit/533ce48b6a)] - **tools**：使 --repeat 在 test.py 中与 -j 一起工作（Rich Trott）[#9249](https://github.com/nodejs/node/pull/9249)
* \[[`f9baa1119f`](https://github.com/nodejs/node/commit/f9baa1119f)] - **tools**：移除悬空的 eslint 符号链接（Sam Roberts）[#9299](https://github.com/nodejs/node/pull/9299)
* \[[`c8dccf29dd`](https://github.com/nodejs/node/commit/c8dccf29dd)] - **tools**：避免在 for 循环中使用 let（jessicaquynh）[#9049](https://github.com/nodejs/node/pull/9049)
* \[[`620cdc5ce8`](https://github.com/nodejs/node/commit/620cdc5ce8)] - **tools**：修复 macOS 10.12 上的发布脚本（Evan Lucas）[#8824](https://github.com/nodejs/node/pull/8824)
* \[[`f18f3b61e3`](https://github.com/nodejs/node/commit/f18f3b61e3)] - **util**：使用模板字符串（Alejandro Oviedo Garcia）[#9120](https://github.com/nodejs/node/pull/9120)
* \[[`1dfb5b5a09`](https://github.com/nodejs/node/commit/1dfb5b5a09)] - **v8**：更新 make-v8.sh 以使用 git（Jaideep Bajwa）[#9393](https://github.com/nodejs/node/pull/9393)
* \[[`bdb6cf92c7`](https://github.com/nodejs/node/commit/bdb6cf92c7)] - **win,msi**：将 INSTALLDIR 属性标记为安全（João Reis）[#8795](https://github.com/nodejs/node/pull/8795)
* \[[`9a02414a29`](https://github.com/nodejs/node/commit/9a02414a29)] - **zlib**：修复使用自定义字典的 raw inflate

<a id="4.6.2"></a>

## 2016-11-08, 4.6.2 版本 'Argon' (LTS), @thealphanerd

这个 LTS 版本包含 219 次提交。其中包括 80 次与文档相关的提交，58 次与测试相关的提交，20 次与构建 / 工具相关的提交，以及 9 次对依赖项的更新。

### 显著变更

* **build**: 现在可以从发布 tarball 构建文档（Anna Henningsen） [#8413](https://github.com/nodejs/node/pull/8413)
* **buffer**: 当传入编码时，Buffer.alloc() 将不再错误地返回一个零填充的缓冲区（Teddy Katz） [#9238](https://github.com/nodejs/node/pull/9238)
* **deps**: 将 LTS 中的 npm 升级到 2.15.11（Kat Marchán） [#8928](https://github.com/nodejs/node/pull/8928)
* **repl**: 为全局属性启用 Tab 补全（Lance Ball） [#7369](https://github.com/nodejs/node/pull/7369)
* **url**: `url.format()` 现在会对 `search` 中所有的 `#` 进行编码（Ilkka Myller） [#8072](https://github.com/nodejs/node/pull/8072)

### 提交

* \[[`06a1c9bf80`](https://github.com/nodejs/node/commit/06a1c9bf80)] - **assert**: 删除永远不会到达的代码（Rich Trott） [#8132](https://github.com/nodejs/node/pull/8132)
* \[[`861e584d46`](https://github.com/nodejs/node/commit/861e584d46)] - **async\_wrap**: 为 test-async-wrap-throw-no-init 添加一个缺失的用例（yorkie） [#8198](https://github.com/nodejs/node/pull/8198)
* \[[`a3d08025fa`](https://github.com/nodejs/node/commit/a3d08025fa)] - **benchmark**: 为 fs.stat 和 fs.statSync 添加基准测试（Anna Henningsen） [#8338](https://github.com/nodejs/node/pull/8338)
* \[[`408a585261`](https://github.com/nodejs/node/commit/408a585261)] - **buffer**: 修复 Buffer.alloc() 中带编码的 `fill`（Teddy Katz） [#9238](https://github.com/nodejs/node/pull/9238)
* \[[`17c4187949`](https://github.com/nodejs/node/commit/17c4187949)] - **buffer**: 优化 hex\_decode（Christopher Jeffrey） [#7602](https://github.com/nodejs/node/pull/7602)
* \[[`50cfea0081`](https://github.com/nodejs/node/commit/50cfea0081)] - **build**: 在 tarball 中为文档构建运行 `npm install`（Anna Henningsen） [#8413](https://github.com/nodejs/node/pull/8413)
* \[[`c4be179064`](https://github.com/nodejs/node/commit/c4be179064)] - **build**: 向 zip 和 7z 包中添加缺失的文件（Richard Lau） [#8069](https://github.com/nodejs/node/pull/8069)
* \[[`41e27f6a6a`](https://github.com/nodejs/node/commit/41e27f6a6a)] - **build**: 不再在宿主系统上链接 liblog（Ben Noordhuis） [#7762](https://github.com/nodejs/node/pull/7762)
* \[[`7766997f7e`](https://github.com/nodejs/node/commit/7766997f7e)] - **build**: 在 CI lint 期间添加冲突标记检查（Brian White） [#7625](https://github.com/nodejs/node/pull/7625)
* \[[`2a66ddbcbb`](https://github.com/nodejs/node/commit/2a66ddbcbb)] - **build**: 重新为 configure 添加 --ninja 选项（Ehsan Akhgari） [#6780](https://github.com/nodejs/node/pull/6780)
* \[[`950cc1df83`](https://github.com/nodejs/node/commit/950cc1df83)] - **build**: 将 config.gypi 依赖添加到 addons/.buildstamp（Daniel Bevenius） [#7893](https://github.com/nodejs/node/pull/7893)
* \[[`e64063c344`](https://github.com/nodejs/node/commit/e64063c344)] - **build**: 夜间构建不再需要处理文档（Johan Bergström） [#8325](https://github.com/nodejs/node/pull/8325)
* \[[`00ea7388cb`](https://github.com/nodejs/node/commit/00ea7388cb)] - **build**: 修复 AIX 上的依赖关系（Michael Dawson） [#8285](https://github.com/nodejs/node/pull/8285)
* \[[`8dfab3ad68`](https://github.com/nodejs/node/commit/8dfab3ad68)] - **build**: 修复 AIX 上的依赖关系（Michael Dawson） [#8272](https://github.com/nodejs/node/pull/8272)
* \[[`1b5f35f1be`](https://github.com/nodejs/node/commit/1b5f35f1be)] - **build**: 启用 thin static archives（Ben Noordhuis） [#7957](https://github.com/nodejs/node/pull/7957)
* \[[`c41efe4d68`](https://github.com/nodejs/node/commit/c41efe4d68)] - **build**: 将 node\_module\_version 添加到 config.gypi（Marcin Cieślak） [#8171](https://github.com/nodejs/node/pull/8171)
* \[[`f556b43e3e`](https://github.com/nodejs/node/commit/f556b43e3e)] - **build**: 添加 --enable-d8 配置选项（Ben Noordhuis） [#7538](https://github.com/nodejs/node/pull/7538)
* \[[`612dfeb647`](https://github.com/nodejs/node/commit/612dfeb647)] - **child\_process**: 在访问 stderr 之前先检查它（Robert Chiras） [#6877](https://github.com/nodejs/node/pull/6877)
* \[[`5ed5142158`](https://github.com/nodejs/node/commit/5ed5142158)] - **child\_process**: 解决 OS X 上的 fd 传递问题（Santiago Gimeno） [#7572](https://github.com/nodejs/node/pull/7572)
* \[[`227db0ab21`](https://github.com/nodejs/node/commit/227db0ab21)] - **cluster**: 删除 bind() 和 self（cjihrig） [#7710](https://github.com/nodejs/node/pull/7710)
* \[[`3003131e9a`](https://github.com/nodejs/node/commit/3003131e9a)] - **configure**: 重新措辞 --without-npm 的帮助信息（BlackYoup） [#7471](https://github.com/nodejs/node/pull/7471)
* \[[`2b933339d0`](https://github.com/nodejs/node/commit/2b933339d0)] - **debugger**: 对词法作用域的 `this` 使用箭头函数（Guy Fraser） [#7415](https://github.com/nodejs/node/pull/7415)
* \[[`52cba4147d`](https://github.com/nodejs/node/commit/52cba4147d)] - **deps**: 从 V8 上游回移 2bcbe2f（ofrobots） [#7814](https://github.com/nodejs/node/pull/7814)
* \[[`2b01bc8e55`](https://github.com/nodejs/node/commit/2b01bc8e55)] - **deps**: 从 v8 上游回移 a76d133（Matt Loring） [#7689](https://github.com/nodejs/node/pull/7689)
* \[[`e1f12fb358`](https://github.com/nodejs/node/commit/e1f12fb358)] - **deps**: 从 v8 上游挑选 b93c80a（Matt Loring） [#7689](https://github.com/nodejs/node/pull/7689)
* \[[`2d07fd71ee`](https://github.com/nodejs/node/commit/2d07fd71ee)] - **deps**: 从上游 V8 回移 e093a04、09db540（Ali Ijaz Sheikh） [#7689](https://github.com/nodejs/node/pull/7689)
* \[[`4369055878`](https://github.com/nodejs/node/commit/4369055878)] - **deps**: 从 v8 上游挑选 1f53e42（Ben Noordhuis） [#7612](https://github.com/nodejs/node/pull/7612)
* \[[`05d40d9573`](https://github.com/nodejs/node/commit/05d40d9573)] - **deps**: 将 LTS 中的 npm 升级到 2.15.11（Kat Marchán） [#8928](https://github.com/nodejs/node/pull/8928)
* \[[`36b3ff0cfc`](https://github.com/nodejs/node/commit/36b3ff0cfc)] - **deps**: 为长文件名调整 gyp 补丁（Anna Henningsen） [#7963](https://github.com/nodejs/node/pull/7963)
* \[[`9ddc615d0e`](https://github.com/nodejs/node/commit/9ddc615d0e)] - **deps**: 对 ml64.exe 不使用 /safeseh（Fedor Indutny） [#7759](https://github.com/nodejs/node/pull/7759)
* \[[`ea36c61eda`](https://github.com/nodejs/node/commit/ea36c61eda)] - **deps**: 为 OpenSSL 设置 `MASM.UseSafeExceptionHandlers`（Fedor Indutny） [#7427](https://github.com/nodejs/node/pull/7427)
* \[[`0b87b1a095`](https://github.com/nodejs/node/commit/0b87b1a095)] - **dns**: 调整 IPv6 地址的正则表达式（Luigi Pinca） [#8665](https://github.com/nodejs/node/pull/8665)
* \[[`0e2aba96bc`](https://github.com/nodejs/node/commit/0e2aba96bc)] - **doc**: 确保链接能够正确传递给 marked（Timothy Gu） [#8494](https://github.com/nodejs/node/pull/8494)
* \[[`3a43b0d981`](https://github.com/nodejs/node/commit/3a43b0d981)] - **doc**: 更正 `Buffer.from` 的元数据（Anna Henningsen） [#9167](https://github.com/nodejs/node/pull/9167)
* \[[`880ca99847`](https://github.com/nodejs/node/commit/880ca99847)] - **doc**: 修复 dgram 文档中的损坏链接（Brian White） [#8365](https://github.com/nodejs/node/pull/8365)
* \[[`65ca2af471`](https://github.com/nodejs/node/commit/65ca2af471)] - **doc**: 添加缺失的分号（Ravindra barthwal） [#7915](https://github.com/nodejs/node/pull/7915)
* \[[`da3b938be3`](https://github.com/nodejs/node/commit/da3b938be3)] - **doc**: 为全局对象添加 `added:` 信息（Luigi Pinca） [#8901](https://github.com/nodejs/node/pull/8901)
* \[[`b4ba4af525`](https://github.com/nodejs/node/commit/b4ba4af525)] - **doc**: 添加 2016-09-07 CTC 会议纪要（Josh Gavant） [#8499](https://github.com/nodejs/node/pull/8499)
* \[[`4b49b0e30c`](https://github.com/nodejs/node/commit/4b49b0e30c)] - **doc**: 添加 2016-09-14 CTC 会议纪要（Josh Gavant） [#8726](https://github.com/nodejs/node/pull/8726)
* \[[`88b0067229`](https://github.com/nodejs/node/commit/88b0067229)] - **doc**: 添加 2016-09-21 CTC 会议纪要（Josh Gavant） [#8727](https://github.com/nodejs/node/pull/8727)
* \[[`f7c4e9489f`](https://github.com/nodejs/node/commit/f7c4e9489f)] - **doc**: 使用 license-builder.sh 更新 npm LICENSE（Kat Marchán） [#8928](https://github.com/nodejs/node/pull/8928)
* \[[`6effc4aadc`](https://github.com/nodejs/node/commit/6effc4aadc)] - **doc**: 为 crypto 添加 `added:` 信息（Luigi Pinca） [#8281](https://github.com/nodejs/node/pull/8281)
* \[[`d750fc6336`](https://github.com/nodejs/node/commit/d750fc6336)] - **doc**: 为 dgram 添加 `added:` 信息（Luigi Pinca） [#8196](https://github.com/nodejs/node/pull/8196)
* \[[`b92e3fc72e`](https://github.com/nodejs/node/commit/b92e3fc72e)] - **doc**: 为 util 添加 `added:` 信息（Luigi Pinca） [#8206](https://github.com/nodejs/node/pull/8206)
* \[[`578bf511f9`](https://github.com/nodejs/node/commit/578bf511f9)] - **doc**: 为 events 添加 `added:` 信息（Luigi Pinca） [#7822](https://github.com/nodejs/node/pull/7822)
* \[[`6ef58e7211`](https://github.com/nodejs/node/commit/6ef58e7211)] - **doc**: 将 gibfahn 添加为协作者（Gibson Fahnestock） [#8533](https://github.com/nodejs/node/pull/8533)
* \[[`5ff1fc7d86`](https://github.com/nodejs/node/commit/5ff1fc7d86)] - **doc**: 将 imyller 添加为协作者（Ilkka Myller） [#8530](https://github.com/nodejs/node/pull/8530)
* \[[`88bb65dd74`](https://github.com/nodejs/node/commit/88bb65dd74)] - **doc**: 将 not-an-aardvark 添加为协作者（not-an-aardvark） [#8525](https://github.com/nodejs/node/pull/8525)
* \[[`5bec1eb0d4`](https://github.com/nodejs/node/commit/5bec1eb0d4)] - **doc**: 更新 onboarding PR 落地信息（Rich Trott） [#8479](https://github.com/nodejs/node/pull/8479)
* \[[`ecd2b52982`](https://github.com/nodejs/node/commit/ecd2b52982)] - **doc**: 在 onboarding 之前鼓励启用 2FA（Rich Trott） [#8776](https://github.com/nodejs/node/pull/8776)
* \[[`2adbd53837`](https://github.com/nodejs/node/commit/2adbd53837)] - **doc**: 为发布博客文章添加提交格式（fen） [#8631](https://github.com/nodejs/node/pull/8631)
* \[[`764502bb37`](https://github.com/nodejs/node/commit/764502bb37)] - **doc**: 添加 2016-08-24 CTC 会议纪要（Josh Gavant） [#8423](https://github.com/nodejs/node/pull/8423)
* \[[`3037a9da08`](https://github.com/nodejs/node/commit/3037a9da08)] - **doc**: 将 eugeneo 添加为协作者（Eugene Ostroukhov） [#8696](https://github.com/nodejs/node/pull/8696)
* \[[`0fd1d8dfd7`](https://github.com/nodejs/node/commit/0fd1d8dfd7)] - **doc**: 将 ak239 添加为协作者（Aleksey Kozyatinskiy） [#8676](https://github.com/nodejs/node/pull/8676)
* \[[`64c4bb30fe`](https://github.com/nodejs/node/commit/64c4bb30fe)] - **doc**: 在 README 中添加帮助仓库链接（Rich Trott） [#8570](https://github.com/nodejs/node/pull/8570)
* \[[`d123fc1307`](https://github.com/nodejs/node/commit/d123fc1307)] - **doc**: 更新 onboarding 文档中的练习部分（Rich Trott） [#8559](https://github.com/nodejs/node/pull/8559)
* \[[`c6b622f6b3`](https://github.com/nodejs/node/commit/c6b622f6b3)] - **doc**: 添加 2016-08-31 CTC 会议纪要（Josh Gavant） [#8424](https://github.com/nodejs/node/pull/8424)
* \[[`055d39c724`](https://github.com/nodejs/node/commit/055d39c724)] - **doc**: 向 onboarding 文档添加 CI 帮助/支持信息（Rich Trott） [#8407](https://github.com/nodejs/node/pull/8407)
* \[[`a7e6fc08d8`](https://github.com/nodejs/node/commit/a7e6fc08d8)] - **doc**: 添加 2016-08-17 CTC 会议纪要（Josh Gavant） [#8245](https://github.com/nodejs/node/pull/8245)
* \[[`ca63c127c7`](https://github.com/nodejs/node/commit/ca63c127c7)] - **doc**: 添加 2016-08-10 CTC 会议纪要（Josh Gavant） [#8229](https://github.com/nodejs/node/pull/8229)
* \[[`3f2e3dfb32`](https://github.com/nodejs/node/commit/3f2e3dfb32)] - **doc**: 更新 onboarding 文档中的 CI 内容（Rich Trott） [#8374](https://github.com/nodejs/node/pull/8374)
* \[[`9e1325c42e`](https://github.com/nodejs/node/commit/9e1325c42e)] - **doc**: 更新作者列表（James M Snell） [#8346](https://github.com/nodejs/node/pull/8346)
* \[[`c529bf5521`](https://github.com/nodejs/node/commit/c529bf5521)] - **doc**: 添加 clientRequest.setTimeout 的返回类型（Mike Ralphson） [#8356](https://github.com/nodejs/node/pull/8356)
* \[[`c094b2a51c`](https://github.com/nodejs/node/commit/c094b2a51c)] - **doc**: 按请求更新 readme 中的 targos 邮箱（James M Snell） [#8389](https://github.com/nodejs/node/pull/8389)
* \[[`5c417ee25b`](https://github.com/nodejs/node/commit/5c417ee25b)] - **doc**: 更新 onboarding 文档中的落地 PR 信息（Rich Trott） [#8344](https://github.com/nodejs/node/pull/8344)
* \[[`763fa85ccf`](https://github.com/nodejs/node/commit/763fa85ccf)] - **doc**: 为 fs.access() 和 fs.exists() 提供错误/更佳示例（Dan Fabulich） [#7832](https://github.com/nodejs/node/pull/7832)
* \[[`0c933e5bab`](https://github.com/nodejs/node/commit/0c933e5bab)] - **doc**: 将 danbev 添加为协作者（Daniel Bevenius） [#8359](https://github.com/nodejs/node/pull/8359)
* \[[`e069dc45b0`](https://github.com/nodejs/node/commit/e069dc45b0)] - **doc**: 将 lpinca 添加为协作者（Luigi Pinca） [#8331](https://github.com/nodejs/node/pull/8331)
* \[[`e5f4367da5`](https://github.com/nodejs/node/commit/e5f4367da5)] - **doc**: readline 的 write() 会作为输入进行处理（James M Snell） [#8295](https://github.com/nodejs/node/pull/8295)
* \[[`b3617fcc7d`](https://github.com/nodejs/node/commit/b3617fcc7d)] - **doc**: 为 modules 添加 `added:` 信息（Luigi Pinca） [#8250](https://github.com/nodejs/node/pull/8250)
* \[[`0b605636c5`](https://github.com/nodejs/node/commit/0b605636c5)] - **doc**: 将 Myles Borins 添加到 CTC（Rod Vagg） [#8260](https://github.com/nodejs/node/pull/8260)
* \[[`a8a8f0a6f1`](https://github.com/nodejs/node/commit/a8a8f0a6f1)] - **doc**: 为 cluster 添加 `added:` 信息（Anna Henningsen） [#7640](https://github.com/nodejs/node/pull/7640)
* \[[`2a2971b26e`](https://github.com/nodejs/node/commit/2a2971b26e)] - **doc**: 对 Stability: 标记使用块引用（Anna Henningsen） [#7757](https://github.com/nodejs/node/pull/7757)
* \[[`3a3fde69c7`](https://github.com/nodejs/node/commit/3a3fde69c7)] - **doc**: 修复 server 示例代码中的变量作用域 bug（lazlojuly） [#8124](https://github.com/nodejs/node/pull/8124)
* \[[`f1e14e4227`](https://github.com/nodejs/node/commit/f1e14e4227)] - **doc**: 修复 cluster message 事件文档（Zach Bjornson） [#8017](https://github.com/nodejs/node/pull/8017)
* \[[`9b29cfc3a6`](https://github.com/nodejs/node/commit/9b29cfc3a6)] - **doc**: 清理 manpage 中的 roff 源文件（Alhadis） [#7819](https://github.com/nodejs/node/pull/7819)
* \[[`364af49e0f`](https://github.com/nodejs/node/commit/364af49e0f)] - **doc**: 添加 2016-06-22 CTC 会议纪要（Josh Gavant） [#7390](https://github.com/nodejs/node/pull/7390)
* \[[`9892a5ddc3`](https://github.com/nodejs/node/commit/9892a5ddc3)] - **doc**: 删除示例中的多余空格和字符串拼接（Joe Esposito） [#7885](https://github.com/nodejs/node/pull/7885)
* \[[`3ad74089f5`](https://github.com/nodejs/node/commit/3ad74089f5)] - **doc**: 更正 buf.compare 的示例输出（Hargobind S. Khalsa） [#7777](https://github.com/nodejs/node/pull/7777)
* \[[`26e695c46c`](https://github.com/nodejs/node/commit/26e695c46c)] - **doc**: 删除“feature branch”行话（Rich Trott） [#8194](https://github.com/nodejs/node/pull/8194)
* \[[`d676467208`](https://github.com/nodejs/node/commit/d676467208)] - **doc**: 从 ROADMAP.md 中删除过时的 LTS 信息（Rich Trott） [#8161](https://github.com/nodejs/node/pull/8161)
* \[[`b3545e148d`](https://github.com/nodejs/node/commit/b3545e148d)] - **doc**: 将发布公告说明更新为发推（Tracy Hinds） [#8126](https://github.com/nodejs/node/pull/8126)
* \[[`2032bba65f`](https://github.com/nodejs/node/commit/2032bba65f)] - **doc**: 添加 @joshgav 到协作者列表（Josh Gavant） [#8146](https://github.com/nodejs/node/pull/8146)
* \[[`727c24f3a2`](https://github.com/nodejs/node/commit/727c24f3a2)] - **doc**: 更新 onboarding 文档中的 Reviewing 部分（Rich Trott）
* \[[`04515b891a`](https://github.com/nodejs/node/commit/04515b891a)] - **doc**: 将 orangemocha 移至协作者列表（Rich Trott） [#8062](https://github.com/nodejs/node/pull/8062)
* \[[`d3344aa216`](https://github.com/nodejs/node/commit/d3344aa216)] - **doc**: 将 fhinkel 添加为协作者（Franziska Hinkelmann） [#8052](https://github.com/nodejs/node/pull/8052)
* \[[`532bbde4bf`](https://github.com/nodejs/node/commit/532bbde4bf)] - **doc**: 添加 2016-08-03 CTC 会议纪要（Josh Gavant） [#7980](https://github.com/nodejs/node/pull/7980)
* \[[`98fe74fbc8`](https://github.com/nodejs/node/commit/98fe74fbc8)] - **doc**: 修复 CTC 会议纪要中的一个 markdown 错误（Сковорода Никита Андреевич） [#7729](https://github.com/nodejs/node/pull/7729)
* \[[`e74daadeb6`](https://github.com/nodejs/node/commit/e74daadeb6)] - **doc**: 澄清 collaborators 与 ctc 成员之间的关系（yorkie） [#7996](https://github.com/nodejs/node/pull/7996)
* \[[`6bfdc92860`](https://github.com/nodejs/node/commit/6bfdc92860)] - **doc**: 澄清“Reviewed-By” 与 “LGTM” 的对应关系（Bryan English） [#7183](https://github.com/nodejs/node/pull/7183)
* \[[`94a82cd0a7`](https://github.com/nodejs/node/commit/94a82cd0a7)] - **doc**: 添加 2016-07-13 CTC 会议纪要（Josh Gavant） [#7968](https://github.com/nodejs/node/pull/7968)
* \[[`012ccf010e`](https://github.com/nodejs/node/commit/012ccf010e)] - **doc**: 添加 2016-07-20 CTC 会议纪要（Josh Gavant） [#7970](https://github.com/nodejs/node/pull/7970)
* \[[`08111e84b1`](https://github.com/nodejs/node/commit/08111e84b1)] - **doc**: 在 README 中使用一致的 markdown（Rich Trott） [#7971](https://github.com/nodejs/node/pull/7971)
* \[[`009df788de`](https://github.com/nodejs/node/commit/009df788de)] - **doc**: 对发布标签使用 `git-secure-tag`（Fedor Indutny） [#7603](https://github.com/nodejs/node/pull/7603)
* \[[`abefdca5ae`](https://github.com/nodejs/node/commit/abefdca5ae)] - **doc**: piscisaureus 已从 CTC 退出（James M Snell） [#7969](https://github.com/nodejs/node/pull/7969)
* \[[`9700660d2b`](https://github.com/nodejs/node/commit/9700660d2b)] - **doc**: 将 @addaleax 添加到 CTC（Anna Henningsen） [#7966](https://github.com/nodejs/node/pull/7966)
* \[[`f255180853`](https://github.com/nodejs/node/commit/f255180853)] - **doc**: 添加 2016-07-06 CTC 会议纪要（Josh Gavant） [#7570](https://github.com/nodejs/node/pull/7570)
* \[[`b60473fac7`](https://github.com/nodejs/node/commit/b60473fac7)] - **doc**: 添加 2016-06-29 CTC 会议纪要（Josh Gavant） [#7571](https://github.com/nodejs/node/pull/7571)
* \[[`ac40b2a9b6`](https://github.com/nodejs/node/commit/ac40b2a9b6)] - **doc**: 添加 2016-07-27 CTC 会议纪要（William Kapke） [#7900](https://github.com/nodejs/node/pull/7900)
* \[[`bbbbb19658`](https://github.com/nodejs/node/commit/bbbbb19658)] - **doc**: 添加关于 CTC 法定人数规则的信息（Rich Trott） [#7813](https://github.com/nodejs/node/pull/7813)
* \[[`d759d4e0a6`](https://github.com/nodejs/node/commit/d759d4e0a6)] - **doc**: 从 CONTRIBUTING 中移除平台假设（Bethany N Griggs） [#7783](https://github.com/nodejs/node/pull/7783)
* \[[`b01854dd9d`](https://github.com/nodejs/node/commit/b01854dd9d)] - **doc**: 将 princejwesley 添加为协作者（Prince J Wesley） [#7877](https://github.com/nodejs/node/pull/7877)
* \[[`26f5168c02`](https://github.com/nodejs/node/commit/26f5168c02)] - **doc**: 澄清 node.js irc 频道不受 tsc 监督（James M Snell） [#7810](https://github.com/nodejs/node/pull/7810)
* \[[`506e367062`](https://github.com/nodejs/node/commit/506e367062)] - **doc**: 在 readme 中将 andrasq 更新为协作者（Andras） [#7801](https://github.com/nodejs/node/pull/7801)
* \[[`590c52a309`](https://github.com/nodejs/node/commit/590c52a309)] - **doc**: 更新 CTC 治理信息（Rich Trott） [#7719](https://github.com/nodejs/node/pull/7719)
* \[[`fdff642e0b`](https://github.com/nodejs/node/commit/fdff642e0b)] - **doc**: 修复 util.deprecate() 示例（Evan Lucas） [#7674](https://github.com/nodejs/node/pull/7674)
* \[[`8fec02ffb8`](https://github.com/nodejs/node/commit/8fec02ffb8)] - **doc**: 删除不存在的 zlib 常量（Franziska Hinkelmann） [#7520](https://github.com/nodejs/node/pull/7520)
* \[[`d6c2e383a2`](https://github.com/nodejs/node/commit/d6c2e383a2)] - **doc**: 对 onboarding 文档进行小幅更新（Rich Trott） [#8060](https://github.com/nodejs/node/pull/8060)
* \[[`e46d1e026e`](https://github.com/nodejs/node/commit/e46d1e026e)] - **doc**: 向 onboarding 文档添加 POST\_STATUS\_TO\_PR 信息（Rich Trott） [#8059](https://github.com/nodejs/node/pull/8059)
* \[[`4f3107190d`](https://github.com/nodejs/node/commit/4f3107190d)] - **doc**: 为 dgram.\*Membership() 添加 `added:` 信息（Rich Trott） [#6753](https://github.com/nodejs/node/pull/6753)
* \[[`0e52861629`](https://github.com/nodejs/node/commit/0e52861629)] - **doc**: 修正 event loop 指南中的语法问题（Ryan Lewis） [#7479](https://github.com/nodejs/node/pull/7479)
* \[[`29139bff65`](https://github.com/nodejs/node/commit/29139bff65)] - **doc**: 改进 server.listen() 随机端口说明（Phillip Johnsen） [#8025](https://github.com/nodejs/node/pull/8025)
* \[[`b680eb99ad`](https://github.com/nodejs/node/commit/b680eb99ad)] - **doctool**: 改进文档中页面标题（yorkie）
* \[[`3d6f107a2f`](https://github.com/nodejs/node/commit/3d6f107a2f)] - **fs**: 修复 `uv_stat_t` 字段的处理（Anna Henningsen） [#8515](https://github.com/nodejs/node/pull/8515)
* \[[`2e29b76666`](https://github.com/nodejs/node/commit/2e29b76666)] - **intl**: 如果 v8BreakIterator 不可用则不要崩溃（Steven R. Loomis） [#4253](https://github.com/nodejs/node/pull/4253)
* \[[`f6e332da2d`](https://github.com/nodejs/node/commit/f6e332da2d)] - **lib**: 实现一致的花括号风格（Rich Trott） [#8348](https://github.com/nodejs/node/pull/8348)
* \[[`9d9bcd7c55`](https://github.com/nodejs/node/commit/9d9bcd7c55)] - **meta**: 澄清破坏性变更的流程（Rich Trott） [#7955](https://github.com/nodejs/node/pull/7955)
* \[[`6d49f22e35`](https://github.com/nodejs/node/commit/6d49f22e35)] - **meta**: 包含一个最小化的 CTC 移除策略（Rich Trott） [#7720](https://github.com/nodejs/node/pull/7720)
* \[[`7faf6dc0da`](https://github.com/nodejs/node/commit/7faf6dc0da)] - **meta**: 提供示例活动（Rich Trott） [#7744](https://github.com/nodejs/node/pull/7744)
* \[[`fe48415c60`](https://github.com/nodejs/node/commit/fe48415c60)] - **net**: 在规范化参数时添加长度检查（Brian White） [#8112](https://github.com/nodejs/node/pull/8112)
* \[[`3906206ecc`](https://github.com/nodejs/node/commit/3906206ecc)] - **net**: 删除不必要的变量（Brian White） [#8112](https://github.com/nodejs/node/pull/8112)
* \[[`9f1b790f79`](https://github.com/nodejs/node/commit/9f1b790f79)] - **net**: 使将缓冲区保留在内存中的方式更健壮（Anna Henningsen） [#8252](https://github.com/nodejs/node/pull/8252)
* \[[`b630be2309`](https://github.com/nodejs/node/commit/b630be2309)] - **net**: 直接从 cares 导出 isIPv4、isIPv6（Sakthipriyan Vairamani） [#7481](https://github.com/nodejs/node/pull/7481)
* \[[`c235708bef`](https://github.com/nodejs/node/commit/c235708bef)] - **readline**: 为 escape 字符触发按键事件（Prince J Wesley） [#7382](https://github.com/nodejs/node/pull/7382)
* \[[`8198dbc5a4`](https://github.com/nodejs/node/commit/8198dbc5a4)] - **repl**: 为全局属性启用 Tab 补全（Lance Ball） [#7369](https://github.com/nodejs/node/pull/7369)
* \[[`12300626d7`](https://github.com/nodejs/node/commit/12300626d7)] - **src**: 如果对象未被包装，则 getter 不要中止（Trevor Norris） [#6184](https://github.com/nodejs/node/pull/6184)
* \[[`166a9b85d9`](https://github.com/nodejs/node/commit/166a9b85d9)] - **src**: 在 persistent Reset() 之前始终清除 wrap（Trevor Norris） [#6184](https://github.com/nodejs/node/pull/6184)
* \[[`b3149cee8c`](https://github.com/nodejs/node/commit/b3149cee8c)] - **src**: 先继承自 AsyncWrap（Trevor Norris） [#6184](https://github.com/nodejs/node/pull/6184)
* \[[`8b93fddd1b`](https://github.com/nodejs/node/commit/8b93fddd1b)] - **src**: 禁用 stdio 缓冲（Ben Noordhuis） [#7610](https://github.com/nodejs/node/pull/7610)
* \[[`72be320962`](https://github.com/nodejs/node/commit/72be320962)] - **src**: 抑制 coverity 消息（cjihrig） [#7587](https://github.com/nodejs/node/pull/7587)
* \[[`6ba3ad5d34`](https://github.com/nodejs/node/commit/6ba3ad5d34)] - **src**: 在 ParseArrayIndex() 中防止溢出（Ben Noordhuis） [#7497](https://github.com/nodejs/node/pull/7497)
* \[[`e1f961d050`](https://github.com/nodejs/node/commit/e1f961d050)] - **src**: 将 ParseArrayIndex() 移至 src/node\_buffer.cc（Ben Noordhuis） [#7497](https://github.com/nodejs/node/pull/7497)
* \[[`57921ebec5`](https://github.com/nodejs/node/commit/57921ebec5)] - **src**: 删除不必要的 HandleScopes（Ben Noordhuis） [#7711](https://github.com/nodejs/node/pull/7711)
* \[[`6838ad5f8e`](https://github.com/nodejs/node/commit/6838ad5f8e)] - **src**: 修复 UDPWrap::Instantiate() 中的句柄泄漏（Ben Noordhuis） [#7711](https://github.com/nodejs/node/pull/7711)
* \[[`dadcf6b263`](https://github.com/nodejs/node/commit/dadcf6b263)] - **src**: 修复 BuildStatsObject() 中的句柄泄漏（Ben Noordhuis） [#7711](https://github.com/nodejs/node/pull/7711)
* \[[`7aa268922a`](https://github.com/nodejs/node/commit/7aa268922a)] - **src**: 修复 Buffer::New() 中的句柄泄漏（Ben Noordhuis） [#7711](https://github.com/nodejs/node/pull/7711)
* \[[`606deecd16`](https://github.com/nodejs/node/commit/606deecd16)] - **src**: 在 WriteConsoleW 调用中不要包含空字符（Nikolai Vavilov） [#7764](https://github.com/nodejs/node/pull/7764)
* \[[`a5b6c2cdd7`](https://github.com/nodejs/node/commit/a5b6c2cdd7)] - **src**: 对互斥锁和条件变量使用 RAII（Ben Noordhuis） [#7334](https://github.com/nodejs/node/pull/7334)
* \[[`19d6f06058`](https://github.com/nodejs/node/commit/19d6f06058)] - **stream\_base**: 始终使用 Base 模板类（Trevor Norris） [#6184](https://github.com/nodejs/node/pull/6184)
* \[[`d5f03db819`](https://github.com/nodejs/node/commit/d5f03db819)] - **test**: 修复 test-cluster-dgram-1 的不稳定问题（Santiago Gimeno）
* \[[`a83bbaa5a3`](https://github.com/nodejs/node/commit/a83bbaa5a3)] - **test**: 重构 test-tick-processor（Rich Trott） [#8180](https://github.com/nodejs/node/pull/8180)
* \[[`1c81c078c2`](https://github.com/nodejs/node/commit/1c81c078c2)] - **test**: 添加 assert.notDeepStrictEqual() 测试（Rich Trott） [#8177](https://github.com/nodejs/node/pull/8177)
* \[[`57c98f18a9`](https://github.com/nodejs/node/commit/57c98f18a9)] - **test**: 在 crypto 测试中优先使用 `===` 而非 `==`（Rich Trott） [#8176](https://github.com/nodejs/node/pull/8176)
* \[[`11f761ab1a`](https://github.com/nodejs/node/commit/11f761ab1a)] - **test**: 重构 pummel/test-dtrace-jsstack（Rich Trott） [#8175](https://github.com/nodejs/node/pull/8175)
* \[[`2997b79fcc`](https://github.com/nodejs/node/commit/2997b79fcc)] - **test**: 在 test-exec 中优先使用严格相等（Rich Trott） [#8173](https://github.com/nodejs/node/pull/8173)
* \[[`558f7d999c`](https://github.com/nodejs/node/commit/558f7d999c)] - **test**: 添加 assert.notDeepEqual() 测试（Rich Trott） [#8156](https://github.com/nodejs/node/pull/8156)
* \[[`49c488625d`](https://github.com/nodejs/node/commit/49c488625d)] - **test**: 添加缺失的 assert.deepEqual() 测试用例（Rich Trott） [#8152](https://github.com/nodejs/node/pull/8152)
* \[[`eec078cd66`](https://github.com/nodejs/node/commit/eec078cd66)] - **test**: 在 http 测试中优先使用严格相等（Rich Trott） [#8151](https://github.com/nodejs/node/pull/8151)
* \[[`e3669f8c21`](https://github.com/nodejs/node/commit/e3669f8c21)] - **test**: 在 pummel net 测试中优先使用严格相等（Rich Trott） [#8135](https://github.com/nodejs/node/pull/8135)
* \[[`ac83d199fb`](https://github.com/nodejs/node/commit/ac83d199fb)] - **test**: 确认 assert 会截断长值（Rich Trott） [#8134](https://github.com/nodejs/node/pull/8134)
* \[[`9c826beef7`](https://github.com/nodejs/node/commit/9c826beef7)] - **test**: 在 test-timers.js 中优先使用 `===` 而非 `==`（Rich Trott） [#8131](https://github.com/nodejs/node/pull/8131)
* \[[`af02d2a642`](https://github.com/nodejs/node/commit/af02d2a642)] - **test**: 优先使用严格相等检查（Rich Trott） [#8130](https://github.com/nodejs/node/pull/8130)
* \[[`30034048b0`](https://github.com/nodejs/node/commit/30034048b0)] - **test**: 修复 test-watch-file.js 中的断言（Rich Trott） [#8129](https://github.com/nodejs/node/pull/8129)
* \[[`b063dc90b1`](https://github.com/nodejs/node/commit/b063dc90b1)] - **test**: 在回归测试中使用严格相等（Rich Trott） [#8098](https://github.com/nodejs/node/pull/8098)
* \[[`dc7bc2e679`](https://github.com/nodejs/node/commit/dc7bc2e679)] - **test**: 为 debug 使用信息添加测试（Rich Trott） [#8061](https://github.com/nodejs/node/pull/8061)
* \[[`ce2cfbdc3a`](https://github.com/nodejs/node/commit/ce2cfbdc3a)] - **test**: console 构造函数缺少 new 关键字（Rich Trott） [#8003](https://github.com/nodejs/node/pull/8003)
* \[[`69f4edd368`](https://github.com/nodejs/node/commit/69f4edd368)] - **test**: 加快 test-net-reconnect-error（Rich Trott） [#7886](https://github.com/nodejs/node/pull/7886)
* \[[`50acf72d80`](https://github.com/nodejs/node/commit/50acf72d80)] - **test**: 提高高强度测试所需的 RAM 要求（Rich Trott） [#7772](https://github.com/nodejs/node/pull/7772)
* \[[`924ea0a2bd`](https://github.com/nodejs/node/commit/924ea0a2bd)] - **test**: 修复不稳定的 test-http-server-consumed-timeout（Rich Trott） [#7717](https://github.com/nodejs/node/pull/7717)
* \[[`97a3d89c80`](https://github.com/nodejs/node/commit/97a3d89c80)] - **test**: 提高 util 模块的覆盖率（Michaël Zasso） [#8633](https://github.com/nodejs/node/pull/8633)
* \[[`52bb37734b`](https://github.com/nodejs/node/commit/52bb37734b)] - **test**: 将 test-child-process-fork-dgram 标记为不稳定（Michael Dawson） [#8274](https://github.com/nodejs/node/pull/8274)
* \[[`97c68ddaad`](https://github.com/nodejs/node/commit/97c68ddaad)] - **test**: 改进 test-tick-processor 中的错误信息（Rich Trott） [#7693](https://github.com/nodejs/node/pull/7693)
* \[[`cd9e8e0361`](https://github.com/nodejs/node/commit/cd9e8e0361)] - **test**: 修复旧的 tty 测试（Jeremiah Senkpiel） [#7613](https://github.com/nodejs/node/pull/7613)
* \[[`22990d8851`](https://github.com/nodejs/node/commit/22990d8851)] - **test**: 将 parallel/test-tty-\* 移至 pseudo-tty/（Jeremiah Senkpiel） [#7613](https://github.com/nodejs/node/pull/7613)
* \[[`afee32fed5`](https://github.com/nodejs/node/commit/afee32fed5)] - **test**: 修复 OS X 上的 `fs-watch-recursive` 不稳定问题（Santiago Gimeno） [#4629](https://github.com/nodejs/node/pull/4629)
* \[[`c543f4a879`](https://github.com/nodejs/node/commit/c543f4a879)] - **test**: stream writable ended state（Italo A. Casas） [#8778](https://github.com/nodejs/node/pull/8778)
* \[[`f46a04cc6d`](https://github.com/nodejs/node/commit/f46a04cc6d)] - **test**: 添加对发送后增删 header 的测试（Niklas Ingholt） [#8682](https://github.com/nodejs/node/pull/8682)
* \[[`e79351c3ac`](https://github.com/nodejs/node/commit/e79351c3ac)] - **test**: 改进 test-https-agent.js（Dan.Williams） [#8517](https://github.com/nodejs/node/pull/8517)
* \[[`9ffb2f3c0d`](https://github.com/nodejs/node/commit/9ffb2f3c0d)] - **test**: 为 client.\_addHandle() 添加覆盖（Rich Trott） [#8518](https://github.com/nodejs/node/pull/8518)
* \[[`8da2dcb70a`](https://github.com/nodejs/node/commit/8da2dcb70a)] - **test**: 重构 parallel/test-http.js（Junshu Okamoto） [#8471](https://github.com/nodejs/node/pull/8471)
* \[[`69404ec473`](https://github.com/nodejs/node/commit/69404ec473)] - **test**: 修复不稳定的 test-force-repl（Rich Trott） [#8484](https://github.com/nodejs/node/pull/8484)
* \[[`5a07bb62ea`](https://github.com/nodejs/node/commit/5a07bb62ea)] - **test**: 将 == 和 equal 替换为 === 和 strictEqual（Christopher Dunavan） [#8472](https://github.com/nodejs/node/pull/8472)
* \[[`ad1230e731`](https://github.com/nodejs/node/commit/ad1230e731)] - **test**: 跳过 pseudo-tty/no\_dropped\_stdio 测试（Michael Dawson） [#8470](https://github.com/nodejs/node/pull/8470)
* \[[`6d03170751`](https://github.com/nodejs/node/commit/6d03170751)] - **test**: 清理 net server try ports 测试（Thomas Hunter II） [#8458](https://github.com/nodejs/node/pull/8458)
* \[[`775c84ec38`](https://github.com/nodejs/node/commit/775c84ec38)] - **test**: 添加 test-debug-protocol-execute（Rich Trott） [#8454](https://github.com/nodejs/node/pull/8454)
* \[[`0d1082426a`](https://github.com/nodejs/node/commit/0d1082426a)] - **test**: 将 pseudo-tty/no\_dropped\_stdio 标记为不稳定（Michael Dawson） [#8385](https://github.com/nodejs/node/pull/8385)
* \[[`c034c861bb`](https://github.com/nodejs/node/commit/c034c861bb)] - **test**: 测试 zlib 与非 buffer/string 输入（Rich Trott） [#8350](https://github.com/nodejs/node/pull/8350)
* \[[`bb8690433c`](https://github.com/nodejs/node/commit/bb8690433c)] - **test**: 修复 test-dns-ipv6 中的 ::1 错误（Gibson Fahnestock） [#8254](https://github.com/nodejs/node/pull/8254)
* \[[`2f458ea663`](https://github.com/nodejs/node/commit/2f458ea663)] - **test**: 为 zlib.create\*Raw() 添加测试（Rich Trott） [#8306](https://github.com/nodejs/node/pull/8306)
* \[[`a368ea673c`](https://github.com/nodejs/node/commit/a368ea673c)] - **test**: 重构 test-debug-signal-cluster（Rich Trott） [#8289](https://github.com/nodejs/node/pull/8289)
* \[[`a48469f098`](https://github.com/nodejs/node/commit/a48469f098)] - **test**: 在 test-signal-handler 中添加检查（Rich Trott） [#8248](https://github.com/nodejs/node/pull/8248)
* \[[`cadb2612c6`](https://github.com/nodejs/node/commit/cadb2612c6)] - **test**: 为尝试多个 IPC 通道添加测试（cjihrig） [#8159](https://github.com/nodejs/node/pull/8159)
* \[[`21c1b8467e`](https://github.com/nodejs/node/commit/21c1b8467e)] - **test**: 减少 common.js 中的不一致性（Vse Mozhet Byt） [#7758](https://github.com/nodejs/node/pull/7758)
* \[[`d40873ddcd`](https://github.com/nodejs/node/commit/d40873ddcd)] - **test**: 确保流预处理顺序（Vse Mozhet Byt） [#7741](https://github.com/nodejs/node/pull/7741)
* \[[`0e1f098b09`](https://github.com/nodejs/node/commit/0e1f098b09)] - **test**: 避免使用混合 IPv6 地址（Gireesh Punathil） [#7702](https://github.com/nodejs/node/pull/7702)
* \[[`741373cb49`](https://github.com/nodejs/node/commit/741373cb49)] - **test**: 清理 test-buffer-badhex（Jeremiah Senkpiel） [#7773](https://github.com/nodejs/node/pull/7773)
* \[[`58f3fa17eb`](https://github.com/nodejs/node/commit/58f3fa17eb)] - **test**: 视情况将 assert.fail 替换为 common.fail（cjihrig） [#7735](https://github.com/nodejs/node/pull/7735)
* \[[`b0e2f9a37a`](https://github.com/nodejs/node/commit/b0e2f9a37a)] - **test**: 添加 common.rootDir（cjihrig） [#7685](https://github.com/nodejs/node/pull/7685)
* \[[`c94f3a5784`](https://github.com/nodejs/node/commit/c94f3a5784)] - **test**: 处理测试中的 IPv6 localhost 问题（Rich Trott） [#7766](https://github.com/nodejs/node/pull/7766)
* \[[`b64828d8df`](https://github.com/nodejs/node/commit/b64828d8df)] - **test**: 接受 test-stdio-closed 的预期 AIX 结果（Rich Trott） [#8755](https://github.com/nodejs/node/pull/8755)
* \[[`3dbcc3d2d9`](https://github.com/nodejs/node/commit/3dbcc3d2d9)] - **test**: 修复不稳定的 test-\*-connect-address-family（Rich Trott） [#7605](https://github.com/nodejs/node/pull/7605)
* \[[`733233d3ea`](https://github.com/nodejs/node/commit/733233d3ea)] - **test**: 为 debugger 添加未捕获异常测试（Rich Trott） [#8087](https://github.com/nodejs/node/pull/8087)
* \[[`c9af24d2a7`](https://github.com/nodejs/node/commit/c9af24d2a7)] - **test**: 为 assert.notStrictEqual() 添加测试（Rich Trott） [#8091](https://github.com/nodejs/node/pull/8091)
* \[[`337d2dd381`](https://github.com/nodejs/node/commit/337d2dd381)] - **test**: 实现一致的括号风格（Rich Trott） [#8348](https://github.com/nodejs/node/pull/8348)
* \[[`77df523264`](https://github.com/nodejs/node/commit/77df523264)] - **test**: 排除 AIX 上的测试（Michael Dawson） [#8076](https://github.com/nodejs/node/pull/8076)
* \[[`50ae37e350`](https://github.com/nodejs/node/commit/50ae37e350)] - **test**: 为 tools/test.py 添加 --repeat 选项（Michael Dawson） [#6700](https://github.com/nodejs/node/pull/6700)
* \[[`ea72e9f143`](https://github.com/nodejs/node/commit/ea72e9f143)] - **test,doc**: 澄清 `buf.indexOf(num)` 的输入范围（Anna Henningsen） [#7611](https://github.com/nodejs/node/pull/7611)
* \[[`c841b5a6b9`](https://github.com/nodejs/node/commit/c841b5a6b9)] - **tls**: 使用前复制 Buffer 对象（Sakthipriyan Vairamani） [#8055](https://github.com/nodejs/node/pull/8055)
* \[[`6076293d6c`](https://github.com/nodejs/node/commit/6076293d6c)] - **tls_wrap**: 对新的 TLSWrap() 不要中止（Trevor Norris） [#6184](https://github.com/nodejs/node/pull/6184)
* \[[`6e5906c7f1`](https://github.com/nodejs/node/commit/6e5906c7f1)] - **tools**: gpg 指纹使用长格式（Myles Borins） [#9258](https://github.com/nodejs/node/pull/9258)
* \[[`7409c332b8`](https://github.com/nodejs/node/commit/7409c332b8)] - **tools**: 在发布前检查标签是否在 github 上（Rod Vagg） [#9142](https://github.com/nodejs/node/pull/9142)
* \[[`b632badda2`](https://github.com/nodejs/node/commit/b632badda2)] - **tools**: 为发布生成分离的 SHASUM .sig 文件（Rod Vagg） [#9071](https://github.com/nodejs/node/pull/9071)
* \[[`5867ffe27e`](https://github.com/nodejs/node/commit/5867ffe27e)] - **tools**: 为 SHASUM 明确设置摘要算法为 256（Rod Vagg） [#9071](https://github.com/nodejs/node/pull/9071)
* \[[`bdfa3b388b`](https://github.com/nodejs/node/commit/bdfa3b388b)] - **tools**: 在 license2rtf.js 中优先使用 === 而非 ==（Rich Trott）
* \[[`d7e3edc744`](https://github.com/nodejs/node/commit/d7e3edc744)] - **tools**: 在 .remarkrc 中添加 remark-lint 配置（Сковорода Никита Андреевич） [#7729](https://github.com/nodejs/node/pull/7729)
* \[[`afbfbc04c9`](https://github.com/nodejs/node/commit/afbfbc04c9)] - **tools**: 将 .vscode 文件夹添加到 .gitignore（Josh Gavant） [#7967](https://github.com/nodejs/node/pull/7967)
* \[[`3f4a5fe61e`](https://github.com/nodejs/node/commit/3f4a5fe61e)] - **tools**: 提高 lint 覆盖率（Rich Trott） [#7647](https://github.com/nodejs/node/pull/7647)
* \[[`d1a50b3ed2`](https://github.com/nodejs/node/commit/d1a50b3ed2)] - **tools**: 通过 lint 强制执行 JS 花括号风格（Rich Trott） [#8348](https://github.com/nodejs/node/pull/8348)
* \[[`76b8d81f38`](https://github.com/nodejs/node/commit/76b8d81f38)] - **tools,test**: 在测试崩溃时显示信号代码（Santiago Gimeno） [#7859](https://github.com/nodejs/node/pull/7859)
* \[[`389a6d2cc2`](https://github.com/nodejs/node/commit/389a6d2cc2)] - **url**: 修复处理点号循环中的越界一错误（Luigi Pinca） [#8420](https://github.com/nodejs/node/pull/8420)
* \[[`be9d9bd7c3`](https://github.com/nodejs/node/commit/be9d9bd7c3)] - **url**: 修复 url.resolveObject 中不一致的端口（Ilkka Myller） [#8214](https://github.com/nodejs/node/pull/8214)
* \[[`96cfa926bd`](https://github.com/nodejs/node/commit/96cfa926bd)] - **url**: `url.format()` 会对 `search` 中所有的 `#` 进行编码（Ilkka Myller） [#8072](https://github.com/nodejs/node/pull/8072)
* \[[`f7796f23e3`](https://github.com/nodejs/node/commit/f7796f23e3)] - **util**: 像其他原始类型一样检查装箱的 symbol（Anna Henningsen） [#7641](https://github.com/nodejs/node/pull/7641)
* \[[`410e083d7c`](https://github.com/nodejs/node/commit/410e083d7c)] - **win,build**: 将 release_urlbase 传递给 configure（João Reis） [#8430](https://github.com/nodejs/node/pull/8430)
* \[[`26e73740e9`](https://github.com/nodejs/node/commit/26e73740e9)] - **win,build**: 在 addons 构建失败时退出（João Reis） [#8412](https://github.com/nodejs/node/pull/8412)
* \[[`30e751f38b`](https://github.com/nodejs/node/commit/30e751f38b)] - **win,build**: 在不需要时跳过查找 VS（João Reis） [#8412](https://github.com/nodejs/node/pull/8412)
* \[[`b3090f8e64`](https://github.com/nodejs/node/commit/b3090f8e64)] - **win,build**: 在 vcbuild 中遇到无效选项时失败（João Reis） [#8412](https://github.com/nodejs/node/pull/8412)
* \[[`1b5213bfc3`](https://github.com/nodejs/node/commit/1b5213bfc3)] - **win,msi**: 修复翻译的包含（João Reis） [#7798](https://github.com/nodejs/node/pull/7798)
* \[[`e8be413d0d`](https://github.com/nodejs/node/commit/e8be413d0d)] - **win,msi**: 为安装程序添加简体中文翻译（Minqi Pan） [#2569](https://github.com/nodejs/node/pull/2569)
* \[[`99f85b8340`](https://github.com/nodejs/node/commit/99f85b8340)] - **win,msi**: 添加意大利语翻译（Matteo Collina） [#4647](https://github.com/nodejs/node/pull/4647)

<a id="4.6.1"></a>

## 2016-10-18，版本 4.6.1 'Argon' (LTS)，@rvagg

这是一个安全更新。所有 Node.js 用户都应查阅位于 <https://nodejs.org/en/blog/vulnerability/october-2016-security-releases/> 的安全更新摘要，以了解已修补漏洞的详细信息。

### 重要变更

* **c-ares**：修复单字节缓冲区覆盖，CVE-2016-5180，更多信息见 <https://c-ares.haxx.se/adv_20160929.html>（Daniel Stenberg）

### 提交

* \[[`f3c63e7ccf`](https://github.com/nodejs/node/commit/f3c63e7ccf)] - **deps**：避免单字节缓冲区覆盖（Daniel Stenberg） [#8849](https://github.com/nodejs/node/pull/8849)
* \[[`5a0daa6c2f`](https://github.com/nodejs/node/commit/5a0daa6c2f)] - **win,build**：签名时尝试多个时间服务器（Rod Vagg） [#9155](https://github.com/nodejs/node/pull/9155)

<a id="4.6.0"></a>

## 2016-09-27，版本 4.6.0 'Argon' (LTS)，@rvagg

这是一个安全更新。所有 Node.js 用户都应查阅位于 <https://nodejs.org/en/blog/vulnerability/september-2016-security-releases/> 的安全更新摘要，以了解已修补漏洞的详细信息。

### 重要变更

Semver 次版本：

* **openssl**：
  * 升级到 1.0.2i，修复了多个影响 Node.js 的缺陷：CVE-2016-6304（“OCSP Status Request 扩展无限内存增长”，高危）、CVE-2016-2183、CVE-2016-6303、CVE-2016-2178 和 CVE-2016-6306。（Shigeki Ohtsu） [#8714](https://github.com/nodejs/node/pull/8714)
  * 升级到 1.0.2j，修复了 1.0.2i 中包含的一个缺陷，该缺陷会在使用 CRL 时导致崩溃，CVE-2016-7052。（Shigeki Ohtsu） [#8786](https://github.com/nodejs/node/pull/8786)
  * 移除对加载动态第三方引擎模块的支持。攻击者可能通过伪装成动态引擎模块之一，隐藏恶意代码并在运行时注入 Node.js。最初由 Ahmed Zaki（Skype）报告。（Ben Noordhuis）[nodejs/node-private#70](https://github.com/nodejs/node-private/pull/70)
* **http**：CVE-2016-5325 - 正确验证 `ServerResponse#writeHead()` 中 `reason` 参数允许的字符。修复了一个可能的响应拆分攻击向量。此更改引入了在配置 HTTP 响应时可能抛出 `throw` 的新情况，用户本就应在此处使用 try/catch。最初由 Evan Lucas 和 Romain Gaucher 独立报告。（Evan Lucas）[nodejs/node-private#46](https://github.com/nodejs/node-private/pull/46)

Semver 补丁：

* **buffer**：当使用 `Buffer.concat()` 创建新 `Buffer` 对象且提供的 `totalLength` 参数超过被拼接的原始 `Buffer` 对象总长度时，将超出部分字节用零填充。（Сковорода Никита Андреевич）[nodejs/node-private#65](https://github.com/nodejs/node-private/pull/65)
* **tls**：CVE-2016-7099 - 修复无效通配符证书验证检查问题；由于对通配符字符串中的 `*.` 验证不当，TLS 服务器可能会为其主机名提供一个无效的通配符证书。最初由 Alexander Minozhenko 和 James Bunton（Atlassian）报告。（Ben Noordhuis）[nodejs/node-private#63](https://github.com/nodejs/node-private/pull/63)

### 提交

* \[[`93b10fbec2`](https://github.com/nodejs/node/commit/93b10fbec2)] - **buffer**：在 .concat() 中将未初始化的字节用零填充（Сковорода Никита Андреевич） [nodejs/node-private#65](https://github.com/nodejs/node-private/pull/65)
* \[[`c214e8847d`](https://github.com/nodejs/node/commit/c214e8847d)] - **crypto**：不构建硬件引擎（Ben Noordhuis）[nodejs/node-private#70](https://github.com/nodejs/node-private/pull/70)
* \[[`af9dda152c`](https://github.com/nodejs/node/commit/af9dda152c)] - **deps**：为 openssl s_client 添加 -no\_rand\_screen（Shigeki Ohtsu）[nodejs/node#1836](https://github.com/nodejs/node/pull/1836)
* \[[`6bb9749c33`](https://github.com/nodejs/node/commit/6bb9749c33)] - **deps**：修复 x86\_win32 中 openssl 的 asm 构建错误（Shigeki Ohtsu）[nodejs/node#1389](https://github.com/nodejs/node/pull/1389)
* \[[`5176a8ad57`](https://github.com/nodejs/node/commit/5176a8ad57)] - **deps**：修复 ia32 win32 上的 openssl 汇编错误（Fedor Indutny）[nodejs/node#1389](https://github.com/nodejs/node/pull/1389)
* \[[`aa9ed60a51`](https://github.com/nodejs/node/commit/aa9ed60a51)] - **deps**：将所有 openssl 头文件复制到 include 目录（Shigeki Ohtsu） [#8786](https://github.com/nodejs/node/pull/8786)
* \[[`0c74e2ad35`](https://github.com/nodejs/node/commit/0c74e2ad35)] - **deps**：将 openssl 源码升级到 1.0.2j（Shigeki Ohtsu） [#8786](https://github.com/nodejs/node/pull/8786)
* \[[`8f3d6760cf`](https://github.com/nodejs/node/commit/8f3d6760cf)] - **deps**：更新 openssl asm 和 asm\_obsolete 文件（Shigeki Ohtsu） [#8714](https://github.com/nodejs/node/pull/8714)
* \[[`e8f29e2ba8`](https://github.com/nodejs/node/commit/e8f29e2ba8)] - **deps**：为 openssl s_client 添加 -no\_rand\_screen（Shigeki Ohtsu）[nodejs/node#1836](https://github.com/nodejs/node/pull/1836)
* \[[`01cf5b0ae7`](https://github.com/nodejs/node/commit/01cf5b0ae7)] - **deps**：修复 x86\_win32 中 openssl 的 asm 构建错误（Shigeki Ohtsu）[nodejs/node#1389](https://github.com/nodejs/node/pull/1389)
* \[[`19ae4e8ae1`](https://github.com/nodejs/node/commit/19ae4e8ae1)] - **deps**：修复 ia32 win32 上的 openssl 汇编错误（Fedor Indutny）[nodejs/node#1389](https://github.com/nodejs/node/pull/1389)
* \[[`cbed5e64be`](https://github.com/nodejs/node/commit/cbed5e64be)] - **deps**：将所有 openssl 头文件复制到 include 目录（Shigeki Ohtsu） [#8714](https://github.com/nodejs/node/pull/8714)
* \[[`e7fdace18f`](https://github.com/nodejs/node/commit/e7fdace18f)] - **deps**：将 openssl 源码升级到 1.0.2i（Shigeki Ohtsu） [#8714](https://github.com/nodejs/node/pull/8714)
* \[[`b5c57ff772`](https://github.com/nodejs/node/commit/b5c57ff772)] - **http**：检查 writeHead 中的 reason 字符（Evan Lucas）[nodejs/node-private#46](https://github.com/nodejs/node-private/pull/46)
* \[[`3ff82deb2c`](https://github.com/nodejs/node/commit/3ff82deb2c)] - **lib**：使 tls.checkServerIdentity() 更严格（Ben Noordhuis）[nodejs/node-private#63](https://github.com/nodejs/node-private/pull/63)
* \[[`7c696e201a`](https://github.com/nodejs/node/commit/7c696e201a)] - **openssl**：修复 win32 上应用程序中的按键要求（Shigeki Ohtsu）[nodejs/node#1389](https://github.com/nodejs/node/pull/1389)
* \[[`44e5776c0f`](https://github.com/nodejs/node/commit/44e5776c0f)] - **openssl**：修复 win32 上应用程序中的按键要求（Shigeki Ohtsu）[nodejs/node#1389](https://github.com/nodejs/node/pull/1389)
* \[[`c7a601c090`](https://github.com/nodejs/node/commit/c7a601c090)] - **test**：移除 openssl 选项 -no\_<prot>（Shigeki Ohtsu） [#8714](https://github.com/nodejs/node/pull/8714)

<a id="4.5.0"></a>

## 2016-08-15，版本 4.5.0 'Argon' (LTS)，@thealphanerd

### 重要变更

Semver 次版本：

* **buffer**：
  * 将新的 buffer 构造函数 API 回移植到 v4.x（Сковорода Никита Андреевич） [#7562](https://github.com/nodejs/node/pull/7562)
  * 回移植 --zero-fill-buffers 命令行选项（James M Snell） [#5745](https://github.com/nodejs/node/pull/5745)
* **build**：
  * 添加 Intel Vtune 性能分析支持（Chunyang Dai） [#5527](https://github.com/nodejs/node/pull/5527)
* **repl**：
  * 复制制表符不应触发补全（Eugene Obrezkov） [#5958](https://github.com/nodejs/node/pull/5958)
* **src**：
  * 添加 node::FreeEnvironment 公共 API（Cheng Zhao） [#3098](https://github.com/nodejs/node/pull/3098)
* **test**：
  * 从 node 代码树运行 v8 测试（Bryon Leung） [#4704](https://github.com/nodejs/node/pull/4704)
* **V8**：
  * 添加 post mortem 数据，以改进对象检查和函数上下文变量检查（Fedor Indutny） [#3779](https://github.com/nodejs/node/pull/3779)

Semver 补丁：

* **buffer**：
  * 忽略负的分配长度（Anna Henningsen） [#7562](https://github.com/nodejs/node/pull/7562)
* **crypto**：
  * 更新根证书（Ben Noordhuis） [#7363](https://github.com/nodejs/node/pull/7363)
* **libuv**：
  * 将 libuv 升级到 1.9.1（Saúl Ibarra Corretgé） [#6796](https://github.com/nodejs/node/pull/6796)
  * 将 libuv 升级到 1.9.0（Saúl Ibarra Corretgé） [#5994](https://github.com/nodejs/node/pull/5994)
* **npm**：
  * 升级到 2.15.9（Kat Marchán） [#7692](https://github.com/nodejs/node/pull/7692)

### 提交

* \[[`a4888926a2`](https://github.com/nodejs/node/commit/a4888926a2)] - **assert**: 移除不必要的参数特殊处理 (Rich Trott) [#7413](https://github.com/nodejs/node/pull/7413)
* \[[`39e24742f8`](https://github.com/nodejs/node/commit/39e24742f8)] - **assert**: 允许循环引用 (Rich Trott) [#6432](https://github.com/nodejs/node/pull/6432)
* \[[`271927f29e`](https://github.com/nodejs/node/commit/271927f29e)] - **async_wrap**: 将 uid 作为 double 传给 JS (Trevor Norris) [#7096](https://github.com/nodejs/node/pull/7096)
* \[[`747f107188`](https://github.com/nodejs/node/commit/747f107188)] - **async_wrap**: 不要因回调异常而中止 (Trevor Norris) [#5756](https://github.com/nodejs/node/pull/5756)
* \[[`c06e2b07b6`](https://github.com/nodejs/node/commit/c06e2b07b6)] - **async_wrap**: 如果拦截到异常则通知 post (Trevor Norris) [#5756](https://github.com/nodejs/node/pull/5756)
* \[[`0642a146b3`](https://github.com/nodejs/node/commit/0642a146b3)] - **async_wrap**: setupHooks 现在接受对象 (Trevor Norris) [#5756](https://github.com/nodejs/node/pull/5756)
* \[[`75ecf8eb07`](https://github.com/nodejs/node/commit/75ecf8eb07)] - **async_wrap**: 在 init hook 中添加 parent uid (Andreas Madsen) [#4600](https://github.com/nodejs/node/pull/4600)
* \[[`e10eebffa5`](https://github.com/nodejs/node/commit/e10eebffa5)] - **async_wrap**: 使 uid 成为 init 中的第一个参数 (Andreas Madsen) [#4600](https://github.com/nodejs/node/pull/4600)
* \[[`13d465bcf6`](https://github.com/nodejs/node/commit/13d465bcf6)] - **async_wrap**: 为所有 asyncWrap hooks 添加 uid (Andreas Madsen) [#4600](https://github.com/nodejs/node/pull/4600)
* \[[`046d651118`](https://github.com/nodejs/node/commit/046d651118)] - **benchmark**: 修复 win 上的 child-process-exec-stdout (Bartosz Sosnowski) [#7178](https://github.com/nodejs/node/pull/7178)
* \[[`4b464ce4bf`](https://github.com/nodejs/node/commit/4b464ce4bf)] - **benchmark**: 移除未使用的变量 (Rich Trott) [#7600](https://github.com/nodejs/node/pull/7600)
* \[[`b95e5d7948`](https://github.com/nodejs/node/commit/b95e5d7948)] - **benchmark**: 为 url.format() 添加基准测试 (Rich Trott) [#7250](https://github.com/nodejs/node/pull/7250)
* \[[`1bd62c7c34`](https://github.com/nodejs/node/commit/1bd62c7c34)] - **benchmark**: 为 Buffer.concat 添加基准测试 (Anna Henningsen) [#7054](https://github.com/nodejs/node/pull/7054)
* \[[`08cd81b050`](https://github.com/nodejs/node/commit/08cd81b050)] - **benchmark**: 添加 util.format 基准测试 (Evan Lucas) [#5360](https://github.com/nodejs/node/pull/5360)
* \[[`7dbb0d0084`](https://github.com/nodejs/node/commit/7dbb0d0084)] - **buffer**: 修复 dataview-set 基准测试 (Ingvar Stepanyan) [#6922](https://github.com/nodejs/node/pull/6922)
* \[[`200429e9e1`](https://github.com/nodejs/node/commit/200429e9e1)] - **buffer**: 忽略负的分配长度 (Anna Henningsen) [#7562](https://github.com/nodejs/node/pull/7562)
* \[[`709048134c`](https://github.com/nodejs/node/commit/709048134c)] - **(SEMVER-MINOR)** **buffer**: 将新的 buffer 构造函数 API 回移植到 v4.x (Сковорода Никита Андреевич) [#7562](https://github.com/nodejs/node/pull/7562)
* \[[`fb03e57de2`](https://github.com/nodejs/node/commit/fb03e57de2)] - **(SEMVER-MINOR)** **buffer**: 回移植 --zero-fill-buffers 命令行选项 (James M Snell) [#5745](https://github.com/nodejs/node/pull/5745)
* \[[`236491e698`](https://github.com/nodejs/node/commit/236491e698)] - **build**: 当 node-gyp 变更时更新 build-addons (Lance Ball) [#6787](https://github.com/nodejs/node/pull/6787)
* \[[`8a7c5fdbd2`](https://github.com/nodejs/node/commit/8a7c5fdbd2)] - **build**: 为文档中的版本信息添加 REPLACEME 标记 (Ben Noordhuis) [#6864](https://github.com/nodejs/node/pull/6864)
* \[[`da1e13fde7`](https://github.com/nodejs/node/commit/da1e13fde7)] - **build**: 添加 Make `doc-only` 目标 (Jesse McCarthy) [#3888](https://github.com/nodejs/node/pull/3888)
* \[[`0db3aa9afa`](https://github.com/nodejs/node/commit/0db3aa9afa)] - **build**: 从 CPPLINT_FILES 中移除未使用的文件 (Ben Noordhuis) [#7462](https://github.com/nodejs/node/pull/7462)
* \[[`5290c9d38c`](https://github.com/nodejs/node/commit/5290c9d38c)] - **build**: 在 Makefile 中构建 V8 时使用 BUILDTYPE (Michaël Zasso) [#7482](https://github.com/nodejs/node/pull/7482)
* \[[`79bd39c202`](https://github.com/nodejs/node/commit/79bd39c202)] - **build**: 在 Makefile 的 test-v8* 中添加 v8 依赖 (Michaël Zasso) [#7482](https://github.com/nodejs/node/pull/7482)
* \[[`65b75b51a6`](https://github.com/nodejs/node/commit/65b75b51a6)] - **build**: 修复在 python 2.6 下的 configure (Ben Noordhuis) [#6874](https://github.com/nodejs/node/pull/6874)
* \[[`8513232c82`](https://github.com/nodejs/node/commit/8513232c82)] - **build**: 在 Makefile 中拆分 CI 规则 (João Reis) [#7317](https://github.com/nodejs/node/pull/7317)
* \[[`13d0e463b0`](https://github.com/nodejs/node/commit/13d0e463b0)] - **build**: 启用 linuxOne 的编译 (Michael Dawson) [#5941](https://github.com/nodejs/node/pull/5941)
* \[[`834ea2c5c0`](https://github.com/nodejs/node/commit/834ea2c5c0)] - **(SEMVER-MINOR)** **build,src**: 添加 Intel Vtune 性能分析支持 (Chunyang Dai) [#5527](https://github.com/nodejs/node/pull/5527)
* \[[`ea20796e9d`](https://github.com/nodejs/node/commit/ea20796e9d)] - **build,test**: 修复 build-addons 依赖链 (Ben Noordhuis) [#6652](https://github.com/nodejs/node/pull/6652)
* \[[`6a08535dd1`](https://github.com/nodejs/node/commit/6a08535dd1)] - **child_process**: 保留参数类型 (Rich Trott) [#7391](https://github.com/nodejs/node/pull/7391)
* \[[`fd05b0b289`](https://github.com/nodejs/node/commit/fd05b0b289)] - _**Revert**_ "**child_process**: 以字节为单位测量缓冲区长度" (Rich Trott) [#7391](https://github.com/nodejs/node/pull/7391)
* \[[`8eb18e4289`](https://github.com/nodejs/node/commit/8eb18e4289)] - **child_process**: 以字节为单位测量缓冲区长度 (Rich Trott) [#6764](https://github.com/nodejs/node/pull/6764)
* \[[`4ee863d956`](https://github.com/nodejs/node/commit/4ee863d956)] - **child_process**: 在 spawnSync 中允许 buffer 编码 (cjihrig) [#6939](https://github.com/nodejs/node/pull/6939)
* \[[`0b8124f205`](https://github.com/nodejs/node/commit/0b8124f205)] - **child_process**: 在 next tick 发送 IPC 消息 (cjihrig) [#6909](https://github.com/nodejs/node/pull/6909)
* \[[`20d3378969`](https://github.com/nodejs/node/commit/20d3378969)] - **cluster**: 在 close 时重置句柄索引 (Santiago Gimeno) [#6981](https://github.com/nodejs/node/pull/6981)
* \[[`09349a8b92`](https://github.com/nodejs/node/commit/09349a8b92)] - **cluster**: 如果没有 IPC 通道则不要发送消息 (Santiago Gimeno) [#7132](https://github.com/nodejs/node/pull/7132)
* \[[`6ece2a0322`](https://github.com/nodejs/node/commit/6ece2a0322)] - **cluster**: 一致地重写调试端口 (cjihrig) [#7050](https://github.com/nodejs/node/pull/7050)
* \[[`8cba3b2f72`](https://github.com/nodejs/node/commit/8cba3b2f72)] - **cluster**: 防止未定义的消息处理器 (cjihrig) [#6902](https://github.com/nodejs/node/pull/6902)
* \[[`f152adf5b7`](https://github.com/nodejs/node/commit/f152adf5b7)] - **cluster**: 在 disconnect() 时关闭无所有者的句柄 (cjihrig) [#6909](https://github.com/nodejs/node/pull/6909)
* \[[`65624440bf`](https://github.com/nodejs/node/commit/65624440bf)] - **crypto**: 允许 GCM 密码算法拥有更长的 IV 长度 (Michael Wain) [#6376](https://github.com/nodejs/node/pull/6376)
* \[[`1e0cede3a6`](https://github.com/nodejs/node/commit/1e0cede3a6)] - **crypto**: 更新根证书 (Ben Noordhuis) [#7363](https://github.com/nodejs/node/pull/7363)
* \[[`3be5cdcd43`](https://github.com/nodejs/node/commit/3be5cdcd43)] - **debugger**: 移除过时的 setTimeout (Rich Trott) [#7154](https://github.com/nodejs/node/pull/7154)
* \[[`74a5e911c0`](https://github.com/nodejs/node/commit/74a5e911c0)] - **debugger**: 将 --debug-port= 传递给被调试进程 (Ben Noordhuis) [#3470](https://github.com/nodejs/node/pull/3470)
* \[[`af4940d63b`](https://github.com/nodejs/node/commit/af4940d63b)] - **deps**: 将 LTS 中的 npm 升级到 2.15.9 (Kat Marchán) [#7692](https://github.com/nodejs/node/pull/7692)
* \[[`da7b74b9bc`](https://github.com/nodejs/node/commit/da7b74b9bc)] - **deps**: 将 libuv 升级到 1.9.1 (Saúl Ibarra Corretgé) [#6796](https://github.com/nodejs/node/pull/6796)
* \[[`94eb980ca5`](https://github.com/nodejs/node/commit/94eb980ca5)] - **deps**: 将 libuv 升级到 1.9.0 (Saúl Ibarra Corretgé) [#5994](https://github.com/nodejs/node/pull/5994)
* \[[`4107b5d200`](https://github.com/nodejs/node/commit/4107b5d200)] - **deps**: 从 V8 回移植 22c5e46 (Julien Gilli) [#7584](https://github.com/nodejs/node/pull/7584)
* \[[`e06ab64705`](https://github.com/nodejs/node/commit/e06ab64705)] - **deps**: 更新到 http-parser 2.7.0 (Fedor Indutny) [#6279](https://github.com/nodejs/node/pull/6279)
* \[[`1164f542db`](https://github.com/nodejs/node/commit/1164f542db)] - **deps**: 修复 gc 期间的段错误 (Ali Ijaz Sheikh) [#7303](https://github.com/nodejs/node/pull/7303)
* \[[`d9e9d9fb11`](https://github.com/nodejs/node/commit/d9e9d9fb11)] - **deps**: 从上游 V8 回移植 e7cc609 (Ali Ijaz Sheikh) [#7303](https://github.com/nodejs/node/pull/7303)
* \[[`9809992436`](https://github.com/nodejs/node/commit/9809992436)] - **(SEMVER-MINOR)** **deps**: 从 V8 上游回移植 9c927d0f01 (Myles Borins) [#7451](https://github.com/nodejs/node/pull/7451)
* \[[`da9595fc47`](https://github.com/nodejs/node/commit/da9595fc47)] - **(SEMVER-MINOR)** **deps**: 从 v8 的上游挑选 68e89fb (Fedor Indutny) [#3779](https://github.com/nodejs/node/pull/3779)
* \[[`e9ff0f8fb2`](https://github.com/nodejs/node/commit/e9ff0f8fb2)] - **doc**: 使 doc-only -> 回退到用户二进制文件 (Robert Jefe Lindstaedt) [#6906](https://github.com/nodejs/node/pull/6906)
* \[[`b869cdb876`](https://github.com/nodejs/node/commit/b869cdb876)] - **doc**: 修复 addon 示例中的弃用警告 (Ben Noordhuis) [#6652](https://github.com/nodejs/node/pull/6652)
* \[[`ec25f38120`](https://github.com/nodejs/node/commit/ec25f38120)] - **doc**: 为 buffer 添加 `added:` 信息 (Anna Henningsen) [#6495](https://github.com/nodejs/node/pull/6495)
* \[[`1e86d16812`](https://github.com/nodejs/node/commit/1e86d16812)] - **doc**: buffer 不会通过带 socket 的 IPC 发送 (Tim Kuijsten) [#6951](https://github.com/nodejs/node/pull/6951)
* \[[`5c1d8e1f0f`](https://github.com/nodejs/node/commit/5c1d8e1f0f)] - **doc**: 为 http 添加 `added:` 信息 (Anna Henningsen) [#7392](https://github.com/nodejs/node/pull/7392)
* \[[`60c054bc11`](https://github.com/nodejs/node/commit/60c054bc11)] - **doc**: 为 IncomingMessage.destroy() 添加信息 (Rich Trott) [#7237](https://github.com/nodejs/node/pull/7237)
* \[[`1a5c025f32`](https://github.com/nodejs/node/commit/1a5c025f32)] - **doc**: 移除 process.md 中多余的反引号 (Anna Henningsen) [#7681](https://github.com/nodejs/node/pull/7681)
* \[[`fcb4e410e4`](https://github.com/nodejs/node/commit/fcb4e410e4)] - **doc**: 为 process 添加 `added:` 信息 (Bryan English) [#6589](https://github.com/nodejs/node/pull/6589)
* \[[`9b8565c42a`](https://github.com/nodejs/node/commit/9b8565c42a)] - **doc**: 为 tls 添加 `added:` 信息 (Italo A. Casas) [#7018](https://github.com/nodejs/node/pull/7018)
* \[[`fd4aa6c16a`](https://github.com/nodejs/node/commit/fd4aa6c16a)] - **doc**: 更正 fs.access 的 `added:` 信息 (Richard Lau) [#7299](https://github.com/nodejs/node/pull/7299)
* \[[`1e9d27cbcc`](https://github.com/nodejs/node/commit/1e9d27cbcc)] - **doc**: 为 fs 添加 `added:` 信息 (Anna Henningsen) [#6717](https://github.com/nodejs/node/pull/6717)
* \[[`2244a3c250`](https://github.com/nodejs/node/commit/2244a3c250)] - **doc**: 为 fs.ReadStream 和 fs.WriteStream 添加 'close' 事件 (Jenna Vuong) [#6499](https://github.com/nodejs/node/pull/6499)
* \[[`88f46b886a`](https://github.com/nodejs/node/commit/88f46b886a)] - **doc**: 为 timers 添加 `added:` 信息 (Anna Henningsen) [#7493](https://github.com/nodejs/node/pull/7493)
* \[[`a53253a232`](https://github.com/nodejs/node/commit/a53253a232)] - **doc**: 为 zlib 添加 `added:` 信息 (Anna Henningsen) [#6840](https://github.com/nodejs/node/pull/6840)
* \[[`7abfb6e8dc`](https://github.com/nodejs/node/commit/7abfb6e8dc)] - **doc**: 为 vm 添加 `added:` 信息 (Anna Henningsen) [#7011](https://github.com/nodejs/node/pull/7011)
* \[[`3e3471fb5f`](https://github.com/nodejs/node/commit/3e3471fb5f)] - **doc**: 为 v8 添加 `added:` 信息 (Rich Trott) [#6684](https://github.com/nodejs/node/pull/6684)
* \[[`1758f02ec1`](https://github.com/nodejs/node/commit/1758f02ec1)] - **doc**: 为 url 添加 `added:` 信息 (Bryan English) [#6593](https://github.com/nodejs/node/pull/6593)
* \[[`3c8f19fcdf`](https://github.com/nodejs/node/commit/3c8f19fcdf)] - **doc**: 为 `tty` 添加 `added:` 信息 (Rich Trott) [#6783](https://github.com/nodejs/node/pull/6783)
* \[[`5b50b1c255`](https://github.com/nodejs/node/commit/5b50b1c255)] - **doc**: 为 `string_decoder` 添加 `added:` 信息 (Rich Trott) [#6741](https://github.com/nodejs/node/pull/6741)
* \[[`4474e83b78`](https://github.com/nodejs/node/commit/4474e83b78)] - **doc**: 为 repl 添加 `added:` 信息 (Anna Henningsen) [#7256](https://github.com/nodejs/node/pull/7256)
* \[[`e6d7bfcbe7`](https://github.com/nodejs/node/commit/e6d7bfcbe7)] - **doc**: 为 readline 添加 `added:` 信息 (Julian Duque) [#6996](https://github.com/nodejs/node/pull/6996)
* \[[`eec0c635ee`](https://github.com/nodejs/node/commit/eec0c635ee)] - **doc**: 为 querystring 添加 `added:` 信息 (Bryan English) [#6593](https://github.com/nodejs/node/pull/6593)
* \[[`a870cdcd1f`](https://github.com/nodejs/node/commit/a870cdcd1f)] - **doc**: 为 punycode 添加 `added:` 信息 (Daniel Wang) [#6805](https://github.com/nodejs/node/pull/6805)
* \[[`f1a37ad749`](https://github.com/nodejs/node/commit/f1a37ad749)] - **doc**: 为 path 添加 `added:` 信息 (Julian Duque) [#6985](https://github.com/nodejs/node/pull/6985)
* \[[`8b53f4b27c`](https://github.com/nodejs/node/commit/8b53f4b27c)] - **doc**: 为 os 添加 `added:` 信息 (Bryan English) [#6609](https://github.com/nodejs/node/pull/6609)
* \[[`78d361b22b`](https://github.com/nodejs/node/commit/78d361b22b)] - **doc**: 为 net 添加 `added` 信息 (Italo A. Casas) [#7038](https://github.com/nodejs/node/pull/7038)
* \[[`b08ff33c01`](https://github.com/nodejs/node/commit/b08ff33c01)] - **doc**: 为 https 添加 `added:` 信息 (Anna Henningsen) [#7392](https://github.com/nodejs/node/pull/7392)
* \[[`1d99059bb1`](https://github.com/nodejs/node/commit/1d99059bb1)] - **doc**: 为 dns 添加 `added:` 信息 (Julian Duque) [#7021](https://github.com/nodejs/node/pull/7021)
* \[[`a0ca24b798`](https://github.com/nodejs/node/commit/a0ca24b798)] - **doc**: 为 console 添加 `added:` 信息 (Adrian Estrada) [#6995](https://github.com/nodejs/node/pull/6995)
* \[[`eb08c17a20`](https://github.com/nodejs/node/commit/eb08c17a20)] - **doc**: 为 cli.md 添加 `added: ` 数据 (Rich Trott) [#6960](https://github.com/nodejs/node/pull/6960)
* \[[`ec9038478f`](https://github.com/nodejs/node/commit/ec9038478f)] - **doc**: 为 child_process 添加 `added:` 信息 (Anna Henningsen) [#6927](https://github.com/nodejs/node/pull/6927)
* \[[`e52b2b07d7`](https://github.com/nodejs/node/commit/e52b2b07d7)] - **doc**: 为 assert 添加 `added:` 信息 (Rich Trott) [#6688](https://github.com/nodejs/node/pull/6688)
* \[[`75e4f74c54`](https://github.com/nodejs/node/commit/75e4f74c54)] - **doc**: 修复 cluster worker 的 'message' 事件 (cjihrig) [#7309](https://github.com/nodejs/node/pull/7309)
* \[[`de5e2357fc`](https://github.com/nodejs/node/commit/de5e2357fc)] - **doc**: dns.resolve 修复回调参数说明 (Quentin Headen) [#7532](https://github.com/nodejs/node/pull/7532)
* \[[`0f903bb722`](https://github.com/nodejs/node/commit/0f903bb722)] - **doc**: 添加 benchmark 的 who-to-CC 信息 (Rich Trott) [#7604](https://github.com/nodejs/node/pull/7604)
* \[[`700c6d9be8`](https://github.com/nodejs/node/commit/700c6d9be8)] - **doc**: 添加如何运行 linter 的信息。 (Diosney Sarmiento) [#7534](https://github.com/nodejs/node/pull/7534)
* \[[`537f33351e`](https://github.com/nodejs/node/commit/537f33351e)] - **doc**: 修复 http.md 中的轻微样式问题 (Rich Trott) [#7528](https://github.com/nodejs/node/pull/7528)
* \[[`33a08b0414`](https://github.com/nodejs/node/commit/33a08b0414)] - **doc**: 将 bartosz sosnowski 添加到协作者中 (Bartosz Sosnowski) [#7567](https://github.com/nodejs/node/pull/7567)
* \[[`186af29298`](https://github.com/nodejs/node/commit/186af29298)] - **doc**: 修复分离子进程 stdio 示例 (cjihrig) [#7540](https://github.com/nodejs/node/pull/7540)
* \[[`066cefb6de`](https://github.com/nodejs/node/commit/066cefb6de)] - **doc**: 改进 `zero`/`0` 的用法 (Rich Trott) [#7466](https://github.com/nodejs/node/pull/7466)
* \[[`6c94c67b73`](https://github.com/nodejs/node/commit/6c94c67b73)] - **doc**: 修复 crypto 文档中的 "sign.verify" 拼写错误。 (Ruslan Iusupov) [#7411](https://github.com/nodejs/node/pull/7411)
* \[[`35ee35cba2`](https://github.com/nodejs/node/commit/35ee35cba2)] - **doc**: 澄清 child_process stdout/stderr 类型 (sartrey) [#7361](https://github.com/nodejs/node/pull/7361)
* \[[`71ef71cff8`](https://github.com/nodejs/node/commit/71ef71cff8)] - **doc**: 添加 2016-06-15 的 CTC 会议记录 (Josh Gavant) [#7320](https://github.com/nodejs/node/pull/7320)
* \[[`13d60cab7c`](https://github.com/nodejs/node/commit/13d60cab7c)] - **doc**: 将 lance 添加到协作者中 (Lance Ball) [#7407](https://github.com/nodejs/node/pull/7407)
* \[[`9122b3b665`](https://github.com/nodejs/node/commit/9122b3b665)] - **doc**: 更新“issues 中应 cc 谁”的图表 (Jeremiah Senkpiel) [#6694](https://github.com/nodejs/node/pull/6694)
* \[[`ccb278d330`](https://github.com/nodejs/node/commit/ccb278d330)] - **doc**: 提到 http request 的 "aborted" 事件 (Kyle E. Mitchell) [#7270](https://github.com/nodejs/node/pull/7270)
* \[[`868af29f2b`](https://github.com/nodejs/node/commit/868af29f2b)] - **doc**: 将 RReverser 添加到协作者中 (Ingvar Stepanyan) [#7370](https://github.com/nodejs/node/pull/7370)
* \[[`f8fe474825`](https://github.com/nodejs/node/commit/f8fe474825)] - **doc**: 修复 AtExit hooks 部分中的一个小拼写错误 (Daniel Bevenius) [#7485](https://github.com/nodejs/node/pull/7485)
* \[[`4a7e333287`](https://github.com/nodejs/node/commit/4a7e333287)] - **doc**: 对 Content-Length 使用 `Buffer.byteLength` (kimown) [#7274](https://github.com/nodejs/node/pull/7274)
* \[[`85f70b36e4`](https://github.com/nodejs/node/commit/85f70b36e4)] - **doc**: 澄清 `0` 端口值的用法 (Rich Trott) [#7206](https://github.com/nodejs/node/pull/7206)
* \[[`57ba51ec46`](https://github.com/nodejs/node/commit/57ba51ec46)] - **doc**: 修复 IRC 链接 (Ilkka Myller) [#7210](https://github.com/nodejs/node/pull/7210)
* \[[`ef37a2e80f`](https://github.com/nodejs/node/commit/ef37a2e80f)] - **doc**: 在 GOVERNANCE.md 中添加内部链接 (Rich Trott) [#7279](https://github.com/nodejs/node/pull/7279)
* \[[`c9ef04a1b2`](https://github.com/nodejs/node/commit/c9ef04a1b2)] - **doc**: 修复 events 的拼写错误 (Greyson Parrelli) [#7329](https://github.com/nodejs/node/pull/7329)
* \[[`0013af61de`](https://github.com/nodejs/node/commit/0013af61de)] - **doc**: 修复 util.isSymbol 的标题层级 (James M Snell) [#7138](https://github.com/nodejs/node/pull/7138)
* \[[`96de3f8820`](https://github.com/nodejs/node/commit/96de3f8820)] - **doc**: 为 README.md 添加 CII Best Practices 徽章 (David A. Wheeler) [#6819](https://github.com/nodejs/node/pull/6819)
* \[[`146cba1f60`](https://github.com/nodejs/node/commit/146cba1f60)] - **doc**: 改进 debugger 文档的行文 (Rich Trott) [#7007](https://github.com/nodejs/node/pull/7007)
* \[[`694e34458b`](https://github.com/nodejs/node/commit/694e34458b)] - **doc**: 修复 WORKING_GROUPS.md 中的拼写错误 (Joao Andrade) [#7032](https://github.com/nodejs/node/pull/7032)
* \[[`fbdc16a8a4`](https://github.com/nodejs/node/commit/fbdc16a8a4)] - **doc**: 更新 onboarding 文档中的标签和 CI 信息 (Rich Trott) [#7006](https://github.com/nodejs/node/pull/7006)
* \[[`1c65f1e3f6`](https://github.com/nodejs/node/commit/1c65f1e3f6)] - **doc**: 添加 AIX 上 fswatch 使用内容的信息 (Michael Dawson) [#6837](https://github.com/nodejs/node/pull/6837)
* \[[`72e8ee570a`](https://github.com/nodejs/node/commit/72e8ee570a)] - **doc**: 改进 server.listen() 文档的行文 (Rich Trott) [#7000](https://github.com/nodejs/node/pull/7000)
* \[[`649d201d63`](https://github.com/nodejs/node/commit/649d201d63)] - **doc**: 改进 `server.address()` 文档文本 (Rich Trott) [#7001](https://github.com/nodejs/node/pull/7001)
* \[[`e2e85ced1d`](https://github.com/nodejs/node/commit/e2e85ced1d)] - **doc**: 澄清 CoC 中对性别化语言的使用 (Bryan Hughes) [#6973](https://github.com/nodejs/node/pull/6973)
* \[[`f395f6f5b2`](https://github.com/nodejs/node/commit/f395f6f5b2)] - **doc**: 将 yorkie 添加到协作者中 (Yazhong Liu) [#7004](https://github.com/nodejs/node/pull/7004)
* \[[`c5051ef643`](https://github.com/nodejs/node/commit/c5051ef643)] - **doc**: 将 firedfox 添加到协作者中 (Daniel Wang) [#6961](https://github.com/nodejs/node/pull/6961)
* \[[`2ef08323c6`](https://github.com/nodejs/node/commit/2ef08323c6)] - **doc**: 将 bmeck 添加到协作者中 (Bradley Meck) [#6962](https://github.com/nodejs/node/pull/6962)
* \[[`d1a0a146b3`](https://github.com/nodejs/node/commit/d1a0a146b3)] - **doc**: 添加 2016-05-04 的 CTC 会议记录 (Michael Dawson) [#6579](https://github.com/nodejs/node/pull/6579)
* \[[`0a85987899`](https://github.com/nodejs/node/commit/0a85987899)] - **doc**: 更新 Windows 的构建说明 (João Reis) [#7285](https://github.com/nodejs/node/pull/7285)
* \[[`629a76f9fb`](https://github.com/nodejs/node/commit/629a76f9fb)] - **doc**: 移除 cluster.setupMaster() 的误解 (cjihrig) [#7179](https://github.com/nodejs/node/pull/7179)
* \[[`5b807ac791`](https://github.com/nodejs/node/commit/5b807ac791)] - **doc**: 指定如何在提交日志中关联 issue (Luigi Pinca) [#7161](https://github.com/nodejs/node/pull/7161)
* \[[`350f4cf292`](https://github.com/nodejs/node/commit/350f4cf292)] - **doc**: server.listen 会在 unix 上截断 socket 路径 (Jean Regisser) [#6659](https://github.com/nodejs/node/pull/6659)
* \[[`7813af7f16`](https://github.com/nodejs/node/commit/7813af7f16)] - **doc**: 添加 resolveNaptr 和 naptr rrtype 文档 (Doug Wade) [#6586](https://github.com/nodejs/node/pull/6586)
* \[[`5380743208`](https://github.com/nodejs/node/commit/5380743208)] - **doc**: 记录 socket.destroyed (Tushar Mathur) [#6128](https://github.com/nodejs/node/pull/6128)
* \[[`f0edf87df1`](https://github.com/nodejs/node/commit/f0edf87df1)] - **doc**: 添加 vm 示例，能够 require 模块 (Robert Jefe Lindstaedt) [#5323](https://github.com/nodejs/node/pull/5323)
* \[[`9121e94e62`](https://github.com/nodejs/node/commit/9121e94e62)] - **doc**: 注明 process.config 可以并且将会被更改 (James M Snell) [#6266](https://github.com/nodejs/node/pull/6266)
* \[[`c237ac3d68`](https://github.com/nodejs/node/commit/c237ac3d68)] - **doc**: 使用 git mv 重命名为 .md (Robert Jefe Lindstaedt) [#4747](https://github.com/nodejs/node/pull/4747)
* \[[`6324723cc1`](https://github.com/nodejs/node/commit/6324723cc1)] - **doc,dgram**: 修复 addMembership 文档 (Santiago Gimeno) [#7244](https://github.com/nodejs/node/pull/7244)
* \[[`15bb0beab2`](https://github.com/nodejs/node/commit/15bb0beab2)] - **doc,test**: 添加 `How to write a Node.js test` 指南 (Santiago Gimeno) [#6984](https://github.com/nodejs/node/pull/6984)
* \[[`9d13337183`](https://github.com/nodejs/node/commit/9d13337183)] - **http**: 等待 prefinish/end 都完成以保持 keepalive (Fedor Indutny) [#7149](https://github.com/nodejs/node/pull/7149)
* \[[`ece428ea63`](https://github.com/nodejs/node/commit/ece428ea63)] - **http**: 修复 `maybeReadMore` 之后不再转储 (Fedor Indutny) [#7211](https://github.com/nodejs/node/pull/7211)
* \[[`07fd52e5aa`](https://github.com/nodejs/node/commit/07fd52e5aa)] - **http**: 跳过 CONNECT 响应的 body 和下一条消息 (Fedor Indutny) [#6279](https://github.com/nodejs/node/pull/6279)
* \[[`6f312b3a91`](https://github.com/nodejs/node/commit/6f312b3a91)] - **http_parser**: 使用 `MakeCallback` (Trevor Norris) [#5419](https://github.com/nodejs/node/pull/5419)
* \[[`373ffc5bad`](https://github.com/nodejs/node/commit/373ffc5bad)] - **installer**: 不安装 node_internals.h (Ben Noordhuis) [#6913](https://github.com/nodejs/node/pull/6913)
* \[[`5782ec2427`](https://github.com/nodejs/node/commit/5782ec2427)] - **module**: 不缓存未初始化的 builtin (Anna Henningsen) [#6907](https://github.com/nodejs/node/pull/6907)
* \[[`c8e9adb135`](https://github.com/nodejs/node/commit/c8e9adb135)] - **repl**: 修复已定义命令的 Tab 补全 (Prince J Wesley) [#7364](https://github.com/nodejs/node/pull/7364)
* \[[`a3fa5db5ca`](https://github.com/nodejs/node/commit/a3fa5db5ca)] - **(SEMVER-MINOR)** **repl**: 复制时的制表符不应触发补全 (Eugene Obrezkov) [#5958](https://github.com/nodejs/node/pull/5958)
* \[[`d86332799c`](https://github.com/nodejs/node/commit/d86332799c)] - **src**: 清理 string_search (Brian White) [#7174](https://github.com/nodejs/node/pull/7174)
* \[[`3eea55167d`](https://github.com/nodejs/node/commit/3eea55167d)] - **src**: 修复 WriteBuffers() 错误路径中的内存泄漏 (Ben Noordhuis) [#7374](https://github.com/nodejs/node/pull/7374)
* \[[`23797eb037`](https://github.com/nodejs/node/commit/23797eb037)] - **src**: 移除过时的 NOLINT 注释 (Ben Noordhuis) [#7462](https://github.com/nodejs/node/pull/7462)
* \[[`5aff60e832`](https://github.com/nodejs/node/commit/5aff60e832)] - **src**: 为 v8abbr.h 做 lint (Ben Noordhuis) [#7462](https://github.com/nodejs/node/pull/7462)
* \[[`42e7c9d266`](https://github.com/nodejs/node/commit/42e7c9d266)] - **src**: 为 node_lttng_tp.h 做 lint (Ben Noordhuis) [#7462](https://github.com/nodejs/node/pull/7462)
* \[[`27c2d25be6`](https://github.com/nodejs/node/commit/27c2d25be6)] - **src**: 为 node_win32_perfctr_provider.cc 做 lint (Ben Noordhuis) [#7462](https://github.com/nodejs/node/pull/7462)
* \[[`4f4d3e77ef`](https://github.com/nodejs/node/commit/4f4d3e77ef)] - **src**: 修复 whitespace/indent cpplint 警告 (Ben Noordhuis) [#7462](https://github.com/nodejs/node/pull/7462)
* \[[`066064d65f`](https://github.com/nodejs/node/commit/066064d65f)] - **src**: 修复 whitespace/blank_line cpplint 警告 (Ben Noordhuis) [#7462](https://github.com/nodejs/node/pull/7462)
* \[[`44cbe0356d`](https://github.com/nodejs/node/commit/44cbe0356d)] - **src**: 修复 runtime/references cpplint 警告 (Ben Noordhuis) [#7462](https://github.com/nodejs/node/pull/7462)
* \[[`f530a36c65`](https://github.com/nodejs/node/commit/f530a36c65)] - **src**: 修复 runtime/int cpplint 警告 (Ben Noordhuis) [#7462](https://github.com/nodejs/node/pull/7462)
* \[[`d6595adcdb`](https://github.com/nodejs/node/commit/d6595adcdb)] - **src**: 修复 runtime/indentation_namespace 警告 (Ben Noordhuis) [#7462](https://github.com/nodejs/node/pull/7462)
* \[[`68db091aba`](https://github.com/nodejs/node/commit/68db091aba)] - **src**: 修复 readability/nolint cpplint 警告 (Ben Noordhuis) [#7462](https://github.com/nodejs/node/pull/7462)
* \[[`4748bed736`](https://github.com/nodejs/node/commit/4748bed736)] - **src**: 修复 readability/namespace cpplint 警告 (Ben Noordhuis) [#7462](https://github.com/nodejs/node/pull/7462)
* \[[`785211702a`](https://github.com/nodejs/node/commit/785211702a)] - **src**: 修复 readability/inheritance cpplint 警告 (Ben Noordhuis) [#7462](https://github.com/nodejs/node/pull/7462)
* \[[`c90ae7fb72`](https://github.com/nodejs/node/commit/c90ae7fb72)] - **src**: 修复 readability/constructors cpplint 警告 (Ben Noordhuis) [#7462](https://github.com/nodejs/node/pull/7462)
* \[[`16f2497994`](https://github.com/nodejs/node/commit/16f2497994)] - **src**: 修复 readability/braces cpplint 警告 (Ben Noordhuis) [#7462](https://github.com/nodejs/node/pull/7462)
* \[[`c8f78a2682`](https://github.com/nodejs/node/commit/c8f78a2682)] - **src**: 修复 build/header_guard cpplint 警告 (Ben Noordhuis) [#7462](https://github.com/nodejs/node/pull/7462)
* \[[`ccc701e1d5`](https://github.com/nodejs/node/commit/ccc701e1d5)] - **src**: 修复 build/c++tr1 cpplint 警告 (Ben Noordhuis) [#7462](https://github.com/nodejs/node/pull/7462)
* \[[`dda81b44b0`](https://github.com/nodejs/node/commit/dda81b44b0)] - **src**: 统一 Utf8Value 等的实现 (Anna Henningsen) [#6357](https://github.com/nodejs/node/pull/6357)
* \[[`db2b23f06f`](https://github.com/nodejs/node/commit/db2b23f06f)] - **src**: 修复 SIGUSR1 处理器中的偶发死锁 (Ben Noordhuis) [#5904](https://github.com/nodejs/node/pull/5904)
* \[[`53a67ed6d7`](https://github.com/nodejs/node/commit/53a67ed6d7)] - **src**: 修复 uid/gid 检查中的错误逻辑 (Ben Noordhuis) [#7374](https://github.com/nodejs/node/pull/7374)
* \[[`e6a27a70d8`](https://github.com/nodejs/node/commit/e6a27a70d8)] - **src**: 修复 zlib bindings 中的 use-after-return (Ben Noordhuis) [#7374](https://github.com/nodejs/node/pull/7374)
* \[[`61de6e9b47`](https://github.com/nodejs/node/commit/61de6e9b47)] - **src**: 移除已弃用的 HMAC_Init，改用 HMAC_Init_ex (Ben Noordhuis) [#7374](https://github.com/nodejs/node/pull/7374)
* \[[`7305e7b9d2`](https://github.com/nodejs/node/commit/7305e7b9d2)] - **src**: 移除重复的 HMAC_Init 调用 (Ben Noordhuis) [#7374](https://github.com/nodejs/node/pull/7374)
* \[[`38baf6a0b7`](https://github.com/nodejs/node/commit/38baf6a0b7)] - **src**: 移除未使用的 md_ 数据成员 (Ben Noordhuis) [#7374](https://github.com/nodejs/node/pull/7374)
* \[[`e103044b68`](https://github.com/nodejs/node/commit/e103044b68)] - **src**: 移除未使用的数据成员 write_queue_size_ (Ben Noordhuis) [#7374](https://github.com/nodejs/node/pull/7374)
* \[[`67937bca0a`](https://github.com/nodejs/node/commit/67937bca0a)] - **src**: 防止 fs watcher 被启动两次 (Ben Noordhuis) [#7374](https://github.com/nodejs/node/pull/7374)
* \[[`c03bd57ac6`](https://github.com/nodejs/node/commit/c03bd57ac6)] - **src**: 检查 uv_async_init() 的返回值 (Ben Noordhuis) [#7374](https://github.com/nodejs/node/pull/7374)
* \[[`2b0dce5a5b`](https://github.com/nodejs/node/commit/2b0dce5a5b)] - **src**: 不要使用对区域设置敏感的 strcasecmp() (Ben Noordhuis) [#6582](https://github.com/nodejs/node/pull/6582)
* \[[`9c31c738fc`](https://github.com/nodejs/node/commit/9c31c738fc)] - **src**: 移除未使用的 #include 语句 (Ben Noordhuis) [#6582](https://github.com/nodejs/node/pull/6582)
* \[[`426aa0a5e8`](https://github.com/nodejs/node/commit/426aa0a5e8)] - **src**: 修复 Windows 上 `--eval` 的段错误 (Bryce Simonds) [#6938](https://github.com/nodejs/node/pull/6938)
* \[[`b21d145c2a`](https://github.com/nodejs/node/commit/b21d145c2a)] - **(SEMVER-MINOR)** **src**: 添加 node::FreeEnvironment 公共 API (Cheng Zhao) [#3098](https://github.com/nodejs/node/pull/3098)
* \[[`b9136c0c03`](https://github.com/nodejs/node/commit/b9136c0c03)] - **src**: 添加 process.binding('config') (James M Snell) [#6266](https://github.com/nodejs/node/pull/6266)
* \[[`c3d87eee49`](https://github.com/nodejs/node/commit/c3d87eee49)] - **src**: 重写命令并添加三元表达式 (Trevor Norris) [#5756](https://github.com/nodejs/node/pull/5756)
* \[[`68f391bf3b`](https://github.com/nodejs/node/commit/68f391bf3b)] - **src**: 移除不必要的检查 (Brian White) [#5233](https://github.com/nodejs/node/pull/5233)
* \[[`981bbcd925`](https://github.com/nodejs/node/commit/981bbcd925)] - **src**: 在 MakeCallback 中移除 TryCatch (Trevor Norris) [#4507](https://github.com/nodejs/node/pull/4507)
* \[[`48b7b71352`](https://github.com/nodejs/node/commit/48b7b71352)] - **src**: 移除未使用的 TickInfo::in_tick() (Trevor Norris) [#4507](https://github.com/nodejs/node/pull/4507)
* \[[`d77b28c6b3`](https://github.com/nodejs/node/commit/d77b28c6b3)] - **src**: 移除未使用的 TickInfo::last_threw() (Trevor Norris) [#4507](https://github.com/nodejs/node/pull/4507)
* \[[`cb291d5c7f`](https://github.com/nodejs/node/commit/cb291d5c7f)] - **src**: 添加 AsyncCallbackScope (Trevor Norris) [#4507](https://github.com/nodejs/node/pull/4507)
* \[[`2eb097f212`](https://github.com/nodejs/node/commit/2eb097f212)] - **src**: 修复 MakeCallback 错误处理 (Trevor Norris) [#4507](https://github.com/nodejs/node/pull/4507)
* \[[`63356df39c`](https://github.com/nodejs/node/commit/63356df39c)] - **src,http**: 修复 http 中遗漏 uncaughtException 的问题 (Trevor Norris) [#5591](https://github.com/nodejs/node/pull/5591)
* \[[`ee7040568d`](https://github.com/nodejs/node/commit/ee7040568d)] - **src,http_parser**: 移除 KickNextTick 调用 (Trevor Norris) [#5756](https://github.com/nodejs/node/pull/5756)
* \[[`9a8acad6ff`](https://github.com/nodejs/node/commit/9a8acad6ff)] - **test**: 在可能的情况下使用随机端口 (Brian White) [#7045](https://github.com/nodejs/node/pull/7045)
* \[[`223c0e2010`](https://github.com/nodejs/node/commit/223c0e2010)] - **test**: 在缺少 js-yaml 时跳过 doctool 测试 (Anna Henningsen) [#7218](https://github.com/nodejs/node/pull/7218)
* \[[`3681b9b868`](https://github.com/nodejs/node/commit/3681b9b868)] - **test**: 重构 doctool 测试 (Rich Trott) [#6719](https://github.com/nodejs/node/pull/6719)
* \[[`686d7b329c`](https://github.com/nodejs/node/commit/686d7b329c)] - **test**: 以 V8_DEPRECATION_WARNINGS=1 构建 addons (Ben Noordhuis) [#6652](https://github.com/nodejs/node/pull/6652)
* \[[`8404e34665`](https://github.com/nodejs/node/commit/8404e34665)] - _**Revert**_ "**test**: 将 test-vm-timeout 标记为 windows 上的不稳定测试" (Anna Henningsen) [#7373](https://github.com/nodejs/node/pull/7373)
* \[[`eab9ced2ee`](https://github.com/nodejs/node/commit/eab9ced2ee)] - **test**: 修复不稳定的 test-vm-timeout (Anna Henningsen) [#7373](https://github.com/nodejs/node/pull/7373)
* \[[`a31d3161f5`](https://github.com/nodejs/node/commit/a31d3161f5)] - **test**: 为 exec() 已知问题添加测试 (Rich Trott) [#7375](https://github.com/nodejs/node/pull/7375)
* \[[`1baa145a16`](https://github.com/nodejs/node/commit/1baa145a16)] - **test**: 移除 internet/test-tls-connnect-cnnic (Ben Noordhuis) [#7363](https://github.com/nodejs/node/pull/7363)
* \[[`e3097b7cdf`](https://github.com/nodejs/node/commit/e3097b7cdf)] - **test**: 使用无效输入测试 isFullWidthCodePoint (Rich Trott) [#7422](https://github.com/nodejs/node/pull/7422)
* \[[`f0b0fc49f9`](https://github.com/nodejs/node/commit/f0b0fc49f9)] - **test**: 为 gc 测试更新 weak module (Rich Trott) [#7014](https://github.com/nodejs/node/pull/7014)
* \[[`1d100f6853`](https://github.com/nodejs/node/commit/1d100f6853)] - **test**: 从 http/https 测试中移除未使用的变量 (Rich Trott) [#7598](https://github.com/nodejs/node/pull/7598)
* \[[`3241536d95`](https://github.com/nodejs/node/commit/3241536d95)] - **test**: 移除 net-server-try-ports 中的未使用变量 (Rich Trott) [#7597](https://github.com/nodejs/node/pull/7597)
* \[[`7bd7c235fa`](https://github.com/nodejs/node/commit/7bd7c235fa)] - **test**: 从 stream2 测试中移除未使用变量 (Rich Trott) [#7596](https://github.com/nodejs/node/pull/7596)
* \[[`4d36a67738`](https://github.com/nodejs/node/commit/4d36a67738)] - **test**: 从 child-process-fork 中移除未使用变量 (Rich Trott) [#7599](https://github.com/nodejs/node/pull/7599)
* \[[`b5e516a42c`](https://github.com/nodejs/node/commit/b5e516a42c)] - **test**: 移除 test-tls-server-verify 中的未使用变量 (Rich Trott) [#7595](https://github.com/nodejs/node/pull/7595)
* \[[`db35efa6c1`](https://github.com/nodejs/node/commit/db35efa6c1)] - **test**: 修复不稳定的 test-net-write-slow (Rich Trott) [#7555](https://github.com/nodejs/node/pull/7555)
* \[[`8273824ca3`](https://github.com/nodejs/node/commit/8273824ca3)] - **test**: 从 http 测试中移除 common.PORT (Rich Trott) [#7467](https://github.com/nodejs/node/pull/7467)
* \[[`5129f3f2cd`](https://github.com/nodejs/node/commit/5129f3f2cd)] - **test**: 将 test-vm-timeout 标记为 windows 上的不稳定测试 (Rich Trott) [#7359](https://github.com/nodejs/node/pull/7359)
* \[[`79b45886c1`](https://github.com/nodejs/node/commit/79b45886c1)] - **test**: 为一些 stream.Readable 用法添加测试 (Anna Henningsen) [#7260](https://github.com/nodejs/node/pull/7260)
* \[[`65b5cccee9`](https://github.com/nodejs/node/commit/65b5cccee9)] - **test**: 修复 windows 上的 spawn (Brian White) [#7049](https://github.com/nodejs/node/pull/7049)
* \[[`96ed883d2f`](https://github.com/nodejs/node/commit/96ed883d2f)] - **test**: 启用 test-debug-brk-no-arg (Rich Trott) [#7143](https://github.com/nodejs/node/pull/7143)
* \[[`8724c442f3`](https://github.com/nodejs/node/commit/8724c442f3)] - **test**: 为 spawn 中的 uid/gid 设置添加测试 (Rich Trott) [#7084](https://github.com/nodejs/node/pull/7084)
* \[[`042e858dfb`](https://github.com/nodejs/node/commit/042e858dfb)] - **test**: 让 test-child-process-fork-net 更健壮 (Rich Trott) [#7033](https://github.com/nodejs/node/pull/7033)
* \[[`2a59e4e73d`](https://github.com/nodejs/node/commit/2a59e4e73d)] - **test**: 提高 debug-break-on-uncaught 的可靠性 (Rich Trott) [#6793](https://github.com/nodejs/node/pull/6793)
* \[[`77325d585e`](https://github.com/nodejs/node/commit/77325d585e)] - **test**: 移除已禁用的 eio race 测试 (Rich Trott) [#7083](https://github.com/nodejs/node/pull/7083)
* \[[`5b1f54678b`](https://github.com/nodejs/node/commit/5b1f54678b)] - **test**: 移除非递增的 common.PORT 更改 (Rich Trott) [#7055](https://github.com/nodejs/node/pull/7055)
* \[[`44228dfdef`](https://github.com/nodejs/node/commit/44228dfdef)] - **test**: 从 gc 测试中移除 `common.PORT` (Rich Trott) [#7013](https://github.com/nodejs/node/pull/7013)
* \[[`644bfe14a6`](https://github.com/nodejs/node/commit/644bfe14a6)] - **test**: 修复 OS X 上的 test-debug-port-numbers (Santiago Gimeno) [#7046](https://github.com/nodejs/node/pull/7046)
* \[[`cde3014f78`](https://github.com/nodejs/node/commit/cde3014f78)] - **test**: 移除对 common.PORT 的修改 (Rich Trott) [#6990](https://github.com/nodejs/node/pull/6990)
* \[[`8c412af7ac`](https://github.com/nodejs/node/commit/8c412af7ac)] - **test**: 验证 cluster worker 退出 (cjihrig) [#6993](https://github.com/nodejs/node/pull/6993)
* \[[`7d6acefbcc`](https://github.com/nodejs/node/commit/7d6acefbcc)] - **test**: 监听并连接到 127.0.0.1 (Ben Noordhuis) [#7524](https://github.com/nodejs/node/pull/7524)
* \[[`ecf5c1cb25`](https://github.com/nodejs/node/commit/ecf5c1cb25)] - **test**: 重构 spawnSync() cwd 测试 (cjihrig) [#6939](https://github.com/nodejs/node/pull/6939)
* \[[`9cccaa3c80`](https://github.com/nodejs/node/commit/9cccaa3c80)] - **test**: 修复 windows 上的 component 打印 (Ben Noordhuis) [#6915](https://github.com/nodejs/node/pull/6915)
* \[[`af4b56d6be`](https://github.com/nodejs/node/commit/af4b56d6be)] - **test**: 将 python 路径传递给 node-gyp (hefangshi) [#6646](https://github.com/nodejs/node/pull/6646)
* \[[`7c55f59214`](https://github.com/nodejs/node/commit/7c55f59214)] - **test**: 让 stdout buffer 测试更健壮 (Rich Trott) [#6633](https://github.com/nodejs/node/pull/6633)
* \[[`3aef9b813f`](https://github.com/nodejs/node/commit/3aef9b813f)] - **test**: 取消将 test-http-regr-gh-2928 标记为不稳定 (Rich Trott) [#6540](https://github.com/nodejs/node/pull/6540)
* \[[`2259e5db69`](https://github.com/nodejs/node/commit/2259e5db69)] - **test**: 避免 test-cluster-master-* 的不稳定性 (Stefan Budeanu) [#6531](https://github.com/nodejs/node/pull/6531)
* \[[`5f444ed6a3`](https://github.com/nodejs/node/commit/5f444ed6a3)] - **test**: 添加使用 cork 的 stream3 缓冲测试 (Alex J Burke) [#6493](https://github.com/nodejs/node/pull/6493)
* \[[`01b314d165`](https://github.com/nodejs/node/commit/01b314d165)] - **test**: 通过使用 openpty 模拟 TTY 来测试 TTY 问题 (Jeremiah Senkpiel) [#6895](https://github.com/nodejs/node/pull/6895)
* \[[`55f8689711`](https://github.com/nodejs/node/commit/55f8689711)] - **test**: 为 HTTP CONNECT 请求的响应添加测试 (Josh Leder) [#6279](https://github.com/nodejs/node/pull/6279)
* \[[`9aec1ddb4f`](https://github.com/nodejs/node/commit/9aec1ddb4f)] - **test**: 测试 cluster worker 在错误时断开连接 (Santiago Gimeno) [#6909](https://github.com/nodejs/node/pull/6909)
* \[[`c0a42bc040`](https://github.com/nodejs/node/commit/c0a42bc040)] - **test**: 验证 IPC 消息是在 next tick 中发出的 (Santiago Gimeno) [#6909](https://github.com/nodejs/node/pull/6909)
* \[[`9606f768ea`](https://github.com/nodejs/node/commit/9606f768ea)] - **(SEMVER-MINOR)** **test**: 从 node tree 运行 v8 测试 (Bryon Leung) [#4704](https://github.com/nodejs/node/pull/4704)
* \[[`efdeb69c9a`](https://github.com/nodejs/node/commit/efdeb69c9a)] - **test**: 解决 debugger 未杀死 inferior 的问题 (Ben Noordhuis) [#7037](https://github.com/nodejs/node/pull/7037)
* \[[`e3f9bc893f`](https://github.com/nodejs/node/commit/e3f9bc893f)] - **test**: 在 agent 测试中一致地使用 strictEqual (Ben Noordhuis) [#6654](https://github.com/nodejs/node/pull/6654)
* \[[`1186b7a401`](https://github.com/nodejs/node/commit/1186b7a401)] - **test**: 为 MakeCallback 添加 addons 测试 (Trevor Norris) [#4507](https://github.com/nodejs/node/pull/4507)
* \[[`8f76d7db03`](https://github.com/nodejs/node/commit/8f76d7db03)] - **test,tools**: 测试 doctool 的 yaml 解析 (Anna Henningsen) [#6495](https://github.com/nodejs/node/pull/6495)
* \[[`e544b1c40c`](https://github.com/nodejs/node/commit/e544b1c40c)] - **test,win**: 在 WOW64 上跳过 addons/load-long-path (Alexis Campailla) [#6675](https://github.com/nodejs/node/pull/6675)
* \[[`b956635e41`](https://github.com/nodejs/node/commit/b956635e41)] - **tls**: 捕获 `certCbDone` 异常 (Fedor Indutny) [#6887](https://github.com/nodejs/node/pull/6887)
* \[[`06327e5eed`](https://github.com/nodejs/node/commit/06327e5eed)] - **tls**: 使用 process.binding('config') 检测 fips 模式 (James M Snell) [#7551](https://github.com/nodejs/node/pull/7551)
* \[[`c807287e80`](https://github.com/nodejs/node/commit/c807287e80)] - **tls,https**: 在连接时遵循地址族 (Ben Noordhuis) [#6654](https://github.com/nodejs/node/pull/6654)
* \[[`9ef6e23088`](https://github.com/nodejs/node/commit/9ef6e23088)] - **tools**: 确保 doctool 锚点遵循 include (Anna Henningsen) [#6943](https://github.com/nodejs/node/pull/6943)
* \[[`f9f85a006f`](https://github.com/nodejs/node/commit/f9f85a006f)] - **tools**: 恢复对 opts hash 的签名更改 (Jesse McCarthy) [#6690](https://github.com/nodejs/node/pull/6690)
* \[[`607173bbac`](https://github.com/nodejs/node/commit/607173bbac)] - **tools**: 修复 doctool 中的回归 (Myles Borins) [#6680](https://github.com/nodejs/node/pull/6680)
* \[[`ed193ad8ae`](https://github.com/nodejs/node/commit/ed193ad8ae)] - **tools**: 修复 tools/doc/addon-verify.js 回归 (Anna Henningsen) [#6652](https://github.com/nodejs/node/pull/6652)
* \[[`8b88c384f0`](https://github.com/nodejs/node/commit/8b88c384f0)] - **tools**: 为对象字面量间距做 lint (Rich Trott) [#6592](https://github.com/nodejs/node/pull/6592)
* \[[`96b5aa8710`](https://github.com/nodejs/node/commit/96b5aa8710)] - **tools**: 更新 marked 依赖 (Daniel Wang) [#6396](https://github.com/nodejs/node/pull/6396)
* \[[`ea137637b7`](https://github.com/nodejs/node/commit/ea137637b7)] - **tools**: 允许多个 added: 版本条目 (Anna Henningsen) [#6495](https://github.com/nodejs/node/pull/6495)
* \[[`2832a60426`](https://github.com/nodejs/node/commit/2832a60426)] - **tools**: 解析文档元数据 (Tristian Flanagan) [#6495](https://github.com/nodejs/node/pull/6495)
* \[[`0149cb0577`](https://github.com/nodejs/node/commit/0149cb0577)] - **tools**: 为 doctool 添加 mock-y js-yaml 依赖 (Anna Henningsen) [#6495](https://github.com/nodejs/node/pull/6495)
* \[[`68e9fd47c6`](https://github.com/nodejs/node/commit/68e9fd47c6)] - **tools**: 修复 -Wunused-variable 警告 (Ben Noordhuis) [#7462](https://github.com/nodejs/node/pull/7462)
* \[[`4a2bd2d515`](https://github.com/nodejs/node/commit/4a2bd2d515)] - **tools**: 允许 cpplint 在 git 仓库外运行 (Ben Noordhuis) [#7462](https://github.com/nodejs/node/pull/7462)
* \[[`09e98a4457`](https://github.com/nodejs/node/commit/09e98a4457)] - **tools**: 重新添加 --mode=tap 到 cpplint (Ben Noordhuis) [#7462](https://github.com/nodejs/node/pull/7462)
* \[[`e74f199fe2`](https://github.com/nodejs/node/commit/e74f199fe2)] - **tools**: 再次禁用不需要的 cpplint 规则 (Ben Noordhuis) [#7462](https://github.com/nodejs/node/pull/7462)
* \[[`391fc80487`](https://github.com/nodejs/node/commit/391fc80487)] - **tools**: 将 cpplint 更新到 r456 (Ben Noordhuis) [#7462](https://github.com/nodejs/node/pull/7462)
* \[[`efadf7639f`](https://github.com/nodejs/node/commit/efadf7639f)] - **tools**: 更新 certdata.txt (Ben Noordhuis) [#7363](https://github.com/nodejs/node/pull/7363)
* \[[`d7ce99214d`](https://github.com/nodejs/node/commit/d7ce99214d)] - **tools**: 更新 ESLint，修复未使用变量 bug (Rich Trott) [#7601](https://github.com/nodejs/node/pull/7601)
* \[[`242d6c7323`](https://github.com/nodejs/node/commit/242d6c7323)] - **tools**: 移除未使用的变量 (Rich Trott) [#7594](https://github.com/nodejs/node/pull/7594)
* \[[`7182f5f876`](https://github.com/nodejs/node/commit/7182f5f876)] - **tools**: 修复 license builder 以适配 icu-small (Myles Borins) [#7119](https://github.com/nodejs/node/pull/7119)
* \[[`140b84dd7d`](https://github.com/nodejs/node/commit/140b84dd7d)] - **tools**: 在 test.py 的 `vmArch` 检查失败时打印 stderr (Jeremiah Senkpiel) [#6786](https://github.com/nodejs/node/pull/6786)
* \[[`4c423e649c`](https://github.com/nodejs/node/commit/4c423e649c)] - **tools**: 为 V8 测试 tap 输出指定显式路径 (Myles Borins) [#7460](https://github.com/nodejs/node/pull/7460)
* \[[`d50f16969d`](https://github.com/nodejs/node/commit/d50f16969d)] - **tools,doc**: 为 REPLACEME 标记添加示例用法 (Anna Henningsen) [#6864](https://github.com/nodejs/node/pull/6864)
* \[[`b07c3a6ea6`](https://github.com/nodejs/node/commit/b07c3a6ea6)] - **tty**: 在 OS X 上使用阻塞模式 (Jeremiah Senkpiel) [#6895](https://github.com/nodejs/node/pull/6895)
* \[[`a1719a94e9`](https://github.com/nodejs/node/commit/a1719a94e9)] - **udp**: 使用 libuv API 获取文件描述符 (Saúl Ibarra Corretgé) [#6908](https://github.com/nodejs/node/pull/6908)
* \[[`7779639a11`](https://github.com/nodejs/node/commit/7779639a11)] - **unix,stream**: 修复为句柄获取正确的 fd (Saúl Ibarra Corretgé) [#6753](https://github.com/nodejs/node/pull/6753)
* \[[`d0bf09d3ad`](https://github.com/nodejs/node/commit/d0bf09d3ad)] - **util**: 进一步提升 format() 性能 (Brian White) [#5360](https://github.com/nodejs/node/pull/5360)
* \[[`72fb281961`](https://github.com/nodejs/node/commit/72fb281961)] - **util**: 提升 util.format 性能 (Evan Lucas) [#5360](https://github.com/nodejs/node/pull/5360)
* \[[`855759757a`](https://github.com/nodejs/node/commit/855759757a)] - **vm**: 不要为自定义错误打印箭头消息 (Anna Henningsen) [#7398](https://github.com/nodejs/node/pull/7398)
* \[[`b9dfdfe1d3`](https://github.com/nodejs/node/commit/b9dfdfe1d3)] - **vm**: 当堆栈空间耗尽时不要中止进程 (Anna Henningsen) [#6907](https://github.com/nodejs/node/pull/6907)
* \[[`0bfedd13a9`](https://github.com/nodejs/node/commit/0bfedd13a9)] - **win,build**: 添加 zip 和 7z 包的创建 (Bartosz Sosnowski) [#5995](https://github.com/nodejs/node/pull/5995)
* \[[`7d66752f1f`](https://github.com/nodejs/node/commit/7d66752f1f)] - **zlib**: 在处理后释放回调和缓冲区 (Matt Lavin) [#6955](https://github.com/nodejs/node/pull/6955)

<a id="4.4.7"></a>

## 2016-06-28，版本 4.4.7 'Argon'（LTS），@thealphanerd

这个 LTS 版本包含 89 次提交。其中包括 46 次与文档相关的提交、11 次与测试相关的提交、8 次与构建相关的提交，以及 4 次与基准测试相关的提交。

### 显著变更

* **debugger**:
  * 现在可以在 repl 中打印数组的所有属性（length 除外）（cjihrig）[#6448](https://github.com/nodejs/node/pull/6448)
* **npm**:
  * 将 npm 升级到 2.15.8（Rebecca Turner）[#7412](https://github.com/nodejs/node/pull/7412)
* **stream**:
  * 修复了一个在 v4.4.5 中引入的 stream 变更后更常见的 bug。（Anna Henningsen）[#7160](https://github.com/nodejs/node/pull/7160)
* **V8**:
  * 修复了 crankshaft 中一个会在 arm64 上导致崩溃的 bug（Myles Borins）[#7442](https://github.com/nodejs/node/pull/7442)
  * 在 postmortem 信息中添加缺失的类，例如 JSMap 和 JSSet（evan.lucas）[#3792](https://github.com/nodejs/node/pull/3792)

### 提交

* \[[`87cdb83a96`](https://github.com/nodejs/node/commit/87cdb83a96)] - **benchmark**: 合并 url.js 和 url-resolve.js（Andreas Madsen）[#5177](https://github.com/nodejs/node/pull/5177)
* \[[`921e8568d5`](https://github.com/nodejs/node/commit/921e8568d5)] - **benchmark**: 将 misc 移动到分类目录中（Andreas Madsen）[#5177](https://github.com/nodejs/node/pull/5177)
* \[[`c189eec14e`](https://github.com/nodejs/node/commit/c189eec14e)] - **benchmark**: 修复配置参数（Andreas Madsen）[#5177](https://github.com/nodejs/node/pull/5177)
* \[[`58ad451f0b`](https://github.com/nodejs/node/commit/58ad451f0b)] - **benchmark**: 将 string-decoder 移动到其自己的分类中（Andreas Madsen）[#5177](https://github.com/nodejs/node/pull/5177)
* \[[`a01caa3166`](https://github.com/nodejs/node/commit/a01caa3166)] - **build**: 不再使用 -B 进行编译，redux（Ben Noordhuis）[#6650](https://github.com/nodejs/node/pull/6650)
* \[[`37606caeaf`](https://github.com/nodejs/node/commit/37606caeaf)] - **build**: 不使用 -B 进行编译（Ben Noordhuis）[#6393](https://github.com/nodejs/node/pull/6393)
* \[[`64fb7a1929`](https://github.com/nodejs/node/commit/64fb7a1929)] - **build**: 更新用于 npm 的 android-configure 脚本（Robert Chiras）[#6349](https://github.com/nodejs/node/pull/6349)
* \[[`43ce6fc8d2`](https://github.com/nodejs/node/commit/43ce6fc8d2)] - **build**: 修复二进制目标的 DESTCPU 检测（Richard Lau）[#6310](https://github.com/nodejs/node/pull/6310)
* \[[`6dfe7aeed5`](https://github.com/nodejs/node/commit/6dfe7aeed5)] - **cares**: 支持 AIX 的 malloc(0) 场景（Gireesh Punathil）[#6305](https://github.com/nodejs/node/pull/6305)
* \[[`2389006720`](https://github.com/nodejs/node/commit/2389006720)] - **debugger**: 在 repl 中显示数组内容（cjihrig）[#6448](https://github.com/nodejs/node/pull/6448)
* \[[`1c6809ce75`](https://github.com/nodejs/node/commit/1c6809ce75)] - **debugger**: 为调试器引入 exec 方法（Jackson Tian）
* \[[`200b3ca9ed`](https://github.com/nodejs/node/commit/200b3ca9ed)] - **deps**: 将 LTS 中的 npm 升级到 2.15.8（Rebecca Turner）[#7412](https://github.com/nodejs/node/pull/7412)
* \[[`49921e8819`](https://github.com/nodejs/node/commit/49921e8819)] - **deps**: 从 V8 上游回移植 102e3e87e7（Myles Borins）[#7442](https://github.com/nodejs/node/pull/7442)
* \[[`de00f91041`](https://github.com/nodejs/node/commit/de00f91041)] - **deps**: 从 v8 上游回移植 bc2e393（evan.lucas）[#3792](https://github.com/nodejs/node/pull/3792)
* \[[`1549899531`](https://github.com/nodejs/node/commit/1549899531)] - **dgram,test**: 添加 addMembership/dropMembership 测试（Rich Trott）[#6753](https://github.com/nodejs/node/pull/6753)
* \[[`0ba3c2ca66`](https://github.com/nodejs/node/commit/0ba3c2ca66)] - **doc**: 修复 v4 更新日志中的布局问题（Myles Borins）[#7394](https://github.com/nodejs/node/pull/7394)
* \[[`98469ad84d`](https://github.com/nodejs/node/commit/98469ad84d)] - **doc**: 更正 cluster message 事件的参数（Colin Ihrig）[#7297](https://github.com/nodejs/node/pull/7297)
* \[[`67863f110b`](https://github.com/nodejs/node/commit/67863f110b)] - **doc**: 更新许可证（Myles Borins）[#7127](https://github.com/nodejs/node/pull/7127)
* \[[`c31eaad42d`](https://github.com/nodejs/node/commit/c31eaad42d)] - **doc**: 澄清 buffer 类（Steve Mao）[#6914](https://github.com/nodejs/node/pull/6914)
* \[[`e0dd476fe5`](https://github.com/nodejs/node/commit/e0dd476fe5)] - **doc**: 修复 timers 主题中的拼写错误以提高可读性（Kevin Donahue）[#6916](https://github.com/nodejs/node/pull/6916)
* \[[`a8391bc9fc`](https://github.com/nodejs/node/commit/a8391bc9fc)] - **doc**: 将 jhamhader 添加到协作者中（Yuval Brik）[#6946](https://github.com/nodejs/node/pull/6946)
* \[[`22ca7b877b`](https://github.com/nodejs/node/commit/22ca7b877b)] - **doc**: 将 @othiym23 添加到协作者列表中（Forrest L Norvell）[#6945](https://github.com/nodejs/node/pull/6945)
* \[[`2c3c4e5819`](https://github.com/nodejs/node/commit/2c3c4e5819)] - **doc**: 引用按语言分类的全局对象列表（Anna Henningsen）[#6900](https://github.com/nodejs/node/pull/6900)
* \[[`5a1a0b5ed1`](https://github.com/nodejs/node/commit/5a1a0b5ed1)] - **doc**: 使 api 文档适合打印（Marian）[#6748](https://github.com/nodejs/node/pull/6748)
* \[[`03db88e012`](https://github.com/nodejs/node/commit/03db88e012)] - **doc**: 将 bengl 添加到协作者中（Bryan English）[#6921](https://github.com/nodejs/node/pull/6921)
* \[[`fbf95dde94`](https://github.com/nodejs/node/commit/fbf95dde94)] - **doc**: 将 DCO 更新到 v1.1（William Kapke）[#6353](https://github.com/nodejs/node/pull/6353)
* \[[`f23a9c39c0`](https://github.com/nodejs/node/commit/f23a9c39c0)] - **doc**: 修复 Error.captureStackTrace 中的拼写错误（Mohsen）[#6811](https://github.com/nodejs/node/pull/6811)
* \[[`30ab6a890c`](https://github.com/nodejs/node/commit/30ab6a890c)] - **doc**: 修正名称以匹配 git log（Robert Jefe Lindstaedt）[#6880](https://github.com/nodejs/node/pull/6880)
* \[[`2b0f40ca16`](https://github.com/nodejs/node/commit/2b0f40ca16)] - **doc**: 为虚拟化环境中的 fs.watch 添加说明（Robert Jefe Lindstaedt）[#6809](https://github.com/nodejs/node/pull/6809)
* \[[`3b461870be`](https://github.com/nodejs/node/commit/3b461870be)] - **doc**: 将 ee.once 文档澄清内容回移植到 4.x。（Lance Ball）[#7103](https://github.com/nodejs/node/pull/7103)
* \[[`eadb7e5b20`](https://github.com/nodejs/node/commit/eadb7e5b20)] - **doc**: 细分目录，添加辅助链接（Jeremiah Senkpiel）[#6167](https://github.com/nodejs/node/pull/6167)
* \[[`107839c5dd`](https://github.com/nodejs/node/commit/107839c5dd)] - **doc**: 不再使用 Node.js(1)（Jeremiah Senkpiel）[#6167](https://github.com/nodejs/node/pull/6167)
* \[[`401325f9e2`](https://github.com/nodejs/node/commit/401325f9e2)] - **doc**: 更好的示例和概述（Jeremiah Senkpiel）[#6167](https://github.com/nodejs/node/pull/6167)
* \[[`c654184f28`](https://github.com/nodejs/node/commit/c654184f28)] - **doc**: 删除 crypto.md 中 Sign in 的链接（Kirill Fomichev）[#6812](https://github.com/nodejs/node/pull/6812)
* \[[`3e9288e466`](https://github.com/nodejs/node/commit/3e9288e466)] - **doc**: 修复 child_process 中的 exec 示例（Evan Lucas）[#6660](https://github.com/nodejs/node/pull/6660)
* \[[`3d820e45b4`](https://github.com/nodejs/node/commit/3d820e45b4)] - **doc**: api/documentation.md 中的 "a" 改为 "an"（Anchika Agarwal）[#6689](https://github.com/nodejs/node/pull/6689)
* \[[`352496daa2`](https://github.com/nodejs/node/commit/352496daa2)] - **doc**: 移动 readme 中的 newcomers 部分（Jeremiah Senkpiel）[#6681](https://github.com/nodejs/node/pull/6681)
* \[[`ac6b921ce5`](https://github.com/nodejs/node/commit/ac6b921ce5)] - **doc**: 提及模块包装器的存在/用途（Matt Harrison）[#6433](https://github.com/nodejs/node/pull/6433)
* \[[`97d1fc0fc6`](https://github.com/nodejs/node/commit/97d1fc0fc6)] - **doc**: 改进 onboarding-extras.md 的格式（Jeremiah Senkpiel）[#6548](https://github.com/nodejs/node/pull/6548)
* \[[`c9b144ddd4`](https://github.com/nodejs/node/commit/c9b144ddd4)] - **doc**: 将对 fs.Stats 对象其余引用添加链接（Kevin Donahue）[#6485](https://github.com/nodejs/node/pull/6485)
* \[[`d909c25a33`](https://github.com/nodejs/node/commit/d909c25a33)] - **doc**: 修复 cluster.md 中示例的 lint 问题（yorkie）[#6516](https://github.com/nodejs/node/pull/6516)
* \[[`21d02f460f`](https://github.com/nodejs/node/commit/21d02f460f)] - **doc**: 为 markdown 斜体补充缺失的下划线（Kevin Donahue）[#6529](https://github.com/nodejs/node/pull/6529)
* \[[`18ecc779bb`](https://github.com/nodejs/node/commit/18ecc779bb)] - **doc**: 确保 node.1 文件中的语法一致（justshiv）[#6426](https://github.com/nodejs/node/pull/6426)
* \[[`52d9e7b61d`](https://github.com/nodejs/node/commit/52d9e7b61d)] - **doc**: 修复 __dirname 部分中的一个拼写错误（William Luo）[#6473](https://github.com/nodejs/node/pull/6473)
* \[[`de20235235`](https://github.com/nodejs/node/commit/de20235235)] - **doc**: 移除所有滚动条样式（Claudio Rodriguez）[#6479](https://github.com/nodejs/node/pull/6479)
* \[[`a6f45b4eda`](https://github.com/nodejs/node/commit/a6f45b4eda)] - **doc**: 删除 REPL 示例中的多余空格（Juan）[#6447](https://github.com/nodejs/node/pull/6447)
* \[[`feda15b2b8`](https://github.com/nodejs/node/commit/feda15b2b8)] - **doc**: 更新 OS X 的构建说明（Rich Trott）[#6309](https://github.com/nodejs/node/pull/6309)
* \[[`3d1a3e4a30`](https://github.com/nodejs/node/commit/3d1a3e4a30)] - **doc**: 将对 Stable 的引用改为 Current（Myles Borins）[#6318](https://github.com/nodejs/node/pull/6318)
* \[[`e28598b1ef`](https://github.com/nodejs/node/commit/e28598b1ef)] - **doc**: 更新作者信息（James M Snell）[#6373](https://github.com/nodejs/node/pull/6373)
* \[[`0f3a94acbd`](https://github.com/nodejs/node/commit/0f3a94acbd)] - **doc**: 将 JacksonTian 添加到协作者中（Jackson Tian）[#6388](https://github.com/nodejs/node/pull/6388)
* \[[`d7d54c8fd2`](https://github.com/nodejs/node/commit/d7d54c8fd2)] - **doc**: 将 Minqi Pan 添加到协作者中（Minqi Pan）[#6387](https://github.com/nodejs/node/pull/6387)
* \[[`83721c6fd2`](https://github.com/nodejs/node/commit/83721c6fd2)] - **doc**: 将 eljefedelrodeodeljefe 添加到协作者中（Robert Jefe Lindstaedt）[#6389](https://github.com/nodejs/node/pull/6389)
* \[[`b112fd1b4e`](https://github.com/nodejs/node/commit/b112fd1b4e)] - **doc**: 将 ronkorving 添加到协作者中（ronkorving）[#6385](https://github.com/nodejs/node/pull/6385)
* \[[`ac60d9cc86`](https://github.com/nodejs/node/commit/ac60d9cc86)] - **doc**: 将 estliberitas 添加到协作者中（Alexander Makarenko）[#6386](https://github.com/nodejs/node/pull/6386)
* \[[`435cd56de5`](https://github.com/nodejs/node/commit/435cd56de5)] - **doc**: 不会变化的 DCO 锚点（William Kapke）[#6257](https://github.com/nodejs/node/pull/6257)
* \[[`7d8141dd1b`](https://github.com/nodejs/node/commit/7d8141dd1b)] - **doc**: 将 stefanmb 添加到协作者中（Stefan Budeanu）[#6227](https://github.com/nodejs/node/pull/6227)
* \[[`6dfc96326d`](https://github.com/nodejs/node/commit/6dfc96326d)] - **doc**: 将 iWuzHere 添加到协作者中（Imran Iqbal）[#6226](https://github.com/nodejs/node/pull/6226)
* \[[`3dbcc73159`](https://github.com/nodejs/node/commit/3dbcc73159)] - **doc**: 将 santigimeno 添加到协作者中（Santiago Gimeno）[#6225](https://github.com/nodejs/node/pull/6225)
* \[[`ae3eb24a3d`](https://github.com/nodejs/node/commit/ae3eb24a3d)] - **doc**: 将 addaleax 添加到协作者中（Anna Henningsen）[#6224](https://github.com/nodejs/node/pull/6224)
* \[[`46ee7bb4ba`](https://github.com/nodejs/node/commit/46ee7bb4ba)] - **doc**: 修复 buffer 文档中的错误引用（Amery）[#6194](https://github.com/nodejs/node/pull/6194)
* \[[`e3f78eb7c1`](https://github.com/nodejs/node/commit/e3f78eb7c1)] - **doc**: 改进 v4.4.5 更新日志条目的渲染效果（Myles Borins）[#6958](https://github.com/nodejs/node/pull/6958)
* \[[`bac87d01d9`](https://github.com/nodejs/node/commit/bac87d01d9)] - **gitignore**: 在 .gitignore 中添加 .vs/ 目录（Mike Kaufman）[#6070](https://github.com/nodejs/node/pull/6070)
* \[[`93f2314dc2`](https://github.com/nodejs/node/commit/93f2314dc2)] - **gitignore**: 忽略 VS 2015 的 \*.VC.opendb 文件（Mike Kaufman）[#6070](https://github.com/nodejs/node/pull/6070)
* \[[`c98aaf59bf`](https://github.com/nodejs/node/commit/c98aaf59bf)] - **http**: 加快 checkIsHttpToken 的速度（Jackson Tian）[#4790](https://github.com/nodejs/node/pull/4790)
* \[[`552e25cb6b`](https://github.com/nodejs/node/commit/552e25cb6b)] - **lib,test**: 为 linter 更新做准备的更新（Rich Trott）[#6498](https://github.com/nodejs/node/pull/6498)
* \[[`aaeeec4765`](https://github.com/nodejs/node/commit/aaeeec4765)] - **lib,test,tools**: 对变量赋值进行对齐（Rich Trott）[#6869](https://github.com/nodejs/node/pull/6869)
* \[[`b3acbc5648`](https://github.com/nodejs/node/commit/b3acbc5648)] - **net**: 用 defineProperty 替换 `__defineGetter__`（Fedor Indutny）[#6284](https://github.com/nodejs/node/pull/6284)
* \[[`4c1eb5bf03`](https://github.com/nodejs/node/commit/4c1eb5bf03)] - **repl**: 以 0600 模式创建历史文件（Carl Lei）[#3394](https://github.com/nodejs/node/pull/3394)
* \[[`90306bb81d`](https://github.com/nodejs/node/commit/90306bb81d)] - **src**: 对 http parser 数组大小字段使用 size_t（Ben Noordhuis）[#5969](https://github.com/nodejs/node/pull/5969)
* \[[`af41a63d0f`](https://github.com/nodejs/node/commit/af41a63d0f)] - **src**: 用 typesafe arraysize 替换 ARRAY_SIZE（Ben Noordhuis）[#5969](https://github.com/nodejs/node/pull/5969)
* \[[`037291e31f`](https://github.com/nodejs/node/commit/037291e31f)] - **src**: 确保 Utf8Value 始终以零结尾（Anna Henningsen）[#7101](https://github.com/nodejs/node/pull/7101)
* \[[`a08a0179e9`](https://github.com/nodejs/node/commit/a08a0179e9)] - **stream**: 确保 awaitDrain 只增加一次（David Halls）[#7292](https://github.com/nodejs/node/pull/7292)
* \[[`b73ec46dcb`](https://github.com/nodejs/node/commit/b73ec46dcb)] - **stream**: 在手动 .resume() 后重置 awaitDrain（Anna Henningsen）[#7160](https://github.com/nodejs/node/pull/7160)
* \[[`55319fe798`](https://github.com/nodejs/node/commit/55319fe798)] - **stream_base**: 暴露 `bytesRead` getter（Fedor Indutny）[#6284](https://github.com/nodejs/node/pull/6284)
* \[[`0414d882ce`](https://github.com/nodejs/node/commit/0414d882ce)] - **test**: 修复 test-net-* 中对 getaddrinfo(3) 的错误代码检查（Natanael Copa）[#5099](https://github.com/nodejs/node/pull/5099)
* \[[`be0bb5f5fc`](https://github.com/nodejs/node/commit/be0bb5f5fc)] - **test**: 修复不稳定的 known_issues 测试（Rich Trott）[#6555](https://github.com/nodejs/node/pull/6555)
* \[[`ab50e82f42`](https://github.com/nodejs/node/commit/ab50e82f42)] - **test**: 修复 test-process-exec-argv 的不稳定性（Santiago Gimeno）[#7128](https://github.com/nodejs/node/pull/7128)
* \[[`4e38655d5f`](https://github.com/nodejs/node/commit/4e38655d5f)] - **test**: 重构 test-tls-reuse-host-from-socket（Rich Trott）[#6756](https://github.com/nodejs/node/pull/6756)
* \[[`1c4549a31e`](https://github.com/nodejs/node/commit/1c4549a31e)] - **test**: 修复易波动的 test-stdout-close-catch（Santiago Gimeno）[#6808](https://github.com/nodejs/node/pull/6808)
* \[[`3b94e31245`](https://github.com/nodejs/node/commit/3b94e31245)] - **test**: 对 npm-test-install 的环境变量进行更稳健的处理（Myles Borins）[#6797](https://github.com/nodejs/node/pull/6797)
* \[[`4067cde7ee`](https://github.com/nodejs/node/commit/4067cde7ee)] - **test**: 将跳过功能抽象到 common 中（Jeremiah Senkpiel）[#7114](https://github.com/nodejs/node/pull/7114)
* \[[`8b396e3d71`](https://github.com/nodejs/node/commit/8b396e3d71)] - **test**: 修复 test-debugger-repl-break-in-module（Rich Trott）[#6686](https://github.com/nodejs/node/pull/6686)
* \[[`847b29c050`](https://github.com/nodejs/node/commit/847b29c050)] - **test**: 修复 test-debugger-repl-term（Rich Trott）[#6682](https://github.com/nodejs/node/pull/6682)
* \[[`1d68bdbe3f`](https://github.com/nodejs/node/commit/1d68bdbe3f)] - **test**: 修复 test-module-loading 中的错误消息检查（James M Snell）[#5986](https://github.com/nodejs/node/pull/5986)
* \[[`7e739ae159`](https://github.com/nodejs/node/commit/7e739ae159)] - **test,tools**: 调整函数参数对齐（Rich Trott）[#7100](https://github.com/nodejs/node/pull/7100)
* \[[`216486c2b6`](https://github.com/nodejs/node/commit/216486c2b6)] - **tools**: 为函数参数对齐添加 lint 规则（Rich Trott）[#7100](https://github.com/nodejs/node/pull/7100)
* \[[`6a76485ad7`](https://github.com/nodejs/node/commit/6a76485ad7)] - **tools**: 将 ESLint 更新到 2.9.0（Rich Trott）[#6498](https://github.com/nodejs/node/pull/6498)
* \[[`a31153c02c`](https://github.com/nodejs/node/commit/a31153c02c)] - **tools**: 移除压缩逻辑（Sakthipriyan Vairamani）[#6636](https://github.com/nodejs/node/pull/6636)
* \[[`10bd1a73fd`](https://github.com/nodejs/node/commit/10bd1a73fd)] - **tools**: 再次为 ICU 修复 license-builder.sh（Steven R. Loomis）[#6068](https://github.com/nodejs/node/pull/6068)
* \[[`0f6146c6c0`](https://github.com/nodejs/node/commit/0f6146c6c0)] - **tools**: 为 doctool 添加测试（Ian Kronquist）[#6031](https://github.com/nodejs/node/pull/6031)
* \[[`cc3645cff3`](https://github.com/nodejs/node/commit/cc3645cff3)] - **tools**: 为变量赋值对齐添加 lint 规则（Rich Trott）[#6869](https://github.com/nodejs/node/pull/6869)

<a id="4.4.6"></a>

## 2016-06-23，版本 4.4.6 'Argon' (LTS)，@thealphanerd

### 重要变更

这是一个重要的安全更新。所有 Node.js 用户都应查看 nodejs.org 上的安全更新摘要以了解已修补漏洞的详细信息。

此版本专门针对在 v8 中发现的一个 Buffer 溢出漏洞，更多细节可参见 [CVE](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2016-1669)

### 提交

* \[[`134c3b3977`](https://github.com/nodejs/node/commit/134c3b3977)] - **deps**: 从 v8 上游回移植 3a9bfec（Ben Noordhuis）[nodejs/node-private#38](https://github.com/nodejs/node-private/pull/38)

<a id="4.4.5"></a>

## 2016-05-24，版本 4.4.5 'Argon' (LTS)，@thealphanerd

### 重要变更

* **buffer**：
  * Buffer.indexOf 现在会为所有 UTF-16 输入返回正确的值（Anna Henningsen）[#6511](https://github.com/nodejs/node/pull/6511)
* **contextify**：
  * Context 对象现在会被正确地垃圾回收，这解决了一些用户在极端内存增长时遇到的问题（Ali Ijaz Sheikh）[#6871](https://github.com/nodejs/node/pull/6871)
* **deps**：
  * 将 npm 更新到 2.15.5（Rebecca Turner）[#6663](https://github.com/nodejs/node/pull/6663)
* **http**：
  * 无效的状态码不再能够被发送。限制为 100 - 999 之间的 3 位数字（Brian White）[#6291](https://github.com/nodejs/node/pull/6291)

### 提交

* \[[`59a977dd22`](https://github.com/nodejs/node/commit/59a977dd22)] - **assert**: 遵守 assert.doesNotThrow 消息。（Ilya Shaisultanov）[#2407](https://github.com/nodejs/node/pull/2407)
* \[[`8b077faa82`](https://github.com/nodejs/node/commit/8b077faa82)] - **buffer**: 修复 UCS2 在 buffer 长度为奇数时的 indexOf（Anna Henningsen）[#6511](https://github.com/nodejs/node/pull/6511)
* \[[`12a9699fcf`](https://github.com/nodejs/node/commit/12a9699fcf)] - **buffer**: 修复 UCS2 的 needle 长度估计错误（Anna Henningsen）[#6511](https://github.com/nodejs/node/pull/6511)
* \[[`292b1b733e`](https://github.com/nodejs/node/commit/292b1b733e)] - **build**: 修复 Linux 的 make tar-headers（Gibson Fahnestock）[#5978](https://github.com/nodejs/node/pull/5978)
* \[[`918d33ad4b`](https://github.com/nodejs/node/commit/918d33ad4b)] - **build**: 添加创建 Android .mk 文件的脚本（Robert Chiras）[#5544](https://github.com/nodejs/node/pull/5544)
* \[[`4ad71847bc`](https://github.com/nodejs/node/commit/4ad71847bc)] - **build**: 添加对 x86 架构的支持（Robert Chiras）[#5544](https://github.com/nodejs/node/pull/5544)
* \[[`6ad85914b1`](https://github.com/nodejs/node/commit/6ad85914b1)] - **child\_process**: 在分配后添加 nullptr 检查（Anna Henningsen）[#6256](https://github.com/nodejs/node/pull/6256)
* \[[`823f726f66`](https://github.com/nodejs/node/commit/823f726f66)] - **contextify**: 绑定 context 与 sandbox 的生命周期（Ali Ijaz Sheikh）[#5800](https://github.com/nodejs/node/pull/5800)
* \[[`9ddb44ba61`](https://github.com/nodejs/node/commit/9ddb44ba61)] - **contextify**: 将 sandbox 和 context 缓存在局部变量中（Ali Ijaz Sheikh）[#5392](https://github.com/nodejs/node/pull/5392)
* \[[`8ebdcd65b0`](https://github.com/nodejs/node/commit/8ebdcd65b0)] - **contextify**: 替换已弃用的 SetWeak 用法（Ali Ijaz Sheikh）[#5392](https://github.com/nodejs/node/pull/5392)
* \[[`9e6d8170f7`](https://github.com/nodejs/node/commit/9e6d8170f7)] - **contextify**: 清理 sandbox 的弱引用（Ali Ijaz Sheikh）[#5392](https://github.com/nodejs/node/pull/5392)
* \[[`b6fc15347d`](https://github.com/nodejs/node/commit/b6fc15347d)] - **contextify**: 清理 global proxy 的弱引用（Ali Ijaz Sheikh）[#5392](https://github.com/nodejs/node/pull/5392)
* \[[`0dc875e2c7`](https://github.com/nodejs/node/commit/0dc875e2c7)] - **deps**: 将 LTS 中的 npm 升级到 2.15.5（Rebecca Turner）
* \[[`3c50350f41`](https://github.com/nodejs/node/commit/3c50350f41)] - **deps**: 修复 v8 中的空指针检查（Michaël Zasso）[#6669](https://github.com/nodejs/node/pull/6669)
* \[[`a40730b4b4`](https://github.com/nodejs/node/commit/a40730b4b4)] - **deps**: 回移植 V8 中来自 4e8736d 的 IsValid 更改（Michaël Zasso）[#6669](https://github.com/nodejs/node/pull/6669)
* \[[`855604c53a`](https://github.com/nodejs/node/commit/855604c53a)] - **deps**: 将 LTS 中的 npm 升级到 2.15.4（Rebecca Turner）[#6663](https://github.com/nodejs/node/pull/6663)
* \[[`433fb9a968`](https://github.com/nodejs/node/commit/433fb9a968)] - **deps**: 从 v8 上游 cherry-pick 1383d00（Fedor Indutny）[#6179](https://github.com/nodejs/node/pull/6179)
* \[[`d1fca27ef8`](https://github.com/nodejs/node/commit/d1fca27ef8)] - **deps**: 从 v8 上游回移植 125ac66（Myles Borins）[#6086](https://github.com/nodejs/node/pull/6086)
* \[[`df299019a0`](https://github.com/nodejs/node/commit/df299019a0)] - **deps**: 将 LTS 中的 npm 升级到 2.15.2（Kat Marchán）
* \[[`50f02bd8d6`](https://github.com/nodejs/node/commit/50f02bd8d6)] - **doc**: 更新 vm.runInDebugContext() 示例（Ben Noordhuis）[#6757](https://github.com/nodejs/node/pull/6757)
* \[[`b872feade3`](https://github.com/nodejs/node/commit/b872feade3)] - **doc**: 将函数替换为箭头函数（abouthiroppy）[#6203](https://github.com/nodejs/node/pull/6203)
* \[[`7160229be4`](https://github.com/nodejs/node/commit/7160229be4)] - **doc**: 说明 zlib.flush 会在待处理写入之后执行（Anna Henningsen）[#6172](https://github.com/nodejs/node/pull/6172)
* \[[`d069f2de8c`](https://github.com/nodejs/node/commit/d069f2de8c)] - **doc**: 为 zlib.flush() 添加完整示例（Anna Henningsen）[#6172](https://github.com/nodejs/node/pull/6172)
* \[[`59814acfef`](https://github.com/nodejs/node/commit/59814acfef)] - **doc**: 说明在 linux 上 child.kill() 的陷阱（Robert Jefe Lindstaedt）[#2098](https://github.com/nodejs/node/issues/2098)
* \[[`840c09492d`](https://github.com/nodejs/node/commit/840c09492d)] - **doc**: 更新 openssl.org 哈希链接（silverwind）[#6817](https://github.com/nodejs/node/pull/6817)
* \[[`126fdc3171`](https://github.com/nodejs/node/commit/126fdc3171)] - **doc**: 修复与页面滚动相关的问题（Roman Reiss）
* \[[`29e25d8489`](https://github.com/nodejs/node/commit/29e25d8489)] - **doc**: 添加运行 addons + npm 测试的步骤（Myles Borins）[#6231](https://github.com/nodejs/node/pull/6231)
* \[[`fcc6a347f7`](https://github.com/nodejs/node/commit/fcc6a347f7)] - **doc**: 去除 CHANGELOG 中隐蔽的硬制表符（Myles Borins）[#6608](https://github.com/nodejs/node/pull/6608)
* \[[`369569018e`](https://github.com/nodejs/node/commit/369569018e)] - **doc**: 回退已回移植的提交（Myles Borins）[#6530](https://github.com/nodejs/node/pull/6530)
* \[[`4ec9ae8a1c`](https://github.com/nodejs/node/commit/4ec9ae8a1c)] - **doc**: 解释 node 与浏览器中 console.assert 的差异（James M Snell）[#6169](https://github.com/nodejs/node/pull/6169)
* \[[`df5ce6fad4`](https://github.com/nodejs/node/commit/df5ce6fad4)] - **doc**: 不支持原生模块重新加载（Bryan English）[#6168](https://github.com/nodejs/node/pull/6168)
* \[[`30f354f72b`](https://github.com/nodejs/node/commit/30f354f72b)] - **doc**: 澄清 linux、os x 上的 fs.watch() 和 inode（Joran Dirk Greef）[#6099](https://github.com/nodejs/node/pull/6099)
* \[[`29f821b73d`](https://github.com/nodejs/node/commit/29f821b73d)] - **doc**: 澄清 http.serverResponse 的实现（Allen Hernandez）[#6072](https://github.com/nodejs/node/pull/6072)
* \[[`6d560094f4`](https://github.com/nodejs/node/commit/6d560094f4)] - **doc**: stream.markdown 中参数格式的细微调整（James M Snell）[#6016](https://github.com/nodejs/node/pull/6016)
* \[[`6a197ec617`](https://github.com/nodejs/node/commit/6a197ec617)] - **doc**: 修复 http response 事件、Agent#getName（Matthew Douglass）[#5993](https://github.com/nodejs/node/pull/5993)
* \[[`620a261240`](https://github.com/nodejs/node/commit/620a261240)] - **http**: 禁止发送明显无效的状态码（Brian White）[#6291](https://github.com/nodejs/node/pull/6291)
* \[[`9a8b53124d`](https://github.com/nodejs/node/commit/9a8b53124d)] - **http**: 在 parser execute 时取消 socket timer 的引用（Fedor Indutny）[#6286](https://github.com/nodejs/node/pull/6286)
* \[[`b28e44deb2`](https://github.com/nodejs/node/commit/b28e44deb2)] - **http**: 更正 Host header 中的 IPv6 地址（Mihai Potra）[#5314](https://github.com/nodejs/node/pull/5314)
* \[[`2fac15ba94`](https://github.com/nodejs/node/commit/2fac15ba94)] - **src**: 修复 FindFirstCharacter 参数对齐（Anna Henningsen）[#6511](https://github.com/nodejs/node/pull/6511)
* \[[`2942cff069`](https://github.com/nodejs/node/commit/2942cff069)] - **src**: 添加缺失的 'inline' 关键字（Ben Noordhuis）[#6056](https://github.com/nodejs/node/pull/6056)
* \[[`e0eebf412e`](https://github.com/nodejs/node/commit/e0eebf412e)] - **src,tools**: 从源码数组中移除 null sentinel（Ben Noordhuis）[#5418](https://github.com/nodejs/node/pull/5418)
* \[[`8f18414cd5`](https://github.com/nodejs/node/commit/8f18414cd5)] - **src,tools**: 从内置源代码中移除空字节（Ben Noordhuis）[#5418](https://github.com/nodejs/node/pull/5418)
* \[[`d7a3ea457b`](https://github.com/nodejs/node/commit/d7a3ea457b)] - **src,tools**: 允许内置 JS 源代码中使用 UTF-8（Ben Noordhuis）[#5418](https://github.com/nodejs/node/pull/5418)
* \[[`51c0808b55`](https://github.com/nodejs/node/commit/51c0808b55)] - **stream**: 修复 readableState.awaitDrain 机制（Anna Henningsen）[#6023](https://github.com/nodejs/node/pull/6023)
* \[[`49a5941d30`](https://github.com/nodejs/node/commit/49a5941d30)] - **test**: 修复 test-debug-port-cluster 的不稳定性（Rich Trott）[#6769](https://github.com/nodejs/node/pull/6769)
* \[[`f8144e4c4a`](https://github.com/nodejs/node/commit/f8144e4c4a)] - **test**: 为 test-debug-port-cluster 添加日志（Rich Trott）[#6769](https://github.com/nodejs/node/pull/6769)
* \[[`773ea20d0e`](https://github.com/nodejs/node/commit/773ea20d0e)] - **test**: 在 tap 输出中包含 component（Ben Noordhuis）[#6653](https://github.com/nodejs/node/pull/6653)
* \[[`333369e1ff`](https://github.com/nodejs/node/commit/333369e1ff)] - **test**: 提高 AIX 的平台超时时间（Michael Dawson）[#6342](https://github.com/nodejs/node/pull/6342)
* \[[`06e5fafe84`](https://github.com/nodejs/node/commit/06e5fafe84)] - **test**: 添加 console.assert 测试（Evan Lucas）[#6302](https://github.com/nodejs/node/pull/6302)
* \[[`f60ba54811`](https://github.com/nodejs/node/commit/f60ba54811)] - **test**: 添加 zlib close-after-error 回归测试（Anna Henningsen）[#6270](https://github.com/nodejs/node/pull/6270)
* \[[`24ac16f4be`](https://github.com/nodejs/node/commit/24ac16f4be)] - **test**: 修复 flaky 的 test-http-set-timeout-server（Santiago Gimeno）[#6248](https://github.com/nodejs/node/pull/6248)
* \[[`5002a71357`](https://github.com/nodejs/node/commit/5002a71357)] - **test**: assert - 修正错误消息以匹配测试。（surya panikkal）[#6241](https://github.com/nodejs/node/pull/6241)
* \[[`0f9405dd33`](https://github.com/nodejs/node/commit/0f9405dd33)] - **test**: 将更多测试从顺序执行改为并行执行（Santiago Gimeno）[#6187](https://github.com/nodejs/node/pull/6187)
* \[[`37cc249218`](https://github.com/nodejs/node/commit/37cc249218)] - **test**: 修复 test-net-settimeout 的不稳定性（Santiago Gimeno）[#6166](https://github.com/nodejs/node/pull/6166)
* \[[`69dcbb642f`](https://github.com/nodejs/node/commit/69dcbb642f)] - **test**: 修复 flaky 的 test-child-process-fork-net（Rich Trott）[#6138](https://github.com/nodejs/node/pull/6138)
* \[[`a97a6a9d69`](https://github.com/nodejs/node/commit/a97a6a9d69)] - **test**: 修复 ESLint 2.7.0 的问题（silverwind）[#6132](https://github.com/nodejs/node/pull/6132)
* \[[`a865975909`](https://github.com/nodejs/node/commit/a865975909)] - **test**: 修复 flaky 的 test-http-client-abort（Rich Trott）[#6124](https://github.com/nodejs/node/pull/6124)
* \[[`25d4b5b1e9`](https://github.com/nodejs/node/commit/25d4b5b1e9)] - **test**: 将一些测试从顺序执行改为并行执行（Santiago Gimeno）[#6087](https://github.com/nodejs/node/pull/6087)
* \[[`28040ccf49`](https://github.com/nodejs/node/commit/28040ccf49)] - **test**: 重构 test-file-write-stream3（Rich Trott）[#6050](https://github.com/nodejs/node/pull/6050)
* \[[`3a67a05ed4`](https://github.com/nodejs/node/commit/3a67a05ed4)] - **test**: 为 test-domain-crypto 强制使用严格模式（Rich Trott）[#6047](https://github.com/nodejs/node/pull/6047)
* \[[`0b376cb3f9`](https://github.com/nodejs/node/commit/0b376cb3f9)] - **test**: 修复 pummel 测试失败（Rich Trott）[#6012](https://github.com/nodejs/node/pull/6012)
* \[[`7b60b8f8e9`](https://github.com/nodejs/node/commit/7b60b8f8e9)] - **test**: 修复 stringbytes-external 的不稳定性（Ali Ijaz Sheikh）[#6705](https://github.com/nodejs/node/pull/6705)
* \[[`cc4c5187ed`](https://github.com/nodejs/node/commit/cc4c5187ed)] - **test**: 确保 test-npm-install 使用正确的 node（Myles Borins）[#6658](https://github.com/nodejs/node/pull/6658)
* \[[`3d4d5777bc`](https://github.com/nodejs/node/commit/3d4d5777bc)] - **test**: 重构 http-end-throw-socket-handling（Santiago Gimeno）[#5676](https://github.com/nodejs/node/pull/5676)
* \[[`c76f214b90`](https://github.com/nodejs/node/commit/c76f214b90)] - **test,tools**: 为未定义变量启用 lint 检查（Rich Trott）[#6255](https://github.com/nodejs/node/pull/6255)
* \[[`9222689215`](https://github.com/nodejs/node/commit/9222689215)] - **test,vm**: 为 vm 测试启用严格模式（Rich Trott）[#6209](https://github.com/nodejs/node/pull/6209)
* \[[`b8c9d6b64e`](https://github.com/nodejs/node/commit/b8c9d6b64e)] - **tools**: 为 v8\_prof\_processor.js 启用 lint 检查（Rich Trott）[#6262](https://github.com/nodejs/node/pull/6262)
* \[[`8fa202947d`](https://github.com/nodejs/node/commit/8fa202947d)] - **tools**: 为 assert.fail() 添加 lint 规则（Rich Trott）[#6261](https://github.com/nodejs/node/pull/6261)
* \[[`1aa6c5b7a9`](https://github.com/nodejs/node/commit/1aa6c5b7a9)] - **tools**: 将 ESLint 更新到 2.7.0（silverwind）[#6132](https://github.com/nodejs/node/pull/6132)
* \[[`68c7de4372`](https://github.com/nodejs/node/commit/68c7de4372)] - **tools**: 移除 simplejson 依赖（Sakthipriyan Vairamani）[#6101](https://github.com/nodejs/node/pull/6101)
* \[[`4fb4ba98a8`](https://github.com/nodejs/node/commit/4fb4ba98a8)] - **tools**: 移除对已禁用规则的禁用（Rich Trott）[#6013](https://github.com/nodejs/node/pull/6013)
* \[[`4e6ea7f01a`](https://github.com/nodejs/node/commit/4e6ea7f01a)] - **tools**: 移除过时的 npm test-legacy 命令（Kat Marchán）
* \[[`4c73ab4302`](https://github.com/nodejs/node/commit/4c73ab4302)] - **tools,doc**: 修复分组可选参数的 json（firedfox）[#5977](https://github.com/nodejs/node/pull/5977)
* \[[`c893cd33d1`](https://github.com/nodejs/node/commit/c893cd33d1)] - **tools,doc**: 在所有地方解析花括号中的类型（Alexander Makarenko）[#5329](https://github.com/nodejs/node/pull/5329)
* \[[`48684af55f`](https://github.com/nodejs/node/commit/48684af55f)] - **zlib**: 修复调用 .close 时的 use after null（James Lal）[#5982](https://github.com/nodejs/node/pull/5982)

<a id="4.4.4"></a>

## 2016-05-05，版本 4.4.4 'Argon' (LTS)，@thealphanerd

### 显著变更

* **deps**:
  * 将 openssl 更新到 1.0.2h。（Shigeki Ohtsu）[#6551](https://github.com/nodejs/node/pull/6551)
    * 有关此版本安全内容的更多信息，请参阅我们的[博客文章](https://nodejs.org/en/blog/vulnerability/openssl-may-2016/)。

### 提交

* \[[`f46952e727`](https://github.com/nodejs/node/commit/f46952e727)] - **buffer**：防止意外的 kNoZeroFill（Сковорода Никита Андреевич）[nodejs/node-private#30](https://github.com/nodejs/node-private/pull/30)
* \[[`4f1c82f995`](https://github.com/nodejs/node/commit/4f1c82f995)] - **streams**：支持无限次同步 cork/uncork 循环（Matteo Collina）[#6164](https://github.com/nodejs/node/pull/6164)
* \[[`1efd96c767`](https://github.com/nodejs/node/commit/1efd96c767)] - **deps**：更新 openssl asm 和 asm_obsolete 文件（Shigeki Ohtsu）[#6551](https://github.com/nodejs/node/pull/6551)
* \[[`c450f4a293`](https://github.com/nodejs/node/commit/c450f4a293)] - **deps**：为 openssl s_client 添加 -no_rand_screen（Shigeki Ohtsu）[nodejs/io.js#1836](https://github.com/nodejs/io.js/pull/1836)
* \[[`baedfbae6a`](https://github.com/nodejs/node/commit/baedfbae6a)] - **openssl**：修复 win32 上应用程序中的按键要求（Shigeki Ohtsu）[iojs/io.js#1389](https://github.com/iojs/io.js/pull/1389)
* \[[`ff3045e40b`](https://github.com/nodejs/node/commit/ff3045e40b)] - **deps**：修复 x86_win32 中 openssl 的 asm 构建错误（Shigeki Ohtsu）[iojs/io.js#1389](https://github.com/iojs/io.js/pull/1389)
* \[[`dc8dc97db3`](https://github.com/nodejs/node/commit/dc8dc97db3)] - **deps**：修复 ia32 win32 上 openssl 的汇编错误（Fedor Indutny）[iojs/io.js#1389](https://github.com/iojs/io.js/pull/1389)
* \[[`2dfeb01213`](https://github.com/nodejs/node/commit/2dfeb01213)] - **deps**：将所有 openssl 头文件复制到 include 目录（Shigeki Ohtsu）[#6551](https://github.com/nodejs/node/pull/6551)
* \[[`72f9952516`](https://github.com/nodejs/node/commit/72f9952516)] - **deps**：将 openssl 源码升级到 1.0.2h（Shigeki Ohtsu）[#6551](https://github.com/nodejs/node/pull/6551)

<a id="4.4.3"></a>

## 2016-04-12，版本 4.4.3 'Argon' (LTS)，@thealphanerd

### 显著变更

* **deps**:
  * 为嵌入者修复 `--gdbjit`。已从 v8 上游回移植。（Ben Noordhuis）[#5577](https://github.com/nodejs/node/pull/5577)
* **etw**:
  * 在 Windows 平台上正确显示 ETW 事件 9 和 23 的描述符。（João Reis）[#5742](https://github.com/nodejs/node/pull/5742)
* **querystring**:
  * 恢复在尝试字符串化错误的代理对时抛出异常。（Brian White）[#5858](https://github.com/nodejs/node/pull/5858)

### 提交

* \[[`f949c273cd`](https://github.com/nodejs/node/commit/f949c273cd)] - **assert**：检查 deepEqual 中的 typed array 视图类型（Anna Henningsen）[#5910](https://github.com/nodejs/node/pull/5910)
* \[[`132acea0d4`](https://github.com/nodejs/node/commit/132acea0d4)] - **build**：为 lint/benchmark 引入 CI 目标（Johan Bergström）[#5921](https://github.com/nodejs/node/pull/5921)
* \[[`9a8f922dee`](https://github.com/nodejs/node/commit/9a8f922dee)] - **build**：将缺失的 `openssl_fips%` 添加到 common.gypi（Fedor Indutny）[#5919](https://github.com/nodejs/node/pull/5919)
* \[[`d275cdf202`](https://github.com/nodejs/node/commit/d275cdf202)] - **child_process**：重构 socket_list 中的 self=this（Benjamin Gruenbaum）[#5860](https://github.com/nodejs/node/pull/5860)
* \[[`aadf356aa2`](https://github.com/nodejs/node/commit/aadf356aa2)] - **deps**：从 v8 上游回移植 8d00c2c（Ben Noordhuis）[#5577](https://github.com/nodejs/node/pull/5577)
* \[[`200f763c43`](https://github.com/nodejs/node/commit/200f763c43)] - **deps**：在 LTS 中将 npm 完全升级到 2.15.1（Forrest L Norvell）[#5989](https://github.com/nodejs/node/pull/5989)
* \[[`86e3903626`](https://github.com/nodejs/node/commit/86e3903626)] - **dns**：使用不带原型的对象作为映射（Benjamin Gruenbaum）[#5843](https://github.com/nodejs/node/pull/5843)
* \[[`9a33f43f73`](https://github.com/nodejs/node/commit/9a33f43f73)] - **doc**：使用 license-builder.sh 更新 openssl LICENSE（Steven R. Loomis）[#6065](https://github.com/nodejs/node/pull/6065)
* \[[`9679e2dc70`](https://github.com/nodejs/node/commit/9679e2dc70)] - **doc**：澄清 __dirname 是模块局部的（James M Snell）[#6018](https://github.com/nodejs/node/pull/6018)
* \[[`86d2af58d6`](https://github.com/nodejs/node/commit/86d2af58d6)] - **doc**：简单修正文档拼写错误（Brendon Pierson）[#6041](https://github.com/nodejs/node/pull/6041)
* \[[`f16802f3ca`](https://github.com/nodejs/node/commit/f16802f3ca)] - **doc**：关于 Android 支持的说明（Rich Trott）[#6040](https://github.com/nodejs/node/pull/6040)
* \[[`8c2befe176`](https://github.com/nodejs/node/commit/8c2befe176)] - **doc**：注明 assert.throws() 的陷阱（Rich Trott）[#6029](https://github.com/nodejs/node/pull/6029)
* \[[`0870ac65f2`](https://github.com/nodejs/node/commit/0870ac65f2)] - **doc**：尽可能对链接使用 HTTPS（Rich Trott）[#6019](https://github.com/nodejs/node/pull/6019)
* \[[`56755de96e`](https://github.com/nodejs/node/commit/56755de96e)] - **doc**：澄清回调中的 stdout/stderr 参数（James M Snell）[#6015](https://github.com/nodejs/node/pull/6015)
* \[[`bb603b89a2`](https://github.com/nodejs/node/commit/bb603b89a2)] - **doc**：在“单页查看”中添加“命令行选项”（firedfox）[#6011](https://github.com/nodejs/node/pull/6011)
* \[[`c91f3d897a`](https://github.com/nodejs/node/commit/c91f3d897a)] - **doc**：补充如何使用 curl 获取 SHA256.txt 的说明（Myles Borins）[#6120](https://github.com/nodejs/node/pull/6120)
* \[[`f9cf232284`](https://github.com/nodejs/node/commit/f9cf232284)] - **doc**：添加使用未直接暴露算法的示例（Brad Hill）[#6108](https://github.com/nodejs/node/pull/6108)
* \[[`f60ce1078d`](https://github.com/nodejs/node/commit/f60ce1078d)] - **doc**：记录 buf.write* 方法未指定的行为（James M Snell）[#5925](https://github.com/nodejs/node/pull/5925)
* \[[`02401a6cbd`](https://github.com/nodejs/node/commit/02401a6cbd)] - **doc**：修复 iOS 设备上的滚动问题（Luigi Pinca）[#5878](https://github.com/nodejs/node/pull/5878)
* \[[`aed22d0855`](https://github.com/nodejs/node/commit/aed22d0855)] - **doc**：为 path.format 提供更多示例（John Eversole）[#5838](https://github.com/nodejs/node/pull/5838)
* \[[`6e2bfbe1fd`](https://github.com/nodejs/node/commit/6e2bfbe1fd)] - **doc**：修复 Buffer.readInt32LE() 的文档（ghaiklor）[#5890](https://github.com/nodejs/node/pull/5890)
* \[[`940d204401`](https://github.com/nodejs/node/commit/940d204401)] - **doc**：将 timers 文档整合到 timers.markdown 中（Bryan English）[#5837](https://github.com/nodejs/node/pull/5837)
* \[[`505faf6360`](https://github.com/nodejs/node/commit/505faf6360)] - **doc**：完善 child_process 的 detach 行为说明（Robert Jefe Lindstaedt）[#5330](https://github.com/nodejs/node/pull/5330)
* \[[`feedca7879`](https://github.com/nodejs/node/commit/feedca7879)] - **doc**：添加主题——事件循环、定时器、`nextTick()`（Jeff Harris）[#4936](https://github.com/nodejs/node/pull/4936)
* \[[`6d3822c12b`](https://github.com/nodejs/node/commit/6d3822c12b)] - **etw**：修复事件 9 和 23 的描述符（João Reis）[#5742](https://github.com/nodejs/node/pull/5742)
* \[[`56dda6f336`](https://github.com/nodejs/node/commit/56dda6f336)] - **fs**：移除未使用的分支（Benjamin Gruenbaum）[#5289](https://github.com/nodejs/node/pull/5289)
* \[[`dfe9e157c1`](https://github.com/nodejs/node/commit/dfe9e157c1)] - **governance**：移除 CTC 的目标规模（Rich Trott）[#5879](https://github.com/nodejs/node/pull/5879)
* \[[`c4103b154f`](https://github.com/nodejs/node/commit/c4103b154f)] - **lib**：使用 startsWith/endsWith 重构代码（Jackson Tian）[#5753](https://github.com/nodejs/node/pull/5753)
* \[[`16216a81de`](https://github.com/nodejs/node/commit/16216a81de)] - **meta**：在 WORKING_GROUPS.md 中添加“加入 wg”部分（Matteo Collina）[#5488](https://github.com/nodejs/node/pull/5488)
* \[[`65fc4e36ce`](https://github.com/nodejs/node/commit/65fc4e36ce)] - **querystring**：不要字符串化错误的代理对（Brian White）[#5858](https://github.com/nodejs/node/pull/5858)
* \[[`4f683ab912`](https://github.com/nodejs/node/commit/4f683ab912)] - **src,tools**：使用模板字面量（Rich Trott）[#5778](https://github.com/nodejs/node/pull/5778)
* \[[`ac40a4510d`](https://github.com/nodejs/node/commit/ac40a4510d)] - **test**：在 test-repl 中显式设置 global（Rich Trott）[#6026](https://github.com/nodejs/node/pull/6026)
* \[[`a7b3a7533a`](https://github.com/nodejs/node/commit/a7b3a7533a)] - **test**：明确说明对 `global` 的污染（Rich Trott）[#6017](https://github.com/nodejs/node/pull/6017)
* \[[`73e3b7b9a8`](https://github.com/nodejs/node/commit/73e3b7b9a8)] - **test**：显式使用全局变量（Rich Trott）[#6014](https://github.com/nodejs/node/pull/6014)
* \[[`e7877e61b6`](https://github.com/nodejs/node/commit/e7877e61b6)] - **test**：修复不稳定的 test-net-socket-timeout-unref（Rich Trott）[#6003](https://github.com/nodejs/node/pull/6003)
* \[[`a39051f5b3`](https://github.com/nodejs/node/commit/a39051f5b3)] - **test**：让 status 文件中可用 arch（Santiago Gimeno）[#5997](https://github.com/nodejs/node/pull/5997)
* \[[`ccf90b651a`](https://github.com/nodejs/node/commit/ccf90b651a)] - **test**：修复 test-dns.js 的不稳定问题（Rich Trott）[#5996](https://github.com/nodejs/node/pull/5996)
* \[[`1994ac0912`](https://github.com/nodejs/node/commit/1994ac0912)] - **test**：添加从 stdin 管道传入大输入的测试（Anna Henningsen）[#5949](https://github.com/nodejs/node/pull/5949)
* \[[`cc1aab9f6a`](https://github.com/nodejs/node/commit/cc1aab9f6a)] - **test**：缓解不稳定的 test-https-agent（Rich Trott）[#5939](https://github.com/nodejs/node/pull/5939)
* \[[`10fe79b809`](https://github.com/nodejs/node/commit/10fe79b809)] - **test**：修复违反 max-len 的 lint 错误（Sakthipriyan Vairamani）[#5980](https://github.com/nodejs/node/pull/5980)
* \[[`63d82960fd`](https://github.com/nodejs/node/commit/63d82960fd)] - **test**：stdin 并不总是 net.Socket（Jeremiah Senkpiel）[#5935](https://github.com/nodejs/node/pull/5935)
* \[[`fe0233b923`](https://github.com/nodejs/node/commit/fe0233b923)] - **test**：为 GH-2148 添加 known_issues 测试（Rich Trott）[#5920](https://github.com/nodejs/node/pull/5920)
* \[[`d59be4d248`](https://github.com/nodejs/node/commit/d59be4d248)] - **test**：确保 _handle 属性存在（Rich Trott）[#5916](https://github.com/nodejs/node/pull/5916)
* \[[`9702153107`](https://github.com/nodejs/node/commit/9702153107)] - **test**：修复不稳定的 test-repl（Brian White）[#5914](https://github.com/nodejs/node/pull/5914)
* \[[`a0a2e69097`](https://github.com/nodejs/node/commit/a0a2e69097)] - **test**：将 dns 测试移动到 test/internet（Ben Noordhuis）[#5905](https://github.com/nodejs/node/pull/5905)
* \[[`8462d8f465`](https://github.com/nodejs/node/commit/8462d8f465)] - **test**：修复不稳定的 test-net-socket-timeout（Brian White）[#5902](https://github.com/nodejs/node/pull/5902)
* \[[`e0b283af73`](https://github.com/nodejs/node/commit/e0b283af73)] - **test**：修复不稳定的 test-http-set-timeout（Rich Trott）[#5856](https://github.com/nodejs/node/pull/5856)
* \[[`5853fec36f`](https://github.com/nodejs/node/commit/5853fec36f)] - **test**：修复 test-debugger-client.js（Rich Trott）[#5851](https://github.com/nodejs/node/pull/5851)
* \[[`ea83c382f9`](https://github.com/nodejs/node/commit/ea83c382f9)] - **test**：确保 win32.isAbsolute() 的一致性（Brian White）[#6043](https://github.com/nodejs/node/pull/6043)
* \[[`c33a23fd1e`](https://github.com/nodejs/node/commit/c33a23fd1e)] - **tools**：修复 json 文档生成（firedfox）[#5943](https://github.com/nodejs/node/pull/5943)
* \[[`6f0bd64122`](https://github.com/nodejs/node/commit/6f0bd64122)] - **tools,doc**：修复 doctool 生成的不完整 json（firedfox）[#5966](https://github.com/nodejs/node/pull/5966)
* \[[`f7eb48302c`](https://github.com/nodejs/node/commit/f7eb48302c)] - **win,build**：在 test-ci 上构建并测试 add-ons（Bogdan Lobor）[#5886](https://github.com/nodejs/node/pull/5886)

<a id="4.4.2"></a>

## 2016-03-31，版本 4.4.2 'Argon'（LTS），@thealphanerd

### 重要变更

* **https**:
  * 在某些条件下，当启用 keepalive 时，ssl sockets 可能会导致内存泄漏。现在不再存在这个问题。(Alexander Penev) [#5713](https://github.com/nodejs/node/pull/5713)
* **lib**:
  * 我们内部传递参数的方式会导致潜在的泄漏。通过将参数复制到数组中，我们可以避免这一点。(Nathan Woltman) [#4361](https://github.com/nodejs/node/pull/4361)
* **npm**:
  * 升级到 v2.15.1。修复了 HTTP 请求中认证令牌使用方式的一个安全漏洞，该漏洞可能允许攻击者搭建服务器，从命令行界面用户那里收集令牌。此前，对于已登录用户，CLI 发出的每个请求都会携带认证令牌，无论请求目标为何。此次更新通过仅在针对当前安装所使用的 registry 或 registries 发起请求时包含这些令牌来修复此问题。(Forrest L Norvell)
* **repl**:
  * 之前如果你在 strict mode 下使用 repl，堆栈跟踪中的列号会错误。现在这不再是问题。(Prince J Wesley) [#5416](https://github.com/nodejs/node/pull/5416)

### 提交

* \[[`96e163a79f`](https://github.com/nodejs/node/commit/96e163a79f)] - **buffer**: 将 for 循环中的 let 改回 var (Gareth Ellis) [#5819](https://github.com/nodejs/node/pull/5819)
* \[[`0c6f6742f2`](https://github.com/nodejs/node/commit/0c6f6742f2)] - **console**: 检查 stderr 是否可写 (Rich Trott) [#5635](https://github.com/nodejs/node/pull/5635)
* \[[`55c3f804c4`](https://github.com/nodejs/node/commit/55c3f804c4)] - **deps**: 在 LTS 中将 npm 升级到 2.15.1 (Forrest L Norvell)
* \[[`1d0e4a987d`](https://github.com/nodejs/node/commit/1d0e4a987d)] - **deps**: 移除未使用的 openssl 文件 (Ben Noordhuis) [#5619](https://github.com/nodejs/node/pull/5619)
* \[[`d55599f4d8`](https://github.com/nodejs/node/commit/d55599f4d8)] - **dns**: 使用模板字面量 (Benjamin Gruenbaum) [#5809](https://github.com/nodejs/node/pull/5809)
* \[[`42bbdc9dd1`](https://github.com/nodejs/node/commit/42bbdc9dd1)] - **doc** 将 @mhdawson 加回 CTC (James M Snell) [#5633](https://github.com/nodejs/node/pull/5633)
* \[[`8d86d232e7`](https://github.com/nodejs/node/commit/8d86d232e7)] - **doc**: 拼写错误：interal->internal. (Corey Kosak) [#5849](https://github.com/nodejs/node/pull/5849)
* \[[`60ddab841e`](https://github.com/nodejs/node/commit/60ddab841e)] - **doc**: 添加仅签署发布的说明 (Jeremiah Senkpiel) [#5876](https://github.com/nodejs/node/pull/5876)
* \[[`040263e0f3`](https://github.com/nodejs/node/commit/040263e0f3)] - **doc**: 改进 timers 文档中的语法、清晰度和链接 (Bryan English) [#5792](https://github.com/nodejs/node/pull/5792)
* \[[`8c24bd25a6`](https://github.com/nodejs/node/commit/8c24bd25a6)] - **doc**: 修复标题后列表结束标签的顺序 (firedfox) [#5874](https://github.com/nodejs/node/pull/5874)
* \[[`7c837028da`](https://github.com/nodejs/node/commit/7c837028da)] - **doc**: 使用一致的事件名参数 (Benjamin Gruenbaum) [#5850](https://github.com/nodejs/node/pull/5850)
* \[[`20faf9097d`](https://github.com/nodejs/node/commit/20faf9097d)] - **doc**: 解释缺少 main 文件时的错误消息 (Wolfgang Steiner) [#5812](https://github.com/nodejs/node/pull/5812)
* \[[`79d26ae196`](https://github.com/nodejs/node/commit/79d26ae196)] - **doc**: 解释 path.format 期望的属性 (John Eversole) [#5801](https://github.com/nodejs/node/pull/5801)
* \[[`e43e8e3a31`](https://github.com/nodejs/node/commit/e43e8e3a31)] - **doc**: 添加 cli options 文档页面 (Jeremiah Senkpiel) [#5787](https://github.com/nodejs/node/pull/5787)
* \[[`c0a24e4a1d`](https://github.com/nodejs/node/commit/c0a24e4a1d)] - **doc**: 修复 querystring 中多行 return 注释 (Claudio Rodriguez) [#5705](https://github.com/nodejs/node/pull/5705)
* \[[`bf1fe4693c`](https://github.com/nodejs/node/commit/bf1fe4693c)] - **doc**: 为 Path.format 添加 Windows 示例 (Mithun Patel) [#5700](https://github.com/nodejs/node/pull/5700)
* \[[`3b8fc4fddc`](https://github.com/nodejs/node/commit/3b8fc4fddc)] - **doc**: 更新 crypto 文档以使用更好的默认值 (Bill Automata) [#5505](https://github.com/nodejs/node/pull/5505)
* \[[`a6ec8a6cb7`](https://github.com/nodejs/node/commit/a6ec8a6cb7)] - **doc**: 修复 crypto update() 签名 (Brian White) [#5500](https://github.com/nodejs/node/pull/5500)
* \[[`eb0ed46665`](https://github.com/nodejs/node/commit/eb0ed46665)] - **doc**: 重新格式化并改进 node.1 手册页 (Jeremiah Senkpiel) [#5497](https://github.com/nodejs/node/pull/5497)
* \[[`b70ca4a4b4`](https://github.com/nodejs/node/commit/b70ca4a4b4)] - **doc**: 更新 fs #5862，移除 fs.markdown 中无关的数据 (topal) [#5877](https://github.com/nodejs/node/pull/5877)
* \[[`81876612f7`](https://github.com/nodejs/node/commit/81876612f7)] - **https**: 修复在使用 keepalive 时的 ssl socket 泄漏 (Alexander Penev) [#5713](https://github.com/nodejs/node/pull/5713)
* \[[`6daebdbd9b`](https://github.com/nodejs/node/commit/6daebdbd9b)] - **lib**: 使用 String.prototype.repeat() 简化代码 (Jackson Tian) [#5359](https://github.com/nodejs/node/pull/5359)
* \[[`108fc90dd7`](https://github.com/nodejs/node/commit/108fc90dd7)] - **lib**: 减少 `self = this` 的使用 (Jackson Tian) [#5231](https://github.com/nodejs/node/pull/5231)
* \[[`3c8e59c396`](https://github.com/nodejs/node/commit/3c8e59c396)] - **lib**: 复制 arguments 对象而不是泄漏它 (Nathan Woltman) [#4361](https://github.com/nodejs/node/pull/4361)
* \[[`8648420586`](https://github.com/nodejs/node/commit/8648420586)] - **net**: 让 `isIPv4` 和 `isIPv6` 更高效 (Vladimir Kurchatkin) [#5478](https://github.com/nodejs/node/pull/5478)
* \[[`07b7172d76`](https://github.com/nodejs/node/commit/07b7172d76)] - **net**: 从旧代码中移除未使用的 `var self = this` (Benjamin Gruenbaum) [#5224](https://github.com/nodejs/node/pull/5224)
* \[[`acbce4b72b`](https://github.com/nodejs/node/commit/acbce4b72b)] - **repl**: 修复 strict mode 下的堆栈跟踪列号 (Prince J Wesley) [#5416](https://github.com/nodejs/node/pull/5416)
* \[[`0a1eb168e0`](https://github.com/nodejs/node/commit/0a1eb168e0)] - **test**: 修复 `test-cluster-worker-kill` (Santiago Gimeno) [#5814](https://github.com/nodejs/node/pull/5814)
* \[[`86b876fe7b`](https://github.com/nodejs/node/commit/86b876fe7b)] - **test**: 为更小的 person.jpg 使用更小的块大小 (Jérémy Lal) [#5813](https://github.com/nodejs/node/pull/5813)
* \[[`1135ee97e7`](https://github.com/nodejs/node/commit/1135ee97e7)] - **test**: 从 person.jpg 中移除非自由 icc 配置文件 (Jérémy Lal) [#5813](https://github.com/nodejs/node/pull/5813)
* \[[`0836d7e2fb`](https://github.com/nodejs/node/commit/0836d7e2fb)] - **test**: 修复不稳定的 test-cluster-shared-leak (Claudio Rodriguez) [#5802](https://github.com/nodejs/node/pull/5802)
* \[[`e57355c2f4`](https://github.com/nodejs/node/commit/e57355c2f4)] - **test**: 改进 test-net-connect-options-ipv6.js (Michael Dawson) [#5791](https://github.com/nodejs/node/pull/5791)
* \[[`1b266fc15c`](https://github.com/nodejs/node/commit/1b266fc15c)] - **test**: 从测试套件中移除对 curl 的使用 (Santiago Gimeno) [#5750](https://github.com/nodejs/node/pull/5750)
* \[[`7e45d4f076`](https://github.com/nodejs/node/commit/7e45d4f076)] - **test**: 精简 test-http-get-pipeline-problem (Rich Trott) [#5728](https://github.com/nodejs/node/pull/5728)
* \[[`78effc3484`](https://github.com/nodejs/node/commit/78effc3484)] - **test**: 添加一批已知问题测试 (cjihrig) [#5653](https://github.com/nodejs/node/pull/5653)
* \[[`d506eea4b7`](https://github.com/nodejs/node/commit/d506eea4b7)] - **test**: 改进 test-npm-install (Santiago Gimeno) [#5613](https://github.com/nodejs/node/pull/5613)
* \[[`7520100e8b`](https://github.com/nodejs/node/commit/7520100e8b)] - **test**: 将 test-npm-install 添加到并行测试套件中 (Myles Borins) [#5166](https://github.com/nodejs/node/pull/5166)
* \[[`b258dddb8c`](https://github.com/nodejs/node/commit/b258dddb8c)] - **test**: repl tab 补全测试 (Santiago Gimeno) [#5534](https://github.com/nodejs/node/pull/5534)
* \[[`f209effe8b`](https://github.com/nodejs/node/commit/f209effe8b)] - **test**: 从 test-http-1.0 中移除 timer (Santiago Gimeno) [#5129](https://github.com/nodejs/node/pull/5129)
* \[[`3a901b0e3e`](https://github.com/nodejs/node/commit/3a901b0e3e)] - **tools**: 移除未使用的导入 (Sakthipriyan Vairamani) [#5765](https://github.com/nodejs/node/pull/5765)

<a id="4.4.1"></a>

## 2016-03-22，版本 4.4.1 'Argon'（LTS），@thealphanerd

此 LTS 版本包含 113 个提交，其中 56 个与文档相关，18 个与构建 / 工具相关，16 个与测试相关，7 个与基准测试相关。

### 重要变更

* **build**:
  * 更新了 OSX 和 Windows 安装程序的 Logos
    * (Rod Vagg) [#5401](https://github.com/nodejs/node/pull/5401)
    * (Robert Jefe Lindstaedt) [#5531](https://github.com/nodejs/node/pull/5531)
  * 在 Windows 安装程序中新增选择 VS 版本的选项
    * (julien.waechter) [#4645](https://github.com/nodejs/node/pull/4645)
  * 支持 Visual C++ Build Tools 2015
    * (João Reis) [#5627](https://github.com/nodejs/node/pull/5627)
* **tools**:
  * 现在 Gyp 可以在没有 XCode 的 OSX 上工作
    * (Shigeki Ohtsu) [nodejs/node#1325](https://github.com/nodejs/node/pull/1325)

### 提交

* \[[`df283f8a03`](https://github.com/nodejs/node/commit/df283f8a03)] - **benchmark**: 修复 lint 问题 (Rich Trott) [#5773](https://github.com/nodejs/node/pull/5773)
* \[[`c901741c60`](https://github.com/nodejs/node/commit/c901741c60)] - **benchmark**: 使用 strict mode (Rich Trott) [#5773](https://github.com/nodejs/node/pull/5773)
* \[[`4be2065dbc`](https://github.com/nodejs/node/commit/4be2065dbc)] - **benchmark**: 重构以消除重复声明的变量 (Rich Trott) [#5773](https://github.com/nodejs/node/pull/5773)
* \[[`ddac368533`](https://github.com/nodejs/node/commit/ddac368533)] - **benchmark**: 修复 lint 错误 (Rich Trott) [#5773](https://github.com/nodejs/node/pull/5773)
* \[[`03b20a73b9`](https://github.com/nodejs/node/commit/03b20a73b9)] - **benchmark**: 为 buf.compare() 添加基准测试 (Rich Trott) [#5441](https://github.com/nodejs/node/pull/5441)
* \[[`b816044845`](https://github.com/nodejs/node/commit/b816044845)] - **buffer**: 移除 fromObject 中重复的代码 (HUANG Wei) [#4948](https://github.com/nodejs/node/pull/4948)
* \[[`067ce9b905`](https://github.com/nodejs/node/commit/067ce9b905)] - **build**: 不安装 github templates (Johan Bergström) [#5612](https://github.com/nodejs/node/pull/5612)
* \[[`a1772dc515`](https://github.com/nodejs/node/commit/a1772dc515)] - **build**: 更新 OSX 安装程序上的 Node.js logo (Rod Vagg) [#5401](https://github.com/nodejs/node/pull/5401)
* \[[`9058fc0383`](https://github.com/nodejs/node/commit/9058fc0383)] - **build**: 正确检测 clang 版本 (Stefan Budeanu) [#5553](https://github.com/nodejs/node/pull/5553)
* \[[`1165ecc6f7`](https://github.com/nodejs/node/commit/1165ecc6f7)] - **build**: 更新 Win 安装程序上的 Node.js logo (Robert Jefe Lindstaedt) [#5531](https://github.com/nodejs/node/pull/5531)
* \[[`4990ddad72`](https://github.com/nodejs/node/commit/4990ddad72)] - **build**: 从 eslint 调用中移除 --quiet (firedfox) [#5519](https://github.com/nodejs/node/pull/5519)
* \[[`46a5d519dd`](https://github.com/nodejs/node/commit/46a5d519dd)] - **build**: 如果找不到 WiX，则跳过 msi 构建 (Tsarevich Dmitry) [#5220](https://github.com/nodejs/node/pull/5220)
* \[[`dac4e64491`](https://github.com/nodejs/node/commit/dac4e64491)] - **build**: 添加选择 VS 版本的选项 (julien.waechter) [#4645](https://github.com/nodejs/node/pull/4645)
* \[[`7a10fd3a56`](https://github.com/nodejs/node/commit/7a10fd3a56)] - **collaborator\_guide**: 澄清提交消息规则 (Wyatt Preul) [#5661](https://github.com/nodejs/node/pull/5661)
* \[[`97e95d04c2`](https://github.com/nodejs/node/commit/97e95d04c2)] - **crypto**: PBKDF2 适用于 `int` 而不是 `ssize_t` (Fedor Indutny) [#5397](https://github.com/nodejs/node/pull/5397)
* \[[`57b02e6a3e`](https://github.com/nodejs/node/commit/57b02e6a3e)] - **debugger**: 移除不需要的回调检查 (Rich Trott) [#5319](https://github.com/nodejs/node/pull/5319)
* \[[`19ae308867`](https://github.com/nodejs/node/commit/19ae308867)] - **deps**: 更新 openssl 配置 (Shigeki Ohtsu) [#5630](https://github.com/nodejs/node/pull/5630)
* \[[`d7b81b5bc7`](https://github.com/nodejs/node/commit/d7b81b5bc7)] - **deps**: 从 v8 的 4.8 upstream cherry-pick 2e4da65 (Michael Dawson) [#5293](https://github.com/nodejs/node/pull/5293)
* \[[`1e05f371d6`](https://github.com/nodejs/node/commit/1e05f371d6)] - **doc**: 修复同步 randomBytes 示例中的拼写错误 (Andrea Giammarchi) [#5781](https://github.com/nodejs/node/pull/5781)
* \[[`5f54bd2088`](https://github.com/nodejs/node/commit/5f54bd2088)] - **doc**: 主题：blocking 与 non-blocking (Jarrett Widman) [#5326](https://github.com/nodejs/node/pull/5326)
* \[[`0943001563`](https://github.com/nodejs/node/commit/0943001563)] - **doc**: 修复无效的 path 文档注释 (Rich Trott) [#5797](https://github.com/nodejs/node/pull/5797)
* \[[`bb423bb1e6`](https://github.com/nodejs/node/commit/bb423bb1e6)] - **doc**: 更新发布推文模板 (Jeremiah Senkpiel) [#5628](https://github.com/nodejs/node/pull/5628)
* \[[`1e877f10aa`](https://github.com/nodejs/node/commit/1e877f10aa)] - **doc**: 修复 child_process 文档中的拼写错误 (Benjamin Gruenbaum) [#5681](https://github.com/nodejs/node/pull/5681)
* \[[`d53dcc599b`](https://github.com/nodejs/node/commit/d53dcc599b)] - **doc**: 在 README 中更新 fansworld-claudio 的用户名 (Claudio Rodriguez) [#5680](https://github.com/nodejs/node/pull/5680)
* \[[`4332f8011e`](https://github.com/nodejs/node/commit/4332f8011e)] - **doc**: 修复 write 方法的返回值 (Felix Böhm) [#5736](https://github.com/nodejs/node/pull/5736)
* \[[`e572542de5`](https://github.com/nodejs/node/commit/e572542de5)] - **doc**: 添加关于使用 JSON.stringify() 的说明 (Mithun Patel) [#5723](https://github.com/nodejs/node/pull/5723)
* \[[`daf3ef66ef`](https://github.com/nodejs/node/commit/daf3ef66ef)] - **doc**: 解释 path.format() 算法 (Rich Trott) [#5688](https://github.com/nodejs/node/pull/5688)
* \[[`f6d4982aa0`](https://github.com/nodejs/node/commit/f6d4982aa0)] - **doc**: 澄清 zlib 中第一个参数的类型 (Kirill Fomichev) [#5685](https://github.com/nodejs/node/pull/5685)
* \[[`07e71b2d44`](https://github.com/nodejs/node/commit/07e71b2d44)] - **doc**: 修复 api/addons 中的拼写错误 (Daijiro Wachi) [#5678](https://github.com/nodejs/node/pull/5678)
* \[[`c6dc56175b`](https://github.com/nodejs/node/commit/c6dc56175b)] - **doc**: 移除连字符的非标准用法 (Stefano Vozza)
* \[[`4c92316972`](https://github.com/nodejs/node/commit/4c92316972)] - **doc**: 将 fansworld-claudio 添加到协作者中 (Claudio Rodriguez) [#5668](https://github.com/nodejs/node/pull/5668)
* \[[`0a6e883f85`](https://github.com/nodejs/node/commit/0a6e883f85)] - **doc**: 将 thekemkid 添加到协作者中 (Glen Keane) [#5667](https://github.com/nodejs/node/pull/5667)
* \[[`39c7d8a972`](https://github.com/nodejs/node/commit/39c7d8a972)] - **doc**: 将 AndreasMadsen 添加到协作者中 (Andreas Madsen) [#5666](https://github.com/nodejs/node/pull/5666)
* \[[`eec3008970`](https://github.com/nodejs/node/commit/eec3008970)] - **doc**: 将 whitlockjc 添加到协作者中 (Jeremy Whitlock) [#5665](https://github.com/nodejs/node/pull/5665)
* \[[`e5f254d83c`](https://github.com/nodejs/node/commit/e5f254d83c)] - **doc**: 将 benjamingr 添加到协作者列表中 (Benjamin Gruenbaum) [#5664](https://github.com/nodejs/node/pull/5664)
* \[[`3f718643c9`](https://github.com/nodejs/node/commit/3f718643c9)] - **doc**: 将 phillipj 添加到协作者中 (Phillip Johnsen) [#5663](https://github.com/nodejs/node/pull/5663)
* \[[`2d5527fe69`](https://github.com/nodejs/node/commit/2d5527fe69)] - **doc**: 将 mattloring 添加到协作者中 (Matt Loring) [#5662](https://github.com/nodejs/node/pull/5662)
* \[[`51763462bc`](https://github.com/nodejs/node/commit/51763462bc)] - **doc**: 在 'unhandledRejection' 示例中包含拼写错误 (Robert C Jensen) [#5654](https://github.com/nodejs/node/pull/5654)
* \[[`cae5da2f0a`](https://github.com/nodejs/node/commit/cae5da2f0a)] - **doc**: 修复 markdown 链接 (Steve Mao) [#5641](https://github.com/nodejs/node/pull/5641)
* \[[`b1b17efcb7`](https://github.com/nodejs/node/commit/b1b17efcb7)] - **doc**: 将构建说明移到新文档中 (Johan Bergström) [#5634](https://github.com/nodejs/node/pull/5634)
* \[[`13a8bde1fa`](https://github.com/nodejs/node/commit/13a8bde1fa)] - **doc**: 修复 dns.resolveCname 描述中的拼写错误 (axvm) [#5622](https://github.com/nodejs/node/pull/5622)
* \[[`1faea43c40`](https://github.com/nodejs/node/commit/1faea43c40)] - **doc**: 修复 fs.symlink 中的拼写错误 (Michaël Zasso) [#5560](https://github.com/nodejs/node/pull/5560)
* \[[`98a1bb6989`](https://github.com/nodejs/node/commit/98a1bb6989)] - **doc**: 为 test 目录中的目录编写文档 (Michael Barrett) [#5557](https://github.com/nodejs/node/pull/5557)
* \[[`04d3f8a741`](https://github.com/nodejs/node/commit/04d3f8a741)] - **doc**: 更新链接绿色以匹配主页 (silverwind) [#5548](https://github.com/nodejs/node/pull/5548)
* \[[`1afab6ac9c`](https://github.com/nodejs/node/commit/1afab6ac9c)] - **doc**: 添加关于 fs stat 中 birthtime 的说明 (Kári Tristan Helgason) [#5479](https://github.com/nodejs/node/pull/5479)
* \[[`d871ae2349`](https://github.com/nodejs/node/commit/d871ae2349)] - **doc**: 修复 child_process 文档中的拼写错误 (Evan Lucas) [#5474](https://github.com/nodejs/node/pull/5474)
* \[[`97a18bdbad`](https://github.com/nodejs/node/commit/97a18bdbad)] - **doc**: 更新 ROADMAP.md 和 doc/releases.md 中的 NAN URLs (ronkorving) [#5472](https://github.com/nodejs/node/pull/5472)
* \[[`d4a1fc7acd`](https://github.com/nodejs/node/commit/d4a1fc7acd)] - **doc**: 添加 Testing WG (Rich Trott) [#5461](https://github.com/nodejs/node/pull/5461)
* \[[`1642078580`](https://github.com/nodejs/node/commit/1642078580)] - **doc**: 修复 crypto 函数的缩进级别 (Brian White) [#5460](https://github.com/nodejs/node/pull/5460)
* \[[`2b0c7ad985`](https://github.com/nodejs/node/commit/2b0c7ad985)] - **doc**: 修复 tls、cluster 文档中的链接 (Alexander Makarenko) [#5364](https://github.com/nodejs/node/pull/5364)
* \[[`901dbabea6`](https://github.com/nodejs/node/commit/901dbabea6)] - **doc**: 修复 net 文档中的相对链接 (Evan Lucas) [#5358](https://github.com/nodejs/node/pull/5358)
* \[[`38d429172d`](https://github.com/nodejs/node/commit/38d429172d)] - **doc**: 修复 pbkdf2Sync 代码示例中的拼写错误 (Marc Cuva) [#5306](https://github.com/nodejs/node/pull/5306)
* \[[`d4cfc6f97c`](https://github.com/nodejs/node/commit/d4cfc6f97c)] - **doc**: 在 cluster 示例中添加缺失的属性 (Rafael Cepeda) [#5305](https://github.com/nodejs/node/pull/5305)
* \[[`b66d6b1458`](https://github.com/nodejs/node/commit/b66d6b1458)] - **doc**: 改进 httpVersionMajor / httpVersionMajor (Jackson Tian) [#5296](https://github.com/nodejs/node/pull/5296)
* \[[`70c872c9c4`](https://github.com/nodejs/node/commit/70c872c9c4)] - **doc**: 改进 unhandledException 文档文案 (James M Snell) [#5287](https://github.com/nodejs/node/pull/5287)
* \[[`ba5e0b6110`](https://github.com/nodejs/node/commit/ba5e0b6110)] - **doc**: 修复 buf.readInt16LE 输出 (Chinedu Francis Nwafili) [#5282](https://github.com/nodejs/node/pull/5282)
* \[[`1624d5b049`](https://github.com/nodejs/node/commit/1624d5b049)] - **doc**: 记录 base64url 编码支持 (Tristan Slominski) [#5243](https://github.com/nodejs/node/pull/5243)
* \[[`b1d580c9d2`](https://github.com/nodejs/node/commit/b1d580c9d2)] - **doc**: 更新 removeListener 行为 (Vaibhav) [#5201](https://github.com/nodejs/node/pull/5201)
* \[[`ca17f91ba8`](https://github.com/nodejs/node/commit/ca17f91ba8)] - **doc**: 添加关于二进制安全字符串读取的说明 (Anton Andesen) [#5155](https://github.com/nodejs/node/pull/5155)
* \[[`0830bb4950`](https://github.com/nodejs/node/commit/0830bb4950)] - **doc**: 说明何时调用 writable.write 回调 (Kevin Locke) [#4810](https://github.com/nodejs/node/pull/4810)
* \[[`17a74305c8`](https://github.com/nodejs/node/commit/17a74305c8)] - **doc**: 在文档中添加如何提交文档补丁的信息 (Sequoia McDowell) [#4591](https://github.com/nodejs/node/pull/4591)
* \[[`470a9ca909`](https://github.com/nodejs/node/commit/470a9ca909)] - **doc**: 添加入职资源 (Jeremiah Senkpiel) [#3726](https://github.com/nodejs/node/pull/3726)
* \[[`3168e6b486`](https://github.com/nodejs/node/commit/3168e6b486)] - **doc**: 更新 V8 URL (Craig Akimoto) [#5530](https://github.com/nodejs/node/pull/5530)
* \[[`04d16eb7e8`](https://github.com/nodejs/node/commit/04d16eb7e8)] - **doc**: 记录 fs.datasync(Sync) (Ron Korving) [#5402](https://github.com/nodejs/node/pull/5402)
* \[[`29646200f8`](https://github.com/nodejs/node/commit/29646200f8)] - **doc**: 将 Evan Lucas 添加到 CTC (Rod Vagg)
* \[[`a2a32b7810`](https://github.com/nodejs/node/commit/a2a32b7810)] - **doc**: 将 Rich Trott 添加到 CTC (Rod Vagg) [#5276](https://github.com/nodejs/node/pull/5276)
* \[[`4e469d5e47`](https://github.com/nodejs/node/commit/4e469d5e47)] - **doc**: 将 Ali Ijaz Sheikh 添加到 CTC (Rod Vagg) [#5277](https://github.com/nodejs/node/pull/5277)
* \[[`d09b44f59b`](https://github.com/nodejs/node/commit/d09b44f59b)] - **doc**: 将 Сковорода Никита Андреевич 添加到 CTC (Rod Vagg) [#5278](https://github.com/nodejs/node/pull/5278)
* \[[`ebbc64bc97`](https://github.com/nodejs/node/commit/ebbc64bc97)] - **doc**: 添加“building node with ninja”指南 (Jeremiah Senkpiel) [#4767](https://github.com/nodejs/node/pull/4767)
* \[[`67245fa0e3`](https://github.com/nodejs/node/commit/67245fa0e3)] - **doc**: 澄清行为准则举报方式 (Julie Pagano) [#5107](https://github.com/nodejs/node/pull/5107)
* \[[`cd78ff9706`](https://github.com/nodejs/node/commit/cd78ff9706)] - **doc**: 修复 Addons 文档中的链接 (Alexander Makarenko) [#5072](https://github.com/nodejs/node/pull/5072)
* \[[`20539954ff`](https://github.com/nodejs/node/commit/20539954ff)] - **docs**: 如果 tok type 是 code，则修复 man pages 链接 (Mithun Patel) [#5721](https://github.com/nodejs/node/pull/5721)
* \[[`38d7b0b6ea`](https://github.com/nodejs/node/commit/38d7b0b6ea)] - **docs**: 更新 iojs+release ci job 的链接 (Myles Borins) [#5632](https://github.com/nodejs/node/pull/5632)
* \[[`f982632f90`](https://github.com/nodejs/node/commit/f982632f90)] - **http**: 移除旧的、令人困惑的注释 (Brian White) [#5233](https://github.com/nodejs/node/pull/5233)
* \[[`ca5d7a8bb6`](https://github.com/nodejs/node/commit/ca5d7a8bb6)] - **http**: 移除不必要的检查 (Brian White) [#5233](https://github.com/nodejs/node/pull/5233)
* \[[`2ce83bd8f9`](https://github.com/nodejs/node/commit/2ce83bd8f9)] - **http,util**: 修复注释中的拼写错误 (Alexander Makarenko) [#5279](https://github.com/nodejs/node/pull/5279)
* \[[`b690916e5a`](https://github.com/nodejs/node/commit/b690916e5a)] - **lib**: freelist: 使用 .pop() 进行分配 (Anton Khlynovskiy) [#2174](https://github.com/nodejs/node/pull/2174)
* \[[`e7f45f0a17`](https://github.com/nodejs/node/commit/e7f45f0a17)] - **repl**: 处理正则表达式字面量中的引号 (Prince J Wesley) [#5117](https://github.com/nodejs/node/pull/5117)
* \[[`7c3b844f78`](https://github.com/nodejs/node/commit/7c3b844f78)] - **src**: 在空查找时返回 UV_EAI_NODATA (cjihrig) [#4715](https://github.com/nodejs/node/pull/4715)
* \[[`242a65e930`](https://github.com/nodejs/node/commit/242a65e930)] - **stream**: 防止 TransformState 中的对象映射更改 (Evan Lucas) [#5032](https://github.com/nodejs/node/pull/5032)
* \[[`fb5ba6b928`](https://github.com/nodejs/node/commit/fb5ba6b928)] - **stream**: 防止 ReadableState 中的对象映射更改 (Evan Lucas) [#4761](https://github.com/nodejs/node/pull/4761)
* \[[`04db9efd78`](https://github.com/nodejs/node/commit/04db9efd78)] - **stream**: 修复部分解码时没有数据的问题 (Brian White) [#5226](https://github.com/nodejs/node/pull/5226)
* \[[`cc0e36ff98`](https://github.com/nodejs/node/commit/cc0e36ff98)] - **string_decoder**: 修复性能回归 (Brian White) [#5134](https://github.com/nodejs/node/pull/5134)
* \[[`666d3690d8`](https://github.com/nodejs/node/commit/666d3690d8)] - **test**: 对一个 strict 函数执行 eval (Kári Tristan Helgason) [#5250](https://github.com/nodejs/node/pull/5250)
* \[[`9952bcf203`](https://github.com/nodejs/node/commit/9952bcf203)] - **test**: vm 函数重定义的 bug 复现 (cjihrig) [#5528](https://github.com/nodejs/node/pull/5528)
* \[[`063f22f1f0`](https://github.com/nodejs/node/commit/063f22f1f0)] - **test**: 检查 memoryUsage 属性，之前没有检查 memoryUsage 上的属性，此提交将它们检查出来。(Wyatt Preul) [#5546](https://github.com/nodejs/node/pull/5546)
* \[[`7a0fcfc127`](https://github.com/nodejs/node/commit/7a0fcfc127)] - **test**: 移除损坏的 debugger 场景 (Rich Trott) [#5532](https://github.com/nodejs/node/pull/5532)
* \[[`ba9ad2662c`](https://github.com/nodejs/node/commit/ba9ad2662c)] - **test**: 仅将 Linux 解决方法应用于 Linux (Rich Trott) [#5471](https://github.com/nodejs/node/pull/5471)
* \[[`4aa2c03d31`](https://github.com/nodejs/node/commit/4aa2c03d31)] - **test**: 增加 test-tls-fast-writing 的超时时间 (Rich Trott) [#5466](https://github.com/nodejs/node/pull/5466)
* \[[`b4ef644ce4`](https://github.com/nodejs/node/commit/b4ef644ce4)] - **test**: 针对已知 SmartOS bug 重试 (Rich Trott) [#5454](https://github.com/nodejs/node/pull/5454)
* \[[`d681bf24b5`](https://github.com/nodejs/node/commit/d681bf24b5)] - **test**: 修复不稳定的 child-process-fork-regr-gh-2847 (Santiago Gimeno) [#5422](https://github.com/nodejs/node/pull/5422)
* \[[`b4fbe04514`](https://github.com/nodejs/node/commit/b4fbe04514)] - **test**: 修复 OS X 上的 test-timers.reliability (Rich Trott) [#5379](https://github.com/nodejs/node/pull/5379)
* \[[`99269ffdbf`](https://github.com/nodejs/node/commit/99269ffdbf)] - **test**: 增加一些 unref timers 测试的超时时间 (Jeremiah Senkpiel) [#5352](https://github.com/nodejs/node/pull/5352)
* \[[`85f927a774`](https://github.com/nodejs/node/commit/85f927a774)] - **test**: 防止 pi2 上的不稳定测试 (Trevor Norris) [#5537](https://github.com/nodejs/node/pull/5537)
* \[[`c86902d800`](https://github.com/nodejs/node/commit/c86902d800)] - **test**: 缓解不稳定的 test-http-agent (Rich Trott) [#5346](https://github.com/nodejs/node/pull/5346)
* \[[`f242e62817`](https://github.com/nodejs/node/commit/f242e62817)] - **test**: 从已修复测试中移除 flaky 标记 (Rich Trott) [#5459](https://github.com/nodejs/node/pull/5459)
* \[[`a39aacf035`](https://github.com/nodejs/node/commit/a39aacf035)] - **test**: 重构 test-dgram-udp4 (Santiago Gimeno) [#5339](https://github.com/nodejs/node/pull/5339)
* \[[`6386f62221`](https://github.com/nodejs/node/commit/6386f62221)] - **test**: 移除不必要的 bind() 及相关注释 (Aayush Naik) [#5023](https://github.com/nodejs/node/pull/5023)
* \[[`068b0cbd12`](https://github.com/nodejs/node/commit/068b0cbd12)] - **test**: 将 cluster 测试移到并行执行 (Rich Trott) [#4774](https://github.com/nodejs/node/pull/4774)
* \[[`a673c9ae2d`](https://github.com/nodejs/node/commit/a673c9ae2d)] - **tls**: 修复 context._external accessor 中的断言 (Ben Noordhuis) [#5521](https://github.com/nodejs/node/pull/5521)
* \[[`8ffef48fee`](https://github.com/nodejs/node/commit/8ffef48fee)] - **tools**: 修复 gyp 以便在没有 XCode 的 MacOSX 上工作 (Shigeki Ohtsu) [nodejs/node#1325](https://github.com/nodejs/node/pull/1325)
* \[[`4b6a8f4321`](https://github.com/nodejs/node/commit/4b6a8f4321)] - **tools**: 将 gyp 更新到 b3cef02 (Imran Iqbal) [#3487](https://github.com/nodejs/node/pull/3487)
* \[[`7501ddc878`](https://github.com/nodejs/node/commit/7501ddc878)] - **tools**: 支持测试已知问题 (cjihrig) [#5528](https://github.com/nodejs/node/pull/5528)
* \[[`10ec1d2a6b`](https://github.com/nodejs/node/commit/10ec1d2a6b)] - **tools**: 为 benchmarks 启用 lint 检查 (Rich Trott) [#5773](https://github.com/nodejs/node/pull/5773)
* \[[`deec8bc5f5`](https://github.com/nodejs/node/commit/deec8bc5f5)] - **tools**: 降低 cpplint 的详细程度 (Sakthipriyan Vairamani) [#5578](https://github.com/nodejs/node/pull/5578)
* \[[`64d5752711`](https://github.com/nodejs/node/commit/64d5752711)] - **tools**: 启用 no-self-assign ESLint 规则 (Rich Trott) [#5552](https://github.com/nodejs/node/pull/5552)
* \[[`131ed494e2`](https://github.com/nodejs/node/commit/131ed494e2)] - **tools**: 在 ESLint 中启用 no-extra-parens (Rich Trott) [#5512](https://github.com/nodejs/node/pull/5512)
* \[[`d4b9f02fdc`](https://github.com/nodejs/node/commit/d4b9f02fdc)] - **tools**: 仅将自定义 buffer lint 规则应用于 /lib (Rich Trott) [#5371](https://github.com/nodejs/node/pull/5371)
* \[[`6867bed4c4`](https://github.com/nodejs/node/commit/6867bed4c4)] - **tools**: 启用额外的 lint 规则 (Rich Trott) [#5357](https://github.com/nodejs/node/pull/5357)
* \[[`5e6b7605ee`](https://github.com/nodejs/node/commit/5e6b7605ee)] - **tools**: 添加 Node.js 特定的 ESLint 规则 (Rich Trott) [#5320](https://github.com/nodejs/node/pull/5320)
* \[[`6dc49ae203`](https://github.com/nodejs/node/commit/6dc49ae203)] - **tools,benchmark**: 提高 lint 兼容性 (Rich Trott) [#5773](https://github.com/nodejs/node/pull/5773)
* \[[`dff7091fce`](https://github.com/nodejs/node/commit/dff7091fce)] - **url**: 按协议名称分组带斜杠的协议 (nettofarah) [#5380](https://github.com/nodejs/node/pull/5380)
* \[[`0e97a3ea51`](https://github.com/nodejs/node/commit/0e97a3ea51)] - **win,build**: 支持 Visual C++ Build Tools 2015 (João Reis) [#5627](https://github.com/nodejs/node/pull/5627)

<a id="4.4.0"></a>

## 2016-03-08，版本 4.4.0 ‘Argon’（LTS），@thealphanerd

我们在 12 月宣布，我们将进行一个小版本发布，以便将一些经过投票通过的 SEMVER-MINOR 变更纳入 LTS。由于意外的安全发布 v4.3，这次发布被推迟了。我们正在快速推进到 v4.4，以便向你们带来我们已承诺发布的功能。

此次发布还包括对文档的 70 多处修复，以及对测试的 50 多处修复。

### 重要变更

SEMVER-MINOR 变更包括：

* **deps**：
  * 更新到 v8，引入了一个新标志 --perf\_basic\_prof\_only\_functions（Ali Ijaz Sheikh） [#3609](https://github.com/nodejs/node/pull/3609)
* **http**：
  * http(s) agent 中新增一项功能，可捕获 _keep alived_ 连接上的错误（José F. Romaniello） [#4482](https://github.com/nodejs/node/pull/4482)
* **src**：
  * 对 Big-Endian 系统提供更好的支持（Bryon Leung） [#3410](https://github.com/nodejs/node/pull/3410)
* **tls**：
  * 新增一项功能，允许你向 `tls.createSecurePair` 传递通用 SSL 选项（Коренберг Марк） [#2441](https://github.com/nodejs/node/pull/2441)
* **tools**：
  * 新标志 `--prof-process`，它将对提供的 isolate 文件执行 tick processor（Matt Loring） [#4021](https://github.com/nodejs/node/pull/4021)

重要的 semver 补丁变更包括：

* **buld**：
  * 支持包含空格的 python 路径。这对我们的 Windows 用户尤其重要，因为他们的 python 可能安装在 `c:/Program Files` 中（Felix Becker） [#4841](https://github.com/nodejs/node/pull/4841)
* **https**：
  * 可能修复 [#3692](https://github.com/nodejs/node/issues/3692) 中 HTTP/HTTPS 客户端请求抛出 EPROTO 的问题（Fedor Indutny） [#4982](https://github.com/nodejs/node/pull/4982)
* **installer**：
  * 来自 isolate tick 日志的更易读的分析信息（Matt Loring） [#3032](https://github.com/nodejs/node/pull/3032)
* **npm**：
  * 升级到 npm 2.14.20（Kat Marchán） [#5510](https://github.com/nodejs/node/pull/5510)
* **process**：
  * 添加对事件发射器中 symbol 的支持。编写这段代码时还没有 symbols ¯\_(ツ)\_/¯（cjihrig） [#4798](https://github.com/nodejs/node/pull/4798)
* **querystring**：
  * querystring.parse() 现在快了 13-22%！（Brian White） [#4675](https://github.com/nodejs/node/pull/4675)
* **streams**：
  * 小缓冲区移动的性能改进，吞吐量提升 5%。已有 IoT 项目在此变更下快了多达 10%！（Matteo Collina） [#4354](https://github.com/nodejs/node/pull/4354)
* **tools**：
  * eslint 已更新到 2.1.0 版本（Rich Trott） [#5214](https://github.com/nodejs/node/pull/5214)

### 提交

* \[[`360e04fd5a`](https://github.com/nodejs/node/commit/360e04fd5a)] - internal/child\_process：在出错时调用 postSend（Fedor Indutny） [#4752](https://github.com/nodejs/node/pull/4752)
* \[[`a29f501aa2`](https://github.com/nodejs/node/commit/a29f501aa2)] - **benchmark**：为 `net` 添加常量声明（Minwoo Jung） [#3950](https://github.com/nodejs/node/pull/3950)
* \[[`85e06a2e34`](https://github.com/nodejs/node/commit/85e06a2e34)] - **(SEMVER-MINOR)** **buffer**：允许 encoding 参数折叠（Trevor Norris） [#4803](https://github.com/nodejs/node/pull/4803)
* \[[`fe893a8ebc`](https://github.com/nodejs/node/commit/fe893a8ebc)] - **(SEMVER-MINOR)** **buffer**：正确获取 needle 的二进制长度（Trevor Norris） [#4803](https://github.com/nodejs/node/pull/4803)
* \[[`fae7c9db3f`](https://github.com/nodejs/node/commit/fae7c9db3f)] - **buffer**：重构重复声明的变量（Rich Trott） [#4886](https://github.com/nodejs/node/pull/4886)
* \[[`4a6e2b26f7`](https://github.com/nodejs/node/commit/4a6e2b26f7)] - **build**：将 aarch64 视为 arm64（Johan Bergström） [#5191](https://github.com/nodejs/node/pull/5191)
* \[[`bc2536dfc6`](https://github.com/nodejs/node/commit/bc2536dfc6)] - **build**：添加帮助信息并删除一个 TODO。（Ojas Shirekar） [#5080](https://github.com/nodejs/node/pull/5080)
* \[[`f6416be5d2`](https://github.com/nodejs/node/commit/f6416be5d2)] - **build**：移除 configure 中冗余的 TODO（Ojas Shirekar） [#5080](https://github.com/nodejs/node/pull/5080)
* \[[`6deb7a6eb8`](https://github.com/nodejs/node/commit/6deb7a6eb8)] - **build**：删除 Makefile.build（Ojas Shirekar） [#5080](https://github.com/nodejs/node/pull/5080)
* \[[`66d1115555`](https://github.com/nodejs/node/commit/66d1115555)] - **build**：修复 python 路径包含空格时的构建问题（Felix Becker） [#4841](https://github.com/nodejs/node/pull/4841)
* \[[`29951cf36a`](https://github.com/nodejs/node/commit/29951cf36a)] - **child\_process**：修复 readable 事件中的数据丢失（Brian White） [#5036](https://github.com/nodejs/node/pull/5036)
* \[[`81d4127279`](https://github.com/nodejs/node/commit/81d4127279)] - **cluster**：不要在 `fork` 中依赖 `this`（Igor Klopov） [#5216](https://github.com/nodejs/node/pull/5216)
* \[[`de4c07b29e`](https://github.com/nodejs/node/commit/de4c07b29e)] - **console**：将 `null` 作为 `this` 传给 util.format（Jackson Tian） [#5222](https://github.com/nodejs/node/pull/5222)
* \[[`4e0755cab3`](https://github.com/nodejs/node/commit/4e0755cab3)] - **crypto**：让已修复的 NodeBIO 返回 EOF（Adam Langley） [#5105](https://github.com/nodejs/node/pull/5105)
* \[[`a7955d5071`](https://github.com/nodejs/node/commit/a7955d5071)] - **crypto**：修复 LoadPKCS12 中的内存泄漏（Fedor Indutny） [#5109](https://github.com/nodejs/node/pull/5109)
* \[[`5d9c1cf001`](https://github.com/nodejs/node/commit/5d9c1cf001)] - **crypto**：同时将 `pfx` 证书作为 CA 证书（Fedor Indutny） [#5109](https://github.com/nodejs/node/pull/5109)
* \[[`ab5cb0539b`](https://github.com/nodejs/node/commit/ab5cb0539b)] - **crypto**：使用 SSL\_CTX\_clear\_extra\_chain\_certs。（Adam Langley） [#4919](https://github.com/nodejs/node/pull/4919)
* \[[`198928eb9f`](https://github.com/nodejs/node/commit/198928eb9f)] - **crypto**：修复未提供 OCSP-stapling 时的构建问题（Adam Langley） [#4914](https://github.com/nodejs/node/pull/4914)
* \[[`b8e1089df0`](https://github.com/nodejs/node/commit/b8e1089df0)] - **crypto**：使用 const SSL\_CIPHER（Adam Langley） [#4913](https://github.com/nodejs/node/pull/4913)
* \[[`139d6d9284`](https://github.com/nodejs/node/commit/139d6d9284)] - **debugger**：在访问 this.binding 之前断言测试（Prince J Wesley） [#5145](https://github.com/nodejs/node/pull/5145)
* \[[`9c8f2ab546`](https://github.com/nodejs/node/commit/9c8f2ab546)] - **deps**：升级到 npm 2.14.20（Kat Marchán） [#5510](https://github.com/nodejs/node/pull/5510)
* \[[`e591a0927f`](https://github.com/nodejs/node/commit/e591a0927f)] - **deps**：升级到 npm 2.14.19（Kat Marchán） [#5335](https://github.com/nodejs/node/pull/5335)
* \[[`a5ce67a0aa`](https://github.com/nodejs/node/commit/a5ce67a0aa)] - **deps**：升级到 npm 2.14.18（Kat Marchán） [#5245](https://github.com/nodejs/node/pull/5245)
* \[[`469db021f7`](https://github.com/nodejs/node/commit/469db021f7)] - **(SEMVER-MINOR)** **deps**：从 V8 上游回移植 9da3ab6（Ali Ijaz Sheikh） [#3609](https://github.com/nodejs/node/pull/3609)
* \[[`3ca04a5de9`](https://github.com/nodejs/node/commit/3ca04a5de9)] - **deps**：从 v8 上游回移植 8d00c2c（Gibson Fahnestock） [#5024](https://github.com/nodejs/node/pull/5024)
* \[[`60e0bd4be9`](https://github.com/nodejs/node/commit/60e0bd4be9)] - **deps**：升级到 npm 2.14.17（Kat Marchán） [#5110](https://github.com/nodejs/node/pull/5110)
* \[[`976b9a9ab3`](https://github.com/nodejs/node/commit/976b9a9ab3)] - **deps**：升级到 npm 2.14.16（Kat Marchán） [#4960](https://github.com/nodejs/node/pull/4960)
* \[[`38b370abea`](https://github.com/nodejs/node/commit/38b370abea)] - **deps**：升级到 npm 2.14.15（Kat Marchán） [#4872](https://github.com/nodejs/node/pull/4872)
* \[[`82f549ef81`](https://github.com/nodejs/node/commit/82f549ef81)] - **dgram**：限制重复声明的变量作用域（Rich Trott） [#4940](https://github.com/nodejs/node/pull/4940)
* \[[`063e14b568`](https://github.com/nodejs/node/commit/063e14b568)] - **dns**：在带有无效端口的 lookupService 中抛出 TypeError（Evan Lucas） [#4839](https://github.com/nodejs/node/pull/4839)
* \[[`a2613aefae`](https://github.com/nodejs/node/commit/a2613aefae)] - **doc**：移除内部文档中过时的内容（Rich Trott） [#5421](https://github.com/nodejs/node/pull/5421)
* \[[`394743f4b3`](https://github.com/nodejs/node/commit/394743f4b3)] - **doc**：在 readme 中明确支持 VS 2015（Phillip Johnsen） [#5406](https://github.com/nodejs/node/pull/5406)
* \[[`da6b26fbfb`](https://github.com/nodejs/node/commit/da6b26fbfb)] - **doc**：校对 util 文档（Rich Trott） [#5399](https://github.com/nodejs/node/pull/5399)
* \[[`7070ad0cc0`](https://github.com/nodejs/node/commit/7070ad0cc0)] - **doc**：在 deepStrictEqual() 中提及原型检查（cjihrig） [#5367](https://github.com/nodejs/node/pull/5367)
* \[[`d4789fc5fd`](https://github.com/nodejs/node/commit/d4789fc5fd)] - **doc**：将 Myles Borins 的 GitHub 链接中的 http 改为 https（Rod Vagg） [#5356](https://github.com/nodejs/node/pull/5356)
* \[[`b86540d1eb`](https://github.com/nodejs/node/commit/b86540d1eb)] - **doc**：澄清 net.createServer 中的错误处理（Dirceu Pereira Tiegs） [#5353](https://github.com/nodejs/node/pull/5353)
* \[[`3106297037`](https://github.com/nodejs/node/commit/3106297037)] - **doc**：在区分大小写敏感的系统上的 `require` 行为（Hugo Wood）
* \[[`e0b45e4315`](https://github.com/nodejs/node/commit/e0b45e4315)] - **doc**：将仓库文档中的 ‘CTC’ 更新为使用该术语（Alexis Campailla） [#5304](https://github.com/nodejs/node/pull/5304)
* \[[`e355f13989`](https://github.com/nodejs/node/commit/e355f13989)] - **doc**：改进 crypto.markdown 的文案（Alexander Makarenko） [#5230](https://github.com/nodejs/node/pull/5230)
* \[[`a9035b5e1d`](https://github.com/nodejs/node/commit/a9035b5e1d)] - **doc**：链接到手册页（<dcposch@dcpos.ch>） [#5073](https://github.com/nodejs/node/pull/5073)
* \[[`2043e6a63c`](https://github.com/nodejs/node/commit/2043e6a63c)] - **doc**：澄清 child\_process.execFile{,Sync} 的 file 参数（Kevin Locke） [#5310](https://github.com/nodejs/node/pull/5310)
* \[[`8c732ad1e1`](https://github.com/nodejs/node/commit/8c732ad1e1)] - **doc**：修复 buf.length slice 示例（Chinedu Francis Nwafili） [#5259](https://github.com/nodejs/node/pull/5259)
* \[[`6c27c78b8b`](https://github.com/nodejs/node/commit/6c27c78b8b)] - **doc**：修复 buffer\[index] 示例（Chinedu Francis Nwafili） [#5253](https://github.com/nodejs/node/pull/5253)
* \[[`7765f99683`](https://github.com/nodejs/node/commit/7765f99683)] - **doc**：修复模板字符串（Rafael Cepeda） [#5240](https://github.com/nodejs/node/pull/5240)
* \[[`d15ef20162`](https://github.com/nodejs/node/commit/d15ef20162)] - **doc**：改进 console.markdown 的文案（Alexander Makarenko） [#5225](https://github.com/nodejs/node/pull/5225)
* \[[`593206a752`](https://github.com/nodejs/node/commit/593206a752)] - **doc**：修复 net.createConnection() 示例（Brian White） [#5219](https://github.com/nodejs/node/pull/5219)
* \[[`464636b5c5`](https://github.com/nodejs/node/commit/464636b5c5)] - **doc**：改进滚动效果，及若干 CSS 微调（Roman Reiss） [#5198](https://github.com/nodejs/node/pull/5198)
* \[[`f615cd5b0b`](https://github.com/nodejs/node/commit/f615cd5b0b)] - **doc**：console 是异步的，除非它是文件（Ben Noordhuis） [#5133](https://github.com/nodejs/node/pull/5133)
* \[[`fbed0d11f1`](https://github.com/nodejs/node/commit/fbed0d11f1)] - **doc**：writeHead 与 setHeader 的合并行为（Alejandro Oviedo） [#5081](https://github.com/nodejs/node/pull/5081)
* \[[`b0bb42bd7d`](https://github.com/nodejs/node/commit/b0bb42bd7d)] - **doc**：修复对 API `hash.final` 的引用（Minwoo Jung） [#5050](https://github.com/nodejs/node/pull/5050)
* \[[`dee5045221`](https://github.com/nodejs/node/commit/dee5045221)] - **doc**：在 crypto.markdown 中将 ‘RSA-SHA256’ 大写（Rainer Oviir） [#5044](https://github.com/nodejs/node/pull/5044)
* \[[`498052a017`](https://github.com/nodejs/node/commit/498052a017)] - **doc**：TLS 文档中的函数风格保持一致（Alexander Makarenko） [#5000](https://github.com/nodejs/node/pull/5000)
* \[[`031277e6f8`](https://github.com/nodejs/node/commit/031277e6f8)] - **doc**：统一函数样式（Rich Trott） [#4974](https://github.com/nodejs/node/pull/4974)
* \[[`808fe0ea48`](https://github.com/nodejs/node/commit/808fe0ea48)] - **doc**：修复 `notDeepEqual` API（Minwoo Jung） [#4971](https://github.com/nodejs/node/pull/4971)
* \[[`5b9025689f`](https://github.com/nodejs/node/commit/5b9025689f)] - **doc**：在弃用说明中一致地显示链接（Sakthipriyan Vairamani） [#4907](https://github.com/nodejs/node/pull/4907)
* \[[`3a1865db5e`](https://github.com/nodejs/node/commit/3a1865db5e)] - **doc**：不要将“interface”用作变量名（ChALkeR） [#4900](https://github.com/nodejs/node/pull/4900)
* \[[`90715c3d68`](https://github.com/nodejs/node/commit/90715c3d68)] - **doc**：保持名称按排序顺序排列（Sakthipriyan Vairamani） [#4876](https://github.com/nodejs/node/pull/4876)
* \[[`d8b3b25c9c`](https://github.com/nodejs/node/commit/d8b3b25c9c)] - **doc**：修复别名方法的 JSON 生成（Timothy Gu） [#4871](https://github.com/nodejs/node/pull/4871)
* \[[`7b763c8d25`](https://github.com/nodejs/node/commit/7b763c8d25)] - **doc**：修复 markdown 的代码类型（Jackson Tian） [#4858](https://github.com/nodejs/node/pull/4858)
* \[[`37d4e7afc2`](https://github.com/nodejs/node/commit/37d4e7afc2)] - **doc**：检查 'listen' 事件中的错误（Benjamin Gruenbaum） [#4834](https://github.com/nodejs/node/pull/4834)
* \[[`3f876b104c`](https://github.com/nodejs/node/commit/3f876b104c)] - **doc**：当数据超过缓冲区大小时示例仍可工作（Glen Arrowsmith） [#4811](https://github.com/nodejs/node/pull/4811)
* \[[`e3e20422a7`](https://github.com/nodejs/node/commit/e3e20422a7)] - **doc**：统一 $ node 命令行标记方式（Robert Jefe Lindstaedt） [#4806](https://github.com/nodejs/node/pull/4806)
* \[[`73e0195cef`](https://github.com/nodejs/node/commit/73e0195cef)] - **doc**：修复 link gen、link css 的类型引用（Claudio Rodriguez） [#4741](https://github.com/nodejs/node/pull/4741)
* \[[`0bdac429e1`](https://github.com/nodejs/node/commit/0bdac429e1)] - **doc**：Stream 文档中的多项改进（Alexander Makarenko） [#5009](https://github.com/nodejs/node/pull/5009)
* \[[`693c16fb6b`](https://github.com/nodejs/node/commit/693c16fb6b)] - **doc**：修复从 stream 到 http 和 events 的锚点链接（piepmatz） [#5007](https://github.com/nodejs/node/pull/5007)
* \[[`5fb533522c`](https://github.com/nodejs/node/commit/5fb533522c)] - **doc**：将函数表达式替换为箭头函数（Benjamin Gruenbaum） [#4832](https://github.com/nodejs/node/pull/4832)
* \[[`e3572fb809`](https://github.com/nodejs/node/commit/e3572fb809)] - **doc**：修复 Buffer 文档中的链接顺序（Alexander Makarenko） [#5076](https://github.com/nodejs/node/pull/5076)
* \[[`5c936ab765`](https://github.com/nodejs/node/commit/5c936ab765)] - **doc**：澄清 Buffer 方法的可选参数（Michaël Zasso） [#5008](https://github.com/nodejs/node/pull/5008)
* \[[`6df350c2b3`](https://github.com/nodejs/node/commit/6df350c2b3)] - **doc**：改进 Buffer 文档中的样式一致性（Alexander Makarenko） [#5001](https://github.com/nodejs/node/pull/5001)
* \[[`047f4a157f`](https://github.com/nodejs/node/commit/047f4a157f)] - **doc**：使 buffer 方法的样式保持一致（Timothy Gu） [#4873](https://github.com/nodejs/node/pull/4873)
* \[[`4cfc017b90`](https://github.com/nodejs/node/commit/4cfc017b90)] - **doc**：修复 Buffer::write 中不通顺的语法（Jimb Esser） [#4863](https://github.com/nodejs/node/pull/4863)
* \[[`9087f6daca`](https://github.com/nodejs/node/commit/9087f6daca)] - **doc**：修复 addons.markdown 和 http.markdown 中的命名锚点（Michael Theriot） [#4708](https://github.com/nodejs/node/pull/4708)
* \[[`4c8713ce58`](https://github.com/nodejs/node/commit/4c8713ce58)] - **doc**：添加带示例的 buf.indexOf encoding 参数（Karl Skomski） [#3373](https://github.com/nodejs/node/pull/3373)
* \[[`1819d74491`](https://github.com/nodejs/node/commit/1819d74491)] - **doc**：为所有代码块加上 fenced，修复拼写错误（Robert Jefe Lindstaedt） [#4733](https://github.com/nodejs/node/pull/4733)
* \[[`961735e645`](https://github.com/nodejs/node/commit/961735e645)] - **doc**：让引用可点击（Roman Klauke） [#4654](https://github.com/nodejs/node/pull/4654)
* \[[`7e80442483`](https://github.com/nodejs/node/commit/7e80442483)] - **doc**：改进 child\_process.execFile() 代码示例（Ryan Sobol） [#4504](https://github.com/nodejs/node/pull/4504)
* \[[`de9ad5b39d`](https://github.com/nodejs/node/commit/de9ad5b39d)] - **doc**：移除“above”和“below”之类的引用（Richard Sun） [#4499](https://github.com/nodejs/node/pull/4499)
* \[[`c549ca3b69`](https://github.com/nodejs/node/commit/c549ca3b69)] - **doc**：修复 Buffer 文档中的标题层级错误（Shigeki Ohtsu） [#4537](https://github.com/nodejs/node/pull/4537)
* \[[`a613bae14c`](https://github.com/nodejs/node/commit/a613bae14c)] - **doc**：改进 crypto.markdown 的文案（James M Snell） [#4435](https://github.com/nodejs/node/pull/4435)
* \[[`18f580d0c1`](https://github.com/nodejs/node/commit/18f580d0c1)] - **doc**：改进 child\_process.markdown 的文案（James M Snell） [#4383](https://github.com/nodejs/node/pull/4383)
* \[[`a929837311`](https://github.com/nodejs/node/commit/a929837311)] - **doc**：改进 buffer.markdown 的文案（James M Snell） [#4370](https://github.com/nodejs/node/pull/4370)
* \[[`a22f688407`](https://github.com/nodejs/node/commit/a22f688407)] - **doc**：改进 addons.markdown 的文案（James M Snell） [#4320](https://github.com/nodejs/node/pull/4320)
* \[[`94c2de47b1`](https://github.com/nodejs/node/commit/94c2de47b1)] - **doc**：更新 process.send() 签名（cjihrig） [#5284](https://github.com/nodejs/node/pull/5284)
* \[[`4e1926cb08`](https://github.com/nodejs/node/commit/4e1926cb08)] - **doc**：替换 CONTRIBUTING.md 中的 node-forward 链接（Ben Noordhuis） [#5227](https://github.com/nodejs/node/pull/5227)
* \[[`e1713e81e5`](https://github.com/nodejs/node/commit/e1713e81e5)] - **doc**：修复 repl 文档中的一些小不一致（Rich Trott） [#5193](https://github.com/nodejs/node/pull/5193)
* \[[`b2e72c0d92`](https://github.com/nodejs/node/commit/b2e72c0d92)] - **doc**：澄清 uncaughtException 期间的异常（Noah Rose） [#5180](https://github.com/nodejs/node/pull/5180)
* \[[`c3c549836a`](https://github.com/nodejs/node/commit/c3c549836a)] - **doc**：将 DCO 更新到 v1.1（Mikeal Rogers） [#5170](https://github.com/nodejs/node/pull/5170)
* \[[`9dd35ad594`](https://github.com/nodejs/node/commit/9dd35ad594)] - **doc**：修复 dgram 文档缩进（Rich Trott） [#5118](https://github.com/nodejs/node/pull/5118)
* \[[`eed830702c`](https://github.com/nodejs/node/commit/eed830702c)] - **doc**：修复 dgram 文档中的拼写错误（Rich Trott） [#5114](https://github.com/nodejs/node/pull/5114)
* \[[`abfb2f5864`](https://github.com/nodejs/node/commit/abfb2f5864)] - **doc**：修复 cluster 文档中的链接（Timothy Gu） [#5068](https://github.com/nodejs/node/pull/5068)
* \[[`8b040b5bb2`](https://github.com/nodejs/node/commit/8b040b5bb2)] - **doc**：修复 process 文档中的一个小拼写错误（Prayag Verma） [#5018](https://github.com/nodejs/node/pull/5018)
* \[[`47eebe1d80`](https://github.com/nodejs/node/commit/47eebe1d80)] - **doc**：修复 Readme.md 中的拼写错误（Prayag Verma） [#5017](https://github.com/nodejs/node/pull/5017)
* \[[`2b97ff89a6`](https://github.com/nodejs/node/commit/2b97ff89a6)] - **doc**：改进 OS 文档中的小细节（Alexander Makarenko） [#5006](https://github.com/nodejs/node/pull/5006)
* \[[`9a5d58b89e`](https://github.com/nodejs/node/commit/9a5d58b89e)] - **doc**：改进 VM 文档中的样式一致性（Alexander Makarenko） [#5005](https://github.com/nodejs/node/pull/5005)
* \[[`960e1bab98`](https://github.com/nodejs/node/commit/960e1bab98)] - **doc**：对 HTTPS 文档做小幅改进（Alexander Makarenko） [#5002](https://github.com/nodejs/node/pull/5002)
* \[[`6048b011e8`](https://github.com/nodejs/node/commit/6048b011e8)] - **doc**：统一 writable 的拼写（Peter Lyons） [#4954](https://github.com/nodejs/node/pull/4954)
* \[[`7b8f904167`](https://github.com/nodejs/node/commit/7b8f904167)] - **doc**：更新 readline 中对 eol 的处理（Kári Tristan Helgason） [#4927](https://github.com/nodejs/node/pull/4927)
* \[[`83efd0d4d1`](https://github.com/nodejs/node/commit/83efd0d4d1)] - **doc**：为 process.env 添加更多细节（Evan Lucas） [#4924](https://github.com/nodejs/node/pull/4924)
* \[[`b2d2c0b588`](https://github.com/nodejs/node/commit/b2d2c0b588)] - **doc**：撤销 http.IncomingMessage.statusMessage 的移动（Jeff Harris） [#4822](https://github.com/nodejs/node/pull/4822)
* \[[`b091c41b53`](https://github.com/nodejs/node/commit/b091c41b53)] - **doc**：正确的 markdown 转义 -> \_\_、\*、\_（Robert Jefe Lindstaedt） [#4805](https://github.com/nodejs/node/pull/4805)
* \[[`0887208290`](https://github.com/nodejs/node/commit/0887208290)] - **doc**：移除不必要的 bind(this)（Dmitriy Lazarev） [#4797](https://github.com/nodejs/node/pull/4797)
* \[[`f3e3c70bca`](https://github.com/nodejs/node/commit/f3e3c70bca)] - **doc**：修正 npm 的 LICENSE 中的一个小错误（Kat Marchán） [#4872](https://github.com/nodejs/node/pull/4872)
* \[[`e703b180b3`](https://github.com/nodejs/node/commit/e703b180b3)] - **doc,tools,test**：对基于文档的 addon 测试进行 lint（Rich Trott） [#5427](https://github.com/nodejs/node/pull/5427)
* \[[`0f3b8ca192`](https://github.com/nodejs/node/commit/0f3b8ca192)] - **fs**：重构重复声明的变量（Rich Trott） [#4959](https://github.com/nodejs/node/pull/4959)
* \[[`152c6b6b8d`](https://github.com/nodejs/node/commit/152c6b6b8d)] - **http**：移除对 onParserExecute 的引用（Tom Atkinson） [#4773](https://github.com/nodejs/node/pull/4773)
* \[[`6a0571cd72`](https://github.com/nodejs/node/commit/6a0571cd72)] - **http**：不要在 advertisement 上触发 `upgrade`（Fedor Indutny） [#4337](https://github.com/nodejs/node/pull/4337)
* \[[`567ced9ef0`](https://github.com/nodejs/node/commit/567ced9ef0)] - **(SEMVER-MINOR)** **http**：处理空闲 socket 上的错误（José F. Romaniello） [#4482](https://github.com/nodejs/node/pull/4482)
* \[[`de5177ccb8`](https://github.com/nodejs/node/commit/de5177ccb8)] - **https**：在出错时移除缓存的会话（Fedor Indutny） [#4982](https://github.com/nodejs/node/pull/4982)
* \[[`77a6036264`](https://github.com/nodejs/node/commit/77a6036264)] - **installer**：安装 tick processor（Matt Loring） [#3032](https://github.com/nodejs/node/pull/3032)
* \[[`ea16d8d7c5`](https://github.com/nodejs/node/commit/ea16d8d7c5)] - **lib**：移除 string\_decoder.js 中变量的重复声明（Rich Trott） [#4978](https://github.com/nodejs/node/pull/4978)
* \[[`1389660ab3`](https://github.com/nodejs/node/commit/1389660ab3)] - **lib**：限制循环变量作用域（Rich Trott） [#4965](https://github.com/nodejs/node/pull/4965)
* \[[`59255d7218`](https://github.com/nodejs/node/commit/59255d7218)] - **lib**：用箭头函数替代 bind（Minwoo Jung） [#3622](https://github.com/nodejs/node/pull/3622)
* \[[`fd26960aab`](https://github.com/nodejs/node/commit/fd26960aab)] - **lib,test**：移除多余的分号（Michaël Zasso） [#2205](https://github.com/nodejs/node/pull/2205)
* \[[`9646d26ffd`](https://github.com/nodejs/node/commit/9646d26ffd)] - **module**：重构重复声明的变量（Rich Trott） [#4962](https://github.com/nodejs/node/pull/4962)
* \[[`09311128e8`](https://github.com/nodejs/node/commit/09311128e8)] - **net**：使用 `_server` 进行内部记录（Fedor Indutny） [#5262](https://github.com/nodejs/node/pull/5262)
* \[[`824c402174`](https://github.com/nodejs/node/commit/824c402174)] - **net**：重构重复声明的变量（Rich Trott） [#4963](https://github.com/nodejs/node/pull/4963)
* \[[`96f306f3cf`](https://github.com/nodejs/node/commit/96f306f3cf)] - **net**：将 isLegalPort 移到 internal/net（Evan Lucas） [#4882](https://github.com/nodejs/node/pull/4882)
* \[[`78d64889bd`](https://github.com/nodejs/node/commit/78d64889bd)] - **node**：启动时将 process.\_eventsCount 设为 0（Evan Lucas） [#5208](https://github.com/nodejs/node/pull/5208)
* \[[`7a2e8f4356`](https://github.com/nodejs/node/commit/7a2e8f4356)] - **process**：支持 symbol 事件（cjihrig） [#4798](https://github.com/nodejs/node/pull/4798)
* \[[`c9e2dce247`](https://github.com/nodejs/node/commit/c9e2dce247)] - **querystring**：提升 parse() 性能（Brian White） [#4675](https://github.com/nodejs/node/pull/4675)
* \[[`18542c41fe`](https://github.com/nodejs/node/commit/18542c41fe)] - **repl**：移除变量重复声明（Rich Trott） [#4977](https://github.com/nodejs/node/pull/4977)
* \[[`10be8dc360`](https://github.com/nodejs/node/commit/10be8dc360)] - **src**：强制 stderr 使用行缓冲（Rich Trott） [#3701](https://github.com/nodejs/node/pull/3701)
* \[[`7958664e85`](https://github.com/nodejs/node/commit/7958664e85)] - **src**：清理 `__proto__` 的使用（Jackson Tian） [#5069](https://github.com/nodejs/node/pull/5069)
* \[[`4e0a0d51b3`](https://github.com/nodejs/node/commit/4e0a0d51b3)] - **src**：移除不再相关的注释（Chris911） [#4843](https://github.com/nodejs/node/pull/4843)
* \[[`51c8bc8abc`](https://github.com/nodejs/node/commit/51c8bc8abc)] - **src**：移除 `__builtin_bswap16` 调用（Ben Noordhuis） [#4290](https://github.com/nodejs/node/pull/4290)
* \[[`5e1976e37c`](https://github.com/nodejs/node/commit/5e1976e37c)] - **src**：移除未使用的 BITS_PER_LONG 宏（Ben Noordhuis） [#4290](https://github.com/nodejs/node/pull/4290)
* \[[`c18ef54d88`](https://github.com/nodejs/node/commit/c18ef54d88)] - **(SEMVER-MINOR)** **src**：为 StringBytes::Encode() 添加 BE 支持（Bryon Leung） [#3410](https://github.com/nodejs/node/pull/3410)
* \[[`be9e7610b5`](https://github.com/nodejs/node/commit/be9e7610b5)] - **src,test,tools**：根据更严格的 lint 进行修改（Rich Trott） [#5214](https://github.com/nodejs/node/pull/5214)
* \[[`538c4756a7`](https://github.com/nodejs/node/commit/538c4756a7)] - **stream**：重构重复声明的变量（Rich Trott） [#4816](https://github.com/nodejs/node/pull/4816)
* \[[`4fa22e4126`](https://github.com/nodejs/node/commit/4fa22e4126)] - **streams**：发送小块时吞吐量提升 5%（Matteo Collina） [#4354](https://github.com/nodejs/node/pull/4354)
* \[[`b6bd87495f`](https://github.com/nodejs/node/commit/b6bd87495f)] - **test**：移除 test-debug-no-context 的 flaky 标记（Rich Trott） [#5317](https://github.com/nodejs/node/pull/5317)
* \[[`7705360e35`](https://github.com/nodejs/node/commit/7705360e35)] - **test**：添加 https 服务器 close 事件测试（Braydon Fuller） [#5106](https://github.com/nodejs/node/pull/5106)
* \[[`9d6623e1d1`](https://github.com/nodejs/node/commit/9d6623e1d1)] - **test**：为清晰起见使用 String.prototype.repeat()（Rich Trott） [#5311](https://github.com/nodejs/node/pull/5311)
* \[[`18e3987e2e`](https://github.com/nodejs/node/commit/18e3987e2e)] - **test**：缓解 test-debug-no-context 的 flaky 问题（Rich Trott） [#5269](https://github.com/nodejs/node/pull/5269)
* \[[`058db07ce8`](https://github.com/nodejs/node/commit/058db07ce8)] - **test**：重构 test-dgram-send-callback-recursive（Santiago Gimeno） [#5079](https://github.com/nodejs/node/pull/5079)
* \[[`1647113d7a`](https://github.com/nodejs/node/commit/1647113d7a)] - **test**：重构 test-http-destroyed-socket-write2（Santiago Gimeno） [#4970](https://github.com/nodejs/node/pull/4970)
* \[[`07dc2b50e2`](https://github.com/nodejs/node/commit/07dc2b50e2)] - **test**：缩短 bogus socket 的路径（Rich Trott） [#4478](https://github.com/nodejs/node/pull/4478)
* \[[`47e7c8c359`](https://github.com/nodejs/node/commit/47e7c8c359)] - **test**：将 test-http-regr-gh-2928 标记为 flaky（Rich Trott） [#5280](https://github.com/nodejs/node/pull/5280)
* \[[`9dbd66f7ef`](https://github.com/nodejs/node/commit/9dbd66f7ef)] - **test**：将 test-http-agent 标记为 flaky（Rich Trott） [#5209](https://github.com/nodejs/node/pull/5209)
* \[[`98049876b5`](https://github.com/nodejs/node/commit/98049876b5)] - **test**：最小化的 repl eval 选项测试（Rich Trott） [#5192](https://github.com/nodejs/node/pull/5192)
* \[[`ae3185b8ac`](https://github.com/nodejs/node/commit/ae3185b8ac)] - **test**：为 AIX 禁用 fs watch 测试（Michael Dawson） [#5187](https://github.com/nodejs/node/pull/5187)
* \[[`b639c3345b`](https://github.com/nodejs/node/commit/b639c3345b)] - **test**：再次修复 child-process-fork-regr-gh-2847（Santiago Gimeno） [#5179](https://github.com/nodejs/node/pull/5179)
* \[[`8be3afc474`](https://github.com/nodejs/node/commit/8be3afc474)] - **test**：修复 flaky 的 test-http-regr-gh-2928（Rich Trott） [#5154](https://github.com/nodejs/node/pull/5154)
* \[[`46dc12bdcc`](https://github.com/nodejs/node/commit/46dc12bdcc)] - **test**：使 pkcs12 测试可在 FIPS 模式下运行（Shigeki Ohtsu） [#5150](https://github.com/nodejs/node/pull/5150)
* \[[`e19b8ea692`](https://github.com/nodejs/node/commit/e19b8ea692)] - **test**：移除不必要的 common.indirectInstanceOf()（Rich Trott） [#5149](https://github.com/nodejs/node/pull/5149)
* \[[`6072d2e15e`](https://github.com/nodejs/node/commit/6072d2e15e)] - **test**：在 FIPS 模式下禁用 gh-5100 测试（Fedor Indutny） [#5144](https://github.com/nodejs/node/pull/5144)
* \[[`a8417a2787`](https://github.com/nodejs/node/commit/a8417a2787)] - **test**：修复 flaky 的 test-dgram-pingpong（Rich Trott） [#5125](https://github.com/nodejs/node/pull/5125)
* \[[`9db67a6a44`](https://github.com/nodejs/node/commit/9db67a6a44)] - **test**：修复 child-process-fork-regr-gh-2847（Santiago Gimeno） [#5121](https://github.com/nodejs/node/pull/5121)
* \[[`69150caedc`](https://github.com/nodejs/node/commit/69150caedc)] - **test**：不要在 AIX 上运行 test-tick-processor.js（Michael Dawson） [#5093](https://github.com/nodejs/node/pull/5093)
* \[[`4a492b96b1`](https://github.com/nodejs/node/commit/4a492b96b1)] - **test**：将 Raspberry Pi 上的测试标记为 flaky（Rich Trott） [#5082](https://github.com/nodejs/node/pull/5082)
* \[[`4301f2cdc2`](https://github.com/nodejs/node/commit/4301f2cdc2)] - **test**：修复 test-url 中不一致的样式（Brian White） [#5014](https://github.com/nodejs/node/pull/5014)
* \[[`865baaed60`](https://github.com/nodejs/node/commit/865baaed60)] - **test**：修复顺序测试中的重复声明变量（Rich Trott） [#4999](https://github.com/nodejs/node/pull/4999)
* \[[`663e852c1b`](https://github.com/nodejs/node/commit/663e852c1b)] - **test**：pummel 测试修复（Rich Trott） [#4998](https://github.com/nodejs/node/pull/4998)
* \[[`72d38a4a38`](https://github.com/nodejs/node/commit/72d38a4a38)] - **test**：修复 test-vm-\* 中的重复声明变量（Rich Trott） [#4997](https://github.com/nodejs/node/pull/4997)
* \[[`97ddfa2b6e`](https://github.com/nodejs/node/commit/97ddfa2b6e)] - **test**：修复 test-url 中的重复声明变量（Rich Trott） [#4993](https://github.com/nodejs/node/pull/4993)
* \[[`43d4db4314`](https://github.com/nodejs/node/commit/43d4db4314)] - **test**：修复重复声明的 test-util-\* 变量（Rich Trott） [#4994](https://github.com/nodejs/node/pull/4994)
* \[[`88fae38d0c`](https://github.com/nodejs/node/commit/88fae38d0c)] - **test**：修复变量重复声明（Rich Trott） [#4992](https://github.com/nodejs/node/pull/4992)
* \[[`58595f146a`](https://github.com/nodejs/node/commit/58595f146a)] - **test**：修复重复声明的 test-path 变量（Rich Trott） [#4991](https://github.com/nodejs/node/pull/4991)
* \[[`2b711d51fa`](https://github.com/nodejs/node/commit/2b711d51fa)] - **test**：修复 test-os 中的变量重复声明（Rich Trott） [#4990](https://github.com/nodejs/node/pull/4990)
* \[[`bd9e2c31d6`](https://github.com/nodejs/node/commit/bd9e2c31d6)] - **test**：修复 test-net-\* 的变量重复声明（Rich Trott） [#4989](https://github.com/nodejs/node/pull/4989)
* \[[`d67ab81882`](https://github.com/nodejs/node/commit/d67ab81882)] - **test**：修复重复声明的 test-intl 变量（Rich Trott） [#4988](https://github.com/nodejs/node/pull/4988)
* \[[`d6dbb2fae7`](https://github.com/nodejs/node/commit/d6dbb2fae7)] - **test**：修复重复声明的 test-http-\* 变量（Rich Trott） [#4987](https://github.com/nodejs/node/pull/4987)
* \[[`ecaa89a8cb`](https://github.com/nodejs/node/commit/ecaa89a8cb)] - **test**：修复重复声明的 test-event-emitter-\* 变量（Rich Trott） [#4985](https://github.com/nodejs/node/pull/4985)
* \[[`299c729371`](https://github.com/nodejs/node/commit/299c729371)] - **test**：移除 test-domain 中重复声明的变量（Rich Trott） [#4984](https://github.com/nodejs/node/pull/4984)
* \[[`35a4a203bf`](https://github.com/nodejs/node/commit/35a4a203bf)] - **test**：移除 test-crypto-\* 中的变量重复声明（Rich Trott） [#4981](https://github.com/nodejs/node/pull/4981)
* \[[`1d56b74af0`](https://github.com/nodejs/node/commit/1d56b74af0)] - **test**：移除 test-cluster-\* 的变量重复声明（Rich Trott） [#4980](https://github.com/nodejs/node/pull/4980)
* \[[`0ce12cc1ec`](https://github.com/nodejs/node/commit/0ce12cc1ec)] - **test**：修复 test-http-extra-response 的不稳定性（Santiago Gimeno） [#4979](https://github.com/nodejs/node/pull/4979)
* \[[`c6b4bf138c`](https://github.com/nodejs/node/commit/c6b4bf138c)] - **test**：限制 test-child-process\* 中重复声明变量的作用域（Rich Trott） [#4944](https://github.com/nodejs/node/pull/4944)
* \[[`7654c171c7`](https://github.com/nodejs/node/commit/7654c171c7)] - **test**：重构 switch（Rich Trott） [#4870](https://github.com/nodejs/node/pull/4870)
* \[[`226dfef690`](https://github.com/nodejs/node/commit/226dfef690)] - **test**：为 dgram 测试添加 common.platformTimeout()（Rich Trott） [#4938](https://github.com/nodejs/node/pull/4938)
* \[[`fb14bac662`](https://github.com/nodejs/node/commit/fb14bac662)] - **test**：修复 Windows 10 上 flaky 的 cluster 测试（Rich Trott） [#4934](https://github.com/nodejs/node/pull/4934)
* \[[`f5d29d7ac4`](https://github.com/nodejs/node/commit/f5d29d7ac4)] - **test**：为 TLS 对等证书指纹添加断言（Alan Cohen） [#4923](https://github.com/nodejs/node/pull/4923)
* \[[`618427cea6`](https://github.com/nodejs/node/commit/618427cea6)] - **test**：修复 test-tls-zero-clear-in 的不稳定性（Santiago Gimeno） [#4888](https://github.com/nodejs/node/pull/4888)
* \[[`8700c39c70`](https://github.com/nodejs/node/commit/8700c39c70)] - **test**：修复不规则空白字符问题（Roman Reiss） [#4864](https://github.com/nodejs/node/pull/4864)
* \[[`2b026c9d5a`](https://github.com/nodejs/node/commit/2b026c9d5a)] - **test**：fs.link() 测试在同一设备上运行（Drew Folta） [#4861](https://github.com/nodejs/node/pull/4861)
* \[[`80a637ac4d`](https://github.com/nodejs/node/commit/80a637ac4d)] - **test**：限制重复声明变量的作用域（Rich Trott） [#4854](https://github.com/nodejs/node/pull/4854)
* \[[`8c4903d4ef`](https://github.com/nodejs/node/commit/8c4903d4ef)] - **test**：更新箭头函数样式（cjihrig） [#4813](https://github.com/nodejs/node/pull/4813)
* \[[`0a44e6a447`](https://github.com/nodejs/node/commit/0a44e6a447)] - **test**：将 test-tick-processor 标记为 flaky（Rich Trott） [#4809](https://github.com/nodejs/node/pull/4809)
* \[[`363460616c`](https://github.com/nodejs/node/commit/363460616c)] - **test**：重构 test-net-settimeout（Rich Trott） [#4799](https://github.com/nodejs/node/pull/4799)
* \[[`6841d82c22`](https://github.com/nodejs/node/commit/6841d82c22)] - **test**：移除 http flood 测试中的竞态条件（Rich Trott） [#4793](https://github.com/nodejs/node/pull/4793)
* \[[`b5bae32847`](https://github.com/nodejs/node/commit/b5bae32847)] - **test**：移除 test-http-exit-delay（Rich Trott） [#4786](https://github.com/nodejs/node/pull/4786)
* \[[`60514f9521`](https://github.com/nodejs/node/commit/60514f9521)] - **test**：重构 test-fs-watch（Rich Trott） [#4776](https://github.com/nodejs/node/pull/4776)
* \[[`2a3a431119`](https://github.com/nodejs/node/commit/2a3a431119)] - **test**：修复 `net-socket-timeout-unref` 的不稳定性（Santiago Gimeno） [#4772](https://github.com/nodejs/node/pull/4772)
* \[[`9e6f3632a1`](https://github.com/nodejs/node/commit/9e6f3632a1)] - **test**：从测试中移除 Object.observe（Vladimir Kurchatkin） [#4769](https://github.com/nodejs/node/pull/4769)
* \[[`f78daa67b8`](https://github.com/nodejs/node/commit/f78daa67b8)] - **test**：使 npm 测试可在预发布 node 版本上运行（Kat Marchán） [#4960](https://github.com/nodejs/node/pull/4960)
* \[[`1c03191b6a`](https://github.com/nodejs/node/commit/1c03191b6a)] - **test**：使 npm 测试可在预发布 node 版本上运行（Kat Marchán） [#4872](https://github.com/nodejs/node/pull/4872)
* \[[`d9c22cc896`](https://github.com/nodejs/node/commit/d9c22cc896)] - **test,buffer**：重构重复声明（Rich Trott） [#4893](https://github.com/nodejs/node/pull/4893)
* \[[`5c4960468a`](https://github.com/nodejs/node/commit/5c4960468a)] - **tls**：在句柄关闭时将 `.ssl` 置空（Fedor Indutny） [#5168](https://github.com/nodejs/node/pull/5168)
* \[[`c0f5f01c9c`](https://github.com/nodejs/node/commit/c0f5f01c9c)] - **tls**：使用 let 限制循环变量作用域（Rich Trott） [#4853](https://github.com/nodejs/node/pull/4853)
* \[[`c86627e0d1`](https://github.com/nodejs/node/commit/c86627e0d1)] - **(SEMVER-MINOR)** **tls**：为 createSecurePair 添加 `options` 参数（Коренберг Марк） [#2441](https://github.com/nodejs/node/pull/2441)
* \[[`c908ff36f4`](https://github.com/nodejs/node/commit/c908ff36f4)] - **tls_wrap**：为 UV\_EPROTO 提供错误报告（Fedor Indutny） [#4885](https://github.com/nodejs/node/pull/4885)
* \[[`cebe3b95e3`](https://github.com/nodejs/node/commit/cebe3b95e3)] - **tools**：不通过 fork 运行 tick processor（Matt Loring） [#4224](https://github.com/nodejs/node/pull/4224)
* \[[`70d8827714`](https://github.com/nodejs/node/commit/70d8827714)] - **(SEMVER-MINOR)** **tools**：为 node 二进制文件添加 --prof-process 标志（Matt Loring） [#4021](https://github.com/nodejs/node/pull/4021)
* \[[`a43b9291c7`](https://github.com/nodejs/node/commit/a43b9291c7)] - **tools**：替换过时的 ESLint 规则（Rich Trott） [#5214](https://github.com/nodejs/node/pull/5214)
* \[[`a89c6f58f1`](https://github.com/nodejs/node/commit/a89c6f58f1)] - **tools**：将 ESLint 更新到 2.1.0 版本（Rich Trott） [#5214](https://github.com/nodejs/node/pull/5214)
* \[[`789f62196a`](https://github.com/nodejs/node/commit/789f62196a)] - **tools**：移除过时的 lint 规则（Rich Trott） [#5214](https://github.com/nodejs/node/pull/5214)
* \[[`154772cfa8`](https://github.com/nodejs/node/commit/154772cfa8)] - **tools**：在 doc html 生成中将类型解析为链接（Claudio Rodriguez） [#4741](https://github.com/nodejs/node/pull/4741)
* \[[`9237b6e38a`](https://github.com/nodejs/node/commit/9237b6e38a)] - **tools**：修复文档解析中的警告（Shigeki Ohtsu） [#4537](https://github.com/nodejs/node/pull/4537)
* \[[`c653cc0c03`](https://github.com/nodejs/node/commit/c653cc0c03)] - **tools**：添加推荐的 ES6 lint 规则（Rich Trott） [#5210](https://github.com/nodejs/node/pull/5210)
* \[[`993d9b7df0`](https://github.com/nodejs/node/commit/993d9b7df0)] - **tools**：添加推荐的 lint 规则（Rich Trott） [#5188](https://github.com/nodejs/node/pull/5188)
* \[[`8423125223`](https://github.com/nodejs/node/commit/8423125223)] - **tools**：移除 .eslintrc 中过多的注释（Rich Trott） [#5151](https://github.com/nodejs/node/pull/5151)
* \[[`4c687c98e4`](https://github.com/nodejs/node/commit/4c687c98e4)] - **tools**：为 linter 启用 no-proto 规则（Jackson Tian） [#5140](https://github.com/nodejs/node/pull/5140)
* \[[`28e4e6f312`](https://github.com/nodejs/node/commit/28e4e6f312)] - **tools**：禁止缩进时混用空格和制表符（Rich Trott） [#5135](https://github.com/nodejs/node/pull/5135)
* \[[`50c6fe8604`](https://github.com/nodejs/node/commit/50c6fe8604)] - **tools**：将 eslint stylistic issues 部分按字母顺序排列（Rich Trott）
* \[[`ee594f1ed7`](https://github.com/nodejs/node/commit/ee594f1ed7)] - **tools**：为正则表达式中的空字符类添加 lint 检查（Rich Trott） [#5115](https://github.com/nodejs/node/pull/5115)
* \[[`bf0e239e99`](https://github.com/nodejs/node/commit/bf0e239e99)] - **tools**：为一元运算符周围的空格添加 lint 检查（Rich Trott） [#5063](https://github.com/nodejs/node/pull/5063)
* \[[`6345acb792`](https://github.com/nodejs/node/commit/6345acb792)] - **tools**：为 linter 启用 no-redeclare 规则（Rich Trott） [#5047](https://github.com/nodejs/node/pull/5047)
* \[[`1dae175b62`](https://github.com/nodejs/node/commit/1dae175b62)] - **tools**：修复 doc/json.js 中重复声明的变量（Rich Trott） [#5047](https://github.com/nodejs/node/pull/5047)
* \[[`d1d220a1cf`](https://github.com/nodejs/node/commit/d1d220a1cf)] - **tools**：将 lint 应用到文档工具（Rich Trott） [#4973](https://github.com/nodejs/node/pull/4973)
* \[[`eddde1f60c`](https://github.com/nodejs/node/commit/eddde1f60c)] - **tools**：修复 JSON 文档中构造函数检测问题（Timothy Gu） [#4966](https://github.com/nodejs/node/pull/4966)
* \[[`bcb327c8dd`](https://github.com/nodejs/node/commit/bcb327c8dd)] - **tools**：在 JSON 文档中添加属性类型（Timothy Gu） [#4884](https://github.com/nodejs/node/pull/4884)
* \[[`9a06a4c116`](https://github.com/nodejs/node/commit/9a06a4c116)] - **tools**：启用各种 ESLint 错误规则（Roman Reiss） [#4864](https://github.com/nodejs/node/pull/4864)
* \[[`38474cfd49`](https://github.com/nodejs/node/commit/38474cfd49)] - **tools**：向 eslint 添加箭头函数规则（cjihrig） [#4813](https://github.com/nodejs/node/pull/4813)
* \[[`f898abaa4f`](https://github.com/nodejs/node/commit/f898abaa4f)] - **tools**：修复设置包含 & 符号的路径（Brian White） [#4804](https://github.com/nodejs/node/pull/4804)
* \[[`d10bee8e79`](https://github.com/nodejs/node/commit/d10bee8e79)] - **tools**：在 eslint 中启用 no-extra-semi 规则（Michaël Zasso） [#2205](https://github.com/nodejs/node/pull/2205)
* \[[`01006392cf`](https://github.com/nodejs/node/commit/01006392cf)] - **tools,doc**：修复 lint 错误（Rich Trott） [#5161](https://github.com/nodejs/node/pull/5161)
* \[[`57a5f8731a`](https://github.com/nodejs/node/commit/57a5f8731a)] - **url**：使用 let 更改变量作用域（Kári Tristan Helgason） [#4867](https://github.com/nodejs/node/pull/4867)

<a id="4.3.2"></a>

## 2016-03-02，版本 4.3.2 'Argon' (LTS), @thealphanerd

这是一个安全发布，仅包含一个提交：由于最近的安全公告而更新 openssl。你可以在 [Node.js 网站](https://nodejs.org/en/blog/vulnerability/openssl-march-2016/) 上阅读更多关于该安全公告的信息。

### 主要变更

* **openssl**：从 1.0.2f 升级到 1.0.2g (Ben Noordhuis) [#5507](https://github.com/nodejs/node/pull/5507)
  * 修复了解析格式错误的 DSA 密钥时的双重释放缺陷，该缺陷可能被用于 DoS 或内存破坏攻击。实际上，利用该缺陷进行实际攻击可能非常困难，因此对于 Node.js 用户而言，其严重性被认为较低。更多信息见 [CVE-2016-0705](https://www.openssl.org/news/vulnerabilities.html#2016-0705)。
  * 修复了一个在某些极其罕见的情况下会导致内存破坏的缺陷，相关于内部 `BN_hex2bn()` 和 `BN_dec2bn()` 函数。据信 Node.js 并未调用使用这些函数的代码路径，因此通过 Node.js 利用该缺陷进行实际攻击 _不太可能_ 成功。更多信息见 [CVE-2016-0797](https://www.openssl.org/news/vulnerabilities.html#2016-0797)。
  * 修复了一个使得 _[CacheBleed Attack](https://ssrg.nicta.com.au/projects/TS/cachebleed/)_ 成为可能的缺陷。该缺陷使攻击者能够执行侧信道攻击，从而可能恢复完整的 RSA 私钥。它仅影响在使用超线程时的 Intel Sandy Bridge（以及可能更早的）微架构。更新的微架构，包括 Haswell，不受影响。更多信息见 [CVE-2016-0702](https://www.openssl.org/news/vulnerabilities.html#2016-0702)。

## 提交

* \[[`c133797d09`](https://github.com/nodejs/node/commit/c133797d09)] - **deps**：将 openssl 升级到 1.0.2g (Ben Noordhuis) [#5507](https://github.com/nodejs/node/pull/5507)

<a id="4.3.1"></a>

## 2016-02-16，版本 4.3.1 'Argon' (LTS), @thealphanerd

### 主要变更

* **buffer**
  * 使 byteLength 正常适用于 Buffer (Jackson Tian)
    * [#4738](https://github.com/nodejs/node/pull/4738)
* **debugger**
  * 防止从非 node 上下文调用 (Ben Noordhuis)
    * [#4328](https://github.com/nodejs/node/pull/4328)
    * 修复 debugger 中的段错误
  * 不要接管 debug 上下文 (Myles Borins)
    * [#4819](https://github.com/nodejs/node/pull/4819)
    * 修复使用 util 方法时 debugger 中的崩溃
* **deps**
  * 更新到 http-parser 2.5.2 (James Snell)
    * [#5238](https://github.com/nodejs/node/pull/5238)

### 提交

* \[[`748d2b4de1`](https://github.com/nodejs/node/commit/748d2b4de1)] - **buffer**：使 byteLength 正常适用于 Buffer (Jackson Tian) [#4738](https://github.com/nodejs/node/pull/4738)
* \[[`fb615bdaf4`](https://github.com/nodejs/node/commit/fb615bdaf4)] - **buffer**：移除不必要的 TODO 注释 (Peter Geiss) [#4719](https://github.com/nodejs/node/pull/4719)
* \[[`b8213ba7e1`](https://github.com/nodejs/node/commit/b8213ba7e1)] - **cluster**：断开连接时忽略 queryServer 消息 (Santiago Gimeno) [#4465](https://github.com/nodejs/node/pull/4465)
* \[[`f8a676ed59`](https://github.com/nodejs/node/commit/f8a676ed59)] - **cluster**：修复设置 suicide 属性的竞态条件 (Santiago Gimeno) [#4349](https://github.com/nodejs/node/pull/4349)
* \[[`9d4a226dad`](https://github.com/nodejs/node/commit/9d4a226dad)] - **crypto**：清除 ECDH::Initialize 中的错误栈 (Fedor Indutny) [#4689](https://github.com/nodejs/node/pull/4689)
* \[[`583f3347d8`](https://github.com/nodejs/node/commit/583f3347d8)] - **debugger**：移除变量重复声明 (Rich Trott) [#4633](https://github.com/nodejs/node/pull/4633)
* \[[`667f7a7ab3`](https://github.com/nodejs/node/commit/667f7a7ab3)] - **debugger**：防止从非 node 上下文调用 (Ben Noordhuis) [#4328](https://github.com/nodejs/node/pull/4328)
* \[[`188cff3c31`](https://github.com/nodejs/node/commit/188cff3c31)] - **deps**：更新到 http-parser 2.5.2 (James Snell) [#5238](https://github.com/nodejs/node/pull/5238)
* \[[`6e829b44e3`](https://github.com/nodejs/node/commit/6e829b44e3)] - **dgram**：防止 bind() 的优化被禁用 (Brian White) [#4613](https://github.com/nodejs/node/pull/4613)
* \[[`c3956d05b1`](https://github.com/nodejs/node/commit/c3956d05b1)] - **doc**：更新 CoC 中的个人特质列表 (Kat Marchán) [#4801](https://github.com/nodejs/node/pull/4801)
* \[[`39cb69ca21`](https://github.com/nodejs/node/commit/39cb69ca21)] - **doc**：修正 TOC 的样式 (Roman Reiss) [#4748](https://github.com/nodejs/node/pull/4748)
* \[[`cb5986da81`](https://github.com/nodejs/node/commit/cb5986da81)] - **doc**：添加 `servername` 参数文档 (Alexander Makarenko) [#4729](https://github.com/nodejs/node/pull/4729)
* \[[`91066b5f34`](https://github.com/nodejs/node/commit/91066b5f34)] - **doc**：更新发布文档中的 branch-diff 参数 (Rod Vagg) [#4691](https://github.com/nodejs/node/pull/4691)
* \[[`9ca24de41d`](https://github.com/nodejs/node/commit/9ca24de41d)] - **doc**：添加更多 stream 选项的文档 (zoubin) [#4639](https://github.com/nodejs/node/pull/4639)
* \[[`437d0e336d`](https://github.com/nodejs/node/commit/437d0e336d)] - **doc**：提到 http.Server 继承自 net.Server (Ryan Sobol) [#4455](https://github.com/nodejs/node/pull/4455)
* \[[`393e569160`](https://github.com/nodejs/node/commit/393e569160)] - **doc**：润色 setTimeout() 文档 (Rich Trott) [#4434](https://github.com/nodejs/node/pull/4434)
* \[[`e2a682ecc3`](https://github.com/nodejs/node/commit/e2a682ecc3)] - **doc**：修复 process.markdown 中的格式 (Rich Trott) [#4433](https://github.com/nodejs/node/pull/4433)
* \[[`75b0ea85bd`](https://github.com/nodejs/node/commit/75b0ea85bd)] - **doc**：在 fs.markdown 的 Write/ReadStream 中添加 path 属性 (Claudio Rodriguez) [#4368](https://github.com/nodejs/node/pull/4368)
* \[[`48c2783421`](https://github.com/nodejs/node/commit/48c2783421)] - **doc**：添加文档工作组 (Bryan English) [#4244](https://github.com/nodejs/node/pull/4244)
* \[[`c0432e9f56`](https://github.com/nodejs/node/commit/c0432e9f56)] - **doc**：恢复 ICU 第三方软件许可证 (Richard Lau) [#4762](https://github.com/nodejs/node/pull/4762)
* \[[`36a4159dab`](https://github.com/nodejs/node/commit/36a4159dab)] - **doc**：使用 tools/license-builder.sh 重建 LICENSE (Rod Vagg) [#4194](https://github.com/nodejs/node/pull/4194)
* \[[`a2998a1bce`](https://github.com/nodejs/node/commit/a2998a1bce)] - **gitignore**：不要忽略 debug 模块 (Michaël Zasso) [#2286](https://github.com/nodejs/node/pull/2286)
* \[[`661b2557d9`](https://github.com/nodejs/node/commit/661b2557d9)] - **http**：移除变量重复声明 (Rich Trott) [#4612](https://github.com/nodejs/node/pull/4612)
* \[[`1bb2967d48`](https://github.com/nodejs/node/commit/1bb2967d48)] - **http**：修复非字符串头部值拼接 (Brian White) [#4460](https://github.com/nodejs/node/pull/4460)
* \[[`15ed64e34c`](https://github.com/nodejs/node/commit/15ed64e34c)] - **lib**：修复 eslint 更新后的样式问题 (Michaël Zasso) [nodejs/io.js#2286](https://github.com/nodejs/io.js/pull/2286)
* \[[`2e92a1a6b4`](https://github.com/nodejs/node/commit/2e92a1a6b4)] - **module**：将不必要的工作移出早期返回路径 (Andres Suarez) [#3579](https://github.com/nodejs/node/pull/3579)
* \[[`40c8e6d75d`](https://github.com/nodejs/node/commit/40c8e6d75d)] - **net**：移除 connect 中的 hot path 注释 (Evan Lucas) [#4648](https://github.com/nodejs/node/pull/4648)
* \[[`8ed0c1c22c`](https://github.com/nodejs/node/commit/8ed0c1c22c)] - **net**：修复 Android 的 DNS 查找 (Josh Dague) [#4580](https://github.com/nodejs/node/pull/4580)
* \[[`15fa555204`](https://github.com/nodejs/node/commit/15fa555204)] - **net, doc**：修复 net.js 中的换行 lint 问题 (James M Snell) [#4588](https://github.com/nodejs/node/pull/4588)
* \[[`1b070e48e0`](https://github.com/nodejs/node/commit/1b070e48e0)] - **node\_contextify**：不要接管 debug 上下文 (Myles Borins) [#4815](https://github.com/nodejs/node/issues/4815)
* \[[`4fbcb47fe9`](https://github.com/nodejs/node/commit/4fbcb47fe9)] - **readline**：移除 XXX 并输出 debuglog (Kohei TAKATA) [#4690](https://github.com/nodejs/node/pull/4690)
* \[[`26f02405d0`](https://github.com/nodejs/node/commit/26f02405d0)] - **repl**：确保 historyPath 已裁剪 (Evan Lucas) [#4539](https://github.com/nodejs/node/pull/4539)
* \[[`5990ba2a0a`](https://github.com/nodejs/node/commit/5990ba2a0a)] - **src**：移除变量的重复声明 (Rich Trott) [#4605](https://github.com/nodejs/node/pull/4605)
* \[[`c41ed59dbc`](https://github.com/nodejs/node/commit/c41ed59dbc)] - **src**：不要使用 ERR\_peek\_error() 检查失败 (Ben Noordhuis) [#4731](https://github.com/nodejs/node/pull/4731)
* \[[`d71f9992f9`](https://github.com/nodejs/node/commit/d71f9992f9)] - **stream**：移除 transform 中无用的 if 测试 (zoubin) [#4617](https://github.com/nodejs/node/pull/4617)
* \[[`f205e9920e`](https://github.com/nodejs/node/commit/f205e9920e)] - **test**：修复 tls-no-rsa-key 的不稳定问题 (Santiago Gimeno) [#4043](https://github.com/nodejs/node/pull/4043)
* \[[`447347cd62`](https://github.com/nodejs/node/commit/447347cd62)] - **test**：修复 space-in-parens ESLint 规则相关问题 (Roman Reiss) [#4753](https://github.com/nodejs/node/pull/4753)
* \[[`be8274508c`](https://github.com/nodejs/node/commit/be8274508c)] - **test**：改进 test-cluster-disconnect-suicide-race (Rich Trott) [#4739](https://github.com/nodejs/node/pull/4739)
* \[[`0178001163`](https://github.com/nodejs/node/commit/0178001163)] - **test**：使 test-cluster-disconnect-leak 可靠 (Rich Trott) [#4736](https://github.com/nodejs/node/pull/4736)
* \[[`d615757da2`](https://github.com/nodejs/node/commit/d615757da2)] - **test**：修复不稳定的 test-net-socket-local-address (cjihrig) [#4650](https://github.com/nodejs/node/pull/4650)
* \[[`baa0a3dff5`](https://github.com/nodejs/node/commit/baa0a3dff5)] - **test**：修复 test-net-server-pause-on-connect 中的竞态 (Rich Trott) [#4637](https://github.com/nodejs/node/pull/4637)
* \[[`909b5167cb`](https://github.com/nodejs/node/commit/909b5167cb)] - **test**：移除测试中的 1 秒延迟 (Rich Trott) [#4616](https://github.com/nodejs/node/pull/4616)
* \[[`8ea76608ed`](https://github.com/nodejs/node/commit/8ea76608ed)] - **test**：将资源密集型测试移至顺序执行 (Rich Trott) [#4615](https://github.com/nodejs/node/pull/4615)
* \[[`7afcdd358e`](https://github.com/nodejs/node/commit/7afcdd358e)] - **test**：common 模块只需包含一次 (Rich Trott) [#4611](https://github.com/nodejs/node/pull/4611)
* \[[`0e02eb0bbe`](https://github.com/nodejs/node/commit/0e02eb0bbe)] - **test**：http 模块只需包含一次 (Rich Trott) [#4606](https://github.com/nodejs/node/pull/4606)
* \[[`34d9e48bb6`](https://github.com/nodejs/node/commit/34d9e48bb6)] - **test**：修复 `http-upgrade-client` 的不稳定问题 (Santiago Gimeno) [#4602](https://github.com/nodejs/node/pull/4602)
* \[[`556703d531`](https://github.com/nodejs/node/commit/556703d531)] - **test**：修复不稳定的 unrefed timers 测试 (Rich Trott) [#4599](https://github.com/nodejs/node/pull/4599)
* \[[`3d5bc69796`](https://github.com/nodejs/node/commit/3d5bc69796)] - **test**：修复 `http-upgrade-agent` 的不稳定问题 (Santiago Gimeno) [#4520](https://github.com/nodejs/node/pull/4520)
* \[[`ec24d3767b`](https://github.com/nodejs/node/commit/ec24d3767b)] - **test**：修复不稳定的 test-cluster-shared-leak (Rich Trott) [#4510](https://github.com/nodejs/node/pull/4510)
* \[[`a256790327`](https://github.com/nodejs/node/commit/a256790327)] - **test**：修复不稳定的 cluster-net-send (Brian White) [#4444](https://github.com/nodejs/node/pull/4444)
* \[[`6809c2be1a`](https://github.com/nodejs/node/commit/6809c2be1a)] - **test**：修复不稳定的 child-process-fork-regr-gh-2847 (Brian White) [#4442](https://github.com/nodejs/node/pull/4442)
* \[[`e6448aa36b`](https://github.com/nodejs/node/commit/e6448aa36b)] - **test**：使用 addon.md 的块标题作为测试目录名 (Rod Vagg) [#4412](https://github.com/nodejs/node/pull/4412)
* \[[`305d340fca`](https://github.com/nodejs/node/commit/305d340fca)] - **test**：测试 addon.md 中每个块都包含 js 和 cc (Rod Vagg) [#4411](https://github.com/nodejs/node/pull/4411)
* \[[`f213406575`](https://github.com/nodejs/node/commit/f213406575)] - **test**：修复 tls-multi-key 竞态条件 (Santiago Gimeno) [#3966](https://github.com/nodejs/node/pull/3966)
* \[[`607f545568`](https://github.com/nodejs/node/commit/607f545568)] - **test**：修复 eslint 更新后的样式问题 (Michaël Zasso) [nodejs/io.js#2286](https://github.com/nodejs/io.js/pull/2286)
* \[[`aefb20a94f`](https://github.com/nodejs/node/commit/aefb20a94f)] - **tls**：在 CertCb 中复制客户端 CA 和证书存储 (Fedor Indutny) [#3537](https://github.com/nodejs/node/pull/3537)
* \[[`7821b3e305`](https://github.com/nodejs/node/commit/7821b3e305)] - **tls_legacy**：不要读取 OpenSSL 的栈 (Fedor Indutny) [#4624](https://github.com/nodejs/node/pull/4624)
* \[[`b66db49f94`](https://github.com/nodejs/node/commit/b66db49f94)] - **tools**：为发布工具添加子密钥支持 (Myles Borins) [#4807](https://github.com/nodejs/node/pull/4807)
* \[[`837ebd1985`](https://github.com/nodejs/node/commit/837ebd1985)] - **tools**：启用 space-in-parens ESLint 规则 (Roman Reiss) [#4753](https://github.com/nodejs/node/pull/4753)
* \[[`066d5e7da2`](https://github.com/nodejs/node/commit/066d5e7da2)] - **tools**：修复 eslint 更新后的样式问题 (Michaël Zasso) [nodejs/io.js#2286](https://github.com/nodejs/io.js/pull/2286)
* \[[`b20ea69f46`](https://github.com/nodejs/node/commit/b20ea69f46)] - **tools**：更新 eslint 配置 (Michaël Zasso) [nodejs/io.js#2286](https://github.com/nodejs/io.js/pull/2286)
* \[[`2e0352d50c`](https://github.com/nodejs/node/commit/2e0352d50c)] - **tools**：将 eslint 更新到 v1.10.3 (Michaël Zasso) [nodejs/io.js#2286](https://github.com/nodejs/io.js/pull/2286)
* \[[`c96800a432`](https://github.com/nodejs/node/commit/c96800a432)] - **tools**：修复 ICU 的 license-builder.sh (Richard Lau) [#4762](https://github.com/nodejs/node/pull/4762)
* \[[`720b03dca7`](https://github.com/nodejs/node/commit/720b03dca7)] - **tools**：添加 license-builder.sh 用于构建 LICENSE (Rod Vagg) [#4194](https://github.com/nodejs/node/pull/4194)

<a id="4.3.0"></a>

## 2016-02-09，版本 4.3.0 'Argon'（LTS），@jasnell

这是一个重要的安全更新。所有 Node.js 用户都应查看 nodejs.org 上的安全更新摘要，以了解已修补漏洞的详细信息。

请注意，此版本包含一个不向后兼容的更改，用于解决一个安全问题。此更改将 LTS v4.x 线的版本提升到 v4.3.0。v4.2.x 将不会再有进一步更新。

### 重要变更

* **http**：修复 HTTP 头解析中针对请求和响应的缺陷，这些缺陷可能导致请求走私（CVE-2016-2086）或响应拆分（CVE-2016-2216）。现在 HTTP 头解析与 HTTP 规范更加一致，包括对可接受字符的限制。
* **http-parser**：从 2.5.0 升级到 2.5.1
* **openssl**：从 1.0.2e 升级到 1.0.2f。为缓解 Logjam 攻击，TLS 客户端现在会拒绝参数短于 1024 位的 Diffie-Hellman 握手，之前的限制是 768 位。
* **src**：
  * 引入新的命令行标志 `--security-revert={cvenum}`，用于选择性回退特定的 CVE 修复
  * 允许通过 `--security-revert=CVE-2016-2216` 选择性回退对 CVE-2016-2216 的修复

### 提交

* \[[`d94f864abd`](https://github.com/nodejs/node/commit/d94f864abd)] - **deps**：向 openssl s_client 添加 -no_rand_screen（Shigeki Ohtsu） [#1836](https://github.com/nodejs/node/pull/1836)
* \[[`136295e202`](https://github.com/nodejs/node/commit/136295e202)] - **deps**：将 openssl 源码升级到 1.0.2f（Myles Borins） [#4961](https://github.com/nodejs/node/pull/4961)
* \[[`0eae95eae3`](https://github.com/nodejs/node/commit/0eae95eae3)] - **(SEMVER-MINOR)** **deps**：将 http-parser 更新到版本 2.5.1（James M Snell）
* \[[`cf2b714b02`](https://github.com/nodejs/node/commit/cf2b714b02)] - **(SEMVER-MINOR)** **http**：严格禁止头部中的无效字符（James M Snell）
* \[[`49ae2e0334`](https://github.com/nodejs/node/commit/49ae2e0334)] - **src**：避免 node_revert.cc 中的编译器警告（James M Snell）
* \[[`da3750f981`](https://github.com/nodejs/node/commit/da3750f981)] - **(SEMVER-MAJOR)** **src**：添加 --security-revert 命令行标志（James M Snell）

<a id="4.2.6"></a>

## 2016-01-21，版本 4.2.6 'Argon'（LTS），@TheAlphaNerd

### 重要变更

* 修复调试器和性能分析器功能中的回归问题

### 已知问题

* 在 `beforeExit` 期间运行的未引用定时器仍有一些问题尚待解决。请参见 [#1264](https://github.com/nodejs/node/issues/1264)。
* REPL 中的代理对可能会冻结终端。[#690](https://github.com/nodejs/node/issues/690)
* 在 DNS 查询进行中时调用 `dns.setServers()` 可能会在断言失败时导致进程崩溃。[#894](https://github.com/nodejs/node/issues/894)
* 在两个完整主机之间解析时，`url.resolve` 可能会传递 url 的 auth 部分，参见 [#1435](https://github.com/nodejs/node/issues/1435)。

### 提交

* \[[`1408f7abb1`](https://github.com/nodejs/node/commit/1408f7abb1)] - **module,src**：不要以 -1 lineOffset 包装模块（cjihrig） [#4298](https://github.com/nodejs/node/pull/4298)
* \[[`1f8e1472cc`](https://github.com/nodejs/node/commit/1f8e1472cc)] - **test**：为调试单行文件添加测试（cjihrig） [#4298](https://github.com/nodejs/node/pull/4298)

<a id="4.2.5"></a>

## 2016-01-20，版本 4.2.5 'Argon'（LTS），@TheAlphaNerd

维护性更新。

### 重要变更

* **assert**
  * 兼容扩展 Error 的 ES6 类（Rich Trott） [#4166](https://github.com/nodejs/node/pull/4166)
* **build**
  * 添加 "--partly-static" 构建选项（Super Zheng） [#4152](https://github.com/nodejs/node/pull/4152)
* **deps**
  * 从上游 V8 回移植 066747e（Ali Ijaz Sheikh） [#4655](https://github.com/nodejs/node/pull/4655)
  * 从 V8 上游回移植 200315c（Vladimir Kurchatkin） [#4128](https://github.com/nodejs/node/pull/4128)
  * 将 libuv 升级到 1.8.0（Saúl Ibarra Corretgé）
* **docs**
  * 在 70 个不同的提交中完成了各种更新！
* **repl**
  * 为语法错误附加位置信息（cjihrig） [#4013](https://github.com/nodejs/node/pull/4013)
  * 加载目录时显示错误消息（Prince J Wesley） [#4170](https://github.com/nodejs/node/pull/4170)
* **tests**
  * 在 50 多个提交中完成了各种更新
* **tools**
  * 为 cpplint 添加 tap 输出（Johan Bergström） [#3448](https://github.com/nodejs/node/pull/3448)
* **util**
  * 允许查找隐藏值（cjihrig） [#3988](https://github.com/nodejs/node/pull/3988)

### 已知问题

* 在 `beforeExit` 期间运行的未引用定时器仍有一些问题尚待解决。请参见 [#1264](https://github.com/nodejs/node/issues/1264)。
* REPL 中的代理对可能会冻结终端。[#690](https://github.com/nodejs/node/issues/690)
* 在 DNS 查询进行中时调用 `dns.setServers()` 可能会在断言失败时导致进程崩溃。[#894](https://github.com/nodejs/node/issues/894)
* 在两个完整主机之间解析时，`url.resolve` 可能会传递 url 的 auth 部分，参见 [#1435](https://github.com/nodejs/node/issues/1435)。

### 提交

* \[[`87181cd74c`](https://github.com/nodejs/node/commit/87181cd74c)] - **assert**：兼容扩展 Error 的 ES6 类（Rich Trott） [#4166](https://github.com/nodejs/node/pull/4166)
* \[[`901172a783`](https://github.com/nodejs/node/commit/901172a783)] - **assert**：typed array deepequal 性能修复（Claudio Rodriguez） [#4330](https://github.com/nodejs/node/pull/4330)
* \[[`55336810ee`](https://github.com/nodejs/node/commit/55336810ee)] - **async_wrap**：在析构函数中调用回调（Trevor Norris） [#3461](https://github.com/nodejs/node/pull/3461)
* \[[`a8b45e9e96`](https://github.com/nodejs/node/commit/a8b45e9e96)] - **async_wrap**：新实例获得 uid（Trevor Norris） [#3461](https://github.com/nodejs/node/pull/3461)
* \[[`49f16d77c4`](https://github.com/nodejs/node/commit/49f16d77c4)] - **async_wrap**：允许某些钩子是可选的（Trevor Norris） [#3461](https://github.com/nodejs/node/pull/3461)
* \[[`44ee33f945`](https://github.com/nodejs/node/commit/44ee33f945)] - **buffer**：重构创建 buffer（Jackson Tian） [#4340](https://github.com/nodejs/node/pull/4340)
* \[[`138d004ac0`](https://github.com/nodejs/node/commit/138d004ac0)] - **buffer**：从 new Buffer(0) 创建 Buffer 的更快路径（Jackson Tian） [#4326](https://github.com/nodejs/node/pull/4326)
* \[[`c6dc2a1609`](https://github.com/nodejs/node/commit/c6dc2a1609)] - **buffer**：防止 Buffer 构造函数去优化（Bryce Baril） [#4158](https://github.com/nodejs/node/pull/4158)
* \[[`a320045e68`](https://github.com/nodejs/node/commit/a320045e68)] - **buffer**：在 byteLength() 中默认使用 UTF8（Tom Gallacher） [#4010](https://github.com/nodejs/node/pull/4010)
* \[[`c5f71ac771`](https://github.com/nodejs/node/commit/c5f71ac771)] - **build**：添加 "--partly-static" 构建选项（Super Zheng） [#4152](https://github.com/nodejs/node/pull/4152)
* \[[`e6c25335ea`](https://github.com/nodejs/node/commit/e6c25335ea)] - **build**：在 --enable-asan 时省略 -gline-tables-only（Ben Noordhuis） [#3680](https://github.com/nodejs/node/pull/3680)
* \[[`80b4ba286c`](https://github.com/nodejs/node/commit/80b4ba286c)] - **build**：AIX npm 支持更新 - 第 1 部分（Michael Dawson） [#3114](https://github.com/nodejs/node/pull/3114)
* \[[`35e32985ca`](https://github.com/nodejs/node/commit/35e32985ca)] - **child_process**：防范竞态条件（Rich Trott） [#4418](https://github.com/nodejs/node/pull/4418)
* \[[`48564204f0`](https://github.com/nodejs/node/commit/48564204f0)] - **child_process**：刷新正在消费的流（Dave） [#4071](https://github.com/nodejs/node/pull/4071)
* \[[`481d59a74c`](https://github.com/nodejs/node/commit/481d59a74c)] - **configure**：修复 arm vfpv2（Jörg Krause） [#4203](https://github.com/nodejs/node/pull/4203)
* \[[`d19da6638d`](https://github.com/nodejs/node/commit/d19da6638d)] - **crypto**：以与普通链相同的方式加载 PFX 链（Fedor Indutny） [#4165](https://github.com/nodejs/node/pull/4165)
* \[[`b8e75de1f3`](https://github.com/nodejs/node/commit/b8e75de1f3)] - **crypto**：修复带 FIPS 的原生模块编译（Stefan Budeanu） [#4023](https://github.com/nodejs/node/pull/4023)
* \[[`b7c3fb7f75`](https://github.com/nodejs/node/commit/b7c3fb7f75)] - **crypto**：在 FIPS 模式下禁用 crypto.createCipher（Stefan Budeanu） [#3754](https://github.com/nodejs/node/pull/3754)
* \[[`31b4091a1e`](https://github.com/nodejs/node/commit/31b4091a1e)] - **debugger**：当 repl 发出 'exit' 时也退出（Felix Böhm） [#2369](https://github.com/nodejs/node/pull/2369)
* \[[`9baa5618f5`](https://github.com/nodejs/node/commit/9baa5618f5)] - **deps**：从上游 V8 回移植 066747e（Ali Ijaz Sheikh） [#4655](https://github.com/nodejs/node/pull/4655)
* \[[`c3a9d8a62e`](https://github.com/nodejs/node/commit/c3a9d8a62e)] - **deps**：从 V8 上游回移植 200315c（Vladimir Kurchatkin） [#4128](https://github.com/nodejs/node/pull/4128)
* \[[`1ebb0c0fdf`](https://github.com/nodejs/node/commit/1ebb0c0fdf)] - **deps**：将 libuv 升级到 1.8.0（Saúl Ibarra Corretgé） [#4276](https://github.com/nodejs/node/pull/4276)
* \[[`253fe3e7c8`](https://github.com/nodejs/node/commit/253fe3e7c8)] - **dns**：移除不存在的 exports.ADNAME（Roman Reiss） [#3051](https://github.com/nodejs/node/pull/3051)
* \[[`8c2b65ad82`](https://github.com/nodejs/node/commit/8c2b65ad82)] - **doc**：澄清 http.request() 中的默认协议（cjihrig） [#4714](https://github.com/nodejs/node/pull/4714)
* \[[`33e72e135f`](https://github.com/nodejs/node/commit/33e72e135f)] - **doc**：尽可能更新链接为 https（jpersson） [#4054](https://github.com/nodejs/node/pull/4054)
* \[[`5f4aa79410`](https://github.com/nodejs/node/commit/5f4aa79410)] - **doc**：澄清第一段 stream 部分的说明（Vitor Cortez） [#4234](https://github.com/nodejs/node/pull/4234)
* \[[`295ca5bfb2`](https://github.com/nodejs/node/commit/295ca5bfb2)] - **doc**：向 releases.md 添加 branch-diff 示例（Myles Borins） [#4636](https://github.com/nodejs/node/pull/4636)
* \[[`18f5cd8710`](https://github.com/nodejs/node/commit/18f5cd8710)] - **doc**：更新样式表以匹配首页（Roman Reiss） [#4621](https://github.com/nodejs/node/pull/4621)
* \[[`2f40715f08`](https://github.com/nodejs/node/commit/2f40715f08)] - **doc**：添加 readline 逐行解析的用法（Robert Jefe Lindstaedt） [#4609](https://github.com/nodejs/node/pull/4609)
* \[[`5b45a464ee`](https://github.com/nodejs/node/commit/5b45a464ee)] - **doc**：记录 http 的 server.listen 返回值（Sequoia McDowell） [#4590](https://github.com/nodejs/node/pull/4590)
* \[[`bd31740339`](https://github.com/nodejs/node/commit/bd31740339)] - **doc**：将 http.IncomingMessage 标注为类（Sequoia McDowell） [#4589](https://github.com/nodejs/node/pull/4589)
* \[[`bcd2cbbb93`](https://github.com/nodejs/node/commit/bcd2cbbb93)] - **doc**：修复关于 latest-codename 的描述（Minwoo Jung） [#4583](https://github.com/nodejs/node/pull/4583)
* \[[`0b12bcb35d`](https://github.com/nodejs/node/commit/0b12bcb35d)] - **doc**：将 Evan Lucas 添加到 Release Team（Evan Lucas） [#4579](https://github.com/nodejs/node/pull/4579)
* \[[`e20b1f6f10`](https://github.com/nodejs/node/commit/e20b1f6f10)] - **doc**：将 Myles Borins 添加到 Release Team（Myles Borins） [#4578](https://github.com/nodejs/node/pull/4578)
* \[[`54977e63eb`](https://github.com/nodejs/node/commit/54977e63eb)] - **doc**：为 readline 补上缺失的反引号（Brian White） [#4549](https://github.com/nodejs/node/pull/4549)
* \[[`5d6bed895c`](https://github.com/nodejs/node/commit/5d6bed895c)] - **doc**：更新 releases.md（cjihrig） [#4540](https://github.com/nodejs/node/pull/4540)
* \[[`0cd2252e85`](https://github.com/nodejs/node/commit/0cd2252e85)] - **doc**：修复 stream.markdown 中的编号（Richard Sun） [#4538](https://github.com/nodejs/node/pull/4538)
* \[[`8574d91f27`](https://github.com/nodejs/node/commit/8574d91f27)] - **doc**：更强烈地建议使用用户层 assert（Wyatt Preul） [#4535](https://github.com/nodejs/node/pull/4535)
* \[[`a7bcf8b84d`](https://github.com/nodejs/node/commit/a7bcf8b84d)] - **doc**：在 process.title 描述中补全反引号（Dave） [#4534](https://github.com/nodejs/node/pull/4534)
* \[[`0ceb3148b0`](https://github.com/nodejs/node/commit/0ceb3148b0)] - **doc**：改进 events.markdown 的文案（James M Snell） [#4468](https://github.com/nodejs/node/pull/4468)
* \[[`bf56d509b9`](https://github.com/nodejs/node/commit/bf56d509b9)] - **doc**：解释 ClientRequest#setTimeout 的时间单位（Ben Ripkens） [#4458](https://github.com/nodejs/node/pull/4458)
* \[[`d927c51be3`](https://github.com/nodejs/node/commit/d927c51be3)] - **doc**：改进 errors.markdown 的文案（James M Snell） [#4454](https://github.com/nodejs/node/pull/4454)
* \[[`ceea6df581`](https://github.com/nodejs/node/commit/ceea6df581)] - **doc**：改进 dns.markdown 的文案（James M Snell） [#4449](https://github.com/nodejs/node/pull/4449)
* \[[`506f2f8ed1`](https://github.com/nodejs/node/commit/506f2f8ed1)] - **doc**：为 stream.markdown 中的 \_transform、\_flush、\_writev 添加锚点（iamchenxin） [#4448](https://github.com/nodejs/node/pull/4448)
* \[[`74bcad0b78`](https://github.com/nodejs/node/commit/74bcad0b78)] - **doc**：改进 dgram.markdown 的文案（James M Snell） [#4437](https://github.com/nodejs/node/pull/4437)
* \[[`e244d560c9`](https://github.com/nodejs/node/commit/e244d560c9)] - **doc**：改进 debugger.markdown 的文案（James M Snell） [#4436](https://github.com/nodejs/node/pull/4436)
* \[[`df7e1281a5`](https://github.com/nodejs/node/commit/df7e1281a5)] - **doc**：改进 console.markdown 的文案（James M Snell） [#4428](https://github.com/nodejs/node/pull/4428)
* \[[`abb17cc6c1`](https://github.com/nodejs/node/commit/abb17cc6c1)] - **doc**：修复 lib/url.js 注释中的拼写错误（Nik Nyby） [#4390](https://github.com/nodejs/node/pull/4390)
* \[[`823269db2d`](https://github.com/nodejs/node/commit/823269db2d)] - **doc**：改进 assert.markdown 的文案（James M Snell） [#4360](https://github.com/nodejs/node/pull/4360)
* \[[`2b1804f6cb`](https://github.com/nodejs/node/commit/2b1804f6cb)] - **doc**：校对 releases.md（Rich Trott） [#4384](https://github.com/nodejs/node/pull/4384)
* \[[`2b142fd876`](https://github.com/nodejs/node/commit/2b142fd876)] - **doc**：让 WORKING_GROUPS.md 引导文档保持最新（James M Snell） [#4367](https://github.com/nodejs/node/pull/4367)
* \[[`ed87873de3`](https://github.com/nodejs/node/commit/ed87873de3)] - **doc**：修复 addons.markdown 中的链接（Nicholas Young） [#4331](https://github.com/nodejs/node/pull/4331)
* \[[`fe693b7a4f`](https://github.com/nodejs/node/commit/fe693b7a4f)] - **doc**：buffer.markdown 中引用 buf.write() 的拼写错误（chrisjohn404） [#4324](https://github.com/nodejs/node/pull/4324)
* \[[`764df2166e`](https://github.com/nodejs/node/commit/764df2166e)] - **doc**：记录 fs.realpathSync 的 cache 参数（Jackson Tian） [#4285](https://github.com/nodejs/node/pull/4285)
* \[[`61f91b2f29`](https://github.com/nodejs/node/commit/61f91b2f29)] - **doc**：修复并现代化文档中的示例（James M Snell） [#4282](https://github.com/nodejs/node/pull/4282)
* \[[`d87ad302ce`](https://github.com/nodejs/node/commit/d87ad302ce)] - **doc**：澄清 HTTP 模块文档中的错误事件（Lenny Markus） [#4275](https://github.com/nodejs/node/pull/4275)
* \[[`7983577e41`](https://github.com/nodejs/node/commit/7983577e41)] - **doc**：修复不正确的 http.get 示例代码（Hideki Yamamura） [#4263](https://github.com/nodejs/node/pull/4263)
* \[[`6c30d087e5`](https://github.com/nodejs/node/commit/6c30d087e5)] - **doc**：修复指向 v8 wiki 的失效链接（Tom Gallacher） [#4241](https://github.com/nodejs/node/pull/4241)
* \[[`cf214e56e4`](https://github.com/nodejs/node/commit/cf214e56e4)] - **doc**：将 'equals' 方法的描述移到正确位置（janriemer） [#4227](https://github.com/nodejs/node/pull/4227)
* \[[`fb8e8dbb92`](https://github.com/nodejs/node/commit/fb8e8dbb92)] - **doc**：校对 console 文档（Rich Trott） [#4225](https://github.com/nodejs/node/pull/4225)
* \[[`4ccf04c229`](https://github.com/nodejs/node/commit/4ccf04c229)] - **doc**：将 mcollina 添加为协作者（Matteo Collina） [#4220](https://github.com/nodejs/node/pull/4220)
* \[[`59654c21d4`](https://github.com/nodejs/node/commit/59654c21d4)] - **doc**：将 rmg 添加为协作者（Ryan Graham） [#4219](https://github.com/nodejs/node/pull/4219)
* \[[`bfe1a6bd2b`](https://github.com/nodejs/node/commit/bfe1a6bd2b)] - **doc**：将 calvinmetcalf 添加为协作者（Calvin Metcalf） [#4218](https://github.com/nodejs/node/pull/4218)
* \[[`5140c404ae`](https://github.com/nodejs/node/commit/5140c404ae)] - **doc**：统一 `ca` 参数的描述（Ben Noordhuis） [#4213](https://github.com/nodejs/node/pull/4213)
* \[[`2e642051cf`](https://github.com/nodejs/node/commit/2e642051cf)] - **doc**：校对 child_process 文档（Rich Trott） [#4188](https://github.com/nodejs/node/pull/4188)
* \[[`7920f8dbde`](https://github.com/nodejs/node/commit/7920f8dbde)] - **doc**：校对 buffer 文档（Rich Trott） [#4187](https://github.com/nodejs/node/pull/4187)
* \[[`c35a409cbe`](https://github.com/nodejs/node/commit/c35a409cbe)] - **doc**：澄清 assert.fail 文档（Rich Trott） [#4186](https://github.com/nodejs/node/pull/4186)
* \[[`6235fdf72e`](https://github.com/nodejs/node/commit/6235fdf72e)] - **doc**：校对 addons 文档（Rich Trott） [#4185](https://github.com/nodejs/node/pull/4185)
* \[[`990e7ff93e`](https://github.com/nodejs/node/commit/990e7ff93e)] - **doc**：更新 AUTHORS 列表（Rod Vagg） [#4183](https://github.com/nodejs/node/pull/4183)
* \[[`8d676ef55e`](https://github.com/nodejs/node/commit/8d676ef55e)] - **doc**：将引用中的 node 改为 Node.js（Roman Klauke） [#4177](https://github.com/nodejs/node/pull/4177)
* \[[`1c34b139a2`](https://github.com/nodejs/node/commit/1c34b139a2)] - **doc**：在 README 中添加简要的 Node.js 概览（wurde） [#4174](https://github.com/nodejs/node/pull/4174)
* \[[`27b9b72ab0`](https://github.com/nodejs/node/commit/27b9b72ab0)] - **doc**：将 iarna 添加为协作者（Rebecca Turner） [#4144](https://github.com/nodejs/node/pull/4144)
* \[[`683d8dd564`](https://github.com/nodejs/node/commit/683d8dd564)] - **doc**：将 JungMinu 添加为协作者（Minwoo Jung） [#4143](https://github.com/nodejs/node/pull/4143)
* \[[`17b06dfa94`](https://github.com/nodejs/node/commit/17b06dfa94)] - **doc**：将 zkat 添加为协作者（Kat Marchán） [#4142](https://github.com/nodejs/node/pull/4142)
* \[[`39364c4c72`](https://github.com/nodejs/node/commit/39364c4c72)] - **doc**：改进 child_process.markdown 的措辞（yorkie） [#4138](https://github.com/nodejs/node/pull/4138)
* \[[`abe452835f`](https://github.com/nodejs/node/commit/abe452835f)] - **doc**：url.format - 真实斜杠后缀行为（fansworld-claudio） [#4119](https://github.com/nodejs/node/pull/4119)
* \[[`6dd375cfe2`](https://github.com/nodejs/node/commit/6dd375cfe2)] - **doc**：记录 server.listen() 变体的 backlog（Jan Schär） [#4025](https://github.com/nodejs/node/pull/4025)
* \[[`b71a3b363a`](https://github.com/nodejs/node/commit/b71a3b363a)] - **doc**：修正 socket.remoteAddress（Arthur Gautier） [#4198](https://github.com/nodejs/node/pull/4198)
* \[[`e2fe214857`](https://github.com/nodejs/node/commit/e2fe214857)] - **doc**：在名称周围添加链接和反引号（jpersson） [#4054](https://github.com/nodejs/node/pull/4054)
* \[[`bb158f8aed`](https://github.com/nodejs/node/commit/bb158f8aed)] - **doc**：在 readme 中将 node.js 改为 Node.js（Rod Vagg） [#3998](https://github.com/nodejs/node/pull/3998)
* \[[`f55491ad47`](https://github.com/nodejs/node/commit/f55491ad47)] - **doc**：移动 fs.existsSync() 的弃用消息（Martin Forsberg） [#3942](https://github.com/nodejs/node/pull/3942)
* \[[`8c5b847f5b`](https://github.com/nodejs/node/commit/8c5b847f5b)] - **doc**：描述 FIPSDIR 环境变量（Stefan Budeanu） [#3752](https://github.com/nodejs/node/pull/3752)
* \[[`70c95ea0e5`](https://github.com/nodejs/node/commit/70c95ea0e5)] - **doc**：添加关于 Windows 进程组的警告（Roman Klauke） [#3681](https://github.com/nodejs/node/pull/3681)
* \[[`46c59b7256`](https://github.com/nodejs/node/commit/46c59b7256)] - **doc**：添加 CTC 会议纪要 2015-10-28（Rod Vagg） [#3661](https://github.com/nodejs/node/pull/3661)
* \[[`7ffd299a1d`](https://github.com/nodejs/node/commit/7ffd299a1d)] - **doc**：在 CONTRIBUTING.md 中添加最后的句号（Emily Aviva Kapor-Mater） [#3576](https://github.com/nodejs/node/pull/3576)
* \[[`1f78bff7ce`](https://github.com/nodejs/node/commit/1f78bff7ce)] - **doc**：添加 TSC 会议纪要 2015-10-21（Rod Vagg） [#3480](https://github.com/nodejs/node/pull/3480)
* \[[`2e623ff024`](https://github.com/nodejs/node/commit/2e623ff024)] - **doc**：添加 TSC 会议纪要 2015-10-14（Rod Vagg） [#3463](https://github.com/nodejs/node/pull/3463)
* \[[`b9c69964bb`](https://github.com/nodejs/node/commit/b9c69964bb)] - **doc**：添加 TSC 会议纪要 2015-10-07（Rod Vagg） [#3364](https://github.com/nodejs/node/pull/3364)
* \[[`f31d23c724`](https://github.com/nodejs/node/commit/f31d23c724)] - **doc**：添加 TSC 会议纪要 2015-09-30（Rod Vagg） [#3235](https://github.com/nodejs/node/pull/3235)
* \[[`ae8e3af178`](https://github.com/nodejs/node/commit/ae8e3af178)] - **doc**：更新 irc 频道：#node.js 和 #node-dev（Nelson Pecora） [#2743](https://github.com/nodejs/node/pull/2743)
* \[[`830caeb1bd`](https://github.com/nodejs/node/commit/830caeb1bd)] - **doc, test**：将 symbol 用作事件名称（Bryan English） [#4151](https://github.com/nodejs/node/pull/4151)
* \[[`82cbfcdcbe`](https://github.com/nodejs/node/commit/82cbfcdcbe)] - **docs**：更新 Myles Borins 的 gpg 密钥（Myles Borins） [#4657](https://github.com/nodejs/node/pull/4657)
* \[[`50b72aa5a3`](https://github.com/nodejs/node/commit/50b72aa5a3)] - **docs**：修复 releases.md 中的 npm 命令（Myles Borins） [#4656](https://github.com/nodejs/node/pull/4656)
* \[[`5bf56882e1`](https://github.com/nodejs/node/commit/5bf56882e1)] - **fs,doc**：使用 `target` 代替 `destination`（yorkie） [#3912](https://github.com/nodejs/node/pull/3912)
* \[[`41fcda840c`](https://github.com/nodejs/node/commit/41fcda840c)] - **http**：使用 `self.keepAlive` 代替 `self.options.keepAlive`（Damian Schenkelman） [#4407](https://github.com/nodejs/node/pull/4407)
* \[[`3ff237333d`](https://github.com/nodejs/node/commit/3ff237333d)] - **http**：移除一个不必要的赋值（Bo Borgerson） [#4323](https://github.com/nodejs/node/pull/4323)
* \[[`39dc054572`](https://github.com/nodejs/node/commit/39dc054572)] - **http**：移除对 removeSocket 的多余调用（Dave） [#4172](https://github.com/nodejs/node/pull/4172)
* \[[`751fbd84dd`](https://github.com/nodejs/node/commit/751fbd84dd)] - **https**：在 agent key 中使用 `servername`（Fedor Indutny） [#4389](https://github.com/nodejs/node/pull/4389)
* \[[`7a1a0a0055`](https://github.com/nodejs/node/commit/7a1a0a0055)] - **lib**：移除未使用的模块（Rich Trott） [#4683](https://github.com/nodejs/node/pull/4683)
* \[[`3d81ea99bb`](https://github.com/nodejs/node/commit/3d81ea99bb)] - **lib,test**：在适用的地方将 let 改为 const（Sakthipriyan Vairamani） [#3152](https://github.com/nodejs/node/pull/3152)
* \[[`8a9869eeab`](https://github.com/nodejs/node/commit/8a9869eeab)] - **module**：修复错误中的列偏移（Tristian Flanagan） [#2867](https://github.com/nodejs/node/pull/2867)
* \[[`0ae90ecd3d`](https://github.com/nodejs/node/commit/0ae90ecd3d)] - **module,repl**：移除 repl require() hack（Ben Noordhuis） [#4026](https://github.com/nodejs/node/pull/4026)
* \[[`a7367fdc1e`](https://github.com/nodejs/node/commit/a7367fdc1e)] - **net**：小幅代码清理（Jan Schär） [#3943](https://github.com/nodejs/node/pull/3943)
* \[[`03e9495cc2`](https://github.com/nodejs/node/commit/03e9495cc2)] - **node**：移除 AppendExceptionLine 中未使用的变量（Yazhong Liu） [#4264](https://github.com/nodejs/node/pull/4264)
* \[[`06113b8711`](https://github.com/nodejs/node/commit/06113b8711)] - **node**：将 doNTCallbackX 改为 nextTickCallbackWithXArgs/（Rod Vagg） [#4167](https://github.com/nodejs/node/pull/4167)
* \[[`8ce6843fe4`](https://github.com/nodejs/node/commit/8ce6843fe4)] - **os**：修复 GetInterfaceAddresses 中的崩溃（Martin Bark） [#4272](https://github.com/nodejs/node/pull/4272)
* \[[`53dcbb6aa4`](https://github.com/nodejs/node/commit/53dcbb6aa4)] - **repl**：移除未使用的函数（Rich Trott）
* \[[`db0e906fc1`](https://github.com/nodejs/node/commit/db0e906fc1)] - **repl**：修复 node repl 历史记录边缘情况。（Mudit Ameta） [#4108](https://github.com/nodejs/node/pull/4108)
* \[[`9855fab05f`](https://github.com/nodejs/node/commit/9855fab05f)] - **repl**：使用 String#repeat 代替 Array#join（Evan Lucas） [#3900](https://github.com/nodejs/node/pull/3900)
* \[[`41882e4077`](https://github.com/nodejs/node/commit/41882e4077)] - **repl**：修复 require('3rdparty') 回归问题（Ben Noordhuis） [#4215](https://github.com/nodejs/node/pull/4215)
* \[[`93afc39d4a`](https://github.com/nodejs/node/commit/93afc39d4a)] - **repl**：为语法错误附加位置信息（cjihrig） [#4013](https://github.com/nodejs/node/pull/4013)
* \[[`d4806675a6`](https://github.com/nodejs/node/commit/d4806675a6)] - **repl**：加载目录时显示错误消息（Prince J Wesley） [#4170](https://github.com/nodejs/node/pull/4170)
* \[[`3080bdc7d7`](https://github.com/nodejs/node/commit/3080bdc7d7)] - **src**：使用宏定义 Is* 工具函数（cjihrig） [#4118](https://github.com/nodejs/node/pull/4118)
* \[[`2b8a32a13b`](https://github.com/nodejs/node/commit/2b8a32a13b)] - **src**：重构 vcbuild configure 参数的创建（Rod Vagg） [#3399](https://github.com/nodejs/node/pull/3399)
* \[[`d47f6ba768`](https://github.com/nodejs/node/commit/d47f6ba768)] - **src**：修复 ErrnoException 的弃用消息（Martin von Gagern） [#4269](https://github.com/nodejs/node/pull/4269)
* \[[`5ba08fbf76`](https://github.com/nodejs/node/commit/5ba08fbf76)] - **src**：修复 core errors 的行号（cjihrig） [#4254](https://github.com/nodejs/node/pull/4254)
* \[[`70974e9362`](https://github.com/nodejs/node/commit/70974e9362)] - **src**：为 process.pid 使用 GetCurrentProcessId()（Ben Noordhuis） [#4163](https://github.com/nodejs/node/pull/4163)
* \[[`c96eca164f`](https://github.com/nodejs/node/commit/c96eca164f)] - **src**：不要打印乱码错误（cjihrig） [#4112](https://github.com/nodejs/node/pull/4112)
* \[[`f61412c753`](https://github.com/nodejs/node/commit/f61412c753)] - **test**：将 test-debug-no-context 标记为不稳定（Rich Trott） [#4421](https://github.com/nodejs/node/pull/4421)
* \[[`46d8c93ed2`](https://github.com/nodejs/node/commit/46d8c93ed2)] - **test**：不要对相对路径使用 cwd（Johan Bergström） [#4477](https://github.com/nodejs/node/pull/4477)
* \[[`b6124ea39c`](https://github.com/nodejs/node/commit/b6124ea39c)] - **test**：写入 tmp 目录而不是 fixture 目录（Rich Trott） [#4489](https://github.com/nodejs/node/pull/4489)
* \[[`350fa664bb`](https://github.com/nodejs/node/commit/350fa664bb)] - **test**：不要假设某种文件夹结构（Johan Bergström） [#3325](https://github.com/nodejs/node/pull/3325)
* \[[`6b2ef0efac`](https://github.com/nodejs/node/commit/6b2ef0efac)] - **test**：使临时路径可定制（Johan Bergström） [#3325](https://github.com/nodejs/node/pull/3325)
* \[[`f1837703a9`](https://github.com/nodejs/node/commit/f1837703a9)] - **test**：移除并行测试中的未使用变量（Rich Trott） [#4511](https://github.com/nodejs/node/pull/4511)
* \[[`b4964b099a`](https://github.com/nodejs/node/commit/b4964b099a)] - **test**：移除 http 测试中的未使用变量（Rich Trott） [#4422](https://github.com/nodejs/node/pull/4422)
* \[[`0d5a508dfb`](https://github.com/nodejs/node/commit/0d5a508dfb)] - **test**：在 Debug 模式下延长超时时间（Rich Trott） [#4431](https://github.com/nodejs/node/pull/4431)
* \[[`6e4598d5da`](https://github.com/nodejs/node/commit/6e4598d5da)] - **test**：移除 TLS 测试中的未使用变量（Rich Trott） [#4424](https://github.com/nodejs/node/pull/4424)
* \[[`7b1aa045a0`](https://github.com/nodejs/node/commit/7b1aa045a0)] - **test**：移除 HTTPS 测试中的未使用变量（Rich Trott） [#4426](https://github.com/nodejs/node/pull/4426)
* \[[`da9e5c1b01`](https://github.com/nodejs/node/commit/da9e5c1b01)] - **test**：移除 net 测试中的未使用变量（Rich Trott） [#4430](https://github.com/nodejs/node/pull/4430)
* \[[`13241bd24b`](https://github.com/nodejs/node/commit/13241bd24b)] - **test**：移除 ChildProcess 测试中的未使用变量（Rich Trott） [#4425](https://github.com/nodejs/node/pull/4425)
* \[[`2f4538ddda`](https://github.com/nodejs/node/commit/2f4538ddda)] - **test**：移除未使用变量（Rich Trott） [#4536](https://github.com/nodejs/node/pull/4536)
* \[[`dffe83ccd6`](https://github.com/nodejs/node/commit/dffe83ccd6)] - **test**：移除未使用的模块（Rich Trott） [#4684](https://github.com/nodejs/node/pull/4684)
* \[[`c4eeb88ba1`](https://github.com/nodejs/node/commit/c4eeb88ba1)] - **test**：修复不稳定的 cluster-disconnect-race（Brian White） [#4457](https://github.com/nodejs/node/pull/4457)
* \[[`7caf87bf6c`](https://github.com/nodejs/node/commit/7caf87bf6c)] - **test**：修复不稳定的 test-http-agent-keepalive（Rich Trott） [#4524](https://github.com/nodejs/node/pull/4524)
* \[[`25c41d084d`](https://github.com/nodejs/node/commit/25c41d084d)] - **test**：移除测试中的 flaky 标记（Rich Trott） [#4519](https://github.com/nodejs/node/pull/4519)
* \[[`b8f097ece2`](https://github.com/nodejs/node/commit/b8f097ece2)] - **test**：修复不稳定的 streams 测试（Rich Trott） [#4516](https://github.com/nodejs/node/pull/4516)
* \[[`c24fa1437c`](https://github.com/nodejs/node/commit/c24fa1437c)] - **test**：从环境中继承 JOBS（Johan Bergström） [#4495](https://github.com/nodejs/node/pull/4495)
* \[[`7dc90e9e7f`](https://github.com/nodejs/node/commit/7dc90e9e7f)] - **test**：移除时间检查（Rich Trott） [#4494](https://github.com/nodejs/node/pull/4494)
* \[[`7ca3c6c388`](https://github.com/nodejs/node/commit/7ca3c6c388)] - **test**：重构 test-fs-empty-readStream（Rich Trott） [#4490](https://github.com/nodejs/node/pull/4490)
* \[[`610727dea7`](https://github.com/nodejs/node/commit/610727dea7)] - **test**：澄清 domains 在测试中的作用（Rich Trott） [#4474](https://github.com/nodejs/node/pull/4474)
* \[[`1ae0e355b9`](https://github.com/nodejs/node/commit/1ae0e355b9)] - **test**：改进 assert 消息（Rich Trott） [#4461](https://github.com/nodejs/node/pull/4461)
* \[[`e70c88df56`](https://github.com/nodejs/node/commit/e70c88df56)] - **test**：移除未使用的 assert 模块导入（Rich Trott） [#4438](https://github.com/nodejs/node/pull/4438)
* \[[`c77fc71f9b`](https://github.com/nodejs/node/commit/c77fc71f9b)] - **test**：移除 test-assert.js 中的未使用变量（Rich Trott） [#4405](https://github.com/nodejs/node/pull/4405)
* \[[`f613b3033f`](https://github.com/nodejs/node/commit/f613b3033f)] - **test**：恢复 test-domain-exit-dispose-again（Julien Gilli） [#4256](https://github.com/nodejs/node/pull/4256)
* \[[`f5bfacd858`](https://github.com/nodejs/node/commit/f5bfacd858)] - **test**：移除未使用的 `util` 导入（Rich Trott） [#4562](https://github.com/nodejs/node/pull/4562)
* \[[`d795301025`](https://github.com/nodejs/node/commit/d795301025)] - **test**：移除不必要的赋值（Rich Trott） [#4563](https://github.com/nodejs/node/pull/4563)
* \[[`acc3d66934`](https://github.com/nodejs/node/commit/acc3d66934)] - **test**：将 ArrayStream 移到 common（cjihrig） [#4027](https://github.com/nodejs/node/pull/4027)
* \[[`6c0021361c`](https://github.com/nodejs/node/commit/6c0021361c)] - **test**：重构 test-net-connect-options-ipv6（Rich Trott） [#4395](https://github.com/nodejs/node/pull/4395)
* \[[`29804e00ad`](https://github.com/nodejs/node/commit/29804e00ad)] - **test**：在更多地方使用 platformTimeout()（Brian White） [#4387](https://github.com/nodejs/node/pull/4387)
* \[[`761af37d0e`](https://github.com/nodejs/node/commit/761af37d0e)] - **test**：修复 test-http-client-onerror 中的竞态条件（Devin Nakamura） [#4346](https://github.com/nodejs/node/pull/4346)
* \[[`980852165f`](https://github.com/nodejs/node/commit/980852165f)] - **test**：修复不稳定的 test-net-error-twice（Brian White） [#4342](https://github.com/nodejs/node/pull/4342)
* \[[`1bc44e79d3`](https://github.com/nodejs/node/commit/1bc44e79d3)] - **test**：尝试其他 ipv6 localhost 替代方案（Brian White） [#4325](https://github.com/nodejs/node/pull/4325)
* \[[`44dbe15640`](https://github.com/nodejs/node/commit/44dbe15640)] - **test**：修复 debug-port-cluster 的不稳定性（Ben Noordhuis） [#4310](https://github.com/nodejs/node/pull/4310)
* \[[`73e781172b`](https://github.com/nodejs/node/commit/73e781172b)] - **test**：添加 tls.parseCertString 测试（Evan Lucas） [#4283](https://github.com/nodejs/node/pull/4283)
* \[[`15c295a21b`](https://github.com/nodejs/node/commit/15c295a21b)] - **test**：对 ARMv8 使用常规超时时间（Jeremiah Senkpiel） [#4248](https://github.com/nodejs/node/pull/4248)
* \[[`fd250b8fab`](https://github.com/nodejs/node/commit/fd250b8fab)] - **test**：并行化 test-repl-persistent-history（Jeremiah Senkpiel） [#4247](https://github.com/nodejs/node/pull/4247)
* \[[`9a0f156e5a`](https://github.com/nodejs/node/commit/9a0f156e5a)] - **test**：修复 domain-top-level-error-handler-throw（Santiago Gimeno） [#4364](https://github.com/nodejs/node/pull/4364)
* \[[`6bc1b1c259`](https://github.com/nodejs/node/commit/6bc1b1c259)] - **test**：不要假设 openssl s_client 支持 -ssl3（Ben Noordhuis） [#4204](https://github.com/nodejs/node/pull/4204)
* \[[`d00b9fc66f`](https://github.com/nodejs/node/commit/d00b9fc66f)] - **test**：修复 tls-inception 的不稳定性（Santiago Gimeno） [#4195](https://github.com/nodejs/node/pull/4195)
* \[[`c41b280a2b`](https://github.com/nodejs/node/commit/c41b280a2b)] - **test**：修复 tls-inception（Santiago Gimeno） [#4195](https://github.com/nodejs/node/pull/4195)
* \[[`6f4ab1d1ab`](https://github.com/nodejs/node/commit/6f4ab1d1ab)] - **test**：将 test-cluster-shared-leak 标记为不稳定（Rich Trott） [#4162](https://github.com/nodejs/node/pull/4162)
* \[[`90498e2a68`](https://github.com/nodejs/node/commit/90498e2a68)] - **test**：在非 Windows 上跳过长路径测试（Rafał Pocztarski） [#4116](https://github.com/nodejs/node/pull/4116)
* \[[`c9100d78f3`](https://github.com/nodejs/node/commit/c9100d78f3)] - **test**：修复不稳定的 test-net-socket-local-address（Rich Trott） [#4109](https://github.com/nodejs/node/pull/4109)
* \[[`ac939d51d9`](https://github.com/nodejs/node/commit/ac939d51d9)] - **test**：改进 cluster-disconnect-handles 测试（Brian White） [#4084](https://github.com/nodejs/node/pull/4084)
* \[[`22ba1b4115`](https://github.com/nodejs/node/commit/22ba1b4115)] - **test**：消除 FreeBSD 上 multicast 测试的不稳定性（Rich Trott） [#4042](https://github.com/nodejs/node/pull/4042)
* \[[`2ee7853bb7`](https://github.com/nodejs/node/commit/2ee7853bb7)] - **test**：修复 http-many-ended-pipelines 的不稳定性（Santiago Gimeno） [#4041](https://github.com/nodejs/node/pull/4041)
* \[[`a77dcfec06`](https://github.com/nodejs/node/commit/a77dcfec06)] - **test**：为提高可靠性使用基于平台的超时（Rich Trott） [#4015](https://github.com/nodejs/node/pull/4015)
* \[[`3f0ff879cf`](https://github.com/nodejs/node/commit/3f0ff879cf)] - **test**：修复时间分辨率限制（Gireesh Punathil） [#3981](https://github.com/nodejs/node/pull/3981)
* \[[`22b88e1c48`](https://github.com/nodejs/node/commit/22b88e1c48)] - **test**：为重试的测试添加 TAP 诊断消息（Rich Trott） [#3960](https://github.com/nodejs/node/pull/3960)
* \[[`22d2887b1c`](https://github.com/nodejs/node/commit/22d2887b1c)] - **test**：为模块加载错误测试添加 OS X（Evan Lucas） [#3901](https://github.com/nodejs/node/pull/3901)
* \[[`e2141cb75e`](https://github.com/nodejs/node/commit/e2141cb75e)] - **test**：在内存受限时跳过而不是失败（Michael Cornacchia） [#3697](https://github.com/nodejs/node/pull/3697)
* \[[`166523d0ed`](https://github.com/nodejs/node/commit/166523d0ed)] - **test**：修复 unrefd interval 测试中的竞态条件（Michael Cornacchia） [#3550](https://github.com/nodejs/node/pull/3550)
* \[[`86b47e8dc0`](https://github.com/nodejs/node/commit/86b47e8dc0)] - **timers**：优化回调调用：bind -> arrow（Andrei Sedoi） [#4038](https://github.com/nodejs/node/pull/4038)
* \[[`4d37472ea7`](https://github.com/nodejs/node/commit/4d37472ea7)] - **tls_wrap**：返回时清除错误（Fedor Indutny） [#4709](https://github.com/nodejs/node/pull/4709)
* \[[`5b695d0343`](https://github.com/nodejs/node/commit/5b695d0343)] - **tls_wrap**：先继承自 `AsyncWrap`（Fedor Indutny） [#4268](https://github.com/nodejs/node/pull/4268)
* \[[`0efc35e6d8`](https://github.com/nodejs/node/commit/0efc35e6d8)] - **tls_wrap**：在 `ClearOut` 中正确切片 buffer（Fedor Indutny） [#4184](https://github.com/nodejs/node/pull/4184)
* \[[`628cb8657c`](https://github.com/nodejs/node/commit/628cb8657c)] - **tools**：添加 .editorconfig（ronkorving） [#2993](https://github.com/nodejs/node/pull/2993)
* \[[`69fef19624`](https://github.com/nodejs/node/commit/69fef19624)] - **tools**：为 eslint 实现 no-unused-vars（Rich Trott） [#4536](https://github.com/nodejs/node/pull/4536)
* \[[`3ee16706f2`](https://github.com/nodejs/node/commit/3ee16706f2)] - **tools**：通过 lint 规则强制使用 `throw new Error()`（Rich Trott） [#3714](https://github.com/nodejs/node/pull/3714)
* \[[`32801de4ef`](https://github.com/nodejs/node/commit/32801de4ef)] - **tools**：一致地使用 `throw new Error()`（Rich Trott） [#3714](https://github.com/nodejs/node/pull/3714)
* \[[`f413fae0cd`](https://github.com/nodejs/node/commit/f413fae0cd)] - **tools**：为 cpplint 添加 tap 输出（Johan Bergström） [#3448](https://github.com/nodejs/node/pull/3448)
* \[[`efa30dd2f0`](https://github.com/nodejs/node/commit/efa30dd2f0)] - **tools**：启用 prefer-const eslint 规则（Sakthipriyan Vairamani） [#3152](https://github.com/nodejs/node/pull/3152)
* \[[`dd0c925896`](https://github.com/nodejs/node/commit/dd0c925896)] - **udp**：移除一个不必要的 Buffer instanceof 检查（ronkorving） [#4301](https://github.com/nodejs/node/pull/4301)
* \[[`f4414102ed`](https://github.com/nodejs/node/commit/f4414102ed)] - **util**：更快的 arrayToHash
* \[[`b421119984`](https://github.com/nodejs/node/commit/b421119984)] - **util**：在 C++ 中确定对象类型（cjihrig） [#4100](https://github.com/nodejs/node/pull/4100)
* \[[`6a7c9d9293`](https://github.com/nodejs/node/commit/6a7c9d9293)] - **util**：将 .decorateErrorStack 移到 internal/util（Ben Noordhuis） [#4026](https://github.com/nodejs/node/pull/4026)
* \[[`422a865d46`](https://github.com/nodejs/node/commit/422a865d46)] - **util**：添加 decorateErrorStack()（cjihrig） [#4013](https://github.com/nodejs/node/pull/4013)
* \[[`2d5380ea25`](https://github.com/nodejs/node/commit/2d5380ea25)] - **util**：修复 constructor/instanceof 检查（Brian White） [#3385](https://github.com/nodejs/node/pull/3385)
* \[[`1bf84b9d41`](https://github.com/nodejs/node/commit/1bf84b9d41)] - **util,src**：允许查找隐藏值（cjihrig） [#3988](https://github.com/nodejs/node/pull/3988)

<a id="4.2.4"></a>

## 2015-12-23，版本 4.2.4 'Argon' (LTS), @jasnell

维护更新。

### 主要变更

* 约 78% 的提交是文档和测试改进
* **domains**：
  * 修复未捕获异常的处理（Julien Gilli） [#3884](https://github.com/nodejs/node/pull/3884)
* **deps**：
  * 升级到 npm 2.14.12（Kat Marchán） [#4110](https://github.com/nodejs/node/pull/4110)
  * 从 V8 上游回移植 819b40a（Michaël Zasso） [#3938](https://github.com/nodejs/node/pull/3938)
  * 使用新的 npm 许可证更新 node LICENSE 文件（Kat Marchán） [#4110](https://github.com/nodejs/node/pull/4110)

### 已知问题

* `beforeExit` 期间运行的一些未引用定时器问题仍有待解决。参见 [#1264](https://github.com/nodejs/node/issues/1264)。
* REPL 中的代理对可能会冻结终端。 [#690](https://github.com/nodejs/node/issues/690)
* 在 DNS 查询进行中调用 `dns.setServers()` 可能会在断言失败时导致进程崩溃。 [#894](https://github.com/nodejs/node/issues/894)
* 在两个完整主机之间解析时，`url.resolve` 可能会传递 url 的认证部分，参见 [#1435](https://github.com/nodejs/node/issues/1435)。

### 提交

* \[[`907a13a07f`](https://github.com/nodejs/node/commit/907a13a07f)] - 补充 return 前缺失的 va\_end（Ömer Fadıl Usta） [#3565](https://github.com/nodejs/node/pull/3565)
* \[[`7ffc01756f`](https://github.com/nodejs/node/commit/7ffc01756f)] - **buffer**: 修复某些负值的 writeInt{B,L}E（Peter A. Bigot） [#3994](https://github.com/nodejs/node/pull/3994)
* \[[`db0186e435`](https://github.com/nodejs/node/commit/db0186e435)] - **buffer**: 让 WriteFloatGeneric 静默丢弃值（Minqi Pan）
* \[[`5c6740865a`](https://github.com/nodejs/node/commit/5c6740865a)] - **build**: 更新 signtool 描述，添加 url（Rod Vagg） [#4011](https://github.com/nodejs/node/pull/4011)
* \[[`60dda70f89`](https://github.com/nodejs/node/commit/60dda70f89)] - **build**: 修复 x-compile 下的 --with-intl=system-icu（Steven R. Loomis） [#3808](https://github.com/nodejs/node/pull/3808)
* \[[`22208b067c`](https://github.com/nodejs/node/commit/22208b067c)] - **build**: 修复使用预构建库进行配置的问题（Markus Tzoe） [#3135](https://github.com/nodejs/node/pull/3135)
* \[[`914caf9c69`](https://github.com/nodejs/node/commit/914caf9c69)] - **child\_process**: 为 stdio 访问添加安全检查（cjihrig） [#3799](https://github.com/nodejs/node/pull/3799)
* \[[`236ad90a84`](https://github.com/nodejs/node/commit/236ad90a84)] - **child\_process**: 不要从 -e 触发自我 fork 炸弹（Ben Noordhuis） [#3575](https://github.com/nodejs/node/pull/3575)
* \[[`f28f69dac4`](https://github.com/nodejs/node/commit/f28f69dac4)] - **cluster**: 在断开 worker 连接时移除句柄（Ben Noordhuis） [#3677](https://github.com/nodejs/node/pull/3677)
* \[[`f5c5e8bf91`](https://github.com/nodejs/node/commit/f5c5e8bf91)] - **cluster**: 在断开连接时发送 suicide 消息（cjihrig） [#3720](https://github.com/nodejs/node/pull/3720)
* \[[`629d5d18d7`](https://github.com/nodejs/node/commit/629d5d18d7)] - **configure**: `v8_use_snapshot` 应为 `true`（Fedor Indutny） [#3962](https://github.com/nodejs/node/pull/3962)
* \[[`3094464871`](https://github.com/nodejs/node/commit/3094464871)] - **configure**: 使用 \_\_ARM\_ARCH 确定 arm 版本（João Reis） [#4123](https://github.com/nodejs/node/pull/4123)
* \[[`1e1173fc5c`](https://github.com/nodejs/node/commit/1e1173fc5c)] - **configure**: 在主机架构检测中尊重 CC\_host（João Reis） [#4117](https://github.com/nodejs/node/pull/4117)
* \[[`2e9b886fbf`](https://github.com/nodejs/node/commit/2e9b886fbf)] - **crypto**: FIPS 模式下的 DSA 参数验证（Stefan Budeanu） [#3756](https://github.com/nodejs/node/pull/3756)
* \[[`00b77d9e84`](https://github.com/nodejs/node/commit/00b77d9e84)] - **crypto**: 改进错误检查和报告（Stefan Budeanu） [#3753](https://github.com/nodejs/node/pull/3753)
* \[[`810f76e440`](https://github.com/nodejs/node/commit/810f76e440)] - **deps**: 升级到 npm 2.14.12（Kat Marchán） [#4110](https://github.com/nodejs/node/pull/4110)
* \[[`51ae8d10b3`](https://github.com/nodejs/node/commit/51ae8d10b3)] - **deps**: 使用新的 npm 许可证更新 node LICENSE 文件（Kat Marchán） [#4110](https://github.com/nodejs/node/pull/4110)
* \[[`9e1edead22`](https://github.com/nodejs/node/commit/9e1edead22)] - **deps**: 从 V8 上游回移植 819b40a（Michaël Zasso） [#3938](https://github.com/nodejs/node/pull/3938)
* \[[`a2ce3843cc`](https://github.com/nodejs/node/commit/a2ce3843cc)] - **deps**: 将 npm 升级到 2.14.9（Forrest L Norvell） [#3686](https://github.com/nodejs/node/pull/3686)
* \[[`b140cb29f4`](https://github.com/nodejs/node/commit/b140cb29f4)] - **dns**: 防止结果中出现未定义值（Junliang Yan） [#3696](https://github.com/nodejs/node/pull/3696)
* \[[`8aafa2ecc0`](https://github.com/nodejs/node/commit/8aafa2ecc0)] - **doc**: 统一文档中对 node.js 的引用（Scott Buchanan） [#4136](https://github.com/nodejs/node/pull/4136)
* \[[`72f43a263a`](https://github.com/nodejs/node/commit/72f43a263a)] - **doc**: 修复到 child.send() 的内部链接（Luigi Pinca） [#4089](https://github.com/nodejs/node/pull/4089)
* \[[`dcfdbac457`](https://github.com/nodejs/node/commit/dcfdbac457)] - **doc**: 重写 https.Agent 示例文本（Jan Krems） [#4075](https://github.com/nodejs/node/pull/4075)
* \[[`f93d268dec`](https://github.com/nodejs/node/commit/f93d268dec)] - **doc**: 添加 HTTP 工作组（James M Snell） [#3919](https://github.com/nodejs/node/pull/3919)
* \[[`beee0553ca`](https://github.com/nodejs/node/commit/beee0553ca)] - **doc**: 更新 WORKING\_GROUPS.md - 添加缺失的组（Michael Dawson） [#3450](https://github.com/nodejs/node/pull/3450)
* \[[`3327415fc4`](https://github.com/nodejs/node/commit/3327415fc4)] - **doc**: 修复异常描述（yorkie） [#3658](https://github.com/nodejs/node/pull/3658)
* \[[`da8d012c88`](https://github.com/nodejs/node/commit/da8d012c88)] - **doc**: 澄清 v4.2.3 的重要条目（Rod Vagg） [#4155](https://github.com/nodejs/node/pull/4155)
* \[[`44a2d8ca24`](https://github.com/nodejs/node/commit/44a2d8ca24)] - **doc**: 修复链接代码块的颜色（jpersson） [#4068](https://github.com/nodejs/node/pull/4068)
* \[[`bebde48ebc`](https://github.com/nodejs/node/commit/bebde48ebc)] - **doc**: 修复 README 中的拼写错误（Rich Trott） [#4000](https://github.com/nodejs/node/pull/4000)
* \[[`b48d5ec301`](https://github.com/nodejs/node/commit/b48d5ec301)] - **doc**: 修正 message.header 的重复（Bryan English） [#3997](https://github.com/nodejs/node/pull/3997)
* \[[`6ef3625456`](https://github.com/nodejs/node/commit/6ef3625456)] - **doc**: 将 sane 替换为 reasonable（Lewis Cowper） [#3980](https://github.com/nodejs/node/pull/3980)
* \[[`c5be3c63f0`](https://github.com/nodejs/node/commit/c5be3c63f0)] - **doc**: 修复列对齐的罕见情况（Roman Reiss） [#3948](https://github.com/nodejs/node/pull/3948)
* \[[`bd82fb06ff`](https://github.com/nodejs/node/commit/bd82fb06ff)] - **doc**: 修复损坏的引用（Alexander Gromnitsky） [#3944](https://github.com/nodejs/node/pull/3944)
* \[[`8eb28c3d50`](https://github.com/nodejs/node/commit/8eb28c3d50)] - **doc**: 为 buffer.inspect() 添加参考（cjihrig） [#3921](https://github.com/nodejs/node/pull/3921)
* \[[`4bc71e0078`](https://github.com/nodejs/node/commit/4bc71e0078)] - **doc**: 澄清模块加载行为（cjihrig） [#3920](https://github.com/nodejs/node/pull/3920)
* \[[`4c382e7aaa`](https://github.com/nodejs/node/commit/4c382e7aaa)] - **doc**: fs.open 的数字标志（Carl Lei） [#3641](https://github.com/nodejs/node/pull/3641)
* \[[`5207099dc9`](https://github.com/nodejs/node/commit/5207099dc9)] - **doc**: 澄清 fs 流期望阻塞 fd（Carl Lei） [#3641](https://github.com/nodejs/node/pull/3641)
* \[[`753c5071ea`](https://github.com/nodejs/node/commit/753c5071ea)] - **doc**: 为 crypto.pbkdf2 添加最佳实践（Tom Gallacher） [#3290](https://github.com/nodejs/node/pull/3290)
* \[[`8f0291beba`](https://github.com/nodejs/node/commit/8f0291beba)] - **doc**: 更新 WORKING\_GROUPS.md 以包含 Intl（Steven R. Loomis） [#3251](https://github.com/nodejs/node/pull/3251)
* \[[`c31d472487`](https://github.com/nodejs/node/commit/c31d472487)] - **doc**: 将 repl 按字母顺序排序（Tristian Flanagan） [#3859](https://github.com/nodejs/node/pull/3859)
* \[[`6b172d9fe8`](https://github.com/nodejs/node/commit/6b172d9fe8)] - **doc**: 统一参考样式链接（Bryan English） [#3845](https://github.com/nodejs/node/pull/3845)
* \[[`ffd3335e29`](https://github.com/nodejs/node/commit/ffd3335e29)] - **doc**: 处理行为准则中粗话的使用（James M Snell） [#3827](https://github.com/nodejs/node/pull/3827)
* \[[`a36a5b63cf`](https://github.com/nodejs/node/commit/a36a5b63cf)] - **doc**: 重写 message.headers 以表明它们不是只读的（Tristian Flanagan） [#3814](https://github.com/nodejs/node/pull/3814)
* \[[`6de77cd320`](https://github.com/nodejs/node/commit/6de77cd320)] - **doc**: 澄清重复头部的处理（Bryan English） [#3810](https://github.com/nodejs/node/pull/3810)
* \[[`b22973af81`](https://github.com/nodejs/node/commit/b22973af81)] - **doc**: 用更新后的文本替换 readme 开头部分（Rod Vagg） [#3482](https://github.com/nodejs/node/pull/3482)
* \[[`eab0d56ea9`](https://github.com/nodejs/node/commit/eab0d56ea9)] - **doc**: repl: 添加 defineComand 和 displayPrompt（Bryan English） [#3765](https://github.com/nodejs/node/pull/3765)
* \[[`15fb02985f`](https://github.com/nodejs/node/commit/15fb02985f)] - **doc**: 在 readme 中记录发布类型（Rod Vagg） [#3482](https://github.com/nodejs/node/pull/3482)
* \[[`29f26b882f`](https://github.com/nodejs/node/commit/29f26b882f)] - **doc**: 添加 \[customizing util.inspect colors] 的链接。（Jesse McCarthy） [#3749](https://github.com/nodejs/node/pull/3749)
* \[[`90fdb4f7b3`](https://github.com/nodejs/node/commit/90fdb4f7b3)] - **doc**: 将 tls 按字母顺序排序（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`39fa9fa85c`](https://github.com/nodejs/node/commit/39fa9fa85c)] - **doc**: 将 stream 按字母顺序排序（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`e98e8afb2b`](https://github.com/nodejs/node/commit/e98e8afb2b)] - **doc**: 将 net 按字母顺序排序（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`6de887483d`](https://github.com/nodejs/node/commit/6de887483d)] - **doc**: 将 process 按字母顺序排序（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`37033dcb71`](https://github.com/nodejs/node/commit/37033dcb71)] - **doc**: 将 zlib 按字母顺序排序（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`9878034567`](https://github.com/nodejs/node/commit/9878034567)] - **doc**: 将 util 按字母顺序排序（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`48fc765eb6`](https://github.com/nodejs/node/commit/48fc765eb6)] - **doc**: 将 https 按字母顺序排序（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`3546eb4f40`](https://github.com/nodejs/node/commit/3546eb4f40)] - **doc**: 将 http 按字母顺序排序（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`dedfb1156a`](https://github.com/nodejs/node/commit/dedfb1156a)] - **doc**: 将 modules 按字母顺序排序（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`71722fe1a1`](https://github.com/nodejs/node/commit/71722fe1a1)] - **doc**: 将 readline 按字母顺序排序（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`660062bf9e`](https://github.com/nodejs/node/commit/660062bf9e)] - **doc**: 将 repl 按字母顺序排序（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`34b8d28725`](https://github.com/nodejs/node/commit/34b8d28725)] - **doc**: 将 string\_decoder 按字母顺序排序（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`3f3b9ed7d7`](https://github.com/nodejs/node/commit/3f3b9ed7d7)] - **doc**: 将 timers 按字母顺序排序（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`af876ddc64`](https://github.com/nodejs/node/commit/af876ddc64)] - **doc**: 将 tty 按字母顺序排序（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`3c2068704a`](https://github.com/nodejs/node/commit/3c2068704a)] - **doc**: 将 url 按字母顺序排序（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`363692fd0c`](https://github.com/nodejs/node/commit/363692fd0c)] - **doc**: 将 vm 按字母顺序排序（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`ca41b55166`](https://github.com/nodejs/node/commit/ca41b55166)] - **doc**: 将 querystring 按字母顺序排序（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`f37ff22b9f`](https://github.com/nodejs/node/commit/f37ff22b9f)] - **doc**: 将 punycode 按字母顺序排序（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`4d569607af`](https://github.com/nodejs/node/commit/4d569607af)] - **doc**: 将 path 按字母顺序排序（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`daa62447d1`](https://github.com/nodejs/node/commit/daa62447d1)] - **doc**: 将 os 按字母顺序排序（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`0906f9a8bb`](https://github.com/nodejs/node/commit/0906f9a8bb)] - **doc**: 将 globals 按字母顺序排序（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`6cd06c1319`](https://github.com/nodejs/node/commit/6cd06c1319)] - **doc**: 将 fs 按字母顺序排序（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`5b310f8d9e`](https://github.com/nodejs/node/commit/5b310f8d9e)] - **doc**: 将 events 按字母顺序排序（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`782cb7d15b`](https://github.com/nodejs/node/commit/782cb7d15b)] - **doc**: 将 errors 按字母顺序排序（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`c39eabbec4`](https://github.com/nodejs/node/commit/c39eabbec4)] - **doc**: 将 dgram 按字母顺序排序（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`261e0f3a21`](https://github.com/nodejs/node/commit/261e0f3a21)] - **doc**: 将 crypto 按字母顺序排序（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`0e6121d04d`](https://github.com/nodejs/node/commit/0e6121d04d)] - **doc**: 将 dns 按字母顺序排序（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`435ffb79f7`](https://github.com/nodejs/node/commit/435ffb79f7)] - **doc**: 将 console 按字母顺序排序（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`28935a10d6`](https://github.com/nodejs/node/commit/28935a10d6)] - **doc**: 将 cluster 按字母顺序排序（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`5e79dc4406`](https://github.com/nodejs/node/commit/5e79dc4406)] - **doc**: 将 child\_process 按字母顺序排序（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`af0bf1a72c`](https://github.com/nodejs/node/commit/af0bf1a72c)] - **doc**: 将 buffer 按字母顺序排序（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`f43a0330aa`](https://github.com/nodejs/node/commit/f43a0330aa)] - **doc**: 将 assert 按字母顺序排序（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`1bbc3b3ff8`](https://github.com/nodejs/node/commit/1bbc3b3ff8)] - **doc**: 添加关于 tls 连接元数据方法的说明（Tyler Henkel） [#3746](https://github.com/nodejs/node/pull/3746)
* \[[`3c415bbb12`](https://github.com/nodejs/node/commit/3c415bbb12)] - **doc**: 为 util.isBuffer 添加说明（Evan Lucas） [#3790](https://github.com/nodejs/node/pull/3790)
* \[[`7b5e4574fd`](https://github.com/nodejs/node/commit/7b5e4574fd)] - **doc**: 将 romankl 添加为协作者（Roman Klauke） [#3725](https://github.com/nodejs/node/pull/3725)
* \[[`4f7c638a7a`](https://github.com/nodejs/node/commit/4f7c638a7a)] - **doc**: 将 saghul 添加为协作者（Saúl Ibarra Corretgé）
* \[[`523251270a`](https://github.com/nodejs/node/commit/523251270a)] - **doc**: 将 thealphanerd 添加为协作者（Myles Borins） [#3723](https://github.com/nodejs/node/pull/3723)
* \[[`488e74f27d`](https://github.com/nodejs/node/commit/488e74f27d)] - **doc**: 在协作者指南中更新 lts 描述（James M Snell） [#3668](https://github.com/nodejs/node/pull/3668)
* \[[`fe3ae3cea4`](https://github.com/nodejs/node/commit/fe3ae3cea4)] - **doc**: 向 COLLABORATOR_GUIDE.md 添加 LTS 信息（Myles Borins） [#3442](https://github.com/nodejs/node/pull/3442)
* \[[`daa10a345e`](https://github.com/nodejs/node/commit/daa10a345e)] - **doc**: 修复 readme.md 中的拼写错误（Sam P Gallagher-Bishop） [#3649](https://github.com/nodejs/node/pull/3649)
* \[[`eca5720761`](https://github.com/nodejs/node/commit/eca5720761)] - **doc**: 修复 changelog.md 中错误的日期和已知问题（James M Snell） [#3650](https://github.com/nodejs/node/pull/3650)
* \[[`83494f8f3e`](https://github.com/nodejs/node/commit/83494f8f3e)] - **doc**: 将 iojs-\* 组重命名为 nodejs-\*（Steven R. Loomis） [#3634](https://github.com/nodejs/node/pull/3634)
* \[[`347fb65aee`](https://github.com/nodejs/node/commit/347fb65aee)] - **doc**: 修复 crypto spkac 函数描述（Jason Gerfen） [#3614](https://github.com/nodejs/node/pull/3614)
* \[[`11d2050d63`](https://github.com/nodejs/node/commit/11d2050d63)] - **doc**: 更新 streams 简化构造函数 API（Tom Gallacher） [#3602](https://github.com/nodejs/node/pull/3602)
* \[[`6db4392bfb`](https://github.com/nodejs/node/commit/6db4392bfb)] - **doc**: 让 API 文档中的代码片段更醒目（phijohns） [#3573](https://github.com/nodejs/node/pull/3573)
* \[[`8a7dd73af1`](https://github.com/nodejs/node/commit/8a7dd73af1)] - **doc**: 添加 buf.copy 的返回值说明（Manuel B） [#3555](https://github.com/nodejs/node/pull/3555)
* \[[`cf4b65c2d6`](https://github.com/nodejs/node/commit/cf4b65c2d6)] - **doc**: 修复 assert 文档中的函数参数顺序（David Woods） [#3533](https://github.com/nodejs/node/pull/3533)
* \[[`a2efe4c72b`](https://github.com/nodejs/node/commit/a2efe4c72b)] - **doc**: 添加关于 timeout 延迟 > TIMEOUT_MAX 的说明（Guilherme Souza） [#3512](https://github.com/nodejs/node/pull/3512)
* \[[`d1b5833476`](https://github.com/nodejs/node/commit/d1b5833476)] - **doc**: 添加 crypto 中算法和密钥大小的注意事项（Shigeki Ohtsu） [#3479](https://github.com/nodejs/node/pull/3479)
* \[[`12cdf6fcf3`](https://github.com/nodejs/node/commit/12cdf6fcf3)] - **doc**: 在 events.markdown 中添加方法链接（Alejandro Oviedo） [#3187](https://github.com/nodejs/node/pull/3187)
* \[[`f50f19e384`](https://github.com/nodejs/node/commit/f50f19e384)] - **doc**: 定向到文件时 stdout/stderr 可能会阻塞（Ben Noordhuis） [#3170](https://github.com/nodejs/node/pull/3170)
* \[[`b2cc1302e0`](https://github.com/nodejs/node/commit/b2cc1302e0)] - **docs**: 提高行为准则的可发现性（Ashley Williams） [#3774](https://github.com/nodejs/node/pull/3774)
* \[[`fa1ab497f1`](https://github.com/nodejs/node/commit/fa1ab497f1)] - **docs**: fs - 将指向 buffer 编码的链接改为 Buffer 类锚点（fansworld-claudio） [#2796](https://github.com/nodejs/node/pull/2796)
* \[[`34e64e5390`](https://github.com/nodejs/node/commit/34e64e5390)] - **domains**: 修复未捕获异常的处理（Julien Gilli） [#3884](https://github.com/nodejs/node/pull/3884)
* \[[`0311836e7a`](https://github.com/nodejs/node/commit/0311836e7a)] - **meta**: 移除源码中的粗话使用（Myles Borins） [#4122](https://github.com/nodejs/node/pull/4122)
* \[[`971762ada9`](https://github.com/nodejs/node/commit/971762ada9)] - **module**: 缓存正则表达式（Evan Lucas） [#3869](https://github.com/nodejs/node/pull/3869)
* \[[`d80fa2c77c`](https://github.com/nodejs/node/commit/d80fa2c77c)] - **module**: 移除不必要的 JSON.stringify（Andres Suarez） [#3578](https://github.com/nodejs/node/pull/3578)
* \[[`aa85d62f09`](https://github.com/nodejs/node/commit/aa85d62f09)] - **net**: 添加本地地址/端口以提供更好的错误信息（Jan Schär） [#3946](https://github.com/nodejs/node/pull/3946)
* \[[`803a56de52`](https://github.com/nodejs/node/commit/803a56de52)] - **querystring**: 解析多个分隔符字符（Yosuke Furukawa） [#3807](https://github.com/nodejs/node/pull/3807)
* \[[`ff02b295fc`](https://github.com/nodejs/node/commit/ff02b295fc)] - **repl**: 如果无法打开历史文件则不要崩溃（Evan Lucas） [#3630](https://github.com/nodejs/node/pull/3630)
* \[[`329e88e545`](https://github.com/nodejs/node/commit/329e88e545)] - **repl**: 要退出，请再次按 ^C 或输入 .exit.（Hemanth.HM） [#3368](https://github.com/nodejs/node/pull/3368)
* \[[`9b05905361`](https://github.com/nodejs/node/commit/9b05905361)] - **src**: 回滚 "nix stdin \_readableState.reading"（Roman Reiss） [#3490](https://github.com/nodejs/node/pull/3490)
* \[[`957c1f2543`](https://github.com/nodejs/node/commit/957c1f2543)] - **stream\_wrap**: 如果流具有 StringDecoder 则报错（Fedor Indutny） [#4031](https://github.com/nodejs/node/pull/4031)
* \[[`43e3b69dae`](https://github.com/nodejs/node/commit/43e3b69dae)] - **test**: 重构 test-http-exit-delay（Rich Trott） [#4055](https://github.com/nodejs/node/pull/4055)
* \[[`541d0d21be`](https://github.com/nodejs/node/commit/541d0d21be)] - **test**: 修复 cluster-disconnect-handles 的不稳定性（Santiago Gimeno） [#4009](https://github.com/nodejs/node/pull/4009)
* \[[`5f66d66e84`](https://github.com/nodejs/node/commit/5f66d66e84)] - **test**: 不检查 test-http-1.0 中的 chunk 数量（Santiago Gimeno） [#3961](https://github.com/nodejs/node/pull/3961)
* \[[`355edf585b`](https://github.com/nodejs/node/commit/355edf585b)] - **test**: 修复 cluster-worker-isdead（Santiago Gimeno） [#3954](https://github.com/nodejs/node/pull/3954)
* \[[`4e46e04002`](https://github.com/nodejs/node/commit/4e46e04002)] - **test**: 为 repl.defineCommand() 添加测试（Bryan English） [#3908](https://github.com/nodejs/node/pull/3908)
* \[[`4ea1a69c53`](https://github.com/nodejs/node/commit/4ea1a69c53)] - **test**: 在 FreeBSD 上将测试标记为不稳定（Rich Trott） [#4016](https://github.com/nodejs/node/pull/4016)
* \[[`05b64c11f5`](https://github.com/nodejs/node/commit/05b64c11f5)] - **test**: 在 windows 上将 cluster-net-send 测试标记为不稳定（Rich Trott） [#4006](https://github.com/nodejs/node/pull/4006)
* \[[`695015579b`](https://github.com/nodejs/node/commit/695015579b)] - **test**: 移除 ls-no-sslv3 的不稳定标记（Rich Trott） [#3620](https://github.com/nodejs/node/pull/3620)
* \[[`abbd87b273`](https://github.com/nodejs/node/commit/abbd87b273)] - **test**: 在 windows 上将 fork 回归测试标记为不稳定（Rich Trott） [#4005](https://github.com/nodejs/node/pull/4005)
* \[[`38ba152a7a`](https://github.com/nodejs/node/commit/38ba152a7a)] - **test**: 如果在 FreeBSD jail 中则跳过测试（Rich Trott） [#3995](https://github.com/nodejs/node/pull/3995)
* \[[`cc24f0ea58`](https://github.com/nodejs/node/commit/cc24f0ea58)] - **test**: 修复 test-domain-exit-dispose-again（Julien Gilli） [#3990](https://github.com/nodejs/node/pull/3990)
* \[[`b2f1014d26`](https://github.com/nodejs/node/commit/b2f1014d26)] - **test**: 移除 cluster 测试的不稳定状态（Rich Trott） [#3975](https://github.com/nodejs/node/pull/3975)
* \[[`e66794fd30`](https://github.com/nodejs/node/commit/e66794fd30)] - **test**: 处理不稳定的 test-http-client-timeout-event（Rich Trott） [#3968](https://github.com/nodejs/node/pull/3968)
* \[[`5a2727421a`](https://github.com/nodejs/node/commit/5a2727421a)] - **test**: 在 smartos 上遇到 ECONNREFUSED 时重试（Rich Trott） [#3941](https://github.com/nodejs/node/pull/3941)
* \[[`dbc85a275c`](https://github.com/nodejs/node/commit/dbc85a275c)] - **test**: 避免 rpi 上的测试超时（Stefan Budeanu） [#3902](https://github.com/nodejs/node/pull/3902)
* \[[`b9d7378d20`](https://github.com/nodejs/node/commit/b9d7378d20)] - **test**: 修复不稳定的 test-child-process-spawnsync-input（Rich Trott） [#3889](https://github.com/nodejs/node/pull/3889)
* \[[`cca216a034`](https://github.com/nodejs/node/commit/cca216a034)] - **test**: 将测试专用函数移出 common（Rich Trott） [#3871](https://github.com/nodejs/node/pull/3871)
* \[[`fb8df8d6c2`](https://github.com/nodejs/node/commit/fb8df8d6c2)] - **test**: module loading error 修复 solaris #3798（fansworld-claudio） [#3855](https://github.com/nodejs/node/pull/3855)
* \[[`9ea6bc1e0f`](https://github.com/nodejs/node/commit/9ea6bc1e0f)] - **test**: 如果 FreeBSD jail 会破坏它则跳过测试（Rich Trott） [#3839](https://github.com/nodejs/node/pull/3839)
* \[[`150f126618`](https://github.com/nodejs/node/commit/150f126618)] - **test**: 修复不稳定的 SmartOS 测试（Rich Trott） [#3830](https://github.com/nodejs/node/pull/3830)
* \[[`603a6f5405`](https://github.com/nodejs/node/commit/603a6f5405)] - **test**: 并行运行 pipeline flood 测试（Rich Trott） [#3811](https://github.com/nodejs/node/pull/3811)
* \[[`4a26f74ee3`](https://github.com/nodejs/node/commit/4a26f74ee3)] - **test**: 在 FIPS 模式下跳过/替换弱加密测试（Stefan Budeanu） [#3757](https://github.com/nodejs/node/pull/3757)
* \[[`3f9562b6bd`](https://github.com/nodejs/node/commit/3f9562b6bd)] - **test**: 在测试夹具中使用更强的加密（Stefan Budeanu） [#3759](https://github.com/nodejs/node/pull/3759)
* \[[`1f83eebec5`](https://github.com/nodejs/node/commit/1f83eebec5)] - **test**: 为 FIPS 标准提高加密强度（Stefan Budeanu） [#3758](https://github.com/nodejs/node/pull/3758)
* \[[`7c5fbf7850`](https://github.com/nodejs/node/commit/7c5fbf7850)] - **test**: 将 hasFipsCrypto 添加到 test/common.js（Stefan Budeanu） [#3756](https://github.com/nodejs/node/pull/3756)
* \[[`f30214f135`](https://github.com/nodejs/node/commit/f30214f135)] - **test**: 添加无效 DSA 密钥大小的测试（Stefan Budeanu） [#3756](https://github.com/nodejs/node/pull/3756)
* \[[`9a6c9faafb`](https://github.com/nodejs/node/commit/9a6c9faafb)] - **test**: fs.open 的数字标志（Carl Lei） [#3641](https://github.com/nodejs/node/pull/3641)
* \[[`93d1d3cfcd`](https://github.com/nodejs/node/commit/93d1d3cfcd)] - **test**: 重构 test-http-pipeline-flood（Rich Trott） [#3636](https://github.com/nodejs/node/pull/3636)
* \[[`6c23f67504`](https://github.com/nodejs/node/commit/6c23f67504)] - **test**: 修复不稳定的测试 test-http-pipeline-flood（Devin Nakamura） [#3636](https://github.com/nodejs/node/pull/3636)
* \[[`4e5cae4360`](https://github.com/nodejs/node/commit/4e5cae4360)] - **test**: 使用真正无效的主机名（Sakthipriyan Vairamani） [#3711](https://github.com/nodejs/node/pull/3711)
* \[[`da189f793b`](https://github.com/nodejs/node/commit/da189f793b)] - **test**: 为 AIX 修复 test-cluster-worker-exit.js（Imran Iqbal） [#3666](https://github.com/nodejs/node/pull/3666)
* \[[`7b4194a863`](https://github.com/nodejs/node/commit/7b4194a863)] - **test**: 为 musl 修复 test-module-loading-error（Hugues Malphettes） [#3657](https://github.com/nodejs/node/pull/3657)
* \[[`3dc52e99df`](https://github.com/nodejs/node/commit/3dc52e99df)] - **test**: 为 AIX 修复 test-net-persistent-keepalive（Imran Iqbal） [#3646](https://github.com/nodejs/node/pull/3646)
* \[[`0e8eb66a78`](https://github.com/nodejs/node/commit/0e8eb66a78)] - **test**: 修复 Windows 上 repl 测试的模块路径（Michael Cornacchia） [#3608](https://github.com/nodejs/node/pull/3608)
* \[[`3aecbc86d2`](https://github.com/nodejs/node/commit/3aecbc86d2)] - **test**: 添加 test-zlib-flush-drain（Myles Borins） [#3534](https://github.com/nodejs/node/pull/3534)
* \[[`542d05cbe1`](https://github.com/nodejs/node/commit/542d05cbe1)] - **test**: 增强 fs-watch-recursive 测试（Sakthipriyan Vairamani） [#2599](https://github.com/nodejs/node/pull/2599)
* \[[`0eb0119d64`](https://github.com/nodejs/node/commit/0eb0119d64)] - **tls**: FIPS 模式下的 sessionIdContext 使用 SHA1（Stefan Budeanu） [#3755](https://github.com/nodejs/node/pull/3755)
* \[[`c10c08604c`](https://github.com/nodejs/node/commit/c10c08604c)] - **tls**: 移除 util 和对 util.format 的调用（Myles Borins） [#3456](https://github.com/nodejs/node/pull/3456)
* \[[`a558a570c0`](https://github.com/nodejs/node/commit/a558a570c0)] - **util**: 使用正则表达式替代 str.replace().join()（qinjia） [#3689](https://github.com/nodejs/node/pull/3689)
* \[[`47bb94a0c3`](https://github.com/nodejs/node/commit/47bb94a0c3)] - **zlib**: 仅在提供了回调时才应用 drain 监听器（Craig Cavalier） [#3534](https://github.com/nodejs/node/pull/3534)
* \[[`4733a60158`](https://github.com/nodejs/node/commit/4733a60158)] - **zlib**: 在递归调用 flush 时传递 kind（Myles Borins） [#3534](https://github.com/nodejs/node/pull/3534)

<a id="4.2.3"></a>

## 2015-12-04, 版本 4.2.3 'Argon' (LTS), @rvagg

安全更新

### 显著变更

* **http**: 修复 CVE-2015-8027，一个 bug：HTTP socket 可能已经不再关联解析器，但流水线请求尝试在不存在的解析器上触发暂停或恢复，这可能导致拒绝服务漏洞。(Fedor Indutny)
* **openssl**: 升级到 1.0.2e，包含以下修复：
  * CVE-2015-3193 “BN\_mod\_exp may produce incorrect results on x86\_64”，使用 DHE 密钥交换的 Node.js TLS 服务器可能会受到攻击。详情见 <http://openssl.org/news/secadv/20151203.txt>。
  * CVE-2015-3194 “Certificate verify crash with missing PSS parameter”，使用客户端证书认证的 Node.js TLS 服务器存在潜在拒绝服务风险；TLS 客户端也会受到影响。详情见 <http://openssl.org/news/secadv/20151203.txt>。
    (Shigeki Ohtsu) [#4134](https://github.com/nodejs/node/pull/4134)
* **v8**: 回移植修复 CVE-2015-6764，`JSON.stringify()` 中的一个 bug 可能导致数组越界读取。(Ben Noordhuis)

### 已知问题

* 在 `beforeExit` 期间运行的未引用定时器仍有一些问题有待解决。参见 [#1264](https://github.com/nodejs/node/issues/1264)。
* REPL 中的代理对可能会冻结终端。 [#690](https://github.com/nodejs/node/issues/690)
* 在 DNS 查询进行中调用 `dns.setServers()` 可能会因断言失败导致进程崩溃。 [#894](https://github.com/nodejs/node/issues/894)
* 在两个完整主机之间解析时，`url.resolve` 可能会转移 url 的 auth 部分，参见 [#1435](https://github.com/nodejs/node/issues/1435)。

### 提交

* \[[`49bbd563be`](https://github.com/nodejs/node/commit/49bbd563be)] - **deps**: 将 openssl 源码升级到 1.0.2e (Shigeki Ohtsu) [#4134](https://github.com/nodejs/node/pull/4134)
* \[[`9a063fd492`](https://github.com/nodejs/node/commit/9a063fd492)] - **deps**: 从上游 v8 回移植 a7e50a5 (Ben Noordhuis)
* \[[`07233206e9`](https://github.com/nodejs/node/commit/07233206e9)] - **deps**: 从上游 v8 回移植 6df9a1d (Ben Noordhuis)
* \[[`1c8e6de78e`](https://github.com/nodejs/node/commit/1c8e6de78e)] - **http**: 修复 pipeline 回归问题 (Fedor Indutny)

<a id="4.2.2"></a>

## 2015-11-03, 版本 4.2.2 'Argon' (LTS), @jasnell

### 显著变更

这是一个 LTS 维护版本，修复了若干问题：

* \[[`1d0f2cbf87`](https://github.com/nodejs/node/commit/1d0f2cbf87)] - **buffer**: 修复 writeUInt{B,L}E 的值检查 (Trevor Norris) [#3500](https://github.com/nodejs/node/pull/3500)
* \[[`2a45b72b4a`](https://github.com/nodejs/node/commit/2a45b72b4a)] - **buffer**: 不要在零大小重新分配时 CHECK (Ben Noordhuis) [#3499](https://github.com/nodejs/node/pull/3499)
* \[[`a6469e901a`](https://github.com/nodejs/node/commit/a6469e901a)] - **deps**: 从 V8 上游回移植 010897c (Ali Ijaz Sheikh) [#3520](https://github.com/nodejs/node/pull/3520)
* \[[`cadee67c25`](https://github.com/nodejs/node/commit/cadee67c25)] - **deps**: 从 v8 上游回移植 8d6a228 (Fedor Indutny) [#3549](https://github.com/nodejs/node/pull/3549)
* \[[`46c8c94055`](https://github.com/nodejs/node/commit/46c8c94055)] - **fs**: 减少 fs.write() 中的重复代码 (ronkorving) [#2947](https://github.com/nodejs/node/pull/2947)
* \[[`0427cdf094`](https://github.com/nodejs/node/commit/0427cdf094)] - **http**: 修复停滞的 pipeline bug (Fedor Indutny) [#3342](https://github.com/nodejs/node/pull/3342)
* \[[`2109708186`](https://github.com/nodejs/node/commit/2109708186)] - **lib**: 修复 cluster handle 泄漏 (Rich Trott) [#3510](https://github.com/nodejs/node/pull/3510)
* \[[`f49c7c6955`](https://github.com/nodejs/node/commit/f49c7c6955)] - **lib**: 避免在 completion error 时退出 REPL (Rich Trott) [#3358](https://github.com/nodejs/node/pull/3358)
* \[[`8a2c4aeeaa`](https://github.com/nodejs/node/commit/8a2c4aeeaa)] - **repl**: 正确处理注释 (Sakthipriyan Vairamani) [#3515](https://github.com/nodejs/node/pull/3515)
* \[[`a04408acce`](https://github.com/nodejs/node/commit/a04408acce)] - **repl**: 加载时正确限制持久历史记录 (Jeremiah Senkpiel) [#2356](https://github.com/nodejs/node/pull/2356)
* \[[`3bafe1a59b`](https://github.com/nodejs/node/commit/3bafe1a59b)] - **src**: 修复退出时调试信号中的竞态条件 (Ben Noordhuis) [#3528](https://github.com/nodejs/node/pull/3528)
* \[[`fe01d0df7a`](https://github.com/nodejs/node/commit/fe01d0df7a)] - **src**: 修复 Windows 上异常消息编码问题 (Brian White) [#3288](https://github.com/nodejs/node/pull/3288)
* \[[`4bac5d9ddf`](https://github.com/nodejs/node/commit/4bac5d9ddf)] - **stream**: 避免对单个缓冲区进行不必要的 concat。 (Calvin Metcalf) [#3300](https://github.com/nodejs/node/pull/3300)
* \[[`8d78d687d5`](https://github.com/nodejs/node/commit/8d78d687d5)] - **timers**: 在 `setTimeout().unref()` 中复用 timer (Fedor Indutny) [#3407](https://github.com/nodejs/node/pull/3407)
* \[[`e69c869399`](https://github.com/nodejs/node/commit/e69c869399)] - **tls**: TLSSocket 选项默认 isServer 为 false (Yuval Brik) [#2614](https://github.com/nodejs/node/pull/2614)

### 已知问题

* REPL 中的代理对可能会冻结终端。 [#690](https://github.com/nodejs/node/issues/690)
* 在 DNS 查询进行中调用 `dns.setServers()` 可能会因断言失败导致进程崩溃。 [#894](https://github.com/nodejs/node/issues/894)
* 在两个完整主机之间解析时，`url.resolve` 可能会转移 url 的 auth 部分，参见 [#1435](https://github.com/nodejs/node/issues/1435)。

### 提交

* \[[`1d0f2cbf87`](https://github.com/nodejs/node/commit/1d0f2cbf87)] - **buffer**: 修复 writeUInt{B,L}E 的值检查 (Trevor Norris) [#3500](https://github.com/nodejs/node/pull/3500)
* \[[`2a45b72b4a`](https://github.com/nodejs/node/commit/2a45b72b4a)] - **buffer**: 不要在零大小重新分配时 CHECK (Ben Noordhuis) [#3499](https://github.com/nodejs/node/pull/3499)
* \[[`dc655e1dd2`](https://github.com/nodejs/node/commit/dc655e1dd2)] - **build**: 修正 --link-module 帮助文本 (Minqi Pan) [#3379](https://github.com/nodejs/node/pull/3379)
* \[[`a6469e901a`](https://github.com/nodejs/node/commit/a6469e901a)] - **deps**: 从 V8 上游回移植 010897c (Ali Ijaz Sheikh) [#3520](https://github.com/nodejs/node/pull/3520)
* \[[`cadee67c25`](https://github.com/nodejs/node/commit/cadee67c25)] - **deps**: 从 v8 上游回移植 8d6a228 (Fedor Indutny) [#3549](https://github.com/nodejs/node/pull/3549)
* \[[`1ebd35550b`](https://github.com/nodejs/node/commit/1ebd35550b)] - **doc**: 修正文档更新日志中的错别字 (reggi) [#3291](https://github.com/nodejs/node/pull/3291)
* \[[`fbd93d4c1c`](https://github.com/nodejs/node/commit/fbd93d4c1c)] - **doc**: promise 事件的更多使用场景 (Domenic Denicola) [#3438](https://github.com/nodejs/node/pull/3438)
* \[[`6ceb9af407`](https://github.com/nodejs/node/commit/6ceb9af407)] - **doc**: 删除旧说明，`cluster` 已标记为稳定 (Balázs Galambosi) [#3314](https://github.com/nodejs/node/pull/3314)
* \[[`a5f0d64ddc`](https://github.com/nodejs/node/commit/a5f0d64ddc)] - **doc**: createServer 的 key 选项可以是数组 (Sakthipriyan Vairamani) [#3123](https://github.com/nodejs/node/pull/3123)
* \[[`317e0ec6b3`](https://github.com/nodejs/node/commit/317e0ec6b3)] - **doc**: binary 编码并未被弃用 (Trevor Norris) [#3441](https://github.com/nodejs/node/pull/3441)
* \[[`b422f6ee1a`](https://github.com/nodejs/node/commit/b422f6ee1a)] - **doc**: 说明 URL 无效时的行为 (Sakthipriyan Vairamani) [#2966](https://github.com/nodejs/node/pull/2966)
* \[[`bc29aad22b`](https://github.com/nodejs/node/commit/bc29aad22b)] - **doc**: 修复 tls 恢复示例中的缩进 (Roman Reiss) [#3372](https://github.com/nodejs/node/pull/3372)
* \[[`313877bd8f`](https://github.com/nodejs/node/commit/313877bd8f)] - **doc**: 修正更新日志中的错别字 (Timothy Gu) [#3353](https://github.com/nodejs/node/pull/3353)
* \[[`4be432862a`](https://github.com/nodejs/node/commit/4be432862a)] - **doc**: 将 pbkdf2 中的 keylen 显示为字节长度 (calebboyd) [#3334](https://github.com/nodejs/node/pull/3334)
* \[[`23a1140ddb`](https://github.com/nodejs/node/commit/23a1140ddb)] - **doc**: 添加关于 Assert 行为和维护的信息 (Rich Trott) [#3330](https://github.com/nodejs/node/pull/3330)
* \[[`e04cb1e1fc`](https://github.com/nodejs/node/commit/e04cb1e1fc)] - **doc**: 明确 API buffer.concat (Martii) [#3255](https://github.com/nodejs/node/pull/3255)
* \[[`eae714c370`](https://github.com/nodejs/node/commit/eae714c370)] - **doc**: 阐明 `option.detached` 的用法 (Kyle Smith) [#3250](https://github.com/nodejs/node/pull/3250)
* \[[`b884899e67`](https://github.com/nodejs/node/commit/b884899e67)] - **doc**: 在更新日志标题中将 v4.2.1 标记为 LTS (Phillip Johnsen) [#3360](https://github.com/nodejs/node/pull/3360)
* \[[`9120a04981`](https://github.com/nodejs/node/commit/9120a04981)] - **docs**: 为 execSync 补充缺失的 shell 选项 (fansworld-claudio) [#3440](https://github.com/nodejs/node/pull/3440)
* \[[`46c8c94055`](https://github.com/nodejs/node/commit/46c8c94055)] - **fs**: 减少 fs.write() 中的重复代码 (ronkorving) [#2947](https://github.com/nodejs/node/pull/2947)
* \[[`0427cdf094`](https://github.com/nodejs/node/commit/0427cdf094)] - **http**: 修复停滞的 pipeline bug (Fedor Indutny) [#3342](https://github.com/nodejs/node/pull/3342)
* \[[`2109708186`](https://github.com/nodejs/node/commit/2109708186)] - **lib**: 修复 cluster handle 泄漏 (Rich Trott) [#3510](https://github.com/nodejs/node/pull/3510)
* \[[`f49c7c6955`](https://github.com/nodejs/node/commit/f49c7c6955)] - **lib**: 避免在 completion error 时退出 REPL (Rich Trott) [#3358](https://github.com/nodejs/node/pull/3358)
* \[[`8a2c4aeeaa`](https://github.com/nodejs/node/commit/8a2c4aeeaa)] - **repl**: 正确处理注释 (Sakthipriyan Vairamani) [#3515](https://github.com/nodejs/node/pull/3515)
* \[[`a04408acce`](https://github.com/nodejs/node/commit/a04408acce)] - **repl**: 加载时正确限制持久历史记录 (Jeremiah Senkpiel) [#2356](https://github.com/nodejs/node/pull/2356)
* \[[`5d1f1c5fa8`](https://github.com/nodejs/node/commit/5d1f1c5fa8)] - **src**: 在进行语法检查前包装源码 (Evan Lucas) [#3587](https://github.com/nodejs/node/pull/3587)
* \[[`3bafe1a59b`](https://github.com/nodejs/node/commit/3bafe1a59b)] - **src**: 修复退出时调试信号中的竞态条件 (Ben Noordhuis) [#3528](https://github.com/nodejs/node/pull/3528)
* \[[`fe01d0df7a`](https://github.com/nodejs/node/commit/fe01d0df7a)] - **src**: 修复 Windows 上异常消息编码问题 (Brian White) [#3288](https://github.com/nodejs/node/pull/3288)
* \[[`4bac5d9ddf`](https://github.com/nodejs/node/commit/4bac5d9ddf)] - **stream**: 避免对单个缓冲区进行不必要的 concat。 (Calvin Metcalf) [#3300](https://github.com/nodejs/node/pull/3300)
* \[[`117fb47a16`](https://github.com/nodejs/node/commit/117fb47a16)] - **stream**: 修正注释中 \_write() 的签名 (Fábio Santos) [#3248](https://github.com/nodejs/node/pull/3248)
* \[[`c563a34427`](https://github.com/nodejs/node/commit/c563a34427)] - **test**: 将相互独立的测试拆分到单独文件中 (Rich Trott) [#3548](https://github.com/nodejs/node/pull/3548)
* \[[`3f62952d42`](https://github.com/nodejs/node/commit/3f62952d42)] - **test**: 添加 node::MakeCallback() 测试覆盖 (Ben Noordhuis) [#3478](https://github.com/nodejs/node/pull/3478)
* \[[`6b75f10d8a`](https://github.com/nodejs/node/commit/6b75f10d8a)] - **test**: 在 tls socket 测试中使用环境变量中的端口号 (Stefan Budeanu) [#3557](https://github.com/nodejs/node/pull/3557)
* \[[`39ff44e94f`](https://github.com/nodejs/node/commit/39ff44e94f)] - **test**: 修复 win 上 heap-profiler 的链接错误 LNK1194 (Junliang Yan) [#3572](https://github.com/nodejs/node/pull/3572)
* \[[`a2786dd408`](https://github.com/nodejs/node/commit/a2786dd408)] - **test**: 修复 windows 上缺少 unistd.h 的问题 (Junliang Yan) [#3532](https://github.com/nodejs/node/pull/3532)
* \[[`5e6f7c9a23`](https://github.com/nodejs/node/commit/5e6f7c9a23)] - **test**: 为 --debug-brk -e 0 添加回归测试 (Ben Noordhuis) [#3585](https://github.com/nodejs/node/pull/3585)
* \[[`7cad182cb6`](https://github.com/nodejs/node/commit/7cad182cb6)] - **test**: 从 v0.10 移植 domains 回归测试 (Jonas Dohse) [#3356](https://github.com/nodejs/node/pull/3356)
* \[[`78d854c6ce`](https://github.com/nodejs/node/commit/78d854c6ce)] - **test**: 从 common 中移除 util (Rich Trott) [#3324](https://github.com/nodejs/node/pull/3324)
* \[[`c566c8b8c0`](https://github.com/nodejs/node/commit/c566c8b8c0)] - **test**: 从 common 中移除 util 属性 (Rich Trott) [#3304](https://github.com/nodejs/node/pull/3304)
* \[[`eb7c3fb2f4`](https://github.com/nodejs/node/commit/eb7c3fb2f4)] - **test**: 拆分 buffer 测试以提高可靠性 (Rich Trott) [#3323](https://github.com/nodejs/node/pull/3323)
* \[[`b398a85e19`](https://github.com/nodejs/node/commit/b398a85e19)] - **test**: 将长时间运行的测试并行化 (Rich Trott) [#3287](https://github.com/nodejs/node/pull/3287)
* \[[`b5f3b4956b`](https://github.com/nodejs/node/commit/b5f3b4956b)] - **test**: 改用已弃用的 util.isError() 调用 (Rich Trott) [#3084](https://github.com/nodejs/node/pull/3084)
* \[[`32149cacb5`](https://github.com/nodejs/node/commit/32149cacb5)] - **test**: 改进 util.inherits 的测试 (Michaël Zasso) [#3507](https://github.com/nodejs/node/pull/3507)
* \[[`5be686fab8`](https://github.com/nodejs/node/commit/5be686fab8)] - **test**: 在 test-dns-ipv6.js 中打印有用的错误信息 (Junliang Yan) [#3501](https://github.com/nodejs/node/pull/3501)
* \[[`0429131e32`](https://github.com/nodejs/node/commit/0429131e32)] - **test**: 修复 PPC 上带 abort-on-uncaught 的 domain (Julien Gilli) [#3354](https://github.com/nodejs/node/pull/3354)
* \[[`788106eee9`](https://github.com/nodejs/node/commit/788106eee9)] - **test**: 清理并改进 repl-persistent-history (Jeremiah Senkpiel) [#2356](https://github.com/nodejs/node/pull/2356)
* \[[`ea58fa0bac`](https://github.com/nodejs/node/commit/ea58fa0bac)] - **test**: 为 assert.deepEqual() 添加 Symbol 测试 (Rich Trott) [#3327](https://github.com/nodejs/node/pull/3327)
* \[[`d409ac473b`](https://github.com/nodejs/node/commit/d409ac473b)] - **test**: 在 aix 和 ppc 上禁用 test-tick-processor (Michael Dawson) [#3491](https://github.com/nodejs/node/pull/3491)
* \[[`c1623039dd`](https://github.com/nodejs/node/commit/c1623039dd)] - **test**: 加强 test-child-process-fork-regr-gh-2847 (Michael Dawson) [#3459](https://github.com/nodejs/node/pull/3459)
* \[[`3bb4437abb`](https://github.com/nodejs/node/commit/3bb4437abb)] - **test**: 修复 AIX 上的 test-net-keepalive (Imran Iqbal) [#3458](https://github.com/nodejs/node/pull/3458)
* \[[`af55641a69`](https://github.com/nodejs/node/commit/af55641a69)] - **test**: 当 assert.fail 传给回调时进行包装 (Myles Borins) [#3453](https://github.com/nodejs/node/pull/3453)
* \[[`7c7ef01e65`](https://github.com/nodejs/node/commit/7c7ef01e65)] - **test**: 如果不可用则跳过 test-dns-ipv6.js (Junliang Yan) [#3444](https://github.com/nodejs/node/pull/3444)
* \[[`a4d1510ba4`](https://github.com/nodejs/node/commit/a4d1510ba4)] - **test**: repl-persistent-history 不再不稳定 (Jeremiah Senkpiel) [#3437](https://github.com/nodejs/node/pull/3437)
* \[[`a5d968b8a2`](https://github.com/nodejs/node/commit/a5d968b8a2)] - **test**: 修复不稳定的 test-child-process-emfile (Rich Trott) [#3430](https://github.com/nodejs/node/pull/3430)
* \[[`eac2acca76`](https://github.com/nodejs/node/commit/eac2acca76)] - **test**: 移除 eval\_messages 测试中的 flaky 状态 (Rich Trott) [#3420](https://github.com/nodejs/node/pull/3420)
* \[[`155c778584`](https://github.com/nodejs/node/commit/155c778584)] - **test**: 修复 symlinks 的不稳定测试 (Rich Trott) [#3418](https://github.com/nodejs/node/pull/3418)
* \[[`74eb632483`](https://github.com/nodejs/node/commit/74eb632483)] - **test**: 使用正确的 assert.fail() 参数 (Rich Trott) [#3378](https://github.com/nodejs/node/pull/3378)
* \[[`0a4323dd82`](https://github.com/nodejs/node/commit/0a4323dd82)] - **test**: 用反引号字符串替换 util (Myles Borins) [#3359](https://github.com/nodejs/node/pull/3359)
* \[[`93847694ec`](https://github.com/nodejs/node/commit/93847694ec)] - **test**: 为 test-child-process-emfile 添加失败消息 (Rich Trott) [#3335](https://github.com/nodejs/node/pull/3335)
* \[[`8d78d687d5`](https://github.com/nodejs/node/commit/8d78d687d5)] - **timers**: 在 `setTimeout().unref()` 中复用 timer (Fedor Indutny) [#3407](https://github.com/nodejs/node/pull/3407)
* \[[`e69c869399`](https://github.com/nodejs/node/commit/e69c869399)] - **tls**: TLSSocket 选项默认 isServer 为 false (Yuval Brik) [#2614](https://github.com/nodejs/node/pull/2614)
* \[[`0b32bbbf69`](https://github.com/nodejs/node/commit/0b32bbbf69)] - **v8**: 修复 PPC 上内置代码大小问题 (Michael Dawson) [#3474](https://github.com/nodejs/node/pull/3474)

<a id="4.2.1"></a>

## 2015-10-13，版本 4.2.1 'Argon'（LTS），@jasnell

### 重要变更

* 包含两个回归问题的修复
  * WeakCallback 中的断言错误 - 参见 [#3329](https://github.com/nodejs/node/pull/3329)
  * 未定义的超时回归 - 参见 [#3331](https://github.com/nodejs/node/pull/3331)

### 已知问题

* 当服务器在分段 HTTP 连接上排队大量数据发送给客户端时，底层套接字可能会被销毁。参见 [#3332](https://github.com/nodejs/node/issues/3332) 和 [#3342](https://github.com/nodejs/node/pull/3342)。
* 在 `beforeExit` 期间运行的未引用定时器仍有一些问题有待解决。参见 [#1264](https://github.com/nodejs/node/issues/1264)。
* REPL 中的代理项对可能会冻结终端。 [#690](https://github.com/nodejs/node/issues/690)
* 在 DNS 查询进行中调用 `dns.setServers()` 可能会因断言失败导致进程崩溃。 [#894](https://github.com/nodejs/node/issues/894)
* 在两个完整主机之间解析时，`url.resolve` 可能会转移 url 的 auth 部分，参见 [#1435](https://github.com/nodejs/node/issues/1435)。

### 提交

* \[[`b3cbd13340`](https://github.com/nodejs/node/commit/b3cbd13340)] - **buffer**: 修复 WeakCallback 中的断言错误 (Fedor Indutny) [#3329](https://github.com/nodejs/node/pull/3329)
* \[[`102cb7288c`](https://github.com/nodejs/node/commit/102cb7288c)] - **doc**: 在变更日志标题中将 v4.2.0 标记为 LTS (Rod Vagg) [#3343](https://github.com/nodejs/node/pull/3343)
* \[[`c245a199a7`](https://github.com/nodejs/node/commit/c245a199a7)] - **lib**: 修复未定义的超时回归 (Ryan Graham) [#3331](https://github.com/nodejs/node/pull/3331)

<a id="4.2.0"></a>

## 2015-10-07，版本 4.2.0 'Argon'（LTS），@jasnell

### 重要变更

Node.js 首个 LTS 版本！有关 LTS 流程的详细信息，请参见 <https://github.com/nodejs/LTS/>。

* **icu**: 更新到 56 版本，性能有显著提升 (Steven R. Loomis) [#3281](https://github.com/nodejs/node/pull/3281)
* **node**:
  * 新增 `-c`（或 `--check`）命令行参数，用于在不执行代码的情况下检查脚本语法 (Dave Eddy) [#2411](https://github.com/nodejs/node/pull/2411)
  * 新增 `process.versions.icu` 用于保存当前 ICU 库版本 (Evan Lucas) [#3102](https://github.com/nodejs/node/pull/3102)
  * 新增 `process.release.lts`，用于在二进制文件来自活跃 LTS 发布分支时保存当前 LTS 代号 (Rod Vagg) [#3212](https://github.com/nodejs/node/pull/3212)
* **npm**: 从 2.14.4 升级到 npm 2.14.7，完整细节请参见 [release notes](https://github.com/npm/npm/releases/tag/v2.14.7) (Kat Marchán) [#3299](https://github.com/nodejs/node/pull/3299)

### 已知问题

有关已知问题的完整当前列表，请参见 <https://github.com/nodejs/node/labels/confirmed-bug>。

* 在 `beforeExit` 期间运行的未引用定时器仍有一些问题有待解决。参见 [#1264](https://github.com/nodejs/node/issues/1264)。
* REPL 中的代理项对可能会冻结终端。 [#690](https://github.com/nodejs/node/issues/690)
* 在 DNS 查询进行中调用 `dns.setServers()` 可能会因断言失败导致进程崩溃。 [#894](https://github.com/nodejs/node/issues/894)
* 在两个完整主机之间解析时，`url.resolve` 可能会转移 url 的 auth 部分，参见 [#1435](https://github.com/nodejs/node/issues/1435)。

### 提交

* \[[`8383c4fe00`](https://github.com/nodejs/node/commit/8383c4fe00)] - **assert**: 支持 .throws() 中的箭头函数 (Ben Noordhuis) [#3276](https://github.com/nodejs/node/pull/3276)
* \[[`3eaa593a32`](https://github.com/nodejs/node/commit/3eaa593a32)] - **async\_wrap**: 正确将 parent 传递给 init 回调 (Trevor Norris) [#3216](https://github.com/nodejs/node/pull/3216)
* \[[`54795620f6`](https://github.com/nodejs/node/commit/54795620f6)] - **buffer**: 不要在原型 getter 上中止 (Trevor Norris) [#3302](https://github.com/nodejs/node/pull/3302)
* \[[`660f7591c8`](https://github.com/nodejs/node/commit/660f7591c8)] - **buffer**: FreeCallback 应当与 ArrayBuffer 绑定 (Fedor Indutny) [#3198](https://github.com/nodejs/node/pull/3198)
* \[[`651a5b51eb`](https://github.com/nodejs/node/commit/651a5b51eb)] - **buffer**: 只检查实例是否为 Uint8Array (Trevor Norris) [#3080](https://github.com/nodejs/node/pull/3080)
* \[[`d5a1b1ad7c`](https://github.com/nodejs/node/commit/d5a1b1ad7c)] - **buffer**: 清理 `__proto__` 的使用 (Trevor Norris) [#3080](https://github.com/nodejs/node/pull/3080)
* \[[`af24376e18`](https://github.com/nodejs/node/commit/af24376e18)] - **build**: Intl: deps: 将 ICU 升级到 56.1（GA） (Steven R. Loomis) [#3281](https://github.com/nodejs/node/pull/3281)
* \[[`9136359d57`](https://github.com/nodejs/node/commit/9136359d57)] - **build**: 使 icu 下载路径可自定义 (Johan Bergström) [#3200](https://github.com/nodejs/node/pull/3200)
* \[[`b3c5ad10a8`](https://github.com/nodejs/node/commit/b3c5ad10a8)] - **build**: 添加 --with-arm-fpu 选项 (Jérémy Lal) [#3228](https://github.com/nodejs/node/pull/3228)
* \[[`f00f3268e4`](https://github.com/nodejs/node/commit/f00f3268e4)] - **build**: intl: 避免在 ICU 56 上出现“duplicate main()” (Steven R. Loomis) [#3066](https://github.com/nodejs/node/pull/3066)
* \[[`071c72a6a3`](https://github.com/nodejs/node/commit/071c72a6a3)] - **deps**: 升级到 npm 2.14.7 (Kat Marchán) [#3299](https://github.com/nodejs/node/pull/3299)
* \[[`8b50e95f06`](https://github.com/nodejs/node/commit/8b50e95f06)] - **(SEMVER-MINOR)** **deps**: 从 V8 上游回移 1ee712a (Julien Gilli) [#3036](https://github.com/nodejs/node/pull/3036)
* \[[`747271372f`](https://github.com/nodejs/node/commit/747271372f)] - **doc**: 更新 assert 模块摘要 (David Boivin) [#2799](https://github.com/nodejs/node/pull/2799)
* \[[`0d506556b0`](https://github.com/nodejs/node/commit/0d506556b0)] - **doc**: 将 node-gyp 链接替换为 nodejs/node-gyp (Roman Klauke) [#3320](https://github.com/nodejs/node/pull/3320)
* \[[`40a159e4f4`](https://github.com/nodejs/node/commit/40a159e4f4)] - **doc**: 调整 JavaScript 一词的大小写 (Dave Hodder) [#3285](https://github.com/nodejs/node/pull/3285)
* \[[`6dd34761fd`](https://github.com/nodejs/node/commit/6dd34761fd)] - **doc**: 在 dns.markdown 中添加方法链接 (Alejandro Oviedo) [#3196](https://github.com/nodejs/node/pull/3196)
* \[[`333e8336be`](https://github.com/nodejs/node/commit/333e8336be)] - **doc**: 在 child\_process.markdown 中添加方法链接 (Alejandro Oviedo) [#3186](https://github.com/nodejs/node/pull/3186)
* \[[`0cfc6d39ca`](https://github.com/nodejs/node/commit/0cfc6d39ca)] - **doc**: 建议在 emitter.setMaxListeners 中使用 Infinity (Jason Karns) [#2559](https://github.com/nodejs/node/pull/2559)
* \[[`d4fc6d93ef`](https://github.com/nodejs/node/commit/d4fc6d93ef)] - **doc**: 在 CONTRIBUTING.md 中添加帮助仓库链接 (Doug Shamoo) [#3233](https://github.com/nodejs/node/pull/3233)
* \[[`28aac7f19d`](https://github.com/nodejs/node/commit/28aac7f19d)] - **doc**: 添加 TLS 会话恢复示例 (Roman Reiss) [#3147](https://github.com/nodejs/node/pull/3147)
* \[[`365cf22cce`](https://github.com/nodejs/node/commit/365cf22cce)] - **doc**: 更新 AUTHORS 列表 (Rod Vagg) [#3211](https://github.com/nodejs/node/pull/3211)
* \[[`d4399613b7`](https://github.com/nodejs/node/commit/d4399613b7)] - **doc**: 统一对 userland 的引用 (Martial) [#3192](https://github.com/nodejs/node/pull/3192)
* \[[`75de258376`](https://github.com/nodejs/node/commit/75de258376)] - **doc**: 修复 Buffer 文档中的拼写错误 (Rod Machen) [#3226](https://github.com/nodejs/node/pull/3226)
* \[[`725c7276dd`](https://github.com/nodejs/node/commit/725c7276dd)] - **doc**: 修复 README.md 中指向 joyent/node intl wiki 的链接 (Steven R. Loomis) [#3067](https://github.com/nodejs/node/pull/3067)
* \[[`4a35ba4966`](https://github.com/nodejs/node/commit/4a35ba4966)] - **(SEMVER-MINOR)** **fs**: 在 watch 错误中包含 filename (charlierudolph) [#2748](https://github.com/nodejs/node/pull/2748)
* \[[`2ddbbfd164`](https://github.com/nodejs/node/commit/2ddbbfd164)] - **http**: 在刷新分段响应前进行 cork/uncork (Fedor Indutny) [#3172](https://github.com/nodejs/node/pull/3172)
* \[[`f638402e2f`](https://github.com/nodejs/node/commit/f638402e2f)] - **http**: 在 res/server 中添加关于 `outputSize` 的注释 (Fedor Indutny) [#3128](https://github.com/nodejs/node/pull/3128)
* \[[`1850879b0e`](https://github.com/nodejs/node/commit/1850879b0e)] - **js\_stream**: 如果 isalive 不存在则防止中止 (Trevor Norris) [#3282](https://github.com/nodejs/node/pull/3282)
* \[[`63644dd1cd`](https://github.com/nodejs/node/commit/63644dd1cd)] - **lib**: 删除冗余代码，在 timers.js 中添加测试 (Rich Trott) [#3143](https://github.com/nodejs/node/pull/3143)
* \[[`74f443583c`](https://github.com/nodejs/node/commit/74f443583c)] - **module**: 加载原生 addon 时使用 UNC 路径 (Justin Chase) [#2965](https://github.com/nodejs/node/pull/2965)
* \[[`01cb3fc36b`](https://github.com/nodejs/node/commit/01cb3fc36b)] - **net**: 不要在访问 bytesWritten 时抛出错误 (Trevor Norris) [#3305](https://github.com/nodejs/node/pull/3305)
* \[[`9d65528b01`](https://github.com/nodejs/node/commit/9d65528b01)] - **(SEMVER-MINOR)** **node**: 添加 -c|--check CLI 参数以检查脚本语法 (Dave Eddy) [#2411](https://github.com/nodejs/node/pull/2411)
* \[[`42b936e78d`](https://github.com/nodejs/node/commit/42b936e78d)] - **(SEMVER-MINOR)** **src**: 添加 process.release.lts 属性 (Rod Vagg) [#3212](https://github.com/nodejs/node/pull/3212)
* \[[`589287b2e3`](https://github.com/nodejs/node/commit/589287b2e3)] - **src**: 在搜索前将 BE-utf16-string 转换为 LE (Karl Skomski) [#3295](https://github.com/nodejs/node/pull/3295)
* \[[`2314378f06`](https://github.com/nodejs/node/commit/2314378f06)] - **src**: 修复在 ASYNC\_CALL 中 uv 返回错误时的 u-a-free (Karl Skomski) [#3049](https://github.com/nodejs/node/pull/3049)
* \[[`d99336a391`](https://github.com/nodejs/node/commit/d99336a391)] - **(SEMVER-MINOR)** **src**: 替换 Buffer::IndexOf 中的朴素搜索 (Karl Skomski) [#2539](https://github.com/nodejs/node/pull/2539)
* \[[`546e8333ba`](https://github.com/nodejs/node/commit/546e8333ba)] - **(SEMVER-MINOR)** **src**: 修复 --abort-on-uncaught-exception (Jeremy Whitlock) [#3036](https://github.com/nodejs/node/pull/3036)
* \[[`7271cb047c`](https://github.com/nodejs/node/commit/7271cb047c)] - **(SEMVER-MINOR)** **src**: 添加 process.versions.icu (Evan Lucas) [#3102](https://github.com/nodejs/node/pull/3102)
* \[[`7b9f78acb2`](https://github.com/nodejs/node/commit/7b9f78acb2)] - **stream**: 避免在缓冲写入中因 unpipe 而暂停 (Brian White) [#2325](https://github.com/nodejs/node/pull/2325)
* \[[`f0f8afd879`](https://github.com/nodejs/node/commit/f0f8afd879)] - **test**: 删除 common.inspect() (Rich Trott) [#3257](https://github.com/nodejs/node/pull/3257)
* \[[`5ca4f6f8bd`](https://github.com/nodejs/node/commit/5ca4f6f8bd)] - **test**: 测试 `util` 而不是 `common` (Rich Trott) [#3256](https://github.com/nodejs/node/pull/3256)
* \[[`7a5ae34345`](https://github.com/nodejs/node/commit/7a5ae34345)] - **test**: 在使用管道时刷新临时目录 (Rich Trott) [#3231](https://github.com/nodejs/node/pull/3231)
* \[[`7c85557ef0`](https://github.com/nodejs/node/commit/7c85557ef0)] - **test**: 修复 test-fs-read-stream-fd-leak 竞态条件 (Junliang Yan) [#3218](https://github.com/nodejs/node/pull/3218)
* \[[`26a7ec6960`](https://github.com/nodejs/node/commit/26a7ec6960)] - **test**: 修复丢失原始环境变量的问题 (Junliang Yan) [#3190](https://github.com/nodejs/node/pull/3190)
* \[[`e922716192`](https://github.com/nodejs/node/commit/e922716192)] - **test**: 删除已弃用的错误日志记录 (Rich Trott) [#3079](https://github.com/nodejs/node/pull/3079)
* \[[`8f29d95a8c`](https://github.com/nodejs/node/commit/8f29d95a8c)] - **test**: 在 TapReporter 中报告超时 (Karl Skomski) [#2647](https://github.com/nodejs/node/pull/2647)
* \[[`2d0fe4c657`](https://github.com/nodejs/node/commit/2d0fe4c657)] - **test**: 为 buffer-free-callback 测试添加 lint 检查 (Rich Trott) [#3230](https://github.com/nodejs/node/pull/3230)
* \[[`70c9e4337e`](https://github.com/nodejs/node/commit/70c9e4337e)] - **test**: 通过 lint 规则强制使用 common.js (Rich Trott) [#3157](https://github.com/nodejs/node/pull/3157)
* \[[`b7179562aa`](https://github.com/nodejs/node/commit/b7179562aa)] - **test**: 在所有测试中加载 common.js (Rich Trott) [#3157](https://github.com/nodejs/node/pull/3157)
* \[[`bab555a1c1`](https://github.com/nodejs/node/commit/bab555a1c1)] - **test**: 提升 stringbytes-external 测试速度 (Evan Lucas) [#3005](https://github.com/nodejs/node/pull/3005)
* \[[`ddf258376d`](https://github.com/nodejs/node/commit/ddf258376d)] - **test**: 对 Unicode 路径使用 normalize() (Roman Reiss) [#3007](https://github.com/nodejs/node/pull/3007)
* \[[`46876d519c`](https://github.com/nodejs/node/commit/46876d519c)] - **test**: 移除 arguments.callee 的使用 (Roman Reiss) [#3167](https://github.com/nodejs/node/pull/3167)
* \[[`af10df6108`](https://github.com/nodejs/node/commit/af10df6108)] - **tls**: 使用父句柄的 close 回调 (Fedor Indutny) [#2991](https://github.com/nodejs/node/pull/2991)
* \[[`9c2748bad1`](https://github.com/nodejs/node/commit/9c2748bad1)] - **tools**: 删除残留的许可证模板文本 (Nathan Rajlich) [#3225](https://github.com/nodejs/node/pull/3225)
* \[[`5d9f83ff2a`](https://github.com/nodejs/node/commit/5d9f83ff2a)] - **tools**: 将 lint 检查应用于自定义规则代码 (Rich Trott) [#3195](https://github.com/nodejs/node/pull/3195)
* \[[`18a8b2ec73`](https://github.com/nodejs/node/commit/18a8b2ec73)] - **tools**: 删除未使用的 gflags 模块 (Ben Noordhuis) [#3220](https://github.com/nodejs/node/pull/3220)
* \[[`e0fffca836`](https://github.com/nodejs/node/commit/e0fffca836)] - **util**: 修复对 promise 的检查 (Evan Lucas) [#3221](https://github.com/nodejs/node/pull/3221)
* \[[`8dfdee3733`](https://github.com/nodejs/node/commit/8dfdee3733)] - **util**: 正确检查 Map/Set 迭代器 (Evan Lucas) [#3119](https://github.com/nodejs/node/pull/3119)
* \[[`b5c51fdba0`](https://github.com/nodejs/node/commit/b5c51fdba0)] - **util**: 修复对 Array 构造函数的检查 (Evan Lucas) [#3119](https://github.com/nodejs/node/pull/3119)

<a id="4.1.2"></a>

## 2015-10-05，版本 4.1.2（稳定版），@rvagg

### 重要变更

* **http**：
  * 修复管线处理中的乱序 'finish' 事件 bug，该 bug 可能会中止执行，修复 DoS 漏洞 [CVE-2015-7384](https://github.com/nodejs/node/issues/3138)（Fedor Indutny）[#3128](https://github.com/nodejs/node/pull/3128)
  * 在决定是否暂停 socket 时，考虑待处理的响应数据，而不仅仅是当前请求上的数据（Fedor Indutny）[#3128](https://github.com/nodejs/node/pull/3128)
* **libuv**：从 v1.7.4 升级到 v1.7.5，详情请参见[发行说明](https://github.com/libuv/libuv/releases/tag/v1.7.5)（Saúl Ibarra Corretgé）[#3010](https://github.com/nodejs/node/pull/3010)
  * 为所有 Windows 版本提供更好的 rwlock 实现
  * 改进对 AIX 的支持
* **v8**：
  * 从 v4.5.103.33 升级到 v4.5.103.35（Ali Ijaz Sheikh）[#3117](https://github.com/nodejs/node/pull/3117)
  * 从 v8 上游回移 [f782159](https://codereview.chromium.org/1367123003)，以帮助加快 Promise introspection（Ben Noordhuis）[#3130](https://github.com/nodejs/node/pull/3130)
  * 从 v8 上游回移 [c281c15](https://codereview.chromium.org/1363683002)，以在 post-mortem 元数据中添加 JSTypedArray 长度（Julien Gilli）[#3031](https://github.com/nodejs/node/pull/3031)

### 已知问题

有关已知问题的完整和最新列表，请参见 <https://github.com/nodejs/node/labels/confirmed-bug>。

* `beforeExit` 期间运行的未引用定时器仍有一些问题有待解决。见 [#1264](https://github.com/nodejs/node/issues/1264)。
* REPL 中的代理对可能会冻结终端。[#690](https://github.com/nodejs/node/issues/690)
* 在 DNS 查询进行中调用 `dns.setServers()` 可能会在断言失败时导致进程崩溃。[#894](https://github.com/nodejs/node/issues/894)
* 在两个完整主机之间进行解析时，`url.resolve` 可能会转移 url 的 auth 部分，见 [#1435](https://github.com/nodejs/node/issues/1435)。

### 提交

* \[[`39b8730e8b`](https://github.com/nodejs/node/commit/39b8730e8b)] - **async\_wrap**：确保所有对象都有内部字段（Trevor Norris）[#3139](https://github.com/nodejs/node/pull/3139)
* \[[`99e66074d7`](https://github.com/nodejs/node/commit/99e66074d7)] - **async\_wrap**：更新 providers 并添加测试（Trevor Norris）[#3139](https://github.com/nodejs/node/pull/3139)
* \[[`7a58157d4e`](https://github.com/nodejs/node/commit/7a58157d4e)] - **benchmark**：更新 common.js 中的注释（Minwoo Jung）[#2399](https://github.com/nodejs/node/pull/2399)
* \[[`9e9bfa4dc0`](https://github.com/nodejs/node/commit/9e9bfa4dc0)] - **build**：将 release-urlbase 中的 iojs 改为 nodejs（Minqi Pan）[#3015](https://github.com/nodejs/node/pull/3015)
* \[[`8335ec7191`](https://github.com/nodejs/node/commit/8335ec7191)] - **build**：修复 configure 脚本中的一些拼写错误（Minqi Pan）[#3016](https://github.com/nodejs/node/pull/3016)
* \[[`d6ac547d5d`](https://github.com/nodejs/node/commit/d6ac547d5d)] - **build,win**：修复 node.exe 资源版本（João Reis）[#3053](https://github.com/nodejs/node/pull/3053)
* \[[`798dad24f4`](https://github.com/nodejs/node/commit/798dad24f4)] - **child\_process**：在关闭时将通道句柄设为 `null`（Fedor Indutny）[#3041](https://github.com/nodejs/node/pull/3041)
* \[[`e5615854ea`](https://github.com/nodejs/node/commit/e5615854ea)] - **contextify**：使用 CHECK 而不是 `if`（Oguz Bastemur）[#3125](https://github.com/nodejs/node/pull/3125)
* \[[`f055a66a38`](https://github.com/nodejs/node/commit/f055a66a38)] - **crypto**：仅在配置时启用 FIPS（Fedor Indutny）[#3153](https://github.com/nodejs/node/pull/3153)
* \[[`4c8d96bc30`](https://github.com/nodejs/node/commit/4c8d96bc30)] - **crypto**：在 pbkdf2 中添加更多 keylen 合理性检查（Johann）[#3029](https://github.com/nodejs/node/pull/3029)
* \[[`4c5940776c`](https://github.com/nodejs/node/commit/4c5940776c)] - **deps**：将 libuv 升级到 1.7.5（Saúl Ibarra Corretgé）[#3010](https://github.com/nodejs/node/pull/3010)
* \[[`5a9e795577`](https://github.com/nodejs/node/commit/5a9e795577)] - **deps**：将 V8 升级到 4.5.103.35（Ali Ijaz Sheikh）[#3117](https://github.com/nodejs/node/pull/3117)
* \[[`925b29f959`](https://github.com/nodejs/node/commit/925b29f959)] - **deps**：从 v8 上游回移 f782159（Ben Noordhuis）[#3130](https://github.com/nodejs/node/pull/3130)
* \[[`039f73fa83`](https://github.com/nodejs/node/commit/039f73fa83)] - **deps**：移除并将 .bin 目录加入 gitignore（Ben Noordhuis）[#3004](https://github.com/nodejs/node/pull/3004)
* \[[`5fbb24812d`](https://github.com/nodejs/node/commit/5fbb24812d)] - **deps**：从 V8 上游回移 c281c15（Julien Gilli）[#3031](https://github.com/nodejs/node/pull/3031)
* \[[`6ee5d0f69f`](https://github.com/nodejs/node/commit/6ee5d0f69f)] - **dns**：添加缺失的 exports.BADNAME（Roman Reiss）[#3051](https://github.com/nodejs/node/pull/3051)
* \[[`f92aee7170`](https://github.com/nodejs/node/commit/f92aee7170)] - **doc**：修复 sync 中过时的 'try/catch' 语句（Minwoo Jung）[#3087](https://github.com/nodejs/node/pull/3087)
* \[[`c7161f39e8`](https://github.com/nodejs/node/commit/c7161f39e8)] - **doc**：添加 2015-09-16 的 TSC 会议纪要（Rod Vagg）[#3023](https://github.com/nodejs/node/pull/3023)
* \[[`928166c4a8`](https://github.com/nodejs/node/commit/928166c4a8)] - **doc**：校对 fs.watch() 信息（Rich Trott）[#3097](https://github.com/nodejs/node/pull/3097)
* \[[`75d5dcea76`](https://github.com/nodejs/node/commit/75d5dcea76)] - **doc**：将 jenkins-iojs.nodesource.com 改为 ci.nodejs.org（Michał Gołębiowski）[#2886](https://github.com/nodejs/node/pull/2886)
* \[[`5c3f50b21d`](https://github.com/nodejs/node/commit/5c3f50b21d)] - **doc**：重排 execSync 和 execFileSync（Laurent Fortin）[#2940](https://github.com/nodejs/node/pull/2940)
* \[[`4fc33ac11a`](https://github.com/nodejs/node/commit/4fc33ac11a)] - **doc**：使 execFileSync 与 execFile 保持一致（Laurent Fortin）[#2940](https://github.com/nodejs/node/pull/2940)
* \[[`a366e84b17`](https://github.com/nodejs/node/commit/a366e84b17)] - **doc**：修复 cluster 和 errors 中的拼写错误（reggi）[#3011](https://github.com/nodejs/node/pull/3011)
* \[[`52031e1bf1`](https://github.com/nodejs/node/commit/52031e1bf1)] - **doc**：将 LICENSE 的检查器从 closure-linter 切换到 eslint（Minqi Pan）[#3018](https://github.com/nodejs/node/pull/3018)
* \[[`b28f6a53bc`](https://github.com/nodejs/node/commit/b28f6a53bc)] - **docs**：澄清 assert.doesNotThrow 的行为（Fabio Oliveira）[#2807](https://github.com/nodejs/node/pull/2807)
* \[[`99943e189d`](https://github.com/nodejs/node/commit/99943e189d)] - **http**：修复管线处理中的乱序 'finish' bug（Fedor Indutny）[#3128](https://github.com/nodejs/node/pull/3128)
* \[[`fb7a491d1c`](https://github.com/nodejs/node/commit/fb7a491d1c)] - **http_server**：正确暂停 socket（Fedor Indutny）[#3128](https://github.com/nodejs/node/pull/3128)
* \[[`a0b35bfcf3`](https://github.com/nodejs/node/commit/a0b35bfcf3)] - **i18n**：在 ICU55 中为 bidi 添加调用者到移除列表（Michael Dawson）[#3115](https://github.com/nodejs/node/pull/3115)
* \[[`ac2bce0b0c`](https://github.com/nodejs/node/commit/ac2bce0b0c)] - **path**：提升 posixSplitPath 性能（Evan Lucas）[#3034](https://github.com/nodejs/node/pull/3034)
* \[[`37cdeafa2f`](https://github.com/nodejs/node/commit/37cdeafa2f)] - **smalloc**：移除模块（Brendan Ashworth）[#3099](https://github.com/nodejs/node/pull/3099)
* \[[`5ec5d0aa8b`](https://github.com/nodejs/node/commit/5ec5d0aa8b)] - **src**：将绑定函数属性名内化（Ben Noordhuis）[#3060](https://github.com/nodejs/node/pull/3060)
* \[[`c8175fc2af`](https://github.com/nodejs/node/commit/c8175fc2af)] - **src**：将每个 isolate 的字符串属性内化（Ben Noordhuis）[#3060](https://github.com/nodejs/node/pull/3060)
* \[[`9a593abc47`](https://github.com/nodejs/node/commit/9a593abc47)] - **src**：在 util.h 中包含 signal.h（Cheng Zhao）[#3058](https://github.com/nodejs/node/pull/3058)
* \[[`fde0c6f321`](https://github.com/nodejs/node/commit/fde0c6f321)] - **src**：修复注释中的函数和变量名称（Sakthipriyan Vairamani）[#3039](https://github.com/nodejs/node/pull/3039)
* \[[`1cc7b41ba4`](https://github.com/nodejs/node/commit/1cc7b41ba4)] - **stream\_wrap**：支持空的 `TryWrite`（Fedor Indutny）[#3128](https://github.com/nodejs/node/pull/3128)
* \[[`9faf4c6fcf`](https://github.com/nodejs/node/commit/9faf4c6fcf)] - **test**：加载 common.js 以测试全局泄漏（Rich Trott）[#3095](https://github.com/nodejs/node/pull/3095)
* \[[`0858c86374`](https://github.com/nodejs/node/commit/0858c86374)] - **test**：修复无效的变量名（Sakthipriyan Vairamani）[#3150](https://github.com/nodejs/node/pull/3150)
* \[[`1167171004`](https://github.com/nodejs/node/commit/1167171004)] - **test**：修改对已弃用 util.print() 的调用（Rich Trott）[#3083](https://github.com/nodejs/node/pull/3083)
* \[[`5ada45bf28`](https://github.com/nodejs/node/commit/5ada45bf28)] - **test**：替换已弃用的 util.debug() 调用（Rich Trott）[#3082](https://github.com/nodejs/node/pull/3082)
* \[[`d8ab4e185d`](https://github.com/nodejs/node/commit/d8ab4e185d)] - **util**：优化 Promise introspection（Ben Noordhuis）[#3130](https://github.com/nodejs/node/pull/3130)

<a id="4.1.1"></a>

## 2015-09-22，版本 4.1.1（稳定版），@rvagg

### 重要变更

* **buffer**：修复了 v4.1.0 中引入的一个 bug：分配新的零长度 buffer 可能会导致 JavaScript 中下一个分配的 TypedArray 不是零填充的。在某些情况下，这可能由于重复使用 TypedArray 的内存空间而导致数据泄漏，破坏了通常默认安全的“TypedArray 应始终零填充”的假设。（Trevor Norris）[#2931](https://github.com/nodejs/node/pull/2931)。
* **http**：通过从值中移除换行（`[\r\n]`）字符，防止通过 [`response.addTrailers()`](https://nodejs.org/api/http.html#http_response_addtrailers_headers) 添加的 HTTP 尾部头发生响应拆分。注意，标准头部值中已经会去除换行字符。预期的安全影响较低，因为尾部头很少使用。（Ben Noordhuis）[#2945](https://github.com/nodejs/node/pull/2945)。
* **npm**：从 2.14.3 升级到 npm 2.14.4，完整详情请见[发行说明](https://github.com/npm/npm/releases/tag/v2.14.4)（Kat Marchán）[#2958](https://github.com/nodejs/node/pull/2958)
  * 在多个依赖中升级 `graceful-fs`，不再依赖 monkey-patching `fs`
  * 修复 Node 预发布 / RC 构建中的 `npm link`
* **v8**：更新 post-mortem 元数据，使 post-mortem 调试工具能够查找并检查：
  * 使用字典属性的 JavaScript 对象（Julien Gilli）[#2959](https://github.com/nodejs/node/pull/2959)
  * ScopeInfo，从而包括闭包（Julien Gilli）[#2974](https://github.com/nodejs/node/pull/2974)

### 已知问题

有关已知问题的完整和最新列表，请参见 <https://github.com/nodejs/node/labels/confirmed-bug>。

* `beforeExit` 期间运行的未引用定时器仍有一些问题有待解决。见 [#1264](https://github.com/nodejs/node/issues/1264)。
* REPL 中的代理对可能会冻结终端。[#690](https://github.com/nodejs/node/issues/690)
* 在 DNS 查询进行中调用 `dns.setServers()` 可能会在断言失败时导致进程崩溃。[#894](https://github.com/nodejs/node/issues/894)
* 在两个完整主机之间进行解析时，`url.resolve` 可能会转移 url 的 auth 部分，见 [#1435](https://github.com/nodejs/node/issues/1435)。

### 提交

* \[[`d63e02e08d`](https://github.com/nodejs/node/commit/d63e02e08d)] - **buffer**：不要为零长度 buffer 设置零填充（Trevor Norris）[#2931](https://github.com/nodejs/node/pull/2931)
* \[[`5905b14bff`](https://github.com/nodejs/node/commit/5905b14bff)] - **build**：在 BE 上构建 small-icu 时修复 icutrim（Stewart Addison）[#2602](https://github.com/nodejs/node/pull/2602)
* \[[`f010cb5d96`](https://github.com/nodejs/node/commit/f010cb5d96)] - **configure**：检测 mipsel 主机（Jérémy Lal）[#2971](https://github.com/nodejs/node/pull/2971)
* \[[`b93ad5abbd`](https://github.com/nodejs/node/commit/b93ad5abbd)] - **deps**：从 V8 上游回移 357e6b9（Julien Gilli）[#2974](https://github.com/nodejs/node/pull/2974)
* \[[`8da3da4d41`](https://github.com/nodejs/node/commit/8da3da4d41)] - **deps**：从 V8 上游回移 ff7d70b（Julien Gilli）[#2959](https://github.com/nodejs/node/pull/2959)
* \[[`2600fb8ae6`](https://github.com/nodejs/node/commit/2600fb8ae6)] - **deps**：在 npm 中升级到 node-gyp\@3.0.3（Kat Marchán）[#2958](https://github.com/nodejs/node/pull/2958)
* \[[`793aad2d7a`](https://github.com/nodejs/node/commit/793aad2d7a)] - **deps**：升级到 npm 2.14.4（Kat Marchán）[#2958](https://github.com/nodejs/node/pull/2958)
* \[[`43e2b7f836`](https://github.com/nodejs/node/commit/43e2b7f836)] - **doc**：移除 events.EventEmitter 的使用（Sakthipriyan Vairamani）[#2921](https://github.com/nodejs/node/pull/2921)
* \[[`9c59d2f16a`](https://github.com/nodejs/node/commit/9c59d2f16a)] - **doc**：移除多余的 v8::HandleScope 使用语句（Christopher J. Brody）[#2983](https://github.com/nodejs/node/pull/2983)
* \[[`f7edbab367`](https://github.com/nodejs/node/commit/f7edbab367)] - **doc**：澄清 assert.ifError() 的描述（Rich Trott）[#2941](https://github.com/nodejs/node/pull/2941)
* \[[`b2ddf0f9a2`](https://github.com/nodejs/node/commit/b2ddf0f9a2)] - **doc**：完善 process.kill() 和 exit 的说明（Rich Trott）[#2918](https://github.com/nodejs/node/pull/2918)
* \[[`f68fed2e6f`](https://github.com/nodejs/node/commit/f68fed2e6f)] - **http**：移除 \_deferToConnect 中的冗余代码（Malcolm Ahoy）[#2769](https://github.com/nodejs/node/pull/2769)
* \[[`f542e74c93`](https://github.com/nodejs/node/commit/f542e74c93)] - **http**：防止 trailers 中的响应拆分（Ben Noordhuis）[#2945](https://github.com/nodejs/node/pull/2945)
* \[[`bc9f629387`](https://github.com/nodejs/node/commit/bc9f629387)] - **http\_parser**：在 kOnExecute 期间不要释放分配（Fedor Indutny）[#2956](https://github.com/nodejs/node/pull/2956)
* \[[`1860e0cebd`](https://github.com/nodejs/node/commit/1860e0cebd)] - **lib,src**：移除 events.EventEmitter 的使用（Sakthipriyan Vairamani）[#2921](https://github.com/nodejs/node/pull/2921)
* \[[`d4cd5ac407`](https://github.com/nodejs/node/commit/d4cd5ac407)] - **readline**：修复 tab 补全 bug（Matt Harrison）[#2816](https://github.com/nodejs/node/pull/2816)
* \[[`9760e04839`](https://github.com/nodejs/node/commit/9760e04839)] - **repl**：当 $TERM 设置为 "dumb" 时不要使用 tty 控制码（Salman Aljammaz）[#2712](https://github.com/nodejs/node/pull/2712)
* \[[`cb971cc97d`](https://github.com/nodejs/node/commit/cb971cc97d)] - **repl**：反斜杠 bug 修复（Sakthipriyan Vairamani）[#2968](https://github.com/nodejs/node/pull/2968)
* \[[`2034f68668`](https://github.com/nodejs/node/commit/2034f68668)] - **src**：遵守 --abort\_on\_uncaught\_exception 标志（Evan Lucas）[#2776](https://github.com/nodejs/node/pull/2776)
* \[[`0b1ca4a9ef`](https://github.com/nodejs/node/commit/0b1ca4a9ef)] - **src**：添加 ABORT 宏（Evan Lucas）[#2776](https://github.com/nodejs/node/pull/2776)
* \[[`4519dd00f9`](https://github.com/nodejs/node/commit/4519dd00f9)] - **test**：测试 mkdir 和 rmdir 的同步版本（Sakthipriyan Vairamani）[#2588](https://github.com/nodejs/node/pull/2588)
* \[[`816f609c8b`](https://github.com/nodejs/node/commit/816f609c8b)] - **test**：在 readdir 中使用 tmpDir 而不是 fixtures（Sakthipriyan Vairamani）[#2587](https://github.com/nodejs/node/pull/2587)
* \[[`2084f52585`](https://github.com/nodejs/node/commit/2084f52585)] - **test**：测试更多 http 响应拆分场景（Ben Noordhuis）[#2945](https://github.com/nodejs/node/pull/2945)
* \[[`fa08d1d8a1`](https://github.com/nodejs/node/commit/fa08d1d8a1)] - **test**：添加 test-spawn-cmd-named-pipe（Alexis Campailla）[#2770](https://github.com/nodejs/node/pull/2770)
* \[[`71b5d80682`](https://github.com/nodejs/node/commit/71b5d80682)] - **test**：使 cluster 测试对时间更加宽容（Michael Dawson）[#2891](https://github.com/nodejs/node/pull/2891)
* \[[`3e09dcfc32`](https://github.com/nodejs/node/commit/3e09dcfc32)] - **test**：为 AIX 更新 cwd-enoent 测试（Imran Iqbal）[#2909](https://github.com/nodejs/node/pull/2909)
* \[[`6ea8ec1c59`](https://github.com/nodejs/node/commit/6ea8ec1c59)] - **tools**：单一的跨平台 tick 处理器（Matt Loring）[#2868](https://github.com/nodejs/node/pull/2868)

<a id="4.1.0"></a>

## 2015-09-17，版本 4.1.0（稳定版），@Fishrock123

### 显著变更

* **buffer**:
  * 现在 Buffers 是在 JavaScript 中创建的，而不是 C++ 中。这提高了 buffer 创建速度（Trevor Norris）[#2866](https://github.com/nodejs/node/pull/2866)。
  * `Buffer#slice()` 现在在内部使用 `Uint8Array#subarray()`，提高了 `slice()` 性能（Karl Skomski）[#2777](https://github.com/nodejs/node/pull/2777)。
* **fs**:
  * `fs.utimes()` 现在能正确转换数字字符串、`NaN` 和 `Infinity`（Yazhong Liu）[#2387](https://github.com/nodejs/node/pull/2387)。
  * `fs.WriteStream` 现在实现了 `_writev`，允许进行超高速批量写入（Ron Korving）[#2167](https://github.com/nodejs/node/pull/2167)。
* **http**：修复了在使用 `http.request()` 时，某些 `write()` 大小会导致错误的问题（Fedor Indutny）[#2824](https://github.com/nodejs/node/pull/2824)。
* **npm**：升级到 2.14.3 版本，更多详情请参见 <https://github.com/npm/npm/releases/tag/v2.14.3>（Kat Marchán）[#2822](https://github.com/nodejs/node/pull/2822)。
* **src**：V8 cpu 分析现在不再错误地显示空闲时间（Oleksandr Chekhovskyi）[#2324](https://github.com/nodejs/node/pull/2324)。
* **timers**：`#ref()` 和 `#unref()` 现在会返回它们所属的定时器（Sam Roberts）[#2905](https://github.com/nodejs/node/pull/2905)。
* **v8**：从 4.5.103.30 横向升级到 4.5.103.33，包含一些小修复（Ali Ijaz Sheikh）[#2870](https://github.com/nodejs/node/pull/2870)。
  * 这修复了此前已知的一个 bug：某些计算属性对象简写属性无法正常工作（[#2507](https://github.com/nodejs/node/issues/2507)）。

### 已知问题

有关已知问题的完整且最新列表，请参见 <https://github.com/nodejs/node/labels/confirmed-bug>。

* 仍有一些与在 `beforeExit` 期间运行未引用定时器有关的问题有待解决。参见 [#1264](https://github.com/nodejs/node/issues/1264)。
* REPL 中的代理对可能会冻结终端。[#690](https://github.com/nodejs/node/issues/690)
* 在 DNS 查询进行中时调用 `dns.setServers()`，如果断言失败，可能会导致进程崩溃。[#894](https://github.com/nodejs/node/issues/894)
* `url.resolve` 在两个完整主机之间解析时，可能会转移 url 的 auth 部分，参见 [#1435](https://github.com/nodejs/node/issues/1435)。

### 提交

* \[[`b1abe812cd`](https://github.com/nodejs/node/commit/b1abe812cd)] - 正在处理 4.0.1（Rod Vagg）
* \[[`f9f8378853`](https://github.com/nodejs/node/commit/f9f8378853)] - 2015-09-08，版本 4.0.0（稳定版）发布（Rod Vagg）
* \[[`9683e5df51`](https://github.com/nodejs/node/commit/9683e5df51)] - **bindings**: 在读取模块结构体后关闭（Fedor Indutny）[#2792](https://github.com/nodejs/node/pull/2792)
* \[[`4b4cfa2d44`](https://github.com/nodejs/node/commit/4b4cfa2d44)] - **buffer**: 始终在堆外分配 typed arrays（Trevor Norris）[#2893](https://github.com/nodejs/node/pull/2893)
* \[[`7df018a29b`](https://github.com/nodejs/node/commit/7df018a29b)] - **buffer**: 在 JS 中构造 Uint8Array（Trevor Norris）[#2866](https://github.com/nodejs/node/pull/2866)
* \[[`43397b204e`](https://github.com/nodejs/node/commit/43397b204e)] - **(SEMVER-MINOR)** **build**: 更新以启用 AIX 支持（Michael Dawson）[#2364](https://github.com/nodejs/node/pull/2364)
* \[[`e35b1fd610`](https://github.com/nodejs/node/commit/e35b1fd610)] - **build**: 清理生成的 tap 文件（Sakthipriyan Vairamani）[#2837](https://github.com/nodejs/node/pull/2837)
* \[[`96670ebe37`](https://github.com/nodejs/node/commit/96670ebe37)] - **deps**: 从 v8 上游回移植 6d32be2（Michaël Zasso）[#2916](https://github.com/nodejs/node/pull/2916)
* \[[`94972d5b13`](https://github.com/nodejs/node/commit/94972d5b13)] - **deps**: 从 v8 上游回移植 0d01728（Fedor Indutny）[#2912](https://github.com/nodejs/node/pull/2912)
* \[[`7ebd881c29`](https://github.com/nodejs/node/commit/7ebd881c29)] - **deps**: 将 V8 升级到 4.5.103.33（Ali Ijaz Sheikh）[#2870](https://github.com/nodejs/node/pull/2870)
* \[[`ed47ab6e44`](https://github.com/nodejs/node/commit/ed47ab6e44)] - **deps**: 在 npm 中升级到 node-gyp\@3.0.3（Kat Marchán）[#2822](https://github.com/nodejs/node/pull/2822)
* \[[`f4641ae875`](https://github.com/nodejs/node/commit/f4641ae875)] - **deps**: 升级到 npm 2.14.3（Kat Marchán）[#2822](https://github.com/nodejs/node/pull/2822)
* \[[`8119693a3d`](https://github.com/nodejs/node/commit/8119693a3d)] - **deps**: 将 libuv 更新到 1.7.4 版本（Saúl Ibarra Corretgé）[#2817](https://github.com/nodejs/node/pull/2817)
* \[[`6098504685`](https://github.com/nodejs/node/commit/6098504685)] - **deps**: 从 v8 上游 cherry-pick 6da51b4（Fedor Indutny）[#2801](https://github.com/nodejs/node/pull/2801)
* \[[`bf42cc8dba`](https://github.com/nodejs/node/commit/bf42cc8dba)] - **doc**: process exit 事件不保证会触发（Rich Trott）[#2861](https://github.com/nodejs/node/pull/2861)
* \[[`bb0f869f67`](https://github.com/nodejs/node/commit/bb0f869f67)] - **doc**: 删除 net 文档中对 TCP 的错误引用（Sam Roberts）[#2903](https://github.com/nodejs/node/pull/2903)
* \[[`302d59dce8`](https://github.com/nodejs/node/commit/302d59dce8)] - **doc**: 修正 buffer.slice 参数语法（Sam Roberts）[#2903](https://github.com/nodejs/node/pull/2903)
* \[[`74db9637b7`](https://github.com/nodejs/node/commit/74db9637b7)] - **doc**: 描述 spawn option.detached（Sam Roberts）[#2903](https://github.com/nodejs/node/pull/2903)
* \[[`a7bd897273`](https://github.com/nodejs/node/commit/a7bd897273)] - **doc**: 在 benchmarks 中将 iojs(1) 重命名为 node(1)（Dmitry Vasilyev）[#2884](https://github.com/nodejs/node/pull/2884)
* \[[`cd643d7c37`](https://github.com/nodejs/node/commit/cd643d7c37)] - **doc**: 在 buffer.markdown 中补上缺失的反引号（Sven Slootweg）[#2881](https://github.com/nodejs/node/pull/2881)
* \[[`e8a206e802`](https://github.com/nodejs/node/commit/e8a206e802)] - **doc**: 修复 repl.markdown 中损坏的链接（Danny Nemer）[#2827](https://github.com/nodejs/node/pull/2827)
* \[[`7ee36d61f7`](https://github.com/nodejs/node/commit/7ee36d61f7)] - **doc**: 修复 README 中的拼写错误（Ionică Bizău）[#2852](https://github.com/nodejs/node/pull/2852)
* \[[`4d1ae26196`](https://github.com/nodejs/node/commit/4d1ae26196)] - **doc**: 添加 tunniclm 作为协作者（Mike Tunnicliffe）[#2826](https://github.com/nodejs/node/pull/2826)
* \[[`2d77d03643`](https://github.com/nodejs/node/commit/2d77d03643)] - **doc**: 修复 stream 和 process 中的两个文档错误（Jeremiah Senkpiel）[#2549](https://github.com/nodejs/node/pull/2549)
* \[[`55ac24f721`](https://github.com/nodejs/node/commit/55ac24f721)] - **doc**: 修复 process.markdown 中的 io.js 引用（Tristian Flanagan）[#2846](https://github.com/nodejs/node/pull/2846)
* \[[`cd1297fb57`](https://github.com/nodejs/node/commit/cd1297fb57)] - **doc**: 为保持一致性，使用“Calls”而不是“Executes”（Minwoo Jung）[#2800](https://github.com/nodejs/node/pull/2800)
* \[[`d664b95581`](https://github.com/nodejs/node/commit/d664b95581)] - **doc**: 为保持一致性，使用美式英语（Anne-Gaelle Colom）[#2784](https://github.com/nodejs/node/pull/2784)
* \[[`82ba1839fb`](https://github.com/nodejs/node/commit/82ba1839fb)] - **doc**: 为保持一致性，使用第三人称单数（Anne-Gaelle Colom）[#2765](https://github.com/nodejs/node/pull/2765)
* \[[`432cce6e95`](https://github.com/nodejs/node/commit/432cce6e95)] - **doc**: 描述用于 IPC 的 process API（Sam Roberts）[#1978](https://github.com/nodejs/node/pull/1978)
* \[[`1d75012b9d`](https://github.com/nodejs/node/commit/1d75012b9d)] - **doc**: 修复 Assertion Testing 文档中的逗号拼接错误（Rich Trott）[#2728](https://github.com/nodejs/node/pull/2728)
* \[[`6108ea9bb4`](https://github.com/nodejs/node/commit/6108ea9bb4)] - **fs**: 在 toUnixTimestamp 中考虑 NaN/Infinity（Yazhong Liu）[#2387](https://github.com/nodejs/node/pull/2387)
* \[[`2b6aa9415f`](https://github.com/nodejs/node/commit/2b6aa9415f)] - **(SEMVER-MINOR)** **fs**: 实现 WriteStream#writev（Ron Korving）[#2167](https://github.com/nodejs/node/pull/2167)
* \[[`431bf74c55`](https://github.com/nodejs/node/commit/431bf74c55)] - **http**: 将 Agent.getName 的默认值设为 'localhost'（Malcolm Ahoy）[#2825](https://github.com/nodejs/node/pull/2825)
* \[[`ea15d71c16`](https://github.com/nodejs/node/commit/ea15d71c16)] - **http_server**: 修复 socket 关闭后的恢复（Fedor Indutny）[#2824](https://github.com/nodejs/node/pull/2824)
* \[[`8e5843405b`](https://github.com/nodejs/node/commit/8e5843405b)] - **src**: 将构造函数中的 env_ 字段设为 null（Trevor Norris）[#2913](https://github.com/nodejs/node/pull/2913)
* \[[`0a5f80a11f`](https://github.com/nodejs/node/commit/0a5f80a11f)] - **src**: 为加速在 Buffer#slice() 中使用 subarray()（Karl Skomski）[#2777](https://github.com/nodejs/node/pull/2777)
* \[[`57707e2490`](https://github.com/nodejs/node/commit/57707e2490)] - **src**: 使用 ZCtxt 作为 v8::Isolates 的来源（Roman Klauke）[#2547](https://github.com/nodejs/node/pull/2547)
* \[[`b0df2273ab`](https://github.com/nodejs/node/commit/b0df2273ab)] - **src**: 修复 v8::CpuProfiler 的空闲采样（Oleksandr Chekhovskyi）[#2324](https://github.com/nodejs/node/pull/2324)
* \[[`eaa8e60b91`](https://github.com/nodejs/node/commit/eaa8e60b91)] - **streams**: 将 LazyTransform 重构到 internal/ 中（Brendan Ashworth）[#2566](https://github.com/nodejs/node/pull/2566)
* \[[`648c003e14`](https://github.com/nodejs/node/commit/648c003e14)] - **test**: 在 chdir 测试中使用 tmp 目录（Sakthipriyan Vairamani）[#2589](https://github.com/nodejs/node/pull/2589)
* \[[`079a2173d4`](https://github.com/nodejs/node/commit/079a2173d4)] - **test**: 修复 Buffer OOM 错误消息（Trevor Norris）[#2915](https://github.com/nodejs/node/pull/2915)
* \[[`52019a1b21`](https://github.com/nodejs/node/commit/52019a1b21)] - **test**: 修复附加参数的默认值（Sakthipriyan Vairamani）[#2553](https://github.com/nodejs/node/pull/2553)
* \[[`5df5d0423a`](https://github.com/nodejs/node/commit/5df5d0423a)] - **test**: 移除已禁用的测试（Rich Trott）[#2841](https://github.com/nodejs/node/pull/2841)
* \[[`9e5f0995bd`](https://github.com/nodejs/node/commit/9e5f0995bd)] - **test**: 拆分 internet dns 测试（Rich Trott）[#2802](https://github.com/nodejs/node/pull/2802)
* \[[`41f2dde51a`](https://github.com/nodejs/node/commit/41f2dde51a)] - **test**: 增加 armv6 的 dgram 超时时间（Rich Trott）[#2808](https://github.com/nodejs/node/pull/2808)
* \[[`6e2fe1c21a`](https://github.com/nodejs/node/commit/6e2fe1c21a)] - **test**: 移除 test-dns.js 中的有效主机名检查（Rich Trott）[#2785](https://github.com/nodejs/node/pull/2785)
* \[[`779e14f1a7`](https://github.com/nodejs/node/commit/779e14f1a7)] - **test**: 在 FreeBSD 上为 test_lookup_ipv6_hint 期望错误（Rich Trott）[#2724](https://github.com/nodejs/node/pull/2724)
* \[[`f931b9dd95`](https://github.com/nodejs/node/commit/f931b9dd95)] - **(SEMVER-MINOR)** **timer**: ref/unref 返回自身（Sam Roberts）[#2905](https://github.com/nodejs/node/pull/2905)
* \[[`59d03738cc`](https://github.com/nodejs/node/commit/59d03738cc)] - **tools**: 在 .eslintrc 中启用箭头函数（Sakthipriyan Vairamani）[#2840](https://github.com/nodejs/node/pull/2840)
* \[[`69e7b875a2`](https://github.com/nodejs/node/commit/69e7b875a2)] - **tools**: 以写入二进制模式打开 `test.tap` 文件（Sakthipriyan Vairamani）[#2837](https://github.com/nodejs/node/pull/2837)
* \[[`ff6d30d784`](https://github.com/nodejs/node/commit/ff6d30d784)] - **tools**: 添加缺失的 tick processor polyfill（Matt Loring）[#2694](https://github.com/nodejs/node/pull/2694)
* \[[`519caba021`](https://github.com/nodejs/node/commit/519caba021)] - **tools**: 修复 test-tick-processor 中的不稳定性（Matt Loring）[#2694](https://github.com/nodejs/node/pull/2694)
* \[[`ac004b8555`](https://github.com/nodejs/node/commit/ac004b8555)] - **tools**: 删除 TAP 结果中的连字符（Sakthipriyan Vairamani）[#2718](https://github.com/nodejs/node/pull/2718)
* \[[`ba47511976`](https://github.com/nodejs/node/commit/ba47511976)] - **tsc**: 调整 IBM+StrongLoop 的 TSC 成员资格（James M Snell）[#2858](https://github.com/nodejs/node/pull/2858)
* \[[`e035266805`](https://github.com/nodejs/node/commit/e035266805)] - **win,msi**: 修复文档快捷方式 url（Brian White）[#2781](https://github.com/nodejs/node/pull/2781)

<a id="4.0.0"></a>

## 2015-09-08，版本 4.0.0（稳定版），@rvagg

### 值得注意的变更

此变更列表是相对于上一个 io.js v3.x 分支发布版本 v3.3.0 的。有关从 0.12.x 开始更完整的变更列表，请参阅 v3.x、v2.x 和 v1.x 版本中的值得注意的变更列表。请注意，v3.x 系列中的某些变更以及本次发布中的重大破坏性变更，是 Node.js 和 io.js 项目实现完全收敛所必需的变更。

* **child\_process**: `ChildProcess.prototype.send()` 和 `process.send()` 在所有平台上均异步运行，因此引入了一个可选的回调参数，该回调会在消息发送完成后被调用，即 `.send(message[, sendHandle][, callback])`（Ben Noordhuis）[#2620](https://github.com/nodejs/node/pull/2620)。
* **node**: 将“io.js”代码重命名为“Node.js”（cjihrig）[#2367](https://github.com/nodejs/node/pull/2367)。
* **node-gyp**: 此版本捆绑了更新后的 node-gyp 版本，可与所有版本的 Node.js 和 io.js 一起工作，包括 nightly 和 release candidate 构建。从 io.js v3 和 Node.js v4 开始，它在构建 addon 时只会下载 headers 压缩包，而不是整个源代码。（Rod Vagg）[#2700](https://github.com/nodejs/node/pull/2700)
* **npm**: 从 2.13.3 升级到 2.14.2，包含安全更新，更多细节请参见 <https://github.com/npm/npm/releases/tag/v2.14.2>，（Kat Marchán）[#2696](https://github.com/nodejs/node/pull/2696)。
* **timers**: 通过移植 0.12 实现提升了定时器性能，并进行了少量修复（Jeremiah Senkpiel）[#2540](https://github.com/nodejs/node/pull/2540)，（Julien Gilli）[nodejs/node-v0.x-archive#8751](https://github.com/nodejs/node-v0.x-archive/pull/8751) [nodejs/node-v0.x-archive#8905](https://github.com/nodejs/node-v0.x-archive/pull/8905)
* **util**: `util.is*()` 函数已被弃用，从本次发布开始文档中会出现弃用警告，鼓励用户在 npm registry 中寻找更稳健的替代方案，（Sakthipriyan Vairamani）[#2447](https://github.com/nodejs/node/pull/2447)。
* **v8**: 从 4.4.63.30 升级到 4.5.103.30（Ali Ijaz Sheikh）[#2632](https://github.com/nodejs/node/pull/2632)。
  * 实现新的 `TypedArray` 原型方法：`copyWithin()`、`every()`、`fill()`、`filter()`、`find()`、`findIndex()`、`forEach()`、`indexOf()`、`join()`、`lastIndexOf()`、`map()`、`reduce()`、`reduceRight()`、`reverse()`、`slice()`、`some()`、`sort()`。更多信息请参见 <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray>。
  * 实现新的 `TypedArray.from()` 和 `TypedArray.of()` 函数。更多信息请参见 <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray>。
  * 实现箭头函数，更多信息请参见 <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions>。
  * 完整的 ChangeLog 可见于 <https://github.com/v8/v8-git-mirror/blob/4.5.103/ChangeLog>

### 已知问题

完整且最新的已知问题列表请见 <https://github.com/nodejs/node/labels/confirmed-bug>。

* 当前版本的 V8 未能正确处理某些计算属性简写对象属性的用法。例如，`[{ [prop]: val }]` 会求值为 `[{}]`。[#2507](https://github.com/nodejs/node/issues/2507)
* 在 `beforeExit` 期间运行的未引用定时器仍有一些问题待解决。请参见 [#1264](https://github.com/nodejs/node/issues/1264)。
* REPL 中的代理项对可能会导致终端冻结。[#690](https://github.com/nodejs/node/issues/690)
* 在 DNS 查询进行中调用 `dns.setServers()`，若断言失败，可能导致进程崩溃。[#894](https://github.com/nodejs/node/issues/894)
* `url.resolve` 在两个完整主机之间进行解析时，可能会转移 url 的 auth 部分，见 [#1435](https://github.com/nodejs/node/issues/1435)。

### 提交

* \[[`4f50d3fb90`](https://github.com/nodejs/node/commit/4f50d3fb90)] - **(SEMVER-MAJOR)** 此提交将 process.release.name 的值设为 "node"。（cjihrig）[#2367](https://github.com/nodejs/node/pull/2367)
* \[[`d3178d8b1b`](https://github.com/nodejs/node/commit/d3178d8b1b)] - **buffer**: SlowBuffer 只接受有效的数值（Michaël Zasso）[#2635](https://github.com/nodejs/node/pull/2635)
* \[[`0cb0f4a6e4`](https://github.com/nodejs/node/commit/0cb0f4a6e4)] - **build**: 修复 v8\_enable\_handle\_zapping 覆盖（Karl Skomski）[#2731](https://github.com/nodejs/node/pull/2731)
* \[[`a7596d7efc`](https://github.com/nodejs/node/commit/a7596d7efc)] - **build**: 在单个会话中执行 staging 上的远程命令（Rod Vagg）[#2717](https://github.com/nodejs/node/pull/2717)
* \[[`be427e9efa`](https://github.com/nodejs/node/commit/be427e9efa)] - **build**: 让 .msi 安装到 "nodejs"，而不是 "node"（Rod Vagg）[#2701](https://github.com/nodejs/node/pull/2701)
* \[[`5652ce0dbc`](https://github.com/nodejs/node/commit/5652ce0dbc)] - **build**: 修复 .pkg 创建工具（Rod Vagg）[#2687](https://github.com/nodejs/node/pull/2687)
* \[[`101db80111`](https://github.com/nodejs/node/commit/101db80111)] - **build**: 添加带内置 leakcheck 的 --enable-asan（Karl Skomski）[#2376](https://github.com/nodejs/node/pull/2376)
* \[[`2c3939c9c0`](https://github.com/nodejs/node/commit/2c3939c9c0)] - **child\_process**: 即使 stdio.fd 为 0 也使用它（Evan Lucas）[#2727](https://github.com/nodejs/node/pull/2727)
* \[[`609db5a1dd`](https://github.com/nodejs/node/commit/609db5a1dd)] - **child\_process**: 检查 execFile 和 fork 参数（James M Snell）[#2667](https://github.com/nodejs/node/pull/2667)
* \[[`d010568c23`](https://github.com/nodejs/node/commit/d010568c23)] - **(SEMVER-MAJOR)** **child\_process**: 为 .send() 添加回调参数（Ben Noordhuis）[#2620](https://github.com/nodejs/node/pull/2620)
* \[[`c60857a81a`](https://github.com/nodejs/node/commit/c60857a81a)] - **cluster**: 允许共享复用的 dgram sockets（Fedor Indutny）[#2548](https://github.com/nodejs/node/pull/2548)
* \[[`b2ecbb6191`](https://github.com/nodejs/node/commit/b2ecbb6191)] - **contextify**: 初始化期间忽略 getter（Fedor Indutny）[#2091](https://github.com/nodejs/node/pull/2091)
* \[[`3711934095`](https://github.com/nodejs/node/commit/3711934095)] - **cpplint**: 使其可以在 git 仓库外运行（Ben Noordhuis）[#2710](https://github.com/nodejs/node/pull/2710)
* \[[`03f900ab25`](https://github.com/nodejs/node/commit/03f900ab25)] - **crypto**: 将 rwlocks 替换为简单 mutexes（Ben Noordhuis）[#2723](https://github.com/nodejs/node/pull/2723)
* \[[`847459c29b`](https://github.com/nodejs/node/commit/847459c29b)] - **(SEMVER-MAJOR)** **crypto**: 以十进制和十六进制显示指数（Chad Johnston）[#2320](https://github.com/nodejs/node/pull/2320)
* \[[`e1c976184d`](https://github.com/nodejs/node/commit/e1c976184d)] - **deps**: 提升 v8 中 ArrayBuffer 的性能（Fedor Indutny）[#2732](https://github.com/nodejs/node/pull/2732)
* \[[`cc0ab17a23`](https://github.com/nodejs/node/commit/cc0ab17a23)] - **deps**: 提升 node-gyp v3.0.0（Rod Vagg）[#2700](https://github.com/nodejs/node/pull/2700)
* \[[`b2c3c6d727`](https://github.com/nodejs/node/commit/b2c3c6d727)] - **deps**: 在 npm 测试期间创建 .npmrc（Kat Marchán）[#2696](https://github.com/nodejs/node/pull/2696)
* \[[`babdbfdbd5`](https://github.com/nodejs/node/commit/babdbfdbd5)] - **deps**: 升级到 npm 2.14.2（Kat Marchán）[#2696](https://github.com/nodejs/node/pull/2696)
* \[[`155783d876`](https://github.com/nodejs/node/commit/155783d876)] - **deps**: 回移植来自 v8 上游的 75e43a6（再次）（saper）[#2692](https://github.com/nodejs/node/pull/2692)
* \[[`5424d6fcf0`](https://github.com/nodejs/node/commit/5424d6fcf0)] - **deps**: 将 V8 升级到 4.5.103.30（Ali Ijaz Sheikh）[#2632](https://github.com/nodejs/node/pull/2632)
* \[[`c43172578e`](https://github.com/nodejs/node/commit/c43172578e)] - **(SEMVER-MAJOR)** **deps**: 将 V8 升级到 4.5.103.24（Ali Ijaz Sheikh）[#2509](https://github.com/nodejs/node/pull/2509)
* \[[`714e96e8b9`](https://github.com/nodejs/node/commit/714e96e8b9)] - **deps**: 回移植来自 v8 上游的 75e43a6（saper）[#2636](https://github.com/nodejs/node/pull/2636)
* \[[`8637755cbf`](https://github.com/nodejs/node/commit/8637755cbf)] - **doc**: 添加 2015-09-02 TSC 会议纪要（Rod Vagg）[#2674](https://github.com/nodejs/node/pull/2674)
* \[[`d3d5b93214`](https://github.com/nodejs/node/commit/d3d5b93214)] - **doc**: 更新 manpage 和 --help 中的环境变量（Roman Reiss）[#2690](https://github.com/nodejs/node/pull/2690)
* \[[`29f586ac0a`](https://github.com/nodejs/node/commit/29f586ac0a)] - **doc**: 更新 url 文档以考虑转义（Jeremiah Senkpiel）[#2605](https://github.com/nodejs/node/pull/2605)
* \[[`ba50cfebef`](https://github.com/nodejs/node/commit/ba50cfebef)] - **doc**: 按用户名重新排序协作者（Johan Bergström）[#2322](https://github.com/nodejs/node/pull/2322)
* \[[`8a9a3bf798`](https://github.com/nodejs/node/commit/8a9a3bf798)] - **doc**: 更新 io.js v3.3.0 的 changelog（Rod Vagg）[#2653](https://github.com/nodejs/node/pull/2653)
* \[[`6cd0e2664b`](https://github.com/nodejs/node/commit/6cd0e2664b)] - **doc**: 更新 io.js 参考文档（Ben Noordhuis）[#2580](https://github.com/nodejs/node/pull/2580)
* \[[`f9539c19e8`](https://github.com/nodejs/node/commit/f9539c19e8)] - **doc**: 更新 io.js v3.2.0 的 changelog（Rod Vagg）[#2512](https://github.com/nodejs/node/pull/2512)
* \[[`cded6e7993`](https://github.com/nodejs/node/commit/cded6e7993)] - **doc**: 修复 master 分支上的 CHANGELOG.md（Roman Reiss）[#2513](https://github.com/nodejs/node/pull/2513)
* \[[`93e2830686`](https://github.com/nodejs/node/commit/93e2830686)] - **(SEMVER-MINOR)** **doc**: 记录 util.is* 函数的弃用（Sakthipriyan Vairamani）[#2447](https://github.com/nodejs/node/pull/2447)
* \[[`7038388558`](https://github.com/nodejs/node/commit/7038388558)] - **doc,test**: 在 Windows 中启用递归文件监视（Sakthipriyan Vairamani）[#2649](https://github.com/nodejs/node/pull/2649)
* \[[`f3696f64a1`](https://github.com/nodejs/node/commit/f3696f64a1)] - **events,lib**: 不再需要 EE#listenerCount()（Jeremiah Senkpiel）[#2661](https://github.com/nodejs/node/pull/2661)
* \[[`45a2046f5d`](https://github.com/nodejs/node/commit/45a2046f5d)] - **(SEMVER-MAJOR)** **installer**: 为 node.js 重命名修复安装程序（Frederic Hemberger）[#2367](https://github.com/nodejs/node/pull/2367)
* \[[`7a999a1376`](https://github.com/nodejs/node/commit/7a999a1376)] - **(SEMVER-MAJOR)** **lib**: 添加 net.Socket#localFamily 属性（Ben Noordhuis）[#956](https://github.com/nodejs/node/pull/956)
* \[[`de88255b0f`](https://github.com/nodejs/node/commit/de88255b0f)] - _**Revert**_ "**lib,src**: add unix socket getsockname/getpeername"（Ben Noordhuis）[#2584](https://github.com/nodejs/node/pull/2584)
* \[[`f337595441`](https://github.com/nodejs/node/commit/f337595441)] - **(SEMVER-MAJOR)** **lib,src**: 添加 unix socket getsockname/getpeername（Ben Noordhuis）[#956](https://github.com/nodejs/node/pull/956)
* \[[`3b602527d1`](https://github.com/nodejs/node/commit/3b602527d1)] - **(SEMVER-MAJOR)** **node**: 为 node 重命名进行额外清理（cjihrig）[#2367](https://github.com/nodejs/node/pull/2367)
* \[[`a69ab27ab4`](https://github.com/nodejs/node/commit/a69ab27ab4)] - **(SEMVER-MAJOR)** **node**: 从 io.js 重命名为 node（cjihrig）[#2367](https://github.com/nodejs/node/pull/2367)
* \[[`9358eee9dd`](https://github.com/nodejs/node/commit/9358eee9dd)] - **node-gyp**: 提升到 3.0.1，修复下载 url 的小问题（Rod Vagg）[#2737](https://github.com/nodejs/node/pull/2737)
* \[[`d2d981252b`](https://github.com/nodejs/node/commit/d2d981252b)] - **src**: 在 Windows 上将 process.release.libUrl 的 s/ia32/x86（Rod Vagg）[#2699](https://github.com/nodejs/node/pull/2699)
* \[[`eba3d3dccd`](https://github.com/nodejs/node/commit/eba3d3dccd)] - **src**: 在 windows 上使用符合标准的 snprintf（Karl Skomski）[#2404](https://github.com/nodejs/node/pull/2404)
* \[[`cddbec231f`](https://github.com/nodejs/node/commit/cddbec231f)] - **src**: 修复长异常行的缓冲区溢出（Karl Skomski）[#2404](https://github.com/nodejs/node/pull/2404)
* \[[`dd3f3417c7`](https://github.com/nodejs/node/commit/dd3f3417c7)] - **src**: 重新启用 arm 上的 fast math（Michaël Zasso）[#2592](https://github.com/nodejs/node/pull/2592)
* \[[`e137c1177c`](https://github.com/nodejs/node/commit/e137c1177c)] - **(SEMVER-MAJOR)** **src**: 再次在 arm 上启用 vector ics（Ali Ijaz Sheikh）[#2509](https://github.com/nodejs/node/pull/2509)
* \[[`7ce749d722`](https://github.com/nodejs/node/commit/7ce749d722)] - **src**: 将 v8::Handle 的用法替换为 v8::Local（Michaël Zasso）[#2202](https://github.com/nodejs/node/pull/2202)
* \[[`b1a2d9509f`](https://github.com/nodejs/node/commit/b1a2d9509f)] - **src**: 启用 v8 弃用警告并修复它们（Ben Noordhuis）[#2091](https://github.com/nodejs/node/pull/2091)
* \[[`808de0da03`](https://github.com/nodejs/node/commit/808de0da03)] - **(SEMVER-MAJOR)** **src**: 应用来自 41e63fb 的 debug force load 修复（Ali Ijaz Sheikh）[#2509](https://github.com/nodejs/node/pull/2509)
* \[[`5201cb0ff1`](https://github.com/nodejs/node/commit/5201cb0ff1)] - **src**: 修复 ExternString 中的内存泄漏（Karl Skomski）[#2402](https://github.com/nodejs/node/pull/2402)
* \[[`2308a27c0a`](https://github.com/nodejs/node/commit/2308a27c0a)] - **src**: 仅在 argc > 1 时设置 v8 标志（Evan Lucas）[#2646](https://github.com/nodejs/node/pull/2646)
* \[[`384effed20`](https://github.com/nodejs/node/commit/384effed20)] - **test**: 修复在 require 之前使用 `common` 的问题（Rod Vagg）[#2685](https://github.com/nodejs/node/pull/2685)
* \[[`f146f686b7`](https://github.com/nodejs/node/commit/f146f686b7)] - **(SEMVER-MAJOR)** **test**: 为 V8 4.5 修复 test-repl-tab-complete.js（Ali Ijaz Sheikh）[#2509](https://github.com/nodejs/node/pull/2509)
* \[[`fe4b309fd3`](https://github.com/nodejs/node/commit/fe4b309fd3)] - **test**: 重构以消除不稳定测试（Rich Trott）[#2609](https://github.com/nodejs/node/pull/2609)
* \[[`619721e6b8`](https://github.com/nodejs/node/commit/619721e6b8)] - **test**: 将 eval\_messages 标记为不稳定（Alexis Campailla）[#2648](https://github.com/nodejs/node/pull/2648)
* \[[`93ba585b66`](https://github.com/nodejs/node/commit/93ba585b66)] - **test**: 将 test-vm-syntax-error-stderr 标记为不稳定（João Reis）[#2662](https://github.com/nodejs/node/pull/2662)
* \[[`367140bca0`](https://github.com/nodejs/node/commit/367140bca0)] - **test**: 将 test-repl-persistent-history 标记为不稳定（João Reis）[#2659](https://github.com/nodejs/node/pull/2659)
* \[[`f6b093343d`](https://github.com/nodejs/node/commit/f6b093343d)] - **timers**: 对 `_unrefActive` 的少量修复和改进（Jeremiah Senkpiel）[#2540](https://github.com/nodejs/node/pull/2540)
* \[[`403d7ee7d1`](https://github.com/nodejs/node/commit/403d7ee7d1)] - **timers**: 在迭代 unref 列表时不要修改它（Julien Gilli）[#2540](https://github.com/nodejs/node/pull/2540)
* \[[`7a8c3e08c3`](https://github.com/nodejs/node/commit/7a8c3e08c3)] - **timers**: 避免在 `_unrefActive` 中进行线性扫描。（Julien Gilli）[#2540](https://github.com/nodejs/node/pull/2540)
* \[[`b630ebaf43`](https://github.com/nodejs/node/commit/b630ebaf43)] - **win,msi**: 从旧升级代码升级（João Reis）[#2439](https://github.com/nodejs/node/pull/2439)
