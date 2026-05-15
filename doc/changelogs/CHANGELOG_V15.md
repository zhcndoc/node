# Node.js 15 变更日志

<!--lint disable maximum-line-length no-literal-urls prohibited-strings-->

<table>
<tr>
<th>当前版本</th>
</tr>
<tr>
<td>
<a href="#15.14.0">15.14.0</a><br/>
<a href="#15.13.0">15.13.0</a><br/>
<a href="#15.12.0">15.12.0</a><br/>
<a href="#15.11.0">15.11.0</a><br/>
<a href="#15.10.0">15.10.0</a><br/>
<a href="#15.9.0">15.9.0</a><br/>
<a href="#15.8.0">15.8.0</a><br/>
<a href="#15.7.0">15.7.0</a><br/>
<a href="#15.6.0">15.6.0</a><br/>
<a href="#15.5.1">15.5.1</a><br/>
<a href="#15.5.0">15.5.0</a><br/>
<a href="#15.4.0">15.4.0</a><br/>
<a href="#15.3.0">15.3.0</a><br/>
<a href="#15.2.1">15.2.1</a><br/>
<a href="#15.2.0">15.2.0</a><br/>
<a href="#15.1.0">15.1.0</a><br/>
<a href="#15.0.1">15.0.1</a><br/>
<a href="#15.0.0">15.0.0</a><br/>
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
  * [0.10.x](CHANGELOG_V010.md)
  * [io.js](CHANGELOG_IOJS.md)
  * [存档](CHANGELOG_ARCHIVE.md)

<a id="15.14.0"></a>

## 2021-04-06，版本 15.14.0（当前版本），@mylesborins

这是一个安全发布版本。

### 显著变更

已修复的漏洞：

* **CVE-2021-3450**: OpenSSL - 使用 X509\_V\_FLAG\_X509\_STRICT 绕过 CA 证书检查（高）
  * 这是 OpenSSL 中的一个漏洞，可能会通过 Node.js 被利用。你可以在 <https://www.openssl.org/news/secadv/20210325.txt> 阅读更多相关信息
  * 影响范围：
    * 15.x、14.x、12.x 和 10.x 所有版本分支
* **CVE-2021-3449**: OpenSSL - signature\_algorithms 处理中的空指针解引用（高）
  * 这是 OpenSSL 中的一个漏洞，可能会通过 Node.js 被利用。你可以在 <https://www.openssl.org/news/secadv/20210325.txt> 阅读更多相关信息
  * 影响范围：
    * 15.x、14.x、12.x 和 10.x 所有版本分支
* **CVE-2020-7774**: npm 升级 - 更新 y18n 以修复原型污染（高）
  * 这是 npm 模块 y18n 中的一个漏洞，可能会被原型污染利用。你可以在 <https://github.com/advisories/GHSA-c4w7-xm78-47vh> 阅读更多相关信息
  * 影响范围：
    * 14.x、12.x 和 10.x 所有版本分支

其他显著变更：

* \[[`b6f4901221`](https://github.com/nodejs/node/commit/b6f4901221)] - **(SEMVER-MINOR)** **fs**: 为 `fsPromises.writeFile` 添加对异步迭代器的支持 (HiroyukiYagihashi) [#37490](https://github.com/nodejs/node/pull/37490)
* \[[`0709cbb7fe`](https://github.com/nodejs/node/commit/0709cbb7fe)] - **(SEMVER-MINOR)** **net**: 允许 net.BlockList 使用 net.SocketAddress 对象 (James M Snell) [#37917](https://github.com/nodejs/node/pull/37917)
* \[[`daa8a7bbcf`](https://github.com/nodejs/node/commit/daa8a7bbcf)] - **(SEMVER-MINOR)** **net**: 添加 SocketAddress 类 (James M Snell) [#37917](https://github.com/nodejs/node/pull/37917)
* \[[`a4169ce519`](https://github.com/nodejs/node/commit/a4169ce519)] - **(SEMVER-MINOR)** **net**: 使 net.BlockList 可克隆 (James M Snell) [#37917](https://github.com/nodejs/node/pull/37917)
* \[[`669b81c68b`](https://github.com/nodejs/node/commit/669b81c68b)] - **(SEMVER-MINOR)** **net,tls**: 为 connect 添加中止信号支持 (Nitzan Uziely) [#37735](https://github.com/nodejs/node/pull/37735)
* \[[`a1123f0a29`](https://github.com/nodejs/node/commit/a1123f0a29)] - **(SEMVER-MINOR)** **readline**: 为接口添加 AbortSignal 支持 (Nitzan Uziely) [#37932](https://github.com/nodejs/node/pull/37932)

### 提交

* \[[`ac69b95e47`](https://github.com/nodejs/node/commit/ac69b95e47)] - **crypto**: 使用正确的 webcrypto RSASSA-PKCS1-v1\_5 算法名称 (Filip Skokan) [#38029](https://github.com/nodejs/node/pull/38029)
* \[[`960c6be229`](https://github.com/nodejs/node/commit/960c6be229)] - **crypto**: 为 randomInt 添加缓冲 (Tobias Nießen) [#35110](https://github.com/nodejs/node/pull/35110)
* \[[`4ef102d34e`](https://github.com/nodejs/node/commit/4ef102d34e)] - **deps**: 更新到 cjs-module-lexer\@1.1.1 (Guy Bedford) [#37992](https://github.com/nodejs/node/pull/37992)
* \[[`f0e77149a4`](https://github.com/nodejs/node/commit/f0e77149a4)] - **deps**: 为 OpenSSL-1.1.1k 更新 archs 文件 (Hassaan Pasha) [#37916](https://github.com/nodejs/node/pull/37916)
* \[[`bbdcdad2c6`](https://github.com/nodejs/node/commit/bbdcdad2c6)] - **deps**: 将 openssl 源码升级到 1.1.1k+quic (Hassaan Pasha) [#37916](https://github.com/nodejs/node/pull/37916)
* \[[`913ec56798`](https://github.com/nodejs/node/commit/913ec56798)] - **deps**: cjs-module-lexer: 选择性回移植 22093e765f (pezhmanparsaee) [#37895](https://github.com/nodejs/node/pull/37895)
* \[[`afc6ab2122`](https://github.com/nodejs/node/commit/afc6ab2122)] - **doc**: 修复 asyncLocalStorage.run() 的描述 (Darkripper214) [#38023](https://github.com/nodejs/node/pull/38023)
* \[[`b40d35d649`](https://github.com/nodejs/node/commit/b40d35d649)] - **doc**: 文档说明在使用 readline.Interface 时如何取消引用 stdin (Anu Pasumarthy) [#38019](https://github.com/nodejs/node/pull/38019)
* \[[`ce14080473`](https://github.com/nodejs/node/commit/ce14080473)] - **doc**: 将 psmarshall 转为名誉协作者 (Peter Marshall) [#37994](https://github.com/nodejs/node/pull/37994)
* \[[`ae70aa3c63`](https://github.com/nodejs/node/commit/ae70aa3c63)] - **doc**: 为链接中的代码元素添加醒目的颜色 (Antoine du Hamel) [#37950](https://github.com/nodejs/node/pull/37950)
* \[[`8792c7c96b`](https://github.com/nodejs/node/commit/8792c7c96b)] - **doc**: 补充缺失的 events.on 元数据 (Anna Henningsen) [#37965](https://github.com/nodejs/node/pull/37965)
* \[[`a57dc06adf`](https://github.com/nodejs/node/commit/a57dc06adf)] - **doc**: 改进 Buffer 的编码文档 (Michaël Zasso) [#37945](https://github.com/nodejs/node/pull/37945)
* \[[`f3fabb57cf`](https://github.com/nodejs/node/commit/f3fabb57cf)] - **doc**: 补充 OpenSSL 升级中缺失的清理步骤 (Tobias Nießen) [#37927](https://github.com/nodejs/node/pull/37927)
* \[[`13c3924af8`](https://github.com/nodejs/node/commit/13c3924af8)] - **doc**: 为 subprocess.kill() 添加 Windows 特定信息 (João Lucas Lucchetta) [#34867](https://github.com/nodejs/node/pull/34867)
* \[[`b6f4901221`](https://github.com/nodejs/node/commit/b6f4901221)] - **(SEMVER-MINOR)** **fs**: 为 `fsPromises.writeFile` 添加对异步迭代器的支持 (HiroyukiYagihashi) [#37490](https://github.com/nodejs/node/pull/37490)
* \[[`ad7e34446c`](https://github.com/nodejs/node/commit/ad7e34446c)] - **fs**: 修复 chown 中止问题 (Darshan Sen) [#38004](https://github.com/nodejs/node/pull/38004)
* \[[`d86aca9a77`](https://github.com/nodejs/node/commit/d86aca9a77)] - **http**: 正确优化调试函数 (Michaël Zasso) [#37966](https://github.com/nodejs/node/pull/37966)
* \[[`062541aae5`](https://github.com/nodejs/node/commit/062541aae5)] - **http2**: 为自定义帧添加特定错误代码 (Anna Henningsen) [#37936](https://github.com/nodejs/node/pull/37936)
* \[[`8525231902`](https://github.com/nodejs/node/commit/8525231902)] - **lib**: 更改 lib/domain.js 注释中的措辞 (Akhil Marsonya) [#37933](https://github.com/nodejs/node/pull/37933)
* \[[`21e399be4c`](https://github.com/nodejs/node/commit/21e399be4c)] - **lib**: 更改 lib/internal/child\_process 注释中的措辞 (Akhil Marsonya) [#37903](https://github.com/nodejs/node/pull/37903)
* \[[`3ab9619e56`](https://github.com/nodejs/node/commit/3ab9619e56)] - **module**: 改进无效 data URL 的错误消息 (Antoine du Hamel) [#37701](https://github.com/nodejs/node/pull/37701)
* \[[`0709cbb7fe`](https://github.com/nodejs/node/commit/0709cbb7fe)] - **(SEMVER-MINOR)** **net**: 允许 net.BlockList 使用 net.SocketAddress 对象 (James M Snell) [#37917](https://github.com/nodejs/node/pull/37917)
* \[[`daa8a7bbcf`](https://github.com/nodejs/node/commit/daa8a7bbcf)] - **(SEMVER-MINOR)** **net**: 添加 SocketAddress 类 (James M Snell) [#37917](https://github.com/nodejs/node/pull/37917)
* \[[`a4169ce519`](https://github.com/nodejs/node/commit/a4169ce519)] - **(SEMVER-MINOR)** **net**: 使 net.BlockList 可克隆 (James M Snell) [#37917](https://github.com/nodejs/node/pull/37917)
* \[[`669b81c68b`](https://github.com/nodejs/node/commit/669b81c68b)] - **(SEMVER-MINOR)** **net,tls**: 为 connect 添加中止信号支持 (Nitzan Uziely) [#37735](https://github.com/nodejs/node/pull/37735)
* \[[`a94cc27cbe`](https://github.com/nodejs/node/commit/a94cc27cbe)] - **path**: 重构以使用更多 primordials (Akhil Marsonya) [#37893](https://github.com/nodejs/node/pull/37893)
* \[[`6cc1e15669`](https://github.com/nodejs/node/commit/6cc1e15669)] - **readline**: 修复预先中止的 signal 问题处理 (Nitzan Uziely) [#37929](https://github.com/nodejs/node/pull/37929)
* \[[`a1123f0a29`](https://github.com/nodejs/node/commit/a1123f0a29)] - **(SEMVER-MINOR)** **readline**: 为接口添加 AbortSignal 支持 (Nitzan Uziely) [#37932](https://github.com/nodejs/node/pull/37932)
* \[[`629e72e9f4`](https://github.com/nodejs/node/commit/629e72e9f4)] - **src**: 修复 node\_mutex 中的拼写错误 (Tobias Nießen) [#38011](https://github.com/nodejs/node/pull/38011)
* \[[`e61cc0bfb0`](https://github.com/nodejs/node/commit/e61cc0bfb0)] - **src**: 修复 crypto 注释中的拼写错误 (Tobias Nießen) [#38024](https://github.com/nodejs/node/pull/38024)
* \[[`6ad0b6f0f5`](https://github.com/nodejs/node/commit/6ad0b6f0f5)] - **src**: 修复 CryptoJob::ToResult 的错误处理 (Tobias Nießen) [#37076](https://github.com/nodejs/node/pull/37076)
* \[[`3175559bed`](https://github.com/nodejs/node/commit/3175559bed)] - **test**: 在测试失败输出中添加额外空格 (Qingyu Deng) [#37957](https://github.com/nodejs/node/pull/37957)
* \[[`0243376cfc`](https://github.com/nodejs/node/commit/0243376cfc)] - **test**: 对 rss 使用更快的变体 (Pooja D P) [#36839](https://github.com/nodejs/node/pull/36839)
* \[[`b02c352ad6`](https://github.com/nodejs/node/commit/b02c352ad6)] - **test**: 修复 OpenSSL 3 的 test-tls-no-sslv3 (Richard Lau) [#38027](https://github.com/nodejs/node/pull/38027)
* \[[`0db1a1eacf`](https://github.com/nodejs/node/commit/0db1a1eacf)] - **test**: 消除 test-fs-read-optional-params 的不稳定性 (Luigi Pinca) [#37991](https://github.com/nodejs/node/pull/37991)
* \[[`4d50975cd7`](https://github.com/nodejs/node/commit/4d50975cd7)] - **test**: 提高 ALS-enable-disable.js 的清晰度 (Darkripper214) [#38008](https://github.com/nodejs/node/pull/38008)
* \[[`5e15ae05d0`](https://github.com/nodejs/node/commit/5e15ae05d0)] - **test**: 为 v8 serdes 添加 DataView 测试用例 (Rich Trott) [#37955](https://github.com/nodejs/node/pull/37955)
* \[[`6d28a24f1c`](https://github.com/nodejs/node/commit/6d28a24f1c)] - **tools**: 将 ESLint 更新到 7.23.0 (Luigi Pinca) [#37979](https://github.com/nodejs/node/pull/37979)
* \[[`51e7a33d54`](https://github.com/nodejs/node/commit/51e7a33d54)] - **tools,doc**: 在目录中添加“legacy”徽章 (Antoine du Hamel) [#37949](https://github.com/nodejs/node/pull/37949)
* \[[`570fbcef93`](https://github.com/nodejs/node/commit/570fbcef93)] - **url**: 禁止 URL 主机中的竖线符号 (Darshan Sen) [#37877](https://github.com/nodejs/node/pull/37877)

<a id="15.13.0"></a>

## 2021-03-31，版本 15.13.0（当前），@ruyadorno

### 重要变更

* **buffer**:
  * 实现 btoa 和 atob (James M Snell) [#37529](https://github.com/nodejs/node/pull/37529)
* **deps**:
  * 将 npm 升级到 7.7.6 (Ruy Adorno) [#37968](https://github.com/nodejs/node/pull/37968)
    * 此更新为 [`npm run`](https://github.com/npm/cli/pull/2864) 和 [`npm exec`](https://github.com/npm/cli/pull/2886) 增加了 workspaces 支持
* **doc**:
  * 在稳定性索引中添加 legacy 状态 (James M Snell) [#37784](https://github.com/nodejs/node/pull/37784)
  * 将 @linkgoron 添加为协作者 (Nitzan Uziely) [#37817](https://github.com/nodejs/node/pull/37817)
* **http**:
  * 添加 http.ClientRequest.getRawHeaderNames() (simov) [#37660](https://github.com/nodejs/node/pull/37660)

### 提交

* \[[`dc9cd43d8f`](https://github.com/nodejs/node/commit/dc9cd43d8f)] - **(SEMVER-MINOR)** **buffer**: 实现 btoa 和 atob (James M Snell) [#37529](https://github.com/nodejs/node/pull/37529)
* \[[`377830fd28`](https://github.com/nodejs/node/commit/377830fd28)] - **child_process**: 移除未使用的参数 (Rich Trott) [#37923](https://github.com/nodejs/node/pull/37923)
* \[[`cdfc1c8692`](https://github.com/nodejs/node/commit/cdfc1c8692)] - **child_process**: 清理 AbortSignal 重复定义 (Nitzan Uziely) [#37823](https://github.com/nodejs/node/pull/37823)
* \[[`95aa032413`](https://github.com/nodejs/node/commit/95aa032413)] - **(SEMVER-MINOR)** **child_process**: 为 spawn 和 fork 添加超时 (Nitzan Uziely) [#37256](https://github.com/nodejs/node/pull/37256)
* \[[`50fc6b9df0`](https://github.com/nodejs/node/commit/50fc6b9df0)] - **crypto**: 清除 SignTraits::DeriveBits 中的错误 (Filip Skokan) [#37820](https://github.com/nodejs/node/pull/37820)
* \[[`79259389a1`](https://github.com/nodejs/node/commit/79259389a1)] - **crypto**: 修复 DiffieHellman 参数验证 (Antoine du Hamel) [#37810](https://github.com/nodejs/node/pull/37810)
* \[[`11d45855cd`](https://github.com/nodejs/node/commit/11d45855cd)] - **crypto**: 修复头部名称 (Jiawen Geng) [#37792](https://github.com/nodejs/node/pull/37792)
* \[[`c37806d0ba`](https://github.com/nodejs/node/commit/c37806d0ba)] - **crypto**: 为 NodeCryptoError 使用宏映射 (Darshan Sen) [#37758](https://github.com/nodejs/node/pull/37758)
* \[[`bfe3f21ee0`](https://github.com/nodejs/node/commit/bfe3f21ee0)] - **crypto**: 修复在使用私钥对象时 crypto.verify 回调的调用 (Filip Skokan) [#37795](https://github.com/nodejs/node/pull/37795)
* \[[`f09c033faf`](https://github.com/nodejs/node/commit/f09c033faf)] - **deps**: 回移植 v8 f19142e6 (Guy Bedford) [#37864](https://github.com/nodejs/node/pull/37864)
* \[[`2fd97ce687`](https://github.com/nodejs/node/commit/2fd97ce687)] - **deps**: v8 回移植 9689b17687b (Guy Bedford) [#37865](https://github.com/nodejs/node/pull/37865)
* \[[`f2cef54b6f`](https://github.com/nodejs/node/commit/f2cef54b6f)] - **deps**: 将 npm 升级到 7.7.6 (Ruy Adorno) [#37968](https://github.com/nodejs/node/pull/37968)
* \[[`ec82feb728`](https://github.com/nodejs/node/commit/ec82feb728)] - **deps**: 将 npm 升级到 7.7.5 (Ruy Adorno) [#37919](https://github.com/nodejs/node/pull/37919)
* \[[`649e04c4a5`](https://github.com/nodejs/node/commit/649e04c4a5)] - **deps**: 将 npm 升级到 7.7.4 (Ruy Adorno) [#37897](https://github.com/nodejs/node/pull/37897)
* \[[`d5b472b70d`](https://github.com/nodejs/node/commit/d5b472b70d)] - **deps**: 将 npm 升级到 7.7.0 (Ruy Adorno) [#37879](https://github.com/nodejs/node/pull/37879)
* \[[`9e6aa190e3`](https://github.com/nodejs/node/commit/9e6aa190e3)] - **deps**: 添加 ngtcp2 和 nghttp3 (James M Snell) [#37682](https://github.com/nodejs/node/pull/37682)
* \[[`659fc5d684`](https://github.com/nodejs/node/commit/659fc5d684)] - **doc**: 修复 lib/internal/bootstrap/pre_execution.js 中的拼写错误 (marsonya) [#37658](https://github.com/nodejs/node/pull/37658)
* \[[`ac60d018e2`](https://github.com/nodejs/node/commit/ac60d018e2)] - **doc**: 为 release 文档添加更多 cherry-pick 和 changelog 命令 (Danielle Adams) [#37785](https://github.com/nodejs/node/pull/37785)
* \[[`0fe3c7edd3`](https://github.com/nodejs/node/commit/0fe3c7edd3)] - **doc**: 在首次出现时拼写出 ICU 缩写全称 (Rich Trott) [#37942](https://github.com/nodejs/node/pull/37942)
* \[[`364c8ac40d`](https://github.com/nodejs/node/commit/364c8ac40d)] - **doc**: 更新 GOVERNANCE.md 以反映 TSC Charter 的变更 (Rich Trott) [#37888](https://github.com/nodejs/node/pull/37888)
* \[[`e84252b35d`](https://github.com/nodejs/node/commit/e84252b35d)] - **doc**: 减少 async_hooks.md 中的标题嵌套层级 (Rich Trott) [#37839](https://github.com/nodejs/node/pull/37839)
* \[[`a6f21e2cfc`](https://github.com/nodejs/node/commit/a6f21e2cfc)] - **doc**: 修正 outgoingMessage.write 中的措辞 (Tobias Nießen) [#37894](https://github.com/nodejs/node/pull/37894)
* \[[`30bc2e43e4`](https://github.com/nodejs/node/commit/30bc2e43e4)] - **doc**: 为 WHATWG URL 对象添加示例 (James M Snell) [#37822](https://github.com/nodejs/node/pull/37822)
* \[[`c0a424f3e9`](https://github.com/nodejs/node/commit/c0a424f3e9)] - **doc**: 澄清何时不会触发 child process 的 'spawn' 事件 (Matthew Francis Brunetti) [#37833](https://github.com/nodejs/node/pull/37833)
* \[[`9defe10371`](https://github.com/nodejs/node/commit/9defe10371)] - **doc**: 修复 legacy 稳定性指示器的显示 (Rich Trott) [#37838](https://github.com/nodejs/node/pull/37838)
* \[[`f97a5dd22f`](https://github.com/nodejs/node/commit/f97a5dd22f)] - **doc**: 在模板标题中使用句子式大小写 (Rich Trott) [#37837](https://github.com/nodejs/node/pull/37837)
* \[[`71fde07274`](https://github.com/nodejs/node/commit/71fde07274)] - **doc**: 将 Ayase-252 添加为 triager (Qingyu Deng) [#37781](https://github.com/nodejs/node/pull/37781)
* \[[`8f18133de0`](https://github.com/nodejs/node/commit/8f18133de0)] - **doc**: 在 issues.md 标题中使用句子式大小写 (marsonya) [#37537](https://github.com/nodejs/node/pull/37537)
* \[[`3376051a0e`](https://github.com/nodejs/node/commit/3376051a0e)] - **doc**: 修复 JS 语言风格选择 (Antoine du Hamel) [#37791](https://github.com/nodejs/node/pull/37791)
* \[[`b09d032683`](https://github.com/nodejs/node/commit/b09d032683)] - **doc**: 将 Derek Lewis 重新移回协作者列表 (Derek Lewis) [#37726](https://github.com/nodejs/node/pull/37726)
* \[[`6da0a0e85a`](https://github.com/nodejs/node/commit/6da0a0e85a)] - **doc**: 应用 legacy 状态样式 (James M Snell) [#37784](https://github.com/nodejs/node/pull/37784)
* \[[`185d4cd4aa`](https://github.com/nodejs/node/commit/185d4cd4aa)] - **doc**: 撤销对 legacy url 的弃用，将状态改为 legacy (James M Snell) [#37784](https://github.com/nodejs/node/pull/37784)
* \[[`9d160daa89`](https://github.com/nodejs/node/commit/9d160daa89)] - **doc**: 在稳定性索引中添加 legacy 状态 (James M Snell) [#37784](https://github.com/nodejs/node/pull/37784)
* \[[`4700042a9b`](https://github.com/nodejs/node/commit/4700042a9b)] - **doc**: 将 @linkgoron 添加为协作者 (Nitzan Uziely) [#37817](https://github.com/nodejs/node/pull/37817)
* \[[`c4183bbea4`](https://github.com/nodejs/node/commit/c4183bbea4)] - **doc**: 修复 timers 的 AbortError 示例 (dbachko) [#37738](https://github.com/nodejs/node/pull/37738)
* \[[`50f3ad1946`](https://github.com/nodejs/node/commit/50f3ad1946)] - **doc**: 修复 stream 文档中的拼写错误 (Ian Kerins) [#37716](https://github.com/nodejs/node/pull/37716)
* \[[`2e82a97520`](https://github.com/nodejs/node/commit/2e82a97520)] - **doc**: 添加 gyp 维护信息 (Jiawen Geng) [#37765](https://github.com/nodejs/node/pull/37765)
* \[[`3925458df7`](https://github.com/nodejs/node/commit/3925458df7)] - **doc,tools**: 每个页面只使用一个一级标题 (Rich Trott) [#37839](https://github.com/nodejs/node/pull/37839)
* \[[`e9c161ce12`](https://github.com/nodejs/node/commit/e9c161ce12)] - **http**: 修复重复注册 AbortSignal (Nitzan Uziely) [#37730](https://github.com/nodejs/node/pull/37730)
* \[[`a5205819d8`](https://github.com/nodejs/node/commit/a5205819d8)] - **(SEMVER-MINOR)** **http**: 添加 http.ClientRequest.getRawHeaderNames() (simov) [#37660](https://github.com/nodejs/node/pull/37660)
* \[[`1c043272ea`](https://github.com/nodejs/node/commit/1c043272ea)] - **http2**: 将非 EOF 的空帧视为其他无效帧一样处理 (Anna Henningsen) [#37875](https://github.com/nodejs/node/pull/37875)
* \[[`a5bf7de6eb`](https://github.com/nodejs/node/commit/a5bf7de6eb)] - **http2**: 修复在 handle 存在之前设置选项的问题 (Anna Henningsen) [#37875](https://github.com/nodejs/node/pull/37875)
* \[[`af7489cb6c`](https://github.com/nodejs/node/commit/af7489cb6c)] - **lib**: 为 AbortController 和 AbortSignal 添加 brand 检查 (Mattias Buelens) [#37720](https://github.com/nodejs/node/pull/37720)
* \[[`6e2b60931c`](https://github.com/nodejs/node/commit/6e2b60931c)] - **lib**: 修复 internal/modules/esm/module_job.js 中的拼写错误 (marsonya) [#37773](https://github.com/nodejs/node/pull/37773)
* \[[`3a440ecdf8`](https://github.com/nodejs/node/commit/3a440ecdf8)] - **lib**: 修复 lib/internal/crypto/certificate.js 中的拼写错误 (marsonya) [#37741](https://github.com/nodejs/node/pull/37741)
* \[[`3ab223dd32`](https://github.com/nodejs/node/commit/3ab223dd32)] - **node-api**: 修复 finalization 中的崩溃 (Michael Dawson) [#37876](https://github.com/nodejs/node/pull/37876)
* \[[`d1a3e0efb6`](https://github.com/nodejs/node/commit/d1a3e0efb6)] - **node-api**: 在环境拆除期间停止 ref gc (Gabriel Schulhof) [#37616](https://github.com/nodejs/node/pull/37616)
* \[[`e60bd1a7dc`](https://github.com/nodejs/node/commit/e60bd1a7dc)] - **(SEMVER-MINOR)** **perf_hooks**: 使 Performance 继承 EventTarget (Michaël Zasso) [#37621](https://github.com/nodejs/node/pull/37621)
* \[[`b6ad8e4cc1`](https://github.com/nodejs/node/commit/b6ad8e4cc1)] - **src**: 正确缩进较长的帮助文本 (David Glasser) [#37911](https://github.com/nodejs/node/pull/37911)
* \[[`13ecff63d6`](https://github.com/nodejs/node/commit/13ecff63d6)] - **src**: 记录 --unhandled-rejections 标志的新取值 (David Glasser) [#37899](https://github.com/nodejs/node/pull/37899)
* \[[`bd87e195ed`](https://github.com/nodejs/node/commit/bd87e195ed)] - **src**: 修复 src 代码指南中的拼写错误 (Tobias Nießen) [#37956](https://github.com/nodejs/node/pull/37956)
* \[[`2da532cef8`](https://github.com/nodejs/node/commit/2da532cef8)] - **src**: 正确报告空闲时间 (Stephen Belanger) [#37868](https://github.com/nodejs/node/pull/37868)
* \[[`836cb67945`](https://github.com/nodejs/node/commit/836cb67945)] - **src**: 添加 .note.GNU-stack 区段 (James Addison) [#37688](https://github.com/nodejs/node/pull/37688)
* \[[`9557dda2eb`](https://github.com/nodejs/node/commit/9557dda2eb)] - **(SEMVER-MINOR)** **stream**: pipeline 接受 Buffer 作为有效的第一个参数 (Nitzan Uziely) [#37739](https://github.com/nodejs/node/pull/37739)
* \[[`43c3b43ea3`](https://github.com/nodejs/node/commit/43c3b43ea3)] - **stream**: 提升 Readable.from 的性能 (wwwzbwcom) [#37609](https://github.com/nodejs/node/pull/37609)
* \[[`b0226b39f2`](https://github.com/nodejs/node/commit/b0226b39f2)] - **test**: 将 promisified timers 测试拆分以便统计覆盖率 (Rich Trott) [#37943](https://github.com/nodejs/node/pull/37943)
* \[[`e256c4d11d`](https://github.com/nodejs/node/commit/e256c4d11d)] - **test**: 修复 typeof 比较 (Rich Trott) [#37924](https://github.com/nodejs/node/pull/37924)
* \[[`76ebc4bbd9`](https://github.com/nodejs/node/commit/76ebc4bbd9)] - **test**: 为 test-worker-resource-limits 中的内存增加余量 (Rich Trott) [#37901](https://github.com/nodejs/node/pull/37901)
* \[[`5cdeb76708`](https://github.com/nodejs/node/commit/5cdeb76708)] - **test**: 为 tls-passphrase 添加 OpenSSL 3.0 检查 (Daniel Bevenius) [#37860](https://github.com/nodejs/node/pull/37860)
* \[[`33c35a38dc`](https://github.com/nodejs/node/commit/33c35a38dc)] - **test**: 为 test-crypto-keygen 添加 OpenSSL 3.0 检查 (Daniel Bevenius) [#37860](https://github.com/nodejs/node/pull/37860)
* \[[`86bf341a35`](https://github.com/nodejs/node/commit/86bf341a35)] - **test**: 修复 test-doctool-html 中的弃用警告 (Antoine du Hamel) [#37858](https://github.com/nodejs/node/pull/37858)
* \[[`aa529b73b7`](https://github.com/nodejs/node/commit/aa529b73b7)] - **test**: 修复 ibmi 跳过信息 (Tobias Nießen) [#37821](https://github.com/nodejs/node/pull/37821)
* \[[`d9ab1d56ce`](https://github.com/nodejs/node/commit/d9ab1d56ce)] - **test**: 修复不稳定的 test-vm-timeout-escape-promise-module-2 (Rich Trott) [#37842](https://github.com/nodejs/node/pull/37842)
* \[[`5d4c610727`](https://github.com/nodejs/node/commit/5d4c610727)] - **test**: 移除 eventtarget 的重复测试 (himself65) [#37853](https://github.com/nodejs/node/pull/37853)
* \[[`44490af948`](https://github.com/nodejs/node/commit/44490af948)] - **test**: 放宽 test-fs-utimes-y2K38 中的 Y2K38 检查 (Richard Lau) [#37825](https://github.com/nodejs/node/pull/37825)
* \[[`9bc6fe7eb3`](https://github.com/nodejs/node/commit/9bc6fe7eb3)] - **test**: 移除对不支持的 AIX 版本的引用 (Richard Lau) [#37826](https://github.com/nodejs/node/pull/37826)
* \[[`f07428ae51`](https://github.com/nodejs/node/commit/f07428ae51)] - **test**: 移除对已修复的 test-benchmark-fs 的跳过 (Rich Trott) [#37803](https://github.com/nodejs/node/pull/37803)
* \[[`9f61cbd1fd`](https://github.com/nodejs/node/commit/9f61cbd1fd)] - **test**: 考虑 heapsnapshot-near-heap-limit 测试中的 OOM 风险 (Joyee Cheung) [#37761](https://github.com/nodejs/node/pull/37761)
* \[[`e85f311cf2`](https://github.com/nodejs/node/commit/e85f311cf2)] - **test**: 重构代码以使用 AbortSignal.abort() (Wassim Chegham) [#37798](https://github.com/nodejs/node/pull/37798)
* \[[`6ed9e0bd81`](https://github.com/nodejs/node/commit/6ed9e0bd81)] - **test**: 改进 test-arm-math-illegal-instruction (marsonya) [#37670](https://github.com/nodejs/node/pull/37670)
* \[[`505f9c95d1`](https://github.com/nodejs/node/commit/505f9c95d1)] - **(SEMVER-MINOR)** **test**: 添加 atob Web 平台测试 (James M Snell) [#37529](https://github.com/nodejs/node/pull/37529)
* \[[`a8edf1aafe`](https://github.com/nodejs/node/commit/a8edf1aafe)] - **test**: 为 #13683 添加 known_issues 测试 (Rich Trott) [#37744](https://github.com/nodejs/node/pull/37744)
* \[[`4487483d9d`](https://github.com/nodejs/node/commit/4487483d9d)] - **test**: 修复非 Y2K38 文件系统上的 test-fs-utimes (Rich Trott) [#37707](https://github.com/nodejs/node/pull/37707)
* \[[`d44b268910`](https://github.com/nodejs/node/commit/d44b268910)] - **timers**: 修复对任意对象调用 clearImmediate 时的错误 (Nitzan Uziely) [#37824](https://github.com/nodejs/node/pull/37824)
* \[[`b7e7384109`](https://github.com/nodejs/node/commit/b7e7384109)] - **tools**: 改进 valid-typeof 规则 (Rich Trott) [#37924](https://github.com/nodejs/node/pull/37924)
* \[[`ca93e52783`](https://github.com/nodejs/node/commit/ca93e52783)] - **tools**: 简化 eslint comma-dangle 配置 (tools) (Rich Trott) [#37883](https://github.com/nodejs/node/pull/37883)
* \[[`b5879efef1`](https://github.com/nodejs/node/commit/b5879efef1)] - **tools**: 改进 macos-firewall.sh 输出 (Rich Trott) [#37846](https://github.com/nodejs/node/pull/37846)
* \[[`dbc4804468`](https://github.com/nodejs/node/commit/dbc4804468)] - **tools**: 简化 eslint comma-dangle 配置 (Rich Trott) [#37850](https://github.com/nodejs/node/pull/37850)
* \[[`0f2e142946`](https://github.com/nodejs/node/commit/0f2e142946)] - **tools**: 使 genv8constants.py 兼容 Python 3 (Michaël Zasso) [#37835](https://github.com/nodejs/node/pull/37835)
* \[[`b6be472456`](https://github.com/nodejs/node/commit/b6be472456)] - **tools**: 为 CMake 更新 gitignore (Jiawen Geng) [#37793](https://github.com/nodejs/node/pull/37793)
* \[[`2227aa61ea`](https://github.com/nodejs/node/commit/2227aa61ea)] - **tools**: 在 shared_openssl 中部分检测 quic 支持 (James M Snell) [#37682](https://github.com/nodejs/node/pull/37682)
* \[[`01dcf4d1d8`](https://github.com/nodejs/node/commit/01dcf4d1d8)] - **tools**: 将 ESLint 更新到 7.22.0 (Colin Ihrig) [#37734](https://github.com/nodejs/node/pull/37734)
* \[[`3452618905`](https://github.com/nodejs/node/commit/3452618905)] - **tty**: 验证文件描述符以避免 int32 溢出 (Antoine du Hamel) [#37809](https://github.com/nodejs/node/pull/37809)
* \[[`d33f446abd`](https://github.com/nodejs/node/commit/d33f446abd)] - **util**: 移除不可达的 inspect 代码 (Rich Trott) [#37941](https://github.com/nodejs/node/pull/37941)

<a id="15.12.0"></a>

## 2021-03-17，版本 15.12.0（当前），@danielleadams

### 重要变更

* **crypto**:
  * 为 crypto.sign 和 crypto.verify 添加可选回调（Filip Skokan） [#37500](https://github.com/nodejs/node/pull/37500)
  * 在 create\*Key 中支持 JWK 对象（Filip Skokan） [#37254](https://github.com/nodejs/node/pull/37254)
* **deps**:
  * 将 openssl 切换为 quictls/openssl（James M Snell） [#37601](https://github.com/nodejs/node/pull/37601)
  * 更新到 cjs-module-lexer\@1.1.0（Guy Bedford） [#37712](https://github.com/nodejs/node/pull/37712)
* **fs**:
  * 提升 fsPromises writeFile 性能（Nitzan Uziely） [#37610](https://github.com/nodejs/node/pull/37610)
  * 提升 fsPromises readFile 性能（Nitzan Uziely） [#37608](https://github.com/nodejs/node/pull/37608)
* **lib**:
  * 实现 AbortSignal.abort()（James M Snell） [#37693](https://github.com/nodejs/node/pull/37693)
* **node-api**:
  * 定义版本 8（Gabriel Schulhof） [#37652](https://github.com/nodejs/node/pull/37652)
* **worker**:
  * 添加 setEnvironmentData/getEnvironmentData（James M Snell） [#37486](https://github.com/nodejs/node/pull/37486)

### 提交

* \[[`44514600b2`](https://github.com/nodejs/node/commit/44514600b2)] - **assert,util**: 修复可交换性边缘情况（Ruben Bridgewater） [#37711](https://github.com/nodejs/node/pull/37711)
* \[[`8666d777cc`](https://github.com/nodejs/node/commit/8666d777cc)] - **benchmark**: 为 fsPromises.writeFile 添加基准测试（Nitzan Uziely） [#37610](https://github.com/nodejs/node/pull/37610)
* \[[`e9028eb646`](https://github.com/nodejs/node/commit/e9028eb646)] - **cluster**: 重构为 cluster 子进程使用相同的原型（Yash Ladha） [#36610](https://github.com/nodejs/node/pull/36610)
* \[[`8e1257e26d`](https://github.com/nodejs/node/commit/8e1257e26d)] - **cluster**: 澄清构造 Handle（Jackson Tian） [#37385](https://github.com/nodejs/node/pull/37385)
* \[[`341ee31e15`](https://github.com/nodejs/node/commit/341ee31e15)] - **crypto**: 整合重复代码（James M Snell） [#37704](https://github.com/nodejs/node/pull/37704)
* \[[`a2d08d5dfd`](https://github.com/nodejs/node/commit/a2d08d5dfd)] - **crypto**: 添加内部错误代码（Darshan Sen） [#37650](https://github.com/nodejs/node/pull/37650)
* \[[`922f2f0eb2`](https://github.com/nodejs/node/commit/922f2f0eb2)] - **(SEMVER-MINOR)** **crypto**: 为 crypto.sign 和 crypto.verify 添加可选回调（Filip Skokan） [#37500](https://github.com/nodejs/node/pull/37500)
* \[[`55e522ca23`](https://github.com/nodejs/node/commit/55e522ca23)] - **(SEMVER-MINOR)** **crypto**: 在 create\*Key 中支持 JWK 对象（Filip Skokan） [#37254](https://github.com/nodejs/node/pull/37254)
* \[[`33180fad81`](https://github.com/nodejs/node/commit/33180fad81)] - **crypto**: 为 INVALID\_KEY\_TYPE 添加单独的错误（Darshan Sen） [#37555](https://github.com/nodejs/node/pull/37555)
* \[[`d81b9af1fc`](https://github.com/nodejs/node/commit/d81b9af1fc)] - **crypto**: 提升 randomUUID 性能（Dawid Rusnak） [#37243](https://github.com/nodejs/node/pull/37243)
* \[[`23d654105f`](https://github.com/nodejs/node/commit/23d654105f)] - **crypto,test**: 通过 webcrypto 测试提升 hmac 覆盖率（obi-el） [#37571](https://github.com/nodejs/node/pull/37571)
* \[[`dfca2fac24`](https://github.com/nodejs/node/commit/dfca2fac24)] - **(SEMVER-MINOR)** **deps**: 更新到 cjs-module-lexer\@1.1.0（Guy Bedford） [#37712](https://github.com/nodejs/node/pull/37712)
* \[[`ce357c0c11`](https://github.com/nodejs/node/commit/ce357c0c11)] - **(SEMVER-MINOR)** **deps**: 为 OpenSSL-1.1.1+quic 更新 archs 文件（James M Snell） [#37601](https://github.com/nodejs/node/pull/37601)
* \[[`6d77b6174f`](https://github.com/nodejs/node/commit/6d77b6174f)] - **(SEMVER-MINOR)** **deps**: 将 openssl 切换为 quictls/openssl（James M Snell） [#37601](https://github.com/nodejs/node/pull/37601)
* \[[`3e1a46a6a8`](https://github.com/nodejs/node/commit/3e1a46a6a8)] - **deps**: 将 npm 升级到 7.6.3（Ruy Adorno） [#37721](https://github.com/nodejs/node/pull/37721)
* \[[`b2fd00398c`](https://github.com/nodejs/node/commit/b2fd00398c)] - **deps**: V8: 选取 1648e050cade（Colin Ihrig） [#37664](https://github.com/nodejs/node/pull/37664)
* \[[`7422453072`](https://github.com/nodejs/node/commit/7422453072)] - **deps**: 将 npm 升级到 7.6.1（Ruy Adorno） [#37606](https://github.com/nodejs/node/pull/37606)
* \[[`89f3aa92b4`](https://github.com/nodejs/node/commit/89f3aa92b4)] - **doc**: 将 marsonya 添加为 triager（marsonya） [#37667](https://github.com/nodejs/node/pull/37667)
* \[[`3710857de3`](https://github.com/nodejs/node/commit/3710857de3)] - **doc**: 为 http.request() 选项添加提示（Luigi Pinca） [#37745](https://github.com/nodejs/node/pull/37745)
* \[[`5d793737d7`](https://github.com/nodejs/node/commit/5d793737d7)] - **(SEMVER-MINOR)** **doc**: 更新 maintaining-openssl 指南（James M Snell） [#37601](https://github.com/nodejs/node/pull/37601)
* \[[`1022d3d947`](https://github.com/nodejs/node/commit/1022d3d947)] - **doc**: 建议先检查 abortSignal.aborted（James M Snell） [#37714](https://github.com/nodejs/node/pull/37714)
* \[[`764aa2dcee`](https://github.com/nodejs/node/commit/764aa2dcee)] - **doc**: 修复指向 googletest fixtures 的链接（Tobias Nießen） [#37698](https://github.com/nodejs/node/pull/37698)
* \[[`0d3cc2dc82`](https://github.com/nodejs/node/commit/0d3cc2dc82)] - **doc**: 修复 close 事件描述中的拼写错误（Tobias Nießen） [#37662](https://github.com/nodejs/node/pull/37662)
* \[[`e55058fed1`](https://github.com/nodejs/node/commit/e55058fed1)] - **doc**: 在 README.md 标题中使用句首大写格式（marsonya） [#37645](https://github.com/nodejs/node/pull/37645)
* \[[`e7fc7a4c23`](https://github.com/nodejs/node/commit/e7fc7a4c23)] - **doc**: crypto esm 示例（James M Snell） [#37594](https://github.com/nodejs/node/pull/37594)
* \[[`a3abd52e1e`](https://github.com/nodejs/node/commit/a3abd52e1e)] - **doc**: 为 http.request() 选项添加 localPort（Luigi Pinca） [#37586](https://github.com/nodejs/node/pull/37586)
* \[[`705bdfbe3e`](https://github.com/nodejs/node/commit/705bdfbe3e)] - **doc**: 修复 http 文档中的语法错误（Qingyu Deng） [#37265](https://github.com/nodejs/node/pull/37265)
* \[[`e5f7179d1e`](https://github.com/nodejs/node/commit/e5f7179d1e)] - **doc**: 为 http.OutgoingMessage 添加文档（Qingyu Deng） [#37265](https://github.com/nodejs/node/pull/37265)
* \[[`7c0ce17e65`](https://github.com/nodejs/node/commit/7c0ce17e65)] - **doc**: 修复 doc/guides/collaborator-guide.md 中的拼写错误（marsonya） [#37643](https://github.com/nodejs/node/pull/37643)
* \[[`60d8afa9ab`](https://github.com/nodejs/node/commit/60d8afa9ab)] - **doc**: 记录 module.evaluate 的 fulfill 结果为 undefined（James M Snell） [#37663](https://github.com/nodejs/node/pull/37663)
* \[[`6192315cf3`](https://github.com/nodejs/node/commit/6192315cf3)] - **doc**: 从 dsaEncoding 描述中移除 generated（Marko Kaznovac） [#37459](https://github.com/nodejs/node/pull/37459)
* \[[`e4c8c50b28`](https://github.com/nodejs/node/commit/e4c8c50b28)] - **doc**: 修复 /doc/api/fs.md 中的拼写错误（Merlin Luntke） [#37557](https://github.com/nodejs/node/pull/37557)
* \[[`ebc6f41072`](https://github.com/nodejs/node/commit/ebc6f41072)] - **doc**: 修复 linter 问题（Antoine du Hamel） [#37657](https://github.com/nodejs/node/pull/37657)
* \[[`d17aab1775`](https://github.com/nodejs/node/commit/d17aab1775)] - **doc**: 为 assert 添加 esm 示例（James M Snell） [#37607](https://github.com/nodejs/node/pull/37607)
* \[[`366772bf87`](https://github.com/nodejs/node/commit/366772bf87)] - **doc**: 添加 readline.createInterface 的返回类型（Darshan Sen） [#37600](https://github.com/nodejs/node/pull/37600)
* \[[`f50db89a52`](https://github.com/nodejs/node/commit/f50db89a52)] - **doc**: 更改 fs JS 代码片段中的语言信息字符串（Antoine du Hamel） [#37605](https://github.com/nodejs/node/pull/37605)
* \[[`5a9196e0e4`](https://github.com/nodejs/node/commit/5a9196e0e4)] - **doc**: 将 pull-requests.md 中的标题应用句首大写格式（marsonya） [#37602](https://github.com/nodejs/node/pull/37602)
* \[[`05badcf755`](https://github.com/nodejs/node/commit/05badcf755)] - **doc**: 修复 15.11.0 发布中的小拼写错误（Tierney Cyren） [#37590](https://github.com/nodejs/node/pull/37590)
* \[[`e0e7aa1058`](https://github.com/nodejs/node/commit/e0e7aa1058)] - **doc**: 在 vm.md 中添加顶层 await 语法（Antoine du Hamel） [#37077](https://github.com/nodejs/node/pull/37077)
* \[[`732d8ca811`](https://github.com/nodejs/node/commit/732d8ca811)] - **doc**: 明确 columnOffset 仅适用于第一行（James M Snell） [#37563](https://github.com/nodejs/node/pull/37563)
* \[[`267bbe3412`](https://github.com/nodejs/node/commit/267bbe3412)] - **doc**: 说明 NODE\_EXTRA\_CA\_CERTS 只会读取一次（James M Snell） [#37562](https://github.com/nodejs/node/pull/37562)
* \[[`f56a805a0d`](https://github.com/nodejs/node/commit/f56a805a0d)] - **doc**: 重构 child\_process.md 中的 signal 信息（Darshan Sen） [#37528](https://github.com/nodejs/node/pull/37528)
* \[[`236ba04a79`](https://github.com/nodejs/node/commit/236ba04a79)] - **domain**: 为 monkey-patched emit 函数添加名称（Colin Ihrig） [#37550](https://github.com/nodejs/node/pull/37550)
* \[[`1c09776106`](https://github.com/nodejs/node/commit/1c09776106)] - **domain**: 将假值名称显示为 DEP0097 的 anonymous（Colin Ihrig） [#37550](https://github.com/nodejs/node/pull/37550)
* \[[`5a49e3139e`](https://github.com/nodejs/node/commit/5a49e3139e)] - **errors**: 从 --enable-source-maps 中移除 experimental（Benjamin Coe） [#37743](https://github.com/nodejs/node/pull/37743)
* \[[`e384291c90`](https://github.com/nodejs/node/commit/e384291c90)] - **events**: 移除 addEventListener 的返回值（James M Snell） [#37696](https://github.com/nodejs/node/pull/37696)
* \[[`ba91ef2d08`](https://github.com/nodejs/node/commit/ba91ef2d08)] - **fs**: 提升 fsPromises writeFile 性能（Nitzan Uziely） [#37610](https://github.com/nodejs/node/pull/37610)
* \[[`3572299fc2`](https://github.com/nodejs/node/commit/3572299fc2)] - **fs**: 添加 promisified readFile 基准测试（Nitzan Uziely） [#37608](https://github.com/nodejs/node/pull/37608)
* \[[`b277776845`](https://github.com/nodejs/node/commit/b277776845)] - **fs**: 提升 fsPromises readFile 性能（Nitzan Uziely） [#37608](https://github.com/nodejs/node/pull/37608)
* \[[`6688569a50`](https://github.com/nodejs/node/commit/6688569a50)] - **http**: 重构以避免不安全的数组迭代（Antoine du Hamel） [#37654](https://github.com/nodejs/node/pull/37654)
* \[[`c737df64fe`](https://github.com/nodejs/node/commit/c737df64fe)] - **http2**: 使 res.req 成为普通属性（Colin Ihrig） [#37706](https://github.com/nodejs/node/pull/37706)
* \[[`ac2f50b3fd`](https://github.com/nodejs/node/commit/ac2f50b3fd)] - **(SEMVER-MINOR)** **lib**: 实现 AbortSignal.abort()（James M Snell） [#37693](https://github.com/nodejs/node/pull/37693)
* \[[`12fb2ffc33`](https://github.com/nodejs/node/commit/12fb2ffc33)] - **lib**: 一致地使用 AbortError（James M Snell） [#37715](https://github.com/nodejs/node/pull/37715)
* \[[`e63a25e2ff`](https://github.com/nodejs/node/commit/e63a25e2ff)] - **lib**: 修复 lib/internal/http2/core.js 中的拼写错误（marsonya） [#37695](https://github.com/nodejs/node/pull/37695)
* \[[`852f53ed7e`](https://github.com/nodejs/node/commit/852f53ed7e)] - **lib**: 修复 lib/internal/bootstrap/loaders.js 中的拼写错误（marsonya） [#37644](https://github.com/nodejs/node/pull/37644)
* \[[`daa4ac54c5`](https://github.com/nodejs/node/commit/daa4ac54c5)] - **lib**: 移除数组解构的使用（Antoine du Hamel） [#36818](https://github.com/nodejs/node/pull/36818)
* \[[`ae0e76c264`](https://github.com/nodejs/node/commit/ae0e76c264)] - **module**: 重构 NativeModule 以避免不安全的数组迭代（Antoine du Hamel） [#37656](https://github.com/nodejs/node/pull/37656)
* \[[`a86334fbb9`](https://github.com/nodejs/node/commit/a86334fbb9)] - **(SEMVER-MINOR)** **node-api**: 定义版本 8（Gabriel Schulhof） [#37652](https://github.com/nodejs/node/pull/37652)
* \[[`d28ce328ed`](https://github.com/nodejs/node/commit/d28ce328ed)] - **src**: 修复 OnCloseReceived 回调的变量名（Tobias Nießen） [#37521](https://github.com/nodejs/node/pull/37521)
* \[[`d59c6de7e8`](https://github.com/nodejs/node/commit/d59c6de7e8)] - **src**: 添加错误格式化支持（Gus Caplan） [#37598](https://github.com/nodejs/node/pull/37598)
* \[[`33436e39fe`](https://github.com/nodejs/node/commit/33436e39fe)] - **src**: 使 BaseObject::is_snapshotable 成为 virtual（Anna Henningsen） [#37539](https://github.com/nodejs/node/pull/37539)
* \[[`30c62dee1c`](https://github.com/nodejs/node/commit/30c62dee1c)] - **src,test**: 支持动态链接 OpenSSL 3.0（Daniel Bevenius） [#37669](https://github.com/nodejs/node/pull/37669)
* \[[`4bf1f333c7`](https://github.com/nodejs/node/commit/4bf1f333c7)] - **stream,util**: 修复注释中的 “the the” 拼写错误（Luigi Pinca） [#37674](https://github.com/nodejs/node/pull/37674)
* \[[`1b53087541`](https://github.com/nodejs/node/commit/1b53087541)] - **(SEMVER-MINOR)** **test**: 更新 dom/abort 测试（James M Snell） [#37693](https://github.com/nodejs/node/pull/37693)
* \[[`c2cb153646`](https://github.com/nodejs/node/commit/c2cb153646)] - **(SEMVER-MINOR)** **test**: 修正测试以适配 quic openssl 版本（James M Snell） [#37601](https://github.com/nodejs/node/pull/37601)
* \[[`ede34aa128`](https://github.com/nodejs/node/commit/ede34aa128)] - **test**: 处理 wpt/test-timers 的不稳定问题（Rich Trott） [#37691](https://github.com/nodejs/node/pull/37691)
* \[[`ed32cd4e67`](https://github.com/nodejs/node/commit/ed32cd4e67)] - **test**: 修复不稳定的 test-crypto-x509（Filip Skokan） [#37709](https://github.com/nodejs/node/pull/37709)
* \[[`013b3ff2d4`](https://github.com/nodejs/node/commit/013b3ff2d4)] - **test**: 移除不必要的 V8 标志（Antoine du Hamel） [#37671](https://github.com/nodejs/node/pull/37671)
* \[[`cc48816826`](https://github.com/nodejs/node/commit/cc48816826)] - **test**: 修复获取 JSON 数据的 WPT URL 测试（Michaël Zasso） [#37624](https://github.com/nodejs/node/pull/37624)
* \[[`b0ed1e790e`](https://github.com/nodejs/node/commit/b0ed1e790e)] - **test**: 改进 test-child-process-pipe-dataflow 的错误报告（Rich Trott） [#37632](https://github.com/nodejs/node/pull/37632)
* \[[`f7edb07ec2`](https://github.com/nodejs/node/commit/f7edb07ec2)] - **test**: 在测试完成后终止 WPT workers（Michaël Zasso） [#37627](https://github.com/nodejs/node/pull/37627)
* \[[`b7ef829dac`](https://github.com/nodejs/node/commit/b7ef829dac)] - **test**: 忽略测试结束后的 WPT worker 错误（Michaël Zasso） [#37626](https://github.com/nodejs/node/pull/37626)
* \[[`257b1ab225`](https://github.com/nodejs/node/commit/257b1ab225)] - **test**: 更新 Web Platform Tests（Michaël Zasso） [#37620](https://github.com/nodejs/node/pull/37620)
* \[[`1f6341852f`](https://github.com/nodejs/node/commit/1f6341852f)] - **test**: 移除 test-async-hooks-http-parser-destroy 的 FLAKY 状态（Rich Trott） [#37636](https://github.com/nodejs/node/pull/37636)
* \[[`044fd2fc86`](https://github.com/nodejs/node/commit/044fd2fc86)] - **test**: 移除已修复测试的 FLAKY 状态（Rich Trott） [#37633](https://github.com/nodejs/node/pull/37633)
* \[[`d5ff50d2a7`](https://github.com/nodejs/node/commit/d5ff50d2a7)] - **test**: 清除 test-stream-pipeline-http2 的 flaky 标记（Rich Trott） [#37631](https://github.com/nodejs/node/pull/37631)
* \[[`381fb98061`](https://github.com/nodejs/node/commit/381fb98061)] - **test**: 清除 test-http2-pipe 的 FLAKY 标记（Rich Trott） [#37631](https://github.com/nodejs/node/pull/37631)
* \[[`0582c51754`](https://github.com/nodejs/node/commit/0582c51754)] - **test**: 修复 32 位系统上的 wasi/test-return-on-exit（Colin Ihrig） [#37615](https://github.com/nodejs/node/pull/37615)
* \[[`0d04b6c043`](https://github.com/nodejs/node/commit/0d04b6c043)] - **test**: 修复不稳定的 test-child-process-exec-abortcontroller-promisified（Antoine du Hamel） [#37572](https://github.com/nodejs/node/pull/37572)
* \[[`a44daff34d`](https://github.com/nodejs/node/commit/a44daff34d)] - **test**: 更新所有 Web Platform Tests（Michaël Zasso） [#37467](https://github.com/nodejs/node/pull/37467)
* \[[`c09bd77daf`](https://github.com/nodejs/node/commit/c09bd77daf)] - **test**: 重新下载具有正确编码的 wpt fixtures（Michaël Zasso） [#37467](https://github.com/nodejs/node/pull/37467)
* \[[`57319770bb`](https://github.com/nodejs/node/commit/57319770bb)] - **test,crypto**: 确保 webcrypto 测试中的 promises 被 resolve（Antoine du Hamel） [#37653](https://github.com/nodejs/node/pull/37653)
* \[[`2d9b624668`](https://github.com/nodejs/node/commit/2d9b624668)] - **tls**: 重构以避免不安全的数组迭代（Antoine du Hamel） [#37655](https://github.com/nodejs/node/pull/37655)
* \[[`72af5d9895`](https://github.com/nodejs/node/commit/72af5d9895)] - **tools**: 仅在默认分支中解析 changelogs（Antoine du Hamel） [#37768](https://github.com/nodejs/node/pull/37768)
* \[[`bd62771a22`](https://github.com/nodejs/node/commit/bd62771a22)] - **tools**: 在更新脚本中使用捆绑的 npm（Ruy Adorno） [#37613](https://github.com/nodejs/node/pull/37613)
* \[[`4de3b8483a`](https://github.com/nodejs/node/commit/4de3b8483a)] - **tools**: 将 glob-parent 更新到 5.1.2（Rich Trott） [#37646](https://github.com/nodejs/node/pull/37646)
* \[[`ec71a0f817`](https://github.com/nodejs/node/commit/ec71a0f817)] - **tools**: 检查 changelogs 中 YAML 注释里的版本号（Antoine du Hamel） [#37599](https://github.com/nodejs/node/pull/37599)
* \[[`07fc61b900`](https://github.com/nodejs/node/commit/07fc61b900)] - **tools**: 添加对 mjs 和 cjs JS 代码片段 linting 的支持（Antoine du Hamel） [#37311](https://github.com/nodejs/node/pull/37311)
* \[[`440c944420`](https://github.com/nodejs/node/commit/440c944420)] - **tools**: 修复 prefer-assert-methods.js 中的对象名称（Tobias Nießen） [#37544](https://github.com/nodejs/node/pull/37544)
* \[[`7042ec89f1`](https://github.com/nodejs/node/commit/7042ec89f1)] - **tools**: 将 remark-preset-lint-node 更新到 2.1.1（Rich Trott） [#37604](https://github.com/nodejs/node/pull/37604)
* \[[`82e78f7c12`](https://github.com/nodejs/node/commit/82e78f7c12)] - **tools**: 修复 inspector\_protocol 中的编译器警告（Darshan Sen） [#37573](https://github.com/nodejs/node/pull/37573)
* \[[`fd7234c52f`](https://github.com/nodejs/node/commit/fd7234c52f)] - **tools**: 使 update-eslint.sh 能与 npm\@7 配合工作（Luigi Pinca） [#37566](https://github.com/nodejs/node/pull/37566)
* \[[`057c6a842a`](https://github.com/nodejs/node/commit/057c6a842a)] - **tools**: 添加 ESLint 规则 no-array-destructuring（Antoine du Hamel） [#36818](https://github.com/nodejs/node/pull/36818)
* \[[`25a5f0b3b8`](https://github.com/nodejs/node/commit/25a5f0b3b8)] - **tools**: 更新 eslint-plugin-markdown 配置（Colin Ihrig） [#37549](https://github.com/nodejs/node/pull/37549)
* \[[`7a1de1fce9`](https://github.com/nodejs/node/commit/7a1de1fce9)] - **tools**: 将 ESLint 更新到 7.21.0（Luigi Pinca） [#37546](https://github.com/nodejs/node/pull/37546)
* \[[`9c0ca4689d`](https://github.com/nodejs/node/commit/9c0ca4689d)] - **tools,doc**: 添加对多种 JS 代码片段风格的支持（Antoine du Hamel） [#37162](https://github.com/nodejs/node/pull/37162)
* \[[`80af610d95`](https://github.com/nodejs/node/commit/80af610d95)] - **util**: 按对象字面量中所写形式检查 __proto__ 键（Anna Henningsen） [#37713](https://github.com/nodejs/node/pull/37713)
* \[[`0d135e8316`](https://github.com/nodejs/node/commit/0d135e8316)] - **(SEMVER-MINOR)** **worker**: 添加 setEnvironmentData/getEnvironmentData（James M Snell） [#37486](https://github.com/nodejs/node/pull/37486)
* \[[`8024ffbba4`](https://github.com/nodejs/node/commit/8024ffbba4)] - **worker**: 为 MessageEvents 添加 ports 属性（Anna Henningsen） [#37538](https://github.com/nodejs/node/pull/37538)
* \[[`f4fd3fb6a7`](https://github.com/nodejs/node/commit/f4fd3fb6a7)] - **worker**: 在 receiveMessageOnPort 中允许 BroadcastChannel（Anna Henningsen） [#37535](https://github.com/nodejs/node/pull/37535)

<a id="15.11.0"></a>

## 2021-03-03，版本 15.11.0（当前），@targos

### 显著变化

* \[[`a3e3156b52`](https://github.com/nodejs/node/commit/a3e3156b52)] - **(SEMVER-MINOR)** **crypto**: 使与 FIPS 相关的选项始终可用（Vít Ondruch）[#36341](https://github.com/nodejs/node/pull/36341)
* \[[`9ba5c0f9ba`](https://github.com/nodejs/node/commit/9ba5c0f9ba)] - **(SEMVER-MINOR)** **errors**: 从 --enable-source-maps 中移除 experimental（Benjamin Coe）[#37362](https://github.com/nodejs/node/pull/37362)

### 提交

* \[[`d039e6fa80`](https://github.com/nodejs/node/commit/d039e6fa80)] - **assert**: 重构以避免不安全的数组迭代（Antoine du Hamel）[#37344](https://github.com/nodejs/node/pull/37344)
* \[[`d2e5529e08`](https://github.com/nodejs/node/commit/d2e5529e08)] - **bootstrap**: 将 v8 模块包含到内置快照中（Joyee Cheung）[#36943](https://github.com/nodejs/node/pull/36943)
* \[[`59861bac0e`](https://github.com/nodejs/node/commit/59861bac0e)] - **bootstrap**: 将 fs 模块包含到内置快照中（Joyee Cheung）[#36943](https://github.com/nodejs/node/pull/36943)
* \[[`458a4108b7`](https://github.com/nodejs/node/commit/458a4108b7)] - **buffer**: 使 Blob 的构造函数更符合规范（Michaël Zasso）[#37361](https://github.com/nodejs/node/pull/37361)
* \[[`0d564ce214`](https://github.com/nodejs/node/commit/0d564ce214)] - **buffer**: 使 Blob 的 slice 方法更符合规范（Michaël Zasso）[#37361](https://github.com/nodejs/node/pull/37361)
* \[[`ddae112133`](https://github.com/nodejs/node/commit/ddae112133)] - **child\_process**: 修复 spawn 和 fork 的中止行为（Nitzan Uziely）[#37325](https://github.com/nodejs/node/pull/37325)
* \[[`b1e188de8d`](https://github.com/nodejs/node/commit/b1e188de8d)] - **crypto**: 重构 hasAnyNotIn 以避免不安全的数组迭代（Antoine du Hamel）[#37433](https://github.com/nodejs/node/pull/37433)
* \[[`291d9e9936`](https://github.com/nodejs/node/commit/291d9e9936)] - **crypto**: 检查 ed/x webcrypto 密钥导入算法名称（Filip Skokan）[#37305](https://github.com/nodejs/node/pull/37305)
* \[[`a3e3156b52`](https://github.com/nodejs/node/commit/a3e3156b52)] - **(SEMVER-MINOR)** **crypto**: 使与 FIPS 相关的选项始终可用（Vít Ondruch）[#36341](https://github.com/nodejs/node/pull/36341)
* \[[`b634469c38`](https://github.com/nodejs/node/commit/b634469c38)] - **crypto**: 重构以避免不安全的数组迭代（Antoine du Hamel）[#37364](https://github.com/nodejs/node/pull/37364)
* \[[`01773ab614`](https://github.com/nodejs/node/commit/01773ab614)] - **crypto**: 使用与 BoringSSL 兼容的错误（Shelley Vohr）[#37297](https://github.com/nodejs/node/pull/37297)
* \[[`f3d67000a0`](https://github.com/nodejs/node/commit/f3d67000a0)] - **deps**: 将 npm 升级到 7.6.0（Ruy Adorno）[#37559](https://github.com/nodejs/node/pull/37559)
* \[[`e1045f1004`](https://github.com/nodejs/node/commit/e1045f1004)] - **deps**: 将 npm 升级到 7.5.6（Ruy Adorno）[#37496](https://github.com/nodejs/node/pull/37496)
* \[[`80d3c118f4`](https://github.com/nodejs/node/commit/80d3c118f4)] - **deps**: V8: 挑选提交 373f4ae739ee（Richard Lau）[#37505](https://github.com/nodejs/node/pull/37505)
* \[[`1408de7e24`](https://github.com/nodejs/node/commit/1408de7e24)] - **deps**: 从 V8 上游挑选提交 8957d4677aa794c230577f234071af0（Antoine du Hamel）[#37471](https://github.com/nodejs/node/pull/37471)
* \[[`725d48ae77`](https://github.com/nodejs/node/commit/725d48ae77)] - **doc**: 从 --enable-source-maps 中移除 experimental（Colin Ihrig）[#37540](https://github.com/nodejs/node/pull/37540)
* \[[`5d939b7a49`](https://github.com/nodejs/node/commit/5d939b7a49)] - **doc**: 修复 doc/api/packages.md 中的拼写错误（marsonya）[#37536](https://github.com/nodejs/node/pull/37536)
* \[[`cbfc6b1692`](https://github.com/nodejs/node/commit/cbfc6b1692)] - **doc**: 文档说明如何为快照注册外部绑定（Joyee Cheung）[#37463](https://github.com/nodejs/node/pull/37463)
* \[[`dd7a04dc9f`](https://github.com/nodejs/node/commit/dd7a04dc9f)] - **doc**: 修复 "director" 而不是 "directory" 的拼写错误（humanwebpl）[#37523](https://github.com/nodejs/node/pull/37523)
* \[[`ba81e7cb5e`](https://github.com/nodejs/node/commit/ba81e7cb5e)] - **doc**: 修订 collaborator guide 中的 LTS 文本（Rich Trott）[#37527](https://github.com/nodejs/node/pull/37527)
* \[[`7529a97a5c`](https://github.com/nodejs/node/commit/7529a97a5c)] - **doc**: 修订 collaborator guide 中的 CI 文本（Rich Trott）[#37526](https://github.com/nodejs/node/pull/37526)
* \[[`1285b907ce`](https://github.com/nodejs/node/commit/1285b907ce)] - **doc**: 修订 collaborator guide 中的异议部分（Rich Trott）[#37525](https://github.com/nodejs/node/pull/37525)
* \[[`bc86208a0a`](https://github.com/nodejs/node/commit/bc86208a0a)] - **doc**: 修订 collaborator guide 中的过早披露文本（Rich Trott）[#37524](https://github.com/nodejs/node/pull/37524)
* \[[`46af56752e`](https://github.com/nodejs/node/commit/46af56752e)] - **doc**: 将顶层文档中的链接改为使用 HEAD（Michael Dawson）[#37494](https://github.com/nodejs/node/pull/37494)
* \[[`3b737e63ce`](https://github.com/nodejs/node/commit/3b737e63ce)] - **doc**: 将 doc/guides 中的标题应用句首字母大写样式（marsonya）[#37506](https://github.com/nodejs/node/pull/37506)
* \[[`fb5e5bed21`](https://github.com/nodejs/node/commit/fb5e5bed21)] - **doc**: 修复 webcrypto.md 中的拼写错误（marsonya）[#37507](https://github.com/nodejs/node/pull/37507)
* \[[`3b7cb75554`](https://github.com/nodejs/node/commit/3b7cb75554)] - **doc**: 文档说明 NO\_COLOR 和 FORCE\_COLOR 环境变量（James M Snell）[#37477](https://github.com/nodejs/node/pull/37477)
* \[[`0fac27d546`](https://github.com/nodejs/node/commit/0fac27d546)] - **doc**: 添加 url.resolve 替代示例（Antoine du Hamel）[#37501](https://github.com/nodejs/node/pull/37501)
* \[[`2228f44b25`](https://github.com/nodejs/node/commit/2228f44b25)] - **doc**: 将指南标题应用句首字母大写样式（marsonya）[#37497](https://github.com/nodejs/node/pull/37497)
* \[[`617819e4fb`](https://github.com/nodejs/node/commit/617819e4fb)] - **doc**: 更新合并拉取请求的 CI 要求（Antoine du Hamel）[#37308](https://github.com/nodejs/node/pull/37308)
* \[[`4a40759b33`](https://github.com/nodejs/node/commit/4a40759b33)] - **doc**: 推荐使用 queueMicrotask 而不是 process.nextTick（James M Snell）[#37484](https://github.com/nodejs/node/pull/37484)
* \[[`834f63793a`](https://github.com/nodejs/node/commit/834f63793a)] - **doc**: 将 doc/guides 中的标题应用句首字母大写样式（marsonya）[#37478](https://github.com/nodejs/node/pull/37478)
* \[[`7ac0820da0`](https://github.com/nodejs/node/commit/7ac0820da0)] - **doc**: 修复 doc/api/http2/md 中的拼写错误（marsonya）[#37479](https://github.com/nodejs/node/pull/37479)
* \[[`4ad7a78448`](https://github.com/nodejs/node/commit/4ad7a78448)] - **doc**: 将 vm Module 类属性按字母顺序排序（Rich Trott）[#37451](https://github.com/nodejs/node/pull/37451)
* \[[`a193d7ca87`](https://github.com/nodejs/node/commit/a193d7ca87)] - **doc**: 将 crypto Cipher 类条目按字母顺序排序（Rich Trott）[#37450](https://github.com/nodejs/node/pull/37450)
* \[[`54b6f1bcf9`](https://github.com/nodejs/node/commit/54b6f1bcf9)] - **doc**: 在 API 文档链接中使用 HEAD（Michael Dawson）[#37437](https://github.com/nodejs/node/pull/37437)
* \[[`549d24b8ad`](https://github.com/nodejs/node/commit/549d24b8ad)] - **doc**: 修复参数对齐（Michael Dawson）[#37422](https://github.com/nodejs/node/pull/37422)
* \[[`f3559a922b`](https://github.com/nodejs/node/commit/f3559a922b)] - **doc**: 修复 doc/api/esm.md 中的拼写错误（marsonya）[#37400](https://github.com/nodejs/node/pull/37400)
* \[[`c3d236d405`](https://github.com/nodejs/node/commit/c3d236d405)] - **doc**: 修复 fs 文档中的 “referred to”（Tobias Nießen）[#37388](https://github.com/nodejs/node/pull/37388)
* \[[`9ac8c74539`](https://github.com/nodejs/node/commit/9ac8c74539)] - **doc**: 文档说明 x509 错误代码（Dan Čermák）[#37096](https://github.com/nodejs/node/pull/37096)
* \[[`9a454afcd6`](https://github.com/nodejs/node/commit/9a454afcd6)] - **doc**: 修复 esm.md 中的拼写错误（Jay Tailor）[#37417](https://github.com/nodejs/node/pull/37417)
* \[[`b3bf3d9824`](https://github.com/nodejs/node/commit/b3bf3d9824)] - **doc**: 在可能的情况下使用 HEAD 作为链接目标（Michael Dawson）[#37421](https://github.com/nodejs/node/pull/37421)
* \[[`6675342cd9`](https://github.com/nodejs/node/commit/6675342cd9)] - **doc**: 澄清 async\_hook 回调不能是 async（James M Snell）[#37384](https://github.com/nodejs/node/pull/37384)
* \[[`4b54c10500`](https://github.com/nodejs/node/commit/4b54c10500)] - **doc**: 更一致地使用 **Default:**（Colin Ihrig）[#37387](https://github.com/nodejs/node/pull/37387)
* \[[`f20ce47dbb`](https://github.com/nodejs/node/commit/f20ce47dbb)] - **doc,child\_process**: 当 `ENOENT` 时 `pid` 可以是 `undefined`（dr-js）[#37014](https://github.com/nodejs/node/pull/37014)
* \[[`6205e29cb9`](https://github.com/nodejs/node/commit/6205e29cb9)] - **doc,lib**: 为更严格的多行数组 lint 检查做准备（Rich Trott）[#37088](https://github.com/nodejs/node/pull/37088)
* \[[`9ba5c0f9ba`](https://github.com/nodejs/node/commit/9ba5c0f9ba)] - **(SEMVER-MINOR)** **errors**: 从 --enable-source-maps 中移除 experimental（Benjamin Coe）[#37362](https://github.com/nodejs/node/pull/37362)
* \[[`c0cdb83433`](https://github.com/nodejs/node/commit/c0cdb83433)] - **fs**: 修复 writeFile signal 不会关闭文件的问题（Nitzan Uziely）[#37402](https://github.com/nodejs/node/pull/37402)
* \[[`e8b1e2c0a3`](https://github.com/nodejs/node/commit/e8b1e2c0a3)] - **fs**: 修复预先中止的 writeFile AbortSignal 文件泄漏（Nitzan Uziely）[#37393](https://github.com/nodejs/node/pull/37393)
* \[[`6b42e65983`](https://github.com/nodejs/node/commit/6b42e65983)] - **fs**: 修复 fs.truncate 中的负长度问题（James M Snell）[#37483](https://github.com/nodejs/node/pull/37483)
* \[[`d141fce634`](https://github.com/nodejs/node/commit/d141fce634)] - **fs**: 在 promises.watch() 中使用 createDeferredPromise()（Colin Ihrig）[#37386](https://github.com/nodejs/node/pull/37386)
* \[[`bb81accb16`](https://github.com/nodejs/node/commit/bb81accb16)] - **lib**: 使用 \<array>.push 和 \<array>.unshift 代替 \<array>.concat（Antoine du Hamel）[#37239](https://github.com/nodejs/node/pull/37239)
* \[[`dc3c299862`](https://github.com/nodejs/node/commit/dc3c299862)] - **lib**: 移除过时的 todo 注释（Antoine du Hamel）[#37396](https://github.com/nodejs/node/pull/37396)
* \[[`856d20b772`](https://github.com/nodejs/node/commit/856d20b772)] - **lib**: 向 primordials 添加 URI 处理函数（Antoine du Hamel）[#37394](https://github.com/nodejs/node/pull/37394)
* \[[`a1ed78cb3b`](https://github.com/nodejs/node/commit/a1ed78cb3b)] - **module**: 改善对 data: URLs 的支持（Antoine du Hamel）[#37392](https://github.com/nodejs/node/pull/37392)
* \[[`27816eac61`](https://github.com/nodejs/node/commit/27816eac61)] - **node-api**: 强制 env 关闭延迟行为（Gabriel Schulhof）[#37303](https://github.com/nodejs/node/pull/37303)
* \[[`f1381f7a7a`](https://github.com/nodejs/node/commit/f1381f7a7a)] - **src**: 修复 node\_snapshotable.h 中的 alloc-dealloc-mismatch（Darshan Sen）[#37443](https://github.com/nodejs/node/pull/37443)
* \[[`5ea2ed611f`](https://github.com/nodejs/node/commit/5ea2ed611f)] - **src**: 修复 ETW\_WRITE\_EMPTY\_EVENT 宏（Michaël Zasso）[#37334](https://github.com/nodejs/node/pull/37334)
* \[[`96bcd52d3e`](https://github.com/nodejs/node/commit/96bcd52d3e)] - **src**: 禁用无法修复的 MSVC 警告（Michaël Zasso）[#37334](https://github.com/nodejs/node/pull/37334)
* \[[`c75f5f372d`](https://github.com/nodejs/node/commit/c75f5f372d)] - **src**: 避免隐式类型转换（第二次）（Michaël Zasso）[#37334](https://github.com/nodejs/node/pull/37334)
* \[[`e400f8c9c8`](https://github.com/nodejs/node/commit/e400f8c9c8)] - **src**: 支持绑定数据的序列化（Joyee Cheung）[#36943](https://github.com/nodejs/node/pull/36943)
* \[[`daad7bbd34`](https://github.com/nodejs/node/commit/daad7bbd34)] - **src**: 调整 THP sysfs 配置令牌的获取和文件关闭（James Addison）[#37187](https://github.com/nodejs/node/pull/37187)
* \[[`4cc76457d9`](https://github.com/nodejs/node/commit/4cc76457d9)] - **stream**: 将重复代码移动到内部模块（Rich Trott）[#37508](https://github.com/nodejs/node/pull/37508)
* \[[`3d3df0c005`](https://github.com/nodejs/node/commit/3d3df0c005)] - **stream**: 为 finished 添加 AbortSignal 支持（Nitzan Uziely）[#37354](https://github.com/nodejs/node/pull/37354)
* \[[`429dffd32e`](https://github.com/nodejs/node/commit/429dffd32e)] - **stream**: 为 promisified pipeline 添加 AbortSignal（Nitzan Uziely）[#37359](https://github.com/nodejs/node/pull/37359)
* \[[`9696cf7142`](https://github.com/nodejs/node/commit/9696cf7142)] - **test**: 移除 test-http2-multistream-destroy-on-read-tls 的 FLAKY 状态（Rich Trott）[#37533](https://github.com/nodejs/node/pull/37533)
* \[[`453113938d`](https://github.com/nodejs/node/commit/453113938d)] - **test**: 使状态文件名保持一致（Rich Trott）[#37532](https://github.com/nodejs/node/pull/37532)
* \[[`00b3446a8e`](https://github.com/nodejs/node/commit/00b3446a8e)] - **test**: 在 esm 测试中考虑待处理的弃用项（Rich Trott）[#37542](https://github.com/nodejs/node/pull/37542)
* \[[`f2aa305348`](https://github.com/nodejs/node/commit/f2aa305348)] - **test**: 修复错误的 timers-promisified 用例（ttzztztz）[#37425](https://github.com/nodejs/node/pull/37425)
* \[[`ce7fbbf94c`](https://github.com/nodejs/node/commit/ce7fbbf94c)] - **test**: 修复 test_node_crypto.cc 中的拼写错误（Ikko Ashimine）[#37469](https://github.com/nodejs/node/pull/37469)
* \[[`ba319f0c60`](https://github.com/nodejs/node/commit/ba319f0c60)] - **test**: 移除 test-http2-compat-client-upload-reject 的 FLAKY 状态（Rich Trott）[#37462](https://github.com/nodejs/node/pull/37462)
* \[[`dfa0440341`](https://github.com/nodejs/node/commit/dfa0440341)] - **test**: 验证 http2 没有调试信息（Michael Dawson）[#37447](https://github.com/nodejs/node/pull/37447)
* \[[`b38404ee17`](https://github.com/nodejs/node/commit/b38404ee17)] - **test**: 移除 test-http2-client-upload-reject 的 FLAKY 标记（Rich Trott）[#37461](https://github.com/nodejs/node/pull/37461)
* \[[`b569105183`](https://github.com/nodejs/node/commit/b569105183)] - **test**: 澄清 tmpdir.refresh() 的用法（Darshan Sen）[#37383](https://github.com/nodejs/node/pull/37383)
* \[[`4f41900687`](https://github.com/nodejs/node/commit/4f41900687)] - **test**: 将 upload.zip 更新为未损坏版本（Greg Ziskind）[#37294](https://github.com/nodejs/node/pull/37294)
* \[[`d5c311ed15`](https://github.com/nodejs/node/commit/d5c311ed15)] - **test**: 修复不稳定的 test-worker-prof（Rich Trott）[#37372](https://github.com/nodejs/node/pull/37372)
* \[[`df538ebc8e`](https://github.com/nodejs/node/commit/df538ebc8e)] - **test**: 修复不稳定的 test-webcrypto-encrypt-decrypt-aes（Darshan Sen）[#37380](https://github.com/nodejs/node/pull/37380)
* \[[`19d6eb929c`](https://github.com/nodejs/node/commit/19d6eb929c)] - **test**: 修复不稳定的 test-fs-promises-file-handle-read（Rich Trott）[#37371](https://github.com/nodejs/node/pull/37371)
* \[[`c554aa149c`](https://github.com/nodejs/node/commit/c554aa149c)] - **test,child\_process**: 为 `subProcess.pid` 添加检查（dr-js）[#37014](https://github.com/nodejs/node/pull/37014)
* \[[`5c27fd73b0`](https://github.com/nodejs/node/commit/5c27fd73b0)] - **tools**: 在 GitHub Actions CI 上运行 doctool 测试（Antoine du Hamel）[#37398](https://github.com/nodejs/node/pull/37398)
* \[[`49013fcee1`](https://github.com/nodejs/node/commit/49013fcee1)] - **tools**: 使 comma-dangle ESLint 规则更严格 …（Rich Trott）[#37088](https://github.com/nodejs/node/pull/37088)
* \[[`31f4600b7a`](https://github.com/nodejs/node/commit/31f4600b7a)] - **worker**: 修复 terminate() 与消息端口的交互（Anna Henningsen）[#37319](https://github.com/nodejs/node/pull/37319)
* \[[`d93137b2a9`](https://github.com/nodejs/node/commit/d93137b2a9)] - **workers**: 修复从 preload 脚本启动的问题（James M Snell）[#37481](https://github.com/nodejs/node/pull/37481)

<a id="15.10.0"></a>

## 2021-02-23，版本 15.10.0（当前），@BethGriggs

这是一个安全发布。

### 重要变更

已修复的漏洞：

* **CVE-2021-22883**：HTTP2 的 'unknownProtocol' 因资源耗尽导致拒绝服务
  * 受影响的 Node.js 版本在建立过多带有 'unknownProtocol' 的连接尝试时，容易遭受拒绝服务攻击。这会导致文件描述符泄漏。如果系统配置了文件描述符限制，服务器将无法接受新连接，并且也无法阻止进程打开例如文件等资源。如果未配置文件描述符限制，则这会导致内存被过度使用，并使系统耗尽内存。
* **CVE-2021-22884**：--inspect 中的 DNS 重绑定
  * 当白名单包含 “localhost6” 时，受影响的 Node.js 版本容易遭受拒绝服务攻击。当 “localhost6” 不存在于 /etc/hosts 中时，它只是一个通过 DNS 解析的普通域名，也就是说，是通过网络解析的。如果攻击者控制了受害者的 DNS 服务器或能够伪造其响应，则可以通过使用 “localhost6” 域名绕过 DNS 重绑定保护。只要攻击者使用 “localhost6” 域名，他们仍然可以实施 CVE-2018-7160 中描述的攻击。
* **CVE-2021-23840**：OpenSSL - CipherUpdate 中的整数溢出
  * 这是 OpenSSL 中的一个漏洞，可能通过 Node.js 被利用。你可以在这里阅读更多信息：
    <https://www.openssl.org/news/secadv/20210216.txt>

### 提交

* \[[`2a3ce5974b`](https://github.com/nodejs/node/commit/2a3ce5974b)] - **deps**：为 OpenSSL-1.1.1j 更新 archs 文件 (Daniel Bevenius) [#37412](https://github.com/nodejs/node/pull/37412)
* \[[`afbce66874`](https://github.com/nodejs/node/commit/afbce66874)] - **deps**：将 openssl 源码升级到 1.1.1j (Daniel Bevenius) [#37412](https://github.com/nodejs/node/pull/37412)
* \[[`4184806dee`](https://github.com/nodejs/node/commit/4184806dee)] - **(SEMVER-MINOR)** **http2**：添加 unknownProtocol 超时 (Daniel Bevenius) [nodejs-private/node-private#246](https://github.com/nodejs-private/node-private/pull/246)
* \[[`43ae9c46c3`](https://github.com/nodejs/node/commit/43ae9c46c3)] - **src**：删除 inspector 允许的主机 localhost6 (Matteo Collina) [nodejs-private/node-private#244](https://github.com/nodejs-private/node-private/pull/244)

<a id="15.9.0"></a>

## 2021-02-17，版本 15.9.0（当前），@danielleadams

### 重要变更

* **crypto**：
  * 添加 keyObject.export() 的 'jwk' 格式选项 (Filip Skokan) [#37081](https://github.com/nodejs/node/pull/37081)
* **deps**：
  * 升级到 libuv 1.41.0 (Colin Ihrig) [#37360](https://github.com/nodejs/node/pull/37360)
* **doc**：
  * 将 dmabupt 添加为协作者 (Xu Meng) [#37377](https://github.com/nodejs/node/pull/37377)
  * 重构 fs 文档结构 (James M Snell) [#37170](https://github.com/nodejs/node/pull/37170)
* **fs**：
  * 添加 fsPromises.watch() (James M Snell) [#37179](https://github.com/nodejs/node/pull/37179)
  * 为 fs.close() 使用默认回调 (James M Snell) [#37174](https://github.com/nodejs/node/pull/37174)
  * 为 watch 添加 AbortSignal 支持 (Benjamin Gruenbaum) [#37190](https://github.com/nodejs/node/pull/37190)
* **perf\_hooks**：
  * 引入 createHistogram (James M Snell) [#37155](https://github.com/nodejs/node/pull/37155)
* **stream**：
  * 改进 Readable.from 的错误处理 (Benjamin Gruenbaum) [#37158](https://github.com/nodejs/node/pull/37158)
* **timers**：
  * 引入 setInterval 异步迭代器 (linkgoron) [#37153](https://github.com/nodejs/node/pull/37153)
* **tls**：
  * 添加将证书/对端证书作为 X509Certificate 对象获取的能力 (James M Snell) [#37070](https://github.com/nodejs/node/pull/37070)

### 提交

* \[[`d0f1ff53ff`](https://github.com/nodejs/node/commit/d0f1ff53ff)] - **async\_hooks**：设置 unhandledRejection 的异步上下文 (Sajal Khandelwal) [#37281](https://github.com/nodejs/node/pull/37281)
* \[[`c160d88c9e`](https://github.com/nodejs/node/commit/c160d88c9e)] - **buffer**：为 Blob 添加 @@toStringTag (Colin Ihrig) [#37336](https://github.com/nodejs/node/pull/37336)
* \[[`8487184457`](https://github.com/nodejs/node/commit/8487184457)] - **child\_process**：修复错误的 abort 信号泄漏 (Nitzan Uziely) [#37257](https://github.com/nodejs/node/pull/37257)
* \[[`e28ea89b1a`](https://github.com/nodejs/node/commit/e28ea89b1a)] - **crypto**：修复 subtle.importKey JWK OKP 公钥导入 (Filip Skokan) [#37255](https://github.com/nodejs/node/pull/37255)
* \[[`55fd6b6611`](https://github.com/nodejs/node/commit/55fd6b6611)] - **crypto**：避免素数生成中的无限循环 (Tobias Nießen) [#37212](https://github.com/nodejs/node/pull/37212)
* \[[`9dac99a11a`](https://github.com/nodejs/node/commit/9dac99a11a)] - **crypto**：修复并简化素数选项验证 (Tobias Nießen) [#37164](https://github.com/nodejs/node/pull/37164)
* \[[`3e2746ff63`](https://github.com/nodejs/node/commit/3e2746ff63)] - **crypto**：移除 webcrypto “DSA” JWK 密钥类型操作 (Filip Skokan) [#37203](https://github.com/nodejs/node/pull/37203)
* \[[`011910b424`](https://github.com/nodejs/node/commit/011910b424)] - **(SEMVER-MINOR)** **crypto**：添加 keyObject.export() 的 'jwk' 格式选项 (Filip Skokan) [#37081](https://github.com/nodejs/node/pull/37081)
* \[[`c0eadef495`](https://github.com/nodejs/node/commit/c0eadef495)] - **deps**：升级到 libuv 1.41.0 (Colin Ihrig) [#37360](https://github.com/nodejs/node/pull/37360)
* \[[`50e81ba0b8`](https://github.com/nodejs/node/commit/50e81ba0b8)] - **deps**：V8：回移植 0c8b6e415c30 (Matin Zadehdolatabad) [#37276](https://github.com/nodejs/node/pull/37276)
* \[[`d1c1724c69`](https://github.com/nodejs/node/commit/d1c1724c69)] - **deps**：将 npm 升级到 7.5.3 (Ruy Adorno) [#37283](https://github.com/nodejs/node/pull/37283)
* \[[`20c65b00c2`](https://github.com/nodejs/node/commit/20c65b00c2)] - **deps**：V8：回移植 dfcf1e86fac0 (Michaël Zasso) [#37245](https://github.com/nodejs/node/pull/37245)
* \[[`e63b380f76`](https://github.com/nodejs/node/commit/e63b380f76)] - **deps**：将 npm 升级到 7.5.2 (Ruy Adorno) [#37191](https://github.com/nodejs/node/pull/37191)
* \[[`d808db2732`](https://github.com/nodejs/node/commit/d808db2732)] - **doc**：将 dmabupt 添加为协作者 (Xu Meng) [#37377](https://github.com/nodejs/node/pull/37377)
* \[[`dd054ca37f`](https://github.com/nodejs/node/commit/dd054ca37f)] - **doc**：优化 HTML 渲染 (Antoine du Hamel) [#37301](https://github.com/nodejs/node/pull/37301)
* \[[`c188466a18`](https://github.com/nodejs/node/commit/c188466a18)] - **doc**：修复 stream 文档中的引号 (Tobias Nießen) [#37269](https://github.com/nodejs/node/pull/37269)
* \[[`f5e4625468`](https://github.com/nodejs/node/commit/f5e4625468)] - **doc**：修复 crypto API 文档中的反引号 (Tobias Nießen) [#37269](https://github.com/nodejs/node/pull/37269)
* \[[`e2a2bab44e`](https://github.com/nodejs/node/commit/e2a2bab44e)] - **doc**：将 PACKAGE\_EXPORTS\_RESOLVE 链接到 ESM 部分 (Utku Gultopu) [#37135](https://github.com/nodejs/node/pull/37135)
* \[[`1e99175e01`](https://github.com/nodejs/node/commit/1e99175e01)] - **doc**：按字母顺序排列 crypto.\* 方法 (Rich Trott) [#37353](https://github.com/nodejs/node/pull/37353)
* \[[`392c86d38b`](https://github.com/nodejs/node/commit/392c86d38b)] - **doc**：在 benchmark 文档中使用句首大写格式 (Rich Trott) [#37351](https://github.com/nodejs/node/pull/37351)
* \[[`62b2648a96`](https://github.com/nodejs/node/commit/62b2648a96)] - **doc**：在 C++ 风格指南中统一使用句式大小写 (Rich Trott) [#37350](https://github.com/nodejs/node/pull/37350)
* \[[`189ce399da`](https://github.com/nodejs/node/commit/189ce399da)] - **doc**：将句式大小写应用到发布文档标题 (Rich Trott) [#37349](https://github.com/nodejs/node/pull/37349)
* \[[`610b29b8bd`](https://github.com/nodejs/node/commit/610b29b8bd)] - **doc**：修复 performanceEntry.flags 的样式格式 (Cheng Liu) [#37274](https://github.com/nodejs/node/pull/37274)
* \[[`85b1476f1d`](https://github.com/nodejs/node/commit/85b1476f1d)] - **doc**：修复 deprecations.md 中的拼写错误 (marsonya) [#37282](https://github.com/nodejs/node/pull/37282)
* \[[`f253cb9303`](https://github.com/nodejs/node/commit/f253cb9303)] - **doc**：修复 buffer.md 中的拼写错误 (marsonya) [#37268](https://github.com/nodejs/node/pull/37268)
* \[[`804e7ae713`](https://github.com/nodejs/node/commit/804e7ae713)] - **doc**：为 packages 特性添加版本元数据 (Antoine du Hamel) [#37289](https://github.com/nodejs/node/pull/37289)
* \[[`cdd2fe5651`](https://github.com/nodejs/node/commit/cdd2fe5651)] - **doc**：修复 /api/dns.md 中的拼写错误 (marsonya) [#37312](https://github.com/nodejs/node/pull/37312)
* \[[`7d8fd3f576`](https://github.com/nodejs/node/commit/7d8fd3f576)] - **doc**：重构 fs 文档结构 (James M Snell) [#37170](https://github.com/nodejs/node/pull/37170)
* \[[`facf3a5c23`](https://github.com/nodejs/node/commit/facf3a5c23)] - **doc**：修复 hasSubscribers 的描述 (Tobias Nießen) [#37324](https://github.com/nodejs/node/pull/37324)
* \[[`3464c9f007`](https://github.com/nodejs/node/commit/3464c9f007)] - **doc**：不鼓励使用 error 事件 (Benjamin Gruenbaum) [#37264](https://github.com/nodejs/node/pull/37264)
* \[[`85bed2ec26`](https://github.com/nodejs/node/commit/85bed2ec26)] - **doc**：修复 README.md 中错误命名的 SHASUMS256.txt 名称 (marsonya) [#37260](https://github.com/nodejs/node/pull/37260)
* \[[`cd50e93307`](https://github.com/nodejs/node/commit/cd50e93307)] - **doc**：警告在 crypto 中将字符串作为输入的用法 (Tobias Nießen) [#37248](https://github.com/nodejs/node/pull/37248)
* \[[`5a4288ebb6`](https://github.com/nodejs/node/commit/5a4288ebb6)] - **doc**：修复 crypto.md 中的拼写错误 (marsonya) [#37279](https://github.com/nodejs/node/pull/37279)
* \[[`0e887caf32`](https://github.com/nodejs/node/commit/0e887caf32)] - **doc**：修复 console.md 中的拼写错误 (marsonya) [#37279](https://github.com/nodejs/node/pull/37279)
* \[[`47c4f1fc54`](https://github.com/nodejs/node/commit/47c4f1fc54)] - **doc**：在 README 标题中使用句式大小写 (Rich Trott) [#37251](https://github.com/nodejs/node/pull/37251)
* \[[`7da1c9b219`](https://github.com/nodejs/node/commit/7da1c9b219)] - **doc**：在 BUILDING.md 的标题中使用句式大小写 (Rich Trott) [#37250](https://github.com/nodejs/node/pull/37250)
* \[[`ebf3597db1`](https://github.com/nodejs/node/commit/ebf3597db1)] - **doc**：将 N-API 重命名为 Node-API (Gabriel Schulhof) [#37259](https://github.com/nodejs/node/pull/37259)
* \[[`760f126adb`](https://github.com/nodejs/node/commit/760f126adb)] - **doc**：将 Certificate 方法标记为静态，并补充缺失的 KeyObject.from (Filip Skokan) [#37198](https://github.com/nodejs/node/pull/37198)
* \[[`aebe532967`](https://github.com/nodejs/node/commit/aebe532967)] - **doc**：统一 webcrypto 的 `node.keyObject` 格式 (Filip Skokan) [#37200](https://github.com/nodejs/node/pull/37200)
* \[[`596bfb36a0`](https://github.com/nodejs/node/commit/596bfb36a0)] - **doc**：在 port.postMessage() 中提及 CryptoKey (Filip Skokan) [#37196](https://github.com/nodejs/node/pull/37196)
* \[[`0702d60def`](https://github.com/nodejs/node/commit/0702d60def)] - **doc**：修复 webcrypto HMAC generateKey 示例 (Filip Skokan) [#37197](https://github.com/nodejs/node/pull/37197)
* \[[`8a254058f5`](https://github.com/nodejs/node/commit/8a254058f5)] - **doc**：修复 accommodate 的拼写错误 (Colin Ihrig) [#37229](https://github.com/nodejs/node/pull/37229)
* \[[`5906e85ce2`](https://github.com/nodejs/node/commit/5906e85ce2)] - **doc**：修复 DEP006 的版本号 (Antoine du Hamel) [#37231](https://github.com/nodejs/node/pull/37231)
* \[[`52c40c7a48`](https://github.com/nodejs/node/commit/52c40c7a48)] - **doc**：修复 CHANGELOG_ARCHIVE 目录 (Antoine du Hamel) [#37232](https://github.com/nodejs/node/pull/37232)
* \[[`eb08afdf24`](https://github.com/nodejs/node/commit/eb08afdf24)] - **doc**：修复 globals.md 中的拼写错误 (Darshan Sen) [#37228](https://github.com/nodejs/node/pull/37228)
* \[[`b87c0d6c16`](https://github.com/nodejs/node/commit/b87c0d6c16)] - **doc**：修复 cli.md 中的拼写错误 (Kalvin Vasconcellos) [#37214](https://github.com/nodejs/node/pull/37214)
* \[[`3f815d93bf`](https://github.com/nodejs/node/commit/3f815d93bf)] - **doc**：修复 DEP0148 的 pr-url (Antoine du Hamel) [#37205](https://github.com/nodejs/node/pull/37205)
* \[[`ff02e5e12c`](https://github.com/nodejs/node/commit/ff02e5e12c)] - **doc**：修复 module.md 中的 404 链接 (Antoine du Hamel) [#37202](https://github.com/nodejs/node/pull/37202)
* \[[`67c9a8e176`](https://github.com/nodejs/node/commit/67c9a8e176)] - **doc**：改进 promise 术语 (Benjamin Gruenbaum) [#37181](https://github.com/nodejs/node/pull/37181)
* \[[`15804e0b3f`](https://github.com/nodejs/node/commit/15804e0b3f)] - **errors**：使 source-map 堆栈与规范一致 (Benjamin Coe) [#37252](https://github.com/nodejs/node/pull/37252)
* \[[`88d3f74c85`](https://github.com/nodejs/node/commit/88d3f74c85)] - **(SEMVER-MINOR)** **fs**：添加 fsPromises.watch() (James M Snell) [#37179](https://github.com/nodejs/node/pull/37179)
* \[[`c30245072a`](https://github.com/nodejs/node/commit/c30245072a)] - **fs**：允许传入负零 fd (Darshan Sen) [#37123](https://github.com/nodejs/node/pull/37123)
* \[[`655d19638a`](https://github.com/nodejs/node/commit/655d19638a)] - **(SEMVER-MINOR)** **fs**：为 fs.close() 使用默认回调 (James M Snell) [#37174](https://github.com/nodejs/node/pull/37174)
* \[[`acd087dffb`](https://github.com/nodejs/node/commit/acd087dffb)] - **(SEMVER-MINOR)** **fs**：为 watch 添加 AbortSignal 支持 (Benjamin Gruenbaum) [#37190](https://github.com/nodejs/node/pull/37190)
* \[[`f5d1bf9d0e`](https://github.com/nodejs/node/commit/f5d1bf9d0e)] - **http**：解释重构未使用参数的可能性 (Qingyu Deng) [#37275](https://github.com/nodejs/node/pull/37275)
* \[[`d63ac28a9a`](https://github.com/nodejs/node/commit/d63ac28a9a)] - **http**：解释 IncomingMessage.\_read 中未使用参数的原因 (Qingyu Deng) [#37275](https://github.com/nodejs/node/pull/37275)
* \[[`4cdc5ea823`](https://github.com/nodejs/node/commit/4cdc5ea823)] - **http**：修复 ClientRequest 未处理的错误 (Robert Nagy) [#36970](https://github.com/nodejs/node/pull/36970)
* \[[`c6198fddc7`](https://github.com/nodejs/node/commit/c6198fddc7)] - **lib**：简化 child\_process 中的检查 (Darshan Sen) [#37367](https://github.com/nodejs/node/pull/37367)
* \[[`f6f9af6a59`](https://github.com/nodejs/node/commit/f6f9af6a59)] - **lib**：修复 WebIDL `object` 和字典类型转换 (ExE Boss) [#37047](https://github.com/nodejs/node/pull/37047)
* \[[`acabe08b10`](https://github.com/nodejs/node/commit/acabe08b10)] - **lib**：添加弱事件处理器 (Benjamin Gruenbaum) [#36607](https://github.com/nodejs/node/pull/36607)
* \[[`3db1b30732`](https://github.com/nodejs/node/commit/3db1b30732)] - **meta**：更新 README 的 releases 部分 (Zuzana Svetlikova) [#37318](https://github.com/nodejs/node/pull/37318)
* \[[`d96a97a2b9`](https://github.com/nodejs/node/commit/d96a97a2b9)] - **module**：使合成模块的求值步骤返回 Promise，以支持顶层 await (Daniel Clark) [#37300](https://github.com/nodejs/node/pull/37300)
* \[[`a693baa0cb`](https://github.com/nodejs/node/commit/a693baa0cb)] - **module**：在 cjs/loader.js 中使用可选链 (Darshan Sen) [#37238](https://github.com/nodejs/node/pull/37238)
* \[[`061939d2f6`](https://github.com/nodejs/node/commit/061939d2f6)] - **(SEMVER-MINOR)** **node-api**：允许获取插件文件名 (Gabriel Schulhof) [#37195](https://github.com/nodejs/node/pull/37195)
* \[[`c4faa39768`](https://github.com/nodejs/node/commit/c4faa39768)] - **(SEMVER-MINOR)** **perf\_hooks**：引入 createHistogram (James M Snell) [#37155](https://github.com/nodejs/node/pull/37155)
* \[[`799b2d5275`](https://github.com/nodejs/node/commit/799b2d5275)] - **policy**：修复级联获取作用域 (Bradley Meck) [#37298](https://github.com/nodejs/node/pull/37298)
* \[[`6d53e797d7`](https://github.com/nodejs/node/commit/6d53e797d7)] - **repl**：重构以避免不安全的数组迭代 (Antoine du Hamel) [#37345](https://github.com/nodejs/node/pull/37345)
* \[[`3fee5b2219`](https://github.com/nodejs/node/commit/3fee5b2219)] - **repl**：为动态 import 调用添加自动补全 (ExE Boss) [#37178](https://github.com/nodejs/node/pull/37178)
* \[[`c3778343aa`](https://github.com/nodejs/node/commit/c3778343aa)] - **repl**：重构以避免不安全的数组迭代 (Antoine du Hamel) [#37188](https://github.com/nodejs/node/pull/37188)
* \[[`e28fa6c3fc`](https://github.com/nodejs/node/commit/e28fa6c3fc)] - **src**：修复 string_search.h 中方法的返回类型 (Darshan Sen) [#37167](https://github.com/nodejs/node/pull/37167)
* \[[`42cc33cc48`](https://github.com/nodejs/node/commit/42cc33cc48)] - **src**：为 ManagedEVPPKey 类添加互斥锁 (Daniel Bevenius) [#36825](https://github.com/nodejs/node/pull/36825)
* \[[`1a9bcdf1d9`](https://github.com/nodejs/node/commit/1a9bcdf1d9)] - **src**：重构 v8 绑定 (Joyee Cheung) [#37112](https://github.com/nodejs/node/pull/37112)
* \[[`54d36b00af`](https://github.com/nodejs/node/commit/54d36b00af)] - **src**：在 BindingData 中将 binding_data_name 重命名为 type_name (Joyee Cheung) [#37112](https://github.com/nodejs/node/pull/37112)
* \[[`3079a78428`](https://github.com/nodejs/node/commit/3079a78428)] - **src**：避免隐式类型转换 (Michaël Zasso) [#37149](https://github.com/nodejs/node/pull/37149)
* \[[`a6053dc14a`](https://github.com/nodejs/node/commit/a6053dc14a)] - **src**：为 env.cc 中的 TODO 注释添加上下文 (Yash Ladha) [#37140](https://github.com/nodejs/node/pull/37140)
* \[[`354df9e8a1`](https://github.com/nodejs/node/commit/354df9e8a1)] - **src**：使用 make_shared 进行安全分配 (Yash Ladha) [#37139](https://github.com/nodejs/node/pull/37139)
* \[[`337b4e7540`](https://github.com/nodejs/node/commit/337b4e7540)] - **src**：将（反）序列化代码放入 node_snapshotable.h/cc (Joyee Cheung) [#37114](https://github.com/nodejs/node/pull/37114)
* \[[`2a5f67b381`](https://github.com/nodejs/node/commit/2a5f67b381)] - **src**：重构 bootstrap 状态的 bookkeeping (Joyee Cheung) [#37113](https://github.com/nodejs/node/pull/37113)
* \[[`48ce1eb364`](https://github.com/nodejs/node/commit/48ce1eb364)] - **src**：修复 string_search.h 中的警告 (Darshan Sen) [#37146](https://github.com/nodejs/node/pull/37146)
* \[[`bfe0b46d92`](https://github.com/nodejs/node/commit/bfe0b46d92)] - **src**：简化 prime gen 中对 BN_bin2bn 的调用 (Tobias Nießen) [#37169](https://github.com/nodejs/node/pull/37169)
* \[[`9946c1137e`](https://github.com/nodejs/node/commit/9946c1137e)] - **src**：从 Linux THP sysfs 配置中精确读取两个 token (James Addison) [#37065](https://github.com/nodejs/node/pull/37065)
* \[[`1fea05149a`](https://github.com/nodejs/node/commit/1fea05149a)] - **(SEMVER-MINOR)** **stream**：改进 Readable.from 的错误处理 (Benjamin Gruenbaum) [#37158](https://github.com/nodejs/node/pull/37158)
* \[[`d2a487e640`](https://github.com/nodejs/node/commit/d2a487e640)] - _**Revert**_ "**stream**：修复 .end() 错误传播" (Matteo Collina) [#37060](https://github.com/nodejs/node/pull/37060)
* \[[`b5692b4b06`](https://github.com/nodejs/node/commit/b5692b4b06)] - **test**：修复 test-doctool-html (Antoine du Hamel) [#37397](https://github.com/nodejs/node/pull/37397)
* \[[`b09d21b06b`](https://github.com/nodejs/node/commit/b09d21b06b)] - **test**：为 test-timers-promisified 启用 no-restricted-syntax 规则 (Rich Trott) [#37357](https://github.com/nodejs/node/pull/37357)
* \[[`1fc8307138`](https://github.com/nodejs/node/commit/1fc8307138)] - **test**：稳健地重新实现 promises.setInterval() 测试 (Rich Trott) [#37230](https://github.com/nodejs/node/pull/37230)
* \[[`8483de4da8`](https://github.com/nodejs/node/commit/8483de4da8)] - **test**：仅使用受支持的 OpenSSL 运行素数测试 (Tobias Nießen) [#37212](https://github.com/nodejs/node/pull/37212)
* \[[`48a634e514`](https://github.com/nodejs/node/commit/48a634e514)] - **test**：将 n-api 重命名为 node-api (Gabriel Schulhof) [#37217](https://github.com/nodejs/node/pull/37217)
* \[[`51575252f5`](https://github.com/nodejs/node/commit/51575252f5)] - **test**：移除 test-http2-large-file 的 flaky 标记 (Rich Trott) [#37156](https://github.com/nodejs/node/pull/37156)
* \[[`13fe17c4ef`](https://github.com/nodejs/node/commit/13fe17c4ef)] - **test**：拆分 heap snapshot 限制测试 (Rich Trott) [#37189](https://github.com/nodejs/node/pull/37189)
* \[[`dc38dd2c6f`](https://github.com/nodejs/node/commit/dc38dd2c6f)] - **timers**：修复不安全的数组迭代 (Darshan Sen) [#37223](https://github.com/nodejs/node/pull/37223)
* \[[`eb7ec1b257`](https://github.com/nodejs/node/commit/eb7ec1b257)] - **timers**：移除 flaky 的 setInterval 测试 (Nitzan Uziely) [#37227](https://github.com/nodejs/node/pull/37227)
* \[[`4ebe38b212`](https://github.com/nodejs/node/commit/4ebe38b212)] - **(SEMVER-MINOR)** **timers**：引入 setInterval 异步迭代器 (linkgoron) [#37153](https://github.com/nodejs/node/pull/37153)
* \[[`dc84c181c3`](https://github.com/nodejs/node/commit/dc84c181c3)] - **(SEMVER-MINOR)** **tls**：添加将证书/对端证书作为 X509Certificate 对象获取的能力 (James M Snell) [#37070](https://github.com/nodejs/node/pull/37070)
* \[[`2e1f1c6f3c`](https://github.com/nodejs/node/commit/2e1f1c6f3c)] - **tools**：重构 prefer-primordials (Antoine du Hamel) [#36018](https://github.com/nodejs/node/pull/36018)
* \[[`b2b64113b1`](https://github.com/nodejs/node/commit/b2b64113b1)] - **tools**：将 ESLint 更新到 7.20.0 (Colin Ihrig) [#37339](https://github.com/nodejs/node/pull/37339)
* \[[`a483c284f3`](https://github.com/nodejs/node/commit/a483c284f3)] - **tools**：修复 lint-pr-url 消息 (Antoine du Hamel) [#37304](https://github.com/nodejs/node/pull/37304)
* \[[`1ff375beb3`](https://github.com/nodejs/node/commit/1ff375beb3)] - **tools**：避免文档生成器中的待弃用警告 (Michaël Zasso) [#37267](https://github.com/nodejs/node/pull/37267)
* \[[`6db5e7958a`](https://github.com/nodejs/node/commit/6db5e7958a)] - **tools**：为 pr-url 添加 GitHub Action linter (Antoine du Hamel) [#37221](https://github.com/nodejs/node/pull/37221)
* \[[`d8d851ac5c`](https://github.com/nodejs/node/commit/d8d851ac5c)] - **tools**：将 remark-present-lint-node 从 2.0.0 升级到 2.0.1 (Rich Trott) [#37270](https://github.com/nodejs/node/pull/37270)
* \[[`eb0daaedf9`](https://github.com/nodejs/node/commit/eb0daaedf9)] - **tools**：修复 d8 macOS 构建 (Michaël Zasso) [#37211](https://github.com/nodejs/node/pull/37211)
* \[[`745aad73dc`](https://github.com/nodejs/node/commit/745aad73dc)] - **tools**：将 ESLint 更新到 7.19.0 (Colin Ihrig) [#37159](https://github.com/nodejs/node/pull/37159)
* \[[`676f696a99`](https://github.com/nodejs/node/commit/676f696a99)] - **url**：修复 `URL`/`SearchParams` 方法和访问器的定义 (ExE Boss) [#36799](https://github.com/nodejs/node/pull/36799)
* \[[`fbcab109de`](https://github.com/nodejs/node/commit/fbcab109de)] - **url**：移动 `URLSearchParams` 方法定义 (ExE Boss) [#36799](https://github.com/nodejs/node/pull/36799)
* \[[`7c51cecbca`](https://github.com/nodejs/node/commit/7c51cecbca)] - **util**：对不可达代码使用 assert (Rich Trott) [#37249](https://github.com/nodejs/node/pull/37249)
* \[[`66a14d3992`](https://github.com/nodejs/node/commit/66a14d3992)] - **vm**：为 compileFunction 添加 importModuleDynamically 选项 (Gus Caplan) [#35431](https://github.com/nodejs/node/pull/35431)
* \[[`05a16e7259`](https://github.com/nodejs/node/commit/05a16e7259)] - **worker**：重构以避免不安全的数组迭代 (Antoine du Hamel) [#37346](https://github.com/nodejs/node/pull/37346)

<a id="15.8.0"></a>

## 2021-02-02，版本 15.8.0（当前），@targos

### 重要变更

* \[[`110063d694`](https://github.com/nodejs/node/commit/110063d694)] - **(SEMVER-MINOR)** **crypto**: 添加 generatePrime/checkPrime（James M Snell） [#36997](https://github.com/nodejs/node/pull/36997)
* \[[`53a0bdff47`](https://github.com/nodejs/node/commit/53a0bdff47)] - **(SEMVER-MINOR)** **crypto**: 实验性支持 (Ed/X)25519/(Ed/X)448（James M Snell） [#36879](https://github.com/nodejs/node/pull/36879)
* \[[`03460432af`](https://github.com/nodejs/node/commit/03460432af)] - **deps**: 将 npm 升级到 7.5.0（Ruy Adorno） [#37117](https://github.com/nodejs/node/pull/37117)
  * 此更新新增了一个 [`npm diff` 命令](https://github.com/npm/cli/pull/1319)。
* \[[`2c7ad38c75`](https://github.com/nodejs/node/commit/2c7ad38c75)] - **(SEMVER-MINOR)** **dgram**: 在 createSocket 中支持 AbortSignal（Nitzan Uziely） [#37026](https://github.com/nodejs/node/pull/37026)
* \[[`b7c3f99f7e`](https://github.com/nodejs/node/commit/b7c3f99f7e)] - **doc**: 将 Zijian Liu 添加到协作者中（ZiJian Liu） [#37075](https://github.com/nodejs/node/pull/37075)
* \[[`02f1d2fda4`](https://github.com/nodejs/node/commit/02f1d2fda4)] - **esm**: 弃用模块的旧版 main 查找方式（Guy Bedford） [#36918](https://github.com/nodejs/node/pull/36918)
* \[[`75124298d5`](https://github.com/nodejs/node/commit/75124298d5)] - **(SEMVER-MINOR)** **readline**: 添加历史事件和设置初始历史记录的选项（Mattias Runge-Broberg） [#33662](https://github.com/nodejs/node/pull/33662)
* \[[`4e757eab96`](https://github.com/nodejs/node/commit/4e757eab96)] - **(SEMVER-MINOR)** **readline**: 为 question 方法添加 AbortController 支持（Mattias Runge-Broberg） [#33676](https://github.com/nodejs/node/pull/33676)

### 提交

* \[[`602aaf25af`](https://github.com/nodejs/node/commit/602aaf25af)] - **async\_hooks**: 重构以避免不安全的数组迭代（Antoine du Hamel） [#37125](https://github.com/nodejs/node/pull/37125)
* \[[`dcd34b0144`](https://github.com/nodejs/node/commit/dcd34b0144)] - **benchmark**: 为 NODE\_V8\_COVERAGE 添加基准测试（Benjamin Coe） [#36972](https://github.com/nodejs/node/pull/36972)
* \[[`ec22756ac9`](https://github.com/nodejs/node/commit/ec22756ac9)] - **benchmark**: 使输出符合 RFC 4180（Tobias Nießen） [#37038](https://github.com/nodejs/node/pull/37038)
* \[[`96cec1e5f3`](https://github.com/nodejs/node/commit/96cec1e5f3)] - **benchmark**: 改进 R 脚本中的说明（Tobias Nießen） [#36995](https://github.com/nodejs/node/pull/36995)
* \[[`e4b88b521a`](https://github.com/nodejs/node/commit/e4b88b521a)] - **buffer**: 避免在线程中创建 backing store（James M Snell） [#37052](https://github.com/nodejs/node/pull/37052)
* \[[`7b78c6773d`](https://github.com/nodejs/node/commit/7b78c6773d)] - **child\_process**: 允许可 promisify 的 exec 被取消（Carlos Fuentes） [#34249](https://github.com/nodejs/node/pull/34249)
* \[[`c4193ba8ae`](https://github.com/nodejs/node/commit/c4193ba8ae)] - **crypto**: 修复加密的私钥 -> 公钥导入（Tobias Nießen） [#37056](https://github.com/nodejs/node/pull/37056)
* \[[`cb3b0ec4fc`](https://github.com/nodejs/node/commit/cb3b0ec4fc)] - **crypto**: generateKeyPair('ec') 不应支持 NODE-ED\* 和 NODE-X\*（Filip Skokan） [#37063](https://github.com/nodejs/node/pull/37063)
* \[[`110063d694`](https://github.com/nodejs/node/commit/110063d694)] - **(SEMVER-MINOR)** **crypto**: 添加 generatePrime/checkPrime（James M Snell） [#36997](https://github.com/nodejs/node/pull/36997)
* \[[`ab64d74791`](https://github.com/nodejs/node/commit/ab64d74791)] - **crypto**: 在 diffieHellman() 中对无效对象抛出错误（ZiJian Liu） [#37016](https://github.com/nodejs/node/pull/37016)
* \[[`53a0bdff47`](https://github.com/nodejs/node/commit/53a0bdff47)] - **(SEMVER-MINOR)** **crypto**: 实验性支持 (Ed/X)25519/(Ed/X)448（James M Snell） [#36879](https://github.com/nodejs/node/pull/36879)
* \[[`4551d14b8e`](https://github.com/nodejs/node/commit/4551d14b8e)] - **deps**: 将 npm 升级到 7.5.1（Ruy Adorno） [#37177](https://github.com/nodejs/node/pull/37177)
* \[[`9d6fd4586f`](https://github.com/nodejs/node/commit/9d6fd4586f)] - **deps**: 更新 openssl 配置（James M Snell） [#37067](https://github.com/nodejs/node/pull/37067)
* \[[`f74b376596`](https://github.com/nodejs/node/commit/f74b376596)] - _**Revert**_ "**deps**: 来自 akamai/openssl 的各种 quic 补丁"（James M Snell） [#37067](https://github.com/nodejs/node/pull/37067)
* \[[`6756130c4b`](https://github.com/nodejs/node/commit/6756130c4b)] - _**Revert**_ "**deps**: 重新启用 OPENSSL\_NO\_QUIC 守卫"（James M Snell） [#37067](https://github.com/nodejs/node/pull/37067)
* \[[`52ce1d5f1a`](https://github.com/nodejs/node/commit/52ce1d5f1a)] - _**Revert**_ "**deps**: 更新 openssl 更新的补丁和文档"（James M Snell） [#37067](https://github.com/nodejs/node/pull/37067)
* \[[`03460432af`](https://github.com/nodejs/node/commit/03460432af)] - **deps**: 将 npm 升级到 7.5.0（Ruy Adorno） [#37117](https://github.com/nodejs/node/pull/37117)
* \[[`2c7ad38c75`](https://github.com/nodejs/node/commit/2c7ad38c75)] - **(SEMVER-MINOR)** **dgram**: 在 createSocket 中支持 AbortSignal（Nitzan Uziely） [#37026](https://github.com/nodejs/node/pull/37026)
* \[[`47bfde00fd`](https://github.com/nodejs/node/commit/47bfde00fd)] - **doc**: 修复 `<kbd>` 元素的颜色对比度（Antoine du Hamel） [#37185](https://github.com/nodejs/node/pull/37185)
* \[[`3c9077130d`](https://github.com/nodejs/node/commit/3c9077130d)] - **doc**: 修复 Developer's Certificate of Origin 中的列表格式（Akash Negi） [#37138](https://github.com/nodejs/node/pull/37138)
* \[[`8cecce3ff4`](https://github.com/nodejs/node/commit/8cecce3ff4)] - **doc**: 修复 errors.md 中的标记和字母排序（Rich Trott） [#37144](https://github.com/nodejs/node/pull/37144)
* \[[`a7780815bf`](https://github.com/nodejs/node/commit/a7780815bf)] - **doc**: 澄清 ERR\_INVALID\_REPL\_INPUT 的用法（Rich Trott） [#37143](https://github.com/nodejs/node/pull/37143)
* \[[`e7126503e0`](https://github.com/nodejs/node/commit/e7126503e0)] - **doc**: 澄清 repl 异常条件（Rich Trott） [#37142](https://github.com/nodejs/node/pull/37142)
* \[[`e55d3d0953`](https://github.com/nodejs/node/commit/e55d3d0953)] - **doc**: 为测试结构添加示例（Turner Jabbour） [#35046](https://github.com/nodejs/node/pull/35046)
* \[[`9b9a1801ba`](https://github.com/nodejs/node/commit/9b9a1801ba)] - **doc**: 移除没有 TOC 的页面的 TOC 摘要（Rich Trott） [#37043](https://github.com/nodejs/node/pull/37043)
* \[[`ae42658be9`](https://github.com/nodejs/node/commit/ae42658be9)] - **doc**: 添加缺失的弃用代码（Colin Ihrig） [#37147](https://github.com/nodejs/node/pull/37147)
* \[[`b79b82de8e`](https://github.com/nodejs/node/commit/b79b82de8e)] - **doc**: 更新 Buffer 编码选项数量（Dave Cardwell） [#37102](https://github.com/nodejs/node/pull/37102)
* \[[`ddee21b587`](https://github.com/nodejs/node/commit/ddee21b587)] - **doc**: 更新 BUILDING.md 中旧版本的链接（Richard Lau） [#37082](https://github.com/nodejs/node/pull/37082)
* \[[`1710016053`](https://github.com/nodejs/node/commit/1710016053)] - **doc**: 提到在协作者入门 PR 中添加 Fixes（Joyee Cheung） [#37097](https://github.com/nodejs/node/pull/37097)
* \[[`b7c3f99f7e`](https://github.com/nodejs/node/commit/b7c3f99f7e)] - **doc**: 将 Zijian Liu 添加到协作者中（ZiJian Liu） [#37075](https://github.com/nodejs/node/pull/37075)
* \[[`7ddfa81612`](https://github.com/nodejs/node/commit/7ddfa81612)] - **doc**: 为浅色/深色模式切换添加提示信息（Rich Trott） [#37044](https://github.com/nodejs/node/pull/37044)
* \[[`c79688ffe3`](https://github.com/nodejs/node/commit/c79688ffe3)] - **doc**: 改进 AsyncLocalStorage 的介绍（Romuald Brillout） [#36946](https://github.com/nodejs/node/pull/36946)
* \[[`a7b6464097`](https://github.com/nodejs/node/commit/a7b6464097)] - **doc**: 自 v15.0.0 起，`EventTarget` 和 `Event` 可供用户代码使用（ExE Boss） [#37059](https://github.com/nodejs/node/pull/37059)
* \[[`3722c15a75`](https://github.com/nodejs/node/commit/3722c15a75)] - **doc**: 修复 tty 中缺失的逗号（Matthew Mario Di Pasquale） [#37039](https://github.com/nodejs/node/pull/37039)
* \[[`2cfe7954fc`](https://github.com/nodejs/node/commit/2cfe7954fc)] - **doc**: 列出不受支持的目录导入解析错误（Guy Bedford） [#37032](https://github.com/nodejs/node/pull/37032)
* \[[`fef6ac77e5`](https://github.com/nodejs/node/commit/fef6ac77e5)] - **doc**: 添加缺失的按钮 ARIA 标签（Rich Trott） [#37031](https://github.com/nodejs/node/pull/37031)
* \[[`634bedcd6f`](https://github.com/nodejs/node/commit/634bedcd6f)] - **doc,test**: 修复 prime 生成说明（Tobias Nießen） [#37085](https://github.com/nodejs/node/pull/37085)
* \[[`181719d4c4`](https://github.com/nodejs/node/commit/181719d4c4)] - **esm**: 更新为正确的弃用代码（Colin Ihrig） [#37147](https://github.com/nodejs/node/pull/37147)
* \[[`02f1d2fda4`](https://github.com/nodejs/node/commit/02f1d2fda4)] - **esm**: 弃用模块的旧版 main 查找方式（Guy Bedford） [#36918](https://github.com/nodejs/node/pull/36918)
* \[[`69402522fd`](https://github.com/nodejs/node/commit/69402522fd)] - **fs**: 在 promises.readFile 中如果已知则读取完整大小（Anna Henningsen） [#37127](https://github.com/nodejs/node/pull/37127)
* \[[`ad12fefcb0`](https://github.com/nodejs/node/commit/ad12fefcb0)] - **fs**: 仅在必要时在 promises.readFile 中使用 Buffer.concat（Anna Henningsen） [#37127](https://github.com/nodejs/node/pull/37127)
* \[[`6f54a14cda`](https://github.com/nodejs/node/commit/6f54a14cda)] - **fs**: 添加 validatePosition 并用于 read 和 readSync（Darshan Sen） [#37051](https://github.com/nodejs/node/pull/37051)
* \[[`175f6f0be3`](https://github.com/nodejs/node/commit/175f6f0be3)] - **fs**: 在 statSync 调用中使用 throwIfNoEntry 选项（Antoine du Hamel） [#36975](https://github.com/nodejs/node/pull/36975)
* \[[`97fc7d8396`](https://github.com/nodejs/node/commit/97fc7d8396)] - **fs**: 重构以移除冗余校验（Darshan Sen） [#36984](https://github.com/nodejs/node/pull/36984)
* \[[`0129a79d0a`](https://github.com/nodejs/node/commit/0129a79d0a)] - **fs**: 为 recursive 情况下未定义的 path 添加明确说明（Sebastian Silbermann） [#37010](https://github.com/nodejs/node/pull/37010)
* \[[`7196ac19c1`](https://github.com/nodejs/node/commit/7196ac19c1)] - **http**: 重构以避免不安全的数组迭代（Antoine du Hamel） [#37124](https://github.com/nodejs/node/pull/37124)
* \[[`ed58065d1f`](https://github.com/nodejs/node/commit/ed58065d1f)] - **lib**: 添加 varargs `primordials` 的 `bound apply` 变体（ExE Boss） [#37005](https://github.com/nodejs/node/pull/37005)
* \[[`67b58f68c9`](https://github.com/nodejs/node/commit/67b58f68c9)] - **lib**: 重构为使用 validateObject（ZiJian Liu） [#37028](https://github.com/nodejs/node/pull/37028)
* \[[`5227c5e6f5`](https://github.com/nodejs/node/commit/5227c5e6f5)] - **lib**: 重构为使用 validateFunction（ZiJian Liu） [#37045](https://github.com/nodejs/node/pull/37045)
* \[[`34adf7f74b`](https://github.com/nodejs/node/commit/34adf7f74b)] - **lib**: 重构以避免不安全的数组迭代（Antoine du Hamel） [#37029](https://github.com/nodejs/node/pull/37029)
* \[[`4a1fc42178`](https://github.com/nodejs/node/commit/4a1fc42178)] - **lib**: 在 internal/options.js 中重构为使用可选链（raisinten） [#36939](https://github.com/nodejs/node/pull/36939)
* \[[`d76400a264`](https://github.com/nodejs/node/commit/d76400a264)] - **lib**: 重构为使用 validateString（ZiJian Liu） [#37006](https://github.com/nodejs/node/pull/37006)
* \[[`a29da64b46`](https://github.com/nodejs/node/commit/a29da64b46)] - **lib**: 重构为使用 validateNumber（ZiJian Liu） [#36993](https://github.com/nodejs/node/pull/36993)
* \[[`56377d6cee`](https://github.com/nodejs/node/commit/56377d6cee)] - **lib**: 支持从 C++ 返回 Safe 集合（ExE Boss） [#36989](https://github.com/nodejs/node/pull/36989)
* \[[`c4cab1f408`](https://github.com/nodejs/node/commit/c4cab1f408)] - **lib**: 重构为使用 validateBoolean（ZiJian Liu） [#36983](https://github.com/nodejs/node/pull/36983)
* \[[`11dd2672cd`](https://github.com/nodejs/node/commit/11dd2672cd)] - **quic**: 移除 quic（James M Snell） [#37067](https://github.com/nodejs/node/pull/37067)
* \[[`b533485f32`](https://github.com/nodejs/node/commit/b533485f32)] - **quic**: 移除重复检查（ZiJian Liu） [#37017](https://github.com/nodejs/node/pull/37017)
* \[[`1714998e2c`](https://github.com/nodejs/node/commit/1714998e2c)] - **readline**: 用符号替换 \_questionCancel（Colin Ihrig） [#37094](https://github.com/nodejs/node/pull/37094)
* \[[`3d64d2b5ef`](https://github.com/nodejs/node/commit/3d64d2b5ef)] - **readline**: 在 question() 中检查 null 输入（Colin Ihrig） [#37089](https://github.com/nodejs/node/pull/37089)
* \[[`75124298d5`](https://github.com/nodejs/node/commit/75124298d5)] - **(SEMVER-MINOR)** **readline**: 添加历史事件和设置初始历史记录的选项（Mattias Runge-Broberg） [#33662](https://github.com/nodejs/node/pull/33662)
* \[[`4e757eab96`](https://github.com/nodejs/node/commit/4e757eab96)] - **(SEMVER-MINOR)** **readline**: 为 question 方法添加 AbortController 支持（Mattias Runge-Broberg） [#33676](https://github.com/nodejs/node/pull/33676)
* \[[`a26dfb323b`](https://github.com/nodejs/node/commit/a26dfb323b)] - **src**: 在事后分析元数据中暴露 BaseObject::kInternalFieldCount（Joyee Cheung） [#37111](https://github.com/nodejs/node/pull/37111)
* \[[`9c831c0d8f`](https://github.com/nodejs/node/commit/9c831c0d8f)] - **src**: 修复 RandomPrimeTraits 中的死代码（Tobias Nießen） [#37083](https://github.com/nodejs/node/pull/37083)
* \[[`81e9acf242`](https://github.com/nodejs/node/commit/81e9acf242)] - **src**: 将 crypto_ec.(h|cc) 重命名为 crypto_ec.(h|cc)（Tobias Nießen） [#37048](https://github.com/nodejs/node/pull/37048)
* \[[`1f819ec47d`](https://github.com/nodejs/node/commit/1f819ec47d)] - **test**: 为 varargs `primordials` 的 `bound apply` 变体添加测试（ExE Boss） [#37005](https://github.com/nodejs/node/pull/37005)
* \[[`db38cf27c2`](https://github.com/nodejs/node/commit/db38cf27c2)] - **test**: 增加 inspect 覆盖率（Emil Sivervik） [#36755](https://github.com/nodejs/node/pull/36755)
* \[[`10da5c1104`](https://github.com/nodejs/node/commit/10da5c1104)] - **test**: 在 parallel.status 中一致地跳过测试（Rich Trott） [#37035](https://github.com/nodejs/node/pull/37035)
* \[[`da07eb654e`](https://github.com/nodejs/node/commit/da07eb654e)] - **test**: 增加 read file abort 覆盖率（Moshe vilner） [#36716](https://github.com/nodejs/node/pull/36716)
* \[[`55407b826f`](https://github.com/nodejs/node/commit/55407b826f)] - **test**: 更新以改进术语（Michael Dawson） [#37011](https://github.com/nodejs/node/pull/37011)
* \[[`ef2b25088d`](https://github.com/nodejs/node/commit/ef2b25088d)] - **test**: 增加 assert/calltracker 的覆盖率（ZiJian Liu） [#36728](https://github.com/nodejs/node/pull/36728)
* \[[`074641c2e9`](https://github.com/nodejs/node/commit/074641c2e9)] - **test**: 改进 test-vm-memleak 的断言消息（Rich Trott） [#37034](https://github.com/nodejs/node/pull/37034)
* \[[`4086b230b8`](https://github.com/nodejs/node/commit/4086b230b8)] - **test**: 增加 fs promise 覆盖率（Emil Sivervik） [#36813](https://github.com/nodejs/node/pull/36813)
* \[[`94204f7e46`](https://github.com/nodejs/node/commit/94204f7e46)] - **test**: 在退出前使用 process.nextTick（ttzztztz） [#37012](https://github.com/nodejs/node/pull/37012)
* \[[`2135618052`](https://github.com/nodejs/node/commit/2135618052)] - **test**: 增加 ASAN Action 的超时时间（Antoine du Hamel） [#37007](https://github.com/nodejs/node/pull/37007)
* \[[`de6dca12e8`](https://github.com/nodejs/node/commit/de6dca12e8)] - **test**: 改进 `SourceTextModule` getter 的覆盖率（Juan José Arboleda） [#37013](https://github.com/nodejs/node/pull/37013)
* \[[`36cc8df358`](https://github.com/nodejs/node/commit/36cc8df358)] - **test**: 在 test-fs-realpath-pipe 中记录错误（Joyee Cheung） [#36996](https://github.com/nodejs/node/pull/36996)
* \[[`36930e4fe7`](https://github.com/nodejs/node/commit/36930e4fe7)] - **test**: 在 mkdir/mkdirSync 中将 mode 作为选项对象传入时进行测试（Darshan Sen） [#37008](https://github.com/nodejs/node/pull/37008)
* \[[`9c69ca5e54`](https://github.com/nodejs/node/commit/9c69ca5e54)] - **test,doc,lib**: 为 lint 规则调整对象字面量换行（Rich Trott） [#37040](https://github.com/nodejs/node/pull/37040)
* \[[`fe9f4fdba5`](https://github.com/nodejs/node/commit/fe9f4fdba5)] - **tools**: 从 stability.js 中移除注释掉的代码（Colin Ihrig） [#37092](https://github.com/nodejs/node/pull/37092)
* \[[`d2d6121f3e`](https://github.com/nodejs/node/commit/d2d6121f3e)] - **tools**: 在 ESLint 规则中启用 object-curly-newline（Rich Trott） [#37040](https://github.com/nodejs/node/pull/37040)
* \[[`3187845980`](https://github.com/nodejs/node/commit/3187845980)] - **util**: 添加内部 createDeferredPromise()（Colin Ihrig） [#37095](https://github.com/nodejs/node/pull/37095)

<a id="15.7.0"></a>

## 2021-01-26，版本 15.7.0（当前），@ruyadorno

### 重要变更

* **buffer**:
  * 引入 Blob（James M Snell） [#36811](https://github.com/nodejs/node/pull/36811)
  * 添加 base64url 编码选项（Filip Skokan） [#36952](https://github.com/nodejs/node/pull/36952)
* **doc**:
  * 将 @iansu 添加为协作者（Ian Sutherland） [#36951](https://github.com/nodejs/node/pull/36951)
  * 将 @RaisinTen 添加为协作者（Darshan Sen） [#36998](https://github.com/nodejs/node/pull/36998)
  * 将 @miladfarca 添加为协作者（Milad Fa） [#36934](https://github.com/nodejs/node/pull/36934)
* **fs**:
  * 允许 `position` 参数在 read 和 readSync 中为 `BigInt`（raisinten） [#36190](https://github.com/nodejs/node/pull/36190)
* **http**:
  * 将 request 作为 res.req 附加（Ian Storm Taylor） [#36505](https://github.com/nodejs/node/pull/36505)
  * 暴露 urlToHttpOptions 实用工具（Yongsheng Zhang） [#35960](https://github.com/nodejs/node/pull/35960)

### 提交

* \[[`775b34b822`](https://github.com/nodejs/node/commit/775b34b822)] - **(SEMVER-MINOR)** **buffer**: 引入 Blob（James M Snell） [#36811](https://github.com/nodejs/node/pull/36811)
* \[[`832cd015d5`](https://github.com/nodejs/node/commit/832cd015d5)] - **(SEMVER-MINOR)** **buffer**: 添加 base64url 编码选项（Filip Skokan） [#36952](https://github.com/nodejs/node/pull/36952)
* \[[`7ce7404f79`](https://github.com/nodejs/node/commit/7ce7404f79)] - **build**: 修复在 no-psk 下针对 openssl 的编译（Caleb ツ Everett） [#36881](https://github.com/nodejs/node/pull/36881)
* \[[`b7d8e61ef1`](https://github.com/nodejs/node/commit/b7d8e61ef1)] - **crypto**: 修复 randomInt 偏差（Tobias Nießen） [#36894](https://github.com/nodejs/node/pull/36894)
* \[[`1149af6265`](https://github.com/nodejs/node/commit/1149af6265)] - **(SEMVER-MINOR)** **crypto**: 为非对称密钥添加 keyObject.asymmetricKeyDetails（Filip Skokan） [#36188](https://github.com/nodejs/node/pull/36188)
* \[[`0398167b35`](https://github.com/nodejs/node/commit/0398167b35)] - **crypto**: 修复 RSA-PSS 密钥的 WebCrypto 导入（Tobias Nießen） [#36877](https://github.com/nodejs/node/pull/36877)
* \[[`e52e860172`](https://github.com/nodejs/node/commit/e52e860172)] - **deps**: 将 npm 升级到 7.4.3（Ruy Adorno） [#37018](https://github.com/nodejs/node/pull/37018)
* \[[`ef3a5f6958`](https://github.com/nodejs/node/commit/ef3a5f6958)] - **deps**: 将 ICU 更新到 68.2（Michaël Zasso） [#36980](https://github.com/nodejs/node/pull/36980)
* \[[`ca479b9e9d`](https://github.com/nodejs/node/commit/ca479b9e9d)] - **deps**: V8：cherry-pick fe191e8d05cc（Benjamin Coe） [#36956](https://github.com/nodejs/node/pull/36956)
* \[[`6f773fbe84`](https://github.com/nodejs/node/commit/6f773fbe84)] - **deps**: 将 npm 升级到 7.4.2（Ruy Adorno） [#36953](https://github.com/nodejs/node/pull/36953)
* \[[`4b952d8d3e`](https://github.com/nodejs/node/commit/4b952d8d3e)] - **doc**: 修复维护 ICU 指南（Michaël Zasso） [#36980](https://github.com/nodejs/node/pull/36980)
* \[[`a2559b9044`](https://github.com/nodejs/node/commit/a2559b9044)] - **doc**: 将 @RaisinTen 添加为协作者（Darshan Sen） [#36998](https://github.com/nodejs/node/pull/36998)
* \[[`4d5273b156`](https://github.com/nodejs/node/commit/4d5273b156)] - **doc**: 修复 http.server.requestTimout 文档中的拼写错误（alexbs） [#36987](https://github.com/nodejs/node/pull/36987)
* \[[`93fc295b75`](https://github.com/nodejs/node/commit/93fc295b75)] - **doc**: 为 fs.readFile 添加性能说明（James M Snell） [#36880](https://github.com/nodejs/node/pull/36880)
* \[[`7ea374b159`](https://github.com/nodejs/node/commit/7ea374b159)] - **doc**: 澄清 http.Agent 的 maxSockets 选项（Pooja D P） [#36941](https://github.com/nodejs/node/pull/36941)
* \[[`f3637d5328`](https://github.com/nodejs/node/commit/f3637d5328)] - **doc**: 移除 pull-requests.md 前言（Rich Trott） [#36960](https://github.com/nodejs/node/pull/36960)
* \[[`d2d9ad7477`](https://github.com/nodejs/node/commit/d2d9ad7477)] - **doc**: 修复 module.isPreloading 文档（Antoine du Hamel） [#36944](https://github.com/nodejs/node/pull/36944)
* \[[`48b6781151`](https://github.com/nodejs/node/commit/48b6781151)] - **doc**: 修复 crypto.generateKeySync aes 允许长度列表（Filip Skokan） [#36928](https://github.com/nodejs/node/pull/36928)
* \[[`120db2c169`](https://github.com/nodejs/node/commit/120db2c169)] - **doc**: 修复 changelog 中的语法和 QUIC 链接（Dan Dascalescu） [#36959](https://github.com/nodejs/node/pull/36959)
* \[[`af0f0a0f65`](https://github.com/nodejs/node/commit/af0f0a0f65)] - **doc**: 修复 perf\_hooks.md 中的百分位范围（raisinten） [#36938](https://github.com/nodejs/node/pull/36938)
* \[[`8cf280d9ab`](https://github.com/nodejs/node/commit/8cf280d9ab)] - **doc**: 改进 perf\_hooks 文档（Juan José Arboleda） [#36909](https://github.com/nodejs/node/pull/36909)
* \[[`3ea37c2d67`](https://github.com/nodejs/node/commit/3ea37c2d67)] - **doc**: 修复文档模板中的无效 HTML（Rich Trott） [#36930](https://github.com/nodejs/node/pull/36930)
* \[[`eaf378aa46`](https://github.com/nodejs/node/commit/eaf378aa46)] - **doc**: 从贡献文档中移除 issue 模板重复内容（Rich Trott） [#36908](https://github.com/nodejs/node/pull/36908)
* \[[`7a794417f3`](https://github.com/nodejs/node/commit/7a794417f3)] - **doc**: 从贡献文档中移除 resolving-a-bug-report（Rich Trott） [#36905](https://github.com/nodejs/node/pull/36905)
* \[[`707b97307d`](https://github.com/nodejs/node/commit/707b97307d)] - **doc**: 为 WASI 示例使用 ESM 语法（Antoine du Hamel） [#36848](https://github.com/nodejs/node/pull/36848)
* \[[`5a9a07e7cd`](https://github.com/nodejs/node/commit/5a9a07e7cd)] - **doc**: 将 iansu 添加为协作者（Ian Sutherland） [#36951](https://github.com/nodejs/node/pull/36951)
* \[[`aa3bc74cd6`](https://github.com/nodejs/node/commit/aa3bc74cd6)] - **doc**: 修复元数据条目中的拼写错误（James M Snell） [#36947](https://github.com/nodejs/node/pull/36947)
* \[[`22e29ccfa3`](https://github.com/nodejs/node/commit/22e29ccfa3)] - **doc**: 为 packages 页面添加替代版本链接（Filip Skokan） [#36915](https://github.com/nodejs/node/pull/36915)
* \[[`80c84a1136`](https://github.com/nodejs/node/commit/80c84a1136)] - **doc**: 将 miladfarca 添加为协作者（Milad Fa） [#36934](https://github.com/nodejs/node/pull/36934)
* \[[`e73b1072f3`](https://github.com/nodejs/node/commit/e73b1072f3)] - **doc**: 更新 tls 测试以使用更合适的术语（Michael Dawson） [#36851](https://github.com/nodejs/node/pull/36851)
* \[[`5cbf638c06`](https://github.com/nodejs/node/commit/5cbf638c06)] - **doc**: 移除不必要的 contributing.md 章节（Rich Trott） [#36891](https://github.com/nodejs/node/pull/36891)
* \[[`f99b38fedd`](https://github.com/nodejs/node/commit/f99b38fedd)] - **doc**: 将 TOC 包裹在 `<details>` 标签中（Mattia Pontonio） [#36896](https://github.com/nodejs/node/pull/36896)
* \[[`82eccddf1e`](https://github.com/nodejs/node/commit/82eccddf1e)] - **doc**: 更新 fs.l/statSync API 历史以反映 throwIfNoEntry（Andrew Casey） [#36882](https://github.com/nodejs/node/pull/36882)
* \[[`70cd43c32e`](https://github.com/nodejs/node/commit/70cd43c32e)] - **doc**: 在必要处将 "it's" 改为 "its"（Tobias Nießen） [#36913](https://github.com/nodejs/node/pull/36913)
* \[[`02a8f52040`](https://github.com/nodejs/node/commit/02a8f52040)] - **doc**: 修复 http2 文档条目的缩进（Rich Trott） [#36869](https://github.com/nodejs/node/pull/36869)
* \[[`dc596d0607`](https://github.com/nodejs/node/commit/dc596d0607)] - **events**: 在 signal abort 时移除 error 监听器（ZiJian Liu） [#36969](https://github.com/nodejs/node/pull/36969)
* \[[`c4cdf1d830`](https://github.com/nodejs/node/commit/c4cdf1d830)] - **(SEMVER-MINOR)** **fs**: 允许 `position` 参数在 read 和 readSync 中为 `BigInt`（raisinten） [#36190](https://github.com/nodejs/node/pull/36190)
* \[[`70ee7dce62`](https://github.com/nodejs/node/commit/70ee7dce62)] - **(SEMVER-MINOR)** **http**: 将 request 作为 res.req 附加（Ian Storm Taylor） [#36505](https://github.com/nodejs/node/pull/36505)
* \[[`f07e1c9d03`](https://github.com/nodejs/node/commit/f07e1c9d03)] - **http**: 仅在 socket 关闭时 abortIncoming（Robert Nagy） [#36821](https://github.com/nodejs/node/pull/36821)
* \[[`aa7243e3d4`](https://github.com/nodejs/node/commit/aa7243e3d4)] - **http**: 重构 ClientRequest destroy（Robert Nagy） [#36863](https://github.com/nodejs/node/pull/36863)
* \[[`80051abfcb`](https://github.com/nodejs/node/commit/80051abfcb)] - **http**: 清理 ClientRequest oncreate（Robert Nagy） [#36862](https://github.com/nodejs/node/pull/36862)
* \[[`f5b8e7b068`](https://github.com/nodejs/node/commit/f5b8e7b068)] - **http2**: 重构以避免不安全的数组迭代（Antoine du Hamel） [#36700](https://github.com/nodejs/node/pull/36700)
* \[[`8aeba3cb92`](https://github.com/nodejs/node/commit/8aeba3cb92)] - **lib**: 重构以使用 validateArray（ZiJian Liu） [#36982](https://github.com/nodejs/node/pull/36982)
* \[[`743dd8f89d`](https://github.com/nodejs/node/commit/743dd8f89d)] - **lib**: 移除 `lib/perf\_hooks.js` 中未使用的 getter（Juan José Arboleda） [#36907](https://github.com/nodejs/node/pull/36907)
* \[[`f2ac4bb8e2`](https://github.com/nodejs/node/commit/f2ac4bb8e2)] - **lib**: 暴露 primordials 对象（Antoine du Hamel） [#36872](https://github.com/nodejs/node/pull/36872)
* \[[`850d3578b6`](https://github.com/nodejs/node/commit/850d3578b6)] - **lib**: 重构 `primordials.makeSafe` 以使用更多 primordials（ExE Boss） [#36865](https://github.com/nodejs/node/pull/36865)
* \[[`b86c48cc91`](https://github.com/nodejs/node/commit/b86c48cc91)] - **lib**: 重构 source\_map 以使用更多 primordials（Antoine du Hamel） [#36733](https://github.com/nodejs/node/pull/36733)
* \[[`1ef92f61fa`](https://github.com/nodejs/node/commit/1ef92f61fa)] - **lib**: 重构 source\_map 以避免不安全的数组迭代（Antoine du Hamel） [#36734](https://github.com/nodejs/node/pull/36734)
* \[[`5290d63e7f`](https://github.com/nodejs/node/commit/5290d63e7f)] - **module**: 结合 throwIfNoEntry 选项简化 tryStatSync（Antoine du Hamel） [#36971](https://github.com/nodejs/node/pull/36971)
* \[[`89a7941425`](https://github.com/nodejs/node/commit/89a7941425)] - **os**: 向量分配的性能改进（Yash Ladha） [#36748](https://github.com/nodejs/node/pull/36748)
* \[[`3f75a60b51`](https://github.com/nodejs/node/commit/3f75a60b51)] - **perf\_hooks**: 如果 histogram.percentile 参数为 NaN，则抛出 ERR\_INVALID\_ARG\_VALUE（ZiJian Liu） [#36937](https://github.com/nodejs/node/pull/36937)
* \[[`9951daefbd`](https://github.com/nodejs/node/commit/9951daefbd)] - **repl**: 重构以避免不安全的数组迭代（raisinten） [#36663](https://github.com/nodejs/node/pull/36663)
* \[[`868d3b2ff6`](https://github.com/nodejs/node/commit/868d3b2ff6)] - **src**: 在 Blob 中使用 BaseObject::kInteralFieldCount（Joyee Cheung） [#36991](https://github.com/nodejs/node/pull/36991)
* \[[`a5ffdaee1c`](https://github.com/nodejs/node/commit/a5ffdaee1c)] - **src**: 在 debug\_utils 中将 push\_back 替换为 emplace\_back（raisinten） [#36897](https://github.com/nodejs/node/pull/36897)
* \[[`d54998538e`](https://github.com/nodejs/node/commit/d54998538e)] - **src**: 在 X509Certificate 构造函数中使用 BaseObject::kInternalFieldCount（Joyee Cheung） [#36892](https://github.com/nodejs/node/pull/36892)
* \[[`7acea78493`](https://github.com/nodejs/node/commit/7acea78493)] - **test**: 将 IBM i 上的测试标记为不稳定（Richard Lau） [#36986](https://github.com/nodejs/node/pull/36986)
* \[[`e69c4a941d`](https://github.com/nodejs/node/commit/e69c4a941d)] - **(SEMVER-MINOR)** **test**: 为 Blob 添加 wpt 测试（Michaël Zasso） [#36811](https://github.com/nodejs/node/pull/36811)
* \[[`2f1f1dadaa`](https://github.com/nodejs/node/commit/2f1f1dadaa)] - **test**: 提高 buffer list 覆盖率（Emil Sivervik） [#36688](https://github.com/nodejs/node/pull/36688)
* \[[`8d49ce9d75`](https://github.com/nodejs/node/commit/8d49ce9d75)] - **test**: 修复 test_environment.cc 中的警告（raisinten） [#36846](https://github.com/nodejs/node/pull/36846)
* \[[`98369aaf7b`](https://github.com/nodejs/node/commit/98369aaf7b)] - **test**: 移除未使用的 ecdhPeerKey（Daniel Bevenius） [#36942](https://github.com/nodejs/node/pull/36942)
* \[[`ba87be0b0e`](https://github.com/nodejs/node/commit/ba87be0b0e)] - **test**: 提高 `Module` getter 的覆盖率（Juan José Arboleda） [#36950](https://github.com/nodejs/node/pull/36950)
* \[[`c7dd9c8c69`](https://github.com/nodejs/node/commit/c7dd9c8c69)] - **test**: 在 test-npm-install 中跳过互联网访问（Ruy Adorno） [#36933](https://github.com/nodejs/node/pull/36933)
* \[[`3bbe9a5588`](https://github.com/nodejs/node/commit/3bbe9a5588)] - **test**: 提高 worker threads 的覆盖率（Juan José Arboleda） [#36910](https://github.com/nodejs/node/pull/36910)
* \[[`f589bb2052`](https://github.com/nodejs/node/commit/f589bb2052)] - **test**: 提高 `lib/internal/vm/module.js` 的覆盖率（Juan José Arboleda） [#36898](https://github.com/nodejs/node/pull/36898)
* \[[`8a8241529e`](https://github.com/nodejs/node/commit/8a8241529e)] - _**回退**_ "**test**: 将 test-cluster-bind-privileged-port 在 arm 上标记为不稳定"（Rod Vagg） [#36884](https://github.com/nodejs/node/pull/36884)
* \[[`99c15909ad`](https://github.com/nodejs/node/commit/99c15909ad)] - **test**: 修复 Windows 上不稳定的 test-crypto-x509（James M Snell） [#36966](https://github.com/nodejs/node/pull/36966)
* \[[`c2ec15aff6`](https://github.com/nodejs/node/commit/c2ec15aff6)] - **test**: 在 test-fs-read-type 中检查 mustCall 错误（Tobias Nießen） [#36914](https://github.com/nodejs/node/pull/36914)
* \[[`30b2aac98a`](https://github.com/nodejs/node/commit/30b2aac98a)] - **test**: 修复非 RSA 密钥的变量名（Tobias Nießen） [#36912](https://github.com/nodejs/node/pull/36912)
* \[[`fada6b0087`](https://github.com/nodejs/node/commit/fada6b0087)] - **test,benchmark**: 停止要求 URL 和 URLSearchParams（raisinten） [#36927](https://github.com/nodejs/node/pull/36927)
* \[[`864b97b24d`](https://github.com/nodejs/node/commit/864b97b24d)] - **tls**: 在默认 SNICallback 中使用最近添加的匹配 SecureContext（Mateusz Krawczuk） [#36072](https://github.com/nodejs/node/pull/36072)
* \[[`6ef54bb9ca`](https://github.com/nodejs/node/commit/6ef54bb9ca)] - **tools**: 清理旧的 ICU 版本特定修复（Michaël Zasso） [#36980](https://github.com/nodejs/node/pull/36980)
* \[[`8e02b53b09`](https://github.com/nodejs/node/commit/8e02b53b09)] - **tools**: 将 ESLint 更新到 7.18.0（Colin Ihrig） [#36955](https://github.com/nodejs/node/pull/36955)
* \[[`8dc8adc782`](https://github.com/nodejs/node/commit/8dc8adc782)] - **tools**: 在 linter 中添加对顶层 await 语法的支持（Antoine du Hamel） [#36911](https://github.com/nodejs/node/pull/36911)
* \[[`17bdcd9d18`](https://github.com/nodejs/node/commit/17bdcd9d18)] - **tools,doc**: 列出每个 API 的稳定性状态（Zijian Liu） [#36223](https://github.com/nodejs/node/pull/36223)
* \[[`889654d36c`](https://github.com/nodejs/node/commit/889654d36c)] - **url**: 将 url format 行为与浏览器对齐（ZiJian Liu） [#36903](https://github.com/nodejs/node/pull/36903)
* \[[`64fed319ef`](https://github.com/nodejs/node/commit/64fed319ef)] - **(SEMVER-MINOR)** **url**: 暴露 urlToHttpOptions 实用工具（Yongsheng Zhang） [#35960](https://github.com/nodejs/node/pull/35960)
* \[[`f2704170a3`](https://github.com/nodejs/node/commit/f2704170a3)] - **util**: 优先使用 `Reflect.ownKeys(…)`（ExE Boss） [#36740](https://github.com/nodejs/node/pull/36740)
* \[[`0d719476e0`](https://github.com/nodejs/node/commit/0d719476e0)] - **vm**: 重构以避免不安全的数组迭代（Antoine du Hamel） [#36752](https://github.com/nodejs/node/pull/36752)
* \[[`bf695ebdb1`](https://github.com/nodejs/node/commit/bf695ebdb1)] - **worker**: 重构以避免不安全的数组迭代（Antoine du Hamel） [#36735](https://github.com/nodejs/node/pull/36735)
* \[[`403b595ef5`](https://github.com/nodejs/node/commit/403b595ef5)] - **zlib**: 重构以避免不安全的数组迭代（Antoine du Hamel） [#36722](https://github.com/nodejs/node/pull/36722)

<a id="15.6.0"></a>

## 2021-01-14, 版本 15.6.0（当前），@danielleadams

### 重要变更

* **child\_process**:
  * 添加 'overlapped' stdio 标志 (Thiago Padilha) [#29412](https://github.com/nodejs/node/pull/29412)
  * 在 fork 中支持 AbortSignal (Benjamin Gruenbaum) [#36603](https://github.com/nodejs/node/pull/36603)
* **crypto**:
  * 实现基础的安全堆支持 (James M Snell) [#36779](https://github.com/nodejs/node/pull/36779)
  * 修复 keygen 错误处理中的 bug (James M Snell) [#36779](https://github.com/nodejs/node/pull/36779)
  * 引入 X509Certificate API (James M Snell) [#36804](https://github.com/nodejs/node/pull/36804)
  * 实现 randomuuid (James M Snell) [#36729](https://github.com/nodejs/node/pull/36729)
* **doc**:
  * 更新 Danielle Adams 的发布密钥 (Danielle Adams) [#36793](https://github.com/nodejs/node/pull/36793)
  * 将 dnlup 添加为协作者 (Daniele Belardi) [#36849](https://github.com/nodejs/node/pull/36849)
  * 将 panva 添加为协作者 (Filip Skokan) [#36802](https://github.com/nodejs/node/pull/36802)
  * 将 yashLadha 添加为协作者 (Yash Ladha) [#36666](https://github.com/nodejs/node/pull/36666)
* **http**:
  * 将 lifo 设置为 Agent 中的默认调度策略 (Matteo Collina) [#36685](https://github.com/nodejs/node/pull/36685)
* **net**:
  * 在 server.listen 中支持 abortSignal (Nitzan Uziely) [#36623](https://github.com/nodejs/node/pull/36623)
* **process**:
  * 直接访问 rss，而无需遍历页面 (Adrien Maret) [#34291](https://github.com/nodejs/node/pull/34291)
* **v8**:
  * 修复原生 `serdes` 构造函数 (ExE Boss) [#36549](https://github.com/nodejs/node/pull/36549)

### 提交

* \[[`3ca7a786c5`](https://github.com/nodejs/node/commit/3ca7a786c5)] - **benchmark**: 修复 http2 基准测试 (Rich Trott) [#36871](https://github.com/nodejs/node/pull/36871)
* \[[`4601886d7c`](https://github.com/nodejs/node/commit/4601886d7c)] - **benchmark**: 使用 test-double 修复 http/headers.js (Rich Trott) [#36794](https://github.com/nodejs/node/pull/36794)
* \[[`7aedda9dcd`](https://github.com/nodejs/node/commit/7aedda9dcd)] - **benchmark**: 添加简单的 https 基准测试 (Andrey Pechkurov) [#36612](https://github.com/nodejs/node/pull/36612)
* \[[`822ac48272`](https://github.com/nodejs/node/commit/822ac48272)] - **buffer**: 使 FastBuffer 可安全构造 (Antoine du Hamel) [#36587](https://github.com/nodejs/node/pull/36587)
* \[[`21f329532f`](https://github.com/nodejs/node/commit/21f329532f)] - **build**: 重构 Makefile (raisinten) [#36759](https://github.com/nodejs/node/pull/36759)
* \[[`857b98eed9`](https://github.com/nodejs/node/commit/857b98eed9)] - **build**: 修复未知的警告选项 (raisinten) [#36629](https://github.com/nodejs/node/pull/36629)
* \[[`ffaa8c1735`](https://github.com/nodejs/node/commit/ffaa8c1735)] - **build**: 不要对本应通过 "source" 引入的脚本执行 "exit" (François-Denis Gonthier) [#35520](https://github.com/nodejs/node/pull/35520)
* \[[`9bc2cec848`](https://github.com/nodejs/node/commit/9bc2cec848)] - **(SEMVER-MINOR)** **child\_process**: 添加 'overlapped' stdio 标志 (Thiago Padilha) [#29412](https://github.com/nodejs/node/pull/29412)
* \[[`b98cc51be2`](https://github.com/nodejs/node/commit/b98cc51be2)] - **child\_process**: 减少 abort 处理程序代码重复 (Rich Trott) [#36644](https://github.com/nodejs/node/pull/36644)
* \[[`78d4d91e54`](https://github.com/nodejs/node/commit/78d4d91e54)] - **child\_process**: 将已被中止的控制器视为正在中止 (Rich Trott) [#36644](https://github.com/nodejs/node/pull/36644)
* \[[`a8a427f646`](https://github.com/nodejs/node/commit/a8a427f646)] - **(SEMVER-MINOR)** **child\_process**: 在 fork 中支持 AbortSignal (Benjamin Gruenbaum) [#36603](https://github.com/nodejs/node/pull/36603)
* \[[`7134d49e56`](https://github.com/nodejs/node/commit/7134d49e56)] - **child\_process**: 正确清理事件监听器 (Benjamin Gruenbaum) [#36424](https://github.com/nodejs/node/pull/36424)
* \[[`54bd4ab855`](https://github.com/nodejs/node/commit/54bd4ab855)] - **cluster**: 修复会抛出 ERR\_INTERNAL\_ASSERTION 的边界情况 (Ouyang Yadong) [#36764](https://github.com/nodejs/node/pull/36764)
* \[[`0c11a17d82`](https://github.com/nodejs/node/commit/0c11a17d82)] - **console**: 重构以避免不安全的数组迭代 (Antoine du Hamel) [#36753](https://github.com/nodejs/node/pull/36753)
* \[[`53cf996270`](https://github.com/nodejs/node/commit/53cf996270)] - **(SEMVER-MINOR)** **crypto**: 实现基础的安全堆支持 (James M Snell) [#36779](https://github.com/nodejs/node/pull/36779)
* \[[`42aca13953`](https://github.com/nodejs/node/commit/42aca13953)] - **(SEMVER-MINOR)** **crypto**: 修复 keygen 错误处理中的 bug (James M Snell) [#36779](https://github.com/nodejs/node/pull/36779)
* \[[`c4ad50e0ff`](https://github.com/nodejs/node/commit/c4ad50e0ff)] - **(SEMVER-MINOR)** **crypto**: 引入 X509Certificate API (James M Snell) [#36804](https://github.com/nodejs/node/pull/36804)
* \[[`4e4deca90d`](https://github.com/nodejs/node/commit/4e4deca90d)] - **(SEMVER-MINOR)** **crypto**: 实现 randomuuid (James M Snell) [#36729](https://github.com/nodejs/node/pull/36729)
* \[[`1c9ec2529e`](https://github.com/nodejs/node/commit/1c9ec2529e)] - **deps**: 将 npm 升级到 7.4.0 (Ruy Adorno) [#36829](https://github.com/nodejs/node/pull/36829)
* \[[`ff5bd04900`](https://github.com/nodejs/node/commit/ff5bd04900)] - **deps**: 将 nghttp2 更新到 1.42.0 (Michaël Zasso) [#36842](https://github.com/nodejs/node/pull/36842)
* \[[`578fa0fedf`](https://github.com/nodejs/node/commit/578fa0fedf)] - **deps**: V8: 反向摘取 dfcdf7837e23 (Benjamin Coe) [#36573](https://github.com/nodejs/node/pull/36573)
* \[[`05f34c6963`](https://github.com/nodejs/node/commit/05f34c6963)] - **doc**: 定义 "browser"、"production"、"development" (Guy Bedford) [#36856](https://github.com/nodejs/node/pull/36856)
* \[[`e8bb1f7350`](https://github.com/nodejs/node/commit/e8bb1f7350)] - **doc**: 澄清 event.isTrusted 文本 (Rich Trott) [#36827](https://github.com/nodejs/node/pull/36827)
* \[[`153be6c80e`](https://github.com/nodejs/node/commit/153be6c80e)] - **doc**: 修复 module syncBuiltinESMExports 示例 (Bruce A. MacNaughton) [#34284](https://github.com/nodejs/node/pull/34284)
* \[[`3b64b38142`](https://github.com/nodejs/node/commit/3b64b38142)] - **doc**: os.uptime() 临时 bug 通告 (Nicholas Schamberg) [#36503](https://github.com/nodejs/node/pull/36503)
* \[[`da49624a46`](https://github.com/nodejs/node/commit/da49624a46)] - **doc**: 更新 Danielle Adams 的发布密钥 (Danielle Adams) [#36793](https://github.com/nodejs/node/pull/36793)
* \[[`2d8423da3c`](https://github.com/nodejs/node/commit/2d8423da3c)] - **doc**: 澄清 child\_process.exec 会继承 cwd (ugultopu) [#36809](https://github.com/nodejs/node/pull/36809)
* \[[`1a4d34ebd0`](https://github.com/nodejs/node/commit/1a4d34ebd0)] - **doc**: 澄清 \_writev chunks 参数的描述 (James M Snell) [#36822](https://github.com/nodejs/node/pull/36822)
* \[[`7c7180a6f7`](https://github.com/nodejs/node/commit/7c7180a6f7)] - **doc**: 清晰地记录 buffer 的 "Uint" 别名 (Michaël Zasso) [#36796](https://github.com/nodejs/node/pull/36796)
* \[[`ff6edbc6b2`](https://github.com/nodejs/node/commit/ff6edbc6b2)] - **doc**: 将 dnlup 添加为协作者 (Daniele Belardi) [#36849](https://github.com/nodejs/node/pull/36849)
* \[[`835bdf0e50`](https://github.com/nodejs/node/commit/835bdf0e50)] - **doc**: 改进 crypto.randomUUID() 文本 (Rich Trott) [#36830](https://github.com/nodejs/node/pull/36830)
* \[[`d4bcb3689d`](https://github.com/nodejs/node/commit/d4bcb3689d)] - **doc**: 澄清 subprocess.stdout/in/err/io 属性 (James M Snell) [#36784](https://github.com/nodejs/node/pull/36784)
* \[[`a956fb3fdd`](https://github.com/nodejs/node/commit/a956fb3fdd)] - **doc**: 添加深色模式 (Ajay Poshak) [#36313](https://github.com/nodejs/node/pull/36313)
* \[[`757b9664cd`](https://github.com/nodejs/node/commit/757b9664cd)] - **doc**: 修订 async\_hooks.md 中的方法文本 (Rich Trott) [#36736](https://github.com/nodejs/node/pull/36736)
* \[[`b4091ea59b`](https://github.com/nodejs/node/commit/b4091ea59b)] - **doc**: 澄清何时会触发 messageerror (James M Snell) [#36780](https://github.com/nodejs/node/pull/36780)
* \[[`61b039365c`](https://github.com/nodejs/node/commit/61b039365c)] - **doc**: 避免 async\_hooks 示例中的内存泄漏警告 (James M Snell) [#36783](https://github.com/nodejs/node/pull/36783)
* \[[`a7bb4da55e`](https://github.com/nodejs/node/commit/a7bb4da55e)] - **doc**: 澄清 --require 仅支持 cjs (James M Snell) [#36806](https://github.com/nodejs/node/pull/36806)
* \[[`c6eb2b4fec`](https://github.com/nodejs/node/commit/c6eb2b4fec)] - **doc**: 澄清使用 ArrayBuffer 时的 Buffer.from (James M Snell) [#36785](https://github.com/nodejs/node/pull/36785)
* \[[`ad1d8fba9f`](https://github.com/nodejs/node/commit/ad1d8fba9f)] - **doc**: 修复 ChildProcess 的损坏链接 (James M Snell) [#36788](https://github.com/nodejs/node/pull/36788)
* \[[`ef628891f7`](https://github.com/nodejs/node/commit/ef628891f7)] - **doc**: 修订 async\_hooks.md 中的 exit() 和 run() 文本 (Rich Trott) [#36738](https://github.com/nodejs/node/pull/36738)
* \[[`ff39464559`](https://github.com/nodejs/node/commit/ff39464559)] - **doc**: 将 OpenSSL 的 CVE 修复添加到 v15.5.0 的重要变更中 (Beth Griggs) [#36798](https://github.com/nodejs/node/pull/36798)
* \[[`6db465a99f`](https://github.com/nodejs/node/commit/6db465a99f)] - **doc**: 澄清 N-API 插件具有上下文感知能力 (Alba Mendez) [#36640](https://github.com/nodejs/node/pull/36640)
* \[[`fad07d5439`](https://github.com/nodejs/node/commit/fad07d5439)] - **doc**: 修复 esm 文档中的拼写错误 (Mohamed Kamagate) [#36800](https://github.com/nodejs/node/pull/36800)
* \[[`67dd48ed05`](https://github.com/nodejs/node/commit/67dd48ed05)] - **doc**: 将 panva 添加为协作者 (Filip Skokan) [#36802](https://github.com/nodejs/node/pull/36802)
* \[[`b2c1aeb694`](https://github.com/nodejs/node/commit/b2c1aeb694)] - **doc**: 修订 process.memoryUsage() 文本 (Rich Trott) [#36757](https://github.com/nodejs/node/pull/36757)
* \[[`8f672ebbd6`](https://github.com/nodejs/node/commit/8f672ebbd6)] - **doc**: 为 process.memoryUsage.rss 添加 YAML 元数据 (Gerhard Stoebich) [#36781](https://github.com/nodejs/node/pull/36781)
* \[[`fa54f012b8`](https://github.com/nodejs/node/commit/fa54f012b8)] - **doc**: 减少 async\_hooks.md 中的缩写 (Rich Trott) [#36737](https://github.com/nodejs/node/pull/36737)
* \[[`56c00d7b2f`](https://github.com/nodejs/node/commit/56c00d7b2f)] - **doc**: 简化拉取请求模板 (Rich Trott) [#36739](https://github.com/nodejs/node/pull/36739)
* \[[`214dbac8ff`](https://github.com/nodejs/node/commit/214dbac8ff)] - **doc**: 澄清未文档化的 stream 属性 (James M Snell) [#36715](https://github.com/nodejs/node/pull/36715)
* \[[`242ce19346`](https://github.com/nodejs/node/commit/242ce19346)] - **doc**: 记录常见的警告类型 (James M Snell) [#36713](https://github.com/nodejs/node/pull/36713)
* \[[`d3dc124575`](https://github.com/nodejs/node/commit/d3dc124575)] - **doc**: 更新 fs streams 的 emitClose 默认值 (Kevin Locke) [#36653](https://github.com/nodejs/node/pull/36653)
* \[[`181bd0510f`](https://github.com/nodejs/node/commit/181bd0510f)] - **doc**: 改进 ALS.enterWith 和 exit 的描述 (Andrey Pechkurov) [#36705](https://github.com/nodejs/node/pull/36705)
* \[[`edf8c6de5a`](https://github.com/nodejs/node/commit/edf8c6de5a)] - **doc**: 添加关于不可克隆对象的说明 (James M Snell) [#36534](https://github.com/nodejs/node/pull/36534)
* \[[`651e7d27b7`](https://github.com/nodejs/node/commit/651e7d27b7)] - **doc**: 记录 http.IncomingMessage 行为变更 (Dr) [#36641](https://github.com/nodejs/node/pull/36641)
* \[[`72b0ab0739`](https://github.com/nodejs/node/commit/72b0ab0739)] - **doc**: 将 yashLadha 添加为协作者 (Yash Ladha) [#36666](https://github.com/nodejs/node/pull/36666)
* \[[`8a0cdb3b4e`](https://github.com/nodejs/node/commit/8a0cdb3b4e)] - **doc**: 按字母顺序排列 http 响应属性 (Rich Trott) [#36631](https://github.com/nodejs/node/pull/36631)
* \[[`ff4674b033`](https://github.com/nodejs/node/commit/ff4674b033)] - **doc**: 更正 createPushResponse() 的回调参数类型 (Rich Trott) [#36631](https://github.com/nodejs/node/pull/36631)
* \[[`f623d5d377`](https://github.com/nodejs/node/commit/f623d5d377)] - **doc**: 使用 _代码名_ 而不是 _代号_ (Rich Trott) [#36611](https://github.com/nodejs/node/pull/36611)
* \[[`1ed517c176`](https://github.com/nodejs/node/commit/1ed517c176)] - **doc**: 记录 https.request 的返回值 (Michael Chen) [#36370](https://github.com/nodejs/node/pull/36370)
* \[[`5645b21e23`](https://github.com/nodejs/node/commit/5645b21e23)] - **doc**: 记录 “http: lazy create IncomingMessage.headers” (ExE Boss) [#36601](https://github.com/nodejs/node/pull/36601)
* \[[`3ee4cfc7d7`](https://github.com/nodejs/node/commit/3ee4cfc7d7)] - **doc**: 修复 \_construct() 示例中的错误 (Maksym Baranovskyi) [#36509](https://github.com/nodejs/node/pull/36509)
* \[[`93237c5999`](https://github.com/nodejs/node/commit/93237c5999)] - **doc**: 移除对 GitHub 模板的重复 (Rich Trott) [#36590](https://github.com/nodejs/node/pull/36590)
* \[[`538f226f6d`](https://github.com/nodejs/node/commit/538f226f6d)] - **doc**: 从拉取请求模板中移除 "Related Issues" (Rich Trott) [#36590](https://github.com/nodejs/node/pull/36590)
* \[[`dcc93d3dce`](https://github.com/nodejs/node/commit/dcc93d3dce)] - **doc**: 扩展 openssl 指令 (Michael Dawson) [#36554](https://github.com/nodejs/node/pull/36554)
* \[[`41e278bf61`](https://github.com/nodejs/node/commit/41e278bf61)] - **docs**: 添加指向 punycode.md 的引用 (Isaac Levy) [#36761](https://github.com/nodejs/node/pull/36761)
* \[[`9b9b6d5fc5`](https://github.com/nodejs/node/commit/9b9b6d5fc5)] - **domain**: 使 node 对 Array 原型篡改更具弹性 (Antoine du Hamel) [#36676](https://github.com/nodejs/node/pull/36676)
* \[[`f0a9c53bec`](https://github.com/nodejs/node/commit/f0a9c53bec)] - **errors**: 重构以使用更多 primordials (Antoine du Hamel) [#36651](https://github.com/nodejs/node/pull/36651)
* \[[`c844d22b72`](https://github.com/nodejs/node/commit/c844d22b72)] - **errors**: 消除隐藏调用的所有开销 (Momtchil Momtchev) [#35644](https://github.com/nodejs/node/pull/35644)
* \[[`3fa470a3c9`](https://github.com/nodejs/node/commit/3fa470a3c9)] - **events**: 重构以使用可选链 (ZiJian Liu) [#36763](https://github.com/nodejs/node/pull/36763)
* \[[`82393aefff`](https://github.com/nodejs/node/commit/82393aefff)] - **events**: 重构以使用更多 primordials (Antoine du Hamel) [#36304](https://github.com/nodejs/node/pull/36304)
* \[[`e3a091d9f3`](https://github.com/nodejs/node/commit/e3a091d9f3)] - **fs**: 重构以避免不安全的数组迭代 (Antoine du Hamel) [#36699](https://github.com/nodejs/node/pull/36699)
* \[[`d5e1b82125`](https://github.com/nodejs/node/commit/d5e1b82125)] - **fs**: 在 writeBuffer 中接受非 32 位长度 (raisinten) [#36667](https://github.com/nodejs/node/pull/36667)
* \[[`d858c9576a`](https://github.com/nodejs/node/commit/d858c9576a)] - **http**: 从 internal/http.js 中移除死代码 (ZiJian Liu) [#36630](https://github.com/nodejs/node/pull/36630)
* \[[`7e3ad1be32`](https://github.com/nodejs/node/commit/7e3ad1be32)] - _**Revert**_ "**http**: 从 internal/http.js 中移除死代码" (ZiJian Liu) [#36890](https://github.com/nodejs/node/pull/36890)
* \[[`a9a2dd32e3`](https://github.com/nodejs/node/commit/a9a2dd32e3)] - **http**: 不要对 noop .end() 执行 cork (Robert Nagy) [#36633](https://github.com/nodejs/node/pull/36633)
* \[[`dfc962f67a`](https://github.com/nodejs/node/commit/dfc962f67a)] - **http**: 为 req-res close 顺序添加测试用例 (Daniele Belardi) [#36645](https://github.com/nodejs/node/pull/36645)
* \[[`cc28d2f541`](https://github.com/nodejs/node/commit/cc28d2f541)] - **(SEMVER-MINOR)** **http**: 将 lifo 设置为 Agent 中的默认调度策略 (Matteo Collina) [#36685](https://github.com/nodejs/node/pull/36685)
* \[[`954a36947d`](https://github.com/nodejs/node/commit/954a36947d)] - **http**: 使 HEAD 方法可与 keep-alive 配合工作 (Joseph Hackman) [#34231](https://github.com/nodejs/node/pull/34231)
* \[[`9156f430b5`](https://github.com/nodejs/node/commit/9156f430b5)] - **http**: 从 internal/http.js 中移除死代码 (ZiJian Liu) [#36630](https://github.com/nodejs/node/pull/36630)
* \[[`5e499c490e`](https://github.com/nodejs/node/commit/5e499c490e)] - **http**: 重构以使用更多 primordials (Antoine du Hamel) [#36194](https://github.com/nodejs/node/pull/36194)
* \[[`c784f15588`](https://github.com/nodejs/node/commit/c784f15588)] - _**Revert**_ "**http**: 在 incoming message 中使用 `autoDestroy: true`" (Daniele Belardi) [#36647](https://github.com/nodejs/node/pull/36647)
* \[[`a38ad0709c`](https://github.com/nodejs/node/commit/a38ad0709c)] - **http2**: 重构为使用 primordials 而不是 \<string>.indexOf (Rohan Chougule) [#36679](https://github.com/nodejs/node/pull/36679)
* \[[`e85fbb778d`](https://github.com/nodejs/node/commit/e85fbb778d)] - **http2**: 修复 core.js 中的拼写错误 (Pranshu Jethmalani) [#36719](https://github.com/nodejs/node/pull/36719)
* \[[`a4d64f967a`](https://github.com/nodejs/node/commit/a4d64f967a)] - **https**: 重构以使用更多 primordials (Antoine du Hamel) [#36195](https://github.com/nodejs/node/pull/36195)
* \[[`1db3772c95`](https://github.com/nodejs/node/commit/1db3772c95)] - **lib**: 简化 `primordials.uncurryThis` (ExE Boss) [#36866](https://github.com/nodejs/node/pull/36866)
* \[[`95219eac08`](https://github.com/nodejs/node/commit/95219eac08)] - **lib**: 在 cluster master 中重构为使用映射 (Yash Ladha) [#36250](https://github.com/nodejs/node/pull/36250)
* \[[`b764269437`](https://github.com/nodejs/node/commit/b764269437)] - **lib**: 从 eslint ignore list 中移除 v8\_prof\_polyfill (Antoine du Hamel) [#36537](https://github.com/nodejs/node/pull/36537)
* \[[`eb6b38639a`](https://github.com/nodejs/node/commit/eb6b38639a)] - **lib**: 移除未使用的代码 (Brian White) [#36632](https://github.com/nodejs/node/pull/36632)
* \[[`7fe1b5ef5a`](https://github.com/nodejs/node/commit/7fe1b5ef5a)] - **lib**: 重构以使用 validateCallback (ZiJian Liu) [#36609](https://github.com/nodejs/node/pull/36609)
* \[[`bb4f8c8732`](https://github.com/nodejs/node/commit/bb4f8c8732)] - **lib**: 在 shared validators 中使用更多 primordials (Pooja D P) [#36552](https://github.com/nodejs/node/pull/36552)
* \[[`181bad58d3`](https://github.com/nodejs/node/commit/181bad58d3)] - **lib**: 添加 primordials.SafeArrayIterator (Antoine du Hamel) [#36532](https://github.com/nodejs/node/pull/36532)
* \[[`6e338dac3c`](https://github.com/nodejs/node/commit/6e338dac3c)] - **lib**: 在 internal/encoding.js 中重构以使用更多 primordials (raisinten) [#36480](https://github.com/nodejs/node/pull/36480)
* \[[`ec3e841f59`](https://github.com/nodejs/node/commit/ec3e841f59)] - **lib**: 在 internal/priority\_queue.js 中重构以使用 primordials (ZiJian Liu) [#36560](https://github.com/nodejs/node/pull/36560)
* \[[`8ac2016229`](https://github.com/nodejs/node/commit/8ac2016229)] - **lib**: 添加 primordials.SafeStringIterator (Antoine du Hamel) [#36526](https://github.com/nodejs/node/pull/36526)
* \[[`56af1250fe`](https://github.com/nodejs/node/commit/56af1250fe)] - **lib**: 使安全 primordials 可安全构造 (Antoine du Hamel) [#36428](https://github.com/nodejs/node/pull/36428)
* \[[`d20235b6cb`](https://github.com/nodejs/node/commit/d20235b6cb)] - **lib**: 修复 diagnostics\_channel hasSubscribers 错误 (ZiJian Liu) [#36599](https://github.com/nodejs/node/pull/36599)
* \[[`63091f8440`](https://github.com/nodejs/node/commit/63091f8440)] - **lib**: 在 internal/histogram.js 中重构以使用更多 primordials (raisinten) [#36455](https://github.com/nodejs/node/pull/36455)
* \[[`eca2df0909`](https://github.com/nodejs/node/commit/eca2df0909)] - **meta**: 当有人强制推送时通知 slack (Mary Marchini) [#35131](https://github.com/nodejs/node/pull/35131)
* \[[`01213c71b9`](https://github.com/nodejs/node/commit/01213c71b9)] - **module**: 修复 Windows 文件夹导出弃用警告 (Guy Bedford) [#36859](https://github.com/nodejs/node/pull/36859)
* \[[`302be57be4`](https://github.com/nodejs/node/commit/302be57be4)] - **module**: 重构以避免不安全的数组迭代 (Antoine du Hamel) [#36680](https://github.com/nodejs/node/pull/36680)
* \[[`24246a29d7`](https://github.com/nodejs/node/commit/24246a29d7)] - **net**: 如果 blockList.addSubnet prefix 为 NaN，则抛出 ERR\_OUT\_OF\_RANGE (ZiJian Liu) [#36732](https://github.com/nodejs/node/pull/36732)
* \[[`02dbcc4317`](https://github.com/nodejs/node/commit/02dbcc4317)] - **(SEMVER-MINOR)** **net**: 在 server.listen 中支持 abortSignal (Nitzan Uziely) [#36623](https://github.com/nodejs/node/pull/36623)
* \[[`a258bc9b70`](https://github.com/nodejs/node/commit/a258bc9b70)] - **perf\_hooks**: 重构以避免不安全的数组迭代 (Antoine du Hamel) [#36723](https://github.com/nodejs/node/pull/36723)
* \[[`94afc3e712`](https://github.com/nodejs/node/commit/94afc3e712)] - **process**: 向 setuid/setgid 传入 -1 不应中止 (James M Snell) [#36786](https://github.com/nodejs/node/pull/36786)
* \[[`92af50327e`](https://github.com/nodejs/node/commit/92af50327e)] - **(SEMVER-MINOR)** **process**: 添加无需遍历页面即可直接访问 rss 的能力 (Adrien Maret) [#34291](https://github.com/nodejs/node/pull/34291)
* \[[`8b7336b072`](https://github.com/nodejs/node/commit/8b7336b072)] - **quic,timers**: 重构以使用 validateAbortSignal (ZiJian Liu) [#36604](https://github.com/nodejs/node/pull/36604)
* \[[`b17130a55a`](https://github.com/nodejs/node/commit/b17130a55a)] - **readline**: 修复连接到非终端输出的 Interface 的行为 (Antoine du Hamel) [#36774](https://github.com/nodejs/node/pull/36774)
* \[[`d70824f567`](https://github.com/nodejs/node/commit/d70824f567)] - **src**: 修复 crypto_aes.cc 中的拼写错误 (Ikko Ashimine) [#36717](https://github.com/nodejs/node/pull/36717)
* \[[`8b43388903`](https://github.com/nodejs/node/commit/8b43388903)] - **src**: 使用新的 env 工具函数减少重复样板代码 (James M Snell) [#36536](https://github.com/nodejs/node/pull/36536)
* \[[`a53997e6c0`](https://github.com/nodejs/node/commit/a53997e6c0)] - **src**: 修复 URL 中前导反斜杠 bug (raisinten) [#36613](https://github.com/nodejs/node/pull/36613)
* \[[`abae61e230`](https://github.com/nodejs/node/commit/abae61e230)] - **stream**: finished 等待 OutgoingMessage 的 'close' 事件 (Robert Nagy) [#36648](https://github.com/nodejs/node/pull/36648)
* \[[`4c819d65f9`](https://github.com/nodejs/node/commit/4c819d65f9)] - **stream**: 修复 .end() 错误传播 (Robert Nagy) [#36817](https://github.com/nodejs/node/pull/36817)
* \[[`cb0b53edb1`](https://github.com/nodejs/node/commit/cb0b53edb1)] - **stream**: 延迟读取 ReadStream (Momtchil Momtchev) [#36823](https://github.com/nodejs/node/pull/36823)
* \[[`b996e3b4b5`](https://github.com/nodejs/node/commit/b996e3b4b5)] - **stream**: 不再使用 \_stream\_\* (Matteo Collina) [#36684](https://github.com/nodejs/node/pull/36684)
* \[[`190ddced46`](https://github.com/nodejs/node/commit/190ddced46)] - **stream**: 仅在不是 willEmitClose 时使用旧版 close 监听器 (Robert Nagy) [#36649](https://github.com/nodejs/node/pull/36649)
* \[[`1fc30a84ac`](https://github.com/nodejs/node/commit/1fc30a84ac)] - **stream,zlib**: 不再使用 \_stream\_\* (Matteo Collina) [#36618](https://github.com/nodejs/node/pull/36618)
* \[[`d2b9e7cb01`](https://github.com/nodejs/node/commit/d2b9e7cb01)] - **string\_decoder**: 对 UTF-8 抛出 ERR\_STRING\_TOO\_LONG (Michaël Zasso) [#36661](https://github.com/nodejs/node/pull/36661)
* \[[`abc2ff47c2`](https://github.com/nodejs/node/commit/abc2ff47c2)] - **test**: 在 asan 下禁用 test-crypto-secure-heap (James M Snell) [#36900](https://github.com/nodejs/node/pull/36900)
* \[[`17a52337c4`](https://github.com/nodejs/node/commit/17a52337c4)] - **test**: socket 双重结束后完成 http 响应 (Dimitris Halatsis) [#36633](https://github.com/nodejs/node/pull/36633)
* \[[`cc37ff24dc`](https://github.com/nodejs/node/commit/cc37ff24dc)] - **test**: 在 test-crypto-dh-leak 中使用更快的 rss 变体 (Pooja D P) [#36766](https://github.com/nodejs/node/pull/36766)
* \[[`daad0ab1cc`](https://github.com/nodejs/node/commit/daad0ab1cc)] - **test**: 在 test-vm-memleak.js 中使用更快的 rss 变体 (Pooja D P) [#36769](https://github.com/nodejs/node/pull/36769)
* \[[`9d25d25cfd`](https://github.com/nodejs/node/commit/9d25d25cfd)] - **test**: 将 test-cluster-bind-privileged-port 在 arm 上标记为 flaky (James M Snell) [#36850](https://github.com/nodejs/node/pull/36850)
* \[[`c64db20fdd`](https://github.com/nodejs/node/commit/c64db20fdd)] - **test**: 在 test-memoryusage-emfile 中使用更快的 rss 变体 (Pooja D P) [#36768](https://github.com/nodejs/node/pull/36768)
* \[[`d48e00e5a3`](https://github.com/nodejs/node/commit/d48e00e5a3)] - **test**: 为 IBMi 修复 test-memory-usage.js (Rich Trott) [#36758](https://github.com/nodejs/node/pull/36758)
* \[[`9b7d2c2523`](https://github.com/nodejs/node/commit/9b7d2c2523)] - **test**: 保护大型字符串解码器分配 (Michaël Zasso) [#36795](https://github.com/nodejs/node/pull/36795)
* \[[`5bc130bd9e`](https://github.com/nodejs/node/commit/5bc130bd9e)] - **test**: 提高 events 的覆盖率 (ZiJian Liu) [#36668](https://github.com/nodejs/node/pull/36668)
* \[[`9f7fbcc64d`](https://github.com/nodejs/node/commit/9f7fbcc64d)] - **test**: 添加对 breakLength 单列数组的覆盖 (Rich Trott) [#36657](https://github.com/nodejs/node/pull/36657)
* \[[`9eff709c23`](https://github.com/nodejs/node/commit/9eff709c23)] - **test**: 更新 wpt 接口 (Daijiro Wachi) [#36659](https://github.com/nodejs/node/pull/36659)
* \[[`a7f743f5cc`](https://github.com/nodejs/node/commit/a7f743f5cc)] - **test**: 更新 wpt 资源 (Daijiro Wachi) [#36659](https://github.com/nodejs/node/pull/36659)
* \[[`4acc2732f9`](https://github.com/nodejs/node/commit/4acc2732f9)] - **test**: 更新 wpt 编码 (Daijiro Wachi) [#36659](https://github.com/nodejs/node/pull/36659)
* \[[`986d5aca44`](https://github.com/nodejs/node/commit/986d5aca44)] - **test**: 更新 wpt url (Daijiro Wachi) [#36659](https://github.com/nodejs/node/pull/36659)
* \[[`833e614682`](https://github.com/nodejs/node/commit/833e614682)] - **test**: 提高 diagnostics\_channel 的覆盖率 (ZiJian Liu) [#36602](https://github.com/nodejs/node/pull/36602)
* \[[`f0dfe57bd1`](https://github.com/nodejs/node/commit/f0dfe57bd1)] - **test**: 为 spawn() 添加已中止控制器测试 (Rich Trott) [#36644](https://github.com/nodejs/node/pull/36644)
* \[[`d5d56ec3d4`](https://github.com/nodejs/node/commit/d5d56ec3d4)] - **test**: 为 execfile() 添加复用 AbortController 的测试 (Rich Trott) [#36644](https://github.com/nodejs/node/pull/36644)
* \[[`f81556563a`](https://github.com/nodejs/node/commit/f81556563a)] - **test**: 提高 internal/error\_serdes.js 的覆盖率 (ZiJian Liu) [#36628](https://github.com/nodejs/node/pull/36628)
* \[[`34d1d791e5`](https://github.com/nodejs/node/commit/34d1d791e5)] - **test**: 改进带类的 util.inspect() 覆盖率 (Rich Trott) [#36625](https://github.com/nodejs/node/pull/36625)
* \[[`1f3bc5ed73`](https://github.com/nodejs/node/commit/1f3bc5ed73)] - **test**: 提高 runInAsyncScope() 覆盖率 (Rich Trott) [#36624](https://github.com/nodejs/node/pull/36624)
* \[[`863bfc44d2`](https://github.com/nodejs/node/commit/863bfc44d2)] - **test**: 重定向 stderr EnvironmentWithNoESMLoader (Daniel Bevenius) [#36548](https://github.com/nodejs/node/pull/36548)
* \[[`8e8b16ff7e`](https://github.com/nodejs/node/commit/8e8b16ff7e)] - **timers**: 重构以使用可选链 (ZiJian Liu) [#36767](https://github.com/nodejs/node/pull/36767)
* \[[`c23cca2de9`](https://github.com/nodejs/node/commit/c23cca2de9)] - **tls**: 重构以避免不安全的数组迭代 (Antoine du Hamel) [#36772](https://github.com/nodejs/node/pull/36772)
* \[[`37becfda8c`](https://github.com/nodejs/node/commit/37becfda8c)] - **tools**: 更新所有 lint-md rollup 依赖 (Michaël Zasso) [#36843](https://github.com/nodejs/node/pull/36843)
* \[[`cfdbb79ccf`](https://github.com/nodejs/node/commit/cfdbb79ccf)] - **tools**: 更新文档工具依赖 (Michaël Zasso) [#36844](https://github.com/nodejs/node/pull/36844)
* \[[`1f2a198c32`](https://github.com/nodejs/node/commit/1f2a198c32)] - **tools**: 修复 ICU 68.1 源码的 md5 哈希 (Richard Lau) [#36777](https://github.com/nodejs/node/pull/36777)
* \[[`4e0995bc60`](https://github.com/nodejs/node/commit/4e0995bc60)] - **tools**: 将 ESLint 更新到 7.17.0 (Colin Ihrig) [#36726](https://github.com/nodejs/node/pull/36726)
* \[[`8ad3455ae3`](https://github.com/nodejs/node/commit/8ad3455ae3)] - **tools**: 轻微修订 install.py 以改进 (Rich Trott) [#36626](https://github.com/nodejs/node/pull/36626)
* \[[`b367d5a61d`](https://github.com/nodejs/node/commit/b367d5a61d)] - **tools**: 将 gyp-next 更新到 v0.7.0 (Michaël Zasso) [#36580](https://github.com/nodejs/node/pull/36580)
* \[[`10f1c893c8`](https://github.com/nodejs/node/commit/10f1c893c8)] - **tools**: 更正 genv8constants.py 的使用消息 (Rich Trott) [#36606](https://github.com/nodejs/node/pull/36606)
* \[[`37b39a2d6b`](https://github.com/nodejs/node/commit/37b39a2d6b)] - **tools**: 在 genv8constants.py 中显式调用 close() (Rich Trott) [#36606](https://github.com/nodejs/node/pull/36606)
* \[[`7664f3678c`](https://github.com/nodejs/node/commit/7664f3678c)] - **tools**: 在 Python 中一致使用 `is None` (Rich Trott) [#36606](https://github.com/nodejs/node/pull/36606)
* \[[`cb7f73c9d4`](https://github.com/nodejs/node/commit/cb7f73c9d4)] - **tools**: 修订 configure.py 中的一行以提高清晰度 (Rich Trott) [#36551](https://github.com/nodejs/node/pull/36551)
* \[[`258aa50986`](https://github.com/nodejs/node/commit/258aa50986)] - **tty**: 重构以避免不安全的数组迭代 (Antoine du Hamel) [#36771](https://github.com/nodejs/node/pull/36771)
* \[[`5cb8b16452`](https://github.com/nodejs/node/commit/5cb8b16452)] - **url**: 修复带 ipv6 主机名的 url.format (ZiJian Liu) [#36665](https://github.com/nodejs/node/pull/36665)
* \[[`b1c6a44caf`](https://github.com/nodejs/node/commit/b1c6a44caf)] - **url**: 重构以使用更多 primordials (Antoine du Hamel) [#36316](https://github.com/nodejs/node/pull/36316)
* \[[`baa8064bd0`](https://github.com/nodejs/node/commit/baa8064bd0)] - **util**: 重构 inspect.js 以使用更多 primodials (Rohan Chougule) [#36730](https://github.com/nodejs/node/pull/36730)
* \[[`bff201a66d`](https://github.com/nodejs/node/commit/bff201a66d)] - **util**: 移除不可达的防御性代码 (Rich Trott) [#36744](https://github.com/nodejs/node/pull/36744)
* \[[`64bf2f229e`](https://github.com/nodejs/node/commit/64bf2f229e)] - **util**: 重构以使用更多 primordials (Antoine du Hamel) [#36265](https://github.com/nodejs/node/pull/36265)
* \[[`2dd2ec3836`](https://github.com/nodejs/node/commit/2dd2ec3836)] - **v8**: 重构以使用更多 primordials (Antoine du Hamel) [#36527](https://github.com/nodejs/node/pull/36527)
* \[[`3170636a8e`](https://github.com/nodejs/node/commit/3170636a8e)] - **(SEMVER-MINOR)** **v8**: 修复原生 `serdes` 构造函数 (ExE Boss) [#36549](https://github.com/nodejs/node/pull/36549)
* \[[`d5a9799e76`](https://github.com/nodejs/node/commit/d5a9799e76)] - **wasi**: 重构以避免不安全的数组迭代 (Antoine du Hamel) [#36724](https://github.com/nodejs/node/pull/36724)
* \[[`b6f74b0b09`](https://github.com/nodejs/node/commit/b6f74b0b09)] - **zlib**: 重构为使用 primordial 而不是 \<string>.startsWith (Rohan Chougule) [#36718](https://github.com/nodejs/node/pull/36718)

<a id="15.5.1"></a>

## 2021-01-04，版本 15.5.1（当前），@BethGriggs

这是一个安全更新。

### 主要变更

已修复的漏洞：

* **CVE-2020-8265**：TLSWrap 中的释放后使用（高危）
  * 受影响的 Node.js 版本存在 TLS 实现中的释放后使用漏洞。在向启用 TLS 的 socket 写入时，node::StreamBase::Write 会以一个新分配的 WriteWrap 对象作为第一个参数调用 node::TLSWrap::DoWrite。如果 DoWrite 方法没有返回错误，该对象会作为 StreamWriteResult 结构的一部分传回给调用者。这可能被利用来破坏内存，导致拒绝服务，或潜在的其他利用。

* **CVE-2020-8287**：nodejs 中的 HTTP 请求走私（低危）
  * 受影响版本的 Node.js 允许在一个 http 请求中出现两份相同的 header 字段。例如，两个 Transfer-Encoding header 字段。在这种情况下，Node.js 会识别第一个 header 字段并忽略第二个。这可能导致 HTTP 请求走私
    (<https://cwe.mitre.org/data/definitions/444.html>)。

### 提交

* \[[`c5dbe831b7`](https://github.com/nodejs/node/commit/c5dbe831b7)] - **http**：为 http transfer encoding smuggling 添加测试（Matteo Collina）[nodejs-private/node-private#228](https://github.com/nodejs-private/node-private/pull/228)
* \[[`e0c9a2285c`](https://github.com/nodejs/node/commit/e0c9a2285c)] - **http**：在新的 `Transfer-Encoding` 上取消设置 `F_CHUNKED`（Matteo Collina）[nodejs-private/node-private#228](https://github.com/nodejs-private/node-private/pull/228)
* \[[`9834ef85a0`](https://github.com/nodejs/node/commit/9834ef85a0)] - **src**：保留对 WriteWrap/ShutdownWrap 的指针（James M Snell）[nodejs-private/node-private#23](https://github.com/nodejs-private/node-private/pull/23)

<a id="15.5.0"></a>

## 2020-12-22，版本 15.5.0（当前），@targos

### 主要变更

#### OpenSSL-1.1.1i

OpenSSL-1.1.1i 包含对 CVE-2020-1971 的修复：OpenSSL - EDIPARTYNAME 空指针解引用（高危）。这是 OpenSSL 中的一个漏洞，可通过 Node.js 被利用。你可以在 <https://www.openssl.org/news/secadv/20201208.txt> 了解更多。

由 Myles Borins 贡献 [#36520](https://github.com/nodejs/node/pull/36520)。

#### child_process 和 stream 中对 `AbortSignal` 的扩展支持

以下 API 现在在其 options 对象中支持 `AbortSignal`：

* `child_process.spawn()`

在对应的 `AbortController` 上调用 `.abort()`，与对子进程调用 `.kill()` 类似，只是传递给回调的错误将是 `AbortError`：

```js
const controller = new AbortController();
const { signal } = controller;
const grep = spawn('grep', ['ssh'], { signal });
grep.on('error', (err) => {
  // 如果控制器中止，这里会被调用，且 err 为 AbortError
});
controller.abort(); // 停止进程
```

* `new stream.Writable()` 和 `new stream.Readable()`

在对应的 `AbortController` 上调用 `.abort()`，其行为与在 stream 上调用 `.destroy(new AbortError())` 相同：

```js
const { Readable } = require('stream');
const controller = new AbortController();
const read = new Readable({
  read(size) {
    // ...
  },
  signal: controller.signal,
});
// 稍后，中止操作并关闭流
controller.abort();
```

由 Benjamin Gruenbaum 贡献 [#36431](https://github.com/nodejs/node/pull/36431), [#36432](https://github.com/nodejs/node/pull/36432)。

#### `querystring.stringify()` 中支持 BigInt

如果 `querystring.stringify()` 使用包含 `BigInt` 值的对象调用，这些值现在会被序列化为十进制表示，而不是空字符串：

```js
const querystring = require('querystring');
console.log(querystring.stringify({ bigint: 2n ** 64n }));
// 输出：bigint=18446744073709551616
```

由 Darshan Sen 贡献 [#36499](https://github.com/nodejs/node/pull/36499)。

#### C++ embedder API 的新增内容

对于调用 `SetIsolateUpForNode()` 的用户，现在提供了一个新的 `IsolateSettingsFlag`：`SHOULD_NOT_SET_PREPARE_STACK_TRACE_CALLBACK` 可用于阻止 Node.js 设置自定义回调来准备堆栈跟踪。

由 Shelley Vohr 贡献 [#36447](https://github.com/nodejs/node/pull/36447)。

***

新增 `node::GetEnvironmentIsolateData()` 和 `node::GetArrayBufferAllocator()`，分别用于获取当前的 `IsolateData*`，以及从中获取当前 Node.js 的 `ArrayBufferAllocator`（如果存在）。

由 Anna Henningsen 贡献 [#36441](https://github.com/nodejs/node/pull/36441)。

#### 新的核心协作者

在本次发布中，我们欢迎一位新的 Node.js 核心协作者：

* Pooja D P [@PoojaDurgad](https://github.com/PoojaDurgad) [#36511](https://github.com/nodejs/node/pull/36511)

### 提交

#### Semver-minor 提交

* \[[`e449571230`](https://github.com/nodejs/node/commit/e449571230)] - **(SEMVER-MINOR)** **child_process**：为 spawn 添加 signal 支持（Benjamin Gruenbaum）[#36432](https://github.com/nodejs/node/pull/36432)
* \[[`25d7e90386`](https://github.com/nodejs/node/commit/25d7e90386)] - **(SEMVER-MINOR)** **http**：在传入消息中使用 `autoDestroy: true`（Daniele Belardi）[#33035](https://github.com/nodejs/node/pull/33035)
* \[[`5481be8cbd`](https://github.com/nodejs/node/commit/5481be8cbd)] - **(SEMVER-MINOR)** **lib**：支持 querystring.stringify 中的 BigInt（raisinten）[#36499](https://github.com/nodejs/node/pull/36499)
* \[[`036ed1fafc`](https://github.com/nodejs/node/commit/036ed1fafc)] - **(SEMVER-MINOR)** **src**：增加从 Environment 获取 IsolateData 和 allocator 的方式（Anna Henningsen）[#36441](https://github.com/nodejs/node/pull/36441)
* \[[`e23309486b`](https://github.com/nodejs/node/commit/e23309486b)] - **(SEMVER-MINOR)** **src**：允许阻止 SetPrepareStackTraceCallback（Shelley Vohr）[#36447](https://github.com/nodejs/node/pull/36447)
* \[[`6ecbc1dcb3`](https://github.com/nodejs/node/commit/6ecbc1dcb3)] - **(SEMVER-MINOR)** **stream**：在构造函数中支持 abortsignal（Benjamin Gruenbaum）[#36431](https://github.com/nodejs/node/pull/36431)

#### Semver-patch 提交

* \[[`1330995b80`](https://github.com/nodejs/node/commit/1330995b80)] - **build,lib,test**：将 whitelist 更改为 allowlist（Michaël Zasso）[#36406](https://github.com/nodejs/node/pull/36406)
* \[[`dc8d1a74a6`](https://github.com/nodejs/node/commit/dc8d1a74a6)] - **deps**：将 npm 升级到 7.3.0（Ruy Adorno）[#36572](https://github.com/nodejs/node/pull/36572)
* \[[`b6a31f0a70`](https://github.com/nodejs/node/commit/b6a31f0a70)] - **deps**：为 OpenSSL-1.1.1i 更新 archs 文件（Myles Borins）[#36520](https://github.com/nodejs/node/pull/36520)
* \[[`5b49807c3f`](https://github.com/nodejs/node/commit/5b49807c3f)] - **deps**：重新启用 OPENSSL_NO_QUIC 保护（James M Snell）[#36520](https://github.com/nodejs/node/pull/36520)
* \[[`309e2971a2`](https://github.com/nodejs/node/commit/309e2971a2)] - **deps**：来自 akamai/openssl 的多项 quic 补丁（Todd Short）[#36520](https://github.com/nodejs/node/pull/36520)
* \[[`27fb651cbc`](https://github.com/nodejs/node/commit/27fb651cbc)] - **deps**：将 openssl 源码升级到 1.1.1i（Myles Borins）[#36520](https://github.com/nodejs/node/pull/36520)
* \[[`1f43aadf90`](https://github.com/nodejs/node/commit/1f43aadf90)] - **deps**：更新 openssl 更新所需的补丁和文档（Myles Borins）[#36520](https://github.com/nodejs/node/pull/36520)
* \[[`752c94d202`](https://github.com/nodejs/node/commit/752c94d202)] - **deps**：修复预发布 node 的 npm doctor 测试（nlf）[#36543](https://github.com/nodejs/node/pull/36543)
* \[[`b0393fa2ed`](https://github.com/nodejs/node/commit/b0393fa2ed)] - **deps**：将 npm 升级到 7.2.0（Myles Borins）[#36543](https://github.com/nodejs/node/pull/36543)
* \[[`cb4652e91d`](https://github.com/nodejs/node/commit/cb4652e91d)] - **deps**：更新到 c-ares 1.17.1（Danny Sonnenschein）[#36207](https://github.com/nodejs/node/pull/36207)
* \[[`21fbcb6f81`](https://github.com/nodejs/node/commit/21fbcb6f81)] - **deps**：V8：回移植 4bf051d536a1（Anna Henningsen）[#36482](https://github.com/nodejs/node/pull/36482)
* \[[`30fe0ff681`](https://github.com/nodejs/node/commit/30fe0ff681)] - **deps**：将 npm 升级到 7.1.2（Darcy Clarke）[#36487](https://github.com/nodejs/node/pull/36487)
* \[[`0baa610c3e`](https://github.com/nodejs/node/commit/0baa610c3e)] - **deps**：将 npm 升级到 7.1.1（Ruy Adorno）[#36459](https://github.com/nodejs/node/pull/36459)
* \[[`5929b08851`](https://github.com/nodejs/node/commit/5929b08851)] - **deps**：将 npm 升级到 7.1.0（Ruy Adorno）[#36395](https://github.com/nodejs/node/pull/36395)
* \[[`deaafd5788`](https://github.com/nodejs/node/commit/deaafd5788)] - **dns**：重构以使用更多 primordials（Antoine du Hamel）[#36314](https://github.com/nodejs/node/pull/36314)
* \[[`e30af7be33`](https://github.com/nodejs/node/commit/e30af7be33)] - **fs**：重构以使用可选链（ZiJian Liu）[#36524](https://github.com/nodejs/node/pull/36524)
* \[[`213dcd7930`](https://github.com/nodejs/node/commit/213dcd7930)] - **http**：为 incomingmessage destroy 添加测试（Daniele Belardi）[#33035](https://github.com/nodejs/node/pull/33035)
* \[[`36b4ddd382`](https://github.com/nodejs/node/commit/36b4ddd382)] - **http**：在 IncomingMEssage onError 中使用标准参数顺序（Daniele Belardi）[#33035](https://github.com/nodejs/node/pull/33035)
* \[[`60b5e696fc`](https://github.com/nodejs/node/commit/60b5e696fc)] - **http**：移除尾随空格（Daniele Belardi）[#33035](https://github.com/nodejs/node/pull/33035)
* \[[`f11a648d8e`](https://github.com/nodejs/node/commit/f11a648d8e)] - **http**：在 \_http\_incoming 中添加注释（Daniele Belardi）[#33035](https://github.com/nodejs/node/pull/33035)
* \[[`4b81d79b58`](https://github.com/nodejs/node/commit/4b81d79b58)] - **http**：修复 incoming message 中的 lint 错误（Daniele Belardi）[#33035](https://github.com/nodejs/node/pull/33035)
* \[[`397e31e25f`](https://github.com/nodejs/node/commit/397e31e25f)] - **http**：重构 incoming message destroy（Daniele Belardi）[#33035](https://github.com/nodejs/node/pull/33035)
* \[[`9852ebca8d`](https://github.com/nodejs/node/commit/9852ebca8d)] - **http**：在 Agent 中不要遍历原型（Michaël Zasso）[#36410](https://github.com/nodejs/node/pull/36410)
* \[[`e46a46a4cd`](https://github.com/nodejs/node/commit/e46a46a4cd)] - **inspector**：重构以使用更多 primordials（Antoine du Hamel）[#36356](https://github.com/nodejs/node/pull/36356)
* \[[`728f512c7d`](https://github.com/nodejs/node/commit/728f512c7d)] - **lib**：使安全 primordials 可安全迭代（Antoine du Hamel）[#36391](https://github.com/nodejs/node/pull/36391)
* \[[`f368d697cf`](https://github.com/nodejs/node/commit/f368d697cf)] - _**Revert**_ "**perf_hooks**：使 PerformanceObserver 成为 AsyncResource"（Nicolai Stange）[#36343](https://github.com/nodejs/node/pull/36343)
* \[[`e2ced0d401`](https://github.com/nodejs/node/commit/e2ced0d401)] - **perf_hooks**：通过 MakeSyncCallback() 调用 performance_entry_callback（Nicolai Stange）[#36343](https://github.com/nodejs/node/pull/36343)
* \[[`7c903ec6c8`](https://github.com/nodejs/node/commit/7c903ec6c8)] - **repl**：默认禁用阻塞式补全（Anna Henningsen）[#36564](https://github.com/nodejs/node/pull/36564)
* \[[`d38a0ec93e`](https://github.com/nodejs/node/commit/d38a0ec93e)] - **src**：移除不必要的 ToLocalChecked node_errors（Daniel Bevenius）[#36547](https://github.com/nodejs/node/pull/36547)
* \[[`bbc0d14cd2`](https://github.com/nodejs/node/commit/bbc0d14cd2)] - **src**：为检查点使用正确的 microtask 队列（Anna Henningsen）[#36581](https://github.com/nodejs/node/pull/36581)
* \[[`7efb3111e8`](https://github.com/nodejs/node/commit/7efb3111e8)] - **src**：移除不必要的 ToLocalChecked 调用（Daniel Bevenius）[#36523](https://github.com/nodejs/node/pull/36523)
* \[[`68687d3419`](https://github.com/nodejs/node/commit/68687d3419)] - **src**：移除 node_env_var.cc 中对空名称的检查（raisinten）[#36133](https://github.com/nodejs/node/pull/36133)
* \[[`1b4984de98`](https://github.com/nodejs/node/commit/1b4984de98)] - **src**：移除 node_v8.cc 中重复的 V 宏（Daniel Bevenius）[#36454](https://github.com/nodejs/node/pull/36454)
* \[[`5ff7f42e65`](https://github.com/nodejs/node/commit/5ff7f42e65)] - **src**：使用正确的外层 Context 的 microtask 队列（Anna Henningsen）[#36482](https://github.com/nodejs/node/pull/36482)
* \[[`96c095f237`](https://github.com/nodejs/node/commit/96c095f237)] - **src**：在 node_errors.cc 中防范 env != null（Anna Henningsen）[#36414](https://github.com/nodejs/node/pull/36414)
* \[[`4f3d7bb417`](https://github.com/nodejs/node/commit/4f3d7bb417)] - **src**：引入便捷的 node::MakeSyncCallback()（Nicolai Stange）[#36343](https://github.com/nodejs/node/pull/36343)
* \[[`e59788262c`](https://github.com/nodejs/node/commit/e59788262c)] - **src**：为 CleanupHookCallback 回调添加 typedef（Daniel Bevenius）[#36442](https://github.com/nodejs/node/pull/36442)
* \[[`2a60e3b9df`](https://github.com/nodejs/node/commit/2a60e3b9df)] - **src**：修复 memory_tracker-inl.h 中的缩进（Daniel Bevenius）[#36425](https://github.com/nodejs/node/pull/36425)
* \[[`210390f6fd`](https://github.com/nodejs/node/commit/210390f6fd)] - **src**：移除重复的 V 宏（Daniel Bevenius）[#36427](https://github.com/nodejs/node/pull/36427)
* \[[`02afe586aa`](https://github.com/nodejs/node/commit/02afe586aa)] - **src**：一致地使用 using 声明（Daniel Bevenius）[#36365](https://github.com/nodejs/node/pull/36365)
* \[[`169406b7d7`](https://github.com/nodejs/node/commit/169406b7d7)] - **src**：添加缺失的 context 作用域（Anna Henningsen）[#36413](https://github.com/nodejs/node/pull/36413)
* \[[`3f33d0bcda`](https://github.com/nodejs/node/commit/3f33d0bcda)] - **stream**：修复以 needDrain 开始时的 pipe 死锁（Robert Nagy）[#36563](https://github.com/nodejs/node/pull/36563)
* \[[`d8b5b9499c`](https://github.com/nodejs/node/commit/d8b5b9499c)] - **stream**：接受 iterable 作为有效的第一个参数（ZiJian Liu）[#36479](https://github.com/nodejs/node/pull/36479)
* \[[`58319d5336`](https://github.com/nodejs/node/commit/58319d5336)] - **tls**：转发新的 SecureContext 选项（Alba Mendez）[#36416](https://github.com/nodejs/node/pull/36416)
* \[[`fa40366276`](https://github.com/nodejs/node/commit/fa40366276)] - **util**：简化 inspect() 中的构造函数获取（Rich Trott）[#36466](https://github.com/nodejs/node/pull/36466)
* \[[`cc544dbfaa`](https://github.com/nodejs/node/commit/cc544dbfaa)] - **util**：修复检查期间对 null 原型的 instanceof 检查（Ruben Bridgewater）[#36178](https://github.com/nodejs/node/pull/36178)
* \[[`13d6597b4b`](https://github.com/nodejs/node/commit/13d6597b4b)] - **util**：修复检查期间的模块前缀（Ruben Bridgewater）[#36178](https://github.com/nodejs/node/pull/36178)
* \[[`20ecc82569`](https://github.com/nodejs/node/commit/20ecc82569)] - **worker**：修复广播通道 SharedArrayBuffer 传递（Anna Henningsen）[#36501](https://github.com/nodejs/node/pull/36501)
* \[[`56fe9bae26`](https://github.com/nodejs/node/commit/56fe9bae26)] - **worker**：重构 MessagePort 绑定管理（Anna Henningsen）[#36345](https://github.com/nodejs/node/pull/36345)

#### 文档提交

* \[[`19c233232f`](https://github.com/nodejs/node/commit/19c233232f)] - **doc**：修复 stream.Readable 的 AbortSignal 示例（Michaël Zasso）[#36596](https://github.com/nodejs/node/pull/36596)
* \[[`9fbab3e2f5`](https://github.com/nodejs/node/commit/9fbab3e2f5)] - **doc**：更新并为 Babel 运行 license-builder（Michaël Zasso）[#36504](https://github.com/nodejs/node/pull/36504)
* \[[`a1ba6686a0`](https://github.com/nodejs/node/commit/a1ba6686a0)] - **doc**：补充关于 Collaborators 讨论页面的说明（FrankQiu）[#36420](https://github.com/nodejs/node/pull/36420)
* \[[`c5602fb166`](https://github.com/nodejs/node/commit/c5602fb166)] - **doc**：简化 worker_threads.md 文本（Rich Trott）[#36545](https://github.com/nodejs/node/pull/36545)
* \[[`149f2cfac1`](https://github.com/nodejs/node/commit/149f2cfac1)] - **doc**：增加两个加速开发构建的技巧（Momtchil Momtchev）[#36452](https://github.com/nodejs/node/pull/36452)
* \[[`ad75c78c32`](https://github.com/nodejs/node/commit/ad75c78c32)] - **doc**：增加关于 TypedArray 的 timingSafeEqual 注释（Tobias Nießen）[#36323](https://github.com/nodejs/node/pull/36323)
* \[[`9830fe5c9e`](https://github.com/nodejs/node/commit/9830fe5c9e)] - **doc**：将 Derek Lewis 移至 emeritus（Rich Trott）[#36514](https://github.com/nodejs/node/pull/36514)
* \[[`eb29a16bae`](https://github.com/nodejs/node/commit/eb29a16bae)] - **doc**：为 github pr 模板添加 issue 引用（Chinmoy Chakraborty）[#36440](https://github.com/nodejs/node/pull/36440)
* \[[`f09985d42a`](https://github.com/nodejs/node/commit/f09985d42a)] - **doc**：更新 url.md（Rock）[#36147](https://github.com/nodejs/node/pull/36147)
* \[[`c3ec90d23c`](https://github.com/nodejs/node/commit/c3ec90d23c)] - **doc**：明确回退 node_version.h 的更改（Richard Lau）[#36461](https://github.com/nodejs/node/pull/36461)
* \[[`7a34452b1d`](https://github.com/nodejs/node/commit/7a34452b1d)] - **doc**：向 README 添加许可信息（FrankQiu）[#36278](https://github.com/nodejs/node/pull/36278)
* \[[`22f039339f`](https://github.com/nodejs/node/commit/22f039339f)] - **doc**：修订 addon 多次初始化的文本（Rich Trott）[#36457](https://github.com/nodejs/node/pull/36457)
* \[[`25a245443a`](https://github.com/nodejs/node/commit/25a245443a)] - **doc**：为 CHANGELOG.md 添加 v15.4.0 链接（Danielle Adams）[#36456](https://github.com/nodejs/node/pull/36456)
* \[[`1ec8516fd6`](https://github.com/nodejs/node/commit/1ec8516fd6)] - **doc**：将 PoojaDurgad 添加到 collaborators（Pooja D P）[#36511](https://github.com/nodejs/node/pull/36511)
* \[[`98918110a1`](https://github.com/nodejs/node/commit/98918110a1)] - **doc**：编辑关于事件循环阻塞的 addon 文本（Rich Trott）[#36448](https://github.com/nodejs/node/pull/36448)
* \[[`62bfe3d313`](https://github.com/nodejs/node/commit/62bfe3d313)] - **doc**：注明 v15.0.0 更改了默认的 --unhandled-rejections=throw（kai zhu）[#36361](https://github.com/nodejs/node/pull/36361)
* \[[`129053fe4c`](https://github.com/nodejs/node/commit/129053fe4c)] - **doc**：更新术语（Michael Dawson）[#36475](https://github.com/nodejs/node/pull/36475)
* \[[`e331de2571`](https://github.com/nodejs/node/commit/e331de2571)] - **doc**：改写 addons.md 中的 POSIX 线程文本（Rich Trott）[#36436](https://github.com/nodejs/node/pull/36436)
* \[[`04f166389b`](https://github.com/nodejs/node/commit/04f166389b)] - **doc**：将 RaisinTen 添加为 triager（raisinten）[#36404](https://github.com/nodejs/node/pull/36404)
* \[[`3341b2cb9d`](https://github.com/nodejs/node/commit/3341b2cb9d)] - **doc**：记录 ABORT_ERR 代码（Benjamin Gruenbaum）[#36319](https://github.com/nodejs/node/pull/36319)
* \[[`6a6b3af736`](https://github.com/nodejs/node/commit/6a6b3af736)] - **doc**：为 techinical values 提供更多上下文（Michael Dawson）[#36201](https://github.com/nodejs/node/pull/36201)

#### 其他提交

* \[[`e1f00fd996`](https://github.com/nodejs/node/commit/e1f00fd996)] - **benchmark**：减少代码重复（Rich Trott）[#36568](https://github.com/nodejs/node/pull/36568)
* \[[`82a26268d7`](https://github.com/nodejs/node/commit/82a26268d7)] - **build**：不要对草稿 PR 运行 GitHub actions（Michaël Zasso）[#35910](https://github.com/nodejs/node/pull/35910)
* \[[`95c80f5fb0`](https://github.com/nodejs/node/commit/95c80f5fb0)] - **build**：仅在 nodejs/node 上运行某些工作流（Michaël Zasso）[#36507](https://github.com/nodejs/node/pull/36507)
* \[[`584ea8b26c`](https://github.com/nodejs/node/commit/584ea8b26c)] - **build**：修复 make test-npm（Ruy Adorno）[#36369](https://github.com/nodejs/node/pull/36369)
* \[[`01576fbc19`](https://github.com/nodejs/node/commit/01576fbc19)] - **test**：增加 abort 逻辑覆盖率（Moshe vilner）[#36586](https://github.com/nodejs/node/pull/36586)
* \[[`22ac2279ee`](https://github.com/nodejs/node/commit/22ac2279ee)] - **test**：增加 stream 覆盖率（ZiJian Liu）[#36538](https://github.com/nodejs/node/pull/36538)
* \[[`9fc2479707`](https://github.com/nodejs/node/commit/9fc2479707)] - **test**：增加 worker 覆盖率（ZiJian Liu）[#36491](https://github.com/nodejs/node/pull/36491)
* \[[`81e603b7cf`](https://github.com/nodejs/node/commit/81e603b7cf)] - **test**：为 globals 指定全局对象（Rich Trott）[#36498](https://github.com/nodejs/node/pull/36498)
* \[[`109ab787fd`](https://github.com/nodejs/node/commit/109ab787fd)] - **test**：增加 fs/dir read 覆盖率（Zijian Liu）[#36388](https://github.com/nodejs/node/pull/36388)
* \[[`9f2d3c291b`](https://github.com/nodejs/node/commit/9f2d3c291b)] - **test**：将 test-http2-client-upload 标记为 flaky（Rich Trott）[#36496](https://github.com/nodejs/node/pull/36496)
* \[[`d299ceeac7`](https://github.com/nodejs/node/commit/d299ceeac7)] - **test**：增加 net/blocklist 覆盖率（Zijian Liu）[#36405](https://github.com/nodejs/node/pull/36405)
* \[[`f7635fd86d`](https://github.com/nodejs/node/commit/f7635fd86d)] - **test**：使可执行文件名更通用（Shelley Vohr）[#36489](https://github.com/nodejs/node/pull/36489)
* \[[`acd78d9d25`](https://github.com/nodejs/node/commit/acd78d9d25)] - **test**：增加外部化字符串长度（Shelley Vohr）[#36451](https://github.com/nodejs/node/pull/36451)
* \[[`0f749a35ec`](https://github.com/nodejs/node/commit/0f749a35ec)] - **test**：为 PerformanceObserver 中的异步上下文添加测试（ZauberNerd）[#36343](https://github.com/nodejs/node/pull/36343)
* \[[`dd705ad1f0`](https://github.com/nodejs/node/commit/dd705ad1f0)] - **test**：增加 execFile abort 覆盖率（Moshe vilner）[#36429](https://github.com/nodejs/node/pull/36429)
* \[[`31b062d591`](https://github.com/nodejs/node/commit/31b062d591)] - **test**：修复 flaky 的 test-repl（Rich Trott）[#36415](https://github.com/nodejs/node/pull/36415)
* \[[`023291b43c`](https://github.com/nodejs/node/commit/023291b43c)] - **test**：检查 util.inspect() 中的 null proto-of-proto（Rich Trott）[#36399](https://github.com/nodejs/node/pull/36399)
* \[[`d3d1f338c7`](https://github.com/nodejs/node/commit/d3d1f338c7)] - **test**：为 test-signal-handler 添加 SIGTRAP（Ash Cripps）[#36368](https://github.com/nodejs/node/pull/36368)
* \[[`166aa8a7b5`](https://github.com/nodejs/node/commit/166aa8a7b5)] - **test**：修复 child-process-pipe-dataflow（Santiago Gimeno）[#36366](https://github.com/nodejs/node/pull/36366)
* \[[`ecbb757ae0`](https://github.com/nodejs/node/commit/ecbb757ae0)] - **tools**：修复 make-v8.sh（Richard Lau）[#36594](https://github.com/nodejs/node/pull/36594)
* \[[`e3c5adc6d0`](https://github.com/nodejs/node/commit/e3c5adc6d0)] - **tools**：修复 release script sign 函数（Antoine du Hamel）[#36556](https://github.com/nodejs/node/pull/36556)
* \[[`0d4d34748d`](https://github.com/nodejs/node/commit/0d4d34748d)] - **tools**：将 ESLint 更新到 7.16.0（Yongsheng Zhang）[#36579](https://github.com/nodejs/node/pull/36579)
* \[[`f3828c9dcb`](https://github.com/nodejs/node/commit/f3828c9dcb)] - **tools**：修复 update-eslint.sh（Yongsheng Zhang）[#36579](https://github.com/nodejs/node/pull/36579)
* \[[`27260c70b4`](https://github.com/nodejs/node/commit/27260c70b4)] - **tools**：修复 release script（Antoine du Hamel）[#36540](https://github.com/nodejs/node/pull/36540)
* \[[`c6700ad041`](https://github.com/nodejs/node/commit/c6700ad041)] - **tools**：移除 configure.py 中未使用的变量（Rich Trott）[#36525](https://github.com/nodejs/node/pull/36525)
* \[[`7b8d373d5e`](https://github.com/nodejs/node/commit/7b8d373d5e)] - **tools**：为 shell 脚本添加 lint（Antoine du Hamel）[#36099](https://github.com/nodejs/node/pull/36099)
* \[[`c6e65d09ef`](https://github.com/nodejs/node/commit/c6e65d09ef)] - **tools**：更新 tools/node-lint-md-cli-rollup 中的 ini（Myles Borins）[#36474](https://github.com/nodejs/node/pull/36474)
* \[[`7542a3bd55`](https://github.com/nodejs/node/commit/7542a3bd55)] - **tools**：启用 no-unsafe-optional-chaining lint 规则（Colin Ihrig）[#36411](https://github.com/nodejs/node/pull/36411)
* \[[`26f8ccfbe6`](https://github.com/nodejs/node/commit/26f8ccfbe6)] - **tools**：将 ESLint 更新到 7.15.0（Colin Ihrig）[#36411](https://github.com/nodejs/node/pull/36411)
* \[[`8ecf2f9976`](https://github.com/nodejs/node/commit/8ecf2f9976)] - **tools**：更新文档工具依赖（Michaël Zasso）[#36407](https://github.com/nodejs/node/pull/36407)
* \[[`040b39f076`](https://github.com/nodejs/node/commit/040b39f076)] - **tools**：启用 no-unused-expressions lint 规则（Michaël Zasso）[#36248](https://github.com/nodejs/node/pull/36248)

<a id="15.4.0"></a>

## 2020-12-09，版本 15.4.0（当前），@danielleadams

### 值得注意的变更

* **child\_processes**:
  * 添加 AbortSignal 支持（Benjamin Gruenbaum）[#36308](https://github.com/nodejs/node/pull/36308)
* **deps**:
  * 将 ICU 更新到 68.1（Michaël Zasso）[#36187](https://github.com/nodejs/node/pull/36187)
* **events**:
  * 在 EventTarget 中支持 signal（Benjamin Gruenbaum）[#36258](https://github.com/nodejs/node/pull/36258)
  * 将 Event、EventTarget、AbortController 升级为稳定（James M Snell）[#35949](https://github.com/nodejs/node/pull/35949)
* **http**:
  * 通过 setHeader() 启用链式调用（pooja d.p）[#35924](https://github.com/nodejs/node/pull/35924)
* **module**:
  * 添加 isPreloading 指示器（James M Snell）[#36263](https://github.com/nodejs/node/pull/36263)
* **stream**:
  * 支持 abort signal（Benjamin Gruenbaum）[#36061](https://github.com/nodejs/node/pull/36061)
  * 为 Read/WriteStream 添加 FileHandle 支持（Momtchil Momtchev）[#35922](https://github.com/nodejs/node/pull/35922)
* **worker**:
  * 添加实验性的 BroadcastChannel（James M Snell）[#36271](https://github.com/nodejs/node/pull/36271)

### 提交

* \[[`e79bdc313a`](https://github.com/nodejs/node/commit/e79bdc313a)] - **assert**: 重构以使用更多 primordials（Antoine du Hamel）[#36234](https://github.com/nodejs/node/pull/36234)
* \[[`2344e3e360`](https://github.com/nodejs/node/commit/2344e3e360)] - **benchmark**: 将 `fstat` 改为 `fstatSync`（Narasimha Prasanna HN）[#36206](https://github.com/nodejs/node/pull/36206)
* \[[`ca8db41151`](https://github.com/nodejs/node/commit/ca8db41151)] - **benchmark,child\_process**: 移除失败的 benchmark 参数（Antoine du Hamel）[#36295](https://github.com/nodejs/node/pull/36295)
* \[[`9db9be774b`](https://github.com/nodejs/node/commit/9db9be774b)] - **buffer**: 重构以使用 primordials 替代 Array#reduce（Antoine du Hamel）[#36392](https://github.com/nodejs/node/pull/36392)
* \[[`8d8d2261a5`](https://github.com/nodejs/node/commit/8d8d2261a5)] - **buffer**: 重构以使用更多 primordials（Antoine du Hamel）[#36166](https://github.com/nodejs/node/pull/36166)
* \[[`74adc441c4`](https://github.com/nodejs/node/commit/74adc441c4)] - **build**: 修复 Makefile 中的拼写错误（raisinten）[#36176](https://github.com/nodejs/node/pull/36176)
* \[[`224a6471cc`](https://github.com/nodejs/node/commit/224a6471cc)] - **(SEMVER-MINOR)** **child\_process**: 添加 AbortSignal 支持（Benjamin Gruenbaum）[#36308](https://github.com/nodejs/node/pull/36308)
* \[[`4ca1bd8806`](https://github.com/nodejs/node/commit/4ca1bd8806)] - **child\_process**: 重构以使用更多 primordials（Zijian Liu）[#36269](https://github.com/nodejs/node/pull/36269)
* \[[`841e8f444e`](https://github.com/nodejs/node/commit/841e8f444e)] - **crypto**: 修复 “Invalid JWK” 错误消息（Filip Skokan）[#36200](https://github.com/nodejs/node/pull/36200)
* \[[`278862aeb9`](https://github.com/nodejs/node/commit/278862aeb9)] - **deps**: 将 npm 升级到 7.0.15（Ruy Adorno）[#36293](https://github.com/nodejs/node/pull/36293)
* \[[`66bc2067ce`](https://github.com/nodejs/node/commit/66bc2067ce)] - **deps**: V8: 选择性回移植 86991d0587a1（Benjamin Coe）[#36254](https://github.com/nodejs/node/pull/36254)
* \[[`095cef2c11`](https://github.com/nodejs/node/commit/095cef2c11)] - **deps**: 将 ICU 更新到 68.1（Michaël Zasso）[#36187](https://github.com/nodejs/node/pull/36187)
* \[[`8d69d8387e`](https://github.com/nodejs/node/commit/8d69d8387e)] - **dgram**: 重构以使用更多 primordials（Antoine du Hamel）[#36286](https://github.com/nodejs/node/pull/36286)
* \[[`bef550a50c`](https://github.com/nodejs/node/commit/bef550a50c)] - **doc**: 添加用于获取 Windows 版本的 Powershell 单行命令（Michael Bashurov）[#30289](https://github.com/nodejs/node/pull/30289)
* \[[`2649c384c6`](https://github.com/nodejs/node/commit/2649c384c6)] - **doc**: 为 timers/promises 添加版本元数据（Colin Ihrig）[#36378](https://github.com/nodejs/node/pull/36378)
* \[[`0401ffbfb6`](https://github.com/nodejs/node/commit/0401ffbfb6)] - **doc**: 添加处理过早披露的流程（Michael Dawson）[#36155](https://github.com/nodejs/node/pull/36155)
* \[[`3e5fcda13e`](https://github.com/nodejs/node/commit/3e5fcda13e)] - **doc**: 在 intl.md 中添加表头（Rich Trott）[#36261](https://github.com/nodejs/node/pull/36261)
* \[[`65d89fdd69`](https://github.com/nodejs/node/commit/65d89fdd69)] - **doc**: 为 Buffer.isBuffer 方法添加示例（naortedgi）[#36233](https://github.com/nodejs/node/pull/36233)
* \[[`03cf8dbc0e`](https://github.com/nodejs/node/commit/03cf8dbc0e)] - **doc**: 修复 events.md 中的拼写错误（Luigi Pinca）[#36231](https://github.com/nodejs/node/pull/36231)
* \[[`b176d61e8c`](https://github.com/nodejs/node/commit/b176d61e8c)] - **doc**: 修复 --experimental-wasm-modules 文本位置（Colin Ihrig）[#36220](https://github.com/nodejs/node/pull/36220)
* \[[`44c4aaddad`](https://github.com/nodejs/node/commit/44c4aaddad)] - **doc**: 稳定子路径模式（Guy Bedford）[#36177](https://github.com/nodejs/node/pull/36177)
* \[[`fdf5d851d0`](https://github.com/nodejs/node/commit/fdf5d851d0)] - **doc**: 为 update cmd 添加缺失的版本信息（Ruy Adorno）[#36204](https://github.com/nodejs/node/pull/36204)
* \[[`186ad24fdf`](https://github.com/nodejs/node/commit/186ad24fdf)] - **doc**: 清理 events.md 结构（James M Snell）[#36100](https://github.com/nodejs/node/pull/36100)
* \[[`c14512b9a5`](https://github.com/nodejs/node/commit/c14512b9a5)] - **errors**: 显示原始符号名称（Benjamin Coe）[#36042](https://github.com/nodejs/node/pull/36042)
* \[[`855a85c124`](https://github.com/nodejs/node/commit/855a85c124)] - **(SEMVER-MINOR)** **events**: 在 EventTarget 中支持 signal（Benjamin Gruenbaum）[#36258](https://github.com/nodejs/node/pull/36258)
* \[[`dc1930923b`](https://github.com/nodejs/node/commit/dc1930923b)] - **(SEMVER-MINOR)** **events**: 将 Event、EventTarget、AbortController 升级为稳定（James M Snell）[#35949](https://github.com/nodejs/node/pull/35949)
* \[[`537e5cbf51`](https://github.com/nodejs/node/commit/537e5cbf51)] - **fs**: 将方法定义移出头文件（Yash Ladha）[#36256](https://github.com/nodejs/node/pull/36256)
* \[[`744b8aa807`](https://github.com/nodejs/node/commit/744b8aa807)] - **fs**: 异步将 ERR\_DIR\_CLOSED 传递给 dir.close（Zijian Liu）[#36243](https://github.com/nodejs/node/pull/36243)
* \[[`c04a2df185`](https://github.com/nodejs/node/commit/c04a2df185)] - **fs**: 重构以使用更多 primordials（Antoine du Hamel）[#36196](https://github.com/nodejs/node/pull/36196)
* \[[`58abdcaceb`](https://github.com/nodejs/node/commit/58abdcaceb)] - **(SEMVER-MINOR)** **http**: 通过 setHeader() 启用链式调用（pooja d.p）[#35924](https://github.com/nodejs/node/pull/35924)
* \[[`cedf51f3ce`](https://github.com/nodejs/node/commit/cedf51f3ce)] - **http2**: 重构以使用更多 primordials（Antoine du Hamel）[#36357](https://github.com/nodejs/node/pull/36357)
* \[[`5f41f1b19e`](https://github.com/nodejs/node/commit/5f41f1b19e)] - **http2**: 检查在 scope 析构函数中未安排写入（David Halls）[#36241](https://github.com/nodejs/node/pull/36241)
* \[[`4127eb2405`](https://github.com/nodejs/node/commit/4127eb2405)] - **https**: 添加 abortcontroller 测试（Benjamin Gruenbaum）[#36307](https://github.com/nodejs/node/pull/36307)
* \[[`c2938bde6c`](https://github.com/nodejs/node/commit/c2938bde6c)] - **lib**: 为 `primordials` 添加无绑定调用的访问器属性（ExE Boss）[#36329](https://github.com/nodejs/node/pull/36329)
* \[[`f73a0a8069`](https://github.com/nodejs/node/commit/f73a0a8069)] - **lib**: 修复 internal/errors.js 中的拼写错误（raisinten）[#36426](https://github.com/nodejs/node/pull/36426)
* \[[`617cb58cc8`](https://github.com/nodejs/node/commit/617cb58cc8)] - **lib**: 重构 primordials.uncurryThis（Antoine du Hamel）[#36221](https://github.com/nodejs/node/pull/36221)
* \[[`cc18907ec4`](https://github.com/nodejs/node/commit/cc18907ec4)] - **module**: 重构以使用更多 primordials（Antoine du Hamel）[#36348](https://github.com/nodejs/node/pull/36348)
* \[[`d4de7c7eb9`](https://github.com/nodejs/node/commit/d4de7c7eb9)] - **(SEMVER-MINOR)** **module**: 添加 isPreloading 指示器（James M Snell）[#36263](https://github.com/nodejs/node/pull/36263)
* \[[`8611b8f98a`](https://github.com/nodejs/node/commit/8611b8f98a)] - **net**: 重构以使用更多 primordials（Antoine du Hamel）[#36303](https://github.com/nodejs/node/pull/36303)
* \[[`2a24096720`](https://github.com/nodejs/node/commit/2a24096720)] - **os**: 重构以使用更多 primordials（Antoine du Hamel）[#36284](https://github.com/nodejs/node/pull/36284)
* \[[`0e7f0c6d27`](https://github.com/nodejs/node/commit/0e7f0c6d27)] - **path**: 重构以使用更多 primordials（Antoine du Hamel）[#36302](https://github.com/nodejs/node/pull/36302)
* \[[`ea46ca8cbf`](https://github.com/nodejs/node/commit/ea46ca8cbf)] - **perf\_hooks**: 重构以使用更多 primordials（Antoine du Hamel）[#36297](https://github.com/nodejs/node/pull/36297)
* \[[`a9ac86d1ee`](https://github.com/nodejs/node/commit/a9ac86d1ee)] - **policy**: 重构以使用更多 primordials（Antoine du Hamel）[#36210](https://github.com/nodejs/node/pull/36210)
* \[[`39d0ceda48`](https://github.com/nodejs/node/commit/39d0ceda48)] - **process**: 重构以使用更多 primordials（Antoine du Hamel）[#36212](https://github.com/nodejs/node/pull/36212)
* \[[`ab084c199e`](https://github.com/nodejs/node/commit/ab084c199e)] - **querystring**: 重构以使用更多 primordials（Antoine du Hamel）[#36315](https://github.com/nodejs/node/pull/36315)
* \[[`d29199ef82`](https://github.com/nodejs/node/commit/d29199ef82)] - **quic**: 重构以使用更多 primordials（Antoine du Hamel）[#36211](https://github.com/nodejs/node/pull/36211)
* \[[`b885409e48`](https://github.com/nodejs/node/commit/b885409e48)] - **readline**: 重构以使用更多 primordials（Antoine du Hamel）[#36296](https://github.com/nodejs/node/pull/36296)
* \[[`9cb53f635a`](https://github.com/nodejs/node/commit/9cb53f635a)] - **repl**: 重构以使用更多 primordials（Antoine du Hamel）[#36264](https://github.com/nodejs/node/pull/36264)
* \[[`8dadaa652e`](https://github.com/nodejs/node/commit/8dadaa652e)] - **src**: 删除 DeserializeProps 中的一些重复代码（Daniel Bevenius）[#36336](https://github.com/nodejs/node/pull/36336)
* \[[`a03aa0a6b2`](https://github.com/nodejs/node/commit/a03aa0a6b2)] - **src**: 将 AliasedBufferInfo 重命名为 AliasedBufferIndex（Daniel Bevenius）[#36339](https://github.com/nodejs/node/pull/36339)
* \[[`e7b2d91e04`](https://github.com/nodejs/node/commit/e7b2d91e04)] - **src**: 一致地使用 transferred（Daniel Bevenius）[#36340](https://github.com/nodejs/node/pull/36340)
* \[[`6ebb98af11`](https://github.com/nodejs/node/commit/6ebb98af11)] - **src**: 在 DeserializeProperties 中使用 ToLocal（Daniel Bevenius）[#36279](https://github.com/nodejs/node/pull/36279)
* \[[`47397ffd56`](https://github.com/nodejs/node/commit/47397ffd56)] - **src**: 更新 node.rc 文件描述（devsnek）[#36197](https://github.com/nodejs/node/pull/36197)
* \[[`cfc8ec18db`](https://github.com/nodejs/node/commit/cfc8ec18db)] - **src**: 修复标签缩进（Rich Trott）[#36213](https://github.com/nodejs/node/pull/36213)
* \[[`197ba21279`](https://github.com/nodejs/node/commit/197ba21279)] - **(SEMVER-MINOR)** **stream**: 支持 abort signal（Benjamin Gruenbaum）[#36061](https://github.com/nodejs/node/pull/36061)
* \[[`6033d30361`](https://github.com/nodejs/node/commit/6033d30361)] - **(SEMVER-MINOR)** **stream**: 为 Read/WriteStream 添加 FileHandle 支持（Momtchil Momtchev）[#35922](https://github.com/nodejs/node/pull/35922)
* \[[`a15addc153`](https://github.com/nodejs/node/commit/a15addc153)] - **string\_decoder**: 重构以使用更多 primordials（Antoine du Hamel）[#36358](https://github.com/nodejs/node/pull/36358)
* \[[`b39d150e60`](https://github.com/nodejs/node/commit/b39d150e60)] - **test**: 修复 transferred 的注释拼写错误（Rich Trott）[#36360](https://github.com/nodejs/node/pull/36360)
* \[[`a7e794d1bf`](https://github.com/nodejs/node/commit/a7e794d1bf)] - **test**: 修复 flaky 的 test-http2-respond-file-error-pipe-offset（Rich Trott）[#36305](https://github.com/nodejs/node/pull/36305)
* \[[`1091a658e1`](https://github.com/nodejs/node/commit/1091a658e1)] - **test**: 修复 bootstrap 测试（Benjamin Gruenbaum）[#36418](https://github.com/nodejs/node/pull/36418)
* \[[`fbcb72a665`](https://github.com/nodejs/node/commit/fbcb72a665)] - **test**: 提高 readline 的覆盖率（Zijian Liu）[#36389](https://github.com/nodejs/node/pull/36389)
* \[[`22028aae54`](https://github.com/nodejs/node/commit/22028aae54)] - **test**: 在 Windows 上跳过 broadcastchannel 测试中不稳定的部分（Rich Trott）[#36386](https://github.com/nodejs/node/pull/36386)
* \[[`faca2b829e`](https://github.com/nodejs/node/commit/faca2b829e)] - **test**: 修复 test-worker-broadcastchannel-wpt（Rich Trott）[#36353](https://github.com/nodejs/node/pull/36353)
* \[[`ea09da492c`](https://github.com/nodejs/node/commit/ea09da492c)] - **test**: 修复注释中的拼写错误（inokawa）[#36312](https://github.com/nodejs/node/pull/36312)
* \[[`b61ca1bfe6`](https://github.com/nodejs/node/commit/b61ca1bfe6)] - **test**: 用箭头函数替换匿名函数（Aleksandr Krutko）[#36125](https://github.com/nodejs/node/pull/36125)
* \[[`2c7358ef43`](https://github.com/nodejs/node/commit/2c7358ef43)] - **test**: 修复 flaky 的 sequential/test-fs-watch（Rich Trott）[#36249](https://github.com/nodejs/node/pull/36249)
* \[[`b613950016`](https://github.com/nodejs/node/commit/b613950016)] - **test**: 提高 util.inspect() 的覆盖率（Rich Trott）[#36228](https://github.com/nodejs/node/pull/36228)
* \[[`69a8f05488`](https://github.com/nodejs/node/commit/69a8f05488)] - **test**: 改进 SourceMap API 的测试覆盖率（Juan José Arboleda）[#36089](https://github.com/nodejs/node/pull/36089)
* \[[`44d6d0bf0d`](https://github.com/nodejs/node/commit/44d6d0bf0d)] - **test**: 修复非实验性 AbortController 的遗漏警告（James M Snell）[#36240](https://github.com/nodejs/node/pull/36240)
* \[[`29b5236256`](https://github.com/nodejs/node/commit/29b5236256)] - **timers**: 在取消时以 AbortError 拒绝（Benjamin Gruenbaum）[#36317](https://github.com/nodejs/node/pull/36317)
* \[[`b20409e985`](https://github.com/nodejs/node/commit/b20409e985)] - **tls**: 重构以使用更多 primordials（Antoine du Hamel）[#36266](https://github.com/nodejs/node/pull/36266)
* \[[`f317bba034`](https://github.com/nodejs/node/commit/f317bba034)] - **tls**: 允许将 null 作为 cipher 值（Rich Trott）[#36318](https://github.com/nodejs/node/pull/36318)
* \[[`9ae59c847a`](https://github.com/nodejs/node/commit/9ae59c847a)] - **tools**: 升级到 @babel/eslint-parser 7.12.1（Antoine du Hamel）[#36321](https://github.com/nodejs/node/pull/36321)
* \[[`e798770803`](https://github.com/nodejs/node/commit/e798770803)] - **tools**: 将 7 个 Node.js 补丁重新移植到 cpplint.py（Rich Trott）[#36324](https://github.com/nodejs/node/pull/36324)
* \[[`a8b95cfcb2`](https://github.com/nodejs/node/commit/a8b95cfcb2)] - **tools**: 将 cpplint 升级到 1.5.4（Rich Trott）[#36324](https://github.com/nodejs/node/pull/36324)
* \[[`754b7a76b1`](https://github.com/nodejs/node/commit/754b7a76b1)] - **tools**: 从 macOS 发布脚本中移除 bashisms（Antoine du Hamel）[#36121](https://github.com/nodejs/node/pull/36121)
* \[[`2868ffb331`](https://github.com/nodejs/node/commit/2868ffb331)] - **tools**: 从发布脚本中移除 bashisms（Antoine du Hamel）[#36123](https://github.com/nodejs/node/pull/36123)
* \[[`8cf1addaa8`](https://github.com/nodejs/node/commit/8cf1addaa8)] - **tools**: 更新稳定性索引链接逻辑（Rich Trott）[#36280](https://github.com/nodejs/node/pull/36280)
* \[[`d95ae65986`](https://github.com/nodejs/node/commit/d95ae65986)] - **tools**: 将 highlight.js 更新到 10.1.2（Myles Borins）[#36309](https://github.com/nodejs/node/pull/36309)
* \[[`5935ccc11c`](https://github.com/nodejs/node/commit/5935ccc11c)] - **tools**: 修复未声明的标识符 FALSE（Antoine du Hamel）[#36276](https://github.com/nodejs/node/pull/36276)
* \[[`a2da7ba914`](https://github.com/nodejs/node/commit/a2da7ba914)] - **tools**: 一致地使用 using-declaration（Daniel Bevenius）[#36245](https://github.com/nodejs/node/pull/36245)
* \[[`82c1e39c4a`](https://github.com/nodejs/node/commit/82c1e39c4a)] - **tools**: 将 7 个 Node.js 补丁重新移植到 cpplint.py（Rich Trott）[#36235](https://github.com/nodejs/node/pull/36235)
* \[[`bcf7393412`](https://github.com/nodejs/node/commit/bcf7393412)] - **tools**: 将 cpplint 升级到 1.5.3（Rich Trott）[#36235](https://github.com/nodejs/node/pull/36235)
* \[[`be11976407`](https://github.com/nodejs/node/commit/be11976407)] - **tools**: 启用 no-nonoctal-decimal-escape lint 规则（Colin Ihrig）[#36217](https://github.com/nodejs/node/pull/36217)
* \[[`c86c2399a2`](https://github.com/nodejs/node/commit/c86c2399a2)] - **tools**: 将 ESLint 更新到 7.14.0（Colin Ihrig）[#36217](https://github.com/nodejs/node/pull/36217)
* \[[`cfadd82cf3`](https://github.com/nodejs/node/commit/cfadd82cf3)] - **tools**: 将 7 个 Node.js 补丁重新移植到 cpplint.py（Rich Trott）[#36213](https://github.com/nodejs/node/pull/36213)
* \[[`03e8aaf613`](https://github.com/nodejs/node/commit/03e8aaf613)] - **tools**: 将 cpplint.py 升级到 1.5.2（Rich Trott）[#36213](https://github.com/nodejs/node/pull/36213)
* \[[`6bc007fc94`](https://github.com/nodejs/node/commit/6bc007fc94)] - **tty**: 重构以使用更多 primordials（Zijian Liu）[#36272](https://github.com/nodejs/node/pull/36272)
* \[[`fbd5652943`](https://github.com/nodejs/node/commit/fbd5652943)] - **v8**: 重构以使用更多 primordials（Antoine du Hamel）[#36285](https://github.com/nodejs/node/pull/36285)
* \[[`8731a80439`](https://github.com/nodejs/node/commit/8731a80439)] - **vm**: 为 SIGINT 中断添加 `SafeForTerminationScope`s（Anna Henningsen）[#36344](https://github.com/nodejs/node/pull/36344)
* \[[`47345a1f84`](https://github.com/nodejs/node/commit/47345a1f84)] - **worker**: 重构以使用更多 primordials（Antoine du Hamel）[#36393](https://github.com/nodejs/node/pull/36393)
* \[[`21c4704c7b`](https://github.com/nodejs/node/commit/21c4704c7b)] - **worker**: 重构以使用更多 primordials（Antoine du Hamel）[#36267](https://github.com/nodejs/node/pull/36267)
* \[[`802d44b1a9`](https://github.com/nodejs/node/commit/802d44b1a9)] - **(SEMVER-MINOR)** **worker**: 添加实验性的 BroadcastChannel（James M Snell）[#36271](https://github.com/nodejs/node/pull/36271)
* \[[`4b4caada9f`](https://github.com/nodejs/node/commit/4b4caada9f)] - **zlib**: 重构以使用更多 primordials（Antoine du Hamel）[#36347](https://github.com/nodejs/node/pull/36347)

<a id="15.3.0"></a>

## 2020-11-24，版本 15.3.0（当前），@codebytere

### 显著变更

* \[[`6349b1d673`](https://github.com/nodejs/node/commit/6349b1d673)] - **(SEMVER-MINOR)** **dns**：为 promise Resolver 添加 cancel() 方法（Szymon Marczak）[#33099](https://github.com/nodejs/node/pull/33099)
* \[[`9ce9b016e6`](https://github.com/nodejs/node/commit/9ce9b016e6)] - **(SEMVER-MINOR)** **events**：为 EventTarget 添加最大监听器警告（James M Snell）[#36001](https://github.com/nodejs/node/pull/36001)
* \[[`8390f8a86b`](https://github.com/nodejs/node/commit/8390f8a86b)] - **(SEMVER-MINOR)** **http**：为 http.request 添加 abortsignal 支持（Benjamin Gruenbaum）[#36048](https://github.com/nodejs/node/pull/36048)
* \[[`9c6be3cc90`](https://github.com/nodejs/node/commit/9c6be3cc90)] - **(SEMVER-MINOR)** **http2**：允许设置会话的本地窗口大小（Yongsheng Zhang）[#35978](https://github.com/nodejs/node/pull/35978)
* \[[`15ff155c12`](https://github.com/nodejs/node/commit/15ff155c12)] - **(SEMVER-MINOR)** **lib**：为 fs.f/l/statSync 添加 throws 选项（Andrew Casey）[#33716](https://github.com/nodejs/node/pull/33716)
* \[[`85c85d368a`](https://github.com/nodejs/node/commit/85c85d368a)] - **(SEMVER-MINOR)** **path**：添加 `path/posix` 和 `path/win32` 别名模块（ExE Boss）[#34962](https://github.com/nodejs/node/pull/34962)
* \[[`d1baae3640`](https://github.com/nodejs/node/commit/d1baae3640)] - **(SEMVER-MINOR)** **readline**：添加 getPrompt 以获取当前提示符（Mattias Runge-Broberg）[#33675](https://github.com/nodejs/node/pull/33675)
* \[[`5729478509`](https://github.com/nodejs/node/commit/5729478509)] - **(SEMVER-MINOR)** **src**：在诊断报告中添加循环空闲时间（Gireesh Punathil）[#35940](https://github.com/nodejs/node/pull/35940)
* \[[`baa87c1a7d`](https://github.com/nodejs/node/commit/baa87c1a7d)] - **(SEMVER-MINOR)** **util**：添加 `util/types` 别名模块（ExE Boss）[#34055](https://github.com/nodejs/node/pull/34055)

### 提交

* \[[`34aa0c868e`](https://github.com/nodejs/node/commit/34aa0c868e)] - **assert**：重构以使用更多 primordials（Antoine du Hamel）[#35998](https://github.com/nodejs/node/pull/35998)
* \[[`28d710164a`](https://github.com/nodejs/node/commit/28d710164a)] - **async_hooks**：重构以使用更多 primordials（Antoine du Hamel）[#36168](https://github.com/nodejs/node/pull/36168)
* \[[`1924255fdb`](https://github.com/nodejs/node/commit/1924255fdb)] - **async_hooks**：修复 AsyncLocalStorage 退出时的泄漏（Stephen Belanger）[#35779](https://github.com/nodejs/node/pull/35779)
* \[[`3ee556a867`](https://github.com/nodejs/node/commit/3ee556a867)] - **benchmark**：修复构建警告（Gabriel Schulhof）[#36157](https://github.com/nodejs/node/pull/36157)
* \[[`fcc38a1312`](https://github.com/nodejs/node/commit/fcc38a1312)] - **build**：用 command -v 替换 which（raisinten）[#36118](https://github.com/nodejs/node/pull/36118)
* \[[`60874ba941`](https://github.com/nodejs/node/commit/60874ba941)] - **build**：在针对 3.x 时将 “python3” 作为最后的备选项（Ole André Vadla Ravnås）[#35983](https://github.com/nodejs/node/pull/35983)
* \[[`fbe210b2a1`](https://github.com/nodejs/node/commit/fbe210b2a1)] - **build**：有条件地清除 vcinstalldir（Brian Ingenito）[#36009](https://github.com/nodejs/node/pull/36009)
* \[[`56f83e6876`](https://github.com/nodejs/node/commit/56f83e6876)] - **build**：重构 configure.py 以使用 argparse（raisinten）[#35755](https://github.com/nodejs/node/pull/35755)
* \[[`0b70822461`](https://github.com/nodejs/node/commit/0b70822461)] - **child_process**：重构以使用更多 primordials（Antoine du Hamel）[#36003](https://github.com/nodejs/node/pull/36003)
* \[[`e54108f2e4`](https://github.com/nodejs/node/commit/e54108f2e4)] - **cluster**：重构以使用更多 primordials（Antoine du Hamel）[#36011](https://github.com/nodejs/node/pull/36011)
* \[[`272fc794b2`](https://github.com/nodejs/node/commit/272fc794b2)] - **crypto**：修复 AdditionalConfig 中的格式警告（raisinten）[#36060](https://github.com/nodejs/node/pull/36060)
* \[[`63a138e02f`](https://github.com/nodejs/node/commit/63a138e02f)] - **crypto**：修复将 TypedArray 传递给 webcrypto AES 方法的问题（Antoine du Hamel）[#36087](https://github.com/nodejs/node/pull/36087)
* \[[`4a88c73fa5`](https://github.com/nodejs/node/commit/4a88c73fa5)] - **deps**：将 npm 升级到 7.0.14（nlf）[#36238](https://github.com/nodejs/node/pull/36238)
* \[[`d16e8622a7`](https://github.com/nodejs/node/commit/d16e8622a7)] - **deps**：将 npm 升级到 7.0.13（Ruy Adorno）[#36202](https://github.com/nodejs/node/pull/36202)
* \[[`c23ee3744f`](https://github.com/nodejs/node/commit/c23ee3744f)] - **deps**：将 npm 升级到 7.0.12（Ruy Adorno）[#36153](https://github.com/nodejs/node/pull/36153)
* \[[`0fcbb1c0d5`](https://github.com/nodejs/node/commit/0fcbb1c0d5)] - **deps**：V8：cherry-pick 3176bfd447a9（Anna Henningsen）[#35612](https://github.com/nodejs/node/pull/35612)
* \[[`27f1bc05fd`](https://github.com/nodejs/node/commit/27f1bc05fd)] - **deps**：将 npm 升级到 7.0.11（Darcy Clarke）[#36112](https://github.com/nodejs/node/pull/36112)
* \[[`8ae3ffe2be`](https://github.com/nodejs/node/commit/8ae3ffe2be)] - **deps**：V8：cherry-pick 1d0f426311d4（Ole André Vadla Ravnås）[#35986](https://github.com/nodejs/node/pull/35986)
* \[[`4b7ba11d67`](https://github.com/nodejs/node/commit/4b7ba11d67)] - **deps**：V8：cherry-pick 4e077ff0444a（Ole André Vadla Ravnås）[#35986](https://github.com/nodejs/node/pull/35986)
* \[[`098a5b1298`](https://github.com/nodejs/node/commit/098a5b1298)] - **deps**：V8：cherry-pick 086eecbd96b6（Ole André Vadla Ravnås）[#35986](https://github.com/nodejs/node/pull/35986)
* \[[`d2c757ab19`](https://github.com/nodejs/node/commit/d2c757ab19)] - **deps**：V8：cherry-pick 27e1ac1a79ff（Ole André Vadla Ravnås）[#35986](https://github.com/nodejs/node/pull/35986)
* \[[`6349b1d673`](https://github.com/nodejs/node/commit/6349b1d673)] - **(SEMVER-MINOR)** **dns**：为 promise Resolver 添加 cancel() 方法（Szymon Marczak）[#33099](https://github.com/nodejs/node/pull/33099)
* \[[`0fbade38ef`](https://github.com/nodejs/node/commit/0fbade38ef)] - **doc**：将 arm64 macOS 标记为实验性（Richard Lau）[#36189](https://github.com/nodejs/node/pull/36189)
* \[[`42dfda8f78`](https://github.com/nodejs/node/commit/42dfda8f78)] - **doc**：移除 url.md 中多余的逗号（Rich Trott）[#36175](https://github.com/nodejs/node/pull/36175)
* \[[`8bbdbccbb6`](https://github.com/nodejs/node/commit/8bbdbccbb6)] - **doc**：修订 agent.destroy() 文本（Rich Trott）[#36163](https://github.com/nodejs/node/pull/36163)
* \[[`545ac1fec5`](https://github.com/nodejs/node/commit/545ac1fec5)] - **doc**：修复 v8.md 中的标点符号（Rich Trott）[#36192](https://github.com/nodejs/node/pull/36192)
* \[[`a6a90af8c0`](https://github.com/nodejs/node/commit/a6a90af8c0)] - **doc**：添加兼容性/互操作技术价值（Geoffrey Booth）[#35323](https://github.com/nodejs/node/pull/35323)
* \[[`4ab4a99900`](https://github.com/nodejs/node/commit/4ab4a99900)] - **doc**：降低 napi_define_class 中包装的强调程度（Gabriel Schulhof）[#36159](https://github.com/nodejs/node/pull/36159)
* \[[`bb29508e8f`](https://github.com/nodejs/node/commit/bb29508e8f)] - **doc**：为 v8.takeCoverage() 添加链接（Rich Trott）[#36135](https://github.com/nodejs/node/pull/36135)
* \[[`24065b92f1`](https://github.com/nodejs/node/commit/24065b92f1)] - **doc**：将 modules 实现标记为稳定（Guy Bedford）[#35781](https://github.com/nodejs/node/pull/35781)
* \[[`142cacdc63`](https://github.com/nodejs/node/commit/142cacdc63)] - **doc**：澄清关于进程无响应的文本（Rich Trott）[#36117](https://github.com/nodejs/node/pull/36117)
* \[[`0ff384b0be`](https://github.com/nodejs/node/commit/0ff384b0be)] - **doc**：ESM 文档整合与重新排序（Guy Bedford）[#36046](https://github.com/nodejs/node/pull/36046)
* \[[`b17a83a00d`](https://github.com/nodejs/node/commit/b17a83a00d)] - **doc**：为 Electron v13 申明 ABI 版本（Shelley Vohr）[#36101](https://github.com/nodejs/node/pull/36101)
* \[[`e8a8513b2c`](https://github.com/nodejs/node/commit/e8a8513b2c)] - **doc**：修复 worker_threads.md 中的无效链接（Rich Trott）[#36109](https://github.com/nodejs/node/pull/36109)
* \[[`cd33594a0d`](https://github.com/nodejs/node/commit/cd33594a0d)] - **doc**：将 shigeki 移至 emeritus（Rich Trott）[#36093](https://github.com/nodejs/node/pull/36093)
* \[[`eefc6aa6c9`](https://github.com/nodejs/node/commit/eefc6aa6c9)] - **doc**：记录 child_process.spawn 中 cwd 不存在时的错误（FeelyChau）[#34505](https://github.com/nodejs/node/pull/34505)
* \[[`841a2812d0`](https://github.com/nodejs/node/commit/841a2812d0)] - **doc**：修复 debugger.md 中的拼写错误（Rich Trott）[#36066](https://github.com/nodejs/node/pull/36066)
* \[[`500e709439`](https://github.com/nodejs/node/commit/500e709439)] - **doc**：为 remark-parse@9 渲染更新列表样式（Rich Trott）[#36049](https://github.com/nodejs/node/pull/36049)
* \[[`a8dab217eb`](https://github.com/nodejs/node/commit/a8dab217eb)] - **doc,url**：修复 url.hostname 示例（Rishabh Mehan）[#33735](https://github.com/nodejs/node/pull/33735)
* \[[`e48ec703ba`](https://github.com/nodejs/node/commit/e48ec703ba)] - **domain**：改进 DEP0097 的弃用警告文本（Anna Henningsen）[#36136](https://github.com/nodejs/node/pull/36136)
* \[[`bcbf176c22`](https://github.com/nodejs/node/commit/bcbf176c22)] - **errors**：重构以使用更多 primordials（Antoine du Hamel）[#36167](https://github.com/nodejs/node/pull/36167)
* \[[`66788970ac`](https://github.com/nodejs/node/commit/66788970ac)] - **esm**：重构以使用更多 primordials（Antoine du Hamel）[#36019](https://github.com/nodejs/node/pull/36019)
* \[[`9ce9b016e6`](https://github.com/nodejs/node/commit/9ce9b016e6)] - **(SEMVER-MINOR)** **events**：为 EventTarget 添加最大监听器警告（James M Snell）[#36001](https://github.com/nodejs/node/pull/36001)
* \[[`1550073dbc`](https://github.com/nodejs/node/commit/1550073dbc)] - **events**：禁用 AbortSignal 的手动构造（raisinten）[#36094](https://github.com/nodejs/node/pull/36094)
* \[[`8a6cabbb23`](https://github.com/nodejs/node/commit/8a6cabbb23)] - **events**：移植部分 wpt 测试（Ethan Arrowood）[#34169](https://github.com/nodejs/node/pull/34169)
* \[[`3691eccf0a`](https://github.com/nodejs/node/commit/3691eccf0a)] - **fs**：移除 promises.rmdir recursive 的实验性标记（Anders Kaseorg）[#36131](https://github.com/nodejs/node/pull/36131)
* \[[`76b1863240`](https://github.com/nodejs/node/commit/76b1863240)] - **fs**：filehandle read 现在接受对象作为参数（Nikola Glavina）[#34180](https://github.com/nodejs/node/pull/34180)
* \[[`2fdf509268`](https://github.com/nodejs/node/commit/2fdf509268)] - **http**：修复注释中的拼写错误（Hollow Man）[#36193](https://github.com/nodejs/node/pull/36193)
* \[[`8390f8a86b`](https://github.com/nodejs/node/commit/8390f8a86b)] - **(SEMVER-MINOR)** **http**：为 http.request 添加 abortsignal 支持（Benjamin Gruenbaum）[#36048](https://github.com/nodejs/node/pull/36048)
* \[[`387d92fd0e`](https://github.com/nodejs/node/commit/387d92fd0e)] - **http**：完成后不会再次触发 onFinish（rickyes）[#35845](https://github.com/nodejs/node/pull/35845)
* \[[`48bf59bb8b`](https://github.com/nodejs/node/commit/48bf59bb8b)] - **http2**：为 http2Session.request 添加 AbortSignal 支持（Madara Uchiha）[#36070](https://github.com/nodejs/node/pull/36070)
* \[[`8a0c3b9c76`](https://github.com/nodejs/node/commit/8a0c3b9c76)] - **http2**：重构以使用更多 primordials（Antoine du Hamel）[#36142](https://github.com/nodejs/node/pull/36142)
* \[[`f0aed8c01c`](https://github.com/nodejs/node/commit/f0aed8c01c)] - **http2**：为 getUnpackedSettings 添加 TypedArray 支持（Antoine du Hamel）[#36141](https://github.com/nodejs/node/pull/36141)
* \[[`9c6be3cc90`](https://github.com/nodejs/node/commit/9c6be3cc90)] - **(SEMVER-MINOR)** **http2**：允许设置会话的本地窗口大小（Yongsheng Zhang）[#35978](https://github.com/nodejs/node/pull/35978)
* \[[`0b40568afe`](https://github.com/nodejs/node/commit/0b40568afe)] - **http2**：延迟一个 tick 再调用 session.receive()（Szymon Marczak）[#35985](https://github.com/nodejs/node/pull/35985)
* \[[`1a4d43f840`](https://github.com/nodejs/node/commit/1a4d43f840)] - **lib**：重构以使用更多 primordials（Antoine du Hamel）[#36140](https://github.com/nodejs/node/pull/36140)
* \[[`d6ea12e003`](https://github.com/nodejs/node/commit/d6ea12e003)] - **lib**：为 abort-controller 设置 toStringTag（Benjamin Gruenbaum）[#36115](https://github.com/nodejs/node/pull/36115)
* \[[`82f1cde57e`](https://github.com/nodejs/node/commit/82f1cde57e)] - **lib**：移除 primordials.SafePromise（Antoine du Hamel）[#36149](https://github.com/nodejs/node/pull/36149)
* \[[`15ff155c12`](https://github.com/nodejs/node/commit/15ff155c12)] - **(SEMVER-MINOR)** **lib**：为 fs.f/l/statSync 添加 throws 选项（Andrew Casey）[#33716](https://github.com/nodejs/node/pull/33716)
* \[[`75707f45eb`](https://github.com/nodejs/node/commit/75707f45eb)] - **lib,tools**：强制从 primordials 访问 prototype（Antoine du Hamel）[#36025](https://github.com/nodejs/node/pull/36025)
* \[[`79b2ba6744`](https://github.com/nodejs/node/commit/79b2ba6744)] - **n-api**：清理 binding 创建逻辑（Gabriel Schulhof）[#36170](https://github.com/nodejs/node/pull/36170)
* \[[`5698cc08f0`](https://github.com/nodejs/node/commit/5698cc08f0)] - **n-api**：修复 test_async_context 警告（Gabriel Schulhof）[#36171](https://github.com/nodejs/node/pull/36171)
* \[[`3d623d850c`](https://github.com/nodejs/node/commit/3d623d850c)] - **n-api**：改进获取上下文方式的一致性（Michael Dawson）[#36068](https://github.com/nodejs/node/pull/36068)
* \[[`89da0c3353`](https://github.com/nodejs/node/commit/89da0c3353)] - **n-api**：提炼调用模式（Gabriel Schulhof）[#36113](https://github.com/nodejs/node/pull/36113)
* \[[`5c0ddbca01`](https://github.com/nodejs/node/commit/5c0ddbca01)] - **net**：修复无效的 write after end 错误（Robert Nagy）[#36043](https://github.com/nodejs/node/pull/36043)
* \[[`85c85d368a`](https://github.com/nodejs/node/commit/85c85d368a)] - **(SEMVER-MINOR)** **path**：添加 `path/posix` 和 `path/win32` 别名模块（ExE Boss）[#34962](https://github.com/nodejs/node/pull/34962)
* \[[`ed8af3a8b7`](https://github.com/nodejs/node/commit/ed8af3a8b7)] - **perf_hooks**：使 nodeTiming 成为一级对象（Momtchil Momtchev）[#35977](https://github.com/nodejs/node/pull/35977)
* \[[`eb9295b583`](https://github.com/nodejs/node/commit/eb9295b583)] - **promise**：在 domain 未处理的 rejection 上发出错误（Benjamin Gruenbaum）[#36082](https://github.com/nodejs/node/pull/36082)
* \[[`59af919d6b`](https://github.com/nodejs/node/commit/59af919d6b)] - **querystring**：通过 Int8Array 减少内存使用（sapics）[#34179](https://github.com/nodejs/node/pull/34179)
* \[[`d1baae3640`](https://github.com/nodejs/node/commit/d1baae3640)] - **(SEMVER-MINOR)** **readline**：添加 getPrompt 以获取当前提示符（Mattias Runge-Broberg）[#33675](https://github.com/nodejs/node/pull/33675)
* \[[`6d1b1c7ad0`](https://github.com/nodejs/node/commit/6d1b1c7ad0)] - **src**：集成 URL::href() 并在 inspector 中使用（Daijiro Wachi）[#35912](https://github.com/nodejs/node/pull/35912)
* \[[`7086f2e653`](https://github.com/nodejs/node/commit/7086f2e653)] - **src**：重构 node_env_var.cc 中的 using 声明（raisinten）[#36128](https://github.com/nodejs/node/pull/36128)
* \[[`122797e87f`](https://github.com/nodejs/node/commit/122797e87f)] - **src**：移除获取 buffer 的重复逻辑（Yash Ladha）[#34553](https://github.com/nodejs/node/pull/34553)
* \[[`5729478509`](https://github.com/nodejs/node/commit/5729478509)] - **(SEMVER-MINOR)** **src**：在诊断报告中添加循环空闲时间（Gireesh Punathil）[#35940](https://github.com/nodejs/node/pull/35940)
* \[[`a81dc9ae18`](https://github.com/nodejs/node/commit/a81dc9ae18)] - **src,crypto**：重构 crypto_context、SecureContext（James M Snell）[#35665](https://github.com/nodejs/node/pull/35665)
* \[[`5fa35f6934`](https://github.com/nodejs/node/commit/5fa35f6934)] - **test**：更新 test-fs-read-offset-null 中的注释（Rich Trott）[#36152](https://github.com/nodejs/node/pull/36152)
* \[[`73bb54af77`](https://github.com/nodejs/node/commit/73bb54af77)] - **test**：更新 wpt url 和资源（Daijiro Wachi）[#36032](https://github.com/nodejs/node/pull/36032)
* \[[`77b47dfd08`](https://github.com/nodejs/node/commit/77b47dfd08)] - **test**：修复 inspector-helper.js 中的拼写错误（Luigi Pinca）[#36127](https://github.com/nodejs/node/pull/36127)
* \[[`474664963c`](https://github.com/nodejs/node/commit/474664963c)] - **test**：消除 test-http-destroyed-socket-write2 的不稳定性（Luigi Pinca）[#36120](https://github.com/nodejs/node/pull/36120)
* \[[`f9bbd35937`](https://github.com/nodejs/node/commit/f9bbd35937)] - **test**：使 test-http2-client-jsstream-destroy.js 更可靠（Rich Trott）[#36129](https://github.com/nodejs/node/pull/36129)
* \[[`c19df17acb`](https://github.com/nodejs/node/commit/c19df17acb)] - **test**：为 offset key 为 null 时的 fs.read 添加测试（mayank agarwal）[#35918](https://github.com/nodejs/node/pull/35918)
* \[[`9405cddbee`](https://github.com/nodejs/node/commit/9405cddbee)] - **test**：改进 test-stream-duplex-readable-end（Luigi Pinca）[#36056](https://github.com/nodejs/node/pull/36056)
* \[[`3be5e86c57`](https://github.com/nodejs/node/commit/3be5e86c57)] - **test**：为 null maxStringLength 添加 util.inspect 测试（Rich Trott）[#36086](https://github.com/nodejs/node/pull/36086)
* \[[`6a4cc43028`](https://github.com/nodejs/node/commit/6a4cc43028)] - **test**：将 var 替换为 const（Aleksandr Krutko）[#36069](https://github.com/nodejs/node/pull/36069)
* \[[`a367c0dfc2`](https://github.com/nodejs/node/commit/a367c0dfc2)] - **timers**：重构以使用更多 primordials（Antoine du Hamel）[#36132](https://github.com/nodejs/node/pull/36132)
* \[[`a6ef92bc27`](https://github.com/nodejs/node/commit/a6ef92bc27)] - **tools**：将 unist-util-find@1.0.1 升级到 unist-util-find@1.0.2（Rich Trott）[#36106](https://github.com/nodejs/node/pull/36106)
* \[[`2d2491284e`](https://github.com/nodejs/node/commit/2d2491284e)] - **tools**：在 macos action 中只使用 2 个核心（Myles Borins）[#36169](https://github.com/nodejs/node/pull/36169)
* \[[`d8fcf2c324`](https://github.com/nodejs/node/commit/d8fcf2c324)] - **tools**：从 license builder 脚本中移除 bashisms（Antoine du Hamel）[#36122](https://github.com/nodejs/node/pull/36122)
* \[[`7e7ddb11c0`](https://github.com/nodejs/node/commit/7e7ddb11c0)] - **tools**：隐藏 commit queue 操作链接（Antoine du Hamel）[#36124](https://github.com/nodejs/node/pull/36124)
* \[[`63494e434a`](https://github.com/nodejs/node/commit/63494e434a)] - **tools**：将文档工具更新到 remark-parse@9.0.0（Rich Trott）[#36049](https://github.com/nodejs/node/pull/36049)
* \[[`bf0550ce4e`](https://github.com/nodejs/node/commit/bf0550ce4e)] - **tools**：在 editorconfig 中强制使用单引号（Antoine du Hamel）[#36020](https://github.com/nodejs/node/pull/36020)
* \[[`49649a499e`](https://github.com/nodejs/node/commit/49649a499e)] - **tools**：修复长字符串下的配置序列化（Ole André Vadla Ravnås）[#35982](https://github.com/nodejs/node/pull/35982)
* \[[`be220b213d`](https://github.com/nodejs/node/commit/be220b213d)] - **tools**：将 ESLint 更新到 7.13.0（Luigi Pinca）[#36031](https://github.com/nodejs/node/pull/36031)
* \[[`4140f491fd`](https://github.com/nodejs/node/commit/4140f491fd)] - **util**：修复检查访问 this 的 getter（raisinten）[#36052](https://github.com/nodejs/node/pull/36052)
* \[[`baa87c1a7d`](https://github.com/nodejs/node/commit/baa87c1a7d)] - **(SEMVER-MINOR)** **util**：添加 `util/types` 别名模块（ExE Boss）[#34055](https://github.com/nodejs/node/pull/34055)
* \[[`f7b2fce1c1`](https://github.com/nodejs/node/commit/f7b2fce1c1)] - **vm**：重构以使用更多 primordials（Antoine du Hamel）[#36023](https://github.com/nodejs/node/pull/36023)
* \[[`4e3883ec2d`](https://github.com/nodejs/node/commit/4e3883ec2d)] - **win,build,tools**：支持 VS 预发布版（Baruch Odem）[#36033](https://github.com/nodejs/node/pull/36033)

<a id="15.2.1"></a>

## 2020-11-16，版本 15.2.1（当前），@targos

### 显著变更

这是一个安全发布。

修复的漏洞：

* **CVE-2020-8277**：通过 DNS 请求导致拒绝服务（高危）。允许攻击者触发对其选择的主机发起 DNS 请求的 Node.js 应用，可能会通过让应用解析一个响应数量更多的 DNS 记录而触发拒绝服务。

### 提交

* \[[`2a44836eeb`](https://github.com/nodejs/node/commit/2a44836eeb)] - **deps**: 从上游 c-ares 选择性回移植 0d252eb（Michael Dawson）[nodejs-private/node-private#231](https://github.com/nodejs-private/node-private/pull/231)
* \[[`b1f5518a0a`](https://github.com/nodejs/node/commit/b1f5518a0a)] - **doc**: 修复 `events.getEventListeners` 示例（Dmitry Semigradsky）[#36085](https://github.com/nodejs/node/pull/36085)
* \[[`b477447a55`](https://github.com/nodejs/node/commit/b477447a55)] - **doc**: 修复 `stream.\_construct()` 的 `added:` 信息（Luigi Pinca）[#36067](https://github.com/nodejs/node/pull/36067)
* \[[`df211208c0`](https://github.com/nodejs/node/commit/df211208c0)] - **test**: 为 setLocalAddress() 补充缺失的测试覆盖率（Rich Trott）[#36039](https://github.com/nodejs/node/pull/36039)
* \[[`f5191f5bd2`](https://github.com/nodejs/node/commit/f5191f5bd2)] - **test**: 移除已修复测试的 flaky 标记（Rich Trott）[#35961](https://github.com/nodejs/node/pull/35961)
* \[[`a2f652f7c5`](https://github.com/nodejs/node/commit/a2f652f7c5)] - **test**: 将 test-worker-eventlooputil 移至顺序执行（Rich Trott）[#35996](https://github.com/nodejs/node/pull/35996)
* \[[`b0b43b27d6`](https://github.com/nodejs/node/commit/b0b43b27d6)] - **test**: 修复不可靠的 test-fs-write-file.js（Rich Trott）[#36102](https://github.com/nodejs/node/pull/36102)

<a id="15.2.0"></a>

## 2020-11-10，版本 15.2.0（当前），@danielleadams

### 显著变更

* **events**:
  * getEventListeners 静态方法（Benjamin Gruenbaum）[#35991](https://github.com/nodejs/node/pull/35991)
* **fs**:
  * 在 writeFile 中支持 abortsignal（Benjamin Gruenbaum）[#35993](https://github.com/nodejs/node/pull/35993)
  * 为 readFile 添加对 AbortSignal 的支持（Benjamin Gruenbaum）[#35911](https://github.com/nodejs/node/pull/35911)
* **stream**:
  * 修复抛出的对象引用（Gil Pedersen）[#36065](https://github.com/nodejs/node/pull/36065)

### 提交

* \[[`9d9a044c1b`](https://github.com/nodejs/node/commit/9d9a044c1b)] - **benchmark**: 忽略 napi addons 的构建产物（Richard Lau）[#35970](https://github.com/nodejs/node/pull/35970)
* \[[`4c6de854be`](https://github.com/nodejs/node/commit/4c6de854be)] - **benchmark**: 移除需要 intl 的模块（Richard Lau）[#35968](https://github.com/nodejs/node/pull/35968)
* \[[`292915a6a8`](https://github.com/nodejs/node/commit/292915a6a8)] - **bootstrap**: 重构以使用更多 primordials（Antoine du Hamel）[#35999](https://github.com/nodejs/node/pull/35999)
* \[[`10c9ea771d`](https://github.com/nodejs/node/commit/10c9ea771d)] - **build**: 修复 IA-32 的 zlib 内联（raisinten）[#35679](https://github.com/nodejs/node/pull/35679)
* \[[`6ac9c8f31b`](https://github.com/nodejs/node/commit/6ac9c8f31b)] - **build, tools**: 查找本地安装的 NASM（Richard Lau）[#36014](https://github.com/nodejs/node/pull/36014)
* \[[`9757b47c44`](https://github.com/nodejs/node/commit/9757b47c44)] - **console**: 使用更多 primordials（Antoine du Hamel）[#35734](https://github.com/nodejs/node/pull/35734)
* \[[`0d7422651b`](https://github.com/nodejs/node/commit/0d7422651b)] - **crypto**: 重构以使用更多 primordials（Antoine du Hamel）[#36012](https://github.com/nodejs/node/pull/36012)
* \[[`dc4936ba50`](https://github.com/nodejs/node/commit/dc4936ba50)] - **crypto**: 修复 ByteSource 中的注释（Tobias Nießen）[#35972](https://github.com/nodejs/node/pull/35972)
* \[[`7cb5c0911e`](https://github.com/nodejs/node/commit/7cb5c0911e)] - **deps**: 从 V8 上游选择性回移植 9a49b22（Daniel Bevenius）[#35939](https://github.com/nodejs/node/pull/35939)
* \[[`4b03670877`](https://github.com/nodejs/node/commit/4b03670877)] - **dns**: 修复 resolveCaa() 的 trace_events 名称（Rich Trott）[#35979](https://github.com/nodejs/node/pull/35979)
* \[[`dcb27600da`](https://github.com/nodejs/node/commit/dcb27600da)] - **doc**: 转义 cctest gtest-filter 中的星号（raisinten）[#36034](https://github.com/nodejs/node/pull/36034)
* \[[`923276ca53`](https://github.com/nodejs/node/commit/923276ca53)] - **doc**: 移动 v8.getHeapCodeStatistics()（Rich Trott）[#36027](https://github.com/nodejs/node/pull/36027)
* \[[`71fa9c6b24`](https://github.com/nodejs/node/commit/71fa9c6b24)] - **doc**: 在 src/README.md 中添加有关文件结构的说明（Denys Otrishko）[#35000](https://github.com/nodejs/node/pull/35000)
* \[[`99cb36238d`](https://github.com/nodejs/node/commit/99cb36238d)] - **doc**: 建议用户导入完整的受信任发布密钥集合（Reşat SABIQ）[#32655](https://github.com/nodejs/node/pull/32655)
* \[[`06cc400160`](https://github.com/nodejs/node/commit/06cc400160)] - **doc**: 修复 crypto 文档 linter 错误（Antoine du Hamel）[#36035](https://github.com/nodejs/node/pull/36035)
* \[[`01129a7b39`](https://github.com/nodejs/node/commit/01129a7b39)] - **doc**: 修订 v8.getHeapSnapshot()（Rich Trott）[#35849](https://github.com/nodejs/node/pull/35849)
* \[[`77d33c9b2f`](https://github.com/nodejs/node/commit/77d33c9b2f)] - **doc**: 更新指南中的 core-validate-commit 链接（Daijiro Wachi）[#35938](https://github.com/nodejs/node/pull/35938)
* \[[`6d56ba03e2`](https://github.com/nodejs/node/commit/6d56ba03e2)] - **doc**: 更新 README 中的 benchmark CI 测试指示器（Rich Trott）[#35945](https://github.com/nodejs/node/pull/35945)
* \[[`8bd364a9b3`](https://github.com/nodejs/node/commit/8bd364a9b3)] - **doc**: 为 API 描述添加新的措辞（Pooja D.P）[#35588](https://github.com/nodejs/node/pull/35588)
* \[[`acd3617e1a`](https://github.com/nodejs/node/commit/acd3617e1a)] - **doc**: 添加 --prof 选项的文档帮助说明（krank2me）[#34991](https://github.com/nodejs/node/pull/34991)
* \[[`6968b0fd49`](https://github.com/nodejs/node/commit/6968b0fd49)] - **doc**: 修复 backport 指南中的 release-schedule 链接（Daijiro Wachi）[#35920](https://github.com/nodejs/node/pull/35920)
* \[[`efbfeff62b`](https://github.com/nodejs/node/commit/efbfeff62b)] - **doc**: 修复错误的标题级别（Bryan Field）[#35965](https://github.com/nodejs/node/pull/35965)
* \[[`9c4b360d08`](https://github.com/nodejs/node/commit/9c4b360d08)] - **doc,crypto**: 添加关于 dsaEncoding 的 sign/verify 方法变更（Filip Skokan）[#35480](https://github.com/nodejs/node/pull/35480)
* \[[`85cf30541d`](https://github.com/nodejs/node/commit/85cf30541d)] - **doc,fs**: 记录符号链接上 stats.isDirectory 的值（coderaiser）[#27413](https://github.com/nodejs/node/pull/27413)
* \[[`d6bd78ff82`](https://github.com/nodejs/node/commit/d6bd78ff82)] - **doc,net**: 记录 socket.timeout（Brandon Kobel）[#34543](https://github.com/nodejs/node/pull/34543)
* \[[`36c20d939a`](https://github.com/nodejs/node/commit/36c20d939a)] - **doc,stream**: write(chunk, encoding, cb) 的 encoding 可以为 null（dev-script）[#35372](https://github.com/nodejs/node/pull/35372)
* \[[`9d26c4d496`](https://github.com/nodejs/node/commit/9d26c4d496)] - **domain**: 重构以使用更多 primordials（Antoine du Hamel）[#35885](https://github.com/nodejs/node/pull/35885)
* \[[`d83e253065`](https://github.com/nodejs/node/commit/d83e253065)] - **errors**: 重构以使用更多 primordials（Antoine du Hamel）[#35944](https://github.com/nodejs/node/pull/35944)
* \[[`567f8d8caf`](https://github.com/nodejs/node/commit/567f8d8caf)] - **(SEMVER-MINOR)** **events**: getEventListeners 静态方法（Benjamin Gruenbaum）[#35991](https://github.com/nodejs/node/pull/35991)
* \[[`9e673723e3`](https://github.com/nodejs/node/commit/9e673723e3)] - **events**: 以正确的顺序触发处理程序（Benjamin Gruenbaum）[#35931](https://github.com/nodejs/node/pull/35931)
* \[[`ff59fcdf7b`](https://github.com/nodejs/node/commit/ff59fcdf7b)] - **events**: 在原型上定义 abort（Benjamin Gruenbaum）[#35931](https://github.com/nodejs/node/pull/35931)
* \[[`ab0eb4f2c9`](https://github.com/nodejs/node/commit/ab0eb4f2c9)] - **events**: 支持原型上的事件处理程序（Benjamin Gruenbaum）[#35931](https://github.com/nodejs/node/pull/35931)
* \[[`33e2ee58a7`](https://github.com/nodejs/node/commit/33e2ee58a7)] - **events**: 将事件处理程序定义为可枚举（Benjamin Gruenbaum）[#35931](https://github.com/nodejs/node/pull/35931)
* \[[`a7d0c76f86`](https://github.com/nodejs/node/commit/a7d0c76f86)] - **events**: 支持在 nodeeventtarget 上 emit（Benjamin Gruenbaum）[#35851](https://github.com/nodejs/node/pull/35851)
* \[[`76332a0439`](https://github.com/nodejs/node/commit/76332a0439)] - **events**: 移植部分 WPT 测试（Benjamin Gruenbaum）[#33621](https://github.com/nodejs/node/pull/33621)
* \[[`ccf9f0e62e`](https://github.com/nodejs/node/commit/ccf9f0e62e)] - **(SEMVER-MINOR)** **fs**: 在 writeFile 中支持 abortsignal（Benjamin Gruenbaum）[#35993](https://github.com/nodejs/node/pull/35993)
* \[[`7ef9c707e9`](https://github.com/nodejs/node/commit/7ef9c707e9)] - **fs**: 用 PromisePrototypeFinally 替换 finally（Baruch Odem (Rothkoff)）[#35995](https://github.com/nodejs/node/pull/35995)
* \[[`ccbe267515`](https://github.com/nodejs/node/commit/ccbe267515)] - **fs**: 移除 fs/promises 中不必要的 Function#bind()（Ben Noordhuis）[#35208](https://github.com/nodejs/node/pull/35208)
* \[[`6011bfdec5`](https://github.com/nodejs/node/commit/6011bfdec5)] - **fs**: 移除未使用的赋值（Rich Trott）[#35882](https://github.com/nodejs/node/pull/35882)
* \[[`92bdfd141b`](https://github.com/nodejs/node/commit/92bdfd141b)] - **(SEMVER-MINOR)** **fs**: 为 readFile 添加对 AbortSignal 的支持（Benjamin Gruenbaum）[#35911](https://github.com/nodejs/node/pull/35911)
* \[[`11f592450b`](https://github.com/nodejs/node/commit/11f592450b)] - **http2**: 为 proxySocketHandler 添加 has 方法（masx200）[#35197](https://github.com/nodejs/node/pull/35197)
* \[[`28ed7d062e`](https://github.com/nodejs/node/commit/28ed7d062e)] - **http2**: 将 socket 事件绑定集中到 Http2Session 中（Momtchil Momtchev）[#35772](https://github.com/nodejs/node/pull/35772)
* \[[`429113ebfb`](https://github.com/nodejs/node/commit/429113ebfb)] - **http2**: 将事件移动到 JSStreamSocket（Momtchil Momtchev）[#35772](https://github.com/nodejs/node/pull/35772)
* \[[`1dd744a420`](https://github.com/nodejs/node/commit/1dd744a420)] - **http2**: 修复错误流写入后跟随 destroy 的问题（David Halls）[#35951](https://github.com/nodejs/node/pull/35951)
* \[[`af2a560c42`](https://github.com/nodejs/node/commit/af2a560c42)] - **lib**: 将 %TypedArray% 抽象构造函数添加到 primordials（ExE Boss）[#36016](https://github.com/nodejs/node/pull/36016)
* \[[`b700900d02`](https://github.com/nodejs/node/commit/b700900d02)] - **lib**: 重构以使用更多 primordials（Antoine du Hamel）[#35875](https://github.com/nodejs/node/pull/35875)
* \[[`7a375902ff`](https://github.com/nodejs/node/commit/7a375902ff)] - **module**: 重构以使用更多 primordials（Antoine du Hamel）[#36024](https://github.com/nodejs/node/pull/36024)
* \[[`8d76db86b5`](https://github.com/nodejs/node/commit/8d76db86b5)] - **module**: 重构为使用 iterable-weak-map（Benjamin Coe）[#35915](https://github.com/nodejs/node/pull/35915)
* \[[`9b6512f7de`](https://github.com/nodejs/node/commit/9b6512f7de)] - **n-api**: 在析构期间解除引用的链接（Gabriel Schulhof）[#35933](https://github.com/nodejs/node/pull/35933)
* \[[`1b277d97f3`](https://github.com/nodejs/node/commit/1b277d97f3)] - **src**: 移除 crypto 状态枚举中的 ERR 前缀（Daniel Bevenius）[#35867](https://github.com/nodejs/node/pull/35867)
* \[[`9774b4cc72`](https://github.com/nodejs/node/commit/9774b4cc72)] - **stream**: 修复抛出的对象引用（Gil Pedersen）[#36065](https://github.com/nodejs/node/pull/36065)
* \[[`359a6590b0`](https://github.com/nodejs/node/commit/359a6590b0)] - **stream**: writableNeedDrain（Robert Nagy）[#35348](https://github.com/nodejs/node/pull/35348)
* \[[`b7aa5e2296`](https://github.com/nodejs/node/commit/b7aa5e2296)] - **stream**: 移除 isPromise 工具函数（Antoine du Hamel）[#35925](https://github.com/nodejs/node/pull/35925)
* \[[`fdae9ad188`](https://github.com/nodejs/node/commit/fdae9ad188)] - **test**: 修复 test-performance-eventlooputil 中的竞态问题（Gerhard Stoebich）[#36028](https://github.com/nodejs/node/pull/36028)
* \[[`0a4c96a7df`](https://github.com/nodejs/node/commit/0a4c96a7df)] - **test**: 使用 global.EventTarget 代替 internals（Antoine du Hamel）[#36002](https://github.com/nodejs/node/pull/36002)
* \[[`f73b8d84db`](https://github.com/nodejs/node/commit/f73b8d84db)] - **test**: 改进 policy 失败时的错误信息（Bradley Meck）[#35633](https://github.com/nodejs/node/pull/35633)
* \[[`cb6f0d3d89`](https://github.com/nodejs/node/commit/cb6f0d3d89)] - **test**: 更新 test_util.cc 的旧注释风格（raisinten）[#35884](https://github.com/nodejs/node/pull/35884)
* \[[`23f0d0c45c`](https://github.com/nodejs/node/commit/23f0d0c45c)] - **test**: 修复 test/internet/test-dns.js 中的错误（Rich Trott）[#35969](https://github.com/nodejs/node/pull/35969)
* \[[`77e4f19701`](https://github.com/nodejs/node/commit/77e4f19701)] - **timers**: 清理 awaitable timers 上的 abort 监听器（James M Snell）[#36006](https://github.com/nodejs/node/pull/36006)
* \[[`a7350b3a8f`](https://github.com/nodejs/node/commit/a7350b3a8f)] - **tools**: 不在未提供标志时打印 gold linker 警告（Myles Borins）[#35955](https://github.com/nodejs/node/pull/35955)
* \[[`1f27214480`](https://github.com/nodejs/node/commit/1f27214480)] - **tools**: 添加新的 ESLint 规则：prefer-primordials（Leko）[#35448](https://github.com/nodejs/node/pull/35448)
* \[[`da3c2ab828`](https://github.com/nodejs/node/commit/da3c2ab828)] - **tools,doc**: 在 acorn parser 中启用 ecmaVersion 2021（Antoine du Hamel）[#35994](https://github.com/nodejs/node/pull/35994)
* \[[`f8098c3e43`](https://github.com/nodejs/node/commit/f8098c3e43)] - **tools,lib**: 建议使用安全的 primordials（Antoine du Hamel）[#36026](https://github.com/nodejs/node/pull/36026)
* \[[`eea7e3b0d0`](https://github.com/nodejs/node/commit/eea7e3b0d0)] - **tools,lib**: 收紧 Error 静态成员的 prefer-primordials 规则（Antoine du Hamel）[#36017](https://github.com/nodejs/node/pull/36017)
* \[[`7a2edea7ed`](https://github.com/nodejs/node/commit/7a2edea7ed)] - **win, build**: 修复 Windows 上的构建时间（Bartosz Sosnowski）[#35932](https://github.com/nodejs/node/pull/35932)

<a id="15.1.0"></a>

## 2020-11-04，版本 15.1.0（当前），@targos

### 重要变更

#### 诊断通道（实验性模块）

`diagnostics_channel` 是一个新的实验性模块，提供了一个用于创建命名通道的 API，以便出于诊断目的报告任意消息数据。

借助 `diagnostics_channel`，Node.js 核心和模块作者可以在特定时间发布有关其正在执行操作的上下文数据。例如，这可以是 mysql 查询的主机名和查询字符串。只需使用 `dc.channel(name)` 创建一个命名通道，并调用 `channel.publish(data)` 将数据发送给该通道的任何监听器。

```js
const dc = require('diagnostics_channel');
const channel = dc.channel('mysql.query');

MySQL.prototype.query = function query(queryString, values, callback) {
  // 每次发起查询时广播查询信息
  channel.publish({
    query: queryString,
    host: this.hostname,
  });

  this.doQuery(queryString, values, callback);
};
```

通道就像一个大型全局事件发射器，但被拆分为独立对象，以确保获得最佳性能。如果没有任何内容正在监听该通道，发布开销应尽可能接近于零。消费通道数据就像使用 `channel.subscribe(listener)` 一样简单，它会在向该通道发布消息时运行一个函数。

```js
const dc = require('diagnostics_channel');
const channel = dc.channel('mysql.query');

channel.subscribe(({ query, host }) => {
  console.log(`到 ${host} 的 mysql 查询：${query}`);
});
```

捕获到的数据可用于为应用在特定时间正在执行的操作提供上下文。这可用于增强跟踪数据、跟踪网络和文件系统活动、记录查询，以及许多其他用途。对于诊断工具来说，这也是一个非常有用的数据源，可以在它们呈现的数据中更清晰地展示应用在某一时刻究竟在做什么。

由 Stephen Belanger 贡献 [#34895](https://github.com/nodejs/node/pull/34895)。

#### 新的子进程 `'spawn'` 事件

`ChildProcess` 的实例现在会在子进程成功生成后发出一个新的 `'spawn'` 事件。

如果发出，`'spawn'` 事件会先于所有其他事件触发，并且先于通过 `stdout` 或 `stderr` 接收到任何数据。

无论在生成的进程**内部**是否发生错误，`'spawn'` 事件都会触发。
例如，如果 `bash some-command` 成功生成，`'spawn'` 事件会触发，尽管 `bash` 可能无法生成 `some-command`。
使用 `{ shell: true }` 时，这一点同样适用。

由 Matthew Francis Brunetti 贡献 [#35369](https://github.com/nodejs/node/pull/35369)。

#### 为 DNS 解析设置本地地址

现在可以为 `Resolver` 实例设置用于发送请求的本地 IP 地址。
这允许程序在多宿主系统上使用时指定出站接口。

解析器在向 IPv4 DNS 服务器发送请求时将使用 v4 本地地址，在向 IPv6 DNS 服务器发送请求时将使用 v6 本地地址。

```js
const { Resolver } = require('dns');

const resolver = new Resolver();

resolver.setLocalAddress('10.1.2.3');
// 等同于：resolver.setLocalAddress('10.1.2.3', '::0');
```

由 Josh Dague 贡献 [#34824](https://github.com/nodejs/node/pull/34824)。

#### 在运行时控制 V8 覆盖率

`v8` 模块包含两个新方法，用于控制由 `NODE_V8_COVERAGE` 环境变量启动的 V8 覆盖率。

使用 `v8.takeCoverage()`，可以按需将覆盖率报告写入磁盘。该操作可在进程生命周期内多次执行，每次调用时执行计数都会被重置。
当进程即将退出时，仍会最后一次将覆盖率写入磁盘，除非之前调用了 `v8.stopCoverage()`。

`v8.stopCoverage()` 方法允许停止覆盖率收集，从而让 V8 释放执行计数器并优化代码。

由 Joyee Cheung 贡献 [#33807](https://github.com/nodejs/node/pull/33807)。

#### 分析 Worker 的事件循环利用率

`Worker` 实例现在有一个 `performance` 属性，其中包含一个 `eventLoopUtilization` 方法，可用于收集 worker 在 `'online'` 和 `'exit'` 事件之间的事件循环利用率信息。

该方法的工作方式与 `perf_hooks` 的 `eventLoopUtilization()` 相同。

由 Trevor Norris 贡献 [#35664](https://github.com/nodejs/node/pull/35664)。

#### 在即将耗尽内存前获取 V8 堆快照（实验性）

借助新的 `--heapsnapshot-near-heap-limit=max_count` 实验性命令行标志，现在可以在 V8 堆使用量接近堆限制时自动生成堆快照。`count` 应为非负整数（在这种情况下，Node.js 写入磁盘的快照数量不会超过 `max_count`）。

在生成快照时，可能会触发垃圾回收并降低堆使用量，因此在 Node.js 实例最终真正耗尽内存之前，可能会将多个快照写入磁盘。可以比较这些堆快照，以确定在连续快照之间的这段时间里分配了哪些对象。

生成 V8 快照需要时间和内存（既包括由 V8 堆管理的内存，也包括 V8 堆之外的原生内存）。堆越大，需要的资源就越多。Node.js 会调整 V8 堆以容纳额外的 V8 堆内存开销，并尽最大努力避免耗尽进程可用的全部内存。

```console
$ node --max-old-space-size=100 --heapsnapshot-near-heap-limit=3 index.js
Wrote snapshot to Heap.20200430.100036.49580.0.001.heapsnapshot
Wrote snapshot to Heap.20200430.100037.49580.0.002.heapsnapshot
Wrote snapshot to Heap.20200430.100038.49580.0.003.heapsnapshot

<--- Last few GCs --->

[49580:0x110000000]     4826 ms: Mark-sweep 130.6 (147.8) -> 130.5 (147.8) MB, 27.4 / 0.0 ms  (average mu = 0.126, current mu = 0.034) allocation failure scavenge might not succeed
[49580:0x110000000]     4845 ms: Mark-sweep 130.6 (147.8) -> 130.6 (147.8) MB, 18.8 / 0.0 ms  (average mu = 0.088, current mu = 0.031) allocation failure scavenge might not succeed


<--- JS stacktrace --->

FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
....
```

由 Joyee Cheung 贡献 [#33010](https://github.com/nodejs/node/pull/33010)。

### 提交

#### Semver-minor 提交

* \[[`8169902b40`](https://github.com/nodejs/node/commit/8169902b40)] - **(SEMVER-MINOR)** **child\_process**: 添加 ChildProcess 的 'spawn' 事件 (Matthew Francis Brunetti) [#35369](https://github.com/nodejs/node/pull/35369)
* \[[`548f91af2c`](https://github.com/nodejs/node/commit/548f91af2c)] - **(SEMVER-MINOR)** **dns**: 为 Resolver 添加 setLocalAddress (Josh Dague) [#34824](https://github.com/nodejs/node/pull/34824)
* \[[`f861733bac`](https://github.com/nodejs/node/commit/f861733bac)] - **(SEMVER-MINOR)** **http**: 使用 diagnostics\_channel 报告请求开始和结束 (Stephen Belanger) [#34895](https://github.com/nodejs/node/pull/34895)
* \[[`883ed4b7f1`](https://github.com/nodejs/node/commit/883ed4b7f1)] - **(SEMVER-MINOR)** **http2**: 为两个 http2 服务器都添加 updateSettings (Vincent Boivin) [#35383](https://github.com/nodejs/node/pull/35383)
* \[[`b38a43d5d9`](https://github.com/nodejs/node/commit/b38a43d5d9)] - **(SEMVER-MINOR)** **lib**: 创建 diagnostics\_channel 模块 (Stephen Belanger) [#34895](https://github.com/nodejs/node/pull/34895)
* \[[`a7f37bc725`](https://github.com/nodejs/node/commit/a7f37bc725)] - **(SEMVER-MINOR)** **src**: 添加 --heapsnapshot-near-heap-limit 选项 (Joyee Cheung) [#33010](https://github.com/nodejs/node/pull/33010)
* \[[`7bfa872013`](https://github.com/nodejs/node/commit/7bfa872013)] - **(SEMVER-MINOR)** **v8**: 实现 v8.stopCoverage() (Joyee Cheung) [#33807](https://github.com/nodejs/node/pull/33807)
* \[[`15ffed5319`](https://github.com/nodejs/node/commit/15ffed5319)] - **(SEMVER-MINOR)** **v8**: 实现 v8.takeCoverage() (Joyee Cheung) [#33807](https://github.com/nodejs/node/pull/33807)
* \[[`221e28311f`](https://github.com/nodejs/node/commit/221e28311f)] - **(SEMVER-MINOR)** **worker**: 添加 eventLoopUtilization() (Trevor Norris) [#35664](https://github.com/nodejs/node/pull/35664)

#### Semver-patch 提交

* \[[`d95013f399`](https://github.com/nodejs/node/commit/d95013f399)] - **assert,repl**: 在 acorn 解析器中启用 ecmaVersion 2021 (Michaël Zasso) [#35827](https://github.com/nodejs/node/pull/35827)
* \[[`b11c7378e3`](https://github.com/nodejs/node/commit/b11c7378e3)] - **build**: 修复 lint-js-fix 目标 (Antoine du Hamel) [#35927](https://github.com/nodejs/node/pull/35927)
* \[[`a5fa849631`](https://github.com/nodejs/node/commit/a5fa849631)] - **build**: 添加 vcbuilt test-doc 目标 (Antoine du Hamel) [#35708](https://github.com/nodejs/node/pull/35708)
* \[[`34281cdaba`](https://github.com/nodejs/node/commit/34281cdaba)] - **build**: 关闭 Codecov 评论 (bcoe) [#35800](https://github.com/nodejs/node/pull/35800)
* \[[`a9c09246bb`](https://github.com/nodejs/node/commit/a9c09246bb)] - **build**: 添加 license-builder GitHub Action (Tierney Cyren) [#35712](https://github.com/nodejs/node/pull/35712)
* \[[`4447ff1162`](https://github.com/nodejs/node/commit/4447ff1162)] - **build,tools**: gitHub Actions：使用 Node.js Fermium (Antoine du Hamel) [#35840](https://github.com/nodejs/node/pull/35840)
* \[[`273e147017`](https://github.com/nodejs/node/commit/273e147017)] - **build,tools**: 添加 lint-js-doc 目标 (Antoine du Hamel) [#35708](https://github.com/nodejs/node/pull/35708)
* \[[`0ebf44b466`](https://github.com/nodejs/node/commit/0ebf44b466)] - **crypto**: 正确地将空密码短语传递给 OpenSSL (Tobias Nießen) [#35914](https://github.com/nodejs/node/pull/35914)
* \[[`644c416389`](https://github.com/nodejs/node/commit/644c416389)] - **crypto**: 将 check 重命名为 createJob (Daniel Bevenius) [#35858](https://github.com/nodejs/node/pull/35858)
* \[[`79a8fb62e6`](https://github.com/nodejs/node/commit/79a8fb62e6)] - **crypto**: 修复 scrypt 回归问题 (James M Snell) [#35821](https://github.com/nodejs/node/pull/35821)
* \[[`abd7c9447c`](https://github.com/nodejs/node/commit/abd7c9447c)] - **crypto**: 修复 webcrypto ECDH JWK 导入 (Filip Skokan) [#35855](https://github.com/nodejs/node/pull/35855)
* \[[`d3f1cde908`](https://github.com/nodejs/node/commit/d3f1cde908)] - **deps**: 将 npm 升级到 7.0.8 (Myles Borins) [#35953](https://github.com/nodejs/node/pull/35953)
* \[[`55adee0947`](https://github.com/nodejs/node/commit/55adee0947)] - **deps**: 将 npm 升级到 7.0.7 (Luigi Pinca) [#35908](https://github.com/nodejs/node/pull/35908)
* \[[`5cb77f2e79`](https://github.com/nodejs/node/commit/5cb77f2e79)] - **deps**: 升级到 cjs-module-lexer\@1.0.0 (Guy Bedford) [#35928](https://github.com/nodejs/node/pull/35928)
* \[[`1303a1fca8`](https://github.com/nodejs/node/commit/1303a1fca8)] - **deps**: 更新到 cjs-module-lexer\@0.5.2 (Guy Bedford) [#35901](https://github.com/nodejs/node/pull/35901)
* \[[`20accb08fa`](https://github.com/nodejs/node/commit/20accb08fa)] - **deps**: 升级到 cjs-module-lexer\@0.5.0 (Guy Bedford) [#35871](https://github.com/nodejs/node/pull/35871)
* \[[`52a77db759`](https://github.com/nodejs/node/commit/52a77db759)] - **deps**: 更新 acorn 到 v8.0.4 (Michaël Zasso) [#35791](https://github.com/nodejs/node/pull/35791)
* \[[`e0a1541260`](https://github.com/nodejs/node/commit/e0a1541260)] - **deps**: 更新到 cjs-module-lexer\@0.4.3 (Guy Bedford) [#35745](https://github.com/nodejs/node/pull/35745)
* \[[`894419c1f4`](https://github.com/nodejs/node/commit/894419c1f4)] - **deps**: V8：回移植 4263f8a5e8e0 (Brian 'bdougie' Douglas) [#35650](https://github.com/nodejs/node/pull/35650)
* \[[`564aadedac`](https://github.com/nodejs/node/commit/564aadedac)] - **doc,src,test**: 根据 lint 工具更新修订 C++ 代码 (Rich Trott) [#35719](https://github.com/nodejs/node/pull/35719)
* \[[`7c8b5e5e0e`](https://github.com/nodejs/node/commit/7c8b5e5e0e)] - **errors**: 不要对带有 scheme 的 URL 调用 resolve (bcoe) [#35903](https://github.com/nodejs/node/pull/35903)
* \[[`1cdfaa80f8`](https://github.com/nodejs/node/commit/1cdfaa80f8)] - **events**: 添加一些测试 (Benjamin Gruenbaum) [#35806](https://github.com/nodejs/node/pull/35806)
* \[[`f08e2c0213`](https://github.com/nodejs/node/commit/f08e2c0213)] - **events**: 使 abort\_controller 事件为可信事件 (Benjamin Gruenbaum) [#35811](https://github.com/nodejs/node/pull/35811)
* \[[`438d9debfd`](https://github.com/nodejs/node/commit/438d9debfd)] - **events**: 使 eventTarget.removeAllListeners() 返回 this (Luigi Pinca) [#35805](https://github.com/nodejs/node/pull/35805)
* \[[`b6b7a3b86a`](https://github.com/nodejs/node/commit/b6b7a3b86a)] - **http**: 惰性创建 IncomingMessage.headers (Robert Nagy) [#35281](https://github.com/nodejs/node/pull/35281)
* \[[`86ed87b6b7`](https://github.com/nodejs/node/commit/86ed87b6b7)] - **http2**: 修复重新注入检查 (Momtchil Momtchev) [#35678](https://github.com/nodejs/node/pull/35678)
* \[[`5833007eb0`](https://github.com/nodejs/node/commit/5833007eb0)] - **http2**: 重新注入在附加 http2 之前接收到的数据 (Momtchil Momtchev) [#35678](https://github.com/nodejs/node/pull/35678)
* \[[`cfe61b8714`](https://github.com/nodejs/node/commit/cfe61b8714)] - **http2**: 移除不受支持的 %.\* 说明符 (Momtchil Momtchev) [#35694](https://github.com/nodejs/node/pull/35694)
* \[[`d2f574b5be`](https://github.com/nodejs/node/commit/d2f574b5be)] - **lib**: 让 abort\_controller 的目标成为 EventTarget (Daijiro Wachi) [#35869](https://github.com/nodejs/node/pull/35869)
* \[[`b1e531a70b`](https://github.com/nodejs/node/commit/b1e531a70b)] - **lib**: 调用 Error 的方法时使用 primordials (Antoine du Hamel) [#35837](https://github.com/nodejs/node/pull/35837)
* \[[`0f5a8c55c2`](https://github.com/nodejs/node/commit/0f5a8c55c2)] - **module**: 在运行时弃用子路径文件夹映射 (Guy Bedford) [#35747](https://github.com/nodejs/node/pull/35747)
* \[[`d16e2fa69a`](https://github.com/nodejs/node/commit/d16e2fa69a)] - **n-api**: napi\_make\_callback 使用 async\_context 的资源发出 async init (legendecas) [#32930](https://github.com/nodejs/node/pull/32930)
* \[[`0c17dbd201`](https://github.com/nodejs/node/commit/0c17dbd201)] - **n-api**: 回退最终化相关更改 (Michael Dawson) [#35777](https://github.com/nodejs/node/pull/35777)
* \[[`fb7196434e`](https://github.com/nodejs/node/commit/fb7196434e)] - **src**: 移除冗余的 OpenSSLBuffer (James M Snell) [#35663](https://github.com/nodejs/node/pull/35663)
* \[[`c9225789d3`](https://github.com/nodejs/node/commit/c9225789d3)] - **src**: 移除 WebCryptoKeyExportStatus 中的 ERR 前缀 (Daniel Bevenius) [#35639](https://github.com/nodejs/node/pull/35639)
* \[[`4128eefcb3`](https://github.com/nodejs/node/commit/4128eefcb3)] - **src**: 移除对 v8 的 GCC -Wcast-function-type 忽略 (Daniel Bevenius) [#35768](https://github.com/nodejs/node/pull/35768)
* \[[`4b8b5fee6a`](https://github.com/nodejs/node/commit/4b8b5fee6a)] - **src**: 使用 MaybeLocal.ToLocal 而不是 IsEmpty (Daniel Bevenius) [#35716](https://github.com/nodejs/node/pull/35716)
* \[[`01d7c46776`](https://github.com/nodejs/node/commit/01d7c46776)] - _**回退**_ "**src**: 忽略对 v8.h 的 GCC -Wcast-function-type" (Daniel Bevenius) [#35758](https://github.com/nodejs/node/pull/35758)
* \[[`2868f52a5c`](https://github.com/nodejs/node/commit/2868f52a5c)] - **stream**: 修复 duplex 结束时的回归问题 (Momtchil Momtchev) [#35941](https://github.com/nodejs/node/pull/35941)
* \[[`70c41a830d`](https://github.com/nodejs/node/commit/70c41a830d)] - **stream**: 移除注释中的冗余上下文 (Yash Ladha) [#35728](https://github.com/nodejs/node/pull/35728)
* \[[`88eb6191e4`](https://github.com/nodejs/node/commit/88eb6191e4)] - **stream**: 修复 stream destroy 中的重复逻辑 (Yash Ladha) [#35727](https://github.com/nodejs/node/pull/35727)
* \[[`a41e3ebc3a`](https://github.com/nodejs/node/commit/a41e3ebc3a)] - **timers**: 更正注释中的说明 (Turner Jabbour) [#35437](https://github.com/nodejs/node/pull/35437)
* \[[`ee15142fef`](https://github.com/nodejs/node/commit/ee15142fef)] - **tls**: 允许将数据读入静态缓冲区 (Andrey Pechkurov) [#35753](https://github.com/nodejs/node/pull/35753)
* \[[`102d7dfe02`](https://github.com/nodejs/node/commit/102d7dfe02)] - **zlib**: 测试 BrotliCompress 抛出无效参数值 (raisinten) [#35830](https://github.com/nodejs/node/pull/35830)

#### 文档提交

* \[[`7937fbe3bc`](https://github.com/nodejs/node/commit/7937fbe3bc)] - **doc**: 根据 lint 更改更新 README 文件中的表格 (Rich Trott) [#35905](https://github.com/nodejs/node/pull/35905)
* \[[`c5b94220c5`](https://github.com/nodejs/node/commit/c5b94220c5)] - **doc**: 暂时禁用 list-item-bullet-indent (Nick Schonning) [#35647](https://github.com/nodejs/node/pull/35647)
* \[[`59b36af8d5`](https://github.com/nodejs/node/commit/59b36af8d5)] - **doc**: 禁用 no-undefined-references 变通方案 (Nick Schonning) [#35647](https://github.com/nodejs/node/pull/35647)
* \[[`eb55462a75`](https://github.com/nodejs/node/commit/eb55462a75)] - **doc**: 为 remark v13 调整表格对齐 (Nick Schonning) [#35647](https://github.com/nodejs/node/pull/35647)
* \[[`0ac4a6ab16`](https://github.com/nodejs/node/commit/0ac4a6ab16)] - **doc**: 更新 crypto.createSecretKey 历史记录 (Ben Turner) [#35874](https://github.com/nodejs/node/pull/35874)
* \[[`4899998855`](https://github.com/nodejs/node/commit/4899998855)] - **doc**: 将 bnoordhuis 调整为 emeritus (Ben Noordhuis) [#35865](https://github.com/nodejs/node/pull/35865)
* \[[`337bfcf614`](https://github.com/nodejs/node/commit/337bfcf614)] - **doc**: 在 API 文档中添加 on 语句 (Pooja D.P) [#35610](https://github.com/nodejs/node/pull/35610)
* \[[`9703219fdb`](https://github.com/nodejs/node/commit/9703219fdb)] - **doc**: 修复 CHANGELOG_V15 中的一个拼写错误 (Takuya Noguchi) [#35804](https://github.com/nodejs/node/pull/35804)
* \[[`c14889bcc1`](https://github.com/nodejs/node/commit/c14889bcc1)] - **doc**: 将 ronkorving 调整为 emeritus (Rich Trott) [#35828](https://github.com/nodejs/node/pull/35828)
* \[[`8c2b17926c`](https://github.com/nodejs/node/commit/8c2b17926c)] - **doc**: 推荐使用 test-doc 而不是 lint-md (Antoine du Hamel) [#35708](https://github.com/nodejs/node/pull/35708)
* \[[`0580258449`](https://github.com/nodejs/node/commit/0580258449)] - **doc**: 修复对 googletest test fixture 的引用 (Tobias Nießen) [#35813](https://github.com/nodejs/node/pull/35813)
* \[[`d291e3abd9`](https://github.com/nodejs/node/commit/d291e3abd9)] - **doc**: 稳定 packages 特性 (Myles Borins) [#35742](https://github.com/nodejs/node/pull/35742)
* \[[`5e8d821b4c`](https://github.com/nodejs/node/commit/5e8d821b4c)] - **doc**: 为 setBreakpoint() 添加条件示例 (Chris Opperwall) [#35823](https://github.com/nodejs/node/pull/35823)
* \[[`8074f69f82`](https://github.com/nodejs/node/commit/8074f69f82)] - **doc**: 对 REPL 文档做一些小改进 (Rich Trott) [#35808](https://github.com/nodejs/node/pull/35808)
* \[[`4e76a3c106`](https://github.com/nodejs/node/commit/4e76a3c106)] - **doc**: 更新 MessagePort 文档以反映 EventTarget 继承 (Anna Henningsen) [#35839](https://github.com/nodejs/node/pull/35839)
* \[[`3db4354cc8`](https://github.com/nodejs/node/commit/3db4354cc8)] - **doc**: 在示例中使用大小写敏感 (Pooja D.P) [#35624](https://github.com/nodejs/node/pull/35624)
* \[[`b07f4a3f7a`](https://github.com/nodejs/node/commit/b07f4a3f7a)] - **doc**: 整合并澄清 breakOnSigInt 文本 (Rich Trott) [#35787](https://github.com/nodejs/node/pull/35787)
* \[[`c2e6a4b081`](https://github.com/nodejs/node/commit/c2e6a4b081)] - **doc**: 修复 \_construct 示例参数顺序 (Alejandro Oviedo) [#35790](https://github.com/nodejs/node/pull/35790)
* \[[`6513a589fe`](https://github.com/nodejs/node/commit/6513a589fe)] - **doc**: 在 pull-requests.md 中添加 subsystems 标题 (Pooja D.P) [#35718](https://github.com/nodejs/node/pull/35718)
* \[[`c365867c60`](https://github.com/nodejs/node/commit/c365867c60)] - **doc**: 修复 BUILDING.md 中的拼写错误 (raisinten) [#35807](https://github.com/nodejs/node/pull/35807)
* \[[`6211ffd2f7`](https://github.com/nodejs/node/commit/6211ffd2f7)] - **doc**: 在示例中添加 require 语句 (Pooja D.P) [#35554](https://github.com/nodejs/node/pull/35554)
* \[[`7b3743d8dd`](https://github.com/nodejs/node/commit/7b3743d8dd)] - **doc**: 修改 memory set 语句 set size (Pooja D.P) [#35517](https://github.com/nodejs/node/pull/35517)
* \[[`afbe23d800`](https://github.com/nodejs/node/commit/afbe23d800)] - **doc**: 在 readline 文档正文中使用 kbd 元素 (Rich Trott) [#35737](https://github.com/nodejs/node/pull/35737)
* \[[`c0a4fac040`](https://github.com/nodejs/node/commit/c0a4fac040)] - **doc**: 修复 CHANGELOG_V12 中的一个拼写错误 (Shubham Parihar) [#35786](https://github.com/nodejs/node/pull/35786)
* \[[`0e9acf83f7`](https://github.com/nodejs/node/commit/0e9acf83f7)] - **doc**: 修复 fs.md 中的标题级别 (ax1) [#35771](https://github.com/nodejs/node/pull/35771)
* \[[`f49afb5e10`](https://github.com/nodejs/node/commit/f49afb5e10)] - **doc**: 移除 v8 模块文档中的稳定性警告 (Rich Trott) [#35774](https://github.com/nodejs/node/pull/35774)
* \[[`368ae952b2`](https://github.com/nodejs/node/commit/368ae952b2)] - **doc**: 在 timers.md 中标记可选参数 (Vse Mozhe Buty) [#35764](https://github.com/nodejs/node/pull/35764)
* \[[`f6aa7c82c5`](https://github.com/nodejs/node/commit/f6aa7c82c5)] - **doc**: 向 API 文档属性添加示例代码 (Pooja D.P) [#35738](https://github.com/nodejs/node/pull/35738)
* \[[`55b7a6cea3`](https://github.com/nodejs/node/commit/55b7a6cea3)] - **doc**: 记录 `\*/promises` 别名模块的变更 (ExE Boss) [#34002](https://github.com/nodejs/node/pull/34002)
* \[[`4b7708a316`](https://github.com/nodejs/node/commit/4b7708a316)] - **doc**: 更新 console.error 示例 (Lee, Bonggi) [#34964](https://github.com/nodejs/node/pull/34964)
* \[[`292b529dfa`](https://github.com/nodejs/node/commit/292b529dfa)] - **doc**: 在 Node.js 14 Changelog 中添加缺失的链接 (Antoine du Hamel) [#35782](https://github.com/nodejs/node/pull/35782)
* \[[`890b03ecd6`](https://github.com/nodejs/node/commit/890b03ecd6)] - **doc**: 改进 breakOnSigint 的文本 (Rich Trott) [#35692](https://github.com/nodejs/node/pull/35692)
* \[[`1892532ee8`](https://github.com/nodejs/node/commit/1892532ee8)] - **doc**: 将 this prints 替换为 this is printed (Pooja D.P) [#35515](https://github.com/nodejs/node/pull/35515)
* \[[`6590f8cb4a`](https://github.com/nodejs/node/commit/6590f8cb4a)] - **doc**: 更新 package.json 字段定义 (Myles Borins) [#35741](https://github.com/nodejs/node/pull/35741)
* \[[`f269c6cbe2`](https://github.com/nodejs/node/commit/f269c6cbe2)] - **doc**: 在 BUILDING.md 中添加 Installing Node.js 标题 (Pooja D.P) [#35710](https://github.com/nodejs/node/pull/35710)
* \[[`05a888a8c3`](https://github.com/nodejs/node/commit/05a888a8c3)] - **doc,esm**: 记录实验性警告移除 (Antoine du Hamel) [#35750](https://github.com/nodejs/node/pull/35750)
* \[[`092c6c4f8f`](https://github.com/nodejs/node/commit/092c6c4f8f)] - **doc,test**: 更新 v8 方法文档和注释 (Rich Trott) [#35795](https://github.com/nodejs/node/pull/35795)

#### 其他提交

* \[[`76ebae4c05`](https://github.com/nodejs/node/commit/76ebae4c05)] - **benchmark**: 使基准测试工具可在 Node 10 下工作 (Joyee Cheung) [#35817](https://github.com/nodejs/node/pull/35817)
* \[[`9b549c1691`](https://github.com/nodejs/node/commit/9b549c1691)] - **benchmark**: 为加载公共模块添加启动基准测试 (Joyee Cheung) [#35816](https://github.com/nodejs/node/pull/35816)
* \[[`5d61e3db4b`](https://github.com/nodejs/node/commit/5d61e3db4b)] - **test**: 为 parallel.status 添加缺失的 ref 注释 (Rich Trott) [#35896](https://github.com/nodejs/node/pull/35896)
* \[[`231af88001`](https://github.com/nodejs/node/commit/231af88001)] - **test**: 修正 test-worker-eventlooputil (Gerhard Stoebich) [#35891](https://github.com/nodejs/node/pull/35891)
* \[[`da612dfc20`](https://github.com/nodejs/node/commit/da612dfc20)] - **test**: 集成来自 wpt 的 abort\_controller 测试 (Daijiro Wachi) [#35869](https://github.com/nodejs/node/pull/35869)
* \[[`66ad4be2c1`](https://github.com/nodejs/node/commit/66ad4be2c1)] - **test**: 为 fs/promises 添加 setImmediate 测试 (tyankatsu) [#35852](https://github.com/nodejs/node/pull/35852)
* \[[`830b789299`](https://github.com/nodejs/node/commit/830b789299)] - **test**: 将 test-worker-eventlooputil 标记为 flaky (Myles Borins) [#35886](https://github.com/nodejs/node/pull/35886)
* \[[`7691b673dc`](https://github.com/nodejs/node/commit/7691b673dc)] - **test**: 将 test-http2-respond-file-error-pipe-offset 标记为 flaky (Myles Borins) [#35883](https://github.com/nodejs/node/pull/35883)
* \[[`de3dcd7356`](https://github.com/nodejs/node/commit/de3dcd7356)] - **test**: 修复对 WPT testharness.js 的引用 (Tobias Nießen) [#35814](https://github.com/nodejs/node/pull/35814)
* \[[`8958af4aa0`](https://github.com/nodejs/node/commit/8958af4aa0)] - **test**: 为 policy 添加 onerror 测试用例 (Daijiro Wachi) [#35797](https://github.com/nodejs/node/pull/35797)
* \[[`dd3cbb455a`](https://github.com/nodejs/node/commit/dd3cbb455a)] - **test**: 为 encoding 添加上游测试用例 (Daijiro Wachi) [#35794](https://github.com/nodejs/node/pull/35794)
* \[[`76991c039f`](https://github.com/nodejs/node/commit/76991c039f)] - **test**: 为 urlsearchparam 添加上游测试用例 (Daijiro Wachi) [#35792](https://github.com/nodejs/node/pull/35792)
* \[[`110ef8aa50`](https://github.com/nodejs/node/commit/110ef8aa50)] - **test**: 重构覆盖率逻辑 (bcoe) [#35767](https://github.com/nodejs/node/pull/35767)
* \[[`0c5e8ed651`](https://github.com/nodejs/node/commit/0c5e8ed651)] - **test**: 为 rmdir recursive 添加额外的弃用警告测试 (Ian Sutherland) [#35683](https://github.com/nodejs/node/pull/35683)
* \[[`11eca36e83`](https://github.com/nodejs/node/commit/11eca36e83)] - **test**: 添加 Windows 和 C++ 覆盖率 (Benjamin Coe) [#35670](https://github.com/nodejs/node/pull/35670)
* \[[`fd027cd61a`](https://github.com/nodejs/node/commit/fd027cd61a)] - **tools**: 将 remark-lint-preset-node 升级到 2.0.0 (Rich Trott) [#35905](https://github.com/nodejs/node/pull/35905)
* \[[`c09fdba786`](https://github.com/nodejs/node/commit/c09fdba786)] - **tools**: 将 7 个 Node.js 补丁重新应用到 cpplint.py (Rich Trott) [#35866](https://github.com/nodejs/node/pull/35866)
* \[[`3955ccd305`](https://github.com/nodejs/node/commit/3955ccd305)] - **tools**: 将 cpplint 升级到 1.5.1 (Rich Trott) [#35866](https://github.com/nodejs/node/pull/35866)
* \[[`a07d1af4ea`](https://github.com/nodejs/node/commit/a07d1af4ea)] - **tools**: 将 ESLint 更新到 7.12.1 (cjihrig) [#35799](https://github.com/nodejs/node/pull/35799)
* \[[`d20b318c58`](https://github.com/nodejs/node/commit/d20b318c58)] - **tools**: 将 ESLint 更新到 7.12.0 (cjihrig) [#35799](https://github.com/nodejs/node/pull/35799)
* \[[`31753ec8aa`](https://github.com/nodejs/node/commit/31753ec8aa)] - **tools**: 将 msvc /P 输出添加到 .gitignore (Jiawen Geng) [#35735](https://github.com/nodejs/node/pull/35735)
* \[[`afb3e24cb0`](https://github.com/nodejs/node/commit/afb3e24cb0)] - **tools**: 添加 update-npm 脚本 (Myles Borins) [#35822](https://github.com/nodejs/node/pull/35822)
* \[[`66da122d46`](https://github.com/nodejs/node/commit/66da122d46)] - **tools**: 将 7 个 Node.js 补丁重新应用到 cpplint.py (Rich Trott) [#35719](https://github.com/nodejs/node/pull/35719)
* \[[`042d4dd71c`](https://github.com/nodejs/node/commit/042d4dd71c)] - **tools**: 将 cpplint 升级到 1.5.0 (Rich Trott) [#35719](https://github.com/nodejs/node/pull/35719)

<a id="15.0.1"></a>

## 2020-10-21, 版本 15.0.1（当前），@BethGriggs

### 重要变更

* **crypto**：修复 randomFillSync 上的回归问题（James M Snell）[#35723](https://github.com/nodejs/node/pull/35723)
  * 这修复了问题 <https://github.com/nodejs/node/issues/35722>。
* **deps**：将 npm 升级到 7.0.3（Ruy Adorno）[#35724](https://github.com/nodejs/node/pull/35724)
* **doc**：为 Danielle Adams 添加发布密钥（Danielle Adams）[#35545](https://github.com/nodejs/node/pull/35545)

### 提交

* \[[`c509485c19`](https://github.com/nodejs/node/commit/c509485c19)] - **build**：使用 make 函数而不是 echo（Antoine du Hamel）[#35707](https://github.com/nodejs/node/pull/35707)
* \[[`f5acc2d030`](https://github.com/nodejs/node/commit/f5acc2d030)] - **crypto**：修复 randomFillSync 上的回归问题（James M Snell）[#35723](https://github.com/nodejs/node/pull/35723)
* \[[`595c8df48d`](https://github.com/nodejs/node/commit/595c8df48d)] - **deps**：将 npm 升级到 7.0.3（Ruy Adorno）[#35724](https://github.com/nodejs/node/pull/35724)
* \[[`69e7f20f2d`](https://github.com/nodejs/node/commit/69e7f20f2d)] - **deps**：V8：设置正确的 V8 版本补丁号（Michaël Zasso）[#35732](https://github.com/nodejs/node/pull/35732)
* \[[`b78294dc00`](https://github.com/nodejs/node/commit/b78294dc00)] - **doc**：在 readline 文档中使用 kbd 元素（Rich Trott）[#35698](https://github.com/nodejs/node/pull/35698)
* \[[`1efa87082b`](https://github.com/nodejs/node/commit/1efa87082b)] - **doc**：为 Danielle Adams 添加发布密钥（Danielle Adams）[#35545](https://github.com/nodejs/node/pull/35545)
* \[[`6e91d644e3`](https://github.com/nodejs/node/commit/6e91d644e3)] - **doc**：在 os 文档中使用 kbd 元素（Rich Trott）[#35656](https://github.com/nodejs/node/pull/35656)
* \[[`5a48a7b6f8`](https://github.com/nodejs/node/commit/5a48a7b6f8)] - **doc**：在文档中添加一项声明。（Pooja D.P）[#35585](https://github.com/nodejs/node/pull/35585)
* \[[`6a7a61be7c`](https://github.com/nodejs/node/commit/6a7a61be7c)] - **src**：在 NewRootCertStore 中标记/弹出 OpenSSL 错误（Daniel Bevenius）[#35514](https://github.com/nodejs/node/pull/35514)
* \[[`d54edece99`](https://github.com/nodejs/node/commit/d54edece99)] - **test**：重构 test-crypto-pbkdf2（Tobias Nießen）[#35693](https://github.com/nodejs/node/pull/35693)

<a id="15.0.0"></a>

## 2020-10-20, 版本 15.0.0（当前），@BethGriggs

### 重要变更

#### 弃用和移除

* \[[`a11788736a`](https://github.com/nodejs/node/commit/a11788736a)] - **(SEMVER-MAJOR)** **build**：移除 --build-v8-with-gn 配置选项（Yang Guo）[#27576](https://github.com/nodejs/node/pull/27576)
* \[[`89428c7a2d`](https://github.com/nodejs/node/commit/89428c7a2d)] - **(SEMVER-MAJOR)** **build**：停止支持 VS2017（Michaël Zasso）[#33694](https://github.com/nodejs/node/pull/33694)
* \[[`c25cf34ac1`](https://github.com/nodejs/node/commit/c25cf34ac1)] - **(SEMVER-MAJOR)** **doc**：将 DEP0018 移至生命周期结束（Rich Trott）[#35316](https://github.com/nodejs/node/pull/35316)
* \[[`2002d90abd`](https://github.com/nodejs/node/commit/2002d90abd)] - **(SEMVER-MAJOR)** **fs**：递归 rmdir 时发出弃用警告（Ian Sutherland）[#35562](https://github.com/nodejs/node/pull/35562)
* \[[`eee522ac29`](https://github.com/nodejs/node/commit/eee522ac29)] - **(SEMVER-MAJOR)** **lib**：添加与 EventTarget 相关的浏览器全局对象（Anna Henningsen）[#35496](https://github.com/nodejs/node/pull/35496)
* \[[`41796ebd30`](https://github.com/nodejs/node/commit/41796ebd30)] - **(SEMVER-MAJOR)** **net**：移除长期弃用的 server.connections 属性（James M Snell）[#33647](https://github.com/nodejs/node/pull/33647)
* \[[`a416692e93`](https://github.com/nodejs/node/commit/a416692e93)] - **(SEMVER-MAJOR)** **repl**：移除已弃用的 repl.memory 函数（Ruben Bridgewater）[#33286](https://github.com/nodejs/node/pull/33286)
* \[[`f217b2dfb0`](https://github.com/nodejs/node/commit/f217b2dfb0)] - **(SEMVER-MAJOR)** **repl**：移除已弃用的 repl.turnOffEditorMode() 函数（Ruben Bridgewater）[#33286](https://github.com/nodejs/node/pull/33286)
* \[[`a1bcad8dc0`](https://github.com/nodejs/node/commit/a1bcad8dc0)] - **(SEMVER-MAJOR)** **repl**：移除已弃用的 repl.parseREPLKeyword() 函数（Ruben Bridgewater）[#33286](https://github.com/nodejs/node/pull/33286)
* \[[`4ace010b53`](https://github.com/nodejs/node/commit/4ace010b53)] - **(SEMVER-MAJOR)** **repl**：移除已弃用的 bufferedCommand 属性（Ruben Bridgewater）[#33286](https://github.com/nodejs/node/pull/33286)
* \[[`37524307fe`](https://github.com/nodejs/node/commit/37524307fe)] - **(SEMVER-MAJOR)** **repl**：移除已弃用的 .rli（Ruben Bridgewater）[#33286](https://github.com/nodejs/node/pull/33286)
* \[[`a85ce885bd`](https://github.com/nodejs/node/commit/a85ce885bd)] - **(SEMVER-MAJOR)** **src**：移除已弃用的 node debug 命令（James M Snell）[#33648](https://github.com/nodejs/node/pull/33648)
* \[[`a8904e8eee`](https://github.com/nodejs/node/commit/a8904e8eee)] - **(SEMVER-MAJOR)** **timers**：引入 timers/promises（James M Snell）[#33950](https://github.com/nodejs/node/pull/33950)
* \[[`1211b9a72f`](https://github.com/nodejs/node/commit/1211b9a72f)] - **(SEMVER-MAJOR)** **util**：将 `maxStringLength` 的默认值改为 10000（unknown）[#32744](https://github.com/nodejs/node/pull/32744)
* \[[`ca8f3ef2e5`](https://github.com/nodejs/node/commit/ca8f3ef2e5)] - **(SEMVER-MAJOR)** **wasi**：取消 --experimental-wasm-bigint 要求（Colin Ihrig）[#35415](https://github.com/nodejs/node/pull/35415)

#### npm 7 - [#35631](https://github.com/nodejs/node/pull/35631)

Node.js 15 附带 npm 的一个新主版本 npm 7。npm 7 带来了许多新特性——包括 npm workspaces 和新的 package-lock.json 格式。npm 7 还包括 yarn.lock 文件支持。npm 7 的一个重大变化是现在默认安装 peer dependencies。

#### 未处理拒绝抛出错误 - [#33021](https://github.com/nodejs/node/pull/33021)

从 Node.js 15 开始，`unhandledRejection` 的默认模式从 `warn` 改为 `throw`。在 `throw` 模式下，如果没有设置 `unhandledRejection` 钩子，`unhandledRejection` 将作为未捕获异常抛出。已设置 `unhandledRejection` 钩子的用户应不会看到行为变化，并且仍然可以使用 `--unhandled-rejections=mode` 进程标志切换模式。

#### QUIC - [#32379](https://github.com/nodejs/node/pull/32379)

Node.js 15 提供了对 [QUIC](https://en.wikipedia.org/wiki/QUIC) 的实验性支持，可通过使用 `--experimental-quic` 配置标志编译 Node.js 来启用。Node.js 的 QUIC 实现在核心 `net` 模块中暴露。

#### V8 8.6 - [#35415](https://github.com/nodejs/node/pull/35415)

V8 JavaScript 引擎已更新到 V8 8.6（Node.js 14 中最新可用的是 V8 8.4）。除了性能调整和改进之外，V8 更新还带来了以下语言特性：

* `Promise.any()`（来自 V8 8.5）
* `AggregateError`（来自 V8 8.5）
* `String.prototype.replaceAll()`（来自 V8 8.5）
* 逻辑赋值运算符 `&&=`、`||=` 和 `??=`（来自 V8 8.5）

#### 其他重要变更

* \[[`50228cf6ff`](https://github.com/nodejs/node/commit/50228cf6ff)] - **(SEMVER-MAJOR)** **assert**：添加 `assert/strict` 别名模块（ExE Boss）[#34001](https://github.com/nodejs/node/pull/34001)
* \[[`039cd00a9a`](https://github.com/nodejs/node/commit/039cd00a9a)] - **(SEMVER-MAJOR)** **dns**：添加 dns/promises 别名（shisama）[#32953](https://github.com/nodejs/node/pull/32953)
* \[[`54b36e401d`](https://github.com/nodejs/node/commit/54b36e401d)] - **(SEMVER-MAJOR)** **fs**：使用 stream.construct 重新实现读写流（Robert Nagy）[#29656](https://github.com/nodejs/node/pull/29656)
* \[[`f5c0e282cc`](https://github.com/nodejs/node/commit/f5c0e282cc)] - **(SEMVER-MAJOR)** **http2**：允许 HTTP/2 请求中的 Host（Alba Mendez）[#34664](https://github.com/nodejs/node/pull/34664)
* \[[`eee522ac29`](https://github.com/nodejs/node/commit/eee522ac29)] - **(SEMVER-MAJOR)** **lib**：添加与 EventTarget 相关的浏览器全局对象（Anna Henningsen）[#35496](https://github.com/nodejs/node/pull/35496)
* \[[`a8b26d72c5`](https://github.com/nodejs/node/commit/a8b26d72c5)] - **(SEMVER-MAJOR)** **lib**：取消 AbortController 标记（James M Snell）[#33527](https://github.com/nodejs/node/pull/33527)
* \[[`74ca960aac`](https://github.com/nodejs/node/commit/74ca960aac)] - **(SEMVER-MAJOR)** **lib**：AbortController 的初始实验性实现（James M Snell）[#33527](https://github.com/nodejs/node/pull/33527)
* \[[`efefdd668d`](https://github.com/nodejs/node/commit/efefdd668d)] - **(SEMVER-MAJOR)** **net**：对 Socket 启用 autoDestroy（Robert Nagy）[#31806](https://github.com/nodejs/node/pull/31806)
* \[[`0fb91acedf`](https://github.com/nodejs/node/commit/0fb91acedf)] - **(SEMVER-MAJOR)** **src**：禁止在 FreeEnvironment 内执行 JS（Anna Henningsen）[#33874](https://github.com/nodejs/node/pull/33874)
* \[[`21782277c2`](https://github.com/nodejs/node/commit/21782277c2)] - **(SEMVER-MAJOR)** **src**：使用 node:moduleName 作为内置模块文件名（Michaël Zasso）[#35498](https://github.com/nodejs/node/pull/35498)
* \[[`fb8cc72e73`](https://github.com/nodejs/node/commit/fb8cc72e73)] - **(SEMVER-MAJOR)** **stream**：construct（Robert Nagy）[#29656](https://github.com/nodejs/node/pull/29656)
* \[[`705d888387`](https://github.com/nodejs/node/commit/705d888387)] - **(SEMVER-MAJOR)** **worker**：使 MessageEvent 类更符合 Web 兼容性（Anna Henningsen）[#35496](https://github.com/nodejs/node/pull/35496)

### Semver-Major Commits

* \[[`50228cf6ff`](https://github.com/nodejs/node/commit/50228cf6ff)] - **(SEMVER-MAJOR)** **assert**：添加 `assert/strict` 别名模块（ExE Boss）[#34001](https://github.com/nodejs/node/pull/34001)
* \[[`d701247165`](https://github.com/nodejs/node/commit/d701247165)] - **(SEMVER-MAJOR)** **build**：将 embedder 字符串重置为 "-node.0"（Michaël Zasso）[#35415](https://github.com/nodejs/node/pull/35415)
* \[[`a11788736a`](https://github.com/nodejs/node/commit/a11788736a)] - **(SEMVER-MAJOR)** **build**：移除 --build-v8-with-gn 配置选项（Yang Guo）[#27576](https://github.com/nodejs/node/pull/27576)
* \[[`89428c7a2d`](https://github.com/nodejs/node/commit/89428c7a2d)] - **(SEMVER-MAJOR)** **build**：停止支持 VS2017（Michaël Zasso）[#33694](https://github.com/nodejs/node/pull/33694)
* \[[`dae283d96f`](https://github.com/nodejs/node/commit/dae283d96f)] - **(SEMVER-MAJOR)** **crypto**：重构内部实现，添加 WebCrypto（James M Snell）[#35093](https://github.com/nodejs/node/pull/35093)
* \[[`ba77dc8597`](https://github.com/nodejs/node/commit/ba77dc8597)] - **(SEMVER-MAJOR)** **crypto**：将 node_crypto 文件移动到 src/crypto（James M Snell）[#35093](https://github.com/nodejs/node/pull/35093)
* \[[`9378070da0`](https://github.com/nodejs/node/commit/9378070da0)] - **(SEMVER-MAJOR)** **deps**：V8：cherry-pick d76abfed3512（Michaël Zasso）[#35415](https://github.com/nodejs/node/pull/35415)
* \[[`efee8341ad`](https://github.com/nodejs/node/commit/efee8341ad)] - **(SEMVER-MAJOR)** **deps**：V8：cherry-pick 717543bbf0ef（Michaël Zasso）[#35415](https://github.com/nodejs/node/pull/35415)
* \[[`b006fa8730`](https://github.com/nodejs/node/commit/b006fa8730)] - **(SEMVER-MAJOR)** **deps**：V8：cherry-pick 6be2f6e26e8d（Michaël Zasso）[#35415](https://github.com/nodejs/node/pull/35415)
* \[[`3c23af4cb7`](https://github.com/nodejs/node/commit/3c23af4cb7)] - **(SEMVER-MAJOR)** **deps**：修复 V8 内联方法的构建问题（Jiawen Geng）[#35415](https://github.com/nodejs/node/pull/35415)
* \[[`b803b3f48b`](https://github.com/nodejs/node/commit/b803b3f48b)] - **(SEMVER-MAJOR)** **deps**：修复 ARM64 的 platform-embedded-file-writer-win（Michaël Zasso）[#35415](https://github.com/nodejs/node/pull/35415)
* \[[`47cb9f14e8`](https://github.com/nodejs/node/commit/47cb9f14e8)] - **(SEMVER-MAJOR)** **deps**：更新 V8 事后元数据脚本（Colin Ihrig）[#35415](https://github.com/nodejs/node/pull/35415)
* \[[`a1d639ba5d`](https://github.com/nodejs/node/commit/a1d639ba5d)] - **(SEMVER-MAJOR)** **deps**：将 V8 更新到 8.6.395（Michaël Zasso）[#35415](https://github.com/nodejs/node/pull/35415)
* \[[`3ddcad55fb`](https://github.com/nodejs/node/commit/3ddcad55fb)] - **(SEMVER-MAJOR)** **deps**：将 npm 升级到 7.0.0（Myles Borins）[#35631](https://github.com/nodejs/node/pull/35631)
* \[[`2e54524955`](https://github.com/nodejs/node/commit/2e54524955)] - **(SEMVER-MAJOR)** **deps**：将 npm 更新到 7.0.0-rc.3（Myles Borins）[#35474](https://github.com/nodejs/node/pull/35474)
* \[[`e983b1cece`](https://github.com/nodejs/node/commit/e983b1cece)] - **(SEMVER-MAJOR)** **deps**：V8：cherry-pick 0d6debcc5f08（Gus Caplan）[#33600](https://github.com/nodejs/node/pull/33600)
* \[[`039cd00a9a`](https://github.com/nodejs/node/commit/039cd00a9a)] - **(SEMVER-MAJOR)** **dns**：添加 dns/promises 别名（shisama）[#32953](https://github.com/nodejs/node/pull/32953)
* \[[`c25cf34ac1`](https://github.com/nodejs/node/commit/c25cf34ac1)] - **(SEMVER-MAJOR)** **doc**：将 DEP0018 移至生命周期结束（Rich Trott）[#35316](https://github.com/nodejs/node/pull/35316)
* \[[`8bf37ee496`](https://github.com/nodejs/node/commit/8bf37ee496)] - **(SEMVER-MAJOR)** **doc**：更新 15.x 支持的 macos 版本（Ash Cripps）[#35022](https://github.com/nodejs/node/pull/35022)
* \[[`2002d90abd`](https://github.com/nodejs/node/commit/2002d90abd)] - **(SEMVER-MAJOR)** **fs**：递归 rmdir 时发出弃用警告（Ian Sutherland）[#35562](https://github.com/nodejs/node/pull/35562)
* \[[`54b36e401d`](https://github.com/nodejs/node/commit/54b36e401d)] - **(SEMVER-MAJOR)** **fs**：使用 stream.construct 重新实现读写流（Robert Nagy）[#29656](https://github.com/nodejs/node/pull/29656)
* \[[`32b641e528`](https://github.com/nodejs/node/commit/32b641e528)] - **(SEMVER-MAJOR)** **http**：修复 socket.setEncoding 致命错误（iskore）[#33405](https://github.com/nodejs/node/pull/33405)
* \[[`8a6fab02ad`](https://github.com/nodejs/node/commit/8a6fab02ad)] - **(SEMVER-MAJOR)** **http**：在中止的服务器请求上发出 'error'（Robert Nagy）[#33172](https://github.com/nodejs/node/pull/33172)
* \[[`d005f490a8`](https://github.com/nodejs/node/commit/d005f490a8)] - **(SEMVER-MAJOR)** **http**：清理 end 参数处理（Robert Nagy）[#31818](https://github.com/nodejs/node/pull/31818)
* \[[`f5c0e282cc`](https://github.com/nodejs/node/commit/f5c0e282cc)] - **(SEMVER-MAJOR)** **http2**：允许 HTTP/2 请求中的 Host（Alba Mendez）[#34664](https://github.com/nodejs/node/pull/34664)
* \[[`1e4187fcf4`](https://github.com/nodejs/node/commit/1e4187fcf4)] - **(SEMVER-MAJOR)** **http2**：添加 `invalidheaders` 测试（Pranshu Srivastava）[#33161](https://github.com/nodejs/node/pull/33161)
* \[[`d79c330186`](https://github.com/nodejs/node/commit/d79c330186)] - **(SEMVER-MAJOR)** **http2**：重构 http2Stream 类的状态代码校验（rickyes）[#33535](https://github.com/nodejs/node/pull/33535)
* \[[`df31f71f1e`](https://github.com/nodejs/node/commit/df31f71f1e)] - **(SEMVER-MAJOR)** **http2**：检查头字段有效性（Pranshu Srivastava）[#33193](https://github.com/nodejs/node/pull/33193)
* \[[`1428db8a1f`](https://github.com/nodejs/node/commit/1428db8a1f)] - **(SEMVER-MAJOR)** **lib**：重构 Socket._getpeername 和 Socket._getsockname（himself65）[#32969](https://github.com/nodejs/node/pull/32969)
* \[[`eee522ac29`](https://github.com/nodejs/node/commit/eee522ac29)] - **(SEMVER-MAJOR)** **lib**：添加与 EventTarget 相关的浏览器全局对象（Anna Henningsen）[#35496](https://github.com/nodejs/node/pull/35496)
* \[[`c66e6471e7`](https://github.com/nodejs/node/commit/c66e6471e7)] - **(SEMVER-MAJOR)** **lib**：移除 ERR_INVALID_OPT_VALUE 和 ERR_INVALID_OPT_VALUE_ENCODING（Denys Otrishko）[#34682](https://github.com/nodejs/node/pull/34682)
* \[[`b546a2b469`](https://github.com/nodejs/node/commit/b546a2b469)] - **(SEMVER-MAJOR)** **lib**：在 ERR_MISSING_ARGS 中处理仅一个参数的情况（Denys Otrishko）[#34022](https://github.com/nodejs/node/pull/34022)
* \[[`a86a295fd7`](https://github.com/nodejs/node/commit/a86a295fd7)] - **(SEMVER-MAJOR)** **lib**：从带 code 的错误原型中移除 NodeError（Michaël Zasso）[#33857](https://github.com/nodejs/node/pull/33857)
* \[[`a8b26d72c5`](https://github.com/nodejs/node/commit/a8b26d72c5)] - **(SEMVER-MAJOR)** **lib**：取消 AbortController 标记（James M Snell）[#33527](https://github.com/nodejs/node/pull/33527)
* \[[`74ca960aac`](https://github.com/nodejs/node/commit/74ca960aac)] - **(SEMVER-MAJOR)** **lib**：AbortController 的初始实验性实现（James M Snell）[#33527](https://github.com/nodejs/node/pull/33527)
* \[[`78ca61e2cf`](https://github.com/nodejs/node/commit/78ca61e2cf)] - **(SEMVER-MAJOR)** **net**：检查 net.connect() 和 socket.connect() 调用中的参数（Denys Otrishko）[#34022](https://github.com/nodejs/node/pull/34022)
* \[[`41796ebd30`](https://github.com/nodejs/node/commit/41796ebd30)] - **(SEMVER-MAJOR)** **net**：移除长期弃用的 server.connections 属性（James M Snell）[#33647](https://github.com/nodejs/node/pull/33647)
* \[[`efefdd668d`](https://github.com/nodejs/node/commit/efefdd668d)] - **(SEMVER-MAJOR)** **net**：对 Socket 启用 autoDestroy（Robert Nagy）[#31806](https://github.com/nodejs/node/pull/31806)
* \[[`6cfba9f7f6`](https://github.com/nodejs/node/commit/6cfba9f7f6)] - **(SEMVER-MAJOR)** **process**：更新 v8 fast api 调用的使用（Maya Lekova）[#35415](https://github.com/nodejs/node/pull/35415)
* \[[`3b10f7f933`](https://github.com/nodejs/node/commit/3b10f7f933)] - **(SEMVER-MAJOR)** **process**：将默认值改为 --unhandled-rejections=throw（Dan Fabulich）[#33021](https://github.com/nodejs/node/pull/33021)
* \[[`d8eef83757`](https://github.com/nodejs/node/commit/d8eef83757)] - **(SEMVER-MAJOR)** **process**：对 hrtime 使用 v8 fast api 调用（Gus Caplan）[#33600](https://github.com/nodejs/node/pull/33600)
* \[[`49745cdef0`](https://github.com/nodejs/node/commit/49745cdef0)] - **(SEMVER-MAJOR)** **process**：使用 `throwDeprecation` 延迟抛出错误（Ruben Bridgewater）[#32312](https://github.com/nodejs/node/pull/32312)
* \[[`a416692e93`](https://github.com/nodejs/node/commit/a416692e93)] - **(SEMVER-MAJOR)** **repl**：移除已弃用的 repl.memory 函数（Ruben Bridgewater）[#33286](https://github.com/nodejs/node/pull/33286)
* \[[`f217b2dfb0`](https://github.com/nodejs/node/commit/f217b2dfb0)] - **(SEMVER-MAJOR)** **repl**：移除已弃用的 repl.turnOffEditorMode() 函数（Ruben Bridgewater）[#33286](https://github.com/nodejs/node/pull/33286)
* \[[`a1bcad8dc0`](https://github.com/nodejs/node/commit/a1bcad8dc0)] - **(SEMVER-MAJOR)** **repl**：移除已弃用的 repl.parseREPLKeyword() 函数（Ruben Bridgewater）[#33286](https://github.com/nodejs/node/pull/33286)
* \[[`4ace010b53`](https://github.com/nodejs/node/commit/4ace010b53)] - **(SEMVER-MAJOR)** **repl**：移除已弃用的 bufferedCommand 属性（Ruben Bridgewater）[#33286](https://github.com/nodejs/node/pull/33286)
* \[[`37524307fe`](https://github.com/nodejs/node/commit/37524307fe)] - **(SEMVER-MAJOR)** **repl**：移除已弃用的 .rli（Ruben Bridgewater）[#33286](https://github.com/nodejs/node/pull/33286)
* \[[`b65e5aeaa7`](https://github.com/nodejs/node/commit/b65e5aeaa7)] - **(SEMVER-MAJOR)** **src**：实现 NodePlatform::PostJob（Clemens Backes）[#35415](https://github.com/nodejs/node/pull/35415)
* \[[`b1e8e0e604`](https://github.com/nodejs/node/commit/b1e8e0e604)] - **(SEMVER-MAJOR)** **src**：将 NODE_MODULE_VERSION 更新为 88（Michaël Zasso）[#35415](https://github.com/nodejs/node/pull/35415)
* \[[`eeb6b473fd`](https://github.com/nodejs/node/commit/eeb6b473fd)] - **(SEMVER-MAJOR)** **src**：CPUUsage 的错误报告（Yash Ladha）[#34762](https://github.com/nodejs/node/pull/34762)
* \[[`21782277c2`](https://github.com/nodejs/node/commit/21782277c2)] - **(SEMVER-MAJOR)** **src**：使用 node:moduleName 作为内置模块文件名（Michaël Zasso）[#35498](https://github.com/nodejs/node/pull/35498)
* \[[`05771279af`](https://github.com/nodejs/node/commit/05771279af)] - **(SEMVER-MAJOR)** **src**：在 windows 上启用 wasm trap handler（Gus Caplan）[#35033](https://github.com/nodejs/node/pull/35033)
* \[[`b7cf823410`](https://github.com/nodejs/node/commit/b7cf823410)] - **(SEMVER-MAJOR)** **src**：将 NODE_MODULE_VERSION 更新为 86（Michaël Zasso）[#33579](https://github.com/nodejs/node/pull/33579)
* \[[`0fb91acedf`](https://github.com/nodejs/node/commit/0fb91acedf)] - **(SEMVER-MAJOR)** **src**：禁止在 FreeEnvironment 内执行 JS（Anna Henningsen）[#33874](https://github.com/nodejs/node/pull/33874)
* \[[`53fb2b6b41`](https://github.com/nodejs/node/commit/53fb2b6b41)] - **(SEMVER-MAJOR)** **src**：移除 _third_party_main 支持（Anna Henningsen）[#33971](https://github.com/nodejs/node/pull/33971)
* \[[`a85ce885bd`](https://github.com/nodejs/node/commit/a85ce885bd)] - **(SEMVER-MAJOR)** **src**：移除已弃用的 node debug 命令（James M Snell）[#33648](https://github.com/nodejs/node/pull/33648)
* \[[`ac3714637e`](https://github.com/nodejs/node/commit/ac3714637e)] - **(SEMVER-MAJOR)** **src**：移除未使用的 CancelPendingDelayedTasks（Anna Henningsen）[#32859](https://github.com/nodejs/node/pull/32859)
* \[[`a65218f5e8`](https://github.com/nodejs/node/commit/a65218f5e8)] - **(SEMVER-MAJOR)** **stream**：尝试在 'finish' 之前等待 flush 完成（Robert Nagy）[#34314](https://github.com/nodejs/node/pull/34314)
* \[[`4e3f6f355b`](https://github.com/nodejs/node/commit/4e3f6f355b)] - **(SEMVER-MAJOR)** **stream**：清理并修复 Readable.wrap（Robert Nagy）[#34204](https://github.com/nodejs/node/pull/34204)
* \[[`527e2147af`](https://github.com/nodejs/node/commit/527e2147af)] - **(SEMVER-MAJOR)** **stream**：为工具函数添加 promises 版本（rickyes）[#33991](https://github.com/nodejs/node/pull/33991)
* \[[`c7e55c6b72`](https://github.com/nodejs/node/commit/c7e55c6b72)] - **(SEMVER-MAJOR)** **stream**：修复 writable.end 回调行为（Robert Nagy）[#34101](https://github.com/nodejs/node/pull/34101)
* \[[`fb8cc72e73`](https://github.com/nodejs/node/commit/fb8cc72e73)] - **(SEMVER-MAJOR)** **stream**：construct（Robert Nagy）[#29656](https://github.com/nodejs/node/pull/29656)
* \[[`4bc7025309`](https://github.com/nodejs/node/commit/4bc7025309)] - **(SEMVER-MAJOR)** **stream**：write 在未知编码时应抛出错误（Robert Nagy）[#33075](https://github.com/nodejs/node/pull/33075)
* \[[`ea87809bb6`](https://github.com/nodejs/node/commit/ea87809bb6)] - **(SEMVER-MAJOR)** **stream**：修复 _final 和 'prefinish' 的时序（Robert Nagy）[#32780](https://github.com/nodejs/node/pull/32780)
* \[[`0bd5595509`](https://github.com/nodejs/node/commit/0bd5595509)] - **(SEMVER-MAJOR)** **stream**：简化 Transform 流实现（Robert Nagy）[#32763](https://github.com/nodejs/node/pull/32763)
* \[[`8f86986985`](https://github.com/nodejs/node/commit/8f86986985)] - **(SEMVER-MAJOR)** **stream**：使用回调正确传播错误（Robert Nagy）[#29179](https://github.com/nodejs/node/pull/29179)
* \[[`94dd7b9f94`](https://github.com/nodejs/node/commit/94dd7b9f94)] - **(SEMVER-MAJOR)** **test**：在将 typed array 大小增加到 4GB 后更新测试（Kim-Anh Tran）[#35415](https://github.com/nodejs/node/pull/35415)
* \[[`d9e98df01b`](https://github.com/nodejs/node/commit/d9e98df01b)] - **(SEMVER-MAJOR)** **test**：修复 npm 7.0.0 的测试（Myles Borins）[#35631](https://github.com/nodejs/node/pull/35631)
* \[[`c87641aa97`](https://github.com/nodejs/node/commit/c87641aa97)] - **(SEMVER-MAJOR)** **test**：修复测试套件以适配 npm 7（Myles Borins）[#35474](https://github.com/nodejs/node/pull/35474)
* \[[`eb9d7a437e`](https://github.com/nodejs/node/commit/eb9d7a437e)] - **(SEMVER-MAJOR)** **test**：更新 WPT 运行器和测试（Michaël Zasso）[#33770](https://github.com/nodejs/node/pull/33770)
* \[[`a8904e8eee`](https://github.com/nodejs/node/commit/a8904e8eee)] - **(SEMVER-MAJOR)** **timers**：引入 timers/promises（James M Snell）[#33950](https://github.com/nodejs/node/pull/33950)
* \[[`c55f661551`](https://github.com/nodejs/node/commit/c55f661551)] - **(SEMVER-MAJOR)** **tools**：禁用 V8 中的 x86 安全异常处理程序（Michaël Zasso）[#35415](https://github.com/nodejs/node/pull/35415)
* \[[`80e8aec4a5`](https://github.com/nodejs/node/commit/80e8aec4a5)] - **(SEMVER-MAJOR)** **tools**：更新 V8 8.6 的 gypfiles（Ujjwal Sharma）[#35415](https://github.com/nodejs/node/pull/35415)
* \[[`faeb9607c6`](https://github.com/nodejs/node/commit/faeb9607c6)] - **(SEMVER-MAJOR)** **tools**：更新 V8 8.5 的 gypfiles（Ujjwal Sharma）[#35415](https://github.com/nodejs/node/pull/35415)
* \[[`bb62f4ad9e`](https://github.com/nodejs/node/commit/bb62f4ad9e)] - **(SEMVER-MAJOR)** **url**：file URL 路径规范化（Daijiro Wachi）[#35477](https://github.com/nodejs/node/pull/35477)
* \[[`69ef4c2375`](https://github.com/nodejs/node/commit/69ef4c2375)] - **(SEMVER-MAJOR)** **url**：验证 "ToASCII" 后域名不为空（Michaël Zasso）[#33770](https://github.com/nodejs/node/pull/33770)
* \[[`4831278a16`](https://github.com/nodejs/node/commit/4831278a16)] - **(SEMVER-MAJOR)** **url**：移除 fragment 状态中的 U+0000 情况（Michaël Zasso）[#33770](https://github.com/nodejs/node/pull/33770)
* \[[`0d08d5ae7c`](https://github.com/nodejs/node/commit/0d08d5ae7c)] - **(SEMVER-MAJOR)** **url**：从特殊方案中移除 gopher（Michaël Zasso）[#33325](https://github.com/nodejs/node/pull/33325)
* \[[`9be51ee9a1`](https://github.com/nodejs/node/commit/9be51ee9a1)] - **(SEMVER-MAJOR)** **url**：禁止在 url host code point 中使用 lt 和 gt（Yash Ladha）[#33328](https://github.com/nodejs/node/pull/33328)
* \[[`1211b9a72f`](https://github.com/nodejs/node/commit/1211b9a72f)] - **(SEMVER-MAJOR)** **util**：将 `maxStringLength` 的默认值改为 10000（unknown）[#32744](https://github.com/nodejs/node/pull/32744)
* \[[`ca8f3ef2e5`](https://github.com/nodejs/node/commit/ca8f3ef2e5)] - **(SEMVER-MAJOR)** **wasi**：取消 --experimental-wasm-bigint 要求（Colin Ihrig）[#35415](https://github.com/nodejs/node/pull/35415)
* \[[`abd8cdfc4e`](https://github.com/nodejs/node/commit/abd8cdfc4e)] - **(SEMVER-MAJOR)** **win, child_process**：清理环境变量（Bartosz Sosnowski）[#35210](https://github.com/nodejs/node/pull/35210)
* \[[`705d888387`](https://github.com/nodejs/node/commit/705d888387)] - **(SEMVER-MAJOR)** **worker**：使 MessageEvent 类更符合 Web 兼容性（Anna Henningsen）[#35496](https://github.com/nodejs/node/pull/35496)
* \[[`7603c7e50c`](https://github.com/nodejs/node/commit/7603c7e50c)] - **(SEMVER-MAJOR)** **worker**：默认将 trackUnmanagedFds 设为 true（Anna Henningsen）[#34394](https://github.com/nodejs/node/pull/34394)
* \[[`5ef5116311`](https://github.com/nodejs/node/commit/5ef5116311)] - **(SEMVER-MAJOR)** **worker**：重命名错误代码以更准确（Anna Henningsen）[#33872](https://github.com/nodejs/node/pull/33872)

### Semver-Minor Commits

* \[[`1d5fa88eb8`](https://github.com/nodejs/node/commit/1d5fa88eb8)] - **(SEMVER-MINOR)** **cli**：添加 --node-memory-debug 选项（Anna Henningsen）[#35537](https://github.com/nodejs/node/pull/35537)
* \[[`095be6a01f`](https://github.com/nodejs/node/commit/095be6a01f)] - **(SEMVER-MINOR)** **crypto**：添加 getCipherInfo 方法（James M Snell）[#35368](https://github.com/nodejs/node/pull/35368)
* \[[`df1023bb22`](https://github.com/nodejs/node/commit/df1023bb22)] - **(SEMVER-MINOR)** **events**：允许在 on 中使用 AbortController（James M Snell）[#34912](https://github.com/nodejs/node/pull/34912)
* \[[`883fc779b6`](https://github.com/nodejs/node/commit/883fc779b6)] - **(SEMVER-MINOR)** **events**：允许在 once 中使用 AbortController（James M Snell）[#34911](https://github.com/nodejs/node/pull/34911)
* \[[`e876c0c308`](https://github.com/nodejs/node/commit/e876c0c308)] - **(SEMVER-MINOR)** **http2**：添加对敏感头部的支持（Anna Henningsen）[#34145](https://github.com/nodejs/node/pull/34145)
* \[[`6f34498148`](https://github.com/nodejs/node/commit/6f34498148)] - **(SEMVER-MINOR)** **net**：添加对解析 DNS CAA 记录的支持（Danny Sonnenschein）[#35466](https://github.com/nodejs/node/pull/35466)
* \[[`37a8179673`](https://github.com/nodejs/node/commit/37a8179673)] - **(SEMVER-MINOR)** **net**：使 blocklist family 不区分大小写（James M Snell）[#34864](https://github.com/nodejs/node/pull/34864)
* \[[`1f9b20b637`](https://github.com/nodejs/node/commit/1f9b20b637)] - **(SEMVER-MINOR)** **net**：引入 net.BlockList（James M Snell）[#34625](https://github.com/nodejs/node/pull/34625)
* \[[`278d38f4cf`](https://github.com/nodejs/node/commit/278d38f4cf)] - **(SEMVER-MINOR)** **src**：添加 EmitExit 和 EmitBeforeExit 的 maybe 版本（Anna Henningsen）[#35486](https://github.com/nodejs/node/pull/35486)
* \[[`2310f679a1`](https://github.com/nodejs/node/commit/2310f679a1)] - **(SEMVER-MINOR)** **src**：将 node_binding 移至现代 THROW_ERR*（James M Snell）[#35469](https://github.com/nodejs/node/pull/35469)
* \[[`744a284ccc`](https://github.com/nodejs/node/commit/744a284ccc)] - **(SEMVER-MINOR)** **stream**：为 stream impl 函数支持 async（James M Snell）[#34416](https://github.com/nodejs/node/pull/34416)
* \[[`bfbdc84738`](https://github.com/nodejs/node/commit/bfbdc84738)] - **(SEMVER-MINOR)** **timers**：允许取消 promisified 的 timeouts/immediates（James M Snell）[#33833](https://github.com/nodejs/node/pull/33833)
* \[[`a8971f87d3`](https://github.com/nodejs/node/commit/a8971f87d3)] - **(SEMVER-MINOR)** **url**：支持非特殊 URL（Daijiro Wachi）[#34925](https://github.com/nodejs/node/pull/34925)

### Semver-Patch Commits

* \[[`d10c59fc60`](https://github.com/nodejs/node/commit/d10c59fc60)] - **benchmark,test**: 移除 readable-async-iterator benchmark 的输出 (Rich Trott) [#34411](https://github.com/nodejs/node/pull/34411)
* \[[`8a12e9994f`](https://github.com/nodejs/node/commit/8a12e9994f)] - **bootstrap**: 使用文件 URL 代替相对 URL (Daijiro Wachi) [#35622](https://github.com/nodejs/node/pull/35622)
* \[[`f8bde7ce06`](https://github.com/nodejs/node/commit/f8bde7ce06)] - **bootstrap**: 在预执行阶段构建快速 API (Joyee Cheung) [#32984](https://github.com/nodejs/node/pull/32984)
* \[[`b18651bcd2`](https://github.com/nodejs/node/commit/b18651bcd2)] - **build**: 不要将 mode 选项传递给 test-v8 命令 (Michaël Zasso) [#35705](https://github.com/nodejs/node/pull/35705)
* \[[`bb2945ed6b`](https://github.com/nodejs/node/commit/bb2945ed6b)] - **build**: 为代码覆盖率添加 GitHub Action (Benjamin Coe) [#35653](https://github.com/nodejs/node/pull/35653)
* \[[`cfbbeea4a1`](https://github.com/nodejs/node/commit/cfbbeea4a1)] - **build**: 使用 GITHUB\_ENV 文件设置环境变量 (Michaël Zasso) [#35638](https://github.com/nodejs/node/pull/35638)
* \[[`8a93b371a3`](https://github.com/nodejs/node/commit/8a93b371a3)] - **build**: 不要在工作流中安装 jq (Michaël Zasso) [#35638](https://github.com/nodejs/node/pull/35638)
* \[[`ccbd1d5efa`](https://github.com/nodejs/node/commit/ccbd1d5efa)] - **build**: 在 github action 中添加 quic (gengjiawen) [#34336](https://github.com/nodejs/node/pull/34336)
* \[[`f4f191bbc2`](https://github.com/nodejs/node/commit/f4f191bbc2)] - **build**: 在 mkcodecache 和 node\_mksnapshot 中定义 NODE\_EXPERIMENTAL\_QUIC (Joyee Cheung) [#34454](https://github.com/nodejs/node/pull/34454)
* \[[`5b2c263ba8`](https://github.com/nodejs/node/commit/5b2c263ba8)] - **deps**: 修复 zlib.gyp 中会破坏 arm-fpu-neon 构建的拼写错误 (lucasg) [#35659](https://github.com/nodejs/node/pull/35659)
* \[[`5b9593f727`](https://github.com/nodejs/node/commit/5b9593f727)] - **deps**: 将 npm 升级到 7.0.2 (Myles Borins) [#35667](https://github.com/nodejs/node/pull/35667)
* \[[`dabc6ddddc`](https://github.com/nodejs/node/commit/dabc6ddddc)] - **deps**: 将 npm 升级到 7.0.0-rc.4 (Myles Borins) [#35576](https://github.com/nodejs/node/pull/35576)
* \[[`757bac6711`](https://github.com/nodejs/node/commit/757bac6711)] - **deps**: 更新 nghttp3 (James M Snell) [#34752](https://github.com/nodejs/node/pull/34752)
* \[[`c788be2e6e`](https://github.com/nodejs/node/commit/c788be2e6e)] - **deps**: 更新 ngtcp2 (James M Snell) [#34752](https://github.com/nodejs/node/pull/34752)
* \[[`7816e5f7b9`](https://github.com/nodejs/node/commit/7816e5f7b9)] - **deps**: 修复 ngtcp2.gyp 中 sources 的缩进 (James M Snell) [#34033](https://github.com/nodejs/node/pull/34033)
* \[[`f5343d1b40`](https://github.com/nodejs/node/commit/f5343d1b40)] - **deps**: 重新启用 OPENSSL\_NO\_QUIC 保护条件 (James M Snell) [#34033](https://github.com/nodejs/node/pull/34033)
* \[[`9de95f494e`](https://github.com/nodejs/node/commit/9de95f494e)] - **deps**: 临时修复 ngtcp2 以便在 windows 上构建 (James M Snell) [#34033](https://github.com/nodejs/node/pull/34033)
* \[[`ec7ad1d0ec`](https://github.com/nodejs/node/commit/ec7ad1d0ec)] - **deps**: cherry-pick akamai/openssl/commit/bf4b08ecfbb7a26ca4b0b9ecaee3b31d18d7bda9 (Tatsuhiro Tsujikawa) [#34033](https://github.com/nodejs/node/pull/34033)
* \[[`c3d85b7637`](https://github.com/nodejs/node/commit/c3d85b7637)] - **deps**: cherry-pick akamai/openssl/commit/a5a08cb8050bb69120e833456e355f482e392456 (Benjamin Kaduk) [#34033](https://github.com/nodejs/node/pull/34033)
* \[[`bad1a150ea`](https://github.com/nodejs/node/commit/bad1a150ea)] - **deps**: cherry-pick akamai/openssl/commit/d5a13ca6e29f3ff85c731770ab0ee2f2487bf8b3 (Benjamin Kaduk) [#34033](https://github.com/nodejs/node/pull/34033)
* \[[`74cbfd3f36`](https://github.com/nodejs/node/commit/74cbfd3f36)] - **deps**: cherry-pick akamai/openssl/commit/a6282c566d88db11300c82abc3c84a4e2e9ea568 (Benjamin Kaduk) [#34033](https://github.com/nodejs/node/pull/34033)
* \[[`8a9763a8ea`](https://github.com/nodejs/node/commit/8a9763a8ea)] - **deps**: 更新 nghttp3 (James M Snell) [#34033](https://github.com/nodejs/node/pull/34033)
* \[[`6b27d07779`](https://github.com/nodejs/node/commit/6b27d07779)] - **deps**: 更新 ngtcp2 (James M Snell) [#34033](https://github.com/nodejs/node/pull/34033)
* \[[`a041723774`](https://github.com/nodejs/node/commit/a041723774)] - **deps**: 修复 nghttp3.gyp 中 sources 的缩进 (Daniel Bevenius) [#33942](https://github.com/nodejs/node/pull/33942)
* \[[`a0cbd676e7`](https://github.com/nodejs/node/commit/a0cbd676e7)] - **deps**: 为 nghttp3/ngtcp2 gyp 配置添加定义 (Daniel Bevenius) [#33942](https://github.com/nodejs/node/pull/33942)
* \[[`bccb514936`](https://github.com/nodejs/node/commit/bccb514936)] - **deps**: 维护 ngtcp2 和 nghttp3 (James M Snell) [#32379](https://github.com/nodejs/node/pull/32379)
* \[[`834fa8f23f`](https://github.com/nodejs/node/commit/834fa8f23f)] - **deps**: 添加 ngtcp2 和 nghttp3 (James M Snell) [#32379](https://github.com/nodejs/node/pull/32379)
* \[[`f96b981528`](https://github.com/nodejs/node/commit/f96b981528)] - **deps**: 更新 OpenSSL QUIC 支持的详细信息 (James M Snell) [#32379](https://github.com/nodejs/node/pull/32379)
* \[[`98c8498552`](https://github.com/nodejs/node/commit/98c8498552)] - **deps**: 为 OpenSSL-1.1.0 更新 archs 文件 (James M Snell) [#32379](https://github.com/nodejs/node/pull/32379)
* \[[`2c549e505e`](https://github.com/nodejs/node/commit/2c549e505e)] - **deps**: 添加对 BoringSSL QUIC APIs 的支持 (Todd Short) [#32379](https://github.com/nodejs/node/pull/32379)
* \[[`1103b15af6`](https://github.com/nodejs/node/commit/1103b15af6)] - **doc**: 修复 master 上的 YAML lint 错误 (Rich Trott) [#35709](https://github.com/nodejs/node/pull/35709)
* \[[`7798e59e98`](https://github.com/nodejs/node/commit/7798e59e98)] - **doc**: 提升 report API 的稳定性状态 (Gireesh Punathil) [#35654](https://github.com/nodejs/node/pull/35654)
* \[[`ce03a182cf`](https://github.com/nodejs/node/commit/ce03a182cf)] - **doc**: 澄清 vm.md 中的实验性 API 元素 (Rich Trott) [#35594](https://github.com/nodejs/node/pull/35594)
* \[[`89defff3b9`](https://github.com/nodejs/node/commit/89defff3b9)] - **doc**: 更正弃用元数据的顺序 (Rich Trott) [#35668](https://github.com/nodejs/node/pull/35668)
* \[[`ee85eb9f8a`](https://github.com/nodejs/node/commit/ee85eb9f8a)] - **doc**: importModuleDynamically 获取的是 Script，而不是 Module (Simen Bekkhus) [#35593](https://github.com/nodejs/node/pull/35593)
* \[[`9e5a27a9d3`](https://github.com/nodejs/node/commit/9e5a27a9d3)] - **doc**: 修复 EventEmitter 示例 (Sourav Shaw) [#33513](https://github.com/nodejs/node/pull/33513)
* \[[`2c2c87e291`](https://github.com/nodejs/node/commit/2c2c87e291)] - **doc**: 修复 webcrypto 文档中的稳定性指示器 (Rich Trott) [#35672](https://github.com/nodejs/node/pull/35672)
* \[[`f59d4e05a2`](https://github.com/nodejs/node/commit/f59d4e05a2)] - **doc**: 为 process.getgroups() 添加示例代码 (Pooja D.P) [#35625](https://github.com/nodejs/node/pull/35625)
* \[[`8a3808dc37`](https://github.com/nodejs/node/commit/8a3808dc37)] - **doc**: 在 tty 文档中使用 kbd 元素 (Rich Trott) [#35613](https://github.com/nodejs/node/pull/35613)
* \[[`4079bfd462`](https://github.com/nodejs/node/commit/4079bfd462)] - **doc**: 移除对 io.js 的引用 (Hussaina Begum Nandyala) [#35618](https://github.com/nodejs/node/pull/35618)
* \[[`e6d5af3c95`](https://github.com/nodejs/node/commit/e6d5af3c95)] - **doc**: 修复 quic.md 中的拼写错误 (Luigi Pinca) [#35444](https://github.com/nodejs/node/pull/35444)
* \[[`524123fbf0`](https://github.com/nodejs/node/commit/524123fbf0)] - **doc**: 更新 v12.18.4 changelog 中的发布者 (Beth Griggs) [#35217](https://github.com/nodejs/node/pull/35217)
* \[[`ccdd1bd82a`](https://github.com/nodejs/node/commit/ccdd1bd82a)] - **doc**: 修复 quic.md 中被错误标记的 Buffer (Rich Trott) [#35075](https://github.com/nodejs/node/pull/35075)
* \[[`cc754f2985`](https://github.com/nodejs/node/commit/cc754f2985)] - **doc**: 使 events.md 中的 AbortSignal 文本保持一致 (Rich Trott) [#35005](https://github.com/nodejs/node/pull/35005)
* \[[`f9c362ff6c`](https://github.com/nodejs/node/commit/f9c362ff6c)] - **doc**: 修订 AbortSignal 文本及使用 events.once() 的示例 (Rich Trott) [#35005](https://github.com/nodejs/node/pull/35005)
* \[[`7aeff6b8c8`](https://github.com/nodejs/node/commit/7aeff6b8c8)] - **doc**: 为 Electron v12 声明 ABI 版本 (Shelley Vohr) [#34816](https://github.com/nodejs/node/pull/34816)
* \[[`7a1220a1d7`](https://github.com/nodejs/node/commit/7a1220a1d7)] - **doc**: 修复 quic.md 中的标题 (Anna Henningsen) [#34717](https://github.com/nodejs/node/pull/34717)
* \[[`d5c7aec3cb`](https://github.com/nodejs/node/commit/d5c7aec3cb)] - **doc**: 使用 \_can\_ 来描述 quic.md 中的操作 (Rich Trott) [#34613](https://github.com/nodejs/node/pull/34613)
* \[[`319c275b26`](https://github.com/nodejs/node/commit/319c275b26)] - **doc**: 使用 \_can\_ 来描述 quic.md 中的操作 (Rich Trott) [#34613](https://github.com/nodejs/node/pull/34613)
* \[[`2c30920886`](https://github.com/nodejs/node/commit/2c30920886)] - **doc**: 在 quic.md 标题中使用句首大写格式 (Rich Trott) [#34453](https://github.com/nodejs/node/pull/34453)
* \[[`8ada27510d`](https://github.com/nodejs/node/commit/8ada27510d)] - **doc**: 在 timers.md 中添加缺失的反引号 (vsemozhetbyt) [#34030](https://github.com/nodejs/node/pull/34030)
* \[[`862d005e60`](https://github.com/nodejs/node/commit/862d005e60)] - **doc**: 使 globals 的 Extends 用法保持一致 (Colin Ihrig) [#33777](https://github.com/nodejs/node/pull/33777)
* \[[`85dbd17bde`](https://github.com/nodejs/node/commit/85dbd17bde)] - **doc**: 使 perf\_hooks 的 Extends 用法保持一致 (Colin Ihrig) [#33777](https://github.com/nodejs/node/pull/33777)
* \[[`2e49010bc8`](https://github.com/nodejs/node/commit/2e49010bc8)] - **doc**: 使 events 的 Extends 用法保持一致 (Colin Ihrig) [#33777](https://github.com/nodejs/node/pull/33777)
* \[[`680fb8fc62`](https://github.com/nodejs/node/commit/680fb8fc62)] - **doc**: 修复弃用 "End-of-Life" 的大小写 (Colin Ihrig) [#33691](https://github.com/nodejs/node/pull/33691)
* \[[`458677f5ef`](https://github.com/nodejs/node/commit/458677f5ef)] - **errors**: 打印原始异常上下文 (Benjamin Coe) [#33491](https://github.com/nodejs/node/pull/33491)
* \[[`b1831fed3a`](https://github.com/nodejs/node/commit/b1831fed3a)] - **events**: 简化 on 和 once 中与事件目标无关的逻辑 (Denys Otrishko) [#34997](https://github.com/nodejs/node/pull/34997)
* \[[`7f25fe8b67`](https://github.com/nodejs/node/commit/7f25fe8b67)] - **fs**: 移除未使用的赋值 (Rich Trott) [#35642](https://github.com/nodejs/node/pull/35642)
* \[[`2c4f30deea`](https://github.com/nodejs/node/commit/2c4f30deea)] - **fs**: 修复 fs.symlinkSync 中 path 为 buffer 时的问题 (himself65) [#34540](https://github.com/nodejs/node/pull/34540)
* \[[`db0e991d52`](https://github.com/nodejs/node/commit/db0e991d52)] - **fs**: 移除 streams 的自定义 Buffer 池 (Robert Nagy) [#33981](https://github.com/nodejs/node/pull/33981)
* \[[`51a2df4439`](https://github.com/nodejs/node/commit/51a2df4439)] - **fs**: 说明为什么需要 isPerformingIO (Robert Nagy) [#33982](https://github.com/nodejs/node/pull/33982)
* \[[`999e7d7b44`](https://github.com/nodejs/node/commit/999e7d7b44)] - **gyp,build**: 统一共享库位置 (Rod Vagg) [#35635](https://github.com/nodejs/node/pull/35635)
* \[[`30cc54275d`](https://github.com/nodejs/node/commit/30cc54275d)] - **http**: 不要在 close 之后发出 error (Robert Nagy) [#33654](https://github.com/nodejs/node/pull/33654)
* \[[`ddff2b2b22`](https://github.com/nodejs/node/commit/ddff2b2b22)] - **lib**: 遵循 setUncaughtExceptionCaptureCallback (Gireesh Punathil) [#35595](https://github.com/nodejs/node/pull/35595)
* \[[`a8806535d9`](https://github.com/nodejs/node/commit/a8806535d9)] - **lib**: 使用 primordials 中的 Object 静态属性 (Michaël Zasso) [#35380](https://github.com/nodejs/node/pull/35380)
* \[[`11f1ad939f`](https://github.com/nodejs/node/commit/11f1ad939f)] - **module**: 仅尝试增强 CJS 语法错误信息 (Michaël Zasso) [#35691](https://github.com/nodejs/node/pull/35691)
* \[[`aaf225a2a0`](https://github.com/nodejs/node/commit/aaf225a2a0)] - **module**: 为 module.parent 添加 setter (Antoine du Hamel) [#35522](https://github.com/nodejs/node/pull/35522)
* \[[`109a296e2a`](https://github.com/nodejs/node/commit/109a296e2a)] - **quic**: 修复代码注释中的拼写错误 (Ikko Ashimine) [#35308](https://github.com/nodejs/node/pull/35308)
* \[[`186230527b`](https://github.com/nodejs/node/commit/186230527b)] - **quic**: 修复无效连接 ID 的错误消息 (Rich Trott) [#35026](https://github.com/nodejs/node/pull/35026)
* \[[`e5116b304f`](https://github.com/nodejs/node/commit/e5116b304f)] - **quic**: 移除未使用的函数参数 (Rich Trott) [#35010](https://github.com/nodejs/node/pull/35010)
* \[[`449f73e05f`](https://github.com/nodejs/node/commit/449f73e05f)] - **quic**: 移除未定义变量 (Rich Trott) [#35007](https://github.com/nodejs/node/pull/35007)
* \[[`44e6a6af67`](https://github.com/nodejs/node/commit/44e6a6af67)] - **quic**: 使用 qlog fin 标志 (James M Snell) [#34752](https://github.com/nodejs/node/pull/34752)
* \[[`2a80737278`](https://github.com/nodejs/node/commit/2a80737278)] - **quic**: 修复 ngtcp2/nghttp3 更新后的调整 (James M Snell) [#34752](https://github.com/nodejs/node/pull/34752)
* \[[`c855c3e8ca`](https://github.com/nodejs/node/commit/c855c3e8ca)] - **quic**: 使用 net.BlockList 来限制对 QuicSocket 的访问 (James M Snell) [#34741](https://github.com/nodejs/node/pull/34741)
* \[[`bfc35354c1`](https://github.com/nodejs/node/commit/bfc35354c1)] - **quic**: 在 QuicSession 中整合统计收集 (James M Snell) [#34741](https://github.com/nodejs/node/pull/34741)
* \[[`94aa291348`](https://github.com/nodejs/node/commit/94aa291348)] - **quic**: 澄清 TODO 语句 (James M Snell) [#34741](https://github.com/nodejs/node/pull/34741)
* \[[`19e712b9b2`](https://github.com/nodejs/node/commit/19e712b9b2)] - **quic**: 解决 InitializeSecureContext TODO 注释 (James M Snell) [#34741](https://github.com/nodejs/node/pull/34741)
* \[[`240592228b`](https://github.com/nodejs/node/commit/240592228b)] - **quic**: 修复 session ticket app data 的 todo 注释 (James M Snell) [#34741](https://github.com/nodejs/node/pull/34741)
* \[[`c17eaa3f3f`](https://github.com/nodejs/node/commit/c17eaa3f3f)] - **quic**: 在文档中添加 natRebinding 参数 (James M Snell) [#34669](https://github.com/nodejs/node/pull/34669)
* \[[`442968c92a`](https://github.com/nodejs/node/commit/442968c92a)] - **quic**: 检查 setSocket 的 natRebinding 参数，并扩展测试 (James M Snell) [#34669](https://github.com/nodejs/node/pull/34669)
* \[[`10d5047a4f`](https://github.com/nodejs/node/commit/10d5047a4f)] - **quic**: 修复 set\_socket，修复被跳过的测试 (James M Snell) [#34669](https://github.com/nodejs/node/pull/34669)
* \[[`344c5e4e50`](https://github.com/nodejs/node/commit/344c5e4e50)] - **quic**: 将 push 检查限制为 http/3 (James M Snell) [#34655](https://github.com/nodejs/node/pull/34655)
* \[[`34165f03aa`](https://github.com/nodejs/node/commit/34165f03aa)] - **quic**: 解决一些小的 TODO (James M Snell) [#34655](https://github.com/nodejs/node/pull/34655)
* \[[`1e6e5c3ef3`](https://github.com/nodejs/node/commit/1e6e5c3ef3)] - **quic**: 解决 QuicSocket 中的一个小 TODO (James M Snell) [#34655](https://github.com/nodejs/node/pull/34655)
* \[[`ba5c64bf45`](https://github.com/nodejs/node/commit/ba5c64bf45)] - **quic**: 使用带有正确名称/消息的 AbortController (Anna Henningsen) [#34763](https://github.com/nodejs/node/pull/34763)
* \[[`a7477704c4`](https://github.com/nodejs/node/commit/a7477704c4)] - **quic**: 优先使用 modernize-make-unique (gengjiawen) [#34692](https://github.com/nodejs/node/pull/34692)
* \[[`5b6cd6fa1a`](https://github.com/nodejs/node/commit/5b6cd6fa1a)] - **quic**: 使用 SocketAddressLRU 跟踪验证状态 (James M Snell) [#34618](https://github.com/nodejs/node/pull/34618)
* \[[`f75e69a94b`](https://github.com/nodejs/node/commit/f75e69a94b)] - **quic**: 使用 SocketAddressLRU 跟踪已知的 SocketAddress 信息 (James M Snell) [#34618](https://github.com/nodejs/node/pull/34618)
* \[[`6b0b33cd4c`](https://github.com/nodejs/node/commit/6b0b33cd4c)] - **quic**: 清理一些尚未完成的 todo 项 (James M Snell) [#34618](https://github.com/nodejs/node/pull/34618)
* \[[`6e65f26b73`](https://github.com/nodejs/node/commit/6e65f26b73)] - **quic**: 统一在 QuicSession 中使用 QuicCallbackScope (James M Snell) [#34541](https://github.com/nodejs/node/pull/34541)
* \[[`d96083bad5`](https://github.com/nodejs/node/commit/d96083bad5)] - **quic**: 引入 QuicCallbackScope (James M Snell) [#34541](https://github.com/nodejs/node/pull/34541)
* \[[`4b0275ab87`](https://github.com/nodejs/node/commit/4b0275ab87)] - **quic**: 重构 clientHello (James M Snell) [#34541](https://github.com/nodejs/node/pull/34541)
* \[[`a97b5f9c6a`](https://github.com/nodejs/node/commit/a97b5f9c6a)] - **quic**: 使用 OpenSSL 内置证书和主机名验证 (James M Snell) [#34533](https://github.com/nodejs/node/pull/34533)
* \[[`7a5fbafe96`](https://github.com/nodejs/node/commit/7a5fbafe96)] - **quic**: 修复 macOS 的构建 (gengjiawen) [#34336](https://github.com/nodejs/node/pull/34336)
* \[[`1f94b89309`](https://github.com/nodejs/node/commit/1f94b89309)] - **quic**: 重构 ocsp 以使用异步函数而非事件/回调 (James M Snell) [#34498](https://github.com/nodejs/node/pull/34498)
* \[[`06664298fa`](https://github.com/nodejs/node/commit/06664298fa)] - **quic**: 移除不再相关的 TODO 语句 (James M Snell) [#34498](https://github.com/nodejs/node/pull/34498)
* \[[`2fb92f4cc6`](https://github.com/nodejs/node/commit/2fb92f4cc6)] - **quic**: 移除多余的未使用 debug 属性 (James M Snell) [#34498](https://github.com/nodejs/node/pull/34498)
* \[[`b06fe33de1`](https://github.com/nodejs/node/commit/b06fe33de1)] - **quic**: 为 QuicStream 使用 async \_construct (James M Snell) [#34351](https://github.com/nodejs/node/pull/34351)
* \[[`8bd61d4c38`](https://github.com/nodejs/node/commit/8bd61d4c38)] - **quic**: 文档更新 (James M Snell) [#34351](https://github.com/nodejs/node/pull/34351)
* \[[`086c916997`](https://github.com/nodejs/node/commit/086c916997)] - **quic**: 对 QuicStream 生命周期进行大规模重构 (James M Snell) [#34351](https://github.com/nodejs/node/pull/34351)
* \[[`cf28f8a7dd`](https://github.com/nodejs/node/commit/cf28f8a7dd)] - **quic**: 将 qlog 文件加入 gitignore (James M Snell) [#34351](https://github.com/nodejs/node/pull/34351)
* \[[`83bf0d7e8c`](https://github.com/nodejs/node/commit/83bf0d7e8c)] - **quic**: 移除不需要的 quicstream.aborted 并修正文档 (James M Snell) [#34351](https://github.com/nodejs/node/pull/34351)
* \[[`a65296db2c`](https://github.com/nodejs/node/commit/a65296db2c)] - **quic**: 移除 stream pending 代码 (James M Snell) [#34351](https://github.com/nodejs/node/pull/34351)
* \[[`da20287e1a`](https://github.com/nodejs/node/commit/da20287e1a)] - **quic**: 简化 QuicStream 构造逻辑 (James M Snell) [#34351](https://github.com/nodejs/node/pull/34351)
* \[[`6e30fe7a7f`](https://github.com/nodejs/node/commit/6e30fe7a7f)] - **quic**: 将 openStream 转换为 Promise (James M Snell) [#34351](https://github.com/nodejs/node/pull/34351)
* \[[`89453cfc08`](https://github.com/nodejs/node/commit/89453cfc08)] - **quic**: 修复 quic.md (James M Snell) [#34283](https://github.com/nodejs/node/pull/34283)
* \[[`4523d4a813`](https://github.com/nodejs/node/commit/4523d4a813)] - **quic**: 修复关闭/排空期间的计时 (James M Snell) [#34283](https://github.com/nodejs/node/pull/34283)
* \[[`ed4882241c`](https://github.com/nodejs/node/commit/ed4882241c)] - **quic**: 正确传递 readable/writable 构造选项 (James M Snell) [#34283](https://github.com/nodejs/node/pull/34283)
* \[[`57c1129508`](https://github.com/nodejs/node/commit/57c1129508)] - **quic**: 将 QuicSession close 实现为 promise (James M Snell) [#34283](https://github.com/nodejs/node/pull/34283)
* \[[`8e5c5b16ab`](https://github.com/nodejs/node/commit/8e5c5b16ab)] - **quic**: 清理 QuicClientSession 构造函数 (James M Snell) [#34283](https://github.com/nodejs/node/pull/34283)
* \[[`fe4e7e4598`](https://github.com/nodejs/node/commit/fe4e7e4598)] - **quic**: 使用 promisified dns lookup (James M Snell) [#34283](https://github.com/nodejs/node/pull/34283)
* \[[`346aeaf874`](https://github.com/nodejs/node/commit/346aeaf874)] - **quic**: 消除 QuicSession 的“ready”/“not ready” 状态 (James M Snell) [#34283](https://github.com/nodejs/node/pull/34283)
* \[[`6665dda9f6`](https://github.com/nodejs/node/commit/6665dda9f6)] - **quic**: 实现 QuicSocket Promise API，第 2 部分 (James M Snell) [#34283](https://github.com/nodejs/node/pull/34283)
* \[[`79c0e892dd`](https://github.com/nodejs/node/commit/79c0e892dd)] - **quic**: 实现 QuicSocket Promise API，第 1 部分 (James M Snell) [#34283](https://github.com/nodejs/node/pull/34283)
* \[[`53b12f0c7b`](https://github.com/nodejs/node/commit/53b12f0c7b)] - **quic**: 实现 QuicEndpoint Promise API (James M Snell) [#34283](https://github.com/nodejs/node/pull/34283)
* \[[`16b32eae3e`](https://github.com/nodejs/node/commit/16b32eae3e)] - **quic**: 处理 QuicSession 上未处理的 rejection (James M Snell) [#34283](https://github.com/nodejs/node/pull/34283)
* \[[`e5d963e24d`](https://github.com/nodejs/node/commit/e5d963e24d)] - **quic**: 修复 kEndpointClose (James M Snell) [#34283](https://github.com/nodejs/node/pull/34283)
* \[[`9f552df5b4`](https://github.com/nodejs/node/commit/9f552df5b4)] - **quic**: 修复 endpointClose 错误处理，并添加文档 (James M Snell) [#34283](https://github.com/nodejs/node/pull/34283)
* \[[`b80108c033`](https://github.com/nodejs/node/commit/b80108c033)] - **quic**: 限制 addEndpoint 只能在 QuicSocket bind 之前调用 (James M Snell) [#34283](https://github.com/nodejs/node/pull/34283)
* \[[`81c01bbdba`](https://github.com/nodejs/node/commit/81c01bbdba)] - **quic**: 为 stream 选项使用 getter (James M Snell) [#34283](https://github.com/nodejs/node/pull/34283)
* \[[`b8945ba2ab`](https://github.com/nodejs/node/commit/b8945ba2ab)] - **quic**: 澄清代码注释 (James M Snell) [#34283](https://github.com/nodejs/node/pull/34283)
* \[[`429ab1dce6`](https://github.com/nodejs/node/commit/429ab1dce6)] - **quic**: 略微减少代码重复 (James M Snell) [#34283](https://github.com/nodejs/node/pull/34283)
* \[[`aafdc2fcad`](https://github.com/nodejs/node/commit/aafdc2fcad)] - **quic**: 将 ipv6Only 选项替换为 `'udp6-only'` 类型 (James M Snell) [#34283](https://github.com/nodejs/node/pull/34283)
* \[[`fbc38ee134`](https://github.com/nodejs/node/commit/fbc38ee134)] - **quic**: 清除 clang 警告 (gengjiawen) [#34335](https://github.com/nodejs/node/pull/34335)
* \[[`c176d5fac2`](https://github.com/nodejs/node/commit/c176d5fac2)] - **quic**: 设置 destroyed 的时间戳用于持续时间计算 (James M Snell) [#34262](https://github.com/nodejs/node/pull/34262)
* \[[`48a349efd9`](https://github.com/nodejs/node/commit/48a349efd9)] - **quic**: 对更多统计数据使用 Number 而不是 BigInt (James M Snell) [#34262](https://github.com/nodejs/node/pull/34262)
* \[[`5e769b2eaf`](https://github.com/nodejs/node/commit/5e769b2eaf)] - **quic**: 使用不那么具体的错误码 (James M Snell) [#34262](https://github.com/nodejs/node/pull/34262)
* \[[`26493c02a2`](https://github.com/nodejs/node/commit/26493c02a2)] - **quic**: 移除不再有效的 CHECK (James M Snell) [#34247](https://github.com/nodejs/node/pull/34247)
* \[[`458d243f20`](https://github.com/nodejs/node/commit/458d243f20)] - **quic**: 为 QuicStream 正确实现自定义 inspect (James M Snell) [#34247](https://github.com/nodejs/node/pull/34247)
* \[[`0860b11655`](https://github.com/nodejs/node/commit/0860b11655)] - **quic**: 为 QuicSession 正确实现自定义 inspect (James M Snell) [#34247](https://github.com/nodejs/node/pull/34247)
* \[[`b047930d76`](https://github.com/nodejs/node/commit/b047930d76)] - **quic**: 为 QuicSocket 正确实现自定义 inspect (James M Snell) [#34247](https://github.com/nodejs/node/pull/34247)
* \[[`511f8c1138`](https://github.com/nodejs/node/commit/511f8c1138)] - **quic**: 为 QuicEndpoint 正确实现自定义 inspect (James M Snell) [#34247](https://github.com/nodejs/node/pull/34247)
* \[[`fe11f6bf7c`](https://github.com/nodejs/node/commit/fe11f6bf7c)] - **quic**: 清理 QuicSocketFlags，使用共享状态结构 (James M Snell) [#34247](https://github.com/nodejs/node/pull/34247)
* \[[`d08e99de24`](https://github.com/nodejs/node/commit/d08e99de24)] - **quic**: 使用 getter/setter 切换无状态重置 (James M Snell) [#34247](https://github.com/nodejs/node/pull/34247)
* \[[`f2753c7695`](https://github.com/nodejs/node/commit/f2753c7695)] - **quic**: 再次取消定时器引用 (Anna Henningsen) [#34247](https://github.com/nodejs/node/pull/34247)
* \[[`71236097d0`](https://github.com/nodejs/node/commit/71236097d0)] - **quic**: 对 QuicSocket 统计使用 Number() 而不是 bigint (James M Snell) [#34247](https://github.com/nodejs/node/pull/34247)
* \[[`94372b124a`](https://github.com/nodejs/node/commit/94372b124a)] - **quic**: 重构/改进/记录 QuicSocket listening 事件 (James M Snell) [#34247](https://github.com/nodejs/node/pull/34247)
* \[[`afc9390ae5`](https://github.com/nodejs/node/commit/afc9390ae5)] - **quic**: 重构/改进 QuicSocket ready 事件处理 (James M Snell) [#34247](https://github.com/nodejs/node/pull/34247)
* \[[`e3813261b8`](https://github.com/nodejs/node/commit/e3813261b8)] - **quic**: 添加确认 QuicSocket close 事件错误处理的测试 (James M Snell) [#34247](https://github.com/nodejs/node/pull/34247)
* \[[`cc89aac5f7`](https://github.com/nodejs/node/commit/cc89aac5f7)] - **quic**: 重构/改进 busy 事件的错误处理 (James M Snell) [#34247](https://github.com/nodejs/node/pull/34247)
* \[[`edc71ef008`](https://github.com/nodejs/node/commit/edc71ef008)] - **quic**: 处理 session 事件中抛出的错误 / rejection (James M Snell) [#34247](https://github.com/nodejs/node/pull/34247)
* \[[`bcde849be9`](https://github.com/nodejs/node/commit/bcde849be9)] - **quic**: 移除不必要的 bool 转换 (James M Snell) [#34247](https://github.com/nodejs/node/pull/34247)
* \[[`c535131627`](https://github.com/nodejs/node/commit/c535131627)] - **quic**: 对 node\_quic\_session.h 进行额外的小清理 (James M Snell) [#34247](https://github.com/nodejs/node/pull/34247)
* \[[`0f97d6066a`](https://github.com/nodejs/node/commit/0f97d6066a)] - **quic**: 对 idle 和 retransmit 定时器使用 TimerWrap (James M Snell) [#34186](https://github.com/nodejs/node/pull/34186)
* \[[`1b1e985478`](https://github.com/nodejs/node/commit/1b1e985478)] - **quic**: 添加缺失的内存跟踪字段 (James M Snell) [#34160](https://github.com/nodejs/node/pull/34160)
* \[[`5a87e9b0a5`](https://github.com/nodejs/node/commit/5a87e9b0a5)] - **quic**: 如果定时器尚未清理，则将其清理掉 (James M Snell) [#34160](https://github.com/nodejs/node/pull/34160)
* \[[`3837d9cf1f`](https://github.com/nodejs/node/commit/3837d9cf1f)] - **quic**: 修复 lint 问题 (James M Snell) [#34160](https://github.com/nodejs/node/pull/34160)
* \[[`7b062ca015`](https://github.com/nodejs/node/commit/7b062ca015)] - **quic**: 重构 qlog 处理 (James M Snell) [#34160](https://github.com/nodejs/node/pull/34160)
* \[[`e4d369e96e`](https://github.com/nodejs/node/commit/e4d369e96e)] - **quic**: 移除 onSessionDestroy 回调 (James M Snell) [#34160](https://github.com/nodejs/node/pull/34160)
* \[[`3acdd6aac7`](https://github.com/nodejs/node/commit/3acdd6aac7)] - **quic**: 将 QuicSession 共享状态重构为使用 AliasedStruct (James M Snell) [#34160](https://github.com/nodejs/node/pull/34160)
* \[[`f9c2245fb5`](https://github.com/nodejs/node/commit/f9c2245fb5)] - **quic**: 重构 QuicSession 的 close/destroy 流程 (James M Snell) [#34160](https://github.com/nodejs/node/pull/34160)
* \[[`f7510ca439`](https://github.com/nodejs/node/commit/f7510ca439)] - **quic**: 对 C++ 端进行额外清理 (James M Snell) [#34160](https://github.com/nodejs/node/pull/34160)
* \[[`b5bf5bb20f`](https://github.com/nodejs/node/commit/b5bf5bb20f)] - **quic**: 重构本地对象标志以提高可读性 (James M Snell) [#34160](https://github.com/nodejs/node/pull/34160)
* \[[`b1750a4d53`](https://github.com/nodejs/node/commit/b1750a4d53)] - **quic**: 继续重构 quic\_stream/quic\_session (James M Snell) [#34160](https://github.com/nodejs/node/pull/34160)
* \[[`31d6d9d0f7`](https://github.com/nodejs/node/commit/31d6d9d0f7)] - **quic**: 减少代码重复 (James M Snell) [#34137](https://github.com/nodejs/node/pull/34137)
* \[[`b5fe31ef19`](https://github.com/nodejs/node/commit/b5fe31ef19)] - **quic**: 暂时避免使用 private JS 字段 (James M Snell) [#34137](https://github.com/nodejs/node/pull/34137)
* \[[`2afc1abd05`](https://github.com/nodejs/node/commit/2afc1abd05)] - **quic**: 修复常量导出，导出所有协议错误码 (James M Snell) [#34137](https://github.com/nodejs/node/pull/34137)
* \[[`b1fab88ff0`](https://github.com/nodejs/node/commit/b1fab88ff0)] - **quic**: 移除未使用的回调函数 (James M Snell) [#34137](https://github.com/nodejs/node/pull/34137)
* \[[`3bae2d5073`](https://github.com/nodejs/node/commit/3bae2d5073)] - **quic**: 合并 onSessionClose 和 onSessionSilentClose (James M Snell) [#34137](https://github.com/nodejs/node/pull/34137)
* \[[`def8e76999`](https://github.com/nodejs/node/commit/def8e76999)] - **quic**: 修复 set\_final\_size (James M Snell) [#34137](https://github.com/nodejs/node/pull/34137)
* \[[`d6034186d6`](https://github.com/nodejs/node/commit/d6034186d6)] - **quic**: 清理 QuicSocket (James M Snell) [#34137](https://github.com/nodejs/node/pull/34137)
* \[[`73a51bb9dc`](https://github.com/nodejs/node/commit/73a51bb9dc)] - **quic**: 清理 JS API (James M Snell) [#34137](https://github.com/nodejs/node/pull/34137)
* \[[`204f20f2d1`](https://github.com/nodejs/node/commit/204f20f2d1)] - **quic**: 清理 quic\_buffer 中的小问题 (James M Snell) [#34087](https://github.com/nodejs/node/pull/34087)
* \[[`68634d2592`](https://github.com/nodejs/node/commit/68634d2592)] - **quic**: 移除多余的类型转换 (gengjiawen) [#34086](https://github.com/nodejs/node/pull/34086)
* \[[`213cac0b94`](https://github.com/nodejs/node/commit/213cac0b94)] - **quic**: 暂时跳过 quic-ipv6only 测试 (James M Snell) [#34033](https://github.com/nodejs/node/pull/34033)
* \[[`99f7c4bb5e`](https://github.com/nodejs/node/commit/99f7c4bb5e)] - **quic**: 可能修复 ipv6only 测试中的不稳定断言失败 (James M Snell) [#34033](https://github.com/nodejs/node/pull/34033)
* \[[`2a5922e483`](https://github.com/nodejs/node/commit/2a5922e483)] - **quic**: 暂时禁用 packetloss 测试 (James M Snell) [#34033](https://github.com/nodejs/node/pull/34033)
* \[[`86e67aaa69`](https://github.com/nodejs/node/commit/86e67aaa69)] - **quic**: 为 h3-29 实施更新 (James M Snell) [#34033](https://github.com/nodejs/node/pull/34033)
* \[[`adf14e2617`](https://github.com/nodejs/node/commit/adf14e2617)] - **quic**: 修复 node\_quic\_crypto 中的 lint 错误 (Daniel Bevenius) [#34019](https://github.com/nodejs/node/pull/34019)
* \[[`9f2e00fb99`](https://github.com/nodejs/node/commit/9f2e00fb99)] - **quic**: 暂时禁用 preferred address 测试 (James M Snell) [#33934](https://github.com/nodejs/node/pull/33934)
* \[[`0e7c8bdc0c`](https://github.com/nodejs/node/commit/0e7c8bdc0c)] - **quic**: 从 SSL\_CTX\_sess\_set\_new\_cb 回调返回 0 (Anna Henningsen) [#33931](https://github.com/nodejs/node/pull/33931)
* \[[`c7d859e756`](https://github.com/nodejs/node/commit/c7d859e756)] - **quic**: 重构并改进 ipv6Only (James M Snell) [#33935](https://github.com/nodejs/node/pull/33935)
* \[[`1b7434dfc0`](https://github.com/nodejs/node/commit/1b7434dfc0)] - **quic**: 更清晰地设置 FunctionTemplates (Anna Henningsen) [#33968](https://github.com/nodejs/node/pull/33968)
* \[[`8ef86a920c`](https://github.com/nodejs/node/commit/8ef86a920c)] - **quic**: 修复 clang 警告 (gengjiawen) [#33963](https://github.com/nodejs/node/pull/33963)
* \[[`013cd1ac6f`](https://github.com/nodejs/node/commit/013cd1ac6f)] - **quic**: 在 node\_quic.cc 中使用 Check 代替 FromJust (Daniel Bevenius) [#33937](https://github.com/nodejs/node/pull/33937)
* \[[`09330fc155`](https://github.com/nodejs/node/commit/09330fc155)] - **quic**: 修复 clang-tidy performance-faster-string-find 问题 (gengjiawen) [#33975](https://github.com/nodejs/node/pull/33975)
* \[[`9743624c0b`](https://github.com/nodejs/node/commit/9743624c0b)] - **quic**: 修复注释中的拼写错误 (gengjiawen) [#33975](https://github.com/nodejs/node/pull/33975)
* \[[`88ef15812c`](https://github.com/nodejs/node/commit/88ef15812c)] - **quic**: 移除 http3\_application 中未使用的 string include (Daniel Bevenius) [#33926](https://github.com/nodejs/node/pull/33926)
* \[[`1bd88a3ac6`](https://github.com/nodejs/node/commit/1bd88a3ac6)] - **quic**: 修正 node\_quic\_stream 的包含项 (Daniel Bevenius) [#33921](https://github.com/nodejs/node/pull/33921)
* \[[`d7d79f2163`](https://github.com/nodejs/node/commit/d7d79f2163)] - **quic**: 避免内存碎片化问题 (James M Snell) [#33912](https://github.com/nodejs/node/pull/33912)
* \[[`16116f5f5f`](https://github.com/nodejs/node/commit/16116f5f5f)] - **quic**: 移除空操作代码 (Robert Nagy) [#33914](https://github.com/nodejs/node/pull/33914)
* \[[`272b46e04d`](https://github.com/nodejs/node/commit/272b46e04d)] - **quic**: 在没有 ipv6 时跳过 test-quic-preferred-address-ipv6.js (James M Snell) [#33919](https://github.com/nodejs/node/pull/33919)
* \[[`4b70f95d64`](https://github.com/nodejs/node/commit/4b70f95d64)] - **quic**: 在 QuicStream 中使用 Check 代替 FromJust (Daniel Bevenius) [#33909](https://github.com/nodejs/node/pull/33909)
* \[[`133a97f60d`](https://github.com/nodejs/node/commit/133a97f60d)] - **quic**: 始终复制 stateless reset token (Anna Henningsen) [#33917](https://github.com/nodejs/node/pull/33917)
* \[[`14d012ef96`](https://github.com/nodejs/node/commit/14d012ef96)] - **quic**: 修复小的 lint 问题 (James M Snell) [#33913](https://github.com/nodejs/node/pull/33913)
* \[[`55360443ce`](https://github.com/nodejs/node/commit/55360443ce)] - **quic**: 初始 QUIC 实现 (James M Snell) [#32379](https://github.com/nodejs/node/pull/32379)
* \[[`a12a2d892f`](https://github.com/nodejs/node/commit/a12a2d892f)] - **repl**: 更新弃用代码 (Antoine du HAMEL) [#33430](https://github.com/nodejs/node/pull/33430)
* \[[`2b3acc44f0`](https://github.com/nodejs/node/commit/2b3acc44f0)] - **src**: 为 illumos/solaris 系统提供大页支持 (David Carlier) [#34320](https://github.com/nodejs/node/pull/34320)
* \[[`84a7880749`](https://github.com/nodejs/node/commit/84a7880749)] - **src**: 对 crypto::Hash 进行小幅清理和简化 (James M Snell) [#35651](https://github.com/nodejs/node/pull/35651)
* \[[`bfc906906f`](https://github.com/nodejs/node/commit/bfc906906f)] - **src**: 合并 TLSWrap/SSLWrap (James M Snell) [#35552](https://github.com/nodejs/node/pull/35552)
* \[[`9fd6122659`](https://github.com/nodejs/node/commit/9fd6122659)] - **src**: 添加 embedding helpers 以减少样板代码 (Anna Henningsen) [#35597](https://github.com/nodejs/node/pull/35597)
* \[[`f7ed5f4ae3`](https://github.com/nodejs/node/commit/f7ed5f4ae3)] - **src**: 移除 crypto\_context 中的 toLocalChecked (James M Snell) [#35509](https://github.com/nodejs/node/pull/35509)
* \[[`17d5d94921`](https://github.com/nodejs/node/commit/17d5d94921)] - **src**: 替换 crypto\_\* 中更多的 toLocalChecked (James M Snell) [#35509](https://github.com/nodejs/node/pull/35509)
* \[[`83eaaf9731`](https://github.com/nodejs/node/commit/83eaaf9731)] - **src**: 移除未使用的 AsyncWrapObject (James M Snell) [#35511](https://github.com/nodejs/node/pull/35511)
* \[[`ee5f849fda`](https://github.com/nodejs/node/commit/ee5f849fda)] - **src**: 修复 env.cc 中的编译器警告 (Anna Henningsen) [#35547](https://github.com/nodejs/node/pull/35547)
* \[[`40364b181d`](https://github.com/nodejs/node/commit/40364b181d)] - **src**: 在进程退出时检查非 weak BaseObjects (Anna Henningsen) [#35490](https://github.com/nodejs/node/pull/35490)
* \[[`bc0c094b74`](https://github.com/nodejs/node/commit/bc0c094b74)] - **src**: 从 master 中取消 NODE\_VERSION\_IS\_RELEASE 设置 (Antoine du Hamel) [#35531](https://github.com/nodejs/node/pull/35531)
* \[[`fdf0a84e82`](https://github.com/nodejs/node/commit/fdf0a84e82)] - **src**: 将 base64.h 的所有内联方法移到 -inl.h 头文件中 (Anna Henningsen) [#35432](https://github.com/nodejs/node/pull/35432)
* \[[`ff4cf817a3`](https://github.com/nodejs/node/commit/ff4cf817a3)] - **src**: 创建读取 Uint32BE 的辅助函数 (Juan José Arboleda) [#34944](https://github.com/nodejs/node/pull/34944)
* \[[`c6e1edcc28`](https://github.com/nodejs/node/commit/c6e1edcc28)] - **src**: 添加 Update(const sockaddr\*) 变体 (James M Snell) [#34752](https://github.com/nodejs/node/pull/34752)
* \[[`1c14810edc`](https://github.com/nodejs/node/commit/1c14810edc)] - **src**: 允许在内部创建 net.BlockList 实例 (James M Snell) [#34741](https://github.com/nodejs/node/pull/34741)
* \[[`6d1f0aed52`](https://github.com/nodejs/node/commit/6d1f0aed52)] - **src**: 添加 SocketAddressLRU 工具 (James M Snell) [#34618](https://github.com/nodejs/node/pull/34618)
* \[[`feb93c4e84`](https://github.com/nodejs/node/commit/feb93c4e84)] - **src**: 防止 TimerWrapHandle::Stop 中空指针解引用 (Anna Henningsen) [#34460](https://github.com/nodejs/node/pull/34460)
* \[[`7a447bcd54`](https://github.com/nodejs/node/commit/7a447bcd54)] - **src**: 为 node 创建快照 (Joyee Cheung) [#32984](https://github.com/nodejs/node/pull/32984)
* \[[`c943cb4809`](https://github.com/nodejs/node/commit/c943cb4809)] - **src**: 在预执行阶段重置 zero fill 开关 (Joyee Cheung) [#32984](https://github.com/nodejs/node/pull/32984)
* \[[`0b8ae5f2cd`](https://github.com/nodejs/node/commit/0b8ae5f2cd)] - **src**: 为加载器创建快照 (Joyee Cheung) [#32984](https://github.com/nodejs/node/pull/32984)
* \[[`7ecb285842`](https://github.com/nodejs/node/commit/7ecb285842)] - **src**: 使代码缓存测试与快照兼容 (Joyee Cheung) [#32984](https://github.com/nodejs/node/pull/32984)
* \[[`1faf6f459f`](https://github.com/nodejs/node/commit/1faf6f459f)] - **src**: 在实例化时为 Environment 创建快照 (Joyee Cheung) [#32984](https://github.com/nodejs/node/pull/32984)
* \[[`ef9964f4c1`](https://github.com/nodejs/node/commit/ef9964f4c1)] - **src**: 添加 ExternalReferenceRegistry 类 (Joyee Cheung) [#32984](https://github.com/nodejs/node/pull/32984)
* \[[`404302fff5`](https://github.com/nodejs/node/commit/404302fff5)] - **src**: 将主上下文初始化从 Environment 构造函数中拆分出来 (Joyee Cheung) [#32984](https://github.com/nodejs/node/pull/32984)
* \[[`874460a1d1`](https://github.com/nodejs/node/commit/874460a1d1)] - **src**: 重构 TimerWrap 生命周期管理 (Anna Henningsen) [#34252](https://github.com/nodejs/node/pull/34252)
* \[[`e2f9dc6e5a`](https://github.com/nodejs/node/commit/e2f9dc6e5a)] - **src**: 从 TimerWrap 中移除 user_data (Anna Henningsen) [#34252](https://github.com/nodejs/node/pull/34252)
* \[[`e19a251824`](https://github.com/nodejs/node/commit/e19a251824)] - **src**: 使用 TimerWrap 工具替换 InspectorTimer (James M Snell) [#34186](https://github.com/nodejs/node/pull/34186)
* \[[`d4f69002b4`](https://github.com/nodejs/node/commit/d4f69002b4)] - **src**: 添加 TimerWrap 工具 (James M Snell) [#34186](https://github.com/nodejs/node/pull/34186)
* \[[`52de4cb107`](https://github.com/nodejs/node/commit/52de4cb107)] - **src**: 对 FastHrtime 进行小幅更新 (Anna Henningsen) [#33851](https://github.com/nodejs/node/pull/33851)
* \[[`4678e44bb2`](https://github.com/nodejs/node/commit/4678e44bb2)] - **src**: 对错误来源行进行边界检查 (Anna Henningsen) [#33645](https://github.com/nodejs/node/pull/33645)
* \[[`7232c2a160`](https://github.com/nodejs/node/commit/7232c2a160)] - **src**: 在 node\_main.cc 中使用 getauxval (Daniel Bevenius) [#33693](https://github.com/nodejs/node/pull/33693)
* \[[`6be80e1893`](https://github.com/nodejs/node/commit/6be80e1893)] - **stream**: 修复旧版 pipe 错误处理 (Robert Nagy) [#35257](https://github.com/nodejs/node/pull/35257)
* \[[`2b9003b165`](https://github.com/nodejs/node/commit/2b9003b165)] - **stream**: 在 async iterator 成功时不要 destroy (Robert Nagy) [#35122](https://github.com/nodejs/node/pull/35122)
* \[[`9c62e0e384`](https://github.com/nodejs/node/commit/9c62e0e384)] - **stream**: 移至 internal/streams (Matteo Collina) [#35239](https://github.com/nodejs/node/pull/35239)
* \[[`e0d3b758a0`](https://github.com/nodejs/node/commit/e0d3b758a0)] - **stream**: 改进 Writable.destroy 性能 (Robert Nagy) [#35067](https://github.com/nodejs/node/pull/35067)
* \[[`02c4869bee`](https://github.com/nodejs/node/commit/02c4869bee)] - **stream**: 修复 Duplex.\_construct 竞态 (Robert Nagy) [#34456](https://github.com/nodejs/node/pull/34456)
* \[[`5aeaff6499`](https://github.com/nodejs/node/commit/5aeaff6499)] - **stream**: 重构 lazyLoadPromises (rickyes) [#34354](https://github.com/nodejs/node/pull/34354)
* \[[`a55b77d2d3`](https://github.com/nodejs/node/commit/a55b77d2d3)] - **stream**: 已关闭的 OutgoingMessage 上的 finished (Robert Nagy) [#34313](https://github.com/nodejs/node/pull/34313)
* \[[`e10e292c5e`](https://github.com/nodejs/node/commit/e10e292c5e)] - **stream**: 移除未使用的 \_transformState (Robert Nagy) [#33105](https://github.com/nodejs/node/pull/33105)
* \[[`f5c11a1a0a`](https://github.com/nodejs/node/commit/f5c11a1a0a)] - **stream**: 不要在 close 后发出 finish (Robert Nagy) [#32933](https://github.com/nodejs/node/pull/32933)
* \[[`089d654dd8`](https://github.com/nodejs/node/commit/089d654dd8)] - **test**: 修复 npm 7.0.1 的 addons/dlopen-ping-pong (Myles Borins) [#35667](https://github.com/nodejs/node/pull/35667)
* \[[`9ce5a03148`](https://github.com/nodejs/node/commit/9ce5a03148)] - **test**: 为 listen 回调运行时绑定添加测试 (H Adinarayana) [#35657](https://github.com/nodejs/node/pull/35657)
* \[[`a3731309cc`](https://github.com/nodejs/node/commit/a3731309cc)] - **test**: 重构 test-https-host-headers (himself65) [#32805](https://github.com/nodejs/node/pull/32805)
* \[[`30fb4a015d`](https://github.com/nodejs/node/commit/30fb4a015d)] - **test**: 添加 common.mustSucceed (Tobias Nießen) [#35086](https://github.com/nodejs/node/pull/35086)
* \[[`c143266b55`](https://github.com/nodejs/node/commit/c143266b55)] - **test**: 从 wpt 添加一些未覆盖的 url 测试 (Daijiro Wachi) [#35636](https://github.com/nodejs/node/pull/35636)
* \[[`6751b6dc3d`](https://github.com/nodejs/node/commit/6751b6dc3d)] - **test**: 检查 AbortController 是否存在 (James M Snell) [#35616](https://github.com/nodejs/node/pull/35616)
* \[[`9f2e19fa30`](https://github.com/nodejs/node/commit/9f2e19fa30)] - **test**: 更新 win 下的 url 测试 (Daijiro Wachi) [#35622](https://github.com/nodejs/node/pull/35622)
* \[[`c88d845db3`](https://github.com/nodejs/node/commit/c88d845db3)] - **test**: 更新 url 的 wpt 状态 (Daijiro Wachi) [#35335](https://github.com/nodejs/node/pull/35335)
* \[[`589dbf1392`](https://github.com/nodejs/node/commit/589dbf1392)] - **test**: 更新 url 的 wpt 测试 (Daijiro Wachi) [#35329](https://github.com/nodejs/node/pull/35329)
* \[[`46bef7b771`](https://github.com/nodejs/node/commit/46bef7b771)] - **test**: 添加 Actions 注释输出 (Mary Marchini) [#34590](https://github.com/nodejs/node/pull/34590)
* \[[`a9c5b873ca`](https://github.com/nodejs/node/commit/a9c5b873ca)] - **test**: 将 buffer-as-path symlink 测试移到单独的测试文件中 (Rich Trott) [#34569](https://github.com/nodejs/node/pull/34569)
* \[[`31ba9a20bd`](https://github.com/nodejs/node/commit/31ba9a20bd)] - **test**: 在 arm 上运行 test-benchmark-napi (Rich Trott) [#34502](https://github.com/nodejs/node/pull/34502)
* \[[`2c4ebe0426`](https://github.com/nodejs/node/commit/2c4ebe0426)] - **test**: 对所有 async IIFE 使用 `.then(common.mustCall())` (Anna Henningsen) [#34363](https://github.com/nodejs/node/pull/34363)
* \[[`772fdb0cd3`](https://github.com/nodejs/node/commit/772fdb0cd3)] - **test**: 修复不稳定的 test-fs-stream-construct (Rich Trott) [#34203](https://github.com/nodejs/node/pull/34203)
* \[[`9b8d317d99`](https://github.com/nodejs/node/commit/9b8d317d99)] - **test**: 修复不稳定的 test-http2-invalidheaderfield (Rich Trott) [#34173](https://github.com/nodejs/node/pull/34173)
* \[[`2ccf15b2bf`](https://github.com/nodejs/node/commit/2ccf15b2bf)] - **test**: 确保在 destroy 之前发出 finish (Robert Nagy) [#33137](https://github.com/nodejs/node/pull/33137)
* \[[`27f3530da3`](https://github.com/nodejs/node/commit/27f3530da3)] - **test**: 移除不必要的 eslint-disable 注释 (Rich Trott) [#34000](https://github.com/nodejs/node/pull/34000)
* \[[`326a79ebb9`](https://github.com/nodejs/node/commit/326a79ebb9)] - **test**: 修复 test-quic-client-empty-preferred-address.js 中的拼写错误 (gengjiawen) [#33976](https://github.com/nodejs/node/pull/33976)
* \[[`b0b268f5a2`](https://github.com/nodejs/node/commit/b0b268f5a2)] - **test**: 修复不稳定的 fs-construct 测试 (Robert Nagy) [#33625](https://github.com/nodejs/node/pull/33625)
* \[[`cbe955c227`](https://github.com/nodejs/node/commit/cbe955c227)] - **test**: 添加 net 回归测试 (Robert Nagy) [#32794](https://github.com/nodejs/node/pull/32794)
* \[[`5d179cb2ec`](https://github.com/nodejs/node/commit/5d179cb2ec)] - **timers**: 使用带有正确名称/消息的 AbortController (Anna Henningsen) [#34763](https://github.com/nodejs/node/pull/34763)
* \[[`64d22c320c`](https://github.com/nodejs/node/commit/64d22c320c)] - **timers**: 修复 promisified timeouts/immediates 中的 multipleResolves (Denys Otrishko) [#33949](https://github.com/nodejs/node/pull/33949)
* \[[`fbe33aa52e`](https://github.com/nodejs/node/commit/fbe33aa52e)] - **tools**: 将 remark-lint-preset-node 升级到 1.17.1 (Rich Trott) [#35668](https://github.com/nodejs/node/pull/35668)
* \[[`35a6946193`](https://github.com/nodejs/node/commit/35a6946193)] - **tools**: 将 gyp-next 更新到 v0.6.2 (Michaël Zasso) [#35690](https://github.com/nodejs/node/pull/35690)
* \[[`be80faa0c8`](https://github.com/nodejs/node/commit/be80faa0c8)] - **tools**: 将 gyp-next 更新到 v0.6.0 (Ujjwal Sharma) [#35635](https://github.com/nodejs/node/pull/35635)
* \[[`2d83e743d9`](https://github.com/nodejs/node/commit/2d83e743d9)] - **tools**: 将 ESLint 更新到 7.11.0 (Colin Ihrig) [#35578](https://github.com/nodejs/node/pull/35578)
* \[[`0eca660948`](https://github.com/nodejs/node/commit/0eca660948)] - **tools**: 将 ESLint 更新到 7.7.0 (Colin Ihrig) [#34783](https://github.com/nodejs/node/pull/34783)
* \[[`77b68f9a29`](https://github.com/nodejs/node/commit/77b68f9a29)] - **tools**: 为 async IIFE 添加 lint 规则 (Anna Henningsen) [#34363](https://github.com/nodejs/node/pull/34363)
* \[[`f04538761f`](https://github.com/nodejs/node/commit/f04538761f)] - **tools**: 在 node\_mksnapshot 中启用 Node.js 命令行标志 (Joyee Cheung) [#32984](https://github.com/nodejs/node/pull/32984)
* \[[`b0d4eb37c7`](https://github.com/nodejs/node/commit/b0d4eb37c7)] - **tools**: 将 ESLint 更新到 7.4.0 (Colin Ihrig) [#34205](https://github.com/nodejs/node/pull/34205)
* \[[`076e4ed2d1`](https://github.com/nodejs/node/commit/076e4ed2d1)] - **tools**: 将 ESLint 从 7.2.0 更新到 7.3.1 (Rich Trott) [#34000](https://github.com/nodejs/node/pull/34000)
* \[[`7afe3af200`](https://github.com/nodejs/node/commit/7afe3af200)] - **url**: 修复 file url 重新解析 (Daijiro Wachi) [#35671](https://github.com/nodejs/node/pull/35671)
