# Node.js 0.12 变更日志

<!--lint disable maximum-line-length no-literal-urls prohibited-strings-->

<table>
<tr>
<th>稳定版</th>
</tr>
<tr>
<td>
<a href="#0.12.18">0.12.18</a><br/>
<a href="#0.12.17">0.12.17</a><br/>
<a href="#0.12.16">0.12.16</a><br/>
<a href="#0.12.15">0.12.15</a><br/>
<a href="#0.12.14">0.12.14</a><br/>
<a href="#0.12.13">0.12.13</a><br/>
<a href="#0.12.12">0.12.12</a><br/>
<a href="#0.12.11">0.12.11</a><br/>
<a href="#0.12.10">0.12.10</a><br/>
<a href="#0.12.9">0.12.9</a><br/>
<a href="#0.12.8">0.12.8</a><br/>
<a href="#0.12.7">0.12.7</a><br/>
<a href="#0.12.6">0.12.6</a><br/>
<a href="#0.12.5">0.12.5</a><br/>
<a href="#0.12.4">0.12.4</a><br/>
<a href="#0.12.3">0.12.3</a><br/>
<a href="#0.12.2">0.12.2</a><br/>
<a href="#0.12.1">0.12.1</a><br/>
<a href="#0.12.0">0.12.0</a><br/>
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
  * [4.x](CHANGELOG_V4.md)
  * [0.10.x](CHANGELOG_V010.md)
  * [io.js](CHANGELOG_IOJS.md)
  * [存档](CHANGELOG_ARCHIVE.md)

_注意_: Node.js v0.12 包含在
[Node.js 长期支持计划](https://github.com/nodejs/LTS) 中，并且
将维护到 2016 年 12 月 31 日。

<a id="0.12.18"></a>

## 2016-12-21，版本 0.12.18（维护版），@rvagg

### 重要变更：

* npm：从 v2.15.1 升级到 v2.15.11，包括修正后的准确许可证（Jeremiah Senkpiel）
* process：`process.versions.ares` 现在输出 c-ares 版本（Johan Bergström）

### 提交：

* \[[`a47fd4549d`](https://github.com/nodejs/node/commit/a47fd4549d)] - build: 添加可用的 lint-ci make 目标（Rod Vagg） <https://github.com/nodejs/node/pull/9151>
* \[[`830584ca59`](https://github.com/nodejs/node/commit/830584ca59)] - deps: 定义缺失的 operator delete 函数（John Barboza） <https://github.com/nodejs/node/pull/10356>
* \[[`c130b31cba`](https://github.com/nodejs/node/commit/c130b31cba)] - deps: 将 npm 升级到 2.15.11（Jeremiah Senkpiel） <https://github.com/nodejs/node/pull/9619>
* \[[`bc6766d847`](https://github.com/nodejs/node/commit/bc6766d847)] - doc: 更新主 LICENSE 文件中的 npm 许可证（Rod Vagg） <https://github.com/nodejs/node/pull/10352>
* \[[`0cdf344c80`](https://github.com/nodejs/node/commit/0cdf344c80)] - (SEMVER-MINOR) process: 将 ares 重新引入 versions（Johan Bergström） <https://github.com/nodejs/node/pull/9191>
* \[[`d8e27ec30a`](https://github.com/nodejs/node/commit/d8e27ec30a)] - test: 将 dgram-multicast-multi-process 标记为不稳定（Rod Vagg） <https://github.com/nodejs/node/pull/9150>
* \[[`c722335ead`](https://github.com/nodejs/node/commit/c722335ead)] - tls: 修复轻微的 jslint 失败（Rod Vagg） <https://github.com/nodejs/node/pull/9107>

<a id="0.12.17"></a>

## 2016-10-18，版本 0.12.17（维护版），@rvagg

这是一个安全发布版本。所有 Node.js 用户都应查阅安全发布摘要 <https://nodejs.org/en/blog/vulnerability/october-2016-security-releases/> 以了解已修补漏洞的详情。

### 重要变更：

* c-ares：修复单字节缓冲区覆盖，CVE-2016-5180，更多信息见 <https://c-ares.haxx.se/adv_20160929.html>（Daniel Stenberg）

### 提交：

* \[[`c5b095ecf8`](https://github.com/nodejs/node/commit/c5b095ecf8)] - deps: 避免单字节缓冲区覆盖（Daniel Stenberg） <https://github.com/nodejs/node/pull/8849>

<a id="0.12.16"></a>

## 2016-09-27，版本 0.12.16（维护版），@rvagg

这是一个安全发布版本。所有 Node.js 用户都应查阅安全发布摘要 <https://nodejs.org/en/blog/vulnerability/september-2016-security-releases/> 以了解已修补漏洞的详情。

### 重要变更：

* buffer：对于使用 `Buffer.concat()` 创建的新 `Buffer` 对象，如果提供的 `totalLength` 参数超过正在拼接的原始 `Buffer` 对象总长度，则对多余字节进行零填充。（Сковорода Никита Андреевич）
* http：
  * CVE-2016-5325 - 正确验证 `ServerResponse#writeHead()` 中 `reason` 参数可接受的字符。这修复了一个可能的响应拆分攻击向量。这引入了一个新的情况：在配置 HTTP 响应时可能会发生 `throw`，用户本来就应该在这里采用 try/catch。最初由 Evan Lucas 和 Romain Gaucher 独立报告。（Evan Lucas）
  * 无效的状态码现在不能再发送。限制为 100 - 999 之间的 3 位数字。缺乏正确验证也可能成为潜在的响应拆分攻击向量。已从 v4.x 回移植。（Brian White）
* openssl：
  * 升级到 1.0.1u，修复影响 Node.js 的若干缺陷：CVE-2016-6304（“OCSP Status Request 扩展无限制内存增长”，高严重性）、CVE-2016-2183、CVE-2016-6303、CVE-2016-2178 和 CVE-2016-6306。
  * 移除对加载动态第三方引擎模块的支持。攻击者可能会伪装成动态引擎模块之一，从而将恶意代码隐藏并在运行时插入 Node.js。最初由 Ahmed Zaki（Skype）报告。（Ben Noordhuis，Rod Vagg）
* tls：CVE-2016-7099 - 修复无效的通配符证书验证检查，其中由于对通配符字符串中的 `*.` 验证不当，TLS 服务器可能会为其主机名提供无效的通配符证书。最初由 Alexander Minozhenko 和 James Bunton（Atlassian）报告。（Ben Noordhuis）

### 提交：

* \[[`38d7258d89`](https://github.com/nodejs/node/commit/38d7258d89)] - buffer: 在 .concat() 中对未初始化字节进行零填充（Сковорода Никита Андреевич） <https://github.com/nodejs/node-private/pull/66>
* \[[`1ba6d16786`](https://github.com/nodejs/node/commit/1ba6d16786)] - build: 打开 -fno-delete-null-pointer-checks（Ben Noordhuis） <https://github.com/nodejs/node/pull/6737>
* \[[`71e4285e27`](https://github.com/nodejs/node/commit/71e4285e27)] - crypto: 不构建硬件引擎（Rod Vagg） <https://github.com/nodejs/node-private/pull/69>
* \[[`b6e0105a66`](https://github.com/nodejs/node/commit/b6e0105a66)] - deps: 为 openssl s_client 添加 -no\_rand\_screen（Shigeki Ohtsu） <https://github.com/nodejs/node-v0.x-archive/pull/25368>
* \[[`1caec97eab`](https://github.com/nodejs/node/commit/1caec97eab)] - deps: 修复 ia32 win32 上的 openssl 汇编错误（Fedor Indutny） <https://github.com/nodejs/node-v0.x-archive/pull/25654>
* \[[`734bc6938b`](https://github.com/nodejs/node/commit/734bc6938b)] - deps: 为 openssl 分离 sha256/sha512-x86\_64.pl（Shigeki Ohtsu） <https://github.com/nodejs/node-v0.x-archive/pull/25654>
* \[[`7cc6d4eb5c`](https://github.com/nodejs/node/commit/7cc6d4eb5c)] - deps: 将所有 openssl 头文件复制到 include 目录（Shigeki Ohtsu） <https://github.com/nodejs/node/pull/8718>
* \[[`4a9da21217`](https://github.com/nodejs/node/commit/4a9da21217)] - deps: 将 openssl 源码升级到 1.0.1u（Shigeki Ohtsu） <https://github.com/nodejs/node/pull/8718>
* \[[`6d977902bd`](https://github.com/nodejs/node/commit/6d977902bd)] - http: 检查 writeHead 中的 reason 字符（Evan Lucas） <https://github.com/nodejs/node-private/pull/47>
* \[[`ad470e496b`](https://github.com/nodejs/node/commit/ad470e496b)] - http: 禁止发送明显无效的状态码（Evan Lucas） <https://github.com/nodejs/node-private/pull/47>
* \[[`9dbde2fc88`](https://github.com/nodejs/node/commit/9dbde2fc88)] - lib: 让 tls.checkServerIdentity() 更严格（Ben Noordhuis） <https://github.com/nodejs/node-private/pull/61>
* \[[`db80592071`](https://github.com/nodejs/node/commit/db80592071)] - openssl: 修复 win32 上应用中的按键要求（Shigeki Ohtsu） <https://github.com/nodejs/node-v0.x-archive/pull/25654>

<a id="0.12.15"></a>

## 2016-06-23，版本 0.12.15（维护版），@rvagg

### 重要变更：

这是一个安全发布版本。所有 Node.js 用户都应查阅安全发布摘要 <https://nodejs.org/en/blog/vulnerability/june-2016-security-releases/> 以了解已修补漏洞的详情。

* libuv：（CVE-2014-9748）修复了 Windows XP 和 Windows 2003 上读/写锁实现中的一个 bug，该 bug 可能导致未定义且潜在不安全的行为。更多信息可见 <https://github.com/libuv/libuv/issues/515> 或 <https://nodejs.org/en/blog/vulnerability/june-2016-security-releases/>。
* V8：（CVE-2016-1669）修复了在 V8 中发现的潜在 Buffer 溢出漏洞，更多详情可见 CVE 页面 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2016-1669> 或 <https://nodejs.org/en/blog/vulnerability/june-2016-security-releases/>。

### 提交：

* \[[`da8501edf6`](https://github.com/nodejs/node/commit/da8501edf6)] - deps: 从 libuv 上游回移植 bd1777fd（Rod Vagg）
* \[[`9207a00f8e`](https://github.com/nodejs/node/commit/9207a00f8e)] - deps: 从 libuv 上游回移植 85adf43e（Rod Vagg）
* \[[`9627f34230`](https://github.com/nodejs/node/commit/9627f34230)] - deps: 从 libuv 上游回移植 98239224（Rod Vagg）
* \[[`5df21b2e36`](https://github.com/nodejs/node/commit/5df21b2e36)] - deps: 从 libuv 上游回移植 9a4fd268（Rod Vagg）
* \[[`e75de35057`](https://github.com/nodejs/node/commit/e75de35057)] - deps: 从 libuv 上游回移植 3eb6764a（Rod Vagg）
* \[[`a113e02f16`](https://github.com/nodejs/node/commit/a113e02f16)] - deps: 从 v8 上游回移植 3a9bfec（Ben Noordhuis）
* \[[`8138055c88`](https://github.com/nodejs/node/commit/8138055c88)] - test: 修复由于证书过期导致的测试失败（Ben Noordhuis） <https://github.com/nodejs/node/pull/7195>

<a id="0.12.14"></a>

## 2016-05-06，版本 0.12.14（维护版），@rvagg

### 重要变更：

* npm：修正 v2.15.1 代码中的错误版本号（Forrest L Norvell） <https://github.com/nodejs/node/pull/5988>
* openssl：升级到 v1.0.1t，解决安全漏洞（Shigeki Ohtsu） <https://github.com/nodejs/node/pull/6553>
  * 修复 CVE-2016-2107 “AES-NI CBC MAC 检查中的填充预言机”
  * 修复 CVE-2016-2105 “EVP\_EncodeUpdate 溢出”
  * 完整详情请参见 <https://nodejs.org/en/blog/vulnerability/openssl-may-2016/>

### 提交：

* \[[`3e99ee1b47`](https://github.com/nodejs/node/commit/3e99ee1b47)] - deps: 在 LTS 中将 npm 完全升级到 2.15.1（Forrest L Norvell） <https://github.com/nodejs/node/pull/5988>
* \[[`2b63396e1f`](https://github.com/nodejs/node/commit/2b63396e1f)] - deps: 为 openssl s_client 添加 -no\_rand\_screen（Shigeki Ohtsu） <https://github.com/joyent/node/pull/25368>
* \[[`f21705df58`](https://github.com/nodejs/node/commit/f21705df58)] - deps: 更新 openssl asm 文件（Shigeki Ohtsu） <https://github.com/nodejs/node/pull/6553>
* \[[`02b6a6bc27`](https://github.com/nodejs/node/commit/02b6a6bc27)] - deps: 修复 ia32 win32 上的 openssl 汇编错误（Fedor Indutny） <https://github.com/joyent/node/pull/25654>
* \[[`1aecc668b0`](https://github.com/nodejs/node/commit/1aecc668b0)] - deps: 为 openssl 分离 sha256/sha512-x86\_64.pl（Shigeki Ohtsu） <https://github.com/joyent/node/pull/25654>
* \[[`39380836a0`](https://github.com/nodejs/node/commit/39380836a0)] - deps: 将所有 openssl 头文件复制到 include 目录（Shigeki Ohtsu） <https://github.com/nodejs/node/pull/6553>
* \[[`08c8ae44a8`](https://github.com/nodejs/node/commit/08c8ae44a8)] - deps: 将 openssl 源码升级到 1.0.1t（Shigeki Ohtsu） <https://github.com/nodejs/node/pull/6553>
* \[[`f5a961ab13`](https://github.com/nodejs/node/commit/f5a961ab13)] - openssl: 修复 win32 上应用中的按键要求（Shigeki Ohtsu） <https://github.com/joyent/node/pull/25654>
* \[[`810fb211a7`](https://github.com/nodejs/node/commit/810fb211a7)] - tools: 移除过时的 npm test-legacy 命令（Kat Marchán） <https://github.com/nodejs/node/pull/5988>

<a id="0.12.13"></a>

## 2016-03-31，版本 0.12.13 (LTS)，@rvagg

### 重要变更

* npm：升级到 v2.15.1。（Forrest L Norvell）
* openssl：OpenSSL v1.0.1s 禁用了 EXPORT 和 LOW 密码套件，因为它们已过时且不被认为安全。此版本的 Node.js 启用了 `OPENSSL_NO_WEAK_SSL_CIPHERS`，以完全禁用这两个列表中包含的 27 个密码套件，这些套件可用于 SSLv3 及更高版本。完整详情可参见我们关于此问题的 LTS 讨论（<https://github.com/nodejs/LTS/issues/85>）。（Shigeki Ohtsu）<https://github.com/nodejs/node/pull/5712>

### 提交

* \[[`4041ea6bc5`](https://github.com/nodejs/node/commit/4041ea6bc5)] - deps：在 LTS 中将 npm 升级到 2.15.1（Forrest L Norvell）
* \[[`a115779026`](https://github.com/nodejs/node/commit/a115779026)] - deps：在 openssl 中禁用 EXPORT 和 LOW 密码套件（Shigeki Ohtsu）<https://github.com/nodejs/node/pull/5712>
* \[[`ab907eb5a8`](https://github.com/nodejs/node/commit/ab907eb5a8)] - test：在 Windows 上跳过 cluster-disconnect-race（Gibson Fahnestock）<https://github.com/nodejs/node/pull/5621>
* \[[`9c06db7444`](https://github.com/nodejs/node/commit/9c06db7444)] - test：修改 tls 测试以不使用 LOW 密码套件（Shigeki Ohtsu）<https://github.com/nodejs/node/pull/5712>
* \[[`154098a3dc`](https://github.com/nodejs/node/commit/154098a3dc)] - test：修复 test-http-get-pipeline-problem.js 的 bp 问题（Michael Dawson）<https://github.com/nodejs/node/pull/3013>
* \[[`ff2bed6e86`](https://github.com/nodejs/node/commit/ff2bed6e86)] - win,build：支持 Visual C++ Build Tools 2015（João Reis）<https://github.com/nodejs/node/pull/5627>

<a id="0.12.12"></a>

## 2016-03-08，版本 0.12.12 (LTS)，@rvagg

### 重要变更：

* openssl：完全移除 SSLv2 支持，`--enable-ssl2` 命令行参数现在将产生错误。DROWN 攻击（<https://drownattack.com/>）会在服务器启用了 SSLv2 时造成漏洞，即使客户端连接并未使用 SSLv2 也是如此。SSLv2 协议普遍被认为存在严重缺陷，不应再被支持。更多信息可见 <https://www.openssl.org/news/vulnerabilities.html#2016-0800>

请注意，Node.js v0.12.11 中升级到 OpenSSL 1.0.1s 已移除了内部 SSLv2 支持。此版本中的更改原本计划用于 v0.12.11。`--enable-ssl2` 命令行参数现在会产生错误，而不再是一个无操作。

### 提交：

* \[[`dbfc9d9241`](https://github.com/nodejs/node/commit/dbfc9d9241)] - crypto,tls：移除 SSLv2 支持（Ben Noordhuis）<https://github.com/nodejs/node/pull/5536>

<a id="0.12.11"></a>

## 2016-03-03，版本 0.12.11 (LTS)，@rvagg

### 重要变更：

* http\_parser：更新到 http-parser 2.3.2，以修复一个对允许的头部字符的非预期严格限制。（James M Snell）<https://github.com/nodejs/node/pull/5241>
* domains：
  * 防止在未设置错误处理器的域中抛出错误时，因抛出异常而退出，而不是在 `process` 对象上触发 `'uncaughtException'` 事件；前提是 `process` 上设置了 `'uncaughtException'` 事件监听器。（Julien Gilli）<https://github.com/nodejs/node/pull/3885>
  * 修复一个问题：当在没有错误处理器的域中抛出错误并使用 `--abort-on-uncaught-exception` 时，进程不会在正确的函数调用中中止。（Julien Gilli）<https://github.com/nodejs/node/pull/3885>
* openssl：从 1.0.1r 升级到 1.0.1s（Ben Noordhuis）<https://github.com/nodejs/node/pull/5509>
  * 修复解析格式错误的 DSA 密钥时的双重释放缺陷，该缺陷可能被用于 DoS 或内存破坏攻击。利用此缺陷进行实际攻击很可能非常困难，因此对 Node.js 用户而言被视为低严重性。更多信息见 <https://www.openssl.org/news/vulnerabilities.html#2016-0705>
  * 修复一个在某些极少见情况下会导致内存破坏的缺陷，相关于内部的 `BN_hex2bn()` 和 `BN_dec2bn()` 函数。据信 Node.js 并不会调用使用这些函数的代码路径，因此通过 Node.js 利用该缺陷进行实际攻击 _不太可能_ 实现。更多信息见 <https://www.openssl.org/news/vulnerabilities.html#2016-0797>
  * 修复一个使 CacheBleed Attack（<https://ssrg.nicta.com.au/projects/TS/cachebleed/>）成为可能的缺陷。该缺陷使攻击者能够执行侧信道攻击，进而可能恢复整把 RSA 私钥。它仅影响使用超线程的 Intel Sandy Bridge（以及可能更早的）微架构。更新的微架构，包括 Haswell，不受影响。更多信息见 <https://www.openssl.org/news/vulnerabilities.html#2016-0702>

### 提交：

* \[[`1ab6653db9`](https://github.com/nodejs/node/commit/1ab6653db9)] - build：在 OSX 安装程序中更新 Node.js 标志（Rod Vagg）<https://github.com/nodejs/node/pull/5401>
* \[[`fcc64792ae`](https://github.com/nodejs/node/commit/fcc64792ae)] - child\_process：防范竞态条件（Rich Trott）<https://github.com/nodejs/node/pull/5153>
* \[[`6c468df9af`](https://github.com/nodejs/node/commit/6c468df9af)] - child\_process：修复 readable 事件导致的数据丢失（Brian White）<https://github.com/nodejs/node/pull/5037>
* \[[`61a22019c2`](https://github.com/nodejs/node/commit/61a22019c2)] - deps：将 openssl 升级到 1.0.1s（Ben Noordhuis）<https://github.com/nodejs/node/pull/5509>
* \[[`fa26b13df7`](https://github.com/nodejs/node/commit/fa26b13df7)] - deps：更新到 http-parser 2.3.2（James M Snell）<https://github.com/nodejs/node/pull/5241>
* \[[`46c8e2165f`](https://github.com/nodejs/node/commit/46c8e2165f)] - deps：从 v8 的上游回移 1f8555（Trevor Norris）<https://github.com/nodejs/node/pull/3945>
* \[[`ce58c2c31a`](https://github.com/nodejs/node/commit/ce58c2c31a)] - doc：移除 SSLv2 描述（Shigeki Ohtsu）<https://github.com/nodejs/node/pull/5541>
* \[[`018e4e0b1a`](https://github.com/nodejs/node/commit/018e4e0b1a)] - domains：修复对未捕获异常的处理（Julien Gilli）<https://github.com/nodejs/node/pull/3885>
* \[[`d421e85dc9`](https://github.com/nodejs/node/commit/d421e85dc9)] - lib：修复 cluster 句柄泄漏（Rich Trott）<https://github.com/nodejs/node/pull/5152>
* \[[`3a48f0022f`](https://github.com/nodejs/node/commit/3a48f0022f)] - node：修复 Context 句柄泄漏（Trevor Norris）<https://github.com/nodejs/node/pull/3945>
* \[[`28dddabf6a`](https://github.com/nodejs/node/commit/28dddabf6a)] - src：修复在没有 OpenSSL 支持时的构建错误（Jörg Krause）<https://github.com/nodejs/node/pull/4201>
* \[[`a79baf03cd`](https://github.com/nodejs/node/commit/a79baf03cd)] - src：使用全局 SealHandleScope（Trevor Norris）<https://github.com/nodejs/node/pull/3945>
* \[[`be39f30447`](https://github.com/nodejs/node/commit/be39f30447)] - test：重新加入 test-domain-exit-dispose-again（Julien Gilli）<https://github.com/nodejs/node/pull/4278>
* \[[`da66166b9a`](https://github.com/nodejs/node/commit/da66166b9a)] - test：修复 test-domain-exit-dispose-again（Julien Gilli）<https://github.com/nodejs/node/pull/3991>

<a id="0.12.10"></a>

## 2016-02-09，版本 0.12.10 (LTS)，@jasnell

这是一个重要的安全更新。所有 Node.js 用户都应查看 nodejs.org 上的安全发布摘要，以了解已修补漏洞的详情。

### 重要变更

* http：修复 HTTP 请求和响应头解析中的缺陷，这些缺陷可能导致请求走私（CVE-2016-2086）或响应拆分（CVE-2016-2216）。HTTP 头解析现在与 HTTP 规范更加一致，包括对可接受字符的限制。
* http-parser：从 2.3.0 升级到 2.3.1
* openssl：从 1.0.1q 升级到 1.0.1r。为缓解 Logjam 攻击，TLS 客户端现在会拒绝参数长度短于 1024 位的 Diffie-Hellman 握手，而此前的限制是 768 位。
* src：
  * 引入新的命令行标志 `--security-revert={cvenum}`，用于选择性回退特定 CVE 修复
  * 允许使用 `--security-revert=CVE-2016-2216` 有选择地回退 CVE-2016-2216 的修复
* build：
  * 从 v0.12.10 开始，xz 压缩的 tar 文件将可从 nodejs.org 获取，用于 v0.12 构建
  * 从 v0.12.10 开始，headers.tar.gz 文件将可从 nodejs.org 获取，用于 v0.12 构建，未来需要对 node-gyp 进行更改才能使用这些文件

### 提交

* \[[`4312848bff`](https://github.com/nodejs/node/commit/4312848bff)] - build：在可能的情况下启用 xz 压缩的 tar 包（Rod Vagg）<https://github.com/nodejs/node/pull/4894>
* \[[`247626245c`](https://github.com/nodejs/node/commit/247626245c)] - deps：将 openssl 源码升级到 1.0.1r（Shigeki Ohtsu）<https://github.com/joyent/node/pull/25368>
* \[[`744c9749fc`](https://github.com/nodejs/node/commit/744c9749fc)] - deps：将 http-parser 更新到 2.3.1 版本（James M Snell）
* \[[`d1c56ec7d1`](https://github.com/nodejs/node/commit/d1c56ec7d1)] - doc：澄清 v0.12.9 的重要条目（Rod Vagg）<https://github.com/nodejs/node/pull/4154>
* \[[`e128d9a5b4`](https://github.com/nodejs/node/commit/e128d9a5b4)] - http：严格禁止头部中的无效字符（James M Snell）
* \[[`bdb9f2cf89`](https://github.com/nodejs/node/commit/bdb9f2cf89)] - src：避免 node\_revert.cc 中的编译器警告（James M Snell）
* \[[`23bced1fb3`](https://github.com/nodejs/node/commit/23bced1fb3)] - src：添加 --security-revert 命令行标志（James M Snell）
* \[[`f41a3c73e7`](https://github.com/nodejs/node/commit/f41a3c73e7)] - tools：回移用于 headers 的 tools/install.py（Richard Lau）<https://github.com/nodejs/node/pull/4149>

<a id="0.12.9"></a>

## 2015-12-04，版本 0.12.9 (LTS)，@rvagg

安全更新

### 重要变更

* http：修复 CVE-2015-8027，一个漏洞：HTTP socket 可能不再关联解析器，但流水线请求会尝试在不存在的解析器上触发暂停或恢复，从而可能导致拒绝服务漏洞。（Fedor Indutny）
* openssl：升级到 1.0.1q，修复 CVE-2015-3194“缺少 PSS 参数时证书验证崩溃”，这可能成为使用客户端证书认证的 Node.js TLS 服务器的潜在拒绝服务入口；TLS 客户端也会受到影响。详情见 <http://openssl.org/news/secadv/20151203.txt>。（Ben Noordhuis）<https://github.com/nodejs/node/pull/4133>

### 提交

* \[[`8d24a14f2c`](https://github.com/nodejs/node/commit/8d24a14f2c)] - deps：升级到 openssl 1.0.1q（Ben Noordhuis）<https://github.com/nodejs/node/pull/4133>
* \[[`dfc6f4a9af`](https://github.com/nodejs/node/commit/dfc6f4a9af)] - http：修复流水线回归问题（Fedor Indutny）

<a id="0.12.8"></a>

## 2015.11.25，版本 0.12.8（LTS），@rvagg

### 提交

* \[[`d9399569bd`](https://github.com/nodejs/node/commit/d9399569bd)] - build: 回移植 tools/release.sh (Rod Vagg) <https://github.com/nodejs/node/pull/3642>
* \[[`78c5b4c8bd`](https://github.com/nodejs/node/commit/78c5b4c8bd)] - build: 为新的 CI 基础设施回移植配置 (Rod Vagg) <https://github.com/nodejs/node/pull/3642>
* \[[`83441616a5`](https://github.com/nodejs/node/commit/83441616a5)] - build: 修复 --without-ssl 编译时错误 (Ben Noordhuis) <https://github.com/nodejs/node/pull/3825>
* \[[`8887666b0b`](https://github.com/nodejs/node/commit/8887666b0b)] - build: 更新清单以包含 Windows 10 (Lucien Greathouse) <https://github.com/nodejs/node/pull/2843>
* \[[`08afe4ec8e`](https://github.com/nodejs/node/commit/08afe4ec8e)] - build: 添加 MSVS 2015 支持 (Rod Vagg) <https://github.com/nodejs/node/pull/2843>
* \[[`4f2456369c`](https://github.com/nodejs/node/commit/4f2456369c)] - build: 规避 ICU <56 中的 VS2015 问题 (Steven R. Loomis) <https://github.com/nodejs/node-v0.x-archive/pull/25804>
* \[[`15030f26fd`](https://github.com/nodejs/node/commit/15030f26fd)] - build: Intl: 将 ICU4C 从 54 升级到 55（回移植）(Steven R. Loomis) <https://github.com/nodejs/node-v0.x-archive/pull/25856>
* \[[`1083fa70f0`](https://github.com/nodejs/node/commit/1083fa70f0)] - build: run-ci makefile 规则 (Alexis Campailla) <https://github.com/nodejs/node-v0.x-archive/pull/25653>
* \[[`2d2494cf14`](https://github.com/nodejs/node/commit/2d2494cf14)] - build: 在 test-ci 中支持易失败测试 (Alexis Campailla) <https://github.com/nodejs/node-v0.x-archive/pull/25653>
* \[[`b25d26f2ef`](https://github.com/nodejs/node/commit/b25d26f2ef)] - build: 通过 test-ci 支持 Jenkins (Alexis Campailla) <https://github.com/nodejs/node-v0.x-archive/pull/25653>
* \[[`7e4b47f38a`](https://github.com/nodejs/node/commit/7e4b47f38a)] - build,win: 修复 node.exe 资源版本 (João Reis) <https://github.com/nodejs/node/pull/3053>
* \[[`e07c86e240`](https://github.com/nodejs/node/commit/e07c86e240)] - build,win: 失败时尝试下一个 MSVS 版本 (João Reis) <https://github.com/nodejs/node/pull/2843>
* \[[`b5a0abcfdf`](https://github.com/nodejs/node/commit/b5a0abcfdf)] - child\_process: 克隆 spawn 选项参数 (cjihrig) <https://github.com/nodejs/node-v0.x-archive/pull/9159>
* \[[`8b81f98c41`](https://github.com/nodejs/node/commit/8b81f98c41)] - configure: 添加 --without-mdb 标志 (cgalibern) <https://github.com/nodejs/node-v0.x-archive/pull/25707>
* \[[`071c860c2b`](https://github.com/nodejs/node/commit/071c860c2b)] - crypto: 用简单互斥锁替换读写锁 (Ben Noordhuis) <https://github.com/nodejs/node/pull/2723>
* \[[`ca97fb6be3`](https://github.com/nodejs/node/commit/ca97fb6be3)] - deps: 将 npm 升级到 2.14.9 (Forrest L Norvell) <https://github.com/nodejs/node/pull/3684>
* \[[`583734342e`](https://github.com/nodejs/node/commit/583734342e)] - deps: 修复用于 MSVS 2015 的 openssl (Andy Polyakov) <https://github.com/nodejs/node/pull/2843>
* \[[`02c262a4c6`](https://github.com/nodejs/node/commit/02c262a4c6)] - deps: 修复 gyp 以在没有 XCode 的 MacOSX 上运行 (Shigeki Ohtsu) <https://github.com/nodejs/node/pull/2843>
* \[[`f0fba0bce8`](https://github.com/nodejs/node/commit/f0fba0bce8)] - deps: 将 gyp 更新到 25ed9ac (João Reis) <https://github.com/nodejs/node/pull/2843>
* \[[`f693565813`](https://github.com/nodejs/node/commit/f693565813)] - deps: 升级到 npm 2.13.4 (Kat Marchán) <https://github.com/nodejs/node-v0.x-archive/pull/25825>
* \[[`618b142679`](https://github.com/nodejs/node/commit/618b142679)] - deps,v8: 修复 VS2015 中的编译 (João Reis) <https://github.com/nodejs/node/pull/2843>
* \[[`49b4f0d54e`](https://github.com/nodejs/node/commit/49b4f0d54e)] - doc: 回移植 README.md (Rod Vagg) <https://github.com/nodejs/node/pull/3642>
* \[[`2860c53562`](https://github.com/nodejs/node/commit/2860c53562)] - doc: 修复 child\_process.exec 文档 (Tyler Anton) <https://github.com/nodejs/node-v0.x-archive/pull/14088>
* \[[`4a91fa11a3`](https://github.com/nodejs/node/commit/4a91fa11a3)] - doc: 更新 os.platform() 的文档 (George Kotchlamazashvili) <https://github.com/nodejs/node-v0.x-archive/pull/25777>
* \[[`b03ab02fe8`](https://github.com/nodejs/node/commit/b03ab02fe8)] - doc: 将 v8 文档链接改为 v8dox.com (Chad Walker) <https://github.com/nodejs/node-v0.x-archive/pull/25811>
* \[[`1fd8f37efd`](https://github.com/nodejs/node/commit/1fd8f37efd)] - doc: buffer，补上缺失的反引号 (Dyana Rose) <https://github.com/nodejs/node-v0.x-archive/pull/25811>
* \[[`162d0db3bb`](https://github.com/nodejs/node/commit/162d0db3bb)] - doc: tls.markdown，将版本从 v0.10.39 调整为 v0.10.x (James M Snell) <https://github.com/nodejs/node-v0.x-archive/pull/25591>
* \[[`eda2560cdc`](https://github.com/nodejs/node/commit/eda2560cdc)] - doc: 对 readable 事件进一步完善 (James M Snell) <https://github.com/nodejs/node-v0.x-archive/pull/25591>
* \[[`881d9bea01`](https://github.com/nodejs/node/commit/881d9bea01)] - doc: readable 事件说明澄清 (James M Snell) <https://github.com/nodejs/node-v0.x-archive/pull/25591>
* \[[`b6378f0c75`](https://github.com/nodejs/node/commit/b6378f0c75)] - doc: stream.unshift 不会重置读取状态 (James M Snell) <https://github.com/nodejs/node-v0.x-archive/pull/25591>

<a id="0.12.7"></a>

## 2015-07-09，版本 0.12.7（Stable）

### 提交

* \[[`0cf9f27703`](https://github.com/nodejs/node/commit/0cf9f27703)] - **deps**: 将 openssl 源码升级到 1.0.1p [#25654](https://github.com/joyent/node/pull/25654)
* \[[`8917e430b8`](https://github.com/nodejs/node/commit/8917e430b8)] - **deps**: 升级到 npm 2.11.3 [#25545](https://github.com/joyent/node/pull/25545)
* \[[`88a27a9621`](https://github.com/nodejs/node/commit/88a27a9621)] - **V8**: 从上游 cherry-pick JitCodeEvent 补丁 (Ben Noordhuis) [#25589](https://github.com/joyent/node/pull/25589)
* \[[`18d413d299`](https://github.com/nodejs/node/commit/18d413d299)] - **win,msi**: 在 AppData 目录中创建 npm 文件夹 (Steven Rockarts) [#8838](https://github.com/joyent/node/pull/8838)

<a id="0.12.6"></a>

## 2015-07-03，版本 0.12.6（Stable）

### 重要变更

* **deps**: 修复 utf8 解码器中的带外写入。**这是一个重要的安全更新**，因为它可被用于发起拒绝服务攻击。

### 提交

* \[[`78b0e30954`](https://github.com/nodejs/node/commit/78b0e30954)] - **deps**: 修复 utf8 解码器中的带外写入 (Fedor Indutny)

<a id="0.12.5"></a>

## 2015-06-22，版本 0.12.5（Stable）

### 提交

* \[[`456c22f63f`](https://github.com/nodejs/node/commit/456c22f63f)] - **openssl**: 升级到 1.0.1o（修复多个 CVE）[#25523](https://github.com/joyent/node/pull/25523)
* \[[`20d8db1a42`](https://github.com/nodejs/node/commit/20d8db1a42)] - **npm**: 升级到 2.11.2 [#25517](https://github.com/joyent/node/pull/25517)
* \[[`50f961596d`](https://github.com/nodejs/node/commit/50f961596d)] - **uv**: 升级到 1.6.1 [#25475](https://github.com/joyent/node/pull/25475)
* \[[`b81a643f9a`](https://github.com/nodejs/node/commit/b81a643f9a)] - **V8**: 在 profiling 激活时避免死锁 (Dmitri Melikyan) [#25309](https://github.com/joyent/node/pull/25309)
* \[[`9d19dfbfdb`](https://github.com/nodejs/node/commit/9d19dfbfdb)] - **install**: 修复 openssl 头文件的源路径 (Oguz Bastemur) [#14089](https://github.com/joyent/node/pull/14089)
* \[[`4028669531`](https://github.com/nodejs/node/commit/4028669531)] - **install**: 确保 opensslconf.h 会被覆盖 (Oguz Bastemur) [#14089](https://github.com/joyent/node/pull/14089)
* \[[`d38e865fce`](https://github.com/nodejs/node/commit/d38e865fce)] - **timers**: 修复在定时器回调中添加时的超时问题 (Julien Gilli) [#17203](https://github.com/joyent/node/pull/17203)
* \[[`e7c84f82c7`](https://github.com/nodejs/node/commit/e7c84f82c7)] - **windows**: 安装后广播 WM\_SETTINGCHANGE (Mathias Küsel) [#25100](https://github.com/joyent/node/pull/25100)

<a id="0.12.4"></a>

## 2015-05-22，版本 0.12.4（Stable）

### 提交

* \[[`202c18bbc3`](https://github.com/nodejs/node/commit/202c18bbc3)] - **npm**: 升级到 2.10.1 [#25364](https://github.com/joyent/node/pull/25364)
* \[[`6157697bd5`](https://github.com/nodejs/node/commit/6157697bd5)] - **V8**: 恢复被移除的 v8 Array.prototype.values() (cjihrig) [#25328](https://github.com/joyent/node/pull/25328)
* \[[`3122052890`](https://github.com/nodejs/node/commit/3122052890)] - **win**: 恢复对 xp/2k3 的支持 (Bert Belder) [#25367](https://github.com/joyent/node/pull/25367)

<a id="0.12.3"></a>

## 2015-05-13，版本 0.12.3（Stable）

### 提交

* \[[`32166a90cf`](https://github.com/nodejs/node/commit/32166a90cf)] - **V8**: 更新到 3.28.71.19 [#18206](https://github.com/joyent/node/pull/18206)
* \[[`84f1ab6114`](https://github.com/nodejs/node/commit/84f1ab6114)] - **uv**: 升级到 1.5.0 [#25141](https://github.com/joyent/node/pull/25141)
* \[[`03cfbd65fb`](https://github.com/nodejs/node/commit/03cfbd65fb)] - **npm**: 升级到 2.9.1 [#25289](https://github.com/joyent/node/pull/25289)
* \[[`80cdae855f`](https://github.com/nodejs/node/commit/80cdae855f)] - **V8**: 不要在 v8 cpu profiler 线程中忙循环 (Mike Tunnicliffe) [#25268](https://github.com/joyent/node/pull/25268)
* \[[`2a5f4bd7ce`](https://github.com/nodejs/node/commit/2a5f4bd7ce)] - **V8**: 修复 for 循环中 let 绑定的问题 (adamk) [#23948](https://github.com/joyent/node/pull/23948)
* \[[`f0ef597e09`](https://github.com/nodejs/node/commit/f0ef597e09)] - **debugger**: 远程模式下不要启动子进程 (Jackson Tian) [#14172](https://github.com/joyent/node/pull/14172)
* \[[`0e392f3b68`](https://github.com/nodejs/node/commit/0e392f3b68)] - **net**: 不要在 FreeBSD 上设置 V4MAPPED (Julien Gilli) [#18204](https://github.com/joyent/node/pull/18204)
* \[[`101e103e3b`](https://github.com/nodejs/node/commit/101e103e3b)] - **repl**: 使“Unexpected token”错误可恢复 (Julien Gilli) [#8875](https://github.com/joyent/node/pull/8875)
* \[[`d5b32246fb`](https://github.com/nodejs/node/commit/d5b32246fb)] - **src**: 回移植在关闭竞态中忽略 ENOTCONN (Ben Noordhuis) [#14480](https://github.com/joyent/node/pull/14480)
* \[[`f99eaefe75`](https://github.com/nodejs/node/commit/f99eaefe75)] - **src**: 修复 FreeBSD 上 SIGINT 崩溃修复的回移植 (Julien Gilli) [#14819](https://github.com/joyent/node/pull/14819)

<a id="0.12.2"></a>

## 2015-03-31，版本 0.12.2（稳定版）

### 提交

* \[[`7a37910f25`](https://github.com/nodejs/node/commit/7a37910f25)] - **uv**: 升级到 1.4.2 [#9179](https://github.com/joyent/node/pull/9179)
* \[[`2704c62933`](https://github.com/nodejs/node/commit/2704c62933)] - **npm**: 升级到 2.7.4 [#14180](https://github.com/joyent/node/pull/14180)
* \[[`a103712a62`](https://github.com/nodejs/node/commit/a103712a62)] - **V8**: 不要在日志文件中添加额外的换行符 (Julien Gilli)
* \[[`2fc5eeb3da`](https://github.com/nodejs/node/commit/2fc5eeb3da)] - **V8**: 修复 --max\_old\_space\_size=4096 整数溢出 (Andrei Sedoi) [#9200](https://github.com/joyent/node/pull/9200)
* \[[`605329d7f7`](https://github.com/nodejs/node/commit/605329d7f7)] - **asyncwrap**: 修复早期返回的构造函数条件 (Trevor Norris) [#9146](https://github.com/joyent/node/pull/9146)
* \[[`a33f23cbbc`](https://github.com/nodejs/node/commit/a33f23cbbc)] - **buffer**: 将块按 8 字节边界对齐 (Fedor Indutny) [#9375](https://github.com/joyent/node/pull/9375)
* \[[`a35ba2f67d`](https://github.com/nodejs/node/commit/a35ba2f67d)] - **buffer**: 修复池偏移量调整 (Trevor Norris)
* \[[`c0766eb1a4`](https://github.com/nodejs/node/commit/c0766eb1a4)] - **build**: 修复 strict aliasing 的使用 (Trevor Norris) [#9179](https://github.com/joyent/node/pull/9179)
* \[[`6c3647c38d`](https://github.com/nodejs/node/commit/6c3647c38d)] - **console**: 允许将 Object.prototype 字段作为标签 (Colin Ihrig) [#9116](https://github.com/joyent/node/pull/9116)
* \[[`4823afcbe2`](https://github.com/nodejs/node/commit/4823afcbe2)] - **fs**: 使 F\_OK/R\_OK/W\_OK/X\_OK 不可写 (Jackson Tian) [#9060](https://github.com/joyent/node/pull/9060)
* \[[`b3aa876f08`](https://github.com/nodejs/node/commit/b3aa876f08)] - **fs**: 正确处理传递给 truncate() 的 fd (Bruno Jouhier) [#9161](https://github.com/joyent/node/pull/9161)
* \[[`d6484f3f7b`](https://github.com/nodejs/node/commit/d6484f3f7b)] - **http**: 修复 socket 错误后对 data/end 的断言 (Fedor Indutny) [#14087](https://github.com/joyent/node/pull/14087)
* \[[`04b63e022a`](https://github.com/nodejs/node/commit/04b63e022a)] - **lib**: 修复 Buffer 构造函数中的最大大小检查 (Ben Noordhuis) [#657](https://github.com/iojs/io.js/pull/657)
* \[[`2411bea0df`](https://github.com/nodejs/node/commit/2411bea0df)] - **lib**: 修复 stdio/ipc 同步 i/o 回归问题 (Ben Noordhuis) [#9179](https://github.com/joyent/node/pull/9179)
* \[[`b8604fa480`](https://github.com/nodejs/node/commit/b8604fa480)] - **module**: 替换 NativeModule.require (Herbert Vojčík) [#9201](https://github.com/joyent/node/pull/9201)
* \[[`1a2a4dac23`](https://github.com/nodejs/node/commit/1a2a4dac23)] - **net**: 在 connect() 中允许端口 0 (cjihrig) [#9268](https://github.com/joyent/node/pull/9268)
* \[[`bada87bd66`](https://github.com/nodejs/node/commit/bada87bd66)] - **net**: 取消父套接字中的定时器引用 (Fedor Indutny) [#891](https://github.com/iojs/io.js/pull/891)
* \[[`c66f8c21f0`](https://github.com/nodejs/node/commit/c66f8c21f0)] - **path**: 为性能和一致性进行重构 (Nathan Woltman) [#9289](https://github.com/joyent/node/pull/9289)
* \[[`9deade4322`](https://github.com/nodejs/node/commit/9deade4322)] - **smalloc**: 扩展用户 API (Trevor Norris) [#905](https://github.com/iojs/io.js/pull/905)
* \[[`61fe1fe21b`](https://github.com/nodejs/node/commit/61fe1fe21b)] - **src**: 修复 FreeBSD 上的 SIGINT 崩溃 (Fedor Indutny) [#14184](https://github.com/joyent/node/pull/14184)
* \[[`b233131901`](https://github.com/nodejs/node/commit/b233131901)] - **src**: 修复在 --use-strict 下内置模块失败的问题 (Julien Gilli) [#9237](https://github.com/joyent/node/pull/9237)
* \[[`7e9d2f8de8`](https://github.com/nodejs/node/commit/7e9d2f8de8)] - **watchdog**: 修复早期轮询返回的超时问题 (Saúl Ibarra Corretgé) [#9410](https://github.com/joyent/node/pull/9410)

<a id="0.12.1"></a>

## 2015-03-23，版本 0.12.1（稳定版）

### 提交

* \[[`3b511a8ccd`](https://github.com/nodejs/node/commit/3b511a8ccd)] - **openssl**: 升级到 1.0.1m（修复多个 CVE）

<a id="0.12.0"></a>

## 2015-02-06，版本 0.12.0（稳定版）

### 提交

* \[[`087a7519ce`](https://github.com/nodejs/node/commit/087a7519ce)] - **npm**: 升级到 2.5.1
* \[[`4312f8d760`](https://github.com/nodejs/node/commit/4312f8d760)] - **mdb\_v8**: 更新以适配 v0.12 (Dave Pacheco)
