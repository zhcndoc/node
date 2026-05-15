# Node.js 5 变更日志

<!--lint disable maximum-line-length no-literal-urls prohibited-strings-->

<table>
<tr>
<th>稳定版</th>
</tr>
<tr>
<td>
<a href="#5.12.0">5.12.0</a><br/>
<a href="#5.11.1">5.11.1</a><br/>
<a href="#5.11.0">5.11.0</a><br/>
<a href="#5.10.1">5.10.1</a><br/>
<a href="#5.10.0">5.10.0</a><br/>
<a href="#5.9.1">5.9.1</a><br/>
<a href="#5.9.0">5.9.0</a><br/>
<a href="#5.8.0">5.8.0</a><br/>
<a href="#5.7.1">5.7.1</a><br/>
<a href="#5.7.0">5.7.0</a><br/>
<a href="#5.6.0">5.6.0</a><br/>
<a href="#5.5.0">5.5.0</a><br/>
<a href="#5.4.1">5.4.1</a><br/>
<a href="#5.4.0">5.4.0</a><br/>
<a href="#5.3.0">5.3.0</a><br/>
<a href="#5.2.0">5.2.0</a><br/>
<a href="#5.1.1">5.1.1</a><br/>
<a href="#5.1.0">5.1.0</a><br/>
<a href="#5.0.0">5.0.0</a><br/>
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
  * [4.x](CHANGELOG_V4.md)
  * [0.12.x](CHANGELOG_V012.md)
  * [0.10.x](CHANGELOG_V010.md)
  * [io.js](CHANGELOG_IOJS.md)
  * [归档](CHANGELOG_ARCHIVE.md)

_注_: v5 发布线的官方支持计划于
2016 年 6 月左右到期。v5 用户应升级到 [Node.js v6](CHANGELOG_V6.md)。

<a id="5.12.0"></a>

## 2016-06-23，版本 5.12.0（稳定版），@evanlucas

### 重要变更

这是一个安全发布。所有 Node.js 用户都应查看安全发布摘要：<https://nodejs.org/en/blog/vulnerability/june-2016-security-releases>，了解已修复漏洞的详细信息。

* **buffer**
  * 回移植 allocUnsafeSlow（Сковорода Никита Андреевич） [#7169](https://github.com/nodejs/node/pull/7169)
  * 忽略负的分配长度（Anna Henningsen） [#7221](https://github.com/nodejs/node/pull/7221)
* **deps**: 从 v8 上游回移植 3a9bfec（Ben Noordhuis） [nodejs/node-private#40](https://github.com/nodejs/node-private/pull/40)
  * 修复了在 v8 中发现的一个 Buffer 溢出漏洞。更多细节可见 CVE（CVE-2016-1699）。

### 提交

* \[[`0ca0827b71`](https://github.com/nodejs/node/commit/0ca0827b71)] - **(SEMVER-MINOR)** **buffer**: 回移植 allocUnsafeSlow（Сковорода Никита Андреевич） [#7169](https://github.com/nodejs/node/pull/7169)
* \[[`27785aeb37`](https://github.com/nodejs/node/commit/27785aeb37)] - **buffer**: 忽略负的分配长度（Anna Henningsen） [#7221](https://github.com/nodejs/node/pull/7221)
* \[[`34b96c1322`](https://github.com/nodejs/node/commit/34b96c1322)] - **deps**: 从 v8 上游回移植 3a9bfec（Ben Noordhuis） [nodejs/node-private#40](https://github.com/nodejs/node-private/pull/40)
* \[[`2ebeb82852`](https://github.com/nodejs/node/commit/2ebeb82852)] - **test**: 修复 getaddrinfo(3) 的 test-net-\* 错误代码检查（Natanael Copa） [#5099](https://github.com/nodejs/node/pull/5099)
* \[[`03d36aea4f`](https://github.com/nodejs/node/commit/03d36aea4f)] - **(SEMVER-MINOR)** **test**: 添加用于重置 kZeroFill 的 buffer 测试用例（Сковорода Никита Андреевич） [#7169](https://github.com/nodejs/node/pull/7169)

<a id="5.11.1"></a>

## 2016-05-05，版本 5.11.1（稳定版），@evanlucas

### 重要变更

* **buffer**: 防止意外的 kNoZeroFill（Сковорода Никита Андреевич） [nodejs/node-private#35](https://github.com/nodejs/node-private/pull/35)
* **deps**: 将 openssl 源代码升级到 1.0.2h（Shigeki Ohtsu） [#6552](https://github.com/nodejs/node/pull/6552)

### 提交

* \[[`35f06df782`](https://github.com/nodejs/node/commit/35f06df782)] - **buffer**: 防止意外的 kNoZeroFill（Сковорода Никита Андреевич） [nodejs/node-private#35](https://github.com/nodejs/node-private/pull/35)
* \[[`99920480ae`](https://github.com/nodejs/node/commit/99920480ae)] - **buffer**: 修复 Buffer 示例代码中的一个拼写错误（Mr C0B） [#6361](https://github.com/nodejs/node/pull/6361)
* \[[`d9f7b025d4`](https://github.com/nodejs/node/commit/d9f7b025d4)] - **deps**: 更新 openssl asm 和 asm\_obsolete 文件（Shigeki Ohtsu） [#6552](https://github.com/nodejs/node/pull/6552)
* \[[`f316fd20a0`](https://github.com/nodejs/node/commit/f316fd20a0)] - **deps**: 为 openssl s\_client 添加 -no\_rand\_screen（Shigeki Ohtsu） [nodejs/io.js#1836](https://github.com/nodejs/io.js/pull/1836)
* \[[`263cc34657`](https://github.com/nodejs/node/commit/263cc34657)] - **deps**: 修复 x86\_win32 中 openssl 的 asm 构建错误（Shigeki Ohtsu） [iojs/io.js#1389](https://github.com/iojs/io.js/pull/1389)
* \[[`889d1151de`](https://github.com/nodejs/node/commit/889d1151de)] - **deps**: 修复 ia32 win32 上的 openssl 汇编错误（Fedor Indutny） [iojs/io.js#1389](https://github.com/iojs/io.js/pull/1389)
* \[[`ba49b636b8`](https://github.com/nodejs/node/commit/ba49b636b8)] - **deps**: 将所有 openssl 头文件复制到 include 目录（Shigeki Ohtsu） [#6552](https://github.com/nodejs/node/pull/6552)
* \[[`cdad83a789`](https://github.com/nodejs/node/commit/cdad83a789)] - **deps**: 将 openssl 源代码升级到 1.0.2h（Shigeki Ohtsu） [#6552](https://github.com/nodejs/node/pull/6552)
* \[[`c1ddefdd79`](https://github.com/nodejs/node/commit/c1ddefdd79)] - **openssl**: 修复 win32 上应用程序对按键输入的要求（Shigeki Ohtsu） [iojs/io.js#1389](https://github.com/iojs/io.js/pull/1389)
* \[[`bec5d50f1e`](https://github.com/nodejs/node/commit/bec5d50f1e)] - **test**: 修复针对 openssl1.0.2h 的 alpn 测试（Shigeki Ohtsu） [#6552](https://github.com/nodejs/node/pull/6552)

<a id="5.11.0"></a>

## 2016-04-20，版本 5.11.0（稳定版），@thealphanerd

## 重要变更

* **Buffer**:
  * `Buffer.prototype.compare` 现在可以比较两个 Buffer 的子范围。（James M Snell） [#5880](https://github.com/nodejs/node/pull/5880)
* **deps**:
  * 更新到 http-parser 2.7.0（Fedor Indutny） [#6279](https://github.com/nodejs/node/pull/6279)
  * 将 ESLint 更新到 2.7.0（silverwind） [#6132](https://github.com/nodejs/node/pull/6132)
* **net**:
  * 为 `createConnection()` 添加传入 DNS 查询提示的支持（Colin Ihrig） [#6000](https://github.com/nodejs/node/pull/6000)
* **node**:
  * 让内置库可用于 `--eval` 和 `--print` CLI 选项（Anna Henningsen） [#6207](https://github.com/nodejs/node/pull/6207)
* **npm**:
  * 将 npm 升级到 3.8.6（Kat Marchán） [#6153](https://github.com/nodejs/node/pull/6153)
* **repl**:
  * 如果没有收到输入，在 repl 中按回车将默认重复上一个命令。这个行为此前就存在于 node 中，并不是有意移除的。（Rich Trott） [#6090](https://github.com/nodejs/node/pull/6090)
* **src**:
  * 将 SIGINFO 添加到受支持的信号中（James Reggio） [#6093](https://github.com/nodejs/node/pull/6093)
* **streams**:
  * 修复一个回归问题：当与 cork/uncork 组合使用时，net streams 会同步请求多个 chunk。（Matteo Collina） [#6164](https://github.com/nodejs/node/pull/6164)
* **zlib**:
  * 现在可以配置 flushing 标志，从而允许对部分数据进行解压缩（Anna Henningsen） [#6069](https://github.com/nodejs/node/pull/6069)

### 提交

* \[[`14fcb1dded`](https://github.com/nodejs/node/commit/14fcb1dded)] - **assert**: 尊重 assert.doesNotThrow 消息。（Ilya Shaisultanov） [#2407](https://github.com/nodejs/node/pull/2407)
* \[[`332f7382bb`](https://github.com/nodejs/node/commit/332f7382bb)] - **benchmark**: 添加模块加载器基准测试参数（Brian White） [#5172](https://github.com/nodejs/node/pull/5172)
* \[[`473f086a94`](https://github.com/nodejs/node/commit/473f086a94)] - **(SEMVER-MINOR)** **buffer**: 按偏移量添加 Buffer.prototype.compare（James M Snell） [#5880](https://github.com/nodejs/node/pull/5880)
* \[[`d44540f5af`](https://github.com/nodejs/node/commit/d44540f5af)] - **buffer**: 标准化数组索引检查（Trevor Norris） [#6084](https://github.com/nodejs/node/pull/6084)
* \[[`bd12d72e0c`](https://github.com/nodejs/node/commit/bd12d72e0c)] - **build**: 修复 Linux 的 make tar-headers（Gibson Fahnestock） [#5978](https://github.com/nodejs/node/pull/5978)
* \[[`3c8d404a82`](https://github.com/nodejs/node/commit/3c8d404a82)] - **build**: 允许 test-ci 并行运行测试（Johan Bergström） [#6208](https://github.com/nodejs/node/pull/6208)
* \[[`a5f8d0c6ef`](https://github.com/nodejs/node/commit/a5f8d0c6ef)] - **build**: 移除 -f{data,function}-sections 标志（Ben Noordhuis） [#6077](https://github.com/nodejs/node/pull/6077)
* \[[`adfb1a4bb0`](https://github.com/nodejs/node/commit/adfb1a4bb0)] - **child\_process**: 在 alloc 之后添加 nullptr 检查（Anna Henningsen） [#6256](https://github.com/nodejs/node/pull/6256)
* \[[`1fb40524ee`](https://github.com/nodejs/node/commit/1fb40524ee)] - **(SEMVER-MINOR)** **debugger**: 按回车时运行上一个命令（Rich Trott） [#6090](https://github.com/nodejs/node/pull/6090)
* \[[`5305831184`](https://github.com/nodejs/node/commit/5305831184)] - **deps**: 更新到 http-parser 2.7.0（Fedor Indutny） [#6279](https://github.com/nodejs/node/pull/6279)
* \[[`8ae200c768`](https://github.com/nodejs/node/commit/8ae200c768)] - **deps**: 修复 npm 的 test-node 脚本中的浮点问题（Kat Marchán） [#6153](https://github.com/nodejs/node/pull/6153)
* \[[`e3e544eb96`](https://github.com/nodejs/node/commit/e3e544eb96)] - **deps**: 将 npm 升级到 3.8.6（Kat Marchán） [#6153](https://github.com/nodejs/node/pull/6153)
* \[[`a7104e4516`](https://github.com/nodejs/node/commit/a7104e4516)] - **deps**: 从 v8 上游挑选提交 1383d00（Fedor Indutny） [#6179](https://github.com/nodejs/node/pull/6179)
* \[[`632e6b9617`](https://github.com/nodejs/node/commit/632e6b9617)] - **deps**: 从 v8 上游回移植 125ac66（Myles Borins） [#6086](https://github.com/nodejs/node/pull/6086)
* \[[`4b8376986a`](https://github.com/nodejs/node/commit/4b8376986a)] - **doc**: 使用 git mv 重命名为 .md（Robert Jefe Lindstaedt） [#4747](https://github.com/nodejs/node/pull/4747)
* \[[`e6f4a175d4`](https://github.com/nodejs/node/commit/e6f4a175d4)] - **doc**: 为 zlib.flush() 添加完整示例（Anna Henningsen） [#6172](https://github.com/nodejs/node/pull/6172)
* \[[`50f3f10ce6`](https://github.com/nodejs/node/commit/50f3f10ce6)] - **doc**: 说明 zlib.flush 在待处理写入之后生效（Anna Henningsen） [#6172](https://github.com/nodejs/node/pull/6172)
* \[[`985685d170`](https://github.com/nodejs/node/commit/985685d170)] - **doc**: 修复损坏的引用（Alexander Gromnitsky） [#6100](https://github.com/nodejs/node/pull/6100)
* \[[`d66d883a85`](https://github.com/nodejs/node/commit/d66d883a85)] - **doc**: 为 path.format 提供更多示例（John Eversole） [#5838](https://github.com/nodejs/node/pull/5838)
* \[[`dc1552e321`](https://github.com/nodejs/node/commit/dc1552e321)] - **doc**: 使用箭头函数替换函数（abouthiroppy） [#6203](https://github.com/nodejs/node/pull/6203)
* \[[`fa04dfc307`](https://github.com/nodejs/node/commit/fa04dfc307)] - **doc**: 不会变化的 DCO 锚点（William Kapke） [#6257](https://github.com/nodejs/node/pull/6257)
* \[[`b49a5b33b5`](https://github.com/nodejs/node/commit/b49a5b33b5)] - **doc**: 修复 http 响应事件、Agent#getName（Matthew Douglass） [#5993](https://github.com/nodejs/node/pull/5993)
* \[[`3b00d7a5b1`](https://github.com/nodejs/node/commit/3b00d7a5b1)] - **doc**: 记录 fs 模块 Buffer API 的意图和风险（Nikolai Vavilov） [#6020](https://github.com/nodejs/node/pull/6020)
* \[[`3bc31526bb`](https://github.com/nodejs/node/commit/3bc31526bb)] - **doc**: 解释 node 与浏览器中 console.assert 的差异（James M Snell） [#6169](https://github.com/nodejs/node/pull/6169)
* \[[`3f73502662`](https://github.com/nodejs/node/commit/3f73502662)] - **doc**: 不支持本地模块重新加载（Bryan English） [#6168](https://github.com/nodejs/node/pull/6168)
* \[[`5f9c8297f1`](https://github.com/nodejs/node/commit/5f9c8297f1)] - **doc**: 澄清 linux、os x 上的 fs.watch() 和 inode（Joran Dirk Greef） [#6099](https://github.com/nodejs/node/pull/6099)
* \[[`f3c0b78ae4`](https://github.com/nodejs/node/commit/f3c0b78ae4)] - **doc**: 添加 domain postmortem（Trevor Norris） [#6159](https://github.com/nodejs/node/pull/6159)
* \[[`a91834e743`](https://github.com/nodejs/node/commit/a91834e743)] - **doc**: 将 stefanmb 添加为协作者（Stefan Budeanu） [#6227](https://github.com/nodejs/node/pull/6227)
* \[[`117348d082`](https://github.com/nodejs/node/commit/117348d082)] - **doc**: 将 iWuzHere 添加为协作者（Imran Iqbal） [#6226](https://github.com/nodejs/node/pull/6226)
* \[[`a1c46b63e8`](https://github.com/nodejs/node/commit/a1c46b63e8)] - **doc**: 将 santigimeno 添加为协作者（Santiago Gimeno） [#6225](https://github.com/nodejs/node/pull/6225)
* \[[`976e4bb3da`](https://github.com/nodejs/node/commit/976e4bb3da)] - **doc**: 将 addaleax 添加为协作者（Anna Henningsen） [#6224](https://github.com/nodejs/node/pull/6224)
* \[[`4fa949ef75`](https://github.com/nodejs/node/commit/4fa949ef75)] - **doc**: 修复 buffer 文档中的错误引用（Amery） [#6194](https://github.com/nodejs/node/pull/6194)
* \[[`b26fea1595`](https://github.com/nodejs/node/commit/b26fea1595)] - **doc**: 添加如何获取 SHA256.txt 的说明（Myles Borins） [#6120](https://github.com/nodejs/node/pull/6120)
* \[[`daaad47099`](https://github.com/nodejs/node/commit/daaad47099)] - **doc**: 澄清 maxBuffer 和 Unicode 输出（James M Snell） [#6030](https://github.com/nodejs/node/pull/6030)
* \[[`5e6915f374`](https://github.com/nodejs/node/commit/5e6915f374)] - **doc**: 说明 linux 上 child.kill() 的陷阱（Robert Jefe Lindstaedt） [#2098](https://github.com/nodejs/node/issues/2098)
* \[[`a40d0e8f9d`](https://github.com/nodejs/node/commit/a40d0e8f9d)] - **doc**: 修复 iOS 设备上的滚动问题（Luigi Pinca） [#5878](https://github.com/nodejs/node/pull/5878)
* \[[`a81fca4f99`](https://github.com/nodejs/node/commit/a81fca4f99)] - **doc**: 添加主题 - 事件循环、定时器、`nextTick()`（Jeff Harris） [#4936](https://github.com/nodejs/node/pull/4936)
* \[[`440d1172fd`](https://github.com/nodejs/node/commit/440d1172fd)] - **doc**: 添加使用未直接暴露算法的示例（Brad Hill） [#6108](https://github.com/nodejs/node/pull/6108)
* \[[`96ad5c5303`](https://github.com/nodejs/node/commit/96ad5c5303)] - **doc**: 使用 license-builder.sh 更新 openssl LICENSE（Steven R. Loomis） [#6065](https://github.com/nodejs/node/pull/6065)
* \[[`07829b0bc9`](https://github.com/nodejs/node/commit/07829b0bc9)] - **doc**: 简单的文档拼写修复（Brendon Pierson） [#6041](https://github.com/nodejs/node/pull/6041)
* \[[`bc0ee06226`](https://github.com/nodejs/node/commit/bc0ee06226)] - **doc**: 关于 Android 支持的说明（Rich Trott） [#6040](https://github.com/nodejs/node/pull/6040)
* \[[`60a73a2ed2`](https://github.com/nodejs/node/commit/60a73a2ed2)] - **doc**: 修复 5.10.1 变更日志中的一个拼写错误（Vladimir Varankin） [#6076](https://github.com/nodejs/node/pull/6076)
* \[[`b57be92c1b`](https://github.com/nodejs/node/commit/b57be92c1b)] - **gitignore**: 在 .gitignore 中添加 .vs/ 目录（Mike Kaufman） [#6070](https://github.com/nodejs/node/pull/6070)
* \[[`6e891c7ad4`](https://github.com/nodejs/node/commit/6e891c7ad4)] - **gitignore**: 忽略 VS 2015 \*.VC.opendb 文件（Mike Kaufman） [#6070](https://github.com/nodejs/node/pull/6070)
* \[[`abd101be1a`](https://github.com/nodejs/node/commit/abd101be1a)] - **http**: 禁止发送明显无效的状态码（Brian White） [#6291](https://github.com/nodejs/node/pull/6291)
* \[[`16b23b2c28`](https://github.com/nodejs/node/commit/16b23b2c28)] - **http**: 跳过 CONNECT 响应的正文和下一条消息（Fedor Indutny） [#6279](https://github.com/nodejs/node/pull/6279)
* \[[`a259ee4018`](https://github.com/nodejs/node/commit/a259ee4018)] - **http**: 在解析器执行时取消 socket 定时器的引用（Fedor Indutny） [#6286](https://github.com/nodejs/node/pull/6286)
* \[[`d4abca5b27`](https://github.com/nodejs/node/commit/d4abca5b27)] - **lib**: 移除 bootstrap 全局上下文间接层（Jeremiah Senkpiel） [#5881](https://github.com/nodejs/node/pull/5881)
* \[[`c8783aff21`](https://github.com/nodejs/node/commit/c8783aff21)] - **lib,test,tools**: 统一变量赋值对齐（Rich Trott） [#6242](https://github.com/nodejs/node/pull/6242)
* \[[`d5d4f194f1`](https://github.com/nodejs/node/commit/d5d4f194f1)] - **net**: 用 defineProperty 替换 `__defineGetter__`（Fedor Indutny） [#6284](https://github.com/nodejs/node/pull/6284)
* \[[`6d9c0c9aa7`](https://github.com/nodejs/node/commit/6d9c0c9aa7)] - **(SEMVER-MINOR)** **net**: 在 createConnection() 中支持 DNS 提示（Colin Ihrig） [#6000](https://github.com/nodejs/node/pull/6000)
* \[[`457f24f19c`](https://github.com/nodejs/node/commit/457f24f19c)] - **(SEMVER-MINOR)** **node**: 让内置库可用于 `--eval`（Anna Henningsen） [#6207](https://github.com/nodejs/node/pull/6207)
* \[[`fc89d17656`](https://github.com/nodejs/node/commit/fc89d17656)] - **path**: 修复在某些机器上会失败的测试。（Mike Kaufman） [#6067](https://github.com/nodejs/node/pull/6067)
* \[[`1d408099b7`](https://github.com/nodejs/node/commit/1d408099b7)] - **process**: 修复对 assert.fail() 的错误用法（Rich Trott） [#6211](https://github.com/nodejs/node/pull/6211)
* \[[`07c9f981d6`](https://github.com/nodejs/node/commit/07c9f981d6)] - **(SEMVER-MINOR)** **repl**: 保持内置模块不可枚举（Anna Henningsen） [#6207](https://github.com/nodejs/node/pull/6207)
* \[[`5382deaa18`](https://github.com/nodejs/node/commit/5382deaa18)] - **repl**: 不完成非简单表达式（Anna Henningsen） [#6192](https://github.com/nodejs/node/pull/6192)
* \[[`2254f1a175`](https://github.com/nodejs/node/commit/2254f1a175)] - **repl**: 重构 repl.js（Rich Trott） [#6071](https://github.com/nodejs/node/pull/6071)
* \[[`7d54d85269`](https://github.com/nodejs/node/commit/7d54d85269)] - **(SEMVER-MINOR)** **src**: 将 SIGINFO 添加到受支持的信号中（James Reggio） [#6093](https://github.com/nodejs/node/pull/6093)
* \[[`fbc99ba4f1`](https://github.com/nodejs/node/commit/fbc99ba4f1)] - **src**: 添加缺失的 'inline' 关键字（Ben Noordhuis） [#6056](https://github.com/nodejs/node/pull/6056)
* \[[`20bb92f5c8`](https://github.com/nodejs/node/commit/20bb92f5c8)] - **src**: 对 http 解析器数组大小字段使用 size\_t（Ben Noordhuis） [#5969](https://github.com/nodejs/node/pull/5969)
* \[[`2fd8be2dbe`](https://github.com/nodejs/node/commit/2fd8be2dbe)] - **src**: 用 typesafe arraysize 替换 ARRAY\_SIZE（Ben Noordhuis） [#5969](https://github.com/nodejs/node/pull/5969)
* \[[`4392b4aee0`](https://github.com/nodejs/node/commit/4392b4aee0)] - **stream**: 修复 readableState.awaitDrain 机制（Anna Henningsen） [#6023](https://github.com/nodejs/node/pull/6023)
* \[[`20dcdd365b`](https://github.com/nodejs/node/commit/20dcdd365b)] - **stream\_base**: 暴露 `bytesRead` getter（Fedor Indutny） [#6284](https://github.com/nodejs/node/pull/6284)
* \[[`f69416c06e`](https://github.com/nodejs/node/commit/f69416c06e)] - **streams**: 支持无限次同步 cork/uncork 循环（Matteo Collina） [#6164](https://github.com/nodejs/node/pull/6164)
* \[[`4bfed26d1a`](https://github.com/nodejs/node/commit/4bfed26d1a)] - **test**: 添加 zlib close-after-error 回归测试（Anna Henningsen） [#6270](https://github.com/nodejs/node/pull/6270)
* \[[`99d0a61441`](https://github.com/nodejs/node/commit/99d0a61441)] - **test**: 将更多测试从顺序执行改为并行执行（Santiago Gimeno） [#6187](https://github.com/nodejs/node/pull/6187)
* \[[`96be986a77`](https://github.com/nodejs/node/commit/96be986a77)] - **test**: assert - 修正错误消息以匹配测试（surya panikkal） [#6241](https://github.com/nodejs/node/pull/6241)
* \[[`4e4efb756e`](https://github.com/nodejs/node/commit/4e4efb756e)] - **test**: 添加对 HTTP CONNECT 请求响应的测试（Josh Leder） [#6279](https://github.com/nodejs/node/pull/6279)
* \[[`5b42ef5dfe`](https://github.com/nodejs/node/commit/5b42ef5dfe)] - **test**: 将 debugger 测试改为顺序执行（Rich Trott） [#6205](https://github.com/nodejs/node/pull/6205)
* \[[`9856b804e9`](https://github.com/nodejs/node/commit/9856b804e9)] - **test**: 将部分测试从顺序执行改为并行执行（Santiago Gimeno） [#6087](https://github.com/nodejs/node/pull/6087)
* \[[`1d130d0203`](https://github.com/nodejs/node/commit/1d130d0203)] - **test**: 将 debugger 测试改回并行执行（Santiago Gimeno） [#6246](https://github.com/nodejs/node/pull/6246)
* \[[`c0e9c94868`](https://github.com/nodejs/node/commit/c0e9c94868)] - **test**: 修复 ESLint 2.7.0 的问题（silverwind） [#6132](https://github.com/nodejs/node/pull/6132)
* \[[`056a258173`](https://github.com/nodejs/node/commit/056a258173)] - **test**: 修复 test-http-set-timeout-server 的不稳定问题（Santiago Gimeno） [#6248](https://github.com/nodejs/node/pull/6248)
* \[[`be993fcf6c`](https://github.com/nodejs/node/commit/be993fcf6c)] - **test**: 修复 test-net-settimeout 的不稳定性（Santiago Gimeno） [#6166](https://github.com/nodejs/node/pull/6166)
* \[[`a38b614ae9`](https://github.com/nodejs/node/commit/a38b614ae9)] - **test**: 修复不稳定的 test-child-process-fork-net（Rich Trott） [#6138](https://github.com/nodejs/node/pull/6138)
* \[[`476535cc0e`](https://github.com/nodejs/node/commit/476535cc0e)] - **test**: 修复不稳定的 test-http-client-abort（Rich Trott） [#6124](https://github.com/nodejs/node/pull/6124)
* \[[`6bb7999bd6`](https://github.com/nodejs/node/commit/6bb7999bd6)] - **test**: 重构 test-file-write-stream3（Rich Trott） [#6050](https://github.com/nodejs/node/pull/6050)
* \[[`a27e95231e`](https://github.com/nodejs/node/commit/a27e95231e)] - **test**: 为 test-domain-crypto 强制启用严格模式（Rich Trott） [#6047](https://github.com/nodejs/node/pull/6047)
* \[[`8da4bad1c9`](https://github.com/nodejs/node/commit/8da4bad1c9)] - **test**: 修复 pummel 测试失败（Rich Trott） [#6012](https://github.com/nodejs/node/pull/6012)
* \[[`edd8a15508`](https://github.com/nodejs/node/commit/edd8a15508)] - **test,repl**: 对假值使用 deepStrictEqual（Jeremiah Senkpiel） [#6196](https://github.com/nodejs/node/pull/6196)
* \[[`48ecc0b6b5`](https://github.com/nodejs/node/commit/48ecc0b6b5)] - **test,tools**: 为未定义变量启用 lint 检查（Rich Trott） [#6255](https://github.com/nodejs/node/pull/6255)
* \[[`d809c84bf8`](https://github.com/nodejs/node/commit/d809c84bf8)] - **test,vm**: 为 vm 测试启用严格模式（Rich Trott） [#6209](https://github.com/nodejs/node/pull/6209)
* \[[`4a1dfdcc0f`](https://github.com/nodejs/node/commit/4a1dfdcc0f)] - **tools**: 为 assert.fail() 添加 lint 规则（Rich Trott） [#6261](https://github.com/nodejs/node/pull/6261)
* \[[`fff6a84da5`](https://github.com/nodejs/node/commit/fff6a84da5)] - **tools**: 为 v8\_prof\_processor.js 启用 lint 检查（Rich Trott） [#6262](https://github.com/nodejs/node/pull/6262)
* \[[`a2ca347803`](https://github.com/nodejs/node/commit/a2ca347803)] - **tools**: 将消息监听器移到 worker 对象中（Brian White） [#6212](https://github.com/nodejs/node/pull/6212)
* \[[`f201b01bf7`](https://github.com/nodejs/node/commit/f201b01bf7)] - **tools**: 改进 js linter（Brian White） [#5638](https://github.com/nodejs/node/pull/5638)
* \[[`be070d775f`](https://github.com/nodejs/node/commit/be070d775f)] - **tools**: 为变量赋值对齐添加 lint 检查（Rich Trott） [#6242](https://github.com/nodejs/node/pull/6242)
* \[[`d9b8758f47`](https://github.com/nodejs/node/commit/d9b8758f47)] - **tools**: 将 ESLint 更新到 2.7.0（silverwind） [#6132](https://github.com/nodejs/node/pull/6132)
* \[[`a6056c453e`](https://github.com/nodejs/node/commit/a6056c453e)] - **tools**: 再次为 ICU 修复 license-builder.sh（Steven R. Loomis） [#6068](https://github.com/nodejs/node/pull/6068)
* \[[`fabc33a075`](https://github.com/nodejs/node/commit/fabc33a075)] - **tools**: 移除 simplejson 依赖（Sakthipriyan Vairamani） [#6101](https://github.com/nodejs/node/pull/6101)
* \[[`d516412cd5`](https://github.com/nodejs/node/commit/d516412cd5)] - **tools,doc**: 在所有地方都用大括号解析类型（Alexander Makarenko） [#5329](https://github.com/nodejs/node/pull/5329)
* \[[`69eb4a6834`](https://github.com/nodejs/node/commit/69eb4a6834)] - **tools,doc**: 修复分组可选参数的 json（firedfox） [#5977](https://github.com/nodejs/node/pull/5977)
* \[[`a2dd848764`](https://github.com/nodejs/node/commit/a2dd848764)] - **tools,doc**: 修复 doctool 生成的不完整 json（firedfox） [#5966](https://github.com/nodejs/node/pull/5966)
* \[[`bad006f2e1`](https://github.com/nodejs/node/commit/bad006f2e1)] - **zlib**: 修复调用 .close 时的空值后使用问题（James Lal） [#5982](https://github.com/nodejs/node/pull/5982)
* \[[`83bc0a2ac9`](https://github.com/nodejs/node/commit/83bc0a2ac9)] - **(SEMVER-MINOR)** **zlib**: 使 finish flush 标志可配置（Anna Henningsen） [#6069](https://github.com/nodejs/node/pull/6069)
* \[[`2c23e14d5d`](https://github.com/nodejs/node/commit/2c23e14d5d)] - **(SEMVER-MINOR)** **zlib**: 在使用 unzip\* 时检测 gzip 文件（Anna Henningsen） [#5884](https://github.com/nodejs/node/pull/5884)
* \[[`61167c3e23`](https://github.com/nodejs/node/commit/61167c3e23)] - **zlib**: 修复 gzip member head/buffer 边界问题（Anna Henningsen） [#5973](https://github.com/nodejs/node/pull/5973)

<a id="5.10.1"></a>

## 2016-04-05，版本 5.10.1（稳定版），@thealphanerd

### 重要变更

* **http**：
  * 用方括号包裹 IPv6 Host 头。这将使主机地址与任何端口引用能够正确分离（Mihai Potra）[#5314](https://github.com/nodejs/node/pull/5314)

* **path**：
  * 使 win32.isAbsolute 更加一致（Brian White）[#6028](https://github.com/nodejs/node/pull/6028)

### 提交

* \[[`0f5a51ae4b`](https://github.com/nodejs/node/commit/0f5a51ae4b)] - **assert**：在 deepEqual 中检查 typed array view 类型（Anna Henningsen）[#5910](https://github.com/nodejs/node/pull/5910)
* \[[`e966d1f5db`](https://github.com/nodejs/node/commit/e966d1f5db)] - **buffer**：不要在 allocUnsafe 中设置 `kNoZeroFill` 标志（Vladimir Kurchatkin）[#6007](https://github.com/nodejs/node/pull/6007)
* \[[`3f75751c2e`](https://github.com/nodejs/node/commit/3f75751c2e)] - **build**：为 lint/benchmark 引入 CI 目标（Johan Bergström）[#5921](https://github.com/nodejs/node/pull/5921)
* \[[`781290b61d`](https://github.com/nodejs/node/commit/781290b61d)] - **doc**：完善 child\_process detach 行为（Robert Jefe Lindstaedt）[#5330](https://github.com/nodejs/node/pull/5330)
* \[[`aa9fb03202`](https://github.com/nodejs/node/commit/aa9fb03202)] - **doc**：尽可能使用 HTTPS 作为链接（Rich Trott）[#6019](https://github.com/nodejs/node/pull/6019)
* \[[`dd25984838`](https://github.com/nodejs/node/commit/dd25984838)] - **doc**：注明 assert.throws() 的陷阱（Rich Trott）[#6029](https://github.com/nodejs/node/pull/6029)
* \[[`f879f5e68a`](https://github.com/nodejs/node/commit/f879f5e68a)] - **doc**：为 buf.write\* 方法记录未指定的行为（James M Snell）[#5925](https://github.com/nodejs/node/pull/5925)
* \[[`f12c3861e0`](https://github.com/nodejs/node/commit/f12c3861e0)] - **doc**：澄清传给回调的 stdout/stderr 参数（James M Snell）[#6015](https://github.com/nodejs/node/pull/6015)
* \[[`ce173716be`](https://github.com/nodejs/node/commit/ce173716be)] - **doc**：在“单页查看”中加入“命令行选项”（firedfox）[#6011](https://github.com/nodejs/node/pull/6011)
* \[[`7337ef6422`](https://github.com/nodejs/node/commit/7337ef6422)] - **doc**：stream.markdown 中参数格式的细微调整（James M Snell）[#6016](https://github.com/nodejs/node/pull/6016)
* \[[`0ae5d027c6`](https://github.com/nodejs/node/commit/0ae5d027c6)] - **doc**：澄清 __dirname 是模块局部的（James M Snell）[#6018](https://github.com/nodejs/node/pull/6018)
* \[[`8bec8aa41f`](https://github.com/nodejs/node/commit/8bec8aa41f)] - **doc**：将 timers 文档整合到 timers.markdown 中（Bryan English）[#5837](https://github.com/nodejs/node/pull/5837)
* \[[`0a13099c42`](https://github.com/nodejs/node/commit/0a13099c42)] - **etw**：添加事件消息（João Reis）[#5936](https://github.com/nodejs/node/pull/5936)
* \[[`c6ac6f2ea1`](https://github.com/nodejs/node/commit/c6ac6f2ea1)] - **http**：修正 Host 头中的 IPv6 地址（Mihai Potra）[#5314](https://github.com/nodejs/node/pull/5314)
* \[[`8317778925`](https://github.com/nodejs/node/commit/8317778925)] - **meta**：在 WORKING\_GROUPS.md 中添加“加入工作组”部分（Matteo Collina）[#5488](https://github.com/nodejs/node/pull/5488)
* \[[`f3f19ee5e2`](https://github.com/nodejs/node/commit/f3f19ee5e2)] - **net**：将 self=this 重构为箭头函数（Benjamin Gruenbaum）[#5857](https://github.com/nodejs/node/pull/5857)
* \[[`1c4007927d`](https://github.com/nodejs/node/commit/1c4007927d)] - **path**：修复 win32.isAbsolute() 的不一致（Brian White）[#6028](https://github.com/nodejs/node/pull/6028)
* \[[`059b607a4f`](https://github.com/nodejs/node/commit/059b607a4f)] - **test**：显式使用全局变量（Rich Trott）[#6014](https://github.com/nodejs/node/pull/6014)
* \[[`cc8fcc5a07`](https://github.com/nodejs/node/commit/cc8fcc5a07)] - **test**：明确对 `global` 的污染（Rich Trott）[#6017](https://github.com/nodejs/node/pull/6017)
* \[[`7db7a820b9`](https://github.com/nodejs/node/commit/7db7a820b9)] - **test**：让 status 文件中可用 arch（Santiago Gimeno）[#5997](https://github.com/nodejs/node/pull/5997)
* \[[`02f2ebd9b4`](https://github.com/nodejs/node/commit/02f2ebd9b4)] - **test**：在 test-repl 中显式设置 global（Rich Trott）[#6026](https://github.com/nodejs/node/pull/6026)
* \[[`2ab1237137`](https://github.com/nodejs/node/commit/2ab1237137)] - **test**：修复不稳定的 test-net-socket-timeout-unref（Rich Trott）[#6003](https://github.com/nodejs/node/pull/6003)
* \[[`0127c2bd39`](https://github.com/nodejs/node/commit/0127c2bd39)] - **test**：修复 test-dns.js 的不稳定性（Rich Trott）[#5996](https://github.com/nodejs/node/pull/5996)
* \[[`6052ced37f`](https://github.com/nodejs/node/commit/6052ced37f)] - **test**：修复 test-module-loading 中的错误消息检查（James M Snell）[#5986](https://github.com/nodejs/node/pull/5986)
* \[[`a40b0cb673`](https://github.com/nodejs/node/commit/a40b0cb673)] - **test**：重构 http-end-throw-socket-handling（Santiago Gimeno）[#5676](https://github.com/nodejs/node/pull/5676)
* \[[`96bb315262`](https://github.com/nodejs/node/commit/96bb315262)] - **test**：确保 _handle 属性存在（Rich Trott）[#5916](https://github.com/nodejs/node/pull/5916)
* \[[`4f1fa2adeb`](https://github.com/nodejs/node/commit/4f1fa2adeb)] - **test**：修复造成 max-len 规则报错的问题（Sakthipriyan Vairamani）[#5980](https://github.com/nodejs/node/pull/5980)
* \[[`f14d71ccea`](https://github.com/nodejs/node/commit/f14d71ccea)] - **test**：stdin 并不总是 net.Socket（Jeremiah Senkpiel）[#5935](https://github.com/nodejs/node/pull/5935)
* \[[`50a062e691`](https://github.com/nodejs/node/commit/50a062e691)] - **tools**：移除过时的 lint 配置文件（Rich Trott）[#5959](https://github.com/nodejs/node/pull/5959)
* \[[`7491fdcfe9`](https://github.com/nodejs/node/commit/7491fdcfe9)] - **tools**：移除对已禁用规则的禁用（Rich Trott）[#6013](https://github.com/nodejs/node/pull/6013)

<a id="5.10.0"></a>

## 2016-03-31，版本 5.10.0（稳定版），@evanlucas

### 重要变更

* **buffer**：
  * 让 byteLength 可用于 ArrayBuffer 和 DataView（Jackson Tian）[#5255](https://github.com/nodejs/node/pull/5255)
  * 回移植 --zero-fill-buffers 命令行选项（James M Snell）[#5744](https://github.com/nodejs/node/pull/5744)
  * 回移植新的 buffer 构造函数 API（James M Snell）[#5763](https://github.com/nodejs/node/pull/5763)
  * 添加 swap16() 和 swap32() 方法（James M Snell）[#5724](https://github.com/nodejs/node/pull/5724)
* **fs**：添加 fs.mkdtemp() 函数。（Florian MARGAINE）[#5333](https://github.com/nodejs/node/pull/5333)
* **net**：在 lookup 事件中发出 host（HUANG Wei）[#5598](https://github.com/nodejs/node/pull/5598)
* **node**：`--no-browser-globals` 配置标志（Fedor Indutny）[#5853](https://github.com/nodejs/node/pull/5853)
* **npm**：升级到 v3.8.3。修复了在 HTTP 请求中使用认证令牌时的一个安全漏洞，
  该漏洞可能允许攻击者搭建一个服务器，从命令行界面用户那里收集令牌。
  以前，对于已登录用户，CLI 发出的每个请求都会携带认证令牌，
  不论请求目标是什么。此更新通过仅在针对注册表或当前安装所使用的注册表发起请求时才包含这些令牌来修复该问题。（Forrest L Norvell）[npm/node#6](https://github.com/npm/node/pull/6)
* **repl**：支持独立代码块（Prince J Wesley）[#5581](https://github.com/nodejs/node/pull/5581)
* **src**：使用 cli 选项覆盖 v8 线程默认值（Tom Gallacher）[#4344](https://github.com/nodejs/node/pull/4344)

### 提交

* \[[`2cbbaafca9`](https://github.com/nodejs/node/commit/2cbbaafca9)] - **async\_wrap**：不要在回调异常时中止（Trevor Norris）[#5756](https://github.com/nodejs/node/pull/5756)
* \[[`6f16882733`](https://github.com/nodejs/node/commit/6f16882733)] - **async\_wrap**：如果捕获到异常，则通知 post（Trevor Norris）[#5756](https://github.com/nodejs/node/pull/5756)
* \[[`a4856122d3`](https://github.com/nodejs/node/commit/a4856122d3)] - **async\_wrap**：setupHooks 现在接受对象（Trevor Norris）[#5756](https://github.com/nodejs/node/pull/5756)
* \[[`ee83c956c5`](https://github.com/nodejs/node/commit/ee83c956c5)] - **(SEMVER-MINOR)** **buffer**：让 byteLength 可用于 ArrayBuffer 和 DataView（Jackson Tian）[#5255](https://github.com/nodejs/node/pull/5255)
* \[[`1f8e4b54ce`](https://github.com/nodejs/node/commit/1f8e4b54ce)] - **(SEMVER-MINOR)** **buffer**：添加 swap16() 和 swap32() 方法（James M Snell）[#5724](https://github.com/nodejs/node/pull/5724)
* \[[`bdf933bece`](https://github.com/nodejs/node/commit/bdf933bece)] - **buffer**：将 for 循环中的 let 改回 var（Gareth Ellis）[#5819](https://github.com/nodejs/node/pull/5819)
* \[[`c1534e7eaf`](https://github.com/nodejs/node/commit/c1534e7eaf)] - **(SEMVER-MINOR)** **buffer**：回移植新的 buffer 构造函数 API（James M Snell）[#5763](https://github.com/nodejs/node/pull/5763)
* \[[`3c02727055`](https://github.com/nodejs/node/commit/3c02727055)] - **(SEMVER-MINOR)** **buffer**：回移植 --zero-fill-buffers 命令行选项（James M Snell）[#5744](https://github.com/nodejs/node/pull/5744)
* \[[`58b5c1e19f`](https://github.com/nodejs/node/commit/58b5c1e19f)] - **build**：添加对 x86 架构的支持（Robert Chiras）[#5544](https://github.com/nodejs/node/pull/5544)
* \[[`389f5a85e6`](https://github.com/nodejs/node/commit/389f5a85e6)] - **build**：添加用于创建 Android .mk 文件的脚本（Robert Chiras）[#5544](https://github.com/nodejs/node/pull/5544)
* \[[`5ee5fa292f`](https://github.com/nodejs/node/commit/5ee5fa292f)] - **build**：在 common.gypi 中添加缺失的 `openssl_fips%`（Fedor Indutny）[#5919](https://github.com/nodejs/node/pull/5919)
* \[[`5681ffecf7`](https://github.com/nodejs/node/commit/5681ffecf7)] - **build**：启用 linuxOne 的编译（Michael Dawson）[#5941](https://github.com/nodejs/node/pull/5941)
* \[[`660ec9f889`](https://github.com/nodejs/node/commit/660ec9f889)] - **child\_process**：将 socket\_list 中的 self=this 重构（Benjamin Gruenbaum）[#5860](https://github.com/nodejs/node/pull/5860)
* \[[`0928584444`](https://github.com/nodejs/node/commit/0928584444)] - **deps**：将 npm 升级到 3.8.3（Forrest L Norvell）
* \[[`ec1813199d`](https://github.com/nodejs/node/commit/ec1813199d)] - **deps**：从 v8 上游回移植 8d00c2c（Ben Noordhuis）[#5577](https://github.com/nodejs/node/pull/5577)
* \[[`2a5c6d7006`](https://github.com/nodejs/node/commit/2a5c6d7006)] - **dns**：将 forEach 重构为 map（Benjamin Gruenbaum）[#5803](https://github.com/nodejs/node/pull/5803)
* \[[`6a6112a2f3`](https://github.com/nodejs/node/commit/6a6112a2f3)] - **dns**：在 map 中使用无原型对象（Benjamin Gruenbaum）[#5843](https://github.com/nodejs/node/pull/5843)
* \[[`8fa0b5c1da`](https://github.com/nodejs/node/commit/8fa0b5c1da)] - **doc**：让 @mhdawson 重新加入 CTC（James M Snell）[#5633](https://github.com/nodejs/node/pull/5633)
* \[[`858a524325`](https://github.com/nodejs/node/commit/858a524325)] - **doc**：拼写错误：interal->internal。（Corey Kosak）[#5849](https://github.com/nodejs/node/pull/5849)
* \[[`5676a35bd9`](https://github.com/nodejs/node/commit/5676a35bd9)] - **doc**：解释 path.format 期望的属性（John Eversole）[#5801](https://github.com/nodejs/node/pull/5801)
* \[[`29778393a0`](https://github.com/nodejs/node/commit/29778393a0)] - **doc**：使用一致的事件名参数（Benjamin Gruenbaum）[#5850](https://github.com/nodejs/node/pull/5850)
* \[[`949b17ff6d`](https://github.com/nodejs/node/commit/949b17ff6d)] - **doc**：修复标题后列表的结束标签顺序（firedfox）[#5874](https://github.com/nodejs/node/pull/5874)
* \[[`8e790b7a0c`](https://github.com/nodejs/node/commit/8e790b7a0c)] - **doc**：添加仅签署发布版的说明（Jeremiah Senkpiel）[#5876](https://github.com/nodejs/node/pull/5876)
* \[[`f1f9aff855`](https://github.com/nodejs/node/commit/f1f9aff855)] - **doc**：修复 Buffer.readInt32LE() 的文档（ghaiklor）[#5890](https://github.com/nodejs/node/pull/5890)
* \[[`731f7b8055`](https://github.com/nodejs/node/commit/731f7b8055)] - **etw**：修复事件 9 和 23 的描述符（João Reis）[#5742](https://github.com/nodejs/node/pull/5742)
* \[[`ccd81889fa`](https://github.com/nodejs/node/commit/ccd81889fa)] - **etw,build**：始终生成 .rc 和 .h 文件（João Reis）[#5657](https://github.com/nodejs/node/pull/5657)
* \[[`80155d398c`](https://github.com/nodejs/node/commit/80155d398c)] - **(SEMVER-MINOR)** **fs**：添加 fs.mkdtemp() 函数。（Florian MARGAINE）[#5333](https://github.com/nodejs/node/pull/5333)
* \[[`bb28770aa1`](https://github.com/nodejs/node/commit/bb28770aa1)] - **governance**：移除 CTC 的目标规模（Rich Trott）[#5879](https://github.com/nodejs/node/pull/5879)
* \[[`63c601bc15`](https://github.com/nodejs/node/commit/63c601bc15)] - **http**：加快 checkIsHttpToken 的速度（Jackson Tian）[#4790](https://github.com/nodejs/node/pull/4790)
* \[[`ec6af31eba`](https://github.com/nodejs/node/commit/ec6af31eba)] - **lib**：将 /node.js 重命名为 /bootstrap\_node.js（Jeremiah Senkpiel）[#5103](https://github.com/nodejs/node/pull/5103)
* \[[`91466b855f`](https://github.com/nodejs/node/commit/91466b855f)] - **lib**：使用 startsWith/endsWith 重构代码（Jackson Tian）[#5753](https://github.com/nodejs/node/pull/5753)
* \[[`4bf2acaa1e`](https://github.com/nodejs/node/commit/4bf2acaa1e)] - **lib,src**：将 src/node.js 移动到 lib/internal/node.js（Jeremiah Senkpiel）[#5103](https://github.com/nodejs/node/pull/5103)
* \[[`015cef25eb`](https://github.com/nodejs/node/commit/015cef25eb)] - **lib,src**：将 src/node.js 重构为内部文件（Jeremiah Senkpiel）[#5103](https://github.com/nodejs/node/pull/5103)
* \[[`b07bc5d996`](https://github.com/nodejs/node/commit/b07bc5d996)] - **(SEMVER-MINOR)** **net**：在 lookup 事件中发出 host（HUANG Wei）[#5598](https://github.com/nodejs/node/pull/5598)
* \[[`8363ede855`](https://github.com/nodejs/node/commit/8363ede855)] - **(SEMVER-MINOR)** **node**：`--no-browser-globals` 配置标志（Fedor Indutny）[#5853](https://github.com/nodejs/node/pull/5853)
* \[[`a2ad21645f`](https://github.com/nodejs/node/commit/a2ad21645f)] - **querystring**：不要把坏的代理对字符串化（Brian White）[#5858](https://github.com/nodejs/node/pull/5858)
* \[[`427173204e`](https://github.com/nodejs/node/commit/427173204e)] - **(SEMVER-MINOR)** **repl**：支持独立代码块（Prince J Wesley）[#5581](https://github.com/nodejs/node/pull/5581)
* \[[`bfd723f3ba`](https://github.com/nodejs/node/commit/bfd723f3ba)] - **src**：补上缺失的 `using v8::MaybeLocal`（Anna Henningsen）[#5974](https://github.com/nodejs/node/pull/5974)
* \[[`0d0c57ff5e`](https://github.com/nodejs/node/commit/0d0c57ff5e)] - **(SEMVER-MINOR)** **src**：使用 cli 选项覆盖 v8 线程默认值（Tom Gallacher）[#4344](https://github.com/nodejs/node/pull/4344)
* \[[`f9d0166291`](https://github.com/nodejs/node/commit/f9d0166291)] - **src**：重写命令并添加三元表达式（Trevor Norris）[#5756](https://github.com/nodejs/node/pull/5756)
* \[[`f1488bb24c`](https://github.com/nodejs/node/commit/f1488bb24c)] - **src,http\_parser**：移除 KickNextTick 调用（Trevor Norris）[#5756](https://github.com/nodejs/node/pull/5756)
* \[[`c5c7ae8e14`](https://github.com/nodejs/node/commit/c5c7ae8e14)] - **test**：为 GH-2148 添加 known\_issues 测试（Rich Trott）[#5920](https://github.com/nodejs/node/pull/5920)
* \[[`6113f6af45`](https://github.com/nodejs/node/commit/6113f6af45)] - **test**：缓解不稳定的 test-https-agent（Rich Trott）[#5939](https://github.com/nodejs/node/pull/5939)
* \[[`0acca7654f`](https://github.com/nodejs/node/commit/0acca7654f)] - **test**：修复不稳定的 test-repl（Brian White）[#5914](https://github.com/nodejs/node/pull/5914)
* \[[`aebe6245b7`](https://github.com/nodejs/node/commit/aebe6245b7)] - **test**：为从 stdin 管道传入大输入添加测试（Anna Henningsen）[#5949](https://github.com/nodejs/node/pull/5949)
* \[[`a19de97d2f`](https://github.com/nodejs/node/commit/a19de97d2f)] - **test**：从测试套件中移除 curl 的使用（Santiago Gimeno）[#5750](https://github.com/nodejs/node/pull/5750)
* \[[`6928a17aa3`](https://github.com/nodejs/node/commit/6928a17aa3)] - **test**：为 AIX 排除新的 fs watch 测试（Michael Dawson）[#5937](https://github.com/nodejs/node/pull/5937)
* \[[`3238bff3b3`](https://github.com/nodejs/node/commit/3238bff3b3)] - **test**：确认内部未使用全局变量（Rich Trott）[#5882](https://github.com/nodejs/node/pull/5882)
* \[[`a41fd93f68`](https://github.com/nodejs/node/commit/a41fd93f68)] - **test**：修复不稳定的 test-net-socket-timeout（Brian White）[#5902](https://github.com/nodejs/node/pull/5902)
* \[[`82a50d3def`](https://github.com/nodejs/node/commit/82a50d3def)] - **test**：将 dns 测试移至 test/internet（Ben Noordhuis）[#5905](https://github.com/nodejs/node/pull/5905)
* \[[`fb0c5bcac2`](https://github.com/nodejs/node/commit/fb0c5bcac2)] - **test**：修复不稳定的 test-http-set-timeout（Rich Trott）[#5856](https://github.com/nodejs/node/pull/5856)
* \[[`8344a522a8`](https://github.com/nodejs/node/commit/8344a522a8)] - **test**：修复 test-debugger-client.js（Rich Trott）[#5851](https://github.com/nodejs/node/pull/5851)
* \[[`7ec5397954`](https://github.com/nodejs/node/commit/7ec5397954)] - **timers**：修复 API 引用以使用安全的内部引用（Kyle Simpson）[#5882](https://github.com/nodejs/node/pull/5882)
* \[[`cb676cf3e7`](https://github.com/nodejs/node/commit/cb676cf3e7)] - **tools**：修复 json 文档生成（firedfox）[#5943](https://github.com/nodejs/node/pull/5943)
* \[[`77bed269ad`](https://github.com/nodejs/node/commit/77bed269ad)] - **win,build**：在 test-ci 上构建并测试 addon（Bogdan Lobor）[#5886](https://github.com/nodejs/node/pull/5886)
* \[[`afcd276ecc`](https://github.com/nodejs/node/commit/afcd276ecc)] - **zlib**：修复文件中间 gzip 魔数的处理（Anna Henningsen）[#5863](https://github.com/nodejs/node/pull/5863)

<a id="5.9.1"></a>

## 2016-03-23，版本 5.9.1（稳定版），@Fishrock123

### 重要变更

* **buffer**: 现在在越界写入时会正确抛出 `RangeError`（Matt Loring）[#5605](https://github.com/nodejs/node/pull/5605)。
  * 当未使用 `noAssert` 选项时，这会影响 `write{Float|Double}`。
* **timers**:
  * 返回的 timeout 对象现在具有 `Timeout` 构造函数名称（Jeremiah Senkpiel）[#5793](https://github.com/nodejs/node/pull/5793)。
  * `Immediate` 处理性能现在快了约 \~20-40%（Brian White）[#4169](https://github.com/nodejs/node/pull/4169)。
* **vm**: 修复了 v5.9.0 中引入的一个 contextify 回归问题（Ali Ijaz Sheikh）[#5800](https://github.com/nodejs/node/pull/5800)。

### 提交

* \[[`341b3d01c8`](https://github.com/nodejs/node/commit/341b3d01c8)] - **benchmark**: 修复 lint 错误（Rich Trott）[#5840](https://github.com/nodejs/node/pull/5840)
* \[[`72fb796bed`](https://github.com/nodejs/node/commit/72fb796bed)] - **buffer**: 在截断写入之前抛出范围错误（Matt Loring）[#5605](https://github.com/nodejs/node/pull/5605)
* \[[`c5d83695e1`](https://github.com/nodejs/node/commit/c5d83695e1)] - **contextify**: 绑定 context 和 sandbox 的生命周期（Ali Ijaz Sheikh）[#5800](https://github.com/nodejs/node/pull/5800)
* \[[`ae24d05451`](https://github.com/nodejs/node/commit/ae24d05451)] - **deps**: 删除未使用的 openssl 文件（Ben Noordhuis）[#5619](https://github.com/nodejs/node/pull/5619)
* \[[`54abbe7e6f`](https://github.com/nodejs/node/commit/54abbe7e6f)] - **dns**: 使用模板字符串（Benjamin Gruenbaum）[#5809](https://github.com/nodejs/node/pull/5809)
* \[[`3fef69bf15`](https://github.com/nodejs/node/commit/3fef69bf15)] - **dns**: 统一使用 isIp（Benjamin Gruenbaum）[#5804](https://github.com/nodejs/node/pull/5804)
* \[[`d2d0fe9d34`](https://github.com/nodejs/node/commit/d2d0fe9d34)] - **doc**: 更新 crypto 文档以使用良好的默认值（Bill Automata）[#5505](https://github.com/nodejs/node/pull/5505)
* \[[`1631f06477`](https://github.com/nodejs/node/commit/1631f06477)] - **doc**: 添加 CTC 会议纪要 2016-02-10（Rod Vagg）[#5273](https://github.com/nodejs/node/pull/5273)
* \[[`7ab597d646`](https://github.com/nodejs/node/commit/7ab597d646)] - **doc**: 添加 CTC 会议纪要 2016-02-03（Rod Vagg）[#5272](https://github.com/nodejs/node/pull/5272)
* \[[`e20d0b8802`](https://github.com/nodejs/node/commit/e20d0b8802)] - **doc**: 解释缺少主文件时的错误信息（Wolfgang Steiner）[#5812](https://github.com/nodejs/node/pull/5812)
* \[[`e99082e32d`](https://github.com/nodejs/node/commit/e99082e32d)] - **doc**: 添加一个 CLI 选项文档页面（Jeremiah Senkpiel）[#5787](https://github.com/nodejs/node/pull/5787)
* \[[`0ffd794b27`](https://github.com/nodejs/node/commit/0ffd794b27)] - **doc**: 为 Path.format 添加 Windows 示例（Mithun Patel）[#5700](https://github.com/nodejs/node/pull/5700)
* \[[`f53cc37578`](https://github.com/nodejs/node/commit/f53cc37578)] - **doc**: 改进 timers 文档的语法、清晰度和链接（Bryan English）[#5792](https://github.com/nodejs/node/pull/5792)
* \[[`3ada8cc09a`](https://github.com/nodejs/node/commit/3ada8cc09a)] - **doc**: 使 doc/api/tls.markdown 与样式指南保持一致（Stefano Vozza）[#5706](https://github.com/nodejs/node/pull/5706)
* \[[`5d28ce3942`](https://github.com/nodejs/node/commit/5d28ce3942)] - **doc**: 主题：阻塞与非阻塞（Jarrett Widman）[#5326](https://github.com/nodejs/node/pull/5326)
* \[[`d9b4e15f75`](https://github.com/nodejs/node/commit/d9b4e15f75)] - **doc**: 修复同步 randomBytes 示例中的拼写错误（Andrea Giammarchi）[#5781](https://github.com/nodejs/node/pull/5781)
* \[[`d8318c2226`](https://github.com/nodejs/node/commit/d8318c2226)] - **doc**: 修复 crypto update() 签名（Brian White）[#5500](https://github.com/nodejs/node/pull/5500)
* \[[`15c5662959`](https://github.com/nodejs/node/commit/15c5662959)] - **doc**: 修复 querystring 中多行 return 注释（Claudio Rodriguez）[#5705](https://github.com/nodejs/node/pull/5705)
* \[[`75f723c0aa`](https://github.com/nodejs/node/commit/75f723c0aa)] - **doc**: 修复无效的 path 文档注释（Rich Trott）[#5670](https://github.com/nodejs/node/pull/5670)
* \[[`724b87d75c`](https://github.com/nodejs/node/commit/724b87d75c)] - **doc**: 解释 path.format() 算法（Rich Trott）[#5688](https://github.com/nodejs/node/pull/5688)
* \[[`89df17ed0b`](https://github.com/nodejs/node/commit/89df17ed0b)] - **doc**: 修复 write 方法的返回值（Felix Böhm）[#5736](https://github.com/nodejs/node/pull/5736)
* \[[`5ab51ee151`](https://github.com/nodejs/node/commit/5ab51ee151)] - **doc**: 重新格式化并改进 node.1 手册页（Jeremiah Senkpiel）[#5497](https://github.com/nodejs/node/pull/5497)
* \[[`f34a00cee2`](https://github.com/nodejs/node/commit/f34a00cee2)] - **docs**: 如果 tok 类型是 code，则修复 man pages 链接（Mithun Patel）[#5721](https://github.com/nodejs/node/pull/5721)
* \[[`3bff3111f4`](https://github.com/nodejs/node/commit/3bff3111f4)] - **https**: 修复在使用 keepalive 时 SSL socket 泄漏（Alexander Penev）[#5713](https://github.com/nodejs/node/pull/5713)
* \[[`7b21c09b73`](https://github.com/nodejs/node/commit/7b21c09b73)] - **lib**: 使用 String.prototype.repeat() 简化代码（Jackson Tian）[#5359](https://github.com/nodejs/node/pull/5359)
* \[[`c75f97f43b`](https://github.com/nodejs/node/commit/c75f97f43b)] - **lib**: 减少 `self = this` 的使用（Jackson Tian）[#5231](https://github.com/nodejs/node/pull/5231)
* \[[`1ccf9b4a56`](https://github.com/nodejs/node/commit/1ccf9b4a56)] - **net**: 从旧代码中删除未使用的 `var self = this`（Benjamin Gruenbaum）[#5224](https://github.com/nodejs/node/pull/5224)
* \[[`6e5835b8cd`](https://github.com/nodejs/node/commit/6e5835b8cd)] - **path**: 重构 path.format() 中重复的代码（Rich Trott）[#5673](https://github.com/nodejs/node/pull/5673)
* \[[`15c7b3a127`](https://github.com/nodejs/node/commit/15c7b3a127)] - **src,tools**: 使用模板字符串（Rich Trott）[#5778](https://github.com/nodejs/node/pull/5778)
* \[[`ca971b0d77`](https://github.com/nodejs/node/commit/ca971b0d77)] - **test**: 为更小的 person.jpg 使用更小的块大小（Jérémy Lal）[#5813](https://github.com/nodejs/node/pull/5813)
* \[[`f95fc175eb`](https://github.com/nodejs/node/commit/f95fc175eb)] - **test**: 从 person.jpg 中移除非自由的 ICC 配置文件（Jérémy Lal）[#5813](https://github.com/nodejs/node/pull/5813)
* \[[`7c2c7b0577`](https://github.com/nodejs/node/commit/7c2c7b0577)] - **test**: 从 test-http-1.0 中移除 timer（Santiago Gimeno）[#5129](https://github.com/nodejs/node/pull/5129)
* \[[`70512e51a4`](https://github.com/nodejs/node/commit/70512e51a4)] - **test**: repl tab 补全测试（Santiago Gimeno）[#5534](https://github.com/nodejs/node/pull/5534)
* \[[`89f091d621`](https://github.com/nodejs/node/commit/89f091d621)] - **test**: 改进 test-net-connect-options-ipv6.js（Michael Dawson）[#5791](https://github.com/nodejs/node/pull/5791)
* \[[`d2fa64490f`](https://github.com/nodejs/node/commit/d2fa64490f)] - **test**: 修复 `test-cluster-worker-kill`（Santiago Gimeno）[#5814](https://github.com/nodejs/node/pull/5814)
* \[[`f0d885a0a9`](https://github.com/nodejs/node/commit/f0d885a0a9)] - **test**: 修复不稳定的 test-cluster-shared-leak（Claudio Rodriguez）[#5802](https://github.com/nodejs/node/pull/5802)
* \[[`b352cc7db4`](https://github.com/nodejs/node/commit/b352cc7db4)] - **test**: 最小化 test-http-get-pipeline-problem（Rich Trott）[#5728](https://github.com/nodejs/node/pull/5728)
* \[[`21770c3806`](https://github.com/nodejs/node/commit/21770c3806)] - **test**: 降低 tab complete 测试的脆弱性（Matt Loring）[#5772](https://github.com/nodejs/node/pull/5772)
* \[[`46f0e02620`](https://github.com/nodejs/node/commit/46f0e02620)] - **timers**: 修复来自 4fe02e2 的 lint 问题（Jeremiah Senkpiel）[#5825](https://github.com/nodejs/node/pull/5825)
* \[[`20a68e9eef`](https://github.com/nodejs/node/commit/20a68e9eef)] - **timers**: 为 Timeouts 提供构造函数名称（Jeremiah Senkpiel）[#5793](https://github.com/nodejs/node/pull/5793)
* \[[`d3654d80f3`](https://github.com/nodejs/node/commit/d3654d80f3)] - **timers**: 提升 setImmediate() 性能（Brian White）[#4169](https://github.com/nodejs/node/pull/4169)
* \[[`b1a4870200`](https://github.com/nodejs/node/commit/b1a4870200)] - **tools**: 删除未使用的导入（Sakthipriyan Vairamani）[#5765](https://github.com/nodejs/node/pull/5765)

<a id="5.9.0"></a>

## 2016-03-16，版本 5.9.0（稳定版），@evanlucas

### 重要变更

* **contextify**: 修复了与大量使用 `vm.createContext` 和 `vm.runInNewContext` 相关的内存消耗问题。（Ali Ijaz Sheikh）
  <https://github.com/nodejs/node/pull/5392>
* **governance**: 以下成员已被添加为协作者：
  * Andreas Madsen (@AndreasMadsen)
  * Benjamin Gruenbaum (@benjamingr)
  * Claudio Rodriguez (@claudiorodriguez)
  * Glen Keane (@thekemkid)
  * Jeremy Whitlock (@whitlockjc)
  * Matt Loring (@matthewloring)
  * Phillip Johnsen (@phillipj)
* **lib**: 复制 arguments 对象而不是泄漏它（Nathan Woltman）
  <https://github.com/nodejs/node/pull/4361>
* **src**: 允许同时使用 -i 和 -e 标志（Rich Trott）
  <https://github.com/nodejs/node/pull/5655>
* **timers**: Node.js 内部的 timeouts 现在使用与通过 `setTimeout()` 创建的对象相同的逻辑路径（Jeremiah Senkpiel）[#4007](https://github.com/nodejs/node/pull/4007)
  * 这可能会在某些情况下导致略有不同的性能特征。到目前为止，在大多数情况下它都表现为正面效果。
* **v8**: 从 v8 上游回移植 fb4ccae（Vladimir Krivosheev）#4231
  * 从 v8 中拆分事件，以便更好地支持外部调试器
* **zlib**: 添加对拼接成员的支持（Kári Tristan Helgason）
  <https://github.com/nodejs/node/pull/5120>
  * 之前，如果同一归档中有多个成员，只会读取第一个，其余的会被丢弃。

### 提交

* \[[`03b99bf8b9`](https://github.com/nodejs/node/commit/03b99bf8b9)] - **build**: 不要安装 github 模板（Johan Bergström）[#5612](https://github.com/nodejs/node/pull/5612)
* \[[`a7819da15a`](https://github.com/nodejs/node/commit/a7819da15a)] - _**Revert**_ "**build**: 在测试前运行 lint"（Rich Trott）[#5602](https://github.com/nodejs/node/pull/5602)
* \[[`5e9cac4333`](https://github.com/nodejs/node/commit/5e9cac4333)] - **console**: 检查 stderr 是否可写（Rich Trott）[#5635](https://github.com/nodejs/node/pull/5635)
* \[[`0662fcf209`](https://github.com/nodejs/node/commit/0662fcf209)] - **contextify**: 在局部变量中缓存 sandbox 和 context（Ali Ijaz Sheikh）[#5392](https://github.com/nodejs/node/pull/5392)
* \[[`4f2c839d46`](https://github.com/nodejs/node/commit/4f2c839d46)] - **contextify**: 替换已弃用的 SetWeak 用法（Ali Ijaz Sheikh）[#5392](https://github.com/nodejs/node/pull/5392)
* \[[`bfff07b4dd`](https://github.com/nodejs/node/commit/bfff07b4dd)] - **contextify**: 清理 sandbox 的弱引用（Ali Ijaz Sheikh）[#5392](https://github.com/nodejs/node/pull/5392)
* \[[`93f60cdc54`](https://github.com/nodejs/node/commit/93f60cdc54)] - **contextify**: 清理 global proxy 的弱引用（Ali Ijaz Sheikh）[#5392](https://github.com/nodejs/node/pull/5392)
* \[[`b6c355de0d`](https://github.com/nodejs/node/commit/b6c355de0d)] - **(SEMVER-MINOR)** **deps**: 从 v8 上游回移植 fb4ccae（develar）[#4231](https://github.com/nodejs/node/pull/4231)
* \[[`29510aa4fd`](https://github.com/nodejs/node/commit/29510aa4fd)] - **deps**: 更新 openssl 配置（Shigeki Ohtsu）[#5630](https://github.com/nodejs/node/pull/5630)
* \[[`532d1bf9ce`](https://github.com/nodejs/node/commit/532d1bf9ce)] - **deps**: 将 deps/http_parser 与 nodejs/http_parser 同步（James M Snell）[#5600](https://github.com/nodejs/node/pull/5600)
* \[[`d5d64c327b`](https://github.com/nodejs/node/commit/d5d64c327b)] - **doc**: 澄清提交消息规则（Wyatt Preul）[#5661](https://github.com/nodejs/node/pull/5661)
* \[[`8c4c84fe5b`](https://github.com/nodejs/node/commit/8c4c84fe5b)] - **doc**: 添加 Testing WG（Rich Trott）[#5461](https://github.com/nodejs/node/pull/5461)
* \[[`434af03825`](https://github.com/nodejs/node/commit/434af03825)] - **doc**: 添加关于使用 JSON.stringify() 的说明（Mithun Patel）[#5723](https://github.com/nodejs/node/pull/5723)
* \[[`62926d85bd`](https://github.com/nodejs/node/commit/62926d85bd)] - **doc**: 澄清 zlib 中第一个参数的类型（Kirill Fomichev）[#5685](https://github.com/nodejs/node/pull/5685)
* \[[`eb73574349`](https://github.com/nodejs/node/commit/eb73574349)] - **doc**: 澄清 writable.write 回调何时被调用（Kevin Locke）[#4810](https://github.com/nodejs/node/pull/4810)
* \[[`c579507034`](https://github.com/nodejs/node/commit/c579507034)] - **doc**: 修复 api/addons 中的拼写错误（Daijiro Wachi）[#5678](https://github.com/nodejs/node/pull/5678)
* \[[`8e45c9d9ea`](https://github.com/nodejs/node/commit/8e45c9d9ea)] - **doc**: 修复 api/dgram 中的拼写错误（Daijiro Wachi）[#5678](https://github.com/nodejs/node/pull/5678)
* \[[`44a9b100c5`](https://github.com/nodejs/node/commit/44a9b100c5)] - **doc**: 修复 api/fs 中的拼写错误（Daijiro Wachi）[#5678](https://github.com/nodejs/node/pull/5678)
* \[[`b667573bcb`](https://github.com/nodejs/node/commit/b667573bcb)] - **doc**: 在 README 中更新 fansworld-claudio 用户名（Claudio Rodriguez）[#5680](https://github.com/nodejs/node/pull/5680)
* \[[`9794abb5d1`](https://github.com/nodejs/node/commit/9794abb5d1)] - **doc**: 添加入门资源（Jeremiah Senkpiel）[#3726](https://github.com/nodejs/node/pull/3726)
* \[[`31e39fbd7a`](https://github.com/nodejs/node/commit/31e39fbd7a)] - **doc**: 删除非标准的连字符用法（Stefano Vozza）
* \[[`f3e9daa825`](https://github.com/nodejs/node/commit/f3e9daa825)] - **doc**: 添加关于 fs stat 中 birthtime 的说明（Kári Tristan Helgason）[#5479](https://github.com/nodejs/node/pull/5479)
* \[[`c379ec6522`](https://github.com/nodejs/node/commit/c379ec6522)] - **doc**: 将构建说明移到新文档中（Johan Bergström）[#5634](https://github.com/nodejs/node/pull/5634)
* \[[`2a442b3dfc`](https://github.com/nodejs/node/commit/2a442b3dfc)] - **doc**: 更新 removeListener 行为（Vaibhav）[#5201](https://github.com/nodejs/node/pull/5201)
* \[[`f6ee0996e0`](https://github.com/nodejs/node/commit/f6ee0996e0)] - **doc**: 修复 child_process 文档中的拼写错误（Benjamin Gruenbaum）[#5681](https://github.com/nodejs/node/pull/5681)
* \[[`dd12661173`](https://github.com/nodejs/node/commit/dd12661173)] - **doc**: 在 'unhandledRejection' 示例中包含拼写错误（Robert C Jensen）[#5654](https://github.com/nodejs/node/pull/5654)
* \[[`f7aecd6e94`](https://github.com/nodejs/node/commit/f7aecd6e94)] - **doc**: 将 thekemkid 添加为协作者（Glen Keane）[#5667](https://github.com/nodejs/node/pull/5667)
* \[[`b81711acfb`](https://github.com/nodejs/node/commit/b81711acfb)] - **doc**: 将 phillipj 添加为协作者（Phillip Johnsen）[#5663](https://github.com/nodejs/node/pull/5663)
* \[[`a33f2486f0`](https://github.com/nodejs/node/commit/a33f2486f0)] - **doc**: 将 fansworld-claudio 添加为协作者（Claudio Rodriguez）[#5668](https://github.com/nodejs/node/pull/5668)
* \[[`285d5e7ba6`](https://github.com/nodejs/node/commit/285d5e7ba6)] - **doc**: 将 AndreasMadsen 添加为协作者（Andreas Madsen）[#5666](https://github.com/nodejs/node/pull/5666)
* \[[`8e1f6706e3`](https://github.com/nodejs/node/commit/8e1f6706e3)] - **doc**: 将 benjamingr 添加到协作者列表（Benjamin Gruenbaum）[#5664](https://github.com/nodejs/node/pull/5664)
* \[[`f7842cbb24`](https://github.com/nodejs/node/commit/f7842cbb24)] - **doc**: 将 whitlockjc 添加为协作者（Jeremy Whitlock）[#5665](https://github.com/nodejs/node/pull/5665)
* \[[`dd6f4ec2e4`](https://github.com/nodejs/node/commit/dd6f4ec2e4)] - **doc**: 将 mattloring 添加为协作者（Matt Loring）[#5662](https://github.com/nodejs/node/pull/5662)
* \[[`9ebd559a55`](https://github.com/nodejs/node/commit/9ebd559a55)] - **doc**: 修复 markdown 链接（Steve Mao）[#5641](https://github.com/nodejs/node/pull/5641)
* \[[`62d267e1ff`](https://github.com/nodejs/node/commit/62d267e1ff)] - **doc**: 修复 dns.resolveCname 描述中的拼写错误（axvm）[#5622](https://github.com/nodejs/node/pull/5622)
* \[[`9f8e2e2979`](https://github.com/nodejs/node/commit/9f8e2e2979)] - **doc**: 更新发布推文模板（Jeremiah Senkpiel）[#5628](https://github.com/nodejs/node/pull/5628)
* \[[`4d6fe300fe`](https://github.com/nodejs/node/commit/4d6fe300fe)] - **doc**: 修复 v5.8.0 变更日志标题（Jeremiah Senkpiel）[#5559](https://github.com/nodejs/node/pull/5559)
* \[[`4c1fdaeb2a`](https://github.com/nodejs/node/commit/4c1fdaeb2a)] - **docs**: 更新指向 iojs+release ci 任务的链接（Myles Borins）[#5632](https://github.com/nodejs/node/pull/5632)
* \[[`205bed0bec`](https://github.com/nodejs/node/commit/205bed0bec)] - **lib**: 复制 arguments 对象而不是泄漏它（Nathan Woltman）[#4361](https://github.com/nodejs/node/pull/4361)
* \[[`b16f67a0b9`](https://github.com/nodejs/node/commit/b16f67a0b9)] - **net**: 使 `isIPv4` 和 `isIPv6` 更高效（Vladimir Kurchatkin）[#5478](https://github.com/nodejs/node/pull/5478)
* \[[`4ecd996baa`](https://github.com/nodejs/node/commit/4ecd996baa)] - **(SEMVER-MINOR)** **src**: 允许组合使用 -i 和 -e CLI 标志（Rich Trott）[#5655](https://github.com/nodejs/node/pull/5655)
* \[[`f225459496`](https://github.com/nodejs/node/commit/f225459496)] - **test**: 改进 test-npm-install（Santiago Gimeno）[#5613](https://github.com/nodejs/node/pull/5613)
* \[[`cceae5ae78`](https://github.com/nodejs/node/commit/cceae5ae78)] - **test**: 对一个 strict 函数执行 eval（Kári Tristan Helgason）[#5250](https://github.com/nodejs/node/pull/5250)
* \[[`9a44c8c337`](https://github.com/nodejs/node/commit/9a44c8c337)] - **test**: 添加一批已知问题测试（cjihrig）[#5653](https://github.com/nodejs/node/pull/5653)
* \[[`1b7b1ed2c9`](https://github.com/nodejs/node/commit/1b7b1ed2c9)] - **timers**: 大幅改进代码注释（Jeremiah Senkpiel）[#4007](https://github.com/nodejs/node/pull/4007)
* \[[`769254b0ba`](https://github.com/nodejs/node/commit/769254b0ba)] - **timers**: 重构 timers（Jeremiah Senkpiel）[#4007](https://github.com/nodejs/node/pull/4007)
* \[[`0b545fb3f8`](https://github.com/nodejs/node/commit/0b545fb3f8)] - **win,build**: 支持 Visual C++ Build Tools 2015（João Reis）[#5627](https://github.com/nodejs/node/pull/5627)
* \[[`ef774ff9a8`](https://github.com/nodejs/node/commit/ef774ff9a8)] - **(SEMVER-MINOR)** **zlib**: 添加对拼接成员的支持（Kári Tristan Helgason）[#5120](https://github.com/nodejs/node/pull/5120)

<a id="5.8.0"></a>

## 2016-03-08，版本 5.8.0（稳定版），@Fishrock123

### 重要变更

* **child\_process**: `send()` 现在接受一个 options 参数（cjihrig） [#5283](https://github.com/nodejs/node/pull/5283)。
  * 目前唯一的选项是 `keepOpen`，它会在消息发送后保持底层 socket 处于打开状态。
* **constants**: `ENGINE_METHOD_RSA` 现在已被正确暴露（Sam Roberts） [#5463](https://github.com/nodejs/node/pull/5463)。
* 修复了两个起源于 v5.7.0 的回归问题：
  * **http**: http 客户端回调中的错误现在会正确传播（Trevor Norris） [#5591](https://github.com/nodejs/node/pull/5591)。
  * **path**: 修复了绝对路径的规范化（Evan Lucas） [#5589](https://github.com/nodejs/node/pull/5589)。
* **repl**: `start()` 不再需要 options 参数（cjihrig） [#5388](https://github.com/nodejs/node/pull/5388)。
* **util**: 提升了 `format()` 性能 50-300%（Evan Lucas） [#5360](https://github.com/nodejs/node/pull/5360)。

### 提交

* \[[`12ca84fc7f`](https://github.com/nodejs/node/commit/12ca84fc7f)] - **benchmark**: 添加 util.format 基准测试（Evan Lucas） [#5360](https://github.com/nodejs/node/pull/5360)
* \[[`b955d02266`](https://github.com/nodejs/node/commit/b955d02266)] - **benchmark**: 修复 lint 错误（Rich Trott） [#5517](https://github.com/nodejs/node/pull/5517)
* \[[`2abf866b6e`](https://github.com/nodejs/node/commit/2abf866b6e)] - **build**: 更新 Win 安装程序中的 Node.js 标志（Robert Jefe Lindstaedt） [#5531](https://github.com/nodejs/node/pull/5531)
* \[[`86900f8f2b`](https://github.com/nodejs/node/commit/86900f8f2b)] - **build**: 正确检测 clang 版本（Stefan Budeanu） [#5553](https://github.com/nodejs/node/pull/5553)
* \[[`a3017992e4`](https://github.com/nodejs/node/commit/a3017992e4)] - **(SEMVER-MINOR)** **child\_process**: 为 send() 添加 keepOpen 选项（cjihrig） [#5283](https://github.com/nodejs/node/pull/5283)
* \[[`6d4887ccc2`](https://github.com/nodejs/node/commit/6d4887ccc2)] - **(SEMVER-MINOR)** **child\_process**: 支持 send() 中的 options（cjihrig） [#5283](https://github.com/nodejs/node/pull/5283)
* \[[`9db827c7aa`](https://github.com/nodejs/node/commit/9db827c7aa)] - **(SEMVER-MINOR)** **constants**: 定义 ENGINE\_METHOD\_RSA（Sam Roberts） [#5463](https://github.com/nodejs/node/pull/5463)
* \[[`85013456cd`](https://github.com/nodejs/node/commit/85013456cd)] - **deps**: 升级到 npm 3.7.3（Kat Marchán） [#5369](https://github.com/nodejs/node/pull/5369)
* \[[`67e9f65958`](https://github.com/nodejs/node/commit/67e9f65958)] - **dgram**: 默认发送地址为 127.0.0.1 或 ::1（Matteo Collina） [#5493](https://github.com/nodejs/node/pull/5493)
* \[[`3c92352c8c`](https://github.com/nodejs/node/commit/3c92352c8c)] - **doc**: 记录 test 目录中的各个目录（Michael Barrett） [#5557](https://github.com/nodejs/node/pull/5557)
* \[[`7be726f86a`](https://github.com/nodejs/node/commit/7be726f86a)] - **doc**: 为如何提交文档补丁添加说明（Sequoia McDowell） [#4591](https://github.com/nodejs/node/pull/4591)
* \[[`eb5a95e04a`](https://github.com/nodejs/node/commit/eb5a95e04a)] - **doc**: 修复 fs.symlink 中的拼写错误（Michaël Zasso） [#5560](https://github.com/nodejs/node/pull/5560)
* \[[`9ad901ef44`](https://github.com/nodejs/node/commit/9ad901ef44)] - **doc**: 改进 unhandledException 文档内容（James M Snell） [#5287](https://github.com/nodejs/node/pull/5287)
* \[[`3bd96fdb0f`](https://github.com/nodejs/node/commit/3bd96fdb0f)] - **doc**: 更新链接颜色以与主页一致（silverwind） [#5548](https://github.com/nodejs/node/pull/5548)
* \[[`cb7e4fbac9`](https://github.com/nodejs/node/commit/cb7e4fbac9)] - **doc**: 更新 V8 URL（Craig Akimoto） [#5530](https://github.com/nodejs/node/pull/5530)
* \[[`b54a26fa61`](https://github.com/nodejs/node/commit/b54a26fa61)] - **(SEMVER-MINOR)** **doc**: 更正引擎方法的名称（Sam Roberts） [#5463](https://github.com/nodejs/node/pull/5463)
* \[[`f3971f5817`](https://github.com/nodejs/node/commit/f3971f5817)] - **path**: 修复绝对路径的 normalize（Evan Lucas） [#5589](https://github.com/nodejs/node/pull/5589)
* \[[`e572e421b4`](https://github.com/nodejs/node/commit/e572e421b4)] - **(SEMVER-MINOR)** **repl**: 允许 start() 不传参数（cjihrig） [#5388](https://github.com/nodejs/node/pull/5388)
* \[[`5e6d706758`](https://github.com/nodejs/node/commit/5e6d706758)] - **src,http**: 修复 http 中未捕获的异常漏报（Trevor Norris） [#5591](https://github.com/nodejs/node/pull/5591)
* \[[`9dc94d7b09`](https://github.com/nodejs/node/commit/9dc94d7b09)] - **test**: 将 test-npm-install 添加到并行测试套件（Myles Borins） [#5166](https://github.com/nodejs/node/pull/5166)
* \[[`4f20f31b3e`](https://github.com/nodejs/node/commit/4f20f31b3e)] - **test**: 移除损坏的 debugger 场景（Rich Trott） [#5532](https://github.com/nodejs/node/pull/5532)
* \[[`29e26b38c5`](https://github.com/nodejs/node/commit/29e26b38c5)] - **test**: vm 函数重定义的 bug 复现（cjihrig） [#5528](https://github.com/nodejs/node/pull/5528)
* \[[`e6210d5f50`](https://github.com/nodejs/node/commit/e6210d5f50)] - **test**: 防止 pi2 上的不稳定测试（Trevor Norris） [#5537](https://github.com/nodejs/node/pull/5537)
* \[[`40b36baa2f`](https://github.com/nodejs/node/commit/40b36baa2f)] - **test**: 检查 memoryUsage 属性（Wyatt Preul） [#5546](https://github.com/nodejs/node/pull/5546)
* \[[`048c0f4738`](https://github.com/nodejs/node/commit/048c0f4738)] - **tools**: 降低 cpplint 的输出详细程度（Sakthipriyan Vairamani） [#5578](https://github.com/nodejs/node/pull/5578)
* \[[`7965c897e0`](https://github.com/nodejs/node/commit/7965c897e0)] - **tools**: 启用 no-self-assign ESLint 规则（Rich Trott） [#5552](https://github.com/nodejs/node/pull/5552)
* \[[`5aa17dc136`](https://github.com/nodejs/node/commit/5aa17dc136)] - **tools**: 支持测试已知问题（cjihrig） [#5528](https://github.com/nodejs/node/pull/5528)
* \[[`9a3e87e9a8`](https://github.com/nodejs/node/commit/9a3e87e9a8)] - **tools**: 为基准测试启用 lint 检查（Rich Trott） [#5517](https://github.com/nodejs/node/pull/5517)
* \[[`c4fa2a6715`](https://github.com/nodejs/node/commit/c4fa2a6715)] - **tools**: 在 ESLint 中启用 no-extra-parens（Rich Trott） [#5512](https://github.com/nodejs/node/pull/5512)
* \[[`971edde0cb`](https://github.com/nodejs/node/commit/971edde0cb)] - **util**: 进一步提升 format() 性能（Brian White） [#5360](https://github.com/nodejs/node/pull/5360)
* \[[`c32d460747`](https://github.com/nodejs/node/commit/c32d460747)] - **util**: 提升 util.format 性能（Evan Lucas） [#5360](https://github.com/nodejs/node/pull/5360)

<a id="5.7.1"></a>

## 2016-03-02，版本 5.7.1（稳定版），@Fishrock123

### 重要变更

* **governance**: 核心技术委员会（CTC）新增四名成员，以帮助指导 Node.js 核心开发：Evan Lucas、Rich Trott、Ali Ijaz Sheikh 和 Сковорода Никита Андреевич（Nikita Skovoroda）。
* **openssl**: 从 1.0.2f 升级到 1.0.2g（Ben Noordhuis） [#5507](https://github.com/nodejs/node/pull/5507)。
  * 修复了解析格式错误的 DSA 密钥时可能触发的双重释放缺陷，该缺陷可能被用于 DoS 或内存破坏攻击。该缺陷实际利用起来很可能非常困难，因此对 Node.js 用户而言被视为低严重性。更多信息见 [CVE-2016-0705](https://www.openssl.org/news/vulnerabilities.html#2016-0705)。
  * 修复了一个在极少数情况下可能导致内存破坏的缺陷，相关于内部 `BN_hex2bn()` 和 `BN_dec2bn()` 函数。据信 Node.js 并不会调用使用这些函数的代码路径，因此通过 Node.js 利用该缺陷进行实际攻击 _不太可能_ 成功。更多信息见 [CVE-2016-0797](https://www.openssl.org/news/vulnerabilities.html#2016-0797)。
  * 修复了使 _[CacheBleed Attack](https://ssrg.nicta.com.au/projects/TS/cachebleed/)_ 成为可能的缺陷。该缺陷使攻击者能够执行侧信道攻击，从而可能恢复整个 RSA 私钥。它仅影响使用超线程的 Intel Sandy Bridge（以及可能更早的）微架构。包括 Haswell 在内的新一代微架构不受影响。更多信息见 [CVE-2016-0702](https://www.openssl.org/news/vulnerabilities.html#2016-0702)。
* 修复了 v5.7.0 中出现的若干回归问题：
  * **`path.relative()`**:
    * 输出不再包含不必要的冗长内容（Brian White） [#5389](https://github.com/nodejs/node/pull/5389)。
    * 现在在 Windows 上解析 UNC 路径可以正常工作（Owen Smith） [#5456](https://github.com/nodejs/node/pull/5456)。
    * 现在从根目录解析带前缀的路径可以正常工作（Owen Smith） [#5490](https://github.com/nodejs/node/pull/5490)。
  * **url**: 修复了 `parse()` 的越界一位错误（Brian White） [#5394](https://github.com/nodejs/node/pull/5394)。
  * **dgram**: 现在在指定 offset 和 length 时能正确处理默认地址情况（Matteo Collina） [#5407](https://github.com/nodejs/node/pull/5407)。

### 提交

* \[[`7cae774d9b`](https://github.com/nodejs/node/commit/7cae774d9b)] - **benchmark**: 重构以消除重复声明的变量（Rich Trott） [#5468](https://github.com/nodejs/node/pull/5468)
* \[[`6aebe16669`](https://github.com/nodejs/node/commit/6aebe16669)] - **benchmark**: 为 buf.compare() 添加基准测试（Rich Trott） [#5441](https://github.com/nodejs/node/pull/5441)
* \[[`00660f55c8`](https://github.com/nodejs/node/commit/00660f55c8)] - **benchmark**: 将 string-decoder 移到其自己的类别中（Andreas Madsen） [#5177](https://github.com/nodejs/node/pull/5177)
* \[[`4650cb3818`](https://github.com/nodejs/node/commit/4650cb3818)] - **benchmark**: 修复配置参数（Andreas Madsen） [#5177](https://github.com/nodejs/node/pull/5177)
* \[[`3ccb275139`](https://github.com/nodejs/node/commit/3ccb275139)] - **benchmark**: 将 url.js 与 url-resolve.js 合并（Andreas Madsen） [#5177](https://github.com/nodejs/node/pull/5177)
* \[[`c1e7dbffaa`](https://github.com/nodejs/node/commit/c1e7dbffaa)] - **benchmark**: 将 misc 移到分类目录中（Andreas Madsen） [#5177](https://github.com/nodejs/node/pull/5177)
* \[[`2f9fee6e8e`](https://github.com/nodejs/node/commit/2f9fee6e8e)] - **benchmark**: 使用严格模式（Rich Trott） [#5336](https://github.com/nodejs/node/pull/5336)
* \[[`4c09e7f359`](https://github.com/nodejs/node/commit/4c09e7f359)] - **build**: 从 eslint 调用中移除 --quiet（firedfox） [#5519](https://github.com/nodejs/node/pull/5519)
* \[[`2c619f2012`](https://github.com/nodejs/node/commit/2c619f2012)] - **build**: 在测试前运行 lint（Rich Trott） [#5470](https://github.com/nodejs/node/pull/5470)
* \[[`f349a9a2cf`](https://github.com/nodejs/node/commit/f349a9a2cf)] - **build**: 更新 OSX 安装程序中的 Node.js 标志（Rod Vagg） [#5401](https://github.com/nodejs/node/pull/5401)
* \[[`88f393588a`](https://github.com/nodejs/node/commit/88f393588a)] - **crypto**: PBKDF2 使用 `int` 而不是 `ssize_t`（Fedor Indutny） [#5397](https://github.com/nodejs/node/pull/5397)
* \[[`1e86804503`](https://github.com/nodejs/node/commit/1e86804503)] - **deps**: 将 openssl 升级到 1.0.2g（Ben Noordhuis） [#5507](https://github.com/nodejs/node/pull/5507)
* \[[`d3f9b84be8`](https://github.com/nodejs/node/commit/d3f9b84be8)] - **dgram**: 在指定 offset 和 length 时处理默认地址情况（Matteo Collina）
* \[[`f1f3832934`](https://github.com/nodejs/node/commit/f1f3832934)] - **doc**: 更新 ROADMAP.md 和 doc/releases.md 中的 NAN URL（ronkorving） [#5472](https://github.com/nodejs/node/pull/5472)
* \[[`51bc062dab`](https://github.com/nodejs/node/commit/51bc062dab)] - **doc**: 添加 2016-02-17 的 CTC 会议纪要（Rod Vagg） [#5410](https://github.com/nodejs/node/pull/5410)
* \[[`795c85ba1c`](https://github.com/nodejs/node/commit/795c85ba1c)] - **doc**: 修复 child\_process 文档中的拼写错误（Evan Lucas） [#5474](https://github.com/nodejs/node/pull/5474)
* \[[`0a56e9690b`](https://github.com/nodejs/node/commit/0a56e9690b)] - **doc**: 为二进制安全字符串读取添加说明（Anton Andesen） [#5155](https://github.com/nodejs/node/pull/5155)
* \[[`ea8331e15f`](https://github.com/nodejs/node/commit/ea8331e15f)] - **doc**: 改进 crypto.markdown 的文案（Alexander Makarenko） [#5230](https://github.com/nodejs/node/pull/5230)
* \[[`378a772034`](https://github.com/nodejs/node/commit/378a772034)] - **doc**: 在大小写不敏感系统上的 `require` 行为（Hugo Wood）
* \[[`06b7eb6636`](https://github.com/nodejs/node/commit/06b7eb6636)] - **doc**: 记录 base64url 编码支持（Tristan Slominski） [#5243](https://github.com/nodejs/node/pull/5243)
* \[[`8ec3d904cb`](https://github.com/nodejs/node/commit/8ec3d904cb)] - **doc**: 改进 httpVersionMajor / httpVersionMajor（Jackson Tian） [#5296](https://github.com/nodejs/node/pull/5296)
* \[[`534e88f56c`](https://github.com/nodejs/node/commit/534e88f56c)] - **doc**: 修复 net 文档中的相对链接（Evan Lucas） [#5358](https://github.com/nodejs/node/pull/5358)
* \[[`7b98a30976`](https://github.com/nodejs/node/commit/7b98a30976)] - **doc**: 修复 crypto 函数的缩进级别（Brian White） [#5460](https://github.com/nodejs/node/pull/5460)
* \[[`c0fd802cc2`](https://github.com/nodejs/node/commit/c0fd802cc2)] - **doc**: 链接到手册页（<dcposch@dcpos.ch>） [#5073](https://github.com/nodejs/node/pull/5073)
* \[[`f8c6701e22`](https://github.com/nodejs/node/commit/f8c6701e22)] - **doc**: 在 cluster 示例中添加缺失的属性（Rafael Cepeda） [#5305](https://github.com/nodejs/node/pull/5305)
* \[[`3bfe0483f0`](https://github.com/nodejs/node/commit/3bfe0483f0)] - **doc**: 更正 socket.send 中参数的名称（Chris Dew） [#5449](https://github.com/nodejs/node/pull/5449)
* \[[`c8725f5e95`](https://github.com/nodejs/node/commit/c8725f5e95)] - **doc**: 修复 tls、cluster 文档中的链接（Alexander Makarenko） [#5364](https://github.com/nodejs/node/pull/5364)
* \[[`7f2cf9af5c`](https://github.com/nodejs/node/commit/7f2cf9af5c)] - **doc**: 在 readme 中明确说明对 VS 2015 的支持（Phillip Johnsen） [#5406](https://github.com/nodejs/node/pull/5406)
* \[[`12d3cdbfea`](https://github.com/nodejs/node/commit/12d3cdbfea)] - **doc**: 从内部文档中移除过时内容（Rich Trott） [#5421](https://github.com/nodejs/node/pull/5421)
* \[[`43853679f7`](https://github.com/nodejs/node/commit/43853679f7)] - **doc**: 编辑 util 文档文案（Rich Trott） [#5399](https://github.com/nodejs/node/pull/5399)
* \[[`903e8d09e1`](https://github.com/nodejs/node/commit/903e8d09e1)] - **doc**: 修复 pbkdf2Sync 代码示例中的拼写错误（Marc Cuva） [#5306](https://github.com/nodejs/node/pull/5306)
* \[[`79b1c22c9f`](https://github.com/nodejs/node/commit/79b1c22c9f)] - **doc**: 修复 buf.readInt16LE 输出（Chinedu Francis Nwafili） [#5282](https://github.com/nodejs/node/pull/5282)
* \[[`e46915f2f3`](https://github.com/nodejs/node/commit/e46915f2f3)] - **doc**: 注明 util.isError() @@toStringTag 的限制（cjihrig） [#5414](https://github.com/nodejs/node/pull/5414)
* \[[`935fd21fff`](https://github.com/nodejs/node/commit/935fd21fff)] - **doc**: 澄清 net.createServer 中的错误处理（Dirceu Pereira Tiegs） [#5353](https://github.com/nodejs/node/pull/5353)
* \[[`93dce6d4fe`](https://github.com/nodejs/node/commit/93dce6d4fe)] - **doc**: 记录 fs.datasync(Sync)（Ron Korving） [#5402](https://github.com/nodejs/node/pull/5402)
* \[[`96daf51358`](https://github.com/nodejs/node/commit/96daf51358)] - **doc**: 将 Evan Lucas 加入 CTC（Rod Vagg） [#5275](https://github.com/nodejs/node/pull/5275)
* \[[`31b405d0cf`](https://github.com/nodejs/node/commit/31b405d0cf)] - **doc**: 将 Rich Trott 加入 CTC（Rod Vagg） [#5276](https://github.com/nodejs/node/pull/5276)
* \[[`bcd154e402`](https://github.com/nodejs/node/commit/bcd154e402)] - **doc**: 将 Ali Ijaz Sheikh 加入 CTC（Rod Vagg） [#5277](https://github.com/nodejs/node/pull/5277)
* \[[`9d0330c804`](https://github.com/nodejs/node/commit/9d0330c804)] - **doc**: 将 Сковорода Никита Андреевич 加入 CTC（Rod Vagg） [#5278](https://github.com/nodejs/node/pull/5278)
* \[[`365cc63783`](https://github.com/nodejs/node/commit/365cc63783)] - **doc**: 添加“使用 ninja 构建 node”指南（Jeremiah Senkpiel） [#4767](https://github.com/nodejs/node/pull/4767)
* \[[`2b00c315e1`](https://github.com/nodejs/node/commit/2b00c315e1)] - **doc**: 在 deepStrictEqual() 中提及 prototype 检查（cjihrig） [#5367](https://github.com/nodejs/node/pull/5367)
* \[[`ff988b3ee6`](https://github.com/nodejs/node/commit/ff988b3ee6)] - **doc,tools,test**: 为基于文档的 addon 测试添加 lint 检查（Rich Trott） [#5427](https://github.com/nodejs/node/pull/5427)
* \[[`d77c3bf204`](https://github.com/nodejs/node/commit/d77c3bf204)] - **http\_parser**: 使用 `MakeCallback`（Trevor Norris） [#5419](https://github.com/nodejs/node/pull/5419)
* \[[`e3421ac296`](https://github.com/nodejs/node/commit/e3421ac296)] - **lib**: freelist: 使用 .pop() 进行分配（Anton Khlynovskiy） [#2174](https://github.com/nodejs/node/pull/2174)
* \[[`91d218d096`](https://github.com/nodejs/node/commit/91d218d096)] - **path**: 修复根目录前缀的 path.relative()（Owen Smith） [#5490](https://github.com/nodejs/node/pull/5490)
* \[[`ef7a088906`](https://github.com/nodejs/node/commit/ef7a088906)] - **path**: 修复 win32 parse()（Zheng Chaoping） [#5484](https://github.com/nodejs/node/pull/5484)
* \[[`871396ce8f`](https://github.com/nodejs/node/commit/871396ce8f)] - **path**: 修复 UNC 路径的 win32 relative()（Owen Smith） [#5456](https://github.com/nodejs/node/pull/5456)
* \[[`91782f1888`](https://github.com/nodejs/node/commit/91782f1888)] - **path**: 修复当 "to" 是前缀时的 win32 relative()（Owen Smith） [#5456](https://github.com/nodejs/node/pull/5456)
* \[[`30cec18eeb`](https://github.com/nodejs/node/commit/30cec18eeb)] - **path**: 修复冗长的 relative() 输出（Brian White） [#5389](https://github.com/nodejs/node/pull/5389)
* \[[`2b88523836`](https://github.com/nodejs/node/commit/2b88523836)] - **repl**: 修复严格模式下堆栈跟踪的列号（Prince J Wesley） [#5416](https://github.com/nodejs/node/pull/5416)
* \[[`51db48f741`](https://github.com/nodejs/node/commit/51db48f741)] - **src,tools**: 从源码数组中移除 null 哨兵值（Ben Noordhuis） [#5418](https://github.com/nodejs/node/pull/5418)
* \[[`03a5daba55`](https://github.com/nodejs/node/commit/03a5daba55)] - **src,tools**: 从内置源代码中去掉 nul 字节（Ben Noordhuis） [#5418](https://github.com/nodejs/node/pull/5418)
* \[[`17d14f3346`](https://github.com/nodejs/node/commit/17d14f3346)] - **src,tools**: 允许内置 js 源代码中包含 utf-8（Ben Noordhuis） [#5418](https://github.com/nodejs/node/pull/5418)
* \[[`12ae6abc69`](https://github.com/nodejs/node/commit/12ae6abc69)] - **test**: 增加 test-tls-fast-writing 的超时时间（Rich Trott） [#5466](https://github.com/nodejs/node/pull/5466)
* \[[`81348e8855`](https://github.com/nodejs/node/commit/81348e8855)] - **test**: 将 Linux 规避方案仅应用于 Linux（Rich Trott） [#5471](https://github.com/nodejs/node/pull/5471)
* \[[`c4d9cdb7d0`](https://github.com/nodejs/node/commit/c4d9cdb7d0)] - **test**: 允许 v8 测试使用 options（Michael Dawson） [#5502](https://github.com/nodejs/node/pull/5502)
* \[[`d1a82c6824`](https://github.com/nodejs/node/commit/d1a82c6824)] - **test**: 针对已知的 SmartOS bug 重试（Rich Trott） [#5454](https://github.com/nodejs/node/pull/5454)
* \[[`c7f8a13043`](https://github.com/nodejs/node/commit/c7f8a13043)] - **test**: 移除不需要的 bind() 及相关注释（Aayush Naik） [#5023](https://github.com/nodejs/node/pull/5023)
* \[[`cc4cbb10df`](https://github.com/nodejs/node/commit/cc4cbb10df)] - **test**: 修复不稳定的 child-process-fork-regr-gh-2847（Santiago Gimeno） [#5422](https://github.com/nodejs/node/pull/5422)
* \[[`0ebbf6cd53`](https://github.com/nodejs/node/commit/0ebbf6cd53)] - **test**: 从已修复测试中移除 flaky 标记（Rich Trott） [#5459](https://github.com/nodejs/node/pull/5459)
* \[[`c83725c604`](https://github.com/nodejs/node/commit/c83725c604)] - **test**: 为 posix path.relative() 添加测试用例（Owen Smith） [#5456](https://github.com/nodejs/node/pull/5456)
* \[[`22bb7c9d27`](https://github.com/nodejs/node/commit/22bb7c9d27)] - **test**: 修复 test runner 参数回归（Stefan Budeanu） [#5446](https://github.com/nodejs/node/pull/5446)
* \[[`8c67b94b11`](https://github.com/nodejs/node/commit/8c67b94b11)] - **test**: 重构 test-dgram-send-callback-recursive（Santiago Gimeno） [#5079](https://github.com/nodejs/node/pull/5079)
* \[[`2c21d34a2f`](https://github.com/nodejs/node/commit/2c21d34a2f)] - **test**: 重构 test-dgram-udp4（Santiago Gimeno） [#5339](https://github.com/nodejs/node/pull/5339)
* \[[`479a43c876`](https://github.com/nodejs/node/commit/479a43c876)] - **test**: 允许向可执行文件传递参数（Stefan Budeanu） [#5376](https://github.com/nodejs/node/pull/5376)
* \[[`ff75023812`](https://github.com/nodejs/node/commit/ff75023812)] - **test**: 修复 OS X 上的 test-timers.reliability（Rich Trott） [#5379](https://github.com/nodejs/node/pull/5379)
* \[[`991f82b4bd`](https://github.com/nodejs/node/commit/991f82b4bd)] - **test**: 缓解不稳定的 test-http-agent（Rich Trott） [#5346](https://github.com/nodejs/node/pull/5346)
* \[[`0f54553a99`](https://github.com/nodejs/node/commit/0f54553a99)] - **test**: 增加部分 unref timers 测试的超时时间（Jeremiah Senkpiel） [#5352](https://github.com/nodejs/node/pull/5352)
* \[[`25c01cd779`](https://github.com/nodejs/node/commit/25c01cd779)] - **tls**: 修复 context.\_external accessor 中的断言（Ben Noordhuis） [#5521](https://github.com/nodejs/node/pull/5521)
* \[[`5ffd7430d1`](https://github.com/nodejs/node/commit/5ffd7430d1)] - **tools**: 仅将自定义 buffer lint 规则应用于 /lib（Rich Trott） [#5371](https://github.com/nodejs/node/pull/5371)
* \[[`fa5d28f246`](https://github.com/nodejs/node/commit/fa5d28f246)] - **tools**: 启用更多 lint 规则（Rich Trott） [#5357](https://github.com/nodejs/node/pull/5357)
* \[[`b44b701e5b`](https://github.com/nodejs/node/commit/b44b701e5b)] - **tools,benchmark**: 提高 lint 合规性（Rich Trott） [#5429](https://github.com/nodejs/node/pull/5429)
* \[[`9424fa5732`](https://github.com/nodejs/node/commit/9424fa5732)] - **url**: 按协议名称对带斜杠的协议分组（nettofarah） [#5380](https://github.com/nodejs/node/pull/5380)
* \[[`dfe45f13e7`](https://github.com/nodejs/node/commit/dfe45f13e7)] - **url**: 修复 parse() 的越界一位错误（Brian White） [#5394](https://github.com/nodejs/node/pull/5394)

<a id="5.7.0"></a>

## 2016-02-23，版本 5.7.0（稳定版），@rvagg

### 重要变更

* **buffer**：
  * 现在在填充 Buffer 时可以提供 `encoding` 参数 `Buffer#fill(string[, start[, end]][, encoding])`，向现有 Buffer 传入也同样适用于 `Buffer#fill(buffer[, start[, end]])`。有关其工作方式的详细信息，请参阅 [API 文档](https://nodejs.org/api/buffer.html#buffer_buf_fill_value_offset_end_encoding)。(Trevor Norris) [#4935](https://github.com/nodejs/node/pull/4935)
  * 如果你还希望指定 `encoding`，`Buffer#indexOf()` 不再要求提供 `byteOffset` 参数：`Buffer#indexOf(val[, byteOffset][, encoding])`。(Trevor Norris) [#4803](https://github.com/nodejs/node/pull/4803)
* **child\_process**：`spawn()` 和 `spawnSync()` 现在支持 `'shell'` 选项，允许可选地在 shell 中执行给定命令。如果设置为 `true`，Windows 上将使用 `cmd.exe`，其他平台上使用 `/bin/sh`。也可以传入自定义 shell 的路径以覆盖这些默认值。在 Windows 上，此选项允许通过 `spawn()` 和 `spawnSync()` 执行 `.bat.` 和 `.cmd` 文件。(Colin Ihrig) [#4598](https://github.com/nodejs/node/pull/4598)
* **http\_parser**：更新到 http-parser 2.6.2，以修复对允许的头部字符存在的一个无意中过于严格的限制 (James M Snell) [#5237](https://github.com/nodejs/node/pull/5237)
* **dgram**：`socket.send()` 现在支持将 Buffers 或 Strings 数组作为第一个参数。有关其工作方式的详细信息，请参阅 [API 文档](https://nodejs.org/download/nightly/v6.0.0-nightly201602102848f84332/docs/api/dgram.html#dgram_socket_send_msg_offset_length_port_address_callback)。(Matteo Collina) [#4374](https://github.com/nodejs/node/pull/4374)
* **http**：修复一个 bug：处理头部时会错误地触发 `'upgrade'` 事件，而实际上服务器只是在声明其支持的协议。这个 bug 会阻止 HTTP 客户端与启用 HTTP/2 的服务器通信。(Fedor Indutny) [#4337](https://github.com/nodejs/node/pull/4337)
* **net**：为 `net` 和 `http` 服务器添加了 `listening` 布尔属性，用于指示服务器是否正在监听连接。(José Moreira) [#4743](https://github.com/nodejs/node/pull/4743)
* **node**：C++ `node::MakeCallback()` API 现在是可重入的，在另一个 `MakeCallback()` 调用内部再次调用它，不再会导致 `nextTick` 队列或 Promises 微任务队列以错误顺序处理。(Trevor Norris) [#4507](https://github.com/nodejs/node/pull/4507)
* **tls**：新增 `tlsSocket.getProtocol()` 方法，用于获取当前连接协商得到的 TLS 协议版本。(Brian White) [#4995](https://github.com/nodejs/node/pull/4995)
* **vm**：为 `new vm.Script()` 引入新的 `'produceCachedData'` 和 `'cachedData'` 选项，以便与 V8 的代码缓存交互。当创建新的 `vm.Script` 对象时，如果将 `'produceCachedData'` 设为 `true`，就会生成一个包含 V8 代码缓存数据的 `Buffer`，并将其存储在返回对象的 `cachedData` 属性中。随后，如果提供的源码相同，这些数据还可以通过 `'cachedData'` 选项传回给另一个 `vm.Script()` 对象。从缓存数据成功执行脚本可以加快实例化时间。有关详细信息，请参阅 [API 文档](https://nodejs.org/api/vm.html#vm_new_vm_script_code_options)。(Fedor Indutny) [#4777](https://github.com/nodejs/node/pull/4777)
* **performance**：以下方面有所改进：
  * `process.nextTick()` (Ruben Bridgewater) [#5092](https://github.com/nodejs/node/pull/5092)
  * `path` 模块 (Brian White) [#5123](https://github.com/nodejs/node/pull/5123)
  * `querystring` 模块 (Brian White) [#5012](https://github.com/nodejs/node/pull/5012)
  * 处理小块数据时的 `streams` 模块 (Matteo Collina) [#4354](https://github.com/nodejs/node/pull/4354)

### 提交

* \[[`3a96fa0030`](https://github.com/nodejs/node/commit/3a96fa0030)] - **async\_wrap**：在 init hook 中添加 parent uid (Andreas Madsen) [#4600](https://github.com/nodejs/node/pull/4600)
* \[[`4ef04c7c4c`](https://github.com/nodejs/node/commit/4ef04c7c4c)] - **async\_wrap**：将 uid 作为 init 中的第一个参数 (Andreas Madsen) [#4600](https://github.com/nodejs/node/pull/4600)
* \[[`4afe801f90`](https://github.com/nodejs/node/commit/4afe801f90)] - **async\_wrap**：为所有 asyncWrap hooks 添加 uid (Andreas Madsen) [#4600](https://github.com/nodejs/node/pull/4600)
* \[[`edf8f8a7da`](https://github.com/nodejs/node/commit/edf8f8a7da)] - **benchmark**：拆分 path 基准测试 (Brian White) [#5123](https://github.com/nodejs/node/pull/5123)
* \[[`8d713d8d51`](https://github.com/nodejs/node/commit/8d713d8d51)] - **benchmark**：允许空参数 (Brian White) [#5123](https://github.com/nodejs/node/pull/5123)
* \[[`eb6d07327a`](https://github.com/nodejs/node/commit/eb6d07327a)] - **(SEMVER-MINOR)** **buffer**：为 fill() 添加 encoding 参数 (Trevor Norris) [#4935](https://github.com/nodejs/node/pull/4935)
* \[[`60d2048b6c`](https://github.com/nodejs/node/commit/60d2048b6c)] - **(SEMVER-MINOR)** **buffer**：正确获取 needle 的二进制长度 (Trevor Norris) [#4803](https://github.com/nodejs/node/pull/4803)
* \[[`4c67d74607`](https://github.com/nodejs/node/commit/4c67d74607)] - **(SEMVER-MINOR)** **buffer**：允许 encoding 参数折叠 (Trevor Norris) [#4803](https://github.com/nodejs/node/pull/4803)
* \[[`5fa4117bfc`](https://github.com/nodejs/node/commit/5fa4117bfc)] - **build**：添加帮助消息并移除一个 TODO。(Ojas Shirekar) [#5080](https://github.com/nodejs/node/pull/5080)
* \[[`09bfb865af`](https://github.com/nodejs/node/commit/09bfb865af)] - **build**：移除 configure 中多余的 TODO (Ojas Shirekar) [#5080](https://github.com/nodejs/node/pull/5080)
* \[[`3dfc11c516`](https://github.com/nodejs/node/commit/3dfc11c516)] - **build**：移除 Makefile.build (Ojas Shirekar) [#5080](https://github.com/nodejs/node/pull/5080)
* \[[`fc78d3d6a7`](https://github.com/nodejs/node/commit/fc78d3d6a7)] - **build**：如果找不到 WiX，则跳过 msi 构建 (Tsarevich Dmitry) [#5220](https://github.com/nodejs/node/pull/5220)
* \[[`356acb39d7`](https://github.com/nodejs/node/commit/356acb39d7)] - **build**：将 aarch64 视为 arm64 (Johan Bergström) [#5191](https://github.com/nodejs/node/pull/5191)
* \[[`3b83d42b4a`](https://github.com/nodejs/node/commit/3b83d42b4a)] - **build**：修复 python 路径包含空格时的构建问题 (Felix Becker) [#4841](https://github.com/nodejs/node/pull/4841)
* \[[`9e6ad2d8ff`](https://github.com/nodejs/node/commit/9e6ad2d8ff)] - **child\_process**：修复 readable 事件中的数据丢失 (Brian White) [#5036](https://github.com/nodejs/node/pull/5036)
* \[[`ecc797600f`](https://github.com/nodejs/node/commit/ecc797600f)] - **(SEMVER-MINOR)** **child\_process**：为 spawn() 添加 shell 选项 (cjihrig) [#4598](https://github.com/nodejs/node/pull/4598)
* \[[`efd6f68dce`](https://github.com/nodejs/node/commit/efd6f68dce)] - **cluster**：不要依赖 `fork` 中的 `this` (Igor Klopov) [#5216](https://github.com/nodejs/node/pull/5216)
* \[[`df93d60caf`](https://github.com/nodejs/node/commit/df93d60caf)] - **console**：对 util.format 使用 null 作为 `this` (Jackson Tian) [#5222](https://github.com/nodejs/node/pull/5222)
* \[[`c397ba8fa3`](https://github.com/nodejs/node/commit/c397ba8fa3)] - **contextify**：使用来自 Uint8Array 的 offset/length (Fedor Indutny) [#4947](https://github.com/nodejs/node/pull/4947)
* \[[`3048ac0b57`](https://github.com/nodejs/node/commit/3048ac0b57)] - **crypto**：让修复后的 NodeBIO 返回 EOF (Adam Langley) [#5105](https://github.com/nodejs/node/pull/5105)
* \[[`af074846f5`](https://github.com/nodejs/node/commit/af074846f5)] - **debugger**：移除不需要的回调检查 (Rich Trott) [#5319](https://github.com/nodejs/node/pull/5319)
* \[[`7bac743f36`](https://github.com/nodejs/node/commit/7bac743f36)] - **debugger**：在访问 this.binding 之前断言测试 (Prince J Wesley) [#5145](https://github.com/nodejs/node/pull/5145)
* \[[`18c94e5a8d`](https://github.com/nodejs/node/commit/18c94e5a8d)] - **deps**：移除不必要的文件 (Brian White) [#5212](https://github.com/nodejs/node/pull/5212)
* \[[`967cf97bf0`](https://github.com/nodejs/node/commit/967cf97bf0)] - **deps**：从 v8 的 4.8 upstream 挑选提交 2e4da65 (Michael Dawson) [#5293](https://github.com/nodejs/node/pull/5293)
* \[[`bbdf2684d5`](https://github.com/nodejs/node/commit/bbdf2684d5)] - **deps**：更新到 http-parser 2.6.2 (James M Snell) [#5237](https://github.com/nodejs/node/pull/5237)
* \[[`127dd6275a`](https://github.com/nodejs/node/commit/127dd6275a)] - _**Revert**_ "**deps**：与上游 c-ares/c-ares\@4ef6817 同步" (Ben Noordhuis) [#5199](https://github.com/nodejs/node/pull/5199)
* \[[`35c3832994`](https://github.com/nodejs/node/commit/35c3832994)] - **deps**：与上游 c-ares/c-ares\@4ef6817 同步 (Fedor Indutny) [#5199](https://github.com/nodejs/node/pull/5199)
* \[[`b4db31822f`](https://github.com/nodejs/node/commit/b4db31822f)] - **dgram**：限定重新声明的变量作用域 (Rich Trott) [#4940](https://github.com/nodejs/node/pull/4940)
* \[[`368c1d1098`](https://github.com/nodejs/node/commit/368c1d1098)] - **(SEMVER-MINOR)** **dgram**：支持使用多个 buffers 的 dgram.send (Matteo Collina) [#4374](https://github.com/nodejs/node/pull/4374)
* \[[`a8862f59eb`](https://github.com/nodejs/node/commit/a8862f59eb)] - **doc**：将仓库文档更新为使用 'CTC' (Alexis Campailla) [#5304](https://github.com/nodejs/node/pull/5304)
* \[[`6cf8ec5bd1`](https://github.com/nodejs/node/commit/6cf8ec5bd1)] - **doc**：将 Myles Borins 的 GitHub 链接中的 http 改为 https (Rod Vagg) [#5356](https://github.com/nodejs/node/pull/5356)
* \[[`0389e3803c`](https://github.com/nodejs/node/commit/0389e3803c)] - **doc**：澄清 child\_process.execFile{,Sync} 的 file 参数 (Kevin Locke) [#5310](https://github.com/nodejs/node/pull/5310)
* \[[`c48290d9b7`](https://github.com/nodejs/node/commit/c48290d9b7)] - **doc**：修复 buf.length slice 示例 (Chinedu Francis Nwafili) [#5259](https://github.com/nodejs/node/pull/5259)
* \[[`a6e437c619`](https://github.com/nodejs/node/commit/a6e437c619)] - **doc**：修复 buffer\[index] 示例 (Chinedu Francis Nwafili) [#5253](https://github.com/nodejs/node/pull/5253)
* \[[`73ef1bd423`](https://github.com/nodejs/node/commit/73ef1bd423)] - **doc**：修复模板字符串 (Rafael Cepeda) [#5240](https://github.com/nodejs/node/pull/5240)
* \[[`fa04daa384`](https://github.com/nodejs/node/commit/fa04daa384)] - **doc**：澄清 uncaughtException 期间的异常 (Noah Rose) [#5180](https://github.com/nodejs/node/pull/5180)
* \[[`22f132e61d`](https://github.com/nodejs/node/commit/22f132e61d)] - **doc**：改进 console.markdown 副本内容 (Alexander Makarenko) [#5225](https://github.com/nodejs/node/pull/5225)
* \[[`48fa6f6063`](https://github.com/nodejs/node/commit/48fa6f6063)] - **doc**：更新 process.send() 签名 (cjihrig) [#5284](https://github.com/nodejs/node/pull/5284)
* \[[`35d89d4662`](https://github.com/nodejs/node/commit/35d89d4662)] - **doc**：修复 net.createConnection() 示例 (Brian White) [#5219](https://github.com/nodejs/node/pull/5219)
* \[[`149007c9f0`](https://github.com/nodejs/node/commit/149007c9f0)] - **doc**：替换 CONTRIBUTING.md 中的 node-forward 链接 (Ben Noordhuis) [#5227](https://github.com/nodejs/node/pull/5227)
* \[[`a6aaf2caab`](https://github.com/nodejs/node/commit/a6aaf2caab)] - **doc**：改进滚动效果并进行多项 CSS 调整 (Roman Reiss) [#5198](https://github.com/nodejs/node/pull/5198)
* \[[`18b00deeac`](https://github.com/nodejs/node/commit/18b00deeac)] - **doc**：将 DCO 更新到 v1.1 (Mikeal Rogers) [#5170](https://github.com/nodejs/node/pull/5170)
* \[[`3955bc4cd0`](https://github.com/nodejs/node/commit/3955bc4cd0)] - **doc**：修复 repl 文档中的一些小不一致 (Rich Trott) [#5193](https://github.com/nodejs/node/pull/5193)
* \[[`287bce7b48`](https://github.com/nodejs/node/commit/287bce7b48)] - **doc**：说明 writeHead 与 setHeader 的合并行为 (Alejandro Oviedo) [#5081](https://github.com/nodejs/node/pull/5081)
* \[[`529e749d88`](https://github.com/nodejs/node/commit/529e749d88)] - **doc**：修复链接生成、链接 CSS 的类型引用 (Claudio Rodriguez) [#4741](https://github.com/nodejs/node/pull/4741)
* \[[`275f6dbcbb`](https://github.com/nodejs/node/commit/275f6dbcbb)] - **(SEMVER-MINOR)** **doc**：更正 tlsSocket.getCipher() 描述 (Brian White) [#4995](https://github.com/nodejs/node/pull/4995)
* \[[`b706b0c2c5`](https://github.com/nodejs/node/commit/b706b0c2c5)] - **http**：移除旧的、令人困惑的注释 (Brian White) [#5233](https://github.com/nodejs/node/pull/5233)
* \[[`ed36235248`](https://github.com/nodejs/node/commit/ed36235248)] - **http**：移除不必要的检查 (Brian White) [#5233](https://github.com/nodejs/node/pull/5233)
* \[[`7e82a566b3`](https://github.com/nodejs/node/commit/7e82a566b3)] - **(SEMVER-MINOR)** **http**：允许异步 createConnection() (Brian White) [#4638](https://github.com/nodejs/node/pull/4638)
* \[[`411d813323`](https://github.com/nodejs/node/commit/411d813323)] - **http**：不要在声明协议时发出 `upgrade` (Fedor Indutny) [#4337](https://github.com/nodejs/node/pull/4337)
* \[[`bbc786b50f`](https://github.com/nodejs/node/commit/bbc786b50f)] - **http,util**：修复注释中的拼写错误 (Alexander Makarenko) [#5279](https://github.com/nodejs/node/pull/5279)
* \[[`a2d198c702`](https://github.com/nodejs/node/commit/a2d198c702)] - **net**：使用 `_server` 进行内部记录 (Fedor Indutny) [#5262](https://github.com/nodejs/node/pull/5262)
* \[[`18d24e60c5`](https://github.com/nodejs/node/commit/18d24e60c5)] - **(SEMVER-MINOR)** **net**：通过属性而不是 getter 添加 net.listening 布尔属性 (José Moreira) [#4743](https://github.com/nodejs/node/pull/4743)
* \[[`9cee86e3e9`](https://github.com/nodejs/node/commit/9cee86e3e9)] - **node**：在启动时将 process.\_eventsCount 设为 0 (Evan Lucas) [#5208](https://github.com/nodejs/node/pull/5208)
* \[[`f2e4f621c5`](https://github.com/nodejs/node/commit/f2e4f621c5)] - **node**：提升 process.nextTick 性能 (Ruben Bridgewater) [#5092](https://github.com/nodejs/node/pull/5092)
* \[[`1c6f927bd1`](https://github.com/nodejs/node/commit/1c6f927bd1)] - **path**：修复输入类型检查回归 (Brian White) [#5244](https://github.com/nodejs/node/pull/5244)
* \[[`4dae8caf7a`](https://github.com/nodejs/node/commit/4dae8caf7a)] - **path**：在所有平台上提升性能 (Brian White) [#5123](https://github.com/nodejs/node/pull/5123)
* \[[`46be1f4d0c`](https://github.com/nodejs/node/commit/46be1f4d0c)] - **querystring**：提升 escape() 性能 (Brian White) [#5012](https://github.com/nodejs/node/pull/5012)
* \[[`27e323e8c1`](https://github.com/nodejs/node/commit/27e323e8c1)] - **querystring**：提升 unescapeBuffer() 性能 (Brian White) [#5012](https://github.com/nodejs/node/pull/5012)
* \[[`301023b2b4`](https://github.com/nodejs/node/commit/301023b2b4)] - **querystring**：提升 parse() 性能 (Brian White) [#5012](https://github.com/nodejs/node/pull/5012)
* \[[`98907c716b`](https://github.com/nodejs/node/commit/98907c716b)] - **(SEMVER-MINOR)** **repl**：允许多行函数调用 (Zirak) [#3823](https://github.com/nodejs/node/pull/3823)
* \[[`c551da8cb4`](https://github.com/nodejs/node/commit/c551da8cb4)] - **repl**：处理正则字面量中的引号 (Prince J Wesley) [#5117](https://github.com/nodejs/node/pull/5117)
* \[[`15091ccca2`](https://github.com/nodejs/node/commit/15091ccca2)] - **src**：移除不必要的检查 (Brian White) [#5233](https://github.com/nodejs/node/pull/5233)
* \[[`830bb04d90`](https://github.com/nodejs/node/commit/830bb04d90)] - **src**：移除 MakeCallback 中的 TryCatch (Trevor Norris) [#4507](https://github.com/nodejs/node/pull/4507)
* \[[`7f22c8c8a6`](https://github.com/nodejs/node/commit/7f22c8c8a6)] - **src**：移除未使用的 TickInfo::in_tick() (Trevor Norris) [#4507](https://github.com/nodejs/node/pull/4507)
* \[[`406eb1f516`](https://github.com/nodejs/node/commit/406eb1f516)] - **src**：移除未使用的 TickInfo::last_threw() (Trevor Norris) [#4507](https://github.com/nodejs/node/pull/4507)
* \[[`bcec2fecbd`](https://github.com/nodejs/node/commit/bcec2fecbd)] - **src**：添加 AsyncCallbackScope (Trevor Norris) [#4507](https://github.com/nodejs/node/pull/4507)
* \[[`2cb1594279`](https://github.com/nodejs/node/commit/2cb1594279)] - **src**：修复 MakeCallback 错误处理 (Trevor Norris) [#4507](https://github.com/nodejs/node/pull/4507)
* \[[`8d6e679a90`](https://github.com/nodejs/node/commit/8d6e679a90)] - **src,test,tools**：为更严格的 lint 检查进行修改 (Rich Trott) [#5214](https://github.com/nodejs/node/pull/5214)
* \[[`7684b0fcdf`](https://github.com/nodejs/node/commit/7684b0fcdf)] - **stream**：修复部分解码时没有数据的问题 (Brian White) [#5226](https://github.com/nodejs/node/pull/5226)
* \[[`f706cb0189`](https://github.com/nodejs/node/commit/f706cb0189)] - **streams**：发送小块数据时吞吐量提升 5% (Matteo Collina) [#4354](https://github.com/nodejs/node/pull/4354)
* \[[`25513a473a`](https://github.com/nodejs/node/commit/25513a473a)] - **string\_decoder**：修复性能回归 (Brian White) [#5134](https://github.com/nodejs/node/pull/5134)
* \[[`0e85530d8c`](https://github.com/nodejs/node/commit/0e85530d8c)] - **test**：为清晰起见使用 String.prototype.repeat() (Rich Trott) [#5311](https://github.com/nodejs/node/pull/5311)
* \[[`5683efb90a`](https://github.com/nodejs/node/commit/5683efb90a)] - **test**：移除 test-debug-no-context 的 flaky 标记 (Rich Trott) [#5317](https://github.com/nodejs/node/pull/5317)
* \[[`c55bb79ace`](https://github.com/nodejs/node/commit/c55bb79ace)] - **test**：为 https 服务器 close 事件添加测试 (Braydon Fuller) [#5106](https://github.com/nodejs/node/pull/5106)
* \[[`138ee983b0`](https://github.com/nodejs/node/commit/138ee983b0)] - **test**：重构 test-http-destroyed-socket-write2 (Santiago Gimeno) [#4970](https://github.com/nodejs/node/pull/4970)
* \[[`df7d91f36b`](https://github.com/nodejs/node/commit/df7d91f36b)] - **test**：缓解 test-debug-no-context 的不稳定性 (Rich Trott) [#5269](https://github.com/nodejs/node/pull/5269)
* \[[`d9177e7c26`](https://github.com/nodejs/node/commit/d9177e7c26)] - **test**：test-process-getactivehandles 存在不稳定性 (Alexis Campailla) [#5303](https://github.com/nodejs/node/pull/5303)
* \[[`f5cc04732f`](https://github.com/nodejs/node/commit/f5cc04732f)] - **test**：将 test-http-regr-gh-2928 标记为 flaky (Rich Trott) [#5280](https://github.com/nodejs/node/pull/5280)
* \[[`78b349d5d1`](https://github.com/nodejs/node/commit/78b349d5d1)] - **test**：为 AIX 禁用 fs watch 测试 (Michael Dawson) [#5187](https://github.com/nodejs/node/pull/5187)
* \[[`82ee5e94df`](https://github.com/nodejs/node/commit/82ee5e94df)] - **test**：将 test-http-agent 标记为 flaky (Rich Trott) [#5209](https://github.com/nodejs/node/pull/5209)
* \[[`1494d6f213`](https://github.com/nodejs/node/commit/1494d6f213)] - **test**：最小化 repl eval 选项测试 (Rich Trott) [#5192](https://github.com/nodejs/node/pull/5192)
* \[[`e7bf951136`](https://github.com/nodejs/node/commit/e7bf951136)] - **test**：为 MakeCallback 添加 addons 测试 (Trevor Norris) [#4507](https://github.com/nodejs/node/pull/4507)
* \[[`98596a94fa`](https://github.com/nodejs/node/commit/98596a94fa)] - **(SEMVER-MINOR)** **test**：从 node 树中运行 v8 测试 (Bryon Leung) [#4704](https://github.com/nodejs/node/pull/4704)
* \[[`69c544f245`](https://github.com/nodejs/node/commit/69c544f245)] - **test**：修复 test-http-regr-gh-2928 的不稳定性 (Rich Trott) [#5154](https://github.com/nodejs/node/pull/5154)
* \[[`7c88410507`](https://github.com/nodejs/node/commit/7c88410507)] - **test**：再次修复 child-process-fork-regr-gh-2847 (Santiago Gimeno) [#5179](https://github.com/nodejs/node/pull/5179)
* \[[`2c2cb6700d`](https://github.com/nodejs/node/commit/2c2cb6700d)] - **test**：移除不需要的 common.indirectInstanceOf() (Rich Trott) [#5149](https://github.com/nodejs/node/pull/5149)
* \[[`6340974f21`](https://github.com/nodejs/node/commit/6340974f21)] - **test**：不要在 Aix 上运行 test-tick-processor.js (Michael Dawson) [#5093](https://github.com/nodejs/node/pull/5093)
* \[[`a8f4db236c`](https://github.com/nodejs/node/commit/a8f4db236c)] - **test**：改进 path 测试 (Brian White) [#5123](https://github.com/nodejs/node/pull/5123)
* \[[`8301773c1e`](https://github.com/nodejs/node/commit/8301773c1e)] - **test**：修复 child-process-fork-regr-gh-2847 (Santiago Gimeno) [#5121](https://github.com/nodejs/node/pull/5121)
* \[[`f2bd86775b`](https://github.com/nodejs/node/commit/f2bd86775b)] - **test**：更新箭头函数风格 (cjihrig) [#4813](https://github.com/nodejs/node/pull/4813)
* \[[`aed04b85c2`](https://github.com/nodejs/node/commit/aed04b85c2)] - **tls**：在句柄关闭时将 `.ssl` 置空 (Fedor Indutny) [#5168](https://github.com/nodejs/node/pull/5168)
* \[[`c3f8aab652`](https://github.com/nodejs/node/commit/c3f8aab652)] - **(SEMVER-MINOR)** **tls**：为 TLS sockets 添加 getProtocol() (Brian White) [#4995](https://github.com/nodejs/node/pull/4995)
* \[[`7fc2e3161f`](https://github.com/nodejs/node/commit/7fc2e3161f)] - **tools**：添加 Node.js 特定的 ESLint 规则 (Rich Trott) [#5320](https://github.com/nodejs/node/pull/5320)
* \[[`983325cb0c`](https://github.com/nodejs/node/commit/983325cb0c)] - **tools**：替换过时的 ESLint 规则 (Rich Trott) [#5214](https://github.com/nodejs/node/pull/5214)
* \[[`f601d040b5`](https://github.com/nodejs/node/commit/f601d040b5)] - **tools**：将 ESLint 更新到 2.1.0 版本 (Rich Trott) [#5214](https://github.com/nodejs/node/pull/5214)
* \[[`13af565759`](https://github.com/nodejs/node/commit/13af565759)] - **tools**：移除过时的 lint 规则 (Rich Trott) [#5214](https://github.com/nodejs/node/pull/5214)
* \[[`c566f44f1b`](https://github.com/nodejs/node/commit/c566f44f1b)] - **tools**：添加推荐的 ES6 lint 规则 (Rich Trott) [#5210](https://github.com/nodejs/node/pull/5210)
* \[[`b611caa0ba`](https://github.com/nodejs/node/commit/b611caa0ba)] - **tools**：添加推荐的 lint 规则 (Rich Trott) [#5188](https://github.com/nodejs/node/pull/5188)
* \[[`b1a16d1202`](https://github.com/nodejs/node/commit/b1a16d1202)] - **tools**：从 .eslintrc 中移除过多注释 (Rich Trott) [#5151](https://github.com/nodejs/node/pull/5151)
* \[[`c4ed5ece4d`](https://github.com/nodejs/node/commit/c4ed5ece4d)] - **tools**：为 linter 启用 no-proto 规则 (Jackson Tian) [#5140](https://github.com/nodejs/node/pull/5140)
* \[[`86f8477b56`](https://github.com/nodejs/node/commit/86f8477b56)] - **tools**：禁止缩进中混用空格和制表符 (Rich Trott) [#5135](https://github.com/nodejs/node/pull/5135)
* \[[`21fd1496a9`](https://github.com/nodejs/node/commit/21fd1496a9)] - **tools**：将 eslint 风格问题部分按字母排序
* \[[`22c8d50a1f`](https://github.com/nodejs/node/commit/22c8d50a1f)] - **tools**：在文档 html 生成中将类型解析为链接 (Claudio Rodriguez) [#4741](https://github.com/nodejs/node/pull/4741)
* \[[`5c54d4987d`](https://github.com/nodejs/node/commit/5c54d4987d)] - **tools**：为 linter 启用 no-redeclare 规则 (Rich Trott) [#5047](https://github.com/nodejs/node/pull/5047)
* \[[`a3a0cf603a`](https://github.com/nodejs/node/commit/a3a0cf603a)] - **tools**：向 eslint 添加箭头函数规则 (cjihrig) [#4813](https://github.com/nodejs/node/pull/4813)
* \[[`bcc26f747f`](https://github.com/nodejs/node/commit/bcc26f747f)] - **tools,doc**：修复 lint 错误 (Rich Trott) [#5161](https://github.com/nodejs/node/pull/5161)
* \[[`47274704aa`](https://github.com/nodejs/node/commit/47274704aa)] - **url**：修复 lint 和 deopt 问题 (Brian White) [#5300](https://github.com/nodejs/node/pull/5300)
* \[[`729ad75860`](https://github.com/nodejs/node/commit/729ad75860)] - **url**：提升 url.parse() 性能 (Brian White) [#4892](https://github.com/nodejs/node/pull/4892)
* \[[`6c8378b15b`](https://github.com/nodejs/node/commit/6c8378b15b)] - **vm**：修复 `produceCachedData` (Jiho Choi) [#5343](https://github.com/nodejs/node/pull/5343)
* \[[`d1cacb814f`](https://github.com/nodejs/node/commit/d1cacb814f)] - **(SEMVER-MINOR)** **vm**：引入 `cachedData`/`produceCachedData` (Fedor Indutny) [#4777](https://github.com/nodejs/node/pull/4777)

<a id="5.6.0"></a>

## 2016-02-09，版本 5.6.0（稳定版），@jasnell

这是一个重要的安全更新。所有 Node.js 用户都应查阅 nodejs.org 上的安全更新摘要，以了解已修补漏洞的详细信息。

### 重要变更

* **http**：修复 HTTP 请求和响应头解析中的缺陷，这些缺陷可能导致请求走私（CVE-2016-2086）或响应拆分（CVE-2016-2216）。HTTP 头解析现在更严格地与 HTTP 规范保持一致，包括限制可接受的字符。
* **http-parser**：从 2.6.0 升级到 2.6.1
* **npm**：将 npm 从 3.3.12 升级到 3.6.0（Rebecca Turner）[#4958](https://github.com/nodejs/node/pull/4958)
* **openssl**：从 1.0.2e 升级到 1.0.2f。为缓解 Logjam 攻击，TLS 客户端现在会拒绝参数短于 1024 位的 Diffie-Hellman 握手，而此前的限制是 768 位。

### 提交

* \[[`3b6283c163`](https://github.com/nodejs/node/commit/3b6283c163)] - **benchmark**：为 `net` 添加一个常量声明（Minwoo Jung）[#3950](https://github.com/nodejs/node/pull/3950)
* \[[`3175f7450e`](https://github.com/nodejs/node/commit/3175f7450e)] - **buffer**：移除 fromObject 中重复的代码（HUANG Wei）[#4948](https://github.com/nodejs/node/pull/4948)
* \[[`58d67e26a2`](https://github.com/nodejs/node/commit/58d67e26a2)] - **buffer**：验证 Buffer.concat 中的列表元素（Michaël Zasso）[#4951](https://github.com/nodejs/node/pull/4951)
* \[[`bafc86f00e`](https://github.com/nodejs/node/commit/bafc86f00e)] - **buffer**：重构重复声明的变量（Rich Trott）[#4886](https://github.com/nodejs/node/pull/4886)
* \[[`0fa4d90b94`](https://github.com/nodejs/node/commit/0fa4d90b94)] - **build**：为二进制目标添加 VARIATION 变量（Stefan Budeanu）[#4631](https://github.com/nodejs/node/pull/4631)
* \[[`ec62789152`](https://github.com/nodejs/node/commit/ec62789152)] - **crypto**：修复 LoadPKCS12 中的内存泄漏（Fedor Indutny）[#5109](https://github.com/nodejs/node/pull/5109)
* \[[`d9e934c71f`](https://github.com/nodejs/node/commit/d9e934c71f)] - **crypto**：也将 `pfx` 证书作为 CA 证书添加（Fedor Indutny）[#5109](https://github.com/nodejs/node/pull/5109)
* \[[`0d4b538175`](https://github.com/nodejs/node/commit/0d4b538175)] - **crypto**：使用 SSL\_CTX\_clear\_extra\_chain\_certs。（Adam Langley）[#4919](https://github.com/nodejs/node/pull/4919)
* \[[`abb0f6cd53`](https://github.com/nodejs/node/commit/abb0f6cd53)] - **crypto**：修复未提供 OCSP stapling 时的构建问题（Adam Langley）[#4914](https://github.com/nodejs/node/pull/4914)
* \[[`755619c554`](https://github.com/nodejs/node/commit/755619c554)] - **crypto**：使用 const SSL\_CIPHER（Adam Langley）[#4913](https://github.com/nodejs/node/pull/4913)
* \[[`4f4c8ab3b4`](https://github.com/nodejs/node/commit/4f4c8ab3b4)] - **(SEMVER-MINOR)** **deps**：将 http-parser 更新到 2.6.1 版本（James M Snell）
* \[[`f0bd176d6d`](https://github.com/nodejs/node/commit/f0bd176d6d)] - **deps**：重新应用 c-ares 的浮动补丁（Ben Noordhuis）[#5090](https://github.com/nodejs/node/pull/5090)
* \[[`f1a0827417`](https://github.com/nodejs/node/commit/f1a0827417)] - **deps**：与上游 bagder/c-ares\@2bae2d5 同步（Fedor Indutny）[#5090](https://github.com/nodejs/node/pull/5090)
* \[[`cbf36de8f1`](https://github.com/nodejs/node/commit/cbf36de8f1)] - **deps**：将 npm 升级到 3.6.0（Rebecca Turner）[#4958](https://github.com/nodejs/node/pull/4958)
* \[[`dd97d07a0d`](https://github.com/nodejs/node/commit/dd97d07a0d)] - **deps**：从 v8 上游回移植 8d00c2c（Gibson Fahnestock）[#5024](https://github.com/nodejs/node/pull/5024)
* \[[`b75263094b`](https://github.com/nodejs/node/commit/b75263094b)] - **deps**：为 openssl s_client 添加 -no\_rand\_screen（Shigeki Ohtsu）[#1836](https://github.com/nodejs/node/pull/1836)
* \[[`b312b7914f`](https://github.com/nodejs/node/commit/b312b7914f)] - **deps**：将 openssl 源码升级到 1.0.2f（Myles Borins）[#4961](https://github.com/nodejs/node/pull/4961)
* \[[`fa0457ed04`](https://github.com/nodejs/node/commit/fa0457ed04)] - **dns**：在带有无效端口的 lookupService 中抛出 TypeError（Evan Lucas）[#4839](https://github.com/nodejs/node/pull/4839)
* \[[`c4c8b3bf2e`](https://github.com/nodejs/node/commit/c4c8b3bf2e)] - **doc**：修复 dgram 文档的缩进（Rich Trott）[#5118](https://github.com/nodejs/node/pull/5118)
* \[[`027cd2719f`](https://github.com/nodejs/node/commit/027cd2719f)] - **doc**：澄清行为准则举报方式（Julie Pagano）[#5107](https://github.com/nodejs/node/pull/5107)
* \[[`9f7aa6f868`](https://github.com/nodejs/node/commit/9f7aa6f868)] - **doc**：澄清 dgram 的 socket.send() 对多缓冲区的支持（Matteo Collina）[#5130](https://github.com/nodejs/node/pull/5130)
* \[[`a96ae2cb37`](https://github.com/nodejs/node/commit/a96ae2cb37)] - **doc**：console 是异步的，除非它是一个文件（Ben Noordhuis）[#5133](https://github.com/nodejs/node/pull/5133)
* \[[`4c54c8f309`](https://github.com/nodejs/node/commit/4c54c8f309)] - **doc**：修复 dgram 文档中的拼写错误（Rich Trott）[#5114](https://github.com/nodejs/node/pull/5114)
* \[[`9c93ea3d51`](https://github.com/nodejs/node/commit/9c93ea3d51)] - **doc**：修复 Buffer 文档中的链接顺序（Alexander Makarenko）[#5076](https://github.com/nodejs/node/pull/5076)
* \[[`a0ba378880`](https://github.com/nodejs/node/commit/a0ba378880)] - **doc**：改进 OS 文档的细节（Alexander Makarenko）[#5006](https://github.com/nodejs/node/pull/5006)
* \[[`1e2108a6b7`](https://github.com/nodejs/node/commit/1e2108a6b7)] - **doc**：修复 Addons 文档中的链接（Alexander Makarenko）[#5072](https://github.com/nodejs/node/pull/5072)
* \[[`e5134b1701`](https://github.com/nodejs/node/commit/e5134b1701)] - **doc**：修复不一致的样式（Brian White）[#4996](https://github.com/nodejs/node/pull/4996)
* \[[`dde160378e`](https://github.com/nodejs/node/commit/dde160378e)] - **doc**：修复 cluster 文档中的链接（Timothy Gu）[#5068](https://github.com/nodejs/node/pull/5068)
* \[[`e5254c12f4`](https://github.com/nodejs/node/commit/e5254c12f4)] - **doc**：修复对 API `hash.final` 的引用（Minwoo Jung）[#5050](https://github.com/nodejs/node/pull/5050)
* \[[`87fd9968a8`](https://github.com/nodejs/node/commit/87fd9968a8)] - **doc**：澄清 Buffer 方法的可选参数（Michaël Zasso）[#5008](https://github.com/nodejs/node/pull/5008)
* \[[`9908eced24`](https://github.com/nodejs/node/commit/9908eced24)] - **doc**：将 crypto.markdown 中的 'RSA-SHA256' 改为大写（Rainer Oviir）[#5044](https://github.com/nodejs/node/pull/5044)
* \[[`bf0383bbea`](https://github.com/nodejs/node/commit/bf0383bbea)] - **doc**：为函数应用统一的样式（Rich Trott）[#4974](https://github.com/nodejs/node/pull/4974)
* \[[`8c7f4bab2d`](https://github.com/nodejs/node/commit/8c7f4bab2d)] - **doc**：改进 Stream 文档的多项细节（Alexander Makarenko）[#5009](https://github.com/nodejs/node/pull/5009)
* \[[`ee013715b9`](https://github.com/nodejs/node/commit/ee013715b9)] - **doc**：提升 VM 文档中的样式一致性（Alexander Makarenko）[#5005](https://github.com/nodejs/node/pull/5005)
* \[[`9824b0d132`](https://github.com/nodejs/node/commit/9824b0d132)] - **doc**：修复从 stream 到 http 和 events 的锚点链接（piepmatz）[#5007](https://github.com/nodejs/node/pull/5007)
* \[[`2c85f79569`](https://github.com/nodejs/node/commit/2c85f79569)] - **doc**：对 HTTPS 文档做小幅改进（Alexander Makarenko）[#5002](https://github.com/nodejs/node/pull/5002)
* \[[`9cf1370017`](https://github.com/nodejs/node/commit/9cf1370017)] - **doc**：提升 Buffer 文档中的样式一致性（Alexander Makarenko）[#5001](https://github.com/nodejs/node/pull/5001)
* \[[`2750cb0613`](https://github.com/nodejs/node/commit/2750cb0613)] - **doc**：统一 TLS 文档中函数的样式（Alexander Makarenko）[#5000](https://github.com/nodejs/node/pull/5000)
* \[[`4758bf13a5`](https://github.com/nodejs/node/commit/4758bf13a5)] - **doc**：使用 license-builder.sh 更新 npm LICENSE（Rebecca Turner）[#4958](https://github.com/nodejs/node/pull/4958)
* \[[`3b08b5d22c`](https://github.com/nodejs/node/commit/3b08b5d22c)] - **doc**：修复 process 文档中的一个小拼写错误（Prayag Verma）[#5018](https://github.com/nodejs/node/pull/5018)
* \[[`129977c9c7`](https://github.com/nodejs/node/commit/129977c9c7)] - **doc**：修复 Readme.md 中的拼写错误（Prayag Verma）[#5017](https://github.com/nodejs/node/pull/5017)
* \[[`5de3dc557f`](https://github.com/nodejs/node/commit/5de3dc557f)] - **doc**：修复 `notDeepEqual` API（Minwoo Jung）[#4971](https://github.com/nodejs/node/pull/4971)
* \[[`d47dadcc1f`](https://github.com/nodejs/node/commit/d47dadcc1f)] - **doc**：使 buffer 方法的样式保持一致（Timothy Gu）[#4873](https://github.com/nodejs/node/pull/4873)
* \[[`17888b122c`](https://github.com/nodejs/node/commit/17888b122c)] - **doc**：修复别名方法的 JSON 生成（Timothy Gu）[#4871](https://github.com/nodejs/node/pull/4871)
* \[[`396e4b9199`](https://github.com/nodejs/node/commit/396e4b9199)] - **doc**：为 process.env 添加更多细节（Evan Lucas）[#4924](https://github.com/nodejs/node/pull/4924)
* \[[`bc11bf4659`](https://github.com/nodejs/node/commit/bc11bf4659)] - **doc**：不要将“interface”用作变量名（ChALkeR）[#4900](https://github.com/nodejs/node/pull/4900)
* \[[`bcf55d2f44`](https://github.com/nodejs/node/commit/bcf55d2f44)] - **doc**：统一 writable 的拼写（Peter Lyons）[#4954](https://github.com/nodejs/node/pull/4954)
* \[[`4a6d0ac436`](https://github.com/nodejs/node/commit/4a6d0ac436)] - **doc**：更新 readline 中的行尾处理（Kári Tristan Helgason）[#4927](https://github.com/nodejs/node/pull/4927)
* \[[`e65d3638c0`](https://github.com/nodejs/node/commit/e65d3638c0)] - **doc**：用箭头函数替换函数表达式（Benjamin Gruenbaum）[#4832](https://github.com/nodejs/node/pull/4832)
* \[[`423a58d66f`](https://github.com/nodejs/node/commit/423a58d66f)] - **doc**：在弃用说明中一致地显示链接（Sakthipriyan Vairamani）[#4907](https://github.com/nodejs/node/pull/4907)
* \[[`fd87659139`](https://github.com/nodejs/node/commit/fd87659139)] - **doc**：添加文档工作组（Bryan English）[#4244](https://github.com/nodejs/node/pull/4244)
* \[[`19ed619cff`](https://github.com/nodejs/node/commit/19ed619cff)] - **doc**：移除不必要的 bind(this)（Dmitriy Lazarev）[#4797](https://github.com/nodejs/node/pull/4797)
* \[[`5129930786`](https://github.com/nodejs/node/commit/5129930786)] - **doc**：保持名称按排序顺序排列（Sakthipriyan Vairamani）[#4876](https://github.com/nodejs/node/pull/4876)
* \[[`3c46c10d54`](https://github.com/nodejs/node/commit/3c46c10d54)] - **doc**：修复 Buffer::write 中不合逻辑的语法（Jimb Esser）[#4863](https://github.com/nodejs/node/pull/4863)
* \[[`a1af6fc1a7`](https://github.com/nodejs/node/commit/a1af6fc1a7)] - **doc**：添加 `servername` 参数文档（Alexander Makarenko）[#4729](https://github.com/nodejs/node/pull/4729)
* \[[`f4eeba8467`](https://github.com/nodejs/node/commit/f4eeba8467)] - **doc**：修复 markdown 的代码类型（Jackson Tian）[#4858](https://github.com/nodejs/node/pull/4858)
* \[[`fa1d453359`](https://github.com/nodejs/node/commit/fa1d453359)] - **doc**：检查 'listen' 事件中的错误（Benjamin Gruenbaum）[#4834](https://github.com/nodejs/node/pull/4834)
* \[[`f462320f74`](https://github.com/nodejs/node/commit/f462320f74)] - **doc**：撤销 http.IncomingMessage.statusMessage 的移动（Jeff Harris）[#4822](https://github.com/nodejs/node/pull/4822)
* \[[`711245e5ac`](https://github.com/nodejs/node/commit/711245e5ac)] - **doc**：修复目录中的样式问题（Roman Reiss）[#4748](https://github.com/nodejs/node/pull/4748)
* \[[`611c2f6fdf`](https://github.com/nodejs/node/commit/611c2f6fdf)] - **doc**：正确的 markdown 转义 -> \_\_、\*、\_（Robert Jefe Lindstaedt）[#4805](https://github.com/nodejs/node/pull/4805)
* \[[`5a860d9cb7`](https://github.com/nodejs/node/commit/5a860d9cb7)] - **doc**：当数据超过缓冲区大小时示例仍可运行（Glen Arrowsmith）[#4811](https://github.com/nodejs/node/pull/4811)
* \[[`71ba14de86`](https://github.com/nodejs/node/commit/71ba14de86)] - **doc**：更新 CoC 中的个人特质列表（Kat Marchán）[#4801](https://github.com/nodejs/node/pull/4801)
* \[[`97eedfc57a`](https://github.com/nodejs/node/commit/97eedfc57a)] - **doc**：统一 $ node 命令行标记法（Robert Jefe Lindstaedt）[#4806](https://github.com/nodejs/node/pull/4806)
* \[[`2dde0f08c9`](https://github.com/nodejs/node/commit/2dde0f08c9)] - **doc**：为 buf.indexOf 添加 encoding 参数并附带示例（Karl Skomski）[#3373](https://github.com/nodejs/node/pull/3373)
* \[[`66c74548de`](https://github.com/nodejs/node/commit/66c74548de)] - **doc**：为所有代码块加上围栏，修复拼写错误（Robert Jefe Lindstaedt）[#4733](https://github.com/nodejs/node/pull/4733)
* \[[`54e8845b5e`](https://github.com/nodejs/node/commit/54e8845b5e)] - **fs**：重构重复声明的变量（Rich Trott）[#4959](https://github.com/nodejs/node/pull/4959)
* \[[`fa940cf9bc`](https://github.com/nodejs/node/commit/fa940cf9bc)] - **fs**：移除未使用的分支（Benjamin Gruenbaum）[#4795](https://github.com/nodejs/node/pull/4795)
* \[[`7bef1b7907`](https://github.com/nodejs/node/commit/7bef1b7907)] - **(SEMVER-MINOR)** **http**：严格禁止头部中的无效字符（James M Snell）
* \[[`9b03af254a`](https://github.com/nodejs/node/commit/9b03af254a)] - **http**：移除对 onParserExecute 的引用（Tom Atkinson）[#4773](https://github.com/nodejs/node/pull/4773)
* \[[`101de9de3f`](https://github.com/nodejs/node/commit/101de9de3f)] - **https**：在出错时清除缓存的会话（Fedor Indutny）[#4982](https://github.com/nodejs/node/pull/4982)
* \[[`b2c8b7f6d3`](https://github.com/nodejs/node/commit/b2c8b7f6d3)] - **internal/child\_process**：在出错时调用 postSend（Fedor Indutny）[#4752](https://github.com/nodejs/node/pull/4752)
* \[[`55030922e5`](https://github.com/nodejs/node/commit/55030922e5)] - **lib**：限定循环变量的作用域（Rich Trott）[#4965](https://github.com/nodejs/node/pull/4965)
* \[[`725ad5b1ce`](https://github.com/nodejs/node/commit/725ad5b1ce)] - **lib**：移除 string\_decoder.js 中的变量重复声明（Rich Trott）[#4978](https://github.com/nodejs/node/pull/4978)
* \[[`c09eb44a59`](https://github.com/nodejs/node/commit/c09eb44a59)] - **module**：重构重复声明的变量（Rich Trott）[#4962](https://github.com/nodejs/node/pull/4962)
* \[[`612ce66c78`](https://github.com/nodejs/node/commit/612ce66c78)] - **net**：重构重复声明的变量（Rich Trott）[#4963](https://github.com/nodejs/node/pull/4963)
* \[[`c9b05dafe0`](https://github.com/nodejs/node/commit/c9b05dafe0)] - **net**：将 isLegalPort 移到 internal/net（Evan Lucas）[#4882](https://github.com/nodejs/node/pull/4882)
* \[[`7003a4e3d8`](https://github.com/nodejs/node/commit/7003a4e3d8)] - **node\_contextify**：不要截获调试上下文（Myles Borins）[#4815](https://github.com/nodejs/node/issues/4815)
* \[[`5a77c095a6`](https://github.com/nodejs/node/commit/5a77c095a6)] - **process**：支持 symbol 事件（cjihrig）[#4798](https://github.com/nodejs/node/pull/4798)
* \[[`85743c0e92`](https://github.com/nodejs/node/commit/85743c0e92)] - **querystring**：检查 maxKeys 是否为有限值（Myles Borins）[#5066](https://github.com/nodejs/node/pull/5066)
* \[[`5a10fe932c`](https://github.com/nodejs/node/commit/5a10fe932c)] - **querystring**：使用 String.prototype.split 的 limit（Manuel Valls）[#2288](https://github.com/nodejs/node/pull/2288)
* \[[`2844cc03dc`](https://github.com/nodejs/node/commit/2844cc03dc)] - **repl**：移除变量重复声明（Rich Trott）[#4977](https://github.com/nodejs/node/pull/4977)
* \[[`b5b5bb1e3c`](https://github.com/nodejs/node/commit/b5b5bb1e3c)] - **src**：避免 node\_revert.cc 中的编译器警告（James M Snell）
* \[[`d387591bbb`](https://github.com/nodejs/node/commit/d387591bbb)] - **(SEMVER-MINOR)** **src**：添加 --security-revert 命令行标志（James M Snell）
* \[[`95615196de`](https://github.com/nodejs/node/commit/95615196de)] - **src**：清理 `__proto__` 的使用（Jackson Tian）[#5069](https://github.com/nodejs/node/pull/5069)
* \[[`e93b024214`](https://github.com/nodejs/node/commit/e93b024214)] - **src**：移除不再相关的注释（Chris911）[#4843](https://github.com/nodejs/node/pull/4843)
* \[[`a2c257a3ef`](https://github.com/nodejs/node/commit/a2c257a3ef)] - **src**：修复 process.hrtime() 中的负值（Ben Noordhuis）[#4757](https://github.com/nodejs/node/pull/4757)
* \[[`b46f3b84d4`](https://github.com/nodejs/node/commit/b46f3b84d4)] - **src,deps**：用 LoadLibraryW 替换 LoadLibrary（Cheng Zhao）[iojs/io.js#226](https://github.com/iojs/io.js/pull/226)
* \[[`ee8d4bb075`](https://github.com/nodejs/node/commit/ee8d4bb075)] - **stream**：防止在 TransformState 中更改对象映射（Evan Lucas）[#5032](https://github.com/nodejs/node/pull/5032)
* \[[`c8b6de244e`](https://github.com/nodejs/node/commit/c8b6de244e)] - **stream**：重构重复声明的变量（Rich Trott）[#4816](https://github.com/nodejs/node/pull/4816)
* \[[`9dcc45e9c5`](https://github.com/nodejs/node/commit/9dcc45e9c5)] - **test**：使 pkcs12 测试能在 FIPS 模式下运行（Shigeki Ohtsu）[#5150](https://github.com/nodejs/node/pull/5150)
* \[[`e4390664ae`](https://github.com/nodejs/node/commit/e4390664ae)] - **test**：在 FIPS 模式下禁用 gh-5100 测试（Fedor Indutny）[#5144](https://github.com/nodejs/node/pull/5144)
* \[[`cf3aa911ec`](https://github.com/nodejs/node/commit/cf3aa911ec)] - **test**：修复不稳定的 test-dgram-pingpong（Rich Trott）[#5125](https://github.com/nodejs/node/pull/5125)
* \[[`63884f57dd`](https://github.com/nodejs/node/commit/63884f57dd)] - **test**：将 Raspberry Pi 上的不稳定测试标记出来（Rich Trott）[#5082](https://github.com/nodejs/node/pull/5082)
* \[[`09917c99d8`](https://github.com/nodejs/node/commit/09917c99d8)] - **test**：修复 `net-socket-timeout-unref` 的不稳定性（Santiago Gimeno）[#4772](https://github.com/nodejs/node/pull/4772)
* \[[`83da19aa48`](https://github.com/nodejs/node/commit/83da19aa48)] - **test**：修复重复声明的 test-event-emitter-\* 变量（Rich Trott）[#4985](https://github.com/nodejs/node/pull/4985)
* \[[`87b27c913d`](https://github.com/nodejs/node/commit/87b27c913d)] - **test**：修复重复声明的 test-intl 变量（Rich Trott）[#4988](https://github.com/nodejs/node/pull/4988)
* \[[`e98772d68e`](https://github.com/nodejs/node/commit/e98772d68e)] - **test**：移除 test-domain 中重复声明的变量（Rich Trott）[#4984](https://github.com/nodejs/node/pull/4984)
* \[[`443d0463ca`](https://github.com/nodejs/node/commit/443d0463ca)] - **test**：为 dgram 测试添加 common.platformTimeout()（Rich Trott）[#4938](https://github.com/nodejs/node/pull/4938)
* \[[`90219c3398`](https://github.com/nodejs/node/commit/90219c3398)] - **test**：修复 Windows 10 上不稳定的 cluster 测试（Rich Trott）[#4934](https://github.com/nodejs/node/pull/4934)
* \[[`3488fa81b5`](https://github.com/nodejs/node/commit/3488fa81b5)] - **test**：修复变量重复声明（Rich Trott）[#4992](https://github.com/nodejs/node/pull/4992)
* \[[`7dc0905d4d`](https://github.com/nodejs/node/commit/7dc0905d4d)] - **test**：修复重复声明的 test-util-\* 变量（Rich Trott）[#4994](https://github.com/nodejs/node/pull/4994)
* \[[`53e7d605c9`](https://github.com/nodejs/node/commit/53e7d605c9)] - **test**：修复顺序测试中的重复声明变量（Rich Trott）[#4999](https://github.com/nodejs/node/pull/4999)
* \[[`a62ace9f7e`](https://github.com/nodejs/node/commit/a62ace9f7e)] - **test**：修复 tls-no-rsa-key 的不稳定性（Santiago Gimeno）[#4043](https://github.com/nodejs/node/pull/4043)
* \[[`9b8f025816`](https://github.com/nodejs/node/commit/9b8f025816)] - **test**：修复 test-url 中重复声明的变量（Rich Trott）[#4993](https://github.com/nodejs/node/pull/4993)
* \[[`51fb8845d5`](https://github.com/nodejs/node/commit/51fb8845d5)] - **test**：修复重复声明的 test-path 变量（Rich Trott）[#4991](https://github.com/nodejs/node/pull/4991)
* \[[`b16b360ae8`](https://github.com/nodejs/node/commit/b16b360ae8)] - **test**：修复 test-os 中的变量重复声明（Rich Trott）[#4990](https://github.com/nodejs/node/pull/4990)
* \[[`d6199773e8`](https://github.com/nodejs/node/commit/d6199773e8)] - **test**：修复 test-net-\* 变量重复声明（Rich Trott）[#4989](https://github.com/nodejs/node/pull/4989)
* \[[`9dd5b3e01b`](https://github.com/nodejs/node/commit/9dd5b3e01b)] - **test**：修复重复声明的 test-http-\* 变量（Rich Trott）[#4987](https://github.com/nodejs/node/pull/4987)
* \[[`835bf13c1d`](https://github.com/nodejs/node/commit/835bf13c1d)] - **test**：修复 test-fs-\* 中的变量重复声明（Rich Trott）[#4986](https://github.com/nodejs/node/pull/4986)
* \[[`71d7a4457d`](https://github.com/nodejs/node/commit/71d7a4457d)] - **test**：修复 test-vm-\* 中重复声明的变量（Rich Trott）[#4997](https://github.com/nodejs/node/pull/4997)
* \[[`38459402a5`](https://github.com/nodejs/node/commit/38459402a5)] - **test**：修复 test-url 中不一致的样式（Brian White）[#5014](https://github.com/nodejs/node/pull/5014)
* \[[`4934798c0d`](https://github.com/nodejs/node/commit/4934798c0d)] - **test**：pummel 测试修复（Rich Trott）[#4998](https://github.com/nodejs/node/pull/4998)
* \[[`3970504298`](https://github.com/nodejs/node/commit/3970504298)] - **test**：移除 test-crypto-\* 中的变量重复声明（Rich Trott）[#4981](https://github.com/nodejs/node/pull/4981)
* \[[`a2881e2187`](https://github.com/nodejs/node/commit/a2881e2187)] - **test**：移除 test-cluster-\* 的变量重复声明（Rich Trott）[#4980](https://github.com/nodejs/node/pull/4980)
* \[[`c3d93299c2`](https://github.com/nodejs/node/commit/c3d93299c2)] - **test**：修复 test-http-extra-response 的不稳定性（Santiago Gimeno）[#4979](https://github.com/nodejs/node/pull/4979)
* \[[`0384a43885`](https://github.com/nodejs/node/commit/0384a43885)] - **test**：为 TLS 对等证书指纹添加断言（Alan Cohen）[#4923](https://github.com/nodejs/node/pull/4923)
* \[[`48a353fe41`](https://github.com/nodejs/node/commit/48a353fe41)] - **test**：为 test-child-process\* 中重复声明的变量限定作用域（Rich Trott）[#4944](https://github.com/nodejs/node/pull/4944)
* \[[`89d1149467`](https://github.com/nodejs/node/commit/89d1149467)] - **test**：修复 test-tls-zero-clear-in 的不稳定性（Santiago Gimeno）[#4888](https://github.com/nodejs/node/pull/4888)
* \[[`f7ed47341a`](https://github.com/nodejs/node/commit/f7ed47341a)] - **test**：从测试中移除 Object.observe（Vladimir Kurchatkin）[#4769](https://github.com/nodejs/node/pull/4769)
* \[[`d95e53dc3b`](https://github.com/nodejs/node/commit/d95e53dc3b)] - **test**：重构 switch（Rich Trott）[#4870](https://github.com/nodejs/node/pull/4870)
* \[[`7f1e3e929a`](https://github.com/nodejs/node/commit/7f1e3e929a)] - **test**：移除 http flood 测试中的竞态条件（Rich Trott）[#4793](https://github.com/nodejs/node/pull/4793)
* \[[`6539c64e67`](https://github.com/nodejs/node/commit/6539c64e67)] - **test**：限定重复声明变量的作用域（Rich Trott）[#4854](https://github.com/nodejs/node/pull/4854)
* \[[`62fb941557`](https://github.com/nodejs/node/commit/62fb941557)] - **test**：修复不规则空白问题（Roman Reiss）[#4864](https://github.com/nodejs/node/pull/4864)
* \[[`3b225209f0`](https://github.com/nodejs/node/commit/3b225209f0)] - **test**：fs.link() 测试在同一设备上运行（Drew Folta）[#4861](https://github.com/nodejs/node/pull/4861)
* \[[`1860eae110`](https://github.com/nodejs/node/commit/1860eae110)] - **test**：重构 test-net-settimeout（Rich Trott）[#4799](https://github.com/nodejs/node/pull/4799)
* \[[`ae9a8cd053`](https://github.com/nodejs/node/commit/ae9a8cd053)] - **test**：将 test-tick-processor 标记为不稳定（Rich Trott）[#4809](https://github.com/nodejs/node/pull/4809)
* \[[`57cea9e421`](https://github.com/nodejs/node/commit/57cea9e421)] - **test**：移除 test-http-exit-delay（Rich Trott）[#4786](https://github.com/nodejs/node/pull/4786)
* \[[`2119c76d5a`](https://github.com/nodejs/node/commit/2119c76d5a)] - **test**：重构 test-fs-watch（Rich Trott）[#4776](https://github.com/nodejs/node/pull/4776)
* \[[`e487b72459`](https://github.com/nodejs/node/commit/e487b72459)] - **test**：将 cluster 测试移至并行执行（Rich Trott）[#4774](https://github.com/nodejs/node/pull/4774)
* \[[`8c694a658c`](https://github.com/nodejs/node/commit/8c694a658c)] - **test**：改进 test-cluster-disconnect-suicide-race（Rich Trott）[#4739](https://github.com/nodejs/node/pull/4739)
* \[[`14f5bb7a99`](https://github.com/nodejs/node/commit/14f5bb7a99)] - **test,buffer**：重构重复声明（Rich Trott）[#4893](https://github.com/nodejs/node/pull/4893)
* \[[`62479e3406`](https://github.com/nodejs/node/commit/62479e3406)] - **tls**：使用 let 为循环变量限定作用域（Rich Trott）[#4853](https://github.com/nodejs/node/pull/4853)
* \[[`d6fbd81a7a`](https://github.com/nodejs/node/commit/d6fbd81a7a)] - **tls_wrap**：为 UV\_EPROTO 提供错误报告（Fedor Indutny）[#4885](https://github.com/nodejs/node/pull/4885)
* \[[`f75d06bf10`](https://github.com/nodejs/node/commit/f75d06bf10)] - **tools**：为正则表达式中的空字符类添加 lint 检查（Rich Trott）[#5115](https://github.com/nodejs/node/pull/5115)
* \[[`53cbd0564f`](https://github.com/nodejs/node/commit/53cbd0564f)] - **tools**：为一元运算符周围的空格添加 lint 检查（Rich Trott）[#5063](https://github.com/nodejs/node/pull/5063)
* \[[`7fa5959c59`](https://github.com/nodejs/node/commit/7fa5959c59)] - **tools**：修复 doc/json.js 中重复声明的变量（Rich Trott）[#5047](https://github.com/nodejs/node/pull/5047)
* \[[`e95fd6ae70`](https://github.com/nodejs/node/commit/e95fd6ae70)] - **tools**：将 lint 应用于文档工具（Rich Trott）[#4973](https://github.com/nodejs/node/pull/4973)
* \[[`777ed82162`](https://github.com/nodejs/node/commit/777ed82162)] - **tools**：修复 JSON 文档中构造函数的检测（Timothy Gu）[#4966](https://github.com/nodejs/node/pull/4966)
* \[[`5d55f59c85`](https://github.com/nodejs/node/commit/5d55f59c85)] - **tools**：在 JSON 文档中添加属性类型（Timothy Gu）[#4884](https://github.com/nodejs/node/pull/4884)
* \[[`fd5c56698e`](https://github.com/nodejs/node/commit/fd5c56698e)] - **tools**：为发布工具添加对子键的支持（Myles Borins）[#4807](https://github.com/nodejs/node/pull/4807)
* \[[`34df6a5c0c`](https://github.com/nodejs/node/commit/34df6a5c0c)] - **tools**：启用多项 ESLint 错误规则（Roman Reiss）[#4864](https://github.com/nodejs/node/pull/4864)
* \[[`386ad7e0b5`](https://github.com/nodejs/node/commit/386ad7e0b5)] - **tools**：修复设置包含与号的路径（Brian White）[#4804](https://github.com/nodejs/node/pull/4804)
* \[[`e415eb27e5`](https://github.com/nodejs/node/commit/e415eb27e5)] - **url**：更改使用 let 的变量作用域（Kári Tristan Helgason）[#4867](https://github.com/nodejs/node/pull/4867)

<a id="5.5.0"></a>

## 2016-01-20，版本 5.5.0（稳定版），@evanlucas

### 主要变更

* **events**：确保 console 函数存在（Dave）[#4479](https://github.com/nodejs/node/pull/4479)
* **fs**：为 fs.createWriteStream 添加 autoClose 选项（Saquib）[#3679](https://github.com/nodejs/node/pull/3679)
* **http**：改进 expect 头部处理（Daniel Sellers）[#4501](https://github.com/nodejs/node/pull/4501)
* **node**：允许使用 -i 预加载模块（Evan Lucas）[#4696](https://github.com/nodejs/node/pull/4696)
* **v8,src**：公开有关堆空间的统计信息（`v8.getHeapSpaceStatistics()`）（Ben Ripkens）[#4463](https://github.com/nodejs/node/pull/4463)
* 小幅性能改进：
  * **lib**：尽可能使用箭头函数代替 bind（Minwoo Jung）[#3622](https://github.com/nodejs/node/pull/3622)。
    * （误漏于 v5.4.0）
  * **module**：更积极地缓存 stat() 结果（Ben Noordhuis）[#4575](https://github.com/nodejs/node/pull/4575)
  * **querystring**：提升 parse() 性能（Brian White）[#4675](https://github.com/nodejs/node/pull/4675)

### 已知问题

* REPL 中的代理对可能会使终端冻结。 [#690](https://github.com/nodejs/node/issues/690)
* 在 DNS 查询进行中调用 `dns.setServers()` 可能会在断言失败时导致进程崩溃。 [#894](https://github.com/nodejs/node/issues/894)
* 在两个完整主机之间进行解析时，`url.resolve` 可能会传递 url 的 auth 部分，见 [#1435](https://github.com/nodejs/node/issues/1435)。
* 文件系统路径中的 Unicode 字符在不同平台或 Node.js API 中的处理并不一致。见 [#2088](https://github.com/nodejs/node/issues/2088)、[#3401](https://github.com/nodejs/node/issues/3401) 和 [#3519](https://github.com/nodejs/node/issues/3519)。

### 提交

* \[[`8d0ca10752`](https://github.com/nodejs/node/commit/8d0ca10752)] - **buffer**：使 byteLength 正确处理 Buffer（Jackson Tian）[#4738](https://github.com/nodejs/node/pull/4738)
* \[[`83d2b7707e`](https://github.com/nodejs/node/commit/83d2b7707e)] - **buffer**：移除不必要的 TODO 注释（Peter Geiss）[#4719](https://github.com/nodejs/node/pull/4719)
* \[[`8182ec094d`](https://github.com/nodejs/node/commit/8182ec094d)] - **build**：添加选择 VS 版本的选项（julien.waechter）[#4645](https://github.com/nodejs/node/pull/4645)
* \[[`4383acd9f4`](https://github.com/nodejs/node/commit/4383acd9f4)] - **build**：修复并重构 vcbuild.bat 中的 VTune 配置（Rod Vagg）[#4192](https://github.com/nodejs/node/pull/4192)
* \[[`be0b0b8cb9`](https://github.com/nodejs/node/commit/be0b0b8cb9)] - **build**：VTune 配置文本中的细微修正（Rod Vagg）[#4192](https://github.com/nodejs/node/pull/4192)
* \[[`9571be12f6`](https://github.com/nodejs/node/commit/9571be12f6)] - **cluster**：修复设置 suicide 属性时的竞态条件（Santiago Gimeno）[#4349](https://github.com/nodejs/node/pull/4349)
* \[[`ebd9addcd1`](https://github.com/nodejs/node/commit/ebd9addcd1)] - **crypto**：清除 ECDH::Initialize 中的错误堆栈（Fedor Indutny）[#4689](https://github.com/nodejs/node/pull/4689)
* \[[`66b9c0d8bd`](https://github.com/nodejs/node/commit/66b9c0d8bd)] - **debugger**：移除变量重复声明（Rich Trott）[#4633](https://github.com/nodejs/node/pull/4633)
* \[[`88b2889679`](https://github.com/nodejs/node/commit/88b2889679)] - **dgram**：阻止 bind() 的优化被禁用（Brian White）[#4613](https://github.com/nodejs/node/pull/4613)
* \[[`8a11b8c0ef`](https://github.com/nodejs/node/commit/8a11b8c0ef)] - **doc**：恢复 ICU 第三方软件许可（Richard Lau）[#4762](https://github.com/nodejs/node/pull/4762)
* \[[`212a44df03`](https://github.com/nodejs/node/commit/212a44df03)] - **doc**：澄清 http.request() 中的默认协议（cjihrig）[#4714](https://github.com/nodejs/node/pull/4714)
* \[[`3297036345`](https://github.com/nodejs/node/commit/3297036345)] - **doc**：更新发布文档中的 branch-diff 参数（Rod Vagg）[#4691](https://github.com/nodejs/node/pull/4691)
* \[[`666c089e68`](https://github.com/nodejs/node/commit/666c089e68)] - **doc**：修复 addons.markdown 和 http.markdown 中的命名锚点（Michael Theriot）[#4708](https://github.com/nodejs/node/pull/4708)
* \[[`310530b7ec`](https://github.com/nodejs/node/commit/310530b7ec)] - **doc**：在 fs.markdown 中为 Write/ReadStream 添加 path 属性（Claudio Rodriguez）[#4368](https://github.com/nodejs/node/pull/4368)
* \[[`3470574cb6`](https://github.com/nodejs/node/commit/3470574cb6)] - **doc**：澄清第一个 stream 部分的说明（Vitor Cortez）[#4234](https://github.com/nodejs/node/pull/4234)
* \[[`d91646b9c7`](https://github.com/nodejs/node/commit/d91646b9c7)] - **doc**：使用 tools/license-builder.sh 重建 LICENSE（Rod Vagg）[#4194](https://github.com/nodejs/node/pull/4194)
* \[[`265e2f557b`](https://github.com/nodejs/node/commit/265e2f557b)] - **doc**：修复 doc/node.1 中的拼写错误（Jérémy Lal）[#4680](https://github.com/nodejs/node/pull/4680)
* \[[`4c132fe61e`](https://github.com/nodejs/node/commit/4c132fe61e)] - **doc**：使引用可点击（Roman Klauke）[#4654](https://github.com/nodejs/node/pull/4654)
* \[[`d139704ff7`](https://github.com/nodejs/node/commit/d139704ff7)] - **doc**：改进 child\_process.execFile() 代码示例（Ryan Sobol）[#4504](https://github.com/nodejs/node/pull/4504)
* \[[`eeb6fdcd0f`](https://github.com/nodejs/node/commit/eeb6fdcd0f)] - **doc**：为更多 stream 选项添加文档（zoubin）[#4639](https://github.com/nodejs/node/pull/4639)
* \[[`b6ab6d2de5`](https://github.com/nodejs/node/commit/b6ab6d2de5)] - **doc**：在 releases.md 中添加 branch-diff 示例（Myles Borins）[#4636](https://github.com/nodejs/node/pull/4636)
* \[[`287325c5e8`](https://github.com/nodejs/node/commit/287325c5e8)] - **docs**：更新 Myles Borins 的 gpg 密钥（Myles Borins）[#4657](https://github.com/nodejs/node/pull/4657)
* \[[`65825b79aa`](https://github.com/nodejs/node/commit/65825b79aa)] - **docs**：修复 releases.md 中的 npm 命令（Myles Borins）[#4656](https://github.com/nodejs/node/pull/4656)
* \[[`f9a59c1d3b`](https://github.com/nodejs/node/commit/f9a59c1d3b)] - **(SEMVER-MINOR)** **events**：确保 console 函数存在（Dave）[#4479](https://github.com/nodejs/node/pull/4479)
* \[[`6039a7c1b5`](https://github.com/nodejs/node/commit/6039a7c1b5)] - **(SEMVER-MINOR)** **fs**：为 fs.createWriteStream 添加 autoClose 选项（Saquib）[#3679](https://github.com/nodejs/node/pull/3679)
* \[[`ed55169834`](https://github.com/nodejs/node/commit/ed55169834)] - **gitignore**：永不忽略 debug 模块（Michaël Zasso）[#2286](https://github.com/nodejs/node/pull/2286)
* \[[`d755432fa9`](https://github.com/nodejs/node/commit/d755432fa9)] - **(SEMVER-MINOR)** **http**：改进 expect 头部处理（Daniel Sellers）[#4501](https://github.com/nodejs/node/pull/4501)
* \[[`7ce0e04f44`](https://github.com/nodejs/node/commit/7ce0e04f44)] - **lib**：修复 eslint 更新后的样式问题（Michaël Zasso）[nodejs/io.js#2286](https://github.com/nodejs/io.js/pull/2286)
* \[[`ae5bcf9528`](https://github.com/nodejs/node/commit/ae5bcf9528)] - **lib**：使用箭头函数代替 bind（Minwoo Jung）[#3622](https://github.com/nodejs/node/pull/3622)
* \[[`0ec093cd41`](https://github.com/nodejs/node/commit/0ec093cd41)] - **lib,test**：移除多余的分号（Michaël Zasso）[#2205](https://github.com/nodejs/node/pull/2205)
* \[[`d8f5bd4fe1`](https://github.com/nodejs/node/commit/d8f5bd4fe1)] - **module**：避免 ArgumentsAdaptorTrampoline 栈帧（Ben Noordhuis）[#4575](https://github.com/nodejs/node/pull/4575)
* \[[`83f8d98806`](https://github.com/nodejs/node/commit/83f8d98806)] - **module**：更积极地缓存 stat() 结果（Ben Noordhuis）[#4575](https://github.com/nodejs/node/pull/4575)
* \[[`ff64a4c395`](https://github.com/nodejs/node/commit/ff64a4c395)] - **(SEMVER-MINOR)** **node**：允许使用 -i 预加载模块（Evan Lucas）[#4696](https://github.com/nodejs/node/pull/4696)
* \[[`4bc1a47761`](https://github.com/nodejs/node/commit/4bc1a47761)] - **querystring**：提升 parse() 性能（Brian White）[#4675](https://github.com/nodejs/node/pull/4675)
* \[[`ad63d350d4`](https://github.com/nodejs/node/commit/ad63d350d4)] - **readline**：移除 XXX 并输出 debuglog（Kohei TAKATA）[#4690](https://github.com/nodejs/node/pull/4690)
* \[[`da550aa063`](https://github.com/nodejs/node/commit/da550aa063)] - **repl**：确保 historyPath 已修剪（Evan Lucas）[#4539](https://github.com/nodejs/node/pull/4539)
* \[[`a2c257a3ef`](https://github.com/nodejs/node/commit/a2c257a3ef)] - **src**：修复 process.hrtime() 中的负值（Ben Noordhuis）[#4757](https://github.com/nodejs/node/pull/4757)
* \[[`8bad51977a`](https://github.com/nodejs/node/commit/8bad51977a)] - **src**：在空查询时返回 UV_EAI_NODATA（cjihrig）[#4715](https://github.com/nodejs/node/pull/4715)
* \[[`761cf2bf6a`](https://github.com/nodejs/node/commit/761cf2bf6a)] - **src**：不要使用 ERR_peek_error() 检查失败（Ben Noordhuis）[#4731](https://github.com/nodejs/node/pull/4731)
* \[[`426ff820f5`](https://github.com/nodejs/node/commit/426ff820f5)] - **stream**：防止 ReadableState 中的对象映射发生变化（Evan Lucas）[#4761](https://github.com/nodejs/node/pull/4761)
* \[[`e65f1f7954`](https://github.com/nodejs/node/commit/e65f1f7954)] - **test**：修复 tls-multi-key 竞态条件（Santiago Gimeno）[#3966](https://github.com/nodejs/node/pull/3966)
* \[[`3727ae0d7d`](https://github.com/nodejs/node/commit/3727ae0d7d)] - **test**：使用 addon.md 的块标题作为测试目录名（Rod Vagg）[#4412](https://github.com/nodejs/node/pull/4412)
* \[[`a347cd793f`](https://github.com/nodejs/node/commit/a347cd793f)] - **test**：使 test-cluster-disconnect-leak 更可靠（Rich Trott）[#4736](https://github.com/nodejs/node/pull/4736)
* \[[`a39b28bb5a`](https://github.com/nodejs/node/commit/a39b28bb5a)] - **test**：修复 space-in-parens ESLint 规则的问题（Roman Reiss）[#4753](https://github.com/nodejs/node/pull/4753)
* \[[`d1aabd6264`](https://github.com/nodejs/node/commit/d1aabd6264)] - **test**：修复 eslint 更新后的样式问题（Michaël Zasso）[nodejs/io.js#2286](https://github.com/nodejs/io.js/pull/2286)
* \[[`e98bcfa2cb`](https://github.com/nodejs/node/commit/e98bcfa2cb)] - **test**：移除测试中的 1 秒延迟（Rich Trott）[#4616](https://github.com/nodejs/node/pull/4616)
* \[[`6cfd0b5a32`](https://github.com/nodejs/node/commit/6cfd0b5a32)] - **test**：修复不稳定的 test-net-socket-local-address（cjihrig）[#4650](https://github.com/nodejs/node/pull/4650)
* \[[`e22cc6c2eb`](https://github.com/nodejs/node/commit/e22cc6c2eb)] - **test**：修复 test-net-server-pause-on-connect 中的竞态（Rich Trott）[#4637](https://github.com/nodejs/node/pull/4637)
* \[[`9164c00bdb`](https://github.com/nodejs/node/commit/9164c00bdb)] - **test**：将资源密集型测试移至顺序执行（Rich Trott）[#4615](https://github.com/nodejs/node/pull/4615)
* \[[`d8ba2c0de4`](https://github.com/nodejs/node/commit/d8ba2c0de4)] - **test**：修复 `http-upgrade-client` 的不稳定性（Santiago Gimeno）[#4602](https://github.com/nodejs/node/pull/4602)
* \[[`6018fa1f57`](https://github.com/nodejs/node/commit/6018fa1f57)] - **test**：修复 `http-upgrade-agent` 的不稳定性（Santiago Gimeno）[#4520](https://github.com/nodejs/node/pull/4520)
* \[[`8f4f5b3ca5`](https://github.com/nodejs/node/commit/8f4f5b3ca5)] - **tools**：启用 space-in-parens ESLint 规则（Roman Reiss）[#4753](https://github.com/nodejs/node/pull/4753)
* \[[`162e16afdb`](https://github.com/nodejs/node/commit/162e16afdb)] - **tools**：在 eslint 中启用 no-extra-semi 规则（Michaël Zasso）[#2205](https://github.com/nodejs/node/pull/2205)
* \[[`031b87d42d`](https://github.com/nodejs/node/commit/031b87d42d)] - **tools**：添加 license-builder.sh 以构建 LICENSE（Rod Vagg）[#4194](https://github.com/nodejs/node/pull/4194)
* \[[`ec8e0ae697`](https://github.com/nodejs/node/commit/ec8e0ae697)] - **tools**：修复 eslint 更新后的样式问题（Michaël Zasso）[nodejs/io.js#2286](https://github.com/nodejs/io.js/pull/2286)
* \[[`4d5ee7a512`](https://github.com/nodejs/node/commit/4d5ee7a512)] - **tools**：更新 eslint 配置（Michaël Zasso）[nodejs/io.js#2286](https://github.com/nodejs/io.js/pull/2286)
* \[[`2d441493a4`](https://github.com/nodejs/node/commit/2d441493a4)] - **tools**：将 eslint 更新到 v1.10.3（Michaël Zasso）[nodejs/io.js#2286](https://github.com/nodejs/io.js/pull/2286)
* \[[`fe23f4241f`](https://github.com/nodejs/node/commit/fe23f4241f)] - **tools**：修复 ICU 的 license-builder.sh（Richard Lau）[#4762](https://github.com/nodejs/node/pull/4762)
* \[[`5f57005ec9`](https://github.com/nodejs/node/commit/5f57005ec9)] - **(SEMVER-MINOR)** **v8,src**：公开有关堆空间的统计信息（Ben Ripkens）[#4463](https://github.com/nodejs/node/pull/4463)

<a id="5.4.1"></a>

## 2016-01-12，版本 5.4.1（稳定版），@TheAlphaNerd

### 重要变更

* 性能方面的小幅改进：
  * **module**：将早返回时不必要的工作移除（Andres Suarez） [#3579](https://github.com/nodejs/node/pull/3579)
* 各种 bug 修复
* 各种文档修复
* 各种测试改进

### 已知问题

* REPL 中的代理对可能会冻结终端。 [#690](https://github.com/nodejs/node/issues/690)
* 在 DNS 查询进行中调用 `dns.setServers()` 可能会在断言失败时导致进程崩溃。 [#894](https://github.com/nodejs/node/issues/894)
* 在两个完整主机之间解析时，`url.resolve` 可能会转移 url 的 auth 部分，参见 [#1435](https://github.com/nodejs/node/issues/1435)。
* 文件系统路径中的 Unicode 字符在不同平台或 Node.js API 中的处理并不一致。参见 [#2088](https://github.com/nodejs/node/issues/2088)、[#3401](https://github.com/nodejs/node/issues/3401) 和 [#3519](https://github.com/nodejs/node/issues/3519)。

### 提交

* \[[`ff539c5bb5`](https://github.com/nodejs/node/commit/ff539c5bb5)] - **cluster**：在断开连接时忽略 queryServer 消息（Santiago Gimeno） [#4465](https://github.com/nodejs/node/pull/4465)
* \[[`00148b3de1`](https://github.com/nodejs/node/commit/00148b3de1)] - **deps**：从上游 V8 回移植 066747e（Ali Ijaz Sheikh） [#4625](https://github.com/nodejs/node/pull/4625)
* \[[`3912b5cbda`](https://github.com/nodejs/node/commit/3912b5cbda)] - **doc**：增加 readline 逐行解析的用法（Robert Jefe Lindstaedt） [#4609](https://github.com/nodejs/node/pull/4609)
* \[[`102fb7d3a1`](https://github.com/nodejs/node/commit/102fb7d3a1)] - **doc**：移除“above”和“below”引用（Richard Sun） [#4499](https://github.com/nodejs/node/pull/4499)
* \[[`df87176ae0`](https://github.com/nodejs/node/commit/df87176ae0)] - **doc**：更新样式表以匹配首页（Roman Reiss） [#4621](https://github.com/nodejs/node/pull/4621)
* \[[`ede98d1f98`](https://github.com/nodejs/node/commit/ede98d1f98)] - **doc**：更强烈地建议使用 userland assert（Wyatt Preul） [#4535](https://github.com/nodejs/node/pull/4535)
* \[[`fdfc72c977`](https://github.com/nodejs/node/commit/fdfc72c977)] - **doc**：将 http.IncomingMessage 标注为 Class（Sequoia McDowell） [#4589](https://github.com/nodejs/node/pull/4589)
* \[[`b181e26975`](https://github.com/nodejs/node/commit/b181e26975)] - **doc**：记录 http 的 server.listen 返回值（Sequoia McDowell） [#4590](https://github.com/nodejs/node/pull/4590)
* \[[`97aaeb8519`](https://github.com/nodejs/node/commit/97aaeb8519)] - **doc**：修正关于 latest-codename 的描述（Minwoo Jung） [#4583](https://github.com/nodejs/node/pull/4583)
* \[[`0126615d1e`](https://github.com/nodejs/node/commit/0126615d1e)] - **doc**：将 Evan Lucas 添加到 Release Team（Evan Lucas） [#4579](https://github.com/nodejs/node/pull/4579)
* \[[`ec73c69412`](https://github.com/nodejs/node/commit/ec73c69412)] - **doc**：将 Myles Borins 添加到 Release Team（Myles Borins） [#4578](https://github.com/nodejs/node/pull/4578)
* \[[`e703c9a4e2`](https://github.com/nodejs/node/commit/e703c9a4e2)] - **doc**：更新 releases.md（cjihrig） [#4540](https://github.com/nodejs/node/pull/4540)
* \[[`ac1108d5e7`](https://github.com/nodejs/node/commit/ac1108d5e7)] - **doc**：为 readline 补上缺失的反引号（Brian White） [#4549](https://github.com/nodejs/node/pull/4549)
* \[[`09bc0c6a05`](https://github.com/nodejs/node/commit/09bc0c6a05)] - **doc**：改进 crypto.markdown 文案（James M Snell） [#4435](https://github.com/nodejs/node/pull/4435)
* \[[`787c5d96bd`](https://github.com/nodejs/node/commit/787c5d96bd)] - **http**：移除变量重复声明（Rich Trott） [#4612](https://github.com/nodejs/node/pull/4612)
* \[[`145b66820f`](https://github.com/nodejs/node/commit/145b66820f)] - **module**：将早返回时不必要的工作移除（Andres Suarez） [#3579](https://github.com/nodejs/node/pull/3579)
* \[[`ffb7deb443`](https://github.com/nodejs/node/commit/ffb7deb443)] - **net**：移除 connect 中的 hot path 注释（Evan Lucas） [#4648](https://github.com/nodejs/node/pull/4648)
* \[[`799aa74d90`](https://github.com/nodejs/node/commit/799aa74d90)] - **net**：修复 Android 的 dns 查找（Josh Dague） [#4580](https://github.com/nodejs/node/pull/4580)
* \[[`9accebe087`](https://github.com/nodejs/node/commit/9accebe087)] - **net, doc**：修复 net.js 中的换行 lint 问题（James M Snell） [#4588](https://github.com/nodejs/node/pull/4588)
* \[[`37a546b490`](https://github.com/nodejs/node/commit/37a546b490)] - **src**：移除变量的重复声明（Rich Trott） [#4605](https://github.com/nodejs/node/pull/4605)
* \[[`b515ccc2a1`](https://github.com/nodejs/node/commit/b515ccc2a1)] - **stream**：移除 transform 中无用的 if 测试（zoubin） [#4617](https://github.com/nodejs/node/pull/4617)
* \[[`ea6e26d904`](https://github.com/nodejs/node/commit/ea6e26d904)] - **test**：移除重复的 fork 模块导入（Rich Trott） [#4634](https://github.com/nodejs/node/pull/4634)
* \[[`b14b2aec5e`](https://github.com/nodejs/node/commit/b14b2aec5e)] - **test**：common 模块只 require 一次（Rich Trott） [#4611](https://github.com/nodejs/node/pull/4611)
* \[[`f28a640505`](https://github.com/nodejs/node/commit/f28a640505)] - **test**：http 模块只包含一次（Rich Trott） [#4606](https://github.com/nodejs/node/pull/4606)
* \[[`6f9a96f497`](https://github.com/nodejs/node/commit/6f9a96f497)] - **test**：修复不稳定的 unrefed timers 测试（Rich Trott） [#4599](https://github.com/nodejs/node/pull/4599)
* \[[`b70eec8f7b`](https://github.com/nodejs/node/commit/b70eec8f7b)] - **tls_legacy**：不要读取 OpenSSL 的栈（Fedor Indutny） [#4624](https://github.com/nodejs/node/pull/4624)

<a id="5.4.0"></a>

## 2016-01-06，版本 5.4.0（稳定版），@Fishrock123

### 重要变更

* **http**：
  * 新增了一个状态码：451 - “Unavailable For Legal Reasons”（出于法律原因不可用）（Max Barinov） [#4377](https://github.com/nodejs/node/pull/4377)。
  * 现在，已保持活动状态的空闲 socket 会处理错误（José F. Romaniello） [#4482](https://github.com/nodejs/node/pull/4482)。
* 此版本还包括若干小幅性能改进：
  * **assert**：在比较 TypedArrays 时，deepEqual 现在更快（Claudio Rodriguez） [#4330](https://github.com/nodejs/node/pull/4330)。
  * **lib**：尽可能使用箭头函数替代 bind（Minwoo Jung） [node#3622](https://github.com/nodejs/node/pull/3622)。
  * **node**：提升 `process.env` 的访问器性能（Trevor Norris） [#3780](https://github.com/nodejs/node/pull/3780)。
  * **node**：提升 `process.hrtime()` 的性能（Trevor Norris） [#3780](https://github.com/nodejs/node/pull/3780),（Evan Lucas） [#4484](https://github.com/nodejs/node/pull/4484)。
  * **node**：提升 GetActiveHandles 的性能（Trevor Norris） [#3780](https://github.com/nodejs/node/pull/3780)。
  * **util**：在 `util.format()` 中使用更快的迭代方式（Jackson Tian） [#3964](https://github.com/nodejs/node/pull/3964)。

### 已知问题

* REPL 中的代理对可能会冻结终端。 [#690](https://github.com/nodejs/node/issues/690)
* 在 DNS 查询进行中调用 `dns.setServers()` 可能会在断言失败时导致进程崩溃。 [#894](https://github.com/nodejs/node/issues/894)
* 在两个完整主机之间解析时，`url.resolve` 可能会转移 url 的 auth 部分，参见 [#1435](https://github.com/nodejs/node/issues/1435)。
* 文件系统路径中的 Unicode 字符在不同平台或 Node.js API 中的处理并不一致。参见 [#2088](https://github.com/nodejs/node/issues/2088)、[#3401](https://github.com/nodejs/node/issues/3401) 和 [#3519](https://github.com/nodejs/node/issues/3519)。

### 提交

* \[[`d265fc821a`](https://github.com/nodejs/node/commit/d265fc821a)] - **assert**：TypedArray 深度相等性能修复（Claudio Rodriguez） [#4330](https://github.com/nodejs/node/pull/4330)
* \[[`6d8053ab56`](https://github.com/nodejs/node/commit/6d8053ab56)] - **buffer**：从 new Buffer(0) 创建 Buffer 的更快路径（Jackson Tian） [#4326](https://github.com/nodejs/node/pull/4326)
* \[[`8781c59878`](https://github.com/nodejs/node/commit/8781c59878)] - **buffer**：重构 buffer 创建（Jackson Tian） [#4340](https://github.com/nodejs/node/pull/4340)
* \[[`252628294b`](https://github.com/nodejs/node/commit/252628294b)] - **child_process**：防范竞态条件（Rich Trott） [#4418](https://github.com/nodejs/node/pull/4418)
* \[[`fcf632bc6a`](https://github.com/nodejs/node/commit/fcf632bc6a)] - **crypto**：以与常规方式相同的方式加载 PFX 链（Fedor Indutny） [#4165](https://github.com/nodejs/node/pull/4165)
* \[[`a5094a35a0`](https://github.com/nodejs/node/commit/a5094a35a0)] - **debugger**：防范来自非 node 上下文的调用（Ben Noordhuis） [#4328](https://github.com/nodejs/node/pull/4328)
* \[[`b4c51c5b76`](https://github.com/nodejs/node/commit/b4c51c5b76)] - **deps**：从 V8 上游回移植 200315c（Vladimir Kurchatkin） [#4128](https://github.com/nodejs/node/pull/4128)
* \[[`334e73942e`](https://github.com/nodejs/node/commit/334e73942e)] - **doc**：修复 Buffer 文档中的标题级别错误（Shigeki Ohtsu） [#4537](https://github.com/nodejs/node/pull/4537)
* \[[`5be0259181`](https://github.com/nodejs/node/commit/5be0259181)] - **doc**：关闭 process.title 描述中的反引号（Dave） [#4534](https://github.com/nodejs/node/pull/4534)
* \[[`35aec4c14d`](https://github.com/nodejs/node/commit/35aec4c14d)] - **doc**：修复 stream.markdown 中的编号（Richard Sun） [#4538](https://github.com/nodejs/node/pull/4538)
* \[[`982f3227a5`](https://github.com/nodejs/node/commit/982f3227a5)] - **doc**：改进 dgram.markdown 文案（James M Snell） [#4437](https://github.com/nodejs/node/pull/4437)
* \[[`6cdfa38d23`](https://github.com/nodejs/node/commit/6cdfa38d23)] - **doc**：改进 errors.markdown 文案（James M Snell） [#4454](https://github.com/nodejs/node/pull/4454)
* \[[`6c7bcd5007`](https://github.com/nodejs/node/commit/6c7bcd5007)] - **doc**：修复 website wg 的错误链接（jona） [#4357](https://github.com/nodejs/node/pull/4357)
* \[[`eee50821dc`](https://github.com/nodejs/node/commit/eee50821dc)] - **doc**：说明 http.Server 继承自 net.Server（Ryan Sobol） [#4455](https://github.com/nodejs/node/pull/4455)
* \[[`c745b4d5f8`](https://github.com/nodejs/node/commit/c745b4d5f8)] - **doc**：解释 ClientRequest#setTimeout 的时间单位（Ben Ripkens） [#4458](https://github.com/nodejs/node/pull/4458)
* \[[`40076bf7f8`](https://github.com/nodejs/node/commit/40076bf7f8)] - **doc**：修正 lib/url.js 注释中的拼写错误（Nik Nyby） [#4390](https://github.com/nodejs/node/pull/4390)
* \[[`5a223d64e3`](https://github.com/nodejs/node/commit/5a223d64e3)] - **doc**：为 stream.markdown 中的 _transform、_flush、_writev 添加锚点（iamchenxin） [#4448](https://github.com/nodejs/node/pull/4448)
* \[[`e8bbeecc4c`](https://github.com/nodejs/node/commit/e8bbeecc4c)] - **doc**：改进 debugger.markdown 文案（James M Snell） [#4436](https://github.com/nodejs/node/pull/4436)
* \[[`ccd75fe3fb`](https://github.com/nodejs/node/commit/ccd75fe3fb)] - **doc**：改进 events.markdown 文案（James M Snell） [#4468](https://github.com/nodejs/node/pull/4468)
* \[[`ed15962777`](https://github.com/nodejs/node/commit/ed15962777)] - **doc**：改进 dns.markdown 文案（James M Snell） [#4449](https://github.com/nodejs/node/pull/4449)
* \[[`e177cc9fdf`](https://github.com/nodejs/node/commit/e177cc9fdf)] - **doc**：改进 console.markdown 文案（James M Snell） [#4428](https://github.com/nodejs/node/pull/4428)
* \[[`c1bc9a1023`](https://github.com/nodejs/node/commit/c1bc9a1023)] - **doc**：改进 child_process.markdown 文案（James M Snell） [#4383](https://github.com/nodejs/node/pull/4383)
* \[[`150f62847c`](https://github.com/nodejs/node/commit/150f62847c)] - **doc**：校对 setTimeout() 文档（Rich Trott） [#4434](https://github.com/nodejs/node/pull/4434)
* \[[`9e667354be`](https://github.com/nodejs/node/commit/9e667354be)] - **doc**：修复 process.markdown 中的格式（Rich Trott） [#4433](https://github.com/nodejs/node/pull/4433)
* \[[`bc1c0dc3fb`](https://github.com/nodejs/node/commit/bc1c0dc3fb)] - **doc**：让 WORKING_GROUPS.md 启动文档保持最新（James M Snell） [#4367](https://github.com/nodejs/node/pull/4367)
* \[[`c835ba3601`](https://github.com/nodejs/node/commit/c835ba3601)] - **doc**：改进 assert.markdown 文案（James M Snell） [#4360](https://github.com/nodejs/node/pull/4360)
* \[[`e79eda74c0`](https://github.com/nodejs/node/commit/e79eda74c0)] - **doc**：校对 releases.md（Rich Trott） [#4384](https://github.com/nodejs/node/pull/4384)
* \[[`6450d8667f`](https://github.com/nodejs/node/commit/6450d8667f)] - **doc**：改进 tls 文档中的语法（Adri Van Houdt） [#4315](https://github.com/nodejs/node/pull/4315)
* \[[`474a0f081a`](https://github.com/nodejs/node/commit/474a0f081a)] - **doc**：改进 buffer.markdown 文案（James M Snell） [#4370](https://github.com/nodejs/node/pull/4370)
* \[[`57684d650e`](https://github.com/nodejs/node/commit/57684d650e)] - **doc**：改进 addons.markdown 文案（James M Snell） [#4320](https://github.com/nodejs/node/pull/4320)
* \[[`04dd861221`](https://github.com/nodejs/node/commit/04dd861221)] - **doc**：修复并现代化文档中的示例（James M Snell） [#4282](https://github.com/nodejs/node/pull/4282)
* \[[`5ce6e99474`](https://github.com/nodejs/node/commit/5ce6e99474)] - **doc**：buffer.markdown 中引用 buf.write() 的拼写错误（chrisjohn404） [#4324](https://github.com/nodejs/node/pull/4324)
* \[[`699bf2c464`](https://github.com/nodejs/node/commit/699bf2c464)] - **doc**：修复 addons.markdown 中的链接（Nicholas Young） [#4331](https://github.com/nodejs/node/pull/4331)
* \[[`e742422757`](https://github.com/nodejs/node/commit/e742422757)] - **fs**：对 readdir(Sync) 使用 pushValueToArray（Trevor Norris） [#3780](https://github.com/nodejs/node/pull/3780)
* \[[`1dd2d015d2`](https://github.com/nodejs/node/commit/1dd2d015d2)] - **(SEMVER-MINOR)** **http**：处理空闲 socket 上的错误（José F. Romaniello） [#4482](https://github.com/nodejs/node/pull/4482)
* \[[`083ae166bb`](https://github.com/nodejs/node/commit/083ae166bb)] - **http**：使用 `self.keepAlive` 而不是 `self.options.keepAlive`（Damian Schenkelman） [#4407](https://github.com/nodejs/node/pull/4407)
* \[[`ffb4a6e0e4`](https://github.com/nodejs/node/commit/ffb4a6e0e4)] - **http**：修复非字符串 header 值的拼接（Brian White） [#4460](https://github.com/nodejs/node/pull/4460)
* \[[`c77fd6829a`](https://github.com/nodejs/node/commit/c77fd6829a)] - **(SEMVER-MINOR)** **http**：451 状态码“出于法律原因不可用”（Max Barinov） [#4377](https://github.com/nodejs/node/pull/4377)
* \[[`8f7af9a489`](https://github.com/nodejs/node/commit/8f7af9a489)] - **http**：移除多余的 removeSocket 调用（Dave） [#4172](https://github.com/nodejs/node/pull/4172)
* \[[`b841967103`](https://github.com/nodejs/node/commit/b841967103)] - **http**：移除一个不必要的赋值（Bo Borgerson） [#4323](https://github.com/nodejs/node/pull/4323)
* \[[`b8366e76dd`](https://github.com/nodejs/node/commit/b8366e76dd)] - **http_parser**：对 header 使用 pushValueToArray（Trevor Norris） [#3780](https://github.com/nodejs/node/pull/3780)
* \[[`ca97e7276e`](https://github.com/nodejs/node/commit/ca97e7276e)] - **https**：在 agent key 中使用 `servername`（Fedor Indutny） [#4389](https://github.com/nodejs/node/pull/4389)
* \[[`b5aaccc6af`](https://github.com/nodejs/node/commit/b5aaccc6af)] - **lib**：移除未使用的模块（Rich Trott） [#4396](https://github.com/nodejs/node/pull/4396)
* \[[`921fb540c1`](https://github.com/nodejs/node/commit/921fb540c1)] - **node**：提升 process.hrtime() 的性能（Evan Lucas） [#4484](https://github.com/nodejs/node/pull/4484)
* \[[`ecef817a28`](https://github.com/nodejs/node/commit/ecef817a28)] - **node**：提升 process.env 的访问器性能（Trevor Norris） [#3780](https://github.com/nodejs/node/pull/3780)
* \[[`89f056bdf3`](https://github.com/nodejs/node/commit/89f056bdf3)] - **node**：提升 hrtime() 的性能（Trevor Norris） [#3780](https://github.com/nodejs/node/pull/3780)
* \[[`c8fc217dc7`](https://github.com/nodejs/node/commit/c8fc217dc7)] - **node**：提升 GetActiveHandles 性能（Trevor Norris） [#3780](https://github.com/nodejs/node/pull/3780)
* \[[`8464667071`](https://github.com/nodejs/node/commit/8464667071)] - **node**：修复错误命名的函数调用（Trevor Norris） [#3780](https://github.com/nodejs/node/pull/3780)
* \[[`e57fd51a5e`](https://github.com/nodejs/node/commit/e57fd51a5e)] - **os**：修复 GetInterfaceAddresses 中的崩溃（Martin Bark） [#4272](https://github.com/nodejs/node/pull/4272)
* \[[`65c40d753f`](https://github.com/nodejs/node/commit/65c40d753f)] - **repl**：移除未使用的函数（Rich Trott）
* \[[`3d41a44dba`](https://github.com/nodejs/node/commit/3d41a44dba)] - **repl**：修复 node repl 历史记录的边缘情况。（Mudit Ameta） [#4108](https://github.com/nodejs/node/pull/4108)
* \[[`d11930d604`](https://github.com/nodejs/node/commit/d11930d604)] - **repl**：使用 String#repeat 代替 Array#join（Evan Lucas） [#3900](https://github.com/nodejs/node/pull/3900)
* \[[`4220d25626`](https://github.com/nodejs/node/commit/4220d25626)] - **test**：修复 v5.x 分支的 lint 问题（Jeremiah Senkpiel） [#4547](https://github.com/nodejs/node/pull/4547)
* \[[`4b14f1c983`](https://github.com/nodejs/node/commit/4b14f1c983)] - **test**：移除未使用的变量（Rich Trott） [#4536](https://github.com/nodejs/node/pull/4536)
* \[[`2a69ab32ec`](https://github.com/nodejs/node/commit/2a69ab32ec)] - **test**：恢复 test-domain-exit-dispose-again（Julien Gilli） [#4256](https://github.com/nodejs/node/pull/4256)
* \[[`ae0246641c`](https://github.com/nodejs/node/commit/ae0246641c)] - **test**：移除并行测试中的未使用变量（Rich Trott） [#4511](https://github.com/nodejs/node/pull/4511)
* \[[`984db93e7c`](https://github.com/nodejs/node/commit/984db93e7c)] - **test**：修复不稳定的 test-cluster-shared-leak（Rich Trott） [#4510](https://github.com/nodejs/node/pull/4510)
* \[[`30b0d7583a`](https://github.com/nodejs/node/commit/30b0d7583a)] - **test**：修复不稳定的 streams 测试（Rich Trott） [#4516](https://github.com/nodejs/node/pull/4516)
* \[[`46fefbc1b5`](https://github.com/nodejs/node/commit/46fefbc1b5)] - **test**：修复不稳定的 test-http-agent-keepalive（Rich Trott） [#4524](https://github.com/nodejs/node/pull/4524)
* \[[`e04a8401d9`](https://github.com/nodejs/node/commit/e04a8401d9)] - **test**：移除测试中的 flaky 标记（Rich Trott） [#4519](https://github.com/nodejs/node/pull/4519)
* \[[`a703b1bf73`](https://github.com/nodejs/node/commit/a703b1bf73)] - **test**：移除时间检查（Rich Trott） [#4494](https://github.com/nodejs/node/pull/4494)
* \[[`02b3a5be52`](https://github.com/nodejs/node/commit/02b3a5be52)] - **test**：重构 test-fs-empty-readStream（Rich Trott） [#4490](https://github.com/nodejs/node/pull/4490)
* \[[`ab3e5c1417`](https://github.com/nodejs/node/commit/ab3e5c1417)] - **test**：写入临时目录而不是 fixture 目录（Rich Trott） [#4489](https://github.com/nodejs/node/pull/4489)
* \[[`06043fdfa3`](https://github.com/nodejs/node/commit/06043fdfa3)] - **test**：移除未使用的模块（Rich Trott） [#4475](https://github.com/nodejs/node/pull/4475)
* \[[`f1a66bc249`](https://github.com/nodejs/node/commit/f1a66bc249)] - **test**：澄清域在测试中的作用（Rich Trott） [#4474](https://github.com/nodejs/node/pull/4474)
* \[[`08a3490dd6`](https://github.com/nodejs/node/commit/08a3490dd6)] - **test**：从环境中继承 JOBS（Johan Bergström） [#4495](https://github.com/nodejs/node/pull/4495)
* \[[`3bfc18763a`](https://github.com/nodejs/node/commit/3bfc18763a)] - **test**：改进 assert 消息（Rich Trott） [#4461](https://github.com/nodejs/node/pull/4461)
* \[[`d46d850461`](https://github.com/nodejs/node/commit/d46d850461)] - **test**：缩短 bogus socket 的路径（Rich Trott） [#4478](https://github.com/nodejs/node/pull/4478)
* \[[`f68f86cd0a`](https://github.com/nodejs/node/commit/f68f86cd0a)] - **test**：修复 test-http-client-onerror 中的竞态条件（Devin Nakamura） [#4346](https://github.com/nodejs/node/pull/4346)
* \[[`ec0b6362cf`](https://github.com/nodejs/node/commit/ec0b6362cf)] - **test**：移除未使用的 assert 模块导入（Rich Trott） [#4438](https://github.com/nodejs/node/pull/4438)
* \[[`ba2445046c`](https://github.com/nodejs/node/commit/ba2445046c)] - **test**：不要对相对路径使用 cwd（Johan Bergström） [#4477](https://github.com/nodejs/node/pull/4477)
* \[[`5110e4deed`](https://github.com/nodejs/node/commit/5110e4deed)] - **test**：不要假设某种特定的文件夹结构（Johan Bergström） [#3325](https://github.com/nodejs/node/pull/3325)
* \[[`55c6946400`](https://github.com/nodejs/node/commit/55c6946400)] - **test**：使临时路径可自定义（Johan Bergström） [#3325](https://github.com/nodejs/node/pull/3325)
* \[[`b19d19efaa`](https://github.com/nodejs/node/commit/b19d19efaa)] - **test**：在 Debug 模式下延长超时（Rich Trott） [#4431](https://github.com/nodejs/node/pull/4431)
* \[[`c6a99ddd37`](https://github.com/nodejs/node/commit/c6a99ddd37)] - **test**：移除 net 测试中的未使用变量（Rich Trott） [#4430](https://github.com/nodejs/node/pull/4430)
* \[[`54004f0e26`](https://github.com/nodejs/node/commit/54004f0e26)] - **test**：移除 ChildProcess 测试中的未使用变量（Rich Trott） [#4425](https://github.com/nodejs/node/pull/4425)
* \[[`e72112f90e`](https://github.com/nodejs/node/commit/e72112f90e)] - **test**：修复不稳定的 cluster-disconnect-race（Brian White） [#4457](https://github.com/nodejs/node/pull/4457)
* \[[`715afc9bbd`](https://github.com/nodejs/node/commit/715afc9bbd)] - **test**：修复不稳定的 cluster-net-send（Brian White） [#4444](https://github.com/nodejs/node/pull/4444)
* \[[`03c4bc704f`](https://github.com/nodejs/node/commit/03c4bc704f)] - **test**：修复不稳定的 child-process-fork-regr-gh-2847（Brian White） [#4442](https://github.com/nodejs/node/pull/4442)
* \[[`684eb32072`](https://github.com/nodejs/node/commit/684eb32072)] - **test**：移除 HTTPS 测试中的未使用变量（Rich Trott） [#4426](https://github.com/nodejs/node/pull/4426)
* \[[`585c01f674`](https://github.com/nodejs/node/commit/585c01f674)] - **test**：移除 TLS 测试中的未使用变量（Rich Trott） [#4424](https://github.com/nodejs/node/pull/4424)
* \[[`c36ca37e2a`](https://github.com/nodejs/node/commit/c36ca37e2a)] - **test**：移除 http 测试中的未使用变量（Rich Trott） [#4422](https://github.com/nodejs/node/pull/4422)
* \[[`c639d0f1fe`](https://github.com/nodejs/node/commit/c639d0f1fe)] - **test**：将 test-debug-no-context 标记为不稳定（Rich Trott） [#4421](https://github.com/nodejs/node/pull/4421)
* \[[`cd79ec268d`](https://github.com/nodejs/node/commit/cd79ec268d)] - **test**：移除不必要的赋值（Rich Trott） [#4408](https://github.com/nodejs/node/pull/4408)
* \[[`0799a9abaf`](https://github.com/nodejs/node/commit/0799a9abaf)] - **test**：移除 test-assert.js 中未使用的变量（Rich Trott） [#4405](https://github.com/nodejs/node/pull/4405)
* \[[`3710028a85`](https://github.com/nodejs/node/commit/3710028a85)] - **test**：移除未使用的 `util` 导入（Rich Trott） [#4397](https://github.com/nodejs/node/pull/4397)
* \[[`8c9d0c1f6f`](https://github.com/nodejs/node/commit/8c9d0c1f6f)] - **test**：重构 test-net-connect-options-ipv6（Rich Trott） [#4395](https://github.com/nodejs/node/pull/4395)
* \[[`874209022f`](https://github.com/nodejs/node/commit/874209022f)] - **test**：修复 http-response-multiheaders（Santiago Gimeno） [#3958](https://github.com/nodejs/node/pull/3958)
* \[[`71b79bcf54`](https://github.com/nodejs/node/commit/71b79bcf54)] - **test**：测试 addon.md 中每个块都包含 js 和 cc（Rod Vagg） [#4411](https://github.com/nodejs/node/pull/4411)
* \[[`00b37de243`](https://github.com/nodejs/node/commit/00b37de243)] - **test**：修复 domain-top-level-error-handler-throw（Santiago Gimeno） [#4364](https://github.com/nodejs/node/pull/4364)
* \[[`6d14b6520f`](https://github.com/nodejs/node/commit/6d14b6520f)] - **test**：在更多地方使用 platformTimeout()（Brian White） [#4387](https://github.com/nodejs/node/pull/4387)
* \[[`82f74caa56`](https://github.com/nodejs/node/commit/82f74caa56)] - **test**：修复不稳定的 test-net-error-twice（Brian White） [#4342](https://github.com/nodejs/node/pull/4342)
* \[[`96501e55be`](https://github.com/nodejs/node/commit/96501e55be)] - **test**：尝试其他 ipv6 localhost 备选项（Brian White） [#4325](https://github.com/nodejs/node/pull/4325)
* \[[`69343d6d2e`](https://github.com/nodejs/node/commit/69343d6d2e)] - **tls_wrap**：返回时清除错误（Fedor Indutny） [#4515](https://github.com/nodejs/node/pull/4515)
* \[[`ca9812cf4d`](https://github.com/nodejs/node/commit/ca9812cf4d)] - **tools**：修复文档解析中的警告（Shigeki Ohtsu） [#4537](https://github.com/nodejs/node/pull/4537)
* \[[`386030b524`](https://github.com/nodejs/node/commit/386030b524)] - **tools**：为 eslint 实现 no-unused-vars（Rich Trott） [#4536](https://github.com/nodejs/node/pull/4536)
* \[[`14a947fc70`](https://github.com/nodejs/node/commit/14a947fc70)] - **tools**：不 fork 地运行 tick processor（Matt Loring） [#4224](https://github.com/nodejs/node/pull/4224)
* \[[`8039ca06eb`](https://github.com/nodejs/node/commit/8039ca06eb)] - **util**：更快的 arrayToHash（Jackson Tian）  [#3964](https://github.com/nodejs/node/pull/3964)

<a id="5.3.0"></a>

## 2015-12-16，版本 5.3.0（稳定版），@cjihrig

### 重要变更

* **buffer**：
  * 已添加 `Buffer.prototype.includes()`，以保持与 TypedArrays 的一致性。 (Alexander Martin) [#3567](https://github.com/nodejs/node/pull/3567).
* **domains**：
  * 修复了对未捕获异常的处理。 (Julien Gilli) [#3654](https://github.com/nodejs/node/pull/3654).
* **https**：
  * 新增对禁用会话缓存的支持。 (Fedor Indutny) [#4252](https://github.com/nodejs/node/pull/4252).
* **repl**：
  * 允许通过 `require()` 导入第三方模块。这修正了 5.2.0 中的一个回归问题。 (Ben Noordhuis) [#4215](https://github.com/nodejs/node/pull/4215).
* **deps**：
  * 将 libuv 升级到 1.8.0。 (Saúl Ibarra Corretgé) [#4276](https://github.com/nodejs/node/pull/4276).

### 已知问题

* REPL 中的代理对可能会导致终端冻结。 [#690](https://github.com/nodejs/node/issues/690)
* 在 DNS 查询进行中调用 `dns.setServers()` 可能会在断言失败时导致进程崩溃。 [#894](https://github.com/nodejs/node/issues/894)
* 在解析两个完整主机之间的 URL 时，`url.resolve` 可能会转移 URL 的认证部分，参见 [#1435](https://github.com/nodejs/node/issues/1435)。
* 文件系统路径中的 Unicode 字符在不同平台或 Node.js API 之间的处理并不一致。参见 [#2088](https://github.com/nodejs/node/issues/2088)、[#3401](https://github.com/nodejs/node/issues/3401) 和 [#3519](https://github.com/nodejs/node/issues/3519)。

### 提交

* \[[`6ca5ea3860`](https://github.com/nodejs/node/commit/6ca5ea3860)] - 2015-12-09，版本 5.2.0（稳定版） (Rod Vagg) [#4181](https://github.com/nodejs/node/pull/4181)
* \[[`da5cdc2207`](https://github.com/nodejs/node/commit/da5cdc2207)] - **assert**: 适配扩展自 Error 的 ES6 类 (Rich Trott) [#4166](https://github.com/nodejs/node/pull/4166)
* \[[`67e181986a`](https://github.com/nodejs/node/commit/67e181986a)] - **(SEMVER-MINOR)** **buffer**: 添加 includes() 以与 TypedArray 保持一致 (Alexander Martin) [#3567](https://github.com/nodejs/node/pull/3567)
* \[[`84dea1bd0c`](https://github.com/nodejs/node/commit/84dea1bd0c)] - **configure**: 修复 arm vfpv2 (Jörg Krause) [#4203](https://github.com/nodejs/node/pull/4203)
* \[[`a7f5dfd14c`](https://github.com/nodejs/node/commit/a7f5dfd14c)] - **configure**: 使用 __ARM_ARCH 来确定 arm 版本 (João Reis) [#4123](https://github.com/nodejs/node/pull/4123)
* \[[`0e3912be0b`](https://github.com/nodejs/node/commit/0e3912be0b)] - **configure**: 在主机架构检测中遵循 CC_host (João Reis) [#4117](https://github.com/nodejs/node/pull/4117)
* \[[`69b94ec55c`](https://github.com/nodejs/node/commit/69b94ec55c)] - **deps**: 将 libuv 升级到 1.8.0 (Saúl Ibarra Corretgé) [#4276](https://github.com/nodejs/node/pull/4276)
* \[[`a8854e5b59`](https://github.com/nodejs/node/commit/a8854e5b59)] - **doc**: 为 fs.realpathSync 记录 cache 参数 (Jackson Tian) [#4285](https://github.com/nodejs/node/pull/4285)
* \[[`9e1b7aa874`](https://github.com/nodejs/node/commit/9e1b7aa874)] - **doc**: 为 server.listen() 的各个变体记录 backlog (Jan Schär) [#4025](https://github.com/nodejs/node/pull/4025)
* \[[`435d571f22`](https://github.com/nodejs/node/commit/435d571f22)] - **doc**: 更新 AUTHORS 列表 (Rod Vagg) [#4183](https://github.com/nodejs/node/pull/4183)
* \[[`3b3061365a`](https://github.com/nodejs/node/commit/3b3061365a)] - **doc**: 更新 irc 频道：#node.js 和 #node-dev (Nelson Pecora) [#2743](https://github.com/nodejs/node/pull/2743)
* \[[`9538fd02e5`](https://github.com/nodejs/node/commit/9538fd02e5)] - **doc**: 澄清 HTTP 模块文档中的错误事件 (Lenny Markus) [#4275](https://github.com/nodejs/node/pull/4275)
* \[[`c6efd535e4`](https://github.com/nodejs/node/commit/c6efd535e4)] - **doc**: 修正不正确的 http.get 示例代码 (Hideki Yamamura) [#4263](https://github.com/nodejs/node/pull/4263)
* \[[`498c9adb08`](https://github.com/nodejs/node/commit/498c9adb08)] - **doc**: 添加 2015-10-28 的 CTC 会议纪要 (Rod Vagg) [#3661](https://github.com/nodejs/node/pull/3661)
* \[[`671347cf13`](https://github.com/nodejs/node/commit/671347cf13)] - **doc**: 修正 socket.remoteAddress (Arthur Gautier) [#4198](https://github.com/nodejs/node/pull/4198)
* \[[`f050cab3d8`](https://github.com/nodejs/node/commit/f050cab3d8)] - **doc**: 校对 console 文档 (Rich Trott) [#4225](https://github.com/nodejs/node/pull/4225)
* \[[`1a21a5368b`](https://github.com/nodejs/node/commit/1a21a5368b)] - **doc**: 将 'equals' 方法的描述移到正确位置 (janriemer) [#4227](https://github.com/nodejs/node/pull/4227)
* \[[`9a9c5259bf`](https://github.com/nodejs/node/commit/9a9c5259bf)] - **doc**: 修复指向 v8 wiki 的损坏链接 (Tom Gallacher) [#4241](https://github.com/nodejs/node/pull/4241)
* \[[`37ed05b8c1`](https://github.com/nodejs/node/commit/37ed05b8c1)] - **doc**: 校对 child_process 文档 (Rich Trott) [#4188](https://github.com/nodejs/node/pull/4188)
* \[[`e47ae5808b`](https://github.com/nodejs/node/commit/e47ae5808b)] - **doc**: 校对 buffer 文档 (Rich Trott) [#4187](https://github.com/nodejs/node/pull/4187)
* \[[`70fb06a90b`](https://github.com/nodejs/node/commit/70fb06a90b)] - **doc**: 澄清 assert.fail 文档 (Rich Trott) [#4186](https://github.com/nodejs/node/pull/4186)
* \[[`e3187cc81e`](https://github.com/nodejs/node/commit/e3187cc81e)] - **doc**: 校对 addons 文档 (Rich Trott) [#4185](https://github.com/nodejs/node/pull/4185)
* \[[`931ab967ff`](https://github.com/nodejs/node/commit/931ab967ff)] - **doc**: 将 calvinmetcalf 添加为协作者 (Calvin Metcalf) [#4218](https://github.com/nodejs/node/pull/4218)
* \[[`01ce23148b`](https://github.com/nodejs/node/commit/01ce23148b)] - **doc**: 将 mcollina 添加为协作者 (Matteo Collina) [#4220](https://github.com/nodejs/node/pull/4220)
* \[[`bd8753aabf`](https://github.com/nodejs/node/commit/bd8753aabf)] - **doc**: 将 rmg 添加为协作者 (Ryan Graham) [#4219](https://github.com/nodejs/node/pull/4219)
* \[[`73a9a6fc92`](https://github.com/nodejs/node/commit/73a9a6fc92)] - **doc**: 统一 `ca` 参数的描述 (Ben Noordhuis) [#4213](https://github.com/nodejs/node/pull/4213)
* \[[`dfc8bedbc5`](https://github.com/nodejs/node/commit/dfc8bedbc5)] - **doc**: 将引用中的 node 更改为 Node.js (Roman Klauke) [#4177](https://github.com/nodejs/node/pull/4177)
* \[[`7a518788e9`](https://github.com/nodejs/node/commit/7a518788e9)] - **doc, test**: 将符号作为事件名称 (Bryan English) [#4151](https://github.com/nodejs/node/pull/4151)
* \[[`425a3545d2`](https://github.com/nodejs/node/commit/425a3545d2)] - **(SEMVER-MINOR)** **domains**: 修复对未捕获异常的处理 (Julien Gilli) [#3654](https://github.com/nodejs/node/pull/3654)
* \[[`acef181fde`](https://github.com/nodejs/node/commit/acef181fde)] - **(SEMVER-MINOR)** **https**: 支持禁用会话缓存 (Fedor Indutny) [#4252](https://github.com/nodejs/node/pull/4252)
* \[[`2a60e2ad71`](https://github.com/nodejs/node/commit/2a60e2ad71)] - **module,src**: 不要在 `lineOffset` 为 -1 时包装模块 (cjihrig) [#4298](https://github.com/nodejs/node/pull/4298)
* \[[`d3c498b1b7`](https://github.com/nodejs/node/commit/d3c498b1b7)] - **node**: 移除 AppendExceptionLine 中未使用的变量 (Yazhong Liu) [#4264](https://github.com/nodejs/node/pull/4264)
* \[[`aad6b9f0eb`](https://github.com/nodejs/node/commit/aad6b9f0eb)] - **repl**: 加载目录时显示错误信息 (Prince J Wesley) [#4170](https://github.com/nodejs/node/pull/4170)
* \[[`213ede6cee`](https://github.com/nodejs/node/commit/213ede6cee)] - **repl**: 修复 require('3rdparty') 回归问题 (Ben Noordhuis) [#4215](https://github.com/nodejs/node/pull/4215)
* \[[`f176b31e74`](https://github.com/nodejs/node/commit/f176b31e74)] - **src**: 移除 __builtin_bswap16 调用 (Ben Noordhuis) [#4290](https://github.com/nodejs/node/pull/4290)
* \[[`ce2471673f`](https://github.com/nodejs/node/commit/ce2471673f)] - **src**: 移除未使用的 BITS_PER_LONG 宏 (Ben Noordhuis) [#4290](https://github.com/nodejs/node/pull/4290)
* \[[`b799a74709`](https://github.com/nodejs/node/commit/b799a74709)] - **src**: 修复核心错误上的行号 (cjihrig) [#4254](https://github.com/nodejs/node/pull/4254)
* \[[`c311b61430`](https://github.com/nodejs/node/commit/c311b61430)] - **src**: 修复 ErrnoException 的弃用信息 (Martin von Gagern) [#4269](https://github.com/nodejs/node/pull/4269)
* \[[`2859f9ef92`](https://github.com/nodejs/node/commit/2859f9ef92)] - **test**: 修复 debug-port-cluster 的不稳定性 (Ben Noordhuis) [#4310](https://github.com/nodejs/node/pull/4310)
* \[[`cb0b4a6bc0`](https://github.com/nodejs/node/commit/cb0b4a6bc0)] - **test**: 添加单行文件调试测试 (cjihrig) [#4298](https://github.com/nodejs/node/pull/4298)
* \[[`0b9c3a30d6`](https://github.com/nodejs/node/commit/0b9c3a30d6)] - **test**: 添加 tls.parseCertString 测试 (Evan Lucas) [#4283](https://github.com/nodejs/node/pull/4283)
* \[[`7598ed6cc0`](https://github.com/nodejs/node/commit/7598ed6cc0)] - **test**: 将 test-repl-persistent-history 并行化 (Jeremiah Senkpiel) [#4247](https://github.com/nodejs/node/pull/4247)
* \[[`668449ad14`](https://github.com/nodejs/node/commit/668449ad14)] - **test**: 在 ARMv8 上使用普通超时时间 (Jeremiah Senkpiel) [#4248](https://github.com/nodejs/node/pull/4248)
* \[[`23e7703c85`](https://github.com/nodejs/node/commit/23e7703c85)] - **test**: 修复 http-many-ended-pipelines 的不稳定性 (Santiago Gimeno) [#4041](https://github.com/nodejs/node/pull/4041)
* \[[`3b94991bda`](https://github.com/nodejs/node/commit/3b94991bda)] - **test**: 修复 tls-inception 的不稳定性 (Santiago Gimeno) [#4195](https://github.com/nodejs/node/pull/4195)
* \[[`86a3bd09b0`](https://github.com/nodejs/node/commit/86a3bd09b0)] - **test**: 修复 tls-inception (Santiago Gimeno) [#4195](https://github.com/nodejs/node/pull/4195)
* \[[`1e89830a11`](https://github.com/nodejs/node/commit/1e89830a11)] - **test**: 不要假设 openssl s_client 支持 -ssl3 (Ben Noordhuis) [#4204](https://github.com/nodejs/node/pull/4204)
* \[[`c5b4f6bc99`](https://github.com/nodejs/node/commit/c5b4f6bc99)] - **(SEMVER-MINOR)** **tls**: 为 `tls.connect` 引入 `secureContext` (Fedor Indutny) [#4246](https://github.com/nodejs/node/pull/4246)
* \[[`e0bb118a1d`](https://github.com/nodejs/node/commit/e0bb118a1d)] - **tls_wrap**: 先继承自 `AsyncWrap` (Fedor Indutny) [#4268](https://github.com/nodejs/node/pull/4268)
* \[[`d63cceeb10`](https://github.com/nodejs/node/commit/d63cceeb10)] - **tools**: 添加 .editorconfig (ronkorving) [#2993](https://github.com/nodejs/node/pull/2993)
* \[[`4b267df93e`](https://github.com/nodejs/node/commit/4b267df93e)] - **udp**: 移除一个不必要的 Buffer instanceof 检查 (ronkorving) [#4301](https://github.com/nodejs/node/pull/4301)

<a id="5.2.0"></a>

## 2015-12-09，版本 5.2.0（稳定版），@rvagg

### 重要变更

* **build**:
  * 在使用 `--enable-vtune-profiling` 编译时，添加对 Intel VTune JIT 性能分析的支持。有关 VTune 的更多信息，请参见 <https://software.intel.com/en-us/node/544211>。（Chunyang Dai）[#3785](https://github.com/nodejs/node/pull/3785)。
  * 正确地默认启用 V8 快照。由于配置错误，快照一直默认处于关闭状态，而实际意图是启用该功能。（Fedor Indutny）[#3962](https://github.com/nodejs/node/pull/3962)。
* **crypto**:
  * 简化 ECDH（椭圆曲线 Diffie-Hellman）对象（通过 `crypto.createECDH(curve_name)` 创建）与不是通过 `generateKeys()` 动态生成的私钥一起使用的方式。现在在显式设置私钥时会计算公钥。增加了有效性检查，以减少计算出弱共享密钥或无效共享密钥的可能性。同时，已弃用 ECDH 对象的 `setPublicKey()` 方法，因为它没有必要，而且可能导致状态不一致。（Michael Ruddy）[#3511](https://github.com/nodejs/node/pull/3511)。
  * 使用 Mozilla NSS 当前维护的列表更新根证书。（Ben Noordhuis）[#3951](https://github.com/nodejs/node/pull/3951)。
  * 现在可以通过 `ca` 选项向 TLS 方法传入多个 CA 证书，形式可以是字符串数组，也可以是单个以换行分隔的字符串。（Ben Noordhuis）[#4099](https://github.com/nodejs/node/pull/4099)
* **tools**: 在核心中包含一个 tick 处理器，通过 `--prof-process` 命令行参数暴露，可用于处理使用 `--prof` 命令行参数生成的 V8 性能分析输出文件。（Matt Loring）[#4021](https://github.com/nodejs/node/pull/4021)。

### 已知问题

* REPL 中的代理对可能会冻结终端。 [#690](https://github.com/nodejs/node/issues/690)
* 在 DNS 查询进行中调用 `dns.setServers()` 可能会在断言失败时导致进程崩溃。 [#894](https://github.com/nodejs/node/issues/894)
* 在两个完整主机之间解析时，`url.resolve` 可能会转移 url 的 auth 部分，参见 [#1435](https://github.com/nodejs/node/issues/1435)。
* 文件系统路径中的 Unicode 字符在各平台或 Node.js API 之间的处理并不一致。参见 [#2088](https://github.com/nodejs/node/issues/2088)、[#3401](https://github.com/nodejs/node/issues/3401) 和 [#3519](https://github.com/nodejs/node/issues/3519)。

### 提交

* \[[`08a3f29fd4`](https://github.com/nodejs/node/commit/08a3f29fd4)] - **buffer**: 修复 `slowToString` 的范围检查（Matt Loring）[#4019](https://github.com/nodejs/node/pull/4019)
* \[[`e3a8e8bba4`](https://github.com/nodejs/node/commit/e3a8e8bba4)] - **buffer**: 防止 Buffer 构造函数去优化（Bryce Baril）[#4158](https://github.com/nodejs/node/pull/4158)
* \[[`0e18e68324`](https://github.com/nodejs/node/commit/0e18e68324)] - **buffer**: 修复某些负值的 `writeInt{B,L}E`（Peter A. Bigot）[#3994](https://github.com/nodejs/node/pull/3994)
* \[[`ab5b529dd2`](https://github.com/nodejs/node/commit/ab5b529dd2)] - **buffer**: `byteLength()` 默认使用 UTF8（Tom Gallacher）[#4010](https://github.com/nodejs/node/pull/4010)
* \[[`fcf0e8ebdf`](https://github.com/nodejs/node/commit/fcf0e8ebdf)] - **buffer**: 将 `checkFloat` 从 lib 移到 src（Matt Loring）[#3763](https://github.com/nodejs/node/pull/3763)
* \[[`12649f4496`](https://github.com/nodejs/node/commit/12649f4496)] - **build**: 添加 “--partly-static” 构建选项（Super Zheng）[#4152](https://github.com/nodejs/node/pull/4152)
* \[[`a76d788119`](https://github.com/nodejs/node/commit/a76d788119)] - **build**: 更新 signtool 说明，添加 url（Rod Vagg）[#4011](https://github.com/nodejs/node/pull/4011)
* \[[`ed255abdc1`](https://github.com/nodejs/node/commit/ed255abdc1)] - **(SEMVER-MINOR)** **build,src**: 添加 Intel Vtune 性能分析支持（Chunyang Dai）[#3785](https://github.com/nodejs/node/pull/3785)
* \[[`7793c364fc`](https://github.com/nodejs/node/commit/7793c364fc)] - **child\_process**: 刷新正在消费的流（Dave）[#4071](https://github.com/nodejs/node/pull/4071)
* \[[`f29c5d6e70`](https://github.com/nodejs/node/commit/f29c5d6e70)] - **configure**: `v8_use_snapshot` 应为 `true`（Fedor Indutny）[#3962](https://github.com/nodejs/node/pull/3962)
* \[[`da5ac55c83`](https://github.com/nodejs/node/commit/da5ac55c83)] - **(SEMVER-MINOR)** **crypto**: 简化使用 ECDH 处理预先存在的密钥（Michael Ruddy）[#3511](https://github.com/nodejs/node/pull/3511)
* \[[`cfc97641ee`](https://github.com/nodejs/node/commit/cfc97641ee)] - **crypto**: 修复在 FIPS 下原生模块编译问题（Stefan Budeanu）[#4023](https://github.com/nodejs/node/pull/4023)
* \[[`b81b45dabd`](https://github.com/nodejs/node/commit/b81b45dabd)] - **crypto**: 更新根证书（Ben Noordhuis）[#3951](https://github.com/nodejs/node/pull/3951)
* \[[`def681a07e`](https://github.com/nodejs/node/commit/def681a07e)] - **crypto**: 在 FIPS 模式下禁用 `crypto.createCipher`（Stefan Budeanu）[#3754](https://github.com/nodejs/node/pull/3754)
* \[[`ce423f3624`](https://github.com/nodejs/node/commit/ce423f3624)] - **debugger**: 为调试器引入 exec 方法（Jackson Tian）
* \[[`99fd1ec28d`](https://github.com/nodejs/node/commit/99fd1ec28d)] - **deps**: 从 V8 上游回移 819b40a（Michaël Zasso）[#3937](https://github.com/nodejs/node/pull/3937)
* \[[`82252b2a17`](https://github.com/nodejs/node/commit/82252b2a17)] - **doc**: 在 README 中添加简要的 Node.js 概述（wurde）[#4174](https://github.com/nodejs/node/pull/4174)
* \[[`634c5f1f81`](https://github.com/nodejs/node/commit/634c5f1f81)] - **doc**: url.format - 真实的斜杠后缀行为（fansworld-claudio）[#4119](https://github.com/nodejs/node/pull/4119)
* \[[`6f957a70d8`](https://github.com/nodejs/node/commit/6f957a70d8)] - **doc**: 在 readme 中将 node.js 改为 Node.js（Rod Vagg）[#3998](https://github.com/nodejs/node/pull/3998)
* \[[`0cd4a52392`](https://github.com/nodejs/node/commit/0cd4a52392)] - **doc**: 改进 child\_process.markdown 的措辞（yorkie）[#4138](https://github.com/nodejs/node/pull/4138)
* \[[`fd5ed6888d`](https://github.com/nodejs/node/commit/fd5ed6888d)] - **doc**: 将 JungMinu 添加为协作者（Minwoo Jung）[#4143](https://github.com/nodejs/node/pull/4143)
* \[[`fa0cdf75d9`](https://github.com/nodejs/node/commit/fa0cdf75d9)] - **doc**: 将 iarna 添加为协作者（Rebecca Turner）[#4144](https://github.com/nodejs/node/pull/4144)
* \[[`424eb962b1`](https://github.com/nodejs/node/commit/424eb962b1)] - **doc**: 将 zkat 添加为协作者（Kat Marchán）[#4142](https://github.com/nodejs/node/pull/4142)
* \[[`85b601224b`](https://github.com/nodejs/node/commit/85b601224b)] - **doc**: 添加 HTTP 工作组（James M Snell）[#3919](https://github.com/nodejs/node/pull/3919)
* \[[`f4164bd8df`](https://github.com/nodejs/node/commit/f4164bd8df)] - **doc**: 尽可能将链接更新为使用 https（jpersson）[#4054](https://github.com/nodejs/node/pull/4054)
* \[[`3169eed1e3`](https://github.com/nodejs/node/commit/3169eed1e3)] - **doc**: 在名称周围添加链接和反引号（jpersson）[#4054](https://github.com/nodejs/node/pull/4054)
* \[[`f3417e2574`](https://github.com/nodejs/node/commit/f3417e2574)] - **doc**: 统一文档中对 node.js 的引用格式（Scott Buchanan）[#4136](https://github.com/nodejs/node/pull/4136)
* \[[`95dd60c657`](https://github.com/nodejs/node/commit/95dd60c657)] - **doc**: 改写 https.Agent 示例文本（Jan Krems）[#4075](https://github.com/nodejs/node/pull/4075)
* \[[`c61237d3ea`](https://github.com/nodejs/node/commit/c61237d3ea)] - **doc**: 修复指向 child.send() 的内部链接（Luigi Pinca）[#4089](https://github.com/nodejs/node/pull/4089)
* \[[`aaeced915e`](https://github.com/nodejs/node/commit/aaeced915e)] - **doc**: 修复异常描述（yorkie）[#3658](https://github.com/nodejs/node/pull/3658)
* \[[`a2b7596ac0`](https://github.com/nodejs/node/commit/a2b7596ac0)] - **doc**: 修复链接代码块的颜色（jpersson）[#4068](https://github.com/nodejs/node/pull/4068)
* \[[`f3c50f5fb5`](https://github.com/nodejs/node/commit/f3c50f5fb5)] - **doc**: 修复列错位的罕见情况（Roman Reiss）[#3948](https://github.com/nodejs/node/pull/3948)
* \[[`f0a2e2cdec`](https://github.com/nodejs/node/commit/f0a2e2cdec)] - **doc**: 修正 message.header 的重复（Bryan English）[#3997](https://github.com/nodejs/node/pull/3997)
* \[[`b1dfa8bebb`](https://github.com/nodejs/node/commit/b1dfa8bebb)] - **doc**: 修复 README 中的拼写错误（Rich Trott）[#4000](https://github.com/nodejs/node/pull/4000)
* \[[`4602e01221`](https://github.com/nodejs/node/commit/4602e01221)] - **doc**: 将 sane 替换为 reasonable（Lewis Cowper）[#3980](https://github.com/nodejs/node/pull/3980)
* \[[`4849a54386`](https://github.com/nodejs/node/commit/4849a54386)] - **doc**: 为 crypto.pbkdf2 添加最佳实践（Tom Gallacher）[#3290](https://github.com/nodejs/node/pull/3290)
* \[[`77251d99de`](https://github.com/nodejs/node/commit/77251d99de)] - **doc**: fs.open 的数值标志（Carl Lei）[#3641](https://github.com/nodejs/node/pull/3641)
* \[[`f4ca007b42`](https://github.com/nodejs/node/commit/f4ca007b42)] - **doc**: 澄清 fs 流期望阻塞式 fd（Carl Lei）[#3641](https://github.com/nodejs/node/pull/3641)
* \[[`26eeae8016`](https://github.com/nodejs/node/commit/26eeae8016)] - **doc**: 修复损坏的引用（Alexander Gromnitsky）[#3944](https://github.com/nodejs/node/pull/3944)
* \[[`f90227b0e8`](https://github.com/nodejs/node/commit/f90227b0e8)] - **doc**: 移动 fs.existsSync() 的弃用消息（Martin Forsberg）[#3942](https://github.com/nodejs/node/pull/3942)
* \[[`bbcb2a2e65`](https://github.com/nodejs/node/commit/bbcb2a2e65)] - **doc**: 澄清模块加载行为（cjihrig）[#3920](https://github.com/nodejs/node/pull/3920)
* \[[`0997178037`](https://github.com/nodejs/node/commit/0997178037)] - **doc**: 为 buffer.inspect() 添加参考说明（cjihrig）[#3921](https://github.com/nodejs/node/pull/3921)
* \[[`6c16c40283`](https://github.com/nodejs/node/commit/6c16c40283)] - **doc**: 澄清 v5.1.1 的重要条目（Rod Vagg）[#4156](https://github.com/nodejs/node/pull/4156)
* \[[`4c8800c2de`](https://github.com/nodejs/node/commit/4c8800c2de)] - **fs,doc**: 使用 `target` 替代 `destination`（yorkie）[#3912](https://github.com/nodejs/node/pull/3912)
* \[[`1f0e8dca8e`](https://github.com/nodejs/node/commit/1f0e8dca8e)] - **installer**: 安装 tick 处理器（Matt Loring）[#3032](https://github.com/nodejs/node/pull/3032)
* \[[`e8e4e0718b`](https://github.com/nodejs/node/commit/e8e4e0718b)] - **meta**: 移除源代码中的脏话使用（Myles Borins）[#4122](https://github.com/nodejs/node/pull/4122)
* \[[`13834caa28`](https://github.com/nodejs/node/commit/13834caa28)] - **module**: 修复错误中的列偏移（Tristian Flanagan）[#2867](https://github.com/nodejs/node/pull/2867)
* \[[`8988e1e117`](https://github.com/nodejs/node/commit/8988e1e117)] - **module,repl**: 移除 repl require() 技巧（Ben Noordhuis）[#4026](https://github.com/nodejs/node/pull/4026)
* \[[`baac81d95f`](https://github.com/nodejs/node/commit/baac81d95f)] - **net**: 添加本地地址/端口以提供更好的错误信息（Jan Schär）[#3946](https://github.com/nodejs/node/pull/3946)
* \[[`12754c5dc3`](https://github.com/nodejs/node/commit/12754c5dc3)] - **net**: 小幅代码清理（Jan Schär）[#3943](https://github.com/nodejs/node/pull/3943)
* \[[`8a5e4345fd`](https://github.com/nodejs/node/commit/8a5e4345fd)] - **node**: 将 `doNTCallbackX` 改为 `nextTickCallbackWithXArgs`（Rod Vagg）[#4167](https://github.com/nodejs/node/pull/4167)
* \[[`0869ef3c55`](https://github.com/nodejs/node/commit/0869ef3c55)] - **(SEMVER-MINOR)** **repl**: 允许多行输入以句点开头（Zirak）[#3835](https://github.com/nodejs/node/pull/3835)
* \[[`aaab108dfe`](https://github.com/nodejs/node/commit/aaab108dfe)] - **repl**: 为语法错误附加位置信息（cjihrig）[#4013](https://github.com/nodejs/node/pull/4013)
* \[[`b08126dc9d`](https://github.com/nodejs/node/commit/b08126dc9d)] - **src**: 重构 vcbuild 配置参数的创建（Rod Vagg）[#3399](https://github.com/nodejs/node/pull/3399)
* \[[`da3137d0c5`](https://github.com/nodejs/node/commit/da3137d0c5)] - **src**: 不要输出垃圾错误信息（cjihrig）[#4112](https://github.com/nodejs/node/pull/4112)
* \[[`9e9346fa32`](https://github.com/nodejs/node/commit/9e9346fa32)] - **src**: 对 process.pid 使用 GetCurrentProcessId()（Ben Noordhuis）[#4163](https://github.com/nodejs/node/pull/4163)
* \[[`d969c0965c`](https://github.com/nodejs/node/commit/d969c0965c)] - **src**: 使用宏定义 Is\* 实用函数（cjihrig）[#4118](https://github.com/nodejs/node/pull/4118)
* \[[`458facdf66`](https://github.com/nodejs/node/commit/458facdf66)] - **src**: 基于操作系统定义 getpid()（cjihrig）[#4146](https://github.com/nodejs/node/pull/4146)
* \[[`7e18f2ec62`](https://github.com/nodejs/node/commit/7e18f2ec62)] - **(SEMVER-MINOR)** **src**: 为 StringBytes::Encode() 添加 BE 支持（Bryon Leung）[#3410](https://github.com/nodejs/node/pull/3410)
* \[[`756ab9caad`](https://github.com/nodejs/node/commit/756ab9caad)] - **stream**: 对 readable 标志不要过于激进（Brian White）[#4141](https://github.com/nodejs/node/pull/4141)
* \[[`8f845ba28a`](https://github.com/nodejs/node/commit/8f845ba28a)] - **stream_wrap**: 如果流具有 StringDecoder，则报错（Fedor Indutny）[#4031](https://github.com/nodejs/node/pull/4031)
* \[[`1c1af81ea0`](https://github.com/nodejs/node/commit/1c1af81ea0)] - **streams**: 将 .readable/.writable 更新为 false（Brian White）[#4083](https://github.com/nodejs/node/pull/4083)
* \[[`1d50819c85`](https://github.com/nodejs/node/commit/1d50819c85)] - **test**: 检查 `slowToString` 的范围修复（Sakthipriyan Vairamani）[#4019](https://github.com/nodejs/node/pull/4019)
* \[[`0c2a0dc859`](https://github.com/nodejs/node/commit/0c2a0dc859)] - **test**: 在非 Windows 上跳过长路径测试（Rafał Pocztarski）[#4116](https://github.com/nodejs/node/pull/4116)
* \[[`8a60aa1303`](https://github.com/nodejs/node/commit/8a60aa1303)] - **test**: 不要检查 test-http-1.0 中的 chunk 数量（Santiago Gimeno）[#3961](https://github.com/nodejs/node/pull/3961)
* \[[`e84aeec883`](https://github.com/nodejs/node/commit/e84aeec883)] - **test**: 将 test-cluster-shared-leak 标记为易波动（Rich Trott）[#4162](https://github.com/nodejs/node/pull/4162)
* \[[`b3f3b2e157`](https://github.com/nodejs/node/commit/b3f3b2e157)] - **test**: 修复 cluster-worker-isdead（Santiago Gimeno）[#3954](https://github.com/nodejs/node/pull/3954)
* \[[`da6be4d31a`](https://github.com/nodejs/node/commit/da6be4d31a)] - **test**: 修复时间分辨率约束（Gireesh Punathil）[#3981](https://github.com/nodejs/node/pull/3981)
* \[[`9d16729b20`](https://github.com/nodejs/node/commit/9d16729b20)] - **test**: 在内存受限时跳过而不是失败（Michael Cornacchia）[#3697](https://github.com/nodejs/node/pull/3697)
* \[[`be41eb751b`](https://github.com/nodejs/node/commit/be41eb751b)] - **test**: 重构 test-http-exit-delay（Rich Trott）[#4055](https://github.com/nodejs/node/pull/4055)
* \[[`4b43bf0385`](https://github.com/nodejs/node/commit/4b43bf0385)] - **test**: 修复易波动的 test-net-socket-local-address（Rich Trott）[#4109](https://github.com/nodejs/node/pull/4109)
* \[[`cb55c67a00`](https://github.com/nodejs/node/commit/cb55c67a00)] - **test**: 改进 cluster-disconnect-handles 测试（Brian White）[#4084](https://github.com/nodejs/node/pull/4084)
* \[[`2b5b127e14`](https://github.com/nodejs/node/commit/2b5b127e14)] - **test**: 修复 cluster-disconnect-handles 的不稳定性（Santiago Gimeno）[#4009](https://github.com/nodejs/node/pull/4009)
* \[[`430264817b`](https://github.com/nodejs/node/commit/430264817b)] - **test**: 为 repl.defineCommand() 添加测试（Bryan English）[#3908](https://github.com/nodejs/node/pull/3908)
* \[[`22b0971222`](https://github.com/nodejs/node/commit/22b0971222)] - **test**: 消除 FreeBSD 上 multicast 测试的不稳定性（Rich Trott）[#4042](https://github.com/nodejs/node/pull/4042)
* \[[`c50003746b`](https://github.com/nodejs/node/commit/c50003746b)] - **test**: 将测试标记为在 FreeBSD 上易波动（Rich Trott）[#4016](https://github.com/nodejs/node/pull/4016)
* \[[`69c95bbdb7`](https://github.com/nodejs/node/commit/69c95bbdb7)] - **test**: 将 ArrayStream 移到 common 中（cjihrig）[#4027](https://github.com/nodejs/node/pull/4027)
* \[[`d94a70ec51`](https://github.com/nodejs/node/commit/d94a70ec51)] - **test**: 修复 test-domain-exit-dispose-again（Julien Gilli）[#3990](https://github.com/nodejs/node/pull/3990)
* \[[`00b839a2b8`](https://github.com/nodejs/node/commit/00b839a2b8)] - **test**: 使用基于平台的超时以提高可靠性（Rich Trott）[#4015](https://github.com/nodejs/node/pull/4015)
* \[[`054a216b6f`](https://github.com/nodejs/node/commit/054a216b6f)] - **test**: 将 cluster-net-send 测试标记为在 windows 上易波动（Rich Trott）[#4006](https://github.com/nodejs/node/pull/4006)
* \[[`d0621c5649`](https://github.com/nodejs/node/commit/d0621c5649)] - **test**: 将 fork 回归测试标记为在 windows 上易波动（Rich Trott）[#4005](https://github.com/nodejs/node/pull/4005)
* \[[`19ed33df80`](https://github.com/nodejs/node/commit/19ed33df80)] - **test**: 如果处于 FreeBSD jail 中则跳过测试（Rich Trott）[#3995](https://github.com/nodejs/node/pull/3995)
* \[[`a863e8d667`](https://github.com/nodejs/node/commit/a863e8d667)] - **test**: 移除 cluster 测试的易波动状态（Rich Trott）[#3975](https://github.com/nodejs/node/pull/3975)
* \[[`dd0d15fc47`](https://github.com/nodejs/node/commit/dd0d15fc47)] - **test**: 为重试的测试添加 TAP 诊断消息（Rich Trott）[#3960](https://github.com/nodejs/node/pull/3960)
* \[[`1fe4d30efc`](https://github.com/nodejs/node/commit/1fe4d30efc)] - **test**: 在 SmartOS 上如果出现 ECONNREFUSED 则重试（Rich Trott）[#3941](https://github.com/nodejs/node/pull/3941)
* \[[`665a35d45e`](https://github.com/nodejs/node/commit/665a35d45e)] - **test**: 处理易波动的 test-http-client-timeout-event（Rich Trott）[#3968](https://github.com/nodejs/node/pull/3968)
* \[[`f9fe0aee53`](https://github.com/nodejs/node/commit/f9fe0aee53)] - **test**: fs.open 的数值标志（Carl Lei）[#3641](https://github.com/nodejs/node/pull/3641)
* \[[`54aafa17af`](https://github.com/nodejs/node/commit/54aafa17af)] - **test**: http 非 concat 头的完整列表（Bryan English）[#3930](https://github.com/nodejs/node/pull/3930)
* \[[`788541b40c`](https://github.com/nodejs/node/commit/788541b40c)] - **test**: 修复 unrefd interval 测试中的竞态条件（Michael Cornacchia）[#3550](https://github.com/nodejs/node/pull/3550)
* \[[`e129d83996`](https://github.com/nodejs/node/commit/e129d83996)] - **test**: 在 FIPS 模式下跳过/替换弱加密测试（Stefan Budeanu）[#3757](https://github.com/nodejs/node/pull/3757)
* \[[`bc27379453`](https://github.com/nodejs/node/commit/bc27379453)] - **test**: 避免 rpi 上的测试超时（Stefan Budeanu）[#3902](https://github.com/nodejs/node/pull/3902)
* \[[`272732e76b`](https://github.com/nodejs/node/commit/272732e76b)] - **test**: 修复易波动的 test-child-process-spawnsync-input（Rich Trott）[#3889](https://github.com/nodejs/node/pull/3889)
* \[[`781f8c0d1e`](https://github.com/nodejs/node/commit/781f8c0d1e)] - **test**: 为模块加载错误测试添加 OS X（Evan Lucas）[#3901](https://github.com/nodejs/node/pull/3901)
* \[[`f99c6363de`](https://github.com/nodejs/node/commit/f99c6363de)] - **test**: 模块加载错误修复 solaris #3798（fansworld-claudio）[#3855](https://github.com/nodejs/node/pull/3855)
* \[[`1279adc756`](https://github.com/nodejs/node/commit/1279adc756)] - **timers**: 优化回调调用：bind -> arrow（Andrei Sedoi）[#4038](https://github.com/nodejs/node/pull/4038)
* \[[`80f7f65464`](https://github.com/nodejs/node/commit/80f7f65464)] - **(SEMVER-MINOR)** **tls**: 支持从单个输入读取多个 ca（Ben Noordhuis）[#4099](https://github.com/nodejs/node/pull/4099)
* \[[`939f305d56`](https://github.com/nodejs/node/commit/939f305d56)] - **tls_wrap**: 在 `ClearOut` 中正确切分 buffer（Fedor Indutny）[#4184](https://github.com/nodejs/node/pull/4184)
* \[[`6d4a03d3d2`](https://github.com/nodejs/node/commit/6d4a03d3d2)] - **(SEMVER-MINOR)** **tools**: 列出 cpplint 中缺失的 whitespace/if-one-line 规则（Ben Noordhuis）[#4099](https://github.com/nodejs/node/pull/4099)
* \[[`1c1c1a0f2b`](https://github.com/nodejs/node/commit/1c1c1a0f2b)] - **(SEMVER-MINOR)** **tools**: 向 node 二进制文件添加 --prof-process 标志（Matt Loring）[#4021](https://github.com/nodejs/node/pull/4021)
* \[[`d7a7d3e6f7`](https://github.com/nodejs/node/commit/d7a7d3e6f7)] - **tools**: 更新 certdata.txt（Ben Noordhuis）[#3951](https://github.com/nodejs/node/pull/3951)
* \[[`1b434e0654`](https://github.com/nodejs/node/commit/1b434e0654)] - **util**: 在 C++ 中确定对象类型（cjihrig）[#4100](https://github.com/nodejs/node/pull/4100)
* \[[`c93e2678f0`](https://github.com/nodejs/node/commit/c93e2678f0)] - **util**: 修复 constructor/instanceof 检查（Brian White）[#3385](https://github.com/nodejs/node/pull/3385)
* \[[`098a3113e1`](https://github.com/nodejs/node/commit/098a3113e1)] - **util**: 将 .decorateErrorStack 移到 internal/util（Ben Noordhuis）[#4026](https://github.com/nodejs/node/pull/4026)
* \[[`e68ea16c32`](https://github.com/nodejs/node/commit/e68ea16c32)] - **util**: 添加 decorateErrorStack()（cjihrig）[#4013](https://github.com/nodejs/node/pull/4013)
* \[[`c584c3e08f`](https://github.com/nodejs/node/commit/c584c3e08f)] - **util,src**: 允许查找隐藏值（cjihrig）[#3988](https://github.com/nodejs/node/pull/3988)

<a id="5.1.1"></a>

## 2015-12-04，版本 5.1.1（稳定版），@rvagg

### 重要变更

* **http**：修复 CVE-2015-8027，一个 bug：HTTP socket 可能不再关联解析器，但流水线请求仍会尝试在不存在的解析器上触发暂停或恢复，这可能导致拒绝服务漏洞。（Fedor Indutny）
* **openssl**：升级到 1.0.2e，包含以下修复：
  * CVE-2015-3193 “BN\_mod\_exp 在 x86\_64 上可能产生错误结果”，使用 DHE 密钥交换的 Node.js TLS 服务器可能受到攻击。详情见 <http://openssl.org/news/secadv/20151203.txt>。
  * CVE-2015-3194 “在缺少 PSS 参数时证书验证崩溃”，使用客户端证书认证的 Node.js TLS 服务器存在潜在拒绝服务向量；TLS 客户端也会受到影响。详情见 <http://openssl.org/news/secadv/20151203.txt>。
    （Shigeki Ohtsu） [#4134](https://github.com/nodejs/node/pull/4134)
* **v8**：回移修复 CVE-2015-6764，一个 `JSON.stringify()` 中的 bug，可能导致数组越界读取。（Ben Noordhuis）

### 已知问题

* REPL 中的代理对可能会冻结终端。 [#690](https://github.com/nodejs/node/issues/690)
* 在 DNS 查询进行中调用 `dns.setServers()` 可能会因断言失败导致进程崩溃。 [#894](https://github.com/nodejs/node/issues/894)
* 在两个完整主机之间解析时，`url.resolve` 可能会转移 url 的 auth 部分，参见 [#1435](https://github.com/nodejs/node/issues/1435)。
* 文件系统路径中的 Unicode 字符在不同平台或 Node.js API 之间的处理不一致。参见 [#2088](https://github.com/nodejs/node/issues/2088)、[#3401](https://github.com/nodejs/node/issues/3401) 和 [#3519](https://github.com/nodejs/node/issues/3519)。

### 提交

* \[[`678398f250`](https://github.com/nodejs/node/commit/678398f250)] - **deps**：从上游 v8 回移 a7e50a5（Ben Noordhuis）
* \[[`76a552c938`](https://github.com/nodejs/node/commit/76a552c938)] - **deps**：从上游 v8 回移 6df9a1d（Ben Noordhuis）
* \[[`533881f889`](https://github.com/nodejs/node/commit/533881f889)] - **deps**：将 openssl 源码升级到 1.0.2e（Shigeki Ohtsu） [#4134](https://github.com/nodejs/node/pull/4134)
* \[[`12e70fafd3`](https://github.com/nodejs/node/commit/12e70fafd3)] - **http**：修复管线回归问题（Fedor Indutny）

<a id="5.1.0"></a>

## 2015-11-17，版本 5.1.0（稳定版），@Fishrock123

### 重要变更

* **buffer**：许多 buffer 函数的 `noAssert` 选项现在会静默丢弃无效的写入值，而不是崩溃（Minqi Pan） [#3767](https://github.com/nodejs/node/pull/3767)。
  * 这使行为与文档建议一致。
* **child\_process**：`child.send()` 现在会像文档所述那样正确返回布尔值（Rich Trott） [#3577](https://github.com/nodejs/node/pull/3577)。
* **doc**：所有 API 文档都已重新排序为按字母顺序阅读（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)。
* **http\_parser**：将 http-parser 从 2.5.0 更新到 2.6.0（James M Snell） [#3569](https://github.com/nodejs/node/pull/3569)。
  * 现在支持以下 HTTP 方法：`LINK`、`UNLINK`、`BIND`、`REBIND`、`UNBIND`。
  * 还新增了 ACL 和 IPv6 Zone ID 支持。
* **npm**：将 npm 从 v3.3.6 升级到 3.3.12（Rebecca Turner） [#3685](https://github.com/nodejs/node/pull/3685)。
  * 更多细节请参阅 [v3.3.7](https://github.com/npm/npm/releases/tag/v3.3.7)、[v3.3.8](https://github.com/npm/npm/releases/tag/v3.3.8)、[v3.3.9](https://github.com/npm/npm/releases/tag/v3.3.9)、[v3.3.10](https://github.com/npm/npm/releases/tag/v3.3.10)、[v3.3.11](https://github.com/npm/npm/releases/tag/v3.3.11) 和 [v3.3.12](https://github.com/npm/npm/releases/tag/v3.3.12) 的发布说明。
* **repl**：如果无法打开 [持久历史](https://nodejs.org/api/repl.html#repl_persistent_history) 文件，REPL 不再崩溃（Evan Lucas） [#3630](https://github.com/nodejs/node/pull/3630)。
* **tls**：默认的 `sessionIdContext` 现在在 FIPS 模式下使用 SHA1 而不是 MD5（Stefan Budeanu） [#3755](https://github.com/nodejs/node/pull/3755)。
* **v8**：添加了一些更有用的事后调试数据（Fedor Indutny） [#3779](https://github.com/nodejs/node/pull/3779)。

### 已知问题

* REPL 中的代理对可能会冻结终端。 [#690](https://github.com/nodejs/node/issues/690)
* 在 DNS 查询进行中调用 `dns.setServers()` 可能会因断言失败导致进程崩溃。 [#894](https://github.com/nodejs/node/issues/894)
* 在两个完整主机之间解析时，`url.resolve` 可能会转移 url 的 auth 部分，参见 [#1435](https://github.com/nodejs/node/issues/1435)。
* 文件系统路径中的 Unicode 字符在不同平台或 Node.js API 之间的处理不一致。参见 [#2088](https://github.com/nodejs/node/issues/2088)、[#3401](https://github.com/nodejs/node/issues/3401) 和 [#3519](https://github.com/nodejs/node/issues/3519)。

### 提交

* \[[`b663d2bbb5`](https://github.com/nodejs/node/commit/b663d2bbb5)] - **async\_wrap**：在析构函数中调用回调（Trevor Norris） [#3461](https://github.com/nodejs/node/pull/3461)
* \[[`eccbec99ea`](https://github.com/nodejs/node/commit/eccbec99ea)] - **async\_wrap**：新实例获取 uid（Trevor Norris） [#3461](https://github.com/nodejs/node/pull/3461)
* \[[`5d34c81a5c`](https://github.com/nodejs/node/commit/5d34c81a5c)] - **async\_wrap**：允许某些 hooks 为可选（Trevor Norris） [#3461](https://github.com/nodejs/node/pull/3461)
* \[[`7bff0138e2`](https://github.com/nodejs/node/commit/7bff0138e2)] - **buffer**：让 WriteFloatGeneric 静默丢弃值（Minqi Pan） [#3767](https://github.com/nodejs/node/pull/3767)
* \[[`56673693cd`](https://github.com/nodejs/node/commit/56673693cd)] - **buffer**：使外部 `nullptr` buffers 失效（Fedor Indutny） [#3624](https://github.com/nodejs/node/pull/3624)
* \[[`2d0ca0293a`](https://github.com/nodejs/node/commit/2d0ca0293a)] - **build**：修复使用预构建库进行配置的问题（Markus Tzoe） [#3135](https://github.com/nodejs/node/pull/3135)
* \[[`2a69b6820f`](https://github.com/nodejs/node/commit/2a69b6820f)] - **build**：修复 x-compile 下的 --with-intl=system-icu（Steven R. Loomis） [#3808](https://github.com/nodejs/node/pull/3808)
* \[[`8f5a2550a7`](https://github.com/nodejs/node/commit/8f5a2550a7)] - **build**：在 --enable-asan 时省略 -gline-tables-only（Ben Noordhuis） [#3680](https://github.com/nodejs/node/pull/3680)
* \[[`84bb74547d`](https://github.com/nodejs/node/commit/84bb74547d)] - **child\_process**：增加对 stdio 访问的安全检查（cjihrig） [#3799](https://github.com/nodejs/node/pull/3799)
* \[[`e888471a11`](https://github.com/nodejs/node/commit/e888471a11)] - **child\_process**：不要从 -e 触发自我 fork 炸弹（Ben Noordhuis） [#3575](https://github.com/nodejs/node/pull/3575)
* \[[`47f3735e88`](https://github.com/nodejs/node/commit/47f3735e88)] - **cluster**：断开连接时发送自杀消息（cjihrig） [#3720](https://github.com/nodejs/node/pull/3720)
* \[[`d64a56cba5`](https://github.com/nodejs/node/commit/d64a56cba5)] - **cluster**：断开 worker 时移除句柄（Ben Noordhuis） [#3677](https://github.com/nodejs/node/pull/3677)
* \[[`5ed30da5a0`](https://github.com/nodejs/node/commit/5ed30da5a0)] - **console**：对 time 和 timeEnd 使用 'label' 参数（Roman Reiss） [#3590](https://github.com/nodejs/node/pull/3590)
* \[[`7a290abea6`](https://github.com/nodejs/node/commit/7a290abea6)] - **crypto**：FIPS 模式下的 DSA 参数验证（Stefan Budeanu） [#3756](https://github.com/nodejs/node/pull/3756)
* \[[`2c9fb147be`](https://github.com/nodejs/node/commit/2c9fb147be)] - **crypto**：改进错误检查和报告（Stefan Budeanu） [#3753](https://github.com/nodejs/node/pull/3753)
* \[[`66dccaf0cd`](https://github.com/nodejs/node/commit/66dccaf0cd)] - **debugger**：当 repl 发出 'exit' 时也退出（Felix Böhm） [#2369](https://github.com/nodejs/node/pull/2369)
* \[[`fd0253be4d`](https://github.com/nodejs/node/commit/fd0253be4d)] - **deps**：从 v8 上游回移 bc2e393（evan.lucas） [#3792](https://github.com/nodejs/node/pull/3792)
* \[[`59077acc3d`](https://github.com/nodejs/node/commit/59077acc3d)] - **deps**：从 v8 上游 cherry-pick 68e89fb（Fedor Indutny） [#3779](https://github.com/nodejs/node/pull/3779)
* \[[`9ef81ff5d3`](https://github.com/nodejs/node/commit/9ef81ff5d3)] - **deps**：将 V8 更新到 4.6.85.31（Michaël Zasso） [#3698](https://github.com/nodejs/node/pull/3698)
* \[[`b48dbf9fce`](https://github.com/nodejs/node/commit/b48dbf9fce)] - **deps**：将 npm 升级到 3.3.12（Rebecca Turner） [#3685](https://github.com/nodejs/node/pull/3685)
* \[[`7caeb14e11`](https://github.com/nodejs/node/commit/7caeb14e11)] - **(SEMVER-MINOR)** **deps**：将 http-parser 更新到 2.6.0（James M Snell） [#3569](https://github.com/nodejs/node/pull/3569)
* \[[`08e0de59fa`](https://github.com/nodejs/node/commit/08e0de59fa)] - **deps**：将 npm 升级到 3.3.10（Rebecca Turner） [#3599](https://github.com/nodejs/node/pull/3599)
* \[[`ac9e4ffe8e`](https://github.com/nodejs/node/commit/ac9e4ffe8e)] - **dns**：防止结果中出现未定义值（Junliang Yan） [#3696](https://github.com/nodejs/node/pull/3696)
* \[[`ea67d870f4`](https://github.com/nodejs/node/commit/ea67d870f4)] - **doc**：在 readme 中记录发布类型（Rod Vagg） [#3482](https://github.com/nodejs/node/pull/3482)
* \[[`60d3daa65c`](https://github.com/nodejs/node/commit/60d3daa65c)] - **doc**：用更新后的文本替换 readme 开头内容（Rod Vagg） [#3482](https://github.com/nodejs/node/pull/3482)
* \[[`df1fdba2ae`](https://github.com/nodejs/node/commit/df1fdba2ae)] - **doc**：按字母顺序排序 repl（Tristian Flanagan） [#3859](https://github.com/nodejs/node/pull/3859)
* \[[`7ecd5422c8`](https://github.com/nodejs/node/commit/7ecd5422c8)] - **doc**：处理行为准则中不当用语的使用（James M Snell） [#3827](https://github.com/nodejs/node/pull/3827)
* \[[`c2393d1f2a`](https://github.com/nodejs/node/commit/c2393d1f2a)] - **doc**：统一 reference-style 链接（Bryan English） [#3845](https://github.com/nodejs/node/pull/3845)
* \[[`96f53c6b02`](https://github.com/nodejs/node/commit/96f53c6b02)] - **doc**：添加指向 \[customizing util.inspect colors] 的链接。（Jesse McCarthy） [#3749](https://github.com/nodejs/node/pull/3749)
* \[[`132297d3f6`](https://github.com/nodejs/node/commit/132297d3f6)] - **doc**：更新简化构造函数 API 的 streams（Tom Gallacher） [#3602](https://github.com/nodejs/node/pull/3602)
* \[[`d137f0fd28`](https://github.com/nodejs/node/commit/d137f0fd28)] - **doc**：添加关于 Windows 进程组的警告（Roman Klauke） [#3681](https://github.com/nodejs/node/pull/3681)
* \[[`45ff31cf94`](https://github.com/nodejs/node/commit/45ff31cf94)] - **doc**：补充 buf.copy 的返回值说明（Manuel B） [#3555](https://github.com/nodejs/node/pull/3555)
* \[[`5d1faa28cb`](https://github.com/nodejs/node/commit/5d1faa28cb)] - **doc**：重新表述 message.headers，说明它们不是只读的（Tristian Flanagan） [#3814](https://github.com/nodejs/node/pull/3814)
* \[[`25c3807051`](https://github.com/nodejs/node/commit/25c3807051)] - **doc**：澄清重复 header 的处理方式（Bryan English） [#3810](https://github.com/nodejs/node/pull/3810)
* \[[`ae2d1ee302`](https://github.com/nodejs/node/commit/ae2d1ee302)] - **doc**：repl：添加 defineComand 和 displayPrompt（Bryan English） [#3765](https://github.com/nodejs/node/pull/3765)
* \[[`09e524d013`](https://github.com/nodejs/node/commit/09e524d013)] - **doc**：按字母顺序排序 tls（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`7e60b81c81`](https://github.com/nodejs/node/commit/7e60b81c81)] - **doc**：按字母顺序排序 stream（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`cd931a8a13`](https://github.com/nodejs/node/commit/cd931a8a13)] - **doc**：按字母顺序排序 net（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`cfa8198af8`](https://github.com/nodejs/node/commit/cfa8198af8)] - **doc**：按字母顺序排序 process（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`e1a512607a`](https://github.com/nodejs/node/commit/e1a512607a)] - **doc**：按字母顺序排序 zlib（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`0996b97240`](https://github.com/nodejs/node/commit/0996b97240)] - **doc**：按字母顺序排序 util（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`df07072b66`](https://github.com/nodejs/node/commit/df07072b66)] - **doc**：按字母顺序排序 https（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`6e9d01c7d8`](https://github.com/nodejs/node/commit/6e9d01c7d8)] - **doc**：按字母顺序排序 http（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`18da02fa0f`](https://github.com/nodejs/node/commit/18da02fa0f)] - **doc**：按字母顺序排序 modules（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`29054ffc0c`](https://github.com/nodejs/node/commit/29054ffc0c)] - **doc**：按字母顺序排序 readline（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`389ead37ef`](https://github.com/nodejs/node/commit/389ead37ef)] - **doc**：按字母顺序排序 repl（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`d383d624de`](https://github.com/nodejs/node/commit/d383d624de)] - **doc**：按字母顺序排序 string\_decoder（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`0d2262887c`](https://github.com/nodejs/node/commit/0d2262887c)] - **doc**：按字母顺序排序 timers（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`14b5a95d03`](https://github.com/nodejs/node/commit/14b5a95d03)] - **doc**：按字母顺序排序 tty（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`d4dda77e4a`](https://github.com/nodejs/node/commit/d4dda77e4a)] - **doc**：按字母顺序排序 url（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`39b8259bd5`](https://github.com/nodejs/node/commit/39b8259bd5)] - **doc**：按字母顺序排序 vm（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`d357b3090e`](https://github.com/nodejs/node/commit/d357b3090e)] - **doc**：按字母顺序排序 querystring（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`1f56abaa98`](https://github.com/nodejs/node/commit/1f56abaa98)] - **doc**：按字母顺序排序 punycode（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`bc63667456`](https://github.com/nodejs/node/commit/bc63667456)] - **doc**：按字母顺序排序 path（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`22961e011c`](https://github.com/nodejs/node/commit/22961e011c)] - **doc**：按字母顺序排序 os（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`4ba18489d3`](https://github.com/nodejs/node/commit/4ba18489d3)] - **doc**：按字母顺序排序 globals（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`c3f5ea704f`](https://github.com/nodejs/node/commit/c3f5ea704f)] - **doc**：按字母顺序排序 fs（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`ce3ac8dd1e`](https://github.com/nodejs/node/commit/ce3ac8dd1e)] - **doc**：按字母顺序排序 events（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`63a78749b8`](https://github.com/nodejs/node/commit/63a78749b8)] - **doc**：按字母顺序排序 errors（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`488326da8d`](https://github.com/nodejs/node/commit/488326da8d)] - **doc**：按字母顺序排序 dgram（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`e1c357e881`](https://github.com/nodejs/node/commit/e1c357e881)] - **doc**：按字母顺序排序 crypto（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`4118fd5794`](https://github.com/nodejs/node/commit/4118fd5794)] - **doc**：按字母顺序排序 dns（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`3e046acc50`](https://github.com/nodejs/node/commit/3e046acc50)] - **doc**：按字母顺序排序 console（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`05f1af7124`](https://github.com/nodejs/node/commit/05f1af7124)] - **doc**：按字母顺序排序 cluster（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`5c30e5dada`](https://github.com/nodejs/node/commit/5c30e5dada)] - **doc**：按字母顺序排序 child\_process（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`fb6a09cd0e`](https://github.com/nodejs/node/commit/fb6a09cd0e)] - **doc**：按字母顺序排序 buffer（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`c7c05d8f02`](https://github.com/nodejs/node/commit/c7c05d8f02)] - **doc**：按字母顺序排序 assert（Tristian Flanagan） [#3662](https://github.com/nodejs/node/pull/3662)
* \[[`f2c2e53321`](https://github.com/nodejs/node/commit/f2c2e53321)] - **doc**：为 util.isBuffer 添加注释（Evan Lucas） [#3790](https://github.com/nodejs/node/pull/3790)
* \[[`35fb9f91eb`](https://github.com/nodejs/node/commit/35fb9f91eb)] - **doc**：描述 FIPSDIR 环境变量（Stefan Budeanu） [#3752](https://github.com/nodejs/node/pull/3752)
* \[[`da911f158b`](https://github.com/nodejs/node/commit/da911f158b)] - **doc**：更新协作者指南中的 lts 说明（James M Snell） [#3668](https://github.com/nodejs/node/pull/3668)
* \[[`597f8751d1`](https://github.com/nodejs/node/commit/597f8751d1)] - **doc**：为 tls 连接元数据方法添加注释（Tyler Henkel） [#3746](https://github.com/nodejs/node/pull/3746)
* \[[`a32d9e31dc`](https://github.com/nodejs/node/commit/a32d9e31dc)] - **doc**：将 romankl 添加为协作者（Roman Klauke） [#3725](https://github.com/nodejs/node/pull/3725)
* \[[`e5b9109d12`](https://github.com/nodejs/node/commit/e5b9109d12)] - **doc**：将 thealphanerd 添加为协作者（Myles Borins） [#3723](https://github.com/nodejs/node/pull/3723)
* \[[`a05a0b47e3`](https://github.com/nodejs/node/commit/a05a0b47e3)] - **doc**：将 saghul 添加为协作者（Saúl Ibarra Corretgé） [#3724](https://github.com/nodejs/node/pull/3724)
* \[[`b14d9c5f16`](https://github.com/nodejs/node/commit/b14d9c5f16)] - **doc**：在 events.markdown 中添加方法链接（Alejandro Oviedo） [#3187](https://github.com/nodejs/node/pull/3187)
* \[[`44f779b112`](https://github.com/nodejs/node/commit/44f779b112)] - **doc**：在 crypto 中添加关于算法和密钥大小的注意事项（Shigeki Ohtsu） [#3479](https://github.com/nodejs/node/pull/3479)
* \[[`a0db5fb355`](https://github.com/nodejs/node/commit/a0db5fb355)] - **doc**：重定向到文件时 stdout/stderr 可能会阻塞（Ben Noordhuis） [#3170](https://github.com/nodejs/node/pull/3170)
* \[[`409f29972e`](https://github.com/nodejs/node/commit/409f29972e)] - **doc**：将 iojs-\* 组重命名为 nodejs-\*（Steven R. Loomis） [#3634](https://github.com/nodejs/node/pull/3634)
* \[[`801866280e`](https://github.com/nodejs/node/commit/801866280e)] - **doc**：修复 changelog.md 中错误的日期和已知问题（James M Snell） [#3650](https://github.com/nodejs/node/pull/3650)
* \[[`325c4c7af5`](https://github.com/nodejs/node/commit/325c4c7af5)] - **doc**：修复 assert 文档中的函数参数顺序（David Woods） [#3533](https://github.com/nodejs/node/pull/3533)
* \[[`045e04e531`](https://github.com/nodejs/node/commit/045e04e531)] - **doc**：修复 readme.md 中的拼写错误（Sam P Gallagher-Bishop） [#3649](https://github.com/nodejs/node/pull/3649)
* \[[`7fd8f1371e`](https://github.com/nodejs/node/commit/7fd8f1371e)] - **doc**：添加关于 timeout delay > TIMEOUT\_MAX 的说明（Guilherme Souza） [#3512](https://github.com/nodejs/node/pull/3512)
* \[[`7d0b589644`](https://github.com/nodejs/node/commit/7d0b589644)] - **doc**：修复 crypto spkac 函数描述（Jason Gerfen） [#3614](https://github.com/nodejs/node/pull/3614)
* \[[`efa19bdcb5`](https://github.com/nodejs/node/commit/efa19bdcb5)] - **doc**：在 CONTRIBUTING.md 中补上最后的句号（Emily Aviva Kapor-Mater） [#3576](https://github.com/nodejs/node/pull/3576)
* \[[`90723afe32`](https://github.com/nodejs/node/commit/90723afe32)] - **doc**：使 API 文档中的代码跨度更醒目（phijohns） [#3573](https://github.com/nodejs/node/pull/3573)
* \[[`530bb9144f`](https://github.com/nodejs/node/commit/530bb9144f)] - **docs**：提高行为准则的可发现性（Ashley Williams） [#3774](https://github.com/nodejs/node/pull/3774)
* \[[`73e40f0327`](https://github.com/nodejs/node/commit/73e40f0327)] - **docs**：fs - 将指向 buffer encoding 的链接改为 Buffer 类锚点（fansworld-claudio） [#2796](https://github.com/nodejs/node/pull/2796)
* \[[`7a84fa6c60`](https://github.com/nodejs/node/commit/7a84fa6c60)] - **docs**：fs - 移除编码列表并链接到 buffer（fansworld-claudio） [#2796](https://github.com/nodejs/node/pull/2796)
* \[[`2aa6a6d998`](https://github.com/nodejs/node/commit/2aa6a6d998)] - **fs**：在 readFile() 成功时返回 null 错误（Zheng Chaoping） [#3740](https://github.com/nodejs/node/pull/3740)
* \[[`c96400c572`](https://github.com/nodejs/node/commit/c96400c572)] - **gitignore**：不要忽略 deps/npm 中的 'debug'（Rebecca Turner） [#3599](https://github.com/nodejs/node/pull/3599)
* \[[`a7f28a098e`](https://github.com/nodejs/node/commit/a7f28a098e)] - **http**：移除 setTimeout() 中不必要的 cb 检查（Ashok Suthar） [#3631](https://github.com/nodejs/node/pull/3631)
* \[[`d2b5dcb2de`](https://github.com/nodejs/node/commit/d2b5dcb2de)] - **lib**：从 child.send() 返回布尔值（Rich Trott） [#3577](https://github.com/nodejs/node/pull/3577)
* \[[`5c54fa0095`](https://github.com/nodejs/node/commit/5c54fa0095)] - **module**：缓存正则表达式（Evan Lucas） [#3869](https://github.com/nodejs/node/pull/3869)
* \[[`89285db128`](https://github.com/nodejs/node/commit/89285db128)] - **module**：移除不必要的 JSON.stringify（Andres Suarez） [#3578](https://github.com/nodejs/node/pull/3578)
* \[[`fd3f0d8e6e`](https://github.com/nodejs/node/commit/fd3f0d8e6e)] - **querystring**：解析多个分隔符字符（Yosuke Furukawa） [#3807](https://github.com/nodejs/node/pull/3807)
* \[[`75dbafc3f8`](https://github.com/nodejs/node/commit/75dbafc3f8)] - **repl**：要退出，请再次按 ^C 或输入 .exit。（Hemanth.HM） [#3368](https://github.com/nodejs/node/pull/3368)
* \[[`5073da0481`](https://github.com/nodejs/node/commit/5073da0481)] - **repl**：无法打开历史文件时不崩溃（Evan Lucas） [#3630](https://github.com/nodejs/node/pull/3630)
* \[[`59cd28114d`](https://github.com/nodejs/node/commit/59cd28114d)] - **src**：在 return 前补上缺失的 va\_end（Ömer Fadıl Usta） [#3565](https://github.com/nodejs/node/pull/3565)
* \[[`02e012e984`](https://github.com/nodejs/node/commit/02e012e984)] - **src**：强制 stderr 使用行缓冲（Rich Trott） [#3701](https://github.com/nodejs/node/pull/3701)
* \[[`2498e29344`](https://github.com/nodejs/node/commit/2498e29344)] - **src**：回退 "nix stdin \_readableState.reading"（Roman Reiss） [#3490](https://github.com/nodejs/node/pull/3490)
* \[[`65cd03cda6`](https://github.com/nodejs/node/commit/65cd03cda6)] - **src**：在进行语法检查前先包装源码（Evan Lucas） [#3587](https://github.com/nodejs/node/pull/3587)
* \[[`d72bb1e96a`](https://github.com/nodejs/node/commit/d72bb1e96a)] - _**回退**_ "**src**：修复卡住的 debugger 进程"（Ben Noordhuis） [#3585](https://github.com/nodejs/node/pull/3585)
* \[[`047abbd6eb`](https://github.com/nodejs/node/commit/047abbd6eb)] - **test**：将测试专用函数移出 common（Rich Trott） [#3871](https://github.com/nodejs/node/pull/3871)
* \[[`19a36ff355`](https://github.com/nodejs/node/commit/19a36ff355)] - **test**：修复不稳定的 SmartOS 测试（Rich Trott） [#3830](https://github.com/nodejs/node/pull/3830)
* \[[`4bb27baf8d`](https://github.com/nodejs/node/commit/4bb27baf8d)] - **test**：如果 FreeBSD jail 会破坏测试则跳过（Rich Trott） [#3839](https://github.com/nodejs/node/pull/3839)
* \[[`1c1e70864b`](https://github.com/nodejs/node/commit/1c1e70864b)] - **test**：修复 Windows 上 repl 测试的模块路径（Michael Cornacchia） [#3608](https://github.com/nodejs/node/pull/3608)
* \[[`413ca53107`](https://github.com/nodejs/node/commit/413ca53107)] - **test**：提高 crypto 强度以符合 FIPS 标准（Stefan Budeanu） [#3758](https://github.com/nodejs/node/pull/3758)
* \[[`2ec5e17d16`](https://github.com/nodejs/node/commit/2ec5e17d16)] - **test**：添加 test-zlib-flush-drain（Myles Borins） [#3534](https://github.com/nodejs/node/pull/3534)
* \[[`de707f0876`](https://github.com/nodejs/node/commit/de707f0876)] - **test**：向 test/common.js 添加 hasFipsCrypto（Stefan Budeanu） [#3756](https://github.com/nodejs/node/pull/3756)
* \[[`828b786e48`](https://github.com/nodejs/node/commit/828b786e48)] - **test**：添加无效 DSA 密钥大小的测试（Stefan Budeanu） [#3756](https://github.com/nodejs/node/pull/3756)
* \[[`252e810059`](https://github.com/nodejs/node/commit/252e810059)] - **test**：修复 AIX 下的 test-cluster-worker-exit.js（Imran Iqbal） [#3666](https://github.com/nodejs/node/pull/3666)
* \[[`91248b1094`](https://github.com/nodejs/node/commit/91248b1094)] - **test**：并行运行 pipeline flood 测试（Rich Trott） [#3811](https://github.com/nodejs/node/pull/3811)
* \[[`583f58e5d6`](https://github.com/nodejs/node/commit/583f58e5d6)] - **test**：测试 fixture 中使用更强的 crypto（Stefan Budeanu） [#3759](https://github.com/nodejs/node/pull/3759)
* \[[`2e67db3104`](https://github.com/nodejs/node/commit/2e67db3104)] - **test**：重构 test-http-pipeline-flood（Rich Trott） [#3636](https://github.com/nodejs/node/pull/3636)
* \[[`1ab59ab9b3`](https://github.com/nodejs/node/commit/1ab59ab9b3)] - **test**：修复不稳定的测试 test-http-pipeline-flood（Devin Nakamura） [#3636](https://github.com/nodejs/node/pull/3636)
* \[[`1c8a7c6351`](https://github.com/nodejs/node/commit/1c8a7c6351)] - **test**：增强 fs-watch-recursive 测试（Sakthipriyan Vairamani） [#2599](https://github.com/nodejs/node/pull/2599)
* \[[`81997840f2`](https://github.com/nodejs/node/commit/81997840f2)] - **test**：修复 musl 下的 test-module-loading-error（Hugues Malphettes） [#3657](https://github.com/nodejs/node/pull/3657)
* \[[`9cdceac782`](https://github.com/nodejs/node/commit/9cdceac782)] - **test**：使用真正无效的主机名（Sakthipriyan Vairamani） [#3711](https://github.com/nodejs/node/pull/3711)
* \[[`f3594e77b2`](https://github.com/nodejs/node/commit/f3594e77b2)] - **test**：修复 AIX 下的 test-net-persistent-keepalive（Imran Iqbal） [#3646](https://github.com/nodejs/node/pull/3646)
* \[[`81522480f1`](https://github.com/nodejs/node/commit/81522480f1)] - **test**：为 minDHSize 选项添加更多回归测试（Ben Noordhuis） [#3629](https://github.com/nodejs/node/pull/3629)
* \[[`935b97769e`](https://github.com/nodejs/node/commit/935b97769e)] - **test**：添加 512 位 DH 密钥的回归测试（Ben Noordhuis） [#3629](https://github.com/nodejs/node/pull/3629)
* \[[`e302c33bb0`](https://github.com/nodejs/node/commit/e302c33bb0)] - **test**：将 http-pipeline-flood 标记为不稳定（Rich Trott） [#3616](https://github.com/nodejs/node/pull/3616)
* \[[`5977963bce`](https://github.com/nodejs/node/commit/5977963bce)] - **test**：移除 ls-no-sslv3 的不稳定标记（Rich Trott） [#3620](https://github.com/nodejs/node/pull/3620)
* \[[`1e98d90db8`](https://github.com/nodejs/node/commit/1e98d90db8)] - **test**：添加 --debug-brk -e 0 的回归测试（Ben Noordhuis） [#3585](https://github.com/nodejs/node/pull/3585)
* \[[`2f16be2b70`](https://github.com/nodejs/node/commit/2f16be2b70)] - **tls**：在 FIPS 模式下为 sessionIdContext 使用 SHA1（Stefan Budeanu） [#3755](https://github.com/nodejs/node/pull/3755)
* \[[`05f0549b50`](https://github.com/nodejs/node/commit/05f0549b50)] - **tls**：在 CertCb 上复制 client CAs 和证书存储（Fedor Indutny） [#3537](https://github.com/nodejs/node/pull/3537)
* \[[`bea35424a2`](https://github.com/nodejs/node/commit/bea35424a2)] - **tools**：为 cpplint 添加 tap 输出（Johan Bergström） [#3448](https://github.com/nodejs/node/pull/3448)
* \[[`d036b35349`](https://github.com/nodejs/node/commit/d036b35349)] - **tools**：通过 lint 规则强制使用 `throw new Error()`（Rich Trott） [#3714](https://github.com/nodejs/node/pull/3714)
* \[[`38bb0d864e`](https://github.com/nodejs/node/commit/38bb0d864e)] - **tools**：统一使用 `throw new Error()`（Rich Trott） [#3714](https://github.com/nodejs/node/pull/3714)
* \[[`e40d28283a`](https://github.com/nodejs/node/commit/e40d28283a)] - **tools**：更新 npm 测试工具以支持 3.3.10+（Rebecca Turner） [#3599](https://github.com/nodejs/node/pull/3599)
* \[[`cbd358ce33`](https://github.com/nodejs/node/commit/cbd358ce33)] - **tools**：修复 gyp 使其可在没有 XCode 的 MacOSX 上工作（Shigeki Ohtsu） [iojs/io.js#1325](https://github.com/iojs/io.js/pull/1325)
* \[[`3137e46cb8`](https://github.com/nodejs/node/commit/3137e46cb8)] - **tools**：将 gyp 更新到 b3cef02（Imran Iqbal） [#3487](https://github.com/nodejs/node/pull/3487)
* \[[`d61cb90ee3`](https://github.com/nodejs/node/commit/d61cb90ee3)] - **util**：为字典对象使用 Object.create(null)（Minwoo Jung） [#3831](https://github.com/nodejs/node/pull/3831)
* \[[`9a45c21e6c`](https://github.com/nodejs/node/commit/9a45c21e6c)] - **util**：使用正则表达式代替 str.replace().join()（qinjia） [#3689](https://github.com/nodejs/node/pull/3689)
* \[[`33ffc62670`](https://github.com/nodejs/node/commit/33ffc62670)] - **zlib**：仅在提供回调时才应用 drain listener（Craig Cavalier） [#3534](https://github.com/nodejs/node/pull/3534)
* \[[`d70deabf90`](https://github.com/nodejs/node/commit/d70deabf90)] - **zlib**：将 kind 传递给递归的 flush 调用（Myles Borins） [#3534](https://github.com/nodejs/node/pull/3534)

<a id="5.0.0"></a>

## 2015-10-29, 版本 5.0.0（稳定版），@rvagg

### 重要变更

* **buffer**: _(Breaking)_ 从 `Buffer` 中移除了 `'raw'` 和 `'raws'` 两种编码类型，这些类型早已被弃用很久了（Sakthipriyan Vairamani） [#2859](https://github.com/nodejs/node/pull/2859)。
* **console**: _(Breaking)_ `console.time()` 报告的值现在增加了 3 位小数精度（Michaël Zasso） [#3166](https://github.com/nodejs/node/pull/3166)。
* **fs**:
  * `fs.readFile*()`、`fs.writeFile*()` 和 `fs.appendFile*()` 现在也接受文件描述符作为它们的第一个参数（Johannes Wüller） [#3163](https://github.com/nodejs/node/pull/3163)。
  * _(Breaking)_ 在 `fs.readFile()` 中，如果指定了编码且内部的 `toString()` 失败，错误现在不再被 _抛出_，而是传递给回调函数（Evan Lucas） [#3485](https://github.com/nodejs/node/pull/3485)。
  * _(Breaking)_ 在 `fs.read()` 中（使用 `fs.read(fd, length, position, encoding, callback)` 形式），如果内部的 `toString()` 失败，错误现在不再被 _抛出_，而是传递给回调函数（Evan Lucas） [#3503](https://github.com/nodejs/node/pull/3503)。
* **http**:
  * 修复了管道化 http 请求会卡住的 bug（Fedor Indutny） [#3342](https://github.com/nodejs/node/pull/3342)。
  * _(Breaking)_ 在解析 HTTP 时，不要为以下头部添加重复项：`Retry-After`、`ETag`、`Last-Modified`、`Server`、`Age`、`Expires`。这是在以下已禁止重复的头部基础上的补充：`Content-Type`、`Content-Length`、`User-Agent`、`Referer`、`Host`、`Authorization`、`Proxy-Authorization`、`If-Modified-Since`、`If-Unmodified-Since`、`From`、`Location`、`Max-Forwards`（James M Snell） [#3090](https://github.com/nodejs/node/pull/3090)。
  * _(Breaking)_ `OutgoingMessage#setTimeout()` 的 `callback` 参数必须是函数，否则会抛出 `TypeError`（James M Snell） [#3090](https://github.com/nodejs/node/pull/3090)。
  * _(Breaking)_ HTTP 方法和头部名称现在必须符合 RFC 2616 的 "token" 规则，即一组允许的字符，不包括控制字符和若干 _分隔符_ 字符。具体来说，方法和头部名称现在必须匹配 ``/^[a-zA-Z0-9_!#$%&'*+.^`|~-]+$/``，否则将抛出 `TypeError`（James M Snell） [#2526](https://github.com/nodejs/node/pull/2526)。
* **node**:
  * _(Breaking)_ 弃用了 `_linklist` 模块（Rich Trott） [#3078](https://github.com/nodejs/node/pull/3078)。
  * _(Breaking)_ 移除了 `require.paths` 和 `require.registerExtension()`，这两个在此前访问时就已被设置为抛出 `Error`（Sakthipriyan Vairamani） [#2922](https://github.com/nodejs/node/pull/2922)。
* **npm**: 从 2.14.7 升级到 3.3.6，更多详情见 <https://github.com/npm/npm/releases/tag/v3.3.6>。这是 npm 的一次重大版本升级，包含了大量变更。请参阅原始的 [npm v3.0.0 发布说明](https://github.com/npm/npm/blob/master/CHANGELOG.md#v300-2015-06-25) 了解重大变更列表（Rebecca Turner） [#3310](https://github.com/nodejs/node/pull/3310)。
* **src**: _(Breaking)_ 将 `NODE_MODULE_VERSION` 从 `46` 提升到 `47`，这是由于 V8 升级所必需的。原生扩展需要重新编译（Rod Vagg） [#3400](https://github.com/nodejs/node/pull/3400)。
* **timers**: 尝试在 `setTimeout().unref()` 中复用定时器句柄。这修复了一个长期存在的已知问题：未引用的定时器之前会使 `beforeExit` 一直保持开启（Fedor Indutny） [#3407](https://github.com/nodejs/node/pull/3407)。
* **tls**:
  * 增加了 ALPN 支持（Shigeki Ohtsu） [#2564](https://github.com/nodejs/node/pull/2564)。
  * TLS 选项现在可以作为对象传递给 `createSecurePair()`（Коренберг Марк） [#2441](https://github.com/nodejs/node/pull/2441)。
  * _(Breaking)_ `tls.connect()` 的默认最小 DH 密钥长度现在为 1024 位，当 DH 密钥长度小于 2048 位时会显示警告。这是出于安全考虑，用于防止 "logjam" 攻击。可以使用新的 `minDHSize` TLS 选项来覆盖默认值。（Shigeki Ohtsu） [#1831](https://github.com/nodejs/node/pull/1831)。
* **util**:
  * _(Breaking)_ `util.p()` 多年来一直被弃用，现在已被移除（Wyatt Preul） [#3432](https://github.com/nodejs/node/pull/3432)。
  * _(Breaking)_ `util.inherits()` 现在可以与 ES6 类一起工作。之所以被视为破坏性变更，是因为其实现从直接通过 `ctor.prototype = Object.create(superCtor.prototype, { constructor: { ... } })` 重新赋值构造函数的原型，改为使用 `Object.setPrototypeOf(ctor.prototype, superCtor.prototype)`，可能带来细微的副作用（Michaël Zasso） [#3455](https://github.com/nodejs/node/pull/3455)。
* **v8**: _(Breaking)_ 从 4.5.103.35 升级到 4.6.85.25（Ali Ijaz Sheikh） [#3351](https://github.com/nodejs/node/pull/3351)。
  * 实现了展开运算符，更多信息见 <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator>。
  * 实现了 `new.target`，更多信息见 <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new.target>。
* **zlib**: 当解压输入被截断时（例如文件意外结束），现在会抛出错误（Yuval Brik） [#2595](https://github.com/nodejs/node/pull/2595)。

### 已知问题

* REPL 中的代理对可能会使终端冻结。 [#690](https://github.com/nodejs/node/issues/690)
* 在 DNS 查询进行中调用 `dns.setServers()` 可能会因为断言失败导致进程崩溃。 [#894](https://github.com/nodejs/node/issues/894)
* 在解析两个完整主机之间的 URL 时，`url.resolve` 可能会转移 URL 的认证部分，见 [#1435](https://github.com/nodejs/node/issues/1435)。
* 文件系统路径中的 Unicode 字符在不同平台或 Node.js API 之间的处理不一致。请参见 [#2088](https://github.com/nodejs/node/issues/2088)、[#3401](https://github.com/nodejs/node/issues/3401) 和 [#3519](https://github.com/nodejs/node/issues/3519)。

### 提交

* \[[`6a04cc0a43`](https://github.com/nodejs/node/commit/6a04cc0a43)] - **buffer**: 修复 writeUInt{B,L}E 的值检查（Trevor Norris） [#3500](https://github.com/nodejs/node/pull/3500)
* \[[`1a41feb559`](https://github.com/nodejs/node/commit/1a41feb559)] - **buffer**: 不要在零大小重新分配时触发 CHECK（Ben Noordhuis） [#3499](https://github.com/nodejs/node/pull/3499)
* \[[`5f6579d366`](https://github.com/nodejs/node/commit/5f6579d366)] - **(SEMVER-MAJOR)** **buffer**: 移除 raw 和 raws 编码（Sakthipriyan Vairamani） [#2859](https://github.com/nodejs/node/pull/2859)
* \[[`70fca2a81e`](https://github.com/nodejs/node/commit/70fca2a81e)] - **build**: AIX npm 支持更新 - 第 1 部分（Michael Dawson） [#3114](https://github.com/nodejs/node/pull/3114)
* \[[`b36b4f385a`](https://github.com/nodejs/node/commit/b36b4f385a)] - **build**: 修正 --link-module 帮助文本（Minqi Pan） [#3379](https://github.com/nodejs/node/pull/3379)
* \[[`a89eeca590`](https://github.com/nodejs/node/commit/a89eeca590)] - **console**: 重命名 time 和 timeEnd 的参数（Michaël Zasso） [#3166](https://github.com/nodejs/node/pull/3166)
* \[[`870108aaa8`](https://github.com/nodejs/node/commit/870108aaa8)] - **(SEMVER-MAJOR)** **console**: 为 console.time 提供毫秒以下精度（Michaël Zasso） [#3166](https://github.com/nodejs/node/pull/3166)
* \[[`0a43697ce8`](https://github.com/nodejs/node/commit/0a43697ce8)] - **deps**: 从 V8 上游回移 010897c（Ali Ijaz Sheikh） [#3520](https://github.com/nodejs/node/pull/3520)
* \[[`8c0318ce8d`](https://github.com/nodejs/node/commit/8c0318ce8d)] - **deps**: 从 v8 上游回移 8d6a228（Fedor Indutny） [#3549](https://github.com/nodejs/node/pull/3549)
* \[[`2974debc6e`](https://github.com/nodejs/node/commit/2974debc6e)] - **deps**: 将 V8 更新到 4.6.85.28（Michaël Zasso） [#3484](https://github.com/nodejs/node/pull/3484)
* \[[`f76af49b13`](https://github.com/nodejs/node/commit/f76af49b13)] - **deps**: 修复升级到 npm 3.3.6 的问题（Rebecca Turner） [#3494](https://github.com/nodejs/node/pull/3494)
* \[[`32b51c97ec`](https://github.com/nodejs/node/commit/32b51c97ec)] - **deps**: 升级 npm 到 3.3.6（Rebecca Turner） [#3310](https://github.com/nodejs/node/pull/3310)
* \[[`770cd229f9`](https://github.com/nodejs/node/commit/770cd229f9)] - **deps**: 升级 V8 到 4.6.85.25（Ali Ijaz Sheikh） [#3351](https://github.com/nodejs/node/pull/3351)
* \[[`972a0c8515`](https://github.com/nodejs/node/commit/972a0c8515)] - **deps**: 从 v8 上游回移 0d01728（Fedor Indutny） [#3351](https://github.com/nodejs/node/pull/3351)
* \[[`1fdec65203`](https://github.com/nodejs/node/commit/1fdec65203)] - **deps**: 改进 v8 中的 ArrayBuffer 性能（Fedor Indutny） [#3351](https://github.com/nodejs/node/pull/3351)
* \[[`5cd1fd836a`](https://github.com/nodejs/node/commit/5cd1fd836a)] - **deps**: 从 V8 上游回移 56a0a79（Julien Gilli） [#3351](https://github.com/nodejs/node/pull/3351)
* \[[`7fb128d8df`](https://github.com/nodejs/node/commit/7fb128d8df)] - **deps**: 选择性回移到 V8 的补丁（Michaël Zasso） [#3351](https://github.com/nodejs/node/pull/3351)
* \[[`d8011d1683`](https://github.com/nodejs/node/commit/d8011d1683)] - **(SEMVER-MAJOR)** **deps**: 将 V8 升级到 4.6.85.23（Michaël Zasso） [#3351](https://github.com/nodejs/node/pull/3351)
* \[[`a334ddc467`](https://github.com/nodejs/node/commit/a334ddc467)] - _**Revert**_ "**deps**: 从 V8 上游回移 03ef3cd"（Ali Ijaz Sheikh） [#3237](https://github.com/nodejs/node/pull/3237)
* \[[`6fff47ffac`](https://github.com/nodejs/node/commit/6fff47ffac)] - **deps**: 从 V8 上游回移 03ef3cd（Ali Ijaz Sheikh） [#3165](https://github.com/nodejs/node/pull/3165)
* \[[`680dda8023`](https://github.com/nodejs/node/commit/680dda8023)] - **dns**: 移除不存在的 exports.ADNAME（Roman Reiss） [#3051](https://github.com/nodejs/node/pull/3051)
* \[[`239ad899a3`](https://github.com/nodejs/node/commit/239ad899a3)] - **doc**: 为 COLLABORATOR_GUIDE.md 添加 LTS 信息（Myles Borins） [#3442](https://github.com/nodejs/node/pull/3442)
* \[[`5e76587fdf`](https://github.com/nodejs/node/commit/5e76587fdf)] - **doc**: createServer 的 key 选项可以是数组（Sakthipriyan Vairamani） [#3123](https://github.com/nodejs/node/pull/3123)
* \[[`0317c880da`](https://github.com/nodejs/node/commit/0317c880da)] - **doc**: 添加 2015-10-21 TSC 会议纪要（Rod Vagg） [#3480](https://github.com/nodejs/node/pull/3480)
* \[[`cd245b12e0`](https://github.com/nodejs/node/commit/cd245b12e0)] - **doc**: 澄清 API buffer.concat（Martii） [#3255](https://github.com/nodejs/node/pull/3255)
* \[[`ff9ef893fd`](https://github.com/nodejs/node/commit/ff9ef893fd)] - **doc**: 添加 2015-10-14 TSC 会议纪要（Rod Vagg） [#3463](https://github.com/nodejs/node/pull/3463)
* \[[`605c5a7754`](https://github.com/nodejs/node/commit/605c5a7754)] - **doc**: 澄清 `option.detached` 的使用（Kyle Smith） [#3250](https://github.com/nodejs/node/pull/3250)
* \[[`cf75a175e5`](https://github.com/nodejs/node/commit/cf75a175e5)] - **doc**: 更多 promise 事件的使用场景（Domenic Denicola） [#3438](https://github.com/nodejs/node/pull/3438)
* \[[`1b75d4bda3`](https://github.com/nodejs/node/commit/1b75d4bda3)] - **doc**: 更新 WORKING_GROUPS.md - 添加缺失的组（Michael Dawson） [#3450](https://github.com/nodejs/node/pull/3450)
* \[[`c658de2f99`](https://github.com/nodejs/node/commit/c658de2f99)] - **doc**: 添加 2015-09-30 TSC 会议纪要（Rod Vagg） [#3235](https://github.com/nodejs/node/pull/3235)
* \[[`d0b8c5d3a4`](https://github.com/nodejs/node/commit/d0b8c5d3a4)] - **doc**: 添加 2015-10-07 TSC 会议纪要（Rod Vagg） [#3364](https://github.com/nodejs/node/pull/3364)
* \[[`b483afcb20`](https://github.com/nodejs/node/commit/b483afcb20)] - **doc**: binary 编码并未被弃用（Trevor Norris） [#3441](https://github.com/nodejs/node/pull/3441)
* \[[`b607366a1c`](https://github.com/nodejs/node/commit/b607366a1c)] - **doc**: 添加关于 Assert 行为和维护的信息（Rich Trott） [#3330](https://github.com/nodejs/node/pull/3330)
* \[[`086103b32e`](https://github.com/nodejs/node/commit/086103b32e)] - **doc**: 将 pbkdf2 中的 keylen 视为字节长度显示（calebboyd） [#3334](https://github.com/nodejs/node/pull/3334)
* \[[`f6ebc8277b`](https://github.com/nodejs/node/commit/f6ebc8277b)] - **doc**: 改写 console.time 的描述（Michaël Zasso） [#3166](https://github.com/nodejs/node/pull/3166)
* \[[`503f279527`](https://github.com/nodejs/node/commit/503f279527)] - **doc**: 修复 tls 恢复示例中的缩进（Roman Reiss） [#3372](https://github.com/nodejs/node/pull/3372)
* \[[`dae9fae0fe`](https://github.com/nodejs/node/commit/dae9fae0fe)] - **doc**: 在更新日志标题中将 v4.2.1 标记为 LTS（Phillip Johnsen） [#3360](https://github.com/nodejs/node/pull/3360)
* \[[`4fc638804c`](https://github.com/nodejs/node/commit/4fc638804c)] - **doc**: 更新手册页中的 V8 选项（Michaël Zasso） [#3351](https://github.com/nodejs/node/pull/3351)
* \[[`a441aa6e1d`](https://github.com/nodejs/node/commit/a441aa6e1d)] - **doc**: 更新 WORKING_GROUPS.md 以包含 Intl（Steven R. Loomis） [#3251](https://github.com/nodejs/node/pull/3251)
* \[[`81503e597b`](https://github.com/nodejs/node/commit/81503e597b)] - **doc**: 修复 changelog 中的拼写错误（Timothy Gu） [#3353](https://github.com/nodejs/node/pull/3353)
* \[[`3ef2e4acf3`](https://github.com/nodejs/node/commit/3ef2e4acf3)] - **doc**: 修复 changelog 中的拼写错误（reggi） [#3291](https://github.com/nodejs/node/pull/3291)
* \[[`b9279aa193`](https://github.com/nodejs/node/commit/b9279aa193)] - **doc**: 删除旧注释，`cluster` 已标记为稳定（Balázs Galambosi） [#3314](https://github.com/nodejs/node/pull/3314)
* \[[`cdfa271164`](https://github.com/nodejs/node/commit/cdfa271164)] - **doc**: 更新 AUTHORS 列表（Rod Vagg）
* \[[`47b06f6bb1`](https://github.com/nodejs/node/commit/47b06f6bb1)] - **docs**: 为 execSync 添加缺失的 shell 选项（fansworld-claudio） [#3440](https://github.com/nodejs/node/pull/3440)
* \[[`4c9abbd1bb`](https://github.com/nodejs/node/commit/4c9abbd1bb)] - **fs**: 减少 fs.write() 中的重复代码（ronkorving） [#2947](https://github.com/nodejs/node/pull/2947)
* \[[`2bb147535e`](https://github.com/nodejs/node/commit/2bb147535e)] - **(SEMVER-MAJOR)** **fs**: 如果 buffer 过大，在 read 中不要抛出错误（Evan Lucas） [#3503](https://github.com/nodejs/node/pull/3503)
* \[[`7added3b39`](https://github.com/nodejs/node/commit/7added3b39)] - **(SEMVER-MAJOR)** **fs**: 如果 buffer 过大，将错误传递给回调（Evan Lucas） [#3485](https://github.com/nodejs/node/pull/3485)
* \[[`5e0759f6fd`](https://github.com/nodejs/node/commit/5e0759f6fd)] - **(SEMVER-MINOR)** **fs**: 为 \*File() 函数添加文件描述符支持（Johannes Wüller） [#3163](https://github.com/nodejs/node/pull/3163)
* \[[`d1a2e5357e`](https://github.com/nodejs/node/commit/d1a2e5357e)] - **gitignore**: 不要在 V8 中忽略 debug 源代码目录（Michaël Zasso） [#3351](https://github.com/nodejs/node/pull/3351)
* \[[`ab03635fb1`](https://github.com/nodejs/node/commit/ab03635fb1)] - **http**: 修复管道停滞 bug（Fedor Indutny） [#3342](https://github.com/nodejs/node/pull/3342)
* \[[`e655a437b3`](https://github.com/nodejs/node/commit/e655a437b3)] - **(SEMVER-MAJOR)** **http**: 不允许某些响应头出现多个实例（James M Snell） [#3090](https://github.com/nodejs/node/pull/3090)
* \[[`0094a8dad7`](https://github.com/nodejs/node/commit/0094a8dad7)] - **(SEMVER-MAJOR)** **http**: 添加 callback 是否为函数的检查（James M Snell） [#3090](https://github.com/nodejs/node/pull/3090)
* \[[`6192c9892f`](https://github.com/nodejs/node/commit/6192c9892f)] - **(SEMVER-MAJOR)** **http**: 为 header 字段添加 checkIsHttpToken 检查（James M Snell） [#2526](https://github.com/nodejs/node/pull/2526)
* \[[`c9786bb680`](https://github.com/nodejs/node/commit/c9786bb680)] - **(SEMVER-MAJOR)** http{s}: 在无效 URL 下不要连接到 localhost（Sakthipriyan Vairamani） [#2967](https://github.com/nodejs/node/pull/2967)
* \[[`1929d5be73`](https://github.com/nodejs/node/commit/1929d5be73)] - **lib**: 修复 cluster 句柄泄漏（Rich Trott） [#3510](https://github.com/nodejs/node/pull/3510)
* \[[`97d081709e`](https://github.com/nodejs/node/commit/97d081709e)] - **lib**: 避免 REPL 在 completion 错误时退出（Rich Trott） [#3358](https://github.com/nodejs/node/pull/3358)
* \[[`f236b3a904`](https://github.com/nodejs/node/commit/f236b3a904)] - **(SEMVER-MINOR)** **lib,doc**: 从 child.send() 返回布尔值（Rich Trott） [#3516](https://github.com/nodejs/node/pull/3516)
* \[[`6e887cc630`](https://github.com/nodejs/node/commit/6e887cc630)] - **lib,test**: 在适用的地方将 let 更新为 const（Sakthipriyan Vairamani） [#3152](https://github.com/nodejs/node/pull/3152)
* \[[`47befffc53`](https://github.com/nodejs/node/commit/47befffc53)] - **(SEMVER-MAJOR)** **lib,test**: 弃用 _linklist（Rich Trott） [#3078](https://github.com/nodejs/node/pull/3078)
* \[[`d5ce53458e`](https://github.com/nodejs/node/commit/d5ce53458e)] - **lttng**: 更新 gc tracing 的标志（Glen Keane） [#3388](https://github.com/nodejs/node/pull/3388)
* \[[`6ad458b752`](https://github.com/nodejs/node/commit/6ad458b752)] - **(SEMVER-MAJOR)** **module**: 移除不必要的属性和方法（Sakthipriyan Vairamani） [#2922](https://github.com/nodejs/node/pull/2922)
* \[[`ae196175f4`](https://github.com/nodejs/node/commit/ae196175f4)] - **node**: 提升 GetActiveRequests 性能（Trevor Norris） [#3375](https://github.com/nodejs/node/pull/3375)
* \[[`bd4311bc9c`](https://github.com/nodejs/node/commit/bd4311bc9c)] - **repl**: 正确处理注释（Sakthipriyan Vairamani） [#3515](https://github.com/nodejs/node/pull/3515)
* \[[`ce391ed849`](https://github.com/nodejs/node/commit/ce391ed849)] - **(SEMVER-MAJOR)** **repl**: 事件顺序：将 'close' 延迟到 'flushHistory' 之后（Jeremiah Senkpiel） [#3435](https://github.com/nodejs/node/pull/3435)
* \[[`4c80c02ac7`](https://github.com/nodejs/node/commit/4c80c02ac7)] - **repl**: 在加载时正确限制持久历史记录（Jeremiah Senkpiel） [#2356](https://github.com/nodejs/node/pull/2356)
* \[[`134a60c785`](https://github.com/nodejs/node/commit/134a60c785)] - **src**: 修复退出时 debug signal 的竞争条件（Ben Noordhuis） [#3528](https://github.com/nodejs/node/pull/3528)
* \[[`bf7c3dabb4`](https://github.com/nodejs/node/commit/bf7c3dabb4)] - **(SEMVER-MAJOR)** **src**: 将 NODE_MODULE_VERSION 提升到 47（Rod Vagg） [#3400](https://github.com/nodejs/node/pull/3400)
* \[[`2d3560767e`](https://github.com/nodejs/node/commit/2d3560767e)] - **src**: 修复 Windows 上异常消息的编码（Brian White） [#3288](https://github.com/nodejs/node/pull/3288)
* \[[`ff877e93e1`](https://github.com/nodejs/node/commit/ff877e93e1)] - **src**: 修复卡住的调试器进程（Liang-Chi Hsieh） [#2778](https://github.com/nodejs/node/pull/2778)
* \[[`8854183fe5`](https://github.com/nodejs/node/commit/8854183fe5)] - **stream**: 避免对单个 buffer 进行不必要的 concat。（Calvin Metcalf） [#3300](https://github.com/nodejs/node/pull/3300)
* \[[`85b74de9de`](https://github.com/nodejs/node/commit/85b74de9de)] - **stream**: 修复注释中 \_write() 的签名（Fábio Santos） [#3248](https://github.com/nodejs/node/pull/3248)
* \[[`b8cea49c88`](https://github.com/nodejs/node/commit/b8cea49c88)] - **test**: 修复 win 上 heap-profiler 链接错误 LNK1194（Junliang Yan） [#3572](https://github.com/nodejs/node/pull/3572)
* \[[`4a5dbeab43`](https://github.com/nodejs/node/commit/4a5dbeab43)] - **test**: 修复 windows 上缺少 unistd.h 的问题（Junliang Yan） [#3532](https://github.com/nodejs/node/pull/3532)
* \[[`74e2328b3a`](https://github.com/nodejs/node/commit/74e2328b3a)] - **test**: 将相互独立的测试拆分到单独文件中（Rich Trott） [#3548](https://github.com/nodejs/node/pull/3548)
* \[[`8c6c0f915a`](https://github.com/nodejs/node/commit/8c6c0f915a)] - **test**: 在 tls socket 测试中使用环境变量中的端口号（Stefan Budeanu） [#3557](https://github.com/nodejs/node/pull/3557)
* \[[`1a968e67a5`](https://github.com/nodejs/node/commit/1a968e67a5)] - **test**: 改进 util.inherits 的测试（Michaël Zasso） [#3507](https://github.com/nodejs/node/pull/3507)
* \[[`9d8d752456`](https://github.com/nodejs/node/commit/9d8d752456)] - **test**: 在 test-dns-ipv6.js 中打印有用的错误消息（Junliang Yan） [#3501](https://github.com/nodejs/node/pull/3501)
* \[[`60de9f8d7b`](https://github.com/nodejs/node/commit/60de9f8d7b)] - **test**: 当 assert.fail 被传递给回调时进行包装（Myles Borins） [#3453](https://github.com/nodejs/node/pull/3453)
* \[[`cd83f7ed7f`](https://github.com/nodejs/node/commit/cd83f7ed7f)] - **test**: 添加 node::MakeCallback() 测试覆盖（Ben Noordhuis） [#3478](https://github.com/nodejs/node/pull/3478)
* \[[`08da5c2a06`](https://github.com/nodejs/node/commit/08da5c2a06)] - **test**: 禁用 test-tick-processor - aix and be ppc（Michael Dawson） [#3491](https://github.com/nodejs/node/pull/3491)
* \[[`7c35fbcb14`](https://github.com/nodejs/node/commit/7c35fbcb14)] - **test**: 加固 test-child-process-fork-regr-gh-2847（Michael Dawson） [#3459](https://github.com/nodejs/node/pull/3459)
* \[[`ad2b272417`](https://github.com/nodejs/node/commit/ad2b272417)] - **test**: 修复 AIX 的 test-net-keepalive（Imran Iqbal） [#3458](https://github.com/nodejs/node/pull/3458)
* \[[`04fb14cc35`](https://github.com/nodejs/node/commit/04fb14cc35)] - **test**: 修复不稳定的 test-child-process-emfile（Rich Trott） [#3430](https://github.com/nodejs/node/pull/3430)
* \[[`eef0f0cd63`](https://github.com/nodejs/node/commit/eef0f0cd63)] - **test**: 从 eval_messages 测试中移除不稳定状态（Rich Trott） [#3420](https://github.com/nodejs/node/pull/3420)
* \[[`bbbd81eab2`](https://github.com/nodejs/node/commit/bbbd81eab2)] - **test**: 如果不可用则跳过 test-dns-ipv6.js（Junliang Yan） [#3444](https://github.com/nodejs/node/pull/3444)
* \[[`f78c8e7426`](https://github.com/nodejs/node/commit/f78c8e7426)] - **test**: 修复符号链接的不稳定测试（Rich Trott） [#3418](https://github.com/nodejs/node/pull/3418)
* \[[`28e9a4f41b`](https://github.com/nodejs/node/commit/28e9a4f41b)] - **test**: repl-persistent-history 不再不稳定（Jeremiah Senkpiel） [#3437](https://github.com/nodejs/node/pull/3437)
* \[[`9e981556e5`](https://github.com/nodejs/node/commit/9e981556e5)] - **test**: 清理并改进 repl-persistent-history（Jeremiah Senkpiel） [#2356](https://github.com/nodejs/node/pull/2356)
* \[[`ee2e641e0a`](https://github.com/nodejs/node/commit/ee2e641e0a)] - **test**: 为 assert.deepEqual() 添加 Symbol 测试（Rich Trott） [#3327](https://github.com/nodejs/node/pull/3327)
* \[[`e2b8393ee8`](https://github.com/nodejs/node/commit/e2b8393ee8)] - **test**: 从 v0.10 移植 domains 回归测试（Jonas Dohse） [#3356](https://github.com/nodejs/node/pull/3356)
* \[[`676e61872f`](https://github.com/nodejs/node/commit/676e61872f)] - **test**: 应用正确的 assert.fail() 参数（Rich Trott） [#3378](https://github.com/nodejs/node/pull/3378)
* \[[`bbdbef9274`](https://github.com/nodejs/node/commit/bbdbef9274)] - **test**: 修复 V8 升级后的测试（Michaël Zasso） [#3351](https://github.com/nodejs/node/pull/3351)
* \[[`6c032a8333`](https://github.com/nodejs/node/commit/6c032a8333)] - **test**: 用反引号字符串替换 util（Myles Borins） [#3359](https://github.com/nodejs/node/pull/3359)
* \[[`f45c315763`](https://github.com/nodejs/node/commit/f45c315763)] - **test**: 修复 PPC 上带 abort-on-uncaught 的 domain（Julien Gilli） [#3354](https://github.com/nodejs/node/pull/3354)
* \[[`e3d9d25083`](https://github.com/nodejs/node/commit/e3d9d25083)] - **test**: 为 test-child-process-emfile 添加失败消息（Rich Trott） [#3335](https://github.com/nodejs/node/pull/3335)
* \[[`6f14b3a7db`](https://github.com/nodejs/node/commit/6f14b3a7db)] - **test**: 从 common 中移除 util（Rich Trott） [#3324](https://github.com/nodejs/node/pull/3324)
* \[[`7d94611ac9`](https://github.com/nodejs/node/commit/7d94611ac9)] - **test**: 拆分 buffer 测试以提高可靠性（Rich Trott） [#3323](https://github.com/nodejs/node/pull/3323)
* \[[`3202456baa`](https://github.com/nodejs/node/commit/3202456baa)] - **test**: 从 common 中移除 util 属性（Rich Trott） [#3304](https://github.com/nodejs/node/pull/3304)
* \[[`31c971d641`](https://github.com/nodejs/node/commit/31c971d641)] - **test**: 并行化长时间运行的测试（Rich Trott） [#3287](https://github.com/nodejs/node/pull/3287)
* \[[`5bbc6df7de`](https://github.com/nodejs/node/commit/5bbc6df7de)] - **test**: 更改对已弃用 util.isError() 的调用（Rich Trott） [#3084](https://github.com/nodejs/node/pull/3084)
* \[[`522e3d3cd3`](https://github.com/nodejs/node/commit/522e3d3cd3)] - **timers**: 在 `setTimeout().unref()` 中复用定时器（Fedor Indutny） [#3407](https://github.com/nodejs/node/pull/3407)
* \[[`b64ce5960f`](https://github.com/nodejs/node/commit/b64ce5960f)] - **tls**: 移除 util 以及对 util.format 的调用（Myles Borins） [#3456](https://github.com/nodejs/node/pull/3456)
* \[[`c64af7d99e`](https://github.com/nodejs/node/commit/c64af7d99e)] - **tls**: TLSSocket 选项的默认值 isServer 为 false（Yuval Brik） [#2614](https://github.com/nodejs/node/pull/2614)
* \[[`2296a4fc0f`](https://github.com/nodejs/node/commit/2296a4fc0f)] - **(SEMVER-MINOR)** **tls**: 为 createSecurePair 添加 `options` 参数（Коренберг Марк） [#2441](https://github.com/nodejs/node/pull/2441)
* \[[`0140e1b5e3`](https://github.com/nodejs/node/commit/0140e1b5e3)] - **tls**: 将 setDHParam 的警告输出到 console.trace（Shigeki Ohtsu） [#1831](https://github.com/nodejs/node/pull/1831)
* \[[`f72e178a78`](https://github.com/nodejs/node/commit/f72e178a78)] - **(SEMVER-MAJOR)** **tls**: 为 tls.connect() 添加 minDHSize 选项（Shigeki Ohtsu） [#1831](https://github.com/nodejs/node/pull/1831)
* \[[`6d92ebac11`](https://github.com/nodejs/node/commit/6d92ebac11)] - **tls**: 添加 TLSSocket.getEphemeralKeyInfo()（Shigeki Ohtsu） [#1831](https://github.com/nodejs/node/pull/1831)
* \[[`62ad1d0113`](https://github.com/nodejs/node/commit/62ad1d0113)] - **(SEMVER-MINOR)** **tls, crypto**: 添加 ALPN 支持（Shigeki Ohtsu） [#2564](https://github.com/nodejs/node/pull/2564)
* \[[`5029f41b2f`](https://github.com/nodejs/node/commit/5029f41b2f)] - **(SEMVER-MINOR)** **tls,crypto**: 将 NPN 协议数据移到隐藏值中（Shigeki Ohtsu） [#2564](https://github.com/nodejs/node/pull/2564)
* \[[`701e38c25f`](https://github.com/nodejs/node/commit/701e38c25f)] - **tools**: 启用 prefer-const eslint 规则（Sakthipriyan Vairamani） [#3152](https://github.com/nodejs/node/pull/3152)
* \[[`6e78382605`](https://github.com/nodejs/node/commit/6e78382605)] - **tools**: 确保 npm 始终使用本地 node（Jeremiah Senkpiel） [#3489](https://github.com/nodejs/node/pull/3489)
* \[[`3c3435d017`](https://github.com/nodejs/node/commit/3c3435d017)] - **tools**: 更新 test-npm 以适配 npm 3（Rebecca Turner） [#3489](https://github.com/nodejs/node/pull/3489)
* \[[`b4f4c24539`](https://github.com/nodejs/node/commit/b4f4c24539)] - **tools**: 在 test-npm 中使用绝对路径（Rebecca Turner） [#3309](https://github.com/nodejs/node/pull/3309)
* \[[`80573153b8`](https://github.com/nodejs/node/commit/80573153b8)] - **(SEMVER-MAJOR)** **util**: 使 inherits 可与类一起工作（Michaël Zasso） [#3455](https://github.com/nodejs/node/pull/3455)
* \[[`412252ca04`](https://github.com/nodejs/node/commit/412252ca04)] - **(SEMVER-MAJOR)** **util**: 移除 p，它已被弃用多年（Wyatt Preul） [#3432](https://github.com/nodejs/node/pull/3432)
* \[[`718c304a4f`](https://github.com/nodejs/node/commit/718c304a4f)] - **v8**: 拉取 PPC 上内建代码大小的修复（Michael Dawson） [#3474](https://github.com/nodejs/node/pull/3474)
* \[[`6936468de2`](https://github.com/nodejs/node/commit/6936468de2)] - **vm**: 移除 Watchdog 对 Environment 的依赖（Ido Ben-Yair） [#3274](https://github.com/nodejs/node/pull/3274)
* \[[`80169b1f0a`](https://github.com/nodejs/node/commit/80169b1f0a)] - **(SEMVER-MAJOR)** **zlib**: 解压在截断输入上抛出错误（Yuval Brik） [#2595](https://github.com/nodejs/node/pull/2595)
