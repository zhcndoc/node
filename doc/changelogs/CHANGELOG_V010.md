# Node.js 0.10 变更日志

<!--lint disable maximum-line-length no-literal-urls prohibited-strings-->

<table>
<tr>
<th colspan="2">稳定版</th>
</tr>
<tr>
<td valign="top">
<a href="#0.10.48">0.10.48</a><br/>
<a href="#0.10.47">0.10.47</a><br/>
<a href="#0.10.46">0.10.46</a><br/>
<a href="#0.10.45">0.10.45</a><br/>
<a href="#0.10.44">0.10.44</a><br/>
<a href="#0.10.43">0.10.43</a><br/>
<a href="#0.10.42">0.10.42</a><br/>
<a href="#0.10.41">0.10.41</a><br/>
<a href="#0.10.40">0.10.40</a><br/>
<a href="#0.10.39">0.10.39</a><br/>
<a href="#0.10.38">0.10.38</a><br/>
<a href="#0.10.37">0.10.37</a><br/>
<a href="#0.10.36">0.10.36</a><br/>
<a href="#0.10.35">0.10.35</a><br/>
<a href="#0.10.34">0.10.34</a><br/>
<a href="#0.10.33">0.10.33</a><br/>
<a href="#0.10.32">0.10.32</a><br/>
<a href="#0.10.31">0.10.31</a><br/>
<a href="#0.10.30">0.10.30</a><br/>
<a href="#0.10.29">0.10.29</a><br/>
<a href="#0.10.28">0.10.28</a><br/>
<a href="#0.10.27">0.10.27</a><br/>
<a href="#0.10.26">0.10.26</a><br/>
<a href="#0.10.25">0.10.25</a><br/>
<a href="#0.10.24">0.10.24</a><br/>
<a href="#0.10.23">0.10.23</a><br/>
</td>
<td valign="top">
<a href="#0.10.22">0.10.22</a><br/>
<a href="#0.10.21">0.10.21</a><br/>
<a href="#0.10.20">0.10.20</a><br/>
<a href="#0.10.19">0.10.19</a><br/>
<a href="#0.10.18">0.10.18</a><br/>
<a href="#0.10.17">0.10.17</a><br/>
<a href="#0.10.16">0.10.16</a><br/>
<a href="#0.10.15">0.10.15</a><br/>
<a href="#0.10.14">0.10.14</a><br/>
<a href="#0.10.13">0.10.13</a><br/>
<a href="#0.10.12">0.10.12</a><br/>
<a href="#0.10.11">0.10.11</a><br/>
<a href="#0.10.10">0.10.10</a><br/>
<a href="#0.10.9">0.10.9</a><br/>
<a href="#0.10.8">0.10.8</a><br/>
<a href="#0.10.7">0.10.7</a><br/>
<a href="#0.10.6">0.10.6</a><br/>
<a href="#0.10.5">0.10.5</a><br/>
<a href="#0.10.4">0.10.4</a><br/>
<a href="#0.10.3">0.10.3</a><br/>
<a href="#0.10.2">0.10.2</a><br/>
<a href="#0.10.1">0.10.1</a><br/>
<a href="#0.10.0">0.10.0</a><br/>
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
  * [0.12.x](CHANGELOG_V012.md)
  * [io.js](CHANGELOG_IOJS.md)
  * [存档](CHANGELOG_ARCHIVE.md)

_注意_: Node.js v0.10 已包含在
[Node.js 长期支持计划](https://github.com/nodejs/LTS) 中，并将维护至 2016 年 10 月。

<a id="0.10.48"></a>

## 2016-10-18，版本 0.10.48（维护版），@rvagg

这是一个安全发布。所有 Node.js 用户都应查阅安全发布摘要 <https://nodejs.org/en/blog/vulnerability/october-2016-security-releases/>，了解已修补漏洞的详细信息。

### 重要变更

* c-ares：修复单字节缓冲区覆盖问题，CVE-2016-5180，更多信息见 <https://c-ares.haxx.se/adv_20160929.html>（Rod Vagg）

### 提交

* \[[`a14a6a3a11`](https://github.com/nodejs/node/commit/a14a6a3a11)] - 依赖：c-ares，避免单字节缓冲区覆盖（Rod Vagg） <https://github.com/nodejs/node/pull/9108>
* \[[`b798f598af`](https://github.com/nodejs/node/commit/b798f598af)] - tls：修复轻微的 jslint 失败（Rod Vagg） <https://github.com/nodejs/node/pull/9107>
* \[[`92b232ba01`](https://github.com/nodejs/node/commit/92b232ba01)] - win,build：签名时尝试多个时间服务器（Rod Vagg） <https://github.com/nodejs/node/pull/9155>

<a id="0.10.47"></a>

## 2016-09-27，版本 0.10.47（维护版），@rvagg

这是一个安全发布。所有 Node.js 用户都应查阅安全发布摘要 <https://nodejs.org/en/blog/vulnerability/september-2016-security-releases/>，了解已修补漏洞的详细信息。

### 重要变更：

* buffer：当使用 `Buffer.concat()` 创建新的 `Buffer` 对象，并提供的 `totalLength` 参数超过被拼接的原始 `Buffer` 对象总长度时，对多余字节进行零填充。（Сковорода Никита Андреевич）
* http：
  * CVE-2016-5325 - 正确验证 `ServerResponse#writeHead()` 中 `reason` 参数允许的字符。修复了可能的响应拆分攻击向量。这引入了一种新的情况：在配置 HTTP 响应时可能会发生 `throw`，用户本来就应该在这里使用 try/catch。最初由 Evan Lucas 和 Romain Gaucher 独立报告。（Evan Lucas）
  * 无效状态码现在不能再发送。仅限于 100 - 999 之间的三位数字。不正确的验证也可能成为潜在的响应拆分攻击向量。已从 v4.x 回移植。（Brian White）
* openssl：升级到 1.0.1u，修复了影响 Node.js 的多个缺陷：CVE-2016-6304（“OCSP 状态请求扩展无限制内存增长”，高危）、CVE-2016-2183、CVE-2016-2183、CVE-2016-2178 和 CVE-2016-6306。
* tls：CVE-2016-7099 - 修复无效通配符证书验证检查问题；由于对通配符字符串中的 `*.` 验证不当，TLS 服务器可能会为其主机名提供一个无效的通配符证书。最初由 Alexander Minozhenko 和 James Bunton（Atlassian）报告（Ben Noordhuis）

### 提交：

* \[[`fc259c7dc4`](https://github.com/nodejs/node/commit/fc259c7dc4)] - buffer：在 .concat() 中对未初始化字节进行零填充（Сковорода Никита Андреевич） <https://github.com/nodejs/node-private/pull/67>
* \[[`35b49ed4bb`](https://github.com/nodejs/node/commit/35b49ed4bb)] - build：启用 -fno-delete-null-pointer-checks（Ben Noordhuis） <https://github.com/nodejs/node/pull/6738>
* \[[`03f4920d6a`](https://github.com/nodejs/node/commit/03f4920d6a)] - crypto：不构建硬件引擎（Rod Vagg） <https://github.com/nodejs/node-private/pull/68>
* \[[`1cbdb1957d`](https://github.com/nodejs/node/commit/1cbdb1957d)] - deps：为 openssl s_client 添加 -no_rand_screen（Shigeki Ohtsu） <https://github.com/nodejs/node-v0.x-archive/pull/25368>
* \[[`c66408cd0c`](https://github.com/nodejs/node/commit/c66408cd0c)] - deps：修复 ia32 win32 上的 openssl 汇编错误（Fedor Indutny） <https://github.com/nodejs/node-v0.x-archive/pull/25654>
* \[[`68f88ea792`](https://github.com/nodejs/node/commit/68f88ea792)] - deps：为 openssl 分离 sha256/sha512-x86_64.pl（Shigeki Ohtsu） <https://github.com/nodejs/node-v0.x-archive/pull/25654>
* \[[`884d50b348`](https://github.com/nodejs/node/commit/884d50b348)] - deps：将所有 openssl 头文件复制到 include 目录（Shigeki Ohtsu） <https://github.com/nodejs/node/pull/8718>
* \[[`bfd6cb5699`](https://github.com/nodejs/node/commit/bfd6cb5699)] - deps：将 openssl 源码升级到 1.0.1u（Shigeki Ohtsu） <https://github.com/nodejs/node/pull/8718>
* \[[`3614a173d0`](https://github.com/nodejs/node/commit/3614a173d0)] - http：检查 writeHead 中的 reason 字符（Evan Lucas） <https://github.com/nodejs/node-private/pull/48>
* \[[`f2433430ca`](https://github.com/nodejs/node/commit/f2433430ca)] - http：禁止发送明显无效的状态码（Evan Lucas） <https://github.com/nodejs/node-private/pull/48>
* \[[`0d7e21ee7b`](https://github.com/nodejs/node/commit/0d7e21ee7b)] - lib：让 tls.checkServerIdentity() 更严格（Ben Noordhuis） <https://github.com/nodejs/node-private/pull/62>
* \[[`1f4a6f5bd1`](https://github.com/nodejs/node/commit/1f4a6f5bd1)] - openssl：修复 win32 上应用程序中的按键要求（Shigeki Ohtsu） <https://github.com/nodejs/node-v0.x-archive/pull/25654>
* \[[`88dcc7f5bb`](https://github.com/nodejs/node/commit/88dcc7f5bb)] - v8：修复 Zone::New() 中的 -Wsign-compare 警告（Ben Noordhuis） <https://github.com/nodejs/node-private/pull/62>
* \[[`fd8ac56c75`](https://github.com/nodejs/node/commit/fd8ac56c75)] - v8：修复 g++ 6.1.1 的构建错误（Ben Noordhuis） <https://github.com/nodejs/node-private/pull/62>

<a id="0.10.46"></a>

## 2016-06-23，版本 0.10.46（维护版），@rvagg

### 重要变更：

这是一个安全发布。所有 Node.js 用户都应查阅安全发布摘要 <https://nodejs.org/en/blog/vulnerability/june-2016-security-releases/>，了解已修补漏洞的详细信息。

* libuv：（CVE-2014-9748）修复了 Windows XP 和 Windows 2003 上读/写锁实现中的一个 bug，该 bug 可能导致未定义且潜在不安全的行为。更多信息可见 <https://github.com/libuv/libuv/issues/515> 或 <https://nodejs.org/en/blog/vulnerability/june-2016-security-releases/>。
* V8：（CVE-2016-1669）修复了在 V8 中发现的一个潜在 Buffer 溢出漏洞，更多细节可见 CVE 页面 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2016-1669> 或 <https://nodejs.org/en/blog/vulnerability/june-2016-security-releases/>。

### 提交：

* \[[`3374f57973`](https://github.com/nodejs/node/commit/3374f57973)] - deps：将 libuv 更新到 0.10.37（Saúl Ibarra Corretgé） <https://github.com/nodejs/node/pull/7293>
* \[[`fcb9145e29`](https://github.com/nodejs/node/commit/fcb9145e29)] - deps：从 v8 上游回移植 3a9bfec（Myles Borins） <https://github.com/nodejs/node-private/pull/43>

<a id="0.10.45"></a>

## 2016-05-06，版本 0.10.45（维护版），@rvagg

### 重要变更：

* npm：修正 v2.15.1 代码中的错误版本号（Forrest L Norvell） <https://github.com/nodejs/node/pull/5987>
* openssl：升级到 v1.0.1t，修复安全漏洞（Shigeki Ohtsu） <https://github.com/nodejs/node/pull/6553>
  * 修复 CVE-2016-2107 “AES-NI CBC MAC 检查中的填充 oracle”
  * 完整详情见 <https://nodejs.org/en/blog/vulnerability/openssl-may-2016/>

### 提交：

* \[[`3cff81c7d6`](https://github.com/nodejs/node/commit/3cff81c7d6)] - deps：在 LTS 中将 npm 完整升级到 2.15.1（Forrest L Norvell） <https://github.com/nodejs/node/pull/5987>
* \[[`7c22f19009`](https://github.com/nodejs/node/commit/7c22f19009)] - deps：为 openssl s_client 添加 -no_rand_screen（Shigeki Ohtsu） <https://github.com/joyent/node/pull/25368>
* \[[`5d78366937`](https://github.com/nodejs/node/commit/5d78366937)] - deps：更新 openssl asm 文件（Shigeki Ohtsu） <https://github.com/nodejs/node/pull/6553>
* \[[`2bc2427cb7`](https://github.com/nodejs/node/commit/2bc2427cb7)] - deps：修复 ia32 win32 上的 openssl 汇编错误（Fedor Indutny） <https://github.com/joyent/node/pull/25654>
* \[[`8df4b0914c`](https://github.com/nodejs/node/commit/8df4b0914c)] - deps：为 openssl 分离 sha256/sha512-x86_64.pl（Shigeki Ohtsu） <https://github.com/joyent/node/pull/25654>
* \[[`11eefefb17`](https://github.com/nodejs/node/commit/11eefefb17)] - deps：将所有 openssl 头文件复制到 include 目录（Shigeki Ohtsu） <https://github.com/nodejs/node/pull/6553>
* \[[`61ccc27b54`](https://github.com/nodejs/node/commit/61ccc27b54)] - deps：将 openssl 源码升级到 1.0.1t（Shigeki Ohtsu） <https://github.com/nodejs/node/pull/6553>
* \[[`aa02438274`](https://github.com/nodejs/node/commit/aa02438274)] - openssl：修复 win32 上应用程序中的按键要求（Shigeki Ohtsu） <https://github.com/joyent/node/pull/25654>

<a id="0.10.44"></a>

## 2016-03-31，版本 0.10.44（维护版），@rvagg

### 重要变更

* npm：升级到 v2.15.1。修复了在 HTTP 请求中使用身份验证令牌时的一个安全漏洞，该漏洞可能允许攻击者搭建一个服务器，从命令行界面用户那里收集令牌。此前，对于已登录用户，CLI 发出的每个请求都会携带身份验证令牌，而不管请求的目标地址是什么。此更新通过仅在针对当前安装所使用的注册表或注册表发出请求时包含这些令牌来修复该问题。重要：这是 npm v2 LTS 相对于此前已弃用的 npm v1 的重大升级。（Forrest L Norvell）<https://github.com/nodejs/node/pull/5967>
* openssl：OpenSSL v1.0.1s 禁用了 EXPORT 和 LOW 密码套件，因为它们已过时且不被认为安全。此版本的 Node.js 启用了 `OPENSSL_NO_WEAK_SSL_CIPHERS`，以完全禁用这些列表中包含的 27 个密码套件，这些套件可用于 SSLv3 及更高版本。完整详情可参见我们关于此问题的 LTS 讨论（<https://github.com/nodejs/LTS/issues/85>）。（Shigeki Ohtsu）<https://github.com/nodejs/node/pull/5712>

### 提交

* \[[`feceb77d7e`](https://github.com/nodejs/node/commit/feceb77d7e)] - deps: 将 LTS 中的 npm 升级到 2.15.1（Forrest L Norvell）<https://github.com/nodejs/node/pull/5968>
* \[[`0847954331`](https://github.com/nodejs/node/commit/0847954331)] - deps: 在 openssl 中禁用 EXPORT 和 LOW 密码套件（Shigeki Ohtsu）<https://github.com/nodejs/node/pull/5712>
* \[[`6bb86e727a`](https://github.com/nodejs/node/commit/6bb86e727a)] - test: 修改 tls 测试，不再使用 LOW 密码套件（Shigeki Ohtsu）<https://github.com/nodejs/node/pull/5712>
* \[[`905bec29ad`](https://github.com/nodejs/node/commit/905bec29ad)] - win,build: 支持 Visual C++ Build Tools 2015（João Reis）<https://github.com/nodejs/node/pull/5627>

<a id="0.10.43"></a>

## 2016-03-04，版本 0.10.43（维护版），@rvagg

### 重要变更：

* http\_parser：升级到 http-parser 1.2，以修复对允许的头部字符的一个非预期严格限制。（James M Snell）<https://github.com/nodejs/node/pull/5242>
* domains：
  * 修复在未设置错误处理器、且在抛出错误的 domain 内部设置了 `'uncaughtException'` 事件监听器并且 `process` 对象上也设置了 `'uncaughtException'` 事件监听器时，由于抛出异常而不是在 `process` 对象上发出 `'uncaughtException'` 事件导致退出的问题。（Julien Gilli）<https://github.com/nodejs/node/pull/3887>
  * 修复当在没有错误处理器的 domain 中抛出错误并使用 `--abort-on-uncaught-exception` 时，进程不会在正确的函数调用中中止的问题。（Julien Gilli）<https://github.com/nodejs/node/pull/3887>
* openssl：从 1.0.1r 升级到 1.0.1s（Ben Noordhuis）<https://github.com/nodejs/node/pull/5508>
  * 修复在解析格式错误的 DSA 密钥时存在的双重释放缺陷，该缺陷可能被用于 DoS 或内存破坏攻击。要利用该缺陷实施实际攻击可能非常困难，因此对 Node.js 用户而言被认为是低严重性。更多信息见 <https://www.openssl.org/news/vulnerabilities.html#2016-0705>
  * 修复一个在某些极少见情况下可能导致内存破坏的缺陷，涉及内部的 `BN_hex2bn()` 和 `BN_dec2bn()` 函数。据信 Node.js 不会调用使用这些函数的代码路径，因此通过 Node.js 利用该缺陷实施实际攻击 _不太可能_ 发生。更多信息见 <https://www.openssl.org/news/vulnerabilities.html#2016-0797>
  * 修复一个使 CacheBleed Attack（<https://ssrg.nicta.com.au/projects/TS/cachebleed/>）成为可能的缺陷。该缺陷使攻击者能够执行侧信道攻击，从而有可能恢复完整的 RSA 私钥。它仅影响使用超线程时的 Intel Sandy Bridge（以及可能更早的）微架构。更新的微架构，包括 Haswell，不受影响。更多信息见 <https://www.openssl.org/news/vulnerabilities.html#2016-0702>
  * 移除对 SSLv2 的支持，`--enable-ssl2` 命令行参数现在将产生错误。DROWN Attack（<https://drownattack.com/>）会在服务器启用 SSLv2 时造成漏洞，即使客户端连接并未使用 SSLv2 也是如此。SSLv2 协议被广泛认为存在严重缺陷，不应再被支持。更多信息见 <https://www.openssl.org/news/vulnerabilities.html#2016-0800>

### 提交：

* \[[`164157abbb`](https://github.com/nodejs/node/commit/164157abbb)] - build: 更新 OSX 安装程序中的 Node.js 标志（Rod Vagg）<https://github.com/nodejs/node/pull/5401>
* \[[`f8cb0dcf67`](https://github.com/nodejs/node/commit/f8cb0dcf67)] - crypto,tls: 移除 SSLv2 支持（Ben Noordhuis）<https://github.com/nodejs/node/pull/5529>
* \[[`42ded2a590`](https://github.com/nodejs/node/commit/42ded2a590)] - deps: 将 openssl 升级到 1.0.1s（Ben Noordhuis）<https://github.com/nodejs/node/pull/5508>
* \[[`1e45a6111c`](https://github.com/nodejs/node/commit/1e45a6111c)] - deps: 将 http-parser 更新到 1.2 版本（James M Snell）<https://github.com/nodejs/node/pull/5242>
* \[[`6db377b2f4`](https://github.com/nodejs/node/commit/6db377b2f4)] - doc: 移除 SSLv2 说明（Shigeki Ohtsu）<https://github.com/nodejs/node/pull/5541>
* \[[`563c359f5c`](https://github.com/nodejs/node/commit/563c359f5c)] - domains: 修复对未捕获异常的处理（Julien Gilli）<https://github.com/nodejs/node/pull/3887>
* \[[`e483f3fd26`](https://github.com/nodejs/node/commit/e483f3fd26)] - test: 修复挂起的 http obstext 测试（Ben Noordhuis）<https://github.com/nodejs/node/pull/5511>

<a id="0.10.42"></a>

## 2016-02-09，版本 0.10.42（维护版），@jasnell

这是一个重要的安全更新。所有 Node.js 用户都应查看 nodejs.org 上的安全发布摘要以了解已修补漏洞的详细信息。

### 重要变更

* http：修复 HTTP 请求和响应的头部解析缺陷，该缺陷可能允许请求走私（CVE-2016-2086）或响应拆分（CVE-2016-2216）。HTTP 头部解析现在与 HTTP 规范更一致，包括对可接受字符的限制。
* http-parser：从 1.0 升级到 1.1
* openssl：从 1.0.1q 升级到 1.0.1r。为缓解 Logjam 攻击，TLS 客户端现在会拒绝参数长度短于 1024 位的 Diffie-Hellman 握手，先前的限制为 768 位。
* src：
  * 引入新的命令行标志 `--security-revert={cvenum}`，用于有选择地回退特定的 CVE 修复
  * 允许使用 `--security-revert=CVE-2016-2216` 有选择地回退 CVE-2016-2216 的修复
* build：
  * 从 v0.10.42 开始，nodejs.org 将为 v0.10 构建提供 xz 压缩的 tar 文件
  * 从 v0.10.42 开始，nodejs.org 将为 v0.10 构建提供一个 headers.tar.gz 文件，未来需要对 node-gyp 进行更改才能使用它

### 提交

* \[[`fdc332183e`](https://github.com/nodejs/node/commit/fdc332183e)] - build: 在可能的情况下启用 xz 压缩的 tar 包（Rod Vagg）<https://github.com/nodejs/node/pull/4894>
* \[[`2d35b421b5`](https://github.com/nodejs/node/commit/2d35b421b5)] - deps: 将 openssl 源码升级到 1.0.1r（Shigeki Ohtsu）<https://github.com/joyent/node/pull/25368>
* \[[`b31c0f3ea4`](https://github.com/nodejs/node/commit/b31c0f3ea4)] - deps: 将 http-parser 更新到 1.1 版本（James M Snell）
* \[[`616ec1d6b0`](https://github.com/nodejs/node/commit/616ec1d6b0)] - doc: 澄清 v0.10.41 openssl tls 安全影响（Rod Vagg）<https://github.com/nodejs/node/pull/4153>
* \[[`ccb3c2377c`](https://github.com/nodejs/node/commit/ccb3c2377c)] - http: 严格禁止头部中的无效字符（James M Snell）
* \[[`f0af0d1f96`](https://github.com/nodejs/node/commit/f0af0d1f96)] - src: 避免 node\_revert.cc 中的编译器警告（James M Snell）
* \[[`df80e856c6`](https://github.com/nodejs/node/commit/df80e856c6)] - src: 添加 --security-revert 命令行标志（James M Snell）
* \[[`ff58dcdd74`](https://github.com/nodejs/node/commit/ff58dcdd74)] - tools: 回移植用于 headers 的 tools/install.py（Richard Lau）<https://github.com/nodejs/node/pull/4149>

<a id="0.10.41"></a>

## 2015-12-04，版本 0.10.41（维护版），@rvagg

安全更新

### 重要变更

* build：添加对 Microsoft Visual Studio 2015 的支持
* npm：从 v1.4.28 升级到 v1.4.29。这是作为将一个能够与当前 registry 配合工作的 npm 版本引入 Node.js v0.10.x 策略的一部分而发布的一个特殊一次性版本（<https://github.com/nodejs/LTS/issues/37>）。此版本的 npm 每次运行时都会打印一个横幅，提示下一个标准版的 Node.js v0.10.x 将随附 npm v2 版本。
* openssl：升级到 1.0.1q，包含 CVE-2015-3194“在缺少 PSS 参数时证书验证崩溃”的修复；这对使用客户端证书认证的 Node.js TLS 服务器可能构成潜在的拒绝服务向量；TLS 客户端也会受到影响。详情见 <http://openssl.org/news/secadv/20151203.txt>。（Ben Noordhuis）<https://github.com/nodejs/node/pull/4133>

### 提交

* \[[`16ca0779f5`](https://github.com/nodejs/node/commit/16ca0779f5)] - src/node.cc: 修复在没有 OpenSSL 支持时的构建错误（Jörg Krause）<https://github.com/nodejs/node-v0.x-archive/pull/25862>
* \[[`c559c7911d`](https://github.com/nodejs/node/commit/c559c7911d)] - build: 回移植 tools/release.sh（Rod Vagg）<https://github.com/nodejs/node/pull/3965>
* \[[`268d2b4637`](https://github.com/nodejs/node/commit/268d2b4637)] - build: 为新的 CI 基础设施回移植配置（Rod Vagg）<https://github.com/nodejs/node/pull/3965>
* \[[`c88a0b26da`](https://github.com/nodejs/node/commit/c88a0b26da)] - build: 更新清单以包含 Windows 10（Lucien Greathouse）<https://github.com/nodejs/node/pull/2838>
* \[[`8564a9f5f7`](https://github.com/nodejs/node/commit/8564a9f5f7)] - build: 在 openSUSE Tumbleweed 上检测 gcc 版本（Henrique Aparecido Lavezzo）<https://github.com/nodejs/node-v0.x-archive/pull/25671>
* \[[`9c7bd6de56`](https://github.com/nodejs/node/commit/9c7bd6de56)] - build: run-ci makefile 规则（Alexis Campailla）<https://github.com/nodejs/node-v0.x-archive/pull/25686>
* \[[`ffa1e1f31d`](https://github.com/nodejs/node/commit/ffa1e1f31d)] - build: 在 test-ci 中支持不稳定测试（Alexis Campailla）<https://github.com/nodejs/node-v0.x-archive/pull/25686>
* \[[`100dd19e61`](https://github.com/nodejs/node/commit/100dd19e61)] - build: 通过 test-ci 支持 Jenkins（Alexis Campailla）<https://github.com/nodejs/node-v0.x-archive/pull/25686>
* \[[`ec861f6f90`](https://github.com/nodejs/node/commit/ec861f6f90)] - build: 让多用户的发布流程更容易（Julien Gilli）<https://github.com/nodejs/node-v0.x-archive/pull/25638>
* \[[`d7ae79a452`](https://github.com/nodejs/node/commit/d7ae79a452)] - build,win: 修复 node.exe 资源版本（João Reis）<https://github.com/nodejs/node/pull/3053>
* \[[`6ac47aa9f5`](https://github.com/nodejs/node/commit/6ac47aa9f5)] - build,win: 失败时尝试下一个 MSVS 版本（João Reis）<https://github.com/nodejs/node/pull/2910>
* \[[`e669b27740`](https://github.com/nodejs/node/commit/e669b27740)] - crypto: 用简单互斥锁替换读写锁（Ben Noordhuis）<https://github.com/nodejs/node/pull/2723>
* \[[`ce0a48826e`](https://github.com/nodejs/node/commit/ce0a48826e)] - deps: 升级到 openssl 1.0.1q（Ben Noordhuis）<https://github.com/nodejs/node/pull/4132>
* \[[`b68781e500`](https://github.com/nodejs/node/commit/b68781e500)] - deps: 将 npm 升级到 1.4.29（Forrest L Norvell）<https://github.com/nodejs/node/pull/3639>
* \[[`7cf0d9c1d9`](https://github.com/nodejs/node/commit/7cf0d9c1d9)] - deps: 为 MSVS 2015 修复 openssl（Andy Polyakov）<https://github.com/nodejs/node-v0.x-archive/pull/25857>
* \[[`9ee8a14f9e`](https://github.com/nodejs/node/commit/9ee8a14f9e)] - deps: 修复 gyp 以便在没有 XCode 的 MacOSX 上工作（Shigeki Ohtsu）<https://github.com/nodejs/node-v0.x-archive/pull/25857>
* \[[`a525c7244e`](https://github.com/nodejs/node/commit/a525c7244e)] - deps: 将 gyp 更新到 25ed9ac（João Reis）<https://github.com/nodejs/node-v0.x-archive/pull/25857>
* \[[`6502160294`](https://github.com/nodejs/node/commit/6502160294)] - dns: 允许 v8 优化 lookup()（Brian White）<https://github.com/nodejs/node-v0.x-archive/pull/8942>
* \[[`5d829a63ab`](https://github.com/nodejs/node/commit/5d829a63ab)] - doc: 回移植 README.md（Rod Vagg）<https://github.com/nodejs/node/pull/3965>
* \[[`62c8948109`](https://github.com/nodejs/node/commit/62c8948109)] - doc: 修复 Folders as Modules 中遗漏的 index.json（Elan Shanker）<https://github.com/nodejs/node-v0.x-archive/pull/8868>
* \[[`572663f303`](https://github.com/nodejs/node/commit/572663f303)] - https: 不要覆盖 servername 选项（skenqbx）<https://github.com/nodejs/node-v0.x-archive/pull/9368>
* \[[`75c84b2439`](https://github.com/nodejs/node/commit/75c84b2439)] - test: 为 https agent servername 选项添加测试（skenqbx）<https://github.com/nodejs/node-v0.x-archive/pull/9368>
* \[[`841a6dd264`](https://github.com/nodejs/node/commit/841a6dd264)] - test: 将更多测试标记为不稳定（Alexis Campailla）<https://github.com/nodejs/node-v0.x-archive/pull/25807>
* \[[`a7fee30da1`](https://github.com/nodejs/node/commit/a7fee30da1)] - test: 将 test-tls-securepair-server 标记为不稳定（Alexis Campailla）<https://github.com/nodejs/node-v0.x-archive/pull/25807>
* \[[`7df57703dd`](https://github.com/nodejs/node/commit/7df57703dd)] - test: 将 SmartOS 上的 test-net-error-twice 标记为不稳定（Julien Gilli）<https://github.com/nodejs/node-v0.x-archive/pull/25760>
* \[[`e10892cccc`](https://github.com/nodejs/node/commit/e10892cccc)] - test: 使 test-abort-fatal-error 不再不稳定（Julien Gilli）<https://github.com/nodejs/node-v0.x-archive/pull/25755>
* \[[`a2f879f197`](https://github.com/nodejs/node/commit/a2f879f197)] - test: 将最近失败的测试标记为不稳定（Alexis Campailla）<https://github.com/nodejs/node-v0.x-archive/pull/25686>
* \[[`e7010bdf92`](https://github.com/nodejs/node/commit/e7010bdf92)] - test: 运行器在不稳定测试上应返回 0（Alexis Campailla）<https://github.com/nodejs/node-v0.x-archive/pull/25686>
* \[[`c283c9bbb3`](https://github.com/nodejs/node/commit/c283c9bbb3)] - test: 支持将测试输出写入文件（Alexis Campailla）<https://github.com/nodejs/node-v0.x-archive/pull/25686>
* \[[`eeaed586bb`](https://github.com/nodejs/node/commit/eeaed586bb)] - test: 运行器对不稳定测试的支持（Alexis Campailla）<https://github.com/nodejs/node-v0.x-archive/pull/25686>
* \[[`3bb8174b94`](https://github.com/nodejs/node/commit/3bb8174b94)] - test: 重构以使用通用 testcfg（Timothy J Fontaine）<https://github.com/nodejs/node-v0.x-archive/pull/25686>
* \[[`df59d43586`](https://github.com/nodejs/node/commit/df59d43586)] - tools: 向 logger 传递常量而不是字符串（Johan Bergström）<https://github.com/nodejs/node-v0.x-archive/pull/25686>
* \[[`d103d4ed9a`](https://github.com/nodejs/node/commit/d103d4ed9a)] - tools: 在 v8 升级后修复 test.py（Ben Noordhuis）<https://github.com/nodejs/node-v0.x-archive/pull/25686>
* \[[`8002192b4e`](https://github.com/nodejs/node/commit/8002192b4e)] - win: 为 Windows 8.1 生成 node.exe 清单（Alexis Campailla）<https://github.com/nodejs/node/pull/2838>
* \[[`66ec1dae8f`](https://github.com/nodejs/node/commit/66ec1dae8f)] - win: 添加 MSVS 2015 支持（Rod Vagg）<https://github.com/nodejs/node-v0.x-archive/pull/25857>
* \[[`e192f61514`](https://github.com/nodejs/node/commit/e192f61514)] - win: 修复适用于 WiX 3.9 之前版本的自定义操作（João Reis）<https://github.com/nodejs/node-v0.x-archive/pull/25569>
* \[[`16bcd68dc5`](https://github.com/nodejs/node/commit/16bcd68dc5)] - win: 修复在 Visual Studio != 2013 上的自定义操作（Julien Gilli）<https://github.com/nodejs/node-v0.x-archive/pull/25569>
* \[[`517986c2f4`](https://github.com/nodejs/node/commit/517986c2f4)] - win: 回移植恢复 xp/2k3 支持（Bert Belder）<https://github.com/nodejs/node-v0.x-archive/pull/25569>
* \[[`10f251e8dd`](https://github.com/nodejs/node/commit/10f251e8dd)] - win: 回移植在生成项目之前设置环境变量（Alexis Campailla）<https://github.com/nodejs/node-v0.x-archive/pull/25569>

<a id="0.10.40"></a>

## 2015-07-09，版本 0.10.40（维护）

### 提交

* \[[`0cf9f27703`](https://github.com/nodejs/node/commit/0cf9f27703)] - **openssl**：升级到 1.0.1p [#25654](https://github.com/joyent/node/pull/25654)
* \[[`5a60e0d904`](https://github.com/nodejs/node/commit/5a60e0d904)] - **V8**：从上游回移 JitCodeEvent 补丁（Ben Noordhuis） [#25588](https://github.com/joyent/node/pull/25588)
* \[[`18d413d299`](https://github.com/nodejs/node/commit/18d413d299)] - **win,msi**：在 AppData 目录中创建 npm 文件夹（Steven Rockarts） [#8838](https://github.com/joyent/node/pull/8838)

<a id="0.10.39"></a>

## 2015-06-18，版本 0.10.39（维护）

### 提交

* \[[`456c22f63f`](https://github.com/nodejs/node/commit/456c22f63f)] - **openssl**：升级到 1.0.1o（修复多个 CVE） [#25523](https://github.com/joyent/node/pull/25523)
* \[[`9d19dfbfdb`](https://github.com/nodejs/node/commit/9d19dfbfdb)] - **install**：修复 openssl 头文件的源路径（Oguz Bastemur） [#14089](https://github.com/joyent/node/pull/14089)
* \[[`4028669531`](https://github.com/nodejs/node/commit/4028669531)] - **install**：确保 opensslconf.h 被覆盖（Oguz Bastemur） [#14089](https://github.com/joyent/node/pull/14089)
* \[[`d38e865fce`](https://github.com/nodejs/node/commit/d38e865fce)] - **timers**：修复在定时器回调中添加时的超时问题（Julien Gilli） [#17203](https://github.com/joyent/node/pull/17203)
* \[[`e7c84f82c7`](https://github.com/nodejs/node/commit/e7c84f82c7)] - **windows**：安装后广播 WM\_SETTINGCHANGE（Mathias Küsel） [#25100](https://github.com/joyent/node/pull/25100)

<a id="0.10.38"></a>

## 2015-03-23，版本 0.10.38（维护）

### 提交

* \[[`3b511a8ccd`](https://github.com/nodejs/node/commit/3b511a8ccd)] - **openssl**：升级到 1.0.1m（修复多个 CVE）

<a id="0.10.37"></a>

## 2015-03-11，版本 0.10.37（维护）

### 提交

* \[[`dcff5d565c`](https://github.com/nodejs/node/commit/dcff5d565c)] - uv：更新到 0.10.36（CVE-2015-0278） [#9274](https://github.com/joyent/node/pull/9274)
* \[[`f2a45caf2e`](https://github.com/nodejs/node/commit/f2a45caf2e)] - domains：修复错误处理后栈清理问题（Jonas Dohse） [#9364](https://github.com/joyent/node/pull/9364)
* \[[`d01a900078`](https://github.com/nodejs/node/commit/d01a900078)] - buffer：重新措辞 Buffer.concat 错误消息（Chris Dickinson） [#8723](https://github.com/joyent/node/pull/8723)
* \[[`c8239c08d7`](https://github.com/nodejs/node/commit/c8239c08d7)] - console：允许将 Object.prototype 字段作为标签（Julien Gilli） [#9215](https://github.com/joyent/node/pull/9215)
* \[[`431eb172f9`](https://github.com/nodejs/node/commit/431eb172f9)] - V8：在 profiler 日志文件中记录版本（Ben Noordhuis） [#9043](https://github.com/joyent/node/pull/9043)
* \[[`8bcd0a4c4a`](https://github.com/nodejs/node/commit/8bcd0a4c4a)] - http：修复 GET 请求的性能回退（Florin-Cristian Gavrila） [#9026](https://github.com/joyent/node/pull/9026)

<a id="0.10.36"></a>

## 2015-01-26，版本 0.10.36（稳定）

### 提交

* \[[`deef605085`](https://github.com/nodejs/node/commit/deef605085)] - **openssl**：更新到 1.0.1l
* \[[`45f1330425`](https://github.com/nodejs/node/commit/45f1330425)] - **v8**：修复调试器和严格模式回归（Julien Gilli）
* \[[`6ebd85e105`](https://github.com/nodejs/node/commit/6ebd85e105)] - **v8**：不要在 cpu profiler 线程中忙循环（Ben Noordhuis） [#8789](https://github.com/joyent/node/pull/8789)

<a id="0.10.35"></a>

## 2014.12.22，版本 0.10.35（稳定）

* tls：重新添加被 f9456a2 移除的 1024 位 SSL 证书（Chris Dickinson）
* timers：在 unrefd 时不要关闭 interval 定时器（Julien Gilli）
* timers：迭代时不要修改 unref 列表（Julien Gilli）

<a id="0.10.34"></a>

## 2014.12.17，版本 0.10.34（稳定）

<https://github.com/nodejs/node/commit/52795f8fcc2de77cf997e671ea58614e5e425dfe>

* uv：更新到 v0.10.30
* zlib：升级到 v1.2.8
* child\_process：检查 execFile 参数是否为数组（Sam Roberts）
* child\_process：检查 fork 参数是否为数组（Sam Roberts）
* crypto：更新根证书（Ben Noordhuis）
* domains：修复 uncaught 上 abort 的问题（Julien Gilli）
* timers：避免在 \_unrefActive 中进行线性扫描。（Julien Gilli）
* timers：修复 unref() 内存泄漏（Trevor Norris）
* v8：添加用于在未捕获异常时中止的 API（Julien Gilli）
* debugger：修复使用 "use strict" 时的问题（Julien Gilli）

<a id="0.10.33"></a>

## 2014.10.20，版本 0.10.33（稳定）

<https://github.com/nodejs/node/commit/8d045a30e95602b443eb259a5021d33feb4df079>

* openssl：更新到 1.0.1j（修复多个 CVE）
* uv：更新到 v0.10.29
* child\_process：正确支持可选参数（cjihrig）
* crypto：默认禁用 SSLv2/3 的自动协商（Fedor Indutny，
  Timothy J Fontaine，Alexis Campailla）

  这是一个行为变更，默认情况下我们不允许协商到
  SSLv2 或 SSLv3。如果你想要这种行为，请分别使用
  `--enable-ssl2` 或 `--enable-ssl3` 启动 Node.js。

  这不会改变专门请求 `SSLv2_method` 或 `SSLv3_method` 的用户的行为。
  虽然不建议这样做，但由于你是在专门请求使用这些方法，因此默认假定你知道自己在做什么。

<a id="0.10.32"></a>

## 2014.09.16，版本 0.10.32（稳定）

<https://github.com/nodejs/node/commit/0fe0d121551593c23a565db8397f85f17bb0f00e>

* npm：更新到 1.4.28
* v8：修复前一个版本引入的崩溃问题（Fedor Indutny）
* configure：添加 --openssl-no-asm 标志（Fedor Indutny）
* crypto：对任何带回调的方法使用 domains（Chris Dickinson）
* http：不要在 TE HEAD 响应中发送 `0\r\n\r\n`（Fedor Indutny）
* querystring：修复 unescape 覆盖问题（Tristan Berger）
* url：添加对 RFC 3490 分隔符的支持（Mathias Bynens）

<a id="0.10.31"></a>

## 2014.08.19，版本 0.10.31（稳定）

<https://github.com/nodejs/node/commit/7fabdc23d843cb705d2d0739e7bbdaaf50aa3292>

* v8：回移 CVE-2013-6668
* openssl：更新到 v1.0.1i
* npm：更新到 v1.4.23
* cluster：disconnect 不应是同步的（Sam Roberts）
* fs：修复在获得 RangeError 时 fs.readFileSync 的 fd 泄漏（Jackson Tian）
* stream：修复 Readable.wrap objectMode 中的假值（James Halliday）
* timers：修复带有非整数延迟的定时器挂起问题。（Julien Gilli）

<a id="0.10.30"></a>

## 2014.07.31，版本 0.10.30（稳定）

<https://github.com/nodejs/node/commit/bc0ff830aff1e016163d855e86ded5c98b0899e8>

* uv：升级到 v0.10.28
* npm：升级到 v1.4.21
* v8：中断不得屏蔽堆栈溢出。
* Revert "stream: start old-mode read in a next tick"（Fedor Indutny）
* buffer：修复 `readUIn32BE` 中的符号溢出（Fedor Indutny）
* buffer：改进 {read,write}{U}Int\* 方法（Nick Apperson）
* child\_process：处理 writeUtf8String 错误（Fedor Indutny）
* deps：回移来自 v8 上游的 4ed5fde4f（Fedor Indutny）
* deps：从 OpenSSL 选择性合并 eca441b2（Fedor Indutny）
* lib：移除并重构对 isNaN() 的调用（cjihrig）
* module：消除重复的 `getenv()`（Maciej Małecki）
* stream2：在读取已结束流时刷新现有数据（Chris Dickinson）
* streams：移除未使用的 require('assert')（Rod Vagg）
* timers：回移 f8193ab（Julien Gilli）
* util.h：接口兼容性（Oguz Bastemur）
* zlib：关闭后写入时不要崩溃（Fedor Indutny）

<a id="0.10.29"></a>

## 2014.06.05，版本 0.10.29（稳定）

<https://github.com/nodejs/node/commit/ce82d6b8474bde7ac7df6d425fb88fb1bcba35bc>

* openssl：到 1.0.1h（CVE-2014-0224）

* npm：升级到 1.4.14

* utf8：防止 Node 发送无效的 UTF-8（Felix Geisendörfer）
  * _注意_ 这引入了一个破坏性变更，以前你可以构造
    无效的 UTF-8 并在期望有效 UTF-8 的客户端中触发错误，现在不匹配的代理对会被替换为未知的 UTF-8
    字符。要恢复旧功能，只需设置 NODE\_INVALID\_UTF8
    环境变量。

* child\_process：在抛出之前不要设置 args（Greg Sabia Tucker）

* child\_process：spawn() 不会抛出 TypeError（Greg Sabia Tucker）

* constants：导出 O\_NONBLOCK（Fedor Indutny）

* crypto：改进内存使用（Alexis Campailla）

* fs：如果 fstat() 在 readFile() 中失败则关闭文件（cjihrig）

* lib：为 EventEmitter 原型方法命名（Ben Noordhuis）

* tls：修复性能问题（Alexis Campailla）

<a id="0.10.28"></a>

## 2014.05.01，版本 0.10.28（稳定）

<https://github.com/nodejs/node/commit/b148cbe09d4657766fdb61575ba985734c2ff0a8>

* npm：升级到 v1.4.9

<a id="0.10.27"></a>

## 2014.05.01，版本 0.10.27（稳定）

<https://github.com/nodejs/node/commit/cb7911f78ae96ef7a540df992cc1359ba9636e86>

* npm：升级到 v1.4.8
* openssl：升级到 1.0.1g
* uv：更新到 v0.10.27
* dns：修复某些 txt 条目（Fedor Indutny）
* assert：确保 deepEqual 的自反性（Mike Pennisi）
* child\_process：修复发送句柄时的死锁（Fedor Indutny）
* child\_process：修复重复发送句柄的问题（Fedor Indutny）
* crypto：不要将 cipher/hash 名称转为小写（Fedor Indutny）
* dtrace：绕过 FreeBSD 上的链接器 bug（Fedor Indutny）
* http：不要在不可读 socket 上发出 EOF（Fedor Indutny）
* http：在没有 agent 时调用 createConnection（Nathan Rajlich）
* stream：移除无用检查（Brian White）
* timer：不要在 domain 中重新调度 timer bucket（Greg Brail）
* url：将 \ 视为与 / 相同（isaacs）
* util：如果是 Error 实例则格式化为 Error（Rod Vagg）

<a id="0.10.26"></a>

## 2014.02.18，版本 0.10.26（稳定）

<https://github.com/nodejs/node/commit/cc56c62ed879ad4f93b1fdab3235c43e60f48b7e>

* uv：升级到 v0.10.25（Timothy J Fontaine）
* npm：升级到 1.4.3（isaacs）
* v8：支持使用 VS2013 编译（Fedor Indutny）
* cares：回移 TXT 解析修复（Fedor Indutny）
* crypto：在 SignFinal 失败时抛出（Fedor Indutny）
* crypto：更新根证书（Ben Noordhuis）
* debugger：修复重启后断点不显示的问题（Farid Neshat）
* fs：使 unwatchFile() 对路径不敏感（iamdoron）
* net：不要重新发出流错误（Fedor Indutny）
* net：使 Socket 的 destroy() 支持安全重入（Jun Ma）
* net：在重新连接时重置 `endEmitted`（Fedor Indutny）
* node：不要隐式关闭 stdio（Fedor Indutny）
* zlib：避免在 close 中触发断言（Fedor Indutny）

<a id="0.10.25"></a>

## 2014.01.23，版本 0.10.25（稳定版）

<https://github.com/nodejs/node/commit/b0e5f195dfce3e2b99f5091373d49f6616682596>

* uv: 升级到 v0.10.23
* npm: 升级到 v1.3.24
* v8: 修复具有大量属性的对象的枚举问题
* child\_process: 修复 spawn() 的可选参数（Sam Roberts）
* cluster: 向工作进程报告更多错误（Fedor Indutny）
* domains: exit() 仅影响活动域（Ryan Graham）
* src: OnFatalError 处理程序必须调用 abort()（Timothy J Fontaine）
* stream: 写入可能返回 false，但忘记触发 drain（Yang Tianyang）

<a id="0.10.24"></a>

## 2013.12.18，版本 0.10.24（稳定版）

<https://github.com/nodejs/node/commit/b7fd6bc899ccb629d790c47aee06aba87e535c41>

* uv: 升级到 v0.10.21
* npm: 升级到 1.3.21
* v8: 为 CVE-2013-{6639|6640} 回移修复
* build: 在 Unix 上安装 node 和依赖库头文件（Timothy J Fontaine）
* cluster, v8: 修复 --logfile=%p.log（Ben Noordhuis）
* module: 仅缓存 package main（Wyatt Preul）

<a id="0.10.23"></a>

## 2013.12.12，版本 0.10.23（稳定版）

<https://github.com/nodejs/node/commit/0462bc23564e7e950a70ae4577a840b04db6c7c6>

* uv: 升级到 v0.10.20（Timothy J Fontaine）
* npm: 升级到 1.3.17（isaacs）
* gyp: 更新到 78b26f7（Timothy J Fontaine）
* build: 在 Linux 上包含 postmortem 符号（Timothy J Fontaine）
* crypto: 让 Decipher.\_flush() 触发错误。（Kai Groner）
* dgram: 修复获取已关闭 dgram 的 `fd` 时的中止问题（Fedor Indutny）
* events: 在 setMaxListeners 中不接受 NaN（Fedor Indutny）
* events: 避免将 `once` 函数调用两次（Tim Wood）
* events: 修复 removeAllListeners 中的 TypeError（Jeremy Martin）
* fs: 在 EEXIST 时报告正确的路径（Fedor Indutny）
* process: 强制 kill 使用允许的信号（Sam Roberts）
* tls: 在 .receivedShutdown 时触发 'end'（Fedor Indutny）
* tls: 修复潜在的数据损坏（Fedor Indutny）
* tls: 正确处理 `ssl.start()` 错误（Fedor Indutny）
* tls: 在 SNI 后重置 NPN 回调（Fedor Indutny）

<a id="0.10.22"></a>

## 2013.11.12，版本 0.10.22（稳定版）

<https://github.com/nodejs/node/commit/cbff8f091c22fb1df6b238c7a1b9145db950fa65>

* npm: 升级到 1.3.14
* uv: 升级到 v0.10.19
* child\_process: 不要在过期的文件描述符事件上断言（Fedor Indutny）
* darwin: 修复 Mavericks 活动监视器中的“未响应”（Fedor Indutny）
* debugger: 修复 sb() 在未命名脚本中的 bug（Maxim Bogushevich）
* repl: 不要在补全结果中插入重复项（Maciej Małecki）
* src: 修复已关闭句柄上的内存泄漏（Timothy J Fontaine）
* tls: 使用 read(0) 防止停滞（Fedor Indutny）
* v8: 在 Solaris 上使用正确的时区信息（Maciej Małecki）

<a id="0.10.21"></a>

## 2013.10.18，版本 0.10.21（稳定版）

<https://github.com/nodejs/node/commit/e2da042844a830fafb8031f6c477eb4f96195210>

* uv: 升级到 v0.10.18
* crypto: 清除 verify 失败产生的错误（Timothy J Fontaine）
* dtrace: 解析两个字节字符串（Dave Pacheco）
* fs: 修复 fs.truncate() 文件内容清零 bug（Ben Noordhuis）
* http: 为 pipeline flood 提供背压（isaacs）
* tls: 修复过早断开连接的问题（Ben Noordhuis）

<a id="0.10.20"></a>

## 2013.09.30，版本 0.10.20（稳定版）

<https://github.com/nodejs/node/commit/d7234c8d50a1af73f60d2d3c0cc7eed17429a481>

* tls: 修复偶发性卡死和部分读取（Fedor Indutny）
  * 修复 "npm ERR! cb() never called!"

<a id="0.10.19"></a>

## 2013.09.24，版本 0.10.19（稳定版）

<https://github.com/nodejs/node/commit/6b5e6a5a3ec8d994c9aab3b800b9edbf1b287904>

* uv: 升级到 v0.10.17
* npm: 升级到 1.3.11
* readline: 处理以控制字符开头的输入（Eric Schrock）
* configure: 添加 mips-float-abi（soft, hard）选项（Andrei Sedoi）
* stream: objectMode 转换允许 falsey 值（isaacs）
* tls: 防止 read 返回重复值（Nathan Rajlich）
* tls: NPN 协议现在仅限于各自连接本地（Fedor Indutny）

<a id="0.10.18"></a>

## 2013.09.04，版本 0.10.18（稳定版）

<https://github.com/nodejs/node/commit/67a1f0c52e0708e2596f3f2134b8386d6112561e>

* uv: 升级到 v0.10.15
* stream: 不要因未设置的 \_events 属性而崩溃（isaacs）
* stream: 在解码后的可写块中传递 'buffer' 编码（isaacs）

<a id="0.10.17"></a>

## 2013.08.21，版本 0.10.17（稳定版）

<https://github.com/nodejs/node/commit/469a4a5091a677df62be319675056b869c31b35c>

* uv: 升级 v0.10.14
* http\_parser: 不要将 PUN/GEM 方法接受为 PUT/GET（Chris Dickinson）
* tls: 修复 ssl 在读取时被销毁时的断言（Fedor Indutny）
* stream: 如果监听器被移除，则在 'error' 上抛出（isaacs）
* dgram: 修复在错误的 send() 参数上触发的断言（Ben Noordhuis）
* readline: 在关闭终端原始模式前暂停 stdin（Daniel Chatfield）

<a id="0.10.16"></a>

## 2013.08.16，版本 0.10.16（稳定版）

<https://github.com/nodejs/node/commit/50b4c905a4425430ae54db4906f88982309e128d>

* v8: 回移 CVE-2013-2882 的修复
* npm: 升级到 1.3.8
* crypto: 修复对格式错误的十六进制输入的 assert()（Ben Noordhuis）
* crypto: 修复 randomBytes() 错误路径中的内存泄漏（Ben Noordhuis）
* events: 修复内存泄漏，不要泄漏事件名称（Ben Noordhuis）
* http: 正确处理 hex/base64 编码（isaacs）
* http: 提升分块 res.write(buf) 性能（Ben Noordhuis）
* stream: 修复双重 pipe 错误触发（Eran Hammer）

<a id="0.10.15"></a>

## 2013.07.25，版本 0.10.15（稳定版）

<https://github.com/nodejs/node/commit/2426d65af860bda7be9f0832a99601cc43c6cf63>

* src: 修复 process.getuid() 返回值（Ben Noordhuis）

<a id="0.10.14"></a>

## 2013.07.25，版本 0.10.14（稳定版）

<https://github.com/nodejs/node/commit/fdf57f811f9683a4ec49a74dc7226517e32e6c9d>

* uv: 升级到 v0.10.13
* npm: 升级到 v1.3.5
* os: 不要在 cpu info 中报告负时间（Ben Noordhuis）
* fs: 处理大的 UID 和 GID（Ben Noordhuis）
* url: 修复协议为非小写时的边界情况（Shuan Wang）
* doc: Streams API 文档重写（isaacs）
* node: 在所有 domain 情况下调用 MakeDomainCallback（Trevor Norris）
* crypto: 修复 LoadPKCS12 中的内存泄漏（Fedor Indutny）

<a id="0.10.13"></a>

## 2013.07.09，版本 0.10.13（稳定版）

<https://github.com/nodejs/node/commit/e32660a984427d46af6a144983cf7b8045b7299c>

* uv: 升级到 v0.10.12
* npm: 升级到 1.3.2
* windows: 获取正确的 errno（Ben Noordhuis）
* tls: 仅在我们尚未看到 finish 时才等待它（Timothy J Fontaine）
* http: 在请求被中止时转储响应（isaacs）
* http: 使用 unref'd 定时器修复退出延迟（Peter Rust）
* zlib: level 可以为负数（Brian White）
* zlib: 允许 level 和 strategy 为零值（Brian White）
* buffer: 添加解释 buffer 对齐的注释（Ben Noordhuis）
* string\_bytes: 正确检测 64 位（Timothy J Fontaine）
* src: 修复 UsingDomains() 中的内存泄漏（Ben Noordhuis）

<a id="0.10.12"></a>

## 2013.06.18，版本 0.10.12（稳定版）

<https://github.com/nodejs/node/commit/a088cf4f930d3928c97d239adf950ab43e7794aa>

* npm: 升级到 1.2.32
* readline: 让 `ctrl + L` 清空屏幕（Yuan Chuan）
* v8: 添加 setVariableValue 调试器命令（Ben Noordhuis）
* net: 不要在写入中途销毁 socket（isaacs）
* v8: 修复 mips32r2 架构的构建问题（Andrei Sedoi）
* configure: 修复交叉编译的 host_arch_cc()（Andrei Sedoi）

<a id="0.10.11"></a>

## 2013.06.13，版本 0.10.11（稳定版）

<https://github.com/nodejs/node/commit/d9d5bc465450ae5d60da32e9ffcf71c2767f1fad>

* uv: 升级到 0.10.11
* npm: 升级到 1.2.30
* openssl: 为 MIPS 添加缺失的配置部分（Andrei Sedoi）
* Revert "http: remove bodyHead from 'upgrade' events"（isaacs）
* v8: 修复指针运算未定义行为（Trevor Norris）
* crypto: 修复 utf8/utf-8 编码检查（Ben Noordhuis）
* net: 修复旧版 Linux 内核上 POLLERR|POLLHUP 导致的忙循环（Ben Noordhuis, isaacs）

<a id="0.10.10"></a>

## 2013.06.04，版本 0.10.10（稳定版）

<https://github.com/nodejs/node/commit/25e51c396aa23018603baae2b1d9390f5d9db496>

* uv: 升级到 0.10.10
* npm: 升级到 1.2.25
* url: 正确解析某些奇怪格式的 urls（isaacs）
* stream: unshift('') 是一个 noop（isaacs）

<a id="0.10.9"></a>

## 2013.05.30，版本 0.10.9（稳定版）

<https://github.com/nodejs/node/commit/878ffdbe6a8eac918ef3a7f13925681c3778060b>

* npm: 升级到 1.2.24
* uv: 升级到 v0.10.9
* repl: 修复 JSON.parse 错误检查（Brian White）
* tls: 正确的 .destroySoon（Fedor Indutny）
* tls: 仅在对侧读取端关闭后调用 write cb（Fedor Indutny）
* tls: 忽略 .shutdown() 系统调用错误（Fedor Indutny）

<a id="0.10.8"></a>

## 2013.05.24，版本 0.10.8（稳定版）

<https://github.com/nodejs/node/commit/30d9e9fdd9d4c33d3d95a129d021cd8b5b91eddb>

* v8: 更新到 3.14.5.9
* uv: 升级到 0.10.8
* npm: 升级到 1.2.23
* http: 从 'upgrade' 事件中移除 bodyHead（Nathan Zadoks）
* http: 空写入时返回 true，而不是 false（isaacs）
* http: 节省往返，將 buffer 转换为字符串（Ben Noordhuis）
* configure: 一致地遵守 --dest-os 标志（Nathan Rajlich）
* buffer: 在写入超出 buffer 时抛出（Trevor Norris）
* crypto: 在 DiffieHellman 密钥错误后清除错误（isaacs）
* string\_bytes: 去除 base64 字符串中的填充（Trevor Norris）

<a id="0.10.7"></a>

## 2013.05.17，版本 0.10.7（稳定版）

<https://github.com/nodejs/node/commit/d2fdae197ac542f686ee06835d1153dd43b862e5>

* uv: 升级到 v0.10.7
* npm: 升级到 1.2.21
* crypto: 不要忽略 verify 编码参数（isaacs）
* buffer, crypto: 修复默认编码回归（Ben Noordhuis）
* timers: 修复 setInterval() 断言（Ben Noordhuis）

<a id="0.10.6"></a>

## 2013.05.14，版本 0.10.6（稳定版）

<https://github.com/nodejs/node/commit/5deb1672f2b5794f8be19498a425ea4dc0b0711f>

* module: 弃用 require.extensions（isaacs）
* stream: 使 Readable.wrap 支持 objectMode、空流（Daniel Moore）
* child\_process: 修复句柄传递（Ben Noordhuis）
* crypto: 修复性能回归（isaacs）
* src: DRY 字符串编码/解码（isaacs）

<a id="0.10.5"></a>

## 2013.04.23，版本 0.10.5（稳定版）

<https://github.com/nodejs/node/commit/deeaf8fab978e3cadb364e46fb32dafdebe5f095>

* uv: 升级到 0.10.5（isaacs）
* build: 增加对 Visual Studio 2012 的支持（Miroslav Bajtoš）
* http: 不要尝试销毁不存在的 socket（isaacs）
* crypto: 将 LazyTransform 用于属性，而不是方法（isaacs）
* assert: 将信息放入 err.message，而不是 err.name（Ryan Doenges）
* dgram: 修复没有地址的 bind()（Ben Noordhuis）
* handle\_wrap: 修复 NULL 指针解引用（Ben Noordhuis）
* os: 修复 os.type() 中不太可能发生的缓冲区溢出（Ben Noordhuis）
* stream: 修复 unshift() 竞态条件（isaacs）

<a id="0.10.4"></a>

## 2013.04.11，版本 0.10.4（稳定版）

<https://github.com/nodejs/node/commit/9712aa9f76073c30850b20a188b1ed12ffb74d17>

* uv: 升级到 0.10.4
* npm: 升级到 1.2.18
* v8: 避免 JSON.parse 中过度的内存增长（Fedor Indutny）
* child\_process, cluster: 修复 cmd 字符串的 O(n\*m) 扫描（Ben Noordhuis）
* net: 修复 socket.bytesWritten 对 Buffers 的支持（Fedor Indutny）
* buffer: 修复偏移检查（Łukasz Walukiewicz）
* stream: 在 finish 事件之前调用 write 回调（isaacs）
* http: 支持 write(data, 'hex')（isaacs）
* crypto: dh secret 应该左侧填充（Fedor Indutny）
* process: 在 process.versions 中暴露 NODE\_MODULE\_VERSION（Rod Vagg）
* crypto: 修复 crypto streams 中的构造函数调用（Andreas Madsen）
* net: 在 .byteLength 中考虑编码（Fedor Indutny）
* net: 修复 bytesWritten 中的 buffer 迭代（Fedor Indutny）
* crypto: 写入 0 字节时，零不是错误（Fedor Indutny）
* tls: 重新启用证书验证中 CN-ID 的检查（Tobias Müllerleile）

<a id="0.10.3"></a>

## 2013.04.03，版本 0.10.3（稳定版）

<https://github.com/nodejs/node/commit/d4982f6f5e4a9a703127489a553b8d782997ea43>

* npm: 升级到 1.2.17
* child\_process: 确认已发送的 handles（Fedor Indutny）
* etw: 更新原型以匹配 dtrace provider（Timothy J Fontaine）
* dtrace: 向探针传递更多参数（Dave Pacheco）
* build: 允许在 osx 上使用 dtrace 构建（Dave Pacheco）
* http: 移除遗留的 ECONNRESET 变通代码（isaacs）
* http: 确保客户端响应结束时进行 socket 清理（isaacs）
* tls: 当加密侧关闭时销毁 socket（isaacs）
* repl: isSyntaxError() 捕获 "strict mode" 错误（Nathan Rajlich）
* crypto: 向 ctor 调用传递 options（isaacs）
* src: 将 process.versions.uv 绑定到 uv\_version\_string()（Ben Noordhuis）

<a id="0.10.2"></a>

## 2013.03.28，版本 0.10.2（稳定版）

<https://github.com/nodejs/node/commit/1e0de9c426e07a260bbec2d2196c2d2db8eb8886>

* npm: 升级到 1.2.15
* uv: 升级到 0.10.3
* tls: 处理 SSL\_ERROR\_ZERO\_RETURN（Fedor Indutny）
* tls: 在调用 C++ 方法之前处理错误（Fedor Indutny）
* tls: 移除有害且不必要的边界检查（Marcel Laverdet）
* crypto: 让 getCiphers() 返回非 SSL 密码套件（Ben Noordhuis）
* crypto: 检查 randomBytes() 的 size 参数（Ben Noordhuis）
* timers: 不要计算 Timeout.\_when 属性（Alexey Kupershtokh）
* timers: 修复 off-by-one ms 错误（Alexey Kupershtokh）
* timers: 在 enroll() 中处理有符号 int32 溢出（Fedor Indutny）
* stream: 在非常特定的条件下修复 Transform 中的停滞（Gil Pedersen）
* stream: 处理较晚添加的 'readable' 事件监听器（isaacs）
* stream: 修复零长度写入时 Writables 的过早结束（isaacs）
* domain: 修复来自 MakeCallback 的 domain 回调（Trevor Norris）
* child\_process: 不要重复触发同一个 handle 两次（Ben Noordhuis）
* child\_process: 修复向子进程发送 utf-8（Ben Noordhuis）

<a id="0.10.1"></a>

## 2013.03.21，版本 0.10.1（稳定版）

<https://github.com/nodejs/node/commit/c274d1643589bf104122674a8c3fd147527a667d>

* npm: 升级到 1.2.15
* crypto: 提升非流式 API 的性能（Fedor Indutny）
* tls: 在处理后始终重置 this.ssl.error（Fedor Indutny）
* tls: 防止流中途卡住（Fedor Indutny, isaacs）
* net: 改进对任意 TCP socket 的支持（Ben Noordhuis）
* net: 仅在 'connect' 之后处理 'finish' 事件（Fedor Indutny）
* http: 不要为大 buffer 在热路径上调用 end()（isaacs）
* fs: 缺少 cb 的错误已被弃用，而不是抛出异常（isaacs）
* fs: 使 write/appendFileSync 正确设置文件模式（Raymond Feng）
* stream: 从 readable.wrap 返回自身（isaacs）
* stream: 永远不要多次调用 decoder.end()（Gil Pedersen）
* windows: 允许通过 process.on('SIGXYZ') 监听信号（Bert Belder）
* node: 恢复移除 MakeCallback 的改动（Trevor Norris）
* node: 在 handle fd getter 中取消包装而不终止程序（isaacs）

<a id="0.10.0"></a>

## 2013.03.11，版本 0.10.0（稳定版）

<https://github.com/nodejs/node/commit/163ca274230fce536afe76c64676c332693ad7c1>

* npm: 升级到 1.2.14
* core: 在 windows 的 dlopen 中正确追加文件名（isaacs）
* zlib: 合理管理 flush 标志（isaacs）
* domains: 处理嵌套错误处理器中抛出的错误（isaacs）
* buffer: 转换为 ascii 时去除高位（Ben Noordhuis）
* win/msi: 启用修改和修复（Bert Belder）
* win/msi: 为各种 node 部件添加功能选择（Bert Belder）
* win/msi: 使用一致的注册表键路径（Bert Belder）
* child\_process: 支持发送 dgram socket（Andreas Madsen）
* fs: 在 Windows 上对目录调用 fs.write/read 时抛出 EISDIR（isaacs）
* unix: 修复 strict aliasing 警告，将函数宏化（Ben Noordhuis）
* unix: 遵循 UV\_THREADPOOL\_SIZE 环境变量（Ben Noordhuis）
* win/tty: 修正颜色属性枚举中的拼写错误（Bert Belder）
* win/tty: 不要触碰插入模式或快速编辑模式（Bert Belder）
